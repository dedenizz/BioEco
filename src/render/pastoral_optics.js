// BioEcosystem - Pastoral Domestication, Herd Grazing, Dairy Extraction & Corral Enclosure Optics
// Module: src/render/pastoral_optics.js
// Version: 9.99.0 (Hour 719 - Looks & UI Agent: Grazing Livestock Silhouettes, Dairy Milk Vessels, Wool Shearing & Stone Corral Perimeters)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PastoralOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for pastoralism and secondary products revolution:
     * 1. Grazing Livestock Herd Silhouettes (Sheep, Goats, Cattle):
     *    - When hasLivestockHerd is true, renders miniature grazing herd silhouettes orbiting the herder (#84cc16, #bef264).
     *    - When isHerdingGrazers is true, emits organic manure fertilization pulses (rgba(132, 204, 22, 0.75)) onto adjacent stubble.
     * 2. Dairy Lactation Vessels & Fermented Cheese Reserves:
     *    - When hasDairyExtraction is true, renders cream-white ceramic milk pails (#f8fafc, #cbd5e1) beside the organism.
     *    - When isMilkingLivestock is true, lactating cream droplets radiate inward to signify continuous non-lethal protein harvest.
     * 3. Wool Shearing & Drop-Spindle Fiber Strands:
     *    - When hasWoolSpinning is true, renders delicate helical wool fiber threads (#e2e8f0) when shearing is active.
     * 4. Communal Stone & Timber Corral Enclosures:
     *    - When hasCorralEnclosure is true, renders a circular stone-and-stake corral ring (#94a3b8, #64748b) shielding the herd.
     * 5. Dual Pastoral Subsistence Aura:
     *    - A soft gradient aura combining meadow green (#84cc16) and dairy cream (#f8fafc) signifies secondary-product abundance.
     */
    class PastoralOpticsRenderer {
        /**
         * Render grazing herds, dairy vessels, wool fibers, and communal corral enclosures.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawPastoral(ctx, org, tick) {
            if (!ctx || !org) return;

            const hasHerd = !!org.hasLivestockHerd;
            const hasDairy = !!org.hasDairyExtraction;
            const hasWool = !!org.hasWoolSpinning;
            const hasCorral = !!org.hasCorralEnclosure;

            if (!hasHerd && !hasDairy && !hasWool && !hasCorral) return;

            const x = org.x || 0;
            const y = org.y || 0;
            const r = Math.max(8, org.radius || 12);
            const heading = org.heading || Math.atan2(org.vy || 0, org.vx || 0) || 0;
            const t = (tick || 0) * 0.05;

            ctx.save();
            ctx.translate(x, y);

            // 1. Communal Stone & Timber Corral Enclosure
            if (hasCorral) {
                this.drawCorralEnclosure(ctx, org, r, t);
            }

            // 2. Grazing Livestock Herd Silhouettes
            if (hasHerd) {
                this.drawLivestockHerd(ctx, org, r, heading, t);
            }

            // 3. Dairy Milk Extraction Vessels & Cream Pulses
            if (hasDairy) {
                this.drawDairyVessels(ctx, org, r, heading, t);
            }

            // 4. Wool Shearing & Drop-Spindle Strands
            if (hasWool && org.isShearingWool) {
                this.drawWoolSpinning(ctx, org, r, t);
            }

            // 5. Dual Pastoral Subsistence Aura
            this.drawPastoralAura(ctx, org, r, t);

            ctx.restore();
        }

        /**
         * Render Circular Stone & Timber Post Corral Enclosure.
         */
        static drawCorralEnclosure(ctx, org, r, t) {
            const corralR = r * 2.35;

            // Stone & timber fence perimeter
            ctx.beginPath();
            ctx.arc(0, 0, corralR, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(148, 163, 184, 0.55)";
            ctx.lineWidth = 1.3;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Timber/stone fence posts around perimeter
            const numPosts = 8;
            ctx.fillStyle = "rgba(100, 116, 139, 0.85)";
            for (let i = 0; i < numPosts; i++) {
                const ang = (i / numPosts) * Math.PI * 2;
                const px = Math.cos(ang) * corralR;
                const py = Math.sin(ang) * corralR;
                ctx.beginPath();
                ctx.arc(px, py, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        /**
         * Render Grazing Livestock Silhouettes & Manure Fertilization Pulses.
         */
        static drawLivestockHerd(ctx, org, r, heading, t) {
            const headCount = Math.min(4, Math.max(2, Math.floor((org.herdHeadCount || 6) / 3)));
            const herdOrbit = r * 1.7;

            for (let i = 0; i < headCount; i++) {
                const ang = heading + (i * (Math.PI * 2 / headCount)) + Math.sin(t * 0.8 + i) * 0.25;
                const gx = Math.cos(ang) * herdOrbit;
                const gy = Math.sin(ang) * herdOrbit;

                // Miniature livestock body (sheep/goat/cattle silhouette)
                ctx.beginPath();
                ctx.ellipse(gx, gy, 3.2, 2.0, ang + Math.PI * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(226, 232, 240, 0.85)"; // Wool/hide cream
                ctx.fill();
                ctx.strokeStyle = "rgba(132, 204, 22, 0.85)"; // Meadow green highlight
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Manure fertilization organic nutrient pulses
            if (org.isHerdingGrazers) {
                for (let j = 0; j < 3; j++) {
                    const mang = t * 2.5 + j * 2.1;
                    const mr = herdOrbit + 3.0;
                    ctx.beginPath();
                    ctx.arc(Math.cos(mang) * mr, Math.sin(mang) * mr, 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(132, 204, 22, 0.85)";
                    ctx.fill();
                }
            }
        }

        /**
         * Render Dairy Milk Extraction Pails & Fermented Cheese Core.
         */
        static drawDairyVessels(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const vx = r * 0.9;
            const vy = -r * 0.95;

            // Ceramic milk pail / cheese jar
            ctx.beginPath();
            ctx.arc(vx, vy, 3.4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(248, 250, 252, 0.90)"; // Dairy cream white
            ctx.fill();
            ctx.strokeStyle = "rgba(148, 163, 184, 0.90)";
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Active milking cream droplets
            if (org.isMilkingLivestock) {
                const pulseR = 5.5 + Math.sin(t * 5.0) * 2.0;
                ctx.beginPath();
                ctx.arc(vx, vy, pulseR, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(248, 250, 252, 0.75)";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render Wool Shearing & Drop-Spindle Fiber Threads.
         */
        static drawWoolSpinning(ctx, org, r, t) {
            ctx.beginPath();
            for (let i = 0; i <= 12; i++) {
                const ang = t * 3.0 + (i * 0.45);
                const rad = r * 0.8 + (i * 0.9);
                const wx = Math.cos(ang) * rad;
                const wy = Math.sin(ang) * rad;
                if (i === 0) ctx.moveTo(wx, wy);
                else ctx.lineTo(wx, wy);
            }
            ctx.strokeStyle = "rgba(241, 245, 249, 0.85)";
            ctx.lineWidth = 1.0;
            ctx.stroke();
        }

        /**
         * Render Dual Pastoral Subsistence Aura.
         */
        static drawPastoralAura(ctx, org, r, t) {
            const auraRadius = r * 2.05 + Math.sin(t * 1.4) * 2.0;
            const grad = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, auraRadius);
            grad.addColorStop(0, "rgba(132, 204, 22, 0.12)"); // Pastoral meadow green
            grad.addColorStop(0.55, "rgba(248, 250, 252, 0.14)"); // Dairy cream white
            grad.addColorStop(1, "rgba(248, 250, 252, 0.0)");

            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    global.PastoralOpticsRenderer = PastoralOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
