// BioEcosystem - Orbital Habitats, Asteroid Mining & Closed-Loop Space Ecology Telemetry
// Module: src/ui/telemetry_orbital.js
// Version: 16.4.0 (Hour 784 - Looks & UI Agent: 189th Channel % OHE, 190th Channel % AMR, Orbital Sky & Asteroid Amber Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OrbitalTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 189th Telemetry Channel: Orbital Habitat & Microgravity Ecology Index (% OHE) - Orbital Sky (#38bdf8, #bae6fd)
     * - 190th Telemetry Channel: Asteroid Mining & Closed-Loop Resource Index (% AMR) - Asteroid Amber (#f59e0b, #fde68a)
     */
    class OrbitalTelemetryManager {
        /**
         * Classify 189th Channel (% OHE) into 4 regimes.
         * @param {number} val - % OHE value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyOHERegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_INTERPLANETARY_ECOLOGY",
                    label: "APEX INTERPLANETARY BIOSPHERE & ZERO-G BIOREACTORS",
                    badgeClass: "ohe-badge ohe-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "CLOSED_LOOP_ORBITAL_HABITAT",
                    label: "CLOSED-LOOP ORBITAL HABITAT & O2/CO2 RECOVERY",
                    badgeClass: "ohe-badge ohe-closed"
                };
            } else if (val >= 25) {
                return {
                    regime: "LOW_ORBIT_BIOSPHERE",
                    label: "LOW-ORBIT MICROGRAVITY CELL CULTURE",
                    badgeClass: "ohe-badge ohe-orbit"
                };
            } else {
                return {
                    regime: "PLANETARY_SURFACE_LIMIT",
                    label: "PLANETARY GRAVITY WELL & SURFACE BIOSPHERE",
                    badgeClass: "ohe-badge ohe-pre"
                };
            }
        }

        /**
         * Classify 190th Channel (% AMR) into 4 regimes.
         * @param {number} val - % AMR value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyAMRRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_ZERO_WASTE_SYNTHESIS",
                    label: "APEX ZERO-WASTE ASTEROID SYNTHESIS & REGOLITH SUPPLY",
                    badgeClass: "amr-badge amr-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "ASTEROID_SMELTING_SUPPLY",
                    label: "CARBONACEOUS CHONDRITE MINING & MINERAL REFINING",
                    badgeClass: "amr-badge amr-smelt"
                };
            } else if (val >= 25) {
                return {
                    regime: "REGOLITH_PROBE_EXTRACTION",
                    label: "AUTONOMOUS REGOLITH PROBE & TRACE EXTRACTION",
                    badgeClass: "amr-badge amr-probe"
                };
            } else {
                return {
                    regime: "TERRESTRIAL_MINERAL_CAP",
                    label: "TERRESTRIAL CRUSTAL MINERAL EXTRACTION LIMIT",
                    badgeClass: "amr-badge amr-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical telemetry buffers for 189th and 190th channels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - OrbitalEcologyManager instance.
         */
        static step(organisms, historyData, manager) {
            const metrics = (manager && typeof manager.getMetrics === "function") ? manager.getMetrics() : {};
            const oheVal = Math.max(0, Math.min(100, metrics.meanOHEIndex || 0));
            const amrVal = Math.max(0, Math.min(100, metrics.meanAMRIndex || 0));

            if (typeof document !== "undefined") {
                const elOHE = document.getElementById("valOHEIndex");
                if (elOHE) {
                    const reg = this.classifyOHERegime(oheVal);
                    elOHE.textContent = oheVal.toFixed(1) + "% OHE (" + reg.label + ")";
                    elOHE.className = reg.badgeClass;
                }
                const elAMR = document.getElementById("valAMRIndex");
                if (elAMR) {
                    const reg = this.classifyAMRRegime(amrVal);
                    elAMR.textContent = amrVal.toFixed(1) + "% AMR (" + reg.label + ")";
                    elAMR.className = reg.badgeClass;
                }
            }
        }
    }

    global.OrbitalTelemetryManager = OrbitalTelemetryManager;
})(typeof window !== "undefined" ? window : global);
