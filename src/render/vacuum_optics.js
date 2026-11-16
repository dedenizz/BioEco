// BioEcosystem - Trans-Dimensional Ecosystem Resonance, Quantum Vacuum Life & Meta-Evolutionary Optics
// Module: src/render/vacuum_optics.js
// Version: 18.4.0 (Hour 804 - Looks & UI Agent: Zero-Point Wave Rings, Resonance Nodes & Meta-Evolution Halos)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * VacuumOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Quantum Vacuum Life & Meta-Evolutionary Synthesis:
     * 1. Vacuum Cyan Zero-Point Wave Rings (#06b6d4 / #a5f3fc):
     *    - Zero-point fluctuation harvesting arcs when org.isTappingVacuum.
     * 2. Vacuum Resonance Quantum Nodes (#22d3ee):
     *    - Dimensional coherence nodes when org.isResonatingVacuum.
     * 3. Meta-Crimson Trans-Dimensional Synthesis Halos (#f43f5e / #fecdd3):
     *    - Meta-evolutionary rule-optimization ring when org.isOptimizingMetaRules.
     */
    class VacuumOpticsRenderer {
        /**
         * Draw zero-point wave rings, resonance nodes, and meta-evolution halos on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawVacuum(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasVacuumResonance) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Vacuum Cyan Zero-Point Wave Rings (#06b6d4 / #a5f3fc)
            if (org.hasZeroPointMetabolism && org.isTappingVacuum) {
                ctx.save();
                const vR = r * 1.82;
                const phase = t * 0.10;
                ctx.strokeStyle = "rgba(6, 182, 212, 0.82)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, vR, phase, phase + Math.PI * 0.85);
                ctx.stroke();

                ctx.strokeStyle = "rgba(165, 243, 252, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, vR, phase + Math.PI, phase + Math.PI * 1.85);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Vacuum Resonance Quantum Nodes (#22d3ee)
            if (org.hasVacuumResonanceEngine && org.isResonatingVacuum) {
                ctx.save();
                const qR = r * 1.36;
                ctx.fillStyle = "rgba(34, 211, 238, 0.88)";
                for (let k = 0; k < 3; k++) {
                    const ang = t * 0.14 + (k * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * qR, Math.sin(ang) * qR, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Meta-Crimson Trans-Dimensional Synthesis Halos (#f43f5e / #fecdd3)
            if (org.hasMetaEvolution && org.isOptimizingMetaRules) {
                ctx.save();
                const mR = r * 2.04;
                ctx.strokeStyle = "rgba(244, 63, 94, 0.80)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([3.0, 2.5]);
                ctx.beginPath();
                ctx.arc(0, 0, mR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(254, 205, 211, 0.90)";
                const mAng = -t * 0.095;
                ctx.beginPath();
                ctx.arc(Math.cos(mAng) * mR, Math.sin(mAng) * mR, 1.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.VacuumOpticsRenderer = VacuumOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
