// BioEcosystem - Early Tertiary Megaherbivore Radiation: Graviportal Stance, Cranial Ossicones & Cecal Digestion
// Module: src/organs/pantodont_megaherbivore.js
// Version: 9.12.0 (Hour 632 - System Agent: Pantodont & Dinocerata Megaherbivore Biomechanics Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PantodontMegaherbivoreManager
     * High-fidelity biological simulation of Early Tertiary (Paleocene-Eocene) Megaherbivore Radiation:
     * - Evolutionary Stage & Lineages (*Pantodonta* - *Coryphodon*, *Dinocerata* - *Uintatherium*):
     *   The first post-dinosaur massive terrestrial herbivores attaining 1.5 - 2.5 metric ton body mass.
     * - Graviportal Columnar Stance & Articular Cartilage Damping:
     *   Reorientation of flexed limbs into vertical weight-bearing bone pillars (columnarStanceEfficiency: 0.70 - 0.98).
     *   Direct transmission of multi-ton gravitational forces down vertical bone axes, preventing cartilage wear
     *   (articularCartilageDegeneration) and joint shear failure.
     *   Broad plantigrade foot posture cushioned by dense fibrocartilaginous subdigital pads (plantigradeTraction: 0.75 - 0.98)
     *   yielding high substrate sinking resistance (substrateSinkingResistance: 0.72 - 0.96) in Eocene floodplain mud.
     * - Coarse Fiber Hindgut Digestion & Cecal Fermentation:
     *   Massive hypertrophied cecum and colon (cecalFermentationTransit: 0.72 - 0.96) hosting symbiotic anaerobic
     *   cellulolytic microflora that convert refractory lignified browse and wetland reeds into volatile fatty acids (VFAs).
     *   Prevention of acute ruminal/cecal acidosis and starvation collapse (ruminalFermentationFailure).
     * - Cranial Ossicones & Micro-Trabecular Shock Absorption:
     *   Three paired dermal bone protuberances (nasal bosses, maxillary horns, parietal crests) forming robust ossicones
     *   (cranialOssiconeArmor: 0.75 - 0.98).
     *   Double-tabled cranial vault lined with cancellous micro-trabeculae (trabecularShockAbsorption: 0.70 - 0.95),
     *   damping head-to-head sexual selection clashes and deterring apex predators (*Mesonychids*, *Hyaenodonts*).
     *   High sexual selection display and visual hierarchy dominance (sexualDisplayDominance: 0.70 - 0.98).
     * - Upper Saber Canines & Mandibular Flange Protection:
     *   Elongated 15-22 cm tusk-like upper saber canines (saberCanineShearing: 0.70 - 0.98) for root excavation and combat.
     *   Downward-projecting ventrolateral bony flanges on the mandible (mandibularFlangeProtection: 0.75 - 0.98)
     *   acting as scabbards that protect slender saber blades from lateral snapping upon jaw closure.
     * - 133rd Telemetry Channel (% OVI - Ossicone & Weaponization Index) mathematical core.
     * - 134th Telemetry Channel (% GCI - Graviportal Columnar Index) mathematical core.
     */
    class PantodontMegaherbivoreManager {
        constructor() {
            this.baseColumnarEfficiency = 0.85;            // [0.70 - 0.98]
            this.baseCecalTransit = 0.84;                  // [0.72 - 0.96]
            this.basePlantigradeTraction = 0.86;           // [0.75 - 0.98]
            this.baseSinkingResistance = 0.85;             // [0.72 - 0.96]

            this.baseOssiconeArmor = 0.86;                 // [0.75 - 0.98]
            this.baseSaberShearing = 0.84;                 // [0.70 - 0.98]
            this.baseFlangeProtection = 0.87;              // [0.75 - 0.98]
            this.baseDisplayDominance = 0.85;              // [0.70 - 0.98]

            this.metrics = {
                totalLiveCells: 0,
                totalMegaherbivores: 0,
                totalDinoceratans: 0,
                activePillarStanceFeeders: 0,
                activeOssiconeClashers: 0,
                meanOssiconeWeaponizationIndex: 0.0,       // 133rd Channel % OVI
                meanGraviportalColumnarIndex: 0.0,         // 134th Channel % GCI
                meanColumnarStance: 0.85,
                meanCecalTransit: 0.84,
                meanPlantigradeTraction: 0.86,
                meanSinkingResistance: 0.85,
                meanOssiconeArmor: 0.86,
                meanSaberShearing: 0.84,
                meanFlangeProtection: 0.87,
                meanDisplayDominance: 0.85,
                columnarStanceEvents: 0,
                fiberFermentationPulses: 0,
                ossiconeClashEvents: 0,
                saberExcavationStrikes: 0,
                cumulativeMegaherbivoreBiomass: 0.0
            };

            this.floodplainBrowseBiomass = 200.0;
        }

        /**
         * Initialize or upgrade an organism's Megaherbivore traits.
         * @param {Object} org - Organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isMegaherbivore === undefined) {
                const isHerbivorous = org.dna && (org.dna.diet === "HERBIVORE" || org.dna.diet === "OMNIVORE");
                const isMammalian = org.isTribosphenic || org.isChorioallantoic || org.isPlagiaulacoid ||
                                    org.isArboreal || org.isMultituberculate || org.isEutherian || isHerbivorous;
                org.isMegaherbivore = isMammalian && Math.random() < 0.65;
            }

            if (org.isDinoceratan === undefined) {
                org.isDinoceratan = org.isMegaherbivore && Math.random() < 0.70;
            }

            // Graviportal Columnar Stance & Joint traits
            if (org.columnarStanceEfficiency === undefined) {
                org.columnarStanceEfficiency = org.isMegaherbivore ?
                    (0.72 + Math.random() * 0.24) : (0.15 + Math.random() * 0.30);
            }
            if (org.cecalFermentationTransit === undefined) {
                org.cecalFermentationTransit = org.isMegaherbivore ?
                    (0.74 + Math.random() * 0.22) : (0.20 + Math.random() * 0.30);
            }
            if (org.plantigradeTraction === undefined) {
                org.plantigradeTraction = org.isMegaherbivore ?
                    (0.76 + Math.random() * 0.22) : (0.22 + Math.random() * 0.28);
            }
            if (org.substrateSinkingResistance === undefined) {
                org.substrateSinkingResistance = org.isMegaherbivore ?
                    (0.74 + Math.random() * 0.22) : (0.20 + Math.random() * 0.30);
            }

            // Cranial Ossicones & Weaponization traits
            if (org.cranialOssiconeArmor === undefined) {
                org.cranialOssiconeArmor = org.isDinoceratan ?
                    (0.76 + Math.random() * 0.22) : (0.15 + Math.random() * 0.25);
            }
            if (org.saberCanineShearing === undefined) {
                org.saberCanineShearing = org.isDinoceratan ?
                    (0.72 + Math.random() * 0.24) : (0.18 + Math.random() * 0.26);
            }
            if (org.mandibularFlangeProtection === undefined) {
                org.mandibularFlangeProtection = org.isDinoceratan ?
                    (0.76 + Math.random() * 0.22) : (0.12 + Math.random() * 0.24);
            }
            if (org.sexualDisplayDominance === undefined) {
                org.sexualDisplayDominance = org.isDinoceratan ?
                    (0.73 + Math.random() * 0.24) : (0.20 + Math.random() * 0.30);
            }

            // Dynamic states
            if (org.ossiconeWeaponizationIndex === undefined) {
                org.ossiconeWeaponizationIndex = this.calculateOVI(org);
            }
            if (org.graviportalColumnarIndex === undefined) {
                org.graviportalColumnarIndex = this.calculateGCI(org);
            }

            if (org.articularCartilageIntegrity === undefined) {
                org.articularCartilageIntegrity = 0.95;
            }
            if (org.cecalFiberReserve === undefined) {
                org.cecalFiberReserve = 45.0 + Math.random() * 35.0;
            }
            if (org.isPillarStanceFeeding === undefined) {
                org.isPillarStanceFeeding = false;
            }
            if (org.isOssiconeClashing === undefined) {
                org.isOssiconeClashing = false;
            }
        }

        /**
         * Calculate 133rd Channel: Ossicone & Weaponization Index (% OVI)
         * Formulated based on cranial ossicone armor, saber canine shearing,
         * mandibular flange protection, and sexual display dominance.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateOVI(org) {
            if (!org) return 0.0;
            const armor = Math.max(0.0, Math.min(1.0, org.cranialOssiconeArmor || 0.15));
            const saber = Math.max(0.0, Math.min(1.0, org.saberCanineShearing || 0.18));
            const flange = Math.max(0.0, Math.min(1.0, org.mandibularFlangeProtection || 0.12));
            const display = Math.max(0.0, Math.min(1.0, org.sexualDisplayDominance || 0.20));

            const raw = (armor * 0.35 + saber * 0.30 + flange * 0.20 + display * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Calculate 134th Channel: Graviportal Columnar Index (% GCI)
         * Formulated based on columnar stance efficiency, cecal fermentation transit,
         * plantigrade traction, and substrate sinking resistance.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateGCI(org) {
            if (!org) return 0.0;
            const stance = Math.max(0.0, Math.min(1.0, org.columnarStanceEfficiency || 0.15));
            const cecal = Math.max(0.0, Math.min(1.0, org.cecalFermentationTransit || 0.20));
            const traction = Math.max(0.0, Math.min(1.0, org.plantigradeTraction || 0.22));
            const sinking = Math.max(0.0, Math.min(1.0, org.substrateSinkingResistance || 0.20));

            const raw = (stance * 0.35 + cecal * 0.30 + traction * 0.20 + sinking * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Determine biological regime for Ossicone & Weaponization (% OVI).
         * @param {number} ovi - Percent index.
         * @returns {string} Regime tag.
         */
        getOVIRegime(ovi) {
            if (ovi < 25.0) return "UNARMED_HORNLESS_BASAL";
            if (ovi < 50.0) return "INCIPIENT_NASAL_BOSSES";
            if (ovi < 75.0) return "TRIPLE_HORNED_UINTATHERID";
            return "APEX_ARMORED_TITAN";
        }

        /**
         * Determine biological regime for Graviportal Columnar Stance (% GCI).
         * @param {number} gci - Percent index.
         * @returns {string} Regime tag.
         */
        getGCIRegime(gci) {
            if (gci < 25.0) return "FLEXED_LIMB_AGILE";
            if (gci < 50.0) return "SEMI_COLUMNAR_SUBGRAVIPORTAL";
            if (gci < 75.0) return "FULL_GRAVIPORTAL_PILLAR";
            return "MEGAHERBIVORE_FOREST_TITAN";
        }

        /**
         * Update physics, kinematics, and ecological dynamics for all organisms.
         * @param {Array<Object>} organisms - Live cell array.
         * @param {number} dt - Timestep delta.
         * @param {number} boundsWidth - Simulation canvas width.
         * @param {number} boundsHeight - Simulation canvas height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let megaCount = 0;
            let dinoCount = 0;
            let pillarCount = 0;
            let clashCount = 0;

            let sumOVI = 0.0;
            let sumGCI = 0.0;
            let sumStance = 0.0;
            let sumCecal = 0.0;
            let sumTraction = 0.0;
            let sumSinking = 0.0;
            let sumArmor = 0.0;
            let sumSaber = 0.0;
            let sumFlange = 0.0;
            let sumDisplay = 0.0;
            let totalMegaBiomass = 0.0;

            const time = Date.now() * 0.001;
            this.floodplainBrowseBiomass = Math.min(250.0, this.floodplainBrowseBiomass + dt * 3.5);

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                liveCount++;
                this.initOrganism(org);

                const ovi = this.calculateOVI(org);
                const gci = this.calculateGCI(org);
                org.ossiconeWeaponizationIndex = ovi;
                org.graviportalColumnarIndex = gci;

                sumOVI += ovi;
                sumGCI += gci;

                const bioWeight = (org.energy || 50.0) * (org.isMegaherbivore ? 2.5 : 1.0);
                totalMegaBiomass += bioWeight;

                if (org.isMegaherbivore) {
                    megaCount++;
                    sumStance += (org.columnarStanceEfficiency || 0.85);
                    sumCecal += (org.cecalFermentationTransit || 0.84);
                    sumTraction += (org.plantigradeTraction || 0.86);
                    sumSinking += (org.substrateSinkingResistance || 0.85);

                    // 1. Columnar Pillar Stance Feeding:
                    // Upright leg posture saves metabolic energy and allows prolonged browsing in floodplains
                    if (org.y > boundsHeight * 0.40) {
                        org.isPillarStanceFeeding = true;
                        pillarCount++;

                        // Stance protects cartilage from flexural shear
                        org.articularCartilageIntegrity = Math.min(1.0, org.articularCartilageIntegrity + 0.0008);

                        // Slow, deliberate, steady striding (no skittering or frantic collisions)
                        if (org.vx !== undefined && org.vy !== undefined) {
                            org.vx *= 0.94;
                            org.vy *= 0.94;
                        }

                        // Feed on coarse fibrous browse
                        if (this.floodplainBrowseBiomass > 2.0 && Math.random() < 0.25) {
                            const browsed = Math.min(3.5, this.floodplainBrowseBiomass);
                            this.floodplainBrowseBiomass -= browsed;
                            org.cecalFiberReserve = Math.min(100.0, org.cecalFiberReserve + browsed * 4.0);
                            this.metrics.columnarStanceEvents++;
                        }
                    } else {
                        org.isPillarStanceFeeding = false;
                    }

                    // 2. Hindgut Cecal Fermentation:
                    // Continuously converts fibrous forage reserve into volatile fatty acid energy
                    if (org.cecalFiberReserve > 0.5) {
                        const fermentRate = dt * (0.45 + (org.cecalFermentationTransit || 0.84) * 0.65);
                        org.cecalFiberReserve = Math.max(0.0, org.cecalFiberReserve - fermentRate);
                        const vfaYield = fermentRate * 1.85;
                        org.energy = Math.min(220.0, (org.energy || 50.0) + vfaYield);
                        if (Math.random() < 0.05) this.metrics.fiberFermentationPulses++;
                    } else {
                        // Lack of fiber triggers metabolic strain
                        org.energy = Math.max(10.0, (org.energy || 50.0) - dt * 0.8);
                    }
                }

                if (org.isDinoceratan) {
                    dinoCount++;
                    sumArmor += (org.cranialOssiconeArmor || 0.86);
                    sumSaber += (org.saberCanineShearing || 0.84);
                    sumFlange += (org.mandibularFlangeProtection || 0.87);
                    sumDisplay += (org.sexualDisplayDominance || 0.85);

                    // 3. Cranial Ossicone Clashing & Social Hierarchy:
                    // When proximate to rival Dinoceratans, engage in head-to-head dominance display
                    for (let j = i + 1; j < organisms.length; j++) {
                        const rival = organisms[j];
                        if (!rival || !rival.alive || !rival.isDinoceratan) continue;

                        const dx = rival.x - org.x;
                        const dy = rival.y - org.y;
                        const distSq = dx * dx + dy * dy;

                        if (distSq < 2500) { // Within 50px
                            org.isOssiconeClashing = true;
                            rival.isOssiconeClashing = true;
                            clashCount++;

                            // Trabecular bone absorbs impact, preventing cranial trauma
                            const shockAbsorbed = (org.cranialOssiconeArmor || 0.85) * (org.sexualDisplayDominance || 0.85);
                            org.energy = Math.min(200.0, (org.energy || 50.0) + shockAbsorbed * 0.05);

                            // Mutual repulsion (ritualized combat pushback)
                            const dist = Math.sqrt(distSq) || 1.0;
                            const nx = dx / dist;
                            const ny = dy / dist;
                            org.x -= nx * 0.6;
                            org.y -= ny * 0.6;
                            rival.x += nx * 0.6;
                            rival.y += ny * 0.6;

                            this.metrics.ossiconeClashEvents++;
                            break;
                        }
                    }

                    // 4. Saber Canine Root Excavation:
                    // Digging into marshy floodplains for nutrient-dense tubers
                    if (Math.random() < 0.06 && org.isPillarStanceFeeding) {
                        const excavatedYield = (org.saberCanineShearing || 0.84) * 2.2;
                        org.energy = Math.min(240.0, (org.energy || 50.0) + excavatedYield);
                        this.metrics.saberExcavationStrikes++;
                    }
                }
            }

            // Metric aggregations
            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalMegaherbivores = megaCount;
            this.metrics.totalDinoceratans = dinoCount;
            this.metrics.activePillarStanceFeeders = pillarCount;
            this.metrics.activeOssiconeClashers = clashCount;

            this.metrics.meanOssiconeWeaponizationIndex = liveCount > 0 ? (sumOVI / liveCount) : 0.0;
            this.metrics.meanGraviportalColumnarIndex = liveCount > 0 ? (sumGCI / liveCount) : 0.0;

            this.metrics.meanColumnarStance = megaCount > 0 ? (sumStance / megaCount) : 0.85;
            this.metrics.meanCecalTransit = megaCount > 0 ? (sumCecal / megaCount) : 0.84;
            this.metrics.meanPlantigradeTraction = megaCount > 0 ? (sumTraction / megaCount) : 0.86;
            this.metrics.meanSinkingResistance = megaCount > 0 ? (sumSinking / megaCount) : 0.85;

            this.metrics.meanOssiconeArmor = dinoCount > 0 ? (sumArmor / dinoCount) : 0.86;
            this.metrics.meanSaberShearing = dinoCount > 0 ? (sumSaber / dinoCount) : 0.84;
            this.metrics.meanFlangeProtection = dinoCount > 0 ? (sumFlange / dinoCount) : 0.87;
            this.metrics.meanDisplayDominance = dinoCount > 0 ? (sumDisplay / dinoCount) : 0.85;

            this.metrics.cumulativeMegaherbivoreBiomass = totalMegaBiomass;
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
         * @returns {Object} Comprehensive Megaherbivore metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PantodontMegaherbivoreManager;
    }
    if (typeof global !== "undefined") {
        global.PantodontMegaherbivoreManager = PantodontMegaherbivoreManager;
        global.pantodontMegaherbivoreManager = new PantodontMegaherbivoreManager();
    }
})(typeof window !== "undefined" ? window : global);
