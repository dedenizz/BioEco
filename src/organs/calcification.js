// BioEcosystem - Biogenic Calcification, Polyp Budding & Thermal Bleaching Kinetics
// Module: src/organs/calcification.js
// Version: 5.68.0 (Hour 288 - System Agent: Thermal Bleaching Kinetics & Mucus Barrier)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ReefColonyManager
     * Simulates benthic biogenic micro-atolls, aragonite reef nodes,
     * physical nursery shelter fields, and hydrodynamic wave damping.
     */
    class ReefColonyManager {
        /**
         * Initialize default bioherm micro-atoll reef substrate nodes on the benthic seabed.
         * @returns {Array<Object>} List of initialized reef substrate nodes.
         */
        static createDefaultReefNodes() {
            return [
                { id: "reef_alpha", x: 140.0, y: 535.0, radius: 24.0, aragoniteMass: 85.0, polypCount: 4, height: 35.0 },
                { id: "reef_beta", x: 310.0, y: 545.0, radius: 28.0, aragoniteMass: 110.0, polypCount: 6, height: 42.0 },
                { id: "reef_gamma", x: 480.0, y: 540.0, radius: 26.0, aragoniteMass: 95.0, polypCount: 5, height: 38.0 },
                { id: "reef_delta", x: 650.0, y: 530.0, radius: 22.0, aragoniteMass: 75.0, polypCount: 3, height: 30.0 }
            ];
        }

        /**
         * Step cycle for biogenic reef nodes: accretion, physical nursery shelter, and wave damping.
         * @param {Array<Object>} reefNodes - Active bioherm reef structures.
         * @param {Array<Object>} organisms - Living simulation organisms.
         * @param {number} tick - Current simulation frame count.
         */
        static step(reefNodes, organisms, tick) {
            if (!reefNodes || !Array.isArray(reefNodes)) return;

            // Reset shelter factor at cycle start so organisms outside bioherms cleanly decay
            if (organisms && Array.isArray(organisms)) {
                for (let k = 0; k < organisms.length; k++) {
                    if (organisms[k] && organisms[k].alive) organisms[k].reefShelterFactor = 0.0;
                }
            }

            for (let i = 0; i < reefNodes.length; i++) {
                const node = reefNodes[i];
                if (!node) continue;

                // 1. Basal mineralization accretion from dissolved seawater carbonate
                if (tick % 15 === 0) {
                    node.aragoniteMass = Math.min(250.0, node.aragoniteMass + 0.04);
                    node.radius = Math.min(48.0, 18.0 + Math.sqrt(node.aragoniteMass) * 1.9);
                    node.height = Math.min(65.0, 22.0 + Math.sqrt(node.aragoniteMass) * 2.6);
                }

                // 2. Physical shelter field and hydrodynamic damping for nearby organisms
                if (organisms && Array.isArray(organisms)) {
                    const shelterRadiusSq = (node.radius + 22.0) ** 2;
                    let attachedPolyps = 0;

                    for (let k = 0; k < organisms.length; k++) {
                        const org = organisms[k];
                        if (!org || !org.alive) continue;
                        const dx = node.x - org.x, dy = node.y - org.y, dsq = dx * dx + dy * dy;

                        if (dsq < shelterRadiusSq) {
                            const dist = Math.sqrt(dsq) || 1.0;
                            const proximity = 1.0 - dist / (node.radius + 22.0);

                            // Wave and flow hydrodynamic damping inside porous bioherm framework
                            org.vx *= (1.0 - proximity * 0.04);
                            org.vy *= (1.0 - proximity * 0.04);

                            // Nursery shelter factor protects smaller organisms against predators
                            const orgSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
                            if (orgSize <= 6.5) {
                                const currentFactor = Number(Math.min(0.60, proximity * 0.65).toFixed(3));
                                org.reefShelterFactor = Math.max(org.reefShelterFactor || 0.0, currentFactor);
                            }

                            if (org.isReefAnchored) attachedPolyps++;
                        }
                    }
                    node.polypCount = attachedPolyps;
                }
            }
        }
    }

    /**
     * CalcificationSystem
     * Models cellular calcium carbonate mineralization (CaCO3 aragonite deposition),
     * polyp colony budding, thermal bleaching kinetics, and zooxanthellae photosynthesis.
     */
    class CalcificationSystem {
        constructor(organism) {
            this.organism = organism;
            const dna = (organism && organism.dna) ? organism.dna : {};

            this.calcificationRate = typeof dna.calcificationRate === "number" ? dna.calcificationRate : 0.25;
            this.aragoniteDensity = typeof dna.aragoniteDensity === "number" ? dna.aragoniteDensity : 0.30;
            this.polypBuddingThreshold = typeof dna.polypBuddingThreshold === "number" ? dna.polypBuddingThreshold : 0.40;
            this.symbiontDensity = typeof dna.symbiontDensity === "number" ? dna.symbiontDensity : 0.35;

            // Biogenic calcification state variables
            this.calcifiedMass = 0.0; this.aragoniteMatrixScore = 0.0; this.isReefAnchored = false;
            this.polypTentacleReach = 12.0; this.symbiontEnergyYield = 0.0; this.reefShelterFactor = 0.0;
            this.activeReefRef = null; this.bleachingScore = 0.0; this.mucusSheathFactor = 0.0; this.symbiontRecoveryRate = 0.012;
        }

        /**
         * Check proximity to benthic bioherm reef nodes and manage polyp anchoring.
         * @param {Array<Object>} reefNodes - Active reef substrate nodes.
         */
        checkReefAnchoring(reefNodes) {
            const org = this.organism;
            if (!org || !org.alive) return;

            let closestNode = null, minDistanceSq = 3600.0; // 60px sensing radius squared

            if (reefNodes && Array.isArray(reefNodes)) {
                for (let i = 0; i < reefNodes.length; i++) {
                    const node = reefNodes[i];
                    if (!node) continue;
                    const dsq = (org.x - node.x) ** 2 + (org.y - node.y) ** 2;
                    if (dsq < minDistanceSq) { minDistanceSq = dsq; closestNode = node; }
                }
            }

            if (closestNode) {
                this.activeReefRef = closestNode;
                const dist = Math.sqrt(minDistanceSq);
                const anchorMargin = closestNode.radius + 8.0;

                // High budding threshold organisms anchor as sessile filter-feeding polyps
                if (dist <= anchorMargin && this.polypBuddingThreshold > 0.30 && org.energy > 35.0) {
                    this.isReefAnchored = true;
                    org.vx *= 0.60; org.vy *= 0.60;
                } else {
                    this.isReefAnchored = false;
                }
            } else {
                this.activeReefRef = null; this.isReefAnchored = false;
            }
        }

        /**
         * Model thermal bleaching kinetics, reactive oxygen stress, zooxanthellae expulsion,
         * and protective organic mucus barrier secretion.
         * @param {number} ambientTemp - Ambient water temperature in Celsius.
         * @param {number} thermalStrain - Physiological heat shock strain.
         */
        processThermalStressAndBleaching(ambientTemp, thermalStrain) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const temp = typeof ambientTemp === "number" ? ambientTemp : (org.thermalExposure || 2.0);
            const strain = typeof thermalStrain === "number" ? thermalStrain : (org.thermalStrain || 0.0);

            // Coral bleaching thermal threshold begins at 28.5 C
            if (temp > 28.5 || strain > 0.05) {
                const thermalSurge = Math.max(0.0, temp - 28.5);
                const rawStress = (thermalSurge * 0.035) + (strain * 1.4);

                // Energy investment into protective mucus sheath secretion
                if (org.energy > 22.0 && this.mucusSheathFactor < 1.0) {
                    org.energy -= 0.012;
                    this.mucusSheathFactor = Math.min(1.0, this.mucusSheathFactor + 0.045);
                }

                // Mucus barrier dampens up to 50% of thermal stress on internal symbionts
                const dampedStress = rawStress * (1.0 - this.mucusSheathFactor * 0.50);
                this.bleachingScore = Math.min(1.0, this.bleachingScore + dampedStress * 0.024);

                // Severe bleaching induces aragonite CaCO3 skeleton dissolution
                if (this.bleachingScore > 0.40) {
                    const dissolutionRate = 0.018 * (this.bleachingScore - 0.40);
                    this.calcifiedMass = Math.max(0.0, this.calcifiedMass - dissolutionRate);
                }
            } else {
                // Mild water temperature: mucus barrier gradually sloughs off
                this.mucusSheathFactor = Math.max(0.0, this.mucusSheathFactor - 0.01);

                // Symbiont recolonization: zooxanthellae proliferate back into healthy host tissue
                if (this.bleachingScore > 0.0) {
                    this.bleachingScore = Math.max(0.0, this.bleachingScore - this.symbiontRecoveryRate);
                }
            }
        }

        /**
         * Catalyze calcium carbonate secretion: Ca(2+) + 2HCO3(-) -> CaCO3 + CO2 + H2O.
         * @param {number} dt - Delta time step.
         */
        depositCalciumCarbonate(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Calcification requires metabolic energy and is inhibited by severe bleaching
            if (org.energy > 28.0 && this.calcificationRate > 0.10 && this.bleachingScore < 0.65) {
                const secretionEnergyCost = 0.016 * this.calcificationRate;
                org.energy -= secretionEnergyCost;

                // Aragonite crystal accretion rate reduced when bleaching is active
                const bleachPenalty = Math.max(0.15, 1.0 - this.bleachingScore * 0.85);
                const growthFactor = (this.calcificationRate * 0.045) * (1.0 + this.aragoniteDensity * 0.8) * bleachPenalty;
                this.calcifiedMass = Math.min(100.0, this.calcifiedMass + growthFactor);

                // If anchored to a reef node, contribute to collective bioherm accretion
                if (this.isReefAnchored && this.activeReefRef) {
                    this.activeReefRef.aragoniteMass = Math.min(250.0, this.activeReefRef.aragoniteMass + growthFactor * 0.40);
                }
            }

            // Calculate normalized aragonite matrix structural score
            this.aragoniteMatrixScore = Math.min(1.0, (this.calcifiedMass / 40.0) * (0.6 + this.aragoniteDensity * 0.5));
        }

        /**
         * Mutualistic zooxanthellae endosymbiont photosynthesis: generates glycerol and sugars.
         * @param {number} lightRatio - Ambient downwelling photic irradiance.
         */
        synthesizeSymbiontGlycerol(lightRatio) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Micro-algal symbionts harvest photic energy; output drops sharply under bleaching
            if (this.symbiontDensity > 0.10) {
                const effLight = Math.max(0.10, Math.min(1.0, lightRatio || 0.40));
                const healthySymbionts = Math.max(0.0, 1.0 - this.bleachingScore);
                const yieldFlux = (this.symbiontDensity * 0.38) * effLight * healthySymbionts * (this.isReefAnchored ? 1.45 : 1.0);

                this.symbiontEnergyYield = Number(yieldFlux.toFixed(3));
                org.energy = Math.min(220.0, org.energy + this.symbiontEnergyYield);
            } else {
                this.symbiontEnergyYield = 0.0;
            }
        }

        /**
         * Primary simulation step cycle executed per frame.
         * @param {number} tick - Simulation frame count.
         * @param {Array<Object>} reefNodes - Active bioherm reef structures.
         * @param {number} lightRatio - Photic light irradiance ratio.
         * @param {number} ambientTemp - Ambient local water temperature in Celsius.
         * @param {number} thermalStrain - Physiological heat shock strain.
         */
        step(tick, reefNodes, lightRatio, ambientTemp, thermalStrain) {
            const org = this.organism;
            if (!org || !org.alive) return;

            this.checkReefAnchoring(reefNodes);
            this.processThermalStressAndBleaching(ambientTemp, thermalStrain);
            this.depositCalciumCarbonate(0.016);
            this.synthesizeSymbiontGlycerol(lightRatio);

            // Expose updated properties directly onto host organism
            org.calcifiedMass = Number(this.calcifiedMass.toFixed(2));
            org.aragoniteMatrixScore = Number(this.aragoniteMatrixScore.toFixed(3));
            org.isReefAnchored = this.isReefAnchored;
            org.symbiontEnergyYield = this.symbiontEnergyYield;
            org.bleachingScore = Number(this.bleachingScore.toFixed(3));
            org.mucusSheathFactor = Number(this.mucusSheathFactor.toFixed(3));
            if (typeof org.reefShelterFactor !== "number") org.reefShelterFactor = 0.0;
        }

        /**
         * Cleanup references on organism mortality to avoid memory leaks.
         */
        cleanup() {
            this.organism = null; this.activeReefRef = null; this.calcifiedMass = 0.0;
            this.aragoniteMatrixScore = 0.0; this.isReefAnchored = false; this.symbiontEnergyYield = 0.0;
            this.reefShelterFactor = 0.0; this.bleachingScore = 0.0; this.mucusSheathFactor = 0.0;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = { CalcificationSystem, ReefColonyManager };
    } else {
        global.CalcificationSystem = CalcificationSystem;
        global.ReefColonyManager = ReefColonyManager;
    }
})(typeof window !== "undefined" ? window : global);
