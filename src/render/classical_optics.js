// BioEcosystem - Classical Antiquity Watermills, Aqueduct Hydraulics & Crop Rotation Optics
// Module: src/render/classical_optics.js
// Version: 11.9.0 (Hour 739 - Looks & UI Agent: Rotating Waterwheels, Stone Aqueduct Arcades & Legume Nitrogen Nodules)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ClassicalOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Classical Antiquity hydraulics and agronomy:
     * 1. Hydromechanical Watermill Wheel (#0369a1 / #38bdf8):
     *    - Rotating 6-paddle waterwheel and kinetic water spray when org.isMillingWater.
     * 2. Gravity-Fed Stone Aqueduct Arcade (#0369a1):
     *    - Elevated stone arch conduit and sapphire water stream when org.isChannelingAqueduct.
     * 3. Three-Field Crop Rotation & Legume Nitrogen Fixation (#15803d / #4ade80):
     *    - Emerald Rhizobium nitrogen-fixation nodules and fertile soil aura when org.isRotatingCrops.
     */
    class ClassicalOpticsRenderer {
        /**
         * Draw Classical Antiquity watermill, aqueduct, and crop rotation visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawClassical(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasClassicalHydraulics) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Three-Field Crop Rotation & Legume Nitrogen Fixation (#15803d)
            if (org.hasCropRotation) {
                if (org.isRotatingCrops) {
                    const pulse = 0.5 + 0.5 * Math.sin(t * 0.22 + (org.id || 0));
                    ctx.strokeStyle = "rgba(21, 128, 61, " + (0.48 + pulse * 0.35).toFixed(2) + ")";
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.62, 0, Math.PI * 2);
                    ctx.stroke();

                    // Emerald nitrogen fixation nodules
                    ctx.fillStyle = "#4ade80";
                    for (let n = 0; n < 3; n++) {
                        const na = angle + n * 2.094 + t * 0.04;
                        ctx.beginPath();
                        ctx.arc(Math.cos(na) * r * 1.48, Math.sin(na) * r * 1.48, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // 2. Gravity-Fed Stone Aqueduct Arcade (#0369a1)
            if (org.hasAqueduct && org.isChannelingAqueduct) {
                ctx.save();
                ctx.rotate(angle);
                ctx.strokeStyle = "rgba(3, 105, 161, 0.72)";
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(-r * 2.0, -r * 0.95);
                ctx.lineTo(r * 1.5, -r * 0.95);
                ctx.stroke();

                // Aqueduct arch pillars
                ctx.strokeStyle = "rgba(125, 211, 252, 0.55)";
                ctx.lineWidth = 1.0;
                for (let p = -1.6; p <= 1.2; p += 0.9) {
                    ctx.beginPath();
                    ctx.arc(r * p, -r * 0.75, r * 0.25, Math.PI, 0);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 3. Hydromechanical Rotating Waterwheel (#38bdf8)
            if (org.hasWatermill) {
                const wx = Math.cos(angle - 1.1) * (r * 1.18);
                const wy = Math.sin(angle - 1.1) * (r * 1.18);
                const wheelR = Math.max(2.8, r * 0.36);

                ctx.strokeStyle = org.isMillingWater ? "#38bdf8" : "rgba(3, 105, 161, 0.65)";
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.arc(wx, wy, wheelR, 0, Math.PI * 2);
                ctx.stroke();

                if (org.isMillingWater) {
                    const spin = t * 0.25;
                    for (let p = 0; p < 3; p++) {
                        const pa = spin + p * (Math.PI / 3);
                        ctx.beginPath();
                        ctx.moveTo(wx - Math.cos(pa) * wheelR, wy - Math.sin(pa) * wheelR);
                        ctx.lineTo(wx + Math.cos(pa) * wheelR, wy + Math.sin(pa) * wheelR);
                        ctx.stroke();
                    }
                }
            }

            ctx.restore();
        }
    }

    global.ClassicalOpticsRenderer = ClassicalOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
