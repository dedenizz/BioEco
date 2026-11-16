// BioEcosystem - Urochordata Barrel Tunicate Morphology, Tadpole Larva Optics & Siphon Currents
// Module: src/render/urochordate_optics.js
// Version: 7.98.0 (Hour 518 - Looks & UI Agent: 100th Channel % CPR, Cardiac Reversal Pulse, Siphon Jet & Fouling Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * UrochordateOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for urochordate (tunicates / sea squirts / Ascidiacea) biology:
     * - Free-Swimming Ascidian Tadpole Larva: Translucent micro-chordate trunk, tri-papillary anterior anchors, and glowing caudal notochord
     * - Retrogressive Metamorphosis & Notochord Resorption: Substrate anchoring, tail autolysis halo, and visceral reorientation
     * - Adult Sessile Barrel / Vase Body: Opal-amber cellulosic tunicin mantle with thickness scaling and interior branchial basket
     * - Siphon Detrital Fouling Optics: Particulate silt accumulation and stigmata darkening under heavy seston loading
     * - Squirting Spasm & Jet Evacuation: 25% rapid body contraction, expulsive water droplets, and high-pressure jet discharge
     * - Reversible Tubular Heartbeat Optics: Peristaltic contraction wave traveling in advisceral (+1) or abvisceral (-1) directions
     * - Cardiac Stasis & Arrhythmia Warning: Flickering amber/crimson cardiac pause glow during reversal or hypoxic arrest
     * - Global Benthic Tunicate Colonies: Encrusting basal mats, colonial stolons, and aggregations on hard rocky substratum
     * - 100th Channel (% CPR) Inflow/Efflux Streamlines: Micro-vortices entering branchial siphon and buoyant effluent plumes
     */
    class UrochordateOpticsRenderer {
        /**
         * Render individual urochordate organism based on current life cycle stage.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawUrochordate(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isUrochordate) return;

            if (org.isAdultSessile) {
                UrochordateOpticsRenderer.drawAdultSessileTunicate(ctx, org, tick);
            } else if (org.isAttachedToSubstrate) {
                UrochordateOpticsRenderer.drawMetamorphosingLarva(ctx, org, tick);
            } else if (org.isAscidianTadpole) {
                UrochordateOpticsRenderer.drawTadpoleLarva(ctx, org, tick);
            }
        }

        /**
         * Render free-swimming ascidian tadpole larva with anterior papillae and caudal notochord.
         */
        static drawTadpoleLarva(ctx, org, tick) {
            const trunkL = 14.0;
            const trunkH = 9.5;
            const tailLen = org.tailNotochordLength || 32.0;
            const phase = org.larvalWavePhase || 0.0;

            ctx.save();
            ctx.translate(org.x, org.y);

            const heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. Ovoid Larval Trunk
            ctx.beginPath();
            ctx.ellipse(0, 0, trunkL * 0.5, trunkH * 0.5, 0, 0, Math.PI * 2);
            const trunkGrad = ctx.createRadialGradient(-2, -2, 1, 0, 0, trunkL * 0.6);
            trunkGrad.addColorStop(0, "rgba(254, 243, 199, 0.70)"); // Pale opal amber
            trunkGrad.addColorStop(0.6, "rgba(217, 119, 6, 0.45)");
            trunkGrad.addColorStop(1, "rgba(180, 83, 9, 0.60)");
            ctx.fillStyle = trunkGrad;
            ctx.fill();
            ctx.strokeStyle = "rgba(251, 191, 36, 0.75)";
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // 2. Anterior Adhesive Papillae (Tri-papillary anchor)
            const papX = trunkL * 0.48;
            const papOffset = 3.2;
            ctx.strokeStyle = "rgba(245, 158, 11, 0.90)";
            ctx.lineWidth = 1.0;
            // Dorsal papilla
            ctx.beginPath();
            ctx.moveTo(papX, -papOffset);
            ctx.lineTo(papX + 3.0, -papOffset * 1.2);
            ctx.stroke();
            // Median papilla
            ctx.beginPath();
            ctx.moveTo(papX + 1.0, 0);
            ctx.lineTo(papX + 4.0, 0);
            ctx.stroke();
            // Ventral papilla
            ctx.beginPath();
            ctx.moveTo(papX, papOffset);
            ctx.lineTo(papX + 3.0, papOffset * 1.2);
            ctx.stroke();

            // 3. Statocyst & Photic Eye-Spot
            ctx.beginPath();
            ctx.arc(-trunkL * 0.1, -trunkH * 0.15, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.90)"; // Dark melanin pigment
            ctx.fill();

            // 4. Caudal Tail with Axial Notochord & Fin Folds
            ctx.beginPath();
            ctx.moveTo(-trunkL * 0.45, 0);

            const nPoints = 8;
            const tailPts = [];
            for (let p = 1; p <= nPoints; p++) {
                const ratio = p / nPoints;
                const px = -trunkL * 0.45 - (tailLen * ratio);
                const py = Math.sin(phase + ratio * Math.PI * 2) * (2.8 * ratio);
                tailPts.push({ x: px, y: py });
                ctx.lineTo(px, py);
            }

            // Fin folds surrounding tail
            ctx.strokeStyle = "rgba(253, 230, 138, 0.40)";
            ctx.lineWidth = 3.5;
            ctx.stroke();

            // Luminescent axial notochord core
            ctx.beginPath();
            ctx.moveTo(-trunkL * 0.45, 0);
            for (let i = 0; i < tailPts.length; i++) {
                ctx.lineTo(tailPts[i].x, tailPts[i].y);
            }
            ctx.strokeStyle = "rgba(56, 189, 248, 0.85)"; // Glowing sapphire-cyan notochord
            ctx.lineWidth = 1.1;
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render attached larva undergoing retrogressive metamorphosis and tail autolysis.
         */
        static drawMetamorphosingLarva(ctx, org, tick) {
            const progress = org.notochordResorptionProgress || 0.0;
            const remainingTail = (org.tailNotochordLength || 32.0) * (1.0 - progress);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Basal Adhesive Pad (Anchored to rock)
            ctx.beginPath();
            ctx.ellipse(0, 10, 8.0, 3.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(180, 83, 9, 0.65)";
            ctx.fill();

            // 2. Swelling Visceral Barrel Body (Organ rotation in progress)
            const bodyW = 12.0 + progress * 8.0;
            const bodyH = 16.0 + progress * 14.0;
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyW * 0.5, bodyH * 0.5, 0, 0, Math.PI * 2);
            const metaGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, bodyH * 0.6);
            metaGrad.addColorStop(0, "rgba(254, 243, 199, 0.65)");
            metaGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.40)");
            metaGrad.addColorStop(1, "rgba(217, 119, 6, 0.55)");
            ctx.fillStyle = metaGrad;
            ctx.fill();
            ctx.strokeStyle = "rgba(245, 158, 11, 0.80)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 3. Autolyzing Resorbing Tail Stump & Lysosomal Aura
            if (remainingTail > 2.0) {
                const tailAngle = Math.PI * 0.65 + Math.sin(tick * 0.08) * 0.15;
                const tailEndX = Math.cos(tailAngle) * remainingTail;
                const tailEndY = -bodyH * 0.2 + Math.sin(tailAngle) * remainingTail;

                ctx.beginPath();
                ctx.moveTo(0, -bodyH * 0.2);
                ctx.lineTo(tailEndX, tailEndY);
                ctx.strokeStyle = "rgba(56, 189, 248, " + (0.75 * (1.0 - progress)) + ")";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Pulsing lysosomal autolysis halo around dissolving tail
                const haloPulse = 0.5 + Math.sin(tick * 0.20) * 0.35;
                ctx.beginPath();
                ctx.arc(tailEndX, tailEndY, 3.5 + haloPulse * 2.0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(251, 191, 36, " + (0.35 * (1.0 - progress)) + ")";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render adult sessile barrel tunicate with cellulosic tunic, siphons, branchial basket and reversible heart.
         */
        static drawAdultSessileTunicate(ctx, org, tick) {
            const contraction = org.bodyContractionRatio !== undefined ? org.bodyContractionRatio : 1.0;
            const baseW = org.barrelBodyWidth || 24.0;
            const baseH = org.barrelBodyHeight || 40.0;
            const bodyW = baseW * contraction;
            const bodyH = baseH * contraction;
            const thickness = org.tunicinCoverThickness || 2.4;
            const integrity = org.tunicinIntegrity || 0.85;
            const fouling = org.siphonDetritalFouling || 0.0;
            const isSquirt = org.siphonSquirtingReflex || false;
            const isSpasm = (org.siphonSquirtingSpasmTimer || 0.0) > 0.0;

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Basal Encrusting Anchor (Stolon attachment to rock)
            ctx.beginPath();
            ctx.ellipse(0, bodyH * 0.48, bodyW * 0.55, 5.0 * contraction, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(146, 64, 14, 0.75)";
            ctx.fill();
            ctx.strokeStyle = "rgba(217, 119, 6, 0.60)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 2. Cellulosic Tunic Mantle (Tunicin matrix)
            ctx.beginPath();
            ctx.moveTo(-bodyW * 0.45, bodyH * 0.45);
            ctx.bezierCurveTo(
                -bodyW * 0.65, 0,
                -bodyW * 0.50, -bodyH * 0.40,
                -bodyW * 0.15, -bodyH * 0.48
            ); // Incurrent branchial siphon base
            ctx.lineTo(bodyW * 0.15, -bodyH * 0.48);
            ctx.bezierCurveTo(
                bodyW * 0.35, -bodyH * 0.42,
                bodyW * 0.62, -bodyH * 0.15,
                bodyW * 0.52, bodyH * 0.20
            ); // Excurrent atrial siphon bulge
            ctx.bezierCurveTo(
                bodyW * 0.50, bodyH * 0.35,
                bodyW * 0.40, bodyH * 0.45,
                0, bodyH * 0.48
            );
            ctx.closePath();

            // Opalescent amber cellulosic tunic fill (darkens if fouled)
            const tunicGrad = ctx.createLinearGradient(-bodyW * 0.5, -bodyH * 0.5, bodyW * 0.5, bodyH * 0.5);
            if (fouling >= 0.50) {
                tunicGrad.addColorStop(0, "rgba(217, 119, 6, 0.40)");
                tunicGrad.addColorStop(0.5, "rgba(180, 83, 9, 0.45)");
                tunicGrad.addColorStop(1, "rgba(146, 64, 14, 0.55)");
            } else {
                tunicGrad.addColorStop(0, "rgba(254, 243, 199, " + (0.40 + 0.15 * integrity) + ")");
                tunicGrad.addColorStop(0.5, "rgba(251, 191, 36, " + (0.30 + 0.15 * integrity) + ")");
                tunicGrad.addColorStop(1, "rgba(217, 119, 6, " + (0.45 + 0.20 * integrity) + ")");
            }
            ctx.fillStyle = tunicGrad;
            ctx.fill();

            // Thick tunicin outer border (red alert during squirt spasm)
            ctx.strokeStyle = isSpasm ? "rgba(239, 68, 68, 0.90)" :
                (isSquirt ? "rgba(245, 158, 11, 0.85)" : "rgba(245, 158, 11, 0.80)");
            ctx.lineWidth = Math.max(1.2, thickness * 0.65 * (isSpasm ? 1.3 : 1.0));
            ctx.stroke();

            // 3. Internal Branchial Basket & Ciliated Stigmata
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyW * 0.32, bodyH * 0.32, 0, 0, Math.PI * 2);
            ctx.strokeStyle = org.branchialBasketStall ? "rgba(180, 83, 9, 0.60)" : "rgba(56, 189, 248, 0.40)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Branchial gill bars (stigmata)
            const numBars = 5;
            for (let b = 0; b < numBars; b++) {
                const by = -bodyH * 0.20 + (b * (bodyH * 0.10));
                ctx.beginPath();
                ctx.moveTo(-bodyW * 0.22, by);
                ctx.lineTo(bodyW * 0.22, by);
                ctx.strokeStyle = org.branchialBasketStall ? "rgba(146, 64, 14, 0.50)" : "rgba(125, 211, 252, 0.35)";
                ctx.stroke();
            }

            // Ventral Endostyle Mucus Track
            ctx.beginPath();
            ctx.moveTo(-bodyW * 0.25, -bodyH * 0.22);
            ctx.lineTo(-bodyW * 0.25, bodyH * 0.22);
            ctx.strokeStyle = org.branchialBasketStall ? "rgba(217, 119, 6, 0.55)" : "rgba(20, 184, 166, 0.80)";
            ctx.lineWidth = 1.3;
            ctx.stroke();
            ctx.restore();

            // 4. Reversible Peristaltic Tubular Heart
            const heartX = bodyW * 0.10;
            const heartY = bodyH * 0.24;
            const heartLen = bodyH * 0.25;
            const dir = org.cardiacPeristalsisDirection !== undefined ? org.cardiacPeristalsisDirection : 1;
            const isStasis = org.cardiacStasis || false;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(heartX, heartY - heartLen * 0.5);
            ctx.lineTo(heartX, heartY + heartLen * 0.5);
            ctx.strokeStyle = "rgba(244, 63, 94, 0.35)"; // Delicate tubular heart wall
            ctx.lineWidth = 2.2;
            ctx.lineCap = "round";
            ctx.stroke();

            // Peristaltic contraction wave along heart axis
            if (!isStasis) {
                const pulsePhase = ((tick * 0.08 * dir) % 1.0 + 1.0) % 1.0;
                const waveY = (heartY - heartLen * 0.5) + (heartLen * pulsePhase);

                ctx.beginPath();
                ctx.arc(heartX, waveY, 2.0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(139, 92, 246, 0.90)"; // Glowing royal amethyst cardiac pulse
                ctx.fill();
            } else {
                // Flickering cardiac stasis / arrhythmia warning
                const stasisFlicker = (tick % 6 < 3) ? 0.35 : 0.80;
                ctx.beginPath();
                ctx.arc(heartX, heartY, 2.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(245, 158, 11, " + stasisFlicker + ")";
                ctx.fill();
            }
            ctx.restore();

            // 5. Incurrent Branchial Siphon (Apical mouth)
            const branchialAperture = (org.branchialSiphonAperture || 0.78) * (isSpasm ? 0.15 : (isSquirt ? 0.25 : 1.0));
            const bWidth = bodyW * 0.28 * branchialAperture;
            ctx.beginPath();
            ctx.ellipse(0, -bodyH * 0.48, Math.max(1.5, bWidth), 3.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.45)";
            ctx.fill();
            ctx.strokeStyle = fouling >= 0.50 ? "rgba(180, 83, 9, 0.95)" : "rgba(251, 191, 36, 0.90)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Fouling silt rim deposits around branchial siphon
            if (fouling > 0.25) {
                ctx.beginPath();
                ctx.arc(-bWidth * 0.8, -bodyH * 0.48, 1.2 + fouling * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(146, 64, 14, 0.80)";
                ctx.fill();
            }

            // 6. Excurrent Atrial Siphon (Sub-apical lateral)
            const atrialAperture = (org.atrialSiphonAperture || 0.70) * (isSpasm ? 0.15 : (isSquirt ? 0.20 : 1.0));
            const aWidth = bodyW * 0.22 * atrialAperture;
            ctx.beginPath();
            ctx.ellipse(bodyW * 0.38, -bodyH * 0.28, Math.max(1.2, aWidth), 3.0, 0.45, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.45)";
            ctx.fill();
            ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 7. Siphon Squirt & High-Pressure Water Jet Discharge
            if (isSquirt || isSpasm) {
                const numDrops = isSpasm ? 8 : 5;
                for (let d = 0; d < numDrops; d++) {
                    const dropY = -bodyH * 0.55 - (d * 5.5) - Math.sin(tick * 0.5 + d) * 4.0;
                    const dropX = (d % 2 === 0 ? -1 : 1) * (2.5 + d * 1.8);
                    ctx.beginPath();
                    ctx.arc(dropX, dropY, 1.2 + d * 0.35, 0, Math.PI * 2);
                    ctx.fillStyle = isSpasm ? "rgba(139, 92, 246, 0.85)" : "rgba(56, 189, 248, 0.75)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render global benthic tunicate colonies, basal stolons, and encrusting rocky reef mats.
         */
        static drawGlobalUrochordateReef(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.getMetrics ? manager.getMetrics() : {};
            const adultCount = metrics.activeAdultSessileCount || 0;
            if (adultCount === 0) return;

            const floorY = height - 50;
            ctx.save();

            // Basal colonial stolon threads linking sessile clusters
            ctx.strokeStyle = "rgba(217, 119, 6, 0.22)";
            ctx.lineWidth = 1.2;
            const stolonCount = Math.min(10, adultCount + 3);
            for (let s = 0; s < stolonCount; s++) {
                const sx = ((s * 113 + tick * 0.02) % (width - 40)) + 20;
                ctx.beginPath();
                ctx.moveTo(sx, floorY);
                ctx.quadraticCurveTo(sx + 35, floorY - 8, sx + 70, floorY);
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render incurrent/excurrent hydrodynamic streamlines and ciliary vortices scaled with 100th Channel (% CPR).
         */
        static drawUrochordateSiphonCurrents(ctx, organisms, tick) {
            if (!ctx || !organisms) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isUrochordate) continue;

                if (org.isAdultSessile) {
                    const rate = org.ciliaryPumpingRate || 0.55;
                    if (rate < 0.15 || org.siphonSquirtingReflex) continue;

                    const cpr = org.ciliaryPumpingReversalRatio !== undefined ? org.ciliaryPumpingReversalRatio : 0.70;
                    const bodyH = (org.barrelBodyHeight || 40.0) * (org.bodyContractionRatio || 1.0);
                    const siphonTopX = org.x;
                    const siphonTopY = org.y - bodyH * 0.48;

                    // Converging inflow streamlines toward branchial siphon
                    for (let s = 0; s < 3; s++) {
                        const inPhase = tick * 0.08 + s * 2.1;
                        const inDist = 18.0 - (inPhase % 16.0);
                        const inAngle = -Math.PI * 0.5 + Math.sin(s * 1.5) * 0.45;
                        const inX = siphonTopX + Math.cos(inAngle) * inDist;
                        const inY = siphonTopY + Math.sin(inAngle) * inDist;

                        ctx.beginPath();
                        ctx.arc(inX, inY, 1.2, 0, Math.PI * 2);
                        // Streamline glows royal amethyst when CPR is high
                        ctx.fillStyle = cpr >= 0.60 ? "rgba(139, 92, 246, 0.45)" : "rgba(56, 189, 248, 0.35)";
                        ctx.fill();
                    }
                } else if (org.isAscidianTadpole && !org.isAttachedToSubstrate) {
                    // Micro-eddies shed by swimming larva
                    const spd = org.larvalSwimmingSpeed || 1.80;
                    if (spd > 1.20) {
                        ctx.beginPath();
                        ctx.arc(org.x, org.y, 2.8, 0, Math.PI * 2);
                        ctx.strokeStyle = "rgba(251, 191, 36, 0.28)";
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = UrochordateOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.UrochordateOpticsRenderer = UrochordateOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
