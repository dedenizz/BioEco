// BioEcosystem - Miocene Apex Predator Radiation: Machairodontinae & Amphicyonidae Optics & Animation Shaders
// Module: src/render/machairodont_optics.js
// Version: 9.49.0 (Hour 669 - Looks & UI Agent: Kılıç Dişli Pusu Işıltısı, Hançer Kanin Dilimleme Yayları, Köpek-Ayı Kemik Kırma Şok Dalgaları)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MachairodontOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Miocene Apex Predators:
     * 1. Machairodontinae (Early Saber-Toothed Cats - Pseudaelurus, Machairodus):
     *    - Muscular Felid Stalking Frame (#c2410c, #9a3412, #7c2d12):
     *      Low-slung stealth posture, heavy forequarters, and muscular shoulders for overpowering large herbivores.
     *    - Prominent Curved Upper Saber Canines (#f8fafc, #e2e8f0):
     *      Long laterally compressed dagger teeth protruding downward, reflecting microscopic specular highlights.
     *    - Hyper-Extended Jaw Gape & Cervical Shear Strike Shaders:
     *      When isSaberStriking is active, jaw swings open to 90-110 deg with crimson laceration arcs
     *      (rgba(185, 28, 28, 0.85)) and arterial spray particles (rgba(225, 29, 72, 0.85)).
     *    - Grappling Forelimb Latch & Hooked Claws:
     *      When isPreyGrappled is active, radial pinning arcs (rgba(244, 63, 94, 0.50)) clamp the target beneath the claws.
     * 2. Amphicyonidae (Apex "Bear-Dogs" - Amphicyon giganteus):
     *    - Heavy Robust Cranium & Sagittal Crest (#78350f, #92400e):
     *      Massive deep-bodied jaw, flaring zygomatic arches, and broad chest.
     *    - Bone-Crushing Radial Shockwaves & Marrow Extraction Shaders:
     *      When isBearDogCrushing is active, concentric amber bone fracture rings (rgba(217, 119, 6, 0.85))
     *      and bone splinter sparks (rgba(251, 191, 36, 0.90)) radiate from the jaws.
     *    - Semi-Plantigrade Endurance Agility Dust:
     *      Subtle golden amber drift particles behind paws reflecting tireless open-savannah chase stamina.
     */
    class MachairodontOpticsRenderer {
        /**
         * Render Machairodont or Amphicyonid anatomical features and kinetic shaders.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawMachairodont(ctx, org, tick) {
            if (!ctx || !org || (!org.isMachairodont && !org.isAmphicyonid)) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);

            ctx.save();
            ctx.translate(x, y);

            if (org.isMachairodont) {
                // === MACHAIRODONTINAE RENDERING ===
                const baseRadius = org.radius || 15.0;
                const saberLen = org.saberCanineLength || 13.0;
                const gapeDeg = org.hyperExtendedJawGape || 100.0;
                const isStriking = !!org.isSaberStriking;
                const isGrappling = !!org.isPreyGrappled;

                // 1. Grappling Latch Aura (Prey Pinning Forcefield)
                if (isGrappling) {
                    const grapplePulse = 0.5 + 0.5 * Math.sin(t * 0.35);
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(0, 0, baseRadius * (1.65 + grapplePulse * 0.25), 0, Math.PI * 2);
                    ctx.strokeStyle = "rgba(225, 29, 72, " + (0.45 + grapplePulse * 0.35) + ")";
                    ctx.lineWidth = 1.8;
                    ctx.setLineDash([5, 3]);
                    ctx.stroke();

                    // Pinning Clamping Arcs
                    ctx.beginPath();
                    ctx.arc(baseRadius * 0.8, 0, baseRadius * 0.9, -Math.PI * 0.4, Math.PI * 0.4);
                    ctx.strokeStyle = "rgba(244, 63, 94, 0.75)";
                    ctx.lineWidth = 2.2;
                    ctx.stroke();
                    ctx.restore();
                }

                // 2. Cervical Shear-Bite Flash & Arterial Laceration Particles
                if (isStriking) {
                    const strikePulse = 0.5 + 0.5 * Math.sin(t * 0.50);
                    ctx.save();
                    ctx.rotate(angle);

                    // Arterial Shear Tension Arc
                    ctx.beginPath();
                    ctx.arc(baseRadius * 1.2, 0, baseRadius * 0.65, -Math.PI * 0.6, Math.PI * 0.6);
                    ctx.strokeStyle = "rgba(185, 28, 28, " + (0.75 + strikePulse * 0.25) + ")";
                    ctx.lineWidth = 2.4;
                    ctx.stroke();

                    // Laceration Droplet Sparks
                    for (let p = 0; p < 6; p++) {
                        const sparkOffset = ((t * 3 + p * 1.5) % 5) / 5;
                        const px = baseRadius * 1.1 + sparkOffset * baseRadius * 0.8;
                        const py = Math.sin(t * 0.4 + p) * baseRadius * 0.7;

                        ctx.beginPath();
                        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
                        ctx.fillStyle = (p % 2 === 0) ? "rgba(185, 28, 28, 0.90)" : "rgba(225, 29, 72, 0.85)";
                        ctx.fill();
                    }
                    ctx.restore();
                }

                // 3. Orient to Direction of Motion
                ctx.rotate(angle);

                // 4. Stalking Felid Body Silhuette
                // Heavy thoracic shoulders tapering to agile lumbar spine
                const headX = baseRadius * 0.85;
                const shoulderX = baseRadius * 0.30;
                const flankX = -baseRadius * 0.60;
                const shoulderW = baseRadius * 0.85;
                const flankW = baseRadius * 0.55;

                ctx.beginPath();
                ctx.moveTo(headX, 0);
                ctx.quadraticCurveTo(shoulderX, -shoulderW, flankX, -flankW);
                ctx.quadraticCurveTo(flankX - baseRadius * 0.25, 0, flankX, flankW);
                ctx.quadraticCurveTo(shoulderX, shoulderW, headX, 0);
                ctx.closePath();

                // Tawny Ochre to Burnt Sienna Gradient
                const felidGrad = ctx.createLinearGradient(flankX, 0, headX, 0);
                felidGrad.addColorStop(0, "#7c2d12"); // Dark caudal flank
                felidGrad.addColorStop(0.5, "#9a3412"); // Rich sienna thorax
                felidGrad.addColorStop(1, "#c2410c"); // Bright ochre cranium

                ctx.fillStyle = felidGrad;
                ctx.fill();
                ctx.strokeStyle = "#ea580c";
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // 5. Massive Muscular Forequarters & Retractile Claws
                const clawReach = (speed > 0.1 || isStriking) ? Math.sin(t * 0.4) * baseRadius * 0.2 : 0;

                // Left Foreleg
                ctx.beginPath();
                ctx.moveTo(shoulderX, -shoulderW * 0.85);
                ctx.lineTo(shoulderX + baseRadius * 0.7 + clawReach, -shoulderW * 1.05);
                ctx.strokeStyle = "#9a3412";
                ctx.lineWidth = 3.2;
                ctx.stroke();

                // Left Claws (Hooked Sickles)
                ctx.beginPath();
                ctx.arc(shoulderX + baseRadius * 0.7 + clawReach, -shoulderW * 1.05, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = "#e2e8f0";
                ctx.fill();

                // Right Foreleg
                ctx.beginPath();
                ctx.moveTo(shoulderX, shoulderW * 0.85);
                ctx.lineTo(shoulderX + baseRadius * 0.7 - clawReach, shoulderW * 1.05);
                ctx.strokeStyle = "#9a3412";
                ctx.lineWidth = 3.2;
                ctx.stroke();

                // Right Claws
                ctx.beginPath();
                ctx.arc(shoulderX + baseRadius * 0.7 - clawReach, shoulderW * 1.05, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = "#e2e8f0";
                ctx.fill();

                // 6. Cranium & Wide-Gape Jaw Kinematics
                ctx.beginPath();
                ctx.arc(headX, 0, baseRadius * 0.40, 0, Math.PI * 2);
                ctx.fillStyle = "#9a3412";
                ctx.fill();
                ctx.strokeStyle = "#f87171";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Cranial Muzzle / Snout
                ctx.beginPath();
                ctx.arc(headX + baseRadius * 0.25, 0, baseRadius * 0.16, 0, Math.PI * 2);
                ctx.fillStyle = "#7c2d12";
                ctx.fill();

                // Eyes (Predatory Amber)
                ctx.beginPath();
                ctx.arc(headX + baseRadius * 0.05, -baseRadius * 0.20, 1.4, 0, Math.PI * 2);
                ctx.arc(headX + baseRadius * 0.05, baseRadius * 0.20, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "#fbbf24";
                ctx.fill();

                // 7. Prominent Curved Saber Canines (Dagger Teeth)
                // When striking, jaws open wide to gapeDeg; otherwise they protrude elegantly
                const toothLen = baseRadius * (0.50 + (saberLen / 18.0) * 0.45);
                const gapeFactor = isStriking ? (gapeDeg / 100.0) : 0.45;

                // Left Saber Canine
                ctx.beginPath();
                ctx.moveTo(headX + baseRadius * 0.22, -baseRadius * 0.12);
                ctx.quadraticCurveTo(
                    headX + baseRadius * 0.40 + gapeFactor * 2.0,
                    -baseRadius * 0.18 - toothLen * 0.5,
                    headX + baseRadius * 0.15,
                    -baseRadius * 0.12 - toothLen
                );
                ctx.strokeStyle = "#f8fafc"; // Ivory blade
                ctx.lineWidth = 2.0;
                ctx.stroke();

                // Right Saber Canine
                ctx.beginPath();
                ctx.moveTo(headX + baseRadius * 0.22, baseRadius * 0.12);
                ctx.quadraticCurveTo(
                    headX + baseRadius * 0.40 + gapeFactor * 2.0,
                    baseRadius * 0.18 + toothLen * 0.5,
                    headX + baseRadius * 0.15,
                    baseRadius * 0.12 + toothLen
                );
                ctx.strokeStyle = "#f8fafc";
                ctx.lineWidth = 2.0;
                ctx.stroke();

                // Short Tail
                ctx.beginPath();
                ctx.moveTo(flankX - baseRadius * 0.2, 0);
                ctx.lineTo(flankX - baseRadius * 0.55, 0);
                ctx.strokeStyle = "#7c2d12";
                ctx.lineWidth = 2.0;
                ctx.stroke();

            } else if (org.isAmphicyonid) {
                // === AMPHICYONIDAE (BEAR-DOG) RENDERING ===
                const baseRadius = org.radius || 17.0;
                const crushForce = org.amphicyonidCrushForce || 3600;
                const isCrushing = !!org.isBearDogCrushing;

                // 1. Radial Bone-Cracking Shockwaves
                if (isCrushing) {
                    const crushPulse = 0.5 + 0.5 * Math.sin(t * 0.45);
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(0, 0, baseRadius * (1.8 + crushPulse * 0.4), 0, Math.PI * 2);
                    ctx.strokeStyle = "rgba(217, 119, 6, " + (0.50 + crushPulse * 0.35) + ")";
                    ctx.lineWidth = 2.0;
                    ctx.setLineDash([4, 4]);
                    ctx.stroke();

                    // Marrow Extraction Concentric Ring
                    ctx.beginPath();
                    ctx.arc(baseRadius * 0.7, 0, baseRadius * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(245, 158, 11, " + (0.15 + crushPulse * 0.15) + ")";
                    ctx.fill();

                    // Bone Splinter Sparks
                    for (let s = 0; s < 5; s++) {
                        const sAngle = (s * Math.PI * 2) / 5 + t * 0.2;
                        const sDist = baseRadius * (1.1 + Math.sin(t * 0.5 + s) * 0.4);
                        ctx.beginPath();
                        ctx.arc(Math.cos(sAngle) * sDist, Math.sin(sAngle) * sDist, 1.8, 0, Math.PI * 2);
                        ctx.fillStyle = (s % 2 === 0) ? "rgba(251, 191, 36, 0.95)" : "rgba(217, 119, 6, 0.90)";
                        ctx.fill();
                    }
                    ctx.restore();
                }

                // 2. Orient to Direction of Motion
                ctx.rotate(angle);

                // 3. Robust Massive Bear-Dog Silhouette
                // Broad ribcage, thick neck, powerful lumbar
                const headX = baseRadius * 0.85;
                const thoraxX = baseRadius * 0.25;
                const pelvisX = -baseRadius * 0.65;
                const thoraxW = baseRadius * 1.0;
                const pelvisW = baseRadius * 0.75;

                ctx.beginPath();
                ctx.moveTo(headX, 0);
                ctx.quadraticCurveTo(thoraxX, -thoraxW, pelvisX, -pelvisW);
                ctx.quadraticCurveTo(pelvisX - baseRadius * 0.3, 0, pelvisX, pelvisW);
                ctx.quadraticCurveTo(thoraxX, thoraxW, headX, 0);
                ctx.closePath();

                // Dark Umber to Rich Ochre Gradient
                const bearGrad = ctx.createLinearGradient(pelvisX, 0, headX, 0);
                bearGrad.addColorStop(0, "#451a03"); // Deep umber hindquarters
                bearGrad.addColorStop(0.55, "#78350f"); // Heavy brown thorax
                bearGrad.addColorStop(1, "#92400e"); // Robust amber cranium

                ctx.fillStyle = bearGrad;
                ctx.fill();
                ctx.strokeStyle = "#d97706";
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // 4. Prominent Sagittal Crest & Jaw Adductor Muscle Bulge
                ctx.beginPath();
                ctx.ellipse(thoraxX * 0.8, 0, baseRadius * 0.50, baseRadius * 0.32, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(217, 119, 6, 0.25)";
                ctx.fill();

                // 5. Heavy Limbs & Semi-Plantigrade Footpads
                const stride = (speed > 0.1) ? Math.sin(t * 0.35) * baseRadius * 0.25 : 0;

                // Left Foreleg
                ctx.beginPath();
                ctx.moveTo(thoraxX, -thoraxW * 0.85);
                ctx.lineTo(thoraxX + baseRadius * 0.6 + stride, -thoraxW * 1.1);
                ctx.strokeStyle = "#78350f";
                ctx.lineWidth = 3.8;
                ctx.stroke();

                // Right Foreleg
                ctx.beginPath();
                ctx.moveTo(thoraxX, thoraxW * 0.85);
                ctx.lineTo(thoraxX + baseRadius * 0.6 - stride, thoraxW * 1.1);
                ctx.strokeStyle = "#78350f";
                ctx.lineWidth = 3.8;
                ctx.stroke();

                // 6. Broad Craniomandibular Head & Crushing Jaws
                ctx.beginPath();
                ctx.arc(headX, 0, baseRadius * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = "#92400e";
                ctx.fill();
                ctx.strokeStyle = "#fbbf24";
                ctx.lineWidth = 1.3;
                ctx.stroke();

                // Broad Muzzle
                ctx.beginPath();
                ctx.ellipse(headX + baseRadius * 0.25, 0, baseRadius * 0.20, baseRadius * 0.18, 0, 0, Math.PI * 2);
                ctx.fillStyle = "#451a03";
                ctx.fill();

                // Eyes (Keen Canine-Ursid Amber)
                ctx.beginPath();
                ctx.arc(headX + baseRadius * 0.05, -baseRadius * 0.22, 1.5, 0, Math.PI * 2);
                ctx.arc(headX + baseRadius * 0.05, baseRadius * 0.22, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = "#f59e0b";
                ctx.fill();

                // Heavy Interlocking Canines
                ctx.beginPath();
                ctx.moveTo(headX + baseRadius * 0.35, -baseRadius * 0.15);
                ctx.lineTo(headX + baseRadius * 0.48, -baseRadius * 0.25);
                ctx.moveTo(headX + baseRadius * 0.35, baseRadius * 0.15);
                ctx.lineTo(headX + baseRadius * 0.48, baseRadius * 0.25);
                ctx.strokeStyle = "#fef3c7";
                ctx.lineWidth = 2.2;
                ctx.stroke();

                // Sturdy Tail
                ctx.beginPath();
                ctx.moveTo(pelvisX - baseRadius * 0.2, 0);
                ctx.lineTo(pelvisX - baseRadius * 0.6, 0);
                ctx.strokeStyle = "#451a03";
                ctx.lineWidth = 2.4;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MachairodontOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.MachairodontOpticsRenderer = MachairodontOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
