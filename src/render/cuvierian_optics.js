// BioEcosystem - Holothuroid Morphology, Deposit Feeding & Cuvierian Tubules Optics
// Module: src/render/cuvierian_optics.js
// Version: 7.48.0 (Hour 468 - Looks & UI Agent: Visceral Decoy Expulsion, Cloacal Parasites & Mesenteric Buds)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CuvierianOpticsRenderer
     * High-fidelity scientific microscope optics for holothuroid (sea cucumber) anatomy and defenses:
     * - Secondary Bilateral Symmetry & Vermiform Hydrostatic Body: Elongated leathery body wall with trivium and bivium differentiation
     * - Flaccid Turgor & Mesenteric Regeneration: Shrunken body wall during evisceration versus violet mesenteric stem cell shimmer
     * - Dendritic Oral Tentacles: 10-20 mucus-coated branched tentacles rhythmically sweeping sediment into the oral aperture
     * - Caudal Cloacal Sphincter & Parasitic Intrusion: Hydrostatic water pumping with silver Carapid pearlfish / parasite specks
     * - Eviscerated Visceral Decoy Masses: Coiled pink-purple alimentary loops and respiratory tree fragments distracting predators
     * - Cuvierian Tubules Defense Ejection Volleys: Rapidly hydrating, tensile protein silk nets entangling attacking predators
     * - Holothurin Chemical Defense & Visceral Aura: Iridescent cyan and royal violet halo surrounding regenerating organisms
     * - Benthic Bioturbation & Purified Mineral Fecal Pellets: Cylindrical sand castings and oxygenated sediment trails
     */
    class CuvierianOpticsRenderer {
        /**
         * Render individual holothuroid anatomy, tentacles, crawling sole, and defensive status.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Object} org - Organism entity.
         * @param {number} tick - Simulation frame count.
         */
        static drawHolothuroid(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            if (!org.hasHolothuroidTrait) return;

            const size = org.dna ? (org.dna.size || 8.0) : 8.0;
            const elongation = org.elongationRatio || 2.2;
            const tentacles = org.oralTentaclesCount || 12;
            const complexity = org.tentacleBranchingComplexity || 0.70;
            const heading = Math.atan2(org.vy || 0, org.vx || 1);
            const isFeeding = (org.y >= 310.0 && (org.energy && org.energy < 92.0));
            const toxin = org.holothurinToxinPayload || 0.0;
            const cdi = org.cuvierianDefenseIndex || 0.0;
            const vri = org.visceralRegenerationIndex || 1.0;
            const viscera = org.visceralIntegrity !== undefined ? org.visceralIntegrity : 1.0;
            const parasiteLoad = org.respiratoryParasiteLoad || 0.0;

            ctx.save();
            ctx.translate(org.x, org.y);
            ctx.rotate(heading);

            // 1. Vermiform Hydrostatic Leathery Cuticle with Flaccid/Regen Scaling
            CuvierianOpticsRenderer.drawCucumberBody(ctx, size, elongation, viscera, vri, tick);

            // 2. Bivium: Dorsal Sensory Conical Warts & Papillae
            CuvierianOpticsRenderer.drawBiviumPapillae(ctx, size, elongation, viscera, tick);

            // 3. Trivium: Ventral Locomotive Tube Feet Sole
            CuvierianOpticsRenderer.drawTriviumPodia(ctx, size, elongation, viscera, tick);

            // 4. Anterior Oral Pole: Branched Mucus Tentacles
            CuvierianOpticsRenderer.drawOralTentacles(ctx, size, elongation, tentacles, complexity, isFeeding, viscera, tick);

            // 5. Caudal Aboral Pole: Cloacal Ventilation Pores with Inquiline Parasites
            CuvierianOpticsRenderer.drawCloacalVentilation(ctx, size, elongation, org.cloacalPhase || 0, parasiteLoad, tick);

            // 6. Dual Chemical Defense & Visceral Regeneration Aura
            if (toxin > 15.0 || cdi > 0.30 || vri < 0.85) {
                CuvierianOpticsRenderer.drawDualHolothuroidAura(ctx, size, elongation, toxin, cdi, vri, viscera, tick);
            }

            ctx.restore();
        }

        /**
         * Render elongated vermiform leathery cucumber body with organic muscular undulating contours.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Length-to-width elongation ratio.
         * @param {number} viscera - Visceral integrity [0.0 - 1.0].
         * @param {number} vri - Visceral regeneration index [0.0 - 1.0].
         * @param {number} tick - Simulation frame count.
         */
        static drawCucumberBody(ctx, size, elongation, viscera, vri, tick) {
            const halfLen = size * elongation * 0.52;
            // Flaccid turgor loss when viscera is eviscerated
            const turgorFactor = 0.72 + viscera * 0.28;
            const halfWidth = size * 0.55 * turgorFactor;
            const peristalsis = Math.sin(tick * 0.08) * 0.06;

            ctx.save();

            // Organic capsule-like ellipse profile
            ctx.beginPath();
            ctx.ellipse(0, 0, halfLen * (1.0 + peristalsis), halfWidth * (1.0 - peristalsis), 0, 0, Math.PI * 2);

            // Deep benthic leathery dermis gradient
            const bodyGrad = ctx.createLinearGradient(-halfLen, -halfWidth, halfLen, halfWidth);
            if (viscera < 0.60) {
                // Post-evisceration paler, semi-translucent coelomic cavity
                bodyGrad.addColorStop(0, "rgba(71, 85, 105, 0.75)");
                bodyGrad.addColorStop(0.5, "rgba(51, 65, 85, 0.80)");
                bodyGrad.addColorStop(1, "rgba(30, 41, 59, 0.75)");
            } else {
                bodyGrad.addColorStop(0, "rgba(51, 65, 85, 0.90)"); // Slate gray anterior
                bodyGrad.addColorStop(0.5, "rgba(30, 41, 59, 0.95)"); // Deep dark blue-gray midbody
                bodyGrad.addColorStop(1, "rgba(15, 23, 42, 0.92)"); // Caudal posterior
            }

            ctx.fillStyle = bodyGrad;
            ctx.fill();

            ctx.strokeStyle = "rgba(71, 85, 105, 0.85)";
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Mesenteric stem cell proliferation shimmer during regeneration
            if (viscera < 0.95) {
                const regenPulse = Math.sin(tick * 0.15) * 0.15;
                ctx.beginPath();
                ctx.ellipse(0, 0, halfLen * 0.65, halfWidth * 0.45, 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(168, 85, 247, " + (0.35 + regenPulse).toFixed(2) + ")"; // Royal violet mesenteric bud
                ctx.lineWidth = 0.8;
                ctx.stroke();
            } else {
                // Sub-dermal collagenous mutable tissue bands
                ctx.beginPath();
                ctx.ellipse(0, 0, halfLen * 0.75, halfWidth * 0.50, 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(14, 165, 233, 0.35)"; // Cyan hydro-collagen shimmer
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render bivium dorsal sensory conical warts and micro-ciliary tufts.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Elongation ratio.
         * @param {number} viscera - Visceral integrity.
         * @param {number} tick - Simulation frame count.
         */
        static drawBiviumPapillae(ctx, size, elongation, viscera, tick) {
            const halfLen = size * elongation * 0.45;
            const turgor = 0.72 + viscera * 0.28;
            const dorsalY = -size * 0.48 * turgor;
            const count = 6;

            ctx.save();

            for (let i = 0; i < count; i++) {
                const px = -halfLen + (i / (count - 1)) * (halfLen * 2);
                const wartHeight = (1.6 + Math.sin(tick * 0.10 + i) * 0.4) * turgor;

                // Conical dorsal papilla
                ctx.beginPath();
                ctx.moveTo(px - 1.2, dorsalY);
                ctx.lineTo(px, dorsalY - wartHeight);
                ctx.lineTo(px + 1.2, dorsalY);
                ctx.closePath();
                ctx.fillStyle = "rgba(100, 116, 139, 0.85)";
                ctx.fill();

                // Sensory ciliary tip
                ctx.beginPath();
                ctx.arc(px, dorsalY - wartHeight, 0.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(56, 189, 248, 0.90)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render trivium ventral locomotive tube feet crawling sole with metachronal waves.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Elongation ratio.
         * @param {number} viscera - Visceral integrity.
         * @param {number} tick - Simulation frame count.
         */
        static drawTriviumPodia(ctx, size, elongation, viscera, tick) {
            const halfLen = size * elongation * 0.42;
            const turgor = 0.72 + viscera * 0.28;
            const ventralY = size * 0.48 * turgor;
            const count = 7;

            ctx.save();

            for (let i = 0; i < count; i++) {
                const px = -halfLen + (i / (count - 1)) * (halfLen * 2);
                const stepPhase = Math.sin(tick * 0.15 + i * 0.8);
                const extension = (1.2 + Math.max(0, stepPhase) * 1.5) * turgor;

                // Ventral tube foot pedicel
                ctx.beginPath();
                ctx.moveTo(px, ventralY);
                ctx.lineTo(px, ventralY + extension);
                ctx.strokeStyle = "rgba(148, 163, 184, 0.75)";
                ctx.lineWidth = 0.8;
                ctx.stroke();

                // Terminal suction disc
                ctx.beginPath();
                ctx.ellipse(px, ventralY + extension, 1.0, 0.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(226, 232, 240, 0.90)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render 10-20 branched mucus-coated oral tentacles sweeping and probing sediment.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Elongation ratio.
         * @param {number} tentacles - Number of tentacles.
         * @param {number} complexity - Branching complexity.
         * @param {boolean} isFeeding - Whether actively gathering sediment.
         * @param {number} viscera - Visceral integrity.
         * @param {number} tick - Simulation frame count.
         */
        static drawOralTentacles(ctx, size, elongation, tentacles, complexity, isFeeding, viscera, tick) {
            const oralX = size * elongation * 0.52;
            const tentCount = Math.max(8, Math.min(20, tentacles));
            const sweepSpeed = isFeeding ? 0.22 : 0.08;

            ctx.save();
            ctx.translate(oralX, 0);

            for (let t = 0; t < tentCount; t++) {
                const angle = (t * Math.PI * 2) / tentCount;
                const sweepOffset = Math.sin(tick * sweepSpeed + t) * (isFeeding ? 0.35 : 0.15);
                const tentAngle = angle + sweepOffset;

                const tentLen = size * (0.45 + complexity * 0.35);
                const tx = Math.cos(tentAngle) * tentLen;
                const ty = Math.sin(tentAngle) * tentLen;

                // Main tentacle stem
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = (viscera < 0.60) ? "rgba(100, 116, 139, 0.70)" : "rgba(14, 165, 233, 0.85)";
                ctx.lineWidth = 1.0;
                ctx.stroke();

                // Dendritic branching tips (pinnules)
                const branchCount = Math.round(3 + complexity * 3);
                for (let b = 1; b <= branchCount; b++) {
                    const frac = b / (branchCount + 1);
                    const bx = tx * frac;
                    const by = ty * frac;
                    const branchLen = 1.8 + complexity * 1.5;

                    const perpAngle = tentAngle + Math.PI * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(bx, by);
                    ctx.lineTo(bx + Math.cos(perpAngle) * branchLen, by + Math.sin(perpAngle) * branchLen);
                    ctx.lineTo(bx - Math.cos(perpAngle) * branchLen * 0.7, by - Math.sin(perpAngle) * branchLen * 0.7);
                    ctx.strokeStyle = (viscera < 0.60) ? "rgba(148, 163, 184, 0.55)" : "rgba(56, 189, 248, 0.70)";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }

                // Mucus globule on terminal tip
                ctx.beginPath();
                ctx.arc(tx, ty, 0.8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(224, 242, 254, 0.95)";
                ctx.fill();
            }

            ctx.restore();
        }

        /**
         * Render caudal cloacal sphincter dilation, respiratory pumping, and inquiline parasites.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Elongation ratio.
         * @param {number} cloacalPhase - Rhythmic ventilation phase.
         * @param {number} parasiteLoad - Respiratory parasite load [0.0 - 1.0].
         * @param {number} tick - Simulation frame count.
         */
        static drawCloacalVentilation(ctx, size, elongation, cloacalPhase, parasiteLoad, tick) {
            const caudalX = -size * elongation * 0.52;
            const dilation = 1.0 + Math.sin(cloacalPhase) * 0.35;

            ctx.save();
            ctx.translate(caudalX, 0);

            // Cloacal pore
            ctx.beginPath();
            ctx.ellipse(0, 0, 1.2 * dilation, 1.8 * dilation, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
            ctx.fill();
            ctx.strokeStyle = (parasiteLoad > 0.30) ? "rgba(239, 68, 68, 0.75)" : "rgba(56, 189, 248, 0.60)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Respiratory water expulsion wave
            if (Math.sin(cloacalPhase) > 0.5) {
                const waveRad = 2.0 + (Math.sin(cloacalPhase) - 0.5) * 6.0;
                ctx.beginPath();
                ctx.arc(0, 0, waveRad, Math.PI * 0.5, Math.PI * 1.5);
                ctx.strokeStyle = "rgba(14, 165, 233, " + (0.5 - (waveRad / 10.0)).toFixed(2) + ")";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }

            // Inquiline pearlfish / parasite specks wriggling near cloaca
            if (parasiteLoad > 0.15) {
                const pCount = Math.min(3, Math.ceil(parasiteLoad * 3));
                for (let p = 0; p < pCount; p++) {
                    const wiggle = Math.sin(tick * 0.25 + p) * 1.8;
                    const px = -2.5 - p * 2.2;
                    const py = wiggle;

                    // Slender pearlfish silhouette
                    ctx.beginPath();
                    ctx.ellipse(px, py, 2.0, 0.6, 0, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(226, 232, 240, 0.85)"; // Silver fish body
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render dual chemical defense (cyan) and visceral regeneration (violet) halo.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} size - Base radius.
         * @param {number} elongation - Elongation ratio.
         * @param {number} toxin - Toxin payload.
         * @param {number} cdi - Cuvierian defense index.
         * @param {number} vri - Visceral regeneration index.
         * @param {number} viscera - Visceral integrity.
         * @param {number} tick - Simulation frame count.
         */
        static drawDualHolothuroidAura(ctx, size, elongation, toxin, cdi, vri, viscera, tick) {
            const halfLen = size * elongation * 0.55;
            const halfWidth = size * 0.60;
            const pulse = Math.sin(tick * 0.08) * 0.06;

            ctx.save();

            // Cyan Cuvierian / holothurin defense radiance
            if (toxin > 15.0 || cdi > 0.25) {
                ctx.beginPath();
                ctx.ellipse(0, 0, halfLen * (1.10 + pulse), halfWidth * (1.15 + pulse), 0, 0, Math.PI * 2);
                const cdiAlpha = Math.min(0.35, (toxin / 50.0) * 0.25 + cdi * 0.15);
                ctx.strokeStyle = "rgba(14, 165, 233, " + cdiAlpha.toFixed(2) + ")";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }

            // Royal violet visceral regeneration radiance
            if (vri < 0.90 || viscera < 0.90) {
                ctx.beginPath();
                ctx.ellipse(0, 0, halfLen * (1.20 + pulse), halfWidth * (1.25 + pulse), 0, 0, Math.PI * 2);
                const vriAlpha = Math.min(0.40, (1.0 - viscera) * 0.35 + 0.10);
                ctx.strokeStyle = "rgba(168, 85, 247, " + vriAlpha.toFixed(2) + ")";
                ctx.lineWidth = 1.0;
                ctx.stroke();
            }

            ctx.restore();
        }

        /**
         * Render active Cuvierian tubules defense ejection volleys and expelled visceral mass decoys.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {Array<Object>} organisms - Array of live simulation organisms.
         * @param {number} tick - Simulation frame count.
         */
        static drawCuvierianEjections(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms)) return;

            const len = organisms.length;
            ctx.save();

            for (let i = 0; i < len; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.hasHolothuroidTrait) continue;

                const cooldown = org.activeTubuleEjectionCooldown || 0;
                const transient = org.tubulesEjectedTransient || 0;
                const decoyTimer = org.evisceratedVisceraDecoyTimer || 0;

                const heading = Math.atan2(org.vy || 0, org.vx || 1);
                const size = org.dna ? (org.dna.size || 8.0) : 8.0;
                const elongation = org.elongationRatio || 2.2;
                const caudalX = org.x - Math.cos(heading) * (size * elongation * 0.52);
                const caudalY = org.y - Math.sin(heading) * (size * elongation * 0.52);

                // 1. Expelled Visceral Mass Decoy (Alimentary canal & respiratory tree loops)
                if (decoyTimer > 0) {
                    const decoyProgress = decoyTimer / 4.0;
                    const driftDist = (4.0 - decoyTimer) * 4.5;
                    const vx = caudalX - Math.cos(heading) * driftDist;
                    const vy = caudalY - Math.sin(heading) * driftDist;

                    ctx.save();
                    ctx.translate(vx, vy);

                    // Looping coiled pinkish-purple digestive tract
                    ctx.beginPath();
                    for (let c = 0; c < 8; c++) {
                        const ca = (c / 8.0) * Math.PI * 4;
                        const cr = 2.0 + (c % 3) * 1.8;
                        const cx = Math.cos(ca) * cr + Math.sin(tick * 0.15 + c) * 0.8;
                        const cy = Math.sin(ca) * cr + Math.cos(tick * 0.15 + c) * 0.8;
                        if (c === 0) ctx.moveTo(cx, cy);
                        else ctx.lineTo(cx, cy);
                    }
                    ctx.strokeStyle = "rgba(216, 180, 254, " + (0.75 * decoyProgress).toFixed(2) + ")"; // Pinkish purple viscera
                    ctx.lineWidth = 1.6;
                    ctx.stroke();

                    // Coelomic fluid burst halo
                    ctx.beginPath();
                    ctx.arc(0, 0, 10.0 + (4.0 - decoyTimer) * 3.0, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(168, 85, 247, " + (0.22 * decoyProgress).toFixed(2) + ")";
                    ctx.fill();

                    ctx.restore();
                }

                // 2. Cuvierian Defensive Silk Tubule Ejection Volleys
                if (cooldown > 0.2 || transient > 0) {
                    const tubuleCount = Math.max(5, transient > 0 ? transient : 6);
                    const spreadAngle = Math.PI * 0.65;
                    const backAngle = heading + Math.PI;

                    for (let t = 0; t < tubuleCount; t++) {
                        const tOffset = ((t / (tubuleCount - 1)) - 0.5) * spreadAngle;
                        const launchAngle = backAngle + tOffset + Math.sin(tick * 0.3 + t) * 0.15;
                        const reach = 22.0 + (t % 3) * 8.0 + (3.2 - cooldown) * 5.0;

                        const endX = caudalX + Math.cos(launchAngle) * reach;
                        const endY = caudalY + Math.sin(launchAngle) * reach;

                        // Wavy tensile protein silk line
                        ctx.beginPath();
                        ctx.moveTo(caudalX, caudalY);
                        const midX = (caudalX + endX) * 0.5 + Math.sin(tick * 0.25 + t) * 4.0;
                        const midY = (caudalY + endY) * 0.5 + Math.cos(tick * 0.25 + t) * 4.0;
                        ctx.quadraticCurveTo(midX, midY, endX, endY);

                        ctx.strokeStyle = "rgba(248, 250, 252, 0.92)"; // Pristine adhesive white silk
                        ctx.lineWidth = 1.2;
                        ctx.stroke();

                        ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
                        ctx.lineWidth = 0.5;
                        ctx.stroke();

                        // Viscous adhesive droplets along the thread
                        for (let d = 1; d <= 3; d++) {
                            const frac = d * 0.25;
                            const dx = caudalX + (endX - caudalX) * frac;
                            const dy = caudalY + (endY - caudalY) * frac;

                            ctx.beginPath();
                            ctx.arc(dx, dy, 1.0, 0, Math.PI * 2);
                            ctx.fillStyle = "rgba(224, 242, 254, 0.95)";
                            ctx.fill();
                        }
                    }

                    // Holothurin chemical mist cloud
                    ctx.beginPath();
                    ctx.arc(caudalX, caudalY, 18.0, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(14, 165, 233, 0.15)";
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        /**
         * Render global benthic bioturbation stratum, purified mineral fecal pellets, and clean sand trails.
         * @param {CanvasRenderingContext2D} ctx - 2D canvas graphics context.
         * @param {number} width - Canvas width.
         * @param {number} height - Canvas height.
         * @param {Object} manager - Global HolothuroidCuvierianManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static drawGlobalCuvierianEnvironment(ctx, width, height, manager, tick) {
            if (!ctx || !manager) return;

            const metrics = manager.metrics;
            if (!metrics || metrics.totalHolothuroidOrganisms <= 0) return;

            const sedimentTop = height - 90;
            const pellets = metrics.fecalPelletDeposits || 0;
            const pelletCount = Math.min(24, Math.max(6, Math.round(pellets % 25)));

            ctx.save();

            // 1. Oxygenated purified sand patches along benthic horizon
            if (metrics.cumulativeSedimentProcessed > 5.0) {
                const sandAlpha = Math.min(0.12, (metrics.cumulativeSedimentProcessed / 100.0) * 0.10 + 0.02);
                ctx.fillStyle = "rgba(254, 243, 199, " + sandAlpha.toFixed(3) + ")";
                ctx.fillRect(0, sedimentTop + 20, width, 70);
            }

            // 2. Excreted cylindrical mineral fecal pellets
            for (let p = 0; p < pelletCount; p++) {
                const seed = p * 47.33;
                const px = (seed * 19.4) % width;
                const py = sedimentTop + 25 + ((seed * 11.7) % 55);

                ctx.beginPath();
                ctx.ellipse(px, py, 2.8, 1.2, 0.25, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(217, 119, 6, 0.45)"; // Mineral sediment casting
                ctx.fill();
                ctx.strokeStyle = "rgba(180, 83, 9, 0.65)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    global.CuvierianOpticsRenderer = CuvierianOpticsRenderer;

})(typeof window !== "undefined" ? window : global);
