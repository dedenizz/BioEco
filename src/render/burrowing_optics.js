// BioEcosystem - Benthic Excavation Plumes, Substrate Galleries & Infaunal Optics
// Module: src/render/burrowing_optics.js
// Version: 6.38.0 (Hour 358 - Looks Agent: Peristaltic Waves, Gas Bubbles & Bio-Irrigation)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BurrowingOpticsRenderer
     * High-fidelity microscope rendering of infaunal burrowing adaptations and benthic substrate dynamics:
     * - Reciprocating chitinous fossorial paddles (fossorialPaddles) along organism flanks
     * - Subterranean burrowing depth, sediment concealment, and infaunal soft auras
     * - Peristaltic hydraulic coelomic contraction rings during sediment tunneling
     * - Mineral excavation plumes and suspension clouds kicked up by burrowing torque
     * - Bio-irrigation ascending gas bubbles and benthic aeration conduits
     * - Infaunal gallery channels, sediment tunnels, and benthic oxygenation veins
     */
    class BurrowingOpticsRenderer {
        static drawCellBurrowing(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const paddles = org.fossorialPaddles || 0.0;
            const burrowDepth = org.burrowDepth || 0.0;
            const impulse = org.peristalticImpulse || 0.0;
            if (paddles < 0.2 && burrowDepth < 2.0) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            if (burrowDepth >= 2.0) {
                BurrowingOpticsRenderer.drawInfaunalAura(ctx, org, size, burrowDepth, tick);
            }
            if (impulse > 0.04 && burrowDepth >= 4.0) {
                BurrowingOpticsRenderer.drawPeristalticWaves(ctx, org, size, impulse, tick);
            }
            if (paddles >= 0.2) {
                BurrowingOpticsRenderer.drawFossorialPaddles(ctx, org, size, paddles, tick);
            }
            if (org.isBurrowing && burrowDepth > 4.0) {
                BurrowingOpticsRenderer.drawLocalExcavationRing(ctx, org, size, burrowDepth, tick);
            }
            ctx.restore();
        }

        static drawFossorialPaddles(ctx, org, size, paddles, tick) {
            const count = Math.min(8, Math.max(2, Math.floor(paddles)));
            const phase = (org.excavationCyclePhase !== undefined) ? org.excavationCyclePhase : (tick * 0.12);
            const paddleLength = size * (0.55 + Math.min(0.65, paddles * 0.10));
            const paddleWidth = Math.max(2.0, size * 0.28);

            ctx.save();
            ctx.translate(org.x, org.y);
            const heading = (org.vx || org.vy) ? Math.atan2(org.vy, org.vx) : 0.0;
            ctx.rotate(heading);

            const halfCount = Math.ceil(count / 2);
            for (let side = -1; side <= 1; side += 2) {
                for (let i = 0; i < halfCount; i++) {
                    const angleOffset = Math.PI * 0.55 + (i / Math.max(1, halfCount)) * Math.PI * 0.50;
                    const strokeOffset = Math.sin(phase + i * 0.75) * 0.28;
                    const finalAngle = (side * angleOffset) + side * strokeOffset;

                    const rootX = Math.cos(finalAngle) * (size * 0.85);
                    const rootY = Math.sin(finalAngle) * (size * 0.85);
                    const tipX = rootX + Math.cos(finalAngle) * paddleLength;
                    const tipY = rootY + Math.sin(finalAngle) * paddleLength;

                    ctx.beginPath();
                    ctx.moveTo(rootX, rootY);
                    ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = "rgba(180, 83, 9, 0.75)";
                    ctx.lineWidth = paddleWidth;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(tipX, tipY, paddleWidth * 0.55, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(245, 158, 11, 0.90)";
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        static drawPeristalticWaves(ctx, org, size, impulse, tick) {
            const phase = (org.excavationCyclePhase || 0) * 2.0;
            for (let w = 0; w < 2; w++) {
                const ringRadius = size * (0.90 + 0.35 * Math.sin(phase + w * Math.PI));
                const alpha = Math.min(0.55, impulse * 1.8 * (0.6 + 0.4 * Math.cos(phase + w * Math.PI)));
                ctx.beginPath();
                ctx.arc(org.x, org.y, Math.max(2.0, ringRadius), 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(253, 186, 116, " + alpha.toFixed(3) + ")";
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }
        }

        static drawInfaunalAura(ctx, org, size, burrowDepth, tick) {
            const depthRatio = Math.min(1.0, burrowDepth / 75.0);
            const auraRadius = size * (1.35 + depthRatio * 0.45);
            const pulse = 0.85 + 0.15 * Math.sin(tick * 0.06 + org.x * 0.05);

            const grad = ctx.createRadialGradient(org.x, org.y, size * 0.4, org.x, org.y, auraRadius);
            grad.addColorStop(0.0, "rgba(120, 53, 15, " + (0.35 * pulse * depthRatio).toFixed(3) + ")");
            grad.addColorStop(0.5, "rgba(180, 83, 9, " + (0.20 * depthRatio).toFixed(3) + ")");
            grad.addColorStop(1.0, "rgba(245, 158, 11, 0.0)");

            ctx.beginPath();
            ctx.arc(org.x, org.y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        static drawLocalExcavationRing(ctx, org, size, burrowDepth, tick) {
            const ringRadius = size * 1.55 + (tick % 24) * 0.4;
            const alpha = Math.max(0.0, (1.0 - (tick % 24) / 24.0) * 0.45);
            ctx.beginPath();
            ctx.arc(org.x, org.y, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(217, 119, 6, " + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        static drawSubstrateGalleries(ctx, organisms, width, height, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length === 0) return;
            const burrowers = [];
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (org && org.alive && (org.burrowDepth || 0) >= 3.0) burrowers.push(org);
            }
            if (burrowers.length === 0) return;

            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < burrowers.length; i++) {
                const b1 = burrowers[i];
                for (let j = i + 1; j < burrowers.length; j++) {
                    const b2 = burrowers[j];
                    const dx = b2.x - b1.x, dy = b2.y - b1.y;
                    if (dx * dx + dy * dy < 7225) {
                        ctx.moveTo(b1.x, b1.y);
                        const midX = (b1.x + b2.x) * 0.5 + Math.sin(tick * 0.04 + i) * 6.0;
                        const midY = (b1.y + b2.y) * 0.5 + Math.cos(tick * 0.04 + j) * 4.0;
                        ctx.quadraticCurveTo(midX, midY, b2.x, b2.y);
                    }
                }
            }
            ctx.strokeStyle = "rgba(180, 83, 9, 0.22)";
            ctx.lineWidth = 4.0;
            ctx.lineCap = "round";
            ctx.stroke();

            ctx.strokeStyle = "rgba(6, 182, 212, 0.22)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        static drawBioIrrigationBubbles(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length === 0) return;
            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                const bubbleTicks = org.ventBubbleTicks || 0;
                const gasFlux = org.sedimentGasVentFlux || 0.0;
                if (bubbleTicks <= 0 && gasFlux <= 0.001) continue;

                const riseDelta = (16 - bubbleTicks) * 1.5;
                const bubbleY = org.y - riseDelta;
                const wobbleX = org.x + Math.sin(tick * 0.15 + i) * 3.5;
                const radius = Math.max(1.5, 2.5 + gasFlux * 60.0);
                const alpha = Math.min(0.65, (bubbleTicks / 16.0) * 0.60 + 0.10);

                ctx.beginPath();
                ctx.arc(wobbleX, bubbleY, radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(34, 211, 238, " + alpha.toFixed(3) + ")";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(wobbleX, bubbleY, radius * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, " + (alpha * 0.7).toFixed(3) + ")";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawExcavationPlumes(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length === 0) return;
            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;
                const plumeTicks = org.burrowPlumeTicks || 0;
                const torque = org.penetrationTorque || 0.0;
                if (plumeTicks <= 0 && torque <= 0.3) continue;

                const baseRadius = 14.0 + (12 - plumeTicks) * 1.2;
                const plumeAlpha = Math.min(0.40, (plumeTicks / 12.0) * 0.35 + torque * 0.15);
                const plumeY = org.y - (12 - plumeTicks) * 0.8;

                const grad = ctx.createRadialGradient(org.x, plumeY, 2.0, org.x, plumeY, baseRadius);
                grad.addColorStop(0.0, "rgba(217, 119, 6, " + plumeAlpha.toFixed(3) + ")");
                grad.addColorStop(0.6, "rgba(180, 83, 9, " + (plumeAlpha * 0.5).toFixed(3) + ")");
                grad.addColorStop(1.0, "rgba(120, 53, 15, 0.0)");

                ctx.beginPath();
                ctx.arc(org.x, plumeY, baseRadius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BurrowingOpticsRenderer;
    } else {
        global.BurrowingOpticsRenderer = BurrowingOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
