// BioEcosystem - Interplanetary Biome Seeding, Exoplanet Terraforming & Pan-Galactic Network Optics
// Module: src/render/terraforming_optics.js
// Version: 16.9.0 (Hour 789 - Looks & UI Agent: Terraforming Atmosphere Rings, Cryogenic Seed-Ship Trails & Pan-Galactic Nodes)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerraformingOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Exoplanet Terraforming & Pan-Galactic Biome Network:
     * 1. Terraforming Atmosphere Seeding Rings (#10b981 / #a7f3d0):
     *    - Emerald-green oxygenic & extremophile atmospheric seeding arcs when org.isSeedingAtmosphere.
     * 2. Cryogenic Seed-Ship Transit Nodes (#6ee7b7):
     *    - Mint-emerald interstellar seed-ship vectors when org.isTransportingBiomes.
     * 3. Pan-Galactic Ecosystem Network Rings (#8b5cf6 / #ddd6fe):
     *    - Galactic violet synchronization halo when org.isSyncingGalacticNet.
     */
    class TerraformingOpticsRenderer {
        /**
         * Draw exoplanet terraforming rings, cryogenic seed-ship vectors, and pan-galactic network visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawTerraforming(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasTerraformingNetwork) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Terraforming Atmosphere Seeding Rings (#10b981 / #a7f3d0)
            if (org.hasAtmosphericSeeding && org.isSeedingAtmosphere) {
                ctx.save();
                const eR = r * 1.60;
                const phase = t * 0.085;
                ctx.strokeStyle = "rgba(16, 185, 129, 0.80)";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.arc(0, 0, eR, phase, phase + Math.PI * 0.85);
                ctx.stroke();

                ctx.strokeStyle = "rgba(167, 243, 208, 0.85)";
                ctx.beginPath();
                ctx.arc(0, 0, eR, phase + Math.PI, phase + Math.PI * 1.85);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Cryogenic Seed-Ship Transit Nodes (#6ee7b7)
            if (org.hasCryogenicSeedShips && org.isTransportingBiomes) {
                ctx.save();
                const cR = r * 1.24;
                ctx.fillStyle = "rgba(110, 231, 183, 0.88)";
                for (let k = 0; k < 3; k++) {
                    const ang = t * 0.10 + (k * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(Math.cos(ang) * cR, Math.sin(ang) * cR, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Pan-Galactic Ecosystem Network Sync Halo (#8b5cf6 / #ddd6fe)
            if (org.hasPanGalacticNetwork && org.isSyncingGalacticNet) {
                ctx.save();
                const pR = r * 1.80;
                ctx.strokeStyle = "rgba(139, 92, 246, 0.78)";
                ctx.lineWidth = 1.1;
                ctx.setLineDash([3.0, 2.5]);
                ctx.beginPath();
                ctx.arc(0, 0, pR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(221, 214, 254, 0.90)";
                const sAng = -t * 0.08;
                ctx.beginPath();
                ctx.arc(Math.cos(sAng) * pR, Math.sin(sAng) * pR, 1.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.TerraformingOpticsRenderer = TerraformingOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
