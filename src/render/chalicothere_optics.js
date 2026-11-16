// BioEcosystem - Miocene Clawed Herbivore Radiation: Chalicotheriidae Optics & Hook-Claws
// Module: src/render/chalicothere_optics.js
// Version: 9.43.0 (Hour 663 - Looks & UI Agent: Gorilimsi Eğimli Silüet, Kavisli Orak Pençeler, Tripodal Duruş Aurası ve Dal Kırma Parçacıkları)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalicothereOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Miocene Clawed Perissodactyls (Chalicotheriidae - Chalicotherium, Moropus, Ancylotherium):
     * - Gorilla-Like Sloping Silhouette & Asymmetrical Limb Kinematics:
     *   Elongated forelimbs anchoring elevated shoulders (#475569, #334155) sloping sharply down to a low, stout pelvis.
     * - Retractile Ungual Hook-Claws & Knuckle-Walking Posture:
     *   Curved sickle hook-claws (#cbd5e1 ivory-slate) curled inwards during quadrupedal locomotion to protect cutting edges,
     *   or deployed forward into an arc when hooking high arboreal branches.
     * - Tripodal Feeding Stance Gravitational Stabilization:
     *   Subtle concentric golden-slate seating field (rgba(100, 116, 139, 0.45)) anchoring the caudal pelvis and stout hindlimbs
     *   when rearing up into intermediate tree canopy layers.
     * - 1800 - 3200 N Branch-Hooking Incurvation Arcs & Stripping Sparks:
     *   Elastic golden-amber tension arcs (rgba(234, 179, 8, 0.85)) pulling overhead vegetation downward towards the thoracic basket,
     *   accompanied by verdant leaf-stripping particles (rgba(132, 204, 22, 0.80)) and splintering twig shards.
     * - Lophodont Shearing Microripples:
     *   Concentric high-cementum enamel shearing ripples (rgba(241, 245, 249, 0.65)) radiating from the cranial rostrum during mastication.
     * - Moropus Titan Dimorphism:
     *   When org.isMoropus is true, 20% increased skeletal frame, reinforced cervical hump, and burnished amber shoulder crest.
     */
    class ChalicothereOpticsRenderer {
        /**
         * Render Chalicothere anatomical features and kinetic shaders for a given organism.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Chalicothere organism instance.
         * @param {number} tick - Current simulation tick counter.
         */
        static drawChalicothere(ctx, org, tick) {
            if (!ctx || !org || !org.isChalicothere) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const isMoropus = !!org.isMoropus;
            const baseRadius = org.radius || (isMoropus ? 15.5 : 13.0);
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);

            // Morphological parameters
            const pullForce = org.branchHookingPullForce || 2500;
            const clawRet = org.retractileUngualClaws || 0.86;
            const knuckle = org.knuckleWalkingLocomotion || 0.84;
            const tripodal = org.knuckleWalkingTripodalStance || 0.84;
            const yieldRate = org.foliageStrippingYield || 0.82;
            const isHooking = !!org.isBranchHooking;
            const isTripodal = !!org.isTripodalBrowsing;

            ctx.save();
            ctx.translate(x, y);

            // 1. Tripodal Stance Gravitational Stabilization Field (Seating Ring)
            if (isTripodal) {
                const tripodalPulse = 0.5 + 0.5 * Math.sin(t * 0.20);
                const ringRadius = baseRadius * (1.75 + tripodalPulse * 0.30);

                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(100, 116, 139, " + (0.35 + tripodalPulse * 0.25) + ")";
                ctx.lineWidth = 1.6;
                ctx.setLineDash([4, 3]);
                ctx.stroke();

                // Golden Pelvic Counterweight Hub
                ctx.beginPath();
                ctx.arc(-baseRadius * 0.45, 0, baseRadius * 0.65, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(234, 179, 8, " + (0.12 + tripodalPulse * 0.10) + ")";
                ctx.fill();
                ctx.restore();
            }

            // 2. Branch-Hooking Tension Field & Foliage Incurvation Shaders
            if (isHooking) {
                const hookPulse = 0.5 + 0.5 * Math.sin(t * 0.40);
                const reachDist = baseRadius * (2.2 + hookPulse * 0.6);

                ctx.save();
                ctx.rotate(angle);

                // Overhead Branch Tension Arc
                ctx.beginPath();
                ctx.arc(reachDist * 0.7, 0, reachDist * 0.5, -Math.PI * 0.55, Math.PI * 0.55);
                ctx.strokeStyle = "rgba(234, 179, 8, " + (0.65 + hookPulse * 0.30) + ")";
                ctx.lineWidth = 2.2;
                ctx.stroke();

                // Elastic Incurvation Tendon Lines pulling into claws
                ctx.beginPath();
                ctx.moveTo(reachDist, -baseRadius * 0.7);
                ctx.lineTo(baseRadius * 0.85, -baseRadius * 0.35);
                ctx.moveTo(reachDist, baseRadius * 0.7);
                ctx.lineTo(baseRadius * 0.85, baseRadius * 0.35);
                ctx.strokeStyle = "rgba(250, 204, 21, " + (0.70 + hookPulse * 0.25) + ")";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Foliage Stripping Sparks & Leaf Fragments
                for (let i = 0; i < 5; i++) {
                    const sparkOffset = ((t * 2 + i * 1.3) % 4) / 4;
                    const sparkX = baseRadius * 0.9 + sparkOffset * (reachDist - baseRadius * 0.9);
                    const sparkY = Math.sin(t * 0.3 + i) * baseRadius * 0.8;

                    ctx.beginPath();
                    ctx.arc(sparkX, sparkY, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = (i % 2 === 0) ? "rgba(132, 204, 22, 0.85)" : "rgba(234, 179, 8, 0.90)";
                    ctx.fill();
                }
                ctx.restore();
            }

            // 3. Orient to Direction of Motion or Feeding Target
            ctx.rotate(angle);

            // 4. Gorilloid Sloping Torso & Skeletal Framework
            // High elevated thoracic shoulders tapering down to low lumbar spine
            const headX = baseRadius * 0.85;
            const shoulderX = baseRadius * 0.35;
            const pelvisX = -baseRadius * 0.65;
            const shoulderWidth = baseRadius * 0.95;
            const pelvisWidth = baseRadius * 0.65;

            ctx.beginPath();
            ctx.moveTo(headX, 0);
            ctx.quadraticCurveTo(shoulderX, -shoulderWidth, pelvisX, -pelvisWidth);
            ctx.quadraticCurveTo(pelvisX - baseRadius * 0.3, 0, pelvisX, pelvisWidth);
            ctx.quadraticCurveTo(shoulderX, shoulderWidth, headX, 0);
            ctx.closePath();

            // Gradient: Stone-slate brown to charcoal with amber shoulder wash
            const bodyGrad = ctx.createLinearGradient(pelvisX, 0, headX, 0);
            bodyGrad.addColorStop(0, "#1e293b"); // Deep charcoal caudal pelvis
            bodyGrad.addColorStop(0.45, isMoropus ? "#475569" : "#334155"); // Robust dorsal slate
            bodyGrad.addColorStop(1, isMoropus ? "#64748b" : "#475569"); // High shoulder mantle

            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = isMoropus ? "#94a3b8" : "#64748b";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // 5. Dorsal Wither & Scapular Musculature Ridge
            ctx.beginPath();
            ctx.ellipse(shoulderX * 0.7, 0, baseRadius * 0.45, baseRadius * 0.28, 0, 0, Math.PI * 2);
            ctx.fillStyle = isMoropus ? "rgba(234, 179, 8, 0.22)" : "rgba(100, 116, 139, 0.28)";
            ctx.fill();

            // 6. Massive Forelimbs & Flexed Knuckles (Knuckle-Walking Nodes)
            const knuckleOffset = (speed > 0.1) ? Math.sin(t * 0.35) * baseRadius * 0.25 : 0;
            const forelimbLength = baseRadius * (1.25 + knuckle * 0.25);

            // Left Forelimb (Knuckle Joint)
            ctx.beginPath();
            ctx.moveTo(shoulderX, -shoulderWidth * 0.85);
            ctx.lineTo(shoulderX + forelimbLength * 0.65 + knuckleOffset, -shoulderWidth * 1.05);
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 3.2;
            ctx.stroke();

            // Left Knuckle Pad
            ctx.beginPath();
            ctx.arc(shoulderX + forelimbLength * 0.65 + knuckleOffset, -shoulderWidth * 1.05, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = "#334155";
            ctx.fill();

            // Right Forelimb (Knuckle Joint)
            ctx.beginPath();
            ctx.moveTo(shoulderX, shoulderWidth * 0.85);
            ctx.lineTo(shoulderX + forelimbLength * 0.65 - knuckleOffset, shoulderWidth * 1.05);
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 3.2;
            ctx.stroke();

            // Right Knuckle Pad
            ctx.beginPath();
            ctx.arc(shoulderX + forelimbLength * 0.65 - knuckleOffset, shoulderWidth * 1.05, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = "#334155";
            ctx.fill();

            // 7. Retractile Ungual Hook-Claws (Curved Sickles)
            // Left Ungual Hook-Claws
            const clawAngleLeft = isHooking ? 0.35 : (knuckle * 1.25);
            ctx.save();
            ctx.translate(shoulderX + forelimbLength * 0.65 + knuckleOffset, -shoulderWidth * 1.05);
            ctx.rotate(isHooking ? -0.2 : clawAngleLeft);

            // 3-Tined Hook-Claw Ensemble
            for (let c = -1; c <= 1; c++) {
                const clawLen = baseRadius * (0.45 + clawRet * 0.25);
                ctx.beginPath();
                ctx.moveTo(0, c * 2.2);
                ctx.quadraticCurveTo(clawLen * 0.6, c * 3.5, clawLen * 0.85, c * 1.5 - clawLen * 0.45);
                ctx.strokeStyle = "#cbd5e1"; // Ivory-slate hook
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }
            ctx.restore();

            // Right Ungual Hook-Claws
            ctx.save();
            ctx.translate(shoulderX + forelimbLength * 0.65 - knuckleOffset, shoulderWidth * 1.05);
            ctx.rotate(isHooking ? 0.2 : -clawAngleLeft);

            for (let c = -1; c <= 1; c++) {
                const clawLen = baseRadius * (0.45 + clawRet * 0.25);
                ctx.beginPath();
                ctx.moveTo(0, c * 2.2);
                ctx.quadraticCurveTo(clawLen * 0.6, c * 3.5, clawLen * 0.85, c * 1.5 + clawLen * 0.45);
                ctx.strokeStyle = "#cbd5e1";
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }
            ctx.restore();

            // 8. Stout Hindlimbs & Pelvic Anchor Blocks
            // Left Hindlimb
            ctx.beginPath();
            ctx.moveTo(pelvisX, -pelvisWidth * 0.8);
            ctx.lineTo(pelvisX - baseRadius * 0.35, -pelvisWidth * 1.1);
            ctx.strokeStyle = "#1e293b";
            ctx.lineWidth = 3.6;
            ctx.stroke();

            // Right Hindlimb
            ctx.beginPath();
            ctx.moveTo(pelvisX, pelvisWidth * 0.8);
            ctx.lineTo(pelvisX - baseRadius * 0.35, pelvisWidth * 1.1);
            ctx.strokeStyle = "#1e293b";
            ctx.lineWidth = 3.6;
            ctx.stroke();

            // 9. Cranium, High Rostrum & Lophodont Mastication Shearing Microripples
            ctx.beginPath();
            ctx.arc(headX, 0, baseRadius * 0.42, 0, Math.PI * 2);
            ctx.fillStyle = isMoropus ? "#64748b" : "#475569";
            ctx.fill();
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Lateral Nares / Muzzle
            ctx.beginPath();
            ctx.arc(headX + baseRadius * 0.28, 0, baseRadius * 0.16, 0, Math.PI * 2);
            ctx.fillStyle = "#334155";
            ctx.fill();

            // Lophodont Shearing Microripples during feeding
            if (isHooking || isTripodal) {
                const chewPulse = 0.5 + 0.5 * Math.sin(t * 0.50);
                ctx.beginPath();
                ctx.arc(headX + baseRadius * 0.15, 0, baseRadius * (0.35 + chewPulse * 0.18), 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(241, 245, 249, " + (0.40 + chewPulse * 0.35) + ")";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            // Lateral Eyes
            ctx.beginPath();
            ctx.arc(headX, -baseRadius * 0.22, 1.4, 0, Math.PI * 2);
            ctx.arc(headX, baseRadius * 0.22, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = "#fbbf24"; // Keen herbivore amber pupil
            ctx.fill();

            // Short Perissodactyl Tail
            ctx.beginPath();
            ctx.moveTo(pelvisX - baseRadius * 0.25, 0);
            ctx.lineTo(pelvisX - baseRadius * 0.55, 0);
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            ctx.restore();
        }
    }

    // Export module to global scope
    global.ChalicothereOpticsRenderer = ChalicothereOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
