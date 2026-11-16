// BioEcosystem - Early Amniota 4-Membrane Egg, Keratinized Scales, Costal Breathing & Uricotelic Water Conservation
// Module: src/organs/amniota_egg_scales.js
// Version: 8.58.0 (Hour 578 - System Agent: Amniotic Egg, Calcified Shell, Keratinized Scales, Costal Breathing & 115th/116th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AmniotaEggScaleManager
     * High-fidelity biological simulation of early Amniota (Hylonomus lyelli, Paleothyris acadiana & early Sauropsida/Synapsida):
     * - 4 Extra-Embryonic Membranes (Amnion, Chorion, Allantois, Yolk Sac) & Porous Calcified Shell:
     *   Direct terrestrial egg deposition bypassing aquatic free-swimming larval metamorphosis
     * - Keratinized Epidermal Scales & Stratum Corneum:
     *   Hydrophobic beta-keratin barrier mitigating 98% of trans-epidermal desiccation water loss
     * - Costal Negative-Pressure Lung Aspiration Breathing:
     *   Intercostal thoracic ribcage expansion generating negative pressure vacuum, replacing archaic buccal pump
     * - Uricotelic Nitrogenous Excretion:
     *   Insoluble uric acid precipitation with 95% cloacal water reclamation for dryland independence
     * - 115th Telemetry Channel (% AEI - Amniotic Egg Integrity & Shell Calcification Index) mathematical core
     * - 116th Telemetry Channel (% KSR - Keratinized Scale Resilience & Costal Breathing Index) mathematical core
     */
    class AmniotaEggScaleManager {
        constructor() {
            this.baseAmnioticMembranesIntegrity = 0.82; // [0.60 - 0.98]
            this.baseShellCalcification = 0.78;         // [0.55 - 0.95]
            this.baseEggDesiccationResistance = 0.88;   // [0.70 - 0.99]
            this.baseKeratinizedScaleDensity = 0.80;    // [0.65 - 0.98]
            this.baseEpidermalMoistureRetention = 0.92; // [0.85 - 0.99]
            this.baseCostalAspirationEfficiency = 0.76; // [0.60 - 0.95]
            this.baseTidalLungCapacity = 2.2;           // [1.5 - 3.2x]
            this.baseUricotelicRetention = 0.94;        // [0.90 - 0.98]

            this.metrics = {
                totalLiveCells: 0,
                totalAmniotaOrganisms: 0,
                amniotaPrevalence: 0.0,
                meanAmnioticEggIntegrity: 0.0,        // 115th Channel % AEI
                meanKeratinizedScaleResilience: 0.0,   // 116th Channel % KSR
                meanShellCalcification: 0.78,
                meanEggDesiccationResistance: 0.88,
                meanKeratinizedScaleDensity: 0.80,
                meanEpidermalMoistureRetention: 0.92,
                meanCostalAspirationEfficiency: 0.76,
                meanTidalLungCapacity: 2.2,
                meanUricotelicRetention: 0.94,
                terrestrialClutchLayingEvents: 0,
                directTerrestrialHatchingEvents: 0,
                desiccationDefianceEvents: 0,
                costalNegativePressureBreaths: 0,
                uricotelicWaterSavedUnits: 0.0,
                cumulativeAmniotaBiomass: 0.0
            };
        }

        /**
         * Initialize Amniota egg membranes, keratin scales, costal lungs, and uricotelic excretion on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Amniotes, early sauropsids, synapsids, terrestrial crawlers, or organisms with amniote/scale/dryland affinity
            const isCompetent = Boolean(org.hasAmniotaTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "amniote" || org.niche === "reptile" || org.niche === "sauropsid" || org.niche === "synapsid" || org.niche === "hylonomus" || org.niche === "paleothyris" || org.niche === "dryland_crawler" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.40 && (org.hasTetrapodTrait || org.isStemTetrapod)) ||
                  (org.dna && ((org.dna.amniotaAffinity || 0) > 0.20 || (org.dna.scaleAffinity || 0) > 0.20 || (org.dna.drylandAffinity || 0) > 0.20))));

            if (typeof org.hasAmniotaTrait === "undefined") {
                org.hasAmniotaTrait = isCompetent;
            }

            if (!org.hasAmniotaTrait) {
                org.isAmniota = false;
                org.amnioticMembranesIntegrity = 0.0;
                org.shellCalcificationLevel = 0.0;
                org.eggDesiccationResistance = 0.0;
                org.clutchEggCount = 0;
                org.clutchLayingActive = false;
                org.clutchCooldownTicks = 0;
                org.keratinizedScaleDensity = 0.0;
                org.epidermalMoistureRetention = 0.50;
                org.costalAspirationEfficiency = 0.0;
                org.tidalLungCapacity = 1.0;
                org.costalBreathingCycle = 0.0;
                org.costalAspirationActive = false;
                org.uricotelicWaterRetention = 0.0;
                org.amnioticEggIntegrityIndex = 0.0;
                org.keratinizedScaleResilienceIndex = 0.0;
                return;
            }

            org.isAmniota = true;

            // 1. Amniotic Egg Membranes & Calcified Shell
            if (typeof org.amnioticMembranesIntegrity === "undefined") {
                org.amnioticMembranesIntegrity = 0.68 + Math.random() * 0.28; // [0.60 - 0.98]
            }
            if (typeof org.shellCalcificationLevel === "undefined") {
                org.shellCalcificationLevel = 0.62 + Math.random() * 0.32;    // [0.60 - 0.95]
            }
            if (typeof org.eggDesiccationResistance === "undefined") {
                org.eggDesiccationResistance = 0.72 + Math.random() * 0.26;   // [0.70 - 0.99]
            }
            if (typeof org.clutchEggCount === "undefined") {
                org.clutchEggCount = Math.floor(4 + Math.random() * 8.5);     // [4 - 12 eggs]
            }
            if (typeof org.clutchLayingActive === "undefined") {
                org.clutchLayingActive = false;
            }
            if (typeof org.clutchCooldownTicks === "undefined") {
                org.clutchCooldownTicks = Math.floor(Math.random() * 250);
            }

            // 2. Keratinized Epidermal Scales & Stratum Corneum
            if (typeof org.keratinizedScaleDensity === "undefined") {
                org.keratinizedScaleDensity = 0.68 + Math.random() * 0.28;    // [0.65 - 0.98]
            }
            if (typeof org.epidermalMoistureRetention === "undefined") {
                org.epidermalMoistureRetention = 0.86 + Math.random() * 0.12; // [0.85 - 0.99]
            }

            // 3. Costal Negative-Pressure Lung Aspiration
            if (typeof org.costalAspirationEfficiency === "undefined") {
                org.costalAspirationEfficiency = 0.64 + Math.random() * 0.30; // [0.60 - 0.95]
            }
            if (typeof org.tidalLungCapacity === "undefined") {
                org.tidalLungCapacity = 1.6 + Math.random() * 1.5;            // [1.5 - 3.2x]
            }
            if (typeof org.costalBreathingCycle === "undefined") {
                org.costalBreathingCycle = Math.random() * Math.PI * 2;
            }
            if (typeof org.costalAspirationActive === "undefined") {
                org.costalAspirationActive = false;
            }

            // 4. Uricotelic Water Conservation
            if (typeof org.uricotelicWaterRetention === "undefined") {
                org.uricotelicWaterRetention = 0.91 + Math.random() * 0.07;   // [0.90 - 0.98]
            }

            // 5. Telemetry Channels
            if (typeof org.amnioticEggIntegrityIndex === "undefined") {
                org.amnioticEggIntegrityIndex = 50.0;
            }
            if (typeof org.keratinizedScaleResilienceIndex === "undefined") {
                org.keratinizedScaleResilienceIndex = 50.0;
            }
        }

        /**
         * Update individual organism amniote biology and kinematics per frame.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.isAmniota === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isAmniota) return;

            // 1. Costal Negative-Pressure Lung Aspiration Breathing
            org.costalBreathingCycle = (org.costalBreathingCycle || 0.0) + dt * 3.6;
            const breathWave = Math.sin(org.costalBreathingCycle);
            if (breathWave > 0.85) {
                if (!org.costalAspirationActive) {
                    org.costalAspirationActive = true;
                    this.metrics.costalNegativePressureBreaths++;
                    // Costal negative-pressure intake relieves fatigue and provides superior oxygenation
                    if (typeof org.energy === "number" && org.energy < 95.0) {
                        org.energy += 0.08 * (org.costalAspirationEfficiency || 0.76);
                    }
                }
            } else {
                org.costalAspirationActive = false;
            }

            // 2. Keratinized Epidermal Scales Desiccation Defense
            // In dry high-ground regions or littoral shorelines, prevent moisture loss
            const isSubaerial = (org.y < 350.0 || (org.substrateContact && org.y < 500.0));
            if (isSubaerial) {
                const retention = org.epidermalMoistureRetention || 0.92;
                this.metrics.desiccationDefianceEvents++;
                // Non-amniotes suffer severe dehydration penalties in dry air, but amniotes maintain homeostasis
                if (typeof org.dehydrationPenalty !== "undefined") {
                    org.dehydrationPenalty = Math.max(0.0, org.dehydrationPenalty * (1.0 - retention));
                }
            }

            // 3. Uricotelic Water Conservation
            // Reabsorb 95% of cloacal fluid, preventing water deficit
            const uricotelicSave = (org.uricotelicWaterRetention || 0.94) * 0.015;
            this.metrics.uricotelicWaterSavedUnits += uricotelicSave;
            if (typeof org.hydrationLevel === "number") {
                org.hydrationLevel = Math.min(100.0, org.hydrationLevel + uricotelicSave * 10.0);
            }

            // 4. Terrestrial Clutch Laying & Direct Hatching
            if (typeof org.clutchCooldownTicks === "number") {
                if (org.clutchCooldownTicks > 0) {
                    org.clutchCooldownTicks--;
                } else if ((org.energy || 50.0) > 65.0 && isSubaerial) {
                    org.clutchLayingActive = true;
                    org.clutchCooldownTicks = 350 + Math.floor(Math.random() * 200);
                    this.metrics.terrestrialClutchLayingEvents++;
                    this.metrics.directTerrestrialHatchingEvents += (org.clutchEggCount || 6);

                    // Energy investment into calcified egg clutch
                    if (typeof org.energy === "number") {
                        org.energy -= 4.5;
                    }
                } else {
                    org.clutchLayingActive = false;
                }
            }

            // 5. Mathematical Core for 115th Channel: % AEI (Amniotic Egg Integrity & Shell Calcification Index)
            // Sentez: Amniotik membran bütünlüğü (%35), Kabuk kalsifikasyonu (%30), Desikasyon direnci (%20), Kuluçka kapasitesi (%15)
            const membranes = Math.min(1.0, Math.max(0.0, org.amnioticMembranesIntegrity || 0.82));
            const shellCalc = Math.min(1.0, Math.max(0.0, org.shellCalcificationLevel || 0.78));
            const desiccationRes = Math.min(1.0, Math.max(0.0, org.eggDesiccationResistance || 0.88));
            const clutchCapacity = Math.min(1.0, Math.max(0.0, (org.clutchEggCount || 6) / 12.0));

            const rawAEI = (membranes * 0.35 + shellCalc * 0.30 + desiccationRes * 0.20 + clutchCapacity * 0.15) * 100.0;
            org.amnioticEggIntegrityIndex = Math.min(100.0, Math.max(0.0, rawAEI));

            // 6. Mathematical Core for 116th Channel: % KSR (Keratinized Scale Resilience & Costal Breathing Index)
            // Sentez: Keratinize pul yoğunluğu (%35), Nem tutma verimi (%30), Kostal aspirasyon debisi (%20), Ürikotelik tasarruf (%15)
            const scales = Math.min(1.0, Math.max(0.0, org.keratinizedScaleDensity || 0.80));
            const moisture = Math.min(1.0, Math.max(0.0, org.epidermalMoistureRetention || 0.92));
            const aspiration = Math.min(1.0, Math.max(0.0, org.costalAspirationEfficiency || 0.76));
            const uricotelic = Math.min(1.0, Math.max(0.0, org.uricotelicWaterRetention || 0.94));

            const rawKSR = (scales * 0.35 + moisture * 0.30 + aspiration * 0.20 + uricotelic * 0.15) * 100.0;
            org.keratinizedScaleResilienceIndex = Math.min(100.0, Math.max(0.0, rawKSR));

            // Accumulate biomass
            this.metrics.cumulativeAmniotaBiomass += 0.0025 * (org.dna ? (org.dna.size || 8.0) : 8.0);
        }

        /**
         * Global update across all organisms per tick.
         * @param {Array<Object>} organisms - Array of simulation entities.
         * @param {number} dt - Delta time in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let amniotaCount = 0;
            let sumAEI = 0.0;
            let sumKSR = 0.0;
            let sumShell = 0.0;
            let sumEggDesiccation = 0.0;
            let sumScales = 0.0;
            let sumMoisture = 0.0;
            let sumCostal = 0.0;
            let sumTidal = 0.0;
            let sumUricotelic = 0.0;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isAmniota) {
                    amniotaCount++;
                    sumAEI += org.amnioticEggIntegrityIndex || 0.0;
                    sumKSR += org.keratinizedScaleResilienceIndex || 0.0;
                    sumShell += org.shellCalcificationLevel || 0.78;
                    sumEggDesiccation += org.eggDesiccationResistance || 0.88;
                    sumScales += org.keratinizedScaleDensity || 0.80;
                    sumMoisture += org.epidermalMoistureRetention || 0.92;
                    sumCostal += org.costalAspirationEfficiency || 0.76;
                    sumTidal += org.tidalLungCapacity || 2.2;
                    sumUricotelic += org.uricotelicWaterRetention || 0.94;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalAmniotaOrganisms = amniotaCount;
            this.metrics.amniotaPrevalence = liveCount > 0 ? (amniotaCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanAmnioticEggIntegrity = amniotaCount > 0 ? (sumAEI / amniotaCount) : 0.0;
            this.metrics.meanKeratinizedScaleResilience = amniotaCount > 0 ? (sumKSR / amniotaCount) : 0.0;
            this.metrics.meanShellCalcification = amniotaCount > 0 ? (sumShell / amniotaCount) : 0.78;
            this.metrics.meanEggDesiccationResistance = amniotaCount > 0 ? (sumEggDesiccation / amniotaCount) : 0.88;
            this.metrics.meanKeratinizedScaleDensity = amniotaCount > 0 ? (sumScales / amniotaCount) : 0.80;
            this.metrics.meanEpidermalMoistureRetention = amniotaCount > 0 ? (sumMoisture / amniotaCount) : 0.92;
            this.metrics.meanCostalAspirationEfficiency = amniotaCount > 0 ? (sumCostal / amniotaCount) : 0.76;
            this.metrics.meanTidalLungCapacity = amniotaCount > 0 ? (sumTidal / amniotaCount) : 2.2;
            this.metrics.meanUricotelicRetention = amniotaCount > 0 ? (sumUricotelic / amniotaCount) : 0.94;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Amniota metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AmniotaEggScaleManager;
    }
    if (typeof global !== "undefined") {
        global.AmniotaEggScaleManager = AmniotaEggScaleManager;
        global.amniotaEggScaleManager = new AmniotaEggScaleManager();
    }
})(typeof window !== "undefined" ? window : global);
