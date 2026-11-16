// BioEcosystem - Iron Age Bloomery Smelting, Carburized Steel & Maritime Trade Telemetry
// Module: src/ui/telemetry_iron.js
// Version: 11.4.0 (Hour 734 - Looks & UI Agent: 169th Channel % ISI, 170th Channel % MTI, Steel Slate & Maritime Teal Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IronTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 169th Telemetry Channel: Iron Smelting & Steel Index (% ISI) - Steel Slate (#64748b, #cbd5e1)
     * - 170th Telemetry Channel: Maritime Trade & Navigation Index (% MTI) - Maritime Teal (#0d9488, #5eead4)
     */
    class IronTelemetryManager {
        /**
         * Classify 169th Channel (% ISI) into 4 regimes.
         * @param {number} val - % ISI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyISIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_IRON_STEEL_FOUNDRY",
                    label: "APEX IRON & STEEL FOUNDRY & DEEP-PLOUGH MASTERY",
                    badgeClass: "isi-badge isi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "CARBURIZED_STEEL_SMITHY",
                    label: "CARBURIZED STEEL SMITHY & QUENCHED EDGE",
                    badgeClass: "isi-badge isi-steel"
                };
            } else if (val >= 25) {
                return {
                    regime: "BLOOMERY_SPONGE_IRON",
                    label: "BLOOMERY SPONGE IRON & SOFT WROUGHT FORGING",
                    badgeClass: "isi-badge isi-bloomery"
                };
            } else {
                return {
                    regime: "TIN_STARVED_BRONZE_RECESSION",
                    label: "TIN-STARVED BRONZE RECESSION & ORE SCARCITY",
                    badgeClass: "isi-badge isi-recession"
                };
            }
        }

        /**
         * Classify 170th Channel (% MTI) into 4 regimes.
         * @param {number} val - % MTI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyMTIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_MARITIME_THALASSOCRACY",
                    label: "APEX MARITIME THALASSOCRACY & OCEANIC LEDGER NETWORK",
                    badgeClass: "mti-badge mti-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "KEELED_MERCHANT_GALLEY",
                    label: "KEELED MERCHANT GALLEY & CUNEIFORM LEDGERS",
                    badgeClass: "mti-badge mti-galley"
                };
            } else if (val >= 25) {
                return {
                    regime: "RIVERINE_REED_BARGE",
                    label: "RIVERINE REED BARGE & BASIC TALLY MARKS",
                    badgeClass: "mti-badge mti-barge"
                };
            } else {
                return {
                    regime: "LANDLOCKED_COASTAL_BARTER",
                    label: "LANDLOCKED COASTAL BARTER & SHORT-HAUL RAFTS",
                    badgeClass: "mti-badge mti-landlocked"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} ironManager - IronMaritimeManager instance.
         */
        static step(organisms, historyData, ironManager) {
            if (!ironManager || typeof ironManager.getMetrics !== "function") return;

            const m = ironManager.getMetrics();
            const isiVal = Math.max(0, Math.min(100, m.meanISIIndex || 0));
            const mtiVal = Math.max(0, Math.min(100, m.meanMTIIndex || 0));

            if (historyData) {
                if (historyData.ironSteelIndex) {
                    historyData.ironSteelIndex.shift();
                    historyData.ironSteelIndex.push(isiVal);
                }
                if (historyData.maritimeTradeIndex) {
                    historyData.maritimeTradeIndex.shift();
                    historyData.maritimeTradeIndex.push(mtiVal);
                }
            }

            const isiReg = IronTelemetryManager.classifyISIRegime(isiVal);
            const mtiReg = IronTelemetryManager.classifyMTIRegime(mtiVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elISI = document.getElementById("valISIIndex");
                const elISIStatus = document.getElementById("valISIStatus");
                if (elISI) {
                    elISI.textContent = isiVal.toFixed(1) + "% ISI (" + isiReg.label + ")";
                }
                if (elISIStatus) {
                    elISIStatus.textContent = "CITIZENS: " + (m.totalIronCitizens || 0) + " | BLOOMERY: " + ((m.meanBloomerySmelting || 0.89) * 100).toFixed(1) + "% | STEEL: " + ((m.meanSteelHardening || 0.92) * 100).toFixed(1) + "% | INGOTS: " + (m.steelIngotsForged || 0);
                    elISIStatus.className = isiReg.badgeClass;
                }

                const elMTI = document.getElementById("valMTIIndex");
                const elMTIStatus = document.getElementById("valMTIStatus");
                if (elMTI) {
                    elMTI.textContent = mtiVal.toFixed(1) + "% MTI (" + mtiReg.label + ")";
                }
                if (elMTIStatus) {
                    elMTIStatus.textContent = "NAV: " + ((m.meanMaritimeNavigation || 0.89) * 100).toFixed(1) + "% | LEDGERS: " + ((m.meanLedgerAccounting || 0.89) * 100).toFixed(1) + "% | RANGE: " + (m.meanMaritimeRange || 2.75).toFixed(2) + "x | VOYAGES: " + (m.maritimeVoyagesCompleted || 0);
                    elMTIStatus.className = mtiReg.badgeClass;
                }
            }
        }
    }

    global.IronTelemetryManager = IronTelemetryManager;
})(typeof window !== "undefined" ? window : global);
