// BioEcosystem - Pleistocene Early Homo Pyrotechnic & Acheulean Lithic Optics & Animation Shaders
// Module: src/render/pyrotechnic_optics.js
// Version: 9.67.0 (Hour 687 - Looks & UI Agent: Hearth Fire Auras, Acheulean Handaxe Sparkles, Cooking Smoke & Perspiration Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PyrotechnicOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Homo (Homo erectus / ergaster):
     * 1. Homo Morphology (Homo erectus / ergaster):
     *    - Elongated striding limbs, tall upright spinal axis, expanded cranial vault (#dc2626, #ea580c, #c2410c).
     *    - Opposable precision-power grip nodes and Acheulean teardrop handaxe silhouette.
     * 2. Teardrop Acheulean Biface Handaxe Shaders & Flaking Sparks:
     *    - When hasAcheuleanBiface is true, renders a symmetrical teardrop/almond handaxe icon (#dc2626, #f87171)
     *      with sharp bifacial flaking ridges and glint highlights.
     *    - When isButchering is true, micro-flaking percussion sparks (rgba(220, 38, 38, 0.90))
     *      burst around carcass contact points, accelerating disarticulation.
     * 3. Pyrotechnic Hearth Fire Auras & Thermal Cooking Smoke:
     *    - When isCooking is true, pulsating hearth flame auras (rgba(234, 88, 12, 0.85) to rgba(251, 146, 60, 0.25))
     *      emanate outward with rising pyrotechnic thermal convection smoke particles (rgba(148, 163, 184, 0.45)).
     *    - Denatured collagen & gelatinized starch radiant auras indicating digestive energy sparing.
     * 4. Eccrine Perspiration Mist & Thermal Homeostasis Shaders:
     *    - When isPerspiring is true, microscopic evaporative cooling vapor droplets (rgba(56, 189, 248, 0.60))
     *      surround the body, maintaining 37.0 C homeostasis during high-noon solar tracking.
     * 5. Persistence Hunting Endurance Trajectory:
     *    - When isPersistenceHunting is true, rhythmic gait stride ripples and target tracking lines
     *      demonstrating cursorial endurance pursuit until prey hyperthermic collapse.
     */
    class PyrotechnicOpticsRenderer {
        /**
         * Render Homo anatomical structures, teardrop handaxes, hearth fire, and evaporative perspiration.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawHomo(ctx, org, tick) {
            if (!ctx || !org || !org.isHomo) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 14.0;
            const hasBiface = !!org.hasAcheuleanBiface;
            const isButchering = !!org.isButchering;
            const isCooking = !!org.isCooking;
            const isPerspiring = !!org.isPerspiring;
            const isHunting = !!org.isPersistenceHunting;

            ctx.save();
            ctx.translate(x, y);

            // 1. Pyrotechnic Hearth Flame Aura & Thermal Smoke Particles (Cooking)
            if (isCooking) {
                const firePulse = 0.5 + 0.5 * Math.sin(t * 0.25 + (org.id || 0));
                const fireRadius = baseRadius * (1.6 + 0.4 * firePulse);

                // Hearth ember core
                const gradFire = ctx.createRadialGradient(0, 0, baseRadius * 0.2, 0, 0, fireRadius);
                gradFire.addColorStop(0.0, "rgba(254, 215, 170, 0.90)"); // Bright hearth core
                gradFire.addColorStop(0.35, "rgba(234, 88, 12, 0.75)"); // Thermal flame
                gradFire.addColorStop(0.70, "rgba(220, 38, 38, 0.40)"); // Volcanic crimson rim
                gradFire.addColorStop(1.0, "rgba(220, 38, 38, 0.0)");

                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, fireRadius, 0, Math.PI * 2);
                ctx.fillStyle = gradFire;
                ctx.fill();
                ctx.restore();

                // Rising thermal smoke particles
                for (let i = 0; i < 4; i++) {
                    const smokePhase = ((t * 0.08 + i * 1.57 + (org.id || 0)) % 3.14);
                    const smokeDist = baseRadius * (0.8 + smokePhase * 0.8);
                    const smokeAngle = -Math.PI * 0.5 + Math.sin(t * 0.1 + i) * 0.4;
                    const sx = Math.cos(smokeAngle) * smokeDist;
                    const sy = Math.sin(smokeAngle) * smokeDist;
                    const smokeAlpha = Math.max(0.0, (1.0 - smokePhase / 3.14) * 0.45);

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(sx, sy, 2.5 + smokePhase * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(148, 163, 184, " + smokeAlpha.toFixed(3) + ")";
                    ctx.fill();
                    ctx.restore();
                }
            }

            // 2. Eccrine Perspiration Mist & Evaporative Cooling Ring
            if (isPerspiring || speed > 1.8) {
                const sweatPulse = 0.5 + 0.5 * Math.cos(t * 0.3 + (org.id || 0));
                const mistRadius = baseRadius * (1.3 + 0.2 * sweatPulse);

                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, mistRadius, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(56, 189, 248, 0.40)"; // Pale cyan evaporative cooling
                ctx.lineWidth = 1.2;
                ctx.setLineDash([2, 3]);
                ctx.stroke();

                // Micro perspiration droplets
                for (let j = 0; j < 3; j++) {
                    const dropAngle = (t * 0.05 + j * 2.09) % (Math.PI * 2);
                    const dx = Math.cos(dropAngle) * mistRadius;
                    const dy = Math.sin(dropAngle) * mistRadius;
                    ctx.beginPath();
                    ctx.arc(dx, dy, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.70)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Persistence Hunting Stride Waves
            if (isHunting) {
                const huntPulse = 0.5 + 0.5 * Math.sin(t * 0.35);
                const strideDist = baseRadius * 1.8;

                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.arc(0, 0, strideDist, -0.4, 0.4);
                ctx.strokeStyle = "rgba(234, 88, 12, " + (0.35 + 0.35 * huntPulse).toFixed(3) + ")";
                ctx.lineWidth = 1.8;
                ctx.stroke();
                ctx.restore();
            }

            // 4. Teardrop Acheulean Biface Handaxe (Damla El Baltasi)
            if (hasBiface) {
                ctx.save();
                ctx.rotate(angle);

                // Offset to dominant hand / forward tool grip
                const toolX = baseRadius * 0.65;
                const toolY = baseRadius * 0.35;

                ctx.translate(toolX, toolY);

                // Draw symmetrical teardrop / amygdaloid biface
                ctx.beginPath();
                // Sharp distal tip
                ctx.moveTo(7.0, 0.0);
                // Convex lateral cutting edge (dorsal)
                ctx.bezierCurveTo(4.0, -4.5, -3.0, -5.0, -5.5, 0.0);
                // Convex lateral cutting edge (ventral)
                ctx.bezierCurveTo(-3.0, 5.0, 4.0, 4.5, 7.0, 0.0);
                ctx.closePath();

                ctx.fillStyle = isButchering ? "#dc2626" : "#b91c1c"; // Volcanic crimson lithic core
                ctx.fill();
                ctx.strokeStyle = "#f87171"; // Flaked quartzite cutting edge
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Longitudinal symmetry flake ridge (mid-ridge)
                ctx.beginPath();
                ctx.moveTo(6.5, 0.0);
                ctx.lineTo(-4.5, 0.0);
                ctx.strokeStyle = "rgba(254, 202, 202, 0.85)";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // Flaking percussion spark bursts when butchering
                if (isButchering) {
                    for (let k = 0; k < 3; k++) {
                        const sparkPhase = (t * 0.4 + k * 1.2) % 1.0;
                        const sparkDist = 3.0 + sparkPhase * 8.0;
                        const sparkAngle = (k * 1.0 - 1.0) * 0.7;
                        const spX = 7.0 + Math.cos(sparkAngle) * sparkDist;
                        const spY = Math.sin(sparkAngle) * sparkDist;

                        ctx.beginPath();
                        ctx.arc(spX, spY, 1.0, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(248, 113, 113, " + (1.0 - sparkPhase).toFixed(2) + ")";
                        ctx.fill();
                    }
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    // Export module globally
    global.PyrotechnicOpticsRenderer = PyrotechnicOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
