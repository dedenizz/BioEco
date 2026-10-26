// BioEcosystem - Biological Iridescence, Interference Sheen & Dazzle Glare Optics
// Module: src/render/iridescence_optics.js
// Version: 5.18.0 (Hour 238 - Looks Agent: Structural Iridescence & Specular Highlight Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class IridescenceOpticsRenderer {
        // Convert physical thin-film interference wavelength (nm) to spectral RGB components
        static wavelengthToRGB(wl, alpha) {
            let r = 0.0, g = 0.0, b = 0.0;

            if (wl >= 380 && wl < 440) {
                r = -(wl - 440) / (440 - 380);
                g = 0.0;
                b = 1.0;
            } else if (wl >= 440 && wl < 490) {
                r = 0.0;
                g = (wl - 440) / (490 - 440);
                b = 1.0;
            } else if (wl >= 490 && wl < 510) {
                r = 0.0;
                g = 1.0;
                b = -(wl - 510) / (510 - 490);
            } else if (wl >= 510 && wl < 580) {
                r = (wl - 510) / (580 - 510);
                g = 1.0;
                b = 0.0;
            } else if (wl >= 580 && wl < 645) {
                r = 1.0;
                g = -(wl - 645) / (645 - 580);
                b = 0.0;
            } else if (wl >= 645 && wl <= 780) {
                r = 1.0;
                g = 0.0;
                b = 0.0;
            } else {
                r = 0.5; g = 0.8; b = 1.0;
            }

            const red = Math.round(r * 255);
            const green = Math.round(g * 255);
            const blue = Math.round(b * 255);
            const a = Math.max(0.0, Math.min(1.0, alpha !== undefined ? alpha : 1.0));

            return `rgba(${red}, ${green}, ${blue}, ${a})`;
        }

        // Draw structural iridescence sheen, crystal reflections, and countershading highlights
        static drawIridescence(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const refl = typeof org.specularReflectance === "number" ? org.specularReflectance : 0.20;
            if (refl < 0.06) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const wl = typeof org.interferenceWavelength === "number" ? org.interferenceWavelength : 490;
            const counter = typeof org.countershadingScore === "number" ? org.countershadingScore : 0.45;
            const isDazzle = !!org.dazzleActive;

            ctx.save();

            // 1. Concentric Thin-Film Interference Sheen Rings
            const ringCount = Math.max(2, Math.min(4, Math.floor(size * 0.4)));
            const phase = (tick * 0.04) + (org.id ? org.id.charCodeAt(0) * 0.15 : 0);

            for (let i = 0; i < ringCount; i++) {
                const ringRad = size * (0.65 + i * 0.11);
                const ringWl = wl + Math.sin(phase + i * 1.2) * 35.0;
                const ringAlpha = Math.min(0.65, refl * (0.35 + (i * 0.10)));

                ctx.lineWidth = 0.85;
                ctx.strokeStyle = IridescenceOpticsRenderer.wavelengthToRGB(ringWl, ringAlpha);

                ctx.beginPath();
                // Arc focused along the dorsal-ventral reflection tangent
                const startAngle = phase + i * 0.8;
                const arcLength = Math.PI * (0.6 + refl * 0.6);
                ctx.arc(0, 0, ringRad, startAngle, startAngle + arcLength);
                ctx.stroke();
            }

            // 2. Silvery Ventral Countershading Specular Crescent
            if (counter > 0.30) {
                const crescentRad = size * 0.88;
                const crescentAlpha = Math.min(0.70, counter * refl * 0.85);

                const grad = ctx.createLinearGradient(0, -size, 0, size);
                grad.addColorStop(0.0, "rgba(15, 23, 42, 0.0)"); // Dark dorsal absorption
                grad.addColorStop(0.5, "rgba(224, 242, 254, 0.05)");
                grad.addColorStop(1.0, `rgba(240, 249, 255, ${crescentAlpha})`); // Bright silvery ventral reflection

                ctx.beginPath();
                ctx.arc(0, 0, crescentRad, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // 3. Guanine Platelet Crystalline Sparkle Puncta
            const plateletCount = Math.max(3, Math.min(7, Math.floor(size * 0.6)));
            for (let j = 0; j < plateletCount; j++) {
                const pAngle = (j / plateletCount) * Math.PI * 2 + Math.sin(tick * 0.02 + j) * 0.4;
                const pDist = size * (0.40 + (j % 3) * 0.15);
                const px = Math.cos(pAngle) * pDist;
                const py = Math.sin(pAngle) * pDist;

                const sparklePhase = Math.sin(tick * 0.08 + j * 1.7);
                if (sparklePhase > 0.2) {
                    const sparkAlpha = Math.min(0.85, sparklePhase * refl);
                    ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlpha})`;
                    ctx.beginPath();
                    ctx.arc(px, py, 0.85, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 4. Specular Dazzle Glare Burst (when startled or assaulted)
            if (isDazzle) {
                ctx.lineWidth = 1.2;
                ctx.strokeStyle = "rgba(254, 240, 138, 0.85)"; // Dazzling pale gold / white specular glare

                // Cross-diffraction glare rays
                const rayLen = size * 1.8;
                ctx.beginPath();
                ctx.moveTo(-rayLen, 0); ctx.lineTo(rayLen, 0);
                ctx.moveTo(0, -rayLen); ctx.lineTo(0, rayLen);
                ctx.stroke();

                // Core chromatic glare halo
                const glareGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.3);
                glareGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.90)");
                glareGrad.addColorStop(0.4, IridescenceOpticsRenderer.wavelengthToRGB(wl, 0.65));
                glareGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

                ctx.beginPath();
                ctx.arc(0, 0, size * 1.3, 0, Math.PI * 2);
                ctx.fillStyle = glareGrad;
                ctx.fill();
            }

            ctx.restore();
        }

        // Draw global specular glare stars and chromatic flashes across the dish
        static drawDazzleGlares(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.dazzleActive) continue;

                const x = org.x;
                const y = org.y;
                const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
                const flareRad = size * 2.2;

                ctx.save();
                ctx.lineWidth = 0.9;
                ctx.strokeStyle = "rgba(224, 242, 254, 0.75)";

                // Diagonal diffraction spikes
                const dLen = size * 1.6;
                ctx.beginPath();
                ctx.moveTo(x - dLen, y - dLen); ctx.lineTo(x + dLen, y + dLen);
                ctx.moveTo(x - dLen, y + dLen); ctx.lineTo(x + dLen, y - dLen);
                ctx.stroke();

                // Soft outer flare ring
                ctx.beginPath();
                ctx.arc(x, y, flareRad, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(165, 243, 252, 0.45)";
                ctx.stroke();

                ctx.restore();
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = IridescenceOpticsRenderer;
    } else {
        global.IridescenceOpticsRenderer = IridescenceOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
