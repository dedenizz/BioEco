// BioEcosystem - Cephalopod Neural & Adaptive Mimicry Telemetry (Channels 55: % NPI & 56: % AMI)
// Module: src/ui/telemetry_neural.js
// Version: 5.78.0 (Hour 298 - UI Agent: 56th Telemetry Channel % AMI & Dual-Channel HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * NeuralTelemetryManager
     * High-precision telemetry tracking for cephalopod neurobiology & adaptive mimicry:
     * - Channel 55: Neural Plasticity Index (% NPI) - Hebbian adaptation and electrophysiology
     * - Channel 56: Adaptive Mimicry Index (% AMI) - Tool-use armor, tentacle reach and freezing crypsis
     * - Manages live HUD indicators, dual-channel chart recording, and diagnostic logging
     */
    class NeuralTelemetryManager {
        static calculateMetrics(organisms, tick) {
            let liveCount = 0;
            let neuralCount = 0;
            let depolarizedCount = 0;
            let activeSpikeCount = 0;
            let plasticityActiveCount = 0;
            let highDriveCount = 0;

            let toolEquippedCount = 0;
            let freezingCount = 0;
            let inkReadyCount = 0;

            let totalPlasticity = 0.0;
            let totalVoltage = 0.0;
            let totalDrive = 0.0;
            let totalAch = 0.0;
            let totalDopamine = 0.0;
            let totalReach = 0.0;
            let totalSuction = 0.0;
            let totalDeterrence = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const isNeural = Boolean(org.isProtoneuron || org.isCephalicGanglion || org.neuralNetworkSystem);
                    const isDepol = Boolean(org.isDepolarized);
                    const vM = typeof org.membranePotential === "number" ? org.membranePotential : -70.0;
                    const pScore = typeof org.plasticityScore === "number" ? org.plasticityScore : 0.0;
                    const mDrive = typeof org.neuromuscularDrive === "number" ? org.neuromuscularDrive : 0.0;
                    const ach = typeof org.acetylcholineLevel === "number" ? org.acetylcholineLevel : 50.0;
                    const da = typeof org.dopamineLevel === "number" ? org.dopamineLevel : 25.0;

                    totalPlasticity += pScore;
                    totalVoltage += vM;
                    totalDrive += mDrive;
                    totalAch += ach;
                    totalDopamine += da;

                    if (isNeural) neuralCount++;
                    if (isDepol) depolarizedCount++;
                    if (vM > -52.0) activeSpikeCount++;
                    if (pScore > 0.25) plasticityActiveCount++;
                    if (mDrive > 0.30) highDriveCount++;

                    // Mimicry & Tool-use variables
                    const reach = typeof org.tentacleReach === "number" ? org.tentacleReach : 14.0;
                    const suction = typeof org.suctionAdhesionStrength === "number" ? org.suctionAdhesionStrength : 0.35;
                    const deter = typeof org.predationDeterrence === "number" ? org.predationDeterrence : 0.0;

                    totalReach += reach;
                    totalSuction += suction;
                    totalDeterrence += deter;

                    if (org.toolUseEquipped) toolEquippedCount++;
                    if (org.mimicryFreezing) freezingCount++;
                    if ((org.inkSacVolume || 0) >= 30.0) inkReadyCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanPlasticity = totalPlasticity / targetTotal;
            const meanVoltage = totalVoltage / targetTotal;
            const meanDrive = totalDrive / targetTotal;
            const meanAch = totalAch / targetTotal;
            const meanDopamine = totalDopamine / targetTotal;
            const meanReach = totalReach / targetTotal;
            const meanSuction = totalSuction / targetTotal;
            const meanDeterrence = totalDeterrence / targetTotal;

            // Channel 55: % NPI calculation
            const plasticityWeight = Math.min(40.0, (meanPlasticity * 30.0) + ((plasticityActiveCount / targetTotal) * 10.0));
            const firingWeight = Math.min(35.0, ((depolarizedCount * 2.5 + activeSpikeCount) / targetTotal) * 42.0);
            const motorWeight = Math.min(25.0, (((meanAch + meanDopamine) / 200.0) * 15.0) + (meanDrive * 10.0));
            const meanNPI = Math.max(0.0, Math.min(100.0, plasticityWeight + firingWeight + motorWeight));

            let npiRegime = "DORMANT DIFFUSE PROTONEURON";
            let npiColor = "#64748b";
            if (meanNPI >= 75.0) { npiRegime = "CEPHALOPOD COGNITIVE RADIATION"; npiColor = "#a855f7"; }
            else if (meanNPI >= 50.0) { npiRegime = "ACTIVE HEBBIAN PLASTICITY"; npiColor = "#ec4899"; }
            else if (meanNPI >= 25.0) { npiRegime = "BASAL ACTION POTENTIAL SPIKING"; npiColor = "#38bdf8"; }

            // Channel 56: % AMI calculation
            const toolWeight = Math.min(35.0, (toolEquippedCount / targetTotal) * 75.0);
            const crypsisWeight = Math.min(35.0, ((freezingCount / targetTotal) * 40.0) + (meanDeterrence * 20.0));
            const tentacleWeight = Math.min(30.0, ((meanReach / 22.0) * 15.0) + (meanSuction * 15.0));
            const meanAMI = Math.max(0.0, Math.min(100.0, toolWeight + crypsisWeight + tentacleWeight));

            let amiRegime = "PASSIVE SUBSTRATE EXPOSURE";
            let amiColor = "#64748b";
            if (meanAMI >= 75.0) { amiRegime = "ADVANCED ADAPTIVE MIMICRY & TOOL-USE"; amiColor = "#06b6d4"; }
            else if (meanAMI >= 50.0) { amiRegime = "TACTICAL CAMOUFLAGE & SHIELD EQUIPPED"; amiColor = "#10b981"; }
            else if (meanAMI >= 25.0) { amiRegime = "INCIPIENT CRYPTIC FREEZING"; amiColor = "#38bdf8"; }

            return {
                liveCount, neuralCount, depolarizedCount, activeSpikeCount,
                toolEquippedCount, freezingCount, inkReadyCount,
                meanNPI: Number(meanNPI.toFixed(1)),
                meanAMI: Number(meanAMI.toFixed(1)),
                meanPlasticity: Number(meanPlasticity.toFixed(3)),
                meanVoltage: Number(meanVoltage.toFixed(1)),
                meanDrive: Number(meanDrive.toFixed(3)),
                meanAch: Number(meanAch.toFixed(1)),
                meanDopamine: Number(meanDopamine.toFixed(1)),
                meanReach: Number(meanReach.toFixed(1)),
                meanSuction: Number(meanSuction.toFixed(2)),
                npiRegime, npiColor, amiRegime, amiColor
            };
        }

        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valNPIIndexEl = document.getElementById("valNPIIndex");
            const valNPIStatusEl = document.getElementById("valNPIStatus");
            const valAMIIndexEl = document.getElementById("valAMIIndex");
            const valAMIStatusEl = document.getElementById("valAMIStatus");

            if (valNPIIndexEl) {
                valNPIIndexEl.textContent = metrics.meanNPI.toFixed(1) + "% NPI (" + metrics.npiRegime + ")";
                valNPIIndexEl.style.color = metrics.npiColor;
            }

            if (valNPIStatusEl) {
                valNPIStatusEl.textContent = "NEURAL: " + metrics.neuralCount +
                    " | SPIKING: " + metrics.depolarizedCount +
                    " | PLAST: " + Math.round(metrics.meanPlasticity * 100) + "%" +
                    " | V_M: " + metrics.meanVoltage.toFixed(1) + " mV" +
                    " | ACH: " + Math.round(metrics.meanAch) +
                    " | DA: " + Math.round(metrics.meanDopamine) +
                    " | DRIVE: " + Math.round(metrics.meanDrive * 100) + "%";
                valNPIStatusEl.style.color = metrics.depolarizedCount > 0 ? "#f472b6" : "#94a3b8";
            }

            if (valAMIIndexEl) {
                valAMIIndexEl.textContent = metrics.meanAMI.toFixed(1) + "% AMI (" + metrics.amiRegime + ")";
                valAMIIndexEl.style.color = metrics.amiColor;
            }

            if (valAMIStatusEl) {
                valAMIStatusEl.textContent = "SHIELDS: " + metrics.toolEquippedCount +
                    " | FREEZING: " + metrics.freezingCount +
                    " | INK READY: " + metrics.inkReadyCount +
                    " | REACH: " + metrics.meanReach + "px" +
                    " | SUCTION: " + Math.round(metrics.meanSuction * 100) + "%";
                valAMIStatusEl.style.color = metrics.toolEquippedCount > 0 ? "#06b6d4" : "#94a3b8";
            }
        }

        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.neuralPlasticity) {
                const chartNPI = Number.isFinite(metrics.meanNPI) ? Math.max(0, Math.min(100, metrics.meanNPI)) : 0;
                historyData.neuralPlasticity.shift();
                historyData.neuralPlasticity.push(chartNPI);
            }

            if (historyData.adaptiveMimicry) {
                const chartAMI = Number.isFinite(metrics.meanAMI) ? Math.max(0, Math.min(100, metrics.meanAMI)) : 0;
                historyData.adaptiveMimicry.shift();
                historyData.adaptiveMimicry.push(chartAMI);
            }
        }

        static step(organisms, historyData, tick) {
            const metrics = NeuralTelemetryManager.calculateMetrics(organisms, tick);
            NeuralTelemetryManager.updateHUD(metrics);
            NeuralTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getBadgeHTML(metrics) {
            const npiColor = metrics ? metrics.npiColor : "#a855f7";
            const npiVal = metrics ? metrics.meanNPI.toFixed(1) : "0.0";
            const amiColor = metrics ? metrics.amiColor : "#06b6d4";
            const amiVal = metrics ? metrics.meanAMI.toFixed(1) : "0.0";
            return '<span class="npi-badge" style="color:' + npiColor + '; border-color:' + npiColor + ';">' + npiVal + '% NPI</span> ' +
                   '<span class="ami-badge" style="color:' + amiColor + '; border-color:' + amiColor + ';">' + amiVal + '% AMI</span>';
        }

        static formatDiagnostics(metrics) {
            if (!metrics) return "NPI: 0.0% | AMI: 0.0% (NO DATA)";
            return "NPI: " + metrics.meanNPI + "% [" + metrics.npiRegime + "] | AMI: " + metrics.meanAMI + "% [" + metrics.amiRegime + "] | Shields: " + metrics.toolEquippedCount + " | Freezing: " + metrics.freezingCount;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = NeuralTelemetryManager;
    } else {
        global.NeuralTelemetryManager = NeuralTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
