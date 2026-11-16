// BioEcosystem - Urochordata Biphasic Life Cycle, Notochord Resorption & Cellulosic Tunic
// Module: src/organs/urochordate_tunic.js
// Version: 7.97.0 (Hour 517 - System Agent: Siphon Detrital Fouling, Squirting Spasm, Reversible Heart & 100th Channel % CPR)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UrochordateTunicManager
     * High-fidelity biological simulation of urochordate (tunicates / sea squirts / Ascidiacea) anatomy and life cycle:
     * - Biphasic Life Cycle: Free-swimming chordate tadpole larva equipped with caudal notochord and dorsal nerve tube
     * - Substrate Settlement & Adhesive Papillae: Attachment to rocky benthic substrate via tri-papillary adhesive secretions
     * - Retrogressive Metamorphosis: Programmed autolysis and lysosomal resorption of larval tail and notochord into visceral mass
     * - Organ Inversion & Ganglion Regression: Cerebral vesicle regression to a single solid ganglion, 90-180 degree branchial rotation
     * - Cellulosic Tunic Matrix (Tunicin): Epidermal secretion of plant-like cellulose microfibril mantle resisting predation and shearing
     * - Siphon Detrital Fouling & Branchial Stall: Mineral silt accumulation clogging stigmata and triggering ciliary arrest
     * - Expulsive Squirting Spasm & Jet Evacuation: High-pressure water discharge (1.5 - 4.2 kPa) expelling fouling silt and predators
     * - Reversible Tubular Heartbeat: Peristaltic cardiac direction reversal (+1 advisceral / -1 abvisceral) every 90-150s with arrhythmia modeling
     * - 99th Channel (% TPI) & 100th Channel (% CPR - Ciliary Pumping & Reversal Ratio) mathematical cores
     */
    class UrochordateTunicManager {
        constructor() {
            this.baseTunicThickness = 2.4; // Micrometers of cellulosic tunicin mantle [1.2 - 4.8 um]
            this.baseTunicIntegrity = 0.85; // Structural density and cohesion [0.40 - 0.98]
            this.baseCiliaryPumping = 0.55; // Seston pumping volumetric flux (uL/s) [0.25 - 1.10]
            this.baseResorptionRate = 0.055; // Metamorphosis tail resorption rate per second

            this.metrics = {
                totalLiveCells: 0,
                totalUrochordateOrganisms: 0,
                urochordatePrevalence: 0.0,
                meanTunicProtectiveIntegrity: 0.0,
                meanCiliaryPumpingReversalRatio: 0.0,
                meanTunicThickness: 2.4,
                meanTunicIntegrity: 0.85,
                meanCiliaryPumpingRate: 0.55,
                meanResorptionProgress: 0.0,
                meanSiphonFouling: 0.0,
                meanHypoxicStress: 0.0,
                activeAdultSessileCount: 0,
                activeTadpoleLarvaeCount: 0,
                metamorphosisIncidents: 0,
                substrateSettlementEvents: 0,
                predatorDamageDeflections: 0,
                siphonFoulingIncidents: 0,
                squirtingSpasmEvents: 0,
                cardiacReversalEvents: 0,
                cardiacArrhythmiaIncidents: 0,
                cumulativeFilteredSeston: 0.0,
                cumulativeResorbedBiomass: 0.0
            };
        }

        /**
         * Initialize urochordate morphology, life-cycle stage, and tunic properties on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Tunicates, ascidians, benthic settlers, or organisms with filter diet / tunicate affinity
            const isCompetent = org.hasUrochordateTrait ||
                (org.hasCephalochordateTrait === false && org.hasStereom === false &&
                 (org.niche === "sessile" || org.diet === "filter" || org.diet === "detritivore") &&
                 (org.y >= 140.0 && Math.random() < 0.32)) ||
                (org.dna && ((org.dna.tunicateAffinity || 0) > 0.30 || (org.dna.sessileFilterAffinity || 0) > 0.35));

            if (typeof org.hasUrochordateTrait === "undefined") {
                org.hasUrochordateTrait = isCompetent;
            }

            if (!org.hasUrochordateTrait) {
                org.isUrochordate = false;
                org.tunicProtectiveIntegrity = 0.0;
                org.ciliaryPumpingReversalRatio = 0.0;
                org.tunicinCoverThickness = 0.0;
                org.tunicinIntegrity = 0.0;
                org.isAscidianTadpole = false;
                org.isAdultSessile = false;
                org.isAttachedToSubstrate = false;
                org.notochordResorptionProgress = 0.0;
                org.larvalPhaseTimer = 0.0;
                org.tailNotochordLength = 0.0;
                org.ciliaryPumpingRate = 0.0;
                org.branchialSiphonAperture = 0.0;
                org.atrialSiphonAperture = 0.0;
                org.barrelBodyHeight = 0.0;
                org.barrelBodyWidth = 0.0;
                org.siphonSquirtingReflex = false;
                org.siphonDetritalFouling = 0.0;
                org.branchialBasketStall = false;
                org.tunicateHypoxicStress = 0.0;
                org.siphonSquirtingSpasmTimer = 0.0;
                org.jetDischargePressure = 0.0;
                org.bodyContractionRatio = 1.0;
                org.cardiacPeristalsisDirection = 1;
                org.cardiacReversalTimer = 0.0;
                org.cardiacArrhythmiaRisk = 0.0;
                org.cardiacStasis = false;
                org.cardiacStasisTimer = 0.0;
                return;
            }

            org.isUrochordate = true;

            // Determine initial phase: either born as swimming tadpole larva or mature adult settler
            if (typeof org.isAscidianTadpole === "undefined" && typeof org.isAdultSessile === "undefined") {
                const startsAsLarva = Math.random() < 0.45;
                org.isAscidianTadpole = startsAsLarva;
                org.isAdultSessile = !startsAsLarva;
                org.isAttachedToSubstrate = !startsAsLarva;
            }

            // 1. Larval Tadpole Stage Properties
            if (typeof org.larvalPhaseTimer === "undefined") {
                org.larvalPhaseTimer = 20.0 + Math.random() * 25.0; // 20 - 45 seconds of larval exploration
            }
            if (typeof org.tailNotochordLength === "undefined") {
                org.tailNotochordLength = 24.0 + Math.random() * 18.0; // 24 - 42 px tail with notochord
            }
            if (typeof org.larvalSwimmingSpeed === "undefined") {
                org.larvalSwimmingSpeed = 1.35 + Math.random() * 1.10; // px/tick
            }
            if (typeof org.larvalWavePhase === "undefined") {
                org.larvalWavePhase = Math.random() * Math.PI * 2;
            }
            if (typeof org.adhesivePapillaeCount === "undefined") {
                org.adhesivePapillaeCount = 3; // Tri-papillary anchor
            }

            // 2. Metamorphosis & Notochord Resorption
            if (typeof org.notochordResorptionProgress === "undefined") {
                org.notochordResorptionProgress = org.isAdultSessile ? 1.0 : 0.0;
            }
            if (typeof org.settlementX === "undefined") {
                org.settlementX = org.x;
                org.settlementY = org.y;
            }

            // 3. Cellulosic Tunic (Tunicin Mantle) [1.2 - 4.8 um]
            if (typeof org.tunicinCoverThickness === "undefined") {
                const thickGene = (org.dna && typeof org.dna.tunicThickness === "number") ?
                    1.2 + org.dna.tunicThickness * 3.4 : this.baseTunicThickness;
                org.tunicinCoverThickness = org.isAdultSessile ?
                    Math.max(1.2, Math.min(4.8, thickGene)) : 0.6; // Thin initial coat in larva
            }
            if (typeof org.tunicinIntegrity === "undefined") {
                org.tunicinIntegrity = this.baseTunicIntegrity;
            }

            // 4. Adult Barrel Morphology & Siphons
            if (typeof org.barrelBodyHeight === "undefined") {
                org.barrelBodyHeight = 32.0 + Math.random() * 24.0; // 32 - 56 px
                org.barrelBodyWidth = org.barrelBodyHeight * 0.62; // 20 - 35 px
            }
            if (typeof org.ciliaryPumpingRate === "undefined") {
                org.ciliaryPumpingRate = org.isAdultSessile ? this.baseCiliaryPumping : 0.0;
            }
            if (typeof org.branchialSiphonAperture === "undefined") {
                org.branchialSiphonAperture = 0.78;
                org.atrialSiphonAperture = 0.70;
            }
            if (typeof org.siphonSquirtingReflex === "undefined") {
                org.siphonSquirtingReflex = false;
            }

            // 5. Critic Audit Mechanics (Fouling, Squirting Spasm, Reversible Heart)
            if (typeof org.siphonDetritalFouling === "undefined") {
                org.siphonDetritalFouling = 0.0;
            }
            if (typeof org.branchialBasketStall === "undefined") {
                org.branchialBasketStall = false;
            }
            if (typeof org.tunicateHypoxicStress === "undefined") {
                org.tunicateHypoxicStress = 0.0;
            }
            if (typeof org.siphonSquirtingSpasmTimer === "undefined") {
                org.siphonSquirtingSpasmTimer = 0.0;
            }
            if (typeof org.jetDischargePressure === "undefined") {
                org.jetDischargePressure = 0.0;
            }
            if (typeof org.bodyContractionRatio === "undefined") {
                org.bodyContractionRatio = 1.0;
            }
            if (typeof org.cardiacPeristalsisDirection === "undefined") {
                org.cardiacPeristalsisDirection = 1; // +1 advisceral, -1 abvisceral
            }
            if (typeof org.cardiacReversalTimer === "undefined") {
                org.cardiacReversalTimer = 90.0 + Math.random() * 60.0; // 90 - 150s reversal cycle
            }
            if (typeof org.cardiacArrhythmiaRisk === "undefined") {
                org.cardiacArrhythmiaRisk = 0.0;
            }
            if (typeof org.cardiacStasis === "undefined") {
                org.cardiacStasis = false;
            }
            if (typeof org.cardiacStasisTimer === "undefined") {
                org.cardiacStasisTimer = 0.0;
            }

            // 6. 99th (% TPI) & 100th (% CPR) Telemetry Channels
            if (typeof org.tunicProtectiveIntegrity === "undefined") {
                org.tunicProtectiveIntegrity = org.isAdultSessile ? 0.75 : 0.35;
            }
            if (typeof org.ciliaryPumpingReversalRatio === "undefined") {
                org.ciliaryPumpingReversalRatio = org.isAdultSessile ? 0.70 : 0.30;
            }
        }

        /**
         * Update individual urochordate biological simulation tick.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - Simulation arena width.
         * @param {number} height - Simulation arena height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive || !org.isUrochordate) return;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));

            // --- 1. Larval Swimming & Substrate Settlement Stage ---
            if (org.isAscidianTadpole && !org.isAttachedToSubstrate) {
                org.larvalWavePhase = (org.larvalWavePhase || 0.0) + effDt * 14.0;
                org.larvalPhaseTimer = (org.larvalPhaseTimer || 30.0) - effDt;

                // Propulsive swimming motion
                const swimDir = Math.atan2(org.vy || 0, org.vx || 1);
                const spd = org.larvalSwimmingSpeed || 1.80;
                org.vx = Math.cos(swimDir) * spd + Math.sin(org.larvalWavePhase) * 0.45;
                org.vy = Math.sin(swimDir) * spd * 0.75 + Math.cos(org.larvalWavePhase) * 0.35;

                // Geotaxis & Phototaxis: downward exploratory descent toward benthic floor
                if (org.y < height - 90) {
                    org.vy += 0.45 * effDt;
                }

                // Check for settlement contact with hard benthic substratum
                const isNearFloor = org.y >= (height - 85);
                const isOutOfTime = org.larvalPhaseTimer <= 0.0;

                if (isNearFloor || isOutOfTime) {
                    org.isAttachedToSubstrate = true;
                    org.settlementX = org.x;
                    org.settlementY = Math.min(height - 40, Math.max(height - 110, org.y));
                    org.vx = 0.0;
                    org.vy = 0.0;
                    this.metrics.substrateSettlementEvents++;
                }
            }

            // --- 2. Retrogressive Metamorphosis & Notochord Autolysis ---
            if (org.isAttachedToSubstrate && !org.isAdultSessile) {
                // Anchor rigidly to substrate
                org.x = org.settlementX;
                org.y = org.settlementY;
                org.vx = 0.0;
                org.vy = 0.0;

                // Resorb caudal notochord and tail tissue
                org.notochordResorptionProgress = Math.min(1.0,
                    (org.notochordResorptionProgress || 0.0) + effDt * this.baseResorptionRate);

                // Autolyzed tail biomass conversion into visceral and tunic growth
                const resorbedDelta = effDt * this.baseResorptionRate * 10.0;
                this.metrics.cumulativeResorbedBiomass += resorbedDelta;
                org.tunicinCoverThickness = Math.min(4.8, (org.tunicinCoverThickness || 0.6) + resorbedDelta * 0.08);

                // Complete metamorphosis when tail is completely resorbed
                if (org.notochordResorptionProgress >= 1.0) {
                    org.isAscidianTadpole = false;
                    org.isAdultSessile = true;
                    org.ciliaryPumpingRate = this.baseCiliaryPumping;
                    this.metrics.metamorphosisIncidents++;
                }
            }

            // --- 3. Adult Sessile Biology, Siphon Fouling & Reversible Heartbeat ---
            if (org.isAdultSessile) {
                // Rigid sessile anchoring
                org.x = org.settlementX;
                org.y = org.settlementY;
                org.vx = 0.0;
                org.vy = 0.0;

                // A. Detrital Silt Accumulation & Branchial Basket Fouling
                if (org.siphonSquirtingSpasmTimer <= 0.0) {
                    org.siphonDetritalFouling = Math.min(1.0, (org.siphonDetritalFouling || 0.0) + effDt * 0.028);
                }

                if (org.siphonDetritalFouling >= 0.65) {
                    if (!org.branchialBasketStall) {
                        this.metrics.siphonFoulingIncidents++;
                    }
                    org.branchialBasketStall = true;
                    org.tunicateHypoxicStress = Math.min(1.0, (org.tunicateHypoxicStress || 0.0) + effDt * 0.075);
                } else {
                    org.branchialBasketStall = false;
                    org.tunicateHypoxicStress = Math.max(0.0, (org.tunicateHypoxicStress || 0.0) - effDt * 0.04);
                }

                // Automatic Squirting Spasm Trigger when heavily fouled
                if (org.siphonDetritalFouling >= 0.65 && (org.siphonSquirtingSpasmTimer || 0.0) <= 0.0) {
                    this.triggerSiphonSquirt(org, 3.2);
                }

                // B. Squirting Spasm Execution & High-Pressure Water Jet
                if (org.siphonSquirtingSpasmTimer > 0.0) {
                    org.siphonSquirtingSpasmTimer -= effDt;
                    org.bodyContractionRatio = 0.75; // 25% contraction
                    org.branchialSiphonAperture = 0.15;
                    org.atrialSiphonAperture = 0.15;

                    // High pressure jet clears fouling silt
                    org.siphonDetritalFouling = Math.max(0.0, (org.siphonDetritalFouling || 0.0) - effDt * 0.55);
                    if (org.siphonDetritalFouling <= 0.10) {
                        org.branchialBasketStall = false;
                    }

                    // Metabolic energy consumption for violent contraction
                    org.energy = Math.max(5.0, (org.energy || 50.0) - effDt * 3.5);

                    if (org.siphonSquirtingSpasmTimer <= 0.0) {
                        org.siphonSquirtingReflex = false;
                    }
                } else {
                    // Gradual expansion back to normal relaxed posture
                    org.bodyContractionRatio = Math.min(1.0, (org.bodyContractionRatio || 0.75) + effDt * 0.40);
                    org.jetDischargePressure = Math.max(0.0, (org.jetDischargePressure || 0.0) - effDt * 2.5);
                    org.branchialSiphonAperture = Math.min(0.85, (org.branchialSiphonAperture || 0.2) + effDt * 0.45);
                    org.atrialSiphonAperture = Math.min(0.75, (org.atrialSiphonAperture || 0.2) + effDt * 0.45);
                }

                // C. Ciliary branchial water intake & filtration (penalized by stall and spasm)
                const stallPenalty = org.branchialBasketStall ? 0.25 : 1.0;
                const spasmPenalty = org.siphonSquirtingSpasmTimer > 0.0 ? 0.10 : 1.0;
                const pumpingEfficiency = Math.max(0.15, (org.tunicinIntegrity || 0.85) * stallPenalty * spasmPenalty);
                org.ciliaryPumpingRate = this.baseCiliaryPumping * pumpingEfficiency;

                const filteredSeston = org.ciliaryPumpingRate * effDt * 0.35;
                this.metrics.cumulativeFilteredSeston += filteredSeston;
                org.energy = Math.min(org.maxEnergy || 100.0, (org.energy || 50.0) + filteredSeston * 18.0);

                // Tunicin mantle maintenance and thickening from assimilated carbon
                if (org.tunicinCoverThickness < 4.5 && (org.energy || 0) > 40.0) {
                    org.tunicinCoverThickness = Math.min(4.8, org.tunicinCoverThickness + effDt * 0.025);
                }
                org.tunicinIntegrity = Math.min(1.0, Math.max(0.25, (org.tunicinIntegrity || 0.85) + effDt * 0.015));

                // D. Reversible Peristaltic Tubular Heartbeat & Arrhythmia Dynamics
                org.cardiacReversalTimer = (org.cardiacReversalTimer || 120.0) - effDt;
                if (org.cardiacReversalTimer <= 0.0) {
                    org.cardiacPeristalsisDirection = (org.cardiacPeristalsisDirection === 1) ? -1 : 1;
                    org.cardiacReversalTimer = 90.0 + Math.random() * 60.0; // 90 - 150s reversal cycle
                    this.metrics.cardiacReversalEvents++;
                    // Transient stasis pause during reversal
                    org.cardiacStasis = true;
                    org.cardiacStasisTimer = 1.2;
                }

                if (org.cardiacStasisTimer > 0.0) {
                    org.cardiacStasisTimer -= effDt;
                    if (org.cardiacStasisTimer <= 0.0) {
                        org.cardiacStasis = false;
                    }
                }

                // Arrhythmia risk from hypoxia or violent squirting spasm
                org.cardiacArrhythmiaRisk = ((org.tunicateHypoxicStress || 0.0) * 0.65) +
                    (org.siphonSquirtingSpasmTimer > 0.0 ? 0.35 : 0.0);

                if (org.cardiacArrhythmiaRisk >= 0.70 && Math.random() < 0.015 && !org.cardiacStasis) {
                    org.cardiacStasis = true;
                    org.cardiacStasisTimer = 1.6;
                    this.metrics.cardiacArrhythmiaIncidents++;
                }
            }

            // --- 4. 99th Channel (% TPI - Tunic Protective Integrity) Formulation ---
            const thickRatio = Math.min(1.0, (org.tunicinCoverThickness || 1.2) / 4.0);
            const thickComp = thickRatio * 0.35;
            const integrComp = Math.max(0.0, Math.min(1.0, org.tunicinIntegrity || 0.85)) * 0.30;
            const sessileRatio = org.isAdultSessile ? 1.0 :
                (org.isAttachedToSubstrate ? 0.30 + 0.50 * org.notochordResorptionProgress : 0.20);
            const sessileComp = sessileRatio * 0.20;
            const pumpRatio = Math.min(1.0, (org.ciliaryPumpingRate || 0.0) / 0.80);
            const pumpComp = pumpRatio * 0.15;

            const computedTPI = thickComp + integrComp + sessileComp + pumpComp;
            org.tunicProtectiveIntegrity = Math.max(0.0, Math.min(1.0, computedTPI));

            // --- 5. 100th Channel (% CPR - Ciliary Pumping & Reversal Ratio) Formulation ---
            // Component 1: Ciliary seston pumping flux ratio (35% weight)
            const cprPumpEff = org.branchialBasketStall ? 0.25 : Math.min(1.0, (org.ciliaryPumpingRate || 0.0) / 0.75);
            const cprPumpComp = cprPumpEff * 0.35;

            // Component 2: Cardiac peristalsis stability & reversal success (30% weight)
            const cardiacEff = org.cardiacStasis ? 0.25 : (1.0 - (org.cardiacArrhythmiaRisk || 0.0) * 0.45);
            const cprCardiacComp = Math.max(0.0, Math.min(1.0, cardiacEff)) * 0.30;

            // Component 3: Siphon detrital fouling resistance (20% weight)
            const foulingResist = 1.0 - Math.min(1.0, org.siphonDetritalFouling || 0.0);
            const cprFoulingComp = Math.max(0.0, foulingResist) * 0.20;

            // Component 4: Tunicin mantle elasticity & jet discharge readiness (15% weight)
            const jetReady = org.isAdultSessile ? (org.siphonSquirtingSpasmTimer > 0.0 ? 0.95 : 0.70) : 0.25;
            const cprJetComp = jetReady * 0.15;

            const computedCPR = cprPumpComp + cprCardiacComp + cprFoulingComp + cprJetComp;
            org.ciliaryPumpingReversalRatio = Math.max(0.0, Math.min(1.0, computedCPR));
        }

        /**
         * Update all organisms and recalculate dish-wide Urochordata population metrics.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Frame time delta.
         * @param {number} width - Arena width.
         * @param {number} height - Arena height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let uroCount = 0;
            let adultCount = 0;
            let larvaCount = 0;

            let sumTPI = 0.0;
            let sumCPR = 0.0;
            let sumThickness = 0.0;
            let sumIntegrity = 0.0;
            let sumPumping = 0.0;
            let sumResorption = 0.0;
            let sumFouling = 0.0;
            let sumHypoxia = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead || org.alive === false) continue;
                liveCount++;

                if (typeof org.isUrochordate === "undefined") {
                    this.initOrganism(org);
                }

                if (org.isUrochordate) {
                    this.updateOrganism(org, dt, width, height);
                    uroCount++;

                    sumTPI += (org.tunicProtectiveIntegrity || 0.50);
                    sumCPR += (org.ciliaryPumpingReversalRatio || 0.45);
                    sumThickness += (org.tunicinCoverThickness || 2.4);
                    sumIntegrity += (org.tunicinIntegrity || 0.85);
                    sumPumping += (org.ciliaryPumpingRate || 0.0);
                    sumResorption += (org.notochordResorptionProgress || 0.0);
                    sumFouling += (org.siphonDetritalFouling || 0.0);
                    sumHypoxia += (org.tunicateHypoxicStress || 0.0);

                    if (org.isAdultSessile) adultCount++;
                    else if (org.isAscidianTadpole) larvaCount++;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalUrochordateOrganisms = uroCount;
            this.metrics.urochordatePrevalence = liveCount > 0 ? (uroCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanTunicProtectiveIntegrity = uroCount > 0 ? (sumTPI / uroCount) : 0.0;
            this.metrics.meanCiliaryPumpingReversalRatio = uroCount > 0 ? (sumCPR / uroCount) : 0.0;
            this.metrics.meanTunicThickness = uroCount > 0 ? (sumThickness / uroCount) : 2.4;
            this.metrics.meanTunicIntegrity = uroCount > 0 ? (sumIntegrity / uroCount) : 0.85;
            this.metrics.meanCiliaryPumpingRate = uroCount > 0 ? (sumPumping / uroCount) : 0.0;
            this.metrics.meanResorptionProgress = uroCount > 0 ? (sumResorption / uroCount) : 0.0;
            this.metrics.meanSiphonFouling = uroCount > 0 ? (sumFouling / uroCount) : 0.0;
            this.metrics.meanHypoxicStress = uroCount > 0 ? (sumHypoxia / uroCount) : 0.0;
            this.metrics.activeAdultSessileCount = adultCount;
            this.metrics.activeTadpoleLarvaeCount = larvaCount;
        }

        /**
         * Trigger defensive siphon water squirting reflex upon predatory attack or impact.
         * @param {Object} org - Target urochordate.
         * @param {number} impactForce - Mechanical shock magnitude.
         */
        triggerSiphonSquirt(org, impactForce) {
            if (!org || !org.isUrochordate || !org.isAdultSessile) return;
            org.siphonSquirtingReflex = true;
            org.siphonSquirtingSpasmTimer = 2.5; // 2.5s expulsion spasm
            org.jetDischargePressure = Math.min(4.5, 1.8 + (impactForce || 1.0) * 0.8);
            org.branchialSiphonAperture = 0.10;
            org.atrialSiphonAperture = 0.10;
            this.metrics.predatorDamageDeflections++;
            this.metrics.squirtingSpasmEvents++;
        }

        /**
         * Simulation step entrypoint.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation tick index.
         */
        step(organisms, tick) {
            this.updateAll(organisms, 0.016, (typeof canvas !== "undefined" ? canvas.width : 1200), (typeof canvas !== "undefined" ? canvas.height : 800));
        }

        /**
         * Return current simulation audit metrics.
         * @returns {Object} Comprehensive Urochordata metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = UrochordateTunicManager;
    }
    if (typeof global !== "undefined") {
        global.UrochordateTunicManager = UrochordateTunicManager;
        global.urochordateTunicManager = new UrochordateTunicManager();
    }
})(typeof window !== "undefined" ? window : global);
