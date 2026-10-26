// BioEcosystem - Ventral Photophore Array, Silhouette Dissolution & Photon Veil Optics
// Module: src/render/counter_illumination_optics.js
// Version: 5.38.0 (Hour 258 - Looks Agent: Counter-Illumination Optics & Silhouette Concealment Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CounterIlluminationOpticsRenderer
     * High-fidelity microscope rendering for mesopelagic counter-illumination camouflage:
     * - Ventral photophore array emitting monochromatic 485 nm cyan bioluminescent points
     * - Downward conical photon curtain (downward photon veil) matching downwelling light
     * - Silhouette dissolution and edge softening shader eliminating dark upward contrast
     * - Dorsal ambient photometer sensor glimmer and calibration ring aesthetics
     */
    class CounterIlluminationOpticsRenderer {
        /**
         * Render ventral photophore lenses along the lower cellular margin.
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Organism entity.
         * @param {number} size - Effective cell radius.
         * @param {number} lum - Ventral emission intensity [0.0 - 1.0].
         * @param {number} tick - Simulation frame counter.
         */
        static drawVentralPhotophores(ctx, org, size, lum, tick) {
            const count = Math.max(2, Math.min(8, org.ventralPhotophoreCount || Math.round((org.dna.ventralPhotophoreDensity || 0.25) * size * 1.5)));
            const glowAlpha = Math.min(0.95, 0.20 + lum * 0.75);

            for (let i = 0; i < count; i++) {
                // Distribute photophores across the lower ventral perimeter (angle: PI*0.15 to PI*0.85)
                const norm = count > 1 ? i / (count - 1) : 0.5;
                const angle = Math.PI * 0.20 + norm * Math.PI * 0.60;
                const px = Math.cos(angle) * (size * 0.95);
                const py = Math.sin(angle) * (size * 0.95); // Positive y is ventral
                const lensRadius = Math.max(0.8, Math.min(2.2, 0.9 + size * 0.08));

                // Subtle quantum shimmer in photophore emission
                const shimmer = 0.92 + Math.sin(tick * 0.12 + i * 1.4) * 0.08;
                const activeAlpha = glowAlpha * shimmer;

                // Photophore core lens gradient
                const lensGrad = ctx.createRadialGradient(px, py, lensRadius * 0.1, px, py, lensRadius * 1.6);
                lensGrad.addColorStop(0.0, `rgba(255, 255, 255, ${activeAlpha})`);
                lensGrad.addColorStop(0.35, `rgba(224, 242, 254, ${activeAlpha * 0.85})`);
                lensGrad.addColorStop(0.75, `rgba(56, 189, 248, ${activeAlpha * 0.50})`);
                lensGrad.addColorStop(1.0, "rgba(2, 132, 199, 0.0)");

                ctx.beginPath();
                ctx.arc(px, py, lensRadius * 1.6, 0, Math.PI * 2);
                ctx.fillStyle = lensGrad;
                ctx.fill();

                // Microscopic sapphire bead lens rim
                ctx.beginPath();
                ctx.arc(px, py, lensRadius * 0.65, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 249, 255, ${activeAlpha * 0.90})`;
                ctx.fill();
            }
        }

        /**
         * Render downward conical photon veil matching downwelling water column irradiance.
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Organism entity.
         * @param {number} size - Effective cell radius.
         * @param {number} lum - Ventral emission intensity [0.0 - 1.0].
         * @param {number} tick - Simulation frame counter.
         */
        static drawDownwardPhotonVeil(ctx, org, size, lum, tick) {
            if (lum < 0.02) return;

            const veilLength = Math.max(12.0, Math.min(48.0, size * (1.6 + lum * 2.2)));
            const topHalfWidth = size * 0.85;
            const bottomHalfWidth = size * (1.4 + lum * 1.2);

            // Rhythmic micro-flutter in the downward photon veil
            const flutter = 1.0 + Math.sin(tick * 0.08 + (org.x || 0) * 0.05) * 0.05;
            const veilAlpha = Math.min(0.40, (0.08 + lum * 0.32) * flutter);

            // Linear downward attenuation gradient
            const veilGrad = ctx.createLinearGradient(0, size * 0.70, 0, size * 0.70 + veilLength);
            veilGrad.addColorStop(0.0, `rgba(56, 189, 248, ${veilAlpha})`);
            veilGrad.addColorStop(0.35, `rgba(34, 211, 238, ${veilAlpha * 0.75})`);
            veilGrad.addColorStop(0.75, `rgba(14, 116, 144, ${veilAlpha * 0.30})`);
            veilGrad.addColorStop(1.0, "rgba(3, 7, 18, 0.0)");

            ctx.beginPath();
            ctx.moveTo(-topHalfWidth, size * 0.70);
            ctx.lineTo(topHalfWidth, size * 0.70);
            ctx.lineTo(bottomHalfWidth, size * 0.70 + veilLength);
            ctx.lineTo(-bottomHalfWidth, size * 0.70 + veilLength);
            ctx.closePath();

            ctx.fillStyle = veilGrad;
            ctx.fill();

            // Downward ray streaks within the veil
            const rayCount = 3;
            for (let r = 0; r < rayCount; r++) {
                const rx = (-0.6 + (r / (rayCount - 1)) * 1.2) * size * 0.5;
                const rayGrad = ctx.createLinearGradient(rx, size * 0.8, rx * 1.8, size * 0.8 + veilLength * 0.85);
                rayGrad.addColorStop(0.0, `rgba(224, 242, 254, ${veilAlpha * 0.60})`);
                rayGrad.addColorStop(1.0, "rgba(56, 189, 248, 0.0)");

                ctx.strokeStyle = rayGrad;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(rx, size * 0.8);
                ctx.lineTo(rx * 1.8, size * 0.8 + veilLength * 0.85);
                ctx.stroke();
            }
        }

        /**
         * Render silhouette dissolution shader along the ventral rim to eliminate dark outline.
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Organism entity.
         * @param {number} size - Effective cell radius.
         * @param {number} concealment - Silhouette concealment score [0.0 - 1.0].
         */
        static drawSilhouetteDissolution(ctx, org, size, concealment) {
            if (concealment < 0.15) return;

            // Optical blur halo blending ventral boundary into ambient water
            const rimRadius = size * 1.05;
            const haloAlpha = Math.min(0.55, concealment * 0.50);

            const blurGrad = ctx.createRadialGradient(0, size * 0.40, size * 0.60, 0, size * 0.40, rimRadius * 1.25);
            blurGrad.addColorStop(0.0, "rgba(8, 47, 73, 0.0)");
            blurGrad.addColorStop(0.65, `rgba(56, 189, 248, ${haloAlpha * 0.65})`);
            blurGrad.addColorStop(0.90, `rgba(186, 230, 253, ${haloAlpha * 0.85})`);
            blurGrad.addColorStop(1.0, "rgba(8, 47, 73, 0.0)");

            ctx.save();
            ctx.beginPath();
            // Restrict clip region to ventral half of the cell
            ctx.rect(-rimRadius * 1.3, 0, rimRadius * 2.6, rimRadius * 1.3);
            ctx.clip();

            ctx.beginPath();
            ctx.arc(0, size * 0.40, rimRadius * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = blurGrad;
            ctx.fill();
            ctx.restore();
        }

        /**
         * Render dorsal photometer sensor glimmer sampling ambient downwelling irradiance.
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Organism entity.
         * @param {number} size - Effective cell radius.
         * @param {number} irradiance - Downwelling irradiance [0.0 - 1.0].
         * @param {number} tick - Simulation frame counter.
         */
        static drawDorsalPhotometer(ctx, org, size, irradiance, tick) {
            if (irradiance < 0.01) return;

            // Dorsal sensor located on the upper pole
            const py = -size * 0.90;
            const sensorR = Math.max(0.9, Math.min(2.2, 0.8 + size * 0.06));
            const sensorAlpha = Math.min(0.70, 0.15 + irradiance * 0.55);

            // Prismatic sampling pulse
            const sensorGrad = ctx.createRadialGradient(0, py, sensorR * 0.1, 0, py, sensorR * 1.5);
            sensorGrad.addColorStop(0.0, `rgba(255, 255, 255, ${sensorAlpha})`);
            sensorGrad.addColorStop(0.4, `rgba(103, 232, 249, ${sensorAlpha * 0.80})`);
            sensorGrad.addColorStop(0.85, `rgba(14, 116, 144, ${sensorAlpha * 0.40})`);
            sensorGrad.addColorStop(1.0, "rgba(2, 6, 23, 0.0)");

            ctx.beginPath();
            ctx.arc(0, py, sensorR * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = sensorGrad;
            ctx.fill();

            // Tiny reflective sensor lens
            ctx.beginPath();
            ctx.arc(0, py, sensorR * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(224, 242, 254, ${sensorAlpha * 0.95})`;
            ctx.fill();
        }

        /**
         * Render calibration ring when photometric match achieves high concealment (score >= 0.60).
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Organism entity.
         * @param {number} size - Effective cell radius.
         * @param {number} concealment - Silhouette concealment score [0.0 - 1.0].
         * @param {number} tick - Simulation frame counter.
         */
        static drawCalibrationAura(ctx, org, size, concealment, tick) {
            if (concealment < 0.60) return;

            const auraAlpha = Math.min(0.45, (concealment - 0.60) * 1.1);
            const pulse = 1.0 + Math.sin(tick * 0.10) * 0.04;
            const ringRadius = size * 1.15 * pulse;

            ctx.save();
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = `rgba(56, 189, 248, ${auraAlpha * 0.75})`;
            ctx.setLineDash([3, 3]);

            ctx.beginPath();
            // Draw calibration arc along the ventral perimeter
            ctx.arc(0, 0, ringRadius, Math.PI * 0.15, Math.PI * 0.85);
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Primary rendering dispatcher executed per organism draw pass.
         * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
         * @param {Object} org - Host organism entity.
         * @param {number} tick - Simulation frame counter.
         */
        static drawOrganismCounterIllumination(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const lum = typeof org.ventralLuminosity === "number" ? org.ventralLuminosity : 0.0;
            const concealment = typeof org.silhouetteConcealmentScore === "number" ? org.silhouetteConcealmentScore : 0.0;
            const density = (org.dna && typeof org.dna.ventralPhotophoreDensity === "number") ? org.dna.ventralPhotophoreDensity : 0.0;
            const irradiance = typeof org.dorsalIrradiance === "number" ? org.dorsalIrradiance : 0.0;

            if (lum < 0.01 && concealment < 0.05 && density < 0.05 && irradiance < 0.01) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            ctx.save();

            // 1. Downward Conical Photon Veil (Projects into water column below)
            CounterIlluminationOpticsRenderer.drawDownwardPhotonVeil(ctx, org, size, lum, tick);

            // 2. Silhouette Dissolution & Edge Blending
            CounterIlluminationOpticsRenderer.drawSilhouetteDissolution(ctx, org, size, concealment);

            // 3. Ventral Photophore Array (Luminescence emitters on belly)
            if (lum > 0.01 || density > 0.08) {
                CounterIlluminationOpticsRenderer.drawVentralPhotophores(ctx, org, size, lum, tick);
            }

            // 4. Dorsal Photometer Glimmer (Ambient light sensor on top pole)
            CounterIlluminationOpticsRenderer.drawDorsalPhotometer(ctx, org, size, irradiance, tick);

            // 5. High-Concealment Calibration Aura
            CounterIlluminationOpticsRenderer.drawCalibrationAura(ctx, org, size, concealment, tick);

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CounterIlluminationOpticsRenderer;
    } else {
        global.CounterIlluminationOpticsRenderer = CounterIlluminationOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
