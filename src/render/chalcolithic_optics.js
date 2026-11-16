// BioEcosystem - Chalcolithic Copper Metallurgy, Ox-Drawn Ard Plough & Irrigation Canal Optics
// Module: src/render/chalcolithic_optics.js
// Version: 10.4.0 (Hour 724 - Looks & UI Agent: 1085C Smelting Kilns, Copper Glints, Ox Plough Furrows & Irrigation Canal Ripples)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalcolithicOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Chalcolithic copper metallurgy and hydraulic agronomy:
     * 1. 1085 C Bellows Copper Smelting Kiln & Molten Ingot Aura:
     *    - Glowing copper-orange furnace ring (#d97706) and radiating thermal sparks when org.isSmeltingCopper.
     *    - Cold-hammered copper axe/sickle metallic sheen indicator for org.hasCopperSmelting.
     * 2. Ox-Drawn Ard Plough Deep Furrows:
     *    - Parallel dark-loam aerated soil ridges trailing behind the organism when org.isPloughingField.
     * 3. Artificial Irrigation Canals & Alluvial Hydraulics:
     *    - Regulated canal channel lines and shimmering cyan-blue (#0284c7) water flow ripples when org.isIrrigatingCanal.
     */
    class ChalcolithicOpticsRenderer {
        /**
         * Draw Chalcolithic metallurgy, ox plough, and irrigation canal visuals on the microscope canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawChalcolithic(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasChalcolithicMetallurgy) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Artificial Irrigation Canal & Alluvial Sluice Ripples (#0284c7)
            if (org.hasIrrigationCanal) {
                if (org.isIrrigatingCanal) {
                    const pulse = 0.5 + 0.5 * Math.sin(t * 0.25 + (org.id || 0));
                    ctx.save();
                    ctx.rotate(angle);
                    ctx.strokeStyle = "rgba(2, 132, 199, " + (0.45 + pulse * 0.35).toFixed(2) + ")";
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(-r * 2.1, -r * 0.65);
                    ctx.lineTo(r * 1.4, -r * 0.65);
                    ctx.moveTo(-r * 2.1, r * 0.65);
                    ctx.lineTo(r * 1.4, r * 0.65);
                    ctx.stroke();

                    // Alluvial water flow beads
                    ctx.fillStyle = "rgba(56, 189, 248, 0.78)";
                    const flowOffset = ((t * 0.8) % (r * 2.8)) - r * 1.8;
                    ctx.beginPath();
                    ctx.arc(flowOffset, -r * 0.65, 1.5, 0, Math.PI * 2);
                    ctx.arc(flowOffset * 0.85, r * 0.65, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else {
                    ctx.strokeStyle = "rgba(2, 132, 199, 0.28)";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.38, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // 2. Ox-Drawn Ard Plough Parallel Furrows
            if (org.hasOxPlough && org.isPloughingField) {
                ctx.save();
                ctx.rotate(angle);
                ctx.strokeStyle = "rgba(180, 83, 9, 0.62)";
                ctx.lineWidth = 1.4;
                for (let f = -1; f <= 1; f += 2) {
                    ctx.beginPath();
                    ctx.moveTo(-r * 0.9, f * r * 0.42);
                    ctx.lineTo(-r * 2.4, f * r * 0.52);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 3. 1085 C Copper Smelting Kiln & Cold-Hammered Copper Tool Glint (#d97706)
            if (org.hasCopperSmelting) {
                if (org.isSmeltingCopper) {
                    const ember = 0.55 + 0.45 * Math.sin(t * 0.35);
                    const grad = ctx.createRadialGradient(0, 0, r * 0.3, 0, 0, r * 1.85);
                    grad.addColorStop(0, "rgba(251, 146, 60, " + (0.42 * ember).toFixed(2) + ")");
                    grad.addColorStop(0.6, "rgba(217, 119, 6, " + (0.28 * ember).toFixed(2) + ")");
                    grad.addColorStop(1, "rgba(217, 119, 6, 0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, r * 1.85, 0, Math.PI * 2);
                    ctx.fill();

                    // Molten copper sparks
                    ctx.fillStyle = "#fdba74";
                    for (let s = 0; s < 3; s++) {
                        const sa = angle + s * 2.094 + t * 0.12;
                        const sr = r * (1.25 + 0.3 * Math.sin(t * 0.4 + s));
                        ctx.beginPath();
                        ctx.arc(Math.cos(sa) * sr, Math.sin(sa) * sr, 1.3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Cold-hammered copper blade glint node
                const bladeX = Math.cos(angle + 0.6) * (r * 1.15);
                const bladeY = Math.sin(angle + 0.6) * (r * 1.15);
                ctx.fillStyle = "#d97706";
                ctx.strokeStyle = "#fde68a";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.arc(bladeX, bladeY, 2.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    global.ChalcolithicOpticsRenderer = ChalcolithicOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
