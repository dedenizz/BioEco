// BioEcosystem - Oligocene-Early Miocene Apex Omnivore Radiation: Entelodontidae Biomechanics & Zygomatic Flanges
// Module: src/organs/entelodont_biomechanics.js
// Version: 9.36.0 (Hour 656 - System Agent: Entelodont Craniomandibular Crush, Flange Armor, Wither Spine & 141st/142nd Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EntelodontBiomechanicsManager
     * High-fidelity biological simulation of Oligocene-Early Miocene "Hell Pigs" (Entelodontidae - Archaeotherium, Daeodon / Dinohyus):
     * - Evolutionary Stage & Lineages:
     *   The apex opportunistic omnivores and bone-crushing scavengers of the North American and Eurasian open savannahs and river floodplains.
     *   Attaining body masses from 350 kg (Archaeotherium) up to 1,000 kg (Daeodon), equipped with nearly 1-meter long reinforced skulls.
     * - Craniomandibular Crush Force & Premolar Occlusion:
     *   Enormous temporalis and masseter muscle mass delivering 2500 - 4500 N bone-crushing bite forces.
     *   Heavy conical incisors and interlocking canines clamp carcasses, while massive thick-enameled premolars
     *   shatter large cortical limb bones of megaherbivores (Uintatherium, Paraceratherium) to extract nutrient-dense marrow.
     * - Zygomatic Flange Armor & Mandibular Tubercles:
     *   Broad wing-like lateral cheek extensions (zygomatic flanges) shielding temporal muscle insertions and eyes during
     *   severe infraspecific territorial face-biting combat.
     *   Ventral jaw tubercles protecting delicate throat vessels and trachea against upward lacerations.
     * - Dorsal Wither Spine Musculature & Cervical Whip Torque:
     *   Hypertrophied thoracic dorsal vertebrae spines anchoring thick ligamentum nuchae cords to counterbalance and whip
     *   the massive skull, violently tearing frozen carcasses and uprooting stubborn subterranean tubers.
     * - Cursorial Sub-Unguligrade Locomotion & Omnivorous Scavenging Drive:
     *   Two-toed cloven hooves on fused compact metapodials achieving high running endurance across open floodplains.
     *   Acute olfactory scavenging drive locating distant carrion and subterranean nutritional reserves.
     * - Telemetry Channels:
     *   141st Channel: Entelodont Bite & Bone-Crushing Index (% EBI)
     *   142nd Channel: Omnivorous Flange & Foraging Index (% OFI)
     */
    class EntelodontBiomechanicsManager {
        /**
         * Initialize Entelodont Biomechanics Manager.
         */
        constructor() {
            this.metrics = {
                totalEntelodonts: 0,
                totalDaeodons: 0,
                activeBoneCrushers: 0,
                activeFlangeDefenders: 0,
                meanCrushForce: 3500.0,
                meanPremolarCrush: 0.84,
                meanMarrowYield: 0.82,
                meanZygomaticFlange: 0.86,
                meanMandibularTubercle: 0.83,
                meanWitherSupport: 0.82,
                meanCervicalWhip: 0.86,
                meanRunningVelocity: 3.40,
                meanScavengingDrive: 0.86,
                meanEntelodontBiteIndex: 0.0,
                meanOmnivorousFlangeIndex: 0.0,
                boneCrushEvents: 0,
                flangeDeflectEvents: 0,
                cervicalWhipEvents: 0,
                scavengedBiomassTotal: 0.0,
                cumulativeEntelodontBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Entelodont anatomical traits.
         * @param {Object} org - Simulation organism.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isEntelodont === undefined) {
                const isOmnivore = org.dna && (org.dna.diet === "OMNIVORE" || org.dna.diet === "CARNIVORE");
                const isTerrestrialMammal = org.isMammaliaform || org.isSynapsid || org.isTherapsid || isOmnivore;
                // Radiate ~35% of eligible terrestrial omnivore/carnivores into Entelodontidae
                org.isEntelodont = isTerrestrialMammal && !org.isParaceratheriid && !org.isTerrorBird && Math.random() < 0.35;
            }

            if (org.isDaeodon === undefined) {
                // Daeodon / Dinohyus is the larger, mature apex form
                org.isDaeodon = org.isEntelodont && Math.random() < 0.45;
            }

            // Craniomandibular crush force (2500 - 4500 N)
            if (org.craniomandibularCrushForce === undefined) {
                org.craniomandibularCrushForce = org.isEntelodont ?
                    (org.isDaeodon ? 3600 + Math.random() * 900 : 2500 + Math.random() * 1100) :
                    (600 + Math.random() * 800);
            }

            // Premolar bone crushing rate [0.72 - 0.96]
            if (org.premolarBoneCrushingRate === undefined) {
                org.premolarBoneCrushingRate = org.isEntelodont ?
                    (0.72 + Math.random() * 0.24) : (0.15 + Math.random() * 0.35);
            }

            // Bone marrow extraction yield [0.70 - 0.95]
            if (org.boneMarrowExtractionYield === undefined) {
                org.boneMarrowExtractionYield = org.isEntelodont ?
                    (0.70 + Math.random() * 0.25) : (0.10 + Math.random() * 0.30);
            }

            // Zygomatic flange expansion [0.75 - 0.98]
            if (org.zygomaticFlangeExpansion === undefined) {
                org.zygomaticFlangeExpansion = org.isEntelodont ?
                    (0.75 + Math.random() * 0.23) : (0.05 + Math.random() * 0.20);
            }

            // Mandibular tubercle defense [0.70 - 0.95]
            if (org.mandibularTubercleDefense === undefined) {
                org.mandibularTubercleDefense = org.isEntelodont ?
                    (0.70 + Math.random() * 0.25) : (0.05 + Math.random() * 0.15);
            }

            // Dorsal wither spine support [0.70 - 0.95]
            if (org.dorsalWitherSpineSupport === undefined) {
                org.dorsalWitherSpineSupport = org.isEntelodont ?
                    (0.70 + Math.random() * 0.25) : (0.10 + Math.random() * 0.30);
            }

            // Cervical whip torque [0.75 - 0.98]
            if (org.cervicalWhipTorque === undefined) {
                org.cervicalWhipTorque = org.isEntelodont ?
                    (0.75 + Math.random() * 0.23) : (0.10 + Math.random() * 0.30);
            }

            // Sub-unguligrade running velocity (2.2 - 4.6 px/tick)
            if (org.subunguligradeRunningVelocity === undefined) {
                org.subunguligradeRunningVelocity = org.isEntelodont ?
                    (2.2 + Math.random() * 2.4) : (1.0 + Math.random() * 1.5);
            }

            // Omnivorous scavenging drive [0.75 - 0.98]
            if (org.omnivorousScavengingDrive === undefined) {
                org.omnivorousScavengingDrive = org.isEntelodont ?
                    (0.75 + Math.random() * 0.23) : (0.20 + Math.random() * 0.30);
            }

            // Dynamic states
            if (org.isBoneCrushing === undefined) org.isBoneCrushing = false;
            if (org.isFlangeDefending === undefined) org.isFlangeDefending = false;
            if (org.boneCrushCooldown === undefined) org.boneCrushCooldown = 0;
            if (org.whipAnimationTimer === undefined) org.whipAnimationTimer = 0;
            if (org.entelodontBiteIndex === undefined) org.entelodontBiteIndex = 0.0;
            if (org.omnivorousFlangeIndex === undefined) org.omnivorousFlangeIndex = 0.0;
        }

        /**
         * Update and audit all Entelodontidae organisms across the simulation.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} dt - Time delta in seconds (typically 0.016).
         * @param {number} boundsWidth - Simulation arena width.
         * @param {number} boundsHeight - Simulation arena height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms)) return;

            const w = boundsWidth || 660;
            const h = boundsHeight || 660;

            let entelodontCount = 0;
            let daeodonCount = 0;
            let activeCrushers = 0;
            let activeDefenders = 0;
            let sumCrushForce = 0;
            let sumPremolarCrush = 0;
            let sumMarrowYield = 0;
            let sumZygomatic = 0;
            let sumTubercle = 0;
            let sumWither = 0;
            let sumWhip = 0;
            let sumRunningVel = 0;
            let sumScavenging = 0;
            let sumEBI = 0;
            let sumOFI = 0;
            let totalBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org) continue;

                this.initOrganism(org);

                if (!org.isEntelodont) continue;

                entelodontCount++;
                if (org.isDaeodon) daeodonCount++;

                totalBiomass += (org.mass || 45.0);

                // Decay cooldowns
                if (org.boneCrushCooldown > 0) org.boneCrushCooldown -= dt;
                if (org.whipAnimationTimer > 0) org.whipAnimationTimer -= dt;

                // 1. Scavenging & Bone Cracking Mechanic
                // Seek nearby megaherbivore carcasses, bone fragments, or competitors
                let targetFound = false;
                for (let j = 0; j < organisms.length; j++) {
                    if (i === j) continue;
                    const other = organisms[j];
                    if (!other) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const distSq = dx * dx + dy * dy;

                    // Scavenging sensory range ~ 120 px
                    if (distSq < 14400) {
                        const dist = Math.sqrt(distSq);

                        // If encountering a megaherbivore or large prey carcass / weakened organism
                        if ((other.isMegaherbivore || other.isParaceratheriid || other.isDinoceratan || other.isApexCarnivore) && dist < 35) {
                            if (org.boneCrushCooldown <= 0) {
                                // Execute Craniomandibular Bone-Crushing Strike
                                org.isBoneCrushing = true;
                                org.boneCrushCooldown = 1.2;
                                org.whipAnimationTimer = 0.45;
                                this.metrics.boneCrushEvents++;
                                this.metrics.cervicalWhipEvents++;

                                // Energy gain from bone marrow extraction
                                const marrowGain = 1.5 * org.premolarBoneCrushingRate * org.boneMarrowExtractionYield;
                                org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + marrowGain);
                                this.metrics.scavengedBiomassTotal += marrowGain;

                                targetFound = true;
                                break;
                            }
                        }

                        // Infraspecific territorial face-biting combat with other Entelodonts
                        if (other.isEntelodont && dist < 28) {
                            org.isFlangeDefending = true;
                            this.metrics.flangeDeflectEvents++;
                            // Deflection reduces shock damage
                            const deflection = org.zygomaticFlangeExpansion * org.mandibularTubercleDefense;
                            if (Math.random() < 0.20 * deflection) {
                                // Face biting clash successfully parried
                                org.vx = (org.vx || 0) * 0.7;
                                org.vy = (org.vy || 0) * 0.7;
                            }
                            targetFound = true;
                        }
                    }
                }

                if (!targetFound) {
                    if (org.boneCrushCooldown <= 0) org.isBoneCrushing = false;
                    org.isFlangeDefending = false;
                }

                if (org.isBoneCrushing) activeCrushers++;
                if (org.isFlangeDefending) activeDefenders++;

                // 2. Cursorial Sub-Unguligrade Sprint
                const currentSpeed = Math.hypot(org.vx || 0, org.vy || 0);
                if (currentSpeed > 0.1) {
                    const speedMultiplier = 1.0 + (org.subunguligradeRunningVelocity / 4.6) * 0.35;
                    org.vx = (org.vx || 0) * speedMultiplier;
                    org.vy = (org.vy || 0) * speedMultiplier;
                }

                // Arena boundaries restitution
                if (org.x < 15) { org.x = 15; org.vx = Math.abs(org.vx || 0); }
                if (org.x > w - 15) { org.x = w - 15; org.vx = -Math.abs(org.vx || 0); }
                if (org.y < 15) { org.y = 15; org.vy = Math.abs(org.vy || 0); }
                if (org.y > h - 15) { org.y = h - 15; org.vy = -Math.abs(org.vy || 0); }

                // 3. Mathematical Telemetry Formulation
                // 141st Channel (% EBI - Entelodont Bite & Bone-Crushing Index)
                const crushNormalized = Math.max(0.0, Math.min(1.0, (org.craniomandibularCrushForce - 2500) / 2000));
                const ebiVal = Math.min(100.0, Math.max(0.0, (
                    crushNormalized * 0.35 +
                    org.premolarBoneCrushingRate * 0.30 +
                    org.boneMarrowExtractionYield * 0.20 +
                    org.cervicalWhipTorque * 0.15
                ) * 100.0));
                org.entelodontBiteIndex = ebiVal;

                // 142nd Channel (% OFI - Omnivorous Flange & Foraging Index)
                const ofiVal = Math.min(100.0, Math.max(0.0, (
                    org.zygomaticFlangeExpansion * 0.35 +
                    org.mandibularTubercleDefense * 0.25 +
                    org.omnivorousScavengingDrive * 0.25 +
                    org.dorsalWitherSpineSupport * 0.15
                ) * 100.0));
                org.omnivorousFlangeIndex = ofiVal;

                // Sum traits for audit
                sumCrushForce += org.craniomandibularCrushForce;
                sumPremolarCrush += org.premolarBoneCrushingRate;
                sumMarrowYield += org.boneMarrowExtractionYield;
                sumZygomatic += org.zygomaticFlangeExpansion;
                sumTubercle += org.mandibularTubercleDefense;
                sumWither += org.dorsalWitherSpineSupport;
                sumWhip += org.cervicalWhipTorque;
                sumRunningVel += org.subunguligradeRunningVelocity;
                sumScavenging += org.omnivorousScavengingDrive;
                sumEBI += ebiVal;
                sumOFI += ofiVal;
            }

            // Aggregate metrics
            this.metrics.totalEntelodonts = entelodontCount;
            this.metrics.totalDaeodons = daeodonCount;
            this.metrics.activeBoneCrushers = activeCrushers;
            this.metrics.activeFlangeDefenders = activeDefenders;
            this.metrics.cumulativeEntelodontBiomass = totalBiomass;

            if (entelodontCount > 0) {
                this.metrics.meanCrushForce = sumCrushForce / entelodontCount;
                this.metrics.meanPremolarCrush = sumPremolarCrush / entelodontCount;
                this.metrics.meanMarrowYield = sumMarrowYield / entelodontCount;
                this.metrics.meanZygomaticFlange = sumZygomatic / entelodontCount;
                this.metrics.meanMandibularTubercle = sumTubercle / entelodontCount;
                this.metrics.meanWitherSupport = sumWither / entelodontCount;
                this.metrics.meanCervicalWhip = sumWhip / entelodontCount;
                this.metrics.meanRunningVelocity = sumRunningVel / entelodontCount;
                this.metrics.meanScavengingDrive = sumScavenging / entelodontCount;
                this.metrics.meanEntelodontBiteIndex = sumEBI / entelodontCount;
                this.metrics.meanOmnivorousFlangeIndex = sumOFI / entelodontCount;
            } else {
                this.metrics.meanEntelodontBiteIndex = 0.0;
                this.metrics.meanOmnivorousFlangeIndex = 0.0;
            }
        }

        /**
         * Step method called per frame in simulation loop.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Current simulation tick.
         * @param {Object} canvas - Simulation canvas if available.
         */
        step(organisms, tick, canvas) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Entelodont metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EntelodontBiomechanicsManager;
    }
    if (typeof global !== "undefined") {
        global.EntelodontBiomechanicsManager = EntelodontBiomechanicsManager;
        global.entelodontBiomechanicsManager = new EntelodontBiomechanicsManager();
    }
})(typeof window !== "undefined" ? window : global);
