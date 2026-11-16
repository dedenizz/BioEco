// BioEcosystem - Early Synapsids, Vascularized Thermoregulatory Sail & Heterodont Dentition
// Module: src/organs/synapsid_sail_dentition.js
// Version: 8.64.0 (Hour 584 - System Agent: Synapsid Dorsal Sail, Solar Absorption, Heterodont Dentition & 117th/118th Channel Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SynapsidSailDentitionManager
     * High-fidelity biological simulation of early Synapsida (Archaeothyris, Dimetrodon grandis, Edaphosaurus pogonias & early Therapsida):
     * - Vascularized Thermoregulatory Dorsal Sail:
     *   Elongated neural spines spanned by vascular capillary mesh for rapid solar heat capture and convective heat shedding
     * - Solar Thermal Absorption & Ectothermic Dawn Warming:
     *   Orientation broadside to sun allows fast warmup from 18 C to 35 C, unlocking early-morning apex predation over chilled ectotherms
     * - Convective Wind Cooling:
     *   Edgewise orientation to ambient airflow rapidly dumps dangerous midday excess heat, preventing hyperthermia
     * - Heterodont Dentition (Incisors, Canines, Postcanines/Palatal Plates):
     *   Functional tooth differentiation: premaxillary incisors strip flesh/foliage, elongated canines deliver piercing lethal punctures,
     *   serrated postcanines/palatal plates shear muscle fibers and pulverize tough cycad fibers
     * - Synapsid Temporal Fenestra & Adductor Leverage:
     *   Single lateral skull opening behind orbit anchors bulging adductor muscles for crushing bite torque
     * - 117th Telemetry Channel (% TSI - Thermal Sail Index & Vascular Heat Flux) mathematical core
     * - 118th Telemetry Channel (% HDI - Heterodont Dentition Index & Carnassial/Molar Shear) mathematical core
     */
    class SynapsidSailDentitionManager {
        constructor() {
            this.baseSailSurfaceArea = 2.2;            // [1.2 - 3.5 m2 eq]
            this.baseSpineCount = 22;                  // [18 - 28 spines]
            this.baseSpineHeight = 38.0;               // [25.0 - 55.0 px eq]
            this.baseSpineVascularization = 0.82;      // [0.65 - 0.98]
            this.baseSolarAbsorptionRate = 0.85;       // [0.70 - 0.99]
            this.baseConvectiveDissipation = 0.78;     // [0.60 - 0.95]
            this.baseCaninePiercingForce = 1450.0;     // [800 - 2400 N eq]
            this.baseIncisorPrecision = 0.80;          // [0.65 - 0.95]
            this.baseMolarShearing = 0.78;             // [0.60 - 0.95]
            this.baseTemporalBitePressure = 1650.0;    // [950 - 2800 kPa eq]

            this.metrics = {
                totalLiveCells: 0,
                totalSynapsidOrganisms: 0,
                synapsidPrevalence: 0.0,
                meanThermalSailIndex: 0.0,             // 117th Channel % TSI
                meanHeterodontDentitionIndex: 0.0,     // 118th Channel % HDI
                meanDorsalSailArea: 2.2,
                meanNeuralSpineVascularization: 0.82,
                meanSolarAbsorption: 0.85,
                meanConvectiveDissipation: 0.78,
                meanCoreTemperature: 33.5,
                meanCaninePiercingForce: 1450.0,
                meanIncisorPrecision: 0.80,
                meanMolarShearingEfficiency: 0.78,
                meanTemporalBitePressure: 1650.0,
                morningThermalWarmupEvents: 0,
                convectiveCoolingEvents: 0,
                caninePunctureStrikes: 0,
                boneStrippingEvents: 0,
                molarShearEvents: 0,
                cumulativeSynapsidBiomass: 0.0
            };
        }

        /**
         * Initialize Synapsid dorsal sail, heterodont teeth, and temporal fenestra on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Synapsids, pelycosaurs, dimetrodon, edaphosaurus, early therapsids, or terrestrial amniotes with synapsid affinity
            const isCompetent = Boolean(org.hasSynapsidTrait) ||
                (Boolean(org.hasAmniotaTrait || org.isAmniota) && !org.hasUrochordateTrait && !org.hasStereom &&
                 (org.niche === "synapsid" || org.niche === "pelycosaur" || org.niche === "dimetrodon" || org.niche === "edaphosaurus" || org.niche === "therapsid" || org.niche === "apex_predator" ||
                  (org.dna && typeof org.dna.diet === "number" && org.dna.diet >= 0.45) ||
                  (org.dna && ((org.dna.synapsidAffinity || 0) > 0.15 || (org.dna.sailAffinity || 0) > 0.15 || (org.dna.predatorAffinity || 0) > 0.30))));

            if (typeof org.hasSynapsidTrait === "undefined") {
                org.hasSynapsidTrait = isCompetent;
            }

            if (!org.hasSynapsidTrait) {
                org.isSynapsid = false;
                org.dorsalSailSurfaceArea = 0.0;
                org.neuralSpineCount = 0;
                org.spineHeight = 0.0;
                org.neuralSpineVascularization = 0.0;
                org.solarThermalAbsorptionRate = 0.0;
                org.convectiveHeatDissipation = 0.0;
                org.coreTemperature = 22.0;
                org.caninePiercingForce = 0.0;
                org.incisorStrippingPrecision = 0.0;
                org.molarShearingEfficiency = 0.0;
                org.synapsidBitePressure = 0.0;
                org.thermalSailIndex = 0.0;
                org.heterodontDentitionIndex = 0.0;
                org.thermalSailRegime = "SAILLESS_ECTOTHERM";
                org.heterodontDentitionRegime = "HOMODONT_CONICAL";
                return;
            }

            org.isSynapsid = true;

            // 1. Thermoregulatory Dorsal Sail & Vascular Spine Properties
            if (typeof org.dorsalSailSurfaceArea === "undefined") {
                org.dorsalSailSurfaceArea = 1.4 + Math.random() * 1.8; // [1.2 - 3.5 m2 eq]
            }
            if (typeof org.neuralSpineCount === "undefined") {
                org.neuralSpineCount = Math.floor(18 + Math.random() * 10); // [18 - 28 spines]
            }
            if (typeof org.spineHeight === "undefined") {
                org.spineHeight = 28.0 + Math.random() * 24.0; // [25.0 - 55.0 px]
            }
            if (typeof org.neuralSpineVascularization === "undefined") {
                org.neuralSpineVascularization = 0.68 + Math.random() * 0.28; // [0.65 - 0.98]
            }
            if (typeof org.solarThermalAbsorptionRate === "undefined") {
                org.solarThermalAbsorptionRate = 0.72 + Math.random() * 0.26; // [0.70 - 0.99]
            }
            if (typeof org.convectiveHeatDissipation === "undefined") {
                org.convectiveHeatDissipation = 0.65 + Math.random() * 0.28; // [0.60 - 0.95]
            }
            if (typeof org.coreTemperature === "undefined") {
                org.coreTemperature = 28.0 + Math.random() * 7.0; // [28 - 35 C]
            }
            if (typeof org.optimalCoreTemperature === "undefined") {
                org.optimalCoreTemperature = 34.5;
            }
            if (typeof org.sailOrientation === "undefined") {
                org.sailOrientation = Math.random() * Math.PI;
            }

            // 2. Heterodont Dentition & Jaw Torque
            if (typeof org.caninePiercingForce === "undefined") {
                org.caninePiercingForce = 900.0 + Math.random() * 1400.0; // [800 - 2400 N eq]
            }
            if (typeof org.canineLength === "undefined") {
                org.canineLength = 7.0 + Math.random() * 9.0; // [6.0 - 16.0 px eq]
            }
            if (typeof org.incisorStrippingPrecision === "undefined") {
                org.incisorStrippingPrecision = 0.68 + Math.random() * 0.26; // [0.65 - 0.95]
            }
            if (typeof org.molarShearingEfficiency === "undefined") {
                org.molarShearingEfficiency = 0.65 + Math.random() * 0.28; // [0.60 - 0.95]
            }
            if (typeof org.synapsidBitePressure === "undefined") {
                org.synapsidBitePressure = 1100.0 + Math.random() * 1500.0; // [950 - 2800 kPa eq]
            }
            if (typeof org.temporalFenestraSpan === "undefined") {
                org.temporalFenestraSpan = 0.65 + Math.random() * 0.30; // [0.60 - 0.95]
            }

            // Behavioral states and timers
            org.isWarmedUp = org.coreTemperature >= 31.0;
            org.thermalMetabolicBoost = org.isWarmedUp ? 1.45 : 1.0;
            org.sailVascularGlowTimer = 0.0;
            org.canineStrikeCooldown = 0.0;
            org.sailBaskingTimer = 0.0;
            org.convectiveCoolingTimer = 0.0;

            this.computeTelemetryIndices(org);
        }

        /**
         * Compute 117th (% TSI) and 118th (% HDI) Telemetry Channel indices for organism.
         * @param {Object} org - Synapsid organism.
         */
        computeTelemetryIndices(org) {
            if (!org.isSynapsid) {
                org.thermalSailIndex = 0.0;
                org.heterodontDentitionIndex = 0.0;
                org.thermalSailRegime = "SAILLESS_ECTOTHERM";
                org.heterodontDentitionRegime = "HOMODONT_CONICAL";
                return;
            }

            // 117th Telemetry Channel: % TSI (Thermal Sail Index & Vascular Heat Flux)
            // Weights: Sail Surface Ratio (35%), Spine Vascularization (30%), Solar Absorption (20%), Convective Cooling (15%)
            const sailAreaRatio = Math.min(1.0, (org.dorsalSailSurfaceArea || 1.4) / 3.0);
            const spineVascRatio = Math.min(1.0, (org.neuralSpineVascularization || 0.70) / 0.95);
            const solarAbsRatio = Math.min(1.0, (org.solarThermalAbsorptionRate || 0.75) / 0.95);
            const convDissRatio = Math.min(1.0, (org.convectiveHeatDissipation || 0.68) / 0.92);

            const tsiScore = (sailAreaRatio * 0.35 + spineVascRatio * 0.30 + solarAbsRatio * 0.20 + convDissRatio * 0.15) * 100.0;
            org.thermalSailIndex = Math.max(0.0, Math.min(100.0, tsiScore));

            if (org.thermalSailIndex < 30.0) {
                org.thermalSailRegime = "SAILLESS_ECTOTHERM";
            } else if (org.thermalSailIndex < 55.0) {
                org.thermalSailRegime = "INCIPIENT_SPINES";
            } else if (org.thermalSailIndex < 80.0) {
                org.thermalSailRegime = "VASCULAR_SAIL_EXCHANGER";
            } else {
                org.thermalSailRegime = "APEX_THERMOREGULATOR";
            }

            // 118th Telemetry Channel: % HDI (Heterodont Dentition Index & Carnassial/Molar Shear)
            // Weights: Canine Piercing Force (35%), Incisor Stripping Precision (30%), Molar Shearing (20%), Temporal Bite Pressure (15%)
            const canineRatio = Math.min(1.0, (org.caninePiercingForce || 900.0) / 2200.0);
            const incisorRatio = Math.min(1.0, (org.incisorStrippingPrecision || 0.70) / 0.92);
            const molarRatio = Math.min(1.0, (org.molarShearingEfficiency || 0.68) / 0.92);
            const bitePressRatio = Math.min(1.0, (org.synapsidBitePressure || 1100.0) / 2500.0);

            const hdiScore = (canineRatio * 0.35 + incisorRatio * 0.30 + molarRatio * 0.20 + bitePressRatio * 0.15) * 100.0;
            org.heterodontDentitionIndex = Math.max(0.0, Math.min(100.0, hdiScore));

            if (org.heterodontDentitionIndex < 30.0) {
                org.heterodontDentitionRegime = "HOMODONT_CONICAL";
            } else if (org.heterodontDentitionIndex < 55.0) {
                org.heterodontDentitionRegime = "DIFFERENTIATED_CANINES";
            } else if (org.heterodontDentitionIndex < 80.0) {
                org.heterodontDentitionRegime = "HETERODONT_SHEARER";
            } else {
                org.heterodontDentitionRegime = "MAMMALIAN_PRECURSOR_BITE";
            }
        }

        /**
         * Update individual Synapsid organism physics, thermal kinetics, and bite mechanics.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.isSynapsid === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isSynapsid) return;

            // Ambient temperature cycle simulation (morning cool 18 C -> midday warm 32 C -> evening 24 C)
            const tickFactor = ((org.age || 0) % 600) / 600.0;
            const ambientTemp = 20.0 + Math.sin(tickFactor * Math.PI * 2) * 10.0; // [10 C - 30 C]

            // 1. Thermoregulatory Dorsal Sail Kinetics
            // When cool (< 30 C), orient broadside to absorb morning sun
            if (org.coreTemperature < org.optimalCoreTemperature) {
                // Orient towards sun (broadside angle)
                org.sailOrientation = (org.sailOrientation || 0) * 0.92; // smooth alignment
                const absorptionFlux = (org.solarThermalAbsorptionRate || 0.85) * Math.cos(org.sailOrientation) * (org.neuralSpineVascularization || 0.8);
                const warmupRate = 0.25 * (org.dorsalSailSurfaceArea || 2.0) * Math.max(0.2, absorptionFlux);
                org.coreTemperature = Math.min(org.optimalCoreTemperature + 2.0, (org.coreTemperature || 28.0) + warmupRate * dt);
                
                org.sailBaskingTimer = (org.sailBaskingTimer || 0) + dt;
                if (org.sailBaskingTimer > 1.0) {
                    org.sailBaskingTimer = 0.0;
                    this.metrics.morningThermalWarmupEvents++;
                    org.sailVascularGlowTimer = 0.6; // trigger visual vascular glow cue
                }
            } else if (org.coreTemperature > org.optimalCoreTemperature + 2.5) {
                // Convective Wind Cooling: turn edgewise to dissipate excess midday heat
                org.sailOrientation = (org.sailOrientation || 0) + (Math.PI * 0.5 - (org.sailOrientation || 0)) * 0.1;
                const coolingFlux = (org.convectiveHeatDissipation || 0.78) * 0.45;
                org.coreTemperature = Math.max(org.optimalCoreTemperature, (org.coreTemperature || 35.0) - coolingFlux * dt);

                org.convectiveCoolingTimer = (org.convectiveCoolingTimer || 0) + dt;
                if (org.convectiveCoolingTimer > 1.2) {
                    org.convectiveCoolingTimer = 0.0;
                    this.metrics.convectiveCoolingEvents++;
                }
            }

            // Metabolic Boost from optimal core warmth
            org.isWarmedUp = org.coreTemperature >= 31.0;
            if (org.isWarmedUp) {
                org.thermalMetabolicBoost = 1.35 + (org.coreTemperature - 31.0) * 0.12; // [1.35x - 1.85x speed & strike bonus]
                if (org.vx !== undefined && org.vy !== undefined) {
                    org.vx *= 1.015;
                    org.vy *= 1.015;
                }
            } else {
                org.thermalMetabolicBoost = 0.90; // sluggish early morning penalty without sail warming
            }

            // 2. Heterodont Dentition Action & Predation Strikes
            if (org.canineStrikeCooldown > 0) {
                org.canineStrikeCooldown -= dt;
            } else if (Math.random() < 0.012) {
                // Canine puncture strike execution
                org.canineStrikeCooldown = 2.4;
                org.canineStrikeActive = true;
                this.metrics.caninePunctureStrikes++;

                // Nutrient extraction from shearing
                const extractedBiomass = (org.caninePiercingForce / 2400.0) * (org.incisorStrippingPrecision || 0.8) * 0.45;
                org.energy = (org.energy || 50.0) + extractedBiomass;
                this.metrics.boneStrippingEvents++;
                this.metrics.molarShearEvents++;
            } else {
                org.canineStrikeActive = false;
            }

            if (org.sailVascularGlowTimer > 0) {
                org.sailVascularGlowTimer -= dt;
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
            let synapsidCount = 0;
            let sumTSI = 0.0;
            let sumHDI = 0.0;
            let sumSailArea = 0.0;
            let sumSpineVasc = 0.0;
            let sumSolarAbs = 0.0;
            let sumConvDiss = 0.0;
            let sumCoreTemp = 0.0;
            let sumCanineForce = 0.0;
            let sumIncisorPrec = 0.0;
            let sumMolarShear = 0.0;
            let sumBitePress = 0.0;
            let totalSynapsidBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isSynapsid) {
                    synapsidCount++;
                    sumTSI += org.thermalSailIndex || 0.0;
                    sumHDI += org.heterodontDentitionIndex || 0.0;
                    sumSailArea += org.dorsalSailSurfaceArea || 2.2;
                    sumSpineVasc += org.neuralSpineVascularization || 0.82;
                    sumSolarAbs += org.solarThermalAbsorptionRate || 0.85;
                    sumConvDiss += org.convectiveHeatDissipation || 0.78;
                    sumCoreTemp += org.coreTemperature || 33.5;
                    sumCanineForce += org.caninePiercingForce || 1450.0;
                    sumIncisorPrec += org.incisorStrippingPrecision || 0.80;
                    sumMolarShear += org.molarShearingEfficiency || 0.78;
                    sumBitePress += org.synapsidBitePressure || 1650.0;
                    totalSynapsidBiomass += (org.mass || 1.0) * (org.isWarmedUp ? 1.4 : 1.0);
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalSynapsidOrganisms = synapsidCount;
            this.metrics.synapsidPrevalence = liveCount > 0 ? (synapsidCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanThermalSailIndex = synapsidCount > 0 ? (sumTSI / synapsidCount) : 0.0;
            this.metrics.meanHeterodontDentitionIndex = synapsidCount > 0 ? (sumHDI / synapsidCount) : 0.0;
            this.metrics.meanDorsalSailArea = synapsidCount > 0 ? (sumSailArea / synapsidCount) : 2.2;
            this.metrics.meanNeuralSpineVascularization = synapsidCount > 0 ? (sumSpineVasc / synapsidCount) : 0.82;
            this.metrics.meanSolarAbsorption = synapsidCount > 0 ? (sumSolarAbs / synapsidCount) : 0.85;
            this.metrics.meanConvectiveDissipation = synapsidCount > 0 ? (sumConvDiss / synapsidCount) : 0.78;
            this.metrics.meanCoreTemperature = synapsidCount > 0 ? (sumCoreTemp / synapsidCount) : 33.5;
            this.metrics.meanCaninePiercingForce = synapsidCount > 0 ? (sumCanineForce / synapsidCount) : 1450.0;
            this.metrics.meanIncisorPrecision = synapsidCount > 0 ? (sumIncisorPrec / synapsidCount) : 0.80;
            this.metrics.meanMolarShearingEfficiency = synapsidCount > 0 ? (sumMolarShear / synapsidCount) : 0.78;
            this.metrics.meanTemporalBitePressure = synapsidCount > 0 ? (sumBitePress / synapsidCount) : 1650.0;
            this.metrics.cumulativeSynapsidBiomass = totalSynapsidBiomass;
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
         * @returns {Object} Comprehensive Synapsid metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SynapsidSailDentitionManager;
    }
    if (typeof global !== "undefined") {
        global.SynapsidSailDentitionManager = SynapsidSailDentitionManager;
        global.synapsidSailDentitionManager = new SynapsidSailDentitionManager();
    }
})(typeof window !== "undefined" ? window : global);
