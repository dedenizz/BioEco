// BioEcosystem - Cryptic Camouflage Telemetry Manager (Channel 43)
// Module: src/ui/telemetry_camouflage.js
// Version: 5.14.0 (Hour 234 - UI Agent 43rd Channel Cryptic Camouflage Index % CCI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class CamouflageTelemetryManager {
        // Compute dish-wide cryptic matching score, substrate assimilation and predation deterrence
        static calculateMetrics(organisms) {
            let liveCount = 0;
            let totalCrypsis = 0.0;
            let totalAssimilation = 0.0;
            let totalDeterrence = 0.0;

            // Substrate distribution tally across dish micro-environments
            let biofilmCount = 0;
            let reefCount = 0;
            let sedimentCount = 0;
            let nestCount = 0;
            let pelagicCount = 0;

            // Cryptic matching tiers for population demographic evaluation
            let apexStealthCount = 0; // CCI >= 65% (Near-invisible crypsis)
            let assimilatedCount = 0; // 40% <= CCI < 65% (Strong substrate match)
            let partialCount = 0;     // 20% <= CCI < 40% (Partial countershading)
            let exposedCount = 0;     // CCI < 20% (High predation exposure)

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const crypsis = typeof o.crypticMatchingScore === "number" ? o.crypticMatchingScore : 0.0;
                    const assimilation = typeof o.substrateAssimilation === "number" ? o.substrateAssimilation : 0.0;
                    const deterrence = typeof o.predationDeterrence === "number" ? o.predationDeterrence : 0.0;

                    totalCrypsis += crypsis;
                    totalAssimilation += assimilation;
                    totalDeterrence += deterrence;

                    const substrate = o.detectedSubstrate || "pelagic";
                    if (substrate === "biofilm") biofilmCount++;
                    else if (substrate === "reef") reefCount++;
                    else if (substrate === "sediment") sedimentCount++;
                    else if (substrate === "nest") nestCount++;
                    else pelagicCount++;

                    if (crypsis >= 0.65) apexStealthCount++;
                    else if (crypsis >= 0.40) assimilatedCount++;
                    else if (crypsis >= 0.20) partialCount++;
                    else exposedCount++;
                }
            }

            // Population arithmetic means
            const meanCrypsis = liveCount > 0 ? (totalCrypsis / liveCount) : 0.0;
            const meanAssimilation = liveCount > 0 ? (totalAssimilation / liveCount) : 0.0;
            const meanDeterrence = liveCount > 0 ? (totalDeterrence / liveCount) : 0.0;

            // Composite Cryptic Camouflage Index (% CCI - Channel 43)
            // Weighted: 50% cryptic matching score + 35% substrate assimilation + 15% predation deterrence
            const meanCCI = liveCount > 0
                ? (meanCrypsis * 0.50 + meanAssimilation * 0.35 + meanDeterrence * 0.15) * 100.0
                : 0.0;

            // Macro ecological regime classification for CCI (Channel 43)
            let cciRegime = "EXPOSED PELAGIC SILHOUETTE";
            let cciColor = "#94a3b8";

            if (meanCCI >= 65.0) {
                cciRegime = "CRYPTIC APEX STEALTH";
                cciColor = "#10b981";
            } else if (meanCCI >= 40.0) {
                cciRegime = "SUBSTRATE ASSIMILATED";
                cciColor = "#34d399";
            } else if (meanCCI >= 20.0) {
                cciRegime = "PARTIAL COUNTERSHADING";
                cciColor = "#38bdf8";
            }

            const assimilatedTotal = biofilmCount + reefCount + sedimentCount + nestCount;

            return {
                liveCount: liveCount,
                meanCCI: Number(meanCCI.toFixed(1)),
                meanCrypsis: Number((meanCrypsis * 100.0).toFixed(1)),
                meanAssimilation: Number((meanAssimilation * 100.0).toFixed(1)),
                meanDeterrence: Number((meanDeterrence * 100.0).toFixed(1)),
                assimilatedTotal: assimilatedTotal,
                biofilmCount: biofilmCount,
                reefCount: reefCount,
                sedimentCount: sedimentCount,
                nestCount: nestCount,
                pelagicCount: pelagicCount,
                apexStealthCount: apexStealthCount,
                assimilatedCount: assimilatedCount,
                partialCount: partialCount,
                exposedCount: exposedCount,
                cciRegime: cciRegime,
                cciColor: cciColor
            };
        }

        // Update laboratory HUD telemetry indicators in real-time
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valCamoIndexEl = document.getElementById("valCamoIndex");
            const valCamoStatusEl = document.getElementById("valCamoStatus");

            if (valCamoIndexEl) {
                valCamoIndexEl.textContent = metrics.meanCCI.toFixed(1) + "% CCI (" + metrics.cciRegime + ")";
                valCamoIndexEl.style.color = metrics.cciColor;
            }

            if (valCamoStatusEl) {
                valCamoStatusEl.textContent = metrics.assimilatedTotal + " ASSIM (" + metrics.meanDeterrence.toFixed(1) + "% DETERR) | B:" + metrics.biofilmCount + " R:" + metrics.reefCount + " S:" + metrics.sedimentCount + " N:" + metrics.nestCount;
                valCamoStatusEl.style.color = metrics.assimilatedTotal > 0 ? "#34d399" : "#94a3b8";
            }
        }

        // Push new data points to Channel 43 history curve in Lotka-Volterra chart
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.crypticCamouflage) return;

            const chartVal = Number.isFinite(metrics.meanCCI) ? Math.max(0, Math.min(100, metrics.meanCCI)) : 0;
            historyData.crypticCamouflage.shift();
            historyData.crypticCamouflage.push(chartVal);
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData) {
            const metrics = CamouflageTelemetryManager.calculateMetrics(organisms);
            CamouflageTelemetryManager.updateHUD(metrics);
            CamouflageTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        // Retrieve current telemetry badge HTML for dynamic inspector rendering
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.cciColor : "#94a3b8";
            const val = metrics ? metrics.meanCCI.toFixed(1) : "0.0";
            return '<span class="cci-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% CCI</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CamouflageTelemetryManager;
    } else {
        global.CamouflageTelemetryManager = CamouflageTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
