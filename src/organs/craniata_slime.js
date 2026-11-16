// BioEcosystem - Early Craniata Chondrocranium, Slime Glands, Oral Suction Disc & Keratin Teeth
// Module: src/organs/craniata_slime.js
// Version: 8.07.0 (Hour 527 - System Agent: Petromyzontida Oral Sucking Disc, Keratin Rasping, Tidal Respiration & 102nd Channel % OTI Math)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CraniataSlimeManager
     * High-fidelity biological simulation of early Craniata / Agnatha (hagfish / Myxini & lampreys / Petromyzontida) anatomy:
     * - Chondrocranium (Cartilaginous Braincase): Protective unossified cartilaginous skull protecting tripartite brain
     * - Tripartite Brain Cephalization: Telencephalon (olfactory), mesencephalon (sensory), rhombencephalon (medulla)
     * - High Olfactory Acuity: Chemosensory detection of benthic organic falls, carcasses and detrital deposits
     * - Slime Gland Pores & Thread Cells: 70-150 pairs of ventrolateral glands secreting coiled protein intermediate filaments
     * - Explosive Mucus Expansion: Hydration in seawater expanding slime vesicles 300-800x into a fibrous hydrogel shroud
     * - Predator Gill Suffocation: Occlusion of predatory teleost / elasmobranch gill lamellae triggering immediate release
     * - Body Knotting Leverage: Overhand figure-8 knotting maneuver to tear off food chunks and cleanse self-secreted slime
     * - Eel-like Sinusoidal Undulation: Anguilliform propulsive undulation along benthic sediments
     * - Petromyzontida Oral Sucking Disc (Buccal Funnel): Negative hydrostatic pressure attachment to pelagic hosts (1.2 - 4.5 N)
     * - Concentric Keratin Teeth Rows & Lingual Piston: Horn-like epidermal teeth and rasping tongue scraping host dermal tissue
     * - Lamphredin Anticoagulant Secretion: Salivary peptide inhibiting host blood coagulation during hematophagic feeding
     * - 7 Pairs of Tidal Gill Pouches: Muscular branchial sacs for bidirectional tidal respiration while mouth is vacuum-sealed
     * - Keratin Tooth Wear & Germinal Renewal: Progressive tooth blunting during rasping and 120s replacement cycle
     * - 101st Telemetry Channel (% SCI - Slime Defense Capacity Index) mathematical core
     * - 102nd Telemetry Channel (% OTI - Oral Suction & Parasitic Traction Index) mathematical core
     */
    class CraniataSlimeManager {
        constructor() {
            this.baseChondrocraniumIntegrity = 0.85; // Structural cohesion of cartilage braincase [0.40 - 0.98]
            this.baseCranialArmorDefense = 0.55;     // Mechanical shock absorption [0.35 - 0.75]
            this.baseSlimePayload = 65.0;            // Available mucus/filament reserve in mg [0 - 100 mg]
            this.baseSlimeMaxPayload = 100.0;        // Max capacity
            this.baseSlimeGlands = 110;              // Ventrolateral gland pores [70 - 150]
            this.baseExpansionRatio = 500.0;         // Volumetric expansion in seawater [300 - 800x]
            this.baseScavengingRate = 0.38;          // Benthic necrophagy biomass processing (mg/s)
            this.baseUndulationVelocity = 2.10;      // Anguilliform speed (px/tick) [1.40 - 3.10]
            this.baseOlfactoryAcuity = 0.82;         // Chemosensory range [0.65 - 0.98]

            // Petromyzontida Defaults
            this.baseBuccalFunnelRadius = 9.5;       // Oral sucking disc radius (px) [6 - 14 px]
            this.baseParasiticTractionForce = 2.8;   // Vacuum latching force (N) [1.2 - 4.5 N]
            this.baseKeratinTeethSharpness = 0.85;   // Horn-like dental sharpness [0.40 - 0.98]
            this.baseLingualPistonRasps = 2.4;       // Rasping frequency (rasps/s) [1.5 - 3.8]
            this.baseLamphredinRate = 0.28;          // Anticoagulant secretion rate (mg/s) [0.15 - 0.45]
            this.baseTidalVentilationFreq = 1.4;     // Tidal gill pouch pumping frequency (Hz) [0.8 - 2.2]

            this.metrics = {
                totalLiveCells: 0,
                totalCraniataOrganisms: 0,
                craniataPrevalence: 0.0,
                meanChondrocraniumIntegrity: 0.85,
                meanCranialArmorDefense: 0.55,
                meanSlimeDefenseCapacity: 0.0, // 101st Channel % SCI
                meanOralSuctionTractionIndex: 0.0, // 102nd Channel % OTI
                meanSlimePayload: 65.0,
                meanSlimeGlandCount: 110,
                meanSlimeExpansionRatio: 500.0,
                meanOlfactoryAcuity: 0.82,
                meanBenthicScavengingRate: 0.38,
                meanEelUndulationVelocity: 2.10,
                meanParasiticTractionForce: 2.8,
                meanKeratinTeethSharpness: 0.85,
                meanTidalVentilationRate: 1.4,
                activeSlimeCloudCount: 0,
                activeParasiticAttachments: 0,
                slimeEjectionEvents: 0,
                predatorGillSuffocations: 0,
                predatorDamageDeflections: 0,
                benthicScavengingEvents: 0,
                bodyKnottingManeuvers: 0,
                parasiticLatchingEvents: 0,
                toothRenewalEvents: 0,
                cumulativeSlimeExpandedLiters: 0.0,
                cumulativeScavengedBiomass: 0.0,
                cumulativeHematophagicEnergyDrawn: 0.0
            };
        }

        /**
         * Initialize craniate anatomy, chondrocranium, tripartite brain, slime glands, oral disc and keratin teeth.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Deep benthic scavengers, carnivores near substrate or organisms with craniata affinity
            const isCompetent = Boolean(org.hasCraniataTrait) ||
                (!org.hasUrochordateTrait && !org.hasStereom &&
                 ((typeof org.diet === "number" && (org.diet >= 0.35 || org.diet >= 0.65)) ||
                  org.diet === "scavenger" || org.diet === "carnivore" || org.niche === "benthic_scavenger" || org.diet === "detritivore" || org.niche === "parasite" ||
                  (org.detritivoreAffinity || 0) > 0.35) &&
                 (org.y >= 130.0 && Math.random() < 0.40)) ||
                Boolean(org.dna && ((org.dna.craniataAffinity || 0) > 0.28 || (org.dna.slimeGlandAffinity || 0) > 0.30 || (org.dna.parasiticAffinity || 0) > 0.28));

            if (typeof org.hasCraniataTrait === "undefined") {
                org.hasCraniataTrait = isCompetent;
            }

            if (!org.hasCraniataTrait) {
                org.isCraniata = false;
                org.hasPetromyzontidaTrait = false;
                org.chondrocraniumIntegrity = 0.0;
                org.cranialArmorDefense = 0.0;
                org.telencephalonSize = 0.0;
                org.mesencephalonSize = 0.0;
                org.rhombencephalonSize = 0.0;
                org.olfactoryAcuity = 0.0;
                org.slimeGlandCount = 0;
                org.slimePayload = 0.0;
                org.slimeMaxPayload = 0.0;
                org.slimeExpansionRatio = 0.0;
                org.isSlimeCloudActive = false;
                org.slimeCloudTimer = 0.0;
                org.slimeCloudRadius = 0.0;
                org.predatorGillSuffocation = false;
                org.eelLikeUndulationVelocity = 0.0;
                org.bodyKnottingActive = false;
                org.knottingTimer = 0.0;
                org.benthicScavengingRate = 0.0;
                org.slimeDefenseCapacity = 0.0;
                // Petromyzontida resets
                org.buccalFunnelRadius = 0.0;
                org.parasiticTractionForce = 0.0;
                org.isParasiticAttached = false;
                org.hostTargetId = null;
                org.parasiticAttachmentTimer = 0.0;
                org.keratinTeethRows = 0;
                org.keratinTeethSharpness = 0.0;
                org.keratinToothWearAccumulation = 0.0;
                org.toothRenewalTimer = 0.0;
                org.lingualPistonRasps = 0.0;
                org.lamphredinSecretionRate = 0.0;
                org.tidalGillPouches = 0;
                org.tidalVentilationFrequency = 0.0;
                org.tidalVentilationRate = 0.0;
                org.branchialAsphyxiationImmunity = false;
                org.oralSuctionTractionIndex = 0.0;
                return;
            }

            org.isCraniata = true;

            // Determine if organism belongs to Petromyzontida (lamprey) lineage or Myxini (hagfish) lineage
            if (typeof org.hasPetromyzontidaTrait === "undefined") {
                const isLamprey = (org.niche === "parasite" || (org.dna && (org.dna.parasiticAffinity || 0) > 0.32) || Math.random() < 0.45);
                org.hasPetromyzontidaTrait = isLamprey;
            }

            // 1. Chondrocranium (Cartilaginous Skull Case)
            if (typeof org.chondrocraniumIntegrity === "undefined") {
                const integGene = (org.dna && typeof org.dna.cranialIntegrity === "number") ?
                    0.40 + org.dna.cranialIntegrity * 0.58 : 0.65 + Math.random() * 0.30;
                org.chondrocraniumIntegrity = Math.max(0.40, Math.min(0.98, integGene));
            }
            if (typeof org.cranialArmorDefense === "undefined") {
                org.cranialArmorDefense = 0.40 + Math.random() * 0.32; // 0.35 - 0.75
            }

            // 2. Tripartite Cephalization & Olfactory Acuity
            if (typeof org.telencephalonSize === "undefined") {
                org.telencephalonSize = 1.0 + Math.random() * 0.5;
                org.mesencephalonSize = 0.8 + Math.random() * 0.4;
                org.rhombencephalonSize = 1.2 + Math.random() * 0.6;
            }
            if (typeof org.olfactoryAcuity === "undefined") {
                const olfGene = (org.dna && typeof org.dna.olfactoryGene === "number") ?
                    0.65 + org.dna.olfactoryGene * 0.33 : 0.68 + Math.random() * 0.28;
                org.olfactoryAcuity = Math.max(0.65, Math.min(0.98, olfGene));
            }

            // 3. Ventrolateral Slime Glands & Payload Reserve (Myxini / Boflar traits)
            if (typeof org.slimeGlandCount === "undefined") {
                org.slimeGlandCount = org.hasPetromyzontidaTrait ? 0 : Math.floor(75 + Math.random() * 70); // 70 - 150 pairs in hagfish
            }
            if (typeof org.slimeMaxPayload === "undefined") {
                org.slimeMaxPayload = org.hasPetromyzontidaTrait ? 0.0 : this.baseSlimeMaxPayload;
            }
            if (typeof org.slimePayload === "undefined") {
                org.slimePayload = org.hasPetromyzontidaTrait ? 0.0 : 40.0 + Math.random() * 55.0; // 0 - 100 mg
            }
            if (typeof org.slimeExpansionRatio === "undefined") {
                org.slimeExpansionRatio = org.hasPetromyzontidaTrait ? 0.0 : 350.0 + Math.random() * 420.0; // 300 - 800x
            }
            if (typeof org.isSlimeCloudActive === "undefined") {
                org.isSlimeCloudActive = false;
            }
            if (typeof org.slimeCloudTimer === "undefined") {
                org.slimeCloudTimer = 0.0;
            }
            if (typeof org.slimeCloudRadius === "undefined") {
                org.slimeCloudRadius = 0.0;
            }
            if (typeof org.predatorGillSuffocation === "undefined") {
                org.predatorGillSuffocation = false;
            }

            // 4. Petromyzontida Sucking Disc, Keratin Teeth & Tidal Respiration
            if (typeof org.buccalFunnelRadius === "undefined") {
                org.buccalFunnelRadius = 7.0 + Math.random() * 6.0; // 6 - 14 px
            }
            if (typeof org.parasiticTractionForce === "undefined") {
                org.parasiticTractionForce = 1.4 + Math.random() * 2.8; // 1.2 - 4.5 N
            }
            if (typeof org.isParasiticAttached === "undefined") {
                org.isParasiticAttached = false;
            }
            if (typeof org.hostTargetId === "undefined") {
                org.hostTargetId = null;
            }
            if (typeof org.parasiticAttachmentTimer === "undefined") {
                org.parasiticAttachmentTimer = 0.0;
            }
            if (typeof org.keratinTeethRows === "undefined") {
                org.keratinTeethRows = 3 + Math.floor(Math.random() * 3); // 3 - 5 rows
            }
            if (typeof org.keratinTeethSharpness === "undefined") {
                org.keratinTeethSharpness = 0.65 + Math.random() * 0.30; // 0.40 - 0.98
            }
            if (typeof org.keratinToothWearAccumulation === "undefined") {
                org.keratinToothWearAccumulation = 0.0;
            }
            if (typeof org.toothRenewalTimer === "undefined") {
                org.toothRenewalTimer = 120.0; // 120s replacement cycle
            }
            if (typeof org.lingualPistonRasps === "undefined") {
                org.lingualPistonRasps = 1.8 + Math.random() * 1.8; // 1.5 - 3.8 rasps/s
            }
            if (typeof org.lamphredinSecretionRate === "undefined") {
                org.lamphredinSecretionRate = 0.18 + Math.random() * 0.25; // 0.15 - 0.45 mg/s
            }
            if (typeof org.tidalGillPouches === "undefined") {
                org.tidalGillPouches = 7; // 7 pairs of branchial pouches
            }
            if (typeof org.tidalVentilationFrequency === "undefined") {
                org.tidalVentilationFrequency = 1.0 + Math.random() * 1.0; // 0.8 - 2.2 Hz
            }
            if (typeof org.tidalVentilationRate === "undefined") {
                org.tidalVentilationRate = 0.85;
            }
            if (typeof org.branchialAsphyxiationImmunity === "undefined") {
                org.branchialAsphyxiationImmunity = true;
            }

            // 5. Locomotion, Knotting & Scavenging
            if (typeof org.eelLikeUndulationVelocity === "undefined") {
                org.eelLikeUndulationVelocity = 1.50 + Math.random() * 1.50; // 1.40 - 3.10 px/tick
            }
            if (typeof org.bodyKnottingActive === "undefined") {
                org.bodyKnottingActive = false;
            }
            if (typeof org.knottingTimer === "undefined") {
                org.knottingTimer = 0.0;
            }
            if (typeof org.benthicScavengingRate === "undefined") {
                org.benthicScavengingRate = 0.22 + Math.random() * 0.35; // 0.20 - 0.60 mg/s
            }

            // 6. Telemetry Channels (% SCI & % OTI)
            if (typeof org.slimeDefenseCapacity === "undefined") {
                org.slimeDefenseCapacity = 0.0;
            }
            if (typeof org.oralSuctionTractionIndex === "undefined") {
                org.oralSuctionTractionIndex = 0.0;
            }
        }

        /**
         * Trigger defensive slime thread ejection upon harassment or bite.
         * @param {Object} org - Target craniate.
         * @param {Object|null} predator - Attacking organism entity.
         */
        triggerSlimeEjection(org, predator) {
            if (!org || !org.isCraniata || org.hasPetromyzontidaTrait) return;
            if (org.slimePayload < 6.0) return; // Depleted reserve

            const ejectedMg = Math.min(org.slimePayload, 12.0);
            org.slimePayload = Math.max(0.0, org.slimePayload - ejectedMg);

            org.isSlimeCloudActive = true;
            org.slimeCloudTimer = 4.5; // 4.5s persistence in water
            const expansionFactor = org.slimeExpansionRatio || 500.0;
            org.slimeCloudRadius = 32.0 + (expansionFactor / 800.0) * 32.0; // 32 - 64 px radius

            // Volumetric expansion in liters: (mg * expansionRatio) / 1000
            const expandedLiters = (ejectedMg * expansionFactor) / 1000.0;
            this.metrics.cumulativeSlimeExpandedLiters += expandedLiters;
            this.metrics.slimeEjectionEvents++;

            // Predator gill suffocation mechanic
            if (predator && predator.alive) {
                org.predatorGillSuffocation = true;
                predator.gillClogged = true;
                predator.gillCloggedTimer = 5.0; // 5.0s gill occlusion
                if (typeof predator.speedMultiplier === "number") {
                    predator.speedMultiplier = 0.35; // Severe slowdown
                }
                this.metrics.predatorGillSuffocations++;
            }

            // Mechanical shock deflection by chondrocranium & slime
            this.metrics.predatorDamageDeflections++;
        }

        /**
         * Trigger body knotting maneuver to escape mechanical grasp, tear food chunks or scrape off excess slime.
         * @param {Object} org - Craniate organism.
         */
        triggerBodyKnotting(org) {
            if (!org || !org.isCraniata) return;
            org.bodyKnottingActive = true;
            org.knottingTimer = 2.5; // 2.5s overhand knot execution
            this.metrics.bodyKnottingManeuvers++;
            this.metrics.predatorDamageDeflections++;
        }

        /**
         * Latch Petromyzontida oral sucking disc onto a pelagic host organism.
         * @param {Object} org - Parasitic lamprey craniate.
         * @param {Object} host - Target host organism.
         */
        attachToHost(org, host) {
            if (!org || !host || !org.hasPetromyzontidaTrait || org.isParasiticAttached) return;
            org.isParasiticAttached = true;
            org.hostTargetId = host.id || (Math.random() * 1000000 | 0);
            org.parasiticAttachmentTimer = 7.0 + Math.random() * 8.0; // 7-15s attachment
            this.metrics.parasiticLatchingEvents++;
        }

        /**
         * Detach oral disc from current host.
         * @param {Object} org - Craniate organism.
         */
        detachFromHost(org) {
            if (!org) return;
            org.isParasiticAttached = false;
            org.hostTargetId = null;
            org.parasiticAttachmentTimer = 0.0;
        }

        /**
         * Update craniate physiology, slime regeneration, oral latching, tidal respiration, and telemetry channels (% SCI & % OTI).
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         * @param {Array<Object>} allOrganisms - Array of all live organisms for host searches.
         */
        updateOrganism(org, dt, width, height, allOrganisms) {
            if (!org || !org.alive) return;
            if (typeof org.isCraniata === "undefined") {
                this.initOrganism(org);
            }
            if (!org.isCraniata) return;

            // 1. Slime payload synthesis (continuous basal regeneration in hagfish)
            if (!org.hasPetromyzontidaTrait && org.slimePayload < org.slimeMaxPayload) {
                const regenRate = 0.85; // mg/s protein thread synthesis
                org.slimePayload = Math.min(org.slimeMaxPayload, org.slimePayload + regenRate * dt);
            }

            // 2. Active Slime Cloud Decay
            if (org.isSlimeCloudActive) {
                org.slimeCloudTimer -= dt;
                if (org.slimeCloudTimer <= 0.0) {
                    org.isSlimeCloudActive = false;
                    org.slimeCloudTimer = 0.0;
                    org.predatorGillSuffocation = false;
                }
            }

            // 3. Body Knotting Decay
            if (org.bodyKnottingActive) {
                org.knottingTimer -= dt;
                if (org.knottingTimer <= 0.0) {
                    org.bodyKnottingActive = false;
                    org.knottingTimer = 0.0;
                }
            }

            // 4. Petromyzontida Oral Sucking Disc, Parasitic Feeding & Host Tethering
            if (org.hasPetromyzontidaTrait) {
                // A. Search for potential hosts if not attached
                if (!org.isParasiticAttached && Array.isArray(allOrganisms) && Math.random() < 0.08) {
                    for (let j = 0; j < allOrganisms.length; j++) {
                        const candidate = allOrganisms[j];
                        if (!candidate || !candidate.alive || candidate === org || candidate.isCraniata) continue;
                        const dx = candidate.x - org.x;
                        const dy = candidate.y - org.y;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < 1600.0) { // within 40 px
                            this.attachToHost(org, candidate);
                            break;
                        }
                    }
                }

                // B. Active Parasitic Feeding & Deriving Energy
                if (org.isParasiticAttached) {
                    org.parasiticAttachmentTimer -= dt;

                    // Tongue rasping & lamphredin anticoagulant action
                    const raspEnergy = org.lingualPistonRasps * org.lamphredinSecretionRate * dt * 1.5;
                    org.energy = Math.min(160.0, (org.energy || 50.0) + raspEnergy);
                    this.metrics.cumulativeHematophagicEnergyDrawn += raspEnergy;

                    // Keratin tooth wear accumulation
                    org.keratinToothWearAccumulation += 0.006 * dt;
                    org.keratinTeethSharpness = Math.max(0.35, org.keratinTeethSharpness - 0.003 * dt);

                    // Tidal gill pouch ventilation accelerates under feeding suction
                    org.tidalVentilationRate = 1.65;

                    if (org.parasiticAttachmentTimer <= 0.0) {
                        this.detachFromHost(org);
                    }
                } else {
                    org.tidalVentilationRate = 0.85;
                }

                // C. Keratin Tooth Renewal Cycle (120s shedding and germinal tooth eruption)
                org.toothRenewalTimer -= dt;
                if (org.toothRenewalTimer <= 0.0) {
                    org.keratinTeethSharpness = 0.78 + Math.random() * 0.20;
                    org.keratinToothWearAccumulation = 0.0;
                    org.toothRenewalTimer = 120.0;
                    this.metrics.toothRenewalEvents++;
                }
            }

            // 5. Benthic Necrophagy / Scavenging near seabed
            if (org.y >= height * 0.65) {
                const scavengingGain = org.benthicScavengingRate * dt;
                if (typeof org.energy === "number") {
                    org.energy = Math.min(150.0, org.energy + scavengingGain * 0.45);
                }
                this.metrics.cumulativeScavengedBiomass += scavengingGain;
                if (Math.random() < 0.05) {
                    this.metrics.benthicScavengingEvents++;
                }
            }

            // 6. Random harassment triggering defense / knotting
            if (!org.hasPetromyzontidaTrait && !org.isSlimeCloudActive && Math.random() < 0.0035) {
                this.triggerSlimeEjection(org, null);
            }
            if (!org.bodyKnottingActive && Math.random() < 0.0020) {
                this.triggerBodyKnotting(org);
            }

            // 7. 101st Telemetry Channel: Slime Defense Capacity Index (% SCI)
            const payloadRatio = Math.min(1.0, Math.max(0.0, org.slimePayload / (org.slimeMaxPayload || 100.0)));
            const chondroRatio = Math.min(1.0, Math.max(0.0, org.chondrocraniumIntegrity));
            const expRatio = Math.min(1.0, Math.max(0.0, ((org.slimeExpansionRatio || 500.0) - 300.0) / 500.0));
            const olfRatio = Math.min(1.0, Math.max(0.0, org.olfactoryAcuity));
            const rawSCI = (payloadRatio * 0.35 + chondroRatio * 0.30 + expRatio * 0.20 + olfRatio * 0.15) * 100.0;
            org.slimeDefenseCapacity = Math.min(100.0, Math.max(0.0, rawSCI));

            // 8. 102nd Telemetry Channel: Oral Suction & Parasitic Traction Index (% OTI)
            // Formulation:
            // - Oral Suction Traction Force Ratio: %35 weight (1.2 - 4.5 N range)
            // - Keratin Teeth Sharpness Ratio: %30 weight (0.40 - 0.98 range)
            // - Tidal Ventilation Respiration Flux: %20 weight (0.8 - 2.2 Hz range)
            // - Lamphredin Anticoagulant Secretion Rate: %15 weight (0.15 - 0.45 mg/s range)
            const tractionRatio = Math.min(1.0, Math.max(0.0, (org.parasiticTractionForce || 2.8) / 4.5));
            const toothRatio = Math.min(1.0, Math.max(0.0, org.keratinTeethSharpness || 0.85));
            const tidalRatio = Math.min(1.0, Math.max(0.0, ((org.tidalVentilationFrequency || 1.4) - 0.8) / 1.4));
            const lamphredinRatio = Math.min(1.0, Math.max(0.0, ((org.lamphredinSecretionRate || 0.28) - 0.15) / 0.30));

            const rawOTI = (tractionRatio * 0.35 + toothRatio * 0.30 + tidalRatio * 0.20 + lamphredinRatio * 0.15) * 100.0;
            org.oralSuctionTractionIndex = Math.min(100.0, Math.max(0.0, rawOTI));
        }

        /**
         * Batch update all organisms and compute aggregate craniata metrics.
         * @param {Array<Object>} organisms - Live organism entities.
         * @param {number} dt - Time delta in seconds.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         */
        updateAll(organisms, dt, width, height) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let craniataCount = 0;
            let sumChondro = 0.0;
            let sumArmor = 0.0;
            let sumSCI = 0.0;
            let sumOTI = 0.0;
            let sumPayload = 0.0;
            let sumGlands = 0;
            let sumExpansion = 0.0;
            let sumOlfactory = 0.0;
            let sumScavenging = 0.0;
            let sumUndulation = 0.0;
            let sumTraction = 0.0;
            let sumTeethSharpness = 0.0;
            let sumTidalRate = 0.0;
            let activeClouds = 0;
            let activeAttached = 0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, dt, width, height, organisms);

                if (org.isCraniata) {
                    craniataCount++;
                    sumChondro += org.chondrocraniumIntegrity || 0.0;
                    sumArmor += org.cranialArmorDefense || 0.0;
                    sumSCI += org.slimeDefenseCapacity || 0.0;
                    sumOTI += org.oralSuctionTractionIndex || 0.0;
                    sumPayload += org.slimePayload || 0.0;
                    sumGlands += org.slimeGlandCount || 0;
                    sumExpansion += org.slimeExpansionRatio || 0.0;
                    sumOlfactory += org.olfactoryAcuity || 0.0;
                    sumScavenging += org.benthicScavengingRate || 0.0;
                    sumUndulation += org.eelLikeUndulationVelocity || 0.0;
                    sumTraction += org.parasiticTractionForce || 0.0;
                    sumTeethSharpness += org.keratinTeethSharpness || 0.0;
                    sumTidalRate += org.tidalVentilationFrequency || 0.0;

                    if (org.isSlimeCloudActive) activeClouds++;
                    if (org.isParasiticAttached) activeAttached++;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalCraniataOrganisms = craniataCount;
            this.metrics.craniataPrevalence = liveCount > 0 ? (craniataCount / liveCount) * 100.0 : 0.0;
            this.metrics.meanChondrocraniumIntegrity = craniataCount > 0 ? (sumChondro / craniataCount) : 0.85;
            this.metrics.meanCranialArmorDefense = craniataCount > 0 ? (sumArmor / craniataCount) : 0.55;
            this.metrics.meanSlimeDefenseCapacity = craniataCount > 0 ? (sumSCI / craniataCount) : 0.0;
            this.metrics.meanOralSuctionTractionIndex = craniataCount > 0 ? (sumOTI / craniataCount) : 0.0;
            this.metrics.meanSlimePayload = craniataCount > 0 ? (sumPayload / craniataCount) : 65.0;
            this.metrics.meanSlimeGlandCount = craniataCount > 0 ? (sumGlands / craniataCount) : 110;
            this.metrics.meanSlimeExpansionRatio = craniataCount > 0 ? (sumExpansion / craniataCount) : 500.0;
            this.metrics.meanOlfactoryAcuity = craniataCount > 0 ? (sumOlfactory / craniataCount) : 0.82;
            this.metrics.meanBenthicScavengingRate = craniataCount > 0 ? (sumScavenging / craniataCount) : 0.38;
            this.metrics.meanEelUndulationVelocity = craniataCount > 0 ? (sumUndulation / craniataCount) : 2.10;
            this.metrics.meanParasiticTractionForce = craniataCount > 0 ? (sumTraction / craniataCount) : 2.8;
            this.metrics.meanKeratinTeethSharpness = craniataCount > 0 ? (sumTeethSharpness / craniataCount) : 0.85;
            this.metrics.meanTidalVentilationRate = craniataCount > 0 ? (sumTidalRate / craniataCount) : 1.4;
            this.metrics.activeSlimeCloudCount = activeClouds;
            this.metrics.activeParasiticAttachments = activeAttached;
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
         * @returns {Object} Comprehensive Craniata metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CraniataSlimeManager;
    }
    if (typeof global !== "undefined") {
        global.CraniataSlimeManager = CraniataSlimeManager;
        global.craniataSlimeManager = new CraniataSlimeManager();
    }
})(typeof window !== "undefined" ? window : global);
