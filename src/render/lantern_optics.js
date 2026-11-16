// BioEcosystem - Aristotle's Lantern Mastication, Calcite Chisel Teeth & Bioerosion Optics
// Module: src/render/lantern_optics.js
// Version: 7.38.0 (Hour 458 - Looks & UI Agent: Bioerosion Excavation Pits, Calcite Silt Clouds & Urchin Barren Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * LanternOpticsRenderer
     * High-fidelity scientific microscope optics for echinoid Aristotle's Lantern mastication apparatus:
     * - 5-Part Calcite Pyramidal Jaws: Pentaradial convergent pyramids with peristomial collar and interpyramidal ligaments
     * - Radial Opening/Closing Chisel Teeth: Keeled self-sharpening teeth with hardness gradients and dynamic rasping aperture
     * - Substrate Grazing & Rock Bioerosion: Micro-abrasion scratch lines, mineral chipping plumes, and algal chlorophyll scatter
     * - Dental Wear, Blunting & Plumula Shimmer: Blunted tip shading versus copper-amber axial plumula regeneration glow
     * - Urchin Barren Benthic Pavement: Pinkish crustose coralline algae (CCA) bed and excavated substrate pits under overgrazing
     * - Calcite Silt Suspension Clouds: Micro-fine carbonate sediment drifting through water column under darkfield lighting
     * - Active Grazing & Bioerosion Scrape Bursts: Dual emerald (#10b981) and copper orange (#d97706) shockwaves during feeding
     */
    class LanternOpticsRenderer {
        /**
         * Render individual Aristotle's Lantern masticatory anatomy, jaws, teeth, and grazing action.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawAristotleLantern(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.hasAristotleLantern && (!org.calcitePyramidJawsCount || org.calcitePyramidJawsCount <= 0)) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const jaws = org.calcitePyramidJawsCount || 5;
            const teethCount = org.calciteTeethCount || 5;
            const toothLen = Math.max(3.5, Math.min(14.0, org.lanternTeethLength || 6.0));
            const sharpness = org.lanternTeethSharpness || 0.72;
            const extDist = org.lanternExtensionDistance || 0.0;
            const openingAngle = org.jawOpeningAngle || 0.25;
            const wear = org.toothWearLevel || 0.0;
            const bioerosion = org.bioerosionRate || 0.08;
            const gli = org.grazingLanternIndex || 0.0;
            const ber = org.bioerosionRateIndex || 0.0;
            const reserve = org.toothSacCalciteReserve || 0.0;
            const blunting = org.severeToothBluntingPenalty || 0.0;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Peristomial Collar & Buccal Papillae
            LanternOpticsRenderer.drawPeristomialCollar(ctx, size, extDist, tick);

            // 2. 5 Convergent Calcite Pyramidal Jaws
            LanternOpticsRenderer.drawPyramidalJaws(ctx, size, jaws, openingAngle, extDist, tick);

            // 3. Self-Sharpening Keeled Chisel Teeth with Plumula Shimmer & Blunting
            LanternOpticsRenderer.drawChiselTeeth(ctx, size, teethCount, toothLen, sharpness, openingAngle, wear, extDist, reserve, blunting, tick);

            // 4. Substrate Rasping, Bioerosion Scars & Chlorophyll Debris
            if (extDist > 0.40) {
                LanternOpticsRenderer.drawGrazingRaspAndScrape(ctx, size, extDist, openingAngle, bioerosion, sharpness, blunting, tick);
            }

            // 5. Dual Grazing & Bioerosion Field Radiance
            if (gli > 0.20 || ber > 0.20) {
                LanternOpticsRenderer.drawDualLanternAura(ctx, size, gli, ber, tick);
            }

            ctx.restore();
        }

        /**
         * Render flexible circular peristomial collar and surrounding sensory buccal papillae.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Organism radius.
         * @param {number} extDist - Extrusion distance in pixels.
         * @param {number} tick - Simulation frame count.
         */
        static drawPeristomialCollar(ctx, size, extDist, tick) {
            const collarRadius = size * 0.46;
            const pulse = Math.sin(tick * 0.08) * 0.04;

            ctx.save();

            // Oral peristome membrane
            ctx.beginPath();
            ctx.arc(0, 0, collarRadius * (1.0 + pulse), 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
            ctx.fill();
            ctx.strokeStyle = "rgba(71, 85, 105, 0.55)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 10 Radial buccal sensory papillae (5 pairs alternating between pyramids)
            for (let i = 0; i < 10; i++) {
                const angle = (i * Math.PI * 2) / 10.0 + (pulse * 0.2);
                const px = Math.cos(angle) * (collarRadius + 1.2);
                const py = Math.sin(angle) * (collarRadius + 1.2);

                ctx.beginPath();
                ctx.arc(px, py, 0.9, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render 5 convergent calcite pyramidal jaw arches forming the pentaradial lantern cage.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Organism radius.
         * @param {number} jaws - Number of pyramidal jaws (nominally 5).
         * @param {number} openingAngle - Jaw aperture angle in radians.
         * @param {number} extDist - Extrusion distance in pixels.
         * @param {number} tick - Simulation frame count.
         */
        static drawPyramidalJaws(ctx, size, jaws, openingAngle, extDist, tick) {
            const jawCount = Math.max(3, Math.min(6, jaws));
            const baseRad = size * 0.40;
            const apexRad = Math.max(1.5, baseRad * 0.35 + openingAngle * 3.2);

            ctx.save();

            for (let j = 0; j < jawCount; j++) {
                const centralAngle = (j * Math.PI * 2) / jawCount;
                const halfSpread = (Math.PI / jawCount) * 0.78;

                const leftAngle = centralAngle - halfSpread;
                const rightAngle = centralAngle + halfSpread;

                // Base points on peristome rim
                const bx1 = Math.cos(leftAngle) * baseRad;
                const by1 = Math.sin(leftAngle) * baseRad;
                const bx2 = Math.cos(rightAngle) * baseRad;
                const by2 = Math.sin(rightAngle) * baseRad;

                // Convergent apex projecting toward mouth center
                const apexX = Math.cos(centralAngle) * (apexRad + extDist * 0.6);
                const apexY = Math.sin(centralAngle) * (apexRad + extDist * 0.6);

                // Calcite pyramid facet
                ctx.beginPath();
                ctx.moveTo(bx1, by1);
                ctx.lineTo(bx2, by2);
                ctx.lineTo(apexX, apexY);
                ctx.closePath();

                // High-magnesium calcite stereom styling
                const facetShade = (j % 2 === 0) ? "rgba(226, 232, 240, 0.78)" : "rgba(203, 213, 225, 0.68)";
                ctx.fillStyle = facetShade;
                ctx.fill();
                ctx.strokeStyle = "rgba(100, 116, 139, 0.85)";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // Interpyramidal commisural ligament lines
                ctx.beginPath();
                ctx.moveTo((bx1 + bx2) * 0.5, (by1 + by2) * 0.5);
                ctx.lineTo(apexX, apexY);
                ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render 5 self-sharpening keeled chisel teeth with axial plumula shimmer and wear/blunting.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Organism radius.
         * @param {number} teethCount - Number of teeth (nominally 5).
         * @param {number} toothLen - Length of tooth in pixels.
         * @param {number} sharpness - Sharpness ratio [0.35 - 0.98].
         * @param {number} openingAngle - Jaw aperture angle in radians.
         * @param {number} wear - Tip wear ratio [0.0 - 1.0].
         * @param {number} extDist - Extrusion distance in pixels.
         * @param {number} reserve - Tooth sac calcite reserve [0.0 - 100.0].
         * @param {number} blunting - Severe tooth blunting penalty [0.0 - 0.70].
         * @param {number} tick - Simulation frame count.
         */
        static drawChiselTeeth(ctx, size, teethCount, toothLen, sharpness, openingAngle, wear, extDist, reserve, blunting, tick) {
            const count = Math.max(3, Math.min(6, teethCount));
            const rootRadius = size * 0.48;
            const tipRadius = Math.max(0.6, (openingAngle * 2.8) - (sharpness * 1.2));

            ctx.save();

            for (let t = 0; t < count; t++) {
                const angle = (t * Math.PI * 2) / count;

                // Tooth root in aboral plumula tooth sac
                const rx = Math.cos(angle) * rootRadius;
                const ry = Math.sin(angle) * rootRadius;

                // Tooth cutting tip converging toward center
                const tx = Math.cos(angle) * (tipRadius - extDist * 0.4);
                const ty = Math.sin(angle) * (tipRadius - extDist * 0.4);

                // Perpendicular keel offset for triangular chisel cross-section
                const perpAngle = angle + Math.PI * 0.5;
                const halfWidth = Math.max(0.7, 1.4 * (1.0 - wear * 0.35));
                const kx1 = rx + Math.cos(perpAngle) * halfWidth;
                const ky1 = ry + Math.sin(perpAngle) * halfWidth;
                const kx2 = rx - Math.cos(perpAngle) * halfWidth;
                const ky2 = ry - Math.sin(perpAngle) * halfWidth;

                // Chisel tooth keeled polygon
                ctx.beginPath();
                ctx.moveTo(kx1, ky1);
                ctx.lineTo(kx2, ky2);

                if (blunting > 0.15) {
                    // Blunted, rounded tip with dark micro-fracture facets
                    const roundedTipRad = 0.8 + blunting * 0.8;
                    const rtx = tx + Math.cos(perpAngle) * roundedTipRad * 0.5;
                    const rty = ty + Math.sin(perpAngle) * roundedTipRad * 0.5;
                    const ltx = tx - Math.cos(perpAngle) * roundedTipRad * 0.5;
                    const lty = ty - Math.sin(perpAngle) * roundedTipRad * 0.5;
                    ctx.lineTo(ltx, lty);
                    ctx.lineTo(rtx, rty);
                } else {
                    // Sharp wedge cutting tip
                    ctx.lineTo(tx, ty);
                }
                ctx.closePath();

                // Tooth coloration: pristine magnesium-calcite enamel vs blunted/wear shading
                if (blunting > 0.20) {
                    ctx.fillStyle = "rgba(148, 163, 184, 0.85)"; // Chalky abraded gray
                } else if (wear > 0.40) {
                    ctx.fillStyle = "rgba(203, 213, 225, 0.88)"; // Moderate wear
                } else {
                    ctx.fillStyle = "rgba(248, 250, 252, 0.96)"; // Pristine pearl enameloid
                }
                ctx.fill();

                ctx.strokeStyle = "rgba(71, 85, 105, 0.90)";
                ctx.lineWidth = 0.7;
                ctx.stroke();

                // Central high-hardness crystalline enameloid ridge line
                ctx.beginPath();
                ctx.moveTo((kx1 + kx2) * 0.5, (ky1 + ky2) * 0.5);
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = (blunting > 0.20) ? "rgba(100, 116, 139, 0.6)" : "rgba(14, 165, 233, 0.75)";
                ctx.lineWidth = (blunting > 0.20) ? 0.4 : 0.8;
                ctx.stroke();

                // Aboral tooth sac (plumula) axial mineral shimmer
                if (reserve > 30.0) {
                    const shimmerAlpha = Math.min(0.85, (reserve / 100.0) * 0.75 + Math.sin(tick * 0.12 + t) * 0.15);
                    ctx.beginPath();
                    ctx.arc(rx, ry, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(217, 119, 6, " + shimmerAlpha.toFixed(2) + ")"; // Copper orange plumula reserve glow
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render substrate rasping scars, bioerosion excavation pits, and algal chlorophyll scatter.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Organism radius.
         * @param {number} extDist - Extrusion distance in pixels.
         * @param {number} openingAngle - Jaw aperture angle in radians.
         * @param {number} bioerosion - Rock bioerosion factor.
         * @param {number} sharpness - Teeth sharpness ratio.
         * @param {number} blunting - Severe tooth blunting penalty.
         * @param {number} tick - Simulation frame count.
         */
        static drawGrazingRaspAndScrape(ctx, size, extDist, openingAngle, bioerosion, sharpness, blunting, tick) {
            ctx.save();

            // 1. Excavation Scrape Marks on Substrate
            const scrapeCount = 5;
            for (let s = 0; s < scrapeCount; s++) {
                const sAngle = (s * Math.PI * 2) / scrapeCount + Math.sin(tick * 0.10) * 0.15;
                const scrapeLen = 2.0 + extDist * 1.4;
                const sx1 = Math.cos(sAngle) * (size * 0.25);
                const sy1 = Math.sin(sAngle) * (size * 0.25);
                const sx2 = Math.cos(sAngle) * (size * 0.25 + scrapeLen);
                const sy2 = Math.sin(sAngle) * (size * 0.25 + scrapeLen);

                // Excavated rock gouge (shadow groove + lit rim)
                ctx.beginPath();
                ctx.moveTo(sx1, sy1);
                ctx.lineTo(sx2, sy2);
                ctx.strokeStyle = "rgba(30, 41, 59, 0.65)";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(sx1 + 0.4, sy1 + 0.4);
                ctx.lineTo(sx2 + 0.4, sy2 + 0.4);
                ctx.strokeStyle = "rgba(226, 232, 240, 0.55)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            // 2. Dislodged Carbonate Silt & Mineral Debris
            const dustCount = Math.min(10, Math.round(bioerosion * 35.0));
            for (let d = 0; d < dustCount; d++) {
                const dAngle = Math.random() * Math.PI * 2;
                const dDist = (size * 0.35) + Math.random() * (extDist * 2.2);
                const dx = Math.cos(dAngle) * dDist;
                const dy = Math.sin(dAngle) * dDist;

                ctx.beginPath();
                ctx.arc(dx, dy, 0.7 + Math.random() * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(217, 119, 6, " + (0.35 + Math.random() * 0.45).toFixed(2) + ")"; // Copper mineral chip
                ctx.fill();
            }

            // 3. Harvested Chlorophyll Algal Particles (suppressed if severely blunted)
            if (blunting < 0.50) {
                for (let c = 0; c < 3; c++) {
                    const cAngle = Math.random() * Math.PI * 2;
                    const cDist = (size * 0.22) + Math.random() * 3.0;
                    ctx.beginPath();
                    ctx.arc(Math.cos(cAngle) * cDist, Math.sin(cAngle) * cDist, 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(16, 185, 129, 0.75)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render dual grazing aura: emerald (#10b981) for algal grazing and copper orange (#d97706) for bioerosion.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Organism radius.
         * @param {number} gli - Grazing Lantern Index ratio.
         * @param {number} ber - Bioerosion Rate Index ratio.
         * @param {number} tick - Simulation frame count.
         */
        static drawDualLanternAura(ctx, size, gli, ber, tick) {
            ctx.save();

            const pulse = Math.sin(tick * 0.10) * 0.08;
            const auraRad = size * (0.65 + pulse);

            // Emerald algal grazing radiance
            if (gli > 0.15) {
                ctx.beginPath();
                ctx.arc(0, 0, auraRad, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(16, 185, 129, " + (gli * 0.30).toFixed(2) + ")";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            // Copper orange bioerosion & mineral renewal radiance
            if (ber > 0.15) {
                ctx.beginPath();
                ctx.arc(0, 0, auraRad * 1.15, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(217, 119, 6, " + (ber * 0.28).toFixed(2) + ")";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render global benthic bioerosion stratum, suspended calcite silt clouds, and Urchin Barren substrate pavement.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} width - Canvas width.
         * @param {number} height - Canvas height.
         * @param {Object} manager - Global EchinodermLanternManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawGlobalLanternEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.metrics;
            if (!metrics || metrics.totalLanternOrganisms <= 0) return;

            const sedimentTop = height - 90;
            const isBarren = metrics.urchinBarrenState || false;
            const silt = metrics.calciteSiltSuspension || 0.0;
            const weakening = metrics.reefMatrixWeakeningRatio || 0.0;

            ctx.save();

            // 1. Urchin Barren Benthic Substrate Shift
            if (isBarren) {
                // Pinkish-white Crustose Coralline Algae (CCA) pavement layer with bare eroded rock
                const ccaGradient = ctx.createLinearGradient(0, sedimentTop, 0, height);
                ccaGradient.addColorStop(0, "rgba(244, 114, 182, 0.10)"); // Bleached pink coralline crust
                ccaGradient.addColorStop(1, "rgba(203, 213, 225, 0.22)"); // Chalky calcified limestone
                ctx.fillStyle = ccaGradient;
                ctx.fillRect(0, sedimentTop, width, 90);

                // Pockmarked bioerosion excavation pits along benthic horizon
                for (let p = 0; p < 16; p++) {
                    const pitX = (p * 41.7 + tick * 0.05) % width;
                    const pitY = sedimentTop + 15 + ((p * 19.3) % 65);
                    ctx.beginPath();
                    ctx.ellipse(pitX, pitY, 3.5 + (p % 3), 1.6, 0.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(30, 41, 59, 0.35)";
                    ctx.fill();
                    ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }

                // Substrate structural weakening fracture veins
                if (weakening > 0.25) {
                    ctx.strokeStyle = "rgba(239, 68, 68, " + Math.min(0.40, weakening * 0.45).toFixed(2) + ")";
                    ctx.lineWidth = 0.8;
                    for (let f = 0; f < 4; f++) {
                        const fx = (f * 150 + 20) % width;
                        ctx.beginPath();
                        ctx.moveTo(fx, sedimentTop + 20);
                        ctx.lineTo(fx + 25, sedimentTop + 50);
                        ctx.lineTo(fx + 15, sedimentTop + 80);
                        ctx.stroke();
                    }
                }
            } else {
                // Normal Lush Kelp & Coralline Algal Turf Layer
                if (metrics.algalScrapingEvents > 0) {
                    const hazeAlpha = Math.min(0.08, metrics.activeGrazingOrganisms * 0.02);
                    ctx.fillStyle = "rgba(16, 185, 129, " + hazeAlpha.toFixed(3) + ")";
                    ctx.fillRect(0, sedimentTop, width, 85);
                }
            }

            // 2. Suspended Calcite Silt Cloud Dispersion
            const dustCount = Math.min(45, Math.round(15 + silt * 0.6));
            for (let i = 0; i < dustCount; i++) {
                const seed = i * 37.19;
                const drift = Math.sin(tick * 0.025 + i) * 16.0;
                const dx = (seed * 23.7 + drift) % width;
                const dy = sedimentTop + ((seed * 13.9) % 85);

                ctx.beginPath();
                ctx.arc(dx, dy, 0.7 + (i % 3) * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = (i % 4 === 0) ?
                    "rgba(217, 119, 6, 0.25)" : // Copper mineral dust
                    "rgba(226, 232, 240, 0.18)"; // Calcite silt dust
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render transient radial bite flashes and mineral fracture glints in overlay pass.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation frame count.
         */
        static drawLanternScrapeBursts(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            ctx.save();

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.hasAristotleLantern) continue;

                const ext = org.lanternExtensionDistance || 0.0;
                if (ext > 1.2) {
                    const bitePhase = (tick * 0.18 + i * 1.7) % (Math.PI * 2);
                    if (bitePhase < 0.55) {
                        const radius = (org.dna ? org.dna.size : 8.0) * (0.8 + bitePhase * 0.7);
                        const alpha = (0.55 - bitePhase) * 0.75;

                        // Dual bite flash: emerald for algal grazing, copper orange for bioerosion
                        ctx.beginPath();
                        ctx.arc(org.x, org.y, radius, 0, Math.PI * 2);
                        ctx.strokeStyle = "rgba(16, 185, 129, " + alpha.toFixed(2) + ")";
                        ctx.lineWidth = 1.0;
                        ctx.stroke();

                        if ((org.bioerosionRateIndex || 0) > 0.35) {
                            ctx.beginPath();
                            ctx.arc(org.x, org.y, radius * 1.25, 0, Math.PI * 2);
                            ctx.strokeStyle = "rgba(217, 119, 6, " + (alpha * 0.85).toFixed(2) + ")";
                            ctx.lineWidth = 0.8;
                            ctx.stroke();
                        }
                    }
                }
            }

            ctx.restore();
        }
    }

    global.LanternOpticsRenderer = LanternOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
