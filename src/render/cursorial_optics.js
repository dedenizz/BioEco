// BioEcosystem - Miocene-Pliocene Cursorial Ungulate & Hypsodonty Optics & Animation Shaders
// Module: src/render/cursorial_optics.js
// Version: 9.55.0 (Hour 675 - Looks & UI Agent: Monodactyl Spring Bounding, Distal Tendon Strain Waves, Savanna Dust Particles)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CursorialOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Miocene-Pliocene Cursorial Ungulates:
     * 1. Cursorial Ungulate Morphology (Equidae & Bovidae / Antilocapridae):
     *    - Slender Gracile Cursorial Frame (#16a34a, #15803d, #14532d):
     *      Deep thoracic cavity, high wither shoulders, tucked flank, and long slender distal limbs.
     *    - Monodactyl Central Hoof Node (#f59e0b, #d97706, #b45309):
     *      Prominent keratinized central hoof capsule (digit III) bearing full stance phase load.
     *      Vestigial side splint digits (digits II & IV) rendered as subtle proximal bony flares.
     *    - Hypsodont Deep Cranial Molar Batterys & Plicate Enamel Ridges:
     *      Deeply recessed cheek tooth battery with self-sharpening plicate occlusal ridges (#86efac).
     * 2. Elastic Tendon Recoil & Spring Bounding Shaders:
     *    - When isSpringBounding is active, high-tension elastic recoil arcs (rgba(74, 222, 128, 0.85))
     *      pulse along distal metapodials representing the suspensory apparatus releasing stored kinetic energy.
     *    - Monodactyl impact dust rings (rgba(180, 83, 9, 0.65)) radiating from the solitary central hoof capsule upon toe-off.
     * 3. Panoramic Horizon Vigilance Aura:
     *    - When isVigilantLookout is active, a wide-angle scanning arc (rgba(34, 197, 94, 0.35))
     *      expands laterally from the skull representing 350-degree horizontal slit pupil vigilance.
     */
    class CursorialOpticsRenderer {
        /**
         * Render Cursorial Ungulate anatomical features, spring bounding, and vigilance shaders.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawUngulate(ctx, org, tick) {
            if (!ctx || !org || !org.isCursorialUngulate) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 14.0;
            const isMonodactyl = !!org.isMonodactyl;
            const isBounding = !!org.isSpringBounding;
            const isLookout = !!org.isVigilantLookout;

            ctx.save();
            ctx.translate(x, y);

            // 1. Panoramic Horizon Vigilance Arc (350-Degree Perception Cone)
            if (isLookout) {
                const scanPulse = 0.6 + 0.4 * Math.sin(t * 0.25);
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                // Sweep nearly full circle leaving small blind spot right behind occiput
                ctx.arc(0, 0, baseRadius * 2.8, -Math.PI * 0.95, Math.PI * 0.95, false);
                ctx.strokeStyle = `rgba(74, 222, 128, ${0.40 * scanPulse})`;
                ctx.lineWidth = 1.8;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Visual horizon beam
                ctx.fillStyle = `rgba(34, 197, 94, ${0.08 * scanPulse})`;
                ctx.fill();
                ctx.restore();
            }

            // 2. Monodactyl Impact & Savanna Dust Burst Particles (Spring Bounding)
            if (isBounding) {
                const recoilIntensity = org.elasticTendonSpringRecoil || 0.85;
                const dustRadius = baseRadius * (1.6 + 0.6 * Math.sin(t * 0.45));

                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, dustRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(180, 83, 9, ${0.75 * recoilIntensity})`;
                ctx.lineWidth = 2.0;
                ctx.setLineDash([3, 5]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Distal Tendon Strain Waves (Kinetic Energy Release)
                ctx.beginPath();
                ctx.arc(0, 0, dustRadius * 1.35, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(34, 197, 94, ${0.55 * recoilIntensity})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Ground Contact Dust Sparks
                for (let i = 0; i < 4; i++) {
                    const sparkAngle = (t * 0.35 + i * (Math.PI / 2));
                    const sx = Math.cos(sparkAngle) * dustRadius * 1.1;
                    const sy = Math.sin(sparkAngle) * dustRadius * 1.1;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Anatomical Body Silhouetting (Gracile Cursorial Herbivore)
            ctx.save();
            ctx.rotate(angle);

            // Elliptical slender torso
            ctx.beginPath();
            ctx.ellipse(0, 0, baseRadius * 1.25, baseRadius * 0.72, 0, 0, Math.PI * 2);
            const bodyGrad = ctx.createLinearGradient(-baseRadius, -baseRadius * 0.7, baseRadius, baseRadius * 0.7);
            if (isMonodactyl) {
                // Steppe Monodactyl (Golden Steppe & Emerald Savanna Gradient)
                bodyGrad.addColorStop(0, "#15803d"); // Dark savanna green
                bodyGrad.addColorStop(0.5, "#16a34a"); // Meadow emerald
                bodyGrad.addColorStop(1, "#84cc16"); // Spring lime
            } else {
                // Tridactyl Woodland Trotter (Woodland Amber Ochre)
                bodyGrad.addColorStop(0, "#92400e");
                bodyGrad.addColorStop(0.5, "#b45309");
                bodyGrad.addColorStop(1, "#d97706");
            }
            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = isMonodactyl ? "#4ade80" : "#fbbf24";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // 4. Elongated Distal Limbs & Central Monodactyl Hoof Node
            const limbOffset = baseRadius * 0.65;
            const hoofDist = baseRadius * 1.35;

            // Forelimb & Hindlimb Hoof Points
            const limbPoints = [
                { x: limbOffset, y: -baseRadius * 0.55 },
                { x: limbOffset, y: baseRadius * 0.55 },
                { x: -limbOffset, y: -baseRadius * 0.55 },
                { x: -limbOffset, y: baseRadius * 0.55 }
            ];

            for (let i = 0; i < limbPoints.length; i++) {
                const lp = limbPoints[i];
                // Elastic Tendon Line
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(lp.x, lp.y);
                ctx.strokeStyle = "rgba(74, 222, 128, 0.45)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Solitary Central Hoof Capsule (Digit III)
                ctx.beginPath();
                ctx.arc(lp.x, lp.y, isMonodactyl ? 3.0 : 2.2, 0, Math.PI * 2);
                ctx.fillStyle = "#fef08a"; // Keratinized horn ivory
                ctx.fill();
                ctx.strokeStyle = "#b45309";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Vestigial side splints if tridactyl
                if (!isMonodactyl) {
                    ctx.beginPath();
                    ctx.arc(lp.x - 2.0, lp.y - 1.5, 1.2, 0, Math.PI * 2);
                    ctx.arc(lp.x + 2.0, lp.y - 1.5, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "#ca8a04";
                    ctx.fill();
                }
            }

            // 5. Hypsodont Cranial Deep Socket & Plicate Enamel Crests (Skull Node)
            const headX = baseRadius * 1.15;
            ctx.beginPath();
            ctx.arc(headX, 0, baseRadius * 0.48, 0, Math.PI * 2);
            ctx.fillStyle = isMonodactyl ? "#14532d" : "#78350f";
            ctx.fill();
            ctx.strokeStyle = "#86efac";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Plicate Occlusal Enamel Ridges (Molar Battery Highlight)
            ctx.beginPath();
            ctx.moveTo(headX - 2.5, -2.5);
            ctx.lineTo(headX + 2.5, -1.0);
            ctx.lineTo(headX - 1.5, 1.0);
            ctx.lineTo(headX + 2.5, 2.5);
            ctx.strokeStyle = "#f0fdf4"; // High-calcified enamel white
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Lateral Panoramic Eyes (Horizontal Slit Pupils)
            ctx.beginPath();
            ctx.arc(headX, -baseRadius * 0.35, 1.6, 0, Math.PI * 2);
            ctx.arc(headX, baseRadius * 0.35, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "#22c55e"; // Panoramic green gaze
            ctx.fill();

            ctx.restore();
            ctx.restore();
        }
    }

    // Export globally
    global.CursorialOpticsRenderer = CursorialOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
