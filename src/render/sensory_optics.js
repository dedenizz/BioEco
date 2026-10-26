// BioEcosystem - Sensory Organ Optics, Bioluminescent Photophores & Night Vision Renderer
// Module: src/render/sensory_optics.js
// Version: 4.88.0 (Hour 208 - Looks Agent Photophore Aesthetics & Visual Cones)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class SensoryOpticsRenderer {
        // Main render hook called inside Organism.prototype.draw in local coordinate space
        static drawSensoryStructures(ctx, org, tick) {
            if (!org || !org.dna || !org.alive) return;

            const dna = org.dna;
            const size = dna.size || 6.0;
            const animTime = tick || 0;

            const statDensity = dna.statocystSensoryDensity || 0.0;
            const rhopCadence = dna.rhopaliaEquilibriumCadence || 0.0;
            const ocelliSens = dna.ocelliPhototaxisSensitivity || 0.0;
            const bioLum = dna.bioluminescenceLuminosity || 0.0;
            const currentLum = org.currentLuminosity || 0.0;
            const lightRadius = org.lightRadius || 0.0;

            // 1. Directional Visual Perception Cone (Cephalic Field of View)
            if (ocelliSens >= 0.15) {
                SensoryOpticsRenderer.drawVisualCone(ctx, org, size, ocelliSens, animTime);
            }

            // 2. Bioluminescent Photophore Glands & Fluid Illumination Halos
            if (org.hasPhotophores || bioLum >= 0.18 || currentLum > 0.01) {
                SensoryOpticsRenderer.drawPhotophoreField(ctx, org, size, bioLum, currentLum, lightRadius, animTime);
            }

            // 3. Statocyst Crystalline Vesicle & Deflecting Statolith
            if (org.hasStatocysts || statDensity >= 0.20) {
                SensoryOpticsRenderer.drawStatocystVesicle(ctx, org, size, statDensity, animTime);
            }

            // 4. Rhopalia Marginal Pacemaker Beacons
            if (org.hasRhopalia || rhopCadence >= 0.22) {
                SensoryOpticsRenderer.drawRhopaliaNodes(ctx, org, size, rhopCadence, animTime);
            }

            // 5. Paired Pigment-Cup Ocelli & Directional Refraction Flares
            if (ocelliSens >= 0.15) {
                SensoryOpticsRenderer.drawOcelli(ctx, org, size, ocelliSens, animTime);
            }
        }

        // Draw forward visual perception sector representing directional field of awareness
        static drawVisualCone(ctx, org, size, sensitivity, tick) {
            ctx.save();
            const coneReach = size * (2.8 + sensitivity * 1.8);
            const halfAngle = 0.58; // ~33 degrees half-angle (66 degrees total cone)

            const pulse = Math.sin(tick * 0.08 + (org.x || 0)) * 0.2 + 0.8;
            ctx.beginPath();
            ctx.moveTo(size * 0.6, 0);
            ctx.arc(size * 0.6, 0, coneReach, -halfAngle, halfAngle);
            ctx.closePath();

            // Subtle photic cone shimmer
            ctx.fillStyle = "rgba(253, 224, 71, " + (0.035 * pulse * Math.min(1.0, sensitivity)) + ")";
            ctx.fill();
            ctx.strokeStyle = "rgba(253, 224, 71, " + (0.18 * pulse * Math.min(1.0, sensitivity)) + ")";
            ctx.lineWidth = 0.6;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        // Draw active bioluminescent photophores, underwater luminous glow and lure rays
        static drawPhotophoreField(ctx, org, size, bioLum, currentLum, lightRadius, tick) {
            ctx.save();
            const posX = size * 0.72; // Anterior photophore lure position
            const posY = 0.0;
            const isApex = org.niche === "carnivore";

            // A. Fluid Medium Water Luminescence Halo (Global soft radial glow)
            if (currentLum > 0.04) {
                const glowR = Math.max(12.0, lightRadius * 0.85);
                const haloGrad = ctx.createRadialGradient(posX, posY, 1.5, posX, posY, glowR);
                const primaryColor = isApex ? "rgba(56, 189, 248, " : "rgba(52, 211, 153, ";
                const secondaryColor = isApex ? "rgba(14, 165, 233, " : "rgba(16, 185, 129, ";

                haloGrad.addColorStop(0, primaryColor + (0.42 * Math.min(1.0, currentLum)) + ")");
                haloGrad.addColorStop(0.45, secondaryColor + (0.16 * Math.min(1.0, currentLum)) + ")");
                haloGrad.addColorStop(1, "rgba(7, 9, 13, 0)");

                ctx.fillStyle = haloGrad;
                ctx.beginPath();
                ctx.arc(posX, posY, glowR, 0, Math.PI * 2);
                ctx.fill();

                // Dynamic Caustic Shockwave Ripples during peak flash
                if (currentLum > 0.45) {
                    const waveR = glowR * (0.6 + Math.sin(tick * 0.25) * 0.3);
                    ctx.strokeStyle = primaryColor + (0.28 * currentLum) + ")";
                    ctx.lineWidth = 0.75;
                    ctx.setLineDash([4, 3]);
                    ctx.beginPath();
                    ctx.arc(posX, posY, waveR, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }

            // B. Aggressive Mimicry Light Trap Filaments (When prey is being actively lured)
            if (org.luredPreyCount && org.luredPreyCount > 0 && currentLum > 0.12) {
                const filamentCount = Math.min(6, 2 + org.luredPreyCount);
                ctx.strokeStyle = "rgba(186, 230, 253, 0.45)";
                ctx.lineWidth = 0.8;
                for (let i = 0; i < filamentCount; i++) {
                    const filamentAngle = -0.5 + (i * 1.0) / (filamentCount - 1) + Math.sin(tick * 0.15 + i) * 0.12;
                    const filLength = size * (2.2 + Math.cos(tick * 0.2 + i) * 0.8);
                    ctx.beginPath();
                    ctx.moveTo(posX, posY);
                    ctx.lineTo(posX + Math.cos(filamentAngle) * filLength, posY + Math.sin(filamentAngle) * filLength);
                    ctx.stroke();
                }
            }

            // C. Photophore Glandular Core Bulb (Physical organ on organism body)
            const bulbR = Math.max(1.2, size * 0.16 + currentLum * 0.6);
            ctx.beginPath();
            ctx.arc(posX, posY, bulbR * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = isApex ? "rgba(56, 189, 248, 0.65)" : "rgba(52, 211, 153, 0.65)";
            ctx.fill();

            // Sclerotized photophore reflective backing cup
            ctx.beginPath();
            ctx.arc(posX - 0.4, posY, bulbR * 1.1, Math.PI * 0.5, Math.PI * 1.5);
            ctx.fillStyle = "#0f172a";
            ctx.fill();

            // Refringent Luciferin Core
            ctx.beginPath();
            ctx.arc(posX, posY, bulbR * 0.75, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            ctx.restore();
        }

        // Draw anterior statocyst capsule with opalescent statolith stone
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

        // Draw marginal rhopalia equilibrium pacemakers and angular damping waves
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

        // Draw cephalic paired pigment-cup ocelli with refractive photoreceptor lens
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
