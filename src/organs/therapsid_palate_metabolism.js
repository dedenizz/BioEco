// BioEcosystem - Advanced Therapsida, Secondary Bony Palate, Maxilloturbinates & Pre-Endothermic Metabolism
// Module: src/organs/therapsid_palate_metabolism.js
// Version: 8.70.0 (Hour 590 - System Agent: Secondary Palate, Turbinates, Endothermic Basal Heat, Vibrissae & 119th/120th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TherapsidPalateMetabolismManager
     * High-fidelity biological simulation of Advanced Therapsida & Cynodontia (Biarmosuchus, Gorgonopsia, Thrinaxodon liorhinus & Cynognathus):
     * - Secondary Bony Palate (Premaxilla, Maxilla, Palatine horizontal shelves fusion):
     *   Separates nasopharyngeal respiratory tract from oral digestion chamber, enabling continuous breathing during mastication
     * - Respiratory Maxilloturbinates:
     *   Mucosa-covered scrolls in nasal cavity reclaiming up to 90% of respiratory moisture and thermal energy during sustained ventilation
     * - Pre-Endothermic Basal Metabolism:
     *   Internal visceral thermogenesis elevating core resting temperature to 34.0 - 37.5 C, replacing cumbersome external solar sails
     * - Vibrissae (Whiskers) & Tactile Insulation:
     *   Maxillary neurovascular foramina innervation for subterranean tactile navigation, nocturnal hunting, and heat retention
     * - Parasagittal Limb Posture & Dual Occipital Condyles:
     *   Limb rotation beneath torso breaking Carrier's constraint, enabling simultaneous running and breathing with high aerobic endurance
     * - 119th Telemetry Channel (% SPI - Secondary Palate Index & Continuous Respiration) mathematical core
     * - 120th Telemetry Channel (% EMI - Endothermic Metabolic Index & Thermal Homeostasis) mathematical core
     */
    class TherapsidPalateMetabolismManager {
        constructor() {
            this.basePalatalFusion = 0.82;            // [0.65 - 0.98]
            this.baseContinuousBreathing = 0.85;      // [0.70 - 0.98]
            this.baseTurbinateReclamation = 0.82;     // [0.70 - 0.95]
            this.baseBasalMetabolicHeat = 1.85;       // [1.20 - 2.80x]
            this.baseVibrissaeInsulation = 0.78;      // [0.60 - 0.92]
            this.baseParasagittalEndurance = 2.4;     // [1.8 - 3.4x]
            this.baseNocturnalActivity = 0.80;        // [0.65 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalTherapsidOrganisms: 0,
                therapsidPrevalence: 0.0,
                meanSecondaryPalateIndex: 0.0,        // 119th Channel % SPI
                meanEndothermicMetabolicIndex: 0.0,   // 120th Channel % EMI
                meanPalatalFusionDegree: 0.82,
                meanContinuousBreathingEfficiency: 0.85,
                meanTurbinateReclamation: 0.82,
                meanBasalMetabolicHeat: 1.85,
                meanVibrissaeInsulation: 0.78,
                meanParasagittalEndurance: 2.4,
                meanNocturnalActivity: 0.80,
                meanTherapsidCoreTemperature: 35.5,
                continuousBreathingFeedEvents: 0,
                turbinateMoistureReclaimedUnits: 0.0,
                nocturnalPredationStrikes: 0,
                parasagittalGallopEvents: 0,
                cumulativeTherapsidBiomass: 0.0
            };
        }

        /**
         * Initialize Therapsid secondary palate, turbinates, endothermy, and vibrissae on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Therapsids, cynodonts, gorgonopsians, thrinaxodon, or synapsids with advanced mammalian affinity
            const isCompetent = Boolean(org.hasTherapsidTrait) ||
                (Boolean(org.hasSynapsidTrait || org.isSynapsid) && !org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "therapsid" || org.niche === "cynodont" || org.niche === "thrinaxodon" || org.niche === "gorgonopsia" || org.niche === "biarmosuchus" || org.niche === "apex_predator" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.45 && (org.isSynapsid || org.hasSynapsidTrait)) ||
                  (org.dna && ((org.dna.therapsidAffinity || 0) > 0.15 || (org.dna.palateAffinity || 0) > 0.15 || (org.dna.endothermyAffinity || 0) > 0.20))));

            if (typeof org.hasTherapsidTrait === "undefined") {
                org.hasTherapsidTrait = isCompetent;
            }

            if (!org.hasTherapsidTrait) {
                org.isTherapsid = false;
                org.palatalShelfFusionDegree = 0.0;
                org.continuousBreathingEfficiency = 0.0;
                org.respiratoryMoistureReclamation = 0.0;
                org.turbinateSurfaceArea = 0.0;
                org.basalMetabolicHeatFlux = 1.0;
                org.vibrissaeInsulationDensity = 0.0;
                org.trigeminalTactileAcuity = 0.0;
                org.parasagittalRotationAngle = 0.0;
                org.aerobicEnduranceMultiplier = 1.0;
                org.nocturnalActivityIndex = 0.0;
                org.therapsidCoreTemp = 24.0;
                org.secondaryPalateIndex = 0.0;
                org.endothermicMetabolicIndex = 0.0;
                org.secondaryPalateRegime = "APALATAL_ORAL_SHARING";
                org.endothermicMetabolicRegime = "ECTOTHERMIC_BRADYMETABOLIC";
                return;
            }

            org.isTherapsid = true;

            // 1. Secondary Bony Palate & Respiratory Maxilloturbinates
            if (typeof org.palatalShelfFusionDegree === "undefined") {
                org.palatalShelfFusionDegree = 0.70 + Math.random() * 0.26; // [0.65 - 0.98]
            }
            if (typeof org.continuousBreathingEfficiency === "undefined") {
                org.continuousBreathingEfficiency = 0.74 + Math.random() * 0.24; // [0.70 - 0.98]
            }
            if (typeof org.respiratoryMoistureReclamation === "undefined") {
                org.respiratoryMoistureReclamation = 0.72 + Math.random() * 0.23; // [0.70 - 0.95]
            }
            if (typeof org.turbinateSurfaceArea === "undefined") {
                org.turbinateSurfaceArea = 1.6 + Math.random() * 2.0; // [1.5 - 3.8 cm2 eq]
            }

            // 2. Pre-Endothermic Basal Heat & Thermal Homeostasis
            if (typeof org.basalMetabolicHeatFlux === "undefined") {
                org.basalMetabolicHeatFlux = 1.40 + Math.random() * 1.30; // [1.20 - 2.80x]
            }
            if (typeof org.therapsidCoreTemp === "undefined") {
                org.therapsidCoreTemp = 34.5 + Math.random() * 2.8; // [34.0 - 37.5 C]
            }
            if (typeof org.vibrissaeInsulationDensity === "undefined") {
                org.vibrissaeInsulationDensity = 0.65 + Math.random() * 0.26; // [0.60 - 0.92]
            }
            if (typeof org.trigeminalTactileAcuity === "undefined") {
                org.trigeminalTactileAcuity = 0.70 + Math.random() * 0.25; // [0.65 - 0.95]
            }

            // 3. Parasagittal Gait & Aerobic Stamina
            if (typeof org.parasagittalRotationAngle === "undefined") {
                org.parasagittalRotationAngle = 0.68 + Math.random() * 0.26; // [0.60 - 0.95 rad]
            }
            if (typeof org.aerobicEnduranceMultiplier === "undefined") {
                org.aerobicEnduranceMultiplier = 2.0 + Math.random() * 1.3; // [1.8 - 3.4x]
            }
            if (typeof org.nocturnalActivityIndex === "undefined") {
                org.nocturnalActivityIndex = 0.70 + Math.random() * 0.24; // [0.65 - 0.95]
            }

            // Behavioral and visual timers
            org.isEndothermicWarm = true;
            org.palateBreathingGlowTimer = 0.0;
            org.vibrissaeTouchPulse = 0.0;
            org.masticatingTimer = 0.0;
            org.gallopSprintTimer = 0.0;

            this.computeTelemetryIndices(org);
        }

        /**
         * Compute 119th (% SPI) and 120th (% EMI) Telemetry Channel indices for organism.
         * @param {Object} org - Therapsid organism.
         */
        computeTelemetryIndices(org) {
            if (!org.isTherapsid) {
                org.secondaryPalateIndex = 0.0;
                org.endothermicMetabolicIndex = 0.0;
                org.secondaryPalateRegime = "APALATAL_ORAL_SHARING";
                org.endothermicMetabolicRegime = "ECTOTHERMIC_BRADYMETABOLIC";
                return;
            }

            // 119th Telemetry Channel: % SPI (Secondary Palate Index & Continuous Respiration)
            // Weights: Palatal Shelf Fusion (35%), Airway Separation (30%), Turbinate Moisture Reclamation (20%), Continuous Breathing (15%)
            const fusionRatio = Math.min(1.0, (org.palatalShelfFusionDegree || 0.75) / 0.95);
            const airwayRatio = Math.min(1.0, (org.continuousBreathingEfficiency || 0.78) / 0.95);
            const turbinateRatio = Math.min(1.0, (org.respiratoryMoistureReclamation || 0.75) / 0.92);
            const feedBreathRatio = Math.min(1.0, ((org.palatalShelfFusionDegree || 0.75) * (org.continuousBreathingEfficiency || 0.78)) / 0.88);

            const spiScore = (fusionRatio * 0.35 + airwayRatio * 0.30 + turbinateRatio * 0.20 + feedBreathRatio * 0.15) * 100.0;
            org.secondaryPalateIndex = Math.max(0.0, Math.min(100.0, spiScore));

            if (org.secondaryPalateIndex < 30.0) {
                org.secondaryPalateRegime = "APALATAL_ORAL_SHARING";
            } else if (org.secondaryPalateIndex < 55.0) {
                org.secondaryPalateRegime = "INCIPIENT_PALATAL_SHELVES";
            } else if (org.secondaryPalateIndex < 80.0) {
                org.secondaryPalateRegime = "COMPLETE_BONY_PALATE";
            } else {
                org.secondaryPalateRegime = "MAMMALIAN_RESPIRATORY_TURBINATES";
            }

            // 120th Telemetry Channel: % EMI (Endothermic Metabolic Index & Thermal Homeostasis)
            // Weights: Basal Metabolic Heat (35%), Vibrissae Insulation (30%), Parasagittal Endurance (20%), Nocturnal Activity (15%)
            const heatRatio = Math.min(1.0, ((org.basalMetabolicHeatFlux || 1.6) - 1.0) / 1.6);
            const vibrissaeRatio = Math.min(1.0, (org.vibrissaeInsulationDensity || 0.70) / 0.90);
            const enduranceRatio = Math.min(1.0, (org.aerobicEnduranceMultiplier || 2.2) / 3.2);
            const nocturnalRatio = Math.min(1.0, (org.nocturnalActivityIndex || 0.75) / 0.92);

            const emiScore = (heatRatio * 0.35 + vibrissaeRatio * 0.30 + enduranceRatio * 0.20 + nocturnalRatio * 0.15) * 100.0;
            org.endothermicMetabolicIndex = Math.max(0.0, Math.min(100.0, emiScore));

            if (org.endothermicMetabolicIndex < 30.0) {
                org.endothermicMetabolicRegime = "ECTOTHERMIC_BRADYMETABOLIC";
            } else if (org.endothermicMetabolicIndex < 55.0) {
                org.endothermicMetabolicRegime = "INCIPIENT_TACHYMETABOLIC";
            } else if (org.endothermicMetabolicIndex < 80.0) {
                org.endothermicMetabolicRegime = "FACULTATIVE_MESOTHERMIC";
            } else {
                org.endothermicMetabolicRegime = "TRUE_HOMEOTHERMIC_ENDOTHERM";
            }
        }

        /**
         * Update individual Therapsid organism physiology, thermal stability, palate respiration, and parasagittal gait.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.isTherapsid === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isTherapsid) return;

            // 1. Internal Basal Heat Thermogenesis & Thermal Homeostasis
            const targetCore = 36.2;
            const metabolicHeat = (org.basalMetabolicHeatFlux || 1.85) * 0.12;
            const insulation = (org.vibrissaeInsulationDensity || 0.78);
            
            // Internal heat stabilizes core temperature around 35.5 - 37.0 C even in cool ambient
            org.therapsidCoreTemp = (org.therapsidCoreTemp || 35.5) + (targetCore - (org.therapsidCoreTemp || 35.5)) * 0.08 * dt * metabolicHeat;
            org.coreTemperature = org.therapsidCoreTemp; // sync with global core temperature
            org.isEndothermicWarm = org.therapsidCoreTemp >= 34.0;

            // 2. Continuous Respiration While Feeding (Secondary Bony Palate)
            org.masticatingTimer = (org.masticatingTimer || 0) + dt;
            if (org.masticatingTimer > 1.4) {
                org.masticatingTimer = 0.0;
                // Organism feeds without pausing respiration!
                this.metrics.continuousBreathingFeedEvents++;
                org.palateBreathingGlowTimer = 0.5; // visual air stream cue

                // Maxilloturbinate moisture reclamation
                const reclaimedWater = (org.respiratoryMoistureReclamation || 0.82) * 0.06;
                org.energy = (org.energy || 50.0) + 0.15; // sustained aerobic metabolic gain
                this.metrics.turbinateMoistureReclaimedUnits += reclaimedWater;
            }

            // 3. Parasagittal Gait Gallop & Carrier Constraint Decoupling
            org.gallopSprintTimer = (org.gallopSprintTimer || 0) + dt;
            if (org.gallopSprintTimer > 2.0) {
                org.gallopSprintTimer = 0.0;
                this.metrics.parasagittalGallopEvents++;
                // Aerobic sprint boost without lung compression
                if (org.vx !== undefined && org.vy !== undefined) {
                    org.vx *= 1.025;
                    org.vy *= 1.025;
                }
            }

            // 4. Nocturnal Hunting & Whisker Tactile Sensory
            if (Math.random() < 0.010) {
                this.metrics.nocturnalPredationStrikes++;
                org.vibrissaeTouchPulse = 0.4; // visual whisker sweep cue
            }

            if (org.palateBreathingGlowTimer > 0) {
                org.palateBreathingGlowTimer -= dt;
            }
            if (org.vibrissaeTouchPulse > 0) {
                org.vibrissaeTouchPulse -= dt;
            }

            this.computeTelemetryIndices(org);
        }

        /**
         * Update all organisms and aggregate system metrics.
         * @param {Array<Object>} organisms - Live organisms array.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let therapsidCount = 0;
            let sumSPI = 0.0;
            let sumEMI = 0.0;
            let sumPalateFusion = 0.0;
            let sumContBreath = 0.0;
            let sumTurbinate = 0.0;
            let sumHeat = 0.0;
            let sumVibrissae = 0.0;
            let sumEndurance = 0.0;
            let sumNocturnal = 0.0;
            let sumCoreT = 0.0;
            let totalBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isTherapsid) {
                    therapsidCount++;
                    sumSPI += org.secondaryPalateIndex || 0.0;
                    sumEMI += org.endothermicMetabolicIndex || 0.0;
                    sumPalateFusion += org.palatalShelfFusionDegree || 0.82;
                    sumContBreath += org.continuousBreathingEfficiency || 0.85;
                    sumTurbinate += org.respiratoryMoistureReclamation || 0.82;
                    sumHeat += org.basalMetabolicHeatFlux || 1.85;
                    sumVibrissae += org.vibrissaeInsulationDensity || 0.78;
                    sumEndurance += org.aerobicEnduranceMultiplier || 2.4;
                    sumNocturnal += org.nocturnalActivityIndex || 0.80;
                    sumCoreT += org.therapsidCoreTemp || 35.5;
                    totalBiomass += (org.mass || 1.0) * (org.isEndothermicWarm ? 1.5 : 1.0);
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalTherapsidOrganisms = therapsidCount;
            this.metrics.therapsidPrevalence = liveCount > 0 ? (therapsidCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanSecondaryPalateIndex = therapsidCount > 0 ? (sumSPI / therapsidCount) : 0.0;
            this.metrics.meanEndothermicMetabolicIndex = therapsidCount > 0 ? (sumEMI / therapsidCount) : 0.0;
            this.metrics.meanPalatalFusionDegree = therapsidCount > 0 ? (sumPalateFusion / therapsidCount) : 0.82;
            this.metrics.meanContinuousBreathingEfficiency = therapsidCount > 0 ? (sumContBreath / therapsidCount) : 0.85;
            this.metrics.meanTurbinateReclamation = therapsidCount > 0 ? (sumTurbinate / therapsidCount) : 0.82;
            this.metrics.meanBasalMetabolicHeat = therapsidCount > 0 ? (sumHeat / therapsidCount) : 1.85;
            this.metrics.meanVibrissaeInsulation = therapsidCount > 0 ? (sumVibrissae / therapsidCount) : 0.78;
            this.metrics.meanParasagittalEndurance = therapsidCount > 0 ? (sumEndurance / therapsidCount) : 2.4;
            this.metrics.meanNocturnalActivity = therapsidCount > 0 ? (sumNocturnal / therapsidCount) : 0.80;
            this.metrics.meanTherapsidCoreTemperature = therapsidCount > 0 ? (sumCoreT / therapsidCount) : 35.5;
            this.metrics.cumulativeTherapsidBiomass = totalBiomass;
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
         * @returns {Object} Comprehensive Therapsid metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TherapsidPalateMetabolismManager;
    }
    if (typeof global !== "undefined") {
        global.TherapsidPalateMetabolismManager = TherapsidPalateMetabolismManager;
        global.therapsidPalateMetabolismManager = new TherapsidPalateMetabolismManager();
    }
})(typeof window !== "undefined" ? window : global);
