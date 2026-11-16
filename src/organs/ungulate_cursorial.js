// BioEcosystem - Miocene-Pliocene Cursorial Ungulate & Hypsodonty Evolution
// Module: src/organs/ungulate_cursorial.js
// Version: 9.54.0 (Hour 674 - System Agent: Hypsodont Enamel Wear, C4 Silica Phytolith Grinding, Monodactyl Spring Locomotion & 147th/148th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UngulateCursorialManager
     * High-fidelity biological simulation of Miocene-Pliocene Cursorial Ungulates (Equidae & Bovidae / Antilocapridae):
     * - Evolutionary Stage & Lineages:
     *   The Miocene-Pliocene aridification and global expansion of abrasive C4 grasslands triggered an evolutionary arms race
     *   between cursorial herbivores and apex predators (Machairodontinae & Amphicyonidae).
     *   1. Hypsodont Molar Dentition & Silica Phytolith Resistance (Merychippus, Hipparion, Dinohippus):
     *      Deeply rooted, high-crowned cheek teeth (hypsodontCrownHeight: 40 - 75 mm eq) recessed into cranial and mandibular sockets.
     *      Continuous vertical tooth eruption compensating for rapid occlusal attrition.
     *      Cementum-filled infundibula (cementumInfillWearResistance: 0.75 - 0.98) buffering enamel folds against brittle fracture.
     *      Differential wear between hard enamel, softer dentine, and cementum generating self-sharpening plicate ridges
     *      (plisodontGrindingRidges: 0.72 - 0.96) capable of pulverizing silica phytoliths (silicaPhytolithExtractionYield: 0.70 - 0.95).
     *   2. Monodactyl Spring-Leg Kinematics & Elastic Tendon Recoil (Equus ancestral lines):
     *      Reduction of side digits (digits II & IV) to vestigial splint bones; consolidation of full body weight onto a solitary,
     *      massive central third digit (monodactylCentralDigitDominance: 0.75 - 0.98).
     *      Elongated distal tendons (ligamentum suspensorium, deep digital flexor) acting as biological springs
     *      (elasticTendonSpringRecoil: 0.75 - 0.98) storing kinetic energy upon ground impact and releasing it upon toe-off.
     *      40% reduction in metabolic transport cost on hard steppe substrate, achieving explosive sprint velocity
     *      (cursorialUnguligradeVelocity: 2.5 - 5.2 px/tick).
     *   3. Panoramic Horizon Vigilance & Cecal High-Throughput Digestion:
     *      Laterally positioned orbits with horizontal slit pupils scanning a 350-degree perimeter while grazing with head lowered
     *      (panoramicGrazingVigilance: 0.72 - 0.96, herdAlarmReactionTime: 0.80 - 0.98).
     *      Enlarged cecum and proximal colon fermenting high-lignin, coarse C4 cellulose rapidly into volatile fatty acids
     *      (cecalFermentationThroughput: 0.72 - 0.96, coarseFiberEnergyYield: 0.70 - 0.94).
     * - Telemetry Channels:
     *   147th Channel: Hypsodont Enamel & Grazing Index (% HEI)
     *   148th Channel: Cursorial Unguligrade & Sprint Index (% CUI)
     */
    class UngulateCursorialManager {
        /**
         * Initialize Ungulate Cursorial & Hypsodonty Manager.
         */
        constructor() {
            this.metrics = {
                totalCursorialUngulates: 0,
                totalMonodactyls: 0,
                totalTridactyls: 0,
                activeGrazers: 0,
                activeSprinters: 0,
                activeVigilantLookouts: 0,
                meanCrownHeight: 55.0,
                meanCementumResistance: 0.86,
                meanPlisodontRidges: 0.84,
                meanSilicaExtraction: 0.83,
                meanMonodactylDominance: 0.85,
                meanTendonRecoil: 0.86,
                meanSprintVelocity: 3.80,
                meanPanoramicVigilance: 0.84,
                meanCecalThroughput: 0.84,
                meanHypsodontIndex: 0.0,
                meanCursorialIndex: 0.0,
                silicaGrindingEvents: 0,
                tendonSpringEvents: 0,
                predatorEscapeEvents: 0,
                cecalFermentationYield: 0.0,
                cumulativeUngulateBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Cursorial Ungulate traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Check genetic affinity or lineage eligibility:
            // Herbivorous mammals that have adapted to open savanna / steppe ecosystems
            const isHerbivore = org.diet === "herbivore" || org.dietType === "herbivore" || (org.isHerbivore && !org.isCarnivore);
            const isMammal = org.isMammaliaform || org.isTherian || org.isEutherian || org.isUngulate ||
                             (org.generation && org.generation >= 15 && isHerbivore);

            if (!isMammal || !isHerbivore) return;

            // Activate Cursorial Ungulate trait suite
            if (org.isCursorialUngulate === undefined) {
                // Probabilistic activation for evolving herbivores or designated lineage
                const activates = Math.random() < 0.45 || org.isEquid || org.isBovid;
                if (!activates) return;

                org.isCursorialUngulate = true;
                
                // Dimorphism: Progressive evolution from tridactyl (Merychippus) to monodactyl (Pliohippus / Equus)
                const isMonodactyl = Math.random() < 0.60;
                org.isMonodactyl = isMonodactyl;

                // 1. Hypsodont Molar Dentition & Cementum Attributes
                org.hypsodontCrownHeight = isMonodactyl ? (52.0 + Math.random() * 23.0) : (40.0 + Math.random() * 18.0); // 40 - 75 mm
                org.cementumInfillWearResistance = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.plisodontGrindingRidges = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.silicaPhytolithExtractionYield = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.dentalWearAccumulation = 0.0;
                org.isDentallyExhausted = false;

                // 2. Monodactyl Spring-Leg & Tendon Recoil Attributes
                org.monodactylCentralDigitDominance = isMonodactyl ? (0.85 + Math.random() * 0.13) : (0.45 + Math.random() * 0.25);
                org.elasticTendonSpringRecoil = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.cursorialUnguligradeVelocity = isMonodactyl ? (3.5 + Math.random() * 1.7) : (2.5 + Math.random() * 1.5); // 2.5 - 5.2 px/tick
                org.tendonEnergyStored = 0.0;
                org.isSpringBounding = false;
                org.springBoundingTimer = 0.0;

                // 3. Panoramic Vigilance & Cecal Fermentation Attributes
                org.panoramicGrazingVigilance = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.herdAlarmReactionTime = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.cecalFermentationThroughput = 0.72 + Math.random() * 0.24; // 0.72 - 0.96
                org.coarseFiberEnergyYield = 0.70 + Math.random() * 0.24; // 0.70 - 0.94
                org.isVigilantLookout = false;
                org.lastAlarmTick = 0;

                // Telemetry Indices
                org.hypsodontEnamelIndex = 0.0;
                org.cursorialSprintIndex = 0.0;
            }
        }

        /**
         * Update biomechanics, grazing, spring-running, and vigilance per tick.
         * @param {Object} org - Organism instance.
         * @param {Array} allOrgs - Population array.
         * @param {Object} env - Environmental state.
         * @param {number} dt - Delta time step.
         */
        update(org, allOrgs, env, dt) {
            if (!org || !org.alive || !org.isCursorialUngulate) return;

            const timeStep = dt || 1.0;

            // 1. Hypsodont Silica Grinding & Caloric Assimilation
            // If feeding or near plant resources, crush C4 tough cellulose
            const isFeeding = (org.isEating || org.energy < (org.maxEnergy || 100.0) * 0.85);
            if (isFeeding && !org.isDentallyExhausted) {
                // High-crowned teeth grind abrasive silica
                const extractionRate = org.silicaPhytolithExtractionYield * org.plisodontGrindingRidges;
                const fiberCaloricGain = org.cecalFermentationThroughput * org.coarseFiberEnergyYield * 0.18 * timeStep;
                
                org.energy = Math.min((org.maxEnergy || 120.0), org.energy + fiberCaloricGain);
                this.metrics.silicaGrindingEvents++;
                this.metrics.cecalFermentationYield += fiberCaloricGain;

                // Attrition offset by continuous hypsodont eruption
                const grossWear = 0.00045 * (1.0 - org.cementumInfillWearResistance * 0.65) * timeStep;
                org.dentalWearAccumulation += grossWear;

                // If tooth crown fully worn down after millions of chews
                if (org.dentalWearAccumulation > org.hypsodontCrownHeight * 0.95) {
                    org.isDentallyExhausted = true;
                }
            }

            // 2. Predator Detection & Panoramic Horizon Vigilance
            // Look for predators (Machairodonts, Creodonts, Amphicyonids) within scanning radius
            let nearestThreat = null;
            let minThreatDist = 180.0; // Sensory scan distance
            org.isVigilantLookout = false;

            if (allOrgs && allOrgs.length > 0) {
                for (let i = 0; i < allOrgs.length; i++) {
                    const other = allOrgs[i];
                    if (!other || !other.alive || other === org) continue;

                    const isPredator = other.isCarnivore || other.isMachairodont || other.isCreodont || other.isTerrorBird;
                    if (!isPredator) continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < minThreatDist) {
                        minThreatDist = dist;
                        nearestThreat = other;
                    }
                }
            }

            // Panoramic eye scan triggered
            if (nearestThreat) {
                org.isVigilantLookout = true;
                // Compute flee vector
                const fdx = org.x - nearestThreat.x;
                const fdy = org.y - nearestThreat.y;
                const flen = Math.hypot(fdx, fdy) || 1.0;
                const normX = fdx / flen;
                const normY = fdy / flen;

                // Engage Monodactyl Elastic Tendon Spring Bounding
                org.isSpringBounding = true;
                org.springBoundingTimer = 25.0; // Ticks of sprint burst
                this.metrics.tendonSpringEvents++;

                // Elastic tendon recoil acceleration
                const springMultiplier = 1.0 + (org.elasticTendonSpringRecoil * org.monodactylCentralDigitDominance * 0.85);
                const sprintSpeed = org.cursorialUnguligradeVelocity * springMultiplier;

                org.vx = normX * sprintSpeed;
                org.vy = normY * sprintSpeed;

                // Elastic bounce restores 40% metabolic kinetic cost
                const metabolicCost = (sprintSpeed * 0.02) * (1.0 - org.elasticTendonSpringRecoil * 0.40);
                org.energy = Math.max(0.5, org.energy - metabolicCost * timeStep);

                // Alarm signal to herd mates
                if (Math.random() < org.herdAlarmReactionTime * 0.35) {
                    this.alertNearbyHerdMates(org, allOrgs, normX, normY);
                }

                if (minThreatDist < 60.0) {
                    this.metrics.predatorEscapeEvents++;
                }
            } else if (org.springBoundingTimer > 0) {
                org.springBoundingTimer -= timeStep;
                if (org.springBoundingTimer <= 0) {
                    org.isSpringBounding = false;
                }
            }

            // 3. Compute 147th & 148th Telemetry Channel Metrics
            // % HEI (Hypsodont Enamel & Grazing Index):
            // (CrownHeight / 75.0) * 0.35 + Cementum * 0.25 + Plisodont * 0.20 + SilicaExtract * 0.20
            const rawHEI = ((org.hypsodontCrownHeight / 75.0) * 0.35 +
                            org.cementumInfillWearResistance * 0.25 +
                            org.plisodontGrindingRidges * 0.20 +
                            org.silicaPhytolithExtractionYield * 0.20) * 100.0;
            org.hypsodontEnamelIndex = Math.min(100.0, Math.max(0.0, rawHEI));

            // % CUI (Cursorial Unguligrade & Sprint Index):
            // Monodactyl * 0.35 + TendonRecoil * 0.30 + (Speed / 5.2) * 0.20 + Vigilance * 0.15
            const rawCUI = (org.monodactylCentralDigitDominance * 0.35 +
                            org.elasticTendonSpringRecoil * 0.30 +
                            (org.cursorialUnguligradeVelocity / 5.2) * 0.20 +
                            org.panoramicGrazingVigilance * 0.15) * 100.0;
            org.cursorialSprintIndex = Math.min(100.0, Math.max(0.0, rawCUI));
        }

        /**
         * Propagate vigilance alarm waves across herd members.
         * @param {Object} scout - The detecting ungulate.
         * @param {Array} allOrgs - Population pool.
         * @param {number} fleeDirX - Escape unit vector X.
         * @param {number} fleeDirY - Escape unit vector Y.
         */
        alertNearbyHerdMates(scout, allOrgs, fleeDirX, fleeDirY) {
            const ALARM_RADIUS = 140.0;
            for (let i = 0; i < allOrgs.length; i++) {
                const mate = allOrgs[i];
                if (!mate || !mate.alive || mate === scout || !mate.isCursorialUngulate) continue;

                const dx = mate.x - scout.x;
                const dy = mate.y - scout.y;
                const d2 = dx * dx + dy * dy;

                if (d2 < ALARM_RADIUS * ALARM_RADIUS) {
                    mate.isSpringBounding = true;
                    mate.springBoundingTimer = 20.0;
                    mate.vx = fleeDirX * (mate.cursorialUnguligradeVelocity || 3.5);
                    mate.vy = fleeDirY * (mate.cursorialUnguligradeVelocity || 3.5);
                }
            }
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
            let monoCount = 0;
            let triCount = 0;
            let activeGrazers = 0;
            let activeSprinters = 0;
            let activeLookouts = 0;

            let sumCrown = 0;
            let sumCementum = 0;
            let sumPlisodont = 0;
            let sumSilica = 0;
            let sumMonodactyl = 0;
            let sumTendon = 0;
            let sumVelocity = 0;
            let sumVigilance = 0;
            let sumCecal = 0;
            let sumHEI = 0;
            let sumCUI = 0;
            let sumBiomass = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;

                this.initOrganism(o);

                if (o.isCursorialUngulate) {
                    this.update(o, organisms, env, dt);

                    count++;
                    if (o.isMonodactyl) monoCount++;
                    else triCount++;

                    if (o.isEating || o.energy < (o.maxEnergy || 100.0) * 0.85) activeGrazers++;
                    if (o.isSpringBounding) activeSprinters++;
                    if (o.isVigilantLookout) activeLookouts++;

                    sumCrown += o.hypsodontCrownHeight || 50.0;
                    sumCementum += o.cementumInfillWearResistance || 0.85;
                    sumPlisodont += o.plisodontGrindingRidges || 0.82;
                    sumSilica += o.silicaPhytolithExtractionYield || 0.80;
                    sumMonodactyl += o.monodactylCentralDigitDominance || 0.80;
                    sumTendon += o.elasticTendonSpringRecoil || 0.85;
                    sumVelocity += o.cursorialUnguligradeVelocity || 3.8;
                    sumVigilance += o.panoramicGrazingVigilance || 0.84;
                    sumCecal += o.cecalFermentationThroughput || 0.84;
                    sumHEI += o.hypsodontEnamelIndex || 0.0;
                    sumCUI += o.cursorialSprintIndex || 0.0;
                    sumBiomass += (o.mass || 12.0);
                }
            }

            this.metrics.totalCursorialUngulates = count;
            this.metrics.totalMonodactyls = monoCount;
            this.metrics.totalTridactyls = triCount;
            this.metrics.activeGrazers = activeGrazers;
            this.metrics.activeSprinters = activeSprinters;
            this.metrics.activeVigilantLookouts = activeLookouts;

            if (count > 0) {
                this.metrics.meanCrownHeight = parseFloat((sumCrown / count).toFixed(1));
                this.metrics.meanCementumResistance = parseFloat((sumCementum / count).toFixed(2));
                this.metrics.meanPlisodontRidges = parseFloat((sumPlisodont / count).toFixed(2));
                this.metrics.meanSilicaExtraction = parseFloat((sumSilica / count).toFixed(2));
                this.metrics.meanMonodactylDominance = parseFloat((sumMonodactyl / count).toFixed(2));
                this.metrics.meanTendonRecoil = parseFloat((sumTendon / count).toFixed(2));
                this.metrics.meanSprintVelocity = parseFloat((sumVelocity / count).toFixed(2));
                this.metrics.meanPanoramicVigilance = parseFloat((sumVigilance / count).toFixed(2));
                this.metrics.meanCecalThroughput = parseFloat((sumCecal / count).toFixed(2));
                this.metrics.meanHypsodontIndex = parseFloat((sumHEI / count).toFixed(1));
                this.metrics.meanCursorialIndex = parseFloat((sumCUI / count).toFixed(1));
                this.metrics.cumulativeUngulateBiomass = parseFloat(sumBiomass.toFixed(2));
            } else {
                this.metrics.meanHypsodontIndex = 0.0;
                this.metrics.meanCursorialIndex = 0.0;
            }
        }

        /**
         * Get 4 biological regimes for 147th Channel (% HEI).
         * @param {number} heiValue - Hypsodont Enamel Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        getHypsodontRegime(heiValue) {
            const v = Math.max(0.0, Math.min(100.0, heiValue || 0.0));
            if (v <= 25.0) {
                return { name: "BRACHYDONT_WOODLAND_BROWSER", desc: "Brachydont Woodland Browser & Leaf Nipper", class: "hei-brachydont" };
            } else if (v <= 50.0) {
                return { name: "MESODONT_MIXED_FEEDER", desc: "Mesodont Mixed Feeder & Bush Forager", class: "hei-mesodont" };
            } else if (v <= 75.0) {
                return { name: "HYPSODONT_SAVANNA_GRAZER", desc: "Hypsodont Savanna Grazer & Silica Grinder", class: "hei-hypsodont" };
            } else {
                return { name: "HYPER_HYPSODONT_STEPPE_TITAN", desc: "Hyper-Hypsodont Steppe Titan & Endless Fiber Master", class: "hei-titan" };
            }
        }

        /**
         * Get 4 biological regimes for 148th Channel (% CUI).
         * @param {number} cuiValue - Cursorial Unguligrade Index (0 - 100).
         * @returns {Object} Regime name and style token.
         */
        /**
         * Get synthesized population-level metrics.
         * @returns {Object} Metric summary.
         */
        getMetrics() {
            return this.metrics;
        }

        getCursorialRegime(cuiValue) {
            const v = Math.max(0.0, Math.min(100.0, cuiValue || 0.0));
            if (v <= 25.0) {
                return { name: "TRIDACTYL_FOREST_TROTTER", desc: "Tridactyl Forest Trotter & Slow Prowler", class: "cui-tridactyl" };
            } else if (v <= 50.0) {
                return { name: "SUB_UNGULIGRADE_CANTER", desc: "Sub-Unguligrade Canter & Lateral Spreader", class: "cui-subunguligrade" };
            } else if (v <= 75.0) {
                return { name: "MONODACTYL_SPRING_RUNNER", desc: "Monodactyl Spring Runner & Tendon Bounder", class: "cui-monodactyl" };
            } else {
                return { name: "APEX_CURSORIAL_ESCAPE_TITAN", desc: "Apex Cursorial Escape Titan & Uncatchable Steppe Phantom", class: "cui-titan" };
            }
        }
    }

    // Export module globally
    global.UngulateCursorialManager = UngulateCursorialManager;
    global.ungulateCursorialManager = new UngulateCursorialManager();

})(typeof window !== "undefined" ? window : global);
