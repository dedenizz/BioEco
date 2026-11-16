// BioEcosystem - Neolithic Agriculture, Cereal Crop Domestication, Pottery Granaries & Sedentary Architecture Dynamics
// Module: src/organs/neolithic_agriculture.js
// Version: 9.93.0 (Hour 713 - System Agent: Einkorn/Emmer Cultivation, Non-Shattering Rachis, Sickle Harvesting, Pottery Granaries, Mudbrick Villages & 161st/162nd Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeolithicAgricultureManager
     * Core evolutionary, technological, and socio-ecological dynamics for Neolithic Homo sapiens (Fertile Crescent & Holocene Sedentism):
     * 1. Cereal Crop Domestication & Artificial Selection:
     *    - Cultivation of wild einkorn (Triticum monococcum), emmer (Triticum dicoccum), and two-row barley (cerealCropCultivation: 0.80 - 0.98).
     *    - Artificial selection suppressing brittle spikelet shattering, fixing non-shattering rachis alleles (rachisBrittlenessSuppression: 0.75 - 0.95).
     *    - 5x to 10x higher caloric yield per hectare over nomadic wild foraging.
     * 2. Composite Microlithic Sickles & Silica Gloss Harvesting:
     *    - Hafting flint/obsidian microlithic bladelets into curved antler/wooden handles using bitumen/mastic (sickleHarvestingEfficiency: 0.80 - 0.98).
     *    - Characteristic high-gloss silica polish formation on tool margins during rapid cereal stem severance.
     * 3. Baked Clay Pottery Granaries & Surplus Caloric Buffering:
     *    - Fired earthenware pottery vessels and sealed subterranean clay-lined silos (potterySeedStorage: 0.80 - 0.98).
     *    - Long-term storage of seed grain and consumable surplus, mitigating seasonal drought and winter famine (granaryCaloricSurplus: 0.75 - 0.96).
     * 4. Sedentary Mudbrick Architecture & Proto-Village Demographics:
     *    - Stone-substructure rectangular mudbrick houses, communal saddle-quern grinding slabs, and sedentary agglomeration (sedentaryVillageArchitecture: 0.78 - 0.98).
     *    - Reduced inter-birth intervals and exponential demographic carrying capacity scaling.
     * 5. 161st & 162nd Telemetry Channel Indices:
     *    - 161st Channel: % NAI (Neolithic Agriculture Index, Golden Wheat #eab308)
     *    - 162nd Channel: % PSI (Pottery Storage & Sedentism Index, Terracotta #c2410c)
     */
    class NeolithicAgricultureManager {
        /**
         * Initialize Neolithic Agriculture, Grain Domestication, and Pottery Granary Manager.
         */
        constructor() {
            this.metrics = {
                totalNeolithicFarmers: 0,
                activeCultivators: 0,
                activeSickleHarvesters: 0,
                activePotteryGranaryHolders: 0,
                activeVillageSedentists: 0,
                meanCropCultivation: 0.88,
                meanRachisSuppression: 0.86,
                meanSickleEfficiency: 0.89,
                meanPotteryStorage: 0.88,
                meanGranarySurplus: 0.86,
                meanVillageArchitecture: 0.87,
                meanNAIIndex: 0.0,
                meanPSIIndex: 0.0,
                cerealCropsHarvested: 0,
                sickleBiomassReaped: 0,
                storedCaloricSurplusTotal: 0,
                mudbrickVillagesErected: 0,
                harvestedAgriculturalBiomass: 0.0,
                cumulativeNeolithicBiomass: 0.0
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

            let farmers = 0;
            let cultivators = 0;
            let harvesters = 0;
            let granaryHolders = 0;
            let sedentists = 0;

            let sumCrop = 0;
            let sumRachis = 0;
            let sumSickle = 0;
            let sumPottery = 0;
            let sumSurplus = 0;
            let sumArch = 0;

            let sumNAI = 0;
            let sumPSI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // Eligibility: Upper Paleolithic Sapiens, Mesolithic fishers, or advanced hominins
                const isEligibleHuman = org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 32);

                if (isEligibleHuman && org.hasNeolithicAgriculture === undefined) {
                    const adoptsAgri = Math.random() < 0.65;
                    org.hasNeolithicAgriculture = adoptsAgri;

                    if (adoptsAgri) {
                        // 1. Cereal Crop Domestication & Rachis Fixing
                        org.hasCerealCultivation = Math.random() < 0.80;
                        org.cerealCropCultivation = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.rachisBrittlenessSuppression = 0.75 + Math.random() * 0.20; // 0.75 - 0.95
                        org.isCerealHarvesting = false;

                        // 2. Composite Microlithic Sickles
                        org.hasMicrolithicSickle = Math.random() < 0.75;
                        org.sickleHarvestingEfficiency = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isSickleReaping = false;

                        // 3. Baked Clay Pottery Granaries
                        org.hasPotteryGranary = Math.random() < 0.70;
                        org.potterySeedStorage = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.granaryCaloricSurplus = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                        org.storedGrainBuffer = 15.0 + Math.random() * 35.0; // 15 - 50 kcal equivalent

                        // 4. Sedentary Mudbrick Architecture
                        org.hasSedentaryVillage = Math.random() < 0.65;
                        org.sedentaryVillageArchitecture = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                        org.isVillageAnchored = false;

                        // Telemetry Channel Indices
                        org.neolithicAgricultureIndex = 0.0;
                        org.potterySedentismIndex = 0.0;
                    }
                }

                if (org.hasNeolithicAgriculture) {
                    farmers++;
                    totalBio += (org.mass || 1.0) * 25.0;

                    // A. Agricultural Crop Harvesting Cycle
                    if (org.hasCerealCultivation) {
                        cultivators++;
                        sumCrop += org.cerealCropCultivation || 0.88;
                        sumRachis += org.rachisBrittlenessSuppression || 0.86;

                        // Periodic harvest cycle (every ~80 ticks)
                        if (Math.random() < 0.015) {
                            org.isCerealHarvesting = true;
                            const harvestYield = (org.cerealCropCultivation || 0.88) * (org.rachisBrittlenessSuppression || 0.86) * 2.8;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + harvestYield);
                            this.metrics.cerealCropsHarvested++;
                            this.metrics.harvestedAgriculturalBiomass += harvestYield;

                            // Surplus diverted to pottery granary
                            if (org.hasPotteryGranary) {
                                org.storedGrainBuffer = Math.min(80.0, (org.storedGrainBuffer || 20.0) + harvestYield * 0.5);
                            }
                        } else {
                            org.isCerealHarvesting = false;
                        }
                    }

                    // B. Sickle Reaping Action
                    if (org.hasMicrolithicSickle) {
                        harvesters++;
                        sumSickle += org.sickleHarvestingEfficiency || 0.89;

                        if (Math.random() < 0.012) {
                            org.isSickleReaping = true;
                            const reapBonus = (org.sickleHarvestingEfficiency || 0.89) * 1.8;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + reapBonus);
                            this.metrics.sickleBiomassReaped++;
                        } else {
                            org.isSickleReaping = false;
                        }
                    }

                    // C. Pottery Granary Surplus Drawdown & Preservation
                    if (org.hasPotteryGranary) {
                        granaryHolders++;
                        sumPottery += org.potterySeedStorage || 0.88;
                        sumSurplus += org.granaryCaloricSurplus || 0.86;

                        // If energy drops below 40%, draw down stored granary calories
                        if ((org.energy || 50.0) < 40.0 && (org.storedGrainBuffer || 0) > 2.0) {
                            const bufferDraw = Math.min(org.storedGrainBuffer, 6.0);
                            org.storedGrainBuffer -= bufferDraw;
                            org.energy += bufferDraw * (org.granaryCaloricSurplus || 0.86);
                            this.metrics.storedCaloricSurplusTotal += bufferDraw;
                        }
                    }

                    // D. Sedentary Village Anchor & Demographic Stability
                    if (org.hasSedentaryVillage) {
                        sedentists++;
                        sumArch += org.sedentaryVillageArchitecture || 0.87;

                        // Village settlement dampens velocity spikes and prevents wandering dispersal
                        org.isVillageAnchored = true;
                        org.vx = (org.vx || 0) * 0.94;
                        org.vy = (org.vy || 0) * 0.94;

                        // Reproduction fertility bonus from sedentism (shorter inter-birth intervals)
                        if ((org.energy || 50.0) > 75.0 && Math.random() < 0.008) {
                            org.fertility = Math.min(1.0, (org.fertility || 0.5) * 1.15);
                            this.metrics.mudbrickVillagesErected++;
                        }
                    } else {
                        org.isVillageAnchored = false;
                    }

                    // E. Compute 161st Channel (% NAI - Neolithic Agriculture Index)
                    const cropNorm = org.cerealCropCultivation || 0.88;
                    const rachisNorm = org.rachisBrittlenessSuppression || 0.86;
                    const sickleNorm = org.hasMicrolithicSickle ? (org.sickleHarvestingEfficiency || 0.89) : 0.40;
                    const nai = Math.max(0, Math.min(100, (
                        cropNorm * 0.35 +
                        rachisNorm * 0.30 +
                        sickleNorm * 0.20 +
                        (org.hasCerealCultivation ? 0.90 : 0.30) * 0.15
                    ) * 100.0));
                    org.neolithicAgricultureIndex = nai;
                    sumNAI += nai;

                    // F. Compute 162nd Channel (% PSI - Pottery Storage & Sedentism Index)
                    const potteryNorm = org.hasPotteryGranary ? (org.potterySeedStorage || 0.88) : 0.35;
                    const surplusNorm = org.hasPotteryGranary ? (org.granaryCaloricSurplus || 0.86) : 0.30;
                    const archNorm = org.hasSedentaryVillage ? (org.sedentaryVillageArchitecture || 0.87) : 0.30;
                    const psi = Math.max(0, Math.min(100, (
                        potteryNorm * 0.35 +
                        surplusNorm * 0.30 +
                        archNorm * 0.20 +
                        (org.hasSedentaryVillage ? 0.92 : 0.25) * 0.15
                    ) * 100.0));
                    org.potterySedentismIndex = psi;
                    sumPSI += psi;
                }
            }

            // Metric aggregation
            this.metrics.totalNeolithicFarmers = farmers;
            this.metrics.activeCultivators = cultivators;
            this.metrics.activeSickleHarvesters = harvesters;
            this.metrics.activePotteryGranaryHolders = granaryHolders;
            this.metrics.activeVillageSedentists = sedentists;

            this.metrics.meanCropCultivation = cultivators > 0 ? (sumCrop / cultivators) : 0.88;
            this.metrics.meanRachisSuppression = cultivators > 0 ? (sumRachis / cultivators) : 0.86;
            this.metrics.meanSickleEfficiency = harvesters > 0 ? (sumSickle / harvesters) : 0.89;
            this.metrics.meanPotteryStorage = granaryHolders > 0 ? (sumPottery / granaryHolders) : 0.88;
            this.metrics.meanGranarySurplus = granaryHolders > 0 ? (sumSurplus / granaryHolders) : 0.86;
            this.metrics.meanVillageArchitecture = sedentists > 0 ? (sumArch / sedentists) : 0.87;

            this.metrics.meanNAIIndex = farmers > 0 ? (sumNAI / farmers) : 0.0;
            this.metrics.meanPSIIndex = farmers > 0 ? (sumPSI / farmers) : 0.0;
            this.metrics.cumulativeNeolithicBiomass = totalBio;
        }

        /**
         * Get aggregated metrics.
         * @returns {Object} Current metrics snapshot.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.NeolithicAgricultureManager = NeolithicAgricultureManager;
    if (typeof window !== "undefined") {
        window.neolithicAgricultureManager = new NeolithicAgricultureManager();
    }
})(typeof window !== "undefined" ? window : global);
