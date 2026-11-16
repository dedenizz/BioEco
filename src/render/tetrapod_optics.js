// BioEcosystem - Early Stem Tetrapods Polydactyly Digits, Cervical Neck, Thoracic Ribcage & Tympanic Hearing Optics
// Module: src/render/tetrapod_optics.js
// Version: 8.53.0 (Hour 573 - Looks & UI Agent: Polydactyly Digits, Carpus/Tarsus Articulations, Cervical Neck Yaw, Stapes Acoustic Arcs & 113th/114th Channel Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TetrapodOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Stem Tetrapods & Early Amphibia / Labyrinthodontia:
     * - Acanthostega gunnari, Ichthyostega stensioei, Tulerpeton curtum morphology
     * - Carpus & Tarsus Articulated Joints: Distinct wrist and ankle angles translating torque into forward terrestrial stride
     * - Polydactyly Digits (6-8 Digits per Limb): Splayed individual digits with phalangeal nodes, interdigital webbing, and terminal claw/traction pads
     * - Decoupled Cervical Neck Yaw: Skull visually articulated separately from the pectoral girdle, dynamically tracking prey angles independent of torso heading
     * - Interlocking Ribcage Lateral Contours: Structural thoracic rib arches defending lungs and viscera against gravitational collapse
     * - Otic Notch & Stapes Auditory Pulses: Subtle concentric acoustic arcs emanating from posterior cheek margins upon aerial sound perception
     * - 113th Telemetry Channel (% TAI) Aura: Vibrant forest green (#16a34a) appendicular stride and traction field
     * - 114th Telemetry Channel (% AAI) Radiance: Midnight violet/indigo (#6366f1) tympanic acoustic resonance radiance
     * - Terrestrial Striding Footprints: Substrate impressions with 6-8 digit claw depressions and traction vector lines
     */
    class TetrapodOpticsRenderer {
        /**
         * Render individual Stem Tetrapod organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTetrapod(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isStemTetrapod) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const bodyLen = 34.0 + size * 1.9;      // 36 - 54 px
            const bodyWidth = 16.0 + size * 1.2;    // 18 - 28 px
            const tailLen = 32.0 + size * 1.8;      // 34 - 50 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const stepCycle = org.terrestrialStepCycle || 0.0;
            const isStriding = org.groundStridingActive || false;

            const tai = (org.tetrapodAppendicularIndex || 0.0) / 100.0;
            const aai = (org.amphibiousAcousticIndex || 0.0) / 100.0;
            const digits = org.digitCount || 7;
            const carpalFlex = org.carpalTarsalFlexibility || 0.75;
            const traction = org.digitGripTraction || 0.78;
            const neckAngle = org.cervicalHeadAngle || 0.0;
            const ribcage = org.thoracicRibcageSupport || 0.76;
            const acousticActive = org.aerialAcousticDetection || false;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 113th Channel Appendicular Stride Aura (% TAI - Forest Green #16a34a)
            if (isStriding || tai > 0.35) {
                const taiAlpha = isStriding ? 0.32 + tai * 0.28 : tai * 0.16;
                ctx.save();
                ctx.strokeStyle = isStriding ? "rgba(22, 163, 74, " + Math.min(0.85, taiAlpha + 0.25) + ")" :
                    "rgba(34, 197, 94, " + Math.max(0.06, taiAlpha) + ")";
                ctx.lineWidth = isStriding ? 2.2 + tai * 1.2 : 1.0;
                ctx.beginPath();
                ctx.ellipse(0, 0, bodyLen * 0.70 + 8.0, bodyWidth * 0.65 + 6.0, 0, 0, Math.PI * 2);
                ctx.stroke();

                // Polydactyly stride energy rings during active land locomotion
                if (isStriding && (tick % 16 < 8)) {
                    ctx.strokeStyle = "rgba(74, 222, 128, 0.45)";
                    ctx.lineWidth = 1.0;
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, bodyLen * 0.85, bodyWidth * 0.80, 0, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                ctx.restore();
            }

            // 2. 114th Channel Tympanic Acoustic Resonance Radiance (% AAI - Midnight Violet #6366f1)
            if (acousticActive || aai > 0.40) {
                const aaiAlpha = acousticActive ? 0.45 + aai * 0.35 : aai * 0.18;
                ctx.save();
                ctx.strokeStyle = "rgba(99, 102, 241, " + Math.min(0.90, aaiAlpha) + ")";
                ctx.lineWidth = acousticActive ? 2.0 : 1.2;

                // Bilateral otic notch concentric acoustic hearing arcs
                const headOffset = bodyLen * 0.42;
                const earSpan = bodyWidth * 0.48;

                for (let side = -1; side <= 1; side += 2) {
                    ctx.beginPath();
                    ctx.arc(headOffset, side * earSpan, 7.0 + aai * 5.0, -Math.PI * 0.4, Math.PI * 0.4, side < 0);
                    ctx.stroke();

                    if (acousticActive) {
                        ctx.strokeStyle = "rgba(129, 140, 248, 0.65)";
                        ctx.beginPath();
                        ctx.arc(headOffset, side * earSpan, 12.0 + aai * 8.0, -Math.PI * 0.45, Math.PI * 0.45, side < 0);
                        ctx.stroke();
                    }
                }
                ctx.restore();
            }

            // 3. Sprawling Limbs with Articulated Carpus/Tarsus & Polydactyly Digits (6-8 Digits)
            const limbPairs = [
                { isPectoral: true,  baseX: bodyLen * 0.22,  spanY: bodyWidth * 0.65, length: 16.0 + size * 0.8, phaseOffset: 0.0 },
                { isPectoral: false, baseX: -bodyLen * 0.25, spanY: bodyWidth * 0.62, length: 18.0 + size * 0.9, phaseOffset: Math.PI }
            ];

            for (let p = 0; p < limbPairs.length; p++) {
                const pair = limbPairs[p];
                for (let side = -1; side <= 1; side += 2) {
                    // Alternating crawling/walking diagonal gait cycle
                    const limbCycle = stepCycle + pair.phaseOffset + (side > 0 ? 0 : Math.PI);
                    const strideSweep = Math.sin(limbCycle);
                    const strideExtension = Math.cos(limbCycle);

                    const humerusAngle = side * (0.85 + strideSweep * 0.35);
                    const carpalAngle = side * (0.45 - strideExtension * 0.30 * carpalFlex);

                    ctx.save();
                    ctx.translate(pair.baseX, side * pair.spanY * 0.5);

                    // A. Muscular Stylopod (Humerus / Femur)
                    const stylopodLen = pair.length * 0.52;
                    const elbowX = Math.cos(humerusAngle) * stylopodLen;
                    const elbowY = Math.sin(humerusAngle) * stylopodLen;

                    ctx.strokeStyle = "rgba(30, 41, 59, 0.85)";
                    ctx.fillStyle = pair.isPectoral ? "rgba(21, 128, 61, 0.70)" : "rgba(22, 101, 52, 0.70)";
                    ctx.lineWidth = 4.5;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(elbowX, elbowY);
                    ctx.stroke();

                    // B. Zeugopod (Radius/Ulna or Tibia/Fibula)
                    const zeugopodLen = pair.length * 0.48;
                    const totalWristAngle = humerusAngle + carpalAngle;
                    const wristX = elbowX + Math.cos(totalWristAngle) * zeugopodLen;
                    const wristY = elbowY + Math.sin(totalWristAngle) * zeugopodLen;

                    ctx.lineWidth = 3.2;
                    ctx.beginPath();
                    ctx.moveTo(elbowX, elbowY);
                    ctx.lineTo(wristX, wristY);
                    ctx.stroke();

                    // C. Carpus / Tarsus Joint Capsule Bulb
                    ctx.fillStyle = "rgba(74, 222, 128, 0.90)";
                    ctx.beginPath();
                    ctx.arc(wristX, wristY, 2.2, 0, Math.PI * 2);
                    ctx.fill();

                    // D. Polydactyly Digits (6, 7, or 8 Distinct Digits)
                    const digitCount = Math.max(6, Math.min(8, digits));
                    const digitFanArc = 1.15; // Angular spread in radians
                    const digitLen = 7.0 + size * 0.35;
                    const startAngle = totalWristAngle + side * (-digitFanArc * 0.5);

                    for (let d = 0; d < digitCount; d++) {
                        const digitFrac = digitCount > 1 ? d / (digitCount - 1) : 0.5;
                        const dAngle = startAngle + side * (digitFrac * digitFanArc);

                        const phalangeMidX = wristX + Math.cos(dAngle) * (digitLen * 0.55);
                        const phalangeMidY = wristY + Math.sin(dAngle) * (digitLen * 0.55);
                        const digitTipX = wristX + Math.cos(dAngle) * digitLen;
                        const digitTipY = wristY + Math.sin(dAngle) * digitLen;

                        // Digit phalange bone line
                        ctx.strokeStyle = isStriding ? "rgba(34, 197, 94, 0.95)" : "rgba(22, 163, 74, 0.80)";
                        ctx.lineWidth = 1.4;
                        ctx.beginPath();
                        ctx.moveTo(wristX, wristY);
                        ctx.lineTo(phalangeMidX, phalangeMidY);
                        ctx.lineTo(digitTipX, digitTipY);
                        ctx.stroke();

                        // Terminal claw/pad traction dot
                        ctx.fillStyle = isStriding ? "rgba(240, 253, 244, 0.95)" : "rgba(134, 239, 172, 0.85)";
                        ctx.beginPath();
                        ctx.arc(digitTipX, digitTipY, 1.2, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Interdigital webbing outline for early amphibious tetrapods (e.g. Acanthostega)
                    if (digits >= 7) {
                        ctx.fillStyle = "rgba(22, 163, 74, 0.18)";
                        ctx.beginPath();
                        ctx.moveTo(wristX, wristY);
                        for (let d = 0; d < digitCount; d++) {
                            const digitFrac = digitCount > 1 ? d / (digitCount - 1) : 0.5;
                            const dAngle = startAngle + side * (digitFrac * digitFanArc);
                            ctx.lineTo(wristX + Math.cos(dAngle) * (digitLen * 0.70), wristY + Math.sin(dAngle) * (digitLen * 0.70));
                        }
                        ctx.closePath();
                        ctx.fill();
                    }

                    ctx.restore();
                }
            }

            // 4. Flattened Caudal Tail Fin with Fin Ray Remnants (Labyrinthodont Amphibian Paddle)
            ctx.save();
            ctx.fillStyle = "rgba(20, 83, 45, 0.65)";
            ctx.strokeStyle = "rgba(34, 197, 94, 0.55)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.45, -bodyWidth * 0.35);
            ctx.quadraticCurveTo(-bodyLen * 0.75, -bodyWidth * 0.45, -bodyLen * 0.45 - tailLen, 0);
            ctx.quadraticCurveTo(-bodyLen * 0.75, bodyWidth * 0.45, -bodyLen * 0.45, bodyWidth * 0.35);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Fin ray strays along caudal tail
            for (let r = 0; r < 5; r++) {
                const rx = -bodyLen * 0.50 - r * 6.5;
                ctx.strokeStyle = "rgba(74, 222, 128, 0.25)";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(rx, -bodyWidth * 0.28);
                ctx.lineTo(rx - 4.0, bodyWidth * 0.28);
                ctx.stroke();
            }
            ctx.restore();

            // 5. Robust Torso with Overlapping Thoracic Ribcage (Interlocking Vertebrae Under Gravity)
            ctx.save();
            // Torso main body fill
            ctx.fillStyle = "rgba(22, 101, 52, 0.88)";
            ctx.strokeStyle = "rgba(15, 23, 42, 0.90)";
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyLen * 0.48, bodyWidth * 0.46, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Vertebral column (spine line)
            ctx.strokeStyle = "rgba(134, 239, 172, 0.60)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.40, 0);
            ctx.lineTo(bodyLen * 0.25, 0);
            ctx.stroke();

            // Thoracic Ribcage Arches (Gravity defense & lung protection)
            const ribCount = 6;
            const ribSpacing = (bodyLen * 0.55) / ribCount;
            for (let i = 0; i < ribCount; i++) {
                const rx = -bodyLen * 0.22 + i * ribSpacing;
                const ribSpan = (bodyWidth * 0.38) * (1.0 - Math.abs(i - ribCount * 0.45) * 0.15) * ribcage;

                ctx.strokeStyle = "rgba(74, 222, 128, 0.70)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                // Dorsal to ventral lateral rib curve
                ctx.moveTo(rx, -ribSpan);
                ctx.quadraticCurveTo(rx + 2.5, 0, rx, ribSpan);
                ctx.stroke();
            }

            // Coelomic vascular lungs visible through body wall
            ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
            ctx.beginPath();
            ctx.ellipse(-bodyLen * 0.05, -bodyWidth * 0.16, bodyLen * 0.18, bodyWidth * 0.12, 0, 0, Math.PI * 2);
            ctx.ellipse(-bodyLen * 0.05, bodyWidth * 0.16, bodyLen * 0.18, bodyWidth * 0.12, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 6. Decoupled Pectoral Girdle & Articulated Cervical Head (Free Neck Yaw Articulation)
            ctx.save();
            const headBaseX = bodyLen * 0.32;
            ctx.translate(headBaseX, 0);

            // Dynamic Cervical Neck Rotation
            ctx.rotate(neckAngle);

            // Cervical neck constriction line (detachment from shoulder girdle)
            ctx.strokeStyle = "rgba(15, 23, 42, 0.85)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(-2.0, 0, bodyWidth * 0.35, -Math.PI * 0.35, Math.PI * 0.35);
            ctx.stroke();

            // Triangular Flattened Cranial Shield (Labyrinthodont Skull)
            const skullLen = bodyLen * 0.38;
            const skullHalfW = bodyWidth * 0.44;

            ctx.fillStyle = "rgba(21, 128, 61, 0.95)";
            ctx.strokeStyle = "rgba(15, 23, 42, 0.95)";
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(0, -skullHalfW);
            ctx.lineTo(skullLen * 0.65, -skullHalfW * 0.55);
            ctx.lineTo(skullLen, 0); // Rounded snout tip
            ctx.lineTo(skullLen * 0.65, skullHalfW * 0.55);
            ctx.lineTo(0, skullHalfW);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // A. Dorsal Periscope Eyes (Orbits raised above skull roof)
            const eyeX = skullLen * 0.45;
            const eyeY = skullHalfW * 0.38;

            for (let side = -1; side <= 1; side += 2) {
                // Eye orbit ridge
                ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
                ctx.beginPath();
                ctx.arc(eyeX, side * eyeY, 3.2, 0, Math.PI * 2);
                ctx.fill();

                // Amber / golden amphibian iris
                ctx.fillStyle = "#fbbf24";
                ctx.beginPath();
                ctx.arc(eyeX, side * eyeY, 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Slit predator pupil facing forward
                ctx.fillStyle = "#0f172a";
                ctx.beginPath();
                ctx.ellipse(eyeX + 0.3, side * eyeY, 1.4, 0.6, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // B. External Snout Nares (Air Breathing Inflow)
            const nareX = skullLen * 0.82;
            const nareY = skullHalfW * 0.16;
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.beginPath();
            ctx.arc(nareX, -nareY, 1.2, 0, Math.PI * 2);
            ctx.arc(nareX, nareY, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // C. Posterior Otic Notch & Stapes Bone Hearing Core
            const notchX = 2.0;
            const notchY = skullHalfW * 0.82;

            for (let side = -1; side <= 1; side += 2) {
                // Otic notch concave indention
                ctx.fillStyle = "rgba(99, 102, 241, 0.85)";
                ctx.beginPath();
                ctx.arc(notchX, side * notchY, 2.4, 0, Math.PI * 2);
                ctx.fill();

                // Stapes bone rod pointing inward toward otic capsule
                ctx.strokeStyle = "#e2e8f0";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.moveTo(notchX, side * notchY);
                ctx.lineTo(notchX + 3.5, side * (notchY - 2.5));
                ctx.stroke();
            }

            ctx.restore(); // Restore head transform
            ctx.restore(); // Restore organism transform
        }

        /**
         * Render substrate ground-strike footprints and airborne acoustic perception waves.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawTetrapodFootprintsAndAcoustics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isStemTetrapod) continue;

                const tai = (org.tetrapodAppendicularIndex || 0.0) / 100.0;
                const aai = (org.amphibiousAcousticIndex || 0.0) / 100.0;
                const isStriding = org.groundStridingActive || false;
                const digits = org.digitCount || 7;

                // 1. Polydactyly Substrate Footprints (Claw depressions & traction lines)
                if (isStriding || org.substrateContact) {
                    ctx.save();
                    ctx.fillStyle = "rgba(22, 163, 74, 0.18)";
                    ctx.beginPath();
                    // Alternating left/right step impressions
                    const strideOffset = (Math.sin(org.terrestrialStepCycle || 0) > 0 ? 8.0 : -8.0);
                    ctx.ellipse(org.x - 10.0, org.y + strideOffset, 7.0 + tai * 4.0, 3.2, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Tiny digit claw pips in mud
                    ctx.fillStyle = "rgba(34, 197, 94, 0.35)";
                    for (let d = 0; d < Math.min(8, digits); d++) {
                        const dAngle = -0.6 + (d / (digits - 1)) * 1.2;
                        const pipX = (org.x - 10.0) + Math.cos(dAngle) * (6.0 + tai * 2.0);
                        const pipY = (org.y + strideOffset) + Math.sin(dAngle) * (3.5 + tai * 1.5);
                        ctx.fillRect(pipX - 0.7, pipY - 0.7, 1.4, 1.4);
                    }
                    ctx.restore();
                }

                // 2. Airborne Acoustic Pulse Circles (Stapes middle ear detection)
                if (org.aerialAcousticDetection && (tick % 24 < 14)) {
                    ctx.save();
                    const pulseRadius = 14.0 + (tick % 24) * 2.0;
                    ctx.strokeStyle = "rgba(99, 102, 241, " + (0.50 - (tick % 24) * 0.02) + ")";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, pulseRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TetrapodOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TetrapodOpticsRenderer = TetrapodOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
