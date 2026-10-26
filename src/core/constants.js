// BioEcosystem - Core Simulation Constants & Parameters
// Module: src/core/constants.js
// Version: 7.00.0 (Hour 420 - Executive Director: Epoch 37 Seston Jubilee, Peak 345+ & 80-Channel Milestone)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    const SimulationConstants = {
        VERSION: "7.06.0",
        EPOCH: 38,
        HISTORIC_MILESTONE_HOURS: 426,
        TARGET_FPS: 60,
        
        // Carrying Capacity Boundaries & Historic Milestone Expansions
        BASE_CARRYING_CAPACITY: 120,
        PEAK_CARRYING_CAPACITY: 345,
        COMPLETE_DIGESTIVE_BUFFER: 6,
        SENSORY_INTEGRATION_BUFFER: 6,
        EXOSKELETON_ARMOR_BUFFER: 6,
        COLONIAL_HIVE_BUFFER: 6,
        CAMOUFLAGE_BUFFER: 6,
        ABYSSAL_VENT_BUFFER: 5,
        JET_PROPULSION_BUFFER: 5,
        BIOGENIC_REEF_BUFFER: 5,
        CEPHALOPOD_INTELLIGENCE_BUFFER: 5,
        COEVOLUTION_COMMUNITY_BUFFER: 5,
        CLIMATE_CIRCULATION_BUFFER: 5,
        BIOGEOCHEMICAL_CYCLE_BUFFER: 5,
        CALCIFICATION_BARRIER_BUFFER: 5,
        BALEEN_MEGAFAUNA_BUFFER: 5,
        BENTHIC_BURROWING_BUFFER: 5,
        BIOELECTRIC_FIELD_BUFFER: 5,
        HYDRODYNAMIC_LATERAL_BUFFER: 5,
        PHOTOPHORE_BIOLUMINESCENCE_BUFFER: 5,
        ABYSSAL_BENTHOS_BUFFER: 5,
        INFAUNAL_BIOTURBATION_BUFFER: 5,
        SESTON_FILTRATION_BUFFER: 5,
        TOTAL_TELEMETRY_CHANNELS: 81,
        
        // Fluid & Physics Dynamics
        VISCOSITY: 0.982,
        DRIFT_FORCE: 0.045,
        COLLISION_RESTITUTION: 0.65,
        
        // Thermodynamic & Metabolic Defaults
        BASAL_METABOLIC_RATE: 0.012,
        PHOTOSYNTHESIS_EFFICIENCY: 1.45,
        CHEMOSYNTHESIS_EFFICIENCY: 1.85,
        CARNIVORE_FEEDING_EFFICIENCY: 0.88,
        SCAVENGER_EFFICIENCY: 0.92,
        
        // Life Cycle Limits
        MAX_AGE_HERBIVORE: 3600,
        MAX_AGE_CARNIVORE: 4200,
        MAX_AGE_SCAVENGER: 4800,
        REPRODUCTION_COOLDOWN: 180,
        
        // Organic Membrane & Kinematics
        MEMBRANE_ELASTICITY: 0.78,
        PSEUDOPOD_RETRACTION_RATE: 0.12,
        CILIA_PROPULSION_FACTOR: 1.35,
        
        // Visual Field & Microscopic Zoom Defaults
        DEFAULT_ZOOM: 1.0,
        MIN_ZOOM: 0.4,
        MAX_ZOOM: 2.8,
        MICROSCOPE_VIGNETTE_INTENSITY: 0.35,
        CHROMATIC_ABERRATION_BASE: 0.85,
        
        // Sensory & Neural Network Dimensions
        NEURAL_INPUT_SIZE: 12,
        NEURAL_HIDDEN_SIZE: 16,
        NEURAL_OUTPUT_SIZE: 6,
        SYNAPTIC_WEIGHT_MUTATION_RATE: 0.04,
        
        // Environmental Mineral Reef Constants
        REEF_POROSITY_DEFAULT: 0.62,
        CALCIUM_CARBONATE_SATURATION: 1.15,
        REEF_SPATIAL_GRID_STEP: 40,
        
        // Epoch 22: Hydrodynamic Jet Propulsion
        JET_PROPULSION_THRUST_MULTIPLIER: 2.8,
        JET_PROPULSION_ATP_COST: 0.08,
        JET_PROPULSION_COOLDOWN_TICKS: 45,
        MANTLE_CAVITY_VOLUME_BASE: 1.0,
        
        // Epoch 23: Abyssal Hydrothermal Vents
        VENT_PLUME_THERMAL_CORE: 380,
        VENT_HYDROGEN_SULFIDE_CONCENTRATION: 0.95,
        VENT_MINERAL_PRECIPITATION_RATE: 0.025,
        CHEMOSYNTHETIC_ATP_YIELD_MAX: 2.4,
        
        // Epoch 24: Biogenic Framework Reefs
        ARAGONITE_ACCRETION_RATE: 0.035,
        BIOEROSION_RESISTANCE_FACTOR: 1.45,
        FRAMEWORK_POROSITY_MIN: 0.40,
        FRAMEWORK_POROSITY_MAX: 0.85,
        REEF_COMPLEXITY_INDEX_MAX: 1.0,
        
        // Epoch 25: Cephalopod Neural Cephalization
        NEURAL_GANGLIA_DENSITY_MAX: 1.0,
        LEARNING_PLASTICITY_COEFFICIENT: 0.08,
        DYNAMIC_CAMOUFLAGE_PIGMENT_SPEED: 0.15,
        TACTILE_PREHENSION_GRIP_MAX: 1.25,
        COGNITIVE_MAP_RESOLUTION_GRID: 24,

        // Epoch 26: Coevolutionary Arms Race & Dynamic Niches
        RED_QUEEN_MUTATION_ACCELERATION: 1.15,
        TOXIN_RESISTANCE_COEFFICIENT: 0.85,
        TROPHIC_FEEDBACK_COUPLING_FACTOR: 0.72,
        MIMICRY_ACCURACY_THRESHOLD: 0.80,
        SYMBIOSIS_AFFINITY_SCALE: 1.20,

        // Epoch 27: Climate Circulation & Pelagic Thermohaline Dynamics
        THERMOHALINE_CONVEYOR_SPEED: 0.065,
        UPWELLING_NUTRIENT_FLUX: 1.85,
        DOWNWELLING_OXYGEN_EXPORT: 1.40,
        EQUATORIAL_THERMAL_RETENTION: 1.25,
        POLAR_STRATIFICATION_DAMPING: 0.78,

        // Epoch 28: Global Biogeochemical Cycling
        GLOBAL_CARBON_EXPORT_RATIO: 0.28,
        REMINERALIZATION_RATE: 0.042,
        NITROGEN_FIXATION_CONSTANT: 0.035,
        DENITRIFICATION_EQUILIBRIUM: 0.018,
        ALKALINITY_CARBONATE_BUFFER: 2.35,

        // Epoch 29: Biomineral Calcification Barriers
        ARAGONITE_SATURATION_HORIZON: 3.2,
        CALCITE_COMPENSATION_DEPTH: 420,
        SHELL_METABOLIC_PENALTY_FACTOR: 0.015,
        ACIDIFICATION_EROSION_COEFFICIENT: 0.028,
        CARBONATE_AFFINITY_EXPONENT: 1.42,

        // Epoch 30: Megafauna Biomass Dynamics
        K_STRATEGY_GESTATION_PERIOD: 450,
        WHALE_FALL_ORGANIC_PULSE_ATLAS: 650,
        FILTER_SWEEP_AREA_MAX: 180,
        ONTOGENETIC_EXPONENT: 0.75,
        BALEEN_EFFICIENCY_ASYMPTOTE: 0.94,

        // Epoch 31: Benthic Sediment Infaunal Infiltration
        SEDIMENT_BOUNDARY_DEPTH: 320,
        SEDIMENT_VISCOSITY_MULTIPLIER: 3.4,
        HYDRAULIC_PROBOSCIS_PENETRATION_RATE: 0.045,
        INTERSTITIAL_DETRITUS_ENERGY_DENSITY: 0.85,
        REDOX_POTENTIAL_DISCONTINUITY_DEPTH: 360,

        // Epoch 32: Lateral Mechanoreception & Electroreception
        LATERAL_LINE_NEUROMAST_DENSITY: 1.0,
        DERMAL_DENTICLE_DRAG_REDUCTION_MAX: 0.28,
        LAMINAR_SHEAR_VORTEX_THRESHOLD: 0.45,
        ELECTRORECEPTIVE_AMPULLARY_SENSITIVITY: 1.25,
        PRESSURE_WAVE_PROPAGATION_SPEED: 2.8,

        // Epoch 33: Hydrodynamic Lateral Sensing & Electro-Location
        CUPULA_DEFLECTION_SENSITIVITY: 1.4,
        VORTEX_WAKE_DECAY_RATE: 0.035,
        ELECTROGENIC_DIPOLE_MOMENT_MAX: 2.2,
        HYDRODYNAMIC_WALL_REPULSION: 0.85,
        RHEOTACTIC_ALIGNMENT_TORQUE: 0.05,

        // Epoch 34: Pelagic Photophore Symbiosis & Bioluminescent Emission
        PHOTOPHORE_LUCIFERIN_REGENERATION_RATE: 0.018,
        COUNTER_ILLUMINATION_ATTENUATION_COEFFICIENT: 0.0035,
        PHOTORECEPTOR_LIGHT_BLEACHING_THRESHOLD: 0.85,
        FLASH_REFLEX_BURST_FORCE: 4.5,
        BACTERIAL_SYMBIOSIS_EXCHANGE_RATIO: 0.12,

        // Epoch 35: Abyssal Benthic Hadal Trench & Piezophilic Adaptations
        HADAL_TRENCH_DEPTH_START: 380,
        HYDROSTATIC_PRESSURE_GRADIENT: 0.0085,
        PUFA_DESATURATION_METABOLIC_COST: 0.009,
        TMAO_PIEZOLYTE_SYNTHESIS_ATP: 0.025,
        PIEZOPHILE_CHEMOSYNTHESIS_MULTIPLIER: 2.1,
        BENTHIC_SEDIMENT_ANCHOR_MAX_FORCE: 2.4,
        BARORESISTANT_PUMP_EFFICIENCY_BASE: 0.90,
        DECOMPRESSION_BUFFER_ZONE_DEPTH: 260,
        DECOMPRESSION_TRAUMA_DAMAGE_RATE: 0.035,
        DECOMPRESSION_TURGOR_STRAIN_LIMIT: 0.65,
        OSMOLYTE_RECYCLING_EFFICIENCY: 0.60,
        DETACHMENT_SURGE_IMPULSE: 3.2
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SimulationConstants;
    }
    if (typeof global !== "undefined") {
        global.SimulationConstants = SimulationConstants;
    }
})(typeof window !== "undefined" ? window : global);
