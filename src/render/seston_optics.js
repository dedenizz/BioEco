// BioEcosystem - Epibenthic Seston Stratum & Suspension Filtration Optics
// Module: src/render/seston_optics.js
// Version: 6.98.0 (Hour 418 - Looks & UI Agent: Silt Cleansing Pulses, Sheath Optics & 80th Channel Visuals)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SestonOpticsRenderer
     * High-fidelity scientific microscope rendering of epibenthic suspension feeding:
     * - Epibenthic boundary layer (BBL / seston stratum, y: 435 - 480 px) fluid particle haze
     * - Dilation of ciliated seston capture tentacles with vibrating pinnule feathering
     * - Micro-ciliary suction vortex rings drawing suspended marine snow into oral cavities
     * - Silt-expulsion bursts and debris sloughing pulses during ciliary cleansing twitches
     * - Contractile basal tentacle sheaths and elastic current shear deflection streams
     * - Adaptive directional tentacle orientation aligning with incoming bottom flow vectors
     */
    class SestonOpticsRenderer {
        /**
         * Render individual epibenthic suspension feeding optics and tentacular canopies.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellSeston(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const isFiltering = org.isEpibenthicFiltering || false;
            const span = org.tentacleSpan || 0.0;
            const ciliaryVel = org.ciliaryCurrentVelocity || 0.0;
            const tentacles = org.sestonCaptureTentacles || 6.0;
            const angle = org.adaptiveAngleOrientation || 0.0;
            const isSheathed = org.isSheathRetracted || false;

            if (!isFiltering && span <= 0.8 && !isSheathed) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Contractile basal sheath collar
            if (isSheathed || org.retractileTentacleSheath > 0.3) {
                SestonOpticsRenderer.drawSheathRetractionOptics(ctx, size, isSheathed, tick);
            }

            // 2. Radiating ciliated tentacle canopy with directional angle
            if (span > 1.2 && !isSheathed) {
                SestonOpticsRenderer.drawTentacleCanopy(ctx, size, tentacles, span, angle, tick);
            }

            // 3. Micro-ciliary suction vortex rings
            if (ciliaryVel > 0.12 && span > 2.5 && !isSheathed) {
                SestonOpticsRenderer.drawCiliaryVortexRings(ctx, size, span, ciliaryVel, tick);
            }

            // 4. Delicate luminous mucus filtration web
            if (span > 3.5 && !isSheathed) {
                SestonOpticsRenderer.drawMucusFiltrationWeb(ctx, size, span, tick);
            }

            // 5. Silt-expulsion cleansing pulse
            if (org.cleansingTwitchActive) {
                SestonOpticsRenderer.drawSiltCleansingPulse(ctx, size, tick);
            }

            // 6. Elastic hydrodynamic shear deflection fringe
            if (org.shearDeflection && !isSheathed) {
                SestonOpticsRenderer.drawShearDeflectionFringe(ctx, size, tick);
            }

            ctx.restore();
        }

        static drawSheathRetractionOptics(ctx, size, isSheathed, tick) {
            const collarR = size * (isSheathed ? 1.45 : 1.25);
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, collarR, 0, Math.PI * 2);
            ctx.strokeStyle = isSheathed ? "rgba(139, 92, 246, 0.75)" : "rgba(139, 92, 246, 0.35)";
            ctx.lineWidth = isSheathed ? 2.2 : 1.2;
            ctx.stroke();

            if (isSheathed) {
                ctx.beginPath();
                ctx.arc(0, 0, collarR * 0.85, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(124, 58, 237, 0.28)";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawTentacleCanopy(ctx, size, count, span, angleOffset, tick) {
            const numArms = Math.min(10, Math.max(4, Math.round(count)));
            const armLength = size + span;
            const baseAngleStep = (Math.PI * 2) / numArms;
            const wave = Math.sin(tick * 0.08) * 0.12;

            ctx.save();
            ctx.rotate(angleOffset * 0.35); // Gentle orientation toward flow

            for (let i = 0; i < numArms; i++) {
                const angle = i * baseAngleStep + wave;
                const tipX = Math.cos(angle) * armLength;
                const tipY = Math.sin(angle) * armLength * 0.85;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                const midX = Math.cos(angle + 0.15) * (armLength * 0.55);
                const midY = Math.sin(angle + 0.15) * (armLength * 0.55);
                ctx.quadraticCurveTo(midX, midY, tipX, tipY);
                ctx.strokeStyle = "rgba(6, 182, 212, 0.45)";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                const pinPhase = Math.sin(tick * 0.2 + i) * 1.8;
                ctx.beginPath();
                ctx.arc(tipX + pinPhase, tipY, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(52, 211, 153, 0.75)";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawCiliaryVortexRings(ctx, size, span, ciliaryVel, tick) {
            const ringRadius = size + span * 1.15;
            const pulse = Math.sin(tick * 0.15) * 0.15 + 1.0;
            const currentR = ringRadius * pulse;
            const alpha = Math.min(0.35, ciliaryVel * 0.42);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, currentR, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(56, 189, 248, " + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([3, 4]);
            ctx.stroke();

            const spiralAngle = (tick * 0.05) % (Math.PI * 2);
            const inX = Math.cos(spiralAngle) * (currentR * 0.65);
            const inY = Math.sin(spiralAngle) * (currentR * 0.65);
            ctx.beginPath();
            ctx.arc(inX, inY, 1.0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(110, 231, 183, 0.85)";
            ctx.fill();
            ctx.restore();
        }

        static drawMucusFiltrationWeb(ctx, size, span, tick) {
            const outerR = size + span * 0.95;
            const webPoints = 6;
            const angleStep = (Math.PI * 2) / webPoints;

            ctx.save();
            ctx.beginPath();
            for (let j = 0; j < webPoints; j++) {
                const a = j * angleStep;
                const wx = Math.cos(a) * outerR;
                const wy = Math.sin(a) * outerR;
                if (j === 0) ctx.moveTo(wx, wy);
                else ctx.lineTo(wx, wy);
            }
            ctx.closePath();
            ctx.strokeStyle = "rgba(16, 185, 129, 0.22)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            for (let k = 0; k < webPoints; k++) {
                const ka = k * angleStep + (tick * 0.015);
                const px = Math.cos(ka) * outerR;
                const py = Math.sin(ka) * outerR;
                ctx.beginPath();
                ctx.arc(px, py, 0.8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 191, 36, 0.65)";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawSiltCleansingPulse(ctx, size, tick) {
            const burstR = size * 2.2;
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, burstR, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(217, 119, 6, 0.35)";
            ctx.fill();

            for (let i = 0; i < 6; i++) {
                const burstAngle = (i * Math.PI / 3) + (tick * 0.1);
                const bx = Math.cos(burstAngle) * (burstR * 1.2);
                const by = Math.sin(burstAngle) * (burstR * 1.2);
                ctx.beginPath();
                ctx.arc(bx, by, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
                ctx.fill();
            }
            ctx.restore();
        }

        static drawShearDeflectionFringe(ctx, size, tick) {
            ctx.save();
            const shearAngle = Math.sin(tick * 0.1) * 0.25 - 0.4;
            const trailLen = size * 2.0;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(shearAngle) * trailLen, Math.sin(shearAngle) * trailLen);
            ctx.strokeStyle = "rgba(244, 63, 94, 0.35)";
            ctx.lineWidth = 1.4;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Render global epibenthic boundary layer (BBL / seston stratum) and suspended organic drift.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {number} width - Simulation canvas width.
         * @param {number} height - Simulation canvas height.
         * @param {Object} manager - SestonFiltrationManager instance.
         * @param {number} tick - Current frame tick.
         */
        static drawGlobalSestonEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || width <= 0 || height <= 0) return;

            const sedimentY = (manager && manager.sedimentSurfaceY) ? manager.sedimentSurfaceY : 480.0;
            const bblTop = (manager && manager.bblUpperThreshold) ? manager.bblUpperThreshold : 435.0;
            if (bblTop >= height) return;

            const sfe = (manager && manager.metrics && manager.metrics.meanSFEIndex) ? manager.metrics.meanSFEIndex : 0.0;
            const activeCount = (manager && manager.metrics && manager.metrics.activeFilterFeeders) ? manager.metrics.activeFilterFeeders : 0;

            ctx.save();

            const bblHeight = Math.max(0, sedimentY - bblTop);
            const bblGrad = ctx.createLinearGradient(0, bblTop, 0, sedimentY);
            bblGrad.addColorStop(0, "rgba(6, 182, 212, 0.03)");
            bblGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
            bblGrad.addColorStop(1, "rgba(52, 211, 153, 0.14)");
            ctx.fillStyle = bblGrad;
            ctx.fillRect(0, bblTop, width, bblHeight);

            const flakeCount = 12;
            for (let f = 0; f < flakeCount; f++) {
                const fx = ((tick * 0.4 + f * 55) % width);
                const fy = bblTop + (Math.sin(tick * 0.03 + f) * (bblHeight * 0.4) + (bblHeight * 0.5));
                const flakeRadius = 1.2 + (f % 3) * 0.4;
                const alpha = 0.25 + (f % 4) * 0.12;

                ctx.beginPath();
                ctx.arc(fx, fy, flakeRadius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(110, 231, 183, " + alpha.toFixed(3) + ")";
                ctx.fill();
            }

            if (activeCount > 0 || sfe > 0.15) {
                ctx.beginPath();
                ctx.moveTo(0, bblTop + bblHeight * 0.5);
                for (let sx = 0; sx <= width; sx += 40) {
                    const waveY = Math.sin((sx * 0.015) + (tick * 0.04)) * 4.0;
                    ctx.lineTo(sx, bblTop + bblHeight * 0.5 + waveY);
                }
                ctx.strokeStyle = "rgba(6, 182, 212, 0.18)";
                ctx.lineWidth = 1.0;
                ctx.setLineDash([4, 6]);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SestonOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.SestonOpticsRenderer = SestonOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
