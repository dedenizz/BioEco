// BioEcosystem - Pleistocene Early Homo Radiation & Pyrotechnic Cooking Hypothesis
// Module: src/organs/homo_pyrotechnics.js
// Version: 9.66.0 (Hour 686 - System Agent: Acheulean Biface Handaxe, Thermal Pyrotechnic Cooking, Eccrine Perspiration & 151st/152nd Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HomoPyrotechnicsManager
     * High-fidelity biological simulation of Early Homo (Homo erectus / Homo ergaster):
     * - Evolutionary Stage & Lineages:
     *   The Early Pleistocene emergence of the genus Homo marked by tool standardization and pyrotechnology:
     *   1. Acheulean Bifacial Handaxe Mental Template (Homo erectus / ergaster):
     *      Cognitive pre-determination of teardrop / amygdaloid bifacial symmetry (acheuleanBifacialFlaking: 0.75 - 0.98),
     *      flaked through 50-70 controlled strikes using soft percussors (antler/bone billets) to produce a continuous, razor edge.
     *      3.5x acceleration in butchery processing velocity (butcheryProcessingVelocity: 1.8 - 3.8x), slicing through thick
     *      pachyderm hide, disarticulating joints, and severing tendons (bifacialCarcassButcheryYield: 0.75 - 0.98).
     *   2. Controlled Fire & Thermal Pyrotechnic Cooking (Cooking Hypothesis / Wrangham):
     *      Controlled hearth fire nodes denaturing collagen, breaking down tough plant starches, and rendering animal proteins
     *      (pyrotechnicCookingEfficiency: 0.72 - 0.96).
     *      50% reduction in metabolic gastrointestinal digestive effort (digestiveEnergySparingRate: 0.70 - 0.95), unlocking
     *      caloric surplus required to fuel an expanding neocortex (encephalizationMetabolicSurplus: 0.75 - 0.98).
     *   3. Eccrine Sweat Glands & Evaporative Thermoregulation:
     *      Loss of dense body fur coupled with 2-5 million eccrine sweat glands (eccrinePerspirationRate: 0.75 - 0.98),
     *      enabling evaporative cooling under intense 35-42 deg C midday equatorial solar radiation.
     *      Preservation of core brain temperature at 37.0 deg C (thermalHomeostasisTolerance: 0.75 - 0.98).
     *   4. Midday Persistence Hunting & Hyperthermic Exhaustion Collapse:
     *      Tireless pacing locomotion via elongated lower limbs, developed nuchal ligament, and enlarged Achilles tendon
     *      (persistenceEnduranceStriding: 0.72 - 0.96).
     *      Chasing furred, panting ungulates during the midday heat trap, driving prey into fatal hyperthermic collapse
     *      (preyHyperthermicCollapseRate: 0.70 - 0.95).
     * - Telemetry Channels:
     *   151st Channel: Acheulean Biface Index (% ABI)
     *   152nd Channel: Thermal Cooking & Digestion Index (% TCI)
     */
    class HomoPyrotechnicsManager {
        /**
         * Initialize Homo Pyrotechnics & Acheulean Tool Manager.
         */
        constructor() {
            this.metrics = {
                totalHomo: 0,
                activeBifaceUsers: 0,
                activeHearthCooks: 0,
                activePersistenceHunters: 0,
                meanBifacialFlaking: 0.86,
                meanButcheryYield: 0.85,
                meanButcheryVelocity: 2.80,
                meanCookingEfficiency: 0.84,
                meanDigestiveSparing: 0.83,
                meanPerspirationRate: 0.86,
                meanThermalTolerance: 0.87,
                meanPersistenceStriding: 0.84,
                meanHyperthermicCollapse: 0.83,
                meanAcheuleanIndex: 0.0,
                meanCookingIndex: 0.0,
                bifacialButcheryEvents: 0,
                thermalCookingEvents: 0,
                persistenceHuntEvents: 0,
                cookedCaloricYield: 0.0,
                cumulativeHomoBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Homo Pyrotechnic and Acheulean traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Check eligibility:
            // Advanced hominins with bipedal posture or primates evolving into Homo
            const isHominin = org.isHominin || (org.isPrimate && org.generation >= 22) ||
                              (org.diet === "omnivore" && org.mass >= 12.0 && org.mass <= 45.0 && org.generation >= 25);

            if (!isHominin) return;

            if (org.isHomo === undefined) {
                // Probabilistic activation for Homo lineage
                const activates = Math.random() < 0.45 || org.isHominin;
                if (!activates) return;

                org.isHomo = true;

                // 1. Acheulean Bifacial Handaxe Attributes
                org.acheuleanBifacialFlaking = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.bifacialCarcassButcheryYield = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.butcheryProcessingVelocity = 1.8 + Math.random() * 2.0; // 1.8 - 3.8x
                org.hasAcheuleanBiface = Math.random() < 0.65;
                org.isButchering = false;

                // 2. Controlled Fire & Thermal Pyrotechnic Cooking Attributes
                org.pyrotechnicCookingEfficiency = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.digestiveEnergySparingRate = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.encephalizationMetabolicSurplus = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.isCooking = false;
                org.cookingCooldown = 0;

                // 3. Eccrine Perspiration & Thermal Tolerance Attributes
                org.eccrinePerspirationRate = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.thermalHomeostasisTolerance = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.coreTemperature = 37.0; // Stable mammalian optimum
                org.isPerspiring = false;

                // 4. Persistence Hunting & Midday Striding Attributes
                org.persistenceEnduranceStriding = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.preyHyperthermicCollapseRate = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.isPersistenceHunting = false;
                org.persistenceHuntTimer = 0.0;

                // Telemetry Channel Indices
                org.acheuleanBifaceIndex = 0.0;
                org.thermalCookingIndex = 0.0;
            }
        }

        /**
         * Update Homo butchery, pyrotechnic cooking, evaporative cooling, and persistence hunting.
         * @param {Object} org - Organism instance.
         * @param {Array} allOrgs - Population pool.
         * @param {Object} env - Environmental state.
         * @param {number} dt - Time delta.
         */
        update(org, allOrgs, env, dt) {
            if (!org || !org.alive || !org.isHomo) return;

            const timeStep = dt || 1.0;

            // 1. Acheulean Bifacial Carcass Butchery
            // Search for available carcass or harvestable meat within interaction radius
            org.isButchering = false;
            let targetCarcass = null;
            let minCarcassDist = 80.0;

            if (allOrgs && allOrgs.length > 0) {
                for (let i = 0; i < allOrgs.length; i++) {
                    const other = allOrgs[i];
                    if (!other || other === org) continue;

                    const isCarcass = (!other.alive) || (other.isDead) || (other.isMegaherbivore && other.energy < 15.0);
                    if (!isCarcass) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minCarcassDist) {
                        minCarcassDist = dist;
                        targetCarcass = other;
                    }
                }
            }

            if (targetCarcass && org.hasAcheuleanBiface) {
                org.isButchering = true;
                this.metrics.bifacialButcheryEvents++;

                // Slicing yield enhanced by bifacial edge geometry
                const butcheredMeat = org.bifacialCarcassButcheryYield * org.butcheryProcessingVelocity * 0.20 * timeStep;
                org.energy = Math.min((org.maxEnergy || 120.0), org.energy + butcheredMeat);
            }

            // 2. Controlled Fire & Thermal Pyrotechnic Cooking
            // If butchered meat or low energy, initiate cooking hearth processing
            if (org.cookingCooldown > 0) {
                org.cookingCooldown -= timeStep;
            }

            org.isCooking = false;
            if (org.energy < (org.maxEnergy || 100.0) * 0.90 && org.cookingCooldown <= 0) {
                org.isCooking = true;
                this.metrics.thermalCookingEvents++;

                // Thermal cooking spares 50% gastrointestinal energy and unlocks glucose/lipids
                const thermalCaloricBonus = org.pyrotechnicCookingEfficiency * org.digestiveEnergySparingRate * 0.32 * timeStep;
                org.energy = Math.min((org.maxEnergy || 120.0), org.energy + thermalCaloricBonus);
                this.metrics.cookedCaloricYield += thermalCaloricBonus;

                org.cookingCooldown = 45.0; // Ticks between cooking sessions
            }

            // 3. Eccrine Perspiration & Thermal Homeostasis
            const currentSpeed = Math.hypot(org.vx || 0, org.vy || 0);
            org.isPerspiring = currentSpeed > 1.2;

            if (org.isPerspiring) {
                // Sweating sheds metabolic heat load through evaporation
                const coolingPower = org.eccrinePerspirationRate * org.thermalHomeostasisTolerance;
                org.coreTemperature = 37.0 + (0.5 * (1.0 - coolingPower));
            } else {
                org.coreTemperature = 37.0;
            }

            // 4. Midday Persistence Hunting
            // Track furred cursorial ungulates or herbivores over long distances
            org.isPersistenceHunting = false;
            let pursuitTarget = null;
            let minPreyDist = 160.0;

            if (allOrgs && allOrgs.length > 0) {
                for (let i = 0; i < allOrgs.length; i++) {
                    const other = allOrgs[i];
                    if (!other || !other.alive || other === org) continue;

                    const isFurredHerbivore = other.isCursorialUngulate || other.isHerbivore;
                    if (!isFurredHerbivore) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minPreyDist) {
                        minPreyDist = dist;
                        pursuitTarget = other;
                    }
                }
            }

            if (pursuitTarget && currentSpeed > 0.8) {
                org.isPersistenceHunting = true;
                this.metrics.persistenceHuntEvents++;

                // Force prey to run continuously without panting rest
                if (minPreyDist < 75.0 && Math.random() < org.preyHyperthermicCollapseRate * 0.05) {
                    // Prey enters hyperthermic exhaustion collapse
                    pursuitTarget.energy = Math.max(0.0, pursuitTarget.energy - 12.0 * timeStep);
                    if (pursuitTarget.energy <= 0.0) {
                        pursuitTarget.alive = false;
                        pursuitTarget.isDead = true;
                    }
                }
            }

            // 5. Compute 151st & 152nd Telemetry Channel Metrics
            // % ABI (Acheulean Biface Index):
            // Flaking * 0.35 + ButcheryYield * 0.30 + ((Velocity - 1.0)/2.8) * 0.20 + PrecisionGrip * 0.15
            const normVelocity = Math.max(0.0, Math.min(1.0, (org.butcheryProcessingVelocity - 1.0) / 2.8));
            const rawABI = (org.acheuleanBifacialFlaking * 0.35 +
                            org.bifacialCarcassButcheryYield * 0.30 +
                            normVelocity * 0.20 +
                            (org.opposableThumbPrecisionGrip || 0.85) * 0.15) * 100.0;
            org.acheuleanBifaceIndex = Math.min(100.0, Math.max(0.0, rawABI));

            // % TCI (Thermal Cooking & Digestion Index):
            // CookingEff * 0.35 + DigestiveSparing * 0.30 + Perspiration * 0.20 + Persistence * 0.15
            const rawTCI = (org.pyrotechnicCookingEfficiency * 0.35 +
                            org.digestiveEnergySparingRate * 0.30 +
                            org.eccrinePerspirationRate * 0.20 +
                            org.persistenceEnduranceStriding * 0.15) * 100.0;
            org.thermalCookingIndex = Math.min(100.0, Math.max(0.0, rawTCI));
        }

        /**
         * Process population-level step and synthesize aggregate metrics.
         * @param {Array} organisms - All current simulation entities.
         * @param {Object} env - Environmental context.
         * @param {number} dt - Time delta.
         */
        step(organisms, env, dt) {
            if (!organisms) return;

            let count = 0;
            let activeBiface = 0;
            let activeCooks = 0;
            let activeHunters = 0;

            let sumFlaking = 0;
            let sumButchery = 0;
            let sumVelocity = 0;
            let sumCooking = 0;
            let sumSparing = 0;
            let sumPerspiration = 0;
            let sumTolerance = 0;
            let sumStriding = 0;
            let sumCollapse = 0;
            let sumABI = 0;
            let sumTCI = 0;
            let sumBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;

                this.initOrganism(o);

                if (o.isHomo) {
                    this.update(o, organisms, env, dt);

                    count++;
                    if (o.isButchering) activeBiface++;
                    if (o.isCooking) activeCooks++;
                    if (o.isPersistenceHunting) activeHunters++;

                    sumFlaking += o.acheuleanBifacialFlaking || 0.86;
                    sumButchery += o.bifacialCarcassButcheryYield || 0.85;
                    sumVelocity += o.butcheryProcessingVelocity || 2.80;
                    sumCooking += o.pyrotechnicCookingEfficiency || 0.84;
                    sumSparing += o.digestiveEnergySparingRate || 0.83;
                    sumPerspiration += o.eccrinePerspirationRate || 0.86;
                    sumTolerance += o.thermalHomeostasisTolerance || 0.87;
                    sumStriding += o.persistenceEnduranceStriding || 0.84;
                    sumCollapse += o.preyHyperthermicCollapseRate || 0.83;
                    sumABI += o.acheuleanBifaceIndex || 0.0;
                    sumTCI += o.thermalCookingIndex || 0.0;
                    sumBiomass += (o.mass || 15.0);
                }
            }

            this.metrics.totalHomo = count;
            this.metrics.activeBifaceUsers = activeBiface;
            this.metrics.activeHearthCooks = activeCooks;
            this.metrics.activePersistenceHunters = activeHunters;

            if (count > 0) {
                this.metrics.meanBifacialFlaking = parseFloat((sumFlaking / count).toFixed(2));
                this.metrics.meanButcheryYield = parseFloat((sumButchery / count).toFixed(2));
                this.metrics.meanButcheryVelocity = parseFloat((sumVelocity / count).toFixed(2));
                this.metrics.meanCookingEfficiency = parseFloat((sumCooking / count).toFixed(2));
                this.metrics.meanDigestiveSparing = parseFloat((sumSparing / count).toFixed(2));
                this.metrics.meanPerspirationRate = parseFloat((sumPerspiration / count).toFixed(2));
                this.metrics.meanThermalTolerance = parseFloat((sumTolerance / count).toFixed(2));
                this.metrics.meanPersistenceStriding = parseFloat((sumStriding / count).toFixed(2));
                this.metrics.meanHyperthermicCollapse = parseFloat((sumCollapse / count).toFixed(2));
                this.metrics.meanAcheuleanIndex = parseFloat((sumABI / count).toFixed(1));
                this.metrics.meanCookingIndex = parseFloat((sumTCI / count).toFixed(1));
                this.metrics.cumulativeHomoBiomass = parseFloat(sumBiomass.toFixed(2));
            } else {
                this.metrics.meanAcheuleanIndex = 0.0;
                this.metrics.meanCookingIndex = 0.0;
            }
        }

        /**
         * Get synthesized population-level metrics.
         * @returns {Object} Metric summary.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Get 4 biological regimes for 151st Channel (% ABI).
         * @param {number} abiValue - Acheulean Biface Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        getAcheuleanRegime(abiValue) {
            const v = Math.max(0.0, Math.min(100.0, abiValue || 0.0));
            if (v <= 25.0) {
                return { name: "CRUDE_OLDOWAN_FLAKER", desc: "Crude Oldowan Flaker & Pebble Splitter", class: "abi-crude" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_PROTO_BIFACE", desc: "Incipient Proto-Biface & Edge Trimmer", class: "abi-proto" };
            } else if (v <= 75.0) {
                return { name: "SYMMETRIC_ACHEULEAN_BUTCHER", desc: "Symmetric Acheulean Butcher & Handaxe Master", class: "abi-symmetric" };
            } else {
                return { name: "APEX_LITHIC_BIFACE_CRAFTSMAN", desc: "Apex Lithic Biface Craftsman & Megafauna Carver", class: "abi-apex" };
            }
        }

        /**
         * Get 4 biological regimes for 152nd Channel (% TCI).
         * @param {number} tciValue - Thermal Cooking Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        getCookingRegime(tciValue) {
            const v = Math.max(0.0, Math.min(100.0, tciValue || 0.0));
            if (v <= 25.0) {
                return { name: "RAW_COLD_SCAVENGER", desc: "Raw Cold Scavenger & High Gut Cost", class: "tci-raw" };
            } else if (v <= 50.0) {
                return { name: "OPPORTUNISTIC_EMBER_WARMER", desc: "Opportunistic Ember Warmer & Hearth Forager", class: "tci-ember" };
            } else if (v <= 75.0) {
                return { name: "PYROTECHNIC_THERMAL_COOK", desc: "Pyrotechnic Thermal Cook & Caloric Unlocker", class: "tci-cook" };
            } else {
                return { name: "APEX_METABOLIC_FIRE_MASTER", desc: "Apex Metabolic Fire Master & Encephalized Titan", class: "tci-master" };
            }
        }
    }

    // Export module globally
    global.HomoPyrotechnicsManager = HomoPyrotechnicsManager;
    global.homoPyrotechnicsManager = new HomoPyrotechnicsManager();

})(typeof window !== "undefined" ? window : global);
