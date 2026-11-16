// BioEcosystem - Electrification, Telegraph Communications & Synthetic Nitrogen Telemetry
// Module: src/ui/telemetry_electric.js
// Version: 13.9.0 (Hour 759 - Looks & UI Agent: 179th Channel % EGI, 180th Channel % SNI, Electric Blue & Nitrogen Emerald Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectricTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 179th Telemetry Channel: Electrical Grid & Telegraph Index (% EGI) - Electric Blue (#0ea5e9, #7dd3fc)
     * - 180th Telemetry Channel: Synthetic Nitrogen & Haber-Bosch Index (% SNI) - Nitrogen Emerald (#10b981, #6ee7b7)
     */
    class ElectricTelemetryManager {
        /**
         * Classify 179th Channel (% EGI) into 4 regimes.
         * @param {number} val - % EGI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyEGIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "CONTINENTAL_AC_GRID_TELEGRAPH",
                    label: "CONTINENTAL AC POWER GRID & TRANSOCEANIC TELEGRAPH",
                    badgeClass: "egi-badge egi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "MUNICIPAL_POLYPHASE_GRID",
                    label: "MUNICIPAL POLYPHASE AC GRID & TRUNK TELEGRAPH",
                    badgeClass: "egi-badge egi-grid"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_DYNAMO_MORSE_LINES",
                    label: "EARLY DYNAMO STATIONS & SINGLE-WIRE MORSE LINES",
                    badgeClass: "egi-badge egi-dynamo"
                };
            } else {
                return {
                    regime: "PRE_ELECTRIC_STEAM_MESSENGER",
                    label: "PRE-ELECTRIC STEAM & DISPATCH RIDER NETWORK",
                    badgeClass: "egi-badge egi-pre"
                };
            }
        }

        /**
         * Classify 180th Channel (% SNI) into 4 regimes.
         * @param {number} val - % SNI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifySNIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_HABER_BOSCH_SYNTHESIS",
                    label: "APEX CATALYTIC HABER-BOSCH AMMONIA & NITRATE SURPLUS",
                    badgeClass: "sni-badge sni-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "HIGH_PRESSURE_AMMONIA_TOWERS",
                    label: "HIGH-PRESSURE AMMONIA CONVERTERS & SYNTHETIC FERTILIZER",
                    badgeClass: "sni-badge sni-haber"
                };
            } else if (val >= 25) {
                return {
                    regime: "CHILEAN_SALTPETER_BIRKELAND_EYDE",
                    label: "NITRATE IMPORTS & EARLY ELECTRIC ARC FIXATION",
                    badgeClass: "sni-badge sni-nitrate"
                };
            } else {
                return {
                    regime: "ORGANIC_GUANO_MANURE_LIMIT",
                    label: "ORGANIC MANURE & GUANO NITROGEN CEILING",
                    badgeClass: "sni-badge sni-organic"
                };
            }
        }

        /**
         * Update HUD elements and historical circular buffers for 179th (% EGI) & 180th (% SNI) channels.
         * @param {Array} organisms - Active organisms list.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - ElectricNitrogenManager instance.
         */
        static step(organisms, historyData, manager) {
            let egiVal = 0;
            let sniVal = 0;

            if (manager && manager.telemetry) {
                egiVal = manager.telemetry.meanEGIIndex || 0;
                sniVal = manager.telemetry.meanSNIIndex || 0;
            } else if (Array.isArray(organisms) && organisms.length > 0) {
                let sumEGI = 0;
                let sumSNI = 0;
                let count = 0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.alive && org.hasElectricNitrogen) {
                        sumEGI += org.electricalGridIndex || 0;
                        sumSNI += org.syntheticNitrogenIndex || 0;
                        count++;
                    }
                }
                if (count > 0) {
                    egiVal = sumEGI / count;
                    sniVal = sumSNI / count;
                }
            }

            egiVal = Math.max(0, Math.min(100, egiVal));
            sniVal = Math.max(0, Math.min(100, sniVal));

            if (historyData) {
                if (Array.isArray(historyData.electricalGridIndex)) {
                    historyData.electricalGridIndex.push(egiVal);
                    if (historyData.electricalGridIndex.length > 240) {
                        historyData.electricalGridIndex.shift();
                    }
                }
                if (Array.isArray(historyData.syntheticNitrogenIndex)) {
                    historyData.syntheticNitrogenIndex.push(sniVal);
                    if (historyData.syntheticNitrogenIndex.length > 240) {
                        historyData.syntheticNitrogenIndex.shift();
                    }
                }
            }

            if (typeof document !== "undefined") {
                const elEGI = document.getElementById("valEGIIndex");
                if (elEGI) {
                    const reg = this.classifyEGIRegime(egiVal);
                    elEGI.className = reg.badgeClass;
                    elEGI.textContent = egiVal.toFixed(1) + "% EGI (" + reg.label + ")";
                }

                const elSNI = document.getElementById("valSNIIndex");
                if (elSNI) {
                    const reg = this.classifySNIRegime(sniVal);
                    elSNI.className = reg.badgeClass;
                    elSNI.textContent = sniVal.toFixed(1) + "% SNI (" + reg.label + ")";
                }
            }

            return { egiVal: egiVal, sniVal: sniVal };
        }
    }

    global.ElectricTelemetryManager = ElectricTelemetryManager;
})(typeof window !== "undefined" ? window : globalThis);
