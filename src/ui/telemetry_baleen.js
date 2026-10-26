// BioEcosystem - Trophic Volume Capacity & Megafauna Biomass Telemetry (Channels 65 & 66)
// Module: src/ui/telemetry_baleen.js
// Version: 6.28.0 (Hour 348 - UI Agent: 66th Telemetry Channel % MBE & Megafauna HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BaleenTelemetryManager
     * High-precision telemetry tracking for trophic volume capacity and megafaunal biomass:
     * - Audits microscopic baleen plate coverage, siliary comb density, and hydrodynamic filtration flux
     * - Drives Channel 65: Trophic Volume Capacity (% TVC) on Lotka-Volterra chart
     * - Drives Channel 66: Megafauna Biomass Efficiency (% MBE) on Lotka-Volterra chart
     * - Tracks lipid blubber reserves, coordinated pod drafting synergy, and exudate recycling
     * - Manages live laboratory HUD indicators, dual-channel chart recording, and diagnostic logging
     */
    class BaleenTelemetryManager {
        /**
         * Calculate baleen filtration (% TVC) and megafaunal biomass (% MBE) telemetry metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} filterBaleenManager - Active baleen manager instance.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive baleen and megafauna telemetry snapshot.
         */
        static calculateMetrics(organisms, filterBaleenManager, tick) {
            let liveCount = 0;
            let baleenCount = 0;
            let podCount = 0;
            let totalPlates = 0.0;
            let totalFlux = 0.0;
            let totalScale = 0.0;
            let totalBlubber = 0.0;
            let totalSifted = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const plates = org.baleenFilterPlates || 0.0;
                    if (plates >= 0.2) {
                        baleenCount++;
                        totalPlates += plates;
                        totalFlux += (org.filtrationVolumeFlux || 0.0);
                    }
                    if (org.podSynergyActive) podCount++;
                    totalScale += (org.megafaunaScaleRatio || 1.0);
                    totalBlubber += (org.blubberEnergyReserve || 0.0);
                    totalSifted += (org.filteredParticleCount || 0);
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanPlates = baleenCount > 0 ? (totalPlates / baleenCount) : 0.0;
            const meanFlux = baleenCount > 0 ? (totalFlux / baleenCount) : 0.0;
            const meanScale = liveCount > 0 ? (totalScale / liveCount) : 1.0;
            const meanBlubber = liveCount > 0 ? (totalBlubber / liveCount) : 0.0;
            const prevalenceRatio = liveCount > 0 ? (baleenCount / liveCount) * 100.0 : 0.0;
            const podPrevalence = liveCount > 0 ? (podCount / liveCount) * 100.0 : 0.0;

            const managerMetrics = (filterBaleenManager && typeof filterBaleenManager.getMetrics === "function")
                ? filterBaleenManager.getMetrics()
                : null;

            const cumulativeFiltered = managerMetrics
                ? (managerMetrics.cumulativeFilteredParticles || totalSifted)
                : totalSifted;
            const cumulativeExudates = managerMetrics
                ? (managerMetrics.cumulativeExudates || 0)
                : 0;

            // 65th Channel: Trophic Volume Capacity (% TVC)
            const fluxScore = Math.min(40.0, (meanFlux / 0.40) * 40.0);
            const plateScore = Math.min(20.0, (meanPlates / 6.5) * 20.0);
            const prevScore = Math.min(15.0, (prevalenceRatio / 45.0) * 15.0);
            const scaleScore = Math.min(15.0, (Math.max(0.0, meanScale - 1.0) / 0.50) * 15.0);
            const yieldScore = Math.min(10.0, (cumulativeFiltered / 25.0) * 10.0);

            const rawTVC = liveCount > 0 ? (fluxScore + plateScore + prevScore + scaleScore + yieldScore) : 0.0;
            const meanTVC = Number.isFinite(rawTVC) ? Math.max(0.0, Math.min(100.0, rawTVC)) : 0.0;

            let tvcRegime = "INCIPIENT CILIARY SIFTING";
            let tvcColor = "#64748b";
            if (meanTVC >= 75.0) {
                tvcRegime = "OPTIMAL PELAGIC MEGAFAUNA CANOPY";
                tvcColor = "#fef08a";
            } else if (meanTVC >= 50.0) {
                tvcRegime = "HYDRODYNAMIC VOLUME ENGULFMENT";
                tvcColor = "#fbbf24";
            } else if (meanTVC >= 20.0) {
                tvcRegime = "MODERATE BALEEN RECRUITMENT";
                tvcColor = "#f59e0b";
            }

            // 66th Channel: Megafauna Biomass Efficiency (% MBE)
            // 1. Megafaunal Biomass Dominance & Scale (40% max)
            const mbeScaleScore = Math.min(40.0, (Math.max(0.0, meanScale - 1.0) / 0.45) * 40.0);
            // 2. Lipid Blubber Energy Buffer (30% max)
            const mbeBlubberScore = Math.min(30.0, (meanBlubber / 35.0) * 30.0);
            // 3. Coordinated Pod Drafting & Trophic Stability (30% max)
            const mbePodScore = Math.min(20.0, (podPrevalence / 30.0) * 20.0) + Math.min(10.0, (cumulativeExudates / 12.0) * 10.0);

            const rawMBE = liveCount > 0 ? (mbeScaleScore + mbeBlubberScore + mbePodScore) : 0.0;
            const meanMBE = Number.isFinite(rawMBE) ? Math.max(0.0, Math.min(100.0, rawMBE)) : 0.0;

            let mbeRegime = "SOLITARY DISPERSED PLANKTER";
            let mbeColor = "#64748b";
            if (meanMBE >= 75.0) {
                mbeRegime = "APEX MEGAFAUNA BIOMASS HARVEST";
                mbeColor = "#6ee7b7";
            } else if (meanMBE >= 50.0) {
                mbeRegime = "COORDINATED PELAGIC POD";
                mbeColor = "#34d399";
            } else if (meanMBE >= 20.0) {
                mbeRegime = "INCIPIENT MEGAFAUNAL RECRUITMENT";
                mbeColor = "#10b981";
            }

            return {
                liveCount,
                baleenCount,
                podCount,
                baleenPrevalenceRatio: Number(prevalenceRatio.toFixed(1)),
                meanPlates: Number(meanPlates.toFixed(2)),
                meanFlux: Number(meanFlux.toFixed(3)),
                meanScale: Number(meanScale.toFixed(3)),
                meanBlubber: Number(meanBlubber.toFixed(2)),
                cumulativeFiltered,
                cumulativeExudates,
                meanTVC: Number(meanTVC.toFixed(1)),
                tvcRegime,
                tvcColor,
                meanMBE: Number(meanMBE.toFixed(1)),
                mbeRegime,
                mbeColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for Channels 65 (% TVC) and 66 (% MBE).
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // 65th Channel (% TVC)
            const valTVCIndexEl = document.getElementById("valTVCIndex");
            const valTVCStatusEl = document.getElementById("valTVCStatus");
            if (valTVCIndexEl) {
                valTVCIndexEl.textContent = metrics.meanTVC.toFixed(1) + "% TVC (" + metrics.tvcRegime + ")";
                valTVCIndexEl.style.color = metrics.tvcColor;
            }
            if (valTVCStatusEl) {
                valTVCStatusEl.textContent = "FILTERS: " + metrics.baleenCount + "/" + metrics.liveCount +
                    " | PLATES: " + metrics.meanPlates.toFixed(1) + "/cell" +
                    " | FLUX: " + metrics.meanFlux.toFixed(2) +
                    " | SIFTED: " + metrics.cumulativeFiltered;
                valTVCStatusEl.style.color = metrics.meanTVC >= 50.0 ? "#fbbf24" : "#f59e0b";
            }

            // 66th Channel (% MBE)
            const valMBEIndexEl = document.getElementById("valMBEIndex");
            const valMBEStatusEl = document.getElementById("valMBEStatus");
            if (valMBEIndexEl) {
                valMBEIndexEl.textContent = metrics.meanMBE.toFixed(1) + "% MBE (" + metrics.mbeRegime + ")";
                valMBEIndexEl.style.color = metrics.mbeColor;
            }
            if (valMBEStatusEl) {
                valMBEStatusEl.textContent = "SCALE: " + metrics.meanScale.toFixed(2) + "x" +
                    " | BLUBBER: " + metrics.meanBlubber.toFixed(1) +
                    " | PODS: " + metrics.podCount +
                    " | EXUDATE: " + metrics.cumulativeExudates;
                valMBEStatusEl.style.color = metrics.meanMBE >= 50.0 ? "#34d399" : "#10b981";
            }
        }

        /**
         * Push new data points to Channels 65 and 66 history curves on population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.trophicVolumeCapacity) {
                const chartTVC = Number.isFinite(metrics.meanTVC) ? Math.max(0, Math.min(100, metrics.meanTVC)) : 0;
                historyData.trophicVolumeCapacity.shift();
                historyData.trophicVolumeCapacity.push(chartTVC);
            }

            if (historyData.megafaunaBiomassEfficiency) {
                const chartMBE = Number.isFinite(metrics.meanMBE) ? Math.max(0, Math.min(100, metrics.meanMBE)) : 0;
                historyData.megafaunaBiomassEfficiency.shift();
                historyData.megafaunaBiomassEfficiency.push(chartMBE);
            }
        }

        /**
         * Execute full telemetry cycle step for trophic volume capacity (% TVC) and megafauna (% MBE).
         * @param {Array<Object>} organisms - Living simulation organisms.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} filterBaleenManager - Active baleen manager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, filterBaleenManager, tick) {
            const metrics = BaleenTelemetryManager.calculateMetrics(organisms, filterBaleenManager, tick);
            BaleenTelemetryManager.updateHUD(metrics);
            BaleenTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badges HTML for dynamic inspector rendering.
         * @param {Object} metrics - Current telemetry state.
         * @returns {string} Safe HTML badge representations.
         */
        static getTVCBadgeHTML(metrics) {
            const tvcColor = metrics ? metrics.tvcColor : "#f59e0b";
            const tvcVal = metrics ? metrics.meanTVC.toFixed(1) : "0.0";
            return '<span class="tvc-badge" style="color:' + tvcColor + '; border-color:' + tvcColor + ';">' + tvcVal + '% TVC</span>';
        }

        static getMBEBadgeHTML(metrics) {
            const mbeColor = metrics ? metrics.mbeColor : "#10b981";
            const mbeVal = metrics ? metrics.meanMBE.toFixed(1) : "0.0";
            return '<span class="mbe-badge" style="color:' + mbeColor + '; border-color:' + mbeColor + ';">' + mbeVal + '% MBE</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites and headless benchmarks.
         * @param {Object} metrics - Current telemetry state.
         * @returns {string} Human-readable diagnostic log.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "TVC: 0.0% | MBE: 0.0% (NO DATA)";
            return "TVC: " + metrics.meanTVC + "% [" + metrics.tvcRegime + "] | MBE: " + metrics.meanMBE + "% [" + metrics.mbeRegime + "] | Scale: " + metrics.meanScale + "x | Blubber: " + metrics.meanBlubber;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BaleenTelemetryManager;
    } else {
        global.BaleenTelemetryManager = BaleenTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
