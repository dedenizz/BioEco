// BioEcosystem - Coccolith Plate Armor, Porous Lattice Optics & Benthic Chalk Shaders
// Module: src/render/calcification_optics.js
// Version: 6.18.0 (Hour 338 - Looks Agent: Porous Lattice Textures, Fracture FX & Chalk Beds)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CalcificationOpticsRenderer
     * High-fidelity microscope visualization of biogenic calcification:
     * - Interlocking crystalline coccolith plates with iridescent calcite facets
     * - Micro-porous honeycomb calcite lattice patterns (porousCalciteLattice)
     * - Apex predator strike brittle fracture bursts (drawShellFractureFX)
     * - Cretaceous chalk sediment beds and benthic carbonate crystal sheens
     */
    class CalcificationOpticsRenderer {
        /**
         * Render coccolith plates, porous lattice, fracture FX, and deflection sparks on a cell.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Individual simulation organism.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellCalcification(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const plates = org.coccolithPlates || 0.0;
            if (plates < 0.05) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const plateCount = Math.min(10, Math.max(3, Math.floor(plates * 1.25)));
            const baseRot = org.angle || 0.0;
            const hardness = org.shellHardness || 0.0;
            const porousRatio = org.porousLatticeRatio || 0.55;
            const alpha = Math.min(0.92, 0.45 + hardness * 0.45);

            ctx.save();

            // 1. Interlocking Coccolith Armor Plates
            const radius = size * 1.22;
            for (let i = 0; i < plateCount; i++) {
                const angle = baseRot + (i * (Math.PI * 2 / plateCount));
                const px = org.x + Math.cos(angle) * radius;
                const py = org.y + Math.sin(angle) * radius;
                const plateR = 1.6 + (size * 0.16);

                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(angle);

                // Calcite elliptical plate rim
                ctx.beginPath();
                ctx.ellipse(0, 0, plateR * 1.35, plateR * 0.75, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(248, 250, 252, " + (alpha * 0.78) + ")";
                ctx.fill();
                ctx.lineWidth = 0.65;
                ctx.strokeStyle = "rgba(203, 213, 225, " + (alpha * 0.9) + ")";
                ctx.stroke();

                // Micro-porous honeycomb lattice perforations (porousCalciteLattice)
                if (porousRatio > 0.4) {
                    ctx.fillStyle = "rgba(148, 163, 184, " + (alpha * 0.55) + ")";
                    const poreDist = plateR * 0.65;
                    ctx.beginPath();
                    ctx.arc(-poreDist * 0.6, 0, 0.45, 0, Math.PI * 2);
                    ctx.arc(poreDist * 0.6, 0, 0.45, 0, Math.PI * 2);
                    ctx.arc(0, -plateR * 0.35, 0.45, 0, Math.PI * 2);
                    ctx.arc(0, plateR * 0.35, 0.45, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Central calcite prism crystal facet
                ctx.beginPath();
                ctx.arc(0, 0, plateR * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                ctx.fill();

                // Pearlescent iridescence highlight
                if (i % 2 === 0) {
                    ctx.beginPath();
                    ctx.arc(0, 0, plateR * 0.85, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(192, 132, 252, " + (0.12 + 0.08 * Math.sin(tick * 0.05 + i)) + ")";
                    ctx.fill();
                }

                ctx.restore();
            }

            // 2. Shell Hardness Perimeter Boundary Band
            if (hardness > 0.25) {
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * 1.28, 0, Math.PI * 2);
                ctx.lineWidth = 0.75;
                ctx.setLineDash([4, 4]);
                ctx.strokeStyle = "rgba(226, 232, 240, " + (0.35 + hardness * 0.35) + ")";
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // 3. Ventral Ballast Mass Crescent (lightened by porous lattice)
            if ((org.ballastMass || 0) > 0.08) {
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * 0.95, 0.2, Math.PI - 0.2);
                ctx.lineWidth = 1.1;
                ctx.strokeStyle = "rgba(148, 163, 184, " + Math.min(0.55, org.ballastMass * 0.7) + ")";
                ctx.stroke();
            }

            // 4. Kinetic Strike Deflection Fracture Sparks
            const deflectionCooldown = org.deflectionCooldown || 0;
            if (deflectionCooldown > 10) {
                const sparkIntensity = (deflectionCooldown - 10) / 15.0;
                const sparkR = size * (1.45 + (1.0 - sparkIntensity) * 0.35);

                ctx.lineWidth = 0.9;
                ctx.strokeStyle = "rgba(56, 189, 248, " + (sparkIntensity * 0.95) + ")";

                for (let s = 0; s < 5; s++) {
                    const sAngle = (s * (Math.PI * 2 / 5)) + (tick * 0.2);
                    const sx1 = org.x + Math.cos(sAngle) * (size * 1.1);
                    const sy1 = org.y + Math.sin(sAngle) * (size * 1.1);
                    const sx2 = org.x + Math.cos(sAngle) * sparkR;
                    const sy2 = org.y + Math.sin(sAngle) * sparkR;

                    ctx.beginPath();
                    ctx.moveTo(sx1, sy1);
                    ctx.lineTo(sx2, sy2);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(sx2, sy2, 1.1, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(248, 250, 252, " + sparkIntensity + ")";
                    ctx.fill();
                }
            }

            // 5. Brittle Shell Fracture Bursts & Fissure Cracks (drawShellFractureFX)
            const fractureTicks = org.fractureTicks || 0;
            const fractureCracks = org.fractureCracks || 0.0;
            if (fractureTicks > 0 || fractureCracks > 0.05) {
                CalcificationOpticsRenderer.drawShellFractureFX(ctx, org, size, fractureTicks, fractureCracks, tick);
            }

            ctx.restore();
        }

        /**
         * Render crystalline stress fractures and outward calcite debris burst.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Fractured simulation organism.
         * @param {number} size - Organism radius.
         * @param {number} fractureTicks - Remaining fracture animation frames.
         * @param {number} fractureCracks - Cumulative crack intensity.
         * @param {number} tick - Simulation frame count.
         */
        static drawShellFractureFX(ctx, org, size, fractureTicks, fractureCracks, tick) {
            const crackAlpha = Math.min(1.0, 0.4 + fractureCracks * 0.6);
            ctx.lineWidth = 1.1;
            ctx.strokeStyle = "rgba(255, 255, 255, " + crackAlpha + ")";

            // Jagged radial stress fissures across armor
            const crackLines = 4;
            for (let c = 0; c < crackLines; c++) {
                const cAngle = (c * (Math.PI * 2 / crackLines)) + (org.angle || 0.0) + 0.35;
                const innerR = size * 0.45;
                const outerR = size * (1.15 + fractureCracks * 0.25);
                const midR = (innerR + outerR) * 0.5;
                const jitter = (c % 2 === 0 ? 1.5 : -1.5);

                ctx.beginPath();
                ctx.moveTo(org.x + Math.cos(cAngle) * innerR, org.y + Math.sin(cAngle) * innerR);
                ctx.lineTo(org.x + Math.cos(cAngle + 0.15) * midR + jitter, org.y + Math.sin(cAngle + 0.15) * midR + jitter);
                ctx.lineTo(org.x + Math.cos(cAngle) * outerR, org.y + Math.sin(cAngle) * outerR);
                ctx.stroke();
            }

            // Active shockwave debris burst during initial fracture frames
            if (fractureTicks > 10) {
                const burstIntensity = (fractureTicks - 10) / 22.0;
                const burstRadius = size * (1.3 + (1.0 - burstIntensity) * 0.85);

                for (let d = 0; d < 6; d++) {
                    const dAngle = (d * (Math.PI * 2 / 6)) + (tick * 0.15);
                    const dx = org.x + Math.cos(dAngle) * burstRadius;
                    const dy = org.y + Math.sin(dAngle) * burstRadius;

                    ctx.beginPath();
                    ctx.arc(dx, dy, 1.2 + burstIntensity * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(224, 242, 254, " + (burstIntensity * 0.9) + ")";
                    ctx.fill();
                }
            }
        }

        /**
         * Render benthic chalk sediment beds, calcite shelves, and carbonate dissolution plumes.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {number} width - Viewport width.
         * @param {number} height - Viewport height.
         * @param {Object} calcificationPlateManager - Active calcification manager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawBenthicChalkBeds(ctx, width, height, calcificationPlateManager, tick) {
            if (!ctx) return;

            const pool = (calcificationPlateManager && typeof calcificationPlateManager.chalkDepositionPool === "number")
                ? calcificationPlateManager.chalkDepositionPool
                : 35.0;

            const chalkBaseY = 575.0;
            const poolRatio = Math.min(1.0, pool / 180.0);
            const time = tick * 0.009;

            ctx.save();

            // 1. Layered Cretaceous Chalk Bed Silhouette
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(0, chalkBaseY);

            for (let x = 0; x <= width; x += 30) {
                const wave = Math.sin(time + x * 0.016) * 3.5 + Math.cos(time * 0.7 + x * 0.024) * 2.0;
                ctx.lineTo(x, chalkBaseY + wave);
            }

            ctx.lineTo(width, height);
            ctx.closePath();

            const chalkGrad = ctx.createLinearGradient(0, chalkBaseY, 0, height);
            const alpha = 0.05 + poolRatio * 0.09;
            chalkGrad.addColorStop(0.0, "rgba(248, 250, 252, " + (alpha * 1.5) + ")");
            chalkGrad.addColorStop(0.4, "rgba(226, 232, 240, " + (alpha * 1.2) + ")");
            chalkGrad.addColorStop(1.0, "rgba(148, 163, 184, " + (alpha * 1.8) + ")");

            ctx.fillStyle = chalkGrad;
            ctx.fill();

            // 2. Micro-Crystalline Chalk Pavement Crest
            ctx.beginPath();
            for (let x = 0; x <= width; x += 20) {
                const wave = Math.sin(time + x * 0.016) * 3.5 + Math.cos(time * 0.7 + x * 0.024) * 2.0;
                if (x === 0) ctx.moveTo(x, chalkBaseY + wave);
                else ctx.lineTo(x, chalkBaseY + wave);
            }
            ctx.lineWidth = 0.85;
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "rgba(248, 250, 252, " + (0.25 + poolRatio * 0.35) + ")";
            ctx.stroke();
            ctx.setLineDash([]);

            // 3. Chalk Crystal Sheen Sparkles along Reef Shelf
            const sparkleCount = 5;
            for (let s = 0; s < sparkleCount; s++) {
                const sx = ((s * 135) + ((tick * 0.35 + s * 53) % width));
                const sWave = Math.sin(time + sx * 0.016) * 3.5;
                const sy = chalkBaseY + sWave + 2.0;
                const sparkPulse = 0.5 + 0.5 * Math.sin(tick * 0.08 + s * 2.1);

                if (sparkPulse > 0.45) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.2 + sparkPulse * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, " + (sparkPulse * 0.85) + ")";
                    ctx.fill();
                }
            }

            // 4. Carbonate Dissolution Micro-Plumes (Ascending Mineral Ions)
            if (pool > 40.0) {
                const plumeCount = 4;
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = "rgba(241, 245, 249, 0.35)";

                for (let p = 0; p < plumeCount; p++) {
                    const px = (p * 165) + 40 + Math.sin(time + p) * 12.0;
                    const pOffset = (tick * 0.45 + p * 67) % 65;
                    const py = chalkBaseY - pOffset;

                    ctx.beginPath();
                    ctx.arc(px, py, 1.1 + (p % 2) * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(248, 250, 252, 0.45)";
                    ctx.fill();
                    ctx.stroke();
                }
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CalcificationOpticsRenderer;
    } else {
        global.CalcificationOpticsRenderer = CalcificationOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
