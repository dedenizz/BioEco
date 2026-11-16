// BioEcosystem - Mesolithic Fishery, Barbed Harpoons, Weir Traps & Dugout Canoe Dynamics
// Module: src/organs/mesolithic_fishery.js
// Version: 9.88.0 (Hour 708 - System Agent: Barbed Bone Harpoons, Refraction Correction, Woven Weir Traps, Dugout Canoes & 159th/160th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MesolithicFisheryManager
     * Core evolutionary, aquatic, and technological dynamics for Mesolithic Homo sapiens (Holocene Transition):
     * 1. Barbed Bone Harpoon Ballistics & Refraction Correction:
     *    - Uniserial and biserial antler/ivory barbed harpoon points (barbedHarpoonCraft: 0.80 - 0.98).
     *    - Cognitive compensation for underwater optical light refraction (aquaticRefractionCorrection: 0.75 - 0.95).
     *    - Retaining line traction preventing escape of large migratory salmon and freshwater fish (harpoonRetainingTraction: 0.78 - 0.96).
     * 2. Riparian Weirs & Woven Willow Basket Traps (Passive Harvesting):
     *    - V-shaped stone and stake river weirs channeling aquatic fauna into funnel mouths (riparianWeirConstruction: 0.80 - 0.98).
     *    - Conical woven willow/hazel basket traps ensuring zero-caloric-effort continuous harvesting (wovenBasketTrapEfficiency: 0.80 - 0.98).
     *    - Reliable baseline daily protein and omega-3 caloric stream mitigating terrestrial lean periods (passiveTrapCaloricYield: 0.75 - 0.96).
     * 3. Dugout Canoe Navigation & Riparian Dispersal:
     *    - Monoxylous dugout canoes hollowed from pine/oak logs via controlled fire and adzes (dugoutCanoeCraft: 0.78 - 0.98).
     *    - Fluid aquatic paddling velocity enabling lake, river, and coastal dispersal (aquaticPaddlingVelocity: 1.8 - 3.2 px/tick).
     *    - Balancing terrestrial hunting pressure via aquatic foraging nexus (trophicPressureEquilibrium: 0.80 - 0.96).
     * 4. 159th & 160th Telemetry Channel Indices:
     *    - 159th Channel: % BHI (Barbed Harpoon Index, Mercan Kırmızısı #f43f5e)
     *    - 160th Channel: % WFI (Weir Fishery Index, Nehir Turkuazı #06b6d4)
     */
    class MesolithicFisheryManager {
        /**
         * Initialize Mesolithic Fishery and Riparian Harvesting Manager.
         */
        constructor() {
            this.metrics = {
                totalMesolithicFishers: 0,
                activeHarpooners: 0,
                activeWeirTrappers: 0,
                activeCanoePaddlers: 0,
                meanHarpoonCraft: 0.88,
                meanRefractionCorrection: 0.86,
                meanRetainingTraction: 0.87,
                meanWeirConstruction: 0.88,
                meanTrapEfficiency: 0.89,
                meanPassiveYield: 0.86,
                meanCanoeCraft: 0.87,
                meanTrophicEquilibrium: 0.88,
                meanBHIIndex: 0.0,
                meanWFIIndex: 0.0,
                harpoonStrikesLaunched: 0,
                passiveFishTrapped: 0,
                canoeVoyagesUndertaken: 0,
                harvestedRiparianBiomass: 0.0,
                cumulativeFisherBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Mesolithic fishery traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Eligibility: Homo sapiens descendants, riparian foragers, or advanced hominins
            const isEligibleHuman = org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 32);

            if (isEligibleHuman && org.hasMesolithicFishery === undefined) {
                // Probabilistic adoption of Mesolithic aquatic harvesting
                const adoptsFishery = Math.random() < 0.65;
                org.hasMesolithicFishery = adoptsFishery;

                // 1. Barbed Bone Harpoon & Refraction Correction
                org.hasBarbedHarpoon = Math.random() < 0.70;
                org.barbedHarpoonCraft = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.aquaticRefractionCorrection = 0.75 + Math.random() * 0.20; // 0.75 - 0.95
                org.harpoonRetainingTraction = 0.78 + Math.random() * 0.18; // 0.78 - 0.96
                org.isHarpoonStriking = false;

                // 2. Riparian Weirs & Woven Basket Traps
                org.hasRiparianWeir = Math.random() < 0.75;
                org.riparianWeirConstruction = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.wovenBasketTrapEfficiency = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.passiveTrapCaloricYield = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                org.isHarvestingWeir = false;

                // 3. Dugout Canoe Navigation
                org.hasDugoutCanoe = Math.random() < 0.60;
                org.dugoutCanoeCraft = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                org.aquaticPaddlingVelocity = 1.8 + Math.random() * 1.4; // 1.8 - 3.2 px/tick
                org.trophicPressureEquilibrium = 0.80 + Math.random() * 0.16; // 0.80 - 0.96
                org.isCanoePaddling = false;

                // Telemetry Channel Indices
                org.barbedHarpoonIndex = 0.0;
                org.weirFisheryIndex = 0.0;
            }
        }

        /**
         * Update Harpoon strikes, weir trap yields, canoe paddling, and telemetry indices.
         * @param {Array} organisms - Population array.
         * @param {Object} spatialGrid - Spatial collision grid.
         * @param {number} dt - Time delta multiplier.
         */
        step(organisms, spatialGrid, dt) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.resetMetrics();
                return;
            }

            let count = 0;
            let activeHarpoon = 0;
            let activeWeir = 0;
            let activeCanoe = 0;

            let sumCraft = 0.0;
            let sumRefraction = 0.0;
            let sumTraction = 0.0;
            let sumWeirConst = 0.0;
            let sumTrapEff = 0.0;
            let sumPassiveYield = 0.0;
            let sumCanoeCraft = 0.0;
            let sumTrophicEquil = 0.0;
            let sumBHI = 0.0;
            let sumWFI = 0.0;
            let sumBiomass = 0.0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                this.initOrganism(org);

                if (!org.hasMesolithicFishery) continue;

                count++;
                sumBiomass += (org.mass || 25.0);

                // A. Barbed Bone Harpoon Aquatic Striking
                if (org.hasBarbedHarpoon && Math.random() < 0.06) {
                    org.isHarpoonStriking = true;
                    activeHarpoon++;
                    this.metrics.harpoonStrikesLaunched++;

                    // High-protein aquatic caloric yield with refractive compensation
                    const harpoonYield = (org.barbedHarpoonCraft || 0.88) * (org.aquaticRefractionCorrection || 0.85) * 2.2;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + harpoonYield);
                    this.metrics.harvestedRiparianBiomass += harpoonYield;
                } else {
                    org.isHarpoonStriking = false;
                }

                // B. Riparian Weir & Willow Basket Trap Passive Harvesting
                if (org.hasRiparianWeir && Math.random() < 0.05) {
                    org.isHarvestingWeir = true;
                    activeWeir++;
                    this.metrics.passiveFishTrapped++;

                    // Zero-effort baseline caloric yield
                    const trapYield = (org.wovenBasketTrapEfficiency || 0.89) * (org.passiveTrapCaloricYield || 0.86) * 1.75;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + trapYield);
                    this.metrics.harvestedRiparianBiomass += trapYield;
                } else {
                    org.isHarvestingWeir = false;
                }

                // C. Dugout Canoe Navigation & Velocity
                if (org.hasDugoutCanoe && Math.random() < 0.045) {
                    org.isCanoePaddling = true;
                    activeCanoe++;
                    this.metrics.canoeVoyagesUndertaken++;

                    // Smooth aquatic locomotion speed boost
                    org.vx = (org.vx || 0) * 1.15;
                    org.vy = (org.vy || 0) * 1.15;
                } else {
                    org.isCanoePaddling = false;
                }

                // D. Compute Telemetry Channel Indices
                // 159th Channel: % BHI (Barbed Harpoon Index)
                const craftNorm = org.barbedHarpoonCraft || 0.88;
                const refrNorm = org.aquaticRefractionCorrection || 0.86;
                const tractNorm = org.harpoonRetainingTraction || 0.87;
                const strikeNorm = 0.85;
                const bhi = Math.min(100.0, Math.max(0.0,
                    (craftNorm * 0.35 + refrNorm * 0.30 + tractNorm * 0.20 + strikeNorm * 0.15) * 100.0
                ));
                org.barbedHarpoonIndex = bhi;

                // 160th Channel: % WFI (Weir Fishery Index)
                const weirNorm = org.riparianWeirConstruction || 0.88;
                const trapNorm = org.wovenBasketTrapEfficiency || 0.89;
                const passNorm = org.passiveTrapCaloricYield || 0.86;
                const canoeNorm = org.dugoutCanoeCraft || 0.87;
                const wfi = Math.min(100.0, Math.max(0.0,
                    (weirNorm * 0.30 + trapNorm * 0.30 + passNorm * 0.20 + canoeNorm * 0.20) * 100.0
                ));
                org.weirFisheryIndex = wfi;

                // Accumulate sums
                sumCraft += craftNorm;
                sumRefraction += refrNorm;
                sumTraction += tractNorm;
                sumWeirConst += weirNorm;
                sumTrapEff += trapNorm;
                sumPassiveYield += passNorm;
                sumCanoeCraft += canoeNorm;
                sumTrophicEquil += (org.trophicPressureEquilibrium || 0.88);
                sumBHI += bhi;
                sumWFI += wfi;
            }

            // Update synthesized metrics
            this.metrics.totalMesolithicFishers = count;
            this.metrics.activeHarpooners = activeHarpoon;
            this.metrics.activeWeirTrappers = activeWeir;
            this.metrics.activeCanoePaddlers = activeCanoe;
            this.metrics.cumulativeFisherBiomass = sumBiomass;

            if (count > 0) {
                this.metrics.meanHarpoonCraft = sumCraft / count;
                this.metrics.meanRefractionCorrection = sumRefraction / count;
                this.metrics.meanRetainingTraction = sumTraction / count;
                this.metrics.meanWeirConstruction = sumWeirConst / count;
                this.metrics.meanTrapEfficiency = sumTrapEff / count;
                this.metrics.meanPassiveYield = sumPassiveYield / count;
                this.metrics.meanCanoeCraft = sumCanoeCraft / count;
                this.metrics.meanTrophicEquilibrium = sumTrophicEquil / count;
                this.metrics.meanBHIIndex = sumBHI / count;
                this.metrics.meanWFIIndex = sumWFI / count;
            } else {
                this.metrics.meanBHIIndex = 0.0;
                this.metrics.meanWFIIndex = 0.0;
            }
        }

        /**
         * Reset population-level metrics.
         */
        resetMetrics() {
            this.metrics.totalMesolithicFishers = 0;
            this.metrics.activeHarpooners = 0;
            this.metrics.activeWeirTrappers = 0;
            this.metrics.activeCanoePaddlers = 0;
            this.metrics.meanBHIIndex = 0.0;
            this.metrics.meanWFIIndex = 0.0;
        }

        /**
         * Get synthesized population metrics.
         * @returns {Object} Current metrics object.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Classify biological regime for 159th Channel (% BHI).
         * @param {number} bhiVal - Barbed Harpoon Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getHarpoonRegime(bhiVal) {
            const v = Math.max(0.0, Math.min(100.0, bhiVal || 0.0));
            if (v <= 25.0) {
                return { name: "UNBARBED_SPEAR_FISHER", desc: "Unbarbed Spear Fisher & Bare Hand Plunger", class: "bhi-unbarbed" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_SERRATED_POINT", desc: "Incipient Serrated Point & Shallow Wader", class: "bhi-incipient" };
            } else if (v <= 75.0) {
                return { name: "BARBED_BONE_HARPOONER", desc: "Barbed Bone Harpooner & Torpedo Striker", class: "bhi-harpooner" };
            } else {
                return { name: "APEX_RIPARIAN_HARPOON_MASTER", desc: "Apex Riparian Harpoon Master & Pelagic Hunter", class: "bhi-apex" };
            }
        }

        /**
         * Classify biological regime for 160th Channel (% WFI).
         * @param {number} wfiVal - Weir Fishery Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getWeirRegime(wfiVal) {
            const v = Math.max(0.0, Math.min(100.0, wfiVal || 0.0));
            if (v <= 25.0) {
                return { name: "PRIMITIVE_SHALLOW_GLEANER", desc: "Primitive Shallow Gleaner & Opportunist", class: "wfi-primitive" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_WEIR_CONSTRUCTOR", desc: "Incipient Weir Constructor & Reed Placer", class: "wfi-incipient" };
            } else if (v <= 75.0) {
                return { name: "WOVEN_BASKET_TRAPPER", desc: "Woven Basket Trapper & Channel Harvester", class: "wfi-trapper" };
            } else {
                return { name: "APEX_AQUATIC_WEIR_NAVIGATOR", desc: "Apex Aquatic Weir Navigator & Canoe Fleet Commander", class: "wfi-apex" };
            }
        }
    }

    // Export module globally
    global.MesolithicFisheryManager = MesolithicFisheryManager;
    global.mesolithicFisheryManager = new MesolithicFisheryManager();

})(typeof window !== "undefined" ? window : global);
