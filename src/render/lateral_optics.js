// BioEcosystem - Lateral Line Neuromasts, Dermal Denticle Riblets & Hydrodynamic Vortex Optics
// Module: src/render/lateral_optics.js
// Version: 6.58.0 (Hour 378 - Looks Agent: Acoustic Damping Halos & Flexible Denticle Hinge Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * LateralOpticsRenderer
     * High-fidelity microscope rendering of fluid mechanoreception and surface hydrodynamics:
     * - Lateral line ciliated cupula neuromast pore arrays along cell flanks (drawNeuromastSensors)
     * - Biomimetic shark-like dermal denticle riblet scale textures and laminar sheen (drawDermalDenticles)
     * - Trailing hydrodynamic wake trails, double vortex spirals, and pressure rings (drawHydrodynamicWake)
     * - Schooling slipstream drafting corridors and kinetic suction vectors (drawSlipstreamDrafting)
     * - Acoustic pressure wave damping interference halos (drawAcousticWaveDamping)
     * - Flexible denticle micro-hinge articulations mitigating turning inertia (drawFlexibleDenticleHinges)
     * - Global fluid micro-displacement waves and ambient hydroacoustic turbulence
     */
    class LateralOpticsRenderer {
        static drawCellLateral(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const neuromasts = org.lateralNeuromasts || 0.0;
            const denticles = org.dermalDenticles || 0.0;
            const damping = org.laminarDragDamping || 0.0;
            const drafting = org.vortexDraftingBonus || 0.0;
            const acousticDamp = org.acousticWaveDamping || 0.0;
            const hinges = org.flexibleDenticleHinges || 0.0;

            if (neuromasts <= 0.8 && denticles <= 0.5 && drafting <= 0.02 && acousticDamp <= 0.15) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Acoustic wave damping vibrational interference halo
            if (acousticDamp > 0.15) {
                LateralOpticsRenderer.drawAcousticWaveDamping(ctx, org, size, acousticDamp, tick);
            }

            // 2. Dermal denticle riblet scale texture & laminar sheen
            if (denticles > 0.8) {
                LateralOpticsRenderer.drawDermalDenticles(ctx, org, size, denticles, damping, tick);
                if (hinges > 0.2) {
                    LateralOpticsRenderer.drawFlexibleDenticleHinges(ctx, org, size, hinges, tick);
                }
            }

            // 3. Slipstream vortex drafting corridor
            if (drafting > 0.04) {
                LateralOpticsRenderer.drawSlipstreamDrafting(ctx, org, size, drafting, tick);
            }

            // 4. Trailing hydrodynamic wake micro-vortices
            const speedSq = (org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0);
            if (speedSq > 0.35) {
                LateralOpticsRenderer.drawHydrodynamicWake(ctx, org, size, speedSq, tick);
            }

            // 5. Lateral line cupula neuromast pore nodes
            if (neuromasts > 1.0) {
                LateralOpticsRenderer.drawNeuromastSensors(ctx, org, size, neuromasts, tick);
            }

            ctx.restore();
        }

        static drawAcousticWaveDamping(ctx, org, size, acousticDamp, tick) {
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.18 + (org.id || 0));
            const haloRadius = size * (1.15 + acousticDamp * 0.35 + pulse * 0.12);
            const alpha = Math.min(0.42, acousticDamp * 0.55);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.setLineDash([2, 3]);
            ctx.stroke();

            // Inner harmonic interference ripple
            if (acousticDamp > 0.4) {
                ctx.beginPath();
                ctx.arc(0, 0, haloRadius * 0.78, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.setLineDash([1, 2]);
                ctx.stroke();
            }
            ctx.restore();
        }

        static drawFlexibleDenticleHinges(ctx, org, size, hinges, tick) {
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const alpha = Math.min(0.65, hinges * 0.85);

            ctx.save();
            ctx.rotate(angle);

            // Flexible micro-hinge nodes at anterior/posterior riblet base junctions
            ctx.fillStyle = `rgba(165, 180, 252, ${alpha})`;
            for (let side = -1; side <= 1; side += 2) {
                const hingeY = side * (size * 0.45);
                ctx.beginPath();
                ctx.arc(-size * 0.35, hingeY, 0.9, 0, Math.PI * 2);
                ctx.arc(size * 0.35, hingeY, 0.9, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        static drawNeuromastSensors(ctx, org, size, neuromasts, tick) {
            const poreCount = Math.min(8, Math.max(3, Math.floor(neuromasts * 0.65)));
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const pulse = 0.8 + 0.2 * Math.sin(tick * 0.14 + (org.id || 0));

            ctx.save();
            ctx.rotate(angle);

            const dispMag = (org.wakeDisplacementVector && org.wakeDisplacementVector.magnitude)
                ? org.wakeDisplacementVector.magnitude : 0.0;
            const sensoryGlow = Math.min(1.0, 0.4 + dispMag * 0.45);

            for (let side = -1; side <= 1; side += 2) {
                for (let i = 0; i < poreCount; i++) {
                    const normIdx = i / Math.max(1, poreCount - 1);
                    const posX = -size * 0.75 + normIdx * (size * 1.5);
                    const posY = side * (size * 0.92);

                    ctx.beginPath();
                    ctx.arc(posX, posY, 1.1, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(20, 184, 166, ${sensoryGlow * pulse})`;
                    ctx.fill();

                    if (dispMag > 0.3) {
                        ctx.beginPath();
                        ctx.arc(posX, posY, 2.4, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * sensoryGlow})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }

        static drawDermalDenticles(ctx, org, size, denticles, damping, tick) {
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const ribletCount = Math.min(6, Math.max(2, Math.floor(denticles * 0.75)));
            const alpha = Math.min(0.55, 0.15 + damping * 1.2);

            ctx.save();
            ctx.rotate(angle);

            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.7;

            for (let i = 0; i < ribletCount; i++) {
                const normOffset = -0.65 + (1.3 / Math.max(1, ribletCount - 1)) * i;
                const posY = normOffset * (size * 0.65);
                const spanX = Math.sqrt(Math.max(0, size * size - posY * posY)) * 0.85;

                ctx.beginPath();
                ctx.moveTo(-spanX * 0.75, posY);
                ctx.lineTo(spanX * 0.75, posY);
                ctx.stroke();

                if (damping > 0.15 && i % 2 === 0) {
                    ctx.beginPath();
                    ctx.arc(0, posY, 0.9, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(165, 180, 252, 0.6)";
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        static drawSlipstreamDrafting(ctx, org, size, drafting, tick) {
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const suctionLen = size * (1.6 + drafting * 2.2);
            const alpha = Math.min(0.65, drafting * 2.2);

            ctx.save();
            ctx.rotate(angle);

            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.setLineDash([3, 4]);

            ctx.beginPath();
            ctx.moveTo(size * 0.8, -size * 0.4);
            ctx.lineTo(size * 0.8 + suctionLen, -size * 0.2);
            ctx.moveTo(size * 0.8, size * 0.4);
            ctx.lineTo(size * 0.8 + suctionLen, size * 0.2);
            ctx.stroke();

            ctx.setLineDash([]);
            ctx.restore();
        }

        static drawHydrodynamicWake(ctx, org, size, speedSq, tick) {
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const speed = Math.sqrt(speedSq);
            const wakeLen = size * (1.2 + Math.min(2.0, speed * 0.8));
            const swirlRadius = size * (0.35 + Math.min(0.5, speed * 0.25));
            const alpha = Math.min(0.45, 0.10 + speed * 0.12);

            ctx.save();
            ctx.rotate(angle);

            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.8;

            const phase = tick * 0.22 + (org.id || 0);
            const leftSwirlX = -wakeLen + Math.sin(phase) * 2.0;
            const leftSwirlY = -swirlRadius * 1.5;

            ctx.beginPath();
            ctx.arc(leftSwirlX, leftSwirlY, swirlRadius, 0, Math.PI * 1.5);
            ctx.stroke();

            const rightSwirlX = -wakeLen * 1.25 + Math.cos(phase) * 2.0;
            const rightSwirlY = swirlRadius * 1.5;

            ctx.beginPath();
            ctx.arc(rightSwirlX, rightSwirlY, swirlRadius, Math.PI * 0.5, Math.PI * 2.0);
            ctx.stroke();

            ctx.restore();
        }

        static drawGlobalFluidDisplacements(ctx, organisms, width, height, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            ctx.save();
            ctx.strokeStyle = "rgba(20, 184, 166, 0.028)";
            ctx.lineWidth = 0.6;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || org.isDead) continue;

                const wake = org.wakeDisplacementVector;
                if (!wake || wake.magnitude <= 0.45) continue;

                const ringRadius = 18.0 + (tick * 0.4 + org.id) % 24.0;
                const ringAlpha = Math.max(0.0, 0.04 - (ringRadius / 42.0) * 0.04);

                ctx.beginPath();
                ctx.arc(org.x, org.y, ringRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(6, 182, 212, ${ringAlpha})`;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = LateralOpticsRenderer;
    } else {
        global.LateralOpticsRenderer = LateralOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
