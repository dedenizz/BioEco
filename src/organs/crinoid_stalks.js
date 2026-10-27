// BioEcosystem - Benthic Crinoid Stalks & Rheophilic Calyx Elevation Kinetics
// Module: src/organs/crinoid_stalks.js
// Version: 7.07.0 (Hour 427 - System Agent: Overturning Torque, Calcite Tax, MCT Fatigue & Autotomy)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CrinoidStalkManager
     * High-fidelity biological simulation of stalked crinoid echinoderm kinematics:
     * - Articulated columnals: Biomineralized calcite disks forming a flexible, elevated stalk
     * - Mutable Collagenous Tissue (MCT): Catch-collagen passive stiffening locking stalk without muscular ATP
     * - Calyx Elevation Advantage (CEA): Lifting suspension crown out of boundary shear into laminar current
     * - Holdfast Cirri Anchoring: Articulated basal claws counteracting overturning hydrodynamic torque
     * - Overturning Torque & Detachment: Dynamic lever arm torque and holdfast tension limits
     * - Calcite Maintenance Overhead: Biomineral metabolic cost and starvation skeletal resorption
     * - Collagen Fatigue & Column Autotomy: Catch-collagen fatigue damping and emergency syzygy shedding
     * - Rheophilic Articulation: Parabolic crown curvature oriented against prevailing fluid streamlines
     * - Foundation calculations for 81st Channel (% CEA) and 82nd Channel (% RAR - Rheophilic Articulation Ratio)
     */
    class CrinoidStalkManager {
        constructor() {
            this.benthicFloorY = 480.0;
            this.bblBoundaryY = 435.0;
            this.minStalkHeight = 35.0;
            this.maxStalkHeight = 115.0;
            this.diskThickness = 4.2;
            this.laminarVelocityGain = 0.65;
            this.calciteMetabolicCost = 0.008;
            this.overturningTorqueLimit = 0.85;

            this.metrics = {
                totalLiveCells: 0,
                totalStalkedCrinoids: 0,
                crinoidPrevalence: 0.0,
                meanStalkHeight: 0.0,
                meanColumnalCount: 0.0,
                meanCalyxElevation: 0.0,
                meanCollagenStiffness: 0.0,
                meanCollagenFatigue: 0.0,
                meanHoldfastGrip: 0.0,
                meanHoldfastTension: 0.0,
                meanElevationAdvantage: 0.0,
                meanArticulationRatio: 0.0,
                activeElevatedFeeders: 0,
                stalkLockEvents: 0,
                deflectionAngleMean: 0.0,
                assimilatedHighVelocityCarbon: 0.0,
                overturningDeflections: 0,
                holdfastDetachmentEvents: 0,
                calciteResorptionEvents: 0,
                autotomyEvents: 0
            };
        }

        initOrganism(org) {
            if (!org) return;

            const isDeepBenthic = (org.y >= 360.0);
            const geneticTendency = (org.dna && org.dna.benthicGrip > 0.45) ||
                                   (org.filterFeedingAdapted === true) ||
                                   (org.cellType === "herbivore" && isDeepBenthic);

            if (typeof org.isCrinoidStalked === "undefined") {
                org.isCrinoidStalked = isDeepBenthic && geneticTendency;
            }

            if (typeof org.stalkHeight === "undefined") {
                org.stalkHeight = org.isCrinoidStalked ? (42.0 + Math.random() * 55.0) : 0.0;
            }

            if (typeof org.calciteColumnalCount === "undefined") {
                org.calciteColumnalCount = org.isCrinoidStalked ?
                    Math.max(6, Math.floor(org.stalkHeight / this.diskThickness)) : 0;
            }

            if (typeof org.mutableCollagenStiffness === "undefined") {
                org.mutableCollagenStiffness = org.isCrinoidStalked ? 0.68 : 0.0;
            }

            if (typeof org.collagenFatigueFactor === "undefined") {
                org.collagenFatigueFactor = 0.0;
            }

            if (typeof org.holdfastCirriCount === "undefined") {
                org.holdfastCirriCount = org.isCrinoidStalked ? (5 + Math.floor(Math.random() * 5)) : 0;
            }

            if (typeof org.holdfastCirriGrip === "undefined") {
                org.holdfastCirriGrip = org.isCrinoidStalked ? (0.65 + Math.random() * 0.32) : 0.0;
            }

            if (typeof org.isHoldfastDetached === "undefined") {
                org.isHoldfastDetached = false;
            }

            if (typeof org.reanchoringTimer === "undefined") {
                org.reanchoringTimer = 0;
            }

            if (typeof org.stalkDeflectionAngle === "undefined") {
                org.stalkDeflectionAngle = 0.0;
            }

            if (typeof org.isStalkLocked === "undefined") {
                org.isStalkLocked = false;
            }

            if (typeof org.stalkBrittleness === "undefined") {
                org.stalkBrittleness = 0.0;
            }

            if (typeof org.autotomyCooldown === "undefined") {
                org.autotomyCooldown = 0;
            }

            if (typeof org.autotomyActive === "undefined") {
                org.autotomyActive = false;
            }

            if (typeof org.calyxElevationAdvantage === "undefined") {
                org.calyxElevationAdvantage = 0.0;
            }

            if (typeof org.rheophilicArticulationRatio === "undefined") {
                org.rheophilicArticulationRatio = 0.0;
            }

            if (typeof org.calciteMineralInvestment === "undefined") {
                org.calciteMineralInvestment = org.calciteColumnalCount * 0.12;
            }
        }

        updateOrganism(org, dt, currentVelocity, currentAngle) {
            if (!org || !org.alive) return;
            this.initOrganism(org);

            if (!org.isCrinoidStalked) {
                org.calyxElevationAdvantage = 0.0;
                org.rheophilicArticulationRatio = 0.0;
                return;
            }

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const flowSpeed = (typeof currentVelocity === "number") ? currentVelocity : 0.45;
            const flowAngle = (typeof currentAngle === "number") ? currentAngle : 0.0;

            if (org.autotomyCooldown > 0) {
                org.autotomyCooldown--;
                if (org.autotomyCooldown === 0) org.autotomyActive = false;
            }

            // 1. Column Autotomy Regeneration & Stalk Height Clamping
            if (!org.autotomyActive && org.stalkHeight < 40.0) {
                org.stalkHeight += 0.08 * effDt * 60.0; // Gradual post-autotomy stalk regrowth
            }
            org.stalkHeight = Math.max(this.minStalkHeight * 0.4, Math.min(this.maxStalkHeight, org.stalkHeight));
            org.calciteColumnalCount = Math.max(2, Math.floor(org.stalkHeight / this.diskThickness));

            // 2. Overturning Hydrodynamic Torque & Lever Arm Dynamics
            const dynamicLeverArm = org.stalkHeight * Math.cos(org.stalkDeflectionAngle);
            const overturningTorque = (dynamicLeverArm / 70.0) * (flowSpeed * flowSpeed * 1.8 + 0.1);
            const anchorResistance = Math.max(0.2, org.holdfastCirriGrip * (org.holdfastCirriCount / 6.0));
            const holdfastTension = overturningTorque / anchorResistance;

            const baseTensionLimit = 1.35 + (org.dna && org.dna.benthicGrip ? org.dna.benthicGrip * 0.8 : 0.4);

            // Detachment check under catastrophic torque
            if (holdfastTension > baseTensionLimit && !org.isHoldfastDetached) {
                org.isHoldfastDetached = true;
                org.reanchoringTimer = 60 + Math.floor(Math.random() * 80);
                this.metrics.holdfastDetachmentEvents++;
            }

            if (org.isHoldfastDetached) {
                org.reanchoringTimer--;
                org.vx += (Math.cos(flowAngle) * flowSpeed * 0.8 - org.vx) * 0.06;
                org.vy += (Math.sin(flowAngle) * flowSpeed * 0.8 - org.vy) * 0.06;
                if (org.reanchoringTimer <= 0 && org.y >= 380.0) {
                    org.isHoldfastDetached = false;
                    org.holdfastCirriGrip = Math.max(0.4, org.holdfastCirriGrip * 0.85); // Temporary adhesion fatigue
                }
            }

            // 3. Catch-Collagen Passive Stiffening & Fatigue Dynamics
            if (overturningTorque > 0.40 && anchorResistance > 0.45 && !org.isHoldfastDetached) {
                org.isStalkLocked = true;
                org.mutableCollagenStiffness = Math.min(0.98, org.mutableCollagenStiffness + 0.04 * effDt * 60.0);
                org.collagenFatigueFactor = Math.min(1.0, org.collagenFatigueFactor + 0.012 * effDt * 60.0);
                this.metrics.stalkLockEvents++;
            } else {
                org.isStalkLocked = false;
                org.mutableCollagenStiffness = Math.max(0.38, org.mutableCollagenStiffness - 0.02 * effDt * 60.0);
                org.collagenFatigueFactor = Math.max(0.0, org.collagenFatigueFactor - 0.025 * effDt * 60.0);
            }

            // 4. Stalk Autotomy Reflex under Extreme Fatigue or Fracture Strain
            if ((org.collagenFatigueFactor > 0.85 || org.stalkBrittleness > 0.65) && overturningTorque > 1.15 && !org.autotomyActive) {
                org.stalkHeight = Math.max(14.0, org.stalkHeight * 0.38);
                org.calciteColumnalCount = Math.max(3, Math.floor(org.stalkHeight / this.diskThickness));
                org.autotomyActive = true;
                org.autotomyCooldown = 140;
                org.collagenFatigueFactor = 0.0;
                org.isStalkLocked = false;
                this.metrics.autotomyEvents++;
            }

            // 5. Deflection angle bending under flow
            const fatiguePenalty = 1.0 + (org.collagenFatigueFactor * 0.45);
            const targetDeflection = (Math.sin(flowAngle) * overturningTorque * 0.42 * fatiguePenalty) /
                                    (org.mutableCollagenStiffness * anchorResistance + 0.15);
            org.stalkDeflectionAngle += (targetDeflection - org.stalkDeflectionAngle) * 0.08;

            if (Math.abs(org.stalkDeflectionAngle) > this.overturningTorqueLimit) {
                this.metrics.overturningDeflections++;
                org.stalkDeflectionAngle = Math.sign(org.stalkDeflectionAngle) * this.overturningTorqueLimit;
            }

            // 6. Calyx Elevation Advantage (CEA)
            const calyxY = org.y - org.stalkHeight * Math.cos(org.stalkDeflectionAngle);
            const boundaryLayerClearance = Math.max(0.0, this.bblBoundaryY - calyxY);
            const elevationFactor = Math.min(1.0, boundaryLayerClearance / 65.0);
            const laminarBonus = elevationFactor * this.laminarVelocityGain;

            org.calyxElevationAdvantage = Math.min(1.0, 0.25 + elevationFactor * 0.75);

            // 7. Rheophilic Articulation Ratio (RAR) - Foundation for 82nd Channel
            const alignment = Math.cos(org.stalkDeflectionAngle - (flowAngle * 0.5));
            const compliance = 1.0 - Math.min(1.0, Math.abs(org.stalkDeflectionAngle) / this.overturningTorqueLimit);
            const anchorStability = Math.max(0.0, 1.0 - Math.min(1.0, holdfastTension / baseTensionLimit));
            const stiffnessHealth = org.mutableCollagenStiffness * (1.0 - org.collagenFatigueFactor * 0.6);

            org.rheophilicArticulationRatio = Math.max(0.0, Math.min(1.0,
                (alignment * 0.30) + (compliance * 0.25) + (anchorStability * 0.25) + (stiffnessHealth * 0.20)
            ));

            // 8. Nutrient capture bonus & Calcite maintenance tax
            const assimilationYield = laminarBonus * 0.038 * effDt * 60.0;
            if (org.energy && org.alive) {
                org.energy = Math.min(100.0, org.energy + assimilationYield);
                this.metrics.assimilatedHighVelocityCarbon += assimilationYield;

                // Calcite biomineral maintenance tax
                const maintenanceTax = this.calciteMetabolicCost * (org.calciteColumnalCount / 14.0) * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - maintenanceTax);

                // Starvation skeletal resorption
                if (org.energy < 15.0) {
                    org.calciteMineralInvestment = Math.max(0.5, org.calciteMineralInvestment - 0.04 * effDt * 60.0);
                    org.stalkBrittleness = Math.min(1.0, (15.0 - org.energy) / 15.0);
                    this.metrics.calciteResorptionEvents++;
                } else {
                    org.stalkBrittleness = Math.max(0.0, org.stalkBrittleness - 0.02 * effDt * 60.0);
                }
            }
        }

        updateAll(organisms, dt, globalFlow) {
            if (!Array.isArray(organisms)) return;

            const effDt = (typeof dt === "number" && dt > 0) ? dt : 0.016;
            const flowSpeed = (globalFlow && typeof globalFlow.velocity === "number") ?
                globalFlow.velocity : 0.48;
            const flowAngle = (globalFlow && typeof globalFlow.angle === "number") ?
                globalFlow.angle : 0.08;

            let liveCount = 0;
            let stalkedCount = 0;
            let sumHeight = 0.0;
            let sumColumnals = 0;
            let sumStiffness = 0.0;
            let sumFatigue = 0.0;
            let sumGrip = 0.0;
            let sumTension = 0.0;
            let sumCEA = 0.0;
            let sumRAR = 0.0;
            let sumDeflection = 0.0;
            let activeFeeders = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, flowSpeed, flowAngle);

                if (org.isCrinoidStalked) {
                    stalkedCount++;
                    sumHeight += org.stalkHeight;
                    sumColumnals += org.calciteColumnalCount;
                    sumStiffness += org.mutableCollagenStiffness;
                    sumFatigue += org.collagenFatigueFactor;
                    sumGrip += org.holdfastCirriGrip;
                    sumCEA += org.calyxElevationAdvantage;
                    sumRAR += org.rheophilicArticulationRatio;
                    sumDeflection += Math.abs(org.stalkDeflectionAngle);

                    const dynamicLever = org.stalkHeight * Math.cos(org.stalkDeflectionAngle);
                    const torque = (dynamicLever / 70.0) * (flowSpeed * flowSpeed * 1.8 + 0.1);
                    const res = Math.max(0.2, org.holdfastCirriGrip * (org.holdfastCirriCount / 6.0));
                    sumTension += (torque / res);

                    if (org.calyxElevationAdvantage > 0.50) {
                        activeFeeders++;
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalStalkedCrinoids = stalkedCount;
            this.metrics.crinoidPrevalence = liveCount > 0 ? (stalkedCount / liveCount) : 0.0;
            this.metrics.meanStalkHeight = stalkedCount > 0 ? (sumHeight / stalkedCount) : 0.0;
            this.metrics.meanColumnalCount = stalkedCount > 0 ? (sumColumnals / stalkedCount) : 0.0;
            this.metrics.meanCollagenStiffness = stalkedCount > 0 ? (sumStiffness / stalkedCount) : 0.0;
            this.metrics.meanCollagenFatigue = stalkedCount > 0 ? (sumFatigue / stalkedCount) : 0.0;
            this.metrics.meanHoldfastGrip = stalkedCount > 0 ? (sumGrip / stalkedCount) : 0.0;
            this.metrics.meanHoldfastTension = stalkedCount > 0 ? (sumTension / stalkedCount) : 0.0;
            this.metrics.meanElevationAdvantage = stalkedCount > 0 ? (sumCEA / stalkedCount) : 0.0;
            this.metrics.meanArticulationRatio = stalkedCount > 0 ? (sumRAR / stalkedCount) : 0.0;
            this.metrics.deflectionAngleMean = stalkedCount > 0 ? (sumDeflection / stalkedCount) : 0.0;
            this.metrics.activeElevatedFeeders = activeFeeders;
        }

        step(organisms, tick) {
            this.updateAll(organisms, 0.016, null);
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CrinoidStalkManager;
    }
    if (typeof global !== "undefined") {
        global.CrinoidStalkManager = CrinoidStalkManager;
        global.crinoidStalkManager = new CrinoidStalkManager();
    }
})(typeof window !== "undefined" ? window : global);
