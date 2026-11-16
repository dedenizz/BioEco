// BioEcosystem - Late Pleistocene Neanderthal & Early Homo sapiens Cognitive & Composite Weaponry Dynamics
// Module: src/organs/neanderthal_composite.js
// Version: 9.72.0 (Hour 692 - System Agent: Levallois Prepared-Core Flaking, Birch Tar Mastic, Hafted Composite Spears, Glacial Thermoregulation & 153rd/154th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeanderthalCompositeManager
     * Core evolutionary and biocultural dynamics for Late Pleistocene Hominins (Homo neanderthalensis & early Homo sapiens):
     * 1. Levallois Prepared-Core Technology:
     *    - Tortoise-shaped core preparation (levalloisCorePreparation: 0.78 - 0.98).
     *    - Faceted striking platforms producing predetermined, razor-sharp triangular points (levalloisFlakePredictability: 0.80 - 0.98).
     *    - 4x raw material utilization efficiency (rawMaterialEfficiencyMultiplier: 2.5 - 4.5x).
     * 2. Birch Tar Distillation & Hafted Composite Weapons:
     *    - Anoxic dry distillation of birch bark yielding thermoplastic mastic adhesive (birchTarDistillationYield: 0.75 - 0.96).
     *    - Binding stone points to wooden thrusting/throwing shafts with sinew and tar (haftedCompositeSpearThrust: 0.80 - 0.98).
     *    - 3.8x thrusting impact kinetic energy and 70% reduction in close-range skeletal trauma (predationTraumaReduction: 0.65 - 0.88).
     * 3. Würm/Weichsel Glacial Tundra Cold Adaptation:
     *    - Compact, muscular barrel-chested morphology adhering to Allen-Bergmann ecogeographical rules (glacialThoracicVolume: 0.78 - 0.98).
     *    - Expanded nasal cavity with high-vascularity turbinates warming -20 C arctic air to 32 C before lungs (nasalTurbinateConditioning: 0.80 - 0.98).
     *    - Non-shivering thermogenesis via brown adipose tissue (subzeroMetabolicResistance: 0.75 - 0.98).
     * 4. Mineral Ochre Pigmentation & Symbolic Social Proto-Culture:
     *    - Grinding red/yellow mineral iron oxides for body paint, clothing preservation, and symbolic identification (ochreBodyPigmentation: 0.72 - 0.95).
     *    - Inter-clan cooperative bonding and mutual trust network bonus (symbolicSocialCohesionBonus: 0.70 - 0.95).
     * 5. 153rd & 154th Telemetry Channel Indices:
     *    - 153rd Channel: % LPI (Levallois Prepared-Core Index, Buzul Kobaltı #3b82f6)
     *    - 154th Channel: % CSI (Composite Spear & Hafting Index, Katran Fümesi #334155)
     */
    class NeanderthalCompositeManager {
        /**
         * Initialize Neanderthal and Composite Weaponry manager.
         */
        constructor() {
            this.metrics = {
                totalNeanderthals: 0,
                activeKnappers: 0,
                activeTarDistillers: 0,
                activeSpearHunters: 0,
                activeColdResistors: 0,
                meanCorePreparation: 0.88,
                meanFlakePredictability: 0.88,
                meanRawMaterialEfficiency: 3.5,
                meanTarYield: 0.85,
                meanSpearThrust: 0.87,
                meanTraumaReduction: 0.76,
                meanThoracicVolume: 0.87,
                meanNasalConditioning: 0.88,
                meanColdResistance: 0.86,
                meanOchrePigmentation: 0.83,
                meanSocialCohesion: 0.84,
                meanLevalloisIndex: 0.0,
                meanCompositeIndex: 0.0,
                levalloisPointsKnapped: 0,
                birchTarBatchesDistilled: 0,
                compositeSpearStrikes: 0,
                traumaAvoidedCount: 0,
                harvestedGlacialBiomass: 0.0,
                cumulativeNeanderthalBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Neanderthal/Homo sapiens composite traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Eligibility: advanced hominins, Homo erectus descendants, or evolving omnivore primates
            const isEligible = org.isHomo || (org.isHominin && org.generation >= 28) ||
                               (org.diet === "omnivore" && org.mass >= 14.0 && org.mass <= 50.0 && org.generation >= 30);

            if (!isEligible) return;

            if (org.isNeanderthal === undefined) {
                // Probabilistic activation for Neanderthal / Early Sapiens lineage
                const activates = Math.random() < 0.50 || (org.isHomo && Math.random() < 0.65);
                if (!activates) return;

                org.isNeanderthal = true;

                // 1. Levallois Prepared-Core Technology
                org.levalloisCorePreparation = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                org.levalloisFlakePredictability = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.rawMaterialEfficiencyMultiplier = 2.5 + Math.random() * 2.0; // 2.5 - 4.5x
                org.hasLevalloisPoint = Math.random() < 0.70;
                org.isKnappingLevallois = false;

                // 2. Birch Tar Mastic & Hafted Composite Spears
                org.birchTarDistillationYield = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                org.haftedCompositeSpearThrust = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.compositeWeaponDamageMultiplier = 2.8 + Math.random() * 2.0; // 2.8 - 4.8x
                org.predationTraumaReduction = 0.65 + Math.random() * 0.23; // 0.65 - 0.88
                org.hasCompositeSpear = Math.random() < 0.65;
                org.isDistillingTar = false;
                org.isSpearHunting = false;

                // 3. Würm/Weichsel Glacial Tundra Cold Adaptation
                org.glacialThoracicVolume = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                org.nasalTurbinateConditioning = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.subzeroMetabolicResistance = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.isColdResisting = false;

                // 4. Mineral Ochre Pigmentation & Symbolic Social Proto-Culture
                org.ochreBodyPigmentation = 0.72 + Math.random() * 0.23; // 0.72 - 0.95
                org.symbolicSocialCohesionBonus = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.hasOchreAdornment = Math.random() < 0.55;

                // Telemetry Channel Indices
                org.levalloisPreparedIndex = 0.0;
                org.compositeSpearIndex = 0.0;
            }
        }

        /**
         * Update Levallois lithics, birch tar distillation, composite spear hunting, and cold thermoregulation.
         * @param {Array} organisms - Population array.
         * @param {Object} spatialGrid - Spatial collision grid.
         * @param {number} dt - Time delta multiplier.
         */
        step(organisms, spatialGrid, dt) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.resetMetrics();
                return;
            }

            let count = 0;
            let activeKnappers = 0;
            let activeDistillers = 0;
            let activeHunters = 0;
            let activeResistors = 0;

            let sumCore = 0.0;
            let sumPredict = 0.0;
            let sumRawEff = 0.0;
            let sumTar = 0.0;
            let sumThrust = 0.0;
            let sumTrauma = 0.0;
            let sumThorax = 0.0;
            let sumNasal = 0.0;
            let sumCold = 0.0;
            let sumOchre = 0.0;
            let sumSocial = 0.0;
            let sumLPI = 0.0;
            let sumCSI = 0.0;
            let sumBiomass = 0.0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                this.initOrganism(org);

                if (!org.isNeanderthal) continue;

                count++;
                sumBiomass += (org.mass || 25.0);

                // A. Levallois Prepared-Core Point Knapping Dynamics
                if (Math.random() < 0.04) {
                    org.isKnappingLevallois = true;
                    activeKnappers++;
                    this.metrics.levalloisPointsKnapped++;
                    org.hasLevalloisPoint = true;
                } else {
                    org.isKnappingLevallois = false;
                }

                // B. Birch Tar Distillation & Spear Hafting
                if (Math.random() < 0.03) {
                    org.isDistillingTar = true;
                    activeDistillers++;
                    this.metrics.birchTarBatchesDistilled++;
                    org.hasCompositeSpear = true;
                } else {
                    org.isDistillingTar = false;
                }

                // C. Composite Spear Megafauna Hunting
                if (org.hasCompositeSpear && Math.random() < 0.06) {
                    org.isSpearHunting = true;
                    activeHunters++;
                    this.metrics.compositeSpearStrikes++;

                    // Avoid close-range contact trauma through hafted spear leverage
                    if (Math.random() < (org.predationTraumaReduction || 0.76)) {
                        this.metrics.traumaAvoidedCount++;
                    }

                    // Trophic megafauna energy harvest bonus
                    const huntYield = (org.compositeWeaponDamageMultiplier || 3.5) * 0.45;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + huntYield);
                    this.metrics.harvestedGlacialBiomass += huntYield;
                } else {
                    org.isSpearHunting = false;
                }

                // D. Glacial Cold Thermoregulation & Nasal Conditioning
                // Tundra climate simulation (energy conservation during low ambient temps)
                org.isColdResisting = true;
                activeResistors++;
                const basalMetabolicDiscount = (org.glacialThoracicVolume || 0.85) * 0.015;
                org.energy = Math.max(1.0, (org.energy || 50.0) - Math.max(0.001, (0.012 - basalMetabolicDiscount)));

                // E. Social Cohesion from Ochre Pigmentation
                if (org.hasOchreAdornment) {
                    // Small survival and reproductive cohesion bonus
                    if (org.fertilityCooldown > 0) {
                        org.fertilityCooldown = Math.max(0, org.fertilityCooldown - 0.2);
                    }
                }

                // F. Compute Telemetry Channel Indices
                // 153rd Channel: % LPI (Levallois Prepared-Core Index)
                const corePrepNorm = org.levalloisCorePreparation || 0.88;
                const flakePredNorm = org.levalloisFlakePredictability || 0.88;
                const rawNorm = Math.min(1.0, Math.max(0.0, ((org.rawMaterialEfficiencyMultiplier || 3.5) - 1.0) / 3.5));
                const precisionNorm = 0.85;
                const lpi = Math.min(100.0, Math.max(0.0,
                    (corePrepNorm * 0.35 + flakePredNorm * 0.30 + rawNorm * 0.20 + precisionNorm * 0.15) * 100.0
                ));
                org.levalloisPreparedIndex = lpi;

                // 154th Channel: % CSI (Composite Spear & Hafting Index)
                const tarNorm = org.birchTarDistillationYield || 0.85;
                const spearNorm = org.haftedCompositeSpearThrust || 0.87;
                const dmgNorm = Math.min(1.0, Math.max(0.0, ((org.compositeWeaponDamageMultiplier || 3.5) - 1.0) / 3.8));
                const nasalNorm = org.nasalTurbinateConditioning || 0.88;
                const csi = Math.min(100.0, Math.max(0.0,
                    (tarNorm * 0.30 + spearNorm * 0.30 + dmgNorm * 0.20 + nasalNorm * 0.20) * 100.0
                ));
                org.compositeSpearIndex = csi;

                // Accumulate sums
                sumCore += corePrepNorm;
                sumPredict += flakePredNorm;
                sumRawEff += (org.rawMaterialEfficiencyMultiplier || 3.5);
                sumTar += tarNorm;
                sumThrust += spearNorm;
                sumTrauma += (org.predationTraumaReduction || 0.76);
                sumThorax += (org.glacialThoracicVolume || 0.87);
                sumNasal += nasalNorm;
                sumCold += (org.subzeroMetabolicResistance || 0.86);
                sumOchre += (org.ochreBodyPigmentation || 0.83);
                sumSocial += (org.symbolicSocialCohesionBonus || 0.84);
                sumLPI += lpi;
                sumCSI += csi;
            }

            // Update synthesized metrics
            this.metrics.totalNeanderthals = count;
            this.metrics.activeKnappers = activeKnappers;
            this.metrics.activeTarDistillers = activeDistillers;
            this.metrics.activeSpearHunters = activeHunters;
            this.metrics.activeColdResistors = activeResistors;
            this.metrics.cumulativeNeanderthalBiomass = sumBiomass;

            if (count > 0) {
                this.metrics.meanCorePreparation = sumCore / count;
                this.metrics.meanFlakePredictability = sumPredict / count;
                this.metrics.meanRawMaterialEfficiency = sumRawEff / count;
                this.metrics.meanTarYield = sumTar / count;
                this.metrics.meanSpearThrust = sumThrust / count;
                this.metrics.meanTraumaReduction = sumTrauma / count;
                this.metrics.meanThoracicVolume = sumThorax / count;
                this.metrics.meanNasalConditioning = sumNasal / count;
                this.metrics.meanColdResistance = sumCold / count;
                this.metrics.meanOchrePigmentation = sumOchre / count;
                this.metrics.meanSocialCohesion = sumSocial / count;
                this.metrics.meanLevalloisIndex = sumLPI / count;
                this.metrics.meanCompositeIndex = sumCSI / count;
            } else {
                this.metrics.meanLevalloisIndex = 0.0;
                this.metrics.meanCompositeIndex = 0.0;
            }
        }

        /**
         * Reset population-level metrics.
         */
        resetMetrics() {
            this.metrics.totalNeanderthals = 0;
            this.metrics.activeKnappers = 0;
            this.metrics.activeTarDistillers = 0;
            this.metrics.activeSpearHunters = 0;
            this.metrics.activeColdResistors = 0;
            this.metrics.meanLevalloisIndex = 0.0;
            this.metrics.meanCompositeIndex = 0.0;
        }

        /**
         * Get synthesized population metrics.
         * @returns {Object} Current metrics object.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Classify biological regime for 153rd Channel (% LPI).
         * @param {number} lpiVal - Levallois Prepared-Core Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getLevalloisRegime(lpiVal) {
            const v = Math.max(0.0, Math.min(100.0, lpiVal || 0.0));
            if (v <= 25.0) {
                return { name: "CRUDE_BIFACE_CORE", desc: "Crude Biface Core & Raw Flaker", class: "lpi-crude" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_TORTOISE_PREPARATION", desc: "Incipient Tortoise Preparation & Faceted Platform", class: "lpi-tortoise" };
            } else if (v <= 75.0) {
                return { name: "LEVALLOIS_POINT_STRIKER", desc: "Levallois Point Striker & Blade Knapper", class: "lpi-point" };
            } else {
                return { name: "APEX_PREPARED_CORE_LITHICIAN", desc: "Apex Prepared Core Lithician & Master Toolmaker", class: "lpi-apex" };
            }
        }

        /**
         * Classify biological regime for 154th Channel (% CSI).
         * @param {number} csiVal - Composite Spear & Hafting Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getCompositeRegime(csiVal) {
            const v = Math.max(0.0, Math.min(100.0, csiVal || 0.0));
            if (v <= 25.0) {
                return { name: "UNHAFTED_HAND_POINT", desc: "Unhafted Hand Point & Direct Impact", class: "csi-unhafted" };
            } else if (v <= 50.0) {
                return { name: "RESIN_BOUND_LANCE", desc: "Resin Bound Lance & Experimental Haft", class: "csi-lance" };
            } else if (v <= 75.0) {
                return { name: "BIRCH_TAR_COMPOSITE_SPEAR", desc: "Birch Tar Composite Spear & Big Game Hunter", class: "csi-spear" };
            } else {
                return { name: "APEX_GLACIAL_COMPOSITE_MASTER", desc: "Apex Glacial Composite Master & Tundra Dominator", class: "csi-master" };
            }
        }
    }

    // Export module globally
    global.NeanderthalCompositeManager = NeanderthalCompositeManager;
    global.neanderthalCompositeManager = new NeanderthalCompositeManager();

})(typeof window !== "undefined" ? window : global);
