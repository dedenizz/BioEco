// BioEcosystem - Core Stability, Numerical Clamping & Defensive Guards
// Module: src/core/stability.js
// Version: 5.47.0 (Hour 267 - System Agent: Steerable Hyponome & Vectorial Maneuver Bounds)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class StabilityValidator {
        // Enforce physical boundary limits and guard against NaN / infinite divergence
        static clampSensoryState(org) {
            if (!org) return;

            // 1. Statolith Physical Bounds
            org.statolithDeflection = Number.isFinite(org.statolithDeflection)
                ? Math.max(0.0, Math.min(1.0, org.statolithDeflection)) : 0.0;
            if (!Number.isFinite(org.statolithX)) org.statolithX = 0.0;
            if (!Number.isFinite(org.statolithY)) org.statolithY = 0.0;
            
            // Constrain displacement coordinates within capsule radius
            const capRadius = 4.0;
            const distSq = org.statolithX * org.statolithX + org.statolithY * org.statolithY;
            if (distSq > capRadius * capRadius) {
                const dist = Math.sqrt(distSq);
                org.statolithX = (org.statolithX / dist) * capRadius;
                org.statolithY = (org.statolithY / dist) * capRadius;
            }

            // 2. Rhopalia Equilibrium & Angular Stability Bounds
            org.equilibriumStability = Number.isFinite(org.equilibriumStability)
                ? Math.max(0.1, Math.min(1.0, org.equilibriumStability)) : 0.5;

            // 3. Normalized Tilt Angle [-180, +180] degrees
            if (!Number.isFinite(org.tiltAngle)) {
                org.tiltAngle = 0.0;
            } else {
                let ang = org.tiltAngle;
                while (ang > 180.0) ang -= 360.0;
                while (ang < -180.0) ang += 360.0;
                org.tiltAngle = ang;
            }

            // 4. ATP Conservation Bonus [0.0 - 0.30] (Max 30% metabolic savings)
            org.energyConservationBonus = Number.isFinite(org.energyConservationBonus)
                ? Math.max(0.0, Math.min(0.30, org.energyConservationBonus)) : 0.0;

            // 5. Statocyst System Instance Internal Clamping
            if (org.sensorySystem) {
                const ss = org.sensorySystem;
                if (!Number.isFinite(ss.statolithX)) ss.statolithX = 0.0;
                if (!Number.isFinite(ss.statolithY)) ss.statolithY = 0.0;
                if (!Number.isFinite(ss.statolithVx)) ss.statolithVx = 0.0;
                if (!Number.isFinite(ss.statolithVy)) ss.statolithVy = 0.0;
                ss.equilibriumStability = Number.isFinite(ss.equilibriumStability) ? Math.max(0.1, Math.min(1.0, ss.equilibriumStability)) : 0.5;
                ss.energyConservationBonus = Number.isFinite(ss.energyConservationBonus) ? Math.max(0.0, Math.min(0.30, ss.energyConservationBonus)) : 0.0;
                ss.currentLuminosity = Number.isFinite(ss.currentLuminosity) ? Math.max(0.0, Math.min(1.0, ss.currentLuminosity)) : 0.0;
                ss.lightRadius = Number.isFinite(ss.lightRadius) ? Math.max(0.0, Math.min(120.0, ss.lightRadius)) : 0.0;
                if (!Number.isFinite(ss.luredPreyCount)) ss.luredPreyCount = 0;
            }

            // 6. Photophore Luminosity Clamping [0.0 - 1.0] and Light Radius [0 - 120px]
            org.currentLuminosity = Number.isFinite(org.currentLuminosity)
                ? Math.max(0.0, Math.min(1.0, org.currentLuminosity)) : 0.0;
            org.lightRadius = Number.isFinite(org.lightRadius)
                ? Math.max(0.0, Math.min(120.0, org.lightRadius)) : 0.0;

            if (!Number.isFinite(org.luredPreyCount) || org.luredPreyCount < 0) org.luredPreyCount = 0;

            // 7. Cuticle Armor & Sclerite Physical Bounds
            org.cuticleThickness = Number.isFinite(org.cuticleThickness) ? Math.max(0.0, Math.min(5.0, org.cuticleThickness)) : 0.0;
            org.scleriteHardness = Number.isFinite(org.scleriteHardness) ? Math.max(0.1, Math.min(1.0, org.scleriteHardness)) : 0.1;
            org.armorAbsorption = Number.isFinite(org.armorAbsorption) ? Math.max(0.0, Math.min(0.75, org.armorAbsorption)) : 0.0;
            org.effectiveAbsorption = Number.isFinite(org.effectiveAbsorption) ? Math.max(0.0, Math.min(0.75, org.effectiveAbsorption)) : 0.0;

            if (org.exoskeletonSystem) {
                const es = org.exoskeletonSystem;
                if (!Number.isFinite(es.cuticleThickness)) es.cuticleThickness = 0.0;
                if (!Number.isFinite(es.scleriteHardness)) es.scleriteHardness = 0.1;
                if (!Number.isFinite(es.mineralizationState)) es.mineralizationState = 0.0;
                if (!Number.isFinite(es.hydrostaticCushion)) es.hydrostaticCushion = 1.0;
                if (!Number.isFinite(es.armorAbsorption)) es.armorAbsorption = 0.0;
                if (!Number.isFinite(es.effectiveAbsorption)) es.effectiveAbsorption = 0.0;
                if (!Number.isFinite(es.punctureThreshold)) es.punctureThreshold = 0.0;
                if (!Number.isFinite(es.deflectedStrikesCount)) es.deflectedStrikesCount = 0;
                if (!Number.isFinite(es.ecdysoneTiter)) es.ecdysoneTiter = 0.0;
                if (!Number.isFinite(es.softCuticleTimer)) es.softCuticleTimer = 0;
            }

            // 8. Maximum Physical Velocity Cap (Terminal Boundary Defense)
            const maxSpeed = 8.0;
            const speedSq = org.vx * org.vx + org.vy * org.vy;
            if (speedSq > maxSpeed * maxSpeed) {
                const speed = Math.sqrt(speedSq);
                org.vx = (org.vx / speed) * maxSpeed;
                org.vy = (org.vy / speed) * maxSpeed;
            }
        }

        // Dedicated clamping for pheromone chemical signaling and social flocking state
        static clampPheromoneState(org) {
            if (!org) return;
            org.socialCohesion = Number.isFinite(org.socialCohesion) ? Math.max(0.0, Math.min(1.0, org.socialCohesion)) : 0.0;
            org.activeTrailCount = Number.isFinite(org.activeTrailCount) ? Math.max(0, Math.min(100, Math.round(org.activeTrailCount))) : 0;
            org.metabolicDragDiscount = Number.isFinite(org.metabolicDragDiscount) ? Math.max(0.80, Math.min(1.0, org.metabolicDragDiscount)) : 1.0;

            if (org.pheromoneSystem) {
                const ps = org.pheromoneSystem;
                if (!Number.isFinite(ps.flockingVector.x)) ps.flockingVector.x = 0.0;
                if (!Number.isFinite(ps.flockingVector.y)) ps.flockingVector.y = 0.0;
                if (!Number.isFinite(ps.gradientVector.x)) ps.gradientVector.x = 0.0;
                if (!Number.isFinite(ps.gradientVector.y)) ps.gradientVector.y = 0.0;
            }
        }

        // Clamp individual emitted pheromone puff boundaries
        static clampPheromonePuff(p) {
            if (!p) return null;
            if (!Number.isFinite(p.x)) p.x = 300.0;
            if (!Number.isFinite(p.y)) p.y = 300.0;
            p.intensity = Number.isFinite(p.intensity) ? Math.max(0.1, Math.min(3.0, p.intensity)) : 1.0;
            p.decay = Number.isFinite(p.decay) ? Math.max(0.0, Math.min(1.0, p.decay)) : 1.0;
            p.radius = Number.isFinite(p.radius) ? Math.max(4.0, Math.min(60.0, p.radius)) : 12.0;
            return p;
        }

        // Dedicated numerical clamping for chromatophore pigment layers and dynamic crypsis
        static clampChromatophoreState(org) {
            if (!org) return;
            org.crypticMatchingScore = Number.isFinite(org.crypticMatchingScore) ? Math.max(0.0, Math.min(1.0, org.crypticMatchingScore)) : 0.0;
            org.substrateAssimilation = Number.isFinite(org.substrateAssimilation) ? Math.max(0.0, Math.min(1.0, org.substrateAssimilation)) : 0.0;
            org.predationDeterrence = Number.isFinite(org.predationDeterrence) ? Math.max(0.0, Math.min(0.70, org.predationDeterrence)) : 0.0;
            org.chromaR = Number.isFinite(org.chromaR) ? Math.max(0, Math.min(255, Math.round(org.chromaR))) : 120;
            org.chromaG = Number.isFinite(org.chromaG) ? Math.max(0, Math.min(255, Math.round(org.chromaG))) : 120;
            org.chromaB = Number.isFinite(org.chromaB) ? Math.max(0, Math.min(255, Math.round(org.chromaB))) : 120;
            if (org.chromatophoreSystem) {
                const cs = org.chromatophoreSystem;
                cs.currentR = Number.isFinite(cs.currentR) ? Math.max(0.0, Math.min(255.0, cs.currentR)) : 120.0;
                cs.currentG = Number.isFinite(cs.currentG) ? Math.max(0.0, Math.min(255.0, cs.currentG)) : 120.0;
                cs.currentB = Number.isFinite(cs.currentB) ? Math.max(0.0, Math.min(255.0, cs.currentB)) : 120.0;
                cs.targetR = Number.isFinite(cs.targetR) ? Math.max(0.0, Math.min(255.0, cs.targetR)) : 120.0;
                cs.targetG = Number.isFinite(cs.targetG) ? Math.max(0.0, Math.min(255.0, cs.targetG)) : 120.0;
                cs.targetB = Number.isFinite(cs.targetB) ? Math.max(0.0, Math.min(255.0, cs.targetB)) : 120.0;
                cs.melanophoreDispersion = Number.isFinite(cs.melanophoreDispersion) ? Math.max(0.0, Math.min(1.0, cs.melanophoreDispersion)) : 0.20;
                cs.xanthophoreDispersion = Number.isFinite(cs.xanthophoreDispersion) ? Math.max(0.0, Math.min(1.0, cs.xanthophoreDispersion)) : 0.20;
                cs.cyanophoreDispersion = Number.isFinite(cs.cyanophoreDispersion) ? Math.max(0.0, Math.min(1.0, cs.cyanophoreDispersion)) : 0.15;
                cs.erythrophoreDispersion = Number.isFinite(cs.erythrophoreDispersion) ? Math.max(0.0, Math.min(1.0, cs.erythrophoreDispersion)) : 0.15;
                cs.flashTicksRemaining = Number.isFinite(cs.flashTicksRemaining) ? Math.max(0, Math.min(18, Math.round(cs.flashTicksRemaining))) : 0;
            }
        }

        // Dedicated numerical clamping for guanine crystal iridophores and optical interference
        static clampIridophoreState(org) {
            if (!org) return;
            org.specularReflectance = Number.isFinite(org.specularReflectance) ? Math.max(0.0, Math.min(0.95, org.specularReflectance)) : 0.20;
            org.ocularDisruption = Number.isFinite(org.ocularDisruption) ? Math.max(0.0, Math.min(0.40, org.ocularDisruption)) : 0.0;
            org.interferenceWavelength = Number.isFinite(org.interferenceWavelength) ? Math.max(380, Math.min(780, Math.round(org.interferenceWavelength))) : 490;
            org.countershadingScore = Number.isFinite(org.countershadingScore) ? Math.max(0.0, Math.min(1.0, org.countershadingScore)) : 0.45;

            if (org.iridophoreSystem) {
                const ir = org.iridophoreSystem;
                ir.specularReflectance = Number.isFinite(ir.specularReflectance) ? Math.max(0.0, Math.min(0.95, ir.specularReflectance)) : 0.20;
                ir.ocularDisruption = Number.isFinite(ir.ocularDisruption) ? Math.max(0.0, Math.min(0.40, ir.ocularDisruption)) : 0.0;
                ir.interferenceWavelength = Number.isFinite(ir.interferenceWavelength) ? Math.max(380.0, Math.min(780.0, ir.interferenceWavelength)) : 490.0;
                ir.countershadingScore = Number.isFinite(ir.countershadingScore) ? Math.max(0.0, Math.min(1.0, ir.countershadingScore)) : 0.45;
                ir.dazzleTimer = Number.isFinite(ir.dazzleTimer) ? Math.max(0, Math.min(18, Math.round(ir.dazzleTimer))) : 0;
            }
        }

        // Dedicated numerical clamping for chemoautotrophic & hydrothermal state
        static clampChemoautotrophyState(org) {
            if (!org) return;
            org.storedSulfur = Number.isFinite(org.storedSulfur) ? Math.max(0.0, Math.min(50.0, org.storedSulfur)) : 0.0; org.storedSulfurVacuole = Number.isFinite(org.storedSulfurVacuole) ? Math.max(0.0, Math.min(50.0, org.storedSulfurVacuole)) : 0.0;
            org.chemosyntheticYield = Number.isFinite(org.chemosyntheticYield) ? Math.max(0.0, Math.min(25.0, org.chemosyntheticYield)) : 0.0;
            org.barophilicStrain = Number.isFinite(org.barophilicStrain) ? Math.max(0.0, Math.min(1.0, org.barophilicStrain)) : 0.0;
            org.ventProximity = Number.isFinite(org.ventProximity) ? Math.max(0.0, Math.min(1.0, org.ventProximity)) : 0.0;
            org.thermalExposure = Number.isFinite(org.thermalExposure) ? Math.max(2.0, Math.min(380.0, org.thermalExposure)) : 2.0; org.thermalStrain = Number.isFinite(org.thermalStrain) ? Math.max(0.0, Math.min(1.0, org.thermalStrain)) : 0.0;
            org.thermalTaxisScore = Number.isFinite(org.thermalTaxisScore) ? Math.max(0.0, Math.min(1.0, org.thermalTaxisScore)) : 0.0;
            if (typeof org.isThermotaxisActive !== "boolean") org.isThermotaxisActive = false;
            if (typeof org.isAtVent !== "boolean") org.isAtVent = false;
        }

        // Clamp and sanitize abyssal bioluminescence & photophore state
        static clampBioluminescenceState(org) {
            if (!org) return;
            org.storedLuciferin = Number.isFinite(org.storedLuciferin) ? Math.max(0.0, Math.min(40.0, org.storedLuciferin)) : 0.0;
            org.currentLuminosity = Number.isFinite(org.currentLuminosity) ? Math.max(0.0, Math.min(1.0, org.currentLuminosity)) : 0.0;
            org.lightRadius = Number.isFinite(org.lightRadius) ? Math.max(0.0, Math.min(100.0, org.lightRadius)) : 0.0;
            if (typeof org.isFlashing !== "boolean") org.isFlashing = false;
            if (typeof org.alarmBurstActive !== "boolean") org.alarmBurstActive = false;
            org.synchronizedPeerCount = Number.isFinite(org.synchronizedPeerCount) ? Math.max(0, Math.floor(org.synchronizedPeerCount)) : 0;
        }

        // Clamp and sanitize hydrostatic buoyancy & gas vesicle state
        static clampBuoyancyState(org) {
            if (!org) return;
            org.gasVolume = Number.isFinite(org.gasVolume) ? Math.max(0.0, Math.min(20.0, org.gasVolume)) : 0.0;
            org.lipidReserves = Number.isFinite(org.lipidReserves) ? Math.max(0.0, Math.min(25.0, org.lipidReserves)) : 0.0;
            org.currentBuoyancyForce = Number.isFinite(org.currentBuoyancyForce) ? Math.max(-0.20, Math.min(0.20, org.currentBuoyancyForce)) : 0.0;
            org.neutralDepthTarget = Number.isFinite(org.neutralDepthTarget) ? Math.max(50.0, Math.min(550.0, org.neutralDepthTarget)) : 300.0;
            if (typeof org.isMigratingUp !== "boolean") org.isMigratingUp = false;
            if (typeof org.isMigratingDown !== "boolean") org.isMigratingDown = false;
            if (!Number.isFinite(org.dvmFeedingBonus)) org.dvmFeedingBonus = 0.0;
            if (typeof org.dvmRefugeActive !== "boolean") org.dvmRefugeActive = false;
        }

        // Clamp and sanitize ventral counter-illumination & silhouette camouflage state
        static clampCounterIlluminationState(org) {
            if (!org) return;
            org.dorsalIrradiance = Number.isFinite(org.dorsalIrradiance) ? Math.max(0.0, Math.min(1.0, org.dorsalIrradiance)) : 0.0; org.ventralLuminosity = Number.isFinite(org.ventralLuminosity) ? Math.max(0.0, Math.min(1.0, org.ventralLuminosity)) : 0.0;
            org.mismatchError = Number.isFinite(org.mismatchError) ? Math.max(0.0, Math.min(1.0, org.mismatchError)) : 0.0; org.silhouetteConcealmentScore = Number.isFinite(org.silhouetteConcealmentScore) ? Math.max(0.0, Math.min(1.0, org.silhouetteConcealmentScore)) : 0.0;
            org.ventralPhotophoreCount = Number.isFinite(org.ventralPhotophoreCount) ? Math.max(0, Math.floor(org.ventralPhotophoreCount)) : 0;
            if (typeof org.counterIlluminationActive !== "boolean") org.counterIlluminationActive = false;
        }

        // Clamp and sanitize siphon jet propulsion & elastic mantle state
        static clampSiphonState(org) {
            if (!org) return;
            org.mantleVolume = Number.isFinite(org.mantleVolume) ? Math.max(0.0, Math.min(15.0, org.mantleVolume)) : 0.0; org.cavityPressure = Number.isFinite(org.cavityPressure) ? Math.max(0.0, Math.min(50.0, org.cavityPressure)) : 0.0;
            org.jetThrustForce = Number.isFinite(org.jetThrustForce) ? Math.max(0.0, Math.min(2.5, org.jetThrustForce)) : 0.0;
            if (!Number.isFinite(org.siphonAngle)) org.siphonAngle = Math.PI;
            org.siphonDeflectionAngle = Number.isFinite(org.siphonDeflectionAngle) ? Math.max(-Math.PI, Math.min(Math.PI, org.siphonDeflectionAngle)) : 0.0;
            if (typeof org.reverseBrakingActive !== "boolean") org.reverseBrakingActive = false;
            if (typeof org.jetBurstActive !== "boolean") org.jetBurstActive = false;
            if (typeof org.cavitationPlumeActive !== "boolean") org.cavitationPlumeActive = false;
            if (typeof org.exhaustionFreeze !== "boolean") org.exhaustionFreeze = false;
        }

                // Clamp and sanitize biogenic calcification & aragonite matrix state
        static clampCalcificationState(org) {
            if (!org) return;
            org.calcifiedMass = Number.isFinite(org.calcifiedMass) ? Math.max(0.0, Math.min(100.0, org.calcifiedMass)) : 0.0; org.aragoniteMatrixScore = Number.isFinite(org.aragoniteMatrixScore) ? Math.max(0.0, Math.min(1.0, org.aragoniteMatrixScore)) : 0.0;
            org.symbiontEnergyYield = Number.isFinite(org.symbiontEnergyYield) ? Math.max(0.0, Math.min(20.0, org.symbiontEnergyYield)) : 0.0; org.reefShelterFactor = Number.isFinite(org.reefShelterFactor) ? Math.max(0.0, Math.min(0.70, org.reefShelterFactor)) : 0.0;
            org.bleachingScore = Number.isFinite(org.bleachingScore) ? Math.max(0.0, Math.min(1.0, org.bleachingScore)) : 0.0; org.mucusSheathFactor = Number.isFinite(org.mucusSheathFactor) ? Math.max(0.0, Math.min(1.0, org.mucusSheathFactor)) : 0.0; if (typeof org.isReefAnchored !== "boolean") org.isReefAnchored = false;
        }

        static clampNeuralState(org) {
            if (!org) return;
            org.membranePotential = Number.isFinite(org.membranePotential) ? Math.max(-90.0, Math.min(50.0, org.membranePotential)) : -70.0; org.plasticityScore = Number.isFinite(org.plasticityScore) ? Math.max(0.0, Math.min(1.0, org.plasticityScore)) : 0.0;
            org.neuromuscularDrive = Number.isFinite(org.neuromuscularDrive) ? Math.max(0.0, Math.min(1.0, org.neuromuscularDrive)) : 0.0; org.acetylcholineLevel = Number.isFinite(org.acetylcholineLevel) ? Math.max(0.0, Math.min(100.0, org.acetylcholineLevel)) : 50.0;
            org.dopamineLevel = Number.isFinite(org.dopamineLevel) ? Math.max(0.0, Math.min(100.0, org.dopamineLevel)) : 25.0; if (typeof org.isDepolarized !== "boolean") org.isDepolarized = false;
        }

        // Clean unhooking of sensory, exoskeleton, colony, camouflage, abyssal, and buoyancy pointers
        static cleanPointersOnDeath(org) {
            StabilityValidator.cleanupOrganism(org);
        }

        static cleanupOrganism(org) {
            if (!org) return;
            org.alive = false; org.hasStatocysts = false; org.hasRhopalia = false; org.hasPhotophores = false; org.hasExoskeleton = false;
            org.statolithDeflection = 0.0; org.equilibriumStability = 0.0; org.energyConservationBonus = 0.0;
            org.cuticleThickness = 0.0; org.armorAbsorption = 0.0; org.effectiveAbsorption = 0.0;
            org.socialCohesion = 0.0; org.activeTrailCount = 0; org.metabolicDragDiscount = 1.0;
            org.crypticMatchingScore = 0.0; org.substrateAssimilation = 0.0; org.predationDeterrence = 0.0;
            org.specularReflectance = 0.0; org.ocularDisruption = 0.0; org.interferenceWavelength = 490;
            org.countershadingScore = 0.0; org.dazzleActive = false;
            org.storedSulfur = 0.0; org.chemosyntheticYield = 0.0; org.barophilicStrain = 0.0; org.isAtVent = false; org.ventProximity = 0.0;
            org.storedLuciferin = 0.0; org.currentLuminosity = 0.0; org.lightRadius = 0.0; org.isFlashing = false; org.alarmBurstActive = false; org.synchronizedPeerCount = 0;
            org.gasVolume = 0.0; org.lipidReserves = 0.0; org.currentBuoyancyForce = 0.0; org.isMigratingUp = false; org.isMigratingDown = false; org.dvmFeedingBonus = 0.0; org.dvmRefugeActive = false;
            org.dorsalIrradiance = 0.0; org.ventralLuminosity = 0.0; org.mismatchError = 0.0; org.silhouetteConcealmentScore = 0.0; org.ventralPhotophoreCount = 0; org.counterIlluminationActive = false;
            
            if (org.exoskeletonSystem) { org.exoskeletonSystem.organism = null; org.exoskeletonSystem = null; }
            if (org.sensorySystem) { org.sensorySystem.organism = null; org.sensorySystem = null; }
            if (org.pheromoneSystem) { org.pheromoneSystem.cleanup(); org.pheromoneSystem = null; } if (org.chromatophoreSystem) { org.chromatophoreSystem.cleanup(); org.chromatophoreSystem = null; }
            if (org.iridophoreSystem) { org.iridophoreSystem.cleanup(); org.iridophoreSystem = null; } if (org.chemoautotrophySystem) { org.chemoautotrophySystem.cleanup(); org.chemoautotrophySystem = null; }
            if (org.abyssalBioluminescenceSystem) { org.abyssalBioluminescenceSystem.cleanup(); org.abyssalBioluminescenceSystem = null; } if (org.buoyancyVacuoleSystem) { org.buoyancyVacuoleSystem.cleanup(); org.buoyancyVacuoleSystem = null; }
            if (org.counterIlluminationSystem) { org.counterIlluminationSystem.cleanup(); org.counterIlluminationSystem = null; }
            if (org.siphonPropulsionSystem) { org.siphonPropulsionSystem.cleanup(); org.siphonPropulsionSystem = null; } if (org.calcificationSystem) { org.calcificationSystem.cleanup(); org.calcificationSystem = null; } org.mantleVolume = 0.0; org.cavityPressure = 0.0; org.jetThrustForce = 0.0; org.calcifiedMass = 0.0; org.aragoniteMatrixScore = 0.0; org.isReefAnchored = false; org.symbiontEnergyYield = 0.0; org.reefShelterFactor = 0.0; org.bleachingScore = 0.0; org.mucusSheathFactor = 0.0; if (org.neuralNetworkSystem) { org.neuralNetworkSystem.cleanup(); org.neuralNetworkSystem = null; } org.membranePotential = -70.0; org.plasticityScore = 0.0; org.neuromuscularDrive = 0.0; org.isDepolarized = false;
        }

        // Comprehensive integrity audit over live population
        static auditPopulation(organisms) {
            let nanCount = 0, infCount = 0, clampedCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o.alive) continue;

                if (!Number.isFinite(o.x) || !Number.isFinite(o.y) || !Number.isFinite(o.energy)) nanCount++;

                StabilityValidator.clampSensoryState(o); StabilityValidator.clampPheromoneState(o);
                StabilityValidator.clampChromatophoreState(o); StabilityValidator.clampIridophoreState(o);
                StabilityValidator.clampChemoautotrophyState(o); StabilityValidator.clampBioluminescenceState(o);
                StabilityValidator.clampBuoyancyState(o); StabilityValidator.clampCounterIlluminationState(o);
                StabilityValidator.clampSiphonState(o); StabilityValidator.clampCalcificationState(o); StabilityValidator.clampNeuralState(o);
                clampedCount++;
            }

            return { nanCount, infCount, clampedCount };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = StabilityValidator;
    } else {
        global.StabilityValidator = StabilityValidator;
    }
})(typeof window !== "undefined" ? window : global);