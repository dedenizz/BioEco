// BioEcosystem - Renaissance Printing Press, Mechanical Clockwork & Empirical Astronomy
// Module: src/organs/renaissance_printing.js
// Version: 12.8.0 (Hour 748 - System Agent: Movable Metal-Type Printing, Escapement Clockwork, Optical Telescopes & 175th/176th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * RenaissancePrintingManager
     * Core evolutionary, cognitive, and horological dynamics for Renaissance Homo sapiens:
     * 1. Movable Metal-Type Printing Press:
     *    - Rapid replication of scientific treatises, star charts, and agronomic manuals (movableTypePrintingRate: 0.80 - 0.98, knowledgeDiffusionMultiplier: 1.5 - 2.6).
     * 2. Escapement Mechanical Clockwork:
     *    - Verge-and-foliot & spring-driven horology synchronizing urban craft and astronomical timing (mechanicalClockPrecision: 0.80 - 0.98).
     * 3. Refracting Optical Telescope & Empirical Astronomy:
     *    - Direct celestial observation for longitude/latitude ephemerides and scientific method (opticalTelescopeResolution: 0.80 - 0.98).
     * 4. 175th & 176th Telemetry Channel Indices:
     *    - 175th Channel: % PPI (Printing Press & Knowledge Diffusion Index, Press Purple #9333ea)
     *    - 176th Channel: % CAI (Clockwork & Astronomical Navigation Index, Astronomy Gold #eab308)
     */
    class RenaissancePrintingManager {
        /**
         * Initialize Renaissance Printing, Clockwork, and Astronomy Manager.
         */
        constructor() {
            this.metrics = {
                totalRenaissanceScholars: 0,
                activePrintingPresses: 0,
                activeMechanicalClocks: 0,
                activeObservatories: 0,
                meanPrintingRate: 0.89,
                meanDiffusionMultiplier: 2.05,
                meanClockPrecision: 0.89,
                meanTelescopeResolution: 0.89,
                meanPPIIndex: 0.0,
                meanCAIIndex: 0.0,
                treatisesPrinted: 0,
                clockworkSyncTicks: 0,
                celestialObservations: 0,
                renaissanceArchiveStored: 0.0,
                harvestedRenaissanceBiomass: 0.0,
                cumulativeRenaissanceBiomass: 0.0
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

            let scholars = 0;
            let presses = 0;
            let clocks = 0;
            let observatories = 0;

            let sumPrint = 0;
            let sumDiff = 0;
            let sumClock = 0;
            let sumTele = 0;

            let sumPPI = 0;
            let sumCAI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 44);

                if (isEligibleHuman && org.hasRenaissancePrinting === undefined) {
                    const adoptsRenaissance = Math.random() < 0.65;
                    org.hasRenaissancePrinting = adoptsRenaissance;

                    if (adoptsRenaissance) {
                        // 1. Movable Metal-Type Printing Press
                        org.hasPrintingPress = Math.random() < 0.78;
                        org.movableTypePrintingRate = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.knowledgeDiffusionMultiplier = 1.5 + Math.random() * 1.1; // 1.5 - 2.6
                        org.printedTreatises = 2 + Math.floor(Math.random() * 5);
                        org.isPrintingBooks = false;

                        // 2. Escapement Mechanical Clockwork
                        org.hasMechanicalClock = Math.random() < 0.76;
                        org.mechanicalClockPrecision = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isSynchronizingClock = false;

                        // 3. Refracting Optical Telescope & Empirical Astronomy
                        org.hasOpticalTelescope = Math.random() < 0.76;
                        org.opticalTelescopeResolution = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.storedRenaissanceSurplus = 22.0 + Math.random() * 35.0;
                        org.isObservingCosmos = false;

                        // Telemetry Channel Indices
                        org.printingPressIndex = 0.0;
                        org.clockworkAstronomyIndex = 0.0;
                    }
                }

                if (org.hasRenaissancePrinting) {
                    scholars++;
                    totalBio += (org.mass || 1.0) * 42.0;

                    // A. Movable Metal-Type Printing Press
                    if (org.hasPrintingPress) {
                        presses++;
                        sumPrint += org.movableTypePrintingRate || 0.89;
                        sumDiff += org.knowledgeDiffusionMultiplier || 2.05;

                        if (Math.random() < 0.019) {
                            org.isPrintingBooks = true;
                            org.printedTreatises = Math.min(50, (org.printedTreatises || 2) + 1);
                            this.metrics.treatisesPrinted++;
                            const pressYield = (org.movableTypePrintingRate || 0.89) * (org.knowledgeDiffusionMultiplier || 2.05) * 1.15;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + pressYield);
                            this.metrics.harvestedRenaissanceBiomass += pressYield;
                        } else {
                            org.isPrintingBooks = false;
                        }
                    }

                    // B. Escapement Mechanical Clockwork
                    if (org.hasMechanicalClock) {
                        clocks++;
                        sumClock += org.mechanicalClockPrecision || 0.89;

                        if (Math.random() < 0.020) {
                            org.isSynchronizingClock = true;
                            this.metrics.clockworkSyncTicks++;
                            const clockYield = (org.mechanicalClockPrecision || 0.89) * 2.20;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + clockYield);
                            org.storedRenaissanceSurplus = Math.min(140.0, (org.storedRenaissanceSurplus || 22.0) + clockYield * 0.45);
                            this.metrics.harvestedRenaissanceBiomass += clockYield;
                        } else {
                            org.isSynchronizingClock = false;
                        }
                    }

                    // C. Refracting Optical Telescope & Empirical Astronomy
                    if (org.hasOpticalTelescope) {
                        observatories++;
                        sumTele += org.opticalTelescopeResolution || 0.89;

                        if (Math.random() < 0.022) {
                            org.isObservingCosmos = true;
                            this.metrics.celestialObservations++;
                            const astroYield = (org.opticalTelescopeResolution || 0.89) * 2.45;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + astroYield);
                            org.storedRenaissanceSurplus = Math.min(140.0, (org.storedRenaissanceSurplus || 22.0) + astroYield * 0.50);
                            this.metrics.renaissanceArchiveStored += astroYield * 0.50;
                            this.metrics.harvestedRenaissanceBiomass += astroYield;
                        } else {
                            org.isObservingCosmos = false;
                        }

                        // Emergency draw from renaissance academy archive during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedRenaissanceSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedRenaissanceSurplus, 8.0);
                            org.storedRenaissanceSurplus -= draw;
                            org.energy += draw * 0.98;
                        }
                    }

                    // D. Compute 175th Channel (% PPI - Printing Press & Knowledge Diffusion Index)
                    const pressNorm = org.hasPrintingPress ? (org.movableTypePrintingRate || 0.89) : 0.25;
                    const diffNorm = org.hasPrintingPress ? Math.min(1.0, 0.55 + (((org.knowledgeDiffusionMultiplier || 2.05) - 1.5) / 1.1) * 0.45) : 0.30;
                    const treatiseNorm = org.hasPrintingPress ? Math.min(1.0, 0.72 + (org.printedTreatises || 2) * 0.025) : 0.20;
                    const ppi = Math.max(0, Math.min(100, (
                        pressNorm * 0.40 +
                        diffNorm * 0.35 +
                        treatiseNorm * 0.25
                    ) * 100.0));
                    org.printingPressIndex = ppi;
                    sumPPI += ppi;

                    // E. Compute 176th Channel (% CAI - Clockwork & Astronomical Navigation Index)
                    const clockNorm = org.hasMechanicalClock ? (org.mechanicalClockPrecision || 0.89) : 0.25;
                    const teleNorm = org.hasOpticalTelescope ? (org.opticalTelescopeResolution || 0.89) : 0.25;
                    const surpNorm = org.hasOpticalTelescope ? Math.min(1.0, 0.65 + ((org.storedRenaissanceSurplus || 22.0) / 140.0) * 0.35) : 0.25;
                    const cai = Math.max(0, Math.min(100, (
                        clockNorm * 0.35 +
                        teleNorm * 0.35 +
                        surpNorm * 0.30
                    ) * 100.0));
                    org.clockworkAstronomyIndex = cai;
                    sumCAI += cai;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalRenaissanceScholars = scholars;
            this.metrics.activePrintingPresses = presses;
            this.metrics.activeMechanicalClocks = clocks;
            this.metrics.activeObservatories = observatories;

            this.metrics.meanPrintingRate = presses > 0 ? (sumPrint / presses) : 0.89;
            this.metrics.meanDiffusionMultiplier = presses > 0 ? (sumDiff / presses) : 2.05;
            this.metrics.meanClockPrecision = clocks > 0 ? (sumClock / clocks) : 0.89;
            this.metrics.meanTelescopeResolution = observatories > 0 ? (sumTele / observatories) : 0.89;

            this.metrics.meanPPIIndex = scholars > 0 ? (sumPPI / scholars) : 0.0;
            this.metrics.meanCAIIndex = scholars > 0 ? (sumCAI / scholars) : 0.0;
            this.metrics.cumulativeRenaissanceBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.RenaissancePrintingManager = RenaissancePrintingManager;
    if (typeof window !== "undefined") {
        window.renaissancePrintingManager = new RenaissancePrintingManager();
    }
})(typeof window !== "undefined" ? window : global);
