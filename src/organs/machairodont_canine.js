// BioEcosystem - Miocene Apex Predator Radiation: Machairodontinae & Amphicyonidae Biomechanics
// Module: src/organs/machairodont_canine.js
// Version: 9.48.0 (Hour 668 - System Agent: Saber Canine Shear, 90-110 deg Jaw Gape, Bear-Dog Bone Crush & 145th/146th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MachairodontCanineManager
     * High-fidelity biological simulation of Miocene Apex Predators (Machairodontinae & Amphicyonidae):
     * - Evolutionary Stage & Lineages:
     *   The Miocene explosive radiation of specialized apex predators answering the evolution of giant herbivores
     *   (Paraceratheriidae, Entelodontidae, Chalicotheriidae).
     *   1. Machairodontinae (Early Saber-Toothed Cats - Pseudaelurus, Machairodus):
     *      Evolved laterally compressed, serrated dagger-like upper canines (saberCanineLength: 8 - 18 cm eq).
     *      Hyper-extended jaw gape (hyperExtendedJawGape: 90 - 110 deg) via lowered coronoid process and modified mastoid pivot.
     *      Canine shear-bite mechanics (canineShearBiteForce: 1200 - 2400 N) powered by hypertrophied neck depressor muscles
     *      (cervicalDepressorTorque: 0.75 - 0.98), driving blades downwards in an arc to sever carotid vessels and trachea
     *      (cervicalVesselLacerationRate: 0.75 - 0.98), inducing fatal hemorrhagic shock in seconds.
     *      Massive grappling forelimbs and hooked retractile claws (retractileForelimbClaws: 0.75 - 0.98,
     *      preyGrapplingImmobilization: 0.72 - 0.96) pin struggling prey to prevent fatal canine breakage against bone.
     *   2. Amphicyonidae (Apex "Bear-Dogs" - Amphicyon giganteus):
     *      Massive craniomandibular crush force (amphicyonidCrushForce: 2800 - 4600 N) anchored by towering sagittal crests
     *      and flaring zygomatic arches.
     *      Heavy premolar and flat molar bone-cracking batteries (premolarBoneCrushingEfficiency: 0.72 - 0.96) devouring
     *      massive skeletal carcasses left by machairodonts to extract rich cortical bone marrow.
     *      Semi-plantigrade endurance locomotion (semiPlantigradeEndurance: 0.72 - 0.95) providing tireless pursuit stamina.
     * - Telemetry Channels:
     *   145th Channel: Saber Canine & Shear Index (% SCI)
     *   146th Channel: Bear-Dog Bone-Crush & Agility Index (% BDI)
     */
    class MachairodontCanineManager {
        /**
         * Initialize Machairodont Canine & Bear-Dog Manager.
         */
        constructor() {
            this.metrics = {
                totalMachairodonts: 0,
                totalAmphicyonids: 0,
                activeSaberStrikes: 0,
                activeGrapplers: 0,
                activeBearDogCrushers: 0,
                meanSaberLength: 13.0,
                meanJawGape: 100.0,
                meanShearForce: 1800.0,
                meanLacerationRate: 0.85,
                meanForelimbClaws: 0.86,
                meanBearDogCrush: 3600.0,
                meanPremolarEfficiency: 0.84,
                meanPlantigradeEndurance: 0.84,
                meanSaberCanineIndex: 0.0,
                meanBearDogIndex: 0.0,
                saberStrikeEvents: 0,
                grappleEvents: 0,
                boneCrushEvents: 0,
                scavengedMarrowBiomass: 0.0,
                cumulativeApexCarnivoreBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Machairodont or Amphicyonid traits.
         * @param {Object} org - Simulation organism.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isMachairodont === undefined && org.isAmphicyonid === undefined) {
                const isCarnivore = org.dna && (org.dna.diet === "CARNIVORE" || org.isPredator || org.isApexCreodont || org.isTerrorBird);
                if (isCarnivore) {
                    const roll = Math.random();
                    if (roll < 0.32) {
                        org.isMachairodont = true;
                        org.isAmphicyonid = false;
                    } else if (roll < 0.58) {
                        org.isMachairodont = false;
                        org.isAmphicyonid = true;
                    } else {
                        org.isMachairodont = false;
                        org.isAmphicyonid = false;
                    }
                } else {
                    org.isMachairodont = false;
                    org.isAmphicyonid = false;
                }
            }

            // Machairodontinae morphological parameters
            if (org.saberCanineLength === undefined) {
                org.saberCanineLength = org.isMachairodont ?
                    (8.0 + Math.random() * 10.0) : (1.5 + Math.random() * 2.5);
            }
            if (org.saberCanineSerrationDensity === undefined) {
                org.saberCanineSerrationDensity = org.isMachairodont ?
                    (0.75 + Math.random() * 0.23) : (0.10 + Math.random() * 0.20);
            }
            if (org.hyperExtendedJawGape === undefined) {
                org.hyperExtendedJawGape = org.isMachairodont ?
                    (90.0 + Math.random() * 20.0) : (45.0 + Math.random() * 15.0);
            }
            if (org.canineShearBiteForce === undefined) {
                org.canineShearBiteForce = org.isMachairodont ?
                    (1200.0 + Math.random() * 1200.0) : (400.0 + Math.random() * 500.0);
            }
            if (org.cervicalVesselLacerationRate === undefined) {
                org.cervicalVesselLacerationRate = org.isMachairodont ?
                    (0.75 + Math.random() * 0.23) : (0.15 + Math.random() * 0.25);
            }
            if (org.cervicalDepressorTorque === undefined) {
                org.cervicalDepressorTorque = org.isMachairodont ?
                    (0.75 + Math.random() * 0.23) : (0.20 + Math.random() * 0.25);
            }
            if (org.retractileForelimbClaws === undefined) {
                org.retractileForelimbClaws = org.isMachairodont ?
                    (0.75 + Math.random() * 0.23) : (0.20 + Math.random() * 0.30);
            }
            if (org.preyGrapplingImmobilization === undefined) {
                org.preyGrapplingImmobilization = org.isMachairodont ?
                    (0.72 + Math.random() * 0.24) : (0.15 + Math.random() * 0.25);
            }

            // Amphicyonidae morphological parameters
            if (org.amphicyonidCrushForce === undefined) {
                org.amphicyonidCrushForce = org.isAmphicyonid ?
                    (2800.0 + Math.random() * 1800.0) : (600.0 + Math.random() * 800.0);
            }
            if (org.premolarBoneCrushingEfficiency === undefined) {
                org.premolarBoneCrushingEfficiency = org.isAmphicyonid ?
                    (0.72 + Math.random() * 0.24) : (0.20 + Math.random() * 0.30);
            }
            if (org.semiPlantigradeEndurance === undefined) {
                org.semiPlantigradeEndurance = org.isAmphicyonid ?
                    (0.72 + Math.random() * 0.23) : (0.25 + Math.random() * 0.30);
            }
            if (org.subunguligradeRunningVelocity === undefined) {
                org.subunguligradeRunningVelocity = org.isAmphicyonid ?
                    (2.4 + Math.random() * 1.8) : (2.0 + Math.random() * 1.5);
            }

            // Dynamic behavioral states
            if (org.isSaberStriking === undefined) org.isSaberStriking = false;
            if (org.isPreyGrappled === undefined) org.isPreyGrappled = false;
            if (org.isBearDogCrushing === undefined) org.isBearDogCrushing = false;
            if (org.strikeCooldown === undefined) org.strikeCooldown = 0;
            if (org.grappleTimer === undefined) org.grappleTimer = 0;
            if (org.saberCanineIndex === undefined) org.saberCanineIndex = 0.0;
            if (org.bearDogIndex === undefined) org.bearDogIndex = 0.0;
        }

        /**
         * Update and audit all Machairodont & Amphicyonid organisms across simulation.
         * @param {Array<Object>} organisms - Simulation organisms array.
         * @param {number} dt - Time delta in seconds (typically 0.016).
         * @param {number} boundsWidth - Arena width.
         * @param {number} boundsHeight - Arena height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms)) return;

            const w = boundsWidth || 660;
            const h = boundsHeight || 660;

            let machairodontCount = 0;
            let amphicyonidCount = 0;
            let activeStrikes = 0;
            let activeGrapplers = 0;
            let activeCrushers = 0;
            let sumSaberLen = 0;
            let sumJawGape = 0;
            let sumShear = 0;
            let sumLaceration = 0;
            let sumClaws = 0;
            let sumBearCrush = 0;
            let sumPremolar = 0;
            let sumEndurance = 0;
            let sumSCI = 0;
            let sumBDI = 0;
            let totalBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                this.initOrganism(org);

                if (org.isMachairodont) {
                    machairodontCount++;
                    totalBiomass += (org.mass || 15.0);

                    // 145th Channel: % SCI (Saber Canine & Shear Index)
                    // Formula: saberCanineLength (35%), hyperExtendedJawGape (25%), cervicalVesselLacerationRate (25%), retractileForelimbClaws (15%)
                    const sciVal = Math.min(100.0, Math.max(0.0, (
                        (org.saberCanineLength / 18.0) * 0.35 +
                        (org.hyperExtendedJawGape / 110.0) * 0.25 +
                        org.cervicalVesselLacerationRate * 0.25 +
                        org.retractileForelimbClaws * 0.15
                    ) * 100.0));
                    org.saberCanineIndex = sciVal;
                    sumSCI += sciVal;

                    sumSaberLen += org.saberCanineLength;
                    sumJawGape += org.hyperExtendedJawGape;
                    sumShear += org.canineShearBiteForce;
                    sumLaceration += org.cervicalVesselLacerationRate;
                    sumClaws += org.retractileForelimbClaws;

                    // Predation logic: Target large game within grappling radius
                    if (org.strikeCooldown > 0) org.strikeCooldown -= dt;
                    if (org.grappleTimer > 0) {
                        org.grappleTimer -= dt;
                        if (org.grappleTimer <= 0) {
                            org.isPreyGrappled = false;
                            org.isSaberStriking = false;
                        }
                    }

                    if (org.strikeCooldown <= 0 && !org.isPreyGrappled) {
                        // Find nearby prey
                        for (let j = 0; j < organisms.length; j++) {
                            const prey = organisms[j];
                            if (!prey || !prey.alive || prey === org) continue;
                            const isPreyEligible = prey.dna && (prey.dna.diet === "HERBIVORE" || prey.isParaceratheriid || prey.isChalicothere || prey.isEntelodont || prey.isMegaherbivore);
                            if (!isPreyEligible) continue;

                            const dx = prey.x - org.x;
                            const dy = prey.y - org.y;
                            const distSq = dx * dx + dy * dy;
                            const grappleDist = (org.radius || 15) + (prey.radius || 15) + 12;

                            if (distSq < grappleDist * grappleDist) {
                                // Pin and grapple prey
                                org.isPreyGrappled = true;
                                org.isSaberStriking = true;
                                org.grappleTimer = 0.85;
                                org.strikeCooldown = 3.5;
                                activeGrapplers++;
                                activeStrikes++;
                                this.metrics.grappleEvents++;
                                this.metrics.saberStrikeEvents++;

                                // Cervex shear-bite: deal rapid hemorrhagic damage
                                const shearDmg = (org.canineShearBiteForce / 2400.0) * org.cervicalVesselLacerationRate * 38.0;
                                prey.energy = Math.max(0, (prey.energy || 50) - shearDmg);
                                org.energy = Math.min((org.maxEnergy || 120), (org.energy || 50) + 18.0);
                                break;
                            }
                        }
                    } else if (org.isPreyGrappled) {
                        activeGrapplers++;
                        activeStrikes++;
                    }
                } else if (org.isAmphicyonid) {
                    amphicyonidCount++;
                    totalBiomass += (org.mass || 18.0);

                    // 146th Channel: % BDI (Bear-Dog Bone-Crush & Agility Index)
                    // Formula: amphicyonidCrushForce (35%), premolarBoneCrushingEfficiency (25%), semiPlantigradeEndurance (20%), running velocity (20%)
                    const bdiVal = Math.min(100.0, Math.max(0.0, (
                        (org.amphicyonidCrushForce / 4600.0) * 0.35 +
                        org.premolarBoneCrushingEfficiency * 0.25 +
                        org.semiPlantigradeEndurance * 0.20 +
                        Math.min(1.0, (org.subunguligradeRunningVelocity / 4.5)) * 0.20
                    ) * 100.0));
                    org.bearDogIndex = bdiVal;
                    sumBDI += bdiVal;

                    sumBearCrush += org.amphicyonidCrushForce;
                    sumPremolar += org.premolarBoneCrushingEfficiency;
                    sumEndurance += org.semiPlantigradeEndurance;

                    // Bone crushing & scavenging behavior
                    if (org.strikeCooldown > 0) org.strikeCooldown -= dt;
                    if (org.isBearDogCrushing) {
                        if (org.strikeCooldown <= 0) {
                            org.isBearDogCrushing = false;
                        } else {
                            activeCrushers++;
                        }
                    }

                    if (org.strikeCooldown <= 0 && !org.isBearDogCrushing) {
                        // Scan for carrion or immobilized carcasses
                        if (Math.random() < 0.05) {
                            org.isBearDogCrushing = true;
                            org.strikeCooldown = 1.2;
                            activeCrushers++;
                            this.metrics.boneCrushEvents++;
                            const marrowYield = org.premolarBoneCrushingEfficiency * (org.amphicyonidCrushForce / 4600.0) * 14.0;
                            this.metrics.scavengedMarrowBiomass += marrowYield;
                            org.energy = Math.min((org.maxEnergy || 120), (org.energy || 50) + marrowYield * 0.6);
                        }
                    }
                }
            }

            // Aggregate metrics
            this.metrics.totalMachairodonts = machairodontCount;
            this.metrics.totalAmphicyonids = amphicyonidCount;
            this.metrics.activeSaberStrikes = activeStrikes;
            this.metrics.activeGrapplers = activeGrapplers;
            this.metrics.activeBearDogCrushers = activeCrushers;
            this.metrics.cumulativeApexCarnivoreBiomass = totalBiomass;

            if (machairodontCount > 0) {
                this.metrics.meanSaberLength = sumSaberLen / machairodontCount;
                this.metrics.meanJawGape = sumJawGape / machairodontCount;
                this.metrics.meanShearForce = sumShear / machairodontCount;
                this.metrics.meanLacerationRate = sumLaceration / machairodontCount;
                this.metrics.meanForelimbClaws = sumClaws / machairodontCount;
                this.metrics.meanSaberCanineIndex = sumSCI / machairodontCount;
            } else {
                this.metrics.meanSaberCanineIndex = 0.0;
            }

            if (amphicyonidCount > 0) {
                this.metrics.meanBearDogCrush = sumBearCrush / amphicyonidCount;
                this.metrics.meanPremolarEfficiency = sumPremolar / amphicyonidCount;
                this.metrics.meanPlantigradeEndurance = sumEndurance / amphicyonidCount;
                this.metrics.meanBearDogIndex = sumBDI / amphicyonidCount;
            } else {
                this.metrics.meanBearDogIndex = 0.0;
            }
        }

        /**
         * Step method called per frame in simulation loop.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Current simulation tick.
         * @param {Object} canvas - Canvas context for bounds.
         */
        step(organisms, tick, canvas) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Machairodont & Amphicyonid metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MachairodontCanineManager;
    }
    if (typeof global !== "undefined") {
        global.MachairodontCanineManager = MachairodontCanineManager;
        global.machairodontCanineManager = new MachairodontCanineManager();
    }
})(typeof window !== "undefined" ? window : global);
