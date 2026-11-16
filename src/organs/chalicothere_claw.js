// BioEcosystem - Miocene Clawed Herbivore Radiation: Chalicotheriidae Biomechanics & Hook-Claws
// Module: src/organs/chalicothere_claw.js
// Version: 9.42.0 (Hour 662 - System Agent: Chalicothere Hook-Claw, Knuckle-Walking, Tripodal Stance & 143rd/144th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalicothereClawManager
     * High-fidelity biological simulation of Miocene Clawed Perissodactyls (Chalicotheriidae - Chalicotherium, Moropus, Ancylotherium):
     * - Evolutionary Stage & Lineages:
     *   The most paradoxical herbivorous mammals of the Miocene open gallery woodlands and savannahs.
     *   Perissodactyl ungulates (relatives of horses, rhinos, tapirs) that completely abandoned running hooves
     *   to evolve massive, curved, retractile ungual hook-claws and gorilla-like sloping body profiles.
     * - Retractile Ungual Hook-Claws & Knuckle-Walking Kinematics:
     *   Massive 20-30 cm curved claws (retractileUngualClaws: 0.75 - 0.98) specialized for hooking high vegetation.
     *   To prevent blunting and fracturing on rough ground, fingers are flexed backwards to walk on front knuckles
     *   (knuckleWalkingLocomotion: 0.72 - 0.96).
     * - Forelimb Asymmetry & Tripodal High-Browsing Stance:
     *   Elongated forelimbs 35-50% longer than hind legs. Sitting backwards onto the reinforced pelvis and short,
     *   thick hindlimbs establishes a stable tripodal feeding tripod (knuckleWalkingTripodalStance: 0.72 - 0.96),
     *   freeing both forelimbs to reach upward into intermediate tree layers.
     * - Branch-Hooking Pull Force & Selective Foliage Stripping:
     *   Powerful shoulder and bicep retraction delivering 1800 - 3200 N branch-hooking pull force.
     *   Bending resilient tree limbs downward to strip nutrient-dense tender canopy leaves, buds, and bark
     *   (foliageStrippingYield: 0.70 - 0.95).
     * - Lophodont Mastication & Thick Cementum Abrasion Resistance:
     *   Deep transverse molar enamel ridges (lophodontMasticationEfficiency: 0.72 - 0.96) and a thick protective
     *   cementum coat (cementumWearResistance: 0.70 - 0.94) grinding fibrous woody stems without premature tooth loss.
     * - Telemetry Channels:
     *   143rd Channel: Chalicothere Claw & Climbing Index (% CCI)
     *   144th Channel: Branch Pulling & Incurvation Index (% BPI)
     */
    class ChalicothereClawManager {
        /**
         * Initialize Chalicothere Claw Manager.
         */
        constructor() {
            this.metrics = {
                totalChalicotheres: 0,
                totalMoropus: 0,
                activeBranchHookers: 0,
                activeTripodalBrowsers: 0,
                meanClawRetention: 0.86,
                meanKnuckleWalking: 0.84,
                meanTripodalStance: 0.84,
                meanPullForce: 2500.0,
                meanStrippingYield: 0.82,
                meanLophodontEfficiency: 0.84,
                meanCementumResistance: 0.82,
                meanChalicothereClawIndex: 0.0,
                meanBranchPullingIndex: 0.0,
                branchHookEvents: 0,
                tripodalStanceEvents: 0,
                barkStripEvents: 0,
                harvestedCanopyBiomass: 0.0,
                cumulativeChalicothereBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Chalicotheriidae anatomical traits.
         * @param {Object} org - Simulation organism.
         */
        initOrganism(org) {
            if (!org) return;

            if (org.isChalicothere === undefined) {
                const isHerbivore = org.dna && (org.dna.diet === "HERBIVORE" || org.dna.diet === "OMNIVORE");
                const isMammalianHerbivore = (org.isMammaliaform || org.isSynapsid || org.isTherapsid || isHerbivore);
                // Radiate ~32% of eligible mammalian herbivores into Chalicotheriidae (excluding Paraceratheriids and Entelodonts)
                org.isChalicothere = isMammalianHerbivore && !org.isParaceratheriid && !org.isEntelodont && !org.isTerrorBird && Math.random() < 0.32;
            }

            if (org.isMoropus === undefined) {
                // Moropus is the larger, clawed browsing form of North America / Eurasia
                org.isMoropus = org.isChalicothere && Math.random() < 0.50;
            }

            // Retractile ungual hook-claws [0.75 - 0.98]
            if (org.retractileUngualClaws === undefined) {
                org.retractileUngualClaws = org.isChalicothere ?
                    (0.75 + Math.random() * 0.23) : (0.05 + Math.random() * 0.20);
            }

            // Knuckle-walking locomotion [0.72 - 0.96]
            if (org.knuckleWalkingLocomotion === undefined) {
                org.knuckleWalkingLocomotion = org.isChalicothere ?
                    (0.72 + Math.random() * 0.24) : (0.10 + Math.random() * 0.25);
            }

            // Knuckle-walking tripodal stance [0.72 - 0.96]
            if (org.knuckleWalkingTripodalStance === undefined) {
                org.knuckleWalkingTripodalStance = org.isChalicothere ?
                    (0.72 + Math.random() * 0.24) : (0.10 + Math.random() * 0.25);
            }

            // Branch-hooking pull force (1800 - 3200 N)
            if (org.branchHookingPullForce === undefined) {
                org.branchHookingPullForce = org.isChalicothere ?
                    (org.isMoropus ? 2400 + Math.random() * 800 : 1800 + Math.random() * 800) :
                    (400 + Math.random() * 600);
            }

            // Foliage & bark stripping yield [0.70 - 0.95]
            if (org.foliageStrippingYield === undefined) {
                org.foliageStrippingYield = org.isChalicothere ?
                    (0.70 + Math.random() * 0.25) : (0.20 + Math.random() * 0.30);
            }

            // Lophodont mastication efficiency [0.72 - 0.96]
            if (org.lophodontMasticationEfficiency === undefined) {
                org.lophodontMasticationEfficiency = org.isChalicothere ?
                    (0.72 + Math.random() * 0.24) : (0.25 + Math.random() * 0.35);
            }

            // Cementum wear resistance [0.70 - 0.94]
            if (org.cementumWearResistance === undefined) {
                org.cementumWearResistance = org.isChalicothere ?
                    (0.70 + Math.random() * 0.24) : (0.20 + Math.random() * 0.30);
            }

            // Dynamic feeding and postural states
            if (org.isBranchHooking === undefined) org.isBranchHooking = false;
            if (org.isTripodalBrowsing === undefined) org.isTripodalBrowsing = false;
            if (org.hookCooldown === undefined) org.hookCooldown = 0;
            if (org.tripodalTimer === undefined) org.tripodalTimer = 0;
            if (org.chalicothereClawIndex === undefined) org.chalicothereClawIndex = 0.0;
            if (org.branchPullingIndex === undefined) org.branchPullingIndex = 0.0;
        }

        /**
         * Update and audit all Chalicotheriidae organisms across the simulation.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} dt - Time delta in seconds (typically 0.016).
         * @param {number} boundsWidth - Simulation arena width.
         * @param {number} boundsHeight - Simulation arena height.
         */
        updateAll(organisms, dt, boundsWidth, boundsHeight) {
            if (!Array.isArray(organisms)) return;

            const w = boundsWidth || 660;
            const h = boundsHeight || 660;

            let chalicothereCount = 0;
            let moropusCount = 0;
            let activeHookers = 0;
            let activeTripodals = 0;
            let sumClaw = 0;
            let sumKnuckle = 0;
            let sumTripodal = 0;
            let sumPull = 0;
            let sumYield = 0;
            let sumLophodont = 0;
            let sumCementum = 0;
            let sumCCI = 0;
            let sumBPI = 0;
            let totalBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org) continue;

                this.initOrganism(org);

                if (!org.isChalicothere) continue;

                chalicothereCount++;
                if (org.isMoropus) moropusCount++;

                totalBiomass += (org.mass || 38.0);

                // Cooldown and posture timer updates
                if (org.hookCooldown > 0) org.hookCooldown -= dt;
                if (org.tripodalTimer > 0) org.tripodalTimer -= dt;

                // 1. Branch-Hooking & Tripodal Foraging Behavior
                // Seek nearby vegetative clusters or megaherbivore feeding corridors
                let targetFound = false;
                for (let j = 0; j < organisms.length; j++) {
                    if (i === j) continue;
                    const other = organisms[j];
                    if (!other) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const distSq = dx * dx + dy * dy;

                    // Sensory forage reach ~ 90 px
                    if (distSq < 8100) {
                        const dist = Math.sqrt(distSq);

                        // If near other herbivores or high browsing zones
                        if ((other.isMegaherbivore || other.isParaceratheriid || other.isDinoceratan) && dist < 45) {
                            if (org.hookCooldown <= 0) {
                                // Adopt Tripodal Stance & Hook Elevated Branches
                                org.isBranchHooking = true;
                                org.isTripodalBrowsing = true;
                                org.hookCooldown = 1.4;
                                org.tripodalTimer = 0.8;
                                this.metrics.branchHookEvents++;
                                this.metrics.tripodalStanceEvents++;
                                this.metrics.barkStripEvents++;

                                // Harvest intermediate branch nutrients
                                const harvestGain = 1.4 * org.foliageStrippingYield * org.lophodontMasticationEfficiency;
                                org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + harvestGain);
                                this.metrics.harvestedCanopyBiomass += harvestGain;

                                // While tripodal browsing, forward velocity slows to stabilize posture
                                org.vx = (org.vx || 0) * 0.3;
                                org.vy = (org.vy || 0) * 0.3;

                                targetFound = true;
                                break;
                            }
                        }
                    }
                }

                if (!targetFound) {
                    if (org.hookCooldown <= 0) org.isBranchHooking = false;
                    if (org.tripodalTimer <= 0) org.isTripodalBrowsing = false;
                }

                if (org.isBranchHooking) activeHookers++;
                if (org.isTripodalBrowsing) activeTripodals++;

                // 2. Knuckle-Walking Ground Locomotion
                // When not tripodal browsing, moves with rolling knuckle-walking stride
                if (!org.isTripodalBrowsing) {
                    const currentSpeed = Math.hypot(org.vx || 0, org.vy || 0);
                    if (currentSpeed > 0.05) {
                        const knuckleMultiplier = 0.95 + org.knuckleWalkingLocomotion * 0.25;
                        org.vx = (org.vx || 0) * knuckleMultiplier;
                        org.vy = (org.vy || 0) * knuckleMultiplier;
                    }
                }

                // Arena boundary restitution
                if (org.x < 15) { org.x = 15; org.vx = Math.abs(org.vx || 0); }
                if (org.x > w - 15) { org.x = w - 15; org.vx = -Math.abs(org.vx || 0); }
                if (org.y < 15) { org.y = 15; org.vy = Math.abs(org.vy || 0); }
                if (org.y > h - 15) { org.y = h - 15; org.vy = -Math.abs(org.vy || 0); }

                // 3. Telemetry Channels Formulation
                // 143rd Channel (% CCI - Chalicothere Claw & Climbing Index)
                const pullNormalized = Math.max(0.0, Math.min(1.0, org.branchHookingPullForce / 3200));
                const cciVal = Math.min(100.0, Math.max(0.0, (
                    org.retractileUngualClaws * 0.35 +
                    org.knuckleWalkingLocomotion * 0.30 +
                    org.knuckleWalkingTripodalStance * 0.20 +
                    pullNormalized * 0.15
                ) * 100.0));
                org.chalicothereClawIndex = cciVal;

                // 144th Channel (% BPI - Branch Pulling & Incurvation Index)
                const pullSurplusNormalized = Math.max(0.0, Math.min(1.0, (org.branchHookingPullForce - 1800) / 1400));
                const bpiVal = Math.min(100.0, Math.max(0.0, (
                    org.foliageStrippingYield * 0.35 +
                    org.lophodontMasticationEfficiency * 0.25 +
                    org.cementumWearResistance * 0.20 +
                    pullSurplusNormalized * 0.20
                ) * 100.0));
                org.branchPullingIndex = bpiVal;

                // Aggregate sums
                sumClaw += org.retractileUngualClaws;
                sumKnuckle += org.knuckleWalkingLocomotion;
                sumTripodal += org.knuckleWalkingTripodalStance;
                sumPull += org.branchHookingPullForce;
                sumYield += org.foliageStrippingYield;
                sumLophodont += org.lophodontMasticationEfficiency;
                sumCementum += org.cementumWearResistance;
                sumCCI += cciVal;
                sumBPI += bpiVal;
            }

            // Store metrics
            this.metrics.totalChalicotheres = chalicothereCount;
            this.metrics.totalMoropus = moropusCount;
            this.metrics.activeBranchHookers = activeHookers;
            this.metrics.activeTripodalBrowsers = activeTripodals;
            this.metrics.cumulativeChalicothereBiomass = totalBiomass;

            if (chalicothereCount > 0) {
                this.metrics.meanClawRetention = sumClaw / chalicothereCount;
                this.metrics.meanKnuckleWalking = sumKnuckle / chalicothereCount;
                this.metrics.meanTripodalStance = sumTripodal / chalicothereCount;
                this.metrics.meanPullForce = sumPull / chalicothereCount;
                this.metrics.meanStrippingYield = sumYield / chalicothereCount;
                this.metrics.meanLophodontEfficiency = sumLophodont / chalicothereCount;
                this.metrics.meanCementumResistance = sumCementum / chalicothereCount;
                this.metrics.meanChalicothereClawIndex = sumCCI / chalicothereCount;
                this.metrics.meanBranchPullingIndex = sumBPI / chalicothereCount;
            } else {
                this.metrics.meanChalicothereClawIndex = 0.0;
                this.metrics.meanBranchPullingIndex = 0.0;
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
         * @returns {Object} Comprehensive Chalicothere metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChalicothereClawManager;
    }
    if (typeof global !== "undefined") {
        global.ChalicothereClawManager = ChalicothereClawManager;
        global.chalicothereClawManager = new ChalicothereClawManager();
    }
})(typeof window !== "undefined" ? window : global);
