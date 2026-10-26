// BioEcosystem - Bioluminescent Emission Reliability (% BLE) & Photophore Catalytic Optimization (% PCO)
// Module: src/ui/telemetry_photophores.js
// Version: 6.68.0 (Hour 388 - UI Agent: 74th Channel % PCO & Dual-Channel Bioluminescence Telemetry)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PhotophoreTelemetryManager
     * High-precision telemetry tracking for deep-sea symbiotic bioluminescence:
     * - Channel 73: Bioluminescent Emission Reliability (% BLE)
     * - Channel 74: Photophore Catalytic Optimization (% PCO)
     * - Audits ventral photophore organ arrays, luciferase efficiency, and luciferin pools
     * - Tracks metabolic substrate recycling, thermal quenching factors, and retinal bleaching evasions
     * - Manages live laboratory HUD telemetry indicators, badges, and diagnostic history recording
     */
    class PhotophoreTelemetryManager {
        static calculateMetrics(organisms, symbioticPhotophoresManager, tick) {
            let liveCount = 0;
            let photophoreCount = 0;
            let quorumCount = 0;
            let pulsatileCount = 0;
            let sumOrgans = 0.0;
            let sumLuciferase = 0.0;
            let sumCounterIllum = 0.0;
            let sumGuanine = 0.0;
            let sumSubstrate = 0.0;
            let sumPulse = 0.0;
            let sumQuenching = 0.0;
            let sumRecycling = 0.0;
            let activeFlashes = 0;
            let blindedPredatorCount = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead) continue;
                    liveCount++;

                    const organs = org.photophoreOrgans || 0;
                    if (organs > 0) {
                        photophoreCount++;
                        sumOrgans += organs;
                        sumLuciferase += (org.luciferaseEfficiency || 0.0);
                        sumCounterIllum += (org.counterIlluminationRatio || 0.0);
                        sumGuanine += (org.guanineReflectors || 0.0);
                        sumSubstrate += (org.luciferinSubstrate || 0.0);
                        sumPulse += (org.photonicPulse || 0.0);
                        sumQuenching += (org.photonicQuenchingFactor || 1.0);
                        sumRecycling += (org.photonicEnergyRecycling || 0.0);

                        if (org.isQuorumSynchronized) quorumCount++;
                        if (org.pulsatileEmissionMode) pulsatileCount++;
                        if (org.flashCooldownTicks > 55) activeFlashes++;
                    }

                    if ((org.predatorBlindedTicks || 0) > 0 || (org.retinalSaturationTicks || 0) > 0) {
                        blindedPredatorCount++;
                    }
                }
            }

            const photophorePrevalence = liveCount > 0 ? (photophoreCount / liveCount) : 0.0;
            const quorumPrevalence = photophoreCount > 0 ? (quorumCount / photophoreCount) : 0.0;
            const pulsatilePrevalence = photophoreCount > 0 ? (pulsatileCount / photophoreCount) : 0.0;
            const meanOrgans = photophoreCount > 0 ? (sumOrgans / photophoreCount) : 0.0;
            const meanLuciferase = photophoreCount > 0 ? (sumLuciferase / photophoreCount) : 0.0;
            const meanCounterIllum = photophoreCount > 0 ? (sumCounterIllum / photophoreCount) : 0.0;
            const meanGuanine = photophoreCount > 0 ? (sumGuanine / photophoreCount) : 0.0;
            const meanSubstrate = photophoreCount > 0 ? (sumSubstrate / photophoreCount) : 0.0;
            const meanPulse = photophoreCount > 0 ? (sumPulse / photophoreCount) : 0.0;
            const meanQuenching = photophoreCount > 0 ? (sumQuenching / photophoreCount) : 1.0;
            const meanRecycling = photophoreCount > 0 ? (sumRecycling / photophoreCount) : 0.0;

            let cumulativeFlashes = 0;
            let cumulativePhotons = 0.0;
            let cumulativeAtp = 0.0;
            if (symbioticPhotophoresManager && symbioticPhotophoresManager.metrics) {
                cumulativeFlashes = symbioticPhotophoresManager.metrics.cumulativeFlashCount || 0;
                cumulativePhotons = symbioticPhotophoresManager.metrics.cumulativePhotonsEmitted || 0.0;
                cumulativeAtp = symbioticPhotophoresManager.metrics.cumulativeATPInvested || 0.0;
            }

            // Channel 73: % BLE Formulation
            const emissionFactor = Math.min(1.0, (meanOrgans / 8.0) * 0.6 + photophorePrevalence * 0.4);
            const luciferaseFactor = Math.min(1.0, (meanLuciferase / 0.8) * 1.15);
            const counterFactor = Math.min(1.0, (meanCounterIllum / 0.70) * 1.25);
            const quorumFactor = Math.min(1.0, quorumPrevalence * 1.35);

            const meanBLE = Math.max(0.0, Math.min(100.0,
                (emissionFactor * 30.0) + (luciferaseFactor * 25.0) +
                (counterFactor * 25.0) + (quorumFactor * 20.0)
            ));

            let regimeBLE = "PELAGIC DARKNESS / DORMANT PHOTOPHORES";
            let colorBLE = "#94a3b8";
            if (meanBLE >= 70.0) {
                regimeBLE = "SYNCHRONIZED DEEP-SEA PHOTONIC DOMINANCE";
                colorBLE = "#06b6d4";
            } else if (meanBLE >= 40.0) {
                regimeBLE = "STABLE LUCIFERIN-LUCIFERASE CATALYSIS";
                colorBLE = "#38bdf8";
            } else if (meanBLE >= 18.0) {
                regimeBLE = "INCIPIENT VENTRAL COUNTER-ILLUMINATION";
                colorBLE = "#67e8f9";
            }

            // Channel 74: % PCO (Photophore Catalytic Optimization) Formulation
            const quenchingFactor = Math.min(1.0, Math.max(0.0, meanQuenching));
            const recyclingFactor = Math.min(1.0, (meanRecycling / 0.50) * 1.2);
            const substrateFactor = Math.min(1.0, (meanSubstrate / 75.0) * 1.1);
            const atpYieldFactor = Math.min(1.0, (cumulativePhotons / Math.max(1.0, cumulativeAtp * 45.0)));

            const meanPCO = Math.max(0.0, Math.min(100.0,
                (quenchingFactor * 25.0) + (recyclingFactor * 30.0) +
                (substrateFactor * 25.0) + (atpYieldFactor * 20.0)
            ));

            let regimePCO = "METABOLIC OVERBURN / SUBSTRATE DEPLETION";
            let colorPCO = "#f87171";
            if (meanPCO >= 75.0) {
                regimePCO = "MAXIMAL CATALYTIC PHOTONIC HARVEST";
                colorPCO = "#10b981";
            } else if (meanPCO >= 50.0) {
                regimePCO = "STABLE BALANCED LUCIFERIN RECYCLING";
                colorPCO = "#14b8a6";
            } else if (meanPCO >= 25.0) {
                regimePCO = "MODERATE SUBSTRATE RESTORATION";
                colorPCO = "#f59e0b";
            }

            return {
                liveCount, photophoreCount, photophorePrevalence, quorumCount, quorumPrevalence,
                pulsatileCount, pulsatilePrevalence, meanOrgans, meanLuciferase, meanCounterIllum,
                meanGuanine, meanSubstrate, meanPulse, meanQuenching, meanRecycling,
                activeFlashes, cumulativeFlashes, cumulativePhotons, cumulativeAtp,
                blindedPredatorCount, meanBLE, regimeBLE, colorBLE, meanPCO, regimePCO, colorPCO,
                tick: (tick || 0)
            };
        }

        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 73: % BLE Index Indicator
            const valBLEIndexEl = document.getElementById("valBLEIndex");
            if (valBLEIndexEl) {
                valBLEIndexEl.textContent = metrics.meanBLE.toFixed(1) + "% BLE (" + metrics.regimeBLE + ")";
                valBLEIndexEl.style.color = metrics.colorBLE;
            }

            // Channel 74: % PCO Index Indicator
            const valPCOIndexEl = document.getElementById("valPCOIndex");
            if (valPCOIndexEl) {
                valPCOIndexEl.textContent = metrics.meanPCO.toFixed(1) + "% PCO (" + metrics.regimePCO + ")";
                valPCOIndexEl.style.color = metrics.colorPCO;
            }

            // Dual Photic Telemetry Status
            const valBLEStatusEl = document.getElementById("valBLEStatus");
            if (valBLEStatusEl) {
                valBLEStatusEl.textContent =
                    "PHOTOPHORES: " + metrics.meanOrgans.toFixed(1) + "/cell" +
                    " | LUCIFERASE: " + (metrics.meanLuciferase * 100.0).toFixed(1) + "%" +
                    " | SUBSTRATE: " + metrics.meanSubstrate.toFixed(1) +
                    " | QUENCHING: " + (metrics.meanQuenching * 100.0).toFixed(0) + "%" +
                    " | RECYCLING: " + (metrics.meanRecycling * 100.0).toFixed(1) + "%" +
                    " | RETINAL STUNS: " + metrics.blindedPredatorCount;
                valBLEStatusEl.style.color = metrics.meanBLE >= 40.0 ? "#06b6d4" : "#38bdf8";
            }
        }

        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.bioluminescentEmissionReliability) {
                const chartBLE = Number.isFinite(metrics.meanBLE) ? Math.max(0, Math.min(100, metrics.meanBLE)) : 0;
                historyData.bioluminescentEmissionReliability.shift();
                historyData.bioluminescentEmissionReliability.push(chartBLE);
            }
            if (historyData.photophoreCatalyticOptimization) {
                const chartPCO = Number.isFinite(metrics.meanPCO) ? Math.max(0, Math.min(100, metrics.meanPCO)) : 0;
                historyData.photophoreCatalyticOptimization.shift();
                historyData.photophoreCatalyticOptimization.push(chartPCO);
            }
        }

        static step(organisms, historyData, symbioticPhotophoresManager, tick) {
            const metrics = PhotophoreTelemetryManager.calculateMetrics(organisms, symbioticPhotophoresManager, tick);
            PhotophoreTelemetryManager.updateHUD(metrics);
            PhotophoreTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getBLEBadgeHTML(metrics) {
            const color = metrics ? metrics.colorBLE : "#06b6d4";
            const val = metrics ? metrics.meanBLE.toFixed(1) : "0.0";
            return '<span class="ble-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BLE</span>';
        }

        static getPCOBadgeHTML(metrics) {
            const color = metrics ? metrics.colorPCO : "#10b981";
            const val = metrics ? metrics.meanPCO.toFixed(1) : "0.0";
            return '<span class="pco-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% PCO</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PhotophoreTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.PhotophoreTelemetryManager = PhotophoreTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
