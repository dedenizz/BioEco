// BioEcosystem - Genetic Allele Definitions, Loci Bounds & Mutation Schema
// Module: src/genetics/dna_definitions.js
// Version: 5.41.0 (Hour 261 - Lead Planner: Epoch 22 Siphon Jet Propulsion Alleles)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    const GeneticDefinitions = {
        // Core Allele Loci Definitions and Bounds
        loci: {
            speed: { min: 0.5, max: 3.5, defaultVal: 1.2, mutationStep: 0.15 },
            size: { min: 3.0, max: 12.0, defaultVal: 6.0, mutationStep: 0.3 },
            sight: { min: 30.0, max: 180.0, defaultVal: 75.0, mutationStep: 5.0 },
            diet: { min: 0.0, max: 1.0, defaultVal: 0.5, mutationStep: 0.05 },
            hue: { min: 0, max: 360, defaultVal: 180, mutationStep: 15 },
            immunity: { min: 0.05, max: 0.95, defaultVal: 0.30, mutationStep: 0.05 },
            symbiosisAffinity: { min: 0.0, max: 1.0, defaultVal: 0.15, mutationStep: 0.05 },
            thermalHardiness: { min: 0.05, max: 0.95, defaultVal: 0.20, mutationStep: 0.05 },
            plasmidRecombination: { min: 0.05, max: 0.95, defaultVal: 0.15, mutationStep: 0.05 },
            packHunting: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            chemotaxisSensitivity: { min: 0.05, max: 0.95, defaultVal: 0.35, mutationStep: 0.05 },
            endolithicAffinity: { min: 0.05, max: 0.95, defaultVal: 0.15, mutationStep: 0.05 },
            detritivoreAffinity: { min: 0.05, max: 0.95, defaultVal: 0.20, mutationStep: 0.05 },
            benthicDragTolerance: { min: 0.05, max: 0.95, defaultVal: 0.25, mutationStep: 0.05 },
            vortexHarvesting: { min: 0.05, max: 0.95, defaultVal: 0.20, mutationStep: 0.05 },
            planktonSwarmAffinity: { min: 0.05, max: 0.95, defaultVal: 0.25, mutationStep: 0.05 },
            planktonGrazingRate: { min: 0.1, max: 1.0, defaultVal: 0.50, mutationStep: 0.05 },
            bioenergeticPartitioning: { min: 0.1, max: 0.9, defaultVal: 0.50, mutationStep: 0.05 },
            locomotionCadence: { min: 0.1, max: 0.9, defaultVal: 0.45, mutationStep: 0.05 },
            flagellarMotorTorque: { min: 0.1, max: 1.0, defaultVal: 0.45, mutationStep: 0.05 },
            protonMotiveForce: { min: 0.1, max: 1.0, defaultVal: 0.50, mutationStep: 0.05 },
            autoinducerSynthesis: { min: 0.0, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            quorumResponseThreshold: { min: 0.2, max: 1.5, defaultVal: 0.65, mutationStep: 0.05 },
            epsSecretaseEfficiency: { min: 0.05, max: 1.0, defaultVal: 0.30, mutationStep: 0.05 },
            sessileAdhesionAffinity: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            endosymbiontRetention: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            organelleMetabolicSynergy: { min: 0.1, max: 1.5, defaultVal: 0.50, mutationStep: 0.05 },
            cadherinAdhesionExpression: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            epithelialCohesion: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            basalLaminaDensity: { min: 0.0, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            gastrulationInvagination: { min: 0.0, max: 1.0, defaultVal: 0.15, mutationStep: 0.05 },
            coelenteronCapacity: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            synapticConductance: { min: 0.0, max: 1.0, defaultVal: 0.12, mutationStep: 0.05 },
            actionPotentialThreshold: { min: 0.2, max: 0.8, defaultVal: 0.45, mutationStep: 0.05 },
            anteriorCephalization: { min: 0.0, max: 1.0, defaultVal: 0.15, mutationStep: 0.05 },
            tentacleContractility: { min: 0.0, max: 1.0, defaultVal: 0.18, mutationStep: 0.05 },
            mesodermDifferentiation: { min: 0.0, max: 1.0, defaultVal: 0.16, mutationStep: 0.05 },
            coelomTurgorElasticity: { min: 0.05, max: 1.0, defaultVal: 0.22, mutationStep: 0.05 },
            peristalticCoordination: { min: 0.05, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            burrowingExcavationPower: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            pulsatileVesselContractility: { min: 0.05, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            hemolymphPerfusionAffinity: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            respiratoryPigmentAffinity: { min: 0.0, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            hypoxiaTolerance: { min: 0.1, max: 1.0, defaultVal: 0.35, mutationStep: 0.05 },
            metanephridialFiltrationRate: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            osmoregulatoryCapacity: { min: 0.05, max: 1.0, defaultVal: 0.28, mutationStep: 0.05 },
            throughGutTransitRate: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.05 },
            enzymaticCleavageEfficiency: { min: 0.05, max: 1.0, defaultVal: 0.30, mutationStep: 0.05 },
            gastricAcidSecretion: { min: 0.05, max: 1.0, defaultVal: 0.30, mutationStep: 0.05 },
            entericAbsorptionAffinity: { min: 0.05, max: 1.0, defaultVal: 0.35, mutationStep: 0.05 },
            statocystGeoreception: { min: 0.0, max: 2.0, defaultVal: 0.25, mutationStep: 0.08 },
            rhopaliaEquilibriumCadence: { min: 0.1, max: 2.0, defaultVal: 0.40, mutationStep: 0.08 },
            bioluminescenceEmission: { min: 0.0, max: 2.5, defaultVal: 0.20, mutationStep: 0.1 },
            luciferinSynthesisRate: { min: 0.0, max: 2.5, defaultVal: 0.30, mutationStep: 0.1 },
            photophoreDensity: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            phototaxisAffinity: { min: 0.0, max: 2.0, defaultVal: 0.30, mutationStep: 0.08 },
            cuticleCalcificationRate: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            scleriteHardness: { min: 0.1, max: 1.0, defaultVal: 0.20, mutationStep: 0.05 },
            articularElasticity: { min: 0.1, max: 1.5, defaultVal: 0.40, mutationStep: 0.08 },

            // Ecdysis Molting Cycle & Saltatory Growth (System Agent v4.97.0)
            ecdysteroidCadence: { min: 0.1, max: 2.0, defaultVal: 0.6, mutationStep: 0.08 },
            ecdysisGrowthSurge: { min: 0.05, max: 1.5, defaultVal: 0.5, mutationStep: 0.06 },
            softCuticleVulnerability: { min: 0.2, max: 2.0, defaultVal: 1.0, mutationStep: 0.1 },

            // Chemical Trail Signaling & Colonial Sociality (Epoch 18 - Lead Planner v5.01.0)
            pheromoneEmissionRate: { min: 0.0, max: 2.5, defaultVal: 0.2, mutationStep: 0.1 },
            pheromoneSensitivity: { min: 0.0, max: 2.5, defaultVal: 0.3, mutationStep: 0.1 },
            colonialAffinity: { min: 0.0, max: 2.0, defaultVal: 0.25, mutationStep: 0.08 },

            // Social Caste Differentiation & Trophallaxis (Epoch 18 - System Agent v5.07.0)
            socialCasteBias: { min: 0.0, max: 3.0, defaultVal: 1.0, mutationStep: 0.15 },
            trophallaxisAffinity: { min: 0.0, max: 2.0, defaultVal: 0.35, mutationStep: 0.1 },

            // Dynamic Camouflage & Chromatophores (Epoch 19 - Lead Planner v5.11.0)
            chromatophoreExpansionRate: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            crypticMatchingSensitivity: { min: 0.0, max: 2.5, defaultVal: 0.30, mutationStep: 0.1 },
            iridophoreReflectance: { min: 0.0, max: 2.0, defaultVal: 0.20, mutationStep: 0.08 },

            // Structural Iridescence & Guanine Platelets (Epoch 19 - System Agent v5.17.0)
            iridophorePlateletDensity: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            guanineReflectance: { min: 0.0, max: 2.5, defaultVal: 0.30, mutationStep: 0.1 },
            countershadingBias: { min: 0.0, max: 2.0, defaultVal: 0.35, mutationStep: 0.08 },

            // Chemoautotrophy & Deep-Sea Barotolerance (Epoch 20 - Lead Planner v5.21.0)
            chemoautotrophyAffinity: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            barotolerance: { min: 0.0, max: 2.5, defaultVal: 0.30, mutationStep: 0.1 },
            sulfurMetabolism: { min: 0.0, max: 2.0, defaultVal: 0.20, mutationStep: 0.08 },

            // Diel Vertical Migration & Buoyancy Vacuoles (Epoch 21 - Lead Planner v5.31.0)
            gasVacuoleRatio: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            lipidDensity: { min: 0.0, max: 2.0, defaultVal: 0.30, mutationStep: 0.08 },
            dielMigrationSensitivity: { min: 0.0, max: 2.5, defaultVal: 0.35, mutationStep: 0.1 },

            // Ventral Counter-Illumination & Photophore Arrays (Epoch 21 - System Agent v5.37.0)
            ventralPhotophoreDensity: { min: 0.0, max: 2.5, defaultVal: 0.25, mutationStep: 0.1 },
            counterIlluminationAccuracy: { min: 0.0, max: 2.5, defaultVal: 0.30, mutationStep: 0.1 },

            // Siphon Jet Propulsion & Elastic Mantle Cavity (Epoch 22 - Lead Planner v5.41.0)
            mantleElasticity: { min: 0.05, max: 1.0, defaultVal: 0.30, mutationStep: 0.08 },
            siphonApertureRatio: { min: 0.10, max: 1.0, defaultVal: 0.35, mutationStep: 0.08 },
            jetPulseCadence: { min: 0.10, max: 1.0, defaultVal: 0.40, mutationStep: 0.08 },
            hyponomeSteering: { min: 0.05, max: 1.0, defaultVal: 0.25, mutationStep: 0.08 }
        },

        // Helper to mutate an allele value within bounded limits
        mutateAllele: function(val, min, max, step, rate) {
            if (Math.random() > rate) return val;
            const delta = (Math.random() * 2 - 1) * step;
            return Math.max(min, Math.min(max, val + delta));
        },

        // Construct a default genome object initialized with default values
        createDefaultGenome: function() {
            const genome = {};
            const lociKeys = Object.keys(this.loci);
            for (let i = 0; i < lociKeys.length; i++) {
                const k = lociKeys[i];
                genome[k] = this.loci[k].defaultVal;
            }
            return genome;
        },

        // Validate and clamp all alleles in an organism DNA object
        validateGenome: function(dna) {
            if (!dna || typeof dna !== "object") return this.createDefaultGenome();
            const lociKeys = Object.keys(this.loci);
            for (let i = 0; i < lociKeys.length; i++) {
                const k = lociKeys[i];
                const def = this.loci[k];
                if (typeof dna[k] !== "number" || !Number.isFinite(dna[k])) {
                    dna[k] = def.defaultVal;
                } else {
                    dna[k] = Math.max(def.min, Math.min(def.max, dna[k]));
                }
            }
            return dna;
        },

        // Clone and apply point mutations across all loci for asexual or sexual reproduction
        cloneAndMutate: function(parentDna, mutationRate) {
            const childDna = {};
            const lociKeys = Object.keys(this.loci);
            const rate = typeof mutationRate === "number" ? mutationRate : 0.08;

            for (let i = 0; i < lociKeys.length; i++) {
                const k = lociKeys[i];
                const def = this.loci[k];
                const parentVal = (parentDna && typeof parentDna[k] === "number") ? parentDna[k] : def.defaultVal;
                childDna[k] = this.mutateAllele(parentVal, def.min, def.max, def.mutationStep, rate);
            }
            return childDna;
        },

        // Calculate genetic diversity metric across active population
        calculateDiversity: function(organisms, locusKey) {
            if (!Array.isArray(organisms) || organisms.length < 2) return 0.0;
            const key = locusKey || "ventralPhotophoreDensity";
            let sum = 0.0;
            let validCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (o && o.alive && o.dna && typeof o.dna[key] === "number") {
                    sum += o.dna[key];
                    validCount++;
                }
            }
            if (validCount < 2) return 0.0;
            const mean = sum / validCount;
            let varianceSum = 0.0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (o && o.alive && o.dna && typeof o.dna[key] === "number") {
                    const diff = o.dna[key] - mean;
                    varianceSum += diff * diff;
                }
            }
            return Number(Math.sqrt(varianceSum / validCount).toFixed(4));
        }
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = GeneticDefinitions;
    } else {
        global.GeneticDefinitions = GeneticDefinitions;
    }
})(typeof window !== "undefined" ? window : global);
