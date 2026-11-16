// BioEcosystem - Medieval Windmills, Heavy Mouldboard Plough & Magnetic Compass Telemetry
// Module: src/ui/telemetry_medieval.js
// Version: 12.4.0 (Hour 744 - Looks & UI Agent: 173rd Channel % WMI, 174th Channel % CNI, Windmill Amber & Compass Cobalt Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MedievalTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 173rd Telemetry Channel: Windmill & Mouldboard Plough Index (% WMI) - Windmill Amber (#ca8a04, #facc15)
     * - 174th Telemetry Channel: Compass Navigation & Oceanic Trade Index (% CNI) - Compass Cobalt (#1d4ed8, #60a5fa)
     */
    class MedievalTelemetryManager {
        /**
         * Classify 173rd Channel (% WMI) into 4 regimes.
         * @param {number} val - % WMI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyWMIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_MEDIEVAL_AGRO_POWER",
                    label: "APEX MEDIEVAL WIND-POWER & DEEP-CLAY AGRONOMY",
                    badgeClass: "wmi-badge wmi-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "TOWER_WINDMILL_MOULDBOARD",
                    label: "TOWER WINDMILL & HEAVY WHEELED MOULDBOARD",
                    badgeClass: "wmi-badge wmi-tower"
                };
            } else if (val >= 25) {
                return {
                    regime: "POST_WINDMILL_COULTER",
                    label: "EARLY POST WINDMILL & IRON COULTER PLOUGH",
                    badgeClass: "wmi-badge wmi-post"
                };
            } else {
                return {
                    regime: "RIVER_BOUND_LIGHT_ARD",
                    label: "RIVER-BOUND MILL & LIGHT SCRATCH ARD",
                    badgeClass: "wmi-badge wmi-ard"
                };
            }
        }

        /**
         * Classify 174th Channel (% CNI) into 4 regimes.
         * @param {number} val - % CNI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyCNIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_OCEANIC_NAVIGATION",
                    label: "APEX OCEANIC NAVIGATION & TRANS-BASIN FLEET",
                    badgeClass: "cni-badge cni-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "DRY_CARD_COMPASS_CARAVEL",
                    label: "DRY-CARD COMPASS & ALL-WEATHER PELAGIC TRADE",
                    badgeClass: "cni-badge cni-compass"
                };
            } else if (val >= 25) {
                return {
                    regime: "LODESTONE_NEEDLE_STEERING",
                    label: "FLOATING LODESTONE NEEDLE & STERNPOST RUDDER",
                    badgeClass: "cni-badge cni-lodestone"
                };
            } else {
                return {
                    regime: "COASTAL_DEAD_RECKONING",
                    label: "COASTAL SIGHT NAVIGATION & FAIR-WEATHER SAILING",
                    badgeClass: "cni-badge cni-coastal"
                };
            }
        }

        /**
         * Step telemetry computations, update circular history buffers, and refresh DOM HUD panels.
         * @param {Array} organisms - Population array.
         * @param {Object} historyData - Circular history buffers object.
         * @param {Object} medievalManager - MedievalNavigationManager instance.
         */
        static step(organisms, historyData, medievalManager) {
            if (!medievalManager || typeof medievalManager.getMetrics !== "function") return;

            const m = medievalManager.getMetrics();
            const wmiVal = Math.max(0, Math.min(100, m.meanWMIIndex || 0));
            const cniVal = Math.max(0, Math.min(100, m.meanCNIIndex || 0));

            if (historyData) {
                if (historyData.windmillMouldboardIndex) {
                    historyData.windmillMouldboardIndex.shift();
                    historyData.windmillMouldboardIndex.push(wmiVal);
                }
                if (historyData.compassNavigationIndex) {
                    historyData.compassNavigationIndex.shift();
                    historyData.compassNavigationIndex.push(cniVal);
                }
            }

            const wmiReg = MedievalTelemetryManager.classifyWMIRegime(wmiVal);
            const cniReg = MedievalTelemetryManager.classifyCNIRegime(cniVal);

            if (typeof document !== "undefined" && document.getElementById) {
                const elWMI = document.getElementById("valWMIIndex");
                const elWMIStatus = document.getElementById("valWMIStatus");
                if (elWMI) {
                    elWMI.textContent = wmiVal.toFixed(1) + "% WMI (" + wmiReg.label + ")";
                }
                if (elWMIStatus) {
                    elWMIStatus.textContent = "CITIZENS: " + (m.totalMedievalCitizens || 0) + " | WINDMILL: " + ((m.meanWindmillPower || 0.89) * 100).toFixed(1) + "% | PLOUGH: " + ((m.meanMouldboardTillage || 0.89) * 100).toFixed(1) + "% | MILLED: " + (m.windmillGrainMilled || 0);
                    elWMIStatus.className = wmiReg.badgeClass;
                }

                const elCNI = document.getElementById("valCNIIndex");
                const elCNIStatus = document.getElementById("valCNIStatus");
                if (elCNI) {
                    elCNI.textContent = cniVal.toFixed(1) + "% CNI (" + cniReg.label + ")";
                }
                if (elCNIStatus) {
                    elCNIStatus.textContent = "COMPASS: " + ((m.meanCompassNavigation || 0.89) * 100).toFixed(1) + "% | RANGE: " + (m.meanOceanicRange || 3.25).toFixed(2) + "x | VOYAGES: " + (m.oceanicVoyagesCompleted || 0);
                    elCNIStatus.className = cniReg.badgeClass;
                }
            }
        }
    }

    global.MedievalTelemetryManager = MedievalTelemetryManager;
})(typeof window !== "undefined" ? window : global);
