// BioEcosystem - Late Pleistocene Canis lupus familiaris Symbiosis & Bow and Arrow Optics
// Module: src/render/canis_optics.js
// Version: 9.84.0 (Hour 704 - Looks & UI Agent: Hunting Canine Companions, Olfactory Trail Pulses, Tension Bow Arcs & Fletched Arrow Vectors)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CanisOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Late Pleistocene Canis lupus familiaris symbiosis & archery:
     * 1. Companion Domestic Canine (Canis lupus familiaris) Morphology:
     *    - When hasCanineCompanion is true, renders a companion canid running beside the hunter (#94a3b8, #cbd5e1, #64748b).
     *    - Compact curved tail, pointed erect ears, and agile quadruped stride offset from the human cell center.
     * 2. Olfactory Tracking Trails & Scent Particle Pulses:
     *    - When isDogTracking is true, radiating golden-amber scent wavelets (rgba(245, 158, 11, 0.85))
     *      and olfactory sweep arcs project forward along the heading vector toward game.
     * 3. Sentinel Alert & Nocturnal Barking Warning Rings:
     *    - When isSentinelAlerting is true, concentric acoustic shockwave rings (rgba(100, 116, 139, 0.75))
     *      pulse outward from the canine companion, deterring approaching predators.
     * 4. Three-Dog Night Communal Thermal Halos:
     *    - When hasCanineCompanion is true, a warm amber-charcoal thermal boundary (rgba(245, 158, 11, 0.35))
     *      envelops the dual human-canine pair, signifying reciprocal body warmth against arctic LGM blizzards.
     * 5. Tension Bow & Arrow Ballistic Vectors:
     *    - When hasBowAndArrow is true, renders a curved yew/elm stave arc (24-32 px, #16a34a, #22c55e) with a taut sinew string.
     *    - When isArcheryShooting is true, a high-velocity fletched arrow projectile ray (rgba(34, 197, 94, 0.95))
     *      with dual goose-feather stabilizers and geometric microlith tip darts forward across the canvas.
     */
    class CanisOpticsRenderer {
        /**
         * Render companion canine, scent tracking, sentinel alert, and bow & arrow optics.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawCanis(ctx, org, tick) {
            if (!ctx || !org) return;

            const hasDog = !!org.hasCanineCompanion;
            const hasBow = !!org.hasBowAndArrow;

            if (!hasDog && !hasBow) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 15.0;

            const isTracking = !!org.isDogTracking;
            const isAlerting = !!org.isSentinelAlerting;
            const isShooting = !!org.isArcheryShooting;

            ctx.save();
            ctx.translate(x, y);

            // 1. Companion Domestic Canine Rendering
            if (hasDog) {
                // Canine position: trailing slightly to the flank
                const dogAngle = angle - 0.75;
                const dogDist = baseRadius + 10.0;
                const dogX = Math.cos(dogAngle) * dogDist;
                const dogY = Math.sin(dogAngle) * dogDist;

                ctx.save();
                ctx.translate(dogX, dogY);
                ctx.rotate(angle);

                // Dog body: slender quadruped torso
                ctx.beginPath();
                ctx.ellipse(0, 0, 7.5, 4.0, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(100, 116, 139, 0.90)";
                ctx.fill();
                ctx.strokeStyle = "#cbd5e1";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Dog head & pointed muzzle
                ctx.beginPath();
                ctx.arc(6.0, 0, 3.2, 0, Math.PI * 2);
                ctx.fillStyle = "#64748b";
                ctx.fill();

                // Pointed erect ears
                ctx.beginPath();
                ctx.moveTo(5.0, -2.5);
                ctx.lineTo(7.0, -5.5);
                ctx.lineTo(8.0, -2.0);
                ctx.fillStyle = "#94a3b8";
                ctx.fill();

                // Curved lupine tail
                ctx.beginPath();
                ctx.moveTo(-6.5, 0);
                ctx.quadraticCurveTo(-9.0, -4.0, -11.0, -2.5);
                ctx.strokeStyle = "#94a3b8";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Scent tracking wavelets
                if (isTracking) {
                    const waveR = 8.0 + (t % 15) * 1.2;
                    ctx.beginPath();
                    ctx.arc(8.0, 0, waveR, -0.6, 0.6);
                    ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }

                // Sentinel warning alert shockwaves
                if (isAlerting) {
                    const alertPulse = (t % 20) / 20;
                    ctx.beginPath();
                    ctx.arc(0, 0, 12.0 + alertPulse * 18.0, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(148, 163, 184, ${0.8 - alertPulse * 0.7})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                ctx.restore();

                // Three-Dog Night mutual thermal boundary halo
                ctx.save();
                ctx.beginPath();
                ctx.ellipse(dogX * 0.5, dogY * 0.5, baseRadius + 12.0, baseRadius + 8.0, dogAngle, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(245, 158, 11, 0.30)";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([4, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 2. Tension Bow & Arrow Ballistics Rendering
            if (hasBow) {
                ctx.save();
                ctx.rotate(angle);

                // Curved yew/elm bow stave arc
                ctx.beginPath();
                ctx.arc(baseRadius * 0.4, 0, baseRadius * 0.85, -Math.PI / 2.4, Math.PI / 2.4);
                ctx.strokeStyle = "rgba(34, 197, 94, 0.95)";
                ctx.lineWidth = 2.0;
                ctx.stroke();

                // Taut tendon bowstring chord
                const bx = baseRadius * 0.4 + Math.cos(-Math.PI / 2.4) * (baseRadius * 0.85);
                const by1 = Math.sin(-Math.PI / 2.4) * (baseRadius * 0.85);
                const by2 = Math.sin(Math.PI / 2.4) * (baseRadius * 0.85);

                ctx.beginPath();
                if (isShooting) {
                    // String pulled back at nock point
                    ctx.moveTo(bx, by1);
                    ctx.lineTo(bx - 6.0, 0);
                    ctx.lineTo(bx, by2);
                } else {
                    ctx.moveTo(bx, by1);
                    ctx.lineTo(bx, by2);
                }
                ctx.strokeStyle = "rgba(254, 240, 138, 0.85)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Arrow projectile shaft & flight ray
                const arrowLength = isShooting ? 34.0 : 24.0;
                ctx.beginPath();
                ctx.moveTo(isShooting ? (bx - 6.0) : bx, 0);
                ctx.lineTo(bx + arrowLength, 0);
                ctx.strokeStyle = "rgba(22, 163, 74, 0.95)";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Goose-feather fletching stabilizers
                ctx.beginPath();
                ctx.moveTo(bx + 2.0, -2.2);
                ctx.lineTo(bx + 6.0, 0);
                ctx.lineTo(bx + 2.0, 2.2);
                ctx.strokeStyle = "rgba(240, 253, 244, 0.85)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Geometric microlithic razor arrow point
                ctx.beginPath();
                ctx.moveTo(bx + arrowLength, 0);
                ctx.lineTo(bx + arrowLength - 3.5, -2.0);
                ctx.lineTo(bx + arrowLength - 3.5, 2.0);
                ctx.closePath();
                ctx.fillStyle = "#86efac";
                ctx.fill();

                // High-velocity flight streak lines
                if (isShooting) {
                    ctx.beginPath();
                    ctx.moveTo(bx + arrowLength + 2.0, 0);
                    ctx.lineTo(bx + arrowLength + 20.0, 0);
                    ctx.strokeStyle = "rgba(74, 222, 128, 0.90)";
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    // Export module globally
    global.CanisOpticsRenderer = CanisOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
