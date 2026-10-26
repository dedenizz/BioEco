// BioEcosystem - Marine Snow Aggregates, Biogeochemical Luminescence & Sediment Shaders
// Module: src/render/marine_snow_optics.js
// Version: 6.08.0 (Hour 328 - Looks Agent: Remineralization Bubbles & Nitrification Auras)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MarineSnowOpticsRenderer
     * High-fidelity microscope visualization of settling marine snow and biogeochemical cycles:
     * - Renders flocculent organo-mineral aggregates with chlorophyll remnants and fibrils
     * - Visualizes deep-layer microbial bioluminescent colonization on descending flocs
     * - Simulates benthic carbon sediment sinks with remineralization effervescence
     * - Draws cellular filter-feeding vortices and diazotrophic nitrogen fixation auras
     */
    class MarineSnowOpticsRenderer {
        /**
         * Render descending marine snow aggregates and microbial colonization sparkles.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} biogeochemicalSys - Active biogeochemical cycles system.
         * @param {number} tick - Simulation frame count.
         */
        static drawMarineSnowField(ctx, biogeochemicalSys, tick) {
            if (!ctx || !biogeochemicalSys || !Array.isArray(biogeochemicalSys.marineSnow)) return;

            const snowList = biogeochemicalSys.marineSnow;
            if (snowList.length === 0) return;

            ctx.save();
            const time = tick * 0.03;

            for (let i = 0; i < snowList.length; i++) {
                const p = snowList[i];
                if (!p) continue;

                const baseR = p.size || 2.0;
                const alpha = Math.max(0.25, Math.min(0.85, 0.45 + (p.mass / 4.0)));

                // 1. Organic flocculent central core
                ctx.beginPath();
                ctx.arc(p.x, p.y, baseR, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(226, 232, 240, " + (alpha * 0.75) + ")";
                ctx.fill();

                // 2. Microscopic fibril whiskers and organo-mineral appendages
                const whiskerCount = 3;
                const rot = p.driftPhase || 0.0;
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = "rgba(203, 213, 225, " + (alpha * 0.6) + ")";

                ctx.beginPath();
                for (let w = 0; w < whiskerCount; w++) {
                    const angle = rot + (w * (Math.PI * 2 / whiskerCount));
                    const wx = p.x + Math.cos(angle) * (baseR * 1.6);
                    const wy = p.y + Math.sin(angle) * (baseR * 1.6);
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(wx, wy);
                }
                ctx.stroke();

                // 3. Chlorophyll remnant specks (photic zone flocs)
                if (p.y < 320.0) {
                    ctx.beginPath();
                    ctx.arc(p.x + Math.cos(rot) * (baseR * 0.6), p.y + Math.sin(rot) * (baseR * 0.6), 0.75, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(167, 243, 208, " + (alpha * 0.85) + ")";
                    ctx.fill();
                }

                // 4. Deep-water microbial bioluminescence sparkles (mesopelagic / benthic depths)
                if (p.y > 280.0) {
                    const sparkPulse = 0.5 + 0.5 * Math.sin(time * 2.0 + i);
                    if (sparkPulse > 0.4) {
                        ctx.beginPath();
                        ctx.arc(p.x - Math.sin(rot) * (baseR * 0.7), p.y + Math.cos(rot) * (baseR * 0.7), 0.85, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(56, 189, 248, " + (sparkPulse * 0.9) + ")";
                        ctx.fill();
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render benthic carbon sediment bed, remineralization bubbles, and nitrification shimmer.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {number} width - Simulation viewport width.
         * @param {number} height - Simulation viewport height.
         * @param {Object} biogeochemicalSys - Active biogeochemical cycles system.
         * @param {number} tick - Simulation frame count.
         */
        static drawBenthicSedimentBed(ctx, width, height, biogeochemicalSys, tick) {
            if (!ctx) return;

            const sedimentStock = (biogeochemicalSys && typeof biogeochemicalSys.benthicSedimentCarbon === "number")
                ? biogeochemicalSys.benthicSedimentCarbon
                : 85.0;

            const bedY = 560.0;
            const time = tick * 0.012;
            const stockRatio = Math.min(1.0, sedimentStock / 200.0);
            const mantleAlpha = 0.03 + stockRatio * 0.05;

            ctx.save();

            // Undulating sediment bed silhouette
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(0, bedY);

            for (let x = 0; x <= width; x += 35) {
                const wave = Math.sin(time + x * 0.014) * 4.0 + Math.cos(time * 0.6 + x * 0.02) * 2.5;
                ctx.lineTo(x, bedY + wave);
            }

            ctx.lineTo(width, height);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, bedY, 0, height);
            grad.addColorStop(0.0, "rgba(203, 213, 225, " + mantleAlpha + ")");
            grad.addColorStop(0.5, "rgba(148, 163, 184, " + (mantleAlpha * 1.4) + ")");
            grad.addColorStop(1.0, "rgba(30, 41, 59, " + (mantleAlpha * 2.0) + ")");

            ctx.fillStyle = grad;
            ctx.fill();

            // Sediment boundary crest highlights
            ctx.beginPath();
            for (let x = 0; x <= width; x += 25) {
                const wave = Math.sin(time + x * 0.014) * 4.0 + Math.cos(time * 0.6 + x * 0.02) * 2.5;
                if (x === 0) ctx.moveTo(x, bedY + wave);
                else ctx.lineTo(x, bedY + wave);
            }
            ctx.lineWidth = 0.75;
            ctx.setLineDash([4, 6]);
            ctx.strokeStyle = "rgba(226, 232, 240, " + (0.12 + stockRatio * 0.18) + ")";
            ctx.stroke();
            ctx.setLineDash([]);

            // Benthic microbial nitrification aura & remineralization micro-bubbles (Hour 328 Looks Agent)
            const reminFlux = (biogeochemicalSys && biogeochemicalSys.metrics && typeof biogeochemicalSys.metrics.benthicRemineralizationFlux === "number")
                ? biogeochemicalSys.metrics.benthicRemineralizationFlux
                : 0.06;

            if (reminFlux > 0.02) {
                const bubbleCount = 6;
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = "rgba(192, 132, 252, 0.45)";

                for (let b = 0; b < bubbleCount; b++) {
                    const bx = ((b * 110) + ((tick * 0.4 + b * 47) % width));
                    const bOffset = ((tick * 0.6 + b * 83) % 75);
                    const by = bedY - bOffset;
                    const bRad = 1.0 + (b % 3) * 0.6;

                    ctx.beginPath();
                    ctx.arc(bx, by, bRad, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(238, 242, 255, 0.55)";
                    ctx.fill();
                    ctx.stroke();
                }

                // Amethyst microbial nitrification crest sheen
                ctx.beginPath();
                for (let x = 0; x <= width; x += 30) {
                    const wave = Math.sin(time * 1.5 + x * 0.02) * 2.5;
                    if (x === 0) ctx.moveTo(x, bedY + wave + 2.0);
                    else ctx.lineTo(x, bedY + wave + 2.0);
                }
                ctx.strokeStyle = "rgba(192, 132, 252, 0.22)";
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render cellular biogeochemical responses: filter-feeding & nitrogen fixation.
         * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context.
         * @param {Object} org - Individual simulation cell.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellBiogeochemistry(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            // 1. Benthic Filter-Feeding Intake Vortex Arcs
            if ((org.marineSnowConsumption || 0) > 0) {
                const pulse = 0.5 + 0.5 * Math.sin(tick * 0.15 + (org.numericId || 0));
                const feedR = size * (1.25 + pulse * 0.18);
                const angle = org.angle || 0.0;

                ctx.lineWidth = 0.8;
                ctx.strokeStyle = "rgba(16, 185, 129, " + (0.35 + pulse * 0.25) + ")";

                // Lateral feeding cilia vortex arcs
                ctx.beginPath();
                ctx.arc(org.x, org.y, feedR, angle - 0.7, angle + 0.7);
                ctx.stroke();

                // Settling floc capture sparkle
                if (pulse > 0.65) {
                    ctx.beginPath();
                    ctx.arc(org.x + Math.cos(angle) * (feedR + 2.0), org.y + Math.sin(angle) * (feedR + 2.0), 0.9, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(236, 253, 245, 0.9)";
                    ctx.fill();
                }
            }

            // 2. Diazotrophic Nitrogen Fixation Amethyst Covalent Halo
            if ((org.nitrogenFixationFlux || 0) > 0.001) {
                const nPulse = 0.5 + 0.5 * Math.sin(tick * 0.12 + (org.numericId || 0));
                const fixR = size * (1.35 + nPulse * 0.2);

                ctx.beginPath();
                ctx.arc(org.x, org.y, fixR, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(192, 132, 252, " + (0.06 + nPulse * 0.08) + ")";
                ctx.fill();

                ctx.lineWidth = 0.7;
                ctx.setLineDash([3, 4]);
                ctx.strokeStyle = "rgba(192, 132, 252, " + (0.35 + nPulse * 0.25) + ")";
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // 3. Nitrate Assimilation Corona
            if ((org.nitrateAssimilationRate || 0) > 0.05) {
                const aPulse = 0.5 + 0.5 * Math.sin(tick * 0.2 + (org.x * 0.05));
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * (1.1 + aPulse * 0.15), 0, Math.PI * 2);
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = "rgba(56, 189, 248, " + (0.2 + aPulse * 0.2) + ")";
                ctx.stroke();
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MarineSnowOpticsRenderer;
    } else {
        global.MarineSnowOpticsRenderer = MarineSnowOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
