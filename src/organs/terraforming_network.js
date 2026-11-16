// BioEcosystem - Interplanetary Biome Seeding, Exoplanet Terraforming & Pan-Galactic Ecosystem Network
// Module: src/organs/terraforming_network.js
// Version: 16.8.0 (Hour 788 - System Agent: Atmospheric Seeding, Cryogenic Seed-Ships, Pan-Galactic Network & 191st/192nd Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerraformingNetworkManager
     * Core exoplanet terraforming, cryogenic biome transit, and pan-galactic ecological network dynamics:
     * 1. Atmospheric Seeding Rate:
     *    - Injection of O2/N2 and extremophile pioneer microbes into barren exoplanets (atmosphericSeedingRate: 0.80 - 0.98).
     * 2. Cryogenic Biome Integrity:
     *    - Interstellar seed, spore, and artificial chassis preservation (cryogenicBiomeIntegrity: 0.80 - 0.98, exoplanetBioMultiplier: 1.8 - 4.0).
     * 3. Pan-Galactic Ecosystem Network Sync:
     *    - Interstellar gene flow and multi-world biosphere synchronization (interstellarNetworkSync: 0.80 - 0.98).
     * 4. 191st & 192nd Telemetry Channel Indices:
     *    - 191st Channel: % ETI (Exoplanet Terraforming & Atmosphere Seeding Index, Terraforming Emerald #10b981)
     *    - 192nd Channel: % PGN (Pan-Galactic Biome Network & Seed-Ship Index, Galactic Violet #8b5cf6)
     */
    class TerraformingNetworkManager {
        /**
         * Initialize Exoplanet Terraforming & Pan-Galactic Network Manager.
         */
        constructor() {
            this.metrics = {
                totalGalacticCitizens: 0,
                activeAtmosphericSeeders: 0,
                activeCryoSeedShips: 0,
                activePanGalacticNodes: 0,
                meanSeedingRate: 0.89,
                meanCryoIntegrity: 0.89,
                meanNetworkSync: 0.89,
                meanExoplanetMultiplier: 2.90,
                meanETIIndex: 0.0,
                meanPGNIndex: 0.0,
                atmosphericSeedingCycles: 0,
                cryoSeedDispatches: 0,
                galacticSyncPulses: 0,
                storedTerraformingBiomass: 0.0,
                harvestedGalacticBiomass: 0.0,
                cumulativeGalacticBiomass: 0.0
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
            let seeders = 0;
            let ships = 0;
            let nodes = 0;

            let sumSeed = 0;
            let sumCryo = 0;
            let sumSync = 0;
            let sumMult = 0;
            let sumETI = 0;
            let sumPGN = 0;
            let totalBio = 0;

            const stepDt = dt || 1.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasOrbitalEcology || org.hasSyntheticCrispr || org.hasNeuralQuantum || org.hasSiliconInternet || org.hasAviationRadio || org.hasElectricNitrogen || org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 52);

                if (isEligibleHuman && org.hasTerraformingNetwork === undefined) {
                    const adoptsGalactic = (org.generation >= 3) || (org.hasOrbitalEcology) || (Math.random() < 0.72);
                    org.hasTerraformingNetwork = adoptsGalactic;

                    if (adoptsGalactic) {
                        org.atmosphericSeedingRate = 0.80 + Math.random() * 0.18;
                        org.hasAtmosphericSeeding = Math.random() < 0.82;
                        org.seedingTimer = Math.floor(Math.random() * 11);
                        org.isSeedingAtmosphere = false;

                        org.cryogenicBiomeIntegrity = 0.80 + Math.random() * 0.18;
                        org.exoplanetBioMultiplier = 1.80 + Math.random() * 2.20;
                        org.hasCryogenicSeedShips = Math.random() < 0.78;
                        org.cryoTimer = Math.floor(Math.random() * 12);
                        org.isTransportingBiomes = false;

                        org.interstellarNetworkSync = 0.80 + Math.random() * 0.18;
                        org.hasPanGalacticNetwork = Math.random() < 0.76;
                        org.galacticSyncTimer = Math.floor(Math.random() * 14);
                        org.isSyncingGalacticNet = false;

                        org.storedTerraformingBiomass = 42.0 + Math.random() * 38.0;
                        org.exoplanetTerraformingIndex = 0;
                        org.panGalacticNetworkIndex = 0;
                    }
                }

                if (org.hasTerraformingNetwork) {
                    citizens++;
                    totalBio += (org.mass || 58.0);

                    // A. Atmospheric Seeding
                    if (org.hasAtmosphericSeeding) {
                        seeders++;
                        sumSeed += (org.atmosphericSeedingRate || 0.89);
                        org.seedingTimer = (org.seedingTimer || 0) + stepDt;
                        if (org.seedingTimer >= 10) {
                            org.seedingTimer = 0;
                            org.isSeedingAtmosphere = true;
                            this.metrics.atmosphericSeedingCycles++;
                        } else if (org.seedingTimer >= 4) {
                            org.isSeedingAtmosphere = false;
                        }
                    }

                    // B. Cryogenic Biome Seed-Ships
                    if (org.hasCryogenicSeedShips) {
                        ships++;
                        sumCryo += (org.cryogenicBiomeIntegrity || 0.89);
                        sumMult += (org.exoplanetBioMultiplier || 2.90);
                        org.cryoTimer = (org.cryoTimer || 0) + stepDt;
                        if (org.cryoTimer >= 9) {
                            org.cryoTimer = 0;
                            org.isTransportingBiomes = true;
                            this.metrics.cryoSeedDispatches++;
                            const gain = 2.15 * (org.cryogenicBiomeIntegrity || 0.89) * ((org.exoplanetBioMultiplier || 2.90) / 2.5);
                            org.storedTerraformingBiomass = Math.min(320.0, (org.storedTerraformingBiomass || 42.0) + gain);
                            this.metrics.storedTerraformingBiomass += gain * 0.08;
                            this.metrics.harvestedGalacticBiomass += gain * 0.20;
                            org.energy = Math.min(org.maxEnergy || 245, (org.energy || 100) + 2.30 * (org.cryogenicBiomeIntegrity || 0.89));
                        } else if (org.cryoTimer >= 4) {
                            org.isTransportingBiomes = false;
                        }
                    }

                    // C. Pan-Galactic Ecosystem Network Sync
                    if (org.hasPanGalacticNetwork) {
                        nodes++;
                        sumSync += (org.interstellarNetworkSync || 0.89);
                        org.galacticSyncTimer = (org.galacticSyncTimer || 0) + stepDt;
                        if (org.galacticSyncTimer >= 12) {
                            org.galacticSyncTimer = 0;
                            org.isSyncingGalacticNet = true;
                            this.metrics.galacticSyncPulses++;
                        } else if (org.galacticSyncTimer >= 5) {
                            org.isSyncingGalacticNet = false;
                        }
                    }

                    // D. Compute 191st Channel (% ETI - Exoplanet Terraforming & Atmosphere Seeding Index)
                    const seedNorm = org.hasAtmosphericSeeding ? (org.atmosphericSeedingRate || 0.89) : 0.25;
                    const cryoNorm = org.hasCryogenicSeedShips ? (org.cryogenicBiomeIntegrity || 0.89) : 0.25;
                    const multNorm = org.hasCryogenicSeedShips ? Math.min(1.0, 0.55 + (((org.exoplanetBioMultiplier || 2.90) - 1.8) / 2.2) * 0.45) : 0.30;
                    const eti = Math.max(0, Math.min(100, (
                        seedNorm * 0.42 +
                        cryoNorm * 0.33 +
                        multNorm * 0.25
                    ) * 100.0));
                    org.exoplanetTerraformingIndex = eti;
                    sumETI += eti;

                    // E. Compute 192nd Channel (% PGN - Pan-Galactic Biome Network & Seed-Ship Index)
                    const syncNorm = org.hasPanGalacticNetwork ? (org.interstellarNetworkSync || 0.89) : 0.25;
                    const bioNorm = org.hasCryogenicSeedShips ? Math.min(1.0, 0.60 + ((org.storedTerraformingBiomass || 42.0) / 320.0) * 0.40) : 0.25;
                    const netNorm = (org.hasPanGalacticNetwork && org.hasAtmosphericSeeding) ? 0.94 : (org.hasPanGalacticNetwork ? 0.72 : 0.20);
                    const pgn = Math.max(0, Math.min(100, (
                        syncNorm * 0.45 +
                        netNorm * 0.30 +
                        bioNorm * 0.25
                    ) * 100.0));
                    org.panGalacticNetworkIndex = pgn;
                    sumPGN += pgn;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalGalacticCitizens = citizens;
            this.metrics.activeAtmosphericSeeders = seeders;
            this.metrics.activeCryoSeedShips = ships;
            this.metrics.activePanGalacticNodes = nodes;

            this.metrics.meanSeedingRate = seeders > 0 ? (sumSeed / seeders) : 0.89;
            this.metrics.meanCryoIntegrity = ships > 0 ? (sumCryo / ships) : 0.89;
            this.metrics.meanNetworkSync = nodes > 0 ? (sumSync / nodes) : 0.89;
            this.metrics.meanExoplanetMultiplier = ships > 0 ? (sumMult / ships) : 2.90;

            this.metrics.meanETIIndex = citizens > 0 ? (sumETI / citizens) : 0.0;
            this.metrics.meanPGNIndex = citizens > 0 ? (sumPGN / citizens) : 0.0;
            this.metrics.cumulativeGalacticBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.TerraformingNetworkManager = TerraformingNetworkManager;
    if (typeof window !== "undefined") {
        window.terraformingNetworkManager = new TerraformingNetworkManager();
    }
})(typeof window !== "undefined" ? window : global);
