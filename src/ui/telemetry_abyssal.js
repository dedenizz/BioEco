// BioEcosystem - Abyssal Chemoautotrophy & Hydrothermal Energy Flux Telemetry (Channel 45)
// Module: src/ui/telemetry_abyssal.js
// Version: 5.24.0 (Hour 244 - UI Agent: 45th Channel Chemoautotrophic Energy Flux % CEF)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AbyssalTelemetryManager
     * Tracks dish-wide chemoautotrophic energy production, hydrothermal vent exploitation,
     * hydrostatic barophilic strain, and aphotic biomass distribution across the benthic zone.
     */
    class AbyssalTelemetryManager {
        /**
         * Calculate chemoautotrophic metrics, flux indices, and abyssal demographics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Array<Object>} vents - Active hydrothermal vents.
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, vents) {
            let liveCount = 0;
            let aphoticCount = 0;
            let ventFeedingCount = 0;

            let totalSulfurStored = 0.0;
            let totalChemoATP = 0.0;
            let totalBaroStrain = 0.0;
            let totalVentProximity = 0.0;

            // Piezotolerance demographic tiers
            let piezophilicCount = 0; // High barotolerance, low strain at depth
            let piezotolerantCount = 0; // Moderate barotolerance
            let piezostrainedCount = 0; // Strained by high hydrostatic pressure

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const sulfur = typeof o.storedSulfur === "number" ? o.storedSulfur : 0.0;
                    const yieldATP = typeof o.chemosyntheticYield === "number" ? o.chemosyntheticYield : 0.0;
                    const strain = typeof o.barophilicStrain === "number" ? o.barophilicStrain : 0.0;
                    const proximity = typeof o.ventProximity === "number" ? o.ventProximity : 0.0;

                    totalSulfurStored += sulfur;
                    totalChemoATP += yieldATP;
                    totalBaroStrain += strain;
                    totalVentProximity += proximity;

                    // Aphotic depth zone threshold: y > 450.0 px
                    if (o.y > 450.0) {
                        aphoticCount++;
                    }

                    if (o.isAtVent) {
                        ventFeedingCount++;
                    }

                    if (strain <= 0.10 && o.y > 450.0) {
                        piezophilicCount++;
                    } else if (strain <= 0.35 && o.y > 450.0) {
                        piezotolerantCount++;
                    } else if (o.y > 450.0) {
                        piezostrainedCount++;
                    }
                }
            }

            // Hydrothermal vent reservoir telemetry
            let ventSulfurReserve = 0.0;
            let activePlumeParticles = 0;
            const ventCount = Array.isArray(vents) ? vents.length : 0;

            if (Array.isArray(vents)) {
                for (let v = 0; v < vents.length; v++) {
                    const vent = vents[v];
                    if (!vent) continue;
                    ventSulfurReserve += (vent.storedSulfur || 0.0);
                    if (vent.plumeParticles && Array.isArray(vent.plumeParticles)) {
                        activePlumeParticles += vent.plumeParticles.length;
                    }
                }
            }

            // Population arithmetic means
            const meanSulfur = liveCount > 0 ? (totalSulfurStored / liveCount) : 0.0;
            const meanATP = liveCount > 0 ? (totalChemoATP / liveCount) : 0.0;
            const meanBaroStrain = aphoticCount > 0 ? (totalBaroStrain / aphoticCount) : 0.0;
            const meanProximity = liveCount > 0 ? (totalVentProximity / liveCount) : 0.0;
            const aphoticBiomassRatio = liveCount > 0 ? ((aphoticCount / liveCount) * 100.0) : 0.0;

            // 45th Channel: Chemoautotrophic Energy Flux Index (% CEF)
            // Normalized composite index: primary chemosynthetic ATP yield weighted against aphotic biomass
            const rawCEF = liveCount > 0 ? ((totalChemoATP * 25.0 + totalSulfurStored * 0.75) / liveCount) : 0.0;
            const meanCEF = Number.isFinite(rawCEF) ? Math.max(0.0, Math.min(100.0, rawCEF * 18.5)) : 0.0;

            // Qualitative energy regime categorization
            let cefRegime = "NO HYDROTHERMAL FLUX";
            let cefColor = "#71717a";

            if (meanCEF >= 65.0) {
                cefRegime = "HYDROTHERMAL BLOSSOM";
                cefColor = "#eab308";
            } else if (meanCEF >= 40.0) {
                cefRegime = "ACTIVE CHEMOSYNTHESIS";
                cefColor = "#facc15";
            } else if (meanCEF >= 18.0) {
                cefRegime = "PELAGIC SULFUR UPTAKE";
                cefColor = "#ca8a04";
            } else if (meanCEF > 0.0 || aphoticCount > 0) {
                cefRegime = "APHOTIC QUIESCENCE";
                cefColor = "#a1a1aa";
            }

            return {
                liveCount: liveCount,
                aphoticCount: aphoticCount,
                ventFeedingCount: ventFeedingCount,
                meanCEF: Number(meanCEF.toFixed(1)),
                meanSulfur: Number(meanSulfur.toFixed(2)),
                meanATP: Number(meanATP.toFixed(3)),
                meanBaroStrain: Number(meanBaroStrain.toFixed(2)),
                meanProximity: Number((meanProximity * 100.0).toFixed(1)),
                aphoticBiomassRatio: Number(aphoticBiomassRatio.toFixed(1)),
                piezophilicCount: piezophilicCount,
                piezotolerantCount: piezotolerantCount,
                piezostrainedCount: piezostrainedCount,
                ventCount: ventCount,
                ventSulfurReserve: Number(ventSulfurReserve.toFixed(1)),
                activePlumeParticles: activePlumeParticles,
                cefRegime: cefRegime,
                cefColor: cefColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators in real-time.
         * @param {Object} metrics - Telemetry metrics calculated for current tick.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valFluxEl = document.getElementById("valChemoFluxIndex");
            const valStatusEl = document.getElementById("valAbyssalStatus");

            if (valFluxEl) {
                valFluxEl.textContent = metrics.meanCEF.toFixed(1) + "% CEF (" + metrics.cefRegime + ")";
                valFluxEl.style.color = metrics.cefColor;
            }

            if (valStatusEl) {
                valStatusEl.textContent = metrics.ventFeedingCount + " AT VENT (" + metrics.meanATP.toFixed(2) + " ATP) | STRAIN: " + metrics.meanBaroStrain.toFixed(2) + " | S: " + metrics.meanSulfur.toFixed(1) + " | APHOTIC: " + metrics.aphoticBiomassRatio.toFixed(1) + "%";
                valStatusEl.style.color = metrics.ventFeedingCount > 0 ? "#facc15" : "#a1a1aa";
            }
        }

        /**
         * Push new data points to Channel 45 history curve in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.chemoautotrophicEnergyFlux) return;

            const chartVal = Number.isFinite(metrics.meanCEF) ? Math.max(0, Math.min(100, metrics.meanCEF)) : 0;
            historyData.chemoautotrophicEnergyFlux.shift();
            historyData.chemoautotrophicEnergyFlux.push(chartVal);
        }

        /**
         * Composite step executed per simulation tick.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Array<Object>} vents - Active hydrothermal vents.
         * @returns {Object} Calculated metrics.
         */
        static step(organisms, historyData, vents) {
            const metrics = AbyssalTelemetryManager.calculateMetrics(organisms, vents);
            AbyssalTelemetryManager.updateHUD(metrics);
            AbyssalTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Sanitized badge HTML string.
         */
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.cefColor : "#eab308";
            const val = metrics ? metrics.meanCEF.toFixed(1) : "0.0";
            return '<span class="cef-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% CEF</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AbyssalTelemetryManager;
    } else {
        global.AbyssalTelemetryManager = AbyssalTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
