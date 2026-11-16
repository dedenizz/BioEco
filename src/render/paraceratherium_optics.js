// BioEcosystem - Early Tertiary Megaherbivore Radiation II: Paraceratherium Optics & Canopy Browsing
// Module: src/render/paraceratherium_optics.js
// Version: 9.31.0 (Hour 651 - Looks & UI Agent: 20-Ton Titan Body, Columnar Pillar Limbs, 8m Canopy Reach, Prehensile Lip & 139th/140th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ParaceratheriumOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Tertiary giant hornless rhinoceroses (Paraceratherium / Indricotheriinae):
     * - Graviportal Titan Silhouette & Pachydermal Dermis:
     *   Immense 15-20 metric ton columnar torso (#334155, #475569, #1e293b), high shoulder hump, and striated epidermal
     *   contours with soft thermal gigantothermic radiance (#059669 and #d97706 auras).
     * - Hyper-Columnar Pillar Limbs & Synovial Hydraulic Buffering:
     *   Four rigid columnar limb pillars aligned with the vertical gravitational axis, rendering bone axis alignment
     *   and subdigital fibrocartilage shock pads delivering green compressive contact waves (rgba(5, 150, 105, 0.45)).
     * - Elongated Cervical Neck & 8-Meter Canopy Browsing Reach:
     *   Extended cervical vertebral column (1.8 - 2.8 m eq) reaching vertically into the high canopy layer
     *   (canopyBrowsingReach: 6.5 - 8.5 m eq) with flexural tension rings and foliage defoliation arcs.
     * - Prehensile Proboscis Lip & Conical Incisor Stripping:
     *   Muscular tapir-like curling upper lip (#10b981 / #34d399) stripping acacia leaves from woody stems, paired with
     *   twin ivory conical incisor tusks (#f8fafc) slicing branch nodes.
     * - Canopy Foliage Caloric Assimilation & Gigantothermic Waves:
     *   Cascading emerald and amber leaf nutrient particles (rgba(5, 150, 105, 0.70) and rgba(217, 119, 6, 0.75))
     *   flowing into the oral chamber and hindgut fermentation core.
     */
    class ParaceratheriumOpticsRenderer {
        /**
         * Render Paraceratherium titanism and canopy browsing optics for a given organism.
         * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
         * @param {Object} org - Paraceratheriid organism instance.
         * @param {number} tick - Current simulation tick counter.
         */
        static drawParaceratherium(ctx, org, tick) {
            if (!ctx || !org || !org.isParaceratheriid) return;

            const t = tick || 0;
            const x = org.x || 0;
            const y = org.y || 0;
            const baseRadius = org.radius || 18.0;
            const angle = Math.atan2(org.vy || 0, org.vx || 0);
            const speed = Math.hypot(org.vx || 0, org.vy || 0);

            // Morphological parameters
            const colLock = org.hyperColumnarStanceLock || 0.88;
            const hydBuffer = org.synovialHydraulicBuffering || 0.89;
            const cervSpan = org.cervicalExtensionSpan || 2.3;
            const reach = org.canopyBrowsingReach || 7.5;
            const lipDex = org.prehensileLipDexterity || 0.83;
            const incisor = org.conicalIncisorStripping || 0.84;
            const extraction = org.foliageCaloricExtraction || 0.86;
            const giganto = org.gigantothermicMetabolicEfficiency || 0.78;
            const isBrowsing = !!org.isCanopyBrowsing;
            const isLocked = !!org.isStanceLocked;

            ctx.save();
            ctx.translate(x, y);

            // 1. Gigantothermic Dermal Radiance (Thermal Inertia Aura)
            const thermalPulse = 0.5 + 0.5 * Math.sin(t * 0.04 + (org.id || 0));
            const thermalAuraRadius = baseRadius * (1.6 + giganto * 0.5 + thermalPulse * 0.2);
            const thermalGrad = ctx.createRadialGradient(0, 0, baseRadius * 0.6, 0, 0, thermalAuraRadius);
            thermalGrad.addColorStop(0, "rgba(5, 150, 105, " + (0.12 * giganto).toFixed(3) + ")");
            thermalGrad.addColorStop(0.6, "rgba(217, 119, 6, " + (0.08 * extraction).toFixed(3) + ")");
            thermalGrad.addColorStop(1, "rgba(5, 150, 105, 0)");
            ctx.fillStyle = thermalGrad;
            ctx.beginPath();
            ctx.arc(0, 0, thermalAuraRadius, 0, Math.PI * 2);
            ctx.fill();

            // 2. Graviportal Stance Compressive Hydraulic Shock Rings (Ground Contact)
            if (isLocked || speed < 0.6) {
                const ringRadius = baseRadius * (1.3 + hydBuffer * 0.4);
                ctx.strokeStyle = "rgba(5, 150, 105, " + (0.35 * hydBuffer * colLock).toFixed(3) + ")";
                ctx.lineWidth = 2.0;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Fibrocartilage compressive cushion pads under 4 limb columns
                const padDist = baseRadius * 0.85;
                const padRadius = baseRadius * 0.28;
                ctx.fillStyle = "rgba(16, 185, 129, " + (0.40 * hydBuffer).toFixed(3) + ")";
                for (let i = 0; i < 4; i++) {
                    const padAngle = (i * Math.PI / 2) + Math.PI / 4;
                    const px = Math.cos(padAngle) * padDist;
                    const py = Math.sin(padAngle) * padDist;
                    ctx.beginPath();
                    ctx.arc(px, py, padRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = "rgba(5, 150, 105, 0.70)";
                    ctx.lineWidth = 1.0;
                    ctx.stroke();
                }
            }

            // Orient along body axis
            ctx.rotate(angle);

            // 3. Four Columnar Pillar Limbs (Fore & Hind Graviportal Pillars)
            const legDistX = baseRadius * 0.55;
            const legDistY = baseRadius * 0.65;
            const legWidth = baseRadius * 0.32;
            const legLen = baseRadius * 0.55;

            ctx.fillStyle = "#1e293b";
            ctx.strokeStyle = "#059669";
            ctx.lineWidth = 1.5;

            // Forelimbs (left & right)
            [-legDistY, legDistY].forEach((ly) => {
                ctx.beginPath();
                ctx.rect(legDistX * 0.5 - legWidth * 0.5, ly - legLen * 0.5, legWidth, legLen);
                ctx.fill();
                ctx.stroke();
            });

            // Hindlimbs (left & right)
            [-legDistY, legDistY].forEach((ly) => {
                ctx.beginPath();
                ctx.rect(-legDistX * 0.9 - legWidth * 0.5, ly - legLen * 0.5, legWidth, legLen);
                ctx.fill();
                ctx.stroke();
            });

            // 4. Massive 20-Ton Graviportal Torso (Barrel Ribcage & Wither Hump)
            const bodyGrad = ctx.createLinearGradient(-baseRadius * 1.2, 0, baseRadius * 0.9, 0);
            bodyGrad.addColorStop(0, "#1e293b"); // Slate dark rump
            bodyGrad.addColorStop(0.4, "#334155"); // Mid-barrel pachydermal grey
            bodyGrad.addColorStop(0.7, "#475569"); // High shoulder wither hump
            bodyGrad.addColorStop(1, "#334155"); // Cranial wither base

            ctx.fillStyle = bodyGrad;
            ctx.strokeStyle = isBrowsing ? "#10b981" : "#475569";
            ctx.lineWidth = isBrowsing ? 2.5 : 1.8;

            ctx.beginPath();
            // Barrel torso with prominent dorsal shoulder hump (wither)
            ctx.moveTo(baseRadius * 0.8, 0);
            ctx.bezierCurveTo(baseRadius * 0.7, -baseRadius * 0.95, -baseRadius * 0.3, -baseRadius * 1.15, -baseRadius * 1.1, -baseRadius * 0.65);
            ctx.bezierCurveTo(-baseRadius * 1.35, -baseRadius * 0.3, -baseRadius * 1.35, baseRadius * 0.3, -baseRadius * 1.1, baseRadius * 0.65);
            ctx.bezierCurveTo(-baseRadius * 0.3, baseRadius * 1.15, baseRadius * 0.7, baseRadius * 0.95, baseRadius * 0.8, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Pachydermal dermal folds and stress striae
            ctx.strokeStyle = "rgba(5, 150, 105, 0.35)";
            ctx.lineWidth = 1.0;
            for (let s = -0.6; s <= 0.4; s += 0.25) {
                const sx = baseRadius * s;
                ctx.beginPath();
                ctx.moveTo(sx, -baseRadius * 0.6);
                ctx.quadraticCurveTo(sx + baseRadius * 0.1, 0, sx, baseRadius * 0.6);
                ctx.stroke();
            }

            // 5. Elongated Cervical Neck Column (1.8 - 2.8m eq)
            const neckReachFactor = isBrowsing ? (1.3 + reach * 0.08) : (1.0 + reach * 0.04);
            const neckLen = baseRadius * (1.1 * cervSpan * 0.5) * neckReachFactor;
            const neckBaseW = baseRadius * 0.75;
            const neckTipW = baseRadius * 0.42;

            const neckGrad = ctx.createLinearGradient(baseRadius * 0.6, 0, baseRadius * 0.6 + neckLen, 0);
            neckGrad.addColorStop(0, "#475569");
            neckGrad.addColorStop(1, "#334155");

            ctx.fillStyle = neckGrad;
            ctx.strokeStyle = isBrowsing ? "#059669" : "#64748b";
            ctx.lineWidth = 1.8;

            ctx.beginPath();
            ctx.moveTo(baseRadius * 0.6, -neckBaseW * 0.5);
            ctx.lineTo(baseRadius * 0.6 + neckLen, -neckTipW * 0.5);
            ctx.lineTo(baseRadius * 0.6 + neckLen, neckTipW * 0.5);
            ctx.lineTo(baseRadius * 0.6, neckBaseW * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Cervical vertebral spine nodes along neck column
            ctx.fillStyle = "rgba(5, 150, 105, 0.65)";
            const numVerts = 5;
            for (let v = 1; v <= numVerts; v++) {
                const vx = baseRadius * 0.6 + (neckLen * (v / (numVerts + 1)));
                ctx.beginPath();
                ctx.arc(vx, 0, baseRadius * 0.10, 0, Math.PI * 2);
                ctx.fill();
            }

            // 6. Dolichocephalic Skull & Head (Long hornless head)
            const headX = baseRadius * 0.6 + neckLen;
            const headLen = baseRadius * 0.85;
            const headW = baseRadius * 0.40;

            ctx.fillStyle = "#1e293b";
            ctx.strokeStyle = isBrowsing ? "#34d399" : "#059669";
            ctx.lineWidth = 1.6;

            ctx.beginPath();
            ctx.moveTo(headX, -headW * 0.5);
            ctx.lineTo(headX + headLen * 0.7, -headW * 0.35);
            ctx.lineTo(headX + headLen, 0); // Snout tip
            ctx.lineTo(headX + headLen * 0.7, headW * 0.35);
            ctx.lineTo(headX, headW * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Lateral eye sockets (darkfield amber optics)
            ctx.fillStyle = "#fbbf24";
            [-headW * 0.30, headW * 0.30].forEach((ey) => {
                ctx.beginPath();
                ctx.arc(headX + headLen * 0.35, ey, baseRadius * 0.08, 0, Math.PI * 2);
                ctx.fill();
            });

            // 7. Prehensile Upper Proboscis Lip (Dexterous Curling Arc)
            const snoutX = headX + headLen;
            const lipCurl = (Math.sin(t * 0.12 + (org.id || 0)) * 0.5 + 0.5) * lipDex;
            const lipReachLen = baseRadius * (0.35 + lipDex * 0.30);

            ctx.strokeStyle = "#10b981"; // Emerald green prehensile lip
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(snoutX, -baseRadius * 0.08);
            ctx.quadraticCurveTo(snoutX + lipReachLen * 0.7, -baseRadius * 0.25 * (1 + lipCurl), snoutX + lipReachLen, -baseRadius * 0.05);
            ctx.stroke();

            // 8. Downward & Upward Conical Incisor Stripping Tusks (Ivory Highlights)
            ctx.fillStyle = "#f8fafc";
            ctx.strokeStyle = "#d97706"; // Amber enamel edge
            ctx.lineWidth = 1.0;

            // Upper conical incisor pointing downwards
            ctx.beginPath();
            ctx.moveTo(snoutX + headLen * 0.12, -baseRadius * 0.06);
            ctx.lineTo(snoutX + headLen * 0.28, -baseRadius * 0.24);
            ctx.lineTo(snoutX + headLen * 0.20, -baseRadius * 0.04);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Lower conical incisor pointing upwards
            ctx.beginPath();
            ctx.moveTo(snoutX + headLen * 0.12, baseRadius * 0.06);
            ctx.lineTo(snoutX + headLen * 0.26, baseRadius * 0.22);
            ctx.lineTo(snoutX + headLen * 0.18, baseRadius * 0.04);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 9. Canopy Foliage Defoliation Particles (When Canopy Browsing)
            if (isBrowsing) {
                const numLeaves = 4;
                for (let k = 0; k < numLeaves; k++) {
                    const leafPhase = (t * 0.08 + k * 1.57) % (Math.PI * 2);
                    const leafDist = baseRadius * (0.4 + 0.5 * Math.cos(leafPhase));
                    const leafAngle = (k - 1.5) * 0.35 + Math.sin(t * 0.15) * 0.2;
                    const lx = snoutX + Math.cos(leafAngle) * leafDist;
                    const ly = Math.sin(leafAngle) * leafDist;

                    ctx.fillStyle = (k % 2 === 0) ? "rgba(5, 150, 105, 0.85)" : "rgba(217, 119, 6, 0.85)";
                    ctx.beginPath();
                    ctx.ellipse(lx, ly, baseRadius * 0.14, baseRadius * 0.07, leafAngle, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Canopy defoliation aura flare
                ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.arc(snoutX + baseRadius * 0.3, 0, baseRadius * 0.65, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            ctx.restore();
        }

        /**
         * Batch render all Paraceratherium megaherbivores in an active ecosystem population.
         * @param {CanvasRenderingContext2D} ctx - Target canvas rendering context.
         * @param {Array<Object>} organisms - Array of simulation organisms.
         * @param {number} tick - Current simulation tick counter.
         */
        static renderAll(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;
            const t = tick || 0;
            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (org && org.isParaceratheriid) {
                    ParaceratheriumOpticsRenderer.drawParaceratherium(ctx, org, t);
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ParaceratheriumOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.ParaceratheriumOpticsRenderer = ParaceratheriumOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
