// BioEcosystem - Upper Paleolithic Homo sapiens Cognitive Explosion & Advanced Ballistics Optics
// Module: src/render/sapiens_optics.js
// Version: 9.79.0 (Hour 699 - Looks & UI Agent: Atlatl Lever Vectors, High-Velocity Dart Trails, Eyed Needle Stitching & Parietal Cave Murals)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SapiensOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Upper Paleolithic Homo sapiens:
     * 1. Homo sapiens Morphology & Tailored Fur Parkas:
     *    - Graceful bipedal frame with slender, elongated limb proportions (#fef08a, #fde047, #eab308).
     *    - When hasTailoredGarment is true, renders a multi-layer insulative fur parka contour (rgba(254, 240, 138, 0.40))
     *      with delicate micro-stitch seam dashes (#fef9c3) preventing subzero arctic thermal dissipation.
     * 2. Atlatl Mechanical Spearthrower & Ballistic Arc Vectors:
     *    - When hasAtlatlSpearthrower is true, renders an ivory/antler spur lever (22-30 px) pivoted at the wrist
     *      holding an elongated, flexible projectile dart (36-48 px, #fde047).
     *    - When isThrowingAtlatl is true, high-velocity aerodynamic thrust rays (rgba(234, 179, 8, 0.95))
     *      and parabolic ballistic trajectory lines radiate forward up to 80-100 meters eq.
     * 3. Prismatic Microlithic Bladelet Knapping Sparks:
     *    - When isKnappingBladelets is true, razor-thin translucent micro-blade glints (rgba(253, 224, 71, 0.90))
     *      and golden pressure-flaking micro-sparks burst from the core.
     * 4. Eyed Bone Needle Tailoring & Sinew Thread Seams:
     *    - When isSewingGarment is true, fine sinew stitch pulses (rgba(254, 243, 199, 0.85))
     *      and needle perforation concentric ripples loop around the garment edges.
     * 5. Parietal Cave Artistry & Shamanic Animal Fresco Aura:
     *    - When isPaintingCaveMural is true or hasCreatedCaveMural is true, dynamic polychrome ochre
     *      and charcoal pigment mist (#991b1b, #dc2626, #b91c1c) paints stylized megafauna horns,
     *      bison profiles, and negative handprint stencils radiating as a soft symbolic halo.
     */
    class SapiensOpticsRenderer {
        /**
         * Render Upper Paleolithic Homo sapiens anatomical, ballistics, garment, and cave mural optics.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawSapiens(ctx, org, tick) {
            if (!ctx || !org || !org.isUpperPaleolithicSapiens) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 15.0;

            const isThrowing = !!org.isThrowingAtlatl;
            const hasAtlatl = !!org.hasAtlatlSpearthrower;
            const isKnapping = !!org.isKnappingBladelets;
            const isSewing = !!org.isSewingGarment;
            const hasGarment = !!org.hasTailoredGarment;
            const isPainting = !!org.isPaintingCaveMural;
            const hasMural = !!org.hasCreatedCaveMural;

            ctx.save();
            ctx.translate(x, y);

            // 1. Tailored Multi-Layer Fur Garment Thermal Insulation Aura
            if (hasGarment) {
                const pulse = 0.5 + 0.5 * Math.sin(t * 0.05 + (org.id || 0));
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius + 4.5 + pulse * 1.5, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(254, 240, 138, 0.45)";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([3, 2]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 2. Parietal Cave Art & Shamanic Ochre Mural Aura
            if (hasMural || isPainting) {
                const muralPulse = isPainting ? (0.7 + 0.3 * Math.sin(t * 0.15)) : 0.5;
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius + 7.0, 0, Math.PI * 2);
                ctx.strokeStyle = isPainting ? "rgba(220, 38, 38, 0.75)" : "rgba(153, 27, 27, 0.45)";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Stenciled handprint or animal horn accent arcs
                for (let a = 0; a < 3; a++) {
                    const arcAngle = (t * 0.02) + (a * (Math.PI * 2 / 3));
                    const ax = Math.cos(arcAngle) * (baseRadius + 8.5);
                    const ay = Math.sin(arcAngle) * (baseRadius + 8.5);
                    ctx.beginPath();
                    ctx.arc(ax, ay, 2.0, 0, Math.PI * 2);
                    ctx.fillStyle = isPainting ? "rgba(239, 68, 68, 0.90)" : "rgba(185, 28, 28, 0.60)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Eyed Bone Needle Sewing Ripples
            if (isSewing) {
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.arc(baseRadius * 0.6, 0, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 249, 195, 0.90)";
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(baseRadius * 0.6, -4.0);
                ctx.lineTo(baseRadius * 0.6, 4.0);
                ctx.strokeStyle = "rgba(254, 240, 138, 0.80)";
                ctx.lineWidth = 1.0;
                ctx.stroke();
                ctx.restore();
            }

            // 4. Prismatic Microlithic Bladelet Pressure Sparks
            if (isKnapping) {
                const sparkCount = 4;
                ctx.save();
                ctx.rotate(angle);
                for (let s = 0; s < sparkCount; s++) {
                    const sparkAngle = (s * Math.PI / 2) + Math.sin(t * 0.2 + s) * 0.4;
                    const dist = baseRadius + 3.0 + (s * 2.0);
                    const sx = Math.cos(sparkAngle) * dist;
                    const sy = Math.sin(sparkAngle) * dist;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(253, 224, 71, 0.95)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 5. Atlatl Spearthrower & Projectile Dart Ballistics
            if (hasAtlatl) {
                ctx.save();
                ctx.rotate(angle);

                // Atlatl spur lever arm (extends backward from hand/wrist)
                ctx.beginPath();
                ctx.moveTo(0, baseRadius * 0.5);
                ctx.lineTo(-baseRadius * 0.9, baseRadius * 0.7);
                ctx.strokeStyle = "rgba(254, 240, 138, 0.95)";
                ctx.lineWidth = 2.2;
                ctx.stroke();

                // Bone atlatl hook/spur at end
                ctx.beginPath();
                ctx.arc(-baseRadius * 0.9, baseRadius * 0.7, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = "#fef08a";
                ctx.fill();

                // Flexible long-range projectile dart resting along atlatl
                const dartLength = isThrowing ? 38.0 : 28.0;
                ctx.beginPath();
                ctx.moveTo(-baseRadius * 0.9, baseRadius * 0.7);
                ctx.lineTo(dartLength, 0);
                ctx.strokeStyle = "rgba(234, 179, 8, 0.90)";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Microlithic razor bladelet point at dart tip
                ctx.beginPath();
                ctx.moveTo(dartLength, 0);
                ctx.lineTo(dartLength - 4.0, -2.2);
                ctx.lineTo(dartLength - 4.0, 2.2);
                ctx.closePath();
                ctx.fillStyle = "#facc15";
                ctx.fill();

                // High-velocity forward launch kinetic force lines
                if (isThrowing) {
                    ctx.beginPath();
                    ctx.moveTo(dartLength + 2.0, 0);
                    ctx.lineTo(dartLength + 22.0, 0);
                    ctx.strokeStyle = "rgba(250, 204, 21, 0.95)";
                    ctx.lineWidth = 2.0;
                    ctx.stroke();

                    // Shockwave cones
                    ctx.beginPath();
                    ctx.moveTo(dartLength + 8.0, -4.0);
                    ctx.lineTo(dartLength + 16.0, 0);
                    ctx.lineTo(dartLength + 8.0, 4.0);
                    ctx.strokeStyle = "rgba(234, 179, 8, 0.70)";
                    ctx.lineWidth = 1.0;
                    ctx.stroke();
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    // Export module globally
    global.SapiensOpticsRenderer = SapiensOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
