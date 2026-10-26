// BioEcosystem - Seston Filtration Efficiency (% SFE) & Benthic Carbon Flux (% BCF) Telemetry
// Module: src/ui/telemetry_seston.js
// Version: 6.98.0 (Hour 418 - Looks & UI Agent: 80th Channel % BCF & BBL Interception HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SestonTelemetryManager
     * High-precision telemetry tracking for epibenthic seston filtration and boundary layer dynamics:
     * - Channel 79: Seston Filtration Efficiency (% SFE)
     * - Channel 80: Benthic Carbon Flux Interception (% BCF)
     * - Audits tentacular canopy dilation, ciliary current velocity, and micro-vortex intake rates
     * - Quantifies intercepted organic marine snow and suspended carbon assimilation (ATP synthesis)
     * - Monitors silt fouling accumulation, periodic cleansing twitches, and ciliary restoration
     * - Tracks contractile retractile tentacle sheaths and shear stress trauma mitigation
     * - Evaluates gross vertical carbon flux recaptured before irreversible benthic burial
     * - Renders laboratory HUD telemetry indicators, badges, and diagnostic history buffers
     */
    class SestonTelemetryManager {
        /**
         * Calculate dish-wide epibenthic filtration metrics and carbon interception flux.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} sestonManager - Global SestonFiltrationManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive seston telemetry metrics.
         */
        static calculateMetrics(organisms, sestonManager, tick) {
            let liveCount = 0;
            let epibenthicCount = 0;
            let activeFilterCount = 0;
            let shearDeflectedCount = 0;
            let sheathedCount = 0;

            let sumTentacleSpan = 0.0;
            let maxTentacleSpan = 0.0;
            let sumCiliaryVelocity = 0.0;
            let sumCarbonAssimilation = 0.0;
            let sumShearTolerance = 0.0;
            let sumFouling = 0.0;
            let sumSheath = 0.0;
            let sumIndivSFE = 0.0;
            let sumIndivBCF = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const span = org.tentacleSpan || 0.0;
                    const ciliaryVel = org.ciliaryCurrentVelocity || 0.0;
                    const carbon = org.suspendedCarbonAssimilation || 0.0;
                    const shear = org.hydrodynamicShearTolerance || 0.0;
                    const fouling = org.siltFoulingAccumulation || 0.0;
                    const sheath = org.retractileTentacleSheath || 0.0;
                    const sfe = org.sestonFiltrationIndex || 0.0;
                    const bcf = org.benthicCarbonFluxIndex || 0.0;

                    sumTentacleSpan += span;
                    if (span > maxTentacleSpan) maxTentacleSpan = span;
                    sumCiliaryVelocity += ciliaryVel;
                    sumCarbonAssimilation += carbon;
                    sumShearTolerance += shear;
                    sumFouling += fouling;
                    sumSheath += sheath;
                    sumIndivSFE += sfe;
                    sumIndivBCF += bcf;

                    if (org.filterFeedingAdapted) epibenthicCount++;
                    if (org.isEpibenthicFiltering && span > 3.0) activeFilterCount++;
                    if (org.shearDeflection) shearDeflectedCount++;
                    if (org.isSheathRetracted) sheathedCount++;
                }
            }

            const meanTentacleSpan = liveCount > 0 ? (sumTentacleSpan / liveCount) : 0.0;
            const epibenthicPrevalence = liveCount > 0 ? (epibenthicCount / liveCount) : 0.0;
            const activeFilterPrevalence = liveCount > 0 ? (activeFilterCount / liveCount) : 0.0;
            const meanCiliaryVelocity = liveCount > 0 ? (sumCiliaryVelocity / liveCount) : 0.0;
            const meanCarbonAssimilation = liveCount > 0 ? (sumCarbonAssimilation / liveCount) : 0.0;
            const meanShearTolerance = liveCount > 0 ? (sumShearTolerance / liveCount) : 0.0;
            const meanSiltFouling = liveCount > 0 ? (sumFouling / liveCount) : 0.0;
            const meanSheathIntegrity = liveCount > 0 ? (sumSheath / liveCount) : 0.0;

            let interceptedSestonCarbon = 0.0;
            let ciliaryAtpProduced = 0.0;
            let shearDeflectionEvents = 0;
            let cleansingTwitchCount = 0;
            let shearTraumaCount = 0;

            if (sestonManager && sestonManager.metrics) {
                interceptedSestonCarbon = sestonManager.metrics.interceptedSestonCarbon || 0.0;
                ciliaryAtpProduced = sestonManager.metrics.ciliaryAtpProduced || 0.0;
                shearDeflectionEvents = sestonManager.metrics.shearDeflectionEvents || 0;
                cleansingTwitchCount = sestonManager.metrics.cleansingTwitchEvents || 0;
                shearTraumaCount = sestonManager.metrics.shearTraumaCount || 0;
            }

            // Channel 79: % SFE (Seston Filtration Efficiency)
            const spanFactor = Math.min(1.0, meanTentacleSpan / 10.0) * 35.0;
            const ciliaryFactor = Math.min(1.0, meanCiliaryVelocity / 0.50) * 30.0;
            const carbonFactor = Math.min(1.0, meanCarbonAssimilation / 0.035) * 20.0;
            const shearFactor = Math.min(1.0, meanShearTolerance / 0.55) * 15.0;
            const meanSFE = Math.max(0.0, Math.min(100.0, spanFactor + ciliaryFactor + carbonFactor + shearFactor));

            let regimeSFE = "RETRACTED TENTACLES & CURRENT DEFLECTION";
            let colorSFE = "#ef4444";
            if (meanSFE >= 75.0) {
                regimeSFE = "HIGH-AFFINITY CILIARY SUSPENSION CANOPY";
                colorSFE = "#06b6d4";
            } else if (meanSFE >= 50.0) {
                regimeSFE = "STABLE BENTHIC BOUNDARY LAYER INTERCEPTION";
                colorSFE = "#0284c7";
            } else if (meanSFE >= 25.0) {
                regimeSFE = "PARTIAL TENTACULAR CANOPY DILATION";
                colorSFE = "#f59e0b";
            }

            // Channel 80: % BCF (Benthic Carbon Flux / Sediment Interception Ratio)
            const rawBCF = liveCount > 0 ? (sumIndivBCF / liveCount) : 0.0;
            const meanBCF = Math.max(0.0, Math.min(100.0, rawBCF * 100.0));

            let regimeBCF = "CARBON BURIAL & EPIBENTHIC STARVATION";
            let colorBCF = "#ef4444";
            if (meanBCF >= 75.0) {
                regimeBCF = "HIGH-INTERCEPTION SEDIMENT BYPASS FLUX";
                colorBCF = "#8b5cf6";
            } else if (meanBCF >= 50.0) {
                regimeBCF = "STABLE VERTICAL CARBON RECAPTURE";
                colorBCF = "#7c3aed";
            } else if (meanBCF >= 25.0) {
                regimeBCF = "PARTIAL PARTICULATE LEAKAGE TO BENTHOS";
                colorBCF = "#f59e0b";
            }

            return {
                liveCount,
                epibenthicCount,
                epibenthicPrevalence,
                activeFilterCount,
                activeFilterPrevalence,
                shearDeflectedCount,
                sheathedCount,
                meanTentacleSpan,
                maxTentacleSpan,
                meanCiliaryVelocity,
                meanCarbonAssimilation,
                meanShearTolerance,
                meanSiltFouling,
                meanSheathIntegrity,
                interceptedSestonCarbon,
                ciliaryAtpProduced,
                shearDeflectionEvents,
                cleansingTwitchCount,
                shearTraumaCount,
                meanSFE,
                regimeSFE,
                colorSFE,
                meanBCF,
                regimeBCF,
                colorBCF,
                tick: (tick || 0)
            };
        }

        /**
         * Update laboratory HUD elements with 79th and 80th channel telemetry values.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 79: % SFE Index Indicator
            const valSFEIndexEl = document.getElementById("valSFEIndex");
            if (valSFEIndexEl) {
                valSFEIndexEl.textContent = metrics.meanSFE.toFixed(1) + "% SFE (" + metrics.regimeSFE + ")";
                valSFEIndexEl.style.color = metrics.colorSFE;
            }

            // BBL Suspension & Ciliary Vortex Status Indicator
            const valSFEStatusEl = document.getElementById("valSFEStatus");
            if (valSFEStatusEl) {
                valSFEStatusEl.textContent =
                    "EPIBENTHIC CELLS: " + metrics.epibenthicCount + "/" + metrics.liveCount +
                    " | ACTIVE FILTERS: " + metrics.activeFilterCount +
                    " | SPAN: " + metrics.meanTentacleSpan.toFixed(1) + " px" +
                    " | CILIARY VEL: " + metrics.meanCiliaryVelocity.toFixed(2) +
                    " | INTERCEPTED CARBON: " + metrics.interceptedSestonCarbon.toFixed(2) +
                    " | SHEAR DEFLECTIONS: " + metrics.shearDeflectionEvents;
                valSFEStatusEl.style.color = metrics.meanSFE >= 50.0 ? "#38bdf8" : "#7dd3fc";
            }

            // Channel 80: % BCF Index Indicator
            const valBCFIndexEl = document.getElementById("valBCFIndex");
            if (valBCFIndexEl) {
                valBCFIndexEl.textContent = metrics.meanBCF.toFixed(1) + "% BCF (" + metrics.regimeBCF + ")";
                valBCFIndexEl.style.color = metrics.colorBCF;
            }

            // Silt Fouling & Sheath Dynamics Status Indicator
            const valBCFStatusEl = document.getElementById("valBCFStatus");
            if (valBCFStatusEl) {
                valBCFStatusEl.textContent =
                    "SILT FOULING: " + (metrics.meanSiltFouling * 100.0).toFixed(1) + "%" +
                    " | CLEANSING TWITCHES: " + metrics.cleansingTwitchCount +
                    " | SHEATH INTEGRITY: " + (metrics.meanSheathIntegrity * 100.0).toFixed(1) + "%" +
                    " | SHEAR TRAUMA: " + metrics.shearTraumaCount;
                valBCFStatusEl.style.color = metrics.meanBCF >= 50.0 ? "#a78bfa" : "#c4b5fd";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            if (historyData.sestonFiltrationEfficiency) {
                const chartValSFE = Number.isFinite(metrics.meanSFE) ? Math.max(0, Math.min(100, metrics.meanSFE)) : 0;
                historyData.sestonFiltrationEfficiency.shift();
                historyData.sestonFiltrationEfficiency.push(chartValSFE);
            }
            if (historyData.benthicCarbonFlux) {
                const chartValBCF = Number.isFinite(metrics.meanBCF) ? Math.max(0, Math.min(100, metrics.meanBCF)) : 0;
                historyData.benthicCarbonFlux.shift();
                historyData.benthicCarbonFlux.push(chartValBCF);
            }
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} sestonManager - Global SestonFiltrationManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, sestonManager, tick) {
            const metrics = SestonTelemetryManager.calculateMetrics(organisms, sestonManager, tick);
            SestonTelemetryManager.updateHUD(metrics);
            SestonTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Render compact telemetry badge HTML for inspection cards.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Badge HTML snippet.
         */
        static getSFEBadgeHTML(metrics) {
            const color = metrics ? metrics.colorSFE : "#06b6d4";
            const val = metrics ? metrics.meanSFE.toFixed(1) : "0.0";
            return '<span class="sfe-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% SFE</span>';
        }

        static getBCFBadgeHTML(metrics) {
            const color = metrics ? metrics.colorBCF : "#8b5cf6";
            const val = metrics ? metrics.meanBCF.toFixed(1) : "0.0";
            return '<span class="bcf-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BCF</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SestonTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.SestonTelemetryManager = SestonTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
