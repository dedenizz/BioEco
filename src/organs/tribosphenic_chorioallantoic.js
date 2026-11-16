// BioEcosystem - Early Cretaceous Eutherian Radiation & Tribosphenic Molars / Chorioallantoic Placentation
// Module: src/organs/tribosphenic_chorioallantoic.js
// Version: 8.88.0 (Hour 608 - System Agent: Protocone-Talonid Occlusion & Hemochorial Umbilical Placenta Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TribosphenicChorioallantoicManager
     * High-fidelity biological simulation of the Early Cretaceous Eutherian Evolutionary Radiation:
     * - Tribosphenic Molar Revolution (Eomaia scansoria & Juramaia sinensis lineages):
     *   Evolution of the lingual Protocone cusp on the upper molar fitting directly into the
     *   posterior Talonid Basin on the lower molar (tribosphenicOcclusionQuality: 0.70 - 0.98).
     *   Dual-action mastication combining shearing trigonid blade action with mortar-and-pestle
     *   crushing in the talonid basin (masticatoryCrushingForce: 120 - 450 N eq).
     *   High-efficiency caloric extraction from angiosperm seeds and tough beetle chitin
     *   (caloricExtractionEfficiency: 0.75 - 0.98) with micro-prismatic enamel wear resistance.
     * - True Chorioallantoic Placentation & Hemochorial Umbilical Transfer:
     *   Vascular allantoic arteries and veins fuse with the chorion, extending deeply penetrating
     *   chorionic microvilli brush borders into the maternal endometrium (chorionicVilliPenetrationDepth: 0.70 - 0.98).
     *   Elimination of yolk-sac limits via direct hemochorial nutrient/oxygen flux (hemochorialNutrientFlux: 0.75 - 0.98).
     *   Prolonged intrauterine gestation (gestationEnduranceTicks: 40 - 90 ticks) resulting in
     *   high neonatal encephalization quotients (EQ: 1.2 - 2.5) and precocial functional independence.
     * - 125th Telemetry Channel (% TMI - Tribosphenic Molar Occlusion Index) mathematical core.
     * - 126th Telemetry Channel (% CAI - Chorioallantoic Placentation Index) mathematical core.
     */
    class TribosphenicChorioallantoicManager {
        constructor() {
            this.baseOcclusionQuality = 0.84;             // [0.70 - 0.98]
            this.baseCrushingForce = 285.0;               // [120 - 450 N eq]
            this.baseCaloricExtraction = 0.85;            // [0.75 - 0.98]
            this.baseEnamelResilience = 0.82;             // [0.70 - 0.95]
            this.baseVilliPenetrationDepth = 0.86;        // [0.70 - 0.98]
            this.baseHemochorialFlux = 0.88;              // [0.75 - 0.98]
            this.baseGestationEndurance = 65.0;           // [40 - 90 ticks]
            this.baseEncephalizationQuotient = 0.85;      // [0.70 - 0.98]

            this.metrics = {
                totalLiveCells: 0,
                totalTribosphenicOrganisms: 0,
                totalChorioallantoicOrganisms: 0,
                meanTribosphenicMolarIndex: 0.0,          // 125th Channel % TMI
                meanChorioallantoicPlacentaIndex: 0.0,      // 126th Channel % CAI
                meanOcclusionQuality: 0.84,
                meanCrushingForce: 285.0,
                meanCaloricExtraction: 0.85,
                meanEnamelResilience: 0.82,
                meanVilliPenetrationDepth: 0.86,
                meanHemochorialFlux: 0.88,
                meanGestationEndurance: 65.0,
                meanEncephalizationQuotient: 0.85,
                masticatoryCrushingEvents: 0,
                chorioallantoicNutrientTransfers: 0,
                precocialBirthEvents: 0,
                cumulativeCretaceousBiomass: 0.0
            };
        }

        /**
         * Initialize Tribosphenic and Chorioallantoic traits on eligible organisms.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            const isEligible = org.isEutherian ||
                (org.subclassType === "EUTHERIA") ||
                (org.choriovitellinePlacentaIndex || 0) > 40.0 ||
                (org.trophoblastNutrientFlux || 0) > 0.60;

            if (isEligible) {
                org.hasTribosphenicMolars = true;
                org.hasChorioallantoicPlacenta = true;
            } else {
                org.hasTribosphenicMolars = Math.random() < 0.28;
                org.hasChorioallantoicPlacenta = org.hasTribosphenicMolars && (Math.random() < 0.85);
            }

            // 1. Tribosphenic Molar System
            org.tribosphenicOcclusionQuality = 0.72 + Math.random() * 0.24;   // 0.72 - 0.96
            org.protoconeTalonidFit = 0.74 + Math.random() * 0.22;            // 0.74 - 0.96
            org.masticatoryCrushingForce = 150.0 + Math.random() * 260.0;     // 150 - 410 N eq
            org.caloricExtractionEfficiency = 0.76 + Math.random() * 0.21;     // 0.76 - 0.97
            org.enamelPrismResilience = 0.72 + Math.random() * 0.22;           // 0.72 - 0.94
            org.molarWearAccumulation = 0.02 + Math.random() * 0.08;          // 0.02 - 0.10
            org.crushingCooldown = 0.0;

            // 2. Chorioallantoic Placentation System
            org.chorionicVilliPenetrationDepth = 0.74 + Math.random() * 0.22; // 0.74 - 0.96
            org.allantoicVascularBranching = 0.73 + Math.random() * 0.23;     // 0.73 - 0.96
            org.hemochorialNutrientFlux = 0.76 + Math.random() * 0.21;        // 0.76 - 0.97
            org.gestationEnduranceTicks = 45.0 + Math.random() * 40.0;        // 45 - 85 ticks
            org.neonatalEncephalizationQuotient = 0.74 + Math.random() * 0.22; // 0.74 - 0.96
            org.precocialBirthReadiness = 0.75 + Math.random() * 0.20;        // 0.75 - 0.95
            org.intrauterineGestationProgress = 0.0;
            org.isPregnantChorioallantoic = false;

            // Telemetry Indices & Regimes
            org.tribosphenicMolarIndex = 0.0;         // 125th Channel % TMI
            org.chorioallantoicPlacentaIndex = 0.0;   // 126th Channel % CAI
            org.tribosphenicMolarState = "TRICONODONT_SHEAR_ONLY";
            org.chorioallantoicPlacentaState = "CHORIOVITELLINE_TRANSITIONAL";
        }

        /**
         * Update individual organism's Tribosphenic and Chorioallantoic mechanics.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.hasTribosphenicMolars === "undefined") {
                this.initOrganism(org);
            }

            // Adaptive evolution: Eutherians acquire Tribosphenic & Chorioallantoic systems
            if (org.isEutherian && !org.hasTribosphenicMolars) {
                this.initOrganism(org);
            }

            // 1. Tribosphenic Molar Mastication Mechanics
            if (org.hasTribosphenicMolars) {
                if (org.crushingCooldown > 0) {
                    org.crushingCooldown = Math.max(0, org.crushingCooldown - dt);
                }

                // Double-action mastication: shearing trigonid + crushing talonid
                if ((org.isFeeding || org.isHunting) && org.crushingCooldown <= 0) {
                    const occlusion = org.tribosphenicOcclusionQuality || 0.84;
                    const extraction = org.caloricExtractionEfficiency || 0.85;

                    if (Math.random() < 0.08 * occlusion) {
                        this.metrics.masticatoryCrushingEvents++;
                        org.crushingCooldown = 1.8;

                        // Caloric boost from mortar-pestle crushing of tough seeds and chitin
                        const caloricBonus = (org.masticatoryCrushingForce / 450.0) * extraction * 1.85;
                        org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + caloricBonus);

                        // Enamel micro-wear mitigated by enamel prism resilience
                        const wearDelta = 0.0004 * (1.0 - (org.enamelPrismResilience || 0.82) * 0.7);
                        org.molarWearAccumulation = Math.min(1.0, (org.molarWearAccumulation || 0) + wearDelta);
                    }
                }

                // 125th Channel: % TMI Formulation
                const wOccl = (org.tribosphenicOcclusionQuality || 0.84) * 0.35;
                const wForce = Math.min(1.0, (org.masticatoryCrushingForce || 285.0) / 450.0) * 0.30;
                const wExtract = (org.caloricExtractionEfficiency || 0.85) * 0.20;
                const wEnamel = (org.enamelPrismResilience || 0.82) * (1.0 - (org.molarWearAccumulation || 0) * 0.25) * 0.15;
                const rawTMI = (wOccl + wForce + wExtract + wEnamel) * 100.0;
                org.tribosphenicMolarIndex = Math.max(0.0, Math.min(100.0, rawTMI));

                // Classify 125th Channel Regime
                if (org.tribosphenicMolarIndex < 25.0) {
                    org.tribosphenicMolarState = "TRICONODONT_SHEAR_ONLY";
                } else if (org.tribosphenicMolarIndex < 50.0) {
                    org.tribosphenicMolarState = "INCIPIENT_TALONID_SHELF";
                } else if (org.tribosphenicMolarIndex < 75.0) {
                    org.tribosphenicMolarState = "TRUE_TRIBOSPHENIC_OCCLUSION";
                } else {
                    org.tribosphenicMolarState = "MORTAR_PESTLE_MASTICATION";
                }
            } else {
                org.tribosphenicMolarIndex = 0.0;
                org.tribosphenicMolarState = "TRICONODONT_SHEAR_ONLY";
            }

            // 2. Chorioallantoic Placentation & Hemochorial Umbilical Transfer Mechanics
            if (org.hasChorioallantoicPlacenta) {
                // Female parental gestation cycle
                if (org.isFemaleParent && (org.energy || 50) > 44) {
                    if (!org.isPregnantChorioallantoic && Math.random() < 0.04) {
                        org.isPregnantChorioallantoic = true;
                        org.intrauterineGestationProgress = 0.0;
                    }
                }

                if (org.isPregnantChorioallantoic) {
                    const villiDepth = org.chorionicVilliPenetrationDepth || 0.86;
                    const hemoFlux = org.hemochorialNutrientFlux || 0.88;

                    // Direct hemochorial maternal-fetal exchange
                    if (Math.random() < 0.12 * hemoFlux) {
                        this.metrics.chorioallantoicNutrientTransfers++;
                        org.energy = Math.max(15, (org.energy || 50) - 0.08); // Minor maternal energy dedication
                    }

                    // Advance intrauterine gestation ticks
                    const enduranceLimit = org.gestationEnduranceTicks || 65.0;
                    org.intrauterineGestationProgress += dt * 10.0;

                    if (org.intrauterineGestationProgress >= enduranceLimit) {
                        org.isPregnantChorioallantoic = false;
                        org.intrauterineGestationProgress = 0.0;
                        this.metrics.precocialBirthEvents++;

                        // Successful birth of precocial, highly encephalized neonate
                        org.offspringEncephalizationBonus = (org.offspringEncephalizationBonus || 0) + 1.5;
                        org.offspringSurvivalBonus = (org.offspringSurvivalBonus || 0) + 2.0;
                    }
                }

                // 126th Channel: % CAI Formulation
                const wVilli = (org.chorionicVilliPenetrationDepth || 0.86) * 0.35;
                const wFlux = (org.hemochorialNutrientFlux || 0.88) * 0.30;
                const wGestation = Math.min(1.0, (org.gestationEnduranceTicks || 65.0) / 90.0) * 0.20;
                const wEnceph = (org.neonatalEncephalizationQuotient || 0.85) * 0.15;
                const rawCAI = (wVilli + wFlux + wGestation + wEnceph) * 100.0;
                org.chorioallantoicPlacentaIndex = Math.max(0.0, Math.min(100.0, rawCAI));

                // Classify 126th Channel Regime
                if (org.chorioallantoicPlacentaIndex < 25.0) {
                    org.chorioallantoicPlacentaState = "CHORIOVITELLINE_TRANSITIONAL";
                } else if (org.chorioallantoicPlacentaIndex < 50.0) {
                    org.chorioallantoicPlacentaState = "ALLANTOIC_VASCULAR_INVASION";
                } else if (org.chorioallantoicPlacentaIndex < 75.0) {
                    org.chorioallantoicPlacentaState = "TRUE_CHORIOALLANTOIC_PLACENTA";
                } else {
                    org.chorioallantoicPlacentaState = "HEMOCHORIAL_EXTENDED_GESTATION";
                }
            } else {
                org.chorioallantoicPlacentaIndex = 0.0;
                org.chorioallantoicPlacentaState = "CHORIOVITELLINE_TRANSITIONAL";
            }
        }

        /**
         * Update all organisms and calculate collective Epoch 60 metrics.
         * @param {Array<Object>} organisms - Array of simulation entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateAll(organisms, dt, width, height) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let triboCount = 0;
            let chorioCount = 0;

            let sumTMI = 0.0;
            let sumCAI = 0.0;
            let sumOccl = 0.0;
            let sumForce = 0.0;
            let sumExtract = 0.0;
            let sumEnamel = 0.0;
            let sumVilli = 0.0;
            let sumFlux = 0.0;
            let sumGestation = 0.0;
            let sumEnceph = 0.0;
            let totalBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.hasTribosphenicMolars) {
                    triboCount++;
                    sumTMI += org.tribosphenicMolarIndex || 0.0;
                    sumOccl += org.tribosphenicOcclusionQuality || 0.84;
                    sumForce += org.masticatoryCrushingForce || 285.0;
                    sumExtract += org.caloricExtractionEfficiency || 0.85;
                    sumEnamel += org.enamelPrismResilience || 0.82;
                    totalBiomass += (org.mass || 1.0) * 1.45;
                }

                if (org.hasChorioallantoicPlacenta) {
                    chorioCount++;
                    sumCAI += org.chorioallantoicPlacentaIndex || 0.0;
                    sumVilli += org.chorionicVilliPenetrationDepth || 0.86;
                    sumFlux += org.hemochorialNutrientFlux || 0.88;
                    sumGestation += org.gestationEnduranceTicks || 65.0;
                    sumEnceph += org.neonatalEncephalizationQuotient || 0.85;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalTribosphenicOrganisms = triboCount;
            this.metrics.totalChorioallantoicOrganisms = chorioCount;

            this.metrics.meanTribosphenicMolarIndex = triboCount > 0 ? (sumTMI / triboCount) : 0.0;
            this.metrics.meanChorioallantoicPlacentaIndex = chorioCount > 0 ? (sumCAI / chorioCount) : 0.0;

            this.metrics.meanOcclusionQuality = triboCount > 0 ? (sumOccl / triboCount) : 0.84;
            this.metrics.meanCrushingForce = triboCount > 0 ? (sumForce / triboCount) : 285.0;
            this.metrics.meanCaloricExtraction = triboCount > 0 ? (sumExtract / triboCount) : 0.85;
            this.metrics.meanEnamelResilience = triboCount > 0 ? (sumEnamel / triboCount) : 0.82;

            this.metrics.meanVilliPenetrationDepth = chorioCount > 0 ? (sumVilli / chorioCount) : 0.86;
            this.metrics.meanHemochorialFlux = chorioCount > 0 ? (sumFlux / chorioCount) : 0.88;
            this.metrics.meanGestationEndurance = chorioCount > 0 ? (sumGestation / chorioCount) : 65.0;
            this.metrics.meanEncephalizationQuotient = chorioCount > 0 ? (sumEnceph / chorioCount) : 0.85;

            this.metrics.cumulativeCretaceousBiomass = totalBiomass;
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
         * @returns {Object} Comprehensive Cretaceous Eutherian metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TribosphenicChorioallantoicManager;
    }
    if (typeof global !== "undefined") {
        global.TribosphenicChorioallantoicManager = TribosphenicChorioallantoicManager;
        global.tribosphenicChorioallantoicManager = new TribosphenicChorioallantoicManager();
    }
})(typeof window !== "undefined" ? window : global);
