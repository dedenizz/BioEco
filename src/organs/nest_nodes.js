// BioEcosystem - Benthic Nest Nodes, Caste Differentiation & Trophallaxis System
// Module: src/organs/nest_nodes.js
// Version: 5.07.0 (Hour 227 - System Agent Benthic Nest Nodes & Trophallaxis)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class NestNode {
        constructor(id, species, x, y) {
            this.id = id || ("nest_" + Math.random().toString(36).substring(2, 7));
            this.species = species || 1;
            this.x = Number.isFinite(x) ? x : 300;
            this.y = Number.isFinite(y) ? y : 300;
            this.radius = 36.0;
            this.storedNutrients = 45.0;
            this.maxNutrients = 250.0;
            this.structuralIntegrity = 100.0;
            this.silkAdhesion = 0.85;
            this.workersCount = 0;
            this.scoutsCount = 0;
            this.soldiersCount = 0;
            this.queensCount = 0;
            this.broodCount = 0;
            this.lastBroodTick = 0;
        }

        deposit(amount) {
            if (!Number.isFinite(amount) || amount <= 0) return 0;
            const space = this.maxNutrients - this.storedNutrients;
            const accepted = Math.min(space, amount);
            this.storedNutrients += accepted;
            return accepted;
        }

        withdraw(amount) {
            if (!Number.isFinite(amount) || amount <= 0) return 0;
            const granted = Math.min(this.storedNutrients, amount);
            this.storedNutrients -= granted;
            return granted;
        }
    }

    class BenthicNestManager {
        // Attempt to establish a benthic colonial nest node on the seafloor
        static establishNest(nestNodes, species, x, y) {
            if (!Array.isArray(nestNodes)) return null;

            // Enforce minimum territorial spacing between distinct nests (min 110 px)
            for (let i = 0; i < nestNodes.length; i++) {
                const n = nestNodes[i];
                const dx = n.x - x;
                const dy = n.y - y;
                if (dx * dx + dy * dy < 110.0 * 110.0) return null;
            }

            const newNest = new NestNode(null, species, x, y);
            nestNodes.push(newNest);
            return newNest;
        }

        // Assign or update individual phenotypic caste based on genetic bias and colony demographics
        static assignCaste(org, nestNode) {
            if (!org || !org.alive) return "SOLITARY";

            const dna = org.dna || {};
            const casteBias = typeof dna.socialCasteBias === "number" ? dna.socialCasteBias : 1.0;
            const hardness = typeof org.scleriteHardness === "number" ? org.scleriteHardness : 0.2;
            const speed = typeof dna.speed === "number" ? dna.speed : 1.0;

            // 1. Founding Queen / Reproductive Core (High energy, low mobility, central breeder)
            if (nestNode && nestNode.queensCount === 0 && org.energy > 75.0 && casteBias > 1.8) {
                nestNode.queensCount++;
                return "QUEEN";
            }

            // 2. Soldier / Sentinel (Heavy sclerotized armor, high defense, acute predator alarm)
            if (hardness >= 0.45 || (org.cuticleThickness || 0) >= 2.0 || casteBias > 1.4) {
                return "SOLDIER";
            }

            // 3. Scout / Forager (High speed, wide foraging range, recruitment trail emittance)
            if (speed >= 1.15 || (dna.pheromoneEmissionRate || 0) >= 0.30 || casteBias < 0.7) {
                return "SCOUT";
            }

            // 4. Default: Worker / Nurse (Nest maintenance, nutrient gathering, brood care)
            return "WORKER";
        }

        // Execute step cycle for all benthic nests and resident organisms
        static step(nestNodes, organisms, tick) {
            if (!Array.isArray(nestNodes)) return;

            // 1. Reset demographic counts per nest
            for (let i = 0; i < nestNodes.length; i++) {
                const n = nestNodes[i];
                n.workersCount = 0;
                n.scoutsCount = 0;
                n.soldiersCount = 0;
                n.queensCount = 0;

                // Passive structural maintenance burn
                n.storedNutrients = Math.max(0.0, n.storedNutrients - 0.015);
            }

            if (!Array.isArray(organisms)) return;

            // 2. Process organisms near their conspecific nests
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org.alive) continue;

                // Locate nearest conspecific nest
                let nearestNest = null;
                let minDistSq = Infinity;

                for (let j = 0; j < nestNodes.length; j++) {
                    const n = nestNodes[j];
                    if (n.species !== org.species) continue;

                    const dx = n.x - org.x;
                    const dy = n.y - org.y;
                    const dSq = dx * dx + dy * dy;

                    if (dSq < minDistSq) {
                        minDistSq = dSq;
                        nearestNest = n;
                    }
                }

                // If no nest exists and energetic adult is present, establish one
                if (!nearestNest && org.energy > 80.0 && organisms.length > 25 && Math.random() < 0.005) {
                    nearestNest = BenthicNestManager.establishNest(nestNodes, org.species, org.x, org.y);
                }

                // Assign caste role
                if (!org.socialCaste || org.socialCaste === "SOLITARY") {
                    org.socialCaste = BenthicNestManager.assignCaste(org, nearestNest);
                }

                if (!nearestNest) continue;

                const nestRadiusSq = nearestNest.radius * nearestNest.radius;
                const isWithinNest = minDistSq <= nestRadiusSq;

                if (isWithinNest) {
                    // Update demographic counters
                    if (org.socialCaste === "QUEEN") nearestNest.queensCount++;
                    else if (org.socialCaste === "SOLDIER") nearestNest.soldiersCount++;
                    else if (org.socialCaste === "SCOUT") nearestNest.scoutsCount++;
                    else nearestNest.workersCount++;

                    // Trophallactic nutrient exchange
                    const trophAffinity = (org.dna && typeof org.dna.trophallaxisAffinity === "number")
                        ? org.dna.trophallaxisAffinity : 0.35;

                    if (org.socialCaste === "WORKER" || org.socialCaste === "SCOUT") {
                        // Foragers deposit surplus nutrients into nest reserves
                        if (org.energy > 65.0) {
                            const surplus = (org.energy - 65.0) * trophAffinity;
                            const accepted = nearestNest.deposit(surplus);
                            org.energy -= accepted;
                            org.trophallaxisStatus = "DEPOSITING";
                        } else {
                            org.trophallaxisStatus = "PATROLLING";
                        }
                    } else if (org.socialCaste === "QUEEN" || org.energy < 40.0) {
                        // Queens and depleted sentinels withdraw sustenance from nest reserves
                        if (nearestNest.storedNutrients > 15.0) {
                            const needed = Math.min(20.0, 80.0 - org.energy);
                            const granted = nearestNest.withdraw(needed);
                            org.energy += granted;
                            org.trophallaxisStatus = "RECEIVING";
                        } else {
                            org.trophallaxisStatus = "FASTING";
                        }
                    }

                    // Nest protective sanctuary: +20% kinetic deflection bonus
                    org.inNestSanctuary = true;
                } else {
                    org.inNestSanctuary = false;
                    org.trophallaxisStatus = "FORAGING";
                }
            }

            // 3. Communal Nest Brood Reproduction: well-provisioned nests hatch larvae
            for (let i = 0; i < nestNodes.length; i++) {
                const n = nestNodes[i];
                if (n.storedNutrients >= 130.0 && organisms.length < 180) {
                    if (tick - n.lastBroodTick >= 180) {
                        n.storedNutrients -= 50.0;
                        n.broodCount++;
                        n.lastBroodTick = tick;

                        // Spawn protected offspring at nest coordinates
                        const larva = {
                            id: "larva_" + tick + "_" + i,
                            alive: true,
                            species: n.species,
                            x: n.x + (Math.random() - 0.5) * 15,
                            y: n.y + (Math.random() - 0.5) * 15,
                            vx: (Math.random() - 0.5) * 0.8,
                            vy: (Math.random() - 0.5) * 0.8,
                            energy: 65,
                            age: 0,
                            cuticleThickness: 0.5,
                            scleriteHardness: 0.2,
                            effectiveAbsorption: 0.2,
                            hasExoskeleton: true,
                            instarLevel: 1,
                            socialCaste: "WORKER",
                            inNestSanctuary: true,
                            dna: { size: 5.5, speed: 0.9, pheromoneEmissionRate: 0.25, colonialAffinity: 0.4 }
                        };
                        organisms.push(larva);
                    }
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = { NestNode, BenthicNestManager };
    } else {
        global.NestNode = NestNode;
        global.BenthicNestManager = BenthicNestManager;
    }
})(typeof window !== "undefined" ? window : global);
