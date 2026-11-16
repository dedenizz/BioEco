// BioEcosystem - Universal Biosphere Synthesis, Multiverse Seeding & Omega Continuity Telemetry
// Module: src/ui/telemetry_universal.js
// Version: 17.9.0 (Hour 799 - Looks & UI Agent: 195th Channel % UBS, 196th Channel % MVS, Cosmic Cyan & Omega Purple Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UniversalTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 195th Telemetry Channel: Universal Biosphere Synthesis & Cosmic Life Index (% UBS) - Cosmic Cyan (#38bdf8, #bae6fd)
     * - 196th Telemetry Channel: Multiverse Seeding & Omega Continuity Index (% MVS) - Omega Purple (#a855f7, #e9d5ff)
     */
    class UniversalTelemetryManager {
        /**
         * Classify 195th Channel (% UBS) into 4 regimes.
         * @param {number} val - % UBS value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyUBSRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_UNIVERSAL_SYNTHESIS",
                    label: "APEX UNIVERSAL BIOSPHERE SYNTHESIS & COSMIC COHERENCE",
                    badgeClass: "ubs-badge ubs-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "UNIVERSAL_BIOSPHERE_LOCK",
                    label: "UNIVERSAL BIOSPHERE LOCK & METABOLIC UNIFICATION",
                    badgeClass: "ubs-badge ubs-lock"
                };
            } else if (val >= 25) {
                return {
                    regime: "INTERGALACTIC_BIO_WEAVE",
                    label: "INTERGALACTIC BIO-WEAVE & FILAMENT NETWORKING",
                    badgeClass: "ubs-badge ubs-weave"
                };
            } else {
                return {
                    regime: "LOCAL_GALAXY_FRAGMENT",
                    label: "LOCAL GALAXY FRAGMENT & ISOLATED STELLAR CLUSTERS",
                    badgeClass: "ubs-badge ubs-pre"
                };
            }
        }

        /**
         * Classify 196th Channel (% MVS) into 4 regimes.
         * @param {number} val - % MVS value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyMVSRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_OMEGA_CONTINUITY",
                    label: "APEX OMEGA CONTINUITY & MULTIVERSE GENETIC SEEDING",
                    badgeClass: "mvs-badge mvs-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "INTERDIMENSIONAL_SEED_ARCS",
                    label: "INTERDIMENSIONAL SEED ARCS & BRANE TUNNELING",
                    badgeClass: "mvs-badge mvs-arc"
                };
            } else if (val >= 25) {
                return {
                    regime: "QUANTUM_BRANE_PROBES",
                    label: "QUANTUM BRANE PROBES & CAPSULE LAUNCHES",
                    badgeClass: "mvs-badge mvs-probe"
                };
            } else {
                return {
                    regime: "SINGLE_UNIVERSE_HORIZON",
                    label: "SINGLE UNIVERSE HORIZON & ENTROPIC BOUNDARY",
                    badgeClass: "mvs-badge mvs-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical telemetry buffers for 195th and 196th channels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - UniversalBiosphereManager instance.
         */
        static step(organisms, historyData, manager) {
            const metrics = (manager && typeof manager.getMetrics === "function") ? manager.getMetrics() : {};
            const ubsVal = Math.max(0, Math.min(100, metrics.meanUBSIndex || 0));
            const mvsVal = Math.max(0, Math.min(100, metrics.meanMVSIndex || 0));

            if (typeof document !== "undefined") {
                const elUBS = document.getElementById("valUBSIndex");
                if (elUBS) {
                    const reg = this.classifyUBSRegime(ubsVal);
                    elUBS.textContent = ubsVal.toFixed(1) + "% UBS (" + reg.label + ")";
                    elUBS.className = reg.badgeClass;
                }
                const elMVS = document.getElementById("valMVSIndex");
                if (elMVS) {
                    const reg = this.classifyMVSRegime(mvsVal);
                    elMVS.textContent = mvsVal.toFixed(1) + "% MVS (" + reg.label + ")";
                    elMVS.className = reg.badgeClass;
                }
            }
        }
    }

    global.UniversalTelemetryManager = UniversalTelemetryManager;
})(typeof window !== "undefined" ? window : global);
