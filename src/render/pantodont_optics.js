// BioEcosystem - Early Tertiary Megaherbivore Radiation: Pantodont & Dinocerata Optics
// Module: src/render/pantodont_optics.js
// Version: 9.13.0 (Hour 633 - Looks & UI Agent: Graviportal Pillar Limbs, Cranial Ossicones, Saber Canines & 133rd/134th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PantodontOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Tertiary Megaherbivore adaptations:
     * - Graviportal Columnar Pillar Limbs:
     *   Straight vertical weight-bearing bone pillars (#15803d and #22c55e) cushioned by broad fibrocartilaginous
     *   plantigrade pads, preventing flexural shear and leaving subtle substrate mud impressions.
     * - Cranial Ossicones & Parietal Armor:
     *   Burnished amber (#b45309 and #f59e0b) paired bony protuberances across the nasal, maxillary, and parietal
     *   crests, shimmering with protective micro-trabecular impact-damping halos.
     * - Upper Saber Canines & Mandibular Sheath Flanges:
     *   Curved ivory-gold tusks guarded by lateral mandibular bone flanging that prevents transverse fracture.
     * - Ritualized Ossicone Clashing Shockwaves:
     *   Concentric golden shockwave ripples emitted between proximate rival Dinoceratans during dominance clashes.
     * - Cecal Fiber Fermentation Bubbles:
     *   Rhythmic micro-effervescent green fermentation gas pulses within the hypertrophied abdominal hindgut chamber.
     * - Floodplain Mud Track Atmospherics:
     *   Substrate footprint compressions across the lower alluvial wetland terrain.
     */
    class PantodontOpticsRenderer {
        /**
         * Render individual Pantodont / Dinoceratan megaherbivore morphology, ossicones, and stance.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawMegaherbivore(ctx, org, tick) {
            if (!ctx || !org || org.isDead || org.alive === false) return;
            if (!org.isMegaherbivore && !org.isDinoceratan) return;

            const x = org.x;
            const y = org.y;
            const radius = Math.max(12.0, (org.radius || 14.0) * 1.35); // Massive 2+ ton proportions
            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // 1. Cecal Hindgut Fermentation Aura (Abdominal Chamber)
            const cecalPhase = tick * 0.08 + (org.id || 1) * 0.3;
            const cecalAlpha = 0.15 + Math.sin(cecalPhase) * 0.06;
            ctx.fillStyle = "rgba(21, 128, 61, " + cecalAlpha.toFixed(3) + ")";
            ctx.beginPath();
            ctx.ellipse(-radius * 0.25, 0, radius * 0.65, radius * 0.50, 0, 0, Math.PI * 2);
            ctx.fill();

            // 2. Graviportal Columnar Pillar Limbs (4 Sturdy Straight Legs)
            const legWidth = Math.max(3.5, radius * 0.22);
            const legLength = radius * 0.60;
            const stridePhase = Math.sin(tick * 0.12 + (org.id || 0));
            const legOffset = stridePhase * (radius * 0.15);

            ctx.fillStyle = "rgba(34, 197, 94, 0.45)";
            ctx.strokeStyle = "rgba(21, 128, 61, 0.85)";
            ctx.lineWidth = 1.2;

            // Forelimbs
            ctx.fillRect(radius * 0.25 + legOffset, -radius * 0.65, legWidth, legLength);
            ctx.strokeRect(radius * 0.25 + legOffset, -radius * 0.65, legWidth, legLength);
            ctx.fillRect(radius * 0.25 - legOffset, radius * 0.25, legWidth, legLength);
            ctx.strokeRect(radius * 0.25 - legOffset, radius * 0.25, legWidth, legLength);

            // Hindlimbs
            ctx.fillRect(-radius * 0.55 - legOffset, -radius * 0.65, legWidth, legLength);
            ctx.strokeRect(-radius * 0.55 - legOffset, -radius * 0.65, legWidth, legLength);
            ctx.fillRect(-radius * 0.55 + legOffset, radius * 0.25, legWidth, legLength);
            ctx.strokeRect(-radius * 0.55 + legOffset, radius * 0.25, legWidth, legLength);

            // Broad Plantigrade Subdigital Pads (Fibrocartilage foot cushions)
            ctx.fillStyle = "rgba(245, 158, 11, 0.60)";
            ctx.beginPath();
            ctx.arc(radius * 0.25 + legWidth * 0.5 + legOffset, -radius * 0.65, legWidth * 0.75, 0, Math.PI * 2);
            ctx.arc(radius * 0.25 + legWidth * 0.5 - legOffset, radius * 0.25 + legLength, legWidth * 0.75, 0, Math.PI * 2);
            ctx.arc(-radius * 0.55 + legWidth * 0.5 - legOffset, -radius * 0.65, legWidth * 0.75, 0, Math.PI * 2);
            ctx.arc(-radius * 0.55 + legWidth * 0.5 + legOffset, radius * 0.25 + legLength, legWidth * 0.75, 0, Math.PI * 2);
            ctx.fill();

            // 3. Massive Torso Barrel (Dense pachydermic body shield)
            ctx.fillStyle = "rgba(180, 83, 9, 0.35)";
            ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.85, radius * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // 4. Cranial Structure & Dinoceratan Weaponization
            if (org.isDinoceratan) {
                // Elongated skull projection forward
                const headX = radius * 0.75;
                const headY = 0;
                const headR = radius * 0.42;

                ctx.fillStyle = "rgba(217, 119, 6, 0.50)";
                ctx.strokeStyle = "rgba(245, 158, 11, 0.90)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.ellipse(headX, headY, headR * 1.1, headR * 0.75, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // 3 Pairs of Cranial Ossicones (Bony Horn Protuberances)
                // Pair 1: Nasal bosses (snout tip)
                // Pair 2: Maxillary ossicones (mid-skull)
                // Pair 3: Parietal horn crests (posterior crown)
                const ossiconePairs = [
                    { x: headX + headR * 0.7, yOffset: headR * 0.35, r: 2.4, h: 4.5 },
                    { x: headX + headR * 0.1, yOffset: headR * 0.60, r: 3.2, h: 6.0 },
                    { x: headX - headR * 0.4, yOffset: headR * 0.75, r: 3.8, h: 7.5 }
                ];

                ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 0.8;

                for (let p = 0; p < ossiconePairs.length; p++) {
                    const horn = ossiconePairs[p];
                    // Left horn
                    ctx.beginPath();
                    ctx.ellipse(horn.x, -horn.yOffset, horn.r, horn.h * 0.5, 0.2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // Right horn
                    ctx.beginPath();
                    ctx.ellipse(horn.x, horn.yOffset, horn.r, horn.h * 0.5, -0.2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                // Upper Saber Canines & Mandibular Flanges
                const saberLen = Math.max(5.0, (org.saberCanineShearing || 0.8) * 7.5);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.90)";
                ctx.lineWidth = 1.6;

                // Dorsal saber canine
                ctx.beginPath();
                ctx.moveTo(headX + headR * 0.3, -headR * 0.45);
                ctx.lineTo(headX + headR * 0.35, -headR * 0.45 - saberLen);
                ctx.stroke();

                // Ventral saber canine
                ctx.beginPath();
                ctx.moveTo(headX + headR * 0.3, headR * 0.45);
                ctx.lineTo(headX + headR * 0.35, headR * 0.45 + saberLen);
                ctx.stroke();

                // Mandibular Protective Flanges (Protective bone shields)
                ctx.fillStyle = "rgba(180, 83, 9, 0.75)";
                ctx.beginPath();
                ctx.rect(headX + headR * 0.25, -headR * 0.45 - saberLen * 0.85, 2.5, saberLen * 0.9);
                ctx.rect(headX + headR * 0.25, headR * 0.45, 2.5, saberLen * 0.9);
                ctx.fill();
            }

            ctx.restore();

            // 5. Ritualized Combat Shockwaves (When clashing with rival dinoceratans)
            if (org.isOssiconeClashing) {
                ctx.save();
                ctx.strokeStyle = "rgba(245, 158, 11, " + (0.35 + Math.sin(tick * 0.25) * 0.20).toFixed(3) + ")";
                ctx.lineWidth = 1.5;
                const clashR = radius * 1.5 + ((tick * 2) % 25);
                ctx.beginPath();
                ctx.arc(x, y, clashR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        }

        /**
         * Render general floodplain wetland atmospherics and mud footprint impressions.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities.
         * @param {number} tick - Simulation frame counter.
         */
        static drawMegaherbivoreAtmospherics(ctx, organisms, tick) {
            if (!ctx) return;
            const w = ctx.canvas ? ctx.canvas.width : 660;
            const h = ctx.canvas ? ctx.canvas.height : 660;

            // Lower floodplain alluvial marsh mist & mud shimmer
            const marshPulse = 0.035 + Math.sin(tick * 0.05) * 0.015;
            ctx.save();
            ctx.fillStyle = "rgba(21, 128, 61, " + marshPulse.toFixed(3) + ")";
            ctx.beginPath();
            ctx.rect(0, h * 0.55, w, h * 0.45);
            ctx.fill();

            // Alluvial mud footprint impressions from recent browsing
            const mudPatches = 4;
            for (let m = 0; m < mudPatches; m++) {
                const mx = w * 0.25 + m * (w * 0.18) + Math.sin(tick * 0.02 + m) * 15.0;
                const my = h * 0.70 + Math.cos(tick * 0.03 + m) * 12.0;
                const footprintAlpha = Math.max(0.0, 0.14 + Math.sin(tick * 0.04 + m) * 0.05);

                ctx.fillStyle = "rgba(180, 83, 9, " + footprintAlpha.toFixed(3) + ")";
                ctx.beginPath();
                ctx.ellipse(mx, my, 8.0, 5.0, 0.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PantodontOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.PantodontOpticsRenderer = PantodontOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
