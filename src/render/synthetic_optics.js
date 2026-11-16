// BioEcosystem - Synthetic Biology, CRISPR-Cas9 Genome Engineering & Artificial Cell Optics
// Module: src/render/synthetic_optics.js
// Version: 15.9.0 (Hour 779 - Looks & UI Agent: CRISPR Double-Helix Cleavage Rings, Synthetic Enzyme Nodes & Artificial Chassis Membrane)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SyntheticOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Synthetic Biology, CRISPR & Artificial Cells:
     * 1. CRISPR-Cas9 Double-Helix Cleavage Rings (#22c55e / #bbf7d0):
     *    - Precision green genomic target arcs when org.isEditingGenome.
     * 2. Synthetic Metabolic Enzyme Nodes (#4ade80):
     *    - Catalytic emerald-green biochemical synthesis nodes when org.isSynthesizingBio.
     * 3. Artificial Cell Double-Layer Chassis Membrane (#14b8a6 / #99f6e4):
     *    - Bio-teal engineered phospholipid bilayer ring when org.isOperatingChassis.
     */
    class SyntheticOpticsRenderer {
        /**
         * Draw CRISPR editing, synthetic metabolic pathway, and artificial chassis visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawSynthetic(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasSyntheticCrispr) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. CRISPR-Cas9 Double-Helix Cleavage Arcs (#22c55e / #bbf7d0)
            if (org.hasCrisprGenomics && org.isEditingGenome) {
                ctx.save();
                const gR = r * 1.45;
                const phase = t * 0.09;
                ctx.strokeStyle = "rgba(34, 197, 94, 0.80)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, gR, phase, phase + Math.PI * 0.75);
                ctx.stroke();

                ctx.strokeStyle = "rgba(187, 247, 208, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, gR, phase + Math.PI, phase + Math.PI * 1.75);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Synthetic Metabolic Enzyme Nodes (#4ade80)
            if (org.hasSyntheticPathways && org.isSynthesizingBio) {
                ctx.save();
                const nodeR = r * 1.25;
                ctx.fillStyle = "rgba(74, 222, 128, 0.88)";
                for (let i = 0; i < 3; i++) {
                    const a = (t * 0.07) + i * ((Math.PI * 2) / 3);
                    ctx.beginPath();
                    ctx.arc(Math.cos(a) * nodeR, Math.sin(a) * nodeR, 1.7, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Artificial Cell Double-Layer Chassis Membrane (#14b8a6 / #99f6e4)
            if (org.hasArtificialChassis && org.isOperatingChassis) {
                ctx.save();
                const cR = r * 1.65;
                ctx.strokeStyle = "rgba(20, 184, 166, 0.78)";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.arc(0, 0, cR, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = "rgba(153, 246, 228, 0.55)";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.arc(0, 0, cR * 0.88, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.SyntheticOpticsRenderer = SyntheticOpticsRenderer;
})(typeof window !== "undefined" ? window : globalThis);
