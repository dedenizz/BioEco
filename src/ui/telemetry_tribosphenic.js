// BioEcosystem - Early Cretaceous Eutherian Tribosphenic Molars & Chorioallantoic Placentation Telemetry Dashboard
// Module: src/ui/telemetry_tribosphenic.js
// Version: 8.89.0 (Hour 609 - Looks & UI Agent: 125th Channel % TMI, 126th Channel % CAI, Golden Topaz & Ruby Crimson Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TribosphenicTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 125th Telemetry Channel: Tribosphenic Molar Occlusion Index & Masticatory Crushing Efficiency (% TMI) - Golden Topaz Amber (#d97706)
     * - 126th Telemetry Channel: Chorioallantoic Placentation Index & Hemochorial Umbilical Transfer (% CAI) - Ruby Crimson (#be123c)
     * - 4 Biological Regimes for % TMI (TRICONODONT_SHEAR_ONLY, INCIPIENT_TALONID_SHELF, TRUE_TRIBOSPHENIC_OCCLUSION, MORTAR_PESTLE_MASTICATION)
     * - 4 Biological Regimes for % CAI (CHORIOVITELLINE_TRANSITIONAL, ALLANTOIC_VASCULAR_INVASION, TRUE_CHORIOALLANTOIC_PLACENTA, HEMOCHORIAL_EXTENDED_GESTATION)
     * - Real-time tracking of Protocone-Talonid fit, crushing torque, caloric extraction, enamel resilience,
     *   chorionic villi depth, hemochorial nutrient transfers, precocial births, and Cretaceous biomass.
     */
    class TribosphenicTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} tribosphenicManager - Global TribosphenicChorioallantoicManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Cretaceous Eutherian metrics.
         */
        static calculateMetrics(organisms, tribosphenicManager, tick) {
            let liveCount = 0;
            let triboCount = 0;
            let chorioCount = 0;

            let sumTMI = 0.0;
            let sumCAI = 0.0;
            let sumOccl = 0.0;
            let sumForce = 0.0;
            let sumExtract = 0.0;
            let sumEnamel = 0.0;
            let sumVilli = 0.0;
            let sumFlux = 0.0;
            let sumGestation = 0.0;
            let sumEnceph = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.hasTribosphenicMolars) {
                        triboCount++;
                        const tmi = org.tribosphenicMolarIndex !== undefined ? org.tribosphenicMolarIndex : 50.0;
                        const occl = org.tribosphenicOcclusionQuality !== undefined ? org.tribosphenicOcclusionQuality : 0.84;
                        const force = org.masticatoryCrushingForce !== undefined ? org.masticatoryCrushingForce : 285.0;
                        const extract = org.caloricExtractionEfficiency !== undefined ? org.caloricExtractionEfficiency : 0.85;
                        const enamel = org.enamelPrismResilience !== undefined ? org.enamelPrismResilience : 0.82;

                        sumTMI += tmi;
                        sumOccl += occl;
                        sumForce += force;
                        sumExtract += extract;
                        sumEnamel += enamel;
                        totalBiomass += (org.mass || 1.0) * 1.45;
                    }

                    if (org.hasChorioallantoicPlacenta) {
                        chorioCount++;
                        const cai = org.chorioallantoicPlacentaIndex !== undefined ? org.chorioallantoicPlacentaIndex : 50.0;
                        const villi = org.chorionicVilliPenetrationDepth !== undefined ? org.chorionicVilliPenetrationDepth : 0.86;
                        const flux = org.hemochorialNutrientFlux !== undefined ? org.hemochorialNutrientFlux : 0.88;
                        const gestation = org.gestationEnduranceTicks !== undefined ? org.gestationEnduranceTicks : 65.0;
                        const enceph = org.neonatalEncephalizationQuotient !== undefined ? org.neonatalEncephalizationQuotient : 0.85;

                        sumCAI += cai;
                        sumVilli += villi;
                        sumFlux += flux;
                        sumGestation += gestation;
                        sumEnceph += enceph;
                    }
                }
            }

            const managerMetrics = (tribosphenicManager && typeof tribosphenicManager.getMetrics === "function") ?
                tribosphenicManager.getMetrics() : {};

            const meanTMI = triboCount > 0 ? (sumTMI / triboCount) : (managerMetrics.meanTribosphenicMolarIndex || 0.0);
            const meanCAI = chorioCount > 0 ? (sumCAI / chorioCount) : (managerMetrics.meanChorioallantoicPlacentaIndex || 0.0);

            let tmiRegime = "TRICONODONT_SHEAR_ONLY";
            if (meanTMI >= 75.0) tmiRegime = "MORTAR_PESTLE_MASTICATION";
            else if (meanTMI >= 50.0) tmiRegime = "TRUE_TRIBOSPHENIC_OCCLUSION";
            else if (meanTMI >= 25.0) tmiRegime = "INCIPIENT_TALONID_SHELF";

            let caiRegime = "CHORIOVITELLINE_TRANSITIONAL";
            if (meanCAI >= 75.0) caiRegime = "HEMOCHORIAL_EXTENDED_GESTATION";
            else if (meanCAI >= 50.0) caiRegime = "TRUE_CHORIOALLANTOIC_PLACENTA";
            else if (meanCAI >= 25.0) caiRegime = "ALLANTOIC_VASCULAR_INVASION";

            return {
                liveCount: liveCount,
                triboCount: triboCount,
                chorioCount: chorioCount,
                triboPrevalence: liveCount > 0 ? (triboCount / liveCount) * 100.0 : 0.0,
                chorioPrevalence: liveCount > 0 ? (chorioCount / liveCount) * 100.0 : 0.0,
                meanTribosphenicMolarIndex: meanTMI,
                meanChorioallantoicPlacentaIndex: meanCAI,
                tmiRegime: tmiRegime,
                caiRegime: caiRegime,
                meanOcclusionQuality: triboCount > 0 ? (sumOccl / triboCount) : 0.84,
                meanCrushingForce: triboCount > 0 ? (sumForce / triboCount) : 285.0,
                meanCaloricExtraction: triboCount > 0 ? (sumExtract / triboCount) : 0.85,
                meanEnamelResilience: triboCount > 0 ? (sumEnamel / triboCount) : 0.82,
                meanVilliPenetrationDepth: chorioCount > 0 ? (sumVilli / chorioCount) : 0.86,
                meanHemochorialFlux: chorioCount > 0 ? (sumFlux / chorioCount) : 0.88,
                meanGestationEndurance: chorioCount > 0 ? (sumGestation / chorioCount) : 65.0,
                meanEncephalizationQuotient: chorioCount > 0 ? (sumEnceph / chorioCount) : 0.85,
                masticatoryCrushingEvents: managerMetrics.masticatoryCrushingEvents || 0,
                chorioallantoicNutrientTransfers: managerMetrics.chorioallantoicNutrientTransfers || 0,
                precocialBirthEvents: managerMetrics.precocialBirthEvents || 0,
                cumulativeCretaceousBiomass: managerMetrics.cumulativeCretaceousBiomass || totalBiomass
            };
        }

        /**
         * Update laboratory HUD elements in real time.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            // 1. 125th Channel (% TMI) Display
            const elTMIIndex = document.getElementById("valTMIIndex");
            const elTMIStatus = document.getElementById("valTMIStatus");

            if (elTMIIndex) {
                let regimeDesc = "TRICONODONT SHEAR ONLY & NO CRUSHING TALONID";
                let badgeClass = "tmi-badge tmi-triconodont";
                if (metrics.tmiRegime === "MORTAR_PESTLE_MASTICATION") {
                    regimeDesc = "MORTAR PESTLE MASTICATION & ADVANCED SEED/CHITIN CRUSH";
                    badgeClass = "tmi-badge tmi-mastication";
                } else if (metrics.tmiRegime === "TRUE_TRIBOSPHENIC_OCCLUSION") {
                    regimeDesc = "TRUE TRIBOSPHENIC OCCLUSION & DUAL SHEAR/CRUSH";
                    badgeClass = "tmi-badge tmi-tribosphenic";
                } else if (metrics.tmiRegime === "INCIPIENT_TALONID_SHELF") {
                    regimeDesc = "INCIPIENT TALONID SHELF & PARTIAL BASIN OCCLUSION";
                    badgeClass = "tmi-badge tmi-incipient";
                }
                elTMIIndex.textContent = metrics.meanTribosphenicMolarIndex.toFixed(1) + "% TMI (" + regimeDesc + ")";
                elTMIIndex.className = badgeClass;
            }

            if (elTMIStatus) {
                elTMIStatus.textContent = "TRIBOSPHENIC: " + metrics.triboCount + "/" + metrics.liveCount + " (" +
                    metrics.triboPrevalence.toFixed(0) + "%) | OCCLUSION: " + (metrics.meanOcclusionQuality * 100.0).toFixed(0) +
                    "% | CRUSH FORCE: " + metrics.meanCrushingForce.toFixed(0) + " N | CALORIC BOOST: " + (metrics.meanCaloricExtraction * 100.0).toFixed(0) +
                    "% | ENAMEL: " + (metrics.meanEnamelResilience * 100.0).toFixed(0) + "% | CRUSHES: " + metrics.masticatoryCrushingEvents;
            }

            // 2. 126th Channel (% CAI) Display
            const elCAIIndex = document.getElementById("valCAIIndex");
            const elCAIStatus = document.getElementById("valCAIStatus");

            if (elCAIIndex) {
                let regimeDesc = "CHORIOVITELLINE TRANSITIONAL & LOW ENCEPHALIZATION";
                let badgeClass = "cai-badge cai-choriovitelline";
                if (metrics.caiRegime === "HEMOCHORIAL_EXTENDED_GESTATION") {
                    regimeDesc = "HEMOCHORIAL EXTENDED GESTATION & PRECOCIAL YOUNG";
                    badgeClass = "cai-badge cai-hemochorial";
                } else if (metrics.caiRegime === "TRUE_CHORIOALLANTOIC_PLACENTA") {
                    regimeDesc = "TRUE CHORIOALLANTOIC PLACENTA & UMBILICAL BRUSH";
                    badgeClass = "cai-badge cai-placenta";
                } else if (metrics.caiRegime === "ALLANTOIC_VASCULAR_INVASION") {
                    regimeDesc = "ALLANTOIC VASCULAR INVASION & INITIAL VILLI";
                    badgeClass = "cai-badge cai-allantoic";
                }
                elCAIIndex.textContent = metrics.meanChorioallantoicPlacentaIndex.toFixed(1) + "% CAI (" + regimeDesc + ")";
                elCAIIndex.className = badgeClass;
            }

            if (elCAIStatus) {
                elCAIStatus.textContent = "CHORIOALLANTOIC: " + metrics.chorioCount + "/" + metrics.liveCount + " (" +
                    metrics.chorioPrevalence.toFixed(0) + "%) | VILLI DEPTH: " + (metrics.meanVilliPenetrationDepth * 100.0).toFixed(0) +
                    "% | HEMO FLUX: " + (metrics.meanHemochorialFlux * 100.0).toFixed(0) + "% | GESTATION: " + metrics.meanGestationEndurance.toFixed(0) +
                    " T | ENCEPHALIZATION: " + (metrics.meanEncephalizationQuotient * 100.0).toFixed(0) + "% | BIRTHS: " + metrics.precocialBirthEvents +
                    " | BIOMASS: " + metrics.cumulativeCretaceousBiomass.toFixed(1) + " mg";
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} tribosphenicManager - Global TribosphenicChorioallantoicManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, tribosphenicManager, tick) {
            const metrics = TribosphenicTelemetryManager.calculateMetrics(organisms, tribosphenicManager, tick);

            if (historyData) {
                if (historyData.tribosphenicMolarIndex && Array.isArray(historyData.tribosphenicMolarIndex)) {
                    historyData.tribosphenicMolarIndex[historyData.tribosphenicMolarIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanTribosphenicMolarIndex));
                }
                if (historyData.chorioallantoicPlacentaIndex && Array.isArray(historyData.chorioallantoicPlacentaIndex)) {
                    historyData.chorioallantoicPlacentaIndex[historyData.chorioallantoicPlacentaIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanChorioallantoicPlacentaIndex));
                }
            }

            if (tick % 4 === 0) {
                TribosphenicTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TribosphenicTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TribosphenicTelemetryManager = TribosphenicTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
