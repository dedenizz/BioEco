// BioEcosystem - Early Tertiary Apex Terrestrial Carnivores: Creodonta & Mesonychia Optics
// Module: src/render/creodont_optics.js
// Version: 9.19.0 (Hour 639 - Looks & UI Agent: Craniomandibular Bite Force, Carnassial Shears, Digitigrade Sprint Kinematics & 135th/136th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CreodontOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Tertiary Apex Carnivore adaptations:
     * - Craniomandibular Temporal Muscle Flares:
     *   Pulsing crimson-garnet halos (#dc2626 and #991b1b) over the elevated sagittal crest and zygomatic arches,
     *   visualizing multi-thousand-Newton crushing bite force potential.
     * - Carnassial Shearing Blades:
     *   Sharp scissor-like dental highlights (#ef4444 and #ffffff) along opposing premolar-molar rows,
     *   radiating micro-shearing arcs during predatory engagement.
     * - Cursorial Digitigrade Limbs & Tendon Recoil:
     *   Lengthened amber metapodials (#eab308 and #facc15) with elevated heel/wrist posture and luminescent
     *   Achilles tendon tension lines returning elastic kinetic energy during locomotion.
     * - Bone-Crushing Bite Strike Shockwaves:
     *   Violent radial crimson shockwaves and micro-splinter bone fragments (#fef3c7 and #fca5a5)
     *   flaring outwards when crushing prey skeletal frameworks or extracting nutrient-dense marrow.
     * - Pursuit Sprint Speed Lines:
     *   Streamlined aerodynamic slipstream trails trailing behind sprinting predators across the terrain.
     * - Olfactory Scent Trail Tracking Atmospherics:
     *   Subtle ethereal scent wisps connecting pursuit sprinters to prospective megaherbivore prey or carrion.
     */
    class CreodontOpticsRenderer {
        /**
         * Render individual Apex Carnivore morphology, dental shears, and digitigrade stride.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawApexCarnivore(ctx, org, tick) {
            if (!ctx || !org || org.isDead || org.alive === false) return;
            if (!org.isApexCarnivore && !org.isCreodont && !org.isMesonychid) return;

            const x = org.x;
            const y = org.y;
            const radius = Math.max(10.0, (org.radius || 12.0) * 1.15);
            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // 1. Temporal Musculature & Sagittal Crest Aura
            const temporalPhase = tick * 0.12 + (org.id || 1) * 0.5;
            const temporalPulse = 0.18 + Math.sin(temporalPhase) * 0.08;
            ctx.fillStyle = "rgba(220, 38, 38, " + temporalPulse.toFixed(3) + ")";
            ctx.beginPath();
            ctx.ellipse(-radius * 0.15, 0, radius * 0.95, radius * 0.70, 0, 0, Math.PI * 2);
            ctx.fill();

            // 2. Cursorial Digitigrade Limbs (4 Extended Metapodials)
            const stridePhase = tick * 0.25 + (org.id || 1);
            const legOffsets = [
                { fx: radius * 0.45, fy: -radius * 0.75, phase: 0 },
                { fx: radius * 0.45, fy: radius * 0.75, phase: Math.PI },
                { fx: -radius * 0.45, fy: -radius * 0.70, phase: Math.PI * 0.5 },
                { fx: -radius * 0.45, fy: radius * 0.70, phase: Math.PI * 1.5 }
            ];

            ctx.lineWidth = 1.8;
            for (let i = 0; i < legOffsets.length; i++) {
                const leg = legOffsets[i];
                const swing = Math.sin(stridePhase + leg.phase) * (org.isPursuitSprinting ? 6.5 : 3.5);
                const pawX = leg.fx + swing;
                const pawY = leg.fy + (leg.fy > 0 ? 3.0 : -3.0);

                // Metapodial shaft
                ctx.strokeStyle = "rgba(234, 179, 8, 0.75)";
                ctx.beginPath();
                ctx.moveTo(leg.fx * 0.5, leg.fy * 0.5);
                ctx.lineTo(pawX, pawY);
                ctx.stroke();

                // Digitigrade compact paw & claws
                ctx.fillStyle = "#facc15";
                ctx.beginPath();
                ctx.arc(pawX, pawY, 1.8, 0, Math.PI * 2);
                ctx.fill();

                // Elastic Calcaneal Tendon line
                ctx.strokeStyle = "rgba(254, 240, 138, 0.50)";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(leg.fx * 0.3, leg.fy * 0.3);
                ctx.lineTo(pawX * 0.85, pawY * 0.85);
                ctx.stroke();
                ctx.lineWidth = 1.8;
            }

            // 3. Elongated Hypercarnivore Head & Massive Jaws
            ctx.fillStyle = "rgba(185, 28, 28, 0.85)";
            ctx.strokeStyle = "rgba(239, 68, 68, 0.95)";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            // Snout pointing forward (+x)
            ctx.moveTo(radius * 1.25, 0);
            ctx.lineTo(radius * 0.65, -radius * 0.45);
            ctx.lineTo(-radius * 0.55, -radius * 0.55);
            ctx.lineTo(-radius * 0.85, 0);
            ctx.lineTo(-radius * 0.55, radius * 0.55);
            ctx.lineTo(radius * 0.65, radius * 0.45);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 4. Carnassial Shearing Blades (Opposing Tooth Rows)
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "rgba(220, 38, 38, 0.95)";
            ctx.lineWidth = 1.0;

            // Upper & Lower scissor teeth
            const teeth = [
                { x: radius * 0.85, y: -radius * 0.22, len: 3.5 },
                { x: radius * 0.60, y: -radius * 0.28, len: 4.5 }, // Carnassial blade
                { x: radius * 0.35, y: -radius * 0.32, len: 3.0 },
                { x: radius * 0.85, y: radius * 0.22, len: 3.5 },
                { x: radius * 0.60, y: radius * 0.28, len: 4.5 }, // Carnassial blade
                { x: radius * 0.35, y: radius * 0.32, len: 3.0 }
            ];

            for (let t = 0; t < teeth.length; t++) {
                const tooth = teeth[t];
                ctx.beginPath();
                ctx.moveTo(tooth.x, tooth.y);
                ctx.lineTo(tooth.x + 1.2, tooth.y + (tooth.y > 0 ? tooth.len : -tooth.len));
                ctx.lineTo(tooth.x - 1.2, tooth.y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // 5. Carnassial Shearing Glimmer (Decussating Enamel Highlight)
            const gleamAlpha = 0.4 + Math.sin(tick * 0.2 + (org.id || 1)) * 0.35;
            ctx.fillStyle = "rgba(254, 242, 242, " + gleamAlpha.toFixed(3) + ")";
            ctx.beginPath();
            ctx.arc(radius * 0.60, -radius * 0.28, 2.0, 0, Math.PI * 2);
            ctx.arc(radius * 0.60, radius * 0.28, 2.0, 0, Math.PI * 2);
            ctx.fill();

            // 6. Bone-Crushing Bite Strike Shockwave Flares
            if (org.isCraniomandibularStriking) {
                const strikeRadius = radius * (1.4 + Math.sin(tick * 0.4) * 0.3);
                ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.arc(radius * 0.8, 0, strikeRadius, -Math.PI * 0.4, Math.PI * 0.4);
                ctx.stroke();

                // Bone splinter particles
                ctx.fillStyle = "rgba(254, 243, 199, 0.90)";
                for (let s = 0; s < 5; s++) {
                    const sAngle = (s - 2) * 0.25;
                    const sDist = strikeRadius * (0.8 + (s % 2) * 0.4);
                    const spX = radius * 0.8 + Math.cos(sAngle) * sDist;
                    const spY = Math.sin(sAngle) * sDist;
                    ctx.fillRect(spX - 1, spY - 1, 2.5, 2.5);
                }
            }

            // 7. Pursuit Sprint Aerodynamic Slipstream Trails
            if (org.isPursuitSprinting) {
                ctx.strokeStyle = "rgba(250, 204, 21, 0.55)";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(-radius * 0.9, -radius * 0.35);
                ctx.lineTo(-radius * 1.8, -radius * 0.35);
                ctx.moveTo(-radius * 0.9, radius * 0.35);
                ctx.lineTo(-radius * 1.8, radius * 0.35);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.restore();
        }

        /**
         * Render canvas-wide ambient pursuit atmospherics, scent trails, and bone dust.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawApexCarnivoreAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const n = organisms.length;
            ctx.save();

            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead || !org.isApexCarnivore) continue;

                // Draw Olfactory Scent Vector if actively sprinting in pursuit
                if (org.isPursuitSprinting) {
                    const lookAheadX = org.x + (org.vx || 0) * 12.0;
                    const lookAheadY = org.y + (org.vy || 0) * 12.0;

                    const grad = ctx.createLinearGradient(org.x, org.y, lookAheadX, lookAheadY);
                    grad.addColorStop(0, "rgba(220, 38, 38, 0.25)");
                    grad.addColorStop(1, "rgba(234, 179, 8, 0.0)");

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(org.x, org.y);
                    ctx.lineTo(lookAheadX, lookAheadY);
                    ctx.stroke();
                }

                // Bone marrow feeding glow
                if (org.isCraniomandibularStriking) {
                    const marrowPulse = 0.25 + Math.sin(tick * 0.3 + org.id) * 0.15;
                    ctx.fillStyle = "rgba(220, 38, 38, " + marrowPulse.toFixed(3) + ")";
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, (org.radius || 12.0) * 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CreodontOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.CreodontOpticsRenderer = CreodontOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
