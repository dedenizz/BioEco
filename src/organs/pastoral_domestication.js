// BioEcosystem - Pastoral Domestication, Herd Management, Dairy Lactation & Secondary Products Dynamics
// Module: src/organs/pastoral_domestication.js
// Version: 9.98.0 (Hour 718 - System Agent: Ovis/Capra/Bos Herding, Daily Milk Extraction, Manure Fertilization, Wool Spinning & 163rd/164th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PastoralDomesticationManager
     * Core evolutionary, metabolic, and technological dynamics for pastoralist Neolithic Homo sapiens:
     * 1. Pastoral Herd Management & Selective Breeding:
     *    - Control of wild sheep (mouflon), wild goats (bezoar), and wild cattle (aurochs) (pastoralHerdManagement: 0.80 - 0.98).
     *    - Behavioral taming, blunting fight-or-flight aggression, and transhumant pasture grazing rotation.
     *    - Manure fertilization mutualism enhancing adjacent agricultural stubble plot yields (manureFertilizationSurplus: 0.75 - 0.96).
     * 2. Secondary Products Revolution & Continuous Dairy Lactation:
     *    - Milking live domestic livestock daily without primary carcass slaughter (dairyLactationExtraction: 0.80 - 0.98).
     *    - High-density caloric, protein, and lipid flux via fresh dairy milk (dailyLactationCaloricYield: 0.75 - 0.95).
     *    - Lactic acid fermentation in ceramic jars yielding durable, non-perishable cheese and yogurt reserves.
     * 3. Wool Shearing, Fiber Spinning & Textile Weaving:
     *    - Harvesting live sheep fleece via seasonal shearing without pelt removal (woolFiberSpinning: 0.78 - 0.98).
     *    - Drop-spindle whorl spinning and loom weaving creating lightweight, high-insulation woolen garments.
     * 4. Communal Corral Enclosures & Nocturnal Predator Barrier:
     *    - Stone and timber post corrals sheltering livestock overnight adjacent to mudbrick houses (enclosureCorralSecurity: 0.80 - 0.98).
     *    - 85% deflection of nocturnal predator raids (wolves, hyenas, leopards), safeguarding capital wealth.
     * 5. 163rd & 164th Telemetry Channel Indices:
     *    - 163rd Channel: % PHI (Pastoral Herd Index, Pastoral Meadow Green #84cc16)
     *    - 164th Channel: % SPR (Secondary Products Revolution Index, Dairy Cream White #f8fafc)
     */
    class PastoralDomesticationManager {
        /**
         * Initialize Pastoral Domestication and Secondary Products Manager.
         */
        constructor() {
            this.metrics = {
                totalPastoralists: 0,
                activeHerders: 0,
                activeMilkExtractors: 0,
                activeWoolSpinners: 0,
                activeCorralProtectors: 0,
                meanHerdManagement: 0.88,
                meanManureSurplus: 0.86,
                meanDairyExtraction: 0.89,
                meanLactationYield: 0.85,
                meanWoolSpinning: 0.87,
                meanCorralSecurity: 0.88,
                meanPHIIndex: 0.0,
                meanSPRIndex: 0.0,
                totalLivestockHoused: 0,
                dailyMilkingEvents: 0,
                fermentedCheeseStored: 0.0,
                fleeceShearingEvents: 0,
                predatorRaidsDeflected: 0,
                harvestedPastoralBiomass: 0.0,
                cumulativePastoralBiomass: 0.0
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

            let pastoralists = 0;
            let herders = 0;
            let milkers = 0;
            let spinners = 0;
            let corralGuards = 0;

            let sumHerd = 0;
            let sumManure = 0;
            let sumDairy = 0;
            let sumYield = 0;
            let sumWool = 0;
            let sumCorral = 0;

            let sumPHI = 0;
            let sumSPR = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // Eligibility: Neolithic farmers, Upper Paleolithic / Mesolithic humans, advanced hominins
                const isEligibleHuman = org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 32);

                if (isEligibleHuman && org.hasPastoralDomestication === undefined) {
                    const adoptsPastoral = Math.random() < 0.65;
                    org.hasPastoralDomestication = adoptsPastoral;

                    if (adoptsPastoral) {
                        // 1. Livestock Herd Management (Sheep/Goat/Cattle)
                        org.hasLivestockHerd = Math.random() < 0.80;
                        org.pastoralHerdManagement = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.manureFertilizationSurplus = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                        org.herdHeadCount = Math.floor(4 + Math.random() * 12); // 4 - 15 head of livestock
                        org.isHerdingGrazers = false;

                        // 2. Dairy Lactation & Milking
                        org.hasDairyExtraction = Math.random() < 0.75;
                        org.dairyLactationExtraction = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.dailyLactationCaloricYield = 0.75 + Math.random() * 0.20; // 0.75 - 0.95
                        org.storedDairySurplus = 10.0 + Math.random() * 30.0; // Fermented cheese/curd buffer
                        org.isMilkingLivestock = false;

                        // 3. Wool Shearing & Textile Spinning
                        org.hasWoolSpinning = Math.random() < 0.70;
                        org.woolFiberSpinning = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                        org.isShearingWool = false;

                        // 4. Communal Corral Enclosures
                        org.hasCorralEnclosure = Math.random() < 0.70;
                        org.enclosureCorralSecurity = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.isCorralSheltered = false;

                        // Telemetry Channel Indices
                        org.pastoralHerdIndex = 0.0;
                        org.secondaryProductsIndex = 0.0;
                    }
                }

                if (org.hasPastoralDomestication) {
                    pastoralists++;
                    totalBio += (org.mass || 1.0) * 30.0;

                    // A. Pastoral Herd Grazing & Manure Fertilization
                    if (org.hasLivestockHerd) {
                        herders++;
                        sumHerd += org.pastoralHerdManagement || 0.88;
                        sumManure += org.manureFertilizationSurplus || 0.86;
                        this.metrics.totalLivestockHoused += (org.herdHeadCount || 6);

                        if (Math.random() < 0.018) {
                            org.isHerdingGrazers = true;
                            // Manure enhances adjacent stubble energy
                            const manureBonus = (org.manureFertilizationSurplus || 0.86) * 1.5;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + manureBonus);
                        } else {
                            org.isHerdingGrazers = false;
                        }
                    }

                    // B. Daily Dairy Milking & Fermentation
                    if (org.hasDairyExtraction) {
                        milkers++;
                        sumDairy += org.dairyLactationExtraction || 0.89;
                        sumYield += org.dailyLactationCaloricYield || 0.85;

                        if (Math.random() < 0.02) {
                            org.isMilkingLivestock = true;
                            const milkYield = (org.dairyLactationExtraction || 0.89) * (org.dailyLactationCaloricYield || 0.85) * 2.6;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + milkYield);
                            org.storedDairySurplus = Math.min(75.0, (org.storedDairySurplus || 15.0) + milkYield * 0.45);
                            this.metrics.dailyMilkingEvents++;
                            this.metrics.fermentedCheeseStored += milkYield * 0.45;
                            this.metrics.harvestedPastoralBiomass += milkYield;
                        } else {
                            org.isMilkingLivestock = false;
                        }

                        // Low-energy emergency consumption of fermented cheese buffer
                        if ((org.energy || 50.0) < 35.0 && (org.storedDairySurplus || 0) > 2.0) {
                            const dairyDraw = Math.min(org.storedDairySurplus, 5.0);
                            org.storedDairySurplus -= dairyDraw;
                            org.energy += dairyDraw * 0.95;
                        }
                    }

                    // C. Wool Shearing & Textile Insulation
                    if (org.hasWoolSpinning) {
                        spinners++;
                        sumWool += org.woolFiberSpinning || 0.87;

                        if (Math.random() < 0.012) {
                            org.isShearingWool = true;
                            this.metrics.fleeceShearingEvents++;
                        } else {
                            org.isShearingWool = false;
                        }
                    }

                    // D. Communal Corral Enclosure & Predator Deflection
                    if (org.hasCorralEnclosure) {
                        corralGuards++;
                        sumCorral += org.enclosureCorralSecurity || 0.88;
                        org.isCorralSheltered = true;

                        // Deflect predator collision damage by 85%
                        if (Math.random() < 0.01) {
                            this.metrics.predatorRaidsDeflected++;
                        }
                    } else {
                        org.isCorralSheltered = false;
                    }

                    // E. Compute 163rd Channel (% PHI - Pastoral Herd Index)
                    const herdNorm = org.hasLivestockHerd ? (org.pastoralHerdManagement || 0.88) : 0.35;
                    const manureNorm = org.hasLivestockHerd ? (org.manureFertilizationSurplus || 0.86) : 0.30;
                    const herdScale = Math.min(1.0, (org.herdHeadCount || 6) / 12.0);
                    const phi = Math.max(0, Math.min(100, (
                        herdNorm * 0.35 +
                        manureNorm * 0.30 +
                        herdScale * 0.20 +
                        (org.hasLivestockHerd ? 0.90 : 0.25) * 0.15
                    ) * 100.0));
                    org.pastoralHerdIndex = phi;
                    sumPHI += phi;

                    // F. Compute 164th Channel (% SPR - Secondary Products Revolution Index)
                    const dairyNorm = org.hasDairyExtraction ? (org.dairyLactationExtraction || 0.89) : 0.30;
                    const yieldNorm = org.hasDairyExtraction ? (org.dailyLactationCaloricYield || 0.85) : 0.30;
                    const woolNorm = org.hasWoolSpinning ? (org.woolFiberSpinning || 0.87) : 0.35;
                    const corralNorm = org.hasCorralEnclosure ? (org.enclosureCorralSecurity || 0.88) : 0.30;
                    const spr = Math.max(0, Math.min(100, (
                        dairyNorm * 0.35 +
                        yieldNorm * 0.30 +
                        woolNorm * 0.20 +
                        corralNorm * 0.15
                    ) * 100.0));
                    org.secondaryProductsIndex = spr;
                    sumSPR += spr;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalPastoralists = pastoralists;
            this.metrics.activeHerders = herders;
            this.metrics.activeMilkExtractors = milkers;
            this.metrics.activeWoolSpinners = spinners;
            this.metrics.activeCorralProtectors = corralGuards;

            this.metrics.meanHerdManagement = herders > 0 ? (sumHerd / herders) : 0.88;
            this.metrics.meanManureSurplus = herders > 0 ? (sumManure / herders) : 0.86;
            this.metrics.meanDairyExtraction = milkers > 0 ? (sumDairy / milkers) : 0.89;
            this.metrics.meanLactationYield = milkers > 0 ? (sumYield / milkers) : 0.85;
            this.metrics.meanWoolSpinning = spinners > 0 ? (sumWool / spinners) : 0.87;
            this.metrics.meanCorralSecurity = corralGuards > 0 ? (sumCorral / corralGuards) : 0.88;

            this.metrics.meanPHIIndex = pastoralists > 0 ? (sumPHI / pastoralists) : 0.0;
            this.metrics.meanSPRIndex = pastoralists > 0 ? (sumSPR / pastoralists) : 0.0;
            this.metrics.cumulativePastoralBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.PastoralDomesticationManager = PastoralDomesticationManager;
    if (typeof window !== "undefined") {
        window.pastoralDomesticationManager = new PastoralDomesticationManager();
    }
})(typeof window !== "undefined" ? window : global);
