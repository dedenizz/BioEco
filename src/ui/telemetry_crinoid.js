// BioEcosystem - Calyx Elevation Advantage (% CEA) & Stalked Crinoid Telemetry
// Module: src/ui/telemetry_crinoid.js
// Version: 7.04.0 (Hour 424 - UI Agent: 81st Channel % CEA & Crinoid Column HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CrinoidTelemetryManager
     * High-precision telemetry tracking for articulated stalked crinoid echinoderms:
     * - Channel 81: Calyx Elevation Advantage (% CEA)
     * - Quantifies vertical crown elevation above benthic boundary layer shear (y: 360 - 430 px)
     * - Audits biomineralized calcite columnal stacking and physical stalk elongation
     * - Monitors mutable collagenous tissue (MCT) catch-collagen passive stiffening under flow shear
     * - Tracks holdfast cirri grip integrity counteracting hydrodynamic overturning torque
     * - Evaluates elevated laminar seston interception and enhanced carbon capture assimilation
     * - Renders laboratory HUD telemetry indicators, status badges, and circular history buffers
     */
    class CrinoidTelemetryManager {
        /**
         * Calculate dish-wide crinoid biomechanical metrics and calyx elevation advantage.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} crinoidManager - Global CrinoidStalkManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive crinoid telemetry metrics.
         */
        static calculateMetrics(organisms, crinoidManager, tick) {
            let liveCount = 0;
            let stalkedCount = 0;
            let activeFeederCount = 0;
            let lockedStalkCount = 0;
            let highClearanceCount = 0;

            let sumStalkHeight = 0.0;
            let maxStalkHeight = 0.0;
            let sumColumnalCount = 0;
            let sumCollagenStiffness = 0.0;
            let sumHoldfastGrip = 0.0;
            let sumDeflectionAngle = 0.0;
            let sumIndivCEA = 0.0;
            let sumIndivRAR = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const isStalked = org.isCrinoidStalked || (org.stalkHeight && org.stalkHeight > 5.0);
                    if (isStalked) {
                        stalkedCount++;

                        const height = org.stalkHeight || 0.0;
                        const columnals = org.calciteColumnalCount || 0;
                        const stiffness = org.mutableCollagenStiffness || 0.0;
                        const grip = org.holdfastCirriGrip || 0.0;
                        const deflection = Math.abs(org.stalkDeflectionAngle || 0.0);
                        const cea = org.calyxElevationAdvantage || 0.0;
                        const rar = org.rheophilicArticulationRatio || 0.0;

                        sumStalkHeight += height;
                        if (height > maxStalkHeight) maxStalkHeight = height;
                        sumColumnalCount += columnals;
                        sumCollagenStiffness += stiffness;
                        sumHoldfastGrip += grip;
                        sumDeflectionAngle += deflection;
                        sumIndivCEA += cea;
                        sumIndivRAR += rar;

                        if (org.isStalkLocked) lockedStalkCount++;
                        if (cea > 0.50) activeFeederCount++;
                        if (cea > 0.75) highClearanceCount++;
                    }
                }
            }

            const managerMetrics = (crinoidManager && typeof crinoidManager.getMetrics === "function") ?
                crinoidManager.getMetrics() : (crinoidManager ? crinoidManager.metrics : null);

            const stalkedPrevalence = liveCount > 0 ? (stalkedCount / liveCount) : 0.0;
            const activeFeederPrevalence = stalkedCount > 0 ? (activeFeederCount / stalkedCount) : 0.0;
            const meanStalkHeight = stalkedCount > 0 ? (sumStalkHeight / stalkedCount) : 0.0;
            const meanColumnalCount = stalkedCount > 0 ? (sumColumnalCount / stalkedCount) : 0.0;
            const meanCollagenStiffness = stalkedCount > 0 ? (sumCollagenStiffness / stalkedCount) : 0.0;
            const meanHoldfastGrip = stalkedCount > 0 ? (sumHoldfastGrip / stalkedCount) : 0.0;
            const meanDeflectionAngle = stalkedCount > 0 ? (sumDeflectionAngle / stalkedCount) : 0.0;
            const meanIndivRAR = stalkedCount > 0 ? (sumIndivRAR / stalkedCount) : 0.0;

            const assimilatedCarbon = managerMetrics ? managerMetrics.assimilatedHighVelocityCarbon : 0.0;
            const lockEvents = managerMetrics ? managerMetrics.stalkLockEvents : 0;
            const overturningIncidents = managerMetrics ? managerMetrics.overturningDeflections : 0;

            // Channel 81: % CEA (Calyx Elevation Advantage)
            const rawCEA = stalkedCount > 0 ? (sumIndivCEA / stalkedCount) : 0.0;
            const meanCEA = Math.max(0.0, Math.min(100.0, rawCEA * 100.0));

            let regimeCEA = "BASAL SILT SUFFOCATION & STALK COLLAPSE";
            let colorCEA = "#ef4444";
            if (meanCEA >= 75.0) {
                regimeCEA = "HIGH-STRATUM LAMINAR SESTON INTERCEPTION";
                colorCEA = "#eab308";
            } else if (meanCEA >= 50.0) {
                regimeCEA = "STABLE BOUNDARY-LAYER CLEARANCE";
                colorCEA = "#fde047";
            } else if (meanCEA >= 25.0) {
                regimeCEA = "PARTIAL OVERTURNING FLOW STRAIN";
                colorCEA = "#f59e0b";
            }

            return {
                liveCount,
                stalkedCount,
                stalkedPrevalence,
                activeFeederCount,
                activeFeederPrevalence,
                lockedStalkCount,
                highClearanceCount,
                meanStalkHeight,
                maxStalkHeight,
                meanColumnalCount,
                meanCollagenStiffness,
                meanHoldfastGrip,
                meanDeflectionAngle,
                meanIndivRAR,
                assimilatedCarbon,
                lockEvents,
                overturningIncidents,
                meanCEA,
                regimeCEA,
                colorCEA,
                tick: (tick || 0)
            };
        }

        /**
         * Update laboratory HUD telemetry elements with 81st channel values.
         * @param {Object} metrics - Calculated crinoid telemetry metrics.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 81: % CEA Index Indicator
            const valCEAIndexEl = document.getElementById("valCEAIndex");
            if (valCEAIndexEl) {
                valCEAIndexEl.textContent = metrics.meanCEA.toFixed(1) + "% CEA (" + metrics.regimeCEA + ")";
                valCEAIndexEl.style.color = metrics.colorCEA;
            }

            // Crinoid Column & Holdfast Stability Status Indicator
            const valCEAStatusEl = document.getElementById("valCEAStatus");
            if (valCEAStatusEl) {
                valCEAStatusEl.textContent =
                    "STALKED CELLS: " + metrics.stalkedCount + "/" + metrics.liveCount +
                    " | ACTIVE FEEDERS: " + metrics.activeFeederCount +
                    " | STALK HEIGHT: " + metrics.meanStalkHeight.toFixed(1) + " px" +
                    " | CIRRI GRIP: " + (metrics.meanHoldfastGrip * 100.0).toFixed(1) + "%" +
                    " | LOCKED STALKS: " + metrics.lockedStalkCount;
                valCEAStatusEl.style.color = metrics.meanCEA >= 50.0 ? "#fef08a" : "#fde047";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.calyxElevationAdvantage) {
                const chartValCEA = Number.isFinite(metrics.meanCEA) ?
                    Math.max(0, Math.min(100, metrics.meanCEA)) : 0;
                historyData.calyxElevationAdvantage.shift();
                historyData.calyxElevationAdvantage.push(chartValCEA);
            }
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} crinoidManager - Global CrinoidStalkManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, crinoidManager, tick) {
            const metrics = CrinoidTelemetryManager.calculateMetrics(organisms, crinoidManager, tick);
            CrinoidTelemetryManager.updateHUD(metrics);
            CrinoidTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Render compact telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getCEABadgeHTML(metrics) {
            const color = metrics ? metrics.colorCEA : "#eab308";
            const val = metrics ? metrics.meanCEA.toFixed(1) : "0.0";
            return '<span class="cea-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% CEA</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CrinoidTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.CrinoidTelemetryManager = CrinoidTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
