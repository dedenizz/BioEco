// BioEcosystem - Trans-Dimensional Ecosystem Resonance, Quantum Vacuum Life & Meta-Evolutionary Telemetry
// Module: src/ui/telemetry_vacuum.js
// Version: 18.4.0 (Hour 804 - Looks & UI Agent: 197th Channel % QVR, 198th Channel % MES, Vacuum Cyan & Meta Crimson Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * VacuumTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 197th Telemetry Channel: Quantum Vacuum Life & Zero-Point Ecology Index (% QVR) - Vacuum Cyan (#06b6d4, #a5f3fc)
     * - 198th Telemetry Channel: Meta-Evolutionary Synthesis & Trans-Dimensional Index (% MES) - Meta Crimson (#f43f5e, #fecdd3)
     */
    class VacuumTelemetryManager {
        /**
         * Classify 197th Channel (% QVR) into 4 regimes.
         * @param {number} val - % QVR value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyQVRRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_VACUUM_ECOLOGY",
                    label: "APEX QUANTUM VACUUM ECOLOGY & ZERO-POINT COHERENCE",
                    badgeClass: "qvr-badge qvr-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "ZERO_POINT_METABOLIC_LOCK",
                    label: "ZERO-POINT METABOLIC LOCK & VACUUM HARVESTING",
                    badgeClass: "qvr-badge qvr-lock"
                };
            } else if (val >= 25) {
                return {
                    regime: "CASIMIR_FLUCTUATION_HARVEST",
                    label: "CASIMIR FLUCTUATION HARVEST & QUANTUM FOAM TAPPING",
                    badgeClass: "qvr-badge qvr-casimir"
                };
            } else {
                return {
                    regime: "BARYONIC_MATTER_FLOOR",
                    label: "BARYONIC MATTER FLOOR & CLASSICAL ENERGY LIMIT",
                    badgeClass: "qvr-badge qvr-pre"
                };
            }
        }

        /**
         * Classify 198th Channel (% MES) into 4 regimes.
         * @param {number} val - % MES value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyMESRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_META_EVOLUTIONARY_MIND",
                    label: "APEX META-EVOLUTIONARY SYNTHESIS & LAW OPTIMIZATION",
                    badgeClass: "mes-badge mes-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "TRANS_DIMENSIONAL_RESONANCE",
                    label: "TRANS-DIMENSIONAL RESONANCE & CONSTANT ADAPTATION",
                    badgeClass: "mes-badge mes-res"
                };
            } else if (val >= 25) {
                return {
                    regime: "ADAPTIVE_MUTATION_TUNING",
                    label: "ADAPTIVE MUTATION TUNING & DYNAMIC SELECTION",
                    badgeClass: "mes-badge mes-tune"
                };
            } else {
                return {
                    regime: "FIXED_EVOLUTIONARY_RULES",
                    label: "FIXED EVOLUTIONARY RULES & STATIC PHYSICS",
                    badgeClass: "mes-badge mes-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical telemetry buffers for 197th and 198th channels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - VacuumResonanceManager instance.
         */
        static step(organisms, historyData, manager) {
            const metrics = (manager && typeof manager.getMetrics === "function") ? manager.getMetrics() : {};
            const qvrVal = Math.max(0, Math.min(100, metrics.meanQVRIndex || 0));
            const mesVal = Math.max(0, Math.min(100, metrics.meanMESIndex || 0));

            if (typeof document !== "undefined") {
                const elQVR = document.getElementById("valQVRIndex");
                if (elQVR) {
                    const reg = this.classifyQVRRegime(qvrVal);
                    elQVR.textContent = qvrVal.toFixed(1) + "% QVR (" + reg.label + ")";
                    elQVR.className = reg.badgeClass;
                }
                const elMES = document.getElementById("valMESIndex");
                if (elMES) {
                    const reg = this.classifyMESRegime(mesVal);
                    elMES.textContent = mesVal.toFixed(1) + "% MES (" + reg.label + ")";
                    elMES.className = reg.badgeClass;
                }
            }
        }
    }

    global.VacuumTelemetryManager = VacuumTelemetryManager;
})(typeof window !== "undefined" ? window : global);
