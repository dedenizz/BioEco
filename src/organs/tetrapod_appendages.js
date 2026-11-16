// BioEcosystem - Early Stem Tetrapods Polydactyly Digits, Cervical Neck, Thoracic Ribcage & Tympanic Hearing
// Module: src/organs/tetrapod_appendages.js
// Version: 8.52.0 (Hour 572 - System Agent: Carpus/Tarsus Digits, Pectoral Neck Detachment, Thoracic Ribcage & 113th/114th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TetrapodAppendageManager
     * High-fidelity biological simulation of early Stem Tetrapods & Early Amphibia / Labyrinthodontia (Acanthostega, Ichthyostega, Tulerpeton):
     * - Carpus & Tarsus Joints with Polydactyly Digits: Fully articulated wrists/ankles and 6-8 digits providing true terrestrial purchase and propulsion
     * - Pectoral Girdle Detachment & Cervical Articulation: Skull freed from shoulder bones, allowing independent head elevation, yaw turning, and ambush tracking
     * - Interlocking Vertebrae & Thoracic Ribcage: Intercentra and pleurocentra articulation with robust overlapping ribs protecting lungs from gravitational collapse
     * - Tympanic Otic Notch & Stapes Bone Hearing: Middle-ear stapes bone providing impedance matching to hear airborne acoustic sound waves
     * - 113th Telemetry Channel (% TAI - Tetrapod Appendicular Index) mathematical core
     * - 114th Telemetry Channel (% AAI - Amphibious Acoustic & Auditory Index) mathematical core
     */
    class TetrapodAppendageManager {
        constructor() {
            this.baseDigitCount = 7.0;                // Polydactyly digit count [6 - 8 digits]
            this.baseCarpalFlexibility = 0.75;        // Wrist/ankle articulation flexibility [0.55 - 0.95]
            this.baseDigitGripTraction = 0.78;        // Substrate claw/pad grip traction [0.55 - 0.98]
            this.baseCervicalMobility = 0.45;         // Neck rotation angle [0.25 - 0.65 rad]
            this.baseRibcageSupport = 0.76;           // Thoracic ribcage gravitational defense [0.50 - 0.95]
            this.baseTympanicSensitivity = 0.70;      // Otic notch acoustic resonance [0.45 - 0.92]
            this.baseStapesImpedance = 0.74;          // Middle ear airborne impedance match [0.50 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalTetrapodOrganisms: 0,
                tetrapodPrevalence: 0.0,
                meanTetrapodAppendicularIndex: 0.0,   // 113th Channel % TAI
                meanAmphibiousAcousticIndex: 0.0,     // 114th Channel % AAI
                meanDigitCount: 7.0,
                meanDigitGripTraction: 0.78,
                meanCervicalMobilityAngle: 0.45,
                meanThoracicRibcageSupport: 0.76,
                meanAerialAcousticSensitivity: 0.70,
                meanStapesImpedanceMatch: 0.74,
                terrestrialStridingEvents: 0,
                cervicalHeadTurns: 0,
                aerialAcousticAlerts: 0,
                gravityDefianceEvents: 0,
                terrestrialPreyCaptures: 0,
                cumulativeTetrapodBiomass: 0.0
            };
        }

        /**
         * Initialize Tetrapod carpus/tarsus digits, cervical neck, ribcage, and stapes hearing on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Amphibious foragers, littoral predators, labyrinthodonts, or organisms with tetrapod/digit/neck affinity
            const isCompetent = Boolean(org.hasTetrapodTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "stem_tetrapod" || org.niche === "amphibian" || org.niche === "labyrinthodont" || org.niche === "shore_crawler" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.45) ||
                  (org.dna && (org.dna.substrateAffinity || 0) > 0.35) ||
                  (org.dna && ((org.dna.tetrapodAffinity || 0) > 0.20 || (org.dna.digitAffinity || 0) > 0.20 || (org.dna.neckAffinity || 0) > 0.20 || (org.dna.hearingAffinity || 0) > 0.20))));

            if (typeof org.hasTetrapodTrait === "undefined") {
                org.hasTetrapodTrait = isCompetent;
            }

            if (!org.hasTetrapodTrait) {
                org.isStemTetrapod = false;
                org.digitCount = 0;
                org.carpalTarsalFlexibility = 0.0;
                org.digitGripTraction = 0.0;
                org.terrestrialStepCycle = 0.0;
                org.groundStridingActive = false;
                org.cervicalMobilityAngle = 0.0;
                org.cervicalTargetTracking = 0.0;
                org.cervicalHeadAngle = 0.0;
                org.thoracicRibcageSupport = 0.0;
                org.gravityResistanceFactor = 1.0;
                org.tympanicNotchSensitivity = 0.0;
                org.stapesImpedanceMatching = 0.0;
                org.aerialAcousticDetection = false;
                org.tetrapodAppendicularIndex = 0.0;
                org.amphibiousAcousticIndex = 0.0;
                return;
            }

            org.isStemTetrapod = true;

            // 1. Carpus & Tarsus Joints with Polydactyly Digits
            if (typeof org.digitCount === "undefined") {
                org.digitCount = Math.floor(6 + Math.random() * 2.8); // [6 - 8 digits: Acanthostega=8, Ichthyostega=7, Tulerpeton=6]
            }
            if (typeof org.carpalTarsalFlexibility === "undefined") {
                org.carpalTarsalFlexibility = 0.58 + Math.random() * 0.36; // [0.55 - 0.95]
            }
            if (typeof org.digitGripTraction === "undefined") {
                org.digitGripTraction = 0.60 + Math.random() * 0.36; // [0.55 - 0.98]
            }
            if (typeof org.terrestrialStepCycle === "undefined") {
                org.terrestrialStepCycle = Math.random() * Math.PI * 2;
            }
            if (typeof org.groundStridingActive === "undefined") {
                org.groundStridingActive = false;
            }

            // 2. Pectoral Girdle Detachment & Cervical Articulation
            if (typeof org.cervicalMobilityAngle === "undefined") {
                org.cervicalMobilityAngle = 0.30 + Math.random() * 0.32; // [0.25 - 0.65 rad]
            }
            if (typeof org.cervicalTargetTracking === "undefined") {
                org.cervicalTargetTracking = 0.62 + Math.random() * 0.32; // [0.60 - 0.95]
            }
            if (typeof org.cervicalHeadAngle === "undefined") {
                org.cervicalHeadAngle = 0.0;
            }

            // 3. Interlocking Vertebrae & Thoracic Ribcage Support
            if (typeof org.thoracicRibcageSupport === "undefined") {
                org.thoracicRibcageSupport = 0.55 + Math.random() * 0.38; // [0.50 - 0.95]
            }
            if (typeof org.gravityResistanceFactor === "undefined") {
                org.gravityResistanceFactor = 0.70 + Math.random() * 0.28; // [0.65 - 0.99]
            }

            // 4. Tympanic Otic Notch & Stapes Acoustic Hearing
            if (typeof org.tympanicNotchSensitivity === "undefined") {
                org.tympanicNotchSensitivity = 0.48 + Math.random() * 0.42; // [0.45 - 0.92]
            }
            if (typeof org.stapesImpedanceMatching === "undefined") {
                org.stapesImpedanceMatching = 0.52 + Math.random() * 0.40; // [0.50 - 0.95]
            }
            if (typeof org.aerialAcousticDetection === "undefined") {
                org.aerialAcousticDetection = false;
            }

            // 5. Telemetry Channels
            if (typeof org.tetrapodAppendicularIndex === "undefined") {
                org.tetrapodAppendicularIndex = 0.0; // 113th Channel % TAI
            }
            if (typeof org.amphibiousAcousticIndex === "undefined") {
                org.amphibiousAcousticIndex = 0.0; // 114th Channel % AAI
            }
        }

        /**
         * Perform terrestrial striding step cycle across uneven substrate or shore boundary.
         * @param {Object} org - Stem Tetrapod organism.
         * @param {number} dt - Time delta in seconds.
         */
        executeTerrestrialStride(org, dt) {
            if (!org || !org.isStemTetrapod) return;

            this.metrics.terrestrialStridingEvents++;
            org.groundStridingActive = true;

            const grip = org.digitGripTraction || 0.78;
            const carpal = org.carpalTarsalFlexibility || 0.75;
            const digits = org.digitCount || 7;

            // Quadripedal diagonal gait advance
            const gaitSpeed = Math.max(1.0, (digits / 7.0) * 2.2) * Math.PI * 2;
            org.terrestrialStepCycle = (org.terrestrialStepCycle + gaitSpeed * dt) % (Math.PI * 2);

            // Ground leverage propulsion: digits grip sediment to push forward without slipping
            const strideImpulse = grip * carpal * 0.16 * dt * 60.0;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);

            org.vx = (org.vx || 0) + Math.cos(heading) * strideImpulse * 0.12;
            org.vy = (org.vy || 0) + Math.sin(heading) * strideImpulse * 0.12;

            // Elevated trunk: thoracic ribcage resists gravitational sagging
            const ribSupport = org.thoracicRibcageSupport || 0.76;
            org.vy = (org.vy || 0) - 0.05 * ribSupport * dt * 60.0;
            this.metrics.gravityDefianceEvents++;

            // Steady metabolic vitality from effective terrestrial locomotion
            if (typeof org.energy === "number" && org.energy < 240.0) {
                org.energy += 0.020 * grip * dt;
            }
            this.metrics.cumulativeTetrapodBiomass += 0.08 * dt;
        }

        /**
         * Independent cervical neck rotation to track nearby prey or survey environment.
         * @param {Object} org - Stem Tetrapod organism.
         * @param {number} targetAngle - Target heading or environmental stimulus.
         * @param {number} dt - Time delta in seconds.
         */
        rotateCervicalNeck(org, targetAngle, dt) {
            if (!org || !org.isStemTetrapod) return;

            const maxAngle = org.cervicalMobilityAngle || 0.45;
            const trackingSpeed = (org.cervicalTargetTracking || 0.75) * 4.0;

            const currentAngle = org.cervicalHeadAngle || 0.0;
            const angleDelta = Math.max(-maxAngle, Math.min(maxAngle, targetAngle - currentAngle));

            org.cervicalHeadAngle = currentAngle + angleDelta * Math.min(1.0, trackingSpeed * dt);
            this.metrics.cervicalHeadTurns++;
        }

        /**
         * Update Stem Tetrapod appendicular kinematics, neck tracking, ribcage support, and 113th/114th channels.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isStemTetrapod === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isStemTetrapod) return;

            const currentY = (typeof org.y === "number") ? org.y : height * 0.5;
            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));

            // 1. Substrate / Littoral Shore Proximity Detection
            // Organisms within benthic zone (y > height * 0.62) or near surface littoral banks (y < height * 0.20)
            const onBenthicShore = currentY >= (height * 0.62) || currentY <= (height * 0.18);

            if (onBenthicShore) {
                this.executeTerrestrialStride(org, dt);
            } else {
                org.groundStridingActive = false;
                // Free paddling in water with splayed digits acting as steering oars
                const paddleRate = Math.max(0.6, speed * 1.5) * Math.PI * 2;
                org.terrestrialStepCycle = (org.terrestrialStepCycle + paddleRate * dt) % (Math.PI * 2);
            }

            // 2. Cervical Neck Tracking & Ambush Head Movements
            if (Math.random() < 0.035) {
                const wanderAngle = (Math.random() - 0.5) * (org.cervicalMobilityAngle || 0.45) * 2.0;
                this.rotateCervicalNeck(org, wanderAngle, dt);
            }

            // Occasional snap strike when prey is within visual cone
            if (onBenthicShore && Math.random() < 0.008) {
                this.metrics.terrestrialPreyCaptures++;
                const lunge = (org.digitGripTraction || 0.78) * 0.55;
                const heading = Math.atan2(org.vy || 0, org.vx || 1);
                org.vx = (org.vx || 0) + Math.cos(heading) * lunge;
                org.vy = (org.vy || 0) + Math.sin(heading) * lunge;
            }

            // 3. Aerial Acoustic Detection & Tympanic Stapes Alertness
            // Sensitivity to airborne stimuli and nearby ripples
            const stapesMatch = org.stapesImpedanceMatching || 0.74;
            const tympanic = org.tympanicNotchSensitivity || 0.70;

            if (onBenthicShore && (tympanic * stapesMatch > 0.45)) {
                org.aerialAcousticDetection = true;
                this.metrics.aerialAcousticAlerts++;
            } else {
                org.aerialAcousticDetection = false;
            }

            // 4. 113th Telemetry Channel: Tetrapod Appendicular Index (% TAI)
            // Formulation:
            // - Carpal/Tarsal Joint Flexibility (%35 weight): [0.55 - 0.95]
            // - Polydactyly Digit Grip Traction (%30 weight): [0.55 - 0.98]
            // - Cervical Neck Mobility Angle (%20 weight): [0.25 - 0.65 rad]
            // - Thoracic Ribcage Support (%15 weight): [0.50 - 0.95]
            const carpalRatio = Math.min(1.0, Math.max(0.0, ((org.carpalTarsalFlexibility || 0.75) - 0.55) / 0.40));
            const gripRatio = Math.min(1.0, Math.max(0.0, ((org.digitGripTraction || 0.78) - 0.55) / 0.43));
            const neckRatio = Math.min(1.0, Math.max(0.0, ((org.cervicalMobilityAngle || 0.45) - 0.25) / 0.40));
            const ribRatio = Math.min(1.0, Math.max(0.0, ((org.thoracicRibcageSupport || 0.76) - 0.50) / 0.45));

            const rawTAI = (carpalRatio * 0.35 + gripRatio * 0.30 + neckRatio * 0.20 + ribRatio * 0.15) * 100.0;
            org.tetrapodAppendicularIndex = Math.min(100.0, Math.max(0.0, rawTAI));

            // 5. 114th Telemetry Channel: Amphibious Acoustic & Auditory Index (% AAI)
            // Formulation:
            // - Aerial Airborne Impedance Matching (%35 weight): [0.50 - 0.95]
            // - Stapes Bone Acoustic Conductivity (%30 weight): [0.50 - 0.95]
            // - Tympanic Otic Notch Resonance (%20 weight): [0.45 - 0.92]
            // - Cervical Target Tracking Alertness (%15 weight): [0.60 - 0.95]
            const aerialRatio = Math.min(1.0, Math.max(0.0, ((org.stapesImpedanceMatching || 0.74) - 0.50) / 0.45));
            const stapesRatio = Math.min(1.0, Math.max(0.0, ((org.stapesImpedanceMatching || 0.74) - 0.50) / 0.45));
            const tympRatio = Math.min(1.0, Math.max(0.0, ((org.tympanicNotchSensitivity || 0.70) - 0.45) / 0.47));
            const alertRatio = Math.min(1.0, Math.max(0.0, ((org.cervicalTargetTracking || 0.75) - 0.60) / 0.35));

            const rawAAI = (aerialRatio * 0.35 + stapesRatio * 0.30 + tympRatio * 0.20 + alertRatio * 0.15) * 100.0;
            org.amphibiousAcousticIndex = Math.min(100.0, Math.max(0.0, rawAAI));
        }

        /**
         * Batch update all organisms and compute aggregate Stem Tetrapod metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let tetrapodCount = 0;
            let sumTAI = 0.0;
            let sumAAI = 0.0;
            let sumDigits = 0.0;
            let sumGrip = 0.0;
            let sumNeck = 0.0;
            let sumRibs = 0.0;
            let sumAcoustic = 0.0;
            let sumStapes = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isStemTetrapod) {
                    tetrapodCount++;
                    sumTAI += org.tetrapodAppendicularIndex || 0.0;
                    sumAAI += org.amphibiousAcousticIndex || 0.0;
                    sumDigits += org.digitCount || 7;
                    sumGrip += org.digitGripTraction || 0.78;
                    sumNeck += org.cervicalMobilityAngle || 0.45;
                    sumRibs += org.thoracicRibcageSupport || 0.76;
                    sumAcoustic += org.tympanicNotchSensitivity || 0.70;
                    sumStapes += org.stapesImpedanceMatching || 0.74;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalTetrapodOrganisms = tetrapodCount;
            this.metrics.tetrapodPrevalence = liveCount > 0 ? (tetrapodCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanTetrapodAppendicularIndex = tetrapodCount > 0 ? (sumTAI / tetrapodCount) : 0.0;
            this.metrics.meanAmphibiousAcousticIndex = tetrapodCount > 0 ? (sumAAI / tetrapodCount) : 0.0;
            this.metrics.meanDigitCount = tetrapodCount > 0 ? (sumDigits / tetrapodCount) : 7.0;
            this.metrics.meanDigitGripTraction = tetrapodCount > 0 ? (sumGrip / tetrapodCount) : 0.78;
            this.metrics.meanCervicalMobilityAngle = tetrapodCount > 0 ? (sumNeck / tetrapodCount) : 0.45;
            this.metrics.meanThoracicRibcageSupport = tetrapodCount > 0 ? (sumRibs / tetrapodCount) : 0.76;
            this.metrics.meanAerialAcousticSensitivity = tetrapodCount > 0 ? (sumAcoustic / tetrapodCount) : 0.70;
            this.metrics.meanStapesImpedanceMatch = tetrapodCount > 0 ? (sumStapes / tetrapodCount) : 0.74;
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
         * @returns {Object} Comprehensive Stem Tetrapod metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TetrapodAppendageManager;
    }
    if (typeof global !== "undefined") {
        global.TetrapodAppendageManager = TetrapodAppendageManager;
        global.tetrapodAppendageManager = new TetrapodAppendageManager();
    }
})(typeof window !== "undefined" ? window : global);
