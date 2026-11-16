// BioEcosystem - Electrification, Telegraph Communications & Haber-Bosch Synthetic Nitrogen Fixation
// Module: src/organs/electric_nitrogen.js
// Version: 13.8.0 (Hour 758 - System Agent: AC Power Grid, Electric Telegraph, Haber-Bosch Ammonia Synthesis & 179th/180th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectricNitrogenManager
     * Core evolutionary, electromagnetic, and chemical synthesis dynamics for Electrified Homo sapiens:
     * 1. AC Dynamo & High-Voltage Power Grid:
     *    - Modular distribution of electrical energy beyond steam shaft reach (electricGridTransmission: 0.80 - 0.98).
     * 2. Electric Telegraph & Submarine Cable Network:
     *    - Instantaneous continental & oceanic coordination of freight and crisis alerts (telegraphSignalLatency: 0.80 - 0.98).
     * 3. Haber-Bosch Atmospheric Nitrogen Fixation:
     *    - High-pressure catalytic ammonia synthesis breaking natural manure ceilings (haberBoschNitrogenRate: 0.80 - 0.98, syntheticCropMultiplier: 1.8 - 3.0).
     * 4. 179th & 180th Telemetry Channel Indices:
     *    - 179th Channel: % EGI (Electrical Grid & Telegraph Index, Electric Blue #0ea5e9)
     *    - 180th Channel: % SNI (Synthetic Nitrogen & Green Revolution Index, Nitrogen Emerald #10b981)
     */
    class ElectricNitrogenManager {
        /**
         * Initialize Electrification, Telegraph, and Synthetic Nitrogen Manager.
         */
        constructor() {
            this.metrics = {
                totalElectrifiedCitizens: 0,
                activeElectricGrids: 0,
                activeTelegraphNodes: 0,
                activeHaberBoschPlants: 0,
                meanGridTransmission: 0.89,
                meanTelegraphLatency: 0.89,
                meanHaberBoschRate: 0.89,
                meanSyntheticMultiplier: 2.40,
                meanEGIIndex: 0.0,
                meanSNIIndex: 0.0,
                gridKilowattPulses: 0,
                telegraphDispatches: 0,
                ammoniaTonsSynthesized: 0,
                syntheticBiosphereStored: 0.0,
                harvestedElectricBiomass: 0.0,
                cumulativeElectricBiomass: 0.0
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
            let grids = 0;
            let telegraphs = 0;
            let haberPlants = 0;

            let sumGrid = 0;
            let sumTele = 0;
            let sumHaber = 0;
            let sumMult = 0;

            let sumEGI = 0;
            let sumSNI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 48);

                if (isEligibleHuman && org.hasElectricNitrogen === undefined) {
                    const adoptsElectric = Math.random() < 0.65;
                    org.hasElectricNitrogen = adoptsElectric;

                    if (adoptsElectric) {
                        // 1. AC Power Grid
                        org.hasElectricGrid = Math.random() < 0.78;
                        org.electricGridTransmission = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.gridChargePulses = 2 + Math.floor(Math.random() * 5);
                        org.isPoweringGrid = false;

                        // 2. Electric Telegraph Network
                        org.hasTelegraphNet = Math.random() < 0.76;
                        org.telegraphSignalLatency = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isTransmittingTelegraph = false;

                        // 3. Haber-Bosch Synthetic Nitrogen
                        org.hasSyntheticNitrogen = Math.random() < 0.76;
                        org.haberBoschNitrogenRate = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.syntheticCropMultiplier = 1.8 + Math.random() * 1.2; // 1.8 - 3.0
                        org.storedSyntheticSurplus = 26.0 + Math.random() * 38.0;
                        org.isSynthesizingAmmonia = false;

                        // Telemetry Channel Indices
                        org.electricalGridIndex = 0.0;
                        org.syntheticNitrogenIndex = 0.0;
                    }
                }

                if (org.hasElectricNitrogen) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 46.0;

                    // A. AC Power Grid Transmission
                    if (org.hasElectricGrid) {
                        grids++;
                        sumGrid += org.electricGridTransmission || 0.89;

                        if (Math.random() < 0.020) {
                            org.isPoweringGrid = true;
                            org.gridChargePulses = Math.min(60, (org.gridChargePulses || 2) + 1);
                            this.metrics.gridKilowattPulses++;
                            const gridYield = (org.electricGridTransmission || 0.89) * 2.25;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + gridYield);
                            this.metrics.harvestedElectricBiomass += gridYield;
                        } else {
                            org.isPoweringGrid = false;
                        }
                    }

                    // B. Electric Telegraph Instant Coordination
                    if (org.hasTelegraphNet) {
                        telegraphs++;
                        sumTele += org.telegraphSignalLatency || 0.89;

                        if (Math.random() < 0.020) {
                            org.isTransmittingTelegraph = true;
                            this.metrics.telegraphDispatches++;
                            const teleYield = (org.telegraphSignalLatency || 0.89) * 2.35;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + teleYield);
                            org.storedSyntheticSurplus = Math.min(160.0, (org.storedSyntheticSurplus || 26.0) + teleYield * 0.45);
                            this.metrics.harvestedElectricBiomass += teleYield;
                        } else {
                            org.isTransmittingTelegraph = false;
                        }
                    }

                    // C. Haber-Bosch Synthetic Nitrogen Fixation
                    if (org.hasSyntheticNitrogen) {
                        haberPlants++;
                        sumHaber += org.haberBoschNitrogenRate || 0.89;
                        sumMult += org.syntheticCropMultiplier || 2.40;

                        if (Math.random() < 0.022) {
                            org.isSynthesizingAmmonia = true;
                            this.metrics.ammoniaTonsSynthesized++;
                            const nitroYield = (org.haberBoschNitrogenRate || 0.89) * (org.syntheticCropMultiplier || 2.40) * 1.15;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + nitroYield);
                            org.storedSyntheticSurplus = Math.min(160.0, (org.storedSyntheticSurplus || 26.0) + nitroYield * 0.50);
                            this.metrics.syntheticBiosphereStored += nitroYield * 0.50;
                            this.metrics.harvestedElectricBiomass += nitroYield;
                        } else {
                            org.isSynthesizingAmmonia = false;
                        }

                        // Emergency draw from synthetic nitrogen depot during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedSyntheticSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedSyntheticSurplus, 9.0);
                            org.storedSyntheticSurplus -= draw;
                            org.energy += draw * 0.99;
                        }
                    }

                    // D. Compute 179th Channel (% EGI - Electrical Grid & Telegraph Index)
                    const gridNorm = org.hasElectricGrid ? (org.electricGridTransmission || 0.89) : 0.25;
                    const teleNorm = org.hasTelegraphNet ? (org.telegraphSignalLatency || 0.89) : 0.25;
                    const pulseNorm = org.hasElectricGrid ? Math.min(1.0, 0.72 + (org.gridChargePulses || 2) * 0.025) : 0.20;
                    const egi = Math.max(0, Math.min(100, (
                        gridNorm * 0.40 +
                        teleNorm * 0.35 +
                        pulseNorm * 0.25
                    ) * 100.0));
                    org.electricalGridIndex = egi;
                    sumEGI += egi;

                    // E. Compute 180th Channel (% SNI - Synthetic Nitrogen & Green Revolution Index)
                    const haberNorm = org.hasSyntheticNitrogen ? (org.haberBoschNitrogenRate || 0.89) : 0.25;
                    const multNorm = org.hasSyntheticNitrogen ? Math.min(1.0, 0.55 + (((org.syntheticCropMultiplier || 2.40) - 1.8) / 1.2) * 0.45) : 0.30;
                    const surpNorm = org.hasSyntheticNitrogen ? Math.min(1.0, 0.65 + ((org.storedSyntheticSurplus || 26.0) / 160.0) * 0.35) : 0.25;
                    const sni = Math.max(0, Math.min(100, (
                        haberNorm * 0.35 +
                        surpNorm * 0.35 +
                        multNorm * 0.30
                    ) * 100.0));
                    org.syntheticNitrogenIndex = sni;
                    sumSNI += sni;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalElectrifiedCitizens = citizens;
            this.metrics.activeElectricGrids = grids;
            this.metrics.activeTelegraphNodes = telegraphs;
            this.metrics.activeHaberBoschPlants = haberPlants;

            this.metrics.meanGridTransmission = grids > 0 ? (sumGrid / grids) : 0.89;
            this.metrics.meanTelegraphLatency = telegraphs > 0 ? (sumTele / telegraphs) : 0.89;
            this.metrics.meanHaberBoschRate = haberPlants > 0 ? (sumHaber / haberPlants) : 0.89;
            this.metrics.meanSyntheticMultiplier = haberPlants > 0 ? (sumMult / haberPlants) : 2.40;

            this.metrics.meanEGIIndex = citizens > 0 ? (sumEGI / citizens) : 0.0;
            this.metrics.meanSNIIndex = citizens > 0 ? (sumSNI / citizens) : 0.0;
            this.metrics.cumulativeElectricBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.ElectricNitrogenManager = ElectricNitrogenManager;
    if (typeof window !== "undefined") {
        window.electricNitrogenManager = new ElectricNitrogenManager();
    }
})(typeof window !== "undefined" ? window : global);
