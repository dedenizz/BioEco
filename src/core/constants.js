// BioEcosystem - Core Simulation Constants & Parameters
// Module: src/core/constants.js
// Version: 4.81.0 (Hour 201 - Lead Planner Modular Architecture)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    const SimulationConstants = {
        VERSION: "4.81.0",
        EPOCH: 16,
        TARGET_FPS: 60,
        
        // Carrying Capacity Boundaries
        BASE_CARRYING_CAPACITY: 120,
        PEAK_CARRYING_CAPACITY: 231,
        COMPLETE_DIGESTIVE_BUFFER: 6,
        
        // Fluid & Physics Dynamics
        VISCOSITY: 0.982,
        DRIFT_FORCE: 0.045,
        COLLISION_RESTITUTION: 0.65,
        
        // Thermodynamic & Metabolic Defaults
        BASAL_METABOLIC_RATE: 0.012,
        PHOTOSYNTHESIS_EFFICIENCY: 1.45,
        ALIMENTARY_ASSIMILATION_MAX: 0.95,
        
        // Scientific Palette Definitions
        PALETTES: {
            HERBIVORE: "#10b981",
            CARNIVORE: "#ef4444",
            SCAVENGER: "#f59e0b",
            APEX_PREDATOR: "#8b5cf6",
            VASCULAR_HEMOCYANIN: "#0284c7",
            VASCULAR_HEMOGLOBIN: "#dc2626",
            NEPHRIDIAL_FLAME: "#06b6d4",
            GASTRIC_ACID: "#ea580c",
            ENTERIC_BRUSH: "#10b981",
            STATOCYST_CRYSTAL: "#e0e7ff",
            OCELLI_PIGMENT: "#6366f1"
        }
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SimulationConstants;
    } else {
        global.SimulationConstants = SimulationConstants;
    }
})(typeof window !== "undefined" ? window : global);
