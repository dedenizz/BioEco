// BioEcosystem - Benthic Fossorial Appendages & Infaunal Sediment Tunneling
// Module: src/organs/fossorial_appendages.js
// Version: 6.37.0 (Hour 357 - System Agent: Peristaltic Hydraulic Impulse & Gas Venting)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * FossorialAppendagesManager
     * High-precision biological simulation of benthic infaunal adaptations:
     * - Synthesizes eccentric sclerotized fossorial paddles (fossorialPaddles) along ventral margins
     * - Computes mechanical substrate penetration torque and downward infaunal burrowing (burrowDepth)
     * - Executes peristaltic hydraulic coelomic contractions for forward thrust through compacted mud
     * - Imposes anoxic stress accumulation (anoxicStressTimer) preventing perpetual subterranean idling
     * - Discharges trapped sediment gas bubbles (sedimentGasVentFlux) for infaunal bioturbation
     * - Provides infaunal camouflage and concealment against pelagic predators (infaunalConcealment)
     * - Extracts and metabolizes buried organic carbon and chalk sediment (sedimentDigestionRate)
     */
    class FossorialAppendagesManager {
        constructor() {
            this.benthicDepthThreshold = 570.0;
            this.maxPaddles = 8.0;
            this.maxBurrowDepth = 75.0;
            this.anoxicThreshold = 180;
            this.metrics = {
                totalLiveCells: 0,
                totalBurrowers: 0,
                infaunalPrevalence: 0.0,
                meanPaddles: 0.0,
                meanBurrowDepth: 0.0,
                meanTorque: 0.0,
                meanPeristalticImpulse: 0.0,
                meanConcealment: 0.0,
                anoxicStressPrevalence: 0.0,
                cumulativeSedimentDigested: 0.0,
                cumulativeGasVented: 0.0,
                activeBurrowPlumes: 0
            };
        }

        /**
         * Initialize default fossorial and infaunal burrowing attributes on an organism.
         * @param {Object} org - Simulation organism entity.
         */
        static initOrganism(org) {
            if (!org) return;
            if (org.fossorialPaddles === undefined) org.fossorialPaddles = 0.0;
            if (org.burrowDepth === undefined) org.burrowDepth = 0.0;
            if (org.penetrationTorque === undefined) org.penetrationTorque = 0.0;
            if (org.peristalticImpulse === undefined) org.peristalticImpulse = 0.0;
            if (org.anoxicStressTimer === undefined) org.anoxicStressTimer = 0;
            if (org.sedimentGasVentFlux === undefined) org.sedimentGasVentFlux = 0.0;
            if (org.ventBubbleTicks === undefined) org.ventBubbleTicks = 0;
            if (org.infaunalConcealment === undefined) org.infaunalConcealment = 0.0;
            if (org.sedimentDigestionRate === undefined) org.sedimentDigestionRate = 0.0;
            if (org.isBurrowing === undefined) org.isBurrowing = false;
            if (org.burrowPlumeTicks === undefined) org.burrowPlumeTicks = 0;
            if (org.infaunalMetabolicBuffer === undefined) org.infaunalMetabolicBuffer = 0.0;
            if (org.excavationCyclePhase === undefined) org.excavationCyclePhase = Math.random() * Math.PI * 2.0;
        }

        /**
         * Compute infaunal predatory damage damping based on sediment concealment depth.
         * @param {Object} prey - Defender organism entity.
         * @param {number} rawDamage - Initial predatory attack strike damage.
         * @returns {number} Damped attack damage after infaunal shielding.
         */
        static computeInfaunalDamageDamping(prey, rawDamage) {
            if (!prey || typeof rawDamage !== "number") return rawDamage;
            const concealment = Math.min(0.85, Math.max(0.0, prey.infaunalConcealment || 0.0));
            return rawDamage * (1.0 - concealment * 0.80);
        }

        /**
         * Execute cellular fossorial paddle growth, peristaltic excavation, and sediment foraging.
         * @param {Array<Object>} organisms - Live simulation population array.
         * @param {Object} biogeochemicalSystem - Global biogeochemical cycles manager instance.
         * @param {number} tick - Current simulation frame count.
         */
        step(organisms, biogeochemicalSystem, tick) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.metrics.totalLiveCells = 0;
                this.metrics.totalBurrowers = 0;
                this.metrics.infaunalPrevalence = 0.0;
                this.metrics.meanPaddles = 0.0;
                this.metrics.meanBurrowDepth = 0.0;
                this.metrics.meanTorque = 0.0;
                this.metrics.meanPeristalticImpulse = 0.0;
                this.metrics.meanConcealment = 0.0;
                this.metrics.anoxicStressPrevalence = 0.0;
                this.metrics.activeBurrowPlumes = 0;
                return;
            }

            let liveCells = 0;
            let burrowerCount = 0;
            let plumeCount = 0;
            let anoxicCount = 0;
            let totalPaddles = 0.0;
            let totalDepth = 0.0;
            let totalTorque = 0.0;
            let totalPeristaltic = 0.0;
            let totalConcealment = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCells++;

                FossorialAppendagesManager.initOrganism(org);
                if (org.burrowPlumeTicks > 0) org.burrowPlumeTicks--;
                if (org.ventBubbleTicks > 0) org.ventBubbleTicks--;

                // Advance mechanical excavation cycle oscillation
                org.excavationCyclePhase = (org.excavationCyclePhase + 0.12) % (Math.PI * 2.0);

                // 1. Eccentric Fossorial Paddle Accretion & Chitinous Sclerotization
                const fossorialAffinity = (org.dna && typeof org.dna.fossorialAffinity === "number")
                    ? org.dna.fossorialAffinity
                    : 0.50;
                const isBenthicNiche = (org.niche === "scavenger" || org.niche === "herbivore" || org.niche === "detritivore") ||
                    (org.y >= this.benthicDepthThreshold - 75.0);

                if (isBenthicNiche && org.energy > 22.0) {
                    const paddleGrowth = 0.0075 * (0.65 + fossorialAffinity * 0.75);
                    org.fossorialPaddles = Math.min(this.maxPaddles, org.fossorialPaddles + paddleGrowth);
                    org.energy = Math.max(5.0, org.energy - 0.0009 * org.fossorialPaddles);
                }

                // 2. Substrate Penetration & Infaunal Burrowing Mechanics
                const nearSubstrate = (org.y >= this.benthicDepthThreshold - 35.0);
                if (org.fossorialPaddles >= 0.35 && nearSubstrate) {
                    org.isBurrowing = true;
                    burrowerCount++;

                    // Penetration torque depends on paddle count, energetic health, and cycle thrust
                    const cycleFactor = 0.80 + 0.20 * Math.sin(org.excavationCyclePhase);
                    const rawTorque = (org.fossorialPaddles / 4.5) * (0.45 + 0.55 * (org.energy / 50.0)) * cycleFactor;
                    org.penetrationTorque = Math.max(0.0, Math.min(1.0, rawTorque));

                    // Peristaltic hydraulic coelomic impulse
                    const coelomicPhase = (org.excavationCyclePhase * 1.5) % (Math.PI * 2.0);
                    const waveThrust = Math.max(0.0, Math.sin(coelomicPhase));
                    org.peristalticImpulse = waveThrust * (0.16 + 0.14 * (org.energy / 50.0));
                    totalPeristaltic += org.peristalticImpulse;

                    // Increment infaunal burrow depth with combined torque and hydraulic push
                    const depthDelta = 0.12 * org.penetrationTorque + 0.06 * org.peristalticImpulse;
                    org.burrowDepth = Math.min(this.maxBurrowDepth, org.burrowDepth + depthDelta);

                    // Compute infaunal concealment ratio against pelagic surface predators
                    org.infaunalConcealment = Math.min(0.85, (org.burrowDepth / this.maxBurrowDepth) * 0.85);

                    // Spawn benthic excavation plume feedback ticks
                    if (org.penetrationTorque > 0.25 && Math.random() < 0.20) {
                        org.burrowPlumeTicks = 12;
                        plumeCount++;
                    }

                    // 3. Anoxic Stress Accumulation & Epibenthic Ventilation Cycle
                    if (org.burrowDepth >= 10.0) {
                        org.anoxicStressTimer++;
                        if (org.anoxicStressTimer > this.anoxicThreshold) {
                            anoxicCount++;
                            // Hypoxic metabolic penalty forces cell to seek epibenthic boundary
                            const hypoxiaPenalty = 0.018 * Math.min(3.0, (org.anoxicStressTimer - this.anoxicThreshold) / 60.0);
                            org.energy = Math.max(3.0, org.energy - hypoxiaPenalty);
                            
                            // Reflexive upward swimming escape impulse
                            if (org.vy !== undefined) org.vy -= 0.10;
                        }
                    } else {
                        // Oxygen replenishment when near substrate boundary
                        if (org.anoxicStressTimer > 0) org.anoxicStressTimer = Math.max(0, org.anoxicStressTimer - 3);
                    }

                    // 4. Biogenic Gas Venting & Substrate Aeration
                    if (org.burrowDepth >= 8.0 && org.peristalticImpulse > 0.12) {
                        org.sedimentGasVentFlux = 0.008 * (org.burrowDepth / 40.0) * org.peristalticImpulse;
                        this.metrics.cumulativeGasVented += org.sedimentGasVentFlux;
                        if (Math.random() < 0.25) org.ventBubbleTicks = 16;
                    } else {
                        org.sedimentGasVentFlux = 0.0;
                    }

                    // Soft mechanical drag damping inside sediment
                    if (org.vx !== undefined && org.vy !== undefined) {
                        const dragDamping = 1.0 - 0.35 * (org.burrowDepth / this.maxBurrowDepth);
                        org.vx *= dragDamping;
                        org.vy *= dragDamping;
                    }
                } else {
                    // Gradual decompression / sediment clearance when swimming above benthic substrate
                    if (org.y < this.benthicDepthThreshold - 40.0) {
                        org.isBurrowing = false;
                        org.peristalticImpulse = 0.0;
                        org.sedimentGasVentFlux = 0.0;
                        if (org.anoxicStressTimer > 0) org.anoxicStressTimer = Math.max(0, org.anoxicStressTimer - 4);
                        if (org.burrowDepth > 0.0) {
                            org.burrowDepth = Math.max(0.0, org.burrowDepth - 0.25);
                            org.infaunalConcealment = Math.max(0.0, (org.burrowDepth / this.maxBurrowDepth) * 0.85);
                        }
                    }
                }

                // 5. Buried Sediment Carbon & Mineral Digestion
                if (org.burrowDepth >= 4.0) {
                    const depthRatio = org.burrowDepth / this.maxBurrowDepth;
                    org.sedimentDigestionRate = Math.min(0.035, 0.009 * depthRatio * (0.7 + fossorialAffinity * 0.6));
                    
                    // Energetic replenishment from mining buried organic deposits
                    org.energy = Math.min(100.0, org.energy + org.sedimentDigestionRate);
                    org.infaunalMetabolicBuffer = Math.min(40.0, org.infaunalMetabolicBuffer + org.sedimentDigestionRate * 0.50);
                    this.metrics.cumulativeSedimentDigested += org.sedimentDigestionRate;

                    // Mineral feedback to benthic sediment pools if biogeochemical manager exists
                    if (biogeochemicalSystem && typeof biogeochemicalSystem.benthicSedimentCarbon === "number") {
                        biogeochemicalSystem.benthicSedimentCarbon = Math.max(0.0, biogeochemicalSystem.benthicSedimentCarbon - org.sedimentDigestionRate * 0.05);
                    }
                } else {
                    org.sedimentDigestionRate = 0.0;
                }

                // Accumulate statistics
                totalPaddles += org.fossorialPaddles;
                totalDepth += org.burrowDepth;
                totalTorque += org.penetrationTorque;
                totalConcealment += org.infaunalConcealment;
            }

            // 6. Update Global Metrics Snapshot
            this.metrics.totalLiveCells = liveCells;
            this.metrics.totalBurrowers = burrowerCount;
            this.metrics.activeBurrowPlumes = plumeCount;
            this.metrics.infaunalPrevalence = liveCells > 0 ? (burrowerCount / liveCells) * 100.0 : 0.0;
            this.metrics.meanPaddles = liveCells > 0 ? totalPaddles / liveCells : 0.0;
            this.metrics.meanBurrowDepth = burrowerCount > 0 ? totalDepth / burrowerCount : 0.0;
            this.metrics.meanTorque = burrowerCount > 0 ? totalTorque / burrowerCount : 0.0;
            this.metrics.meanPeristalticImpulse = burrowerCount > 0 ? totalPeristaltic / burrowerCount : 0.0;
            this.metrics.meanConcealment = liveCells > 0 ? totalConcealment / liveCells : 0.0;
            this.metrics.anoxicStressPrevalence = burrowerCount > 0 ? (anoxicCount / burrowerCount) * 100.0 : 0.0;
        }

        /**
         * Retrieve a clean copy of the current infaunal burrowing metrics snapshot.
         * @returns {Object} Live fossorial metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = FossorialAppendagesManager;
    } else {
        global.FossorialAppendagesManager = FossorialAppendagesManager;
        global.fossorialAppendagesManager = new FossorialAppendagesManager();
    }
})(typeof window !== "undefined" ? window : global);
