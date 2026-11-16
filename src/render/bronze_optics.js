// BioEcosystem - Bronze Age Tin-Bronze Alloying, Wheeled Chariots & Urban Guilds Optics
// Module: src/render/bronze_optics.js
// Version: 10.9.0 (Hour 729 - Looks & UI Agent: Tin-Bronze Foundry Glow, Rotating Spoked Wheels, Caravan Ruts & Urban Guild Rings)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BronzeOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Bronze Age metallurgy and urban logistics:
     * 1. Tin-Bronze Foundry & Bivalve Mold Glow (#b45309):
     *    - Golden-bronze crucible aura and casting sparks when org.isCastingBronze.
     *    - Work-hardened bronze blade glint node when org.hasBronzeFoundry.
     * 2. Axled Wheeled Carts & Spoked Wheel Tracks (#4f46e5 / #a5b4fc):
     *    - Rotating spoked wheel hubs and parallel cart ruts behind the organism when org.isHaulingCaravan.
     * 3. Urban Craft Guild Citadel Ring (#4f46e5):
     *    - Geometric indigo workshop halo when org.isWorkingGuild.
     */
    class BronzeOpticsRenderer {
        /**
         * Draw Bronze Age foundry, wheeled cart, and urban guild visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawBronze(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasBronzeUrbanism) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Urban Craft Guild Citadel Perimeter (#4f46e5)
            if (org.hasUrbanGuild) {
                if (org.isWorkingGuild) {
                    const pulse = 0.5 + 0.5 * Math.sin(t * 0.22 + (org.id || 0));
                    ctx.strokeStyle = "rgba(79, 70, 229, " + (0.45 + pulse * 0.35).toFixed(2) + ")";
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    for (let k = 0; k < 6; k++) {
                        const a = (k * Math.PI) / 3 + t * 0.02;
                        const px = Math.cos(a) * r * 1.55;
                        const py = Math.sin(a) * r * 1.55;
                        if (k === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = "rgba(79, 70, 229, 0.24)";
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.45, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // 2. Axled Wheeled Cart & Spoked Wheel Tracks
            if (org.hasWheeledCart && org.isHaulingCaravan) {
                ctx.save();
                ctx.rotate(angle);

                // Parallel wheel ruts
                ctx.strokeStyle = "rgba(129, 140, 248, 0.55)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(-r * 0.8, -r * 0.72);
                ctx.lineTo(-r * 2.5, -r * 0.72);
                ctx.moveTo(-r * 0.8, r * 0.72);
                ctx.lineTo(-r * 2.5, r * 0.72);
                ctx.stroke();

                // Left & right spoked wheels
                const wheelSpin = t * 0.28;
                const wheelR = Math.max(2.4, r * 0.32);
                const sides = [-r * 0.72, r * 0.72];
                for (let s = 0; s < sides.length; s++) {
                    const wy = sides[s];
                    ctx.strokeStyle = "#a5b4fc";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(-r * 0.65, wy, wheelR, 0, Math.PI * 2);
                    ctx.stroke();
                    for (let sp = 0; sp < 2; sp++) {
                        const sa = wheelSpin + sp * (Math.PI / 2);
                        ctx.beginPath();
                        ctx.moveTo(-r * 0.65 - Math.cos(sa) * wheelR, wy - Math.sin(sa) * wheelR);
                        ctx.lineTo(-r * 0.65 + Math.cos(sa) * wheelR, wy + Math.sin(sa) * wheelR);
                        ctx.stroke();
                    }
                }
                ctx.restore();
            }

            // 3. Tin-Bronze Foundry Glow & Work-Hardened Bronze Glint (#b45309)
            if (org.hasBronzeFoundry) {
                if (org.isCastingBronze) {
                    const glow = 0.55 + 0.45 * Math.sin(t * 0.32);
                    const grad = ctx.createRadialGradient(0, 0, r * 0.25, 0, 0, r * 1.9);
                    grad.addColorStop(0, "rgba(245, 158, 11, " + (0.45 * glow).toFixed(2) + ")");
                    grad.addColorStop(0.6, "rgba(180, 83, 9, " + (0.28 * glow).toFixed(2) + ")");
                    grad.addColorStop(1, "rgba(180, 83, 9, 0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.9, 0, Math.PI * 2);
                    ctx.fill();
                }

                const gx = Math.cos(angle - 0.6) * (r * 1.18);
                const gy = Math.sin(angle - 0.6) * (r * 1.18);
                ctx.fillStyle = "#b45309";
                ctx.strokeStyle = "#fcd34d";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.arc(gx, gy, 2.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    global.BronzeOpticsRenderer = BronzeOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
