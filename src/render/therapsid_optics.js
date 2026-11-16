// BioEcosystem - Advanced Therapsida, Secondary Bony Palate, Maxilloturbinates & Pre-Endothermic Optics
// Module: src/render/therapsid_optics.js
// Version: 8.71.0 (Hour 591 - Looks & UI Agent: Secondary Palate Airflow, Vibrissae Whiskers, Parasagittal Stance & 119th/120th Channel Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TherapsidOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for Advanced Therapsida & Cynodontia:
     * - Thrinaxodon liorhinus, Gorgonopsia & Cynognathus compact streamlined body plan
     * - Secondary Bony Palate Airflow: Continuous nasal respiration stream decoupled from oral digestion
     * - Maxilloturbinate Moisture Halos: Delicate cyan/ice moisture condensation auras at external nares
     * - Vibrissae (Whiskers) & Tactile Follicles: Fine radiating sensory whiskers around muzzle with trigeminal glow
     * - Incipient Pelage / Fur Coat: Dense microscopic hair texture along flanks providing thermal homeostasis
     * - Parasagittal Limb Posture: Limbs positioned vertically beneath body for rapid cursorial locomotion
     * - 119th Telemetry Channel (% SPI) Aura: Cyan / sky ice (#06b6d4) respiratory isolation radiance
     * - 120th Telemetry Channel (% EMI) Radiance: Crimson rose / thermal core (#f43f5e) endothermic body heat glow
     */
    class TherapsidOpticsRenderer {
        /**
         * Render individual Therapsid organism with secondary palate airflow, whiskers, and parasagittal limbs.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTherapsid(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isTherapsid) return;

            const size = org.dna ? (org.dna.size || 8.5) : 8.5;
            const bodyLen = 34.0 + size * 1.8;      // 36 - 54 px
            const bodyWidth = 15.0 + size * 1.1;    // 16 - 26 px
            const tailLen = 18.0 + size * 1.2;      // 20 - 32 px (compact mammalian-precursor tail)

            const spi = (org.secondaryPalateIndex || 0.0) / 100.0;
            const emi = (org.endothermicMetabolicIndex || 0.0) / 100.0;
            const coreTemp = org.therapsidCoreTemp || 35.5;
            const isWarm = org.isEndothermicWarm || coreTemp >= 34.0;
            const isBreathing = org.palateBreathingGlowTimer > 0;
            const touchPulse = org.vibrissaeTouchPulse || 0.0;
            const furDensity = org.vibrissaeInsulationDensity || 0.78;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Telemetry Channel Ambient Auras
            // 120th Channel (% EMI) Internal Endothermic Heat Radiance
            if (emi > 0.40) {
                const heatRadius = bodyLen * 0.70;
                const heatGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, heatRadius);
                const heatPulse = 0.14 + Math.sin(tick * 0.09) * 0.05;
                heatGrad.addColorStop(0.0, "rgba(244, 63, 94, " + (heatPulse * emi).toFixed(3) + ")");
                heatGrad.addColorStop(0.6, "rgba(251, 113, 133, " + (heatPulse * 0.4 * emi).toFixed(3) + ")");
                heatGrad.addColorStop(1.0, "rgba(244, 63, 94, 0.0)");
                ctx.fillStyle = heatGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, heatRadius, heatRadius * 0.65, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // 119th Channel (% SPI) Secondary Palate Respiratory Airflow Aura
            if (spi > 0.50) {
                const palateGleam = ctx.createRadialGradient(bodyLen * 0.48, 0, 2, bodyLen * 0.48, 0, 15);
                const palatePulse = 0.18 + Math.sin(tick * 0.12) * 0.08 + (isBreathing ? 0.25 : 0.0);
                palateGleam.addColorStop(0.0, "rgba(6, 182, 212, " + (palatePulse * spi).toFixed(3) + ")");
                palateGleam.addColorStop(0.7, "rgba(34, 211, 238, " + (palatePulse * 0.35 * spi).toFixed(3) + ")");
                palateGleam.addColorStop(1.0, "rgba(6, 182, 212, 0.0)");
                ctx.fillStyle = palateGleam;
                ctx.beginPath();
                ctx.arc(bodyLen * 0.48, 0, 15, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Parasagittal Limbs (Tucked Beneath the Body for Linear Gallop)
            const gaitPhase = (tick * 0.20 * (isWarm ? 1.35 : 1.0)) % (Math.PI * 2);
            ctx.strokeStyle = "#27272a";
            ctx.lineWidth = 3.0;
            ctx.lineCap = "round";

            // Left Foreleg
            const lfStroke = Math.sin(gaitPhase) * 0.55;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.22, -bodyWidth * 0.30);
            ctx.lineTo(bodyLen * 0.25 + Math.cos(lfStroke) * 11.0, -bodyWidth * 0.65);
            ctx.lineTo(bodyLen * 0.25 + Math.cos(lfStroke) * 11.0 + 6.0, -bodyWidth * 0.85);
            ctx.stroke();

            // Right Foreleg
            const rfStroke = -Math.sin(gaitPhase) * 0.55;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.22, bodyWidth * 0.30);
            ctx.lineTo(bodyLen * 0.25 + Math.cos(rfStroke) * 11.0, bodyWidth * 0.65);
            ctx.lineTo(bodyLen * 0.25 + Math.cos(rfStroke) * 11.0 + 6.0, bodyWidth * 0.85);
            ctx.stroke();

            // Left Hindleg
            const lhStroke = -Math.sin(gaitPhase) * 0.50;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.22, -bodyWidth * 0.35);
            ctx.lineTo(-bodyLen * 0.20 + Math.cos(lhStroke) * 13.0, -bodyWidth * 0.75);
            ctx.lineTo(-bodyLen * 0.20 + Math.cos(lhStroke) * 13.0 + 7.0, -bodyWidth * 0.95);
            ctx.stroke();

            // Right Hindleg
            const rhStroke = Math.sin(gaitPhase) * 0.50;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.22, bodyWidth * 0.35);
            ctx.lineTo(-bodyLen * 0.20 + Math.cos(rhStroke) * 13.0, bodyWidth * 0.75);
            ctx.lineTo(-bodyLen * 0.20 + Math.cos(rhStroke) * 13.0 + 7.0, bodyWidth * 0.95);
            ctx.stroke();

            // 3. Compact Mammalian-Precursor Tail
            ctx.fillStyle = "#18181b";
            ctx.strokeStyle = "#09090b";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.38, -bodyWidth * 0.22);
            ctx.lineTo(-bodyLen * 0.38 - tailLen, 0);
            ctx.lineTo(-bodyLen * 0.38, bodyWidth * 0.22);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 4. Streamlined Muscular Torso & Pelage Coat
            ctx.fillStyle = "#3f3f46";
            ctx.strokeStyle = "#18181b";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyLen * 0.42, bodyWidth * 0.45, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Microscopic Hair / Pelage Fringe (Incipient Mammalian Fur)
            if (furDensity > 0.65) {
                ctx.strokeStyle = "rgba(161, 161, 170, 0.55)";
                ctx.lineWidth = 0.7;
                for (let h = -6; h <= 6; h++) {
                    const hairX = h * (bodyLen * 0.055);
                    const hairY = (bodyWidth * 0.44) * (1.0 - (h * h) / 48.0);
                    ctx.beginPath();
                    ctx.moveTo(hairX, -hairY);
                    ctx.lineTo(hairX - 2.5, -hairY - 3.5);
                    ctx.moveTo(hairX, hairY);
                    ctx.lineTo(hairX - 2.5, hairY + 3.5);
                    ctx.stroke();
                }
            }

            // 5. Advanced Cynodont Skull with Sagittal Crest
            const headX = bodyLen * 0.32;
            const headLen = bodyLen * 0.32;
            const headWidth = bodyWidth * 0.38;

            ctx.fillStyle = "#52525b";
            ctx.strokeStyle = "#18181b";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(headX, -headWidth * 0.85);
            ctx.lineTo(headX + headLen * 0.6, -headWidth * 0.55);
            ctx.lineTo(headX + headLen + 4.0, 0);
            ctx.lineTo(headX + headLen * 0.6, headWidth * 0.55);
            ctx.lineTo(headX, headWidth * 0.85);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Sagittal Crest Line (Anchoring massive jaw adductors)
            ctx.strokeStyle = "#71717a";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(headX + 2.0, 0);
            ctx.lineTo(headX + headLen * 0.5, 0);
            ctx.stroke();

            // Eyes with intelligent forward-angled binocular predator gaze
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(headX + headLen * 0.45, -headWidth * 0.35, 2.4, 0, Math.PI * 2);
            ctx.arc(headX + headLen * 0.45, headWidth * 0.35, 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#09090b";
            ctx.beginPath();
            ctx.arc(headX + headLen * 0.47, -headWidth * 0.35, 1.2, 0, Math.PI * 2);
            ctx.arc(headX + headLen * 0.47, headWidth * 0.35, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // 6. External Nares & Maxilloturbinate Continuous Airflow
            ctx.fillStyle = "#18181b";
            ctx.beginPath();
            ctx.arc(headX + headLen + 2.0, -1.8, 1.0, 0, Math.PI * 2);
            ctx.arc(headX + headLen + 2.0, 1.8, 1.0, 0, Math.PI * 2);
            ctx.fill();

            if (isBreathing) {
                // Cyan respiratory exhalation pulse
                ctx.strokeStyle = "rgba(6, 182, 212, 0.80)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(headX + headLen + 3.0, -1.8);
                ctx.lineTo(headX + headLen + 9.0, -3.2);
                ctx.moveTo(headX + headLen + 3.0, 1.8);
                ctx.lineTo(headX + headLen + 9.0, 3.2);
                ctx.stroke();
            }

            // 7. Tactile Vibrissae (Whiskers around Snout)
            ctx.strokeStyle = touchPulse > 0 ? "rgba(103, 232, 249, 0.95)" : "rgba(244, 244, 245, 0.70)";
            ctx.lineWidth = 0.7;
            const whiskerLen = 14.0 + touchPulse * 6.0;

            for (let w = 0; w < 4; w++) {
                const wAngle = -0.45 + w * 0.30;
                // Left Whiskers
                ctx.beginPath();
                ctx.moveTo(headX + headLen * 0.75, -headWidth * 0.40);
                ctx.lineTo(headX + headLen * 0.75 + Math.cos(wAngle) * whiskerLen, -headWidth * 0.40 - Math.sin(wAngle) * whiskerLen - 5.0);
                ctx.stroke();

                // Right Whiskers
                ctx.beginPath();
                ctx.moveTo(headX + headLen * 0.75, headWidth * 0.40);
                ctx.lineTo(headX + headLen * 0.75 + Math.cos(wAngle) * whiskerLen, headWidth * 0.40 + Math.sin(wAngle) * whiskerLen + 5.0);
                ctx.stroke();
            }

            // 8. Piercing Canines & Occluding Molar Blades
            ctx.fillStyle = "#fffbeb";
            ctx.strokeStyle = "#e4e4e7";
            ctx.lineWidth = 0.6;

            // Upper Canines
            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.70, -headWidth * 0.32);
            ctx.lineTo(headX + headLen * 0.76, -headWidth * 0.32 - 7.5);
            ctx.lineTo(headX + headLen * 0.80, -headWidth * 0.32);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.70, headWidth * 0.32);
            ctx.lineTo(headX + headLen * 0.76, headWidth * 0.32 + 7.5);
            ctx.lineTo(headX + headLen * 0.80, headWidth * 0.32);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render ambient nocturnal hunting scents, thermal heat vapor, and whisker sweep ripples across the ecosystem.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame count.
         */
        static drawTherapsidNocturnalAndAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isTherapsid) continue;

                // Endothermic thermal vapor shimmer in cold ambient air
                if (org.isEndothermicWarm && org.therapsidCoreTemp >= 35.0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const shimmerRadius = 18.0 + Math.sin(tick * 0.10 + i) * 4.0;
                    ctx.strokeStyle = "rgba(244, 63, 94, 0.20)";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.arc(0, 0, shimmerRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TherapsidOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TherapsidOpticsRenderer = TherapsidOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
