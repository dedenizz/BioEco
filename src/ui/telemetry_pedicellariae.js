// BioEcosystem - Stereom Protection Index (% SPI) & Pedicellariae Deterrence Ratio (% PDR) Telemetry
// Module: src/ui/telemetry_pedicellariae.js
// Version: 7.28.0 (Hour 448 - Looks & UI Agent: 86th Channel % PDR & Dual Stereom HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PedicellariaeTelemetryManager
     * High-precision laboratory telemetry tracking for echinoderm stereom endoskeleton and defense:
     * - Channel 85: Stereom Protection Index (% SPI)
     * - Channel 86: Pedicellariae Deterrence Ratio (% PDR)
     * - Synthesizes 3D trabecular micro-porosity, impact fracture damping, and energy dissipation
     * - Tracks ball-and-socket articulated calcite spine count, broken stumps, and axial crystal regrowth
     * - Audits globiferous pedicellariae venom glands, paralytic neurotoxin payload, and gland exhaustion
     * - Monitors epibiont biofouling load, dermal respiratory papulae occlusion, and hypoxia penalties
     * - Quantifies lightweight mineral efficiency (-45% calcium metabolic tax) and vitality dividends
     * - Implements 4 distinct biological regimes across both 85th and 86th telemetry channels
     * - Renders laboratory HUD telemetry indicators, status badges, and circular history buffers
     */
    class PedicellariaeTelemetryManager {
        /**
         * Calculate dish-wide stereom protection metrics, spine coverage, venom reserves, and pedicellariae deterrence.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} pedicellariaeManager - Global EchinodermPedicellariaeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive stereom protection and pedicellariae telemetry metrics.
         */
        static calculateMetrics(organisms, pedicellariaeManager, tick) {
            let liveCount = 0;
            let stereomCount = 0;
            let activeDeflectorCount = 0;
            let activeGroomerCount = 0;
            let highArmorCount = 0;
            let highDeterrenceCount = 0;

            let sumSPI = 0.0;
            let sumPDR = 0.0;
            let sumPorosity = 0.0;
            let sumDamping = 0.0;
            let sumSpines = 0;
            let sumBrokenSpines = 0;
            let sumPincers = 0;
            let sumNeurotoxin = 0.0;
            let sumMaxNeurotoxin = 0.0;
            let sumVenomExhaustion = 0.0;
            let sumFouling = 0.0;
            let sumDermalImpairment = 0.0;
            let sumCleaningEff = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    const hasStereom = org.hasStereom || (org.calciteSpinesCount && org.calciteSpinesCount > 0);
                    if (hasStereom) {
                        stereomCount++;

                        const spi = org.stereomProtectionIndex || 0.0;
                        const pdr = org.pedicellariaeDeterrenceRatio || 0.0;
                        const poro = org.stereomPorousLattice || 0.52;
                        const damp = org.impactDampingCoefficient || 0.45;
                        const spines = org.calciteSpinesCount || 16;
                        const broken = org.brokenSpinesCount || 0;
                        const pincers = org.pedicellariaePincerCount || 24;
                        const neuro = org.neurotoxinPayload || 0.0;
                        const maxNeuro = org.maxNeurotoxinCapacity || 25.0;
                        const exhaust = org.venomExhaustionLevel || 0.0;
                        const fouling = org.epibiontFoulingLevel || 0.0;
                        const dermalImpair = org.dermalGasExchangeImpairment || 0.0;
                        const cleanEff = org.epibiontCleaningEfficiency || 0.70;

                        sumSPI += spi;
                        sumPDR += pdr;
                        sumPorosity += poro;
                        sumDamping += damp;
                        sumSpines += spines;
                        sumBrokenSpines += broken;
                        sumPincers += pincers;
                        sumNeurotoxin += neuro;
                        sumMaxNeurotoxin += maxNeuro;
                        sumVenomExhaustion += exhaust;
                        sumFouling += fouling;
                        sumDermalImpairment += dermalImpair;
                        sumCleaningEff += cleanEff;

                        if (spines - broken >= 12) activeDeflectorCount++;
                        if (pincers >= 24 && fouling < 0.20) activeGroomerCount++;
                        if (spi >= 0.70) highArmorCount++;
                        if (pdr >= 0.70) highDeterrenceCount++;
                    }
                }
            }

            const denom = stereomCount > 0 ? stereomCount : 1;
            const meanSPI = stereomCount > 0 ? (sumSPI / denom) * 100.0 : 0.0;
            const meanPDR = stereomCount > 0 ? (sumPDR / denom) * 100.0 : 0.0;
            const meanPorosity = stereomCount > 0 ? (sumPorosity / denom) * 100.0 : 0.0;
            const meanDamping = stereomCount > 0 ? (sumDamping / denom) * 100.0 : 0.0;
            const meanSpines = stereomCount > 0 ? Math.round(sumSpines / denom) : 0;
            const meanBrokenSpines = stereomCount > 0 ? Math.round(sumBrokenSpines / denom) : 0;
            const meanIntactSpines = Math.max(0, meanSpines - meanBrokenSpines);
            const meanPincers = stereomCount > 0 ? Math.round(sumPincers / denom) : 0;
            const meanNeurotoxin = stereomCount > 0 ? (sumNeurotoxin / denom) : 0.0;
            const meanMaxNeuro = stereomCount > 0 ? (sumMaxNeurotoxin / denom) : 0.0;
            const meanVenomExhaustion = stereomCount > 0 ? (sumVenomExhaustion / denom) * 100.0 : 0.0;
            const meanFouling = stereomCount > 0 ? (sumFouling / denom) * 100.0 : 0.0;
            const meanDermalImpairment = stereomCount > 0 ? (sumDermalImpairment / denom) * 100.0 : 0.0;
            const meanCleaningEff = stereomCount > 0 ? (sumCleaningEff / denom) * 100.0 : 0.0;
            const stereomPrevalence = liveCount > 0 ? (stereomCount / liveCount) * 100.0 : 0.0;

            const mgrMetrics = pedicellariaeManager ? pedicellariaeManager.metrics : {};
            const deflections = mgrMetrics ? (mgrMetrics.activeSpineDeflections || 0) : 0;
            const spineFractures = mgrMetrics ? (mgrMetrics.spineFractureEvents || 0) : 0;
            const spineRegens = mgrMetrics ? (mgrMetrics.spineRegenerationEvents || 0) : 0;
            const pincerSnaps = mgrMetrics ? (mgrMetrics.pincerSnappingEvents || 0) : 0;
            const venomInjections = mgrMetrics ? (mgrMetrics.venomInjectionEvents || 0) : 0;
            const parasiteEradications = mgrMetrics ? (mgrMetrics.parasiteEradicationEvents || 0) : 0;
            const dermalSuffocations = mgrMetrics ? (mgrMetrics.dermalSuffocationEvents || 0) : 0;

            // Classify 85th Channel Biological Regime (% SPI)
            let regimeCode = "UNARMORED_CUTICLE";
            let regimeTitle = "POROUS LATTICE COLLAPSE & UNARMORED CUTICLE";
            let regimeBadge = "spi-unarmored";

            if (meanSPI >= 85.0) {
                regimeCode = "MAXIMAL_STEREOM";
                regimeTitle = "MAXIMAL TRABECULAR STEREOM & HYGIENIC PINCH BARRIER";
                regimeBadge = "spi-maximal";
            } else if (meanSPI >= 60.0) {
                regimeCode = "ARTICULATED_DEFENSE";
                regimeTitle = "ARTICULATED SPINES & ACTIVE PEDICELLARIAE DEFENSE";
                regimeBadge = "spi-articulated";
            } else if (meanSPI >= 30.0) {
                regimeCode = "DEVELOPING_LATTICE";
                regimeTitle = "DEVELOPING TRABECULAR LATTICE & BASAL TUBERCLES";
                regimeBadge = "spi-developing";
            }

            // Classify 86th Channel Biological Regime (% PDR)
            let pdrRegimeCode = "PDR_DEPLETED";
            let pdrRegimeTitle = "CHEMICAL DEFENSE DEPLETION & RECEPTOR PARALYSIS";
            let pdrRegimeBadge = "pdr-depleted";

            if (meanPDR >= 85.0) {
                pdrRegimeCode = "PDR_MAXIMAL";
                pdrRegimeTitle = "MAXIMAL GLOBIFEROUS VENOM & AXIAL REGENERATION";
                pdrRegimeBadge = "pdr-maximal";
            } else if (meanPDR >= 60.0) {
                pdrRegimeCode = "PDR_ACTIVE";
                pdrRegimeTitle = "PARALYTIC NEUROTOXIN & ACTIVE PINCER DEFENSE";
                pdrRegimeBadge = "pdr-active";
            } else if (meanPDR >= 30.0) {
                pdrRegimeCode = "PDR_VULNERABLE";
                pdrRegimeTitle = "LOW TOXIN PAYLOAD & BROKEN SPINE STUMPS";
                pdrRegimeBadge = "pdr-vulnerable";
            }

            return {
                liveCount,
                stereomCount,
                stereomPrevalence,
                activeDeflectorCount,
                activeGroomerCount,
                highArmorCount,
                highDeterrenceCount,
                meanSPI,
                meanPDR,
                meanPorosity,
                meanDamping,
                meanSpines,
                meanBrokenSpines,
                meanIntactSpines,
                meanPincers,
                meanNeurotoxin,
                meanMaxNeuro,
                meanVenomExhaustion,
                meanFouling,
                meanDermalImpairment,
                meanCleaningEff,
                deflections,
                spineFractures,
                spineRegens,
                pincerSnaps,
                venomInjections,
                parasiteEradications,
                dermalSuffocations,
                regimeCode,
                regimeTitle,
                regimeBadge,
                pdrRegimeCode,
                pdrRegimeTitle,
                pdrRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for both 85th and 86th channels.
         * @param {Object} metrics - Calculated stereom telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 85 Readout (% SPI)
            const valSPIIndexEl = document.getElementById("valSPIIndex");
            if (valSPIIndexEl) {
                valSPIIndexEl.textContent = metrics.meanSPI.toFixed(1) + "% SPI (" + metrics.regimeTitle + ")";
                if (metrics.meanSPI >= 85.0) {
                    valSPIIndexEl.style.color = "#f8fafc";
                } else if (metrics.meanSPI >= 60.0) {
                    valSPIIndexEl.style.color = "#e2e8f0";
                } else if (metrics.meanSPI >= 30.0) {
                    valSPIIndexEl.style.color = "#cbd5e1";
                } else {
                    valSPIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 85 Status
            const valSPIStatusEl = document.getElementById("valSPIStatus");
            if (valSPIStatusEl) {
                valSPIStatusEl.textContent =
                    "STEREOM: " + metrics.stereomCount + "/" + metrics.liveCount +
                    " (" + metrics.stereomPrevalence.toFixed(0) + "%) | SPINES: " + metrics.meanSpines +
                    " | PINCERS: " + metrics.meanPincers +
                    " | DAMPING: " + metrics.meanDamping.toFixed(1) + "%" +
                    " | FOULING: " + metrics.meanFouling.toFixed(1) + "%" +
                    " | DEFLECTIONS: " + metrics.deflections;
                valSPIStatusEl.style.color = metrics.meanSPI >= 50.0 ? "#e2e8f0" : "#94a3b8";
            }

            // 3. Primary Channel 86 Readout (% PDR)
            const valPDRIndexEl = document.getElementById("valPDRIndex");
            if (valPDRIndexEl) {
                valPDRIndexEl.textContent = metrics.meanPDR.toFixed(1) + "% PDR (" + metrics.pdrRegimeTitle + ")";
                if (metrics.meanPDR >= 85.0) {
                    valPDRIndexEl.style.color = "#ffe4e6";
                } else if (metrics.meanPDR >= 60.0) {
                    valPDRIndexEl.style.color = "#fda4af";
                } else if (metrics.meanPDR >= 30.0) {
                    valPDRIndexEl.style.color = "#fb7185";
                } else {
                    valPDRIndexEl.style.color = "#e11d48";
                }
            }

            // 4. Secondary Channel 86 Status
            const valPDRStatusEl = document.getElementById("valPDRStatus");
            if (valPDRStatusEl) {
                valPDRStatusEl.textContent =
                    "NEUROTOXIN: " + metrics.meanNeurotoxin.toFixed(1) + "/" + metrics.meanMaxNeuro.toFixed(1) +
                    " | INTACT SPINES: " + metrics.meanIntactSpines + "/" + metrics.meanSpines +
                    " | BROKEN: " + metrics.meanBrokenSpines +
                    " | REGEN: " + metrics.spineRegens +
                    " | VENOM INJECTIONS: " + metrics.venomInjections +
                    " | HYPOXIA: " + metrics.meanDermalImpairment.toFixed(1) + "%";
                valPDRStatusEl.style.color = metrics.meanPDR >= 50.0 ? "#fda4af" : "#f43f5e";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 85th Channel: % SPI
            if (!historyData.stereomProtectionIndex) {
                historyData.stereomProtectionIndex = new Array(74).fill(0);
            }
            const chartValSPI = Number.isFinite(metrics.meanSPI) ?
                Math.max(0, Math.min(100, metrics.meanSPI)) : 0;
            historyData.stereomProtectionIndex.shift();
            historyData.stereomProtectionIndex.push(chartValSPI);

            // 86th Channel: % PDR
            if (!historyData.pedicellariaeDeterrenceRatio) {
                historyData.pedicellariaeDeterrenceRatio = new Array(74).fill(0);
            }
            const chartValPDR = Number.isFinite(metrics.meanPDR) ?
                Math.max(0, Math.min(100, metrics.meanPDR)) : 0;
            historyData.pedicellariaeDeterrenceRatio.shift();
            historyData.pedicellariaeDeterrenceRatio.push(chartValPDR);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} pedicellariaeManager - Global EchinodermPedicellariaeManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, pedicellariaeManager, tick) {
            const metrics = PedicellariaeTelemetryManager.calculateMetrics(organisms, pedicellariaeManager, tick);
            PedicellariaeTelemetryManager.updateHUD(metrics);
            PedicellariaeTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.PedicellariaeTelemetryManager = PedicellariaeTelemetryManager;

})(typeof window !== "undefined" ? window : global);
