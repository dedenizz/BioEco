// BioEcosystem - Early Mammaliaformes, Dentary-Squamosal Articulation, Tri-Ossicular Middle Ear & Proto-Lactation
// Module: src/organs/mammaliaform_ear_lactation.js
// Version: 8.76.0 (Hour 596 - System Agent: Dentary-Squamosal Jaw Joint, Malleus-Incus-Stapes Ossicles, Apocrine Milk Secretion & 121st/122nd Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MammaliaformEarLactationManager
     * High-fidelity biological simulation of Earliest Mammaliaformes (Morganucodon watsoni, Hadrocodium wui & Sinoconodon):
     * - Dentary-Squamosal Mandibular Articulation:
     *   Consolidation of lower jaw into a single unitary dentary bone with coronoid process,
     *   replacing fragile multibone articular-quadrate joint with direct squamosal skull articulation,
     *   generating massive masseter masticatory bite torque (2.2 - 4.5x) capable of pulverizing chitinous insect cuticles.
     * - Tri-Ossicular Middle Ear Chain & High-Frequency Acoustic Acuity:
     *   Evolutionary liberation of articular (malleus) and quadrate (incus) bones from masticatory load,
     *   migrating into cranial tympanic cavity to form a 3-ossicle lever chain with stapes;
     *   providing 22x acoustic pressure amplification and cochlear sensitivity across 15 - 60 kHz band,
     *   enabling nocturnal insect acoustic radar and auditory perception decoupled from active chewing.
     * - Proto-Lactation, Apocrine Milk Seepage & Juvenile Nursing:
     *   Modified maternal areolar apocrine-sebaceous glands secreting nutrient-dense, lactose-, lipid-,
     *   and calcium-rich fluid; maternal milk patch nursing elevating hatchling survival rates (2.0 - 4.2x)
     *   and establishing foundational maternal nesting bonds in early mammalian radiation.
     * - 121st Telemetry Channel (% MEI - Mammaliaform Ear Index & High-Frequency Acoustic Acuity) mathematical core.
     * - 122nd Telemetry Channel (% LAI - Lactation, Milk Secretion & Juvenile Nursing Index) mathematical core.
     */
    class MammaliaformEarLactationManager {
        constructor() {
            this.baseDentaryFusion = 0.85;            // [0.70 - 0.98]
            this.baseMasticatoryTorque = 3.2;          // [2.2 - 4.5x]
            this.baseOssicularIntegration = 0.86;     // [0.65 - 0.98]
            this.baseAcousticPressureGain = 22.0;      // [18.0 - 25.0x]
            this.baseHighFrequencyAcuity = 0.88;      // [0.70 - 0.98]
            this.baseLactationSecretionFlux = 0.80;    // [0.60 - 0.95]
            this.baseJuvenileSurvivalMult = 3.1;       // [2.0 - 4.2x]
            this.baseMaternalNestBonding = 0.82;       // [0.60 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalMammaliaformOrganisms: 0,
                mammaliaformPrevalence: 0.0,
                meanMammaliaformEarIndex: 0.0,        // 121st Channel % MEI
                meanLactationIndex: 0.0,              // 122nd Channel % LAI
                meanDentarySquamosalFusion: 0.85,
                meanMasticatoryBiteTorque: 3.2,
                meanOssicularIntegration: 0.86,
                meanAcousticPressureGain: 22.0,
                meanHighFrequencyAcuity: 0.88,
                meanLactationSecretionFlux: 0.80,
                meanJuvenileSurvivalMultiplier: 3.1,
                meanMaternalNestBonding: 0.82,
                chitinBreachCrushEvents: 0,
                ultrasonicEchoRadarDetections: 0,
                milkPatchNursingEvents: 0,
                cumulativeNursedBiomass: 0.0
            };
        }

        /**
         * Initialize Mammaliaform jaw, ear ossicles, and lactation parameters on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            const isStemMammal = (org.isTherapsid || (org.secondaryPalateIndex || 0) > 0.40 || (org.endothermicMetabolicIndex || 0) > 0.35);
            org.isMammaliaform = isStemMammal || (Math.random() < 0.38);

            // Dentary-Squamosal Masticatory Biomechanics
            org.dentarySquamosalFusionDegree = 0.72 + Math.random() * 0.24;   // 0.72 - 0.96
            org.masticatoryBiteTorque = 2.4 + Math.random() * 1.8;             // 2.4 - 4.2x
            org.chitinCrushEfficiency = 0.76 + Math.random() * 0.20;           // 0.76 - 0.96
            org.jawJointStressTolerance = 0.82 + Math.random() * 0.16;         // 0.82 - 0.98
            org.masseterLeverArmRatio = 0.68 + Math.random() * 0.24;           // 0.68 - 0.92

            // Tri-Ossicular Middle Ear Chain & High-Frequency Acoustic Mechanics
            org.ossicularChainIntegration = 0.70 + Math.random() * 0.26;       // 0.70 - 0.96 (Malleus-Incus-Stapes)
            org.acousticPressureGain = 19.0 + Math.random() * 5.5;             // 19.0 - 24.5x
            org.highFrequencyAuditoryAcuity = 0.74 + Math.random() * 0.22;     // 0.74 - 0.96 (15-60 kHz cochlear band)
            org.nocturnalInsectAcousticRadar = 0.68 + Math.random() * 0.26;    // 0.68 - 0.94
            org.masticatoryAuditoryDecoupling = 0.78 + Math.random() * 0.18;   // 0.78 - 0.96 (hearing while chewing)
            org.ultrasonicEchoRadarPulses = 0;
            org.chitinBreachCrushCount = 0;

            // Proto-Lactation, Milk Secretion & Juvenile Nursing
            org.isFemaleParent = Math.random() < 0.52;
            org.protoLactationSecretionFlux = 0.65 + Math.random() * 0.28;     // 0.65 - 0.93
            org.milkPatchNursingFrequency = 0.55 + Math.random() * 0.35;       // 0.55 - 0.90
            org.juvenileSurvivalMultiplier = 2.2 + Math.random() * 1.8;        // 2.2 - 4.0x
            org.maternalNestBonding = 0.65 + Math.random() * 0.28;             // 0.65 - 0.93
            org.nursingCooldownTimer = 0.0;
            org.nursedJuvenilesCount = 0;
            org.milkDispensedUnits = 0.0;

            // Telemetry Indices & Regimes
            org.mammaliaformEarIndex = 0.0;     // 121st Channel % MEI
            org.lactationIndex = 0.0;           // 122nd Channel % LAI
            org.mammaliaformEarState = "DETACHED_MAMMALIAN_MIDDLE_EAR";
            org.lactationState = "AREOLAR_MILK_PATCH_NURSING";
        }

        /**
         * Update Mammaliaform biomechanics, ear ossicle resonance, and lactation dynamics.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.isMammaliaform === "undefined") {
                this.initOrganism(org);
            }

            // Adaptive trait induction from advanced Therapsid precursors
            if (!org.isMammaliaform) {
                const palateHigh = (org.secondaryPalateIndex || 0) > 45.0;
                const endoHigh = (org.endothermicMetabolicIndex || 0) > 40.0;
                if ((palateHigh || endoHigh) && (org.energy || 0) > 35.0) {
                    org.isMammaliaform = true;
                }
            }

            if (!org.isMammaliaform) {
                org.mammaliaformEarIndex = 0.0;
                org.lactationIndex = 0.0;
                return;
            }

            // 1. Dentary-Squamosal Masticatory Stress Relief & Chitin Crushing
            if (org.isFeeding || (org.feedingCooldown || 0) > 0) {
                const effectiveTorque = (org.masticatoryBiteTorque || 3.0) * (org.masseterLeverArmRatio || 0.80);
                org.feedingEfficiency = Math.min(2.5, (org.feedingEfficiency || 1.0) * (1.0 + 0.04 * effectiveTorque * dt));

                if (Math.random() < 0.04) {
                    org.chitinBreachCrushCount = (org.chitinBreachCrushCount || 0) + 1;
                    this.metrics.chitinBreachCrushEvents++;
                    // Kinetic energy bonus from crushing hard chitinous shells
                    org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + 0.85);
                }
            }

            // 2. Tri-Ossicular Middle Ear High-Frequency Acoustic Tracking
            // Decoupled middle ear allows uninterrupted high-frequency detection during night and feeding
            const acousticGain = (org.acousticPressureGain || 22.0) / 22.0;
            const auditoryBand = (org.highFrequencyAuditoryAcuity || 0.85) * acousticGain;

            // Acoustic pulse emission & insect detection in dark micro-habitats
            if (Math.random() < 0.05 * auditoryBand) {
                org.ultrasonicEchoRadarPulses = (org.ultrasonicEchoRadarPulses || 0) + 1;
                this.metrics.ultrasonicEchoRadarDetections++;

                // Sensory target tracking bonus
                if (org.huntingTarget || org.target) {
                    const radarPrecision = (org.nocturnalInsectAcousticRadar || 0.80);
                    org.headingPrecision = Math.min(1.0, (org.headingPrecision || 0.7) + 0.05 * radarPrecision);
                }
            }

            // 3. Proto-Lactation & Areolar Milk Patch Nursing
            if (org.nursingCooldownTimer > 0) {
                org.nursingCooldownTimer = Math.max(0, org.nursingCooldownTimer - dt);
            }

            if (org.isFemaleParent && (org.energy || 50) > 40 && org.nursingCooldownTimer <= 0) {
                // Secretion of nutritious lipid/lactose droplets on areolar patch
                const secretionRate = (org.protoLactationSecretionFlux || 0.80) * (org.maternalNestBonding || 0.80);
                
                if (Math.random() < 0.035 * secretionRate) {
                    this.metrics.milkPatchNursingEvents++;
                    org.nursedJuvenilesCount = (org.nursedJuvenilesCount || 0) + 1;
                    const milkVolume = 0.45 * secretionRate;
                    org.milkDispensedUnits = (org.milkDispensedUnits || 0) + milkVolume;
                    this.metrics.cumulativeNursedBiomass += milkVolume * 1.8;

                    // Maternal metabolic cost compensated by juvenile fitness boost
                    org.energy = Math.max(20, org.energy - 0.25);
                    org.nursingCooldownTimer = 2.5; // Cooldown between nursing bouts
                }
            }

            // 4. Compute 121st Telemetry Channel: % MEI (Mammaliaform Ear Index & High-Frequency Acoustic Acuity)
            // Formulation weights: Dentary-Squamosal Fusion (30%), Ossicular Integration (35%), Cochlear Band (20%), Decoupled Hearing (15%)
            const wDentary = (org.dentarySquamosalFusionDegree || 0.85) * 0.30;
            const wOssicles = (org.ossicularChainIntegration || 0.86) * 0.35;
            const wCochlea = (org.highFrequencyAuditoryAcuity || 0.88) * 0.20;
            const wDecoupled = (org.masticatoryAuditoryDecoupling || 0.85) * 0.15;
            const rawMEI = (wDentary + wOssicles + wCochlea + wDecoupled) * 100.0;
            org.mammaliaformEarIndex = Math.max(0.0, Math.min(100.0, rawMEI));

            // Classify 121st Channel Regime
            if (org.mammaliaformEarIndex < 35.0) {
                org.mammaliaformEarState = "QUADRATE_ARTICULAR_JAW_HEARING";
            } else if (org.mammaliaformEarIndex < 65.0) {
                org.mammaliaformEarState = "TRANSITIONAL_DOUBLE_JOINT";
            } else if (org.mammaliaformEarIndex < 85.0) {
                org.mammaliaformEarState = "DETACHED_MAMMALIAN_MIDDLE_EAR";
            } else {
                org.mammaliaformEarState = "HIGH_FREQUENCY_COCHLEAR_RESONANCE";
            }

            // 5. Compute 122nd Telemetry Channel: % LAI (Lactation, Milk Secretion & Juvenile Nursing Index)
            // Formulation weights: Secretion Flux (35%), Nursing Frequency (30%), Survival Multiplier (20%), Maternal Nesting (15%)
            const normalizedMult = Math.max(0.0, Math.min(1.0, ((org.juvenileSurvivalMultiplier || 3.1) - 1.0) / 3.2));
            const wSecretion = (org.protoLactationSecretionFlux || 0.80) * 0.35;
            const wNursing = (org.milkPatchNursingFrequency || 0.75) * 0.30;
            const wSurvival = normalizedMult * 0.20;
            const wMaternal = (org.maternalNestBonding || 0.82) * 0.15;
            const rawLAI = (wSecretion + wNursing + wSurvival + wMaternal) * 100.0;
            org.lactationIndex = Math.max(0.0, Math.min(100.0, rawLAI));

            // Classify 122nd Channel Regime
            if (org.lactationIndex < 30.0) {
                org.lactationState = "ALACTIC_OVO_INDEPENDENCE";
            } else if (org.lactationIndex < 60.0) {
                org.lactationState = "INCIPIENT_APOCRINE_SEEPAGE";
            } else if (org.lactationIndex < 85.0) {
                org.lactationState = "AREOLAR_MILK_PATCH_NURSING";
            } else {
                org.lactationState = "SPECIALIZED_MAMMARY_PROVISIONING";
            }
        }

        /**
         * Update all organisms and recalculate collective Mammaliaform metrics.
         * @param {Array<Object>} organisms - Array of simulation entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateAll(organisms, dt, width, height) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let mammaliaformCount = 0;
            let sumMEI = 0.0;
            let sumLAI = 0.0;
            let sumDentaryFusion = 0.0;
            let sumBiteTorque = 0.0;
            let sumOssicularInteg = 0.0;
            let sumAcousticGain = 0.0;
            let sumHighFreqAcuity = 0.0;
            let sumLactationFlux = 0.0;
            let sumSurvivalMult = 0.0;
            let sumMaternalBond = 0.0;
            let totalBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isMammaliaform) {
                    mammaliaformCount++;
                    sumMEI += org.mammaliaformEarIndex || 0.0;
                    sumLAI += org.lactationIndex || 0.0;
                    sumDentaryFusion += org.dentarySquamosalFusionDegree || 0.85;
                    sumBiteTorque += org.masticatoryBiteTorque || 3.2;
                    sumOssicularInteg += org.ossicularChainIntegration || 0.86;
                    sumAcousticGain += org.acousticPressureGain || 22.0;
                    sumHighFreqAcuity += org.highFrequencyAuditoryAcuity || 0.88;
                    sumLactationFlux += org.protoLactationSecretionFlux || 0.80;
                    sumSurvivalMult += org.juvenileSurvivalMultiplier || 3.1;
                    sumMaternalBond += org.maternalNestBonding || 0.82;
                    totalBiomass += (org.mass || 1.0) * 1.25;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalMammaliaformOrganisms = mammaliaformCount;
            this.metrics.mammaliaformPrevalence = liveCount > 0 ? (mammaliaformCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanMammaliaformEarIndex = mammaliaformCount > 0 ? (sumMEI / mammaliaformCount) : 0.0;
            this.metrics.meanLactationIndex = mammaliaformCount > 0 ? (sumLAI / mammaliaformCount) : 0.0;
            this.metrics.meanDentarySquamosalFusion = mammaliaformCount > 0 ? (sumDentaryFusion / mammaliaformCount) : 0.85;
            this.metrics.meanMasticatoryBiteTorque = mammaliaformCount > 0 ? (sumBiteTorque / mammaliaformCount) : 3.2;
            this.metrics.meanOssicularIntegration = mammaliaformCount > 0 ? (sumOssicularInteg / mammaliaformCount) : 0.86;
            this.metrics.meanAcousticPressureGain = mammaliaformCount > 0 ? (sumAcousticGain / mammaliaformCount) : 22.0;
            this.metrics.meanHighFrequencyAcuity = mammaliaformCount > 0 ? (sumHighFreqAcuity / mammaliaformCount) : 0.88;
            this.metrics.meanLactationSecretionFlux = mammaliaformCount > 0 ? (sumLactationFlux / mammaliaformCount) : 0.80;
            this.metrics.meanJuvenileSurvivalMultiplier = mammaliaformCount > 0 ? (sumSurvivalMult / mammaliaformCount) : 3.1;
            this.metrics.meanMaternalNestBonding = mammaliaformCount > 0 ? (sumMaternalBond / mammaliaformCount) : 0.82;
            this.metrics.cumulativeNursedBiomass += totalBiomass * 0.001;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Live organisms array.
         * @param {number} tick - Simulation tick counter.
         */
        step(organisms, tick) {
            const w = (typeof canvas !== "undefined" && canvas && canvas.width) ? canvas.width : 660;
            const h = (typeof canvas !== "undefined" && canvas && canvas.height) ? canvas.height : 660;
            this.updateAll(organisms, 0.016, w, h);
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Mammaliaform metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MammaliaformEarLactationManager;
    }
    if (typeof global !== "undefined") {
        global.MammaliaformEarLactationManager = MammaliaformEarLactationManager;
        global.mammaliaformEarLactationManager = new MammaliaformEarLactationManager();
    }
})(typeof window !== "undefined" ? window : global);
