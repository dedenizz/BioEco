// BioEcosystem - Early Mammaliaformes Ear Ossicles & Proto-Lactation Telemetry Dashboard
// Module: src/ui/telemetry_mammaliaform.js
// Version: 8.77.0 (Hour 597 - Looks & UI Agent: 121st Channel % MEI, 122nd Channel % LAI, Amethyst & Pearl Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MammaliaformTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 121st Telemetry Channel: Mammaliaform Ear Index & High-Frequency Acoustic Acuity (% MEI) - Amethyst Purple (#8b5cf6)
     * - 122nd Telemetry Channel: Lactation, Milk Secretion & Juvenile Nursing Index (% LAI) - Pearl Custard Yellow (#fef08a)
     * - 4 Biological Regimes for % MEI (QUADRATE_ARTICULAR_JAW_HEARING, TRANSITIONAL_DOUBLE_JOINT, DETACHED_MAMMALIAN_MIDDLE_EAR, HIGH_FREQUENCY_COCHLEAR_RESONANCE)
     * - 4 Biological Regimes for % LAI (ALACTIC_OVO_INDEPENDENCE, INCIPIENT_APOCRINE_SEEPAGE, AREOLAR_MILK_PATCH_NURSING, SPECIALIZED_MAMMARY_PROVISIONING)
     * - Real-time monitoring of Dentary-Squamosal fusion, masseter bite torque, ossicular lever gain, high-frequency cochlear acuity, milk secretion flux, juvenile survival boosts
     */
    class MammaliaformTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Mammaliaform organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} mammaliaformManager - Global MammaliaformEarLactationManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Mammaliaform metrics.
         */
        static calculateMetrics(organisms, mammaliaformManager, tick) {
            let liveCount = 0;
            let mammaliaformCount = 0;

            let sumMEI = 0.0;
            let sumLAI = 0.0;
            let sumDentaryFusion = 0.0;
            let sumBiteTorque = 0.0;
            let sumOssicularInteg = 0.0;
            let sumAcousticGain = 0.0;
            let sumHighFreqAcuity = 0.0;
            let sumLactationFlux = 0.0;
            let sumSurvivalMult = 0.0;
            let sumMaternalBond = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isMammaliaform) {
                        mammaliaformCount++;

                        const mei = org.mammaliaformEarIndex !== undefined ? org.mammaliaformEarIndex : 50.0;
                        const lai = org.lactationIndex !== undefined ? org.lactationIndex : 50.0;
                        const fusion = org.dentarySquamosalFusionDegree !== undefined ? org.dentarySquamosalFusionDegree : 0.85;
                        const torque = org.masticatoryBiteTorque !== undefined ? org.masticatoryBiteTorque : 3.2;
                        const ossicles = org.ossicularChainIntegration !== undefined ? org.ossicularChainIntegration : 0.86;
                        const gain = org.acousticPressureGain !== undefined ? org.acousticPressureGain : 22.0;
                        const acuity = org.highFrequencyAuditoryAcuity !== undefined ? org.highFrequencyAuditoryAcuity : 0.88;
                        const flux = org.protoLactationSecretionFlux !== undefined ? org.protoLactationSecretionFlux : 0.80;
                        const survMult = org.juvenileSurvivalMultiplier !== undefined ? org.juvenileSurvivalMultiplier : 3.1;
                        const bond = org.maternalNestBonding !== undefined ? org.maternalNestBonding : 0.82;

                        sumMEI += mei;
                        sumLAI += lai;
                        sumDentaryFusion += fusion;
                        sumBiteTorque += torque;
                        sumOssicularInteg += ossicles;
                        sumAcousticGain += gain;
                        sumHighFreqAcuity += acuity;
                        sumLactationFlux += flux;
                        sumSurvivalMult += survMult;
                        sumMaternalBond += bond;

                        totalBiomass += (org.mass || 1.0) * 1.25;
                    }
                }
            }

            const meanMEI = mammaliaformCount > 0 ? (sumMEI / mammaliaformCount) : 0.0;
            const meanLAI = mammaliaformCount > 0 ? (sumLAI / mammaliaformCount) : 0.0;

            // Classify 121st Channel Regime (% MEI)
            let meiRegime = "QUADRATE_ARTICULAR_JAW_HEARING";
            if (meanMEI >= 85.0) {
                meiRegime = "HIGH_FREQUENCY_COCHLEAR_RESONANCE";
            } else if (meanMEI >= 65.0) {
                meiRegime = "DETACHED_MAMMALIAN_MIDDLE_EAR";
            } else if (meanMEI >= 35.0) {
                meiRegime = "TRANSITIONAL_DOUBLE_JOINT";
            }

            // Classify 122nd Channel Regime (% LAI)
            let laiRegime = "ALACTIC_OVO_INDEPENDENCE";
            if (meanLAI >= 85.0) {
                laiRegime = "SPECIALIZED_MAMMARY_PROVISIONING";
            } else if (meanLAI >= 60.0) {
                laiRegime = "AREOLAR_MILK_PATCH_NURSING";
            } else if (meanLAI >= 30.0) {
                laiRegime = "INCIPIENT_APOCRINE_SEEPAGE";
            }

            const managerMetrics = (mammaliaformManager && typeof mammaliaformManager.getMetrics === "function") ?
                mammaliaformManager.getMetrics() : {};

            return {
                liveCount: liveCount,
                mammaliaformCount: mammaliaformCount,
                mammaliaformPrevalence: liveCount > 0 ? (mammaliaformCount / liveCount) * 100.0 : 0.0,
                meanMammaliaformEarIndex: meanMEI,
                meanLactationIndex: meanLAI,
                meiRegime: meiRegime,
                laiRegime: laiRegime,
                meanDentarySquamosalFusion: mammaliaformCount > 0 ? (sumDentaryFusion / mammaliaformCount) : 0.85,
                meanMasticatoryBiteTorque: mammaliaformCount > 0 ? (sumBiteTorque / mammaliaformCount) : 3.2,
                meanOssicularIntegration: mammaliaformCount > 0 ? (sumOssicularInteg / mammaliaformCount) : 0.86,
                meanAcousticPressureGain: mammaliaformCount > 0 ? (sumAcousticGain / mammaliaformCount) : 22.0,
                meanHighFrequencyAcuity: mammaliaformCount > 0 ? (sumHighFreqAcuity / mammaliaformCount) : 0.88,
                meanLactationSecretionFlux: mammaliaformCount > 0 ? (sumLactationFlux / mammaliaformCount) : 0.80,
                meanJuvenileSurvivalMultiplier: mammaliaformCount > 0 ? (sumSurvivalMult / mammaliaformCount) : 3.1,
                meanMaternalNestBonding: mammaliaformCount > 0 ? (sumMaternalBond / mammaliaformCount) : 0.82,
                chitinBreachCrushEvents: managerMetrics.chitinBreachCrushEvents || 0,
                ultrasonicEchoRadarDetections: managerMetrics.ultrasonicEchoRadarDetections || 0,
                milkPatchNursingEvents: managerMetrics.milkPatchNursingEvents || 0,
                cumulativeNursedBiomass: managerMetrics.cumulativeNursedBiomass || totalBiomass
            };
        }

        /**
         * Update laboratory HUD elements in real time.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            // 1. 121st Channel (% MEI) Display
            const elMEIIndex = document.getElementById("valMEIIndex");
            const elMEIStatus = document.getElementById("valMEIStatus");

            if (elMEIIndex) {
                let regimeDesc = "QUADRATE ARTICULAR JAW HEARING & SEVERE CHEWING DEAFNESS";
                let badgeClass = "mei-badge mei-quadrate";
                if (metrics.meiRegime === "HIGH_FREQUENCY_COCHLEAR_RESONANCE") {
                    regimeDesc = "HIGH FREQUENCY COCHLEAR RESONANCE & 60 KHZ RADAR";
                    badgeClass = "mei-badge mei-resonance";
                } else if (metrics.meiRegime === "DETACHED_MAMMALIAN_MIDDLE_EAR") {
                    regimeDesc = "DETACHED MAMMALIAN MIDDLE EAR & 3-OSSICLE CHAIN";
                    badgeClass = "mei-badge mei-detached";
                } else if (metrics.meiRegime === "TRANSITIONAL_DOUBLE_JOINT") {
                    regimeDesc = "TRANSITIONAL DOUBLE JOINT & PARTIAL BONE ISOLATION";
                    badgeClass = "mei-badge mei-transitional";
                }
                elMEIIndex.textContent = metrics.meanMammaliaformEarIndex.toFixed(1) + "% MEI (" + regimeDesc + ")";
                elMEIIndex.className = badgeClass;
            }

            if (elMEIStatus) {
                elMEIStatus.textContent = "MAMMALIAFORMS: " + metrics.mammaliaformCount + "/" + metrics.liveCount + " (" + metrics.mammaliaformPrevalence.toFixed(0) + "%) | DENTARY FUSION: " +
                    (metrics.meanDentarySquamosalFusion * 100.0).toFixed(0) + "% | TORQUE: " + metrics.meanMasticatoryBiteTorque.toFixed(1) + "x | OSSICLES: " +
                    (metrics.meanOssicularIntegration * 100.0).toFixed(0) + "% | ACOUSTIC GAIN: " + metrics.meanAcousticPressureGain.toFixed(1) + "x | RADAR PULSES: " +
                    metrics.ultrasonicEchoRadarDetections;
            }

            // 2. 122nd Channel (% LAI) Display
            const elLAIIndex = document.getElementById("valLAIIndex");
            const elLAIStatus = document.getElementById("valLAIStatus");

            if (elLAIIndex) {
                let regimeDesc = "ALACTIC OVO INDEPENDENCE & EXTREME POST-HATCH MORTALITY";
                let badgeClass = "lai-badge lai-alactic";
                if (metrics.laiRegime === "SPECIALIZED_MAMMARY_PROVISIONING") {
                    regimeDesc = "SPECIALIZED MAMMARY PROVISIONING & EXTENDED JUVENILE CARE";
                    badgeClass = "lai-badge lai-specialized";
                } else if (metrics.laiRegime === "AREOLAR_MILK_PATCH_NURSING") {
                    regimeDesc = "AREOLAR MILK PATCH NURSING & ENHANCED HATCHLING SURVIVAL";
                    badgeClass = "lai-badge lai-areolar";
                } else if (metrics.laiRegime === "INCIPIENT_APOCRINE_SEEPAGE") {
                    regimeDesc = "INCIPIENT APOCRINE SEEPAGE & CUTANEOUS NUTRIENT FLUID";
                    badgeClass = "lai-badge lai-incipient";
                }
                elLAIIndex.textContent = metrics.meanLactationIndex.toFixed(1) + "% LAI (" + regimeDesc + ")";
                elLAIIndex.className = badgeClass;
            }

            if (elLAIStatus) {
                elLAIStatus.textContent = "LACTATION FLUX: " + (metrics.meanLactationSecretionFlux * 100.0).toFixed(0) + "% | SURVIVAL BOOST: " +
                    metrics.meanJuvenileSurvivalMultiplier.toFixed(1) + "x | NEST BOND: " + (metrics.meanMaternalNestBonding * 100.0).toFixed(0) + "% | NURSINGS: " +
                    metrics.milkPatchNursingEvents + " | MILK BIOMASS: " + metrics.cumulativeNursedBiomass.toFixed(1) + " mg";
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} mammaliaformManager - Global MammaliaformEarLactationManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, mammaliaformManager, tick) {
            const metrics = MammaliaformTelemetryManager.calculateMetrics(organisms, mammaliaformManager, tick);

            if (historyData) {
                if (historyData.mammaliaformEarIndex && Array.isArray(historyData.mammaliaformEarIndex)) {
                    historyData.mammaliaformEarIndex[historyData.mammaliaformEarIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanMammaliaformEarIndex));
                }
                if (historyData.lactationIndex && Array.isArray(historyData.lactationIndex)) {
                    historyData.lactationIndex[historyData.lactationIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanLactationIndex));
                }
            }

            if (tick % 4 === 0) {
                MammaliaformTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MammaliaformTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.MammaliaformTelemetryManager = MammaliaformTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
