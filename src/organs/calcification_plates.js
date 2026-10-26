// BioEcosystem - Biogenic Calcification, Coccolith Plates & Mechanical Deflection
// Module: src/organs/calcification_plates.js
// Version: 6.17.0 (Hour 337 - System Agent: Porous Calcite Lattice & Shell Fracture Mechanics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CalcificationPlateManager
     * High-fidelity simulation of cellular calcification, porous coccolith lattice armor,
     * mechanical predator deflection, brittle fracture dynamics, and benthic chalk sedimentation:
     * - Binds ambient calcium and carbonate ions into crystalline calcite shields
     * - Synthesizes lightweight porous honeycomb lattice (porousCalciteLattice) to cut ballast drag
     * - Simulates brittle shell fracture bursts under apex predator strikes with escape recoil
     * - Metabolically repairs fractured lattice plates during cellular resting phase
     * - Contributes shattered calcite flakes and senescent plates to benthic chalk deposition
     */
    class CalcificationPlateManager {
        constructor() {
            this.chalkDepositionPool = 35.0;
            this.maxPlatesPerCell = 12;
            this.metrics = {
                calcifiedOrganismCount: 0,
                totalLiveCells: 0,
                calcificationRatio: 0.0,
                meanCoccolithPlates: 0.0,
                meanShellHardness: 0.0,
                meanPorousLattice: 0.0,
                cumulativeDeflections: 0,
                cumulativeFractures: 0,
                chalkDepositionFlux: 0.0
            };
        }

        /**
         * Initialize default calcification and porous lattice attributes on an organism instance.
         * @param {Object} org - Simulation organism.
         */
        static initOrganism(org) {
            if (!org) return;
            if (org.coccolithPlates === undefined) org.coccolithPlates = 0.0;
            if (org.shellHardness === undefined) org.shellHardness = 0.0;
            if (org.porousLatticeRatio === undefined) org.porousLatticeRatio = 0.55;
            if (org.ballastMass === undefined) org.ballastMass = 0.0;
            if (org.fractureTicks === undefined) org.fractureTicks = 0;
            if (org.fractureCracks === undefined) org.fractureCracks = 0.0;
            if (org.deflectionCount === undefined) org.deflectionCount = 0;
            if (org.deflectionCooldown === undefined) org.deflectionCooldown = 0;
            if (org.lastDeflectionTick === undefined) org.lastDeflectionTick = 0;
        }

        /**
         * Update cellular calcification accretion, porous lattice, hardness, and ballast physics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} tick - Current simulation frame count.
         */
        step(organisms, tick) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.metrics.calcifiedOrganismCount = 0;
                this.metrics.totalLiveCells = 0;
                this.metrics.calcificationRatio = 0.0;
                this.metrics.meanCoccolithPlates = 0.0;
                this.metrics.meanShellHardness = 0.0;
                this.metrics.meanPorousLattice = 0.0;
                return;
            }

            let liveCells = 0;
            let calcifiedCount = 0;
            let totalPlates = 0.0;
            let totalHardness = 0.0;
            let totalPorous = 0.0;
            let frameChalkFlux = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCells++;

                CalcificationPlateManager.initOrganism(org);

                if (org.deflectionCooldown > 0) org.deflectionCooldown--;
                if (org.fractureTicks > 0) org.fractureTicks--;

                // 1. Biomineral crystallization kinetics from seawater carbonate and calcium
                const baseEfficiency = (org.dna && typeof org.dna.calcificationEfficiency === "number")
                    ? org.dna.calcificationEfficiency
                    : 0.65;
                const isHerbivoreOrAutotroph = (org.niche === "herbivore") || (org.dna && (org.dna.diet < 0.45 || org.dna.diet === 0));
                const photicBonus = (isHerbivoreOrAutotroph && org.y < 380.0) ? 1.4 : 1.0;
                const mineralAffinity = (org.dna && typeof org.dna.mineralArmorAffinity === "number")
                    ? org.dna.mineralArmorAffinity
                    : 0.45;

                // Accretion rate: steady cellular biomineralization
                if (org.energy > 20.0) {
                    const plateGrowth = 0.009 * baseEfficiency * photicBonus * (0.8 + mineralAffinity * 0.5);
                    org.coccolithPlates = Math.min(this.maxPlatesPerCell, org.coccolithPlates + plateGrowth);
                    // Minimal metabolic upkeep for crystallizing calcite
                    org.energy = Math.max(5.0, org.energy - 0.0012 * org.coccolithPlates);
                }

                // 2. Porous Calcite Lattice synthesis (porous honeycomb geometry reduces ballast drag)
                const latticeGene = (org.dna && typeof org.dna.porousLatticeGene === "number")
                    ? org.dna.porousLatticeGene
                    : 0.60;
                org.porousLatticeRatio = Number(Math.min(0.95, 0.35 + (latticeGene * 0.45) + (org.coccolithPlates * 0.015)).toFixed(3));

                // 3. Shell hardness calculation based on plate density, mineral affinity, and lattice structure
                const plateRatio = org.coccolithPlates / this.maxPlatesPerCell;
                // Fractures temporarily degrade effective hardness until repaired
                const crackDamping = Math.max(0.40, 1.0 - (org.fractureCracks * 0.60));
                const rawHardness = (plateRatio * 0.82) + (mineralAffinity * 0.18);
                org.shellHardness = Number(Math.min(1.0, rawHardness * crackDamping).toFixed(3));

                // 4. Ballast mass & hydrodynamic downward settling (mitigated by porous lattice)
                const effectiveDensity = Math.max(0.45, 1.10 - (org.porousLatticeRatio * 0.55));
                const ballastMass = org.coccolithPlates * 0.038 * effectiveDensity;
                org.ballastMass = Number(ballastMass.toFixed(3));

                // Downward settling ballast offset counteracted by cellular motility and porosity
                if (ballastMass > 0.08 && org.y < 580.0) {
                    const motilityDamping = (org.speed || 1.0) > 0.8 ? 0.30 : 0.75;
                    const porosityLightening = 1.15 - (org.porousLatticeRatio * 0.45);
                    org.y += ballastMass * 0.062 * motilityDamping * porosityLightening;
                }

                // 5. Cellular shell regeneration: heal fracture cracks over time using energy
                if (org.fractureCracks > 0.0 && org.energy > 18.0) {
                    org.fractureCracks = Math.max(0.0, org.fractureCracks - 0.015);
                    org.energy = Math.max(5.0, org.energy - 0.002);
                }

                if (org.coccolithPlates >= 0.08) {
                    calcifiedCount++;
                    totalPlates += org.coccolithPlates;
                    totalHardness += org.shellHardness;
                    totalPorous += org.porousLatticeRatio;
                }

                // Chalk shedding: worn plates flake off periodically
                if (tick % 120 === 0 && org.coccolithPlates > 3.0) {
                    const shed = 0.04;
                    org.coccolithPlates -= shed;
                    frameChalkFlux += shed * 0.5;
                }
            }

            // Accrete shed chalk into benthic deposition pool
            this.chalkDepositionPool = Math.min(250.0, this.chalkDepositionPool + frameChalkFlux);

            // Update telemetry metrics snapshot
            this.metrics.totalLiveCells = liveCells;
            this.metrics.calcifiedOrganismCount = calcifiedCount;
            this.metrics.calcificationRatio = liveCells > 0 ? Number(((calcifiedCount / liveCells) * 100.0).toFixed(1)) : 0.0;
            this.metrics.meanCoccolithPlates = calcifiedCount > 0 ? Number((totalPlates / calcifiedCount).toFixed(2)) : 0.0;
            this.metrics.meanShellHardness = calcifiedCount > 0 ? Number((totalHardness / calcifiedCount).toFixed(3)) : 0.0;
            this.metrics.meanPorousLattice = calcifiedCount > 0 ? Number((totalPorous / calcifiedCount).toFixed(3)) : 0.0;
            this.metrics.chalkDepositionFlux = Number(frameChalkFlux.toFixed(4));
        }

        /**
         * Handle mechanical predator deflection, brittle fracture bursts, and panic escape recoil.
         * @param {Object} prey - Defender organism possessing coccolith plates.
         * @param {Object} predator - Attacker organism.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Deflection and fracture resolution outcome.
         */
        handlePredatorDeflection(prey, predator, tick) {
            if (!prey || !predator) return { deflected: false, damageMultiplier: 1.0, fractured: false };
            CalcificationPlateManager.initOrganism(prey);

            const hardness = prey.shellHardness || 0.0;
            const porousLattice = prey.porousLatticeRatio || 0.55;
            if (hardness < 0.2 || prey.deflectionCooldown > 0) {
                return { deflected: false, damageMultiplier: Math.max(0.65, 1.0 - hardness * 0.35), fractured: false };
            }

            // Probability of complete strike deflection based on shell hardness
            const deflectionChance = hardness * 0.58;
            if (Math.random() < deflectionChance) {
                prey.deflectionCount = (prey.deflectionCount || 0) + 1;
                prey.lastDeflectionTick = tick || 0;
                prey.deflectionCooldown = 25; // 25-tick refractory window

                // Wear on armor plates from absorbing kinetic strike
                prey.coccolithPlates = Math.max(0.0, prey.coccolithPlates - 0.22);
                this.chalkDepositionPool = Math.min(250.0, this.chalkDepositionPool + 0.15);

                // Predator jaw recoil: predator loses strike momentum
                if (typeof predator.vx === "number") predator.vx *= -0.4;
                if (typeof predator.vy === "number") predator.vy *= -0.4;
                predator.jawRecoilCooldown = 18;

                this.metrics.cumulativeDeflections++;
                return { deflected: true, damageMultiplier: 0.12, fractured: false };
            }

            // High-impact brittle fracture: calcite crystal shatters under apex bite force
            if (hardness >= 0.24 && Math.random() < 0.55) {
                prey.fractureTicks = 32;
                prey.fractureCracks = Math.min(1.0, (prey.fractureCracks || 0.0) + 0.35);
                prey.lastDeflectionTick = tick || 0;
                prey.deflectionCooldown = 18;

                // Calcite shatter sheds mineral into benthic deposition pool
                const fractureShed = Math.min(prey.coccolithPlates, 0.40);
                prey.coccolithPlates = Math.max(0.0, prey.coccolithPlates - fractureShed);
                this.chalkDepositionPool = Math.min(250.0, this.chalkDepositionPool + fractureShed * 0.75);
                this.metrics.cumulativeFractures++;

                // Panic escape impulse: kinetic reaction shoots prey away from predator
                const dx = (typeof prey.x === "number" && typeof predator.x === "number") ? (prey.x - predator.x) : 1.0;
                const dy = (typeof prey.y === "number" && typeof predator.y === "number") ? (prey.y - predator.y) : 0.0;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1.0;
                const escapeImpulse = 2.2 * (0.8 + porousLattice * 0.5);

                if (typeof prey.vx === "number") prey.vx = (dx / dist) * escapeImpulse;
                if (typeof prey.vy === "number") prey.vy = (dy / dist) * escapeImpulse;

                // Attacker receives micro-calcite debris recoil
                if (typeof predator.vx === "number") predator.vx *= -0.25;
                if (typeof predator.vy === "number") predator.vy *= -0.25;
                predator.jawRecoilCooldown = 14;

                return { deflected: false, damageMultiplier: 0.25, fractured: true, escapeImpulse: escapeImpulse };
            }

            // Partial armor absorption without fracture burst
            return { deflected: false, damageMultiplier: Math.max(0.35, 1.0 - hardness * 0.65), fractured: false };
        }

        /**
         * Record calcite shedding from dying cells into benthic chalk beds.
         * @param {Object} org - Senescent or deceased organism.
         */
        recordCellDeathCalcite(org) {
            if (!org || (org.coccolithPlates || 0) < 0.5) return;
            const releasedCalcite = org.coccolithPlates * 0.45;
            this.chalkDepositionPool = Math.min(250.0, this.chalkDepositionPool + releasedCalcite);
            org.coccolithPlates = 0.0;
            org.fractureCracks = 0.0;
            org.fractureTicks = 0;
        }

        /**
         * Retrieve telemetry snapshot for environmental HUD and scientific codex.
         * @returns {Object} Current calcification metrics state.
         */
        getMetrics() {
            return {
                ...this.metrics,
                chalkDepositionPool: Number(this.chalkDepositionPool.toFixed(1))
            };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CalcificationPlateManager;
    } else {
        global.CalcificationPlateManager = CalcificationPlateManager;
        global.calcificationPlateManager = new CalcificationPlateManager();
    }
})(typeof window !== "undefined" ? window : global);
