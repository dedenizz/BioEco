// BioEcosystem - Neolithic Agriculture, Cereal Crop, Pottery Granary & Sedentary Village Optics
// Module: src/render/neolithic_optics.js
// Version: 9.94.0 (Hour 714 - Looks & UI Agent: Golden Wheat Fields, Sickle Gloss Reaping Rays, Terracotta Pottery Jars & Mudbrick Houses)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeolithicOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Neolithic agriculture, pottery, and sedentism:
     * 1. Golden Cereal Crop Field Plots (Einkorn & Emmer Wheat):
     *    - When hasCerealCultivation is true, renders radial wheat head spikelets with golden bristles (#eab308, #fef08a).
     *    - When isCerealHarvesting is true, pulsating harvesting pollen bursts (rgba(234, 179, 8, 0.85)) indicate productive field reaping.
     * 2. Composite Microlithic Sickle & Silica Gloss Polish:
     *    - When hasMicrolithicSickle is true, renders a curved antler/horn handle with embedded flint microlith teeth (#d97706, #94a3b8).
     *    - When isSickleReaping is true, a bright silica gloss arc (rgba(255, 255, 255, 0.95)) flashes along the cutting edge.
     * 3. Baked Clay Terracotta Pottery Jars & Storage Silos:
     *    - When hasPotteryGranary is true, renders rounded earthenware ceramic urns (#c2410c, #ea580c) beside the organism.
     *    - Stored grain buffer fullness is rendered as an internal golden seed core.
     * 4. Sedentary Mudbrick Village Enclosure & Foundation Perimeter:
     *    - When hasSedentaryVillage is true, renders stone-substructure rectangular mudbrick walls (#78350f, #a16207) framing the settlement.
     * 5. Dual Neolithic Agricultural Subsistence Aura:
     *    - A soft radiant aura combining golden wheat (#eab308) and terracotta red (#c2410c) signifies high caloric abundance.
     */
    class NeolithicOpticsRenderer {
        /**
         * Render crop fields, sickle blades, terracotta pottery, and mudbrick village optics.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawNeolithic(ctx, org, tick) {
            if (!ctx || !org) return;

            const hasCrops = !!org.hasCerealCultivation;
            const hasSickle = !!org.hasMicrolithicSickle;
            const hasPottery = !!org.hasPotteryGranary;
            const hasVillage = !!org.hasSedentaryVillage;

            if (!hasCrops && !hasSickle && !hasPottery && !hasVillage) return;

            const x = org.x || 0;
            const y = org.y || 0;
            const r = Math.max(8, org.radius || 12);
            const heading = org.heading || Math.atan2(org.vy || 0, org.vx || 0) || 0;
            const t = (tick || 0) * 0.05;

            ctx.save();
            ctx.translate(x, y);

            // 1. Sedentary Mudbrick Architecture Perimeter
            if (hasVillage) {
                this.drawMudbrickVillage(ctx, org, r, heading, t);
            }

            // 2. Terracotta Pottery Granary Urns
            if (hasPottery) {
                this.drawPotteryGranary(ctx, org, r, heading, t);
            }

            // 3. Golden Cereal Crop Field Plots
            if (hasCrops) {
                this.drawCerealCrops(ctx, org, r, heading, t);
            }

            // 4. Composite Microlithic Sickle & Silica Gloss Flash
            if (hasSickle) {
                this.drawMicrolithicSickle(ctx, org, r, heading, t);
            }

            // 5. Dual Neolithic Agricultural Subsistence Aura
            this.drawAgriculturalAura(ctx, org, r, t);

            ctx.restore();
        }

        /**
         * Render Sedentary Mudbrick Village Walls & Domestic Substructure.
         */
        static drawMudbrickVillage(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading * 0.3); // Slow architectural orientation

            const wallSpan = r * 2.1;
            ctx.beginPath();
            ctx.rect(-wallSpan * 0.5, -wallSpan * 0.5, wallSpan, wallSpan);
            ctx.strokeStyle = "rgba(161, 98, 7, 0.70)"; // Sun-dried mudbrick ochre
            ctx.lineWidth = 1.4;
            ctx.setLineDash([3, 2]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Stone corner foundations
            const corners = [
                [-wallSpan * 0.5, -wallSpan * 0.5],
                [wallSpan * 0.5, -wallSpan * 0.5],
                [wallSpan * 0.5, wallSpan * 0.5],
                [-wallSpan * 0.5, wallSpan * 0.5]
            ];
            ctx.fillStyle = "rgba(120, 53, 15, 0.90)";
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.arc(corners[i][0], corners[i][1], 2.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render Baked Clay Terracotta Pottery Granary Urns & Stored Seed Reserves.
         */
        static drawPotteryGranary(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const potDist = r * 1.35;
            const potX = -potDist * 0.6;
            const potY = potDist * 0.8;

            // Fired terracotta clay urn body
            ctx.beginPath();
            ctx.ellipse(potX, potY, 4.5, 5.5, 0.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(194, 65, 12, 0.85)"; // Terracotta clay
            ctx.fill();
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "rgba(234, 88, 12, 0.95)";
            ctx.stroke();

            // Urn neck rim
            ctx.beginPath();
            ctx.ellipse(potX, potY - 5.5, 2.8, 1.2, 0.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(234, 88, 12, 0.90)";
            ctx.fill();

            // Internal golden seed core reflecting grain buffer
            const bufferRatio = Math.min(1.0, (org.storedGrainBuffer || 20.0) / 60.0);
            if (bufferRatio > 0.1) {
                ctx.beginPath();
                ctx.arc(potX, potY, 2.5 * bufferRatio, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 240, 138, 0.95)"; // Golden grain core
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render Golden Cereal Crop Field Plots (Wheat & Barley Spikelets).
         */
        static drawCerealCrops(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const fieldDist = r * 1.5;
            const numStalks = 3;

            for (let i = 0; i < numStalks; i++) {
                const angle = (i - 1) * 0.35;
                const sx = fieldDist * Math.cos(angle);
                const sy = fieldDist * Math.sin(angle);
                const sway = Math.sin(t * 2.0 + i) * 2.0;

                // Wheat stalk
                ctx.beginPath();
                ctx.moveTo(r * 0.7 * Math.cos(angle), r * 0.7 * Math.sin(angle));
                ctx.lineTo(sx + sway, sy);
                ctx.strokeStyle = "rgba(234, 179, 8, 0.75)"; // Golden wheat stalk
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Wheat head spikelet
                ctx.beginPath();
                ctx.ellipse(sx + sway, sy, 4.0, 2.2, angle + 0.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
                ctx.fill();
                ctx.strokeStyle = "rgba(202, 138, 4, 0.90)";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Harvesting active pulse particles
            if (org.isCerealHarvesting) {
                for (let j = 0; j < 4; j++) {
                    const ang = t * 4.0 + (j * Math.PI * 0.5);
                    const pr = fieldDist + Math.sin(t * 5.0 + j) * 4.0;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * pr, Math.sin(ang) * pr, 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render Composite Microlithic Sickle & Silica Gloss Polish Flash.
         */
        static drawMicrolithicSickle(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const sickleRadius = r * 1.2;
            const handleStartX = r * 0.4;
            const handleStartY = -r * 0.8;

            // Curved antler/wooden handle arc
            ctx.beginPath();
            ctx.arc(handleStartX, handleStartY, sickleRadius * 0.6, -0.4, 1.4, false);
            ctx.strokeStyle = "rgba(180, 83, 9, 0.90)"; // Antler brown handle
            ctx.lineWidth = 2.0;
            ctx.stroke();

            // Embedded flint microlith teeth along inner curve
            for (let i = 0; i < 4; i++) {
                const ang = -0.3 + (i * 0.4);
                const mx = handleStartX + Math.cos(ang) * (sickleRadius * 0.6);
                const my = handleStartY + Math.sin(ang) * (sickleRadius * 0.6);

                ctx.beginPath();
                ctx.arc(mx, my, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(148, 163, 184, 0.95)"; // Flint grey microlith
                ctx.fill();
            }

            // Silica gloss polish flash if reaping
            if (org.isSickleReaping) {
                ctx.beginPath();
                ctx.arc(handleStartX, handleStartY, sickleRadius * 0.6, -0.4, 1.4, false);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.95)"; // Brilliant white silica gloss
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Flash sparkle star
                const fx = handleStartX + Math.cos(0.5) * (sickleRadius * 0.6);
                const fy = handleStartY + Math.sin(0.5) * (sickleRadius * 0.6);
                ctx.beginPath();
                ctx.arc(fx, fy, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.90)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render Dual Neolithic Agricultural Subsistence Aura.
         */
        static drawAgriculturalAura(ctx, org, r, t) {
            const auraRadius = r * 1.95 + Math.sin(t * 1.6) * 2.0;
            const grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, auraRadius);
            grad.addColorStop(0, "rgba(234, 179, 8, 0.14)"); // Golden wheat core
            grad.addColorStop(0.55, "rgba(194, 65, 12, 0.16)"); // Terracotta clay fringe
            grad.addColorStop(1, "rgba(194, 65, 12, 0.0)");

            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    global.NeolithicOpticsRenderer = NeolithicOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
