// BioEcosystem - Chromatophore Pigment Granules, Iridescence & Disruptive Dermal Shaders
// Module: src/render/chromatophore_optics.js
// Version: 5.13.0 (Hour 233 - Looks Agent: Chromatophore Optics & Disruptive Dermal Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class ChromatophoreOpticsRenderer {
        // Draw individual chromatophore pigment layers and disruptive edge-breaking shaders on a cell
        static drawChromatophores(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const cs = org.chromatophoreSystem;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const crypsis = typeof org.crypticMatchingScore === "number" ? org.crypticMatchingScore : 0.0;
            const assimilation = typeof org.substrateAssimilation === "number" ? org.substrateAssimilation : 0.0;
            const cR = org.chromaR !== undefined ? org.chromaR : 120;
            const cG = org.chromaG !== undefined ? org.chromaG : 120;
            const cB = org.chromaB !== undefined ? org.chromaB : 120;

            // Retrieve dispersion states from organ system or fallback to baseline
            const melDisp = cs ? cs.melanophoreDispersion : 0.20;
            const xanDisp = cs ? cs.xanthophoreDispersion : 0.20;
            const cyaDisp = cs ? cs.cyanophoreDispersion : 0.15;
            const eryDisp = cs ? cs.erythrophoreDispersion : 0.15;

            ctx.save();

            // 1. Dynamic Disruptive Cryptic Halo (Blends cell outline into background)
            if (crypsis > 0.25) {
                const haloAlpha = Math.min(0.55, crypsis * 0.50);
                const haloRadius = size * (1.15 + crypsis * 0.25);
                const haloGrad = ctx.createRadialGradient(0, 0, size * 0.4, 0, 0, haloRadius);
                haloGrad.addColorStop(0.0, `rgba(${cR}, ${cG}, ${cB}, 0.0)`);
                haloGrad.addColorStop(0.65, `rgba(${cR}, ${cG}, ${cB}, ${haloAlpha})`);
                haloGrad.addColorStop(1.0, `rgba(${cR}, ${cG}, ${cB}, 0.0)`);

                ctx.beginPath();
                ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
                ctx.fillStyle = haloGrad;
                ctx.fill();
            }

            // 2. Disruptive Countershading & Edge-Breaking Patchwork
            if (assimilation > 0.35) {
                const patchCount = Math.max(3, Math.min(6, Math.floor(size * 0.6)));
                const patchAlpha = Math.min(0.40, assimilation * 0.45);
                ctx.fillStyle = `rgba(${cR}, ${cG}, ${cB}, ${patchAlpha})`;

                for (let i = 0; i < patchCount; i++) {
                    const angle = (i / patchCount) * Math.PI * 2 + (org.id ? org.id.charCodeAt(i % org.id.length) * 0.2 : 0);
                    const dist = size * (0.50 + Math.sin(angle * 2) * 0.20);
                    const px = Math.cos(angle) * dist;
                    const py = Math.sin(angle) * dist;
                    const pRadius = size * (0.22 + melDisp * 0.15);

                    ctx.beginPath();
                    ctx.arc(px, py, pRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 3. Radial Pigment Granule Micro-Puncta (Melanophores, Xanthophores, Cyanophores)
            const granuleCount = Math.max(4, Math.min(8, Math.floor(size * 0.75)));
            for (let i = 0; i < granuleCount; i++) {
                const theta = (i / granuleCount) * Math.PI * 2 + (tick * 0.015);
                const rOffset = size * (0.35 + (i % 3) * 0.18);
                const gx = Math.cos(theta) * rOffset;
                const gy = Math.sin(theta) * rOffset;

                // Alternate pigment granule types across radial positions
                if (i % 3 === 0) {
                    // Melanophore granule (Absorptive dark eumelanin)
                    const mRad = 0.8 + melDisp * 1.6;
                    ctx.beginPath();
                    ctx.arc(gx, gy, mRad, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(15, 23, 42, ${Math.min(0.85, 0.30 + melDisp * 0.55)})`;
                    ctx.fill();
                } else if (i % 3 === 1) {
                    // Xanthophore granule (Yellow/Pteridine sunlight filter)
                    const xRad = 0.7 + xanDisp * 1.4;
                    ctx.beginPath();
                    ctx.arc(gx, gy, xRad, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(250, 204, 21, ${Math.min(0.80, 0.25 + xanDisp * 0.50)})`;
                    ctx.fill();
                } else {
                    // Cyanophore granule (Blue/Structural iridophore reflector)
                    const cRad = 0.7 + cyaDisp * 1.4;
                    ctx.beginPath();
                    ctx.arc(gx, gy, cRad, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(56, 189, 248, ${Math.min(0.80, 0.25 + cyaDisp * 0.50)})`;
                    ctx.fill();
                }
            }

            // 4. Warning Aposematic / Erythrophore Micro-Dots (When alarmed or startled)
            if (eryDisp > 0.30) {
                const dotAlpha = Math.min(0.90, eryDisp);
                const dotRad = 0.9 + eryDisp * 1.2;
                ctx.fillStyle = `rgba(244, 63, 94, ${dotAlpha})`;
                for (let j = 0; j < 3; j++) {
                    const dAngle = (j / 3) * Math.PI * 2 + Math.PI / 6;
                    const dx = Math.cos(dAngle) * (size * 0.45);
                    const dy = Math.sin(dAngle) * (size * 0.45);
                    ctx.beginPath();
                    ctx.arc(dx, dy, dotRad, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 5. Iridescent Structural Glimmer Sheen (Specular dermal highlight)
            const iridTrait = (org.dna && typeof org.dna.iridophoreReflectance === "number") ? org.dna.iridophoreReflectance : 0.20;
            if (iridTrait > 0.15) {
                const sheenPhase = (tick * 0.04) + (org.x * 0.01) + (org.y * 0.01);
                const sheenAlpha = Math.max(0.0, Math.sin(sheenPhase)) * Math.min(0.45, iridTrait * 0.35);
                if (sheenAlpha > 0.05) {
                    ctx.lineWidth = 0.9;
                    ctx.strokeStyle = `rgba(224, 242, 254, ${sheenAlpha})`;
                    ctx.beginPath();
                    ctx.arc(0, 0, size * 0.82, sheenPhase, sheenPhase + Math.PI * 0.5);
                    ctx.stroke();
                }
            }

            ctx.restore();
        }

        // Draw startle flash shockwaves and high-contrast warning bursts across dish
        static drawStartleFlashes(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.chromatophoreSystem) continue;

                const cs = org.chromatophoreSystem;
                if (cs.flashTicksRemaining <= 0) continue;

                const progress = cs.flashTicksRemaining / cs.flashDuration; // [1.0 -> 0.0]
                const x = org.x;
                const y = org.y;
                const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

                ctx.save();

                // Expanding Shockwave Ring
                const ringRadius = size * (1.2 + (1.0 - progress) * 2.8);
                const ringAlpha = progress * 0.75;
                ctx.lineWidth = 1.4 * progress + 0.4;
                ctx.strokeStyle = `rgba(244, 63, 94, ${ringAlpha})`;
                ctx.setLineDash([3, 2]);

                ctx.beginPath();
                ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Radial Warning Spicules
                const spiculeCount = 6;
                const spiculeLen = size * (1.5 + (1.0 - progress) * 2.0);
                ctx.strokeStyle = `rgba(251, 113, 133, ${ringAlpha * 0.85})`;
                ctx.lineWidth = 1.0;

                for (let k = 0; k < spiculeCount; k++) {
                    const sAngle = (k / spiculeCount) * Math.PI * 2 + (tick * 0.08);
                    const sx1 = x + Math.cos(sAngle) * (size * 0.8);
                    const sy1 = y + Math.sin(sAngle) * (size * 0.8);
                    const sx2 = x + Math.cos(sAngle) * spiculeLen;
                    const sy2 = y + Math.sin(sAngle) * spiculeLen;

                    ctx.beginPath();
                    ctx.moveTo(sx1, sy1);
                    ctx.lineTo(sx2, sy2);
                    ctx.stroke();
                }

                // Core Startle Flash Glow
                const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 1.6);
                coreGrad.addColorStop(0.0, `rgba(254, 205, 211, ${progress * 0.90})`);
                coreGrad.addColorStop(0.5, `rgba(244, 63, 94, ${progress * 0.60})`);
                coreGrad.addColorStop(1.0, "rgba(244, 63, 94, 0.0)");

                ctx.beginPath();
                ctx.arc(x, y, size * 1.6, 0, Math.PI * 2);
                ctx.fillStyle = coreGrad;
                ctx.fill();

                ctx.restore();
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChromatophoreOpticsRenderer;
    } else {
        global.ChromatophoreOpticsRenderer = ChromatophoreOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
