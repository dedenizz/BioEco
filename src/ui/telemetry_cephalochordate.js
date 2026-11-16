// BioEcosystem - Cephalochordate Notochord Turgor & Tension Index (% NTI) & Myomeric Flexion Efficiency (% MFE) Telemetry
// Module: src/ui/telemetry_cephalochordate.js
// Version: 7.88.0 (Hour 508 - Looks & UI Agent: 98th Channel % MFE & Dual Cephalochordata HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CephalochordateTelemetryManager
     * High-precision laboratory telemetry tracking for cephalochordate (Amphioxus / Branchiostoma) notochord turgor, myomeres, and swimming:
     * - Channel 97: Notochord Turgor & Tension Index (% NTI) - Axial tension, stiffness ratio, myomeric flexion, and burrow camouflage
     * - Channel 98: Myomeric Flexion & Propulsion Efficiency (% MFE) - Segmental wave frequency, burst thrust, lactic resistance, and sand penetration
     * - Synthesizes axial notochord hydrostatic turgor [0.35 - 0.98] and longitudinal compression resistance
     * - Tracks notochord elastic fatigue accumulation [0.0 - 1.0], axial buckling incidents, and sand rest recovery
     * - Monitors 45-65 V-shaped chevron myomere contractions, anaerobic lactic acidosis [0.0 - 1.0], and cramp paralysis
     * - Audits reverse sand-burrowing depth [0 - 55 px] and cryptic benthic filtration
     * - Evaluates coarse sand grain aspiration rate, endostyle stall, and pharyngeal cough flushing spasms
     * - Implements 4 distinct biological regimes across the 97th and 98th telemetry channels
     * - Renders laboratory HUD indicators, telemetry status badges, and circular history buffers
     */
    class CephalochordateTelemetryManager {
        /**
         * Calculate dish-wide Cephalochordata notochord, myomere, and swimming metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} cephalochordateManager - Global CephalochordateNotochordManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Cephalochordata telemetry metrics.
         */
        static calculateMetrics(organisms, cephalochordateManager, tick) {
            let liveCount = 0;
            let cephCount = 0;
            let activeSwimmers = 0;
            let reverseBurrowers = 0;

            let sumNTI = 0.0;
            let sumMFE = 0.0;
            let sumLength = 0.0;
            let sumTension = 0.0;
            let sumMyomeres = 0;
            let sumVelocity = 0.0;
            let sumBurrowDepth = 0.0;
            let sumFatigue = 0.0;
            let sumLactic = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isCephalochordate) {
                        cephCount++;

                        const nti = org.notochordTensionIndex !== undefined ? org.notochordTensionIndex : 0.55;
                        const mfe = org.myomericFlexionEfficiency !== undefined ? org.myomericFlexionEfficiency : 0.45;
                        const length = org.notochordLength || 55.0;
                        const tension = org.notochordTension || 0.72;
                        const myomeres = org.myomeresCount || 54;
                        const velocity = org.swimmingVelocity || 2.10;
                        const burrowDepth = org.reverseBurrowDepth || 0.0;
                        const fatigue = org.notochordFatigueAccumulation || 0.0;
                        const lactic = org.lacticAcidosisLevel || 0.0;

                        sumNTI += nti;
                        sumMFE += mfe;
                        sumLength += length;
                        sumTension += tension;
                        sumMyomeres += myomeres;
                        sumVelocity += velocity;
                        sumBurrowDepth += burrowDepth;
                        sumFatigue += fatigue;
                        sumLactic += lactic;

                        if (org.isReverseBurrowed) reverseBurrowers++;
                        else activeSwimmers++;
                    }
                }
            }

            const cephPrevalence = liveCount > 0 ? (cephCount / liveCount) * 100.0 : 0.0;
            const meanNTI = cephCount > 0 ? (sumNTI / cephCount) * 100.0 : 0.0;
            const meanMFE = cephCount > 0 ? (sumMFE / cephCount) * 100.0 : 0.0;
            const meanLength = cephCount > 0 ? (sumLength / cephCount) : 55.0;
            const meanTension = cephCount > 0 ? (sumTension / cephCount) : 0.0;
            const meanMyomeres = cephCount > 0 ? (sumMyomeres / cephCount) : 54.0;
            const meanVelocity = cephCount > 0 ? (sumVelocity / cephCount) : 0.0;
            const meanBurrowDepth = cephCount > 0 ? (sumBurrowDepth / cephCount) : 0.0;
            const meanFatigue = cephCount > 0 ? (sumFatigue / cephCount) * 100.0 : 0.0;
            const meanLactic = cephCount > 0 ? (sumLactic / cephCount) * 100.0 : 0.0;

            let filtEvents = 0;
            let sandEvents = 0;
            let bucklingEvents = 0;
            let crampEvents = 0;
            let coughEvents = 0;
            let sestonTotal = 0.0;
            let distanceTotal = 0.0;

            if (cephalochordateManager && cephalochordateManager.getMetrics) {
                const mgrMetrics = cephalochordateManager.getMetrics();
                filtEvents = mgrMetrics.endostyleFiltrationEvents || 0;
                sandEvents = mgrMetrics.sandPenetrationEvents || 0;
                bucklingEvents = mgrMetrics.axialBucklingIncidents || 0;
                crampEvents = mgrMetrics.myomericCrampIncidents || 0;
                coughEvents = mgrMetrics.pharyngealCoughEvents || 0;
                sestonTotal = mgrMetrics.cumulativeFilteredSeston || 0.0;
                distanceTotal = mgrMetrics.cumulativeDistanceSwum || 0.0;
            }

            // 4 Biological Regimes for 97th Channel (% NTI)
            let regimeCodeNTI = "FLACCID";
            let regimeTitleNTI = "FLACCID & QUIESCENT";
            let regimeBadgeNTI = "nti-flaccid";

            if (meanNTI >= 85.0) {
                regimeCodeNTI = "PEAK";
                regimeTitleNTI = "PEAK TURGOR & PENETRATION";
                regimeBadgeNTI = "nti-peak";
            } else if (meanNTI >= 60.0) {
                regimeCodeNTI = "THRUST";
                regimeTitleNTI = "ACTIVE AXIAL THRUST & SWIMMING";
                regimeBadgeNTI = "nti-thrust";
            } else if (meanNTI >= 30.0) {
                regimeCodeNTI = "GLIDING";
                regimeTitleNTI = "PARTIAL TENSION & GLIDING";
                regimeBadgeNTI = "nti-gliding";
            }

            // 4 Biological Regimes for 98th Channel (% MFE)
            let regimeCodeMFE = "SPASM";
            let regimeTitleMFE = "SPASM & CRAMP PARALYSIS";
            let regimeBadgeMFE = "mfe-spasm";

            if (meanMFE >= 85.0) {
                regimeCodeMFE = "PEAK";
                regimeTitleMFE = "PEAK MYOMERIC THRUST & BURROWING";
                regimeBadgeMFE = "mfe-peak";
            } else if (meanMFE >= 60.0) {
                regimeCodeMFE = "STEADY";
                regimeTitleMFE = "STEADY RHYTHMIC FLEXION";
                regimeBadgeMFE = "mfe-steady";
            } else if (meanMFE >= 30.0) {
                regimeCodeMFE = "FATIGUED";
                regimeTitleMFE = "FATIGUED & WEAK UNDULATION";
                regimeBadgeMFE = "mfe-fatigued";
            }

            return {
                liveCount,
                cephCount,
                cephPrevalence,
                activeSwimmers,
                reverseBurrowers,
                meanNTI,
                meanMFE,
                meanLength,
                meanTension,
                meanMyomeres,
                meanVelocity,
                meanBurrowDepth,
                meanFatigue,
                meanLactic,
                filtEvents,
                sandEvents,
                bucklingEvents,
                crampEvents,
                coughEvents,
                sestonTotal,
                distanceTotal,
                regimeCodeNTI,
                regimeTitleNTI,
                regimeBadgeNTI,
                regimeCodeMFE,
                regimeTitleMFE,
                regimeBadgeMFE,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 97th (% NTI) & 98th (% MFE) Channels.
         * @param {Object} metrics - Calculated Cephalochordata telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 97 Readout (% NTI)
            const valNTIIndexEl = document.getElementById("valNTIIndex");
            if (valNTIIndexEl) {
                valNTIIndexEl.textContent = metrics.meanNTI.toFixed(1) + "% NTI (" + metrics.regimeTitleNTI + ")";
                if (metrics.meanNTI >= 85.0) {
                    valNTIIndexEl.style.color = "#bfdbfe";
                } else if (metrics.meanNTI >= 60.0) {
                    valNTIIndexEl.style.color = "#60a5fa";
                } else if (metrics.meanNTI >= 30.0) {
                    valNTIIndexEl.style.color = "#3b82f6";
                } else {
                    valNTIIndexEl.style.color = "#2563eb";
                }
            }

            // 2. Secondary Channel 97 Status
            const valNTIStatusEl = document.getElementById("valNTIStatus");
            if (valNTIStatusEl) {
                valNTIStatusEl.textContent =
                    "CEPHALOCHORDATA: " + metrics.cephCount + "/" + metrics.liveCount +
                    " (" + metrics.cephPrevalence.toFixed(0) + "%) | NOTOCHORD: " + metrics.meanLength.toFixed(1) + " px" +
                    " | TENSION: " + (metrics.meanTension * 100.0).toFixed(0) + "%" +
                    " | MYOMERES: " + metrics.meanMyomeres.toFixed(0) +
                    " | SWIMMERS: " + metrics.activeSwimmers +
                    " | BURROWERS: " + metrics.reverseBurrowers;
                valNTIStatusEl.style.color = metrics.meanNTI >= 50.0 ? "#60a5fa" : "#2563eb";
            }

            // 3. Primary Channel 98 Readout (% MFE)
            const valMFEIndexEl = document.getElementById("valMFEIndex");
            if (valMFEIndexEl) {
                valMFEIndexEl.textContent = metrics.meanMFE.toFixed(1) + "% MFE (" + metrics.regimeTitleMFE + ")";
                if (metrics.meanMFE >= 85.0) {
                    valMFEIndexEl.style.color = "#99f6e4";
                } else if (metrics.meanMFE >= 60.0) {
                    valMFEIndexEl.style.color = "#5eead4";
                } else if (metrics.meanMFE >= 30.0) {
                    valMFEIndexEl.style.color = "#2dd4bf";
                } else {
                    valMFEIndexEl.style.color = "#14b8a6";
                }
            }

            // 4. Secondary Channel 98 Status
            const valMFEStatusEl = document.getElementById("valMFEStatus");
            if (valMFEStatusEl) {
                valMFEStatusEl.textContent =
                    "MFE: " + metrics.meanMFE.toFixed(1) + "%" +
                    " | FATIGUE: " + metrics.meanFatigue.toFixed(0) + "%" +
                    " | ACIDOSIS: " + metrics.meanLactic.toFixed(0) + "%" +
                    " | BUCKLING: " + metrics.bucklingEvents +
                    " | CRAMPS: " + metrics.crampEvents +
                    " | COUGHS: " + metrics.coughEvents;
                valMFEStatusEl.style.color = metrics.meanMFE >= 50.0 ? "#5eead4" : "#14b8a6";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 97th Channel: % NTI
            if (!historyData.notochordTensionIndex) {
                historyData.notochordTensionIndex = new Array(74).fill(0);
            }
            const chartValNTI = Number.isFinite(metrics.meanNTI) ?
                Math.max(0, Math.min(100, metrics.meanNTI)) : 0;
            historyData.notochordTensionIndex.shift();
            historyData.notochordTensionIndex.push(chartValNTI);

            // 98th Channel: % MFE
            if (!historyData.myomericFlexionEfficiency) {
                historyData.myomericFlexionEfficiency = new Array(74).fill(0);
            }
            const chartValMFE = Number.isFinite(metrics.meanMFE) ?
                Math.max(0, Math.min(100, metrics.meanMFE)) : 0;
            historyData.myomericFlexionEfficiency.shift();
            historyData.myomericFlexionEfficiency.push(chartValMFE);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} cephalochordateManager - Global CephalochordateNotochordManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, cephalochordateManager, tick) {
            const metrics = CephalochordateTelemetryManager.calculateMetrics(organisms, cephalochordateManager, tick);
            CephalochordateTelemetryManager.updateHUD(metrics);
            CephalochordateTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CephalochordateTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.CephalochordateTelemetryManager = CephalochordateTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
