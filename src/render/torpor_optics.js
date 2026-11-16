// BioEcosystem - Late Cretaceous Multituberculate Plagiaulacoid Blades & Torpor Optics
// Module: src/render/torpor_optics.js
// Version: 8.95.0 (Hour 615 - Looks & UI Agent: Plagiaulacoid Blade Saw, Fossorial Shelter, Torpor Frost & 127th/128th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TorporOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Late Cretaceous Multituberculate adaptations:
     * - Plagiaulacoid Blade Dentition & Micro-Serrated Spark Optics:
     *   Pistachio lime (#65a30d) and bright lime (#84cc16) arc-shaped p4 premolar blade profile with glowing
     *   vertical serration ridges, and micro-sparks scattering during palinal seed grinding.
     * - Fossorial Shelter & Subterranean Burrowing Halo:
     *   Earthy ochre brown (#854d0e) subterranean boundary aura indicating 90%+ thermal insulation.
     * - Hypometabolic Torpor / Hibernation Frost Crystals:
     *   Buz mavisi / crystal cyan (#0284c7 and #38bdf8) radial gradient aura with slow micro-frost crystal
     *   pulsations during hypometabolic depression.
     * - Brown Adipose Tissue (BAT) Non-Shivering Thermogenesis:
     *   Interscapular warm amber-orange (#f97316) metabolic heater node facilitating rapid arousal.
     * - 127th Telemetry Channel (% PBI) Aura: Pistachio lime (#65a30d) palinal blade radiance.
     * - 128th Telemetry Channel (% THI) Radiance: Ice cyan (#0284c7) hypometabolic torpor glow.
     */
    class TorporOpticsRenderer {
        /**
         * Render individual Multituberculate and Torpor morphology and auras.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTorpor(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.hasPlagiaulacoidBlades && !org.canEnterTorpor && !org.isShelteredUnderground) return;

            const size = org.dna ? (org.dna.size || 7.0) : 7.0;
            const bodyLen = 22.0 + size * 1.5;
            const bodyWidth = 10.0 + size * 0.9;

            const pbi = (org.plagiaulacoidBladeIndex || 0.0) / 100.0;
            const thi = (org.torporHibernationIndex || 0.0) / 100.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Ambient Telemetry Auras
            // 127th Channel (% PBI) Pistachio Lime Blade Radiance
            if (org.hasPlagiaulacoidBlades && pbi > 0.25) {
                const bladeAuraRadius = bodyWidth * 1.7;
                const bladeGrad = ctx.createRadialGradient(bodyLen * 0.32, 0, 2, bodyLen * 0.32, 0, bladeAuraRadius);
                const pbiPulse = 0.12 + Math.sin(tick * 0.14) * 0.04;
                bladeGrad.addColorStop(0.0, "rgba(101, 163, 13, " + (pbiPulse * pbi).toFixed(3) + ")");
                bladeGrad.addColorStop(0.55, "rgba(132, 204, 22, " + (pbiPulse * 0.40 * pbi).toFixed(3) + ")");
                bladeGrad.addColorStop(1.0, "rgba(101, 163, 13, 0.0)");
                ctx.fillStyle = bladeGrad;
                ctx.beginPath();
                ctx.arc(bodyLen * 0.32, 0, bladeAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 128th Channel (% THI) Crystal Cyan Torpor & Hypothermia Aura
            if (org.canEnterTorpor && thi > 0.25) {
                const torporAuraRadius = bodyLen * 0.70;
                const torporGrad = ctx.createRadialGradient(0, 0, 3, 0, 0, torporAuraRadius);
                const thiPulse = 0.14 + Math.cos(tick * 0.09) * 0.05;
                torporGrad.addColorStop(0.0, "rgba(2, 132, 199, " + (thiPulse * thi).toFixed(3) + ")");
                torporGrad.addColorStop(0.60, "rgba(56, 189, 248, " + (thiPulse * 0.45 * thi).toFixed(3) + ")");
                torporGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");
                ctx.fillStyle = torporGrad;
                ctx.beginPath();
                ctx.arc(0, 0, torporAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Fossorial Subterranean Burrow Boundary
            if (org.isShelteredUnderground) {
                const burrowRadius = bodyLen * 0.85;
                ctx.save();
                ctx.strokeStyle = "rgba(133, 77, 14, 0.65)";
                ctx.lineWidth = 1.8;
                ctx.setLineDash([4, 3]);
                ctx.beginPath();
                ctx.arc(0, 0, burrowRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Earthy sediment shield infill
                ctx.fillStyle = "rgba(133, 77, 14, 0.12)";
                ctx.beginPath();
                ctx.arc(0, 0, burrowRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // 3. Plagiaulacoid Blade Premolar Anatomy (p4 Serrated Saw Blade)
            if (org.hasPlagiaulacoidBlades) {
                const toothX = bodyLen * 0.34;
                const toothYOffset = bodyWidth * 0.30;
                const bladeLen = (org.plagiaulacoidBladeLength || 3.8);

                for (let side = -1; side <= 1; side += 2) {
                    const ty = side * toothYOffset;

                    // Arched blade body
                    ctx.save();
                    ctx.fillStyle = "rgba(163, 230, 53, 0.85)";
                    ctx.strokeStyle = "rgba(101, 163, 13, 0.95)";
                    ctx.lineWidth = 1.1;

                    ctx.beginPath();
                    ctx.moveTo(toothX - bladeLen, ty);
                    ctx.quadraticCurveTo(toothX - bladeLen * 0.5, ty + side * 2.8, toothX + 1.0, ty);
                    ctx.lineTo(toothX - bladeLen, ty);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Micro-serration ridges
                    const serrations = Math.min(14, Math.floor(org.plagiaulacoidSerrationCount || 12.0));
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.90)";
                    ctx.lineWidth = 0.8;
                    for (let s = 1; s < serrations; s++) {
                        const sx = toothX - bladeLen + (bladeLen * s / serrations);
                        ctx.beginPath();
                        ctx.moveTo(sx, ty);
                        ctx.lineTo(sx + 0.6, ty + side * 1.8);
                        ctx.stroke();
                    }
                    ctx.restore();
                }

                // Palinal Chewing / Seed Slicing Sparks
                if (org.grindingCooldown > 0) {
                    ctx.save();
                    const sparkCount = 4;
                    for (let s = 0; s < sparkCount; s++) {
                        const sx = toothX - 4.0 + Math.random() * 8.0;
                        const sy = (Math.random() - 0.5) * bodyWidth;
                        ctx.fillStyle = "rgba(163, 230, 53, 0.90)";
                        ctx.beginPath();
                        ctx.arc(sx, sy, 0.9, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }

            // 4. Hypometabolic Torpor Stillness & Frost Crystals
            if (org.isInTorpor) {
                ctx.save();
                // 4 frost crystal nodes
                const crystalCount = 4;
                for (let c = 0; c < crystalCount; c++) {
                    const cAngle = (c * (Math.PI * 2 / crystalCount)) + (tick * 0.04);
                    const cDist = bodyWidth * 1.35;
                    const cx = Math.cos(cAngle) * cDist;
                    const cy = Math.sin(cAngle) * cDist;

                    ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.moveTo(cx - 2.5, cy);
                    ctx.lineTo(cx + 2.5, cy);
                    ctx.moveTo(cx, cy - 2.5);
                    ctx.lineTo(cx, cy + 2.5);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 5. Brown Adipose Tissue (BAT) Thermogenic Heater
            if (org.canEnterTorpor && (org.brownFatThermogenesis || 0.85) > 0.65) {
                const batX = bodyLen * 0.08;
                const batRadius = 2.4;
                const batGrad = ctx.createRadialGradient(batX, 0, 0.5, batX, 0, batRadius * 1.8);
                const batPulse = 0.35 + Math.sin(tick * 0.16) * 0.15;
                batGrad.addColorStop(0.0, "rgba(249, 115, 22, " + batPulse.toFixed(3) + ")");
                batGrad.addColorStop(0.6, "rgba(234, 88, 12, " + (batPulse * 0.5).toFixed(3) + ")");
                batGrad.addColorStop(1.0, "rgba(249, 115, 22, 0.0)");
                ctx.fillStyle = batGrad;
                ctx.beginPath();
                ctx.arc(batX, 0, batRadius * 1.8, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render ambient K-Pg atmospheric dust, smoke motes, and cold torpor mist.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawTorporAtmospherics(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            const w = ctx.canvas ? ctx.canvas.width : 660;
            const h = ctx.canvas ? ctx.canvas.height : 660;

            let sleeperCount = 0;
            let multiCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;
                if (o.isInTorpor) sleeperCount++;
                if (o.hasPlagiaulacoidBlades) multiCount++;
            }

            if (sleeperCount === 0 && multiCount === 0) return;

            // Cold impact-winter micro-mist and seed powder motes
            const moteCount = Math.min(12, 4 + sleeperCount);
            ctx.save();
            for (let m = 0; m < moteCount; m++) {
                const mx = (Math.sin(tick * 0.012 + m * 2.1) * 0.5 + 0.5) * w;
                const my = (Math.cos(tick * 0.010 + m * 1.9) * 0.5 + 0.5) * h;
                const alpha = (0.08 + Math.sin(tick * 0.03 + m) * 0.04);

                ctx.fillStyle = (m % 2 === 0) ?
                    "rgba(56, 189, 248, " + alpha.toFixed(3) + ")" :
                    "rgba(132, 204, 22, " + alpha.toFixed(3) + ")";
                ctx.beginPath();
                ctx.arc(mx, my, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TorporOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TorporOpticsRenderer = TorporOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
