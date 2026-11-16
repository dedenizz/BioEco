// BioEcosystem - Early Synapsids, Vascularized Dorsal Sail & Heterodont Dentition Optics
// Module: src/render/synapsid_optics.js
// Version: 8.65.0 (Hour 585 - Looks & UI Agent: Vascular Sail Shaders, Neural Spine Rays, Heterodont Canine Gleam & 117th/118th Channel Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SynapsidOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for Early Synapsida & Pelycosauria:
     * - Dimetrodon grandis, Edaphosaurus pogonias & Archaeothyris florensis morphology
     * - Vascularized Thermoregulatory Dorsal Sail: Hyper-elongated neural spines spanning an arched vascular membrane
     * - Solar Thermal Basking Glow: Capillary network blood flare when absorbing dawn sunlight
     * - Convective Wind Cooling Shimmer: Aerodynamic dissipation lines when dumping excess heat
     * - Wedge-Shaped Synapsid Skull & Lateral Temporal Fenestra: Jaw muscle anchorage depression
     * - Heterodont Dentition: Premaxillary incisors, formidable saber-like piercing canines, serrated postcanine blades
     * - 117th Telemetry Channel (% TSI) Aura: Solar amber / fire flare (#f59e0b) vascular heat exchanger radiance
     * - 118th Telemetry Channel (% HDI) Radiance: Steel silver / ice frost (#e0e7ff) carnassial shear gleam
     */
    class SynapsidOpticsRenderer {
        /**
         * Render individual Synapsid organism with dorsal sail, skull fenestra, and heterodont dentition.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawSynapsid(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isSynapsid) return;

            const size = org.dna ? (org.dna.size || 9.0) : 9.0;
            const bodyLen = 38.0 + size * 2.2;     // 42 - 62 px
            const bodyWidth = 16.0 + size * 1.2;   // 18 - 28 px
            const tailLen = 34.0 + size * 2.0;     // 38 - 56 px

            const tsi = (org.thermalSailIndex || 0.0) / 100.0;
            const hdi = (org.heterodontDentitionIndex || 0.0) / 100.0;
            const spineCount = org.neuralSpineCount || 22;
            const spineHeight = (org.spineHeight || 38.0) * (0.8 + tsi * 0.4);
            const spineVasc = org.neuralSpineVascularization || 0.82;
            const coreTemp = org.coreTemperature || 33.5;
            const isWarmed = org.isWarmedUp || coreTemp >= 31.0;
            const isStriking = org.canineStrikeActive || false;
            const glowTimer = org.sailVascularGlowTimer || 0.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Telemetry Channel Ambient Auras
            // 117th Channel (% TSI) Solar Flare Aura
            if (tsi > 0.50) {
                const auraRadius = bodyLen * 0.75 + spineHeight * 0.5;
                const auraGrad = ctx.createRadialGradient(0, -spineHeight * 0.4, 5, 0, -spineHeight * 0.4, auraRadius);
                const pulse = 0.12 + Math.sin(tick * 0.08) * 0.06 + (glowTimer > 0 ? 0.20 : 0.0);
                auraGrad.addColorStop(0.0, "rgba(245, 158, 11, " + (pulse * tsi).toFixed(3) + ")");
                auraGrad.addColorStop(0.6, "rgba(234, 88, 12, " + (pulse * 0.4 * tsi).toFixed(3) + ")");
                auraGrad.addColorStop(1.0, "rgba(245, 158, 11, 0.0)");
                ctx.fillStyle = auraGrad;
                ctx.beginPath();
                ctx.ellipse(0, -spineHeight * 0.35, auraRadius, auraRadius * 0.75, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // 118th Channel (% HDI) Carnassial Frost Gleam
            if (hdi > 0.65) {
                const jawGleam = ctx.createRadialGradient(bodyLen * 0.5, 0, 2, bodyLen * 0.5, 0, 16);
                jawGleam.addColorStop(0.0, "rgba(224, 231, 255, " + (0.35 * hdi).toFixed(3) + ")");
                jawGleam.addColorStop(0.7, "rgba(199, 210, 254, " + (0.15 * hdi).toFixed(3) + ")");
                jawGleam.addColorStop(1.0, "rgba(224, 231, 255, 0.0)");
                ctx.fillStyle = jawGleam;
                ctx.beginPath();
                ctx.arc(bodyLen * 0.5, 0, 16, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Sprawling Pelycosauria Limbs (Forelimbs and Hindlimbs with Digits)
            const limbPhase = (tick * 0.15 * (isWarmed ? 1.4 : 1.0)) % (Math.PI * 2);
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 3.2;
            ctx.lineCap = "round";

            // Left Forelimb
            const lfAngle = Math.sin(limbPhase) * 0.45;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.25, -bodyWidth * 0.4);
            ctx.lineTo(bodyLen * 0.28 + Math.cos(lfAngle) * 14.0, -bodyWidth * 0.95);
            ctx.lineTo(bodyLen * 0.28 + Math.cos(lfAngle) * 14.0 + 8.0, -bodyWidth * 1.35);
            ctx.stroke();

            // Right Forelimb
            const rfAngle = -Math.sin(limbPhase) * 0.45;
            ctx.beginPath();
            ctx.moveTo(bodyLen * 0.25, bodyWidth * 0.4);
            ctx.lineTo(bodyLen * 0.28 + Math.cos(rfAngle) * 14.0, bodyWidth * 0.95);
            ctx.lineTo(bodyLen * 0.28 + Math.cos(rfAngle) * 14.0 + 8.0, bodyWidth * 1.35);
            ctx.stroke();

            // Left Hindlimb
            const lhAngle = -Math.sin(limbPhase) * 0.40;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.25, -bodyWidth * 0.45);
            ctx.lineTo(-bodyLen * 0.22 + Math.cos(lhAngle) * 16.0, -bodyWidth * 1.05);
            ctx.lineTo(-bodyLen * 0.22 + Math.cos(lhAngle) * 16.0 + 9.0, -bodyWidth * 1.45);
            ctx.stroke();

            // Right Hindlimb
            const rhAngle = Math.sin(limbPhase) * 0.40;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.25, bodyWidth * 0.45);
            ctx.lineTo(-bodyLen * 0.22 + Math.cos(rhAngle) * 16.0, bodyWidth * 1.05);
            ctx.lineTo(-bodyLen * 0.22 + Math.cos(rhAngle) * 16.0 + 9.0, bodyWidth * 1.45);
            ctx.stroke();

            // 3. Robust Tapered Muscular Tail
            const tailWag = Math.sin(tick * 0.12) * 0.15;
            ctx.fillStyle = "#1e293b";
            ctx.strokeStyle = "#0f172a";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-bodyLen * 0.4, -bodyWidth * 0.35);
            ctx.quadraticCurveTo(-bodyLen * 0.8, -bodyWidth * 0.15 + tailWag * 12.0, -bodyLen * 0.4 - tailLen, tailWag * 20.0);
            ctx.quadraticCurveTo(-bodyLen * 0.8, bodyWidth * 0.15 + tailWag * 12.0, -bodyLen * 0.4, bodyWidth * 0.35);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 4. Main Torso / Vertebral Column
            ctx.fillStyle = "#334155";
            ctx.strokeStyle = "#1e293b";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.ellipse(0, 0, bodyLen * 0.45, bodyWidth * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // 5. Vascularized Dorsal Sail (The Crown Pelycosauria Organ)
            // Rendered as an arched vascular membrane spanned between elongated neural spines
            const sailStart = -bodyLen * 0.35;
            const sailEnd = bodyLen * 0.30;
            const sailSpan = sailEnd - sailStart;

            ctx.save();
            // Membrane Webbing Fill: gradient from deep crimson core to radiant translucent solar amber
            const sailGrad = ctx.createLinearGradient(0, 0, 0, -spineHeight);
            const flareIntensity = 0.45 + (glowTimer > 0 ? 0.35 : 0.0) + Math.sin(tick * 0.06) * 0.10;
            sailGrad.addColorStop(0.0, "rgba(185, 28, 28, 0.85)");
            sailGrad.addColorStop(0.4, "rgba(220, 38, 38, " + (flareIntensity * spineVasc).toFixed(3) + ")");
            sailGrad.addColorStop(0.8, "rgba(245, 158, 11, " + (flareIntensity * 0.85).toFixed(3) + ")");
            sailGrad.addColorStop(1.0, "rgba(254, 240, 138, 0.65)");

            // Membrane Path
            ctx.beginPath();
            ctx.moveTo(sailStart, 0);
            // Trace upper arched perimeter
            for (let s = 0; s <= spineCount; s++) {
                const u = s / spineCount;
                const x = sailStart + u * sailSpan;
                // Parabolic / semicircular height profile
                const archProfile = Math.sin(u * Math.PI);
                const h = archProfile * spineHeight;
                ctx.lineTo(x, -h);
            }
            ctx.lineTo(sailEnd, 0);
            ctx.closePath();
            ctx.fillStyle = sailGrad;
            ctx.fill();

            // Neural Spine Rays (Slender bony columns extending upward)
            ctx.strokeStyle = "#fef3c7";
            ctx.lineWidth = 1.2;
            for (let s = 1; s < spineCount; s++) {
                const u = s / spineCount;
                const x = sailStart + u * sailSpan;
                const archProfile = Math.sin(u * Math.PI);
                const h = archProfile * spineHeight;

                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, -h);
                ctx.stroke();

                // Capillary vascular branches along neural spine
                if (spineVasc > 0.70 && s % 2 === 0) {
                    ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(x, -h * 0.3);
                    ctx.lineTo(x + 3.0, -h * 0.5);
                    ctx.lineTo(x - 2.0, -h * 0.7);
                    ctx.stroke();
                    ctx.strokeStyle = "#fef3c7";
                    ctx.lineWidth = 1.2;
                }
            }

            // Outer Sail Membrane Rim
            ctx.strokeStyle = "rgba(245, 158, 11, 0.90)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(sailStart, 0);
            for (let s = 0; s <= spineCount; s++) {
                const u = s / spineCount;
                const x = sailStart + u * sailSpan;
                const archProfile = Math.sin(u * Math.PI);
                const h = archProfile * spineHeight;
                ctx.lineTo(x, -h);
            }
            ctx.stroke();
            ctx.restore();

            // 6. Wedge-Shaped Skull & Lateral Temporal Fenestra
            const headX = bodyLen * 0.38;
            const headLen = bodyLen * 0.30;
            const headWidth = bodyWidth * 0.42;

            ctx.fillStyle = "#475569";
            ctx.strokeStyle = "#1e293b";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(headX, -headWidth);
            ctx.lineTo(headX + headLen, -headWidth * 0.45);
            ctx.lineTo(headX + headLen + 6.0, 0);
            ctx.lineTo(headX + headLen, headWidth * 0.45);
            ctx.lineTo(headX, headWidth);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Lateral Temporal Fenestra (Single oval opening behind eye socket)
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.strokeStyle = "rgba(100, 116, 139, 0.60)";
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.ellipse(headX + headLen * 0.28, -headWidth * 0.38, 4.2, 2.8, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(headX + headLen * 0.28, headWidth * 0.38, 4.2, 2.8, 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Eye Orbits with alert predator iris
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(headX + headLen * 0.58, -headWidth * 0.40, 2.8, 0, Math.PI * 2);
            ctx.arc(headX + headLen * 0.58, headWidth * 0.40, 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#0f172a";
            ctx.beginPath();
            ctx.arc(headX + headLen * 0.60, -headWidth * 0.40, 1.4, 0, Math.PI * 2);
            ctx.arc(headX + headLen * 0.60, headWidth * 0.40, 1.4, 0, Math.PI * 2);
            ctx.fill();

            // 7. Heterodont Dentition Optics (Incisors, Canines & Postcanines)
            const canineLen = (org.canineLength || 10.0) * (0.85 + hdi * 0.35);

            // Saber Canines (Delici Hançer Köpek Dişleri)
            ctx.fillStyle = "#fffbeb";
            ctx.strokeStyle = "#e2e8f0";
            ctx.lineWidth = 0.8;

            // Upper Left Canine
            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.75, -headWidth * 0.42);
            ctx.lineTo(headX + headLen * 0.82, -headWidth * 0.42 - canineLen);
            ctx.lineTo(headX + headLen * 0.86, -headWidth * 0.42);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Upper Right Canine
            ctx.beginPath();
            ctx.moveTo(headX + headLen * 0.75, headWidth * 0.42);
            ctx.lineTo(headX + headLen * 0.82, headWidth * 0.42 + canineLen);
            ctx.lineTo(headX + headLen * 0.86, headWidth * 0.42);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Premaxillary Shearing Incisors (Ön Kesici Dişler)
            ctx.fillStyle = "#f8fafc";
            for (let inc = 0; inc < 3; inc++) {
                const incX = headX + headLen * 0.90 + inc * 2.2;
                ctx.beginPath();
                ctx.moveTo(incX, -headWidth * 0.25 + inc * 2.5);
                ctx.lineTo(incX + 2.5, 0);
                ctx.stroke();
            }

            // Serrated Postcanine Cheek Blades (Tırtıklı Azı Dişleri)
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 0.6;
            for (let pc = 0; pc < 5; pc++) {
                const pcX = headX + headLen * 0.45 + pc * 3.5;
                ctx.beginPath();
                ctx.moveTo(pcX, -headWidth * 0.38);
                ctx.lineTo(pcX + 1.2, -headWidth * 0.38 - 2.8);
                ctx.moveTo(pcX, headWidth * 0.38);
                ctx.lineTo(pcX + 1.2, headWidth * 0.38 + 2.8);
                ctx.stroke();
            }

            // Canine Puncture Strike Flash
            if (isStriking) {
                ctx.strokeStyle = "rgba(239, 68, 68, 0.90)";
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.arc(headX + headLen + 6.0, 0, 12.0, -Math.PI * 0.35, Math.PI * 0.35);
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render ambient solar basking thermal vectors and convective shimmer across the ecosystem.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame count.
         */
        static drawSynapsidBaskingAndAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.isSynapsid) continue;

                // Solar basking orientation heat rays
                if (org.coreTemperature < 34.0 && org.sailVascularGlowTimer > 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const sunRayLen = 22.0 + Math.sin(tick * 0.15 + i) * 8.0;
                    ctx.strokeStyle = "rgba(245, 158, 11, 0.40)";
                    ctx.lineWidth = 1.0;
                    ctx.setLineDash([4, 4]);
                    for (let r = -2; r <= 2; r++) {
                        ctx.beginPath();
                        ctx.moveTo(r * 6.0, -org.spineHeight * 0.6);
                        ctx.lineTo(r * 9.0, -org.spineHeight * 0.6 - sunRayLen);
                        ctx.stroke();
                    }
                    ctx.setLineDash([]);
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = SynapsidOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.SynapsidOpticsRenderer = SynapsidOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
