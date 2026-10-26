// BioEcosystem - Hydrodynamic Siphon Jet Propulsion & Elastic Mantle Cavity Engine
// Module: src/organs/siphon_propulsion.js
// Version: 5.47.0 (Hour 267 - System Agent: Steerable Hyponome & Vectorial Maneuver Agility)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SiphonPropulsionSystem
     * Advanced cephalopod-grade steerable hyponome and hydrodynamic jet engine:
     * - Elastic mantle cavity expanding during inhalant water intake phase
     * - Torricelli-Bernoulli hydrodynamic orifice exit velocity and Newton reaction thrust
     * - Multi-axial 360-degree hyponome nozzle steering (hyponome vectoring)
     * - Dynamic reverse hydrodynamic braking to avoid collisions or hold station
     * - Orthogonal evasive escape bursts and predatory intercept lunges
     * - Cavitation metabolic fatigue, exhaustion freeze, and hydroelastic recovery
     */
    class SiphonPropulsionSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.mantleElasticity = typeof dna.mantleElasticity === "number" ? dna.mantleElasticity : 0.30;
            this.siphonApertureRatio = typeof dna.siphonApertureRatio === "number" ? dna.siphonApertureRatio : 0.35;
            this.jetPulseCadence = typeof dna.jetPulseCadence === "number" ? dna.jetPulseCadence : 0.40;
            this.hyponomeSteering = typeof dna.hyponomeSteering === "number" ? dna.hyponomeSteering : 0.25;

            // Mantle cavity fluid storage and hydrostatic pressure state
            this.mantleVolume = 6.0; this.maxMantleCapacity = 15.0; this.cavityPressure = 0.0; this.wallTension = 0.0;
            this.isExpanding = true; this.isContracting = false; this.jetThrustForce = 0.0; this.exitVelocity = 0.0;
            this.siphonAngle = Math.PI; this.siphonDeflection = 0.0; this.reverseBrakingActive = false;
            this.burstActive = false; this.burstCooldown = 0; this.jetFatigue = 0.0; this.exhaustionFreeze = false;

            // Cavitation wake and fluid dynamics constants
            this.cavitationPlumeActive = false;
            this.lastJetTick = 0;
            this.densityFluid = 1.025;             // Seawater fluid density reference
            this.dischargeCoeff = 0.85;            // Hydrodynamic nozzle constriction coefficient
        }

        /**
         * Inhalant phase: radial muscle relaxation expands the elastic mantle cavity,
         * drawing surrounding water inside through lateral inhalant apertures.
         * @param {number} dt - Delta time step.
         */
        expandMantle(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const fillRate = (0.32 + this.mantleElasticity * 0.48) * (size / 6.0);
            this.mantleVolume = Math.min(this.maxMantleCapacity, this.mantleVolume + fillRate);

            this.cavityPressure = Math.max(0.0, this.cavityPressure - 2.2);
            this.wallTension = (this.mantleVolume / this.maxMantleCapacity) * this.mantleElasticity * 12.0;

            if (this.mantleVolume >= this.maxMantleCapacity * 0.92) {
                this.isExpanding = false;
            }
        }

        /**
         * Calculate nozzle exit velocity using Torricelli-Bernoulli hydrodynamic relation:
         * v_exit = C_d * sqrt(2 * P_cavity / rho_fluid)
         * @returns {number} Fluid expulsion velocity.
         */
        calculateExitVelocity() {
            if (this.cavityPressure <= 0.1) return 0.0;
            const pressurePascals = this.cavityPressure * 100.0;
            const theoreticalVelocity = Math.sqrt((2.0 * pressurePascals) / this.densityFluid);
            const apertureAdjustment = 0.70 + (this.siphonApertureRatio * 0.40);
            return Number((this.dischargeCoeff * theoreticalVelocity * apertureAdjustment * 0.045).toFixed(3));
        }

        /**
         * Trigger pressurized jet pulse with steerable hyponome vectoring.
         * @param {number} thrustHeading - Desired movement direction angle (radians).
         * @param {boolean} isEmergency - Flag indicating predator escape or predatory strike.
         * @param {number} nozzleDeflection - Relative nozzle deflection angle [-PI to +PI].
         */
        triggerJetPulse(thrustHeading, isEmergency, nozzleDeflection) {
            const org = this.organism;
            if (!org || !org.alive || this.burstCooldown > 0 || this.exhaustionFreeze) return;
            if (this.mantleVolume < 3.2 || org.energy < 4.0) return;

            this.isContracting = true;
            this.isExpanding = false;
            this.burstActive = Boolean(isEmergency);
            this.reverseBrakingActive = false;

            // Multi-axial hyponome vectoring: nozzle points opposite to desired acceleration,
            // with optional steering deflection for sharp orthogonal turns
            const heading = typeof thrustHeading === "number" ? thrustHeading : Math.atan2(org.vy, org.vx);
            const deflection = typeof nozzleDeflection === "number" ? nozzleDeflection : 0.0;
            const maxAgileDeflection = deflection * Math.min(1.0, this.hyponomeSteering * 2.2);
            this.siphonDeflection = Number(maxAgileDeflection.toFixed(3));
            this.siphonAngle = heading + Math.PI + this.siphonDeflection;

            // Pressure spike based on mantle elasticity and aperture constriction
            const elasticityFactor = 1.2 + (this.mantleElasticity * 1.8);
            const apertureConstriction = 1.0 + (1.0 - this.siphonApertureRatio) * 1.4;
            const rawPressure = (12.0 + (this.mantleVolume * 2.4)) * elasticityFactor * apertureConstriction;
            this.cavityPressure = Math.min(50.0, Math.max(8.0, rawPressure));

            // Fluid mass expelled per pulse
            const expelledRatio = isEmergency ? 0.65 : 0.45;
            const expelledVolume = Math.min(this.mantleVolume, this.mantleVolume * expelledRatio);
            this.mantleVolume = Math.max(0.0, this.mantleVolume - expelledVolume);

            // Compute exit velocity and reaction thrust
            this.exitVelocity = this.calculateExitVelocity();
            const massEquivalent = expelledVolume * 0.14;
            const rawForce = massEquivalent * this.exitVelocity * (isEmergency ? 1.6 : 1.0);

            // Mitigate force if fatigued
            const fatiguePenalty = Math.max(0.35, 1.0 - (this.jetFatigue * 0.65));
            this.jetThrustForce = Math.min(2.5, Number((rawForce * fatiguePenalty).toFixed(3)));

            // Apply reactive momentum impulse to host organism: a = F / m along effective thrust axis
            const effectiveThrustAngle = this.siphonAngle - Math.PI;
            const hostMass = Math.max(1.0, (org.dna && org.dna.size) ? org.dna.size * 0.9 : 5.0);
            const impulseAcceleration = this.jetThrustForce / hostMass;
            org.vx += Math.cos(effectiveThrustAngle) * impulseAcceleration * 4.2;
            org.vy += Math.sin(effectiveThrustAngle) * impulseAcceleration * 4.2;

            // Metabolic ATP expenditure and fatigue accumulation
            const energyCost = 0.06 + (this.jetThrustForce * 0.10);
            org.energy = Math.max(0.0, org.energy - energyCost);
            this.jetFatigue = Math.min(1.0, this.jetFatigue + (isEmergency ? 0.22 : 0.12));
            this.burstCooldown = isEmergency ? 24 : 14;
            this.cavitationPlumeActive = (this.jetThrustForce > 0.40);

            // Check for cavitation exhaustion freeze
            if (this.jetFatigue >= 0.85) {
                this.exhaustionFreeze = true;
                this.burstCooldown = Math.max(this.burstCooldown, 28);
            }

            this.syncHostProperties();
        }

        /**
         * Dynamic reverse hydrodynamic braking: bend hyponome forward to produce
         * counter-thrust and rapidly decelerate when approaching obstacles or overshooting.
         */
        triggerReverseBrake() {
            const org = this.organism;
            if (!org || !org.alive || this.mantleVolume < 2.5 || this.burstCooldown > 0) return;

            const speed = Math.hypot(org.vx, org.vy);
            if (speed < 0.3) return;

            const heading = Math.atan2(org.vy, org.vx);
            // Siphon nozzle points forward in locomotion direction to push backward
            this.siphonAngle = heading;
            this.siphonDeflection = Math.PI;
            this.reverseBrakingActive = true;

            const brakePower = Math.min(speed * 0.70, 0.95);
            org.vx *= (1.0 - brakePower);
            org.vy *= (1.0 - brakePower);

            this.mantleVolume = Math.max(0.0, this.mantleVolume - 2.0);
            this.cavityPressure = 22.0;
            this.jetThrustForce = 0.65;
            this.burstCooldown = 12;
            this.cavitationPlumeActive = true;

            this.syncHostProperties();
        }

        /**
         * Autonomous emergency escape burst with orthogonal deflection dodging.
         * @param {number} predatorX - Predator horizontal coordinate.
         * @param {number} predatorY - Predator vertical coordinate.
         */
        triggerEscapeBurst(predatorX, predatorY) {
            const org = this.organism;
            if (!org || !org.alive || this.burstCooldown > 0 || this.exhaustionFreeze) return;

            let directEscapeAngle = 0.0;
            if (typeof predatorY === "number" && typeof predatorX === "number") {
                directEscapeAngle = Math.atan2(org.y - predatorY, org.x - predatorX);
            } else if (typeof predatorX === "number") {
                directEscapeAngle = predatorX;
            } else {
                directEscapeAngle = Math.random() * Math.PI * 2;
            }

            // High agility organisms execute 90-degree orthogonal dodge vectors to slip past jaws
            let nozzleDeflection = 0.0;
            if (this.hyponomeSteering > 0.30) {
                const dodgeSign = Math.random() < 0.5 ? 1.0 : -1.0;
                nozzleDeflection = dodgeSign * (Math.PI * 0.45);
            }
            this.triggerJetPulse(directEscapeAngle, true, nozzleDeflection);
        }

        /**
         * Autonomous predatory lunge burst toward prey.
         */
        triggerPredatoryLunge(preyX, preyY) {
            const org = this.organism;
            if (!org || !org.alive || this.burstCooldown > 0 || this.exhaustionFreeze) return;

            let lungeAngle = 0.0;
            if (typeof preyY === "number" && typeof preyX === "number") {
                lungeAngle = Math.atan2(preyY - org.y, preyX - org.x);
            } else if (typeof preyX === "number") {
                lungeAngle = preyX;
            } else {
                lungeAngle = Math.atan2(org.vy, org.vx);
            }
            this.triggerJetPulse(lungeAngle, true, 0.0);
        }

        /**
         * Synchronize internal telemetry fields directly onto host organism.
         */
        syncHostProperties() {
            const org = this.organism;
            if (!org) return;
            org.mantleVolume = Number(this.mantleVolume.toFixed(2));
            org.cavityPressure = Number(this.cavityPressure.toFixed(1));
            org.jetThrustForce = Number(this.jetThrustForce.toFixed(3));
            org.exitVelocity = Number(this.exitVelocity.toFixed(2));
            org.siphonAngle = Number(this.siphonAngle.toFixed(3));
            org.siphonDeflectionAngle = Math.max(-Math.PI, Math.min(Math.PI, Number(this.siphonDeflection.toFixed(4))));
            org.reverseBrakingActive = this.reverseBrakingActive;
            org.jetBurstActive = this.burstActive;
            org.cavitationPlumeActive = this.cavitationPlumeActive;
            org.jetFatigue = Number(this.jetFatigue.toFixed(2));
            org.exhaustionFreeze = this.exhaustionFreeze;
        }

        /**
         * Process per-frame siphon kinematics, fatigue recovery, and refilling.
         * @param {number} tick - Current simulation frame count.
         */
        step(tick) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (this.burstCooldown > 0) this.burstCooldown--;

            // Recover from metabolic fatigue
            if (this.jetFatigue > 0.0) {
                this.jetFatigue = Math.max(0.0, this.jetFatigue - 0.009);
                if (this.jetFatigue < 0.50) this.exhaustionFreeze = false;
            }

            // Attenuate cavitation wake and applied thrust
            if (this.jetThrustForce > 0.02) {
                this.jetThrustForce *= 0.86;
                this.cavitationPlumeActive = true;
            } else {
                this.jetThrustForce = 0.0;
                this.cavitationPlumeActive = false;
                this.isContracting = false;
                this.isExpanding = true;
                this.reverseBrakingActive = false;
            }

            if (this.isExpanding) this.expandMantle(0.016);

            // Periodic cruise pulse
            const cadenceInterval = Math.max(14, Math.round(38 - (this.jetPulseCadence * 20)));
            if (tick % cadenceInterval === 0 && !this.burstActive && !this.exhaustionFreeze && this.mantleVolume >= 7.5 && org.energy > 18.0) {
                const heading = Math.atan2(org.vy, org.vx);
                this.triggerJetPulse(heading, false, 0.0);
            }

            this.syncHostProperties();
        }

        /**
         * Clean unhooking on organism mortality to avoid memory leaks.
         */
        cleanup() {
            this.organism = null; this.mantleVolume = 0.0; this.cavityPressure = 0.0; this.jetThrustForce = 0.0;
            this.exitVelocity = 0.0; this.siphonDeflection = 0.0; this.reverseBrakingActive = false;
            this.burstActive = false; this.cavitationPlumeActive = false; this.jetFatigue = 0.0; this.exhaustionFreeze = false;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SiphonPropulsionSystem;
    } else {
        global.SiphonPropulsionSystem = SiphonPropulsionSystem;
    }
})(typeof window !== "undefined" ? window : global);
