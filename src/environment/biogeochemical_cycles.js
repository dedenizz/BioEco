// BioEcosystem - Biogeochemical Cycles, Biological Carbon Pump & Nitrogen Cascades
// Module: src/environment/biogeochemical_cycles.js
// Version: 6.07.0 (Hour 327 - System Agent: Benthic Remineralization & Nitrogen Cycle Engine)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BiogeochemicalCycleSystem
     * Global elemental recycling, biological carbon pump, and nitrogen dynamics:
     * - Generates and tracks settling marine snow organo-mineral aggregates
     * - Models vertical carbon sequestration into benthic sediment sinks
     * - Simulates benthic filter-feeding on descending organic flocs
     * - Implements benthic microbial remineralization and hypoxia buffering
     * - Drives diazotrophic nitrogen fixation, two-step nitrification, and denitrification
     */
    class BiogeochemicalCycleSystem {
        constructor() {
            this.marineSnow = [];
            this.maxSnowParticles = 55;
            this.benthicSedimentCarbon = 85.0;
            this.dissolvedNitrate = 52.0;
            this.dissolvedAmmonium = 18.0;
            this.dishWidth = 660.0;
            this.dishHeight = 660.0;
            this.benthicFloorY = 560.0;
            this.benthicHypoxiaZone = 575.0;

            this.metrics = {
                marineSnowCount: 0,
                sinkingCarbonFlux: 0.0,
                benthicSedimentCarbon: 85.0,
                dissolvedNitrate: 52.0,
                dissolvedAmmonium: 18.0,
                filterFeedingEvents: 0,
                nitrogenFixationFlux: 0.0,
                benthicRemineralizationFlux: 0.0,
                denitrificationFlux: 0.0,
                biogenicNitrogenYield: 48.5
            };
        }

        /**
         * Spawn an organic marine snow aggregate in the photic or mesopelagic zone.
         */
        spawnMarineSnow(x, y, mass) {
            if (this.marineSnow.length >= this.maxSnowParticles) return;

            const safeX = typeof x === "number" ? Math.max(20, Math.min(this.dishWidth - 20, x)) : Math.random() * this.dishWidth;
            const safeY = typeof y === "number" ? Math.max(10, Math.min(this.benthicFloorY - 40, y)) : 30 + Math.random() * 180;
            const safeMass = Math.max(0.4, Math.min(3.5, mass || (0.8 + Math.random() * 1.4)));

            this.marineSnow.push({
                x: safeX,
                y: safeY,
                mass: safeMass,
                size: 1.4 + safeMass * 0.8,
                sinkingSpeed: 0.22 + Math.random() * 0.28,
                driftPhase: Math.random() * Math.PI * 2.0,
                age: 0,
                maxAge: 850 + Math.floor(Math.random() * 400)
            });
        }

        /**
         * Update descending marine snow particles and handle benthic settling and filter-feeding.
         */
        updateMarineSnow(thermohalineSys, organisms, tick) {
            let activeFlux = 0.0;
            let filterFeedCount = 0;

            for (let i = this.marineSnow.length - 1; i >= 0; i--) {
                const p = this.marineSnow[i];
                p.age++;
                p.y += p.sinkingSpeed;
                p.driftPhase += 0.03;
                p.x += Math.sin(p.driftPhase) * 0.25;

                if (thermohalineSys && typeof thermohalineSys.getCurrentVelocity === "function") {
                    const cur = thermohalineSys.getCurrentVelocity(p.x, p.y, tick);
                    p.x += cur.vx * 0.35;
                    p.y += cur.vy * 0.25;
                }

                if (p.x < 15.0) p.x = 15.0;
                else if (p.x > this.dishWidth - 15.0) p.x = this.dishWidth - 15.0;

                activeFlux += p.mass * p.sinkingSpeed;

                let consumed = false;
                if (Array.isArray(organisms)) {
                    for (let o = 0; o < organisms.length; o++) {
                        const org = organisms[o];
                        if (!org || !org.alive) continue;

                        const reach = (org.dna && org.dna.size) ? org.dna.size + p.size + 6.0 : 12.0;
                        if (Math.hypot(org.x - p.x, org.y - p.y) < reach) {
                            org.energy = Math.min(100.0, org.energy + p.mass * 2.8);
                            org.marineSnowConsumption = (org.marineSnowConsumption || 0) + 1;
                            p.mass -= 0.6;
                            filterFeedCount++;
                            if (p.mass <= 0.25) { consumed = true; break; }
                        }
                    }
                }

                if (consumed || p.y >= this.benthicFloorY || p.age >= p.maxAge) {
                    if (!consumed && p.y >= this.benthicFloorY) {
                        this.benthicSedimentCarbon = Math.min(300.0, this.benthicSedimentCarbon + p.mass * 0.85);
                    }
                    this.marineSnow.splice(i, 1);
                }
            }

            this.metrics.sinkingCarbonFlux = Number(activeFlux.toFixed(3));
            this.metrics.filterFeedingEvents += filterFeedCount;
        }

        /**
         * Simulate benthic microbial remineralization and hypoxia buffering in deep sediments.
         */
        updateBenthicRemineralization(thermohalineSys, organisms, tick) {
            let reminFlux = 0.0;

            if (this.benthicSedimentCarbon > 30.0) {
                reminFlux = Math.min(0.09, this.benthicSedimentCarbon * 0.00085);
                this.benthicSedimentCarbon = Math.max(25.0, this.benthicSedimentCarbon - reminFlux);
                this.dissolvedAmmonium = Math.min(85.0, this.dissolvedAmmonium + reminFlux * 0.55);

                if (thermohalineSys && typeof thermohalineSys.benthicNutrientPool === "number") {
                    const upwInt = thermohalineSys.upwellingIntensity || 0.85;
                    thermohalineSys.benthicNutrientPool = Math.min(220.0, thermohalineSys.benthicNutrientPool + reminFlux * 1.6 * upwInt);
                }
            }

            if (Array.isArray(organisms)) {
                const isHypoxic = this.benthicSedimentCarbon > 115.0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;

                    if (org.y >= this.benthicHypoxiaZone) {
                        if (isHypoxic) {
                            const sizeFactor = (org.dna && org.dna.size) ? org.dna.size / 15.0 : 0.8;
                            const hypoxiaLoss = 0.025 * sizeFactor;
                            org.energy = Math.max(4.0, org.energy - hypoxiaLoss);
                            org.benthicHypoxiaStress = Number(hypoxiaLoss.toFixed(4));
                        } else {
                            org.benthicHypoxiaStress = 0.0;
                        }

                        if ((org.marineSnowConsumption || 0) > 0 || (org.dna && org.dna.diet === 2)) {
                            const scavengeBoost = reminFlux * 1.8;
                            org.energy = Math.min(100.0, org.energy + scavengeBoost);
                            org.benthicReminYield = Number(scavengeBoost.toFixed(4));
                        } else {
                            org.benthicReminYield = 0.0;
                        }
                    } else {
                        org.benthicHypoxiaStress = 0.0;
                        org.benthicReminYield = 0.0;
                    }
                }
            }

            this.metrics.benthicRemineralizationFlux = Number(reminFlux.toFixed(4));
        }

        /**
         * Simulate diazotrophic nitrogen fixation, two-step nitrification, and denitrification.
         */
        updateNitrogenCycle(organisms, tick) {
            let totalFixation = 0.0;
            let totalAssimilated = 0.0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;

                    const isFixer = (org.dna && (org.dna.diet === 0 || org.dna.diet === 3));
                    if (isFixer && org.y < 350.0) {
                        const fixRate = (org.dna.photosynthesisRate || 0.85) * 0.006;
                        this.dissolvedAmmonium = Math.min(85.0, this.dissolvedAmmonium + fixRate);
                        org.nitrogenFixationFlux = Number(fixRate.toFixed(4));
                        totalFixation += fixRate;
                    } else {
                        org.nitrogenFixationFlux = 0.0;
                    }

                    if (this.dissolvedNitrate > 8.0) {
                        const assimRate = 0.012;
                        org.energy = Math.min(100.0, org.energy + assimRate * 1.5);
                        org.nitrateAssimilationRate = Number(assimRate.toFixed(3));
                        this.dissolvedNitrate = Math.max(0.0, this.dissolvedNitrate - 0.008);
                        totalAssimilated += assimRate;
                    } else {
                        org.nitrateAssimilationRate = 0.0;
                    }
                }
            }

            if (this.dissolvedAmmonium > 4.5) {
                const nitrifyAmount = 0.019;
                this.dissolvedAmmonium -= nitrifyAmount;
                this.dissolvedNitrate = Math.min(125.0, this.dissolvedNitrate + nitrifyAmount * 0.94);
            }

            let denitrifAmount = 0.0;
            if (this.dissolvedNitrate > 68.0) {
                denitrifAmount = (this.dissolvedNitrate - 68.0) * 0.004;
                this.dissolvedNitrate -= denitrifAmount;
            }

            const fixationScore = Math.min(35.0, totalFixation * 350.0);
            const assimilationScore = Math.min(35.0, totalAssimilated * 75.0);
            const poolBalanceScore = Math.min(30.0, (this.dissolvedNitrate / 80.0) * 30.0);
            const bnyYield = Math.max(5.0, Math.min(100.0, fixationScore + assimilationScore + poolBalanceScore));

            this.metrics.nitrogenFixationFlux = Number(totalFixation.toFixed(3));
            this.metrics.dissolvedNitrate = Number(this.dissolvedNitrate.toFixed(1));
            this.metrics.dissolvedAmmonium = Number(this.dissolvedAmmonium.toFixed(1));
            this.metrics.denitrificationFlux = Number(denitrifAmount.toFixed(4));
            this.metrics.biogenicNitrogenYield = Number(bnyYield.toFixed(1));
        }

        /**
         * Main tick execution loop for the biogeochemical cycle system.
         */
        step(organisms, carrions, thermohalineSys, tick) {
            if (tick % 45 === 0 && this.marineSnow.length < this.maxSnowParticles) {
                const spawnX = 40.0 + Math.random() * (this.dishWidth - 80.0);
                const spawnY = 25.0 + Math.random() * 160.0;
                this.spawnMarineSnow(spawnX, spawnY, 0.9 + Math.random() * 1.2);
            }

            if (Array.isArray(carrions) && tick % 60 === 0) {
                for (let c = 0; c < Math.min(3, carrions.length); c++) {
                    const car = carrions[c];
                    if (car && car.y < 420.0 && this.marineSnow.length < this.maxSnowParticles) {
                        this.spawnMarineSnow(car.x + (Math.random() - 0.5) * 20.0, car.y, 0.6);
                    }
                }
            }

            this.updateMarineSnow(thermohalineSys, organisms, tick);
            this.updateBenthicRemineralization(thermohalineSys, organisms, tick);
            this.updateNitrogenCycle(organisms, tick);

            this.metrics.marineSnowCount = this.marineSnow.length;
            this.metrics.benthicSedimentCarbon = Number(this.benthicSedimentCarbon.toFixed(1));
        }

        /**
         * Retrieve telemetry snapshot for environmental HUD and scientific codex.
         */
        getTelemetryMetrics() {
            return { ...this.metrics };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BiogeochemicalCycleSystem;
    } else {
        global.BiogeochemicalCycleSystem = BiogeochemicalCycleSystem;
        global.biogeochemicalSystem = new BiogeochemicalCycleSystem();
    }
})(typeof window !== "undefined" ? window : global);
