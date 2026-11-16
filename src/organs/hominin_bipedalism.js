// BioEcosystem - Pliocene Early Hominin Bipedalism & Lithic Tool Culture
// Module: src/organs/hominin_bipedalism.js
// Version: 9.60.0 (Hour 680 - System Agent: Femur Valgus Angle, Double Plantar Arch, Opposable Precision Grip, Oldowan Percussion & 149th/150th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HomininBipedalismManager
     * High-fidelity biological simulation of Pliocene Early Hominins (Hominini / Australopithecina - Australopithecus afarensis):
     * - Evolutionary Stage & Lineages:
     *   The Pliocene opening of East African savanna-mosaic landscapes prompted the terrestrial transition of hominins:
     *   1. Femur Valgus Angle & Pelvic Abductor Stability (Australopithecus afarensis / "Lucy" type):
     *      Femoral shaft angled inward toward the knee (femurValgusAngle: 8 - 14 deg), centering the center of gravity
     *      directly over the stance foot during the single-support phase of locomotion.
     *      Flared, shortened iliac blades (iliacBladeFlare: 0.75 - 0.98) repositioning the lesser gluteal muscles
     *      (gluteus medius and minimus) as pelvic abductors to prevent trunk collapse (waddling) on the unsupported side.
     *      65% metabolic energy savings during habitual bipedal striding over long savanna foraging distances
     *      (habitualBipedalLocomotion: 0.72 - 0.96).
     *   2. Double Plantar Arch & Adducted Hallux Toe-Off Mechanics:
     *      Adducted, parallel-aligned great toe (adductedHalluxStability: 0.75 - 0.98) replacing arboreal divergent grasping hallux.
     *      Double-domed elastic foot vault (plantarArchCompliance: 0.75 - 0.98) featuring longitudinal and transverse arches
     *      storing kinetic elastic strain energy during mid-stance and releasing powerful propulsive toe-off torque.
     *      Long-distance terrestrial trekking endurance (bipedalStaminaBuffer: 0.70 - 0.95).
     *   3. Opposable Thumb Precision Grip & Lithic Tool Manipulation:
     *      Hypertrophied, elongated pollex with independent flexor pollicis longus muscular control
     *      (opposableThumbPrecisionGrip: 0.75 - 0.98), enabling pad-to-pad precision gripping with the index finger.
     *      Fine motor coordination (fineMotorControlIndex: 0.72 - 0.96) allowing controlled stone-on-stone percussion.
     *   4. Oldowan Lithic Percussion & Scavenged Bone Marrow Extraction:
     *      Knapping volcanic river cobbles (basalt/quartzite) with an angled hammerstone (oldowanPercussionFlaking: 0.70 - 0.95)
     *      to produce sharp conchoidal flakes and bifacial choppers.
     *      Smashing dense ungulate cortical limb bones (femur, tibia) left by apex machairodonts to access calorie-rich
     *      marrow lipids (lithicBoneMarrowHarvestYield: 0.72 - 0.96, encephalizationLipidBonus: 0.70 - 0.95).
     * - Telemetry Channels:
     *   149th Channel: Bipedal Alignment & Striding Index (% BAI)
     *   150th Channel: Tool Manipulation & Lithic Index (% TMI)
     */
    class HomininBipedalismManager {
        /**
         * Initialize Hominin Bipedalism & Lithic Tool Manager.
         */
        constructor() {
            this.metrics = {
                totalHominins: 0,
                activeBipedalWalkers: 0,
                activeToolKnappers: 0,
                activeMarrowForagers: 0,
                meanValgusAngle: 10.5,
                meanIliacFlare: 0.86,
                meanHalluxStability: 0.86,
                meanPlantarArch: 0.85,
                meanPrecisionGrip: 0.87,
                meanPercussionFlaking: 0.84,
                meanMarrowHarvestYield: 0.84,
                meanLipidBonus: 0.83,
                meanBipedalIndex: 0.0,
                meanToolIndex: 0.0,
                bipedalStrideEvents: 0,
                lithicKnappingEvents: 0,
                boneMarrowCrushEvents: 0,
                scavengedLipidBiomass: 0.0,
                cumulativeHomininBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Hominin Bipedalism traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Check eligibility:
            // Primates / arboreal mammals or omnivorous intelligent mammals evolving bipedal posture
            const isPrimate = org.isArboreal || org.isStereoscopic || (org.diet === "omnivore" && org.mass >= 8.0 && org.mass <= 35.0);
            const isHomininCandidate = isPrimate || (org.generation && org.generation >= 20 && !org.isCarnivore && !org.isCetacean && !org.isUngulate);

            if (!isHomininCandidate) return;

            if (org.isHominin === undefined) {
                // Probabilistic activation for hominin lineage
                const activates = Math.random() < 0.40 || org.isPrimate;
                if (!activates) return;

                org.isHominin = true;

                // 1. Skeletal Bipedal Alignment Attributes
                org.femurValgusAngle = 8.0 + Math.random() * 6.0; // 8 - 14 degrees
                org.iliacBladeFlare = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.habitualBipedalLocomotion = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.bipedalStepPhase = Math.random() * Math.PI * 2;

                // 2. Double Plantar Arch & Adducted Hallux Attributes
                org.adductedHalluxStability = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.plantarArchCompliance = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.bipedalStaminaBuffer = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.isStriding = false;

                // 3. Precision Grip & Manual Dexterity Attributes
                org.opposableThumbPrecisionGrip = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.fineMotorControlIndex = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.hasLithicTool = Math.random() < 0.55;

                // 4. Oldowan Lithic Percussion & Marrow Extraction Attributes
                org.oldowanPercussionFlaking = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.lithicBoneMarrowHarvestYield = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.encephalizationLipidBonus = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.isKnappingStone = false;
                org.isCrackingMarrow = false;
                org.knappingCooldown = 0;

                // Telemetry Channel Indices
                org.bipedalAlignmentIndex = 0.0;
                org.toolManipulationIndex = 0.0;
            }
        }

        /**
         * Update hominin bipedal walking, stone tool knapping, and scavenging per tick.
         * @param {Object} org - Organism instance.
         * @param {Array} allOrgs - Population pool.
         * @param {Object} env - Environmental state.
         * @param {number} dt - Time delta.
         */
        update(org, allOrgs, env, dt) {
            if (!org || !org.alive || !org.isHominin) return;

            const timeStep = dt || 1.0;

            // 1. Habitual Bipedal Striding & Gait Kinematics
            org.bipedalStepPhase = (org.bipedalStepPhase || 0) + 0.18 * timeStep;
            const currentSpeed = Math.hypot(org.vx || 0, org.vy || 0);
            org.isStriding = currentSpeed > 0.4;

            if (org.isStriding) {
                this.metrics.bipedalStrideEvents++;
                // Energy efficiency bonus from valgus angle and plantar arch recoil
                const gaitEfficiency = (org.femurValgusAngle / 14.0) * 0.40 + (org.plantarArchCompliance * 0.35) + (org.iliacBladeFlare * 0.25);
                const energySaved = (1.0 - gaitEfficiency * 0.45) * 0.015 * timeStep;
                org.energy = Math.max(0.5, org.energy - energySaved);
            }

            // 2. Oldowan Stone Tool Knapping & Maintenance
            if (org.knappingCooldown > 0) {
                org.knappingCooldown -= timeStep;
            } else if (!org.hasLithicTool && Math.random() < org.oldowanPercussionFlaking * 0.08) {
                // Knap a new sharp chopper/flake tool from river cobbles
                org.isKnappingStone = true;
                org.hasLithicTool = true;
                org.knappingCooldown = 60.0; // Ticks before tool dulls
                this.metrics.lithicKnappingEvents++;
            } else {
                org.isKnappingStone = false;
            }

            // 3. Scavenged Carcass Detection & Cortical Bone Marrow Extraction
            org.isCrackingMarrow = false;
            let nearestCarcass = null;
            let minCarcassDist = 70.0; // Sensing radius for scavengeable remains

            if (allOrgs && allOrgs.length > 0) {
                for (let i = 0; i < allOrgs.length; i++) {
                    const other = allOrgs[i];
                    if (!other || other === org) continue;

                    // Scavenge from dead entities or heavy herbivores
                    const isHarvestable = (!other.alive) || (other.isDead) || (other.isMegaherbivore && other.energy < 20.0);
                    if (!isHarvestable) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minCarcassDist) {
                        minCarcassDist = dist;
                        nearestCarcass = other;
                    }
                }
            }

            // Smash cortical limb bone using lithic chopper
            if (nearestCarcass && org.hasLithicTool) {
                org.isCrackingMarrow = true;
                this.metrics.boneMarrowCrushEvents++;

                // Caloric lipid yield from extracted bone marrow
                const marrowYield = org.lithicBoneMarrowHarvestYield * org.encephalizationLipidBonus * 0.25 * timeStep;
                org.energy = Math.min((org.maxEnergy || 110.0), org.energy + marrowYield);
                this.metrics.scavengedLipidBiomass += marrowYield;

                // Tool wear
                if (Math.random() < 0.04) {
                    org.hasLithicTool = false; // Tool fractured or discarded
                }
            }

            // 4. Compute 149th & 150th Telemetry Channel Metrics
            // % BAI (Bipedal Alignment & Striding Index):
            // ((Valgus - 4.0) / 10.0) * 0.35 + IliacFlare * 0.25 + Hallux * 0.20 + PlantarArch * 0.20
            const normValgus = Math.max(0.0, Math.min(1.0, (org.femurValgusAngle - 4.0) / 10.0));
            const rawBAI = (normValgus * 0.35 +
                            org.iliacBladeFlare * 0.25 +
                            org.adductedHalluxStability * 0.20 +
                            org.plantarArchCompliance * 0.20) * 100.0;
            org.bipedalAlignmentIndex = Math.min(100.0, Math.max(0.0, rawBAI));

            // % TMI (Tool Manipulation & Lithic Index):
            // PrecisionGrip * 0.35 + PercussionFlaking * 0.30 + MarrowYield * 0.20 + FineMotor * 0.15
            const rawTMI = (org.opposableThumbPrecisionGrip * 0.35 +
                            org.oldowanPercussionFlaking * 0.30 +
                            org.lithicBoneMarrowHarvestYield * 0.20 +
                            org.fineMotorControlIndex * 0.15) * 100.0;
            org.toolManipulationIndex = Math.min(100.0, Math.max(0.0, rawTMI));
        }

        /**
         * Process population-level step and synthesize aggregate metrics.
         * @param {Array} organisms - All current simulation entities.
         * @param {Object} env - Environmental context.
         * @param {number} dt - Time delta.
         */
        step(organisms, env, dt) {
            if (!organisms) return;

            let count = 0;
            let activeWalkers = 0;
            let activeKnappers = 0;
            let activeMarrowEaters = 0;

            let sumValgus = 0;
            let sumIliac = 0;
            let sumHallux = 0;
            let sumPlantar = 0;
            let sumGrip = 0;
            let sumFlaking = 0;
            let sumMarrow = 0;
            let sumLipid = 0;
            let sumBAI = 0;
            let sumTMI = 0;
            let sumBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;

                this.initOrganism(o);

                if (o.isHominin) {
                    this.update(o, organisms, env, dt);

                    count++;
                    if (o.isStriding) activeWalkers++;
                    if (o.isKnappingStone) activeKnappers++;
                    if (o.isCrackingMarrow) activeMarrowEaters++;

                    sumValgus += o.femurValgusAngle || 10.5;
                    sumIliac += o.iliacBladeFlare || 0.85;
                    sumHallux += o.adductedHalluxStability || 0.85;
                    sumPlantar += o.plantarArchCompliance || 0.85;
                    sumGrip += o.opposableThumbPrecisionGrip || 0.86;
                    sumFlaking += o.oldowanPercussionFlaking || 0.82;
                    sumMarrow += o.lithicBoneMarrowHarvestYield || 0.83;
                    sumLipid += o.encephalizationLipidBonus || 0.82;
                    sumBAI += o.bipedalAlignmentIndex || 0.0;
                    sumTMI += o.toolManipulationIndex || 0.0;
                    sumBiomass += (o.mass || 10.0);
                }
            }

            this.metrics.totalHominins = count;
            this.metrics.activeBipedalWalkers = activeWalkers;
            this.metrics.activeToolKnappers = activeKnappers;
            this.metrics.activeMarrowForagers = activeMarrowEaters;

            if (count > 0) {
                this.metrics.meanValgusAngle = parseFloat((sumValgus / count).toFixed(1));
                this.metrics.meanIliacFlare = parseFloat((sumIliac / count).toFixed(2));
                this.metrics.meanHalluxStability = parseFloat((sumHallux / count).toFixed(2));
                this.metrics.meanPlantarArch = parseFloat((sumPlantar / count).toFixed(2));
                this.metrics.meanPrecisionGrip = parseFloat((sumGrip / count).toFixed(2));
                this.metrics.meanPercussionFlaking = parseFloat((sumFlaking / count).toFixed(2));
                this.metrics.meanMarrowHarvestYield = parseFloat((sumMarrow / count).toFixed(2));
                this.metrics.meanLipidBonus = parseFloat((sumLipid / count).toFixed(2));
                this.metrics.meanBipedalIndex = parseFloat((sumBAI / count).toFixed(1));
                this.metrics.meanToolIndex = parseFloat((sumTMI / count).toFixed(1));
                this.metrics.cumulativeHomininBiomass = parseFloat(sumBiomass.toFixed(2));
            } else {
                this.metrics.meanBipedalIndex = 0.0;
                this.metrics.meanToolIndex = 0.0;
            }
        }

        /**
         * Get synthesized population-level metrics.
         * @returns {Object} Metric summary.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Get 4 biological regimes for 149th Channel (% BAI).
         * @param {number} baiValue - Bipedal Alignment Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        getBipedalRegime(baiValue) {
            const v = Math.max(0.0, Math.min(100.0, baiValue || 0.0));
            if (v <= 25.0) {
                return { name: "QUADRUPEDAL_ARBOREAL_CLIMBER", desc: "Quadrupedal Arboreal Climber & Branch Swinger", class: "bai-quadruped" };
            } else if (v <= 50.0) {
                return { name: "FACULTATIVE_BIPEDAL_WADDLER", desc: "Facultative Bipedal Waddler & Occasional Stander", class: "bai-waddler" };
            } else if (v <= 75.0) {
                return { name: "HABITUAL_STRIDING_HOMININ", desc: "Habitual Striding Hominin & Savanna Scout", class: "bai-striding" };
            } else {
                return { name: "APEX_BIPEDAL_ENDURANCE_WALKER", desc: "Apex Bipedal Endurance Walker & Steppe Trekker", class: "bai-endurance" };
            }
        }

        /**
         * Get 4 biological regimes for 150th Channel (% TMI).
         * @param {number} tmiValue - Tool Manipulation Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        getToolRegime(tmiValue) {
            const v = Math.max(0.0, Math.min(100.0, tmiValue || 0.0));
            if (v <= 25.0) {
                return { name: "NON_TOOL_ORGANIC_FORAGER", desc: "Non-Tool Organic Forager & Hand Scraper", class: "tmi-nontool" };
            } else if (v <= 50.0) {
                return { name: "OPPORTUNISTIC_COBBLE_USER", desc: "Opportunistic Cobble User & Shell Basher", class: "tmi-cobble" };
            } else if (v <= 75.0) {
                return { name: "OLDOWAN_LITHIC_KNAPPER", desc: "Oldowan Lithic Knapper & Marrow Forager", class: "tmi-oldowan" };
            } else {
                return { name: "MASTER_TOOLMAKER_HOMININ", desc: "Master Toolmaker Hominin & Cognitive Lithic Pioneer", class: "tmi-master" };
            }
        }
    }

    // Export module globally
    global.HomininBipedalismManager = HomininBipedalismManager;
    global.homininBipedalismManager = new HomininBipedalismManager();

})(typeof window !== "undefined" ? window : global);
