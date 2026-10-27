// BioEcosystem - Echinoderm Stereom Endoskeleton, Calcite Spines & Pedicellariae Mechanics
// Module: src/organs/echinoderm_pedicellariae.js
// Version: 7.27.0 (Hour 447 - System Agent: Spine Regeneration, Venomous Pedicellariae & % PDR Core)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EchinodermPedicellariaeManager
     * High-fidelity biological simulation of echinoderm stereom endoskeleton, articulated spines, and pedicellariae:
     * - Stereom Porous Lattice: Mesodermal 3D trabecular micro-porous calcite dissipating fracture energy
     * - Ball-and-Socket Calcite Spines: Articulated spines anchored on tubercles with 360-degree mobility
     * - Mechanical Spine Fractures & Stumps: High-stress impacts snapping rigid spines into broken stumps
     * - Axial Calcite Regeneration: Mineral and ATP mobilization to regrow broken spines from basal tubercles
     * - Globiferous Pedicellariae Venom Glands: Neurotoxin-injecting pincer heads inflicting paralytic deterrence
     * - Venom Synthesis & Gland Exhaustion: Metabolic protein synthesis tax and temporary chemical defense depletion
     * - Epibiont Parasite Blooms & Papulae Suffocation: Biofilm encrustation occluding dermal respiratory papulae
     * - Lightweight Mineral Efficiency: Porous trabeculae cutting calcium metabolic maintenance by 45%
     * - 85th Channel (% SPI - Stereom Protection Index) and 86th Channel (% PDR - Pedicellariae Deterrence Ratio)
     */
    class EchinodermPedicellariaeManager {
        constructor() {
            this.nominalPorosity = 0.52; // 52% baseline micro-pore volume in stereom trabeculae
            this.baseSpineDeterrence = 0.65; // Baseline puncture deflection multiplier
            this.basePincerCleansingRate = 0.22; // Baseline epibiont crushing rate per second
            this.baseSpineRegenSpeed = 0.08; // Baseline axial spine regrowth speed (spines / sec)
            this.baseVenomRechargeSpeed = 0.25; // Baseline neurotoxin recharging rate per second

            this.metrics = {
                totalLiveCells: 0,
                totalStereomOrganisms: 0,
                stereomPrevalence: 0.0,
                meanStereomLattice: 0.0,
                meanCalciteSpines: 0.0,
                meanBrokenSpines: 0.0,
                meanPedicellariaeCount: 0.0,
                meanNeurotoxinPayload: 0.0,
                meanVenomExhaustion: 0.0,
                meanImpactDamping: 0.0,
                meanPincerSnapRate: 0.0,
                meanCleaningEfficiency: 0.0,
                meanDermalImpairment: 0.0,
                meanProtectionIndex: 0.0,
                meanDeterrenceRatio: 0.0,
                activeSpineDeflections: 0,
                spineFractureEvents: 0,
                spineRegenerationEvents: 0,
                pincerSnappingEvents: 0,
                venomInjectionEvents: 0,
                parasiteEradicationEvents: 0,
                dermalSuffocationEvents: 0,
                punctureDamageEvents: 0
            };
        }

        /**
         * Initialize stereom endoskeleton, spines, venom glands, and pedicellariae on organism entity.
         * @param {Object} org - Organism entity.
         */
        initOrganism(org) {
            if (!org) return;

            // Competence check: Echinoderms, calcified lineages, or benthic hard-substrate dwellers
            const isCompetent = org.hasStereom || org.isEchinoderm ||
                (org.dna && ((org.dna.stereomLatticeAffinity || 0) > 0.30 || (org.dna.calcificationAffinity || 0) > 0.38)) ||
                (org.y >= 340.0 && Math.random() < 0.25);

            if (typeof org.hasStereom === "undefined") {
                org.hasStereom = isCompetent;
            }

            if (!org.hasStereom) {
                org.stereomProtectionIndex = 0.0;
                org.pedicellariaeDeterrenceRatio = 0.0;
                org.calciteSpinesCount = 0;
                org.brokenSpinesCount = 0;
                org.pedicellariaePincerCount = 0;
                org.neurotoxinPayload = 0.0;
                org.dermalGasExchangeImpairment = 0.0;
                return;
            }

            // 1. Stereom porous micro-lattice density [0.35 - 0.75 porosity]
            if (typeof org.stereomPorousLattice === "undefined") {
                const basePoro = (org.dna && typeof org.dna.stereomPorosity === "number") ?
                    org.dna.stereomPorosity : 0.52;
                org.stereomPorousLattice = Math.max(0.35, Math.min(0.75, basePoro));
            }

            // Fracture energy dissipation & impact damping coefficient [0.30 - 0.70]
            if (typeof org.impactDampingCoefficient === "undefined") {
                org.impactDampingCoefficient = 0.35 + org.stereomPorousLattice * 0.40;
            }

            // 2. Calcite Spines with Ball-and-Socket Joint articulation [8 - 32 spines]
            if (typeof org.calciteSpinesCount === "undefined") {
                const spineGene = (org.dna && typeof org.dna.spineDensity === "number") ?
                    Math.round(org.dna.spineDensity * 28.0) : 16;
                org.calciteSpinesCount = Math.max(8, Math.min(32, spineGene));
            }

            // Broken spine stumps from predatory trauma or mechanical shear [0 to calciteSpinesCount]
            if (typeof org.brokenSpinesCount === "undefined") {
                org.brokenSpinesCount = 0;
            }

            // Axial spine regeneration fractional progress [0.0 - 1.0]
            if (typeof org.spineRegenProgress === "undefined") {
                org.spineRegenProgress = 0.0;
            }

            // Spine physical elongation [6.0 - 24.0 px]
            if (typeof org.spineLength === "undefined") {
                org.spineLength = 10.0 + Math.random() * 8.0;
            }

            // Ball-joint angular mobility [0.4 - 0.95 radians sweep]
            if (typeof org.spineBallJointMobility === "undefined") {
                org.spineBallJointMobility = 0.75;
            }

            // Puncture strike deterrence force [0.30 - 2.0 N]
            if (typeof org.punctureDeterrenceForce === "undefined") {
                org.punctureDeterrenceForce = 0.85;
            }

            // 3. Pedicellariae Grooming & Defense Micro-Pincers [10 - 50 pincers]
            if (typeof org.pedicellariaePincerCount === "undefined") {
                const pincerGene = (org.dna && typeof org.dna.pedicellariaeDensity === "number") ?
                    Math.round(org.dna.pedicellariaeDensity * 45.0) : 24;
                org.pedicellariaePincerCount = Math.max(10, Math.min(50, pincerGene));
            }

            // Pincer snapping trigger velocity [0.25 - 0.90]
            if (typeof org.pincerSnappingVelocity === "undefined") {
                org.pincerSnappingVelocity = 0.65;
            }

            // Epibiont parasite eradication efficiency [0.30 - 0.95]
            if (typeof org.epibiontCleaningEfficiency === "undefined") {
                org.epibiontCleaningEfficiency = 0.70;
            }

            // Epibiont fouling load on organism surface [0.0 - 1.0]
            if (typeof org.epibiontFoulingLevel === "undefined") {
                org.epibiontFoulingLevel = 0.0;
            }

            // Dermal branchiae (respiratory papulae) gas exchange occlusion [0.0 - 1.0]
            if (typeof org.dermalGasExchangeImpairment === "undefined") {
                org.dermalGasExchangeImpairment = 0.0;
            }

            // 4. Globiferous Pedicellariae Venom Glands & Neurotoxin Payload
            if (typeof org.venomousPedicellariaeGland === "undefined") {
                org.venomousPedicellariaeGland = true;
            }
            if (typeof org.maxNeurotoxinCapacity === "undefined") {
                org.maxNeurotoxinCapacity = 20.0 + (org.dna ? (org.dna.size || 8.0) * 1.5 : 12.0);
            }
            if (typeof org.neurotoxinPayload === "undefined") {
                org.neurotoxinPayload = org.maxNeurotoxinCapacity;
            }
            if (typeof org.venomExhaustionLevel === "undefined") {
                org.venomExhaustionLevel = 0.0;
            }

            // Target threat tracking angle for oriented spine pointing
            if (typeof org.spineOrientAngle === "undefined") {
                org.spineOrientAngle = 0.0;
            }

            // Telemetry indices
            if (typeof org.stereomProtectionIndex === "undefined") {
                org.stereomProtectionIndex = 0.0;
            }
            if (typeof org.pedicellariaeDeterrenceRatio === "undefined") {
                org.pedicellariaeDeterrenceRatio = 0.0;
            }
        }

        /**
         * Update individual echinoderm stereom armor, spine fracture/regeneration, venom injection, and pedicellariae.
         * @param {Object} org - Organism entity.
         * @param {number} dt - Time delta in seconds.
         * @param {Array<Object>} organisms - Array of live organisms for proximity defense audits.
         */
        updateOrganism(org, dt, organisms) {
            if (!org || !org.alive) return;
            this.initOrganism(org);

            if (!org.hasStereom) {
                org.stereomProtectionIndex = 0.0;
                org.pedicellariaeDeterrenceRatio = 0.0;
                return;
            }

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const orgSize = org.dna ? (org.dna.size || 8.0) : 8.0;

            // 1. Proximity Threat Auditing & Spine Orientation (Ball-and-Socket Joint Mechanics)
            // Spines swivel on tubercles toward incoming carnivorous threats
            let closestThreatDist = Infinity;
            let threatAngle = 0.0;
            let activeThreat = null;

            if (Array.isArray(organisms)) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const other = organisms[i];
                    if (!other || !other.alive || other === org) continue;
                    if (other.niche !== "carnivore") continue;

                    const dx = other.x - org.x;
                    const dy = other.y - org.y;
                    const d = Math.hypot(dx, dy);

                    if (d < orgSize * 3.4 && d < closestThreatDist) {
                        closestThreatDist = d;
                        threatAngle = Math.atan2(dy, dx);
                        activeThreat = other;
                    }
                }
            }

            const intactSpines = Math.max(0, org.calciteSpinesCount - (org.brokenSpinesCount || 0));

            // Swivel spines toward detected predator threat
            if (activeThreat) {
                const angleDelta = threatAngle - (org.spineOrientAngle || 0.0);
                org.spineOrientAngle += angleDelta * 0.28 * (org.spineBallJointMobility || 0.75);

                // Calcite spine puncture deterrence against biting attacker
                if (closestThreatDist < orgSize * 1.6 + (org.spineLength || 10.0)) {
                    this.metrics.activeSpineDeflections++;

                    // Counter-puncture damage reflected back into predator using intact spines
                    const spineCoverageRatio = intactSpines / Math.max(1, org.calciteSpinesCount);
                    const counterDamage = 0.18 * (intactSpines / 20.0) * (org.punctureDeterrenceForce || 0.85) * effDt * 60.0;
                    activeThreat.energy = Math.max(1.0, activeThreat.energy - counterDamage);
                    this.metrics.punctureDamageEvents++;

                    // Repulsion impulse pushing predator away
                    const pushForce = 0.20 * (org.punctureDeterrenceForce || 0.85) * spineCoverageRatio;
                    activeThreat.vx = (activeThreat.vx || 0) + Math.cos(threatAngle) * pushForce;
                    activeThreat.vy = (activeThreat.vy || 0) + Math.sin(threatAngle) * pushForce;

                    // High-stress impact: risk of rigid calcite spine snapping into broken stump
                    if (Math.random() < 0.12 && intactSpines > 2 && (org.brokenSpinesCount || 0) < org.calciteSpinesCount - 1) {
                        org.brokenSpinesCount = (org.brokenSpinesCount || 0) + 1;
                        this.metrics.spineFractureEvents++;
                    }

                    if (Math.random() < 0.08 && typeof addRipple === "function") {
                        addRipple(org.x, org.y, 148, 163, 184);
                    }
                }
            } else {
                // Ambient slow radial undulation
                org.spineOrientAngle = ((org.spineOrientAngle || 0.0) + 0.012 * effDt * 60.0) % (Math.PI * 2);
            }

            // 2. Axial Calcite Spine Regeneration
            // Regenerate broken spine stumps via calcium mineral and ATP mobilization
            if ((org.brokenSpinesCount || 0) > 0 && org.energy && org.alive) {
                const regenSpeed = this.baseSpineRegenSpeed * (org.dna ? (org.dna.metabolicEfficiency || 1.0) : 1.0);
                org.spineRegenProgress = (org.spineRegenProgress || 0.0) + regenSpeed * effDt;

                // Mineral and metabolic cost of synthesizing replacement calcite
                const regenTax = 0.005 * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - regenTax);

                if (org.spineRegenProgress >= 1.0) {
                    org.brokenSpinesCount = Math.max(0, org.brokenSpinesCount - 1);
                    org.spineRegenProgress = 0.0;
                    this.metrics.spineRegenerationEvents++;
                }
            }

            // 3. Globiferous Pedicellariae Venom Injection & Paralytic Defense
            if (activeThreat && closestThreatDist < orgSize * 1.8 && org.venomousPedicellariaeGland) {
                if ((org.neurotoxinPayload || 0.0) > 1.5) {
                    const venomDose = Math.min(org.neurotoxinPayload, 4.0 * effDt * 60.0);
                    org.neurotoxinPayload = Math.max(0.0, org.neurotoxinPayload - venomDose);
                    this.metrics.venomInjectionEvents++;

                    // Paralytic neurotoxic deterrence: depletes predator stamina and slows motility
                    activeThreat.energy = Math.max(1.0, activeThreat.energy - venomDose * 1.35);
                    activeThreat.vx = (activeThreat.vx || 0) * 0.65;
                    activeThreat.vy = (activeThreat.vy || 0) * 0.65;

                    this.metrics.pincerSnappingEvents++;
                } else {
                    // Mechanical bite only when venom glands are exhausted
                    const pincerBite = 0.06 * (org.pedicellariaePincerCount / 25.0) * (org.pincerSnappingVelocity || 0.65) * effDt * 60.0;
                    activeThreat.energy = Math.max(1.0, activeThreat.energy - pincerBite);
                    this.metrics.pincerSnappingEvents++;
                }
            }

            // 4. Venom Gland Recharging & Synthesis Metabolic Tax
            const maxVenom = org.maxNeurotoxinCapacity || 25.0;
            if ((org.neurotoxinPayload || 0.0) < maxVenom && org.energy && org.alive) {
                const rechargeAmount = this.baseVenomRechargeSpeed * effDt * 60.0;
                org.neurotoxinPayload = Math.min(maxVenom, (org.neurotoxinPayload || 0.0) + rechargeAmount);

                // Protein and peptide metabolic synthesis tax
                const venomTax = 0.006 * effDt * 60.0;
                org.energy = Math.max(1.0, org.energy - venomTax);
            }
            org.venomExhaustionLevel = Math.max(0.0, Math.min(1.0, 1.0 - (org.neurotoxinPayload / maxVenom)));

            // 5. Pedicellariae Grooming & Epibiont Parasite Eradication
            // Microscopic 3-jawed pincers actively snap to crush encrusting fouling
            org.epibiontFoulingLevel = Math.min(1.0, (org.epibiontFoulingLevel || 0.0) + 0.0007 * effDt * 60.0);

            const snapActivity = (org.pedicellariaePincerCount / 30.0) * (org.pincerSnappingVelocity || 0.65);
            const cleansedAmount = this.basePincerCleansingRate * (org.epibiontCleaningEfficiency || 0.70) * snapActivity * effDt * 60.0;

            if (org.epibiontFoulingLevel > 0.04) {
                org.epibiontFoulingLevel = Math.max(0.0, org.epibiontFoulingLevel - cleansedAmount);
                this.metrics.pincerSnappingEvents++;

                if (org.epibiontFoulingLevel <= 0.08) {
                    this.metrics.parasiteEradicationEvents++;
                }
            }

            // 6. Epibiont Encrustation & Dermal Papulae Respiratory Suffocation
            if (org.epibiontFoulingLevel > 0.30) {
                org.dermalGasExchangeImpairment = Math.min(1.0, (org.epibiontFoulingLevel - 0.30) / 0.55);
                const hypoxiaLoss = 0.014 * org.dermalGasExchangeImpairment * effDt * 60.0;
                if (org.energy && org.alive) {
                    org.energy = Math.max(1.0, org.energy - hypoxiaLoss);
                }
                this.metrics.dermalSuffocationEvents++;
            } else {
                org.dermalGasExchangeImpairment = 0.0;
                // High surface hygiene yields 15% respiratory and metabolic vitality dividend
                if (org.epibiontFoulingLevel < 0.12 && org.energy && org.alive) {
                    org.energy = Math.min(100.0, org.energy + 0.008 * effDt * 60.0);
                }
            }

            // 7. Lightweight Stereom Mineral Efficiency
            // 3D trabecular micro-porosity reduces heavy calcium maintenance tax
            const skeletalMaintenance = 0.004 * (1.0 - (org.stereomPorousLattice || 0.52) * 0.45) * effDt * 60.0;
            if (org.energy && org.alive) {
                org.energy = Math.max(1.0, org.energy - skeletalMaintenance);
            }

            // 8. Channel 85: Stereom Protection Index (% SPI) Formulation
            // Combines porous damping, intact spine density, ball-joint mobility, and clean hygiene
            const dampingScore = Math.min(1.0, (org.impactDampingCoefficient || 0.45) / 0.65);
            const spineScore = Math.min(1.0, intactSpines / 28.0);
            const pincerScore = Math.min(1.0, (org.pedicellariaePincerCount || 24) / 40.0);
            const hygieneScore = Math.max(0.0, 1.0 - (org.epibiontFoulingLevel || 0.0));

            org.stereomProtectionIndex = Math.max(0.0, Math.min(1.0,
                (dampingScore * 0.30) + (spineScore * 0.25) + (pincerScore * 0.25) + (hygieneScore * 0.20)
            ));

            // 9. Channel 86: Pedicellariae Deterrence Ratio (% PDR) Formulation
            // Combines venom potency, snapping readiness, spine integrity, and parasite eradication
            const venomScore = Math.min(1.0, (org.neurotoxinPayload || 0.0) / maxVenom);
            const snapScore = Math.min(1.0, (org.pincerSnappingVelocity || 0.65) / 0.85);
            const spineIntegScore = Math.max(0.0, intactSpines / Math.max(1, org.calciteSpinesCount));
            const cleanScore = org.epibiontCleaningEfficiency || 0.70;

            org.pedicellariaeDeterrenceRatio = Math.max(0.0, Math.min(1.0,
                (venomScore * 0.30) + (snapScore * 0.25) + (spineIntegScore * 0.25) + (cleanScore * 0.20)
            ));
        }

        /**
         * Update all organisms across the ecosystem.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} dt - Time delta in seconds.
         */
        updateAll(organisms, dt) {
            if (!Array.isArray(organisms)) return;

            let liveCount = 0;
            let stereomCount = 0;
            let sumLattice = 0.0;
            let sumSpines = 0;
            let sumBrokenSpines = 0;
            let sumPincers = 0;
            let sumNeurotoxin = 0.0;
            let sumVenomExhaustion = 0.0;
            let sumDamping = 0.0;
            let sumSnapRate = 0.0;
            let sumCleanEff = 0.0;
            let sumDermalImpair = 0.0;
            let sumSPI = 0.0;
            let sumPDR = 0.0;

            const effDt = Math.max(0.001, Math.min(0.1, dt || 0.016));
            const len = organisms.length;

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                liveCount++;

                this.updateOrganism(org, effDt, organisms);

                if (org.hasStereom) {
                    stereomCount++;
                    sumLattice += (org.stereomPorousLattice || 0.0);
                    sumSpines += (org.calciteSpinesCount || 0);
                    sumBrokenSpines += (org.brokenSpinesCount || 0);
                    sumPincers += (org.pedicellariaePincerCount || 0);
                    sumNeurotoxin += (org.neurotoxinPayload || 0.0);
                    sumVenomExhaustion += (org.venomExhaustionLevel || 0.0);
                    sumDamping += (org.impactDampingCoefficient || 0.0);
                    sumSnapRate += (org.pincerSnappingVelocity || 0.0);
                    sumCleanEff += (org.epibiontCleaningEfficiency || 0.0);
                    sumDermalImpair += (org.dermalGasExchangeImpairment || 0.0);
                    sumSPI += (org.stereomProtectionIndex || 0.0);
                    sumPDR += (org.pedicellariaeDeterrenceRatio || 0.0);
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalStereomOrganisms = stereomCount;
            this.metrics.stereomPrevalence = liveCount > 0 ? (stereomCount / liveCount) : 0.0;
            this.metrics.meanStereomLattice = stereomCount > 0 ? (sumLattice / stereomCount) : 0.0;
            this.metrics.meanCalciteSpines = stereomCount > 0 ? (sumSpines / stereomCount) : 0.0;
            this.metrics.meanBrokenSpines = stereomCount > 0 ? (sumBrokenSpines / stereomCount) : 0.0;
            this.metrics.meanPedicellariaeCount = stereomCount > 0 ? (sumPincers / stereomCount) : 0.0;
            this.metrics.meanNeurotoxinPayload = stereomCount > 0 ? (sumNeurotoxin / stereomCount) : 0.0;
            this.metrics.meanVenomExhaustion = stereomCount > 0 ? (sumVenomExhaustion / stereomCount) : 0.0;
            this.metrics.meanImpactDamping = stereomCount > 0 ? (sumDamping / stereomCount) : 0.0;
            this.metrics.meanPincerSnapRate = stereomCount > 0 ? (sumSnapRate / stereomCount) : 0.0;
            this.metrics.meanCleaningEfficiency = stereomCount > 0 ? (sumCleanEff / stereomCount) : 0.0;
            this.metrics.meanDermalImpairment = stereomCount > 0 ? (sumDermalImpair / stereomCount) : 0.0;
            this.metrics.meanProtectionIndex = stereomCount > 0 ? (sumSPI / stereomCount) : 0.0;
            this.metrics.meanDeterrenceRatio = stereomCount > 0 ? (sumPDR / stereomCount) : 0.0;
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
         * @returns {Object} Comprehensive stereom & pedicellariae metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EchinodermPedicellariaeManager;
    }
    if (typeof global !== "undefined") {
        global.EchinodermPedicellariaeManager = EchinodermPedicellariaeManager;
        global.echinodermPedicellariaeManager = new EchinodermPedicellariaeManager();
    }
})(typeof window !== "undefined" ? window : global);
