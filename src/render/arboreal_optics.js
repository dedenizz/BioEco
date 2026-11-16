// BioEcosystem - Early Tertiary Mammalian Arboreal Grasping & Stereoscopic Vision Optics
// Module: src/render/arboreal_optics.js
// Version: 9.01.0 (Hour 621 - Looks & UI Agent: Opposable Grasping Highlights, Canopy Branch Textures, Stereoscopic Disparity Cones & 129th/130th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ArborealOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Tertiary Primatomorph adaptations:
     * - Opposable Hallux / Pollex Grasping Highlights:
     *   Tropical emerald green (#059669 and #10b981) digit pads and rotatable thumb/great-toe halos
     *   showing rotational grasping torque against fine terminal twigs.
     * - Keratinized Flat Nails & Apical Tactile Pads:
     *   Pearly mint (#a7f3d0) flat nail dorsal shields providing counter-pressure support to sensitive pads.
     * - Stereoscopic Binocular Vision Cones:
     *   Deep lapis indigo (#4f46e5) overlapping visual field cones emerging from anteriorly directed orbits,
     *   displaying three-dimensional stereoscopic disparity convergence zones.
     * - Sub-Millimeter Canopy Jump Trajectory Shimmer:
     *   Transient cyan-violet (#818cf8) leap vectors and target branch precision locks.
     * - 129th Telemetry Channel (% BVI) Radiance: Deep Lapis Indigo (#4f46e5) visual cortex halo.
     * - 130th Telemetry Channel (% OGI) Radiance: Tropical Emerald Green (#059669) prehensile grasping aura.
     */
    class ArborealOpticsRenderer {
        /**
         * Render individual Primatomorph arboreal grasping and stereoscopic optics.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawArboreal(ctx, org, tick) {
            if (!ctx || !org || org.isDead || org.alive === false) return;
            if (!org.isArboreal && !org.isStereoCapable) return;

            const size = org.dna ? (org.dna.size || 7.0) : 7.0;
            const bodyLen = 22.0 + size * 1.5;
            const bodyWidth = 10.0 + size * 0.9;

            const bvi = (org.binocularVisionIndex || 0.0) / 100.0;
            const ogi = (org.opposableGraspingIndex || 0.0) / 100.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Ambient Telemetry Auras
            // 130th Channel (% OGI) Tropical Emerald Prehensile Aura
            if (org.isArboreal && ogi > 0.25) {
                const graspAuraRadius = bodyWidth * 1.75;
                const graspGrad = ctx.createRadialGradient(-bodyLen * 0.15, 0, 2, -bodyLen * 0.15, 0, graspAuraRadius);
                const ogiPulse = 0.12 + Math.sin(tick * 0.15 + (org.id || 0)) * 0.04;
                graspGrad.addColorStop(0.0, "rgba(5, 150, 105, " + (ogiPulse * ogi).toFixed(3) + ")");
                graspGrad.addColorStop(0.55, "rgba(16, 185, 129, " + (ogiPulse * 0.40 * ogi).toFixed(3) + ")");
                graspGrad.addColorStop(1.0, "rgba(5, 150, 105, 0.0)");
                ctx.fillStyle = graspGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.15, 0, graspAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 129th Channel (% BVI) Deep Lapis Binocular Vision Cone
            if (org.isStereoCapable && bvi > 0.25) {
                const convAngle = ((org.orbitalConvergenceAngle || 70.0) / 180.0) * Math.PI;
                const coneDist = 32.0 + bvi * 24.0;
                const halfSpread = convAngle * 0.45;

                ctx.save();
                ctx.translate(bodyLen * 0.38, 0);

                const bviPulse = 0.14 + Math.sin(tick * 0.18 + (org.id || 0)) * 0.05;
                const visionGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, coneDist);
                visionGrad.addColorStop(0.0, "rgba(79, 70, 229, " + (bviPulse * bvi).toFixed(3) + ")");
                visionGrad.addColorStop(0.65, "rgba(99, 102, 241, " + (bviPulse * 0.35 * bvi).toFixed(3) + ")");
                visionGrad.addColorStop(1.0, "rgba(79, 70, 229, 0.0)");

                ctx.fillStyle = visionGrad;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, coneDist, -halfSpread, halfSpread, false);
                ctx.closePath();
                ctx.fill();

                // Binocular Disparity Target Reticle
                if (bvi > 0.65) {
                    ctx.strokeStyle = "rgba(129, 140, 248, " + (0.35 * bvi).toFixed(2) + ")";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(coneDist * 0.75, 0, 4.0, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.restore();
            }

            // 2. Opposable Digits & Flat Nails Morphology
            if (org.isArboreal) {
                const halluxAngle = ((org.halluxDivergenceAngle || 78.0) / 180.0) * Math.PI * 0.5;
                const digitLen = 5.5 + size * 0.35;

                // Forelimb Opposable Pollex (Left & Right hands)
                const handOffsets = [bodyWidth * 0.75, -bodyWidth * 0.75];
                for (let h = 0; h < 2; h++) {
                    const side = handOffsets[h];
                    const sign = h === 0 ? 1 : -1;

                    ctx.save();
                    ctx.translate(bodyLen * 0.22, side);

                    // Opposable thumb projecting inwards at divergence angle
                    ctx.strokeStyle = "rgba(5, 150, 105, 0.85)";
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-Math.cos(halluxAngle) * digitLen, sign * Math.sin(halluxAngle) * digitLen);
                    ctx.stroke();

                    // Flat nail dorsal shield
                    ctx.fillStyle = "rgba(167, 243, 208, 0.90)";
                    ctx.beginPath();
                    ctx.arc(-Math.cos(halluxAngle) * digitLen, sign * Math.sin(halluxAngle) * digitLen, 1.4, 0, Math.PI * 2);
                    ctx.fill();

                    // Main grasping digits (2 - 4)
                    ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(digitLen * 0.9, sign * 2.0);
                    ctx.lineTo(digitLen * 1.1, sign * 0.5);
                    ctx.stroke();

                    ctx.restore();
                }

                // Hindlimb Opposable Hallux (Left & Right prehensile feet)
                for (let h = 0; h < 2; h++) {
                    const side = handOffsets[h];
                    const sign = h === 0 ? 1 : -1;

                    ctx.save();
                    ctx.translate(-bodyLen * 0.28, side * 0.95);

                    // Large divergent hallux (great toe)
                    ctx.strokeStyle = "rgba(16, 185, 129, 0.90)";
                    ctx.lineWidth = 2.0;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-Math.cos(halluxAngle * 1.1) * (digitLen * 1.2), sign * Math.sin(halluxAngle * 1.1) * (digitLen * 1.2));
                    ctx.stroke();

                    // Keratinized nail shield on great toe
                    ctx.fillStyle = "rgba(209, 250, 229, 0.95)";
                    ctx.beginPath();
                    ctx.arc(-Math.cos(halluxAngle * 1.1) * (digitLen * 1.2), sign * Math.sin(halluxAngle * 1.1) * (digitLen * 1.2), 1.8, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            }

            // 3. Forward-Facing Anterior Orbits (Binocular Eyes)
            if (org.isStereoCapable) {
                const eyeSpread = bodyWidth * 0.38;
                ctx.save();
                ctx.translate(bodyLen * 0.36, 0);

                for (let e = -1; e <= 1; e += 2) {
                    const eyeY = e * eyeSpread;

                    // Orbital eye base
                    ctx.fillStyle = "rgba(30, 27, 75, 0.90)";
                    ctx.beginPath();
                    ctx.arc(0, eyeY, 2.4, 0, Math.PI * 2);
                    ctx.fill();

                    // Forward-convergent pupil
                    ctx.fillStyle = "rgba(99, 102, 241, 0.95)";
                    ctx.beginPath();
                    ctx.arc(0.7, eyeY, 1.3, 0, Math.PI * 2);
                    ctx.fill();

                    // High-acuity stereoscopic glint
                    ctx.fillStyle = "rgba(224, 231, 255, 0.95)";
                    ctx.beginPath();
                    ctx.arc(1.1, eyeY - 0.5, 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 4. Leap Trajectory Shimmer
            if (org.branchJumpCooldown !== undefined && org.branchJumpCooldown > 1.8) {
                ctx.strokeStyle = "rgba(129, 140, 248, 0.65)";
                ctx.setLineDash([2, 3]);
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(bodyLen * 1.8, 0);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.restore();
        }

        /**
         * Render global canopy atmospherics, vine silhouettes, and fruit sparkles.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawArborealAtmospherics(ctx, organisms, tick) {
            if (!ctx) return;
            const w = ctx.canvas ? ctx.canvas.width : 660;
            const h = ctx.canvas ? ctx.canvas.height : 660;

            // Subtle canopy foliage micro-shimmer along top edge of dish
            const foliagePulse = 0.035 + Math.sin(tick * 0.08) * 0.015;
            ctx.save();
            ctx.fillStyle = "rgba(5, 150, 105, " + foliagePulse.toFixed(3) + ")";
            ctx.beginPath();
            ctx.arc(w * 0.5, h * 0.15, w * 0.45, 0, Math.PI, true);
            ctx.fill();

            // Ripe canopy fruit cluster sparks
            const fruitCount = 5;
            for (let f = 0; f < fruitCount; f++) {
                const fx = w * 0.25 + f * (w * 0.12) + Math.sin(tick * 0.04 + f) * 8.0;
                const fy = h * 0.12 + Math.cos(tick * 0.05 + f) * 6.0;
                const sparkAlpha = 0.25 + Math.sin(tick * 0.2 + f * 1.7) * 0.18;

                ctx.fillStyle = "rgba(251, 146, 60, " + sparkAlpha.toFixed(3) + ")";
                ctx.beginPath();
                ctx.arc(fx, fy, 2.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ArborealOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.ArborealOpticsRenderer = ArborealOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
