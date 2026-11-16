// BioEcosystem - Middle-Late Eocene Cetacean Secondary Aquatic Transition Optics
// Module: src/render/cetacean_optics.js
// Version: 9.07.0 (Hour 627 - Looks & UI Agent: Pachyosteosclerotic Bone Ballast, Caudal Fluke Thrust, Mandibular Acoustic Cones & 131st/132nd Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CetaceanOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Middle-Late Eocene Archaeocete adaptations:
     * - Pachyosteosclerotic Bone Ballast Radiance:
     *   Ocean steel blue (#0284c7 and #0369a1) dense mineralized ribcage and limb bone ballast halos,
     *   counteracting lung buoyancy to allow effortless benthic lurking.
     * - Dorsoventral Caudal Fluke Propulsion Waves:
     *   Marine cyan (#06b6d4 and #22d3ee) sinusoidal undulating spine and horizontal fluke blades,
     *   generating pulsating hydrodynamic thrust wake vortices.
     * - Mandibular Acoustic Fat Pad Receiver Rings:
     *   Concentric sound reception rings along the posterior dentary acoustic lipid pad,
     *   channeling high-velocity aquatic pressure waves to the tympanoperiotic bulla.
     * - Vestigial Decoupled Pelvic Fin Husks:
     *   Miniaturized, drag-minimized hindlimb flippers detached from the vertebral column.
     * - 131st Telemetry Channel (% CTI) Radiance: Ocean steel blue (#0284c7) ballast radiance.
     * - 132nd Telemetry Channel (% AUT) Radiance: Marine cyan (#06b6d4) caudal fluke thrust glow.
     */
    class CetaceanOpticsRenderer {
        /**
         * Render individual Archaeocete cetacean morphology, undulations, and auras.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawCetacean(ctx, org, tick) {
            if (!ctx || !org || org.isDead || org.alive === false) return;
            if (!org.isArchaeocete && !org.isAquaticUndulator) return;

            const size = org.dna ? (org.dna.size || 7.0) : 7.0;
            const bodyLen = 28.0 + size * 2.0;
            const bodyWidth = 12.0 + size * 1.1;

            const cti = (org.cetaceanTransitionIndex || 0.0) / 100.0;
            const aut = (org.aquaticUndulatingThrust || 0.0) / 100.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Ambient Telemetry Auras
            // 131st Channel (% CTI) Ocean Steel Blue Bone Ballast Aura
            if (org.isArchaeocete && cti > 0.25) {
                const ballastRadius = bodyWidth * 1.8;
                const ballastGrad = ctx.createRadialGradient(-bodyLen * 0.1, 0, 3, -bodyLen * 0.1, 0, ballastRadius);
                const ctiPulse = 0.12 + Math.sin(tick * 0.14 + (org.id || 0)) * 0.04;
                ballastGrad.addColorStop(0.0, "rgba(2, 132, 199, " + (ctiPulse * cti).toFixed(3) + ")");
                ballastGrad.addColorStop(0.60, "rgba(3, 105, 161, " + (ctiPulse * 0.45 * cti).toFixed(3) + ")");
                ballastGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");
                ctx.fillStyle = ballastGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.1, 0, ballastRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 132nd Channel (% AUT) Marine Cyan Caudal Thrust Wave Aura
            if (org.isAquaticUndulator && aut > 0.25) {
                const thrustRadius = bodyWidth * 1.6;
                const thrustGrad = ctx.createRadialGradient(-bodyLen * 0.45, 0, 2, -bodyLen * 0.45, 0, thrustRadius);
                const autPulse = 0.14 + Math.sin(tick * 0.18 + (org.id || 0)) * 0.05;
                thrustGrad.addColorStop(0.0, "rgba(6, 182, 212, " + (autPulse * aut).toFixed(3) + ")");
                thrustGrad.addColorStop(0.65, "rgba(34, 211, 238, " + (autPulse * 0.35 * aut).toFixed(3) + ")");
                thrustGrad.addColorStop(1.0, "rgba(6, 182, 212, 0.0)");
                ctx.fillStyle = thrustGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.45, 0, thrustRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Fusiform Marine Mammal Body & Pachyosteosclerotic Skeleton
            const phase = org.undulationPhase || 0.0;
            const undulAmp = Math.sin(phase) * (3.0 + aut * 3.5);

            // Dense Pachyostotic Ribcage & Vertebral Column
            if (org.isArchaeocete) {
                ctx.strokeStyle = "rgba(2, 132, 199, 0.85)";
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(bodyLen * 0.35, 0);
                ctx.lineTo(-bodyLen * 0.35, undulAmp * 0.5);
                ctx.stroke();

                // Ribcage crossbars (hyper-dense bone)
                const ribCount = 5;
                for (let r = 0; r < ribCount; r++) {
                    const rx = bodyLen * 0.22 - r * (bodyLen * 0.11);
                    const ry = (undulAmp * 0.5) * (1.0 - r / ribCount);
                    const rHeight = (bodyWidth * 0.65) * (1.0 - Math.abs(r - 2) * 0.2);

                    ctx.strokeStyle = "rgba(125, 211, 252, 0.75)";
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.moveTo(rx, ry - rHeight);
                    ctx.lineTo(rx, ry + rHeight);
                    ctx.stroke();
                }
            }

            // 3. Horizontal Caudal Fluke & Undulating Tail
            if (org.isAquaticUndulator) {
                const tailX = -bodyLen * 0.45;
                const tailY = undulAmp;
                const flukeSpan = (bodyWidth * 1.1) * (0.8 + aut * 0.4);

                ctx.save();
                ctx.translate(tailX, tailY);

                // Caudal Fluke Blades (Crescent Hydrofoil)
                ctx.fillStyle = "rgba(6, 182, 212, 0.85)";
                ctx.strokeStyle = "rgba(34, 211, 238, 0.95)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(-4.0, -flukeSpan * 0.6, -7.0, -flukeSpan);
                ctx.quadraticCurveTo(-1.0, -flukeSpan * 0.5, 2.0, 0);
                ctx.quadraticCurveTo(-1.0, flukeSpan * 0.5, -7.0, flukeSpan);
                ctx.quadraticCurveTo(-4.0, flukeSpan * 0.6, 0, 0);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Thrust Wake Vortices
                if (aut > 0.40) {
                    ctx.strokeStyle = "rgba(6, 182, 212, " + (0.35 * aut).toFixed(2) + ")";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(-8.0, -flukeSpan * 0.6, 3.5, 0, Math.PI * 2);
                    ctx.arc(-8.0, flukeSpan * 0.6, 3.5, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.restore();
            }

            // 4. Mandibular Acoustic Fat Pad & Underwater Hearing Rings
            if (org.isArchaeocete) {
                const jawX = bodyLen * 0.30;
                ctx.save();
                ctx.translate(jawX, 0);

                // Acoustic lipid channel on lower jaw
                ctx.fillStyle = "rgba(3, 105, 161, 0.90)";
                ctx.beginPath();
                ctx.moveTo(0, -bodyWidth * 0.35);
                ctx.lineTo(bodyLen * 0.15, 0);
                ctx.lineTo(0, bodyWidth * 0.35);
                ctx.closePath();
                ctx.fill();

                // Acoustic pressure wave conduction rings
                const hearingPulse = Math.sin(tick * 0.22 + (org.id || 0));
                ctx.strokeStyle = "rgba(56, 189, 248, " + (0.45 + hearingPulse * 0.2).toFixed(2) + ")";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.05, 0, 5.0, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.stroke();

                ctx.restore();
            }

            // 5. Reduced Decoupled Pelvic Fins
            if (org.isArchaeocete && org.pelvicReductionRatio !== undefined) {
                const red = org.pelvicReductionRatio;
                const finSize = (5.0 + size * 0.2) * (1.1 - red * 0.6);

                ctx.fillStyle = "rgba(2, 132, 199, 0.70)";
                ctx.beginPath();
                ctx.ellipse(-bodyLen * 0.25, -bodyWidth * 0.55, finSize, finSize * 0.4, -0.3, 0, Math.PI * 2);
                ctx.ellipse(-bodyLen * 0.25, bodyWidth * 0.55, finSize, finSize * 0.4, 0.3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render global pelagic cetacean atmospherics, underwater sunbeams, and acoustic waves.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawCetaceanAtmospherics(ctx, organisms, tick) {
            if (!ctx) return;
            const w = ctx.canvas ? ctx.canvas.width : 660;
            const h = ctx.canvas ? ctx.canvas.height : 660;

            // Deep Tethys pelagic water shimmer gradient in lower half
            const pelagicPulse = 0.035 + Math.sin(tick * 0.07) * 0.015;
            ctx.save();
            ctx.fillStyle = "rgba(2, 132, 199, " + pelagicPulse.toFixed(3) + ")";
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.85, w * 0.48, 0, Math.PI, false);
            ctx.fill();

            // Acoustic echo wave rings traveling in the water
            const waveCount = 3;
            for (let wv = 0; wv < waveCount; wv++) {
                const wx = w * 0.3 + wv * (w * 0.2) + Math.sin(tick * 0.03 + wv) * 12.0;
                const wy = h * 0.75 + Math.cos(tick * 0.04 + wv) * 8.0;
                const waveRadius = 15.0 + ((tick * 1.5 + wv * 30) % 65);
                const waveAlpha = Math.max(0.0, 0.22 * (1.0 - waveRadius / 65.0));

                ctx.strokeStyle = "rgba(6, 182, 212, " + waveAlpha.toFixed(3) + ")";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.arc(wx, wy, waveRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CetaceanOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.CetaceanOpticsRenderer = CetaceanOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
