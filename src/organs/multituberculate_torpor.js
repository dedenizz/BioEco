// BioEcosystem - Late Cretaceous Mammalian Specialization & Multituberculate Plagiaulacoid Blades / Torpor
// Module: src/organs/multituberculate_torpor.js
// Version: 8.94.0 (Hour 614 - System Agent: Plagiaulacoid Blade Dentition, Fossorial Thermal Shelter & Hypometabolic Torpor Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MultituberculateTorporManager
     * High-fidelity biological simulation of Late Cretaceous Mammalian Specialization and K-Pg Extinction Resilience:
     * - Multituberculata (Ptilodus & Taeniolabis lineages):
     *   Evolution of the enlarged, serrated p4 lower premolar into a circular-saw blade
     *   (plagiaulacoidBladeLength: 2.5 - 6.0 mm, plagiaulacoidSerrationCount: 8 - 16).
     *   Propalinal (backward-to-forward) jaw kinematics slicing tough seeds, tubers, and roots
     *   preserved underground during post-impact winter (palinalGrindingEfficiency: 0.70 - 0.98).
     *   High-efficiency granivorous caloric assimilation (granivorousCaloricYield: 0.75 - 0.98)
     *   with resilient micro-striated blade enamel (bladeEnamelDurability: 0.72 - 0.96).
     * - Fossorial Thermal Shelter & Burrowing Mechanics:
     *   Fossorial burrowing creating subterranean galleries (burrowingDepth: 20 - 50 cm),
     *   providing 90%+ thermal insulation against surface firestorms and catastrophic climatic chilling
     *   (thermalShelterInsulation: 0.70 - 0.98).
     * - State-Dependent Torpor & Metabolic Resilience:
     *   Hypometabolic depression reducing basal metabolic rate by 85% - 95% during starvation or cold
     *   (torporMetabolicSuppression: 0.85 - 0.95).
     *   Controlled hypothermia floor (controlledHypothermiaFloor: 12.0 - 22.0 C) reducing energy expenditure.
     *   Brown Adipose Tissue (BAT) non-shivering thermogenesis enabling rapid spontaneous rewarming
     *   (brownFatThermogenesis: 0.70 - 0.95).
     * - 127th Telemetry Channel (% PBI - Plagiaulacoid Blade Index) mathematical core.
     * - 128th Telemetry Channel (% THI - Torpor & Hibernation Index) mathematical core.
     */
    class MultituberculateTorporManager {
        constructor() {
            this.basePalinalEfficiency = 0.84;            // [0.70 - 0.98]
            this.baseSerrations = 12.0;                   // [8 - 16 ridges]
            this.baseGranivorousYield = 0.85;             // [0.75 - 0.98]
            this.baseBladeDurability = 0.82;              // [0.72 - 0.96]
            this.baseTorporSuppression = 0.90;            // [0.85 - 0.95]
            this.baseShelterInsulation = 0.88;            // [0.70 - 0.98]
            this.baseBrownFatHeat = 0.85;                 // [0.70 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalMultituberculates: 0,
                totalTorporCapable: 0,
                activeBurrowers: 0,
                activeTorporSleepers: 0,
                meanPlagiaulacoidBladeIndex: 0.0,         // 127th Channel % PBI
                meanTorporHibernationIndex: 0.0,          // 128th Channel % THI
                meanPalinalGrinding: 0.84,
                meanSerrationCount: 12.0,
                meanGranivorousYield: 0.85,
                meanBladeDurability: 0.82,
                meanTorporSuppression: 0.90,
                meanShelterInsulation: 0.88,
                meanBrownFatThermogenesis: 0.85,
                seedGrindingEvents: 0,
                torporEntryEvents: 0,
                thermalPulseSurvivals: 0,
                cumulativePostImpactBiomass: 0.0
            };
        }

        /**
         * Initialize Multituberculate and Torpor traits on eligible organisms.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            const isMammalian = org.isMammaliaform || org.isEutherian || org.isMetatherian ||
                org.hasTribosphenicMolars || (org.mammaliaformEarIndex || 0) > 30.0;

            if (isMammalian) {
                org.isMultituberculate = Math.random() < 0.40;
                org.canEnterTorpor = true;
            } else {
                org.isMultituberculate = false;
                org.canEnterTorpor = Math.random() < 0.15;
            }

            // 1. Plagiaulacoid Blade Dentition System
            org.hasPlagiaulacoidBlades = org.isMultituberculate;
            org.plagiaulacoidBladeLength = 2.5 + Math.random() * 3.5;          // 2.5 - 6.0 mm eq
            org.plagiaulacoidSerrationCount = 8.0 + Math.random() * 8.0;      // 8 - 16 ridges
            org.palinalGrindingEfficiency = 0.72 + Math.random() * 0.24;      // 0.72 - 0.96
            org.granivorousCaloricYield = 0.75 + Math.random() * 0.22;        // 0.75 - 0.97
            org.bladeEnamelDurability = 0.74 + Math.random() * 0.22;          // 0.74 - 0.96
            org.grindingCooldown = 0.0;

            // 2. Fossorial Shelter & Burrowing Mechanics
            org.burrowingDepth = 20.0 + Math.random() * 30.0;                 // 20 - 50 cm
            org.fossorialBurrowingAcuity = 0.70 + Math.random() * 0.25;       // 0.70 - 0.95
            org.thermalShelterInsulation = 0.75 + Math.random() * 0.22;       // 0.75 - 0.97
            org.isShelteredUnderground = false;

            // 3. State-Dependent Torpor & Heterothermic Hypometabolism
            org.isInTorpor = false;
            org.torporMetabolicSuppression = 0.86 + Math.random() * 0.09;     // 0.86 - 0.95 (86% - 95% cut)
            org.controlledHypothermiaFloor = 14.0 + Math.random() * 7.0;      // 14 - 21 C
            org.brownFatThermogenesis = 0.72 + Math.random() * 0.24;          // 0.72 - 0.96
            org.torporDurationTicks = 0;
            org.torporCooldown = 0;

            // Telemetry Indices & Regimes
            org.plagiaulacoidBladeIndex = 0.0;        // 127th Channel % PBI
            org.torporHibernationIndex = 0.0;         // 128th Channel % THI
            org.plagiaulacoidBladeState = "SIMPLE_PREMOLAR_SHEAR";
            org.torporHibernationState = "RIGID_HOMEOTHERMY_VULNERABLE";
        }

        /**
         * Update individual organism's Multituberculate blade and Torpor mechanics.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.canEnterTorpor === "undefined") {
                this.initOrganism(org);
            }

            // 1. Multituberculate Plagiaulacoid Blade Chewing Mechanics
            if (org.hasPlagiaulacoidBlades) {
                if (org.grindingCooldown > 0) {
                    org.grindingCooldown = Math.max(0, org.grindingCooldown - dt);
                }

                // Palinal sawing/slicing of seeds and subterranean storage roots
                if ((org.isFeeding || org.isHunting || org.energy < 45) && org.grindingCooldown <= 0) {
                    const palinal = org.palinalGrindingEfficiency || 0.84;
                    const yieldRate = org.granivorousCaloricYield || 0.85;

                    if (Math.random() < 0.09 * palinal) {
                        this.metrics.seedGrindingEvents++;
                        org.grindingCooldown = 1.6;

                        // Caloric gain from tough seed digestion
                        const seedBonus = 1.65 * yieldRate * (org.plagiaulacoidSerrationCount / 16.0);
                        org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + seedBonus);
                    }
                }

                // 127th Channel: % PBI Formulation
                const wPalinal = (org.palinalGrindingEfficiency || 0.84) * 0.35;
                const wSerr = Math.min(1.0, (org.plagiaulacoidSerrationCount || 12.0) / 16.0) * 0.30;
                const wYield = (org.granivorousCaloricYield || 0.85) * 0.20;
                const wDur = (org.bladeEnamelDurability || 0.82) * 0.15;
                const rawPBI = (wPalinal + wSerr + wYield + wDur) * 100.0;
                org.plagiaulacoidBladeIndex = Math.max(0.0, Math.min(100.0, rawPBI));

                // Classify 127th Channel Regime
                if (org.plagiaulacoidBladeIndex < 25.0) {
                    org.plagiaulacoidBladeState = "SIMPLE_PREMOLAR_SHEAR";
                } else if (org.plagiaulacoidBladeIndex < 50.0) {
                    org.plagiaulacoidBladeState = "INCIPIENT_SERRATED_BLADE";
                } else if (org.plagiaulacoidBladeIndex < 75.0) {
                    org.plagiaulacoidBladeState = "TRUE_PLAGIAULACOID_SAW";
                } else {
                    org.plagiaulacoidBladeState = "ADVANCED_GRANIVOROUS_GRINDING";
                }
            } else {
                org.plagiaulacoidBladeIndex = 0.0;
                org.plagiaulacoidBladeState = "SIMPLE_PREMOLAR_SHEAR";
            }

            // 2. Fossorial Shelter & Burrowing Mechanics
            if (org.burrowingDepth && org.burrowingDepth > 20.0) {
                // Shelter state when surface is dangerous or during rest
                if (org.energy < 40.0 || (org.underAttack && Math.random() < 0.25)) {
                    org.isShelteredUnderground = true;
                    this.metrics.thermalPulseSurvivals++;
                } else if (org.energy > 75.0) {
                    org.isShelteredUnderground = false;
                }
            }

            // 3. State-Dependent Torpor & Hypometabolism Mechanics
            if (org.canEnterTorpor) {
                if (org.torporCooldown > 0) {
                    org.torporCooldown = Math.max(0, org.torporCooldown - dt);
                }

                // Enter torpor when starved or during severe environmental chilling
                if (!org.isInTorpor && (org.energy || 50) < 32.0 && org.torporCooldown <= 0) {
                    org.isInTorpor = true;
                    org.torporDurationTicks = 0;
                    this.metrics.torporEntryEvents++;
                }

                if (org.isInTorpor) {
                    org.torporDurationTicks++;

                    // Suppress basal metabolic decay by 85% - 95%
                    const suppression = org.torporMetabolicSuppression || 0.90;
                    org.effectiveMetabolicRate = (org.basalMetabolicRate || 0.012) * (1.0 - suppression);

                    // Suppress speed during dormant torpor
                    org.vx = (org.vx || 0) * 0.25;
                    org.vy = (org.vy || 0) * 0.25;

                    // Wake up via Brown Adipose Tissue (BAT) when safe food threshold reached or duration exhausted
                    if (org.energy > 48.0 || org.torporDurationTicks > 120) {
                        org.isInTorpor = false;
                        org.torporDurationTicks = 0;
                        org.torporCooldown = 5.0; // 5-second refractory period
                    }
                }

                // 128th Channel: % THI Formulation
                const wSupp = (org.torporMetabolicSuppression || 0.90) * 0.35;
                const wInsul = (org.thermalShelterInsulation || 0.88) * 0.30;
                const wBat = (org.brownFatThermogenesis || 0.85) * 0.20;
                const wDur = Math.min(1.0, (org.torporDurationTicks || 0) / 100.0) * 0.15;
                const rawTHI = (wSupp + wInsul + wBat + wDur) * 100.0;
                org.torporHibernationIndex = Math.max(0.0, Math.min(100.0, rawTHI));

                // Classify 128th Channel Regime
                if (org.torporHibernationIndex < 25.0) {
                    org.torporHibernationState = "RIGID_HOMEOTHERMY_VULNERABLE";
                } else if (org.torporHibernationIndex < 50.0) {
                    org.torporHibernationState = "SHALLOW_NOCTURNAL_TORPOR";
                } else if (org.torporHibernationIndex < 75.0) {
                    org.torporHibernationState = "DEEP_HYPOMETABOLIC_TORPOR";
                } else {
                    org.torporHibernationState = "FULL_SEASONAL_HIBERNATION";
                }
            } else {
                org.torporHibernationIndex = 0.0;
                org.torporHibernationState = "RIGID_HOMEOTHERMY_VULNERABLE";
            }
        }

        /**
         * Update all organisms and calculate collective Epoch 61 metrics.
         * @param {Array<Object>} organisms - Array of simulation entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateAll(organisms, dt, width, height) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let multiCount = 0;
            let torporCapableCount = 0;
            let burrowerCount = 0;
            let sleeperCount = 0;

            let sumPBI = 0.0;
            let sumTHI = 0.0;
            let sumPalinal = 0.0;
            let sumSerr = 0.0;
            let sumYield = 0.0;
            let sumDur = 0.0;
            let sumSupp = 0.0;
            let sumInsul = 0.0;
            let sumBat = 0.0;
            let totalBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.hasPlagiaulacoidBlades) {
                    multiCount++;
                    sumPBI += org.plagiaulacoidBladeIndex || 0.0;
                    sumPalinal += org.palinalGrindingEfficiency || 0.84;
                    sumSerr += org.plagiaulacoidSerrationCount || 12.0;
                    sumYield += org.granivorousCaloricYield || 0.85;
                    sumDur += org.bladeEnamelDurability || 0.82;
                    totalBiomass += (org.mass || 1.0) * 1.50;
                }

                if (org.canEnterTorpor) {
                    torporCapableCount++;
                    sumTHI += org.torporHibernationIndex || 0.0;
                    sumSupp += org.torporMetabolicSuppression || 0.90;
                    sumInsul += org.thermalShelterInsulation || 0.88;
                    sumBat += org.brownFatThermogenesis || 0.85;
                }

                if (org.isShelteredUnderground) burrowerCount++;
                if (org.isInTorpor) sleeperCount++;
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalMultituberculates = multiCount;
            this.metrics.totalTorporCapable = torporCapableCount;
            this.metrics.activeBurrowers = burrowerCount;
            this.metrics.activeTorporSleepers = sleeperCount;

            this.metrics.meanPlagiaulacoidBladeIndex = multiCount > 0 ? (sumPBI / multiCount) : 0.0;
            this.metrics.meanTorporHibernationIndex = torporCapableCount > 0 ? (sumTHI / torporCapableCount) : 0.0;

            this.metrics.meanPalinalGrinding = multiCount > 0 ? (sumPalinal / multiCount) : 0.84;
            this.metrics.meanSerrationCount = multiCount > 0 ? (sumSerr / multiCount) : 12.0;
            this.metrics.meanGranivorousYield = multiCount > 0 ? (sumYield / multiCount) : 0.85;
            this.metrics.meanBladeDurability = multiCount > 0 ? (sumDur / multiCount) : 0.82;

            this.metrics.meanTorporSuppression = torporCapableCount > 0 ? (sumSupp / torporCapableCount) : 0.90;
            this.metrics.meanShelterInsulation = torporCapableCount > 0 ? (sumInsul / torporCapableCount) : 0.88;
            this.metrics.meanBrownFatThermogenesis = torporCapableCount > 0 ? (sumBat / torporCapableCount) : 0.85;

            this.metrics.cumulativePostImpactBiomass = totalBiomass;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Live organisms array.
         * @param {number} tick - Simulation tick counter.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Multituberculate/Torpor metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MultituberculateTorporManager;
    }
    if (typeof global !== "undefined") {
        global.MultituberculateTorporManager = MultituberculateTorporManager;
        global.multituberculateTorporManager = new MultituberculateTorporManager();
    }
})(typeof window !== "undefined" ? window : global);
