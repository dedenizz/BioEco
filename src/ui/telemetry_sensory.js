// BioEcosystem - Sensory Telemetry & 37th Channel Manager
// Module: src/ui/telemetry_sensory.js
// Version: 4.84.0 (Hour 204 - UI Agent 37th Channel Sensory Integration Index)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class SensoryTelemetryManager {
        // Compute dish-wide sensory integration metrics across all live organisms
        static calculateMetrics(organisms) {
            let totalSII = 0;
            let totalStability = 0;
            let totalAtpBonus = 0;
            let statocystCount = 0;
            let rhopaliaCount = 0;
            let ocelliCount = 0;
            let liveCount = 0;

            if (organisms && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const dna = o.dna || {};
                    const statDensity = typeof dna.statocystSensoryDensity === "number" ? dna.statocystSensoryDensity : 0.0;
                    const rhopCadence = typeof dna.rhopaliaEquilibriumCadence === "number" ? dna.rhopaliaEquilibriumCadence : 0.0;
                    const ocelliSens = typeof dna.ocelliPhototaxisSensitivity === "number" ? dna.ocelliPhototaxisSensitivity : 0.0;

                    if (o.hasStatocysts || statDensity >= 0.20) statocystCount++;
                    if (o.hasRhopalia || rhopCadence >= 0.22) rhopaliaCount++;
                    if (ocelliSens >= 0.15) ocelliCount++;

                    const stab = typeof o.equilibriumStability === "number" ? o.equilibriumStability : 0.5;
                    const atp = typeof o.energyConservationBonus === "number" ? o.energyConservationBonus : 0.0;

                    totalStability += stab;
                    totalAtpBonus += atp;

                    // Sensorimotor Integration Index (SII): statocyst + rhopalia stability + ocelli sensitivity
                    const statScore = Math.min(1.0, statDensity / 1.2) * 0.35;
                    const stabScore = Math.min(1.0, stab) * 0.35;
                    const ocelliScore = Math.min(1.0, ocelliSens / 1.0) * 0.30;
                    const orgSII = (statScore + stabScore + ocelliScore) * 100.0;
                    totalSII += orgSII;
                }
            }

            const meanSII = liveCount > 0 ? totalSII / liveCount : 0.0;
            const meanStability = liveCount > 0 ? (totalStability / liveCount) * 100.0 : 50.0;
            const meanAtpBonus = liveCount > 0 ? (totalAtpBonus / liveCount) * 100.0 : 0.0;

            let regime = "LATENT / PRIMORDIAL";
            let color = "#94a3b8";

            if (meanSII >= 60.0) {
                regime = "FULL SENSORIMOTOR HOMEOSTASIS";
                color = "#818cf8";
            } else if (meanSII >= 35.0) {
                regime = "DIRECTIONAL GEOTAXIS ACTIVE";
                color = "#38bdf8";
            } else if (meanSII >= 15.0) {
                regime = "INCIPIENT SENSORY AWAKENING";
                color = "#facc15";
            }

            return {
                liveCount: liveCount,
                meanSII: Number(meanSII.toFixed(1)),
                meanStability: Number(meanStability.toFixed(1)),
                meanAtpBonus: Number(meanAtpBonus.toFixed(1)),
                statocystCount: statocystCount,
                rhopaliaCount: rhopaliaCount,
                ocelliCount: ocelliCount,
                regime: regime,
                color: color
            };
        }

        // Update laboratory HUD telemetry indicators
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;
            const valSensoryIndexEl = document.getElementById("valSensoryIndex");
            const valSensoryBalanceEl = document.getElementById("valSensoryBalance");

            if (valSensoryIndexEl) {
                valSensoryIndexEl.textContent = metrics.meanSII.toFixed(1) + "% SII (" + metrics.regime + ")";
                valSensoryIndexEl.style.color = metrics.color;
            }

            if (valSensoryBalanceEl) {
                valSensoryBalanceEl.textContent = metrics.meanStability.toFixed(1) + "% STAB | +" + metrics.meanAtpBonus.toFixed(1) + "% ATP";
                valSensoryBalanceEl.style.color = metrics.meanStability > 70 ? "#38bdf8" : "#94a3b8";
            }
        }

        // Push new data point to 37th telemetry channel history curve
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.sensoryIntegrationIndex) return;

            // Chart scaling: 100% SII maps to chart value 100
            const chartVal = Number.isFinite(metrics.meanSII) ? Math.max(0, Math.min(100, metrics.meanSII)) : 0;
            historyData.sensoryIntegrationIndex.shift();
            historyData.sensoryIntegrationIndex.push(chartVal);
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData) {
            const metrics = SensoryTelemetryManager.calculateMetrics(organisms);
            SensoryTelemetryManager.updateHUD(metrics);
            SensoryTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SensoryTelemetryManager;
    } else {
        global.SensoryTelemetryManager = SensoryTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
