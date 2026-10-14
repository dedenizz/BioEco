// BioEcosystem - Sensory Organ Optics & Microscopic Refraction Renderer
// Module: src/render/sensory_optics.js
// Version: 4.83.0 (Hour 203 - Looks Agent Sensory Optics & Ocelli Glimmer)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class SensoryOpticsRenderer {
        static drawSensoryStructures(ctx, org, tick) {
            if (!org || !org.dna || !org.alive) return;

            const dna = org.dna;
            const size = dna.size || 6.0;
            const animTime = tick || 0;

            const statDensity = dna.statocystSensoryDensity || 0.0;
            const rhopCadence = dna.rhopaliaEquilibriumCadence || 0.0;
            const ocelliSens = dna.ocelliPhototaxisSensitivity || 0.0;

            if (org.hasStatocysts || statDensity >= 0.20) {
                SensoryOpticsRenderer.drawStatocystVesicle(ctx, org, size, statDensity, animTime);
            }

            if (org.hasRhopalia || rhopCadence >= 0.22) {
                SensoryOpticsRenderer.drawRhopaliaNodes(ctx, org, size, rhopCadence, animTime);
            }

            if (ocelliSens >= 0.15) {
                SensoryOpticsRenderer.drawOcelli(ctx, org, size, ocelliSens, animTime);
            }
        }

        static drawStatocystVesicle(ctx, org, size, density, tick) {
            const posX = size * 0.42;
            const posY = 0.0;
            const capR = Math.max(2.0, size * (0.18 + density * 0.08));

            ctx.save();
            ctx.beginPath();
            ctx.arc(posX, posY, capR, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(99, 102, 241, 0.14)";
            ctx.fill();
            ctx.strokeStyle = "rgba(199, 210, 254, 0.65)";
            ctx.lineWidth = 0.9;
            ctx.stroke();

            const fringeCount = 6;
            ctx.strokeStyle = "rgba(165, 180, 252, 0.32)";
            ctx.lineWidth = 0.6;
            for (let i = 0; i < fringeCount; i++) {
                const angle = (i * Math.PI * 2) / fringeCount + (tick * 0.03);
                const x1 = posX + Math.cos(angle) * (capR - 0.2);
                const y1 = posY + Math.sin(angle) * (capR - 0.2);
                const x2 = posX + Math.cos(angle) * (capR * 0.45);
                const y2 = posY + Math.sin(angle) * (capR * 0.45);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            const rawDx = (org.statolithX || 0.0);
            const rawDy = (org.statolithY || 0.0);
            const maxOffset = capR * 0.62;
            const dist = Math.sqrt(rawDx * rawDx + rawDy * rawDy);
            const factor = dist > 0.001 ? Math.min(maxOffset, dist) / dist : 0;
            const stoneX = posX + rawDx * factor;
            const stoneY = posY + rawDy * factor;

            const stoneR = Math.max(0.9, capR * 0.32);

            const glimmerPulse = Math.sin(tick * 0.18 + posX) * 0.25 + 0.75;
            ctx.beginPath();
            ctx.arc(stoneX, stoneY, stoneR * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(224, 231, 255, " + (0.35 * glimmerPulse) + ")";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(stoneX, stoneY, stoneR, 0, Math.PI * 2);
            ctx.fillStyle = "#f8fafc";
            ctx.fill();
            ctx.strokeStyle = "#818cf8";
            ctx.lineWidth = 0.6;
            ctx.stroke();

            ctx.restore();
        }

        static drawRhopaliaNodes(ctx, org, size, cadence, tick) {
            ctx.save();
            const lateralOffset = size * 0.78;
            const rhopR = 1.35;
            const pulseRate = 0.14 * (1.0 + cadence * 0.8);
            const pulse = Math.sin(tick * pulseRate) * 0.5 + 0.5;

            const stability = org.equilibriumStability !== undefined ? org.equilibriumStability : 0.5;
            const isCalm = stability > 0.72;
            const nodeFill = isCalm ? "#38bdf8" : "#c084fc";
            const haloFill = isCalm ? "rgba(56, 189, 248, " + (0.28 + pulse * 0.3) + ")" : "rgba(192, 132, 252, " + (0.32 + pulse * 0.35) + ")";

            const nodes = [
                { x: size * 0.10, y: -lateralOffset },
                { x: size * 0.10, y: lateralOffset }
            ];

            for (let i = 0; i < nodes.length; i++) {
                const nd = nodes[i];

                if (org.energyConservationBonus && org.energyConservationBonus > 0.05) {
                    ctx.beginPath();
                    ctx.arc(nd.x, nd.y, rhopR * (1.8 + pulse * 1.4), 0, Math.PI * 2);
                    ctx.strokeStyle = haloFill;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(nd.x, nd.y, rhopR, 0, Math.PI * 2);
                ctx.fillStyle = nodeFill;
                ctx.fill();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            ctx.restore();
        }

        static drawOcelli(ctx, org, size, sensitivity, tick) {
            ctx.save();
            const eyeX = size * 0.68;
            const eyeSpread = size * 0.44;
            const eyeR = Math.max(1.1, size * (0.12 + sensitivity * 0.05));

            const eyes = [
                { x: eyeX, y: -eyeSpread, dir: -0.2 },
                { x: eyeX, y: eyeSpread, dir: 0.2 }
            ];

            const sparkle = Math.sin(tick * 0.22 + eyeX) * 0.3 + 0.7;

            for (let i = 0; i < eyes.length; i++) {
                const eye = eyes[i];

                ctx.beginPath();
                ctx.arc(eye.x, eye.y, eyeR * 1.25, Math.PI * 0.5 + eye.dir, Math.PI * 1.5 + eye.dir);
                ctx.fillStyle = "#1e1b4b";
                ctx.fill();
                ctx.strokeStyle = "#312e81";
                ctx.lineWidth = 0.6;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(eye.x + 0.4, eye.y, eyeR * 0.75, 0, Math.PI * 2);
                ctx.fillStyle = "#fde047";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(eye.x + eyeR * 0.8, eye.y);
                ctx.lineTo(eye.x + eyeR * (1.8 + sparkle * 0.6), eye.y);
                ctx.strokeStyle = "rgba(253, 224, 71, " + (0.45 * sparkle) + ")";
                ctx.lineWidth = 0.9;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SensoryOpticsRenderer;
    } else {
        global.SensoryOpticsRenderer = SensoryOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
