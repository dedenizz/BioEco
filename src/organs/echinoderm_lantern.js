// BioEcosystem - Aristotle's Lantern Mastication, Calcite Chisel Teeth & Bioerosion Mechanics
// Module: src/organs/echinoderm_lantern.js
// Version: 7.37.0 (Hour 457 - System Agent: Tooth Sac Calcite Reserves, Microfractures, Bioerosion Excavation & Urchin Barren Mechanics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EchinodermLanternManager
     * High-fidelity biological simulation of the echinoid masticatory apparatus (Aristotle's Lantern):
     * - 5 Calcite Pyramidal Jaws: Pentaradial arch structure situated at the oral peristome
     * - Continuously Growing Chisel Teeth: Self-sharpening keeled teeth with hardness gradients
     * - Protractor & Retractor Muscle Kinetics: Dynamic extrusion through the peristome and crushing torque
     * - Calcareous Coralline Algae Scraping: High-efficiency rasping of lithified algal crusts and kelp holdfasts
     * - Rock Bioerosion & Calcite Silt Production: Physical abrading of carbonate substrate generating mineral sediment
     * - Tooth Sac Calcite Reserves & Renewal: Plumula mineral storage maintaining continuous axial regeneration
     * - Substrate Microfractures & Blunting Penalty: Acute mechanical fractures on hard substrates causing severe wear
     * - Macro-Bioerosion Excavation Volume: Volumetric substrate removal (um^3) and reef matrix structural weakening
     * - Urchin Barren Trophic Collapse: Overgrazing threshold triggering kelp holdfast destruction and coralline barrens
     * - 88th Telemetry Channel Mathematical Formulation: % BER (Bioerosion Rate & Dental Renewal Index)
     */
    class EchinodermLanternManager {
        constructor() {
            this.nominalJawCount = 5; // 5 symmetric pyramidal calcite jaws
            this.baseScrapingYield = 0.32; // Baseline nutrition assimilation per scraping stroke
            this.baseBioerosionFactor = 0.16; // Baseline substrate rock erosion rate
            this.baseDentalGrowthRate = 0.05; // Baseline axial tooth renewal rate from tooth sac

            // Ecological & Benthic Substrate Dynamics
            this.overgrazingThreshold = 14; // Density threshold along benthic horizon triggering barren state
            this.recoveryThreshold = 7; // Grazer count below which kelp recruits can re-establish
            this.urchinBarrenState = false; // Trophic regime: false = healthy kelp forest, true = urchin barren
            this.benthicSubstrateCapacity = 60000.0; // Total resilient mineral matrix mass before structural collapse
            this.calciteSiltSuspension = 0.0; // Suspended carbonate silt in water column (mg/L)
            this.cumulativeExcavatedVolume = 0.0; // Total bioeroded volume in cubic micrometers (um^3)
            this.reefMatrixWeakeningRatio = 0.0; // Structural integrity loss of benthic carbonate reef matrix [0.0 - 1.0]

            this.metrics = {
                totalLiveCells: 0,
                totalLanternOrganisms: 0,
                lanternPrevalence: 0.0,
                meanJawsCount: 0.0,
                meanTeethSharpness: 0.0,
                meanProtractorForce: 0.0,
                meanExtensionDistance: 0.0,
                meanScrapingEfficiency: 0.0,
                meanBioerosionRate: 0.0,
                meanToothWear: 0.0,
                meanToothSacReserve: 0.0,
                meanMicrofractureRate: 0.0,
                meanBluntingPenalty: 0.0,
                meanGrazingLanternIndex: 0.0,
                meanBioerosionIndex: 0.0,
                activeGrazingOrganisms: 0,
                benthicGrazerDensity: 0,
                algalScrapingEvents: 0,
                bioerosionIncidents: 0,
                microfractureEvents: 0,
                dentalRenewalEvents: 0,
                urchinBarrenState: false,
                calciteSiltSuspension: 0.0,
                reefMatrixWeakeningRatio: 0.0,
                cumulativeScrapedCarbon: 0.0,
                cumulativeBioerodedMineral: 0.0,
                cumulativeExcavatedVolume: 0.0
            };
        }

        /**
         * Initialize Aristotle's Lantern apparatus and chewing teeth on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Echinoids, stereom-bearing echinoderms, or benthic grazers with calcified test
            const isCompetent = org.hasAristotleLantern ||
                (org.hasStereom && (org.niche === "herbivore" || org.niche === "scavenger" || (org.y >= 330.0 && Math.random() < 0.35))) ||
                (org.dna && ((org.dna.lanternAffinity || 0) > 0.30 || (org.dna.calcificationAffinity || 0) > 0.40));

            if (typeof org.hasAristotleLantern === "undefined") {
                org.hasAristotleLantern = isCompetent;
            }

            if (!org.hasAristotleLantern) {
                org.grazingLanternIndex = 0.0;
                org.bioerosionRateIndex = 0.0;
                org.calcitePyramidJawsCount = 0;
                org.calciteTeethCount = 0;
                org.lanternTeethSharpness = 0.0;
                org.lanternProtractorForce = 0.0;
                org.algalScrapingEfficiency = 0.0;
                org.bioerosionRate = 0.0;
                org.toothWearLevel = 0.0;
                org.toothSacCalciteReserve = 0.0;
                org.toothMicrofractureRate = 0.0;
                org.severeToothBluntingPenalty = 0.0;
                org.bioerosionExcavationVolume = 0.0;
                return;
            }

            // 1. 5-Part Calcite Pyramidal Jaws
            if (typeof org.calcitePyramidJawsCount === "undefined") {
                org.calcitePyramidJawsCount = 5;
            }
            if (typeof org.calciteTeethCount === "undefined") {
                org.calciteTeethCount = 5;
            }

            // 2. Self-Sharpening Keeled Chisel Teeth [0.40 - 0.98 sharpness]
            if (typeof org.lanternTeethSharpness === "undefined") {
                const sharpGene = (org.dna && typeof org.dna.teethSharpness === "number") ?
                    org.dna.teethSharpness : 0.72;
                org.lanternTeethSharpness = Math.max(0.40, Math.min(0.98, sharpGene));
            }

            // Tooth physical length [4.0 - 14.0 px]
            if (typeof org.lanternTeethLength === "undefined") {
                org.lanternTeethLength = 6.0 + (org.dna ? (org.dna.size || 8.0) * 0.45 : 3.6);
            }

            // 3. Protractor & Retractor Muscle Kinetics [0.40 - 2.2 N]
            if (typeof org.lanternProtractorForce === "undefined") {
                const forceGene = (org.dna && typeof org.dna.protractorTorque === "number") ?
                    org.dna.protractorTorque * 2.0 : 0.85;
                org.lanternProtractorForce = Math.max(0.40, Math.min(2.2, forceGene));
            }

            // Current extrusion through oral peristome membrane [0.0 - 5.0 px]
            if (typeof org.lanternExtensionDistance === "undefined") {
                org.lanternExtensionDistance = 0.0;
            }

            // Dynamic jaw aperture angle [0.15 - 0.75 radians]
            if (typeof org.jawOpeningAngle === "undefined") {
                org.jawOpeningAngle = 0.25;
            }

            // 4. Calcareous Coralline Algae Scraping Efficiency [0.35 - 0.95]
            if (typeof org.algalScrapingEfficiency === "undefined") {
                const scrapeGene = (org.dna && typeof org.dna.grazingEfficiency === "number") ?
                    org.dna.grazingEfficiency : 0.75;
                org.algalScrapingEfficiency = Math.max(0.35, Math.min(0.95, scrapeGene));
            }

            // 5. Rock Bioerosion Rate [0.05 - 0.35 mg/s]
            if (typeof org.bioerosionRate === "undefined") {
                org.bioerosionRate = 0.08 + (org.lanternProtractorForce || 0.85) * 0.10;
            }

            // Tooth tip abrasion wear level [0.0 - 1.0]
            if (typeof org.toothWearLevel === "undefined") {
                org.toothWearLevel = 0.0;
            }

            // 6. Tooth Sac Calcite Reserves [0.0 - 100.0 units]
            // Mineral pool stored in dental plumula for continuous tooth growth
            if (typeof org.toothSacCalciteReserve === "undefined") {
                org.toothSacCalciteReserve = 80.0 + Math.random() * 20.0;
            }

            // 7. Substrate Microfracture Susceptibility [0.0 - 0.25]
            if (typeof org.toothMicrofractureRate === "undefined") {
                org.toothMicrofractureRate = 0.025;
            }

            // 8. Severe Tooth Blunting Penalty [0.0 - 0.70 reduction in grazing efficiency]
            if (typeof org.severeToothBluntingPenalty === "undefined") {
                org.severeToothBluntingPenalty = 0.0;
            }

            // 9. Bioerosion Excavation Volume [cubic micrometers, um^3]
            if (typeof org.bioerosionExcavationVolume === "undefined") {
                org.bioerosionExcavationVolume = 0.0;
            }

            // Axial dental regeneration rate from plumula / tooth sac [0.03 - 0.09 /s]
            if (typeof org.toothRegenRate === "undefined") {
                org.toothRegenRate = 0.05;
            }

            // Cumulative scraped nutrition
            if (typeof org.assimilatedGrazerCarbon === "undefined") {
                org.assimilatedGrazerCarbon = 0.0;
            }

            // Telemetry indices
            if (typeof org.grazingLanternIndex === "undefined") {
                org.grazingLanternIndex = 0.0;
            }
            if (typeof org.bioerosionRateIndex === "undefined") {
                org.bioerosionRateIndex = 0.0;
            }
        }

        /**
         * Update individual echinoid Aristotle's Lantern extrusion, grazing rasping, and bioerosion.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {Array<Object>} organisms - Array of live organisms.
         */
        updateOrganism(org, dt, organisms) {
            if (!org || !org.alive) return;
            this.initOrganism(org);

            if (!org.hasAristotleLantern) {
                org.grazingLanternIndex = 0.0;
                org.bioerosionRateIndex = 0.0;
                return;
            }

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const orgSize = org.dna ? (org.dna.size || 8.0) : 8.0;

            // 1. Substrate & Benthic Horizon Proximity
            // Aristotle's Lantern acts when feeding along the benthic sediment, reef, or rock boundary (y >= 320 px)
            const isBenthicContact = (org.y >= 320.0);
            const isHungry = (org.energy && org.energy < 88.0);

            if (isBenthicContact && isHungry) {
                // Protractor muscles project lantern outward through peristome
                const targetExt = Math.min(4.5, (org.lanternProtractorForce || 0.85) * 2.8);
                org.lanternExtensionDistance = Math.min(targetExt, (org.lanternExtensionDistance || 0.0) + 0.18 * effDt * 60.0);

                // Rhythmic 5-jaw opening and snapping rasp cycle
                org.jawOpeningAngle = 0.20 + Math.abs(Math.sin((org.x * 0.05 + org.y * 0.05 + Date.now() * 0.003))) * 0.50;

                // 2. Severe Tooth Blunting Penalty Calculation
                // As tooth tip wear exceeds 0.35, the self-sharpening chisel angle flattens, imposing up to 70% scraping penalty
                if ((org.toothWearLevel || 0.0) > 0.35) {
                    const excessWear = (org.toothWearLevel - 0.35) / 0.65;
                    org.severeToothBluntingPenalty = Math.min(0.70, excessWear * 0.70);
                } else {
                    org.severeToothBluntingPenalty = Math.max(0.0, (org.severeToothBluntingPenalty || 0.0) - 0.05 * effDt * 60.0);
                }

                // 3. Substrate Microfracture Events on Lithified Rock
                // High protractor force against hard rock triggers acute tip fracturing
                const fractureProb = 0.035 * (org.lanternProtractorForce || 0.85) * (1.0 - (org.lanternTeethSharpness || 0.72) * 0.25) * effDt * 60.0;
                if (Math.random() < fractureProb) {
                    const acuteFractureWear = 0.04 + Math.random() * 0.06;
                    org.toothWearLevel = Math.min(1.0, (org.toothWearLevel || 0.0) + acuteFractureWear);
                    this.metrics.microfractureEvents++;
                }

                // 4. Algal Scraping & Nutrition Harvesting with Urchin Barren Modifier
                // In Urchin Barren state, macroalgae/kelp holdfasts are sheared off, leaving only sparse crustose coralline algae
                const barrenYieldMultiplier = this.urchinBarrenState ? 0.45 : 1.0;
                const effectiveSharpness = Math.max(0.18, (org.lanternTeethSharpness || 0.72) * (1.0 - (org.toothWearLevel || 0.0) * 0.40));
                const effectiveScrapeEfficiency = (org.algalScrapingEfficiency || 0.75) * (1.0 - (org.severeToothBluntingPenalty || 0.0));

                const scrapedNutrition = this.baseScrapingYield * effectiveScrapeEfficiency * effectiveSharpness * barrenYieldMultiplier * effDt * 60.0;

                if (org.energy && org.alive) {
                    org.energy = Math.min(100.0, org.energy + scrapedNutrition);
                }
                org.assimilatedGrazerCarbon = (org.assimilatedGrazerCarbon || 0.0) + scrapedNutrition;
                this.metrics.algalScrapingEvents++;
                this.metrics.cumulativeScrapedCarbon += scrapedNutrition;

                // Absorbing trace calcium ions from coralline crusts replenishes tooth sac reserves
                const mineralUptake = scrapedNutrition * 0.28;
                org.toothSacCalciteReserve = Math.min(100.0, (org.toothSacCalciteReserve || 80.0) + mineralUptake);

                // 5. Macro-Bioerosion Excavation Volume & Mineral Sediment
                // High-pressure calcite chisel teeth abrade the rock matrix, excavating volume in cubic micrometers (um^3)
                const excavationStrokeVolume = (org.bioerosionRate || 0.15) * (org.lanternProtractorForce || 0.85) * effectiveSharpness * 38.0 * effDt * 60.0;
                org.bioerosionExcavationVolume = (org.bioerosionExcavationVolume || 0.0) + excavationStrokeVolume;
                this.cumulativeExcavatedVolume += excavationStrokeVolume;
                this.metrics.cumulativeExcavatedVolume = this.cumulativeExcavatedVolume;

                const erodedMineral = (org.bioerosionRate || 0.15) * (org.lanternProtractorForce || 0.85) * effDt * 60.0;
                this.metrics.cumulativeBioerodedMineral += erodedMineral;
                this.metrics.bioerosionIncidents++;

                // Carbonate silt injection into water column
                this.calciteSiltSuspension = Math.min(100.0, this.calciteSiltSuspension + (excavationStrokeVolume * 0.002));

                // 6. Tooth Mechanical Tip Wear
                const wearInc = 0.0008 * (org.bioerosionRate || 0.15) * (org.lanternProtractorForce || 0.85) * effDt * 60.0;
                org.toothWearLevel = Math.min(1.0, (org.toothWearLevel || 0.0) + wearInc);

                // Occasional micro-abrasion turbidity plume
                if (Math.random() < 0.05 && typeof addRipple === "function") {
                    addRipple(org.x, org.y, 203, 213, 225);
                }
            } else {
                // Lantern retracts into peristome when roaming or satiated
                org.lanternExtensionDistance = Math.max(0.0, (org.lanternExtensionDistance || 0.0) - 0.22 * effDt * 60.0);
                org.jawOpeningAngle = Math.max(0.15, (org.jawOpeningAngle || 0.25) - 0.05 * effDt * 60.0);
            }

            // 7. Continuous Axial Tooth Regeneration from Dental Sac (Plumula)
            // Constrained by toothSacCalciteReserve: Depleted reserve halts axial elongation
            if ((org.toothWearLevel || 0.0) > 0.01 && org.energy && org.alive) {
                const reserveRatio = Math.max(0.0, Math.min(1.0, (org.toothSacCalciteReserve || 0.0) / 20.0));
                const regenPotency = (org.toothRegenRate || 0.05) * reserveRatio;
                const regenAmount = regenPotency * effDt * 60.0;

                org.toothWearLevel = Math.max(0.0, org.toothWearLevel - regenAmount);

                // Calcite reserve consumption
                const calciteConsumed = regenAmount * 0.65;
                org.toothSacCalciteReserve = Math.max(0.0, (org.toothSacCalciteReserve || 0.0) - calciteConsumed);

                // Continuous tooth growth metabolic maintenance tax
                const growthCost = 0.0035 * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - growthCost);
                this.metrics.dentalRenewalEvents++;
            }

            // Self-sharpening keeled chisel dynamic: hardness differential preserves sharp wedge
            org.lanternTeethSharpness = Math.max(0.35, Math.min(0.98,
                (0.92 - (org.toothWearLevel || 0.0) * 0.38 - (org.severeToothBluntingPenalty || 0.0) * 0.25)
            ));

            // 8. 87th Channel Formula (% GLI - Grazing Lantern Index)
            // Synthesizes protractor force, teeth sharpness, scraping efficiency, and jaw mechanical integrity
            const forceScore = Math.min(1.0, (org.lanternProtractorForce || 0.85) / 1.8);
            const sharpScore = Math.min(1.0, (org.lanternTeethSharpness || 0.72) / 0.90);
            const scrapeScore = (org.algalScrapingEfficiency || 0.75) * (1.0 - (org.severeToothBluntingPenalty || 0.0));
            const jawIntegrity = Math.min(1.0, (org.calcitePyramidJawsCount || 5) / 5.0);

            org.grazingLanternIndex = Math.max(0.0, Math.min(1.0,
                (forceScore * 0.30) + (sharpScore * 0.30) + (scrapeScore * 0.25) + (jawIntegrity * 0.15)
            ));

            // 9. 88th Channel Formula (% BER - Bioerosion Rate & Dental Renewal Index)
            // Comprehensive formulation:
            // - Substrate excavation & bioerosion factor (35% weight)
            // - Dental plumula calcite reserve & regeneration health (30% weight)
            // - Sharpness retention & fracture resistance (20% weight)
            // - Mineral sediment cycling contribution (15% weight)
            const erosionScore = Math.min(1.0, (org.bioerosionRate || 0.15) / 0.30);
            const reserveHealth = Math.min(1.0, (org.toothSacCalciteReserve || 0.0) / 80.0);
            const renewalScore = Math.min(1.0, (org.toothRegenRate || 0.05) / 0.08) * reserveHealth;
            const sharpnessScore = Math.max(0.0, 1.0 - (org.toothWearLevel || 0.0));
            const volumeContrib = Math.min(1.0, (org.bioerosionExcavationVolume || 0.0) / 300.0);

            org.bioerosionRateIndex = Math.max(0.0, Math.min(1.0,
                (erosionScore * 0.35) + (renewalScore * 0.30) + (sharpnessScore * 0.20) + (volumeContrib * 0.15)
            ));
        }

        /**
         * Update all organisms across the ecosystem and maintain macro-ecological states.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time delta in seconds.
         */
        updateAll(organisms, dt) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let lanternCount = 0;
            let activeGrazerCount = 0;
            let benthicGrazerCount = 0;
            let sumJaws = 0;
            let sumSharpness = 0.0;
            let sumProtractor = 0.0;
            let sumExtension = 0.0;
            let sumScraping = 0.0;
            let sumBioerosion = 0.0;
            let sumToothWear = 0.0;
            let sumToothSacReserve = 0.0;
            let sumMicrofractureRate = 0.0;
            let sumBluntingPenalty = 0.0;
            let sumGLI = 0.0;
            let sumBER = 0.0;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const len = organisms.length;

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, organisms);

                if (org.hasAristotleLantern) {
                    lanternCount++;
                    sumJaws += (org.calcitePyramidJawsCount || 0);
                    sumSharpness += (org.lanternTeethSharpness || 0.0);
                    sumProtractor += (org.lanternProtractorForce || 0.0);
                    sumExtension += (org.lanternExtensionDistance || 0.0);
                    sumScraping += (org.algalScrapingEfficiency || 0.0);
                    sumBioerosion += (org.bioerosionRate || 0.0);
                    sumToothWear += (org.toothWearLevel || 0.0);
                    sumToothSacReserve += (org.toothSacCalciteReserve || 0.0);
                    sumMicrofractureRate += (org.toothMicrofractureRate || 0.0);
                    sumBluntingPenalty += (org.severeToothBluntingPenalty || 0.0);
                    sumGLI += (org.grazingLanternIndex || 0.0);
                    sumBER += (org.bioerosionRateIndex || 0.0);

                    if (org.y >= 320.0) {
                        benthicGrazerCount++;
                    }
                    if ((org.lanternExtensionDistance || 0.0) > 0.5) {
                        activeGrazerCount++;
                    }
                }
            }

            // 10. Macro-Ecological Urchin Barren Trophic Shift Dynamics
            // High benthic grazer density triggers overgrazing collapse of kelp forests
            if (!this.urchinBarrenState) {
                if (benthicGrazerCount >= this.overgrazingThreshold && activeGrazerCount >= 6) {
                    this.urchinBarrenState = true;
                }
            } else {
                // System recovers when grazer density falls below recovery threshold
                if (benthicGrazerCount <= this.recoveryThreshold) {
                    this.urchinBarrenState = false;
                }
            }

            // 11. Silt Sedimentation & Reef Matrix Weakening
            // Silt gradually settles out of suspension
            this.calciteSiltSuspension = Math.max(0.0, this.calciteSiltSuspension * (1.0 - 0.012 * effDt * 60.0));
            this.reefMatrixWeakeningRatio = Math.min(1.0, this.cumulativeExcavatedVolume / this.benthicSubstrateCapacity);

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalLanternOrganisms = lanternCount;
            this.metrics.lanternPrevalence = liveCount > 0 ? (lanternCount / liveCount) : 0.0;
            this.metrics.activeGrazingOrganisms = activeGrazerCount;
            this.metrics.benthicGrazerDensity = benthicGrazerCount;
            this.metrics.meanJawsCount = lanternCount > 0 ? (sumJaws / lanternCount) : 0.0;
            this.metrics.meanTeethSharpness = lanternCount > 0 ? (sumSharpness / lanternCount) : 0.0;
            this.metrics.meanProtractorForce = lanternCount > 0 ? (sumProtractor / lanternCount) : 0.0;
            this.metrics.meanExtensionDistance = lanternCount > 0 ? (sumExtension / lanternCount) : 0.0;
            this.metrics.meanScrapingEfficiency = lanternCount > 0 ? (sumScraping / lanternCount) : 0.0;
            this.metrics.meanBioerosionRate = lanternCount > 0 ? (sumBioerosion / lanternCount) : 0.0;
            this.metrics.meanToothWear = lanternCount > 0 ? (sumToothWear / lanternCount) : 0.0;
            this.metrics.meanToothSacReserve = lanternCount > 0 ? (sumToothSacReserve / lanternCount) : 0.0;
            this.metrics.meanMicrofractureRate = lanternCount > 0 ? (sumMicrofractureRate / lanternCount) : 0.0;
            this.metrics.meanBluntingPenalty = lanternCount > 0 ? (sumBluntingPenalty / lanternCount) : 0.0;
            this.metrics.meanGrazingLanternIndex = lanternCount > 0 ? (sumGLI / lanternCount) : 0.0;
            this.metrics.meanBioerosionIndex = lanternCount > 0 ? (sumBER / lanternCount) : 0.0;
            this.metrics.urchinBarrenState = this.urchinBarrenState;
            this.metrics.calciteSiltSuspension = this.calciteSiltSuspension;
            this.metrics.reefMatrixWeakeningRatio = this.reefMatrixWeakeningRatio;
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
         * @returns {Object} Comprehensive Aristotle's Lantern metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EchinodermLanternManager;
    }
    if (typeof global !== "undefined") {
        global.EchinodermLanternManager = EchinodermLanternManager;
        global.echinodermLanternManager = new EchinodermLanternManager();
    }
})(typeof window !== "undefined" ? window : global);
