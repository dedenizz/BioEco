// BioEcosystem - Biomic Climate Optics, Thermocline Shaders & Upwelling Plumes
// Module: src/render/climate_optics.js
// Version: 5.98.0 (Hour 318 - Looks Agent: Surfing Wings, Baroclinic Shaders & 60-Channel Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ClimateOpticsRenderer
     * High-fidelity microscope visualization of biomic water column physics:
     * - Renders stratified water column zones: Epipelagic, Thermocline, Benthic
     * - Visualizes convective circulation streamlines and advection vector beads
     * - Renders vertical nutrient upwelling columns lifting benthic minerals
     * - Draws convective wave surfing wings and counter-swimming thrust jets
     * - Renders baroclinic lipid membrane stabilization auras and thermal shock
     */
    class ClimateOpticsRenderer {
        static drawWaterColumnStratification(ctx, width, height, tick) {
            if (!ctx) return;
            const time = tick * 0.015;
            ctx.save();

            const thermoclineY = 215.0;
            ctx.beginPath();
            ctx.moveTo(0, thermoclineY);
            for (let x = 0; x <= width; x += 30) {
                const wave = Math.sin(time + x * 0.018) * 4.5 + Math.cos(time * 0.7 + x * 0.012) * 2.5;
                ctx.lineTo(x, thermoclineY + wave);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = "rgba(6, 182, 212, 0.025)";
            ctx.fill();

            ctx.beginPath();
            for (let x = 0; x <= width; x += 20) {
                const wave = Math.sin(time + x * 0.018) * 4.5 + Math.cos(time * 0.7 + x * 0.012) * 2.5;
                if (x === 0) ctx.moveTo(x, thermoclineY + wave);
                else ctx.lineTo(x, thermoclineY + wave);
            }
            ctx.lineWidth = 0.8;
            ctx.setLineDash([6, 6]);
            ctx.strokeStyle = "rgba(56, 189, 248, 0.20)";
            ctx.stroke();
            ctx.setLineDash([]);

            const benthicY = 450.0;
            ctx.beginPath();
            ctx.moveTo(0, benthicY);
            for (let x = 0; x <= width; x += 40) {
                const wave = Math.cos(time * 0.5 + x * 0.015) * 5.0;
                ctx.lineTo(x, benthicY + wave);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = "rgba(30, 27, 75, 0.05)";
            ctx.fill();
            ctx.restore();
        }

        static drawConvectionStreamlines(ctx, width, height, tick) {
            if (!ctx) return;
            ctx.save();
            const time = tick * 0.01;

            const gyreCenters = [
                { cx: 160.0, cy: 330.0, r: 120.0, dir: 1.0 },
                { cx: 500.0, cy: 330.0, r: 120.0, dir: -1.0 }
            ];

            for (let g = 0; g < gyreCenters.length; g++) {
                const gyre = gyreCenters[g];
                ctx.beginPath();
                ctx.ellipse(gyre.cx, gyre.cy, gyre.r, gyre.r * 0.75, 0, 0, Math.PI * 2);
                ctx.lineWidth = 0.6;
                ctx.setLineDash([4, 10]);
                ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
                ctx.stroke();

                const beadCount = 3;
                for (let b = 0; b < beadCount; b++) {
                    const beadPhase = (time * gyre.dir + (b / beadCount) * Math.PI * 2) % (Math.PI * 2);
                    const bx = gyre.cx + Math.cos(beadPhase) * gyre.r;
                    const by = gyre.cy + Math.sin(beadPhase) * (gyre.r * 0.75);

                    ctx.beginPath();
                    ctx.arc(bx, by, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(125, 211, 252, 0.35)";
                    ctx.fill();
                }
            }

            ctx.setLineDash([]);
            ctx.restore();
        }

        static drawUpwellingPlumes(ctx, width, height, tick, thermohalineSys) {
            if (!ctx) return;
            const plumes = (thermohalineSys && thermohalineSys.plumes) ? thermohalineSys.plumes : [
                { x: 190.0, radius: 75.0, fluxRate: 0.85 },
                { x: 470.0, radius: 80.0, fluxRate: 0.90 }
            ];

            ctx.save();
            const time = tick * 0.02;

            for (let i = 0; i < plumes.length; i++) {
                const p = plumes[i];
                const pulse = 0.5 + 0.5 * Math.sin(time + i * 1.5);
                const plumeAlpha = 0.04 + pulse * 0.035;

                const grad = ctx.createLinearGradient(0, height, 0, 100);
                grad.addColorStop(0.0, `rgba(16, 185, 129, ${plumeAlpha * 1.5})`);
                grad.addColorStop(0.6, `rgba(6, 182, 212, ${plumeAlpha})`);
                grad.addColorStop(1.0, "rgba(6, 182, 212, 0.0)");

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.moveTo(p.x - p.radius * 0.5, height);
                ctx.lineTo(p.x - p.radius * 0.85, 140);
                ctx.lineTo(p.x + p.radius * 0.85, 140);
                ctx.lineTo(p.x + p.radius * 0.5, height);
                ctx.closePath();
                ctx.fill();

                ctx.lineWidth = 0.75;
                ctx.setLineDash([3, 6]);
                ctx.strokeStyle = `rgba(52, 211, 153, ${0.18 + pulse * 0.12})`;
                ctx.beginPath();
                ctx.moveTo(p.x - p.radius * 0.5, height);
                ctx.lineTo(p.x - p.radius * 0.85, 140);
                ctx.moveTo(p.x + p.radius * 0.5, height);
                ctx.lineTo(p.x + p.radius * 0.85, 140);
                ctx.stroke();
                ctx.setLineDash([]);

                const bubbleCount = 4;
                for (let b = 0; b < bubbleCount; b++) {
                    const bubblePhase = (time * 0.8 + (b / bubbleCount) + i * 0.5) % 1.0;
                    const by = height - bubblePhase * (height - 130.0);
                    const lateralSway = Math.sin(time * 2.0 + b + i) * (p.radius * 0.35);
                    const bx = p.x + lateralSway;

                    ctx.beginPath();
                    ctx.arc(bx, by, 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = b % 2 === 0 ? "rgba(251, 191, 36, 0.75)" : "rgba(167, 243, 208, 0.75)";
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        static drawCellClimateOptics(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            // 1. Convective Wave Surfing Wings & Lift Trail
            if (org.convectiveSurfingActive) {
                const pulse = 0.5 + 0.5 * Math.sin(tick * 0.22 + (org.id || 0));
                ctx.beginPath();
                ctx.moveTo(org.x - size * 1.2, org.y + size * 0.4);
                ctx.quadraticCurveTo(org.x, org.y + size * 1.6, org.x + size * 1.2, org.y + size * 0.4);
                ctx.lineWidth = 1.0;
                ctx.strokeStyle = `rgba(234, 179, 8, ${0.45 + pulse * 0.35})`;
                ctx.stroke();
            }

            // 2. Rheotactic Counter-Swimming Reverse Thrust Jet
            if (org.isCounterSwimming) {
                const advX = org.currentAdvectionX || 0.0;
                const advY = org.currentAdvectionY || 0.0;
                ctx.beginPath();
                ctx.arc(org.x + advX * 8.0, org.y + advY * 8.0, 1.3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
                ctx.fill();
            }

            // 3. Baroclinic Membrane Buffer Aura or Thermal Shock Shudder
            if (org.thermalShockTimer > 0) {
                const shudder = (tick % 2 === 0 ? -1.0 : 1.0) * 0.8;
                ctx.beginPath();
                ctx.arc(org.x + shudder, org.y, size * 1.25, 0, Math.PI * 2);
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = "rgba(147, 197, 253, 0.75)";
                ctx.stroke();
            } else if ((org.baroclinicThermalBuffer || 0) > 0.45) {
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * 1.15, 0, Math.PI * 2);
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
                ctx.stroke();
            }

            // 4. Nutrient Upwelling Assimilation Glow
            if (org.inUpwellingPlume && (org.upwellingNutrientAssimilation || 0) > 0.05) {
                const pulse = 0.5 + 0.5 * Math.sin(tick * 0.18 + (org.id || 0));
                const glowR = size * (1.3 + pulse * 0.2);
                ctx.beginPath();
                ctx.arc(org.x, org.y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${0.08 + pulse * 0.10})`;
                ctx.fill();
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = `rgba(251, 191, 36, ${0.35 + pulse * 0.25})`;
                ctx.stroke();
            }

            // 5. Strong Advection Current Wake
            const advX = org.currentAdvectionX || 0.0;
            const advY = org.currentAdvectionY || 0.0;
            const advSpeed = Math.hypot(advX, advY);
            if (advSpeed > 0.22 && !org.convectiveSurfingActive) {
                ctx.beginPath();
                ctx.moveTo(org.x, org.y);
                ctx.lineTo(org.x - advX * 12.0, org.y - advY * 12.0);
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
                ctx.stroke();
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ClimateOpticsRenderer;
    } else {
        global.ClimateOpticsRenderer = ClimateOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
