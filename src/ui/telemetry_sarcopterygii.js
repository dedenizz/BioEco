// BioEcosystem - Early Sarcopterygii Lobe-Fin & Pulmonary Respiration Telemetry Dashboard
// Module: src/ui/telemetry_sarcopterygii.js
// Version: 8.47.0 (Hour 567 - Looks & UI Agent: 111th Channel % LFI, 112th Channel % PRI, Amber & Orange Badges and HUD Panel)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SarcopterygiiTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 111th Telemetry Channel: Lobe-Fin Locomotion Index (% LFI) - Earth amber (#d97706)
     * - 112th Telemetry Channel: Pulmonary Respiration & Air-Breathing Index (% PRI) - Flame orange (#ea580c)
     * - 4 Biological Regimes for % LFI (RAY_PROPELLED, INCIPIENT_STALK, PROP_CRAWLER, TETRAPOD_GAIT)
     * - 4 Biological Regimes for % PRI (AQUATIC_GILL_ONLY, OCCASIONAL_GULP, BIMODAL_BREATHER, OBLIGATE_PULMONARY)
     * - Real-time lobe-fin torque, substrate prop-up efficiency, atmospheric air reserve, and surface gulp counts
     */
    class SarcopterygiiTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Sarcopterygii organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} lobeFinManager - Global SarcopterygiiLobeFinManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Sarcopterygii metrics.
         */
        static calculateMetrics(organisms, lobeFinManager, tick) {
            let liveCount = 0;
            let sarcCount = 0;
            let substrateCrawlers = 0;
            let airBreathers = 0;

            let sumLFI = 0.0;
            let sumPRI = 0.0;
            let sumTorque = 0.0;
            let sumPropUp = 0.0;
            let sumAirReserve = 0.0;
            let sumVascular = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isSarcopterygii) {
                        sarcCount++;

                        const lfi = org.lobeFinLocomotionIndex !== undefined ? org.lobeFinLocomotionIndex : 50.0;
                        const pri = org.pulmonaryRespirationIndex !== undefined ? org.pulmonaryRespirationIndex : 50.0;
                        const torque = org.lobeFinMuscularTorque !== undefined ? org.lobeFinMuscularTorque : 1.75;
                        const propUp = org.substratePropUpEfficiency !== undefined ? org.substratePropUpEfficiency : 0.72;
                        const reserve = org.atmosphericOxygenReserve !== undefined ? org.atmosphericOxygenReserve : 80.0;
                        const vasc = org.pulmonaryVascularDensity !== undefined ? org.pulmonaryVascularDensity : 0.78;

                        sumLFI += lfi;
                        sumPRI += pri;
                        sumTorque += torque;
                        sumPropUp += propUp;
                        sumAirReserve += reserve;
                        sumVascular += vasc;

                        if (org.substrateContact) substrateCrawlers++;
                        if ((org.atmosphericOxygenReserve || 0) > 40.0) airBreathers++;
                    }
                }
            }

            const sarcopterygiiPrevalence = liveCount > 0 ? (sarcCount / liveCount) * 100.0 : 0.0;
            const meanLFI = sarcCount > 0 ? (sumLFI / sarcCount) : 0.0;
            const meanPRI = sarcCount > 0 ? (sumPRI / sarcCount) : 0.0;
            const meanTorque = sarcCount > 0 ? (sumTorque / sarcCount) : 1.75;
            const meanPropUp = sarcCount > 0 ? (sumPropUp / sarcCount) : 0.72;
            const meanAirReserve = sarcCount > 0 ? (sumAirReserve / sarcCount) : 0.0;
            const meanVascular = sarcCount > 0 ? (sumVascular / sarcCount) : 0.78;

            let walkingEvents = 0;
            let surfaceGulps = 0;
            let pulmonaryBreaths = 0;
            let ambushStrikes = 0;
            let pulmonaryBiomass = 0.0;

            if (lobeFinManager && lobeFinManager.getMetrics) {
                const mgr = lobeFinManager.getMetrics();
                walkingEvents = mgr.substrateWalkingEvents || 0;
                surfaceGulps = mgr.surfaceAirGulpEvents || 0;
                pulmonaryBreaths = mgr.pulmonaryBreathingEvents || 0;
                ambushStrikes = mgr.periscopeAmbushStrikes || 0;
                pulmonaryBiomass = mgr.cumulativePulmonaryBiomass || 0.0;
            }

            // 4 Distinct Biological Regimes for 111th Channel (% LFI)
            let lfiRegimeCode = "RAY_PROPELLED";
            let lfiRegimeTitle = "RAY PROPELLED & BENTHIC COLLAPSE SENSITIVITY";
            let lfiRegimeBadge = "lfi-ray";

            if (meanLFI >= 85.0) {
                lfiRegimeCode = "TETRAPOD_GAIT";
                lfiRegimeTitle = "ADVANCED TETRAPODOMORPH STRIDE & MUD-BANK PROXIMITY MASTERY";
                lfiRegimeBadge = "lfi-gait";
            } else if (meanLFI >= 60.0) {
                lfiRegimeCode = "PROP_CRAWLER";
                lfiRegimeTitle = "ROBUST SUBSTRATE WALKING & 75% MUD FRICTION MITIGATION";
                lfiRegimeBadge = "lfi-crawler";
            } else if (meanLFI >= 30.0) {
                lfiRegimeCode = "INCIPIENT_STALK";
                lfiRegimeTitle = "INCIPIENT MUSCULAR STALKS & INTERMITTENT PROP-UP";
                lfiRegimeBadge = "lfi-incipient";
            }

            // 4 Distinct Biological Regimes for 112th Channel (% PRI)
            let priRegimeCode = "AQUATIC_GILL_ONLY";
            let priRegimeTitle = "AQUATIC GILL ONLY & ANOXIC ASPHYXIATION RISK";
            let priRegimeBadge = "pri-gill";

            if (meanPRI >= 85.0) {
                priRegimeCode = "OBLIGATE_PULMONARY";
                priRegimeTitle = "OBLIGATE AIR-BREATHER & TOTAL ANOXIA IMMUNITY";
                priRegimeBadge = "pri-obligate";
            } else if (meanPRI >= 60.0) {
                priRegimeCode = "BIMODAL_BREATHER";
                priRegimeTitle = "BIMODAL DUAL-RESPIRATION & HYPOXIC SWAMP SURVIVAL";
                priRegimeBadge = "pri-bimodal";
            } else if (meanPRI >= 30.0) {
                priRegimeCode = "OCCASIONAL_GULP";
                priRegimeTitle = "OCCASIONAL SURFACE GULPS & MODERATE LUNG CAPACITY";
                priRegimeBadge = "pri-gulp";
            }

            return {
                liveCount,
                sarcCount,
                substrateCrawlers,
                airBreathers,
                sarcopterygiiPrevalence,
                meanLFI,
                meanPRI,
                meanTorque,
                meanPropUp,
                meanAirReserve,
                meanVascular,
                walkingEvents,
                surfaceGulps,
                pulmonaryBreaths,
                ambushStrikes,
                pulmonaryBiomass,
                lfiRegimeCode,
                lfiRegimeTitle,
                lfiRegimeBadge,
                priRegimeCode,
                priRegimeTitle,
                priRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 111th (% LFI) and 112th (% PRI) Channels.
         * @param {Object} metrics - Calculated Sarcopterygii telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 111 Readout (% LFI - Lobe-Fin Locomotion Index)
            const valLFIIndexEl = document.getElementById("valLFIIndex");
            if (valLFIIndexEl) {
                valLFIIndexEl.textContent = metrics.meanLFI.toFixed(1) + "% LFI (" + metrics.lfiRegimeTitle + ")";
                if (metrics.meanLFI >= 85.0) {
                    valLFIIndexEl.style.color = "#fbbf24";
                } else if (metrics.meanLFI >= 60.0) {
                    valLFIIndexEl.style.color = "#f59e0b";
                } else if (metrics.meanLFI >= 30.0) {
                    valLFIIndexEl.style.color = "#d97706";
                } else {
                    valLFIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 111 Status
            const valLFIStatusEl = document.getElementById("valLFIStatus");
            if (valLFIStatusEl) {
                valLFIStatusEl.textContent =
                    "SARCOPTERYGII: " + metrics.sarcCount + "/" + metrics.liveCount +
                    " (" + metrics.sarcopterygiiPrevalence.toFixed(0) + "%) | TORQUE: " + metrics.meanTorque.toFixed(2) + "x" +
                    " | PROP-UP: " + (metrics.meanPropUp * 100.0).toFixed(0) + "%" +
                    " | CRAWLERS: " + metrics.substrateCrawlers +
                    " | WALKING: " + metrics.walkingEvents +
                    " | AMBUSHES: " + metrics.ambushStrikes;
                valLFIStatusEl.style.color = metrics.meanLFI >= 50.0 ? "#fbbf24" : "#f59e0b";
            }

            // 3. Primary Channel 112 Readout (% PRI - Pulmonary Respiration & Air-Breathing)
            const valPRIIndexEl = document.getElementById("valPRIIndex");
            if (valPRIIndexEl) {
                valPRIIndexEl.textContent = metrics.meanPRI.toFixed(1) + "% PRI (" + metrics.priRegimeTitle + ")";
                if (metrics.meanPRI >= 85.0) {
                    valPRIIndexEl.style.color = "#f97316";
                } else if (metrics.meanPRI >= 60.0) {
                    valPRIIndexEl.style.color = "#ea580c";
                } else if (metrics.meanPRI >= 30.0) {
                    valPRIIndexEl.style.color = "#c2410c";
                } else {
                    valPRIIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 112 Status
            const valPRIStatusEl = document.getElementById("valPRIStatus");
            if (valPRIStatusEl) {
                valPRIStatusEl.textContent =
                    "AIR RESERVE: " + metrics.meanAirReserve.toFixed(0) + "% | " +
                    "VASCULAR: " + (metrics.meanVascular * 100.0).toFixed(0) + "% | " +
                    "GULPS: " + metrics.surfaceGulps + " | " +
                    "LUNG BREATHS: " + metrics.pulmonaryBreaths + " | " +
                    "BIOMASS: " + metrics.pulmonaryBiomass.toFixed(1) + " mg";
                valPRIStatusEl.style.color = metrics.meanPRI >= 50.0 ? "#fb923c" : "#ea580c";
            }

            // 5. Dedicated Sarcopterygii Laboratory HUD Badges (if DOM present)
            const valLFIBadgeEl = document.getElementById("valLFIBadge");
            if (valLFIBadgeEl) {
                valLFIBadgeEl.className = "lfi-badge " + metrics.lfiRegimeBadge;
                valLFIBadgeEl.textContent = metrics.lfiRegimeCode;
            }

            const valPRIBadgeEl = document.getElementById("valPRIBadge");
            if (valPRIBadgeEl) {
                valPRIBadgeEl.className = "pri-badge " + metrics.priRegimeBadge;
                valPRIBadgeEl.textContent = metrics.priRegimeCode;
            }
        }

        /**
         * Main telemetry step entrypoint executed per simulation tick.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular buffers object.
         * @param {Object} lobeFinManager - Global SarcopterygiiLobeFinManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, lobeFinManager, tick) {
            const metrics = this.calculateMetrics(organisms, lobeFinManager, tick);

            // Update circular history buffers for Lotka-Volterra graphing
            if (historyData) {
                if (historyData.lobeFinLocomotionIndex) {
                    historyData.lobeFinLocomotionIndex.shift();
                    historyData.lobeFinLocomotionIndex.push(Math.max(0, Math.min(100, metrics.meanLFI)));
                }
                if (historyData.pulmonaryRespirationRate) {
                    historyData.pulmonaryRespirationRate.shift();
                    historyData.pulmonaryRespirationRate.push(Math.max(0, Math.min(100, metrics.meanPRI)));
                }
            }

            // Update DOM HUD every 4 ticks to maintain 60 FPS performance
            if (tick % 4 === 0) {
                this.updateHUD(metrics);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SarcopterygiiTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.SarcopterygiiTelemetryManager = SarcopterygiiTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
