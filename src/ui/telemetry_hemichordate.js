// BioEcosystem - Hemichordate Pharyngeal Slit Index (% PSI) & Proboscis Burrowing Efficiency (% PBE) Telemetry
// Module: src/ui/telemetry_hemichordate.js
// Version: 7.78.0 (Hour 498 - Looks & UI Agent: 96th Channel % PBE & Dual Hemichordata HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HemichordateTelemetryManager
     * High-precision laboratory telemetry tracking for hemichordate (acorn worm) respiration and burrowing:
     * - Channel 95: Pharyngeal Slit Index (% PSI) - Active slit ratio, ciliary water efflux, stomochord support, and oxygenation
     * - Channel 96: Proboscis Burrowing Efficiency (% PBE) - Hydrostatic burrowing drive, mucus lining strength, silt resistance, and assimilation
     * - Synthesizes U-shaped pharyngeal gill slit flux [0.15 - 0.75 uL/s] and respiratory oxygen diffusion
     * - Tracks stomochord hydrostatic turgor [0.30 - 0.95] supporting proboscis peristalsis
     * - Audits benthic sediment U-burrowing depth [0 - 50 px] and antiseptic bromophenol mucus secretion
     * - Evaluates proboscis silt clogging, flushing spasms, hypoxic stress, and starvation depletion stalls
     * - Monitors pelagic Tornaria larval dispersion and planktonic micro-seston filtration
     * - Implements 4 distinct biological regimes across the 95th and 96th telemetry channels
     * - Renders laboratory HUD indicators, telemetry status badges, and circular history buffers
     */
    class HemichordateTelemetryManager {
        /**
         * Calculate dish-wide Hemichordata respiration, stomochord, and burrowing metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} hemichordateManager - Global HemichordatePharyngealManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Hemichordata telemetry metrics.
         */
        static calculateMetrics(organisms, hemichordateManager, tick) {
            let liveCount = 0;
            let hemiCount = 0;
            let activeBurrowers = 0;
            let tornariaCount = 0;

            let sumPSI = 0.0;
            let sumPBE = 0.0;
            let sumEfficiency = 0.0;
            let sumStomochord = 0.0;
            let sumSlits = 0;
            let sumMucus = 0.0;
            let sumSilt = 0.0;
            let sumHypoxia = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isHemichordate) {
                        hemiCount++;

                        const psi = org.pharyngealSlitIndex || 0.42;
                        const pbe = org.proboscisBurrowingEfficiency || 0.35;
                        const eff = org.gillSlitEfficiency || 0.45;
                        const stomo = org.stomochordTurgor || 0.70;
                        const slits = org.gillSlitsCount || 12;
                        const mucus = org.bromophenolSecretion || 0.25;
                        const silt = org.siltCloggingLevel || 0.0;
                        const hypoxia = org.hypoxicStressAccumulation || 0.0;

                        sumPSI += psi;
                        sumPBE += pbe;
                        sumEfficiency += eff;
                        sumStomochord += stomo;
                        sumSlits += slits;
                        sumMucus += mucus;
                        sumSilt += silt;
                        sumHypoxia += hypoxia;

                        if (org.isBurrowing) activeBurrowers++;
                        if (org.hasTornariaPhase) tornariaCount++;
                    }
                }
            }

            const hemiPrevalence = liveCount > 0 ? (hemiCount / liveCount) * 100.0 : 0.0;
            const meanPSI = hemiCount > 0 ? (sumPSI / hemiCount) * 100.0 : 0.0;
            const meanPBE = hemiCount > 0 ? (sumPBE / hemiCount) * 100.0 : 0.0;
            const meanEfficiency = hemiCount > 0 ? (sumEfficiency / hemiCount) * 100.0 : 0.0;
            const meanStomochord = hemiCount > 0 ? (sumStomochord / hemiCount) * 100.0 : 0.0;
            const meanSlits = hemiCount > 0 ? (sumSlits / hemiCount) : 12.0;
            const meanMucus = hemiCount > 0 ? (sumMucus / hemiCount) * 100.0 : 0.0;
            const meanSilt = hemiCount > 0 ? (sumSilt / hemiCount) * 100.0 : 0.0;
            const meanHypoxia = hemiCount > 0 ? (sumHypoxia / hemiCount) * 100.0 : 0.0;

            let filtEvents = 0;
            let burrowEvents = 0;
            let flushingEvents = 0;
            let asphyxEvents = 0;
            let stallEvents = 0;
            let oxygenTotal = 0.0;
            let sedimentTotal = 0.0;

            if (hemichordateManager && hemichordateManager.getMetrics) {
                const mgrMetrics = hemichordateManager.getMetrics();
                filtEvents = mgrMetrics.pharyngealFiltrationEvents || 0;
                burrowEvents = mgrMetrics.burrowingEvents || 0;
                flushingEvents = mgrMetrics.proboscisFlushingEvents || 0;
                asphyxEvents = mgrMetrics.asphyxiationIncidents || 0;
                stallEvents = mgrMetrics.mucusDepletionStalls || 0;
                oxygenTotal = mgrMetrics.cumulativeFilteredOxygen || 0.0;
                sedimentTotal = mgrMetrics.cumulativeSedimentDisplaced || 0.0;
            }

            // 4 Biological Regimes for 95th Channel (% PSI)
            let regimeCodePSI = "RESTING";
            let regimeTitlePSI = "RESTING & SLITS CLOSED";
            let regimeBadgePSI = "psi-resting";

            if (meanPSI >= 85.0) {
                regimeCodePSI = "PEAK";
                regimeTitlePSI = "PEAK GILL FLUX & RESPIRATION";
                regimeBadgePSI = "psi-peak";
            } else if (meanPSI >= 60.0) {
                regimeCodePSI = "FILTRATION";
                regimeTitlePSI = "ACTIVE PHARYNGEAL FILTRATION";
                regimeBadgePSI = "psi-filtration";
            } else if (meanPSI >= 30.0) {
                regimeCodePSI = "CILIARY";
                regimeTitlePSI = "CILIARY FLUX & OXYGENATION";
                regimeBadgePSI = "psi-ciliary";
            }

            // 4 Biological Regimes for 96th Channel (% PBE)
            let regimeCodePBE = "SURFACE";
            let regimeTitlePBE = "SURFACE & QUIESCENT";
            let regimeBadgePBE = "pbe-surface";

            if (meanPBE >= 85.0) {
                regimeCodePBE = "PEAK";
                regimeTitlePBE = "PEAK HYDROSTATIC BURROWING";
                regimeBadgePBE = "pbe-peak";
            } else if (meanPBE >= 60.0) {
                regimeCodePBE = "STABLE";
                regimeTitlePBE = "STABLE U-BURROW & MUCUS LINING";
                regimeBadgePBE = "pbe-stable";
            } else if (meanPBE >= 30.0) {
                regimeCodePBE = "FLUSHING";
                regimeTitlePBE = "FLUSHING & SHALLOW BURROWING";
                regimeBadgePBE = "pbe-flushing";
            }

            return {
                liveCount,
                hemiCount,
                hemiPrevalence,
                activeBurrowers,
                tornariaCount,
                meanPSI,
                meanPBE,
                meanEfficiency,
                meanStomochord,
                meanSlits,
                meanMucus,
                meanSilt,
                meanHypoxia,
                filtEvents,
                burrowEvents,
                flushingEvents,
                asphyxEvents,
                stallEvents,
                oxygenTotal,
                sedimentTotal,
                regimeCodePSI,
                regimeTitlePSI,
                regimeBadgePSI,
                regimeCodePBE,
                regimeTitlePBE,
                regimeBadgePBE,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 95th (% PSI) & 96th (% PBE) Channels.
         * @param {Object} metrics - Calculated Hemichordata telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 95 Readout (% PSI)
            const valPSIIndexEl = document.getElementById("valPSIIndex");
            if (valPSIIndexEl) {
                valPSIIndexEl.textContent = metrics.meanPSI.toFixed(1) + "% PSI (" + metrics.regimeTitlePSI + ")";
                if (metrics.meanPSI >= 85.0) {
                    valPSIIndexEl.style.color = "#cffafe";
                } else if (metrics.meanPSI >= 60.0) {
                    valPSIIndexEl.style.color = "#67e8f9";
                } else if (metrics.meanPSI >= 30.0) {
                    valPSIIndexEl.style.color = "#22d3ee";
                } else {
                    valPSIIndexEl.style.color = "#06b6d4";
                }
            }

            // 2. Secondary Channel 95 Status
            const valPSIStatusEl = document.getElementById("valPSIStatus");
            if (valPSIStatusEl) {
                valPSIStatusEl.textContent =
                    "HEMICHORDATA: " + metrics.hemiCount + "/" + metrics.liveCount +
                    " (" + metrics.hemiPrevalence.toFixed(0) + "%) | SLITS: " + metrics.meanSlits.toFixed(1) +
                    " | EFFICIENCY: " + metrics.meanEfficiency.toFixed(1) + "%" +
                    " | STOMOCHORD: " + metrics.meanStomochord.toFixed(0) + "%" +
                    " | BURROWERS: " + metrics.activeBurrowers +
                    " | TORNARIA: " + metrics.tornariaCount +
                    " | FILTRATION: " + metrics.filtEvents;
                valPSIStatusEl.style.color = metrics.meanPSI >= 50.0 ? "#67e8f9" : "#06b6d4";
            }

            // 3. Primary Channel 96 Readout (% PBE)
            const valPBEIndexEl = document.getElementById("valPBEIndex");
            if (valPBEIndexEl) {
                valPBEIndexEl.textContent = metrics.meanPBE.toFixed(1) + "% PBE (" + metrics.regimeTitlePBE + ")";
                if (metrics.meanPBE >= 85.0) {
                    valPBEIndexEl.style.color = "#fef3c7";
                } else if (metrics.meanPBE >= 60.0) {
                    valPBEIndexEl.style.color = "#fde68a";
                } else if (metrics.meanPBE >= 30.0) {
                    valPBEIndexEl.style.color = "#f59e0b";
                } else {
                    valPBEIndexEl.style.color = "#d97706";
                }
            }

            // 4. Secondary Channel 96 Status
            const valPBEStatusEl = document.getElementById("valPBEStatus");
            if (valPBEStatusEl) {
                valPBEStatusEl.textContent =
                    "PBE: " + metrics.meanPBE.toFixed(1) + "%" +
                    " | SILT: " + metrics.meanSilt.toFixed(0) + "%" +
                    " | HYPOXIA: " + metrics.meanHypoxia.toFixed(0) + "%" +
                    " | FLUSHING: " + metrics.flushingEvents +
                    " | STALLS: " + metrics.stallEvents +
                    " | ASPHYXIA: " + metrics.asphyxEvents;
                valPBEStatusEl.style.color = metrics.meanPBE >= 50.0 ? "#fde68a" : "#d97706";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 95th Channel: % PSI
            if (!historyData.pharyngealSlitIndex) {
                historyData.pharyngealSlitIndex = new Array(74).fill(0);
            }
            const chartValPSI = Number.isFinite(metrics.meanPSI) ?
                Math.max(0, Math.min(100, metrics.meanPSI)) : 0;
            historyData.pharyngealSlitIndex.shift();
            historyData.pharyngealSlitIndex.push(chartValPSI);

            // 96th Channel: % PBE
            if (!historyData.proboscisBurrowingEfficiency) {
                historyData.proboscisBurrowingEfficiency = new Array(74).fill(0);
            }
            const chartValPBE = Number.isFinite(metrics.meanPBE) ?
                Math.max(0, Math.min(100, metrics.meanPBE)) : 0;
            historyData.proboscisBurrowingEfficiency.shift();
            historyData.proboscisBurrowingEfficiency.push(chartValPBE);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} hemichordateManager - Global HemichordatePharyngealManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, hemichordateManager, tick) {
            const metrics = HemichordateTelemetryManager.calculateMetrics(organisms, hemichordateManager, tick);
            HemichordateTelemetryManager.updateHUD(metrics);
            HemichordateTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.HemichordateTelemetryManager = HemichordateTelemetryManager;

})(typeof window !== "undefined" ? window : global);
