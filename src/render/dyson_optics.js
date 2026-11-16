// BioEcosystem - Stellar Energy Harvesting, Dyson Biosphere Rings & Cosmic Entropy Reversal Optics
// Module: src/render/dyson_optics.js
// Version: 17.4.0 (Hour 794 - Looks & UI Agent: Dyson Swarm Rings, Bio-Dyson Carbon Nodes & Negentropy Field Waves)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * DysonOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Dyson Biosphere Rings & Cosmic Negentropy:
     * 1. Dyson Swarm Stellar Collector Rings (#facc15 / #fef08a):
     *    - Stellar-gold collector arcs harvesting luminosity when org.isHarvestingStarlight.
     * 2. Bio-Dyson Carbon Fixation Nodes (#fde047):
     *    - High-energy metabolic synthesis nodes when org.isFixingStellarCarbon.
     * 3. Cosmic Negentropy Field Waves (#ec4899 / #fbcfe8):
     *    - Magenta thermodynamic entropy-reversal halo when org.isReversingEntropy.
     */
    class DysonOpticsRenderer {
        /**
         * Draw Dyson swarm rings, bio-Dyson carbon nodes, and negentropy waves on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawDyson(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasDysonBiosphere) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Dyson Swarm Stellar Collector Rings (#facc15 / #fef08a)
            if (org.hasDysonSwarm && org.isHarvestingStarlight) {
                ctx.save();
                const dR = r * 1.66;
                const phase = t * 0.09;
                ctx.strokeStyle = "rgba(250, 204, 21, 0.82)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, dR, phase, phase + Math.PI * 0.82);
                ctx.stroke();

                ctx.strokeStyle = "rgba(254, 240, 138, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, dR, phase + Math.PI, phase + Math.PI * 1.82);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Bio-Dyson Carbon Fixation Nodes (#fde047)
            if (org.hasBioDysonMetabolism && org.isFixingStellarCarbon) {
                ctx.save();
                const bR = r * 1.28;
                ctx.fillStyle = "rgba(253, 224, 71, 0.88)";
                for (let k = 0; k < 3; k++) {
                    const ang = t * 0.12 + (k * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * bR, Math.sin(ang) * bR, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Cosmic Negentropy Field Waves (#ec4899 / #fbcfe8)
            if (org.hasNegentropyEngine && org.isReversingEntropy) {
                ctx.save();
                const nR = r * 1.88;
                ctx.strokeStyle = "rgba(236, 72, 153, 0.78)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([3.0, 2.5]);
                ctx.beginPath();
                ctx.arc(0, 0, nR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(251, 207, 232, 0.90)";
                const nAng = -t * 0.085;
                ctx.beginPath();
                ctx.arc(Math.cos(nAng) * nR, Math.sin(nAng) * nR, 1.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.DysonOpticsRenderer = DysonOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
