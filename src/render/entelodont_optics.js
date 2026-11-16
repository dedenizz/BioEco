// BioEcosystem - Oligocene-Early Miocene Apex Omnivore Radiation: Entelodontidae Optics & Zygomatic Flanges
// Module: src/render/entelodont_optics.js
// Version: 9.37.0 (Hour 657 - Looks & UI Agent: Masif Kranial Flans Profili, Cene Alti Tuberkulleri, Kemik Ezme Sok Dalgalari & 141/142 Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EntelodontOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Oligocene-Early Miocene "Hell Pigs" (Entelodontidae - Archaeotherium, Daeodon / Dinohyus):
     * - Massive Elongated Cranium & Sagittal Crest:
     *   Reinforced 1-meter equivalent skull (#334155, #1e293b) with towering sagittal crest anchoring masseter/temporalis muscles.
     * - Wing-Like Lateral Zygomatic Flanges:
     *   Broad osseous lateral cheek expansions (#e2e8f0, #94a3b8) shielding temporal muscle fossa and eyes during infraspecific face-biting combat.
     * - Mandibular Ventral Bone Tubercles:
     *   Paired protective bone studs projecting beneath the lower jaw (#cbd5e1), guarding delicate throat vessels from upward laceration.
     * - Interlocking Conical Canines & Premolar Crushing Occlusion:
     *   Formidable interlocking ivory tusk-like canines (#f8fafc) and heavy conical premolars specialized for fracturing thick cortical bones.
     * - Dorsal Wither Spine Hump & Cervical Whip Tension Lines:
     *   Elevated thoracic neural spines (#dc2626 muscular tension lines) anchoring the powerful ligamentum nuchae for skull whipping.
     * - Bone-Cracking Shockwaves & Marrow Extraction Sparks:
     *   Explosive radial fracture ripples (rgba(226, 232, 240, 0.85)) and bone splinter sparks flashing upon carcass bone destruction.
     * - Infraspecific Facial Clash Deflect Auras:
     *   Crimson-graphite clash deflection arcs (rgba(220, 38, 38, 0.75)) flashing across the zygomatic flanges during combat.
     */
    class EntelodontOpticsRenderer {
        /**
         * Render Entelodont anatomical features and kinetic shaders for a given organism.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Entelodont organism instance.
         * @param {number} tick - Current simulation tick counter.
         */
        static drawEntelodont(ctx, org, tick) {
            if (!ctx || !org || !org.isEntelodont) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const isDaeodon = !!org.isDaeodon;
            const baseRadius = org.radius || (isDaeodon ? 16.5 : 13.5);
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);

            // Morphological parameters
            const crush = org.craniomandibularCrushForce || 3500;
            const flangeExp = org.zygomaticFlangeExpansion || 0.86;
            const tubercleDef = org.mandibularTubercleDefense || 0.83;
            const wither = org.dorsalWitherSpineSupport || 0.82;
            const whip = org.cervicalWhipTorque || 0.86;
            const isCrushing = !!org.isBoneCrushing;
            const isDefending = !!org.isFlangeDefending;

            ctx.save();
            ctx.translate(x, y);

            // 1. Infraspecific Facial Clash Deflection Shield (Flange Defense Aura)
            if (isDefending) {
                const defendPulse = 0.5 + 0.5 * Math.sin(t * 0.25);
                const shieldRadius = baseRadius * (1.8 + defendPulse * 0.35);
                const shieldGrad = ctx.createRadialGradient(0, 0, baseRadius * 0.8, 0, 0, shieldRadius);
                shieldGrad.addColorStop(0, "rgba(220, 38, 38, 0.25)");
                shieldGrad.addColorStop(0.6, "rgba(71, 85, 105, 0.20)");
                shieldGrad.addColorStop(1, "rgba(220, 38, 38, 0)");
                ctx.fillStyle = shieldGrad;
                ctx.beginPath();
                ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
                ctx.fill();

                // Deflection shock arc
                ctx.strokeStyle = "rgba(220, 38, 38, 0.80)";
                ctx.lineWidth = 2.0;
                ctx.setLineDash([4, 3]);
                ctx.beginPath();
                ctx.arc(0, 0, shieldRadius * 0.9, -Math.PI * 0.4, Math.PI * 0.4);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // 2. Bone-Cracking Explosive Fracture Shockwaves (2500 - 4500 N Crush Event)
            if (isCrushing) {
                const crushIntensity = Math.min(1.0, (crush - 2500) / 2000);
                const shockRadius = baseRadius * (2.0 + crushIntensity * 0.8);

                ctx.strokeStyle = "rgba(226, 232, 240, 0.90)"; // Bone-white shockwave
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(0, 0, shockRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Bone splinter fragments radiating outwards
                const numSplinters = 6;
                ctx.fillStyle = "#f8fafc";
                for (let k = 0; k < numSplinters; k++) {
                    const spAngle = (k * (Math.PI * 2 / numSplinters)) + Math.sin(t * 0.3);
                    const spDist = shockRadius * (0.6 + 0.4 * ((k % 2 === 0) ? 1.0 : 0.7));
                    const spX = Math.cos(spAngle) * spDist;
                    const spY = Math.sin(spAngle) * spDist;

                    ctx.beginPath();
                    ctx.arc(spX, spY, baseRadius * 0.12, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Orient along movement velocity vector
            ctx.rotate(angle);

            // 3. Cursorial Sub-Unguligrade Limbs & Didactyl Cloven Hooves
            const legDistX = baseRadius * 0.55;
            const legDistY = baseRadius * 0.58;
            const legW = baseRadius * 0.22;
            const legL = baseRadius * 0.52;

            ctx.fillStyle = "#1e293b";
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1.2;

            // Forelimbs
            [-legDistY, legDistY].forEach((ly) => {
                ctx.beginPath();
                ctx.rect(legDistX * 0.3 - legW * 0.5, ly - legL * 0.5, legW, legL);
                ctx.fill();
                ctx.stroke();
            });

            // Hindlimbs
            [-legDistY, legDistY].forEach((ly) => {
                ctx.beginPath();
                ctx.rect(-legDistX * 0.8 - legW * 0.5, ly - legL * 0.5, legW, legL);
                ctx.fill();
                ctx.stroke();
            });

            // Cloven didactyl hooves (tips)
            ctx.fillStyle = "#0f172a";
            [-legDistY, legDistY].forEach((ly) => {
                ctx.beginPath();
                ctx.rect(legDistX * 0.3 - legW * 0.5, ly + (ly > 0 ? legL * 0.4 : -legL * 0.6), legW * 1.2, legL * 0.25);
                ctx.rect(-legDistX * 0.8 - legW * 0.5, ly + (ly > 0 ? legL * 0.4 : -legL * 0.6), legW * 1.2, legL * 0.25);
                ctx.fill();
            });

            // 4. Barrel Torso with Prominent Dorsal Wither Spine Hump
            const bodyGrad = ctx.createLinearGradient(-baseRadius * 1.1, 0, baseRadius * 0.7, 0);
            bodyGrad.addColorStop(0, "#1e293b"); // Slate dark rump
            bodyGrad.addColorStop(0.35, "#334155"); // Mid-torso
            bodyGrad.addColorStop(0.7, isDaeodon ? "#475569" : "#3b4759"); // Wither hump
            bodyGrad.addColorStop(1, "#1e293b"); // Shoulder base

            ctx.fillStyle = bodyGrad;
            ctx.strokeStyle = isCrushing ? "#dc2626" : "#475569";
            ctx.lineWidth = isCrushing ? 2.4 : 1.8;

            ctx.beginPath();
            // Barrel torso with prominent elevated wither hump over shoulders
            const witherHeight = baseRadius * (0.85 + wither * 0.35);
            ctx.moveTo(baseRadius * 0.6, 0);
            ctx.bezierCurveTo(baseRadius * 0.4, -witherHeight, -baseRadius * 0.2, -witherHeight * 1.05, -baseRadius * 0.9, -baseRadius * 0.55);
            ctx.bezierCurveTo(-baseRadius * 1.25, -baseRadius * 0.25, -baseRadius * 1.25, baseRadius * 0.25, -baseRadius * 0.9, baseRadius * 0.55);
            ctx.bezierCurveTo(-baseRadius * 0.2, witherHeight * 1.05, baseRadius * 0.4, witherHeight, baseRadius * 0.6, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Cervical ligament tension lines over wither
            ctx.strokeStyle = "rgba(220, 38, 38, " + (0.45 * whip).toFixed(3) + ")";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(baseRadius * 0.4, -baseRadius * 0.5);
            ctx.lineTo(-baseRadius * 0.3, -witherHeight * 0.85);
            ctx.moveTo(baseRadius * 0.4, baseRadius * 0.5);
            ctx.lineTo(-baseRadius * 0.3, witherHeight * 0.85);
            ctx.stroke();

            // 5. Massive Elongated Cranium (Nearly 1 Meter Proportion)
            const headStartX = baseRadius * 0.5;
            const skullLen = baseRadius * (1.15 + (isDaeodon ? 0.35 : 0.15));
            const skullW = baseRadius * 0.46;

            const skullGrad = ctx.createLinearGradient(headStartX, 0, headStartX + skullLen, 0);
            skullGrad.addColorStop(0, "#334155");
            skullGrad.addColorStop(0.5, "#1e293b");
            skullGrad.addColorStop(1, "#0f172a");

            ctx.fillStyle = skullGrad;
            ctx.strokeStyle = isDefending ? "#dc2626" : "#e2e8f0";
            ctx.lineWidth = 1.6;

            ctx.beginPath();
            ctx.moveTo(headStartX, -skullW * 0.5);
            ctx.lineTo(headStartX + skullLen * 0.55, -skullW * 0.4);
            ctx.lineTo(headStartX + skullLen, -skullW * 0.18); // Snout tip top
            ctx.lineTo(headStartX + skullLen, skullW * 0.18); // Snout tip bottom
            ctx.lineTo(headStartX + skullLen * 0.55, skullW * 0.4);
            ctx.lineTo(headStartX, skullW * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 6. Wing-Like Lateral Zygomatic Flanges (Cheek Armor Wings)
            const flangeX = headStartX + skullLen * 0.40;
            const flangeSpan = baseRadius * (0.65 + flangeExp * 0.55);
            const flangeW = baseRadius * 0.32;

            ctx.fillStyle = "#475569";
            ctx.strokeStyle = "#e2e8f0"; // Bone-white flange border
            ctx.lineWidth = 2.0;

            // Left lateral flange
            ctx.beginPath();
            ctx.moveTo(flangeX - flangeW * 0.5, -skullW * 0.38);
            ctx.lineTo(flangeX, -skullW * 0.38 - flangeSpan);
            ctx.lineTo(flangeX + flangeW * 0.6, -skullW * 0.38 - flangeSpan * 0.65);
            ctx.lineTo(flangeX + flangeW * 0.5, -skullW * 0.38);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Right lateral flange
            ctx.beginPath();
            ctx.moveTo(flangeX - flangeW * 0.5, skullW * 0.38);
            ctx.lineTo(flangeX, skullW * 0.38 + flangeSpan);
            ctx.lineTo(flangeX + flangeW * 0.6, skullW * 0.38 + flangeSpan * 0.65);
            ctx.lineTo(flangeX + flangeW * 0.5, skullW * 0.38);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 7. Mandibular Ventral Bone Tubercles (Throat Guard Knobs)
            const tubercleX = headStartX + skullLen * 0.65;
            const tubercleSize = baseRadius * (0.18 + tubercleDef * 0.15);

            ctx.fillStyle = "#cbd5e1"; // Pale osseous tubercle
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1.0;

            // Ventral knob pairs
            [-skullW * 0.28, skullW * 0.28].forEach((ty) => {
                ctx.beginPath();
                ctx.arc(tubercleX, ty, tubercleSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            });

            // 8. Interlocking Conical Canines & Incisors
            const snoutTipX = headStartX + skullLen;
            const canineLen = baseRadius * 0.35;

            ctx.fillStyle = "#f8fafc"; // Ivory canine
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.0;

            // Upper canines pointing down/out
            ctx.beginPath();
            ctx.moveTo(snoutTipX - baseRadius * 0.15, -skullW * 0.15);
            ctx.lineTo(snoutTipX + canineLen * 0.6, -skullW * 0.35);
            ctx.lineTo(snoutTipX + canineLen * 0.2, -skullW * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(snoutTipX - baseRadius * 0.15, skullW * 0.15);
            ctx.lineTo(snoutTipX + canineLen * 0.6, skullW * 0.35);
            ctx.lineTo(snoutTipX + canineLen * 0.2, skullW * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Deep set eye sockets (predatory dark amber optics)
            ctx.fillStyle = "#f59e0b";
            [-skullW * 0.25, skullW * 0.25].forEach((ey) => {
                ctx.beginPath();
                ctx.arc(headStartX + skullLen * 0.25, ey, baseRadius * 0.08, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
        }

        /**
         * Batch render all Entelodontidae organisms in an active ecosystem population.
         * @param {CanvasRenderingContext2D} ctx - Target canvas rendering context.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Current simulation tick counter.
         */
        static renderAll(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;
            const t = tick || 0;
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (org && org.isEntelodont) {
                    EntelodontOpticsRenderer.drawEntelodont(ctx, org, t);
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EntelodontOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.EntelodontOpticsRenderer = EntelodontOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
