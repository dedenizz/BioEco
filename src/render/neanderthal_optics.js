// BioEcosystem - Late Pleistocene Neanderthal & Composite Weaponry Optics & Shaders
// Module: src/render/neanderthal_optics.js
// Version: 9.73.0 (Hour 693 - Looks & UI Agent: Levallois Tortoise Core Shaders, Birch Tar Smoke, Composite Spear Vectors & Ochre Adornment)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeanderthalOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Late Pleistocene Hominins:
     * 1. Neanderthal Morphology (Homo neanderthalensis & early Homo sapiens):
     *    - Robust barrel-shaped thoracic frame (#3b82f6, #60a5fa, #1e3a8a).
     *    - Thickened bone cortex, heavy browridge crest, and broad nasal conditioning chamber.
     * 2. Levallois Tortoise Core Shaders & Predictable Flaking Sparks:
     *    - When isKnappingLevallois is true, radiating centripetal flake scar glints (rgba(59, 130, 246, 0.85))
     *      illuminate the prepared platform with micro-percussion quartz spark bursts.
     * 3. Birch Tar Distillation & Mastic Smoke:
     *    - When isDistillingTar is true, dark smoky distillation wisps (rgba(51, 65, 85, 0.65))
     *      and pitch-black resin droplets bubble beneath the organism.
     * 4. Hafted Composite Spear Thrusting Vectors:
     *    - When hasCompositeSpear is true, renders an elongated wooden shaft (28-36 px) with
     *      a black birch-tar binding collar and a sharp triangular Levallois stone tip (#3b82f6, #93c5fd).
     *    - When isSpearHunting is true, high-velocity forward penetration kinetic force vectors
     *      and impact shockwaves (rgba(59, 130, 246, 0.90)) radiate toward the prey.
     * 5. Glacial Cold Thermoregulation & Nasal Turbinate Warmth:
     *    - When isColdResisting is true, an insulating pale blue thermal boundary aura
     *      (rgba(147, 197, 253, 0.35)) encapsulates the thoracic frame.
     * 6. Mineral Ochre Pigment Adornment:
     *    - When hasOchreAdornment is true, rich ferric ochre cosmetic markings (#b91c1c, #dc2626)
     *      adorn the dorsal membrane, signifying social proto-culture and symbolic identity.
     */
    class NeanderthalOpticsRenderer {
        /**
         * Render Neanderthal anatomical features, Levallois knapping, composite spears, and ochre pigment.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawNeanderthal(ctx, org, tick) {
            if (!ctx || !org || !org.isNeanderthal) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);
            const baseRadius = org.radius || 15.0;

            const isKnapping = !!org.isKnappingLevallois;
            const isDistilling = !!org.isDistillingTar;
            const isHunting = !!org.isSpearHunting;
            const hasSpear = !!org.hasCompositeSpear;
            const isCold = !!org.isColdResisting;
            const hasOchre = !!org.hasOchreAdornment;

            ctx.save();
            ctx.translate(x, y);

            // 1. Glacial Tundra Cold-Resistance Insulation Aura
            if (isCold) {
                const coldPulse = 0.5 + 0.5 * Math.sin(t * 0.2 + (org.id || 0));
                const auraRadius = baseRadius * (1.35 + 0.15 * coldPulse);

                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(147, 197, 253, 0.30)"; // Arctic ice blue
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.restore();
            }

            // 2. Birch Tar Distillation Smoke & Mastic Pitch
            if (isDistilling) {
                for (let s = 0; s < 3; s++) {
                    const sPhase = ((t * 0.08 + s * 2.09) % 3.14);
                    const sDist = baseRadius * (0.6 + sPhase * 0.7);
                    const sAngle = -Math.PI * 0.5 + Math.sin(t * 0.15 + s) * 0.5;
                    const sx = Math.cos(sAngle) * sDist;
                    const sy = Math.sin(sAngle) * sDist;
                    const sAlpha = Math.max(0.0, (1.0 - sPhase / 3.14) * 0.55);

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(sx, sy, 2.0 + sPhase * 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(51, 65, 85, " + sAlpha.toFixed(3) + ")"; // Tar fume smoke
                    ctx.fill();
                    ctx.restore();
                }
            }

            // 3. Levallois Prepared-Core Flaking Sparks & Tortoise Core Glints
            if (isKnapping) {
                ctx.save();
                ctx.rotate(angle);

                // Tortoise core silhouette
                ctx.beginPath();
                ctx.ellipse(-baseRadius * 0.5, 0, 5.0, 3.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(59, 130, 246, 0.75)"; // Glacial cobalt flint core
                ctx.fill();
                ctx.strokeStyle = "#93c5fd";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // Centripetal flaking sparks
                for (let k = 0; k < 4; k++) {
                    const sparkPhase = (t * 0.5 + k * 1.57) % 1.0;
                    const sparkDist = 3.0 + sparkPhase * 9.0;
                    const sparkAngle = (k * 1.57);
                    const spX = -baseRadius * 0.5 + Math.cos(sparkAngle) * sparkDist;
                    const spY = Math.sin(sparkAngle) * sparkDist;

                    ctx.beginPath();
                    ctx.arc(spX, spY, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(147, 197, 253, " + (1.0 - sparkPhase).toFixed(2) + ")";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 4. Mineral Ochre Pigment Adornment (Symbolic Proto-Culture)
            if (hasOchre) {
                ctx.save();
                ctx.rotate(angle);
                // Three ceremonial ochre stripes on dorsal thorax
                for (let o = -1; o <= 1; o++) {
                    ctx.beginPath();
                    ctx.moveTo(-baseRadius * 0.3 + o * 3.0, -baseRadius * 0.4);
                    ctx.lineTo(-baseRadius * 0.3 + o * 3.0, baseRadius * 0.4);
                    ctx.strokeStyle = "rgba(220, 38, 38, 0.70)"; // Red ochre ferric oxide
                    ctx.lineWidth = 1.4;
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 5. Hafted Composite Spear Weaponry (Birch Tar & Levallois Point)
            if (hasSpear) {
                ctx.save();
                ctx.rotate(angle);

                const shaftLength = baseRadius * 2.2;
                const shaftX = baseRadius * 0.4;
                const shaftY = baseRadius * 0.25;

                // Wooden spear shaft
                ctx.beginPath();
                ctx.moveTo(shaftX - 8.0, shaftY);
                ctx.lineTo(shaftX + shaftLength, shaftY);
                ctx.strokeStyle = "#78350f"; // Hardened ash/yew wood
                ctx.lineWidth = 2.0;
                ctx.stroke();

                // Birch tar mastic binding collar
                ctx.beginPath();
                ctx.rect(shaftX + shaftLength - 5.0, shaftY - 2.5, 5.0, 5.0);
                ctx.fillStyle = "#1e293b"; // Tar mastic black
                ctx.fill();

                // Razor-sharp Levallois triangular stone point
                ctx.beginPath();
                ctx.moveTo(shaftX + shaftLength + 10.0, shaftY); // Distal tip
                ctx.lineTo(shaftX + shaftLength, shaftY - 3.5); // Dorsal barb
                ctx.lineTo(shaftX + shaftLength, shaftY + 3.5); // Ventral barb
                ctx.closePath();
                ctx.fillStyle = "#3b82f6"; // Flint buzul kobalti
                ctx.fill();
                ctx.strokeStyle = "#bfdbfe";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // High-velocity thrust shockwaves when actively hunting
                if (isHunting) {
                    const thrustPulse = 0.5 + 0.5 * Math.sin(t * 0.4);
                    ctx.beginPath();
                    ctx.arc(shaftX + shaftLength + 12.0, shaftY, 6.0 + 4.0 * thrustPulse, -0.6, 0.6);
                    ctx.strokeStyle = "rgba(59, 130, 246, 0.85)";
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                }

                ctx.restore();
            }

            ctx.restore();
        }
    }

    // Export module globally
    global.NeanderthalOpticsRenderer = NeanderthalOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
