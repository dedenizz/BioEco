// BioEcosystem - Collective Division & Hive Telemetry Manager (Channel 42)
// Module: src/ui/telemetry_hive.js
// Version: 5.09.0 (Hour 229 - UI Agent 42nd Channel Collective Division Index % CDI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class HiveTelemetryManager {
        // Compute dish-wide caste diversity, nest nutrient storage, and trophallaxis kinetics
        static calculateMetrics(organisms, nestNodes) {
            let liveCount = 0;
            let scoutCount = 0;
            let workerCount = 0;
            let soldierCount = 0;
            let queenCount = 0;
            let solitaryCount = 0;
            let trophallaxisCount = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const caste = o.socialCaste || "SOLITARY";
                    if (caste === "SCOUT") scoutCount++;
                    else if (caste === "WORKER") workerCount++;
                    else if (caste === "SOLDIER") soldierCount++;
                    else if (caste === "QUEEN") queenCount++;
                    else solitaryCount++;

                    if (o.trophallaxisStatus === "DEPOSITING" || o.trophallaxisStatus === "RECEIVING") {
                        trophallaxisCount++;
                    }
                }
            }

            // 1. Normalized Shannon-Wiener Caste Diversity Entropy
            let casteEntropy = 0.0;
            if (liveCount > 0) {
                const castes = [scoutCount, workerCount, soldierCount, queenCount];
                let entropySum = 0.0;
                for (let i = 0; i < castes.length; i++) {
                    const p = castes[i] / liveCount;
                    if (p > 0.001) {
                        entropySum -= p * Math.log(p);
                    }
                }
                // Max theoretical entropy for 4 equal castes is ln(4) = 1.386294
                casteEntropy = Math.min(1.0, Math.max(0.0, entropySum / 1.386294));
            }

            // 2. Nest Storage Capacity Utilization Ratio
            let totalStoredNutrients = 0.0;
            let totalMaxNutrients = 0.0;
            let totalNests = 0;

            const nests = Array.isArray(nestNodes) ? nestNodes : ((typeof global !== "undefined" && Array.isArray(global.nestNodes)) ? global.nestNodes : []);
            if (Array.isArray(nests) && nests.length > 0) {
                totalNests = nests.length;
                for (let i = 0; i < nests.length; i++) {
                    const n = nests[i];
                    totalStoredNutrients += (n.storedNutrients || 0.0);
                    totalMaxNutrients += (n.maxNutrients || 250.0);
                }
            }
            const storeRatio = totalMaxNutrients > 0.0 ? Math.min(1.0, totalStoredNutrients / totalMaxNutrients) : 0.0;

            // 3. Trophallaxis Exchange Participation Ratio
            const trophRate = liveCount > 0 ? (trophallaxisCount / liveCount) : 0.0;

            // 4. Composite Collective Division Index (CDI - Channel 42)
            // Combines caste diversity entropy (45%) + nest nutrient store ratio (35%) + trophallaxis rate (20%)
            const meanCDI = liveCount > 0
                ? (casteEntropy * 0.45 + storeRatio * 0.35 + trophRate * 0.20) * 100.0
                : 0.0;

            // Regime classification for CDI (Channel 42)
            let cdiRegime = "UNDIFFERENTIATED SWARM";
            let cdiColor = "#94a3b8";

            if (meanCDI >= 60.0) {
                cdiRegime = "EUSOCIAL MACRO-COLONY";
                cdiColor = "#f59e0b";
            } else if (meanCDI >= 35.0) {
                cdiRegime = "DIFFERENTIATED HIVE";
                cdiColor = "#c084fc";
            } else if (meanCDI >= 15.0) {
                cdiRegime = "INCIPIENT DIVISION";
                cdiColor = "#38bdf8";
            }

            return {
                liveCount: liveCount,
                meanCDI: Number(meanCDI.toFixed(1)),
                casteEntropy: Number(casteEntropy.toFixed(2)),
                storeRatio: Number((storeRatio * 100.0).toFixed(1)),
                trophRate: Number((trophRate * 100.0).toFixed(1)),
                totalNests: totalNests,
                totalStoredNutrients: Number(totalStoredNutrients.toFixed(1)),
                scoutCount: scoutCount,
                workerCount: workerCount,
                soldierCount: soldierCount,
                queenCount: queenCount,
                solitaryCount: solitaryCount,
                trophallaxisCount: trophallaxisCount,
                cdiRegime: cdiRegime,
                cdiColor: cdiColor
            };
        }

        // Update laboratory HUD telemetry indicators
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valHiveIndexEl = document.getElementById("valHiveIndex");
            const valHiveStatusEl = document.getElementById("valHiveStatus");

            if (valHiveIndexEl) {
                valHiveIndexEl.textContent = metrics.meanCDI.toFixed(1) + "% CDI (" + metrics.cdiRegime + ")";
                valHiveIndexEl.style.color = metrics.cdiColor;
            }

            if (valHiveStatusEl) {
                valHiveStatusEl.textContent = metrics.totalNests + " NESTS (" + metrics.totalStoredNutrients.toFixed(0) + " NUTR) | Q:" + metrics.queenCount + " S:" + metrics.soldierCount + " W:" + metrics.workerCount + " Sc:" + metrics.scoutCount;
                valHiveStatusEl.style.color = metrics.totalNests > 0 ? "#fbbf24" : "#94a3b8";
            }
        }

        // Push new data points to Channel 42 history curve
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.collectiveDivision) return;

            const chartVal = Number.isFinite(metrics.meanCDI) ? Math.max(0, Math.min(100, metrics.meanCDI)) : 0;
            historyData.collectiveDivision.shift();
            historyData.collectiveDivision.push(chartVal);
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData, nestNodes) {
            const metrics = HiveTelemetryManager.calculateMetrics(organisms, nestNodes);
            HiveTelemetryManager.updateHUD(metrics);
            HiveTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HiveTelemetryManager;
    } else {
        global.HiveTelemetryManager = HiveTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
