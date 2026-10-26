// BioEcosystem - Biological Carbon Pump & Biogeochemical Nitrogen Telemetry (61st & 62nd Channels)
// Module: src/ui/telemetry_biogeochemistry.js
// Version: 6.08.0 (Hour 328 - Looks/UI Agent: 62nd Channel % BNY & Nitrogen HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BiogeochemistryTelemetryManager
     * High-precision telemetry tracking for carbon pumps and biogeochemical nitrogen yields:
     * - Audits settling organo-mineral aggregates, vertical flux, and benthic carbon sinks (61st: % BCI)
     * - Drives Channel 62: Biogeochemical Nitrogen Yield (% BNY) on Lotka-Volterra chart
     * - Tracks benthic remineralization, diazotrophic fixation, nitrification, and denitrification
     * - Manages live HUD indicators, multi-channel chart recording, and diagnostic logging
     */
    class BiogeochemistryTelemetryManager {
        /**
         * Calculate biogeochemical metrics, 61st Channel (% BCI), and 62nd Channel (% BNY).
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} biogeochemicalSys - Active biogeochemical cycles system instance.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive biogeochemical telemetry snapshot.
         */
        static calculateMetrics(organisms, biogeochemicalSys, tick) {
            let liveCount = 0;
            let filterFeederCount = 0;
            let nitrogenFixerCount = 0;
            let nitrateAssimilatorCount = 0;
            let totalSnowConsumed = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const consumed = org.marineSnowConsumption || 0;
                    if (consumed > 0) {
                        filterFeederCount++;
                        totalSnowConsumed += consumed;
                    }

                    if ((org.nitrogenFixationFlux || 0) > 0.001) nitrogenFixerCount++;
                    if ((org.nitrateAssimilationRate || 0) > 0.05) nitrateAssimilatorCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);

            const snowCount = (biogeochemicalSys && Array.isArray(biogeochemicalSys.marineSnow))
                ? biogeochemicalSys.marineSnow.length
                : 0;
            const sinkingFlux = (biogeochemicalSys && biogeochemicalSys.metrics && typeof biogeochemicalSys.metrics.sinkingCarbonFlux === "number")
                ? biogeochemicalSys.metrics.sinkingCarbonFlux
                : 0.0;
            const sedimentCarbon = (biogeochemicalSys && typeof biogeochemicalSys.benthicSedimentCarbon === "number")
                ? biogeochemicalSys.benthicSedimentCarbon
                : 85.0;
            const dissolvedNO3 = (biogeochemicalSys && typeof biogeochemicalSys.dissolvedNitrate === "number")
                ? biogeochemicalSys.dissolvedNitrate
                : 52.0;
            const dissolvedNH4 = (biogeochemicalSys && typeof biogeochemicalSys.dissolvedAmmonium === "number")
                ? biogeochemicalSys.dissolvedAmmonium
                : 18.0;
            const reminFlux = (biogeochemicalSys && biogeochemicalSys.metrics && typeof biogeochemicalSys.metrics.benthicRemineralizationFlux === "number")
                ? biogeochemicalSys.metrics.benthicRemineralizationFlux
                : 0.06;

            // 61st Channel: Biological Carbon Index (% BCI)
            const particleScore = Math.min(20.0, (snowCount / 35.0) * 20.0);
            const fluxScore = Math.min(20.0, sinkingFlux * 40.0);
            const carbonPumpScore = particleScore + fluxScore;
            const sequestrationScore = Math.min(35.0, (sedimentCarbon / 180.0) * 35.0);
            const filterFeedingRatio = (filterFeederCount * 4.0) / targetTotal;
            const recyclingScore = Math.min(25.0, (filterFeedingRatio * 20.0) + (liveCount > 35 ? 5.0 : 2.0));
            const rawBCI = liveCount > 0 ? (carbonPumpScore + sequestrationScore + recyclingScore) : 0.0;
            const meanBCI = Number.isFinite(rawBCI) ? Math.max(0.0, Math.min(100.0, rawBCI)) : 0.0;

            let bciRegime = "DORMANT CARBON SINK";
            let bciColor = "#64748b";
            if (meanBCI >= 75.0) {
                bciRegime = "OPTIMAL BENTHIC SEQUESTRATION";
                bciColor = "#10b981";
            } else if (meanBCI >= 50.0) {
                bciRegime = "ACTIVE BIOLOGICAL CARBON PUMP";
                bciColor = "#e2e8f0";
            } else if (meanBCI >= 25.0) {
                bciRegime = "INCIPIENT MARINE SNOW FLUX";
                bciColor = "#94a3b8";
            }

            // 62nd Channel: Biogeochemical Nitrogen Yield (% BNY)
            // 1. Diazotrophic Nitrogen Fixation Rate (35% max)
            const fixRatio = (nitrogenFixerCount * 5.0) / targetTotal;
            const fixationScore = Math.min(35.0, fixRatio * 25.0 + Math.min(10.0, (dissolvedNH4 / 16.0) * 10.0));

            // 2. Cellular Nitrate Assimilation & Protein Growth (35% max)
            const assimRatio = (nitrateAssimilatorCount * 4.5) / targetTotal;
            const assimilationScore = Math.min(35.0, assimRatio * 25.0 + (liveCount > 25 ? 10.0 : 4.0));

            // 3. Nitrogen Pool Homeostasis & Remineralization Balance (30% max)
            const poolBalance = (dissolvedNO3 >= 8.0 && dissolvedNH4 >= 3.0)
                ? Math.min(30.0, ((dissolvedNO3 + dissolvedNH4) / 75.0) * 22.0 + (reminFlux * 120.0))
                : 8.0;

            const rawBNY = liveCount > 0 ? (fixationScore + assimilationScore + poolBalance) : 0.0;
            const meanBNY = Number.isFinite(rawBNY) ? Math.max(0.0, Math.min(100.0, rawBNY)) : 0.0;

            let bnyRegime = "OLIGOTROPHIC NITROGEN DEPRIVATION";
            let bnyColor = "#64748b";
            if (meanBNY >= 75.0) {
                bnyRegime = "OPTIMAL BIOGENIC NITROGEN YIELD";
                bnyColor = "#c084fc";
            } else if (meanBNY >= 50.0) {
                bnyRegime = "BALANCED NITRIFICATION CASCADE";
                bnyColor = "#a855f7";
            } else if (meanBNY >= 25.0) {
                bnyRegime = "TRANSIENT AMMONIUM SURGE";
                bnyColor = "#818cf8";
            }

            return {
                liveCount,
                filterFeederCount,
                nitrogenFixerCount,
                nitrateAssimilatorCount,
                totalSnowConsumed,
                snowCount,
                sinkingFlux: Number(sinkingFlux.toFixed(3)),
                sedimentCarbon: Number(sedimentCarbon.toFixed(1)),
                dissolvedNO3: Number(dissolvedNO3.toFixed(1)),
                dissolvedNH4: Number(dissolvedNH4.toFixed(1)),
                reminFlux: Number(reminFlux.toFixed(4)),
                meanBCI: Number(meanBCI.toFixed(1)),
                bciRegime,
                bciColor,
                meanBNY: Number(meanBNY.toFixed(1)),
                bnyRegime,
                bnyColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for 61st (% BCI) and 62nd (% BNY) Channels.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valBCIIndexEl = document.getElementById("valBCIIndex");
            const valBCIStatusEl = document.getElementById("valBCIStatus");
            if (valBCIIndexEl) {
                valBCIIndexEl.textContent = metrics.meanBCI.toFixed(1) + "% BCI (" + metrics.bciRegime + ")";
                valBCIIndexEl.style.color = metrics.bciColor;
            }
            if (valBCIStatusEl) {
                valBCIStatusEl.textContent = "SNOW FLOCS: " + metrics.snowCount +
                    " | SEDIMENT C: " + Math.round(metrics.sedimentCarbon) +
                    " | FLUX: " + metrics.sinkingFlux.toFixed(2) + " mg/f" +
                    " | FEEDERS: " + metrics.filterFeederCount +
                    " | NO3: " + Math.round(metrics.dissolvedNO3) + " uM";
                valBCIStatusEl.style.color = metrics.meanBCI >= 50.0 ? "#e2e8f0" : "#94a3b8";
            }

            const valBNYIndexEl = document.getElementById("valBNYIndex");
            const valBNYStatusEl = document.getElementById("valBNYStatus");
            if (valBNYIndexEl) {
                valBNYIndexEl.textContent = metrics.meanBNY.toFixed(1) + "% BNY (" + metrics.bnyRegime + ")";
                valBNYIndexEl.style.color = metrics.bnyColor;
            }
            if (valBNYStatusEl) {
                valBNYStatusEl.textContent = "FIXERS: " + metrics.nitrogenFixerCount +
                    " | ASSIM: " + metrics.nitrateAssimilatorCount +
                    " | NO3: " + Math.round(metrics.dissolvedNO3) + " uM" +
                    " | NH4: " + Math.round(metrics.dissolvedNH4) + " uM" +
                    " | REMIN: " + metrics.reminFlux.toFixed(2);
                valBNYStatusEl.style.color = metrics.meanBNY >= 50.0 ? "#c084fc" : "#a855f7";
            }
        }

        /**
         * Push new data points to Channel 61 & Channel 62 history curves in multi-channel population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.biologicalCarbon) {
                const chartBCI = Number.isFinite(metrics.meanBCI) ? Math.max(0, Math.min(100, metrics.meanBCI)) : 0;
                historyData.biologicalCarbon.shift();
                historyData.biologicalCarbon.push(chartBCI);
            }

            if (historyData.biogenicNitrogen) {
                const chartBNY = Number.isFinite(metrics.meanBNY) ? Math.max(0, Math.min(100, metrics.meanBNY)) : 0;
                historyData.biogenicNitrogen.shift();
                historyData.biogenicNitrogen.push(chartBNY);
            }
        }

        /**
         * Execute full telemetry cycle step for biogeochemical cycles, carbon pumping, and nitrogen yields.
         */
        static step(organisms, historyData, biogeochemicalSys, tick) {
            const metrics = BiogeochemistryTelemetryManager.calculateMetrics(organisms, biogeochemicalSys, tick);
            BiogeochemistryTelemetryManager.updateHUD(metrics);
            BiogeochemistryTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         */
        static getBCIBadgeHTML(metrics) {
            const bciColor = metrics ? metrics.bciColor : "#e2e8f0";
            const bciVal = metrics ? metrics.meanBCI.toFixed(1) : "0.0";
            return '<span class="bci-badge" style="color:' + bciColor + '; border-color:' + bciColor + ';">' + bciVal + '% BCI</span>';
        }

        /**
         * Retrieve Channel 62 (% BNY) telemetry badge HTML for dynamic inspector rendering.
         */
        static getBNYBadgeHTML(metrics) {
            const bnyColor = metrics ? metrics.bnyColor : "#c084fc";
            const bnyVal = metrics ? metrics.meanBNY.toFixed(1) : "0.0";
            return '<span class="bny-badge" style="color:' + bnyColor + '; border-color:' + bnyColor + ';">' + bnyVal + '% BNY</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites and headless benchmarks.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "BCI: 0.0% | BNY: 0.0% (NO DATA)";
            return "BCI: " + metrics.meanBCI + "% [" + metrics.bciRegime + "] | BNY: " + metrics.meanBNY + "% [" + metrics.bnyRegime + "] | Snow: " + metrics.snowCount + " | SedC: " + Math.round(metrics.sedimentCarbon) + " | Fixers: " + metrics.nitrogenFixerCount;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BiogeochemistryTelemetryManager;
    } else {
        global.BiogeochemistryTelemetryManager = BiogeochemistryTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
