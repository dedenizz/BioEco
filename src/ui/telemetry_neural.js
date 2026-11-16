// BioEcosystem - Artificial Neural Networks, Autonomous Robotics & Quantum Computing Telemetry
// Module: src/ui/telemetry_neural.js
// Version: 15.4.0 (Hour 774 - Looks & UI Agent: 185th Channel % ANI, 186th Channel % QCR, Neural Magenta & Quantum Gold Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeuralQuantumTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 185th Telemetry Channel: Artificial Neural & Robotics Index (% ANI) - Neural Magenta (#a855f7, #e9d5ff)
     * - 186th Telemetry Channel: Quantum Compute & Coherence Index (% QCR) - Quantum Gold (#eab308, #fef08a)
     */
    class NeuralQuantumTelemetryManager {
        /**
         * Classify 185th Channel (% ANI) into 4 regimes.
         * @param {number} val - % ANI value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyANIRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_AGI_COGNITIVE_SWARM",
                    label: "APEX ADAPTIVE NEURAL SWARM & AUTONOMOUS ROBOTICS",
                    badgeClass: "ani-badge ani-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "DEEP_AUTONOMOUS_ROBOTICS",
                    label: "DEEP NEURAL LEARNING & AUTONOMOUS FABRICATION",
                    badgeClass: "ani-badge ani-deep"
                };
            } else if (val >= 25) {
                return {
                    regime: "SUPERVISED_PERCEPTRON_ARRAY",
                    label: "SUPERVISED PERCEPTRON & EARLY INDUSTRIAL ROBOTICS",
                    badgeClass: "ani-badge ani-perc"
                };
            } else {
                return {
                    regime: "RULE_BASED_HEURISTIC",
                    label: "STATIC RULE-BASED HEURISTIC & MANUAL CONTROL",
                    badgeClass: "ani-badge ani-pre"
                };
            }
        }

        /**
         * Classify 186th Channel (% QCR) into 4 regimes.
         * @param {number} val - % QCR value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyQCRRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_FAULT_TOLERANT_QUANTUM",
                    label: "APEX FAULT-TOLERANT LOGICAL QUBIT & COHERENCE CORE",
                    badgeClass: "qcr-badge qcr-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "ERROR_CORRECTED_QUBIT_GRID",
                    label: "SURFACE-CODE ERROR-CORRECTED QUBIT ARRAY",
                    badgeClass: "qcr-badge qcr-grid"
                };
            } else if (val >= 25) {
                return {
                    regime: "CRYOGENIC_NISQ_QUBITS",
                    label: "CRYOGENIC NISQ PROCESSOR & EARLY ENTANGLEMENT",
                    badgeClass: "qcr-badge qcr-nisq"
                };
            } else {
                return {
                    regime: "CLASSICAL_BINARY_LIMIT",
                    label: "CLASSICAL BINARY SILICON & DETERMINISTIC LIMIT",
                    badgeClass: "qcr-badge qcr-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical circular buffers for 185th (% ANI) & 186th (% QCR) channels.
         * @param {Array} organisms - Active organisms list.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - NeuralQuantumManager instance.
         */
        static step(organisms, historyData, manager) {
            let aniVal = 0;
            let qcrVal = 0;

            if (manager && manager.metrics) {
                aniVal = manager.metrics.meanANIIndex || 0;
                qcrVal = manager.metrics.meanQCRIndex || 0;
            } else if (Array.isArray(organisms) && organisms.length > 0) {
                let sumANI = 0;
                let sumQCR = 0;
                let count = 0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.alive && org.hasNeuralQuantum) {
                        sumANI += org.neuralRoboticsIndex || 0;
                        sumQCR += org.quantumComputeIndex || 0;
                        count++;
                    }
                }
                if (count > 0) {
                    aniVal = sumANI / count;
                    qcrVal = sumQCR / count;
                }
            }

            aniVal = Math.max(0, Math.min(100, aniVal));
            qcrVal = Math.max(0, Math.min(100, qcrVal));

            if (historyData) {
                if (Array.isArray(historyData.neuralRoboticsIndex)) {
                    historyData.neuralRoboticsIndex.push(aniVal);
                    if (historyData.neuralRoboticsIndex.length > 240) {
                        historyData.neuralRoboticsIndex.shift();
                    }
                }
                if (Array.isArray(historyData.quantumComputeIndex)) {
                    historyData.quantumComputeIndex.push(qcrVal);
                    if (historyData.quantumComputeIndex.length > 240) {
                        historyData.quantumComputeIndex.shift();
                    }
                }
            }

            if (typeof document !== "undefined") {
                const elANI = document.getElementById("valANIIndex");
                if (elANI) {
                    const reg = this.classifyANIRegime(aniVal);
                    elANI.className = reg.badgeClass;
                    elANI.textContent = aniVal.toFixed(1) + "% ANI (" + reg.label + ")";
                }

                const elQCR = document.getElementById("valQCRIndex");
                if (elQCR) {
                    const reg = this.classifyQCRRegime(qcrVal);
                    elQCR.className = reg.badgeClass;
                    elQCR.textContent = qcrVal.toFixed(1) + "% QCR (" + reg.label + ")";
                }
            }

            return { aniVal: aniVal, qcrVal: qcrVal };
        }
    }

    global.NeuralQuantumTelemetryManager = NeuralQuantumTelemetryManager;
})(typeof window !== "undefined" ? window : globalThis);
