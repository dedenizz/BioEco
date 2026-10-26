// BioEcosystem - Sub-Benthic Infaunal Sediment Stratigraphy & Bioturbation Optics
// Module: src/render/infauna_optics.js
// Version: 6.88.0 (Hour 408 - Looks & UI Agent: Turbidity Veils, Hypoxia Auras & 78th Channel Visuals)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * InfaunaOpticsRenderer
     * High-fidelity scientific microscope rendering of sub-benthic sediment environments:
     * - Multi-tier sediment stratigraphy (oxic fawn top, suboxic redox boundary, anoxic sulfidic base)
     * - Infaunal burrowing cavities, mucus-lined tunnel networks and mechanical displacement wakes
     * - Chemoautotrophic sulfide oxidation luminescence across oxic-anoxic transitions
     * - Anoxic hypoxia fermentation stress auras and emergency upward ventilation surge trails
     * - Porewater nutrient diffusion plumes (phosphate and ammonium ascending streams)
     * - Colloidal turbidity veils and resuspended silt clouds modulated by biogenic mucus cohesion
     */
    class InfaunaOpticsRenderer {
        /**
         * Render individual infaunal organism burrowing optics and mucus lining.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellInfauna(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const depth = org.subBenthicBurrowingDepth || 0.0;
            const flux = org.bioturbationFlux || 0.0;
            const mucus = org.mucusLiningIntegrity || 0.0;
            const sulfideYield = org.sulfideOxidationYield || 0.0;
            const isSub = org.isSubBenthic || false;
            const fermentation = org.anoxicFermentationBuffer !== undefined ? org.anoxicFermentationBuffer : 100.0;
            const isStressed = org.isHypoxicStressed || fermentation < 35.0;

            if (!isSub && depth <= 0.5 && flux <= 0.05 && !isStressed) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Excavation displacement wave and sediment compression halo
            if (flux > 0.08) {
                InfaunaOpticsRenderer.drawBioturbationDisplacementHalo(ctx, size, flux, tick);
            }

            // 2. Mucus-reinforced tunnel lining sheen
            if (mucus > 0.15 && depth > 2.0) {
                InfaunaOpticsRenderer.drawMucusTunnelSheen(ctx, size, mucus, tick);
            }

            // 3. Sulfide oxidation redox luminescence
            if (sulfideYield > 0.18 && depth > 8.0) {
                InfaunaOpticsRenderer.drawSulfideOxidationLuminescence(ctx, size, sulfideYield, depth, tick);
            }

            // 4. Anoxic hypoxia fermentation stress aura
            if (isStressed && depth > 6.0) {
                InfaunaOpticsRenderer.drawHypoxiaFermentationAura(ctx, size, fermentation, tick);
            }

            // 5. Emergency upward ventilation surge trail
            if (org.upwardVentilationSurge) {
                InfaunaOpticsRenderer.drawVentilationSurgeTrail(ctx, size, tick);
            }

            ctx.restore();
        }

        static drawBioturbationDisplacementHalo(ctx, size, flux, tick) {
            const pulse = Math.sin(tick * 0.09) * 0.15 + 1.0;
            const haloRadius = size * (1.35 + flux * 0.85) * pulse;

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(180, 83, 9, " + (0.08 + flux * 0.16).toFixed(3) + ")";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, haloRadius * 1.15, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(245, 158, 11, " + (0.12 + flux * 0.22).toFixed(3) + ")";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.restore();
        }

        static drawMucusTunnelSheen(ctx, size, mucus, tick) {
            const sheenAngle = (tick * 0.03) % (Math.PI * 2);
            const outerR = size * (1.2 + mucus * 0.4);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, outerR, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(6, 182, 212, " + (0.15 + mucus * 0.35).toFixed(3) + ")";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            for (let i = 0; i < 4; i++) {
                const angle = sheenAngle + (i * Math.PI / 2);
                const nx = Math.cos(angle) * outerR;
                const ny = Math.sin(angle) * outerR;
                ctx.beginPath();
                ctx.arc(nx, ny, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(52, 211, 153, " + (0.3 + mucus * 0.4).toFixed(3) + ")";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawSulfideOxidationLuminescence(ctx, size, sulfideYield, depth, tick) {
            const glowR = size * (1.1 + sulfideYield * 0.55);
            const intensity = Math.min(0.35, sulfideYield * 0.28);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, glowR, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(168, 85, 247, " + intensity.toFixed(3) + ")";
            ctx.fill();

            const sparkOffset = Math.sin(tick * 0.15 + depth) * 3.0;
            ctx.beginPath();
            ctx.arc(sparkOffset, -size * 0.8, 1.0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(192, 132, 252, 0.75)";
            ctx.fill();
            ctx.restore();
        }

        static drawHypoxiaFermentationAura(ctx, size, fermentation, tick) {
            const pulse = Math.sin(tick * 0.12) * 0.2 + 1.0;
            const rad = size * 1.35 * pulse;
            const alpha = Math.min(0.38, (1.0 - (fermentation / 100.0)) * 0.42);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, rad, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(239, 68, 68, " + alpha.toFixed(3) + ")";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, rad * 1.1, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(248, 113, 113, " + (alpha * 1.3).toFixed(3) + ")";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.restore();
        }

        static drawVentilationSurgeTrail(ctx, size, tick) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, size * 0.5);
            ctx.lineTo(0, size * 2.2);
            ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, size * 2.3, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(14, 165, 233, 0.75)";
            ctx.fill();
            ctx.restore();
        }

        /**
         * Render global sediment stratigraphy, porewater plumes and turbidity veils.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {number} width - Simulation canvas width.
         * @param {number} height - Simulation canvas height.
         * @param {Object} manager - InfaunalBioturbationManager instance.
         * @param {number} tick - Current frame tick.
         */
        static drawGlobalInfaunaEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || width <= 0 || height <= 0) return;

            const sedimentY = (manager && manager.sedimentSurfaceY) ? manager.sedimentSurfaceY : 480.0;
            if (sedimentY >= height) return;

            const opd = (manager && manager.metrics && manager.metrics.meanOxygenPenetration) ? manager.metrics.meanOxygenPenetration : 12.0;
            const opdY = Math.min(height, sedimentY + opd);
            const poreFlux = (manager && manager.metrics && manager.metrics.meanPorewaterNutrientFlux) ? manager.metrics.meanPorewaterNutrientFlux : 0.0;
            const turbidity = (manager && manager.metrics && manager.metrics.meanTurbidity) ? manager.metrics.meanTurbidity : 0.0;

            ctx.save();

            // 1. Oxic top sediment tier (fawn / sand tone)
            const oxicGrad = ctx.createLinearGradient(0, sedimentY, 0, opdY);
            oxicGrad.addColorStop(0, "rgba(120, 89, 58, 0.42)");
            oxicGrad.addColorStop(1, "rgba(180, 83, 9, 0.55)");
            ctx.fillStyle = oxicGrad;
            ctx.fillRect(0, sedimentY, width, Math.max(0, opdY - sedimentY));

            // 2. Dynamic Redox Boundary Line
            ctx.beginPath();
            ctx.moveTo(0, opdY);
            for (let x = 0; x <= width; x += 32) {
                const wave = Math.sin((x * 0.02) + (tick * 0.02)) * 2.2;
                ctx.lineTo(x, opdY + wave);
            }
            ctx.strokeStyle = "rgba(245, 158, 11, 0.45)";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // 3. Deep anoxic sulfidic stratum
            if (opdY < height) {
                const anoxicGrad = ctx.createLinearGradient(0, opdY, 0, height);
                anoxicGrad.addColorStop(0, "rgba(30, 41, 59, 0.65)");
                anoxicGrad.addColorStop(1, "rgba(15, 23, 42, 0.88)");
                ctx.fillStyle = anoxicGrad;
                ctx.fillRect(0, opdY, width, height - opdY);
            }

            // 4. Porewater mineral diffusion plumes
            if (poreFlux > 0.005) {
                InfaunaOpticsRenderer.drawPorewaterPlumes(ctx, width, sedimentY, poreFlux, tick);
            }

            // 5. Colloidal turbidity veil above sediment bed
            if (turbidity > 0.02) {
                InfaunaOpticsRenderer.drawTurbidityVeil(ctx, width, sedimentY, turbidity, tick);
            }

            ctx.restore();
        }

        static drawPorewaterPlumes(ctx, width, sedimentY, poreFlux, tick) {
            const plumeCount = 6;
            const step = width / plumeCount;

            ctx.save();
            for (let i = 0; i < plumeCount; i++) {
                const px = (i * step) + ((tick * 0.2 + i * 45) % step);
                const plumeHeight = 25.0 + Math.sin(tick * 0.04 + i) * 12.0;
                const py = sedimentY - plumeHeight;
                const alpha = Math.min(0.28, (poreFlux * 8.0) * (0.15 + (i % 3) * 0.05));

                ctx.beginPath();
                ctx.moveTo(px, sedimentY);
                ctx.quadraticCurveTo(px + Math.sin(tick * 0.05 + i) * 6.0, sedimentY - plumeHeight * 0.5, px, py);
                ctx.strokeStyle = "rgba(52, 211, 153, " + alpha.toFixed(3) + ")";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 191, 36, " + (alpha * 1.5).toFixed(3) + ")";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawTurbidityVeil(ctx, width, sedimentY, turbidity, tick) {
            const veilHeight = 35.0 + Math.sin(tick * 0.03) * 8.0;
            const topY = sedimentY - veilHeight;

            ctx.save();
            const turbGrad = ctx.createLinearGradient(0, topY, 0, sedimentY);
            turbGrad.addColorStop(0, "rgba(180, 83, 9, 0.0)");
            turbGrad.addColorStop(1, "rgba(146, 64, 14, " + (turbidity * 0.22).toFixed(3) + ")");
            ctx.fillStyle = turbGrad;
            ctx.fillRect(0, topY, width, veilHeight);
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = InfaunaOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.InfaunaOpticsRenderer = InfaunaOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
