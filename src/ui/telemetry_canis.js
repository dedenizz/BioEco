// BioEcosystem - Late Pleistocene Canis lupus familiaris Symbiosis & Bow and Arrow Telemetry
// Module: src/ui/telemetry_canis.js
// Version: 9.84.0 (Hour 704 - Looks & UI Agent: 157th Channel % CDI, 158th Channel % BAI, Wolf Grey & Forest Green Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CanisTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 157th Telemetry Channel: Canine Domestication Index (% CDI) - Wolf Grey & Amber (#64748b, #f59e0b)
     * - 158th Telemetry Channel: Bow & Arrow Ballistics Index (% BAI) - Forest Green & Bowstring Gold (#16a34a, #86efac)
     * - 4 Biological Regimes for % CDI:
     *   1. WILD_COMMENSAL_SCAVENGER (< 25%)
     *   2. INCIPIENT_TAME_CAMP_FOLLOWER (25% - 50%)
     *   3. COOPERATIVE_HUNTING_CANINE (50% - 75%)
     *   4. APEX_DOMESTICATED_PARTNER (> 75%)
     * - 4 Biological Regimes for % BAI:
     *   1. HAND_PROPELLED_DART (< 25%)
     *   2. INCIPIENT_TENSION_BOW (25% - 50%)
     *   3. ACCURATE_FLETCHED_ARCHER (50% - 75%)
     *   4. APEX_LONG_RANGE_BOWMAN (> 75%)
     * - Real-time tracking of canine domestication affinity, olfactory tracking efficiency (%60 reduction in tracking time),
     *   sentinel warning alert barking, Three-Dog Night thermal sharing, mechanical bow tension, and arrow velocity.
     */
    class CanisTelemetryManager {
        /**
         * Initialize Canis telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalDomesticCanines: 0,
                activeHuntingDogs: 0,
                activeSentinels: 0,
                activeArchers: 0,
                activeMicrolithKnappers: 0,
                meanDomesticationAffinity: 0.88,
                meanOlfactoryTracking: 0.89,
                meanSentinelAlert: 0.86,
                meanThermalSharing: 0.81,
                meanBowTension: 0.88,
                meanArrowVelocity: 180.0,
                meanRateOfFire: 3.2,
                meanMicrolithKnapping: 0.88,
                meanCDI: 0.0,
                meanBAI: 0.0,
                cdiRegime: "WILD_COMMENSAL_SCAVENGER",
                baiRegime: "HAND_PROPELLED_DART"
            };
        }

        /**
         * Classify biological regime for 157th Channel (% CDI).
         * @param {number} val - Canine Domestication Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyCDIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "WILD_COMMENSAL_SCAVENGER",
                    label: "WILD COMMENSAL SCAVENGER & TENTATIVE APPROACH",
                    badgeClass: "cdi-badge cdi-wild",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_TAME_CAMP_FOLLOWER",
                    label: "INCIPIENT TAME CAMP FOLLOWER & WASTE GLEANER",
                    badgeClass: "cdi-badge cdi-incipient",
                    color: "#cbd5e1"
                };
            } else if (v < 75.0) {
                return {
                    code: "COOPERATIVE_HUNTING_CANINE",
                    label: "COOPERATIVE HUNTING CANINE & SENTINEL GUARDIAN",
                    badgeClass: "cdi-badge cdi-hunting",
                    color: "#94a3b8"
                };
            } else {
                return {
                    code: "APEX_DOMESTICATED_PARTNER",
                    label: "APEX DOMESTICATED PARTNER & INTERSPECIFIC SYMBIONT",
                    badgeClass: "cdi-badge cdi-apex",
                    color: "#f59e0b"
                };
            }
        }

        /**
         * Classify biological regime for 158th Channel (% BAI).
         * @param {number} val - Bow & Arrow Ballistics Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyBAIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "HAND_PROPELLED_DART",
                    label: "HAND PROPELLED DART & PRE-BOW MECHANICS",
                    badgeClass: "bai-badge bai-dart",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_TENSION_BOW",
                    label: "INCIPIENT TENSION BOW & SHORT FLIGHT",
                    badgeClass: "bai-badge bai-incipient",
                    color: "#86efac"
                };
            } else if (v < 75.0) {
                return {
                    code: "ACCURATE_FLETCHED_ARCHER",
                    label: "ACCURATE FLETCHED ARCHER & FOREST STALKER",
                    badgeClass: "bai-badge bai-archer",
                    color: "#22c55e"
                };
            } else {
                return {
                    code: "APEX_LONG_RANGE_BOWMAN",
                    label: "APEX LONG-RANGE BOWMAN & RAPID QUIVER MASTER",
                    badgeClass: "bai-badge bai-apex",
                    color: "#16a34a"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} canisManager - CanisSymbiosisManager instance.
         */
        static step(organisms, historyData, canisManager) {
            if (!canisManager || typeof canisManager.getMetrics !== "function") return;

            const m = canisManager.getMetrics();
            const cdiVal = Math.max(0, Math.min(100, m.meanCDIIndex || 0));
            const baiVal = Math.max(0, Math.min(100, m.meanBAIIndex || 0));

            // 1. Update 157th & 158th Channel History Buffers
            if (historyData) {
                if (historyData.canineDomesticationIndex) {
                    historyData.canineDomesticationIndex.shift();
                    historyData.canineDomesticationIndex.push(cdiVal);
                }
                if (historyData.bowBallisticsIndex) {
                    historyData.bowBallisticsIndex.shift();
                    historyData.bowBallisticsIndex.push(baiVal);
                }
            }

            // 2. Classify Regimes
            const cdiReg = CanisTelemetryManager.classifyCDIRegime(cdiVal);
            const baiReg = CanisTelemetryManager.classifyBAIRegime(baiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elCDI = document.getElementById("valCDIIndex");
                const elCDIStatus = document.getElementById("valCDIStatus");
                if (elCDI) {
                    elCDI.textContent = cdiVal.toFixed(1) + "% CDI (" + cdiReg.label + ")";
                }
                if (elCDIStatus) {
                    elCDIStatus.textContent = "CANINES: " + (m.totalDomesticCanines || 0) + " | AFFINITY: " + ((m.meanDomesticationAffinity || 0.88) * 100).toFixed(1) + "% | TRACKING: " + ((m.meanOlfactoryTracking || 0.89) * 100).toFixed(1) + "% | SENTINELS: " + (m.activeSentinels || 0) + " | TRACKERS: " + (m.activeHuntingDogs || 0);
                    elCDIStatus.className = cdiReg.badgeClass;
                }

                const elBAI = document.getElementById("valBAIIndex");
                const elBAIStatus = document.getElementById("valBAIStatus");
                if (elBAI) {
                    elBAI.textContent = baiVal.toFixed(1) + "% BAI (" + baiReg.label + ")";
                }
                if (elBAIStatus) {
                    elBAIStatus.textContent = "TENSION: " + ((m.meanBowTension || 0.88) * 100).toFixed(1) + "% | VELOCITY: " + (m.meanArrowVelocity || 180.0).toFixed(1) + " km/h | RATE OF FIRE: " + (m.meanRateOfFire || 3.2).toFixed(1) + "x | ARROWS: " + (m.arrowsLaunched || 0) + " | ARCHERS: " + (m.activeArchers || 0);
                    elBAIStatus.className = baiReg.badgeClass;
                }
            }
        }
    }

    // Export module globally
    global.CanisTelemetryManager = CanisTelemetryManager;

})(typeof window !== "undefined" ? window : global);
