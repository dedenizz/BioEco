// BioEcosystem - Late Pleistocene Neanderthal & Composite Weaponry Telemetry Dashboard
// Module: src/ui/telemetry_neanderthal.js
// Version: 9.73.0 (Hour 693 - Looks & UI Agent: 153rd Channel % LPI, 154th Channel % CSI, Glacial Cobalt & Tar Fume Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeanderthalTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 153rd Telemetry Channel: Levallois Prepared-Core Index (% LPI) - Glacial Cobalt (#3b82f6, #93c5fd)
     * - 154th Telemetry Channel: Composite Spear & Hafting Index (% CSI) - Tar Fume Charcoal (#334155, #94a3b8)
     * - 4 Biological Regimes for % LPI:
     *   1. CRUDE_BIFACE_CORE (< 25%)
     *   2. INCIPIENT_TORTOISE_PREPARATION (25% - 50%)
     *   3. LEVALLOIS_POINT_STRIKER (50% - 75%)
     *   4. APEX_PREPARED_CORE_LITHICIAN (> 75%)
     * - 4 Biological Regimes for % CSI:
     *   1. UNHAFTED_HAND_POINT (< 25%)
     *   2. RESIN_BOUND_LANCE (25% - 50%)
     *   3. BIRCH_TAR_COMPOSITE_SPEAR (50% - 75%)
     *   4. APEX_GLACIAL_COMPOSITE_MASTER (> 75%)
     * - Real-time tracking of Levallois core preparation, predetermined flake flaking, raw material yield (4x),
     *   birch tar distillation, composite spear thrust, trauma reduction (%70), and glacial tundra thermoregulation.
     */
    class NeanderthalTelemetryManager {
        /**
         * Initialize Neanderthal telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalNeanderthals: 0,
                activeKnappers: 0,
                activeTarDistillers: 0,
                activeSpearHunters: 0,
                activeColdResistors: 0,
                meanCorePreparation: 0.88,
                meanFlakePredictability: 0.88,
                meanRawMaterialEfficiency: 3.5,
                meanTarYield: 0.85,
                meanSpearThrust: 0.87,
                meanTraumaReduction: 0.76,
                meanThoracicVolume: 0.87,
                meanNasalConditioning: 0.88,
                meanColdResistance: 0.86,
                meanOchrePigmentation: 0.83,
                meanSocialCohesion: 0.84,
                meanLPI: 0.0,
                meanCSI: 0.0,
                lpiRegime: "CRUDE_BIFACE_CORE",
                csiRegime: "UNHAFTED_HAND_POINT"
            };
        }

        /**
         * Classify biological regime for 153rd Channel (% LPI).
         * @param {number} val - Levallois Prepared-Core Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyLPIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "CRUDE_BIFACE_CORE",
                    label: "CRUDE BIFACE CORE & RAW FLAKER",
                    badgeClass: "lpi-badge lpi-crude",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_TORTOISE_PREPARATION",
                    label: "INCIPIENT TORTOISE PREPARATION & FACETED PLATFORM",
                    badgeClass: "lpi-badge lpi-tortoise",
                    color: "#93c5fd"
                };
            } else if (v < 75.0) {
                return {
                    code: "LEVALLOIS_POINT_STRIKER",
                    label: "LEVALLOIS POINT STRIKER & BLADE KNAPPER",
                    badgeClass: "lpi-badge lpi-point",
                    color: "#3b82f6"
                };
            } else {
                return {
                    code: "APEX_PREPARED_CORE_LITHICIAN",
                    label: "APEX PREPARED CORE LITHICIAN & MASTER TOOLMAKER",
                    badgeClass: "lpi-badge lpi-apex",
                    color: "#1d4ed8"
                };
            }
        }

        /**
         * Classify biological regime for 154th Channel (% CSI).
         * @param {number} val - Composite Spear & Hafting Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyCSIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "UNHAFTED_HAND_POINT",
                    label: "UNHAFTED HAND POINT & HIGH RISK IMPACT",
                    badgeClass: "csi-badge csi-unhafted",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "RESIN_BOUND_LANCE",
                    label: "RESIN BOUND LANCE & EXPERIMENTAL HAFT",
                    badgeClass: "csi-badge csi-lance",
                    color: "#64748b"
                };
            } else if (v < 75.0) {
                return {
                    code: "BIRCH_TAR_COMPOSITE_SPEAR",
                    label: "BIRCH TAR COMPOSITE SPEAR & BIG GAME HUNTER",
                    badgeClass: "csi-badge csi-spear",
                    color: "#475569"
                };
            } else {
                return {
                    code: "APEX_GLACIAL_COMPOSITE_MASTER",
                    label: "APEX GLACIAL COMPOSITE MASTER & TUNDRA DOMINATOR",
                    badgeClass: "csi-badge csi-master",
                    color: "#1e293b"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} neanManager - NeanderthalCompositeManager instance.
         */
        static step(organisms, historyData, neanManager) {
            if (!neanManager || typeof neanManager.getMetrics !== "function") return;

            const m = neanManager.getMetrics();
            const lpiVal = Math.max(0, Math.min(100, m.meanLevalloisIndex || 0));
            const csiVal = Math.max(0, Math.min(100, m.meanCompositeIndex || 0));

            // 1. Update 153rd & 154th Channel History Buffers
            if (historyData) {
                if (historyData.levalloisPreparedIndex) {
                    historyData.levalloisPreparedIndex.shift();
                    historyData.levalloisPreparedIndex.push(lpiVal);
                }
                if (historyData.compositeSpearIndex) {
                    historyData.compositeSpearIndex.shift();
                    historyData.compositeSpearIndex.push(csiVal);
                }
            }

            // 2. Classify Regimes
            const lpiReg = NeanderthalTelemetryManager.classifyLPIRegime(lpiVal);
            const csiReg = NeanderthalTelemetryManager.classifyCSIRegime(csiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elLPI = document.getElementById("valLPIIndex");
                const elLPIStatus = document.getElementById("valLPIStatus");
                if (elLPI) {
                    elLPI.textContent = lpiVal.toFixed(1) + "% LPI (" + lpiReg.label + ")";
                }
                if (elLPIStatus) {
                    elLPIStatus.textContent = "NEANDERTHALS: " + (m.totalNeanderthals || 0) + " | PREPARATION: " + ((m.meanCorePreparation || 0.88) * 100).toFixed(1) + "% | PREDICTABLE: " + ((m.meanFlakePredictability || 0.88) * 100).toFixed(1) + "% | EFFICIENCY: " + (m.meanRawMaterialEfficiency || 3.5).toFixed(1) + "x | KNAPPERS: " + (m.activeKnappers || 0);
                    elLPIStatus.className = lpiReg.badgeClass;
                }

                const elCSI = document.getElementById("valCSIIndex");
                const elCSIStatus = document.getElementById("valCSIStatus");
                if (elCSI) {
                    elCSI.textContent = csiVal.toFixed(1) + "% CSI (" + csiReg.label + ")";
                }
                if (elCSIStatus) {
                    elCSIStatus.textContent = "TAR YIELD: " + ((m.meanTarYield || 0.85) * 100).toFixed(1) + "% | THRUST: 3.8x | TRAUMA REDUCTION: " + ((m.meanTraumaReduction || 0.76) * 100).toFixed(1) + "% | DISTILLERS: " + (m.activeTarDistillers || 0) + " | HUNTERS: " + (m.activeSpearHunters || 0);
                    elCSIStatus.className = csiReg.badgeClass;
                }
            }
        }
    }

    // Export module globally
    global.NeanderthalTelemetryManager = NeanderthalTelemetryManager;

})(typeof window !== "undefined" ? window : global);
