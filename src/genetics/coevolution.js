// BioEcosystem - Inter-Species Coevolution, Symbiotic Mutualism & Red Queen Dynamics
// Module: src/genetics/coevolution.js
// Version: 5.87.0 (Hour 307 - System Agent: Cleaning Stations, Ectoparasite Load & Chitinase)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CoevolutionSystem
     * Models community-level ecological genetics and inter-species coevolution:
     * - Benthic cleaning stations and client solicitation postures (cleaning truce)
     * - Ectoparasite load dynamics, host deceleration, and mutualist exfoliation
     * - Red Queen counter-adaptation: predator chitinase enzymes vs prey armor shields
     * - Interspecific trophic synergy and genomic heterozygosity polymorphism
     */
    class CoevolutionSystem {
        constructor(organism) {
            this.organism = organism;
            const dna = (organism && organism.dna) ? organism.dna : {};

            this.mutualismAffinity = typeof dna.symbiosisAffinity === "number" ? dna.symbiosisAffinity : 0.25;
            this.trophicPlasticity = typeof dna.bioenergeticPartitioning === "number" ? dna.bioenergeticPartitioning : 0.50;

            // Mutualism state variables
            this.mutualismPartnerId = null;
            this.mutualismSynergy = 0.0;
            this.cleaningSymbiosisActive = false;
            this.cleanerMutualismGain = 0.0;
            this.mutualismBondDuration = 0;
            this.cleaningCooldown = 0;

            // Cleaning station & solicitation postures (Hour 307 System Agent)
            this.isCleaningStation = Boolean(organism && organism.niche === "scavenger" && this.mutualismAffinity > 0.40);
            this.solicitationPoseActive = false;
            this.cleaningTruceActive = false;

            // Ectoparasite load kinetics [0.0 - 1.0]
            this.ectoparasiteLoad = 0.05;
            this.parasiteAccumulationRate = 0.0008;

            // Red Queen arms race & predator counter-adaptations
            this.redQueenPressure = 0.15;
            this.chitinaseBiteModifier = 1.0;
            this.heterozygosityScore = 0.50;
            this.conspecificHomogeneity = 0.0;

            // Diagnostic flags
            this.coevolutionActive = true;
        }

        /**
         * Evaluate inter-specific mutualism, cleaning stations, and solicitation.
         */
        evaluateMutualism(nearbyOrganisms, tick) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (this.cleaningCooldown > 0) this.cleaningCooldown--;

            this.cleaningSymbiosisActive = false;
            this.cleanerMutualismGain = 0.0;
            this.solicitationPoseActive = false;
            this.cleaningTruceActive = false;

            // Natural ectoparasite / biofilm fouling accumulation (accelerated in clonal monocultures)
            const clonePenalty = this.conspecificHomogeneity * 0.0015;
            this.ectoparasiteLoad = Math.min(1.0, this.ectoparasiteLoad + this.parasiteAccumulationRate + clonePenalty);

            // Ectoparasites impose physical drag and metabolic friction
            if (this.ectoparasiteLoad > 0.25) {
                const dragFactor = 1.0 - (this.ectoparasiteLoad - 0.25) * 0.35;
                org.vx *= dragFactor;
                org.vy *= dragFactor;
            }

            if (!Array.isArray(nearbyOrganisms) || nearbyOrganisms.length === 0) {
                this.mutualismBondDuration = Math.max(0, this.mutualismBondDuration - 1);
                this.mutualismSynergy = Math.max(0.0, this.mutualismSynergy * 0.95);
                return;
            }

            const searchRadius = (org.dna && org.dna.size ? org.dna.size : 6) * 4.2;
            let closestPartner = null;
            let minDistance = searchRadius;

            // 1. Scavenger cleaning mutualist behavior
            if (org.niche === "scavenger" && this.cleaningCooldown <= 0) {
                for (let i = 0; i < nearbyOrganisms.length; i++) {
                    const other = nearbyOrganisms[i];
                    if (!other || !other.alive || other === org) continue;
                    if (other.niche !== "herbivore" && !other.isCephalicGanglion) continue;

                    const dist = Math.hypot(other.x - org.x, other.y - org.y);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestPartner = other;
                    }
                }

                if (closestPartner) {
                    this.cleaningSymbiosisActive = true;
                    this.cleaningTruceActive = true;
                    this.mutualismPartnerId = closestPartner.id || null;
                    this.mutualismBondDuration++;

                    // Client enters solicitation pose (gentle deceleration for thorough cleaning)
                    if (closestPartner.coevolutionSystem) {
                        closestPartner.coevolutionSystem.solicitationPoseActive = true;
                        closestPartner.coevolutionSystem.cleaningTruceActive = true;
                        closestPartner.coevolutionSystem.ectoparasiteLoad = Math.max(0.0, closestPartner.coevolutionSystem.ectoparasiteLoad - 0.05);
                    }

                    // Cleaner metabolizes exfoliated parasites into energetic yield
                    const transferYield = 0.22 * (1.0 + this.mutualismAffinity);
                    this.cleanerMutualismGain = transferYield;
                    org.energy = Math.min(225.0, org.energy + transferYield);

                    // Client benefits: parasite removal, infection cure, metabolic recovery
                    closestPartner.energy = Math.min(225.0, closestPartner.energy + 0.12);
                    if (closestPartner.infected && Math.random() < 0.12) {
                        closestPartner.infected = false;
                    }

                    this.mutualismSynergy = Math.min(1.0, 0.30 + this.mutualismBondDuration * 0.015);
                    this.cleaningCooldown = 5;
                    return;
                }
            }

            // 2. Client / Pelagic grazer seeking cleaning stations or mutualist partner
            for (let i = 0; i < nearbyOrganisms.length; i++) {
                const other = nearbyOrganisms[i];
                if (!other || !other.alive || other === org) continue;
                if (other.niche === org.niche || other.niche === "carnivore") continue;

                const dist = Math.hypot(other.x - org.x, other.y - org.y);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestPartner = other;
                }
            }

            if (closestPartner && minDistance < searchRadius * 0.75) {
                this.mutualismPartnerId = closestPartner.id || null;
                this.mutualismBondDuration++;
                const mutualAff = (this.mutualismAffinity + (otherPartnerAffinity(closestPartner))) * 0.5;
                this.mutualismSynergy = Math.min(1.0, this.mutualismBondDuration * 0.012 + mutualAff * 0.35);

                if (closestPartner.niche === "scavenger" && this.ectoparasiteLoad > 0.20) {
                    this.solicitationPoseActive = true;
                    this.cleaningTruceActive = true;
                    org.vx *= 0.70;
                    org.vy *= 0.70;
                }

                if (this.mutualismSynergy > 0.35) {
                    org.collectiveDeterrenceBonus = this.mutualismSynergy * 0.32;
                }
            } else {
                this.mutualismBondDuration = Math.max(0, this.mutualismBondDuration - 1);
                this.mutualismSynergy = Math.max(0.0, this.mutualismSynergy * 0.94);
                if (this.mutualismBondDuration === 0) this.mutualismPartnerId = null;
            }
        }

        /**
         * Evaluate Red Queen arms race, chitinase enzyme and genomic diversity.
         */
        evaluateRedQueenDynamics(nearbyOrganisms, tick) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (!Array.isArray(nearbyOrganisms) || nearbyOrganisms.length === 0) return;

            let conspecificCount = 0;
            let totalGeneticDistance = 0.0;
            let predatorPressureAccum = 0.0;
            let preyDefenseAccum = 0.0;
            const senseRange = (org.dna && org.dna.sight) ? org.dna.sight : 75.0;

            for (let i = 0; i < nearbyOrganisms.length; i++) {
                const other = nearbyOrganisms[i];
                if (!other || !other.alive || other === org) continue;

                const dist = Math.hypot(other.x - org.x, other.y - org.y);
                if (dist > senseRange) continue;

                // Conspecific genetic diversity check
                if (other.niche === org.niche) {
                    conspecificCount++;
                    const hueDiff = Math.abs((org.dna ? org.dna.hue : 180) - (other.dna ? other.dna.hue : 180));
                    const normHueDiff = Math.min(hueDiff, 360 - hueDiff) / 180.0;
                    totalGeneticDistance += normHueDiff;
                }

                // Predator-prey arms race tension
                if (org.niche === "carnivore" && other.niche === "herbivore") {
                    const defenseScore = (other.effectiveAbsorption || 0.0) + (other.predationDeterrence || 0.0) + (other.toolUseEquipped ? 0.35 : 0.0);
                    preyDefenseAccum += defenseScore;
                } else if (org.niche === "herbivore" && other.niche === "carnivore") {
                    const attackScore = (other.dna ? other.dna.speed : 1.2) * 0.4 + (other.neuromuscularDrive || 0.0) * 0.6;
                    predatorPressureAccum += attackScore;
                }
            }

            // 1. Calculate conspecific genomic polymorphism
            if (conspecificCount > 0) {
                const meanGenDist = totalGeneticDistance / conspecificCount;
                this.heterozygosityScore = Math.max(0.05, Math.min(1.0, meanGenDist * 1.6));
                this.conspecificHomogeneity = Math.max(0.0, 1.0 - this.heterozygosityScore);
            } else {
                this.heterozygosityScore = 0.50;
                this.conspecificHomogeneity = 0.0;
            }

            // 2. Red Queen counter-adaptation & predator chitinase synthesis
            if (org.niche === "carnivore") {
                this.redQueenPressure = Math.min(1.0, 0.15 + (preyDefenseAccum * 0.35));
                this.chitinaseBiteModifier = Number((1.0 + this.redQueenPressure * 1.5).toFixed(2));
            } else {
                this.redQueenPressure = Math.min(1.0, 0.15 + (predatorPressureAccum * 0.40));
                this.chitinaseBiteModifier = 1.0;
            }
        }

        step(tick, nearbyOrganisms = []) {
            const org = this.organism;
            if (!org || !org.alive) return;

            this.evaluateMutualism(nearbyOrganisms, tick);
            this.evaluateRedQueenDynamics(nearbyOrganisms, tick);

            // Expose synchronized properties on host organism
            org.mutualismPartnerId = this.mutualismPartnerId;
            org.mutualismSynergy = Number(this.mutualismSynergy.toFixed(3));
            org.cleaningSymbiosisActive = this.cleaningSymbiosisActive;
            org.cleanerMutualismGain = Number(this.cleanerMutualismGain.toFixed(2));
            org.solicitationPoseActive = this.solicitationPoseActive;
            org.cleaningTruceActive = this.cleaningTruceActive;
            org.ectoparasiteLoad = Number(this.ectoparasiteLoad.toFixed(3));
            org.redQueenPressure = Number(this.redQueenPressure.toFixed(3));
            org.chitinaseBiteModifier = this.chitinaseBiteModifier;
            org.heterozygosityScore = Number(this.heterozygosityScore.toFixed(3));
            org.isCleaningStation = this.isCleaningStation;
            org.coevolutionActive = true;
        }

        cleanup() {
            this.organism = null;
            this.mutualismPartnerId = null;
            this.mutualismSynergy = 0.0;
            this.cleaningSymbiosisActive = false;
            this.cleanerMutualismGain = 0.0;
            this.solicitationPoseActive = false;
            this.cleaningTruceActive = false;
            this.ectoparasiteLoad = 0.05;
            this.redQueenPressure = 0.0;
            this.chitinaseBiteModifier = 1.0;
            this.heterozygosityScore = 0.5;
            this.mutualismBondDuration = 0;
            this.coevolutionActive = false;
        }
    }

    function otherPartnerAffinity(other) {
        if (!other || !other.dna) return 0.20;
        return typeof other.dna.symbiosisAffinity === "number" ? other.dna.symbiosisAffinity : 0.20;
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CoevolutionSystem;
    } else {
        global.CoevolutionSystem = CoevolutionSystem;
    }
})(typeof window !== "undefined" ? window : global);
