// BioEcosystem - Early Placoderm Mandibular Arch Evolution, Articulated Jaws & Shearing Gnathal Plates
// Module: src/organs/placoderm_jaws.js
// Version: 8.28.0 (Hour 548 - System Agent: Cranio-Thoracic Hinge Joint Kinematics, Double-Jointed Total Gape, Shearing Attrition & 106th Channel % CTS Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PlacodermJawManager
     * High-fidelity biological simulation of early Placoderm / jawed vertebrate (Gnathostomata / Placodermi - Arthrodira & Antiarchi) anatomy:
     * - Mandibular Arch Evolution: Transformation of anterior pharyngeal branchial arches into articulated upper (palatoquadrate) and lower (Meckel's cartilage / mandibula) jaws
     * - Cranio-Thoracic Ball-and-Socket Neck Joint Kinematics: Mobile nuchal condyle-fossa articulation allowing head cranium to tilt upward (15 - 30 deg)
     * - Double-Jointed Total Mouth Gape: Synchronized head elevation and mandibular depression producing an explosive 50 - 65 degree mouth gape in 50 ms
     * - Self-Sharpening Shearing Gnathal Plates: Supragnathal and inferognathal dermal bone blade plates scissoring past each other to self-sharpen
     * - Occlusal Shearing Attrition & Osteocytic Remodeling: Impact micro-wear against armored carapaces balanced by continuous mineral remodeling
     * - Epaxial Neck Musculature Tension & Hinge Joint Fatigue: Muscular strain to elevate heavy armored cephalic shield and lactic fatigue on repeated strikes
     * - Apex Bite Force: Devastating mechanical bite pressure (450 - 1800 N eq) capable of shearing armored ostracoderm shields and nautiloid shells
     * - Hydrodynamic Deceleration Surge & Cavitation Suction Vortex: Rapid head lifting drag deceleration paired with explosive negative pressure intake
     * - 105th Telemetry Channel (% GJI - Gnathostome Jaw Index) and 106th Telemetry Channel (% CTS - Cranio-Thoracic Shear Index) mathematical engine
     */
    class PlacodermJawManager {
        constructor() {
            this.baseBiteForce = 1125.0;            // Base bite force in N eq [450 - 1800 N]
            this.baseGnathalSharpness = 0.82;       // Self-sharpened bone blade sharpness [0.50 - 0.99]
            this.baseAdductorTension = 0.75;        // Adductor mandibulae muscle tension [0.45 - 0.95]
            this.baseArmorPenetration = 0.68;       // Mechanical carapace shearing coefficient [0.40 - 0.85]
            this.baseJawGapeAngle = 0.38;           // Mean open lower jaw gape in radians (~22 deg, range: 0.15 - 0.75 rad)
            this.baseSuctionPulseForce = 2.4;       // Buccal depression suction force in N [1.0 - 4.5 N]

            // Cranio-Thoracic Hinge Joint & Kinematic Parameters (Hour 548 - System Agent)
            this.baseHeadElevationAngle = 0.30;     // Mean head cranium elevation in radians (~17 deg, range: 0.15 - 0.45 rad)
            this.baseTotalGapeAngle = 0.95;         // Combined double-jointed total gape in radians (~55 deg, range: 0.87 - 1.15 rad / 50 - 65 deg)
            this.baseEpaxialTension = 0.78;         // Dorsal epaxial neck muscle contraction tension [0.40 - 0.98]
            this.baseHingeFatigue = 0.0;            // Neck hinge joint fatigue accumulator [0.0 - 1.0]
            this.baseCavitationSuction = 4.2;       // Explosive buccal cavity cavitation suction in N [2.5 - 6.5 N]

            this.metrics = {
                totalLiveCells: 0,
                totalPlacodermOrganisms: 0,
                placodermPrevalence: 0.0,
                meanGnathostomeJawIndex: 0.0,       // 105th Channel % GJI
                meanCranioThoracicShearIndex: 0.0,  // 106th Channel % CTS
                meanBiteForceMagnitude: 1125.0,
                meanGnathalShearSharpness: 0.82,
                meanAdductorMusclesTension: 0.75,
                meanArmorCrushPenetration: 0.68,
                meanJawGapeAngle: 0.38,
                meanHeadElevationAngle: 0.30,
                meanTotalGapeAngle: 0.95,
                meanEpaxialNeckTension: 0.78,
                meanHingeJointFatigue: 0.05,
                meanSuctionPulseForce: 2.4,
                meanCavitationSuctionForce: 4.2,
                apexPredationStrikes: 0,
                doubleJointGapeStrikes: 0,
                armorBreachCrushes: 0,
                suctionIntakeEvents: 0,
                cavitationVortexEvents: 0,
                gnathalSelfSharpenings: 0,
                occlusalWearEvents: 0,
                gnathalRemodelingEvents: 0,
                hingeFatigueStalls: 0,
                cumulativeShearedBiomass: 0.0
            };
        }

        /**
         * Initialize placoderm jaw anatomy, mandibular arch, gnathal plates and cranio-thoracic hinge mechanics on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Carnivores, apex pack hunters, or organisms with gnathostome/placoderm affinity
            const isCompetent = Boolean(org.hasPlacodermTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "carnivore" || org.niche === "apex" || org.niche === "predator" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet > 0.55) ||
                  (org.dna && (org.dna.strikeTactics || 0) > 0.35) ||
                  (org.dna && (org.dna.packHunting || 0) > 0.30))) ||
                Boolean(org.dna && ((org.dna.placodermAffinity || 0) > 0.25 || (org.dna.jawAffinity || 0) > 0.25));

            if (typeof org.hasPlacodermTrait === "undefined") {
                org.hasPlacodermTrait = isCompetent;
            }

            if (!org.hasPlacodermTrait) {
                org.isPlacoderm = false;
                org.biteForceMagnitude = 0.0;
                org.gnathalShearSharpness = 0.0;
                org.adductorMusclesTension = 0.0;
                org.armorCrushPenetration = 0.0;
                org.jawGapeAngle = 0.0;
                org.headElevationAngle = 0.0;
                org.totalGapeAngle = 0.0;
                org.epaxialNeckMusclesTension = 0.0;
                org.hingeJointFatigue = 0.0;
                org.suctionPulseForce = 0.0;
                org.cavitationSuctionForce = 0.0;
                org.gnathalMicroWear = 0.0;
                org.gnathalRemodelingRate = 0.0;
                org.gnathostomeJawIndex = 0.0;
                org.cranioThoracicShearIndex = 0.0;
                org.jawCyclePhase = 0.0;
                org.isJawSnapping = false;
                org.strikeDecelerationSurge = 0.0;
                org.nuchalGapOpening = 0.0;
                return;
            }

            org.isPlacoderm = true;

            // 1. Mandibular Arch & Articulated Jaw Bite Force
            if (typeof org.biteForceMagnitude === "undefined") {
                const sizeBonus = org.dna ? (org.dna.size || 7.5) * 60.0 : 450.0;
                org.biteForceMagnitude = Math.max(450.0, Math.min(1800.0, 500.0 + sizeBonus + Math.random() * 400.0));
            }

            // 2. Self-Sharpening Shearing Gnathal Plates & Remodeling
            if (typeof org.gnathalShearSharpness === "undefined") {
                org.gnathalShearSharpness = 0.65 + Math.random() * 0.32; // 0.50 - 0.99
            }
            if (typeof org.gnathalRemodelingRate === "undefined") {
                org.gnathalRemodelingRate = 0.0015 + Math.random() * 0.0015; // 0.0015 - 0.0030 /tick
            }
            if (typeof org.gnathalMicroWear === "undefined") {
                org.gnathalMicroWear = 0.0;
            }

            // 3. Adductor Musculature & Occlusion Tension
            if (typeof org.adductorMusclesTension === "undefined") {
                org.adductorMusclesTension = 0.55 + Math.random() * 0.38; // 0.45 - 0.95
            }

            // 4. Armor Crush & Shearing Penetration
            if (typeof org.armorCrushPenetration === "undefined") {
                org.armorCrushPenetration = 0.45 + Math.random() * 0.38; // 0.40 - 0.85
            }

            // 5. Gape Kinematics & Buccal Suction
            if (typeof org.jawGapeAngle === "undefined") {
                org.jawGapeAngle = 0.20 + Math.random() * 0.45; // 0.15 - 0.75 rad
            }
            if (typeof org.suctionPulseForce === "undefined") {
                org.suctionPulseForce = 1.2 + Math.random() * 2.8; // 1.0 - 4.5 N
            }
            if (typeof org.jawCyclePhase === "undefined") {
                org.jawCyclePhase = Math.random() * Math.PI * 2;
            }

            // 6. Cranio-Thoracic Hinge Joint & Epaxial Neck Musculature
            if (typeof org.headElevationAngle === "undefined") {
                org.headElevationAngle = 0.15 + Math.random() * 0.25; // 0.15 - 0.45 rad (~9 - 26 deg)
            }
            if (typeof org.epaxialNeckMusclesTension === "undefined") {
                org.epaxialNeckMusclesTension = 0.55 + Math.random() * 0.38; // 0.40 - 0.98
            }
            if (typeof org.hingeJointFatigue === "undefined") {
                org.hingeJointFatigue = 0.0; // 0.0 - 1.0
            }
            if (typeof org.cavitationSuctionForce === "undefined") {
                org.cavitationSuctionForce = 2.5 + Math.random() * 3.5; // 2.5 - 6.5 N
            }
            if (typeof org.totalGapeAngle === "undefined") {
                org.totalGapeAngle = org.jawGapeAngle + org.headElevationAngle; // 0.87 - 1.15 rad (50 - 65 deg)
            }
            if (typeof org.strikeDecelerationSurge === "undefined") {
                org.strikeDecelerationSurge = 0.0;
            }
            if (typeof org.nuchalGapOpening === "undefined") {
                org.nuchalGapOpening = 0.0;
            }

            // 7. Telemetry Channels
            if (typeof org.gnathostomeJawIndex === "undefined") {
                org.gnathostomeJawIndex = 0.0; // 105th Channel % GJI
            }
            if (typeof org.cranioThoracicShearIndex === "undefined") {
                org.cranioThoracicShearIndex = 0.0; // 106th Channel % CTS
            }
        }

        /**
         * Trigger apex predatory bite strike on targeted prey.
         * @param {Object} org - Attacking Placoderm organism.
         * @param {Object|null} target - Targeted prey entity.
         */
        triggerApexPredatoryBite(org, target) {
            if (!org || !org.isPlacoderm) return;

            this.metrics.apexPredationStrikes++;
            this.metrics.doubleJointGapeStrikes++;
            org.isJawSnapping = true;

            // Epaxial neck muscle contraction spike and hinge joint fatigue
            org.epaxialNeckMusclesTension = Math.min(0.98, (org.epaxialNeckMusclesTension || 0.75) + 0.08);
            org.hingeJointFatigue = Math.min(1.0, (org.hingeJointFatigue || 0) + 0.045);
            org.strikeDecelerationSurge = 0.28;

            if (org.hingeJointFatigue > 0.75) {
                this.metrics.hingeFatigueStalls++;
            }

            // Cavitation suction vortex triggered by rapid head elevation
            this.metrics.cavitationVortexEvents++;

            if (target && target.alive) {
                // If prey has mineralized armor or cephalic shield (e.g., Ostracoderm or Stereom Echinoderm)
                const isArmoredPrey = target.isOstracoderm ||
                                      (target.cephalicShieldIntegrity || 0) > 0 ||
                                      target.hasStereom ||
                                      (target.crushResistanceCoeff || 0) > 0.45;

                if (isArmoredPrey) {
                    const breachChance = org.armorCrushPenetration * (org.gnathalShearSharpness || 0.8);
                    if (Math.random() < breachChance) {
                        this.metrics.armorBreachCrushes++;
                        if (typeof target.cephalicShieldIntegrity === "number") {
                            target.cephalicShieldIntegrity = Math.max(0.10, target.cephalicShieldIntegrity - 0.25);
                        }
                    }
                    // Occlusal micro-wear attrition from high-pressure mineral contact
                    const wearImpact = 0.003 + Math.random() * 0.005; // 0.003 - 0.008
                    org.gnathalMicroWear = (org.gnathalMicroWear || 0) + wearImpact;
                    org.gnathalShearSharpness = Math.max(0.50, org.gnathalShearSharpness - wearImpact);
                    this.metrics.occlusalWearEvents++;
                } else {
                    // Soft-bodied prey: Self-sharpening abrasive contact during clean jaw occlusion
                    org.gnathalShearSharpness = Math.min(0.99, org.gnathalShearSharpness + 0.005);
                    this.metrics.gnathalSelfSharpenings++;
                }

                // Assimilate sheared biomass and energy from apex strike
                const biteYield = (org.biteForceMagnitude / 1800.0) * 1.8;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(220.0, org.energy + biteYield * 4.5);
                }
                this.metrics.cumulativeShearedBiomass += biteYield;
            } else {
                // Pelagic apex hunting yield on ambient seston/nekton
                org.gnathalShearSharpness = Math.min(0.99, org.gnathalShearSharpness + 0.002);
                this.metrics.gnathalSelfSharpenings++;

                const biteYield = (org.biteForceMagnitude / 1800.0) * 0.45;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(220.0, org.energy + biteYield * 2.2);
                }
                this.metrics.cumulativeShearedBiomass += biteYield;
            }
        }

        /**
         * Update placoderm jaw kinematics, gape phase, cranio-thoracic hinge elevation, suction, and 105th & 106th channels.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isPlacoderm === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isPlacoderm) return;

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));

            // 1. Double-Jointed Jaw Gape Kinematic Oscillation
            // Modulated by hunt cadence and swimming velocity
            const cycleRate = 2.4 + speed * 0.8;
            org.jawCyclePhase = (org.jawCyclePhase + cycleRate * dt) % (Math.PI * 2);

            // Dynamic gape opening: open wide on positive phase, snap closed on negative phase
            const gapeWave = Math.sin(org.jawCyclePhase);
            const baseGape = org.isJawSnapping ? 0.08 : 0.28;
            org.jawGapeAngle = Math.max(0.05, Math.min(0.75, baseGape + gapeWave * 0.22));

            // 2. Cranio-Thoracic Hinge Joint Elevation Kinematics
            // Head cranium tilts upward simultaneously as lower jaw depresses downward
            const fatigueDamping = Math.max(0.35, 1.0 - (org.hingeJointFatigue || 0) * 0.65);
            const headWave = Math.max(0.0, gapeWave);
            const peakElevation = (0.22 + (org.epaxialNeckMusclesTension || 0.75) * 0.23) * fatigueDamping;
            org.headElevationAngle = Math.max(0.0, Math.min(0.45, peakElevation * headWave)); // 0.0 - 0.45 rad (~0 - 26 deg)
            org.nuchalGapOpening = org.headElevationAngle * 20.0; // Nuchal gap opening width in pixels

            // Combined Double-Jointed Total Gape Angle (50 - 65 degrees at full extension)
            org.totalGapeAngle = Math.max(0.10, Math.min(1.15, org.jawGapeAngle + org.headElevationAngle));

            if (org.isJawSnapping && gapeWave > 0.8) {
                org.isJawSnapping = false; // Reset snap state after full cycle
            }

            // 3. Buccal Negative Pressure & Cavitation Suction Force
            // Rapid head elevation creates explosive buccal cavity volume expansion
            org.cavitationSuctionForce = (org.suctionPulseForce || 2.4) * (1.0 + (org.totalGapeAngle / 1.15) * 0.85);

            if (gapeWave > 0.65 && Math.random() < 0.08) {
                this.metrics.suctionIntakeEvents++;
                // Micro-pull on adjacent fluid towards mouth
                if (typeof org.energy === "number" && org.energy < 200.0) {
                    org.energy += 0.015 * dt; // Ingest micro-particulates via vacuum pulse
                }
            }

            // 4. Fatigue Dissipation & Osteocytic Bone Remodeling
            // Hinge joint lactic fatigue recovery during calm cruising
            org.hingeJointFatigue = Math.max(0.0, (org.hingeJointFatigue || 0) - 0.040 * dt);
            org.strikeDecelerationSurge = Math.max(0.0, (org.strikeDecelerationSurge || 0) - 0.85 * dt);

            // Osteocytic bone remodeling repair of gnathal plate edges
            if (org.gnathalShearSharpness < 0.88) {
                const remodelDelta = (org.gnathalRemodelingRate || 0.002) * dt * 8.0;
                org.gnathalShearSharpness = Math.min(0.96, org.gnathalShearSharpness + remodelDelta);
                this.metrics.gnathalRemodelingEvents++;
            }

            // 5. Spontaneous Apex Hunting Strike Test (when encountering nearby prey or pelagic seston)
            if (Math.random() < 0.0035) {
                this.triggerApexPredatoryBite(org, null);
            }

            // 6. 105th Telemetry Channel: Gnathostome Jaw Index (% GJI)
            // Formulation:
            // - Jaw Bite Force Magnitude: %35 weight [450 - 1800 N eq]
            // - Gnathal Plate Shearing Sharpness: %30 weight [0.50 - 0.99]
            // - Adductor Muscle Tension: %20 weight [0.45 - 0.95]
            // - Armor Crush Penetration & Suction Intake: %15 weight [0.40 - 0.85]
            const biteRatio = Math.min(1.0, Math.max(0.0, (org.biteForceMagnitude - 450.0) / 1350.0));
            const sharpRatio = Math.min(1.0, Math.max(0.0, (org.gnathalShearSharpness - 0.50) / 0.49));
            const tensionRatio = Math.min(1.0, Math.max(0.0, (org.adductorMusclesTension - 0.45) / 0.50));
            const crushRatio = Math.min(1.0, Math.max(0.0, (org.armorCrushPenetration - 0.40) / 0.45));

            const rawGJI = (biteRatio * 0.35 + sharpRatio * 0.30 + tensionRatio * 0.20 + crushRatio * 0.15) * 100.0;
            org.gnathostomeJawIndex = Math.min(100.0, Math.max(0.0, rawGJI));

            // 7. 106th Telemetry Channel: Cranio-Thoracic Shear Index (% CTS)
            // Formulation:
            // - Double-Jointed Total Gape & Head Elevation: %35 weight [0.25 - 1.15 rad]
            // - Shearing Plate Sharpness & Occlusal Force: %30 weight [0.50 - 0.99]
            // - Epaxial Neck Musculature & Fatigue Resistance: %20 weight [0.35 - 0.95]
            // - Cavitation Suction Force & Hydrodynamic Surge: %15 weight [2.0 - 6.5 N]
            const gapeRatio = Math.min(1.0, Math.max(0.0, (org.totalGapeAngle - 0.25) / 0.90));
            const epaxialNet = (org.epaxialNeckMusclesTension || 0.75) * (1.0 - (org.hingeJointFatigue || 0) * 0.45);
            const epaxialRatio = Math.min(1.0, Math.max(0.0, (epaxialNet - 0.35) / 0.60));
            const cavitationRatio = Math.min(1.0, Math.max(0.0, (org.cavitationSuctionForce - 2.0) / 4.5));

            const rawCTS = (gapeRatio * 0.35 + sharpRatio * 0.30 + epaxialRatio * 0.20 + cavitationRatio * 0.15) * 100.0;
            org.cranioThoracicShearIndex = Math.min(100.0, Math.max(0.0, rawCTS));
        }

        /**
         * Batch update all organisms and compute aggregate placoderm jaw & cranio-thoracic metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let placCount = 0;
            let sumGJI = 0.0;
            let sumCTS = 0.0;
            let sumBite = 0.0;
            let sumSharp = 0.0;
            let sumTension = 0.0;
            let sumPenetration = 0.0;
            let sumGape = 0.0;
            let sumElevation = 0.0;
            let sumTotalGape = 0.0;
            let sumEpaxial = 0.0;
            let sumFatigue = 0.0;
            let sumSuction = 0.0;
            let sumCavitation = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isPlacoderm) {
                    placCount++;
                    sumGJI += org.gnathostomeJawIndex || 0.0;
                    sumCTS += org.cranioThoracicShearIndex || 0.0;
                    sumBite += org.biteForceMagnitude || 0.0;
                    sumSharp += org.gnathalShearSharpness || 0.0;
                    sumTension += org.adductorMusclesTension || 0.0;
                    sumPenetration += org.armorCrushPenetration || 0.0;
                    sumGape += org.jawGapeAngle || 0.0;
                    sumElevation += org.headElevationAngle || 0.0;
                    sumTotalGape += org.totalGapeAngle || 0.0;
                    sumEpaxial += org.epaxialNeckMusclesTension || 0.0;
                    sumFatigue += org.hingeJointFatigue || 0.0;
                    sumSuction += org.suctionPulseForce || 0.0;
                    sumCavitation += org.cavitationSuctionForce || 0.0;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalPlacodermOrganisms = placCount;
            this.metrics.placodermPrevalence = liveCount > 0 ? (placCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanGnathostomeJawIndex = placCount > 0 ? (sumGJI / placCount) : 0.0;
            this.metrics.meanCranioThoracicShearIndex = placCount > 0 ? (sumCTS / placCount) : 0.0;
            this.metrics.meanBiteForceMagnitude = placCount > 0 ? (sumBite / placCount) : 1125.0;
            this.metrics.meanGnathalShearSharpness = placCount > 0 ? (sumSharp / placCount) : 0.82;
            this.metrics.meanAdductorMusclesTension = placCount > 0 ? (sumTension / placCount) : 0.75;
            this.metrics.meanArmorCrushPenetration = placCount > 0 ? (sumPenetration / placCount) : 0.68;
            this.metrics.meanJawGapeAngle = placCount > 0 ? (sumGape / placCount) : 0.38;
            this.metrics.meanHeadElevationAngle = placCount > 0 ? (sumElevation / placCount) : 0.30;
            this.metrics.meanTotalGapeAngle = placCount > 0 ? (sumTotalGape / placCount) : 0.95;
            this.metrics.meanEpaxialNeckTension = placCount > 0 ? (sumEpaxial / placCount) : 0.78;
            this.metrics.meanHingeJointFatigue = placCount > 0 ? (sumFatigue / placCount) : 0.05;
            this.metrics.meanSuctionPulseForce = placCount > 0 ? (sumSuction / placCount) : 2.4;
            this.metrics.meanCavitationSuctionForce = placCount > 0 ? (sumCavitation / placCount) : 4.2;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Placoderm jaw metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PlacodermJawManager;
    }
    if (typeof global !== "undefined") {
        global.PlacodermJawManager = PlacodermJawManager;
        global.placodermJawManager = new PlacodermJawManager();
    }
})(typeof window !== "undefined" ? window : global);
