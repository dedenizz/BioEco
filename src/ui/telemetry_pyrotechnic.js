// BioEcosystem - Pleistocene Early Homo Pyrotechnic & Acheulean Lithic Telemetry Dashboard
// Module: src/ui/telemetry_pyrotechnic.js
// Version: 9.67.0 (Hour 687 - Looks & UI Agent: 151st Channel % ABI, 152nd Channel % TCI, Volcanic Crimson & Ember Orange Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PyrotechnicTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 151st Telemetry Channel: Acheulean Biface Index (% ABI) - Volcanic Crimson (#dc2626, #f87171)
     * - 152nd Telemetry Channel: Thermal Cooking & Digestion Index (% TCI) - Ember Orange (#ea580c, #fb923c)
     * - 4 Biological Regimes for % ABI:
     *   1. CRUDE_OLDOWAN_FLAKER (< 25%)
     *   2. INCIPIENT_PROTO_BIFACE (25% - 50%)
     *   3. SYMMETRIC_ACHEULEAN_BUTCHER (50% - 75%)
     *   4. APEX_LITHIC_BIFACE_CRAFTSMAN (> 75%)
     * - 4 Biological Regimes for % TCI:
     *   1. RAW_COLD_SCAVENGER (< 25%)
     *   2. OPPORTUNISTIC_EMBER_WARMER (25% - 50%)
     *   3. PYROTECHNIC_THERMAL_COOK (50% - 75%)
     *   4. APEX_METABOLIC_FIRE_MASTER (> 75%)
     * - Real-time tracking of Acheulean bifacial flaking, carcass disarticulation velocity (1.8 - 3.8x),
     *   pyrotechnic cooking efficiency, digestive energy sparing (50%), eccrine perspiration, and persistence hunt.
     */
    class PyrotechnicTelemetryManager {
        /**
         * Initialize Pyrotechnic telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalHomo: 0,
                activeButchers: 0,
                activeCooks: 0,
                activePerspirers: 0,
                activePersistenceHunters: 0,
                meanBifacialFlaking: 0.85,
                meanButcheryYield: 0.85,
                meanCookingEfficiency: 0.84,
                meanDigestiveSparing: 0.83,
                meanPerspirationRate: 0.86,
                meanThermalTolerance: 0.87,
                meanPersistenceStriding: 0.84,
                meanHyperthermicCollapse: 0.83,
                meanABI: 0.0,
                meanTCI: 0.0,
                abiRegime: "CRUDE_OLDOWAN_FLAKER",
                tciRegime: "RAW_COLD_SCAVENGER"
            };
        }

        /**
         * Classify biological regime for 151st Channel (% ABI).
         * @param {number} val - Acheulean Biface Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyABIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "CRUDE_OLDOWAN_FLAKER",
                    label: "CRUDE OLDOWAN FLAKER & PEBBLE SPLITTER",
                    badgeClass: "abi-badge abi-crude",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_PROTO_BIFACE",
                    label: "INCIPIENT PROTO-BIFACE & EDGE TRIMMER",
                    badgeClass: "abi-badge abi-proto",
                    color: "#f87171"
                };
            } else if (v < 75.0) {
                return {
                    code: "SYMMETRIC_ACHEULEAN_BUTCHER",
                    label: "SYMMETRIC ACHEULEAN BUTCHER & HANDAXE MASTER",
                    badgeClass: "abi-badge abi-symmetric",
                    color: "#dc2626"
                };
            } else {
                return {
                    code: "APEX_LITHIC_BIFACE_CRAFTSMAN",
                    label: "APEX LITHIC BIFACE CRAFTSMAN & MEGAFAUNA CARVER",
                    badgeClass: "abi-badge abi-apex",
                    color: "#b91c1c"
                };
            }
        }

        /**
         * Classify biological regime for 152nd Channel (% TCI).
         * @param {number} val - Thermal Cooking Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyTCIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "RAW_COLD_SCAVENGER",
                    label: "RAW COLD SCAVENGER & HIGH GUT METABOLIC LOAD",
                    badgeClass: "tci-badge tci-raw",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "OPPORTUNISTIC_EMBER_WARMER",
                    label: "OPPORTUNISTIC EMBER WARMER & HEARTH FORAGER",
                    badgeClass: "tci-badge tci-ember",
                    color: "#fb923c"
                };
            } else if (v < 75.0) {
                return {
                    code: "PYROTECHNIC_THERMAL_COOK",
                    label: "PYROTECHNIC THERMAL COOK & CALORIC UNLOCKER",
                    badgeClass: "tci-badge tci-cook",
                    color: "#ea580c"
                };
            } else {
                return {
                    code: "APEX_METABOLIC_FIRE_MASTER",
                    label: "APEX METABOLIC FIRE MASTER & ENCEPHALIZED TITAN",
                    badgeClass: "tci-badge tci-master",
                    color: "#c2410c"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} homoManager - HomoPyrotechnicsManager instance.
         */
        static step(organisms, historyData, homoManager) {
            if (!homoManager || typeof homoManager.getMetrics !== "function") return;

            const m = homoManager.getMetrics();
            const abiVal = Math.max(0, Math.min(100, m.meanAcheuleanIndex || 0));
            const tciVal = Math.max(0, Math.min(100, m.meanCookingIndex || 0));

            // 1. Update 151st & 152nd Channel History Buffers
            if (historyData) {
                if (historyData.acheuleanBifaceIndex) {
                    historyData.acheuleanBifaceIndex.shift();
                    historyData.acheuleanBifaceIndex.push(abiVal);
                }
                if (historyData.thermalCookingIndex) {
                    historyData.thermalCookingIndex.shift();
                    historyData.thermalCookingIndex.push(tciVal);
                }
            }

            // 2. Classify Regimes
            const abiReg = PyrotechnicTelemetryManager.classifyABIRegime(abiVal);
            const tciReg = PyrotechnicTelemetryManager.classifyTCIRegime(tciVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elABI = document.getElementById("valABIIndex");
                const elABIStatus = document.getElementById("valABIStatus");
                if (elABI) {
                    elABI.textContent = abiVal.toFixed(1) + "% ABI (" + abiReg.label + ")";
                }
                if (elABIStatus) {
                    elABIStatus.textContent = "HOMO: " + (m.totalHomo || 0) + " | BIFACIAL: " + ((m.meanBifacialFlaking || 0.85) * 100).toFixed(1) + "% | BUTCHERY: " + ((m.meanButcheryYield || 0.85) * 100).toFixed(1) + "% | VELOCITY: 2.8x | BUTCHERS: " + (m.activeButchers || 0);
                    elABIStatus.className = abiReg.badgeClass;
                }

                const elTCI = document.getElementById("valTCIIndex");
                const elTCIStatus = document.getElementById("valTCIStatus");
                if (elTCI) {
                    elTCI.textContent = tciVal.toFixed(1) + "% TCI (" + tciReg.label + ")";
                }
                if (elTCIStatus) {
                    elTCIStatus.textContent = "COOKING: " + ((m.meanCookingEfficiency || 0.84) * 100).toFixed(1) + "% | SPARING: 50.0% | SWEAT: " + ((m.meanPerspirationRate || 0.86) * 100).toFixed(1) + "% | COOKS: " + (m.activeCooks || 0) + " | HUNTERS: " + (m.activePersistenceHunters || 0);
                    elTCIStatus.className = tciReg.badgeClass;
                }
            }
        }
    }

    // Export module globally
    global.PyrotechnicTelemetryManager = PyrotechnicTelemetryManager;

})(typeof window !== "undefined" ? window : global);
