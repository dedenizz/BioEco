// BioEcosystem - Miocene-Pliocene Cursorial Ungulate & Hypsodonty Telemetry Dashboard
// Module: src/ui/telemetry_cursorial.js
// Version: 9.55.0 (Hour 675 - Looks & UI Agent: 147th Channel % HEI, 148th Channel % CUI, Meadow Green & Desert Ochre Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CursorialTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 147th Telemetry Channel: Hypsodont Enamel & Grazing Index (% HEI) - Meadow Green / Emerald (#16a34a, #4ade80)
     * - 148th Telemetry Channel: Cursorial Unguligrade & Sprint Index (% CUI) - Desert Ochre / Tawny Gold (#b45309, #f59e0b)
     * - 4 Biological Regimes for % HEI (BRACHYDONT_WOODLAND_BROWSER, MESODONT_MIXED_FEEDER, HYPSODONT_SAVANNA_GRAZER, HYPER_HYPSODONT_STEPPE_TITAN)
     * - 4 Biological Regimes for % CUI (TRIDACTYL_FOREST_TROTTER, SUB_UNGULIGRADE_CANTER, MONODACTYL_SPRING_RUNNER, APEX_CURSORIAL_ESCAPE_TITAN)
     * - Real-time tracking of hypsodont crown height (40-75 mm), cementum wear resistance, silica extraction yield,
     *   monodactyl digit dominance, elastic tendon spring recoil, sprint velocity (2.5-5.2 px/t), and panoramic vigilance.
     */
    class CursorialTelemetryManager {
        /**
         * Initialize Cursorial Ungulate & Hypsodonty telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalCursorialUngulates: 0,
                totalMonodactyls: 0,
                totalTridactyls: 0,
                activeGrazers: 0,
                activeSprinters: 0,
                activeVigilantLookouts: 0,
                meanCrownHeight: 55.0,
                meanCementumResistance: 0.86,
                meanPlisodontRidges: 0.84,
                meanSilicaExtraction: 0.83,
                meanMonodactylDominance: 0.85,
                meanTendonRecoil: 0.86,
                meanSprintVelocity: 3.80,
                meanPanoramicVigilance: 0.84,
                meanCecalThroughput: 0.84,
                meanHEI: 0.0,
                meanCUI: 0.0,
                heiRegime: "BRACHYDONT_WOODLAND_BROWSER",
                cuiRegime: "TRIDACTYL_FOREST_TROTTER"
            };
        }

        /**
         * Classify biological regime for 147th Channel (% HEI).
         * @param {number} val - Hypsodont Enamel Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyHEIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "BRACHYDONT_WOODLAND_BROWSER",
                    label: "BRACHYDONT WOODLAND BROWSER & LEAF NIPPER",
                    badgeClass: "hei-badge hei-brachydont",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "MESODONT_MIXED_FEEDER",
                    label: "MESODONT MIXED FEEDER & BUSH FORAGER",
                    badgeClass: "hei-badge hei-mesodont",
                    color: "#84cc16"
                };
            } else if (v < 75.0) {
                return {
                    code: "HYPSODONT_SAVANNA_GRAZER",
                    label: "HYPSODONT SAVANNA GRAZER & SILICA GRINDER",
                    badgeClass: "hei-badge hei-hypsodont",
                    color: "#16a34a"
                };
            } else {
                return {
                    code: "HYPER_HYPSODONT_STEPPE_TITAN",
                    label: "HYPER-HYPSODONT STEPPE TITAN & ENDLESS FIBER MASTER",
                    badgeClass: "hei-badge hei-titan",
                    color: "#4ade80"
                };
            }
        }

        /**
         * Classify biological regime for 148th Channel (% CUI).
         * @param {number} val - Cursorial Unguligrade Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyCUIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "TRIDACTYL_FOREST_TROTTER",
                    label: "TRIDACTYL FOREST TROTTER & SLOW PROWLER",
                    badgeClass: "cui-badge cui-tridactyl",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "SUB_UNGULIGRADE_CANTER",
                    label: "SUB-UNGULIGRADE CANTER & LATERAL SPREADER",
                    badgeClass: "cui-badge cui-subunguligrade",
                    color: "#d97706"
                };
            } else if (v < 75.0) {
                return {
                    code: "MONODACTYL_SPRING_RUNNER",
                    label: "MONODACTYL SPRING RUNNER & TENDON BOUNDER",
                    badgeClass: "cui-badge cui-monodactyl",
                    color: "#b45309"
                };
            } else {
                return {
                    code: "APEX_CURSORIAL_ESCAPE_TITAN",
                    label: "APEX CURSORIAL ESCAPE TITAN & UNCATCHABLE STEPPE PHANTOM",
                    badgeClass: "cui-badge cui-titan",
                    color: "#f59e0b"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} ungulateManager - UngulateCursorialManager instance.
         */
        static step(organisms, historyData, ungulateManager) {
            if (!ungulateManager || typeof ungulateManager.getMetrics !== "function") return;

            const m = ungulateManager.getMetrics();
            const heiVal = Math.max(0, Math.min(100, m.meanHypsodontIndex || 0));
            const cuiVal = Math.max(0, Math.min(100, m.meanCursorialIndex || 0));

            // 1. Update 147th & 148th Channel History Buffers
            if (historyData) {
                if (historyData.hypsodontEnamelIndex) {
                    historyData.hypsodontEnamelIndex.shift();
                    historyData.hypsodontEnamelIndex.push(heiVal);
                }
                if (historyData.cursorialSprintIndex) {
                    historyData.cursorialSprintIndex.shift();
                    historyData.cursorialSprintIndex.push(cuiVal);
                }
            }

            // 2. Classify Regimes
            const heiReg = CursorialTelemetryManager.classifyHEIRegime(heiVal);
            const cuiReg = CursorialTelemetryManager.classifyCUIRegime(cuiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elHEI = document.getElementById("valHEIIndex");
                const elHEIStatus = document.getElementById("valHEIStatus");
                if (elHEI) {
                    elHEI.textContent = heiVal.toFixed(1) + "%";
                }
                if (elHEIStatus) {
                    elHEIStatus.textContent = heiReg.label;
                    elHEIStatus.className = heiReg.badgeClass;
                }

                const elCUI = document.getElementById("valCUIIndex");
                const elCUIStatus = document.getElementById("valCUIStatus");
                if (elCUI) {
                    elCUI.textContent = cuiVal.toFixed(1) + "%";
                }
                if (elCUIStatus) {
                    elCUIStatus.textContent = cuiReg.label;
                    elCUIStatus.className = cuiReg.badgeClass;
                }
            }
        }
    }

    // Export globally
    global.CursorialTelemetryManager = CursorialTelemetryManager;

})(typeof window !== "undefined" ? window : global);
