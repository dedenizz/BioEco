// BioEcosystem - Asteroidea Morphology, Catch Collagen & Extraoral Cardiac Stomach Optics
// Module: src/render/asteroidea_optics.js
// Version: 7.53.0 (Hour 473 - Looks Agent: 5 Radial Arms, MCT Shimmer, Eversion Membrane & Autotomy Decoys)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AsteroideaOpticsRenderer
     * High-fidelity scientific microscope optics for asteroidea (sea star) anatomy, predation, and autotomy:
     * - Pentaradial 5 Ambulacral Arms & Central Disc: 5 radiating ray axes with tapered ossicles, ambulacral grooves, and podia rows
     * - Terminal Optic Ocelli: Pigmented photic sensor spots at the tip of each intact ray
     * - Mutable Collagenous Tissue (MCT) Catch Aura: Golden/amber crystalline tension aura during rigid isometric prying
     * - Extraoral Cardiac Stomach Eversion: Pleated translucent gastric lobes evaginated through mouth into bivalve shell gaps
     * - Proteolytic Histolysis Haze: Shimmering enzymatic digestion mist dissolving prey organic matrix in situ
     * - Bivalve Shell Prying & Suction Grip: Arched feeding dome with anchored tube feet exerting outward isometric torque
     * - Autotomy Stump & Epimorphic Blastema: Contracted sphincter scar and regenerating coral/violet blastema buds
     * - Autonomous Wriggling Decoy Arms: Severed ray wriggling in water column with fading neuromuscular bioluminescent pulses
     * - Global Benthic Predation Stratum: Substrate suction impressions and proteolytic digestion haloes
     */
    class AsteroideaOpticsRenderer {
        /**
         * Render individual asteroidea organism with 5 arms, catch status, and gastric lobes.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawAsteroidea(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isAsteroidea) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);
            const isStiff = org.isCatchStiffened || false;
            const stiffness = org.catchStiffnessRatio || 0.15;
            const eversionDepth = org.cardiacStomachEversionDepth || 0.0;
            const isEverted = org.isStomachEverted || false;
            const isPrying = org.isPryingTarget || false;
            const arms = org.asteroideaArms || [];
            const cac = org.catchApparatusComplianceIndex || 0.15;

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Mutable Collagenous Tissue (MCT) Stiffening Shimmer Aura
            AsteroideaOpticsRenderer.drawCatchCollagenAura(ctx, size, stiffness, isStiff, cac, tick);

            // 2. 5 Ambulacral Arms & Central Disc Structure
            AsteroideaOpticsRenderer.drawCentralDiscAndArms(ctx, size, arms, stiffness, isPrying, tick);

            // 3. Extraoral Cardiac Stomach Eversion (when feeding outside mouth)
            if (isEverted && eversionDepth > 0.01) {
                AsteroideaOpticsRenderer.drawCardiacStomach(ctx, size, eversionDepth, org.proteolyticEnzymesRate || 0.28, tick);
            }

            // 4. Central Madreporite & Aboral Peristome
            AsteroideaOpticsRenderer.drawAboralPeristome(ctx, size, tick);

            ctx.restore();
        }

        /**
         * Render mutable collagenous tissue (MCT) crystalline tension aura.
         */
        static drawCatchCollagenAura(ctx, size, stiffness, isStiff, cac, tick) {
            if (stiffness < 0.25) return;

            const auraRadius = size * (1.6 + stiffness * 0.8);
            const pulse = 0.85 + 0.15 * Math.sin((tick || 0) * 0.08);
            const alpha = Math.min(0.55, stiffness * 0.45 * pulse);

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);

            if (isStiff) {
                // High rigid lock: crystalline amber aura (#f59e0b)
                ctx.fillStyle = "rgba(245, 158, 11, " + (alpha * 0.35) + ")";
                ctx.strokeStyle = "rgba(251, 191, 36, " + (alpha * 0.70) + ")";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([3, 2]);
            } else {
                // Softening compliant transition
                ctx.fillStyle = "rgba(217, 119, 6, " + (alpha * 0.20) + ")";
                ctx.strokeStyle = "rgba(245, 158, 11, " + (alpha * 0.40) + ")";
                ctx.lineWidth = 0.8;
                ctx.setLineDash([]);
            }

            ctx.fill();
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        /**
         * Render 5 radial ambulacral arms and central pentagonal disc.
         */
        static drawCentralDiscAndArms(ctx, size, arms, stiffness, isPrying, tick) {
            const discRadius = size * 0.65;
            const armCount = 5;
            const angleStep = (Math.PI * 2) / armCount;

            ctx.save();

            // Draw each radial arm
            for (let i = 0; i < armCount; i++) {
                const baseAngle = i * angleStep;
                const armData = arms[i] || { intact: true, blastemaProgress: 1.0 };
                const isIntact = armData.intact;
                const blastema = armData.blastemaProgress !== undefined ? armData.blastemaProgress : 1.0;

                ctx.save();
                ctx.rotate(baseAngle);

                if (isIntact) {
                    // Intact Arm: Tapered ray with lateral spines, podia rows, and terminal ocellus
                    const armLen = size * (1.8 + 0.3 * Math.sin((tick || 0) * 0.05 + i));
                    const widthBase = discRadius * 0.75;
                    const widthTip = 1.8;

                    // Ambulacral ray contour
                    ctx.beginPath();
                    ctx.moveTo(-widthBase * 0.5, 0);
                    ctx.lineTo(-widthTip * 0.5, armLen);
                    ctx.lineTo(widthTip * 0.5, armLen);
                    ctx.lineTo(widthBase * 0.5, 0);
                    ctx.closePath();

                    // Shading based on prying tension
                    if (isPrying) {
                        ctx.fillStyle = "rgba(234, 88, 12, 0.75)"; // fiery orange during active prying
                        ctx.strokeStyle = "rgba(254, 215, 170, 0.90)";
                    } else {
                        ctx.fillStyle = "rgba(194, 65, 12, 0.65)"; // rich terracotta echinoderm dermis
                        ctx.strokeStyle = "rgba(251, 146, 60, 0.80)";
                    }
                    ctx.lineWidth = 1.0;
                    ctx.fill();
                    ctx.stroke();

                    // Central Ambulacral Groove Line
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, armLen * 0.92);
                    ctx.strokeStyle = "rgba(124, 45, 18, 0.85)";
                    ctx.lineWidth = 0.9;
                    ctx.stroke();

                    // Hydraulic Tube Feet (Podia) along groove
                    const podiaCount = 6;
                    for (let p = 1; p <= podiaCount; p++) {
                        const podY = (armLen / (podiaCount + 1)) * p;
                        const podSpread = 2.4 * (1.0 - (p / (podiaCount + 2)));
                        const suctionPulse = 0.8 + 0.2 * Math.sin((tick || 0) * 0.12 + p);

                        // Left and right bilateral podia discs
                        ctx.fillStyle = "rgba(254, 240, 138, 0.85)";
                        ctx.beginPath();
                        ctx.arc(-podSpread, podY, 0.9 * suctionPulse, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(podSpread, podY, 0.9 * suctionPulse, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Terminal Optic Ocellus & Sensory Tentacle
                    ctx.beginPath();
                    ctx.arc(0, armLen, 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(239, 68, 68, 0.95)"; // vivid red pigment spot
                    ctx.fill();
                    ctx.strokeStyle = "rgba(254, 226, 226, 0.80)";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();

                } else {
                    // Autotomized Arm Stump & Regenerating Blastema
                    const stumpLen = size * (0.35 + blastema * 0.85);
                    const widthBase = discRadius * 0.70;
                    const widthStump = Math.max(1.5, widthBase * (1.0 - blastema * 0.5));

                    // Severed Ray Stump
                    ctx.beginPath();
                    ctx.moveTo(-widthBase * 0.5, 0);
                    ctx.lineTo(-widthStump * 0.5, stumpLen);
                    ctx.lineTo(widthStump * 0.5, stumpLen);
                    ctx.lineTo(widthBase * 0.5, 0);
                    ctx.closePath();

                    ctx.fillStyle = "rgba(154, 52, 18, 0.60)";
                    ctx.strokeStyle = "rgba(244, 63, 94, 0.75)";
                    ctx.lineWidth = 0.9;
                    ctx.fill();
                    ctx.stroke();

                    // Regenerating Blastema Bud (coral-violet stem cell shimmer)
                    const blastemaPulse = 0.85 + 0.15 * Math.sin((tick || 0) * 0.15 + i);
                    ctx.beginPath();
                    ctx.arc(0, stumpLen, 2.0 * blastemaPulse, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(244, 63, 94, 0.85)"; // coral pink blastema
                    ctx.fill();
                    ctx.strokeStyle = "rgba(192, 132, 252, 0.90)"; // violet coelomic edge
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }

                ctx.restore();
            }

            // Central Pentagonal Disc Body
            ctx.beginPath();
            for (let j = 0; j < armCount; j++) {
                const discAngle = j * angleStep;
                const rx = Math.cos(discAngle) * discRadius;
                const ry = Math.sin(discAngle) * discRadius;
                if (j === 0) ctx.moveTo(rx, ry);
                else ctx.lineTo(rx, ry);
            }
            ctx.closePath();
            ctx.fillStyle = isPrying ? "rgba(249, 115, 22, 0.85)" : "rgba(217, 119, 6, 0.75)";
            ctx.strokeStyle = "rgba(253, 186, 116, 0.90)";
            ctx.lineWidth = 1.4;
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render pleated, billowing extraoral cardiac stomach lobes protruding from mouth.
         */
        static drawCardiacStomach(ctx, size, depth, enzymeRate, tick) {
            const stomachRadius = size * (0.85 + depth * 1.4);
            const lobes = 5;
            const angleStep = (Math.PI * 2) / lobes;
            const wave = 0.15 * Math.sin((tick || 0) * 0.10);

            ctx.save();

            // 1. Enzymatic Histolysis Digestion Haze & Emergency Spasm Wave
            ctx.beginPath();
            ctx.arc(0, 0, stomachRadius * 1.35, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(244, 63, 94, 0.18)"; // soft coral enzymatic mist
            ctx.fill();

            // Emergency Gastric Trauma Spasm Rings (when violently retracting from attack)
            if (depth > 0.1 && (tick || 0) % 20 < 10) {
                ctx.beginPath();
                ctx.arc(0, 0, stomachRadius * 1.6, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(239, 68, 68, 0.45)"; // crimson alert shockwave
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            // 2. Pleated Cardiac Gastric Lobes
            ctx.beginPath();
            for (let l = 0; l < lobes * 2; l++) {
                const angle = l * (angleStep * 0.5);
                const isOuter = (l % 2 === 0);
                const r = isOuter ? stomachRadius : (stomachRadius * (0.62 + wave));
                const lx = Math.cos(angle) * r;
                const ly = Math.sin(angle) * r;
                if (l === 0) ctx.moveTo(lx, ly);
                else ctx.lineTo(lx, ly);
            }
            ctx.closePath();

            // Translucent visceral membrane styling
            ctx.fillStyle = "rgba(251, 146, 60, 0.42)"; // peach visceral membrane
            ctx.strokeStyle = "rgba(244, 63, 94, 0.85)"; // bright coral edge
            ctx.lineWidth = 1.2;
            ctx.fill();
            ctx.stroke();

            // 3. Radial Gastric Retractor Bands
            for (let b = 0; b < lobes; b++) {
                const bAngle = b * angleStep;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(bAngle) * stomachRadius * 0.85, Math.sin(bAngle) * stomachRadius * 0.85);
                ctx.strokeStyle = "rgba(190, 24, 93, 0.70)"; // deep magenta retractor band
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // 4. In Situ Enzymatic Droplet Sparkles
            const droplets = 6;
            for (let d = 0; d < droplets; d++) {
                const dAngle = d * ((Math.PI * 2) / droplets) + (tick || 0) * 0.04;
                const dDist = stomachRadius * (0.45 + 0.45 * Math.sin(d * 1.7 + tick * 0.08));
                ctx.beginPath();
                ctx.arc(Math.cos(dAngle) * dDist, Math.sin(dAngle) * dDist, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 240, 138, 0.90)"; // golden digestive droplet
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render aboral peristome and calcareous madreporite plate.
         */
        static drawAboralPeristome(ctx, size, tick) {
            // Central oral/aboral ring
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(124, 45, 18, 0.90)";
            ctx.fill();
            ctx.strokeStyle = "rgba(254, 215, 170, 0.80)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Eccentric Madreporite (Hydraulic sieve plate)
            const madX = size * 0.28;
            const madY = -size * 0.15;
            ctx.beginPath();
            ctx.arc(madX, madY, size * 0.12, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(254, 243, 199, 0.95)"; // porous ivory calcite plate
            ctx.fill();
            ctx.strokeStyle = "rgba(217, 119, 6, 0.90)";
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Render active cardiac stomach eversions and wriggling autotomized decoy arms across all organisms.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Simulation frame count.
         */
        static drawAsteroideaFeedingAndAutotomy(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isAsteroidea) continue;

                // 1. Bivalve Shell Prying Tension Lines
                if (org.isPryingTarget && org.targetShellMicroGap > 0.02) {
                    AsteroideaOpticsRenderer.drawPryingSparks(ctx, org, tick);
                }

                // 2. Autonomous Wriggling Autotomized Decoy Arms
                if (org.isArmAutotomized && (org.wrigglingArmDecoyTimer || 0) > 0.0) {
                    AsteroideaOpticsRenderer.drawWrigglingDecoyArm(ctx, org, tick);
                }
            }
        }

        /**
         * Render golden tension sparks and micro-gap fracture during bivalve prying.
         */
        static drawPryingSparks(ctx, org, tick) {
            const gap = org.targetShellMicroGap || 0.05;
            const sparksCount = 4;

            ctx.save();
            ctx.translate(org.x, org.y);

            // Radial micro-gap fracture line
            ctx.beginPath();
            ctx.arc(0, 0, (org.dna ? org.dna.size || 8.0 : 8.0) * 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(251, 191, 36, " + Math.min(0.85, gap * 0.9) + ")";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Sparks
            for (let s = 0; s < sparksCount; s++) {
                const sAngle = (s * Math.PI * 0.5) + (tick || 0) * 0.09;
                const sDist = 14.0 + 4.0 * Math.sin(s + tick * 0.15);
                ctx.beginPath();
                ctx.arc(Math.cos(sAngle) * sDist, Math.sin(sAngle) * sDist, 1.0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render detached, autonomously wriggling decoy arm left behind during autotomy escape.
         */
        static drawWrigglingDecoyArm(ctx, org, tick) {
            const timer = org.wrigglingArmDecoyTimer || 5.0;
            const fade = Math.max(0.1, timer / 5.0);
            const trailOffset = 18.0 + (5.0 - timer) * 4.0; // drifts backwards

            ctx.save();
            // Position decoy arm trailing behind the fleeing sea star
            const moveAngle = Math.atan2(org.vy || 0, org.vx || 1);
            const decoyX = org.x - Math.cos(moveAngle) * trailOffset;
            const decoyY = org.y - Math.sin(moveAngle) * trailOffset;

            ctx.translate(decoyX, decoyY);

            // Wriggling sinusoidal wave
            const wriggle = Math.sin((tick || 0) * 0.25) * 0.45;
            ctx.rotate(moveAngle + Math.PI + wriggle);

            // Draw serpentine arm segment
            ctx.beginPath();
            ctx.moveTo(0, -2);
            ctx.quadraticCurveTo(8, wriggle * 10, 16, 0);
            ctx.quadraticCurveTo(8, -wriggle * 10, 0, 2);
            ctx.closePath();

            ctx.fillStyle = "rgba(244, 63, 94, " + (0.75 * fade) + ")"; // coral decoy tissue
            ctx.strokeStyle = "rgba(251, 146, 60, " + (0.90 * fade) + ")";
            ctx.lineWidth = 1.0;
            ctx.fill();
            ctx.stroke();

            // Neuromuscular bioluminescent flash
            ctx.beginPath();
            ctx.arc(8, 0, 3.5 * fade, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(254, 240, 138, " + (0.45 * fade) + ")";
            ctx.fill();

            ctx.restore();
        }

        /**
         * Render dish-wide benthic predation stratum, enzyme hazes, and tube feet substrate marks.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {number} width - Canvas viewport width.
         * @param {number} height - Canvas viewport height.
         * @param {Object} manager - Asteroidea manager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawGlobalAsteroideaEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.getMetrics ? manager.getMetrics() : {};
            const activePrying = metrics.activePryingPredators || 0;
            const evertedFeeders = metrics.evertedStomachFeeders || 0;

            if (activePrying === 0 && evertedFeeders === 0) return;

            // Faint amber/coral predatory benthic horizon glow
            const horizonHeight = Math.min(65.0, height * 0.12);
            const grad = ctx.createLinearGradient(0, height - horizonHeight, 0, height);
            grad.addColorStop(0, "rgba(245, 158, 11, 0.0)");
            grad.addColorStop(1, "rgba(244, 63, 94, " + Math.min(0.08, 0.02 + evertedFeeders * 0.015) + ")");

            ctx.save();
            ctx.fillStyle = grad;
            ctx.fillRect(0, height - horizonHeight, width, horizonHeight);
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AsteroideaOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.AsteroideaOpticsRenderer = AsteroideaOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
