// BioEcosystem - Early Stem Tetrapods Polydactyly Digits & Amphibious Acoustic Telemetry Dashboard
// Module: src/ui/telemetry_tetrapod.js
// Version: 8.53.0 (Hour 573 - Looks & UI Agent: 113th Channel % TAI, 114th Channel % AAI, Forest Green & Midnight Violet Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TetrapodTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 113th Telemetry Channel: Tetrapod Appendicular Index (% TAI) - Forest green (#16a34a)
     * - 114th Telemetry Channel: Amphibious Acoustic & Auditory Index (% AAI) - Midnight violet / indigo (#6366f1)
     * - 4 Biological Regimes for % TAI (FIN_FRINGED_STALK, SHALLOW_LITTORAL_PADDLE, SPRAWLING_TETRAPOD_GAIT, OBLIGATE_TERRESTRIAL_STRIDE)
     * - 4 Biological Regimes for % AAI (SUBMERGED_SEISMIC_ONLY, INCIPIENT_STAPES_COLUMELLA, OTIC_NOTCH_RESONANCE, TYMPANIC_AERIAL_HEARING)
     * - Real-time polydactyly digit count, wrist/ankle flexibility, cervical yaw tracking, thoracic gravity defiance, and acoustic alerts
     */
    class TetrapodTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Stem Tetrapod organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} appendageManager - Global TetrapodAppendageManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Stem Tetrapod metrics.
         */
        static calculateMetrics(organisms, appendageManager, tick) {
            let liveCount = 0;
            let tetrapodCount = 0;
            let groundStriders = 0;
            let acousticAlerts = 0;

            let sumTAI = 0.0;
            let sumAAI = 0.0;
            let sumDigits = 0.0;
            let sumFlex = 0.0;
            let sumTraction = 0.0;
            let sumNeckAngle = 0.0;
            let sumRibSupport = 0.0;
            let sumStapes = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isStemTetrapod) {
                        tetrapodCount++;

                        const tai = org.tetrapodAppendicularIndex !== undefined ? org.tetrapodAppendicularIndex : 50.0;
                        const aai = org.amphibiousAcousticIndex !== undefined ? org.amphibiousAcousticIndex : 50.0;
                        const digits = org.digitCount !== undefined ? org.digitCount : 7.0;
                        const flex = org.carpalTarsalFlexibility !== undefined ? org.carpalTarsalFlexibility : 0.75;
                        const traction = org.digitGripTraction !== undefined ? org.digitGripTraction : 0.78;
                        const neck = org.cervicalMobilityAngle !== undefined ? org.cervicalMobilityAngle : 0.45;
                        const rib = org.thoracicRibcageSupport !== undefined ? org.thoracicRibcageSupport : 0.76;
                        const stapes = org.stapesImpedanceMatching !== undefined ? org.stapesImpedanceMatching : 0.74;

                        sumTAI += tai;
                        sumAAI += aai;
                        sumDigits += digits;
                        sumFlex += flex;
                        sumTraction += traction;
                        sumNeckAngle += neck;
                        sumRibSupport += rib;
                        sumStapes += stapes;

                        if (org.groundStridingActive) groundStriders++;
                        if (org.aerialAcousticDetection) acousticAlerts++;
                    }
                }
            }

            const tetrapodPrevalence = liveCount > 0 ? (tetrapodCount / liveCount) * 100.0 : 0.0;
            const meanTAI = tetrapodCount > 0 ? (sumTAI / tetrapodCount) : 0.0;
            const meanAAI = tetrapodCount > 0 ? (sumAAI / tetrapodCount) : 0.0;
            const meanDigits = tetrapodCount > 0 ? (sumDigits / tetrapodCount) : 7.0;
            const meanFlex = tetrapodCount > 0 ? (sumFlex / tetrapodCount) : 0.75;
            const meanTraction = tetrapodCount > 0 ? (sumTraction / tetrapodCount) : 0.78;
            const meanNeckAngle = tetrapodCount > 0 ? (sumNeckAngle / tetrapodCount) : 0.45;
            const meanRibSupport = tetrapodCount > 0 ? (sumRibSupport / tetrapodCount) : 0.76;
            const meanStapes = tetrapodCount > 0 ? (sumStapes / tetrapodCount) : 0.74;

            let stridingEvents = 0;
            let neckTurns = 0;
            let totalAcousticAlerts = 0;
            let gravityEvents = 0;
            let preyCaptures = 0;
            let tetrapodBiomass = 0.0;

            if (appendageManager && appendageManager.getMetrics) {
                const mgr = appendageManager.getMetrics();
                stridingEvents = mgr.terrestrialStridingEvents || 0;
                neckTurns = mgr.cervicalHeadTurns || 0;
                totalAcousticAlerts = mgr.aerialAcousticAlerts || 0;
                gravityEvents = mgr.gravityDefianceEvents || 0;
                preyCaptures = mgr.terrestrialPreyCaptures || 0;
                tetrapodBiomass = mgr.cumulativeTetrapodBiomass || 0.0;
            }

            // 4 Distinct Biological Regimes for 113th Channel (% TAI)
            let taiRegimeCode = "FIN_FRINGED_STALK";
            let taiRegimeTitle = "FIN RAY FRINGE & COLLAPSED LIMB CARPUS BINDING";
            let taiRegimeBadge = "tai-fringe";

            if (meanTAI >= 85.0) {
                taiRegimeCode = "OBLIGATE_TERRESTRIAL_STRIDE";
                taiRegimeTitle = "PENTADACTYL/POLYDACTYL FULL WEIGHT-BEARING RUNNER & GRAVITATIONAL MASTERY";
                taiRegimeBadge = "tai-stride";
            } else if (meanTAI >= 60.0) {
                taiRegimeCode = "SPRAWLING_TETRAPOD_GAIT";
                taiRegimeTitle = "CARPUS/TARSUS ARTICULATED WALKING & MUD-BANK TRACTION MASTERY";
                taiRegimeBadge = "tai-gait";
            } else if (meanTAI >= 30.0) {
                taiRegimeCode = "SHALLOW_LITTORAL_PADDLE";
                taiRegimeTitle = "INCIPIENT POLYDACTYLY DIGITS & PARTIAL SUBSTRATE PUSH-OFF";
                taiRegimeBadge = "tai-paddle";
            }

            // 4 Distinct Biological Regimes for 114th Channel (% AAI)
            let aaiRegimeCode = "SUBMERGED_SEISMIC_ONLY";
            let aaiRegimeTitle = "BONE CONDUCTION ONLY & AIRBORNE ACOUSTIC BLINDNESS";
            let aaiRegimeBadge = "aai-submerged";

            if (meanAAI >= 85.0) {
                aaiRegimeCode = "TYMPANIC_AERIAL_HEARING";
                aaiRegimeTitle = "IMPEDANCE-MATCHED STAPES BONE & DIRECTIONAL AIRBORNE PREY TRACKING";
                aaiRegimeBadge = "aai-aerial";
            } else if (meanAAI >= 60.0) {
                aaiRegimeCode = "OTIC_NOTCH_RESONANCE";
                aaiRegimeTitle = "AMPHIBIOUS DUAL-MEDIUM ACOUSTIC AWARENESS & EARLY PREDATOR DEFENSE";
                aaiRegimeBadge = "aai-resonance";
            } else if (meanAAI >= 30.0) {
                aaiRegimeCode = "INCIPIENT_STAPES_COLUMELLA";
                aaiRegimeTitle = "PARTIALLY DETACHED HYOMANDIBULA & LOW-FREQUENCY AIRBORNE PERCEPTION";
                aaiRegimeBadge = "aai-stapes";
            }

            return {
                liveCount,
                tetrapodCount,
                groundStriders,
                acousticAlerts,
                tetrapodPrevalence,
                meanTAI,
                meanAAI,
                meanDigits,
                meanFlex,
                meanTraction,
                meanNeckAngle,
                meanRibSupport,
                meanStapes,
                stridingEvents,
                neckTurns,
                totalAcousticAlerts,
                gravityEvents,
                preyCaptures,
                tetrapodBiomass,
                taiRegimeCode,
                taiRegimeTitle,
                taiRegimeBadge,
                aaiRegimeCode,
                aaiRegimeTitle,
                aaiRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 113th (% TAI) and 114th (% AAI) Channels.
         * @param {Object} metrics - Calculated Stem Tetrapod telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 113 Readout (% TAI - Tetrapod Appendicular Index)
            const valTAIIndexEl = document.getElementById("valTAIIndex");
            if (valTAIIndexEl) {
                valTAIIndexEl.textContent = metrics.meanTAI.toFixed(1) + "% TAI (" + metrics.taiRegimeTitle + ")";
                if (metrics.meanTAI >= 85.0) {
                    valTAIIndexEl.style.color = "#4ade80";
                } else if (metrics.meanTAI >= 60.0) {
                    valTAIIndexEl.style.color = "#22c55e";
                } else if (metrics.meanTAI >= 30.0) {
                    valTAIIndexEl.style.color = "#16a34a";
                } else {
                    valTAIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 113 Status
            const valTAIStatusEl = document.getElementById("valTAIStatus");
            if (valTAIStatusEl) {
                valTAIStatusEl.textContent =
                    "TETRAPODS: " + metrics.tetrapodCount + "/" + metrics.liveCount +
                    " (" + metrics.tetrapodPrevalence.toFixed(0) + "%) | DIGITS: " + metrics.meanDigits.toFixed(1) +
                    " | WRIST FLEX: " + (metrics.meanFlex * 100.0).toFixed(0) + "%" +
                    " | GRIP: " + (metrics.meanTraction * 100.0).toFixed(0) + "%" +
                    " | STRIDERS: " + metrics.groundStriders +
                    " | STRIDES: " + metrics.stridingEvents +
                    " | NECK TURNS: " + metrics.neckTurns;
                valTAIStatusEl.style.color = metrics.meanTAI >= 50.0 ? "#4ade80" : "#22c55e";
            }

            // 3. Primary Channel 114 Readout (% AAI - Amphibious Acoustic & Auditory Index)
            const valAAIIndexEl = document.getElementById("valAAIIndex");
            if (valAAIIndexEl) {
                valAAIIndexEl.textContent = metrics.meanAAI.toFixed(1) + "% AAI (" + metrics.aaiRegimeTitle + ")";
                if (metrics.meanAAI >= 85.0) {
                    valAAIIndexEl.style.color = "#a5b4fc";
                } else if (metrics.meanAAI >= 60.0) {
                    valAAIIndexEl.style.color = "#818cf8";
                } else if (metrics.meanAAI >= 30.0) {
                    valAAIIndexEl.style.color = "#6366f1";
                } else {
                    valAAIIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 114 Status
            const valAAIStatusEl = document.getElementById("valAAIStatus");
            if (valAAIStatusEl) {
                valAAIStatusEl.textContent =
                    "STAPES MATCH: " + (metrics.meanStapes * 100.0).toFixed(0) + "% | " +
                    "RIBCAGE: " + (metrics.meanRibSupport * 100.0).toFixed(0) + "% | " +
                    "ALERTS: " + metrics.totalAcousticAlerts + " | " +
                    "GRAVITY DEFIANCE: " + metrics.gravityEvents + " | " +
                    "CAPTURES: " + metrics.preyCaptures + " | " +
                    "BIOMASS: " + metrics.tetrapodBiomass.toFixed(1) + " mg";
                valAAIStatusEl.style.color = metrics.meanAAI >= 50.0 ? "#a5b4fc" : "#818cf8";
            }

            // 5. Dedicated Stem Tetrapod Laboratory HUD Badges (if DOM present)
            const valTAIBadgeEl = document.getElementById("valTAIBadge");
            if (valTAIBadgeEl) {
                valTAIBadgeEl.className = "tai-badge " + metrics.taiRegimeBadge;
                valTAIBadgeEl.textContent = metrics.taiRegimeCode;
            }

            const valAAIBadgeEl = document.getElementById("valAAIBadge");
            if (valAAIBadgeEl) {
                valAAIBadgeEl.className = "aai-badge " + metrics.aaiRegimeBadge;
                valAAIBadgeEl.textContent = metrics.aaiRegimeCode;
            }
        }

        /**
         * Main telemetry step entrypoint executed per simulation tick.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular buffers object.
         * @param {Object} appendageManager - Global TetrapodAppendageManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, appendageManager, tick) {
            const metrics = this.calculateMetrics(organisms, appendageManager, tick);

            // Update circular history buffers for Lotka-Volterra graphing
            if (historyData) {
                if (historyData.tetrapodAppendicularIndex) {
                    historyData.tetrapodAppendicularIndex.shift();
                    historyData.tetrapodAppendicularIndex.push(Math.max(0, Math.min(100, metrics.meanTAI)));
                }
                if (historyData.amphibiousAcousticIndex) {
                    historyData.amphibiousAcousticIndex.shift();
                    historyData.amphibiousAcousticIndex.push(Math.max(0, Math.min(100, metrics.meanAAI)));
                }
            }

            // Update DOM HUD every 4 ticks to maintain 60 FPS performance
            if (tick % 4 === 0) {
                this.updateHUD(metrics);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TetrapodTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TetrapodTelemetryManager = TetrapodTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
