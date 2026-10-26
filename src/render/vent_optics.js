// BioEcosystem - Hydrothermal Black Smoker Optics & Thermal Shimmering Shaders
// Module: src/render/vent_optics.js
// Version: 5.59.0 (Hour 279 - Looks / UI Agent: Mineral Crystallization, Thermal Repulsion & Sulfur Vacuoles)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * VentOpticsRenderer
     * High-fidelity microscope rendering for abyssal hydrothermal vent fields:
     * - Multi-layered chalcopyrite/pyrite black smoker chimney spires & crystal glints
     * - Geothermal infrared core incandescence at active venting orifices
     * - Convective mineral smoke plumes with turbulent eddy dispersion
     * - Schlieren optical thermal shimmering waves and density refraction
     * - Thermophilic microbial mat biofilms and Arrhenius catalytic auras
     * - Cellular negative thermotaxis slipstreams and golden sulfur vacuole vesicles
     */
    class VentOpticsRenderer {
        /**
         * Render refractive thermal schlieren ripples caused by extreme fluid density gradients.
         */
        static drawThermalSchlierenField(ctx, vents, tick) {
            if (!vents || !Array.isArray(vents)) return;
            for (let i = 0; i < vents.length; i++) {
                const v = vents[i];
                if (!v) continue;
                for (let w = 1; w <= 3; w++) {
                    const phase = (tick * 0.04 + w * 1.8) % (Math.PI * 2);
                    const waveR = v.radius * (1.2 + w * 0.9) + Math.sin(phase) * 4.0;
                    const waveAlpha = Math.max(0.0, 0.22 - w * 0.06 + Math.sin(phase) * 0.05);

                    ctx.beginPath();
                    ctx.ellipse(v.x, v.y - 10.0, waveR, waveR * 0.55, 0, 0, Math.PI * 2);
                    ctx.lineWidth = 0.8;
                    ctx.strokeStyle = `rgba(251, 191, 36, ${waveAlpha})`;
                    ctx.stroke();
                }
            }
        }

        /**
         * Render rugged sulfide chimney spires and sparkling mineral crystallization facets.
         */
        static drawBlackSmokerChimneys(ctx, vents, tick) {
            if (!vents || !Array.isArray(vents)) return;
            for (let i = 0; i < vents.length; i++) {
                const v = vents[i];
                if (!v) continue;
                const r = v.radius || 28.0, h = r * 2.3;

                // 1. Chimney basaltic column
                ctx.beginPath();
                ctx.moveTo(v.x - r * 1.1, v.y + 15.0);
                ctx.lineTo(v.x - r * 0.5, v.y - h * 0.6);
                ctx.lineTo(v.x - r * 0.35, v.y - h);
                ctx.lineTo(v.x + r * 0.35, v.y - h);
                ctx.lineTo(v.x + r * 0.5, v.y - h * 0.6);
                ctx.lineTo(v.x + r * 1.1, v.y + 15.0);
                ctx.closePath();

                const spireGrad = ctx.createLinearGradient(v.x - r, 0, v.x + r, 0);
                spireGrad.addColorStop(0.0, "#0f172a");
                spireGrad.addColorStop(0.35, "#334155");
                spireGrad.addColorStop(0.70, "#1e293b");
                spireGrad.addColorStop(1.0, "#090d16");
                ctx.fillStyle = spireGrad;
                ctx.fill();
                ctx.lineWidth = 1.0;
                ctx.strokeStyle = "#475569";
                ctx.stroke();

                // 2. Sulfide strata veins
                for (let s = 1; s <= 4; s++) {
                    const sy = v.y + 10.0 - s * (h * 0.22);
                    const sw = r * (1.0 - s * 0.16);
                    ctx.beginPath();
                    ctx.ellipse(v.x, sy, sw, sw * 0.22, 0, 0, Math.PI * 2);
                    ctx.lineWidth = 0.7;
                    ctx.strokeStyle = s % 2 === 0 ? "rgba(234, 179, 8, 0.45)" : "rgba(180, 83, 9, 0.40)";
                    ctx.stroke();
                }

                // 3. Orifice mouth: glowing geothermal infrared-amber slit
                const pulse = 0.75 + 0.25 * Math.sin(tick * 0.12 + i * 1.5);
                ctx.beginPath();
                ctx.ellipse(v.x, v.y - h, r * 0.38, r * 0.18, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(234, 88, 12, ${0.85 * pulse})`;
                ctx.fill();

                // 4. Mineral crystallization sparkles (chalcopyrite & pyrite glints)
                for (let c = 0; c < 3; c++) {
                    const cx = v.x + Math.sin(tick * 0.05 + c * 2.2 + i) * (r * 0.55);
                    const cy = v.y - h * (0.3 + c * 0.25);
                    const glintAlpha = 0.4 + 0.6 * Math.sin(tick * 0.25 + c * 1.7);
                    ctx.beginPath();
                    ctx.arc(cx, cy, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(254, 240, 138, ${glintAlpha})`;
                    ctx.fill();
                }
            }
        }

        /**
         * Render convective billowing mineral smoke plumes and turbulent eddy vortices.
         */
        static drawConvectiveMineralPlumes(ctx, vents, tick) {
            if (!vents || !Array.isArray(vents)) return;
            for (let i = 0; i < vents.length; i++) {
                const v = vents[i];
                if (!v || !v.plumeParticles) continue;

                for (let j = 0; j < v.plumeParticles.length; j++) {
                    const p = v.plumeParticles[j];
                    const pr = 4.0 + (1.0 - p.life) * 16.0;
                    const pAlpha = Math.max(0.0, p.life * 0.55);

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(51, 65, 85, ${(pAlpha * 0.45).toFixed(3)})`;
                    ctx.fill();
                }

                // Buoyant upward plume spine
                const r = v.radius || 28.0, h = r * 2.3;
                const spineGrad = ctx.createLinearGradient(v.x, v.y - h, v.x, v.y - h - 55.0);
                spineGrad.addColorStop(0.0, "rgba(234, 88, 12, 0.45)");
                spineGrad.addColorStop(0.35, "rgba(51, 65, 85, 0.40)");
                spineGrad.addColorStop(1.0, "rgba(15, 23, 42, 0.0)");

                ctx.beginPath();
                ctx.moveTo(v.x - r * 0.35, v.y - h);
                ctx.lineTo(v.x - r * 0.75, v.y - h - 55.0);
                ctx.lineTo(v.x + r * 0.75, v.y - h - 55.0);
                ctx.lineTo(v.x + r * 0.35, v.y - h);
                ctx.closePath();
                ctx.fillStyle = spineGrad;
                ctx.fill();
            }
        }

        /**
         * Render golden-sulfur thermophilic bacterial biofilms coating chimney flanks.
         */
        static drawThermophilicBiofilms(ctx, vents, tick) {
            if (!vents || !Array.isArray(vents)) return;
            for (let i = 0; i < vents.length; i++) {
                const v = vents[i];
                if (!v) continue;
                const r = v.radius || 28.0;

                for (let b = 0; b < 3; b++) {
                    const bx = v.x + (b - 1) * (r * 0.65);
                    const by = v.y + 4.0 - b * 5.0;
                    const bPulse = 0.5 + 0.5 * Math.sin(tick * 0.08 + b * 2.0 + i);

                    ctx.beginPath();
                    ctx.ellipse(bx, by, r * 0.40, r * 0.22, 0, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(234, 179, 8, ${0.30 + bPulse * 0.25})`;
                    ctx.fill();
                    ctx.lineWidth = 0.6;
                    ctx.strokeStyle = `rgba(253, 224, 71, ${0.45 + bPulse * 0.25})`;
                    ctx.stroke();
                }
            }
        }

        /**
         * Master pass rendering the complete benthic hydrothermal vent field.
         */
        static drawHydrothermalComplex(ctx, vents, tick) {
            if (!ctx || !vents) return;
            ctx.save();
            VentOpticsRenderer.drawThermalSchlierenField(ctx, vents, tick);
            VentOpticsRenderer.drawBlackSmokerChimneys(ctx, vents, tick);
            VentOpticsRenderer.drawThermophilicBiofilms(ctx, vents, tick);
            VentOpticsRenderer.drawConvectiveMineralPlumes(ctx, vents, tick);
            ctx.restore();
        }

        /**
         * Render cellular thermal boundary layer, negative thermotaxis repulsion, and sulfur vacuoles.
         */
        static drawCellThermalAura(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const temp = typeof org.thermalExposure === "number" ? org.thermalExposure : 2.0;
            const strain = typeof org.thermalStrain === "number" ? org.thermalStrain : 0.0;
            const isVent = Boolean(org.isAtVent);
            const isRepel = Boolean(org.isThermotaxisActive);
            const vacuole = typeof org.storedSulfurVacuole === "number" ? org.storedSulfurVacuole : 0.0;

            if (temp < 15.0 && !isVent && vacuole <= 1.0) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            ctx.save();

            // 1. Negative Thermotaxis: repulsive escape bow waves
            if (isRepel) {
                const repelAngle = Math.atan2(org.vy, org.vx);
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * 1.5, repelAngle - Math.PI * 0.4, repelAngle + Math.PI * 0.4);
                ctx.lineWidth = 0.95;
                ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                ctx.stroke();
            }

            // 2. Hyperthermal heat-shock stress or optimum Arrhenius aura
            if (strain > 0.05) {
                const shockPulse = 0.6 + 0.4 * Math.sin(tick * 0.35 + (org.numericId || 0));
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * (1.35 + shockPulse * 0.25), 0, Math.PI * 2);
                ctx.lineWidth = 0.9;
                ctx.strokeStyle = `rgba(239, 68, 68, ${0.40 + strain * 0.45})`;
                ctx.stroke();
            } else if (temp >= 60.0 && temp <= 98.0) {
                const catPulse = 0.5 + 0.5 * Math.sin(tick * 0.15 + (org.numericId || 0));
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * (1.25 + catPulse * 0.20), 0, Math.PI * 2);
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 + catPulse * 0.30})`;
                ctx.stroke();
            }

            // 3. Golden sulfur storage vacuole vesicles inside cellular cytoplasm
            if (vacuole > 2.0) {
                const vCount = Math.min(3, Math.floor(vacuole / 8.0) + 1);
                for (let k = 0; k < vCount; k++) {
                    const ang = (k / vCount) * Math.PI * 2 + tick * 0.03;
                    const vx = org.x + Math.cos(ang) * (size * 0.42);
                    const vy = org.y + Math.sin(ang) * (size * 0.42);
                    ctx.beginPath();
                    ctx.arc(vx, vy, 1.1, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(250, 204, 21, 0.90)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = VentOpticsRenderer;
    } else {
        global.VentOpticsRenderer = VentOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
