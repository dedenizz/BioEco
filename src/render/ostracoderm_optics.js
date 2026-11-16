// BioEcosystem - Early Ostracoderm Mineralized Aspidin Bone Plates, Cephalic Shield & Pectoral Hydrofoil Optics
// Module: src/render/ostracoderm_optics.js
// Version: 8.18.0 (Hour 538 - Looks & UI Agent: 104th Channel % PEF, Dynamic AoA, Hydrofoil Vortices & Dual Ostracoderm Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * OstracodermOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Ostracoderms / armored agnathans (Pteraspidomorphi, Thelodonti & Osteostraci):
     * - Aspidin Cephalic Bone Shield: Rigid, suture-divided acellular bone carapace with metallic bronze and pearlescent luster
     * - Suture Lines & Trabecular Micro-Canals: Suture grooves separating rostral, dorsal, and branchial armor plates
     * - Cephalic Sensory Fields: Depressed dorsal and lateral sensory fields glowing with electro-receptive cyan auras
     * - Paired Pectoral Fin Flaps (Hydrofoils): Primitive paired hydrofoil appendages with dynamic Angle of Attack (AoA)
     * - Dynamic Bernouilli Leading-Edge Vortices: Streamlines and dynamic lift filaments rendered in bright aquamarine (#06b6d4)
     * - Benthic Ground Effect Lift Cushion: Ventral compression field glow when cruising near seafloor substrate
     * - Post-Cephalic Scaled Body: Flexible fusiform tail covered in chevron rows of microscopic tuberculated dermal denticles
     * - Ventral Jawless Mouth Slit: Ventral oral opening for benthic microphagous sediment filtration
     * - 103rd Channel (% OAI) Halo: Bronze-metallic (#d97706) defensive structural integrity aura
     * - 104th Channel (% PEF) Radiance: Aquamarine (#06b6d4) hydrodynamic lift and gliding aura
     */
    class OstracodermOpticsRenderer {
        /**
         * Render individual ostracoderm organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawOstracoderm(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isOstracoderm) return;

            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const shieldLen = 22.0 + size * 1.6; // 24 - 38 px
            const shieldWidth = 14.0 + size * 1.1; // 16 - 25 px
            const tailLen = 28.0 + size * 2.2; // 32 - 48 px
            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const wavePhase = ((tick * 0.16 * Math.max(1.0, speed)) + (org.id ? (org.id * 0.57) : 0.0)) % (Math.PI * 2);

            const shieldIntegrity = org.cephalicShieldIntegrity || 0.88;
            const crushCoeff = org.crushResistanceCoeff || 0.68;
            const oai = (org.ostracodermArmorIntegrity || 0.0) / 100.0;
            const pef = (org.pectoralElevationForceIndex || 0.0) / 100.0;
            const pectoralLift = org.pectoralFinElevation || 1.5;
            const attackAngle = org.pectoralAttackAngle !== undefined ? org.pectoralAttackAngle : 0.12;
            const groundEffect = org.benthicGroundEffectMultiplier || 1.0;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 103rd Channel Armor Integrity Halo (% OAI - Bronze Metallic #d97706)
            if (oai > 0.25) {
                const haloAlpha = 0.08 + oai * 0.16 + Math.sin(tick * 0.09) * 0.04;
                ctx.save();
                ctx.strokeStyle = "rgba(217, 119, 6, " + Math.max(0.02, haloAlpha) + ")";
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.ellipse(shieldLen * 0.15, 0, shieldLen * 0.72, shieldWidth * (1.25 + oai * 0.45), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. 104th Channel Hydrofoil Lift Radiance (% PEF - Aquamarine #06b6d4)
            if (pef > 0.20) {
                const pefAlpha = 0.06 + pef * 0.18 + Math.cos(tick * 0.11) * 0.05;
                ctx.save();
                ctx.strokeStyle = "rgba(6, 182, 212, " + Math.max(0.02, pefAlpha) + ")";
                ctx.lineWidth = 1.2 + pef * 1.0;
                ctx.beginPath();
                ctx.ellipse(-shieldLen * 0.25, 0, shieldLen * 0.50, shieldWidth * (0.95 + pef * 0.55), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Benthic Ground Effect Ventral Compression Cushion
            if (groundEffect > 1.05) {
                const groundAlpha = Math.min(0.35, (groundEffect - 1.0) * 0.75);
                ctx.save();
                ctx.strokeStyle = "rgba(34, 211, 238, " + groundAlpha + ")";
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.arc(0, shieldWidth * 0.45, shieldLen * 0.48, Math.PI * 0.15, Math.PI * 0.85);
                ctx.stroke();
                ctx.restore();
            }

            // 4. Flexible Fusiform Post-Shield Tail & Dermal Denticles (drawn behind shield)
            OstracodermOpticsRenderer.drawFusiformPostShieldTail(ctx, org, tick, shieldLen, tailLen, shieldWidth, wavePhase);

            // 5. Paired Pectoral Fin Flaps (Primitive Paired Hydrofoils with Dynamic AoA)
            OstracodermOpticsRenderer.drawPectoralFinFlaps(ctx, org, tick, shieldLen, shieldWidth, pectoralLift, speed, attackAngle, pef);

            // 6. Mineralized Aspidin Cephalic Bone Shield & Sensory Fields
            OstracodermOpticsRenderer.drawCephalicShield(ctx, org, tick, shieldLen, shieldWidth, shieldIntegrity, crushCoeff);

            ctx.restore();
        }

        /**
         * Render mineralized aspidin cephalic bone shield, sutures, trabeculae, and sensory fields.
         */
        static drawCephalicShield(ctx, org, tick, shieldLen, shieldWidth, shieldIntegrity, crushCoeff) {
            ctx.save();

            // Symmetrical parabolic / horseshoe carapace shield
            const halfW = shieldWidth * 0.55;
            const frontX = shieldLen * 0.55;
            const backX = -shieldLen * 0.45;

            // 1. Cephalic Shield Carapace Outline
            ctx.beginPath();
            ctx.moveTo(frontX, 0); // Snout tip
            // Upper curved shield margin to postero-lateral cornual angle
            ctx.bezierCurveTo(frontX * 0.65, -halfW * 0.75, 0, -halfW, backX, -halfW * 0.95);
            // Posterior dorsal shield margin
            ctx.lineTo(backX + shieldLen * 0.12, 0);
            // Lower postero-lateral margin
            ctx.lineTo(backX, halfW * 0.95);
            ctx.bezierCurveTo(0, halfW, frontX * 0.65, halfW * 0.75, frontX, 0);
            ctx.closePath();

            // Gradient: Aspidin acellular bone with metallic bronze / dark ochre mineralization
            const shieldGrad = ctx.createLinearGradient(frontX, 0, backX, 0);
            shieldGrad.addColorStop(0.0, "rgba(245, 158, 11, " + (0.85 + shieldIntegrity * 0.12) + ")"); // Amber-gold rostral plate
            shieldGrad.addColorStop(0.4, "rgba(217, 119, 6, 0.92)");  // Metallic bronze mid-carapace
            shieldGrad.addColorStop(0.8, "rgba(146, 64, 14, 0.90)");  // Deep ochre branchial plate
            shieldGrad.addColorStop(1.0, "rgba(120, 53, 15, 0.88)");  // Posterior cornual spine
            ctx.fillStyle = shieldGrad;
            ctx.fill();

            // Heavy mineralized rim (Crush resistance outer ring)
            ctx.strokeStyle = "rgba(254, 240, 138, " + (0.60 + crushCoeff * 0.35) + ")";
            ctx.lineWidth = 1.4 + crushCoeff * 0.8;
            ctx.stroke();

            // 2. Acellular Bone Plate Suture Lines (grooves separating cranial plates)
            ctx.save();
            ctx.strokeStyle = "rgba(120, 53, 15, 0.75)";
            ctx.lineWidth = 0.9;

            // Median dorsal plate suture
            ctx.beginPath();
            ctx.moveTo(frontX * 0.35, 0);
            ctx.lineTo(backX + shieldLen * 0.12, 0);
            ctx.stroke();

            // Bilateral branchial suture arcs
            ctx.beginPath();
            ctx.moveTo(frontX * 0.15, -halfW * 0.25);
            ctx.quadraticCurveTo(0, -halfW * 0.65, backX * 0.6, -halfW * 0.85);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(frontX * 0.15, halfW * 0.25);
            ctx.quadraticCurveTo(0, halfW * 0.65, backX * 0.6, halfW * 0.85);
            ctx.stroke();
            ctx.restore();

            // 3. Trabecular Micro-Canals (bone vascularization pores)
            ctx.save();
            ctx.fillStyle = "rgba(254, 243, 199, 0.55)";
            for (let i = 0; i < 8; i++) {
                const u = 0.2 + (i / 8) * 0.6;
                const px = frontX - u * shieldLen;
                const py = Math.sin(i * 1.7) * (halfW * 0.55);
                ctx.beginPath();
                ctx.arc(px, py, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // 4. Cephalic Sensory Fields (Depressed Lateral & Dorsal Electro-sensory Fields)
            const sensoryAcuity = org.sensoryFieldAcuity || 0.82;
            const sensoryPulse = Math.sin(tick * 0.12) * 0.18 + 0.65;
            ctx.save();
            ctx.fillStyle = "rgba(6, 182, 212, " + (sensoryPulse * sensoryAcuity) + ")";
            ctx.strokeStyle = "rgba(34, 211, 238, 0.85)";
            ctx.lineWidth = 0.8;

            // Dorsal sensory field (behind pineal region)
            ctx.beginPath();
            ctx.ellipse(-shieldLen * 0.08, 0, shieldLen * 0.12, halfW * 0.22, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Lateral sensory field pairs (above branchial plates)
            ctx.beginPath();
            ctx.ellipse(-shieldLen * 0.05, -halfW * 0.62, shieldLen * 0.18, halfW * 0.16, -Math.PI * 0.12, 0, Math.PI * 2);
            ctx.ellipse(-shieldLen * 0.05, halfW * 0.62, shieldLen * 0.18, halfW * 0.16, Math.PI * 0.12, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // 5. Ventral Jawless Mouth Slit & Pineal Foramen
            // Pineal organ aperture (small central dorsal dot)
            ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
            ctx.beginPath();
            ctx.arc(frontX * 0.22, 0, 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Ventral scooping mouth contour preview at anterior rim
            ctx.strokeStyle = "rgba(71, 85, 105, 0.70)";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.arc(frontX - 2.5, 0, halfW * 0.32, -Math.PI * 0.45, Math.PI * 0.45);
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render Paired Pectoral Fin Flaps (Primitive Paired Hydrofoils with Dynamic AoA & Vortices).
         */
        static drawPectoralFinFlaps(ctx, org, tick, shieldLen, shieldWidth, pectoralLift, speed, attackAngle, pef) {
            ctx.save();
            const finX = -shieldLen * 0.40;
            const halfW = shieldWidth * 0.55;
            const finLen = shieldLen * 0.48;
            const finWidth = halfW * 0.75;

            // Dynamic AoA modulation: attackAngle tilts the fin chord line
            const aoaTilt = attackAngle * 0.85;
            const liftWobble = Math.sin(tick * 0.15) * 0.06;
            const liftColor = pef > 0.40 ? "rgba(6, 182, 212, 0.85)" : "rgba(56, 189, 248, 0.70)";

            // Upper (Dorsolateral) Pectoral Fin Flap
            ctx.save();
            ctx.translate(finX, -halfW * 0.88);
            ctx.rotate(-Math.PI * 0.35 + aoaTilt + liftWobble);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(finLen * 0.5, -finWidth * 0.6, finLen, -finWidth * 0.2);
            ctx.quadraticCurveTo(finLen * 0.65, finWidth * 0.3, 0, 0);
            ctx.closePath();

            const finGrad1 = ctx.createLinearGradient(0, 0, finLen, 0);
            finGrad1.addColorStop(0.0, "rgba(217, 119, 6, 0.85)"); // Stiff aspidin fin base
            finGrad1.addColorStop(0.5, "rgba(245, 158, 11, 0.65)");
            finGrad1.addColorStop(1.0, pef > 0.40 ? "rgba(6, 182, 212, 0.55)" : "rgba(56, 189, 248, 0.40)"); // Hydrofoil tip
            ctx.fillStyle = finGrad1;
            ctx.fill();
            ctx.strokeStyle = liftColor;
            ctx.lineWidth = 1.0 + pef * 0.6;
            ctx.stroke();

            // Leading-edge vortex filament
            if (speed > 0.75) {
                ctx.strokeStyle = "rgba(165, 243, 252, " + Math.min(0.6, 0.2 + pef * 0.4) + ")";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(finLen * 0.3, -finWidth * 0.4);
                ctx.lineTo(finLen * 1.1, -finWidth * 0.25);
                ctx.stroke();
            }
            ctx.restore();

            // Lower (Ventrolateral) Pectoral Fin Flap
            ctx.save();
            ctx.translate(finX, halfW * 0.88);
            ctx.rotate(Math.PI * 0.35 - aoaTilt - liftWobble);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(finLen * 0.5, finWidth * 0.6, finLen, finWidth * 0.2);
            ctx.quadraticCurveTo(finLen * 0.65, -finWidth * 0.3, 0, 0);
            ctx.closePath();

            const finGrad2 = ctx.createLinearGradient(0, 0, finLen, 0);
            finGrad2.addColorStop(0.0, "rgba(217, 119, 6, 0.85)");
            finGrad2.addColorStop(0.5, "rgba(245, 158, 11, 0.65)");
            finGrad2.addColorStop(1.0, pef > 0.40 ? "rgba(6, 182, 212, 0.55)" : "rgba(56, 189, 248, 0.40)");
            ctx.fillStyle = finGrad2;
            ctx.fill();
            ctx.strokeStyle = liftColor;
            ctx.lineWidth = 1.0 + pef * 0.6;
            ctx.stroke();

            // Leading-edge vortex filament
            if (speed > 0.75) {
                ctx.strokeStyle = "rgba(165, 243, 252, " + Math.min(0.6, 0.2 + pef * 0.4) + ")";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(finLen * 0.3, finWidth * 0.4);
                ctx.lineTo(finLen * 1.1, finWidth * 0.25);
                ctx.stroke();
            }
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render flexible post-shield fusiform tail covered in microscopic dermal denticles.
         */
        static drawFusiformPostShieldTail(ctx, org, tick, shieldLen, tailLen, shieldWidth, wavePhase) {
            ctx.save();
            const startX = -shieldLen * 0.35;
            const numSegments = 10;
            const spinePoints = [];
            const baseR = shieldWidth * 0.42;

            for (let i = 0; i <= numSegments; i++) {
                const u = i / numSegments;
                const sx = startX - u * tailLen;
                const amp = u * (baseR * 0.85);
                const sy = Math.sin(wavePhase - u * Math.PI * 2.0) * amp;
                const r = Math.max(1.5, baseR * (1.0 - u * 0.82));
                spinePoints.push({ x: sx, y: sy, r: r, u: u });
            }

            // 1. Post-shield muscular tail body
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                if (i === 0) ctx.moveTo(pt.x, pt.y - pt.r);
                else ctx.lineTo(pt.x, pt.y - pt.r);
            }
            const tailTip = spinePoints[spinePoints.length - 1];
            // Caudal fin (hypocercal / hypocercal ventral lobe)
            ctx.lineTo(tailTip.x - 8.0, tailTip.y + 7.0);
            ctx.lineTo(tailTip.x - 4.0, tailTip.y);
            ctx.lineTo(tailTip.x - 9.0, tailTip.y - 4.0);

            for (let i = spinePoints.length - 1; i >= 0; i--) {
                const pt = spinePoints[i];
                ctx.lineTo(pt.x, pt.y + pt.r);
            }
            ctx.closePath();

            const tailGrad = ctx.createLinearGradient(startX, 0, startX - tailLen, 0);
            tailGrad.addColorStop(0.0, "rgba(146, 64, 14, 0.88)");
            tailGrad.addColorStop(0.5, "rgba(180, 83, 9, 0.82)");
            tailGrad.addColorStop(1.0, "rgba(100, 116, 139, 0.78)");
            ctx.fillStyle = tailGrad;
            ctx.fill();
            ctx.strokeStyle = "rgba(217, 119, 6, 0.50)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 2. Microscopic Dermal Denticles (chevron scale rows)
            const denticleDensity = org.dermalDenticleDensity || 0.72;
            if (denticleDensity > 0.45) {
                ctx.save();
                ctx.fillStyle = "rgba(254, 240, 138, 0.70)";
                for (let i = 1; i < spinePoints.length - 1; i += 2) {
                    const pt = spinePoints[i];
                    for (let d = -1; d <= 1; d += 2) {
                        const dx = pt.x;
                        const dy = pt.y + d * (pt.r * 0.45);
                        ctx.beginPath();
                        ctx.arc(dx, dy, 0.7, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Render global hadal/benthic ostracoderm detrital feeding stratum and mineral sediment.
         */
        static drawGlobalOstracodermBenthos(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const benthosY = height * 0.74;
            const benthosH = height - benthosY;

            ctx.save();
            // Dense mineralized sediment haze
            const benthosGrad = ctx.createLinearGradient(0, benthosY, 0, height);
            benthosGrad.addColorStop(0.0, "rgba(120, 53, 15, 0.0)");
            benthosGrad.addColorStop(0.4, "rgba(180, 83, 9, 0.08)");
            benthosGrad.addColorStop(1.0, "rgba(120, 53, 15, 0.22)");
            ctx.fillStyle = benthosGrad;
            ctx.fillRect(0, benthosY, width, benthosH);

            // Benthic mud scooping ripples
            const activeOstracoderms = manager.metrics.totalOstracodermOrganisms || 0;
            if (activeOstracoderms > 0) {
                const mudAlpha = 0.035 + Math.sin(tick * 0.05) * 0.015;
                ctx.fillStyle = "rgba(217, 119, 6, " + mudAlpha + ")";
                for (let x = 40; x < width; x += 150) {
                    const my = benthosY + 16.0 + Math.sin(tick * 0.04 + x * 0.015) * 12.0;
                    ctx.beginPath();
                    ctx.ellipse(x, my, 45.0, 14.0, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        /**
         * Render dynamic hydrofoil downwash lift vortices and negative buoyancy sediment wakes.
         */
        static drawOstracodermHydrofoilTrails(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isOstracoderm) continue;

                const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
                if (speed > 0.6) {
                    const heading = Math.atan2(org.vy || 0, org.vx || 1);
                    const tailX = org.x - Math.cos(heading) * 25.0;
                    const tailY = org.y - Math.sin(heading) * 25.0;

                    // Paired hydrofoil downwash streamers (Aquamarine Bernouilli lift wake)
                    const pef = (org.pectoralElevationForceIndex || 0) / 100.0;
                    ctx.strokeStyle = pef > 0.4 ? "rgba(6, 182, 212, 0.35)" : "rgba(56, 189, 248, 0.22)";
                    ctx.lineWidth = 1.2 + pef * 0.8;
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY - 6.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 18.0, tailY - 6.0 - Math.sin(heading) * 18.0);
                    ctx.moveTo(tailX, tailY + 6.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 18.0, tailY + 6.0 - Math.sin(heading) * 18.0);
                    ctx.stroke();

                    // Benthic ground contact mud dust puff if near bottom
                    if (org.y >= 350.0 && Math.random() < 0.15) {
                        ctx.fillStyle = "rgba(217, 119, 6, 0.18)";
                        ctx.beginPath();
                        ctx.arc(tailX, tailY + 4.0, 3.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = OstracodermOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.OstracodermOpticsRenderer = OstracodermOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
