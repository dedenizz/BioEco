// BioEcosystem - Early Ostracoderm Mineralized Aspidin Armor, Hydrofoil Elevation & Angle of Attack
// Module: src/organs/ostracoderm_armor.js
// Version: 8.17.0 (Hour 537 - System Agent: Hydrofoil Lift, Angle of Attack, Ground Effect & 104th Channel % PEF Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OstracodermArmorManager
     * High-fidelity biological simulation of early Ostracoderm / armored agnathan (Pteraspidomorphi, Thelodonti & Osteostraci) anatomy:
     * - Aspidin Cephalic Shield: Acellular mineralized bone matrix composed of hydroxyapatite plates protecting the head and branchial basket
     * - High Mechanical Crush Resistance: Rigid defensive shell deflecting predatory strikes from apex eurypterids and giant nautiloids
     * - Microscopic Dermal Denticles: Tuberculated dentine/enamel scales breaking boundary layer vortices and reducing skin drag
     * - Heavy Shield Ballistics & Negative Buoyancy: Downward gravitational force and head-heavy pitch torque pulling the snout to benthic mud
     * - Paired Pectoral Hydrofoil Elevation: Primitive paired pectoral appendages generating upward dynamic Bernouilli lift during locomotion
     * - Dynamic Angle of Attack (AoA, alpha: -5 deg to +25 deg): Active hydrofoil inclination modulating lift and induced drag polar curves
     * - Pitch Trim Equilibrium: Balance between downward head-heavy pitch torque and upward pectoral/hypocercal trim correction
     * - Benthic Ground Effect: Aerodynamic/hydrodynamic ground effect near the seafloor reducing induced drag and conserving metabolic energy
     * - Cephalic Sensory Fields: Depressed dorsal and lateral sensory zones housing electroreceptors and mechanoreceptors
     * - Benthic Microphagous Mud Scooping: Bottom-dwelling detrital foraging and mineralized sediment processing
     * - 103rd Channel (% OAI - Ostracoderm Armor Integrity Index) mathematical core
     * - 104th Channel (% PEF - Pectoral Elevation & Hydrofoil Force Index) mathematical core
     */
    class OstracodermArmorManager {
        constructor() {
            this.baseCephalicShieldIntegrity = 0.88; // Structural cohesion of aspidin bone shield [0.50 - 0.99]
            this.baseDermalPlateThickness = 4.2;    // Mineralized bone plate thickness in mm eq [2.5 - 6.5]
            this.baseCrushResistanceCoeff = 0.68;   // Mechanical crush and pincer deflection [0.45 - 0.85]
            this.baseDenticleDensity = 0.72;        // Body coverage of enamel-capped tubercles [0.40 - 0.95]
            this.baseNegativeBuoyancy = 2.4;        // Downward ballast force in N [1.2 - 3.8 N]
            this.baseHeadPitchTorque = 0.48;        // Forward head-heavy tilt torque in N*m [0.25 - 0.75]
            this.basePectoralElevation = 1.5;       // Paired fin flap lift in N [0.8 - 2.5 N]
            this.basePectoralAttackAngle = 0.12;    // Mean AoA in radians (~7 deg, range: -0.087 to +0.436 rad)
            this.baseHydrofoilLiftForce = 1.15;     // Dynamic Bernouilli lift force in N [0.5 - 1.8 N]
            this.basePitchTrimCorrection = 0.42;    // Restorative trim torque in N*m [0.20 - 0.70 N*m]
            this.baseHypocercalCoupling = 0.78;     // Hypocercal caudal reactive trim ratio [0.50 - 0.99]
            this.baseBenthicGroundEffect = 1.00;    // Ground effect lift multiplier [1.00 - 1.45]
            this.baseSensoryAcuity = 0.82;          // Cephalic field perception range [0.65 - 0.95]
            this.baseDetritalScanRate = 0.42;       // Benthic microphagous mud filtration in mg/s

            this.metrics = {
                totalLiveCells: 0,
                totalOstracodermOrganisms: 0,
                ostracodermPrevalence: 0.0,
                meanOstracodermArmorIntegrity: 0.0,    // 103rd Channel % OAI
                meanPectoralElevationForceIndex: 0.0,  // 104th Channel % PEF
                meanCephalicShieldIntegrity: 0.88,
                meanDermalPlateThickness: 4.2,
                meanCrushResistanceCoeff: 0.68,
                meanDenticleDensity: 0.72,
                meanNegativeBuoyancyForce: 2.4,
                meanHeadHeavyPitchTorque: 0.48,
                meanPectoralElevationForce: 1.5,
                meanPectoralAttackAngle: 0.12,
                meanHydrofoilLiftForce: 1.15,
                meanPitchTrimCorrection: 0.42,
                meanHypocercalCoupling: 0.78,
                meanBenthicGroundEffect: 1.00,
                meanSensoryFieldAcuity: 0.82,
                meanBenthicScanRate: 0.42,
                predatorCrushDeflections: 0,
                eurypteridPincerStrikesSurvived: 0,
                benthicDetritalScans: 0,
                hydrofoilLiftStabilizations: 0,
                groundEffectCruisingEvents: 0,
                pitchTrimStabilizations: 0,
                cumulativeArmoredBiomassAssimilated: 0.0
            };
        }

        /**
         * Initialize ostracoderm mineralized armor, cephalic shield, denticles, and pectoral hydrofoils on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Armored bottom feeders, benthic scavengers, or organisms with ostracoderm affinity
            const isCompetent = Boolean(org.hasOstracodermTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom && !org.hasPlacodermTrait &&
                 (org.niche === "scavenger" || org.niche === "benthic_scavenger" || org.niche === "armored_feeder" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.25 && org.dna.diet <= 0.70) ||
                  (org.dna && (org.dna.detritivoreAffinity || 0) > 0.30) ||
                  (org.dna && (org.dna.benthicDragTolerance || 0) > 0.35))) ||
                Boolean(org.dna && ((org.dna.ostracodermAffinity || 0) > 0.25 || (org.dna.mineralArmorAffinity || 0) > 0.25));

            if (typeof org.hasOstracodermTrait === "undefined") {
                org.hasOstracodermTrait = isCompetent;
            }

            if (!org.hasOstracodermTrait) {
                org.isOstracoderm = false;
                org.cephalicShieldIntegrity = 0.0;
                org.dermalPlateThickness = 0.0;
                org.crushResistanceCoeff = 0.0;
                org.dermalDenticleDensity = 0.0;
                org.dermalDenticleTurbulenceReduction = 0.0;
                org.negativeBuoyancyForce = 0.0;
                org.headHeavyPitchTorque = 0.0;
                org.pectoralFinElevation = 0.0;
                org.pectoralAttackAngle = 0.0;
                org.hydrofoilLiftForce = 0.0;
                org.pitchTrimCorrectionTorque = 0.0;
                org.hypocercalThrustCoupling = 0.0;
                org.benthicGroundEffectMultiplier = 1.0;
                org.sensoryFieldAcuity = 0.0;
                org.benthicDetritalScanningRate = 0.0;
                org.ostracodermArmorIntegrity = 0.0;
                org.pectoralElevationForceIndex = 0.0;
                return;
            }

            org.isOstracoderm = true;

            // 1. Aspidin Cephalic Bone Shield & Crush Resistance
            if (typeof org.cephalicShieldIntegrity === "undefined") {
                const integGene = (org.dna && typeof org.dna.shieldIntegrity === "number") ?
                    0.50 + org.dna.shieldIntegrity * 0.49 : 0.70 + Math.random() * 0.28;
                org.cephalicShieldIntegrity = Math.max(0.50, Math.min(0.99, integGene));
            }
            if (typeof org.dermalPlateThickness === "undefined") {
                org.dermalPlateThickness = 2.5 + Math.random() * 4.0; // 2.5 - 6.5 mm eq
            }
            if (typeof org.crushResistanceCoeff === "undefined") {
                org.crushResistanceCoeff = 0.45 + Math.random() * 0.40; // 0.45 - 0.85
            }

            // 2. Body Dermal Denticles / Scales
            if (typeof org.dermalDenticleDensity === "undefined") {
                org.dermalDenticleDensity = 0.50 + Math.random() * 0.45; // 0.40 - 0.95
            }
            if (typeof org.dermalDenticleTurbulenceReduction === "undefined") {
                org.dermalDenticleTurbulenceReduction = 0.15 + (org.dermalDenticleDensity * 0.20); // 0.15 - 0.35
            }

            // 3. Negative Buoyancy & Ballast Pitch Torque
            if (typeof org.negativeBuoyancyForce === "undefined") {
                org.negativeBuoyancyForce = 1.4 + Math.random() * 2.2; // 1.2 - 3.8 N
            }
            if (typeof org.headHeavyPitchTorque === "undefined") {
                org.headHeavyPitchTorque = 0.28 + Math.random() * 0.42; // 0.25 - 0.75 N*m
            }

            // 4. Paired Pectoral Fin Flaps (Hydrofoil Dynamic Lift & AoA)
            if (typeof org.pectoralFinElevation === "undefined") {
                org.pectoralFinElevation = 0.9 + Math.random() * 1.5; // 0.8 - 2.5 N
            }
            if (typeof org.pectoralAttackAngle === "undefined") {
                org.pectoralAttackAngle = 0.05 + Math.random() * 0.22; // ~3 to 15 deg in radians
            }
            if (typeof org.hydrofoilLiftForce === "undefined") {
                org.hydrofoilLiftForce = 0.6 + Math.random() * 1.1; // 0.5 - 1.8 N
            }
            if (typeof org.pitchTrimCorrectionTorque === "undefined") {
                org.pitchTrimCorrectionTorque = 0.25 + Math.random() * 0.40; // 0.20 - 0.70 N*m
            }
            if (typeof org.hypocercalThrustCoupling === "undefined") {
                org.hypocercalThrustCoupling = 0.65 + Math.random() * 0.30; // 0.50 - 0.99
            }
            if (typeof org.benthicGroundEffectMultiplier === "undefined") {
                org.benthicGroundEffectMultiplier = 1.0;
            }

            // 5. Cephalic Sensory Fields & Benthic Scanning
            if (typeof org.sensoryFieldAcuity === "undefined") {
                org.sensoryFieldAcuity = 0.68 + Math.random() * 0.26; // 0.65 - 0.95
            }
            if (typeof org.benthicDetritalScanningRate === "undefined") {
                org.benthicDetritalScanningRate = 0.28 + Math.random() * 0.34; // 0.25 - 0.65 mg/s
            }

            // 6. 103rd (% OAI) and 104th (% PEF) Telemetry Channels
            if (typeof org.ostracodermArmorIntegrity === "undefined") {
                org.ostracodermArmorIntegrity = 0.0;
            }
            if (typeof org.pectoralElevationForceIndex === "undefined") {
                org.pectoralElevationForceIndex = 0.0;
            }
        }

        /**
         * Trigger defensive crush deflection when struck by predator claws or pincer jaws.
         * @param {Object} org - Ostracoderm entity.
         * @param {Object|null} predator - Attacking predator entity.
         */
        triggerPredatorCrushDeflection(org, predator) {
            if (!org || !org.isOstracoderm) return;

            this.metrics.predatorCrushDeflections++;
            if (predator) {
                this.metrics.eurypteridPincerStrikesSurvived++;
                // Mineralized aspidin shield blunts predator claws, recoiling predator
                if (typeof predator.speedMultiplier === "number") {
                    predator.speedMultiplier = 0.55;
                }
            }

            // Minor armor micro-wear upon severe impact
            org.cephalicShieldIntegrity = Math.max(0.40, org.cephalicShieldIntegrity - 0.015);
        }

        /**
         * Update ostracoderm physiology, ballast physics, hydrofoil lift, ground effect and telemetry.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isOstracoderm === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isOstracoderm) return;

            const swimSpeed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));

            // 1. Negative Buoyancy & Forward Pitch Torque (pulling to benthic mud)
            const ballastSink = org.negativeBuoyancyForce * dt * 0.45;
            if (typeof org.y === "number") {
                org.y = Math.min(height - 15.0, org.y + ballastSink);
            }

            // 2. Dynamic Angle of Attack (AoA, alpha: -5 deg to +25 deg / -0.087 to +0.436 rad)
            // Modulated by vertical velocity: sinking rapidly pitches fin upwards to produce positive lift
            const vy = org.vy || 0;
            const targetAoA = vy > 0.4 ?
                Math.min(0.436, org.pectoralAttackAngle + 0.15 * dt) :
                (vy < -0.4 ? Math.max(-0.087, org.pectoralAttackAngle - 0.12 * dt) : 0.12);
            org.pectoralAttackAngle = org.pectoralAttackAngle * 0.88 + targetAoA * 0.12;

            // 3. Bernouilli Dynamic Lift & Induced Drag polar calculation
            // Thin airfoil linear range: C_L = 2 * pi * alpha (capped at stall alpha ~ 18 deg / 0.314 rad)
            const effectiveAlpha = Math.max(-0.087, Math.min(0.314, org.pectoralAttackAngle));
            const liftCoeffCL = Math.max(0.0, Math.min(1.45, 2.0 * Math.PI * Math.max(0.0, effectiveAlpha + 0.05)));

            // 4. Benthic Ground Effect (when cruising in the lower benthic zone or within 120px of seafloor)
            const distToSeafloor = Math.max(0.0, height - (org.y || height));
            if (distToSeafloor < 120.0 || (typeof org.y === "number" && org.y >= height * 0.72)) {
                const proximityRatio = Math.max(0.0, Math.min(1.0, 1.0 - (distToSeafloor / 120.0)));
                org.benthicGroundEffectMultiplier = 1.0 + (proximityRatio * 0.40); // 1.0 - 1.40x boost
                this.metrics.groundEffectCruisingEvents++;

                // Energy-saving benthic cruising
                if (typeof org.energy === "number" && org.energy < 180.0) {
                    org.energy += 0.018 * dt * proximityRatio; // Energy conserved via induced drag reduction
                }
            } else {
                org.benthicGroundEffectMultiplier = 1.0;
            }

            // 5. Net Hydrofoil Dynamic Lift Force & Pitch Trim Stabilization
            const effectiveLiftForce = org.hydrofoilLiftForce * liftCoeffCL * org.benthicGroundEffectMultiplier;
            const dynamicLift = effectiveLiftForce * Math.min(1.6, swimSpeed * 0.85) * dt;
            if (typeof org.y === "number" && swimSpeed > 0.6) {
                org.y = Math.max(20.0, org.y - dynamicLift);
                this.metrics.hydrofoilLiftStabilizations++;
            }

            // 6. Pitch Trim Correction Torque vs Head-Heavy Pitch Torque
            // Pectoral fin lift acting at distance from center of mass produces restorative pitch-up moment
            const trimCorrection = effectiveLiftForce * 0.32 * (org.hypocercalThrustCoupling || 0.78);
            org.pitchTrimCorrectionTorque = Math.min(0.70, Math.max(0.20, trimCorrection));

            const trimEquilibrium = Math.min(1.0, org.pitchTrimCorrectionTorque / Math.max(0.10, org.headHeavyPitchTorque));
            if (trimEquilibrium >= 0.75) {
                this.metrics.pitchTrimStabilizations++;
            }

            // 7. Basal Dermal Bone Plate Remineralization
            if (org.cephalicShieldIntegrity < 0.98) {
                org.cephalicShieldIntegrity = Math.min(0.98, org.cephalicShieldIntegrity + 0.008 * dt);
            }

            // 8. Benthic Mud Scooping & Detrital Scanning
            if (org.y >= height * 0.65) {
                const scanGain = org.benthicDetritalScanningRate * dt;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(160.0, org.energy + scanGain * 0.50);
                }
                this.metrics.cumulativeArmoredBiomassAssimilated += scanGain;
                if (Math.random() < 0.06) {
                    this.metrics.benthicDetritalScans++;
                }
            }

            // 9. Random predatory strike deflection test
            if (Math.random() < 0.0025) {
                this.triggerPredatorCrushDeflection(org, null);
            }

            // 10. 103rd Telemetry Channel: Ostracoderm Armor Integrity Index (% OAI)
            // Formulation:
            // - Cephalic Shield Structural Integrity: %35 weight [0.50 - 0.99]
            // - Dermal Plate Thickness & Mineralization: %30 weight [2.5 - 6.5 mm eq]
            // - Mechanical Crush & Pincer Resistance: %20 weight [0.45 - 0.85]
            // - Dermal Denticle Laminar Turbulence Reduction: %15 weight [0.15 - 0.35]
            const shieldRatio = Math.min(1.0, Math.max(0.0, (org.cephalicShieldIntegrity - 0.50) / 0.49));
            const thickRatio = Math.min(1.0, Math.max(0.0, (org.dermalPlateThickness - 2.5) / 4.0));
            const crushRatio = Math.min(1.0, Math.max(0.0, (org.crushResistanceCoeff - 0.45) / 0.40));
            const denticleRatio = Math.min(1.0, Math.max(0.0, (org.dermalDenticleTurbulenceReduction - 0.15) / 0.20));

            const rawOAI = (shieldRatio * 0.35 + thickRatio * 0.30 + crushRatio * 0.20 + denticleRatio * 0.15) * 100.0;
            org.ostracodermArmorIntegrity = Math.min(100.0, Math.max(0.0, rawOAI));

            // 11. 104th Telemetry Channel: Pectoral Elevation & Hydrofoil Force Index (% PEF)
            // Formulation:
            // - Pectoral AoA Efficiency: %35 weight [-0.087 to +0.436 rad]
            // - Dynamic Hydrofoil Lift Force: %30 weight [0.5 - 1.8 N]
            // - Pitch Trim Equilibrium Coupling: %20 weight [0.0 - 1.0]
            // - Benthic Ground Effect Gain: %15 weight [1.00 - 1.40]
            const aoaRatio = Math.min(1.0, Math.max(0.0, (org.pectoralAttackAngle + 0.087) / 0.523));
            const liftRatio = Math.min(1.0, Math.max(0.0, (effectiveLiftForce - 0.5) / 1.3));
            const groundRatio = Math.min(1.0, Math.max(0.0, (org.benthicGroundEffectMultiplier - 1.0) / 0.40));

            const rawPEF = (aoaRatio * 0.35 + liftRatio * 0.30 + trimEquilibrium * 0.20 + groundRatio * 0.15) * 100.0;
            org.pectoralElevationForceIndex = Math.min(100.0, Math.max(0.0, rawPEF));
        }

        /**
         * Batch update all organisms and compute aggregate ostracoderm metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let ostCount = 0;
            let sumOAI = 0.0;
            let sumPEF = 0.0;
            let sumShield = 0.0;
            let sumThickness = 0.0;
            let sumCrush = 0.0;
            let sumDenticles = 0.0;
            let sumBuoyancy = 0.0;
            let sumPitchTorque = 0.0;
            let sumPectoral = 0.0;
            let sumAoA = 0.0;
            let sumLift = 0.0;
            let sumTrim = 0.0;
            let sumHypo = 0.0;
            let sumGround = 0.0;
            let sumSensory = 0.0;
            let sumScan = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isOstracoderm) {
                    ostCount++;
                    sumOAI += org.ostracodermArmorIntegrity || 0.0;
                    sumPEF += org.pectoralElevationForceIndex || 0.0;
                    sumShield += org.cephalicShieldIntegrity || 0.0;
                    sumThickness += org.dermalPlateThickness || 0.0;
                    sumCrush += org.crushResistanceCoeff || 0.0;
                    sumDenticles += org.dermalDenticleDensity || 0.0;
                    sumBuoyancy += org.negativeBuoyancyForce || 0.0;
                    sumPitchTorque += org.headHeavyPitchTorque || 0.0;
                    sumPectoral += org.pectoralFinElevation || 0.0;
                    sumAoA += org.pectoralAttackAngle || 0.0;
                    sumLift += org.hydrofoilLiftForce || 0.0;
                    sumTrim += org.pitchTrimCorrectionTorque || 0.0;
                    sumHypo += org.hypocercalThrustCoupling || 0.0;
                    sumGround += org.benthicGroundEffectMultiplier || 1.0;
                    sumSensory += org.sensoryFieldAcuity || 0.0;
                    sumScan += org.benthicDetritalScanningRate || 0.0;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalOstracodermOrganisms = ostCount;
            this.metrics.ostracodermPrevalence = liveCount > 0 ? (ostCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanOstracodermArmorIntegrity = ostCount > 0 ? (sumOAI / ostCount) : 0.0;
            this.metrics.meanPectoralElevationForceIndex = ostCount > 0 ? (sumPEF / ostCount) : 0.0;
            this.metrics.meanCephalicShieldIntegrity = ostCount > 0 ? (sumShield / ostCount) : 0.88;
            this.metrics.meanDermalPlateThickness = ostCount > 0 ? (sumThickness / ostCount) : 4.2;
            this.metrics.meanCrushResistanceCoeff = ostCount > 0 ? (sumCrush / ostCount) : 0.68;
            this.metrics.meanDenticleDensity = ostCount > 0 ? (sumDenticles / ostCount) : 0.72;
            this.metrics.meanNegativeBuoyancyForce = ostCount > 0 ? (sumBuoyancy / ostCount) : 2.4;
            this.metrics.meanHeadHeavyPitchTorque = ostCount > 0 ? (sumPitchTorque / ostCount) : 0.48;
            this.metrics.meanPectoralElevationForce = ostCount > 0 ? (sumPectoral / ostCount) : 1.5;
            this.metrics.meanPectoralAttackAngle = ostCount > 0 ? (sumAoA / ostCount) : 0.12;
            this.metrics.meanHydrofoilLiftForce = ostCount > 0 ? (sumLift / ostCount) : 1.15;
            this.metrics.meanPitchTrimCorrection = ostCount > 0 ? (sumTrim / ostCount) : 0.42;
            this.metrics.meanHypocercalCoupling = ostCount > 0 ? (sumHypo / ostCount) : 0.78;
            this.metrics.meanBenthicGroundEffect = ostCount > 0 ? (sumGround / ostCount) : 1.00;
            this.metrics.meanSensoryFieldAcuity = ostCount > 0 ? (sumSensory / ostCount) : 0.82;
            this.metrics.meanBenthicScanRate = ostCount > 0 ? (sumScan / ostCount) : 0.42;
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
         * @returns {Object} Comprehensive Ostracoderm metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OstracodermArmorManager;
    }
    if (typeof global !== "undefined") {
        global.OstracodermArmorManager = OstracodermArmorManager;
        global.ostracodermArmorManager = new OstracodermArmorManager();
    }
})(typeof window !== "undefined" ? window : global);
