// BioEcosystem - Epibenthic Seston Filtration & Suspension Feeding Kinetics
// Module: src/organs/seston_filtration.js
// Version: 6.97.0 (Hour 417 - System Agent: Silt Cleansing Twitches, Retractile Sheaths & BCF Kinetics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SestonFiltrationManager
     * High-fidelity biological simulation of epibenthic suspension feeding:
     * - Epibenthic boundary layer (BBL / seston stratum, y: 435 - 480 px) positioning
     * - Dilation of ciliated seston capture tentacles with adaptive angle orientation
     * - Silt fouling accumulation and periodic ciliary cleansing twitches sloughing off debris
     * - Contractile retractile tentacle sheaths mitigating high-shear hydrodynamic trauma
     * - Interception and metabolic assimilation of settling organic carbon before sediment burial
     * - Precursor calculations for 79th Channel (% SFE) and 80th Channel (% BCF - Benthic Carbon Flux)
     */
    class SestonFiltrationManager {
        constructor() {
            this.sedimentSurfaceY = 480.0;
            this.bblUpperThreshold = 435.0;
            this.baseCurrentVelocity = 0.42;
            this.maxTentacleSpan = 18.0;
            this.sestonEnergyYield = 0.048;
            this.shearStressThreshold = 0.75;

            this.metrics = {
                totalLiveCells: 0,
                totalEpibenthicCells: 0,
                epibenthicPrevalence: 0.0,
                meanTentacleSpan: 0.0,
                meanCiliaryVelocity: 0.0,
                meanCarbonAssimilation: 0.0,
                meanShearTolerance: 0.0,
                meanSiltFouling: 0.0,
                meanSheathIntegrity: 0.0,
                meanSFEIndex: 0.0,
                meanBCFIndex: 0.0,
                activeFilterFeeders: 0,
                cleansingTwitchEvents: 0,
                shearTraumaCount: 0,
                interceptedSestonCarbon: 0.0,
                ciliaryAtpProduced: 0.0,
                shearDeflectionEvents: 0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            const dna = org.dna || {};
            const genes = dna.genes || {};

            const filterAffinity = (genes.filterFeeding || genes.sestonAffinity || genes.ciliaStrength || 0.35);
            const resilience = (genes.membraneResilience || genes.structuralIntegrity || 0.40);
            const metabolicEff = (genes.metabolicEfficiency || 0.50);

            org.sestonCaptureTentacles = Math.min(12.0, Math.max(2.0, Math.round(filterAffinity * 14.0)));
            org.tentacleSpan = 0.0;
            org.ciliaryCurrentVelocity = 0.0;
            org.suspendedCarbonAssimilation = 0.0;
            org.hydrodynamicShearTolerance = Math.min(1.0, Math.max(0.15, resilience * 1.25));
            org.retractileTentacleSheath = Math.min(1.0, Math.max(0.20, resilience * 1.35));
            org.siltFoulingAccumulation = 0.0;
            org.ciliaryCleansingCooldown = 0;
            org.cleansingTwitchActive = false;
            org.adaptiveAngleOrientation = 0.0;
            org.shearTrauma = 0.0;
            org.sestonFiltrationIndex = 0.0;
            org.benthicCarbonFluxIndex = 0.0;
            org.isEpibenthicFiltering = false;
            org.shearDeflection = false;
            org.isSheathRetracted = false;
            org.filterFeedingAdapted = filterAffinity > 0.42;
        }

        updateOrganism(org, dt, env) {
            if (!org || !org.isAlive) return;

            if (org.sestonCaptureTentacles === undefined) {
                SestonFiltrationManager.initOrganism(org);
            }

            const currentY = org.y !== undefined ? org.y : (org.pos ? org.pos.y : 300.0);
            const inBBLZone = currentY >= this.bblUpperThreshold && currentY < this.sedimentSurfaceY;

            if (inBBLZone && org.filterFeedingAdapted) {
                org.isEpibenthicFiltering = true;

                // Relative depth factor in BBL stratum
                const bblDepthRatio = (currentY - this.bblUpperThreshold) / (this.sedimentSurfaceY - this.bblUpperThreshold);

                // Hydrodynamic current pulses & shear stress
                const currentPulse = Math.sin((org.x || 0) * 0.03 + (org.y || 0) * 0.02) * 0.25 + this.baseCurrentVelocity;
                const shearStress = currentPulse / (org.hydrodynamicShearTolerance + 0.1);

                // Adaptive orientation to incoming bottom current
                const currentAngle = Math.atan2(0.18, currentPulse);
                org.adaptiveAngleOrientation = currentAngle + Math.PI * 0.5;

                // Retractile Sheath defense against current tearing
                if (shearStress > this.shearStressThreshold) {
                    org.shearDeflection = true;
                    if (org.retractileTentacleSheath >= 0.45) {
                        org.isSheathRetracted = true;
                        org.tentacleSpan = Math.max(1.5, org.tentacleSpan * 0.75);
                    } else {
                        org.isSheathRetracted = false;
                        const trauma = (shearStress - this.shearStressThreshold) * 0.08;
                        org.energy = Math.max(0.0, (org.energy || 50.0) - trauma);
                        org.shearTrauma = trauma;
                        this.metrics.shearTraumaCount++;
                    }
                    this.metrics.shearDeflectionEvents++;
                } else {
                    org.shearDeflection = false;
                    org.isSheathRetracted = false;
                    org.shearTrauma = 0.0;
                    org.tentacleSpan = Math.min(this.maxTentacleSpan, org.tentacleSpan + 0.4);
                }

                // Silt fouling accumulation on ciliary surfaces
                const spanRatio = org.tentacleSpan / this.maxTentacleSpan;
                org.siltFoulingAccumulation = Math.min(1.0, org.siltFoulingAccumulation + 0.0032 * spanRatio);

                // Periodic ciliary cleansing twitch
                if (org.ciliaryCleansingCooldown > 0) {
                    org.ciliaryCleansingCooldown--;
                    org.cleansingTwitchActive = false;
                } else if (org.siltFoulingAccumulation > 0.55) {
                    org.cleansingTwitchActive = true;
                    org.siltFoulingAccumulation = Math.max(0.05, org.siltFoulingAccumulation - 0.50);
                    org.ciliaryCleansingCooldown = 50;
                    org.energy = Math.max(0.0, (org.energy || 50.0) - 0.025);
                    this.metrics.cleansingTwitchEvents++;
                }

                // Ciliary suction current penalized by fouling
                const foulingFriction = Math.max(0.2, 1.0 - (org.siltFoulingAccumulation * 0.65));
                org.ciliaryCurrentVelocity = spanRatio * 0.85 * foulingFriction * (org.isSheathRetracted ? 0.25 : 1.0);

                // Interception and assimilation of suspended organic seston
                const sestonConcentration = 1.2 + Math.sin(bblDepthRatio * Math.PI) * 0.8;
                const capturedCarbon = spanRatio * org.ciliaryCurrentVelocity * sestonConcentration * this.sestonEnergyYield;

                org.suspendedCarbonAssimilation = capturedCarbon;
                org.energy = Math.min(org.maxEnergy || 200.0, (org.energy || 50.0) + capturedCarbon);

                this.metrics.interceptedSestonCarbon += capturedCarbon;
                this.metrics.ciliaryAtpProduced += capturedCarbon;

                // 79th Channel Precursor: Seston Filtration Efficiency (% SFE)
                org.sestonFiltrationIndex = (
                    spanRatio * 0.35 +
                    (org.ciliaryCurrentVelocity / 0.85) * 0.30 +
                    Math.min(1.0, capturedCarbon / 0.06) * 0.20 +
                    org.hydrodynamicShearTolerance * 0.15
                );

                // 80th Channel Precursor: Benthic Carbon Flux Interception (% BCF)
                // Composite: 40% carbon captured, 25% tentacle span, 20% fouling cleanliness, 15% sheath protection
                org.benthicCarbonFluxIndex = Math.min(1.0, (
                    Math.min(1.0, capturedCarbon / 0.045) * 0.40 +
                    spanRatio * 0.25 +
                    (1.0 - org.siltFoulingAccumulation) * 0.20 +
                    org.retractileTentacleSheath * 0.15
                ));
            } else {
                org.isEpibenthicFiltering = false;
                org.shearDeflection = false;
                org.isSheathRetracted = false;
                org.cleansingTwitchActive = false;
                org.tentacleSpan = Math.max(0.0, (org.tentacleSpan || 0.0) - 0.6);
                org.ciliaryCurrentVelocity = Math.max(0.0, (org.ciliaryCurrentVelocity || 0.0) - 0.08);
                org.suspendedCarbonAssimilation = 0.0;
                org.siltFoulingAccumulation = Math.max(0.0, (org.siltFoulingAccumulation || 0.0) - 0.01);
                org.sestonFiltrationIndex = org.tentacleSpan > 0 ? (org.tentacleSpan / this.maxTentacleSpan) * 0.15 : 0.0;
                org.benthicCarbonFluxIndex = 0.0;
            }
        }

        updateAll(organisms, dt, env) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let liveCount = 0;
            let epibenthicCount = 0;
            let activeFilters = 0;

            let sumSpan = 0.0;
            let sumCiliary = 0.0;
            let sumCarbon = 0.0;
            let sumShear = 0.0;
            let sumFouling = 0.0;
            let sumSheath = 0.0;
            let sumSFE = 0.0;
            let sumBCF = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.isAlive) continue;

                liveCount++;
                this.updateOrganism(org, dt, env);

                if (org.filterFeedingAdapted) epibenthicCount++;
                if (org.isEpibenthicFiltering && org.tentacleSpan > 3.0) activeFilters++;

                sumSpan += (org.tentacleSpan || 0.0);
                sumCiliary += (org.ciliaryCurrentVelocity || 0.0);
                sumCarbon += (org.suspendedCarbonAssimilation || 0.0);
                sumShear += (org.hydrodynamicShearTolerance || 0.0);
                sumFouling += (org.siltFoulingAccumulation || 0.0);
                sumSheath += (org.retractileTentacleSheath || 0.0);
                sumSFE += (org.sestonFiltrationIndex || 0.0);
                sumBCF += (org.benthicCarbonFluxIndex || 0.0);
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalEpibenthicCells = epibenthicCount;
            this.metrics.epibenthicPrevalence = liveCount > 0 ? (epibenthicCount / liveCount) : 0.0;
            this.metrics.meanTentacleSpan = liveCount > 0 ? (sumSpan / liveCount) : 0.0;
            this.metrics.meanCiliaryVelocity = liveCount > 0 ? (sumCiliary / liveCount) : 0.0;
            this.metrics.meanCarbonAssimilation = liveCount > 0 ? (sumCarbon / liveCount) : 0.0;
            this.metrics.meanShearTolerance = liveCount > 0 ? (sumShear / liveCount) : 0.0;
            this.metrics.meanSiltFouling = liveCount > 0 ? (sumFouling / liveCount) : 0.0;
            this.metrics.meanSheathIntegrity = liveCount > 0 ? (sumSheath / liveCount) : 0.0;
            this.metrics.meanSFEIndex = liveCount > 0 ? (sumSFE / liveCount) : 0.0;
            this.metrics.meanBCFIndex = liveCount > 0 ? (sumBCF / liveCount) : 0.0;
            this.metrics.activeFilterFeeders = activeFilters;
        }

        step(organisms, tick) {
            this.updateAll(organisms, 0.016, null);
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SestonFiltrationManager;
    }
    if (typeof global !== "undefined") {
        global.SestonFiltrationManager = SestonFiltrationManager;
        global.sestonFiltrationManager = new SestonFiltrationManager();
    }
})(typeof window !== "undefined" ? window : global);
