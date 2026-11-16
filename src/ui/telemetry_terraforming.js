// BioEcosystem - Interplanetary Biome Seeding, Exoplanet Terraforming & Pan-Galactic Network Telemetry
// Module: src/ui/telemetry_terraforming.js
// Version: 16.9.0 (Hour 789 - Looks & UI Agent: 191st Channel % ETI, 192nd Channel % PGN, Terraforming Emerald & Galactic Violet Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerraformingTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 191st Telemetry Channel: Exoplanet Terraforming & Atmosphere Seeding Index (% ETI) - Terraforming Emerald (#10b981, #a7f3d0)
     * - 192nd Telemetry Channel: Pan-Galactic Biome Network & Seed-Ship Index (% PGN) - Galactic Violet (#8b5cf6, #ddd6fe)
     */
    class TerraformingTelemetryManager {
        /**
         * Classify 191st Channel (% ETI) into 4 regimes.
         * @param {number} val - % ETI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyETIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_TERRAFORMED_GARDEN_WORLD",
                    label: "APEX TERRAFORMED GARDEN WORLD & SELF-SUSTAINING ATMOSPHERE",
                    badgeClass: "eti-badge eti-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "OXYGENIC_BIOSPHERE_IGNITION",
                    label: "OXYGENIC BIOSPHERE IGNITION & NITROGEN STABILIZATION",
                    badgeClass: "eti-badge eti-oxygen"
                };
            } else if (val >= 25) {
                return {
                    regime: "PIONEER_EXTREMOPHILE_SEEDING",
                    label: "PIONEER EXTREMOPHILE & PHOTOSYNTHETIC SEEDING",
                    badgeClass: "eti-badge eti-seed"
                };
            } else {
                return {
                    regime: "BARREN_EXOPLANET_CRUST",
                    label: "BARREN EXOPLANET CRUST & ANOXIC ATMOSPHERE",
                    badgeClass: "eti-badge eti-pre"
                };
            }
        }

        /**
         * Classify 192nd Channel (% PGN) into 4 regimes.
         * @param {number} val - % PGN value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyPGNRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_PAN_GALACTIC_BIOSPHERE",
                    label: "APEX PAN-GALACTIC BIOSPHERE & INTERSTELLAR GENE FLOW",
                    badgeClass: "pgn-badge pgn-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "INTERSTELLAR_GENE_EXCHANGE",
                    label: "INTERSTELLAR GENE EXCHANGE & MULTI-WORLD BIOME SYNC",
                    badgeClass: "pgn-badge pgn-sync"
                };
            } else if (val >= 25) {
                return {
                    regime: "CRYO_SEED_SHIP_TRANSIT",
                    label: "CRYOGENIC BIOME SEED-SHIP TRANSIT & VIABILITY LOCK",
                    badgeClass: "pgn-badge pgn-cryo"
                };
            } else {
                return {
                    regime: "ISOLATED_SOLAR_SYSTEM",
                    label: "ISOLATED SOLAR SYSTEM & SINGLE-STAR BIOSPHERE",
                    badgeClass: "pgn-badge pgn-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical telemetry buffers for 191st and 192nd channels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - TerraformingNetworkManager instance.
         */
        static step(organisms, historyData, manager) {
            const metrics = (manager && typeof manager.getMetrics === "function") ? manager.getMetrics() : {};
            const etiVal = Math.max(0, Math.min(100, metrics.meanETIIndex || 0));
            const pgnVal = Math.max(0, Math.min(100, metrics.meanPGNIndex || 0));

            if (typeof document !== "undefined") {
                const elETI = document.getElementById("valETIIndex");
                if (elETI) {
                    const reg = this.classifyETIRegime(etiVal);
                    elETI.textContent = etiVal.toFixed(1) + "% ETI (" + reg.label + ")";
                    elETI.className = reg.badgeClass;
                }
                const elPGN = document.getElementById("valPGNIndex");
                if (elPGN) {
                    const reg = this.classifyPGNRegime(pgnVal);
                    elPGN.textContent = pgnVal.toFixed(1) + "% PGN (" + reg.label + ")";
                    elPGN.className = reg.badgeClass;
                }
            }
        }
    }

    global.TerraformingTelemetryManager = TerraformingTelemetryManager;
})(typeof window !== "undefined" ? window : global);
