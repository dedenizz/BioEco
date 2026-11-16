// BioEcosystem - Early Craniata Dual Slime Defense (% SCI) & Oral Suction Traction (% OTI) Telemetry
// Module: src/ui/telemetry_craniata.js
// Version: 8.08.0 (Hour 528 - Looks & UI Agent: 102nd Channel % OTI & Dual Craniata HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CraniataTelemetryManager
     * High-precision laboratory telemetry tracking for early Craniata / Agnatha (hagfish & lampreys) biology:
     * - Channel 101: Slime Defense Capacity Index (% SCI) - Cartilaginous braincase integrity, slime payload reserve, hydrogel expansion, and olfactory foraging
     * - Channel 102: Oral Suction & Parasitic Traction Index (% OTI) - Buccal funnel vacuum force, keratin teeth sharpness, tidal respiration, and lamphredin secretion
     * - Evaluates chondrocranium structural cohesion [0.40 - 0.98] and cranial armor defense against predatory crush damage
     * - Monitors ventrolateral slime glands [70 - 150 pairs] and active protein thread payload reserve [0 - 100 mg]
     * - Audits explosive 300-800x hydrogel cloud expansion and predator gill filament suffocation incidents
     * - Tracks buccal funnel suction traction force (1.2 - 4.5 N) and concentric keratin teeth rows (3 - 5 rows)
     * - Analyzes tidal branchial ventilation (0.8 - 2.2 Hz) across 7 pairs of gill pouches during oral latching
     * - Implements 4 distinct biological regimes for both the 101st (% SCI) and 102nd (% OTI) telemetry channels
     * - Renders laboratory dual HUD indicators, status telemetry lines, and circular history buffers
     */
    class CraniataTelemetryManager {
        /**
         * Calculate dish-wide Craniata physiological, defense, and traction metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} craniataManager - Global CraniataSlimeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Craniata telemetry metrics.
         */
        static calculateMetrics(organisms, craniataManager, tick) {
            let liveCount = 0;
            let craniataCount = 0;
            let hagfishCount = 0;
            let lampreyCount = 0;
            let activeClouds = 0;
            let activeKnots = 0;
            let activeAttached = 0;

            let sumSCI = 0.0;
            let sumOTI = 0.0;
            let sumChondro = 0.0;
            let sumArmor = 0.0;
            let sumPayload = 0.0;
            let sumGlands = 0;
            let sumExpansion = 0.0;
            let sumOlfactory = 0.0;
            let sumScavenging = 0.0;
            let sumUndulation = 0.0;
            let sumTraction = 0.0;
            let sumTeethSharpness = 0.0;
            let sumTidalRate = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isCraniata) {
                        craniataCount++;

                        const sci = org.slimeDefenseCapacity !== undefined ? org.slimeDefenseCapacity : 50.0;
                        const oti = org.oralSuctionTractionIndex !== undefined ? org.oralSuctionTractionIndex : 45.0;
                        const chondro = org.chondrocraniumIntegrity !== undefined ? org.chondrocraniumIntegrity : 0.85;
                        const armor = org.cranialArmorDefense !== undefined ? org.cranialArmorDefense : 0.55;
                        const payload = org.slimePayload !== undefined ? org.slimePayload : 65.0;
                        const glands = org.slimeGlandCount || 110;
                        const expansion = org.slimeExpansionRatio || 500.0;
                        const olfactory = org.olfactoryAcuity || 0.82;
                        const scavenging = org.benthicScavengingRate || 0.38;
                        const undulation = org.eelLikeUndulationVelocity || 2.10;
                        const traction = org.parasiticTractionForce || 2.8;
                        const teethSharpness = org.keratinTeethSharpness || 0.85;
                        const tidalRate = org.tidalVentilationFrequency || 1.4;

                        sumSCI += sci;
                        sumOTI += oti;
                        sumChondro += chondro;
                        sumArmor += armor;
                        sumPayload += payload;
                        sumGlands += glands;
                        sumExpansion += expansion;
                        sumOlfactory += olfactory;
                        sumScavenging += scavenging;
                        sumUndulation += undulation;
                        sumTraction += traction;
                        sumTeethSharpness += teethSharpness;
                        sumTidalRate += tidalRate;

                        if (org.hasPetromyzontidaTrait) {
                            lampreyCount++;
                            if (org.isParasiticAttached) activeAttached++;
                        } else {
                            hagfishCount++;
                            if (org.isSlimeCloudActive) activeClouds++;
                            if (org.bodyKnottingActive) activeKnots++;
                        }
                    }
                }
            }

            const craniataPrevalence = liveCount > 0 ? (craniataCount / liveCount) * 100.0 : 0.0;
            const meanSCI = craniataCount > 0 ? (sumSCI / craniataCount) : 0.0;
            const meanOTI = craniataCount > 0 ? (sumOTI / craniataCount) : 0.0;
            const meanChondro = craniataCount > 0 ? (sumChondro / craniataCount) : 0.85;
            const meanArmor = craniataCount > 0 ? (sumArmor / craniataCount) : 0.55;
            const meanPayload = craniataCount > 0 ? (sumPayload / craniataCount) : 65.0;
            const meanGlands = craniataCount > 0 ? (sumGlands / craniataCount) : 110;
            const meanExpansion = craniataCount > 0 ? (sumExpansion / craniataCount) : 500.0;
            const meanOlfactory = craniataCount > 0 ? (sumOlfactory / craniataCount) : 0.82;
            const meanScavenging = craniataCount > 0 ? (sumScavenging / craniataCount) : 0.38;
            const meanUndulation = craniataCount > 0 ? (sumUndulation / craniataCount) : 2.10;
            const meanTraction = craniataCount > 0 ? (sumTraction / craniataCount) : 2.8;
            const meanTeethSharpness = craniataCount > 0 ? (sumTeethSharpness / craniataCount) : 0.85;
            const meanTidalRate = craniataCount > 0 ? (sumTidalRate / craniataCount) : 1.4;

            let slimeEjections = 0;
            let suffocations = 0;
            let knottingManeuvers = 0;
            let scavengingEvents = 0;
            let deflections = 0;
            let expandedLiters = 0.0;
            let parasiticLatches = 0;
            let toothRenewals = 0;
            let hematophagicEnergy = 0.0;

            if (craniataManager && craniataManager.getMetrics) {
                const mgr = craniataManager.getMetrics();
                slimeEjections = mgr.slimeEjectionEvents || 0;
                suffocations = mgr.predatorGillSuffocations || 0;
                knottingManeuvers = mgr.bodyKnottingManeuvers || 0;
                scavengingEvents = mgr.benthicScavengingEvents || 0;
                deflections = mgr.predatorDamageDeflections || 0;
                expandedLiters = mgr.cumulativeSlimeExpandedLiters || 0.0;
                parasiticLatches = mgr.parasiticLatchingEvents || 0;
                toothRenewals = mgr.toothRenewalEvents || 0;
                hematophagicEnergy = mgr.cumulativeHematophagicEnergyDrawn || 0.0;
            }

            // 4 Biological Regimes for 101st Channel (% SCI)
            let regimeCodeSCI = "DEPLETED";
            let regimeTitleSCI = "DEPLETED & EXPOSED BRAINCASE";
            let regimeBadgeSCI = "sci-depleted";

            if (meanSCI >= 85.0) {
                regimeCodeSCI = "PEAK";
                regimeTitleSCI = "PEAK HYDROGEL SHROUD & GILL SUFFOCATION";
                regimeBadgeSCI = "sci-peak";
            } else if (meanSCI >= 60.0) {
                regimeCodeSCI = "STABLE";
                regimeTitleSCI = "STABLE & ARMED SLIME PORES";
                regimeBadgeSCI = "sci-stable";
            } else if (meanSCI >= 30.0) {
                regimeCodeSCI = "REGENERATING";
                regimeTitleSCI = "REGENERATING & PARTIAL SHIELD";
                regimeBadgeSCI = "sci-regen";
            }

            // 4 Biological Regimes for 102nd Channel (% OTI)
            let regimeCodeOTI = "QUIESCENT";
            let regimeTitleOTI = "QUIESCENT & DETACHED";
            let regimeBadgeOTI = "oti-quiescent";

            if (meanOTI >= 85.0) {
                regimeCodeOTI = "PEAK";
                regimeTitleOTI = "PEAK TRACTION & HEMATOPHAGIC EXTRACTION";
                regimeBadgeOTI = "oti-peak";
            } else if (meanOTI >= 60.0) {
                regimeCodeOTI = "LATCHED";
                regimeTitleOTI = "LATCHED & TIDAL VENTILATION";
                regimeBadgeOTI = "oti-latched";
            } else if (meanOTI >= 30.0) {
                regimeCodeOTI = "SEARCHING";
                regimeTitleOTI = "SEARCHING & PARTIAL VACUUM";
                regimeBadgeOTI = "oti-searching";
            }

            return {
                liveCount,
                craniataCount,
                hagfishCount,
                lampreyCount,
                craniataPrevalence,
                activeClouds,
                activeKnots,
                activeAttached,
                meanSCI,
                meanOTI,
                meanChondro,
                meanArmor,
                meanPayload,
                meanGlands,
                meanExpansion,
                meanOlfactory,
                meanScavenging,
                meanUndulation,
                meanTraction,
                meanTeethSharpness,
                meanTidalRate,
                slimeEjections,
                suffocations,
                knottingManeuvers,
                scavengingEvents,
                deflections,
                expandedLiters,
                parasiticLatches,
                toothRenewals,
                hematophagicEnergy,
                regimeCodeSCI,
                regimeTitleSCI,
                regimeBadgeSCI,
                regimeCodeOTI,
                regimeTitleOTI,
                regimeBadgeOTI,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 101st (% SCI) and 102nd (% OTI) Channels.
         * @param {Object} metrics - Calculated Craniata telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 101 Readout (% SCI - Slime Defense Capacity Index)
            const valSCIIndexEl = document.getElementById("valSCIIndex");
            if (valSCIIndexEl) {
                valSCIIndexEl.textContent = metrics.meanSCI.toFixed(1) + "% SCI (" + metrics.regimeTitleSCI + ")";
                if (metrics.meanSCI >= 85.0) {
                    valSCIIndexEl.style.color = "#d9f99d";
                } else if (metrics.meanSCI >= 60.0) {
                    valSCIIndexEl.style.color = "#bef264";
                } else if (metrics.meanSCI >= 30.0) {
                    valSCIIndexEl.style.color = "#84cc16";
                } else {
                    valSCIIndexEl.style.color = "#ef4444";
                }
            }

            // 2. Secondary Channel 101 Status
            const valSCIStatusEl = document.getElementById("valSCIStatus");
            if (valSCIStatusEl) {
                valSCIStatusEl.textContent =
                    "CRANIATA: " + metrics.craniataCount + "/" + metrics.liveCount +
                    " (" + metrics.craniataPrevalence.toFixed(0) + "%) | CHONDRO: " + (metrics.meanChondro * 100.0).toFixed(0) + "%" +
                    " | ARMOR: " + (metrics.meanArmor * 100.0).toFixed(0) + "%" +
                    " | SLIME: " + metrics.meanPayload.toFixed(1) + " mg" +
                    " | GLANDS: " + metrics.meanGlands.toFixed(0) +
                    " | CLOUDS: " + metrics.activeClouds +
                    " | SUFFOCATION: " + metrics.suffocations +
                    " | KNOTS: " + metrics.knottingManeuvers;
                valSCIStatusEl.style.color = metrics.meanSCI >= 50.0 ? "#bef264" : "#84cc16";
            }

            // 3. Primary Channel 102 Readout (% OTI - Oral Suction & Parasitic Traction Index)
            const valOTIIndexEl = document.getElementById("valOTIIndex");
            if (valOTIIndexEl) {
                valOTIIndexEl.textContent = metrics.meanOTI.toFixed(1) + "% OTI (" + metrics.regimeTitleOTI + ")";
                if (metrics.meanOTI >= 85.0) {
                    valOTIIndexEl.style.color = "#fecdd3";
                } else if (metrics.meanOTI >= 60.0) {
                    valOTIIndexEl.style.color = "#fb7185";
                } else if (metrics.meanOTI >= 30.0) {
                    valOTIIndexEl.style.color = "#e11d48";
                } else {
                    valOTIIndexEl.style.color = "#ef4444";
                }
            }

            // 4. Secondary Channel 102 Status
            const valOTIStatusEl = document.getElementById("valOTIStatus");
            if (valOTIStatusEl) {
                valOTIStatusEl.textContent =
                    "OTI: " + metrics.meanOTI.toFixed(1) + "%" +
                    " | TRACTION: " + metrics.meanTraction.toFixed(2) + " N" +
                    " | SHARPNESS: " + (metrics.meanTeethSharpness * 100.0).toFixed(0) + "%" +
                    " | TIDAL: " + metrics.meanTidalRate.toFixed(2) + " Hz" +
                    " | ATTACHED: " + metrics.activeAttached +
                    " | LATCHES: " + metrics.parasiticLatches +
                    " | RENEWALS: " + metrics.toothRenewals;
                valOTIStatusEl.style.color = metrics.meanOTI >= 50.0 ? "#fb7185" : "#e11d48";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 101st Channel: % SCI
            if (!historyData.slimeDefenseCapacity) {
                historyData.slimeDefenseCapacity = new Array(74).fill(0);
            }
            const chartValSCI = Number.isFinite(metrics.meanSCI) ?
                Math.max(0, Math.min(100, metrics.meanSCI)) : 0;
            historyData.slimeDefenseCapacity.shift();
            historyData.slimeDefenseCapacity.push(chartValSCI);

            // 102nd Channel: % OTI
            if (!historyData.oralSuctionTractionIndex) {
                historyData.oralSuctionTractionIndex = new Array(74).fill(0);
            }
            const chartValOTI = Number.isFinite(metrics.meanOTI) ?
                Math.max(0, Math.min(100, metrics.meanOTI)) : 0;
            historyData.oralSuctionTractionIndex.shift();
            historyData.oralSuctionTractionIndex.push(chartValOTI);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} craniataManager - Global CraniataSlimeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, craniataManager, tick) {
            const metrics = CraniataTelemetryManager.calculateMetrics(organisms, craniataManager, tick);
            CraniataTelemetryManager.updateHUD(metrics);
            CraniataTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CraniataTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.CraniataTelemetryManager = CraniataTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
