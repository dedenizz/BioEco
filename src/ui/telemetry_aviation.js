// BioEcosystem - Internal Combustion Engines, Aerodynamic Aviation & Global Radio Telemetry
// Module: src/ui/telemetry_aviation.js
// Version: 14.4.0 (Hour 764 - Looks & UI Agent: 181st Channel % ICA, 182nd Channel % RCI, Aviation Blue & Radio Violet Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AviationTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 181st Telemetry Channel: Internal Combustion & Aviation Index (% ICA) - Aviation Blue (#2563eb, #93c5fd)
     * - 182nd Telemetry Channel: Radio Communication & Broadcast Index (% RCI) - Radio Violet (#9333ea, #d8b4fe)
     */
    class AviationTelemetryManager {
        /**
         * Classify 181st Channel (% ICA) into 4 regimes.
         * @param {number} val - % ICA value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyICARegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_SUPERSONIC_AEROSPACE_NETWORK",
                    label: "APEX TRANSCONTINENTAL AVIATION & HIGH-TORQUE MOBILITY",
                    badgeClass: "ica-badge ica-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "LONG_RANGE_AIRCRAFT_LOGISTICS",
                    label: "LONG-RANGE FIXED-WING CARGO & DIESEL LOGISTICS",
                    badgeClass: "ica-badge ica-aero"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_PISTON_AUTOMOBILE",
                    label: "EARLY OTTO PISTON VEHICLES & BIPLANE SORTIES",
                    badgeClass: "ica-badge ica-piston"
                };
            } else {
                return {
                    regime: "ANIMAL_RAIL_MOBILITY",
                    label: "FIXED RAIL CORRIDOR & SURFACE BOUNDED MOBILITY",
                    badgeClass: "ica-badge ica-pre"
                };
            }
        }

        /**
         * Classify 182nd Channel (% RCI) into 4 regimes.
         * @param {number} val - % RCI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyRCIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_PHASED_RADIO_SPECTRUM",
                    label: "APEX GLOBAL WIRELESS RADIO & PHASED TELEMETRY",
                    badgeClass: "rci-badge rci-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "SHORTWAVE_GLOBAL_BROADCAST",
                    label: "SHORTWAVE IONOSPHERIC BROADCAST & AIR-GROUND SYNC",
                    badgeClass: "rci-badge rci-wave"
                };
            } else if (val >= 25) {
                return {
                    regime: "SPARK_GAP_MARITIME_RADIO",
                    label: "SPARK-GAP WIRELESS & MARITIME BEACON RELAY",
                    badgeClass: "rci-badge rci-spark"
                };
            } else {
                return {
                    regime: "WIRED_TELEGRAPH_LIMIT",
                    label: "WIRED TELEGRAPH LINE & PHYSICAL CABLE LIMIT",
                    badgeClass: "rci-badge rci-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical circular buffers for 181st (% ICA) & 182nd (% RCI) channels.
         * @param {Array} organisms - Active organisms list.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - AviationRadioManager instance.
         */
        static step(organisms, historyData, manager) {
            let icaVal = 0;
            let rciVal = 0;

            if (manager && manager.metrics) {
                icaVal = manager.metrics.meanICAIndex || 0;
                rciVal = manager.metrics.meanRCIIndex || 0;
            } else if (Array.isArray(organisms) && organisms.length > 0) {
                let sumICA = 0;
                let sumRCI = 0;
                let count = 0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.alive && org.hasAviationRadio) {
                        sumICA += org.aviationCombustionIndex || 0;
                        sumRCI += org.radioCommunicationIndex || 0;
                        count++;
                    }
                }
                if (count > 0) {
                    icaVal = sumICA / count;
                    rciVal = sumRCI / count;
                }
            }

            icaVal = Math.max(0, Math.min(100, icaVal));
            rciVal = Math.max(0, Math.min(100, rciVal));

            if (historyData) {
                if (Array.isArray(historyData.aviationCombustionIndex)) {
                    historyData.aviationCombustionIndex.push(icaVal);
                    if (historyData.aviationCombustionIndex.length > 240) {
                        historyData.aviationCombustionIndex.shift();
                    }
                }
                if (Array.isArray(historyData.radioCommunicationIndex)) {
                    historyData.radioCommunicationIndex.push(rciVal);
                    if (historyData.radioCommunicationIndex.length > 240) {
                        historyData.radioCommunicationIndex.shift();
                    }
                }
            }

            if (typeof document !== "undefined") {
                const elICA = document.getElementById("valICAIndex");
                if (elICA) {
                    const reg = this.classifyICARegime(icaVal);
                    elICA.className = reg.badgeClass;
                    elICA.textContent = icaVal.toFixed(1) + "% ICA (" + reg.label + ")";
                }

                const elRCI = document.getElementById("valRCIIndex");
                if (elRCI) {
                    const reg = this.classifyRCIRegime(rciVal);
                    elRCI.className = reg.badgeClass;
                    elRCI.textContent = rciVal.toFixed(1) + "% RCI (" + reg.label + ")";
                }
            }

            return { icaVal: icaVal, rciVal: rciVal };
        }
    }

    global.AviationTelemetryManager = AviationTelemetryManager;
})(typeof window !== "undefined" ? window : globalThis);
