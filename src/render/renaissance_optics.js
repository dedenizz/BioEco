// BioEcosystem - Renaissance Printing Press, Mechanical Clockwork & Optical Telescope Optics
// Module: src/render/renaissance_optics.js
// Version: 12.9.0 (Hour 749 - Looks & UI Agent: Printing Diffusion Waves, Escapement Clockwork & Telescope Beams)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * RenaissanceOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Renaissance knowledge diffusion and horology:
     * 1. Movable-Type Printing Press Diffusion Waves (#9333ea / #d8b4fe):
     *    - Expanding purple monograph rings when org.isPrintingBooks.
     * 2. Escapement Mechanical Clockwork (#eab308 / #fde047):
     *    - Brass gear dial and ticking hand when org.isSynchronizingClock.
     * 3. Refracting Optical Telescope Beam (#fef08a):
     *    - Conical starlight observation cone when org.isObservingCosmos.
     */
    class RenaissanceOpticsRenderer {
        /**
         * Draw Renaissance printing press, clockwork, and telescope visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawRenaissance(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasRenaissancePrinting) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Movable-Type Printing Press Diffusion Waves (#9333ea)
            if (org.hasPrintingPress && org.isPrintingBooks) {
                const wave = (t * 0.08) % 1.0;
                ctx.strokeStyle = "rgba(147, 51, 234, " + (0.70 * (1.0 - wave)).toFixed(2) + ")";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.arc(0, 0, r * (1.2 + wave * 1.1), 0, Math.PI * 2);
                ctx.stroke();
            }

            // 2. Refracting Optical Telescope Beam (#fef08a)
            if (org.hasOpticalTelescope && org.isObservingCosmos) {
                ctx.save();
                ctx.rotate(angle);
                ctx.fillStyle = "rgba(254, 240, 138, 0.16)";
                ctx.beginPath();
                ctx.moveTo(r * 0.9, 0);
                ctx.lineTo(r * 3.0, -r * 0.85);
                ctx.lineTo(r * 3.0, r * 0.85);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            // 3. Escapement Mechanical Clockwork Dial (#eab308)
            if (org.hasMechanicalClock) {
                const cx = Math.cos(angle - 0.8) * (r * 1.24);
                const cy = Math.sin(angle - 0.8) * (r * 1.24);
                const dialR = Math.max(2.6, r * 0.34);

                ctx.strokeStyle = org.isSynchronizingClock ? "#fde047" : "rgba(234, 179, 8, 0.60)";
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.arc(cx, cy, dialR, 0, Math.PI * 2);
                ctx.stroke();

                const handAngle = t * 0.20;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx + Math.cos(handAngle) * dialR, cy + Math.sin(handAngle) * dialR);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    global.RenaissanceOpticsRenderer = RenaissanceOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
