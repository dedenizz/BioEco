// BioEcosystem - Microscopic Filter-Feeding Baleen Plates & Pelagic Megafauna
// Module: src/organs/filter_baleen.js
// Version: 6.27.0 (Hour 347 - System Agent: Blubber Energy Reserves & Pod Sifting Synergy)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * FilterBaleenManager
     * High-fidelity simulation of microscopic filter-feeding baleen plates,
     * hydrodynamic particle filtration, pod synergy, and pelagic megafaunal scaling:
     * - Synthesizes siliary baleen comb plates along cellular margins
     * - Drives high-volume hydrodynamic filtration flux across suspended marine snow & flocs
     * - Accumulates lipid blubber energy reserves (blubberEnergyReserve) to buffer starvation
     * - Coordinates pod sifting synergy (baleenPodSynergy) for drafting drag reduction
     * - Emits organic filtration exudate flocs (baleenExudateFlux) to fertilize lower trophic tier
     */
    class FilterBaleenManager {
        constructor() {
            this.maxBaleenPlates = 10.0;
            this.maxMegafaunaScale = 2.25;
            this.metrics = {
                totalLiveCells: 0,
                totalBaleenOrganisms: 0,
                baleenPrevalenceRatio: 0.0,
                meanBaleenPlates: 0.0,
                meanFiltrationFlux: 0.0,
                meanMegafaunaScale: 1.0,
                meanBlubberReserve: 0.0,
                activePodFilterers: 0,
                cumulativeFilteredParticles: 0,
                cumulativeExudates: 0
            };
        }

        /**
         * Initialize default baleen filtration and lipid reserve attributes.
         * @param {Object} org - Simulation organism.
         */
        static initOrganism(org) {
            if (!org) return;
            if (org.baleenFilterPlates === undefined) org.baleenFilterPlates = 0.0;
            if (org.filtrationVolumeFlux === undefined) org.filtrationVolumeFlux = 0.0;
            if (org.megafaunaScaleRatio === undefined) org.megafaunaScaleRatio = 1.0;
            if (org.baleenEnergyReserve === undefined) org.baleenEnergyReserve = 0.0;
            if (org.blubberEnergyReserve === undefined) org.blubberEnergyReserve = 0.0;
            if (org.filteredParticleCount === undefined) org.filteredParticleCount = 0;
            if (org.baleenSieveActive === undefined) org.baleenSieveActive = false;
            if (org.podSynergyActive === undefined) org.podSynergyActive = false;
            if (org.podDraftingBonus === undefined) org.podDraftingBonus = 1.0;
            if (org.exudateFluxTicks === undefined) org.exudateFluxTicks = 0;
        }

        /**
         * Update cellular baleen plate synthesis, hydrodynamic filtration, and megafauna scaling.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Array<Object>} foods - Ambient particulate food items.
         * @param {Object} biogeochemicalSystem - Active biogeochemical cycles manager instance.
         * @param {number} tick - Current simulation frame count.
         */
        step(organisms, foods, biogeochemicalSystem, tick) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.metrics.totalLiveCells = 0;
                this.metrics.totalBaleenOrganisms = 0;
                this.metrics.baleenPrevalenceRatio = 0.0;
                this.metrics.meanBaleenPlates = 0.0;
                this.metrics.meanFiltrationFlux = 0.0;
                this.metrics.meanMegafaunaScale = 1.0;
                this.metrics.meanBlubberReserve = 0.0;
                this.metrics.activePodFilterers = 0;
                return;
            }

            let liveCells = 0;
            let baleenCount = 0;
            let podCount = 0;
            let totalPlates = 0.0;
            let totalFlux = 0.0;
            let totalScale = 0.0;
            let totalBlubber = 0.0;

            const safeFoods = Array.isArray(foods) ? foods : [];

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCells++;

                FilterBaleenManager.initOrganism(org);
                if (org.exudateFluxTicks > 0) org.exudateFluxTicks--;

                // 1. Siliary Baleen Plate Accretion
                const baleenAffinity = (org.dna && typeof org.dna.baleenAffinity === "number")
                    ? org.dna.baleenAffinity
                    : 0.55;
                const isFilterNiche = (org.niche === "herbivore" || org.niche === "detritivore") ||
                    (org.dna && (org.dna.diet < 0.50 || org.dna.diet === 0));

                if (isFilterNiche && org.energy > 24.0) {
                    const plateGrowth = 0.0085 * (0.65 + baleenAffinity * 0.70);
                    org.baleenFilterPlates = Math.min(this.maxBaleenPlates, org.baleenFilterPlates + plateGrowth);
                    org.energy = Math.max(5.0, org.energy - 0.0010 * org.baleenFilterPlates);
                }

                org.baleenSieveActive = (org.baleenFilterPlates >= 0.5);

                // 2. Coordinated Pod Drafting Synergy (proximity to other filterers)
                if (org.baleenSieveActive) {
                    let podNeighbors = 0;
                    for (let j = 0; j < organisms.length; j++) {
                        if (i === j) continue;
                        const other = organisms[j];
                        if (!other || !other.alive || !other.baleenSieveActive) continue;
                        const pdx = other.x - org.x;
                        const pdy = other.y - org.y;
                        if ((pdx * pdx + pdy * pdy) < 4225.0) { // 65 px radius squared
                            podNeighbors++;
                        }
                    }
                    org.podSynergyActive = (podNeighbors > 0);
                    org.podDraftingBonus = org.podSynergyActive ? Math.min(1.40, 1.0 + podNeighbors * 0.12) : 1.0;
                    if (org.podSynergyActive) podCount++;
                } else {
                    org.podSynergyActive = false;
                    org.podDraftingBonus = 1.0;
                }

                // 3. Hydrodynamic Filtration Volume Flux & Sifting
                if (org.baleenSieveActive) {
                    baleenCount++;
                    const plateRatio = org.baleenFilterPlates / this.maxBaleenPlates;
                    const speed = Math.max(0.2, Math.abs(org.speed || 1.0));
                    const currentScale = org.megafaunaScaleRatio || 1.0;

                    const rawFlux = speed * 0.42 * plateRatio * (0.85 + currentScale * 0.35) * org.podDraftingBonus;
                    org.filtrationVolumeFlux = Number(Math.min(1.0, rawFlux).toFixed(3));

                    totalPlates += org.baleenFilterPlates;
                    totalFlux += org.filtrationVolumeFlux;

                    // Particulate Sifting in sweep radius
                    const filterRadius = (org.dna && org.dna.size ? org.dna.size : 6.0) * currentScale * 2.2;
                    let siftedThisTick = false;

                    if (safeFoods.length > 0 && tick % 4 === 0) {
                        for (let f = 0; f < safeFoods.length; f++) {
                            const food = safeFoods[f];
                            if (!food || food.consumed) continue;
                            const dx = food.x - org.x;
                            const dy = food.y - org.y;
                            if ((dx * dx + dy * dy) < filterRadius * filterRadius) {
                                food.consumed = true;
                                org.energy = Math.min(100.0, org.energy + 3.5 * plateRatio);
                                org.baleenEnergyReserve = Math.min(60.0, org.baleenEnergyReserve + 1.2);
                                org.filteredParticleCount++;
                                this.metrics.cumulativeFilteredParticles++;
                                siftedThisTick = true;
                                break;
                            }
                        }
                    }

                    // Sift marine snow flocs from biogeochemical cycle
                    if (biogeochemicalSystem && Array.isArray(biogeochemicalSystem.marineSnowPool) && tick % 6 === 0) {
                        const snowPool = biogeochemicalSystem.marineSnowPool;
                        for (let s = 0; s < snowPool.length; s++) {
                            const floc = snowPool[s];
                            if (!floc || floc.consumed) continue;
                            const sdx = floc.x - org.x;
                            const sdy = floc.y - org.y;
                            if ((sdx * sdx + sdy * sdy) < filterRadius * filterRadius) {
                                floc.consumed = true;
                                org.energy = Math.min(100.0, org.energy + 2.8 * plateRatio);
                                org.baleenEnergyReserve = Math.min(60.0, org.baleenEnergyReserve + 0.9);
                                org.filteredParticleCount++;
                                this.metrics.cumulativeFilteredParticles++;
                                siftedThisTick = true;
                                break;
                            }
                        }
                    }

                    // 4. Lipid Blubber Accumulation & Starvation Buffer
                    if (org.energy > 42.0) {
                        org.blubberEnergyReserve = Math.min(100.0, org.blubberEnergyReserve + 0.18);
                    }
                    if (org.energy < 22.0 && org.blubberEnergyReserve > 0.5) {
                        const draw = Math.min(org.blubberEnergyReserve, 0.40);
                        org.energy += draw * 1.8;
                        org.blubberEnergyReserve -= draw;
                    }

                    // 5. Trophic Exudate Shedding (prevents monopolization, feeds small tier)
                    if (siftedThisTick && tick % 20 === 0 && safeFoods.length < 130 && Math.random() < 0.40) {
                        safeFoods.push({
                            x: org.x + (Math.random() - 0.5) * 32.0,
                            y: org.y + (Math.random() - 0.5) * 32.0,
                            size: 2.2,
                            energy: 6.5,
                            consumed: false,
                            isExudate: true
                        });
                        org.exudateFluxTicks = 16;
                        this.metrics.cumulativeExudates++;
                    }

                    // 6. Pelagic Megafauna Scaling Kinetics
                    const targetScale = 1.0 + (plateRatio * 0.75) + (org.baleenEnergyReserve / 60.0) * 0.50;
                    org.megafaunaScaleRatio = Number(Math.min(this.maxMegafaunaScale, targetScale).toFixed(3));

                    // Basal upkeep with pod drafting discount
                    const upkeepDiscount = org.podSynergyActive ? 0.75 : 1.0;
                    org.energy = Math.max(5.0, org.energy - 0.0018 * org.megafaunaScaleRatio * upkeepDiscount);

                    if (org.baleenEnergyReserve > 0.05) {
                        org.baleenEnergyReserve = Math.max(0.0, org.baleenEnergyReserve - 0.012);
                    }
                } else {
                    org.filtrationVolumeFlux = 0.0;
                    org.megafaunaScaleRatio = 1.0;
                    if (org.blubberEnergyReserve > 0.1) org.blubberEnergyReserve -= 0.05;
                }

                totalScale += (org.megafaunaScaleRatio || 1.0);
                totalBlubber += (org.blubberEnergyReserve || 0.0);
            }

            // Update telemetry metrics snapshot
            this.metrics.totalLiveCells = liveCells;
            this.metrics.totalBaleenOrganisms = baleenCount;
            this.metrics.activePodFilterers = podCount;
            this.metrics.baleenPrevalenceRatio = liveCells > 0 ? Number(((baleenCount / liveCells) * 100.0).toFixed(1)) : 0.0;
            this.metrics.meanBaleenPlates = baleenCount > 0 ? Number((totalPlates / baleenCount).toFixed(2)) : 0.0;
            this.metrics.meanFiltrationFlux = baleenCount > 0 ? Number((totalFlux / baleenCount).toFixed(3)) : 0.0;
            this.metrics.meanMegafaunaScale = liveCells > 0 ? Number((totalScale / liveCells).toFixed(3)) : 1.0;
            this.metrics.meanBlubberReserve = liveCells > 0 ? Number((totalBlubber / liveCells).toFixed(2)) : 0.0;
        }

        /**
         * Calculate kinetic predation impact damping for megafauna organisms.
         * @param {Object} prey - Defender megafaunal organism.
         * @param {number} rawDamage - Incoming predator bite damage.
         * @returns {number} Modulated damage value.
         */
        static computeMegafaunaDamageDamping(prey, rawDamage) {
            if (!prey) return rawDamage;
            const scale = prey.megafaunaScaleRatio || 1.0;
            if (scale <= 1.05) return rawDamage;
            const dampingFactor = Math.max(0.48, 1.0 / (scale * 0.95));
            return Number((rawDamage * dampingFactor).toFixed(2));
        }

        /**
         * Retrieve telemetry snapshot for environmental HUD and scientific codex.
         * @returns {Object} Current baleen filtration metrics state.
         */
        getMetrics() {
            return { ...this.metrics };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = FilterBaleenManager;
    } else {
        global.FilterBaleenManager = FilterBaleenManager;
        global.filterBaleenManager = new FilterBaleenManager();
    }
})(typeof window !== "undefined" ? window : global);
