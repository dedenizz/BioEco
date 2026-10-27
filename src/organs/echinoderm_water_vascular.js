// BioEcosystem - Echinoderm Water Vascular System, Ambulacral Canals & Tube Feet Kinetics
// Module: src/organs/echinoderm_water_vascular.js
// Version: 7.17.0 (Hour 437 - System Agent: Osmotic Shock Resistance, Madreporite Flushing, Podia Rupture & % PTI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EchinodermWaterVascularManager
     * High-fidelity biological simulation of echinoderm hydraulic water vascular mechanics:
     * - Madreporite Porosity & Silt Fouling: Calcified sieve plate with sediment fouling and ciliary flushing
     * - Stone Canal & Ring Canal: Calcareous conduits conducting pressurized fluid into the circumoral ring
     * - Tiedemann's Bodies & Polian Vesicles: Auxiliary fluid reservoirs stabilizing hydraulic turgor pressure
     * - Radial Ambulacral Canals: Five symmetric fluid conduits extending along pentameric rays
     * - Stenohaline Osmotic Buffering: Protection against external cytolymph dilution and salinity shock
     * - Ampulla Muscular Bulbs: Contractile hydraulic reservoirs driving hydrostatic elongation of tube feet
     * - Podia (Tube Feet) Mechanics: Dual-row hydraulic appendages with chemical mucus suction disks
     * - Podial Rupture & Regeneration: Mechanical shear trauma shedding and ambulacral blastema regrowth
     * - Hydraulic Traction & Shell Prying: Sustained low-ATP suction forces prying calcified shells and gripping reefs
     * - Foundation calculations for 83rd Channel (% WVI) and 84th Channel (% PTI - Podial Traction Index)
     */
    class EchinodermWaterVascularManager {
        constructor() {
            this.maxOperatingPressure = 45.0; // kPa maximum sustainable hydraulic pressure
            this.nominalFluidIntakeRate = 0.18; // ml/s baseline madreporite filtration flux
            this.podiaExtensionVelocity = 2.4; // px/s hydraulic expansion rate
            this.baseSuctionForce = 0.85; // N baseline chemical/vacuum adhesion per podium

            this.metrics = {
                totalLiveCells: 0,
                totalEchinoderms: 0,
                echinodermPrevalence: 0.0,
                meanWaterVascularIndex: 0.0,
                meanPodialTractionIndex: 0.0,
                meanHydraulicPressure: 0.0,
                meanMadreporitePorosity: 0.0,
                meanMadreporiteFouling: 0.0,
                meanOsmoticStrain: 0.0,
                meanPodiaCount: 0.0,
                meanPodiaExtension: 0.0,
                meanSuctionForce: 0.0,
                totalRupturedPodia: 0,
                activeHydraulicMovers: 0,
                pryingPredationEvents: 0,
                vacuumGripHoldEvents: 0,
                madreporiteFlushingEvents: 0,
                osmoticShockEvents: 0,
                podiaRuptureEvents: 0,
                podiaRegenerationEvents: 0
            };
        }

        /**
         * Initialize echinoderm water vascular properties on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Cells with calcified plates, pentameric symmetry gene, or benthic adaptations
            const isCompetent = org.isEchinoderm || 
                (org.dna && ((org.dna.calcificationAffinity || 0) > 0.35 || (org.dna.benthicDragTolerance || 0) > 0.40)) ||
                (org.y >= 350.0 && Math.random() < 0.28);

            if (typeof org.isEchinoderm === "undefined") {
                org.isEchinoderm = isCompetent;
            }

            if (!org.isEchinoderm) {
                org.waterVascularIndex = 0.0;
                org.podialTractionIndex = 0.0;
                org.podiaCount = 0;
                return;
            }

            // Pentameric ray architecture
            if (typeof org.pentamericRays === "undefined") {
                org.pentamericRays = 5;
            }

            // Madreporite sieve valve porosity [0.35 - 0.95]
            if (typeof org.madreporitePorosity === "undefined") {
                const basePoro = (org.dna && typeof org.dna.madreporitePorosity === "number") ?
                    org.dna.madreporitePorosity : 0.65;
                org.madreporitePorosity = Math.max(0.35, Math.min(0.95, basePoro));
            }

            // Silt fouling accumulation and ciliary flushing cooldown
            if (typeof org.madreporiteFoulingRatio === "undefined") {
                org.madreporiteFoulingRatio = 0.0;
            }
            if (typeof org.ciliaryFlushingCooldown === "undefined") {
                org.ciliaryFlushingCooldown = 0;
            }

            // Stenohaline osmotic buffering capacity [0.25 - 0.95]
            if (typeof org.stenohalineOsmolyteBuffer === "undefined") {
                const baseOsmo = (org.dna && typeof org.dna.stenohalineTolerance === "number") ?
                    org.dna.stenohalineTolerance : 0.55;
                org.stenohalineOsmolyteBuffer = Math.max(0.25, Math.min(0.95, baseOsmo));
            }
            if (typeof org.osmoticHydrostaticStrain === "undefined") {
                org.osmoticHydrostaticStrain = 0.0;
            }

            // Stone canal calcification & hydrostatic conduit integrity [12.0 - 45.0 kPa]
            if (typeof org.stoneCanalPressure === "undefined") {
                org.stoneCanalPressure = 24.0 + Math.random() * 8.0;
            }

            // Polian vesicle hydraulic fluid reservoir [5.0 - 35.0 units]
            if (typeof org.hydraulicFluidReservoir === "undefined") {
                org.hydraulicFluidReservoir = 18.0;
            }

            // Tube feet (podia) count along 5 ambulacral grooves [10 - 40 podia]
            if (typeof org.podiaCount === "undefined") {
                const geneCount = (org.dna && typeof org.dna.podiaDensity === "number") ?
                    Math.round(org.dna.podiaDensity * 35.0) : 20;
                org.podiaCount = Math.max(10, Math.min(40, geneCount));
            }
            if (typeof org.maxPodiaCount === "undefined") {
                org.maxPodiaCount = org.podiaCount;
            }
            if (typeof org.rupturedPodiaCount === "undefined") {
                org.rupturedPodiaCount = 0;
            }

            // Dynamic extension length [0.0 - 18.0 px]
            if (typeof org.podiaExtensionLength === "undefined") {
                org.podiaExtensionLength = 6.0;
            }

            // Chemical/vacuum adhesion force per podium [0.2 - 2.0 N]
            if (typeof org.podiaSuctionForce === "undefined") {
                org.podiaSuctionForce = 0.85;
            }

            // Hydraulic pulsation phase for rhythmic stepping waves
            if (typeof org.podiaPhase === "undefined") {
                org.podiaPhase = Math.random() * Math.PI * 2;
            }

            // Substrate traction force [0.0 - 2.5]
            if (typeof org.podialTractionForce === "undefined") {
                org.podialTractionForce = 0.0;
            }

            // Shell prying state against calcified prey
            if (typeof org.bivalvePryingActive === "undefined") {
                org.bivalvePryingActive = false;
            }

            // Water Vascular Index (% WVI) and Podial Traction Index (% PTI)
            if (typeof org.waterVascularIndex === "undefined") {
                org.waterVascularIndex = 0.0;
            }
            if (typeof org.podialTractionIndex === "undefined") {
                org.podialTractionIndex = 0.0;
            }
        }

        /**
         * Update individual echinoderm hydraulic mechanics, ambulacral flow, and podia traction.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} currentVelocity - Ambient fluid streamline velocity.
         * @param {number} currentAngle - Fluid streamline vector angle.
         */
        updateOrganism(org, dt, currentVelocity, currentAngle) {
            if (!org || !org.alive) return;
            this.initOrganism(org);

            if (!org.isEchinoderm) {
                org.waterVascularIndex = 0.0;
                org.podialTractionIndex = 0.0;
                return;
            }

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const flowSpeed = (typeof currentVelocity === "number") ? currentVelocity : 0.40;

            // 1. Madreporite Silt Fouling Accumulation & Ciliary Flushing Reflex
            const isNearSubstrate = (org.y >= 360.0) || (org.inCrevice || false);
            if (isNearSubstrate) {
                org.madreporiteFoulingRatio = Math.min(0.85, (org.madreporiteFoulingRatio || 0.0) + 0.0008 * effDt * 60.0);
            } else {
                org.madreporiteFoulingRatio = Math.max(0.0, (org.madreporiteFoulingRatio || 0.0) - 0.0004 * effDt * 60.0);
            }

            if (org.ciliaryFlushingCooldown > 0) {
                org.ciliaryFlushingCooldown--;
            }

            // Ciliary Flushing Reflex: When sieve plate is choked, reverse ciliary surge expels silt
            if (org.madreporiteFoulingRatio > 0.40 && org.ciliaryFlushingCooldown <= 0 && org.energy > 12.0) {
                org.madreporiteFoulingRatio = Math.max(0.0, org.madreporiteFoulingRatio - 0.75);
                org.energy -= 0.45;
                org.ciliaryFlushingCooldown = 120;
                this.metrics.madreporiteFlushingEvents++;

                if (Math.random() < 0.15 && typeof addRipple === "function") {
                    addRipple(org.x, org.y, 224, 242, 254);
                }
            }

            // 2. Madreporite Fluid Intake Modulated by Fouling
            const effectivePorosity = Math.max(0.15, org.madreporitePorosity * (1.0 - (org.madreporiteFoulingRatio || 0.0) * 0.70));
            const inflowRate = this.nominalFluidIntakeRate * effectivePorosity * effDt * 60.0;
            const maxReservoir = 35.0;
            org.hydraulicFluidReservoir = Math.min(maxReservoir, org.hydraulicFluidReservoir + inflowRate);

            // 3. Stenohaline Osmotic Buffering & Salinity Shock
            const ambientSal = (typeof ambientSalinity === "number") ? ambientSalinity : 35.0;
            const salinityDelta = Math.abs(ambientSal - 35.0);
            const rawOsmoticStrain = (salinityDelta / 15.0) * (1.0 - (org.stenohalineOsmolyteBuffer || 0.55) * 0.75);
            org.osmoticHydrostaticStrain = Math.max(0.0, Math.min(1.0, rawOsmoticStrain));

            if (org.osmoticHydrostaticStrain > 0.35) {
                this.metrics.osmoticShockEvents++;
                // Osmotic stress causes cytolymph turgor drain
                if (org.energy && org.alive) {
                    org.energy = Math.max(1.0, org.energy - 0.025 * org.osmoticHydrostaticStrain * effDt * 60.0);
                }
            }

            // 4. Stone Canal & Ring Canal Hydrostatic Pressure Regulation
            const hydraulicFoulingTax = (org.madreporiteFoulingRatio || 0.0) * 0.35;
            const pressureTarget = Math.max(10.0, (18.0 + (org.hydraulicFluidReservoir / maxReservoir) * 22.0) * (1.0 - hydraulicFoulingTax));
            org.stoneCanalPressure += (pressureTarget - org.stoneCanalPressure) * 0.12 * effDt * 60.0;
            org.stoneCanalPressure = Math.max(8.0, Math.min(this.maxOperatingPressure, org.stoneCanalPressure));

            // 5. Podial Rupture & Mechanical Shear Trauma
            if (isNearSubstrate && flowSpeed > 0.60 && (org.podialTractionForce || 0.0) > 1.2) {
                if (Math.random() < 0.02 && org.podiaCount > 6) {
                    org.rupturedPodiaCount = Math.min(Math.round(org.maxPodiaCount * 0.5), (org.rupturedPodiaCount || 0) + 1);
                    org.podiaCount = Math.max(6, org.maxPodiaCount - org.rupturedPodiaCount);
                    this.metrics.podiaRuptureEvents++;
                }
            }

            // Ambulacral Podia Regeneration
            if ((org.rupturedPodiaCount || 0) > 0 && org.energy > 20.0) {
                org.rupturedPodiaCount = Math.max(0, org.rupturedPodiaCount - 0.04 * effDt * 60.0);
                org.podiaCount = Math.min(org.maxPodiaCount, Math.round(org.maxPodiaCount - org.rupturedPodiaCount));
                this.metrics.podiaRegenerationEvents++;
            }

            // 6. Ampullary Hydrostatic Wave & Tube Feet (Podia) Extension
            org.podiaPhase += 0.08 * (org.stoneCanalPressure / 25.0) * effDt * 60.0;
            const expansionWave = Math.sin(org.podiaPhase) * 0.4 + 0.6; // [0.2 - 1.0]
            const targetLength = (5.0 + expansionWave * 12.0 * (org.stoneCanalPressure / 30.0)) * (1.0 - org.osmoticHydrostaticStrain * 0.25);
            org.podiaExtensionLength += (targetLength - org.podiaExtensionLength) * 0.20 * effDt * 60.0;

            // 7. Substrate Contact, Suction Disk Adhesion & Traction
            let gripFactor = 0.0;
            if (isNearSubstrate) {
                const contactRatio = Math.min(1.0, org.podiaExtensionLength / 12.0);
                const intactRatio = org.maxPodiaCount > 0 ? (org.podiaCount / org.maxPodiaCount) : 1.0;
                org.podiaSuctionForce = this.baseSuctionForce * (0.6 + contactRatio * 0.8) * (org.stoneCanalPressure / 25.0) * intactRatio * (1.0 - org.osmoticHydrostaticStrain * 0.30);
                gripFactor = contactRatio * (org.podiaCount / 25.0);
                org.podialTractionForce = Math.min(2.5, gripFactor * 1.4);

                // Anti-drift traction: Podia anchor organism against hydrodynamic current sweep
                if (org.vx !== undefined && org.vy !== undefined) {
                    const dragDamping = 1.0 - Math.min(0.65, org.podialTractionForce * 0.28);
                    org.vx *= dragDamping;
                    org.vy *= dragDamping;
                }

                if (org.podialTractionForce > 0.8) {
                    this.metrics.vacuumGripHoldEvents++;
                }
            } else {
                org.podialTractionForce = Math.max(0.0, (org.podialTractionForce || 0.0) - 0.08 * effDt * 60.0);
                org.podiaSuctionForce = this.baseSuctionForce * 0.5;
            }

            // 8. Hydraulic Energy Conservation
            if (org.energy && org.alive) {
                const hydraulicSavings = 0.015 * (org.stoneCanalPressure / 30.0) * effDt * 60.0;
                org.energy = Math.min(100.0, org.energy + hydraulicSavings);
            }

            // 9. Predatory Shell Prying Mechanics
            if (org.niche === "carnivore" && org.targetPreyRef && org.targetPreyRef.alive) {
                const prey = org.targetPreyRef;
                const isPreyHard = (prey.shellHardness && prey.shellHardness > 0.1) || 
                                   (prey.calcifiedMass && prey.calcifiedMass > 1.0);
                if (isPreyHard) {
                    const distToPrey = Math.hypot(prey.x - org.x, prey.y - org.y);
                    if (distToPrey < (org.dna.size || 8.0) * 2.2) {
                        org.bivalvePryingActive = true;
                        this.metrics.pryingPredationEvents++;

                        // Continuous hydraulic suction fatigues prey shell adductor muscles
                        const pryingDmg = 0.12 * (org.podiaCount / 20.0) * org.podiaSuctionForce * effDt * 60.0;
                        prey.energy = Math.max(0.0, prey.energy - pryingDmg);

                        // Occasional shear rupture risk on predator tube feet during intense prying
                        if (Math.random() < 0.01 && org.podiaCount > 8) {
                            org.rupturedPodiaCount = (org.rupturedPodiaCount || 0) + 1;
                            org.podiaCount = Math.max(6, org.maxPodiaCount - org.rupturedPodiaCount);
                            this.metrics.podiaRuptureEvents++;
                        }

                        if (Math.random() < 0.05 && typeof addRipple === "function") {
                            addRipple((org.x + prey.x) * 0.5, (org.y + prey.y) * 0.5, 2, 132, 199);
                        }
                    } else {
                        org.bivalvePryingActive = false;
                    }
                } else {
                    org.bivalvePryingActive = false;
                }
            } else {
                org.bivalvePryingActive = false;
            }

            // 10. Channel 83: Water Vascular Index (% WVI)
            const pressureRatio = Math.min(1.0, org.stoneCanalPressure / 38.0);
            const porosityScore = effectivePorosity;
            const adhesionScore = Math.min(1.0, org.podiaSuctionForce / 1.5);
            const podiaCountScore = Math.min(1.0, org.podiaCount / 30.0);

            org.waterVascularIndex = Math.max(0.0, Math.min(1.0,
                (pressureRatio * 0.30) + (porosityScore * 0.25) + (adhesionScore * 0.25) + (podiaCountScore * 0.20)
            ));

            // 11. Channel 84: Podial Traction Index (% PTI)
            const tractionRatio = Math.min(1.0, (org.podialTractionForce || 0.0) / 2.0);
            const extensionRatio = Math.min(1.0, (org.podiaExtensionLength || 0.0) / 14.0);
            const intactRatio = org.maxPodiaCount > 0 ? (org.podiaCount / org.maxPodiaCount) : 1.0;
            const osmoticHealth = 1.0 - (org.osmoticHydrostaticStrain || 0.0) * 0.6;
            const pryingBonus = org.bivalvePryingActive ? 0.25 : 0.0;

            org.podialTractionIndex = Math.max(0.0, Math.min(1.0,
                (tractionRatio * 0.35) + (extensionRatio * 0.25) + (intactRatio * 0.20) + (osmoticHealth * 0.20) + pryingBonus
            ));
        }

        /**
         * Update all organisms across the ecosystem.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time delta in seconds.
         * @param {Object} currentFlow - Ambient fluid circulation parameters.
         */
        updateAll(organisms, dt, currentFlow) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let echinodermCount = 0;
            let sumWVI = 0.0;
            let sumPTI = 0.0;
            let sumPressure = 0.0;
            let sumPorosity = 0.0;
            let sumFouling = 0.0;
            let sumOsmoticStrain = 0.0;
            let sumPodia = 0;
            let sumExtension = 0.0;
            let sumSuction = 0.0;
            let sumRuptured = 0;
            let activeMovers = 0;

            const flowSpeed = currentFlow && typeof currentFlow.speed === "number" ? currentFlow.speed : 0.40;
            const flowAngle = currentFlow && typeof currentFlow.angle === "number" ? currentFlow.angle : 0.0;
            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, flowSpeed, flowAngle);

                if (org.isEchinoderm) {
                    echinodermCount++;
                    sumWVI += (org.waterVascularIndex || 0.0);
                    sumPTI += (org.podialTractionIndex || 0.0);
                    sumPressure += (org.stoneCanalPressure || 0.0);
                    sumPorosity += (org.madreporitePorosity || 0.0);
                    sumFouling += (org.madreporiteFoulingRatio || 0.0);
                    sumOsmoticStrain += (org.osmoticHydrostaticStrain || 0.0);
                    sumPodia += (org.podiaCount || 0);
                    sumExtension += (org.podiaExtensionLength || 0.0);
                    sumSuction += (org.podiaSuctionForce || 0.0);
                    sumRuptured += (org.rupturedPodiaCount || 0);

                    if ((org.podialTractionForce || 0.0) > 0.3) {
                        activeMovers++;
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalEchinoderms = echinodermCount;
            this.metrics.echinodermPrevalence = liveCount > 0 ? (echinodermCount / liveCount) : 0.0;
            this.metrics.meanWaterVascularIndex = echinodermCount > 0 ? (sumWVI / echinodermCount) : 0.0;
            this.metrics.meanPodialTractionIndex = echinodermCount > 0 ? (sumPTI / echinodermCount) : 0.0;
            this.metrics.meanHydraulicPressure = echinodermCount > 0 ? (sumPressure / echinodermCount) : 0.0;
            this.metrics.meanMadreporitePorosity = echinodermCount > 0 ? (sumPorosity / echinodermCount) : 0.0;
            this.metrics.meanMadreporiteFouling = echinodermCount > 0 ? (sumFouling / echinodermCount) : 0.0;
            this.metrics.meanOsmoticStrain = echinodermCount > 0 ? (sumOsmoticStrain / echinodermCount) : 0.0;
            this.metrics.meanPodiaCount = echinodermCount > 0 ? (sumPodia / echinodermCount) : 0.0;
            this.metrics.meanPodiaExtension = echinodermCount > 0 ? (sumExtension / echinodermCount) : 0.0;
            this.metrics.meanSuctionForce = echinodermCount > 0 ? (sumSuction / echinodermCount) : 0.0;
            this.metrics.totalRupturedPodia = sumRuptured;
            this.metrics.activeHydraulicMovers = activeMovers;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            this.updateAll(organisms, 0.016, null);
        }

        /**
         * Return a defensive copy of current metrics.
         * @returns {Object} Comprehensive echinoderm hydraulic metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EchinodermWaterVascularManager;
    }
    if (typeof global !== "undefined") {
        global.EchinodermWaterVascularManager = EchinodermWaterVascularManager;
        global.echinodermWaterVascularManager = new EchinodermWaterVascularManager();
    }
})(typeof window !== "undefined" ? window : global);
