// BioEcosystem - Abyssal Bioluminescence & Luciferin-Luciferase Pulse Communication Engine
// Module: src/organs/abyssal_bioluminescence.js
// Version: 5.27.0 (Hour 247 - System Agent: Luciferin-Luciferase Enzymatic Pulse Engine)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AbyssalBioluminescenceSystem
     * Models cellular luciferin-luciferase catalytic cold-light emission,
     * pulse frequency modulation (PFM), aposematic predator-deterring flash bursts,
     * and phase-locked phototropic swarm communication in aphotic benthic waters.
     */
    class AbyssalBioluminescenceSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.emissionAffinity = typeof dna.bioluminescenceEmission === "number" ? dna.bioluminescenceEmission : 0.20;
            this.luciferinSynthesisRate = typeof dna.luciferinSynthesisRate === "number" ? dna.luciferinSynthesisRate : 0.30;
            this.photophoreDensity = typeof dna.photophoreDensity === "number" ? dna.photophoreDensity : 0.25;

            // Photochemical substrate pools
            this.storedLuciferin = 5.0;            // Internal photogenic luciferin pool [0.0 - 40.0]
            this.maxLuciferinCapacity = 40.0;      // Maximum substrate storage ceiling
            this.luciferaseActivity = 1.0;         // Catalytic enzyme activity factor [0.0 - 2.0]
            this.oxyluciferinByproduct = 0.0;      // Oxidized substrate waiting for metabolic recycling

            // Pulse & Optical Flash State
            this.flashPhase = Math.random() * Math.PI * 2;
            this.pulseFrequency = 0.5 + this.emissionAffinity * 1.5; // [0.5 - 2.5 Hz]
            this.currentLuminosity = 0.0;          // Normalized photic emission intensity [0.0 - 1.0]
            this.lightRadius = 0.0;                // Dynamic photic illumination field [0.0 - 85.0 px]
            this.isFlashing = false;               // Flash pulse crest flag
            this.alarmBurstActive = false;         // Aposematic flash trigger against predators
            this.alarmCooldown = 0;                // Cooldown frames after defensive alarm flash
            this.synchronizedPeerCount = 0;        // Number of local peers currently phase-locked

            // Communication sampling cadence
            this.lastSyncTick = 0;
            this.syncCadence = 6;                  // Sample local peer flashes every 6 simulation frames
        }

        /**
         * Regenerate stored luciferin from bioenergetic ATP reserves and dietary nutrients.
         * @param {number} dt - Delta time step.
         */
        synthesizeLuciferin(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Synthesis accelerated in well-nourished or chemoautotrophically energized cells
            const energyFactor = org.energy > 35.0 ? 1.0 : (org.energy / 35.0);
            const synthesis = this.luciferinSynthesisRate * energyFactor * 0.065;
            this.storedLuciferin = Math.min(this.maxLuciferinCapacity, this.storedLuciferin + synthesis);

            // Minor basal ATP expenditure for enzyme maintenance and substrate reduction
            if (this.storedLuciferin < this.maxLuciferinCapacity) {
                org.energy = Math.max(0.0, org.energy - synthesis * 0.12);
            }

            // Recycle oxyluciferin back into active reduced substrate
            if (this.oxyluciferinByproduct > 0.0) {
                const recycled = Math.min(this.oxyluciferinByproduct, 0.04);
                this.oxyluciferinByproduct -= recycled;
                this.storedLuciferin = Math.min(this.maxLuciferinCapacity, this.storedLuciferin + recycled * 0.85);
            }
        }

        /**
         * Advance flash oscillator phase and compute pulse modulation wave.
         * @param {number} tick - Current simulation frame count.
         */
        modulatePulse(tick) {
            // Pulse frequency modulation: flash rate advances per frame
            const phaseStep = (Math.PI * 2.0 * this.pulseFrequency) / 60.0;
            this.flashPhase += phaseStep;
            if (this.flashPhase >= Math.PI * 2.0) {
                this.flashPhase -= Math.PI * 2.0;
            }

            // Sharpened cosine wave to produce distinct, pulsating biological flashes
            const rawCos = (Math.cos(this.flashPhase) + 1.0) * 0.5;
            const pulseIntensity = Math.pow(rawCos, 3.5);
            this.isFlashing = pulseIntensity > 0.60;
        }

        /**
         * Execute luciferin-luciferase catalytic photon emission:
         * Luciferin + ATP + O2 -> Oxyluciferin + AMP + PPi + photon (470nm)
         * @param {number} dt - Delta time step.
         */
        catalyzePhotons(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Alarm burst overrides rhythmic pulsing with maximum sudden flash intensity
            if (this.alarmBurstActive) {
                this.currentLuminosity = 1.0;
                this.lightRadius = Math.min(85.0, org.dna.size * 8.5);
                return;
            }

            if (this.isFlashing && this.storedLuciferin > 0.10 && org.energy > 8.0) {
                const consumption = Math.min(this.storedLuciferin, 0.14 * this.emissionAffinity);
                this.storedLuciferin -= consumption;
                this.oxyluciferinByproduct = Math.min(15.0, this.oxyluciferinByproduct + consumption);

                // Emitted luminosity modulated by photophore density and enzyme activity
                const emissionFactor = this.photophoreDensity * this.luciferaseActivity * 12.0;
                this.currentLuminosity = Math.min(1.0, consumption * emissionFactor);
                this.lightRadius = Number((this.currentLuminosity * (32.0 + this.photophoreDensity * 36.0)).toFixed(1));

                // Minimal ATP dissipation for enzymatic catalysis
                org.energy = Math.max(0.0, org.energy - 0.025);
            } else {
                // Smooth photic decay between flash cycles
                this.currentLuminosity = Math.max(0.0, this.currentLuminosity - 0.08);
                this.lightRadius = Math.max(0.0, this.lightRadius - 3.5);
            }
        }

        /**
         * Trigger an aposematic / burglar-alarm flash burst when threatened by predators.
         * @param {Object} predator - Approaching predator organism.
         */
        triggerAlarmBurst(predator) {
            const org = this.organism;
            if (!org || !org.alive || this.alarmCooldown > 0) return;

            if (this.storedLuciferin >= 1.5 && org.energy >= 12.0) {
                this.alarmBurstActive = true;
                this.alarmCooldown = 75; // 1.25 second recovery period
                this.storedLuciferin = Math.max(0.0, this.storedLuciferin - 1.5);
                this.currentLuminosity = 1.0;
                this.lightRadius = 85.0;

                // Deflect predator bite focus through sudden retinal saturation
                if (predator && predator.alive) {
                    predator.vx *= 0.45;
                    predator.vy *= 0.45;
                }
            }
        }

        /**
         * Synchronize pulse phase with nearby peer organisms in the aphotic zone (Kuramoto coupling).
         * @param {Array<Object>} organisms - Live simulation population.
         */
        synchronizeWithPeers(organisms) {
            const org = this.organism;
            if (!org || !org.alive || org.y < 440.0) {
                this.synchronizedPeerCount = 0;
                return;
            }

            let syncCount = 0;
            let avgPhaseDelta = 0.0;
            const senseDistSq = 9000.0; // ~95px visual detection radius

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const peer = organisms[i];
                    if (!peer || !peer.alive || peer === org || peer.y < 440.0) continue;

                    const dx = peer.x - org.x;
                    const dy = peer.y - org.y;
                    const dsq = dx * dx + dy * dy;

                    if (dsq < senseDistSq && peer.currentLuminosity > 0.25) {
                        const peerSys = peer.abyssalBioluminescenceSystem;
                        if (peerSys) {
                            let diff = peerSys.flashPhase - this.flashPhase;
                            // Wrap angle difference between -PI and +PI
                            while (diff < -Math.PI) diff += Math.PI * 2.0;
                            while (diff > Math.PI) diff -= Math.PI * 2.0;

                            avgPhaseDelta += diff;
                            syncCount++;

                            // Phototropic swarm cohesion: gently orient towards flashing peers
                            const dist = Math.sqrt(dsq) || 1.0;
                            const pull = 0.025 * (1.0 - dist / 95.0);
                            org.vx += (dx / dist) * pull;
                            org.vy += (dy / dist) * pull;
                        }
                    }
                }
            }

            this.synchronizedPeerCount = syncCount;

            // Apply phase-locking adjustment (Kuramoto oscillator synchronization)
            if (syncCount > 0) {
                const couplingFactor = 0.08 * Math.min(1.0, syncCount / 4.0);
                this.flashPhase += (avgPhaseDelta / syncCount) * couplingFactor;
            }
        }

        /**
         * Step cycle executed per simulation frame.
         * @param {number} tick - Current simulation frame count.
         * @param {Array<Object>} organisms - Live simulation population.
         */
        step(tick, organisms) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Decrement alarm cooldown timer
            if (this.alarmCooldown > 0) {
                this.alarmCooldown--;
                if (this.alarmCooldown <= 60) {
                    this.alarmBurstActive = false;
                }
            }

            this.synthesizeLuciferin(0.016);
            this.modulatePulse(tick);
            this.catalyzePhotons(0.016);

            // Sample local swarm synchrony periodically
            if (tick - this.lastSyncTick >= this.syncCadence) {
                this.synchronizeWithPeers(organisms);
                this.lastSyncTick = tick;
            }

            // Expose properties on host organism for rendering, HUD, and predator deterrence
            org.storedLuciferin = Number(this.storedLuciferin.toFixed(2));
            org.currentLuminosity = Number(this.currentLuminosity.toFixed(3));
            org.lightRadius = Number(this.lightRadius.toFixed(1));
            org.isFlashing = this.isFlashing;
            org.alarmBurstActive = this.alarmBurstActive;
            org.synchronizedPeerCount = this.synchronizedPeerCount;
        }

        /**
         * Clean unhooking on organism mortality to prevent memory leaks.
         */
        cleanup() {
            this.organism = null;
            this.storedLuciferin = 0.0;
            this.currentLuminosity = 0.0;
            this.lightRadius = 0.0;
            this.isFlashing = false;
            this.alarmBurstActive = false;
            this.synchronizedPeerCount = 0;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AbyssalBioluminescenceSystem;
    } else {
        global.AbyssalBioluminescenceSystem = AbyssalBioluminescenceSystem;
    }
})(typeof window !== "undefined" ? window : global);
