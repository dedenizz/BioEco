// BioEcosystem - Late Pleistocene Canis lupus familiaris Symbiosis & Bow and Arrow Dynamics
// Module: src/organs/canis_symbiosis.js
// Version: 9.83.0 (Hour 703 - System Agent: Canine Domestication, Olfactory Game Tracking, Bow & Arrow Ballistics, Geometric Microliths & 157th/158th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CanisSymbiosisManager
     * Core evolutionary, symbiotic, and technological dynamics for Late Pleistocene Homo sapiens and Canis lupus familiaris:
     * 1. Canine Domestication & Interspecific Symbiosis (Canis lupus familiaris):
     *    - Artificial selection toward reduced flight distance and high docility (canineDomesticationAffinity: 0.78 - 0.98).
     *    - Deep interspecies oxytocin social bonding and mutual affection (interSpeciesAffectionBonus: 0.75 - 0.95).
     *    - "Three-Dog Night" communal hypothermia protection: sharing core body warmth during subzero LGM blizzards (thermalSharingBonus: 0.70 - 0.92).
     * 2. Olfactory Tracking & Sentinel Camp Defense:
     *    - Acute canine olfactory acuity tracking wounded game blood scents across snow and scrub (olfactoryTrackingEfficiency: 0.80 - 0.98).
     *    - Reduces pursuit caloric expenditure and search time by up to 60% (trackingTimeReduction: 0.50 - 0.75).
     *    - Nocturnal camp sentinel alert barking deterring cave hyenas and ambush predators (sentinelWarningAlert: 0.75 - 0.96).
     * 3. Bow & Arrow Elastic Potential Energy & Ballistics:
     *    - Resilient yew/elm stave bent with dry sinew chord storing mechanical potential energy (bowMechanicalTension: 0.80 - 0.98).
     *    - Lightweight reed shaft, goose-feather fletching, achieving silent 140-220 km/h arrow flight and 150-200 m range (arrowBallisticVelocity: 140 - 220 km/h).
     *    - 3x rapid rate-of-fire multiplier over atlatl in dense scrub and forested biomes (rateOfFireMultiplier: 2.5 - 4.0x).
     * 4. Geometric Microlithic Projectile Barbs:
     *    - Symmetrical flint trapezes, triangles, and lunates knapped from micro-cores (geometricMicrolithKnapping: 0.80 - 0.98).
     *    - Slotted bone/wood armatures lined with birch tar mastic creating modular razor barbs (modularBarbSlottedHafting: 0.78 - 0.96).
     * 5. 157th & 158th Telemetry Channel Indices:
     *    - 157th Channel: % CDI (Canine Domestication Index, Kurt Grisi #64748b)
     *    - 158th Channel: % BAI (Bow & Arrow Ballistics Index, Orman Yeşili #16a34a)
     */
    class CanisSymbiosisManager {
        /**
         * Initialize Canis Symbiosis and Bow & Arrow Manager.
         */
        constructor() {
            this.metrics = {
                totalDomesticCanines: 0,
                activeHuntingDogs: 0,
                activeSentinels: 0,
                activeArchers: 0,
                activeMicrolithKnappers: 0,
                meanDomesticationAffinity: 0.88,
                meanOlfactoryTracking: 0.89,
                meanSentinelAlert: 0.86,
                meanThermalSharing: 0.81,
                meanBowTension: 0.88,
                meanArrowVelocity: 180.0,
                meanRateOfFire: 3.2,
                meanMicrolithKnapping: 0.88,
                meanCDIIndex: 0.0,
                meanBAIIndex: 0.0,
                trackedGameEvents: 0,
                sentinelAlarmsSounded: 0,
                arrowsLaunched: 0,
                geometricMicrolithsCrafted: 0,
                harvestedArcheryBiomass: 0.0,
                cumulativeCanineBiomass: 0.0
            };
        }

        /**
         * Initialize an organism with Canis symbiosis and archery traits if eligible.
         * @param {Object} org - The organism instance.
         */
        initOrganism(org) {
            if (!org) return;

            // Eligibility: Homo sapiens descendants, advanced hominins, or companion canids
            const isEligibleHuman = org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 32);

            if (isEligibleHuman && org.hasCanineCompanion === undefined) {
                // Probabilistic partnership with domesticated dogs and adoption of bow & arrow
                const adoptsDog = Math.random() < 0.65;
                org.hasCanineCompanion = adoptsDog;

                // 1. Canine Domestication & Interspecific Symbiosis
                org.canineDomesticationAffinity = 0.78 + Math.random() * 0.20; // 0.78 - 0.98
                org.olfactoryTrackingEfficiency = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.sentinelWarningAlert = 0.75 + Math.random() * 0.21; // 0.75 - 0.96
                org.thermalSharingBonus = 0.70 + Math.random() * 0.22; // 0.70 - 0.92
                org.isDogTracking = false;
                org.isSentinelAlerting = false;

                // 2. Bow & Arrow Ballistics & Mechanical Tension
                org.hasBowAndArrow = Math.random() < 0.75;
                org.bowMechanicalTension = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.arrowBallisticVelocity = 140.0 + Math.random() * 80.0; // 140 - 220 km/h
                org.rateOfFireMultiplier = 2.5 + Math.random() * 1.5; // 2.5 - 4.0x
                org.isArcheryShooting = false;

                // 3. Geometric Microlithic Projectile Barbs
                org.geometricMicrolithKnapping = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                org.modularBarbSlottedHafting = 0.78 + Math.random() * 0.18; // 0.78 - 0.96
                org.hasGeometricArrows = Math.random() < 0.70;
                org.isKnappingMicroliths = false;

                // Telemetry Channel Indices
                org.canineDomesticationIndex = 0.0;
                org.bowBallisticsIndex = 0.0;
            }
        }

        /**
         * Update Canine tracking, sentinel alert, bow and arrow shooting, and telemetry indices.
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
            let activeTrackers = 0;
            let activeSentinels = 0;
            let activeArchers = 0;
            let activeMicroliths = 0;

            let sumAffinity = 0.0;
            let sumOlfactory = 0.0;
            let sumSentinel = 0.0;
            let sumThermalShare = 0.0;
            let sumTension = 0.0;
            let sumVelocity = 0.0;
            let sumFireRate = 0.0;
            let sumMicroKnap = 0.0;
            let sumCDI = 0.0;
            let sumBAI = 0.0;
            let sumBiomass = 0.0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                this.initOrganism(org);

                if (!org.hasCanineCompanion && !org.hasBowAndArrow) continue;

                count++;
                sumBiomass += (org.mass || 25.0);

                // A. Olfactory Game Tracking with Companion Canid
                if (org.hasCanineCompanion && Math.random() < 0.055) {
                    org.isDogTracking = true;
                    activeTrackers++;
                    this.metrics.trackedGameEvents++;

                    // Tracking caloric conservation and rapid foraging yield
                    const trackYield = (org.olfactoryTrackingEfficiency || 0.88) * 1.85;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + trackYield);
                    this.metrics.harvestedArcheryBiomass += trackYield;
                } else {
                    org.isDogTracking = false;
                }

                // B. Sentinel Warning Alert & Nocturnal Camp Defense
                if (org.hasCanineCompanion && Math.random() < 0.04) {
                    org.isSentinelAlerting = true;
                    activeSentinels++;
                    this.metrics.sentinelAlarmsSounded++;
                } else {
                    org.isSentinelAlerting = false;
                }

                // C. Three-Dog Night Thermal Sharing: boosts subzero energy equilibrium
                if (org.hasCanineCompanion) {
                    const thermalShareBonus = (org.thermalSharingBonus || 0.81) * 0.015;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + thermalShareBonus * 0.15);
                }

                // D. Bow & Arrow Ballistics Rapid Shooting
                if (org.hasBowAndArrow && Math.random() < 0.065) {
                    org.isArcheryShooting = true;
                    activeArchers++;
                    this.metrics.arrowsLaunched++;

                    const arrowYield = (org.rateOfFireMultiplier || 3.2) * 0.48;
                    org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + arrowYield);
                    this.metrics.harvestedArcheryBiomass += arrowYield;
                } else {
                    org.isArcheryShooting = false;
                }

                // E. Geometric Microlith Knapping
                if (Math.random() < 0.04) {
                    org.isKnappingMicroliths = true;
                    activeMicroliths++;
                    this.metrics.geometricMicrolithsCrafted++;
                    org.hasGeometricArrows = true;
                } else {
                    org.isKnappingMicroliths = false;
                }

                // F. Compute Telemetry Channel Indices
                // 157th Channel: % CDI (Canine Domestication Index)
                const affNorm = org.canineDomesticationAffinity || 0.88;
                const olfNorm = org.olfactoryTrackingEfficiency || 0.89;
                const sentNorm = org.sentinelWarningAlert || 0.86;
                const thermNorm = org.thermalSharingBonus || 0.81;
                const cdi = Math.min(100.0, Math.max(0.0,
                    (affNorm * 0.35 + olfNorm * 0.30 + sentNorm * 0.20 + thermNorm * 0.15) * 100.0
                ));
                org.canineDomesticationIndex = cdi;

                // 158th Channel: % BAI (Bow & Arrow Ballistics Index)
                const tensNorm = org.bowMechanicalTension || 0.88;
                const velNorm = Math.min(1.0, Math.max(0.0, ((org.arrowBallisticVelocity || 180.0) - 100.0) / 120.0));
                const rofNorm = Math.min(1.0, Math.max(0.0, ((org.rateOfFireMultiplier || 3.2) - 1.5) / 2.5));
                const microNorm = org.geometricMicrolithKnapping || 0.88;
                const bai = Math.min(100.0, Math.max(0.0,
                    (tensNorm * 0.35 + velNorm * 0.30 + rofNorm * 0.20 + microNorm * 0.15) * 100.0
                ));
                org.bowBallisticsIndex = bai;

                // Accumulate sums
                sumAffinity += affNorm;
                sumOlfactory += olfNorm;
                sumSentinel += sentNorm;
                sumThermalShare += thermNorm;
                sumTension += tensNorm;
                sumVelocity += (org.arrowBallisticVelocity || 180.0);
                sumFireRate += (org.rateOfFireMultiplier || 3.2);
                sumMicroKnap += microNorm;
                sumCDI += cdi;
                sumBAI += bai;
            }

            // Update synthesized metrics
            this.metrics.totalDomesticCanines = count;
            this.metrics.activeHuntingDogs = activeTrackers;
            this.metrics.activeSentinels = activeSentinels;
            this.metrics.activeArchers = activeArchers;
            this.metrics.activeMicrolithKnappers = activeMicroliths;
            this.metrics.cumulativeCanineBiomass = sumBiomass;

            if (count > 0) {
                this.metrics.meanDomesticationAffinity = sumAffinity / count;
                this.metrics.meanOlfactoryTracking = sumOlfactory / count;
                this.metrics.meanSentinelAlert = sumSentinel / count;
                this.metrics.meanThermalSharing = sumThermalShare / count;
                this.metrics.meanBowTension = sumTension / count;
                this.metrics.meanArrowVelocity = sumVelocity / count;
                this.metrics.meanRateOfFire = sumFireRate / count;
                this.metrics.meanMicrolithKnapping = sumMicroKnap / count;
                this.metrics.meanCDIIndex = sumCDI / count;
                this.metrics.meanBAIIndex = sumBAI / count;
            } else {
                this.metrics.meanCDIIndex = 0.0;
                this.metrics.meanBAIIndex = 0.0;
            }
        }

        /**
         * Reset population-level metrics.
         */
        resetMetrics() {
            this.metrics.totalDomesticCanines = 0;
            this.metrics.activeHuntingDogs = 0;
            this.metrics.activeSentinels = 0;
            this.metrics.activeArchers = 0;
            this.metrics.activeMicrolithKnappers = 0;
            this.metrics.meanCDIIndex = 0.0;
            this.metrics.meanBAIIndex = 0.0;
        }

        /**
         * Get synthesized population metrics.
         * @returns {Object} Current metrics object.
         */
        getMetrics() {
            return this.metrics;
        }

        /**
         * Classify biological regime for 157th Channel (% CDI).
         * @param {number} cdiVal - Canine Domestication Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getCanineRegime(cdiVal) {
            const v = Math.max(0.0, Math.min(100.0, cdiVal || 0.0));
            if (v <= 25.0) {
                return { name: "WILD_COMMENSAL_SCAVENGER", desc: "Wild Commensal Scavenger & Tentative Approach", class: "cdi-wild" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_TAME_CAMP_FOLLOWER", desc: "Incipient Tame Camp Follower & Waste Gleaner", class: "cdi-incipient" };
            } else if (v <= 75.0) {
                return { name: "COOPERATIVE_HUNTING_CANINE", desc: "Cooperative Hunting Canine & Sentinel Guardian", class: "cdi-hunting" };
            } else {
                return { name: "APEX_DOMESTICATED_PARTNER", desc: "Apex Domesticated Partner & Interspecific Symbiont", class: "cdi-apex" };
            }
        }

        /**
         * Classify biological regime for 158th Channel (% BAI).
         * @param {number} baiVal - Bow & Arrow Ballistics Index percentage [0, 100].
         * @returns {Object} Regime name and style token.
         */
        getArcheryRegime(baiVal) {
            const v = Math.max(0.0, Math.min(100.0, baiVal || 0.0));
            if (v <= 25.0) {
                return { name: "HAND_PROPELLED_DART", desc: "Hand Propelled Dart & Pre-Bow Mechanics", class: "bai-dart" };
            } else if (v <= 50.0) {
                return { name: "INCIPIENT_TENSION_BOW", desc: "Incipient Tension Bow & Short Flight", class: "bai-incipient" };
            } else if (v <= 75.0) {
                return { name: "ACCURATE_FLETCHED_ARCHER", desc: "Accurate Fletched Archer & Forest Stalker", class: "bai-archer" };
            } else {
                return { name: "APEX_LONG_RANGE_BOWMAN", desc: "Apex Long-Range Bowman & Rapid Quiver Master", class: "bai-apex" };
            }
        }
    }

    // Export module globally
    global.CanisSymbiosisManager = CanisSymbiosisManager;
    global.canisSymbiosisManager = new CanisSymbiosisManager();

})(typeof window !== "undefined" ? window : global);
