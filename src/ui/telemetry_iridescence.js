// BioEcosystem - Refractive Iridescence Telemetry Manager (Channel 44)
// Module: src/ui/telemetry_iridescence.js
// Version: 5.19.0 (Hour 239 - UI Agent 44th Channel Refractive Iridescence Index % RFI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class IridescenceTelemetryManager {
        // Compute dish-wide guanine platelet reflectance, interference wavelength, and dazzle deflection
        // Aggregates multilayer optical state variables across the entire active metazoan population
        static calculateMetrics(organisms) {
            let liveCount = 0;
            let totalReflectance = 0.0;
            let totalDisruption = 0.0;
            let totalCountershading = 0.0;
            let totalWavelength = 0.0;
            let dazzleCount = 0;

            // Optical iridescence demographic tiers across the population
            let prismaticShieldCount = 0; // RFI >= 60% (High-intensity crystalline protection)
            let specularCounterCount = 0; // 35% <= RFI < 60% (Balanced dorsal-ventral shading)
            let diffuseSheenCount = 0;    // 15% <= RFI < 35% (Incipient specular highlights)
            let nonRefractiveCount = 0;   // RFI < 15% (Unpolarized organic dermis)

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const refl = typeof o.specularReflectance === "number" ? o.specularReflectance : 0.20;
                    const disrupt = typeof o.ocularDisruption === "number" ? o.ocularDisruption : 0.0;
                    const counter = typeof o.countershadingScore === "number" ? o.countershadingScore : 0.45;
                    const wl = typeof o.interferenceWavelength === "number" ? o.interferenceWavelength : 490;

                    totalReflectance += refl;
                    totalDisruption += disrupt;
                    totalCountershading += counter;
                    totalWavelength += wl;

                    if (o.dazzleActive) dazzleCount++;

                    // Evaluate individual Refractive Iridescence Index for demographic sorting
                    const individualRFI = (refl * 0.45 + counter * 0.35 + disrupt * 0.20) * 100.0;
                    if (individualRFI >= 60.0) {
                        prismaticShieldCount++;
                    } else if (individualRFI >= 35.0) {
                        specularCounterCount++;
                    } else if (individualRFI >= 15.0) {
                        diffuseSheenCount++;
                    } else {
                        nonRefractiveCount++;
                    }
                }
            }

            // Population arithmetic means
            const meanReflectance = liveCount > 0 ? (totalReflectance / liveCount) : 0.0;
            const meanDisruption = liveCount > 0 ? (totalDisruption / liveCount) : 0.0;
            const meanCountershading = liveCount > 0 ? (totalCountershading / liveCount) : 0.0;
            const meanWavelength = liveCount > 0 ? Math.round(totalWavelength / liveCount) : 490;

            // Composite Refractive Iridescence Index (% RFI - Channel 44)
            // Weighted: 45% specular reflectance + 35% countershading balance + 20% ocular strike disruption
            const meanRFI = liveCount > 0
                ? (meanReflectance * 0.45 + meanCountershading * 0.35 + meanDisruption * 0.20) * 100.0
                : 0.0;

            // Macro optical regime classification for RFI (Channel 44)
            // Regimes classify optical defense from non-refractive skin to full prismatic dazzle
            let rfiRegime = "NON-REFRACTIVE DERMIS";
            let rfiColor = "#94a3b8";

            if (meanRFI >= 60.0) {
                rfiRegime = "PRISMATIC OPTICAL SHIELD";
                rfiColor = "#38bdf8";
            } else if (meanRFI >= 35.0) {
                rfiRegime = "SPECULAR COUNTERSHADING";
                rfiColor = "#67e8f9";
            } else if (meanRFI >= 15.0) {
                rfiRegime = "DIFFUSE CRYSTALLINE SHEEN";
                rfiColor = "#818cf8";
            }

            return {
                liveCount: liveCount,
                meanRFI: Number(meanRFI.toFixed(1)),
                meanReflectance: Number((meanReflectance * 100.0).toFixed(1)),
                meanDisruption: Number((meanDisruption * 100.0).toFixed(1)),
                meanCountershading: Number((meanCountershading * 100.0).toFixed(1)),
                meanWavelength: meanWavelength,
                dazzleCount: dazzleCount,
                prismaticShieldCount: prismaticShieldCount,
                specularCounterCount: specularCounterCount,
                diffuseSheenCount: diffuseSheenCount,
                nonRefractiveCount: nonRefractiveCount,
                rfiRegime: rfiRegime,
                rfiColor: rfiColor
            };
        }

        // Update laboratory HUD telemetry indicators in real-time
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valIridIndexEl = document.getElementById("valIridIndex");
            const valIridStatusEl = document.getElementById("valIridStatus");

            if (valIridIndexEl) {
                valIridIndexEl.textContent = metrics.meanRFI.toFixed(1) + "% RFI (" + metrics.rfiRegime + ")";
                valIridIndexEl.style.color = metrics.rfiColor;
            }

            if (valIridStatusEl) {
                valIridStatusEl.textContent = metrics.meanWavelength + "nm PEAK (" + metrics.meanReflectance.toFixed(0) + "% REFL) | " + metrics.dazzleCount + " DAZZLE | +" + metrics.meanDisruption.toFixed(1) + "% DEFLECT";
                valIridStatusEl.style.color = metrics.meanRFI >= 35.0 ? "#67e8f9" : "#94a3b8";
            }
        }

        // Push new data points to Channel 44 history curve in Lotka-Volterra chart
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.refractiveIridescence) return;

            const chartVal = Number.isFinite(metrics.meanRFI) ? Math.max(0, Math.min(100, metrics.meanRFI)) : 0;
            historyData.refractiveIridescence.shift();
            historyData.refractiveIridescence.push(chartVal);
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData) {
            const metrics = IridescenceTelemetryManager.calculateMetrics(organisms);
            IridescenceTelemetryManager.updateHUD(metrics);
            IridescenceTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        // Retrieve current telemetry badge HTML for dynamic inspector rendering
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.rfiColor : "#94a3b8";
            const val = metrics ? metrics.meanRFI.toFixed(1) : "0.0";
            return '<span class="rfi-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% RFI</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = IridescenceTelemetryManager;
    } else {
        global.IridescenceTelemetryManager = IridescenceTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
