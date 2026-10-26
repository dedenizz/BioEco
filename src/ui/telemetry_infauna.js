// BioEcosystem - Bioturbation Turbulence Index (% BTI) & Biogenic Mineral Recycling (% BMR) Telemetry
// Module: src/ui/telemetry_infauna.js
// Version: 6.88.0 (Hour 408 - Looks & UI Agent: 78th Channel % BMR & Turbidity HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * InfaunaTelemetryManager
     * High-precision telemetry tracking for sub-benthic infauna and sediment aeration dynamics:
     * - Channel 77: Bioturbation Turbulence Index (% BTI)
     * - Channel 78: Biogenic Mineral Recycling Efficiency (% BMR)
     * - Measures biogenic sediment turnover, burrowing depth, and oxygen penetration depth (OPD)
     * - Quantifies porewater mineral diffusion flux (phosphate and ammonium return to water column)
     * - Audits chemoautotrophic sulfide oxidation turnover across oxic-anoxic transitions
     * - Monitors anoxic fermentation reserves, hypoxic stress events, and upward ventilation surges
     * - Tracks sediment compaction stall events and suspended turbidity veil density
     * - Renders laboratory HUD telemetry indicators, badges, and diagnostic history buffers
     */
    class InfaunaTelemetryManager {
        /**
         * Calculate dish-wide infaunal metrics, sedimentary mixing, and mineral recycling.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} infaunaManager - Global InfaunalBioturbationManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive infaunal telemetry metrics.
         */
        static calculateMetrics(organisms, infaunaManager, tick) {
            let liveCount = 0;
            let infaunalCount = 0;
            let subBenthicCount = 0;

            let sumBurrowDepth = 0.0;
            let maxBurrowDepth = 0.0;
            let sumBioturbationFlux = 0.0;
            let sumCompactionResistance = 0.0;
            let sumMucusLining = 0.0;
            let sumSulfideYield = 0.0;
            let sumPorewaterFlux = 0.0;
            let sumIndivBTI = 0.0;
            let sumIndivBMR = 0.0;
            let sumFermentation = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const depth = org.subBenthicBurrowingDepth || 0.0;
                    const flux = org.bioturbationFlux || 0.0;
                    const compaction = org.sedimentCompactionResistance || 0.0;
                    const mucus = org.mucusLiningIntegrity || 0.0;
                    const sulfide = org.sulfideOxidationYield || 0.0;
                    const porewater = org.nutrientPorewaterFlux || 0.0;
                    const bti = org.bioturbationIndex || 0.0;
                    const bmr = org.mineralRecyclingIndex || 0.0;
                    const ferm = org.anoxicFermentationBuffer !== undefined ? org.anoxicFermentationBuffer : 100.0;

                    sumBurrowDepth += depth;
                    if (depth > maxBurrowDepth) maxBurrowDepth = depth;
                    sumBioturbationFlux += flux;
                    sumCompactionResistance += compaction;
                    sumMucusLining += mucus;
                    sumSulfideYield += sulfide;
                    sumPorewaterFlux += porewater;
                    sumIndivBTI += bti;
                    sumIndivBMR += bmr;
                    sumFermentation += ferm;

                    if (org.infaunalAdapted) infaunalCount++;
                    if (org.isSubBenthic || depth > 1.0) subBenthicCount++;
                }
            }

            const meanBurrowDepth = liveCount > 0 ? (sumBurrowDepth / liveCount) : 0.0;
            const infaunalPrevalence = liveCount > 0 ? (infaunalCount / liveCount) : 0.0;
            const subBenthicPrevalence = liveCount > 0 ? (subBenthicCount / liveCount) : 0.0;
            const meanBioturbationFlux = liveCount > 0 ? (sumBioturbationFlux / liveCount) : 0.0;
            const meanCompactionResistance = liveCount > 0 ? (sumCompactionResistance / liveCount) : 0.0;
            const meanMucusLining = liveCount > 0 ? (sumMucusLining / liveCount) : 0.0;
            const meanSulfideYield = liveCount > 0 ? (sumSulfideYield / liveCount) : 0.0;
            const meanPorewaterFlux = liveCount > 0 ? (sumPorewaterFlux / liveCount) : 0.0;
            const meanFermentation = liveCount > 0 ? (sumFermentation / liveCount) : 100.0;

            let activeTunnels = 0;
            let recycledMineralPorewater = 0.0;
            let chemoSulfideAtpProduced = 0.0;
            let meanOxygenPenetration = 8.5;
            let ventilationSurgeCount = 0;
            let compactionStalls = 0;
            let meanTurbidity = 0.0;

            if (infaunaManager && infaunaManager.metrics) {
                activeTunnels = infaunaManager.metrics.activeTunnels || 0;
                recycledMineralPorewater = infaunaManager.metrics.recycledMineralPorewater || 0.0;
                chemoSulfideAtpProduced = infaunaManager.metrics.chemoSulfideAtpProduced || 0.0;
                meanOxygenPenetration = infaunaManager.metrics.meanOxygenPenetration || 8.5;
                ventilationSurgeCount = infaunaManager.metrics.ventilationSurgeCount || 0;
                compactionStalls = infaunaManager.metrics.compactionStallEvents || 0;
                meanTurbidity = infaunaManager.metrics.meanTurbidity || 0.0;
            }

            // Channel 77: % BTI (Bioturbation Turbulence Index)
            const depthFactor = Math.min(1.0, meanBurrowDepth / 30.0) * 35.0;
            const fluxFactor = Math.min(1.0, meanBioturbationFlux / 0.40) * 30.0;
            const mucusFactor = Math.min(1.0, meanMucusLining / 0.50) * 20.0;
            const sulfideFactor = Math.min(1.0, meanSulfideYield / 0.35) * 15.0;
            const meanBTI = Math.max(0.0, Math.min(100.0, depthFactor + fluxFactor + mucusFactor + sulfideFactor));

            let regimeBTI = "STAGNANT ANOXIC COMPACTION & CLOGGING";
            let colorBTI = "#78350f";
            if (meanBTI >= 75.0) {
                regimeBTI = "HIGH-PERMEABILITY BIOGENIC AERATION";
                colorBTI = "#f59e0b";
            } else if (meanBTI >= 50.0) {
                regimeBTI = "STABLE SEDIMENTARY BIOTURBATION FLUX";
                colorBTI = "#d97706";
            } else if (meanBTI >= 25.0) {
                regimeBTI = "INCIPIENT INFAUNAL SUB-STRATUM PENETRATION";
                colorBTI = "#b45309";
            }

            // Channel 78: % BMR (Biogenic Mineral Recycling Efficiency)
            const rawBMR = liveCount > 0 ? (sumIndivBMR / liveCount) : 0.0;
            const meanBMR = Math.max(0.0, Math.min(100.0, rawBMR * 100.0));

            let regimeBMR = "MINERAL SEQUESTRATION & ANOXIC SINK";
            let colorBMR = "#ef4444";
            if (meanBMR >= 75.0) {
                regimeBMR = "CIRCULAR BIOGENIC REDOX FLUX";
                colorBMR = "#10b981";
            } else if (meanBMR >= 50.0) {
                regimeBMR = "STEADY TROPHIC MINERAL RESYNTHESIS";
                colorBMR = "#059669";
            } else if (meanBMR >= 25.0) {
                regimeBMR = "PARTIAL POREWATER ASSIMILATION";
                colorBMR = "#f59e0b";
            }

            return {
                liveCount,
                infaunalCount,
                infaunalPrevalence,
                subBenthicCount,
                subBenthicPrevalence,
                meanBurrowDepth,
                maxBurrowDepth,
                meanBioturbationFlux,
                meanCompactionResistance,
                meanMucusLining,
                meanSulfideYield,
                meanPorewaterFlux,
                meanFermentation,
                activeTunnels,
                recycledMineralPorewater,
                chemoSulfideAtpProduced,
                meanOxygenPenetration,
                ventilationSurgeCount,
                compactionStalls,
                meanTurbidity,
                meanBTI,
                regimeBTI,
                colorBTI,
                meanBMR,
                regimeBMR,
                colorBMR,
                tick: (tick || 0)
            };
        }

        /**
         * Update laboratory HUD elements with 77th and 78th channel telemetry values.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 77: % BTI Index Indicator
            const valBTIIndexEl = document.getElementById("valBTIIndex");
            if (valBTIIndexEl) {
                valBTIIndexEl.textContent = metrics.meanBTI.toFixed(1) + "% BTI (" + metrics.regimeBTI + ")";
                valBTIIndexEl.style.color = metrics.colorBTI;
            }

            // Infaunal Aeration & Sediment Tunnels Status Indicator
            const valBTIStatusEl = document.getElementById("valBTIStatus");
            if (valBTIStatusEl) {
                valBTIStatusEl.textContent =
                    "INFAUNAL CELLS: " + metrics.infaunalCount + "/" + metrics.liveCount +
                    " | ACTIVE TUNNELS: " + metrics.activeTunnels +
                    " | OPD: " + metrics.meanOxygenPenetration.toFixed(1) + " px" +
                    " | SULPHIDE ATP: " + metrics.chemoSulfideAtpProduced.toFixed(2) +
                    " | RECYCLED POREWATER: " + metrics.recycledMineralPorewater.toFixed(2) +
                    " | MAX DEPTH: " + metrics.maxBurrowDepth.toFixed(1) + " px";
                valBTIStatusEl.style.color = metrics.meanBTI >= 50.0 ? "#fbbf24" : "#fcd34d";
            }

            // Channel 78: % BMR Index Indicator
            const valBMRIndexEl = document.getElementById("valBMRIndex");
            if (valBMRIndexEl) {
                valBMRIndexEl.textContent = metrics.meanBMR.toFixed(1) + "% BMR (" + metrics.regimeBMR + ")";
                valBMRIndexEl.style.color = metrics.colorBMR;
            }

            // Redox Flux & Turbidity Dynamics Status Indicator
            const valBMRStatusEl = document.getElementById("valBMRStatus");
            if (valBMRStatusEl) {
                valBMRStatusEl.textContent =
                    "TURBIDITY: " + (metrics.meanTurbidity * 100.0).toFixed(1) + "%" +
                    " | FERMENTATION: " + metrics.meanFermentation.toFixed(1) + "%" +
                    " | VENT SURGES: " + metrics.ventilationSurgeCount +
                    " | COMPACTION STALLS: " + metrics.compactionStalls;
                valBMRStatusEl.style.color = metrics.meanBMR >= 50.0 ? "#34d399" : "#6ee7b7";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.bioturbationTurbulence) {
                const chartValBTI = Number.isFinite(metrics.meanBTI) ? Math.max(0, Math.min(100, metrics.meanBTI)) : 0;
                historyData.bioturbationTurbulence.shift();
                historyData.bioturbationTurbulence.push(chartValBTI);
            }
            if (historyData.biogenicMineralRecycling) {
                const chartValBMR = Number.isFinite(metrics.meanBMR) ? Math.max(0, Math.min(100, metrics.meanBMR)) : 0;
                historyData.biogenicMineralRecycling.shift();
                historyData.biogenicMineralRecycling.push(chartValBMR);
            }
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} infaunaManager - Global InfaunalBioturbationManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, infaunaManager, tick) {
            const metrics = InfaunaTelemetryManager.calculateMetrics(organisms, infaunaManager, tick);
            InfaunaTelemetryManager.updateHUD(metrics);
            InfaunaTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Render compact telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getBTIBadgeHTML(metrics) {
            const color = metrics ? metrics.colorBTI : "#f59e0b";
            const val = metrics ? metrics.meanBTI.toFixed(1) : "0.0";
            return '<span class="bti-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BTI</span>';
        }

        static getBMRBadgeHTML(metrics) {
            const color = metrics ? metrics.colorBMR : "#10b981";
            const val = metrics ? metrics.meanBMR.toFixed(1) : "0.0";
            return '<span class="bmr-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BMR</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = InfaunaTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.InfaunaTelemetryManager = InfaunaTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
