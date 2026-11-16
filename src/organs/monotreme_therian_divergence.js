// BioEcosystem - Early Monotremata & Therian Evolutionary Divergence
// Module: src/organs/monotreme_therian_divergence.js
// Version: 8.82.0 (Hour 602 - System Agent: Cloacal Retention, Venom Spurs, Marsupium Pouch & Choriovitelline Placenta Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MonotremeTherianDivergenceManager
     * High-fidelity biological simulation of the Mesozoic Mammalian Tripartite Radiation:
     * - Monotremata (Ornithorhynchidae & Tachyglossidae lineage):
     *   Retention of ancestral reptilian cloacal morphology (single digestive, excretory, reproductive outlet),
     *   leathery egg oviparity, absence of teats (areolar cutaneous sweat milk seepage),
     *   male crural venom ankle spurs (cruralVenomSpurEfficacy: 0.65 - 0.95),
     *   and electroreceptive bill sensory arrays detecting submerged prey micro-voltages (electroreceptiveBillAcuity: 0.70 - 0.98).
     * - Metatheria (Early Marsupials - Sinodelphys szalayi lineage):
     *   Abbreviation of intra-uterine gestation (8-14 days) avoiding maternal immunosuppressive fatigue,
     *   expulsion of embryonic altricial neonates with precociously ossified forelimbs crawling along maternal hair paths,
     *   entry into abdominal marsupium pouch (marsupiumPouchIntegrity: 0.65 - 0.98),
     *   and firm mucosal latching onto maternal nipples (nippleLatchingEfficiency: 0.70 - 0.98).
     * - Eutheria (Early Placentals - Eomaia scansoria lineage):
     *   Prolonged intra-uterine retention of the embryo via blastocyst trophoblast invasion,
     *   formation of an efficient choriovitelline yolk-sac placenta interface (choriovitellinePlacentaDensity: 0.65 - 0.98),
     *   direct maternal-fetal hemotrophic nutrient/gas exchange (trophoblastNutrientFlux: 0.70 - 0.98),
     *   and birth of anatomically mature, highly encephalized precocial offspring.
     * - 123rd Telemetry Channel (% MPI - Marsupium Pouch Index & Altricial Neonate Nipple-Latching) mathematical core.
     * - 124th Telemetry Channel (% CPI - Choriovitelline Placenta Index & Trophoblast Exchange) mathematical core.
     */
    class MonotremeTherianDivergenceManager {
        constructor() {
            this.baseCloacalMorphology = 0.82;            // [0.70 - 0.98]
            this.baseCruralVenomEfficacy = 0.78;          // [0.65 - 0.95]
            this.baseElectroreceptiveAcuity = 0.84;       // [0.70 - 0.98]
            this.baseMarsupiumPouchIntegrity = 0.85;      // [0.65 - 0.98]
            this.baseAltricialClimbingRate = 0.82;        // [0.65 - 0.95]
            this.baseNippleLatchingEfficiency = 0.86;     // [0.70 - 0.98]
            this.baseChoriovitellineDensity = 0.85;       // [0.65 - 0.98]
            this.baseTrophoblastNutrientFlux = 0.88;      // [0.70 - 0.98]
            this.basePrecocialMaturity = 0.84;            // [0.70 - 0.95]

            this.metrics = {
                totalLiveCells: 0,
                totalMonotremeOrganisms: 0,
                totalMetatherianOrganisms: 0,
                totalEutherianOrganisms: 0,
                totalTherianOrganisms: 0,
                therianPrevalence: 0.0,
                meanMarsupiumPouchIndex: 0.0,             // 123rd Channel % MPI
                meanChoriovitellinePlacentaIndex: 0.0,     // 124th Channel % CPI
                meanMarsupiumPouchIntegrity: 0.85,
                meanAltricialClimbingRate: 0.82,
                meanNippleLatchingEfficiency: 0.86,
                meanChoriovitellineDensity: 0.85,
                meanTrophoblastNutrientFlux: 0.88,
                meanPrecocialMaturity: 0.84,
                meanElectroreceptiveAcuity: 0.84,
                venomSpurStrikeEvents: 0,
                electroreceptionDetections: 0,
                marsupiumClimbingEvents: 0,
                placentalNutrientTransfers: 0,
                cumulativeTherianBiomass: 0.0
            };
        }

        /**
         * Initialize Monotreme, Metatherian, and Eutherian divergence traits on organism.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            const isMammalianDescendant = org.isMammaliaform ||
                (org.mammaliaformEarIndex || 0) > 40.0 ||
                (org.lactationIndex || 0) > 35.0 ||
                (org.secondaryPalateIndex || 0) > 50.0;

            if (!isMammalianDescendant && Math.random() >= 0.40) {
                org.subclassType = "NON_MAMMALIAN";
                org.isMonotreme = false;
                org.isMetatherian = false;
                org.isEutherian = false;
                org.marsupiumPouchIndex = 0.0;
                org.choriovitellinePlacentaIndex = 0.0;
                return;
            }

            // Distribute mammalian subclasses across three divergent lineages
            const branchRoll = Math.random();
            if (branchRoll < 0.25) {
                // Monotremata: Oviparous, cloacal, venom spurs, electroreceptive bill
                org.subclassType = "MONOTREMATA";
                org.isMonotreme = true;
                org.isMetatherian = false;
                org.isEutherian = false;
            } else if (branchRoll < 0.62) {
                // Metatheria: Marsupium pouch, altricial neonates, nipple latching
                org.subclassType = "METATHERIA";
                org.isMonotreme = false;
                org.isMetatherian = true;
                org.isEutherian = false;
            } else {
                // Eutheria: Choriovitelline placenta, trophoblast invasion, precocial young
                org.subclassType = "EUTHERIA";
                org.isMonotreme = false;
                org.isMetatherian = false;
                org.isEutherian = true;
            }

            // 1. Monotremata Traits
            org.cloacalMorphologyDegree = 0.72 + Math.random() * 0.24;        // 0.72 - 0.96
            org.cruralVenomSpurEfficacy = 0.68 + Math.random() * 0.25;        // 0.68 - 0.93 (males)
            org.electroreceptiveBillAcuity = 0.72 + Math.random() * 0.24;     // 0.72 - 0.96
            org.areolarMilkSeepageFlux = 0.65 + Math.random() * 0.25;         // 0.65 - 0.90
            org.isMonotremeOviparous = true;
            org.venomSpurCooldown = 0.0;

            // 2. Metatheria (Marsupial) Traits
            org.marsupiumPouchIntegrity = 0.70 + Math.random() * 0.26;        // 0.70 - 0.96
            org.altricialNeonateClimbingRate = 0.68 + Math.random() * 0.26;   // 0.68 - 0.94
            org.nippleLatchingEfficiency = 0.72 + Math.random() * 0.24;       // 0.72 - 0.96
            org.maternalGestationEnergySaving = 0.70 + Math.random() * 0.22;  // 0.70 - 0.92
            org.pouchGestationTimer = 0.0;
            org.hasLatchingNeonates = false;

            // 3. Eutheria (Placental) Traits
            org.choriovitellinePlacentaDensity = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
            org.trophoblastAdhesionStrength = 0.74 + Math.random() * 0.22;    // 0.74 - 0.96
            org.trophoblastNutrientFlux = 0.75 + Math.random() * 0.22;        // 0.75 - 0.97
            org.precocialNeonateMaturity = 0.72 + Math.random() * 0.23;       // 0.72 - 0.95
            org.placentalVascularization = 0.70 + Math.random() * 0.25;       // 0.70 - 0.95
            org.placentalGestationTimer = 0.0;

            // Telemetry Indices & Regimes
            org.marsupiumPouchIndex = 0.0;            // 123rd Channel % MPI
            org.choriovitellinePlacentaIndex = 0.0;    // 124th Channel % CPI
            org.marsupiumPouchState = "CLOACAL_OVIPARITY_ABSENCE";
            org.choriovitellinePlacentaState = "APLACENTAL_YOLK_SAC_ONLY";
        }

        /**
         * Update Monotreme/Therian physiological and developmental mechanics.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateOrganism(org, dt, width, height) {
            if (!org || !org.alive) return;

            if (typeof org.subclassType === "undefined") {
                this.initOrganism(org);
            }

            // Adaptive promotion from general Mammaliaforms
            if (org.subclassType === "NON_MAMMALIAN" && org.isMammaliaform) {
                this.initOrganism(org);
            }

            // 1. Monotremata Biomechanics
            if (org.isMonotreme) {
                if (org.venomSpurCooldown > 0) {
                    org.venomSpurCooldown = Math.max(0, org.venomSpurCooldown - dt);
                }

                // Crural venom spur defense against attacking predators
                if (org.underAttack && org.venomSpurCooldown <= 0) {
                    const venomForce = (org.cruralVenomSpurEfficacy || 0.78);
                    if (Math.random() < 0.15 * venomForce) {
                        this.metrics.venomSpurStrikeEvents++;
                        org.venomSpurCooldown = 4.0;
                        org.energy = Math.min((org.maxEnergy || 100), (org.energy || 50) + 1.2);
                        if (org.attacker) {
                            org.attacker.isPoisoned = true;
                            org.attacker.speed = Math.max(0.2, (org.attacker.speed || 1.0) * 0.65);
                        }
                    }
                }

                // Electroreceptive bill scanning for submerged or hidden invertebrates
                const billAcuity = (org.electroreceptiveBillAcuity || 0.84);
                if (Math.random() < 0.04 * billAcuity) {
                    this.metrics.electroreceptionDetections++;
                    org.searchRadius = Math.min(180, (org.searchRadius || 80) + 15 * billAcuity);
                }

                org.marsupiumPouchIndex = 0.0;
                org.choriovitellinePlacentaIndex = 0.0;
                org.marsupiumPouchState = "CLOACAL_OVIPARITY_ABSENCE";
                org.choriovitellinePlacentaState = "APLACENTAL_YOLK_SAC_ONLY";
                return;
            }

            // 2. Metatheria (Marsupium Pouch & Altricial Neonate Nipple-Latching)
            if (org.isMetatherian) {
                // Short gestation and pouch entry
                if (org.isFemaleParent && (org.energy || 50) > 42) {
                    if (Math.random() < 0.035 * (org.altricialNeonateClimbingRate || 0.82)) {
                        this.metrics.marsupiumClimbingEvents++;
                        org.hasLatchingNeonates = true;
                        org.pouchGestationTimer = 8.0; // 8 seconds of pouch nursing
                    }
                }

                if (org.pouchGestationTimer > 0) {
                    org.pouchGestationTimer = Math.max(0, org.pouchGestationTimer - dt);
                    if (org.pouchGestationTimer <= 0) {
                        org.hasLatchingNeonates = false;
                        // Successfully reared pouch offspring elevates population fitness
                        org.offspringSurvivalBonus = (org.offspringSurvivalBonus || 0) + 1;
                    }
                }

                // 123rd Channel: % MPI Formulation
                const wPouch = (org.marsupiumPouchIntegrity || 0.85) * 0.30;
                const wClimb = (org.altricialNeonateClimbingRate || 0.82) * 0.35;
                const wLatch = (org.nippleLatchingEfficiency || 0.86) * 0.20;
                const wSave = (org.maternalGestationEnergySaving || 0.80) * 0.15;
                const rawMPI = (wPouch + wClimb + wLatch + wSave) * 100.0;
                org.marsupiumPouchIndex = Math.max(0.0, Math.min(100.0, rawMPI));

                // Classify 123rd Channel Regime
                if (org.marsupiumPouchIndex < 30.0) {
                    org.marsupiumPouchState = "CLOACAL_OVIPARITY_ABSENCE";
                } else if (org.marsupiumPouchIndex < 60.0) {
                    org.marsupiumPouchState = "INCIPIENT_ABDOMINAL_CREASE";
                } else if (org.marsupiumPouchIndex < 85.0) {
                    org.marsupiumPouchState = "TRUE_MARSUPIUM_POUCH";
                } else {
                    org.marsupiumPouchState = "SPECIALIZED_NEONATE_LATCHING";
                }

                org.choriovitellinePlacentaIndex = 0.0;
                org.choriovitellinePlacentaState = "APLACENTAL_YOLK_SAC_ONLY";
                return;
            }

            // 3. Eutheria (Choriovitelline Placentation & Fetal Trophoblast Transfer)
            if (org.isEutherian) {
                // Prolonged uterine retention with hemotrophic nutrition
                if (org.isFemaleParent && (org.energy || 50) > 40) {
                    const nutrientFlux = (org.trophoblastNutrientFlux || 0.88) * (org.trophoblastAdhesionStrength || 0.85);
                    if (Math.random() < 0.05 * nutrientFlux) {
                        this.metrics.placentalNutrientTransfers++;
                        // Direct uterine nutrient absorption
                        org.placentalGestationTimer = (org.placentalGestationTimer || 0) + dt;
                        if (org.placentalGestationTimer >= 6.0) {
                            org.placentalGestationTimer = 0.0;
                            org.offspringEncephalizationBonus = (org.offspringEncephalizationBonus || 0) + 1;
                        }
                    }
                }

                // 124th Channel: % CPI Formulation
                const wAdhesion = (org.trophoblastAdhesionStrength || 0.85) * 0.35;
                const wFlux = (org.trophoblastNutrientFlux || 0.88) * 0.30;
                const wMaturity = (org.precocialNeonateMaturity || 0.84) * 0.20;
                const wVasc = (org.placentalVascularization || 0.82) * 0.15;
                const rawCPI = (wAdhesion + wFlux + wMaturity + wVasc) * 100.0;
                org.choriovitellinePlacentaIndex = Math.max(0.0, Math.min(100.0, rawCPI));

                // Classify 124th Channel Regime
                if (org.choriovitellinePlacentaIndex < 30.0) {
                    org.choriovitellinePlacentaState = "APLACENTAL_YOLK_SAC_ONLY";
                } else if (org.choriovitellinePlacentaIndex < 60.0) {
                    org.choriovitellinePlacentaState = "INCIPIENT_TROPHOBLAST_ADHESION";
                } else if (org.choriovitellinePlacentaIndex < 85.0) {
                    org.choriovitellinePlacentaState = "CHORIOVITELLINE_PLACENTATION";
                } else {
                    org.choriovitellinePlacentaState = "CHORIOALLANTOIC_ADVANCED_TRANSFER";
                }

                org.marsupiumPouchIndex = 0.0;
                org.marsupiumPouchState = "CLOACAL_OVIPARITY_ABSENCE";
            }
        }

        /**
         * Update all organisms and recalculate collective Monotreme, Metatherian, and Eutherian metrics.
         * @param {Array<Object>} organisms - Array of simulation entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World boundary width.
         * @param {number} height - World boundary height.
         */
        updateAll(organisms, dt, width, height) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let monotremeCount = 0;
            let metatherianCount = 0;
            let eutherianCount = 0;

            let sumMPI = 0.0;
            let sumCPI = 0.0;
            let sumPouchInteg = 0.0;
            let sumClimb = 0.0;
            let sumLatch = 0.0;
            let sumPlacentaDense = 0.0;
            let sumTrophoFlux = 0.0;
            let sumPrecocial = 0.0;
            let sumElectro = 0.0;
            let totalBiomass = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height);

                if (org.isMonotreme) {
                    monotremeCount++;
                    sumElectro += org.electroreceptiveBillAcuity || 0.84;
                    totalBiomass += (org.mass || 1.0) * 1.20;
                } else if (org.isMetatherian) {
                    metatherianCount++;
                    sumMPI += org.marsupiumPouchIndex || 0.0;
                    sumPouchInteg += org.marsupiumPouchIntegrity || 0.85;
                    sumClimb += org.altricialNeonateClimbingRate || 0.82;
                    sumLatch += org.nippleLatchingEfficiency || 0.86;
                    totalBiomass += (org.mass || 1.0) * 1.35;
                } else if (org.isEutherian) {
                    eutherianCount++;
                    sumCPI += org.choriovitellinePlacentaIndex || 0.0;
                    sumPlacentaDense += org.choriovitellinePlacentaDensity || 0.85;
                    sumTrophoFlux += org.trophoblastNutrientFlux || 0.88;
                    sumPrecocial += org.precocialNeonateMaturity || 0.84;
                    totalBiomass += (org.mass || 1.0) * 1.40;
                }
            }

            const totalTherians = metatherianCount + eutherianCount;

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalMonotremeOrganisms = monotremeCount;
            this.metrics.totalMetatherianOrganisms = metatherianCount;
            this.metrics.totalEutherianOrganisms = eutherianCount;
            this.metrics.totalTherianOrganisms = totalTherians;
            this.metrics.therianPrevalence = liveCount > 0 ? (totalTherians / liveCount) * 100.0 : 0.0;

            this.metrics.meanMarsupiumPouchIndex = metatherianCount > 0 ? (sumMPI / metatherianCount) : 0.0;
            this.metrics.meanChoriovitellinePlacentaIndex = eutherianCount > 0 ? (sumCPI / eutherianCount) : 0.0;
            this.metrics.meanMarsupiumPouchIntegrity = metatherianCount > 0 ? (sumPouchInteg / metatherianCount) : 0.85;
            this.metrics.meanAltricialClimbingRate = metatherianCount > 0 ? (sumClimb / metatherianCount) : 0.82;
            this.metrics.meanNippleLatchingEfficiency = metatherianCount > 0 ? (sumLatch / metatherianCount) : 0.86;
            this.metrics.meanChoriovitellineDensity = eutherianCount > 0 ? (sumPlacentaDense / eutherianCount) : 0.85;
            this.metrics.meanTrophoblastNutrientFlux = eutherianCount > 0 ? (sumTrophoFlux / eutherianCount) : 0.88;
            this.metrics.meanPrecocialMaturity = eutherianCount > 0 ? (sumPrecocial / eutherianCount) : 0.84;
            this.metrics.meanElectroreceptiveAcuity = monotremeCount > 0 ? (sumElectro / monotremeCount) : 0.84;
            this.metrics.cumulativeTherianBiomass = totalBiomass;
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
         * @returns {Object} Comprehensive Monotreme/Therian metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MonotremeTherianDivergenceManager;
    }
    if (typeof global !== "undefined") {
        global.MonotremeTherianDivergenceManager = MonotremeTherianDivergenceManager;
        global.monotremeTherianDivergenceManager = new MonotremeTherianDivergenceManager();
    }
})(typeof window !== "undefined" ? window : global);
