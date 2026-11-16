// BioEcosystem - Internal Combustion Engines, Aerodynamic Aviation & Global Radio Communications
// Module: src/organs/aviation_radio.js
// Version: 14.3.0 (Hour 763 - System Agent: Otto/Diesel Torque, Fixed-Wing Aviation, Radio Broadcast & 181st/182nd Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AviationRadioManager
     * Core evolutionary, aerodynamic, and electromagnetic broadcast dynamics for Aerospace Homo sapiens:
     * 1. Internal Combustion Engine Torque:
     *    - High-energy-density Otto/Diesel liquid-fuel propulsion beyond fixed rail tracks (internalCombustionTorque: 0.80 - 0.98).
     * 2. Aerodynamic Lift & Fixed-Wing Aviation:
     *    - Long-range transcontinental aerial logistics overcoming geographic barriers (aerodynamicLiftEfficiency: 0.80 - 0.98, aerialLogisticsMultiplier: 1.8 - 3.4).
     * 3. Global Wireless Radio Communications:
     *    - Simultaneous electromagnetic coordination across mobile ground and air units (radioBroadcastBandwidth: 0.80 - 0.98).
     * 4. 181st & 182nd Telemetry Channel Indices:
     *    - 181st Channel: % ICA (Internal Combustion & Aviation Index, Aviation Blue #2563eb)
     *    - 182nd Channel: % RCI (Radio Communication & Broadcast Index, Radio Violet #9333ea)
     */
    class AviationRadioManager {
        /**
         * Initialize Internal Combustion, Aviation, and Global Radio Manager.
         */
        constructor() {
            this.metrics = {
                totalAerospaceCitizens: 0,
                activeCombustionUnits: 0,
                activeAviationUnits: 0,
                activeRadioStations: 0,
                meanCombustionTorque: 0.89,
                meanLiftEfficiency: 0.89,
                meanRadioBandwidth: 0.89,
                meanAerialMultiplier: 2.60,
                meanICAIndex: 0.0,
                meanRCIIndex: 0.0,
                enginePistonCycles: 0,
                flightSortiesCompleted: 0,
                radioTransmissionsCount: 0,
                aerialCargoStored: 0.0,
                harvestedAviationBiomass: 0.0,
                cumulativeAviationBiomass: 0.0
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
            let aviators = 0;
            let radios = 0;

            let sumTorque = 0;
            let sumLift = 0;
            let sumRadio = 0;
            let sumMult = 0;
            let sumICA = 0;
            let sumRCI = 0;
            let totalBio = 0;

            const stepDt = dt || 1.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasElectricNitrogen || org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 49);

                if (isEligibleHuman && org.hasAviationRadio === undefined) {
                    const adoptsAviation = (org.generation >= 3) || (org.hasElectricNitrogen) || (Math.random() < 0.72);
                    org.hasAviationRadio = adoptsAviation;

                    if (adoptsAviation) {
                        org.internalCombustionTorque = 0.80 + Math.random() * 0.18;
                        org.hasInternalCombustion = Math.random() < 0.80;
                        org.engineCycleTimer = Math.floor(Math.random() * 14);
                        org.isRunningEngine = false;

                        org.aerodynamicLiftEfficiency = 0.80 + Math.random() * 0.18;
                        org.aerialLogisticsMultiplier = 1.80 + Math.random() * 1.60;
                        org.hasAviation = Math.random() < 0.76;
                        org.flightSortieTimer = Math.floor(Math.random() * 16);
                        org.isFlyingAircraft = false;

                        org.radioBroadcastBandwidth = 0.80 + Math.random() * 0.18;
                        org.hasRadioNetwork = Math.random() < 0.78;
                        org.radioTxTimer = Math.floor(Math.random() * 12);
                        org.isBroadcastingRadio = false;

                        org.storedAerialCargo = 28.0 + Math.random() * 32.0;
                        org.aviationRadioIndex = 0;
                        org.radioCommunicationIndex = 0;
                    }
                }

                if (org.hasAviationRadio) {
                    citizens++;
                    totalBio += (org.mass || 48.0);

                    // A. Internal Combustion Engine Torque
                    if (org.hasInternalCombustion) {
                        engines++;
                        sumTorque += (org.internalCombustionTorque || 0.89);
                        org.engineCycleTimer = (org.engineCycleTimer || 0) + stepDt;
                        if (org.engineCycleTimer >= 11) {
                            org.engineCycleTimer = 0;
                            org.isRunningEngine = true;
                            this.metrics.enginePistonCycles++;
                            org.energy = Math.min(org.maxEnergy || 220, (org.energy || 100) + 1.85 * (org.internalCombustionTorque || 0.89));
                        } else if (org.engineCycleTimer >= 5) {
                            org.isRunningEngine = false;
                        }
                    }

                    // B. Aerodynamic Lift & Fixed-Wing Aviation
                    if (org.hasAviation) {
                        aviators++;
                        sumLift += (org.aerodynamicLiftEfficiency || 0.89);
                        sumMult += (org.aerialLogisticsMultiplier || 2.60);
                        org.flightSortieTimer = (org.flightSortieTimer || 0) + stepDt;
                        if (org.flightSortieTimer >= 13) {
                            org.flightSortieTimer = 0;
                            org.isFlyingAircraft = true;
                            this.metrics.flightSortiesCompleted++;
                            const cargoGain = 1.65 * (org.aerodynamicLiftEfficiency || 0.89) * ((org.aerialLogisticsMultiplier || 2.60) / 2.2);
                            org.storedAerialCargo = Math.min(200.0, (org.storedAerialCargo || 28.0) + cargoGain);
                            this.metrics.aerialCargoStored += cargoGain * 0.08;
                            this.metrics.harvestedAviationBiomass += cargoGain * 0.18;
                        } else if (org.flightSortieTimer >= 6) {
                            org.isFlyingAircraft = false;
                        }
                    }

                    // C. Global Wireless Radio Communications
                    if (org.hasRadioNetwork) {
                        radios++;
                        sumRadio += (org.radioBroadcastBandwidth || 0.89);
                        org.radioTxTimer = (org.radioTxTimer || 0) + stepDt;
                        if (org.radioTxTimer >= 9) {
                            org.radioTxTimer = 0;
                            org.isBroadcastingRadio = true;
                            this.metrics.radioTransmissionsCount++;
                        } else if (org.radioTxTimer >= 4) {
                            org.isBroadcastingRadio = false;
                        }
                    }

                    // D. Compute 181st Channel (% ICA - Internal Combustion & Aviation Index)
                    const torqueNorm = org.hasInternalCombustion ? (org.internalCombustionTorque || 0.89) : 0.25;
                    const liftNorm = org.hasAviation ? (org.aerodynamicLiftEfficiency || 0.89) : 0.25;
                    const multNorm = org.hasAviation ? Math.min(1.0, 0.55 + (((org.aerialLogisticsMultiplier || 2.60) - 1.8) / 1.6) * 0.45) : 0.30;
                    const ica = Math.max(0, Math.min(100, (
                        torqueNorm * 0.38 +
                        liftNorm * 0.37 +
                        multNorm * 0.25
                    ) * 100.0));
                    org.aviationCombustionIndex = ica;
                    sumICA += ica;

                    // E. Compute 182nd Channel (% RCI - Radio Communication & Broadcast Index)
                    const bandNorm = org.hasRadioNetwork ? (org.radioBroadcastBandwidth || 0.89) : 0.25;
                    const cargoNorm = org.hasAviation ? Math.min(1.0, 0.60 + ((org.storedAerialCargo || 28.0) / 200.0) * 0.40) : 0.25;
                    const syncNorm = (org.hasRadioNetwork && org.hasInternalCombustion) ? 0.92 : (org.hasRadioNetwork ? 0.72 : 0.20);
                    const rci = Math.max(0, Math.min(100, (
                        bandNorm * 0.45 +
                        syncNorm * 0.30 +
                        cargoNorm * 0.25
                    ) * 100.0));
                    org.radioCommunicationIndex = rci;
                    sumRCI += rci;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalAerospaceCitizens = citizens;
            this.metrics.activeCombustionUnits = engines;
            this.metrics.activeAviationUnits = aviators;
            this.metrics.activeRadioStations = radios;

            this.metrics.meanCombustionTorque = engines > 0 ? (sumTorque / engines) : 0.89;
            this.metrics.meanLiftEfficiency = aviators > 0 ? (sumLift / aviators) : 0.89;
            this.metrics.meanRadioBandwidth = radios > 0 ? (sumRadio / radios) : 0.89;
            this.metrics.meanAerialMultiplier = aviators > 0 ? (sumMult / aviators) : 2.60;

            this.metrics.meanICAIndex = citizens > 0 ? (sumICA / citizens) : 0.0;
            this.metrics.meanRCIIndex = citizens > 0 ? (sumRCI / citizens) : 0.0;
            this.metrics.cumulativeAviationBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.AviationRadioManager = AviationRadioManager;
    if (typeof window !== "undefined") {
        window.aviationRadioManager = new AviationRadioManager();
    }
})(typeof window !== "undefined" ? window : global);
