// BioEcosystem - Benthic Hydrothermal Vent Ecosystem & Thermal Telemetry (Channels 51 & 52)
// Module: src/ui/telemetry_vent_ecosystem.js
// Version: 5.59.0 (Hour 279 - Looks / UI Agent: 52nd Channel Thermal Taxis Resilience % TTR & HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HydrothermalVentTelemetryManager
     * High-precision dual-channel telemetry tracking for benthic hydrothermal fields:
     * - Audits dish-wide chemolithoautotrophic sulfur oxidation and benthic ATP generation
     * - Drives Channel 51: Hydrothermal Energy Index (% HEI) on Lotka-Volterra chart
     * - Drives Channel 52: Thermal Taxis Resilience (% TTR) for core evasion and Arrhenius balance
     * - Manages live HUD indicators, negative thermotaxis demographics, and black smoker reservoir levels
     */
    class HydrothermalVentTelemetryManager {
        /**
         * Calculate population hydrothermal and thermal taxis resilience metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Array<Object>} vents - Active hydrothermal vents.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, vents, tick) {
            let liveCount = 0;
            let ventGrazingCount = 0;
            let optimumThermalCount = 0;
            let thermalShockCount = 0;
            let sulfurSynthesizingCount = 0;
            let thermotaxisActiveCount = 0;

            let totalChemoYield = 0.0;
            let totalStoredSulfur = 0.0;
            let totalThermalExposure = 0.0;
            let totalThermalStrain = 0.0;
            let totalBaroStrain = 0.0;
            let totalTTRScore = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const yieldATP = typeof o.chemosyntheticYield === "number" ? o.chemosyntheticYield : 0.0;
                    const storedS = typeof o.storedSulfur === "number" ? o.storedSulfur : 0.0;
                    const temp = typeof o.thermalExposure === "number" ? o.thermalExposure : 2.0;
                    const strain = typeof o.thermalStrain === "number" ? o.thermalStrain : 0.0;
                    const baro = typeof o.barophilicStrain === "number" ? o.barophilicStrain : 0.0;
                    const ttrScore = typeof o.thermalTaxisScore === "number" ? o.thermalTaxisScore : 0.0;
                    const isVent = Boolean(o.isAtVent);
                    const isThermotaxis = Boolean(o.isThermotaxisActive);

                    totalChemoYield += yieldATP;
                    totalStoredSulfur += storedS;
                    totalThermalExposure += temp;
                    totalThermalStrain += strain;
                    totalBaroStrain += baro;
                    totalTTRScore += ttrScore;

                    if (isVent || (typeof o.ventProximity === "number" && o.ventProximity > 0.15)) ventGrazingCount++;
                    if (temp >= 60.0 && temp <= 100.0) optimumThermalCount++;
                    if (strain > 0.05 || temp > 105.0) thermalShockCount++;
                    if (yieldATP > 0.04) sulfurSynthesizingCount++;
                    if (isThermotaxis) thermotaxisActiveCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanChemoYield = totalChemoYield / targetTotal;
            const meanStoredSulfur = totalStoredSulfur / targetTotal;
            const meanThermalExposure = totalThermalExposure / targetTotal;
            const meanThermalStrain = totalThermalStrain / targetTotal;
            const meanBaroStrain = totalBaroStrain / targetTotal;
            const meanTTRScore = totalTTRScore / targetTotal;

            // Total available sulfur in active vent reservoirs
            let ventTotalStored = 0.0;
            let ventTotalCapacity = 0.0;
            if (vents && Array.isArray(vents)) {
                for (let v = 0; v < vents.length; v++) {
                    if (vents[v]) {
                        ventTotalStored += (vents[v].storedSulfur || 0.0);
                        ventTotalCapacity += (vents[v].maxSulfur || 1.0);
                    }
                }
            }
            const ventReservoirRatio = ventTotalCapacity > 0 ? (ventTotalStored / ventTotalCapacity) : 0.0;

            // 51st Channel: Hydrothermal Energy Index (% HEI)
            const yieldWeight = Math.min(40.0, (meanChemoYield / 0.85) * 40.0);
            const grazingWeight = Math.min(35.0, (ventGrazingCount / targetTotal) * 100.0 * 0.70);
            const thermalWeight = Math.min(25.0, (optimumThermalCount / Math.max(1, ventGrazingCount || 1)) * 25.0);
            const rawHEI = liveCount > 0 ? (yieldWeight + grazingWeight + thermalWeight) : 0.0;
            const meanHEI = Number.isFinite(rawHEI) ? Math.max(0.0, Math.min(100.0, rawHEI)) : 0.0;

            let heiRegime = "DORMANT BENTHIC COLD SEEP";
            let heiColor = "#64748b";
            if (meanHEI >= 70.0) {
                heiRegime = "HYPERTHERMOPHILIC CHEMO-SURGE";
                heiColor = "#eab308";
            } else if (meanHEI >= 45.0) {
                heiRegime = "ACTIVE HYDROTHERMAL FLUX";
                heiColor = "#f59e0b";
            } else if (meanHEI >= 20.0) {
                heiRegime = "BASAL SULFUR OXIDATION";
                heiColor = "#38bdf8";
            }

            // 52nd Channel: Thermal Taxis Resilience (% TTR)
            // 1. Mean population thermal taxis score (40% max)
            // 2. Avoidance of thermal shock denaturation (35% max)
            // 3. Active thermotaxis repulsion & navigation participation (25% max)
            const ttrScoreWeight = Math.min(40.0, meanTTRScore * 40.0);
            const shockAvoidWeight = Math.max(0.0, 35.0 - (thermalShockCount / targetTotal) * 140.0);
            const navWeight = Math.min(25.0, ((thermotaxisActiveCount * 1.5 + ventGrazingCount) / targetTotal) * 50.0);
            const rawTTR = liveCount > 0 ? (ttrScoreWeight + shockAvoidWeight + navWeight) : 0.0;
            const meanTTR = Number.isFinite(rawTTR) ? Math.max(0.0, Math.min(100.0, rawTTR)) : 0.0;

            let ttrRegime = "VULNERABLE THERMAL INCINERATION RISK";
            let ttrColor = "#ef4444";
            if (meanTTR >= 70.0) {
                ttrRegime = "OPTIMAL ARRHENIUS SHOCK EVASION";
                ttrColor = "#38bdf8";
            } else if (meanTTR >= 45.0) {
                ttrRegime = "RESILIENT THERMAL TAXIS STEERING";
                ttrColor = "#06b6d4";
            } else if (meanTTR >= 20.0) {
                ttrRegime = "MARGINAL BENTHIC GRADIENT TOLERANCE";
                ttrColor = "#f59e0b";
            }

            return {
                liveCount: liveCount,
                ventGrazingCount: ventGrazingCount,
                optimumThermalCount: optimumThermalCount,
                thermalShockCount: thermalShockCount,
                sulfurSynthesizingCount: sulfurSynthesizingCount,
                thermotaxisActiveCount: thermotaxisActiveCount,
                meanHEI: Number(meanHEI.toFixed(1)),
                meanTTR: Number(meanTTR.toFixed(1)),
                meanChemoYield: Number(meanChemoYield.toFixed(3)),
                meanStoredSulfur: Number(meanStoredSulfur.toFixed(2)),
                meanThermalExposure: Number(meanThermalExposure.toFixed(1)),
                meanThermalStrain: Number(meanThermalStrain.toFixed(3)),
                meanBaroStrain: Number(meanBaroStrain.toFixed(3)),
                ventReservoirPercent: Math.round(ventReservoirRatio * 100),
                heiRegime: heiRegime,
                heiColor: heiColor,
                ttrRegime: ttrRegime,
                ttrColor: ttrColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for Channels 51 and 52.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            // Channel 51 HUD
            const valHEIIndexEl = document.getElementById("valHEIIndex");
            const valHEIStatusEl = document.getElementById("valHEIStatus");
            if (valHEIIndexEl) {
                valHEIIndexEl.textContent = metrics.meanHEI.toFixed(1) + "% HEI (" + metrics.heiRegime + ")";
                valHEIIndexEl.style.color = metrics.heiColor;
            }
            if (valHEIStatusEl) {
                valHEIStatusEl.textContent = "VENT GRAZERS: " + metrics.ventGrazingCount + " | ARRHENIUS OPT: " + metrics.optimumThermalCount + " | SHOCK: " + metrics.thermalShockCount + " | CHEM-ATP: +" + metrics.meanChemoYield.toFixed(2) + " | S-RES: " + metrics.ventReservoirPercent + "%";
                valHEIStatusEl.style.color = metrics.ventGrazingCount > 0 ? "#fef08a" : "#94a3b8";
            }

            // Channel 52 HUD (52nd Channel Jubilee)
            const valTTRIndexEl = document.getElementById("valTTRIndex");
            const valTTRStatusEl = document.getElementById("valTTRStatus");
            if (valTTRIndexEl) {
                valTTRIndexEl.textContent = metrics.meanTTR.toFixed(1) + "% TTR (" + metrics.ttrRegime + ")";
                valTTRIndexEl.style.color = metrics.ttrColor;
            }
            if (valTTRStatusEl) {
                valTTRStatusEl.textContent = "THERMOTAXIS ACTIVE: " + metrics.thermotaxisActiveCount + " | AVG TEMP: " + metrics.meanThermalExposure.toFixed(1) + " C | HEAT STRAIN: " + metrics.meanThermalStrain.toFixed(3) + " | SHOCK EVADED: " + (metrics.liveCount - metrics.thermalShockCount);
                valTTRStatusEl.style.color = metrics.thermotaxisActiveCount > 0 ? "#7dd3fc" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 51 and Channel 52 history curves in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.hydrothermalEnergy) {
                const chartHEI = Number.isFinite(metrics.meanHEI) ? Math.max(0, Math.min(100, metrics.meanHEI)) : 0;
                historyData.hydrothermalEnergy.shift();
                historyData.hydrothermalEnergy.push(chartHEI);
            }

            if (historyData.thermalTaxis) {
                const chartTTR = Number.isFinite(metrics.meanTTR) ? Math.max(0, Math.min(100, metrics.meanTTR)) : 0;
                historyData.thermalTaxis.shift();
                historyData.thermalTaxis.push(chartTTR);
            }
        }

        /**
         * Execute full telemetry cycle step for hydrothermal vent ecosystem.
         */
        static step(organisms, historyData, vents, tick) {
            const metrics = HydrothermalVentTelemetryManager.calculateMetrics(organisms, vents, tick);
            HydrothermalVentTelemetryManager.updateHUD(metrics);
            HydrothermalVentTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         */
        static getBadgeHTML(metrics) {
            const heiColor = metrics ? metrics.heiColor : "#eab308";
            const ttrColor = metrics ? metrics.ttrColor : "#38bdf8";
            const heiVal = metrics ? metrics.meanHEI.toFixed(1) : "0.0";
            const ttrVal = metrics ? metrics.meanTTR.toFixed(1) : "0.0";
            return '<span class="hei-badge" style="color:' + heiColor + '; border-color:' + heiColor + ';">' + heiVal + '% HEI</span> ' +
                   '<span class="ttr-badge" style="color:' + ttrColor + '; border-color:' + ttrColor + ';">' + ttrVal + '% TTR</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "HEI: 0.0% | TTR: 0.0% (NO DATA)";
            return `HEI: ${metrics.meanHEI}% [${metrics.heiRegime}] | TTR: ${metrics.meanTTR}% [${metrics.ttrRegime}] | Evad: ${metrics.thermotaxisActiveCount}/${metrics.liveCount} | Temp: ${metrics.meanThermalExposure} C`;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HydrothermalVentTelemetryManager;
    } else {
        global.HydrothermalVentTelemetryManager = HydrothermalVentTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
