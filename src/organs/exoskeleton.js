// BioEcosystem - Biomineralized Exoskeleton, Hydrostatic Sclerite Armor & Ecdysis Molting System
// Module: src/organs/exoskeleton.js
// Version: 4.97.0 (Hour 217 - System Agent Ecdysis Cycle, Soft-Shell Vulnerability & Exuvia Shedding)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class ExoskeletonSystem {
        constructor(organism) {
            this.organism = organism;

            // Physical Cuticular & Biomineralization State
            this.cuticleThickness = 0.0;       // Mineralized procuticle thickness in microns [0.0 - 5.0]
            this.scleriteHardness = 0.10;      // Mohs-scaled biomineralization hardness [0.0 - 1.0]
            this.punctureThreshold = 0.0;      // Critical yield force required to penetrate carapace
            this.armorAbsorption = 0.0;        // Base kinetic damage mitigation ratio [0.0 - 0.75]
            this.hydrostaticCushion = 1.0;     // Internal coelomic hydraulic shock absorption factor [1.0 - 1.35]
            this.effectiveAbsorption = 0.0;    // Combined armor + coelom damage deflection ratio [0.0 - 0.75]
            this.jointFlexibility = 1.0;       // Articular membrane elasticity [0.2 - 2.5]
            this.massPenaltyMultiplier = 1.0;  // Inertial drag modifier from biomineral mass
            this.structuralIntegrity = 100.0;  // Cuticular durability percentage [0.0 - 100.0]
            this.deflectedStrikesCount = 0;    // Lifetime count of deflected predator strikes
            this.absorbedDamageTotal = 0.0;    // Lifetime kinetic damage absorbed

            // Ecdysis (Molting Cycle) Dynamics (System Agent v4.97.0)
            this.ecdysoneTiter = 0.0;          // Hormonal accumulation toward molting [0.0 - 100.0]
            this.isMolting = false;            // True during vulnerable soft-cuticle post-ecdysis stage
            this.softCuticleTimer = 0;         // Remaining ticks of soft-shell vulnerability
            this.ecdysisCount = 0;             // Number of successful ecdysis molting cycles
            this.instarLevel = 1;              // Current arthropod developmental instar stage
            this.pendingExuvia = null;         // Exuvia husk ready to be spawned on seafloor
        }

        // Core physiological update for cuticle calcification, ecdysis hormonal cycles, and soft-shell recovery
        update(dt = 0.016) {
            const org = this.organism;
            const dna = org.dna;
            if (!dna) return;

            const bioMinRate = dna.cuticleBiomineralizationRate || 0.0;
            const plateHardnessTrait = dna.scleritePlateHardness || 0.3;
            const jointFlex = dna.articularJointFlexibility || 1.0;
            const ecdCadence = dna.ecdysteroidCadence || 0.6;
            const growthSurge = dna.ecdysisGrowthSurge || 0.5;

            const hasExoskeleton = bioMinRate >= 0.20;
            org.hasExoskeleton = hasExoskeleton;

            if (!hasExoskeleton) {
                this.cuticleThickness = 0.0;
                this.scleriteHardness = 0.10;
                this.punctureThreshold = 0.0;
                this.armorAbsorption = 0.0;
                this.effectiveAbsorption = 0.0;
                this.massPenaltyMultiplier = 1.0;
                this.structuralIntegrity = 100.0;
                this.isMolting = false;
                this.softCuticleTimer = 0;
                org.cuticleThickness = 0.0;
                org.armorAbsorption = 0.0;
                org.effectiveAbsorption = 0.0;
                org.isMolting = false;
                return;
            }

            // 1. Post-Ecdysis Soft-Shell Vulnerable Stage Management
            if (this.isMolting) {
                this.softCuticleTimer--;
                this.effectiveAbsorption = 0.0; // ZERO armor absorption while soft!
                this.armorAbsorption = 0.0;
                this.massPenaltyMultiplier = 1.0; // Burst mobility without shell weight
                this.punctureThreshold = 0.5;
                org.seekingCreviceHaven = true; // Instinctively seek reef crevices to hide

                if (this.softCuticleTimer <= 0) {
                    this.isMolting = false;
                    org.isMolting = false;
                    org.seekingCreviceHaven = false;
                    this.structuralIntegrity = 100.0; // Fresh pristine new shell
                }
            } else {
                // 2. Intermolt Cuticular Calcification & Biomineral Hardening
                const instarMaxThickness = Math.min(5.0, 1.2 + this.instarLevel * 0.75 * bioMinRate);
                const calcRate = 0.035 * bioMinRate;
                this.cuticleThickness = Math.min(instarMaxThickness, this.cuticleThickness + calcRate);

                // Sclerite hardness scales with plateHardness and cuticle maturity
                this.scleriteHardness = Math.max(0.12, Math.min(1.0, plateHardnessTrait * (0.5 + (this.cuticleThickness / 4.0) * 0.5)));

                // Puncture threshold
                this.punctureThreshold = 14.5 * this.scleriteHardness * Math.max(0.2, this.cuticleThickness);

                // Hydrostatic coelom hydraulic shock cushion
                const hydroPressure = typeof org.hydrostaticPressure === "number" ? org.hydrostaticPressure : 0.0;
                this.hydrostaticCushion = 1.0 + Math.min(0.35, (hydroPressure / 60.0) * 0.35);

                // Effective damage deflection (up to 75% deflection with coelom synergy)
                const baseCalc = (this.cuticleThickness / 4.0) * this.scleriteHardness * 0.70;
                this.armorAbsorption = Math.min(0.65, baseCalc);
                this.effectiveAbsorption = Math.min(0.75, this.armorAbsorption * this.hydrostaticCushion * (this.structuralIntegrity / 100.0));

                // Inertial mass penalty
                this.massPenaltyMultiplier = 1.0 + (this.cuticleThickness * 0.062);

                // 3. Hormonal Ecdysone Accumulation (Turgor expansion pressure against rigid shell)
                const energyTurgor = Math.max(0.1, (org.energy || 50.0) / 100.0);
                this.ecdysoneTiter += (dt || 0.016) * ecdCadence * 3.2 * energyTurgor;

                // 4. Trigger Ecdysis Molting Event
                if (this.ecdysoneTiter >= 100.0 && this.cuticleThickness >= 0.8) {
                    this.triggerEcdysis(growthSurge);
                }
            }

            // 5. Joint Flexibility
            this.jointFlexibility = jointFlex;

            // 6. Shell Mineralization Maintenance Tax (only during intermolt when calcified)
            if (!this.isMolting && this.cuticleThickness > 0.4) {
                const mineralTax = 0.0032 * this.cuticleThickness;
                org.energy = Math.max(0.0, org.energy - mineralTax);
            }

            // Sync properties to organism instance
            org.cuticleThickness = Number(this.cuticleThickness.toFixed(2));
            org.armorAbsorption = Number(this.armorAbsorption.toFixed(3));
            org.effectiveAbsorption = Number(this.effectiveAbsorption.toFixed(3));
            org.scleriteHardness = Number(this.scleriteHardness.toFixed(2));
            org.punctureThreshold = Number(this.punctureThreshold.toFixed(1));
            org.hydrostaticCushion = Number(this.hydrostaticCushion.toFixed(2));
            org.massPenaltyMultiplier = Number(this.massPenaltyMultiplier.toFixed(3));
            org.structuralIntegrity = Number(this.structuralIntegrity.toFixed(1));
            org.isMolting = this.isMolting;
            org.softCuticleTimer = this.softCuticleTimer;
            org.ecdysisCount = this.ecdysisCount;
            org.instarLevel = this.instarLevel;
            org.ecdysoneTiter = Number(this.ecdysoneTiter.toFixed(1));
        }

        // Trigger ecdysis: crack old carapace, spawn exuvia, and initiate saltatory growth
        triggerEcdysis(growthSurge) {
            const org = this.organism;

            // Prepare exuvia husk data for seafloor spawning
            this.pendingExuvia = {
                x: org.x,
                y: org.y,
                mass: Math.max(10.0, this.cuticleThickness * 5.5),
                thickness: this.cuticleThickness,
                hardness: this.scleriteHardness,
                hue: (org.dna.hue || 34),
                size: (org.dna.size || 6.0)
            };

            // Enter soft-shell vulnerable stage
            this.isMolting = true;
            this.softCuticleTimer = 180; // ~3 seconds at 60 FPS
            this.ecdysoneTiter = 0.0;
            this.ecdysisCount++;
            this.instarLevel++;

            // Saltatory Growth Surge: Discrete size jump upon escaping rigid cuticle
            const curSize = org.dna.size || 6.0;
            const deltaSize = curSize * (0.06 + growthSurge * 0.10);
            org.dna.size = Math.min(13.5, curSize + deltaSize);

            // Shell resets to uncalcified soft procuticle
            this.cuticleThickness = 0.25;
            this.scleriteHardness = 0.08;
            this.armorAbsorption = 0.0;
            this.effectiveAbsorption = 0.0;
            this.structuralIntegrity = 100.0;
        }

        // Harvest and clear pending exuvia husk
        popPendingExuvia() {
            const ex = this.pendingExuvia;
            this.pendingExuvia = null;
            return ex;
        }

        // Mitigate incoming predatory bite force or collision trauma
        mitigateDamage(incomingDamage, strikeForce = 10.0) {
            if (!this.organism || !this.organism.hasExoskeleton || this.isMolting || this.effectiveAbsorption <= 0.01) {
                // Soft-shell or unarmored takes full unmitigated damage
                return { netDamage: incomingDamage, absorbedDamage: 0.0, deflected: false, softShellHit: this.isMolting };
            }

            const isGlancingDeflection = strikeForce < this.punctureThreshold;
            const effectiveRatio = isGlancingDeflection ? Math.min(0.85, this.effectiveAbsorption * 1.25) : this.effectiveAbsorption;

            const absorbed = incomingDamage * effectiveRatio;
            const netDamage = Math.max(0.0, incomingDamage - absorbed);
            this.absorbedDamageTotal += absorbed;

            if (isGlancingDeflection) {
                this.deflectedStrikesCount++;
            }

            const wearFactor = isGlancingDeflection ? 0.06 : 0.16;
            this.structuralIntegrity = Math.max(15.0, this.structuralIntegrity - absorbed * wearFactor);

            return {
                netDamage: Number(netDamage.toFixed(2)),
                absorbedDamage: Number(absorbed.toFixed(2)),
                deflected: isGlancingDeflection,
                softShellHit: false
            };
        }

        // Return telemetry snapshot for Inspector & HUD
        getTelemetry() {
            return {
                hasExoskeleton: !!(this.organism && this.organism.hasExoskeleton),
                isMolting: this.isMolting,
                softCuticleTimer: this.softCuticleTimer,
                instarLevel: this.instarLevel,
                ecdysisCount: this.ecdysisCount,
                ecdysoneTiter: Number(this.ecdysoneTiter.toFixed(1)),
                cuticleThickness: Number(this.cuticleThickness.toFixed(2)),
                scleriteHardness: Number(this.scleriteHardness.toFixed(2)),
                punctureThreshold: Number(this.punctureThreshold.toFixed(1)),
                armorAbsorptionPct: Number((this.armorAbsorption * 100).toFixed(1)),
                effectiveAbsorptionPct: Number((this.effectiveAbsorption * 100).toFixed(1)),
                hydrostaticCushion: Number(this.hydrostaticCushion.toFixed(2)),
                massPenaltyMultiplier: Number(this.massPenaltyMultiplier.toFixed(2)),
                structuralIntegrity: Number(this.structuralIntegrity.toFixed(1)),
                deflectedStrikesCount: this.deflectedStrikesCount,
                absorbedDamageTotal: Number(this.absorbedDamageTotal.toFixed(1))
            };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ExoskeletonSystem;
    } else {
        global.ExoskeletonSystem = ExoskeletonSystem;
    }
})(typeof window !== "undefined" ? window : global);
