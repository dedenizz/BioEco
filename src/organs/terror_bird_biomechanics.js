// BioEcosystem - Early Tertiary Avian Radiation: Terror Bird Biomechanics & Craniokinesis
// Module: src/organs/terror_bird_biomechanics.js
// Version: 9.24.0 (Hour 644 - System Agent: Terror Bird Beak Shear, Craniokinesis, Cursorial Stride & Gizzard Mechanics Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerrorBirdBiomechanicsManager
     * High-fidelity biological simulation of Early Tertiary (Paleocene-Eocene-Oligocene) Avian Radiation & Terror Birds:
     * - Evolutionary Stage & Lineages (*Gastornithidae* - *Gastornis*; *Phorusrhacidae* - *Titanis*, *Patagornis*, *Brontornis*):
     *   The direct surviving theropod dinosaur descendants radiating across open floodplains and gallery forests,
     *   attaining massive heights (1.8 - 2.5 m) and body masses (150 - 350 kg) as bipedal apex carnivores and herbivores.
     * - Hypertrophied Rhamphotheca & Craniokinetic Hooked Beak Shearing:
     *   Massive keratinous beak sheath (rhamphotheca) reaching 30 - 50 cm in depth, generating crushing and shearing
     *   forces (beakShearForce: 1200 - 2800 N) comparable to modern apex mammalian carnivores.
     *   Prokinetic flexible skull joints (craniokinesis) and powerful hypertrophied dorsal cervical musculature
     *   delivering vertical downward ax-like chopping strikes (craniokineticShockTorque: 0.72 - 0.96) that snap
     *   mammalian cervical vertebrae and fracture dense cortical bone.
     * - Cursorial Bipedal Stride & Vestigial Wing Aerodynamic Balancing:
     *   Dense non-pneumatized columnar leg bones (tibiotarsus and tarsometatarsus) enabling explosive bipedal pursuit sprints
     *   (avianStrideVelocity: 2.0 - 4.5 px/tick) across Eocene savanna terrain.
     *   Curved tridactyl talons (digitigradeTridactylGrip: 0.75 - 0.98) anchoring the predator during high-velocity impact.
     *   Hyper-reduced vestigial wings (vestigialWingBalance: 0.60 - 0.92) acting as high-speed aerodynamic balance flaps
     *   during tight cornering maneuvers and prey stabilization.
     *   Forward raptorial leg kicks (raptorialKickForce: 1500 - 3200 N) capable of blunt-force prey incapacitation.
     * - Muscular Gizzard Trituration & Gastrolith Grinding Mechanics:
     *   In the absence of teeth, ingested whole bones, flesh, and refractory vegetation are mechanically pulverized
     *   within a thick-walled bi-lobed muscular gizzard lined with toughened carbohydrate-protein koilin membranes
     *   (gizzardTriturationRate: 0.75 - 0.98).
     *   Intentional ingestion and retention of dense quartz and andesite pebbles (gastroliths) acting as internal millstones
     *   (gastrolithGrindingEfficiency: 0.70 - 0.96) that grind refractory food without requiring caustic acid.
     * - 137th Telemetry Channel: % BBI (Beak Biomechanics Index) mathematical core.
     * - 138th Telemetry Channel: % API (Avian Pursuit Index) mathematical core.
     */
    class TerrorBirdBiomechanicsManager {
        constructor() {
            this.baseBeakShear = 2050.0;                   // [1200 - 2800 N]
            this.baseCraniokinesis = 0.84;                 // [0.72 - 0.96]
            this.baseAvianStride = 3.20;                   // [2.0 - 4.5 px/tick]
            this.baseTridactylGrip = 0.86;                 // [0.75 - 0.98]
            this.baseWingBalance = 0.78;                   // [0.60 - 0.92]
            this.baseKickForce = 2350.0;                   // [1500 - 3200 N]
            this.baseGizzardTrituration = 0.86;            // [0.75 - 0.98]
            this.baseGastrolithEfficiency = 0.83;          // [0.70 - 0.96]

            this.metrics = {
                totalLiveCells: 0,
                totalTerrorBirds: 0,
                totalGastornithids: 0,
                totalPhorusrhacids: 0,
                activeAvianSprinters: 0,
                activeBeakStrikes: 0,
                meanBeakBiomechanicsIndex: 0.0,             // 137th Channel % BBI
                meanAvianPursuitIndex: 0.0,                 // 138th Channel % API
                meanBeakShear: 2050.0,
                meanCraniokinesis: 0.84,
                meanAvianStride: 3.20,
                meanTridactylGrip: 0.86,
                meanWingBalance: 0.78,
                meanKickForce: 2350.0,
                meanGizzardTrituration: 0.86,
                meanGastrolithEfficiency: 0.83,
                beakStrikeEvents: 0,
                raptorialKickEvents: 0,
                avianSprintEvents: 0,
                gizzardTriturationYield: 0.0,
                cumulativeAvianBiomass: 0.0
            };

            this.savannaTerrainTroughPool = 180.0;
        }

        /**
         * Initialize or upgrade an organism's Terror Bird traits.
         * @param {Object} org - Organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isTerrorBird === undefined) {
                const isPredatory = org.dna && (org.dna.diet === "PREDATOR" || org.dna.diet === "CARNIVORE");
                const isAvianCandidate = org.isAmniote || org.isDiapsid || org.isArboreal || isPredatory;
                org.isTerrorBird = isAvianCandidate && Math.random() < 0.40;
            }

            if (org.isPhorusrhacid === undefined) {
                org.isPhorusrhacid = org.isTerrorBird && Math.random() < 0.65;
            }
            if (org.isGastornithid === undefined) {
                org.isGastornithid = org.isTerrorBird && !org.isPhorusrhacid;
            }

            // Beak & Cranial traits
            if (org.beakShearForce === undefined) {
                org.beakShearForce = org.isTerrorBird ?
                    (1400.0 + Math.random() * 1300.0) : (250.0 + Math.random() * 450.0);
            }
            if (org.craniokineticShockTorque === undefined) {
                org.craniokineticShockTorque = org.isTerrorBird ?
                    (0.74 + Math.random() * 0.21) : (0.20 + Math.random() * 0.25);
            }

            // Cursorial Bipedal Leg & Wing traits
            if (org.avianStrideVelocity === undefined) {
                org.avianStrideVelocity = org.isTerrorBird ?
                    (2.4 + Math.random() * 1.9) : (0.8 + Math.random() * 0.8);
            }
            if (org.digitigradeTridactylGrip === undefined) {
                org.digitigradeTridactylGrip = org.isTerrorBird ?
                    (0.76 + Math.random() * 0.21) : (0.22 + Math.random() * 0.25);
            }
            if (org.vestigialWingBalance === undefined) {
                org.vestigialWingBalance = org.isTerrorBird ?
                    (0.65 + Math.random() * 0.25) : (0.15 + Math.random() * 0.25);
            }
            if (org.raptorialKickForce === undefined) {
                org.raptorialKickForce = org.isTerrorBird ?
                    (1700.0 + Math.random() * 1400.0) : (300.0 + Math.random() * 500.0);
            }

            // Gizzard & Gastrolith traits
            if (org.gizzardTriturationRate === undefined) {
                org.gizzardTriturationRate = org.isTerrorBird ?
                    (0.76 + Math.random() * 0.21) : (0.20 + Math.random() * 0.25);
            }
            if (org.gastrolithGrindingEfficiency === undefined) {
                org.gastrolithGrindingEfficiency = org.isTerrorBird ?
                    (0.72 + Math.random() * 0.23) : (0.15 + Math.random() * 0.25);
            }
            if (org.gastrolithCount === undefined) {
                org.gastrolithCount = org.isTerrorBird ?
                    Math.floor(18 + Math.random() * 16) : 0;
            }

            // Dynamic states
            if (org.beakBiomechanicsIndex === undefined) {
                org.beakBiomechanicsIndex = this.calculateBBI(org);
            }
            if (org.avianPursuitIndex === undefined) {
                org.avianPursuitIndex = this.calculateAPI(org);
            }

            if (org.gizzardBolusReserve === undefined) {
                org.gizzardBolusReserve = 35.0 + Math.random() * 35.0;
            }
            if (org.isAvianPursuitSprinting === undefined) {
                org.isAvianPursuitSprinting = false;
            }
            if (org.isBeakStriking === undefined) {
                org.isBeakStriking = false;
            }
            if (org.targetPreyEntityId === undefined) {
                org.targetPreyEntityId = null;
            }
        }

        /**
         * Calculate 137th Channel: Beak Biomechanics Index (% BBI)
         * Formulated based on rhamphotheca shear force, craniokinetic shock torque,
         * gizzard trituration rate, and gastrolith grinding efficiency.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateBBI(org) {
            if (!org) return 0.0;
            const shear = Math.max(0.0, Math.min(2800.0, org.beakShearForce || 300.0)) / 2800.0;
            const torque = Math.max(0.0, Math.min(1.0, org.craniokineticShockTorque || 0.20));
            const gizzard = Math.max(0.0, Math.min(1.0, org.gizzardTriturationRate || 0.20));
            const gastrolith = Math.max(0.0, Math.min(1.0, org.gastrolithGrindingEfficiency || 0.15));

            const raw = (shear * 0.35 + torque * 0.30 + gizzard * 0.20 + gastrolith * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Calculate 138th Channel: Avian Pursuit Index (% API)
         * Formulated based on bipedal stride velocity, tridactyl talon grip,
         * vestigial wing aerodynamic balance, and forward raptorial kick force.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateAPI(org) {
            if (!org) return 0.0;
            const stride = Math.max(0.0, Math.min(4.5, org.avianStrideVelocity || 1.0)) / 4.5;
            const grip = Math.max(0.0, Math.min(1.0, org.digitigradeTridactylGrip || 0.22));
            const wing = Math.max(0.0, Math.min(1.0, org.vestigialWingBalance || 0.15));
            const kick = Math.max(0.0, Math.min(3200.0, org.raptorialKickForce || 400.0)) / 3200.0;

            const raw = (stride * 0.35 + grip * 0.30 + wing * 0.20 + kick * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Determine biological regime for Beak Biomechanics (% BBI).
         * @param {number} bbi - Percent index.
         * @returns {string} Regime tag.
         */
        getBBIRegime(bbi) {
            if (bbi < 25.0) return "BASAL_ANATID_BILL";
            if (bbi < 50.0) return "INCIPIENT_HOOKED_BEAK";
            if (bbi < 75.0) return "TERROR_RAPTORIAL_RAMPHOTHECA";
            return "APEX_CRANIOKINETIC_CRUSHER";
        }

        /**
         * Determine biological regime for Avian Pursuit Locomotion (% API).
         * @param {number} api - Percent index.
         * @returns {string} Regime tag.
         */
        getAPIRegime(api) {
            if (api < 25.0) return "GROUND_STRUTTING_AMBLE";
            if (api < 50.0) return "TRIDACTYL_TROT_PROWLER";
            if (api < 75.0) return "CURSORIAL_SPRINT_RUNNER";
            return "APEX_TERROR_CHASER";
        }

        /**
         * Update physics, kinematics, and predatory bipedal strikes for all organisms.
         * @param {Array<Object>} organisms - Live cell array.
         * @param {number} dt - Timestep delta.
         * @param {number} boundsWidth - Simulation canvas width.
         * @param {number} boundsHeight - Simulation canvas height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let birdCount = 0;
            let gastroCount = 0;
            let phorusCount = 0;
            let sprintCount = 0;
            let strikeCount = 0;

            let sumBBI = 0.0;
            let sumAPI = 0.0;
            let sumBeakShear = 0.0;
            let sumCraniokinesis = 0.0;
            let sumAvianStride = 0.0;
            let sumTridactylGrip = 0.0;
            let sumWingBalance = 0.0;
            let sumKickForce = 0.0;
            let sumGizzard = 0.0;
            let sumGastrolith = 0.0;
            let totalBirdBiomass = 0.0;

            const n = organisms.length;

            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                liveCount++;

                this.initOrganism(org);

                // Compute telemetry metrics per cell
                const bbi = this.calculateBBI(org);
                const api = this.calculateAPI(org);
                org.beakBiomechanicsIndex = bbi;
                org.avianPursuitIndex = api;

                sumBBI += bbi;
                sumAPI += api;

                if (org.isTerrorBird) {
                    birdCount++;
                    if (org.isGastornithid) gastroCount++;
                    if (org.isPhorusrhacid) phorusCount++;

                    sumBeakShear += (org.beakShearForce || this.baseBeakShear);
                    sumCraniokinesis += (org.craniokineticShockTorque || this.baseCraniokinesis);
                    sumAvianStride += (org.avianStrideVelocity || this.baseAvianStride);
                    sumTridactylGrip += (org.digitigradeTridactylGrip || this.baseTridactylGrip);
                    sumWingBalance += (org.vestigialWingBalance || this.baseWingBalance);
                    sumKickForce += (org.raptorialKickForce || this.baseKickForce);
                    sumGizzard += (org.gizzardTriturationRate || this.baseGizzardTrituration);
                    sumGastrolith += (org.gastrolithGrindingEfficiency || this.baseGastrolithEfficiency);

                    totalBirdBiomass += (org.radius || 14.0) * (org.energy || 50.0) * 0.022;

                    // 1. Target Acquisition for Bipedal Avian Pursuit
                    let nearestPrey = null;
                    let minDistSq = 25000.0;

                    for (let j = 0; j < n; j++) {
                        if (i === j) continue;
                        const candidate = organisms[j];
                        if (!candidate || candidate.isDead) continue;

                        // Phorusrhacids target smaller mammals, herbivores, or carrion
                        if (candidate.isMegaherbivore || candidate.dna?.diet === "HERBIVORE" ||
                            (candidate.energy && candidate.energy < org.energy)) {
                            const dx = candidate.x - org.x;
                            const dy = candidate.y - org.y;
                            const dSq = dx * dx + dy * dy;
                            if (dSq < minDistSq) {
                                minDistSq = dSq;
                                nearestPrey = candidate;
                            }
                        }
                    }

                    // 2. High-Velocity Bipedal Pursuit Sprint
                    if (nearestPrey && minDistSq > 200.0) {
                        org.isAvianPursuitSprinting = true;
                        sprintCount++;
                        this.metrics.avianSprintEvents++;

                        const dist = Math.sqrt(minDistSq) || 1.0;
                        const dirX = (nearestPrey.x - org.x) / dist;
                        const dirY = (nearestPrey.y - org.y) / dist;

                        // Sprint velocity boosted by stride and balanced by vestigial wings
                        const sprintSpeed = (org.avianStrideVelocity || 3.2) *
                            (0.85 + (org.vestigialWingBalance || 0.78) * 0.35);

                        org.vx = (org.vx || 0) * 0.84 + dirX * sprintSpeed * 0.16;
                        org.vy = (org.vy || 0) * 0.84 + dirY * sprintSpeed * 0.16;

                        // Locomotor energy expenditure
                        const energyCost = 0.018 * (1.0 - (org.digitigradeTridactylGrip || 0.86) * 0.3);
                        org.energy = Math.max(5.0, (org.energy || 50.0) - energyCost);
                    } else {
                        org.isAvianPursuitSprinting = false;
                    }

                    // 3. Downward Craniokinetic Beak Strike & Raptorial Kick
                    if (nearestPrey && minDistSq <= 200.0) {
                        org.isBeakStriking = true;
                        strikeCount++;
                        this.metrics.beakStrikeEvents++;

                        const beakForce = org.beakShearForce || 2050.0;
                        const kineticTorque = org.craniokineticShockTorque || 0.84;
                        const kickForce = org.raptorialKickForce || 2350.0;

                        // Downward ax-chopping strike damage
                        const axDamage = (beakForce / 240.0) * kineticTorque;
                        const kickDamage = (kickForce / 320.0) * (org.digitigradeTridactylGrip || 0.86);
                        const totalDamage = axDamage + kickDamage;

                        nearestPrey.energy = Math.max(0.0, (nearestPrey.energy || 50.0) - totalDamage);

                        // Bolus swallowed and transferred to gizzard
                        const bolusYield = totalDamage * (org.gizzardTriturationRate || 0.86) * 0.55;
                        org.gizzardBolusReserve = Math.min(120.0, (org.gizzardBolusReserve || 35.0) + bolusYield);

                        this.metrics.gizzardTriturationYield += bolusYield;
                        this.metrics.raptorialKickEvents++;

                        // Prey incapacitation
                        if (nearestPrey.energy <= 0.0) {
                            nearestPrey.isDead = true;
                            nearestPrey.causeOfDeath = "KILLED_BY_TERROR_BIRD_CHOP";
                        }
                    } else {
                        org.isBeakStriking = false;
                    }

                    // 4. Muscular Gizzard & Gastrolith Mechanical Digestion
                    if (org.gizzardBolusReserve && org.gizzardBolusReserve > 4.0) {
                        const grindEff = org.gastrolithGrindingEfficiency || 0.83;
                        const tritRate = org.gizzardTriturationRate || 0.86;
                        const digested = Math.min(org.gizzardBolusReserve, tritRate * grindEff * 0.28);

                        org.gizzardBolusReserve -= digested;
                        org.energy = Math.min(270.0, (org.energy || 50.0) + digested * 1.65);
                    }
                }
            }

            // Aggregate metrics
            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalTerrorBirds = birdCount;
            this.metrics.totalGastornithids = gastroCount;
            this.metrics.totalPhorusrhacids = phorusCount;
            this.metrics.activeAvianSprinters = sprintCount;
            this.metrics.activeBeakStrikes = strikeCount;

            this.metrics.meanBeakBiomechanicsIndex = liveCount > 0 ? (sumBBI / liveCount) : 0.0;
            this.metrics.meanAvianPursuitIndex = liveCount > 0 ? (sumAPI / liveCount) : 0.0;

            this.metrics.meanBeakShear = birdCount > 0 ? (sumBeakShear / birdCount) : this.baseBeakShear;
            this.metrics.meanCraniokinesis = birdCount > 0 ? (sumCraniokinesis / birdCount) : this.baseCraniokinesis;
            this.metrics.meanAvianStride = birdCount > 0 ? (sumAvianStride / birdCount) : this.baseAvianStride;
            this.metrics.meanTridactylGrip = birdCount > 0 ? (sumTridactylGrip / birdCount) : this.baseTridactylGrip;
            this.metrics.meanWingBalance = birdCount > 0 ? (sumWingBalance / birdCount) : this.baseWingBalance;
            this.metrics.meanKickForce = birdCount > 0 ? (sumKickForce / birdCount) : this.baseKickForce;
            this.metrics.meanGizzardTrituration = birdCount > 0 ? (sumGizzard / birdCount) : this.baseGizzardTrituration;
            this.metrics.meanGastrolithEfficiency = birdCount > 0 ? (sumGastrolith / birdCount) : this.baseGastrolithEfficiency;

            this.metrics.cumulativeAvianBiomass = totalBirdBiomass;
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
         * @returns {Object} Comprehensive Terror Bird metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TerrorBirdBiomechanicsManager;
    }
    if (typeof global !== "undefined") {
        global.TerrorBirdBiomechanicsManager = TerrorBirdBiomechanicsManager;
        global.terrorBirdBiomechanicsManager = new TerrorBirdBiomechanicsManager();
    }
})(typeof window !== "undefined" ? window : global);
