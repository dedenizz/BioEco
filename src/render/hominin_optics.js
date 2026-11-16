// BioEcosystem - Pliocene Early Hominin Bipedalism & Lithic Tool Culture Optics & Animation Shaders
// Module: src/render/hominin_optics.js
// Version: 9.61.0 (Hour 681 - Looks & UI Agent: Erect Bipedal Striding, Plantar Arch Compression Rings, Lithic Percussion Sparks, Marrow Extraction Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * HomininOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Pliocene Early Hominins:
     * 1. Hominin Morphology (Australopithecus afarensis / "Lucy" type):
     *    - Erect Orthograde Bipedal Frame (#ea580c, #c2410c, #9a3412):
     *      Upright vertical spinal axis, flared pelvic basin, inward-angled femur valgus axis (#ea580c).
     *    - Free Upper Limbs & Opposable Pollex Node:
     *      Unweighted arms positioned forward with distinct precision grip highlight (#f97316).
     *    - Plantar Arch & Parallel Hallux Contact:
     *      Double-domed elastic foot base with parallel great toe delivering ground reaction torque.
     * 2. Habitual Bipedal Striding & Plantar Arch Compression Shaders:
     *    - When isStriding is active, alternating stance-phase compression rings (rgba(234, 88, 12, 0.75))
     *      pulse beneath the stance foot representing plantar arch elastic energy storage and release.
     * 3. Oldowan Lithic Percussion & Tool Knapping Sparks:
     *    - When isKnappingStone is active, conchoidal fracture spark bursts (rgba(251, 146, 60, 0.90))
     *      radiate at 75-degree impact angles with basalt core debris particles.
     * 4. Cortical Bone Marrow Extraction Shaders:
     *    - When isCrackingMarrow is active, radial lipid fracture rings (rgba(71, 85, 105, 0.85))
     *      and rich yellow lipid globules (rgba(250, 204, 21, 0.85)) spill from cracked limb bones.
     */
    class HomininOpticsRenderer {
        /**
         * Render Hominin anatomical features, bipedal walking, and stone tool knapping shaders.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawHominin(ctx, org, tick) {
            if (!ctx || !org || !org.isHominin) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 13.0;
            const isStriding = !!org.isStriding;
            const isKnapping = !!org.isKnappingStone;
            const isMarrow = !!org.isCrackingMarrow;
            const hasTool = !!org.hasLithicTool;

            ctx.save();
            ctx.translate(x, y);

            // 1. Plantar Arch Elastic Compression Rings (Bipedal Gait)
            if (isStriding) {
                const gaitPulse = 0.5 + 0.5 * Math.sin((org.bipedalStepPhase || 0) * 2.0);
                const archRadius = baseRadius * (1.2 + 0.3 * gaitPulse);

                ctx.save();
                ctx.beginPath();
                ctx.ellipse(0, baseRadius * 0.4, archRadius, archRadius * 0.5, angle, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(234, 88, 12, ${0.65 * gaitPulse})`;
                ctx.lineWidth = 1.5;
                ctx.setLineDash([2, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 2. Oldowan Lithic Percussion Sparks (Stone Knapping)
            if (isKnapping) {
                const knapRadius = baseRadius * 1.6;
                ctx.save();
                ctx.beginPath();
                ctx.arc(baseRadius * 0.8, -baseRadius * 0.3, knapRadius * 0.6, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(251, 146, 60, 0.85)";
                ctx.lineWidth = 1.8;
                ctx.stroke();

                // Conchoidal Flake Sparks
                for (let i = 0; i < 5; i++) {
                    const sparkAngle = (t * 0.4 + i * (Math.PI * 0.4));
                    const sx = baseRadius * 0.8 + Math.cos(sparkAngle) * knapRadius * 0.7;
                    const sy = -baseRadius * 0.3 + Math.sin(sparkAngle) * knapRadius * 0.7;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(254, 215, 170, 0.95)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Cortical Bone Marrow Extraction Shaders
            if (isMarrow) {
                const marrowPulse = 0.6 + 0.4 * Math.sin(t * 0.3);
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius * 1.8, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(71, 85, 105, ${0.75 * marrowPulse})`;
                ctx.lineWidth = 2.0;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Rich Lipid Globules
                for (let i = 0; i < 4; i++) {
                    const lipAngle = (t * 0.2 + i * (Math.PI / 2));
                    const lx = Math.cos(lipAngle) * baseRadius * 1.4;
                    const ly = Math.sin(lipAngle) * baseRadius * 1.4;
                    ctx.beginPath();
                    ctx.arc(lx, ly, 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(250, 204, 21, 0.85)"; // Marrow gold
                    ctx.fill();
                }
                ctx.restore();
            }

            // 4. Anatomical Silhouette (Orthograde Bipedal Hominin)
            ctx.save();
            ctx.rotate(angle);

            // Upright torso & flared pelvic basin
            ctx.beginPath();
            ctx.ellipse(0, 0, baseRadius * 0.95, baseRadius * 0.75, 0, 0, Math.PI * 2);
            const homGrad = ctx.createLinearGradient(-baseRadius, -baseRadius, baseRadius, baseRadius);
            homGrad.addColorStop(0, "#9a3412"); // Dark savanna terracotta
            homGrad.addColorStop(0.5, "#c2410c"); // Rich clay ochre
            homGrad.addColorStop(1, "#ea580c"); // Burnt ember orange
            ctx.fillStyle = homGrad;
            ctx.fill();
            ctx.strokeStyle = "#fb923c";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Broad Iliac Basin Flare (Pelvic Ridge)
            ctx.beginPath();
            ctx.arc(-baseRadius * 0.2, 0, baseRadius * 0.65, -Math.PI * 0.6, Math.PI * 0.6);
            ctx.strokeStyle = "rgba(254, 215, 170, 0.65)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Inward-Angled Valgus Femur Lines & Bipedal Feet
            const legLen = baseRadius * 1.1;
            const footPoints = [
                { x: baseRadius * 0.15, y: -baseRadius * 0.55 },
                { x: baseRadius * 0.15, y: baseRadius * 0.55 }
            ];

            for (let i = 0; i < footPoints.length; i++) {
                const fp = footPoints[i];
                // Inward Femur Line
                ctx.beginPath();
                ctx.moveTo(-baseRadius * 0.2, fp.y * 0.6);
                ctx.lineTo(fp.x, fp.y);
                ctx.strokeStyle = "rgba(251, 146, 60, 0.70)";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Parallel Great Toe Foot Node (Adducted Hallux)
                ctx.beginPath();
                ctx.ellipse(fp.x + 2.0, fp.y, 3.2, 1.8, 0, 0, Math.PI * 2);
                ctx.fillStyle = "#fed7aa";
                ctx.fill();
                ctx.strokeStyle = "#ea580c";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            // Head & Encephalized Cranium
            const headX = baseRadius * 0.85;
            ctx.beginPath();
            ctx.arc(headX, 0, baseRadius * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = "#7c2d12";
            ctx.fill();
            ctx.strokeStyle = "#fdba74";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Forward-facing binocular eyes
            ctx.beginPath();
            ctx.arc(headX + 2.0, -2.5, 1.3, 0, Math.PI * 2);
            ctx.arc(headX + 2.0, 2.5, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = "#fb923c";
            ctx.fill();

            // Free Manipulating Upper Forelimbs & Opposable Pollex
            const armX = baseRadius * 0.35;
            const armY = baseRadius * 0.70;

            // Opposable Precision Thumb Node
            ctx.beginPath();
            ctx.arc(armX + 4.0, armY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#fed7aa";
            ctx.fill();
            ctx.strokeStyle = "#c2410c";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Lithic Tool Node (Oldowan Basalt Chopper)
            if (hasTool) {
                ctx.beginPath();
                ctx.moveTo(armX + 4.0, armY - 3.0);
                ctx.lineTo(armX + 9.0, armY);
                ctx.lineTo(armX + 5.0, armY + 4.0);
                ctx.closePath();
                ctx.fillStyle = "#475569"; // Basalt dark grey
                ctx.fill();
                ctx.strokeStyle = "#94a3b8";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            ctx.restore();
            ctx.restore();
        }
    }

    // Export globally
    global.HomininOpticsRenderer = HomininOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
