// BioEcosystem - Medieval Windmills, Heavy Mouldboard Plough & Magnetic Compass Optics
// Module: src/render/medieval_optics.js
// Version: 12.4.0 (Hour 744 - Looks & UI Agent: Rotating Windmill Sails, Heavy Mouldboard Furrows & Magnetic Compass Needles)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MedievalOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Medieval aerodynamics and oceanic navigation:
     * 1. Aerodynamic Windmill Rotor (#ca8a04 / #facc15):
     *    - Rotating 4-sail amber-gold windmill blades when org.isSpinningWindmill.
     * 2. Heavy Wheeled Mouldboard Plough Furrows:
     *    - Deep turned clay-sod ridge lines trailing behind when org.isTurningSod.
     * 3. Magnetic Compass Rose & Cobalt Needle (#1d4ed8 / #60a5fa):
     *    - Compass ring and north-aligned cobalt needle when org.isNavigatingCompass.
     */
    class MedievalOpticsRenderer {
        /**
         * Draw Medieval windmill, heavy plough, and magnetic compass visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawMedieval(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasMedievalNavigation) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Magnetic Compass Rose & North-Pointing Needle (#1d4ed8)
            if (org.hasMagneticCompass) {
                if (org.isNavigatingCompass) {
                    const pulse = 0.5 + 0.5 * Math.sin(t * 0.22 + (org.id || 0));
                    ctx.strokeStyle = "rgba(29, 78, 216, " + (0.48 + pulse * 0.35).toFixed(2) + ")";
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.68, 0, Math.PI * 2);
                    ctx.stroke();

                    // North-pointing cobalt needle
                    ctx.strokeStyle = "#60a5fa";
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -r * 1.68);
                    ctx.stroke();
                }
            }

            // 2. Heavy Wheeled Mouldboard Plough Furrows
            if (org.hasMouldboardPlough && org.isTurningSod) {
                ctx.save();
                ctx.rotate(angle);
                ctx.strokeStyle = "rgba(161, 98, 7, 0.68)";
                ctx.lineWidth = 1.6;
                for (let f = -1; f <= 1; f += 2) {
                    ctx.beginPath();
                    ctx.moveTo(-r * 0.85, f * r * 0.48);
                    ctx.lineTo(-r * 2.6, f * r * 0.60);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 3. Rotating 4-Sail Aerodynamic Windmill Rotor (#ca8a04 / #facc15)
            if (org.hasWindmill) {
                const wx = Math.cos(angle + 1.1) * (r * 1.22);
                const wy = Math.sin(angle + 1.1) * (r * 1.22);
                const sailR = Math.max(3.2, r * 0.45);

                ctx.strokeStyle = org.isSpinningWindmill ? "#facc15" : "rgba(202, 138, 4, 0.60)";
                ctx.lineWidth = 1.2;
                const spin = org.isSpinningWindmill ? t * 0.18 : 0.4;
                for (let b = 0; b < 2; b++) {
                    const ba = spin + b * (Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(wx - Math.cos(ba) * sailR, wy - Math.sin(ba) * sailR);
                    ctx.lineTo(wx + Math.cos(ba) * sailR, wy + Math.sin(ba) * sailR);
                    ctx.stroke();
                }
            }

            ctx.restore();
        }
    }

    global.MedievalOpticsRenderer = MedievalOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
