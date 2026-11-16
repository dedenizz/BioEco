// BioEcosystem - Semiconductor Transistors, Microprocessors & Global Internet Telemetry
// Module: src/ui/telemetry_silicon.js
// Version: 14.9.0 (Hour 769 - Looks & UI Agent: 183rd Channel % SMC, 184th Channel % GIN, Silicon Cyan & Fiber Indigo Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SiliconTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 183rd Telemetry Channel: Semiconductor & Microprocessor Compute Index (% SMC) - Silicon Cyan (#06b6d4, #67e8f9)
     * - 184th Telemetry Channel: Global Internet & Fiber Network Index (% GIN) - Fiber Indigo (#6366f1, #a5b4fc)
     */
    class SiliconTelemetryManager {
        /**
         * Classify 183rd Channel (% SMC) into 4 regimes.
         * @param {number} val - % SMC value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifySMCRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_NANOSCALE_COMPUTE_FABRIC",
                    label: "APEX NANOSCALE VLSI & PARALLEL COMPUTE FABRIC",
                    badgeClass: "smc-badge smc-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "VLSI_MICROPROCESSOR_ARRAY",
                    label: "VLSI MICROPROCESSOR ARRAY & HIGH-CLOCK LOGIC",
                    badgeClass: "smc-badge smc-vlsi"
                };
            } else if (val >= 25) {
                return {
                    regime: "DISCRETE_SILICON_LOGIC",
                    label: "DISCRETE TRANSISTOR GATES & EARLY INTEGRATED CIRCUITS",
                    badgeClass: "smc-badge smc-logic"
                };
            } else {
                return {
                    regime: "VACUUM_TUBE_RELAY",
                    label: "ELECTROMECHANICAL RELAY & VACUUM TUBE LIMIT",
                    badgeClass: "smc-badge smc-pre"
                };
            }
        }

        /**
         * Classify 184th Channel (% GIN) into 4 regimes.
         * @param {number} val - % GIN value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyGINRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_FIBER_OPTIC_CLOUD",
                    label: "APEX GLOBAL FIBER-OPTIC BACKBONE & CLOUD MESH",
                    badgeClass: "gin-badge gin-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "TCP_IP_GLOBAL_WEB",
                    label: "TCP/IP GLOBAL PACKET WEB & REAL-TIME SYNC",
                    badgeClass: "gin-badge gin-web"
                };
            } else if (val >= 25) {
                return {
                    regime: "ARPANET_PACKET_BACKBONE",
                    label: "EARLY PACKET-SWITCHED BACKBONE & RESEARCH NODES",
                    badgeClass: "gin-badge gin-packet"
                };
            } else {
                return {
                    regime: "ISOLATED_MAINFRAME_SILO",
                    label: "ISOLATED MAINFRAME & ANALOG RADIO SILO",
                    badgeClass: "gin-badge gin-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical circular buffers for 183rd (% SMC) & 184th (% GIN) channels.
         * @param {Array} organisms - Active organisms list.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - SiliconInternetManager instance.
         */
        static step(organisms, historyData, manager) {
            let smcVal = 0;
            let ginVal = 0;

            if (manager && manager.metrics) {
                smcVal = manager.metrics.meanSMCIndex || 0;
                ginVal = manager.metrics.meanGINIndex || 0;
            } else if (Array.isArray(organisms) && organisms.length > 0) {
                let sumSMC = 0;
                let sumGIN = 0;
                let count = 0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.alive && org.hasSiliconInternet) {
                        sumSMC += org.semiconductorComputeIndex || 0;
                        sumGIN += org.globalInternetIndex || 0;
                        count++;
                    }
                }
                if (count > 0) {
                    smcVal = sumSMC / count;
                    ginVal = sumGIN / count;
                }
            }

            smcVal = Math.max(0, Math.min(100, smcVal));
            ginVal = Math.max(0, Math.min(100, ginVal));

            if (historyData) {
                if (Array.isArray(historyData.semiconductorComputeIndex)) {
                    historyData.semiconductorComputeIndex.push(smcVal);
                    if (historyData.semiconductorComputeIndex.length > 240) {
                        historyData.semiconductorComputeIndex.shift();
                    }
                }
                if (Array.isArray(historyData.globalInternetIndex)) {
                    historyData.globalInternetIndex.push(ginVal);
                    if (historyData.globalInternetIndex.length > 240) {
                        historyData.globalInternetIndex.shift();
                    }
                }
            }

            if (typeof document !== "undefined") {
                const elSMC = document.getElementById("valSMCIndex");
                if (elSMC) {
                    const reg = this.classifySMCRegime(smcVal);
                    elSMC.className = reg.badgeClass;
                    elSMC.textContent = smcVal.toFixed(1) + "% SMC (" + reg.label + ")";
                }

                const elGIN = document.getElementById("valGINIndex");
                if (elGIN) {
                    const reg = this.classifyGINRegime(ginVal);
                    elGIN.className = reg.badgeClass;
                    elGIN.textContent = ginVal.toFixed(1) + "% GIN (" + reg.label + ")";
                }
            }

            return { smcVal: smcVal, ginVal: ginVal };
        }
    }

    global.SiliconTelemetryManager = SiliconTelemetryManager;
})(typeof window !== "undefined" ? window : globalThis);
