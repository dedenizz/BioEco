// BioEcosystem - Biomic Homeostasis & Trophic Current Telemetry (59th % BHI & 60th % TCS)
// Module: src/ui/telemetry_climate.js
// Version: 5.98.0 (Hour 318 - Looks/UI Agent: 60th Telemetry Channel % TCS & Biomic HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ClimateTelemetryManager
     * High-precision telemetry tracking for global biomic climate & vertical circulation:
     * - Audits water column stratification (Epipelagic, Thermocline, Benthic)
     * - Drives Channel 59: Biomic Homeostasis Index (% BHI)
     * - Drives Channel 60: Trophic Current Synergy (% TCS) on Lotka-Volterra chart
     * - Tracks convective surfing, rheotactic counter-swimming, and trophic recycling
     */
    class ClimateTelemetryManager {
        /**
         * Calculate biomic climate metrics, 59th Channel (% BHI) and 60th Channel (% TCS).
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} thermohalineSys - Active thermohaline circulation system instance.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive biomic climate and trophic current telemetry snapshot.
         */
        static calculateMetrics(organisms, thermohalineSys, tick) {
            let liveCount = 0;
            let epipelagicCount = 0;
            let thermoclineCount = 0;
            let benthicCount = 0;
            let inPlumeCount = 0;
            let surfingCount = 0;
            let counterCount = 0;
            let totalAdvectionDrift = 0.0;
            let totalNutrientAssimilation = 0.0;

            const dietTally = { 0: 0, 1: 0, 2: 0, 3: 0 };

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const layer = org.waterColumnLayer || "THERMOCLINE";
                    if (layer === "EPIPELAGIC") epipelagicCount++;
                    else if (layer === "BENTHIC") benthicCount++;
                    else thermoclineCount++;

                    if (org.inUpwellingPlume) inPlumeCount++;
                    if (org.convectiveSurfingActive) surfingCount++;
                    if (org.isCounterSwimming) counterCount++;

                    const diet = (org.dna && typeof org.dna.diet === "number") ? org.dna.diet : 0;
                    dietTally[diet] = (dietTally[diet] || 0) + 1;

                    const advX = org.currentAdvectionX || 0.0;
                    const advY = org.currentAdvectionY || 0.0;
                    totalAdvectionDrift += Math.hypot(advX, advY);
                    totalNutrientAssimilation += (org.upwellingNutrientAssimilation || 0.0);
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanDrift = totalAdvectionDrift / targetTotal;
            const meanAssim = totalNutrientAssimilation / targetTotal;

            const benthicStock = (thermohalineSys && typeof thermohalineSys.benthicNutrientPool === "number")
                ? thermohalineSys.benthicNutrientPool
                : 120.0;
            const upwellingIntensity = (thermohalineSys && typeof thermohalineSys.upwellingIntensity === "number")
                ? thermohalineSys.upwellingIntensity
                : 0.55;

            // 59th Channel: Biomic Homeostasis Index (% BHI)
            const layerEntropy = (epipelagicCount > 0 && benthicCount > 0 && thermoclineCount > 0) ? 1.0 : 0.65;
            const circulationScore = Math.min(35.0, (layerEntropy * 20.0) + (meanDrift * 45.0));
            const mineralStockFactor = Math.min(1.0, benthicStock / 150.0);
            const assimilationScore = Math.min(40.0, (meanAssim * 80.0) + (mineralStockFactor * 15.0) + (upwellingIntensity * 10.0));
            const plumeCoverage = Math.min(1.0, (inPlumeCount * 3.5) / targetTotal);
            const stabilityScore = Math.min(25.0, (plumeCoverage * 15.0) + (liveCount > 40 ? 10.0 : 5.0));
            const rawBHI = liveCount > 0 ? (circulationScore + assimilationScore + stabilityScore) : 0.0;
            const meanBHI = Number.isFinite(rawBHI) ? Math.max(0.0, Math.min(100.0, rawBHI)) : 0.0;

            let bhiRegime = "STRATIFIED STAGNANT DRIFT";
            let bhiColor = "#64748b";
            if (meanBHI >= 75.0) {
                bhiRegime = "OPTIMAL CIRCULATORY EQUILIBRIUM";
                bhiColor = "#10b981";
            } else if (meanBHI >= 50.0) {
                bhiRegime = "STABLE BIOMIC HOMEOSTASIS";
                bhiColor = "#06b6d4";
            } else if (meanBHI >= 25.0) {
                bhiRegime = "INCIPIENT CONVECTIVE OVERTURN";
                bhiColor = "#38bdf8";
            }

            // 60th Channel: Trophic Current Synergy (% TCS)
            // 1. Trophic Nutrient Circulation & Recycling (40% max)
            let trophicDiversityCount = 0;
            if (dietTally[0] > 0) trophicDiversityCount++;
            if (dietTally[1] > 0) trophicDiversityCount++;
            if (dietTally[2] > 0) trophicDiversityCount++;
            if (dietTally[3] > 0) trophicDiversityCount++;
            const trophicRecycleScore = Math.min(40.0, (meanAssim * 65.0) + (trophicDiversityCount * 5.0) + (mineralStockFactor * 10.0));

            // 2. Convective Surfing & Migratory Upwelling Utilization (35% max)
            const surfingScore = Math.min(35.0, ((surfingCount * 4.5) / targetTotal) * 35.0);

            // 3. Rheotactic Margin Avoidance & Barrier Resilience (25% max)
            const marginAvoidanceScore = Math.min(25.0, ((counterCount * 3.5) / targetTotal) * 20.0 + (liveCount > 30 ? 5.0 : 2.0));

            const rawTCS = liveCount > 0 ? (trophicRecycleScore + surfingScore + marginAvoidanceScore) : 0.0;
            const meanTCS = Number.isFinite(rawTCS) ? Math.max(0.0, Math.min(100.0, rawTCS)) : 0.0;

            let tcsRegime = "DORMANT TROPHIC CIRCULATION";
            let tcsColor = "#64748b";
            if (meanTCS >= 75.0) {
                tcsRegime = "OPTIMAL BIOMIC FOOD-WEB HARMONY";
                tcsColor = "#10b981";
            } else if (meanTCS >= 50.0) {
                tcsRegime = "ACTIVE TROPHIC CURRENT SYNERGY";
                tcsColor = "#eab308";
            } else if (meanTCS >= 25.0) {
                tcsRegime = "INCIPIENT UPWELLING ADVECTION";
                tcsColor = "#38bdf8";
            }

            return {
                liveCount,
                epipelagicCount,
                thermoclineCount,
                benthicCount,
                inPlumeCount,
                surfingCount,
                counterCount,
                benthicStock: Number(benthicStock.toFixed(1)),
                upwellingIntensity: Number(upwellingIntensity.toFixed(2)),
                meanDrift: Number(meanDrift.toFixed(3)),
                meanAssim: Number(meanAssim.toFixed(3)),
                meanBHI: Number(meanBHI.toFixed(1)),
                meanTCS: Number(meanTCS.toFixed(1)),
                bhiRegime,
                bhiColor,
                tcsRegime,
                tcsColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for 59th (% BHI) and 60th (% TCS) Channels.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valBHIIndexEl = document.getElementById("valBHIIndex");
            const valBHIStatusEl = document.getElementById("valBHIStatus");
            const valTCSIndexEl = document.getElementById("valTCSIndex");
            const valTCSStatusEl = document.getElementById("valTCSStatus");

            if (valBHIIndexEl) {
                valBHIIndexEl.textContent = metrics.meanBHI.toFixed(1) + "% BHI (" + metrics.bhiRegime + ")";
                valBHIIndexEl.style.color = metrics.bhiColor;
            }
            if (valBHIStatusEl) {
                valBHIStatusEl.textContent = "UPWELLING: " + Math.round(metrics.upwellingIntensity * 100) + "%" +
                    " | BENTHIC STOCK: " + Math.round(metrics.benthicStock) +
                    " | IN PLUME: " + metrics.inPlumeCount +
                    " | DRIFT: " + metrics.meanDrift.toFixed(2) + "px/f";
                valBHIStatusEl.style.color = metrics.meanBHI >= 50.0 ? "#06b6d4" : "#94a3b8";
            }

            if (valTCSIndexEl) {
                valTCSIndexEl.textContent = metrics.meanTCS.toFixed(1) + "% TCS (" + metrics.tcsRegime + ")";
                valTCSIndexEl.style.color = metrics.tcsColor;
            }
            if (valTCSStatusEl) {
                valTCSStatusEl.textContent = "SURFING: " + metrics.surfingCount +
                    " | COUNTER-SWIM: " + metrics.counterCount +
                    " | ASSIM: " + Math.round(metrics.meanAssim * 100) + "%" +
                    " | RECYCLE: " + (metrics.benthicStock > 20 ? "ACTIVE" : "DEPLETED");
                valTCSStatusEl.style.color = metrics.meanTCS >= 50.0 ? "#eab308" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 59 (% BHI) and Channel 60 (% TCS) history curves.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.biomicHomeostasis) {
                const chartBHI = Number.isFinite(metrics.meanBHI) ? Math.max(0, Math.min(100, metrics.meanBHI)) : 0;
                historyData.biomicHomeostasis.shift();
                historyData.biomicHomeostasis.push(chartBHI);
            }

            if (historyData.trophicCurrentSynergy) {
                const chartTCS = Number.isFinite(metrics.meanTCS) ? Math.max(0, Math.min(100, metrics.meanTCS)) : 0;
                historyData.trophicCurrentSynergy.shift();
                historyData.trophicCurrentSynergy.push(chartTCS);
            }
        }

        /**
         * Execute full telemetry cycle step for biomic climate and trophic current dynamics.
         */
        static step(organisms, historyData, thermohalineSys, tick) {
            const metrics = ClimateTelemetryManager.calculateMetrics(organisms, thermohalineSys, tick);
            ClimateTelemetryManager.updateHUD(metrics);
            ClimateTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getBHIBadgeHTML(metrics) {
            const color = metrics ? metrics.bhiColor : "#06b6d4";
            const val = metrics ? metrics.meanBHI.toFixed(1) : "0.0";
            return '<span class="bhi-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BHI</span>';
        }

        static getTCSBadgeHTML(metrics) {
            const color = metrics ? metrics.tcsColor : "#eab308";
            const val = metrics ? metrics.meanTCS.toFixed(1) : "0.0";
            return '<span class="tcs-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% TCS</span>';
        }

        static formatDiagnostics(metrics) {
            if (!metrics) return "BHI: 0.0% | TCS: 0.0% (NO DATA)";
            return "BHI: " + metrics.meanBHI + "% [" + metrics.bhiRegime + "] | TCS: " + metrics.meanTCS + "% [" + metrics.tcsRegime + "] | Surfing: " + metrics.surfingCount + " | CounterSwim: " + metrics.counterCount + " | Stock: " + Math.round(metrics.benthicStock);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ClimateTelemetryManager;
    } else {
        global.ClimateTelemetryManager = ClimateTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
