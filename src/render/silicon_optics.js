// BioEcosystem - Semiconductor Transistors, Microprocessors & Global Internet Optics
// Module: src/render/silicon_optics.js
// Version: 14.9.0 (Hour 769 - Looks & UI Agent: CMOS Logic Gate Matrices, CPU Compute Cores & Fiber-Optic Packet Links)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SiliconOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Semiconductor, Microprocessor & Internet:
     * 1. CMOS Logic Gate Matrix (#06b6d4 / #a5f3fc):
     *    - Orthogonal silicon trace grid around the cell when org.isSwitchingLogic.
     * 2. Microprocessor Parallel Compute Core (#22d3ee):
     *    - High-frequency cyan quad-core pulse when org.isComputingCPU.
     * 3. Fiber-Optic Packet Routing Nodes (#6366f1 / #c7d2fe):
     *    - Indigo optical packet rings and 4-node fiber mesh when org.isRoutingPackets.
     */
    class SiliconOpticsRenderer {
        /**
         * Draw semiconductor logic gate, microprocessor, and fiber-optic internet visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawSilicon(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasSiliconInternet) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. CMOS Logic Gate Orthogonal Matrix (#06b6d4 / #a5f3fc)
            if (org.hasSemiconductor && org.isSwitchingLogic) {
                ctx.save();
                const s = r * 1.15;
                ctx.strokeStyle = "rgba(6, 182, 212, 0.72)";
                ctx.lineWidth = 1.0;
                ctx.strokeRect(-s, -s, s * 2, s * 2);

                ctx.fillStyle = "rgba(165, 243, 252, 0.85)";
                const corners = [[-s, -s], [s, -s], [-s, s], [s, s]];
                for (let i = 0; i < corners.length; i++) {
                    ctx.beginPath();
                    ctx.arc(corners[i][0], corners[i][1], 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 2. Microprocessor Parallel Compute Core Pulse (#22d3ee)
            if (org.hasMicroprocessor && org.isComputingCPU) {
                ctx.save();
                const coreR = r * (0.55 + 0.10 * Math.sin(t * 0.9));
                ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, coreR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Fiber-Optic Packet Routing Rings (#6366f1 / #c7d2fe)
            if (org.hasGlobalInternet && org.isRoutingPackets) {
                ctx.save();
                const pktFrac = ((t * 0.11) % 1.0);
                const pktR = r * (1.30 + pktFrac * 1.85);
                const alpha = Math.max(0.08, 0.76 * (1.0 - pktFrac));

                ctx.strokeStyle = "rgba(99, 102, 241, " + alpha.toFixed(2) + ")";
                ctx.lineWidth = 1.3;
                ctx.setLineDash([5, 3]);
                ctx.beginPath();
                ctx.arc(0, 0, pktR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(199, 210, 254, " + alpha.toFixed(2) + ")";
                for (let k = 0; k < 4; k++) {
                    const ang = (t * 0.08) + k * (Math.PI / 2);
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * pktR, Math.sin(ang) * pktR, 1.6, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.SiliconOpticsRenderer = SiliconOpticsRenderer;
})(typeof window !== "undefined" ? window : globalThis);
