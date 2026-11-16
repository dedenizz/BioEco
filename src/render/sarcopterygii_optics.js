// BioEcosystem - Early Sarcopterygii Monobasic Lobe-Fin Stalks, Pulmonary Lungs & Substrate Locomotion Optics
// Module: src/render/sarcopterygii_optics.js
// Version: 8.47.0 (Hour 567 - Looks & UI Agent: Monobasic Lobe Stalks, Mud Crawling Trails, Lung Capillary Luminescence & Surface Air Gulps)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SarcopterygiiOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Sarcopterygii / Tetrapodomorpha & Rhipidistia (lobe-finned fishes):
     * - Monobasic Articulated Lobe-Fin Stalks: Fleshy muscular limb stalks with central bone axes (humerus/femur, radius/ulna homologues) articulating with an alternating walking gait
     * - Substrate Prop-Up & Crawling Stride: Fins planted downward to lift body off sediment during benthic crawling, generating mud traction plumes
     * - Vascularized Bilobed Pulmonary Lungs: Glowing deep inside the coelom with ruby/coral vascular networks, pulsating with atmospheric oxygen levels
     * - Periscope Dorsal Skull Orbits: Raised eyes on flattened cranial shield enabling stealthy surface scanning and shallow wetland ambush
     * - Internal Choanae Respiratory Inflow: Fine narial airflow lines from external snouts to buccal chamber
     * - 111th Telemetry Channel (% LFI) Aura: Earth amber / golden brown (#d97706) substrate locomotion aura
     * - 112th Telemetry Channel (% PRI) Radiance: Flame orange / crimson (#ea580c) pulmonary air-breathing radiance
     * - Substrate Trails & Air Gulp Bubbles: Benthic mud disturbances and surface bubble clusters rendered behind active tetrapodomorphs
     */
    class SarcopterygiiOpticsRenderer {
        /**
         * Render individual Sarcopterygii organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawSarcopterygii(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isSarcopterygii) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const bodyLen = 32.0 + size * 1.8;      // 34 - 50 px
            const bodyWidth = 14.0 + size * 1.1;    // 16 - 25 px
            const tailLen = 34.0 + size * 2.0;      // 38 - 54 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const stepPhase = org.propulsionStepPhase || 0.0;
            const onSubstrate = org.substrateContact || false;

            const lfi = (org.lobeFinLocomotionIndex || 0.0) / 100.0;
            const pri = (org.pulmonaryRespirationIndex || 0.0) / 100.0;
            const torque = org.lobeFinMuscularTorque || 1.75;
            const airReserve = (org.atmosphericOxygenReserve || 80.0) / 100.0;
            const vascularDensity = org.pulmonaryVascularDensity || 0.78;
            const choanae = org.choanaeAirflowConductivity || 0.68;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 111th Channel Substrate Locomotion Aura (% LFI - Earth Amber #d97706)
            if (onSubstrate || lfi > 0.40) {
                const lfiAlpha = onSubstrate ? 0.30 + lfi * 0.25 : lfi * 0.16;
                ctx.save();
                ctx.strokeStyle = onSubstrate ? "rgba(217, 119, 6, " + Math.min(0.85, lfiAlpha + 0.20) + ")" :
                    "rgba(245, 158, 11, " + Math.max(0.05, lfiAlpha) + ")";
                ctx.lineWidth = onSubstrate ? 2.0 + lfi * 1.2 : 1.0;
                ctx.setLineDash(onSubstrate ? [5, 3] : [2, 4]);

                ctx.beginPath();
                ctx.ellipse(0, 0, bodyLen * 0.90 + (onSubstrate ? 6 : 0), bodyWidth * 1.15 + (onSubstrate ? 5 : 0), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. 112th Channel Pulmonary Air-Breathing Radiance (% PRI - Flame Orange #ea580c)
            if (airReserve > 0.30 || pri > 0.35) {
                const priAlpha = 0.08 + pri * 0.22 + airReserve * 0.15;
                ctx.save();
                ctx.fillStyle = "rgba(234, 88, 12, " + Math.min(0.35, priAlpha * 0.5) + ")";
                ctx.beginPath();
                // Bilobed lung silhouette
                ctx.ellipse(-bodyLen * 0.05, -bodyWidth * 0.25, bodyLen * 0.26, bodyWidth * 0.22, 0, 0, Math.PI * 2);
                ctx.ellipse(-bodyLen * 0.05, bodyWidth * 0.25, bodyLen * 0.26, bodyWidth * 0.22, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // 3. Monobasic Muscular Lobe-Fins (Pectoral & Pelvic Limb Stalks)
            // Stalks feature central bone elements and fleshy muscular peduncles
            const stalkLen = 14.0 + size * 0.9;
            const stalkThick = 5.0 + size * 0.3;

            // Render 4 limbs: 2 pectoral (anterior), 2 pelvic (posterior)
            const limbs = [
                { x: bodyLen * 0.18, side: -1, phaseOffset: 0.0, isPectoral: true },
                { x: bodyLen * 0.18, side: 1, phaseOffset: Math.PI, isPectoral: true },
                { x: -bodyLen * 0.22, side: -1, phaseOffset: Math.PI * 0.5, isPectoral: false },
                { x: -bodyLen * 0.22, side: 1, phaseOffset: Math.PI * 1.5, isPectoral: false }
            ];

            ctx.save();
            for (let l = 0; l < limbs.length; l++) {
                const limb = limbs[l];
                const limbCycle = stepPhase + limb.phaseOffset;
                // Alternating stride angle
                const swingAngle = Math.sin(limbCycle) * (onSubstrate ? 0.55 : 0.28);
                const baseFinY = limb.side * (bodyWidth * 0.48);
                const baseFinX = limb.x;

                ctx.save();
                ctx.translate(baseFinX, baseFinY);
                ctx.rotate(limb.side * (0.65 + swingAngle));

                // A. Muscular Lobe Stalk (Fleshy Peduncle)
                ctx.beginPath();
                ctx.ellipse(stalkLen * 0.45, 0, stalkLen * 0.48, stalkThick * 0.55, 0, 0, Math.PI * 2);
                const lobeGrad = ctx.createLinearGradient(0, 0, stalkLen, 0);
                lobeGrad.addColorStop(0, "rgba(217, 119, 6, 0.85)");
                lobeGrad.addColorStop(0.6, "rgba(180, 83, 9, 0.70)");
                lobeGrad.addColorStop(1, "rgba(120, 53, 15, 0.55)");
                ctx.fillStyle = lobeGrad;
                ctx.fill();
                ctx.strokeStyle = "rgba(251, 191, 36, 0.75)";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // B. Internal Monobasic Bone Axis (Humerus / Femur & Radius/Ulna Homologues)
                ctx.strokeStyle = "rgba(255, 255, 255, 0.90)";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(2, 0);
                ctx.lineTo(stalkLen * 0.50, 0); // Primary bone
                ctx.stroke();

                ctx.strokeStyle = "rgba(254, 243, 199, 0.75)";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.moveTo(stalkLen * 0.50, 0);
                ctx.lineTo(stalkLen * 0.85, -1.5); // Second bone A
                ctx.moveTo(stalkLen * 0.50, 0);
                ctx.lineTo(stalkLen * 0.85, 1.5);  // Second bone B
                ctx.stroke();

                // C. Distal Webbed Fin Fringe (Lepidotrichia Border)
                ctx.strokeStyle = "rgba(245, 158, 11, 0.65)";
                ctx.lineWidth = 0.8;
                for (let r = -3; r <= 3; r++) {
                    const rAngle = r * 0.16;
                    ctx.beginPath();
                    ctx.moveTo(stalkLen * 0.85, r * 1.0);
                    ctx.lineTo(stalkLen * 0.85 + Math.cos(rAngle) * 8.0, r * 1.0 + Math.sin(rAngle) * 8.0);
                    ctx.stroke();
                }

                ctx.restore();
            }
            ctx.restore();

            // 4. Flattened Tetrapodomorph Body Profile (Depressed Cranium & Muscular Trunk)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.58, 0); // Broad rounded snout
            // Dorsal curvature
            ctx.bezierCurveTo(bodyLen * 0.30, -bodyWidth * 0.62, -bodyLen * 0.25, -bodyWidth * 0.58, -bodyLen * 0.55, -bodyWidth * 0.28);
            // Caudal trunk
            ctx.lineTo(-bodyLen * 0.55, bodyWidth * 0.28);
            // Ventral curvature
            ctx.bezierCurveTo(-bodyLen * 0.25, bodyWidth * 0.58, bodyLen * 0.30, bodyWidth * 0.62, bodyLen * 0.58, 0);
            ctx.closePath();

            const bodyGrad = ctx.createLinearGradient(bodyLen * 0.58, 0, -bodyLen * 0.55, 0);
            bodyGrad.addColorStop(0, "rgba(254, 243, 199, 0.32)");
            bodyGrad.addColorStop(0.35, "rgba(251, 191, 36, 0.22)");
            bodyGrad.addColorStop(0.70, "rgba(217, 119, 6, 0.18)");
            bodyGrad.addColorStop(1, "rgba(180, 83, 9, 0.14)");

            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = onSubstrate ? "rgba(245, 158, 11, 0.85)" : "rgba(217, 119, 6, 0.65)";
            ctx.lineWidth = 1.4;
            ctx.stroke();
            ctx.restore();

            // 5. Vascularized Pulmonary Lungs (Internal Bilobed Capillary Luminescence)
            ctx.save();
            const lungX = -bodyLen * 0.06;
            const lungLen = bodyLen * 0.38;
            const lungW = bodyWidth * 0.26;

            for (let side = -1; side <= 1; side += 2) {
                const lungY = side * (bodyWidth * 0.26);

                ctx.beginPath();
                ctx.ellipse(lungX, lungY, lungLen * 0.5, lungW * 0.5, 0, 0, Math.PI * 2);

                const lungGrad = ctx.createRadialGradient(lungX, lungY, 1.0, lungX, lungY, lungLen * 0.5);
                lungGrad.addColorStop(0, "rgba(255, 255, 255, " + (0.70 + airReserve * 0.25) + ")");
                lungGrad.addColorStop(0.4, "rgba(251, 113, 133, " + (0.55 + airReserve * 0.30) + ")");
                lungGrad.addColorStop(0.8, "rgba(234, 88, 12, " + (0.40 + vascularDensity * 0.35) + ")");
                lungGrad.addColorStop(1, "rgba(190, 24, 93, 0.10)");

                ctx.fillStyle = lungGrad;
                ctx.fill();
                ctx.strokeStyle = "rgba(234, 88, 12, 0.75)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Pulmonary capillary arborization
                ctx.strokeStyle = "rgba(225, 29, 72, 0.60)";
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(lungX - lungLen * 0.3, lungY);
                ctx.lineTo(lungX + lungLen * 0.3, lungY);
                ctx.moveTo(lungX, lungY);
                ctx.lineTo(lungX + lungLen * 0.15, lungY + side * 2.5);
                ctx.moveTo(lungX - lungLen * 0.1, lungY);
                ctx.lineTo(lungX + lungLen * 0.05, lungY - side * 2.5);
                ctx.stroke();
            }
            ctx.restore();

            // 6. Ossified Axial Vertebrae & Neural Spines
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.35, 0);
            ctx.lineTo(-bodyLen * 0.52, 0);
            ctx.stroke();

            const vCount = 7;
            for (let v = 0; v < vCount; v++) {
                const vx = bodyLen * 0.30 - v * (bodyLen * 0.78 / (vCount - 1));
                ctx.fillStyle = "rgba(254, 243, 199, 0.90)";
                ctx.fillRect(vx - 0.9, -0.9, 1.8, 1.8);

                ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(vx, -0.9);
                ctx.lineTo(vx - 2.0, -bodyWidth * 0.45);
                ctx.moveTo(vx, 0.9);
                ctx.lineTo(vx - 1.5, bodyWidth * 0.45);
                ctx.stroke();
            }
            ctx.restore();

            // 7. Internal Nostrils (Choanae Respiratory Ducts)
            if (choanae > 0.40) {
                ctx.save();
                ctx.strokeStyle = "rgba(251, 146, 60, 0.70)";
                ctx.lineWidth = 1.1;
                for (let side = -1; side <= 1; side += 2) {
                    const narisX = bodyLen * 0.48;
                    const narisY = side * (bodyWidth * 0.18);
                    const choanaX = bodyLen * 0.32;
                    const choanaY = side * (bodyWidth * 0.12);

                    ctx.beginPath();
                    ctx.moveTo(narisX, narisY);
                    ctx.lineTo(choanaX, choanaY);
                    ctx.stroke();

                    ctx.fillStyle = "rgba(255, 255, 255, 0.80)";
                    ctx.fillRect(narisX - 0.5, narisY - 0.5, 1.0, 1.0);
                    ctx.fillRect(choanaX - 0.5, choanaY - 0.5, 1.0, 1.0);
                }
                ctx.restore();
            }

            // 8. Periscope Dorsal Skull Orbits (Skull-Top Eyes)
            ctx.save();
            const eyeX = bodyLen * 0.38;
            for (let side = -1; side <= 1; side += 2) {
                const eyeY = side * (bodyWidth * 0.28);

                // Raised orbit mound
                ctx.beginPath();
                ctx.arc(eyeX, eyeY, 3.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(217, 119, 6, 0.85)";
                ctx.fill();
                ctx.strokeStyle = "rgba(251, 191, 36, 0.90)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Eye lens
                ctx.beginPath();
                ctx.arc(eyeX, eyeY, 2.0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                ctx.fill();

                // Pupil
                ctx.beginPath();
                ctx.arc(eyeX + 0.4, eyeY, 1.0, 0, Math.PI * 2);
                ctx.fillStyle = "#0f172a";
                ctx.fill();

                // Upward periscope visual scan cone
                if (onSubstrate) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(251, 146, 60, 0.22)";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(eyeX, eyeY);
                    ctx.lineTo(eyeX + 18.0, eyeY + side * 12.0);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            ctx.restore();

            // 9. Diphycercal Rhomboid Caudal Fin with Central Muscular Axis
            ctx.save();
            const tailBaseX = -bodyLen * 0.55;
            const caudalLen = tailLen * 0.65;
            const caudalH = bodyWidth * 0.70;

            // Fleshy tail core
            ctx.beginPath();
            ctx.moveTo(tailBaseX, 0);
            ctx.lineTo(tailBaseX - caudalLen * 0.75, 0);
            ctx.strokeStyle = "rgba(217, 119, 6, 0.80)";
            ctx.lineWidth = 3.0;
            ctx.stroke();

            // Dorsal & ventral rhomboid fin membrane
            ctx.beginPath();
            ctx.moveTo(tailBaseX, -bodyWidth * 0.28);
            ctx.lineTo(tailBaseX - caudalLen * 0.5, -caudalH);
            ctx.lineTo(tailBaseX - caudalLen, 0);
            ctx.lineTo(tailBaseX - caudalLen * 0.5, caudalH);
            ctx.lineTo(tailBaseX, bodyWidth * 0.28);
            ctx.closePath();
            ctx.fillStyle = "rgba(251, 191, 36, 0.20)";
            ctx.fill();
            ctx.strokeStyle = "rgba(245, 158, 11, 0.65)";
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render substrate mud disturbance trails and surface atmospheric air-gulp bubbles.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawSarcopterygiiSubstrateTrails(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isSarcopterygii) continue;

                // 1. Mud crawling disturbance footprints when in contact with substrate
                if (org.substrateContact) {
                    const lfi = (org.lobeFinLocomotionIndex || 0.0) / 100.0;
                    ctx.save();
                    ctx.fillStyle = "rgba(180, 83, 9, 0.16)";
                    ctx.beginPath();
                    ctx.ellipse(org.x - 8.0, org.y + 4.0, 10.0 + lfi * 6.0, 3.5, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Step traction puffs
                    if (tick % 20 === 0) {
                        ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
                        ctx.lineWidth = 0.8;
                        ctx.strokeRect(org.x - 12.0, org.y + 2.0, 4.0, 4.0);
                    }
                    ctx.restore();
                }

                // 2. Atmospheric air gulp bubbles near surface
                if (org.y < 120.0 && (tick % 35 === 0)) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(234, 88, 12, 0.40)";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(org.x + (Math.random() - 0.5) * 8.0, org.y - 12.0, 2.5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SarcopterygiiOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.SarcopterygiiOpticsRenderer = SarcopterygiiOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
