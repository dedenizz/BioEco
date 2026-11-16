// BioEcosystem - Early Chondrichthyes Prismatic Calcified Cartilage, Placoid Denticles & Polyphyodont Teeth
// Module: src/organs/chondrichthyes_cartilage.js
// Version: 8.34.0 (Hour 554 - System Agent: Prismatic Calcified Cartilage, Placoid Denticles, Polyphyodont Tooth Conveyor & 107th/108th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChondrichthyesCartilageManager
     * High-fidelity biological simulation of early Chondrichthyes / Elasmobranchii (cartilaginous fishes / sharks and rays) anatomy:
     * - Prismatic Calcified Cartilage (Tessellated Endoskeleton): Light, flexible cartilage reinforced with mineralized mosaic tiles (tesserae), 40% lighter than bone
     * - Hydrodynamic Agility Multiplier: Dramatically reduced turning radius and rapid acceleration burst maneuvers
     * - Placoid Denticles (Dermal Scales & Riblets): Vitrodentin enameloid tipped scales breaking boundary layer turbulent vortices and cutting skin friction drag by 10-25%
     * - Polyphyodont Tooth Replacement Conveyor Whorl: 3-7 continuous tooth ranks moving forward like a conveyor belt, shedding worn teeth with non-stop razor sharpness
     * - Spiracular Water Intake: Modified first gill opening permitting oxygenated water draw during benthic resting or jaw occlusion
     * - Ram Ventilation Mode: High-speed forward swimming forcing continuous water across gill slits, conserving branchial pumping energy
     * - 107th Telemetry Channel (% PDI - Placoid Denticle & Hydrodynamic Index) mathematical core
     * - 108th Telemetry Channel (% PBR - Polyphyodont Tooth Replacement Rate) mathematical core
     */
    class ChondrichthyesCartilageManager {
        constructor() {
            this.baseCartilageIntegrity = 0.82;     // Tessellated prismatic cartilage integrity [0.50 - 0.99]
            this.baseAgilityMultiplier = 1.55;      // Turning and burst acceleration coefficient [1.25 - 1.85x]
            this.baseDenticleCoverage = 0.80;       // Dermal placoid denticle coverage [0.40 - 0.98]
            this.baseDragReduction = 0.18;          // Boundary layer skin friction reduction [0.10 - 0.25]
            this.baseToothRanks = 5;                // Active conveyor tooth ranks [3 - 7 ranks]
            this.baseReplacementRate = 0.045;       // Conveyor forward advance rate [0.02 - 0.08 /tick]
            this.baseVitrodentinSharpness = 0.88;    // Enameloid tooth tip sharpness [0.70 - 0.99]
            this.baseSpiracleEfficiency = 0.78;     // Spiracular ventilation efficiency [0.50 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalChondrichthyesOrganisms: 0,
                chondrichthyesPrevalence: 0.0,
                meanPlacoidDenticleIndex: 0.0,          // 107th Channel % PDI
                meanPolyphyodontReplacementRate: 0.0,   // 108th Channel % PBR
                meanPrismaticCartilageIntegrity: 0.82,
                meanHydrodynamicAgility: 1.55,
                meanPlacoidDenticleCoverage: 0.80,
                meanSkinFrictionReduction: 0.18,
                meanToothRowRanks: 5.0,
                meanVitrodentinSharpness: 0.88,
                meanSpiracleEfficiency: 0.78,
                conveyorToothReplacements: 0,
                ramVentilationEvents: 0,
                spiracularInflowEvents: 0,
                agilityBurstEvents: 0,
                chondrichthyesPredationStrikes: 0,
                cumulativeCartilaginousBiomass: 0.0
            };
        }

        /**
         * Initialize chondrichthyes cartilage anatomy, placoid denticles, and polyphyodont conveyor whorls on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Pelagic carnivores, pursuit predators, or organisms with elasmobranch/chondrichthyes affinity
            const isCompetent = Boolean(org.hasChondrichthyesTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "carnivore" || org.niche === "apex" || org.niche === "predator" || org.niche === "pelagic_hunter" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet > 0.50) ||
                  (org.dna && (org.dna.speed || 0) > 1.1) ||
                  (org.dna && (org.dna.strikeTactics || 0) > 0.30))) ||
                Boolean(org.dna && ((org.dna.chondrichthyesAffinity || 0) > 0.25 || (org.dna.cartilageAffinity || 0) > 0.25));

            if (typeof org.hasChondrichthyesTrait === "undefined") {
                org.hasChondrichthyesTrait = isCompetent;
            }

            if (!org.hasChondrichthyesTrait) {
                org.isChondrichthyes = false;
                org.prismaticCartilageIntegrity = 0.0;
                org.hydrodynamicAgilityMultiplier = 1.0;
                org.placoidDenticleCoverage = 0.0;
                org.skinFrictionDragReduction = 0.0;
                org.toothRowRanks = 0;
                org.toothReplacementRate = 0.0;
                org.vitrodentinSharpness = 0.0;
                org.spiracleVentilationEfficiency = 0.0;
                org.ramVentilationActive = false;
                org.conveyorRollPhase = 0.0;
                org.burstCooldown = 0.0;
                org.placoidDenticleIndex = 0.0;
                org.polyphyodontReplacementRate = 0.0;
                return;
            }

            org.isChondrichthyes = true;

            // 1. Prismatic Calcified Cartilage (Tesserae Endoskeleton)
            if (typeof org.prismaticCartilageIntegrity === "undefined") {
                org.prismaticCartilageIntegrity = 0.55 + Math.random() * 0.42; // 0.50 - 0.99
            }
            if (typeof org.hydrodynamicAgilityMultiplier === "undefined") {
                org.hydrodynamicAgilityMultiplier = 1.30 + Math.random() * 0.50; // 1.25 - 1.85x
            }

            // 2. Placoid Denticles & Riblet Aerodynamics
            if (typeof org.placoidDenticleCoverage === "undefined") {
                org.placoidDenticleCoverage = 0.45 + Math.random() * 0.50; // 0.40 - 0.98
            }
            if (typeof org.skinFrictionDragReduction === "undefined") {
                org.skinFrictionDragReduction = 0.11 + Math.random() * 0.13; // 0.10 - 0.25
            }

            // 3. Polyphyodont Tooth Conveyor Whorl
            if (typeof org.toothRowRanks === "undefined") {
                org.toothRowRanks = Math.floor(3 + Math.random() * 4.5); // 3 - 7 ranks
            }
            if (typeof org.toothReplacementRate === "undefined") {
                org.toothReplacementRate = 0.025 + Math.random() * 0.050; // 0.02 - 0.08 /tick
            }
            if (typeof org.vitrodentinSharpness === "undefined") {
                org.vitrodentinSharpness = 0.72 + Math.random() * 0.25; // 0.70 - 0.99
            }
            if (typeof org.conveyorRollPhase === "undefined") {
                org.conveyorRollPhase = Math.random() * Math.PI * 2;
            }

            // 4. Spiracle & Ventilation Mode
            if (typeof org.spiracleVentilationEfficiency === "undefined") {
                org.spiracleVentilationEfficiency = 0.55 + Math.random() * 0.38; // 0.50 - 0.95
            }
            if (typeof org.ramVentilationActive === "undefined") {
                org.ramVentilationActive = false;
            }
            if (typeof org.burstCooldown === "undefined") {
                org.burstCooldown = 0.0;
            }

            // 5. Telemetry Channels
            if (typeof org.placoidDenticleIndex === "undefined") {
                org.placoidDenticleIndex = 0.0; // 107th Channel % PDI
            }
            if (typeof org.polyphyodontReplacementRate === "undefined") {
                org.polyphyodontReplacementRate = 0.0; // 108th Channel % PBR
            }
        }

        /**
         * Trigger predatory strike using polyphyodont razor teeth and cartilaginous burst acceleration.
         * @param {Object} org - Attacking Chondrichthyes organism.
         * @param {Object|null} target - Targeted prey entity.
         */
        triggerPredatoryStrike(org, target) {
            if (!org || !org.isChondrichthyes) return;

            this.metrics.chondrichthyesPredationStrikes = (this.metrics.chondrichthyesPredationStrikes || 0) + 1;

            // Agility burst acceleration toward target
            if (org.burstCooldown <= 0.0) {
                org.burstCooldown = 1.8; // Burst recovery timer in seconds
                this.metrics.agilityBurstEvents++;
                const boost = (org.hydrodynamicAgilityMultiplier || 1.4) * 0.35;
                org.vx = (org.vx || 0) * (1.0 + boost);
                org.vy = (org.vy || 0) * (1.0 + boost);
            }

            // Conveyor whorl forward roll: active row strikes, fresh row rotates forward
            org.conveyorRollPhase = (org.conveyorRollPhase + 0.52) % (Math.PI * 2);
            this.metrics.conveyorToothReplacements++;

            // Razor sharpness maintained continuously by replacement whorls
            org.vitrodentinSharpness = Math.min(0.99, org.vitrodentinSharpness + 0.004);

            if (target && target.alive) {
                // High-efficiency shearing penetration
                const strikeYield = (org.vitrodentinSharpness || 0.85) * (org.toothRowRanks / 5.0) * 1.5;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(230.0, org.energy + strikeYield * 4.2);
                }
                this.metrics.cumulativeCartilaginousBiomass += strikeYield;
            } else {
                // Pelagic cruising predatory yield on micro-nekton
                const cruiseYield = (org.vitrodentinSharpness || 0.85) * 0.40;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(230.0, org.energy + cruiseYield * 2.0);
                }
                this.metrics.cumulativeCartilaginousBiomass += cruiseYield;
            }
        }

        /**
         * Update chondrichthyes cartilage kinematics, riblet drag reduction, tooth conveyor, and 107th/108th channels.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;
            if (typeof org.isChondrichthyes === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isChondrichthyes) return;

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));

            // 1. Riblet Boundary Layer Drag Reduction & Swimming Efficiency
            // Reduces skin friction drag, enhancing cruising endurance and speed retention
            const dragBonus = 1.0 + (org.skinFrictionDragReduction || 0.15) * 0.65;
            if (speed > 0.1) {
                org.vx = (org.vx || 0) * (1.0 + (dragBonus - 1.0) * 0.015);
                org.vy = (org.vy || 0) * (1.0 + (dragBonus - 1.0) * 0.015);
            }

            // 2. Dual Ventilation Mode: Ram Ventilation vs Spiracular Pumping
            if (speed >= 1.25) {
                // High-speed Ram Ventilation: passive water inflow saves metabolic energy
                org.ramVentilationActive = true;
                this.metrics.ramVentilationEvents++;
                if (typeof org.energy === "number" && org.energy < 210.0) {
                    org.energy += 0.012 * dt; // Metabolic conservation
                }
            } else {
                // Low-speed / Benthic Spiracular Inflow
                org.ramVentilationActive = false;
                this.metrics.spiracularInflowEvents++;
                if (typeof org.energy === "number" && org.energy < 210.0) {
                    org.energy += (org.spiracleVentilationEfficiency || 0.75) * 0.008 * dt;
                }
            }

            // 3. Polyphyodont Tooth Conveyor Belt Rotation
            // Advance replacement whorl at steady biological rate
            org.conveyorRollPhase = (org.conveyorRollPhase + (org.toothReplacementRate || 0.04) * dt * 4.0) % (Math.PI * 2);

            // Burst cooldown decay
            if (org.burstCooldown > 0.0) {
                org.burstCooldown = Math.max(0.0, org.burstCooldown - dt);
            }

            // 4. Spontaneous Predatory Attack Evaluation (when cruising near prey)
            if (Math.random() < 0.004) {
                this.triggerPredatoryStrike(org, null);
            }

            // 5. 107th Telemetry Channel: Placoid Denticle & Hydrodynamic Index (% PDI)
            // Formulation:
            // - Placoid Denticle Coverage: %35 weight [0.40 - 0.98]
            // - Skin Friction Drag Reduction: %30 weight [0.10 - 0.25]
            // - Prismatic Cartilage Tessellation: %20 weight [0.50 - 0.99]
            // - Hydrodynamic Agility Gain: %15 weight [1.25 - 1.85x]
            const denticleRatio = Math.min(1.0, Math.max(0.0, ((org.placoidDenticleCoverage || 0.75) - 0.40) / 0.58));
            const dragRatio = Math.min(1.0, Math.max(0.0, ((org.skinFrictionDragReduction || 0.16) - 0.10) / 0.15));
            const cartilageRatio = Math.min(1.0, Math.max(0.0, ((org.prismaticCartilageIntegrity || 0.80) - 0.50) / 0.49));
            const agilityRatio = Math.min(1.0, Math.max(0.0, ((org.hydrodynamicAgilityMultiplier || 1.50) - 1.25) / 0.60));

            const rawPDI = (denticleRatio * 0.35 + dragRatio * 0.30 + cartilageRatio * 0.20 + agilityRatio * 0.15) * 100.0;
            org.placoidDenticleIndex = Math.min(100.0, Math.max(0.0, rawPDI));

            // 6. 108th Telemetry Channel: Polyphyodont Tooth Replacement Rate (% PBR)
            // Formulation:
            // - Tooth Row Ranks: %35 weight [3 - 7 rows]
            // - Conveyor Advance Rate: %30 weight [0.02 - 0.08 /tick]
            // - Vitrodentin Sharpness Stability: %20 weight [0.70 - 0.99]
            // - Spiracular Ventilation Efficiency: %15 weight [0.50 - 0.95]
            const ranksRatio = Math.min(1.0, Math.max(0.0, ((org.toothRowRanks || 5) - 3) / 4.0));
            const rateRatio = Math.min(1.0, Math.max(0.0, ((org.toothReplacementRate || 0.04) - 0.02) / 0.06));
            const sharpnessRatio = Math.min(1.0, Math.max(0.0, ((org.vitrodentinSharpness || 0.85) - 0.70) / 0.29));
            const spiracleRatio = Math.min(1.0, Math.max(0.0, ((org.spiracleVentilationEfficiency || 0.75) - 0.50) / 0.45));

            const rawPBR = (ranksRatio * 0.35 + rateRatio * 0.30 + sharpnessRatio * 0.20 + spiracleRatio * 0.15) * 100.0;
            org.polyphyodontReplacementRate = Math.min(100.0, Math.max(0.0, rawPBR));
        }

        /**
         * Batch update all organisms and compute aggregate Chondrichthyes metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let chondCount = 0;
            let sumPDI = 0.0;
            let sumPBR = 0.0;
            let sumCartilage = 0.0;
            let sumAgility = 0.0;
            let sumDenticles = 0.0;
            let sumDrag = 0.0;
            let sumRanks = 0.0;
            let sumSharpness = 0.0;
            let sumSpiracle = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isChondrichthyes) {
                    chondCount++;
                    sumPDI += org.placoidDenticleIndex || 0.0;
                    sumPBR += org.polyphyodontReplacementRate || 0.0;
                    sumCartilage += org.prismaticCartilageIntegrity || 0.0;
                    sumAgility += org.hydrodynamicAgilityMultiplier || 1.0;
                    sumDenticles += org.placoidDenticleCoverage || 0.0;
                    sumDrag += org.skinFrictionDragReduction || 0.0;
                    sumRanks += org.toothRowRanks || 0;
                    sumSharpness += org.vitrodentinSharpness || 0.0;
                    sumSpiracle += org.spiracleVentilationEfficiency || 0.0;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalChondrichthyesOrganisms = chondCount;
            this.metrics.chondrichthyesPrevalence = liveCount > 0 ? (chondCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanPlacoidDenticleIndex = chondCount > 0 ? (sumPDI / chondCount) : 0.0;
            this.metrics.meanPolyphyodontReplacementRate = chondCount > 0 ? (sumPBR / chondCount) : 0.0;
            this.metrics.meanPrismaticCartilageIntegrity = chondCount > 0 ? (sumCartilage / chondCount) : 0.82;
            this.metrics.meanHydrodynamicAgility = chondCount > 0 ? (sumAgility / chondCount) : 1.55;
            this.metrics.meanPlacoidDenticleCoverage = chondCount > 0 ? (sumDenticles / chondCount) : 0.80;
            this.metrics.meanSkinFrictionReduction = chondCount > 0 ? (sumDrag / chondCount) : 0.18;
            this.metrics.meanToothRowRanks = chondCount > 0 ? (sumRanks / chondCount) : 5.0;
            this.metrics.meanVitrodentinSharpness = chondCount > 0 ? (sumSharpness / chondCount) : 0.88;
            this.metrics.meanSpiracleEfficiency = chondCount > 0 ? (sumSpiracle / chondCount) : 0.78;
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
         * @returns {Object} Comprehensive Chondrichthyes metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChondrichthyesCartilageManager;
    }
    if (typeof global !== "undefined") {
        global.ChondrichthyesCartilageManager = ChondrichthyesCartilageManager;
        global.chondrichthyesCartilageManager = new ChondrichthyesCartilageManager();
    }
})(typeof window !== "undefined" ? window : global);
