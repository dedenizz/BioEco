// BioEcosystem - Mesolithic Fishery, Barbed Harpoons, Weir Traps & Dugout Canoe Telemetry
// Module: src/ui/telemetry_mesolithic.js
// Version: 9.89.0 (Hour 709 - Looks & UI Agent: 159th Channel % BHI, 160th Channel % WFI, Coral Red & River Turquoise Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MesolithicTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 159th Telemetry Channel: Barbed Harpoon Index (% BHI) - Coral Red & Antler Bone (#f43f5e, #fb7185)
     * - 160th Telemetry Channel: Weir Fishery Index (% WFI) - River Turquoise & Willow Reed (#06b6d4, #22d3ee)
     * - 4 Biological Regimes for % BHI:
     *   1. UNBARBED_SPEAR_FISHER (< 25%)
     *   2. INCIPIENT_SERRATED_POINT (25% - 50%)
     *   3. BARBED_BONE_HARPOONER (50% - 75%)
     *   4. APEX_RIPARIAN_HARPOON_MASTER (> 75%)
     * - 4 Biological Regimes for % WFI:
     *   1. PRIMITIVE_SHALLOW_GLEANER (< 25%)
     *   2. INCIPIENT_WEIR_CONSTRUCTOR (25% - 50%)
     *   3. WOVEN_BASKET_TRAPPER (50% - 75%)
     *   4. APEX_AQUATIC_WEIR_NAVIGATOR (> 75%)
     * - Real-time tracking of uniserial/biserial barbed harpoons, aquatic refraction correction,
     *   riparian stone/stake weirs, woven willow basket traps, dugout canoes, and trophic pressure equilibrium.
     */
    class MesolithicTelemetryManager {
        /**
         * Initialize Mesolithic telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalMesolithicFishers: 0,
                activeHarpooners: 0,
                activeWeirTrappers: 0,
                activeCanoeNavigators: 0,
                meanHarpoonCraft: 0.88,
                meanRefractionCorrection: 0.86,
                meanRetainingTraction: 0.87,
                meanWeirConstruction: 0.88,
                meanBasketTrapEfficiency: 0.89,
                meanPassiveCaloricYield: 0.86,
                meanCanoeCraft: 0.87,
                meanPaddlingVelocity: 2.45,
                meanTrophicEquilibrium: 0.88,
                meanBHIIndex: 0.0,
                meanWFIIndex: 0.0
            };
        }

        /**
         * Classify 159th Channel (% BHI) into 4 biological regimes.
         * @param {number} val - % BHI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyBHIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_RIPARIAN_HARPOON_MASTER",
                    label: "APEX RIPARIAN HARPOON MASTER & REFRACTION BAL",
                    badgeClass: "bhi-badge bhi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "BARBED_BONE_HARPOONER",
                    label: "BARBED BONE HARPOONER & TRACTION LINE",
                    badgeClass: "bhi-badge bhi-harpooner"
                };
            } else if (val >= 25) {
                return {
                    regime: "INCIPIENT_SERRATED_POINT",
                    label: "INCIPIENT SERRATED POINT & SHALLOW STRIKE",
                    badgeClass: "bhi-badge bhi-incipient"
                };
            } else {
                return {
                    regime: "UNBARBED_SPEAR_FISHER",
                    label: "UNBARBED SPEAR FISHER & REFRACTIVE MISS",
                    badgeClass: "bhi-badge bhi-spear"
                };
            }
        }

        /**
         * Classify 160th Channel (% WFI) into 4 biological regimes.
         * @param {number} val - % WFI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyWFIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_AQUATIC_WEIR_NAVIGATOR",
                    label: "APEX AQUATIC WEIR NAVIGATOR & DUGOUT CANOE",
                    badgeClass: "wfi-badge wfi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "WOVEN_BASKET_TRAPPER",
                    label: "WOVEN BASKET TRAPPER & PASSIVE PROTEIN",
                    badgeClass: "wfi-badge wfi-trapper"
                };
            } else if (val >= 25) {
                return {
                    regime: "INCIPIENT_WEIR_CONSTRUCTOR",
                    label: "INCIPIENT WEIR CONSTRUCTOR & STAKE DAM",
                    badgeClass: "wfi-badge wfi-incipient"
                };
            } else {
                return {
                    regime: "PRIMITIVE_SHALLOW_GLEANER",
                    label: "PRIMITIVE SHALLOW GLEANER & LOW CATCH",
                    badgeClass: "wfi-badge wfi-gleaner"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} mesoManager - MesolithicFisheryManager instance.
         */
        static step(organisms, historyData, mesoManager) {
            if (!mesoManager || typeof mesoManager.getMetrics !== "function") return;

            const m = mesoManager.getMetrics();
            const bhiVal = Math.max(0, Math.min(100, m.meanBHIIndex || 0));
            const wfiVal = Math.max(0, Math.min(100, m.meanWFIIndex || 0));

            // 1. Update 159th & 160th Channel History Buffers
            if (historyData) {
                if (historyData.barbedHarpoonIndex) {
                    historyData.barbedHarpoonIndex.shift();
                    historyData.barbedHarpoonIndex.push(bhiVal);
                }
                if (historyData.weirFisheryIndex) {
                    historyData.weirFisheryIndex.shift();
                    historyData.weirFisheryIndex.push(wfiVal);
                }
            }

            // 2. Classify Regimes
            const bhiReg = MesolithicTelemetryManager.classifyBHIRegime(bhiVal);
            const wfiReg = MesolithicTelemetryManager.classifyWFIRegime(wfiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elBHI = document.getElementById("valMesoBHIIndex");
                const elBHIStatus = document.getElementById("valMesoBHIStatus");
                if (elBHI) {
                    elBHI.textContent = bhiVal.toFixed(1) + "% BHI (" + bhiReg.label + ")";
                }
                if (elBHIStatus) {
                    elBHIStatus.textContent = "HARPOONERS: " + (m.activeHarpooners || 0) + " | CRAFT: " + ((m.meanHarpoonCraft || 0.88) * 100).toFixed(1) + "% | REFRACTION: " + ((m.meanRefractionCorrection || 0.86) * 100).toFixed(1) + "% | TRACTION: " + ((m.meanRetainingTraction || 0.87) * 100).toFixed(1) + "% | FISHERS: " + (m.totalMesolithicFishers || 0);
                    elBHIStatus.className = bhiReg.badgeClass;
                }

                const elWFI = document.getElementById("valMesoWFIIndex");
                const elWFIStatus = document.getElementById("valMesoWFIStatus");
                if (elWFI) {
                    elWFI.textContent = wfiVal.toFixed(1) + "% WFI (" + wfiReg.label + ")";
                }
                if (elWFIStatus) {
                    elWFIStatus.textContent = "WEIR DAMS: " + ((m.meanWeirConstruction || 0.88) * 100).toFixed(1) + "% | BASKET TRAPS: " + ((m.meanBasketTrapEfficiency || 0.89) * 100).toFixed(1) + "% | CANOES: " + (m.activeCanoeNavigators || 0) + " | PADDLE: " + (m.meanPaddlingVelocity || 2.45).toFixed(1) + " px/t | TROPHIC EQ: " + ((m.meanTrophicEquilibrium || 0.88) * 100).toFixed(1) + "%";
                    elWFIStatus.className = wfiReg.badgeClass;
                }
            }
        }
    }

    global.MesolithicTelemetryManager = MesolithicTelemetryManager;
})(typeof window !== "undefined" ? window : global);
