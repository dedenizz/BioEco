// BioEcosystem - Internal Combustion Engines, Aerodynamic Aviation & Global Radio Optics
// Module: src/render/aviation_optics.js
// Version: 14.4.0 (Hour 764 - Looks & UI Agent: Combustion Sparks, Twin Wingtip Vortices & Radio Wave Rings)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AviationOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Internal Combustion, Aviation & Radio:
     * 1. Internal Combustion Piston Sparks (#f59e0b / #2563eb):
     *    - High-energy combustion exhaust glint when org.isRunningEngine.
     * 2. Aerodynamic Wingtip Vortices (#2563eb / #93c5fd):
     *    - Swept-wing silhouette and twin trailing wingtip contrails when org.isFlyingAircraft.
     * 3. Global Radio Electromagnetic Wave Rings (#9333ea / #d8b4fe):
     *    - Concentric violet carrier-wave broadcast rings when org.isBroadcastingRadio.
     */
    class AviationOpticsRenderer {
        /**
         * Draw internal combustion, aviation wingtip vortex, and radio wave visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawAviation(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasAviationRadio) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Internal Combustion Exhaust Glint (#f59e0b / #2563eb)
            if (org.hasInternalCombustion && org.isRunningEngine) {
                ctx.save();
                ctx.rotate(angle);
                const sparkR = r * (0.28 + 0.08 * Math.sin(t * 0.8));
                ctx.fillStyle = "rgba(245, 158, 11, 0.82)";
                ctx.beginPath();
                ctx.arc(-r * 1.15, 0, sparkR, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // 2. Aerodynamic Swept-Wing & Twin Wingtip Vortices (#2563eb / #93c5fd)
            if (org.hasAviation && org.isFlyingAircraft) {
                ctx.save();
                ctx.rotate(angle);

                // Swept fixed-wing overlay
                ctx.strokeStyle = "rgba(37, 99, 235, 0.85)";
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(r * 0.4, 0);
                ctx.lineTo(-r * 0.65, -r * 1.45);
                ctx.moveTo(r * 0.4, 0);
                ctx.lineTo(-r * 0.65, r * 1.45);
                ctx.stroke();

                // Twin wingtip contrails
                ctx.strokeStyle = "rgba(147, 197, 253, 0.65)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([3, 2]);
                ctx.beginPath();
                ctx.moveTo(-r * 0.65, -r * 1.45);
                ctx.lineTo(-r * 2.1, -r * 1.55);
                ctx.moveTo(-r * 0.65, r * 1.45);
                ctx.lineTo(-r * 2.1, r * 1.55);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 3. Global Wireless Radio Carrier-Wave Rings (#9333ea / #d8b4fe)
            if (org.hasRadioNetwork && org.isBroadcastingRadio) {
                ctx.save();
                const waveFrac = ((t * 0.09) % 1.0);
                const waveR = r * (1.25 + waveFrac * 1.9);
                const alpha = Math.max(0.08, 0.78 * (1.0 - waveFrac));

                ctx.strokeStyle = "rgba(147, 51, 234, " + alpha.toFixed(2) + ")";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, waveR, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = "rgba(216, 180, 254, " + (alpha * 0.75).toFixed(2) + ")";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.arc(0, 0, waveR * 0.72, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.AviationOpticsRenderer = AviationOpticsRenderer;
})(typeof window !== "undefined" ? window : globalThis);
