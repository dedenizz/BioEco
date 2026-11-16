// BioEcosystem - Hemichordate Trimeric Morphology, Stomochord & Pharyngeal Gill Slits
// Module: src/organs/hemichordate_pharyngeal.js
// Version: 7.77.0 (Hour 497 - System Agent: Silt Clogging, Flushing Spasms, Hypoxia Penalty, Mucus Tax & 96th Channel % PBE)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HemichordatePharyngealManager
     * High-fidelity biological simulation of hemichordate (acorn worm & pterobranch) anatomy and physiology:
     * - Trimeric Regionalization (Prosoma-Mesosoma-Metasoma): Distinct muscular proboscis, collar, and elongated trunk
     * - Stomochord Biomechanics: Vacuolated diverticulum supporting proboscis peristalsis (homologous precursor of chordate notochord)
     * - Pharyngeal Gill Slits: Paired U-shaped ciliated slits driving water efflux, oxygenation, and micro-seston filtration
     * - Proboscis Silt Clogging: Inorganic mineral particles accumulate in sediment, reducing propulsion and triggering flushing spasms
     * - Pharyngeal Slit Hypoxia Penalty: Compromised gill slits induce hypoxic stress accumulation and cellular asphyxiation damage
     * - Antiseptic Bromophenol Mucus Tax: Metabolic energy cost for antiseptic secretion with protective starvation depletion stall
     * - Benthic U-Burrowing: Peristaltic sediment burrowing with bromophenol/iodoform antiseptic mucus lining
     * - Two-Phase Life Cycle: Potential for pelagic ciliated Tornaria larval dispersion and benthic metamorphosis
     * - 95th Channel (% PSI) & 96th Channel (% PBE - Proboscis Burrowing Efficiency) mathematical cores
     */
    class HemichordatePharyngealManager {
        constructor() {
            this.baseProboscisTurgor = 0.65; // Baseline proboscis hydrostatic pressure
            this.baseStomochordSupport = 0.70; // Stomochord structural stiffness ratio [0.0 - 1.0]
            this.baseGillSlits = 12; // Baseline paired U-shaped gill slits [6 - 20]
            this.baseCiliaryFlux = 0.35; // Ciliary water throughput rate (uL/s)
            this.baseOxygenationEfficiency = 0.45; // Baseline gill slit gas exchange efficiency

            this.metrics = {
                totalLiveCells: 0,
                totalHemichordateOrganisms: 0,
                hemichordatePrevalence: 0.0,
                meanProboscisTurgor: 0.0,
                meanStomochordSupport: 0.0,
                meanGillSlitsCount: 12.0,
                meanGillSlitEfficiency: 0.0,
                meanPharyngealSlitIndex: 0.0,
                meanProboscisBurrowingEfficiency: 0.0,
                meanSiltCloggingLevel: 0.0,
                meanHypoxicStress: 0.0,
                activeBurrowersCount: 0,
                tornariaLarvaeCount: 0,
                proboscisFlushingEvents: 0,
                asphyxiationIncidents: 0,
                mucusDepletionStalls: 0,
                pharyngealFiltrationEvents: 0,
                burrowingEvents: 0,
                cumulativeFilteredOxygen: 0.0,
                cumulativeSedimentDisplaced: 0.0,
                cumulativeAntisepticMucus: 0.0
            };
        }

        /**
         * Initialize hemichordate morphology, stomochord, and pharyngeal slits on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Enteropneusts, benthic burrowing detritivores, or primitive deuterostomes
            const isCompetent = org.hasHemichordateTrait ||
                (org.hasStereom === false && (org.niche === "detritivore" || org.diet === "filter" || org.niche === "scavenger") && (org.y >= 240.0 && Math.random() < 0.35)) ||
                (org.dna && ((org.dna.pharyngealAffinity || 0) > 0.30 || (org.dna.burrowingAffinity || 0) > 0.35));

            if (typeof org.hasHemichordateTrait === "undefined") {
                org.hasHemichordateTrait = isCompetent;
            }

            if (!org.hasHemichordateTrait) {
                org.isHemichordate = false;
                org.pharyngealSlitIndex = 0.0;
                org.proboscisBurrowingEfficiency = 0.0;
                org.gillSlitEfficiency = 0.0;
                org.stomochordTurgor = 0.0;
                org.proboscisLength = 0.0;
                org.collarWidth = 0.0;
                org.trunkLength = 0.0;
                org.gillSlitsCount = 0;
                org.isBurrowing = false;
                org.burrowDepth = 0.0;
                org.bromophenolSecretion = 0.0;
                org.hasTornariaPhase = false;
                org.siltCloggingLevel = 0.0;
                org.isSiltClogged = false;
                org.proboscisFlushingTimer = 0.0;
                org.hypoxicStressAccumulation = 0.0;
                org.mucusSynthesisDepleted = false;
                return;
            }

            org.isHemichordate = true;

            // 1. Trimeric Anatomy: Proboscis, Collar, Trunk
            if (typeof org.proboscisLength === "undefined") {
                const pGene = (org.dna && typeof org.dna.proboscisSize === "number") ?
                    12.0 + org.dna.proboscisSize * 12.0 : 16.0;
                org.proboscisLength = Math.max(12.0, Math.min(24.0, pGene));
            }
            if (typeof org.collarWidth === "undefined") {
                const cGene = (org.dna && typeof org.dna.collarSize === "number") ?
                    10.0 + org.dna.collarSize * 8.0 : 14.0;
                org.collarWidth = Math.max(10.0, Math.min(18.0, cGene));
            }
            if (typeof org.trunkLength === "undefined") {
                const tGene = (org.dna && typeof org.dna.trunkSize === "number") ?
                    28.0 + org.dna.trunkSize * 37.0 : 42.0;
                org.trunkLength = Math.max(28.0, Math.min(65.0, tGene));
            }

            // 2. Stomochord Structural Support
            if (typeof org.stomochordTurgor === "undefined") {
                const stGene = (org.dna && typeof org.dna.stomochordStiffness === "number") ?
                    0.50 + org.dna.stomochordStiffness * 0.40 : this.baseStomochordSupport;
                org.stomochordTurgor = Math.max(0.30, Math.min(0.95, stGene));
            }

            // 3. Pharyngeal Gill Slits & Ciliary Respiration
            if (typeof org.gillSlitsCount === "undefined") {
                const gGene = (org.dna && typeof org.dna.gillSlits === "number") ?
                    6 + Math.floor(org.dna.gillSlits * 14) : this.baseGillSlits;
                org.gillSlitsCount = Math.max(6, Math.min(20, gGene));
            }
            if (typeof org.gillSlitEfficiency === "undefined") {
                org.gillSlitEfficiency = this.baseOxygenationEfficiency;
            }
            if (typeof org.pharyngealCiliaryFlux === "undefined") {
                org.pharyngealCiliaryFlux = this.baseCiliaryFlux;
            }

            // 4. Benthic U-Burrowing & Antiseptic Bromophenol Mucus
            if (typeof org.isBurrowing === "undefined") {
                org.isBurrowing = org.y >= 380.0;
            }
            if (typeof org.burrowDepth === "undefined") {
                org.burrowDepth = org.isBurrowing ? (15.0 + Math.random() * 25.0) : 0.0;
            }
            if (typeof org.bromophenolSecretion === "undefined") {
                org.bromophenolSecretion = 0.25;
            }

            // 5. Silt Clogging, Flushing Spasms & Hypoxia Penalties (Critic Audit Hour 496)
            if (typeof org.siltCloggingLevel === "undefined") {
                org.siltCloggingLevel = 0.0;
            }
            if (typeof org.isSiltClogged === "undefined") {
                org.isSiltClogged = false;
            }
            if (typeof org.proboscisFlushingTimer === "undefined") {
                org.proboscisFlushingTimer = 0.0;
            }
            if (typeof org.hypoxicStressAccumulation === "undefined") {
                org.hypoxicStressAccumulation = 0.0;
            }
            if (typeof org.mucusSynthesisDepleted === "undefined") {
                org.mucusSynthesisDepleted = false;
            }

            // 6. Tornaria Larval Dispersion Potential
            if (typeof org.hasTornariaPhase === "undefined") {
                org.hasTornariaPhase = Math.random() < 0.45;
            }

            // 7. 95th & 96th Telemetry Channels (% PSI & % PBE)
            if (typeof org.pharyngealSlitIndex === "undefined") {
                org.pharyngealSlitIndex = 0.42;
            }
            if (typeof org.proboscisBurrowingEfficiency === "undefined") {
                org.proboscisBurrowingEfficiency = 0.35;
            }
        }

        /**
         * Update an individual hemichordate organism over simulation time step dt.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Effective time step in seconds.
         * @param {Array<Object>} allOrganisms - All live organisms in the dish.
         */
        updateOrganism(org, dt, allOrganisms) {
            if (!org || !org.alive) return;
            if (typeof org.isHemichordate === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isHemichordate) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // --- 1. Stomochord Turgor & Hydrostatic Proboscis Peristalsis ---
            const energyFactor = Math.min(1.0, Math.max(0.2, (org.energy || 50.0) / 75.0));
            org.stomochordTurgor = Math.max(0.15, Math.min(1.0, (org.stomochordTurgor || 0.70) * 0.98 + energyFactor * 0.02));

            // --- 2. Silt Clogging & Flushing Spasm Mechanics ---
            if (org.y >= 360.0) {
                org.isBurrowing = true;

                // Accumulate inorganic silt particles in proboscis pores
                if (org.proboscisFlushingTimer <= 0.0) {
                    org.siltCloggingLevel = Math.min(1.0, (org.siltCloggingLevel || 0.0) + effDt * 0.12);
                }

                // Clogging threshold triggers water flushing spasm
                if (org.siltCloggingLevel >= 0.70 && org.proboscisFlushingTimer <= 0.0) {
                    org.isSiltClogged = true;
                    org.proboscisFlushingTimer = 2.5; // 2.5s expulsion spasm
                    this.metrics.proboscisFlushingEvents++;
                }

                let burrowDrive = org.stomochordTurgor * 1.40;
                // Severe propulsion penalty while clogged
                if (org.isSiltClogged) {
                    burrowDrive *= 0.25;
                }

                org.burrowDepth = Math.min(50.0, (org.burrowDepth || 0.0) + effDt * burrowDrive * 2.2);
                this.metrics.cumulativeSedimentDisplaced += effDt * 0.15 * burrowDrive;
                this.metrics.burrowingEvents++;

                // Active flushing clears clogging particles
                if (org.proboscisFlushingTimer > 0.0) {
                    org.proboscisFlushingTimer -= effDt;
                    org.siltCloggingLevel = Math.max(0.0, (org.siltCloggingLevel || 0.0) - effDt * 0.45);
                    if (org.siltCloggingLevel <= 0.15) {
                        org.isSiltClogged = false;
                    }
                }

                // --- 3. Antiseptic Bromophenol Mucus Metabolic Tax ---
                if (org.energy < 30.0) {
                    // Starvation lock: preserve cellular energy by stalling mucus secretion
                    org.mucusSynthesisDepleted = true;
                    this.metrics.mucusDepletionStalls++;
                } else {
                    org.mucusSynthesisDepleted = false;
                    org.bromophenolSecretion = Math.min(1.0, (org.bromophenolSecretion || 0.0) + effDt * 0.08);
                    org.energy -= effDt * 0.12; // Metabolic synthesis cost
                    this.metrics.cumulativeAntisepticMucus += effDt * 0.05;

                    // Pathogen & parasite deterrence from bromophenol
                    if (org.infected && Math.random() < 0.03 * org.bromophenolSecretion) {
                        org.infected = false;
                    }
                }
            } else {
                org.isBurrowing = false;
                org.burrowDepth = Math.max(0.0, (org.burrowDepth || 0.0) - effDt * 3.5);
                org.siltCloggingLevel = Math.max(0.0, (org.siltCloggingLevel || 0.0) - effDt * 0.20);
                if (org.proboscisFlushingTimer > 0.0) {
                    org.proboscisFlushingTimer -= effDt;
                }
                if (org.siltCloggingLevel <= 0.20) {
                    org.isSiltClogged = false;
                }
            }

            // --- 4. Pharyngeal Gill Slit Flux, Oxygenation & Hypoxia Penalty ---
            const activeSlitsRatio = Math.min(1.0, Math.max(0.3, (org.gillSlitsCount || 12) / 20.0));
            const ciliaryDrive = (0.50 + 0.50 * org.stomochordTurgor) * (org.isSiltClogged ? 0.40 : 1.0);
            org.pharyngealCiliaryFlux = Math.max(0.10, Math.min(0.85, this.baseCiliaryFlux * ciliaryDrive));

            const ambientOxygen = (typeof org.ambientO2 === "number") ? org.ambientO2 : 0.85;
            const gillExchange = org.pharyngealCiliaryFlux * activeSlitsRatio * Math.max(0.2, ambientOxygen);
            org.gillSlitEfficiency = Math.max(0.15, Math.min(0.98, gillExchange * 1.35));

            this.metrics.cumulativeFilteredOxygen += effDt * org.gillSlitEfficiency * 0.40;
            this.metrics.pharyngealFiltrationEvents++;

            // Micro-seston nutrient assimilation via pharyngeal ciliary filter
            if (org.energy < 90.0) {
                org.energy += effDt * 0.35 * org.gillSlitEfficiency;
            }

            // Hypoxic stress accumulation when slits are clogged or efficiency drops
            if (org.gillSlitEfficiency < 0.32 || org.isSiltClogged) {
                org.hypoxicStressAccumulation = Math.min(1.0, (org.hypoxicStressAccumulation || 0.0) + effDt * 0.22);
                org.energy -= effDt * 0.20 * org.hypoxicStressAccumulation; // Hypoxic metabolic decay

                // Critical cellular asphyxiation damage
                if (org.hypoxicStressAccumulation >= 0.85) {
                    this.metrics.asphyxiationIncidents++;
                    const asphyxDamage = effDt * 8.0;
                    if (typeof org.health === "number") {
                        org.health = Math.max(0.0, org.health - asphyxDamage);
                        if (org.health <= 0.0) {
                            org.alive = false;
                            org.isDead = true;
                            return;
                        }
                    } else {
                        org.energy = Math.max(0.0, org.energy - asphyxDamage);
                        if (org.energy <= 0.0) {
                            org.alive = false;
                            org.isDead = true;
                            return;
                        }
                    }
                }
            } else {
                org.hypoxicStressAccumulation = Math.max(0.0, (org.hypoxicStressAccumulation || 0.0) - effDt * 0.35);
            }

            // --- 5. 95th Channel (% PSI - Pharyngeal Slit Index) Formulation ---
            const slitComponent = activeSlitsRatio * 0.35;
            const efficiencyComponent = org.gillSlitEfficiency * 0.30;
            const stomochordComponent = org.stomochordTurgor * 0.20;
            const oxygenComponent = Math.min(1.0, org.pharyngealCiliaryFlux / 0.70) * 0.15;

            const computedPSI = slitComponent + efficiencyComponent + stomochordComponent + oxygenComponent;
            org.pharyngealSlitIndex = Math.max(0.0, Math.min(1.0, computedPSI));

            // --- 6. 96th Channel (% PBE - Proboscis Burrowing Efficiency) Formulation ---
            // Sentez: Hidrostatik kazi basinci (%35) + U-tunel mukus kararliligi (%30) + silt tikanma direnci (%20) + organik madde asimilasyonu (%15)
            const burrowDriveComp = Math.min(1.0, (org.burrowDepth || 0.0) / 40.0) * 0.35;
            const mucusComp = Math.min(1.0, (org.bromophenolSecretion || 0.0) * (org.mucusSynthesisDepleted ? 0.35 : 1.0)) * 0.30;
            const siltResistanceComp = Math.max(0.0, 1.0 - (org.siltCloggingLevel || 0.0)) * 0.20;
            const assimilationComp = Math.min(1.0, Math.max(0.1, (org.energy || 50.0) / 80.0)) * 0.15;

            const computedPBE = burrowDriveComp + mucusComp + siltResistanceComp + assimilationComp;
            org.proboscisBurrowingEfficiency = Math.max(0.0, Math.min(1.0, computedPBE));
        }

        /**
         * Update all hemichordate organisms and aggregate system metrics.
         * @param {Array<Object>} organisms - All live organisms in simulation.
         * @param {number} dt - Effective time step in seconds.
         */
        updateAll(organisms, dt) {
            if (!organisms || !Array.isArray(organisms)) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            let liveCount = 0;
            let hemiCount = 0;
            let burrowerCount = 0;
            let tornariaCount = 0;

            let sumTurgor = 0.0;
            let sumStomochord = 0.0;
            let sumSlits = 0;
            let sumEfficiency = 0.0;
            let sumPSI = 0.0;
            let sumPBE = 0.0;
            let sumSilt = 0.0;
            let sumHypoxia = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                if (typeof org.isHemichordate === "undefined") {
                    this.initOrganism(org);
                }

                if (org.isHemichordate) {
                    hemiCount++;
                    this.updateOrganism(org, effDt, organisms);

                    if (org.isBurrowing) burrowerCount++;
                    if (org.hasTornariaPhase) tornariaCount++;

                    sumTurgor += (org.proboscisTurgor || org.stomochordTurgor || 0.70);
                    sumStomochord += (org.stomochordTurgor || 0.70);
                    sumSlits += (org.gillSlitsCount || 12);
                    sumEfficiency += (org.gillSlitEfficiency || 0.45);
                    sumPSI += (org.pharyngealSlitIndex || 0.40);
                    sumPBE += (org.proboscisBurrowingEfficiency || 0.35);
                    sumSilt += (org.siltCloggingLevel || 0.0);
                    sumHypoxia += (org.hypoxicStressAccumulation || 0.0);
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalHemichordateOrganisms = hemiCount;
            this.metrics.hemichordatePrevalence = liveCount > 0 ? (hemiCount / liveCount) : 0.0;
            this.metrics.activeBurrowersCount = burrowerCount;
            this.metrics.tornariaLarvaeCount = tornariaCount;

            this.metrics.meanProboscisTurgor = hemiCount > 0 ? (sumTurgor / hemiCount) : 0.0;
            this.metrics.meanStomochordSupport = hemiCount > 0 ? (sumStomochord / hemiCount) : 0.0;
            this.metrics.meanGillSlitsCount = hemiCount > 0 ? (sumSlits / hemiCount) : 12.0;
            this.metrics.meanGillSlitEfficiency = hemiCount > 0 ? (sumEfficiency / hemiCount) : 0.0;
            this.metrics.meanPharyngealSlitIndex = hemiCount > 0 ? (sumPSI / hemiCount) : 0.0;
            this.metrics.meanProboscisBurrowingEfficiency = hemiCount > 0 ? (sumPBE / hemiCount) : 0.0;
            this.metrics.meanSiltCloggingLevel = hemiCount > 0 ? (sumSilt / hemiCount) : 0.0;
            this.metrics.meanHypoxicStress = hemiCount > 0 ? (sumHypoxia / hemiCount) : 0.0;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            this.updateAll(organisms, 0.016);
        }

        /**
         * Return a defensive copy of current metrics.
         * @returns {Object} Comprehensive Hemichordate Pharyngeal metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HemichordatePharyngealManager;
    }
    if (typeof global !== "undefined") {
        global.HemichordatePharyngealManager = HemichordatePharyngealManager;
        global.hemichordatePharyngealManager = new HemichordatePharyngealManager();
    }
})(typeof window !== "undefined" ? window : global);
