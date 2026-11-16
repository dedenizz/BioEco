// BioEcosystem - Early Mammaliaformes, Tri-Ossicular Middle Ear & Proto-Lactation Optics
// Module: src/render/mammaliaform_optics.js
// Version: 8.77.0 (Hour 597 - Looks & UI Agent: Miniature Nocturnal Body, Pinna Acoustic Halos, Areolar Milk Droplets & 121st/122nd Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MammaliaformOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for Early Mammaliaformes (Morganucodon watsoni & Hadrocodium wui):
     * - Miniature Nocturnal Body Plan: Compact, highly flexed vertebral column with silky dense dark pelage (shrew-like cursorial habitus)
     * - Pinna Acoustic Halos & Resonators: Enlarged external ear flaps with vibrating amethyst purple (#8b5cf6) concentric acoustic detection rings
     * - Dentary-Squamosal Mandibular Jaw Shaders: High-torque masseter muscle striations and sharp triconodont dentition highlights
     * - Ventral Areolar Milk Patch Droplets: Soft custard/pearl yellow (#fef08a) lipid and lactose nutrient micro-droplets on nursing females
     * - Ultrasonic High-Frequency Radar Waves: Radiating acoustic wavefront pulses detecting subterranean and nocturnal prey
     * - 121st Telemetry Channel (% MEI) Aura: Electric amethyst violet (#8b5cf6) ossicular acoustic resonance radiance
     * - 122nd Telemetry Channel (% LAI) Radiance: Pearl custard yellow (#fef08a) lactation and maternal nurturing glow
     */
    class MammaliaformOpticsRenderer {
        /**
         * Render individual Mammaliaform organism with miniature body, pinnae, masseter torque, and milk patch.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawMammaliaform(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isMammaliaform) return;

            const size = org.dna ? (org.dna.size || 6.5) : 6.5;
            // Miniature insectivorous body (22 - 36 px)
            const bodyLen = 22.0 + size * 1.4;
            const bodyWidth = 10.0 + size * 0.8;
            const tailLen = 16.0 + size * 1.1;

            const mei = (org.mammaliaformEarIndex || 0.0) / 100.0;
            const lai = (org.lactationIndex || 0.0) / 100.0;
            const isFemale = org.isFemaleParent;
            const isNursing = (org.nursingCooldownTimer || 0) > 0;
            const acousticGain = (org.acousticPressureGain || 22.0) / 22.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Telemetry Channel Ambient Auras
            // 121st Channel (% MEI) Electric Amethyst Middle Ear Acoustic Aura
            if (mei > 0.35) {
                const earAuraRadius = bodyLen * 0.75;
                const earGrad = ctx.createRadialGradient(-bodyLen * 0.15, 0, 3, -bodyLen * 0.15, 0, earAuraRadius);
                const earPulse = 0.12 + Math.sin(tick * 0.12) * 0.05;
                earGrad.addColorStop(0.0, "rgba(139, 92, 246, " + (earPulse * mei).toFixed(3) + ")");
                earGrad.addColorStop(0.55, "rgba(167, 139, 250, " + (earPulse * 0.45 * mei).toFixed(3) + ")");
                earGrad.addColorStop(1.0, "rgba(139, 92, 246, 0.0)");
                ctx.fillStyle = earGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.15, 0, earAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 122nd Channel (% LAI) Pearl Custard Lactation Glow for Nursing Females
            if (isFemale && lai > 0.30) {
                const milkAuraRadius = bodyWidth * 1.8;
                const milkGrad = ctx.createRadialGradient(-bodyLen * 0.25, 0, 2, -bodyLen * 0.25, 0, milkAuraRadius);
                const milkPulse = 0.14 + Math.cos(tick * 0.08) * 0.04;
                milkGrad.addColorStop(0.0, "rgba(254, 240, 138, " + (milkPulse * lai).toFixed(3) + ")");
                milkGrad.addColorStop(0.60, "rgba(253, 224, 71, " + (milkPulse * 0.35 * lai).toFixed(3) + ")");
                milkGrad.addColorStop(1.0, "rgba(254, 240, 138, 0.0)");
                ctx.fillStyle = milkGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.25, 0, milkAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Slender Flexible Tail (Mammalian counterweight tail)
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.45, 0);
            const tailWiggle = Math.sin(tick * 0.18 + (org.id || 0)) * 2.5;
            ctx.quadraticCurveTo(-bodyLen * 0.45 - tailLen * 0.5, tailWiggle * 0.7, -bodyLen * 0.45 - tailLen, tailWiggle);
            ctx.strokeStyle = "#3f3f46";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // 3. Compact Muscular Parasagittal Limbs (Gathered underneath body)
            const gaitPhase = tick * 0.24 + (org.id || 0);
            const limbOff1 = Math.sin(gaitPhase) * 3.5;
            const limbOff2 = Math.cos(gaitPhase) * 3.5;

            ctx.fillStyle = "#27272a";
            ctx.strokeStyle = "#52525b";
            ctx.lineWidth = 0.8;

            // Forelimbs
            ctx.beginPath();
            ctx.ellipse(bodyLen * 0.12 + limbOff1, -bodyWidth * 0.52, 3.2, 1.8, 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(bodyLen * 0.12 - limbOff1, bodyWidth * 0.52, 3.2, 1.8, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Hindlimbs
            ctx.beginPath();
            ctx.ellipse(-bodyLen * 0.28 + limbOff2, -bodyWidth * 0.55, 3.6, 2.0, 0.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(-bodyLen * 0.28 - limbOff2, bodyWidth * 0.55, 3.6, 2.0, -0.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // 4. Compact Main Torso with Silky Pelage Gradient
            const bodyGrad = ctx.createLinearGradient(-bodyLen * 0.45, 0, bodyLen * 0.35, 0);
            bodyGrad.addColorStop(0.0, "#18181b");
            bodyGrad.addColorStop(0.4, "#27272a");
            bodyGrad.addColorStop(0.8, "#3f3f46");
            bodyGrad.addColorStop(1.0, "#52525b");

            ctx.fillStyle = bodyGrad;
            ctx.strokeStyle = "#71717a";
            ctx.lineWidth = 1.0;

            ctx.beginPath();
            ctx.ellipse(-bodyLen * 0.08, 0, bodyLen * 0.46, bodyWidth * 0.52, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pelage Fur Texture Micro-Strokes
            ctx.strokeStyle = "rgba(161, 161, 170, 0.30)";
            ctx.lineWidth = 0.5;
            for (let f = -bodyLen * 0.35; f <= bodyLen * 0.20; f += 5.5) {
                ctx.beginPath();
                ctx.moveTo(f, -bodyWidth * 0.42);
                ctx.lineTo(f - 2.5, -bodyWidth * 0.56);
                ctx.moveTo(f, bodyWidth * 0.42);
                ctx.lineTo(f - 2.5, bodyWidth * 0.56);
                ctx.stroke();
            }

            // 5. Ventral Areolar Milk Patch (if lactating female)
            if (isFemale && lai > 0.25) {
                ctx.fillStyle = "rgba(254, 240, 138, 0.65)";
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.18, 0, 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Micro milk droplets
                ctx.fillStyle = "#fef9c3";
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.14, -1.8, 0.9, 0, Math.PI * 2);
                ctx.arc(-bodyLen * 0.22, 1.8, 0.9, 0, Math.PI * 2);
                ctx.fill();
            }

            // 6. Elongated Insectivorous Cranium & Dentary Mandible
            const headX = bodyLen * 0.32;
            const headLen = bodyLen * 0.48;
            const headWidth = bodyWidth * 0.58;

            const headGrad = ctx.createLinearGradient(headX, 0, headX + headLen, 0);
            headGrad.addColorStop(0.0, "#27272a");
            headGrad.addColorStop(0.7, "#3f3f46");
            headGrad.addColorStop(1.0, "#52525b");

            ctx.fillStyle = headGrad;
            ctx.strokeStyle = "#a1a1aa";
            ctx.lineWidth = 0.9;

            ctx.beginPath();
            ctx.moveTo(headX, -headWidth * 0.55);
            ctx.lineTo(headX + headLen * 0.65, -headWidth * 0.28);
            ctx.lineTo(headX + headLen, 0); // Snout tip
            ctx.lineTo(headX + headLen * 0.65, headWidth * 0.28);
            ctx.lineTo(headX, headWidth * 0.55);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Dentary-Squamosal Masseter Muscle Bulge (Coronoid Ridge)
            ctx.fillStyle = "rgba(113, 113, 122, 0.55)";
            ctx.beginPath();
            ctx.ellipse(headX + headLen * 0.25, -headWidth * 0.38, 3.2, 1.8, 0.3, 0, Math.PI * 2);
            ctx.ellipse(headX + headLen * 0.25, headWidth * 0.38, 3.2, 1.8, -0.3, 0, Math.PI * 2);
            ctx.fill();

            // 7. Prominent External Ear Pinnae & Acoustic Resonance Rings
            // Left Pinna
            ctx.fillStyle = "#18181b";
            ctx.strokeStyle = "#8b5cf6";
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.ellipse(headX + headLen * 0.15, -headWidth * 0.68, 3.8, 2.2, -0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Right Pinna
            ctx.beginPath();
            ctx.ellipse(headX + headLen * 0.15, headWidth * 0.68, 3.8, 2.2, 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // High-Frequency Acoustic Resonance Concentric Rings from Pinnae
            if (mei > 0.45) {
                const ringPulse = (tick * 0.14) % 1.0;
                ctx.strokeStyle = "rgba(139, 92, 246, " + (0.50 * (1.0 - ringPulse) * mei).toFixed(2) + ")";
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.arc(headX + headLen * 0.15, -headWidth * 0.68, 3.5 + ringPulse * 5.0, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.arc(headX + headLen * 0.15, headWidth * 0.68, 3.5 + ringPulse * 5.0, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.stroke();
            }

            // 8. Binocular Nocturnal Eyes & Tactile Whiskers
            // Eyes
            ctx.fillStyle = "#a855f7"; // Nocturnal reflective tapetum lucidum violet
            ctx.beginPath();
            ctx.arc(headX + headLen * 0.48, -headWidth * 0.24, 1.6, 0, Math.PI * 2);
            ctx.arc(headX + headLen * 0.48, headWidth * 0.24, 1.6, 0, Math.PI * 2);
            ctx.fill();

            // Delicate Whiskers (Vibrissae) radiating from muzzle
            ctx.strokeStyle = "rgba(244, 244, 245, 0.70)";
            ctx.lineWidth = 0.5;
            const whiskerTip = headX + headLen * 0.90;
            // Dorsal whiskers
            ctx.beginPath();
            ctx.moveTo(whiskerTip, -headWidth * 0.12);
            ctx.lineTo(whiskerTip + 7.5, -headWidth * 0.45);
            ctx.moveTo(whiskerTip - 2, -headWidth * 0.14);
            ctx.lineTo(whiskerTip + 5.0, -headWidth * 0.65);
            // Ventral whiskers
            ctx.moveTo(whiskerTip, headWidth * 0.12);
            ctx.lineTo(whiskerTip + 7.5, headWidth * 0.45);
            ctx.moveTo(whiskerTip - 2, headWidth * 0.14);
            ctx.lineTo(whiskerTip + 5.0, headWidth * 0.65);
            ctx.stroke();

            // Triconodont Piercing Teeth Highlight
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.75, -headWidth * 0.18);
            ctx.lineTo(headX + headLen * 0.80, -headWidth * 0.18 - 2.2);
            ctx.lineTo(headX + headLen * 0.83, -headWidth * 0.18);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.75, headWidth * 0.18);
            ctx.lineTo(headX + headLen * 0.80, headWidth * 0.18 + 2.2);
            ctx.lineTo(headX + headLen * 0.83, headWidth * 0.18);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        /**
         * Render ecosystem-wide ultrasonic acoustic radar wavefronts and milk maternal nest atmospherics.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame count.
         */
        static drawMammaliaformAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isMammaliaform) continue;

                // 1. High-Frequency Ultrasonic Wavefront Echo Pulses
                if ((org.ultrasonicEchoRadarPulses || 0) > 0 && (tick + i) % 8 === 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const waveRadius = 14.0 + (tick % 16) * 1.8;
                    const waveAlpha = Math.max(0.0, 0.35 - (waveRadius / 45.0));
                    ctx.strokeStyle = "rgba(139, 92, 246, " + waveAlpha.toFixed(2) + ")";
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // 2. Maternal Nursing Milk Droplet Shimmer
                if (org.isFemaleParent && (org.lactationIndex || 0) > 60.0 && (tick + i) % 12 === 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const milkRadius = 8.0 + Math.sin(tick * 0.15 + i) * 2.5;
                    ctx.strokeStyle = "rgba(254, 240, 138, 0.35)";
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.arc(0, 0, milkRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MammaliaformOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.MammaliaformOpticsRenderer = MammaliaformOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
