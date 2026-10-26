// BioEcosystem - Twilight Zone Mesopelagic Optics & Hydrostatic Buoyancy Refraction
// Module: src/render/twilight_optics.js
// Version: 5.33.0 (Hour 253 - Looks Agent: Mesopelagic Light Attenuation & Buoyancy Slipstreams)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TwilightOpticsRenderer
     * Provides high-fidelity microscope aesthetics for the mesopelagic twilight zone (y: 240 - 440px):
     * - Bathymetric light extinction and blue-green Rayleigh scattering haze
     * - Glistening aerotope gas vesicle micro-bubbles and lipid droplet inclusions
     * - Vertical buoyant slipstreams (effervescent ascent wakes and hydrodynamic descent streaks)
     * - Crepuscular downwelling light shaft attenuation
     */
    class TwilightOpticsRenderer {
        /**
         * Render mesopelagic twilight zone light attenuation and downwelling photon shafts.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {number} width - Canvas viewport width.
         * @param {number} height - Canvas viewport height.
         * @param {number} tick - Current simulation frame count.
         * @param {number} dielPhase - Normalized diel phase [0.0 - 1.0].
         */
        static drawMesopelagicTwilightZone(ctx, width, height, tick, dielPhase) {
            if (!ctx) return;

            const yTop = 240.0;
            const yBottom = 440.0;
            const zoneHeight = yBottom - yTop;
            if (height < yTop) return;

            ctx.save();

            // 1. Bathymetric Light Attenuation & Rayleigh Scattering Gradient
            const phase = typeof dielPhase === "number" ? dielPhase : 0.5;
            const isDaytime = (phase > 0.22 && phase < 0.78);
            const daylightFactor = isDaytime ? Math.sin((phase - 0.22) / 0.56 * Math.PI) : 0.0;

            const twilightGrad = ctx.createLinearGradient(0, yTop, 0, yBottom);
            if (isDaytime) {
                // Diurnal twilight: indigo-cyan Rayleigh scattering fading to abyssal darkness
                const hazeAlpha = 0.08 + daylightFactor * 0.16;
                twilightGrad.addColorStop(0.0, `rgba(14, 116, 144, ${hazeAlpha * 0.4})`);
                twilightGrad.addColorStop(0.5, `rgba(8, 47, 73, ${hazeAlpha * 0.85})`);
                twilightGrad.addColorStop(1.0, `rgba(3, 7, 18, ${hazeAlpha * 1.2})`);
            } else {
                // Nocturnal twilight: deep oceanic midnight blue
                twilightGrad.addColorStop(0.0, "rgba(2, 6, 23, 0.05)");
                twilightGrad.addColorStop(0.5, "rgba(2, 6, 23, 0.18)");
                twilightGrad.addColorStop(1.0, "rgba(2, 6, 23, 0.35)");
            }

            ctx.fillStyle = twilightGrad;
            ctx.fillRect(0, yTop, width, zoneHeight);

            // 2. Crepuscular Downwelling Light Shafts (Only visible during daytime)
            if (isDaytime && daylightFactor > 0.20) {
                const shaftCount = 4;
                for (let s = 0; s < shaftCount; s++) {
                    const shaftX = (width * 0.22) + s * (width * 0.19) + Math.sin(tick * 0.01 + s * 1.5) * 18.0;
                    const shaftWidth = 24.0 + Math.sin(tick * 0.02 + s) * 8.0;
                    const shaftAlpha = Math.min(0.08, daylightFactor * 0.07);

                    const shaftGrad = ctx.createLinearGradient(shaftX, yTop, shaftX, yTop + zoneHeight * 0.75);
                    shaftGrad.addColorStop(0.0, `rgba(186, 230, 253, ${shaftAlpha})`);
                    shaftGrad.addColorStop(0.6, `rgba(56, 189, 248, ${shaftAlpha * 0.45})`);
                    shaftGrad.addColorStop(1.0, "rgba(8, 47, 73, 0.0)");

                    ctx.beginPath();
                    ctx.moveTo(shaftX - shaftWidth * 0.4, yTop);
                    ctx.lineTo(shaftX + shaftWidth * 0.4, yTop);
                    ctx.lineTo(shaftX + shaftWidth * 1.2, yTop + zoneHeight * 0.75);
                    ctx.lineTo(shaftX - shaftWidth * 1.2, yTop + zoneHeight * 0.75);
                    ctx.closePath();
                    ctx.fillStyle = shaftGrad;
                    ctx.fill();
                }
            }

            // 3. Mesopelagic Micro-Detrital Suspended Flecks
            const fleckCount = 10;
            ctx.fillStyle = "rgba(125, 211, 252, 0.16)";
            for (let f = 0; f < fleckCount; f++) {
                const seed = (f * 173.3) % 1.0;
                const fx = (seed * width + Math.sin(tick * 0.018 + f * 2.0) * 14.0) % width;
                const fy = yTop + ((tick * 0.12 + f * 22.0) % zoneHeight);
                ctx.beginPath();
                ctx.arc(fx, fy, 0.9, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render cellular gas vacuole micro-bubbles, lipid inclusions, and buoyant slipstreams.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Object} org - Host organism.
         * @param {number} tick - Current simulation frame count.
         */
        static drawCellBuoyancyOptics(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const gas = typeof org.gasVolume === "number" ? org.gasVolume : 0.0;
            const lipid = typeof org.lipidReserves === "number" ? org.lipidReserves : 0.0;
            const isUp = Boolean(org.isMigratingUp);
            const isDown = Boolean(org.isMigratingDown);
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            if (gas <= 0.8 && lipid <= 0.8 && !isUp && !isDown) return;

            ctx.save();

            // 1. Refractive Gas Vesicle (Aerotope) Micro-Bubbles (Clustered on cell apical pole)
            if (gas > 0.8) {
                const bubbleCount = Math.max(2, Math.min(5, Math.floor(gas * 0.25)));
                const bubbleAlpha = Math.min(0.85, 0.35 + gas * 0.025);

                for (let b = 0; b < bubbleCount; b++) {
                    const bAngle = (b / bubbleCount) * Math.PI * 0.9 - Math.PI * 0.45;
                    const bDist = size * 0.65;
                    const bx = Math.cos(bAngle) * bDist;
                    const by = -Math.sin(bAngle) * bDist * 0.85; // Clustered towards upper dorsal hemisphere
                    const bRadius = Math.max(1.1, Math.min(2.8, 1.2 + (gas / 20.0) * 1.6));

                    // Radial bubble glass sheen gradient
                    const bubbleGrad = ctx.createRadialGradient(bx - bRadius * 0.3, by - bRadius * 0.3, bRadius * 0.1, bx, by, bRadius);
                    bubbleGrad.addColorStop(0.0, `rgba(255, 255, 255, ${bubbleAlpha})`);
                    bubbleGrad.addColorStop(0.4, `rgba(186, 230, 253, ${bubbleAlpha * 0.80})`);
                    bubbleGrad.addColorStop(0.85, `rgba(56, 189, 248, ${bubbleAlpha * 0.45})`);
                    bubbleGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");

                    ctx.beginPath();
                    ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
                    ctx.fillStyle = bubbleGrad;
                    ctx.fill();

                    ctx.lineWidth = 0.6;
                    ctx.strokeStyle = `rgba(224, 242, 254, ${bubbleAlpha * 0.70})`;
                    ctx.stroke();
                }
            }

            // 2. Intracellular Lipid Inclusions (Warm amber-yellow translucent ballast globules)
            if (lipid > 1.2) {
                const lipidCount = Math.max(2, Math.min(4, Math.floor(lipid * 0.20)));
                const lipidAlpha = Math.min(0.60, 0.20 + lipid * 0.02);

                for (let l = 0; l < lipidCount; l++) {
                    const lAngle = (l / lipidCount) * Math.PI * 0.8 + Math.PI * 0.6;
                    const lDist = size * 0.55;
                    const lx = Math.cos(lAngle) * lDist;
                    const ly = Math.sin(lAngle) * lDist * 0.75; // Clustered in ventral/basal hemisphere
                    const lRadius = Math.max(1.0, Math.min(2.4, 1.0 + (lipid / 25.0) * 1.4));

                    ctx.beginPath();
                    ctx.arc(lx, ly, lRadius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(254, 240, 138, ${lipidAlpha})`;
                    ctx.fill();
                }
            }

            // 3. Upward Buoyant Effervescence Trail (Wake trailing below ascending cell)
            if (isUp) {
                const wakeLength = size * 2.2;
                const wakeGrad = ctx.createLinearGradient(0, size * 0.8, 0, size * 0.8 + wakeLength);
                wakeGrad.addColorStop(0.0, "rgba(186, 230, 253, 0.45)");
                wakeGrad.addColorStop(1.0, "rgba(56, 189, 248, 0.0)");

                ctx.lineWidth = 1.0;
                ctx.strokeStyle = wakeGrad;
                ctx.beginPath();
                ctx.moveTo(0, size * 0.8);
                ctx.lineTo(0, size * 0.8 + wakeLength);
                ctx.stroke();

                // Small rising micro-bubble particle
                if ((tick + (org.id || 0)) % 4 === 0) {
                    const effX = (Math.sin(tick * 0.15) * size * 0.4);
                    const effY = size * 0.9 + ((tick * 0.4) % wakeLength);
                    ctx.beginPath();
                    ctx.arc(effX, effY, 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(240, 249, 255, 0.65)";
                    ctx.fill();
                }
            }

            // 4. Downward Hydrodynamic Sink-Stream (Streaks trailing above descending cell)
            if (isDown) {
                const sinkLength = size * 2.0;
                const sinkGrad = ctx.createLinearGradient(0, -size * 0.8, 0, -size * 0.8 - sinkLength);
                sinkGrad.addColorStop(0.0, "rgba(14, 116, 144, 0.40)");
                sinkGrad.addColorStop(1.0, "rgba(8, 47, 73, 0.0)");

                ctx.lineWidth = 1.0;
                ctx.strokeStyle = sinkGrad;
                ctx.beginPath();
                ctx.moveTo(0, -size * 0.8);
                ctx.lineTo(0, -size * 0.8 - sinkLength);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TwilightOpticsRenderer;
    } else {
        global.TwilightOpticsRenderer = TwilightOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
