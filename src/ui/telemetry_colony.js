// BioEcosystem - Colony Integration & Social Swarm Telemetry Manager (Channel 41)
// Module: src/ui/telemetry_colony.js
// Version: 5.37.0 (Hour 257 - Modular Standardization & Social Swarm Telemetry)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ColonyTelemetryManager
     * High-precision telemetry auditing for colonial aggregations and social swarms:
     * - Audits individual social cohesion scores and flocking vector alignment
     * - Quantifies active chemical pheromone trail detection and hydrodynamic drag discounts
     * - Drives the 41st Telemetry Channel: Colony Integration Index (% CII) on Lotka-Volterra chart
     * - Manages live HUD indicators and demographic caste status displays
     */
    class ColonyTelemetryManager {
        // Compute dish-wide social flocking, trail tracking and colonial cohesion metrics
        static calculateMetrics(organisms, pheromonePool) {
            let totalCII = 0;
            let totalCohesion = 0;
            let schoolingCount = 0;
            let discountedCount = 0;
            let liveCount = 0;

            if (organisms && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const cohesion = typeof o.socialCohesion === "number" ? o.socialCohesion : 0.0;
                    const trails = typeof o.activeTrailCount === "number" ? o.activeTrailCount : 0;
                    const isDiscounted = typeof o.metabolicDragDiscount === "number" && o.metabolicDragDiscount < 0.99;

                    if (cohesion >= 0.40) schoolingCount++;
                    if (isDiscounted) discountedCount++;
                    totalCohesion += cohesion;

                    // Colony Integration Index (CII - Channel 41)
                    // Combines social cohesion score (40%) + chemical trail perception (35%) + hydrodynamic drag savings (25%)
                    const cohScore = Math.min(1.0, Math.max(0.0, cohesion)) * 0.40;
                    const trailScore = Math.min(1.0, Math.max(0, trails) / 4.0) * 0.35;
                    const dragScore = isDiscounted ? 0.25 : 0.0;
                    const orgCII = (cohScore + trailScore + dragScore) * 100.0;

                    totalCII += orgCII;
                }
            }

            const meanCII = liveCount > 0 ? totalCII / liveCount : 0.0;
            const meanCohesion = liveCount > 0 ? (totalCohesion / liveCount) * 100.0 : 0.0;
            const dragSavingsPercent = liveCount > 0 ? (discountedCount / liveCount) * 12.0 : 0.0;

            // Resolve chemical trail density from pool
            let trailDensity = 0;
            if (Array.isArray(pheromonePool)) {
                trailDensity = pheromonePool.length;
            } else if (typeof global !== "undefined" && Array.isArray(global.pheromonePool)) {
                trailDensity = global.pheromonePool.length;
            } else if (typeof window !== "undefined" && Array.isArray(window.pheromonePool)) {
                trailDensity = window.pheromonePool.length;
            }

            // Regime classification for CII (Channel 41)
            let ciiRegime = "SOLITARY / SCATTERED";
            let ciiColor = "#94a3b8";

            if (meanCII >= 60.0) {
                ciiRegime = "EUSOCIAL SWARM CLUSTER";
                ciiColor = "#a855f7";
            } else if (meanCII >= 35.0) {
                ciiRegime = "COHESIVE SCHOOLING";
                ciiColor = "#c084fc";
            } else if (meanCII >= 15.0) {
                ciiRegime = "INCIPIENT AGGREGATION";
                ciiColor = "#38bdf8";
            }

            return {
                liveCount: liveCount,
                meanCII: Number(meanCII.toFixed(1)),
                meanCohesion: Number(meanCohesion.toFixed(1)),
                schoolingCount: schoolingCount,
                discountedCount: discountedCount,
                dragSavingsPercent: Number(dragSavingsPercent.toFixed(1)),
                trailDensity: trailDensity,
                ciiRegime: ciiRegime,
                ciiColor: ciiColor
            };
        }

        // Generate summary breakdown string for telemetry logging and console diagnostics
        static formatTelemetryString(metrics) {
            if (!metrics) return "CII: 0.0% (INACTIVE)";
            return `CII: ${metrics.meanCII}% [${metrics.ciiRegime}] | Schooling: ${metrics.schoolingCount}/${metrics.liveCount} | Trails: ${metrics.trailDensity}`;
        }

        // Calculate demographic distribution of colonial individuals vs solitary roamers
        static getDemographicBreakdown(organisms) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                return { colonialCount: 0, solitaryCount: 0, colonialRatio: 0.0 };
            }
            let colonialCount = 0;
            let solitaryCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;
                if (o.isColonial || (typeof o.socialCohesion === "number" && o.socialCohesion >= 0.40)) {
                    colonialCount++;
                } else {
                    solitaryCount++;
                }
            }
            const total = colonialCount + solitaryCount;
            const ratio = total > 0 ? Number((colonialCount / total).toFixed(3)) : 0.0;
            return { colonialCount, solitaryCount, colonialRatio: ratio };
        }

        // Update laboratory HUD telemetry indicators
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valColonyIndexEl = document.getElementById("valColonyIndex");
            const valSwarmDensityEl = document.getElementById("valSwarmDensity");

            if (valColonyIndexEl) {
                valColonyIndexEl.textContent = metrics.meanCII.toFixed(1) + "% CII (" + metrics.ciiRegime + ")";
                valColonyIndexEl.style.color = metrics.ciiColor;
            }

            if (valSwarmDensityEl) {
                valSwarmDensityEl.textContent = metrics.schoolingCount + " SCHOOLING | " + metrics.trailDensity + " TRAILS (-" + metrics.dragSavingsPercent.toFixed(1) + "% DRAG)";
                valSwarmDensityEl.style.color = metrics.schoolingCount > 0 ? "#a855f7" : "#94a3b8";
            }
        }

        // Push new data points to Channel 41 history curve
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.colonyIntegration) return;

            const chartVal = Number.isFinite(metrics.meanCII) ? Math.max(0, Math.min(100, metrics.meanCII)) : 0;
            historyData.colonyIntegration.shift();
            historyData.colonyIntegration.push(chartVal);
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData, pheromonePool) {
            const metrics = ColonyTelemetryManager.calculateMetrics(organisms, pheromonePool);
            ColonyTelemetryManager.updateHUD(metrics);
            ColonyTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ColonyTelemetryManager;
    } else {
        global.ColonyTelemetryManager = ColonyTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
