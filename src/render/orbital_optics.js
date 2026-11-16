// BioEcosystem - Orbital Habitats, Asteroid Mining & Closed-Loop Space Ecology Optics
// Module: src/render/orbital_optics.js
// Version: 16.4.0 (Hour 784 - Looks & UI Agent: Centrifugal Habitat Rings, Closed-Loop Gas Flow & Asteroid Mineral Nodes)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OrbitalOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Orbital Habitats, Asteroid Mining & Closed-Loop Space Ecology:
     * 1. Rotating Centrifugal Orbital Habitat Rings (#38bdf8 / #bae6fd):
     *    - Precision sky-blue orbital centrifuge arcs when org.isCulturingOrbit.
     * 2. Closed-Loop O2/CO2 Gas Recovery Particles (#7dd3fc):
     *    - Regenerative atmospheric circulation nodes when org.isRecyclingAtmosphere.
     * 3. Asteroid Mineral Mining Nodes (#f59e0b / #fde68a):
     *    - Amber carbonaceous-chondrite & metallic regolith extraction nodes when org.isExtractingRegolith.
     */
    class OrbitalOpticsRenderer {
        /**
         * Draw orbital habitat rings, closed-loop gas circulation, and asteroid mining visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawOrbital(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasOrbitalEcology) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Rotating Centrifugal Orbital Habitat Rings (#38bdf8 / #bae6fd)
            if (org.hasMicrogravityBioreactor && org.isCulturingOrbit) {
                ctx.save();
                const oR = r * 1.52;
                const phase = t * 0.08;
                ctx.strokeStyle = "rgba(56, 189, 248, 0.80)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, oR, phase, phase + Math.PI * 0.8);
                ctx.stroke();

                ctx.strokeStyle = "rgba(186, 230, 253, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, oR, phase + Math.PI, phase + Math.PI * 1.8);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Closed-Loop O2/CO2 Gas Recovery Particles (#7dd3fc)
            if (org.hasClosedLoopEcology && org.isRecyclingAtmosphere) {
                ctx.save();
                const gR = r * 1.18;
                ctx.fillStyle = "rgba(125, 211, 252, 0.85)";
                for (let k = 0; k < 3; k++) {
                    const ang = t * 0.11 + (k * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * gR, Math.sin(ang) * gR, 1.4, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Asteroid Mineral Mining Nodes (#f59e0b / #fde68a)
            if (org.hasAsteroidMining && org.isExtractingRegolith) {
                ctx.save();
                const aR = r * 1.72;
                ctx.strokeStyle = "rgba(245, 158, 11, 0.78)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([2.5, 2.5]);
                ctx.beginPath();
                ctx.arc(0, 0, aR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(253, 230, 138, 0.90)";
                const mAng = -t * 0.07;
                ctx.beginPath();
                ctx.arc(Math.cos(mAng) * aR, Math.sin(mAng) * aR, 1.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.OrbitalOpticsRenderer = OrbitalOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
