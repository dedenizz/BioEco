// BioEcosystem - Water Vascular Index (% WVI) & Podial Traction Index (% PTI) Echinoderm Telemetry
// Module: src/ui/telemetry_echinoderm.js
// Version: 7.18.0 (Hour 438 - UI Agent: 84th Channel % PTI & Podial Traction HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EchinodermTelemetryManager
     * High-precision laboratory telemetry tracking for echinoderm water vascular hydraulics:
     * - Channel 83: Water Vascular Index (% WVI)
     * - Channel 84: Podial Traction Index (% PTI)
     * - Monitors madreporite porosity and seawater inflow filtration efficiency
     * - Audits stone canal and circumoral ring canal hydrostatic turgor pressure [12 - 45 kPa]
     * - Tracks ampullary contraction rhythms and dual-row podia (tube feet) extension waves
     * - Evaluates chemical mucus suction force and substrate vacuum traction against drift
     * - Quantifies hydraulic energy conservation over muscular locomotion
     * - Measures podia rupture rates, mechanical shear trauma, and ambulacral regeneration
     * - Renders laboratory HUD telemetry indicators, status badges, and circular history buffers
     */
    class EchinodermTelemetryManager {
        /**
         * Calculate dish-wide echinoderm water vascular metrics, hydraulic index, and podial traction.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} echinodermManager - Global EchinodermWaterVascularManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive echinoderm hydraulic telemetry metrics.
         */
        static calculateMetrics(organisms, echinodermManager, tick) {
            let liveCount = 0;
            let echinodermCount = 0;
            let activeMoversCount = 0;
            let pryingCount = 0;
            let highTractionCount = 0;

            let sumWVI = 0.0;
            let sumPTI = 0.0;
            let sumPressure = 0.0;
            let sumPorosity = 0.0;
            let sumFouling = 0.0;
            let sumOsmoticStrain = 0.0;
            let sumPodia = 0;
            let sumExtension = 0.0;
            let sumSuction = 0.0;
            let sumTraction = 0.0;
            let sumRupturedPodia = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const isEchinoderm = org.isEchinoderm || (org.podiaCount && org.podiaCount > 0);
                    if (isEchinoderm) {
                        echinodermCount++;

                        const wvi = org.waterVascularIndex || 0.0;
                        const pti = org.podialTractionIndex || 0.0;
                        const pressure = org.stoneCanalPressure || 0.0;
                        const porosity = org.madreporitePorosity || 0.0;
                        const fouling = org.madreporiteFoulingRatio || 0.0;
                        const osmoStrain = org.osmoticHydrostaticStrain || 0.0;
                        const podia = org.podiaCount || 0;
                        const extension = org.podiaExtensionLength || 0.0;
                        const suction = org.podiaSuctionForce || 0.0;
                        const traction = org.podialTractionForce || 0.0;
                        const ruptured = org.rupturedPodiaCount || 0;

                        sumWVI += wvi;
                        sumPTI += pti;
                        sumPressure += pressure;
                        sumPorosity += porosity;
                        sumFouling += fouling;
                        sumOsmoticStrain += osmoStrain;
                        sumPodia += podia;
                        sumExtension += extension;
                        sumSuction += suction;
                        sumTraction += traction;
                        sumRupturedPodia += ruptured;

                        if (traction > 0.4) activeMoversCount++;
                        if (traction > 1.0) highTractionCount++;
                        if (org.bivalvePryingActive) pryingCount++;
                    }
                }
            }

            const managerMetrics = (echinodermManager && typeof echinodermManager.getMetrics === "function") ?
                echinodermManager.getMetrics() : (echinodermManager ? echinodermManager.metrics : null);

            const echinodermPrevalence = liveCount > 0 ? (echinodermCount / liveCount) : 0.0;
            const meanPressure = echinodermCount > 0 ? (sumPressure / echinodermCount) : 0.0;
            const meanPorosity = echinodermCount > 0 ? (sumPorosity / echinodermCount) : 0.0;
            const meanFouling = echinodermCount > 0 ? (sumFouling / echinodermCount) : 0.0;
            const meanOsmoticStrain = echinodermCount > 0 ? (sumOsmoticStrain / echinodermCount) : 0.0;
            const meanPodia = echinodermCount > 0 ? (sumPodia / echinodermCount) : 0.0;
            const meanExtension = echinodermCount > 0 ? (sumExtension / echinodermCount) : 0.0;
            const meanSuction = echinodermCount > 0 ? (sumSuction / echinodermCount) : 0.0;
            const meanTraction = echinodermCount > 0 ? (sumTraction / echinodermCount) : 0.0;

            const pryingEvents = managerMetrics ? (managerMetrics.pryingPredationEvents || 0) : pryingCount;
            const vacuumGrips = managerMetrics ? (managerMetrics.vacuumGripHoldEvents || 0) : highTractionCount;
            const totalRupturedPodia = managerMetrics ? (managerMetrics.totalRupturedPodia || 0) : sumRupturedPodia;

            // Channel 83: % WVI (Water Vascular Index)
            const rawWVI = echinodermCount > 0 ? (sumWVI / echinodermCount) : 0.0;
            const meanWVI = Math.max(0.0, Math.min(100.0, rawWVI * 100.0));

            let regimeWVI = "MADREPORITE COLLAPSE & HYDRAULIC FAILURE";
            let colorWVI = "#ef4444";
            if (meanWVI >= 75.0) {
                regimeWVI = "OPTIMAL HYDRAULIC TURGOR & PODIA LOCK";
                colorWVI = "#0284c7";
            } else if (meanWVI >= 50.0) {
                regimeWVI = "BALANCED HYDROSTATIC AMBULACRAL FLOW";
                colorWVI = "#38bdf8";
            } else if (meanWVI >= 25.0) {
                regimeWVI = "MODERATE VASCULAR PRESSURE STRAIN";
                colorWVI = "#f59e0b";
            }

            // Channel 84: % PTI (Podial Traction Index)
            const rawPTI = echinodermCount > 0 ? (sumPTI / echinodermCount) : 0.0;
            const meanPTI = Math.max(0.0, Math.min(100.0, rawPTI * 100.0));

            let regimePTI = "SUBSTRATE DETACHMENT & TRACTION COLLAPSE";
            let colorPTI = "#ef4444";
            if (meanPTI >= 75.0) {
                regimePTI = "OPTIMAL SUBSTRATE VACUUM TRACTION";
                colorPTI = "#f59e0b";
            } else if (meanPTI >= 50.0) {
                regimePTI = "BALANCED PODIAL CREEP & ADHESION";
                colorPTI = "#fbbf24";
            } else if (meanPTI >= 25.0) {
                regimePTI = "HIGH SHEAR PODIAL RUPTURE STRAIN";
                colorPTI = "#f97316";
            }

            return {
                liveCount,
                echinodermCount,
                echinodermPrevalence,
                activeMoversCount,
                pryingCount,
                pryingEvents,
                highTractionCount,
                vacuumGrips,
                meanPressure,
                meanPorosity,
                meanFouling,
                meanOsmoticStrain,
                meanPodia,
                meanExtension,
                meanSuction,
                meanTraction,
                totalRupturedPodia,
                meanWVI,
                regimeWVI,
                colorWVI,
                meanPTI,
                regimePTI,
                colorPTI,
                tick: (tick || 0)
            };
        }

        /**
         * Update laboratory HUD telemetry elements with 83rd and 84th channel values.
         * @param {Object} metrics - Calculated echinoderm telemetry metrics.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 83: % WVI Index Indicator
            const valWVIIndexEl = document.getElementById("valWVIIndex");
            if (valWVIIndexEl) {
                valWVIIndexEl.textContent = metrics.meanWVI.toFixed(1) + "% WVI (" + metrics.regimeWVI + ")";
                valWVIIndexEl.style.color = metrics.colorWVI;
            }

            // Echinoderm Hydraulic Pressure & Podia Traction Status Indicator
            const valWVIStatusEl = document.getElementById("valWVIStatus");
            if (valWVIStatusEl) {
                valWVIStatusEl.textContent =
                    "ECHINODERMS: " + metrics.echinodermCount + "/" + metrics.liveCount +
                    " | PRESSURE: " + metrics.meanPressure.toFixed(1) + " kPa" +
                    " | PODIA: " + metrics.meanPodia.toFixed(0) +
                    " | SUCTION: " + metrics.meanSuction.toFixed(2) + " N" +
                    " | TRACTION: " + metrics.meanTraction.toFixed(2);
                valWVIStatusEl.style.color = metrics.meanWVI >= 50.0 ? "#7dd3fc" : "#fde047";
            }

            // Channel 84: % PTI Index Indicator
            const valPTIIndexEl = document.getElementById("valPTIIndex");
            if (valPTIIndexEl) {
                valPTIIndexEl.textContent = metrics.meanPTI.toFixed(1) + "% PTI (" + metrics.regimePTI + ")";
                valPTIIndexEl.style.color = metrics.colorPTI;
            }

            // Podial Traction & Mechanical Adhesion Status Indicator
            const valPTIStatusEl = document.getElementById("valPTIStatus");
            if (valPTIStatusEl) {
                valPTIStatusEl.textContent =
                    "TRACTION: " + metrics.meanTraction.toFixed(2) + " N" +
                    " | EXTENSION: " + metrics.meanExtension.toFixed(1) + " px" +
                    " | RUPTURED PODIA: " + metrics.totalRupturedPodia +
                    " | PRYING EVENTS: " + metrics.pryingEvents +
                    " | FOULING: " + (metrics.meanFouling * 100.0).toFixed(1) + "%";
                valPTIStatusEl.style.color = metrics.meanPTI >= 50.0 ? "#fcd34d" : "#fbbf24";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.waterVascularIndex) {
                const chartValWVI = Number.isFinite(metrics.meanWVI) ?
                    Math.max(0, Math.min(100, metrics.meanWVI)) : 0;
                historyData.waterVascularIndex.shift();
                historyData.waterVascularIndex.push(chartValWVI);
            }
            if (historyData.podialTractionIndex) {
                const chartValPTI = Number.isFinite(metrics.meanPTI) ?
                    Math.max(0, Math.min(100, metrics.meanPTI)) : 0;
                historyData.podialTractionIndex.shift();
                historyData.podialTractionIndex.push(chartValPTI);
            }
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} echinodermManager - Global EchinodermWaterVascularManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, echinodermManager, tick) {
            const metrics = EchinodermTelemetryManager.calculateMetrics(organisms, echinodermManager, tick);
            EchinodermTelemetryManager.updateHUD(metrics);
            EchinodermTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Render compact WVI telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getWVIBadgeHTML(metrics) {
            const color = metrics ? metrics.colorWVI : "#0284c7";
            const val = metrics ? metrics.meanWVI.toFixed(1) : "0.0";
            return '<span class="wvi-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% WVI</span>';
        }

        /**
         * Render compact PTI telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getPTIBadgeHTML(metrics) {
            const color = metrics ? metrics.colorPTI : "#f59e0b";
            const val = metrics ? metrics.meanPTI.toFixed(1) : "0.0";
            return '<span class="pti-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% PTI</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EchinodermTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.EchinodermTelemetryManager = EchinodermTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
