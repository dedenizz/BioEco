// BioEcosystem - Early Amniota Egg Membranes, Keratinized Scales, Costal Breathing & Dryland Locomotion Optics
// Module: src/render/amniota_optics.js
// Version: 8.59.0 (Hour 579 - Looks & UI Agent: Amniotic Egg Clutch Optics, Keratinized Scale Lattice, Costal Thoracic Breath Expansion & 115th/116th Channel Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AmniotaOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Amniota & Basal Sauropsida/Synapsida:
     * - Hylonomus lyelli, Paleothyris acadiana agile cursorial reptile morphology
     * - Keratinized Epidermal Scales: Overlapping diamond/rhomboid scale texture providing specular reflections and moisture retention
     * - Costal Aspiration Breathing Expansion: Dynamic rhythmic ribcage inhalation widening and vacuum aspiration wave
     * - Pentadactyl Cursorial Digits: 5 slender clawed digits per limb articulating with high-speed terrestrial sprint cycles
     * - Amniotic Terrestrial Egg Clutches: Calcified ovoid egg clusters deposited directly in dry substrate nests
     * - 115th Telemetry Channel (% AEI) Aura: Vibrant sun gold / amber (#eab308) egg shell calcification radiance
     * - 116th Telemetry Channel (% KSR) Radiance: Terracotta / lizard crimson (#dc2626) keratinized scale desiccation shield
     * - Substrate Clutches & Moisture Locks: Dryland nest sites and microscopic moisture-locking hydration halos
     */
    class AmniotaOpticsRenderer {
        /**
         * Render individual Amniota organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawAmniota(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isAmniota) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const bodyLen = 32.0 + size * 1.8;      // 34 - 50 px
            const bodyWidth = 13.0 + size * 1.0;    // 15 - 23 px
            const tailLen = 38.0 + size * 2.2;      // 42 - 60 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const breathCycle = org.costalBreathingCycle || 0.0;
            const isBreathing = org.costalAspirationActive || false;
            const isClutching = org.clutchLayingActive || false;

            const aei = (org.amnioticEggIntegrityIndex || 0.0) / 100.0;
            const ksr = (org.keratinizedScaleResilienceIndex || 0.0) / 100.0;
            const scaleDensity = org.keratinizedScaleDensity || 0.80;
            const moisture = org.epidermalMoistureRetention || 0.92;
            const shellCalc = org.shellCalcificationLevel || 0.78;
            const tidal = (org.tidalLungCapacity || 2.2) / 3.0;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 115th Channel Amniotic Egg Integrity Aura (% AEI - Sun Gold #eab308)
            if (isClutching || aei > 0.45) {
                const aeiAlpha = isClutching ? 0.40 + aei * 0.35 : aei * 0.18;
                ctx.save();
                ctx.strokeStyle = isClutching ? "rgba(234, 179, 8, " + Math.min(0.90, aeiAlpha + 0.25) + ")" :
                    "rgba(250, 204, 21, " + Math.max(0.06, aeiAlpha) + ")";
                ctx.lineWidth = isClutching ? 2.4 : 1.2;
                ctx.beginPath();
                ctx.ellipse(-bodyLen * 0.08, 0, bodyLen * 0.65 + 6.0, bodyWidth * 0.70 + 5.0, 0, 0, Math.PI * 2);
                ctx.stroke();

                // Calcified egg shell crystalline spark rings
                if (isClutching && (tick % 18 < 9)) {
                    ctx.strokeStyle = "rgba(254, 240, 138, 0.60)";
                    ctx.lineWidth = 1.0;
                    ctx.setLineDash([2, 4]);
                    ctx.beginPath();
                    ctx.arc(-bodyLen * 0.15, 0, bodyWidth * 0.90, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                ctx.restore();
            }

            // 2. 116th Channel Keratinized Scale Resilience Shield (% KSR - Terracotta Crimson #dc2626)
            if (ksr > 0.40) {
                const ksrAlpha = 0.15 + ksr * 0.25;
                ctx.save();
                ctx.strokeStyle = "rgba(220, 38, 38, " + Math.min(0.85, ksrAlpha) + ")";
                ctx.lineWidth = 1.2 + ksr * 1.0;
                ctx.beginPath();
                ctx.ellipse(0, 0, bodyLen * 0.55 + 4.0, bodyWidth * 0.55 + 3.0, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Pentadactyl Cursorial Limbs with Sharp Claws (5 Digits per Limb)
            const limbCycle = (tick * 0.22) * (speed > 0.1 ? 1.0 : 0.3);
            const limbPairs = [
                { isPectoral: true,  baseX: bodyLen * 0.24,  spanY: bodyWidth * 0.75, length: 15.0 + size * 0.7, phaseOffset: 0.0 },
                { isPectoral: false, baseX: -bodyLen * 0.26, spanY: bodyWidth * 0.72, length: 18.0 + size * 0.8, phaseOffset: Math.PI }
            ];

            for (let p = 0; p < limbPairs.length; p++) {
                const pair = limbPairs[p];
                for (let side = -1; side <= 1; side += 2) {
                    const lCycle = limbCycle + pair.phaseOffset + (side > 0 ? 0 : Math.PI);
                    const strideSweep = Math.sin(lCycle);

                    const humerusAngle = side * (0.80 + strideSweep * 0.38);
                    const wristAngle = side * (0.40 - strideSweep * 0.25);

                    ctx.save();
                    ctx.translate(pair.baseX, side * pair.spanY * 0.45);

                    // Stylopod (Humerus / Femur)
                    const stylopodLen = pair.length * 0.52;
                    const elbowX = Math.cos(humerusAngle) * stylopodLen;
                    const elbowY = Math.sin(humerusAngle) * stylopodLen;

                    ctx.strokeStyle = "rgba(15, 23, 42, 0.90)";
                    ctx.fillStyle = pair.isPectoral ? "rgba(180, 83, 9, 0.80)" : "rgba(185, 28, 28, 0.80)";
                    ctx.lineWidth = 3.6;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(elbowX, elbowY);
                    ctx.stroke();

                    // Zeugopod (Radius/Ulna or Tibia/Fibula)
                    const zeugopodLen = pair.length * 0.48;
                    const totalWristAngle = humerusAngle + wristAngle;
                    const wristX = elbowX + Math.cos(totalWristAngle) * zeugopodLen;
                    const wristY = elbowY + Math.sin(totalWristAngle) * zeugopodLen;

                    ctx.lineWidth = 2.4;
                    ctx.beginPath();
                    ctx.moveTo(elbowX, elbowY);
                    ctx.lineTo(wristX, wristY);
                    ctx.stroke();

                    // Carpal/Tarsal Node
                    ctx.fillStyle = "#f59e0b";
                    ctx.beginPath();
                    ctx.arc(wristX, wristY, 1.8, 0, Math.PI * 2);
                    ctx.fill();

                    // Pentadactyl Digits (Exactly 5 Slender Claws)
                    const clawArc = 0.95;
                    const clawLen = 6.0 + size * 0.30;
                    const startAngle = totalWristAngle + side * (-clawArc * 0.5);

                    for (let d = 0; d < 5; d++) {
                        const dAngle = startAngle + side * ((d / 4.0) * clawArc);
                        const clawTipX = wristX + Math.cos(dAngle) * clawLen;
                        const clawTipY = wristY + Math.sin(dAngle) * clawLen;

                        ctx.strokeStyle = "rgba(220, 38, 38, 0.95)";
                        ctx.lineWidth = 1.1;
                        ctx.beginPath();
                        ctx.moveTo(wristX, wristY);
                        ctx.lineTo(clawTipX, clawTipY);
                        ctx.stroke();

                        // Sharp terminal claw tip
                        ctx.fillStyle = "#fef08a";
                        ctx.beginPath();
                        ctx.arc(clawTipX, clawTipY, 0.9, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    ctx.restore();
                }
            }

            // 4. Slender Long Tapering Tail (Agile Reptilian Balancer)
            ctx.save();
            ctx.strokeStyle = "rgba(180, 83, 9, 0.75)";
            ctx.fillStyle = "rgba(185, 28, 28, 0.70)";
            ctx.lineWidth = 1.4;

            const tailSegments = 6;
            let prevX = -bodyLen * 0.45;
            let prevY = 0;
            const tailWave = Math.sin(tick * 0.15 + speed);

            ctx.beginPath();
            ctx.moveTo(prevX, -bodyWidth * 0.25);

            for (let t = 1; t <= tailSegments; t++) {
                const segFrac = t / tailSegments;
                const segX = -bodyLen * 0.45 - segFrac * tailLen;
                const segY = Math.sin(tick * 0.12 + t * 0.6) * (3.0 + segFrac * 6.0) * tailWave;
                const segHalfW = bodyWidth * 0.25 * (1.0 - segFrac * 0.85);

                ctx.lineTo(segX, segY - segHalfW);
            }
            // Tail tip
            const tipX = -bodyLen * 0.45 - tailLen;
            const tipY = Math.sin(tick * 0.12 + tailSegments * 0.6) * 9.0 * tailWave;
            ctx.lineTo(tipX, tipY);

            for (let t = tailSegments; t >= 1; t--) {
                const segFrac = t / tailSegments;
                const segX = -bodyLen * 0.45 - segFrac * tailLen;
                const segY = Math.sin(tick * 0.12 + t * 0.6) * (3.0 + segFrac * 6.0) * tailWave;
                const segHalfW = bodyWidth * 0.25 * (1.0 - segFrac * 0.85);

                ctx.lineTo(segX, segY + segHalfW);
            }
            ctx.lineTo(prevX, bodyWidth * 0.25);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Dorsal tail scale ridge dots
            ctx.fillStyle = "#f59e0b";
            for (let t = 1; t < tailSegments; t++) {
                const segFrac = t / tailSegments;
                const segX = -bodyLen * 0.45 - segFrac * tailLen;
                const segY = Math.sin(tick * 0.12 + t * 0.6) * (3.0 + segFrac * 6.0) * tailWave;
                ctx.fillRect(segX - 0.8, segY - 0.8, 1.6, 1.6);
            }
            ctx.restore();

            // 5. Cursorial Torso with Costal Aspiration Breathing Expansion
            ctx.save();
            // Breathing ribcage expansion delta: rhythmic thoracic widening
            const breathExpansion = Math.sin(breathCycle) * (bodyWidth * 0.18 * tidal);
            const currentHalfW = (bodyWidth * 0.44) + (isBreathing ? breathExpansion : breathExpansion * 0.5);

            // Torso outer body fill (Terracotta / lizard bronze #b45309 and #b91c1c)
            ctx.fillStyle = "rgba(180, 83, 9, 0.90)";
            ctx.strokeStyle = "rgba(15, 23, 42, 0.95)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyLen * 0.46, currentHalfW, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Thoracic negative-pressure aspiration lung chamber (glows ruby when inhaling)
            if (isBreathing) {
                ctx.fillStyle = "rgba(239, 68, 68, 0.45)";
                ctx.beginPath();
                ctx.ellipse(bodyLen * 0.05, 0, bodyLen * 0.22, currentHalfW * 0.70, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // Keratinized Epidermal Scale Texture (Diamond Lattice Grid)
            const scaleRows = 5;
            const scaleCols = 7;
            const rowStep = (currentHalfW * 1.6) / scaleRows;
            const colStep = (bodyLen * 0.75) / scaleCols;

            ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
            ctx.lineWidth = 0.8;

            for (let r = 0; r < scaleRows; r++) {
                const sy = -currentHalfW * 0.80 + r * rowStep;
                for (let c = 0; c < scaleCols; c++) {
                    const sx = -bodyLen * 0.35 + c * colStep + (r % 2 === 0 ? colStep * 0.5 : 0);
                    // Check within body ellipse
                    if ((sx * sx) / ((bodyLen * 0.42) * (bodyLen * 0.42)) + (sy * sy) / (currentHalfW * currentHalfW) < 0.85) {
                        // Diamond scale shape
                        ctx.beginPath();
                        ctx.moveTo(sx, sy - 2.0);
                        ctx.lineTo(sx + 2.5, sy);
                        ctx.lineTo(sx, sy + 2.0);
                        ctx.lineTo(sx - 2.5, sy);
                        ctx.closePath();
                        ctx.stroke();

                        // High scale density specular reflection
                        if (scaleDensity > 0.80 && (c + r) % 3 === 0) {
                            ctx.fillStyle = "rgba(254, 240, 138, 0.50)";
                            ctx.fillRect(sx - 0.5, sy - 0.5, 1.0, 1.0);
                        }
                    }
                }
            }

            // Dorsal spine ridge
            ctx.strokeStyle = "rgba(220, 38, 38, 0.75)";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.38, 0);
            ctx.lineTo(bodyLen * 0.28, 0);
            ctx.stroke();
            ctx.restore();

            // 6. Slender Wedge-Shaped Amniote Skull & Perceptive Vision
            ctx.save();
            const skullBaseX = bodyLen * 0.30;
            ctx.translate(skullBaseX, 0);

            const skullLen = bodyLen * 0.34;
            const skullHalfW = bodyWidth * 0.38;

            // Skull casing (Anapsid/Early Diapsid wedge)
            ctx.fillStyle = "rgba(185, 28, 28, 0.95)";
            ctx.strokeStyle = "rgba(15, 23, 42, 0.95)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(0, -skullHalfW);
            ctx.lineTo(skullLen * 0.70, -skullHalfW * 0.45);
            ctx.lineTo(skullLen, 0); // Pointed snout tip
            ctx.lineTo(skullLen * 0.70, skullHalfW * 0.45);
            ctx.lineTo(0, skullHalfW);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // A. Alert Reptilian Eyes (Forward-lateral targeting)
            const eyeX = skullLen * 0.48;
            const eyeY = skullHalfW * 0.42;

            for (let side = -1; side <= 1; side += 2) {
                // Orbit rim
                ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
                ctx.beginPath();
                ctx.arc(eyeX, side * eyeY, 2.8, 0, Math.PI * 2);
                ctx.fill();

                // Sun gold / topaz iris
                ctx.fillStyle = "#eab308";
                ctx.beginPath();
                ctx.arc(eyeX, side * eyeY, 1.9, 0, Math.PI * 2);
                ctx.fill();

                // Slit predatory pupil
                ctx.fillStyle = "#0f172a";
                ctx.beginPath();
                ctx.ellipse(eyeX + 0.2, side * eyeY, 1.3, 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // B. Snout Nares (High-flow nasal air breathing)
            const nareX = skullLen * 0.84;
            const nareY = skullHalfW * 0.14;
            ctx.fillStyle = "#0f172a";
            ctx.beginPath();
            ctx.arc(nareX, -nareY, 1.0, 0, Math.PI * 2);
            ctx.arc(nareX, nareY, 1.0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore(); // Restore skull
            ctx.restore(); // Restore organism
        }

        /**
         * Render terrestrial calcified egg clutch nesting sites and dryland moisture-locking atmospherics.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawAmniotaClutchesAndAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isAmniota) continue;

                const aei = (org.amnioticEggIntegrityIndex || 0.0) / 100.0;
                const ksr = (org.keratinizedScaleResilienceIndex || 0.0) / 100.0;
                const isClutching = org.clutchLayingActive || false;
                const eggs = org.clutchEggCount || 6;

                // 1. Terrestrial Egg Clutch Nesting Site (Calcified ovoid eggs deposited on dry substrate)
                if (isClutching || (org.clutchCooldownTicks > 350)) {
                    ctx.save();
                    const nestX = org.x - 14.0;
                    const nestY = org.y + 6.0;

                    // Nest depression outline in sediment
                    ctx.fillStyle = "rgba(120, 53, 15, 0.22)";
                    ctx.beginPath();
                    ctx.ellipse(nestX, nestY, 11.0, 6.0, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Calcified ovoid eggs in cluster
                    const eggCount = Math.min(8, eggs);
                    for (let e = 0; e < eggCount; e++) {
                        const eAngle = (e / eggCount) * Math.PI * 2;
                        const ex = nestX + Math.cos(eAngle) * 4.5;
                        const ey = nestY + Math.sin(eAngle) * 2.5;

                        // Egg shell gradient fill (Ivory / sun gold calcified shell)
                        ctx.fillStyle = "rgba(254, 249, 195, 0.92)";
                        ctx.strokeStyle = "rgba(234, 179, 8, 0.85)";
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.ellipse(ex, ey, 2.8, 1.8, eAngle * 0.5, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.stroke();

                        // Embryo vitellus yolk glow inside shell
                        ctx.fillStyle = "rgba(245, 158, 11, 0.65)";
                        ctx.beginPath();
                        ctx.arc(ex, ey, 1.0, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }

                // 2. Microscopic Moisture-Locking Hydration Envelope (Desiccation Defense)
                if (org.y < 350.0 && (tick % 28 < 14)) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, 16.0 + ksr * 6.0, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AmniotaOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.AmniotaOpticsRenderer = AmniotaOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
