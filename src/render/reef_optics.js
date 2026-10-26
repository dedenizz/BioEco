// BioEcosystem - Biogenic Coral Reef Optics, Aragonite Matrix & Polyp Shaders
// Module: src/render/reef_optics.js
// Version: 5.69.0 (Hour 289 - Looks / UI Agent: Bleached Skeleton Shaders & Mucus Barrier)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ReefOpticsRenderer
     * High-fidelity microscope rendering for benthic biogenic coral reefs:
     * - Multi-tiered aragonite limestone bioherms and calcified corallite calices
     * - Swaying ciliary polyp tentacles animated by hydrodynamic water currents
     * - Endosymbiotic zooxanthellae emerald and amber bio-fluorescent glow
     * - Bleached chalky-white skeleton shading under thermal stress
     * - Protective translucent organic mucus sheath barrier halos
     * - Cellular crystalline aragonite shell facets and sessile podocyst anchoring
     */
    class ReefOpticsRenderer {
        /**
         * Render wave-damping nursery shelter aura around bioherm micro-atolls.
         */
        static drawShelterForcefield(ctx, node, tick) {
            const r = node.radius || 24.0;
            const shelterR = r + 22.0;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.03 + (node.id ? node.id.charCodeAt(5) : 0));
            const auraAlpha = 0.12 + pulse * 0.08;

            ctx.beginPath();
            ctx.ellipse(node.x, node.y, shelterR, shelterR * 0.72, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${auraAlpha * 0.40})`;
            ctx.fill();

            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(56, 189, 248, ${auraAlpha})`;
            ctx.stroke();
        }

        /**
         * Render stratified porous aragonite limestone skeleton and corallite calices.
         */
        static drawAragoniteSkeleton(ctx, node, tick) {
            const r = node.radius || 24.0;
            const h = node.height || 35.0;

            // 1. Bioherm calcareous mound base
            ctx.beginPath();
            ctx.moveTo(node.x - r * 1.25, node.y + 12.0);
            ctx.quadraticCurveTo(node.x - r * 0.75, node.y - h * 0.4, node.x - r * 0.45, node.y - h);
            ctx.quadraticCurveTo(node.x, node.y - h - 6.0, node.x + r * 0.45, node.y - h);
            ctx.quadraticCurveTo(node.x + r * 0.75, node.y - h * 0.4, node.x + r * 1.25, node.y + 12.0);
            ctx.closePath();

            const reefGrad = ctx.createLinearGradient(node.x - r, 0, node.x + r, 0);
            reefGrad.addColorStop(0.0, "#334155");
            reefGrad.addColorStop(0.35, "#64748b");
            reefGrad.addColorStop(0.65, "#94a3b8");
            reefGrad.addColorStop(1.0, "#475569");
            ctx.fillStyle = reefGrad;
            ctx.fill();

            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "#cbd5e1";
            ctx.stroke();

            // 2. Calcium carbonate accretion growth bands
            for (let b = 1; b <= 3; b++) {
                const by = node.y + 6.0 - b * (h * 0.28);
                const bw = r * (1.15 - b * 0.20);
                ctx.beginPath();
                ctx.ellipse(node.x, by, bw, bw * 0.25, 0, 0, Math.PI * 2);
                ctx.lineWidth = 0.65;
                ctx.strokeStyle = b % 2 === 0 ? "rgba(241, 245, 249, 0.45)" : "rgba(203, 213, 225, 0.35)";
                ctx.stroke();
            }

            // 3. Corallite skeletal calices (cups where polyps reside)
            const calyxCount = Math.max(3, Math.min(7, node.polypCount + 2));
            for (let c = 0; c < calyxCount; c++) {
                const cx = node.x + (c - (calyxCount - 1) / 2) * (r * 0.34);
                const cy = node.y - h * (0.45 + (c % 2) * 0.35);
                ctx.beginPath();
                ctx.ellipse(cx, cy, 3.5, 2.2, 0, 0, Math.PI * 2);
                ctx.fillStyle = "#1e293b";
                ctx.fill();
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = "#f8fafc";
                ctx.stroke();
            }
        }

        /**
         * Render ciliary polyp tentacles and symbiotic zooxanthellae bio-fluorescence.
         */
        static drawPolypTentacles(ctx, node, tick, lightRatio) {
            const r = node.radius || 24.0, h = node.height || 35.0;
            const pCount = Math.max(2, Math.min(6, node.polypCount || 3));
            const effLight = Math.max(0.15, Math.min(1.0, lightRatio || 0.5));

            for (let i = 0; i < pCount; i++) {
                const px = node.x + (i - (pCount - 1) / 2) * (r * 0.42);
                const py = node.y - h * (0.65 + (i % 2) * 0.28);

                // Tentacle cluster radiating from each polyp calyx
                const tentacleCount = 5;
                for (let t = 0; t < tentacleCount; t++) {
                    const baseAngle = -Math.PI * 0.5 + (t - 2) * 0.32;
                    const sway = Math.sin(tick * 0.06 + i * 1.5 + t * 0.8) * 4.5;
                    const tx = px + Math.cos(baseAngle) * 9.0 + sway;
                    const ty = py + Math.sin(baseAngle) * 9.0;

                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.quadraticCurveTo(px + sway * 0.5, py - 4.0, tx, ty);
                    ctx.lineWidth = 0.75;
                    ctx.strokeStyle = `rgba(253, 224, 71, ${0.45 + effLight * 0.35})`;
                    ctx.stroke();

                    // Zooxanthellae fluorescent tip node
                    ctx.beginPath();
                    ctx.arc(tx, ty, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = t % 2 === 0 ? `rgba(16, 185, 129, ${0.70 * effLight})` : `rgba(245, 158, 11, ${0.80 * effLight})`;
                    ctx.fill();
                }
            }
        }

        /**
         * Master pass rendering the complete biogenic reef field across benthic seabed.
         */
        static drawReefField(ctx, reefNodes, tick, lightRatio) {
            if (!ctx || !reefNodes || !Array.isArray(reefNodes)) return;
            ctx.save();
            for (let i = 0; i < reefNodes.length; i++) {
                const node = reefNodes[i];
                if (!node) continue;
                ReefOpticsRenderer.drawShelterForcefield(ctx, node, tick);
                ReefOpticsRenderer.drawAragoniteSkeleton(ctx, node, tick);
                ReefOpticsRenderer.drawPolypTentacles(ctx, node, tick, lightRatio);
            }
            ctx.restore();
        }

        /**
         * Render cellular calcified aragonite facets, anchored podocyst disc,
         * zooxanthellae endosymbionts, bleaching chalkiness, and protective mucus sheath.
         */
        static drawCellCalcification(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const mass = typeof org.calcifiedMass === "number" ? org.calcifiedMass : 0.0;
            const isAnchored = Boolean(org.isReefAnchored);
            const symbYield = typeof org.symbiontEnergyYield === "number" ? org.symbiontEnergyYield : 0.0;
            const shelter = typeof org.reefShelterFactor === "number" ? org.reefShelterFactor : 0.0;
            const bleach = typeof org.bleachingScore === "number" ? org.bleachingScore : 0.0;
            const mucus = typeof org.mucusSheathFactor === "number" ? org.mucusSheathFactor : 0.0;

            if (mass <= 1.0 && !isAnchored && symbYield <= 0.02 && shelter <= 0.05 && bleach <= 0.05 && mucus <= 0.05) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            ctx.save();

            // 1. Aragonite crystalline shell facets around organism perimeter
            if (mass > 2.0) {
                const facetCount = Math.min(8, 4 + Math.floor(mass / 12.0));
                ctx.lineWidth = 0.85;
                // Bleached shells turn chalky white with dissolution fraying
                const shellAlpha = Math.min(0.85, 0.35 + (mass / 100.0) * 0.50);
                const shellColor = bleach > 0.35 ? `rgba(248, 250, 252, ${shellAlpha})` : `rgba(241, 245, 249, ${shellAlpha})`;
                ctx.strokeStyle = shellColor;

                for (let f = 0; f < facetCount; f++) {
                    const ang = (f / facetCount) * Math.PI * 2;
                    const fx = org.x + Math.cos(ang) * (size * 1.15);
                    const fy = org.y + Math.sin(ang) * (size * 1.15);
                    ctx.beginPath();
                    ctx.arc(fx, fy, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = bleach > 0.35 ? "rgba(226, 232, 240, 0.95)" : "rgba(248, 250, 252, 0.90)";
                    ctx.fill();
                    ctx.stroke();
                }
            }

            // 2. Anchored sessile polyp podocyst disc and radiating tentacle crown
            if (isAnchored) {
                ctx.beginPath();
                ctx.arc(org.x, org.y + size * 0.65, size * 0.45, 0, Math.PI * 2);
                ctx.fillStyle = bleach > 0.40 ? "rgba(203, 213, 225, 0.85)" : "rgba(71, 85, 105, 0.75)";
                ctx.fill();
                ctx.lineWidth = 0.7;
                ctx.strokeStyle = bleach > 0.40 ? "#f1f5f9" : "#cbd5e1";
                ctx.stroke();

                // 4 mini tentacle lines swaying upward (fading to ghost white when bleached)
                for (let t = 0; t < 4; t++) {
                    const tang = -Math.PI * 0.75 + t * 0.5;
                    const tsway = Math.sin(tick * 0.08 + t) * 2.5;
                    const tx = org.x + Math.cos(tang) * (size * 1.4) + tsway;
                    const ty = org.y + Math.sin(tang) * (size * 1.4);
                    ctx.beginPath();
                    ctx.moveTo(org.x + Math.cos(tang) * (size * 0.6), org.y + Math.sin(tang) * (size * 0.6));
                    ctx.lineTo(tx, ty);
                    ctx.lineWidth = 0.65;
                    ctx.strokeStyle = bleach > 0.35 ? "rgba(241, 245, 249, 0.75)" : "rgba(253, 224, 71, 0.80)";
                    ctx.stroke();
                }
            }

            // 3. Mutualistic zooxanthellae endosymbionts (attenuated or expelled under bleaching)
            if (symbYield > 0.01 && bleach < 0.85) {
                const zCount = Math.min(4, Math.floor(symbYield * 18.0) + 1);
                const symbAlpha = Math.max(0.15, 0.85 * (1.0 - bleach));
                for (let z = 0; z < zCount; z++) {
                    const zang = (z / zCount) * Math.PI * 2 + tick * 0.02;
                    const zx = org.x + Math.cos(zang) * (size * 0.45);
                    const zy = org.y + Math.sin(zang) * (size * 0.45);
                    ctx.beginPath();
                    ctx.arc(zx, zy, 1.15, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(16, 185, 129, ${symbAlpha})`;
                    ctx.fill();
                }
            }

            // 4. Protective organic mucus barrier halo against heat shock
            if (mucus > 0.05) {
                const mPulse = 0.5 + 0.5 * Math.sin(tick * 0.07 + (org.id || 0));
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * (1.25 + mucus * 0.25), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(186, 230, 253, ${0.08 + mucus * 0.16 + mPulse * 0.05})`;
                ctx.fill();
                ctx.lineWidth = 0.75;
                ctx.strokeStyle = `rgba(125, 211, 252, ${0.25 + mucus * 0.35})`;
                ctx.stroke();
            }

            // 5. Bioherm nursery shelter aura
            if (shelter > 0.10) {
                ctx.beginPath();
                ctx.arc(org.x, org.y, size * 1.35, 0, Math.PI * 2);
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = `rgba(56, 189, 248, ${shelter * 0.75})`;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ReefOpticsRenderer;
    } else {
        global.ReefOpticsRenderer = ReefOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
