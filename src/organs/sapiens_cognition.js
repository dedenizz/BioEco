// BioEcosystem - Upper Paleolithic Homo sapiens Cognitive Explosion & Advanced Ballistics Dynamics
// Module: src/organs/sapiens_cognition.js
// Version: 9.78.0 (Hour 698 - System Agent: Atlatl Mechanical Leverage, Eyed Bone Needles, Tailored Garments, Parietal Cave Art & 155th/156th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SapiensCognitionManager
     * Core evolutionary, technological, and cognitive dynamics for Upper Paleolithic Homo sapiens:
     * 1. Atlatl Mechanical Leverage Ballistics:
     *    - Bone and antler spearthrower mechanical lever (atlatlLeverageMechanics: 0.80 - 0.98).
     *    - Tripled dart launch velocity (120-150 km/h) and extended range to 80-100 meters (atlatlBallisticRangeMultiplier: 2.5 - 4.5x).
     *    - High kinetic penetration energy piercing heavy megafauna hides (penetrationKineticEnergyBonus: 0.75 - 0.98).
     * 2. Prismatic Bladelet & Modular Composite Grooving:
     *    - Micro-bladelet knapping from prepared prismatic cores (prismaticBladeletKnapping: 0.80 - 0.98).
     *    - Inset razor-sharp modular lithic barbs embedded into bone/antler armatures (microlithicModularGrooving: 0.75 - 0.96).
     * 3. Eyed Bone Needle & Tailored Multi-Layer Garments:
     *    - Fine 1-2 mm drilled mammoth ivory and deer bone eyed needles (eyedBoneNeedleCraft: 0.78 - 0.98).
     *    - Form-fitted windproof, waterproof fur parkas, mittens, and boots sewn with sinew threads (tailoredInsulativeGarment: 0.80 - 0.98).
     *    - 80% reduction in thermal energy loss and drastic drop in subzero infant mortality (thermalLossReductionRate: 0.70 - 0.95).
     * 4. Parietal Cave Artistry & Symbolic Ritual Cohesion:
     *    - Polychrome charcoal and red/yellow ochre parietal cave murals depicting dynamic game anatomy (parietalCaveArtistry: 0.75 - 0.98).
     *    - Long-distance inter-clan symbolic networks, swan-bone flutes, and ritual cohesion bonus (symbolicRitualCohesion: 0.72 - 0.95).
     * 5. 155th & 156th Telemetry Channel Indices:
     *    - 155th Channel: % AMI (Atlatl Mechanical Leverage Index, Fildişi Sarısı #eab308)
     *    - 156th Channel: % PCA (Parietal Cave Artistry Index, Mağara Kırmızısı #991b1b)
     */
    class SapiensCognitionManager {
        /**
         * Initialize Upper Paleolithic Homo sapiens Cognition & Ballistics Manager.
         */
        constructor() {
            this.metrics = {
                totalSapiens: 0,
                activeAtlatlThrowers: 0,
                activeTailors: 0,
                activeCaveArtists: 0,
                activeBladeletKnappers: 0,
                meanAtlatlLeverage: 0.88,
                meanBallisticRangeMult: 3.5,
                meanKineticPenetration: 0.86,
                meanNeedleCraft: 0.87,
                meanTailoredInsulation: 0.88,
                meanThermalReduction: 0.82,
                meanCaveArtistry: 0.86,
                meanSymbolicCohesion: 0.84,
                meanBladeletKnapping: 0.88,
                meanAMIIndex: 0.0,
                meanPCAIndex: 0.0,
                atlatlDartsLaunched: 0,
                tailoredGarmentsCompleted: 0,
                caveMuralsCreated: 0,
                microlithicBladeletsKnapped: 0,
                harvestedPaleolithicBiomass: 0.0,
                cumulativeSapiensBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Upper Paleolithic Homo sapiens cognitive traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Eligibility: Homo lineage, advanced Neanderthal/early sapiens descendants, or advanced primates
            const isEligible = org.isHomo || org.isNeanderthal || 
                               (org.isHominin && org.generation >= 30) ||
                               (org.diet === "omnivore" && org.mass >= 14.0 && org.mass <= 50.0 && org.generation >= 32);

            if (!isEligible) return;

            if (org.isUpperPaleolithicSapiens === undefined) {
                // Probabilistic emergence of Upper Paleolithic Homo sapiens
                const activates = Math.random() < 0.55 || (org.isHomo && Math.random() < 0.70);
                if (!activates) return;

                org.isUpperPaleolithicSapiens = true;

                // 1. Atlatl Mechanical Leverage & Ballistics
                org.atlatlLeverageMechanics = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.atlatlBallisticRangeMultiplier = 2.5 + Math.random() * 2.0; // 2.5 - 4.5x
                org.penetrationKineticEnergyBonus = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.hasAtlatlSpearthrower = Math.random() < 0.75;
                org.isThrowingAtlatl = false;

                // 2. Prismatic Microlithic Bladelet Technology
                org.prismaticBladeletKnapping = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.microlithicModularGrooving = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                org.hasMicrolithicPoints = Math.random() < 0.70;
                org.isKnappingBladelets = false;

                // 3. Eyed Bone Needle & Tailored Insulation Garments
                org.eyedBoneNeedleCraft = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                org.tailoredInsulativeGarment = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.thermalLossReductionRate = 0.70 + Math.random() * 0.25; // 0.70 - 0.95
                org.hasTailoredGarment = Math.random() < 0.80;
                org.isSewingGarment = false;

                // 4. Parietal Cave Artistry & Symbolic Cohesion
                org.parietalCaveArtistry = 0.75 + Math.random() * 0.23; // 0.75 - 0.98
                org.symbolicRitualCohesion = 0.72 + Math.random() * 0.23; // 0.72 - 0.95
                org.hasCreatedCaveMural = Math.random() < 0.60;
                org.isPaintingCaveMural = false;

                // Telemetry Channel Indices
                org.atlatlMechanicalIndex = 0.0;
                org.parietalCaveArtIndex = 0.0;
            }
        }

        /**
         * Update Atlatl ballistics, eyed needle garment tailoring, parietal cave art, and telemetry.
         * @param {Array} organisms - Population array.
         * @param {Object} spatialGrid - Spatial collision grid.
         * @param {number} dt - Time delta multiplier.
         */
        step(organisms, spatialGrid, dt) {
            if (!Array.isArray(organisms) || organisms.length === 0) {
                this.resetMetrics();
                return;
            }

            let count = 0;
            let activeAtlatl = 0;
            let activeTailor = 0;
            let activeArtist = 0;
            let activeBladelet = 0;

            let sumLeverage = 0.0;
            let sumRangeMult = 0.0;
            let sumKinetic = 0.0;
            let sumNeedle = 0.0;
            let sumInsulation = 0.0;
            let sumThermalRed = 0.0;
            let sumArtistry = 0.0;
            let sumCohesion = 0.0;
            let sumBladelet = 0.0;
            let sumAMI = 0.0;
            let sumPCA = 0.0;
            let sumBiomass = 0.0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                this.initOrganism(org);

                if (!org.isUpperPaleolithicSapiens) continue;

                count++;
                sumBiomass += (org.mass || 25.0);

                // A. Prismatic Microlithic Bladelet Knapping
                if (Math.random() < 0.04) {
                    org.isKnappingBladelets = true;
                    activeBladelet++;
                    this.metrics.microlithicBladeletsKnapped++;
                    org.hasMicrolithicPoints = true;
                } else {
                    org.isKnappingBladelets = false;
                }

                // B. Atlatl Ballistic Long-Range Hunting
                if (org.hasAtlatlSpearthrower && Math.random() < 0.06) {
                    org.isThrowingAtlatl = true;
                    activeAtlatl++;
                    this.metrics.atlatlDartsLaunched++;

                    // Extended range strike bonus with zero close-range injury risk
                    const atlatlYield = (org.atlatlBallisticRangeMultiplier || 3.5) * 0.55;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + atlatlYield);
                    this.metrics.harvestedPaleolithicBiomass += atlatlYield;
                } else {
                    org.isThrowingAtlatl = false;
                }

                // C. Eyed Bone Needle Tailoring & Thermal Conservation
                if (Math.random() < 0.035) {
                    org.isSewingGarment = true;
                    activeTailor++;
                    this.metrics.tailoredGarmentsCompleted++;
                    org.hasTailoredGarment = true;
                } else {
                    org.isSewingGarment = false;
                }

                // Subzero metabolic protection: tailored multi-layer fur parkas prevent cold loss
                if (org.hasTailoredGarment) {
                    const thermalSaving = (org.thermalLossReductionRate || 0.82) * 0.016;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + thermalSaving * 0.2);
                }

                // D. Parietal Cave Artistry & Shamanic Ritual Murals
                if (Math.random() < 0.03) {
                    org.isPaintingCaveMural = true;
                    activeArtist++;
                    this.metrics.caveMuralsCreated++;
                    org.hasCreatedCaveMural = true;
                } else {
                    org.isPaintingCaveMural = false;
                }

                // Symbolic cohesion: boosts social bonding, stress mitigation, and fertility recovery
                if (org.hasCreatedCaveMural) {
                    if (org.fertilityCooldown > 0) {
                        org.fertilityCooldown = Math.max(0, org.fertilityCooldown - 0.25);
                    }
                }

                // E. Compute Telemetry Channel Indices
                // 155th Channel: % AMI (Atlatl Mechanical Leverage Index)
                const levNorm = org.atlatlLeverageMechanics || 0.88;
                const rangeNorm = Math.min(1.0, Math.max(0.0, ((org.atlatlBallisticRangeMultiplier || 3.5) - 2.0) / 2.5));
                const kinNorm = org.penetrationKineticEnergyBonus || 0.86;
                const bladeNorm = org.prismaticBladeletKnapping || 0.88;
                const ami = Math.min(100.0, Math.max(0.0,
                    (levNorm * 0.35 + rangeNorm * 0.30 + kinNorm * 0.20 + bladeNorm * 0.15) * 100.0
                ));
                org.atlatlMechanicalIndex = ami;

                // 156th Channel: % PCA (Parietal Cave Artistry Index)
                const artNorm = org.parietalCaveArtistry || 0.86;
                const cohNorm = org.symbolicRitualCohesion || 0.84;
                const needleNorm = org.eyedBoneNeedleCraft || 0.87;
                const insulNorm = org.tailoredInsulativeGarment || 0.88;
                const pca = Math.min(100.0, Math.max(0.0,
                    (artNorm * 0.35 + cohNorm * 0.25 + needleNorm * 0.20 + insulNorm * 0.20) * 100.0
                ));
                org.parietalCaveArtIndex = pca;

                // Accumulate sums
                sumLeverage += levNorm;
                sumRangeMult += (org.atlatlBallisticRangeMultiplier || 3.5);
                sumKinetic += kinNorm;
                sumNeedle += needleNorm;
                sumInsulation += insulNorm;
                sumThermalRed += (org.thermalLossReductionRate || 0.82);
                sumArtistry += artNorm;
                sumCohesion += cohNorm;
                sumBladelet += bladeNorm;
                sumAMI += ami;
                sumPCA += pca;
            }

            // Update synthesized metrics
            this.metrics.totalSapiens = count;
            this.metrics.activeAtlatlThrowers = activeAtlatl;
            this.metrics.activeTailors = activeTailor;
            this.metrics.activeCaveArtists = activeArtist;
            this.metrics.activeBladeletKnappers = activeBladelet;
            this.metrics.cumulativeSapiensBiomass = sumBiomass;

            if (count > 0) {
                this.metrics.meanAtlatlLeverage = sumLeverage / count;
                this.metrics.meanBallisticRangeMult = sumRangeMult / count;
                this.metrics.meanKineticPenetration = sumKinetic / count;
                this.metrics.meanNeedleCraft = sumNeedle / count;
                this.metrics.meanTailoredInsulation = sumInsulation / count;
                this.metrics.meanThermalReduction = sumThermalRed / count;
                this.metrics.meanCaveArtistry = sumArtistry / count;
                this.metrics.meanSymbolicCohesion = sumCohesion / count;
                this.metrics.meanBladeletKnapping = sumBladelet / count;
                this.metrics.meanAMIIndex = sumAMI / count;
                this.metrics.meanPCAIndex = sumPCA / count;
            } else {
                this.metrics.meanAMIIndex = 0.0;
                this.metrics.meanPCAIndex = 0.0;
            }
        }

        /**
         * Reset population-level metrics.
         */
        resetMetrics() {
            this.metrics.totalSapiens = 0;
            this.metrics.activeAtlatlThrowers = 0;
            this.metrics.activeTailors = 0;
            this.metrics.activeCaveArtists = 0;
            this.metrics.activeBladeletKnappers = 0;
            this.metrics.meanAMIIndex = 0.0;
            this.metrics.meanPCAIndex = 0.0;
        }

        /**
         * Get synthesized population metrics.
         * @returns {Object} Current metrics object.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Classify biological regime for 155th Channel (% AMI).
         * @param {number} amiVal - Atlatl Mechanical Leverage Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getAtlatlRegime(amiVal) {
            const v = Math.max(0.0, Math.min(100.0, amiVal || 0.0));
            if (v <= 25.0) {
                return { name: "UNASSISTED_HAND_THRUSTER", desc: "Unassisted Hand Thruster & Close Contact", class: "ami-unassisted" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_LEVERAGE_THROWER", desc: "Incipient Leverage Thrower & Short Dart", class: "ami-incipient" };
            } else if (v <= 75.0) {
                return { name: "ATLATL_BALLISTIC_HUNTER", desc: "Atlatl Ballistic Hunter & Distance Striker", class: "ami-hunter" };
            } else {
                return { name: "APEX_LONG_RANGE_BALLISTICIAN", desc: "Apex Long-Range Ballistician & Megafauna Harvester", class: "ami-apex" };
            }
        }

        /**
         * Classify biological regime for 156th Channel (% PCA).
         * @param {number} pcaVal - Parietal Cave Artistry Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getArtistryRegime(pcaVal) {
            const v = Math.max(0.0, Math.min(100.0, pcaVal || 0.0));
            if (v <= 25.0) {
                return { name: "PRAGMATIC_NON_SYMBOLIC", desc: "Pragmatic Non-Symbolic Forager", class: "pca-pragmatic" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_PIGMENT_STENCILER", desc: "Incipient Pigment Stenciler & Handprint Marker", class: "pca-stenciler" };
            } else if (v <= 75.0) {
                return { name: "PARIETAL_CAVE_ARTIST", desc: "Parietal Cave Artist & Shamanic Ritualist", class: "pca-artist" };
            } else {
                return { name: "APEX_SYMBOLIC_COGNITIVE_MASTER", desc: "Apex Symbolic Cognitive Master & Upper Paleolithic Visionary", class: "pca-master" };
            }
        }
    }

    // Export module globally
    global.SapiensCognitionManager = SapiensCognitionManager;
    global.sapiensCognitionManager = new SapiensCognitionManager();

})(typeof window !== "undefined" ? window : global);
