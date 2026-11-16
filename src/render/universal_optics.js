// BioEcosystem - Universal Biosphere Synthesis, Multiverse Seeding & Omega Continuity Optics
// Module: src/render/universal_optics.js
// Version: 17.9.0 (Hour 799 - Looks & UI Agent: Cosmic Biosphere Rings, Information Nodes & Multiverse Seed Halos)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UniversalOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Universal Biosphere & Multiverse Seeding:
     * 1. Cosmic Cyan Universal Synthesis Rings (#38bdf8 / #bae6fd):
     *    - Intergalactic biosphere synthesis arcs when org.isSynthesizingCosmos.
     * 2. Cosmic Life Complexity Nodes (#7dd3fc):
     *    - Multi-tier information-energy synthesis nodes when org.isElevatingComplexity.
     * 3. Omega Purple Multiverse Seeding Halos (#a855f7 / #e9d5ff):
     *    - Interdimensional quantum-tunneling seed rings when org.isSeedingMultiverse.
     */
    class UniversalOpticsRenderer {
        /**
         * Draw universal biosphere rings, complexity nodes, and multiverse seed halos on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawUniversal(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasUniversalBiosphere) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Cosmic Cyan Universal Synthesis Rings (#38bdf8 / #bae6fd)
            if (org.hasUniversalSynthesis && org.isSynthesizingCosmos) {
                ctx.save();
                const uR = r * 1.74;
                const phase = t * 0.095;
                ctx.strokeStyle = "rgba(56, 189, 248, 0.82)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, uR, phase, phase + Math.PI * 0.85);
                ctx.stroke();

                ctx.strokeStyle = "rgba(186, 230, 253, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, uR, phase + Math.PI, phase + Math.PI * 1.85);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Cosmic Life Complexity Nodes (#7dd3fc)
            if (org.hasCosmicComplexity && org.isElevatingComplexity) {
                ctx.save();
                const cR = r * 1.32;
                ctx.fillStyle = "rgba(125, 211, 252, 0.88)";
                for (let k = 0; k < 3; k++) {
                    const ang = t * 0.13 + (k * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * cR, Math.sin(ang) * cR, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Omega Purple Multiverse Seeding Halos (#a855f7 / #e9d5ff)
            if (org.hasMultiverseSeeding && org.isSeedingMultiverse) {
                ctx.save();
                const mR = r * 1.96;
                ctx.strokeStyle = "rgba(168, 85, 247, 0.80)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([3.0, 2.5]);
                ctx.beginPath();
                ctx.arc(0, 0, mR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(233, 213, 255, 0.90)";
                const mAng = -t * 0.09;
                ctx.beginPath();
                ctx.arc(Math.cos(mAng) * mR, Math.sin(mAng) * mR, 1.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.UniversalOpticsRenderer = UniversalOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
