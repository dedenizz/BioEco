// BioEcosystem - Grazing Lantern Index (% GLI) & Bioerosion Rate (% BER) Telemetry
// Module: src/ui/telemetry_lantern.js
// Version: 7.38.0 (Hour 458 - Looks & UI Agent: 88th Channel % BER & Dual Lantern HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * LanternTelemetryManager
     * High-precision laboratory telemetry tracking for echinoid Aristotle's Lantern mastication and bioerosion:
     * - Channel 87: Grazing Lantern Index (% GLI) - Mechanical jaw force, teeth sharpness, and algal grazing
     * - Channel 88: Bioerosion Rate & Dental Renewal Index (% BER) - Substrate excavation, plumula reserves, and barren regime
     * - Synthesizes 5-part calcite pyramidal jaw arch integrity and oral peristome kinematics
     * - Tracks self-sharpening keeled chisel teeth sharpness, dental wear, and plumula mineral reserves
     * - Audits protractor muscle outward thrust force [0.40 - 2.2 N] and rhythmic jaw rasping aperture
     * - Evaluates calcareous coralline algae scraping efficiency, kelp holdfast grazing, and nutrient yield
     * - Monitors substrate bioerosion rates, fine calcite silt dispersal, and mineral sediment generation
     * - Tracks Urchin Barren trophic regime shifts and substrate matrix structural weakening
     * - Implements 4 distinct biological regimes across the 87th and 88th telemetry channels
     * - Renders laboratory HUD telemetry indicators, status badges, and circular history buffers
     */
    class LanternTelemetryManager {
        /**
         * Calculate dish-wide Aristotle's Lantern metrics, tooth sharpness, and grazing efficiency.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} lanternManager - Global EchinodermLanternManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Aristotle's Lantern telemetry metrics.
         */
        static calculateMetrics(organisms, lanternManager, tick) {
            let liveCount = 0;
            let lanternCount = 0;
            let activeGrazerCount = 0;
            let highGLICount = 0;
            let highBERCount = 0;

            let sumGLI = 0.0;
            let sumBER = 0.0;
            let sumJaws = 0;
            let sumTeeth = 0;
            let sumSharpness = 0.0;
            let sumProtractor = 0.0;
            let sumExtension = 0.0;
            let sumScraping = 0.0;
            let sumBioerosion = 0.0;
            let sumToothWear = 0.0;
            let sumToothSacReserve = 0.0;
            let sumMicrofractureRate = 0.0;
            let sumBluntingPenalty = 0.0;
            let sumExcavationVolume = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const hasLantern = org.hasAristotleLantern || (org.calcitePyramidJawsCount && org.calcitePyramidJawsCount > 0);
                    if (hasLantern) {
                        lanternCount++;

                        const gli = org.grazingLanternIndex || 0.0;
                        const ber = org.bioerosionRateIndex || 0.0;
                        const jaws = org.calcitePyramidJawsCount || 5;
                        const teeth = org.calciteTeethCount || 5;
                        const sharp = org.lanternTeethSharpness || 0.72;
                        const prot = org.lanternProtractorForce || 0.85;
                        const ext = org.lanternExtensionDistance || 0.0;
                        const scrape = org.algalScrapingEfficiency || 0.75;
                        const bio = org.bioerosionRate || 0.08;
                        const wear = org.toothWearLevel || 0.0;
                        const reserve = org.toothSacCalciteReserve || 0.0;
                        const microfracture = org.toothMicrofractureRate || 0.0;
                        const blunting = org.severeToothBluntingPenalty || 0.0;
                        const excavation = org.bioerosionExcavationVolume || 0.0;

                        sumGLI += gli;
                        sumBER += ber;
                        sumJaws += jaws;
                        sumTeeth += teeth;
                        sumSharpness += sharp;
                        sumProtractor += prot;
                        sumExtension += ext;
                        sumScraping += scrape;
                        sumBioerosion += bio;
                        sumToothWear += wear;
                        sumToothSacReserve += reserve;
                        sumMicrofractureRate += microfracture;
                        sumBluntingPenalty += blunting;
                        sumExcavationVolume += excavation;

                        if (ext > 0.40) activeGrazerCount++;
                        if (gli >= 0.70) highGLICount++;
                        if (ber >= 0.70) highBERCount++;
                    }
                }
            }

            const denom = lanternCount > 0 ? lanternCount : 1;
            const meanGLI = lanternCount > 0 ? (sumGLI / denom) * 100.0 : 0.0;
            const meanBER = lanternCount > 0 ? (sumBER / denom) * 100.0 : 0.0;
            const meanJaws = lanternCount > 0 ? Math.round(sumJaws / denom) : 0;
            const meanTeeth = lanternCount > 0 ? Math.round(sumTeeth / denom) : 0;
            const meanSharpness = lanternCount > 0 ? (sumSharpness / denom) * 100.0 : 0.0;
            const meanProtractor = lanternCount > 0 ? (sumProtractor / denom) : 0.0;
            const meanExtension = lanternCount > 0 ? (sumExtension / denom) : 0.0;
            const meanScraping = lanternCount > 0 ? (sumScraping / denom) * 100.0 : 0.0;
            const meanBioerosion = lanternCount > 0 ? (sumBioerosion / denom) : 0.0;
            const meanToothWear = lanternCount > 0 ? (sumToothWear / denom) * 100.0 : 0.0;
            const meanToothSacReserve = lanternCount > 0 ? (sumToothSacReserve / denom) : 0.0;
            const meanMicrofractureRate = lanternCount > 0 ? (sumMicrofractureRate / denom) * 100.0 : 0.0;
            const meanBluntingPenalty = lanternCount > 0 ? (sumBluntingPenalty / denom) * 100.0 : 0.0;
            const meanExcavationVolume = lanternCount > 0 ? (sumExcavationVolume / denom) : 0.0;
            const lanternPrevalence = liveCount > 0 ? (lanternCount / liveCount) * 100.0 : 0.0;

            const mgrMetrics = lanternManager ? lanternManager.metrics : {};
            const scrapingEvents = mgrMetrics ? (mgrMetrics.algalScrapingEvents || 0) : 0;
            const bioerosionIncidents = mgrMetrics ? (mgrMetrics.bioerosionIncidents || 0) : 0;
            const dentalRenewals = mgrMetrics ? (mgrMetrics.dentalRenewalEvents || 0) : 0;
            const microfractureEvents = mgrMetrics ? (mgrMetrics.microfractureEvents || 0) : 0;
            const scrapedCarbon = mgrMetrics ? (mgrMetrics.cumulativeScrapedCarbon || 0.0) : 0.0;
            const bioerodedMineral = mgrMetrics ? (mgrMetrics.cumulativeBioerodedMineral || 0.0) : 0.0;
            const cumulativeExcavatedVolume = mgrMetrics ? (mgrMetrics.cumulativeExcavatedVolume || 0.0) : 0.0;
            const calciteSiltSuspension = mgrMetrics ? (mgrMetrics.calciteSiltSuspension || 0.0) : 0.0;
            const reefMatrixWeakeningRatio = mgrMetrics ? (mgrMetrics.reefMatrixWeakeningRatio || 0.0) : 0.0;
            const urchinBarrenState = mgrMetrics ? (mgrMetrics.urchinBarrenState || false) : false;

            // Classify 87th Channel Biological Regime (% GLI)
            let regimeCodeGLI = "GLI_DEPLETED";
            let regimeTitleGLI = "MASTICATION INEFFICIENCY & BLUNTED CHISELS";
            let regimeBadgeGLI = "gli-depleted";

            if (meanGLI >= 85.0) {
                regimeCodeGLI = "GLI_MAXIMAL";
                regimeTitleGLI = "MAXIMAL ARISTOTLE'S LANTERN MASTICATION";
                regimeBadgeGLI = "gli-maximal";
            } else if (meanGLI >= 60.0) {
                regimeCodeGLI = "GLI_ACTIVE";
                regimeTitleGLI = "ACTIVE SUBSTRATE RASPING & ALGAL GRAZING";
                regimeBadgeGLI = "gli-active";
            } else if (meanGLI >= 30.0) {
                regimeCodeGLI = "GLI_DEVELOPING";
                regimeTitleGLI = "DEVELOPING LANTERN & BASAL PROTRACTION";
                regimeBadgeGLI = "gli-developing";
            }

            // Classify 88th Channel Biological Regime (% BER)
            let regimeCodeBER = "BER_DEPLETED";
            let regimeTitleBER = "DENTAL MATRIX DEPLETION & SUBSIDENCE";
            let regimeBadgeBER = "ber-depleted";

            if (meanBER >= 85.0) {
                regimeCodeBER = "BER_MAXIMAL";
                regimeTitleBER = "MAXIMAL MACRO-BIOEROSION & RAPID AXIAL REGENERATION";
                regimeBadgeBER = "ber-maximal";
            } else if (meanBER >= 60.0) {
                regimeCodeBER = "BER_ACTIVE";
                regimeTitleBER = "ACTIVE SUBSTRATE ABRASION & BALANCED RENEWAL";
                regimeBadgeBER = "ber-active";
            } else if (meanBER >= 30.0) {
                regimeCodeBER = "BER_BASAL";
                regimeTitleBER = "BASAL CALCIFICATION & INCIPIENT BIOEROSION";
                regimeBadgeBER = "ber-basal";
            }

            return {
                liveCount,
                lanternCount,
                lanternPrevalence,
                activeGrazerCount,
                highGLICount,
                highBERCount,
                meanGLI,
                meanBER,
                meanJaws,
                meanTeeth,
                meanSharpness,
                meanProtractor,
                meanExtension,
                meanScraping,
                meanBioerosion,
                meanToothWear,
                meanToothSacReserve,
                meanMicrofractureRate,
                meanBluntingPenalty,
                meanExcavationVolume,
                scrapingEvents,
                bioerosionIncidents,
                dentalRenewals,
                microfractureEvents,
                scrapedCarbon,
                bioerodedMineral,
                cumulativeExcavatedVolume,
                calciteSiltSuspension,
                reefMatrixWeakeningRatio,
                urchinBarrenState,
                regimeCodeGLI,
                regimeTitleGLI,
                regimeBadgeGLI,
                regimeCodeBER,
                regimeTitleBER,
                regimeBadgeBER,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 87th (% GLI) and 88th (% BER) Channels.
         * @param {Object} metrics - Calculated Aristotle's Lantern telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 87 Readout (% GLI)
            const valGLIIndexEl = document.getElementById("valGLIIndex");
            if (valGLIIndexEl) {
                valGLIIndexEl.textContent = metrics.meanGLI.toFixed(1) + "% GLI (" + metrics.regimeTitleGLI + ")";
                if (metrics.meanGLI >= 85.0) {
                    valGLIIndexEl.style.color = "#a7f3d0";
                } else if (metrics.meanGLI >= 60.0) {
                    valGLIIndexEl.style.color = "#6ee7b7";
                } else if (metrics.meanGLI >= 30.0) {
                    valGLIIndexEl.style.color = "#34d399";
                } else {
                    valGLIIndexEl.style.color = "#10b981";
                }
            }

            // 2. Secondary Channel 87 Status
            const valGLIStatusEl = document.getElementById("valGLIStatus");
            if (valGLIStatusEl) {
                valGLIStatusEl.textContent =
                    "LANTERN: " + metrics.lanternCount + "/" + metrics.liveCount +
                    " (" + metrics.lanternPrevalence.toFixed(0) + "%) | JAWS: " + metrics.meanJaws +
                    " | SHARPNESS: " + metrics.meanSharpness.toFixed(1) + "%" +
                    " | PROTRACTOR: " + metrics.meanProtractor.toFixed(2) + " N" +
                    " | EXTENSION: " + metrics.meanExtension.toFixed(1) + " px" +
                    " | SCRAPES: " + metrics.scrapingEvents;
                valGLIStatusEl.style.color = metrics.meanGLI >= 50.0 ? "#6ee7b7" : "#10b981";
            }

            // 3. Primary Channel 88 Readout (% BER)
            const valBERIndexEl = document.getElementById("valBERIndex");
            if (valBERIndexEl) {
                valBERIndexEl.textContent = metrics.meanBER.toFixed(1) + "% BER (" + metrics.regimeTitleBER + ")";
                if (metrics.meanBER >= 85.0) {
                    valBERIndexEl.style.color = "#fef3c7";
                } else if (metrics.meanBER >= 60.0) {
                    valBERIndexEl.style.color = "#fbbf24";
                } else if (metrics.meanBER >= 30.0) {
                    valBERIndexEl.style.color = "#f59e0b";
                } else {
                    valBERIndexEl.style.color = "#d97706";
                }
            }

            // 4. Secondary Channel 88 Status
            const valBERStatusEl = document.getElementById("valBERStatus");
            if (valBERStatusEl) {
                const barrenText = metrics.urchinBarrenState ? "ACTIVE BARREN" : "HEALTHY KELP";
                const substrateText = metrics.reefMatrixWeakeningRatio > 0.35 ? "WEAKENED (" + (metrics.reefMatrixWeakeningRatio * 100).toFixed(0) + "%)" : "STABLE";
                valBERStatusEl.textContent =
                    "BER: " + metrics.meanBER.toFixed(1) + "%" +
                    " | SUBSTRATE: " + substrateText +
                    " | SILT: " + metrics.calciteSiltSuspension.toFixed(1) + " mg/L" +
                    " | RESERVE: " + metrics.meanToothSacReserve.toFixed(1) + "%" +
                    " | WEAR: " + metrics.meanToothWear.toFixed(1) + "%" +
                    " | REGIME: " + barrenText +
                    " | EXCAVATED: " + (metrics.cumulativeExcavatedVolume / 1000.0).toFixed(1) + "k um3";
                valBERStatusEl.style.color = metrics.urchinBarrenState ? "#fb7185" : (metrics.meanBER >= 50.0 ? "#fbbf24" : "#d97706");
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 87th Channel: % GLI
            if (!historyData.grazingLanternIndex) {
                historyData.grazingLanternIndex = new Array(74).fill(0);
            }
            const chartValGLI = Number.isFinite(metrics.meanGLI) ?
                Math.max(0, Math.min(100, metrics.meanGLI)) : 0;
            historyData.grazingLanternIndex.shift();
            historyData.grazingLanternIndex.push(chartValGLI);

            // 88th Channel: % BER
            if (!historyData.bioerosionRateIndex) {
                historyData.bioerosionRateIndex = new Array(74).fill(0);
            }
            const chartValBER = Number.isFinite(metrics.meanBER) ?
                Math.max(0, Math.min(100, metrics.meanBER)) : 0;
            historyData.bioerosionRateIndex.shift();
            historyData.bioerosionRateIndex.push(chartValBER);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} lanternManager - Global EchinodermLanternManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, lanternManager, tick) {
            const metrics = LanternTelemetryManager.calculateMetrics(organisms, lanternManager, tick);
            LanternTelemetryManager.updateHUD(metrics);
            LanternTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.LanternTelemetryManager = LanternTelemetryManager;

})(typeof window !== "undefined" ? window : global);
