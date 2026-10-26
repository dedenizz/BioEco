// BioEcosystem - Benthic Crinoid Stalks & Rheophilic Calyx Elevation Kinetics
// Module: src/organs/crinoid_stalks.js
// Version: 7.02.0 (Hour 422 - System Agent: Calcite Columnals, Hydrodynamic Articulation & Calyx Elevation)
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
     * - Rheophilic Articulation: Parabolic crown curvature oriented against prevailing fluid streamlines
     * - Precursor calculations for 81st Channel (% CEA) and 82nd Channel (% RAR - Rheophilic Articulation Ratio)
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
                meanHoldfastGrip: 0.0,
                meanElevationAdvantage: 0.0,
                meanArticulationRatio: 0.0,
                activeElevatedFeeders: 0,
                stalkLockEvents: 0,
                deflectionAngleMean: 0.0,
                assimilatedHighVelocityCarbon: 0.0,
                overturningDeflections: 0
            };
        }

        initOrganism(org) {
            if (!org) return;

            const isDeepBenthic = (org.y >= 360.0);
            const geneticTendency = (org.genes && org.genes.benthicGrip > 0.45) ||
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

            if (typeof org.holdfastCirriCount === "undefined") {
                org.holdfastCirriCount = org.isCrinoidStalked ? (5 + Math.floor(Math.random() * 5)) : 0;
            }

            if (typeof org.holdfastCirriGrip === "undefined") {
                org.holdfastCirriGrip = org.isCrinoidStalked ? (0.65 + Math.random() * 0.32) : 0.0;
            }

            if (typeof org.stalkDeflectionAngle === "undefined") {
                org.stalkDeflectionAngle = 0.0;
            }

            if (typeof org.isStalkLocked === "undefined") {
                org.isStalkLocked = false;
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

            // Maintain stalk height within physiological biomechanical constraints
            org.stalkHeight = Math.max(this.minStalkHeight, Math.min(this.maxStalkHeight, org.stalkHeight));
            org.calciteColumnalCount = Math.max(6, Math.floor(org.stalkHeight / this.diskThickness));

            // Hydrodynamic drag induces overturning torque on elevated calyx
            const torqueMoment = (org.stalkHeight / 80.0) * flowSpeed;
            const anchorStability = (org.holdfastCirriGrip * (org.holdfastCirriCount / 8.0));

            // Catch-collagen (Mutable Collagenous Tissue) locking mechanics
            if (torqueMoment > 0.40 && anchorStability > 0.50) {
                org.isStalkLocked = true;
                org.mutableCollagenStiffness = Math.min(0.98, org.mutableCollagenStiffness + 0.04 * effDt * 60.0);
                this.metrics.stalkLockEvents++;
            } else {
                org.isStalkLocked = false;
                org.mutableCollagenStiffness = Math.max(0.40, org.mutableCollagenStiffness - 0.02 * effDt * 60.0);
            }

            // Deflection angle bending under flow
            const targetDeflection = (Math.sin(flowAngle) * torqueMoment * 0.42) /
                                    (org.mutableCollagenStiffness * anchorStability + 0.15);
            org.stalkDeflectionAngle += (targetDeflection - org.stalkDeflectionAngle) * 0.08;

            if (Math.abs(org.stalkDeflectionAngle) > this.overturningTorqueLimit) {
                this.metrics.overturningDeflections++;
                org.stalkDeflectionAngle = Math.sign(org.stalkDeflectionAngle) * this.overturningTorqueLimit;
            }

            // Calyx Elevation Advantage (CEA): elevation above boundary layer into laminar stream
            const calyxY = org.y - org.stalkHeight * Math.cos(org.stalkDeflectionAngle);
            const boundaryLayerClearance = Math.max(0.0, this.bblBoundaryY - calyxY);
            const elevationFactor = Math.min(1.0, boundaryLayerClearance / 65.0);
            const laminarBonus = elevationFactor * this.laminarVelocityGain;

            org.calyxElevationAdvantage = Math.min(1.0, 0.25 + elevationFactor * 0.75);

            // Rheophilic Articulation Ratio (RAR): parabolic alignment with current vs drag
            const alignment = Math.cos(org.stalkDeflectionAngle - (flowAngle * 0.5));
            const stabilityComponent = Math.min(1.0, anchorStability);
            const stiffnessComponent = org.mutableCollagenStiffness;
            org.rheophilicArticulationRatio = Math.max(0.0, Math.min(1.0,
                (alignment * 0.40) + (stabilityComponent * 0.35) + (stiffnessComponent * 0.25)
            ));

            // Nutrient capture bonus: elevated crown intercepts suspended seston particles
            const assimilationYield = laminarBonus * 0.038 * effDt * 60.0;
            if (org.energy && org.alive) {
                org.energy = Math.min(100.0, org.energy + assimilationYield);
                this.metrics.assimilatedHighVelocityCarbon += assimilationYield;

                // Calcite biomineral maintenance tax (passive skeletal matrix)
                const maintenanceTax = this.calciteMetabolicCost * (org.calciteColumnalCount / 16.0) * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - maintenanceTax);
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
            let sumGrip = 0.0;
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
                    sumGrip += org.holdfastCirriGrip;
                    sumCEA += org.calyxElevationAdvantage;
                    sumRAR += org.rheophilicArticulationRatio;
                    sumDeflection += Math.abs(org.stalkDeflectionAngle);

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
            this.metrics.meanHoldfastGrip = stalkedCount > 0 ? (sumGrip / stalkedCount) : 0.0;
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
