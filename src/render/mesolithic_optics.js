// BioEcosystem - Mesolithic Fishery, Barbed Harpoons, Weir Traps & Dugout Canoe Optics
// Module: src/render/mesolithic_optics.js
// Version: 9.89.0 (Hour 709 - Looks & UI Agent: Barbed Harpoon Strikes, Refraction Shockwaves, Willow Weirs, Dugout Canoe Dynamics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MesolithicOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Mesolithic coastal/riparian fishery:
     * 1. Barbed Bone Harpoon & Strike Vectors:
     *    - When hasBarbedHarpoon is true, renders an ivory/antler shaft with backward-pointing serrated teeth (#f43f5e, #fb7185).
     *    - When isHarpoonStriking is true, renders an aquatic piercing ray into the water column with refraction-corrected offset arcs.
     * 2. Riparian Stone/Stake Weirs & Woven Willow Basket Traps:
     *    - When hasRiparianWeir is true, renders subtle V-shaped weir stakes and woven hazel/willow lattice grids (#06b6d4, #22d3ee).
     *    - Radiating aquatic ripples and capture nodes indicate continuous passive harvesting.
     * 3. Dugout Canoe (Log Boat) Hull & Paddling Wavelet Wake:
     *    - When hasDugoutCanoe is true, renders an elongated organic dugout timber hull (#b45309, #d97706, #92400e) contouring the hunter.
     *    - Lateral paddle strokes and laminar hydrodynamic wake trails signify agile waterway navigation.
     * 4. Dual Mesolithic Riparian Aura:
     *    - A soft gradient aura combining coral-red (#f43f5e) and river-turquoise (#06b6d4) signifies high-yield aquatic subsistence.
     */
    class MesolithicOpticsRenderer {
        /**
         * Render barbed harpoons, weir traps, dugout canoe hulls, and aquatic harvesting optics.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Simulation tick.
         */
        static drawMesolithic(ctx, org, tick) {
            if (!ctx || !org) return;

            const hasHarpoon = !!org.hasBarbedHarpoon;
            const hasWeir = !!org.hasRiparianWeir;
            const hasCanoe = !!org.hasDugoutCanoe;

            if (!hasHarpoon && !hasWeir && !hasCanoe) return;

            const x = org.x || 0;
            const y = org.y || 0;
            const r = Math.max(8, org.radius || 12);
            const heading = org.heading || Math.atan2(org.vy || 0, org.vx || 0) || 0;
            const t = (tick || 0) * 0.05;

            ctx.save();
            ctx.translate(x, y);

            // 1. Dugout Canoe (Log Boat) Hull Rendering
            if (hasCanoe) {
                this.drawDugoutCanoe(ctx, org, r, heading, t);
            }

            // 2. Riparian Weir & Willow Basket Trap Passive Lattice
            if (hasWeir) {
                this.drawRiparianWeir(ctx, org, r, heading, t);
            }

            // 3. Barbed Bone Harpoon & Strike Vector
            if (hasHarpoon) {
                this.drawBarbedHarpoon(ctx, org, r, heading, t);
            }

            // 4. Dual Mesolithic Riparian Subsistence Aura
            this.drawRiparianAura(ctx, org, r, t);

            ctx.restore();
        }

        /**
         * Render Dugout Canoe (Log Boat) Hull & Hydrodynamic Water Wake.
         */
        static drawDugoutCanoe(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const canoeLength = r * 3.2;
            const canoeBeam = r * 1.35;

            // Dugout timber hull gradient (fire-hollowed pine/oak)
            const hullGrad = ctx.createLinearGradient(-canoeLength * 0.5, 0, canoeLength * 0.5, 0);
            hullGrad.addColorStop(0, "rgba(146, 64, 14, 0.85)");   // Deep burnt timber stern
            hullGrad.addColorStop(0.5, "rgba(217, 119, 6, 0.75)"); // Honey-grained oak beam
            hullGrad.addColorStop(1, "rgba(180, 83, 9, 0.90)");   // Tapered bow

            // Draw curved canoe hull
            ctx.beginPath();
            ctx.ellipse(0, 0, canoeLength * 0.5, canoeBeam * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = hullGrad;
            ctx.fill();
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = "rgba(245, 158, 11, 0.90)";
            ctx.stroke();

            // Inner hollow cavity
            ctx.beginPath();
            ctx.ellipse(0, 0, canoeLength * 0.42, canoeBeam * 0.34, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(67, 20, 7, 0.60)";
            ctx.fill();

            // Paddling wake ripples if moving or actively paddling
            if (org.isCanoePaddling || Math.hypot(org.vx || 0, org.vy || 0) > 0.8) {
                const wakeOsc = Math.sin(t * 3.0) * 2.0;
                ctx.beginPath();
                ctx.moveTo(-canoeLength * 0.5, -canoeBeam * 0.4);
                ctx.lineTo(-canoeLength * 0.85, -canoeBeam * 0.9 + wakeOsc);
                ctx.moveTo(-canoeLength * 0.5, canoeBeam * 0.4);
                ctx.lineTo(-canoeLength * 0.85, canoeBeam * 0.9 - wakeOsc);
                ctx.strokeStyle = "rgba(6, 182, 212, 0.65)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Paddle blade stroke indicator
                const paddleSide = Math.sin(t * 2.0) > 0 ? 1 : -1;
                const paddleY = paddleSide * (canoeBeam * 0.65 + Math.abs(Math.sin(t * 4.0)) * 4.0);
                ctx.beginPath();
                ctx.ellipse(canoeLength * 0.1, paddleY, 3.5, 1.8, paddleSide * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(217, 119, 6, 0.95)";
                ctx.fill();
                ctx.strokeStyle = "rgba(6, 182, 212, 0.85)";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render Riparian Weir Stakes & Woven Willow Basket Trap.
         */
        static drawRiparianWeir(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const weirDist = r * 1.8;
            const weirSpan = r * 1.5;

            // V-shaped weir barrier stakes
            ctx.beginPath();
            ctx.moveTo(weirDist, -weirSpan);
            ctx.lineTo(weirDist * 0.6, 0); // Apex funnel
            ctx.lineTo(weirDist, weirSpan);
            ctx.strokeStyle = "rgba(6, 182, 212, 0.70)";
            ctx.lineWidth = 1.4;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Conic woven basket trap at apex
            const apexX = weirDist * 0.6;
            ctx.beginPath();
            ctx.arc(apexX, 0, 4.0 + Math.sin(t * 2.5) * 1.0, 0, Math.PI * 2);
            ctx.fillStyle = org.isHarvestingWeir ? "rgba(34, 211, 238, 0.85)" : "rgba(6, 182, 212, 0.45)";
            ctx.fill();
            ctx.strokeStyle = "rgba(6, 182, 212, 0.95)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Passive harvest pulse particles
            if (org.isHarvestingWeir) {
                for (let i = 0; i < 4; i++) {
                    const ang = t * 3.0 + (i * Math.PI * 0.5);
                    const pr = 6.0 + Math.sin(t * 4.0 + i) * 3.0;
                    ctx.beginPath();
                    ctx.arc(apexX + Math.cos(ang) * pr, Math.sin(ang) * pr, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.90)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render Barbed Bone Harpoon & Piercing Strike Vector.
         */
        static drawBarbedHarpoon(ctx, org, r, heading, t) {
            ctx.save();
            ctx.rotate(heading);

            const harpoonLen = r * 2.2;
            const strikeActive = !!org.isHarpoonStriking;
            const strikeOffset = strikeActive ? (Math.sin(t * 8.0) * 8.0 + 10.0) : 0;

            const startX = r * 0.5 + strikeOffset;
            const tipX = startX + harpoonLen;

            // Harpoon bone/antler shaft
            ctx.beginPath();
            ctx.moveTo(startX, 0);
            ctx.lineTo(tipX, 0);
            ctx.strokeStyle = "rgba(244, 63, 94, 0.85)";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Backward-pointing retaining barbs (uniserial/biserial teeth)
            const numBarbs = 3;
            for (let i = 1; i <= numBarbs; i++) {
                const bx = tipX - (i * (harpoonLen * 0.22));
                // Upper barb
                ctx.beginPath();
                ctx.moveTo(bx, 0);
                ctx.lineTo(bx - 4.5, -3.5);
                ctx.strokeStyle = "rgba(251, 113, 133, 0.95)";
                ctx.lineWidth = 1.3;
                ctx.stroke();

                // Lower barb
                ctx.beginPath();
                ctx.moveTo(bx, 0);
                ctx.lineTo(bx - 4.5, 3.5);
                ctx.strokeStyle = "rgba(251, 113, 133, 0.95)";
                ctx.lineWidth = 1.3;
                ctx.stroke();
            }

            // Piercing point (acute triangular antler tip)
            ctx.beginPath();
            ctx.moveTo(tipX, 0);
            ctx.lineTo(tipX - 5.0, -2.5);
            ctx.lineTo(tipX - 5.0, 2.5);
            ctx.closePath();
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.fill();

            // Refraction correction shockwave halo if striking
            if (strikeActive) {
                ctx.beginPath();
                ctx.arc(tipX + 4.0, 0, 7.0 + Math.sin(t * 6.0) * 3.0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(244, 63, 94, 0.70)";
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render Dual Mesolithic Riparian Subsistence Aura.
         */
        static drawRiparianAura(ctx, org, r, t) {
            const auraRadius = r * 1.85 + Math.sin(t * 1.5) * 2.0;
            const grad = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, auraRadius);
            grad.addColorStop(0, "rgba(244, 63, 94, 0.12)"); // Coral red core
            grad.addColorStop(0.6, "rgba(6, 182, 212, 0.16)"); // River turquoise fringe
            grad.addColorStop(1, "rgba(6, 182, 212, 0.0)");

            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }
    }

    global.MesolithicOpticsRenderer = MesolithicOpticsRenderer;
})(typeof window !== "undefined" ? window : global);
