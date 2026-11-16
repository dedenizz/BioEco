// BioEcosystem - Ophiuroid Morphology, Vertebral Ossicles & Serpentiform Optics
// Module: src/render/ophiuroid_optics.js
// Version: 7.63.0 (Hour 483 - Looks Agent: Distinct Central Disc, Vertebral Chains, Lateral Spines & Decoy Segments)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OphiuroidOpticsRenderer
     * High-fidelity scientific microscope optics for ophiuroid (brittle star) anatomy and locomotion:
     * - Distinct Central Disc: Pentagonal or circular disc sharply demarcated from slender arms, with radial shield plates
     * - Serpentine Vertebral Arm Chains: Slender, sinuous arms made of articulated vertebral ossicle beads undulating horizontally
     * - Lateral Arm Spine Combs: Fine calcite lateral spines and papillate sensory tube feet protruding from arm segments
     * - Lateral Sinusoidal Locomotion Waves: Dynamic sinusoidal ripples and kinetic motion trails reflecting rapid slithering
     * - Fragile Multi-Point Autotomy: Clean vertebral fracture planes with silver-green blastema regeneration buds
     * - Autonomous Wriggling Decoy Segments: Detached distal arm segments convulsing rapidly in the water column
     * - Global Benthic Crevice Stratum: Micro-refuge shadows and serpentine substrate displacement tracks
     */
    class OphiuroidOpticsRenderer {
        /**
         * Render individual ophiuroid organism with distinct disc, 5 sinuous vertebral arms, and spines.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawOphiuroid(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isOphiuroid) return;

            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);
            const discRatio = org.discDiameterRatio || 0.55;
            const discRadius = size * discRatio;
            const arms = org.ophiuroidArms || [];
            const wavePhase = org.lateralWavePhase || 0.0;
            const speed = org.serpentiformSpeed || 1.45;
            const isFleeing = (org.energy && org.energy < 30.0) || org.isSegmentAutotomized;

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Kinetic Slithering Motion Aura (when rapidly slithering)
            OphiuroidOpticsRenderer.drawSlitheringKineticAura(ctx, discRadius, speed, isFleeing, tick);

            // 2. 5 Serpentine Vertebral Arms with Articulated Segments & Lateral Spines
            OphiuroidOpticsRenderer.drawVertebralArms(ctx, size, discRadius, arms, wavePhase, speed, tick);

            // 3. Distinct Central Pentagonal Disc & Radial Shield Plates
            OphiuroidOpticsRenderer.drawCentralDisc(ctx, discRadius, tick);

            ctx.restore();
        }

        /**
         * Render dynamic kinetic wake aura during rapid sinusoidal slithering.
         */
        static drawSlitheringKineticAura(ctx, discRadius, speed, isFleeing, tick) {
            if (speed < 1.0 && !isFleeing) return;

            const pulse = 0.85 + 0.15 * Math.sin((tick || 0) * 0.18);
            const auraRadius = discRadius * (1.5 + (speed / 2.4) * 0.6) * pulse;
            const alpha = Math.min(0.35, (speed / 2.4) * 0.30);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);

            if (isFleeing) {
                // High alert evasion: electric emerald aura (#10b981)
                ctx.fillStyle = "rgba(16, 185, 129, " + (alpha * 0.35) + ")";
                ctx.strokeStyle = "rgba(52, 211, 153, " + (alpha * 0.75) + ")";
                ctx.lineWidth = 1.0;
                ctx.setLineDash([2, 3]);
            } else {
                // Gentle benthic crawling
                ctx.fillStyle = "rgba(5, 150, 105, " + (alpha * 0.20) + ")";
                ctx.strokeStyle = "rgba(16, 185, 129, " + (alpha * 0.40) + ")";
                ctx.lineWidth = 0.8;
                ctx.setLineDash([]);
            }

            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        /**
         * Render distinct pentagonal central disc with paired radial shields.
         */
        static drawCentralDisc(ctx, discRadius, tick) {
            const armCount = 5;
            const angleStep = (Math.PI * 2) / armCount;

            ctx.save();

            // Pentagonal notched disc contour (sharp notches between arms)
            ctx.beginPath();
            for (let i = 0; i < armCount * 2; i++) {
                const angle = i * (angleStep * 0.5);
                const isArmBase = (i % 2 === 0);
                const r = isArmBase ? (discRadius * 0.88) : discRadius;
                const dx = Math.cos(angle) * r;
                const dy = Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(dx, dy);
                else ctx.lineTo(dx, dy);
            }
            ctx.closePath();

            // Slate-emerald echinoderm cuticle shading
            ctx.fillStyle = "rgba(15, 118, 110, 0.82)"; // rich deep sea teal/emerald
            ctx.strokeStyle = "rgba(94, 234, 212, 0.90)"; // luminous cyan border
            ctx.lineWidth = 1.2;
            ctx.fill();
            ctx.stroke();

            // Paired Aboral Radial Shields at the base of each arm
            for (let j = 0; j < armCount; j++) {
                const baseAngle = j * angleStep;
                const shieldOffset = discRadius * 0.58;
                const pairAngle = 0.18;

                // Left shield
                const s1x = Math.cos(baseAngle - pairAngle) * shieldOffset;
                const s1y = Math.sin(baseAngle - pairAngle) * shieldOffset;
                ctx.beginPath();
                ctx.arc(s1x, s1y, discRadius * 0.16, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(204, 251, 241, 0.85)"; // glossy ivory calcite shield
                ctx.fill();

                // Right shield
                const s2x = Math.cos(baseAngle + pairAngle) * shieldOffset;
                const s2y = Math.sin(baseAngle + pairAngle) * shieldOffset;
                ctx.beginPath();
                ctx.arc(s2x, s2y, discRadius * 0.16, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(204, 251, 241, 0.85)";
                ctx.fill();
            }

            // Central Peristomial Rosette
            ctx.beginPath();
            ctx.arc(0, 0, discRadius * 0.24, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(4, 47, 46, 0.90)";
            ctx.fill();
            ctx.strokeStyle = "rgba(45, 212, 191, 0.75)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Bursal Slime Discharge Aura (when sustaining direct disc trauma)
            if ((tick || 0) % 24 < 12) {
                ctx.beginPath();
                ctx.arc(0, 0, discRadius * 1.35, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(226, 232, 240, 0.12)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render 5 slender, sinuous vertebral arm chains with articulated segments and spines.
         */
        static drawVertebralArms(ctx, size, discRadius, arms, wavePhase, speed, tick) {
            const armCount = 5;
            const angleStep = (Math.PI * 2) / armCount;

            ctx.save();

            for (let a = 0; a < armCount; a++) {
                const baseAngle = a * angleStep;
                const armData = arms[a] || { totalSegments: 24, intactSegments: 24, isAutotomized: false };
                const totalSegments = armData.totalSegments || 24;
                const intactSegments = armData.intactSegments !== undefined ? armData.intactSegments : totalSegments;
                const isAutotomized = armData.isAutotomized || (intactSegments < totalSegments);
                const armWaveOffset = armData.lateralWaveOffset || (a * Math.PI * 2) / 5;

                ctx.save();
                ctx.rotate(baseAngle);

                // Origin at edge of central disc
                let currentX = discRadius * 0.82;
                let currentY = 0;
                let armHeading = 0;

                const segmentLength = (size * 3.4) / Math.max(1, totalSegments);

                // Render each articulated vertebral segment
                for (let s = 1; s <= intactSegments; s++) {
                    const segRatio = s / totalSegments;
                    const segmentWidth = Math.max(1.2, discRadius * 0.42 * (1.0 - segRatio * 0.65));

                    // Lateral sinusoidal flexion angle along arm
                    const wave = Math.sin(wavePhase + armWaveOffset + s * 0.28) * 0.22;
                    armHeading += wave;

                    const nextX = currentX + Math.cos(armHeading) * segmentLength;
                    const nextY = currentY + Math.sin(armHeading) * segmentLength;

                    // Vertebral joint bead
                    ctx.beginPath();
                    ctx.moveTo(currentX, currentY);
                    ctx.lineTo(nextX, nextY);
                    ctx.strokeStyle = (s % 2 === 0) ? "rgba(13, 148, 136, 0.85)" : "rgba(20, 184, 166, 0.85)";
                    ctx.lineWidth = segmentWidth;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // Vertebral articulation suture ring
                    if (s % 3 === 0) {
                        ctx.beginPath();
                        ctx.arc(nextX, nextY, segmentWidth * 0.55, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(204, 251, 241, 0.70)"; // calcite bead
                        ctx.fill();
                    }

                    // Lateral Arm Spines (comb of pointed needles on left and right)
                    if (s >= 3 && s <= intactSegments - 2 && s % 2 === 0) {
                        const normalAngle = armHeading + Math.PI * 0.5;
                        const spineLen = segmentWidth * 1.6;

                        // Left spine
                        const sp1X = nextX + Math.cos(normalAngle) * spineLen;
                        const sp1Y = nextY + Math.sin(normalAngle) * spineLen;
                        ctx.beginPath();
                        ctx.moveTo(nextX, nextY);
                        ctx.lineTo(sp1X, sp1Y);
                        ctx.strokeStyle = "rgba(226, 232, 240, 0.80)"; // silver calcite spine
                        ctx.lineWidth = 0.7;
                        ctx.stroke();

                        // Right spine
                        const sp2X = nextX - Math.cos(normalAngle) * spineLen;
                        const sp2Y = nextY - Math.sin(normalAngle) * spineLen;
                        ctx.beginPath();
                        ctx.moveTo(nextX, nextY);
                        ctx.lineTo(sp2X, sp2Y);
                        ctx.strokeStyle = "rgba(226, 232, 240, 0.80)";
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }

                    currentX = nextX;
                    currentY = nextY;
                }

                // If autotomized, render broken vertebral fracture plane and blastema point
                if (isAutotomized) {
                    ctx.beginPath();
                    ctx.arc(currentX, currentY, 2.0, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(52, 211, 153, 0.90)"; // glowing silver-emerald blastema
                    ctx.fill();
                    ctx.strokeStyle = "rgba(204, 251, 241, 0.95)";
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                } else {
                    // Arm tip terminal sensory papilla
                    ctx.beginPath();
                    ctx.arc(currentX, currentY, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(94, 234, 212, 0.95)";
                    ctx.fill();
                }

                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Render autonomous wriggling autotomized decoy segments across all organisms.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Simulation frame count.
         */
        static drawOphiuroidDecoysAndTrails(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isOphiuroid) continue;

                if (org.isSegmentAutotomized && (org.wrigglingSegmentTimer || 0) > 0.0) {
                    OphiuroidOpticsRenderer.drawWrigglingSegment(ctx, org, tick);
                }
            }
        }

        /**
         * Render detached, rapidly convulsing vertebral segment cluster distracting predators.
         */
        static drawWrigglingSegment(ctx, org, tick) {
            const timer = org.wrigglingSegmentTimer || 4.5;
            const fade = Math.max(0.1, timer / 4.5);
            const trailOffset = 16.0 + (4.5 - timer) * 5.0;

            ctx.save();
            const moveAngle = Math.atan2(org.vy || 0, org.vx || 1);
            const decoyX = org.x - Math.cos(moveAngle) * trailOffset;
            const decoyY = org.y - Math.sin(moveAngle) * trailOffset;

            ctx.translate(decoyX, decoyY);

            // Fast convulsing sinusoidal oscillation
            const rapidWhip = Math.sin((tick || 0) * 0.40) * 0.65;
            ctx.rotate(moveAngle + Math.PI + rapidWhip);

            // Sinuous detached vertebral segments
            ctx.beginPath();
            ctx.moveTo(0, -1.5);
            ctx.quadraticCurveTo(6, rapidWhip * 12, 14, 0);
            ctx.quadraticCurveTo(6, -rapidWhip * 12, 0, 1.5);
            ctx.closePath();

            ctx.fillStyle = "rgba(16, 185, 129, " + (0.75 * fade) + ")"; // emerald decoy segment
            ctx.strokeStyle = "rgba(94, 234, 212, " + (0.90 * fade) + ")";
            ctx.lineWidth = 1.0;
            ctx.fill();
            ctx.stroke();

            // Segment lateral spines on detached piece
            ctx.beginPath();
            ctx.moveTo(7, 0);
            ctx.lineTo(7 + rapidWhip * 4, 4);
            ctx.moveTo(7, 0);
            ctx.lineTo(7 - rapidWhip * 4, -4);
            ctx.strokeStyle = "rgba(226, 232, 240, " + (0.80 * fade) + ")";
            ctx.lineWidth = 0.7;
            ctx.stroke();

            // Ganglionic reflexive nerve flash
            ctx.beginPath();
            ctx.arc(7, 0, 2.8 * fade, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(204, 251, 241, " + (0.60 * fade) + ")";
            ctx.fill();

            ctx.restore();
        }

        /**
         * Render dish-wide benthic crevice shadows and serpentine substrate displacement lines.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {number} width - Canvas viewport width.
         * @param {number} height - Canvas viewport height.
         * @param {Object} manager - Ophiuroid manager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawGlobalOphiuroidEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.getMetrics ? manager.getMetrics() : {};
            const slitheringCount = metrics.activeSlitheringOrganisms || 0;
            const shelteredCount = metrics.creviceShelteredOrganisms || 0;

            if (slitheringCount === 0 && shelteredCount === 0) return;

            // Benthic crevice shadow overlay
            const floorHeight = Math.min(50.0, height * 0.10);
            const grad = ctx.createLinearGradient(0, height - floorHeight, 0, height);
            grad.addColorStop(0, "rgba(5, 150, 105, 0.0)");
            grad.addColorStop(1, "rgba(4, 47, 46, " + Math.min(0.07, 0.02 + shelteredCount * 0.01) + ")");

            ctx.save();
            ctx.fillStyle = grad;
            ctx.fillRect(0, height - floorHeight, width, floorHeight);
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OphiuroidOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.OphiuroidOpticsRenderer = OphiuroidOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
