// BioEcosystem - Orbital Habitats, Asteroid Mining & Closed-Loop Space Ecology
// Module: src/organs/orbital_ecology.js
// Version: 16.3.0 (Hour 783 - System Agent: Microgravity Bioreactors, Closed-Loop Gas Recovery, Asteroid Mineral Synthesis & 189th/190th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OrbitalEcologyManager
     * Core space-ecology, closed-loop life-support, and asteroid-resource dynamics for Orbital Citizens:
     * 1. Microgravity Bioreactor Efficiency:
     *    - Suspended zero-g cellular culture and homogeneous nutrient diffusion (microgravityBioreactorEfficiency: 0.80 - 0.98).
     * 2. Closed-Loop Gas & Water Recovery:
     *    - Photosynthetic algae-bacteria consortia regenerating O2/CO2 (closedLoopGasRecovery: 0.80 - 0.98, orbitalSynthesisMultiplier: 1.8 - 4.0).
     * 3. Asteroid Mineral Mining:
     *    - Carbonaceous chondrite & metallic regolith extraction of P, N, and trace metals (asteroidMineralYield: 0.80 - 0.98).
     * 4. 189th & 190th Telemetry Channel Indices:
     *    - 189th Channel: % OHE (Orbital Habitat & Microgravity Ecology Index, Orbital Sky #38bdf8)
     *    - 190th Channel: % AMR (Asteroid Mining & Closed-Loop Resource Index, Asteroid Amber #f59e0b)
     */
    class OrbitalEcologyManager {
        /**
         * Initialize Orbital Habitats, Asteroid Mining & Closed-Loop Space Ecology Manager.
         */
        constructor() {
            this.metrics = {
                totalOrbitalCitizens: 0,
                activeMicrogravityBioreactors: 0,
                activeClosedLoopHabitats: 0,
                activeAsteroidMiners: 0,
                meanBioreactorEfficiency: 0.89,
                meanGasRecovery: 0.89,
                meanAsteroidYield: 0.89,
                meanOrbitalMultiplier: 2.90,
                meanOHEIndex: 0.0,
                meanAMRIndex: 0.0,
                bioreactorCultureCycles: 0,
                gasRecoveryCycles: 0,
                asteroidExtractions: 0,
                storedOrbitalMinerals: 0.0,
                harvestedOrbitalBiomass: 0.0,
                cumulativeOrbitalBiomass: 0.0
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
            let bioreactors = 0;
            let closedLoops = 0;
            let miners = 0;

            let sumBioEff = 0;
            let sumGasRec = 0;
            let sumAstYield = 0;
            let sumMult = 0;
            let sumOHE = 0;
            let sumAMR = 0;
            let totalBio = 0;

            const stepDt = dt || 1.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasSyntheticCrispr || org.hasNeuralQuantum || org.hasSiliconInternet || org.hasAviationRadio || org.hasElectricNitrogen || org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 52);

                if (isEligibleHuman && org.hasOrbitalEcology === undefined) {
                    const adoptsOrbital = (org.generation >= 3) || (org.hasSyntheticCrispr) || (Math.random() < 0.72);
                    org.hasOrbitalEcology = adoptsOrbital;

                    if (adoptsOrbital) {
                        org.microgravityBioreactorEfficiency = 0.80 + Math.random() * 0.18;
                        org.hasMicrogravityBioreactor = Math.random() < 0.82;
                        org.bioreactorTimer = Math.floor(Math.random() * 11);
                        org.isCulturingOrbit = false;

                        org.closedLoopGasRecovery = 0.80 + Math.random() * 0.18;
                        org.orbitalSynthesisMultiplier = 1.80 + Math.random() * 2.20;
                        org.hasClosedLoopEcology = Math.random() < 0.78;
                        org.gasRecoveryTimer = Math.floor(Math.random() * 12);
                        org.isRecyclingAtmosphere = false;

                        org.asteroidMineralYield = 0.80 + Math.random() * 0.18;
                        org.hasAsteroidMining = Math.random() < 0.76;
                        org.miningTimer = Math.floor(Math.random() * 14);
                        org.isExtractingRegolith = false;

                        org.storedOrbitalMinerals = 40.0 + Math.random() * 36.0;
                        org.orbitalHabitatIndex = 0;
                        org.asteroidMiningIndex = 0;
                    }
                }

                if (org.hasOrbitalEcology) {
                    citizens++;
                    totalBio += (org.mass || 56.0);

                    // A. Microgravity Bioreactor Culture
                    if (org.hasMicrogravityBioreactor) {
                        bioreactors++;
                        sumBioEff += (org.microgravityBioreactorEfficiency || 0.89);
                        org.bioreactorTimer = (org.bioreactorTimer || 0) + stepDt;
                        if (org.bioreactorTimer >= 10) {
                            org.bioreactorTimer = 0;
                            org.isCulturingOrbit = true;
                            this.metrics.bioreactorCultureCycles++;
                        } else if (org.bioreactorTimer >= 4) {
                            org.isCulturingOrbit = false;
                        }
                    }

                    // B. Closed-Loop Gas & Water Recovery
                    if (org.hasClosedLoopEcology) {
                        closedLoops++;
                        sumGasRec += (org.closedLoopGasRecovery || 0.89);
                        sumMult += (org.orbitalSynthesisMultiplier || 2.90);
                        org.gasRecoveryTimer = (org.gasRecoveryTimer || 0) + stepDt;
                        if (org.gasRecoveryTimer >= 9) {
                            org.gasRecoveryTimer = 0;
                            org.isRecyclingAtmosphere = true;
                            this.metrics.gasRecoveryCycles++;
                            const gain = 2.05 * (org.closedLoopGasRecovery || 0.89) * ((org.orbitalSynthesisMultiplier || 2.90) / 2.5);
                            org.storedOrbitalMinerals = Math.min(300.0, (org.storedOrbitalMinerals || 40.0) + gain);
                            this.metrics.storedOrbitalMinerals += gain * 0.08;
                            this.metrics.harvestedOrbitalBiomass += gain * 0.19;
                            org.energy = Math.min(org.maxEnergy || 240, (org.energy || 100) + 2.20 * (org.closedLoopGasRecovery || 0.89));
                        } else if (org.gasRecoveryTimer >= 4) {
                            org.isRecyclingAtmosphere = false;
                        }
                    }

                    // C. Asteroid Mineral Mining
                    if (org.hasAsteroidMining) {
                        miners++;
                        sumAstYield += (org.asteroidMineralYield || 0.89);
                        org.miningTimer = (org.miningTimer || 0) + stepDt;
                        if (org.miningTimer >= 12) {
                            org.miningTimer = 0;
                            org.isExtractingRegolith = true;
                            this.metrics.asteroidExtractions++;
                        } else if (org.miningTimer >= 5) {
                            org.isExtractingRegolith = false;
                        }
                    }

                    // D. Compute 189th Channel (% OHE - Orbital Habitat & Microgravity Ecology Index)
                    const bioNorm = org.hasMicrogravityBioreactor ? (org.microgravityBioreactorEfficiency || 0.89) : 0.25;
                    const gasNorm = org.hasClosedLoopEcology ? (org.closedLoopGasRecovery || 0.89) : 0.25;
                    const multNorm = org.hasClosedLoopEcology ? Math.min(1.0, 0.55 + (((org.orbitalSynthesisMultiplier || 2.90) - 1.8) / 2.2) * 0.45) : 0.30;
                    const ohe = Math.max(0, Math.min(100, (
                        bioNorm * 0.42 +
                        gasNorm * 0.33 +
                        multNorm * 0.25
                    ) * 100.0));
                    org.orbitalHabitatIndex = ohe;
                    sumOHE += ohe;

                    // E. Compute 190th Channel (% AMR - Asteroid Mining & Closed-Loop Resource Index)
                    const astNorm = org.hasAsteroidMining ? (org.asteroidMineralYield || 0.89) : 0.25;
                    const minNorm = org.hasClosedLoopEcology ? Math.min(1.0, 0.60 + ((org.storedOrbitalMinerals || 40.0) / 300.0) * 0.40) : 0.25;
                    const syncNorm = (org.hasAsteroidMining && org.hasMicrogravityBioreactor) ? 0.94 : (org.hasAsteroidMining ? 0.72 : 0.20);
                    const amr = Math.max(0, Math.min(100, (
                        astNorm * 0.45 +
                        syncNorm * 0.30 +
                        minNorm * 0.25
                    ) * 100.0));
                    org.asteroidMiningIndex = amr;
                    sumAMR += amr;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalOrbitalCitizens = citizens;
            this.metrics.activeMicrogravityBioreactors = bioreactors;
            this.metrics.activeClosedLoopHabitats = closedLoops;
            this.metrics.activeAsteroidMiners = miners;

            this.metrics.meanBioreactorEfficiency = bioreactors > 0 ? (sumBioEff / bioreactors) : 0.89;
            this.metrics.meanGasRecovery = closedLoops > 0 ? (sumGasRec / closedLoops) : 0.89;
            this.metrics.meanAsteroidYield = miners > 0 ? (sumAstYield / miners) : 0.89;
            this.metrics.meanOrbitalMultiplier = closedLoops > 0 ? (sumMult / closedLoops) : 2.90;

            this.metrics.meanOHEIndex = citizens > 0 ? (sumOHE / citizens) : 0.0;
            this.metrics.meanAMRIndex = citizens > 0 ? (sumAMR / citizens) : 0.0;
            this.metrics.cumulativeOrbitalBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.OrbitalEcologyManager = OrbitalEcologyManager;
    if (typeof window !== "undefined") {
        window.orbitalEcologyManager = new OrbitalEcologyManager();
    }
})(typeof window !== "undefined" ? window : global);
