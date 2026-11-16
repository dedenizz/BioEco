// BioEcosystem - Early Monotremata & Therian Evolutionary Divergence Telemetry Dashboard
// Module: src/ui/telemetry_therian.js
// Version: 8.83.0 (Hour 603 - Looks & UI Agent: 123rd Channel % MPI, 124th Channel % CPI, Terracotta & Ruby Badges, HUD & Lotka-Volterra Buffer Integration)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TherianTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 123rd Telemetry Channel: Marsupium Pouch Index & Altricial Neonate Nipple-Latching (% MPI) - Terracotta Amber (#ea580c)
     * - 124th Telemetry Channel: Choriovitelline Placenta Index & Trophoblast Exchange (% CPI) - Ruby Fuchsia (#e11d48)
     * - 4 Biological Regimes for % MPI (CLOACAL_OVIPARITY_ABSENCE, INCIPIENT_ABDOMINAL_CREASE, TRUE_MARSUPIUM_POUCH, SPECIALIZED_NEONATE_LATCHING)
     * - 4 Biological Regimes for % CPI (APLACENTAL_YOLK_SAC_ONLY, INCIPIENT_TROPHOBLAST_ADHESION, CHORIOVITELLINE_PLACENTATION, CHORIOALLANTOIC_ADVANCED_TRANSFER)
     * - Real-time tracking of monotreme crural venom spurs, electroreceptive bill detections, marsupium pouch climbing events, placental trophoblast transfers, therian biomass
     */
    class TherianTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live Monotremes, Metatherians, and Eutherians.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} divergenceManager - Global MonotremeTherianDivergenceManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Monotreme/Therian metrics.
         */
        static calculateMetrics(organisms, divergenceManager, tick) {
            let liveCount = 0;
            let monotremeCount = 0;
            let metatherianCount = 0;
            let eutherianCount = 0;

            let sumMPI = 0.0;
            let sumCPI = 0.0;
            let sumPouchInteg = 0.0;
            let sumClimb = 0.0;
            let sumLatch = 0.0;
            let sumSave = 0.0;
            let sumPlacentaDense = 0.0;
            let sumTrophoFlux = 0.0;
            let sumPrecocial = 0.0;
            let sumPlacVasc = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isMonotreme) {
                        monotremeCount++;
                        totalBiomass += (org.mass || 1.0) * 1.20;
                    } else if (org.isMetatherian) {
                        metatherianCount++;

                        const mpi = org.marsupiumPouchIndex !== undefined ? org.marsupiumPouchIndex : 50.0;
                        const pouchInteg = org.marsupiumPouchIntegrity !== undefined ? org.marsupiumPouchIntegrity : 0.85;
                        const climb = org.altricialNeonateClimbingRate !== undefined ? org.altricialNeonateClimbingRate : 0.82;
                        const latch = org.nippleLatchingEfficiency !== undefined ? org.nippleLatchingEfficiency : 0.86;
                        const save = org.maternalGestationEnergySaving !== undefined ? org.maternalGestationEnergySaving : 0.80;

                        sumMPI += mpi;
                        sumPouchInteg += pouchInteg;
                        sumClimb += climb;
                        sumLatch += latch;
                        sumSave += save;

                        totalBiomass += (org.mass || 1.0) * 1.35;
                    } else if (org.isEutherian) {
                        eutherianCount++;

                        const cpi = org.choriovitellinePlacentaIndex !== undefined ? org.choriovitellinePlacentaIndex : 50.0;
                        const dens = org.choriovitellinePlacentaDensity !== undefined ? org.choriovitellinePlacentaDensity : 0.85;
                        const flux = org.trophoblastNutrientFlux !== undefined ? org.trophoblastNutrientFlux : 0.88;
                        const mat = org.precocialNeonateMaturity !== undefined ? org.precocialNeonateMaturity : 0.84;
                        const vasc = org.placentalVascularization !== undefined ? org.placentalVascularization : 0.82;

                        sumCPI += cpi;
                        sumPlacentaDense += dens;
                        sumTrophoFlux += flux;
                        sumPrecocial += mat;
                        sumPlacVasc += vasc;

                        totalBiomass += (org.mass || 1.0) * 1.40;
                    }
                }
            }

            const meanMPI = metatherianCount > 0 ? (sumMPI / metatherianCount) : 0.0;
            const meanCPI = eutherianCount > 0 ? (sumCPI / eutherianCount) : 0.0;

            // Classify 123rd Channel Regime (% MPI)
            let mpiRegime = "CLOACAL_OVIPARITY_ABSENCE";
            if (meanMPI >= 85.0) {
                mpiRegime = "SPECIALIZED_NEONATE_LATCHING";
            } else if (meanMPI >= 60.0) {
                mpiRegime = "TRUE_MARSUPIUM_POUCH";
            } else if (meanMPI >= 30.0) {
                mpiRegime = "INCIPIENT_ABDOMINAL_CREASE";
            }

            // Classify 124th Channel Regime (% CPI)
            let cpiRegime = "APLACENTAL_YOLK_SAC_ONLY";
            if (meanCPI >= 85.0) {
                cpiRegime = "CHORIOALLANTOIC_ADVANCED_TRANSFER";
            } else if (meanCPI >= 60.0) {
                cpiRegime = "CHORIOVITELLINE_PLACENTATION";
            } else if (meanCPI >= 30.0) {
                cpiRegime = "INCIPIENT_TROPHOBLAST_ADHESION";
            }

            const managerMetrics = (divergenceManager && typeof divergenceManager.getMetrics === "function") ?
                divergenceManager.getMetrics() : {};

            return {
                liveCount: liveCount,
                monotremeCount: monotremeCount,
                metatherianCount: metatherianCount,
                eutherianCount: eutherianCount,
                totalTherians: metatherianCount + eutherianCount,
                therianPrevalence: liveCount > 0 ? ((metatherianCount + eutherianCount) / liveCount) * 100.0 : 0.0,
                meanMarsupiumPouchIndex: meanMPI,
                meanChoriovitellinePlacentaIndex: meanCPI,
                mpiRegime: mpiRegime,
                cpiRegime: cpiRegime,
                meanMarsupiumPouchIntegrity: metatherianCount > 0 ? (sumPouchInteg / metatherianCount) : 0.85,
                meanAltricialClimbingRate: metatherianCount > 0 ? (sumClimb / metatherianCount) : 0.82,
                meanNippleLatchingEfficiency: metatherianCount > 0 ? (sumLatch / metatherianCount) : 0.86,
                meanChoriovitellineDensity: eutherianCount > 0 ? (sumPlacentaDense / eutherianCount) : 0.85,
                meanTrophoblastNutrientFlux: eutherianCount > 0 ? (sumTrophoFlux / eutherianCount) : 0.88,
                meanPrecocialMaturity: eutherianCount > 0 ? (sumPrecocial / eutherianCount) : 0.84,
                venomSpurStrikeEvents: managerMetrics.venomSpurStrikeEvents || 0,
                electroreceptionDetections: managerMetrics.electroreceptionDetections || 0,
                marsupiumClimbingEvents: managerMetrics.marsupiumClimbingEvents || 0,
                placentalNutrientTransfers: managerMetrics.placentalNutrientTransfers || 0,
                cumulativeTherianBiomass: managerMetrics.cumulativeTherianBiomass || totalBiomass
            };
        }

        /**
         * Update laboratory HUD elements in real time.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            // 1. 123rd Channel (% MPI) Display
            const elMPIIndex = document.getElementById("valMPIIndex");
            const elMPIStatus = document.getElementById("valMPIStatus");

            if (elMPIIndex) {
                let regimeDesc = "CLOACAL OVIPARITY ABSENCE & NO POUCH NURTURING";
                let badgeClass = "mpi-badge mpi-cloacal";
                if (metrics.mpiRegime === "SPECIALIZED_NEONATE_LATCHING") {
                    regimeDesc = "SPECIALIZED NEONATE LATCHING & SUSTAINED POUCH GROWTH";
                    badgeClass = "mpi-badge mpi-latching";
                } else if (metrics.mpiRegime === "TRUE_MARSUPIUM_POUCH") {
                    regimeDesc = "TRUE MARSUPIUM POUCH & DIRECT NIPPLE SUCKLING";
                    badgeClass = "mpi-badge mpi-pouch";
                } else if (metrics.mpiRegime === "INCIPIENT_ABDOMINAL_CREASE") {
                    regimeDesc = "INCIPIENT ABDOMINAL CREASE & EMBRYONIC PROTECTION";
                    badgeClass = "mpi-badge mpi-incipient";
                }
                elMPIIndex.textContent = metrics.meanMarsupiumPouchIndex.toFixed(1) + "% MPI (" + regimeDesc + ")";
                elMPIIndex.className = badgeClass;
            }

            if (elMPIStatus) {
                elMPIStatus.textContent = "METATHERIANS: " + metrics.metatherianCount + "/" + metrics.liveCount + " | POUCH INTEGRITY: " +
                    (metrics.meanMarsupiumPouchIntegrity * 100.0).toFixed(0) + "% | CLIMB RATE: " + (metrics.meanAltricialClimbingRate * 100.0).toFixed(0) +
                    "% | NIPPLE LATCH: " + (metrics.meanNippleLatchingEfficiency * 100.0).toFixed(0) + "% | CLIMB EVENTS: " + metrics.marsupiumClimbingEvents;
            }

            // 2. 124th Channel (% CPI) Display
            const elCPIIndex = document.getElementById("valCPIIndex");
            const elCPIStatus = document.getElementById("valCPIStatus");

            if (elCPIIndex) {
                let regimeDesc = "APLACENTAL YOLK SAC ONLY & LOW NEUROGENIC MATURITY";
                let badgeClass = "cpi-badge cpi-aplacental";
                if (metrics.cpiRegime === "CHORIOALLANTOIC_ADVANCED_TRANSFER") {
                    regimeDesc = "CHORIOALLANTOIC ADVANCED TRANSFER & PRECOCIAL YOUNG";
                    badgeClass = "cpi-badge cpi-chorioallantoic";
                } else if (metrics.cpiRegime === "CHORIOVITELLINE_PLACENTATION") {
                    regimeDesc = "CHORIOVITELLINE PLACENTATION & TROPHOBLAST EXCHANGE";
                    badgeClass = "cpi-badge cpi-choriovitelline";
                } else if (metrics.cpiRegime === "INCIPIENT_TROPHOBLAST_ADHESION") {
                    regimeDesc = "INCIPIENT TROPHOBLAST ADHESION & UTERINE RETENTION";
                    badgeClass = "cpi-badge cpi-incipient";
                }
                elCPIIndex.textContent = metrics.meanChoriovitellinePlacentaIndex.toFixed(1) + "% CPI (" + regimeDesc + ")";
                elCPIIndex.className = badgeClass;
            }

            if (elCPIStatus) {
                elCPIStatus.textContent = "EUTHERIANS: " + metrics.eutherianCount + "/" + metrics.liveCount + " | TROPHOBLAST: " +
                    (metrics.meanChoriovitellineDensity * 100.0).toFixed(0) + "% | NUTRIENT FLUX: " + (metrics.meanTrophoblastNutrientFlux * 100.0).toFixed(0) +
                    "% | MATURITY: " + (metrics.meanPrecocialMaturity * 100.0).toFixed(0) + "% | TRANSFERS: " + metrics.placentalNutrientTransfers +
                    " | BIOMASS: " + metrics.cumulativeTherianBiomass.toFixed(1) + " mg";
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} divergenceManager - Global MonotremeTherianDivergenceManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, divergenceManager, tick) {
            const metrics = TherianTelemetryManager.calculateMetrics(organisms, divergenceManager, tick);

            if (historyData) {
                if (historyData.marsupiumPouchIndex && Array.isArray(historyData.marsupiumPouchIndex)) {
                    historyData.marsupiumPouchIndex[historyData.marsupiumPouchIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanMarsupiumPouchIndex));
                }
                if (historyData.choriovitellinePlacentaIndex && Array.isArray(historyData.choriovitellinePlacentaIndex)) {
                    historyData.choriovitellinePlacentaIndex[historyData.choriovitellinePlacentaIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanChoriovitellinePlacentaIndex));
                }
            }

            if (tick % 4 === 0) {
                TherianTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TherianTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TherianTelemetryManager = TherianTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
