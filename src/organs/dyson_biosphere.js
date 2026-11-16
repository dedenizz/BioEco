// BioEcosystem - Stellar Energy Harvesting, Dyson Biosphere Rings & Cosmic Entropy Reversal
// Module: src/organs/dyson_biosphere.js
// Version: 17.3.0 (Hour 793 - System Agent: Dyson Swarm Capture, Bio-Dyson Metabolism, Cosmic Negentropy & 193rd/194th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * DysonBiosphereManager
     * Core Kardashev II-III stellar energy harvesting, bio-Dyson metabolism, and cosmic negentropy dynamics:
     * 1. Dyson Swarm Capture Efficiency:
     *    - Self-replicating photosynthetic collector rings harvesting stellar luminosity (dysonSwarmCaptureEfficiency: 0.80 - 0.98).
     * 2. Bio-Dyson Metabolic Yield:
     *    - Direct conversion of stellar flux into biomass and synthetic carbon fixation (bioDysonMetabolicYield: 0.80 - 0.98, stellarEnergyMultiplier: 1.8 - 4.0).
     * 3. Cosmic Entropy Reversal:
     *    - Local negentropy regulation recycling waste heat and preserving coherent biological information (negentropyReversalRate: 0.80 - 0.98).
     * 4. 193rd & 194th Telemetry Channel Indices:
     *    - 193rd Channel: % DSH (Dyson Swarm & Stellar Biosphere Harvesting Index, Stellar Gold #facc15)
     *    - 194th Channel: % CER (Cosmic Entropy Reversal & Negentropy Index, Negentropy Magenta #ec4899)
     */
    class DysonBiosphereManager {
        /**
         * Initialize Dyson Biosphere & Cosmic Negentropy Manager.
         */
        constructor() {
            this.metrics = {
                totalStellarCitizens: 0,
                activeDysonSwarms: 0,
                activeBioDysonMetabolisms: 0,
                activeNegentropyEngines: 0,
                meanSwarmEfficiency: 0.89,
                meanBioDysonYield: 0.89,
                meanNegentropyRate: 0.89,
                meanStellarMultiplier: 2.90,
                meanDSHIndex: 0.0,
                meanCERIndex: 0.0,
                dysonHarvestCycles: 0,
                stellarCarbonCycles: 0,
                negentropyPulses: 0,
                storedDysonEnergy: 0.0,
                harvestedStellarBiomass: 0.0,
                cumulativeStellarBiomass: 0.0
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
            let swarms = 0;
            let metabolisms = 0;
            let engines = 0;

            let sumSwarm = 0;
            let sumBioDyson = 0;
            let sumNeg = 0;
            let sumMult = 0;
            let sumDSH = 0;
            let sumCER = 0;
            let totalBio = 0;

            const stepDt = dt || 1.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasTerraformingNetwork || org.hasOrbitalEcology || org.hasSyntheticCrispr || org.hasNeuralQuantum || org.hasSiliconInternet || org.hasAviationRadio || org.hasElectricNitrogen || org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 52);

                if (isEligibleHuman && org.hasDysonBiosphere === undefined) {
                    const adoptsDyson = (org.generation >= 3) || (org.hasTerraformingNetwork) || (Math.random() < 0.72);
                    org.hasDysonBiosphere = adoptsDyson;

                    if (adoptsDyson) {
                        org.dysonSwarmCaptureEfficiency = 0.80 + Math.random() * 0.18;
                        org.hasDysonSwarm = Math.random() < 0.82;
                        org.swarmTimer = Math.floor(Math.random() * 11);
                        org.isHarvestingStarlight = false;

                        org.bioDysonMetabolicYield = 0.80 + Math.random() * 0.18;
                        org.stellarEnergyMultiplier = 1.80 + Math.random() * 2.20;
                        org.hasBioDysonMetabolism = Math.random() < 0.78;
                        org.carbonTimer = Math.floor(Math.random() * 12);
                        org.isFixingStellarCarbon = false;

                        org.negentropyReversalRate = 0.80 + Math.random() * 0.18;
                        org.hasNegentropyEngine = Math.random() < 0.76;
                        org.negentropyTimer = Math.floor(Math.random() * 14);
                        org.isReversingEntropy = false;

                        org.storedDysonEnergy = 45.0 + Math.random() * 40.0;
                        org.dysonSwarmIndex = 0;
                        org.cosmicNegentropyIndex = 0;
                    }
                }

                if (org.hasDysonBiosphere) {
                    citizens++;
                    totalBio += (org.mass || 60.0);

                    // A. Dyson Swarm Capture
                    if (org.hasDysonSwarm) {
                        swarms++;
                        sumSwarm += (org.dysonSwarmCaptureEfficiency || 0.89);
                        org.swarmTimer = (org.swarmTimer || 0) + stepDt;
                        if (org.swarmTimer >= 10) {
                            org.swarmTimer = 0;
                            org.isHarvestingStarlight = true;
                            this.metrics.dysonHarvestCycles++;
                        } else if (org.swarmTimer >= 4) {
                            org.isHarvestingStarlight = false;
                        }
                    }

                    // B. Bio-Dyson Metabolism
                    if (org.hasBioDysonMetabolism) {
                        metabolisms++;
                        sumBioDyson += (org.bioDysonMetabolicYield || 0.89);
                        sumMult += (org.stellarEnergyMultiplier || 2.90);
                        org.carbonTimer = (org.carbonTimer || 0) + stepDt;
                        if (org.carbonTimer >= 9) {
                            org.carbonTimer = 0;
                            org.isFixingStellarCarbon = true;
                            this.metrics.stellarCarbonCycles++;
                            const gain = 2.25 * (org.bioDysonMetabolicYield || 0.89) * ((org.stellarEnergyMultiplier || 2.90) / 2.5);
                            org.storedDysonEnergy = Math.min(340.0, (org.storedDysonEnergy || 45.0) + gain);
                            this.metrics.storedDysonEnergy += gain * 0.08;
                            this.metrics.harvestedStellarBiomass += gain * 0.21;
                            org.energy = Math.min(org.maxEnergy || 250, (org.energy || 100) + 2.40 * (org.bioDysonMetabolicYield || 0.89));
                        } else if (org.carbonTimer >= 4) {
                            org.isFixingStellarCarbon = false;
                        }
                    }

                    // C. Cosmic Entropy Reversal
                    if (org.hasNegentropyEngine) {
                        engines++;
                        sumNeg += (org.negentropyReversalRate || 0.89);
                        org.negentropyTimer = (org.negentropyTimer || 0) + stepDt;
                        if (org.negentropyTimer >= 12) {
                            org.negentropyTimer = 0;
                            org.isReversingEntropy = true;
                            this.metrics.negentropyPulses++;
                        } else if (org.negentropyTimer >= 5) {
                            org.isReversingEntropy = false;
                        }
                    }

                    // D. Compute 193rd Channel (% DSH - Dyson Swarm & Stellar Biosphere Harvesting Index)
                    const swarmNorm = org.hasDysonSwarm ? (org.dysonSwarmCaptureEfficiency || 0.89) : 0.25;
                    const bioNorm = org.hasBioDysonMetabolism ? (org.bioDysonMetabolicYield || 0.89) : 0.25;
                    const multNorm = org.hasBioDysonMetabolism ? Math.min(1.0, 0.55 + (((org.stellarEnergyMultiplier || 2.90) - 1.8) / 2.2) * 0.45) : 0.30;
                    const dsh = Math.max(0, Math.min(100, (
                        swarmNorm * 0.42 +
                        bioNorm * 0.33 +
                        multNorm * 0.25
                    ) * 100.0));
                    org.dysonSwarmIndex = dsh;
                    sumDSH += dsh;

                    // E. Compute 194th Channel (% CER - Cosmic Entropy Reversal & Negentropy Index)
                    const negNorm = org.hasNegentropyEngine ? (org.negentropyReversalRate || 0.89) : 0.25;
                    const engNorm = org.hasBioDysonMetabolism ? Math.min(1.0, 0.60 + ((org.storedDysonEnergy || 45.0) / 340.0) * 0.40) : 0.25;
                    const syncNorm = (org.hasNegentropyEngine && org.hasDysonSwarm) ? 0.94 : (org.hasNegentropyEngine ? 0.72 : 0.20);
                    const cer = Math.max(0, Math.min(100, (
                        negNorm * 0.45 +
                        syncNorm * 0.30 +
                        engNorm * 0.25
                    ) * 100.0));
                    org.cosmicNegentropyIndex = cer;
                    sumCER += cer;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalStellarCitizens = citizens;
            this.metrics.activeDysonSwarms = swarms;
            this.metrics.activeBioDysonMetabolisms = metabolisms;
            this.metrics.activeNegentropyEngines = engines;

            this.metrics.meanSwarmEfficiency = swarms > 0 ? (sumSwarm / swarms) : 0.89;
            this.metrics.meanBioDysonYield = metabolisms > 0 ? (sumBioDyson / metabolisms) : 0.89;
            this.metrics.meanNegentropyRate = engines > 0 ? (sumNeg / engines) : 0.89;
            this.metrics.meanStellarMultiplier = metabolisms > 0 ? (sumMult / metabolisms) : 2.90;

            this.metrics.meanDSHIndex = citizens > 0 ? (sumDSH / citizens) : 0.0;
            this.metrics.meanCERIndex = citizens > 0 ? (sumCER / citizens) : 0.0;
            this.metrics.cumulativeStellarBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.DysonBiosphereManager = DysonBiosphereManager;
    if (typeof window !== "undefined") {
        window.dysonBiosphereManager = new DysonBiosphereManager();
    }
})(typeof window !== "undefined" ? window : global);
