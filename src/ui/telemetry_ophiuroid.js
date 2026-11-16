// BioEcosystem - Ophiuroid Serpentiform Velocity (% SVI) & Brittle Fracture Ratio (% BFR) Telemetry
// Module: src/ui/telemetry_ophiuroid.js
// Version: 7.68.0 (Hour 488 - Looks & UI Agent: 94th Channel % BFR & Dual Ophiuroidea HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OphiuroidTelemetryManager
     * High-precision laboratory telemetry tracking for ophiuroid (brittle star) biomechanics and autotomy:
     * - Channel 93: Serpentiform Velocity & Articulation Index (% SVI) - Slithering speed, vertebral flexion, suspension intake, and arm segments
     * - Channel 94: Brittle Fracture & Autotomy Ratio (% BFR) - Multi-segment breakage, wriggling lure activity, calcification stalls, and disc turgor
     * - Synthesizes lateral slithering velocity [0.85 - 2.40 px/tick] and propulsive rowing frequency
     * - Tracks intervertebral joint lateral flexion [0.0 - 0.85 rad] across 18-36 vertebral ossicle segments
     * - Audits lateral arm spines suspension feeding capture [0.10 - 0.35 mg/s] and mucus filament harvest
     * - Evaluates fragile multi-point micro-autotomy incidents, yaw wobble instability, and chaotic circling
     * - Monitors central disc trauma incidents (3x damage), bursal slime discharges, and calcification stalls
     * - Implements 4 distinct biological regimes across the 93rd and 94th telemetry channels
     * - Renders laboratory HUD indicators, telemetry status badges, and circular history buffers
     */
    class OphiuroidTelemetryManager {
        /**
         * Calculate dish-wide Ophiuroidea locomotion, vertebral flexion, and autotomy metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} ophiuroidManager - Global OphiuroidVertebraeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Ophiuroidea telemetry metrics.
         */
        static calculateMetrics(organisms, ophiuroidManager, tick) {
            let liveCount = 0;
            let ophiuroidCount = 0;
            let activeSlitheringCount = 0;
            let creviceShelteredCount = 0;
            let autotomizedCount = 0;
            let stallCount = 0;
            let circlingCount = 0;

            let sumSVI = 0.0;
            let sumBFR = 0.0;
            let sumSpeed = 0.0;
            let sumFlexion = 0.0;
            let sumSuspension = 0.0;
            let sumSegments = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isOphiuroid) {
                        ophiuroidCount++;

                        const svi = org.serpentiformVelocityIndex || 0.35;
                        const bfr = org.brittleFractureRatio || 0.10;
                        const speed = org.effectiveSlitherSpeed !== undefined ? org.effectiveSlitherSpeed : (org.serpentiformSpeed || 1.45);
                        const suspension = org.mucusSuspensionRate || 0.22;
                        const intactSegments = org.intactArmSegmentsCount !== undefined ? org.intactArmSegmentsCount : 120;
                        const flexion = org.ophiuroidArms ?
                            org.ophiuroidArms.reduce((acc, a) => acc + Math.abs(a.flexionAngle || 0), 0) / 5.0 : 0.0;

                        sumSVI += svi;
                        sumBFR += bfr;
                        sumSpeed += speed;
                        sumFlexion += flexion;
                        sumSuspension += suspension;
                        sumSegments += intactSegments;

                        if (Math.abs(org.vx || 0) + Math.abs(org.vy || 0) > 0.3) activeSlitheringCount++;
                        if (org.creviceSheltered) creviceShelteredCount++;
                        if (org.isSegmentAutotomized) autotomizedCount++;
                        if (org.calcificationDepletionStall) stallCount++;
                        if (org.chaoticCircling) circlingCount++;
                    }
                }
            }

            const managerMetrics = (ophiuroidManager && typeof ophiuroidManager.getMetrics === "function") ?
                ophiuroidManager.getMetrics() : {};

            const autotomyEvents = managerMetrics.segmentAutotomyEvents || 0;
            const feedingEvents = managerMetrics.suspensionFeedingEvents || 0;
            const regenEvents = managerMetrics.segmentRegenEvents || 0;
            const discTraumaEvents = managerMetrics.discTraumaIncidents || 0;
            const calcificationStalls = managerMetrics.calcificationStalls || 0;
            const harvestTotal = managerMetrics.cumulativeSuspensionHarvest || 0.0;
            const distanceTotal = managerMetrics.cumulativeSlitherDistance || 0.0;

            const ophiuroidPrevalence = liveCount > 0 ? (ophiuroidCount / liveCount) * 100.0 : 0.0;
            const meanSVI = ophiuroidCount > 0 ? (sumSVI / ophiuroidCount) * 100.0 : 0.0;
            const meanBFR = ophiuroidCount > 0 ? (sumBFR / ophiuroidCount) * 100.0 : 0.0;
            const meanSpeed = ophiuroidCount > 0 ? (sumSpeed / ophiuroidCount) : 0.0;
            const meanFlexion = ophiuroidCount > 0 ? (sumFlexion / ophiuroidCount) : 0.0;
            const meanSuspension = ophiuroidCount > 0 ? (sumSuspension / ophiuroidCount) : 0.0;
            const meanSegments = ophiuroidCount > 0 ? (sumSegments / (ophiuroidCount * 5)) : 24.0;
            const meanDiscTurgor = Math.max(0.20, 1.0 - (discTraumaEvents * 0.08));

            // 4 Biological Regimes for 93rd Channel (% SVI)
            let regimeCodeSVI = "QUIESCENT";
            let regimeTitleSVI = "QUIESCENT & CREVICE DORMANT";
            let regimeBadgeSVI = "svi-quiescent";

            if (meanSVI >= 85.0) {
                regimeCodeSVI = "MAXIMAL";
                regimeTitleSVI = "PEAK VERTEBRAL VELOCITY & EVASION";
                regimeBadgeSVI = "svi-maximal";
            } else if (meanSVI >= 60.0) {
                regimeCodeSVI = "SLITHERING";
                regimeTitleSVI = "ACTIVE SERPENTIFORM SLITHERING";
                regimeBadgeSVI = "svi-slithering";
            } else if (meanSVI >= 30.0) {
                regimeCodeSVI = "RHEOTACTIC";
                regimeTitleSVI = "RHEOTACTIC SUSPENSION SWEEP";
                regimeBadgeSVI = "svi-rheotactic";
            }

            // 4 Biological Regimes for 94th Channel (% BFR)
            let regimeCodeBFR = "INTACT";
            let regimeTitleBFR = "CALCIFIED INTACT & SECURE";
            let regimeBadgeBFR = "bfr-intact";

            if (meanBFR >= 85.0) {
                regimeCodeBFR = "MAXIMAL";
                regimeTitleBFR = "CRITICAL MULTI-RAY RECONSTRUCTION";
                regimeBadgeBFR = "bfr-maximal";
            } else if (meanBFR >= 60.0) {
                regimeCodeBFR = "AUTOTOMY";
                regimeTitleBFR = "ACTIVE FRAGILE AUTOTOMY & DECOY";
                regimeBadgeBFR = "bfr-autotomy";
            } else if (meanBFR >= 30.0) {
                regimeCodeBFR = "FRACTURE";
                regimeTitleBFR = "FRACTURE RISK & SHEDDING";
                regimeBadgeBFR = "bfr-fracture";
            }

            return {
                liveCount,
                ophiuroidCount,
                ophiuroidPrevalence,
                activeSlitheringCount,
                creviceShelteredCount,
                autotomizedCount,
                stallCount,
                circlingCount,
                meanSVI,
                meanBFR,
                meanSpeed,
                meanFlexion,
                meanSuspension,
                meanSegments,
                meanDiscTurgor,
                autotomyEvents,
                feedingEvents,
                regenEvents,
                discTraumaEvents,
                calcificationStalls,
                harvestTotal,
                distanceTotal,
                regimeCodeSVI,
                regimeTitleSVI,
                regimeBadgeSVI,
                regimeCodeBFR,
                regimeTitleBFR,
                regimeBadgeBFR,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 93rd (% SVI) & 94th (% BFR) Channels.
         * @param {Object} metrics - Calculated Ophiuroidea telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 93 Readout (% SVI)
            const valSVIIndexEl = document.getElementById("valSVIIndex");
            if (valSVIIndexEl) {
                valSVIIndexEl.textContent = metrics.meanSVI.toFixed(1) + "% SVI (" + metrics.regimeTitleSVI + ")";
                if (metrics.meanSVI >= 85.0) {
                    valSVIIndexEl.style.color = "#d1fae5";
                } else if (metrics.meanSVI >= 60.0) {
                    valSVIIndexEl.style.color = "#a7f3d0";
                } else if (metrics.meanSVI >= 30.0) {
                    valSVIIndexEl.style.color = "#34d399";
                } else {
                    valSVIIndexEl.style.color = "#10b981";
                }
            }

            // 2. Secondary Channel 93 Status
            const valSVIStatusEl = document.getElementById("valSVIStatus");
            if (valSVIStatusEl) {
                valSVIStatusEl.textContent =
                    "OPHIUROIDEA: " + metrics.ophiuroidCount + "/" + metrics.liveCount +
                    " (" + metrics.ophiuroidPrevalence.toFixed(0) + "%) | SPEED: " + metrics.meanSpeed.toFixed(2) + " px/t" +
                    " | FLEXION: " + metrics.meanFlexion.toFixed(2) + " rad" +
                    " | INTACT: " + metrics.meanSegments.toFixed(1) +
                    " | REFUGE: " + metrics.creviceShelteredCount +
                    " | AUTOTOMIES: " + metrics.autotomyEvents;
                valSVIStatusEl.style.color = metrics.meanSVI >= 50.0 ? "#34d399" : "#10b981";
            }

            // 3. Primary Channel 94 Readout (% BFR)
            const valBFRIndexEl = document.getElementById("valBFRIndex");
            if (valBFRIndexEl) {
                valBFRIndexEl.textContent = metrics.meanBFR.toFixed(1) + "% BFR (" + metrics.regimeTitleBFR + ")";
                if (metrics.meanBFR >= 85.0) {
                    valBFRIndexEl.style.color = "#ffffff";
                } else if (metrics.meanBFR >= 60.0) {
                    valBFRIndexEl.style.color = "#f1f5f9";
                } else if (metrics.meanBFR >= 30.0) {
                    valBFRIndexEl.style.color = "#e2e8f0";
                } else {
                    valBFRIndexEl.style.color = "#cbd5e1";
                }
            }

            // 4. Secondary Channel 94 Status
            const valBFRStatusEl = document.getElementById("valBFRStatus");
            if (valBFRStatusEl) {
                valBFRStatusEl.textContent =
                    "BFR: " + metrics.meanBFR.toFixed(1) + "%" +
                    " | DISK: " + (metrics.meanDiscTurgor * 100.0).toFixed(0) + "%" +
                    " | AUTOTOMIES: " + metrics.autotomyEvents +
                    " | STALLS: " + metrics.calcificationStalls +
                    " | CIRCLING: " + metrics.circlingCount +
                    " | TRAUMA: " + metrics.discTraumaEvents;
                valBFRStatusEl.style.color = metrics.meanBFR >= 50.0 ? "#e2e8f0" : "#cbd5e1";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 93rd Channel: % SVI
            if (!historyData.serpentiformVelocityIndex) {
                historyData.serpentiformVelocityIndex = new Array(74).fill(0);
            }
            const chartValSVI = Number.isFinite(metrics.meanSVI) ?
                Math.max(0, Math.min(100, metrics.meanSVI)) : 0;
            historyData.serpentiformVelocityIndex.shift();
            historyData.serpentiformVelocityIndex.push(chartValSVI);

            // 94th Channel: % BFR
            if (!historyData.brittleFractureRatio) {
                historyData.brittleFractureRatio = new Array(74).fill(0);
            }
            const chartValBFR = Number.isFinite(metrics.meanBFR) ?
                Math.max(0, Math.min(100, metrics.meanBFR)) : 0;
            historyData.brittleFractureRatio.shift();
            historyData.brittleFractureRatio.push(chartValBFR);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} ophiuroidManager - Global OphiuroidVertebraeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, ophiuroidManager, tick) {
            const metrics = OphiuroidTelemetryManager.calculateMetrics(organisms, ophiuroidManager, tick);
            OphiuroidTelemetryManager.updateHUD(metrics);
            OphiuroidTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.OphiuroidTelemetryManager = OphiuroidTelemetryManager;

})(typeof window !== "undefined" ? window : global);
