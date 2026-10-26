// BioEcosystem - Pheromone Signaling & Colonial Aggregation Organ System
// Module: src/organs/pheromones.js
// Version: 5.02.0 (Hour 222 - System Agent Pheromone Diffusion & Trail Kinetics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class PheromoneSystem {
        constructor(organism) {
            this.organism = organism;

            // Genetic parameters or baseline defaults
            const dna = (organism && organism.dna) ? organism.dna : {};
            this.emissionRate = typeof dna.pheromoneEmissionRate === "number" ? dna.pheromoneEmissionRate : 0.20;
            this.sensitivity = typeof dna.pheromoneSensitivity === "number" ? dna.pheromoneSensitivity : 0.30;
            this.colonialAffinity = typeof dna.colonialAffinity === "number" ? dna.colonialAffinity : 0.25;

            // Operational timers and dynamic state
            this.lastEmissionTick = 0;
            this.cooldownTicks = 16;
            this.flockingVector = { x: 0.0, y: 0.0 };
            this.gradientVector = { x: 0.0, y: 0.0 };
            this.activeTrailCount = 0;
            this.socialCohesionScore = 0.0;
            this.alarmResponseActive = false;
            this.metabolicDragDiscount = 1.0;
        }

        // Emit a localized chemical signaling puff into the environmental pool
        emitPuff(type, customIntensity) {
            const org = this.organism;
            if (!org || !org.alive) return null;

            const baseIntensity = typeof customIntensity === "number" ? customIntensity : (this.emissionRate * 1.5);
            const clampedIntensity = Math.max(0.1, Math.min(3.0, baseIntensity));

            return {
                x: org.x,
                y: org.y,
                type: type || 0, // 0: Aggregation, 1: Alarm, 2: Colony Marker
                intensity: Number(clampedIntensity.toFixed(2)),
                decay: 1.0,
                maxAge: 140,
                age: 0,
                species: org.species || 0,
                radius: 12.0 + clampedIntensity * 8.0
            };
        }

        // Event triggers: predator bite alarm and food ingestion trail
        onPredatorBite(pheromonePool) {
            if (!Array.isArray(pheromonePool)) return;
            const puff = this.emitPuff(1, 2.5); // Type 1: Alarm
            if (puff) pheromonePool.push(puff);
        }

        onFoodIngested(pheromonePool) {
            if (!Array.isArray(pheromonePool)) return;
            const puff = this.emitPuff(0, 1.8); // Type 0: Aggregation
            if (puff) pheromonePool.push(puff);
        }

        // Scan the surrounding chemical field and calculate gradient vector toward highest attractant
        detectChemicalGradient(pheromonePool, perceptionRadius) {
            const org = this.organism;
            if (!org || !org.alive || !Array.isArray(pheromonePool) || pheromonePool.length === 0) {
                this.gradientVector.x = 0.0;
                this.gradientVector.y = 0.0;
                this.activeTrailCount = 0;
                return this.gradientVector;
            }

            const radius = typeof perceptionRadius === "number" ? perceptionRadius : (45.0 + this.sensitivity * 30.0);
            const radiusSq = radius * radius;
            let gradX = 0.0, gradY = 0.0, detectedCount = 0;
            let highestAlarmDistSq = Infinity, alarmX = 0.0, alarmY = 0.0;

            for (let i = 0; i < pheromonePool.length; i++) {
                const p = pheromonePool[i];
                if (!p || p.decay <= 0.05) continue;

                const dx = p.x - org.x;
                const dy = p.y - org.y;
                const distSq = dx * dx + dy * dy;

                if (distSq > 0.001 && distSq <= radiusSq) {
                    const dist = Math.sqrt(distSq);
                    const weight = (p.intensity * p.decay) / (dist + 5.0);

                    if (p.type === 1) { // Alarm pheromone: repels
                        if (distSq < highestAlarmDistSq) {
                            highestAlarmDistSq = distSq;
                            alarmX = -dx / dist;
                            alarmY = -dy / dist;
                        }
                    } else if (p.species === org.species || p.type === 0) { // Aggregation / Foraging trail
                        gradX += (dx / dist) * weight;
                        gradY += (dy / dist) * weight;
                        detectedCount++;
                    }
                }
            }

            this.activeTrailCount = detectedCount;

            // Prioritize alarm avoidance if in proximity to acute danger
            if (highestAlarmDistSq < radiusSq * 0.6) {
                this.alarmResponseActive = true;
                this.gradientVector.x = alarmX;
                this.gradientVector.y = alarmY;
            } else {
                this.alarmResponseActive = false;
                const len = Math.sqrt(gradX * gradX + gradY * gradY);
                if (len > 0.001) {
                    this.gradientVector.x = gradX / len;
                    this.gradientVector.y = gradY / len;
                } else {
                    this.gradientVector.x = 0.0;
                    this.gradientVector.y = 0.0;
                }
            }
            return this.gradientVector;
        }

        // Calculate conspecific clustering and alignment forces (Boids social cohesion)
        calculateFlockingForce(nearbyOrganisms, neighborRadius) {
            const org = this.organism;
            if (!org || !org.alive || !Array.isArray(nearbyOrganisms)) {
                this.flockingVector.x = 0.0;
                this.flockingVector.y = 0.0;
                this.socialCohesionScore = 0.0;
                this.metabolicDragDiscount = 1.0;
                return this.flockingVector;
            }

            const radius = typeof neighborRadius === "number" ? neighborRadius : 50.0;
            const radiusSq = radius * radius;
            let centerX = 0.0, centerY = 0.0, alignX = 0.0, alignY = 0.0, neighborCount = 0;

            for (let i = 0; i < nearbyOrganisms.length; i++) {
                const other = nearbyOrganisms[i];
                if (!other || !other.alive || other === org || other.species !== org.species) continue;

                const dx = other.x - org.x;
                const dy = other.y - org.y;
                const distSq = dx * dx + dy * dy;

                if (distSq > 0.01 && distSq <= radiusSq) {
                    centerX += other.x;
                    centerY += other.y;
                    if (typeof other.vx === "number" && typeof other.vy === "number") {
                        alignX += other.vx;
                        alignY += other.vy;
                    }
                    neighborCount++;
                }
            }

            if (neighborCount > 0) {
                centerX /= neighborCount;
                centerY /= neighborCount;
                const toCenterX = centerX - org.x;
                const toCenterY = centerY - org.y;
                const distToCenter = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);
                const cohX = distToCenter > 0.1 ? (toCenterX / distToCenter) : 0.0;
                const cohY = distToCenter > 0.1 ? (toCenterY / distToCenter) : 0.0;

                const alignLen = Math.sqrt(alignX * alignX + alignY * alignY);
                const normAlignX = alignLen > 0.1 ? (alignX / alignLen) : 0.0;
                const normAlignY = alignLen > 0.1 ? (alignY / alignLen) : 0.0;

                const combinedX = cohX * 0.60 + normAlignX * 0.40;
                const combinedY = cohY * 0.60 + normAlignY * 0.40;
                const combinedLen = Math.sqrt(combinedX * combinedX + combinedY * combinedY);

                if (combinedLen > 0.01) {
                    this.flockingVector.x = combinedX / combinedLen;
                    this.flockingVector.y = combinedY / combinedLen;
                } else {
                    this.flockingVector.x = 0.0;
                    this.flockingVector.y = 0.0;
                }
                this.socialCohesionScore = Math.min(1.0, neighborCount / 5.0);
                this.metabolicDragDiscount = neighborCount >= 3 ? 0.88 : 1.0;
            } else {
                this.flockingVector.x = 0.0;
                this.flockingVector.y = 0.0;
                this.socialCohesionScore = 0.0;
                this.metabolicDragDiscount = 1.0;
            }
            return this.flockingVector;
        }

        // Apply chemical gradient and social flocking steering forces to organism velocity
        applySteeringForces(org, maxSpeed) {
            if (!org || !org.alive) return;
            const wChem = this.sensitivity * 0.45;
            const wFlock = this.colonialAffinity * 0.35;
            const steerWeight = 0.10;

            org.vx = (org.vx || 0) + (this.gradientVector.x * wChem + this.flockingVector.x * wFlock) * steerWeight;
            org.vy = (org.vy || 0) + (this.gradientVector.y * wChem + this.flockingVector.y * wFlock) * steerWeight;

            const limit = typeof maxSpeed === "number" ? maxSpeed : 1.8;
            const curSpd = Math.sqrt(org.vx * org.vx + org.vy * org.vy);
            if (curSpd > limit) {
                org.vx = (org.vx / curSpd) * limit;
                org.vy = (org.vy / curSpd) * limit;
            }
        }

        // Composite update cycle per simulation tick
        step(currentTick, pheromonePool, nearbyOrganisms) {
            const org = this.organism;
            if (!org || !org.alive) return null;

            this.detectChemicalGradient(pheromonePool);
            this.calculateFlockingForce(nearbyOrganisms);

            let newPuff = null;
            if (currentTick - this.lastEmissionTick >= this.cooldownTicks) {
                if (org.energy > 45.0 && Math.random() < (this.emissionRate * 0.4)) {
                    newPuff = this.emitPuff(0); // Aggregation trail puff
                    this.lastEmissionTick = currentTick;
                }
            }

            org.socialCohesion = Number(this.socialCohesionScore.toFixed(2));
            org.activeTrailCount = this.activeTrailCount;
            org.metabolicDragDiscount = this.metabolicDragDiscount;
            return newPuff;
        }

        // Reset system internal references on death
        cleanup() {
            this.organism = null;
            this.flockingVector.x = 0.0;
            this.flockingVector.y = 0.0;
            this.gradientVector.x = 0.0;
            this.gradientVector.y = 0.0;
        }

        // Static global pool management: decay, fluid drift, and eliminate exhausted markers
        static decayPool(pheromonePool, decayRate, maxCapacity, driftX, driftY) {
            if (!Array.isArray(pheromonePool)) return;

            const rate = typeof decayRate === "number" ? decayRate : 0.025;
            const cap = typeof maxCapacity === "number" ? maxCapacity : 200;
            const dx = typeof driftX === "number" ? driftX : 0.0;
            const dy = typeof driftY === "number" ? driftY : 0.0;

            for (let i = pheromonePool.length - 1; i >= 0; i--) {
                const p = pheromonePool[i];
                p.age = (p.age || 0) + 1;
                p.decay -= rate;
                p.x += dx;
                p.y += dy;
                p.radius = (p.radius || 12.0) + 0.15;

                if (p.decay <= 0.02 || p.age >= p.maxAge) {
                    pheromonePool.splice(i, 1);
                }
            }

            if (pheromonePool.length > cap) {
                pheromonePool.splice(0, pheromonePool.length - cap);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PheromoneSystem;
    } else {
        global.PheromoneSystem = PheromoneSystem;
    }
})(typeof window !== "undefined" ? window : global);
