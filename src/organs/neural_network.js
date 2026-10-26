// BioEcosystem - Cephalopod Neural Networks, Prehensile Tentacles & Tool-Use Kinematics
// Module: src/organs/neural_network.js
// Version: 5.77.0 (Hour 297 - System Agent: Tentacle Kinematics, Tool-Use & Ink Sac Reflexes)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CephalopodNeuralSystem
     * Cephalopod neurobiology: cerebral ganglion, paired optic lobes, 8 brachial cords.
     * Hodgkin-Huxley electrophysiology (-70 mV / -55 mV / +35 mV), Hebbian synaptic plasticity.
     * Prehensile muscular hydrostats, benthic tool-use armor, mimicry freezing and ink sac escape.
     */
    class CephalopodNeuralSystem {
        constructor(organism) {
            this.organism = organism;
            const dna = (organism && organism.dna) ? organism.dna : {};

            this.cephalizationLevel = typeof dna.anteriorCephalization === "number" ? dna.anteriorCephalization : 0.25;
            this.synapticPlasticityRate = typeof dna.synapticConductance === "number" ? dna.synapticConductance : 0.28;
            this.depolarizationThreshold = typeof dna.actionPotentialThreshold === "number" ? dna.actionPotentialThreshold : 0.45;
            this.tentacleContractility = typeof dna.tentacleContractility === "number" ? dna.tentacleContractility : 0.30;

            // Electrophysiological state variables (Hodgkin-Huxley approximation)
            this.membranePotential = -70.0;           // Resting membrane potential in millivolts (-70 mV)
            this.actionPotentialThreshold = -55.0;    // Voltage-gated Na+ activation threshold (-55 mV)
            this.peakDepolarization = 35.0;           // Overshoot spike voltage (+35 mV)
            this.isDepolarized = false;               // Spiking state flag
            this.refractoryTimer = 0;                 // Absolute / relative refractory countdown ticks
            this.actionPotentialCount = 0;            // Lifetime action potential spikes fired
            this.firingRate = 0.0;                    // Dynamic firing frequency in Hertz (Hz)

            // Neurochemical transmitter reserves [0.0 - 100.0]
            this.acetylcholineLevel = 65.0;           // Fast cholinergic neuromuscular transmitter
            this.dopamineLevel = 35.0;                // Trophic reward and reinforcement transmitter

            // Network activation scores [0.0 - 1.0]
            this.cerebralGanglionActivity = 0.0;
            this.opticLobeActivity = 0.0;
            this.brachialCordActivations = new Float32Array(8);
            this.tentacleCoordinationScore = 0.0;
            this.neuromuscularDrive = 0.0;
            this.plasticityScore = 0.10;

            // Prehensile muscular hydrostat tentacle kinematics (Hour 297 System Agent)
            this.tentacleReach = 14.0;                // Dynamic reach length in pixels
            this.suctionAdhesionStrength = 0.35;      // Sucker suction force [0.0 - 1.0]
            this.graspedTarget = null;                // Target currently held or manipulated
            this.graspCooldown = 0;                   // Cooldown ticks between grasp attempts

            // Benthic tool-use armor shielding (Amphioctopus marginatus biomimetic)
            this.toolUseEquipped = false;             // Flag indicating active tool/shield possession
            this.carriedShieldType = "NONE";          // "NONE" | "EXUVIAE" | "DETRITUS"
            this.shieldDurability = 0.0;              // Current durability [0.0 - 100.0]
            this.shieldAbsorption = 0.70;             // Damage reduction ratio (70% absorbed)

            // Anti-predator behavioral reflexes
            this.mimicryFreezing = false;             // Static camouflage lock when stalked
            this.inkSacVolume = 80.0;                 // Pigment reserve pool [0.0 - 100.0]
            this.inkJetTriggered = false;             // Discharge event flag in current frame
            this.inkCooldown = 0;                     // Refractory timer between ink expulsions
        }

        depolarize(stimulus = 0.0) {
            if (this.refractoryTimer > 0) {
                this.refractoryTimer--;
                this.membranePotential += (-70.0 - this.membranePotential) * 0.22;
                this.isDepolarized = false;
                return;
            }

            const inputDrive = Math.max(0.0, Math.min(1.0, stimulus));
            const excitationVoltage = inputDrive * (this.actionPotentialThreshold - this.membranePotential) * 1.6;
            this.membranePotential += excitationVoltage;

            if (this.membranePotential >= this.actionPotentialThreshold) {
                this.membranePotential = this.peakDepolarization;
                this.isDepolarized = true;
                this.actionPotentialCount++;
                this.refractoryTimer = 4;
                this.neuromuscularDrive = Math.min(1.0, this.neuromuscularDrive + 0.35);
                this.acetylcholineLevel = Math.max(0.0, this.acetylcholineLevel - 2.5);
                this.dopamineLevel = Math.min(100.0, this.dopamineLevel + 0.8);
            } else {
                this.isDepolarized = false;
                this.neuromuscularDrive = Math.max(0.0, this.neuromuscularDrive * 0.92);
                this.acetylcholineLevel = Math.min(100.0, this.acetylcholineLevel + 0.45);
            }
        }

        adaptHebbianPlasticity(preSynaptic, postSynaptic, rewardModulation = 0.0) {
            const coActivation = preSynaptic * postSynaptic;
            const rewardFactor = 1.0 + (this.dopamineLevel / 100.0) * 0.65 + rewardModulation;
            const deltaWeight = this.synapticPlasticityRate * (coActivation * rewardFactor - 0.012);
            this.plasticityScore = Math.max(0.0, Math.min(1.0, this.plasticityScore + deltaWeight * 0.045));
        }

        coordinateBrachialCords(tick, motorExcitation) {
            let activeCords = 0;
            const phaseBase = tick * 0.08;

            for (let c = 0; c < 8; c++) {
                const cordPhase = phaseBase + (c * Math.PI) / 4.0;
                const wave = 0.5 + 0.5 * Math.sin(cordPhase);
                const activation = Math.min(1.0, motorExcitation * (0.60 + wave * 0.40));
                this.brachialCordActivations[c] = activation;
                if (activation > 0.35) activeCords++;
            }

            this.tentacleCoordinationScore = Number((activeCords / 8.0).toFixed(3));
            
            // Dynamic tentacle reach scaling based on neuromuscular drive
            const orgSize = (this.organism && this.organism.dna) ? this.organism.dna.size : 10;
            this.tentacleReach = Number((orgSize * (1.2 + this.neuromuscularDrive * 1.6)).toFixed(1));
            this.suctionAdhesionStrength = Number(Math.min(1.0, 0.20 + this.tentacleContractility * 0.40 + this.neuromuscularDrive * 0.40).toFixed(2));
        }

        /**
         * Update benthic tool-use behavior and shield mechanics.
         * High plasticity organisms (% NPI >= 30) grasp benthic debris for defense.
         */
        updateToolUse(nearbyExuviae = [], nearbyDetritus = []) {
            if (this.plasticityScore < 0.28) {
                this.toolUseEquipped = false;
                return;
            }

            // Degrade existing shield durability over time or discard when broken
            if (this.toolUseEquipped) {
                this.shieldDurability = Math.max(0.0, this.shieldDurability - 0.04);
                if (this.shieldDurability <= 0.0) {
                    this.toolUseEquipped = false;
                    this.carriedShieldType = "NONE";
                }
                return;
            }

            // Scan and salvage nearby discarded exuviae or detrital flocs
            const org = this.organism;
            if (!org) return;

            const searchRadius = this.tentacleReach * 1.8;
            if (Array.isArray(nearbyExuviae) && nearbyExuviae.length > 0) {
                for (let i = 0; i < nearbyExuviae.length; i++) {
                    const ex = nearbyExuviae[i];
                    if (ex && Math.hypot(ex.x - org.x, ex.y - org.y) <= searchRadius) {
                        this.toolUseEquipped = true;
                        this.carriedShieldType = "EXUVIAE";
                        this.shieldDurability = 85.0;
                        break;
                    }
                }
            } else if (Array.isArray(nearbyDetritus) && nearbyDetritus.length > 0) {
                for (let i = 0; i < nearbyDetritus.length; i++) {
                    const dt = nearbyDetritus[i];
                    if (dt && Math.hypot(dt.x - org.x, dt.y - org.y) <= searchRadius) {
                        this.toolUseEquipped = true;
                        this.carriedShieldType = "DETRITUS";
                        this.shieldDurability = 55.0;
                        break;
                    }
                }
            }
        }

        /**
         * Process anti-predator defensive reflexes: freezing camouflage and ink jet.
         */
        updateDefensiveReflexes(predatorProximity) {
            this.inkJetTriggered = false;
            if (this.inkCooldown > 0) this.inkCooldown--;
            this.inkSacVolume = Math.min(100.0, this.inkSacVolume + 0.12);

            // 1. Acute mimicry freezing response when stalked
            if (predatorProximity > 0.60 && this.plasticityScore >= 0.22) {
                this.mimicryFreezing = true;
                if (this.organism) {
                    this.organism.vx *= 0.35;
                    this.organism.vy *= 0.35;
                }
            } else {
                this.mimicryFreezing = false;
            }

            // 2. Emergency ink sac discharge when in acute lethal danger
            if (predatorProximity > 0.82 && this.inkSacVolume >= 30.0 && this.inkCooldown <= 0) {
                this.inkJetTriggered = true;
                this.inkSacVolume -= 30.0;
                this.inkCooldown = 120; // 2 seconds refractory period at 60 FPS
                if (this.organism) {
                    // Reactive escape burst in direction opposite to velocity
                    const escSpd = (this.organism.dna && this.organism.dna.speed) ? this.organism.dna.speed * 1.8 : 2.5;
                    const escAngle = Math.atan2(this.organism.vy, this.organism.vx) + Math.PI + (Math.random() - 0.5) * 0.4;
                    this.organism.vx = Math.cos(escAngle) * escSpd;
                    this.organism.vy = Math.sin(escAngle) * escSpd;
                }
            }
        }

        /**
         * Primary cephalopod neural system step executed each simulation frame.
         */
        step(tick, foodProximity = 0.0, predatorProximity = 0.0, lightRatio = 0.5, context = null) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // 1. Sensory integration at optic lobes and cerebral ganglion
            const visualInput = Math.max(0.10, Math.min(1.0, lightRatio));
            this.opticLobeActivity = Number((visualInput * 0.6 + foodProximity * 0.4).toFixed(3));

            const afferentStimulus = (foodProximity * 0.45) + (predatorProximity * 0.65) + (this.opticLobeActivity * 0.20);
            this.cerebralGanglionActivity = Number(Math.min(1.0, afferentStimulus).toFixed(3));

            // 2. Action potential generation & electrophysiology
            this.depolarize(this.cerebralGanglionActivity);

            // 3. Hebbian synaptic adaptation based on motor-sensory coherence
            const rewardSignal = (foodProximity > 0.70 ? 0.35 : 0.0) + (predatorProximity < 0.20 && predatorProximity > 0.0 ? 0.25 : 0.0);
            this.adaptHebbianPlasticity(this.cerebralGanglionActivity, this.neuromuscularDrive, rewardSignal);

            // 4. Distribute motor excitation to 8 brachial nerve cords & compute reach
            this.coordinateBrachialCords(tick, this.neuromuscularDrive);

            // 5. Update benthic tool-use behavior and defensive reflexes
            const exuviaeList = (context && context.exuviae) ? context.exuviae : (typeof global.exuviae !== "undefined" ? global.exuviae : []);
            const detritusList = (context && context.detritus) ? context.detritus : (typeof global.detritus !== "undefined" ? global.detritus : []);
            this.updateToolUse(exuviaeList, detritusList);
            this.updateDefensiveReflexes(predatorProximity);

            // 6. Compute dynamic firing frequency window
            this.firingRate = this.isDepolarized ? Math.min(80.0, 20.0 + this.actionPotentialCount % 60) : Math.max(0.0, this.firingRate * 0.85);

            // 7. Expose synchronized properties directly onto host organism
            org.isProtoneuron = true;
            org.isCephalicGanglion = true;
            org.isDepolarized = this.isDepolarized;
            org.membranePotential = Number(this.membranePotential.toFixed(1));
            org.plasticityScore = this.plasticityScore;
            org.neuromuscularDrive = this.neuromuscularDrive;
            org.acetylcholineLevel = Number(this.acetylcholineLevel.toFixed(1));
            org.dopamineLevel = Number(this.dopamineLevel.toFixed(1));
            org.tentacleCoordinationScore = this.tentacleCoordinationScore;
            org.cerebralActivity = this.cerebralGanglionActivity;

            // Tentacle kinematics & tool-use properties (Hour 297 System Agent)
            org.tentacleReach = this.tentacleReach;
            org.suctionAdhesionStrength = this.suctionAdhesionStrength;
            org.toolUseEquipped = this.toolUseEquipped;
            org.carriedShieldType = this.carriedShieldType;
            org.shieldDurability = Number(this.shieldDurability.toFixed(1));
            org.shieldAbsorption = this.shieldAbsorption;
            org.mimicryFreezing = this.mimicryFreezing;
            org.inkSacVolume = Number(this.inkSacVolume.toFixed(1));
            org.inkJetTriggered = this.inkJetTriggered;
        }

        /**
         * Clean up all object references and reset buffers on organism mortality.
         */
        cleanup() {
            this.organism = null;
            this.membranePotential = -70.0;
            this.isDepolarized = false;
            this.refractoryTimer = 0;
            this.neuromuscularDrive = 0.0;
            this.plasticityScore = 0.0;
            this.tentacleCoordinationScore = 0.0;
            this.cerebralGanglionActivity = 0.0;
            this.opticLobeActivity = 0.0;
            this.toolUseEquipped = false;
            this.carriedShieldType = "NONE";
            this.shieldDurability = 0.0;
            this.mimicryFreezing = false;
            this.inkJetTriggered = false;
            this.graspedTarget = null;
            if (this.brachialCordActivations) this.brachialCordActivations.fill(0);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CephalopodNeuralSystem;
    } else {
        global.CephalopodNeuralSystem = CephalopodNeuralSystem;
    }
})(typeof window !== "undefined" ? window : global);
