// BioEcosystem - Pastoral Domestication & Secondary Products Revolution Telemetry
// Module: src/ui/telemetry_pastoral.js
// Version: 9.99.0 (Hour 719 - Looks & UI Agent: 163rd Channel % PHI, 164th Channel % SPR, Meadow Green & Dairy Cream Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PastoralTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 163rd Telemetry Channel: Pastoral Herd Index (% PHI) - Pastoral Meadow Green (#84cc16, #bef264)
     * - 164th Telemetry Channel: Secondary Products Revolution Index (% SPR) - Dairy Cream White (#f8fafc, #e2e8f0)
     * - 4 Biological Regimes for % PHI:
     *   1. WILD_UNGULATE_QUARRY (< 25%)
     *   2. INCIPIENT_TETHERED_HERD (25% - 50%)
     *   3. DOMESTICATED_PASTORAL_HERD (50% - 75%)
     *   4. APEX_TRANSHUMANCE_PASTORALIST (> 75%)
     * - 4 Biological Regimes for % SPR:
     *   1. PRIMARY_CARCASS_SLAUGHTER (< 25%)
     *   2. EARLY_MILK_EXTRACTION (25% - 50%)
     *   3. SECONDARY_PRODUCTS_DAIRY (50% - 75%)
     *   4. APEX_DAIRY_WOOL_REVOLUTION (> 75%)
     * - Real-time tracking of sheep/goat/cattle herding, manure fertilization, daily dairy milking,
     *   lactic acid cheese fermentation, wool fiber spinning, and communal corral predator security.
     */
    class PastoralTelemetryManager {
        /**
         * Initialize Pastoral telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalPastoralists: 0,
                activeHerders: 0,
                activeMilkExtractors: 0,
                activeWoolSpinners: 0,
                activeCorralProtectors: 0,
                meanHerdManagement: 0.88,
                meanManureSurplus: 0.86,
                meanDairyExtraction: 0.89,
                meanLactationYield: 0.85,
                meanWoolSpinning: 0.87,
                meanCorralSecurity: 0.88,
                meanPHIIndex: 0.0,
                meanSPRIndex: 0.0
            };
        }

        /**
         * Classify 163rd Channel (% PHI) into 4 biological regimes.
         * @param {number} val - % PHI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyPHIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_TRANSHUMANCE_PASTORALIST",
                    label: "APEX TRANSHUMANCE PASTORALIST & SELECTIVE HERD",
                    badgeClass: "phi-badge phi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "DOMESTICATED_PASTORAL_HERD",
                    label: "DOMESTICATED PASTORAL HERD & PASTURE ROTATION",
                    badgeClass: "phi-badge phi-herd"
                };
            } else if (val >= 25) {
                return {
                    regime: "INCIPIENT_TETHERED_HERD",
                    label: "INCIPIENT TETHERED HERD & EARLY PENNING",
                    badgeClass: "phi-badge phi-incipient"
                };
            } else {
                return {
                    regime: "WILD_UNGULATE_QUARRY",
                    label: "WILD UNGULATE QUARRY & FERAL FLIGHT",
                    badgeClass: "phi-badge phi-wild"
                };
            }
        }

        /**
         * Classify 164th Channel (% SPR) into 4 biological regimes.
         * @param {number} val - % SPR value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifySPRRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_DAIRY_WOOL_REVOLUTION",
                    label: "APEX DAIRY & WOOL REVOLUTION & CORRAL SECURITY",
                    badgeClass: "spr-badge spr-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "SECONDARY_PRODUCTS_DAIRY",
                    label: "SECONDARY PRODUCTS DAIRY & CHEESE BUFFER",
                    badgeClass: "spr-badge spr-dairy"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_MILK_EXTRACTION",
                    label: "EARLY MILK EXTRACTION & RAW DAIRY DIET",
                    badgeClass: "spr-badge spr-incipient"
                };
            } else {
                return {
                    regime: "PRIMARY_CARCASS_SLAUGHTER",
                    label: "PRIMARY CARCASS SLAUGHTER & ZERO DAIRY",
                    badgeClass: "spr-badge spr-primary"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} pastoralManager - PastoralDomesticationManager instance.
         */
        static step(organisms, historyData, pastoralManager) {
            if (!pastoralManager || typeof pastoralManager.getMetrics !== "function") return;

            const m = pastoralManager.getMetrics();
            const phiVal = Math.max(0, Math.min(100, m.meanPHIIndex || 0));
            const sprVal = Math.max(0, Math.min(100, m.meanSPRIndex || 0));

            // 1. Update 163rd & 164th Channel History Buffers
            if (historyData) {
                if (historyData.pastoralHerdIndex) {
                    historyData.pastoralHerdIndex.shift();
                    historyData.pastoralHerdIndex.push(phiVal);
                }
                if (historyData.secondaryProductsIndex) {
                    historyData.secondaryProductsIndex.shift();
                    historyData.secondaryProductsIndex.push(sprVal);
                }
            }

            // 2. Classify Regimes
            const phiReg = PastoralTelemetryManager.classifyPHIRegime(phiVal);
            const sprReg = PastoralTelemetryManager.classifySPRRegime(sprVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elPHI = document.getElementById("valPHIIndex");
                const elPHIStatus = document.getElementById("valPHIStatus");
                if (elPHI) {
                    elPHI.textContent = phiVal.toFixed(1) + "% PHI (" + phiReg.label + ")";
                }
                if (elPHIStatus) {
                    elPHIStatus.textContent = "PASTORALISTS: " + (m.totalPastoralists || 0) + " | HERD MGMT: " + ((m.meanHerdManagement || 0.88) * 100).toFixed(1) + "% | MANURE: " + ((m.meanManureSurplus || 0.86) * 100).toFixed(1) + "% | HERDERS: " + (m.activeHerders || 0) + " | RAIDS DEFLECTED: " + (m.predatorRaidsDeflected || 0);
                    elPHIStatus.className = phiReg.badgeClass;
                }

                const elSPR = document.getElementById("valSPRIndex");
                const elSPRStatus = document.getElementById("valSPRStatus");
                if (elSPR) {
                    elSPR.textContent = sprVal.toFixed(1) + "% SPR (" + sprReg.label + ")";
                }
                if (elSPRStatus) {
                    elSPRStatus.textContent = "DAIRY EXTR: " + ((m.meanDairyExtraction || 0.89) * 100).toFixed(1) + "% | WOOL SPIN: " + ((m.meanWoolSpinning || 0.87) * 100).toFixed(1) + "% | CORRAL SEC: " + ((m.meanCorralSecurity || 0.88) * 100).toFixed(1) + "% | MILKINGS: " + (m.dailyMilkingEvents || 0);
                    elSPRStatus.className = sprReg.badgeClass;
                }
            }
        }
    }

    global.PastoralTelemetryManager = PastoralTelemetryManager;
})(typeof window !== "undefined" ? window : global);
