// BioEcosystem - Iron Age Bloomery Smelting, Carburized Steel & Maritime Trade Optics
// Module: src/render/iron_optics.js
// Version: 11.4.0 (Hour 734 - Looks & UI Agent: 1250C Bloomery Forge Sparks, Steel Glints, Keeled Galley Wakes & Ledger Markers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IronOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Iron Age metallurgy and maritime trade:
     * 1. 1250 C Bloomery Forge & Carburized Steel Sparks (#64748b / #e2e8f0):
     *    - White-hot quenching sparks and steel slate aura when org.isForgingSteel.
     *    - High-tensile steel blade glint node when org.hasIronForge.
     * 2. Keeled Maritime Merchant Galley Wake (#0d9488 / #5eead4):
     *    - V-shaped pelagic bow wake and square-sail arc when org.isSailingTrade.
     * 3. Cuneiform Ledger Archive Marker:
     *    - Rectangular clay-tablet tally outline when org.isRecordingLedger.
     */
    class IronOpticsRenderer {
        /**
         * Draw Iron Age forge, maritime galley, and ledger archive visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawIron(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasIronMaritime) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Keeled Maritime Merchant Galley Bow Wake (#0d9488)
            if (org.hasMaritimeShip) {
                if (org.isSailingTrade) {
                    const wave = 0.5 + 0.5 * Math.sin(t * 0.24 + (org.id || 0));
                    ctx.save();
                    ctx.rotate(angle);
                    ctx.strokeStyle = "rgba(13, 148, 136, " + (0.48 + wave * 0.35).toFixed(2) + ")";
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(r * 1.3, 0);
                    ctx.lineTo(-r * 2.2, -r * 1.15);
                    ctx.moveTo(r * 1.3, 0);
                    ctx.lineTo(-r * 2.2, r * 1.15);
                    ctx.stroke();

                    // Square sail crossbar
                    ctx.strokeStyle = "rgba(94, 234, 212, 0.72)";
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(0, -r * 0.85);
                    ctx.lineTo(0, r * 0.85);
                    ctx.stroke();
                    ctx.restore();
                } else {
                    ctx.strokeStyle = "rgba(13, 148, 136, 0.24)";
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.52, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // 2. Cuneiform Ledger Archive Marker
            if (org.hasLedgerArchive && org.isRecordingLedger) {
                ctx.strokeStyle = "rgba(148, 163, 184, 0.65)";
                ctx.lineWidth = 1.0;
                ctx.strokeRect(-r * 1.5, -r * 1.5, 4.5, 5.5);
            }

            // 3. 1250 C Bloomery Forge & Carburized Steel Sparks (#64748b / #e2e8f0)
            if (org.hasIronForge) {
                if (org.isForgingSteel) {
                    const pulse = 0.55 + 0.45 * Math.sin(t * 0.36);
                    const grad = ctx.createRadialGradient(0, 0, r * 0.25, 0, 0, r * 1.95);
                    grad.addColorStop(0, "rgba(226, 232, 240, " + (0.46 * pulse).toFixed(2) + ")");
                    grad.addColorStop(0.6, "rgba(100, 116, 139, " + (0.30 * pulse).toFixed(2) + ")");
                    grad.addColorStop(1, "rgba(100, 116, 139, 0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.95, 0, Math.PI * 2);
                    ctx.fill();

                    // Quenching steel sparks
                    ctx.fillStyle = "#f1f5f9";
                    for (let s = 0; s < 4; s++) {
                        const sa = angle + s * 1.57 + t * 0.16;
                        const sr = r * (1.3 + 0.35 * Math.sin(t * 0.45 + s));
                        ctx.beginPath();
                        ctx.arc(Math.cos(sa) * sr, Math.sin(sa) * sr, 1.2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                const sx = Math.cos(angle + 0.9) * (r * 1.20);
                const sy = Math.sin(angle + 0.9) * (r * 1.20);
                ctx.fillStyle = "#64748b";
                ctx.strokeStyle = "#e2e8f0";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.arc(sx, sy, 2.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    global.IronOpticsRenderer = IronOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
