// BioEcosystem - Early Craniata Anguilliform Morphology, Chondrocranium, Oral Suction Disc & Tidal Respiration Optics
// Module: src/render/craniata_optics.js
// Version: 8.08.0 (Hour 528 - Looks & UI Agent: 102nd Channel % OTI, Oral Suction Disc, Keratin Teeth & Tidal Gill Pouches)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CraniataOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Craniata / Agnatha (hagfish / Myxini & lampreys / Petromyzontida):
     * - Anguilliform Jawless Body: Scaleless, mucus-coated cylindrical eel-like body with continuous median fin fold
     * - Chondrocranium Cartilage Luminescence: Ethereal cyan/aquamarine chondrocyte matrix protecting the brain
     * - Tripartite Brain Cephalization: Three distinct cranial lobes (telencephalon, mesencephalon, rhombencephalon)
     * - Anterior Sensory Barbels: Chemosensory pre-nasal and oral tentacles for necrophagic benthic tracking in hagfish
     * - Petromyzontida Oral Sucking Disc: Circular buccal funnel with concentric rows of amber keratin teeth and rasping tongue
     * - 7 Pairs of Tidal Gill Pouches: Muscular lateral branchial pores pulsing with bidirectional water ventilation
     * - Host Attachment & Hematophagic Streamers: Vacuum latching tether and crimson nutrient fluid extraction streams
     * - Ventrolateral Slime Gland Pores: Paired micro-pores along the ventral flank containing coiled protein thread cells
     * - Explosive Mucus Hydrogel Cloud: Expanding opalescent microfibrous matrix (300-800x volume) suffocating predator gills
     * - Overhand Figure-8 Body Knotting: Mechanical leverage knot sliding dynamically along the body axis
     * - 101st Telemetry Channel (% SCI) Radiance: Neon olive-lime (#84cc16) defense readiness aura
     * - 102nd Telemetry Channel (% OTI) Radiance: Ruby crimson (#e11d48) oral suction traction streamers
     */
    class CraniataOpticsRenderer {
        /**
         * Render individual craniate organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawCraniata(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isCraniata) return;

            const size = org.dna ? (org.dna.size || 7.5) : 7.5;
            const bodyLen = 44.0 + size * 2.8; // 48 - 72 px
            const bodyRadius = 5.2 + size * 0.35; // 5.5 - 8.5 px
            const speed = org.eelLikeUndulationVelocity || 2.10;
            const wavePhase = ((tick * 0.14 * (speed / 2.0)) + (org.id ? (org.id * 0.73) : 0.0)) % (Math.PI * 2);

            const isKnotting = org.bodyKnottingActive || false;
            const isSlimeActive = org.isSlimeCloudActive || false;
            const isLamprey = org.hasPetromyzontidaTrait || false;
            const sci = (org.slimeDefenseCapacity || 0.0) / 100.0;
            const oti = (org.oralSuctionTractionIndex || 0.0) / 100.0;

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. Telemetry Channel Radiance Halos
            // A. Slime defense readiness aura (% SCI - Neon Olive #84cc16)
            if (!isLamprey && sci > 0.30) {
                const haloRadius = bodyRadius * (1.6 + sci * 0.8);
                const haloAlpha = 0.08 + sci * 0.14 + Math.sin(tick * 0.08) * 0.04;
                ctx.save();
                ctx.fillStyle = "rgba(132, 204, 22, " + Math.max(0.02, haloAlpha) + ")";
                ctx.beginPath();
                ctx.ellipse(0, 0, bodyLen * 0.55, haloRadius, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // B. 102nd Channel Oral Suction Traction Aura (% OTI - Ruby Crimson #e11d48)
            if (isLamprey && oti > 0.25) {
                const otiAlpha = 0.09 + oti * 0.18 + Math.sin(tick * 0.12) * 0.05;
                ctx.save();
                ctx.strokeStyle = "rgba(225, 29, 72, " + Math.max(0.03, otiAlpha) + ")";
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.ellipse(bodyLen * 0.25, 0, bodyLen * 0.35, bodyRadius * (1.5 + oti * 0.7), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. Anguilliform Sinusoidal Body or Figure-8 Knot
            if (isKnotting) {
                CraniataOpticsRenderer.drawBodyKnot(ctx, org, tick, bodyLen, bodyRadius);
            } else {
                CraniataOpticsRenderer.drawAnguilliformBody(ctx, org, tick, bodyLen, bodyRadius, wavePhase, isLamprey);
            }

            // 3. Chondrocranium Cartilage Skull & Tripartite Brain
            const headX = bodyLen * 0.42;
            const headY = Math.sin(wavePhase) * (bodyRadius * 0.4);
            CraniataOpticsRenderer.drawChondrocraniumAndBrain(ctx, org, tick, headX, headY, bodyRadius);

            // 4. Anterior Structures: Either Petromyzontida Oral Sucking Disc or Myxini Barbels
            if (isLamprey) {
                CraniataOpticsRenderer.drawOralSuckingDisc(ctx, org, tick, headX, headY, bodyRadius);
                CraniataOpticsRenderer.drawTidalGillPouches(ctx, org, tick, headX, headY, bodyRadius, bodyLen, wavePhase);
            } else {
                // Hagfish slime pores
                if (!isKnotting) {
                    CraniataOpticsRenderer.drawSlimeGlandPores(ctx, org, tick, bodyLen, bodyRadius, wavePhase);
                }
            }

            ctx.restore();

            // 5. Global Space Overlays: Slime Cloud or Parasitic Feeding Stream
            if (isSlimeActive) {
                CraniataOpticsRenderer.drawSlimeCloud(ctx, org, tick);
            }
            if (isLamprey && org.isParasiticAttached) {
                CraniataOpticsRenderer.drawParasiticFeedingStream(ctx, org, tick);
            }
        }

        /**
         * Render anguilliform body segments with continuous median fin fold and mucous shine.
         */
        static drawAnguilliformBody(ctx, org, tick, bodyLen, bodyRadius, wavePhase, isLamprey) {
            const numSegments = 16;
            const spinePoints = [];

            for (let i = 0; i <= numSegments; i++) {
                const u = i / numSegments; // 0: head, 1: tail
                const segX = (0.5 - u) * bodyLen;
                const amp = (0.15 + u * 0.85) * (bodyRadius * 0.95);
                const segY = Math.sin(wavePhase - u * Math.PI * 2.2) * amp;
                const taper = Math.sin(Math.pow(1.0 - u, 0.65) * Math.PI * 0.75) * (1.0 - u * 0.45);
                const r = Math.max(1.8, bodyRadius * Math.max(0.25, taper));

                spinePoints.push({ x: segX, y: segY, r: r, u: u });
            }

            // 1. Continuous Median Fin Fold (dorsal & ventral transparent membrane)
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                const finH = pt.u > 0.25 ? pt.r * (1.35 + pt.u * 0.6) : pt.r * 1.05;
                const px = pt.x;
                const py = pt.y - finH;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            const tailPt = spinePoints[spinePoints.length - 1];
            ctx.lineTo(tailPt.x - 6.0, tailPt.y);
            for (let i = spinePoints.length - 1; i >= 0; i--) {
                const pt = spinePoints[i];
                const finH = pt.u > 0.40 ? pt.r * (1.25 + pt.u * 0.5) : pt.r * 1.0;
                const px = pt.x;
                const py = pt.y + finH;
                ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = isLamprey ? "rgba(225, 29, 72, 0.14)" : "rgba(148, 163, 184, 0.16)";
            ctx.fill();
            ctx.strokeStyle = isLamprey ? "rgba(251, 113, 133, 0.35)" : "rgba(203, 213, 225, 0.32)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();

            // 2. Scaleless Muscular Flesh (pinkish slate-mauve or predatory amber-olive hue)
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                if (i === 0) ctx.moveTo(pt.x, pt.y - pt.r);
                else ctx.lineTo(pt.x, pt.y - pt.r);
            }
            ctx.lineTo(tailPt.x, tailPt.y);
            for (let i = spinePoints.length - 1; i >= 0; i--) {
                const pt = spinePoints[i];
                ctx.lineTo(pt.x, pt.y + pt.r);
            }
            ctx.closePath();

            const bodyGrad = ctx.createLinearGradient(bodyLen * 0.5, 0, -bodyLen * 0.5, 0);
            if (isLamprey) {
                // Petromyzontida: amber-olive dorsal, pale silvery ventral, crimson suction rostrum
                bodyGrad.addColorStop(0.0, "rgba(225, 29, 72, 0.85)");  // Ruby suction rostrum
                bodyGrad.addColorStop(0.35, "rgba(101, 163, 13, 0.88)"); // Olive dorsal trunk
                bodyGrad.addColorStop(0.85, "rgba(71, 85, 105, 0.85)");  // Slate-blue tail
                bodyGrad.addColorStop(1.0, "rgba(51, 65, 85, 0.80)");
            } else {
                // Myxini: pinkish vascularized head, slate-grey midbody, deep mauve trunk
                bodyGrad.addColorStop(0.0, "rgba(225, 112, 128, 0.82)");
                bodyGrad.addColorStop(0.35, "rgba(148, 163, 184, 0.88)");
                bodyGrad.addColorStop(0.85, "rgba(100, 116, 139, 0.85)");
                bodyGrad.addColorStop(1.0, "rgba(71, 85, 105, 0.80)");
            }
            ctx.fillStyle = bodyGrad;
            ctx.fill();

            ctx.strokeStyle = isLamprey ? "rgba(244, 63, 94, 0.55)" : "rgba(244, 114, 182, 0.45)";
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.restore();

            // 3. Axial Mucous Glisten Line
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                const sheenY = pt.y - pt.r * 0.35;
                if (i === 0) ctx.moveTo(pt.x, sheenY);
                else ctx.lineTo(pt.x, sheenY);
            }
            ctx.strokeStyle = "rgba(255, 255, 255, 0.38)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();

            // 4. Anterior Sensory Barbels (Hagfish only)
            if (!isLamprey) {
                const headPt = spinePoints[0];
                ctx.save();
                ctx.strokeStyle = "rgba(251, 113, 133, 0.75)";
                ctx.lineWidth = 1.1;
                const barbelLen = bodyRadius * 1.4;
                const barbelWave = Math.sin(tick * 0.15) * 2.0;

                ctx.beginPath();
                ctx.moveTo(headPt.x, headPt.y - 2.0);
                ctx.quadraticCurveTo(headPt.x + barbelLen * 0.6, headPt.y - 4.5 + barbelWave, headPt.x + barbelLen, headPt.y - 3.5);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(headPt.x, headPt.y + 2.0);
                ctx.quadraticCurveTo(headPt.x + barbelLen * 0.6, headPt.y + 4.5 - barbelWave, headPt.x + barbelLen, headPt.y + 3.5);
                ctx.stroke();
                ctx.restore();
            }
        }

        /**
         * Render Petromyzontida Dairesel Vantuz Ağız Hunisi (Buccal Funnel) and Keratin Teeth Rings.
         */
        static drawOralSuckingDisc(ctx, org, tick, headX, headY, bodyRadius) {
            const discRadius = org.buccalFunnelRadius || 9.5;
            const sharpness = org.keratinTeethSharpness || 0.85;
            const rows = org.keratinTeethRows || 4;
            const isAttached = org.isParasiticAttached || false;

            ctx.save();
            ctx.translate(headX + discRadius * 0.45, headY);

            // 1. Fleshy Circular Sucking Disc Lip (Negative Hydrostatic Seal)
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, discRadius, 0, Math.PI * 2);
            ctx.fillStyle = isAttached ? "rgba(225, 29, 72, 0.90)" : "rgba(190, 18, 60, 0.80)";
            ctx.fill();
            ctx.strokeStyle = isAttached ? "rgba(254, 205, 211, 0.95)" : "rgba(251, 113, 133, 0.70)";
            ctx.lineWidth = isAttached ? 2.0 : 1.3;
            ctx.stroke();

            // Fringe Papillae (Micro-cirri bordering the suction lip)
            const papillaeCount = 12;
            ctx.fillStyle = "rgba(255, 228, 230, 0.85)";
            for (let p = 0; p < papillaeCount; p++) {
                const ang = (p / papillaeCount) * Math.PI * 2;
                const px = Math.cos(ang) * (discRadius + 0.9);
                const py = Math.sin(ang) * (discRadius + 0.9);
                ctx.beginPath();
                ctx.arc(px, py, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // 2. Concentric Rings of Horn-like Keratin Teeth
            ctx.save();
            ctx.fillStyle = "rgba(254, 240, 138, 0.95)"; // Amber-yellow keratin tooth hue
            for (let r = 1; r <= rows; r++) {
                const ringR = (r / (rows + 1)) * discRadius;
                const toothCount = 4 + r * 3;
                const toothSize = 0.8 + sharpness * 0.7;

                for (let t = 0; t < toothCount; t++) {
                    const ang = (t / toothCount) * Math.PI * 2 + (r * 0.35);
                    const tx = Math.cos(ang) * ringR;
                    const ty = Math.sin(ang) * ringR;

                    // Triangular horn tooth pointing inward toward pharynx
                    ctx.beginPath();
                    ctx.arc(tx, ty, toothSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();

            // 3. Central Piston Tongue (Lingual Rasps) vibrating back-and-forth
            const raspVibe = Math.sin(tick * 0.35) * (discRadius * 0.18);
            ctx.save();
            ctx.fillStyle = "rgba(244, 63, 94, 0.95)";
            ctx.beginPath();
            ctx.arc(raspVibe, 0, discRadius * 0.28, 0, Math.PI * 2);
            ctx.fill();

            // Central pharyngeal mouth aperture
            ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            ctx.beginPath();
            ctx.arc(0, 0, discRadius * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render 7 Pairs of Tidal Gill Pouches (muscular branchial pores pulsing with tidal water).
         */
        static drawTidalGillPouches(ctx, org, tick, headX, headY, bodyRadius, bodyLen, wavePhase) {
            const pouches = org.tidalGillPouches || 7;
            const freq = org.tidalVentilationFrequency || 1.4;
            const isAttached = org.isParasiticAttached || false;
            const pulse = (Math.sin(tick * 0.18 * freq) + 1.0) * 0.5; // [0, 1] respiration cycle

            ctx.save();
            for (let p = 0; p < pouches; p++) {
                const u = 0.14 + (p / pouches) * 0.24; // Located along anterior flank
                const gx = (0.5 - u) * bodyLen;
                const amp = (0.15 + u * 0.85) * (bodyRadius * 0.95);
                const gy = Math.sin(wavePhase - u * Math.PI * 2.2) * amp;
                const r = bodyRadius * 0.88;

                // Dorsolateral and ventrolateral branchial pore pairs
                const poreRadius = 1.1 + pulse * 0.6;

                // Upper gill pore
                ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
                ctx.beginPath();
                ctx.arc(gx, gy - r * 0.45, poreRadius, 0, Math.PI * 2);
                ctx.fill();

                // Lower gill pore
                ctx.beginPath();
                ctx.arc(gx, gy + r * 0.45, poreRadius, 0, Math.PI * 2);
                ctx.fill();

                // Exhalant water pulsation aura (tidal respiratory plume)
                if (pulse > 0.45) {
                    const jetAlpha = (pulse - 0.45) * (isAttached ? 0.65 : 0.35);
                    ctx.strokeStyle = "rgba(56, 189, 248, " + jetAlpha + ")";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.arc(gx, gy - r * 0.45, poreRadius + 1.8, 0, Math.PI * 2);
                    ctx.arc(gx, gy + r * 0.45, poreRadius + 1.8, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }

        /**
         * Render hematophagic crimson capillary feeding stream when parasitic attachment is active.
         */
        static drawParasiticFeedingStream(ctx, org, tick) {
            ctx.save();
            ctx.translate(org.x, org.y);

            // Pulsing crimson blood extraction stream entering mouth
            const streamPulse = Math.sin(tick * 0.25) * 3.0;
            const streamAlpha = 0.65 + Math.sin(tick * 0.15) * 0.25;

            ctx.strokeStyle = "rgba(225, 29, 72, " + streamAlpha + ")";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(0, 0, 16.0 + streamPulse, 0, Math.PI * 2);
            ctx.stroke();

            // Radiating red nutrient filaments
            ctx.strokeStyle = "rgba(244, 63, 94, " + (streamAlpha * 0.75) + ")";
            ctx.lineWidth = 1.0;
            for (let f = 0; f < 6; f++) {
                const ang = (f / 6) * Math.PI * 2 + tick * 0.08;
                const fx = Math.cos(ang) * (20.0 + streamPulse);
                const fy = Math.sin(ang) * (20.0 + streamPulse);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(fx, fy);
                ctx.stroke();
            }
            ctx.restore();
        }

        /**
         * Render Chondrocranium (cartilaginous skull case) and Tripartite Brain lobes.
         */
        static drawChondrocraniumAndBrain(ctx, org, tick, headX, headY, bodyRadius) {
            const integrity = org.chondrocraniumIntegrity || 0.85;
            const armor = org.cranialArmorDefense || 0.55;
            const skullW = bodyRadius * 1.8;
            const skullH = bodyRadius * 1.1;

            ctx.save();
            ctx.translate(headX - skullW * 0.4, headY);

            // 1. Chondrocranium Cartilaginous Braincase (unmineralized chondrocyte matrix)
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(0, 0, skullW * 0.52, skullH * 0.50, 0, 0, Math.PI * 2);
            const skullAlpha = 0.25 + integrity * 0.35;
            ctx.fillStyle = "rgba(34, 211, 238, " + skullAlpha + ")";
            ctx.fill();
            ctx.strokeStyle = "rgba(6, 182, 212, " + (0.50 + armor * 0.45) + ")";
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Chondrocyte lacunae micro-dots
            ctx.fillStyle = "rgba(165, 243, 252, 0.70)";
            for (let i = 0; i < 6; i++) {
                const ang = (i / 6) * Math.PI * 2 + tick * 0.02;
                const lx = Math.cos(ang) * (skullW * 0.32);
                const ly = Math.sin(ang) * (skullH * 0.30);
                ctx.beginPath();
                ctx.arc(lx, ly, 0.9, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // 2. Tripartite Brain Lobes (Telencephalon, Mesencephalon, Rhombencephalon)
            // Lobe A: Telencephalon (Anterior Olfactory Bulbs) - Neon Olive #84cc16
            const telSize = (org.telencephalonSize || 1.0) * (bodyRadius * 0.28);
            ctx.save();
            ctx.fillStyle = "rgba(132, 204, 22, 0.85)";
            ctx.beginPath();
            ctx.arc(skullW * 0.26, -1.2, telSize, 0, Math.PI * 2);
            ctx.arc(skullW * 0.26, 1.2, telSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Lobe B: Mesencephalon (Midbrain Sensory Integration) - Sky Blue #38bdf8
            const mesSize = (org.mesencephalonSize || 0.8) * (bodyRadius * 0.25);
            ctx.save();
            ctx.fillStyle = "rgba(56, 189, 248, 0.80)";
            ctx.beginPath();
            ctx.arc(0.0, 0.0, mesSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Lobe C: Rhombencephalon (Hindbrain Medulla Oblongata) - Royal Violet #a855f7
            const rhoSize = (org.rhombencephalonSize || 1.2) * (bodyRadius * 0.30);
            ctx.save();
            ctx.fillStyle = "rgba(168, 85, 247, 0.80)";
            ctx.beginPath();
            ctx.ellipse(-skullW * 0.25, 0.0, rhoSize * 1.2, rhoSize * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render ventrolateral slime gland micro-pores along body margins in hagfish.
         */
        static drawSlimeGlandPores(ctx, org, tick, bodyLen, bodyRadius, wavePhase) {
            const poreCount = 14;
            const payloadRatio = (org.slimePayload || 0.0) / (org.slimeMaxPayload || 100.0);

            ctx.save();
            for (let i = 0; i < poreCount; i++) {
                const u = 0.15 + (i / poreCount) * 0.70;
                const px = (0.5 - u) * bodyLen;
                const amp = (0.15 + u * 0.85) * (bodyRadius * 0.95);
                const py = Math.sin(wavePhase - u * Math.PI * 2.2) * amp;
                const taper = Math.sin(Math.pow(1.0 - u, 0.65) * Math.PI * 0.75) * (1.0 - u * 0.45);
                const r = Math.max(1.8, bodyRadius * Math.max(0.25, taper));

                const poreY = py + r * 0.78;
                ctx.fillStyle = "rgba(100, 116, 139, 0.85)";
                ctx.beginPath();
                ctx.arc(px, poreY, 1.1, 0, Math.PI * 2);
                ctx.fill();

                if (payloadRatio > 0.35 && (i % 2 === 0)) {
                    ctx.fillStyle = "rgba(132, 204, 22, 0.75)";
                    ctx.beginPath();
                    ctx.arc(px, poreY + 0.6, 0.7, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        /**
         * Render explosive slime cloud with uncoiled microfibers and hydrogel web.
         */
        static drawSlimeCloud(ctx, org, tick) {
            const radius = org.slimeCloudRadius || 42.0;
            const timer = org.slimeCloudTimer || 4.5;
            const alpha = Math.min(0.65, (timer / 4.5) * 0.65);
            const suffocation = org.predatorGillSuffocation || false;

            ctx.save();
            ctx.translate(org.x, org.y);

            ctx.save();
            ctx.beginPath();
            const segments = 12;
            for (let i = 0; i <= segments; i++) {
                const ang = (i / segments) * Math.PI * 2;
                const wobble = Math.sin(ang * 4.0 + tick * 0.12) * (radius * 0.14);
                const r = radius + wobble;
                const gx = Math.cos(ang) * r;
                const gy = Math.sin(ang) * r;
                if (i === 0) ctx.moveTo(gx, gy);
                else ctx.lineTo(gx, gy);
            }
            ctx.closePath();

            const cloudGrad = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 1.1);
            cloudGrad.addColorStop(0.0, "rgba(248, 250, 252, " + (alpha * 0.85) + ")");
            cloudGrad.addColorStop(0.5, "rgba(226, 232, 240, " + (alpha * 0.55) + ")");
            cloudGrad.addColorStop(0.85, "rgba(132, 204, 22, " + (alpha * 0.30) + ")");
            cloudGrad.addColorStop(1.0, "rgba(132, 204, 22, 0.0)");
            ctx.fillStyle = cloudGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(241, 245, 249, " + (alpha * 0.75) + ")";
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, " + (alpha * 0.85) + ")";
            ctx.lineWidth = 0.9;
            const strandCount = 10;
            for (let i = 0; i < strandCount; i++) {
                const baseAng = (i / strandCount) * Math.PI * 2;
                const curAng = baseAng + Math.sin(tick * 0.08 + i) * 0.25;
                const dist = radius * (0.45 + (i % 3) * 0.25);
                const ex = Math.cos(curAng) * dist;
                const ey = Math.sin(curAng) * dist;
                const cpx = Math.cos(curAng + 0.35) * (dist * 0.55);
                const cpy = Math.sin(curAng + 0.35) * (dist * 0.55);

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(cpx, cpy, ex, ey);
                ctx.stroke();

                if (i > 0) {
                    const prevAng = ((i - 1) / strandCount) * Math.PI * 2;
                    const px = Math.cos(prevAng) * (dist * 0.65);
                    const py = Math.sin(prevAng) * (dist * 0.65);
                    ctx.beginPath();
                    ctx.moveTo(cpx, cpy);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = "rgba(226, 232, 240, " + (alpha * 0.45) + ")";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
            ctx.restore();

            if (suffocation) {
                ctx.save();
                ctx.strokeStyle = "rgba(239, 68, 68, " + (alpha * 0.90) + ")";
                ctx.lineWidth = 2.0;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(0, 0, radius * 0.92, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Render figure-8 body knotting maneuver for mechanical leverage and slime cleansing.
         */
        static drawBodyKnot(ctx, org, tick, bodyLen, bodyRadius) {
            ctx.save();
            const loopR = bodyRadius * 1.5;
            const knotPhase = tick * 0.18;

            ctx.lineWidth = bodyRadius * 1.6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();
            ctx.strokeStyle = "rgba(100, 116, 139, 0.85)";
            ctx.ellipse(-loopR * 0.7, 0, loopR * 1.2, loopR * 0.8, Math.PI * 0.25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "rgba(225, 112, 128, 0.90)";
            ctx.ellipse(loopR * 0.7, 0, loopR * 1.1, loopR * 0.8, -Math.PI * 0.25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            for (let i = 0; i < 5; i++) {
                const sparkAng = knotPhase + (i * Math.PI * 0.4);
                const sx = Math.cos(sparkAng) * (loopR * 0.85);
                const sy = Math.sin(sparkAng) * (loopR * 0.65);
                ctx.beginPath();
                ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = "rgba(244, 63, 94, 0.85)";
            ctx.beginPath();
            ctx.arc(loopR * 1.6, 0, bodyRadius * 0.9, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        /**
         * Render benthic hadal organic fall feeding grounds and colloidal necrophagy scents.
         */
        static drawGlobalCraniataBenthos(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const benthosY = height * 0.72;
            const benthosH = height - benthosY;

            ctx.save();
            const benthosGrad = ctx.createLinearGradient(0, benthosY, 0, height);
            benthosGrad.addColorStop(0.0, "rgba(15, 23, 42, 0.0)");
            benthosGrad.addColorStop(0.4, "rgba(30, 41, 59, 0.12)");
            benthosGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.28)");
            ctx.fillStyle = benthosGrad;
            ctx.fillRect(0, benthosY, width, benthosH);

            const activeCraniates = manager.metrics.totalCraniataOrganisms || 0;
            if (activeCraniates > 0) {
                const plumeAlpha = 0.04 + Math.sin(tick * 0.04) * 0.02;
                ctx.fillStyle = "rgba(132, 204, 22, " + plumeAlpha + ")";
                for (let x = 60; x < width; x += 180) {
                    const py = benthosY + 20.0 + Math.sin(tick * 0.03 + x * 0.01) * 15.0;
                    ctx.beginPath();
                    ctx.ellipse(x, py, 55.0, 18.0, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render persistent hydrogel filament trails, wake streamers, and ruby suction lines.
         */
        static drawCraniataTrailsAndSlime(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isCraniata) continue;

                if (org.eelLikeUndulationVelocity && org.eelLikeUndulationVelocity > 1.8) {
                    const heading = Math.atan2(org.vy || 0, org.vx || 1);
                    const tailX = org.x - Math.cos(heading) * 35.0;
                    const tailY = org.y - Math.sin(heading) * 35.0;

                    ctx.strokeStyle = org.hasPetromyzontidaTrait ? "rgba(225, 29, 72, 0.22)" : "rgba(148, 163, 184, 0.18)";
                    ctx.lineWidth = 1.1;
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY);
                    const trailWave = Math.sin(tick * 0.15) * 8.0;
                    const perpX = -Math.sin(heading) * trailWave;
                    const perpY = Math.cos(heading) * trailWave;
                    ctx.lineTo(tailX - Math.cos(heading) * 18.0 + perpX, tailY - Math.sin(heading) * 18.0 + perpY);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CraniataOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.CraniataOpticsRenderer = CraniataOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
