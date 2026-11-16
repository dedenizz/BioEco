// BioEcosystem - Early Cretaceous Eutherian Tribosphenic Molars & Chorioallantoic Placentation Optics
// Module: src/render/tribosphenic_optics.js
// Version: 8.89.0 (Hour 609 - Looks & UI Agent: Protocone-Talonid Occlusion Sparks, Umbilical Plexus, Hemochorial Villi & 125th/126th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TribosphenicOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Early Cretaceous Eutherian adaptations:
     * - Tribosphenic Molar Occlusion & Shearing/Crushing Micro-Sparks:
     *   Golden topaz (#d97706) Protocone cusp radiance, amber (#f59e0b) Talonid crushing basin ring,
     *   and micro-spark occlusion particles generated during dual-action chewing of tough chitin/seeds.
     * - True Chorioallantoic Umbilical Plexus & Hemochorial Villi Brush:
     *   Vascular allantoic loops with branching placental vermilion / ruby crimson (#be123c) capillary networks,
     *   glowing hemochorial nutrient transfer nodes, and elevated neurocranial encephalization aura.
     * - 125th Telemetry Channel (% TMI) Aura: Golden topaz amber (#d97706) masticatory occlusion radiance.
     * - 126th Telemetry Channel (% CAI) Radiance: Deep ruby crimson (#be123c) chorioallantoic umbilical glow.
     */
    class TribosphenicOpticsRenderer {
        /**
         * Render individual Tribosphenic Molar and Chorioallantoic Placenta morphology and auras.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTribosphenic(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.hasTribosphenicMolars && !org.hasChorioallantoicPlacenta) return;

            const size = org.dna ? (org.dna.size || 7.0) : 7.0;
            const bodyLen = 24.0 + size * 1.6;
            const bodyWidth = 11.0 + size * 0.95;

            const tmi = (org.tribosphenicMolarIndex || 0.0) / 100.0;
            const cai = (org.chorioallantoicPlacentaIndex || 0.0) / 100.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Ambient Telemetry Auras
            // 125th Channel (% TMI) Golden Topaz Masticatory Occlusion Radiance
            if (org.hasTribosphenicMolars && tmi > 0.25) {
                const jawAuraRadius = bodyWidth * 1.8;
                const jawGrad = ctx.createRadialGradient(bodyLen * 0.35, 0, 2, bodyLen * 0.35, 0, jawAuraRadius);
                const tmiPulse = 0.12 + Math.sin(tick * 0.12) * 0.04;
                jawGrad.addColorStop(0.0, "rgba(217, 119, 6, " + (tmiPulse * tmi).toFixed(3) + ")");
                jawGrad.addColorStop(0.55, "rgba(245, 158, 11, " + (tmiPulse * 0.40 * tmi).toFixed(3) + ")");
                jawGrad.addColorStop(1.0, "rgba(217, 119, 6, 0.0)");
                ctx.fillStyle = jawGrad;
                ctx.beginPath();
                ctx.arc(bodyLen * 0.35, 0, jawAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 126th Channel (% CAI) Deep Ruby Crimson Chorioallantoic Umbilical Glow
            if (org.hasChorioallantoicPlacenta && cai > 0.25) {
                const placAuraRadius = bodyLen * 0.75;
                const placGrad = ctx.createRadialGradient(-bodyLen * 0.08, 0, 3, -bodyLen * 0.08, 0, placAuraRadius);
                const caiPulse = 0.15 + Math.cos(tick * 0.10) * 0.05;
                placGrad.addColorStop(0.0, "rgba(190, 18, 60, " + (caiPulse * cai).toFixed(3) + ")");
                placGrad.addColorStop(0.58, "rgba(244, 63, 94, " + (caiPulse * 0.42 * cai).toFixed(3) + ")");
                placGrad.addColorStop(1.0, "rgba(190, 18, 60, 0.0)");
                ctx.fillStyle = placGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.08, 0, placAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Cranial Encephalization Halo (High EQ Brain Vault)
            if (org.hasChorioallantoicPlacenta && (org.neonatalEncephalizationQuotient || 0.85) > 0.70) {
                const eq = org.neonatalEncephalizationQuotient || 0.85;
                const brainX = bodyLen * 0.32;
                const brainRadius = bodyWidth * 0.65 * eq;
                ctx.save();
                ctx.strokeStyle = "rgba(251, 191, 36, " + (0.35 * cai).toFixed(3) + ")";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([3, 2]);
                ctx.beginPath();
                ctx.arc(brainX, 0, brainRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Tribosphenic Molar Crown & Talonid Basin Architecture
            if (org.hasTribosphenicMolars) {
                const toothX = bodyLen * 0.36;
                const toothYOffset = bodyWidth * 0.32;

                // Bilateral molar rows (Upper Protocone & Lower Talonid)
                for (let side = -1; side <= 1; side += 2) {
                    const ty = side * toothYOffset;

                    // Shearing Trigonid Blade (Anterior)
                    ctx.fillStyle = "rgba(253, 230, 138, 0.85)";
                    ctx.beginPath();
                    ctx.moveTo(toothX - 2.5, ty - side * 1.5);
                    ctx.lineTo(toothX + 1.5, ty - side * 2.5);
                    ctx.lineTo(toothX, ty + side * 1.0);
                    ctx.closePath();
                    ctx.fill();

                    // Crushing Talonid Basin (Posterior)
                    ctx.fillStyle = "rgba(217, 119, 6, 0.80)";
                    ctx.strokeStyle = "rgba(245, 158, 11, 0.95)";
                    ctx.lineWidth = 1.0;
                    ctx.beginPath();
                    ctx.arc(toothX - 3.5, ty, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // Protocone Lingual Pestle Highlight
                    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
                    ctx.beginPath();
                    ctx.arc(toothX - 3.5, ty, 0.7, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Active Masticatory Occlusion Sparks (Chewing / Crushing Animation)
                if (org.crushingCooldown > 0 || org.isFeeding) {
                    ctx.save();
                    const sparkCount = 4;
                    for (let s = 0; s < sparkCount; s++) {
                        const sparkAngle = (s * (Math.PI * 2 / sparkCount)) + (tick * 0.3);
                        const sparkDist = 4.0 + Math.sin(tick * 0.4 + s) * 2.5;
                        const sx = toothX + Math.cos(sparkAngle) * sparkDist;
                        const sy = Math.sin(sparkAngle) * sparkDist;
                        ctx.fillStyle = "rgba(251, 191, 36, 0.85)";
                        ctx.beginPath();
                        ctx.arc(sx, sy, 0.9, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }

            // 4. Chorioallantoic Umbilical Plexus & Branching Villi
            if (org.hasChorioallantoicPlacenta) {
                const placX = -bodyLen * 0.08;
                const villiDepth = (org.chorionicVilliPenetrationDepth || 0.86) * 5.0;

                ctx.save();
                ctx.strokeStyle = "rgba(225, 29, 72, 0.75)";
                ctx.lineWidth = 1.3;

                // Central Umbilical Cord Strand
                ctx.beginPath();
                ctx.moveTo(placX, 0);
                ctx.quadraticCurveTo(placX + 3.0, -bodyWidth * 0.4, placX - 2.0, -bodyWidth * 0.7);
                ctx.stroke();

                // Branching Hemochorial Chorionic Villi Brush
                const branchCount = 5;
                for (let b = 0; b < branchCount; b++) {
                    const bx = placX - 6.0 + b * 2.8;
                    const by = -bodyWidth * 0.45;
                    const bLen = villiDepth * (0.7 + Math.sin(tick * 0.15 + b) * 0.3);

                    ctx.strokeStyle = (b % 2 === 0) ? "rgba(190, 18, 60, 0.80)" : "rgba(244, 63, 94, 0.80)";
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(bx, by);
                    ctx.lineTo(bx + Math.sin(tick * 0.08 + b) * 2.0, by - bLen);
                    ctx.stroke();

                    // Nutrient exchange capillary micro-bead
                    ctx.fillStyle = "rgba(254, 205, 211, 0.90)";
                    ctx.beginPath();
                    ctx.arc(bx + Math.sin(tick * 0.08 + b) * 2.0, by - bLen, 1.1, 0, Math.PI * 2);
                    ctx.fill();
                }

                // If Pregnant, Render Intrauterine Embryonic Sac
                if (org.isPregnantChorioallantoic) {
                    const prog = Math.min(1.0, (org.intrauterineGestationProgress || 0) / (org.gestationEnduranceTicks || 65.0));
                    const sacRadius = 3.5 + prog * 4.5;
                    ctx.fillStyle = "rgba(225, 29, 72, " + (0.25 + prog * 0.35).toFixed(3) + ")";
                    ctx.strokeStyle = "rgba(251, 113, 133, 0.85)";
                    ctx.lineWidth = 1.1;
                    ctx.beginPath();
                    ctx.arc(placX, 0, sacRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.restore();
            }

            ctx.restore();
        }

        /**
         * Render ambient Cretaceous Eutherian atmospheric dust and placental bio-mist.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame index.
         */
        static drawTribosphenicAtmospherics(ctx, organisms, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms)) return;

            const w = ctx.canvas ? ctx.canvas.width : 660;
            const h = ctx.canvas ? ctx.canvas.height : 660;

            let triboCount = 0;
            let chorioCount = 0;

            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (!o || !o.alive) continue;
                if (o.hasTribosphenicMolars) triboCount++;
                if (o.hasChorioallantoicPlacenta) chorioCount++;
            }

            if (triboCount === 0 && chorioCount === 0) return;

            // Micro-particulate golden pollen / seed dust from Early Cretaceous Angiosperm radiation
            const particleCount = Math.min(14, 4 + Math.floor(triboCount * 0.3));
            ctx.save();
            for (let p = 0; p < particleCount; p++) {
                const px = (Math.sin(tick * 0.015 + p * 1.7) * 0.5 + 0.5) * w;
                const py = (Math.cos(tick * 0.012 + p * 2.3) * 0.5 + 0.5) * h;
                const alpha = (0.10 + Math.sin(tick * 0.04 + p) * 0.05) * Math.min(1.0, triboCount / 12.0);

                ctx.fillStyle = "rgba(217, 119, 6, " + alpha.toFixed(3) + ")";
                ctx.beginPath();
                ctx.arc(px, py, 1.4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TribosphenicOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TribosphenicOpticsRenderer = TribosphenicOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
