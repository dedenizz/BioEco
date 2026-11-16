// BioEcosystem - Early Osteichthyes Swim Bladder & Opercular Respiration Telemetry Dashboard
// Module: src/ui/telemetry_osteichthyes.js
// Version: 8.41.0 (Hour 561 - Looks & UI Agent: 109th Channel % SBI, 110th Channel % OVR, Emerald & Coral Badges and HUD Panel)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OsteichthyesTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 109th Telemetry Channel: Swim Bladder Hydrostatic Index (% SBI) - Emerald ocean green (#10b981)
     * - 110th Telemetry Channel: Opercular Ventilation Rate & Dual-Pump Index (% OVR) - Coral rose (#f43f5e)
     * - 4 Biological Regimes for % SBI (NEGATIVE_SINKER, INCIPIENT_BUBBLE, HYDROSTATIC_HOVER, BUOYANCY_MASTER)
     * - 4 Biological Regimes for % OVR (PASSIVE_RAM_ONLY, SLUGGISH_FLAP, DUAL_PUMP_ACTIVE, HYPERVENTILATING_AERO)
     * - Real-time swim bladder volume, hover energy savings, opercular ventilation rate, and fin ray count metrics
     */
    class OsteichthyesTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Osteichthyes organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} swimBladderManager - Global OsteichthyesSwimBladderManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Osteichthyes metrics.
         */
        static calculateMetrics(organisms, swimBladderManager, tick) {
            let liveCount = 0;
            let ostCount = 0;
            let hoverCount = 0;
            let stationaryBreathers = 0;

            let sumSBI = 0.0;
            let sumOVR = 0.0;
            let sumVolume = 0.0;
            let sumGasGland = 0.0;
            let sumDualPump = 0.0;
            let sumRays = 0.0;
            let sumBoneDensity = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isOsteichthyes) {
                        ostCount++;

                        const sbi = org.swimBladderIndex !== undefined ? org.swimBladderIndex : 50.0;
                        const ovr = org.opercularVentilationIndex !== undefined ? org.opercularVentilationIndex : 50.0;
                        const vol = org.swimBladderVolume !== undefined ? org.swimBladderVolume : 1.0;
                        const gland = org.gasGlandSecretionRate !== undefined ? org.gasGlandSecretionRate : 0.12;
                        const dualPump = org.dualPumpEfficiency !== undefined ? org.dualPumpEfficiency : 0.78;
                        const rays = org.finRayCount !== undefined ? org.finRayCount : 16;
                        const bone = org.endochondralBoneDensity !== undefined ? org.endochondralBoneDensity : 0.76;

                        sumSBI += sbi;
                        sumOVR += ovr;
                        sumVolume += vol;
                        sumGasGland += gland;
                        sumDualPump += dualPump;
                        sumRays += rays;
                        sumBoneDensity += bone;

                        if (org.neutralBuoyancyHoverState) hoverCount++;
                        if (org.motionlessBreathingActive) stationaryBreathers++;
                    }
                }
            }

            const osteichthyesPrevalence = liveCount > 0 ? (ostCount / liveCount) * 100.0 : 0.0;
            const meanSBI = ostCount > 0 ? (sumSBI / ostCount) : 0.0;
            const meanOVR = ostCount > 0 ? (sumOVR / ostCount) : 0.0;
            const meanVolume = ostCount > 0 ? (sumVolume / ostCount) : 1.0;
            const meanGasGland = ostCount > 0 ? (sumGasGland / ostCount) : 0.12;
            const meanDualPump = ostCount > 0 ? (sumDualPump / ostCount) : 0.78;
            const meanRays = ostCount > 0 ? (sumRays / ostCount) : 16.0;
            const meanBoneDensity = ostCount > 0 ? (sumBoneDensity / ostCount) : 0.76;

            let hoverEvents = 0;
            let motionlessBreathingEvents = 0;
            let gasGlandEvents = 0;
            let finRayManeuvers = 0;
            let hoverEnergySaved = 0.0;

            if (swimBladderManager && swimBladderManager.getMetrics) {
                const mgr = swimBladderManager.getMetrics();
                hoverEvents = mgr.neutralBuoyancyHoverEvents || 0;
                motionlessBreathingEvents = mgr.motionlessBreathingEvents || 0;
                gasGlandEvents = mgr.gasGlandSecretionEvents || 0;
                finRayManeuvers = mgr.finRayMicroManeuvers || 0;
                hoverEnergySaved = mgr.cumulativeHoverEnergySaved || 0.0;
            }

            // 4 Distinct Biological Regimes for 109th Channel (% SBI)
            let sbiRegimeCode = "NEGATIVE_SINKER";
            let sbiRegimeTitle = "NEGATIVE SINKER & COMPULSORY CONTINUOUS PROPULSION";
            let sbiRegimeBadge = "sbi-sinker";

            if (meanSBI >= 85.0) {
                sbiRegimeCode = "BUOYANCY_MASTER";
                sbiRegimeTitle = "APEX TELEOST BUOYANCY & ZERO-EFFORT PELAGIC SUSPENSION";
                sbiRegimeBadge = "sbi-master";
            } else if (meanSBI >= 60.0) {
                sbiRegimeCode = "HYDROSTATIC_HOVER";
                sbiRegimeTitle = "STABLE HYDROSTATIC EQUILIBRIUM & 65% HOVER ENERGY SAVINGS";
                sbiRegimeBadge = "sbi-hover";
            } else if (meanSBI >= 30.0) {
                sbiRegimeCode = "INCIPIENT_BUBBLE";
                sbiRegimeTitle = "INCIPIENT GAS BLADDER & PARTIAL VERTICAL TRIM";
                sbiRegimeBadge = "sbi-incipient";
            }

            // 4 Distinct Biological Regimes for 110th Channel (% OVR)
            let ovrRegimeCode = "PASSIVE_RAM_ONLY";
            let ovrRegimeTitle = "PASSIVE RAM ONLY & MOTIONLESS ASPHYXIATION RISK";
            let ovrRegimeBadge = "ovr-ram";

            if (meanOVR >= 85.0) {
                ovrRegimeCode = "HYPERVENTILATING_AERO";
                ovrRegimeTitle = "OPTIMAL HIGH-FLOW BRANCHIAL OXYGENATION & AMBUSH MASTERY";
                ovrRegimeBadge = "ovr-hyper";
            } else if (meanOVR >= 60.0) {
                ovrRegimeCode = "DUAL_PUMP_ACTIVE";
                ovrRegimeTitle = "SYNCHRONIZED BUCCAL-OPERCULAR DUAL-PUMP & RESTING BREATHING";
                ovrRegimeBadge = "ovr-dual";
            } else if (meanOVR >= 30.0) {
                ovrRegimeCode = "SLUGGISH_FLAP";
                ovrRegimeTitle = "SLUGGISH OPERCULAR FLAP & INCIPIENT DUAL-PUMP SUCTION";
                ovrRegimeBadge = "ovr-sluggish";
            }

            return {
                liveCount,
                ostCount,
                hoverCount,
                stationaryBreathers,
                osteichthyesPrevalence,
                meanSBI,
                meanOVR,
                meanVolume,
                meanGasGland,
                meanDualPump,
                meanRays,
                meanBoneDensity,
                hoverEvents,
                motionlessBreathingEvents,
                gasGlandEvents,
                finRayManeuvers,
                hoverEnergySaved,
                sbiRegimeCode,
                sbiRegimeTitle,
                sbiRegimeBadge,
                ovrRegimeCode,
                ovrRegimeTitle,
                ovrRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 109th (% SBI) and 110th (% OVR) Channels.
         * @param {Object} metrics - Calculated Osteichthyes telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 109 Readout (% SBI - Swim Bladder Hydrostatic Index)
            const valSBIIndexEl = document.getElementById("valSBIIndex");
            if (valSBIIndexEl) {
                valSBIIndexEl.textContent = metrics.meanSBI.toFixed(1) + "% SBI (" + metrics.sbiRegimeTitle + ")";
                if (metrics.meanSBI >= 85.0) {
                    valSBIIndexEl.style.color = "#34d399";
                } else if (metrics.meanSBI >= 60.0) {
                    valSBIIndexEl.style.color = "#10b981";
                } else if (metrics.meanSBI >= 30.0) {
                    valSBIIndexEl.style.color = "#059669";
                } else {
                    valSBIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 109 Status
            const valSBIStatusEl = document.getElementById("valSBIStatus");
            if (valSBIStatusEl) {
                valSBIStatusEl.textContent =
                    "OSTEICHTHYES: " + metrics.ostCount + "/" + metrics.liveCount +
                    " (" + metrics.osteichthyesPrevalence.toFixed(0) + "%) | BLADDER: " + metrics.meanVolume.toFixed(2) +
                    " | HOVER: " + metrics.hoverCount +
                    " | GAS GLAND: " + (metrics.meanGasGland * 100.0).toFixed(0) + "%" +
                    " | SAVINGS: " + metrics.hoverEnergySaved.toFixed(2) + " J" +
                    " | HOVERS: " + metrics.hoverEvents;
                valSBIStatusEl.style.color = metrics.meanSBI >= 50.0 ? "#34d399" : "#10b981";
            }

            // 3. Primary Channel 110 Readout (% OVR - Opercular Ventilation Rate & Dual-Pump)
            const valOVRIndexEl = document.getElementById("valOVRIndex");
            if (valOVRIndexEl) {
                valOVRIndexEl.textContent = metrics.meanOVR.toFixed(1) + "% OVR (" + metrics.ovrRegimeTitle + ")";
                if (metrics.meanOVR >= 85.0) {
                    valOVRIndexEl.style.color = "#fb7185";
                } else if (metrics.meanOVR >= 60.0) {
                    valOVRIndexEl.style.color = "#f43f5e";
                } else if (metrics.meanOVR >= 30.0) {
                    valOVRIndexEl.style.color = "#e11d48";
                } else {
                    valOVRIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 110 Status
            const valOVRStatusEl = document.getElementById("valOVRStatus");
            if (valOVRStatusEl) {
                valOVRStatusEl.textContent =
                    "DUAL PUMP: " + (metrics.meanDualPump * 100.0).toFixed(0) + "% | " +
                    "RAYS: " + metrics.meanRays.toFixed(1) + " rays | " +
                    "BONE DENSITY: " + (metrics.meanBoneDensity * 100.0).toFixed(0) + "% | " +
                    "STATIONARY BREATHING: " + metrics.stationaryBreathers + " | " +
                    "MANEUVERS: " + metrics.finRayManeuvers;
                valOVRStatusEl.style.color = metrics.meanOVR >= 50.0 ? "#fb7185" : "#f43f5e";
            }

            // 5. Dedicated Osteichthyes Laboratory HUD Badges (if DOM present)
            const valSBIBadgeEl = document.getElementById("valSBIBadge");
            if (valSBIBadgeEl) {
                valSBIBadgeEl.className = "sbi-badge " + metrics.sbiRegimeBadge;
                valSBIBadgeEl.textContent = metrics.sbiRegimeCode;
            }

            const valOVRBadgeEl = document.getElementById("valOVRBadge");
            if (valOVRBadgeEl) {
                valOVRBadgeEl.className = "ovr-badge " + metrics.ovrRegimeBadge;
                valOVRBadgeEl.textContent = metrics.ovrRegimeCode;
            }
        }

        /**
         * Main telemetry step entrypoint executed per simulation tick.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular buffers object.
         * @param {Object} swimBladderManager - Global OsteichthyesSwimBladderManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, swimBladderManager, tick) {
            const metrics = this.calculateMetrics(organisms, swimBladderManager, tick);

            // Update circular history buffers for Lotka-Volterra graphing
            if (historyData) {
                if (historyData.swimBladderIndex) {
                    historyData.swimBladderIndex.shift();
                    historyData.swimBladderIndex.push(Math.max(0, Math.min(100, metrics.meanSBI)));
                }
                if (historyData.opercularVentilationRate) {
                    historyData.opercularVentilationRate.shift();
                    historyData.opercularVentilationRate.push(Math.max(0, Math.min(100, metrics.meanOVR)));
                }
            }

            // Update DOM HUD every 4 ticks to maintain 60 FPS performance
            if (tick % 4 === 0) {
                this.updateHUD(metrics);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OsteichthyesTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.OsteichthyesTelemetryManager = OsteichthyesTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
