// BioEcosystem - Pliocene Early Hominin Bipedalism Telemetry Dashboard
// Module: src/ui/telemetry_hominin.js
// Version: 9.61.0 (Hour 681 - Looks & UI Agent: 149th Channel % BAI, 150th Channel % TMI, Terracotta & Anthracite Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HomininTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 149th Telemetry Channel: Bipedal Alignment & Striding Index (% BAI) - Terracotta / Burnt Orange (#ea580c, #fb923c)
     * - 150th Telemetry Channel: Tool Manipulation & Lithic Index (% TMI) - Anthracite / Slate Grey (#475569, #94a3b8)
     * - 4 Biological Regimes for % BAI (QUADRUPEDAL_ARBOREAL_CLIMBER, FACULTATIVE_BIPEDAL_WADDLER, HABITUAL_STRIDING_HOMININ, APEX_BIPEDAL_ENDURANCE_WALKER)
     * - 4 Biological Regimes for % TMI (NON_TOOL_ORGANIC_FORAGER, OPPORTUNISTIC_COBBLE_USER, OLDOWAN_LITHIC_KNAPPER, MASTER_TOOLMAKER_HOMININ)
     * - Real-time tracking of femur valgus angle (8-14 deg), iliac blade flare, adducted hallux stability,
     *   plantar arch compliance, opposable thumb precision grip, and Oldowan lithic marrow extraction.
     */
    class HomininTelemetryManager {
        /**
         * Initialize Hominin telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalHominins: 0,
                activeBipedalWalkers: 0,
                activeToolKnappers: 0,
                activeMarrowForagers: 0,
                meanValgusAngle: 10.5,
                meanIliacFlare: 0.86,
                meanHalluxStability: 0.86,
                meanPlantarArch: 0.85,
                meanPrecisionGrip: 0.87,
                meanPercussionFlaking: 0.84,
                meanMarrowHarvestYield: 0.84,
                meanLipidBonus: 0.83,
                meanBAI: 0.0,
                meanTMI: 0.0,
                baiRegime: "QUADRUPEDAL_ARBOREAL_CLIMBER",
                tmiRegime: "NON_TOOL_ORGANIC_FORAGER"
            };
        }

        /**
         * Classify biological regime for 149th Channel (% BAI).
         * @param {number} val - Bipedal Alignment Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyBAIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "QUADRUPEDAL_ARBOREAL_CLIMBER",
                    label: "QUADRUPEDAL ARBOREAL CLIMBER & BRANCH SWINGER",
                    badgeClass: "bai-badge bai-quadruped",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "FACULTATIVE_BIPEDAL_WADDLER",
                    label: "FACULTATIVE BIPEDAL WADDLER & OCCASIONAL STANDER",
                    badgeClass: "bai-badge bai-waddler",
                    color: "#f97316"
                };
            } else if (v < 75.0) {
                return {
                    code: "HABITUAL_STRIDING_HOMININ",
                    label: "HABITUAL STRIDING HOMININ & SAVANNA SCOUT",
                    badgeClass: "bai-badge bai-striding",
                    color: "#ea580c"
                };
            } else {
                return {
                    code: "APEX_BIPEDAL_ENDURANCE_WALKER",
                    label: "APEX BIPEDAL ENDURANCE WALKER & STEPPE TREKKER",
                    badgeClass: "bai-badge bai-endurance",
                    color: "#fb923c"
                };
            }
        }

        /**
         * Classify biological regime for 150th Channel (% TMI).
         * @param {number} val - Tool Manipulation Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyTMIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "NON_TOOL_ORGANIC_FORAGER",
                    label: "NON-TOOL ORGANIC FORAGER & HAND SCRAPER",
                    badgeClass: "tmi-badge tmi-nontool",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "OPPORTUNISTIC_COBBLE_USER",
                    label: "OPPORTUNISTIC COBBLE USER & SHELL BASHER",
                    badgeClass: "tmi-badge tmi-cobble",
                    color: "#64748b"
                };
            } else if (v < 75.0) {
                return {
                    code: "OLDOWAN_LITHIC_KNAPPER",
                    label: "OLDOWAN LITHIC KNAPPER & MARROW FORAGER",
                    badgeClass: "tmi-badge tmi-oldowan",
                    color: "#475569"
                };
            } else {
                return {
                    code: "MASTER_TOOLMAKER_HOMININ",
                    label: "MASTER TOOLMAKER HOMININ & COGNITIVE LITHIC PIONEER",
                    badgeClass: "tmi-badge tmi-master",
                    color: "#94a3b8"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} homininManager - HomininBipedalismManager instance.
         */
        static step(organisms, historyData, homininManager) {
            if (!homininManager || typeof homininManager.getMetrics !== "function") return;

            const m = homininManager.getMetrics();
            const baiVal = Math.max(0, Math.min(100, m.meanBipedalIndex || 0));
            const tmiVal = Math.max(0, Math.min(100, m.meanToolIndex || 0));

            // 1. Update 149th & 150th Channel History Buffers
            if (historyData) {
                if (historyData.bipedalAlignmentIndex) {
                    historyData.bipedalAlignmentIndex.shift();
                    historyData.bipedalAlignmentIndex.push(baiVal);
                }
                if (historyData.toolManipulationIndex) {
                    historyData.toolManipulationIndex.shift();
                    historyData.toolManipulationIndex.push(tmiVal);
                }
            }

            // 2. Classify Regimes
            const baiReg = HomininTelemetryManager.classifyBAIRegime(baiVal);
            const tmiReg = HomininTelemetryManager.classifyTMIRegime(tmiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elBAI = document.getElementById("valBAIIndex");
                const elBAIStatus = document.getElementById("valBAIStatus");
                if (elBAI) {
                    elBAI.textContent = baiVal.toFixed(1) + "%";
                }
                if (elBAIStatus) {
                    elBAIStatus.textContent = baiReg.label;
                    elBAIStatus.className = baiReg.badgeClass;
                }

                const elTMI = document.getElementById("valTMIIndex");
                const elTMIStatus = document.getElementById("valTMIStatus");
                if (elTMI) {
                    elTMI.textContent = tmiVal.toFixed(1) + "%";
                }
                if (elTMIStatus) {
                    elTMIStatus.textContent = tmiReg.label;
                    elTMIStatus.className = tmiReg.badgeClass;
                }
            }
        }
    }

    // Export globally
    global.HomininTelemetryManager = HomininTelemetryManager;

})(typeof window !== "undefined" ? window : global);
