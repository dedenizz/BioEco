// BioEcosystem - Neolithic Agriculture, Cereal Crop & Pottery Granary Telemetry
// Module: src/ui/telemetry_neolithic.js
// Version: 9.94.0 (Hour 714 - Looks & UI Agent: 161st Channel % NAI, 162nd Channel % PSI, Golden Wheat & Terracotta Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeolithicTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 161st Telemetry Channel: Neolithic Agriculture Index (% NAI) - Golden Wheat (#eab308, #fef08a)
     * - 162nd Telemetry Channel: Pottery Storage & Sedentism Index (% PSI) - Terracotta Clay (#c2410c, #ea580c)
     * - 4 Biological Regimes for % NAI:
     *   1. WILD_GRAIN_FORAGER (< 25%)
     *   2. INCIPIENT_CULTIVATOR (25% - 50%)
     *   3. DOMESTICATED_CEREAL_FARMER (50% - 75%)
     *   4. APEX_NEOLITHIC_AGRONOMIST (> 75%)
     * - 4 Biological Regimes for % PSI:
     *   1. NOMADIC_PERISHABLE_STORAGE (< 25%)
     *   2. EARLY_CLAY_CONTAINER (25% - 50%)
     *   3. SEDENTARY_GRANARY_VILLAGE (50% - 75%)
     *   4. APEX_PROTO_URBAN_SEDENTIST (> 75%)
     * - Real-time tracking of einkorn/emmer crop cultivation, non-shattering rachis suppression,
     *   composite microlithic sickles, baked pottery seed storage, and mudbrick village sedentism.
     */
    class NeolithicTelemetryManager {
        /**
         * Initialize Neolithic telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalNeolithicFarmers: 0,
                activeCultivators: 0,
                activeSickleHarvesters: 0,
                activePotteryGranaryHolders: 0,
                activeVillageSedentists: 0,
                meanCropCultivation: 0.88,
                meanRachisSuppression: 0.86,
                meanSickleEfficiency: 0.89,
                meanPotteryStorage: 0.88,
                meanGranarySurplus: 0.86,
                meanVillageArchitecture: 0.87,
                meanNAIIndex: 0.0,
                meanPSIIndex: 0.0
            };
        }

        /**
         * Classify 161st Channel (% NAI) into 4 biological regimes.
         * @param {number} val - % NAI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyNAIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_NEOLITHIC_AGRONOMIST",
                    label: "APEX NEOLITHIC AGRONOMIST & SELECTIVE BREEDING",
                    badgeClass: "nai-badge nai-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "DOMESTICATED_CEREAL_FARMER",
                    label: "DOMESTICATED CEREAL FARMER & SICKLE HARVEST",
                    badgeClass: "nai-badge nai-farmer"
                };
            } else if (val >= 25) {
                return {
                    regime: "INCIPIENT_CULTIVATOR",
                    label: "INCIPIENT CULTIVATOR & EARLY GLEANING",
                    badgeClass: "nai-badge nai-incipient"
                };
            } else {
                return {
                    regime: "WILD_GRAIN_FORAGER",
                    label: "WILD GRAIN FORAGER & SHATTERING RACHIS",
                    badgeClass: "nai-badge nai-forager"
                };
            }
        }

        /**
         * Classify 162nd Channel (% PSI) into 4 biological regimes.
         * @param {number} val - % PSI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyPSIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_PROTO_URBAN_SEDENTIST",
                    label: "APEX PROTO-URBAN SEDENTIST & MUDBRICK VILLAGE",
                    badgeClass: "psi-badge psi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "SEDENTARY_GRANARY_VILLAGE",
                    label: "SEDENTARY GRANARY VILLAGE & SURPLUS BUFFER",
                    badgeClass: "psi-badge psi-village"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_CLAY_CONTAINER",
                    label: "EARLY CLAY CONTAINER & PIT STORAGE",
                    badgeClass: "psi-badge psi-incipient"
                };
            } else {
                return {
                    regime: "NOMADIC_PERISHABLE_STORAGE",
                    label: "NOMADIC PERISHABLE STORAGE & FAMINE RISK",
                    badgeClass: "psi-badge psi-nomadic"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} neoManager - NeolithicAgricultureManager instance.
         */
        static step(organisms, historyData, neoManager) {
            if (!neoManager || typeof neoManager.getMetrics !== "function") return;

            const m = neoManager.getMetrics();
            const naiVal = Math.max(0, Math.min(100, m.meanNAIIndex || 0));
            const psiVal = Math.max(0, Math.min(100, m.meanPSIIndex || 0));

            // 1. Update 161st & 162nd Channel History Buffers
            if (historyData) {
                if (historyData.neolithicAgricultureIndex) {
                    historyData.neolithicAgricultureIndex.shift();
                    historyData.neolithicAgricultureIndex.push(naiVal);
                }
                if (historyData.potterySedentismIndex) {
                    historyData.potterySedentismIndex.shift();
                    historyData.potterySedentismIndex.push(psiVal);
                }
            }

            // 2. Classify Regimes
            const naiReg = NeolithicTelemetryManager.classifyNAIRegime(naiVal);
            const psiReg = NeolithicTelemetryManager.classifyPSIRegime(psiVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elNAI = document.getElementById("valNAIIndex");
                const elNAIStatus = document.getElementById("valNAIStatus");
                if (elNAI) {
                    elNAI.textContent = naiVal.toFixed(1) + "% NAI (" + naiReg.label + ")";
                }
                if (elNAIStatus) {
                    elNAIStatus.textContent = "FARMERS: " + (m.totalNeolithicFarmers || 0) + " | CULTIVATION: " + ((m.meanCropCultivation || 0.88) * 100).toFixed(1) + "% | RACHIS: " + ((m.meanRachisSuppression || 0.86) * 100).toFixed(1) + "% | SICKLES: " + (m.activeSickleHarvesters || 0) + " | CROPS: " + (m.cerealCropsHarvested || 0);
                    elNAIStatus.className = naiReg.badgeClass;
                }

                const elPSI = document.getElementById("valPSIIndex");
                const elPSIStatus = document.getElementById("valPSIStatus");
                if (elPSI) {
                    elPSI.textContent = psiVal.toFixed(1) + "% PSI (" + psiReg.label + ")";
                }
                if (elPSIStatus) {
                    elPSIStatus.textContent = "POTTERY STORAGE: " + ((m.meanPotteryStorage || 0.88) * 100).toFixed(1) + "% | SURPLUS: " + ((m.meanGranarySurplus || 0.86) * 100).toFixed(1) + "% | VILLAGES: " + (m.mudbrickVillagesErected || 0) + " | SEDENTISTS: " + (m.activeVillageSedentists || 0);
                    elPSIStatus.className = psiReg.badgeClass;
                }
            }
        }
    }

    global.NeolithicTelemetryManager = NeolithicTelemetryManager;
})(typeof window !== "undefined" ? window : global);
