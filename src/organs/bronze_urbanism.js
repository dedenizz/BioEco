// BioEcosystem - Bronze Age Tin-Bronze Alloying, Wheeled Chariots & Early Urban Guilds
// Module: src/organs/bronze_urbanism.js
// Version: 10.8.0 (Hour 728 - System Agent: 88Cu/12Sn Tin-Bronze Alloying, Bivalve Mold Hardness, Axled Wheeled Carts, Urban Craft Guilds & 167th/168th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BronzeUrbanismManager
     * Core evolutionary, metallurgical, and logistical dynamics for Bronze Age Homo sapiens:
     * 1. Tin-Bronze Alloying & Bivalve Mold Casting:
     *    - Smelting 88% copper with 12% cassiterite tin ore (bronzeTinAlloying: 0.80 - 0.98).
     *    - Work-hardened tin-bronze axes, sickles, and spears doubling edge retention (alloyHardnessIndex: 0.85 - 0.99).
     * 2. Axled Wheeled Carts & Long-Distance Trade Caravans:
     *    - Spoked and solid-disk wheeled carts drawn by oxen/equids (wheeledTransportCapacity: 0.80 - 0.98).
     *    - Low-energy bulk grain and tin/copper ore transport across wide trade networks (tradeCaravanRange: 1.5 - 2.6).
     * 3. Early Urban Craft Guilds & Central Citadel Granaries:
     *    - Full-time division of labor into bronze smiths, wheelwrights, and granary stewards (urbanGuildSpecialization: 0.80 - 0.98).
     * 4. 167th & 168th Telemetry Channel Indices:
     *    - 167th Channel: % BAI (Bronze Alloying Index, Bronze Gold #b45309)
     *    - 168th Channel: % WTI (Wheeled Transport & Urban Index, Urban Indigo #4f46e5)
     */
    class BronzeUrbanismManager {
        /**
         * Initialize Bronze Age Alloying, Wheeled Transport, and Urban Guilds Manager.
         */
        constructor() {
            this.metrics = {
                totalBronzeCitizens: 0,
                activeBronzeFoundries: 0,
                activeWheelCaravans: 0,
                activeUrbanGuilds: 0,
                meanTinAlloying: 0.89,
                meanAlloyHardness: 0.92,
                meanWheeledCapacity: 0.89,
                meanCaravanRange: 2.05,
                meanUrbanSpecialization: 0.89,
                meanBAIIndex: 0.0,
                meanWTIIndex: 0.0,
                bronzeIngotsCast: 0,
                caravanDeliveries: 0,
                guildCraftEvents: 0,
                urbanGranaryStored: 0.0,
                harvestedBronzeBiomass: 0.0,
                cumulativeBronzeBiomass: 0.0
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
            let foundries = 0;
            let caravans = 0;
            let guilds = 0;

            let sumAlloy = 0;
            let sumHardness = 0;
            let sumWheel = 0;
            let sumRange = 0;
            let sumGuild = 0;

            let sumBAI = 0;
            let sumWTI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // Eligibility: Chalcolithic artisans, pastoralists, Neolithic farmers, Upper Paleolithic sapiens, advanced hominins
                const isEligibleHuman = org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 36);

                if (isEligibleHuman && org.hasBronzeUrbanism === undefined) {
                    const adoptsBronze = Math.random() < 0.65;
                    org.hasBronzeUrbanism = adoptsBronze;

                    if (adoptsBronze) {
                        // 1. Tin-Bronze Alloying & Bivalve Mold Hardness
                        org.hasBronzeFoundry = Math.random() < 0.78;
                        org.bronzeTinAlloying = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.alloyHardnessIndex = 0.85 + Math.random() * 0.14; // 0.85 - 0.99
                        org.bronzeStockpile = 2 + Math.floor(Math.random() * 5);
                        org.isCastingBronze = false;

                        // 2. Axled Wheeled Carts & Trade Caravans
                        org.hasWheeledCart = Math.random() < 0.76;
                        org.wheeledTransportCapacity = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.tradeCaravanRange = 1.5 + Math.random() * 1.1; // 1.5 - 2.6
                        org.isHaulingCaravan = false;

                        // 3. Early Urban Craft Guilds & Central Granaries
                        org.hasUrbanGuild = Math.random() < 0.75;
                        org.urbanGuildSpecialization = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.storedUrbanSurplus = 14.0 + Math.random() * 30.0;
                        org.isWorkingGuild = false;

                        // Telemetry Channel Indices
                        org.bronzeAlloyingIndex = 0.0;
                        org.wheeledUrbanIndex = 0.0;
                    }
                }

                if (org.hasBronzeUrbanism) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 34.0;

                    // A. Tin-Bronze Alloying & Bivalve Mold Casting
                    if (org.hasBronzeFoundry) {
                        foundries++;
                        sumAlloy += org.bronzeTinAlloying || 0.89;
                        sumHardness += org.alloyHardnessIndex || 0.92;

                        if (Math.random() < 0.018) {
                            org.isCastingBronze = true;
                            org.bronzeStockpile = Math.min(30, (org.bronzeStockpile || 2) + 1);
                            this.metrics.bronzeIngotsCast++;
                            const bronzeBonus = (org.alloyHardnessIndex || 0.92) * 1.75;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + bronzeBonus);
                            this.metrics.harvestedBronzeBiomass += bronzeBonus;
                        } else {
                            org.isCastingBronze = false;
                        }
                    }

                    // B. Axled Wheeled Carts & Long-Distance Trade Caravans
                    if (org.hasWheeledCart) {
                        caravans++;
                        sumWheel += org.wheeledTransportCapacity || 0.89;
                        sumRange += org.tradeCaravanRange || 2.05;

                        if (Math.random() < 0.020) {
                            org.isHaulingCaravan = true;
                            this.metrics.caravanDeliveries++;
                            const caravanYield = (org.wheeledTransportCapacity || 0.89) * (org.tradeCaravanRange || 2.05) * 1.25;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + caravanYield);
                            org.storedUrbanSurplus = Math.min(100.0, (org.storedUrbanSurplus || 14.0) + caravanYield * 0.45);
                            this.metrics.harvestedBronzeBiomass += caravanYield;
                        } else {
                            org.isHaulingCaravan = false;
                        }
                    }

                    // C. Early Urban Craft Guilds & Central Granaries
                    if (org.hasUrbanGuild) {
                        guilds++;
                        sumGuild += org.urbanGuildSpecialization || 0.89;

                        if (Math.random() < 0.022) {
                            org.isWorkingGuild = true;
                            this.metrics.guildCraftEvents++;
                            const guildYield = (org.urbanGuildSpecialization || 0.89) * 2.55;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + guildYield);
                            org.storedUrbanSurplus = Math.min(100.0, (org.storedUrbanSurplus || 14.0) + guildYield * 0.50);
                            this.metrics.urbanGranaryStored += guildYield * 0.50;
                            this.metrics.harvestedBronzeBiomass += guildYield;
                        } else {
                            org.isWorkingGuild = false;
                        }

                        // Emergency draw from urban citadel granary during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedUrbanSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedUrbanSurplus, 6.0);
                            org.storedUrbanSurplus -= draw;
                            org.energy += draw * 0.97;
                        }
                    }

                    // D. Compute 167th Channel (% BAI - Bronze Alloying Index)
                    const alloyNorm = org.hasBronzeFoundry ? (org.bronzeTinAlloying || 0.89) : 0.25;
                    const hardNorm = org.hasBronzeFoundry ? (org.alloyHardnessIndex || 0.92) : 0.30;
                    const foundryNorm = org.hasBronzeFoundry ? Math.min(1.0, 0.72 + (org.bronzeStockpile || 2) * 0.025) : 0.20;
                    const bai = Math.max(0, Math.min(100, (
                        alloyNorm * 0.40 +
                        hardNorm * 0.35 +
                        foundryNorm * 0.25
                    ) * 100.0));
                    org.bronzeAlloyingIndex = bai;
                    sumBAI += bai;

                    // E. Compute 168th Channel (% WTI - Wheeled Transport & Urban Index)
                    const wheelNorm = org.hasWheeledCart ? (org.wheeledTransportCapacity || 0.89) : 0.25;
                    const guildNorm = org.hasUrbanGuild ? (org.urbanGuildSpecialization || 0.89) : 0.25;
                    const rangeNorm = org.hasWheeledCart ? Math.min(1.0, 0.55 + (((org.tradeCaravanRange || 2.05) - 1.5) / 1.1) * 0.45) : 0.30;
                    const wti = Math.max(0, Math.min(100, (
                        wheelNorm * 0.35 +
                        guildNorm * 0.35 +
                        rangeNorm * 0.30
                    ) * 100.0));
                    org.wheeledUrbanIndex = wti;
                    sumWTI += wti;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalBronzeCitizens = citizens;
            this.metrics.activeBronzeFoundries = foundries;
            this.metrics.activeWheelCaravans = caravans;
            this.metrics.activeUrbanGuilds = guilds;

            this.metrics.meanTinAlloying = foundries > 0 ? (sumAlloy / foundries) : 0.89;
            this.metrics.meanAlloyHardness = foundries > 0 ? (sumHardness / foundries) : 0.92;
            this.metrics.meanWheeledCapacity = caravans > 0 ? (sumWheel / caravans) : 0.89;
            this.metrics.meanCaravanRange = caravans > 0 ? (sumRange / caravans) : 2.05;
            this.metrics.meanUrbanSpecialization = guilds > 0 ? (sumGuild / guilds) : 0.89;

            this.metrics.meanBAIIndex = citizens > 0 ? (sumBAI / citizens) : 0.0;
            this.metrics.meanWTIIndex = citizens > 0 ? (sumWTI / citizens) : 0.0;
            this.metrics.cumulativeBronzeBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.BronzeUrbanismManager = BronzeUrbanismManager;
    if (typeof window !== "undefined") {
        window.bronzeUrbanismManager = new BronzeUrbanismManager();
    }
})(typeof window !== "undefined" ? window : global);
