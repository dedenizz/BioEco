// BioEcosystem - Siliary Baleen Sieves, Filtration Vortices & Pelagic Megafauna Shaders
// Module: src/render/baleen_optics.js
// Version: 6.28.0 (Hour 348 - Looks Agent: Pod Streamlines, Blubber Glow & Megafaunal Silhouettes)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BaleenOpticsRenderer
     * High-fidelity microscope visualization of filter-feeding baleen plates & megafauna:
     * - Renders oscillatory siliary baleen comb teeth along cellular margins
     * - Visualizes hydrodynamic filtration intake vortices and converging streamlines
     * - Displays coordinated pod drafting wake ribbons between neighboring sifting cells
     * - Visualizes internal lipid blubber energy auras and cellular volumetric halos
     */
    class BaleenOpticsRenderer {
        /**
         * Render baleen comb plates, filtration streamlines, and megafauna depth halo.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Individual simulation organism.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellBaleen(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const plates = org.baleenFilterPlates || 0.0;
            const scale = org.megafaunaScaleRatio || 1.0;
            const flux = org.filtrationVolumeFlux || 0.0;
            const blubber = org.blubberEnergyReserve || 0.0;
            if (plates < 0.2 && scale <= 1.05 && blubber < 5.0) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * scale;

            ctx.save();

            // 1. Internal Lipid Blubber Energy Glow
            if (blubber > 8.0) {
                BaleenOpticsRenderer.drawBlubberAura(ctx, org, size, blubber, tick);
            }

            // 2. Pelagic Megafauna Volumetric Silhouette & Oceanic Ripple Halo
            if (scale > 1.08) {
                BaleenOpticsRenderer.drawMegafaunaSilhouette(ctx, org, size, scale, tick);
            }

            // 3. Oscillatory Siliary Baleen Comb Plates
            if (plates >= 0.2) {
                BaleenOpticsRenderer.drawBaleenPlates(ctx, org, size, scale, plates, tick);
            }

            // 4. Hydrodynamic Filtration Intake Streamlines & Vortices
            if (flux > 0.04) {
                BaleenOpticsRenderer.drawFiltrationVortices(ctx, org, size, scale, flux, tick);
            }

            // 5. Coordinated Pod Drafting Wake Streamlines
            if (org.podSynergyActive) {
                BaleenOpticsRenderer.drawPodStreamlines(ctx, org, size, tick);
            }

            ctx.restore();
        }

        /**
         * Render radiating keratinous-chitinous siliary comb fringe along cellular flank.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Organism with baleen plates.
         * @param {number} size - Effective organism radius.
         * @param {number} scale - Megafaunal scale ratio.
         * @param {number} plates - Baleen plate count.
         * @param {number} tick - Simulation frame count.
         */
        static drawBaleenPlates(ctx, org, size, scale, plates, tick) {
            const combCount = Math.min(12, Math.max(3, Math.floor(plates * 1.2)));
            const baseRot = org.angle || 0.0;
            const combSpan = Math.PI * 0.75; // 135-degree anterior filtration arc
            const startAngle = baseRot - (combSpan * 0.5);

            ctx.save();
            ctx.translate(org.x, org.y);

            for (let i = 0; i < combCount; i++) {
                const fraction = i / (combCount - 1);
                const angle = startAngle + (fraction * combSpan);
                const wave = Math.sin(tick * 0.14 + i * 0.7) * 1.5;
                const toothLength = (size * 0.45) + (plates * 0.4) + wave;

                const innerX = Math.cos(angle) * (size * 0.95);
                const innerY = Math.sin(angle) * (size * 0.95);
                const outerX = Math.cos(angle) * (size * 0.95 + toothLength);
                const outerY = Math.sin(angle) * (size * 0.95 + toothLength);

                // Siliary comb bristle
                ctx.beginPath();
                ctx.moveTo(innerX, innerY);
                ctx.lineTo(outerX, outerY);
                ctx.lineWidth = 0.85;
                ctx.strokeStyle = "rgba(245, 158, 11, " + Math.min(0.85, 0.4 + plates * 0.05) + ")";
                ctx.stroke();

                // Translucent fringe highlight at tooth tip
                ctx.beginPath();
                ctx.arc(outerX, outerY, 0.9 + (i % 2) * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 191, 36, 0.75)";
                ctx.fill();

                // Micro-sparkle on particle capture points
                if ((org.filteredParticleCount || 0) > 0 && i % 3 === 0) {
                    const glintAlpha = 0.35 + 0.35 * Math.sin(tick * 0.18 + i);
                    ctx.beginPath();
                    ctx.arc(outerX, outerY, 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, " + glintAlpha + ")";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render hydrodynamic converging filtration streamlines and intake vortex arcs.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Filtering organism.
         * @param {number} size - Effective organism radius.
         * @param {number} scale - Megafaunal scale ratio.
         * @param {number} flux - Filtration volume flux.
         * @param {number} tick - Simulation frame count.
         */
        static drawFiltrationVortices(ctx, org, size, scale, flux, tick) {
            const baseRot = org.angle || 0.0;
            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(baseRot);

            // Forward converging intake vortex arcs
            const arcCount = 3;
            for (let a = 0; a < arcCount; a++) {
                const aDist = size * 1.15 + (a * 5.0) + (Math.sin(tick * 0.1 + a) * 2.0);
                const alpha = Math.min(0.65, flux * (0.8 - a * 0.18));

                ctx.beginPath();
                ctx.arc(aDist * 0.4, 0, aDist * 0.75, -Math.PI * 0.35, Math.PI * 0.35);
                ctx.lineWidth = 0.75;
                ctx.setLineDash([3, 4]);
                ctx.strokeStyle = "rgba(253, 230, 138, " + alpha + ")";
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Lateral filtration stream curlicues
            const sideOffsets = [-1, 1];
            for (let s = 0; s < sideOffsets.length; s++) {
                const sY = sideOffsets[s] * (size * 0.85);
                const sX = size * 0.4;
                const flowLength = size * (0.9 + flux * 0.6);

                ctx.beginPath();
                ctx.moveTo(sX, sY);
                ctx.quadraticCurveTo(sX + flowLength * 0.5, sY + sideOffsets[s] * 4.0, sX + flowLength, sY);
                ctx.lineWidth = 0.65;
                ctx.strokeStyle = "rgba(56, 189, 248, " + (flux * 0.45) + ")";
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render pelagic megafaunal displacement ripples and volumetric depth aura.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Scaled megafauna organism.
         * @param {number} size - Effective organism radius.
         * @param {number} scale - Megafaunal scale ratio.
         * @param {number} tick - Simulation frame count.
         */
        static drawMegafaunaSilhouette(ctx, org, size, scale, tick) {
            const excessScale = Math.min(1.25, scale - 1.0);
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.05 + (org.numericId || 0));

            // Deep pelagic water displacement aura
            ctx.beginPath();
            ctx.arc(org.x, org.y, size * (1.18 + pulse * 0.06), 0, Math.PI * 2);
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = "rgba(245, 158, 11, " + (0.12 + excessScale * 0.22) + ")";
            ctx.stroke();

            // Concentric outer acoustic pressure ring
            if (scale > 1.35) {
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * (1.36 + pulse * 0.08), 0, Math.PI * 2);
                ctx.lineWidth = 0.7;
                ctx.setLineDash([6, 6]);
                ctx.strokeStyle = "rgba(251, 191, 36, " + (0.10 + excessScale * 0.15) + ")";
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        /**
         * Render internal lipid blubber reserve luminescence.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Organism with lipid reserves.
         * @param {number} size - Effective organism radius.
         * @param {number} blubber - Stored blubber reserve amount.
         * @param {number} tick - Simulation frame count.
         */
        static drawBlubberAura(ctx, org, size, blubber, tick) {
            const blubberRatio = Math.min(1.0, blubber / 60.0);
            const pulse = 0.7 + 0.3 * Math.sin(tick * 0.08 + (org.numericId || 0));

            ctx.beginPath();
            ctx.arc(org.x, org.y, size * 0.65, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(245, 158, 11, " + (blubberRatio * 0.25 * pulse) + ")";
            ctx.fill();

            ctx.lineWidth = 0.75;
            ctx.strokeStyle = "rgba(253, 230, 138, " + (blubberRatio * 0.40) + ")";
            ctx.stroke();
        }

        /**
         * Render coordinated pod drafting wake ribbons connecting pod filterers.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Sifting organism in pod synergy.
         * @param {number} size - Effective organism radius.
         * @param {number} tick - Simulation frame count.
         */
        static drawPodStreamlines(ctx, org, size, tick) {
            const bonus = org.podDraftingBonus || 1.0;
            const wakeAlpha = Math.min(0.55, (bonus - 1.0) * 1.5);
            const rot = org.angle || 0.0;

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(rot + Math.PI); // Trailing behind organism

            ctx.beginPath();
            ctx.moveTo(0, -size * 0.5);
            ctx.lineTo(size * 1.8, -size * 0.8 + Math.sin(tick * 0.12) * 3.0);
            ctx.moveTo(0, size * 0.5);
            ctx.lineTo(size * 1.8, size * 0.8 + Math.cos(tick * 0.12) * 3.0);

            ctx.lineWidth = 0.85;
            ctx.strokeStyle = "rgba(52, 211, 153, " + wakeAlpha + ")";
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BaleenOpticsRenderer;
    } else {
        global.BaleenOpticsRenderer = BaleenOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
