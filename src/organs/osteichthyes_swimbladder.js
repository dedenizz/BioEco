// BioEcosystem - Early Osteichthyes Swim Bladder Hydrostatic Buoyancy, Opercular Dual-Pump & Lepidotrichia Rays
// Module: src/organs/osteichthyes_swimbladder.js
// Version: 8.40.0 (Hour 560 - System Agent: Swim Bladder Hydrostatic Buoyancy, Bony Operculum Dual-Pump, Lepidotrichia Fin Rays, Endochondral Ossification & 109th/110th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OsteichthyesSwimBladderManager
     * High-fidelity biological simulation of early Osteichthyes / Actinopterygii & Sarcopterygii (bony fishes):
     * - Hydrostatic Neutral Buoyancy via Swim Bladder: Gas gland (rete mirabile) O2/N2 secretion and oval window resorption, liberating fish from continuous swimming
     * - Zero-Energy Water Column Hovering: Allows motionless suspension in water column with 65% metabolic energy savings compared to negative buoyancy sinking
     * - Bony Operculum Dual-Pump Ventilation: Synchronized buccal cavity expansion and opercular flap suction creating non-stop negative pressure gill water flow while motionless
     * - Lepidotrichia Articulated Fin Rays: Dermal bone segmented rays with independent micro-muscular control enabling instant braking, 360-degree pivoting, and precision hovering
     * - Endochondral & Periosteal Ossification: Hydroxyapatite and calcium phosphate mineralization replacing cartilage with rigid bone, amplifying muscular lever torque
     * - 109th Telemetry Channel (% SBI - Swim Bladder Hydrostatic Index) mathematical core
     * - 110th Telemetry Channel (% OVR - Opercular Ventilation Rate) mathematical core
     */
    class OsteichthyesSwimBladderManager {
        constructor() {
            this.baseBladderVolume = 1.0;            // Normalized swim bladder volume [0.40 - 1.20]
            this.baseGasGlandRate = 0.12;           // Gas gland rete mirabile secretion rate [0.05 - 0.25 /tick]
            this.baseOvalWindowRate = 0.08;         // Oval window vascular resorption rate [0.03 - 0.18 /tick]
            this.baseOpercularRate = 0.65;          // Opercular rhythm rate [0.30 - 0.95]
            this.baseDualPumpEfficiency = 0.78;     // Synchronized buccal-opercular dual-pump efficiency [0.50 - 0.99]
            this.baseBuccalPressure = 0.75;         // Branchial negative suction pressure [0.40 - 1.20 kPa]
            this.baseFinRayCount = 16;              // Lepidotrichia segmented fin rays [8 - 24]
            this.baseFinRayFlexibility = 0.72;      // Ray articulation flexibility [0.45 - 0.95]
            this.baseBoneDensity = 0.76;            // Endochondral calcification density [0.55 - 0.99]
            this.baseLeverageMultiplier = 1.75;     // Skeletal rigidity muscular leverage [1.40 - 2.20x]

            this.metrics = {
                totalLiveCells: 0,
                totalOsteichthyesOrganisms: 0,
                osteichthyesPrevalence: 0.0,
                meanSwimBladderIndex: 0.0,           // 109th Channel % SBI
                meanOpercularVentilationRate: 0.0,   // 110th Channel % OVR
                meanSwimBladderVolume: 1.0,
                meanGasGlandActivity: 0.12,
                meanNeutralBuoyancyHoverRatio: 0.0,
                meanOpercularRate: 0.65,
                meanDualPumpEfficiency: 0.78,
                meanFinRayCount: 16.0,
                meanFinRayFlexibility: 0.72,
                meanEndochondralBoneDensity: 0.76,
                meanSkeletalRigidityLeverage: 1.75,
                neutralBuoyancyHoverEvents: 0,
                motionlessBreathingEvents: 0,
                gasGlandSecretionEvents: 0,
                ovalWindowResorptionEvents: 0,
                finRayMicroManeuvers: 0,
                cumulativeHoverEnergySaved: 0.0,
                cumulativeBonyBiomass: 0.0
            };
        }

        /**
         * Initialize Osteichthyes swim bladder, bony operculum, lepidotrichia fin rays, and ossified skeleton on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Pelagic/demersal nekton, pursuit predators, or organisms with teleost/osteichthyan affinity
            const isCompetent = Boolean(org.hasOsteichthyesTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "bony_fish" || org.niche === "teleost" || org.niche === "ray_finned" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.35) ||
                  (org.dna && (org.dna.speed || 0) >= 0.85) ||
                  (org.dna && ((org.dna.osteichthyesAffinity || 0) > 0.20 || (org.dna.swimBladderAffinity || 0) > 0.20 || (org.dna.boneAffinity || 0) > 0.20))));

            if (typeof org.hasOsteichthyesTrait === "undefined") {
                org.hasOsteichthyesTrait = isCompetent;
            }

            if (!org.hasOsteichthyesTrait) {
                org.isOsteichthyes = false;
                org.swimBladderVolume = 0.0;
                org.targetHydrostaticDepth = 0.0;
                org.gasGlandSecretionRate = 0.0;
                org.ovalWindowAbsorptionRate = 0.0;
                org.neutralBuoyancyHoverState = false;
                org.buoyancyHoverTimer = 0.0;
                org.opercularVentilationRate = 0.0;
                org.dualPumpEfficiency = 0.0;
                org.buccalPressureDelta = 0.0;
                org.motionlessBreathingActive = false;
                org.finRayCount = 0;
                org.finRayFlexibility = 0.0;
                org.hoverManeuverTorque = 1.0;
                org.endochondralBoneDensity = 0.0;
                org.skeletalRigidityLeverage = 1.0;
                org.opercularPhase = 0.0;
                org.finRayWavePhase = 0.0;
                org.swimBladderIndex = 0.0;
                org.opercularVentilationIndex = 0.0;
                return;
            }

            org.isOsteichthyes = true;

            // 1. Swim Bladder Hydrostatic System
            if (typeof org.swimBladderVolume === "undefined") {
                org.swimBladderVolume = 0.65 + Math.random() * 0.45; // [0.40 - 1.20]
            }
            if (typeof org.targetHydrostaticDepth === "undefined") {
                org.targetHydrostaticDepth = (typeof org.y === "number") ? org.y : 330.0;
            }
            if (typeof org.gasGlandSecretionRate === "undefined") {
                org.gasGlandSecretionRate = 0.06 + Math.random() * 0.16; // [0.05 - 0.25]
            }
            if (typeof org.ovalWindowAbsorptionRate === "undefined") {
                org.ovalWindowAbsorptionRate = 0.04 + Math.random() * 0.12; // [0.03 - 0.18]
            }
            if (typeof org.neutralBuoyancyHoverState === "undefined") {
                org.neutralBuoyancyHoverState = false;
            }
            if (typeof org.buoyancyHoverTimer === "undefined") {
                org.buoyancyHoverTimer = 0.0;
            }

            // 2. Bony Operculum Dual-Pump Respiration
            if (typeof org.opercularVentilationRate === "undefined") {
                org.opercularVentilationRate = 0.45 + Math.random() * 0.45; // [0.30 - 0.95]
            }
            if (typeof org.dualPumpEfficiency === "undefined") {
                org.dualPumpEfficiency = 0.60 + Math.random() * 0.35; // [0.50 - 0.99]
            }
            if (typeof org.buccalPressureDelta === "undefined") {
                org.buccalPressureDelta = 0.50 + Math.random() * 0.60; // [0.40 - 1.20 kPa]
            }
            if (typeof org.motionlessBreathingActive === "undefined") {
                org.motionlessBreathingActive = false;
            }
            if (typeof org.opercularPhase === "undefined") {
                org.opercularPhase = Math.random() * Math.PI * 2;
            }

            // 3. Lepidotrichia Articulated Fin Rays
            if (typeof org.finRayCount === "undefined") {
                org.finRayCount = Math.floor(10 + Math.random() * 12); // [8 - 24 rays]
            }
            if (typeof org.finRayFlexibility === "undefined") {
                org.finRayFlexibility = 0.55 + Math.random() * 0.36; // [0.45 - 0.95]
            }
            if (typeof org.hoverManeuverTorque === "undefined") {
                org.hoverManeuverTorque = 1.40 + Math.random() * 0.60; // [1.30 - 2.10x]
            }
            if (typeof org.finRayWavePhase === "undefined") {
                org.finRayWavePhase = Math.random() * Math.PI * 2;
            }

            // 4. Endochondral Ossified Skeleton
            if (typeof org.endochondralBoneDensity === "undefined") {
                org.endochondralBoneDensity = 0.60 + Math.random() * 0.36; // [0.55 - 0.99]
            }
            if (typeof org.skeletalRigidityLeverage === "undefined") {
                org.skeletalRigidityLeverage = 1.50 + Math.random() * 0.60; // [1.40 - 2.20x]
            }

            // 5. Telemetry Channels
            if (typeof org.swimBladderIndex === "undefined") {
                org.swimBladderIndex = 0.0; // 109th Channel % SBI
            }
            if (typeof org.opercularVentilationIndex === "undefined") {
                org.opercularVentilationIndex = 0.0; // 110th Channel % OVR
            }
        }

        /**
         * Perform precision micro-maneuver using articulated lepidotrichia fin rays.
         * @param {Object} org - Osteichthyes organism.
         * @param {number} angleOffset - Desired orientation angle delta.
         */
        performFinRayManeuver(org, angleOffset) {
            if (!org || !org.isOsteichthyes) return;

            this.metrics.finRayMicroManeuvers++;
            const torque = org.hoverManeuverTorque || 1.6;
            const flex = org.finRayFlexibility || 0.7;

            // Precision angular impulse without brute-force forward surge
            if (typeof org.angle === "number") {
                org.angle += angleOffset * torque * 0.35;
            }
            // Gentle stabilizing drag opposing drift
            org.vx = (org.vx || 0) * (1.0 - flex * 0.08);
            org.vy = (org.vy || 0) * (1.0 - flex * 0.08);
            org.finRayWavePhase = (org.finRayWavePhase + 0.65) % (Math.PI * 2);
        }

        /**
         * Update Osteichthyes swim bladder kinematics, opercular dual pump, fin rays, and 109th/110th channels.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isOsteichthyes === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isOsteichthyes) return;

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const currentY = (typeof org.y === "number") ? org.y : height * 0.5;

            // 1. Hydrostatic Swim Bladder Depth Regulation
            // Target depth slowly tracks current comfort depth or resource stratum
            const depthError = currentY - (org.targetHydrostaticDepth || currentY);

            if (depthError > 15.0) {
                // Too deep (sinking): Gas gland secretes O2/N2 gas into bladder to increase buoyancy
                const gasInflux = (org.gasGlandSecretionRate || 0.12) * dt * 0.8;
                org.swimBladderVolume = Math.min(1.20, (org.swimBladderVolume || 1.0) + gasInflux);
                this.metrics.gasGlandSecretionEvents++;
                // Upward buoyant lift restoring neutral buoyancy
                org.vy = (org.vy || 0) - 0.08 * dt * 60.0;
            } else if (depthError < -15.0) {
                // Too shallow (floating upward): Oval window vascular resorption removes gas to descend
                const gasEfflux = (org.ovalWindowAbsorptionRate || 0.08) * dt * 0.8;
                org.swimBladderVolume = Math.max(0.40, (org.swimBladderVolume || 1.0) - gasEfflux);
                this.metrics.ovalWindowResorptionEvents++;
                // Downward negative settling restoring target depth
                org.vy = (org.vy || 0) + 0.06 * dt * 60.0;
            } else {
                // Within neutral buoyancy equilibrium zone
                const gasDrift = ((org.targetHydrostaticDepth - currentY) * 0.001);
                org.swimBladderVolume = Math.max(0.40, Math.min(1.20, (org.swimBladderVolume || 1.0) + gasDrift * dt));
            }

            // Neutral Buoyancy Hover State Evaluation:
            // When fish is near its target depth and moving with low velocity, it enters zero-energy hovering!
            const isHovering = Math.abs(depthError) <= 22.0 && speed < 0.65;
            org.neutralBuoyancyHoverState = isHovering;

            if (isHovering) {
                org.buoyancyHoverTimer = (org.buoyancyHoverTimer || 0.0) + dt;
                this.metrics.neutralBuoyancyHoverEvents++;

                // Hydrostatic Hover Energy Conservation:
                // Saves 65% metabolic energy compared to non-stop negative buoyancy sinking!
                const energySavings = 0.024 * dt;
                if (typeof org.energy === "number" && org.energy < 220.0) {
                    org.energy += energySavings;
                }
                this.metrics.cumulativeHoverEnergySaved += energySavings;

                // Micro-damping of unwanted vertical drift
                org.vy = (org.vy || 0) * 0.94;
            } else {
                org.buoyancyHoverTimer = Math.max(0.0, (org.buoyancyHoverTimer || 0.0) - dt * 1.5);
            }

            // 2. Bony Operculum Dual-Pump Respiration Mode:
            // Rhythmic cycle of buccal expansion (intake) and opercular flap expansion (gill chamber suction)
            const opercularFreq = (org.opercularVentilationRate || 0.65) * Math.PI * 2 * 1.8;
            org.opercularPhase = (org.opercularPhase + opercularFreq * dt) % (Math.PI * 2);

            // Motionless Breathing:
            // Unlike sharks which must swim to breathe (ram ventilation), bony fish can breathe while stationary!
            if (speed < 0.40) {
                org.motionlessBreathingActive = true;
                this.metrics.motionlessBreathingEvents++;

                // Dual-pump efficiency maintains continuous oxygenation
                const dualPumpBonus = (org.dualPumpEfficiency || 0.78) * (org.buccalPressureDelta || 0.75) * 0.018 * dt;
                if (typeof org.energy === "number" && org.energy < 215.0) {
                    org.energy += dualPumpBonus;
                }
            } else {
                org.motionlessBreathingActive = false;
            }

            // 3. Lepidotrichia Fin Ray Undulation & Skeletal Leverage
            const rayFreq = (org.finRayFlexibility || 0.7) * Math.PI * 2 * 2.2;
            org.finRayWavePhase = (org.finRayWavePhase + rayFreq * dt) % (Math.PI * 2);

            // Skeletal rigidity leverage amplifies muscle stroke efficiency
            const rigidityBonus = 1.0 + ((org.skeletalRigidityLeverage || 1.6) - 1.0) * 0.12;
            if (speed > 0.4) {
                org.vx = (org.vx || 0) * (1.0 + (rigidityBonus - 1.0) * 0.008);
                org.vy = (org.vy || 0) * (1.0 + (rigidityBonus - 1.0) * 0.008);
            }

            // Occasional micro-maneuver when hovering or orienting
            if (isHovering && Math.random() < 0.015) {
                this.performFinRayManeuver(org, (Math.random() - 0.5) * 0.4);
            }

            // Biomass accrual
            this.metrics.cumulativeBonyBiomass += (org.endochondralBoneDensity || 0.75) * 0.002 * dt;

            // 4. 109th Telemetry Channel: Swim Bladder Hydrostatic Index (% SBI)
            // Formulation:
            // - Bladder Volume Stability (%35 weight): [0.40 - 1.20, optimal around 0.85-1.05]
            // - Neutral Buoyancy Hover State (%30 weight): hover ratio [0.0 - 1.0]
            // - Gas Gland Secretion Activity (%20 weight): [0.05 - 0.25]
            // - Hydrostatic Depth Compensation (%15 weight): depth accuracy [0.0 - 1.0]
            const optimalVol = 0.95;
            const volDelta = Math.abs((org.swimBladderVolume || 1.0) - optimalVol);
            const volScore = Math.max(0.0, 1.0 - (volDelta / 0.55));
            const hoverScore = org.neutralBuoyancyHoverState ? 1.0 : Math.max(0.0, 1.0 - Math.abs(depthError) / 50.0);
            const gasGlandScore = Math.min(1.0, Math.max(0.0, ((org.gasGlandSecretionRate || 0.12) - 0.05) / 0.20));
            const depthScore = Math.max(0.0, 1.0 - Math.min(1.0, Math.abs(depthError) / 60.0));

            const rawSBI = (volScore * 0.35 + hoverScore * 0.30 + gasGlandScore * 0.20 + depthScore * 0.15) * 100.0;
            org.swimBladderIndex = Math.min(100.0, Math.max(0.0, rawSBI));

            // 5. 110th Telemetry Channel: Opercular Ventilation Rate & Dual-Pump Index (% OVR)
            // Formulation:
            // - Opercular Rhythm Rate (%35 weight): [0.30 - 0.95]
            // - Dual-Pump Suction Efficiency (%30 weight): [0.50 - 0.99]
            // - Motionless Breathing Capability (%20 weight): [active = 1.0, swimming = 0.75]
            // - Buccal Pressure Gradient (%15 weight): [0.40 - 1.20 kPa]
            const opercularScore = Math.min(1.0, Math.max(0.0, ((org.opercularVentilationRate || 0.65) - 0.30) / 0.65));
            const pumpScore = Math.min(1.0, Math.max(0.0, ((org.dualPumpEfficiency || 0.78) - 0.50) / 0.49));
            const breathScore = org.motionlessBreathingActive ? 1.0 : 0.75;
            const pressureScore = Math.min(1.0, Math.max(0.0, ((org.buccalPressureDelta || 0.75) - 0.40) / 0.80));

            const rawOVR = (opercularScore * 0.35 + pumpScore * 0.30 + breathScore * 0.20 + pressureScore * 0.15) * 100.0;
            org.opercularVentilationIndex = Math.min(100.0, Math.max(0.0, rawOVR));
        }

        /**
         * Batch update all organisms and compute aggregate Osteichthyes metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let ostCount = 0;
            let sumSBI = 0.0;
            let sumOVR = 0.0;
            let sumVolume = 0.0;
            let sumGasGland = 0.0;
            let sumHover = 0.0;
            let sumOpercular = 0.0;
            let sumDualPump = 0.0;
            let sumRays = 0.0;
            let sumFlex = 0.0;
            let sumBone = 0.0;
            let sumLeverage = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isOsteichthyes) {
                    ostCount++;
                    sumSBI += org.swimBladderIndex || 0.0;
                    sumOVR += org.opercularVentilationIndex || 0.0;
                    sumVolume += org.swimBladderVolume || 1.0;
                    sumGasGland += org.gasGlandSecretionRate || 0.12;
                    sumHover += org.neutralBuoyancyHoverState ? 1.0 : 0.0;
                    sumOpercular += org.opercularVentilationRate || 0.65;
                    sumDualPump += org.dualPumpEfficiency || 0.78;
                    sumRays += org.finRayCount || 16;
                    sumFlex += org.finRayFlexibility || 0.72;
                    sumBone += org.endochondralBoneDensity || 0.76;
                    sumLeverage += org.skeletalRigidityLeverage || 1.75;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalOsteichthyesOrganisms = ostCount;
            this.metrics.osteichthyesPrevalence = liveCount > 0 ? (ostCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanSwimBladderIndex = ostCount > 0 ? (sumSBI / ostCount) : 0.0;
            this.metrics.meanOpercularVentilationRate = ostCount > 0 ? (sumOVR / ostCount) : 0.0;
            this.metrics.meanSwimBladderVolume = ostCount > 0 ? (sumVolume / ostCount) : 1.0;
            this.metrics.meanGasGlandActivity = ostCount > 0 ? (sumGasGland / ostCount) : 0.12;
            this.metrics.meanNeutralBuoyancyHoverRatio = ostCount > 0 ? (sumHover / ostCount) : 0.0;
            this.metrics.meanOpercularRate = ostCount > 0 ? (sumOpercular / ostCount) : 0.65;
            this.metrics.meanDualPumpEfficiency = ostCount > 0 ? (sumDualPump / ostCount) : 0.78;
            this.metrics.meanFinRayCount = ostCount > 0 ? (sumRays / ostCount) : 16.0;
            this.metrics.meanFinRayFlexibility = ostCount > 0 ? (sumFlex / ostCount) : 0.72;
            this.metrics.meanEndochondralBoneDensity = ostCount > 0 ? (sumBone / ostCount) : 0.76;
            this.metrics.meanSkeletalRigidityLeverage = ostCount > 0 ? (sumLeverage / ostCount) : 1.75;
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
         * @returns {Object} Comprehensive Osteichthyes metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OsteichthyesSwimBladderManager;
    }
    if (typeof global !== "undefined") {
        global.OsteichthyesSwimBladderManager = OsteichthyesSwimBladderManager;
        global.osteichthyesSwimBladderManager = new OsteichthyesSwimBladderManager();
    }
})(typeof window !== "undefined" ? window : global);
