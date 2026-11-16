// BioEcosystem - Upper Paleolithic Homo sapiens Telemetry Dashboard
// Module: src/ui/telemetry_sapiens.js
// Version: 9.79.0 (Hour 699 - Looks & UI Agent: 155th Channel % AMI, 156th Channel % PCA, Ivory Gold & Cave Ochre Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SapiensTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 155th Telemetry Channel: Atlatl Mechanical Leverage Index (% AMI) - Ivory Gold (#eab308, #fde047)
     * - 156th Telemetry Channel: Parietal Cave Artistry Index (% PCA) - Cave Red / Ochre (#991b1b, #f87171)
     * - 4 Biological Regimes for % AMI:
     *   1. UNASSISTED_HAND_THRUSTER (< 25%)
     *   2. INCIPIENT_LEVERAGE_THROWER (25% - 50%)
     *   3. ATLATL_BALLISTIC_HUNTER (50% - 75%)
     *   4. APEX_LONG_RANGE_BALLISTICIAN (> 75%)
     * - 4 Biological Regimes for % PCA:
     *   1. PRAGMATIC_NON_SYMBOLIC (< 25%)
     *   2. INCIPIENT_PIGMENT_STENCILER (25% - 50%)
     *   3. PARIETAL_CAVE_ARTIST (50% - 75%)
     *   4. APEX_SYMBOLIC_COGNITIVE_MASTER (> 75%)
     * - Real-time tracking of Atlatl leverage, launch velocity (120-150 km/h), ballistic range (80-100 m),
     *   eyed bone needle tailoring, thermal loss reduction (%80), and parietal cave murals.
     */
    class SapiensTelemetryManager {
        /**
         * Initialize Sapiens telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalSapiens: 0,
                activeAtlatlThrowers: 0,
                activeTailors: 0,
                activeCaveArtists: 0,
                activeBladeletKnappers: 0,
                meanAtlatlLeverage: 0.88,
                meanBallisticRangeMult: 3.5,
                meanKineticPenetration: 0.86,
                meanNeedleCraft: 0.87,
                meanTailoredInsulation: 0.88,
                meanThermalReduction: 0.82,
                meanCaveArtistry: 0.86,
                meanSymbolicCohesion: 0.84,
                meanBladeletKnapping: 0.88,
                meanAMI: 0.0,
                meanPCA: 0.0,
                amiRegime: "UNASSISTED_HAND_THRUSTER",
                pcaRegime: "PRAGMATIC_NON_SYMBOLIC"
            };
        }

        /**
         * Classify biological regime for 155th Channel (% AMI).
         * @param {number} val - Atlatl Mechanical Leverage Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyAMIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "UNASSISTED_HAND_THRUSTER",
                    label: "UNASSISTED HAND THRUSTER & CLOSE CONTACT",
                    badgeClass: "ami-badge ami-unassisted",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_LEVERAGE_THROWER",
                    label: "INCIPIENT LEVERAGE THROWER & SHORT DART",
                    badgeClass: "ami-badge ami-incipient",
                    color: "#fde047"
                };
            } else if (v < 75.0) {
                return {
                    code: "ATLATL_BALLISTIC_HUNTER",
                    label: "ATLATL BALLISTIC HUNTER & DISTANCE STRIKER",
                    badgeClass: "ami-badge ami-hunter",
                    color: "#eab308"
                };
            } else {
                return {
                    code: "APEX_LONG_RANGE_BALLISTICIAN",
                    label: "APEX LONG-RANGE BALLISTICIAN & MEGAFAUNA HARVESTER",
                    badgeClass: "ami-badge ami-apex",
                    color: "#ca8a04"
                };
            }
        }

        /**
         * Classify biological regime for 156th Channel (% PCA).
         * @param {number} val - Parietal Cave Artistry Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyPCARegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "PRAGMATIC_NON_SYMBOLIC",
                    label: "PRAGMATIC NON-SYMBOLIC FORAGER",
                    badgeClass: "pca-badge pca-pragmatic",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_PIGMENT_STENCILER",
                    label: "INCIPIENT PIGMENT STENCILER & HANDPRINT MARKER",
                    badgeClass: "pca-badge pca-stenciler",
                    color: "#f87171"
                };
            } else if (v < 75.0) {
                return {
                    code: "PARIETAL_CAVE_ARTIST",
                    label: "PARIETAL CAVE ARTIST & SHAMANIC RITUALIST",
                    badgeClass: "pca-badge pca-artist",
                    color: "#dc2626"
                };
            } else {
                return {
                    code: "APEX_SYMBOLIC_COGNITIVE_MASTER",
                    label: "APEX SYMBOLIC COGNITIVE MASTER & PALEOLITHIC VISIONARY",
                    badgeClass: "pca-badge pca-master",
                    color: "#991b1b"
                };
            }
        }

        /**
         * Update laboratory HUD panel DOM elements and push values into history circular buffer.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Historical telemetry circular buffer object.
         * @param {Object} sapManager - SapiensCognitionManager instance.
         */
        static step(organisms, historyData, sapManager) {
            if (!sapManager || typeof sapManager.getMetrics !== "function") return;

            const m = sapManager.getMetrics();
            const amiVal = Math.max(0, Math.min(100, m.meanAMIIndex || 0));
            const pcaVal = Math.max(0, Math.min(100, m.meanPCAIndex || 0));

            // 1. Update 155th & 156th Channel History Buffers
            if (historyData) {
                if (historyData.atlatlMechanicalIndex) {
                    historyData.atlatlMechanicalIndex.shift();
                    historyData.atlatlMechanicalIndex.push(amiVal);
                }
                if (historyData.parietalCaveArtIndex) {
                    historyData.parietalCaveArtIndex.shift();
                    historyData.parietalCaveArtIndex.push(pcaVal);
                }
            }

            // 2. Classify Regimes
            const amiReg = SapiensTelemetryManager.classifyAMIRegime(amiVal);
            const pcaReg = SapiensTelemetryManager.classifyPCARegime(pcaVal);

            // 3. Update DOM Elements if available
            if (typeof document !== "undefined" && document.getElementById) {
                const elAMI = document.getElementById("valAMIIndex");
                const elAMIStatus = document.getElementById("valAMIStatus");
                if (elAMI) {
                    elAMI.textContent = amiVal.toFixed(1) + "% AMI (" + amiReg.label + ")";
                }
                if (elAMIStatus) {
                    elAMIStatus.textContent = "SAPIENS: " + (m.totalSapiens || 0) + " | LEVERAGE: " + ((m.meanAtlatlLeverage || 0.88) * 100).toFixed(1) + "% | RANGE: " + (m.meanBallisticRangeMult || 3.5).toFixed(1) + "x | DARTS: " + (m.atlatlDartsLaunched || 0) + " | THROWERS: " + (m.activeAtlatlThrowers || 0);
                    elAMIStatus.className = amiReg.badgeClass;
                }

                const elPCA = document.getElementById("valPCAIndex");
                const elPCAStatus = document.getElementById("valPCAStatus");
                if (elPCA) {
                    elPCA.textContent = pcaVal.toFixed(1) + "% PCA (" + pcaReg.label + ")";
                }
                if (elPCAStatus) {
                    elPCAStatus.textContent = "NEEDLE CRAFT: " + ((m.meanNeedleCraft || 0.87) * 100).toFixed(1) + "% | THERMAL SAVING: " + ((m.meanThermalReduction || 0.82) * 100).toFixed(1) + "% | MURALS: " + (m.caveMuralsCreated || 0) + " | ARTISTS: " + (m.activeCaveArtists || 0) + " | TAILORS: " + (m.activeTailors || 0);
                    elPCAStatus.className = pcaReg.badgeClass;
                }
            }
        }
    }

    // Export module globally
    global.SapiensTelemetryManager = SapiensTelemetryManager;

})(typeof window !== "undefined" ? window : global);
