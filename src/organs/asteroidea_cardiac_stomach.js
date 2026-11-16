// BioEcosystem - Asteroidea Morphology, Mutable Collagenous Tissue & Extraoral Cardiac Stomach
// Module: src/organs/asteroidea_cardiac_stomach.js
// Version: 7.57.0 (Hour 477 - System Agent: Locomotion Penalty, Gastric Trauma Vulnerability, Blastema Arrest & 92nd Channel % EGE)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AsteroideaCardiacStomachManager
     * High-fidelity biological simulation of asteroidea (sea star) predatory adaptations:
     * - Pentaradial 5 Ambulacral Arms: Central disc with 5 radiating arms, ambulacral grooves, and terminal optic ocelli
     * - Mutable Collagenous Tissue (MCT): Catch apparatus compliance dynamically switching between stiff and compliant states
     * - Arm Loss Impairment: Locomotion speed (-15% per lost arm) and isometric torque penalty (-20% per lost arm; prying locked if >= 3 arms lost)
     * - Isometric Catch Torque: Fatigue-free sustained prying force prying open bivalve shells without metabolic ATP exhaustion
     * - Extraoral Cardiac Stomach Eversion: Evagination of membranous stomach through the mouth into 0.1 mm prey shell micro-gaps
     * - Gastric Trauma Vulnerability: 2.5x damage vulnerability when stomach is everted, triggering emergency gastric retraction spasm
     * - In Situ Proteolytic Histolysis: External enzymatic digestion liquefying prey tissues into nutrient chyme
     * - Controlled Arm Autotomy: Rapid breakage along basal autotomy plane leaving a wriggling decoy arm to distract predators
     * - Epimorphic Blastema Metabolic Tax: Energetic cost for cell division, proliferation arrest below 35.0 energy, and starvation cell lysis
     * - 91st Channel (% CAC - Catch Apparatus Compliance) & 92nd Channel (% EGE - Extraoral Gastric Eversion Index) Formulation
     */
    class AsteroideaCardiacStomachManager {
        constructor() {
            this.baseCatchTorque = 12.5; // Baseline isometric torque (N*cm)
            this.basePryingForce = 16.0; // Bivalve shell prying force (N)
            this.baseProteolyticRate = 0.28; // External digestive enzyme secretion rate (mg/s)
            this.baseStomachDepth = 0.85; // Maximum cardiac stomach eversion depth (normalized)
            this.baseArmRegenRate = 0.025; // Epimorphic blastema arm growth rate (/s)
            this.stomachRetractSpeed = 0.75; // Baseline gastric retraction speed (/s)
            this.emergencySpasmSpeed = 2.40; // Emergency spasm retraction speed (/s)

            this.metrics = {
                totalLiveCells: 0,
                totalAsteroideaOrganisms: 0,
                asteroideaPrevalence: 0.0,
                meanCatchCompliance: 0.0,
                meanIsometricTorque: 0.0,
                meanPryingForce: 0.0,
                meanStomachEversion: 0.0,
                meanProteolyticRate: 0.0,
                meanArmRegeneration: 0.0,
                meanIntactArmsCount: 5.0,
                meanCatchApparatusComplianceIndex: 0.0,
                meanExtraoralGastricEversionIndex: 0.0,
                activePryingPredators: 0,
                evertedStomachFeeders: 0,
                autotomizedOrganisms: 0,
                blastemaArrests: 0,
                armAutotomyEvents: 0,
                bivalveBreachEvents: 0,
                gastricEversionIncidents: 0,
                gastricTraumaSpasms: 0,
                blastemaRegenerationEvents: 0,
                cumulativeEnzymeSecretion: 0.0,
                cumulativePredatoryNutrients: 0.0,
                cumulativePryingTicks: 0,
                cumulativeTraumaDamage: 0.0
            };
        }

        /**
         * Initialize asteroidea morphology, catch collagen, and cardiac stomach on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Asteroidea, stereom-bearing carnivores, or agile benthic predators
            const isCompetent = org.hasAsteroideaTrait ||
                (org.hasStereom && (org.niche === "carnivore" || org.niche === "predator" || org.diet === "carnivore") && Math.random() < 0.45) ||
                (org.dna && ((org.dna.asteroideaAffinity || 0) > 0.30 || (org.dna.predationAffinity || 0) > 0.38));

            if (typeof org.hasAsteroideaTrait === "undefined") {
                org.hasAsteroideaTrait = isCompetent;
            }

            if (!org.hasAsteroideaTrait) {
                org.isAsteroidea = false;
                org.catchApparatusComplianceIndex = 0.0;
                org.extraoralGastricEversionIndex = 0.0;
                org.catchStiffnessRatio = 0.0;
                org.isometricCatchTorque = 0.0;
                org.effectiveIsometricTorque = 0.0;
                org.cardiacStomachEversionDepth = 0.0;
                org.isStomachEverted = false;
                org.proteolyticEnzymesRate = 0.0;
                org.intactArmsCount = 0;
                org.isArmAutotomized = false;
                org.blastemaArrestState = false;
                return;
            }

            org.isAsteroidea = true;

            // 1. Pentaradial 5 Ambulacral Arms Architecture
            if (typeof org.radialArmsCount === "undefined") {
                org.radialArmsCount = 5;
            }
            if (typeof org.armLengthRatio === "undefined") {
                const lenGene = (org.dna && typeof org.dna.armLength === "number") ?
                    1.2 + org.dna.armLength * 1.6 : 1.9;
                org.armLengthRatio = Math.max(1.4, Math.min(2.8, lenGene));
            }
            if (typeof org.ambulacralGrooveDepth === "undefined") {
                org.ambulacralGrooveDepth = 0.65 + Math.random() * 0.28;
            }

            // 5 Individual Arm Structural States
            if (!org.asteroideaArms || !Array.isArray(org.asteroideaArms)) {
                org.asteroideaArms = [];
                for (let a = 0; a < 5; a++) {
                    org.asteroideaArms.push({
                        id: a,
                        lengthRatio: org.armLengthRatio,
                        intact: true,
                        autotomized: false,
                        blastemaProgress: 1.0, // 1.0 = fully grown
                        suctionGrip: 0.85 + Math.random() * 0.15
                    });
                }
            }
            org.intactArmsCount = org.asteroideaArms.filter(arm => arm.intact).length;

            // 2. Mutable Collagenous Tissue (MCT) & Catch State
            if (typeof org.isCatchStiffened === "undefined") {
                org.isCatchStiffened = false;
            }
            if (typeof org.catchStiffnessRatio === "undefined") {
                org.catchStiffnessRatio = 0.15; // Initial relaxed state
            }
            if (typeof org.catchCalciumFlux === "undefined") {
                org.catchCalciumFlux = 0.0;
            }

            // 3. Isometric Catch Torque & Bivalve Prying Mechanics
            if (typeof org.isometricCatchTorque === "undefined") {
                const torqueGene = (org.dna && typeof org.dna.catchTorque === "number") ?
                    org.dna.catchTorque * 20.0 : this.baseCatchTorque;
                org.isometricCatchTorque = Math.max(5.0, Math.min(25.0, torqueGene));
            }
            org.effectiveIsometricTorque = org.isometricCatchTorque;

            if (typeof org.bivalvePryingForce === "undefined") {
                org.bivalvePryingForce = this.basePryingForce;
            }
            if (typeof org.isPryingTarget === "undefined") {
                org.isPryingTarget = false;
            }
            if (typeof org.targetShellMicroGap === "undefined") {
                org.targetShellMicroGap = 0.0; // mm gap opened in prey
            }
            if (typeof org.pryingDurationTicks === "undefined") {
                org.pryingDurationTicks = 0;
            }

            // 4. Extraoral Cardiac Stomach Eversion & Histolytic Secretion
            if (typeof org.isStomachEverted === "undefined") {
                org.isStomachEverted = false;
            }
            if (typeof org.cardiacStomachEversionDepth === "undefined") {
                org.cardiacStomachEversionDepth = 0.0;
            }
            if (typeof org.proteolyticEnzymesRate === "undefined") {
                const enzGene = (org.dna && typeof org.dna.proteolyticEnzymes === "number") ?
                    0.15 + org.dna.proteolyticEnzymes * 0.45 : this.baseProteolyticRate;
                org.proteolyticEnzymesRate = Math.max(0.15, Math.min(0.60, enzGene));
            }
            if (typeof org.gastricAssimilationRate === "undefined") {
                org.gastricAssimilationRate = 0.45; // energy harvested per tick of contact
            }
            if (typeof org.emergencyGastricSpasm === "undefined") {
                org.emergencyGastricSpasm = false;
            }

            // 5. Controlled Autotomy & Blastema Regeneration
            if (typeof org.isArmAutotomized === "undefined") {
                org.isArmAutotomized = false;
            }
            if (typeof org.wrigglingArmDecoyTimer === "undefined") {
                org.wrigglingArmDecoyTimer = 0.0;
            }
            if (typeof org.armRegenerationProgress === "undefined") {
                org.armRegenerationProgress = 1.0;
            }
            if (typeof org.blastemaArrestState === "undefined") {
                org.blastemaArrestState = false;
            }

            // 6. 91st & 92nd Channel Metrics (% CAC & % EGE)
            if (typeof org.catchApparatusComplianceIndex === "undefined") {
                org.catchApparatusComplianceIndex = 0.15;
            }
            if (typeof org.extraoralGastricEversionIndex === "undefined") {
                org.extraoralGastricEversionIndex = 0.0;
            }
        }

        /**
         * Update an individual asteroidea organism over simulation time step dt.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Effective time step in seconds.
         * @param {Array<Object>} allOrganisms - All live organisms in the dish.
         */
        updateOrganism(org, dt, allOrganisms) {
            if (!org || !org.alive) return;
            if (typeof org.isAsteroidea === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isAsteroidea) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // --- 0. Arm Loss Impairment: Locomotion & Prying Torque Penalty ---
            const intactArms = org.asteroideaArms ? org.asteroideaArms.filter(a => a.intact).length : 5;
            org.intactArmsCount = intactArms;
            const lostArms = Math.max(0, 5 - intactArms);

            // Locomotion penalty: -15% speed per lost arm
            const locomotionMultiplier = Math.max(0.35, 1.0 - lostArms * 0.15);
            if (org.vx !== undefined && org.vy !== undefined) {
                org.vx *= (1.0 - (1.0 - locomotionMultiplier) * 0.05);
                org.vy *= (1.0 - (1.0 - locomotionMultiplier) * 0.05);
            }

            // Prying torque penalty: -20% torque per lost arm; if lostArms >= 3, prying is locked!
            const torqueMultiplier = lostArms >= 3 ? 0.0 : Math.max(0.20, 1.0 - lostArms * 0.20);
            org.effectiveIsometricTorque = (org.isometricCatchTorque || this.baseCatchTorque) * torqueMultiplier;

            if (lostArms >= 3 && org.isPryingTarget) {
                // Cannot pry open bivalves with fewer than 3 arms!
                org.isPryingTarget = false;
                org.targetShellMicroGap = 0.0;
                org.pryingDurationTicks = 0;
            }

            // --- A. Mutable Collagenous Tissue (MCT) Dynamic State Switch ---
            const needsTorque = (org.isPryingTarget || (org.target && org.energy < 85.0)) && lostArms < 3;

            if (needsTorque) {
                org.catchCalciumFlux = Math.min(1.0, (org.catchCalciumFlux || 0.0) + effDt * 1.8);
                org.catchStiffnessRatio = Math.min(0.98, (org.catchStiffnessRatio || 0.15) + effDt * 1.4);
                org.isCatchStiffened = org.catchStiffnessRatio > 0.65;
            } else {
                org.catchCalciumFlux = Math.max(0.0, (org.catchCalciumFlux || 0.0) - effDt * 0.9);
                org.catchStiffnessRatio = Math.max(0.10, (org.catchStiffnessRatio || 0.15) - effDt * 0.7);
                org.isCatchStiffened = org.catchStiffnessRatio > 0.65;
            }

            // --- B. Prey Grappling & Isometric Bivalve Prying ---
            if (!org.isPryingTarget && (org.energy || 50.0) < 88.0 && lostArms < 3) {
                const pryingRadiusSq = 28.0 * 28.0;
                const len = allOrganisms ? allOrganisms.length : 0;
                for (let j = 0; j < len; j++) {
                    const candidate = allOrganisms[j];
                    if (!candidate || !candidate.alive || candidate === org) continue;

                    const dx = candidate.x - org.x;
                    const dy = candidate.y - org.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq <= pryingRadiusSq) {
                        const isPrey = candidate.hasExoskeleton || candidate.hasCalcificationPlates ||
                            candidate.niche === "herbivore" || candidate.niche === "scavenger" ||
                            (candidate.hasStereom && !candidate.isAsteroidea);

                        if (isPrey) {
                            org.isPryingTarget = true;
                            org.pryingPreyId = candidate.id;
                            org.targetShellMicroGap = 0.0;
                            org.pryingDurationTicks = 0;
                            break;
                        }
                    }
                }
            }

            if (org.isPryingTarget && lostArms < 3) {
                this.metrics.cumulativePryingTicks++;
                org.pryingDurationTicks = (org.pryingDurationTicks || 0) + 1;

                // Scaled outward prying progress governed by effective torque
                const pryingProgress = (org.catchStiffnessRatio || 0.5) * torqueMultiplier * effDt * 0.35;
                org.targetShellMicroGap = Math.min(1.2, (org.targetShellMicroGap || 0.0) + pryingProgress);

                if (org.targetShellMicroGap >= 0.10) {
                    if (!org.isStomachEverted) {
                        org.isStomachEverted = true;
                        this.metrics.bivalveBreachEvents++;
                        this.metrics.gastricEversionIncidents++;
                    }
                }

                if (org.pryingDurationTicks > 600 || (org.energy || 50.0) > 96.0) {
                    org.isPryingTarget = false;
                    org.pryingDurationTicks = 0;
                }
            }

            // --- C. Extraoral Cardiac Stomach Eversion & Gastric Trauma Vulnerability ---
            // Check for predator trauma while stomach is everted outside mouth
            if (org.isStomachEverted) {
                // If any predator is within 22 px, trigger gastric trauma spasm!
                let underAttack = false;
                if (allOrganisms) {
                    const attackRadiusSq = 22.0 * 22.0;
                    for (let p = 0; p < allOrganisms.length; p++) {
                        const enemy = allOrganisms[p];
                        if (!enemy || !enemy.alive || enemy === org) continue;
                        if (enemy.niche === "carnivore" || enemy.diet === "carnivore" || enemy.isApex) {
                            const edx = enemy.x - org.x;
                            const edy = enemy.y - org.y;
                            if (edx * edx + edy * edy <= attackRadiusSq) {
                                underAttack = true;
                                break;
                            }
                        }
                    }
                }

                if (underAttack) {
                    // 2.5x Gastric Trauma Damage & Emergency Gastric Retraction Spasm!
                    const traumaDamage = effDt * 18.0 * 2.5;
                    org.energy = Math.max(6.0, (org.energy || 50.0) - traumaDamage);
                    this.metrics.cumulativeTraumaDamage += traumaDamage;
                    this.metrics.gastricTraumaSpasms++;

                    org.emergencyGastricSpasm = true;
                    // Rapid emergency retraction
                    org.cardiacStomachEversionDepth = Math.max(0.0,
                        (org.cardiacStomachEversionDepth || 0.0) - effDt * this.emergencySpasmSpeed);

                    if (org.cardiacStomachEversionDepth <= 0.05) {
                        org.cardiacStomachEversionDepth = 0.0;
                        org.isStomachEverted = false;
                        org.isPryingTarget = false;
                        org.emergencyGastricSpasm = false;
                    }
                } else {
                    org.emergencyGastricSpasm = false;
                    // Normal eversion expansion
                    org.cardiacStomachEversionDepth = Math.min(this.baseStomachDepth,
                        (org.cardiacStomachEversionDepth || 0.0) + effDt * 0.60);

                    const enzymeDose = (org.proteolyticEnzymesRate || 0.28) * effDt;
                    this.metrics.cumulativeEnzymeSecretion += enzymeDose;

                    const harvestedEnergy = (org.gastricAssimilationRate || 0.45) *
                        (org.cardiacStomachEversionDepth / this.baseStomachDepth) * effDt * 8.5;

                    org.energy = Math.min(100.0, (org.energy || 50.0) + harvestedEnergy);
                    this.metrics.cumulativePredatoryNutrients += harvestedEnergy;

                    if ((org.energy || 50.0) >= 95.0) {
                        org.cardiacStomachEversionDepth = Math.max(0.0,
                            org.cardiacStomachEversionDepth - effDt * this.stomachRetractSpeed);
                        if (org.cardiacStomachEversionDepth <= 0.02) {
                            org.cardiacStomachEversionDepth = 0.0;
                            org.isStomachEverted = false;
                            org.isPryingTarget = false;
                        }
                    }
                }
            } else {
                org.cardiacStomachEversionDepth = Math.max(0.0,
                    (org.cardiacStomachEversionDepth || 0.0) - effDt * this.stomachRetractSpeed);
                org.emergencyGastricSpasm = false;
            }

            // --- D. Controlled Arm Autotomy & Epimorphic Regeneration ---
            if ((org.energy || 50.0) < 22.0 && intactArms >= 2 && !org.isArmAutotomized) {
                const armToSever = org.asteroideaArms.find(a => a.intact);
                if (armToSever) {
                    armToSever.intact = false;
                    armToSever.autotomized = true;
                    armToSever.blastemaProgress = 0.0;
                    org.isArmAutotomized = true;
                    org.wrigglingArmDecoyTimer = 5.0;
                    this.metrics.armAutotomyEvents++;
                    org.energy = Math.min(45.0, (org.energy || 20.0) + 12.0);
                }
            }

            if (org.wrigglingArmDecoyTimer > 0.0) {
                org.wrigglingArmDecoyTimer = Math.max(0.0, org.wrigglingArmDecoyTimer - effDt);
                if (org.wrigglingArmDecoyTimer <= 0.0) {
                    org.isArmAutotomized = false;
                }
            }

            // Blastema metabolic tax & proliferation arrest condition
            if (org.asteroideaArms) {
                let totalProgress = 0.0;
                const isEnergyDeficient = (org.energy || 50.0) < 35.0;
                org.blastemaArrestState = isEnergyDeficient;

                if (isEnergyDeficient) {
                    this.metrics.blastemaArrests++;
                }

                for (let k = 0; k < org.asteroideaArms.length; k++) {
                    const arm = org.asteroideaArms[k];
                    if (!arm.intact) {
                        if (isEnergyDeficient) {
                            // Proliferation halted; if starving below 18.0, dedifferentiated blastema cells lyse
                            if ((org.energy || 50.0) < 18.0) {
                                arm.blastemaProgress = Math.max(0.0, (arm.blastemaProgress || 0.0) - effDt * 0.015);
                            }
                        } else {
                            // Active growth: continuous energetic ATP & protein synthesis tax
                            const regenCost = effDt * 0.06;
                            org.energy = Math.max(10.0, (org.energy || 50.0) - regenCost);

                            arm.blastemaProgress = Math.min(1.0, (arm.blastemaProgress || 0.0) + effDt * this.baseArmRegenRate);

                            if (arm.blastemaProgress >= 1.0) {
                                arm.intact = true;
                                arm.autotomized = false;
                                this.metrics.blastemaRegenerationEvents++;
                            }
                        }
                    }
                    totalProgress += (arm.blastemaProgress !== undefined ? arm.blastemaProgress : 1.0);
                }
                org.armRegenerationProgress = totalProgress / 5.0;
                org.intactArmsCount = org.asteroideaArms.filter(a => a.intact).length;
            }

            // --- E. 91st Telemetri Kanalı (% CAC - Catch Apparatus Compliance) ---
            const stiffnessFactor = Math.max(0.0, Math.min(1.0, org.catchStiffnessRatio || 0.15));
            const torqueFactor = Math.max(0.0, Math.min(1.0, (org.effectiveIsometricTorque || 12.5) / 25.0));
            const podialFactor = org.isPryingTarget ? 0.95 : (org.isCatchStiffened ? 0.70 : 0.25);
            const armsFactor = Math.max(0.0, Math.min(1.0, (org.intactArmsCount || 5) / 5.0));

            const rawCAC = (stiffnessFactor * 0.40) +
                           (torqueFactor * 0.30) +
                           (podialFactor * 0.20) +
                           (armsFactor * 0.10);

            org.catchApparatusComplianceIndex = Math.max(0.0, Math.min(1.0, rawCAC));

            // --- F. 92nd Telemetri Kanalı (% EGE - Extraoral Gastric Eversion Index) ---
            // EGE Formülasyonu:
            // 35% Cardiac Stomach Eversion Depth + 30% Proteolytic Enzymes Rate +
            // 20% In Situ Histolysis Assimilation + 15% Epimorphic Blastema Proliferation Index
            const depthFactor = Math.max(0.0, Math.min(1.0, (org.cardiacStomachEversionDepth || 0.0) / this.baseStomachDepth));
            const enzymeFactor = Math.max(0.0, Math.min(1.0, (org.proteolyticEnzymesRate || 0.28) / 0.60));
            const histolysisFactor = org.isStomachEverted ? (org.targetShellMicroGap >= 0.10 ? 1.0 : 0.60) : 0.0;
            const blastemaFactor = org.blastemaArrestState ? 0.0 : Math.max(0.0, Math.min(1.0, org.armRegenerationProgress || 1.0));

            const rawEGE = (depthFactor * 0.35) +
                           (enzymeFactor * 0.30) +
                           (histolysisFactor * 0.20) +
                           (blastemaFactor * 0.15);

            org.extraoralGastricEversionIndex = Math.max(0.0, Math.min(1.0, rawEGE));
        }

        /**
         * Update all organisms and aggregate population-level metrics.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time step in seconds.
         */
        updateAll(organisms, dt) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let asteroideaCount = 0;
            let activePryingCount = 0;
            let evertedStomachCount = 0;
            let autotomizedCount = 0;
            let arrestCount = 0;

            let sumCompliance = 0.0;
            let sumTorque = 0.0;
            let sumPrying = 0.0;
            let sumStomach = 0.0;
            let sumProteolytic = 0.0;
            let sumRegen = 0.0;
            let sumIntactArms = 0;
            let sumCAC = 0.0;
            let sumEGE = 0.0;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const len = organisms.length;

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, organisms);

                if (org.isAsteroidea) {
                    asteroideaCount++;
                    sumCompliance += (org.catchStiffnessRatio || 0.0);
                    sumTorque += (org.effectiveIsometricTorque || 0.0);
                    sumPrying += (org.bivalvePryingForce || 0.0);
                    sumStomach += (org.cardiacStomachEversionDepth || 0.0);
                    sumProteolytic += (org.proteolyticEnzymesRate || 0.0);
                    sumRegen += (org.armRegenerationProgress || 1.0);
                    sumIntactArms += (org.intactArmsCount !== undefined ? org.intactArmsCount : 5);
                    sumCAC += (org.catchApparatusComplianceIndex || 0.0);
                    sumEGE += (org.extraoralGastricEversionIndex || 0.0);

                    if (org.isPryingTarget) activePryingCount++;
                    if (org.isStomachEverted) evertedStomachCount++;
                    if (org.isArmAutotomized || (org.intactArmsCount || 5) < 5) autotomizedCount++;
                    if (org.blastemaArrestState) arrestCount++;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalAsteroideaOrganisms = asteroideaCount;
            this.metrics.asteroideaPrevalence = liveCount > 0 ? (asteroideaCount / liveCount) : 0.0;
            this.metrics.activePryingPredators = activePryingCount;
            this.metrics.evertedStomachFeeders = evertedStomachCount;
            this.metrics.autotomizedOrganisms = autotomizedCount;
            this.metrics.blastemaArrests = arrestCount;

            this.metrics.meanCatchCompliance = asteroideaCount > 0 ? (sumCompliance / asteroideaCount) : 0.0;
            this.metrics.meanIsometricTorque = asteroideaCount > 0 ? (sumTorque / asteroideaCount) : 0.0;
            this.metrics.meanPryingForce = asteroideaCount > 0 ? (sumPrying / asteroideaCount) : 0.0;
            this.metrics.meanStomachEversion = asteroideaCount > 0 ? (sumStomach / asteroideaCount) : 0.0;
            this.metrics.meanProteolyticRate = asteroideaCount > 0 ? (sumProteolytic / asteroideaCount) : 0.0;
            this.metrics.meanArmRegeneration = asteroideaCount > 0 ? (sumRegen / asteroideaCount) : 1.0;
            this.metrics.meanIntactArmsCount = asteroideaCount > 0 ? (sumIntactArms / asteroideaCount) : 5.0;
            this.metrics.meanCatchApparatusComplianceIndex = asteroideaCount > 0 ? (sumCAC / asteroideaCount) : 0.0;
            this.metrics.meanExtraoralGastricEversionIndex = asteroideaCount > 0 ? (sumEGE / asteroideaCount) : 0.0;
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
         * @returns {Object} Comprehensive Asteroidea Cardiac Stomach metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AsteroideaCardiacStomachManager;
    }
    if (typeof global !== "undefined") {
        global.AsteroideaCardiacStomachManager = AsteroideaCardiacStomachManager;
        global.asteroideaCardiacStomachManager = new AsteroideaCardiacStomachManager();
    }
})(typeof window !== "undefined" ? window : global);
