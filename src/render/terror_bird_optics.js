// BioEcosystem - Early Tertiary Avian Radiation: Terror Bird Optics & Craniokinesis
// Module: src/render/terror_bird_optics.js
// Version: 9.25.0 (Hour 645 - Looks & UI Agent: Rhamphotheca Hooked Beak Shaders, Craniokinetic Ax-Chopping & 137th/138th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerrorBirdOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Tertiary Terror Bird adaptations:
     * - Hypertrophied Hooked Rhamphotheca Beak:
     *   Massive arched raptorial beak sheath (#2563eb, #3b82f6 and #93c5fd) terminating in a downward curved hook,
     *   visualizing deep predatory slicing surfaces and bone-crushing potential.
     * - Craniokinetic Ax-Chopping Strike Shockwaves:
     *   Violent vertical chopping shockwave arcs (#60a5fa and #ffffff) flashing downwards when delivering
     *   cranial kinetic strikes that fracture prey skeletal vertebrae.
     * - Bipedal Columnar Stride & Tridactyl Talons:
     *   Dual elongated bipedal leg pillars (tibiotarsus and tarsometatarsus) with three prominent clawed toes
     *   anchoring sprint kinematics and delivering high-energy forward kicks (#ea580c and #f97316).
     * - Vestigial Wing Aerodynamic Flaps:
     *   Reduced feather-fringed wing flaps (#ea580c and #fb923c) flaring during sprint cornering and strike balance.
     * - Muscular Gizzard & Gastrolith Pulverization Glow:
     *   Internal circular effervescent glow (#fef08a and #f59e0b) within the abdominal cavity visualizing mechanical
     *   grinding of whole ingested bone boluses by churning gastrolith pebbles.
     * - Savanna Ambush Slipstream Atmospherics:
     *   Ambient bipedal taloned tracks and aerodynamic flightless pursuit trails across the alluvial plain.
     */
    class TerrorBirdOpticsRenderer {
        /**
         * Render individual Terror Bird morphology, hooked rhamphotheca, and bipedal stride.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTerrorBird(ctx, org, tick) {
            if (!ctx || !org || org.isDead || org.alive === false) return;
            if (!org.isTerrorBird && !org.isGastornithid && !org.isPhorusrhacid) return;

            const x = org.x;
            const y = org.y;
            const radius = Math.max(11.0, (org.radius || 13.0) * 1.25);
            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // 1. Muscular Gizzard & Gastrolith Churning Glow (Abdomen)
            const gizzardPhase = tick * 0.15 + (org.id || 1) * 0.4;
            const gizzardPulse = 0.20 + Math.sin(gizzardPhase) * 0.08;
            ctx.fillStyle = "rgba(234, 88, 12, " + gizzardPulse.toFixed(3) + ")";
            ctx.beginPath();
            ctx.ellipse(-radius * 0.25, 0, radius * 0.65, radius * 0.50, 0, 0, Math.PI * 2);
            ctx.fill();

            // Gastrolith pebble dots inside gizzard
            ctx.fillStyle = "rgba(254, 240, 138, 0.70)";
            for (let p = 0; p < 4; p++) {
                const pAngle = gizzardPhase + p * (Math.PI / 2);
                const pX = -radius * 0.25 + Math.cos(pAngle) * (radius * 0.25);
                const pY = Math.sin(pAngle) * (radius * 0.18);
                ctx.fillRect(pX - 0.8, pY - 0.8, 1.8, 1.8);
            }

            // 2. Bipedal Cursorial Leg Pillars (Dual Tridactyl Limbs)
            const stridePhase = tick * 0.28 + (org.id || 1);
            const legConfigs = [
                { legY: -radius * 0.55, phase: 0 },
                { legY: radius * 0.55, phase: Math.PI }
            ];

            ctx.lineWidth = 2.2;
            for (let i = 0; i < legConfigs.length; i++) {
                const leg = legConfigs[i];
                const swing = Math.sin(stridePhase + leg.phase) * (org.isAvianPursuitSprinting ? 8.0 : 4.5);
                const footX = -radius * 0.1 + swing;
                const footY = leg.legY;

                // Tarsometatarsus column
                ctx.strokeStyle = "rgba(234, 88, 12, 0.85)";
                ctx.beginPath();
                ctx.moveTo(-radius * 0.2, leg.legY * 0.4);
                ctx.lineTo(footX, footY);
                ctx.stroke();

                // 3-toed Tridactyl Talons
                ctx.fillStyle = "#ea580c";
                ctx.strokeStyle = "rgba(194, 65, 12, 0.95)";
                ctx.lineWidth = 1.0;

                // Center toe
                ctx.beginPath();
                ctx.moveTo(footX, footY);
                ctx.lineTo(footX + 4.5, footY);
                ctx.stroke();
                // Lateral toes
                ctx.beginPath();
                ctx.moveTo(footX, footY);
                ctx.lineTo(footX + 3.5, footY - 2.8);
                ctx.moveTo(footX, footY);
                ctx.lineTo(footX + 3.5, footY + 2.8);
                ctx.stroke();
            }

            // 3. Feathered Bipedal Body Profile
            ctx.fillStyle = "rgba(30, 58, 138, 0.85)";
            ctx.strokeStyle = "rgba(37, 99, 235, 0.95)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(radius * 0.8, 0);
            ctx.lineTo(radius * 0.3, -radius * 0.6);
            ctx.lineTo(-radius * 0.7, -radius * 0.5);
            ctx.lineTo(-radius * 0.9, 0);
            ctx.lineTo(-radius * 0.7, radius * 0.5);
            ctx.lineTo(radius * 0.3, radius * 0.6);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 4. Vestigial Aerodynamic Balance Wings (Reduced Forelimbs)
            const wingFlap = Math.sin(tick * 0.35 + (org.id || 1)) * (org.isAvianPursuitSprinting ? 5.0 : 2.5);
            ctx.strokeStyle = "rgba(249, 115, 22, 0.80)";
            ctx.lineWidth = 1.5;
            // Left wing
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.45);
            ctx.lineTo(-radius * 0.4 + wingFlap, -radius * 0.95);
            ctx.stroke();
            // Right wing
            ctx.beginPath();
            ctx.moveTo(0, radius * 0.45);
            ctx.lineTo(-radius * 0.4 - wingFlap, radius * 0.95);
            ctx.stroke();

            // 5. Massive Hooked Rhamphotheca Beak (45-65 cm Cranium)
            ctx.fillStyle = "rgba(37, 99, 235, 0.95)";
            ctx.strokeStyle = "rgba(147, 197, 253, 0.95)";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            // Start at upper skull
            ctx.moveTo(radius * 0.5, -radius * 0.35);
            ctx.lineTo(radius * 1.45, -radius * 0.20);
            // Curved downward predatory hook
            ctx.quadraticCurveTo(radius * 1.65, radius * 0.25, radius * 1.40, radius * 0.50);
            ctx.lineTo(radius * 1.25, radius * 0.25);
            // Lower beak edge back to cranium
            ctx.lineTo(radius * 0.5, radius * 0.35);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Beak sheath highlight gleam
            const gleamAlpha = 0.5 + Math.sin(tick * 0.25 + (org.id || 1)) * 0.35;
            ctx.fillStyle = "rgba(255, 255, 255, " + gleamAlpha.toFixed(3) + ")";
            ctx.beginPath();
            ctx.ellipse(radius * 1.15, -radius * 0.08, radius * 0.25, radius * 0.08, -0.2, 0, Math.PI * 2);
            ctx.fill();

            // 6. Craniokinetic Ax-Chopping Strike Shockwaves
            if (org.isBeakStriking) {
                const strikeArc = radius * (1.3 + Math.sin(tick * 0.45) * 0.25);
                ctx.strokeStyle = "rgba(96, 165, 250, 0.90)";
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.arc(radius * 1.2, 0, strikeArc, -Math.PI * 0.35, Math.PI * 0.35);
                ctx.stroke();

                // Ax-strike impact sparks
                ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
                for (let s = 0; s < 4; s++) {
                    const sparkX = radius * 1.2 + Math.cos(s * 0.6) * strikeArc;
                    const sparkY = Math.sin(s * 0.6) * strikeArc;
                    ctx.fillRect(sparkX - 1.2, sparkY - 1.2, 2.4, 2.4);
                }
            }

            // 7. Cursorial Pursuit Sprint Slipstream Trails
            if (org.isAvianPursuitSprinting) {
                ctx.strokeStyle = "rgba(234, 88, 12, 0.60)";
                ctx.lineWidth = 1.4;
                ctx.setLineDash([5, 3]);
                ctx.beginPath();
                ctx.moveTo(-radius * 0.8, -radius * 0.25);
                ctx.lineTo(-radius * 2.0, -radius * 0.25);
                ctx.moveTo(-radius * 0.8, radius * 0.25);
                ctx.lineTo(-radius * 2.0, radius * 0.25);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.restore();
        }

        /**
         * Render ambient bipedal pursuit tracks, dust clouds, and predatory focus vectors.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawTerrorBirdAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const n = organisms.length;
            ctx.save();

            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead || !org.isTerrorBird) continue;

                // Draw bipedal pursuit trajectory vector if sprinting
                if (org.isAvianPursuitSprinting) {
                    const forwardX = org.x + (org.vx || 0) * 10.0;
                    const forwardY = org.y + (org.vy || 0) * 10.0;

                    const grad = ctx.createLinearGradient(org.x, org.y, forwardX, forwardY);
                    grad.addColorStop(0, "rgba(37, 99, 235, 0.30)");
                    grad.addColorStop(1, "rgba(234, 88, 12, 0.0)");

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.8;
                    ctx.beginPath();
                    ctx.moveTo(org.x, org.y);
                    ctx.lineTo(forwardX, forwardY);
                    ctx.stroke();
                }

                // Gizzard pulverization feeding glow
                if (org.isBeakStriking) {
                    const chopGlow = 0.25 + Math.sin(tick * 0.4 + (org.id || 1)) * 0.15;
                    ctx.fillStyle = "rgba(37, 99, 235, " + chopGlow.toFixed(3) + ")";
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, (org.radius || 13.0) * 1.9, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TerrorBirdOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TerrorBirdOpticsRenderer = TerrorBirdOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
