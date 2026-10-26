// BioEcosystem - Chemical Pheromone Trails, Alarm Plumes & Colonial Swarm Optics Renderer
// Module: src/render/pheromone_optics.js
// Version: 5.03.0 (Hour 223 - Looks Agent Pheromone Dispersion Trails & Swarm Auras)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class PheromoneOpticsRenderer {
        // Render individual pheromone chemical puffs in global dish space
        static drawPuff(ctx, p, tick) {
            if (!p || p.decay <= 0.04) return;

            const alpha = Math.max(0.0, Math.min(0.65, p.decay * 0.55));
            const radius = Math.max(4.0, (p.radius || 12.0) * (0.85 + (p.age || 0) * 0.01));
            const animPulse = Math.sin((tick * 0.1) + (p.x * 0.05)) * 1.5;

            ctx.save();

            if (p.type === 1) {
                // Type 1: Alarm Distress Plume (Crimson-Rose Expanding Shockwave)
                const grad = ctx.createRadialGradient(p.x, p.y, 2.0, p.x, p.y, radius + animPulse);
                grad.addColorStop(0.0, "rgba(244, 63, 94, " + (alpha * 0.75) + ")");
                grad.addColorStop(0.5, "rgba(239, 68, 68, " + (alpha * 0.35) + ")");
                grad.addColorStop(1.0, "rgba(244, 63, 94, 0.0)");

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius + animPulse, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Expanding acoustic/chemical shockwave ripple
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(2.0, (radius + animPulse) * 0.8), 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(253, 164, 175, " + (alpha * 0.9) + ")";
                ctx.lineWidth = 1.0;
                ctx.setLineDash([3, 3]);
                ctx.stroke();
            } else if (p.type === 2) {
                // Type 2: Colony Marker Node (Ethereal Violet Pheromone Anchor)
                const grad = ctx.createRadialGradient(p.x, p.y, 1.0, p.x, p.y, radius);
                grad.addColorStop(0.0, "rgba(192, 132, 252, " + (alpha * 0.6) + ")");
                grad.addColorStop(0.6, "rgba(168, 85, 247, " + (alpha * 0.25) + ")");
                grad.addColorStop(1.0, "rgba(168, 85, 247, 0.0)");

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Core condensation speck
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(243, 232, 255, " + alpha + ")";
                ctx.fill();
            } else {
                // Type 0: Foraging / Aggregation Trail (Cyan-Azure Fluid Ribbon Puff)
                const grad = ctx.createRadialGradient(p.x, p.y, 1.5, p.x, p.y, radius);
                grad.addColorStop(0.0, "rgba(56, 189, 248, " + (alpha * 0.65) + ")");
                grad.addColorStop(0.5, "rgba(6, 182, 212, " + (alpha * 0.3) + ")");
                grad.addColorStop(1.0, "rgba(56, 189, 248, 0.0)");

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Shimmering micro-droplet core
                const shimmer = (Math.sin((tick * 0.15) + (p.y * 0.1)) + 1.0) * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2 + shimmer * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(224, 242, 254, " + (alpha * 0.85) + ")";
                ctx.fill();
            }

            ctx.restore();
        }

        // Render all active chemical trail nodes in global dish coordinate space
        static drawAllPheromoneTrails(ctx, pheromonePool, tick) {
            if (!ctx || !Array.isArray(pheromonePool) || pheromonePool.length === 0) return;

            for (let i = 0; i < pheromonePool.length; i++) {
                PheromoneOpticsRenderer.drawPuff(ctx, pheromonePool[i], tick);
            }
        }

        // Render colonial auras and hydrodynamic drag envelopes between schooling conspecifics
        static drawColonialAuras(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length < 2) return;

            ctx.save();

            const schoolingThreshold = 0.40;
            const maxLinkDist = 55.0;
            const maxLinkDistSq = maxLinkDist * maxLinkDist;

            // 1. Draw delicate biogenic tension threads between near conspecific neighbors
            ctx.lineWidth = 0.8;
            for (let i = 0; i < organisms.length; i++) {
                const oA = organisms[i];
                if (!oA || !oA.alive || (oA.socialCohesion || 0) < schoolingThreshold) continue;

                for (let j = i + 1; j < organisms.length; j++) {
                    const oB = organisms[j];
                    if (!oB || !oB.alive || oB.species !== oA.species) continue;
                    if ((oB.socialCohesion || 0) < schoolingThreshold) continue;

                    const dx = oB.x - oA.x;
                    const dy = oB.y - oA.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq > 4.0 && distSq < maxLinkDistSq) {
                        const dist = Math.sqrt(distSq);
                        const proximityAlpha = Math.max(0.0, (1.0 - dist / maxLinkDist) * 0.28);

                        // Subtle glowing social tension thread
                        ctx.beginPath();
                        ctx.moveTo(oA.x, oA.y);
                        ctx.lineTo(oB.x, oB.y);
                        ctx.strokeStyle = "rgba(168, 85, 247, " + proximityAlpha.toFixed(3) + ")";
                        ctx.stroke();
                    }
                }
            }

            // 2. Draw hydrodynamic drag reduction envelope around schooling individuals
            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive || (o.socialCohesion || 0) < schoolingThreshold) continue;

                const size = (o.dna && o.dna.size) ? o.dna.size : 6.0;
                const cohesion = o.socialCohesion || 0.5;
                const envelopeRadius = size * 1.55;
                const pulse = Math.sin((tick * 0.08) + (o.x * 0.02)) * 1.0;
                const envAlpha = Math.min(0.35, cohesion * 0.35);

                const grad = ctx.createRadialGradient(o.x, o.y, size * 0.8, o.x, o.y, envelopeRadius + pulse);
                grad.addColorStop(0.0, "rgba(168, 85, 247, 0.0)");
                grad.addColorStop(0.7, "rgba(192, 132, 252, " + (envAlpha * 0.6).toFixed(3) + ")");
                grad.addColorStop(1.0, "rgba(168, 85, 247, 0.0)");

                ctx.beginPath();
                ctx.arc(o.x, o.y, envelopeRadius + pulse, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Faint hydrodynamic laminar slip boundary
                ctx.beginPath();
                ctx.arc(o.x, o.y, envelopeRadius + pulse, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(233, 213, 255, " + (envAlpha * 0.5).toFixed(3) + ")";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PheromoneOpticsRenderer;
    } else {
        global.PheromoneOpticsRenderer = PheromoneOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
