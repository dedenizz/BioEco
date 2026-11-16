// BioEcosystem - Early Amniota Egg Membranes & Keratinized Scale Telemetry Dashboard
// Module: src/ui/telemetry_amniota.js
// Version: 8.59.0 (Hour 579 - Looks & UI Agent: 115th Channel % AEI, 116th Channel % KSR, Sun Gold & Terracotta Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AmniotaTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 115th Telemetry Channel: Amniotic Egg Integrity & Shell Calcification Index (% AEI) - Sun gold (#eab308)
     * - 116th Telemetry Channel: Keratinized Scale Resilience & Costal Breathing Index (% KSR) - Terracotta crimson (#dc2626)
     * - 4 Biological Regimes for % AEI (GELATINOUS_ANAMNIOTIC, INCIPIENT_LEATHERY, CALCIFIED_AMNIOTIC, FULL_TERRESTRIAL_CLUTCH)
     * - 4 Biological Regimes for % KSR (PERMEABLE_DERMIS, INCIPIENT_KERATIN, SCALED_EPIDERMIS, ARMORED_DESERT_REPTILIAN)
     * - Real-time egg clutch count, direct hatching events, desiccation defiance events, costal breaths, uricotelic water saved
     */
    class AmniotaTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Amniota organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} eggScaleManager - Global AmniotaEggScaleManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Amniota metrics.
         */
        static calculateMetrics(organisms, eggScaleManager, tick) {
            let liveCount = 0;
            let amniotaCount = 0;
            let clutchLayers = 0;
            let desiccationDefiers = 0;

            let sumAEI = 0.0;
            let sumKSR = 0.0;
            let sumShell = 0.0;
            let sumEggDesiccation = 0.0;
            let sumScales = 0.0;
            let sumMoisture = 0.0;
            let sumCostal = 0.0;
            let sumTidal = 0.0;
            let sumUricotelic = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isAmniota) {
                        amniotaCount++;

                        const aei = org.amnioticEggIntegrityIndex !== undefined ? org.amnioticEggIntegrityIndex : 50.0;
                        const ksr = org.keratinizedScaleResilienceIndex !== undefined ? org.keratinizedScaleResilienceIndex : 50.0;
                        const shell = org.shellCalcificationLevel !== undefined ? org.shellCalcificationLevel : 0.78;
                        const eggDes = org.eggDesiccationResistance !== undefined ? org.eggDesiccationResistance : 0.88;
                        const scales = org.keratinizedScaleDensity !== undefined ? org.keratinizedScaleDensity : 0.80;
                        const moist = org.epidermalMoistureRetention !== undefined ? org.epidermalMoistureRetention : 0.92;
                        const costal = org.costalAspirationEfficiency !== undefined ? org.costalAspirationEfficiency : 0.76;
                        const tidal = org.tidalLungCapacity !== undefined ? org.tidalLungCapacity : 2.2;
                        const urico = org.uricotelicWaterRetention !== undefined ? org.uricotelicWaterRetention : 0.94;

                        sumAEI += aei;
                        sumKSR += ksr;
                        sumShell += shell;
                        sumEggDesiccation += eggDes;
                        sumScales += scales;
                        sumMoisture += moist;
                        sumCostal += costal;
                        sumTidal += tidal;
                        sumUricotelic += urico;

                        if (org.clutchLayingActive) clutchLayers++;
                        if (org.y < 350.0) desiccationDefiers++;
                    }
                }
            }

            const amniotaPrevalence = liveCount > 0 ? (amniotaCount / liveCount) * 100.0 : 0.0;
            const meanAEI = amniotaCount > 0 ? (sumAEI / amniotaCount) : 0.0;
            const meanKSR = amniotaCount > 0 ? (sumKSR / amniotaCount) : 0.0;
            const meanShell = amniotaCount > 0 ? (sumShell / amniotaCount) : 0.78;
            const meanEggDesiccation = amniotaCount > 0 ? (sumEggDesiccation / amniotaCount) : 0.88;
            const meanScales = amniotaCount > 0 ? (sumScales / amniotaCount) : 0.80;
            const meanMoisture = amniotaCount > 0 ? (sumMoisture / amniotaCount) : 0.92;
            const meanCostal = amniotaCount > 0 ? (sumCostal / amniotaCount) : 0.76;
            const meanTidal = amniotaCount > 0 ? (sumTidal / amniotaCount) : 2.2;
            const meanUricotelic = amniotaCount > 0 ? (sumUricotelic / amniotaCount) : 0.94;

            let clutchLayingEvents = 0;
            let directHatchingEvents = 0;
            let desiccationDefiance = 0;
            let costalBreaths = 0;
            let waterSaved = 0.0;
            let amniotaBiomass = 0.0;

            if (eggScaleManager && eggScaleManager.getMetrics) {
                const mgr = eggScaleManager.getMetrics();
                clutchLayingEvents = mgr.terrestrialClutchLayingEvents || 0;
                directHatchingEvents = mgr.directTerrestrialHatchingEvents || 0;
                desiccationDefiance = mgr.desiccationDefianceEvents || 0;
                costalBreaths = mgr.costalNegativePressureBreaths || 0;
                waterSaved = mgr.uricotelicWaterSavedUnits || 0.0;
                amniotaBiomass = mgr.cumulativeAmniotaBiomass || 0.0;
            }

            // 4 Distinct Biological Regimes for 115th Channel (% AEI)
            let aeiRegimeCode = "GELATINOUS_ANAMNIOTIC";
            let aeiRegimeTitle = "GELATINOUS ANAMNIOTIC EGG & COMPULSORY AQUATIC SPAWNING";
            let aeiRegimeBadge = "aei-gelatinous";

            if (meanAEI >= 85.0) {
                aeiRegimeCode = "FULL_TERRESTRIAL_CLUTCH";
                aeiRegimeTitle = "CALCIFIED MULTI-EGG CLUTCH & TOTAL WATER INDEPENDENCE";
                aeiRegimeBadge = "aei-clutch";
            } else if (meanAEI >= 60.0) {
                aeiRegimeCode = "CALCIFIED_AMNIOTIC";
                aeiRegimeTitle = "4-MEMBRANE AMNIOTIC EGG & DRYLAND HATCHING MASTERY";
                aeiRegimeBadge = "aei-calcified";
            } else if (meanAEI >= 30.0) {
                aeiRegimeCode = "INCIPIENT_LEATHERY";
                aeiRegimeTitle = "LEATHERY SHELL & PARTIAL DESICCATION DEFENSE";
                aeiRegimeBadge = "aei-leathery";
            }

            // 4 Distinct Biological Regimes for 116th Channel (% KSR)
            let ksrRegimeCode = "PERMEABLE_DERMIS";
            let ksrRegimeTitle = "PERMEABLE NAKED DERMIS & SEVERE AIR DEHYDRATION RISK";
            let ksrRegimeBadge = "ksr-permeable";

            if (meanKSR >= 85.0) {
                ksrRegimeCode = "ARMORED_DESERT_REPTILIAN";
                ksrRegimeTitle = "FULL STRATUM CORNEUM BARRIER & EXTREME ARID CLIMATE RADIANCE";
                ksrRegimeBadge = "ksr-armored";
            } else if (meanKSR >= 60.0) {
                ksrRegimeCode = "SCALED_EPIDERMIS";
                ksrRegimeTitle = "BETA-KERATIN EPIDERMAL SCALES & 98% DESICCATION MITIGATION";
                ksrRegimeBadge = "ksr-scaled";
            } else if (meanKSR >= 30.0) {
                ksrRegimeCode = "INCIPIENT_KERATIN";
                ksrRegimeTitle = "INCIPIENT KERATIN SHIELD & MODERATE MOISTURE RETENTION";
                ksrRegimeBadge = "ksr-keratin";
            }

            return {
                liveCount,
                amniotaCount,
                clutchLayers,
                desiccationDefiers,
                amniotaPrevalence,
                meanAEI,
                meanKSR,
                meanShell,
                meanEggDesiccation,
                meanScales,
                meanMoisture,
                meanCostal,
                meanTidal,
                meanUricotelic,
                clutchLayingEvents,
                directHatchingEvents,
                desiccationDefiance,
                costalBreaths,
                waterSaved,
                amniotaBiomass,
                aeiRegimeCode,
                aeiRegimeTitle,
                aeiRegimeBadge,
                ksrRegimeCode,
                ksrRegimeTitle,
                ksrRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 115th (% AEI) and 116th (% KSR) Channels.
         * @param {Object} metrics - Calculated Amniota telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 115 Readout (% AEI - Amniotic Egg Integrity & Shell Calcification Index)
            const valAEIIndexEl = document.getElementById("valAEIIndex");
            if (valAEIIndexEl) {
                valAEIIndexEl.textContent = metrics.meanAEI.toFixed(1) + "% AEI (" + metrics.aeiRegimeTitle + ")";
                if (metrics.meanAEI >= 85.0) {
                    valAEIIndexEl.style.color = "#fde047";
                } else if (metrics.meanAEI >= 60.0) {
                    valAEIIndexEl.style.color = "#eab308";
                } else if (metrics.meanAEI >= 30.0) {
                    valAEIIndexEl.style.color = "#ca8a04";
                } else {
                    valAEIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 115 Status
            const valAEIStatusEl = document.getElementById("valAEIStatus");
            if (valAEIStatusEl) {
                valAEIStatusEl.textContent =
                    "AMNIOTA: " + metrics.amniotaCount + "/" + metrics.liveCount +
                    " (" + metrics.amniotaPrevalence.toFixed(0) + "%) | SHELL: " + (metrics.meanShell * 100.0).toFixed(0) + "%" +
                    " | EGG DESICCATION: " + (metrics.meanEggDesiccation * 100.0).toFixed(0) + "%" +
                    " | CLUTCHES: " + metrics.clutchLayingEvents +
                    " | HATCHED: " + metrics.directHatchingEvents +
                    " | BIOMASS: " + metrics.amniotaBiomass.toFixed(1) + " mg";
                valAEIStatusEl.style.color = metrics.meanAEI >= 50.0 ? "#fde047" : "#eab308";
            }

            // 3. Primary Channel 116 Readout (% KSR - Keratinized Scale Resilience & Costal Breathing Index)
            const valKSRIndexEl = document.getElementById("valKSRIndex");
            if (valKSRIndexEl) {
                valKSRIndexEl.textContent = metrics.meanKSR.toFixed(1) + "% KSR (" + metrics.ksrRegimeTitle + ")";
                if (metrics.meanKSR >= 85.0) {
                    valKSRIndexEl.style.color = "#f87171";
                } else if (metrics.meanKSR >= 60.0) {
                    valKSRIndexEl.style.color = "#ef4444";
                } else if (metrics.meanKSR >= 30.0) {
                    valKSRIndexEl.style.color = "#dc2626";
                } else {
                    valKSRIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 116 Status
            const valKSRStatusEl = document.getElementById("valKSRStatus");
            if (valKSRStatusEl) {
                valKSRStatusEl.textContent =
                    "SCALES: " + (metrics.meanScales * 100.0).toFixed(0) + "% | " +
                    "MOISTURE: " + (metrics.meanMoisture * 100.0).toFixed(0) + "% | " +
                    "COSTAL: " + (metrics.meanCostal * 100.0).toFixed(0) + "% | " +
                    "TIDAL: " + metrics.meanTidal.toFixed(1) + "x | " +
                    "DEFIANCE: " + metrics.desiccationDefiance + " | " +
                    "BREATHS: " + metrics.costalBreaths + " | " +
                    "WATER SAVED: " + metrics.waterSaved.toFixed(1) + " U";
                valKSRStatusEl.style.color = metrics.meanKSR >= 50.0 ? "#f87171" : "#ef4444";
            }

            // 5. Dedicated Amniota Laboratory HUD Badges (if DOM present)
            const valAEIBadgeEl = document.getElementById("valAEIBadge");
            if (valAEIBadgeEl) {
                valAEIBadgeEl.className = "aei-badge " + metrics.aeiRegimeBadge;
                valAEIBadgeEl.textContent = metrics.aeiRegimeCode;
            }

            const valKSRBadgeEl = document.getElementById("valKSRBadge");
            if (valKSRBadgeEl) {
                valKSRBadgeEl.className = "ksr-badge " + metrics.ksrRegimeBadge;
                valKSRBadgeEl.textContent = metrics.ksrRegimeCode;
            }
        }

        /**
         * Main telemetry step entrypoint executed per simulation tick.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular buffers object.
         * @param {Object} eggScaleManager - Global AmniotaEggScaleManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, eggScaleManager, tick) {
            const metrics = this.calculateMetrics(organisms, eggScaleManager, tick);

            // Update circular history buffers for Lotka-Volterra graphing
            if (historyData) {
                if (historyData.amnioticEggIntegrityIndex) {
                    historyData.amnioticEggIntegrityIndex.shift();
                    historyData.amnioticEggIntegrityIndex.push(Math.max(0, Math.min(100, metrics.meanAEI)));
                }
                if (historyData.keratinizedScaleResilienceIndex) {
                    historyData.keratinizedScaleResilienceIndex.shift();
                    historyData.keratinizedScaleResilienceIndex.push(Math.max(0, Math.min(100, metrics.meanKSR)));
                }
            }

            // Update DOM HUD every 4 ticks to maintain 60 FPS performance
            if (tick % 4 === 0) {
                this.updateHUD(metrics);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AmniotaTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.AmniotaTelemetryManager = AmniotaTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
