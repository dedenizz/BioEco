// BioEcosystem - Genetic Loci & Allele Definitions
// Module: src/genetics/dna_definitions.js
// Version: 4.82.0 (Hour 202 - System Agent Sensory Genetics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    const GeneticDefinitions = {
        // Core metazoan gene loci schema
        METAZOAN_LOCI: {
            // Locomotion & Morphology
            flagellaCount: { min: 1, max: 6, defaultVal: 1, mutationStep: 0.2 },
            somiteCount: { min: 3, max: 12, defaultVal: 4, mutationStep: 0.5 },
            burrowingPeristalsisCadence: { min: 0.2, max: 2.5, defaultVal: 1.0, mutationStep: 0.1 },

            // Cardiovascular Organogenesis (Epoch 13)
            vascularContractilityRate: { min: 0.1, max: 3.0, defaultVal: 1.0, mutationStep: 0.15 },
            respiratoryPigmentAffinity: { min: 0.2, max: 2.0, defaultVal: 1.0, mutationStep: 0.1 },

            // Metanephridial Excretion (Epoch 14)
            podocyteSlitDensity: { min: 0.3, max: 2.5, defaultVal: 1.0, mutationStep: 0.1 },
            tubularReabsorptionRate: { min: 0.2, max: 2.2, defaultVal: 1.0, mutationStep: 0.12 },

            // Macro Digestive System (Epoch 15)
            throughGutMorphogenesis: { min: 0.0, max: 1.0, defaultVal: 0.8, mutationStep: 0.05 },
            gastricAcidSecretase: { min: 0.1, max: 3.0, defaultVal: 1.2, mutationStep: 0.1 },
            microvilliBrushBorderDensity: { min: 0.2, max: 2.8, defaultVal: 1.5, mutationStep: 0.15 },

            // Sensory Organogenesis: Statocysts, Rhopalia & Phototaxis (Epoch 16)
            statocystSensoryDensity: { min: 0.0, max: 2.5, defaultVal: 0.0, mutationStep: 0.1 },
            rhopaliaEquilibriumCadence: { min: 0.1, max: 2.0, defaultVal: 0.5, mutationStep: 0.08 },
            gravitaxisAffinity: { min: -1.0, max: 1.0, defaultVal: 0.0, mutationStep: 0.1 },
            rheotacticSensitivity: { min: 0.0, max: 2.0, defaultVal: 0.5, mutationStep: 0.1 },
            ocelliPhototaxisSensitivity: { min: 0.0, max: 3.0, defaultVal: 0.0, mutationStep: 0.15 }
        },

        // Helper to mutate an allele value within bounded limits
        mutateAllele: function(val, min, max, step, rate) {
            if (Math.random() > rate) return val;
            const delta = (Math.random() * 2 - 1) * step;
            return Math.max(min, Math.min(max, val + delta));
        }
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = GeneticDefinitions;
    } else {
        global.GeneticDefinitions = GeneticDefinitions;
    }
})(typeof window !== "undefined" ? window : global);
