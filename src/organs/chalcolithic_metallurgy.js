// BioEcosystem - Chalcolithic Copper Metallurgy, Ox-Drawn Ard Plough & Irrigation Canal Hydraulics
// Module: src/organs/chalcolithic_metallurgy.js
// Version: 10.3.0 (Hour 723 - System Agent: 1085C Copper Smelting, Cold-Hammered Tool Durability, Ox-Drawn Plough, Irrigation Canals & 165th/166th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalcolithicMetallurgyManager
     * Core evolutionary, metabolic, and technological dynamics for Chalcolithic Homo sapiens:
     * 1. Copper Ore Smelting & Stone Mold Casting:
     *    - High-temperature (1085 C) bellows-driven ceramic kiln reduction of malachite & chalcopyrite (chalcolithicCopperSmelting: 0.80 - 0.98).
     *    - Reusable, cold-hammered & re-sharpened copper axes, chisels, and sickle blades (copperToolDurability: 0.85 - 0.98).
     * 2. Ox-Drawn Ard Plough Tillage:
     *    - Harnessing domesticated cattle (Bos taurus) traction to pull copper-tipped ard ploughs (oxDrawnPloughTillage: 0.80 - 0.98).
     *    - 4-5x faster deep furrow soil aeration and moisture retention compared to hand digging sticks.
     * 3. Artificial Irrigation Canals & Alluvial Hydraulics:
     *    - River diversion channels and sluice gates feeding arid alluvial plains (irrigationCanalHydraulics: 0.80 - 0.98).
     *    - Year-round drought-buffered alluvial harvest multiplier (irrigatedCropMultiplier: 1.5 - 2.4).
     * 4. 165th & 166th Telemetry Channel Indices:
     *    - 165th Channel: % CMI (Chalcolithic Metallurgy Index, Copper Orange #d97706)
     *    - 166th Channel: % ICI (Irrigation & Plough Cultivation Index, Canal Blue #0284c7)
     */
    class ChalcolithicMetallurgyManager {
        /**
         * Initialize Chalcolithic Metallurgy, Ox Plough, and Irrigation Canal Manager.
         */
        constructor() {
            this.metrics = {
                totalChalcolithicArtisans: 0,
                activeCopperSmelters: 0,
                activeOxPloughmen: 0,
                activeCanalIrrigators: 0,
                meanCopperSmelting: 0.89,
                meanToolDurability: 0.91,
                meanOxPloughTillage: 0.88,
                meanCanalHydraulics: 0.89,
                meanIrrigatedMultiplier: 1.95,
                meanCMIIndex: 0.0,
                meanICIIndex: 0.0,
                copperIngotsCast: 0,
                ploughedHectaresTicks: 0,
                irrigatedHarvestEvents: 0,
                alluvialGrainStored: 0.0,
                harvestedChalcolithicBiomass: 0.0,
                cumulativeChalcolithicBiomass: 0.0
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

            let artisans = 0;
            let smelters = 0;
            let ploughmen = 0;
            let irrigators = 0;

            let sumSmelting = 0;
            let sumDurability = 0;
            let sumPlough = 0;
            let sumCanal = 0;
            let sumMult = 0;

            let sumCMI = 0;
            let sumICI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // Eligibility: Pastoralists, Neolithic farmers, Upper Paleolithic sapiens, advanced hominins
                const isEligibleHuman = org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 34);

                if (isEligibleHuman && org.hasChalcolithicMetallurgy === undefined) {
                    const adoptsChalcolithic = Math.random() < 0.65;
                    org.hasChalcolithicMetallurgy = adoptsChalcolithic;

                    if (adoptsChalcolithic) {
                        // 1. Copper Ore Smelting & Tool Durability
                        org.hasCopperSmelting = Math.random() < 0.78;
                        org.chalcolithicCopperSmelting = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.copperToolDurability = 0.85 + Math.random() * 0.13; // 0.85 - 0.98
                        org.smeltedCopperIngots = 2 + Math.floor(Math.random() * 5);
                        org.isSmeltingCopper = false;

                        // 2. Ox-Drawn Ard Plough Tillage
                        org.hasOxPlough = Math.random() < 0.75;
                        org.oxDrawnPloughTillage = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isPloughingField = false;

                        // 3. Artificial Irrigation Canals & Alluvial Hydraulics
                        org.hasIrrigationCanal = Math.random() < 0.75;
                        org.irrigationCanalHydraulics = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.irrigatedCropMultiplier = 1.5 + Math.random() * 0.9; // 1.5 - 2.4
                        org.storedAlluvialSurplus = 12.0 + Math.random() * 28.0;
                        org.isIrrigatingCanal = false;

                        // Telemetry Channel Indices
                        org.chalcolithicMetallurgyIndex = 0.0;
                        org.irrigationCultivationIndex = 0.0;
                    }
                }

                if (org.hasChalcolithicMetallurgy) {
                    artisans++;
                    totalBio += (org.mass || 1.0) * 32.0;

                    // A. Copper Smelting Kiln & Tool Casting
                    if (org.hasCopperSmelting) {
                        smelters++;
                        sumSmelting += org.chalcolithicCopperSmelting || 0.89;
                        sumDurability += org.copperToolDurability || 0.91;

                        if (Math.random() < 0.018) {
                            org.isSmeltingCopper = true;
                            org.smeltedCopperIngots = Math.min(25, (org.smeltedCopperIngots || 2) + 1);
                            this.metrics.copperIngotsCast++;
                            const toolEfficiencyBonus = (org.copperToolDurability || 0.91) * 1.6;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + toolEfficiencyBonus);
                            this.metrics.harvestedChalcolithicBiomass += toolEfficiencyBonus;
                        } else {
                            org.isSmeltingCopper = false;
                        }
                    }

                    // B. Ox-Drawn Ard Plough Deep Furrowing
                    if (org.hasOxPlough) {
                        ploughmen++;
                        sumPlough += org.oxDrawnPloughTillage || 0.88;

                        if (Math.random() < 0.020) {
                            org.isPloughingField = true;
                            this.metrics.ploughedHectaresTicks++;
                            const ploughYield = (org.oxDrawnPloughTillage || 0.88) * 2.4;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + ploughYield);
                            org.storedAlluvialSurplus = Math.min(90.0, (org.storedAlluvialSurplus || 12.0) + ploughYield * 0.40);
                            this.metrics.harvestedChalcolithicBiomass += ploughYield;
                        } else {
                            org.isPloughingField = false;
                        }
                    }

                    // C. Artificial Irrigation Canals & Alluvial Surplus
                    if (org.hasIrrigationCanal) {
                        irrigators++;
                        sumCanal += org.irrigationCanalHydraulics || 0.89;
                        sumMult += org.irrigatedCropMultiplier || 1.95;

                        if (Math.random() < 0.022) {
                            org.isIrrigatingCanal = true;
                            this.metrics.irrigatedHarvestEvents++;
                            const canalYield = (org.irrigationCanalHydraulics || 0.89) * (org.irrigatedCropMultiplier || 1.95) * 1.45;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + canalYield);
                            org.storedAlluvialSurplus = Math.min(90.0, (org.storedAlluvialSurplus || 12.0) + canalYield * 0.50);
                            this.metrics.alluvialGrainStored += canalYield * 0.50;
                            this.metrics.harvestedChalcolithicBiomass += canalYield;
                        } else {
                            org.isIrrigatingCanal = false;
                        }

                        // Emergency draw from irrigated alluvial granary during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedAlluvialSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedAlluvialSurplus, 5.5);
                            org.storedAlluvialSurplus -= draw;
                            org.energy += draw * 0.96;
                        }
                    }

                    // D. Compute 165th Channel (% CMI - Chalcolithic Metallurgy Index)
                    const smeltingNorm = org.hasCopperSmelting ? (org.chalcolithicCopperSmelting || 0.89) : 0.25;
                    const durabilityNorm = org.hasCopperSmelting ? (org.copperToolDurability || 0.91) : 0.30;
                    const kilnNorm = org.hasCopperSmelting ? Math.min(1.0, 0.72 + (org.smeltedCopperIngots || 2) * 0.025) : 0.20;
                    const cmi = Math.max(0, Math.min(100, (
                        smeltingNorm * 0.40 +
                        durabilityNorm * 0.35 +
                        kilnNorm * 0.25
                    ) * 100.0));
                    org.chalcolithicMetallurgyIndex = cmi;
                    sumCMI += cmi;

                    // E. Compute 166th Channel (% ICI - Irrigation & Plough Cultivation Index)
                    const ploughNorm = org.hasOxPlough ? (org.oxDrawnPloughTillage || 0.88) : 0.25;
                    const canalNorm = org.hasIrrigationCanal ? (org.irrigationCanalHydraulics || 0.89) : 0.25;
                    const multNorm = org.hasIrrigationCanal ? Math.min(1.0, 0.55 + (((org.irrigatedCropMultiplier || 1.95) - 1.5) / 0.9) * 0.45) : 0.30;
                    const ici = Math.max(0, Math.min(100, (
                        ploughNorm * 0.35 +
                        canalNorm * 0.35 +
                        multNorm * 0.30
                    ) * 100.0));
                    org.irrigationCultivationIndex = ici;
                    sumICI += ici;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalChalcolithicArtisans = artisans;
            this.metrics.activeCopperSmelters = smelters;
            this.metrics.activeOxPloughmen = ploughmen;
            this.metrics.activeCanalIrrigators = irrigators;

            this.metrics.meanCopperSmelting = smelters > 0 ? (sumSmelting / smelters) : 0.89;
            this.metrics.meanToolDurability = smelters > 0 ? (sumDurability / smelters) : 0.91;
            this.metrics.meanOxPloughTillage = ploughmen > 0 ? (sumPlough / ploughmen) : 0.88;
            this.metrics.meanCanalHydraulics = irrigators > 0 ? (sumCanal / irrigators) : 0.89;
            this.metrics.meanIrrigatedMultiplier = irrigators > 0 ? (sumMult / irrigators) : 1.95;

            this.metrics.meanCMIIndex = artisans > 0 ? (sumCMI / artisans) : 0.0;
            this.metrics.meanICIIndex = artisans > 0 ? (sumICI / artisans) : 0.0;
            this.metrics.cumulativeChalcolithicBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.ChalcolithicMetallurgyManager = ChalcolithicMetallurgyManager;
    if (typeof window !== "undefined") {
        window.chalcolithicMetallurgyManager = new ChalcolithicMetallurgyManager();
    }
})(typeof window !== "undefined" ? window : global);
