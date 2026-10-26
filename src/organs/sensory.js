// BioEcosystem - Sensory Organogenesis, Phototaxis & Bioluminescence System
// Module: src/organs/sensory.js
// Version: 4.87.0 (Hour 207 - System Agent Bioluminescent Photophores & Light Traps)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class SensorySystem {
        constructor(organism) {
            this.organism = organism;
            
            // Statocyst Capsule Physical State
            this.statolithX = 0.0;
            this.statolithY = 0.0;
            this.statolithVx = 0.0;
            this.statolithVy = 0.0;
            this.capsuleRadius = 4.0;
            this.statolithDeflection = 0.0;
            this.tiltAngle = 0.0;
            
            // Rhopalia Neuromuscular Equilibrium
            this.equilibriumStability = 0.5;
            this.angularDamping = 0.0;
            this.stabilizedHeading = 0.0;
            this.energyConservationBonus = 0.0;
            
            // Rheotaxis & Gravitaxis
            this.gravitaxisBias = 0.0;
            this.rheotacticAlignment = 0.0;

            // Bioluminescent Photophores & Aggressive Mimicry (System Agent v4.87.0)
            this.flashPhase = Math.random() * Math.PI * 2;
            this.currentLuminosity = 0.0;
            this.lightRadius = 0.0;
            this.luredPreyCount = 0;
            this.phototacticLureForce = 0.0;
            this.predatorLureEfficiency = 1.0;
            
            // Phototaxis & Ocelli Perception
            this.phototacticGradient = 0.0;
            this.perceivedLightVector = { x: 0.0, y: 0.0 };
        }

        // Primary sensory and photophore update step
        update(dt, fluidVx = 0.0, fluidVy = 0.0, nearbyOrganisms = null) {
            const org = this.organism;
            const dna = org.dna;
            if (!dna) return;

            const statDensity = dna.statocystSensoryDensity || 0.0;
            const rhopCadence = dna.rhopaliaEquilibriumCadence || 0.0;
            const bioLum = dna.bioluminescenceLuminosity || 0.0;
            const flashCadence = dna.photophoreFlashCadence || 0.8;
            const phototaxisSens = dna.phototacticAttractionSensitivity !== undefined ? dna.phototacticAttractionSensitivity : 0.3;

            const hasStatocysts = statDensity >= 0.22;
            const hasRhopalia = rhopCadence >= 0.25;
            const hasPhotophores = bioLum >= 0.20;

            org.hasStatocysts = hasStatocysts;
            org.hasRhopalia = hasRhopalia;
            org.hasPhotophores = hasPhotophores;

            // 1. Statocyst Mechanoreception & Statolith Kinematics
            if (hasStatocysts) {
                const gravityY = 0.35 * statDensity;
                const accelX = (org.vx - (org.prevVx || org.vx)) / (dt || 1.0);
                const accelY = (org.vy - (org.prevVy || org.vy)) / (dt || 1.0);
                
                const forceX = -accelX * 0.4 + (fluidVx - org.vx) * 0.15;
                const forceY = gravityY - accelY * 0.4 + (fluidVy - org.vy) * 0.15;

                const springK = 0.82;
                const dampingGamma = 0.75;
                
                this.statolithVx = (this.statolithVx + forceX * dt) * dampingGamma - this.statolithX * springK * dt;
                this.statolithVy = (this.statolithVy + forceY * dt) * dampingGamma - this.statolithY * springK * dt;
                
                this.statolithX += this.statolithVx * dt;
                this.statolithY += this.statolithVy * dt;

                const distSq = this.statolithX * this.statolithX + this.statolithY * this.statolithY;
                const maxR = this.capsuleRadius;
                if (distSq > maxR * maxR) {
                    const dist = Math.sqrt(distSq);
                    this.statolithX = (this.statolithX / dist) * maxR;
                    this.statolithY = (this.statolithY / dist) * maxR;
                    this.statolithVx *= -0.2;
                    this.statolithVy *= -0.2;
                }

                const curDist = Math.sqrt(this.statolithX * this.statolithX + this.statolithY * this.statolithY);
                this.statolithDeflection = Math.min(1.0, curDist / maxR);

                const bodyHeading = Math.atan2(org.vy, org.vx) || 0.0;
                const deflectionAngle = Math.atan2(this.statolithY, this.statolithX);
                let relAngle = deflectionAngle - bodyHeading;
                while (relAngle > Math.PI) relAngle -= 2 * Math.PI;
                while (relAngle < -Math.PI) relAngle += 2 * Math.PI;
                this.tiltAngle = relAngle * (180.0 / Math.PI);

                const gravAffinity = dna.gravitaxisAffinity || 0.0;
                this.gravitaxisBias = gravAffinity * statDensity;
                if (Math.abs(gravAffinity) > 0.15) {
                    const targetVy = gravAffinity > 0 ? 0.35 : -0.35;
                    org.vy += (targetVy - org.vy) * 0.04 * statDensity;
                }

                const relFlowX = fluidVx - org.vx;
                const relFlowY = fluidVy - org.vy;
                const flowSpeed = Math.sqrt(relFlowX * relFlowX + relFlowY * relFlowY);
                this.rheotacticAlignment = flowSpeed > 0.05 ? Math.min(1.0, flowSpeed * statDensity * 0.8) : 0.0;
            } else {
                this.statolithDeflection = 0.0;
                this.tiltAngle = 0.0;
            }

            // 2. Rhopalia Neuromuscular Equilibrium & Angular Stabilization
            if (hasRhopalia) {
                const currentHeading = Math.atan2(org.vy, org.vx) || 0.0;
                const headingDelta = currentHeading - (this.stabilizedHeading || currentHeading);
                this.stabilizedHeading = currentHeading;

                this.angularDamping = Math.min(0.85, rhopCadence * 0.65);
                const jitter = Math.abs(headingDelta) / Math.PI;
                this.equilibriumStability = Math.max(0.2, Math.min(1.0, 1.0 - jitter * (1.8 / (1.0 + rhopCadence))));
                this.energyConservationBonus = Math.min(0.30, this.equilibriumStability * 0.28 * rhopCadence);
            } else {
                this.equilibriumStability = 0.45;
                this.angularDamping = 0.0;
                this.energyConservationBonus = 0.0;
            }

            // 3. Bioluminescent Photophore Flash Kinetics & Substrate Oxidation
            if (hasPhotophores) {
                this.flashPhase = (this.flashPhase + (dt || 0.016) * flashCadence * 3.5) % (Math.PI * 2);
                const rawPulse = Math.max(0.0, Math.sin(this.flashPhase));
                const pulseCubic = rawPulse * rawPulse * rawPulse; // Sharp refringent flash profile
                this.currentLuminosity = bioLum * pulseCubic;
                this.lightRadius = (dna.size || 6.0) * 2.5 + this.currentLuminosity * 32.0;

                // Luciferin metabolic expenditure (tiny ATP tax per photic emission)
                if (this.currentLuminosity > 0.05) {
                    org.energy = Math.max(0.0, org.energy - 0.006 * this.currentLuminosity);
                }

                // Predation encounter efficiency bonus from aggressive lure
                this.predatorLureEfficiency = 1.0 + this.currentLuminosity * 0.45;
            } else {
                this.currentLuminosity = 0.0;
                this.lightRadius = 0.0;
                this.predatorLureEfficiency = 1.0;
            }

            // 4. Phototaxis & Aggressive Mimicry Light Trapping Interaction
            this.luredPreyCount = 0;
            if (nearbyOrganisms && nearbyOrganisms.length > 0) {
                // If organism is a predator with glowing photophore, lure nearby prey
                if (hasPhotophores && (org.niche === "carnivore" || org.niche === "scavenger") && this.currentLuminosity > 0.15) {
                    for (let i = 0; i < nearbyOrganisms.length; i++) {
                        const prey = nearbyOrganisms[i];
                        if (!prey.alive || prey === org || prey.niche === "carnivore") continue;

                        const dx = org.x - prey.x;
                        const dy = org.y - prey.y;
                        const distSq = dx * dx + dy * dy;
                        const lureReach = this.lightRadius * 1.5;

                        if (distSq < lureReach * lureReach && distSq > 4.0) {
                            const dist = Math.sqrt(distSq);
                            const preySens = prey.dna && typeof prey.dna.phototacticAttractionSensitivity === "number"
                                ? prey.dna.phototacticAttractionSensitivity : 0.3;

                            // Positive phototaxis pulls prey toward predator light lure
                            if (preySens > 0.05) {
                                const pullStrength = (this.currentLuminosity * preySens * 0.08) / (1.0 + dist * 0.02);
                                prey.vx += (dx / dist) * pullStrength;
                                prey.vy += (dy / dist) * pullStrength;
                                this.luredPreyCount++;
                            } else if (preySens < -0.05) {
                                // Negative phototaxis: skittish prey flees bright light
                                const pushStrength = (this.currentLuminosity * Math.abs(preySens) * 0.06) / (1.0 + dist * 0.02);
                                prey.vx -= (dx / dist) * pushStrength;
                                prey.vy -= (dy / dist) * pushStrength;
                            }
                        }
                    }
                }
            }

            // Sync state to organism instance for renderer, physics, and inspector
            org.statolithDeflection = this.statolithDeflection;
            org.equilibriumStability = this.equilibriumStability;
            org.statolithX = this.statolithX;
            org.statolithY = this.statolithY;
            org.tiltAngle = this.tiltAngle;
            org.energyConservationBonus = this.energyConservationBonus;
            org.currentLuminosity = this.currentLuminosity;
            org.lightRadius = this.lightRadius;
            org.predatorLureEfficiency = this.predatorLureEfficiency;
            org.luredPreyCount = this.luredPreyCount;
        }

        // Return telemetry snapshot for Inspector & HUD
        getTelemetry() {
            return {
                hasStatocysts: !!(this.organism && this.organism.hasStatocysts),
                hasRhopalia: !!(this.organism && this.organism.hasRhopalia),
                hasPhotophores: !!(this.organism && this.organism.hasPhotophores),
                statolithDeflection: Number(this.statolithDeflection.toFixed(3)),
                equilibriumStability: Number(this.equilibriumStability.toFixed(3)),
                tiltAngle: Number(this.tiltAngle.toFixed(1)),
                gravitaxisBias: Number(this.gravitaxisBias.toFixed(3)),
                currentLuminosity: Number(this.currentLuminosity.toFixed(2)),
                lightRadius: Number(this.lightRadius.toFixed(1)),
                luredPreyCount: this.luredPreyCount,
                predatorLureBonus: Number(((this.predatorLureEfficiency - 1.0) * 100).toFixed(1)),
                energyConservationBonus: Number((this.energyConservationBonus * 100).toFixed(1))
            };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SensorySystem;
    } else {
        global.SensorySystem = SensorySystem;
    }
})(typeof window !== "undefined" ? window : global);
