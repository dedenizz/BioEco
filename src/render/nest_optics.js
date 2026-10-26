// BioEcosystem - Benthic Nest Structural Architecture, Bio-Silk Webbing & Caste Optics Renderer
// Module: src/render/nest_optics.js
// Version: 5.08.0 (Hour 228 - Looks Agent Benthic Hive Visuals & Caste Morphology)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class NestOpticsRenderer {
        // Render a single benthic nest node on the seafloor in global dish coordinates
        static drawNest(ctx, nest, tick) {
            if (!ctx || !nest) return;

            const x = nest.x;
            const y = nest.y;
            const radius = nest.radius || 36.0;
            const fillRatio = Math.max(0.0, Math.min(1.0, (nest.storedNutrients || 0) / (nest.maxNutrients || 250.0)));
            const animPulse = Math.sin((tick * 0.05) + (x * 0.02)) * 1.5;

            ctx.save();

            // 1. Radial Bio-Silk Mooring Struts anchored into benthic sediment
            const strutCount = 8;
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = "rgba(192, 132, 252, 0.35)";
            for (let i = 0; i < strutCount; i++) {
                const angle = (i / strutCount) * Math.PI * 2 + (tick * 0.005);
                const strutLen = radius * 1.45 + Math.sin(angle * 3 + tick * 0.05) * 2.0;
                const endX = x + Math.cos(angle) * strutLen;
                const endY = y + Math.sin(angle) * strutLen;

                ctx.beginPath();
                ctx.moveTo(x + Math.cos(angle) * (radius * 0.6), y + Math.sin(angle) * (radius * 0.6));
                ctx.lineTo(endX, endY);
                ctx.stroke();

                // Sediment anchor footing node
                ctx.beginPath();
                ctx.arc(endX, endY, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(233, 213, 255, 0.5)";
                ctx.fill();
            }

            // 2. Protective Sanctuary Defense Perimeter (+20% kinetic mitigation aura)
            const sanctuaryGrad = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius + animPulse);
            sanctuaryGrad.addColorStop(0.0, "rgba(168, 85, 247, 0.08)");
            sanctuaryGrad.addColorStop(0.7, "rgba(52, 211, 153, 0.06)");
            sanctuaryGrad.addColorStop(1.0, "rgba(168, 85, 247, 0.0)");

            ctx.beginPath();
            ctx.arc(x, y, radius + animPulse, 0, Math.PI * 2);
            ctx.fillStyle = sanctuaryGrad;
            ctx.fill();

            // Calcite-silk perimeter rim
            ctx.beginPath();
            ctx.arc(x, y, radius + animPulse, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(192, 132, 252, 0.45)";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // 3. Central Communal Nutrient Store (Pulsating amber-gold biomass reservoir)
            const coreRadius = Math.max(6.0, 10.0 + fillRatio * 16.0);
            const corePulse = Math.sin(tick * 0.08) * 1.0;
            const coreGrad = ctx.createRadialGradient(x, y, 2.0, x, y, coreRadius + corePulse);
            coreGrad.addColorStop(0.0, "rgba(254, 240, 138, 0.85)");
            coreGrad.addColorStop(0.45, "rgba(251, 191, 36, 0.55)");
            coreGrad.addColorStop(1.0, "rgba(217, 119, 6, 0.0)");

            ctx.beginPath();
            ctx.arc(x, y, coreRadius + corePulse, 0, Math.PI * 2);
            ctx.fillStyle = coreGrad;
            ctx.fill();

            // Core condensation nucleus
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fill();

            // 4. Larval Nursery Brood Pearls (Micro-spheres around the nutrient core)
            const broodTotal = Math.min(10, nest.broodCount || 0);
            for (let i = 0; i < broodTotal; i++) {
                const bAngle = (i / Math.max(1, broodTotal)) * Math.PI * 2 + (tick * 0.02);
                const bDist = coreRadius + 4.5;
                const bx = x + Math.cos(bAngle) * bDist;
                const by = y + Math.sin(bAngle) * bDist;

                ctx.beginPath();
                ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(253, 244, 255, 0.8)";
                ctx.fill();
                ctx.strokeStyle = "rgba(236, 72, 153, 0.6)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            ctx.restore();
        }

        // Render all active benthic nest nodes
        static drawAllNests(ctx, nestNodes, tick) {
            if (!ctx || !Array.isArray(nestNodes) || nestNodes.length === 0) return;

            for (let i = 0; i < nestNodes.length; i++) {
                NestOpticsRenderer.drawNest(ctx, nestNodes[i], tick);
            }
        }

        // Render caste-specific phenotypic morphology and role insignia on organisms
        static drawCasteOverlay(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.socialCaste || org.socialCaste === "SOLITARY") return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const x = org.x;
            const y = org.y;
            const heading = Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(heading);

            if (org.socialCaste === "SCOUT") {
                // SCOUT: Forward cyan sensory vibrissae antennae and aerodynamic cephalic crest
                ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                ctx.lineWidth = 0.8;
                const antPulse = Math.sin(tick * 0.2) * 1.5;

                // Left & right vibrissae
                ctx.beginPath();
                ctx.moveTo(size * 0.6, -size * 0.3);
                ctx.lineTo(size * 1.4, -size * 0.8 + antPulse);
                ctx.moveTo(size * 0.6, size * 0.3);
                ctx.lineTo(size * 1.4, size * 0.8 - antPulse);
                ctx.stroke();

                // Antenna terminal olfactory glints
                ctx.beginPath();
                ctx.arc(size * 1.4, -size * 0.8 + antPulse, 1.0, 0, Math.PI * 2);
                ctx.arc(size * 1.4, size * 0.8 - antPulse, 1.0, 0, Math.PI * 2);
                ctx.fillStyle = "#38bdf8";
                ctx.fill();
            } else if (org.socialCaste === "WORKER") {
                // WORKER: Ventral amber crop vesicle carrying pooled nutrients
                const cropGlow = org.trophallaxisStatus === "DEPOSITING" ? 0.85 : 0.45;
                ctx.beginPath();
                ctx.arc(-size * 0.2, 0, size * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 191, 36, " + cropGlow + ")";
                ctx.fill();
                ctx.strokeStyle = "rgba(245, 158, 11, 0.6)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            } else if (org.socialCaste === "SOLDIER") {
                // SOLDIER: Hypertrophied sclerotized mandibular trophi pincers flanking the head
                ctx.strokeStyle = "#f43f5e";
                ctx.lineWidth = 1.2;
                ctx.fillStyle = "rgba(244, 63, 94, 0.4)";

                // Left pincer
                ctx.beginPath();
                ctx.moveTo(size * 0.4, -size * 0.4);
                ctx.lineTo(size * 1.2, -size * 0.7);
                ctx.lineTo(size * 0.9, -size * 0.2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Right pincer
                ctx.beginPath();
                ctx.moveTo(size * 0.4, size * 0.4);
                ctx.lineTo(size * 1.2, size * 0.7);
                ctx.lineTo(size * 0.9, size * 0.2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (org.socialCaste === "QUEEN") {
                // QUEEN: Crowned imperial crest and pulsing physogastric magenta halo
                const qPulse = Math.sin(tick * 0.1) * 1.5;
                ctx.beginPath();
                ctx.arc(0, 0, size * 1.35 + qPulse, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(236, 72, 153, 0.65)";
                ctx.lineWidth = 1.0;
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Dorsal reproductive crown coronet
                ctx.fillStyle = "#ec4899";
                ctx.beginPath();
                ctx.moveTo(size * 0.8, -size * 0.3);
                ctx.lineTo(size * 1.15, 0);
                ctx.lineTo(size * 0.8, size * 0.3);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }

        // Render caste overlays for all active organisms
        static drawAllCasteOverlays(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length === 0) return;

            for (let i = 0; i < organisms.length; i++) {
                NestOpticsRenderer.drawCasteOverlay(ctx, organisms[i], tick);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = NestOpticsRenderer;
    } else {
        global.NestOpticsRenderer = NestOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
