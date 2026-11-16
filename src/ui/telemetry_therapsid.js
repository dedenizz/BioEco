// BioEcosystem - Advanced Therapsida Secondary Palate & Pre-Endothermic Metabolism Telemetry Dashboard
// Module: src/ui/telemetry_therapsid.js
// Version: 8.71.0 (Hour 591 - Looks & UI Agent: 119th Channel % SPI, 120th Channel % EMI, Sky Ice & Crimson Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TherapsidTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 119th Telemetry Channel: Secondary Palate Index & Continuous Respiration (% SPI) - Cyan / Sky Ice (#06b6d4)
     * - 120th Telemetry Channel: Endothermic Metabolic Index & Thermal Homeostasis (% EMI) - Crimson Rose / Thermal Core (#f43f5e)
     * - 4 Biological Regimes for % SPI (APALATAL_ORAL_SHARING, INCIPIENT_PALATAL_SHELVES, COMPLETE_BONY_PALATE, MAMMALIAN_RESPIRATORY_TURBINATES)
     * - 4 Biological Regimes for % EMI (ECTOTHERMIC_BRADYMETABOLIC, INCIPIENT_TACHYMETABOLIC, FACULTATIVE_MESOTHERMIC, TRUE_HOMEOTHERMIC_ENDOTHERM)
     * - Real-time continuous feeding breaths, maxilloturbinate moisture reclamation, basal metabolic heat, nocturnal strikes
     */
    class TherapsidTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Therapsid organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} therapsidManager - Global TherapsidPalateMetabolismManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Therapsid metrics.
         */
        static calculateMetrics(organisms, therapsidManager, tick) {
            let liveCount = 0;
            let therapsidCount = 0;

            let sumSPI = 0.0;
            let sumEMI = 0.0;
            let sumPalateFusion = 0.0;
            let sumContBreath = 0.0;
            let sumTurbinate = 0.0;
            let sumHeat = 0.0;
            let sumVibrissae = 0.0;
            let sumEndurance = 0.0;
            let sumNocturnal = 0.0;
            let sumCoreT = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isTherapsid) {
                        therapsidCount++;

                        const spi = org.secondaryPalateIndex !== undefined ? org.secondaryPalateIndex : 50.0;
                        const emi = org.endothermicMetabolicIndex !== undefined ? org.endothermicMetabolicIndex : 50.0;
                        const fusion = org.palatalShelfFusionDegree !== undefined ? org.palatalShelfFusionDegree : 0.82;
                        const contBr = org.continuousBreathingEfficiency !== undefined ? org.continuousBreathingEfficiency : 0.85;
                        const turb = org.respiratoryMoistureReclamation !== undefined ? org.respiratoryMoistureReclamation : 0.82;
                        const heat = org.basalMetabolicHeatFlux !== undefined ? org.basalMetabolicHeatFlux : 1.85;
                        const vib = org.vibrissaeInsulationDensity !== undefined ? org.vibrissaeInsulationDensity : 0.78;
                        const endur = org.aerobicEnduranceMultiplier !== undefined ? org.aerobicEnduranceMultiplier : 2.4;
                        const noct = org.nocturnalActivityIndex !== undefined ? org.nocturnalActivityIndex : 0.80;
                        const coreT = org.therapsidCoreTemp !== undefined ? org.therapsidCoreTemp : 35.5;

                        sumSPI += spi;
                        sumEMI += emi;
                        sumPalateFusion += fusion;
                        sumContBreath += contBr;
                        sumTurbinate += turb;
                        sumHeat += heat;
                        sumVibrissae += vib;
                        sumEndurance += endur;
                        sumNocturnal += noct;
                        sumCoreT += coreT;
                        totalBiomass += (org.mass || 1.0) * (org.isEndothermicWarm ? 1.5 : 1.0);
                    }
                }
            }

            const mgrMetrics = (therapsidManager && typeof therapsidManager.getMetrics === "function") ? therapsidManager.getMetrics() : {};

            const meanSPI = therapsidCount > 0 ? (sumSPI / therapsidCount) : (mgrMetrics.meanSecondaryPalateIndex || 0.0);
            const meanEMI = therapsidCount > 0 ? (sumEMI / therapsidCount) : (mgrMetrics.meanEndothermicMetabolicIndex || 0.0);
            const meanFusion = therapsidCount > 0 ? (sumPalateFusion / therapsidCount) : (mgrMetrics.meanPalatalFusionDegree || 0.82);
            const meanContBreath = therapsidCount > 0 ? (sumContBreath / therapsidCount) : (mgrMetrics.meanContinuousBreathingEfficiency || 0.85);
            const meanTurb = therapsidCount > 0 ? (sumTurbinate / therapsidCount) : (mgrMetrics.meanTurbinateReclamation || 0.82);
            const meanHeat = therapsidCount > 0 ? (sumHeat / therapsidCount) : (mgrMetrics.meanBasalMetabolicHeat || 1.85);
            const meanVib = therapsidCount > 0 ? (sumVibrissae / therapsidCount) : (mgrMetrics.meanVibrissaeInsulation || 0.78);
            const meanEndur = therapsidCount > 0 ? (sumEndurance / therapsidCount) : (mgrMetrics.meanParasagittalEndurance || 2.4);
            const meanNoct = therapsidCount > 0 ? (sumNocturnal / therapsidCount) : (mgrMetrics.meanNocturnalActivity || 0.80);
            const meanCoreT = therapsidCount > 0 ? (sumCoreT / therapsidCount) : (mgrMetrics.meanTherapsidCoreTemperature || 35.5);

            let spiRegime = "APALATAL_ORAL_SHARING";
            if (meanSPI >= 80.0) spiRegime = "MAMMALIAN_RESPIRATORY_TURBINATES";
            else if (meanSPI >= 55.0) spiRegime = "COMPLETE_BONY_PALATE";
            else if (meanSPI >= 30.0) spiRegime = "INCIPIENT_PALATAL_SHELVES";

            let emiRegime = "ECTOTHERMIC_BRADYMETABOLIC";
            if (meanEMI >= 80.0) emiRegime = "TRUE_HOMEOTHERMIC_ENDOTHERM";
            else if (meanEMI >= 55.0) emiRegime = "FACULTATIVE_MESOTHERMIC";
            else if (meanEMI >= 30.0) emiRegime = "INCIPIENT_TACHYMETABOLIC";

            return {
                liveCount,
                therapsidCount,
                therapsidPrevalence: liveCount > 0 ? ((therapsidCount / liveCount) * 100.0) : 0.0,
                meanSecondaryPalateIndex: meanSPI,
                meanEndothermicMetabolicIndex: meanEMI,
                meanPalatalFusionDegree: meanFusion,
                meanContinuousBreathingEfficiency: meanContBreath,
                meanTurbinateReclamation: meanTurb,
                meanBasalMetabolicHeat: meanHeat,
                meanVibrissaeInsulation: meanVib,
                meanParasagittalEndurance: meanEndur,
                meanNocturnalActivity: meanNoct,
                meanTherapsidCoreTemperature: meanCoreT,
                spiRegime,
                emiRegime,
                continuousBreathingFeedEvents: mgrMetrics.continuousBreathingFeedEvents || 0,
                turbinateMoistureReclaimedUnits: mgrMetrics.turbinateMoistureReclaimedUnits || 0.0,
                nocturnalPredationStrikes: mgrMetrics.nocturnalPredationStrikes || 0,
                parasagittalGallopEvents: mgrMetrics.parasagittalGallopEvents || 0,
                cumulativeTherapsidBiomass: totalBiomass > 0 ? totalBiomass : (mgrMetrics.cumulativeTherapsidBiomass || 0.0)
            };
        }

        /**
         * Update DOM laboratory HUD stat elements with formatted Therapsid telemetry.
         * @param {Object} metrics - Computed Therapsid metrics.
         */
        static updateDOM(metrics) {
            if (!metrics || typeof document === "undefined") return;

            // 1. 119th Channel (% SPI) Display
            const elSPIIndex = document.getElementById("valSecPalIndex");
            const elSPIStatus = document.getElementById("valSecPalStatus");

            if (elSPIIndex) {
                let regimeDesc = "APALATAL ORAL SHARING & CRITICAL APNEA FEEDING STOPPAGE";
                let badgeClass = "spi-badge spi-apalatal";
                if (metrics.spiRegime === "MAMMALIAN_RESPIRATORY_TURBINATES") {
                    regimeDesc = "MAMMALIAN RESPIRATORY TURBINATES & CONTINUOUS BREATHING";
                    badgeClass = "spi-badge spi-turbinates";
                } else if (metrics.spiRegime === "COMPLETE_BONY_PALATE") {
                    regimeDesc = "COMPLETE BONY PALATE & UNINTERRUPTED MASTICATION";
                    badgeClass = "spi-badge spi-complete";
                } else if (metrics.spiRegime === "INCIPIENT_PALATAL_SHELVES") {
                    regimeDesc = "INCIPIENT PALATAL SHELVES & PARTIAL AIRWAY PARTITION";
                    badgeClass = "spi-badge spi-incipient";
                }
                elSPIIndex.textContent = metrics.meanSecondaryPalateIndex.toFixed(1) + "% SPI (" + regimeDesc + ")";
                elSPIIndex.className = badgeClass;
            }

            if (elSPIStatus) {
                elSPIStatus.textContent = "THERAPSIDS: " + metrics.therapsidCount + "/" + metrics.liveCount + " (" + metrics.therapsidPrevalence.toFixed(0) + "%) | PALATE FUSION: " +
                    (metrics.meanPalatalFusionDegree * 100.0).toFixed(0) + "% | CONTINUOUS BREATH: " + (metrics.meanContinuousBreathingEfficiency * 100.0).toFixed(0) + "% | TURBINATE RECLAIM: " +
                    (metrics.meanTurbinateReclamation * 100.0).toFixed(0) + "% | FEED BREATHS: " + metrics.continuousBreathingFeedEvents + " | MOISTURE SAVED: " +
                    metrics.turbinateMoistureReclaimedUnits.toFixed(1) + " U";
            }

            // 2. 120th Channel (% EMI) Display
            const elEMIIndex = document.getElementById("valEMIIndex");
            const elEMIStatus = document.getElementById("valEMIStatus");

            if (elEMIIndex) {
                let regimeDesc = "ECTOTHERMIC BRADYMETABOLIC & TOTAL SOLAR DEPENDENCE";
                let badgeClass = "emi-badge emi-bradymetabolic";
                if (metrics.emiRegime === "TRUE_HOMEOTHERMIC_ENDOTHERM") {
                    regimeDesc = "TRUE HOMEOTHERMIC ENDOTHERM & HIGH AEROBIC STAMINA";
                    badgeClass = "emi-badge emi-homeothermic";
                } else if (metrics.emiRegime === "FACULTATIVE_MESOTHERMIC") {
                    regimeDesc = "FACULTATIVE MESOTHERMIC & BASAL VISCERAL THERMOGENESIS";
                    badgeClass = "emi-badge emi-mesothermic";
                } else if (metrics.emiRegime === "INCIPIENT_TACHYMETABOLIC") {
                    regimeDesc = "INCIPIENT TACHYMETABOLIC & VIBRISSAE THERMAL INSULATION";
                    badgeClass = "emi-badge emi-tachymetabolic";
                }
                elEMIIndex.textContent = metrics.meanEndothermicMetabolicIndex.toFixed(1) + "% EMI (" + regimeDesc + ")";
                elEMIIndex.className = badgeClass;
            }

            if (elEMIStatus) {
                elEMIStatus.textContent = "BASAL HEAT: " + metrics.meanBasalMetabolicHeat.toFixed(2) + "x | CORE TEMP: " +
                    metrics.meanTherapsidCoreTemperature.toFixed(1) + " C | WHISKER INSULATION: " + (metrics.meanVibrissaeInsulation * 100.0).toFixed(0) + "% | ENDURANCE: " +
                    metrics.meanParasagittalEndurance.toFixed(2) + "x | NOCTURNAL: " + (metrics.meanNocturnalActivity * 100.0).toFixed(0) + "% | STRIKES: " +
                    metrics.nocturnalPredationStrikes + " | BIOMASS: " + metrics.cumulativeTherapsidBiomass.toFixed(1) + " mg";
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} therapsidManager - Global TherapsidPalateMetabolismManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, therapsidManager, tick) {
            const metrics = TherapsidTelemetryManager.calculateMetrics(organisms, therapsidManager, tick);

            if (historyData) {
                if (historyData.secondaryPalateIndex && Array.isArray(historyData.secondaryPalateIndex)) {
                    historyData.secondaryPalateIndex[historyData.secondaryPalateIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanSecondaryPalateIndex));
                }
                if (historyData.endothermicMetabolicIndex && Array.isArray(historyData.endothermicMetabolicIndex)) {
                    historyData.endothermicMetabolicIndex[historyData.endothermicMetabolicIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanEndothermicMetabolicIndex));
                }
            }

            if (tick % 4 === 0) {
                TherapsidTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TherapsidTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TherapsidTelemetryManager = TherapsidTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
