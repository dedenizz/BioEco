// BioEcosystem - Symbiotic Photophore Organ Arrays, Luciferase Optics & Retinal Bleaching
// Module: src/render/photophore_optics.js
// Version: 6.68.0 (Hour 388 - Looks Agent: Retinal Bleaching Optics, Pulsatile Micro-Flares & Quenching Halos)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PhotophoreOpticsRenderer
     * High-fidelity microscope rendering of deep pelagic bioluminescence:
     * - Ventral photophore organ beads with guanin reflective backing plates
     * - Luciferase enzymatic photon emissions in cyan (470-490 nm) and emerald wavelengths
     * - Dynamic thermal quenching hue shift (photonicQuenchingFactor) from radiant cyan to deep oceanic teal
     * - Pulsatile micro-flare staccato bursts during substrate preservation mode (pulsatileEmissionMode)
     * - Counter-illumination downward gradients erasing ventral silhouettes (drawCounterIlluminationGlow)
     * - Explosive starlight flash discharges for predator evasion (drawFlashDischarge)
     * - Retinal bleaching wash-out rings and optical blinding coronas on stunned predators (drawPredatorRetinalBleaching)
     * - Inter-organism quorum bioluminescence network links across schooling swarms (drawGlobalPhotophoreSwarm)
     */
    class PhotophoreOpticsRenderer {
        static drawCellPhotophores(ctx, org, tick) {
            if (!ctx || !org || org.isDead) return;

            const organs = org.photophoreOrgans || 0;
            const pulse = org.photonicPulse || 0.0;
            const counterIllum = org.counterIlluminationRatio || 0.0;
            const flashCooldown = org.flashCooldownTicks || 0;
            const blindedTicks = org.predatorBlindedTicks || 0;
            const saturationTicks = org.retinalSaturationTicks || 0;

            if (organs <= 0 && pulse <= 0.02 && flashCooldown <= 0 && blindedTicks <= 0 && saturationTicks <= 0) return;

            const baseSize = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            const size = baseSize * (org.megafaunaScaleRatio || 1.0);

            ctx.save();
            ctx.translate(org.x, org.y);

            // 1. Counter-illumination ventral gradient glow
            if (counterIllum > 0.04) {
                PhotophoreOpticsRenderer.drawCounterIlluminationGlow(ctx, org, size, counterIllum, tick);
            }

            // 2. Multicellular photophore organ cluster along ventral hemisphere
            if (organs > 0) {
                PhotophoreOpticsRenderer.drawPhotophoreOrgans(ctx, org, size, organs, pulse, tick);
            }

            // 3. Explosive flash discharge during escape
            if (flashCooldown > 55) {
                PhotophoreOpticsRenderer.drawFlashDischarge(ctx, org, size, flashCooldown, tick);
            }

            // 4. Retinal bleaching and optical stun on affected predators
            if (blindedTicks > 0 || saturationTicks > 0) {
                PhotophoreOpticsRenderer.drawPredatorRetinalBleaching(ctx, org, size, blindedTicks, saturationTicks, tick);
            }

            ctx.restore();
        }

        static drawPhotophoreOrgans(ctx, org, size, organCount, pulse, tick) {
            const count = Math.min(10, Math.max(2, organCount));
            const angleStep = Math.PI / (count + 1);
            const guanin = org.guanineReflectors || 0.5;
            const efficiency = org.luciferaseEfficiency || 0.6;
            const quenching = org.photonicQuenchingFactor || 1.0;
            const isPulsatile = org.pulsatileEmissionMode || false;

            // Pulsatile micro-strobe flare modulation
            const staccato = isPulsatile ? (0.6 + 0.4 * Math.sin(tick * 0.45 + (org.numericId || 0))) : 1.0;
            const effectivePulse = pulse * staccato;
            const baseGlowAlpha = Math.min(0.95, (0.22 + effectivePulse * 0.75 * efficiency) * quenching);

            let heading = 0.0;
            if (typeof org.vx === "number" && typeof org.vy === "number") {
                const spd = Math.sqrt(org.vx * org.vx + org.vy * org.vy);
                if (spd > 0.05) heading = Math.atan2(org.vy, org.vx);
            }

            ctx.save();
            ctx.rotate(heading);

            // Determine spectral color based on thermal quenching
            const rVal = Math.floor(40 + (1.0 - quenching) * 20);
            const gVal = Math.floor(190 * quenching + 110 * (1.0 - quenching));
            const bVal = Math.floor(250 * quenching + 180 * (1.0 - quenching));

            for (let i = 1; i <= count; i++) {
                const arcAngle = (Math.PI * 0.5) + (i * angleStep * 0.9 - (angleStep * count * 0.45));
                const beadRadius = Math.max(1.2, size * 0.2);
                const ox = Math.cos(arcAngle) * (size * 0.88);
                const oy = Math.sin(arcAngle) * (size * 0.88);

                // Guanin crystal reflective backing plate
                ctx.fillStyle = `rgba(226, 232, 240, ${0.4 + guanin * 0.5})`;
                ctx.beginPath();
                ctx.arc(ox, oy, beadRadius * 1.3, 0, Math.PI * 2);
                ctx.fill();

                // Outer photon emission halo with quenching hue modulation
                const haloRadius = beadRadius * (2.0 + effectivePulse * 3.6);
                const grad = ctx.createRadialGradient(ox, oy, beadRadius * 0.5, ox, oy, haloRadius);
                grad.addColorStop(0.0, `rgba(${rVal}, ${gVal}, ${bVal}, ${baseGlowAlpha})`);
                grad.addColorStop(0.4, `rgba(45, 212, 191, ${baseGlowAlpha * 0.55})`);
                grad.addColorStop(1.0, `rgba(${rVal}, ${gVal}, ${bVal}, 0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(ox, oy, haloRadius, 0, Math.PI * 2);
                ctx.fill();

                // Core cellular luciferase crystal lens
                const coreAlpha = Math.min(1.0, (0.6 + effectivePulse * 0.4) * quenching);
                ctx.fillStyle = `rgba(240, 253, 250, ${coreAlpha})`;
                ctx.beginPath();
                ctx.arc(ox, oy, beadRadius * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        static drawCounterIlluminationGlow(ctx, org, size, ratio, tick) {
            const glowDist = size * (1.8 + ratio * 1.4);
            const alpha = Math.min(0.55, ratio * 0.45);

            ctx.save();
            const grad = ctx.createRadialGradient(0, size * 0.3, size * 0.5, 0, size * 0.8, glowDist);
            grad.addColorStop(0.0, `rgba(56, 189, 248, ${alpha})`);
            grad.addColorStop(0.5, `rgba(45, 212, 191, ${alpha * 0.4})`);
            grad.addColorStop(1.0, "rgba(14, 165, 233, 0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, size * 0.5, glowDist, 0, Math.PI);
            ctx.fill();
            ctx.restore();
        }

        static drawFlashDischarge(ctx, org, size, cooldown, tick) {
            const progress = (80 - cooldown) / 25.0;
            const radius = size * (2.5 + progress * 6.5);
            const alpha = Math.max(0.0, (1.0 - progress) * 0.88);

            ctx.save();
            const grad = ctx.createRadialGradient(0, 0, size * 0.35, 0, 0, radius);
            grad.addColorStop(0.0, `rgba(255, 255, 255, ${alpha})`);
            grad.addColorStop(0.3, `rgba(224, 242, 254, ${alpha * 0.8})`);
            grad.addColorStop(0.7, `rgba(56, 189, 248, ${alpha * 0.4})`);
            grad.addColorStop(1.0, "rgba(6, 182, 212, 0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();

            // 8-pointed starburst diffraction spikes
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.lineWidth = 1.2;
            for (let k = 0; k < 8; k++) {
                const angle = (k * Math.PI / 4.0) + (tick * 0.05);
                const rayLen = radius * 1.3;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
                ctx.stroke();
            }
            ctx.restore();
        }

        static drawPredatorRetinalBleaching(ctx, org, size, blindedTicks, saturationTicks, tick) {
            const maxTicks = Math.max(blindedTicks, saturationTicks);
            const intensity = Math.min(1.0, maxTicks / 55.0);
            const orbit = size * 1.5;

            ctx.save();
            // 1. Photopic bleaching wash-out halo around predator
            const bleachGrad = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, orbit * 1.4);
            bleachGrad.addColorStop(0.0, `rgba(254, 240, 138, ${intensity * 0.45})`);
            bleachGrad.addColorStop(0.6, `rgba(253, 224, 71, ${intensity * 0.20})`);
            bleachGrad.addColorStop(1.0, "rgba(250, 204, 21, 0)");
            ctx.fillStyle = bleachGrad;
            ctx.beginPath();
            ctx.arc(0, 0, orbit * 1.4, 0, Math.PI * 2);
            ctx.fill();

            // 2. Optical disorientation strobe rings
            const rot = tick * 0.16;
            ctx.strokeStyle = `rgba(250, 204, 21, ${intensity * 0.85})`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.ellipse(0, -size * 0.25, orbit, orbit * 0.45, rot, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // 3. Stun particles orbiting sensory poles
            for (let s = 0; s < 3; s++) {
                const a = rot + (s * (Math.PI * 2 / 3));
                const px = Math.cos(a) * orbit;
                const py = -size * 0.25 + Math.sin(a) * (orbit * 0.45);
                ctx.fillStyle = `rgba(254, 249, 195, ${intensity * 0.95})`;
                ctx.beginPath();
                ctx.arc(px, py, 2.2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        static drawGlobalPhotophoreSwarm(ctx, organisms, width, height, tick) {
            if (!ctx || !organisms || !Array.isArray(organisms) || organisms.length === 0) return;

            const maxConnections = 35;
            let connections = 0;
            const quorumRadiusSq = 95.0 * 95.0;

            ctx.save();
            ctx.lineWidth = 1.0;

            const n = Math.min(organisms.length, 50);
            for (let i = 0; i < n; i++) {
                const orgA = organisms[i];
                if (!orgA || orgA.isDead || orgA.alive === false || !orgA.isQuorumSynchronized) continue;

                for (let j = i + 1; j < n; j++) {
                    const orgB = organisms[j];
                    if (!orgB || orgB.isDead || orgB.alive === false || !orgB.isQuorumSynchronized) continue;

                    const dx = orgB.x - orgA.x;
                    const dy = orgB.y - orgA.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < quorumRadiusSq) {
                        const dist = Math.sqrt(distSq);
                        const linkAlpha = (1.0 - (dist / 95.0)) * 0.28 * Math.min(1.0, (orgA.photonicPulse || 0.5) + (orgB.photonicPulse || 0.5));
                        
                        ctx.strokeStyle = `rgba(45, 212, 191, ${linkAlpha})`;
                        ctx.beginPath();
                        ctx.moveTo(orgA.x, orgA.y);
                        ctx.lineTo(orgB.x, orgB.y);
                        ctx.stroke();

                        connections++;
                        if (connections >= maxConnections) break;
                    }
                }
                if (connections >= maxConnections) break;
            }

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PhotophoreOpticsRenderer;
    }
    if (typeof global !== "undefined") {
        global.PhotophoreOpticsRenderer = PhotophoreOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
