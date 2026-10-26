// BioEcosystem - Chemoautotrophic Sulfur Oxidation & Hydrothermal Vent System
// Module: src/organs/chemoautotrophy.js
// Version: 5.58.0 (Hour 278 - System Agent: Negative Thermotaxis, Epibiotic Grazing & Sulfur Vacuoles)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HydrothermalVentManager
     * Simulates abyssal hydrothermal vent chimneys, benthic mineral plumes,
     * convective thermal upwelling, and hydrogen sulfide replenishment.
     */
    class HydrothermalVentManager {
        static createDefaultVents() {
            return [
                { id: "vent_alpha", x: 170.0, y: 550.0, radius: 26.0, sulfurFlux: 3.2, storedSulfur: 200.0, maxSulfur: 280.0, thermalCore: 360.0, plumeParticles: [] },
                { id: "vent_beta", x: 390.0, y: 555.0, radius: 32.0, sulfurFlux: 4.0, storedSulfur: 250.0, maxSulfur: 340.0, thermalCore: 380.0, plumeParticles: [] },
                { id: "vent_gamma", x: 610.0, y: 548.0, radius: 24.0, sulfurFlux: 2.8, storedSulfur: 180.0, maxSulfur: 250.0, thermalCore: 340.0, plumeParticles: [] }
            ];
        }

        static getThermalField(x, y, vents) {
            let temp = 2.0; // Ambient abyssal temperature (2.0 C)
            if (!vents || !Array.isArray(vents)) return temp;
            for (let i = 0; i < vents.length; i++) {
                const v = vents[i];
                if (!v) continue;
                const d = Math.hypot(x - v.x, y - v.y);
                if (d < 120.0) {
                    temp += (v.thermalCore - 2.0) * Math.exp(-d / 38.0);
                }
            }
            return Math.min(380.0, temp);
        }

        static step(vents, organisms, tick) {
            if (!vents || !Array.isArray(vents)) return;

            for (let i = 0; i < vents.length; i++) {
                const vent = vents[i];
                if (!vent) continue;

                // 1. Replenish hydrothermal sulfur reservoir
                vent.storedSulfur = Math.min(vent.maxSulfur, vent.storedSulfur + vent.sulfurFlux * 0.05);

                // 2. Spawn convective mineral plume micro-particles
                if (vent.plumeParticles.length < 18 && tick % 2 === 0) {
                    vent.plumeParticles.push({
                        x: vent.x + (Math.random() - 0.5) * (vent.radius * 0.7),
                        y: vent.y - 12.0,
                        vx: (Math.random() - 0.5) * 0.35,
                        vy: -0.65 - Math.random() * 0.55,
                        life: 1.0,
                        decay: 0.012 + Math.random() * 0.008
                    });
                }

                // 3. Update plume particle kinematics
                for (let j = vent.plumeParticles.length - 1; j >= 0; j--) {
                    const p = vent.plumeParticles[j];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= p.decay;
                    if (p.y < 450.0) p.life -= 0.04;
                    if (p.life <= 0.0) vent.plumeParticles.splice(j, 1);
                }

                // 4. Convective thermal upwelling drift
                if (organisms && Array.isArray(organisms)) {
                    const attractRadiusSq = vent.radius * vent.radius * 6.25;
                    for (let k = 0; k < organisms.length; k++) {
                        const org = organisms[k];
                        if (!org || !org.alive) continue;
                        const dx = vent.x - org.x, dy = vent.y - org.y, dsq = dx * dx + dy * dy;

                        if (dsq < attractRadiusSq) {
                            const dna = org.dna || {};
                            const chemoAffinity = typeof dna.chemoautotrophyAffinity === "number" ? dna.chemoautotrophyAffinity : 0.25;
                            const dist = Math.sqrt(dsq) || 1.0;
                            org.vy -= 0.045 * (1.0 - dist / (vent.radius * 2.5));

                            if (chemoAffinity > 0.30) {
                                const pull = 0.035 * (chemoAffinity * (1.0 - dist / (vent.radius * 2.5)));
                                org.vx += (dx / dist) * pull;
                                org.vy += (dy / dist) * pull * 0.6;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * ChemoautotrophySystem
     * Models cellular sulfur oxidation, negative thermotaxis,
     * epibiotic vent biofilm grazing, and sulfur vacuole storage.
     */
    class ChemoautotrophySystem {
        constructor(organism) {
            this.organism = organism;
            const dna = (organism && organism.dna) ? organism.dna : {};
            this.chemoAffinity = typeof dna.chemoautotrophyAffinity === "number" ? dna.chemoautotrophyAffinity : 0.25;
            this.barotolerance = typeof dna.barotolerance === "number" ? dna.barotolerance : 0.30;
            this.sulfurMetabolism = typeof dna.sulfurMetabolism === "number" ? dna.sulfurMetabolism : 0.20;
            this.thermotolerance = typeof dna.thermotolerance === "number" ? dna.thermotolerance : 0.25;
            this.heatShockChaperones = typeof dna.heatShockProtection === "number" ? dna.heatShockProtection : 0.20;

            // Substrate pools & vacuole storage
            this.storedSulfur = 0.0;
            this.maxSulfurCapacity = 50.0;
            this.chemosyntheticYield = 0.0;
            
            // Thermal, barophilic, and thermotaxis state
            this.barophilicStrain = 0.0;
            this.thermalExposure = 2.0;
            this.thermalStrain = 0.0;
            this.thermalCatalysisBoost = 1.0;
            this.thermalTaxisScore = 0.0;
            this.isThermotaxisActive = false;
            this.epibioticGrazingActive = false;
            this.piezotolerantFluidity = 1.0;
            this.isAtVent = false;
            this.ventProximity = 0.0;
            this.activeVentRef = null;

            this.lastSampleTick = 0;
            this.sampleCadence = 5;
        }

        /**
         * Sample benthic vents, absorb sulfur, calculate thermal field, and execute negative thermotaxis.
         */
        sampleHydrothermalVents(vents) {
            const org = this.organism;
            if (!org || !org.alive) return;

            let closestVent = null;
            let minDistanceSq = 7225.0; // 85px sensing radius squared

            if (vents && Array.isArray(vents)) {
                for (let i = 0; i < vents.length; i++) {
                    const v = vents[i];
                    if (!v || v.storedSulfur <= 0.5) continue;
                    const dsq = (org.x - v.x) ** 2 + (org.y - v.y) ** 2;
                    if (dsq < minDistanceSq) {
                        minDistanceSq = dsq;
                        closestVent = v;
                    }
                }
            }

            this.thermalExposure = HydrothermalVentManager.getThermalField(org.x, org.y, vents);

            if (closestVent) {
                this.activeVentRef = closestVent;
                const dist = Math.sqrt(minDistanceSq);
                this.ventProximity = Math.max(0.0, 1.0 - (dist / 85.0));
                this.isAtVent = this.ventProximity > 0.18;

                // 1. Epibiotic mineral grazing on chimney flanks
                const ventYield = closestVent.sulfurFlux || 3.0;
                const uptakeRate = this.chemoAffinity * 1.05 * this.ventProximity * ventYield;
                this.storedSulfur = Math.min(this.maxSulfurCapacity, this.storedSulfur + uptakeRate);
                closestVent.storedSulfur = Math.max(0.0, closestVent.storedSulfur - uptakeRate * 0.07);
                this.epibioticGrazingActive = this.isAtVent && this.ventProximity > 0.35;

                // 2. Negative Thermotaxis: active steering away from scalding (>98C) death core
                if (this.thermalExposure > 98.0) {
                    const rdx = org.x - closestVent.x, rdy = org.y - closestVent.y;
                    const rdist = Math.hypot(rdx, rdy) || 1.0;
                    const thermalOverheat = Math.min(1.0, (this.thermalExposure - 98.0) / 90.0);
                    const repulsionForce = 0.088 * thermalOverheat * (0.8 + this.thermotolerance * 0.9);
                    org.vx += (rdx / rdist) * repulsionForce;
                    org.vy += (rdy / rdist) * repulsionForce * 0.75;
                    this.isThermotaxisActive = true;
                } else {
                    this.isThermotaxisActive = false;
                }
            } else {
                this.activeVentRef = null;
                this.ventProximity = 0.0;
                this.isAtVent = false;
                this.isThermotaxisActive = false;
                this.epibioticGrazingActive = false;
            }

            // 3. Thermal stress vs Arrhenius catalytic activation window
            if (this.thermalExposure > 105.0) {
                const excessTemp = (this.thermalExposure - 105.0) / 100.0;
                const protection = this.thermotolerance * 0.5 + this.heatShockChaperones * 0.5;
                this.thermalStrain = Math.max(0.0, Math.min(1.0, excessTemp * (1.0 - protection * 0.85)));
                if (this.thermalStrain > 0.02) {
                    org.energy = Math.max(0.0, org.energy - this.thermalStrain * 0.28);
                }
            } else {
                this.thermalStrain = 0.0;
            }

            // 4. Thermophilic Arrhenius catalytic boost (65C - 95C optimum)
            if (this.thermalExposure >= 25.0 && this.thermalExposure <= 105.0) {
                const deltaT = (this.thermalExposure - 80.0) / 26.0;
                this.thermalCatalysisBoost = 1.0 + 1.85 * Math.exp(-deltaT * deltaT);
            } else {
                this.thermalCatalysisBoost = 1.0;
            }

            // 5. Thermal Taxis Resilience Score (% TTR)
            let ttr = 0.0;
            if (this.thermalExposure >= 55.0 && this.thermalExposure <= 100.0) {
                ttr = Math.max(0.0, 1.0 - Math.abs(this.thermalExposure - 78.0) / 26.0);
            } else if (this.thermalExposure < 55.0) {
                ttr = Math.max(0.0, this.thermalExposure / 55.0 * 0.45);
            }
            this.thermalTaxisScore = Math.max(0.0, Math.min(1.0, ttr - this.thermalStrain * 0.75));
        }

        /** Catalytic sulfur oxidation into bioenergetic ATP via SQR/SOX: H2S + 2O2 -> SO4(2-) + 2H(+) + ATP */
        synthesizeChemoATP(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const depthFactor = Math.max(0.0, (org.y - 450.0) / 150.0);
            this.barophilicStrain = depthFactor > 0.15 ? Math.max(0.0, (depthFactor - this.barotolerance) * 0.65) : 0.0;
            this.piezotolerantFluidity = Math.max(0.20, 1.0 - this.barophilicStrain * 0.80);

            // Catalytic sulfur oxidation kinetics
            if (this.storedSulfur > 0.04 && this.chemoAffinity > 0.1) {
                const consumption = Math.min(this.storedSulfur, 0.32 * this.chemoAffinity * (1.0 + this.thermotolerance * 0.5));
                this.storedSulfur -= consumption;

                const deltaATP = consumption * (1.2 + this.sulfurMetabolism * 2.4) *
                    this.piezotolerantFluidity * this.thermalCatalysisBoost *
                    Math.max(0.1, 1.0 - this.thermalStrain * 0.75 - this.barophilicStrain * 0.35) * 11.2;

                this.chemosyntheticYield = Number(deltaATP.toFixed(3));
                org.energy = Math.min(220.0, org.energy + this.chemosyntheticYield);
            } else {
                this.chemosyntheticYield = 0.0;
            }

            if (!this.isAtVent && this.storedSulfur > 0.0) {
                this.storedSulfur = Math.max(0.0, this.storedSulfur - 0.015);
            }
        }

        /** Step cycle executed per simulation frame. */
        step(tick, vents) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (tick - this.lastSampleTick >= this.sampleCadence) {
                this.sampleHydrothermalVents(vents);
                this.lastSampleTick = tick;
            }

            this.synthesizeChemoATP(0.016);

            // Expose updated properties on host organism for rendering, HUD, and trophic survival
            org.storedSulfur = Number(this.storedSulfur.toFixed(2));
            org.storedSulfurVacuole = org.storedSulfur;
            org.chemosyntheticYield = this.chemosyntheticYield;
            org.barophilicStrain = Number(this.barophilicStrain.toFixed(3));
            org.thermalExposure = Number(this.thermalExposure.toFixed(1));
            org.thermalStrain = Number(this.thermalStrain.toFixed(3));
            org.thermalTaxisScore = Number(this.thermalTaxisScore.toFixed(3));
            org.isThermotaxisActive = this.isThermotaxisActive;
            org.isAtVent = this.isAtVent;
            org.ventProximity = Number(this.ventProximity.toFixed(2));
        }

        /** Cleanup references on organism mortality to prevent memory leaks. */
        cleanup() {
            this.organism = null;
            this.activeVentRef = null;
            this.storedSulfur = 0.0;
            this.chemosyntheticYield = 0.0;
            this.barophilicStrain = 0.0;
            this.thermalExposure = 2.0;
            this.thermalStrain = 0.0;
            this.thermalTaxisScore = 0.0;
            this.isThermotaxisActive = false;
            this.isAtVent = false;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = { ChemoautotrophySystem, HydrothermalVentManager };
    } else {
        global.ChemoautotrophySystem = ChemoautotrophySystem;
        global.HydrothermalVentManager = HydrothermalVentManager;
    }
})(typeof window !== "undefined" ? window : global);
