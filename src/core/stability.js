// BioEcosystem - Core Stability, Numerical Clamping & Defensive Guards
// Module: src/core/stability.js
// Version: 4.85.0 (Hour 205 - QA Agent 10,000-Tick Stability Audit)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class StabilityValidator {
        // Enforce physical boundary limits and guard against NaN / infinite divergence
        static clampSensoryState(org) {
            if (!org) return;

            // 1. Statolith Physical Bounds
            if (!Number.isFinite(org.statolithDeflection)) {
                org.statolithDeflection = 0.0;
            } else {
                org.statolithDeflection = Math.max(0.0, Math.min(1.0, org.statolithDeflection));
            }

            if (!Number.isFinite(org.statolithX)) org.statolithX = 0.0;
            if (!Number.isFinite(org.statolithY)) org.statolithY = 0.0;
            
            // Constrain displacement coordinates within capsule radius
            const capRadius = 4.0;
            const distSq = org.statolithX * org.statolithX + org.statolithY * org.statolithY;
            if (distSq > capRadius * capRadius) {
                const dist = Math.sqrt(distSq);
                org.statolithX = (org.statolithX / dist) * capRadius;
                org.statolithY = (org.statolithY / dist) * capRadius;
            }

            // 2. Rhopalia Equilibrium & Angular Stability Bounds
            if (!Number.isFinite(org.equilibriumStability)) {
                org.equilibriumStability = 0.5;
            } else {
                org.equilibriumStability = Math.max(0.1, Math.min(1.0, org.equilibriumStability));
            }

            // 3. Normalized Tilt Angle [-180, +180] degrees
            if (!Number.isFinite(org.tiltAngle)) {
                org.tiltAngle = 0.0;
            } else {
                let ang = org.tiltAngle;
                while (ang > 180.0) ang -= 360.0;
                while (ang < -180.0) ang += 360.0;
                org.tiltAngle = ang;
            }

            // 4. ATP Conservation Bonus [0.0 - 0.30] (Max 30% metabolic savings)
            if (!Number.isFinite(org.energyConservationBonus)) {
                org.energyConservationBonus = 0.0;
            } else {
                org.energyConservationBonus = Math.max(0.0, Math.min(0.30, org.energyConservationBonus));
            }

            // 5. Velocity Dampening on runaway acceleration
            const maxSpeed = 8.0;
            const speedSq = org.vx * org.vx + org.vy * org.vy;
            if (speedSq > maxSpeed * maxSpeed) {
                const speed = Math.sqrt(speedSq);
                org.vx = (org.vx / speed) * maxSpeed;
                org.vy = (org.vy / speed) * maxSpeed;
            }
        }

        // Clean unhooking of sensory and physiological pointers upon mortality
        static cleanupOrganism(org) {
            if (!org) return;
            org.alive = false;
            org.hasStatocysts = false;
            org.hasRhopalia = false;
            org.statolithDeflection = 0.0;
            org.equilibriumStability = 0.0;
            org.energyConservationBonus = 0.0;
            
            if (org.sensorySystem) {
                org.sensorySystem.statolithDeflection = 0.0;
                org.sensorySystem.equilibriumStability = 0.0;
                org.sensorySystem.energyConservationBonus = 0.0;
                org.sensorySystem.organism = null;
                org.sensorySystem = null;
            }
        }

        // Quick integrity audit over live population
        static auditPopulation(organisms) {
            let nanCount = 0;
            let infCount = 0;
            let clampedCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o.alive) continue;

                if (!Number.isFinite(o.x) || !Number.isFinite(o.y) || !Number.isFinite(o.energy)) {
                    nanCount++;
                }

                if (o.hasStatocysts || o.hasRhopalia) {
                    if (!Number.isFinite(o.statolithDeflection) || !Number.isFinite(o.equilibriumStability)) {
                        clampedCount++;
                    }
                    StabilityValidator.clampSensoryState(o);
                }
            }

            return {
                nanCount: nanCount,
                infCount: infCount,
                clampedCount: clampedCount
            };
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = StabilityValidator;
    } else {
        global.StabilityValidator = StabilityValidator;
    }
})(typeof window !== "undefined" ? window : global);
