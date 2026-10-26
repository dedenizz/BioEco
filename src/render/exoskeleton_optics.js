// BioEcosystem - Biomineralized Exoskeleton, Sclerite Plates, Ecdysis & Exuvia Optics Renderer
// Module: src/render/exoskeleton_optics.js
// Version: 4.98.0 (Hour 218 - Looks Agent Ecdysis Animation, Soft-Shell Glow & Benthic Exuviae)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class ExoskeletonOpticsRenderer {
        // Main render hook called inside Organism.prototype.draw in local coordinate space
        static drawExoskeleton(ctx, org, tick) {
            if (!org || !org.dna || !org.alive) return;

            const thickness = org.cuticleThickness || 0.0;
            const hardness = org.scleriteHardness || 0.1;
            const isMolting = !!org.isMolting;
            const hasExo = org.hasExoskeleton || thickness >= 0.20 || isMolting;
            if (!hasExo) return;

            const size = org.dna.size || 6.0;
            const animTime = tick || 0;
            const somiteCount = Math.max(3, Math.min(10, org.dna.somiteCount || 5));

            ctx.save();

            // 1. Soft-Shell Post-Ecdysis Vulnerability Glow & Dorsal Fissure
            if (isMolting) {
                ExoskeletonOpticsRenderer.drawSoftShellVulnerability(ctx, org, size, animTime);
            }

            // 2. Overlapping Dorsal Sclerite Tergite Plates (modulated by tanning sclerotization)
            ExoskeletonOpticsRenderer.drawScleriteTergites(ctx, org, size, somiteCount, thickness, hardness, isMolting, animTime);

            // 3. Lateral Joint Articulations & Podomere Pivot Knobs
            ExoskeletonOpticsRenderer.drawArticularJoints(ctx, org, size, somiteCount, thickness, hardness, animTime);

            // 4. Nacreous Mineral Sheen & Dorsal Specular Crest (only active when tanned/hardened)
            if (!isMolting && hardness >= 0.35) {
                ExoskeletonOpticsRenderer.drawNacreousSheen(ctx, org, size, hardness, animTime);
            }

            // 5. Glancing Ricochet Impact Flash (when predator strikes are deflected)
            if (!isMolting && org.exoskeletonSystem && org.exoskeletonSystem.deflectedStrikesCount > 0) {
                ExoskeletonOpticsRenderer.drawDeflectionAura(ctx, org, size, animTime);
            }

            ctx.restore();
        }

        // Draw soft-shell vulnerability phosphorescence and cracked dorsal suture
        static drawSoftShellVulnerability(ctx, org, size, tick) {
            const timer = org.softCuticleTimer || 0;
            const pulse = Math.sin(tick * 0.25) * 0.3 + 0.7;

            // Vulnerability warning dashed halo
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.35, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(239, 68, 68, " + (0.35 * pulse) + ")";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Soft tender cuticle pinkish-amber inner glow
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.15, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(251, 146, 60, " + (0.18 * pulse) + ")";
            ctx.fill();

            // Suture splitting crack line along anterior dorsal crest
            ctx.beginPath();
            ctx.moveTo(size * 0.8, 0);
            ctx.lineTo(-size * 0.4, 0);
            ctx.strokeStyle = "rgba(253, 224, 71, " + (0.65 * pulse) + ")";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // Render sequential segmented sclerite plates (carapace armor)
        static drawScleriteTergites(ctx, org, size, somites, thickness, hardness, isMolting, tick) {
            const plateLength = (size * 2.2) / somites;
            const startX = size * 0.9;
            const flexRatio = (org.dna.articularJointFlexibility || 1.0);

            // Sclerotization tanning alpha: soft during ecdysis, opaque when fully tanned
            let alphaBase = Math.min(0.88, 0.45 + hardness * 0.42);
            if (isMolting) {
                const tanningProgress = 1.0 - Math.max(0.0, Math.min(1.0, (org.softCuticleTimer || 0) / 180.0));
                alphaBase = 0.20 + tanningProgress * 0.50; // Gradually hardens
            }

            const hue = org.dna.hue || 180;

            for (let i = 0; i < somites; i++) {
                const segProgress = i / (somites - 1 || 1);
                const segX = startX - (i * plateLength * 0.92);
                const taper = Math.sin(segProgress * Math.PI) * 0.4 + 0.6;
                const plateHalfW = size * (0.85 + thickness * 0.12) * taper;

                const waveY = Math.sin(tick * 0.18 + i * 0.7) * (0.35 * flexRatio);

                // A. Flexible Inter-Segment Arthrodial Joint Membrane (beneath plates)
                if (i > 0) {
                    ctx.beginPath();
                    ctx.arc(segX + plateLength * 0.45, waveY, plateHalfW * 0.85, -Math.PI * 0.5, Math.PI * 0.5);
                    ctx.fillStyle = "rgba(224, 231, 255, 0.22)";
                    ctx.fill();
                    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                // B. Hardened Sclerite Tergite Plate
                ctx.beginPath();
                ctx.moveTo(segX + plateLength * 0.4, -plateHalfW + waveY);
                ctx.lineTo(segX - plateLength * 0.5, -plateHalfW * 1.12 + waveY);
                ctx.lineTo(segX - plateLength * 0.3, waveY);
                ctx.lineTo(segX - plateLength * 0.5, plateHalfW * 1.12 + waveY);
                ctx.lineTo(segX + plateLength * 0.4, plateHalfW + waveY);
                ctx.closePath();

                const plateFill = hardness > 0.65
                    ? `hsla(${hue}, 45%, ${35 + hardness * 25}%, ${alphaBase})`
                    : `hsla(34, 75%, ${28 + hardness * 24}%, ${alphaBase})`;

                ctx.fillStyle = plateFill;
                ctx.fill();

                ctx.strokeStyle = isMolting ? "rgba(251, 191, 36, 0.45)" : (hardness > 0.65 ? "#fef08a" : "#b45309");
                ctx.lineWidth = 0.85;
                ctx.stroke();
            }
        }

        // Draw lateral articular joint pivot nodes on somite flanks
        static drawArticularJoints(ctx, org, size, somites, thickness, hardness, tick) {
            const plateLength = (size * 2.2) / somites;
            const startX = size * 0.9;
            const jointRadius = Math.max(0.8, size * 0.12);

            ctx.fillStyle = "#92400e";
            ctx.strokeStyle = "#fef3c7";
            ctx.lineWidth = 0.6;

            for (let i = 0; i < somites; i++) {
                const segProgress = i / (somites - 1 || 1);
                const segX = startX - (i * plateLength * 0.92);
                const taper = Math.sin(segProgress * Math.PI) * 0.4 + 0.6;
                const flankY = size * (0.85 + thickness * 0.12) * taper * 1.08;

                const rowPhase = Math.sin(tick * 0.20 + i * 0.8) * 1.2;

                ctx.beginPath();
                ctx.arc(segX, -flankY + rowPhase, jointRadius, 0, Math.PI * 2);
                ctx.arc(segX, flankY + rowPhase, jointRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        }

        // Draw pearlescent nacreous specular crest highlight along dorsal axis
        static drawNacreousSheen(ctx, org, size, hardness, tick) {
            const sheenLength = size * 1.7;
            const pulse = Math.sin(tick * 0.12 + (org.x || 0)) * 0.2 + 0.8;

            const nacreGrad = ctx.createLinearGradient(sheenLength * 0.5, 0, -sheenLength * 0.5, 0);
            nacreGrad.addColorStop(0, "rgba(254, 243, 199, 0)");
            nacreGrad.addColorStop(0.35, "rgba(255, 255, 255, " + (0.45 * hardness * pulse) + ")");
            nacreGrad.addColorStop(0.7, "rgba(186, 230, 253, " + (0.35 * hardness * pulse) + ")");
            nacreGrad.addColorStop(1, "rgba(254, 243, 199, 0)");

            ctx.beginPath();
            ctx.moveTo(sheenLength * 0.5, 0);
            ctx.lineTo(-sheenLength * 0.5, 0);
            ctx.strokeStyle = nacreGrad;
            ctx.lineWidth = Math.max(1.0, size * 0.24);
            ctx.stroke();
        }

        // Draw glancing deflection shockwave halo when predator bite ricochets
        static drawDeflectionAura(ctx, org, size, tick) {
            const flash = Math.sin(tick * 0.35) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(251, 191, 36, " + (0.45 * flash) + ")";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Render an individual discarded exuvia mineral husk on the seafloor
        static drawBenthicExuvia(ctx, ex, tick) {
            if (!ex) return;
            ctx.save();
            ctx.translate(ex.x, ex.y);

            const size = ex.size || 6.0;
            const shimmer = Math.sin(tick * 0.08 + ex.x) * 0.15 + 0.85;

            // Ghostly semi-translucent hollow carapace shell
            ctx.beginPath();
            ctx.ellipse(0, 0, size * 1.15, size * 0.75, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(254, 243, 199, " + (0.22 * shimmer) + ")";
            ctx.fill();
            ctx.strokeStyle = "rgba(251, 191, 36, " + (0.55 * shimmer) + ")";
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Open split ecdysial suture fissure (where the arthropod escaped)
            ctx.beginPath();
            ctx.moveTo(-size * 0.6, 0);
            ctx.lineTo(size * 0.7, 0);
            ctx.strokeStyle = "rgba(254, 243, 199, 0.75)";
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Calcareous mineral particulate halo
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.4, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(110, 231, 183, " + (0.18 * shimmer) + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.restore();
        }

        // Render all seafloor exuviae in global coordinate space
        static drawAllExuviae(ctx, exuviae, tick) {
            if (!exuviae || exuviae.length === 0) return;
            for (let i = 0; i < exuviae.length; i++) {
                ExoskeletonOpticsRenderer.drawBenthicExuvia(ctx, exuviae[i], tick);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ExoskeletonOpticsRenderer;
    } else {
        global.ExoskeletonOpticsRenderer = ExoskeletonOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
