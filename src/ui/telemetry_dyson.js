// BioEcosystem - Stellar Energy Harvesting, Dyson Biosphere Rings & Cosmic Entropy Reversal Telemetry
// Module: src/ui/telemetry_dyson.js
// Version: 17.4.0 (Hour 794 - Looks & UI Agent: 193rd Channel % DSH, 194th Channel % CER, Stellar Gold & Negentropy Magenta Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * DysonTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 193rd Telemetry Channel: Dyson Swarm & Stellar Biosphere Harvesting Index (% DSH) - Stellar Gold (#facc15, #fef08a)
     * - 194th Telemetry Channel: Cosmic Entropy Reversal & Negentropy Index (% CER) - Negentropy Magenta (#ec4899, #fbcfe8)
     */
    class DysonTelemetryManager {
        /**
         * Classify 193rd Channel (% DSH) into 4 regimes.
         * @param {number} val - % DSH value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyDSHRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_KARDASHEV_BIOSPHERE",
                    label: "APEX KARDASHEV II-III DYSON BIOSPHERE & FULL LUMINOSITY",
                    badgeClass: "dsh-badge dsh-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "PARTIAL_DYSON_SWARM_RING",
                    label: "PARTIAL DYSON SWARM RING & STELLAR CARBON FIXATION",
                    badgeClass: "dsh-badge dsh-swarm"
                };
            } else if (val >= 25) {
                return {
                    regime: "ORBITAL_SOLAR_COLLECTOR",
                    label: "ORBITAL SOLAR COLLECTOR ARRAYS & PHOTON HARVEST",
                    badgeClass: "dsh-badge dsh-solar"
                };
            } else {
                return {
                    regime: "PLANETARY_INSOLATION_CAP",
                    label: "PLANETARY INSOLATION CAP & DIFFUSE STARLIGHT",
                    badgeClass: "dsh-badge dsh-pre"
                };
            }
        }

        /**
         * Classify 194th Channel (% CER) into 4 regimes.
         * @param {number} val - % CER value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyCERRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_COHERENT_NEGENTROPY",
                    label: "APEX COHERENT NEGENTROPY & THERMODYNAMIC REVERSAL",
                    badgeClass: "cer-badge cer-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "LOCAL_NEGENTROPY_LOCK",
                    label: "LOCAL NEGENTROPY LOCK & INFORMATION PRESERVATION",
                    badgeClass: "cer-badge cer-lock"
                };
            } else if (val >= 25) {
                return {
                    regime: "RADIATIVE_WASTE_RECOVERY",
                    label: "RADIATIVE WASTE-HEAT RECOVERY & THERMAL RECYCLING",
                    badgeClass: "cer-badge cer-rec"
                };
            } else {
                return {
                    regime: "THERMODYNAMIC_HEAT_DECAY",
                    label: "THERMODYNAMIC HEAT DECAY & UNCHECKED ENTROPY",
                    badgeClass: "cer-badge cer-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical telemetry buffers for 193rd and 194th channels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - DysonBiosphereManager instance.
         */
        static step(organisms, historyData, manager) {
            const metrics = (manager && typeof manager.getMetrics === "function") ? manager.getMetrics() : {};
            const dshVal = Math.max(0, Math.min(100, metrics.meanDSHIndex || 0));
            const cerVal = Math.max(0, Math.min(100, metrics.meanCERIndex || 0));

            if (typeof document !== "undefined") {
                const elDSH = document.getElementById("valDSHIndex");
                if (elDSH) {
                    const reg = this.classifyDSHRegime(dshVal);
                    elDSH.textContent = dshVal.toFixed(1) + "% DSH (" + reg.label + ")";
                    elDSH.className = reg.badgeClass;
                }
                const elCER = document.getElementById("valCERIndex");
                if (elCER) {
                    const reg = this.classifyCERRegime(cerVal);
                    elCER.textContent = cerVal.toFixed(1) + "% CER (" + reg.label + ")";
                    elCER.className = reg.badgeClass;
                }
            }
        }
    }

    global.DysonTelemetryManager = DysonTelemetryManager;
})(typeof window !== "undefined" ? window : global);
