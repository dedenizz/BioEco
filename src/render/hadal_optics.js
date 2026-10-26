// BioEcosystem - Hadal Baric Compression Fields, Benthic Sediment & Piezophilic Optics
// Module: src/render/hadal_optics.js
// Version: 6.78.0 (Hour 398 - Looks / UI Agent: Decompression Optics & 76th Channel % ABA Visuals)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HadalOpticsRenderer
     * Microscope rendering of deep-sea hadal trench and benthic piezophilic adaptations:
     * - Baric compression fields, PUFA lipid bilayer undulating fringe and stress striations
     * - Decompression turgor instability rippling and shallow-water trauma warning fields
     * - Dynamic TMAO/betaine piezolyte hydration protective shield spheres and recycling pulses
     * - Benthic sediment anchoring holdfast filaments and upward detachment surge trails
     * - Emerald chemosynthetic metabolic assimilation plumes in aphotic depths
     * - Global bathymetric trench gradient, benthic flocculent silt and marine snow descent
     */
    class HadalOpticsRenderer {
        /**
         * Render individual cellular piezophilic structures and baric pressure optics.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Current simulation frame count.
         */
        static drawCellHadal(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const depth = Math.max(0, org.y || 0);
            const pufa = org.pufaRatio || 0.0;
            const piezolyte = org.piezolyteConcentration || 0.0;
            const anchoring = org.benthicAnchoring || 0.0;
            const chemoRate = org.chemosynthesisRate || 0.0;
            const stress = org.compressionStress || 0.0;
            const decompressStress = org.decompressionStress || 0.0;
            const isAnchored = org.isBenthicAnchored || false;

            if (pufa < 0.20 && piezolyte < 0.15 && anchoring < 0.15 && chemoRate < 0.20 && depth < 360 && decompressStress < 0.05) {
                return;
            }

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Baric compression field & PUFA lipid bilayer fringe
            if (depth > 280 || pufa > 0.30 || stress > 0.08) {
                HadalOpticsRenderer.drawBaricCompressionField(ctx, org, size, depth, pufa, stress, tick);
            }

            // 2. Decompression stress ripple and turgor instability field
            if (decompressStress > 0.05 || (depth < 260.0 && pufa > 0.35)) {
                HadalOpticsRenderer.drawDecompressionStress(ctx, org, size, decompressStress, depth, tick);
            }

            // 3. TMAO piezolyte hydration protective shield halo
            if (piezolyte > 0.18) {
                HadalOpticsRenderer.drawPiezolyteHalo(ctx, org, size, piezolyte, tick);
            }

            // 4. Chemosynthetic metabolic assimilation aura in aphotic depths
            if (chemoRate > 0.22 && depth > 320) {
                HadalOpticsRenderer.drawChemosyntheticAura(ctx, org, size, chemoRate, tick);
            }

            // 5. Benthic holdfast anchoring filaments into seafloor sediment
            if ((anchoring > 0.18 || isAnchored) && depth > 420) {
                HadalOpticsRenderer.drawBenthicAnchoring(ctx, org, size, anchoring, isAnchored, tick);
            }

            ctx.restore();
        }

        /**
         * Render lipid membrane fringe or baric compression fracture striations.
         */
        static drawBaricCompressionField(ctx, org, size, depth, pufa, stress, tick) {
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.12 + (org.id || 0));
            const baricFactor = Math.min(1.0, depth / 550.0);

            ctx.save();
            if (pufa > 0.32) {
                const fringeRadius = size * (1.18 + pufa * 0.22 + pulse * 0.08);
                const fringeAlpha = Math.min(0.48, 0.18 + pufa * 0.30 * baricFactor);

                ctx.beginPath();
                ctx.arc(0, 0, fringeRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(99, 102, 241, ${fringeAlpha})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, 0, size * 1.06, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(49, 46, 129, ${fringeAlpha * 0.85})`;
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            if (stress > 0.12) {
                const stressAlpha = Math.min(0.65, stress * 0.85);
                const rayCount = 4 + Math.floor(stress * 4);
                ctx.strokeStyle = `rgba(56, 189, 248, ${stressAlpha})`;
                ctx.lineWidth = 0.9;

                for (let i = 0; i < rayCount; i++) {
                    const angle = (i * (Math.PI * 2) / rayCount) + (tick * 0.02);
                    const innerR = size * 0.75;
                    const outerR = size * (1.10 + pulse * 0.15);
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
                    ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }

        /**
         * Render decompressional lysis stress and outward membrane turgor instability.
         */
        static drawDecompressionStress(ctx, org, size, decompressStress, depth, tick) {
            ctx.save();
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.18 + (org.id || 0));
            const severity = Math.max(decompressStress, depth < 260.0 ? (260.0 - depth) / 260.0 * 0.6 : 0.0);
            const radius = size * (1.25 + severity * 0.40 + pulse * 0.12);
            const alpha = Math.min(0.60, 0.15 + severity * 0.55);

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Radial turgor expansion spikes signaling decompression danger
            if (severity > 0.25) {
                const spikeCount = 6;
                ctx.strokeStyle = `rgba(45, 212, 191, ${alpha * 0.8})`;
                ctx.lineWidth = 0.8;
                for (let i = 0; i < spikeCount; i++) {
                    const ang = (i * Math.PI * 2 / spikeCount) + (tick * 0.05);
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(ang) * size, Math.sin(ang) * size);
                    ctx.lineTo(Math.cos(ang) * (radius + 2.5), Math.sin(ang) * (radius + 2.5));
                    ctx.stroke();
                }
            }
            ctx.restore();
        }

        /**
         * Render TMAO osmolyte hydration shell micro-spheres orbiting membrane.
         */
        static drawPiezolyteHalo(ctx, org, size, piezolyte, tick) {
            ctx.save();
            const sphereCount = 5 + Math.floor(piezolyte * 5);
            const orbitRadius = size * (1.28 + piezolyte * 0.18);
            const baseAngle = tick * 0.04 + (org.id || 0) * 1.35;
            const alpha = Math.min(0.55, piezolyte * 0.65);

            ctx.fillStyle = `rgba(192, 132, 252, ${alpha})`;
            for (let i = 0; i < sphereCount; i++) {
                const ang = baseAngle + (i * Math.PI * 2) / sphereCount;
                const ox = Math.cos(ang) * orbitRadius;
                const oy = Math.sin(ang) * orbitRadius;
                const r = 0.9 + (i % 2) * 0.5;

                ctx.beginPath();
                ctx.arc(ox, oy, r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        /**
         * Render emerald chemosynthetic metabolic aura in aphotic depths.
         */
        static drawChemosyntheticAura(ctx, org, size, chemoRate, tick) {
            ctx.save();
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.09 + (org.id || 0) * 0.8);
            const auraRadius = size * (1.20 + chemoRate * 0.35 + pulse * 0.14);
            const alpha = Math.min(0.38, chemoRate * 0.45);

            const grad = ctx.createRadialGradient(0, 0, size * 0.7, 0, 0, auraRadius);
            grad.addColorStop(0.0, `rgba(16, 185, 129, ${alpha})`);
            grad.addColorStop(0.65, `rgba(5, 150, 105, ${alpha * 0.45})`);
            grad.addColorStop(1.0, "rgba(6, 95, 70, 0.0)");

            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
        }

        /**
         * Render cytoplasmic benthic holdfast filaments tethering organism into seabed silt.
         */
        static drawBenthicAnchoring(ctx, org, size, anchoring, isAnchored, tick) {
            ctx.save();
            const rootCount = isAnchored ? 4 : 2;
            const sway = Math.sin(tick * 0.06 + (org.id || 0)) * 2.5;
            const alpha = isAnchored ? 0.60 : 0.35;

            ctx.strokeStyle = `rgba(4, 120, 87, ${alpha})`;
            ctx.lineWidth = isAnchored ? 1.4 : 0.9;

            for (let i = 0; i < rootCount; i++) {
                const offsetX = (i - (rootCount - 1) * 0.5) * (size * 0.65);
                const targetY = size * 1.5 + (i * 2.0);

                ctx.beginPath();
                ctx.moveTo(offsetX * 0.6, size * 0.7);
                ctx.quadraticCurveTo(offsetX + sway, targetY * 0.6, offsetX * 1.1 + sway * 0.5, targetY);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(offsetX * 1.1 + sway * 0.5, targetY, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(6, 78, 59, ${alpha * 1.2})`;
                ctx.fill();
            }
            ctx.restore();
        }

        /**
         * Render dish-wide hadal depth bathymetry, sediment silt and descending marine snow.
         */
        static drawGlobalHadalEnvironment(ctx, organisms, width, height, tick) {
            if (!ctx || width <= 0 || height <= 0) return;

            const hadalTop = 410.0;
            if (height <= hadalTop) return;

            ctx.save();
            const trenchGrad = ctx.createLinearGradient(0, hadalTop, 0, height);
            trenchGrad.addColorStop(0.0, "rgba(2, 6, 23, 0.0)");
            trenchGrad.addColorStop(0.40, "rgba(30, 27, 75, 0.22)");
            trenchGrad.addColorStop(1.0, "rgba(3, 7, 18, 0.55)");

            ctx.fillStyle = trenchGrad;
            ctx.fillRect(0, hadalTop, width, height - hadalTop);

            const seafloorY = height - 26.0;
            ctx.beginPath();
            ctx.moveTo(0, seafloorY);
            for (let x = 0; x <= width; x += 30) {
                const waveY = seafloorY + Math.sin(x * 0.025 + tick * 0.015) * 3.5;
                ctx.lineTo(x, waveY);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            const sedimentGrad = ctx.createLinearGradient(0, seafloorY, 0, height);
            sedimentGrad.addColorStop(0.0, "rgba(30, 41, 59, 0.35)");
            sedimentGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.70)");
            ctx.fillStyle = sedimentGrad;
            ctx.fill();

            const snowCount = 18;
            ctx.fillStyle = "rgba(148, 163, 184, 0.22)";
            for (let i = 0; i < snowCount; i++) {
                const seed = (i * 97.3) % 1.0;
                const sx = (seed * width + Math.sin(tick * 0.02 + i * 1.5) * 14.0) % width;
                const sy = hadalTop + ((tick * (0.22 + seed * 0.25) + i * 26.0) % (height - hadalTop));
                const radius = 0.75 + seed * 1.25;

                ctx.beginPath();
                ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = HadalOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.HadalOpticsRenderer = HadalOpticsRenderer;
        global.PiezophilicOpticsRenderer = HadalOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : (typeof global !== "undefined" ? global : this));
