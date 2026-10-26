// BioEcosystem - Symbiotic Photophore Organs, Luciferase Photonics & Quorum Bioluminescence
// Module: src/organs/symbiotic_photophores.js
// Version: 6.67.0 (Hour 387 - System Agent: Retinal Bleaching, Photonic Quenching & Pulsatile Crypsis)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SymbioticPhotophoresManager
     * High-fidelity biological simulation of deep pelagic and twilight photophores:
     * - Multicellular photophore organ clusters (photophoreOrgans) with guanine reflector backplates
     * - Luciferin-luciferase catalytic chemiluminescence with energetic substrate recycling (photonicEnergyRecycling)
     * - Counter-illumination ventral crypsis matching downwelling light with pulsatile emission mode
     * - Photonic quenching factor (photonicQuenchingFactor) preventing light jamming and thermal saturation
     * - Emergency flash evasion triggering retinal bleaching (retinalSaturationTicks) in apex predators
     */
    class SymbioticPhotophoresManager {
        constructor() {
            this.maxOrgans = 12.0;
            this.baseQuorumRadius = 95.0;
            this.quorumThreshold = 3;
            this.flashEvasionRadius = 65.0;
            this.baseAtpCost = 0.024;

            this.metrics = {
                totalLiveCells: 0,
                totalPhotophoreCells: 0,
                photophorePrevalence: 0.0,
                meanPhotophoreOrgans: 0.0,
                meanLuciferaseEfficiency: 0.0,
                meanCounterIllumination: 0.0,
                meanQuorumSynchronization: 0.0,
                meanGuanineCollimation: 0.0,
                meanQuenchingFactor: 1.0,
                meanRecyclingEfficiency: 0.0,
                activeFlashDischarges: 0,
                cumulativeFlashCount: 0,
                cumulativePhotonsEmitted: 0.0,
                cumulativeATPInvested: 0.0,
                blindedPredatorCount: 0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            if (typeof org.photophoreOrgans === "undefined") {
                const isDeep = org.niche === "carnivore" || org.niche === "apex" || (org.y && org.y > 350);
                const hasTrait = (org.genes && org.genes.photophores) || (org.generation > 1 && Math.random() < 0.35) || isDeep;
                org.photophoreOrgans = hasTrait ? Math.floor(2 + Math.random() * 6) : 0;
            }

            if (typeof org.luciferaseEfficiency === "undefined") { org.luciferaseEfficiency = org.photophoreOrgans > 0 ? 0.45 + Math.random() * 0.45 : 0.0; }

            if (typeof org.luciferinSubstrate === "undefined") { org.luciferinSubstrate = org.photophoreOrgans > 0 ? 40.0 + Math.random() * 50.0 : 0.0; }

            if (typeof org.guanineReflectors === "undefined") { org.guanineReflectors = org.photophoreOrgans > 0 ? 0.35 + Math.random() * 0.55 : 0.0; }

            if (typeof org.counterIlluminationRatio === "undefined") { org.counterIlluminationRatio = 0.0; }

            if (typeof org.photonicPulse === "undefined") { org.photonicPulse = 0.0; }

            if (typeof org.isQuorumSynchronized === "undefined") { org.isQuorumSynchronized = false; }

            if (typeof org.flashCooldownTicks === "undefined") { org.flashCooldownTicks = 0; }

            if (typeof org.predatorBlindedTicks === "undefined") { org.predatorBlindedTicks = 0; }

            if (typeof org.retinalSaturationTicks === "undefined") { org.retinalSaturationTicks = 0; }

            if (typeof org.photonicQuenchingFactor === "undefined") { org.photonicQuenchingFactor = 1.0; }

            if (typeof org.pulsatileEmissionMode === "undefined") { org.pulsatileEmissionMode = false; }

            if (typeof org.photonicEnergyRecycling === "undefined") { org.photonicEnergyRecycling = org.photophoreOrgans > 0 ? 0.20 + Math.random() * 0.40 : 0.0; }

            if (typeof org.continuousEmissionTicks === "undefined") { org.continuousEmissionTicks = 0; }
        }

        updateOrganism(org, allOrganisms, tick) {
            if (!org || org.isDead || org.alive === false) return;
            SymbioticPhotophoresManager.initOrganism(org);

            // 1. Process sensory and retinal bleaching decay
            if (org.predatorBlindedTicks > 0) org.predatorBlindedTicks--;
            if (org.retinalSaturationTicks > 0) {
                org.retinalSaturationTicks--;
                // Impair predator velocity vector while blinded
                if (org.vx && org.vy && Math.random() < 0.25) {
                    org.vx *= 0.75;
                    org.vy *= 0.75;
                }
            }
            if (org.flashCooldownTicks > 0) org.flashCooldownTicks--;

            if (org.photophoreOrgans <= 0) {
                org.photonicPulse = 0.0;
                org.counterIlluminationRatio = 0.0;
                org.isQuorumSynchronized = false;
                return;
            }

            // 2. Regenerate substrate and compute thermal quenching
            if (org.luciferinSubstrate < 100.0) {
                org.luciferinSubstrate = Math.min(100.0, org.luciferinSubstrate + 0.14);
            }

            if (org.photonicPulse > 0.25) {
                org.continuousEmissionTicks = Math.min(180, org.continuousEmissionTicks + 1);
            } else {
                org.continuousEmissionTicks = Math.max(0, org.continuousEmissionTicks - 2);
            }

            // Photonic quenching dampens emission if organ is continuously overheating
            org.photonicQuenchingFactor = Math.max(0.35, 1.0 - (org.continuousEmissionTicks / 220.0));

            // Depth calculation and downwelling ambient flux
            const depth = org.y || 400.0;
            const ambientFlux = Math.max(0.04, Math.min(1.0, 1.0 - (depth / 850.0)));

            // 3. Substrate exhaustion check & Pulsatile emission mode
            org.pulsatileEmissionMode = org.luciferinSubstrate < 22.0 || (org.energy || 50.0) < 22.0;
            const pulseGate = org.pulsatileEmissionMode ? (Math.sin(tick * 0.22 + (org.id || 0)) > 0.15 ? 1.0 : 0.2) : 1.0;

            // 4. Counter-illumination ventral crypsis matching downwelling light
            if (org.luciferinSubstrate > 4.0 && (org.energy || 50.0) > 8.0) {
                const targetIntensity = ambientFlux * 0.85 * org.photonicQuenchingFactor * pulseGate;
                const matchRate = 0.09 * org.luciferaseEfficiency;
                org.counterIlluminationRatio += (targetIntensity - org.counterIlluminationRatio) * matchRate;
                org.counterIlluminationRatio = Math.max(0.0, Math.min(1.0, org.counterIlluminationRatio));

                // Metabolic expenditure with ATP recycling
                const grossCost = this.baseAtpCost * (org.photophoreOrgans / 6.0) * org.counterIlluminationRatio;
                const netCost = grossCost * (1.0 - (org.photonicEnergyRecycling * 0.65));
                if (org.energy) {
                    org.energy = Math.max(0.1, org.energy - netCost * 0.35);
                }
                this.metrics.cumulativeATPInvested += netCost * 0.35;
                org.luciferinSubstrate = Math.max(0.0, org.luciferinSubstrate - 0.012 * pulseGate);
            } else {
                org.counterIlluminationRatio *= 0.90;
            }

            // 5. Quorum Sensing and Predator Detection
            let quorumNeighbors = 0;
            let nearbyPredator = null;
            let minPredatorDist = 9999.0;
            const nLimit = Math.min(allOrganisms.length, 45);

            for (let i = 0; i < nLimit; i++) {
                const other = allOrganisms[i];
                if (!other || other.isDead || other.alive === false || other === org) continue;

                const dx = other.x - org.x;
                const dy = other.y - org.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < this.baseQuorumRadius * this.baseQuorumRadius && other.photophoreOrgans > 0) {
                    quorumNeighbors++;
                }

                const isOtherPredator = other.niche === "carnivore" || other.niche === "apex";
                if (isOtherPredator && org.niche !== "apex") {
                    const d = Math.sqrt(distSq);
                    if (d < minPredatorDist && d < this.flashEvasionRadius) {
                        minPredatorDist = d;
                        nearbyPredator = other;
                    }
                }
            }

            org.isQuorumSynchronized = quorumNeighbors >= this.quorumThreshold;
            const pulsePhase = Math.sin((tick * 0.08) + (org.id || 0) * 0.5);

            if (org.isQuorumSynchronized) {
                const synchronizedGlow = (0.5 + 0.5 * pulsePhase) * org.photonicQuenchingFactor;
                org.photonicPulse = Math.max(org.counterIlluminationRatio, synchronizedGlow * org.luciferaseEfficiency);
                if (org.vx && org.vy) {
                    org.vx *= 0.99;
                    org.vy *= 0.99;
                }
            } else {
                org.photonicPulse = org.counterIlluminationRatio;
            }

            // 6. Emergency Bioluminescent Flash Evasion with Retinal Bleaching
            if (nearbyPredator && org.flashCooldownTicks === 0 && org.luciferinSubstrate >= 20.0) {
                org.photonicPulse = 1.0;
                org.flashCooldownTicks = 75;
                org.luciferinSubstrate -= 18.0;

                // Induce intense retinal saturation & bleaching on predator
                nearbyPredator.predatorBlindedTicks = 45;
                nearbyPredator.retinalSaturationTicks = 60;
                if (nearbyPredator.vx && nearbyPredator.vy) {
                    nearbyPredator.vx *= -0.45;
                    nearbyPredator.vy *= -0.45;
                }

                // Explosive recoil escape vector for prey
                const escapeAngle = Math.atan2(org.y - nearbyPredator.y, org.x - nearbyPredator.x);
                if (typeof org.vx !== "undefined") {
                    org.vx += Math.cos(escapeAngle) * 3.8;
                    org.vy += Math.sin(escapeAngle) * 3.8;
                }

                this.metrics.activeFlashDischarges++;
                this.metrics.cumulativeFlashCount++;
                this.metrics.blindedPredatorCount++;
            }

            const collimationFactor = 1.0 + (org.guanineReflectors || 0.0) * 0.8;
            this.metrics.cumulativePhotonsEmitted += org.photonicPulse * org.photophoreOrgans * collimationFactor;
        }

        step(organisms, tick) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let photophoreCount = 0;
            let sumOrgans = 0.0;
            let sumLuciferase = 0.0;
            let sumCounterIllumination = 0.0;
            let sumQuorum = 0.0;
            let sumGuanine = 0.0;
            let sumQuenching = 0.0;
            let sumRecycling = 0.0;
            this.metrics.activeFlashDischarges = 0;

            const n = organisms.length;
            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead || org.alive === false) continue;
                liveCount++;

                this.updateOrganism(org, organisms, tick);

                if (org.photophoreOrgans > 0) {
                    photophoreCount++;
                    sumOrgans += org.photophoreOrgans;
                    sumLuciferase += (org.luciferaseEfficiency || 0.0);
                    sumCounterIllumination += (org.counterIlluminationRatio || 0.0);
                    sumGuanine += (org.guanineReflectors || 0.0);
                    sumQuenching += (org.photonicQuenchingFactor || 1.0);
                    sumRecycling += (org.photonicEnergyRecycling || 0.0);
                    if (org.isQuorumSynchronized) sumQuorum++;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalPhotophoreCells = photophoreCount;
            this.metrics.photophorePrevalence = liveCount > 0 ? (photophoreCount / liveCount) : 0.0;
            this.metrics.meanPhotophoreOrgans = photophoreCount > 0 ? (sumOrgans / photophoreCount) : 0.0;
            this.metrics.meanLuciferaseEfficiency = photophoreCount > 0 ? (sumLuciferase / photophoreCount) : 0.0;
            this.metrics.meanCounterIllumination = photophoreCount > 0 ? (sumCounterIllumination / photophoreCount) : 0.0;
            this.metrics.meanQuorumSynchronization = photophoreCount > 0 ? (sumQuorum / photophoreCount) : 0.0;
            this.metrics.meanGuanineCollimation = photophoreCount > 0 ? (sumGuanine / photophoreCount) : 0.0;
            this.metrics.meanQuenchingFactor = photophoreCount > 0 ? (sumQuenching / photophoreCount) : 1.0;
            this.metrics.meanRecyclingEfficiency = photophoreCount > 0 ? (sumRecycling / photophoreCount) : 0.0;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SymbioticPhotophoresManager;
    }
    if (typeof global !== "undefined") {
        global.SymbioticPhotophoresManager = SymbioticPhotophoresManager;
        global.symbioticPhotophoresManager = new SymbioticPhotophoresManager();
    }
})(typeof window !== "undefined" ? window : global);
