// BioEcosystem - Cephalochordate Axial Notochord, Dorsal Nerve Cord & Segmental Myomeres
// Module: src/organs/cephalochordate_notochord.js
// Version: 7.87.0 (Hour 507 - System Agent: Notochord Fatigue, Lactic Acidosis Cramping, Sand Aspiration & 98th Channel % MFE)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CephalochordateNotochordManager
     * High-fidelity biological simulation of cephalochordate (Amphioxus / Branchiostoma) anatomy and biomechanics:
     * - Complete Axial Notochord: Cylindrical hydrostatic rod running from rostrum to tail tip resisting axial compression
     * - Notochord Elastic Fatigue & Axial Buckling: Over-exertion induces turgor loss, axial stiffness collapse, and sand rest recovery
     * - Dorsal Hollow Nerve Cord: Dorsal central neural axis with anterior cerebral vesicle and frontal ocelli / Hesse organs
     * - V-Shaped Segmental Myomeres: Metameric chevron muscle blocks separated by collagenous myosepta driving undulation
     * - Myomeric Lactic Acidosis & Cramping: Anaerobic burst swimming produces lactic acid accumulation and temporary cramping paralysis
     * - Oral Cirri, Wheel Organ & Endostyle: Buccal ciliary tentacles directing currents into mucous endostyle filter trap
     * - Sand Grain Aspiration & Pharyngeal Cough: Coarse sediment aspiration triggers endostyle stall and reverse flushing spasms
     * - Reverse Sand-Burrowing: High-frequency tail-first penetration into benthic sand substrate for cryptic suspension feeding
     * - 97th Channel (% NTI) & 98th Channel (% MFE - Myomeric Flexion & Propulsion Efficiency) mathematical cores
     */
    class CephalochordateNotochordManager {
        constructor() {
            this.baseNotochordLength = 55.0; // Baseline axial notochord length in pixels
            this.baseNotochordTension = 0.72; // Baseline hydrostatic turgor / tension ratio [0.35 - 0.98]
            this.baseMyomeresCount = 54; // Baseline V-shaped chevron muscle segments [45 - 65]
            this.baseSwimmingVelocity = 2.10; // Baseline lateral undulation swimming velocity (px/tick)
            this.baseEndostyleTrapRate = 0.28; // Endostyle mucus seston filtration intake (mg/s)

            this.metrics = {
                totalLiveCells: 0,
                totalCephalochordateOrganisms: 0,
                cephalochordatePrevalence: 0.0,
                meanNotochordTensionIndex: 0.0,
                meanMyomericFlexionEfficiency: 0.0,
                meanNotochordLength: 55.0,
                meanNotochordTension: 0.0,
                meanNotochordFatigue: 0.0,
                meanLacticAcidosis: 0.0,
                meanMyomeresCount: 54.0,
                meanSwimmingVelocity: 0.0,
                activeSwimmersCount: 0,
                reverseBurrowersCount: 0,
                axialBucklingIncidents: 0,
                myomericCrampIncidents: 0,
                pharyngealCoughEvents: 0,
                endostyleFiltrationEvents: 0,
                sandPenetrationEvents: 0,
                cumulativeFilteredSeston: 0.0,
                cumulativeDistanceSwum: 0.0
            };
        }

        /**
         * Initialize cephalochordate morphology, notochord, and myomeres on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Amphioxus, free-swimming primitive chordates, or sand-dwelling filterers
            const isCompetent = org.hasCephalochordateTrait ||
                (org.hasHemichordateTrait === false && org.hasStereom === false &&
                 (org.niche === "swimmer" || org.diet === "filter" || org.niche === "predator" || org.niche === "scavenger") &&
                 (org.y >= 160.0 && Math.random() < 0.35)) ||
                (org.dna && ((org.dna.notochordAffinity || 0) > 0.30 || (org.dna.swimmingAffinity || 0) > 0.35));

            if (typeof org.hasCephalochordateTrait === "undefined") {
                org.hasCephalochordateTrait = isCompetent;
            }

            if (!org.hasCephalochordateTrait) {
                org.isCephalochordate = false;
                org.notochordTensionIndex = 0.0;
                org.myomericFlexionEfficiency = 0.0;
                org.notochordLength = 0.0;
                org.notochordTension = 0.0;
                org.axialStiffness = 0.0;
                org.myomeresCount = 0;
                org.swimmingVelocity = 0.0;
                org.myomericWavePhase = 0.0;
                org.isReverseBurrowed = false;
                org.reverseBurrowDepth = 0.0;
                org.endostyleTrapRate = 0.0;
                org.hesseOrgansCount = 0;
                org.notochordFatigueAccumulation = 0.0;
                org.axialBuckling = false;
                org.notochordRecoveryTimer = 0.0;
                org.lacticAcidosisLevel = 0.0;
                org.myomericCrampState = false;
                org.sandGrainAspirationRate = 0.0;
                org.endostyleTrapStall = false;
                org.pharyngealCoughTimer = 0.0;
                return;
            }

            org.isCephalochordate = true;

            // 1. Axial Notochord [45 - 85 px]
            if (typeof org.notochordLength === "undefined") {
                const lenGene = (org.dna && typeof org.dna.notochordSize === "number") ?
                    45.0 + org.dna.notochordSize * 40.0 : this.baseNotochordLength;
                org.notochordLength = Math.max(45.0, Math.min(85.0, lenGene));
            }
            if (typeof org.notochordTension === "undefined") {
                const tenGene = (org.dna && typeof org.dna.notochordTension === "number") ?
                    0.40 + org.dna.notochordTension * 0.55 : this.baseNotochordTension;
                org.notochordTension = Math.max(0.35, Math.min(0.98, tenGene));
            }
            if (typeof org.axialStiffness === "undefined") {
                org.axialStiffness = 0.75;
            }

            // 2. V-Shaped Segmental Myomeres [45 - 65 segments]
            if (typeof org.myomeresCount === "undefined") {
                const myoGene = (org.dna && typeof org.dna.myomeres === "number") ?
                    45 + Math.floor(org.dna.myomeres * 20) : this.baseMyomeresCount;
                org.myomeresCount = Math.max(45, Math.min(65, myoGene));
            }
            if (typeof org.swimmingVelocity === "undefined") {
                org.swimmingVelocity = this.baseSwimmingVelocity;
            }
            if (typeof org.myomericWavePhase === "undefined") {
                org.myomericWavePhase = Math.random() * Math.PI * 2;
            }

            // 3. Dorsal Hollow Nerve Cord & Hesse Organ Photoreceptors
            if (typeof org.hesseOrgansCount === "undefined") {
                org.hesseOrgansCount = 15 + Math.floor(Math.random() * 20);
            }

            // 4. Oral Cirri & Endostyle Mucus Trap
            if (typeof org.endostyleTrapRate === "undefined") {
                org.endostyleTrapRate = this.baseEndostyleTrapRate;
            }

            // 5. Reverse Sand-Burrowing (Tail-First Inhabitation)
            if (typeof org.isReverseBurrowed === "undefined") {
                org.isReverseBurrowed = org.y >= 370.0 && Math.random() < 0.60;
            }
            if (typeof org.reverseBurrowDepth === "undefined") {
                org.reverseBurrowDepth = org.isReverseBurrowed ? (18.0 + Math.random() * 32.0) : 0.0;
            }

            // 6. Fatigue, Lactic Acidosis & Sand Aspiration (Critic Audit Hour 506)
            if (typeof org.notochordFatigueAccumulation === "undefined") {
                org.notochordFatigueAccumulation = 0.0;
            }
            if (typeof org.axialBuckling === "undefined") {
                org.axialBuckling = false;
            }
            if (typeof org.notochordRecoveryTimer === "undefined") {
                org.notochordRecoveryTimer = 0.0;
            }
            if (typeof org.lacticAcidosisLevel === "undefined") {
                org.lacticAcidosisLevel = 0.0;
            }
            if (typeof org.myomericCrampState === "undefined") {
                org.myomericCrampState = false;
            }
            if (typeof org.sandGrainAspirationRate === "undefined") {
                org.sandGrainAspirationRate = 0.0;
            }
            if (typeof org.endostyleTrapStall === "undefined") {
                org.endostyleTrapStall = false;
            }
            if (typeof org.pharyngealCoughTimer === "undefined") {
                org.pharyngealCoughTimer = 0.0;
            }

            // 7. 97th & 98th Telemetry Channels (% NTI & % MFE)
            if (typeof org.notochordTensionIndex === "undefined") {
                org.notochordTensionIndex = 0.55;
            }
            if (typeof org.myomericFlexionEfficiency === "undefined") {
                org.myomericFlexionEfficiency = 0.45;
            }
        }

        /**
         * Update an individual cephalochordate organism over simulation time step dt.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Effective time step in seconds.
         * @param {Array<Object>} allOrganisms - All live organisms in the dish.
         */
        updateOrganism(org, dt, allOrganisms) {
            if (!org || !org.alive) return;
            if (typeof org.isCephalochordate === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isCephalochordate) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // --- 1. Axial Notochord Hydrostatic Turgor & Elastic Fatigue ---
            const energyFactor = Math.min(1.0, Math.max(0.25, (org.energy || 50.0) / 75.0));
            org.notochordTension = Math.max(0.20, Math.min(0.98, (org.notochordTension || 0.72) * 0.985 + energyFactor * 0.015));

            // Elastic fatigue accumulation during active swimming
            if (!org.isReverseBurrowed && (org.swimmingVelocity || 0.0) > 1.40) {
                org.notochordFatigueAccumulation = Math.min(1.0, (org.notochordFatigueAccumulation || 0.0) + effDt * 0.12);
            } else {
                org.notochordFatigueAccumulation = Math.max(0.0, (org.notochordFatigueAccumulation || 0.0) - effDt * 0.35);
            }

            // Axial buckling triggered under severe fatigue
            if (org.notochordFatigueAccumulation >= 0.70 && org.notochordRecoveryTimer <= 0.0) {
                org.axialBuckling = true;
                org.notochordRecoveryTimer = 3.0; // 3.0s forced recovery
                this.metrics.axialBucklingIncidents++;
            }

            if (org.notochordRecoveryTimer > 0.0) {
                org.notochordRecoveryTimer -= effDt;
                if (org.notochordRecoveryTimer <= 0.0 && org.notochordFatigueAccumulation <= 0.25) {
                    org.axialBuckling = false;
                }
            }

            // Stiffness reduction from tension and buckling
            org.axialStiffness = (0.50 + 0.45 * org.notochordTension) * (org.axialBuckling ? 0.50 : 1.0);

            // --- 2. V-Shaped Myomeric Undulation, Lactic Acidosis & Swimming Dynamics ---
            org.myomericWavePhase = ((org.myomericWavePhase || 0.0) + effDt * 8.5) % (Math.PI * 2);

            // Free swimming vs benthic sand burrowing
            if (org.y >= 360.0 && !org.isFleeing) {
                // Reverse tail-first burrowing into sandy substrate
                org.isReverseBurrowed = true;
                const burrowDrive = org.notochordTension * (org.axialBuckling ? 0.45 : 1.35);
                org.reverseBurrowDepth = Math.min(55.0, (org.reverseBurrowDepth || 0.0) + effDt * burrowDrive * 2.8);
                this.metrics.sandPenetrationEvents++;
                this.metrics.reverseBurrowersCount++;

                // Lactic acid clears while stationary in sediment
                org.lacticAcidosisLevel = Math.max(0.0, (org.lacticAcidosisLevel || 0.0) - effDt * 0.28);
                if (org.lacticAcidosisLevel <= 0.20) {
                    org.myomericCrampState = false;
                }

                // Sand grain aspiration during burrowing
                if (org.pharyngealCoughTimer <= 0.0) {
                    org.sandGrainAspirationRate = Math.min(1.0, (org.sandGrainAspirationRate || 0.0) + effDt * 0.09);
                }

                if (org.sandGrainAspirationRate >= 0.65 && org.pharyngealCoughTimer <= 0.0) {
                    org.endostyleTrapStall = true;
                    org.pharyngealCoughTimer = 2.0; // 2.0s cough spasm
                    this.metrics.pharyngealCoughEvents++;
                }

                if (org.pharyngealCoughTimer > 0.0) {
                    org.pharyngealCoughTimer -= effDt;
                    org.sandGrainAspirationRate = Math.max(0.0, (org.sandGrainAspirationRate || 0.0) - effDt * 0.45);
                    if (org.sandGrainAspirationRate <= 0.15) {
                        org.endostyleTrapStall = false;
                    }
                }

                // Slower stationary undulating current
                org.swimmingVelocity = 0.40 + 0.30 * Math.sin(org.myomericWavePhase);
            } else {
                org.isReverseBurrowed = false;
                org.reverseBurrowDepth = Math.max(0.0, (org.reverseBurrowDepth || 0.0) - effDt * 4.5);
                org.sandGrainAspirationRate = Math.max(0.0, (org.sandGrainAspirationRate || 0.0) - effDt * 0.25);
                if (org.pharyngealCoughTimer > 0.0) {
                    org.pharyngealCoughTimer -= effDt;
                }
                if (org.sandGrainAspirationRate <= 0.15) {
                    org.endostyleTrapStall = false;
                }

                // Lactic acidosis accumulation during active open-water burst swimming
                org.lacticAcidosisLevel = Math.min(1.0, (org.lacticAcidosisLevel || 0.0) + effDt * 0.14);
                if (org.lacticAcidosisLevel >= 0.80) {
                    org.myomericCrampState = true;
                    this.metrics.myomericCrampIncidents++;
                }
                if (org.lacticAcidosisLevel <= 0.20) {
                    org.myomericCrampState = false;
                }

                // High-speed anguilliform / carangiform forward thrust
                const thrustMultiplier = (org.myomeresCount || 54) / 54.0;
                let effectiveVelocity = this.baseSwimmingVelocity * org.axialStiffness * thrustMultiplier;

                // Penalties for fatigue buckling and cramping
                if (org.axialBuckling) {
                    effectiveVelocity *= 0.40;
                }
                if (org.myomericCrampState) {
                    effectiveVelocity *= 0.15;
                }

                org.swimmingVelocity = effectiveVelocity;
                this.metrics.activeSwimmersCount++;
                this.metrics.cumulativeDistanceSwum += effDt * org.swimmingVelocity * 60.0;

                // Propel organism forward smoothly
                const heading = Math.atan2(org.vy || 0, org.vx || 1);
                org.vx = Math.cos(heading) * org.swimmingVelocity;
                org.vy = Math.sin(heading) * org.swimmingVelocity;
            }

            // --- 3. Endostyle Mucus Trap & Pharyngeal Filtration ---
            if (!org.endostyleTrapStall) {
                const ciliaryCurrent = 0.60 + 0.40 * Math.sin(org.myomericWavePhase * 0.5);
                const filtrationIntake = (org.endostyleTrapRate || this.baseEndostyleTrapRate) * ciliaryCurrent;
                this.metrics.cumulativeFilteredSeston += effDt * filtrationIntake;
                this.metrics.endostyleFiltrationEvents++;

                // Nutrient assimilation from seston trap
                if (org.energy < 92.0) {
                    org.energy += effDt * 0.42 * filtrationIntake;
                }
            }

            // --- 4. 97th Channel (% NTI - Notochord Turgor & Tension Index) Formulation ---
            const tensionComp = org.notochordTension * 0.35;
            const stiffnessComp = org.axialStiffness * 0.30;
            const myomereComp = Math.min(1.0, (org.myomeresCount || 54) / 65.0) * 0.20;
            const burrowComp = Math.min(1.0, (org.reverseBurrowDepth || 0.0) / 45.0) * 0.15;

            const computedNTI = tensionComp + stiffnessComp + myomereComp + burrowComp;
            org.notochordTensionIndex = Math.max(0.0, Math.min(1.0, computedNTI));

            // --- 5. 98th Channel (% MFE - Myomeric Flexion & Propulsion Efficiency) Formulation ---
            // Sentez: Miyomerik dalgalanma hizi (%35) + itici hiz orani (%30) + laktik asit direnci (%20) + kum penetrasyon gucu (%15)
            const myoWaveComp = Math.min(1.0, (org.swimmingVelocity || 0.0) / 3.0) * 0.35;
            const thrustRatioComp = (org.axialBuckling ? 0.30 : 1.0) * (org.myomericCrampState ? 0.20 : 1.0) * 0.30;
            const lacticComp = Math.max(0.0, 1.0 - (org.lacticAcidosisLevel || 0.0)) * 0.20;
            const sandPowerComp = Math.min(1.0, (org.reverseBurrowDepth || 0.0) / 45.0) * 0.15;

            const computedMFE = myoWaveComp + thrustRatioComp + lacticComp + sandPowerComp;
            org.myomericFlexionEfficiency = Math.max(0.0, Math.min(1.0, computedMFE));
        }

        /**
         * Update all cephalochordate organisms and aggregate system metrics.
         * @param {Array<Object>} organisms - All live organisms in simulation.
         * @param {number} dt - Effective time step in seconds.
         */
        updateAll(organisms, dt) {
            if (!organisms || !Array.isArray(organisms)) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            let liveCount = 0;
            let cephCount = 0;
            let swimmerCount = 0;
            let burrowerCount = 0;

            let sumNTI = 0.0;
            let sumMFE = 0.0;
            let sumLength = 0.0;
            let sumTension = 0.0;
            let sumFatigue = 0.0;
            let sumLactic = 0.0;
            let sumMyomeres = 0;
            let sumVelocity = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                if (typeof org.isCephalochordate === "undefined") {
                    this.initOrganism(org);
                }

                if (org.isCephalochordate) {
                    cephCount++;
                    this.updateOrganism(org, effDt, organisms);

                    if (org.isReverseBurrowed) burrowerCount++;
                    else swimmerCount++;

                    sumNTI += (org.notochordTensionIndex || 0.55);
                    sumMFE += (org.myomericFlexionEfficiency || 0.45);
                    sumLength += (org.notochordLength || 55.0);
                    sumTension += (org.notochordTension || 0.72);
                    sumFatigue += (org.notochordFatigueAccumulation || 0.0);
                    sumLactic += (org.lacticAcidosisLevel || 0.0);
                    sumMyomeres += (org.myomeresCount || 54);
                    sumVelocity += (org.swimmingVelocity || 2.10);
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalCephalochordateOrganisms = cephCount;
            this.metrics.cephalochordatePrevalence = liveCount > 0 ? (cephCount / liveCount) : 0.0;
            this.metrics.activeSwimmersCount = swimmerCount;
            this.metrics.reverseBurrowersCount = burrowerCount;

            this.metrics.meanNotochordTensionIndex = cephCount > 0 ? (sumNTI / cephCount) : 0.0;
            this.metrics.meanMyomericFlexionEfficiency = cephCount > 0 ? (sumMFE / cephCount) : 0.0;
            this.metrics.meanNotochordLength = cephCount > 0 ? (sumLength / cephCount) : 55.0;
            this.metrics.meanNotochordTension = cephCount > 0 ? (sumTension / cephCount) : 0.0;
            this.metrics.meanNotochordFatigue = cephCount > 0 ? (sumFatigue / cephCount) : 0.0;
            this.metrics.meanLacticAcidosis = cephCount > 0 ? (sumLactic / cephCount) : 0.0;
            this.metrics.meanMyomeresCount = cephCount > 0 ? (sumMyomeres / cephCount) : 54.0;
            this.metrics.meanSwimmingVelocity = cephCount > 0 ? (sumVelocity / cephCount) : 0.0;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            this.updateAll(organisms, 0.016);
        }

        /**
         * Return a defensive copy of current metrics.
         * @returns {Object} Comprehensive Cephalochordate Notochord metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CephalochordateNotochordManager;
    }
    if (typeof global !== "undefined") {
        global.CephalochordateNotochordManager = CephalochordateNotochordManager;
        global.cephalochordateNotochordManager = new CephalochordateNotochordManager();
    }
})(typeof window !== "undefined" ? window : global);
