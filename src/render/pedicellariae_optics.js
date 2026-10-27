// BioEcosystem - Echinoderm Stereom Lattice, Calcite Spines & Snapping Pedicellariae Optics
// Module: src/render/pedicellariae_optics.js
// Version: 7.28.0 (Hour 448 - Looks & UI Agent: Broken Spine Stumps, Venom Droplets & % PDR Optics)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PedicellariaeOpticsRenderer
     * High-fidelity scientific microscope optics for echinoderm endoskeleton, spines, and grooming pincers:
     * - Stereom Porous Trabecular Lattice: 3D micro-porous calcite endoskeleton ossicle plates beneath the epidermis,
     *   exhibiting trabecular micro-fenestrations, calcite crystal birefringence, and impact energy damping halos.
     * - Ball-and-Socket Calcite Spines: Articulated spines anchored on rounded tubercles with 360-degree mobility,
     *   fluted longitudinal grooves, sharp crystalline tips, and dynamic swiveling toward approaching predators.
     * - Broken Spine Stumps & Axial Regrowth: Jagged fractured calcite stumps and glowing crystalline axial regrowth buds.
     * - Globiferous Pedicellariae Venom Glands: Microscopic 2-3 jawed snapping pincers with luminescent ruby neurotoxin
     *   vesicles and aerosolized toxic discharge bursts during defensive strikes (% PDR).
     * - Dermal Papulae Suffocation: Dark encrusting biofilm crusts occluding inter-ossicle respiratory papulae.
     * - Global Benthic Calcite Stratum: Suspended stereom micro-spicules and mineral shimmer in the sediment boundary layer.
     * - Active Bite Overlays: Transient snapping arcs and crimson venom-injection shockwaves.
     */
    class PedicellariaeOpticsRenderer {
        /**
         * Render individual echinoderm stereom endoskeleton, spines, and pedicellariae pincers.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawStereomAndSpines(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.hasStereom && (!org.calciteSpinesCount || org.calciteSpinesCount <= 0)) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const spinesCount = Math.min(32, Math.max(6, org.calciteSpinesCount || 16));
            const brokenCount = Math.min(spinesCount, Math.max(0, org.brokenSpinesCount || 0));
            const regenProgress = org.spineRegenProgress || 0.0;
            const spineLen = Math.max(6.0, Math.min(26.0, org.spineLength || 12.0));
            const porosity = org.stereomPorousLattice || 0.52;
            const damping = org.impactDampingCoefficient || 0.45;
            const orientAngle = org.spineOrientAngle || 0.0;
            const pincersCount = Math.min(50, Math.max(8, org.pedicellariaePincerCount || 24));
            const snapVel = org.pincerSnappingVelocity || 0.65;
            const fouling = org.epibiontFoulingLevel || 0.0;
            const dermalImpairment = org.dermalGasExchangeImpairment || 0.0;
            const neurotoxin = org.neurotoxinPayload || 0.0;
            const maxNeuro = org.maxNeurotoxinCapacity || 25.0;
            const spi = org.stereomProtectionIndex || 0.0;
            const pdr = org.pedicellariaeDeterrenceRatio || 0.0;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Stereom Porous Trabecular Endoskeleton Plates & Damping Halo
            this.drawTrabecularStereomPlates(ctx, size, porosity, damping, spi, pdr, tick);

            // 2. Ball-and-Socket Tubercles, Broken Spine Stumps & Intact Spines
            this.drawArticulatedCalciteSpines(ctx, size, spinesCount, spineLen, orientAngle, heading, spi, brokenCount, regenProgress, tick);

            // 3. Active Pedicellariae Pincers & Globiferous Venom Droplets
            this.drawPedicellariaePincers(ctx, size, pincersCount, snapVel, fouling, pdr, neurotoxin, maxNeuro, tick);

            // 4. Epibiont Fouling Biofilm Specks, Dermal Papulae Suffocation & Clean Sheen
            this.drawEpibiontState(ctx, size, fouling, spi, dermalImpairment, tick);

            ctx.restore();
        }

        /**
         * Render the 3D trabecular micro-porous calcite stereom ossicle plates, damping halo, and ruby deterrence boundary.
         */
        static drawTrabecularStereomPlates(ctx, size, porosity, damping, spi, pdr, tick) {
            const plateRadius = size * 0.92;
            const pulse = Math.sin(tick * 0.04) * 0.08;

            // Impact energy dissipation aura if under stress or high damping
            if (damping > 0.40 || spi > 0.35) {
                const dampingAlpha = (damping - 0.25) * 0.28 + pulse;
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, plateRadius * (1.18 + damping * 0.15), 0, Math.PI * 2);
                ctx.fillStyle = "rgba(148, 163, 184, " + Math.max(0.04, dampingAlpha).toFixed(3) + ")";
                ctx.fill();
                ctx.restore();
            }

            // Ruby red chemical defense / deterrence aura if PDR is active
            if (pdr > 0.40) {
                const pdrAlpha = (pdr - 0.30) * 0.22 + Math.sin(tick * 0.08) * 0.05;
                ctx.save();
                ctx.beginPath();
                ctx.arc(0, 0, plateRadius * 1.12, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(225, 29, 72, " + Math.max(0.05, pdrAlpha).toFixed(3) + ")";
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.restore();
            }

            // Calcite Ossicle Plates (polygon mosaic representing interlocking calcified plates)
            const numPlates = 5;
            ctx.save();
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";

            for (let i = 0; i < numPlates; i++) {
                const plateAngle = (i / numPlates) * Math.PI * 2;
                const px = Math.cos(plateAngle) * (plateRadius * 0.55);
                const py = Math.sin(plateAngle) * (plateRadius * 0.55);
                const subRadius = plateRadius * 0.42;

                ctx.beginPath();
                ctx.arc(px, py, subRadius, 0, Math.PI * 2);
                ctx.fillStyle = (i % 2 === 0) ? "rgba(203, 213, 225, 0.18)" : "rgba(148, 163, 184, 0.14)";
                ctx.fill();
                ctx.stroke();

                // Trabecular micro-pore fenestrations (stereom pore mesh)
                const pores = Math.round(4 + porosity * 6);
                ctx.fillStyle = "rgba(71, 85, 105, 0.30)";
                for (let p = 0; p < pores; p++) {
                    const poreAng = (p / pores) * Math.PI * 2 + (i * 0.4);
                    const poreDist = subRadius * (0.35 + (p % 3) * 0.20);
                    const poreX = px + Math.cos(poreAng) * poreDist;
                    const poreY = py + Math.sin(poreAng) * poreDist;
                    const poreSize = 0.8 + (1.0 - porosity) * 0.6;

                    ctx.beginPath();
                    ctx.arc(poreX, poreY, poreSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Central Madreporite / Discal Stereom Boss
            ctx.beginPath();
            ctx.arc(0, 0, plateRadius * 0.36, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(241, 245, 249, 0.32)";
            ctx.fill();
            ctx.strokeStyle = "rgba(203, 213, 225, 0.65)";
            ctx.stroke();

            ctx.restore();
        }

        /**
         * Render ball-and-socket articulated calcite spines, broken spine stumps, and axial crystal regrowth buds.
         */
        static drawArticulatedCalciteSpines(ctx, size, spinesCount, spineLen, orientAngle, heading, spi, brokenCount, regenProgress, tick) {
            const baseRadius = size * 0.95;
            const relOrient = orientAngle - heading; // Relative orientation to heading coordinate space

            ctx.save();

            for (let i = 0; i < spinesCount; i++) {
                const nominalAngle = (i / spinesCount) * Math.PI * 2;
                const tubX = Math.cos(nominalAngle) * baseRadius;
                const tubY = Math.sin(nominalAngle) * baseRadius;

                // 1. Ball-Joint Tubercle (hemispherical calcite boss)
                ctx.beginPath();
                ctx.arc(tubX, tubY, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(248, 250, 252, 0.85)";
                ctx.fill();
                ctx.strokeStyle = "rgba(100, 116, 139, 0.60)";
                ctx.lineWidth = 0.6;
                ctx.stroke();

                // 2. Articulated Spine Swiveling Kinetics
                let angleDiff = relOrient - nominalAngle;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

                let actualSpineAngle = nominalAngle;
                if (Math.abs(angleDiff) < Math.PI * 0.60) {
                    actualSpineAngle = nominalAngle + angleDiff * 0.35;
                } else {
                    const wave = Math.sin(tick * 0.06 + i * 0.8) * 0.08;
                    actualSpineAngle = nominalAngle + wave;
                }

                const isBroken = (i < brokenCount);

                if (isBroken) {
                    // Fractured Calcite Spine Stump
                    const stumpLen = 2.5 + 3.0 * regenProgress;
                    const tipX = tubX + Math.cos(actualSpineAngle) * stumpLen;
                    const tipY = tubY + Math.sin(actualSpineAngle) * stumpLen;

                    ctx.beginPath();
                    ctx.moveTo(tubX, tubY);
                    ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = "rgba(148, 163, 184, 0.70)";
                    ctx.lineWidth = 1.6;
                    ctx.lineCap = "square";
                    ctx.stroke();

                    // Jagged fracture line at stump tip
                    ctx.beginPath();
                    ctx.arc(tipX, tipY, 0.7, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(100, 116, 139, 0.85)";
                    ctx.fill();

                    // Axial crystalline regrowth bud if regenerating
                    if (regenProgress > 0.05) {
                        const budGlow = (Math.sin(tick * 0.12 + i) + 1.0) * 0.5;
                        ctx.beginPath();
                        ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(226, 232, 240, " + (0.50 + budGlow * 0.40).toFixed(2) + ")";
                        ctx.fill();
                    }
                } else {
                    // Intact Sharp Calcite Spine Shaft
                    const curSpineLen = spineLen * (0.85 + (i % 3) * 0.15);
                    const tipX = tubX + Math.cos(actualSpineAngle) * curSpineLen;
                    const tipY = tubY + Math.sin(actualSpineAngle) * curSpineLen;

                    ctx.beginPath();
                    ctx.moveTo(tubX, tubY);
                    ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = (spi > 0.40) ? "rgba(241, 245, 249, 0.85)" : "rgba(203, 213, 225, 0.70)";
                    ctx.lineWidth = 1.3;
                    ctx.lineCap = "round";
                    ctx.stroke();

                    // Spine crystalline apex point (sharp refractive glint)
                    ctx.beginPath();
                    ctx.arc(tipX, tipY, 0.9, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                    ctx.fill();

                    // Puncture deterrence halo on needle tip if high protection
                    if (spi > 0.50 && (i % 2 === 0)) {
                        ctx.beginPath();
                        ctx.arc(tipX, tipY, 1.8, 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
                        ctx.fill();
                    }
                }
            }

            ctx.restore();
        }

        /**
         * Render active 2-3 jawed micro-pincers (pedicellariae) with globiferous venom droplets.
         */
        static drawPedicellariaePincers(ctx, size, pincersCount, snapVel, fouling, pdr, neurotoxin, maxNeuro, tick) {
            const pincerZoneRadius = size * 0.72;
            const snapCycleSpeed = 0.08 * snapVel * 60.0;
            const venomRatio = Math.max(0.0, Math.min(1.0, neurotoxin / Math.max(1.0, maxNeuro)));

            ctx.save();

            for (let j = 0; j < pincersCount; j++) {
                const ang = (j / pincersCount) * Math.PI * 2 + 0.18;
                const dist = pincerZoneRadius * (0.45 + (j % 4) * 0.16);
                const px = Math.cos(ang) * dist;
                const py = Math.sin(ang) * dist;

                // Base stalk of pedicellaria
                ctx.beginPath();
                ctx.arc(px, py, 0.9, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(148, 163, 184, 0.80)";
                ctx.fill();

                // Globiferous venom vesicle (luminescent ruby droplet)
                if (venomRatio > 0.15 && (j % 2 === 0)) {
                    ctx.beginPath();
                    ctx.arc(px, py, 1.2 * venomRatio, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(225, 29, 72, " + (0.45 + venomRatio * 0.40).toFixed(2) + ")";
                    ctx.fill();
                }

                // Snapping micro-jaw cycle (alternating opening and snapping shut)
                const phase = (tick * snapCycleSpeed + j * 1.3) % (Math.PI * 2);
                const jawAperture = Math.abs(Math.sin(phase)) * 0.75 + 0.15;
                const jawLen = 2.4 + (j % 2) * 0.8;

                // 2 or 3 articulated jaws
                const numJaws = (j % 3 === 0) ? 3 : 2;
                ctx.lineWidth = 0.7;
                ctx.strokeStyle = (venomRatio > 0.40) ? "rgba(254, 205, 211, 0.95)" : "rgba(226, 232, 240, 0.90)";

                for (let k = 0; k < numJaws; k++) {
                    const jawAngle = ang + (k / numJaws) * Math.PI * 2 * (jawAperture * 0.35);
                    const jx = px + Math.cos(jawAngle) * jawLen;
                    const jy = py + Math.sin(jawAngle) * jawLen;

                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(jx, jy);
                    ctx.stroke();

                    // Micro-tooth at jaw apex
                    ctx.beginPath();
                    ctx.arc(jx, jy, 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
                    ctx.fill();
                }

                // Snapping micro-flash or venom aerosol burst if jaw closes near peak velocity
                if (phase > 2.8 && phase < 3.2 && (j % 3 === 0)) {
                    ctx.beginPath();
                    ctx.arc(px, py, 2.4, 0, Math.PI * 2);
                    ctx.fillStyle = (venomRatio > 0.30) ? "rgba(225, 29, 72, 0.50)" : "rgba(148, 163, 184, 0.40)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render epibiont fouling biofilm specks, dermal papulae respiratory suffocation, and clean sheen.
         */
        static drawEpibiontState(ctx, size, fouling, spi, dermalImpairment, tick) {
            ctx.save();

            // Biofilm encrustation specks when fouling is present
            if (fouling > 0.05) {
                const speckCount = Math.round(fouling * 14);
                ctx.fillStyle = "rgba(101, 163, 13, " + Math.min(0.70, fouling * 0.85).toFixed(2) + ")";

                for (let s = 0; s < speckCount; s++) {
                    const sAng = s * 2.399 + (tick * 0.002);
                    const sDist = size * 0.65 * (0.3 + (s % 5) * 0.14);
                    const sx = Math.cos(sAng) * sDist;
                    const sy = Math.sin(sAng) * sDist;

                    ctx.beginPath();
                    ctx.arc(sx, sy, 0.8 + (s % 3) * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Dermal papulae suffocation crust occluding respiratory pores
            if (dermalImpairment > 0.08) {
                const crustAlpha = Math.min(0.60, dermalImpairment * 0.65);
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.70, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(84, 110, 42, " + crustAlpha.toFixed(2) + ")";
                ctx.fill();
            }

            // Pearlescent clean sheen if fouling is eradicated (<0.12) and SPI is high
            if (fouling < 0.12 && spi > 0.45 && dermalImpairment < 0.05) {
                const gleamPulse = (Math.sin(tick * 0.05) + 1.0) * 0.5;
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.85, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(241, 245, 249, " + (0.15 + gleamPulse * 0.20).toFixed(2) + ")";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render dish-wide benthic stereom environment, suspended calcite spicules, and mineral dusting.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} width - Dish width.
         * @param {number} height - Dish height.
         * @param {Object} manager - EchinodermPedicellariaeManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawGlobalPedicellariaeEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.metrics;
            if (!metrics || metrics.totalStereomOrganisms <= 0) return;

            const sedimentTop = height - 90;
            const prevalence = Math.min(1.0, metrics.totalStereomOrganisms / 8.0);
            const spiculeCount = Math.min(24, Math.round(prevalence * 20));

            ctx.save();

            // 1. Subtle benthic calcite spicule dusting
            for (let i = 0; i < spiculeCount; i++) {
                const seed = i * 43.17;
                const drift = Math.sin(tick * 0.015 + i) * 16.0;
                const sx = (seed * 19.3 + drift) % width;
                const sy = sedimentTop + ((seed * 11.7) % 80);
                const spiculeLen = 3.0 + (i % 3) * 2.0;
                const spiculeAng = (i * 1.1) + Math.sin(tick * 0.02 + i) * 0.2;

                const ex = sx + Math.cos(spiculeAng) * spiculeLen;
                const ey = sy + Math.sin(spiculeAng) * spiculeLen;

                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = "rgba(226, 232, 240, " + (0.10 + (i % 4) * 0.05).toFixed(2) + ")";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(ex, ey, 0.6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
                ctx.fill();
            }

            // 2. Active Defense Pincer / Spine Contact Shockwaves & Venom Cloud
            if (metrics.activeSpineDeflections > 0 || metrics.pincerSnappingEvents > 0 || metrics.venomInjectionEvents > 0) {
                const activityAlpha = Math.min(0.12, (metrics.activeSpineDeflections * 0.02 + metrics.pincerSnappingEvents * 0.005 + (metrics.venomInjectionEvents || 0) * 0.02));
                ctx.fillStyle = (metrics.venomInjectionEvents > 0) ? "rgba(225, 29, 72, " + activityAlpha.toFixed(3) + ")" : "rgba(148, 163, 184, " + activityAlpha.toFixed(3) + ")";
                ctx.fillRect(0, sedimentTop, width, 85);
            }

            ctx.restore();
        }

        /**
         * Render transient defense snapping arcs, venom shockwaves, and parasite-crushing micro-flashes in overlay pass.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Array<Object>} organisms - Array of live organisms.
         * @param {number} tick - Simulation frame count.
         */
        static drawPedicellariaeSnaps(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            ctx.save();

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.hasStereom) continue;

                const pdr = org.pedicellariaeDeterrenceRatio || 0.0;
                if (pdr > 0.35) {
                    const snapPhase = (tick * 0.15 + i * 2.1) % (Math.PI * 2);
                    if (snapPhase < 0.65) {
                        const radius = (org.dna ? org.dna.size : 8.0) * (1.3 + snapPhase * 0.85);
                        const alpha = (0.65 - snapPhase) * 0.70;

                        ctx.beginPath();
                        ctx.arc(org.x, org.y, radius, 0, Math.PI * 2);
                        ctx.strokeStyle = (org.neurotoxinPayload && org.neurotoxinPayload > 2.0) ?
                            "rgba(225, 29, 72, " + alpha.toFixed(2) + ")" :
                            "rgba(226, 232, 240, " + alpha.toFixed(2) + ")";
                        ctx.lineWidth = 1.1;
                        ctx.stroke();
                    }
                }
            }

            ctx.restore();
        }
    }

    global.PedicellariaeOpticsRenderer = PedicellariaeOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
