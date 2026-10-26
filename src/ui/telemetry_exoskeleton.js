// BioEcosystem - Exoskeleton & Biomineralization Telemetry Manager (Channels 39 & 40)
// Module: src/ui/telemetry_exoskeleton.js
// Version: 4.99.0 (Hour 219 - UI Agent 40th Channel Ecdysis Conversion Rate % ECR)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class ExoskeletonTelemetryManager {
        // Compute dish-wide biomineralization, armor, ecdysis and exuvia metrics across all live organisms
        static calculateMetrics(organisms, exuviae) {
            let totalBAI = 0;
            let totalAbsorption = 0;
            let totalHardness = 0;
            let armoredCount = 0;
            let totalRicochets = 0;
            let liveCount = 0;

            // Channel 40 ECR metrics
            let totalECR = 0;
            let softShellCount = 0;
            let moltingCount = 0;

            if (organisms && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const thickness = typeof o.cuticleThickness === "number" ? o.cuticleThickness : 0.0;
                    const hardness = typeof o.scleriteHardness === "number" ? o.scleriteHardness : 0.1;
                    const absorb = typeof o.effectiveAbsorption === "number" ? o.effectiveAbsorption : 0.0;
                    const ricochets = o.exoskeletonSystem && typeof o.exoskeletonSystem.deflectedStrikesCount === "number"
                        ? o.exoskeletonSystem.deflectedStrikesCount : 0;

                    if (o.hasExoskeleton || thickness >= 0.25) armoredCount++;
                    totalRicochets += ricochets;
                    totalAbsorption += absorb;
                    totalHardness += hardness;

                    // Biomineralization & Armor Index (BAI - Channel 39)
                    // Combines cuticle thickness + Mohs plate hardness + effective damage absorption
                    const thickScore = Math.min(1.0, thickness / 4.0) * 0.40;
                    const hardScore = Math.min(1.0, hardness / 0.9) * 0.35;
                    const absorbScore = Math.min(1.0, absorb / 0.65) * 0.25;
                    const orgBAI = (thickScore + hardScore + absorbScore) * 100.0;
                    totalBAI += orgBAI;

                    // Ecdysis Conversion Rate (ECR - Channel 40)
                    // Combines hormonal ecdysone titer (40%) + active molting state (35%) + developmental instar tier (25%)
                    const titer = typeof o.ecdysoneTiter === "number" ? o.ecdysoneTiter : 0.0;
                    const isMolting = !!o.isMolting;
                    const instar = typeof o.instarLevel === "number" ? o.instarLevel : 0;

                    if (isMolting) {
                        softShellCount++;
                        moltingCount++;
                    }

                    const titerScore = Math.min(1.0, Math.max(0.0, titer) / 100.0) * 0.40;
                    const moltingScore = isMolting ? 0.35 : 0.0;
                    const instarScore = Math.min(1.0, Math.max(0.0, instar) / 6.0) * 0.25;
                    const orgECR = (titerScore + moltingScore + instarScore) * 100.0;
                    totalECR += orgECR;
                }
            }

            const meanBAI = liveCount > 0 ? totalBAI / liveCount : 0.0;
            const meanAbsorption = liveCount > 0 ? (totalAbsorption / liveCount) * 100.0 : 0.0;
            const meanHardness = liveCount > 0 ? (totalHardness / liveCount) : 0.1;
            const meanECR = liveCount > 0 ? totalECR / liveCount : 0.0;

            // Resolve exuvia count from arguments, global or window
            let exuviaCount = 0;
            if (Array.isArray(exuviae)) {
                exuviaCount = exuviae.length;
            } else if (typeof global !== "undefined" && Array.isArray(global.exuviae)) {
                exuviaCount = global.exuviae.length;
            } else if (typeof window !== "undefined" && Array.isArray(window.exuviae)) {
                exuviaCount = window.exuviae.length;
            }

            // Regime classification for BAI (Channel 39)
            let baiRegime = "SOFT-BODIED / UNARMORED";
            let baiColor = "#94a3b8";

            if (meanBAI >= 60.0) {
                baiRegime = "HEAVY SCLEROTIZED CARAPACE";
                baiColor = "#f59e0b";
            } else if (meanBAI >= 35.0) {
                baiRegime = "MINERALIZED TERGITES";
                baiColor = "#fbbf24";
            } else if (meanBAI >= 15.0) {
                baiRegime = "INCIPIENT CUTICLE";
                baiColor = "#facc15";
            }

            // Regime classification for ECR (Channel 40)
            let ecrRegime = "AMETABOLOUS / STATIC";
            let ecrColor = "#94a3b8";

            if (meanECR >= 60.0) {
                ecrRegime = "SYNCHRONIZED MASS MOLTING";
                ecrColor = "#ec4899";
            } else if (meanECR >= 35.0) {
                ecrRegime = "STEADY INSTAR PROGRESSION";
                ecrColor = "#f472b6";
            } else if (meanECR >= 15.0) {
                ecrRegime = "INTERMOLT SCLEROTIZATION";
                ecrColor = "#fbbf24";
            }

            return {
                liveCount: liveCount,
                meanBAI: Number(meanBAI.toFixed(1)),
                meanAbsorption: Number(meanAbsorption.toFixed(1)),
                meanHardness: Number(meanHardness.toFixed(2)),
                armoredCount: armoredCount,
                totalRicochets: totalRicochets,
                baiRegime: baiRegime,
                baiColor: baiColor,
                meanECR: Number(meanECR.toFixed(1)),
                softShellCount: softShellCount,
                moltingCount: moltingCount,
                exuviaCount: exuviaCount,
                ecrRegime: ecrRegime,
                ecrColor: ecrColor
            };
        }

        // Update laboratory HUD telemetry indicators
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            // Channel 39 indicators
            const valArmorIndexEl = document.getElementById("valArmorIndex");
            const valArmorDeflectionEl = document.getElementById("valArmorDeflection");

            if (valArmorIndexEl) {
                valArmorIndexEl.textContent = metrics.meanBAI.toFixed(1) + "% BAI (" + metrics.baiRegime + ")";
                valArmorIndexEl.style.color = metrics.baiColor;
            }

            if (valArmorDeflectionEl) {
                valArmorDeflectionEl.textContent = metrics.meanAbsorption.toFixed(1) + "% DEFLECT | " + metrics.totalRicochets + " RICOCHETS";
                valArmorDeflectionEl.style.color = metrics.armoredCount > 0 ? "#10b981" : "#94a3b8";
            }

            // Channel 40 indicators (UI Agent v4.99.0)
            const valEcdysisRateEl = document.getElementById("valEcdysisRate");
            const valExuviaStatusEl = document.getElementById("valExuviaStatus");

            if (valEcdysisRateEl) {
                valEcdysisRateEl.textContent = metrics.meanECR.toFixed(1) + "% ECR (" + metrics.ecrRegime + ")";
                valEcdysisRateEl.style.color = metrics.ecrColor;
            }

            if (valExuviaStatusEl) {
                valExuviaStatusEl.textContent = metrics.softShellCount + " VULNERABLE | " + metrics.exuviaCount + " EXUVIAE";
                valExuviaStatusEl.style.color = metrics.softShellCount > 0 ? "#ec4899" : (metrics.exuviaCount > 0 ? "#f472b6" : "#94a3b8");
            }
        }

        // Push new data points to Channel 39 and Channel 40 history curves
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // Record Channel 39 (BAI)
            if (historyData.biomineralArmor) {
                const chartVal = Number.isFinite(metrics.meanBAI) ? Math.max(0, Math.min(100, metrics.meanBAI)) : 0;
                historyData.biomineralArmor.shift();
                historyData.biomineralArmor.push(chartVal);
            }

            // Record Channel 40 (ECR)
            if (historyData.ecdysisConversion) {
                const chartVal = Number.isFinite(metrics.meanECR) ? Math.max(0, Math.min(100, metrics.meanECR)) : 0;
                historyData.ecdysisConversion.shift();
                historyData.ecdysisConversion.push(chartVal);
            }
        }

        // Composite step executed per simulation tick
        static step(organisms, historyData, exuviae) {
            const metrics = ExoskeletonTelemetryManager.calculateMetrics(organisms, exuviae);
            ExoskeletonTelemetryManager.updateHUD(metrics);
            ExoskeletonTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ExoskeletonTelemetryManager;
    } else {
        global.ExoskeletonTelemetryManager = ExoskeletonTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
