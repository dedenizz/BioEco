// BioEcosystem - Classical Antiquity Watermills, Aqueduct Hydraulics & Crop Rotation Telemetry
// Module: src/ui/telemetry_classical.js
// Version: 11.9.0 (Hour 739 - Looks & UI Agent: 171st Channel % WHI, 172nd Channel % CRI, Aqueduct Sapphire & Agronomy Emerald Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ClassicalTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 171st Telemetry Channel: Watermill & Aqueduct Hydraulics Index (% WHI) - Aqueduct Sapphire (#0369a1, #38bdf8)
     * - 172nd Telemetry Channel: Crop Rotation & Agronomy Index (% CRI) - Agronomy Emerald (#15803d, #4ade80)
     */
    class ClassicalTelemetryManager {
        /**
         * Classify 171st Channel (% WHI) into 4 regimes.
         * @param {number} val - % WHI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyWHIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_CLASSICAL_HYDRAULICS",
                    label: "APEX OVERSHOT WATERMILL & IMPERIAL AQUEDUCT GRID",
                    badgeClass: "whi-badge whi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "UNDERSHOT_WATERMILL_AQUEDUCT",
                    label: "UNDERSHOT WATERMILL & STONE AQUEDUCT",
                    badgeClass: "whi-badge whi-aqueduct"
                };
            } else if (val >= 25) {
                return {
                    regime: "HORSE_MILL_CONDUIT",
                    label: "ANIMAL-DRIVEN MILL & CLAY PIPE CONDUIT",
                    badgeClass: "whi-badge whi-conduit"
                };
            } else {
                return {
                    regime: "MANUAL_QUERN_WELL",
                    label: "MANUAL ROTARY QUERN & LOCAL SHALLOW WELL",
                    badgeClass: "whi-badge whi-quern"
                };
            }
        }

        /**
         * Classify 172nd Channel (% CRI) into 4 regimes.
         * @param {number} val - % CRI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyCRIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_AGRONOMIC_SYMBIOSIS",
                    label: "APEX AGRONOMIC SYMBIOSIS & PERPETUAL SOIL FERTILITY",
                    badgeClass: "cri-badge cri-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "THREE_FIELD_LEGUME_ROTATION",
                    label: "THREE-FIELD CEREAL & LEGUME NITROGEN FIXATION",
                    badgeClass: "cri-badge cri-rotation"
                };
            } else if (val >= 25) {
                return {
                    regime: "TWO_FIELD_FALLOW",
                    label: "TWO-FIELD BIENNIAL FALLOW CYCLE",
                    badgeClass: "cri-badge cri-fallow"
                };
            } else {
                return {
                    regime: "MONOCULTURE_SOIL_DEPLETION",
                    label: "CONTINUOUS MONOCULTURE & NITROGEN EXHAUSTION",
                    badgeClass: "cri-badge cri-depletion"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} classicalManager - ClassicalHydraulicsManager instance.
         */
        static step(organisms, historyData, classicalManager) {
            if (!classicalManager || typeof classicalManager.getMetrics !== "function") return;

            const m = classicalManager.getMetrics();
            const whiVal = Math.max(0, Math.min(100, m.meanWHIIndex || 0));
            const criVal = Math.max(0, Math.min(100, m.meanCRIIndex || 0));

            if (historyData) {
                if (historyData.watermillHydraulicsIndex) {
                    historyData.watermillHydraulicsIndex.shift();
                    historyData.watermillHydraulicsIndex.push(whiVal);
                }
                if (historyData.cropRotationIndex) {
                    historyData.cropRotationIndex.shift();
                    historyData.cropRotationIndex.push(criVal);
                }
            }

            const whiReg = ClassicalTelemetryManager.classifyWHIRegime(whiVal);
            const criReg = ClassicalTelemetryManager.classifyCRIRegime(criVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elWHI = document.getElementById("valWHIIndex");
                const elWHIStatus = document.getElementById("valWHIStatus");
                if (elWHI) {
                    elWHI.textContent = whiVal.toFixed(1) + "% WHI (" + whiReg.label + ")";
                }
                if (elWHIStatus) {
                    elWHIStatus.textContent = "CITIZENS: " + (m.totalClassicalCitizens || 0) + " | MILL TORQUE: " + ((m.meanWatermillTorque || 0.89) * 100).toFixed(1) + "% | AQUEDUCT: " + ((m.meanAqueductFlow || 0.89) * 100).toFixed(1) + "% | FLOUR: " + (m.watermillFlourMilled || 0);
                    elWHIStatus.className = whiReg.badgeClass;
                }

                const elCRI = document.getElementById("valCRIIndex");
                const elCRIStatus = document.getElementById("valCRIStatus");
                if (elCRI) {
                    elCRI.textContent = criVal.toFixed(1) + "% CRI (" + criReg.label + ")";
                }
                if (elCRIStatus) {
                    elCRIStatus.textContent = "ROTATION: " + ((m.meanCropRotationFertility || 0.89) * 100).toFixed(1) + "% | LEGUME N2: " + (m.meanLegumeSurplus || 1.85).toFixed(2) + "x | CYCLES: " + (m.nitrogenRotationCycles || 0);
                    elCRIStatus.className = criReg.badgeClass;
                }
            }
        }
    }

    global.ClassicalTelemetryManager = ClassicalTelemetryManager;
})(typeof window !== "undefined" ? window : global);
