// BioEcosystem - Pentameric Radial Symmetry, Madreporite Sieve & Hydraulic Podia Optics
// Module: src/render/echinoderm_optics.js
// Version: 7.18.0 (Hour 438 - Looks Agent: Silt Fouling, Podia Rupture/Regeneration & % PTI Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EchinodermOpticsRenderer
     * High-fidelity scientific microscope rendering of echinoderm pentameric anatomy and water vascular optics:
     * - Pentameric Radial Skeleton: 5 radiating ambulacral rays with calcified ossicle plates and central disk
     * - Madreporite Sieve Plate: Off-center aboral calcified button with silt fouling crust and ciliary flushing jets
     * - Hydraulic Tube Feet (Podia): Dual-row hydrostatic stems, ruptured severed stumps, and regenerating blastema buds
     * - Podial Traction Grip Halos: Amber vacuum adhesion contact discs and chemical mucus bonding rings (% PTI)
     * - Predatory Shell Prying Optics: Dynamic hydraulic tension arcs and fluid micro-eddies during bivalve predation
     * - Global Water Vascular Stratum: Ambient hydrostatic pressure ribbons and benthic substrate crawl vector tracks
     */
    class EchinodermOpticsRenderer {
        /**
         * Render individual echinoderm pentameric anatomy, podia, madreporite, and traction.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawEchinodermAnatomy(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isEchinoderm && (!org.podiaCount || org.podiaCount <= 0)) return;

            const rays = org.pentamericRays || 5;
            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const podiaCount = org.podiaCount || 15;
            const maxPodia = org.maxPodiaCount || podiaCount;
            const rupturedCount = org.rupturedPodiaCount || 0;
            const podiaLen = org.podiaExtensionLength || 6.0;
            const porosity = org.madreporitePorosity || 0.65;
            const fouling = org.madreporiteFoulingRatio || 0.0;
            const flushing = org.ciliaryFlushingCooldown || 0;
            const pressure = org.stoneCanalPressure || 20.0;
            const traction = org.podialTractionForce || 0.0;
            const pti = org.podialTractionIndex || 0.0;
            const isPrying = org.bivalvePryingActive || false;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Ambulacral Podia (Tube Feet with Rupture / Regeneration Details)
            this.drawAmbulacralPodia(ctx, size, rays, podiaCount, maxPodia, rupturedCount, podiaLen, pti, tick);

            // 2. Pentameric Radial Skeleton & Ossicle Rays
            this.drawPentamericSkeleton(ctx, size, rays, pressure, tick);

            // 3. Madreporite Sieve Plate, Silt Crust & Ciliary Flushing
            this.drawMadreporiteSieve(ctx, size, porosity, pressure, fouling, flushing, tick);

            // 4. Podial Traction Grip Disks & Amber Adhesion Halos (% PTI)
            if (traction > 0.20 || pti > 0.25) {
                this.drawPodialTractionGrip(ctx, size, rays, traction, pti, tick);
            }

            // 5. Predatory Shell Prying Tension Arcs
            if (isPrying) {
                this.drawBivalvePryingOptics(ctx, size, pressure, tick);
            }

            ctx.restore();
        }

        /**
         * Render 5 radiating pentameric ambulacral rays with calcareous skeletal ossicles.
         */
        static drawPentamericSkeleton(ctx, size, rays, pressure, tick) {
            ctx.save();

            const rayLength = size * 1.75;
            const centralDiskRadius = size * 0.70;

            // Central circumoral disc
            ctx.beginPath();
            ctx.arc(0, 0, centralDiskRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(2, 132, 199, 0.88)";
            ctx.fill();
            ctx.strokeStyle = "rgba(56, 189, 248, 0.90)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Ring canal hydrostatic turgor pulsation
            const ringPulse = Math.sin(tick * 0.08) * 0.15 + 0.45;
            ctx.beginPath();
            ctx.arc(0, 0, centralDiskRadius * 0.55, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(125, 211, 252, " + ringPulse.toFixed(3) + ")";
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // 5 Symmetric ambulacral rays
            for (let r = 0; r < rays; r++) {
                const rayAngle = (r / rays) * Math.PI * 2;
                const tipX = Math.cos(rayAngle) * rayLength;
                const tipY = Math.sin(rayAngle) * rayLength;

                const leftAngle = rayAngle - 0.28;
                const rightAngle = rayAngle + 0.28;
                const baseLeftX = Math.cos(leftAngle) * centralDiskRadius;
                const baseLeftY = Math.sin(leftAngle) * centralDiskRadius;
                const baseRightX = Math.cos(rightAngle) * centralDiskRadius;
                const baseRightY = Math.sin(rightAngle) * centralDiskRadius;

                // Tapered ray arm polygon
                ctx.beginPath();
                ctx.moveTo(baseLeftX, baseLeftY);
                ctx.lineTo(tipX, tipY);
                ctx.lineTo(baseRightX, baseRightY);
                ctx.closePath();

                ctx.fillStyle = (r % 2 === 0) ? "rgba(3, 105, 161, 0.85)" : "rgba(2, 132, 199, 0.80)";
                ctx.fill();
                ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Calcite ossicle ridge along ray midline
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(tipX * 0.92, tipY * 0.92);
                ctx.strokeStyle = "rgba(224, 242, 254, 0.60)";
                ctx.lineWidth = 0.85;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render dual rows of rhythmic hydraulic tube feet (podia) with severed stumps & regeneration buds.
         */
        static drawAmbulacralPodia(ctx, size, rays, podiaCount, maxPodia, rupturedCount, podiaLen, pti, tick) {
            ctx.save();

            const podiaPerRay = Math.max(2, Math.round(maxPodia / rays));
            const rayLength = size * 1.70;

            for (let r = 0; r < rays; r++) {
                const rayAngle = (r / rays) * Math.PI * 2;
                const normAngle = rayAngle + Math.PI * 0.5;

                for (let p = 1; p <= podiaPerRay; p++) {
                    const ratio = p / (podiaPerRay + 1);
                    const alongX = Math.cos(rayAngle) * (rayLength * ratio);
                    const alongY = Math.sin(rayAngle) * (rayLength * ratio);

                    // Determine if this podium slot is ruptured
                    const isSlotRuptured = (rupturedCount > 0) && ((r + p) % 7 === 0);

                    // Hydraulic stepping wave phase offset per podium
                    const wavePhase = tick * 0.14 + r * 1.2 + p * 0.65;
                    const stepWave = Math.sin(wavePhase) * 0.4 + 0.6;
                    const currentLen = isSlotRuptured ? (podiaLen * 0.28) : (podiaLen * stepWave);

                    const sides = [-1, 1];
                    for (let s = 0; s < sides.length; s++) {
                        const side = sides[s];
                        const lateralX = Math.cos(normAngle) * (currentLen * side);
                        const lateralY = Math.sin(normAngle) * (currentLen * side);
                        const endX = alongX + lateralX;
                        const endY = alongY + lateralY;

                        if (isSlotRuptured) {
                            // Severed stump line
                            ctx.beginPath();
                            ctx.moveTo(alongX, alongY);
                            ctx.lineTo(endX, endY);
                            ctx.strokeStyle = "rgba(244, 63, 94, 0.70)";
                            ctx.lineWidth = 1.0;
                            ctx.stroke();

                            // Regenerating blastema bud dot
                            ctx.beginPath();
                            ctx.arc(endX, endY, 1.0, 0, Math.PI * 2);
                            ctx.fillStyle = "rgba(251, 146, 60, 0.90)";
                            ctx.fill();
                        } else {
                            // Intact flexible hydraulic podial stem
                            ctx.beginPath();
                            ctx.moveTo(alongX, alongY);
                            ctx.lineTo(endX, endY);
                            ctx.strokeStyle = pti > 0.55 ? "rgba(251, 191, 36, 0.85)" : "rgba(125, 211, 252, 0.75)";
                            ctx.lineWidth = 1.1;
                            ctx.stroke();

                            // Terminal vacuum suction disk
                            ctx.beginPath();
                            ctx.arc(endX, endY, 1.3, 0, Math.PI * 2);
                            ctx.fillStyle = pti > 0.55 ? "rgba(254, 240, 138, 0.95)" : "rgba(224, 242, 254, 0.95)";
                            ctx.fill();
                            ctx.strokeStyle = pti > 0.55 ? "rgba(245, 158, 11, 0.85)" : "rgba(2, 132, 199, 0.85)";
                            ctx.lineWidth = 0.6;
                            ctx.stroke();
                        }
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render madreporite porous sieve plate with silt fouling crust & ciliary flushing jets.
         */
        static drawMadreporiteSieve(ctx, size, porosity, pressure, fouling, flushing, tick) {
            ctx.save();

            const madX = size * 0.38;
            const madY = -size * 0.32;
            const plateRadius = 2.4;

            // Porous calcareous button
            ctx.beginPath();
            ctx.arc(madX, madY, plateRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(248, 250, 252, 0.92)";
            ctx.fill();
            ctx.strokeStyle = "rgba(148, 163, 184, 0.85)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Silt fouling deposit crust overlay
            if (fouling > 0.15) {
                const crustAlpha = Math.min(0.75, fouling * 0.85);
                ctx.beginPath();
                ctx.arc(madX, madY, plateRadius * 0.85, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(120, 53, 15, " + crustAlpha.toFixed(3) + ")";
                ctx.fill();
            }

            // Sieve pore shimmer (dimmed by fouling)
            const cleanFactor = Math.max(0.1, 1.0 - fouling * 0.7);
            const poreShimmer = (Math.sin(tick * 0.18) * 0.25 + 0.75) * cleanFactor;
            ctx.beginPath();
            ctx.arc(madX, madY, plateRadius * 0.55 * porosity, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, " + poreShimmer.toFixed(3) + ")";
            ctx.fill();

            // Ciliary flushing water expulsion jets
            if (flushing > 90) {
                const flushAlpha = ((flushing - 90) / 30.0);
                for (let j = 0; j < 3; j++) {
                    const jetAngle = -Math.PI * 0.5 + (j - 1) * 0.45;
                    const jx = madX + Math.cos(jetAngle) * 5.5;
                    const jy = madY + Math.sin(jetAngle) * 5.5;
                    ctx.beginPath();
                    ctx.moveTo(madX, madY);
                    ctx.lineTo(jx, jy);
                    ctx.strokeStyle = "rgba(224, 242, 254, " + flushAlpha.toFixed(3) + ")";
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }

            ctx.restore();
        }

        /**
         * Render chemical mucus adhesion rings and substrate vacuum grip halos (% PTI).
         */
        static drawPodialTractionGrip(ctx, size, rays, traction, pti, tick) {
            ctx.save();

            const gripPulse = Math.sin(tick * 0.16) * 0.2 + 0.8;
            const haloRadius = size * (1.6 + traction * 0.35);

            // Amber gold adhesion halo for high PTI
            ctx.beginPath();
            ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
            ctx.strokeStyle = pti > 0.50 ? 
                "rgba(245, 158, 11, " + (traction * 0.40 * gripPulse).toFixed(3) + ")" : 
                "rgba(56, 189, 248, " + (traction * 0.35 * gripPulse).toFixed(3) + ")";
            ctx.lineWidth = 1.3;
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Radial suction pressure focal points
            for (let r = 0; r < rays; r++) {
                const angle = (r / rays) * Math.PI * 2;
                const fx = Math.cos(angle) * (size * 1.55);
                const fy = Math.sin(angle) * (size * 1.55);

                ctx.beginPath();
                ctx.arc(fx, fy, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = pti > 0.50 ? 
                    "rgba(251, 191, 36, " + (traction * 0.55).toFixed(3) + ")" : 
                    "rgba(14, 165, 233, " + (traction * 0.45).toFixed(3) + ")";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render hydraulic prying tension arcs and fluid ejection eddies during bivalve predation.
         */
        static drawBivalvePryingOptics(ctx, size, pressure, tick) {
            ctx.save();

            const pryingWave = Math.sin(tick * 0.25) * 3.0;
            const arcRadius = size * 2.2;

            // Hydraulic strain tension arcs
            ctx.beginPath();
            ctx.arc(0, 0, arcRadius + pryingWave, -Math.PI * 0.4, Math.PI * 0.4);
            ctx.strokeStyle = "rgba(244, 63, 94, 0.70)";
            ctx.lineWidth = 1.6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, arcRadius + pryingWave * 0.6, -Math.PI * 0.3, Math.PI * 0.3);
            ctx.strokeStyle = "rgba(251, 113, 133, 0.85)";
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.restore();
        }

        /**
         * Render dish-wide hydraulic pressure streamlines and benthic adhesion markers.
         */
        static drawGlobalEchinodermEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = (typeof manager.getMetrics === "function") ?
                manager.getMetrics() : manager.metrics;
            if (!metrics || metrics.totalEchinoderms <= 0) return;

            ctx.save();

            // Ambient water vascular hydrostatic ribbons near benthic substrate
            const floorY = 440.0;
            const alpha = Math.min(0.25, 0.08 + (metrics.meanWaterVascularIndex || 0.0) * 0.15);

            ctx.lineWidth = 1.0;
            ctx.strokeStyle = (metrics.meanPodialTractionIndex || 0.0) > 0.50 ?
                "rgba(245, 158, 11, " + alpha.toFixed(3) + ")" :
                "rgba(56, 189, 248, " + alpha.toFixed(3) + ")";
            ctx.setLineDash([4, 6]);

            for (let i = 0; i < 2; i++) {
                const yPos = floorY + (i * 20.0);
                ctx.beginPath();
                ctx.moveTo(0, yPos);
                for (let x = 0; x <= width; x += 40) {
                    const wave = Math.sin((x * 0.015) + (tick * 0.03) + i) * 3.5;
                    ctx.lineTo(x, yPos + wave);
                }
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EchinodermOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.EchinodermOpticsRenderer = EchinodermOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
