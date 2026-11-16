// BioEcosystem - Middle-Late Eocene Cetacean Aquatic Transition: Pachyosteosclerosis & Caudal Undulation
// Module: src/organs/cetacean_aquatic_transition.js
// Version: 9.06.0 (Hour 626 - System Agent: Pachyosteosclerotic Bone Ballast, Caudal Fluke Thrust & Mandibular Fat Pad Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CetaceanAquaticTransitionManager
     * High-fidelity biological simulation of Middle-Late Eocene Cetacean Secondary Aquatic Invasion:
     * - Evolutionary Stage & Lineages (*Pakicetus*, *Ambulocetus*, *Rodhocetus*, *Basilosaurus*):
     *   Transition of artiodactyl land mammals into secondarily adapted marine apex predators.
     * - Pachyosteosclerosis & Ballast Mechanics:
     *   Extensive pachyostosis (swollen cortical bone volume) and osteosclerosis (hyper-dense lamellar mineralization)
     *   transforming ribs and limb bones into natural lead weights (pachyosteoscleroticBallast: 0.70 - 0.98).
     *   Neutralizing air-filled lung positive buoyancy to allow effortless benthic lurking in Tethys estuaries
     *   (benthicLurkingStability: 0.72 - 0.96) without continuous downward swimming energy drain.
     * - Dorsoventral Caudal Fluke Propulsion & Pelvic Reduction:
     *   Progressive reduction and disconnection of the pelvic girdle from the sacral vertebrae
     *   (pelvicReductionRatio: 0.60 - 0.95), decoupling hind limbs to minimize hydrodynamic drag.
     *   Evolution of powerful vertical (dorsoventral) spinal column flexion driven by hypertrophied epaxial
     *   and hypaxial musculature (dorsoventralUndulationRate: 1.2 - 3.5 Hz).
     *   Fibrocartilaginous horizontal tail fluke generating massive propulsive lift and forward thrust
     *   (caudalFlukePropulsionEfficiency: 0.75 - 0.98), enabling agile high-speed pelagic pursuit
     *   (pelagicCruisingAgility: 0.74 - 0.98).
     * - Mandibular Acoustic Fat Pad & Underwater Directional Hearing:
     *   Atrophy of the external acoustic meatus and pinna preventing pressure barotrauma.
     *   Elongated mandibular canal filled with acoustic intramandibular lipid pad (mandibularFatPadConduction: 0.70 - 0.98),
     *   channeling high-velocity sound waves directly into the isolated, dense tympanoperiotic bone bulla
     *   (underwaterDirectionalHearing: 0.75 - 0.98) for 360-degree acoustic spatial orientation underwater.
     * - 131st Telemetry Channel (% CTI - Cetacean Transition Index & Pachyosteosclerosis) mathematical core.
     * - 132nd Telemetry Channel (% AUT - Aquatic Undulating Thrust & Fluke Kinematics) mathematical core.
     */
    class CetaceanAquaticTransitionManager {
        constructor() {
            this.baseBallast = 0.84;                       // [0.70 - 0.98]
            this.baseFatPadConduction = 0.85;              // [0.70 - 0.98]
            this.basePelvicReduction = 0.82;               // [0.60 - 0.95]
            this.baseLurkingStability = 0.86;              // [0.72 - 0.96]
            this.baseFlukeEfficiency = 0.86;               // [0.75 - 0.98]
            this.baseUndulationRate = 2.4;                 // [1.2 - 3.5 Hz]
            this.baseDirectionalHearing = 0.85;            // [0.75 - 0.98]
            this.baseCruisingAgility = 0.84;               // [0.74 - 0.98]

            this.metrics = {
                totalLiveCells: 0,
                totalArchaeocetes: 0,
                totalAquaticPropelled: 0,
                activeBenthicLurkers: 0,
                activePelagicCruisers: 0,
                meanCetaceanTransitionIndex: 0.0,          // 131st Channel % CTI
                meanAquaticUndulatingThrust: 0.0,           // 132nd Channel % AUT
                meanPachyosteosclerosis: 0.84,
                meanFatPadConduction: 0.85,
                meanPelvicReduction: 0.82,
                meanLurkingStability: 0.86,
                meanFlukeEfficiency: 0.86,
                meanUndulationRate: 2.4,
                meanDirectionalHearing: 0.85,
                meanCruisingAgility: 0.84,
                benthicLurkingStrikes: 0,
                pelagicCruisingBursts: 0,
                acousticEcholocationLocks: 0,
                cumulativeCetaceanBiomass: 0.0
            };

            this.pelagicPelagicFishSchool = 150.0;
        }

        /**
         * Initialize or upgrade an organism's Cetacean transition traits.
         * @param {Object} org - Organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isArchaeocete === undefined) {
                const isMammalian = org.isTribosphenic || org.isChorioallantoic || org.isPlagiaulacoid ||
                                    org.isArboreal || org.isMultituberculate || org.isEutherian ||
                                    (org.dna && (org.dna.diet === "CARNIVORE" || org.dna.diet === "OMNIVORE"));
                org.isArchaeocete = isMammalian && Math.random() < 0.60;
            }

            if (org.isAquaticUndulator === undefined) {
                org.isAquaticUndulator = org.isArchaeocete || Math.random() < 0.65;
            }

            // Pachyosteosclerosis & Ballast traits
            if (org.pachyosteoscleroticBallast === undefined) {
                org.pachyosteoscleroticBallast = org.isArchaeocete ?
                    (0.72 + Math.random() * 0.24) : (0.15 + Math.random() * 0.30);
            }
            if (org.mandibularFatPadConduction === undefined) {
                org.mandibularFatPadConduction = org.isArchaeocete ?
                    (0.70 + Math.random() * 0.26) : (0.18 + Math.random() * 0.32);
            }
            if (org.pelvicReductionRatio === undefined) {
                org.pelvicReductionRatio = org.isArchaeocete ?
                    (0.65 + Math.random() * 0.28) : (0.10 + Math.random() * 0.25);
            }
            if (org.benthicLurkingStability === undefined) {
                org.benthicLurkingStability = org.isArchaeocete ?
                    (0.74 + Math.random() * 0.22) : (0.20 + Math.random() * 0.30);
            }

            // Caudal Fluke & Dorsoventral Undulation traits
            if (org.caudalFlukePropulsionEfficiency === undefined) {
                org.caudalFlukePropulsionEfficiency = org.isAquaticUndulator ?
                    (0.75 + Math.random() * 0.22) : (0.20 + Math.random() * 0.30);
            }
            if (org.dorsoventralUndulationRate === undefined) {
                org.dorsoventralUndulationRate = org.isAquaticUndulator ?
                    (1.6 + Math.random() * 1.8) : (0.4 + Math.random() * 0.8);
            }
            if (org.underwaterDirectionalHearing === undefined) {
                org.underwaterDirectionalHearing = org.isAquaticUndulator ?
                    (0.72 + Math.random() * 0.24) : (0.18 + Math.random() * 0.30);
            }
            if (org.pelagicCruisingAgility === undefined) {
                org.pelagicCruisingAgility = org.isAquaticUndulator ?
                    (0.74 + Math.random() * 0.22) : (0.25 + Math.random() * 0.30);
            }

            // Dynamic states
            if (org.isBenthicLurking === undefined) org.isBenthicLurking = false;
            if (org.pelagicBurstCooldown === undefined) org.pelagicBurstCooldown = 0.0;
            if (org.undulationPhase === undefined) org.undulationPhase = Math.random() * Math.PI * 2;
        }

        /**
         * Calculate 131st Channel: Cetacean Transition Index (% CTI)
         * Formulated based on pachyosteosclerosis ballast, mandibular fat pad conduction,
         * pelvic reduction ratio, and benthic lurking stability.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateCTI(org) {
            if (!org) return 0.0;
            const ballast = Math.max(0.0, Math.min(1.0, org.pachyosteoscleroticBallast || 0.15));
            const fatPad = Math.max(0.0, Math.min(1.0, org.mandibularFatPadConduction || 0.18));
            const pelvic = Math.max(0.0, Math.min(1.0, org.pelvicReductionRatio || 0.10));
            const lurking = Math.max(0.0, Math.min(1.0, org.benthicLurkingStability || 0.20));

            const raw = (ballast * 0.35 + fatPad * 0.30 + pelvic * 0.20 + lurking * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Calculate 132nd Channel: Aquatic Undulating Thrust (% AUT)
         * Formulated based on caudal fluke propulsion efficiency, dorsoventral undulation rate,
         * underwater directional hearing, and pelagic cruising agility.
         * @param {Object} org - Organism instance.
         * @returns {number} Value in range [0, 100].
         */
        calculateAUT(org) {
            if (!org) return 0.0;
            const fluke = Math.max(0.0, Math.min(1.0, org.caudalFlukePropulsionEfficiency || 0.20));
            const undulRatio = Math.max(0.0, Math.min(1.0, (org.dorsoventralUndulationRate || 0.5) / 3.5));
            const hearing = Math.max(0.0, Math.min(1.0, org.underwaterDirectionalHearing || 0.18));
            const agility = Math.max(0.0, Math.min(1.0, org.pelagicCruisingAgility || 0.25));

            const raw = (fluke * 0.35 + undulRatio * 0.30 + hearing * 0.20 + agility * 0.15) * 100.0;
            return Math.max(0.0, Math.min(100.0, raw));
        }

        /**
         * Determine biological regime for Cetacean Transition (% CTI).
         * @param {number} cti - Percent index.
         * @returns {string} Regime tag.
         */
        getCTIRegime(cti) {
            if (cti < 25.0) return "TERRESTRIAL_TERRESTRIAL_GAIT";
            if (cti < 50.0) return "SEMI_AQUATIC_AMBULOCETID";
            if (cti < 75.0) return "PELAGIC_UNDULATING_PROTOCETID";
            return "FULLY_HYDRODYNAMIC_BASILOSAURID";
        }

        /**
         * Determine biological regime for Aquatic Undulating Thrust (% AUT).
         * @param {number} aut - Percent index.
         * @returns {string} Regime tag.
         */
        getAUTRegime(aut) {
            if (aut < 25.0) return "QUADRUPEDAL_SURFACE_PADDLE";
            if (aut < 50.0) return "PELVIC_PROPELLED_SWIM";
            if (aut < 75.0) return "INCIPIENT_CAUDAL_FLUKING";
            return "PELAGIC_WHALE_HYDROFOIL";
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
            let archaeoCount = 0;
            let aquaticCount = 0;
            let lurkerCount = 0;
            let cruiserCount = 0;

            let sumCTI = 0.0;
            let sumAUT = 0.0;
            let sumBallast = 0.0;
            let sumFatPad = 0.0;
            let sumPelvic = 0.0;
            let sumLurking = 0.0;
            let sumFluke = 0.0;
            let sumUndul = 0.0;
            let sumHearing = 0.0;
            let sumAgility = 0.0;
            let totalCetaceanBiomass = 0.0;

            // Replenish pelagic fish school
            this.pelagicPelagicFishSchool = Math.min(220.0, this.pelagicPelagicFishSchool + 0.15);

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                liveCount++;

                this.initOrganism(org);

                const cti = this.calculateCTI(org);
                const aut = this.calculateAUT(org);

                org.cetaceanTransitionIndex = cti;
                org.aquaticUndulatingThrust = aut;
                org.ctiRegime = this.getCTIRegime(cti);
                org.autRegime = this.getAUTRegime(aut);

                if (org.isArchaeocete) {
                    archaeoCount++;
                    sumCTI += cti;
                    sumBallast += (org.pachyosteoscleroticBallast || 0.84);
                    sumFatPad += (org.mandibularFatPadConduction || 0.85);
                    sumPelvic += (org.pelvicReductionRatio || 0.82);
                    sumLurking += (org.benthicLurkingStability || 0.86);
                    totalCetaceanBiomass += (org.energy || 25.0);

                    // Benthic lurking behavior via bone ballast
                    if (org.pachyosteoscleroticBallast > 0.65 && (org.y || 0) > (boundsHeight * 0.60)) {
                        org.isBenthicLurking = true;
                        lurkerCount++;
                        // Ballast anchors body to benthic substrate
                        if (org.vx) org.vx *= 0.90;
                        if (org.vy) org.vy *= 0.90;

                        // Ambush lurking strike on passing prey
                        if (Math.random() < 0.02) {
                            this.metrics.benthicLurkingStrikes++;
                            org.energy = Math.min(280.0, (org.energy || 25.0) + 3.2);
                        }
                    } else {
                        org.isBenthicLurking = false;
                    }
                }

                if (org.isAquaticUndulator) {
                    aquaticCount++;
                    sumAUT += aut;
                    sumFluke += (org.caudalFlukePropulsionEfficiency || 0.86);
                    sumUndul += (org.dorsoventralUndulationRate || 2.4);
                    sumHearing += (org.underwaterDirectionalHearing || 0.85);
                    sumAgility += (org.pelagicCruisingAgility || 0.84);

                    // Dorsoventral undulation oscillation
                    org.undulationPhase = ((org.undulationPhase || 0.0) + (org.dorsoventralUndulationRate || 2.4) * (dt || 0.016) * Math.PI * 2) % (Math.PI * 2);

                    // High-speed pelagic cruising burst via tail fluke
                    if (org.pelagicBurstCooldown > 0) {
                        org.pelagicBurstCooldown -= (dt || 0.016);
                    } else if (org.caudalFlukePropulsionEfficiency > 0.70 && Math.random() < 0.03) {
                        org.pelagicBurstCooldown = 2.0 + Math.random() * 2.0;
                        cruiserCount++;
                        this.metrics.pelagicCruisingBursts++;

                        const burstAngle = Math.random() * Math.PI * 2;
                        const burstSpeed = 2.4 * org.pelagicCruisingAgility;
                        org.vx = Math.cos(burstAngle) * burstSpeed;
                        org.vy = Math.sin(burstAngle) * burstSpeed;

                        // Harvest pelagic schooling fish
                        if (this.pelagicPelagicFishSchool > 1.0) {
                            const harvest = Math.min(this.pelagicPelagicFishSchool, 3.5 * org.caudalFlukePropulsionEfficiency);
                            this.pelagicPelagicFishSchool -= harvest;
                            org.energy = Math.min(280.0, (org.energy || 25.0) + harvest);
                        }
                    }

                    // Mandibular fat pad acoustic spatial target lock
                    if (org.underwaterDirectionalHearing > 0.70 && Math.random() < 0.022) {
                        this.metrics.acousticEcholocationLocks++;
                        const lockEnergy = 1.8 * org.underwaterDirectionalHearing;
                        org.energy = Math.min(280.0, (org.energy || 25.0) + lockEnergy);
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalArchaeocetes = archaeoCount;
            this.metrics.totalAquaticPropelled = aquaticCount;
            this.metrics.activeBenthicLurkers = lurkerCount;
            this.metrics.activePelagicCruisers = cruiserCount;

            this.metrics.meanCetaceanTransitionIndex = archaeoCount > 0 ? (sumCTI / archaeoCount) : 0.0;
            this.metrics.meanAquaticUndulatingThrust = aquaticCount > 0 ? (sumAUT / aquaticCount) : 0.0;

            this.metrics.meanPachyosteosclerosis = archaeoCount > 0 ? (sumBallast / archaeoCount) : 0.84;
            this.metrics.meanFatPadConduction = archaeoCount > 0 ? (sumFatPad / archaeoCount) : 0.85;
            this.metrics.meanPelvicReduction = archaeoCount > 0 ? (sumPelvic / archaeoCount) : 0.82;
            this.metrics.meanLurkingStability = archaeoCount > 0 ? (sumLurking / archaeoCount) : 0.86;

            this.metrics.meanFlukeEfficiency = aquaticCount > 0 ? (sumFluke / aquaticCount) : 0.86;
            this.metrics.meanUndulationRate = aquaticCount > 0 ? (sumUndul / aquaticCount) : 2.4;
            this.metrics.meanDirectionalHearing = aquaticCount > 0 ? (sumHearing / aquaticCount) : 0.85;
            this.metrics.meanCruisingAgility = aquaticCount > 0 ? (sumAgility / aquaticCount) : 0.84;

            this.metrics.cumulativeCetaceanBiomass = totalCetaceanBiomass;
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
         * @returns {Object} Comprehensive Cetacean transition metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CetaceanAquaticTransitionManager;
    }
    if (typeof global !== "undefined") {
        global.CetaceanAquaticTransitionManager = CetaceanAquaticTransitionManager;
        global.cetaceanAquaticTransitionManager = new CetaceanAquaticTransitionManager();
    }
})(typeof window !== "undefined" ? window : global);
