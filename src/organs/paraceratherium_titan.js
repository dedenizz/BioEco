// BioEcosystem - Early Tertiary Megaherbivore Radiation II: Paraceratherium Titanism & Canopy Browsing
// Module: src/organs/paraceratherium_titan.js
// Version: 9.30.0 (Hour 650 - System Agent: Paraceratherium Titanism, Hyper-Columnar Stance, Canopy Reach & Foliage Stripping Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ParaceratheriumTitanManager
     * High-fidelity biological simulation of Early Tertiary (Oligocene-Early Miocene) Giant Hornless Rhinoceroses:
     * - Evolutionary Stage & Lineages (*Paraceratheriidae* / *Indricotheriinae* - *Paraceratherium*, *Dzungariotherium*, *Juxia*):
     *   The largest terrestrial mammals to ever walk the Earth, attaining massive 15 - 20 metric ton body masses,
     *   4.8 - 5.2 meter shoulder heights, and 7.5 - 8.5 meter total vertical browsing reaches.
     * - Hyper-Columnar Pillar Stance & Synovial Hydraulic Buffering:
     *   Reorientation of limb bones into rigid vertical columns locked down bone axes (hyperColumnarStanceLock: 0.78 - 0.99),
     *   transmitting multi-ton gravitational forces with minimal flexural muscular effort.
     *   Massive fibrocartilaginous subdigital heel pads distributing immense contact pressure, complemented by pressurized
     *   synovial fluid sacs (synovialHydraulicBuffering: 0.80 - 0.98) that eliminate joint cartilage degeneration under 20-ton loads.
     * - Canopy Browsing Reach & Cervical Elongation:
     *   Elongated cervical vertebrae and muscular nuchal ligament complexes (cervicalExtensionSpan: 1.8 - 2.8 m eq)
     *   granting exceptional vertical reach (canopyBrowsingReach: 6.5 - 8.5 m eq) into the high deciduous and coniferous canopy.
     *   High-efficiency cecal/colon microbial fermentation extracting maximum carbohydrates from tough, tannin-rich
     *   canopy foliage and acacia twigs (foliageCaloricExtraction: 0.75 - 0.98).
     * - Prehensile Upper Lip & Conical Incisor Branch Stripping:
     *   Dexterous muscular prehensile upper lip and incipient proboscis (prehensileLipDexterity: 0.70 - 0.96) wrapping around
     *   thorny acacia branches to strip tender leaves.
     *   Paired forward-downward conical incisors and tusks (conicalIncisorStripping: 0.72 - 0.96) clipping fibrous branches
     *   and stripping nutritious tree bark.
     * - Gigantothermic Thermal Inertia:
     *   Exceptionally low surface-area-to-volume ratio resulting in stable core body temperature and low basal metabolic rate
     *   (gigantothermicMetabolicEfficiency: 0.65 - 0.92), mitigating overheating risks across open arid savanna scrublands.
     * - 139th Telemetry Channel: % PEI (Paraceratheriid Elevation Index) mathematical core.
     * - 140th Telemetry Channel: % BFI (Browsing Foliage Index) mathematical core.
     */
    class ParaceratheriumTitanManager {
        constructor() {
            this.baseCanopyReach = 7.60;                   // [6.5 - 8.5 m eq]
            this.baseColumnarLock = 0.88;                  // [0.78 - 0.99]
            this.baseHydraulicBuffer = 0.87;               // [0.80 - 0.98]
            this.baseCervicalSpan = 2.35;                  // [1.8 - 2.8 m eq]

            this.baseLipDexterity = 0.85;                  // [0.70 - 0.96]
            this.baseIncisorStripping = 0.84;              // [0.72 - 0.96]
            this.baseFoliageExtraction = 0.86;             // [0.75 - 0.98]
            this.baseGigantothermy = 0.80;                 // [0.65 - 0.92]

            this.metrics = {
                totalLiveCells: 0,
                totalParaceratheriids: 0,
                totalIndricotheres: 0,
                activeCanopyBrowsers: 0,
                activeColumnarStanceLocks: 0,
                meanParaceratheriidElevationIndex: 0.0,    // 139th Channel % PEI
                meanBrowsingFoliageIndex: 0.0,             // 140th Channel % BFI
                meanCanopyReach: 7.60,
                meanColumnarLock: 0.88,
                meanHydraulicBuffer: 0.87,
                meanCervicalSpan: 2.35,
                meanLipDexterity: 0.85,
                meanIncisorStripping: 0.84,
                meanFoliageExtraction: 0.86,
                meanGigantothermy: 0.80,
                canopyBrowseEvents: 0,
                branchStripEvents: 0,
                columnarLockEvents: 0,
                canopyBiomassHarvested: 0.0,
                cumulativeTitanBiomass: 0.0
            };

            this.canopyBrowsePool = 350.0;
        }

        /**
         * Initialize or upgrade an organism's Paraceratherium Titan traits.
         * @param {Object} org - Organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isParaceratheriid === undefined) {
                const isHerbivorous = org.dna && (org.dna.diet === "HERBIVORE" || org.dna.diet === "OMNIVORE");
                const isMega = org.isMegaherbivore || org.isDinoceratan || isHerbivorous;
                org.isParaceratheriid = isMega && Math.random() < 0.38;
            }

            if (org.isIndricothere === undefined) {
                org.isIndricothere = org.isParaceratheriid && Math.random() < 0.70;
            }

            // Elevation, Columnar Stance & Hydraulic Buffering traits
            if (org.canopyBrowsingReach === undefined) {
                org.canopyBrowsingReach = org.isParaceratheriid ?
                    (6.7 + Math.random() * 1.7) : (1.5 + Math.random() * 2.0);
            }
            if (org.hyperColumnarStanceLock === undefined) {
                org.hyperColumnarStanceLock = org.isParaceratheriid ?
                    (0.80 + Math.random() * 0.18) : (0.20 + Math.random() * 0.25);
            }
            if (org.synovialHydraulicBuffering === undefined) {
                org.synovialHydraulicBuffering = org.isParaceratheriid ?
                    (0.82 + Math.random() * 0.15) : (0.22 + Math.random() * 0.25);
            }
            if (org.cervicalExtensionSpan === undefined) {
                org.cervicalExtensionSpan = org.isParaceratheriid ?
                    (1.9 + Math.random() * 0.85) : (0.4 + Math.random() * 0.6);
            }

            // Browsing Foliage, Prehensile Lip & Digestion traits
            if (org.prehensileLipDexterity === undefined) {
                org.prehensileLipDexterity = org.isParaceratheriid ?
                    (0.74 + Math.random() * 0.21) : (0.18 + Math.random() * 0.25);
            }
            if (org.conicalIncisorStripping === undefined) {
                org.conicalIncisorStripping = org.isParaceratheriid ?
                    (0.75 + Math.random() * 0.20) : (0.15 + Math.random() * 0.25);
            }
            if (org.foliageCaloricExtraction === undefined) {
                org.foliageCaloricExtraction = org.isParaceratheriid ?
                    (0.78 + Math.random() * 0.19) : (0.25 + Math.random() * 0.25);
            }
            if (org.gigantothermicMetabolicEfficiency === undefined) {
                org.gigantothermicMetabolicEfficiency = org.isParaceratheriid ?
                    (0.70 + Math.random() * 0.21) : (0.30 + Math.random() * 0.25);
            }

            // Dynamic states
            if (org.paraceratheriidElevationIndex === undefined) {
                org.paraceratheriidElevationIndex = this.calculatePEI(org);
            }
            if (org.browsingFoliageIndex === undefined) {
                org.browsingFoliageIndex = this.calculateBFI(org);
            }

            if (org.hindgutCanopyReserve === undefined) {
                org.hindgutCanopyReserve = 60.0 + Math.random() * 60.0;
            }
            if (org.isCanopyBrowsing === undefined) {
                org.isCanopyBrowsing = false;
            }
            if (org.isStanceLocked === undefined) {
                org.isStanceLocked = false;
            }
        }

        /**
         * Calculate 139th Channel: Paraceratheriid Elevation Index (% PEI)
         * Formulated based on canopy browsing reach, hyper-columnar stance lock,
         * synovial hydraulic buffering, and cervical extension span.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculatePEI(org) {
            if (!org) return 0.0;
            const reach = Math.max(0.0, Math.min(8.5, org.canopyBrowsingReach || 2.0)) / 8.5;
            const lock = Math.max(0.0, Math.min(1.0, org.hyperColumnarStanceLock || 0.20));
            const buffer = Math.max(0.0, Math.min(1.0, org.synovialHydraulicBuffering || 0.20));
            const neck = Math.max(0.0, Math.min(2.8, org.cervicalExtensionSpan || 0.5)) / 2.8;

            const raw = (reach * 0.35 + lock * 0.30 + buffer * 0.20 + neck * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Calculate 140th Channel: Browsing Foliage Index (% BFI)
         * Formulated based on prehensile lip dexterity, conical incisor stripping,
         * foliage caloric extraction, and gigantothermic metabolic efficiency.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateBFI(org) {
            if (!org) return 0.0;
            const lip = Math.max(0.0, Math.min(1.0, org.prehensileLipDexterity || 0.20));
            const incisor = Math.max(0.0, Math.min(1.0, org.conicalIncisorStripping || 0.15));
            const foliage = Math.max(0.0, Math.min(1.0, org.foliageCaloricExtraction || 0.25));
            const giganto = Math.max(0.0, Math.min(1.0, org.gigantothermicMetabolicEfficiency || 0.30));

            const raw = (lip * 0.35 + incisor * 0.30 + foliage * 0.20 + giganto * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Determine biological regime for Paraceratheriid Elevation (% PEI).
         * @param {number} pei - Percent index.
         * @returns {string} Regime tag.
         */
        getPEIRegime(pei) {
            if (pei < 25.0) return "GROUND_LEVEL_GRAZER";
            if (pei < 50.0) return "INCIPIENT_CERVICAL_STRETCH";
            if (pei < 75.0) return "SUB_CANOPY_BROWSER";
            return "APEX_INDRICOTHERE_TITAN";
        }

        /**
         * Determine biological regime for Browsing Foliage Harvesting (% BFI).
         * @param {number} bfi - Percent index.
         * @returns {string} Regime tag.
         */
        getBFIRegime(bfi) {
            if (bfi < 25.0) return "COARSE_HERBAGE_BASAL";
            if (bfi < 50.0) return "SELECTIVE_BRANCH_NIPPER";
            if (bfi < 75.0) return "PREHENSILE_STRIP_HARVESTER";
            return "MEGAHERBIVORE_CANOPY_HARVESTER";
        }

        /**
         * Update physics, kinematics, and high-canopy browsing for all organisms.
         * @param {Array<Object>} organisms - Live cell array.
         * @param {number} dt - Timestep delta.
         * @param {number} boundsWidth - Simulation canvas width.
         * @param {number} boundsHeight - Simulation canvas height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let titanCount = 0;
            let indricoCount = 0;
            let browseCount = 0;
            let lockCount = 0;

            let sumPEI = 0.0;
            let sumBFI = 0.0;
            let sumReach = 0.0;
            let sumLock = 0.0;
            let sumBuffer = 0.0;
            let sumNeck = 0.0;
            let sumLip = 0.0;
            let sumIncisor = 0.0;
            let sumFoliage = 0.0;
            let sumGiganto = 0.0;
            let totalTitanBiomass = 0.0;

            const n = organisms.length;

            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                liveCount++;

                this.initOrganism(org);

                // Compute telemetry metrics per cell
                const pei = this.calculatePEI(org);
                const bfi = this.calculateBFI(org);
                org.paraceratheriidElevationIndex = pei;
                org.browsingFoliageIndex = bfi;

                sumPEI += pei;
                sumBFI += bfi;

                if (org.isParaceratheriid) {
                    titanCount++;
                    if (org.isIndricothere) indricoCount++;

                    sumReach += (org.canopyBrowsingReach || this.baseCanopyReach);
                    sumLock += (org.hyperColumnarStanceLock || this.baseColumnarLock);
                    sumBuffer += (org.synovialHydraulicBuffering || this.baseHydraulicBuffer);
                    sumNeck += (org.cervicalExtensionSpan || this.baseCervicalSpan);
                    sumLip += (org.prehensileLipDexterity || this.baseLipDexterity);
                    sumIncisor += (org.conicalIncisorStripping || this.baseIncisorStripping);
                    sumFoliage += (org.foliageCaloricExtraction || this.baseFoliageExtraction);
                    sumGiganto += (org.gigantothermicMetabolicEfficiency || this.baseGigantothermy);

                    // Massive 15-20 ton proportions
                    totalTitanBiomass += (org.radius || 16.0) * (org.energy || 50.0) * 0.035;

                    // 1. Hyper-Columnar Stance Locking: Low Locomotor Cost
                    // When moving slowly or standing still, lock limbs to reduce metabolic drain
                    const speed = Math.hypot(org.vx || 0, org.vy || 0);
                    if (speed < 0.6) {
                        org.isStanceLocked = true;
                        lockCount++;
                        this.metrics.columnarLockEvents++;

                        // Joint cushioning prevents cartilage fatigue
                        const energySaved = 0.025 * (org.hyperColumnarStanceLock || 0.88);
                        org.energy = Math.min(300.0, (org.energy || 50.0) + energySaved);

                        // Slow gliding inertia
                        org.vx = (org.vx || 0) * 0.70;
                        org.vy = (org.vy || 0) * 0.70;
                    } else {
                        org.isStanceLocked = false;
                    }

                    // 2. High-Canopy Tree Browsing & Prehensile Foliage Stripping
                    // Harvesting upper canopy browse reserves (y < boundsHeight * 0.45)
                    if (org.y < boundsHeight * 0.48 || Math.random() < 0.08) {
                        org.isCanopyBrowsing = true;
                        browseCount++;
                        this.metrics.canopyBrowseEvents++;

                        // Harvest foliage using prehensile lip and neck reach
                        const reachFactor = (org.canopyBrowsingReach || 7.6) / 8.5;
                        const lipDex = org.prehensileLipDexterity || 0.85;
                        const incisorStrip = org.conicalIncisorStripping || 0.84;
                        const harvestYield = reachFactor * lipDex * incisorStrip * 3.2;

                        org.hindgutCanopyReserve = Math.min(180.0, (org.hindgutCanopyReserve || 60.0) + harvestYield);
                        this.metrics.canopyBiomassHarvested += harvestYield;

                        if (Math.random() < 0.15) {
                            this.metrics.branchStripEvents++;
                        }
                    } else {
                        org.isCanopyBrowsing = false;
                    }

                    // 3. Gigantothermic Microbial Hindgut Digestion
                    if (org.hindgutCanopyReserve && org.hindgutCanopyReserve > 5.0) {
                        const extractionRate = (org.foliageCaloricExtraction || 0.86) * 0.35;
                        const gigantoBonus = (org.gigantothermicMetabolicEfficiency || 0.80) * 1.3;
                        const digested = Math.min(org.hindgutCanopyReserve, extractionRate);

                        org.hindgutCanopyReserve -= digested;
                        org.energy = Math.min(320.0, (org.energy || 50.0) + digested * gigantoBonus);
                    }
                }
            }

            // Aggregate metrics
            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalParaceratheriids = titanCount;
            this.metrics.totalIndricotheres = indricoCount;
            this.metrics.activeCanopyBrowsers = browseCount;
            this.metrics.activeColumnarStanceLocks = lockCount;

            this.metrics.meanParaceratheriidElevationIndex = liveCount > 0 ? (sumPEI / liveCount) : 0.0;
            this.metrics.meanBrowsingFoliageIndex = liveCount > 0 ? (sumBFI / liveCount) : 0.0;

            this.metrics.meanCanopyReach = titanCount > 0 ? (sumReach / titanCount) : this.baseCanopyReach;
            this.metrics.meanColumnarLock = titanCount > 0 ? (sumLock / titanCount) : this.baseColumnarLock;
            this.metrics.meanHydraulicBuffer = titanCount > 0 ? (sumBuffer / titanCount) : this.baseHydraulicBuffer;
            this.metrics.meanCervicalSpan = titanCount > 0 ? (sumNeck / titanCount) : this.baseCervicalSpan;
            this.metrics.meanLipDexterity = titanCount > 0 ? (sumLip / titanCount) : this.baseLipDexterity;
            this.metrics.meanIncisorStripping = titanCount > 0 ? (sumIncisor / titanCount) : this.baseIncisorStripping;
            this.metrics.meanFoliageExtraction = titanCount > 0 ? (sumFoliage / titanCount) : this.baseFoliageExtraction;
            this.metrics.meanGigantothermy = titanCount > 0 ? (sumGiganto / titanCount) : this.baseGigantothermy;

            this.metrics.cumulativeTitanBiomass = totalTitanBiomass;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Live organisms array.
         * @param {number} tick - Simulation tick counter.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Paraceratherium metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ParaceratheriumTitanManager;
    }
    if (typeof global !== "undefined") {
        global.ParaceratheriumTitanManager = ParaceratheriumTitanManager;
        global.paraceratheriumTitanManager = new ParaceratheriumTitanManager();
    }
})(typeof window !== "undefined" ? window : global);
