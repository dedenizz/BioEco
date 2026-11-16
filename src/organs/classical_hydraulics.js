// BioEcosystem - Classical Antiquity Watermills, Aqueduct Hydraulics & Three-Field Crop Rotation
// Module: src/organs/classical_hydraulics.js
// Version: 11.8.0 (Hour 738 - System Agent: Hydromechanical Watermills, Gravity-Fed Aqueducts, Legume Nitrogen Fixation & 171st/172nd Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ClassicalHydraulicsManager
     * Core evolutionary, hydromechanical, and agronomic dynamics for Classical Antiquity Homo sapiens:
     * 1. Hydromechanical Watermills:
     *    - Overshot & undershot waterwheels converting river kinetic flow into rotary torque (watermillTorquePower: 0.80 - 0.98).
     * 2. Gravity-Fed Stone Aqueducts:
     *    - Elevated stone arcades & inverted siphons delivering clean mountain spring water (aqueductFlowRate: 0.80 - 0.98).
     * 3. Three-Field Crop Rotation & Legume Nitrogen Fixation:
     *    - Winter cereal, summer legume (Rhizobium nitrate restoration), and fallow rotation (cropRotationFertility: 0.80 - 0.98, legumeNitrogenSurplus: 1.4 - 2.3).
     * 4. 171st & 172nd Telemetry Channel Indices:
     *    - 171st Channel: % WHI (Watermill & Aqueduct Hydraulics Index, Aqueduct Sapphire #0369a1)
     *    - 172nd Channel: % CRI (Crop Rotation & Agronomy Index, Agronomy Emerald #15803d)
     */
    class ClassicalHydraulicsManager {
        /**
         * Initialize Classical Hydraulics and Agronomy Manager.
         */
        constructor() {
            this.metrics = {
                totalClassicalCitizens: 0,
                activeWatermills: 0,
                activeAqueducts: 0,
                activeCropRotators: 0,
                meanWatermillTorque: 0.89,
                meanAqueductFlow: 0.89,
                meanCropRotationFertility: 0.89,
                meanLegumeSurplus: 1.85,
                meanWHIIndex: 0.0,
                meanCRIIndex: 0.0,
                watermillFlourMilled: 0,
                aqueductDeliveries: 0,
                nitrogenRotationCycles: 0,
                classicalGranaryStored: 0.0,
                harvestedClassicalBiomass: 0.0,
                cumulativeClassicalBiomass: 0.0
            };
        }

        /**
         * Process a single simulation step for organism population.
         * @param {Array} organisms - Population array.
         * @param {Object} spatialGrid - Spatial collision grid.
         * @param {number} dt - Delta time multiplier.
         */
        step(organisms, spatialGrid, dt) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let citizens = 0;
            let mills = 0;
            let aqueducts = 0;
            let rotators = 0;

            let sumMill = 0;
            let sumAqueduct = 0;
            let sumRot = 0;
            let sumLegume = 0;

            let sumWHI = 0;
            let sumCRI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 40);

                if (isEligibleHuman && org.hasClassicalHydraulics === undefined) {
                    const adoptsClassical = Math.random() < 0.65;
                    org.hasClassicalHydraulics = adoptsClassical;

                    if (adoptsClassical) {
                        // 1. Hydromechanical Watermills
                        org.hasWatermill = Math.random() < 0.78;
                        org.watermillTorquePower = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.milledGrainBatches = 2 + Math.floor(Math.random() * 5);
                        org.isMillingWater = false;

                        // 2. Gravity-Fed Stone Aqueducts
                        org.hasAqueduct = Math.random() < 0.76;
                        org.aqueductFlowRate = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isChannelingAqueduct = false;

                        // 3. Three-Field Crop Rotation & Legume Nitrogen Fixation
                        org.hasCropRotation = Math.random() < 0.76;
                        org.cropRotationFertility = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.legumeNitrogenSurplus = 1.4 + Math.random() * 0.9; // 1.4 - 2.3
                        org.storedClassicalSurplus = 18.0 + Math.random() * 32.0;
                        org.isRotatingCrops = false;

                        // Telemetry Channel Indices
                        org.watermillHydraulicsIndex = 0.0;
                        org.cropRotationIndex = 0.0;
                    }
                }

                if (org.hasClassicalHydraulics) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 38.0;

                    // A. Hydromechanical Watermill Grain Milling
                    if (org.hasWatermill) {
                        mills++;
                        sumMill += org.watermillTorquePower || 0.89;

                        if (Math.random() < 0.019) {
                            org.isMillingWater = true;
                            org.milledGrainBatches = Math.min(40, (org.milledGrainBatches || 2) + 1);
                            this.metrics.watermillFlourMilled++;
                            const millBonus = (org.watermillTorquePower || 0.89) * 1.90;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + millBonus);
                            this.metrics.harvestedClassicalBiomass += millBonus;
                        } else {
                            org.isMillingWater = false;
                        }
                    }

                    // B. Gravity-Fed Stone Aqueduct Delivery
                    if (org.hasAqueduct) {
                        aqueducts++;
                        sumAqueduct += org.aqueductFlowRate || 0.89;

                        if (Math.random() < 0.020) {
                            org.isChannelingAqueduct = true;
                            this.metrics.aqueductDeliveries++;
                            const waterYield = (org.aqueductFlowRate || 0.89) * 2.15;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + waterYield);
                            org.storedClassicalSurplus = Math.min(120.0, (org.storedClassicalSurplus || 18.0) + waterYield * 0.45);
                            this.metrics.harvestedClassicalBiomass += waterYield;
                        } else {
                            org.isChannelingAqueduct = false;
                        }
                    }

                    // C. Three-Field Crop Rotation & Legume Nitrogen Fixation
                    if (org.hasCropRotation) {
                        rotators++;
                        sumRot += org.cropRotationFertility || 0.89;
                        sumLegume += org.legumeNitrogenSurplus || 1.85;

                        if (Math.random() < 0.022) {
                            org.isRotatingCrops = true;
                            this.metrics.nitrogenRotationCycles++;
                            const agroYield = (org.cropRotationFertility || 0.89) * (org.legumeNitrogenSurplus || 1.85) * 1.45;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + agroYield);
                            org.storedClassicalSurplus = Math.min(120.0, (org.storedClassicalSurplus || 18.0) + agroYield * 0.50);
                            this.metrics.classicalGranaryStored += agroYield * 0.50;
                            this.metrics.harvestedClassicalBiomass += agroYield;
                        } else {
                            org.isRotatingCrops = false;
                        }

                        // Emergency draw from classical granary during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedClassicalSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedClassicalSurplus, 7.0);
                            org.storedClassicalSurplus -= draw;
                            org.energy += draw * 0.98;
                        }
                    }

                    // D. Compute 171st Channel (% WHI - Watermill & Aqueduct Hydraulics Index)
                    const millNorm = org.hasWatermill ? (org.watermillTorquePower || 0.89) : 0.25;
                    const aqNorm = org.hasAqueduct ? (org.aqueductFlowRate || 0.89) : 0.25;
                    const wheelNorm = org.hasWatermill ? Math.min(1.0, 0.72 + (org.milledGrainBatches || 2) * 0.025) : 0.20;
                    const whi = Math.max(0, Math.min(100, (
                        millNorm * 0.40 +
                        aqNorm * 0.35 +
                        wheelNorm * 0.25
                    ) * 100.0));
                    org.watermillHydraulicsIndex = whi;
                    sumWHI += whi;

                    // E. Compute 172nd Channel (% CRI - Crop Rotation & Agronomy Index)
                    const rotNorm = org.hasCropRotation ? (org.cropRotationFertility || 0.89) : 0.25;
                    const legNorm = org.hasCropRotation ? Math.min(1.0, 0.55 + (((org.legumeNitrogenSurplus || 1.85) - 1.4) / 0.9) * 0.45) : 0.30;
                    const surpNorm = org.hasCropRotation ? Math.min(1.0, 0.65 + ((org.storedClassicalSurplus || 18.0) / 120.0) * 0.35) : 0.25;
                    const cri = Math.max(0, Math.min(100, (
                        rotNorm * 0.35 +
                        surpNorm * 0.35 +
                        legNorm * 0.30
                    ) * 100.0));
                    org.cropRotationIndex = cri;
                    sumCRI += cri;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalClassicalCitizens = citizens;
            this.metrics.activeWatermills = mills;
            this.metrics.activeAqueducts = aqueducts;
            this.metrics.activeCropRotators = rotators;

            this.metrics.meanWatermillTorque = mills > 0 ? (sumMill / mills) : 0.89;
            this.metrics.meanAqueductFlow = aqueducts > 0 ? (sumAqueduct / aqueducts) : 0.89;
            this.metrics.meanCropRotationFertility = rotators > 0 ? (sumRot / rotators) : 0.89;
            this.metrics.meanLegumeSurplus = rotators > 0 ? (sumLegume / rotators) : 1.85;

            this.metrics.meanWHIIndex = citizens > 0 ? (sumWHI / citizens) : 0.0;
            this.metrics.meanCRIIndex = citizens > 0 ? (sumCRI / citizens) : 0.0;
            this.metrics.cumulativeClassicalBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.ClassicalHydraulicsManager = ClassicalHydraulicsManager;
    if (typeof window !== "undefined") {
        window.classicalHydraulicsManager = new ClassicalHydraulicsManager();
    }
})(typeof window !== "undefined" ? window : global);
