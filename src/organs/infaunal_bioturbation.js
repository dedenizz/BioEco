// BioEcosystem - Sub-Benthic Infauna, Bioturbation Flux & Redox Cycling
// Module: src/organs/infaunal_bioturbation.js
// Version: 6.87.0 (Hour 407 - System Agent: Compaction Torque, Hypoxia Fermentation & BMR Kinetics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * InfaunalBioturbationManager
     * High-fidelity biological simulation of sub-benthic sediment dynamics:
     * - Sub-benthic sediment penetration and 3D infaunal burrowing kinetics
     * - Exponential depth compaction resistance and mechanical torque compensation
     * - Downward expansion of the oxygen penetration depth (OPD) via biogenic aeration
     * - Anoxic fermentation buffer and emergency upward ventilation surges
     * - Chemoautotrophic sulfide oxidation across the oxic-anoxic redox boundary
     * - Biogenic mucus cohesion binding silt to mitigate turbidity choking
     * - Precursor calculations for 77th Channel (% BTI) and 78th Channel (% BMR)
     */
    class InfaunalBioturbationManager {
        constructor() {
            this.sedimentSurfaceY = 480.0;
            this.maxSedimentDepth = 60.0;
            this.baseSedimentCompaction = 0.65;
            this.baseOxygenPenetration = 8.5;
            this.sulfideConversionEfficiency = 0.82;
            this.porewaterReleaseRate = 0.045;

            this.metrics = {
                totalLiveCells: 0,
                totalInfaunalCells: 0,
                infaunalPrevalence: 0.0,
                meanBurrowingDepth: 0.0,
                meanBioturbationFlux: 0.0,
                meanCompactionResistance: 0.0,
                meanMucusLining: 0.0,
                meanSulfideYield: 0.0,
                meanPorewaterNutrientFlux: 0.0,
                meanOxygenPenetration: 8.5,
                meanBTIIndex: 0.0,
                meanBMRIndex: 0.0,
                meanFermentationReserve: 100.0,
                meanTurbidity: 0.0,
                activeTunnels: 0,
                ventilationSurgeCount: 0,
                compactionStallEvents: 0,
                recycledMineralPorewater: 0.0,
                chemoSulfideAtpProduced: 0.0,
                cumulativeAerationSteps: 0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            const dna = org.dna || {};
            const genes = dna.genes || {};

            const fossorialFactor = (genes.fossorialAdaptation || genes.benthicAffinity || 0.35);
            const metabolicEfficiency = (genes.metabolicEfficiency || 0.5);
            const resilienceFactor = (genes.membraneResilience || 0.4);

            org.subBenthicBurrowingDepth = 0.0;
            org.bioturbationFlux = 0.0;
            org.sedimentCompactionResistance = Math.min(1.0, Math.max(0.1, fossorialFactor * 1.25));
            org.compactionTorqueResistance = Math.min(1.0, Math.max(0.15, fossorialFactor * 1.35));
            org.mucusLiningIntegrity = Math.min(1.0, Math.max(0.15, resilienceFactor * 1.1));
            org.biogenicMucusCohesion = 0.15;
            org.sulfideOxidationYield = Math.min(1.0, Math.max(0.05, metabolicEfficiency * 0.95));
            org.nutrientPorewaterFlux = 0.0;
            org.bioturbationIndex = 0.0;
            org.mineralRecyclingIndex = 0.0;
            org.infaunalAdapted = fossorialFactor > 0.45;
            org.isSubBenthic = false;
            org.isHypoxicStressed = false;
            org.upwardVentilationSurge = false;
            org.tunnelAgeTicks = 0;
            org.torqueStallTimer = 0;
            org.anoxicFermentationBuffer = 100.0;
        }

        updateOrganism(org, dt, env) {
            if (!org || !org.isAlive) return;

            if (org.subBenthicBurrowingDepth === undefined) {
                InfaunalBioturbationManager.initOrganism(org);
            }

            const currentY = org.y !== undefined ? org.y : (org.pos ? org.pos.y : 300.0);
            const inSedimentZone = currentY >= this.sedimentSurfaceY;

            if (inSedimentZone && org.infaunalAdapted) {
                org.isSubBenthic = true;
                const rawDepth = currentY - this.sedimentSurfaceY;
                const depthRatio = Math.min(1.0, rawDepth / this.maxSedimentDepth);

                // Exponential sediment compaction friction with depth
                const depthFriction = Math.exp(depthRatio * 1.45) * this.baseSedimentCompaction * 0.45;
                const effectiveResistance = org.compactionTorqueResistance * 0.75 + org.mucusLiningIntegrity * 0.25;
                const netTorqueLoad = depthFriction * (1.0 - effectiveResistance);
                const resistanceScale = Math.max(0.18, 1.0 - netTorqueLoad);

                org.subBenthicBurrowingDepth = Math.min(this.maxSedimentDepth, rawDepth * resistanceScale);

                // Mechanical stall check under extreme sediment compaction
                if (netTorqueLoad > 0.72) {
                    org.torqueStallTimer = (org.torqueStallTimer || 0) + 1;
                    org.energy = Math.max(0.0, (org.energy || 50.0) - 0.025);
                    this.metrics.compactionStallEvents++;
                } else {
                    org.torqueStallTimer = Math.max(0, (org.torqueStallTimer || 0) - 1);
                }

                // Bioturbation excavation power
                const speed = org.speed || (org.vel ? Math.hypot(org.vel.x, org.vel.y) : 0.8);
                const excavationPower = org.sedimentCompactionResistance * (speed + 0.4);
                org.bioturbationFlux = Math.min(1.0, excavationPower * 0.48);

                // Mucus tunnel lining and biogenic particle cohesion
                if (org.bioturbationFlux > 0.22) {
                    org.tunnelAgeTicks = (org.tunnelAgeTicks || 0) + 1;
                    org.mucusLiningIntegrity = Math.min(1.0, org.mucusLiningIntegrity + 0.002);
                } else {
                    org.mucusLiningIntegrity = Math.max(0.05, org.mucusLiningIntegrity - 0.001);
                }
                org.biogenicMucusCohesion = org.mucusLiningIntegrity * 0.88;

                // Sulfide oxidation in redox interface
                const sulfideAvailability = Math.sin(depthRatio * Math.PI) * 1.4;
                const oxidationGain = org.sulfideOxidationYield * sulfideAvailability * this.sulfideConversionEfficiency * 0.035;
                org.energy = Math.min(org.maxEnergy || 200.0, (org.energy || 50.0) + oxidationGain);
                this.metrics.chemoSulfideAtpProduced += oxidationGain;

                // Anoxic Fermentation Buffer & Emergency Upward Ventilation Surge
                const currentOPD = this.metrics.meanOxygenPenetration || 8.5;
                if (org.subBenthicBurrowingDepth > currentOPD && sulfideAvailability < 0.25) {
                    org.anoxicFermentationBuffer = Math.max(0.0, org.anoxicFermentationBuffer - 0.28);
                    org.isHypoxicStressed = org.anoxicFermentationBuffer < 30.0;

                    if (org.anoxicFermentationBuffer <= 0.0) {
                        org.upwardVentilationSurge = true;
                        if (org.vel && typeof org.vel.y === "number") org.vel.y -= 1.6;
                        else if (typeof org.y === "number") org.y -= 3.5;
                        org.anoxicFermentationBuffer = 30.0;
                        this.metrics.ventilationSurgeCount++;
                    }
                } else {
                    org.anoxicFermentationBuffer = Math.min(100.0, org.anoxicFermentationBuffer + 0.65);
                    org.isHypoxicStressed = false;
                    org.upwardVentilationSurge = false;
                }

                // Porewater mineral diffusion flux
                const releasedMinerals = org.bioturbationFlux * this.porewaterReleaseRate * (1.0 + depthRatio * 0.5);
                org.nutrientPorewaterFlux = releasedMinerals;
                this.metrics.recycledMineralPorewater += releasedMinerals;

                // 77th Channel (% BTI)
                const normalizedDepth = org.subBenthicBurrowingDepth / this.maxSedimentDepth;
                org.bioturbationIndex = (
                    normalizedDepth * 0.35 +
                    org.bioturbationFlux * 0.30 +
                    org.mucusLiningIntegrity * 0.20 +
                    org.sulfideOxidationYield * 0.15
                );

                // 78th Channel Precursor (% BMR - Biogenic Mineral Recycling)
                org.mineralRecyclingIndex = (
                    Math.min(1.0, releasedMinerals * 15.0) * 0.35 +
                    org.sulfideOxidationYield * 0.30 +
                    org.biogenicMucusCohesion * 0.20 +
                    (org.anoxicFermentationBuffer / 100.0) * 0.15
                );
            } else {
                org.isSubBenthic = false;
                org.isHypoxicStressed = false;
                org.upwardVentilationSurge = false;
                org.subBenthicBurrowingDepth = Math.max(0.0, (org.subBenthicBurrowingDepth || 0.0) - 0.5);
                org.bioturbationFlux = Math.max(0.0, (org.bioturbationFlux || 0.0) - 0.05);
                org.nutrientPorewaterFlux = 0.0;
                org.anoxicFermentationBuffer = Math.min(100.0, (org.anoxicFermentationBuffer || 100.0) + 0.8);
                org.bioturbationIndex = org.subBenthicBurrowingDepth > 0 ? (org.subBenthicBurrowingDepth / this.maxSedimentDepth) * 0.2 : 0.0;
                org.mineralRecyclingIndex = 0.0;
            }
        }

        updateAll(organisms, dt, env) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let infaunalCount = 0;
            let sumDepth = 0.0;
            let sumFlux = 0.0;
            let sumCompaction = 0.0;
            let sumMucus = 0.0;
            let sumSulfide = 0.0;
            let sumPorewater = 0.0;
            let sumBTI = 0.0;
            let sumBMR = 0.0;
            let sumFermentation = 0.0;
            let sumResuspension = 0.0;
            let activeTunnels = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.isAlive) continue;

                liveCount++;
                this.updateOrganism(org, dt, env);

                if (org.infaunalAdapted) infaunalCount++;

                sumDepth += (org.subBenthicBurrowingDepth || 0.0);
                sumFlux += (org.bioturbationFlux || 0.0);
                sumCompaction += (org.compactionTorqueResistance || 0.0);
                sumMucus += (org.mucusLiningIntegrity || 0.0);
                sumSulfide += (org.sulfideOxidationYield || 0.0);
                sumPorewater += (org.nutrientPorewaterFlux || 0.0);
                sumBTI += (org.bioturbationIndex || 0.0);
                sumBMR += (org.mineralRecyclingIndex || 0.0);
                sumFermentation += (org.anoxicFermentationBuffer || 100.0);

                const unboundSilt = Math.max(0.0, (org.bioturbationFlux || 0.0) - (org.biogenicMucusCohesion || 0.0) * 0.65);
                sumResuspension += unboundSilt;

                if (org.isSubBenthic && org.subBenthicBurrowingDepth > 2.0) activeTunnels++;
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalInfaunalCells = infaunalCount;
            this.metrics.infaunalPrevalence = liveCount > 0 ? (infaunalCount / liveCount) : 0.0;
            this.metrics.meanBurrowingDepth = liveCount > 0 ? (sumDepth / liveCount) : 0.0;
            this.metrics.meanBioturbationFlux = liveCount > 0 ? (sumFlux / liveCount) : 0.0;
            this.metrics.meanCompactionResistance = liveCount > 0 ? (sumCompaction / liveCount) : 0.0;
            this.metrics.meanMucusLining = liveCount > 0 ? (sumMucus / liveCount) : 0.0;
            this.metrics.meanSulfideYield = liveCount > 0 ? (sumSulfide / liveCount) : 0.0;
            this.metrics.meanPorewaterNutrientFlux = liveCount > 0 ? (sumPorewater / liveCount) : 0.0;
            this.metrics.meanBTIIndex = liveCount > 0 ? (sumBTI / liveCount) : 0.0;
            this.metrics.meanBMRIndex = liveCount > 0 ? (sumBMR / liveCount) : 0.0;
            this.metrics.meanFermentationReserve = liveCount > 0 ? (sumFermentation / liveCount) : 100.0;
            this.metrics.meanTurbidity = liveCount > 0 ? Math.min(1.0, sumResuspension / liveCount) : 0.0;
            this.metrics.activeTunnels = activeTunnels;

            const aerationBoost = this.metrics.meanBioturbationFlux * 18.5;
            this.metrics.meanOxygenPenetration = this.baseOxygenPenetration + aerationBoost;
            this.metrics.cumulativeAerationSteps++;

            if (env && typeof env.addNutrients === "function" && this.metrics.meanPorewaterNutrientFlux > 0.01) {
                env.addNutrients(this.metrics.meanPorewaterNutrientFlux * 2.5);
            }
        }

        step(organisms, tick) {
            this.updateAll(organisms, 0.016, null);
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = InfaunalBioturbationManager;
    }
    if (typeof global !== "undefined") {
        global.InfaunalBioturbationManager = InfaunalBioturbationManager;
        global.infaunalBioturbationManager = new InfaunalBioturbationManager();
    }
})(typeof window !== "undefined" ? window : global);
