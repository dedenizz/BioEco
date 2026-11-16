// BioEcosystem - Renaissance Printing Press, Mechanical Clockwork & Empirical Astronomy Telemetry
// Module: src/ui/telemetry_renaissance.js
// Version: 12.9.0 (Hour 749 - Looks & UI Agent: 175th Channel % PPI, 176th Channel % CAI, Press Purple & Astronomy Gold Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * RenaissanceTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 175th Telemetry Channel: Printing Press & Knowledge Diffusion Index (% PPI) - Press Purple (#9333ea, #d8b4fe)
     * - 176th Telemetry Channel: Clockwork & Astronomical Navigation Index (% CAI) - Astronomy Gold (#eab308, #fef08a)
     */
    class RenaissanceTelemetryManager {
        /**
         * Classify 175th Channel (% PPI) into 4 regimes.
         * @param {number} val - % PPI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyPPIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_RENAISSANCE_ENLIGHTENMENT",
                    label: "APEX RENAISSANCE PRESS & UNIVERSAL LITERACY",
                    badgeClass: "ppi-badge ppi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "MOVABLE_TYPE_FOUNDRY",
                    label: "MOVABLE METAL TYPE & SCIENTIFIC MONOGRAPH",
                    badgeClass: "ppi-badge ppi-foundry"
                };
            } else if (val >= 25) {
                return {
                    regime: "WOODBLOCK_IMPRINT_SHOP",
                    label: "WOODBLOCK PRINT & PAMPHLET CIRCULATION",
                    badgeClass: "ppi-badge ppi-woodblock"
                };
            } else {
                return {
                    regime: "SCRIBAL_MANUSCRIPT_MONOPOLY",
                    label: "HAND-COPIED MANUSCRIPT & SLOW DIFFUSION",
                    badgeClass: "ppi-badge ppi-scribal"
                };
            }
        }

        /**
         * Classify 176th Channel (% CAI) into 4 regimes.
         * @param {number} val - % CAI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyCAIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_EMPIRICAL_ASTRONOMY",
                    label: "APEX EMPIRICAL ASTRONOMY & PRECISION HOROLOGY",
                    badgeClass: "cai-badge cai-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "REFRACTING_TELESCOPE_OBSERVATORY",
                    label: "REFRACTING TELESCOPE & SPRING CHRONOMETER",
                    badgeClass: "cai-badge cai-telescope"
                };
            } else if (val >= 25) {
                return {
                    regime: "VERGE_FOLIOT_TOWER_CLOCK",
                    label: "VERGE-AND-FOLIOT CLOCK & BRASS ASTROLABE",
                    badgeClass: "cai-badge cai-clock"
                };
            } else {
                return {
                    regime: "SUNDIAL_NAKED_EYE",
                    label: "SUNDIAL TIMEKEEPING & NAKED-EYE EPHEMERIS",
                    badgeClass: "cai-badge cai-sundial"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} renaissanceManager - RenaissancePrintingManager instance.
         */
        static step(organisms, historyData, renaissanceManager) {
            if (!renaissanceManager || typeof renaissanceManager.getMetrics !== "function") return;

            const m = renaissanceManager.getMetrics();
            const ppiVal = Math.max(0, Math.min(100, m.meanPPIIndex || 0));
            const caiVal = Math.max(0, Math.min(100, m.meanCAIIndex || 0));

            if (historyData) {
                if (historyData.printingPressIndex) {
                    historyData.printingPressIndex.shift();
                    historyData.printingPressIndex.push(ppiVal);
                }
                if (historyData.clockworkAstronomyIndex) {
                    historyData.clockworkAstronomyIndex.shift();
                    historyData.clockworkAstronomyIndex.push(caiVal);
                }
            }

            const ppiReg = RenaissanceTelemetryManager.classifyPPIRegime(ppiVal);
            const caiReg = RenaissanceTelemetryManager.classifyCAIRegime(caiVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elPPI = document.getElementById("valPPIIndex");
                const elPPIStatus = document.getElementById("valPPIStatus");
                if (elPPI) {
                    elPPI.textContent = ppiVal.toFixed(1) + "% PPI (" + ppiReg.label + ")";
                }
                if (elPPIStatus) {
                    elPPIStatus.textContent = "SCHOLARS: " + (m.totalRenaissanceScholars || 0) + " | PRESS: " + ((m.meanPrintingRate || 0.89) * 100).toFixed(1) + "% | DIFFUSION: " + (m.meanDiffusionMultiplier || 2.05).toFixed(2) + "x | BOOKS: " + (m.treatisesPrinted || 0);
                    elPPIStatus.className = ppiReg.badgeClass;
                }

                const elCAI = document.getElementById("valCAIIndex");
                const elCAIStatus = document.getElementById("valCAIStatus");
                if (elCAI) {
                    elCAI.textContent = caiVal.toFixed(1) + "% CAI (" + caiReg.label + ")";
                }
                if (elCAIStatus) {
                    elCAIStatus.textContent = "CLOCK: " + ((m.meanClockPrecision || 0.89) * 100).toFixed(1) + "% | TELESCOPE: " + ((m.meanTelescopeResolution || 0.89) * 100).toFixed(1) + "% | OBS: " + (m.celestialObservations || 0);
                    elCAIStatus.className = caiReg.badgeClass;
                }
            }
        }
    }

    global.RenaissanceTelemetryManager = RenaissanceTelemetryManager;
})(typeof window !== "undefined" ? window : global);
