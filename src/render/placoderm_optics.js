// BioEcosystem - Early Placoderm Armor Carapace, Cranio-Thoracic Hinge Joint & Gnathal Plate Optics
// Module: src/render/placoderm_optics.js
// Version: 8.29.0 (Hour 549 - Looks & UI Agent: Cranio-Thoracic Hinge Elevation, Double-Jointed Gape, Cavitation Vortex & 106th Channel % CTS Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PlacodermOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for early Placoderms / Arthrodires (Placodermi - Arthrodira / Dunkleosteus-type apex predators):
     * - Dual Armor Carapace: Articulated division between the cranial head shield and the rigid thoracic armor ring
     * - Movable Cranio-Thoracic Hinge Joint: Dual condyle ball-and-socket neck joint at the nuchal gap permitting dramatic dorsal head elevation (15 - 30 deg)
     * - Double-Jointed Total Mouth Gape: Synchronized head elevation and mandibular depression producing an explosive 50 - 65 degree mouth gape in 50 ms
     * - Articulated Shearing Gnathal Plates: Supragnathal and inferognathal razor-edged dermal bone blades scissoring past each other with kinetic friction sparks
     * - Cavitation Suction Vortex: Explosive negative pressure streamlines curving inward toward the gaping buccal cavity
     * - Sclerotic Eye Rings: Ossified bone rings shielding large binocular sensory orbits with predatory amber luminescence
     * - Post-Thoracic Fusiform Body: Muscular trunk with heterocercal/epicercal caudal fin and paired stabilizer fins
     * - 105th Telemetry Channel (% GJI) Radiance: Crimson-gold / ember flame (#ea580c) apex jaw closing and shearing shockwave
     * - 106th Telemetry Channel (% CTS) Radiance: Bloodstone crimson / deep garnet (#b91c1c) cranio-thoracic hinge halo and shockwave ripples
     * - Pelagic Apex Hunting Stratum: Upper-water column predatory atmospheric turbidity and particulate shearing wakes
     */
    class PlacodermOpticsRenderer {
        /**
         * Render individual placoderm organism.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawPlacoderm(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isPlacoderm) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const headLen = 22.0 + size * 1.5;     // 24 - 36 px
            const headWidth = 16.0 + size * 1.1;   // 18 - 27 px
            const thoracicLen = 18.0 + size * 1.2; // 20 - 30 px
            const thoracicWidth = headWidth * 1.15; // 21 - 31 px
            const tailLen = 38.0 + size * 2.4;     // 42 - 62 px

            const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
            const wavePhase = ((tick * 0.18 * Math.max(0.8, speed)) + (org.id ? (org.id * 0.63) : 0.0)) % (Math.PI * 2);

            const gji = (org.gnathostomeJawIndex || 0.0) / 100.0;
            const cts = (org.cranioThoracicShearIndex || 0.0) / 100.0;
            const jawGape = org.jawGapeAngle !== undefined ? org.jawGapeAngle : 0.32;
            const isSnapping = org.isJawSnapping || false;
            const sharpness = org.gnathalShearSharpness || 0.82;

            // Cranio-thoracic hinge motion: head elevates upward while lower jaw drops downward
            const headElevation = org.headElevationAngle !== undefined ? org.headElevationAngle : (jawGape * 0.35);
            const totalGape = org.totalGapeAngle !== undefined ? org.totalGapeAngle : (jawGape + headElevation);
            const headTilt = -headElevation; // Upward head elevation rotation (negative in canvas coords)
            const nuchalGap = org.nuchalGapOpening !== undefined ? org.nuchalGapOpening : (headElevation * 20.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            let heading = Math.atan2(org.vy || 0, org.vx || 1);
            ctx.rotate(heading);

            // 1. 105th Channel Jaw Apex Power Halo (% GJI - Crimson Gold / Ember Flame #ea580c)
            if (gji > 0.20) {
                const haloAlpha = 0.08 + gji * 0.18 + (isSnapping ? 0.25 : Math.sin(tick * 0.12) * 0.04);
                ctx.save();
                ctx.strokeStyle = isSnapping ? "rgba(249, 115, 22, " + Math.min(0.85, haloAlpha + 0.35) + ")" :
                    "rgba(234, 88, 12, " + Math.max(0.04, haloAlpha) + ")";
                ctx.lineWidth = 1.4 + gji * 1.2 + (isSnapping ? 1.5 : 0.0);
                ctx.beginPath();
                ctx.ellipse(headLen * 0.25, 0, (headLen + thoracicLen) * 0.65, thoracicWidth * (1.1 + gji * 0.45), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 2. 106th Channel Cranio-Thoracic Shear Halo (% CTS - Bloodstone Crimson / Garnet #b91c1c)
            if (cts > 0.20) {
                const ctsAlpha = 0.08 + cts * 0.22 + (isSnapping ? 0.30 : Math.sin(tick * 0.15) * 0.05);
                ctx.save();
                ctx.strokeStyle = isSnapping ? "rgba(220, 38, 38, " + Math.min(0.90, ctsAlpha + 0.35) + ")" :
                    "rgba(185, 28, 28, " + Math.max(0.04, ctsAlpha) + ")";
                ctx.lineWidth = 1.6 + cts * 1.4 + (isSnapping ? 1.6 : 0.0);
                ctx.beginPath();
                ctx.ellipse(headLen * 0.30, 0, (headLen + thoracicLen) * 0.70, thoracicWidth * (1.15 + cts * 0.50), 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Muscular Fusiform Post-Thoracic Trunk & Heterocercal Tail (drawn behind armor)
            PlacodermOpticsRenderer.drawFusiformMuscularTail(ctx, org, tick, tailLen, thoracicWidth, wavePhase);

            // 4. Paired Pectoral Fins & Pelvic Stabilizers
            PlacodermOpticsRenderer.drawPectoralAndPelvicFins(ctx, org, tick, thoracicLen, thoracicWidth, speed);

            // 5. Rigid Thoracic Armor Shield (Body Armor Ring)
            PlacodermOpticsRenderer.drawThoracicShield(ctx, org, tick, thoracicLen, thoracicWidth, cts);

            // 6. Cephalic Head Shield & Movable Cranio-Thoracic Neck Joint
            PlacodermOpticsRenderer.drawCephalicHeadShield(ctx, org, tick, headLen, headWidth, headTilt, nuchalGap, gji, cts, isSnapping);

            // 7. Articulated Shearing Gnathal Plates, Double-Joint Gape & Cavitation Vortex
            PlacodermOpticsRenderer.drawGnathalShearingPlates(ctx, org, tick, headLen, headWidth, jawGape, headTilt, totalGape, sharpness, cts, isSnapping);

            ctx.restore();
        }

        /**
         * Render rigid thoracic armor shield (trunk ring) protecting visceral cavity.
         */
        static drawThoracicShield(ctx, org, tick, thoracicLen, thoracicWidth, cts) {
            ctx.save();

            const halfW = thoracicWidth * 0.52;
            const startX = 0;
            const backX = -thoracicLen;

            // Boxy armored thoracic ring outline
            ctx.beginPath();
            ctx.moveTo(startX, -halfW * 0.90);
            ctx.bezierCurveTo(backX * 0.35, -halfW, backX * 0.75, -halfW * 0.95, backX, -halfW * 0.70);
            // Posterior thoracic margin curving into ventral plate
            ctx.lineTo(backX * 0.85, 0);
            ctx.lineTo(backX, halfW * 0.70);
            ctx.bezierCurveTo(backX * 0.75, halfW * 0.95, backX * 0.35, halfW, startX, halfW * 0.90);
            // Anterior nuchal margin facing head shield
            ctx.lineTo(startX, -halfW * 0.90);
            ctx.closePath();

            // Gradient: Heavy burnished iron/slate armor with bronze dermal undertones
            const thorGrad = ctx.createLinearGradient(startX, 0, backX, 0);
            thorGrad.addColorStop(0.0, "rgba(71, 85, 105, 0.98)");
            thorGrad.addColorStop(0.4, "rgba(51, 65, 85, 0.96)");
            thorGrad.addColorStop(0.8, "rgba(30, 41, 59, 0.98)");
            thorGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.98)");
            ctx.fillStyle = thorGrad;
            ctx.fill();

            // Carapace border stroke
            ctx.strokeStyle = "rgba(203, 213, 225, 0.55)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Median dorsal plate suture ridge
            ctx.strokeStyle = "rgba(148, 163, 184, 0.65)";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(startX, 0);
            ctx.lineTo(backX * 0.85, 0);
            ctx.stroke();

            // Antero-lateral condyle hinge facets (cranial articulation points on nuchal margin)
            const condyleColor = (cts && cts > 0.40) ? "rgba(185, 28, 28, 0.88)" : "rgba(234, 88, 12, 0.80)";
            ctx.fillStyle = condyleColor;
            ctx.beginPath();
            ctx.arc(startX, -halfW * 0.72, 2.2, 0, Math.PI * 2);
            ctx.arc(startX, halfW * 0.72, 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Condyle socket rim outline
            ctx.strokeStyle = "rgba(254, 215, 170, 0.75)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(startX, -halfW * 0.72, 3.0, 0, Math.PI * 2);
            ctx.arc(startX, halfW * 0.72, 3.0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render movable cephalic head shield articulating at the nuchal neck hinge.
         */
        static drawCephalicHeadShield(ctx, org, tick, headLen, headWidth, headTilt, nuchalGap, gji, cts, isSnapping) {
            ctx.save();

            // Pivot at the cranio-thoracic hinge line (x = 0) with head elevation tilt
            ctx.rotate(headTilt);

            const halfW = headWidth * 0.50;
            const snoutX = headLen;
            const hingeX = 0;

            // 1. Nuchal Gap Opening Visual (inter-plate connective tissue tension)
            if (nuchalGap > 1.0) {
                ctx.save();
                ctx.strokeStyle = "rgba(185, 28, 28, " + Math.min(0.65, nuchalGap * 0.12) + ")";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([2, 2]);
                ctx.beginPath();
                ctx.moveTo(hingeX, -halfW * 0.85);
                ctx.quadraticCurveTo(hingeX - nuchalGap * 0.5, 0, hingeX, halfW * 0.85);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 2. Cephalic Shield Carapace Outline
            ctx.beginPath();
            ctx.moveTo(hingeX, -halfW * 0.88);
            ctx.bezierCurveTo(headLen * 0.35, -halfW * 0.95, headLen * 0.75, -halfW * 0.65, snoutX, -halfW * 0.20);
            // Snout tip
            ctx.lineTo(snoutX, halfW * 0.20);
            ctx.bezierCurveTo(headLen * 0.75, halfW * 0.65, headLen * 0.35, halfW * 0.95, hingeX, halfW * 0.88);
            // Nuchal posterior margin facing thoracic shield
            ctx.quadraticCurveTo(hingeX * 0.5, 0, hingeX, -halfW * 0.88);
            ctx.closePath();

            const headGrad = ctx.createLinearGradient(hingeX, 0, snoutX, 0);
            headGrad.addColorStop(0.0, "rgba(51, 65, 85, 0.96)");
            headGrad.addColorStop(0.45, (cts && cts > 0.50) ? "rgba(88, 28, 28, 0.94)" : "rgba(71, 85, 105, 0.94)");
            headGrad.addColorStop(0.85, isSnapping ? "rgba(220, 38, 38, 0.92)" : "rgba(100, 116, 139, 0.92)");
            headGrad.addColorStop(1.0, "rgba(30, 41, 59, 0.96)");
            ctx.fillStyle = headGrad;
            ctx.fill();

            // Carapace border trim
            ctx.strokeStyle = isSnapping ? "rgba(252, 165, 165, 0.95)" : "rgba(226, 232, 240, 0.60)";
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // 3. Cranial Sensory Canal Grooves (supraorbital & postorbital canals)
            ctx.strokeStyle = (cts && cts > 0.50) ? "rgba(252, 165, 165, 0.75)" : "rgba(148, 163, 184, 0.70)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(snoutX * 0.75, -halfW * 0.35);
            ctx.lineTo(headLen * 0.40, -halfW * 0.50);
            ctx.lineTo(hingeX + 3.0, -halfW * 0.65);
            ctx.moveTo(snoutX * 0.75, halfW * 0.35);
            ctx.lineTo(headLen * 0.40, halfW * 0.50);
            ctx.lineTo(hingeX + 3.0, halfW * 0.65);
            ctx.stroke();

            // 4. Sclerotic Eye Rings (large ossified orbital eye plates)
            const eyeX = headLen * 0.62;
            const eyeY = halfW * 0.48;
            for (let side = -1; side <= 1; side += 2) {
                ctx.save();
                ctx.translate(eyeX, side * eyeY);

                // Outer sclerotic bone ring
                ctx.strokeStyle = (cts && cts > 0.60) ? "rgba(254, 202, 202, 0.90)" : "rgba(254, 215, 170, 0.85)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(0, 0, 3.4, 0, Math.PI * 2);
                ctx.stroke();

                // Pupil with predatory amber-garnet core
                ctx.fillStyle = isSnapping ? "#b91c1c" : ((cts && cts > 0.50) ? "#ea580c" : "#f59e0b");
                ctx.beginPath();
                ctx.arc(0, 0, 1.9, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#0f172a";
                ctx.beginPath();
                ctx.arc(0, 0, 0.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Render articulated shearing gnathal plates, double-joint gape, and cavitation suction vortex.
         */
        static drawGnathalShearingPlates(ctx, org, tick, headLen, headWidth, jawGape, headTilt, totalGape, sharpness, cts, isSnapping) {
            ctx.save();

            const halfW = headWidth * 0.46;
            const snoutX = headLen;
            const mouthBaseX = headLen * 0.45;

            // 1. Cavitation Suction Vortex Streamlines (explosive intake when mouth opens wide)
            if (totalGape > 0.35) {
                const suctionAlpha = Math.min(0.65, (totalGape - 0.30) * 0.95);
                ctx.strokeStyle = (cts && cts > 0.50) ? "rgba(185, 28, 28, " + suctionAlpha + ")" :
                    "rgba(234, 88, 12, " + suctionAlpha + ")";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                // Outer suction arc
                ctx.arc(snoutX + 10.0, 0, headWidth * 0.75, -Math.PI * 0.38, Math.PI * 0.38);
                // Intermediate vortex streamline
                ctx.arc(snoutX + 16.0, 0, headWidth * 0.95, -Math.PI * 0.28, Math.PI * 0.28);
                ctx.stroke();

                // Converging inflow streamlines pulling into the wide gape
                ctx.strokeStyle = "rgba(254, 215, 170, " + (suctionAlpha * 0.8) + ")";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(snoutX + 18.0, -halfW * 0.60);
                ctx.quadraticCurveTo(snoutX + 6.0, -halfW * 0.20, mouthBaseX + 6.0, 0);
                ctx.moveTo(snoutX + 18.0, halfW * 0.60);
                ctx.quadraticCurveTo(snoutX + 6.0, halfW * 0.20, mouthBaseX + 6.0, 0);
                ctx.stroke();
            }

            // 2. Upper Supragnathal Shearing Plates (attached to elevated head shield)
            ctx.save();
            ctx.rotate(headTilt);

            ctx.beginPath();
            ctx.moveTo(snoutX, -halfW * 0.20);
            // Anterior cusp / blade tip
            ctx.lineTo(snoutX + 3.8, 0);
            ctx.lineTo(snoutX, halfW * 0.20);
            // Sharp shearing edge
            ctx.lineTo(mouthBaseX, halfW * 0.15);
            ctx.lineTo(mouthBaseX, -halfW * 0.15);
            ctx.closePath();

            const bladeGrad1 = ctx.createLinearGradient(mouthBaseX, 0, snoutX + 3.8, 0);
            bladeGrad1.addColorStop(0.0, "rgba(226, 232, 240, 0.92)"); // Bone plate base
            bladeGrad1.addColorStop(0.65, "rgba(254, 243, 199, 0.98)"); // Enameloid mineral zone
            bladeGrad1.addColorStop(1.0, isSnapping ? "#ffffff" : "rgba(255, 255, 255, 0.95)"); // Razor edge
            ctx.fillStyle = bladeGrad1;
            ctx.fill();

            ctx.strokeStyle = isSnapping ? "#b91c1c" : "rgba(217, 119, 6, 0.85)";
            ctx.lineWidth = 1.3;
            ctx.stroke();
            ctx.restore();

            // 3. Lower Inferognathal Shearing Plate (depressing with mandibular gape)
            ctx.save();
            const lowerJawDepression = jawGape * 0.72;
            ctx.translate(mouthBaseX, 0);
            ctx.rotate(lowerJawDepression);

            const jawLen = snoutX - mouthBaseX + 2.8;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(jawLen * 0.6, halfW * 0.18);
            ctx.lineTo(jawLen, halfW * 0.08); // Lower beak tip
            ctx.lineTo(jawLen * 0.85, -halfW * 0.05); // Shearing blade crest
            ctx.lineTo(0, -halfW * 0.12);
            ctx.closePath();

            const bladeGrad2 = ctx.createLinearGradient(0, 0, jawLen, 0);
            bladeGrad2.addColorStop(0.0, "rgba(203, 213, 225, 0.90)");
            bladeGrad2.addColorStop(0.65, "rgba(254, 240, 138, 0.95)");
            bladeGrad2.addColorStop(1.0, "#ffffff");
            ctx.fillStyle = bladeGrad2;
            ctx.fill();

            ctx.strokeStyle = isSnapping ? "#dc2626" : "rgba(180, 83, 9, 0.85)";
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // 4. Occlusal Shearing Kinetic Contact Sparks (on bite snap & scissor strike)
            if (isSnapping) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
                ctx.beginPath();
                ctx.arc(jawLen * 0.75, 0, 3.6, 0, Math.PI * 2);
                ctx.fill();

                // Spark particle radiation
                ctx.strokeStyle = "rgba(254, 215, 170, 0.90)";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.moveTo(jawLen * 0.75 - 4.0, -3.0);
                ctx.lineTo(jawLen * 0.75 + 4.0, 3.0);
                ctx.moveTo(jawLen * 0.75 - 3.0, 4.0);
                ctx.lineTo(jawLen * 0.75 + 3.0, -4.0);
                ctx.stroke();
            }
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render flexible post-thoracic muscular body, myotomes, and heterocercal caudal fin.
         */
        static drawFusiformMuscularTail(ctx, org, tick, tailLen, thoracicWidth, wavePhase) {
            ctx.save();
            const startX = -thoracicLen_safe(org);
            const numSegments = 11;
            const spinePoints = [];
            const baseR = thoracicWidth * 0.44;

            for (let i = 0; i <= numSegments; i++) {
                const u = i / numSegments;
                const sx = startX - u * tailLen;
                const amp = u * (baseR * 0.90);
                const sy = Math.sin(wavePhase - u * Math.PI * 2.2) * amp;
                const r = Math.max(1.8, baseR * (1.0 - u * 0.80));
                spinePoints.push({ x: sx, y: sy, r: r, u: u });
            }

            // 1. Muscular trunk outline
            ctx.beginPath();
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                if (i === 0) ctx.moveTo(pt.x, pt.y - pt.r);
                else ctx.lineTo(pt.x, pt.y - pt.r);
            }
            for (let i = spinePoints.length - 1; i >= 0; i--) {
                const pt = spinePoints[i];
                ctx.lineTo(pt.x, pt.y + pt.r);
            }
            ctx.closePath();

            const tailGrad = ctx.createLinearGradient(startX, 0, startX - tailLen, 0);
            tailGrad.addColorStop(0.0, "rgba(51, 65, 85, 0.95)");
            tailGrad.addColorStop(0.5, "rgba(30, 41, 59, 0.92)");
            tailGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.88)");
            ctx.fillStyle = tailGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(148, 163, 184, 0.40)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // 2. V-shaped Myotome chevron lines along muscular trunk
            ctx.strokeStyle = "rgba(203, 213, 225, 0.28)";
            ctx.lineWidth = 0.8;
            for (let i = 1; i < spinePoints.length - 1; i += 2) {
                const pt = spinePoints[i];
                ctx.beginPath();
                ctx.moveTo(pt.x + 3.0, pt.y - pt.r * 0.85);
                ctx.lineTo(pt.x - 3.0, pt.y);
                ctx.lineTo(pt.x + 3.0, pt.y + pt.r * 0.85);
                ctx.stroke();
            }

            // 3. Strong Epicercal / Heterocercal Caudal Fin
            const lastPt = spinePoints[spinePoints.length - 1];
            ctx.save();
            ctx.translate(lastPt.x, lastPt.y);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            // Dorsal epicercal lobe (large main thrust blade)
            ctx.lineTo(-tailLen * 0.35, -baseR * 1.35);
            ctx.lineTo(-tailLen * 0.22, -baseR * 0.35);
            // Notch
            ctx.lineTo(-tailLen * 0.15, 0);
            // Ventral hypochordal lobe (smaller balance lobe)
            ctx.lineTo(-tailLen * 0.20, baseR * 0.85);
            ctx.lineTo(0, 0);
            ctx.closePath();

            const finGrad = ctx.createLinearGradient(0, 0, -tailLen * 0.35, 0);
            finGrad.addColorStop(0.0, "rgba(71, 85, 105, 0.88)");
            finGrad.addColorStop(0.7, "rgba(51, 65, 85, 0.82)");
            finGrad.addColorStop(1.0, "rgba(30, 41, 59, 0.75)");
            ctx.fillStyle = finGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(226, 232, 240, 0.50)";
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        }

        /**
         * Render hydrodynamic pectoral steering hydrofoils and pelvic stabilizers.
         */
        static drawPectoralAndPelvicFins(ctx, org, tick, thoracicLen, thoracicWidth, speed) {
            ctx.save();
            const halfW = thoracicWidth * 0.50;
            const pecX = -thoracicLen * 0.30;
            const finFlap = Math.sin(tick * 0.22 * Math.max(0.6, speed)) * 0.18;

            // Paired triangular pectoral fins extending from thoracic flanks
            for (let side = -1; side <= 1; side += 2) {
                ctx.save();
                ctx.translate(pecX, side * halfW * 0.92);
                ctx.rotate(side * (0.42 + finFlap));

                const finLen = 14.0 + (org.dna ? (org.dna.size || 8.0) * 0.9 : 7.0);
                const finBase = 7.5;

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-finLen * 0.45, side * finLen * 0.95);
                ctx.lineTo(-finLen, side * finLen * 0.45);
                ctx.lineTo(-finBase, 0);
                ctx.closePath();

                const finGrad = ctx.createLinearGradient(0, 0, -finLen, side * finLen);
                finGrad.addColorStop(0.0, "rgba(71, 85, 105, 0.92)");
                finGrad.addColorStop(0.7, "rgba(51, 65, 85, 0.85)");
                finGrad.addColorStop(1.0, "rgba(30, 41, 59, 0.75)");
                ctx.fillStyle = finGrad;
                ctx.fill();

                ctx.strokeStyle = "rgba(203, 213, 225, 0.55)";
                ctx.lineWidth = 0.9;
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Global upper-stratum pelagic apex predator hunting atmosphere.
         * Rendered across the viewport when placoderms are dominating.
         * @param {CanvasRenderingContext2D} ctx - 2D context.
         * @param {number} width - World bounds width.
         * @param {number} height - World bounds height.
         * @param {Object} placodermManager - PlacodermJawManager instance.
         * @param {number} tick - Simulation frame index.
         */
        static drawGlobalPlacodermApexStratum(ctx, width, height, placodermManager, tick) {
            if (!ctx || !placodermManager) return;
            const metrics = placodermManager.getMetrics();
            if (!metrics || metrics.totalPlacodermOrganisms === 0) return;

            const gjiNorm = Math.min(1.0, metrics.meanGnathostomeJawIndex / 100.0);
            const ctsNorm = Math.min(1.0, (metrics.meanCranioThoracicShearIndex || 0) / 100.0);
            if (gjiNorm < 0.15 && ctsNorm < 0.15) return;

            ctx.save();
            // Subtle predatory upper water column atmospheric haze
            const hazeGrad = ctx.createLinearGradient(0, 0, 0, height * 0.35);
            hazeGrad.addColorStop(0.0, "rgba(185, 28, 28, " + (0.015 + ctsNorm * 0.035) + ")");
            hazeGrad.addColorStop(0.5, "rgba(234, 88, 12, " + (0.010 + gjiNorm * 0.025) + ")");
            hazeGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
            ctx.fillStyle = hazeGrad;
            ctx.fillRect(0, 0, width, height * 0.35);

            ctx.restore();
        }

        /**
         * Render wake trails, cavitation vortices, and shockwaves behind active placoderm predators.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {number} tick - Simulation frame index.
         */
        static drawPlacodermShearTrails(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            ctx.save();
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isPlacoderm) continue;

                const speed = Math.sqrt((org.vx || 0) * (org.vx || 0) + (org.vy || 0) * (org.vy || 0));
                if (speed > 0.65) {
                    const heading = Math.atan2(org.vy || 0, org.vx || 1);
                    const tailX = org.x - Math.cos(heading) * 32.0;
                    const tailY = org.y - Math.sin(heading) * 32.0;
                    const cts = (org.cranioThoracicShearIndex || 0.0) / 100.0;

                    // Twin apex propulsion streamline trails
                    const trailAlpha = Math.min(0.40, 0.12 + speed * 0.09);
                    ctx.strokeStyle = cts > 0.45 ? "rgba(185, 28, 28, " + trailAlpha + ")" :
                        "rgba(234, 88, 12, " + trailAlpha + ")";
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY - 7.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 22.0, tailY - 7.0 - Math.sin(heading) * 22.0);
                    ctx.moveTo(tailX, tailY + 7.0);
                    ctx.lineTo(tailX - Math.cos(heading) * 22.0, tailY + 7.0 - Math.sin(heading) * 22.0);
                    ctx.stroke();

                    // Snap shockwave expansion ring if striking
                    if (org.isJawSnapping) {
                        ctx.strokeStyle = "rgba(220, 38, 38, 0.55)";
                        ctx.lineWidth = 1.8;
                        ctx.beginPath();
                        ctx.arc(org.x, org.y, 24.0, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }
    }

    // Helper for safe thoracic length in sub-functions
    function thoracicLen_safe(org) {
        const size = org && org.dna ? (org.dna.size || 8.0) : 8.0;
        return 18.0 + size * 1.2;
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PlacodermOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.PlacodermOpticsRenderer = PlacodermOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
