// BioEcosystem - Hydrodynamic Siphon Jet Optics & Hyponome Vectoring Shaders
// Module: src/render/jet_optics.js
// Version: 5.48.0 (Hour 268 - Looks Agent: Steerable Hyponome Halos, Braking Waves & Cavitation Shimmer)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * JetOpticsRenderer
     * High-fidelity microscope rendering for cephalopod-grade steerable siphon jet propulsion:
     * - Elastic mantle cavity turgor expansion, contraction glow, and lactic exhaustion shimmer
     * - Articulated hyponome siphon nozzle with dynamic vectoring deflection halos
     * - Pressurized exhalant effluent water jet plume with core diamond shock nodes
     * - Anterior hydraulic reverse-braking crescent shockwaves shedding kinetic momentum
     * - Fluid cavitation wake with asymmetric micro-bubble trails and angled vortex rings
     * - Flank glide slipstreams during escape bursts and rapid deceleration
     */
    class JetOpticsRenderer {
        /**
         * Render elastic mantle cavity volume, contraction glow, and refractory fatigue shimmer.
         */
        static drawMantleCavity(ctx, org, size, tick) {
            const vol = typeof org.mantleVolume === "number" ? org.mantleVolume : 5.0;
            const pressure = typeof org.cavityPressure === "number" ? org.cavityPressure : 0.0;
            const fatigue = typeof org.jetFatigue === "number" ? org.jetFatigue : 0.0;
            const isFrozen = !!org.exhaustionFreeze;
            const volRatio = Math.max(0.1, Math.min(1.0, vol / 15.0));
            const pressureRatio = Math.min(1.0, pressure / 50.0);

            // Mantle cavity position in posterior half of cellular body
            const mx = -size * 0.22, my = 0.0;
            const rx = size * (0.35 + volRatio * 0.28), ry = size * (0.28 + volRatio * 0.22);
            const mantleGrad = ctx.createRadialGradient(mx, my, rx * 0.15, mx, my, rx);

            if (isFrozen || fatigue > 0.75) {
                // Lactic fatigue refractory cramp shimmer (subtle amethyst violet pulse)
                const pulse = 0.5 + 0.5 * Math.sin(tick * 0.2);
                const crampAlpha = 0.35 + fatigue * 0.35 * pulse;
                mantleGrad.addColorStop(0.0, `rgba(216, 180, 254, ${crampAlpha})`);
                mantleGrad.addColorStop(0.6, `rgba(168, 85, 247, ${crampAlpha * 0.7})`);
                mantleGrad.addColorStop(1.0, "rgba(107, 33, 168, 0.0)");
            } else if (pressureRatio > 0.20) {
                // High-pressure systolic contraction (amber-gold)
                const aAlpha = 0.30 + pressureRatio * 0.45;
                mantleGrad.addColorStop(0.0, `rgba(254, 240, 138, ${aAlpha})`);
                mantleGrad.addColorStop(0.55, `rgba(245, 158, 11, ${aAlpha * 0.75})`);
                mantleGrad.addColorStop(1.0, "rgba(217, 119, 6, 0.0)");
            } else {
                // Diastolic inhalant intake expansion (cerulean azure)
                const azAlpha = 0.18 + volRatio * 0.25;
                mantleGrad.addColorStop(0.0, `rgba(224, 242, 254, ${azAlpha})`);
                mantleGrad.addColorStop(0.60, `rgba(56, 189, 248, ${azAlpha * 0.70})`);
                mantleGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");
            }

            ctx.beginPath();
            ctx.ellipse(mx, my, rx, ry, 0, 0, Math.PI * 2);
            ctx.fillStyle = mantleGrad;
            ctx.fill();

            // Muscular sphincter ring with tension-adapted stroke
            ctx.beginPath();
            ctx.ellipse(mx, my, rx * 0.90, ry * 0.90, 0, 0, Math.PI * 2);
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = isFrozen ? "rgba(192, 132, 252, 0.75)" :
                (pressureRatio > 0.20 ? `rgba(245, 158, 11, ${0.40 + pressureRatio * 0.40})` : `rgba(56, 189, 248, ${0.25 + volRatio * 0.25})`);
            ctx.stroke();
        }

        /**
         * Render articulated hyponome siphon nozzle funnel with directional steering halos.
         */
        static drawHyponomeNozzle(ctx, org, size, relAngle) {
            ctx.save();
            ctx.rotate(relAngle);
            const baseDist = size * 0.82, nozzleLength = size * 0.44, nozzleWidth = size * 0.24;

            // Articulated muscular funnel cone
            ctx.beginPath();
            ctx.moveTo(baseDist, -nozzleWidth * 0.6);
            ctx.quadraticCurveTo(baseDist + nozzleLength * 0.4, -nozzleWidth * 0.45, baseDist + nozzleLength, -nozzleWidth * 0.3);
            ctx.lineTo(baseDist + nozzleLength, nozzleWidth * 0.3);
            ctx.quadraticCurveTo(baseDist + nozzleLength * 0.4, nozzleWidth * 0.45, baseDist, nozzleWidth * 0.6);
            ctx.closePath();
            ctx.fillStyle = org.reverseBrakingActive ? "rgba(239, 68, 68, 0.65)" : "rgba(14, 116, 144, 0.65)";
            ctx.fill();
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = org.reverseBrakingActive ? "rgba(252, 165, 165, 0.85)" : "rgba(56, 189, 248, 0.75)";
            ctx.stroke();

            // Circular exit orifice
            ctx.beginPath();
            ctx.ellipse(baseDist + nozzleLength, 0, nozzleWidth * 0.16, nozzleWidth * 0.3, 0, 0, Math.PI * 2);
            ctx.fillStyle = org.reverseBrakingActive ? "rgba(254, 226, 226, 0.90)" : "rgba(224, 242, 254, 0.85)";
            ctx.fill();

            // Directional hyponome vectoring halo arc showing steering orientation
            const deflection = typeof org.siphonDeflectionAngle === "number" ? org.siphonDeflectionAngle : 0.0;
            if (Math.abs(deflection) > 0.12) {
                ctx.beginPath();
                ctx.arc(baseDist + nozzleLength * 1.15, 0, nozzleWidth * 0.75, -Math.PI * 0.4, Math.PI * 0.4);
                ctx.lineWidth = 0.55;
                ctx.strokeStyle = "rgba(125, 211, 252, 0.55)";
                ctx.stroke();
            }
            ctx.restore();
        }

        /**
         * Render effluent water jet plume and anterior reverse braking shockwaves.
         */
        static drawJetPlume(ctx, org, size, relAngle, thrust, tick) {
            // 1. Anterior Hydraulic Reverse Braking Crescent Shockwaves
            if (org.reverseBrakingActive && thrust > 0.05) {
                const brakeAlpha = Math.min(0.85, 0.35 + thrust * 0.45);
                for (let k = 1; k <= 3; k++) {
                    ctx.beginPath();
                    ctx.arc(size * (0.95 + k * 0.32), 0, size * (0.60 + k * 0.28), -Math.PI * 0.32, Math.PI * 0.32);
                    ctx.lineWidth = 0.85 - k * 0.18;
                    ctx.strokeStyle = `rgba(254, 202, 202, ${brakeAlpha * (1.1 - k * 0.28)})`;
                    ctx.stroke();
                }
            }
            if (thrust < 0.02) return;

            ctx.save();
            ctx.rotate(relAngle);
            const nozzleTip = size * 1.26, plumeAlpha = Math.min(0.88, 0.25 + thrust * 0.36);
            const plumeLength = Math.max(14.0, Math.min(68.0, size * (1.25 + thrust * 1.85)));
            const plumeWidth = Math.max(6.0, Math.min(28.0, size * (0.35 + thrust * 0.45)));

            // High-velocity conical effluent displacement gradient
            const plumeGrad = ctx.createLinearGradient(nozzleTip, 0, nozzleTip + plumeLength, 0);
            plumeGrad.addColorStop(0.0, `rgba(248, 250, 252, ${plumeAlpha})`);
            plumeGrad.addColorStop(0.25, `rgba(56, 189, 248, ${plumeAlpha * 0.85})`);
            plumeGrad.addColorStop(0.70, `rgba(14, 116, 144, ${plumeAlpha * 0.40})`);
            plumeGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");

            ctx.beginPath();
            ctx.moveTo(nozzleTip, -size * 0.12);
            ctx.lineTo(nozzleTip + plumeLength, -plumeWidth);
            ctx.lineTo(nozzleTip + plumeLength, plumeWidth);
            ctx.lineTo(nozzleTip, size * 0.12);
            ctx.closePath();
            ctx.fillStyle = plumeGrad;
            ctx.fill();

            // Core shock diamond nodes
            if (thrust > 0.40) {
                const nodeCount = Math.min(3, Math.floor(thrust * 1.6));
                for (let n = 1; n <= nodeCount; n++) {
                    const nx = nozzleTip + (n / (nodeCount + 1)) * (plumeLength * 0.65);
                    const nw = (size * 0.15) * (1.0 - n * 0.25);
                    ctx.beginPath();
                    ctx.moveTo(nx - nw, 0);
                    ctx.lineTo(nx, -nw);
                    ctx.lineTo(nx + nw, 0);
                    ctx.lineTo(nx, nw);
                    ctx.closePath();
                    ctx.fillStyle = `rgba(255, 255, 255, ${plumeAlpha * 0.72})`;
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        /**
         * Render cavitation wake, trailing micro-bubbles, and angled vortex rings.
         */
        static drawCavitationWake(ctx, org, size, relAngle, thrust, tick) {
            if (!org.cavitationPlumeActive && thrust < 0.22) return;

            ctx.save();
            ctx.rotate(relAngle);
            const nozzleTip = size * 1.26, wakeAlpha = Math.min(0.75, 0.20 + thrust * 0.32);
            const bubbleCount = Math.max(3, Math.min(8, Math.floor(thrust * 3.5)));

            // Trailing cavitation micro-bubbles
            for (let b = 0; b < bubbleCount; b++) {
                const dist = nozzleTip + 6.0 + b * 6.5;
                const spread = (b / bubbleCount) * size * 0.45;
                const jitter = Math.sin(tick * 0.25 + b * 1.7) * spread;
                const bubbleR = Math.max(0.7, Math.min(2.0, 0.8 + (thrust * 0.4)));

                ctx.beginPath();
                ctx.arc(dist, jitter, bubbleR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(248, 250, 252, ${wakeAlpha * (1.0 - b / bubbleCount)})`;
                ctx.fill();
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = `rgba(186, 230, 253, ${wakeAlpha * 0.80})`;
                ctx.stroke();
            }

            // Expanding vortex ring arcs
            for (let r = 1; r <= 2; r++) {
                ctx.beginPath();
                ctx.ellipse(nozzleTip + r * 16.0, 0, size * 0.18, size * (0.35 + r * 0.25), 0, Math.PI * 0.35, Math.PI * 1.65);
                ctx.lineWidth = 0.7;
                ctx.strokeStyle = `rgba(56, 189, 248, ${wakeAlpha * 0.50})`;
                ctx.stroke();
            }
            ctx.restore();
        }

        /**
         * Render hydrodynamic streamline trails along flanks during high-velocity maneuvers.
         */
        static drawGlideSlipstream(ctx, org, size, thrust) {
            if (!org.jetBurstActive && !org.reverseBrakingActive && thrust < 0.45) return;
            const slipAlpha = Math.min(0.62, 0.22 + thrust * 0.25);
            ctx.lineWidth = 0.65;
            ctx.strokeStyle = org.reverseBrakingActive ? `rgba(254, 202, 202, ${slipAlpha})` : `rgba(186, 230, 253, ${slipAlpha})`;

            ctx.beginPath();
            ctx.moveTo(size * 0.82, -size * 0.75);
            ctx.lineTo(-size * 1.12, -size * 0.85);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(size * 0.82, size * 0.75);
            ctx.lineTo(-size * 1.12, size * 0.85);
            ctx.stroke();
        }

        /**
         * Primary render pass executed per organism draw cycle.
         */
        static drawCellJetOptics(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const vol = typeof org.mantleVolume === "number" ? org.mantleVolume : 0.0;
            const thrust = typeof org.jetThrustForce === "number" ? org.jetThrustForce : 0.0;
            const hasMantleDna = (org.dna && typeof org.dna.mantleElasticity === "number");

            if (vol < 0.5 && thrust < 0.01 && !hasMantleDna) return;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            const heading = Math.atan2(org.vy, org.vx);
            const nozzleAngle = typeof org.siphonAngle === "number" ? org.siphonAngle : (heading + Math.PI);
            const relAngle = nozzleAngle - heading;

            ctx.save();
            JetOpticsRenderer.drawMantleCavity(ctx, org, size, tick);
            JetOpticsRenderer.drawHyponomeNozzle(ctx, org, size, relAngle);
            JetOpticsRenderer.drawJetPlume(ctx, org, size, relAngle, thrust, tick);
            JetOpticsRenderer.drawCavitationWake(ctx, org, size, relAngle, thrust, tick);
            JetOpticsRenderer.drawGlideSlipstream(ctx, org, size, thrust);
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = JetOpticsRenderer;
    } else {
        global.JetOpticsRenderer = JetOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
