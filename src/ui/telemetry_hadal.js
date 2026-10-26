// BioEcosystem - Piezophilic Membrane Stability (% PMS) & Abyssal Barometric Adaptation (% ABA) Telemetry
// Module: src/ui/telemetry_hadal.js
// Version: 6.78.0 (Hour 398 - Looks / UI Agent: 76th Channel % ABA & Decompression HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HadalTelemetryManager
     * High-precision telemetry tracking for deep-sea hadal trench piezophilic adaptations:
     * - Channel 75: Piezophilic Membrane Stability (% PMS)
     * - Channel 76: Abyssal Barometric Adaptation Index (% ABA)
     * - Audits homeoviscous membrane fluidity against extreme hydrostatic pressure (up to 1.50 bar rel)
     * - Tracks decompressional lysis mitigation, turgor elasticity, and decompression buffer zones
     * - Tracks intracellular TMAO/betaine piezolyte osmolyte hydration envelopes and recycled ATP
     * - Measures baroresistant ion transporter kinetics and benthic sediment anchoring detachment surges
     * - Renders laboratory HUD telemetry indicators, badges, and diagnostic history buffers
     */
    class HadalTelemetryManager {
        /**
         * Calculate dish-wide piezophilic metrics, hydrostatic stress, and hadal demographics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} piezophilicManager - Global PiezophilicAdaptationsManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive hadal telemetry metrics.
         */
        static calculateMetrics(organisms, piezophilicManager, tick) {
            let liveCount = 0;
            let hadalCount = 0;
            let barophilicCount = 0;
            let anchoredCount = 0;

            let sumPUFA = 0.0;
            let sumPiezolyte = 0.0;
            let sumBaroresistant = 0.0;
            let sumAnchoring = 0.0;
            let sumChemo = 0.0;
            let sumStress = 0.0;
            let sumDecompressStress = 0.0;
            let sumABA = 0.0;
            let sumFluidity = 0.0;
            let sumDepth = 0.0;
            let maxDepth = 0.0;

            const hadalDepthThreshold = (piezophilicManager && piezophilicManager.hadalDepthThreshold) ?
                piezophilicManager.hadalDepthThreshold : 380.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const y = typeof org.y === "number" ? org.y : 0;
                    sumDepth += y;
                    if (y > maxDepth) maxDepth = y;

                    const pufa = org.pufaRatio || 0.0;
                    const piezolyte = org.piezolyteConcentration || 0.0;
                    const transporter = org.baroresistantTransporters || 0.0;
                    const anchor = org.benthicAnchoring || 0.0;
                    const chemo = org.chemosynthesisRate || 0.0;
                    const stress = org.compressionStress || 0.0;
                    const dStress = org.decompressionStress || 0.0;
                    const aba = org.barometricAdaptationIndex || 0.5;
                    const fluidity = org.effectiveFluidity || 0.5;

                    sumPUFA += pufa;
                    sumPiezolyte += piezolyte;
                    sumBaroresistant += transporter;
                    sumAnchoring += anchor;
                    sumChemo += chemo;
                    sumStress += stress;
                    sumDecompressStress += dStress;
                    sumABA += aba;
                    sumFluidity += fluidity;

                    if (y >= hadalDepthThreshold) hadalCount++;
                    if (org.barophilicAdapted || (pufa >= 0.35 && piezolyte >= 0.25)) barophilicCount++;
                    if (org.isBenthicAnchored) anchoredCount++;
                }
            }

            const meanDepth = liveCount > 0 ? (sumDepth / liveCount) : 0.0;
            const hadalPrevalence = liveCount > 0 ? (hadalCount / liveCount) : 0.0;
            const barophilicPrevalence = liveCount > 0 ? (barophilicCount / liveCount) : 0.0;
            const meanPUFA = liveCount > 0 ? (sumPUFA / liveCount) : 0.0;
            const meanPiezolyte = liveCount > 0 ? (sumPiezolyte / liveCount) : 0.0;
            const meanBaroresistant = liveCount > 0 ? (sumBaroresistant / liveCount) : 0.0;
            const meanAnchoring = liveCount > 0 ? (sumAnchoring / liveCount) : 0.0;
            const meanChemo = liveCount > 0 ? (sumChemo / liveCount) : 0.0;
            const meanStress = liveCount > 0 ? (sumStress / liveCount) : 0.0;
            const meanDecompressStress = liveCount > 0 ? (sumDecompressStress / liveCount) : 0.0;
            const meanFluidity = liveCount > 0 ? (sumFluidity / liveCount) : 0.0;

            let cumulativeChemoAtp = 0.0;
            let cumulativeAtpCost = 0.0;
            let preventedCompressions = 0;
            let decompressionTraumaEvents = 0;
            let detachmentSurgeCount = 0;
            let osmolyteRecycledAtp = 0.0;

            if (piezophilicManager && piezophilicManager.metrics) {
                cumulativeChemoAtp = piezophilicManager.metrics.cumulativeChemoAtp || 0.0;
                cumulativeAtpCost = piezophilicManager.metrics.cumulativeAtpCost || 0.0;
                preventedCompressions = piezophilicManager.metrics.preventedCompressions || 0;
                decompressionTraumaEvents = piezophilicManager.metrics.decompressionTraumaEvents || 0;
                detachmentSurgeCount = piezophilicManager.metrics.detachmentSurgeCount || 0;
                osmolyteRecycledAtp = piezophilicManager.metrics.osmolyteRecycledAtp || 0.0;
            }

            // Channel 75: % PMS (Piezophilic Membrane Stability)
            const fluidityFactor = Math.min(1.0, meanFluidity / 0.65);
            const piezolyteFactor = Math.min(1.0, meanPiezolyte / 0.55);
            const transportFactor = Math.min(1.0, meanBaroresistant / 0.50);
            const stressReliefFactor = Math.max(0.0, 1.0 - (meanStress * 1.6));
            const meanPMS = Math.max(0.0, Math.min(100.0,
                (fluidityFactor * 35.0) + (piezolyteFactor * 25.0) + (transportFactor * 20.0) + (stressReliefFactor * 20.0)));

            let regimePMS = "BARIC MEMBRANE CRACKING & LEAKAGE";
            let colorPMS = "#ef4444";
            if (meanPMS >= 75.0) { regimePMS = "ULTRA-HADAL PIEZOPHILIC HOMEOSTASIS"; colorPMS = "#6366f1"; }
            else if (meanPMS >= 50.0) { regimePMS = "STABLE BENTHIC PUFA BILAYER FLUIDITY"; colorPMS = "#3b82f6"; }
            else if (meanPMS >= 25.0) { regimePMS = "MODERATE HYDROSTATIC RIGIDIFICATION"; colorPMS = "#f59e0b"; }

            // Channel 76: % ABA (Abyssal Barometric Adaptation Index)
            const rawABA = liveCount > 0 ? (sumABA / liveCount) : 0.5;
            const meanABA = Math.max(0.0, Math.min(100.0, rawABA * 100.0));

            let regimeABA = "DECOMPRESSION LYSIS & TURGOR RUPTURE";
            let colorABA = "#f43f5e";
            if (meanABA >= 75.0) { regimeABA = "DEEP-TRENCH PIEZORESISTANT HOMEOSTASIS"; colorABA = "#14b8a6"; }
            else if (meanABA >= 50.0) { regimeABA = "STABLE DECOMPRESSION BUFFER TOLERANCE"; colorABA = "#06b6d4"; }
            else if (meanABA >= 25.0) { regimeABA = "MODERATE TURGOR EXPANSION STRAIN"; colorABA = "#f59e0b"; }

            const hydrostaticPressure = Math.min(1.50, meanDepth * 0.0022);

            return {
                liveCount, hadalCount, hadalPrevalence, barophilicCount, barophilicPrevalence,
                anchoredCount, meanPUFA, meanPiezolyte, meanBaroresistant, meanAnchoring,
                meanChemo, meanStress, meanDecompressStress, meanFluidity, meanDepth, maxDepth, hydrostaticPressure,
                cumulativeChemoAtp, cumulativeAtpCost, preventedCompressions, decompressionTraumaEvents,
                detachmentSurgeCount, osmolyteRecycledAtp, meanPMS, regimePMS, colorPMS,
                meanABA, regimeABA, colorABA, tick: (tick || 0)
            };
        }

        /**
         * Update laboratory HUD elements with 75th and 76th channel telemetry values.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 75: % PMS
            const valPMSIndexEl = document.getElementById("valPMSIndex");
            if (valPMSIndexEl) {
                valPMSIndexEl.textContent = metrics.meanPMS.toFixed(1) + "% PMS (" + metrics.regimePMS + ")";
                valPMSIndexEl.style.color = metrics.colorPMS;
            }

            const valPMSStatusEl = document.getElementById("valPMSStatus");
            if (valPMSStatusEl) {
                valPMSStatusEl.textContent =
                    "HADAL CELLS: " + metrics.hadalCount + "/" + metrics.liveCount +
                    " | PUFA: " + (metrics.meanPUFA * 100.0).toFixed(1) + "%" +
                    " | TMAO: " + (metrics.meanPiezolyte * 100.0).toFixed(1) + "%" +
                    " | ANCHORED: " + metrics.anchoredCount +
                    " | CHEMO ATP: " + metrics.cumulativeChemoAtp.toFixed(2) +
                    " | BARIC DEPTH: " + Math.round(metrics.meanDepth) + " px (" + metrics.hydrostaticPressure.toFixed(2) + " bar)";
                valPMSStatusEl.style.color = metrics.meanPMS >= 50.0 ? "#818cf8" : "#a5b4fc";
            }

            // Channel 76: % ABA Index Indicator
            const valABAIndexEl = document.getElementById("valABAIndex");
            if (valABAIndexEl) {
                valABAIndexEl.textContent = metrics.meanABA.toFixed(1) + "% ABA (" + metrics.regimeABA + ")";
                valABAIndexEl.style.color = metrics.colorABA;
            }

            // Decompression Buffer & Osmolyte Recycling Status Indicator
            const valABAStatusEl = document.getElementById("valABAStatus");
            if (valABAStatusEl) {
                valABAStatusEl.textContent =
                    "DECOMPRESS STRESS: " + (metrics.meanDecompressStress * 100.0).toFixed(1) + "%" +
                    " | BUFFER: 260px" +
                    " | RECYCLED ATP: " + metrics.osmolyteRecycledAtp.toFixed(2) +
                    " | SURGES: " + metrics.detachmentSurgeCount +
                    " | TRAUMA EVENTS: " + metrics.decompressionTraumaEvents;
                valABAStatusEl.style.color = metrics.meanABA >= 50.0 ? "#2dd4bf" : "#5eead4";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.piezophilicMembraneStability) {
                const chartValPMS = Number.isFinite(metrics.meanPMS) ? Math.max(0, Math.min(100, metrics.meanPMS)) : 0;
                historyData.piezophilicMembraneStability.shift();
                historyData.piezophilicMembraneStability.push(chartValPMS);
            }
            if (historyData.abyssalBarometricAdaptation) {
                const chartValABA = Number.isFinite(metrics.meanABA) ? Math.max(0, Math.min(100, metrics.meanABA)) : 0;
                historyData.abyssalBarometricAdaptation.shift();
                historyData.abyssalBarometricAdaptation.push(chartValABA);
            }
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} piezophilicManager - Global PiezophilicAdaptationsManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, piezophilicManager, tick) {
            const metrics = HadalTelemetryManager.calculateMetrics(organisms, piezophilicManager, tick);
            HadalTelemetryManager.updateHUD(metrics);
            HadalTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Render compact telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getPMSBadgeHTML(metrics) {
            const color = metrics ? metrics.colorPMS : "#6366f1";
            const val = metrics ? metrics.meanPMS.toFixed(1) : "0.0";
            return '<span class="pms-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% PMS</span>';
        }

        static getABABadgeHTML(metrics) {
            const color = metrics ? metrics.colorABA : "#14b8a6";
            const val = metrics ? metrics.meanABA.toFixed(1) : "0.0";
            return '<span class="aba-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% ABA</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HadalTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.HadalTelemetryManager = HadalTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
