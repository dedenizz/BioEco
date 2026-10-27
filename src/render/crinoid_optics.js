// BioEcosystem - Articulated Crinoid Stalks, Rheophilic Crowns & Holdfast Optics
// Module: src/render/crinoid_optics.js
// Version: 7.08.0 (Hour 428 - Looks Agent: Rheophilic Articulation Optics, MCT Tension Stress & Autotomy Fracture)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CrinoidOpticsRenderer
     * High-fidelity scientific microscope rendering of articulated stalked crinoids:
     * - Articulated calcite columnals: Segmented mineral disks stacked with flexible joint gaps
     * - Mutable Collagenous Tissue (MCT) lock auras: Stiffened golden fibrous sheaths under flow shear
     * - Parabolic rheophilic calyx crown: Ciliated pinnule arms forming an open feeding cup in laminar current
     * - Holdfast cirri claws: Segmented anchoring appendages grasping basal substrate against overturning torque
     * - Flexural tension stress arcs: Coral-tinted strain vectors along over-deflected columnal joints
     * - Autotomy fracture planes: Jagged break margins with crystalline healing blastema nodes
     * - Laminar current stratum optics: Fluid streamline ribbons above boundary layer (y: 360 - 430 px)
     */
    class CrinoidOpticsRenderer {
        /**
         * Render individual stalked crinoid anatomy, columnals, calyx, and cirri.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawCellCrinoid(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isCrinoidStalked && (!org.stalkHeight || org.stalkHeight <= 5.0)) return;

            const stalkHeight = org.stalkHeight || 45.0;
            const columnals = org.calciteColumnalCount || 10;
            const deflection = org.stalkDeflectionAngle || 0.0;
            const isLocked = org.isStalkLocked || false;
            const cea = org.calyxElevationAdvantage || 0.0;
            const rar = org.rheophilicArticulationRatio || 0.0;
            const cirriCount = org.holdfastCirriCount || 6;
            const cirriGrip = org.holdfastCirriGrip || 0.7;
            const tension = org.holdfastTension || 0.0;
            const fatigue = org.collagenFatigueFactor || 0.0;
            const autotomyActive = org.autotomyActive || (typeof org.autotomyCooldown === "number" && org.autotomyCooldown > 0);

            ctx.save();

            // Root anchor position at organism base
            const rootX = org.x;
            const rootY = org.y;

            // 1. Holdfast Cirri Claws & Basal Tension Stress
            this.drawHoldfastCirri(ctx, rootX, rootY, cirriCount, cirriGrip, deflection, tension, tick);

            // 2. Articulated Calcite Stalk, Columnal Disks & Flexural Tension
            const calyxPos = this.drawArticulatedStalk(ctx, rootX, rootY, stalkHeight, columnals, deflection, isLocked, fatigue, autotomyActive, tick);

            // 3. Autotomy Fracture Plane (If recently severed or regrowing)
            if (autotomyActive || stalkHeight < 35.0) {
                this.drawStalkAutotomyFracture(ctx, calyxPos.x, calyxPos.y, deflection, tick);
            }

            // 4. Parabolic Rheophilic Calyx Crown & Pinnules
            this.drawRheophilicCalyxCrown(ctx, calyxPos.x, calyxPos.y, deflection, cea, rar, tick);

            ctx.restore();
        }

        /**
         * Render segmented holdfast cirri clutching the benthic substrate with tension strain glow.
         */
        static drawHoldfastCirri(ctx, x, y, count, grip, deflection, tension, tick) {
            ctx.save();
            ctx.lineWidth = 1.4;

            // Basal tension stress aura under heavy overturning torque
            if (tension > 1.2) {
                const stressAlpha = Math.min(0.65, (tension - 1.2) * 0.35 + Math.sin(tick * 0.18) * 0.12);
                ctx.beginPath();
                ctx.arc(x, y, 9.0 + grip * 6.0, 0, Math.PI);
                ctx.strokeStyle = "rgba(244, 63, 94, " + stressAlpha.toFixed(3) + ")";
                ctx.lineWidth = 2.2;
                ctx.setLineDash([2, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            for (let i = 0; i < count; i++) {
                const spreadAngle = ((i / (count - 1 || 1)) - 0.5) * Math.PI * 0.75 + Math.PI * 0.5;
                const cirriLen = 10.0 + grip * 8.0;
                const segments = 3;

                ctx.beginPath();
                ctx.moveTo(x, y);

                let curX = x;
                let curY = y;
                for (let s = 1; s <= segments; s++) {
                    const segRatio = s / segments;
                    const angleCurvature = spreadAngle + (deflection * 0.25 * segRatio);
                    const nextX = x + Math.cos(angleCurvature) * (cirriLen * segRatio);
                    const nextY = y + Math.sin(angleCurvature) * (cirriLen * segRatio * 0.45);

                    ctx.lineTo(nextX, nextY);
                    curX = nextX;
                    curY = nextY;
                }

                ctx.strokeStyle = tension > 1.8 ? "rgba(244, 63, 94, 0.85)" : "rgba(161, 98, 7, 0.65)";
                ctx.stroke();

                // Basal claws tip grip dot
                ctx.beginPath();
                ctx.arc(curX, curY, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = tension > 1.8 ? "rgba(251, 113, 133, 0.95)" : "rgba(234, 179, 8, 0.85)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render articulated calcite columnal disks along curved stalk trajectory with flexural tension.
         */
        static drawArticulatedStalk(ctx, rootX, rootY, height, numDisks, deflection, isLocked, fatigue, autotomyActive, tick) {
            ctx.save();

            // Calcite columnal luster styling
            const diskRadius = 3.6;
            let lastX = rootX;
            let lastY = rootY;

            // Fibrous collagen lock aura when under high shear
            if (isLocked) {
                const pulse = Math.sin(tick * 0.12) * 0.15 + 0.35;
                ctx.beginPath();
                ctx.moveTo(rootX, rootY);
                for (let d = 1; d <= numDisks; d++) {
                    const ratio = d / numDisks;
                    const curveOffset = Math.sin(ratio * Math.PI * 0.5) * deflection * height * 0.42;
                    const diskX = rootX + curveOffset;
                    const diskY = rootY - (ratio * height);
                    ctx.lineTo(diskX, diskY);
                }
                ctx.strokeStyle = "rgba(234, 179, 8, " + pulse.toFixed(3) + ")";
                ctx.lineWidth = diskRadius * 3.2;
                ctx.lineCap = "round";
                ctx.stroke();
            }

            // Flexural tension stress arcs along over-strained columnals
            if (fatigue > 0.20 || Math.abs(deflection) > 0.28) {
                const strainIntensity = Math.min(0.60, (fatigue * 0.5 + Math.abs(deflection) * 0.35));
                ctx.beginPath();
                ctx.moveTo(rootX, rootY);
                for (let d = 1; d <= numDisks; d++) {
                    const ratio = d / numDisks;
                    const curveOffset = Math.sin(ratio * Math.PI * 0.5) * deflection * height * 0.42;
                    const diskX = rootX + curveOffset;
                    const diskY = rootY - (ratio * height);
                    ctx.lineTo(diskX, diskY);
                }
                ctx.strokeStyle = "rgba(244, 63, 94, " + strainIntensity.toFixed(3) + ")";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([3, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw individual biomineralized calcite columnal disks
            for (let d = 1; d <= numDisks; d++) {
                const ratio = d / numDisks;
                const curveOffset = Math.sin(ratio * Math.PI * 0.5) * deflection * height * 0.42;
                const diskX = rootX + curveOffset;
                const diskY = rootY - (ratio * height);

                // Joint ligament line connecting to previous disk
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(diskX, diskY);
                ctx.strokeStyle = "rgba(202, 138, 4, 0.55)";
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // Calcite disk ellipse
                ctx.beginPath();
                const diskSheen = (d % 2 === 0) ? "rgba(254, 240, 138, 0.90)" : "rgba(253, 224, 71, 0.80)";
                ctx.arc(diskX, diskY, diskRadius, 0, Math.PI * 2);
                ctx.fillStyle = diskSheen;
                ctx.fill();

                ctx.strokeStyle = "rgba(161, 98, 7, 0.70)";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                lastX = diskX;
                lastY = diskY;
            }

            ctx.restore();
            return { x: lastX, y: lastY };
        }

        /**
         * Render autotomy fracture plane and crystalline healing blastema.
         */
        static drawStalkAutotomyFracture(ctx, fractureX, fractureY, deflection, tick) {
            ctx.save();
            ctx.translate(fractureX, fractureY);

            // Shimmering jagged break line
            const shimmer = Math.sin(tick * 0.22) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.moveTo(-5.5, 0);
            ctx.lineTo(-2.0, 2.5);
            ctx.lineTo(1.5, -2.0);
            ctx.lineTo(5.5, 0);
            ctx.strokeStyle = "rgba(244, 63, 94, " + shimmer.toFixed(3) + ")";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Calcite healing blastema micro-beads
            ctx.beginPath();
            ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(251, 113, 133, 0.85)";
            ctx.fill();

            ctx.restore();
        }

        /**
         * Render parabolic ciliated calyx cup and pinnule arms oriented into laminar flow with % RAR flutter.
         */
        static drawRheophilicCalyxCrown(ctx, calyxX, calyxY, deflection, cea, rar, tick) {
            ctx.save();
            ctx.translate(calyxX, calyxY);

            // Calyx central cup
            ctx.beginPath();
            ctx.arc(0, 0, 4.8, 0, Math.PI * 2);
            ctx.fillStyle = rar > 0.65 ? "rgba(225, 29, 72, 0.92)" : "rgba(2, 132, 199, 0.92)";
            ctx.fill();
            ctx.strokeStyle = rar > 0.65 ? "rgba(251, 113, 133, 0.90)" : "rgba(56, 189, 248, 0.90)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Parabolic fan arms (5 to 8 articulated ciliated arms)
            const armCount = 6;
            const armLength = 16.0 + cea * 12.0;

            for (let a = 0; a < armCount; a++) {
                const fanAngle = -Math.PI * 0.5 + ((a / (armCount - 1 || 1)) - 0.5) * Math.PI * 0.72 + (deflection * 0.4);
                const armEndX = Math.cos(fanAngle) * armLength;
                const armEndY = Math.sin(fanAngle) * armLength;

                // Primary arm ray
                ctx.beginPath();
                ctx.moveTo(0, 0);
                const ctrlX = Math.cos(fanAngle + 0.15) * (armLength * 0.5);
                const ctrlY = Math.sin(fanAngle + 0.15) * (armLength * 0.5);
                ctx.quadraticCurveTo(ctrlX, ctrlY, armEndX, armEndY);
                ctx.strokeStyle = rar > 0.50 ? "rgba(251, 113, 133, 0.85)" : "rgba(56, 189, 248, 0.82)";
                ctx.lineWidth = 1.3;
                ctx.stroke();

                // Feathered pinnule branches along each arm
                const pinnuleCount = 4;
                for (let p = 1; p <= pinnuleCount; p++) {
                    const pRatio = p / pinnuleCount;
                    const px = ctrlX * (1 - pRatio) + armEndX * pRatio;
                    const py = ctrlY * (1 - pRatio) + armEndY * pRatio;

                    const pAngle = fanAngle + Math.PI * 0.45;
                    const pLen = 4.2 * (1.0 - pRatio * 0.3);

                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + Math.cos(pAngle) * pLen, py + Math.sin(pAngle) * pLen);
                    ctx.strokeStyle = "rgba(244, 63, 94, 0.75)";
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }

                // Ciliated arm-tip luminescence when accessing laminar currents
                if (cea > 0.45) {
                    const shimmer = Math.sin(tick * 0.15 + a) * 0.25 + 0.75;
                    ctx.beginPath();
                    ctx.arc(armEndX, armEndY, 1.6, 0, Math.PI * 2);
                    ctx.fillStyle = rar > 0.50 ? "rgba(254, 205, 211, " + shimmer.toFixed(3) + ")" : "rgba(253, 224, 71, " + shimmer.toFixed(3) + ")";
                    ctx.fill();
                }
            }

            // Calyx elevation advantage & rheophilic articulation indicator halo
            if (cea > 0.50 || rar > 0.50) {
                ctx.beginPath();
                ctx.arc(0, 0, armLength * 1.05, -Math.PI * 0.85, -Math.PI * 0.15);
                ctx.strokeStyle = rar > 0.65 ? "rgba(244, 63, 94, 0.45)" : "rgba(56, 189, 248, 0.35)";
                ctx.lineWidth = 1.0;
                ctx.setLineDash([2, 4]);
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render dish-wide laminar current ribbons and elevation stratum with rheophilic vector filaments.
         */
        static drawGlobalCrinoidEnvironment(ctx, width, height, crinoidManager, tick) {
            if (!ctx || !crinoidManager) return;

            const metrics = (typeof crinoidManager.getMetrics === "function") ?
                crinoidManager.getMetrics() : crinoidManager.metrics;
            if (!metrics || metrics.totalStalkedCrinoids <= 0) return;

            ctx.save();
            const stratumTop = 360.0;
            const stratumBottom = 430.0;

            // Laminar seston current ribbons
            ctx.lineWidth = 1.1;
            for (let r = 0; r < 3; r++) {
                const ribbonY = stratumTop + (r * 24.0) + Math.sin(tick * 0.02 + r) * 3.0;
                ctx.beginPath();
                ctx.moveTo(0, ribbonY);

                for (let x = 0; x <= width; x += 45) {
                    const wave = Math.sin((x * 0.012) + (tick * 0.035) + r) * 4.5;
                    ctx.lineTo(x, ribbonY + wave);
                }

                const alpha = 0.12 + (metrics.meanElevationAdvantage || 0.0) * 0.08;
                ctx.strokeStyle = (metrics.meanArticulationRatio || 0.0) > 0.50 ?
                    "rgba(251, 113, 133, " + alpha.toFixed(3) + ")" :
                    "rgba(234, 179, 8, " + alpha.toFixed(3) + ")";
                ctx.setLineDash([6, 8]);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CrinoidOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.CrinoidOpticsRenderer = CrinoidOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
