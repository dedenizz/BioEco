// BioEcosystem - Artificial Neural Networks, Autonomous Robotics & Quantum Computing Optics
// Module: src/render/neural_optics.js
// Version: 15.4.0 (Hour 774 - Looks & UI Agent: Synaptic Neural Nodes, Robotic Vector Arms & Quantum Superposition Rings)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeuralQuantumOpticsRenderer
     * High-fidelity scientific darkfield microscopy renderer for Neural AI, Autonomous Robotics & Quantum Compute:
     * 1. Synaptic Neural Network Nodes (#a855f7 / #e9d5ff):
     *    - Hexagonal synaptic connection mesh around the cell when org.isTrainingWeights.
     * 2. Autonomous Robotic Precision Vector Arms (#c084fc):
     *    - Articulated twin micro-manipulator arms when org.isOperatingRobot.
     * 3. Quantum Qubit Superposition Rings (#eab308 / #fef08a):
     *    - Golden entangled orbital ellipses when org.isComputingQuantum.
     */
    class NeuralQuantumOpticsRenderer {
        /**
         * Draw neural network, autonomous robotics, and quantum superposition visuals on the canvas.
         * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
         * @param {Object} org - Organism instance.
         * @param {number} tick - Current simulation tick.
         */
        static drawNeuralQuantum(ctx, org, tick) {
            if (!ctx || !org || !org.alive || !org.hasNeuralQuantum) return;

            const r = org.radius || 8;
            const x = org.x || 0;
            const y = org.y || 0;
            const angle = org.angle || 0;
            const t = tick || 0;

            ctx.save();
            ctx.translate(x, y);

            // 1. Synaptic Neural Network Hexagonal Mesh (#a855f7 / #e9d5ff)
            if (org.hasNeuralAI && org.isTrainingWeights) {
                ctx.save();
                const netR = r * 1.35;
                ctx.strokeStyle = "rgba(168, 85, 247, 0.72)";
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const a = (t * 0.03) + i * (Math.PI / 3);
                    const nx = Math.cos(a) * netR;
                    const ny = Math.sin(a) * netR;
                    if (i === 0) ctx.moveTo(nx, ny);
                    else ctx.lineTo(nx, ny);
                }
                ctx.closePath();
                ctx.stroke();

                ctx.fillStyle = "rgba(233, 213, 255, 0.90)";
                for (let i = 0; i < 6; i++) {
                    const a = (t * 0.03) + i * (Math.PI / 3);
                    ctx.beginPath();
                    ctx.arc(Math.cos(a) * netR, Math.sin(a) * netR, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            // 2. Autonomous Robotic Precision Vector Arms (#c084fc)
            if (org.hasAutonomousRobotics && org.isOperatingRobot) {
                ctx.save();
                ctx.rotate(angle);
                ctx.strokeStyle = "rgba(192, 132, 252, 0.85)";
                ctx.lineWidth = 1.4;
                const armExt = r * 1.45;
                ctx.beginPath();
                ctx.moveTo(r * 0.6, -r * 0.45);
                ctx.lineTo(armExt, -r * 0.75);
                ctx.moveTo(r * 0.6, r * 0.45);
                ctx.lineTo(armExt, r * 0.75);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Quantum Qubit Superposition Orbital Rings (#eab308 / #fef08a)
            if (org.hasQuantumCore && org.isComputingQuantum) {
                ctx.save();
                const qR = r * 1.75;
                const qPhase = t * 0.12;

                ctx.strokeStyle = "rgba(234, 179, 8, 0.75)";
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.ellipse(0, 0, qR, qR * 0.45, qPhase, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = "rgba(254, 240, 138, 0.65)";
                ctx.beginPath();
                ctx.ellipse(0, 0, qR, qR * 0.45, qPhase + Math.PI / 2, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = "#fef08a";
                ctx.beginPath();
                ctx.arc(Math.cos(qPhase * 2) * qR * 0.85, Math.sin(qPhase * 2) * qR * 0.40, 1.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        }
    }

    global.NeuralQuantumOpticsRenderer = NeuralQuantumOpticsRenderer;
})(typeof window !== "undefined" ? window : globalThis);
