// BioEcosystem - Cephalochordate Morphology, Axial Notochord Glow & Myomeric Undulation Optics
// Module: src/render/cephalochordate_optics.js
// Version: 7.88.0 (Hour 508 - Looks & UI Agent: Notochord Fatigue Optics, Axial Buckling, Cramp Spasms & 98th Channel % MFE)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CephalochordateOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for cephalochordate (Amphioxus / Branchiostoma) biology:
     * - Transparent Lanceolate Body: Elongated fusiform, laterally compressed translucent morphology with continuous fin folds
     * - Axial Notochord Luminescence: Complete continuous skeletal rod glowing sapphire-blue along the entire longitudinal axis
     * - Notochord Fatigue & Axial Buckling: Fatigue-induced dimming, mid-rod buckling kinks, and sand recovery breathing aura
     * - Chevron V-Shaped Myomere Stripes: Segmental muscle blocks flexing dynamically with sinusoidal wave propagation
     * - Myomeric Lactic Acidosis Cramps: Crimson/coral spasm jitter and rigid segmental contracture under metabolic acidosis
     * - Pharyngeal Branchial Basket & Endostyle: Ciliated gill slits and ventral mucus track with sand aspiration stall dimming
     * - Oral Hood, Buccal Cirri & Cough Spasms: Ciliated oral tentacles with reverse water-puff ejection during sand coughing
     * - Reverse Sand-Burrowing & Cryptic Benthic Stance: Tail-first angled sand penetration with exposed feeding rostrum
     * - 98th Channel (% MFE) Hydrodynamic Vortices: Streamline micro-eddies scaling with myomeric flexion efficiency
     */
    class CephalochordateOpticsRenderer {
        /**
         * Render individual cephalochordate organism with transparent lanceolate body, notochord, and myomeres.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawCephalochordate(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isCephalochordate) return;

            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const notochordLen = org.notochordLength || 55.0;
            const tension = org.notochordTension || 0.72;
            const myomeres = org.myomeresCount || 54;
            const wavePhase = org.myomericWavePhase || 0.0;
            const isBurrowed = org.isReverseBurrowed || false;
            const burrowDepth = org.reverseBurrowDepth || 0.0;
            const speed = org.swimmingVelocity || 2.10;

            const fatigue = org.notochordFatigueAccumulation || 0.0;
            const isBuckled = org.axialBuckling || false;
            const recoveryTimer = org.notochordRecoveryTimer || 0.0;
            const isCramped = org.myomericCrampState || false;
            const lactic = org.lacticAcidosisLevel || 0.0;
            const coughTimer = org.pharyngealCoughTimer || 0.0;
            const endostyleStall = org.endostyleTrapStall || false;
            const mfe = org.myomericFlexionEfficiency || 0.45;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            if (isBurrowed) {
                // Angled tail-first stance into benthic sediment
                heading = Math.PI * 0.35 + Math.sin(tick * 0.04) * 0.08;
            }
            ctx.rotate(heading);

            // 1. Transparent Fin Folds & Lanceolate Body Outline (with Buckling & Fatigue effects)
            CephalochordateOpticsRenderer.drawLanceolateBody(ctx, notochordLen, wavePhase, isBurrowed, burrowDepth, tick, isBuckled, fatigue);

            // 2. Segmental V-Shaped Chevron Myomeres & Myosepta (with Cramp & Lactic Acidosis effects)
            CephalochordateOpticsRenderer.drawChevronMyomeres(ctx, notochordLen, myomeres, wavePhase, tick, isCramped, lactic);

            // 3. Pharyngeal Branchial Basket & Ventral Endostyle (with Sand Stall & Cough effects)
            CephalochordateOpticsRenderer.drawBranchialAndEndostyle(ctx, notochordLen, tick, coughTimer, endostyleStall);

            // 4. Glowing Axial Notochord & Dorsal Nerve Cord (with Fatigue, Buckling & Recovery)
            CephalochordateOpticsRenderer.drawNotochordAndNerveCord(ctx, notochordLen, tension, wavePhase, tick, fatigue, isBuckled, recoveryTimer);

            // 5. Rostrum, Oral Hood & Ciliated Buccal Cirri (with Sand Cough Spasm Ejection)
            CephalochordateOpticsRenderer.drawRostrumAndOralCirri(ctx, notochordLen, tick, coughTimer);

            ctx.restore();
        }

        /**
         * Render transparent lanceolate body outline with dorsal, caudal, and ventral fin folds.
         */
        static drawLanceolateBody(ctx, len, wavePhase, isBurrowed, burrowDepth, tick, isBuckled, fatigue) {
            const halfL = len * 0.5;
            const maxH = len * 0.16;

            ctx.beginPath();
            ctx.moveTo(halfL, 0); // Anterior rostrum tip

            // Dorsal profile with subtle undulation or buckling deformation
            const buckDeflect = isBuckled ? (Math.sin(tick * 0.25) * 4.5 - 3.0) : 0.0;
            const dWave1 = Math.sin(wavePhase) * 1.5;
            const dWave2 = Math.sin(wavePhase + Math.PI * 0.5) * 2.2;

            ctx.bezierCurveTo(
                halfL * 0.5, -maxH * 1.15 + dWave1,
                -halfL * 0.1, -maxH * 1.1 + dWave2 + buckDeflect,
                -halfL, 0
            ); // Caudal tip

            // Ventral profile
            ctx.bezierCurveTo(
                -halfL * 0.1, maxH * 1.05 + dWave2 + buckDeflect,
                halfL * 0.5, maxH * 1.1 + dWave1,
                halfL, 0
            );
            ctx.closePath();

            // Glass-like transparent body fill (shifts to fatigued dull hue under exertion)
            const bodyGrad = ctx.createLinearGradient(-halfL, 0, halfL, 0);
            if (fatigue >= 0.50) {
                bodyGrad.addColorStop(0, "rgba(203, 213, 225, 0.30)"); // Fatigued slate-blue
                bodyGrad.addColorStop(0.5, "rgba(148, 163, 184, 0.40)");
                bodyGrad.addColorStop(1, "rgba(226, 232, 240, 0.45)");
            } else {
                bodyGrad.addColorStop(0, "rgba(224, 242, 254, 0.35)"); // Translucent ice-blue
                bodyGrad.addColorStop(0.5, "rgba(186, 230, 253, 0.45)");
                bodyGrad.addColorStop(1, "rgba(240, 249, 255, 0.55)"); // Clear rostrum
            }
            ctx.fillStyle = bodyGrad;
            ctx.fill();

            // Body border outline
            ctx.strokeStyle = isBuckled ? "rgba(245, 158, 11, 0.75)" : "rgba(56, 189, 248, 0.65)";
            ctx.lineWidth = isBuckled ? 1.4 : 1.0;
            ctx.stroke();

            // Dorsal and Ventral Transparent Fin Folds
            ctx.beginPath();
            ctx.moveTo(halfL * 0.4, -maxH * 1.0);
            ctx.lineTo(-halfL * 0.8, -maxH * 0.9);
            ctx.lineTo(-halfL, 0); // Lanceolate caudal fin
            ctx.lineTo(-halfL * 0.8, maxH * 0.8);
            ctx.lineTo(-halfL * 0.2, maxH * 0.9);
            ctx.strokeStyle = "rgba(125, 211, 252, 0.40)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }

        /**
         * Render glowing axial notochord and dorsal nerve cord with photoreceptor Hesse organs.
         */
        static drawNotochordAndNerveCord(ctx, len, tension, wavePhase, tick, fatigue, isBuckled, recoveryTimer) {
            const halfL = len * 0.5;
            const notochordH = len * 0.055;

            // 1. Axial Notochord Rod
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(halfL * 0.92, 0);

            const nPoints = 10;
            for (let p = 1; p <= nPoints; p++) {
                const ratio = p / nPoints;
                const px = halfL * 0.92 - (len * 0.90 * ratio);
                let py = Math.sin(wavePhase + ratio * Math.PI * 2) * (2.2 * (1.1 - ratio));

                // Buckling kink deformation at mid-rod (ratio 0.45 - 0.65)
                if (isBuckled && ratio >= 0.40 && ratio <= 0.70) {
                    const kinkDist = 1.0 - Math.abs(ratio - 0.55) / 0.15;
                    py += kinkDist * (Math.sin(tick * 0.3) * 3.8 + 2.5);
                }

                ctx.lineTo(px, py);
            }

            // Sapphire glow dimming with fatigue
            const glowAlpha = Math.max(0.18, (0.65 + 0.30 * tension) * (1.0 - fatigue * 0.55));
            const flicker = (fatigue >= 0.70 && (tick % 6 < 3)) ? 0.40 : 1.0;

            ctx.strokeStyle = isBuckled ?
                "rgba(245, 158, 11, 0.85)" : // Amber stress kink
                ("rgba(37, 99, 235, " + (glowAlpha * flicker) + ")");
            ctx.lineWidth = notochordH * (0.85 + 0.30 * tension);
            ctx.lineCap = "round";
            ctx.stroke();

            // Inner Notochord Luminescent Core
            ctx.strokeStyle = isBuckled ? "rgba(254, 240, 138, 0.95)" : "rgba(147, 197, 253, 0.90)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Breathing recovery aura if resting in sand
            if (recoveryTimer > 0.0) {
                const auraBreath = 0.5 + Math.sin(tick * 0.15) * 0.4;
                ctx.strokeStyle = "rgba(34, 211, 238, " + (0.35 * auraBreath) + ")";
                ctx.lineWidth = notochordH * 2.2;
                ctx.stroke();
            }
            ctx.restore();

            // 2. Dorsal Hollow Nerve Cord
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(halfL * 0.85, -notochordH * 1.1);
            for (let p = 1; p <= nPoints; p++) {
                const ratio = p / nPoints;
                const px = halfL * 0.85 - (len * 0.85 * ratio);
                let py = -notochordH * 1.1 + Math.sin(wavePhase + ratio * Math.PI * 2) * (2.2 * (1.1 - ratio));
                if (isBuckled && ratio >= 0.40 && ratio <= 0.70) {
                    const kinkDist = 1.0 - Math.abs(ratio - 0.55) / 0.15;
                    py += kinkDist * (Math.sin(tick * 0.3) * 3.8 + 2.5);
                }
                ctx.lineTo(px, py);
            }
            ctx.strokeStyle = "rgba(30, 64, 175, 0.80)";
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Cerebral Vesicle & Frontal Eye-Spot
            ctx.beginPath();
            ctx.arc(halfL * 0.85, -notochordH * 1.1, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(220, 38, 38, 0.90)"; // Crimson photoreceptor spot
            ctx.fill();

            // Hesse Organ Photoreceptor Ocelli along nerve cord
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            for (let h = 0; h < 6; h++) {
                const hx = halfL * 0.70 - (h * (len * 0.12));
                const hy = -notochordH * 1.1 + Math.sin(wavePhase + (h / 6) * Math.PI * 2) * 1.5;
                ctx.beginPath();
                ctx.arc(hx, hy, 0.7, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        /**
         * Render chevron V-shaped myomeres and collagenous myosepta with cramp and lactic acidosis optics.
         */
        static drawChevronMyomeres(ctx, len, myomeres, wavePhase, tick, isCramped, lactic) {
            const halfL = len * 0.5;
            const maxH = len * 0.14;
            const numSegments = Math.min(22, Math.floor(myomeres * 0.40));
            const segSpacing = (len * 0.82) / numSegments;

            ctx.save();
            ctx.lineWidth = 0.7;

            // Myosepta styling shifts to tense crimson/coral under cramp
            if (isCramped) {
                ctx.strokeStyle = "rgba(244, 63, 94, 0.80)"; // Cramp alert red/coral
                ctx.lineWidth = 1.1;
            } else if (lactic >= 0.50) {
                ctx.strokeStyle = "rgba(251, 146, 60, 0.60)"; // Lactic acidosis amber
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.35)"; // Delicate myosepta
            }

            const crampJitter = isCramped ? (Math.sin(tick * 0.9) * 1.6) : 0.0;

            for (let s = 0; s < numSegments; s++) {
                const sx = (halfL * 0.78) - (s * segSpacing);
                const apexX = sx + 3.0; // V-point facing anteriorly
                const undul = Math.sin(wavePhase + (s / numSegments) * Math.PI * 2) * (isCramped ? 0.3 : 1.2) + crampJitter;

                ctx.beginPath();
                ctx.moveTo(sx - 2.5, -maxH * 0.85 + undul);
                ctx.lineTo(apexX, undul); // Anterior V-apex on notochord axis
                ctx.lineTo(sx - 2.5, maxH * 0.85 + undul);
                ctx.stroke();

                // Contracted myomere fill under intense cramp
                if (isCramped && s % 2 === 0) {
                    ctx.fillStyle = "rgba(239, 68, 68, 0.20)";
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        /**
         * Render pharyngeal branchial basket and ventral endostyle mucus strip with sand stall and cough spasms.
         */
        static drawBranchialAndEndostyle(ctx, len, tick, coughTimer, endostyleStall) {
            const halfL = len * 0.5;
            const pharynxL = len * 0.38;
            const startX = halfL * 0.75;
            const endX = startX - pharynxL;
            const halfH = len * 0.11;

            ctx.save();
            // Slanted branchial gill bars
            ctx.strokeStyle = coughTimer > 0.0 ? "rgba(239, 68, 68, 0.60)" : "rgba(14, 165, 233, 0.35)";
            ctx.lineWidth = 0.7;
            const numBars = 10;
            const barSpacing = pharynxL / numBars;

            const coughSpasm = coughTimer > 0.0 ? (Math.sin(tick * 0.75) * 2.2) : 0.0;

            for (let b = 0; b < numBars; b++) {
                const bx = startX - (b * barSpacing) + coughSpasm;
                ctx.beginPath();
                ctx.moveTo(bx + 1.5, -halfH * 0.4);
                ctx.lineTo(bx - 1.5, halfH * 0.8);
                ctx.stroke();
            }

            // Ventral Endostyle Mucus Strip (Thyroid precursor)
            ctx.beginPath();
            ctx.moveTo(startX, halfH * 0.85);
            ctx.lineTo(endX, halfH * 0.85);

            if (endostyleStall) {
                // Dimmed silt-fouled endostyle
                ctx.strokeStyle = "rgba(217, 119, 6, 0.45)";
                ctx.lineWidth = 0.8;
            } else {
                // Glowing aquamarine endostyle
                ctx.strokeStyle = "rgba(20, 184, 166, 0.80)";
                ctx.lineWidth = 1.2;
            }
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Render rostrum, buccal hood, and ciliated oral cirri tentacles with sand cough burst particles.
         */
        static drawRostrumAndOralCirri(ctx, len, tick, coughTimer) {
            const halfL = len * 0.5;
            const maxH = len * 0.14;

            ctx.save();
            // Oral hood buccal tentacles
            const cirriCount = 7;
            const isCoughing = coughTimer > 0.0;
            ctx.strokeStyle = isCoughing ? "rgba(245, 158, 11, 0.90)" : "rgba(224, 242, 254, 0.75)";
            ctx.lineWidth = isCoughing ? 1.1 : 0.8;

            for (let c = 0; c < cirriCount; c++) {
                const angle = (c / (cirriCount - 1)) * Math.PI * 0.65;
                const flutter = Math.sin(tick * 0.20 + c * 0.8) * (isCoughing ? 3.5 : 1.8);
                const spread = isCoughing ? 7.5 : 5.0;
                const cx = halfL * 0.85 - Math.cos(angle) * spread;
                const cy = maxH * 0.6 + Math.sin(angle) * (isCoughing ? 6.0 : 4.5) + flutter;

                ctx.beginPath();
                ctx.moveTo(halfL * 0.85, maxH * 0.4);
                ctx.lineTo(cx, cy);
                ctx.stroke();
            }

            // Forward water puff and expelled sand particles during cough spasm
            if (isCoughing) {
                for (let p = 0; p < 4; p++) {
                    const puffX = halfL * 0.95 + (p * 4.0) + Math.sin(tick * 0.5 + p) * 3.0;
                    const puffY = (p % 2 === 0 ? -1 : 1) * (2.0 + p * 1.5);
                    ctx.beginPath();
                    ctx.arc(puffX, puffY, 1.2 + p * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = p % 2 === 0 ? "rgba(245, 158, 11, 0.75)" : "rgba(56, 189, 248, 0.65)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render global benthic sandy sediment and reverse burrowing cavities.
         */
        static drawGlobalCephalochordateEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.getMetrics ? manager.getMetrics() : {};
            const burrowers = metrics.reverseBurrowersCount || 0;
            if (burrowers === 0) return;

            const sandY = height - 85;
            ctx.save();

            // Fine sand sediment grain stratum
            ctx.fillStyle = "rgba(217, 119, 6, 0.08)";
            ctx.fillRect(0, sandY, width, height - sandY);

            // Reverse burrow cavities and water vortices
            const numHoles = Math.min(8, burrowers + 2);
            for (let h = 0; h < numHoles; h++) {
                const hx = ((h * 97 + tick * 0.03) % (width - 50)) + 25;
                const hy = sandY + (h % 3) * 12;

                // Burrow aperture highlight
                ctx.beginPath();
                ctx.ellipse(hx, hy, 8.0, 3.5, -0.35, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(30, 58, 138, 0.25)";
                ctx.fill();
                ctx.strokeStyle = "rgba(20, 184, 166, 0.35)";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render high-speed swimming streamline vortices and caudal fin wave trails scaled with 98th Channel (% MFE).
         */
        static drawCephalochordateTrailsAndVortices(ctx, organisms, tick) {
            if (!ctx || !organisms) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isCephalochordate) continue;
                if (org.isReverseBurrowed) continue;

                const speed = org.swimmingVelocity || 2.10;
                if (speed < 1.10) continue;

                const mfe = org.myomericFlexionEfficiency !== undefined ? org.myomericFlexionEfficiency : 0.45;
                const isCramped = org.myomericCrampState || false;
                const heading = Math.atan2(org.vy || 0, org.vx || 1);
                const tailX = org.x - Math.cos(heading) * ((org.notochordLength || 55.0) * 0.52);
                const tailY = org.y - Math.sin(heading) * ((org.notochordLength || 55.0) * 0.52);

                // Alternating caudal vortices scaled with MFE
                const phase = (org.myomericWavePhase || 0.0);
                const vortexOffset = Math.sin(phase) * (isCramped ? 2.5 : 6.0);
                const perpX = -Math.sin(heading) * vortexOffset;
                const perpY = Math.cos(heading) * vortexOffset;

                const trailColor = isCramped ?
                    "rgba(244, 63, 94, 0.40)" : // Cramped disrupted eddies
                    (mfe >= 0.60 ? "rgba(20, 184, 166, 0.45)" : "rgba(37, 99, 235, 0.28)");

                ctx.beginPath();
                ctx.arc(tailX + perpX, tailY + perpY, 2.5 + (speed * mfe * 1.2), 0, Math.PI * 2);
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = 1.0;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(tailX - perpX * 0.5, tailY - perpY * 0.5, 1.5 + (mfe * 1.0), 0, Math.PI * 2);
                ctx.fillStyle = isCramped ? "rgba(239, 68, 68, 0.25)" : "rgba(45, 212, 191, 0.25)";
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CephalochordateOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.CephalochordateOpticsRenderer = CephalochordateOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
