// BioEcosystem - Early Monotremata & Therian Evolutionary Divergence Optics
// Module: src/render/therian_optics.js
// Version: 8.83.0 (Hour 603 - Looks & UI Agent: Marsupium Pouch Aperture, Choriovitelline Placental Filaments, Monotreme Crural Spur & 123rd/124th Shaders)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TherianOpticsRenderer
     * High-fidelity scientific darkfield microscopy optics for the Mesozoic Mammalian Divergence:
     * - Monotremata (Ornithorhynchidae & Tachyglossidae):
     *   Broad flattened duck-bill rostrum with electroreceptive pore micro-dots (lime-cyan glow #84cc16),
     *   crural ankle venom spurs with calcified defense highlights, and flattened swimming tail.
     * - Metatheria (Early Marsupials - Sinodelphys):
     *   Ventral crescent-shaped marsupium pouch aperture, warm terracotta amber (#ea580c) nurturing aura,
     *   and delicate peach-pink altricial neonate suckling nodes.
     * - Eutheria (Early Placentals - Eomaia):
     *   Internal uterine choriovitelline vascular plexus with branching ruby fuchsia (#e11d48) trophoblast filaments,
     *   placental nutrient exchange glow, and enlarged neurocranial encephalization aura.
     * - 123rd Telemetry Channel (% MPI) Aura: Terracotta amber (#ea580c) marsupial pouch radiance.
     * - 124th Telemetry Channel (% CPI) Radiance: Ruby fuchsia (#e11d48) choriovitelline trophoblast exchange glow.
     */
    class TherianOpticsRenderer {
        /**
         * Render individual Monotreme, Metatherian, or Eutherian divergence morphology and auras.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame index.
         */
        static drawTherian(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.isMonotreme && !org.isMetatherian && !org.isEutherian) return;

            const size = org.dna ? (org.dna.size || 7.0) : 7.0;
            const bodyLen = 24.0 + size * 1.5;
            const bodyWidth = 11.0 + size * 0.9;

            const mpi = (org.marsupiumPouchIndex || 0.0) / 100.0;
            const cpi = (org.choriovitellinePlacentaIndex || 0.0) / 100.0;

            const angle = org.angle !== undefined ? org.angle : Math.atan2(org.vy || 0, org.vx || 0);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(angle);

            // 1. Ambient Telemetry Auras
            // 123rd Channel (% MPI) Terracotta Amber Marsupium Pouch Radiance
            if (org.isMetatherian && mpi > 0.30) {
                const pouchAuraRadius = bodyWidth * 2.0;
                const pouchGrad = ctx.createRadialGradient(-bodyLen * 0.10, 0, 2, -bodyLen * 0.10, 0, pouchAuraRadius);
                const pouchPulse = 0.14 + Math.sin(tick * 0.10) * 0.05;
                pouchGrad.addColorStop(0.0, "rgba(234, 88, 12, " + (pouchPulse * mpi).toFixed(3) + ")");
                pouchGrad.addColorStop(0.55, "rgba(251, 146, 60, " + (pouchPulse * 0.40 * mpi).toFixed(3) + ")");
                pouchGrad.addColorStop(1.0, "rgba(234, 88, 12, 0.0)");
                ctx.fillStyle = pouchGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.10, 0, pouchAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 124th Channel (% CPI) Ruby Fuchsia Choriovitelline Placental Radiance
            if (org.isEutherian && cpi > 0.30) {
                const placAuraRadius = bodyLen * 0.70;
                const placGrad = ctx.createRadialGradient(-bodyLen * 0.05, 0, 3, -bodyLen * 0.05, 0, placAuraRadius);
                const placPulse = 0.15 + Math.cos(tick * 0.11) * 0.05;
                placGrad.addColorStop(0.0, "rgba(225, 29, 72, " + (placPulse * cpi).toFixed(3) + ")");
                placGrad.addColorStop(0.60, "rgba(251, 113, 133, " + (placPulse * 0.45 * cpi).toFixed(3) + ")");
                placGrad.addColorStop(1.0, "rgba(225, 29, 72, 0.0)");
                ctx.fillStyle = placGrad;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.05, 0, placAuraRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. Lineage-Specific Morphological Overlays
            // A. Monotremata: Duck-Bill Rostrum & Crural Venom Spurs
            if (org.isMonotreme) {
                // Flattened Paddle Tail (Semi-aquatic beaver tail)
                const tailLen = 14.0 + size * 1.1;
                ctx.fillStyle = "#27272a";
                ctx.strokeStyle = "#52525b";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.ellipse(-bodyLen * 0.48 - tailLen * 0.4, 0, tailLen * 0.5, bodyWidth * 0.42, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Electroreceptive Leathery Bill Rostrum
                const headX = bodyLen * 0.32;
                const billLen = 9.5 + size * 0.6;
                const billWidth = bodyWidth * 0.55;

                ctx.fillStyle = "#18181b";
                ctx.strokeStyle = "#71717a";
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                if (typeof ctx.roundRect === "function") {
                    ctx.roundRect(headX + 4.0, -billWidth * 0.5, billLen, billWidth, [2, 6, 6, 2]);
                } else {
                    ctx.rect(headX + 4.0, -billWidth * 0.5, billLen, billWidth);
                }
                ctx.fill();
                ctx.stroke();

                // Electroreceptive Pores Glow on Bill Margins
                const electroAcuity = org.electroreceptiveBillAcuity || 0.84;
                ctx.fillStyle = "rgba(132, 204, 22, " + (0.45 + Math.sin(tick * 0.15) * 0.25).toFixed(2) + ")";
                for (let p = -billWidth * 0.35; p <= billWidth * 0.35; p += 3.2) {
                    ctx.beginPath();
                    ctx.arc(headX + 5.0 + billLen * 0.8, p, 0.8, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Crural Venom Ankle Spurs on Hindlimbs
                const venomEfficacy = org.cruralVenomSpurEfficacy || 0.78;
                ctx.strokeStyle = "#e4e4e7";
                ctx.lineWidth = 0.8;
                ctx.fillStyle = "rgba(132, 204, 22, 0.85)";

                // Left spur
                ctx.beginPath();
                ctx.moveTo(-bodyLen * 0.25, -bodyWidth * 0.52);
                ctx.lineTo(-bodyLen * 0.32, -bodyWidth * 0.52 - 3.8 * venomEfficacy);
                ctx.lineTo(-bodyLen * 0.28, -bodyWidth * 0.52);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Right spur
                ctx.beginPath();
                ctx.moveTo(-bodyLen * 0.25, bodyWidth * 0.52);
                ctx.lineTo(-bodyLen * 0.32, bodyWidth * 0.52 + 3.8 * venomEfficacy);
                ctx.lineTo(-bodyLen * 0.28, bodyWidth * 0.52);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            // B. Metatheria: Crescent Marsupium Pouch & Altricial Neonate Latching
            if (org.isMetatherian) {
                // Crescent Marsupium Pouch Aperture (Anteriorly or posteriorly directed fold)
                ctx.strokeStyle = "rgba(234, 88, 12, 0.85)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.10, 0, bodyWidth * 0.36, -Math.PI * 0.45, Math.PI * 0.45);
                ctx.stroke();

                // Pouch Cavity Depth
                ctx.fillStyle = "rgba(154, 52, 18, 0.45)";
                ctx.beginPath();
                ctx.ellipse(-bodyLen * 0.12, 0, bodyWidth * 0.28, bodyWidth * 0.32, 0, 0, Math.PI * 2);
                ctx.fill();

                // Altricial Neonates Latching on Nipple Teats
                if (org.hasLatchingNeonates || org.pouchGestationTimer > 0) {
                    ctx.fillStyle = "#fed7aa"; // Delicate unpigmented embryonic neonate pink
                    ctx.strokeStyle = "#f97316";
                    ctx.lineWidth = 0.5;

                    // Neonate 1
                    ctx.beginPath();
                    ctx.ellipse(-bodyLen * 0.12, -1.8, 1.8, 1.1, 0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // Neonate 2
                    ctx.beginPath();
                    ctx.ellipse(-bodyLen * 0.14, 1.8, 1.8, 1.1, -0.3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                }
            }

            // C. Eutheria: Choriovitelline Placenta & Trophoblast Vascular Filaments
            if (org.isEutherian) {
                // Internal Uterine Placental Node
                ctx.fillStyle = "rgba(225, 29, 72, 0.50)";
                ctx.beginPath();
                ctx.ellipse(-bodyLen * 0.06, 0, bodyWidth * 0.34, bodyWidth * 0.30, 0, 0, Math.PI * 2);
                ctx.fill();

                // Branching Choriovitelline Capillary Plexus
                ctx.strokeStyle = "rgba(251, 113, 133, 0.70)";
                ctx.lineWidth = 0.6;
                const vascularPulse = (org.placentalVascularization || 0.82);

                ctx.beginPath();
                // Dorsal capillary branch
                ctx.moveTo(-bodyLen * 0.06, 0);
                ctx.quadraticCurveTo(-bodyLen * 0.08, -bodyWidth * 0.22, -bodyLen * 0.14, -bodyWidth * 0.28);
                // Ventral capillary branch
                ctx.moveTo(-bodyLen * 0.06, 0);
                ctx.quadraticCurveTo(-bodyLen * 0.08, bodyWidth * 0.22, -bodyLen * 0.14, bodyWidth * 0.28);
                // Anterior trophoblast feeder
                ctx.moveTo(-bodyLen * 0.06, 0);
                ctx.lineTo(bodyLen * 0.08, 0);
                ctx.stroke();

                // Fetal Trophoblast Micro-Villi Nodes
                ctx.fillStyle = "#fda4af";
                ctx.beginPath();
                ctx.arc(-bodyLen * 0.14, -bodyWidth * 0.28, 0.9, 0, Math.PI * 2);
                ctx.arc(-bodyLen * 0.14, bodyWidth * 0.28, 0.9, 0, Math.PI * 2);
                ctx.arc(bodyLen * 0.08, 0, 1.0, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render ecosystem-wide pouch nurturing auras, placental fetal pulses, and monotreme electric wavelets.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas context.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {number} tick - Simulation frame count.
         */
        static drawTherianAtmospherics(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // 1. Marsupium Pouch Maternal Nursing Halos
                if (org.isMetatherian && (org.hasLatchingNeonates || org.pouchGestationTimer > 0) && (tick + i) % 10 === 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const pouchRadius = 12.0 + Math.sin(tick * 0.12 + i) * 3.0;
                    ctx.strokeStyle = "rgba(234, 88, 12, 0.28)";
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.arc(0, 0, pouchRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // 2. Choriovitelline Placental Nutrient Transfer Shimmer
                if (org.isEutherian && (org.choriovitellinePlacentaIndex || 0) > 60.0 && (tick + i) % 12 === 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const placRadius = 14.0 + (tick % 14) * 1.4;
                    const placAlpha = Math.max(0.0, 0.32 - (placRadius / 36.0));
                    ctx.strokeStyle = "rgba(225, 29, 72, " + placAlpha.toFixed(2) + ")";
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.arc(0, 0, placRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // 3. Monotreme Electroreceptive Search Field Wavelets
                if (org.isMonotreme && (tick + i) % 14 === 0) {
                    ctx.save();
                    ctx.translate(org.x, org.y);
                    const billAngle = org.angle !== undefined ? org.angle : 0;
                    const billX = Math.cos(billAngle) * 16.0;
                    const billY = Math.sin(billAngle) * 16.0;
                    const waveR = 8.0 + (tick % 10) * 1.5;
                    ctx.strokeStyle = "rgba(132, 204, 22, 0.22)";
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.arc(billX, billY, waveR, billAngle - Math.PI * 0.35, billAngle + Math.PI * 0.35);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TherianOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.TherianOpticsRenderer = TherianOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
