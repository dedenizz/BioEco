// BioEcosystem - Hemichordate Trimeric Morphology, Tornaria Larva & Pharyngeal Slit Optics
// Module: src/render/hemichordate_optics.js
// Version: 7.73.0 (Hour 493 - Looks Agent: Trimeric Regionalization, Stomochord Glow, Pharyngeal Efflux & Tornaria Larvae)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HemichordateOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for hemichordate (acorn worm) biology:
     * - Trimeric Body Plan: Distinct muscular proboscis (prosoma), circular collar (mesosoma), and vermiform trunk (metasoma)
     * - Stomochord Structural Glow: Translucent cyan inner skeletal cord supporting proboscis peristalsis
     * - Pharyngeal Gill Slit Jets: Paired ciliated U-slits expelling micro-efflux water vortices and respiratory oxygenation hales
     * - Antiseptic Bromophenol Mucus Aura: Radiant amber colloidal sheen protecting burrow linings
     * - Pelagic Tornaria Larvae: Delicate bell-shaped transparent larvae with meandering ciliated bands drifting in midwater
     * - Benthic U-Burrow Galleries: Translucent tunnel walls in the sediment with localized benthic displacement plumes
     */
    class HemichordateOpticsRenderer {
        /**
         * Render individual hemichordate organism with proboscis, collar, stomochord, and branchial gill slits.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawHemichordate(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isHemichordate) return;

            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);
            const probLength = org.proboscisLength || 16.0;
            const collarW = org.collarWidth || 14.0;
            const trunkL = org.trunkLength || 42.0;
            const slits = org.gillSlitsCount || 12;
            const slitEff = org.gillSlitEfficiency || 0.45;
            const stomochord = org.stomochordTurgor || 0.70;
            const isBurrowing = org.isBurrowing || false;

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Antiseptic Bromophenol Mucus Halo (Golden sheen during burrowing or defence)
            if (isBurrowing || (org.bromophenolSecretion && org.bromophenolSecretion > 0.20)) {
                HemichordateOpticsRenderer.drawBromophenolMucusHalo(ctx, trunkL, collarW, org.bromophenolSecretion || 0.3, tick);
            }

            // 2. Metasoma (Vermiform Trunk & Branchial Region)
            HemichordateOpticsRenderer.drawTrunkAndBranchial(ctx, trunkL, collarW, slits, slitEff, tick);

            // 3. Mesosoma (Contractile Collar encircling mouth)
            HemichordateOpticsRenderer.drawCollar(ctx, collarW, tick);

            // 4. Prosoma (Muscular Hydrostatic Proboscis & Stomochord Core)
            HemichordateOpticsRenderer.drawProboscisAndStomochord(ctx, probLength, stomochord, tick, org);

            ctx.restore();
        }

        /**
         * Render muscular proboscis with inner glowing stomochord diverticulum.
         */
        static drawProboscisAndStomochord(ctx, probLength, stomochord, tick, org) {
            const pulse = 1.0 + 0.08 * Math.sin(tick * 0.08);
            const halfW = (probLength * 0.42) * pulse;

            // Muscular Conical Proboscis Body
            ctx.beginPath();
            ctx.moveTo(0, -halfW * 0.8);
            ctx.bezierCurveTo(probLength * 0.45, -halfW, probLength * 0.85, -halfW * 0.4, probLength, 0);
            ctx.bezierCurveTo(probLength * 0.85, halfW * 0.4, probLength * 0.45, halfW, 0, halfW * 0.8);
            ctx.closePath();

            const pGrad = ctx.createLinearGradient(0, 0, probLength, 0);
            pGrad.addColorStop(0, "rgba(217, 119, 6, 0.85)"); // Deep amber
            pGrad.addColorStop(0.65, "rgba(245, 158, 11, 0.75)"); // Warm gold
            pGrad.addColorStop(1, "rgba(254, 243, 199, 0.90)"); // Cream tip
            ctx.fillStyle = pGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(180, 83, 9, 0.70)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Inner Stomochord Skeletal Core (Homologous notochord precursor)
            const stomoLen = probLength * 0.55 * stomochord;
            ctx.beginPath();
            ctx.ellipse(stomoLen * 0.5, 0, stomoLen * 0.5, halfW * 0.32 * stomochord, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(6, 182, 212, " + (0.35 + 0.30 * stomochord) + ")"; // Translucent cyan glow
            ctx.fill();
            ctx.strokeStyle = "rgba(14, 165, 233, 0.80)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Silt Clogging Particles & Mineral Deposits
            if (org && org.siltCloggingLevel && org.siltCloggingLevel > 0.25) {
                const siltAlpha = Math.min(0.85, org.siltCloggingLevel * 0.90);
                ctx.fillStyle = "rgba(120, 53, 15, " + siltAlpha + ")";
                const speckleCount = Math.floor(org.siltCloggingLevel * 8);
                for (let sp = 0; sp < speckleCount; sp++) {
                    const sx = (probLength * 0.2) + ((sp * 7 + tick) % Math.floor(probLength * 0.7));
                    const sy = ((sp % 2 === 0 ? 1 : -1) * halfW * 0.55);
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Water Flushing Expulsion Shockwave Rings
            if (org && org.proboscisFlushingTimer && org.proboscisFlushingTimer > 0.0) {
                const flushProgress = 1.0 - (org.proboscisFlushingTimer / 2.5);
                const flushRadius = probLength + (flushProgress * 28.0);
                const flushAlpha = Math.max(0.0, 0.65 * (1.0 - flushProgress));

                ctx.save();
                ctx.beginPath();
                ctx.arc(probLength * 0.8, 0, flushRadius * 0.45, -Math.PI * 0.6, Math.PI * 0.6);
                ctx.strokeStyle = "rgba(6, 182, 212, " + flushAlpha + ")";
                ctx.lineWidth = 1.8;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(probLength * 0.8, 0, flushRadius * 0.65, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.strokeStyle = "rgba(245, 158, 11, " + (flushAlpha * 0.8) + ")";
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.restore();
            }
        }

        /**
         * Render muscular ring collar (mesosoma).
         */
        static drawCollar(ctx, collarW, tick) {
            const halfH = collarW * 0.55;
            const collarL = collarW * 0.45;

            ctx.beginPath();
            ctx.rect(-collarL, -halfH, collarL, halfH * 2);
            const cGrad = ctx.createLinearGradient(-collarL, 0, 0, 0);
            cGrad.addColorStop(0, "rgba(180, 83, 9, 0.90)");
            cGrad.addColorStop(0.5, "rgba(217, 119, 6, 0.95)");
            cGrad.addColorStop(1, "rgba(146, 64, 14, 0.90)");
            ctx.fillStyle = cGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(120, 53, 15, 0.85)";
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Circumferential Muscle Band Lines
            ctx.beginPath();
            ctx.moveTo(-collarL * 0.5, -halfH + 1);
            ctx.lineTo(-collarL * 0.5, halfH - 1);
            ctx.strokeStyle = "rgba(254, 215, 170, 0.45)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        /**
         * Render elongated metasoma trunk, pharyngeal branchial region, and U-shaped gill slits.
         */
        static drawTrunkAndBranchial(ctx, trunkL, collarW, slits, slitEff, tick) {
            const collarL = collarW * 0.45;
            const startX = -collarL;
            const endX = -(collarL + trunkL);
            const halfW = collarW * 0.48;

            // Undulating vermiform trunk outline
            ctx.beginPath();
            ctx.moveTo(startX, -halfW);
            const wave1 = Math.sin(tick * 0.06) * 1.5;
            const wave2 = Math.cos(tick * 0.06) * 2.0;

            ctx.bezierCurveTo(
                startX - trunkL * 0.35, -halfW * 0.9 + wave1,
                startX - trunkL * 0.70, -halfW * 0.6 + wave2,
                endX, -halfW * 0.2
            );
            ctx.bezierCurveTo(
                startX - trunkL * 0.70, halfW * 0.6 + wave2,
                startX - trunkL * 0.35, halfW * 0.9 + wave1,
                startX, halfW
            );
            ctx.closePath();

            const tGrad = ctx.createLinearGradient(startX, 0, endX, 0);
            tGrad.addColorStop(0, "rgba(202, 138, 4, 0.85)"); // Ochre
            tGrad.addColorStop(0.4, "rgba(161, 98, 7, 0.78)");
            tGrad.addColorStop(1, "rgba(113, 63, 18, 0.65)"); // Tapered tail
            ctx.fillStyle = tGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(133, 77, 14, 0.75)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Branchial Region with Paired U-Shaped Pharyngeal Gill Slits
            const branchialLength = trunkL * 0.45;
            const slitSpacing = branchialLength / Math.max(1, slits);

            for (let s = 0; s < slits; s++) {
                const sx = startX - 3.0 - (s * slitSpacing);
                const syOffset = halfW * 0.65;
                const slitPulsar = Math.sin(tick * 0.12 + s * 0.35) * 0.8;

                // Dorsolateral paired slits (upper & lower rows)
                for (let side = -1; side <= 1; side += 2) {
                    const slitY = side * (syOffset + slitPulsar * 0.5);

                    ctx.beginPath();
                    // U-shaped gill pore
                    ctx.arc(sx, slitY, 1.2, 0, Math.PI);
                    ctx.strokeStyle = "rgba(6, 182, 212, " + (0.50 + 0.40 * slitEff) + ")";
                    ctx.lineWidth = 1.0;
                    ctx.stroke();

                    // Micro ciliary respiratory efflux halo
                    if (slitEff > 0.30) {
                        ctx.beginPath();
                        ctx.arc(sx, slitY + side * 1.5, 2.2 + slitEff * 2.0, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(6, 182, 212, " + (0.10 + 0.15 * slitEff) + ")";
                        ctx.fill();
                    }
                }
            }
        }

        /**
         * Render radiating bromophenol / iodoform antiseptic mucus sheath.
         */
        static drawBromophenolMucusHalo(ctx, trunkL, collarW, intensity, tick) {
            const pulse = 1.0 + 0.05 * Math.sin(tick * 0.05);
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(-(trunkL * 0.45), 0, (trunkL * 0.65) * pulse, (collarW * 1.1) * pulse, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(217, 119, 6, " + (0.08 + 0.12 * intensity) + ")";
            ctx.fill();
            ctx.strokeStyle = "rgba(245, 158, 11, " + (0.15 + 0.15 * intensity) + ")";
            ctx.setLineDash([3, 4]);
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Render global benthic U-burrow galleries and sediment plumes in substrate layer.
         */
        static drawGlobalHemichordateEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.getMetrics ? manager.getMetrics() : {};
            const burrowers = metrics.activeBurrowersCount || 0;
            if (burrowers === 0) return;

            const sedimentBaseY = height - 90;
            ctx.save();

            // Translucent U-Burrow Galleries
            ctx.strokeStyle = "rgba(180, 83, 9, 0.22)";
            ctx.lineWidth = 4.0;
            ctx.lineCap = "round";

            const burrowCount = Math.min(8, burrowers + 2);
            for (let b = 0; b < burrowCount; b++) {
                const bx = ((b * 83 + tick * 0.02) % (width - 60)) + 30;
                const by = sedimentBaseY + (b % 3) * 15;
                const bDepth = 25 + (b % 4) * 8;

                ctx.beginPath();
                ctx.moveTo(bx - 12, by);
                ctx.quadraticCurveTo(bx - 12, by + bDepth, bx, by + bDepth);
                ctx.quadraticCurveTo(bx + 12, by + bDepth, bx + 12, by);
                ctx.stroke();

                // Antiseptic mucus lining highlight
                ctx.strokeStyle = "rgba(217, 119, 6, 0.15)";
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render pelagic Tornaria larvae drifting in the water column and ciliary efflux streams.
         */
        static drawHemichordateLarvaeAndFlux(ctx, organisms, tick) {
            if (!ctx || !organisms) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isHemichordate) continue;

                // Render Pelagic Tornaria Larva if organism possesses larval phase
                if (org.hasTornariaPhase && org.energy && org.energy > 55.0) {
                    const lx = org.x + Math.sin(tick * 0.04 + i) * 22.0;
                    const ly = Math.max(40.0, org.y - 30.0 - Math.cos(tick * 0.03 + i) * 18.0);
                    const lSize = 3.8;

                    // Transparent bell-shaped larval body
                    ctx.beginPath();
                    ctx.ellipse(lx, ly, lSize * 1.2, lSize * 0.9, 0, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
                    ctx.fill();
                    ctx.strokeStyle = "rgba(6, 182, 212, 0.70)";
                    ctx.lineWidth = 0.8;
                    ctx.stroke();

                    // Meandering Ciliated Bands (Telotroch & Longitudinal bands)
                    ctx.beginPath();
                    ctx.arc(lx, ly, lSize * 1.5, tick * 0.1, tick * 0.1 + Math.PI);
                    ctx.strokeStyle = "rgba(254, 243, 199, 0.65)";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();

                    // Larval ocelli eye-spot
                    ctx.beginPath();
                    ctx.arc(lx + 0.8, ly - 0.8, 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
                    ctx.fill();
                }

                // Ciliary water efflux streamlines from branchial region
                if (org.gillSlitEfficiency && org.gillSlitEfficiency > 0.40) {
                    const effX = org.x - Math.cos(Math.atan2(org.vy || 0, org.vx || 1)) * 12.0;
                    const effY = org.y - Math.sin(Math.atan2(org.vy || 0, org.vx || 1)) * 12.0;
                    const streamCount = 2;

                    for (let s = 0; s < streamCount; s++) {
                        const sAngle = tick * 0.15 + s * Math.PI + i;
                        const dist = 6.0 + org.gillSlitEfficiency * 8.0;

                        ctx.beginPath();
                        ctx.arc(effX + Math.cos(sAngle) * dist, effY + Math.sin(sAngle) * dist, 1.2, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(6, 182, 212, " + (0.15 + 0.25 * org.gillSlitEfficiency) + ")";
                        ctx.fill();
                    }
                }
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HemichordateOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.HemichordateOpticsRenderer = HemichordateOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
