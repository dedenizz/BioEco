// BioEcosystem - Sensory Organogenesis & Phototaxis System
// Module: src/organs/sensory.js
// Version: 4.82.0 (Hour 202 - System Agent Statocyst & Rhopalia Mechanics)
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
            this.phototacticGradient = 0.0;
            this.perceivedLightVector = { x: 0.0, y: 0.0 };
        }

        // Primary sensory physics update step
        update(dt, fluidVx = 0.0, fluidVy = 0.0) {
            const org = this.organism;
            const dna = org.dna;
            if (!dna) return;

            const statDensity = dna.statocystSensoryDensity || 0.0;
            const rhopCadence = dna.rhopaliaEquilibriumCadence || 0.0;
            const hasStatocysts = statDensity >= 0.22;
            const hasRhopalia = rhopCadence >= 0.25;

            org.hasStatocysts = hasStatocysts;
            org.hasRhopalia = hasRhopalia;

            if (!hasStatocysts && !hasRhopalia) {
                this.statolithDeflection = 0.0;
                this.tiltAngle = 0.0;
                this.equilibriumStability = 0.40;
                this.angularDamping = 0.0;
                this.energyConservationBonus = 0.0;
                org.statolithDeflection = 0.0;
                org.equilibriumStability = 0.40;
                return;
            }

            // 1. Statocyst Mechanoreception & Statolith Kinematics
            if (hasStatocysts) {
                // Gravity vector downward (Y-positive) + hydrodynamic acceleration shear
                const gravityY = 0.35 * statDensity;
                const accelX = (org.vx - (org.prevVx || org.vx)) / (dt || 1.0);
                const accelY = (org.vy - (org.prevVy || org.vy)) / (dt || 1.0);
                
                const forceX = -accelX * 0.4 + (fluidVx - org.vx) * 0.15;
                const forceY = gravityY - accelY * 0.4 + (fluidVy - org.vy) * 0.15;

                // Damped spring-mass system for statolith inside capsule
                const springK = 0.82;
                const dampingGamma = 0.75;
                
                this.statolithVx = (this.statolithVx + forceX * dt) * dampingGamma - this.statolithX * springK * dt;
                this.statolithVy = (this.statolithVy + forceY * dt) * dampingGamma - this.statolithY * springK * dt;
                
                this.statolithX += this.statolithVx * dt;
                this.statolithY += this.statolithVy * dt;

                // Constrain within capsule radius
                const distSq = this.statolithX * this.statolithX + this.statolithY * this.statolithY;
                const maxR = this.capsuleRadius;
                if (distSq > maxR * maxR) {
                    const dist = Math.sqrt(distSq);
                    this.statolithX = (this.statolithX / dist) * maxR;
                    this.statolithY = (this.statolithY / dist) * maxR;
                    this.statolithVx *= -0.2;
                    this.statolithVy *= -0.2;
                }

                // Normalized deflection ratio [0.0 - 1.0]
                const curDist = Math.sqrt(this.statolithX * this.statolithX + this.statolithY * this.statolithY);
                this.statolithDeflection = Math.min(1.0, curDist / maxR);

                // Calculate tilt angle relative to organism body orientation
                const bodyHeading = Math.atan2(org.vy, org.vx) || 0.0;
                const deflectionAngle = Math.atan2(this.statolithY, this.statolithX);
                let relAngle = deflectionAngle - bodyHeading;
                while (relAngle > Math.PI) relAngle -= 2 * Math.PI;
                while (relAngle < -Math.PI) relAngle += 2 * Math.PI;
                this.tiltAngle = relAngle * (180.0 / Math.PI);

                // Gravitaxis depth bias: pelagic (-Y) vs benthic (+Y)
                const gravAffinity = dna.gravitaxisAffinity || 0.0;
                this.gravitaxisBias = gravAffinity * statDensity;
                if (Math.abs(gravAffinity) > 0.15) {
                    const targetVy = gravAffinity > 0 ? 0.35 : -0.35;
                    org.vy += (targetVy - org.vy) * 0.04 * statDensity;
                }

                // Rheotaxis current alignment
                const relFlowX = fluidVx - org.vx;
                const relFlowY = fluidVy - org.vy;
                const flowSpeed = Math.sqrt(relFlowX * relFlowX + relFlowY * relFlowY);
                if (flowSpeed > 0.05) {
                    this.rheotacticAlignment = Math.min(1.0, flowSpeed * statDensity * 0.8);
                } else {
                    this.rheotacticAlignment = 0.0;
                }
            }

            // 2. Rhopalia Neuromuscular Equilibrium & Angular Stabilization
            if (hasRhopalia) {
                // Compute angular damping to cancel turbulent tumbling
                const currentHeading = Math.atan2(org.vy, org.vx) || 0.0;
                const headingDelta = currentHeading - (this.stabilizedHeading || currentHeading);
                this.stabilizedHeading = currentHeading;

                const dampingCoeff = Math.min(0.85, rhopCadence * 0.65);
                this.angularDamping = dampingCoeff;
                
                // Stability index from 0.0 to 1.0
                const jitter = Math.abs(headingDelta) / Math.PI;
                this.equilibriumStability = Math.max(0.2, Math.min(1.0, 1.0 - jitter * (1.8 / (1.0 + rhopCadence))));

                // Energetic conservation: smooth laminar movement reduces basal metabolic drain
                this.energyConservationBonus = Math.min(0.30, this.equilibriumStability * 0.28 * rhopCadence);
            } else {
                this.equilibriumStability = 0.45;
                this.angularDamping = 0.0;
                this.energyConservationBonus = 0.0;
            }

            // Sync properties to organism for renderer and inspector access
            org.statolithDeflection = this.statolithDeflection;
            org.equilibriumStability = this.equilibriumStability;
            org.statolithX = this.statolithX;
            org.statolithY = this.statolithY;
            org.tiltAngle = this.tiltAngle;
            org.energyConservationBonus = this.energyConservationBonus;
        }

        // Get telemetry status for HUD and Inspector
        getTelemetry() {
            return {
                hasStatocysts: !!(this.organism && this.organism.hasStatocysts),
                hasRhopalia: !!(this.organism && this.organism.hasRhopalia),
                statolithDeflection: Number(this.statolithDeflection.toFixed(3)),
                equilibriumStability: Number(this.equilibriumStability.toFixed(3)),
                tiltAngle: Number(this.tiltAngle.toFixed(1)),
                gravitaxisBias: Number(this.gravitaxisBias.toFixed(3)),
                rheotacticAlignment: Number(this.rheotacticAlignment.toFixed(3)),
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
