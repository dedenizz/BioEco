// BioEcosystem - Coevolution Optics, Mutualist Symbiosis & Red Queen Shaders
// Module: src/render/coevolution_optics.js
// Version: 5.88.0 (Hour 308 - Looks Agent: Cleaning Station Halos, Ectoparasite Cysts & Chitinase)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CoevolutionOpticsRenderer
     * High-fidelity microscope rendering for community-level coevolution:
     * - Inter-species mutualist bio-filaments with moving nutrient photon beads
     * - Benthic cleaning stations with radial territorial boundary waves
     * - Solicitation posture hover shrouds and safe-harbor truce indicators
     * - Ectoparasite cuticle cyst clusters and detachment exfoliation sparks
     * - Predator chitinase enzymatic mandible flares in the Red Queen race
     */
    class CoevolutionOpticsRenderer {
        static drawMutualismNetworks(ctx, organisms, tick) {
            if (!ctx || !Array.isArray(organisms) || organisms.length < 2) return;
            const orgMap = new Map();
            for (let i = 0; i < organisms.length; i++) {
                const o = organisms[i];
                if (o && o.alive && o.id) orgMap.set(o.id, o);
            }
            ctx.save();
            const phase = tick * 0.05;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive || !org.mutualismPartnerId) continue;
                const partner = orgMap.get(org.mutualismPartnerId);
                if (!partner || !partner.alive || String(org.id) >= String(partner.id)) continue;
                const dist = Math.hypot(partner.x - org.x, partner.y - org.y);
                if (dist > 140.0) continue;

                const synergy = Math.max(0.15, Math.min(1.0, (org.mutualismSynergy || 0.2) + (partner.mutualismSynergy || 0.2)));
                const alpha = (0.20 + synergy * 0.45) * Math.max(0.1, 1.0 - dist / 140.0);
                const wave = Math.sin(phase + (org.x + partner.x) * 0.02) * 5.0;
                const midX = (org.x + partner.x) * 0.5 + Math.cos(phase) * wave;
                const midY = (org.y + partner.y) * 0.5 + Math.sin(phase) * wave;

                ctx.beginPath();
                ctx.moveTo(org.x, org.y);
                ctx.quadraticCurveTo(midX, midY, partner.x, partner.y);
                ctx.lineWidth = Math.max(0.6, 0.8 + synergy * 1.1);
                ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
                ctx.stroke();

                if (synergy > 0.40) {
                    ctx.beginPath();
                    ctx.moveTo(org.x, org.y);
                    ctx.quadraticCurveTo(midX, midY, partner.x, partner.y);
                    ctx.lineWidth = 2.4;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
                    ctx.stroke();
                }

                const beadCount = synergy > 0.5 ? 3 : 2;
                for (let b = 0; b < beadCount; b++) {
                    const beadPhase = (phase * 0.6 + (b / beadCount) + (dist * 0.005)) % 1.0;
                    const bx = (1 - beadPhase) * (1 - beadPhase) * org.x + 2 * (1 - beadPhase) * beadPhase * midX + beadPhase * beadPhase * partner.x;
                    const by = (1 - beadPhase) * (1 - beadPhase) * org.y + 2 * (1 - beadPhase) * beadPhase * midY + beadPhase * beadPhase * partner.y;
                    ctx.beginPath();
                    ctx.arc(bx, by, 1.2 + synergy * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = b % 2 === 0 ? `rgba(167, 243, 208, ${alpha * 1.4})` : `rgba(103, 232, 249, ${alpha * 1.4})`;
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        static drawCleaningStation(ctx, org, size, tick) {
            if (!org.isCleaningStation) return;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.08 + (org.id || 0));
            const stationRadius = size * (2.2 + pulse * 0.4);

            ctx.beginPath();
            ctx.arc(org.x, org.y, stationRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${0.08 + pulse * 0.08})`;
            ctx.fill();
            ctx.lineWidth = 1.0;
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + pulse * 0.35})`;
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(org.x, org.y, 2.0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(165, 243, 252, 0.9)";
            ctx.fill();
        }

        static drawSolicitationPose(ctx, org, size, tick) {
            if (!org.solicitationPoseActive) return;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.12 + (org.id || 0));
            const poseR = size * (1.35 + pulse * 0.15);

            ctx.beginPath();
            ctx.arc(org.x, org.y, poseR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${0.12 + pulse * 0.14})`;
            ctx.fill();
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.5 + pulse * 0.3})`;
            ctx.stroke();

            const angle = org.angle || 0;
            ctx.beginPath();
            ctx.arc(org.x, org.y, poseR + 2, angle - 0.5, angle + 0.5);
            ctx.strokeStyle = "rgba(125, 211, 252, 0.75)";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        static drawEctoparasiteLoad(ctx, org, size, tick) {
            const load = org.ectoparasiteLoad || 0.0;
            if (load < 0.05) return;
            const cystCount = Math.min(5, Math.max(1, Math.floor(load * 6)));
            const baseAngle = (org.id ? (org.id * 1.37) : 0) + (org.angle || 0);

            for (let c = 0; c < cystCount; c++) {
                const cAngle = baseAngle + (c * (Math.PI * 2 / cystCount));
                const cx = org.x + Math.cos(cAngle) * (size * 0.92);
                const cy = org.y + Math.sin(cAngle) * (size * 0.92);
                ctx.beginPath();
                ctx.arc(cx, cy, 1.1 + load * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = load > 0.4 ? "rgba(239, 68, 68, 0.85)" : "rgba(217, 119, 6, 0.85)";
                ctx.fill();
            }

            if (org.cleaningTruceActive || org.cleaningStationRef) {
                const sparkPhase = (tick * 0.15 + (org.id || 0)) % 1.0;
                const sx = org.x + Math.cos(tick * 0.1) * (size * 1.4 * (1 + sparkPhase * 0.5));
                const sy = org.y + Math.sin(tick * 0.1) * (size * 1.4 * (1 + sparkPhase * 0.5));
                ctx.beginPath();
                ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(254, 215, 170, ${1.0 - sparkPhase})`;
                ctx.fill();
            }
        }

        static drawChitinaseEnzyme(ctx, org, size, tick) {
            const enzyme = org.chitinaseBiteModifier || 1.0;
            if (enzyme < 1.15 || org.dna.diet !== 2) return;
            const angle = org.angle || 0;
            const flareR = size * 1.15;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.25 + (org.id || 0));
            const intensity = Math.min(1.0, (enzyme - 1.0) / 1.5);

            for (let s of [-0.28, 0.28]) {
                const jx = org.x + Math.cos(angle + s) * flareR;
                const jy = org.y + Math.sin(angle + s) * flareR;
                ctx.beginPath();
                ctx.arc(jx, jy, 1.2 + pulse * 0.8 * intensity, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(244, 63, 94, ${0.65 + pulse * 0.35})`;
                ctx.fill();
            }
        }

        static drawCleaningSymbiosis(ctx, org, size, tick) {
            if (!org.cleaningSymbiosisActive) return;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.18 + (org.id || 0));
            const haloR = size * (1.35 + pulse * 0.25);

            ctx.beginPath();
            ctx.arc(org.x, org.y, haloR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(16, 185, 129, ${0.12 + pulse * 0.16})`;
            ctx.fill();
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.40 + pulse * 0.35})`;
            ctx.stroke();

            const sparkleCount = 3;
            for (let s = 0; s < sparkleCount; s++) {
                const sAngle = (tick * 0.12 + s * 2.09);
                const sDist = haloR * (0.85 + 0.30 * Math.sin(tick * 0.15 + s));
                ctx.beginPath();
                ctx.arc(org.x + Math.cos(sAngle) * sDist, org.y + Math.sin(sAngle) * sDist, 0.9, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(236, 253, 245, 0.85)";
                ctx.fill();
            }
        }

        static drawCommunitySynergyAura(ctx, org, size, tick) {
            const synergy = org.mutualismSynergy || 0.0;
            if (synergy < 0.28) return;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.08 + (org.x * 0.05));
            const auraRadius = size * (1.45 + synergy * 0.40 + pulse * 0.15);
            const auraAlpha = 0.08 + synergy * 0.18 + pulse * 0.06;

            ctx.beginPath();
            ctx.arc(org.x, org.y, auraRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${auraAlpha * 0.45})`;
            ctx.fill();
            ctx.lineWidth = 0.75;
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = `rgba(16, 185, 129, ${auraAlpha * 1.2})`;
            ctx.stroke();
            ctx.setLineDash([]);
        }

        static drawRedQueenTension(ctx, org, size, tick) {
            const pressure = org.redQueenPressure || 0.0;
            if (pressure < 0.38) return;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.14 + (org.y * 0.05));
            const arcRadius = size * (1.18 + pulse * 0.14);
            const arcAlpha = 0.20 + (pressure - 0.35) * 0.65;
            const headAngle = org.angle || 0;

            ctx.lineWidth = 0.9;
            ctx.strokeStyle = `rgba(245, 158, 11, ${arcAlpha})`;
            ctx.beginPath();
            ctx.arc(org.x, org.y, arcRadius, headAngle + 0.6, headAngle + 1.8);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(org.x, org.y, arcRadius, headAngle - 1.8, headAngle - 0.6);
            ctx.stroke();
        }

        static drawCellCoevolution(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;
            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;

            if (org.isCleaningStation) CoevolutionOpticsRenderer.drawCleaningStation(ctx, org, size, tick);
            if (org.solicitationPoseActive) CoevolutionOpticsRenderer.drawSolicitationPose(ctx, org, size, tick);
            if ((org.ectoparasiteLoad || 0) > 0.05) CoevolutionOpticsRenderer.drawEctoparasiteLoad(ctx, org, size, tick);
            if (org.cleaningSymbiosisActive) CoevolutionOpticsRenderer.drawCleaningSymbiosis(ctx, org, size, tick);
            if ((org.chitinaseBiteModifier || 1.0) > 1.15) CoevolutionOpticsRenderer.drawChitinaseEnzyme(ctx, org, size, tick);
            if ((org.mutualismSynergy || 0) > 0.25) CoevolutionOpticsRenderer.drawCommunitySynergyAura(ctx, org, size, tick);
            if ((org.redQueenPressure || 0) > 0.35) CoevolutionOpticsRenderer.drawRedQueenTension(ctx, org, size, tick);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CoevolutionOpticsRenderer;
    } else {
        global.CoevolutionOpticsRenderer = CoevolutionOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
