// BioEcosystem - Holothuroid Morphology, Deposit Feeding & Cuvierian Tubules Defense
// Module: src/organs/holothuroid_cuvierian.js
// Version: 7.47.0 (Hour 467 - System Agent: Visceral Evisceration, Coelomic Lipids, Parasite Intrusion & 90th Channel % VRI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HolothuroidCuvierianManager
     * High-fidelity biological simulation of holothuroid (sea cucumber) adaptations:
     * - Secondary Bilateral Symmetry: Oral-aboral horizontal elongation with trivium (locomotive sole) and bivium (dorsal papillae)
     * - Detritivorous Deposit Feeding: Branched mucus tentacles ingesting sediment, extracting organic carbon, and depositing clean fecal pellets
     * - Cuvierian Tubules Defense Ejection: Caudal defensive tubules that hydrate into sticky, tensile protein networks entangling predators
     * - Holothurin Chemical Toxicity: Saponin defense agents causing hemolytic deterrence and predator immobilization
     * - Cloacal Pumping & Respiratory Trees: Dynamic water circulation driving internal gas exchange and coelomic aeration
     * - Autonomic Visceral Evisceration: Extreme defense expelling digestive tract and respiratory trees to distract predators
     * - Post-Evisceration Starvation Trap & Coelomic Lipids: Complete cessation of ingestion assimilation, subsisting on coelomic lipid reserves
     * - Cloacal Parasitic Intrusion: Carapid pearlfish and endoparasite vulnerability counterbalanced by holothurin barrier
     * - Mesenteric Visceral Regeneration: Stem cell proliferation reconstructing digestive tract and respiratory trees
     * - 89th Channel (% CDI - Cuvierian Defense Index) and 90th Channel (% VRI - Visceral Regeneration Index) Mathematical Formulation
     */
    class HolothuroidCuvierianManager {
        constructor() {
            this.baseIngestionRate = 0.24; // Baseline sediment ingestion rate (mg/s)
            this.baseDetritusYield = 0.38; // Organic carbon extracted per mg sediment
            this.baseTubuleRegenRate = 0.05; // Coelomic Cuvierian tubule regeneration rate (/s)
            this.baseCloacalRate = 0.35; // Baseline cloacal ventilation frequency (Hz)
            this.holothurinToxicityFactor = 0.45; // Chemical deterrence potency against carnivores
            this.baseVisceralRegenRate = 0.035; // Baseline mesenteric tissue regeneration rate (/s)
            this.baseLipidConsumptionRate = 0.075; // Lipid depletion rate during starvation (/s)

            this.metrics = {
                totalLiveCells: 0,
                totalHolothuroidOrganisms: 0,
                holothuroidPrevalence: 0.0,
                meanTubulesReserve: 0.0,
                meanAdhesionStrength: 0.0,
                meanHolothurinPayload: 0.0,
                meanSedimentIngested: 0.0,
                meanFecalPelletRate: 0.0,
                meanCloacalVentilation: 0.0,
                meanVisceralIntegrity: 0.0,
                meanCoelomicLipids: 0.0,
                meanParasiteLoad: 0.0,
                meanCuvierianDefenseIndex: 0.0,
                meanVisceralRegenerationIndex: 0.0,
                activeDepositFeeders: 0,
                evisceratedOrganisms: 0,
                tubuleEjectionIncidents: 0,
                predatorImmobilizationEvents: 0,
                eviscerationIncidents: 0,
                parasiteIntrusionEvents: 0,
                fecalPelletDeposits: 0,
                visceralRegenerationEvents: 0,
                cumulativeSedimentProcessed: 0.0,
                cumulativeCarbonHarvested: 0.0,
                cumulativeHolothurinDispersed: 0.0,
                cumulativeLipidsConsumed: 0.0
            };
        }

        /**
         * Initialize holothuroid morphology, tentacles, respiratory trees, and Cuvierian organs on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Holothuroids, stereom-bearing detritivores, or benthic scavengers
            const isCompetent = org.hasHolothuroidTrait ||
                (org.hasStereom && (org.niche === "scavenger" || org.niche === "herbivore") && (org.y >= 310.0 && Math.random() < 0.40)) ||
                (org.dna && ((org.dna.holothuroidAffinity || 0) > 0.30 || (org.dna.detritusAffinity || 0) > 0.35));

            if (typeof org.hasHolothuroidTrait === "undefined") {
                org.hasHolothuroidTrait = isCompetent;
            }

            if (!org.hasHolothuroidTrait) {
                org.secondaryBilateralAxis = false;
                org.cuvierianDefenseIndex = 0.0;
                org.visceralRegenerationIndex = 0.0;
                org.cuvierianTubulesReserve = 0;
                org.holothurinToxinPayload = 0.0;
                org.sedimentIngestionRate = 0.0;
                org.visceralIntegrity = 0.0;
                org.coelomicLipidReserve = 0.0;
                org.respiratoryParasiteLoad = 0.0;
                org.isEviscerated = false;
                return;
            }

            // 1. Secondary Bilateral Symmetry & Horizontal Axis Elongation [1.8 - 3.2]
            org.secondaryBilateralAxis = true;
            if (typeof org.elongationRatio === "undefined") {
                const elonGene = (org.dna && typeof org.dna.elongation === "number") ?
                    1.6 + org.dna.elongation * 1.4 : 2.2;
                org.elongationRatio = Math.max(1.8, Math.min(3.2, elonGene));
            }

            // 2. Branched Mucus Oral Tentacles [10 - 20 tentacles]
            if (typeof org.oralTentaclesCount === "undefined") {
                org.oralTentaclesCount = 10 + Math.floor(Math.random() * 11);
            }
            if (typeof org.tentacleBranchingComplexity === "undefined") {
                org.tentacleBranchingComplexity = 0.55 + Math.random() * 0.40;
            }

            // 3. Detritivorous Sediment Ingestion & Carbon Assimilation [0.12 - 0.45 mg/s]
            if (typeof org.sedimentIngestionRate === "undefined") {
                const ingestGene = (org.dna && typeof org.dna.ingestionRate === "number") ?
                    org.dna.ingestionRate * 0.40 : 0.26;
                org.sedimentIngestionRate = Math.max(0.12, Math.min(0.45, ingestGene));
            }
            if (typeof org.detritusAssimilationEfficiency === "undefined") {
                org.detritusAssimilationEfficiency = 0.72 + Math.random() * 0.20;
            }
            if (typeof org.fecalPelletRate === "undefined") {
                org.fecalPelletRate = 0.0;
            }
            if (typeof org.purifiedSedimentExcreted === "undefined") {
                org.purifiedSedimentExcreted = 0.0;
            }

            // 4. Cuvierian Tubules Defense Pool [0 - 30 tubules]
            if (typeof org.cuvierianTubulesReserve === "undefined") {
                org.cuvierianTubulesReserve = 18 + Math.floor(Math.random() * 12);
            }
            if (typeof org.maxCuvierianTubules === "undefined") {
                org.maxCuvierianTubules = 30;
            }
            if (typeof org.tubuleAdhesionStrength === "undefined") {
                org.tubuleAdhesionStrength = 0.82 + Math.random() * 0.15;
            }

            // 5. Holothurin Saponin Toxin Payload [0.0 - 50.0 mg]
            if (typeof org.holothurinToxinPayload === "undefined") {
                org.holothurinToxinPayload = 25.0 + Math.random() * 20.0;
            }
            if (typeof org.maxHolothurinPayload === "undefined") {
                org.maxHolothurinPayload = 50.0;
            }

            // 6. Cloacal Ventilation & Respiratory Trees [0.20 - 0.60 Hz]
            if (typeof org.cloacalPumpingRate === "undefined") {
                org.cloacalPumpingRate = 0.32 + Math.random() * 0.20;
            }
            if (typeof org.respiratoryTreeEfficiency === "undefined") {
                org.respiratoryTreeEfficiency = 0.70 + Math.random() * 0.25;
            }
            if (typeof org.cloacalPhase === "undefined") {
                org.cloacalPhase = Math.random() * Math.PI * 2;
            }

            // 7. Internal Visceral Mass Integrity [0.0 - 1.0]
            if (typeof org.visceralIntegrity === "undefined") {
                org.visceralIntegrity = 1.0;
            }
            if (typeof org.isEviscerated === "undefined") {
                org.isEviscerated = false;
            }
            if (typeof org.visceralRegenerationRate === "undefined") {
                org.visceralRegenerationRate = 0.035;
            }
            if (typeof org.visceralRegenerationMetabolicTax === "undefined") {
                org.visceralRegenerationMetabolicTax = 0.005;
            }

            // 8. Coelomic Lipid Reserves [0.0 - 100.0%]
            // Acts as emergency nutrient reservoir during post-evisceration gut reconstruction
            if (typeof org.coelomicLipidReserve === "undefined") {
                org.coelomicLipidReserve = 70.0 + Math.random() * 25.0;
            }

            // 9. Cloacal Endoparasitic Load [0.0 - 1.0] (Carapid pearlfish / inquiline load)
            if (typeof org.respiratoryParasiteLoad === "undefined") {
                org.respiratoryParasiteLoad = 0.0;
            }

            // 10. Transient State Trackers
            if (typeof org.activeTubuleEjectionCooldown === "undefined") {
                org.activeTubuleEjectionCooldown = 0.0;
            }
            if (typeof org.tubulesEjectedTransient === "undefined") {
                org.tubulesEjectedTransient = 0;
            }
            if (typeof org.evisceratedVisceraDecoyTimer === "undefined") {
                org.evisceratedVisceraDecoyTimer = 0.0;
            }
            if (typeof org.postEviscerationStarvationPenalty === "undefined") {
                org.postEviscerationStarvationPenalty = false;
            }

            // Telemetry indices
            if (typeof org.cuvierianDefenseIndex === "undefined") {
                org.cuvierianDefenseIndex = 0.0;
            }
            if (typeof org.visceralRegenerationIndex === "undefined") {
                org.visceralRegenerationIndex = 1.0;
            }
        }

        /**
         * Update individual holothuroid deposit feeding, cloacal aeration, Cuvierian defense, and evisceration.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {Array<Object>} organisms - Array of live organisms.
         */
        updateOrganism(org, dt, organisms) {
            if (!org || !org.alive) return;
            this.initOrganism(org);

            if (!org.hasHolothuroidTrait) {
                org.cuvierianDefenseIndex = 0.0;
                org.visceralRegenerationIndex = 0.0;
                return;
            }

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // Decrement active timers
            if ((org.activeTubuleEjectionCooldown || 0) > 0) {
                org.activeTubuleEjectionCooldown = Math.max(0.0, org.activeTubuleEjectionCooldown - effDt);
            }
            if ((org.tubulesEjectedTransient || 0) > 0 && org.activeTubuleEjectionCooldown <= 2.5) {
                org.tubulesEjectedTransient = 0;
            }
            if ((org.evisceratedVisceraDecoyTimer || 0) > 0) {
                org.evisceratedVisceraDecoyTimer = Math.max(0.0, org.evisceratedVisceraDecoyTimer - effDt);
            }

            // 1. Post-Evisceration Starvation Trap & Coelomic Lipid Depletion
            // If visceral integrity is below 60%, the alimentary canal cannot digest food
            org.postEviscerationStarvationPenalty = ((org.visceralIntegrity || 1.0) < 0.60);

            if (org.postEviscerationStarvationPenalty) {
                // Must burn coelomic lipid reserves to sustain basal metabolism
                const lipidBurn = this.baseLipidConsumptionRate * effDt * 60.0;
                org.coelomicLipidReserve = Math.max(0.0, (org.coelomicLipidReserve || 0.0) - lipidBurn);
                this.metrics.cumulativeLipidsConsumed += lipidBurn;

                // Lipids provide basal caloric maintenance
                if (org.energy && org.alive) {
                    org.energy = Math.min(100.0, org.energy + lipidBurn * 0.40);
                }

                // If coelomic lipid reserves are completely exhausted, starvation damage ensues
                if ((org.coelomicLipidReserve || 0.0) <= 0.0 && org.energy) {
                    org.energy = Math.max(0.0, org.energy - 0.12 * effDt * 60.0);
                }
            }

            // 2. Benthic Horizon Detritivorous Deposit Feeding (y >= 310 px)
            const isBenthicContact = (org.y >= 310.0);
            const isHungry = (org.energy && org.energy < 92.0);

            if (isBenthicContact && isHungry) {
                // Oral tentacles sweep sediment into pharynx
                const sweepYield = this.baseIngestionRate * (org.sedimentIngestionRate || 0.25) * (org.tentacleBranchingComplexity || 0.70) * effDt * 60.0;

                // Gut digestion efficiency scaled by visceral integrity above 60%
                let gutDigestionRatio = 1.0;
                if ((org.visceralIntegrity || 1.0) < 0.60) {
                    gutDigestionRatio = 0.0; // Complete starvation trap: no digestion
                } else if ((org.visceralIntegrity || 1.0) < 1.0) {
                    gutDigestionRatio = ((org.visceralIntegrity || 1.0) - 0.60) / 0.40;
                }

                const carbonYield = sweepYield * this.baseDetritusYield * (org.detritusAssimilationEfficiency || 0.75) * gutDigestionRatio;

                if (org.energy && org.alive && carbonYield > 0) {
                    org.energy = Math.min(100.0, org.energy + carbonYield);
                    // Replenish coelomic lipid reserves from harvested dietary lipids
                    org.coelomicLipidReserve = Math.min(100.0, (org.coelomicLipidReserve || 70.0) + carbonYield * 0.25);
                }

                org.purifiedSedimentExcreted = (org.purifiedSedimentExcreted || 0.0) + sweepYield * 0.85;
                org.fecalPelletRate = (org.fecalPelletRate || 0.0) + sweepYield * 0.40;

                this.metrics.cumulativeSedimentProcessed += sweepYield;
                this.metrics.cumulativeCarbonHarvested += carbonYield;

                // Fecal pellet deposit event when accumulated pellet mass reaches threshold
                if (org.fecalPelletRate >= 2.0) {
                    org.fecalPelletRate = 0.0;
                    this.metrics.fecalPelletDeposits++;
                }
            }

            // 3. Cloacal Water Pumping, Parasite Intrusion & Respiratory Tree Aeration
            // Rhythmic cloacal contraction inhales and expels seawater into internal branched trees
            org.cloacalPhase = ((org.cloacalPhase || 0) + (org.cloacalPumpingRate || 0.35) * effDt * Math.PI * 2) % (Math.PI * 2);

            // Cloacal parasite intrusion dynamics (Carapidae pearlfish / inquiline parasites)
            // Holothurin saponin toxin barrier deters inquiline parasites
            if ((org.holothurinToxinPayload || 0.0) < 18.0) {
                const parasiteEntryProb = 0.012 * (org.cloacalPumpingRate || 0.35) * (1.0 - (org.holothurinToxinPayload || 0.0) / 18.0) * effDt * 60.0;
                if (Math.random() < parasiteEntryProb) {
                    org.respiratoryParasiteLoad = Math.min(1.0, (org.respiratoryParasiteLoad || 0.0) + 0.05);
                    this.metrics.parasiteIntrusionEvents++;
                }
            } else {
                // High holothurin concentration gradually purges infesting parasites
                org.respiratoryParasiteLoad = Math.max(0.0, (org.respiratoryParasiteLoad || 0.0) - 0.02 * effDt * 60.0);
            }

            // Parasitic load impairs gas exchange by up to 50%
            const parasiteImpairment = (org.respiratoryParasiteLoad || 0.0) * 0.50;
            const effectiveTreeEfficiency = Math.max(0.20, (org.respiratoryTreeEfficiency || 0.70) * (1.0 - parasiteImpairment));
            const ventilationPotency = effectiveTreeEfficiency * (0.8 + Math.sin(org.cloacalPhase) * 0.2);

            // Metabolic efficiency bonus from internal coelomic oxygenation
            const aerationBonus = 0.002 * ventilationPotency * effDt * 60.0;
            if (org.energy && org.alive) {
                org.energy = Math.min(100.0, org.energy + aerationBonus);
            }

            // 4. Autonomic Visceral Evisceration (Emergency Defense / Parasite Purge)
            // Triggered under severe predator damage (energy < 22.0 near carnivore) or acute parasite infestation (> 0.70)
            let threatDistanceSq = 999999;
            if (Array.isArray(organisms)) {
                const len = organisms.length;
                for (let j = 0; j < len; j++) {
                    const other = organisms[j];
                    if (!other || !other.alive || other === org) continue;
                    if (other.niche === "carnivore" || (other.dna && (other.dna.aggression || 0) > 0.60)) {
                        const dx = other.x - org.x;
                        const dy = other.y - org.y;
                        const d2 = dx * dx + dy * dy;
                        if (d2 < threatDistanceSq) threatDistanceSq = d2;
                    }
                }
            }

            const isCriticalPredatorThreat = (threatDistanceSq < 1600.0 && (org.energy && org.energy < 26.0));
            const isSevereParasiteInfestation = ((org.respiratoryParasiteLoad || 0.0) > 0.70);

            if ((isCriticalPredatorThreat || isSevereParasiteInfestation) && (org.visceralIntegrity || 1.0) > 0.75) {
                // Eviscerate: Expel digestive tract, respiratory trees, and gonads through cloaca
                org.visceralIntegrity = 0.0;
                org.isEviscerated = true;
                org.evisceratedVisceraDecoyTimer = 4.0; // Visceral decoy distracts predators
                org.respiratoryParasiteLoad = 0.0; // Completely purges infesting parasites!

                this.metrics.eviscerationIncidents++;

                // Decoy effect: Nearest predators have attackCooldown locked as they consume discarded viscera
                if (Array.isArray(organisms)) {
                    for (let j = 0; j < organisms.length; j++) {
                        const other = organisms[j];
                        if (other && other.alive && other !== org && (other.niche === "carnivore")) {
                            const dx = other.x - org.x;
                            const dy = other.y - org.y;
                            if (dx * dx + dy * dy < 2025.0) {
                                other.attackCooldown = Math.max(other.attackCooldown || 0, 160);
                                other.vx = (other.vx || 0) * 0.2;
                                other.vy = (other.vy || 0) * 0.2;
                            }
                        }
                    }
                }

                if (typeof addRipple === "function") {
                    addRipple(org.x, org.y, 168, 85, 247); // Royal violet evisceration burst
                }
            }

            // 5. Mesenteric Visceral Regeneration
            // If visceral integrity is depleted, stem cells proliferate to reconstruct gut and respiratory trees
            if ((org.visceralIntegrity || 1.0) < 1.0 && org.energy && org.alive) {
                // Regeneration potency constrained by coelomic lipid reserves
                const lipidSupportFactor = (org.coelomicLipidReserve || 0.0) > 15.0 ? 1.0 : 0.35;
                const regenPotency = (org.visceralRegenerationRate || 0.035) * lipidSupportFactor * effDt * 60.0;

                org.visceralIntegrity = Math.min(1.0, (org.visceralIntegrity || 0.0) + regenPotency);

                // Metabolic energy tax for building visceral protein matrix
                const regenCost = (org.visceralRegenerationMetabolicTax || 0.005) * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - regenCost);

                if (org.visceralIntegrity >= 1.0 && org.isEviscerated) {
                    org.isEviscerated = false;
                    this.metrics.visceralRegenerationEvents++;
                }
            }

            // 6. Cuvierian Tubules Defense Ejection against Approaching Predators
            if (Array.isArray(organisms) && (org.cuvierianTubulesReserve || 0) >= 4 && (org.activeTubuleEjectionCooldown || 0) <= 0) {
                const len = organisms.length;
                for (let j = 0; j < len; j++) {
                    const other = organisms[j];
                    if (!other || !other.alive || other === org) continue;

                    const isThreat = (other.niche === "carnivore" || (other.dna && (other.dna.aggression || 0) > 0.60));
                    if (!isThreat) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 2116.0) { // < 46.0 px proximity
                        // Fire defensive volley of sticky Cuvierian tubules towards attacking predator
                        const tubulesFired = Math.min(8, Math.floor(org.cuvierianTubulesReserve * 0.35) + 3);
                        org.cuvierianTubulesReserve = Math.max(0, org.cuvierianTubulesReserve - tubulesFired);
                        org.tubulesEjectedTransient = tubulesFired;
                        org.activeTubuleEjectionCooldown = 3.2;

                        // Predator immobilization: Tensile protein tubules expand and entangle predator
                        const adhesion = org.tubuleAdhesionStrength || 0.85;
                        other.vx = (other.vx || 0) * (1.0 - adhesion * 0.85); // Up to 85% velocity penalty
                        other.vy = (other.vy || 0) * (1.0 - adhesion * 0.85);

                        // Predator attack lockout cooldown
                        other.attackCooldown = Math.max(other.attackCooldown || 0, 100);

                        // Holothurin saponin toxin release: chemical deterrence burns predator tissue
                        const toxinDischarged = Math.min(10.0, org.holothurinToxinPayload * 0.25);
                        org.holothurinToxinPayload = Math.max(0.0, org.holothurinToxinPayload - toxinDischarged);
                        if (other.energy) {
                            other.energy = Math.max(1.0, other.energy - toxinDischarged * this.holothurinToxicityFactor);
                        }

                        this.metrics.tubuleEjectionIncidents++;
                        this.metrics.predatorImmobilizationEvents++;
                        this.metrics.cumulativeHolothurinDispersed += toxinDischarged;

                        if (typeof addRipple === "function") {
                            addRipple(org.x, org.y, 14, 165, 233);
                        }
                        break;
                    }
                }
            }

            // 7. Coelomic Cuvierian Tubule & Holothurin Regeneration
            if ((org.cuvierianTubulesReserve || 0) < (org.maxCuvierianTubules || 30) && org.energy && org.alive) {
                const regenPotency = this.baseTubuleRegenRate * effDt * 60.0;
                org.cuvierianTubulesReserve = Math.min(org.maxCuvierianTubules || 30, (org.cuvierianTubulesReserve || 0) + regenPotency * 0.12);
                org.holothurinToxinPayload = Math.min(org.maxHolothurinPayload || 50.0, (org.holothurinToxinPayload || 0.0) + regenPotency * 0.22);

                const synthesisCost = 0.002 * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - synthesisCost);
            }

            // 8. 89th Channel Formula (% CDI - Cuvierian Defense Index)
            const reserveScore = Math.min(1.0, (org.cuvierianTubulesReserve || 0) / 25.0);
            const adhesionScore = Math.min(1.0, (org.tubuleAdhesionStrength || 0.82) / 0.95);
            const toxinScore = Math.min(1.0, (org.holothurinToxinPayload || 25.0) / 45.0);
            const aerationScore = Math.min(1.0, effectiveTreeEfficiency / 0.90);

            org.cuvierianDefenseIndex = Math.max(0.0, Math.min(1.0,
                (reserveScore * 0.30) + (adhesionScore * 0.25) + (toxinScore * 0.25) + (aerationScore * 0.20)
            ));

            // 9. 90th Channel Formula (% VRI - Visceral Regeneration Index)
            // Synthesizes visceral integrity (35%), mesenteric stem regeneration rate (30%),
            // coelomic lipid buffer (20%), and cloacal parasite resistance (15%)
            const visceralScore = Math.max(0.0, Math.min(1.0, org.visceralIntegrity || 0.0));
            const mesentericScore = Math.min(1.0, (org.visceralRegenerationRate || 0.035) / 0.05);
            const lipidScore = Math.min(1.0, (org.coelomicLipidReserve || 0.0) / 80.0);
            const parasiteResistScore = Math.max(0.0, 1.0 - (org.respiratoryParasiteLoad || 0.0));

            org.visceralRegenerationIndex = Math.max(0.0, Math.min(1.0,
                (visceralScore * 0.35) + (mesentericScore * 0.30) + (lipidScore * 0.20) + (parasiteResistScore * 0.15)
            ));
        }

        /**
         * Update all organisms across the ecosystem and compute global holothuroid metrics.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time delta in seconds.
         */
        updateAll(organisms, dt) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let holoCount = 0;
            let activeDepositCount = 0;
            let evisceratedCount = 0;

            let sumTubules = 0;
            let sumAdhesion = 0.0;
            let sumToxin = 0.0;
            let sumIngestion = 0.0;
            let sumFecal = 0.0;
            let sumCloacal = 0.0;
            let sumViscera = 0.0;
            let sumLipids = 0.0;
            let sumParasite = 0.0;
            let sumCDI = 0.0;
            let sumVRI = 0.0;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const len = organisms.length;

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, organisms);

                if (org.hasHolothuroidTrait) {
                    holoCount++;
                    sumTubules += (org.cuvierianTubulesReserve || 0);
                    sumAdhesion += (org.tubuleAdhesionStrength || 0.0);
                    sumToxin += (org.holothurinToxinPayload || 0.0);
                    sumIngestion += (org.sedimentIngestionRate || 0.0);
                    sumFecal += (org.fecalPelletRate || 0.0);
                    sumCloacal += (org.cloacalPumpingRate || 0.0);
                    sumViscera += (org.visceralIntegrity || 0.0);
                    sumLipids += (org.coelomicLipidReserve || 0.0);
                    sumParasite += (org.respiratoryParasiteLoad || 0.0);
                    sumCDI += (org.cuvierianDefenseIndex || 0.0);
                    sumVRI += (org.visceralRegenerationIndex || 0.0);

                    if (org.y >= 310.0 && (org.energy && org.energy < 92.0)) {
                        activeDepositCount++;
                    }
                    if ((org.visceralIntegrity || 1.0) < 0.60) {
                        evisceratedCount++;
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalHolothuroidOrganisms = holoCount;
            this.metrics.holothuroidPrevalence = liveCount > 0 ? (holoCount / liveCount) : 0.0;
            this.metrics.activeDepositFeeders = activeDepositCount;
            this.metrics.evisceratedOrganisms = evisceratedCount;
            this.metrics.meanTubulesReserve = holoCount > 0 ? (sumTubules / holoCount) : 0.0;
            this.metrics.meanAdhesionStrength = holoCount > 0 ? (sumAdhesion / holoCount) : 0.0;
            this.metrics.meanHolothurinPayload = holoCount > 0 ? (sumToxin / holoCount) : 0.0;
            this.metrics.meanSedimentIngested = holoCount > 0 ? (sumIngestion / holoCount) : 0.0;
            this.metrics.meanFecalPelletRate = holoCount > 0 ? (sumFecal / holoCount) : 0.0;
            this.metrics.meanCloacalVentilation = holoCount > 0 ? (sumCloacal / holoCount) : 0.0;
            this.metrics.meanVisceralIntegrity = holoCount > 0 ? (sumViscera / holoCount) : 0.0;
            this.metrics.meanCoelomicLipids = holoCount > 0 ? (sumLipids / holoCount) : 0.0;
            this.metrics.meanParasiteLoad = holoCount > 0 ? (sumParasite / holoCount) : 0.0;
            this.metrics.meanCuvierianDefenseIndex = holoCount > 0 ? (sumCDI / holoCount) : 0.0;
            this.metrics.meanVisceralRegenerationIndex = holoCount > 0 ? (sumVRI / holoCount) : 0.0;
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
         * @returns {Object} Comprehensive Holothuroid Cuvierian metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HolothuroidCuvierianManager;
    }
    if (typeof global !== "undefined") {
        global.HolothuroidCuvierianManager = HolothuroidCuvierianManager;
        global.holothuroidCuvierianManager = new HolothuroidCuvierianManager();
    }
})(typeof window !== "undefined" ? window : global);
