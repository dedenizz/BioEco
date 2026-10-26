// BioEcosystem - Buoyancy Vacuoles & Hydrostatic Vertical Migration Engine
// Module: src/organs/buoyancy_vacuoles.js
// Version: 5.32.0 (Hour 252 - System Agent: Gas Vacuole & Lipid Ballast Engine)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BuoyancyVacuoleSystem
     * Advanced hydrostatic engine modeling:
     * - Proteinaceous gas vesicles (GvpA/GvpC aerotopes) and active gas secretion
     * - Intracellular lipid droplets (wax esters / triglycerides) for pressure-proof ballast
     * - Boyle law hydrostatic compression and Archimedean buoyant lift calculations
     * - Circadian diel vertical migration (DVM) with day/night bathymetric refuge seeking
     * - Trophic surface feeding boosts and mesopelagic predator avoidance bonuses
     */
    class BuoyancyVacuoleSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.gasVacuoleRatio = typeof dna.gasVacuoleRatio === "number" ? dna.gasVacuoleRatio : 0.25;
            this.lipidDensity = typeof dna.lipidDensity === "number" ? dna.lipidDensity : 0.30;
            this.dielSensitivity = typeof dna.dielMigrationSensitivity === "number" ? dna.dielMigrationSensitivity : 0.35;
            this.barotolerance = typeof dna.barotolerance === "number" ? dna.barotolerance : 0.30;

            // Gas vacuole and lipid substrate pools
            this.gasVolume = 6.0;                  // Internal gas vesicle volume [0.0 - 20.0]
            this.maxGasCapacity = 20.0;            // Maximum gas inflation ceiling
            this.lipidReserves = 8.0;              // Neutral buoyancy lipid pool [0.0 - 25.0]
            this.maxLipidCapacity = 25.0;          // Maximum lipid storage ceiling

            // Hydrostatic equilibrium and vertical migration state
            this.currentBuoyancyForce = 0.0;       // Net vertical buoyant acceleration [-0.18 to +0.18]
            this.neutralDepthTarget = 300.0;       // Target depth of neutral equilibrium [50.0 - 550.0 px]
            this.isMigratingUp = false;            // Nocturnal ascent towards epipelagic photic layer
            this.isMigratingDown = false;          // Diurnal descent towards twilight mesopelagic refuge
            this.verticalVelocityMod = 0.0;        // Applied buoyancy modifier to host vy

            // Trophic & Survival Modifiers
            this.dvmFeedingBonus = 0.0;            // Ingestion rate multiplier from surface night grazing
            this.dvmRefugeActive = false;          // Twilight predator avoidance status

            // Sampling and regulation cadence
            this.lastSampleTick = 0;
            this.sampleCadence = 6;                // Regulate gas and hydrostatic forces every 6 frames
        }

        /**
         * Regulate intracellular gas vesicle inflation and lipid accumulation using cellular ATP.
         * @param {number} targetDepth - Desired bathymetric depth.
         * @param {number} dt - Delta time step.
         */
        regulateGas(targetDepth, dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const depthError = org.y - targetDepth; // Positive: organism is deeper than target (needs lift)

            if (depthError > 15.0 && org.energy > 8.0) {
                // Active gas secretion into proteinaceous vesicles (costs ATP)
                const inflationRate = this.gasVacuoleRatio * 0.12;
                this.gasVolume = Math.min(this.maxGasCapacity, this.gasVolume + inflationRate);
                org.energy = Math.max(0.0, org.energy - 0.015);
                this.isMigratingUp = true;
                this.isMigratingDown = false;
            } else if (depthError < -15.0) {
                // Deflate gas vesicles and synthesize denser structural ballast
                const deflationRate = 0.14;
                this.gasVolume = Math.max(0.0, this.gasVolume - deflationRate);
                this.isMigratingDown = true;
                this.isMigratingUp = false;
            } else {
                this.isMigratingUp = false;
                this.isMigratingDown = false;
            }

            // Slowly accumulate stable lipid droplets when well energized
            if (org.energy > 50.0 && this.lipidReserves < this.maxLipidCapacity) {
                const lipidGain = this.lipidDensity * 0.025;
                this.lipidReserves = Math.min(this.maxLipidCapacity, this.lipidReserves + lipidGain);
                org.energy = Math.max(0.0, org.energy - 0.008);
            }
        }

        /**
         * Calculate Archimedean buoyancy force vs hydrostatic compression:
         * F_net = (V_effective * rho_fluid * g) - (m_cell * g)
         * @param {number} dt - Delta time step.
         */
        applyHydrostaticBuoyancy(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Hydrostatic pressure compression reduces gas volume at depth (Boyle law approximation)
            // Low barotolerance causes structural vesicle collapse under severe benthic pressure
            const depthPressure = 1.0 + Math.max(0.0, (org.y - 80.0) / 380.0) * (1.2 - this.barotolerance * 0.4);
            const effectiveGasVolume = this.gasVolume / Math.max(1.0, depthPressure);

            // Upward buoyant lift from gas vesicles and low-density lipid stores
            const gasLift = effectiveGasVolume * 0.016;
            const lipidLift = this.lipidReserves * 0.005;
            const totalUpwardLift = gasLift + lipidLift;

            // Downward negative ballast from cellular biomass and biomineral cuticles
            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const cuticleLoad = typeof org.cuticleThickness === "number" ? org.cuticleThickness * 0.004 : 0.0;
            const cellularWeight = (baseSize * 0.013) + cuticleLoad;

            // Net vertical force with viscous damping to prevent uncontrolled oscillation
            const rawForce = totalUpwardLift - cellularWeight;
            this.currentBuoyancyForce = Number(rawForce.toFixed(3));
            this.currentBuoyancyForce = Math.max(-0.18, Math.min(0.18, this.currentBuoyancyForce));

            // Apply buoyancy directly to host vertical velocity vector
            org.vy += this.currentBuoyancyForce;
            this.verticalVelocityMod = this.currentBuoyancyForce;
        }

        /**
         * Evaluate circadian diel photoperiod and apply vertical migration bonuses.
         * @param {number} dielCyclePhase - Normalized diel phase [0.0 - 1.0] (0.0: Midnight, 0.5: Noon).
         */
        evaluateDielCycle(dielCyclePhase) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const phase = typeof dielCyclePhase === "number" ? dielCyclePhase : 0.0;
            const isDaytime = (phase > 0.22 && phase < 0.78);
            const isNighttime = !isDaytime;

            if (isDaytime && this.dielSensitivity > 0.15) {
                // Diurnal descent: seek refuge in mesopelagic twilight zone (y: 300 - 420 px)
                const twilightDepth = 320.0 + (this.dielSensitivity * 45.0);
                this.neutralDepthTarget = Math.min(430.0, twilightDepth);

                // Predator avoidance bonus active when residing in dim mesopelagic layer during day
                if (org.y >= 260.0 && org.y <= 440.0) {
                    this.dvmRefugeActive = true;
                } else {
                    this.dvmRefugeActive = false;
                }
                this.dvmFeedingBonus = 0.0;
            } else if (isNighttime && this.dielSensitivity > 0.15) {
                // Nocturnal ascent: rise towards epipelagic photic layer (y: 80 - 160 px) for rich grazing
                this.neutralDepthTarget = 110.0;
                this.dvmRefugeActive = false;

                // Night surface grazing bonus: active feeding rate increase when near surface under darkness
                if (org.y <= 190.0) {
                    this.dvmFeedingBonus = 0.20; // +20% nutrient assimilation efficiency
                } else {
                    this.dvmFeedingBonus = 0.0;
                }
            } else {
                // Decoupled baseline: drift at mid-depth neutral buoyancy
                this.neutralDepthTarget = 280.0;
                this.dvmRefugeActive = false;
                this.dvmFeedingBonus = 0.0;
            }
        }

        /**
         * Step cycle executed per simulation frame.
         * @param {number} tick - Current simulation frame count.
         * @param {number} dielCyclePhase - Normalized diel cycle phase [0.0 - 1.0].
         */
        step(tick, dielCyclePhase) {
            const org = this.organism;
            if (!org || !org.alive) return;

            this.evaluateDielCycle(dielCyclePhase);

            if (tick - this.lastSampleTick >= this.sampleCadence) {
                this.regulateGas(this.neutralDepthTarget, 0.016);
                this.lastSampleTick = tick;
            }

            this.applyHydrostaticBuoyancy(0.016);

            // Expose properties on host organism for rendering, HUD, and trophic survival
            org.gasVolume = Number(this.gasVolume.toFixed(2));
            org.lipidReserves = Number(this.lipidReserves.toFixed(2));
            org.currentBuoyancyForce = this.currentBuoyancyForce;
            org.neutralDepthTarget = Number(this.neutralDepthTarget.toFixed(1));
            org.isMigratingUp = this.isMigratingUp;
            org.isMigratingDown = this.isMigratingDown;
            org.dvmFeedingBonus = this.dvmFeedingBonus;
            org.dvmRefugeActive = this.dvmRefugeActive;
        }

        /**
         * Clean unhooking on organism mortality to prevent memory leaks.
         */
        cleanup() {
            this.organism = null;
            this.gasVolume = 0.0;
            this.lipidReserves = 0.0;
            this.currentBuoyancyForce = 0.0;
            this.isMigratingUp = false;
            this.isMigratingDown = false;
            this.dvmFeedingBonus = 0.0;
            this.dvmRefugeActive = false;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BuoyancyVacuoleSystem;
    } else {
        global.BuoyancyVacuoleSystem = BuoyancyVacuoleSystem;
    }
})(typeof window !== "undefined" ? window : global);
