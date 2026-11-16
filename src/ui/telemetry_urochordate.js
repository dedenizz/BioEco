// BioEcosystem - Urochordata Tunic Protective Integrity (% TPI) & Ciliary Pumping Reversal Ratio (% CPR) Telemetry
// Module: src/ui/telemetry_urochordate.js
// Version: 7.98.0 (Hour 518 - Looks & UI Agent: 100th Channel % CPR & Dual Urochordata HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UrochordateTelemetryManager
     * High-precision laboratory telemetry tracking for urochordate (tunicates / sea squirts / Ascidiacea) biology:
     * - Channel 99: Tunic Protective Integrity (% TPI) - Cellulosic tunicin thickness, matrix density, sessile anchorage, and ciliary flux
     * - Channel 100: Ciliary Pumping & Reversal Ratio (% CPR) - Seston flux, reversible cardiac peristalsis, and squirting expulsion
     * - Synthesizes cellulosic mantle thickness [1.2 - 4.8 um] and structural density/integrity [0.40 - 0.98]
     * - Tracks biphasic life cycle transition: free-swimming chordate tadpole larvae vs. sessile barrel-shaped adults
     * - Audits retrogressive metamorphosis progress, notochord/tail autolysis, and biomass assimilation
     * - Evaluates detrital silt fouling [0.0 - 1.0], branchial basket stall, and hypoxic stress accumulation
     * - Monitors reversible tubular heartbeat direction (+1 advisceral / -1 abvisceral) and cardiac arrhythmia stasis
     * - Implements 4 distinct biological regimes across the 99th and 100th telemetry channels
     * - Renders laboratory HUD indicators, telemetry status badges, and circular history buffers
     */
    class UrochordateTelemetryManager {
        /**
         * Calculate dish-wide Urochordata life cycle, tunic, and filtration metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} urochordateManager - Global UrochordateTunicManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Urochordata telemetry metrics.
         */
        static calculateMetrics(organisms, urochordateManager, tick) {
            let liveCount = 0;
            let uroCount = 0;
            let adultCount = 0;
            let larvaCount = 0;
            let activeStasisCount = 0;
            let advCount = 0;
            let abvCount = 0;

            let sumTPI = 0.0;
            let sumCPR = 0.0;
            let sumThickness = 0.0;
            let sumIntegrity = 0.0;
            let sumPumping = 0.0;
            let sumResorption = 0.0;
            let sumFouling = 0.0;
            let sumHypoxia = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isUrochordate) {
                        uroCount++;

                        const tpi = org.tunicProtectiveIntegrity !== undefined ? org.tunicProtectiveIntegrity : 0.50;
                        const cpr = org.ciliaryPumpingReversalRatio !== undefined ? org.ciliaryPumpingReversalRatio : 0.45;
                        const thickness = org.tunicinCoverThickness || 2.4;
                        const integrity = org.tunicinIntegrity || 0.85;
                        const pumping = org.ciliaryPumpingRate || 0.0;
                        const resorption = org.notochordResorptionProgress || 0.0;
                        const fouling = org.siphonDetritalFouling || 0.0;
                        const hypoxia = org.tunicateHypoxicStress || 0.0;

                        sumTPI += tpi;
                        sumCPR += cpr;
                        sumThickness += thickness;
                        sumIntegrity += integrity;
                        sumPumping += pumping;
                        sumResorption += resorption;
                        sumFouling += fouling;
                        sumHypoxia += hypoxia;

                        if (org.isAdultSessile) {
                            adultCount++;
                            if (org.cardiacStasis) activeStasisCount++;
                            if (org.cardiacPeristalsisDirection === 1) advCount++;
                            else abvCount++;
                        } else if (org.isAscidianTadpole) {
                            larvaCount++;
                        }
                    }
                }
            }

            const uroPrevalence = liveCount > 0 ? (uroCount / liveCount) * 100.0 : 0.0;
            const meanTPI = uroCount > 0 ? (sumTPI / uroCount) * 100.0 : 0.0;
            const meanCPR = uroCount > 0 ? (sumCPR / uroCount) * 100.0 : 0.0;
            const meanThickness = uroCount > 0 ? (sumThickness / uroCount) : 2.4;
            const meanIntegrity = uroCount > 0 ? (sumIntegrity / uroCount) * 100.0 : 85.0;
            const meanPumping = uroCount > 0 ? (sumPumping / uroCount) : 0.0;
            const meanResorption = uroCount > 0 ? (sumResorption / uroCount) * 100.0 : 0.0;
            const meanFouling = uroCount > 0 ? (sumFouling / uroCount) * 100.0 : 0.0;
            const meanHypoxia = uroCount > 0 ? (sumHypoxia / uroCount) * 100.0 : 0.0;

            let settlementEvents = 0;
            let metamorphosisEvents = 0;
            let damageDeflections = 0;
            let foulingEvents = 0;
            let squirtEvents = 0;
            let reversalEvents = 0;
            let arrhythmiaEvents = 0;
            let filteredSeston = 0.0;
            let resorbedBiomass = 0.0;

            if (urochordateManager && urochordateManager.getMetrics) {
                const mgrMetrics = urochordateManager.getMetrics();
                settlementEvents = mgrMetrics.substrateSettlementEvents || 0;
                metamorphosisEvents = mgrMetrics.metamorphosisIncidents || 0;
                damageDeflections = mgrMetrics.predatorDamageDeflections || 0;
                foulingEvents = mgrMetrics.siphonFoulingIncidents || 0;
                squirtEvents = mgrMetrics.squirtingSpasmEvents || 0;
                reversalEvents = mgrMetrics.cardiacReversalEvents || 0;
                arrhythmiaEvents = mgrMetrics.cardiacArrhythmiaIncidents || 0;
                filteredSeston = mgrMetrics.cumulativeFilteredSeston || 0.0;
                resorbedBiomass = mgrMetrics.cumulativeResorbedBiomass || 0.0;
            }

            // 4 Biological Regimes for 99th Channel (% TPI)
            let regimeCodeTPI = "VULNERABLE";
            let regimeTitleTPI = "VULNERABLE & UNATTACHED LARVAE";
            let regimeBadgeTPI = "tpi-vulnerable";

            if (meanTPI >= 85.0) {
                regimeCodeTPI = "PEAK";
                regimeTitleTPI = "PEAK TUNIC DENSITY & REEF RESISTANCE";
                regimeBadgeTPI = "tpi-peak";
            } else if (meanTPI >= 60.0) {
                regimeCodeTPI = "STABLE";
                regimeTitleTPI = "STABLE SESSILE & CELLULOSIC COAT";
                regimeBadgeTPI = "tpi-stable";
            } else if (meanTPI >= 30.0) {
                regimeCodeTPI = "METAMORPHOSIS";
                regimeTitleTPI = "METAMORPHOSING & THIN TUNIC";
                regimeBadgeTPI = "tpi-meta";
            }

            // 4 Biological Regimes for 100th Channel (% CPR)
            let regimeCodeCPR = "STALL";
            let regimeTitleCPR = "STALL & CARDIAC STASIS";
            let regimeBadgeCPR = "cpr-stall";

            if (meanCPR >= 85.0) {
                regimeCodeCPR = "PEAK";
                regimeTitleCPR = "PEAK PERISTALSIS & HIGH FLUX";
                regimeBadgeCPR = "cpr-peak";
            } else if (meanCPR >= 60.0) {
                regimeCodeCPR = "SYNCHRONIZED";
                regimeTitleCPR = "SYNCHRONIZED PUMPING & REVERSAL";
                regimeBadgeCPR = "cpr-sync";
            } else if (meanCPR >= 30.0) {
                regimeCodeCPR = "FOULING";
                regimeTitleCPR = "DETRITAL FOULING & DYSRHYTHMIA";
                regimeBadgeCPR = "cpr-fouled";
            }

            const cardiacDirTitle = (advCount >= abvCount) ? "ADVISCERAL" : "ABVISCERAL";

            return {
                liveCount,
                uroCount,
                uroPrevalence,
                adultCount,
                larvaCount,
                activeStasisCount,
                cardiacDirTitle,
                meanTPI,
                meanCPR,
                meanThickness,
                meanIntegrity,
                meanPumping,
                meanResorption,
                meanFouling,
                meanHypoxia,
                settlementEvents,
                metamorphosisEvents,
                damageDeflections,
                foulingEvents,
                squirtEvents,
                reversalEvents,
                arrhythmiaEvents,
                filteredSeston,
                resorbedBiomass,
                regimeCodeTPI,
                regimeTitleTPI,
                regimeBadgeTPI,
                regimeCodeCPR,
                regimeTitleCPR,
                regimeBadgeCPR,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 99th (% TPI) & 100th (% CPR) Channels.
         * @param {Object} metrics - Calculated Urochordata telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 99 Readout (% TPI)
            const valTPIIndexEl = document.getElementById("valTPIIndex");
            if (valTPIIndexEl) {
                valTPIIndexEl.textContent = metrics.meanTPI.toFixed(1) + "% TPI (" + metrics.regimeTitleTPI + ")";
                if (metrics.meanTPI >= 85.0) {
                    valTPIIndexEl.style.color = "#fef08a";
                } else if (metrics.meanTPI >= 60.0) {
                    valTPIIndexEl.style.color = "#fde047";
                } else if (metrics.meanTPI >= 30.0) {
                    valTPIIndexEl.style.color = "#f59e0b";
                } else {
                    valTPIIndexEl.style.color = "#ef4444";
                }
            }

            // 2. Secondary Channel 99 Status
            const valTPIStatusEl = document.getElementById("valTPIStatus");
            if (valTPIStatusEl) {
                valTPIStatusEl.textContent =
                    "TUNICATA: " + metrics.uroCount + "/" + metrics.liveCount +
                    " (" + metrics.uroPrevalence.toFixed(0) + "%) | ADULT: " + metrics.adultCount +
                    " | LARVAE: " + metrics.larvaCount +
                    " | TUNIC: " + metrics.meanThickness.toFixed(1) + " um" +
                    " | INTEGRITY: " + metrics.meanIntegrity.toFixed(0) + "%" +
                    " | PUMPING: " + metrics.meanPumping.toFixed(2) + " uL/s" +
                    " | SETTLED: " + metrics.settlementEvents +
                    " | RESORPTION: " + metrics.meanResorption.toFixed(0) + "%";
                valTPIStatusEl.style.color = metrics.meanTPI >= 50.0 ? "#fde047" : "#f59e0b";
            }

            // 3. Primary Channel 100 Readout (% CPR - Centenary Historic Milestone)
            const valCPRIndexEl = document.getElementById("valCPRIndex");
            if (valCPRIndexEl) {
                valCPRIndexEl.textContent = metrics.meanCPR.toFixed(1) + "% CPR (" + metrics.regimeTitleCPR + ")";
                if (metrics.meanCPR >= 85.0) {
                    valCPRIndexEl.style.color = "#d8b4fe";
                } else if (metrics.meanCPR >= 60.0) {
                    valCPRIndexEl.style.color = "#c084fc";
                } else if (metrics.meanCPR >= 30.0) {
                    valCPRIndexEl.style.color = "#a855f7";
                } else {
                    valCPRIndexEl.style.color = "#ef4444";
                }
            }

            // 4. Secondary Channel 100 Status
            const valCPRStatusEl = document.getElementById("valCPRStatus");
            if (valCPRStatusEl) {
                valCPRStatusEl.textContent =
                    "CPR: " + metrics.meanCPR.toFixed(1) + "%" +
                    " | DIR: " + metrics.cardiacDirTitle +
                    " | STASIS: " + metrics.activeStasisCount +
                    " | FOULING: " + metrics.meanFouling.toFixed(0) + "%" +
                    " | SQUIRT: " + metrics.squirtEvents +
                    " | REVERSALS: " + metrics.reversalEvents +
                    " | ARRHYTHMIAS: " + metrics.arrhythmiaEvents;
                valCPRStatusEl.style.color = metrics.meanCPR >= 50.0 ? "#c084fc" : "#8b5cf6";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 99th Channel: % TPI
            if (!historyData.tunicProtectiveIntegrity) {
                historyData.tunicProtectiveIntegrity = new Array(74).fill(0);
            }
            const chartValTPI = Number.isFinite(metrics.meanTPI) ?
                Math.max(0, Math.min(100, metrics.meanTPI)) : 0;
            historyData.tunicProtectiveIntegrity.shift();
            historyData.tunicProtectiveIntegrity.push(chartValTPI);

            // 100th Channel: % CPR (Centenary Milestone)
            if (!historyData.ciliaryPumpingReversalRatio) {
                historyData.ciliaryPumpingReversalRatio = new Array(74).fill(0);
            }
            const chartValCPR = Number.isFinite(metrics.meanCPR) ?
                Math.max(0, Math.min(100, metrics.meanCPR)) : 0;
            historyData.ciliaryPumpingReversalRatio.shift();
            historyData.ciliaryPumpingReversalRatio.push(chartValCPR);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} urochordateManager - Global UrochordateTunicManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, urochordateManager, tick) {
            const metrics = UrochordateTelemetryManager.calculateMetrics(organisms, urochordateManager, tick);
            UrochordateTelemetryManager.updateHUD(metrics);
            UrochordateTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = UrochordateTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.UrochordateTelemetryManager = UrochordateTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
