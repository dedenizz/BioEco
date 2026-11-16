// BioEcosystem - Industrial Revolution Steam Power, Coke-Fired Steel & Rail Logistics
// Module: src/organs/industrial_steam.js
// Version: 13.3.0 (Hour 753 - System Agent: Separate-Condenser Steam Engines, Coke Blast Steel, Rail Freight Logistics & 177th/178th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IndustrialSteamManager
     * Core evolutionary, thermodynamic, and industrial logistics dynamics for Industrial Homo sapiens:
     * 1. Coal-Fired Separate-Condenser Steam Engines:
     *    - Weather-independent continuous mechanical torque from coal combustion (steamEngineThermodynamics: 0.80 - 0.98).
     * 2. Coke-Fired Blast Furnaces & Converter Steel:
     *    - Mass-produced structural steel rails, boilers, and precision machine parts (cokeSteelProduction: 0.80 - 0.98).
     * 3. Steam Locomotives & Continental Rail Freight:
     *    - High-tonnage overland freight of coal, iron ore, and grain (railFreightCapacity: 0.80 - 0.98, industrialLogisticsMultiplier: 1.8 - 3.2).
     * 4. 177th & 178th Telemetry Channel Indices:
     *    - 177th Channel: % STI (Steam & Thermodynamic Power Index, Steam Crimson #dc2626)
     *    - 178th Channel: % RLI (Rail Logistics & Industrial Index, Rail Steel #475569)
     */
    class IndustrialSteamManager {
        /**
         * Initialize Industrial Steam, Steel, and Rail Logistics Manager.
         */
        constructor() {
            this.metrics = {
                totalIndustrialCitizens: 0,
                activeSteamEngines: 0,
                activeSteelConverters: 0,
                activeRailLocomotives: 0,
                meanSteamThermodynamics: 0.89,
                meanCokeSteel: 0.89,
                meanRailCapacity: 0.89,
                meanLogisticsMultiplier: 2.50,
                meanSTIIndex: 0.0,
                meanRLIIndex: 0.0,
                steamBoilerCycles: 0,
                steelTonsPoured: 0,
                railFreightDeliveries: 0,
                industrialDepotStored: 0.0,
                harvestedIndustrialBiomass: 0.0,
                cumulativeIndustrialBiomass: 0.0
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
            let engines = 0;
            let converters = 0;
            let locomotives = 0;

            let sumSteam = 0;
            let sumSteel = 0;
            let sumRail = 0;
            let sumMult = 0;

            let sumSTI = 0;
            let sumRLI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 46);

                if (isEligibleHuman && org.hasIndustrialSteam === undefined) {
                    const adoptsIndustrial = Math.random() < 0.65;
                    org.hasIndustrialSteam = adoptsIndustrial;

                    if (adoptsIndustrial) {
                        // 1. Separate-Condenser Steam Engines
                        org.hasSteamEngine = Math.random() < 0.78;
                        org.steamEngineThermodynamics = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.boilerPressureLevel = 2 + Math.floor(Math.random() * 5);
                        org.isSteamingPiston = false;

                        // 2. Coke-Fired Blast Steel
                        org.hasCokeSteel = Math.random() < 0.76;
                        org.cokeSteelProduction = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isPouringSteel = false;

                        // 3. Steam Locomotives & Rail Freight
                        org.hasRailLogistics = Math.random() < 0.76;
                        org.railFreightCapacity = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.industrialLogisticsMultiplier = 1.8 + Math.random() * 1.4; // 1.8 - 3.2
                        org.storedIndustrialSurplus = 24.0 + Math.random() * 36.0;
                        org.isRunningLocomotive = false;

                        // Telemetry Channel Indices
                        org.steamThermodynamicIndex = 0.0;
                        org.railLogisticsIndex = 0.0;
                    }
                }

                if (org.hasIndustrialSteam) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 44.0;

                    // A. Steam Engine Thermodynamics
                    if (org.hasSteamEngine) {
                        engines++;
                        sumSteam += org.steamEngineThermodynamics || 0.89;

                        if (Math.random() < 0.020) {
                            org.isSteamingPiston = true;
                            org.boilerPressureLevel = Math.min(55, (org.boilerPressureLevel || 2) + 1);
                            this.metrics.steamBoilerCycles++;
                            const steamYield = (org.steamEngineThermodynamics || 0.89) * 2.15;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + steamYield);
                            this.metrics.harvestedIndustrialBiomass += steamYield;
                        } else {
                            org.isSteamingPiston = false;
                        }
                    }

                    // B. Coke-Fired Blast Steel Production
                    if (org.hasCokeSteel) {
                        converters++;
                        sumSteel += org.cokeSteelProduction || 0.89;

                        if (Math.random() < 0.020) {
                            org.isPouringSteel = true;
                            this.metrics.steelTonsPoured++;
                            const steelYield = (org.cokeSteelProduction || 0.89) * 2.30;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + steelYield);
                            org.storedIndustrialSurplus = Math.min(150.0, (org.storedIndustrialSurplus || 24.0) + steelYield * 0.45);
                            this.metrics.harvestedIndustrialBiomass += steelYield;
                        } else {
                            org.isPouringSteel = false;
                        }
                    }

                    // C. Steam Locomotive & Rail Freight Logistics
                    if (org.hasRailLogistics) {
                        locomotives++;
                        sumRail += org.railFreightCapacity || 0.89;
                        sumMult += org.industrialLogisticsMultiplier || 2.50;

                        if (Math.random() < 0.022) {
                            org.isRunningLocomotive = true;
                            this.metrics.railFreightDeliveries++;
                            const railYield = (org.railFreightCapacity || 0.89) * (org.industrialLogisticsMultiplier || 2.50) * 1.05;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + railYield);
                            org.storedIndustrialSurplus = Math.min(150.0, (org.storedIndustrialSurplus || 24.0) + railYield * 0.50);
                            this.metrics.industrialDepotStored += railYield * 0.50;
                            this.metrics.harvestedIndustrialBiomass += railYield;
                        } else {
                            org.isRunningLocomotive = false;
                        }

                        // Emergency draw from industrial rail depot during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedIndustrialSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedIndustrialSurplus, 8.5);
                            org.storedIndustrialSurplus -= draw;
                            org.energy += draw * 0.98;
                        }
                    }

                    // D. Compute 177th Channel (% STI - Steam & Thermodynamic Power Index)
                    const steamNorm = org.hasSteamEngine ? (org.steamEngineThermodynamics || 0.89) : 0.25;
                    const steelNorm = org.hasCokeSteel ? (org.cokeSteelProduction || 0.89) : 0.25;
                    const boilerNorm = org.hasSteamEngine ? Math.min(1.0, 0.72 + (org.boilerPressureLevel || 2) * 0.025) : 0.20;
                    const sti = Math.max(0, Math.min(100, (
                        steamNorm * 0.40 +
                        steelNorm * 0.35 +
                        boilerNorm * 0.25
                    ) * 100.0));
                    org.steamThermodynamicIndex = sti;
                    sumSTI += sti;

                    // E. Compute 178th Channel (% RLI - Rail Logistics & Industrial Index)
                    const railNorm = org.hasRailLogistics ? (org.railFreightCapacity || 0.89) : 0.25;
                    const multNorm = org.hasRailLogistics ? Math.min(1.0, 0.55 + (((org.industrialLogisticsMultiplier || 2.50) - 1.8) / 1.4) * 0.45) : 0.30;
                    const surpNorm = org.hasRailLogistics ? Math.min(1.0, 0.65 + ((org.storedIndustrialSurplus || 24.0) / 150.0) * 0.35) : 0.25;
                    const rli = Math.max(0, Math.min(100, (
                        railNorm * 0.35 +
                        surpNorm * 0.35 +
                        multNorm * 0.30
                    ) * 100.0));
                    org.railLogisticsIndex = rli;
                    sumRLI += rli;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalIndustrialCitizens = citizens;
            this.metrics.activeSteamEngines = engines;
            this.metrics.activeSteelConverters = converters;
            this.metrics.activeRailLocomotives = locomotives;

            this.metrics.meanSteamThermodynamics = engines > 0 ? (sumSteam / engines) : 0.89;
            this.metrics.meanCokeSteel = converters > 0 ? (sumSteel / converters) : 0.89;
            this.metrics.meanRailCapacity = locomotives > 0 ? (sumRail / locomotives) : 0.89;
            this.metrics.meanLogisticsMultiplier = locomotives > 0 ? (sumMult / locomotives) : 2.50;

            this.metrics.meanSTIIndex = citizens > 0 ? (sumSTI / citizens) : 0.0;
            this.metrics.meanRLIIndex = citizens > 0 ? (sumRLI / citizens) : 0.0;
            this.metrics.cumulativeIndustrialBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.IndustrialSteamManager = IndustrialSteamManager;
    if (typeof window !== "undefined") {
        window.industrialSteamManager = new IndustrialSteamManager();
    }
})(typeof window !== "undefined" ? window : global);
