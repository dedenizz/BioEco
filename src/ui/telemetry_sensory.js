// BioEcosystem - Sensory & Phototactic Telemetry Manager (Channels 37 & 38)
// Module: src/ui/telemetry_sensory.js
// Version: 4.89.0 (Hour 209 - UI Agent 38th Channel Phototactic Flux & Bioluminescence HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class SensoryTelemetryManager {
        // Compute dish-wide sensory integration and phototactic flux metrics across all live organisms
        static calculateMetrics(organisms) {
            let totalSII = 0;
            let totalPFI = 0;
            let totalStability = 0;
            let totalAtpBonus = 0;
            let statocystCount = 0;
            let rhopaliaCount = 0;
            let ocelliCount = 0;
            let photophoreCount = 0;
            let flashingCount = 0;
            let totalLuredPrey = 0;
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
                    const bioLum = typeof dna.bioluminescenceLuminosity === "number" ? dna.bioluminescenceLuminosity : 0.0;
                    const currentLum = typeof o.currentLuminosity === "number" ? o.currentLuminosity : 0.0;
                    const luredPrey = typeof o.luredPreyCount === "number" ? o.luredPreyCount : 0;

                    if (o.hasStatocysts || statDensity >= 0.20) statocystCount++;
                    if (o.hasRhopalia || rhopCadence >= 0.22) rhopaliaCount++;
                    if (ocelliSens >= 0.15) ocelliCount++;
                    if (o.hasPhotophores || bioLum >= 0.18) photophoreCount++;
                    if (currentLum > 0.05) flashingCount++;
                    totalLuredPrey += luredPrey;

                    const stab = typeof o.equilibriumStability === "number" ? o.equilibriumStability : 0.5;
                    const atp = typeof o.energyConservationBonus === "number" ? o.energyConservationBonus : 0.0;

                    totalStability += stab;
                    totalAtpBonus += atp;

                    // 1. Sensorimotor Integration Index (SII - Channel 37)
                    const statScore = Math.min(1.0, statDensity / 1.2) * 0.35;
                    const stabScore = Math.min(1.0, stab) * 0.35;
                    const ocelliScore = Math.min(1.0, ocelliSens / 1.0) * 0.30;
                    const orgSII = (statScore + stabScore + ocelliScore) * 100.0;
                    totalSII += orgSII;

                    // 2. Phototactic Flux Index (PFI - Channel 38)
                    const lumScore = Math.min(1.0, currentLum / 1.2) * 0.40;
                    const lureScore = Math.min(1.0, luredPrey / 2.5) * 0.35;
                    const sensScore = Math.min(1.0, Math.abs(ocelliSens) / 1.0) * 0.25;
                    const orgPFI = (lumScore + lureScore + sensScore) * 100.0;
                    totalPFI += orgPFI;
                }
            }

            const meanSII = liveCount > 0 ? totalSII / liveCount : 0.0;
            const meanPFI = liveCount > 0 ? totalPFI / liveCount : 0.0;
            const meanStability = liveCount > 0 ? (totalStability / liveCount) * 100.0 : 50.0;
            const meanAtpBonus = liveCount > 0 ? (totalAtpBonus / liveCount) * 100.0 : 0.0;

            // Regime classification for SII (Channel 37)
            let siiRegime = "LATENT / PRIMORDIAL";
            let siiColor = "#94a3b8";
            if (meanSII >= 60.0) {
                siiRegime = "FULL SENSORIMOTOR HOMEOSTASIS";
                siiColor = "#818cf8";
            } else if (meanSII >= 35.0) {
                siiRegime = "DIRECTIONAL GEOTAXIS ACTIVE";
                siiColor = "#38bdf8";
            } else if (meanSII >= 15.0) {
                siiRegime = "INCIPIENT SENSORY AWAKENING";
                siiColor = "#facc15";
            }

            // Regime classification for PFI (Channel 38)
            let pfiRegime = "DARKNESS / APHOTIC";
            let pfiColor = "#94a3b8";
            if (meanPFI >= 55.0) {
                pfiRegime = "ACTIVE AGGRESSIVE MIMICRY";
                pfiColor = "#06b6d4";
            } else if (meanPFI >= 32.0) {
                pfiRegime = "NOCTURNAL PHOTOTAXIS";
                pfiColor = "#10b981";
            } else if (meanPFI >= 12.0) {
                pfiRegime = "INCIPIENT LUMINESCENCE";
                pfiColor = "#facc15";
            }

            return {
                liveCount: liveCount,
                meanSII: Number(meanSII.toFixed(1)),
                meanPFI: Number(meanPFI.toFixed(1)),
                meanStability: Number(meanStability.toFixed(1)),
                meanAtpBonus: Number(meanAtpBonus.toFixed(1)),
                statocystCount: statocystCount,
                rhopaliaCount: rhopaliaCount,
                ocelliCount: ocelliCount,
                photophoreCount: photophoreCount,
                flashingCount: flashingCount,
                totalLuredPrey: totalLuredPrey,
                siiRegime: siiRegime,
                siiColor: siiColor,
                pfiRegime: pfiRegime,
                pfiColor: pfiColor
            };
        }

        // Update laboratory HUD telemetry indicators
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            // 1. Channel 37 Indicators
            const valSensoryIndexEl = document.getElementById("valSensoryIndex");
            const valSensoryBalanceEl = document.getElementById("valSensoryBalance");

            if (valSensoryIndexEl) {
                valSensoryIndexEl.textContent = metrics.meanSII.toFixed(1) + "% SII (" + metrics.siiRegime + ")";
                valSensoryIndexEl.style.color = metrics.siiColor;
            }

            if (valSensoryBalanceEl) {
                valSensoryBalanceEl.textContent = metrics.meanStability.toFixed(1) + "% STAB | +" + metrics.meanAtpBonus.toFixed(1) + "% ATP";
                valSensoryBalanceEl.style.color = metrics.meanStability > 70 ? "#38bdf8" : "#94a3b8";
            }

            // 2. Channel 38 Indicators
            const valPhototacticFluxEl = document.getElementById("valPhototacticFlux");
            const valBiolumLureEl = document.getElementById("valBiolumLure");

            if (valPhototacticFluxEl) {
                valPhototacticFluxEl.textContent = metrics.meanPFI.toFixed(1) + "% PFI (" + metrics.pfiRegime + ")";
                valPhototacticFluxEl.style.color = metrics.pfiColor;
            }

            if (valBiolumLureEl) {
                valBiolumLureEl.textContent = metrics.flashingCount + " FLASHING | " + metrics.totalLuredPrey + " LURED PREY";
                valBiolumLureEl.style.color = metrics.flashingCount > 0 ? "#06b6d4" : "#94a3b8";
            }
        }

        // Push new data points to Channel 37 and Channel 38 history curves
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // Channel 37: SII
            if (historyData.sensoryIntegrationIndex) {
                const chartValSII = Number.isFinite(metrics.meanSII) ? Math.max(0, Math.min(100, metrics.meanSII)) : 0;
                historyData.sensoryIntegrationIndex.shift();
                historyData.sensoryIntegrationIndex.push(chartValSII);
            }

            // Channel 38: PFI
            if (historyData.phototacticFlux) {
                const chartValPFI = Number.isFinite(metrics.meanPFI) ? Math.max(0, Math.min(100, metrics.meanPFI)) : 0;
                historyData.phototacticFlux.shift();
                historyData.phototacticFlux.push(chartValPFI);
            }
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
