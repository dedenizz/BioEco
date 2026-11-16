// BioEcosystem - Early Placoderm Mandibular Jaw & Cranio-Thoracic Telemetry Dashboard
// Module: src/ui/telemetry_placoderm.js
// Version: 8.29.0 (Hour 549 - Looks & UI Agent: 106th Channel % CTS, Cranio-Thoracic Hinge Status & Double Placoderm HUD Panel)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PlacodermTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 105th Telemetry Channel: Gnathostome Jaw Index (% GJI) - Ember flame orange (#ea580c)
     * - 106th Telemetry Channel: Cranio-Thoracic Shear Index (% CTS) - Bloodstone crimson / garnet (#b91c1c)
     * - 4 Biological Regimes for % GJI (UNHINGED, INCIPIENT_JAW, SHEARING_JAW, APEX_CRUSHER)
     * - 4 Biological Regimes for % CTS (RIGID_NECK, INCIPIENT_HINGE, ARTICULATED_SHEAR, APEX_ARTHRODIRE)
     * - Real-time bite force, gnathal shearing sharpness, head elevation, double-joint gape, and cavitation suction metrics
     */
    class PlacodermTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Placoderm organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} placodermManager - Global PlacodermJawManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Placoderm metrics.
         */
        static calculateMetrics(organisms, placodermManager, tick) {
            let liveCount = 0;
            let placCount = 0;
            let snappingCount = 0;
            let wideGapeCount = 0;

            let sumGJI = 0.0;
            let sumCTS = 0.0;
            let sumBite = 0.0;
            let sumSharpness = 0.0;
            let sumTension = 0.0;
            let sumPenetration = 0.0;
            let sumJawGape = 0.0;
            let sumHeadElevation = 0.0;
            let sumTotalGape = 0.0;
            let sumEpaxial = 0.0;
            let sumFatigue = 0.0;
            let sumSuction = 0.0;
            let sumCavitation = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isPlacoderm) {
                        placCount++;

                        const gji = org.gnathostomeJawIndex !== undefined ? org.gnathostomeJawIndex : 55.0;
                        const cts = org.cranioThoracicShearIndex !== undefined ? org.cranioThoracicShearIndex : 50.0;
                        const bite = org.biteForceMagnitude !== undefined ? org.biteForceMagnitude : 1125.0;
                        const sharp = org.gnathalShearSharpness !== undefined ? org.gnathalShearSharpness : 0.82;
                        const tension = org.adductorMusclesTension !== undefined ? org.adductorMusclesTension : 0.75;
                        const pen = org.armorCrushPenetration !== undefined ? org.armorCrushPenetration : 0.68;
                        const jawGape = org.jawGapeAngle !== undefined ? org.jawGapeAngle : 0.38;
                        const headElevation = org.headElevationAngle !== undefined ? org.headElevationAngle : 0.30;
                        const totalGape = org.totalGapeAngle !== undefined ? org.totalGapeAngle : (jawGape + headElevation);
                        const epaxial = org.epaxialNeckMusclesTension !== undefined ? org.epaxialNeckMusclesTension : 0.78;
                        const fatigue = org.hingeJointFatigue !== undefined ? org.hingeJointFatigue : 0.05;
                        const suction = org.suctionPulseForce !== undefined ? org.suctionPulseForce : 2.4;
                        const cavitation = org.cavitationSuctionForce !== undefined ? org.cavitationSuctionForce : 4.2;

                        sumGJI += gji;
                        sumCTS += cts;
                        sumBite += bite;
                        sumSharpness += sharp;
                        sumTension += tension;
                        sumPenetration += pen;
                        sumJawGape += jawGape;
                        sumHeadElevation += headElevation;
                        sumTotalGape += totalGape;
                        sumEpaxial += epaxial;
                        sumFatigue += fatigue;
                        sumSuction += suction;
                        sumCavitation += cavitation;

                        if (org.isJawSnapping) snappingCount++;
                        if (totalGape > 0.65) wideGapeCount++;
                    }
                }
            }

            const placodermPrevalence = liveCount > 0 ? (placCount / liveCount) * 100.0 : 0.0;
            const meanGJI = placCount > 0 ? (sumGJI / placCount) : 0.0;
            const meanCTS = placCount > 0 ? (sumCTS / placCount) : 0.0;
            const meanBiteForce = placCount > 0 ? (sumBite / placCount) : 1125.0;
            const meanGnathalSharpness = placCount > 0 ? (sumSharpness / placCount) : 0.82;
            const meanAdductorTension = placCount > 0 ? (sumTension / placCount) : 0.75;
            const meanArmorPenetration = placCount > 0 ? (sumPenetration / placCount) : 0.68;
            const meanJawGape = placCount > 0 ? (sumJawGape / placCount) : 0.38;
            const meanHeadElevation = placCount > 0 ? (sumHeadElevation / placCount) : 0.30;
            const meanTotalGape = placCount > 0 ? (sumTotalGape / placCount) : 0.95;
            const meanEpaxialTension = placCount > 0 ? (sumEpaxial / placCount) : 0.78;
            const meanHingeFatigue = placCount > 0 ? (sumFatigue / placCount) : 0.05;
            const meanSuctionPulse = placCount > 0 ? (sumSuction / placCount) : 2.4;
            const meanCavitationSuction = placCount > 0 ? (sumCavitation / placCount) : 4.2;

            let apexStrikes = 0;
            let doubleJointStrikes = 0;
            let armorBreaches = 0;
            let suctionEvents = 0;
            let cavitationVortices = 0;
            let gnathalSharpenings = 0;
            let occlusalWears = 0;
            let gnathalRemodelings = 0;
            let fatigueStalls = 0;
            let shearedBiomass = 0.0;

            if (placodermManager && placodermManager.getMetrics) {
                const mgr = placodermManager.getMetrics();
                apexStrikes = mgr.apexPredationStrikes || 0;
                doubleJointStrikes = mgr.doubleJointGapeStrikes || 0;
                armorBreaches = mgr.armorBreachCrushes || 0;
                suctionEvents = mgr.suctionIntakeEvents || 0;
                cavitationVortices = mgr.cavitationVortexEvents || 0;
                gnathalSharpenings = mgr.gnathalSelfSharpenings || 0;
                occlusalWears = mgr.occlusalWearEvents || 0;
                gnathalRemodelings = mgr.gnathalRemodelingEvents || 0;
                fatigueStalls = mgr.hingeFatigueStalls || 0;
                shearedBiomass = mgr.cumulativeShearedBiomass || 0.0;
            }

            // 4 Distinct Biological Regimes for 105th Channel (% GJI)
            let gjiRegimeCode = "UNHINGED";
            let gjiRegimeTitle = "UNHINGED & CARTILAGINOUS GILL ARCHES";
            let gjiRegimeBadge = "gji-unhinged";

            if (meanGJI >= 85.0) {
                gjiRegimeCode = "APEX_CRUSHER";
                gjiRegimeTitle = "APEX CRUSHING POWER & DUNKLEOSTEUS GAPE";
                gjiRegimeBadge = "gji-apex";
            } else if (meanGJI >= 60.0) {
                gjiRegimeCode = "SHEARING_JAW";
                gjiRegimeTitle = "ARTICULATED SHEARING JAWS & SCISSOR OCCLUSION";
                gjiRegimeBadge = "gji-shearing";
            } else if (meanGJI >= 30.0) {
                gjiRegimeCode = "INCIPIENT_JAW";
                gjiRegimeTitle = "INCIPIENT JAW HINGE & BLUNT GNATHAL PLATES";
                gjiRegimeBadge = "gji-incipient";
            }

            // 4 Distinct Biological Regimes for 106th Channel (% CTS)
            let ctsRegimeCode = "RIGID_NECK";
            let ctsRegimeTitle = "RIGID NECK & IMMOBILE CRANIAL CARAPACE";
            let ctsRegimeBadge = "cts-rigid";

            if (meanCTS >= 85.0) {
                ctsRegimeCode = "APEX_ARTHRODIRE";
                ctsRegimeTitle = "APEX ARTHRODIRA DOUBLE-JOINTED CAVITATION GAPE";
                ctsRegimeBadge = "cts-apex";
            } else if (meanCTS >= 60.0) {
                ctsRegimeCode = "ARTICULATED_SHEAR";
                ctsRegimeTitle = "ARTICULATED CRANIAL HINGE & SHEARING GAPE";
                ctsRegimeBadge = "cts-articulated";
            } else if (meanCTS >= 30.0) {
                ctsRegimeCode = "INCIPIENT_HINGE";
                ctsRegimeTitle = "INCIPIENT NUCHAL HINGE & SLUGGISH LIFT";
                ctsRegimeBadge = "cts-incipient";
            }

            return {
                liveCount,
                placCount,
                snappingCount,
                wideGapeCount,
                placodermPrevalence,
                meanGJI,
                meanCTS,
                meanBiteForce,
                meanGnathalSharpness,
                meanAdductorTension,
                meanArmorPenetration,
                meanJawGape,
                meanHeadElevation,
                meanTotalGape,
                meanEpaxialTension,
                meanHingeFatigue,
                meanSuctionPulse,
                meanCavitationSuction,
                apexStrikes,
                doubleJointStrikes,
                armorBreaches,
                suctionEvents,
                cavitationVortices,
                gnathalSharpenings,
                occlusalWears,
                gnathalRemodelings,
                fatigueStalls,
                shearedBiomass,
                gjiRegimeCode,
                gjiRegimeTitle,
                gjiRegimeBadge,
                ctsRegimeCode,
                ctsRegimeTitle,
                ctsRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 105th (% GJI) and 106th (% CTS) Channels.
         * @param {Object} metrics - Calculated Placoderm telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 105 Readout (% GJI - Gnathostome Jaw Index)
            const valGJIIndexEl = document.getElementById("valGJIIndex");
            if (valGJIIndexEl) {
                valGJIIndexEl.textContent = metrics.meanGJI.toFixed(1) + "% GJI (" + metrics.gjiRegimeTitle + ")";
                if (metrics.meanGJI >= 85.0) {
                    valGJIIndexEl.style.color = "#fed7aa";
                } else if (metrics.meanGJI >= 60.0) {
                    valGJIIndexEl.style.color = "#ea580c";
                } else if (metrics.meanGJI >= 30.0) {
                    valGJIIndexEl.style.color = "#f97316";
                } else {
                    valGJIIndexEl.style.color = "#ef4444";
                }
            }

            // 2. Secondary Channel 105 Status
            const valGJIStatusEl = document.getElementById("valGJIStatus");
            if (valGJIStatusEl) {
                valGJIStatusEl.textContent =
                    "PLACODERMI: " + metrics.placCount + "/" + metrics.liveCount +
                    " (" + metrics.placodermPrevalence.toFixed(0) + "%) | BITE: " + metrics.meanBiteForce.toFixed(0) + " N" +
                    " | SHARPNESS: " + (metrics.meanGnathalSharpness * 100.0).toFixed(0) + "%" +
                    " | TENSION: " + (metrics.meanAdductorTension * 100.0).toFixed(0) + "%" +
                    " | GAPE: " + (metrics.meanJawGape * (180 / Math.PI)).toFixed(1) + " deg" +
                    " | PENETRATION: " + (metrics.meanArmorPenetration * 100.0).toFixed(0) + "%" +
                    " | STRIKES: " + metrics.apexStrikes +
                    " | CRUSHES: " + metrics.armorBreaches;
                valGJIStatusEl.style.color = metrics.meanGJI >= 50.0 ? "#fb923c" : "#ea580c";
            }

            // 3. Primary Channel 106 Readout (% CTS - Cranio-Thoracic Shear Index)
            const valCTSIndexEl = document.getElementById("valCTSIndex");
            if (valCTSIndexEl) {
                valCTSIndexEl.textContent = metrics.meanCTS.toFixed(1) + "% CTS (" + metrics.ctsRegimeTitle + ")";
                if (metrics.meanCTS >= 85.0) {
                    valCTSIndexEl.style.color = "#fca5a5";
                } else if (metrics.meanCTS >= 60.0) {
                    valCTSIndexEl.style.color = "#b91c1c";
                } else if (metrics.meanCTS >= 30.0) {
                    valCTSIndexEl.style.color = "#ea580c";
                } else {
                    valCTSIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 106 Status
            const valCTSStatusEl = document.getElementById("valCTSStatus");
            if (valCTSStatusEl) {
                valCTSStatusEl.textContent =
                    "ELEVATION: " + (metrics.meanHeadElevation * (180 / Math.PI)).toFixed(1) + " deg | " +
                    "TOTAL GAPE: " + (metrics.meanTotalGape * (180 / Math.PI)).toFixed(1) + " deg | " +
                    "EPAXIAL: " + (metrics.meanEpaxialTension * 100.0).toFixed(0) + "% | " +
                    "FATIGUE: " + (metrics.meanHingeFatigue * 100.0).toFixed(0) + "% | " +
                    "CAVITATION: " + metrics.meanCavitationSuction.toFixed(1) + " N | " +
                    "GAPES: " + metrics.doubleJointStrikes + " | " +
                    "VORTICES: " + metrics.cavitationVortices;
                valCTSStatusEl.style.color = metrics.meanCTS >= 50.0 ? "#f87171" : "#b91c1c";
            }

            // 5. Dedicated Placoderm Laboratory HUD Badges & Meters (if DOM present)
            const valGJIBadgeEl = document.getElementById("valGJIBadge");
            if (valGJIBadgeEl) {
                valGJIBadgeEl.className = "gji-badge " + metrics.gjiRegimeBadge;
                valGJIBadgeEl.textContent = metrics.gjiRegimeCode;
            }

            const valGJIMeterFillEl = document.getElementById("valGJIMeterFill");
            if (valGJIMeterFillEl) {
                valGJIMeterFillEl.style.width = Math.max(0, Math.min(100, metrics.meanGJI)).toFixed(1) + "%";
                valGJIMeterFillEl.style.backgroundColor = metrics.meanGJI >= 60.0 ? "#ea580c" : "#f97316";
            }

            const valCTSBadgeEl = document.getElementById("valCTSBadge");
            if (valCTSBadgeEl) {
                valCTSBadgeEl.className = "cts-badge " + metrics.ctsRegimeBadge;
                valCTSBadgeEl.textContent = metrics.ctsRegimeCode;
            }

            const valCTSMeterFillEl = document.getElementById("valCTSMeterFill");
            if (valCTSMeterFillEl) {
                valCTSMeterFillEl.style.width = Math.max(0, Math.min(100, metrics.meanCTS)).toFixed(1) + "%";
                valCTSMeterFillEl.style.backgroundColor = metrics.meanCTS >= 60.0 ? "#b91c1c" : "#dc2626";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 105th Channel: % GJI
            if (!historyData.gnathostomeJawIndex) {
                historyData.gnathostomeJawIndex = new Array(74).fill(0);
            }
            const chartValGJI = Number.isFinite(metrics.meanGJI) ?
                Math.max(0, Math.min(100, metrics.meanGJI)) : 0;
            historyData.gnathostomeJawIndex.shift();
            historyData.gnathostomeJawIndex.push(chartValGJI);

            // 106th Channel: % CTS (Cranio-Thoracic Shear Index)
            if (!historyData.cranioThoracicShearIndex) {
                historyData.cranioThoracicShearIndex = new Array(74).fill(0);
            }
            const chartValCTS = Number.isFinite(metrics.meanCTS) ?
                Math.max(0, Math.min(100, metrics.meanCTS)) : 0;
            historyData.cranioThoracicShearIndex.shift();
            historyData.cranioThoracicShearIndex.push(chartValCTS);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} placodermManager - Global PlacodermJawManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, placodermManager, tick) {
            const metrics = PlacodermTelemetryManager.calculateMetrics(organisms, placodermManager, tick);
            PlacodermTelemetryManager.updateHUD(metrics);
            PlacodermTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PlacodermTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.PlacodermTelemetryManager = PlacodermTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
