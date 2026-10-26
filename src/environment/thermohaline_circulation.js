// BioEcosystem - Thermohaline Circulation & Vertical Upwelling Dynamics
// Module: src/environment/thermohaline_circulation.js
// Version: 5.97.0 (Hour 317 - System Agent: Convective Surfing & Baroclinic Buffer)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ThermohalineCirculationSystem
     * Global physical water column convection and vertical nutrient upwelling:
     * - Stratifies dish water column into Epipelagic, Thermocline, and Benthic layers
     * - Models thermal-haline density buoyancy, producing circulating convection gyres
     * - Drives nutrient upwelling columns lifting benthic phosphate and silicate to surface
     * - Implements active rheotactic counter-swimming against margin traps
     * - Supports convective wave surfing for energy-neutral seasonal vertical migration
     * - Buffers thermocline transition shock via baroclinic lipid membrane elasticity
     */
    class ThermohalineCirculationSystem {
        constructor() {
            this.benthicNutrientPool = 120.0;
            this.upwellingIntensity = 0.55;
            this.convectionPhase = 0.0;
            this.dishWidth = 660.0;
            this.dishHeight = 660.0;
            this.epipelagicDepth = 210.0;
            this.benthicDepth = 450.0;

            // Two primary upwelling thermal plumes along the dish floor
            this.plumes = [
                { x: 190.0, radius: 75.0, flowSign: -1.0, active: true, fluxRate: 0.85 },
                { x: 470.0, radius: 80.0, flowSign: -1.0, active: true, fluxRate: 0.90 }
            ];

            this.metrics = {
                upwellingIntensity: 0.55,
                benthicMineralStock: 120.0,
                surfaceAssimilationRate: 0.0,
                activePlumeCount: 2,
                meanAdvectionDrift: 0.0,
                surfingOrganismCount: 0,
                counterSwimmingCount: 0,
                thermoclineCrossings: 0
            };
        }

        /**
         * Determine current water column layer based on vertical depth.
         * @param {number} y - Vertical coordinate.
         * @returns {string} Layer designation.
         */
        getLayer(y) {
            if (y < this.epipelagicDepth) return "EPIPELAGIC";
            if (y > this.benthicDepth) return "BENTHIC";
            return "THERMOCLINE";
        }

        /**
         * Calculate fluid velocity vector and upwelling state at any spatial coordinate.
         * @param {number} x - Horizontal coordinate.
         * @param {number} y - Vertical coordinate.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Circulation vector and plume flags.
         */
        getCurrentVelocity(x, y, tick) {
            const time = tick * 0.008;
            const normX = x / this.dishWidth;
            const normY = y / this.dishHeight;

            // Primary convective gyre: clockwise on left cell, counter-clockwise on right cell
            const gyreLeft = Math.sin(normX * Math.PI * 2.0);
            const gyreVertical = Math.cos(normY * Math.PI);

            let vx = Math.sin(normY * Math.PI + time) * 0.35 * gyreLeft;
            let vy = Math.cos(normX * Math.PI + time) * 0.25 * gyreVertical;
            let inPlume = false;
            let plumeIntensity = 0.0;

            // Evaluate localized vertical upwelling columns
            for (let i = 0; i < this.plumes.length; i++) {
                const p = this.plumes[i];
                const dx = Math.abs(x - p.x);
                if (dx < p.radius && y > 120.0) {
                    const factor = 1.0 - (dx / p.radius);
                    const upForce = -0.65 * factor * p.fluxRate * (0.8 + 0.2 * Math.sin(time * 2.0 + i));
                    vy += upForce;
                    inPlume = true;
                    plumeIntensity = Math.max(plumeIntensity, factor);
                }
            }

            // Downwelling boundary currents near lateral dish margins
            if (x < 60.0 || x > (this.dishWidth - 60.0)) {
                vy += 0.30;
            }

            return {
                vx: Number(vx.toFixed(4)),
                vy: Number(vy.toFixed(4)),
                inPlume,
                plumeIntensity: Number(plumeIntensity.toFixed(3)),
                layer: this.getLayer(y)
            };
        }

        /**
         * Apply convective drift forces, surfing reflexes, and baroclinic buffer.
         * @param {Object} org - Individual simulation cell.
         * @param {number} tick - Simulation frame count.
         */
        applyOrganismCirculation(org, tick) {
            if (!org || !org.alive) return;

            const cur = this.getCurrentVelocity(org.x, org.y, tick);
            const prevLayer = org.waterColumnLayer || cur.layer;
            org.waterColumnLayer = cur.layer;
            org.currentAdvectionX = cur.vx;
            org.currentAdvectionY = cur.vy;
            org.inUpwellingPlume = cur.inPlume;

            // 1. Baroclinic Membrane Buffer & Thermocline Shock Resistance (Critic Directive)
            const baroBuffer = (org.dna && typeof org.dna.lipidUnsaturation === "number")
                ? org.dna.lipidUnsaturation
                : 0.55;
            org.baroclinicThermalBuffer = Number(baroBuffer.toFixed(2));

            if (prevLayer !== cur.layer) {
                this.metrics.thermoclineCrossings++;
                if (baroBuffer < 0.42) {
                    org.thermalShockTimer = 18; // Cold/warm boundary rigidity shock
                }
            }

            if (org.thermalShockTimer > 0) {
                org.thermalShockTimer--;
            }

            // 2. Active Rheotactic Counter-Swimming against lethal margin traps
            const nearLateralEdge = (org.x < 65.0 || org.x > (this.dishWidth - 65.0));
            const nearBenthicFloor = (org.y > (this.dishHeight - 60.0) && cur.vy > 0);
            const canCounterSwim = (org.energy > 18.0 && (org.dna.speed || 1.0) > 0.85);

            if ((nearLateralEdge || nearBenthicFloor) && canCounterSwim) {
                org.isCounterSwimming = true;
                this.metrics.counterSwimmingCount++;
                org.x -= cur.vx * 0.70;
                org.y -= cur.vy * 0.70;
                org.energy = Math.max(10.0, org.energy - 0.012);
            } else {
                org.isCounterSwimming = false;
            }

            // 3. Convective Wave Surfing & Seasonal Vertical Migration
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            let dragCoeff = Math.min(0.85, 0.25 + (size / 16.0) * 0.35);

            if (cur.inPlume && cur.plumeIntensity > 0.18) {
                org.convectiveSurfingActive = true;
                this.metrics.surfingOrganismCount++;
                // Lift organism effortlessly upward along the thermal plume
                org.y -= 0.50 * cur.plumeIntensity;
                dragCoeff *= 0.5; // Streamlined posture reduces horizontal drift
            } else {
                org.convectiveSurfingActive = false;
            }

            // Apply hydrodynamic displacement adjusted for thermal shock
            const shockPenalty = org.thermalShockTimer > 0 ? 0.60 : 1.0;
            org.x += cur.vx * dragCoeff * shockPenalty;
            org.y += cur.vy * dragCoeff * shockPenalty;

            // 4. Vertical Nutrient Upwelling Assimilation
            if (cur.inPlume && cur.plumeIntensity > 0.15) {
                const isAutotroph = (org.dna && (org.dna.diet === 0 || org.dna.diet === 3));
                const assimilationBonus = isAutotroph ? 0.35 * cur.plumeIntensity : 0.15 * cur.plumeIntensity;
                org.upwellingNutrientAssimilation = Number(assimilationBonus.toFixed(3));

                if (this.benthicNutrientPool > 5.0) {
                    org.energy = Math.min(100.0, org.energy + assimilationBonus * 0.6);
                    this.benthicNutrientPool = Math.max(0.0, this.benthicNutrientPool - 0.015);
                }
            } else {
                org.upwellingNutrientAssimilation = 0.0;
            }
        }

        /**
         * Primary simulation tick update for the thermohaline circulation system.
         * @param {Array<Object>} organisms - Living simulation organisms.
         * @param {Array<Object>} carrions - Benthic decay and detritus particles.
         * @param {number} tick - Simulation frame count.
         */
        step(organisms, carrions, tick) {
            this.convectionPhase = (tick * 0.005) % (Math.PI * 2.0);

            // Benthic replenishment: decaying organic detritus sinks into sediment pool
            if (Array.isArray(carrions) && carrions.length > 0) {
                let sinkingDetritus = 0;
                for (let i = 0; i < carrions.length; i++) {
                    const c = carrions[i];
                    if (c && c.y > this.benthicDepth) sinkingDetritus++;
                }
                this.benthicNutrientPool = Math.min(250.0, this.benthicNutrientPool + sinkingDetritus * 0.04);
            }

            this.benthicNutrientPool = Math.min(250.0, this.benthicNutrientPool + 0.025);
            this.upwellingIntensity = 0.40 + 0.30 * (0.5 + 0.5 * Math.sin(this.convectionPhase));

            let totalDrift = 0.0;
            let totalAssim = 0.0;
            let liveCount = 0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;
                    this.applyOrganismCirculation(org, tick);
                    totalDrift += Math.hypot(org.currentAdvectionX || 0, org.currentAdvectionY || 0);
                    totalAssim += (org.upwellingNutrientAssimilation || 0);
                }
            }

            const safeCount = Math.max(1, liveCount);
            this.metrics.upwellingIntensity = Number(this.upwellingIntensity.toFixed(2));
            this.metrics.benthicMineralStock = Number(this.benthicNutrientPool.toFixed(1));
            this.metrics.surfaceAssimilationRate = Number((totalAssim / safeCount).toFixed(3));
            this.metrics.meanAdvectionDrift = Number((totalDrift / safeCount).toFixed(3));
        }

        /**
         * Retrieve real-time telemetry metrics for environmental HUD and diagnostics.
         * @returns {Object} Thermohaline status snapshot.
         */
        getTelemetryMetrics() {
            return { ...this.metrics };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ThermohalineCirculationSystem;
    } else {
        global.ThermohalineCirculationSystem = ThermohalineCirculationSystem;
        global.thermohalineSystem = new ThermohalineCirculationSystem();
    }
})(typeof window !== "undefined" ? window : global);
