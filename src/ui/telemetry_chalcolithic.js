// BioEcosystem - Chalcolithic Copper Metallurgy, Ox Plough & Irrigation Canal Telemetry
// Module: src/ui/telemetry_chalcolithic.js
// Version: 10.4.0 (Hour 724 - Looks & UI Agent: 165th Channel % CMI, 166th Channel % ICI, Copper Orange & Canal Blue Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalcolithicTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 165th Telemetry Channel: Chalcolithic Metallurgy Index (% CMI) - Copper Orange (#d97706, #fbbf24)
     * - 166th Telemetry Channel: Irrigation & Plough Cultivation Index (% ICI) - Canal Blue (#0284c7, #38bdf8)
     * - 4 Biological/Technological Regimes for % CMI:
     *   1. LITHIC_FLINT_TOOLMAKER (< 25%)
     *   2. NATIVE_COPPER_HAMMERER (25% - 50%)
     *   3. SMELTING_KILN_METALLURGIST (50% - 75%)
     *   4. APEX_CHALCOLITHIC_SMITH (>= 75%)
     * - 4 Biological/Technological Regimes for % ICI:
     *   1. RAINFED_DIGGING_STICK (< 25%)
     *   2. EARLY_DITCH_DIVERSION (25% - 50%)
     *   3. OX_PLOUGH_IRRIGATION (50% - 75%)
     *   4. APEX_HYDRAULIC_AGRONOMY (>= 75%)
     */
    class ChalcolithicTelemetryManager {
        /**
         * Classify 165th Channel (% CMI) into 4 regimes.
         * @param {number} val - % CMI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyCMIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_CHALCOLITHIC_SMITH",
                    label: "APEX CHALCOLITHIC SMITH & ALLOY MASTERY",
                    badgeClass: "cmi-badge cmi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "SMELTING_KILN_METALLURGIST",
                    label: "SMELTING KILN METALLURGIST & STONE MOLD CASTING",
                    badgeClass: "cmi-badge cmi-kiln"
                };
            } else if (val >= 25) {
                return {
                    regime: "NATIVE_COPPER_HAMMERER",
                    label: "NATIVE COPPER COLD-HAMMERING & EARLY ANNEALING",
                    badgeClass: "cmi-badge cmi-copper"
                };
            } else {
                return {
                    regime: "LITHIC_FLINT_TOOLMAKER",
                    label: "LITHIC FLINT TOOLMAKER & BRITTLE EDGE FRACTURE",
                    badgeClass: "cmi-badge cmi-lithic"
                };
            }
        }

        /**
         * Classify 166th Channel (% ICI) into 4 regimes.
         * @param {number} val - % ICI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyICIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_HYDRAULIC_AGRONOMY",
                    label: "APEX HYDRAULIC AGRONOMY & ALLUVIAL SURPLUS",
                    badgeClass: "ici-badge ici-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "OX_PLOUGH_IRRIGATION",
                    label: "OX-DRAWN PLOUGH & REGULATED CANAL NETWORK",
                    badgeClass: "ici-badge ici-canal"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_DITCH_DIVERSION",
                    label: "EARLY DITCH DIVERSION & SHALLOW FURROWING",
                    badgeClass: "ici-badge ici-ditch"
                };
            } else {
                return {
                    regime: "RAINFED_DIGGING_STICK",
                    label: "RAINFED DIGGING STICK & DROUGHT VULNERABILITY",
                    badgeClass: "ici-badge ici-rainfed"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} chalcolithicManager - ChalcolithicMetallurgyManager instance.
         */
        static step(organisms, historyData, chalcolithicManager) {
            if (!chalcolithicManager || typeof chalcolithicManager.getMetrics !== "function") return;

            const m = chalcolithicManager.getMetrics();
            const cmiVal = Math.max(0, Math.min(100, m.meanCMIIndex || 0));
            const iciVal = Math.max(0, Math.min(100, m.meanICIIndex || 0));

            // 1. Update 165th & 166th Channel History Buffers
            if (historyData) {
                if (historyData.chalcolithicMetallurgyIndex) {
                    historyData.chalcolithicMetallurgyIndex.shift();
                    historyData.chalcolithicMetallurgyIndex.push(cmiVal);
                }
                if (historyData.irrigationCultivationIndex) {
                    historyData.irrigationCultivationIndex.shift();
                    historyData.irrigationCultivationIndex.push(iciVal);
                }
            }

            // 2. Classify Regimes
            const cmiReg = ChalcolithicTelemetryManager.classifyCMIRegime(cmiVal);
            const iciReg = ChalcolithicTelemetryManager.classifyICIRegime(iciVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elCMI = document.getElementById("valCMIIndex");
                const elCMIStatus = document.getElementById("valCMIStatus");
                if (elCMI) {
                    elCMI.textContent = cmiVal.toFixed(1) + "% CMI (" + cmiReg.label + ")";
                }
                if (elCMIStatus) {
                    elCMIStatus.textContent = "ARTISANS: " + (m.totalChalcolithicArtisans || 0) + " | SMELTING: " + ((m.meanCopperSmelting || 0.89) * 100).toFixed(1) + "% | DURABILITY: " + ((m.meanToolDurability || 0.91) * 100).toFixed(1) + "% | INGOTS: " + (m.copperIngotsCast || 0);
                    elCMIStatus.className = cmiReg.badgeClass;
                }

                const elICI = document.getElementById("valICIIndex");
                const elICIStatus = document.getElementById("valICIStatus");
                if (elICI) {
                    elICI.textContent = iciVal.toFixed(1) + "% ICI (" + iciReg.label + ")";
                }
                if (elICIStatus) {
                    elICIStatus.textContent = "PLOUGH: " + ((m.meanOxPloughTillage || 0.88) * 100).toFixed(1) + "% | CANALS: " + ((m.meanCanalHydraulics || 0.89) * 100).toFixed(1) + "% | MULT: " + (m.meanIrrigatedMultiplier || 1.95).toFixed(2) + "x | HARVESTS: " + (m.irrigatedHarvestEvents || 0);
                    elICIStatus.className = iciReg.badgeClass;
                }
            }
        }
    }

    global.ChalcolithicTelemetryManager = ChalcolithicTelemetryManager;
})(typeof window !== "undefined" ? window : global);
