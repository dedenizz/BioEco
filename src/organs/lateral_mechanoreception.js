// BioEcosystem - Lateral Line Neuromasts, Dermal Denticles & Hydrodynamic Pressure Mechanics
// Module: src/organs/lateral_mechanoreception.js
// Version: 6.57.0 (Hour 377 - System Agent: Acoustic Damping, Wake Frequency Filtering & Inertial Hinge Dynamics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * LateralMechanoreceptionManager
     * High-precision simulation of fluid mechanoreception and surface hydrodynamics:
     * - Models ciliated cupula neuromast organs (lateralNeuromasts) along lateral margins
     * - Senses swimming wake displacement vectors and micro-vortex pressure waves
     * - Implements shark-like dermal denticle riblet scales (dermalDenticles) for drag reduction
     * - Mitigates vortex clutter via selective wake frequency filtering (wakeFrequencyFilter)
     * - Simulates acoustic pressure wave damping (acousticWaveDamping) for prey stealth
     * - Models mineral mass turning resistance (rotationalInertiaPenalty) balanced by flexible denticle hinges
     * - Computes positive rheotaxis (positiveRheotaxis) for current gradient navigation
     * - Enables vortex slipstream drafting (vortexDraftingBonus) for schooling energy conservation
     */
    class LateralMechanoreceptionManager {
        constructor() {
            this.maxNeuromasts = 12.0;
            this.maxDenticles = 8.0;
            this.maxDragDamping = 0.35;
            this.baseSensoryRange = 85.0;

            this.metrics = {
                totalLiveCells: 0,
                totalMechanoreceptiveCells: 0,
                mechanoreceptivePrevalence: 0.0,
                meanNeuromasts: 0.0,
                meanDenticles: 0.0,
                meanDragDamping: 0.0,
                meanRheotaxisAlignment: 0.0,
                meanAcousticDamping: 0.0,
                meanInertiaPenalty: 0.0,
                meanWakeFilter: 0.0,
                meanFlexibleHinges: 0.0,
                vortexDraftingPrevalence: 0.0,
                activeWakesDetected: 0,
                cumulativeEnergyConserved: 0.0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            if (typeof org.lateralNeuromasts === "undefined") {
                const isPredator = org.niche === "carnivore" || org.niche === "apex";
                const basePores = isPredator ? 4.0 : 2.5;
                const dnaSens = org.dna && org.dna.sensoryRange ? (org.dna.sensoryRange / 100.0) * 3.0 : 1.0;
                org.lateralNeuromasts = Math.min(12.0, Math.max(1.0, basePores + dnaSens));
            }
            if (typeof org.dermalDenticles === "undefined") {
                const isFast = org.dna && org.dna.speed ? (org.dna.speed / 2.0) * 2.5 : 1.5;
                const nicheBonus = org.niche === "apex" ? 2.5 : (org.niche === "carnivore" ? 1.5 : 0.8);
                org.dermalDenticles = Math.min(8.0, Math.max(0.0, isFast + nicheBonus));
            }
            if (typeof org.laminarDragDamping === "undefined") org.laminarDragDamping = 0.0;
            if (typeof org.wakeDisplacementVector === "undefined") {
                org.wakeDisplacementVector = { vx: 0.0, vy: 0.0, magnitude: 0.0 };
            }
            if (typeof org.positiveRheotaxis === "undefined") org.positiveRheotaxis = 0.5;
            if (typeof org.vortexDraftingBonus === "undefined") org.vortexDraftingBonus = 0.0;
            if (typeof org.lateralSensoryRange === "undefined") {
                org.lateralSensoryRange = 70.0 + (org.lateralNeuromasts * 7.5);
            }
            if (typeof org.detectedWakesCount === "undefined") org.detectedWakesCount = 0;

            if (typeof org.acousticWaveDamping === "undefined") {
                const isPrey = org.niche === "herbivore" || org.niche === "omnivore";
                const baseDamp = isPrey ? 0.35 : 0.15;
                const stealth = org.dna && org.dna.camouflage ? (org.dna.camouflage / 100.0) * 0.4 : 0.1;
                org.acousticWaveDamping = Math.min(0.75, Math.max(0.05, baseDamp + stealth));
            }
            if (typeof org.wakeFrequencyFilter === "undefined") {
                const filterQuality = (org.lateralNeuromasts / 12.0) * 0.65 + 0.15;
                org.wakeFrequencyFilter = Math.min(0.85, Math.max(0.1, filterQuality));
            }
            if (typeof org.flexibleDenticleHinges === "undefined") {
                const flexGene = org.dna && org.dna.flexibility ? (org.dna.flexibility / 100.0) * 0.6 : 0.25;
                org.flexibleDenticleHinges = Math.min(0.8, Math.max(0.05, flexGene));
            }
            if (typeof org.rotationalInertiaPenalty === "undefined") org.rotationalInertiaPenalty = 0.0;
            if (typeof org.netTurningInertia === "undefined") org.netTurningInertia = 0.0;
        }

        applyHydrodynamicDragReduction(org) {
            if (!org || org.isDead) return;

            const denticles = org.dermalDenticles || 0.0;
            const dampingRatio = Math.min(this.maxDragDamping, (denticles / this.maxDenticles) * this.maxDragDamping);
            org.laminarDragDamping = dampingRatio;

            // Mineralized denticle mass creates turning inertia; flexible hinges mitigate resistance
            const rawInertia = (denticles / this.maxDenticles) * 0.28;
            org.rotationalInertiaPenalty = rawInertia;
            const hingeMitigation = (org.flexibleDenticleHinges || 0.2) * 0.24;
            org.netTurningInertia = Math.max(0.01, rawInertia - hingeMitigation);

            // Dermal riblets smooth the turbulent boundary layer, conserving swimming energy
            if (dampingRatio > 0.05 && typeof org.energy === "number" && org.energy > 2.0) {
                const speedSq = (org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0);
                if (speedSq > 0.4) {
                    const energySaved = speedSq * dampingRatio * 0.015;
                    org.energy = Math.min(100.0, org.energy + energySaved);
                    this.metrics.cumulativeEnergyConserved += energySaved;
                }
            }
        }

        scanHydrodynamicWakes(org, neighbors) {
            if (!org || org.isDead || !org.lateralNeuromasts || org.lateralNeuromasts <= 0.5) {
                if (org) {
                    org.detectedWakesCount = 0;
                    org.vortexDraftingBonus = 0.0;
                }
                return;
            }

            const range = org.lateralSensoryRange || this.baseSensoryRange;
            const rangeSq = range * range;
            let detected = 0, netDispVx = 0.0, netDispVy = 0.0, draftingBoost = 0.0;

            const mySpeed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const myAngle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const wakeFilter = org.wakeFrequencyFilter || 0.25;

            for (let i = 0; i < neighbors.length; i++) {
                const other = neighbors[i];
                if (!other || other === org || other.isDead) continue;

                const dx = other.x - org.x, dy = other.y - org.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > rangeSq || distSq < 4.0) continue;

                const otherSpeed = Math.sqrt((other.vx || 0) * (other.vx || 0) + (other.vy || 0) * (other.vy || 0));
                if (otherSpeed < 0.25) continue;

                const dist = Math.sqrt(distSq);
                const wakeProximity = 1.0 - (dist / range);
                const acousticDamp = Math.min(0.75, other.acousticWaveDamping || 0.1);
                const dampenedSpeed = otherSpeed * (1.0 - acousticDamp * 0.65);
                const rawIntensity = dampenedSpeed * wakeProximity * (org.lateralNeuromasts / 10.0);

                if (rawIntensity < wakeFilter * 0.18) continue;
                const wakeIntensity = rawIntensity - (wakeFilter * 0.08);

                netDispVx += (other.vx || 0) * wakeIntensity;
                netDispVy += (other.vy || 0) * wakeIntensity;
                detected++;

                // Slipstream drafting
                const relAngle = Math.atan2(dy, dx);
                let angleDiff = Math.abs(relAngle - myAngle);
                while (angleDiff > Math.PI) angleDiff = Math.abs(angleDiff - Math.PI * 2);

                if (angleDiff < 0.65 && dist < 55.0 && otherSpeed >= mySpeed * 0.8) {
                    draftingBoost = Math.max(draftingBoost, 0.22 * wakeProximity);
                    const slipstreamNudge = 0.035 * wakeProximity;
                    org.vx = (org.vx || 0) + (other.vx || 0) * slipstreamNudge;
                    org.vy = (org.vy || 0) + (other.vy || 0) * slipstreamNudge;
                }

                // Predator Pressure Detection & Evasion with turning inertia compensation
                const isPredatorApproaching = (other.niche === "carnivore" || other.niche === "apex") &&
                    org.niche !== other.niche && dist < 65.0;
                if (isPredatorApproaching) {
                    const inertiaFactor = Math.max(0.65, 1.0 - (org.netTurningInertia || 0.0));
                    const evadeX = -(dx / dist) * 0.09 * (org.lateralNeuromasts / 8.0) * inertiaFactor;
                    const evadeY = -(dy / dist) * 0.09 * (org.lateralNeuromasts / 8.0) * inertiaFactor;
                    org.vx = (org.vx || 0) + evadeX;
                    org.vy = (org.vy || 0) + evadeY;
                }
            }

            org.detectedWakesCount = detected;
            org.vortexDraftingBonus = draftingBoost;
            const dispMag = Math.sqrt(netDispVx * netDispVx + netDispVy * netDispVy);
            org.wakeDisplacementVector = { vx: netDispVx, vy: netDispVy, magnitude: Math.min(2.5, dispMag) };
        }

        applyRheotaxis(org) {
            if (!org || org.isDead || !org.lateralNeuromasts || org.lateralNeuromasts <= 1.0) return;

            const currentVx = typeof org.ambientCurrentVx === "number" ? org.ambientCurrentVx : 0.02;
            const currentVy = typeof org.ambientCurrentVy === "number" ? org.ambientCurrentVy : 0.0;
            const currentMag = Math.sqrt(currentVx * currentVx + currentVy * currentVy);

            if (currentMag > 0.005) {
                const currentAngle = Math.atan2(currentVy, currentVx);
                const targetAngle = currentAngle + Math.PI;
                const myAngle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);

                let diff = targetAngle - myAngle;
                while (diff > Math.PI) diff -= Math.PI * 2;
                while (diff < -Math.PI) diff += Math.PI * 2;

                const inertiaDrag = Math.max(0.55, 1.0 - (org.netTurningInertia || 0.0) * 0.7);
                const rheoTorque = diff * 0.025 * (org.lateralNeuromasts / 12.0) * inertiaDrag;
                if (typeof org.angle === "number") org.angle += rheoTorque;
                org.positiveRheotaxis = 1.0 - Math.min(1.0, Math.abs(diff) / Math.PI);
            }
        }

        step(organisms, tick) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0, mechCount = 0, draftingCount = 0, totalWakes = 0;
            let sumNeuromasts = 0.0, sumDenticles = 0.0, sumDragDamping = 0.0, sumRheotaxis = 0.0;
            let sumAcousticDamp = 0.0, sumInertia = 0.0, sumFilter = 0.0, sumHinges = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;

                liveCount++;
                LateralMechanoreceptionManager.initOrganism(org);
                this.applyHydrodynamicDragReduction(org);
                this.applyRheotaxis(org);

                if (org.lateralNeuromasts > 1.5) mechCount++;
                if (org.vortexDraftingBonus > 0.05) draftingCount++;

                sumNeuromasts += org.lateralNeuromasts || 0.0;
                sumDenticles += org.dermalDenticles || 0.0;
                sumDragDamping += org.laminarDragDamping || 0.0;
                sumRheotaxis += org.positiveRheotaxis || 0.0;
                sumAcousticDamp += org.acousticWaveDamping || 0.0;
                sumInertia += org.rotationalInertiaPenalty || 0.0;
                sumFilter += org.wakeFrequencyFilter || 0.0;
                sumHinges += org.flexibleDenticleHinges || 0.0;
                totalWakes += org.detectedWakesCount || 0;
            }

            const stride = (tick % 2 === 0) ? 1 : 2;
            for (let i = 0; i < organisms.length; i += stride) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                this.scanHydrodynamicWakes(org, organisms);
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalMechanoreceptiveCells = mechCount;
            this.metrics.mechanoreceptivePrevalence = liveCount > 0 ? (mechCount / liveCount) : 0.0;
            this.metrics.meanNeuromasts = liveCount > 0 ? (sumNeuromasts / liveCount) : 0.0;
            this.metrics.meanDenticles = liveCount > 0 ? (sumDenticles / liveCount) : 0.0;
            this.metrics.meanDragDamping = liveCount > 0 ? (sumDragDamping / liveCount) : 0.0;
            this.metrics.meanRheotaxisAlignment = liveCount > 0 ? (sumRheotaxis / liveCount) : 0.0;
            this.metrics.meanAcousticDamping = liveCount > 0 ? (sumAcousticDamp / liveCount) : 0.0;
            this.metrics.meanInertiaPenalty = liveCount > 0 ? (sumInertia / liveCount) : 0.0;
            this.metrics.meanWakeFilter = liveCount > 0 ? (sumFilter / liveCount) : 0.0;
            this.metrics.meanFlexibleHinges = liveCount > 0 ? (sumHinges / liveCount) : 0.0;
            this.metrics.vortexDraftingPrevalence = liveCount > 0 ? (draftingCount / liveCount) : 0.0;
            this.metrics.activeWakesDetected = totalWakes;
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = LateralMechanoreceptionManager;
    } else {
        global.LateralMechanoreceptionManager = LateralMechanoreceptionManager;
        global.lateralMechanoreceptionManager = new LateralMechanoreceptionManager();
    }
})(typeof window !== "undefined" ? window : global);
