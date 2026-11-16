// BioEcosystem - Cuvierian Defense Index (% CDI) & Visceral Regeneration Index (% VRI) Telemetry
// Module: src/ui/telemetry_cuvierian.js
// Version: 7.48.0 (Hour 468 - Looks & UI Agent: 90th Channel % VRI & Dual Holothuroid HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CuvierianTelemetryManager
     * High-precision laboratory telemetry tracking for holothuroid defense, sediment ingestion, and visceral regeneration:
     * - Channel 89: Cuvierian Defense Index (% CDI) - Tubule reserves, adhesion strength, holothurin toxicity, and aeration
     * - Channel 90: Visceral Regeneration Index (% VRI) - Visceral integrity, mesenteric stem cell regeneration, lipids, and parasite resistance
     * - Synthesizes caudal Cuvierian tubule coelomic reserves [0 - 30 tubules]
     * - Tracks tensile adhesion strength [0.70 - 0.98] and predator entanglement efficacy
     * - Audits holothurin saponin chemical toxicity payload [0.0 - 50.0 mg] and hemolytic deterrence
     * - Evaluates cloacal ventilation pumping rhythm and respiratory tree coelomic aeration
     * - Tracks autonomic visceral evisceration, post-evisceration starvation downtime, and coelomic lipid depletion
     * - Monitors endoparasitic pearlfish (Carapidae) intrusion loads and mesenteric stem cell reconstruction
     * - Implements 4 distinct biological regimes across the 89th and 90th telemetry channels
     * - Renders laboratory HUD telemetry indicators, status badges, and circular history buffers
     */
    class CuvierianTelemetryManager {
        /**
         * Calculate dish-wide Holothuroidea defense metrics, tubule reserves, and visceral regeneration.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} cuvierianManager - Global HolothuroidCuvierianManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Holothuroid telemetry metrics.
         */
        static calculateMetrics(organisms, cuvierianManager, tick) {
            let liveCount = 0;
            let holoCount = 0;
            let activeDepositCount = 0;
            let highCDICount = 0;
            let highVRICount = 0;
            let evisceratedCount = 0;

            let sumCDI = 0.0;
            let sumVRI = 0.0;
            let sumTubules = 0;
            let sumAdhesion = 0.0;
            let sumToxin = 0.0;
            let sumIngestion = 0.0;
            let sumFecal = 0.0;
            let sumCloacal = 0.0;
            let sumViscera = 0.0;
            let sumLipids = 0.0;
            let sumParasite = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const hasHolothuroid = org.hasHolothuroidTrait || org.secondaryBilateralAxis;
                    if (hasHolothuroid) {
                        holoCount++;

                        const cdi = org.cuvierianDefenseIndex || 0.0;
                        const vri = org.visceralRegenerationIndex || 0.0;
                        const tubules = org.cuvierianTubulesReserve || 0;
                        const adhesion = org.tubuleAdhesionStrength || 0.82;
                        const toxin = org.holothurinToxinPayload || 0.0;
                        const ingestion = org.sedimentIngestionRate || 0.25;
                        const fecal = org.fecalPelletRate || 0.0;
                        const cloacal = org.cloacalPumpingRate || 0.35;
                        const viscera = org.visceralIntegrity || 1.0;
                        const lipids = org.coelomicLipidReserve || 70.0;
                        const parasite = org.respiratoryParasiteLoad || 0.0;

                        sumCDI += cdi;
                        sumVRI += vri;
                        sumTubules += tubules;
                        sumAdhesion += adhesion;
                        sumToxin += toxin;
                        sumIngestion += ingestion;
                        sumFecal += fecal;
                        sumCloacal += cloacal;
                        sumViscera += viscera;
                        sumLipids += lipids;
                        sumParasite += parasite;

                        if (org.y >= 310.0 && (org.energy && org.energy < 92.0)) {
                            activeDepositCount++;
                        }
                        if (cdi >= 0.70) highCDICount++;
                        if (vri >= 0.70) highVRICount++;
                        if (viscera < 0.60) evisceratedCount++;
                    }
                }
            }

            const denom = holoCount > 0 ? holoCount : 1;
            const meanCDI = holoCount > 0 ? (sumCDI / denom) * 100.0 : 0.0;
            const meanVRI = holoCount > 0 ? (sumVRI / denom) * 100.0 : 0.0;
            const meanTubules = holoCount > 0 ? (sumTubules / denom) : 0.0;
            const meanAdhesion = holoCount > 0 ? (sumAdhesion / denom) * 100.0 : 0.0;
            const meanToxin = holoCount > 0 ? (sumToxin / denom) : 0.0;
            const meanIngestion = holoCount > 0 ? (sumIngestion / denom) : 0.0;
            const meanFecal = holoCount > 0 ? (sumFecal / denom) : 0.0;
            const meanCloacal = holoCount > 0 ? (sumCloacal / denom) : 0.0;
            const meanViscera = holoCount > 0 ? (sumViscera / denom) * 100.0 : 0.0;
            const meanCoelomicLipids = holoCount > 0 ? (sumLipids / denom) : 0.0;
            const meanParasiteLoad = holoCount > 0 ? (sumParasite / denom) : 0.0;
            const holoPrevalence = liveCount > 0 ? (holoCount / liveCount) * 100.0 : 0.0;

            const mgrMetrics = cuvierianManager ? cuvierianManager.metrics : {};
            const ejectionIncidents = mgrMetrics ? (mgrMetrics.tubuleEjectionIncidents || 0) : 0;
            const immobilizationEvents = mgrMetrics ? (mgrMetrics.predatorImmobilizationEvents || 0) : 0;
            const eviscerationIncidents = mgrMetrics ? (mgrMetrics.eviscerationIncidents || 0) : 0;
            const visceralRegenEvents = mgrMetrics ? (mgrMetrics.visceralRegenerationEvents || 0) : 0;
            const parasiteIntrusionEvents = mgrMetrics ? (mgrMetrics.parasiteIntrusionEvents || 0) : 0;
            const pelletDeposits = mgrMetrics ? (mgrMetrics.fecalPelletDeposits || 0) : 0;
            const sedimentProcessed = mgrMetrics ? (mgrMetrics.cumulativeSedimentProcessed || 0.0) : 0.0;
            const carbonHarvested = mgrMetrics ? (mgrMetrics.cumulativeCarbonHarvested || 0.0) : 0.0;
            const holothurinDispersed = mgrMetrics ? (mgrMetrics.cumulativeHolothurinDispersed || 0.0) : 0.0;
            const lipidsConsumed = mgrMetrics ? (mgrMetrics.cumulativeLipidsConsumed || 0.0) : 0.0;

            // Classify 89th Channel Biological Regime (% CDI)
            let regimeCodeCDI = "CDI_DEPLETED";
            let regimeTitleCDI = "CUVIERIAN EXHAUSTION & COELOMIC FLACCIDITY";
            let regimeBadgeCDI = "cdi-depleted";

            if (meanCDI >= 85.0) {
                regimeCodeCDI = "CDI_MAXIMAL";
                regimeTitleCDI = "MAXIMAL ENTANGLEMENT TENSION & LETHAL HOLOTHURIN";
                regimeBadgeCDI = "cdi-maximal";
            } else if (meanCDI >= 60.0) {
                regimeCodeCDI = "CDI_ACTIVE";
                regimeTitleCDI = "ACTIVE CUVIERIAN DEFENSE & SAPONIN DETERRENCE";
                regimeBadgeCDI = "cdi-active";
            } else if (meanCDI >= 30.0) {
                regimeCodeCDI = "CDI_BASAL";
                regimeTitleCDI = "BASAL REGENERATION & INCIPIENT COELOMIC TUBULES";
                regimeBadgeCDI = "cdi-basal";
            }

            // Classify 90th Channel Biological Regime (% VRI)
            let regimeCodeVRI = "VRI_CRITICAL";
            let regimeTitleVRI = "ACUTE EVISCERATION & STARVATION DOWNTIME";
            let regimeBadgeVRI = "vri-critical";

            if (meanVRI >= 85.0) {
                regimeCodeVRI = "VRI_MAXIMAL";
                regimeTitleVRI = "FULLY INTACT VISCERA & RESPIRATORY EQUILIBRIUM";
                regimeBadgeVRI = "vri-maximal";
            } else if (meanVRI >= 60.0) {
                regimeCodeVRI = "VRI_RESTRUCTURING";
                regimeTitleVRI = "ALIMENTARY RECONSTRUCTION & LIPID RECOVERY";
                regimeBadgeVRI = "vri-restructuring";
            } else if (meanVRI >= 30.0) {
                regimeCodeVRI = "VRI_MESENTERIC";
                regimeTitleVRI = "MESENTERIC STEM CELL PROLIFERATION";
                regimeBadgeVRI = "vri-mesenteric";
            }

            return {
                liveCount,
                holoCount,
                holoPrevalence,
                activeDepositCount,
                highCDICount,
                highVRICount,
                evisceratedCount,
                meanCDI,
                meanVRI,
                meanTubules,
                meanAdhesion,
                meanToxin,
                meanIngestion,
                meanFecal,
                meanCloacal,
                meanViscera,
                meanCoelomicLipids,
                meanParasiteLoad,
                ejectionIncidents,
                immobilizationEvents,
                eviscerationIncidents,
                visceralRegenEvents,
                parasiteIntrusionEvents,
                pelletDeposits,
                sedimentProcessed,
                carbonHarvested,
                holothurinDispersed,
                lipidsConsumed,
                regimeCodeCDI,
                regimeTitleCDI,
                regimeBadgeCDI,
                regimeCodeVRI,
                regimeTitleVRI,
                regimeBadgeVRI,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 89th (% CDI) and 90th (% VRI) Channels.
         * @param {Object} metrics - Calculated Holothuroidea telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 89 Readout (% CDI)
            const valCDIIndexEl = document.getElementById("valCDIIndex");
            if (valCDIIndexEl) {
                valCDIIndexEl.textContent = metrics.meanCDI.toFixed(1) + "% CDI (" + metrics.regimeTitleCDI + ")";
                if (metrics.meanCDI >= 85.0) {
                    valCDIIndexEl.style.color = "#e0f2fe";
                } else if (metrics.meanCDI >= 60.0) {
                    valCDIIndexEl.style.color = "#7dd3fc";
                } else if (metrics.meanCDI >= 30.0) {
                    valCDIIndexEl.style.color = "#38bdf8";
                } else {
                    valCDIIndexEl.style.color = "#0ea5e9";
                }
            }

            // 2. Secondary Channel 89 Status
            const valCDIStatusEl = document.getElementById("valCDIStatus");
            if (valCDIStatusEl) {
                valCDIStatusEl.textContent =
                    "HOLOTHURIA: " + metrics.holoCount + "/" + metrics.liveCount +
                    " (" + metrics.holoPrevalence.toFixed(0) + "%) | TUBULES: " + metrics.meanTubules.toFixed(1) +
                    " | TOXIN: " + metrics.meanToxin.toFixed(1) + " mg" +
                    " | ADHESION: " + metrics.meanAdhesion.toFixed(1) + "%" +
                    " | EJECTIONS: " + metrics.ejectionIncidents +
                    " | IMMOBILIZED: " + metrics.immobilizationEvents +
                    " | SEDIMENT: " + metrics.sedimentProcessed.toFixed(1) + " mg";
                valCDIStatusEl.style.color = metrics.meanCDI >= 50.0 ? "#38bdf8" : "#0ea5e9";
            }

            // 3. Primary Channel 90 Readout (% VRI)
            const valVRIIndexEl = document.getElementById("valVRIIndex");
            if (valVRIIndexEl) {
                valVRIIndexEl.textContent = metrics.meanVRI.toFixed(1) + "% VRI (" + metrics.regimeTitleVRI + ")";
                if (metrics.meanVRI >= 85.0) {
                    valVRIIndexEl.style.color = "#f3e8ff";
                } else if (metrics.meanVRI >= 60.0) {
                    valVRIIndexEl.style.color = "#d8b4fe";
                } else if (metrics.meanVRI >= 30.0) {
                    valVRIIndexEl.style.color = "#c084fc";
                } else {
                    valVRIIndexEl.style.color = "#a855f7";
                }
            }

            // 4. Secondary Channel 90 Status
            const valVRIStatusEl = document.getElementById("valVRIStatus");
            if (valVRIStatusEl) {
                valVRIStatusEl.textContent =
                    "VRI: " + metrics.meanVRI.toFixed(1) + "%" +
                    " | VISCERA: " + metrics.meanViscera.toFixed(1) + "%" +
                    " | LIPIDS: " + metrics.meanCoelomicLipids.toFixed(1) + "%" +
                    " | PARASITES: " + (metrics.meanParasiteLoad * 100.0).toFixed(1) + "%" +
                    " | EVISCERATED: " + metrics.evisceratedCount +
                    " | REGENS: " + metrics.visceralRegenEvents +
                    " | PURGES: " + metrics.eviscerationIncidents;
                valVRIStatusEl.style.color = metrics.evisceratedCount > 0 ? "#e879f9" : (metrics.meanVRI >= 50.0 ? "#c084fc" : "#a855f7");
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 89th Channel: % CDI
            if (!historyData.cuvierianDefenseIndex) {
                historyData.cuvierianDefenseIndex = new Array(74).fill(0);
            }
            const chartValCDI = Number.isFinite(metrics.meanCDI) ?
                Math.max(0, Math.min(100, metrics.meanCDI)) : 0;
            historyData.cuvierianDefenseIndex.shift();
            historyData.cuvierianDefenseIndex.push(chartValCDI);

            // 90th Channel: % VRI
            if (!historyData.visceralRegenerationIndex) {
                historyData.visceralRegenerationIndex = new Array(74).fill(0);
            }
            const chartValVRI = Number.isFinite(metrics.meanVRI) ?
                Math.max(0, Math.min(100, metrics.meanVRI)) : 0;
            historyData.visceralRegenerationIndex.shift();
            historyData.visceralRegenerationIndex.push(chartValVRI);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} cuvierianManager - Global HolothuroidCuvierianManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, cuvierianManager, tick) {
            const metrics = CuvierianTelemetryManager.calculateMetrics(organisms, cuvierianManager, tick);
            CuvierianTelemetryManager.updateHUD(metrics);
            CuvierianTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.CuvierianTelemetryManager = CuvierianTelemetryManager;

})(typeof window !== "undefined" ? window : global);
