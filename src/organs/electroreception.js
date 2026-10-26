// BioEcosystem - Bioelectric Polarization, Action Potential Oscillations & Biomagnetic Navigation
// Module: src/organs/electroreception.js
// Version: 6.47.0 (Hour 367 - System Agent: Electrostatic Crypsis, Noise Gating & Swarm Alignment)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectroreceptionManager
     * Physiological and sensory simulation of bioelectric and biomagnetic mechanics:
     * - Models Ampullae of Lorenzini-like conductive electroreceptors (electroreceptors)
     * - Implements electrostatic crypsis (electrostaticCrypsis) to dampen prey ionic leakage
     * - Filters ambient bioelectric background clutter via sensory noise gating (signalNoiseGate)
     * - Buffers post-spike refractory hyperpolarization preventing sitting-duck immobility
     * - Releases passive geomagnetic torque during urgent predator evasion (evasionMagneticOverride)
     * - Enables sensory penetration through benthic sediment to detect buried infaunal prey
     */
    class ElectroreceptionManager {
        constructor() {
            this.restingPotential = -70.0;
            this.peakActionPotential = 40.0;
            this.hyperpolarizationLimit = -82.0;
            this.ambientMagneticAngle = Math.PI * 0.5; // Geomagnetic North-South vector
            this.maxSensoryRange = 180.0;
            this.maxElectroreceptors = 8.0;

            this.metrics = {
                totalLiveCells: 0,
                totalElectroSensors: 0,
                electroreceptivePrevalence: 0.0,
                meanElectroreceptors: 0.0,
                meanMembranePotential: -70.0,
                meanDipoleFieldStrength: 0.0,
                meanElectrostaticCrypsis: 0.0,
                activeSpikesCount: 0,
                activeMagneticBypasses: 0,
                meanMagnetosomeAlignment: 0.0,
                infaunalPreyDetectedCount: 0,
                cumulativeDipoleEmissions: 0.0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            if (typeof org.electroreceptors === "undefined") {
                const isCarnivore = org.niche === "carnivore" || org.niche === "apex";
                const basePores = isCarnivore ? 3.0 : 1.0;
                const dnaBonus = org.dna && org.dna.sensoryRange ? (org.dna.sensoryRange / 100.0) * 2.0 : 0.5;
                org.electroreceptors = Math.min(8.0, Math.max(0.0, basePores + dnaBonus));
            }
            if (typeof org.membranePotential === "undefined") {
                org.membranePotential = -70.0; // Resting potential in mV
            }
            if (typeof org.dipoleFieldStrength === "undefined") {
                org.dipoleFieldStrength = 0.0; // Normalized 0.0 to 1.0
            }
            if (typeof org.actionPotentialCooldown === "undefined") {
                org.actionPotentialCooldown = Math.floor(Math.random() * 20);
            }
            if (typeof org.magnetosomeChain === "undefined") {
                const dnaMag = org.dna && typeof org.dna.generation === "number" ? (org.dna.generation % 5) * 0.2 : 0.4;
                org.magnetosomeChain = Math.min(1.0, Math.max(0.0, dnaMag));
            }
            if (typeof org.biomagneticHeading === "undefined") {
                org.biomagneticHeading = 0.0;
            }
            if (typeof org.electroSensitivity === "undefined") {
                org.electroSensitivity = 70.0 + (org.electroreceptors * 12.0);
            }
            if (typeof org.detectedDipolesCount === "undefined") {
                org.detectedDipolesCount = 0;
            }
            if (typeof org.electrostaticCrypsis === "undefined") {
                const isPrey = org.niche === "herbivore" || org.niche === "scavenger";
                org.electrostaticCrypsis = isPrey ? 0.45 : 0.10;
            }
            if (typeof org.noiseGateThreshold === "undefined") {
                org.noiseGateThreshold = 0.045; // Minimum dipole strength to break background clutter
            }
            if (typeof org.magneticLockBypassTicks === "undefined") {
                org.magneticLockBypassTicks = 0;
            }
        }

        triggerActionPotential(org) {
            if (!org || org.isDead || org.actionPotentialCooldown > 0) return;
            org.membranePotential = this.peakActionPotential;
            org.dipoleFieldStrength = 1.0;
            org.actionPotentialCooldown = 40; // Refractory recovery ticks

            if (typeof org.energy === "number" && org.energy > 5.0) {
                org.energy -= 0.10;
            }
        }

        applyBiomagneticTorque(org) {
            if (!org || org.isDead || !org.magnetosomeChain || org.magnetosomeChain <= 0.05) return;

            // Critic Audit Fix: Urgent predator evasion overrides passive magnetic alignment
            if (org.magneticLockBypassTicks > 0) {
                org.magneticLockBypassTicks--;
                org.biomagneticHeading = 0.25;
                return;
            }

            const currentAngle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            let angleDiff = this.ambientMagneticAngle - currentAngle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

            const torqueMag = angleDiff * org.magnetosomeChain * 0.035;
            if (typeof org.angle === "number") org.angle += torqueMag;

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            if (speed > 0.05) {
                const targetVx = Math.cos(this.ambientMagneticAngle) * speed;
                const targetVy = Math.sin(this.ambientMagneticAngle) * speed;
                const alignRate = org.magnetosomeChain * 0.04;
                org.vx = (org.vx || 0) * (1.0 - alignRate) + targetVx * alignRate;
                org.vy = (org.vy || 0) * (1.0 - alignRate) + targetVy * alignRate;
            }
            org.biomagneticHeading = 1.0 - Math.min(1.0, Math.abs(angleDiff) / Math.PI);
        }

        scanElectricFields(org, neighbors) {
            if (!org || org.isDead || !org.electroreceptors || org.electroreceptors <= 0.1) {
                if (org) org.detectedDipolesCount = 0;
                return;
            }

            const range = org.electroSensitivity || 80.0;
            const rangeSq = range * range;
            let detected = 0;
            let closestPreyDistSq = Infinity;
            let preyVector = null;

            for (let i = 0; i < neighbors.length; i++) {
                const other = neighbors[i];
                if (!other || other === org || other.isDead) continue;

                const dx = other.x - org.x;
                const dy = other.y - org.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > rangeSq || distSq < 1.0) continue;

                // Critic Audit Fix: Electrostatic crypsis dampens detectable ionic leakage
                const crypsisDamping = 1.0 - (other.electrostaticCrypsis || 0.0) * 0.70;
                const rawDipole = (other.dipoleFieldStrength || 0.05) * crypsisDamping;
                const effectiveStrength = rawDipole * (1.0 - Math.sqrt(distSq) / range);

                // Critic Audit Fix: Sensory noise gate filters diffuse ambient background chatter
                if (effectiveStrength < (org.noiseGateThreshold || 0.045)) continue;

                detected++;
                const isBuriedInfaunal = typeof other.burrowDepth === "number" && other.burrowDepth > 5.0;
                const isPreyNiche = (org.niche === "carnivore" || org.niche === "apex") && other.niche !== org.niche;

                if (isPreyNiche && distSq < closestPreyDistSq) {
                    closestPreyDistSq = distSq;
                    preyVector = { dx: dx, dy: dy, isBuried: isBuriedInfaunal, dist: Math.sqrt(distSq) };
                }

                // Prey senses approaching predator's dipole field: trigger evasive magnetic bypass
                if (!isPreyNiche && (other.niche === "carnivore" || other.niche === "apex")) {
                    org.magneticLockBypassTicks = 25;
                    const evadeDist = Math.max(Math.sqrt(distSq), 4.0);
                    org.vx = (org.vx || 0) - (dx / evadeDist) * 0.06;
                    org.vy = (org.vy || 0) - (dy / evadeDist) * 0.06;
                }
            }

            org.detectedDipolesCount = detected;

            if (preyVector && (org.niche === "carnivore" || org.niche === "apex")) {
                const steerForce = (org.electroreceptors / 8.0) * 0.08;
                const invDist = 1.0 / Math.max(preyVector.dist, 5.0);
                org.vx = (org.vx || 0) + (preyVector.dx * invDist) * steerForce;
                org.vy = (org.vy || 0) + (preyVector.dy * invDist) * steerForce;

                if (preyVector.isBuried && preyVector.dist < 45.0) {
                    this.triggerActionPotential(org);
                    this.metrics.infaunalPreyDetectedCount++;
                }
            }
        }

        step(organisms, tick) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let electroSensorsCount = 0;
            let sumElectroreceptors = 0.0;
            let sumMembranePotential = 0.0;
            let sumDipoleStrength = 0.0;
            let sumMagnetosomeAlignment = 0.0;
            let sumCrypsis = 0.0;
            let activeSpikes = 0;
            let activeBypasses = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;

                liveCount++;
                ElectroreceptionManager.initOrganism(org);

                if (org.actionPotentialCooldown > 0) org.actionPotentialCooldown--;

                if (org.membranePotential > this.restingPotential) {
                    org.membranePotential -= 3.4; // Repolarizing leak back to resting potential
                    if (org.membranePotential < this.restingPotential) {
                        org.membranePotential = this.restingPotential;
                    }
                } else if (org.membranePotential < this.restingPotential) {
                    // Critic Audit Fix: Active ion pumps buffer hyperpolarization, preventing sitting ducks
                    org.membranePotential += 1.8;
                    if (org.membranePotential > this.restingPotential) {
                        org.membranePotential = this.restingPotential;
                    }
                }

                const speedSq = (org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0);
                if (speedSq > 2.8 && org.actionPotentialCooldown === 0 && Math.random() < 0.08) {
                    this.triggerActionPotential(org);
                }

                const dev = Math.abs(org.membranePotential - this.restingPotential);
                org.dipoleFieldStrength = Math.min(1.0, dev / 110.0);
                if (org.membranePotential > 0.0) activeSpikes++;

                this.applyBiomagneticTorque(org);
                if (org.magneticLockBypassTicks > 0) activeBypasses++;

                if (org.electroreceptors > 0.5) electroSensorsCount++;
                sumElectroreceptors += org.electroreceptors || 0.0;
                sumMembranePotential += org.membranePotential || -70.0;
                sumDipoleStrength += org.dipoleFieldStrength || 0.0;
                sumMagnetosomeAlignment += org.biomagneticHeading || 0.0;
                sumCrypsis += org.electrostaticCrypsis || 0.0;
            }

            const scanStride = (tick % 2 === 0) ? 1 : 2;
            for (let i = 0; i < organisms.length; i += scanStride) {
                const org = organisms[i];
                if (!org || org.isDead) continue;
                this.scanElectricFields(org, organisms);
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalElectroSensors = electroSensorsCount;
            this.metrics.electroreceptivePrevalence = liveCount > 0 ? (electroSensorsCount / liveCount) : 0.0;
            this.metrics.meanElectroreceptors = liveCount > 0 ? (sumElectroreceptors / liveCount) : 0.0;
            this.metrics.meanMembranePotential = liveCount > 0 ? (sumMembranePotential / liveCount) : -70.0;
            this.metrics.meanDipoleFieldStrength = liveCount > 0 ? (sumDipoleStrength / liveCount) : 0.0;
            this.metrics.meanMagnetosomeAlignment = liveCount > 0 ? (sumMagnetosomeAlignment / liveCount) : 0.0;
            this.metrics.meanElectrostaticCrypsis = liveCount > 0 ? (sumCrypsis / liveCount) : 0.0;
            this.metrics.activeSpikesCount = activeSpikes;
            this.metrics.activeMagneticBypasses = activeBypasses;
            this.metrics.cumulativeDipoleEmissions += sumDipoleStrength * 0.05;
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ElectroreceptionManager;
    } else {
        global.ElectroreceptionManager = ElectroreceptionManager;
        global.electroreceptionManager = new ElectroreceptionManager();
    }
})(typeof window !== "undefined" ? window : global);
