// BioEcosystem - Industrial Revolution Steam Power, Coke Steel & Rail Logistics Telemetry
// Module: src/ui/telemetry_industrial.js
// Version: 13.4.0 (Hour 754 - Looks & UI Agent: 177th Channel % STI, 178th Channel % RLI, Steam Crimson & Rail Steel Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IndustrialTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 177th Telemetry Channel: Steam & Thermodynamic Power Index (% STI) - Steam Crimson (#dc2626, #fca5a5)
     * - 178th Telemetry Channel: Rail Logistics & Industrial Index (% RLI) - Rail Steel (#475569, #94a3b8)
     */
    class IndustrialTelemetryManager {
        /**
         * Classify 177th Channel (% STI) into 4 regimes.
         * @param {number} val - % STI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifySTIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_THERMODYNAMIC_INDUSTRY",
                    label: "APEX HIGH-PRESSURE STEAM & BESSEMER STEEL",
                    badgeClass: "sti-badge sti-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "ROTATIVE_WATT_ENGINE_STEEL",
                    label: "ROTATIVE CONDENSER ENGINE & COKE BLAST STEEL",
                    badgeClass: "sti-badge sti-watt"
                };
            } else if (val >= 25) {
                return {
                    regime: "ATMOSPHERIC_MINE_PUMP",
                    label: "ATMOSPHERIC STEAM PUMP & COAL EXTRACTION",
                    badgeClass: "sti-badge sti-pump"
                };
            } else {
                return {
                    regime: "PRE_INDUSTRIAL_ANIMAL_DRAFT",
                    label: "PRE-INDUSTRIAL MUSCLE & WIND DEPENDENCY",
                    badgeClass: "sti-badge sti-pre"
                };
            }
        }

        /**
         * Classify 178th Channel (% RLI) into 4 regimes.
         * @param {number} val - % RLI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyRLIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_CONTINENTAL_RAIL_GRID",
                    label: "APEX CONTINENTAL RAIL GRID & SYNCHRONIZED FREIGHT",
                    badgeClass: "rli-badge rli-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "STEAM_LOCOMOTIVE_TRUNKLINE",
                    label: "STEAM LOCOMOTIVE TRUNKLINE & STEEL RAILS",
                    badgeClass: "rli-badge rli-rail"
                };
            } else if (val >= 25) {
                return {
                    regime: "HORSE_DRAWN_PLATEWAY",
                    label: "CAST-IRON PLATEWAY & CANAL BARGES",
                    badgeClass: "rli-badge rli-plateway"
                };
            } else {
                return {
                    regime: "PACK_HORSE_TURNPIKE",
                    label: "PACK-HORSE TURNPIKE & SEASONAL MUD ROADS",
                    badgeClass: "rli-badge rli-turnpike"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} industrialManager - IndustrialSteamManager instance.
         */
        static step(organisms, historyData, industrialManager) {
            if (!industrialManager || typeof industrialManager.getMetrics !== "function") return;

            const m = industrialManager.getMetrics();
            const stiVal = Math.max(0, Math.min(100, m.meanSTIIndex || 0));
            const rliVal = Math.max(0, Math.min(100, m.meanRLIIndex || 0));

            if (historyData) {
                if (historyData.steamThermodynamicIndex) {
                    historyData.steamThermodynamicIndex.shift();
                    historyData.steamThermodynamicIndex.push(stiVal);
                }
                if (historyData.railLogisticsIndex) {
                    historyData.railLogisticsIndex.shift();
                    historyData.railLogisticsIndex.push(rliVal);
                }
            }

            const stiReg = IndustrialTelemetryManager.classifySTIRegime(stiVal);
            const rliReg = IndustrialTelemetryManager.classifyRLIRegime(rliVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elSTI = document.getElementById("valSTIIndex");
                const elSTIStatus = document.getElementById("valSTIStatus");
                if (elSTI) {
                    elSTI.textContent = stiVal.toFixed(1) + "% STI (" + stiReg.label + ")";
                }
                if (elSTIStatus) {
                    elSTIStatus.textContent = "CITIZENS: " + (m.totalIndustrialCitizens || 0) + " | STEAM: " + ((m.meanSteamThermodynamics || 0.89) * 100).toFixed(1) + "% | STEEL: " + ((m.meanCokeSteel || 0.89) * 100).toFixed(1) + "% | CYCLES: " + (m.steamBoilerCycles || 0);
                    elSTIStatus.className = stiReg.badgeClass;
                }

                const elRLI = document.getElementById("valRLIIndex");
                const elRLIStatus = document.getElementById("valRLIStatus");
                if (elRLI) {
                    elRLI.textContent = rliVal.toFixed(1) + "% RLI (" + rliReg.label + ")";
                }
                if (elRLIStatus) {
                    elRLIStatus.textContent = "RAIL: " + ((m.meanRailCapacity || 0.89) * 100).toFixed(1) + "% | MULT: " + (m.meanLogisticsMultiplier || 2.50).toFixed(2) + "x | FREIGHT: " + (m.railFreightDeliveries || 0);
                    elRLIStatus.className = rliReg.badgeClass;
                }
            }
        }
    }

    global.IndustrialTelemetryManager = IndustrialTelemetryManager;
})(typeof window !== "undefined" ? window : global);
