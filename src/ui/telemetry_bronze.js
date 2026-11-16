// BioEcosystem - Bronze Age Tin-Bronze Alloying, Wheeled Transport & Urban Guilds Telemetry
// Module: src/ui/telemetry_bronze.js
// Version: 10.9.0 (Hour 729 - Looks & UI Agent: 167th Channel % BAI, 168th Channel % WTI, Bronze Gold & Urban Indigo Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BronzeTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 167th Telemetry Channel: Bronze Alloying Index (% BAI) - Bronze Gold (#b45309, #fcd34d)
     * - 168th Telemetry Channel: Wheeled Transport & Urban Index (% WTI) - Urban Indigo (#4f46e5, #a5b4fc)
     */
    class BronzeTelemetryManager {
        /**
         * Classify 167th Channel (% BAI) into 4 regimes.
         * @param {number} val - % BAI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyBAIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_BRONZE_METALLURGIST",
                    label: "APEX BRONZE METALLURGIST & PRECISION ALLOYING",
                    badgeClass: "bai-badge bai-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "TIN_BRONZE_FOUNDRY",
                    label: "TIN-BRONZE FOUNDRY & BIVALVE MOLD MASTERY",
                    badgeClass: "bai-badge bai-foundry"
                };
            } else if (val >= 25) {
                return {
                    regime: "ARSENICAL_BRONZE_TRIAL",
                    label: "ARSENICAL BRONZE TRIAL & OPEN MOLD CASTING",
                    badgeClass: "bai-badge bai-trial"
                };
            } else {
                return {
                    regime: "UNALLOYED_SOFT_COPPER",
                    label: "UNALLOYED SOFT COPPER & EDGE DEFORMATION",
                    badgeClass: "bai-badge bai-copper"
                };
            }
        }

        /**
         * Classify 168th Channel (% WTI) into 4 regimes.
         * @param {number} val - % WTI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyWTIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_URBAN_CITADEL_NETWORK",
                    label: "APEX URBAN CITADEL & CONTINENTAL TRADE NETWORK",
                    badgeClass: "wti-badge wti-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "SPOKED_AXLE_CARAVAN",
                    label: "SPOKED-WHEEL AXLE CARAVAN & CRAFT GUILDS",
                    badgeClass: "wti-badge wti-caravan"
                };
            } else if (val >= 25) {
                return {
                    regime: "SOLID_DISK_CART_DRIVER",
                    label: "SOLID-DISK WHEEL CART & EARLY TRADE TRACK",
                    badgeClass: "wti-badge wti-cart"
                };
            } else {
                return {
                    regime: "PEDESTRIAN_SLEDGE_HAULER",
                    label: "PEDESTRIAN SLEDGE HAULER & LOCAL SUBSISTENCE",
                    badgeClass: "wti-badge wti-sledge"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} bronzeManager - BronzeUrbanismManager instance.
         */
        static step(organisms, historyData, bronzeManager) {
            if (!bronzeManager || typeof bronzeManager.getMetrics !== "function") return;

            const m = bronzeManager.getMetrics();
            const baiVal = Math.max(0, Math.min(100, m.meanBAIIndex || 0));
            const wtiVal = Math.max(0, Math.min(100, m.meanWTIIndex || 0));

            if (historyData) {
                if (historyData.bronzeAlloyingIndex) {
                    historyData.bronzeAlloyingIndex.shift();
                    historyData.bronzeAlloyingIndex.push(baiVal);
                }
                if (historyData.wheeledUrbanIndex) {
                    historyData.wheeledUrbanIndex.shift();
                    historyData.wheeledUrbanIndex.push(wtiVal);
                }
            }

            const baiReg = BronzeTelemetryManager.classifyBAIRegime(baiVal);
            const wtiReg = BronzeTelemetryManager.classifyWTIRegime(wtiVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elBAI = document.getElementById("valBAIIndex");
                const elBAIStatus = document.getElementById("valBAIStatus");
                if (elBAI) {
                    elBAI.textContent = baiVal.toFixed(1) + "% BAI (" + baiReg.label + ")";
                }
                if (elBAIStatus) {
                    elBAIStatus.textContent = "CITIZENS: " + (m.totalBronzeCitizens || 0) + " | TIN ALLOY: " + ((m.meanTinAlloying || 0.89) * 100).toFixed(1) + "% | HARDNESS: " + ((m.meanAlloyHardness || 0.92) * 100).toFixed(1) + "% | INGOTS: " + (m.bronzeIngotsCast || 0);
                    elBAIStatus.className = baiReg.badgeClass;
                }

                const elWTI = document.getElementById("valWTIIndex");
                const elWTIStatus = document.getElementById("valWTIStatus");
                if (elWTI) {
                    elWTI.textContent = wtiVal.toFixed(1) + "% WTI (" + wtiReg.label + ")";
                }
                if (elWTIStatus) {
                    elWTIStatus.textContent = "WHEELS: " + ((m.meanWheeledCapacity || 0.89) * 100).toFixed(1) + "% | GUILDS: " + ((m.meanUrbanSpecialization || 0.89) * 100).toFixed(1) + "% | RANGE: " + (m.meanCaravanRange || 2.05).toFixed(2) + "x | CARAVANS: " + (m.caravanDeliveries || 0);
                    elWTIStatus.className = wtiReg.badgeClass;
                }
            }
        }
    }

    global.BronzeTelemetryManager = BronzeTelemetryManager;
})(typeof window !== "undefined" ? window : global);
