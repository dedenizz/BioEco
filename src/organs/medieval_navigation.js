// BioEcosystem - Medieval Windmills, Heavy Mouldboard Plough & Magnetic Compass Navigation
// Module: src/organs/medieval_navigation.js
// Version: 12.3.0 (Hour 743 - System Agent: Aerodynamic Windmills, Heavy Mouldboard Ploughs, Magnetic Compass Navigation & 173rd/174th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MedievalNavigationManager
     * Core evolutionary, aerodynamic, and oceanic navigation dynamics for Medieval Homo sapiens:
     * 1. Aerodynamic Tower & Post Windmills:
     *    - River-independent wind torque for grain milling and lowland drainage (windmillAerodynamicPower: 0.80 - 0.98).
     * 2. Heavy Wheeled Mouldboard Plough:
     *    - Iron coulter & mouldboard turning heavy northern clay soils (mouldboardPloughTillage: 0.80 - 0.98).
     * 3. Magnetic Compass & Oceanic Sternpost Rudder:
     *    - All-weather pelagic navigation independent of coastal sight or clear skies (magneticCompassNavigation: 0.80 - 0.98, oceanicVoyageRange: 2.5 - 4.0).
     * 4. 173rd & 174th Telemetry Channel Indices:
     *    - 173rd Channel: % WMI (Windmill & Mouldboard Plough Index, Windmill Amber #ca8a04)
     *    - 174th Channel: % CNI (Compass Navigation & Oceanic Trade Index, Compass Cobalt #1d4ed8)
     */
    class MedievalNavigationManager {
        /**
         * Initialize Medieval Windmills, Heavy Plough, and Compass Navigation Manager.
         */
        constructor() {
            this.metrics = {
                totalMedievalCitizens: 0,
                activeWindmills: 0,
                activeMouldboardPloughs: 0,
                activeCompassNavigators: 0,
                meanWindmillPower: 0.89,
                meanMouldboardTillage: 0.89,
                meanCompassNavigation: 0.89,
                meanOceanicRange: 3.25,
                meanWMIIndex: 0.0,
                meanCNIIndex: 0.0,
                windmillGrainMilled: 0,
                clayAcresPloughed: 0,
                oceanicVoyagesCompleted: 0,
                medievalGranaryStored: 0.0,
                harvestedMedievalBiomass: 0.0,
                cumulativeMedievalBiomass: 0.0
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
            let windmills = 0;
            let ploughs = 0;
            let navigators = 0;

            let sumWind = 0;
            let sumPlough = 0;
            let sumComp = 0;
            let sumRange = 0;

            let sumWMI = 0;
            let sumCNI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 42);

                if (isEligibleHuman && org.hasMedievalNavigation === undefined) {
                    const adoptsMedieval = Math.random() < 0.65;
                    org.hasMedievalNavigation = adoptsMedieval;

                    if (adoptsMedieval) {
                        // 1. Aerodynamic Windmills
                        org.hasWindmill = Math.random() < 0.78;
                        org.windmillAerodynamicPower = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.windmillBatches = 2 + Math.floor(Math.random() * 5);
                        org.isSpinningWindmill = false;

                        // 2. Heavy Wheeled Mouldboard Plough
                        org.hasMouldboardPlough = Math.random() < 0.76;
                        org.mouldboardPloughTillage = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isTurningSod = false;

                        // 3. Magnetic Compass & Oceanic Navigation
                        org.hasMagneticCompass = Math.random() < 0.76;
                        org.magneticCompassNavigation = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.oceanicVoyageRange = 2.5 + Math.random() * 1.5; // 2.5 - 4.0
                        org.storedMedievalSurplus = 20.0 + Math.random() * 34.0;
                        org.isNavigatingCompass = false;

                        // Telemetry Channel Indices
                        org.windmillMouldboardIndex = 0.0;
                        org.compassNavigationIndex = 0.0;
                    }
                }

                if (org.hasMedievalNavigation) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 40.0;

                    // A. Aerodynamic Windmill Milling & Drainage
                    if (org.hasWindmill) {
                        windmills++;
                        sumWind += org.windmillAerodynamicPower || 0.89;

                        if (Math.random() < 0.019) {
                            org.isSpinningWindmill = true;
                            org.windmillBatches = Math.min(45, (org.windmillBatches || 2) + 1);
                            this.metrics.windmillGrainMilled++;
                            const windBonus = (org.windmillAerodynamicPower || 0.89) * 1.95;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + windBonus);
                            this.metrics.harvestedMedievalBiomass += windBonus;
                        } else {
                            org.isSpinningWindmill = false;
                        }
                    }

                    // B. Heavy Wheeled Mouldboard Plough Deep Clay Tillage
                    if (org.hasMouldboardPlough) {
                        ploughs++;
                        sumPlough += org.mouldboardPloughTillage || 0.89;

                        if (Math.random() < 0.020) {
                            org.isTurningSod = true;
                            this.metrics.clayAcresPloughed++;
                            const clayYield = (org.mouldboardPloughTillage || 0.89) * 2.25;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + clayYield);
                            org.storedMedievalSurplus = Math.min(130.0, (org.storedMedievalSurplus || 20.0) + clayYield * 0.45);
                            this.metrics.harvestedMedievalBiomass += clayYield;
                        } else {
                            org.isTurningSod = false;
                        }
                    }

                    // C. Magnetic Compass Oceanic Trade Voyages
                    if (org.hasMagneticCompass) {
                        navigators++;
                        sumComp += org.magneticCompassNavigation || 0.89;
                        sumRange += org.oceanicVoyageRange || 3.25;

                        if (Math.random() < 0.022) {
                            org.isNavigatingCompass = true;
                            this.metrics.oceanicVoyagesCompleted++;
                            const seaYield = (org.magneticCompassNavigation || 0.89) * (org.oceanicVoyageRange || 3.25) * 0.95;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + seaYield);
                            org.storedMedievalSurplus = Math.min(130.0, (org.storedMedievalSurplus || 20.0) + seaYield * 0.50);
                            this.metrics.medievalGranaryStored += seaYield * 0.50;
                            this.metrics.harvestedMedievalBiomass += seaYield;
                        } else {
                            org.isNavigatingCompass = false;
                        }

                        // Emergency draw from medieval port granary during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedMedievalSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedMedievalSurplus, 7.5);
                            org.storedMedievalSurplus -= draw;
                            org.energy += draw * 0.98;
                        }
                    }

                    // D. Compute 173rd Channel (% WMI - Windmill & Mouldboard Plough Index)
                    const windNorm = org.hasWindmill ? (org.windmillAerodynamicPower || 0.89) : 0.25;
                    const ploughNorm = org.hasMouldboardPlough ? (org.mouldboardPloughTillage || 0.89) : 0.25;
                    const millNorm = org.hasWindmill ? Math.min(1.0, 0.72 + (org.windmillBatches || 2) * 0.025) : 0.20;
                    const wmi = Math.max(0, Math.min(100, (
                        windNorm * 0.40 +
                        ploughNorm * 0.35 +
                        millNorm * 0.25
                    ) * 100.0));
                    org.windmillMouldboardIndex = wmi;
                    sumWMI += wmi;

                    // E. Compute 174th Channel (% CNI - Compass Navigation & Oceanic Trade Index)
                    const compNorm = org.hasMagneticCompass ? (org.magneticCompassNavigation || 0.89) : 0.25;
                    const rangeNorm = org.hasMagneticCompass ? Math.min(1.0, 0.55 + (((org.oceanicVoyageRange || 3.25) - 2.5) / 1.5) * 0.45) : 0.30;
                    const surpNorm = org.hasMagneticCompass ? Math.min(1.0, 0.65 + ((org.storedMedievalSurplus || 20.0) / 130.0) * 0.35) : 0.25;
                    const cni = Math.max(0, Math.min(100, (
                        compNorm * 0.35 +
                        surpNorm * 0.35 +
                        rangeNorm * 0.30
                    ) * 100.0));
                    org.compassNavigationIndex = cni;
                    sumCNI += cni;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalMedievalCitizens = citizens;
            this.metrics.activeWindmills = windmills;
            this.metrics.activeMouldboardPloughs = ploughs;
            this.metrics.activeCompassNavigators = navigators;

            this.metrics.meanWindmillPower = windmills > 0 ? (sumWind / windmills) : 0.89;
            this.metrics.meanMouldboardTillage = ploughs > 0 ? (sumPlough / ploughs) : 0.89;
            this.metrics.meanCompassNavigation = navigators > 0 ? (sumComp / navigators) : 0.89;
            this.metrics.meanOceanicRange = navigators > 0 ? (sumRange / navigators) : 3.25;

            this.metrics.meanWMIIndex = citizens > 0 ? (sumWMI / citizens) : 0.0;
            this.metrics.meanCNIIndex = citizens > 0 ? (sumCNI / citizens) : 0.0;
            this.metrics.cumulativeMedievalBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.MedievalNavigationManager = MedievalNavigationManager;
    if (typeof window !== "undefined") {
        window.medievalNavigationManager = new MedievalNavigationManager();
    }
})(typeof window !== "undefined" ? window : global);
