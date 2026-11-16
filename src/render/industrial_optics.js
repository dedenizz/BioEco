// BioEcosystem - Industrial Revolution Steam Power, Coke Steel & Rail Logistics Optics
// Module: src/render/industrial_optics.js
// Version: 13.4.0 (Hour 754 - Looks & UI Agent: Steam Pistons, Converter Sparks & Twin Steel Rail Tracks)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IndustrialOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Industrial steam and rail logistics:
     * 1. Twin Steel Rail Tracks & Crossties (#475569 / #94a3b8):
     *    - Parallel steel rail lines and sleepers trailing behind when org.isRunningLocomotive.
     * 2. Separate-Condenser Steam Piston & Boiler Glow (#dc2626 / #e2e8f0):
     *    - Crimson thermodynamic aura and white steam exhaust puffs when org.isSteamingPiston.
     * 3. Coke-Fired Steel Converter Sparks (#f97316):
     *    - High-temperature steel pour glint when org.isPouringSteel.
     */
    class IndustrialOpticsRenderer {
        /**
         * Draw Industrial steam, steel converter, and rail track visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawIndustrial(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasIndustrialSteam) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Twin Steel Rail Tracks & Crossties (#475569 / #94a3b8)
            if (org.hasRailLogistics && org.isRunningLocomotive) {
                ctx.save();
                ctx.rotate(angle);
                ctx.strokeStyle = "rgba(148, 163, 184, 0.70)";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(-r * 0.7, -r * 0.78);
                ctx.lineTo(-r * 2.7, -r * 0.78);
                ctx.moveTo(-r * 0.7, r * 0.78);
                ctx.lineTo(-r * 2.7, r * 0.78);
                ctx.stroke();

                ctx.strokeStyle = "rgba(71, 85, 105, 0.75)";
                ctx.lineWidth = 1.0;
                for (let k = 1.0; k <= 2.5; k += 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(-r * k, -r * 0.90);
                    ctx.lineTo(-r * k, r * 0.90);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 2. Coke-Fired Converter Steel Sparks (#f97316)
            if (org.hasCokeSteel && org.isPouringSteel) {
                ctx.fillStyle = "#fb923c";
                for (let s = 0; s < 3; s++) {
                    const sa = angle + s * 2.094 + t * 0.18;
                    const sr = r * (1.28 + 0.25 * Math.sin(t * 0.4 + s));
                    ctx.beginPath();
                    ctx.arc(Math.cos(sa) * sr, Math.sin(sa) * sr, 1.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 3. Separate-Condenser Steam Engine Glow & Exhaust Puff (#dc2626)
            if (org.hasSteamEngine) {
                if (org.isSteamingPiston) {
                    const pulse = 0.55 + 0.45 * Math.sin(t * 0.35);
                    const grad = ctx.createRadialGradient(0, 0, r * 0.25, 0, 0, r * 1.9);
                    grad.addColorStop(0, "rgba(220, 38, 38, " + (0.42 * pulse).toFixed(2) + ")");
                    grad.addColorStop(1, "rgba(220, 38, 38, 0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.9, 0, Math.PI * 2);
                    ctx.fill();

                    // White steam exhaust ring
                    const puff = (t * 0.1) % 1.0;
                    ctx.strokeStyle = "rgba(226, 232, 240, " + (0.65 * (1.0 - puff)).toFixed(2) + ")";
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * (1.1 + puff * 0.9), 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            ctx.restore();
        }
    }

    global.IndustrialOpticsRenderer = IndustrialOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
