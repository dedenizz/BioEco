// BioEcosystem - Early Chondrichthyes Prismatic Cartilage, Placoid Riblets & Polyphyodont Teeth Optics
// Module: src/render/chondrichthyes_optics.js
// Version: 8.35.0 (Hour 555 - Looks & UI Agent: Prismatic Cartilage Glow, Placoid Denticle Riblets & Polyphyodont Conveyor Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChondrichthyesOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Chondrichthyes / Elasmobranchii (cartilaginous fishes / ancestral sharks):
     * - Prismatic Calcified Cartilage (Tessellated Skeleton): Translucent cartilage reinforced by mineralized mosaic tiles (tesserae) glowing with cyan bioluminescence
     * - Placoid Denticles & Riblet Aerodynamics: Dermal tooth-like scales with backward-oriented micro-yivs breaking turbulent boundary layers
     * - Polyphyodont Tooth Conveyor Whorl: 3-7 ranks of replacement teeth visible behind active biting edge, glistening with pearl-white enameloid vitrodentin
     * - Spiracular Water Inflow: Paired dorsal respiratory apertures behind sensory orbits generating subtle laminar inflow rings
     * - Heterocercal Caudal Fin & Hydrodynamic Camber: Extended dorsal thrust lobe, paired triangular pectoral fins, and dorsal stabilizing fin
     * - 107th Telemetry Channel (% PDI) Sheath: Turquoise Ocean Blue / Cyan (#0ea5e9) boundary layer laminar aura
     * - 108th Telemetry Channel (% PBR) Radiance: Pure Ivory / Platinum (#f8fafc) conveyor tooth replacement whorl glow
     * - Streamlined Low-Drag Wake Trails: Micro-riblet vortex-breaking wake lines
     */
    class ChondrichthyesOpticsRenderer {
        /**
         * Render individual Chondrichthyes organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawChondrichthyes(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isChondrichthyes) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const bodyLen = 30.0 + size * 1.8;      // 32 - 48 px
            const bodyWidth = 14.0 + size * 1.0;    // 16 - 24 px
            const tailLen = 36.0 + size * 2.2;      // 40 - 58 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const wavePhase = ((tick * 0.22 * Math.max(0.7, speed)) + (org.id ? (org.id * 0.77) : 0.0)) % (Math.PI * 2);

            const pdi = (org.placoidDenticleIndex || 0.0) / 100.0;
            const pbr = (org.polyphyodontReplacementRate || 0.0) / 100.0;
            const ranks = org.toothRowRanks || 5;
            const sharpness = org.vitrodentinSharpness || 0.88;
            const rollPhase = org.conveyorRollPhase || 0.0;
            const ramActive = org.ramVentilationActive || false;
            const agility = org.hydrodynamicAgilityMultiplier || 1.55;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 107th Channel Boundary Layer Hydrodynamic Sheath (% PDI - Turquoise #0ea5e9)
            if (pdi > 0.15) {
                const pdiAlpha = 0.06 + pdi * 0.20 + (ramActive ? 0.15 : 0.0);
                ctx.save();
                ctx.strokeStyle = ramActive ? "rgba(14, 165, 233, " + Math.min(0.85, pdiAlpha + 0.30) + ")" :
                    "rgba(56, 189, 248, " + Math.max(0.04, pdiAlpha) + ")";
                ctx.lineWidth = 1.4 + pdi * 1.2;
                ctx.beginPath();
                ctx.ellipse(bodyLen * 0.15, 0, (bodyLen + tailLen) * 0.60, bodyWidth * (1.15 + pdi * 0.40), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. 108th Channel Polyphyodont Tooth Conveyor Halo (% PBR - Platinum Ivory #f8fafc)
            if (pbr > 0.20) {
                const pbrAlpha = 0.08 + pbr * 0.22;
                ctx.save();
                ctx.strokeStyle = "rgba(248, 250, 252, " + pbrAlpha + ")";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(bodyLen * 0.75, 0, bodyWidth * 0.55, -Math.PI * 0.45, Math.PI * 0.45);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Heterocercal Caudal Fin & Post-Cranial Body
            ChondrichthyesOpticsRenderer.drawHeterocercalTailAndFins(ctx, org, tick, tailLen, bodyWidth, wavePhase);

            // 4. Paired Pectoral Fins & Dorsal Stabilizer
            ChondrichthyesOpticsRenderer.drawPectoralAndDorsalFins(ctx, org, tick, bodyLen, bodyWidth, agility, speed);

            // 5. Tessellated Prismatic Calcified Cartilage Endoskeleton (internal glow)
            ChondrichthyesOpticsRenderer.drawPrismaticCartilageSkel(ctx, org, tick, bodyLen, bodyWidth);

            // 6. Fusiform Dermal Body with Placoid Denticle Riblets
            ChondrichthyesOpticsRenderer.drawPlacoidDenticleRiblets(ctx, org, tick, bodyLen, bodyWidth, pdi);

            // 7. Spiracular Water Inflow & Gill Slits
            ChondrichthyesOpticsRenderer.drawSpiracleAndGills(ctx, org, tick, bodyLen, bodyWidth, ramActive);

            // 8. Subterminal Mouth & Polyphyodont Conveyor Teeth
            ChondrichthyesOpticsRenderer.drawPolyphyodontTeeth(ctx, org, tick, bodyLen, bodyWidth, ranks, sharpness, rollPhase);

            ctx.restore();
        }

        /**
         * Render tessellated prismatic calcified cartilage skeleton (translucent cyan core).
         */
        static drawPrismaticCartilageSkel(ctx, org, tick, bodyLen, bodyWidth) {
            ctx.save();
            const halfW = bodyWidth * 0.28;

            // Axial cartilaginous vertebral column
            ctx.strokeStyle = "rgba(14, 165, 233, 0.75)";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.70, 0);
            ctx.lineTo(-bodyLen * 0.65, 0);
            ctx.stroke();

            // Prismatic mosaic tiles (tesserae) along axial cartilage
            const numTiles = 7;
            for (let i = 0; i < numTiles; i++) {
                const tx = bodyLen * 0.60 - (i / numTiles) * (bodyLen * 1.20);
                ctx.fillStyle = "rgba(224, 242, 254, 0.65)";
                ctx.beginPath();
                ctx.arc(tx, -halfW * 0.6, 1.2, 0, Math.PI * 2);
                ctx.arc(tx, halfW * 0.6, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Chondrocranium capsule outline (light cartilage skull)
            ctx.strokeStyle = "rgba(56, 189, 248, 0.50)";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.ellipse(bodyLen * 0.65, 0, bodyLen * 0.25, halfW * 1.2, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render fusiform streamlined body with micro-grooved placoid denticle riblet lines.
         */
        static drawPlacoidDenticleRiblets(ctx, org, tick, bodyLen, bodyWidth, pdi) {
            ctx.save();
            const halfW = bodyWidth * 0.50;
            const snoutX = bodyLen * 0.90;
            const backX = -bodyLen * 0.55;

            // Streamlined fusiform shark silhouette
            ctx.beginPath();
            ctx.moveTo(snoutX, 0);
            // Dorsal curve
            ctx.bezierCurveTo(bodyLen * 0.60, -halfW * 0.95, 0, -halfW, backX, -halfW * 0.45);
            ctx.lineTo(backX, halfW * 0.45);
            // Ventral curve
            ctx.bezierCurveTo(0, halfW, bodyLen * 0.60, halfW * 0.95, snoutX, 0);
            ctx.closePath();

            // Gradient: Sleek slate-cyan with silver-turquoise undertones
            const bodyGrad = ctx.createLinearGradient(snoutX, 0, backX, 0);
            bodyGrad.addColorStop(0.0, "rgba(15, 23, 42, 0.96)");
            bodyGrad.addColorStop(0.35, "rgba(30, 41, 59, 0.94)");
            bodyGrad.addColorStop(0.70, "rgba(51, 65, 85, 0.92)");
            bodyGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.96)");
            ctx.fillStyle = bodyGrad;
            ctx.fill();

            // Body contour stroke
            ctx.strokeStyle = pdi > 0.50 ? "rgba(56, 189, 248, 0.65)" : "rgba(148, 163, 184, 0.45)";
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Micro-riblet boundary layer streamline incisions along flanks
            const numRiblets = 5;
            ctx.strokeStyle = "rgba(186, 230, 253, " + (0.20 + pdi * 0.35) + ")";
            ctx.lineWidth = 0.7;
            for (let r = 0; r < numRiblets; r++) {
                const rx = bodyLen * 0.50 - r * (bodyLen * 0.20);
                const ryOffset = (r % 2 === 0 ? 1 : -1) * (halfW * 0.55);
                ctx.beginPath();
                ctx.moveTo(rx, ryOffset);
                ctx.lineTo(rx - 8.0, ryOffset);
                ctx.stroke();
            }

            // Sensory orbit eyes (amber-gold predatory gaze)
            const eyeX = bodyLen * 0.68;
            const eyeY = halfW * 0.65;
            for (let side = -1; side <= 1; side += 2) {
                ctx.fillStyle = "rgba(250, 204, 21, 0.90)";
                ctx.beginPath();
                ctx.arc(eyeX, side * eyeY, 1.8, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#0f172a";
                ctx.beginPath();
                ctx.arc(eyeX + 0.3, side * eyeY, 0.9, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render subterminal mouth and polyphyodont conveyor-belt tooth whorls.
         */
        static drawPolyphyodontTeeth(ctx, org, tick, bodyLen, bodyWidth, ranks, sharpness, rollPhase) {
            ctx.save();
            const halfW = bodyWidth * 0.40;
            const mouthX = bodyLen * 0.72; // Subterminal ventral position

            // Subterminal jaw arc
            ctx.strokeStyle = "rgba(226, 232, 240, 0.85)";
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.arc(mouthX, 0, halfW * 0.70, -Math.PI * 0.40, Math.PI * 0.40);
            ctx.stroke();

            // Concentric conveyor tooth ranks (3 to 7 rows)
            const numRanks = Math.max(3, Math.min(7, ranks));
            for (let r = 0; r < numRanks; r++) {
                const rankRadius = halfW * 0.68 - r * 1.4;
                if (rankRadius <= 0) break;

                const rankAlpha = Math.max(0.20, 0.90 - r * 0.16);
                ctx.strokeStyle = r === 0 ? "#ffffff" : "rgba(241, 245, 249, " + rankAlpha + ")";
                ctx.lineWidth = r === 0 ? 1.0 : 0.6;
                ctx.beginPath();
                ctx.arc(mouthX - r * 0.8, 0, rankRadius, -Math.PI * 0.35, Math.PI * 0.35);
                ctx.stroke();

                // Serrated vitrodentin tooth cusps
                if (r === 0 || r === 1) {
                    ctx.fillStyle = r === 0 ? "#ffffff" : "rgba(248, 250, 252, 0.85)";
                    for (let a = -0.30; a <= 0.30; a += 0.20) {
                        const tx = mouthX + Math.cos(a) * rankRadius;
                        const ty = Math.sin(a) * rankRadius;
                        ctx.beginPath();
                        ctx.moveTo(tx, ty);
                        ctx.lineTo(tx + 2.0, ty - 0.9);
                        ctx.lineTo(tx + 2.0, ty + 0.9);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render spiracles and 5-7 lateral branchial gill slits.
         */
        static drawSpiracleAndGills(ctx, org, tick, bodyLen, bodyWidth, ramActive) {
            ctx.save();
            const halfW = bodyWidth * 0.50;

            // 1. Paired dorsal spiracles behind eyes
            const spiracleX = bodyLen * 0.52;
            const spiracleY = halfW * 0.68;
            for (let side = -1; side <= 1; side += 2) {
                ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
                ctx.beginPath();
                ctx.ellipse(spiracleX, side * spiracleY, 1.8, 0.9, side * 0.2, 0, Math.PI * 2);
                ctx.fill();

                // Spiracular water intake ripple
                if (!ramActive) {
                    const rippleAlpha = 0.25 + Math.sin(tick * 0.20) * 0.15;
                    ctx.strokeStyle = "rgba(56, 189, 248, " + rippleAlpha + ")";
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.arc(spiracleX, side * spiracleY, 3.2, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // 2. Lateral 5 gill slits along pharyngeal flank
            const numGills = 5;
            ctx.strokeStyle = ramActive ? "rgba(14, 165, 233, 0.80)" : "rgba(148, 163, 184, 0.55)";
            ctx.lineWidth = 0.8;
            for (let g = 0; g < numGills; g++) {
                const gx = bodyLen * 0.38 - g * 2.8;
                for (let side = -1; side <= 1; side += 2) {
                    ctx.beginPath();
                    ctx.moveTo(gx, side * (halfW * 0.40));
                    ctx.lineTo(gx - 1.2, side * (halfW * 0.85));
                    ctx.stroke();
                }
            }

            ctx.restore();
        }

        /**
         * Render paired triangular pectoral fins and prominent dorsal fin.
         */
        static drawPectoralAndDorsalFins(ctx, org, tick, bodyLen, bodyWidth, agility, speed) {
            ctx.save();
            const halfW = bodyWidth * 0.50;
            const pecX = bodyLen * 0.20;
            const finFlap = Math.sin(tick * 0.20 * Math.max(0.6, speed)) * 0.14;

            // Paired triangular pectoral fins
            for (let side = -1; side <= 1; side += 2) {
                ctx.save();
                ctx.translate(pecX, side * halfW * 0.85);
                ctx.rotate(side * (0.50 + finFlap));

                const finLen = 16.0 + (org.dna ? (org.dna.size || 8.0) * 1.1 : 9.0);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-finLen * 0.40, side * finLen * 0.90);
                ctx.lineTo(-finLen, side * finLen * 0.35);
                ctx.lineTo(-6.0, 0);
                ctx.closePath();

                const finGrad = ctx.createLinearGradient(0, 0, -finLen, side * finLen);
                finGrad.addColorStop(0.0, "rgba(51, 65, 85, 0.94)");
                finGrad.addColorStop(0.7, "rgba(30, 41, 59, 0.88)");
                finGrad.addColorStop(1.0, "rgba(14, 165, 233, 0.75)");
                ctx.fillStyle = finGrad;
                ctx.fill();

                ctx.strokeStyle = "rgba(186, 230, 253, 0.45)";
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.restore();
            }

            // Prominent anterior dorsal fin (apex shark silhouette)
            const dorsalX = 0;
            ctx.save();
            ctx.translate(dorsalX, -halfW * 0.85);
            const dorsalLen = 14.0 + (org.dna ? (org.dna.size || 8.0) * 0.8 : 7.0);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-dorsalLen * 0.55, -dorsalLen * 0.95);
            ctx.lineTo(-dorsalLen, -dorsalLen * 0.25);
            ctx.lineTo(-4.0, 0);
            ctx.closePath();

            const dorsalGrad = ctx.createLinearGradient(0, 0, -dorsalLen, -dorsalLen);
            dorsalGrad.addColorStop(0.0, "rgba(30, 41, 59, 0.95)");
            dorsalGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.85)");
            ctx.fillStyle = dorsalGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(148, 163, 184, 0.50)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render powerful heterocercal caudal fin and undulating muscular tail.
         */
        static drawHeterocercalTailAndFins(ctx, org, tick, tailLen, bodyWidth, wavePhase) {
            ctx.save();
            const startX = -bodyLen_safe(org) * 0.55;
            const numSegments = 9;
            const spinePoints = [];
            const baseR = bodyWidth * 0.42;

            for (let i = 0; i <= numSegments; i++) {
                const u = i / numSegments;
                const sx = startX - u * tailLen;
                const amp = u * (baseR * 0.85);
                const sy = Math.sin(wavePhase - u * Math.PI * 2.1) * amp;
                const r = Math.max(1.8, baseR * (1.0 - u * 0.78));
                spinePoints.push({ x: sx, y: sy, r: r, u: u });
            }

            // Muscular tail outline
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                if (i === 0) ctx.moveTo(pt.x, pt.y - pt.r);
                else ctx.lineTo(pt.x, pt.y - pt.r);
            }
            for (let i = spinePoints.length - 1; i >= 0; i--) {
                const pt = spinePoints[i];
                ctx.lineTo(pt.x, pt.y + pt.r);
            }
            ctx.closePath();

            const tailGrad = ctx.createLinearGradient(startX, 0, startX - tailLen, 0);
            tailGrad.addColorStop(0.0, "rgba(30, 41, 59, 0.95)");
            tailGrad.addColorStop(0.6, "rgba(51, 65, 85, 0.90)");
            tailGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.85)");
            ctx.fillStyle = tailGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Strong Heterocercal Caudal Fin at tail apex
            const lastPt = spinePoints[spinePoints.length - 1];
            ctx.save();
            ctx.translate(lastPt.x, lastPt.y);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            // Extended dorsal lobe (high-thrust shark blade)
            ctx.lineTo(-tailLen * 0.45, -baseR * 1.55);
            ctx.lineTo(-tailLen * 0.28, -baseR * 0.40);
            // Caudal notch
            ctx.lineTo(-tailLen * 0.18, 0);
            // Shorter ventral lobe
            ctx.lineTo(-tailLen * 0.26, baseR * 0.95);
            ctx.lineTo(0, 0);
            ctx.closePath();

            const finGrad = ctx.createLinearGradient(0, 0, -tailLen * 0.45, 0);
            finGrad.addColorStop(0.0, "rgba(51, 65, 85, 0.90)");
            finGrad.addColorStop(0.7, "rgba(30, 41, 59, 0.82)");
            finGrad.addColorStop(1.0, "rgba(14, 165, 233, 0.70)");
            ctx.fillStyle = finGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(186, 230, 253, 0.50)";
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render wake trails, riblet streamlines, and burst shockwaves behind active Chondrichthyes.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {number} tick - Simulation frame index.
         */
        static drawChondrichthyesRibletTrails(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isChondrichthyes) continue;

                const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
                if (speed > 0.60) {
                    const heading = Math.atan2(org.vy || 0, org.vx || 1);
                    const tailX = org.x - Math.cos(heading) * 36.0;
                    const tailY = org.y - Math.sin(heading) * 36.0;

                    // Micro-riblet low-drag wake streamline
                    const trailAlpha = Math.min(0.40, 0.10 + speed * 0.08);
                    ctx.strokeStyle = "rgba(14, 165, 233, " + trailAlpha + ")";
                    ctx.lineWidth = 1.3;
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY - 5.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 24.0, tailY - 5.0 - Math.sin(heading) * 24.0);
                    ctx.moveTo(tailX, tailY + 5.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 24.0, tailY + 5.0 - Math.sin(heading) * 24.0);
                    ctx.stroke();

                    // Predatory burst acceleration wave
                    if (org.burstCooldown && org.burstCooldown > 1.2) {
                        ctx.strokeStyle = "rgba(248, 250, 252, 0.60)";
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.arc(org.x, org.y, 20.0, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }
    }

    // Helper for safe body length in sub-functions
    function bodyLen_safe(org) {
        const size = org && org.dna ? (org.dna.size || 8.0) : 8.0;
        return 30.0 + size * 1.8;
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChondrichthyesOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.ChondrichthyesOpticsRenderer = ChondrichthyesOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
