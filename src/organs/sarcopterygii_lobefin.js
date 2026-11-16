// BioEcosystem - Early Sarcopterygii Monobasic Lobe-Fins, Pulmonary Lungs & Choanae
// Module: src/organs/sarcopterygii_lobefin.js
// Version: 8.46.0 (Hour 566 - System Agent: Monobasic Lobe-Fin Stalks, Substrate Walking, Pulmonary Respiration, Choanae & 111th/112th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SarcopterygiiLobeFinManager
     * High-fidelity biological simulation of early Sarcopterygii / Tetrapodomorpha & Rhipidistia (lobe-finned fishes & tetrapod precursors):
     * - Monobasic Articulated Lobe-Fin Stalks: Internal muscle stalks centered on a single proximal bone (humerus in pectoral, femur in pelvic girdle)
     * - Substrate Walking & Prop-Up Locomotion: Ability to support body mass on sediment, crawling over anoxic mud banks and shallow vegetative tangles
     * - Vascularized Bilobed Pulmonary Lungs: Modified swim bladder transformed into true vascularized respiratory lungs for atmospheric air-breathing
     * - Surface Air-Gulping Behavior: Periodic ascent to water surface to gulp atmospheric air, delivering immunity to hypoxic / anoxic water events
     * - Internal Nostrils (Choanae): Paired respiratory conduits connecting external narial apertures directly to the oral roof for closed-mouth breathing
     * - Periscope Dorsal Orbits: Skull-top eye positioning enabling stealthy surface scanning and shallow ambush while body remains submerged
     * - 111th Telemetry Channel (% LFI - Lobe-Fin Locomotion Index) mathematical core
     * - 112th Telemetry Channel (% PRI - Pulmonary Respiration & Air-Breathing Index) mathematical core
     */
    class SarcopterygiiLobeFinManager {
        constructor() {
            this.baseLobeFinTorque = 1.75;           // Monobasic internal muscle stalk torque [1.40 - 2.40x]
            this.basePropUpEfficiency = 0.72;       // Substrate body elevation efficiency [0.50 - 0.95]
            this.baseVascularDensity = 0.78;        // Pulmonary lung capillary network density [0.55 - 0.98]
            this.baseLungVolume = 1.0;              // Normalized lung capacity [0.50 - 1.30]
            this.baseSurfaceGulpRate = 0.045;       // Surface air intake frequency [0.02 - 0.08 /tick]
            this.baseHypoxicSurvivalBoost = 0.85;   // Anoxia metabolic compensation [0.70 - 0.95]
            this.baseChoanaeConductivity = 0.68;    // Internal narial airflow conductivity [0.40 - 0.90]
            this.basePeriscopeField = 0.75;         // Dorsal cranial visual scanning field [0.60 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalSarcopterygiiOrganisms: 0,
                sarcopterygiiPrevalence: 0.0,
                meanLobeFinIndex: 0.0,               // 111th Channel % LFI
                meanPulmonaryRespirationIndex: 0.0,  // 112th Channel % PRI
                meanLobeFinTorque: 1.75,
                meanPropUpEfficiency: 0.72,
                meanPulmonaryVascularDensity: 0.78,
                meanLungVolume: 1.0,
                meanChoanaeConductivity: 0.68,
                meanPeriscopeVisionField: 0.75,
                substrateWalkingEvents: 0,
                surfaceAirGulpEvents: 0,
                pulmonaryBreathingEvents: 0,
                hypoxicAnoxiaRescues: 0,
                choanaeAirInflows: 0,
                periscopeAmbushStrikes: 0,
                cumulativePulmonaryBiomass: 0.0
            };
        }

        /**
         * Initialize Sarcopterygii lobe-fin stalks, vascularized lungs, choanae, and periscope orbits on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Demersal nekton, shallow wetland foragers, ambush predators, or organisms with sarcopterygian/tetrapodomorph affinity
            const isCompetent = Boolean(org.hasSarcopterygiiTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "lobe_finned" || org.niche === "tetrapodomorph" || org.niche === "lungfish" || org.niche === "shallow_ambush" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.40) ||
                  (org.dna && (org.dna.substrateAffinity || 0) > 0.25) ||
                  (org.dna && ((org.dna.sarcopterygiiAffinity || 0) > 0.20 || (org.dna.lungAffinity || 0) > 0.20 || (org.dna.limbAffinity || 0) > 0.20))));

            if (typeof org.hasSarcopterygiiTrait === "undefined") {
                org.hasSarcopterygiiTrait = isCompetent;
            }

            if (!org.hasSarcopterygiiTrait) {
                org.isSarcopterygii = false;
                org.lobeFinMuscularTorque = 1.0;
                org.substratePropUpEfficiency = 0.0;
                org.propulsionStepPhase = 0.0;
                org.substrateContact = false;
                org.pulmonaryVascularDensity = 0.0;
                org.lungVolume = 0.0;
                org.surfaceGulpFrequency = 0.0;
                org.airBreathingGulpTimer = 0.0;
                org.atmosphericOxygenReserve = 0.0;
                org.bimodalBreathingActive = false;
                org.hypoxicLagoonSurvivalBoost = 0.0;
                org.choanaeAirflowConductivity = 0.0;
                org.periscopeVisionField = 0.0;
                org.lobeFinLocomotionIndex = 0.0;
                org.pulmonaryRespirationIndex = 0.0;
                return;
            }

            org.isSarcopterygii = true;

            // 1. Monobasic Lobe-Fin Stalk & Substrate Locomotion
            if (typeof org.lobeFinMuscularTorque === "undefined") {
                org.lobeFinMuscularTorque = 1.45 + Math.random() * 0.90; // [1.40 - 2.40x]
            }
            if (typeof org.substratePropUpEfficiency === "undefined") {
                org.substratePropUpEfficiency = 0.55 + Math.random() * 0.38; // [0.50 - 0.95]
            }
            if (typeof org.propulsionStepPhase === "undefined") {
                org.propulsionStepPhase = Math.random() * Math.PI * 2;
            }
            if (typeof org.substrateContact === "undefined") {
                org.substrateContact = false;
            }

            // 2. Vascularized Lungs & Atmospheric Air-Breathing
            if (typeof org.pulmonaryVascularDensity === "undefined") {
                org.pulmonaryVascularDensity = 0.60 + Math.random() * 0.36; // [0.55 - 0.98]
            }
            if (typeof org.lungVolume === "undefined") {
                org.lungVolume = 0.65 + Math.random() * 0.55; // [0.50 - 1.30]
            }
            if (typeof org.surfaceGulpFrequency === "undefined") {
                org.surfaceGulpFrequency = 0.025 + Math.random() * 0.050; // [0.02 - 0.08 /tick]
            }
            if (typeof org.airBreathingGulpTimer === "undefined") {
                org.airBreathingGulpTimer = 2.0 + Math.random() * 5.0; // Seconds between gulps
            }
            if (typeof org.atmosphericOxygenReserve === "undefined") {
                org.atmosphericOxygenReserve = 85.0 + Math.random() * 15.0; // [0 - 100%]
            }
            if (typeof org.bimodalBreathingActive === "undefined") {
                org.bimodalBreathingActive = true;
            }
            if (typeof org.hypoxicLagoonSurvivalBoost === "undefined") {
                org.hypoxicLagoonSurvivalBoost = 0.72 + Math.random() * 0.22; // [0.70 - 0.95]
            }

            // 3. Internal Nostrils (Choanae) & Periscope Optics
            if (typeof org.choanaeAirflowConductivity === "undefined") {
                org.choanaeAirflowConductivity = 0.45 + Math.random() * 0.42; // [0.40 - 0.90]
            }
            if (typeof org.periscopeVisionField === "undefined") {
                org.periscopeVisionField = 0.62 + Math.random() * 0.32; // [0.60 - 0.95]
            }

            // 4. Telemetry Channels
            if (typeof org.lobeFinLocomotionIndex === "undefined") {
                org.lobeFinLocomotionIndex = 0.0; // 111th Channel % LFI
            }
            if (typeof org.pulmonaryRespirationIndex === "undefined") {
                org.pulmonaryRespirationIndex = 0.0; // 112th Channel % PRI
            }
        }

        /**
         * Trigger surface air-gulp behavior, filling bilobed lungs with atmospheric oxygen.
         * @param {Object} org - Sarcopterygii organism.
         */
        triggerSurfaceAirGulp(org) {
            if (!org || !org.isSarcopterygii) return;

            this.metrics.surfaceAirGulpEvents++;
            org.atmosphericOxygenReserve = 100.0;
            org.airBreathingGulpTimer = 6.0 + Math.random() * 6.0;

            // Direct metabolic oxygen boost from atmospheric intake
            const lungCapacity = (org.lungVolume || 1.0) * (org.pulmonaryVascularDensity || 0.78);
            if (typeof org.energy === "number") {
                org.energy = Math.min(235.0, org.energy + lungCapacity * 2.8);
            }
            this.metrics.cumulativePulmonaryBiomass += lungCapacity * 0.15;
        }

        /**
         * Update Sarcopterygii lobe-fin kinematics, substrate walking, lung gas exchange, and 111th/112th channels.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isSarcopterygii === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isSarcopterygii) return;

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const currentY = (typeof org.y === "number") ? org.y : height * 0.5;

            // 1. Substrate Contact & Monobasic Lobe-Fin Locomotion
            // Evaluates proximity to muddy bottom (y > height * 0.68) or littoral shallow boundary
            const nearBottom = currentY >= (height * 0.65);
            org.substrateContact = nearBottom;

            if (nearBottom) {
                // Ground crawling mode: Lobe-fin limb stalks push against substrate
                this.metrics.substrateWalkingEvents++;
                const torque = org.lobeFinMuscularTorque || 1.75;
                const propUp = org.substratePropUpEfficiency || 0.72;

                // Advance alternating walking gait step cycle
                const stepRate = Math.max(0.8, speed * 2.5) * Math.PI * 2;
                org.propulsionStepPhase = (org.propulsionStepPhase + stepRate * dt) % (Math.PI * 2);

                // Monobasic forward push eliminating benthic mud friction drag
                const forwardPush = torque * propUp * 0.12 * dt * 60.0;
                const heading = Math.atan2(org.vy || 0, org.vx || 1);
                org.vx = (org.vx || 0) + Math.cos(heading) * forwardPush * 0.08;
                org.vy = (org.vy || 0) + Math.sin(heading) * forwardPush * 0.08;

                // Slight vertical body lift supporting weight off sediment
                org.vy = (org.vy || 0) - 0.04 * propUp * dt * 60.0;
            } else {
                // Free-swimming: Lobe fins act as robust steering paddles
                const paddleFreq = Math.max(0.5, speed) * Math.PI * 2;
                org.propulsionStepPhase = (org.propulsionStepPhase + paddleFreq * dt) % (Math.PI * 2);
            }

            // 2. Pulmonary Lungs & Atmospheric Air-Breathing Dynamics
            org.airBreathingGulpTimer = (org.airBreathingGulpTimer || 0.0) - dt;

            // Surface approach triggers air gulp (when near surface y < height * 0.22)
            if (currentY <= (height * 0.22) || org.airBreathingGulpTimer <= 0.0) {
                // If near surface, gulp immediately; if in deep water and timer expired, steer upward
                if (currentY <= (height * 0.25)) {
                    this.triggerSurfaceAirGulp(org);
                } else if (Math.random() < (org.surfaceGulpFrequency || 0.045)) {
                    // Impulse upward to breach surface
                    org.vy = (org.vy || 0) - 0.35 * dt * 60.0;
                }
            }

            // Atmospheric Oxygen Depletion & Pulmonary Respiration:
            // Oxygen reserve slowly diffuses into bloodstream, providing continuous vitality
            if ((org.atmosphericOxygenReserve || 0) > 0.0) {
                const consumptionRate = 1.4 * dt; // % per second
                org.atmosphericOxygenReserve = Math.max(0.0, org.atmosphericOxygenReserve - consumptionRate);
                this.metrics.pulmonaryBreathingEvents++;

                // Steady metabolic support from lung oxygen
                if (typeof org.energy === "number" && org.energy < 225.0) {
                    org.energy += 0.015 * (org.pulmonaryVascularDensity || 0.78) * dt;
                }
            } else {
                // When lungs are depleted and water is stagnant/hypoxic, trigger emergency surface ascent
                this.metrics.hypoxicAnoxiaRescues++;
                org.vy = (org.vy || 0) - 0.25 * dt * 60.0;
            }

            // 3. Choanae Airflow & Periscope Vision
            // Closed-mouth breathing through internal narial ducts
            if ((org.choanaeAirflowConductivity || 0.65) > 0.50) {
                this.metrics.choanaeAirInflows++;
            }

            // Ambush detection: when resting on substrate, periscope eyes scan dorsal water column
            if (nearBottom && speed < 0.45 && Math.random() < 0.012) {
                this.metrics.periscopeAmbushStrikes++;
                // Burst strike upward at passing prey
                const strikeBoost = (org.lobeFinMuscularTorque || 1.75) * 0.45;
                org.vy = (org.vy || 0) - strikeBoost;
            }

            // 4. 111th Telemetry Channel: Lobe-Fin Locomotion Index (% LFI)
            // Formulation:
            // - Monobasic Joint Torque (%35 weight): [1.40 - 2.40x]
            // - Substrate Prop-Up Efficiency (%30 weight): [0.50 - 0.95]
            // - Internal Muscular Stalk Integrity (%20 weight): [0.55 - 0.98]
            // - Walking Step Cycle Articulation (%15 weight): [0.0 - 1.0]
            const torqueRatio = Math.min(1.0, Math.max(0.0, ((org.lobeFinMuscularTorque || 1.75) - 1.40) / 1.0));
            const propUpRatio = Math.min(1.0, Math.max(0.0, ((org.substratePropUpEfficiency || 0.72) - 0.50) / 0.45));
            const stalkRatio = Math.min(1.0, Math.max(0.0, ((org.pulmonaryVascularDensity || 0.78) - 0.55) / 0.43));
            const stepRatio = org.substrateContact ? 1.0 : 0.65;

            const rawLFI = (torqueRatio * 0.35 + propUpRatio * 0.30 + stalkRatio * 0.20 + stepRatio * 0.15) * 100.0;
            org.lobeFinLocomotionIndex = Math.min(100.0, Math.max(0.0, rawLFI));

            // 5. 112th Telemetry Channel: Pulmonary Respiration & Air-Breathing Index (% PRI)
            // Formulation:
            // - Atmospheric Air Reserve Level (%35 weight): [0 - 100%]
            // - Pulmonary Vascular Density (%30 weight): [0.55 - 0.98]
            // - Hypoxic Lagoon Survival Factor (%20 weight): [0.70 - 0.95]
            // - Choanae Internal Airflow Conductivity (%15 weight): [0.40 - 0.90]
            const reserveRatio = Math.min(1.0, Math.max(0.0, (org.atmosphericOxygenReserve || 80.0) / 100.0));
            const vascularRatio = Math.min(1.0, Math.max(0.0, ((org.pulmonaryVascularDensity || 0.78) - 0.55) / 0.43));
            const survivalRatio = Math.min(1.0, Math.max(0.0, ((org.hypoxicLagoonSurvivalBoost || 0.85) - 0.70) / 0.25));
            const choanaeRatio = Math.min(1.0, Math.max(0.0, ((org.choanaeAirflowConductivity || 0.68) - 0.40) / 0.50));

            const rawPRI = (reserveRatio * 0.35 + vascularRatio * 0.30 + survivalRatio * 0.20 + choanaeRatio * 0.15) * 100.0;
            org.pulmonaryRespirationIndex = Math.min(100.0, Math.max(0.0, rawPRI));
        }

        /**
         * Batch update all organisms and compute aggregate Sarcopterygii metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let sarcCount = 0;
            let sumLFI = 0.0;
            let sumPRI = 0.0;
            let sumTorque = 0.0;
            let sumPropUp = 0.0;
            let sumVascular = 0.0;
            let sumLungVol = 0.0;
            let sumChoanae = 0.0;
            let sumPeriscope = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isSarcopterygii) {
                    sarcCount++;
                    sumLFI += org.lobeFinLocomotionIndex || 0.0;
                    sumPRI += org.pulmonaryRespirationIndex || 0.0;
                    sumTorque += org.lobeFinMuscularTorque || 1.75;
                    sumPropUp += org.substratePropUpEfficiency || 0.72;
                    sumVascular += org.pulmonaryVascularDensity || 0.78;
                    sumLungVol += org.lungVolume || 1.0;
                    sumChoanae += org.choanaeAirflowConductivity || 0.68;
                    sumPeriscope += org.periscopeVisionField || 0.75;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalSarcopterygiiOrganisms = sarcCount;
            this.metrics.sarcopterygiiPrevalence = liveCount > 0 ? (sarcCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanLobeFinIndex = sarcCount > 0 ? (sumLFI / sarcCount) : 0.0;
            this.metrics.meanPulmonaryRespirationIndex = sarcCount > 0 ? (sumPRI / sarcCount) : 0.0;
            this.metrics.meanLobeFinTorque = sarcCount > 0 ? (sumTorque / sarcCount) : 1.75;
            this.metrics.meanPropUpEfficiency = sarcCount > 0 ? (sumPropUp / sarcCount) : 0.72;
            this.metrics.meanPulmonaryVascularDensity = sarcCount > 0 ? (sumVascular / sarcCount) : 0.78;
            this.metrics.meanLungVolume = sarcCount > 0 ? (sumLungVol / sarcCount) : 1.0;
            this.metrics.meanChoanaeConductivity = sarcCount > 0 ? (sumChoanae / sarcCount) : 0.68;
            this.metrics.meanPeriscopeVisionField = sarcCount > 0 ? (sumPeriscope / sarcCount) : 0.75;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Sarcopterygii metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SarcopterygiiLobeFinManager;
    }
    if (typeof global !== "undefined") {
        global.SarcopterygiiLobeFinManager = SarcopterygiiLobeFinManager;
        global.sarcopterygiiLobeFinManager = new SarcopterygiiLobeFinManager();
    }
})(typeof window !== "undefined" ? window : global);
