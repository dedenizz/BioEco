// BioEcosystem - Biogenic Calcification & Shell Hardness Telemetry (Channels 63 & 64)
// Module: src/ui/telemetry_calcification.js
// Version: 6.18.0 (Hour 338 - UI Agent: 64th Channel % SHM & Shell Hardness Matrix HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CalcificationTelemetryManager
     * High-precision telemetry tracking for biogenic calcification and shell hardness:
     * - Audits cellular calcification prevalence, plate maturity, and shell hardness
     * - Drives Channel 63: Biogenic Calcification Ratio (% CAL)
     * - Drives Channel 64: Shell Hardness Matrix (% SHM) on Lotka-Volterra chart
     * - Monitors porous honeycomb lattice lightness, fracture absorption, and chalk accretion
     * - Manages live HUD indicators, dual-channel chart recording, and diagnostic logging
     */
    class CalcificationTelemetryManager {
        /**
         * Calculate biogenic calcification (% CAL) and shell hardness (% SHM) telemetry metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} calcificationPlateManager - Active calcification manager instance.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive calcification and hardness telemetry snapshot.
         */
        static calculateMetrics(organisms, calcificationPlateManager, tick) {
            let liveCount = 0;
            let calcifiedCount = 0;
            let totalPlates = 0.0;
            let totalHardness = 0.0;
            let totalPorous = 0.0;
            let totalDeflections = 0;
            let totalFractures = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const plates = org.coccolithPlates || 0.0;
                    if (plates >= 0.08) {
                        calcifiedCount++;
                        totalPlates += plates;
                        totalHardness += (org.shellHardness || 0.0);
                        totalPorous += (org.porousLatticeRatio || 0.55);
                    }
                    totalDeflections += (org.deflectionCount || 0);
                    if ((org.fractureCracks || 0) > 0.05) totalFractures++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanPlates = calcifiedCount > 0 ? (totalPlates / calcifiedCount) : 0.0;
            const meanHardness = calcifiedCount > 0 ? (totalHardness / calcifiedCount) : 0.0;
            const meanPorous = calcifiedCount > 0 ? (totalPorous / calcifiedCount) : 0.55;

            const managerMetrics = (calcificationPlateManager && typeof calcificationPlateManager.getMetrics === "function")
                ? calcificationPlateManager.getMetrics()
                : null;

            const chalkPool = managerMetrics ? (managerMetrics.chalkDepositionPool || 35.0) : 35.0;
            const chalkFlux = managerMetrics ? (managerMetrics.chalkDepositionFlux || 0.0) : 0.0;
            const cumulativeDeflections = managerMetrics ? (managerMetrics.cumulativeDeflections || totalDeflections) : totalDeflections;
            const cumulativeFractures = managerMetrics ? (managerMetrics.cumulativeFractures || totalFractures) : totalFractures;

            // 63rd Channel: Biogenic Calcification Ratio (% CAL)
            const prevalenceScore = Math.min(40.0, ((calcifiedCount * 3.5) / targetTotal) * 40.0);
            const maturityScore = Math.min(20.0, (meanPlates / 6.0) * 20.0) + Math.min(15.0, meanHardness * 25.0);
            const accretionScore = Math.min(15.0, (chalkPool / 100.0) * 15.0) + Math.min(10.0, (cumulativeDeflections * 2.0) + (calcifiedCount > 10 ? 5.0 : 1.0));
            const rawCAL = liveCount > 0 ? (prevalenceScore + maturityScore + accretionScore) : 0.0;
            const meanCAL = Number.isFinite(rawCAL) ? Math.max(0.0, Math.min(100.0, rawCAL)) : 0.0;

            let calRegime = "UNARMORED MEMBRANOUS DIATHE";
            let calColor = "#64748b";
            if (meanCAL >= 75.0) {
                calRegime = "OPTIMAL CRETACEOUS CHALK CRUST";
                calColor = "#f8fafc";
            } else if (meanCAL >= 50.0) {
                calRegime = "CALCIFIED BIOMINERAL SHIELD";
                calColor = "#e2e8f0";
            } else if (meanCAL >= 25.0) {
                calRegime = "INCIPIENT COCCOLITH ACCRETION";
                calColor = "#cbd5e1";
            }

            // 64th Channel: Shell Hardness Matrix (% SHM)
            // 1. Structural Hardness & Armor Plate Density (40% max)
            const shmHardnessScore = Math.min(25.0, meanHardness * 35.0) + Math.min(15.0, (meanPlates / 6.5) * 15.0);
            // 2. Porous Lattice Lightness & Hydrodynamic Efficiency (30% max)
            const shmPorousScore = Math.min(30.0, (meanPorous / 0.85) * 30.0);
            // 3. Kinetic Shock Dissipation & Deflection Resilience (30% max)
            const shmResilienceScore = Math.min(30.0, (cumulativeDeflections * 1.6) + (cumulativeFractures * 1.4) + (calcifiedCount > 8 ? 8.0 : 1.5));

            const rawSHM = liveCount > 0 ? (shmHardnessScore + shmPorousScore + shmResilienceScore) : 0.0;
            const meanSHM = Number.isFinite(rawSHM) ? Math.max(0.0, Math.min(100.0, rawSHM)) : 0.0;

            let shmRegime = "UNMINERALIZED SOFT CRUST";
            let shmColor = "#64748b";
            if (meanSHM >= 75.0) {
                shmRegime = "OPTIMAL RESILIENT CALCITE MATRIX";
                shmColor = "#bae6fd";
            } else if (meanSHM >= 50.0) {
                shmRegime = "HARDENED POROUS SHIELD";
                shmColor = "#38bdf8";
            } else if (meanSHM >= 25.0) {
                shmRegime = "INCIPIENT BRITTLE ACCRETION";
                shmColor = "#94a3b8";
            }

            return {
                liveCount,
                calcifiedCount,
                calcificationRatio: liveCount > 0 ? Number(((calcifiedCount / liveCount) * 100.0).toFixed(1)) : 0.0,
                meanPlates: Number(meanPlates.toFixed(2)),
                meanHardness: Number(meanHardness.toFixed(3)),
                meanPorous: Number(meanPorous.toFixed(3)),
                chalkPool: Number(chalkPool.toFixed(1)),
                chalkFlux: Number(chalkFlux.toFixed(4)),
                deflections: cumulativeDeflections,
                fractures: cumulativeFractures,
                meanCAL: Number(meanCAL.toFixed(1)),
                calRegime,
                calColor,
                meanSHM: Number(meanSHM.toFixed(1)),
                shmRegime,
                shmColor
            };
        }

        /**
         * Update laboratory HUD indicators for Channels 63 (% CAL) and 64 (% SHM).
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // 63rd Channel (% CAL)
            const valCALIndexEl = document.getElementById("valCALIndex");
            const valCALStatusEl = document.getElementById("valCALStatus");
            if (valCALIndexEl) {
                valCALIndexEl.textContent = metrics.meanCAL.toFixed(1) + "% CAL (" + metrics.calRegime + ")";
                valCALIndexEl.style.color = metrics.calColor;
            }
            if (valCALStatusEl) {
                valCALStatusEl.textContent = "ARMORED: " + metrics.calcifiedCount + "/" + metrics.liveCount +
                    " | PLATES: " + metrics.meanPlates.toFixed(1) + "/cell" +
                    " | HARDNESS: " + metrics.meanHardness.toFixed(2) +
                    " | CHALK: " + Math.round(metrics.chalkPool) + " uM" +
                    " | DEFLECT: " + metrics.deflections;
                valCALStatusEl.style.color = metrics.meanCAL >= 50.0 ? "#f8fafc" : "#cbd5e1";
            }

            // 64th Channel (% SHM)
            const valSHMIndexEl = document.getElementById("valSHMIndex");
            const valSHMStatusEl = document.getElementById("valSHMStatus");
            if (valSHMIndexEl) {
                valSHMIndexEl.textContent = metrics.meanSHM.toFixed(1) + "% SHM (" + metrics.shmRegime + ")";
                valSHMIndexEl.style.color = metrics.shmColor;
            }
            if (valSHMStatusEl) {
                valSHMStatusEl.textContent = "LATTICE: " + metrics.meanPorous.toFixed(2) +
                    " | HARDNESS: " + metrics.meanHardness.toFixed(3) +
                    " | FRACTURES: " + metrics.fractures +
                    " | DEFLECT: " + metrics.deflections;
                valSHMStatusEl.style.color = metrics.meanSHM >= 50.0 ? "#bae6fd" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channels 63 and 64 history curves on population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.calcificationRatio) {
                const chartCAL = Number.isFinite(metrics.meanCAL) ? Math.max(0, Math.min(100, metrics.meanCAL)) : 0;
                historyData.calcificationRatio.shift();
                historyData.calcificationRatio.push(chartCAL);
            }

            if (historyData.shellHardnessMatrix) {
                const chartSHM = Number.isFinite(metrics.meanSHM) ? Math.max(0, Math.min(100, metrics.meanSHM)) : 0;
                historyData.shellHardnessMatrix.shift();
                historyData.shellHardnessMatrix.push(chartSHM);
            }
        }

        /**
         * Execute full telemetry cycle step for calcification (% CAL) and shell hardness (% SHM).
         * @param {Array<Object>} organisms - Living simulation organisms.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} calcificationPlateManager - Active calcification manager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, calcificationPlateManager, tick) {
            const metrics = CalcificationTelemetryManager.calculateMetrics(organisms, calcificationPlateManager, tick);
            CalcificationTelemetryManager.updateHUD(metrics);
            CalcificationTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badges HTML for dynamic inspector rendering.
         * @param {Object} metrics - Current telemetry state.
         * @returns {string} Safe HTML badge representations.
         */
        static getCALBadgeHTML(metrics) {
            const calColor = metrics ? metrics.calColor : "#f8fafc";
            const calVal = metrics ? metrics.meanCAL.toFixed(1) : "0.0";
            return '<span class="cal-badge" style="color:' + calColor + '; border-color:' + calColor + ';">' + calVal + '% CAL</span>';
        }

        static getSHMBadgeHTML(metrics) {
            const shmColor = metrics ? metrics.shmColor : "#38bdf8";
            const shmVal = metrics ? metrics.meanSHM.toFixed(1) : "0.0";
            return '<span class="shm-badge" style="color:' + shmColor + '; border-color:' + shmColor + ';">' + shmVal + '% SHM</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites and headless benchmarks.
         * @param {Object} metrics - Current telemetry state.
         * @returns {string} Human-readable diagnostic log.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "CAL: 0.0% | SHM: 0.0% (NO DATA)";
            return "CAL: " + metrics.meanCAL + "% [" + metrics.calRegime + "] | SHM: " + metrics.meanSHM + "% [" + metrics.shmRegime + "] | Lattice: " + metrics.meanPorous + " | Fractures: " + metrics.fractures;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CalcificationTelemetryManager;
    } else {
        global.CalcificationTelemetryManager = CalcificationTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
