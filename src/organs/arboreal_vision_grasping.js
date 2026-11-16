// BioEcosystem - Early Tertiary Mammalian Adaptive Radiation: Arboreal Grasping & Stereoscopic Vision
// Module: src/organs/arboreal_vision_grasping.js
// Version: 9.00.0 (Hour 620 - System Agent: Opposable Hallux/Pollex, Flat Nails, Orbital Convergence & Stereoscopic Disparity Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ArborealVisionGraspingManager
     * High-fidelity biological simulation of Early Tertiary (Paleocene - Eocene) Mammalian Adaptive Radiation:
     * - Arboreal Canopy Niche & Fine Branch Locomotion (*Purgatorius*, *Plesiadapis*, *Teilhardina* clades):
     *   Evolution of opposable hallux (great toe) and pollex (thumb) with 60 to 95 degrees divergence angle,
     *   transforming linear claw-based scaling into rotational friction branch grasping.
     *   Keratinized flat nails providing counter-pressure support to sensitive apical tactile skin pads,
     *   preventing branch slippage and bark puncture on slender terminal twigs (1 - 3 cm diameter).
     *   High-yield arboreal foraging for angiosperm fruits, flowers, seeds, and canopy insects.
     * - Orbital Convergence & Stereoscopic Binocular Vision:
     *   Migration of orbital sockets from lateral positions to front-facing positions (55 to 85 degrees convergence),
     *   yielding a large binocular overlap zone.
     *   Visual cortex stereoscopic disparity processing calculating precise three-dimensional distance to targets.
     *   Sub-millimeter branch-to-branch jumping precision reducing deadly canopy falls.
     *   Enhanced detection of camouflaged canopy prey and ripe fruit clusters amidst dense foliage.
     * - 129th Telemetry Channel (% BVI - Binocular Vision Index & Depth Perception) mathematical core.
     * - 130th Telemetry Channel (% OGI - Opposable Grasping Index & Arboreal Locomotion) mathematical core.
     */
    class ArborealVisionGraspingManager {
        constructor() {
            this.baseHalluxDivergence = 78.0;              // [60 - 95 degrees]
            this.baseGraspingTorque = 0.85;                // [0.70 - 0.98]
            this.baseNailSupport = 0.86;                   // [0.70 - 0.96]
            this.baseForagingYield = 0.88;                 // [0.75 - 0.98]
            this.baseOrbitalConvergence = 72.0;            // [55 - 85 degrees]
            this.baseStereoscopicDisparity = 0.84;         // [0.70 - 0.98]
            this.baseJumpPrecision = 0.86;                 // [0.75 - 0.98]
            this.baseCamouflageDetection = 0.82;           // [0.70 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalArborealMammals: 0,
                totalStereoCapable: 0,
                activeBranchGraspers: 0,
                activeCanopyJumpers: 0,
                meanBinocularVisionIndex: 0.0,             // 129th Channel % BVI
                meanOpposableGraspingIndex: 0.0,           // 130th Channel % OGI
                meanOrbitalConvergence: 72.0,
                meanStereoscopicDisparity: 0.84,
                meanJumpPrecision: 0.86,
                meanCamouflageDetection: 0.82,
                meanHalluxDivergence: 78.0,
                meanGraspingTorque: 0.85,
                meanNailSupport: 0.86,
                meanForagingYield: 0.88,
                canopyFruitHarvestEvents: 0,
                precisionJumpEvents: 0,
                camouflagePreyCaptures: 0,
                cumulativeCanopyBiomass: 0.0
            };

            this.canopyCanopyFoodPool = 120.0;
        }

        /**
         * Initialize or upgrade an organism's arboreal grasping and binocular vision traits.
         * @param {Object} org - Organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isArboreal === undefined) {
                const isMammalian = org.isTribosphenic || org.isChorioallantoic || org.isPlagiaulacoid ||
                                    org.isMultituberculate || org.isMetatherian || org.isEutherian ||
                                    (org.dna && (org.dna.diet === "HERBIVORE" || org.dna.diet === "OMNIVORE"));
                org.isArboreal = isMammalian && Math.random() < 0.65;
            }

            if (org.isStereoCapable === undefined) {
                org.isStereoCapable = org.isArboreal || Math.random() < 0.70;
            }

            // Opposable Grasping traits
            if (org.halluxDivergenceAngle === undefined) {
                org.halluxDivergenceAngle = org.isArboreal ?
                    (65.0 + Math.random() * 25.0) : (15.0 + Math.random() * 25.0);
            }
            if (org.branchGraspingTorque === undefined) {
                org.branchGraspingTorque = org.isArboreal ?
                    (0.72 + Math.random() * 0.24) : (0.20 + Math.random() * 0.35);
            }
            if (org.flatNailSupport === undefined) {
                org.flatNailSupport = org.isArboreal ?
                    (0.70 + Math.random() * 0.25) : (0.15 + Math.random() * 0.30);
            }
            if (org.arborealForagingYield === undefined) {
                org.arborealForagingYield = org.isArboreal ?
                    (0.75 + Math.random() * 0.22) : (0.25 + Math.random() * 0.30);
            }

            // Binocular Vision & Stereopsis traits
            if (org.orbitalConvergenceAngle === undefined) {
                org.orbitalConvergenceAngle = org.isStereoCapable ?
                    (60.0 + Math.random() * 23.0) : (20.0 + Math.random() * 25.0);
            }
            if (org.stereoscopicDisparityAcuity === undefined) {
                org.stereoscopicDisparityAcuity = org.isStereoCapable ?
                    (0.72 + Math.random() * 0.24) : (0.18 + Math.random() * 0.32);
            }
            if (org.branchJumpPrecision === undefined) {
                org.branchJumpPrecision = org.isStereoCapable ?
                    (0.74 + Math.random() * 0.22) : (0.20 + Math.random() * 0.30);
            }
            if (org.visualCamouflageDetection === undefined) {
                org.visualCamouflageDetection = org.isStereoCapable ?
                    (0.70 + Math.random() * 0.25) : (0.22 + Math.random() * 0.30);
            }

            // Dynamics state
            if (org.isInCanopy === undefined) org.isInCanopy = org.isArboreal;
            if (org.branchJumpCooldown === undefined) org.branchJumpCooldown = 0.0;
            if (org.isGraspingBranch === undefined) org.isGraspingBranch = false;
            if (org.canopyElevationY === undefined) {
                org.canopyElevationY = org.isArboreal ? (60.0 + Math.random() * 180.0) : 0.0;
            }
        }

        /**
         * Calculate 129th Channel: Binocular Vision Index (% BVI)
         * Formulated based on orbital convergence angle, stereoscopic disparity,
         * precision jump accuracy, and camouflage prey detection.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateBVI(org) {
            if (!org) return 0.0;
            const convRatio = Math.max(0.0, Math.min(1.0, (org.orbitalConvergenceAngle || 20.0) / 85.0));
            const disp = Math.max(0.0, Math.min(1.0, org.stereoscopicDisparityAcuity || 0.20));
            const jump = Math.max(0.0, Math.min(1.0, org.branchJumpPrecision || 0.20));
            const camo = Math.max(0.0, Math.min(1.0, org.visualCamouflageDetection || 0.20));

            const raw = (convRatio * 0.35 + disp * 0.30 + jump * 0.20 + camo * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Calculate 130th Channel: Opposable Grasping Index (% OGI)
         * Formulated based on branch grasping torque, hallux divergence angle,
         * arboreal foraging yield, and flat nail support.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateOGI(org) {
            if (!org) return 0.0;
            const torque = Math.max(0.0, Math.min(1.0, org.branchGraspingTorque || 0.20));
            const halluxRatio = Math.max(0.0, Math.min(1.0, (org.halluxDivergenceAngle || 15.0) / 95.0));
            const yieldVal = Math.max(0.0, Math.min(1.0, org.arborealForagingYield || 0.20));
            const nail = Math.max(0.0, Math.min(1.0, org.flatNailSupport || 0.15));

            const raw = (torque * 0.35 + halluxRatio * 0.30 + yieldVal * 0.20 + nail * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Determine biological regime for Binocular Vision (% BVI).
         * @param {number} bvi - Percent index.
         * @returns {string} Regime tag.
         */
        getBVIRegime(bvi) {
            if (bvi < 25.0) return "LATERAL_MONOCULAR_FLAT";
            if (bvi < 50.0) return "INCIPIENT_ORBITAL_CONVERGENCE";
            if (bvi < 75.0) return "STEREO_BINOCULAR_OVERLAP";
            return "HIGH_PRECISION_CANOPY_ACUITY";
        }

        /**
         * Determine biological regime for Opposable Grasping (% OGI).
         * @param {number} ogi - Percent index.
         * @returns {string} Regime tag.
         */
        getOGIRegime(ogi) {
            if (ogi < 25.0) return "NON_OPPOSABLE_CLAW_GRIP";
            if (ogi < 50.0) return "INCIPIENT_HALLUX_DIVERGENCE";
            if (ogi < 75.0) return "FUNCTIONAL_OPPOSABLE_GRASP";
            return "ARBOREAL_CANOPY_ACROBATICS";
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
            let arborealCount = 0;
            let stereoCount = 0;
            let grasperCount = 0;
            let jumperCount = 0;

            let sumBVI = 0.0;
            let sumOGI = 0.0;
            let sumConv = 0.0;
            let sumDisp = 0.0;
            let sumJump = 0.0;
            let sumCamo = 0.0;
            let sumHallux = 0.0;
            let sumTorque = 0.0;
            let sumNail = 0.0;
            let sumYield = 0.0;
            let totalCanopyBiomass = 0.0;

            // Replenish canopy fruits pool
            this.canopyCanopyFoodPool = Math.min(200.0, this.canopyCanopyFoodPool + 0.12);

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                liveCount++;

                this.initOrganism(org);

                const bvi = this.calculateBVI(org);
                const ogi = this.calculateOGI(org);

                org.binocularVisionIndex = bvi;
                org.opposableGraspingIndex = ogi;
                org.bviRegime = this.getBVIRegime(bvi);
                org.ogiRegime = this.getOGIRegime(ogi);

                if (org.isStereoCapable) {
                    stereoCount++;
                    sumBVI += bvi;
                    sumConv += (org.orbitalConvergenceAngle || 72.0);
                    sumDisp += (org.stereoscopicDisparityAcuity || 0.84);
                    sumJump += (org.branchJumpPrecision || 0.86);
                    sumCamo += (org.visualCamouflageDetection || 0.82);
                }

                if (org.isArboreal) {
                    arborealCount++;
                    sumOGI += ogi;
                    sumHallux += (org.halluxDivergenceAngle || 78.0);
                    sumTorque += (org.branchGraspingTorque || 0.85);
                    sumNail += (org.flatNailSupport || 0.86);
                    sumYield += (org.arborealForagingYield || 0.88);
                    totalCanopyBiomass += (org.energy || 20.0);

                    // Arboreal grasping kinematics & stability
                    if (org.branchGraspingTorque > 0.60) {
                        org.isGraspingBranch = true;
                        grasperCount++;
                        // Grasping stability dampens unwanted environmental lateral turbulence
                        if (org.vx) org.vx *= 0.94;
                        if (org.vy) org.vy *= 0.94;
                    } else {
                        org.isGraspingBranch = false;
                    }

                    // Stereoscopic precision branch jumps
                    if (org.branchJumpCooldown > 0) {
                        org.branchJumpCooldown -= (dt || 0.016);
                    } else if (org.branchJumpPrecision > 0.70 && Math.random() < 0.025) {
                        org.branchJumpCooldown = 2.5 + Math.random() * 2.0;
                        jumperCount++;
                        this.metrics.precisionJumpEvents++;

                        // Targeted leap towards food or open canopy space
                        const jumpAngle = Math.random() * Math.PI * 2;
                        const jumpSpeed = 2.2 * org.branchJumpPrecision;
                        org.vx = Math.cos(jumpAngle) * jumpSpeed;
                        org.vy = Math.sin(jumpAngle) * jumpSpeed;

                        // Successful leap yields canopy fruit nutrition
                        if (this.canopyCanopyFoodPool > 1.0) {
                            const harvest = Math.min(this.canopyCanopyFoodPool, 2.8 * org.arborealForagingYield);
                            this.canopyCanopyFoodPool -= harvest;
                            org.energy = Math.min(260.0, (org.energy || 20.0) + harvest);
                            this.metrics.canopyFruitHarvestEvents++;
                        }
                    }

                    // Camouflage prey capture through stereoscopic depth detection
                    if (org.visualCamouflageDetection > 0.70 && Math.random() < 0.018) {
                        this.metrics.camouflagePreyCaptures++;
                        const preyNutrient = 1.6 * org.visualCamouflageDetection;
                        org.energy = Math.min(260.0, (org.energy || 20.0) + preyNutrient);
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalArborealMammals = arborealCount;
            this.metrics.totalStereoCapable = stereoCount;
            this.metrics.activeBranchGraspers = grasperCount;
            this.metrics.activeCanopyJumpers = jumperCount;

            this.metrics.meanBinocularVisionIndex = stereoCount > 0 ? (sumBVI / stereoCount) : 0.0;
            this.metrics.meanOpposableGraspingIndex = arborealCount > 0 ? (sumOGI / arborealCount) : 0.0;

            this.metrics.meanOrbitalConvergence = stereoCount > 0 ? (sumConv / stereoCount) : 72.0;
            this.metrics.meanStereoscopicDisparity = stereoCount > 0 ? (sumDisp / stereoCount) : 0.84;
            this.metrics.meanJumpPrecision = stereoCount > 0 ? (sumJump / stereoCount) : 0.86;
            this.metrics.meanCamouflageDetection = stereoCount > 0 ? (sumCamo / stereoCount) : 0.82;

            this.metrics.meanHalluxDivergence = arborealCount > 0 ? (sumHallux / arborealCount) : 78.0;
            this.metrics.meanGraspingTorque = arborealCount > 0 ? (sumTorque / arborealCount) : 0.85;
            this.metrics.meanNailSupport = arborealCount > 0 ? (sumNail / arborealCount) : 0.86;
            this.metrics.meanForagingYield = arborealCount > 0 ? (sumYield / arborealCount) : 0.88;

            this.metrics.cumulativeCanopyBiomass = totalCanopyBiomass;
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
         * @returns {Object} Comprehensive Arboreal/Stereo metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ArborealVisionGraspingManager;
    }
    if (typeof global !== "undefined") {
        global.ArborealVisionGraspingManager = ArborealVisionGraspingManager;
        global.arborealVisionGraspingManager = new ArborealVisionGraspingManager();
    }
})(typeof window !== "undefined" ? window : global);
