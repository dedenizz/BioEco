// BioEcosystem - Bioluminescent Pulse Optics & Aphotic Synchronous Flash Shaders
// Module: src/render/bioluminescent_pulse_optics.js
// Version: 5.28.0 (Hour 248 - Looks Agent: Synchronous Light Pulses & Aphotic Radiance)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BioluminescentPulseOpticsRenderer
     * High-fidelity microscope rendering for deep-sea cold biological photon emission:
     * - Photophore gland emission nodes and dynamic cyan-azure (470nm) illumination fields
     * - Concentric aposematic flash shockwaves (burglar-alarm optical saturation)
     * - Synchronized swarm light cascade arcs between phase-locked peers
     * - Bathymetric aphotic light attenuation and particulate backscattering
     */
    class BioluminescentPulseOpticsRenderer {
        /**
         * Render individual cell photophore nodes, pulsating halos, and alarm bursts.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Object} org - Host organism.
         * @param {number} tick - Current simulation frame count.
         */
        static drawCellBioluminescence(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const lum = typeof org.currentLuminosity === "number" ? org.currentLuminosity : 0.0;
            const radius = typeof org.lightRadius === "number" ? org.lightRadius : 0.0;
            const isAlarm = Boolean(org.alarmBurstActive);
            const isFlashing = Boolean(org.isFlashing);
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            if (lum <= 0.02 && !isAlarm) return;

            ctx.save();

            // 1. Aposematic Burglar-Alarm Flash Burst (Sudden high-intensity optical shockwave)
            if (isAlarm) {
                const burstRadius = Math.max(radius, size * 7.5);
                const burstGrad = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, burstRadius);
                burstGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.95)");
                burstGrad.addColorStop(0.25, "rgba(186, 230, 253, 0.75)");
                burstGrad.addColorStop(0.60, "rgba(6, 182, 212, 0.35)");
                burstGrad.addColorStop(1.0, "rgba(14, 116, 144, 0.0)");

                ctx.beginPath();
                ctx.arc(0, 0, burstRadius, 0, Math.PI * 2);
                ctx.fillStyle = burstGrad;
                ctx.fill();

                // Concentric high-speed optical shockwave ring
                const shockProgress = (tick % 15) / 15.0;
                const ringRadius = size + shockProgress * (burstRadius - size);
                ctx.lineWidth = 1.8 * (1.0 - shockProgress);
                ctx.strokeStyle = `rgba(224, 242, 254, ${0.90 * (1.0 - shockProgress)})`;
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                // 2. Normal Rhythmic Bioluminescent Illumination Aura (470nm Cyan-Teal Photon Field)
                const haloRadius = Math.max(size * 1.4, radius);
                const haloAlpha = Math.min(0.65, lum * 0.70);

                const haloGrad = ctx.createRadialGradient(0, 0, size * 0.3, 0, 0, haloRadius);
                haloGrad.addColorStop(0.0, `rgba(165, 243, 252, ${haloAlpha * 0.90})`);
                haloGrad.addColorStop(0.40, `rgba(6, 182, 212, ${haloAlpha * 0.55})`);
                haloGrad.addColorStop(0.80, `rgba(14, 165, 233, ${haloAlpha * 0.20})`);
                haloGrad.addColorStop(1.0, "rgba(3, 105, 161, 0.0)");

                ctx.beginPath();
                ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
                ctx.fillStyle = haloGrad;
                ctx.fill();
            }

            // 3. Discrete Photophore Gland Nodes on Cell Periphery
            const nodeCount = Math.max(3, Math.min(8, Math.floor(size * 0.75)));
            const nodeAlpha = Math.min(1.0, 0.30 + lum * 0.70);
            ctx.fillStyle = isAlarm ? "rgba(255, 255, 255, 0.95)" : `rgba(103, 232, 249, ${nodeAlpha})`;

            for (let i = 0; i < nodeCount; i++) {
                const angle = (i / nodeCount) * Math.PI * 2 + (tick * 0.02);
                const nodeDist = size * 0.88;
                const nx = Math.cos(angle) * nodeDist;
                const ny = Math.sin(angle) * nodeDist;
                const nodeR = 1.0 + (isFlashing ? 0.6 : 0.0);

                ctx.beginPath();
                ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4. Central Bioluminescent Enzymatic Core Sparkle
            if (isFlashing || lum > 0.40) {
                const coreR = Math.max(1.2, size * 0.22 * lum);
                ctx.fillStyle = "rgba(240, 253, 250, 0.90)";
                ctx.beginPath();
                ctx.arc(0, 0, coreR, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render synchronized swarm light cascade arcs between phase-locked peer organisms.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} tick - Current simulation frame count.
         */
        static drawSwarmBioluminescentWaves(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length < 2) return;

            const maxLinkDistSq = 8100.0; // 90px maximum optical communication link distance

            ctx.save();

            for (let i = 0; i < organisms.length; i++) {
                const a = organisms[i];
                if (!a || !a.alive || a.y < 440.0) continue;

                const lumA = typeof a.currentLuminosity === "number" ? a.currentLuminosity : 0.0;
                if (lumA < 0.20 && !a.alarmBurstActive) continue;

                // Compare with local neighbors
                for (let j = i + 1; j < organisms.length; j++) {
                    const b = organisms[j];
                    if (!b || !b.alive || b.y < 440.0) continue;

                    const lumB = typeof b.currentLuminosity === "number" ? b.currentLuminosity : 0.0;
                    if (lumB < 0.20 && !b.alarmBurstActive) continue;

                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dsq = dx * dx + dy * dy;

                    if (dsq < maxLinkDistSq) {
                        const dist = Math.sqrt(dsq);
                        const linkProgress = 1.0 - (dist / 90.0);
                        const jointLum = (lumA + lumB) * 0.5;
                        const arcAlpha = Math.min(0.48, linkProgress * jointLum * 0.65);

                        if (arcAlpha > 0.04) {
                            // Bioluminescent resonance photon stream arc
                            const arcGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                            arcGrad.addColorStop(0.0, `rgba(6, 182, 212, ${arcAlpha * 0.85})`);
                            arcGrad.addColorStop(0.5, `rgba(165, 243, 252, ${arcAlpha * 1.2})`);
                            arcGrad.addColorStop(1.0, `rgba(14, 165, 233, ${arcAlpha * 0.85})`);

                            ctx.lineWidth = Math.max(0.6, 1.4 * linkProgress);
                            ctx.strokeStyle = arcGrad;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            
                            // Subtle sinusoidal vibrational curvature in communication arc
                            const midX = (a.x + b.x) * 0.5 + Math.sin(tick * 0.10 + i) * 3.5;
                            const midY = (a.y + b.y) * 0.5 + Math.cos(tick * 0.10 + j) * 3.5;
                            ctx.quadraticCurveTo(midX, midY, b.x, b.y);
                            ctx.stroke();

                            // Microscopic photon transfer particle traveling along arc
                            if ((tick + i + j) % 2 === 0) {
                                const particleProgress = ((tick * 0.035 + i * 0.2) % 1.0);
                                const px = a.x + (b.x - a.x) * particleProgress;
                                const py = a.y + (b.y - a.y) * particleProgress;

                                ctx.beginPath();
                                ctx.arc(px, py, 1.1, 0, Math.PI * 2);
                                ctx.fillStyle = "rgba(224, 242, 254, 0.85)";
                                ctx.fill();
                            }
                        }
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render dish-wide aphotic luminescence wash when deep-sea bioluminescence activity is high.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} width - Canvas width.
         * @param {number} height - Canvas height.
         * @param {number} tick - Current simulation frame count.
         */
        static drawAphoticBioluminescentWash(ctx, organisms, width, height, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            let totalAphoticLum = 0.0;
            let aphoticOrganisms = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (o && o.alive && o.y > 440.0) {
                    aphoticOrganisms++;
                    totalAphoticLum += (typeof o.currentLuminosity === "number" ? o.currentLuminosity : 0.0);
                }
            }

            if (aphoticOrganisms === 0 || totalAphoticLum < 1.0) return;

            const avgLum = totalAphoticLum / aphoticOrganisms;
            if (avgLum <= 0.05) return;

            ctx.save();
            // Subtle oceanic azure bloom across the trench floor
            const washAlpha = Math.min(0.12, avgLum * 0.18);
            const washGrad = ctx.createLinearGradient(0, 440.0, 0, height);
            washGrad.addColorStop(0.0, "rgba(6, 182, 212, 0.0)");
            washGrad.addColorStop(0.65, `rgba(8, 145, 178, ${washAlpha * 0.6})`);
            washGrad.addColorStop(1.0, `rgba(14, 116, 144, ${washAlpha})`);

            ctx.fillStyle = washGrad;
            ctx.fillRect(0, 440.0, width, height - 440.0);
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BioluminescentPulseOpticsRenderer;
    } else {
        global.BioluminescentPulseOpticsRenderer = BioluminescentPulseOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
