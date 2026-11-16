// BioEcosystem - Early Synapsids Vascular Sail & Heterodont Dentition Telemetry Dashboard
// Module: src/ui/telemetry_synapsid.js
// Version: 8.65.0 (Hour 585 - Looks & UI Agent: 117th Channel % TSI, 118th Channel % HDI, Solar Amber & Steel Silver Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SynapsidTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 117th Telemetry Channel: Thermal Sail Index & Vascular Heat Flux (% TSI) - Solar amber (#f59e0b)
     * - 118th Telemetry Channel: Heterodont Dentition Index & Carnassial/Molar Shear (% HDI) - Steel silver (#e0e7ff)
     * - 4 Biological Regimes for % TSI (SAILLESS_ECTOTHERM, INCIPIENT_SPINES, VASCULAR_SAIL_EXCHANGER, APEX_THERMOREGULATOR)
     * - 4 Biological Regimes for % HDI (HOMODONT_CONICAL, DIFFERENTIATED_CANINES, HETERODONT_SHEARER, MAMMALIAN_PRECURSOR_BITE)
     * - Real-time sail surface area, spine vascularization, core body temperature, canine piercing force, temporal bite pressure
     */
    class SynapsidTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Synapsid organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} sailDentitionManager - Global SynapsidSailDentitionManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Synapsid metrics.
         */
        static calculateMetrics(organisms, sailDentitionManager, tick) {
            let liveCount = 0;
            let synapsidCount = 0;

            let sumTSI = 0.0;
            let sumHDI = 0.0;
            let sumSailArea = 0.0;
            let sumVasc = 0.0;
            let sumSolar = 0.0;
            let sumCoreTemp = 0.0;
            let sumCanineForce = 0.0;
            let sumIncisorPrec = 0.0;
            let sumMolarShear = 0.0;
            let sumBitePress = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isSynapsid) {
                        synapsidCount++;

                        const tsi = org.thermalSailIndex !== undefined ? org.thermalSailIndex : 50.0;
                        const hdi = org.heterodontDentitionIndex !== undefined ? org.heterodontDentitionIndex : 50.0;
                        const sailArea = org.dorsalSailSurfaceArea !== undefined ? org.dorsalSailSurfaceArea : 2.2;
                        const vasc = org.neuralSpineVascularization !== undefined ? org.neuralSpineVascularization : 0.82;
                        const solar = org.solarThermalAbsorptionRate !== undefined ? org.solarThermalAbsorptionRate : 0.85;
                        const coreT = org.coreTemperature !== undefined ? org.coreTemperature : 33.5;
                        const canine = org.caninePiercingForce !== undefined ? org.caninePiercingForce : 1450.0;
                        const incisor = org.incisorStrippingPrecision !== undefined ? org.incisorStrippingPrecision : 0.80;
                        const molar = org.molarShearingEfficiency !== undefined ? org.molarShearingEfficiency : 0.78;
                        const press = org.synapsidBitePressure !== undefined ? org.synapsidBitePressure : 1650.0;

                        sumTSI += tsi;
                        sumHDI += hdi;
                        sumSailArea += sailArea;
                        sumVasc += vasc;
                        sumSolar += solar;
                        sumCoreTemp += coreT;
                        sumCanineForce += canine;
                        sumIncisorPrec += incisor;
                        sumMolarShear += molar;
                        sumBitePress += press;
                        totalBiomass += (org.mass || 1.0) * (org.isWarmedUp ? 1.4 : 1.0);
                    }
                }
            }

            const mgrMetrics = (sailDentitionManager && typeof sailDentitionManager.getMetrics === "function") ? sailDentitionManager.getMetrics() : {};

            const meanTSI = synapsidCount > 0 ? (sumTSI / synapsidCount) : (mgrMetrics.meanThermalSailIndex || 0.0);
            const meanHDI = synapsidCount > 0 ? (sumHDI / synapsidCount) : (mgrMetrics.meanHeterodontDentitionIndex || 0.0);
            const meanSailArea = synapsidCount > 0 ? (sumSailArea / synapsidCount) : (mgrMetrics.meanDorsalSailArea || 2.2);
            const meanVasc = synapsidCount > 0 ? (sumVasc / synapsidCount) : (mgrMetrics.meanNeuralSpineVascularization || 0.82);
            const meanSolar = synapsidCount > 0 ? (sumSolar / synapsidCount) : (mgrMetrics.meanSolarAbsorption || 0.85);
            const meanCoreTemp = synapsidCount > 0 ? (sumCoreTemp / synapsidCount) : (mgrMetrics.meanCoreTemperature || 33.5);
            const meanCanine = synapsidCount > 0 ? (sumCanineForce / synapsidCount) : (mgrMetrics.meanCaninePiercingForce || 1450.0);
            const meanIncisor = synapsidCount > 0 ? (sumIncisorPrec / synapsidCount) : (mgrMetrics.meanIncisorPrecision || 0.80);
            const meanMolar = synapsidCount > 0 ? (sumMolarShear / synapsidCount) : (mgrMetrics.meanMolarShearingEfficiency || 0.78);
            const meanPress = synapsidCount > 0 ? (sumBitePress / synapsidCount) : (mgrMetrics.meanTemporalBitePressure || 1650.0);

            let tsiRegime = "SAILLESS_ECTOTHERM";
            if (meanTSI >= 80.0) tsiRegime = "APEX_THERMOREGULATOR";
            else if (meanTSI >= 55.0) tsiRegime = "VASCULAR_SAIL_EXCHANGER";
            else if (meanTSI >= 30.0) tsiRegime = "INCIPIENT_SPINES";

            let hdiRegime = "HOMODONT_CONICAL";
            if (meanHDI >= 80.0) hdiRegime = "MAMMALIAN_PRECURSOR_BITE";
            else if (meanHDI >= 55.0) hdiRegime = "HETERODONT_SHEARER";
            else if (meanHDI >= 30.0) hdiRegime = "DIFFERENTIATED_CANINES";

            return {
                liveCount,
                synapsidCount,
                synapsidPrevalence: liveCount > 0 ? ((synapsidCount / liveCount) * 100.0) : 0.0,
                meanThermalSailIndex: meanTSI,
                meanHeterodontDentitionIndex: meanHDI,
                meanDorsalSailArea: meanSailArea,
                meanNeuralSpineVascularization: meanVasc,
                meanSolarAbsorption: meanSolar,
                meanCoreTemperature: meanCoreTemp,
                meanCaninePiercingForce: meanCanine,
                meanIncisorPrecision: meanIncisor,
                meanMolarShearingEfficiency: meanMolar,
                meanTemporalBitePressure: meanPress,
                tsiRegime,
                hdiRegime,
                morningThermalWarmupEvents: mgrMetrics.morningThermalWarmupEvents || 0,
                convectiveCoolingEvents: mgrMetrics.convectiveCoolingEvents || 0,
                caninePunctureStrikes: mgrMetrics.caninePunctureStrikes || 0,
                boneStrippingEvents: mgrMetrics.boneStrippingEvents || 0,
                cumulativeSynapsidBiomass: totalBiomass > 0 ? totalBiomass : (mgrMetrics.cumulativeSynapsidBiomass || 0.0)
            };
        }

        /**
         * Update DOM laboratory HUD stat elements with formatted Synapsid telemetry.
         * @param {Object} metrics - Computed Synapsid metrics.
         */
        static updateDOM(metrics) {
            if (!metrics || typeof document === "undefined") return;

            // 1. 117th Channel (% TSI) Display
            const elTSIIndex = document.getElementById("valTSIIndex");
            const elTSIStatus = document.getElementById("valTSIStatus");

            if (elTSIIndex) {
                let regimeDesc = "SAILLESS ECTOTHERMIC PARALYSIS & SEVERE DAWN STUPOR";
                let badgeClass = "tsi-badge tsi-sailless";
                if (metrics.tsiRegime === "APEX_THERMOREGULATOR") {
                    regimeDesc = "APEX THERMOREGULATOR & VASCULAR HEAT FLUX MASTERY";
                    badgeClass = "tsi-badge tsi-apex";
                } else if (metrics.tsiRegime === "VASCULAR_SAIL_EXCHANGER") {
                    regimeDesc = "VASCULAR SAIL EXCHANGER & SOLAR DAWN WARMUP";
                    badgeClass = "tsi-badge tsi-vascular";
                } else if (metrics.tsiRegime === "INCIPIENT_SPINES") {
                    regimeDesc = "INCIPIENT NEURAL SPINES & WEAK SOLAR CAPTURE";
                    badgeClass = "tsi-badge tsi-spines";
                }
                elTSIIndex.textContent = metrics.meanThermalSailIndex.toFixed(1) + "% TSI (" + regimeDesc + ")";
                elTSIIndex.className = badgeClass;
            }

            if (elTSIStatus) {
                elTSIStatus.textContent = "SYNAPSIDS: " + metrics.synapsidCount + "/" + metrics.liveCount + " (" + metrics.synapsidPrevalence.toFixed(0) + "%) | SAIL: " +
                    metrics.meanDorsalSailArea.toFixed(2) + " m2 | VASC: " + (metrics.meanNeuralSpineVascularization * 100.0).toFixed(0) + "% | CORE TEMP: " +
                    metrics.meanCoreTemperature.toFixed(1) + " C | SUN ABSORB: " + (metrics.meanSolarAbsorption * 100.0).toFixed(0) + "% | WARMUPS: " +
                    metrics.morningThermalWarmupEvents + " | COOLING: " + metrics.convectiveCoolingEvents;
            }

            // 2. 118th Channel (% HDI) Display
            const elHDIIndex = document.getElementById("valHDIIndex");
            const elHDIStatus = document.getElementById("valHDIStatus");

            if (elHDIIndex) {
                let regimeDesc = "HOMODONT CONICAL NEEDLES & WHOLE-PREY SWALLOW LIMIT";
                let badgeClass = "hdi-badge hdi-homodont";
                if (metrics.hdiRegime === "MAMMALIAN_PRECURSOR_BITE") {
                    regimeDesc = "MAMMALIAN PRECURSOR BITE & POWERFUL CARNASSIAL SHEAR";
                    badgeClass = "hdi-badge hdi-mammalian";
                } else if (metrics.hdiRegime === "HETERODONT_SHEARER") {
                    regimeDesc = "HETERODONT SHEARER & CANINE PIERCING CRUSH";
                    badgeClass = "hdi-badge hdi-shearer";
                } else if (metrics.hdiRegime === "DIFFERENTIATED_CANINES") {
                    regimeDesc = "DIFFERENTIATED CANINES & INCIPIENT TOOTH ROOTS";
                    badgeClass = "hdi-badge hdi-canines";
                }
                elHDIIndex.textContent = metrics.meanHeterodontDentitionIndex.toFixed(1) + "% HDI (" + regimeDesc + ")";
                elHDIIndex.className = badgeClass;
            }

            if (elHDIStatus) {
                elHDIStatus.textContent = "CANINE FORCE: " + metrics.meanCaninePiercingForce.toFixed(0) + " N | INCISORS: " +
                    (metrics.meanIncisorPrecision * 100.0).toFixed(0) + "% | SHEAR: " + (metrics.meanMolarShearingEfficiency * 100.0).toFixed(0) + "% | JAW PRESSURE: " +
                    metrics.meanTemporalBitePressure.toFixed(0) + " kPa | PUNCTURES: " + metrics.caninePunctureStrikes + " | BIOMASS: " +
                    metrics.cumulativeSynapsidBiomass.toFixed(1) + " mg";
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} sailDentitionManager - Global SynapsidSailDentitionManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, sailDentitionManager, tick) {
            const metrics = SynapsidTelemetryManager.calculateMetrics(organisms, sailDentitionManager, tick);

            if (historyData) {
                if (historyData.thermalSailIndex && Array.isArray(historyData.thermalSailIndex)) {
                    // Update latest value in circular buffer
                    historyData.thermalSailIndex[historyData.thermalSailIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanThermalSailIndex));
                }
                if (historyData.heterodontDentitionIndex && Array.isArray(historyData.heterodontDentitionIndex)) {
                    // Update latest value in circular buffer
                    historyData.heterodontDentitionIndex[historyData.heterodontDentitionIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanHeterodontDentitionIndex));
                }
            }

            if (tick % 4 === 0) {
                SynapsidTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SynapsidTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.SynapsidTelemetryManager = SynapsidTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
