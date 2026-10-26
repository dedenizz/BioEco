// BioEcosystem - Abyssal Hydrothermal Vents, Black Smoker Plumes & Deep-Sea Radiance Optics
// Module: src/render/abyssal_optics.js
// Version: 5.23.0 (Hour 243 - Looks Agent: Abyssal Hydrothermal Vents & Thermal Radiance Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AbyssalOpticsRenderer
     * Provides high-fidelity microscope aesthetics for deep-sea aphotic environments:
     * - Bathymetric aphotic depth shadows and marine snow turbidity
     * - Benthic basalt chimney spires and incandescent hydrothermal cores
     * - Convective black smoker mineral plumes and turbulent billow dispersion
     * - Microbial sulfur metabolizing auras and barophilic membrane pressure rings
     */
    class AbyssalOpticsRenderer {
        /**
         * Render aphotic benthic depth transition layer (y > 450px) and deep marine snow.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {number} width - Canvas viewport width.
         * @param {number} height - Canvas viewport height.
         * @param {number} tick - Current simulation frame count.
         */
        static drawAphoticBathymetry(ctx, width, height, tick) {
            if (!ctx) return;

            const aphoticY = 440.0;
            if (height <= aphoticY) return;

            ctx.save();

            // 1. Abyssal oceanic bathymetric shadow gradient
            const abyssalGrad = ctx.createLinearGradient(0, aphoticY, 0, height);
            abyssalGrad.addColorStop(0.0, "rgba(2, 6, 18, 0.0)");
            abyssalGrad.addColorStop(0.35, "rgba(2, 6, 23, 0.28)");
            abyssalGrad.addColorStop(1.0, "rgba(1, 3, 10, 0.58)");

            ctx.fillStyle = abyssalGrad;
            ctx.fillRect(0, aphoticY, width, height - aphoticY);

            // 2. Deep marine snow and benthic colloidal drifting flecks
            const fleckCount = 14;
            ctx.fillStyle = "rgba(148, 163, 184, 0.18)";
            for (let i = 0; i < fleckCount; i++) {
                const seed = (i * 137.5) % 1.0;
                const fx = (seed * width + Math.sin(tick * 0.015 + i) * 18.0) % width;
                const fy = aphoticY + ((tick * (0.18 + seed * 0.22) + i * 28.0) % (height - aphoticY));
                const fRadius = 0.8 + seed * 1.4;

                ctx.beginPath();
                ctx.arc(fx, fy, fRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render hydrothermal vent chimneys, basalt pedestals, and incandescent thermal cores.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Array<Object>} vents - List of hydrothermal vent chimneys.
         * @param {number} tick - Current simulation frame count.
         */
        static drawHydrothermalVents(ctx, vents, tick) {
            if (!ctx || !vents || !Array.isArray(vents)) return;

            ctx.save();

            for (let i = 0; i < vents.length; i++) {
                const vent = vents[i];
                if (!vent) continue;

                const vx = vent.x;
                const vy = vent.y;
                const vr = vent.radius || 28.0;
                const thermal = vent.thermalCore || 380.0;
                const pulse = Math.sin(tick * 0.08 + i * 1.8);

                // 1. Broad benthic thermal radiance glow (infrared illumination of seabed)
                const radianceRadius = vr * (2.8 + pulse * 0.15);
                const radianceGrad = ctx.createRadialGradient(vx, vy - 6.0, vr * 0.3, vx, vy - 6.0, radianceRadius);
                radianceGrad.addColorStop(0.0, "rgba(234, 88, 12, 0.32)");
                radianceGrad.addColorStop(0.45, "rgba(180, 40, 10, 0.14)");
                radianceGrad.addColorStop(1.0, "rgba(120, 20, 10, 0.0)");

                ctx.beginPath();
                ctx.arc(vx, vy - 6.0, radianceRadius, 0, Math.PI * 2);
                ctx.fillStyle = radianceGrad;
                ctx.fill();

                // 2. Basalt mound pedestal and tectonic crust
                ctx.beginPath();
                ctx.ellipse(vx, vy + 4.0, vr * 1.25, vr * 0.55, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(24, 24, 27, 0.85)";
                ctx.fill();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = "rgba(63, 63, 70, 0.65)";
                ctx.stroke();

                // 3. Sulfide and chalcopyrite chimney spire (calcite column)
                ctx.beginPath();
                ctx.moveTo(vx - vr * 0.75, vy + 4.0);
                ctx.lineTo(vx - vr * 0.42, vy - vr * 0.95);
                ctx.lineTo(vx + vr * 0.42, vy - vr * 0.95);
                ctx.lineTo(vx + vr * 0.75, vy + 4.0);
                ctx.closePath();

                const chimneyGrad = ctx.createLinearGradient(vx - vr, vy, vx + vr, vy);
                chimneyGrad.addColorStop(0.0, "rgba(39, 39, 42, 0.95)");
                chimneyGrad.addColorStop(0.35, "rgba(63, 63, 70, 0.90)");
                chimneyGrad.addColorStop(0.65, "rgba(82, 82, 91, 0.92)");
                chimneyGrad.addColorStop(1.0, "rgba(24, 24, 27, 0.98)");

                ctx.fillStyle = chimneyGrad;
                ctx.fill();
                ctx.lineWidth = 1.2;
                ctx.strokeStyle = "rgba(113, 113, 122, 0.75)";
                ctx.stroke();

                // 4. Sulfur precipitate crust rings on chimney rim
                ctx.beginPath();
                ctx.ellipse(vx, vy - vr * 0.95, vr * 0.42, vr * 0.18, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(234, 179, 8, 0.75)";
                ctx.fill();
                ctx.lineWidth = 1.0;
                ctx.strokeStyle = "rgba(202, 138, 4, 0.90)";
                ctx.stroke();

                // 5. Incandescent thermal vent core opening (superheated mineral vent mouth)
                const corePulse = 0.85 + Math.sin(tick * 0.12 + i) * 0.15;
                ctx.beginPath();
                ctx.ellipse(vx, vy - vr * 0.95, vr * 0.28, vr * 0.11, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 146, 60, ${0.85 * corePulse})`;
                ctx.fill();

                // Thermal shimmer apex dot
                ctx.beginPath();
                ctx.arc(vx, vy - vr * 0.95, vr * 0.14, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(254, 240, 138, 0.95)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render convective black smoker mineral plumes and turbulent buoyant sulfur billows.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Array<Object>} vents - List of hydrothermal vent chimneys.
         * @param {number} tick - Current simulation frame count.
         */
        static drawMineralPlumes(ctx, vents, tick) {
            if (!ctx || !vents || !Array.isArray(vents)) return;

            ctx.save();

            for (let i = 0; i < vents.length; i++) {
                const vent = vents[i];
                if (!vent || !vent.plumeParticles) continue;

                const particles = vent.plumeParticles;
                for (let j = 0; j < particles.length; j++) {
                    const p = particles[j];
                    if (!p || p.life <= 0.0) continue;

                    const pLife = Math.max(0.0, Math.min(1.0, p.life));
                    const progress = 1.0 - pLife;
                    const pRadius = 3.5 + progress * 13.5;
                    const pAlpha = pLife * 0.52;

                    // Convective billow radial density gradient
                    const billowGrad = ctx.createRadialGradient(p.x, p.y, pRadius * 0.15, p.x, p.y, pRadius);
                    
                    // Warm amber tint near vent exit transitioning to dark polymetallic sulfide smoke
                    if (progress < 0.25) {
                        const exitWarmth = (1.0 - progress / 0.25) * 0.60;
                        billowGrad.addColorStop(0.0, `rgba(234, 88, 12, ${pAlpha * (0.8 + exitWarmth)})`);
                        billowGrad.addColorStop(0.45, `rgba(68, 64, 60, ${pAlpha * 0.75})`);
                        billowGrad.addColorStop(1.0, "rgba(28, 25, 23, 0.0)");
                    } else {
                        billowGrad.addColorStop(0.0, `rgba(41, 37, 36, ${pAlpha * 0.85})`);
                        billowGrad.addColorStop(0.55, `rgba(68, 64, 60, ${pAlpha * 0.50})`);
                        billowGrad.addColorStop(1.0, "rgba(28, 25, 23, 0.0)");
                    }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, pRadius, 0, Math.PI * 2);
                    ctx.fillStyle = billowGrad;
                    ctx.fill();

                    // Microscopic sulfur glitter sparkles inside mineral upwelling
                    if (pLife > 0.40 && (j + tick) % 3 === 0) {
                        ctx.beginPath();
                        ctx.arc(p.x + (Math.sin(j * 3.7) * 2.0), p.y, 1.1, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(250, 204, 21, ${pLife * 0.70})`;
                        ctx.fill();
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render microbial sulfur oxidation aura and hydrostatic barophilic pressure strain rings on cells.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D graphics context.
         * @param {Object} org - Host organism.
         * @param {number} tick - Current simulation frame count.
         */
        static drawOrganismChemoAura(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const sulfur = typeof org.storedSulfur === "number" ? org.storedSulfur : 0.0;
            const yieldATP = typeof org.chemosyntheticYield === "number" ? org.chemosyntheticYield : 0.0;
            const baroStrain = typeof org.barophilicStrain === "number" ? org.barophilicStrain : 0.0;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            // 1. Chemoautotrophic sulfur metabolism metabolic aura
            if (sulfur > 0.4 || yieldATP > 0.01) {
                const normSulfur = Math.min(1.0, sulfur / 25.0);
                const auraRadius = size * (1.30 + normSulfur * 0.45);
                const pulse = Math.sin(tick * 0.10 + (org.numericId || 0)) * 0.08;
                const auraAlpha = Math.min(0.45, 0.12 + normSulfur * 0.28 + pulse);

                const chemoGrad = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, auraRadius);
                chemoGrad.addColorStop(0.0, "rgba(234, 179, 8, 0.0)");
                chemoGrad.addColorStop(0.70, `rgba(234, 179, 8, ${auraAlpha})`);
                chemoGrad.addColorStop(1.0, "rgba(202, 138, 4, 0.0)");

                ctx.beginPath();
                ctx.arc(0, 0, auraRadius, 0, Math.PI * 2);
                ctx.fillStyle = chemoGrad;
                ctx.fill();
            }

            // 2. Active hydrothermal vent feeding absorption tendrils
            if (org.isAtVent) {
                const ventProximity = typeof org.ventProximity === "number" ? org.ventProximity : 0.5;
                const beamAlpha = Math.min(0.55, 0.20 + ventProximity * 0.35);
                ctx.lineWidth = 1.0;
                ctx.strokeStyle = `rgba(251, 146, 60, ${beamAlpha})`;
                ctx.beginPath();
                const flareLen = size * 1.6;
                const angle = (tick * 0.06 + (org.numericId || 0)) % (Math.PI * 2);
                ctx.arc(0, 0, flareLen, angle, angle + Math.PI * 0.35);
                ctx.stroke();
            }

            // 3. Hydrostatic barophilic membrane compression ring (piezotolerance visualization)
            if (baroStrain > 0.12) {
                const strainAlpha = Math.min(0.60, baroStrain * 0.70);
                const ringRadius = size * 1.12;

                ctx.lineWidth = 1.2;
                ctx.strokeStyle = `rgba(56, 189, 248, ${strainAlpha})`;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = AbyssalOpticsRenderer;
    } else {
        global.AbyssalOpticsRenderer = AbyssalOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
