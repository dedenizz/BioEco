// BioEcosystem - Ventral Photophore Array & Counter-Illumination Camouflage Engine
// Module: src/organs/counter_illumination.js
// Version: 5.37.0 (Hour 257 - System Agent: Ventral Photophores & Silhouette Concealment)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CounterIlluminationSystem
     * Advanced physiological counter-shading and active silhouette concealment engine:
     * - Dorsal photometer sensor sampling ambient downwelling solar irradiance
     * - Ventral photophore array emitting monochromatic cyan photons (~485 nm)
     * - Closed-loop photometric intensity matching and mismatch error feedback
     * - Active metabolic consumption of stored luciferin substrate during photon emission
     * - Upward predatory ambush deterrence via silhouette concealment index
     */
    class CounterIlluminationSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.ventralPhotophoreDensity = typeof dna.ventralPhotophoreDensity === "number" ? dna.ventralPhotophoreDensity : 0.25;
            this.accuracy = typeof dna.counterIlluminationAccuracy === "number" ? dna.counterIlluminationAccuracy : 0.30;
            this.luciferinSynthesisRate = typeof dna.luciferinSynthesisRate === "number" ? dna.luciferinSynthesisRate : 0.30;

            // Photometric sensory and emission state
            this.dorsalIrradiance = 0.0;           // Downwelling solar flux sampled at host depth [0.0 - 1.0]
            this.ventralLuminosity = 0.0;          // Downward photophore flux emission [0.0 - 1.0]
            this.targetLuminosity = 0.0;           // Optimal flux matching downwelling background [0.0 - 1.0]
            this.mismatchError = 0.0;              // Absolute photometric mismatch |I_ventral - I_downwelling|
            this.silhouetteConcealmentScore = 0.0; // Anti-ambush concealment metric [0.0 - 1.0]

            // Photophore morphology and optics
            const hostSize = (dna.size && typeof dna.size === "number") ? dna.size : 6.0;
            this.photophoreCount = Math.max(0, Math.round(this.ventralPhotophoreDensity * hostSize * 1.5));
            this.counterIlluminationActive = false; // Active photon veil emission status
            this.emissionWavelength = 485;         // Monochromatic peak cyan wavelength (nm)

            // Environmental optical parameters
            this.surfaceDepth = 80.0;              // Epipelagic surface boundary (px)
            this.attenuationKappa = 0.0095;        // Water column light extinction coefficient
            this.mesopelagicMin = 240.0;           // Twilight zone upper threshold (px)
            this.mesopelagicMax = 440.0;           // Twilight zone lower threshold (px)

            // Metabolic regulation cadence
            this.lastSampleTick = 0;
            this.sampleCadence = 4;                // Calibrate photometer every 4 frames
        }

        /**
         * Sample downwelling irradiance from the dorsal photometer based on depth and diel solar angle.
         * @param {number} dielCyclePhase - Normalized diel phase [0.0 - 1.0] (0.5 is noon peak).
         */
        sampleDorsalIrradiance(dielCyclePhase) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const phase = typeof dielCyclePhase === "number" ? dielCyclePhase : 0.0;
            // Solar elevation curve: peak at phase 0.5 (noon), 0 at nighttime
            const solarFlux = Math.max(0.0, Math.sin(phase * Math.PI));

            // Exponential light attenuation with bathymetric water column depth
            const effectiveDepth = Math.max(0.0, org.y - this.surfaceDepth);
            const transmission = Math.exp(-this.attenuationKappa * effectiveDepth);

            // Downwelling ambient light intensity reaching the dorsal surface
            this.dorsalIrradiance = Number((solarFlux * transmission).toFixed(4));
        }

        /**
         * Closed-loop regulation of ventral photophore luminescence matching downwelling irradiance.
         * @param {number} dt - Delta time step.
         */
        regulateVentralEmission(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // In twilight depths (240 - 440 px), downwelling light creates sharp silhouettes
            const inTwilightZone = (org.y >= this.mesopelagicMin && org.y <= this.mesopelagicMax);

            if (this.dorsalIrradiance > 0.01 && this.ventralPhotophoreDensity > 0.05 && (inTwilightZone || org.y > 180.0)) {
                // Optimal target matches ambient downwelling light modulated by sensor accuracy
                const accuracyFactor = Math.min(1.2, this.accuracy / 0.30);
                this.targetLuminosity = Math.min(1.0, this.dorsalIrradiance * accuracyFactor);

                // Check substrate availability (luciferin pool or metabolic ATP)
                const hasLuciferin = (typeof org.storedLuciferin === "number" && org.storedLuciferin > 0.1);
                const hasEnergy = (org.energy > 8.0);

                if (hasLuciferin || hasEnergy) {
                    // Smooth photometric convergence with photophore neural response inertia
                    const responseSpeed = 0.22;
                    this.ventralLuminosity += (this.targetLuminosity - this.ventralLuminosity) * responseSpeed;

                    // Consume luciferin substrate and small ATP maintenance cost
                    const substrateCost = this.ventralLuminosity * this.ventralPhotophoreDensity * 0.015;
                    if (hasLuciferin) {
                        org.storedLuciferin = Math.max(0.0, org.storedLuciferin - substrateCost);
                    } else {
                        org.energy = Math.max(0.0, org.energy - substrateCost * 0.08);
                    }
                    this.counterIlluminationActive = (this.ventralLuminosity > 0.02);
                } else {
                    // Exhausted substrate: photophore output rapidly decays
                    this.ventralLuminosity = Math.max(0.0, this.ventralLuminosity - 0.05);
                    this.counterIlluminationActive = false;
                }
            } else {
                // Nighttime, bright surface, or benthic aphotic layer: extinguish counter-illumination
                this.targetLuminosity = 0.0;
                this.ventralLuminosity = Math.max(0.0, this.ventralLuminosity - 0.06);
                this.counterIlluminationActive = false;
            }

            this.ventralLuminosity = Number(Math.max(0.0, Math.min(1.0, this.ventralLuminosity)).toFixed(4));
        }

        /**
         * Evaluate photometric mismatch error and calculate silhouette concealment efficiency.
         */
        computeSilhouetteConcealment() {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Absolute difference between emitted ventral light and background downwelling light
            this.mismatchError = Number(Math.abs(this.ventralLuminosity - this.dorsalIrradiance).toFixed(4));

            if (this.dorsalIrradiance <= 0.01) {
                // Negligible ambient light: no downward silhouette to mask
                this.silhouetteConcealmentScore = 0.0;
                return;
            }

            // High density and low mismatch yield high silhouette concealment score
            const densityBonus = Math.min(1.0, this.ventralPhotophoreDensity * 2.5);
            const matchingAccuracy = Math.max(0.0, 1.0 - (this.mismatchError * 3.0));
            const rawScore = matchingAccuracy * densityBonus;

            this.silhouetteConcealmentScore = Number(Math.max(0.0, Math.min(1.0, rawScore)).toFixed(3));
        }

        /**
         * Calculate predation encounter deterrence for upward-looking predators.
         * @param {number} predatorY - Vertical coordinate of attacking predator.
         * @returns {number} Distance multiplier (>1.0 pushes apparent distance further).
         */
        getUpwardPredationDeterrence(predatorY) {
            const org = this.organism;
            if (!org || !org.alive) return 1.0;

            // Counter-illumination functions specifically against predators looking upward from below
            if (typeof predatorY === "number" && predatorY > org.y) {
                const depthDelta = predatorY - org.y;
                if (depthDelta > 10.0 && this.silhouetteConcealmentScore > 0.15) {
                    // Concealed silhouette appears transparent against downwelling light column
                    return 1.0 + (this.silhouetteConcealmentScore * 1.8);
                }
            }
            return 1.0;
        }

        /**
         * Step cycle executed per simulation frame.
         * @param {number} tick - Current simulation frame count.
         * @param {number} dielCyclePhase - Normalized diel cycle phase [0.0 - 1.0].
         */
        step(tick, dielCyclePhase) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (tick - this.lastSampleTick >= this.sampleCadence) {
                this.sampleDorsalIrradiance(dielCyclePhase);
                this.lastSampleTick = tick;
            }

            this.regulateVentralEmission(0.016);
            this.computeSilhouetteConcealment();

            // Export telemetry state directly to host organism for HUD, optics, and combat
            org.dorsalIrradiance = this.dorsalIrradiance;
            org.ventralLuminosity = this.ventralLuminosity;
            org.mismatchError = this.mismatchError;
            org.silhouetteConcealmentScore = this.silhouetteConcealmentScore;
            org.ventralPhotophoreCount = this.photophoreCount;
            org.counterIlluminationActive = this.counterIlluminationActive;
        }

        /**
         * Clean unhooking on organism mortality to prevent memory leaks.
         */
        cleanup() {
            this.organism = null;
            this.dorsalIrradiance = 0.0;
            this.ventralLuminosity = 0.0;
            this.targetLuminosity = 0.0;
            this.mismatchError = 0.0;
            this.silhouetteConcealmentScore = 0.0;
            this.counterIlluminationActive = false;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CounterIlluminationSystem;
    } else {
        global.CounterIlluminationSystem = CounterIlluminationSystem;
    }
})(typeof window !== "undefined" ? window : global);
