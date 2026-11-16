// BioEcosystem - Ophiuroid Morphology, Vertebral Ossicles & Serpentiform Slithering
// Module: src/organs/ophiuroid_vertebrae.js
// Version: 7.67.0 (Hour 487 - System Agent: Yaw Wobble Asymmetry, Disc Trauma 3x Vulnerability, Calcification Stall & 94th Channel % BFR)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OphiuroidVertebraeManager
     * High-fidelity biological simulation of ophiuroid (brittle star) biomechanics:
     * - Distinct Central Disc: Sharp demarcation from arms, viscera confined strictly within central disc
     * - Vertebral Arm Ossicles: Internal linear skeletal column of calcite vertebrae with ball-and-socket joints
     * - Lateral Sinusoidal Locomotion: Fast horizontal rowing/slithering driven by antagonist intervertebral muscles
     * - Multi-Segment Loss Asymmetry & Yaw Wobble: Unequal arm breakage causes directional wobble and circling (>50% loss)
     * - Central Disc Fragility & 3.0x Trauma: Disc attacks inflict 3x damage, bursal slime discharge, and turgor collapse
     * - Fragile Multi-Point Micro-Autotomy: Rapid breakage at any intervertebral joint leaving autonomous wriggling segments
     * - Calcification Depletion Stall: Segmental regeneration stalls when calcite minerals or ATP drop below threshold
     * - Lateral Arm Spines & Suspension Feeding: Segmental spine combs and mucus-covered tube feet catching organic particles
     * - Crevice Cryptic Inhabitation: Photonegative benthic refuge-seeking in rock crevices and micro-fractures
     * - 93rd Channel (% SVI) & 94th Channel (% BFR - Brittle Fracture & Autotomy Ratio) Formulation
     */
    class OphiuroidVertebraeManager {
        constructor() {
            this.baseSlitherSpeed = 1.45; // Baseline lateral slithering velocity (px/tick)
            this.baseVertebraeCount = 24; // Baseline ossicles per arm [18 - 36]
            this.baseSuspensionRate = 0.22; // Organic particle capture rate (mg/s)
            this.baseSegmentRegenRate = 0.040; // Segmental blastema regeneration rate (/s)
            this.maxFlexionAngle = 0.85; // Maximum intervertebral lateral flexion (radians)

            this.metrics = {
                totalLiveCells: 0,
                totalOphiuroidOrganisms: 0,
                ophiuroidPrevalence: 0.0,
                meanSlitherSpeed: 0.0,
                meanVertebralFlexion: 0.0,
                meanSuspensionIntake: 0.0,
                meanIntactSegments: 24.0,
                meanSerpentiformVelocityIndex: 0.0,
                meanBrittleFractureRatio: 0.0,
                activeSlitheringOrganisms: 0,
                creviceShelteredOrganisms: 0,
                autotomizedOrganisms: 0,
                discTraumaIncidents: 0,
                calcificationStalls: 0,
                chaoticCirclingInstances: 0,
                segmentAutotomyEvents: 0,
                suspensionFeedingEvents: 0,
                segmentRegenEvents: 0,
                cumulativeSuspensionHarvest: 0.0,
                cumulativeSlitherDistance: 0.0,
                cumulativeWriggleLureTicks: 0,
                cumulativeDiscTraumaDamage: 0.0
            };
        }

        /**
         * Initialize ophiuroid morphology, vertebral ossicles, and lateral spines on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Ophiuroids, agile benthic scavengers, or crevice-dwelling echinoderms
            const isCompetent = org.hasOphiuroidTrait ||
                (org.hasStereom && (org.niche === "scavenger" || org.diet === "detritivore" || org.niche === "herbivore") && (org.y >= 260.0 && Math.random() < 0.40)) ||
                (org.dna && ((org.dna.ophiuroidAffinity || 0) > 0.30 || (org.dna.agilityAffinity || 0) > 0.35));

            if (typeof org.hasOphiuroidTrait === "undefined") {
                org.hasOphiuroidTrait = isCompetent;
            }

            if (!org.hasOphiuroidTrait) {
                org.isOphiuroid = false;
                org.serpentiformVelocityIndex = 0.0;
                org.brittleFractureRatio = 0.0;
                org.serpentiformSpeed = 0.0;
                org.effectiveSlitherSpeed = 0.0;
                org.lateralWavePhase = 0.0;
                org.vertebraePerArm = 0;
                org.isSegmentAutotomized = false;
                org.creviceSheltered = false;
                org.yawWobbleAngle = 0.0;
                org.chaoticCircling = false;
                org.bursalSlimeTimer = 0.0;
                org.calcificationDepletionStall = false;
                return;
            }

            org.isOphiuroid = true;

            // 1. Sharp Central Disc Demarcation [0.45 - 0.70 ratio]
            if (typeof org.discDiameterRatio === "undefined") {
                const discGene = (org.dna && typeof org.dna.discSize === "number") ?
                    0.40 + org.dna.discSize * 0.30 : 0.55;
                org.discDiameterRatio = Math.max(0.45, Math.min(0.70, discGene));
            }

            // 2. 5 Serpentiform Vertebral Arms with Multi-Segment Columns
            if (typeof org.vertebraePerArm === "undefined") {
                const vertGene = (org.dna && typeof org.dna.armSegments === "number") ?
                    18 + Math.floor(org.dna.armSegments * 18) : this.baseVertebraeCount;
                org.vertebraePerArm = Math.max(18, Math.min(36, vertGene));
            }

            // 5 Individual Vertebral Arm Chains
            if (!org.ophiuroidArms || !Array.isArray(org.ophiuroidArms)) {
                org.ophiuroidArms = [];
                for (let a = 0; a < 5; a++) {
                    org.ophiuroidArms.push({
                        id: a,
                        totalSegments: org.vertebraePerArm,
                        intactSegments: org.vertebraePerArm,
                        isAutotomized: false,
                        flexionAngle: 0.0,
                        lateralWaveOffset: (a * Math.PI * 2) / 5,
                        lateralSpinesCount: 5 + Math.floor(Math.random() * 3),
                        blastemaRegenProgress: 1.0
                    });
                }
            }
            org.intactArmSegmentsCount = org.ophiuroidArms.reduce((sum, arm) => sum + arm.intactSegments, 0);

            // 3. Lateral Sinusoidal Locomotion Parameters
            if (typeof org.serpentiformSpeed === "undefined") {
                const speedGene = (org.dna && typeof org.dna.speed === "number") ?
                    0.90 + org.dna.speed * 1.50 : this.baseSlitherSpeed;
                org.serpentiformSpeed = Math.max(0.85, Math.min(2.40, speedGene));
            }
            org.effectiveSlitherSpeed = org.serpentiformSpeed;

            if (typeof org.lateralWavePhase === "undefined") {
                org.lateralWavePhase = Math.random() * Math.PI * 2;
            }
            if (typeof org.lateralWaveFrequency === "undefined") {
                org.lateralWaveFrequency = 0.25 + Math.random() * 0.20; // Hz
            }
            if (typeof org.yawWobbleAngle === "undefined") {
                org.yawWobbleAngle = 0.0;
            }
            if (typeof org.chaoticCircling === "undefined") {
                org.chaoticCircling = false;
            }

            // 4. Lateral Arm Spines & Mucus Suspension Feeding
            if (typeof org.mucusSuspensionRate === "undefined") {
                const suspGene = (org.dna && typeof org.dna.suspensionFeeding === "number") ?
                    0.10 + org.dna.suspensionFeeding * 0.25 : this.baseSuspensionRate;
                org.mucusSuspensionRate = Math.max(0.10, Math.min(0.35, suspGene));
            }

            // 5. Fragile Multi-Point Micro-Autotomy & Segment Decoy
            if (typeof org.isSegmentAutotomized === "undefined") {
                org.isSegmentAutotomized = false;
            }
            if (typeof org.wrigglingSegmentTimer === "undefined") {
                org.wrigglingSegmentTimer = 0.0;
            }
            if (typeof org.detachedSegmentCount === "undefined") {
                org.detachedSegmentCount = 0;
            }
            if (typeof org.creviceSheltered === "undefined") {
                org.creviceSheltered = false;
            }

            // 6. Central Disc Fragility & Calcification Stalls
            if (typeof org.bursalSlimeTimer === "undefined") {
                org.bursalSlimeTimer = 0.0;
            }
            if (typeof org.coelomicCalciteReserve === "undefined") {
                org.coelomicCalciteReserve = 50.0; // coelomic calcium store
            }
            if (typeof org.calcificationDepletionStall === "undefined") {
                org.calcificationDepletionStall = false;
            }

            // 7. 93rd & 94th Channel Metrics (% SVI & % BFR)
            if (typeof org.serpentiformVelocityIndex === "undefined") {
                org.serpentiformVelocityIndex = 0.35;
            }
            if (typeof org.brittleFractureRatio === "undefined") {
                org.brittleFractureRatio = 0.10;
            }
        }

        /**
         * Update an individual ophiuroid organism over simulation time step dt.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Effective time step in seconds.
         * @param {Array<Object>} allOrganisms - All live organisms in the dish.
         */
        updateOrganism(org, dt, allOrganisms) {
            if (!org || !org.alive) return;
            if (typeof org.isOphiuroid === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isOphiuroid) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // --- 0. Multi-Segment Loss Asymmetry & Yaw Wobble Calculation ---
            const maxTotalSegments = (org.vertebraePerArm || this.baseVertebraeCount) * 5;
            let armSegmentCounts = [24, 24, 24, 24, 24];
            if (org.ophiuroidArms) {
                armSegmentCounts = org.ophiuroidArms.map(a => a.intactSegments);
            }
            const currentTotalSegments = armSegmentCounts.reduce((sum, count) => sum + count, 0);
            org.intactArmSegmentsCount = currentTotalSegments;

            const maxSegmentsInArm = Math.max(...armSegmentCounts);
            const minSegmentsInArm = Math.min(...armSegmentCounts);
            const segmentAsymmetry = maxSegmentsInArm - minSegmentsInArm;
            const lostRatio = Math.max(0.0, (maxTotalSegments - currentTotalSegments) / maxTotalSegments);
            const segmentIntegrityRatio = Math.max(0.20, currentTotalSegments / Math.max(1, maxTotalSegments));

            // Yaw wobble instability from uneven arm lengths
            if (segmentAsymmetry > 3) {
                org.yawWobbleAngle = Math.min(0.45, (segmentAsymmetry / 24.0) * 0.45 * Math.sin((org.lateralWavePhase || 0) * 1.5));
            } else {
                org.yawWobbleAngle = 0.0;
            }

            // Severe loss penalty: if lostRatio > 0.50, chaotic circling occurs!
            org.chaoticCircling = (lostRatio > 0.50);
            if (org.chaoticCircling) {
                this.metrics.chaoticCirclingInstances++;
            }

            // Effective slithering speed
            const baseSpeed = org.serpentiformSpeed || this.baseSlitherSpeed;
            org.effectiveSlitherSpeed = baseSpeed * segmentIntegrityRatio * (org.chaoticCircling ? 0.40 : 1.0);

            // --- A. Lateral Sinusoidal Locomotion & Propulsion ---
            org.lateralWavePhase = ((org.lateralWavePhase || 0.0) + (org.lateralWaveFrequency || 0.25) * Math.PI * 2 * effDt) % (Math.PI * 2);

            const isFleeing = (org.energy && org.energy < 30.0) || org.isSegmentAutotomized;
            const slitherBurst = isFleeing ? org.effectiveSlitherSpeed * 1.5 : org.effectiveSlitherSpeed;

            const baseAngle = Math.atan2(org.vy || 0, org.vx || 1);
            const sinusWhip = Math.sin(org.lateralWavePhase) * 0.45;
            let moveAngle = baseAngle + sinusWhip + org.yawWobbleAngle;

            if (org.chaoticCircling) {
                // Tangential circling trajectory
                moveAngle = ((org.lateralWavePhase * 2.0) % (Math.PI * 2));
            }

            if (org.vx !== undefined && org.vy !== undefined) {
                org.vx += Math.cos(moveAngle) * slitherBurst * effDt * 8.0;
                org.vy += Math.sin(moveAngle) * slitherBurst * effDt * 8.0;

                // Slithering friction damping
                org.vx *= 0.94;
                org.vy *= 0.94;
            }

            this.metrics.cumulativeSlitherDistance += slitherBurst * effDt;

            // --- B. Arm Flexion & Intervertebral Joint Dynamics ---
            let sumFlexion = 0.0;
            if (org.ophiuroidArms) {
                for (let a = 0; a < org.ophiuroidArms.length; a++) {
                    const arm = org.ophiuroidArms[a];
                    const wavePhase = org.lateralWavePhase + (arm.lateralWaveOffset || 0.0);
                    arm.flexionAngle = Math.sin(wavePhase) * this.maxFlexionAngle * segmentIntegrityRatio;
                    sumFlexion += Math.abs(arm.flexionAngle);
                }
            }
            const meanArmFlexion = sumFlexion / 5.0;

            // --- C. Central Disc Fragility & 3.0x Trauma Vulnerability ---
            // If predators attack within direct disc proximity (radius ~10 px), apply 3x trauma damage
            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const discRadius = size * (org.discDiameterRatio || 0.55);
            let underDiscAttack = false;

            if (allOrganisms) {
                const discAttackDistSq = (discRadius * 1.3) * (discRadius * 1.3);
                for (let p = 0; p < allOrganisms.length; p++) {
                    const enemy = allOrganisms[p];
                    if (!enemy || !enemy.alive || enemy === org) continue;
                    if (enemy.niche === "carnivore" || enemy.diet === "carnivore" || enemy.isApex) {
                        const edx = enemy.x - org.x;
                        const edy = enemy.y - org.y;
                        if (edx * edx + edy * edy <= discAttackDistSq) {
                            underDiscAttack = true;
                            break;
                        }
                    }
                }
            }

            if (underDiscAttack) {
                // 3.0x Direct Disc Penetration Trauma Damage!
                const discDamage = effDt * 22.0 * 3.0;
                org.energy = Math.max(4.0, (org.energy || 50.0) - discDamage);
                this.metrics.cumulativeDiscTraumaDamage += discDamage;
                this.metrics.discTraumaIncidents++;

                // Trigger bursal slime discharge
                org.bursalSlimeTimer = 3.0;
            }

            if (org.bursalSlimeTimer > 0.0) {
                org.bursalSlimeTimer = Math.max(0.0, org.bursalSlimeTimer - effDt);
            }

            // --- D. Lateral Spines Mucus Suspension Feeding ---
            if (org.y >= 240.0 && (org.energy || 50.0) < 95.0) {
                const suspensionYield = (org.mucusSuspensionRate || this.baseSuspensionRate) *
                    segmentIntegrityRatio * effDt * 4.2;

                org.energy = Math.min(100.0, (org.energy || 50.0) + suspensionYield);
                // Replenish coelomic calcite reserve slightly from captured suspended minerals
                org.coelomicCalciteReserve = Math.min(100.0, (org.coelomicCalciteReserve || 50.0) + suspensionYield * 0.4);
                this.metrics.cumulativeSuspensionHarvest += suspensionYield;
                this.metrics.suspensionFeedingEvents++;
            }

            // --- E. Crevice Refuge & Photonegative Behavior ---
            const nearBottom = org.y >= 330.0;
            const nearCrevice = nearBottom || org.x <= 40.0 || org.x >= 760.0;
            org.creviceSheltered = nearCrevice;

            // --- F. Fragile Multi-Point Micro-Autotomy ---
            if ((org.energy || 50.0) < 25.0 && currentTotalSegments >= 10 && !org.isSegmentAutotomized) {
                if (org.ophiuroidArms) {
                    const longestArm = org.ophiuroidArms.reduce((max, a) => a.intactSegments > max.intactSegments ? a : max, org.ophiuroidArms[0]);
                    if (longestArm && longestArm.intactSegments > 6) {
                        const brokenSegments = Math.min(longestArm.intactSegments - 4, 4 + Math.floor(Math.random() * 4));
                        longestArm.intactSegments -= brokenSegments;
                        longestArm.isAutotomized = true;
                        longestArm.blastemaRegenProgress = 0.0;

                        org.isSegmentAutotomized = true;
                        org.wrigglingSegmentTimer = 4.5; // 4.5s autonomous wriggling decoy
                        org.detachedSegmentCount = brokenSegments;
                        this.metrics.segmentAutotomyEvents++;

                        // Burst escape
                        org.energy = Math.min(48.0, (org.energy || 20.0) + 14.0);
                    }
                }
            }

            if (org.wrigglingSegmentTimer > 0.0) {
                org.wrigglingSegmentTimer = Math.max(0.0, org.wrigglingSegmentTimer - effDt);
                this.metrics.cumulativeWriggleLureTicks++;
                if (org.wrigglingSegmentTimer <= 0.0) {
                    org.isSegmentAutotomized = false;
                }
            }

            // --- G. Calcification Depletion Stall & Epimorphic Regeneration ---
            if (org.ophiuroidArms) {
                const maxPerArm = org.vertebraePerArm || this.baseVertebraeCount;
                const calciteReserve = org.coelomicCalciteReserve !== undefined ? org.coelomicCalciteReserve : 50.0;
                const isMineralDeficient = (calciteReserve < 10.0) || ((org.energy || 50.0) < 28.0);
                org.calcificationDepletionStall = isMineralDeficient;

                if (isMineralDeficient) {
                    this.metrics.calcificationStalls++;
                }

                for (let k = 0; k < org.ophiuroidArms.length; k++) {
                    const arm = org.ophiuroidArms[k];
                    if (arm.intactSegments < maxPerArm) {
                        if (isMineralDeficient) {
                            // Regeneration paused due to mineral or energy depletion
                            arm.blastemaRegenProgress = arm.blastemaRegenProgress || 0.0;
                        } else {
                            // Active ossicle biomineralization
                            const regenCost = effDt * 0.035;
                            const calciteCost = effDt * 0.08;

                            org.energy = Math.max(8.0, (org.energy || 50.0) - regenCost);
                            org.coelomicCalciteReserve = Math.max(0.0, calciteReserve - calciteCost);

                            arm.blastemaRegenProgress = Math.min(1.0,
                                (arm.blastemaRegenProgress || 0.0) + effDt * this.baseSegmentRegenRate);

                            if (arm.blastemaRegenProgress >= 1.0) {
                                arm.intactSegments = Math.min(maxPerArm, arm.intactSegments + 1);
                                arm.blastemaRegenProgress = arm.intactSegments < maxPerArm ? 0.0 : 1.0;
                                if (arm.intactSegments >= maxPerArm) {
                                    arm.isAutotomized = false;
                                }
                                this.metrics.segmentRegenEvents++;
                            }
                        }
                    }
                }
            }

            // --- H. 93rd Channel Metric (% SVI - Serpentiform Velocity & Articulation Index) ---
            const velocityFactor = Math.max(0.0, Math.min(1.0, (org.effectiveSlitherSpeed || this.baseSlitherSpeed) / 2.40));
            const flexionFactor = Math.max(0.0, Math.min(1.0, meanArmFlexion / this.maxFlexionAngle));
            const suspensionFactor = Math.max(0.0, Math.min(1.0, (org.mucusSuspensionRate || 0.22) / 0.35));
            const integrityFactor = Math.max(0.0, Math.min(1.0, segmentIntegrityRatio));

            const rawSVI = (velocityFactor * 0.35) +
                           (flexionFactor * 0.30) +
                           (suspensionFactor * 0.20) +
                           (integrityFactor * 0.15);

            org.serpentiformVelocityIndex = Math.max(0.0, Math.min(1.0, rawSVI));

            // --- I. 94th Channel Metric (% BFR - Brittle Fracture & Autotomy Ratio) ---
            // BFR Formülasyonu:
            // 35% Segmental Autotomy Fracture Loss + 30% Wriggling Lure Activity +
            // 20% Calcification Regeneration Integrity + 15% Central Disc Turgor
            const fractureLossFactor = Math.max(0.0, Math.min(1.0, lostRatio * 1.8));
            const wriggleLureFactor = org.isSegmentAutotomized ? 1.0 : (org.wrigglingSegmentTimer > 0.0 ? 0.70 : 0.0);
            const regenIntegrityFactor = org.calcificationDepletionStall ? 0.15 : Math.max(0.0, Math.min(1.0, segmentIntegrityRatio));
            const discTurgorFactor = org.bursalSlimeTimer > 0.0 ? 0.25 : 1.0;

            const rawBFR = (fractureLossFactor * 0.35) +
                           (wriggleLureFactor * 0.30) +
                           (regenIntegrityFactor * 0.20) +
                           (discTurgorFactor * 0.15);

            org.brittleFractureRatio = Math.max(0.0, Math.min(1.0, rawBFR));
        }

        /**
         * Update all organisms and aggregate population-level metrics.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time step in seconds.
         */
        updateAll(organisms, dt) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let ophiuroidCount = 0;
            let activeSlitherCount = 0;
            let creviceCount = 0;
            let autotomizedCount = 0;
            let stallCount = 0;
            let circlingCount = 0;

            let sumSpeed = 0.0;
            let sumFlexion = 0.0;
            let sumSuspension = 0.0;
            let sumSegments = 0;
            let sumSVI = 0.0;
            let sumBFR = 0.0;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const len = organisms.length;

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, organisms);

                if (org.isOphiuroid) {
                    ophiuroidCount++;
                    sumSpeed += (org.effectiveSlitherSpeed || 0.0);
                    sumFlexion += (org.ophiuroidArms ?
                        org.ophiuroidArms.reduce((acc, a) => acc + Math.abs(a.flexionAngle || 0), 0) / 5.0 : 0.0);
                    sumSuspension += (org.mucusSuspensionRate || 0.0);
                    sumSegments += (org.intactArmSegmentsCount || 0);
                    sumSVI += (org.serpentiformVelocityIndex || 0.0);
                    sumBFR += (org.brittleFractureRatio || 0.0);

                    if (Math.abs(org.vx || 0) + Math.abs(org.vy || 0) > 0.3) {
                        activeSlitherCount++;
                    }
                    if (org.creviceSheltered) {
                        creviceCount++;
                    }
                    if (org.isSegmentAutotomized) {
                        autotomizedCount++;
                    }
                    if (org.calcificationDepletionStall) {
                        stallCount++;
                    }
                    if (org.chaoticCircling) {
                        circlingCount++;
                    }
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalOphiuroidOrganisms = ophiuroidCount;
            this.metrics.ophiuroidPrevalence = liveCount > 0 ? (ophiuroidCount / liveCount) : 0.0;
            this.metrics.activeSlitheringOrganisms = activeSlitherCount;
            this.metrics.creviceShelteredOrganisms = creviceCount;
            this.metrics.autotomizedOrganisms = autotomizedCount;
            this.metrics.calcificationStalls = stallCount;
            this.metrics.chaoticCirclingInstances = circlingCount;

            this.metrics.meanSlitherSpeed = ophiuroidCount > 0 ? (sumSpeed / ophiuroidCount) : 0.0;
            this.metrics.meanVertebralFlexion = ophiuroidCount > 0 ? (sumFlexion / ophiuroidCount) : 0.0;
            this.metrics.meanSuspensionIntake = ophiuroidCount > 0 ? (sumSuspension / ophiuroidCount) : 0.0;
            this.metrics.meanIntactSegments = ophiuroidCount > 0 ? (sumSegments / (ophiuroidCount * 5)) : 24.0;
            this.metrics.meanSerpentiformVelocityIndex = ophiuroidCount > 0 ? (sumSVI / ophiuroidCount) : 0.0;
            this.metrics.meanBrittleFractureRatio = ophiuroidCount > 0 ? (sumBFR / ophiuroidCount) : 0.0;
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
         * @returns {Object} Comprehensive Ophiuroid Vertebrae metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OphiuroidVertebraeManager;
    }
    if (typeof global !== "undefined") {
        global.OphiuroidVertebraeManager = OphiuroidVertebraeManager;
        global.ophiuroidVertebraeManager = new OphiuroidVertebraeManager();
    }
})(typeof window !== "undefined" ? window : global);
