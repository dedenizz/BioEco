// BioEcosystem - Electrification, Telegraph Communications & Synthetic Nitrogen Optics
// Module: src/render/electric_optics.js
// Version: 13.9.0 (Hour 759 - Looks & UI Agent: AC Electric Arcs, Telegraph Signal Pulses & Ammonia Synthesis Crystals)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectricOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Electrification, Telegraph & Synthetic Nitrogen:
     * 1. AC Electric Power Grid Arcs & Corona (#0ea5e9 / #bae6fd):
     *    - High-voltage alternating current arcs and blue corona ring when org.isPoweringGrid.
     * 2. Telegraph Signal Wave Pulses (#38bdf8):
     *    - Concentric Morse-coded cyan-blue electromagnetic signal rings when org.isTransmittingTelegraph.
     * 3. Haber-Bosch Ammonia Synthesis Crystals & Nitrogen Halo (#10b981 / #a7f3d0):
     *    - Emerald catalytic nitrogen aura and hexagonal crystal nodes when org.isSynthesizingAmmonia.
     */
    class ElectricOpticsRenderer {
        /**
         * Draw AC electric grid, telegraph signal, and Haber-Bosch ammonia optics on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawElectric(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasElectricNitrogen) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. AC Electric Power Grid Corona & High-Voltage Arcs (#0ea5e9 / #bae6fd)
            if (org.hasElectricGrid && org.isPoweringGrid) {
                ctx.save();
                const acPhase = (t * 0.25) % (Math.PI * 2);
                const arcRadius = r * (1.55 + 0.12 * Math.sin(acPhase));

                ctx.strokeStyle = "rgba(14, 165, 233, 0.72)";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.arc(0, 0, arcRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Alternating-current jagged discharge filaments (3 radial arcs)
                ctx.strokeStyle = "rgba(186, 230, 253, 0.88)";
                ctx.lineWidth = 1.0;
                for (let i = 0; i < 3; i++) {
                    const baseAngle = acPhase + i * ((Math.PI * 2) / 3);
                    const x1 = Math.cos(baseAngle) * (r * 0.95);
                    const y1 = Math.sin(baseAngle) * (r * 0.95);
                    const midAngle = baseAngle + 0.18 * Math.sin(t * 0.6 + i);
                    const xm = Math.cos(midAngle) * (r * 1.32);
                    const ym = Math.sin(midAngle) * (r * 1.32);
                    const x2 = Math.cos(baseAngle - 0.1) * arcRadius;
                    const y2 = Math.sin(baseAngle - 0.1) * arcRadius;

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(xm, ym);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 2. Electric Telegraph Morse Signal Pulses (#38bdf8)
            if (org.hasTelegraphNet && org.isTransmittingTelegraph) {
                ctx.save();
                const pulseFrac = ((t * 0.08) % 1.0);
                const pulseR = r * (1.2 + pulseFrac * 1.6);
                const alpha = Math.max(0.08, 0.75 * (1.0 - pulseFrac));

                ctx.strokeStyle = "rgba(56, 189, 248, " + alpha.toFixed(2) + ")";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([4, 3]);
                ctx.beginPath();
                ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 3. Haber-Bosch Synthetic Nitrogen & Ammonia Crystals (#10b981 / #a7f3d0)
            if (org.hasSyntheticNitrogen && org.isSynthesizingAmmonia) {
                ctx.save();
                const nPhase = t * 0.06;
                const haloR = r * 1.35;

                ctx.strokeStyle = "rgba(16, 185, 129, 0.65)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, haloR, 0, Math.PI * 2);
                ctx.stroke();

                // Orbiting catalytic nitrogen nodes (4 emerald nodes)
                ctx.fillStyle = "#a7f3d0";
                for (let k = 0; k < 4; k++) {
                    const na = nPhase + k * (Math.PI / 2);
                    const nx = Math.cos(na) * haloR;
                    const ny = Math.sin(na) * haloR;
                    ctx.beginPath();
                    ctx.arc(nx, ny, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.ElectricOpticsRenderer = ElectricOpticsRenderer;
})(typeof window !== "undefined" ? window : globalThis);
