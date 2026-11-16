// BioEcosystem - Early Osteichthyes Swim Bladder, Bony Operculum & Lepidotrichia Ray Optics
// Module: src/render/osteichthyes_optics.js
// Version: 8.41.0 (Hour 561 - Looks & UI Agent: Swim Bladder Luminescence, Opercular Dual-Pump Flap, Lepidotrichia Ray Microscopy & Gas Trails)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OsteichthyesOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Osteichthyes / Actinopterygii & Sarcopterygii (bony fishes):
     * - Hydrostatic Swim Bladder Luminescence: Translucent silvery-emerald gas bladder positioned dorsally beneath vertebral column, pulsing with vascular rete mirabile capillaries
     * - Bony Operculum Rhythmic Flap: Articulated opercular bone plate expanding and contracting in synchrony with buccal pump, shedding subtle water plumes
     * - Lepidotrichia Segmented Fin Rays: Delicate dermal bone fin rays with visible micro-segmentation, fanning across pectoral, dorsal, and homocercal caudal fins
     * - Endochondral Ossified Skeleton: Luminescent bone mineral hydroxyapatite spinal column and neurocranium glowing with chalk-white clarity
     * - 109th Telemetry Channel (% SBI) Aura: Emerald ocean green (#10b981) hydrostatic neutral buoyancy hovering halo
     * - 110th Telemetry Channel (% OVR) Radiance: Coral rose (#f43f5e) branchial dual-pump suction plumes
     * - Gas Trails & Hover Halos: Subtle buoyant micro-disturbances rendered behind hovering teleosts
     */
    class OsteichthyesOpticsRenderer {
        /**
         * Render individual Osteichthyes organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawOsteichthyes(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isOsteichthyes) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const bodyLen = 28.0 + size * 1.6;      // 30 - 45 px
            const bodyHeight = 12.0 + size * 0.9;   // 14 - 22 px
            const tailLen = 32.0 + size * 2.0;      // 36 - 52 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const wavePhase = ((tick * 0.20 * Math.max(0.6, speed)) + (org.id ? (org.id * 0.71) : 0.0)) % (Math.PI * 2);

            const sbi = (org.swimBladderIndex || 0.0) / 100.0;
            const ovr = (org.opercularVentilationIndex || 0.0) / 100.0;
            const bladderVol = org.swimBladderVolume || 1.0;
            const isHovering = org.neutralBuoyancyHoverState || false;
            const motionlessBreathing = org.motionlessBreathingActive || false;
            const opercularPhase = org.opercularPhase || 0.0;
            const rayPhase = org.finRayWavePhase || 0.0;
            const rayCount = org.finRayCount || 16;
            const boneDensity = org.endochondralBoneDensity || 0.76;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 109th Channel Neutral Buoyancy Hovering Aura (% SBI - Emerald #10b981)
            if (isHovering || sbi > 0.40) {
                const hoverAlpha = isHovering ? 0.28 + sbi * 0.22 : sbi * 0.15;
                ctx.save();
                ctx.strokeStyle = isHovering ? "rgba(16, 185, 129, " + Math.min(0.85, hoverAlpha + 0.20) + ")" :
                    "rgba(52, 211, 153, " + Math.max(0.05, hoverAlpha) + ")";
                ctx.lineWidth = isHovering ? 1.8 + sbi * 1.2 : 1.0;
                ctx.setLineDash(isHovering ? [4, 3] : [2, 4]);

                ctx.beginPath();
                ctx.ellipse(0, 0, bodyLen * 0.85 + (isHovering ? 5 : 0), bodyHeight * 1.2 + (isHovering ? 4 : 0), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. 110th Channel Opercular Dual-Pump Respiration Aura (% OVR - Coral Rose #f43f5e)
            if (motionlessBreathing || ovr > 0.35) {
                const ovrAlpha = motionlessBreathing ? 0.25 + ovr * 0.25 : ovr * 0.16;
                const flapOffset = Math.sin(opercularPhase) * 3.5;

                ctx.save();
                ctx.strokeStyle = "rgba(244, 63, 94, " + Math.min(0.80, ovrAlpha + 0.15) + ")";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                // Arc showing branchial water outflow from opercular slot
                ctx.arc(-bodyLen * 0.15, -bodyHeight * 0.55 - flapOffset * 0.5, 6.0 + ovr * 5.0, 0, Math.PI * 1.3);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(-bodyLen * 0.15, bodyHeight * 0.55 + flapOffset * 0.5, 6.0 + ovr * 5.0, -Math.PI * 1.3, 0);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Lepidotrichia Pectoral Fins (Articulated Dermal Ray Fans)
            const fanSpread = 0.55 + (org.finRayFlexibility || 0.7) * 0.35;
            const rayLength = 12.0 + size * 0.8;
            const activeRays = Math.min(10, Math.max(5, Math.floor(rayCount * 0.5)));

            ctx.save();
            ctx.strokeStyle = "rgba(203, 213, 225, 0.75)";
            ctx.lineWidth = 0.9;

            for (let side = -1; side <= 1; side += 2) {
                const baseFinY = side * (bodyHeight * 0.45);
                const baseFinX = -bodyLen * 0.10;

                for (let r = 0; r < activeRays; r++) {
                    const rayFrac = r / (activeRays - 1);
                    const rayAngle = side * (0.45 + (rayFrac - 0.5) * fanSpread) + Math.sin(rayPhase + r * 0.4) * 0.18;
                    const rLen = rayLength * (0.75 + Math.sin(rayFrac * Math.PI) * 0.35);

                    const tipX = baseFinX - Math.cos(rayAngle) * rLen;
                    const tipY = baseFinY + Math.sin(rayAngle) * rLen;

                    // Joint segmentation: 2-segment articulated ray
                    const midX = (baseFinX + tipX) * 0.5 + Math.sin(rayPhase + r) * 1.2;
                    const midY = (baseFinY + tipY) * 0.5;

                    ctx.beginPath();
                    ctx.moveTo(baseFinX, baseFinY);
                    ctx.quadraticCurveTo(midX, midY, tipX, tipY);
                    ctx.stroke();

                    // Micro-node at joint
                    ctx.fillStyle = "rgba(16, 185, 129, 0.65)";
                    ctx.fillRect(midX - 0.6, midY - 0.6, 1.2, 1.2);
                }
            }
            ctx.restore();

            // 4. Fusiform Bony Fish Body Profile (Darkfield Translucent Membrane)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.55, 0); // Snout
            // Dorsal curvature
            ctx.bezierCurveTo(bodyLen * 0.25, -bodyHeight * 0.65, -bodyLen * 0.30, -bodyHeight * 0.60, -bodyLen * 0.55, -bodyHeight * 0.25);
            // Caudal peduncle top to bottom
            ctx.lineTo(-bodyLen * 0.55, bodyHeight * 0.25);
            // Ventral curvature
            ctx.bezierCurveTo(-bodyLen * 0.30, bodyHeight * 0.60, bodyLen * 0.25, bodyHeight * 0.65, bodyLen * 0.55, 0);
            ctx.closePath();

            const bodyGrad = ctx.createLinearGradient(bodyLen * 0.55, 0, -bodyLen * 0.55, 0);
            bodyGrad.addColorStop(0, "rgba(240, 253, 250, 0.28)");
            bodyGrad.addColorStop(0.35, "rgba(204, 251, 241, 0.20)");
            bodyGrad.addColorStop(0.75, "rgba(153, 246, 228, 0.16)");
            bodyGrad.addColorStop(1, "rgba(94, 234, 212, 0.12)");

            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = "rgba(153, 246, 228, 0.70)";
            ctx.lineWidth = 1.3;
            ctx.stroke();
            ctx.restore();

            // 5. Hydrostatic Swim Bladder (Internal Gas Chamber & Rete Mirabile Luminescence)
            // Positioned dorsally in coelomic cavity: length ~ bodyLen * 0.45, height ~ bodyHeight * 0.40 * bladderVol
            ctx.save();
            const bladderLen = bodyLen * 0.44;
            const bladderH = bodyHeight * 0.36 * Math.max(0.6, Math.min(1.3, bladderVol));
            const bladderX = -bodyLen * 0.08;
            const bladderY = -bodyHeight * 0.14;

            ctx.beginPath();
            ctx.ellipse(bladderX, bladderY, bladderLen * 0.5, bladderH * 0.5, 0, 0, Math.PI * 2);

            const bladderGrad = ctx.createRadialGradient(bladderX, bladderY, 1.0, bladderX, bladderY, bladderLen * 0.5);
            bladderGrad.addColorStop(0, "rgba(255, 255, 255, 0.90)");
            bladderGrad.addColorStop(0.35, "rgba(167, 243, 208, 0.75)");
            bladderGrad.addColorStop(0.75, "rgba(16, 185, 129, 0.55)");
            bladderGrad.addColorStop(1, "rgba(5, 150, 105, 0.15)");

            ctx.fillStyle = bladderGrad;
            ctx.fill();
            ctx.strokeStyle = isHovering ? "rgba(16, 185, 129, 0.95)" : "rgba(52, 211, 153, 0.70)";
            ctx.lineWidth = isHovering ? 1.6 : 1.0;
            ctx.stroke();

            // Rete mirabile capillary bundle (anterior micro-vessel bundle)
            ctx.strokeStyle = "rgba(239, 68, 68, 0.65)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(bladderX + bladderLen * 0.25, bladderY);
            ctx.lineTo(bladderX + bladderLen * 0.42, bladderY - 1.5);
            ctx.moveTo(bladderX + bladderLen * 0.25, bladderY + 1.2);
            ctx.lineTo(bladderX + bladderLen * 0.40, bladderY + 2.4);
            ctx.stroke();
            ctx.restore();

            // 6. Endochondral Ossified Vertebral Axis (Mineralized Spine & Ribs)
            ctx.save();
            ctx.strokeStyle = "rgba(248, 250, 252, " + Math.min(0.95, 0.45 + boneDensity * 0.45) + ")";
            ctx.lineWidth = 1.4;

            // Main spinal cord axis
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.35, 0);
            ctx.lineTo(-bodyLen * 0.52, 0);
            ctx.stroke();

            // Vertebral centra nodes & neural spines
            const vertebraCount = 8;
            for (let v = 0; v < vertebraCount; v++) {
                const vx = bodyLen * 0.30 - v * (bodyLen * 0.80 / (vertebraCount - 1));
                ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
                ctx.fillRect(vx - 0.8, -0.8, 1.6, 1.6);

                // Dorsal neural spine
                ctx.beginPath();
                ctx.moveTo(vx, -0.8);
                ctx.lineTo(vx - 1.5, -bodyHeight * 0.45);
                ctx.stroke();

                // Ventral pleural rib
                if (v >= 2 && v <= 5) {
                    ctx.beginPath();
                    ctx.moveTo(vx, 0.8);
                    ctx.lineTo(vx - 1.0, bodyHeight * 0.42);
                    ctx.stroke();
                }
            }
            ctx.restore();

            // 7. Bony Operculum Flap (Articulated Gill Cover & Branchial Chamber)
            ctx.save();
            const opercularFlapAngle = Math.sin(opercularPhase) * 0.22;
            const opercularBaseX = bodyLen * 0.12;
            const opercularBaseY = -bodyHeight * 0.48;
            const opercularH = bodyHeight * 0.96;

            ctx.translate(opercularBaseX, 0);
            ctx.rotate(opercularFlapAngle);

            ctx.beginPath();
            ctx.arc(0, 0, opercularH * 0.5, -Math.PI * 0.45, Math.PI * 0.45);
            ctx.strokeStyle = "rgba(244, 63, 94, " + (0.55 + ovr * 0.35) + ")";
            ctx.lineWidth = 1.6;
            ctx.stroke();

            // Bony operculum plate sheen
            ctx.fillStyle = "rgba(251, 113, 133, 0.18)";
            ctx.fill();
            ctx.restore();

            // 8. Homocercal Lepidotrichia Caudal Fin
            ctx.save();
            const caudalRays = 12;
            const tailBaseX = -bodyLen * 0.55;
            const finSpan = 22.0 + size * 1.2;

            ctx.strokeStyle = "rgba(167, 243, 208, 0.75)";
            ctx.lineWidth = 0.9;

            for (let c = 0; c < caudalRays; c++) {
                const cFrac = c / (caudalRays - 1);
                const cAngle = (cFrac - 0.5) * 0.85 + Math.sin(wavePhase + c * 0.25) * 0.15;
                const cLen = finSpan * (0.80 + Math.sin(cFrac * Math.PI) * 0.35);

                const endX = tailBaseX - Math.cos(cAngle) * cLen;
                const endY = Math.sin(cAngle) * cLen;

                ctx.beginPath();
                ctx.moveTo(tailBaseX, 0);
                ctx.lineTo(endX, endY);
                ctx.stroke();

                // Segment marks
                ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
                ctx.fillRect((tailBaseX + endX) * 0.5 - 0.5, endY * 0.5 - 0.5, 1.0, 1.0);
            }
            ctx.restore();

            // 9. Sensory Eye & Neurocranium
            ctx.save();
            const eyeX = bodyLen * 0.38;
            const eyeY = -bodyHeight * 0.22;

            ctx.beginPath();
            ctx.arc(eyeX, eyeY, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(eyeX + 0.3, eyeY, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = "#0f172a";
            ctx.fill();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render subtle hydrostatic buoyant micro-bubbles and hover stabilization halos.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawOsteichthyesGasTrails(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isOsteichthyes) continue;

                const isHovering = org.neutralBuoyancyHoverState;
                const sbi = (org.swimBladderIndex || 0.0) / 100.0;

                // Subtle gaseous hover halo on canvas
                if (isHovering && sbi > 0.35) {
                    const pulse = Math.sin(tick * 0.12 + (org.id || 0)) * 2.5;
                    ctx.save();
                    ctx.strokeStyle = "rgba(16, 185, 129, 0.18)";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, 24.0 + pulse, 0, Math.PI * 2);
                    ctx.stroke();

                    // Micro-bubble
                    if (tick % 45 === 0) {
                        ctx.fillStyle = "rgba(255, 255, 255, 0.40)";
                        ctx.beginPath();
                        ctx.arc(org.x + (Math.random() - 0.5) * 12.0, org.y - 14.0 - Math.random() * 6.0, 1.2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OsteichthyesOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.OsteichthyesOpticsRenderer = OsteichthyesOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
