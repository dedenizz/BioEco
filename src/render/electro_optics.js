// BioEcosystem - Bioelectric Dipole Field Lines, Membrane Discharge Arcs & Magnetic Flux Optics
// Module: src/render/electro_optics.js
// Version: 6.48.0 (Hour 368 - Looks / UI Agent: 70th Channel % MPO, Crypsis Halos & Swarm Flux)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectroOpticsRenderer
     * High-fidelity microscope rendering of bioelectric and biomagnetic phenomena:
     * - Pulsing electrostatic dipole field lines (drawDipoleFieldLines) in cyan and amber
     * - Membrane action potential branching discharge arcs and spark bursts (drawMembraneDischarges)
     * - Electrostatic crypsis dampening veils (drawElectrostaticCrypsis) masking ionic leakage
     * - Ampullae of Lorenzini electroreceptor gel pore beads along cell boundaries (drawElectroreceptors)
     * - Magnetotaktik alignment auras and geomagnetic navigation flux vectors (drawMagneticHeadingVector)
     * - Dish-wide ambient geomagnetic flux streamlines and coherent swarm flux linkages
     */
    class ElectroOpticsRenderer {
        /**
         * Render individual cell bioelectric, discharge, and magnetic optics.
         */
        static drawCellBioelectric(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const electro = org.electroreceptors || 0.0;
            const dipole = org.dipoleFieldStrength || 0.0;
            const potential = (typeof org.membranePotential === "number") ? org.membranePotential : -70.0;
            const magnet = org.magnetosomeChain || 0.0;
            const crypsis = org.electrostaticCrypsis || 0.0;

            if (electro <= 0.1 && dipole <= 0.02 && magnet <= 0.1 && potential <= -65.0 && crypsis <= 0.15) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Electrostatic crypsis dampening veil (soft teal shielding halo)
            if (crypsis > 0.20) {
                ElectroOpticsRenderer.drawElectrostaticCrypsis(ctx, org, size, crypsis, tick);
            }

            // 2. Passive geomagnetic navigation heading and flux aura
            if (magnet > 0.15) {
                ElectroOpticsRenderer.drawMagneticHeadingVector(ctx, org, size, magnet, tick);
            }

            // 3. Electrostatic dipole equipotential curves
            if (dipole > 0.04 || potential > -60.0) {
                ElectroOpticsRenderer.drawDipoleFieldLines(ctx, org, size, dipole, potential, crypsis, tick);
            }

            // 4. High-voltage membrane action potential discharge arcs
            if (potential > -10.0 || (org.actionPotentialCooldown && org.actionPotentialCooldown > 35)) {
                ElectroOpticsRenderer.drawMembraneDischarges(ctx, org, size, potential, tick);
            }

            // 5. Conductive Ampullae of Lorenzini pore clusters
            if (electro > 0.5) {
                ElectroOpticsRenderer.drawElectroreceptors(ctx, org, size, electro, tick);
            }

            ctx.restore();
        }

        /**
         * Render electrostatic crypsis veil dampening outward ionic dipole emission.
         */
        static drawElectrostaticCrypsis(ctx, org, size, crypsis, tick) {
            const pulse = 0.85 + 0.15 * Math.sin(tick * 0.10 + (org.id || 0));
            const radius = size * (1.15 + crypsis * 0.35);

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.40 * crypsis * pulse})`;
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        /**
         * Render conductive Ampullae of Lorenzini pore nodes along the cell margin.
         */
        static drawElectroreceptors(ctx, org, size, electro, tick) {
            const poreCount = Math.min(8, Math.max(2, Math.floor(electro)));
            const angle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const pulse = 0.7 + 0.3 * Math.sin(tick * 0.15 + (org.id || 0));

            ctx.save();
            ctx.rotate(angle);

            for (let i = 0; i < poreCount; i++) {
                const spreadAngle = -0.75 + (1.5 / Math.max(1, poreCount - 1)) * i;
                const px = Math.cos(spreadAngle) * (size + 1.2);
                const py = Math.sin(spreadAngle) * (size + 1.2);

                ctx.beginPath();
                ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${0.75 * pulse})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(px, py, 2.8, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(14, 165, 233, ${0.35 * pulse})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
            ctx.restore();
        }

        /**
         * Render pulsing electrostatic dipole field lines wrapping around the cell.
         */
        static drawDipoleFieldLines(ctx, org, size, dipole, potential, crypsis, tick) {
            const dampingFactor = 1.0 - (crypsis || 0.0) * 0.55;
            const fieldRadius = size * (1.6 + dipole * 2.8 * dampingFactor);
            const pulse = Math.sin(tick * 0.18 + (org.id || 0) * 0.5);
            const isExcited = potential > -30.0;
            const alpha = Math.min(0.65, (0.12 + dipole * 0.5) * dampingFactor);

            const strokeColor = isExcited
                ? `rgba(245, 158, 11, ${alpha})`
                : `rgba(56, 189, 248, ${alpha})`;

            ctx.save();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.ellipse(0, 0, fieldRadius, fieldRadius * 0.75, (org.angle || 0) + pulse * 0.1, 0, Math.PI * 2);
            ctx.stroke();

            if (dipole > 0.25) {
                const outerRadius = fieldRadius * 1.45;
                ctx.beginPath();
                ctx.ellipse(0, 0, outerRadius, outerRadius * 0.65, (org.angle || 0) - pulse * 0.12, 0, Math.PI * 2);
                ctx.strokeStyle = isExcited
                    ? `rgba(251, 191, 36, ${alpha * 0.5})`
                    : `rgba(125, 211, 252, ${alpha * 0.5})`;
                ctx.setLineDash([3, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
            ctx.restore();
        }

        /**
         * Render branching dielectric breakdown arcs and spark flashes during action potentials.
         */
        static drawMembraneDischarges(ctx, org, size, potential, tick) {
            const arcCount = potential > 10.0 ? 5 : 3;
            const arcReach = size * (1.4 + (Math.max(0, potential + 20.0) / 60.0) * 1.2);

            ctx.save();
            for (let i = 0; i < arcCount; i++) {
                const baseAngle = (i / arcCount) * Math.PI * 2 + (tick * 0.25);
                const startX = Math.cos(baseAngle) * size;
                const startY = Math.sin(baseAngle) * size;

                const midDist = size + (arcReach - size) * 0.55;
                const midJitter = (Math.sin(tick * 3.7 + i * 1.9) * 0.4);
                const midX = Math.cos(baseAngle + midJitter) * midDist;
                const midY = Math.sin(baseAngle + midJitter) * midDist;

                const endX = Math.cos(baseAngle + midJitter * 1.5) * arcReach;
                const endY = Math.sin(baseAngle + midJitter * 1.5) * arcReach;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(midX, midY);
                ctx.lineTo(endX, endY);

                ctx.strokeStyle = "rgba(254, 240, 138, 0.9)";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(endX, endY, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
                ctx.fill();
            }
            ctx.restore();
        }

        /**
         * Render passive magnetotactic compass alignment vector and violet flux aura.
         */
        static drawMagneticHeadingVector(ctx, org, size, magnet, tick) {
            const alignment = org.biomagneticHeading || 0.5;
            const isBypassed = (org.magneticLockBypassTicks && org.magneticLockBypassTicks > 0);
            const alpha = Math.min(0.55, magnet * (0.2 + alignment * 0.35));
            const vectorLen = size * (1.5 + magnet * 0.8);
            const ambientAngle = Math.PI * 0.5; // Geomagnetic North-South axis

            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.85, 0, Math.PI * 2);
            ctx.strokeStyle = isBypassed ? "rgba(239, 68, 68, 0.45)" : `rgba(192, 132, 252, ${alpha * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            const curAngle = typeof org.angle === "number" ? org.angle : Math.atan2(org.vy || 0, org.vx || 0.01);
            const delta = ambientAngle - curAngle;

            ctx.rotate(curAngle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(delta) * vectorLen, Math.sin(delta) * vectorLen);
            ctx.strokeStyle = isBypassed ? "rgba(244, 63, 94, 0.65)" : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.restore();
        }

        /**
         * Global dish-wide geomagnetic field lines and swarm polar flux linkages.
         */
        static drawGlobalGeomagneticField(ctx, organisms, width, height, tick) {
            if (!ctx) return;

            ctx.save();
            ctx.strokeStyle = "rgba(168, 85, 247, 0.025)";
            ctx.lineWidth = 0.6;
            ctx.setLineDash([6, 12]);

            const spacing = 75;
            for (let x = spacing * 0.5; x < width; x += spacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            ctx.setLineDash([]);

            if (Array.isArray(organisms)) {
                ctx.lineWidth = 0.8;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || (org.detectedDipolesCount || 0) === 0) continue;
                    if (org.niche !== "carnivore" && org.niche !== "apex") continue;

                    const reach = org.electroSensitivity || 80.0;
                    ctx.beginPath();
                    ctx.arc(org.x, org.y, reach * 0.75, 0, Math.PI * 2);
                    ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ElectroOpticsRenderer;
    } else {
        global.ElectroOpticsRenderer = ElectroOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
