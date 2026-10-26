// BioEcosystem - Cephalopod Neural Optics, Tentacle Kinematics & Tool Shield Shaders
// Module: src/render/neural_optics.js
// Version: 5.78.0 (Hour 298 - Looks Agent: Bézier Tentacle Kinematics, Tool Armor & Ink Cloud)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeuralOpticsRenderer
     * High-fidelity microscope rendering for cephalopod neurobiology:
     * - Central cerebral ganglion neuropil and bilateral optic lobes
     * - Depolarization sparks (+35 mV action potential spike lightning)
     * - 8 Prehensile muscular hydrostat tentacles with Bézier splines & suction cups
     * - Benthic tool-use armor (carried exuviae/detritus shielding)
     * - Anti-predator emergency ink cloud plume & mimicry freezing aura
     */
    class NeuralOpticsRenderer {
        static drawCerebralGanglion(ctx, org, size, tick) {
            const cerebralActivity = org.cerebralActivity || 0.4;
            const pulse = 0.5 + 0.5 * Math.sin(tick * 0.09 + (org.numericId || 0));

            const gx = org.x + Math.cos(org.angle || 0) * (size * 0.28);
            const gy = org.y + Math.sin(org.angle || 0) * (size * 0.28);

            // Bilateral optic lobes
            const perpAngle = (org.angle || 0) + Math.PI * 0.5;
            for (let side of [-1, 1]) {
                const ox = gx + Math.cos(perpAngle) * (size * 0.38 * side);
                const oy = gy + Math.sin(perpAngle) * (size * 0.38 * side);
                ctx.beginPath();
                ctx.arc(ox, oy, size * 0.18, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${0.40 + cerebralActivity * 0.45})`;
                ctx.fill();
                ctx.lineWidth = 0.65;
                ctx.strokeStyle = `rgba(236, 72, 153, ${0.55 + pulse * 0.35})`;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(ox, oy);
                ctx.lineTo(gx, gy);
                ctx.lineWidth = 0.6;
                ctx.strokeStyle = "rgba(168, 85, 247, 0.50)";
                ctx.stroke();
            }

            // Central cerebral ganglion core
            ctx.beginPath();
            ctx.arc(gx, gy, size * 0.26, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147, 51, 234, ${0.45 + cerebralActivity * 0.40})`;
            ctx.fill();
            ctx.lineWidth = 0.85;
            ctx.strokeStyle = `rgba(192, 132, 252, ${0.65 + pulse * 0.30})`;
            ctx.stroke();
        }

        static drawActionPotentialSparks(ctx, org, size, tick) {
            if (!org.isDepolarized && (org.membranePotential || -70) < -50.0) return;

            const sparkCount = 4;
            const gx = org.x + Math.cos(org.angle || 0) * (size * 0.28);
            const gy = org.y + Math.sin(org.angle || 0) * (size * 0.28);

            ctx.lineWidth = 0.9;
            ctx.strokeStyle = "#f472b6";
            for (let i = 0; i < sparkCount; i++) {
                const spkAngle = (tick * 0.35 + (i * Math.PI * 2) / sparkCount);
                const spkLen = size * (0.45 + 0.35 * Math.sin(tick * 0.4 + i));
                ctx.beginPath();
                ctx.moveTo(gx, gy);
                ctx.lineTo(gx + Math.cos(spkAngle) * spkLen, gy + Math.sin(spkAngle) * spkLen);
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(gx, gy, size * 0.45, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(244, 114, 182, 0.40)";
            ctx.lineWidth = 1.0;
            ctx.stroke();
        }

        static drawPrehensileTentacles(ctx, org, size, tick) {
            const drive = org.neuromuscularDrive || 0.2;
            const baseReach = org.tentacleReach || (size * 1.6);
            const suction = org.suctionAdhesionStrength || 0.35;
            const armCount = 8;
            const baseAngle = org.angle || 0;

            for (let c = 0; c < armCount; c++) {
                const armAngle = baseAngle + ((c - 3.5) * Math.PI) / 5.2;
                const wavePhase = tick * 0.08 + c * 0.75;
                const lateralSway = Math.sin(wavePhase) * (baseReach * 0.22 * drive);

                const rootX = org.x + Math.cos(armAngle) * (size * 0.45);
                const rootY = org.y + Math.sin(armAngle) * (size * 0.45);
                const ctrlX = rootX + Math.cos(armAngle) * (baseReach * 0.55) + lateralSway;
                const ctrlY = rootY + Math.sin(armAngle) * (baseReach * 0.55) - lateralSway * 0.5;
                const tipX = rootX + Math.cos(armAngle) * baseReach + lateralSway * 1.3;
                const tipY = rootY + Math.sin(armAngle) * baseReach;

                // Hydrostat muscular tentacle spline
                ctx.beginPath();
                ctx.moveTo(rootX, rootY);
                ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
                ctx.lineWidth = Math.max(0.7, (size * 0.18) * (1.0 - (c % 2) * 0.15));
                ctx.strokeStyle = `rgba(168, 85, 247, ${0.40 + drive * 0.45})`;
                ctx.stroke();

                // Suction cup adhesion nodes
                const suckerCount = 2;
                for (let s = 1; s <= suckerCount; s++) {
                    const t = s / (suckerCount + 1);
                    const sx = (1 - t) * (1 - t) * rootX + 2 * (1 - t) * t * ctrlX + t * t * tipX;
                    const sy = (1 - t) * (1 - t) * rootY + 2 * (1 - t) * t * ctrlY + t * t * tipY;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.0 + suction * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(6, 182, 212, ${0.50 + drive * 0.35})`;
                    ctx.fill();
                }
            }
        }

        static drawCarriedToolShield(ctx, org, size, tick) {
            if (!org.toolUseEquipped || org.carriedShieldType === "NONE") return;

            const isExuviae = org.carriedShieldType === "EXUVIAE";
            const durability = org.shieldDurability || 50.0;
            const shieldAlpha = Math.min(1.0, 0.35 + (durability / 100.0) * 0.55);
            const shieldAngle = (org.angle || 0) + (Math.sin(tick * 0.05) * 0.15);

            const shX = org.x + Math.cos(shieldAngle) * (size * 1.25);
            const shY = org.y + Math.sin(shieldAngle) * (size * 1.25);
            const shR = size * (isExuviae ? 0.85 : 0.65);

            ctx.save();
            ctx.translate(shX, shY);
            ctx.rotate(shieldAngle);

            ctx.beginPath();
            ctx.arc(0, 0, shR, -Math.PI * 0.45, Math.PI * 0.45);
            ctx.lineWidth = 1.6;
            ctx.strokeStyle = isExuviae ? `rgba(245, 158, 11, ${shieldAlpha})` : `rgba(180, 83, 9, ${shieldAlpha})`;
            ctx.stroke();

            // Translucent chitinous / detrital plate fill
            ctx.fillStyle = isExuviae ? `rgba(217, 119, 6, ${shieldAlpha * 0.32})` : `rgba(120, 53, 15, ${shieldAlpha * 0.45})`;
            ctx.fill();

            // Grasping tentacle contact grip
            ctx.beginPath();
            ctx.moveTo(-size * 0.35, -shR * 0.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(-size * 0.35, shR * 0.5);
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = "rgba(168, 85, 247, 0.70)";
            ctx.stroke();

            ctx.restore();
        }

        static drawInkJetReflex(ctx, org, size, tick) {
            if (!org.inkJetTriggered) return;

            const inkAngle = (org.angle || 0) + Math.PI;
            const inkDist = size * 1.4;
            const cloudX = org.x + Math.cos(inkAngle) * inkDist;
            const cloudY = org.y + Math.sin(inkAngle) * inkDist;

            // Multi-lobed sepia ink dispersion cloud
            const lobeCount = 5;
            for (let l = 0; l < lobeCount; l++) {
                const lAngle = (l * Math.PI * 2) / lobeCount + tick * 0.1;
                const lx = cloudX + Math.cos(lAngle) * (size * 0.6);
                const ly = cloudY + Math.sin(lAngle) * (size * 0.6);
                ctx.beginPath();
                ctx.arc(lx, ly, size * 0.75, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(15, 23, 42, 0.70)";
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(cloudX, cloudY, size * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(88, 28, 135, 0.45)";
            ctx.fill();
        }

        static drawCellNeuralNetwork(ctx, org, tick) {
            if (!ctx || !org || !org.alive) return;

            const isNeural = Boolean(org.isProtoneuron || org.isCephalicGanglion || org.neuralNetworkSystem);
            if (!isNeural) return;

            const size = (org.dna && org.dna.size) ? org.dna.size : 6.0;
            ctx.save();

            // 1. Central cerebral ganglion & paired optic lobes
            NeuralOpticsRenderer.drawCerebralGanglion(ctx, org, size, tick);

            // 2. Action potential depolarization lightning sparks
            NeuralOpticsRenderer.drawActionPotentialSparks(ctx, org, size, tick);

            // 3. Prehensile muscular hydrostat tentacles with Bézier splines
            NeuralOpticsRenderer.drawPrehensileTentacles(ctx, org, size, tick);

            // 4. Benthic tool-use armor shield (exuviae/detritus)
            NeuralOpticsRenderer.drawCarriedToolShield(ctx, org, size, tick);

            // 5. Emergency ink jet discharge plume
            NeuralOpticsRenderer.drawInkJetReflex(ctx, org, size, tick);

            ctx.restore();
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = NeuralOpticsRenderer;
    } else {
        global.NeuralOpticsRenderer = NeuralOpticsRenderer;
    }
})(typeof window !== "undefined" ? window : global);
