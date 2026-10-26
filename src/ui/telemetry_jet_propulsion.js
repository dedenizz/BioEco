// BioEcosystem - Siphon Jet Propulsion & Vectorial Maneuver Agility Telemetry (Channels 49 & 50)
// Module: src/ui/telemetry_jet_propulsion.js
// Version: 5.49.0 (Hour 269 - UI Agent: 50th Channel Vectorial Maneuver Agility % VMA & Pelagic HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * JetPropulsionTelemetryManager
     * High-precision telemetry tracking for cephalopod-grade steerable jet propulsion:
     * - Audits dish-wide mantle cavity fluid storage and hydrostatic compression pressure
     * - Quantifies instantaneous kinetic thrust impulses, exit velocities, and cavitation wakes
     * - Drives Channel 49: Jet Propulsion Index (% JPI) on Lotka-Volterra chart
     * - Drives Channel 50: Vectorial Maneuver Agility (% VMA) for 360-degree hyponome vectoring
     * - Manages live HUD indicators, dynamic reverse braking, and metabolic fatigue readouts
     */
    class JetPropulsionTelemetryManager {
        /**
         * Calculate population jet propulsion and vectorial agility metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, tick) {
            let liveCount = 0;
            let activeJetCount = 0;
            let burstCount = 0;
            let pressurizedCount = 0;
            let cavitationPlumeCount = 0;
            let refillingCount = 0;
            let vectoringCount = 0;
            let reverseBrakingCount = 0;
            let orthogonalEscapeCount = 0;
            let exhaustionFreezeCount = 0;

            let totalJetThrust = 0.0;
            let totalCavityPressure = 0.0;
            let totalMantleVolume = 0.0;
            let totalExitVelocity = 0.0;
            let totalFatigue = 0.0;
            let totalDeflectionDeg = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const thrust = typeof o.jetThrustForce === "number" ? o.jetThrustForce : 0.0;
                    const pressure = typeof o.cavityPressure === "number" ? o.cavityPressure : 0.0;
                    const volume = typeof o.mantleVolume === "number" ? o.mantleVolume : 0.0;
                    const exitVel = typeof o.exitVelocity === "number" ? o.exitVelocity : 0.0;
                    const fatigue = typeof o.jetFatigue === "number" ? o.jetFatigue : 0.0;
                    const deflection = typeof o.siphonDeflectionAngle === "number" ? o.siphonDeflectionAngle : 0.0;
                    const isBurst = Boolean(o.jetBurstActive);
                    const isPlume = Boolean(o.cavitationPlumeActive);
                    const isBraking = Boolean(o.reverseBrakingActive);
                    const isFrozen = Boolean(o.exhaustionFreeze);

                    totalJetThrust += thrust;
                    totalCavityPressure += pressure;
                    totalMantleVolume += volume;
                    totalExitVelocity += exitVel;
                    totalFatigue += fatigue;
                    totalDeflectionDeg += Math.abs(deflection) * (180.0 / Math.PI);

                    if (thrust > 0.04 || isBurst) activeJetCount++;
                    if (isBurst) burstCount++;
                    if (pressure >= 15.0) pressurizedCount++;
                    if (isPlume) cavitationPlumeCount++;
                    if (volume < 13.5 && thrust <= 0.02) refillingCount++;
                    if (Math.abs(deflection) > 0.15) vectoringCount++;
                    if (isBraking) reverseBrakingCount++;
                    if (Math.abs(Math.abs(deflection) - Math.PI / 2) < 0.35 && thrust > 0.1) orthogonalEscapeCount++;
                    if (isFrozen) exhaustionFreezeCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanThrust = totalJetThrust / targetTotal;
            const meanPressure = totalCavityPressure / targetTotal;
            const meanMantleVolume = totalMantleVolume / targetTotal;
            const meanExitVelocity = totalExitVelocity / targetTotal;
            const meanFatigue = totalFatigue / targetTotal;
            const meanDeflectionDeg = totalDeflectionDeg / targetTotal;

            // Channel 49: Jet Propulsion Index (% JPI)
            const thrustWeight = Math.min(45.0, (meanThrust / 0.80) * 45.0);
            const pressureWeight = Math.min(35.0, (meanPressure / 25.0) * 35.0);
            const deploymentWeight = Math.min(20.0, (activeJetCount / targetTotal) * 100.0);
            const rawJPI = liveCount > 0 ? (thrustWeight + pressureWeight + deploymentWeight) : 0.0;
            const meanJPI = Number.isFinite(rawJPI) ? Math.max(0.0, Math.min(100.0, rawJPI)) : 0.0;

            let jpiRegime = "QUIESCENT PELAGIC DRIFT";
            let jpiColor = "#64748b";
            if (meanJPI >= 70.0) {
                jpiRegime = "SUPER-CAVITATING PELAGIC SURGE";
                jpiColor = "#f43f5e";
            } else if (meanJPI >= 45.0) {
                jpiRegime = "ACTIVE SIPHON JET PROPULSION";
                jpiColor = "#fb7185";
            } else if (meanJPI >= 20.0) {
                jpiRegime = "PULSATILE MANTLE FLUID RECOIL";
                jpiColor = "#38bdf8";
            }

            // Channel 50: Vectorial Maneuver Agility (% VMA)
            // 1. Mean angular deflection dispersion (40% max)
            // 2. Active vectoring & counter-braking deployment (35% max)
            // 3. Reflex evasion & anti-collision factor (25% max)
            const deflectWeight = Math.min(40.0, (meanDeflectionDeg / 90.0) * 40.0);
            const maneuverDeployWeight = Math.min(35.0, ((vectoringCount + reverseBrakingCount * 2.0) / targetTotal) * 70.0);
            const reflexWeight = Math.min(25.0, ((reverseBrakingCount + orthogonalEscapeCount) / Math.max(1, targetTotal * 0.20)) * 25.0);
            const rawVMA = liveCount > 0 ? (deflectWeight + maneuverDeployWeight + reflexWeight) : 0.0;
            const meanVMA = Number.isFinite(rawVMA) ? Math.max(0.0, Math.min(100.0, rawVMA)) : 0.0;

            let vmaRegime = "RIGID LINEAR AXIAL DISCHARGE";
            let vmaColor = "#94a3b8";
            if (meanVMA >= 65.0) {
                vmaRegime = "HYPER-AGILE MULTI-AXIS VECTORING";
                vmaColor = "#a855f7";
            } else if (meanVMA >= 40.0) {
                vmaRegime = "DYNAMIC HYPONOME STEERING";
                vmaColor = "#c084fc";
            } else if (meanVMA >= 15.0) {
                vmaRegime = "ANGULAR JET DEFLECTION";
                vmaColor = "#e879f9";
            }

            return {
                liveCount: liveCount,
                activeJetCount: activeJetCount,
                burstCount: burstCount,
                pressurizedCount: pressurizedCount,
                cavitationPlumeCount: cavitationPlumeCount,
                refillingCount: refillingCount,
                vectoringCount: vectoringCount,
                reverseBrakingCount: reverseBrakingCount,
                orthogonalEscapeCount: orthogonalEscapeCount,
                exhaustionFreezeCount: exhaustionFreezeCount,
                meanJPI: Number(meanJPI.toFixed(1)),
                meanVMA: Number(meanVMA.toFixed(1)),
                meanThrust: Number(meanThrust.toFixed(3)),
                meanPressure: Number(meanPressure.toFixed(1)),
                meanMantleVolume: Number(meanMantleVolume.toFixed(2)),
                meanExitVelocity: Number(meanExitVelocity.toFixed(2)),
                meanFatigue: Number(meanFatigue.toFixed(3)),
                meanDeflectionDeg: Number(meanDeflectionDeg.toFixed(1)),
                jpiRegime: jpiRegime,
                jpiColor: jpiColor,
                vmaRegime: vmaRegime,
                vmaColor: vmaColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for Channels 49 and 50.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            // Channel 49 HUD Elements
            const valJPIIndexEl = document.getElementById("valJPIIndex");
            const valJPIStatusEl = document.getElementById("valJPIStatus");
            if (valJPIIndexEl) {
                valJPIIndexEl.textContent = metrics.meanJPI.toFixed(1) + "% JPI (" + metrics.jpiRegime + ")";
                valJPIIndexEl.style.color = metrics.jpiColor;
            }
            if (valJPIStatusEl) {
                valJPIStatusEl.textContent = "JETTING: " + metrics.activeJetCount + " | BURSTS: " + metrics.burstCount + " | CAVITY: " + metrics.meanPressure.toFixed(1) + " kPa | EXIT: " + metrics.meanExitVelocity.toFixed(1) + " px/t | V: " + metrics.meanMantleVolume.toFixed(1);
                valJPIStatusEl.style.color = metrics.activeJetCount > 0 ? "#fda4af" : "#94a3b8";
            }

            // Channel 50 HUD Elements (50th Channel Jubilee)
            const valVMAIndexEl = document.getElementById("valVMAIndex");
            const valVMAStatusEl = document.getElementById("valVMAStatus");
            if (valVMAIndexEl) {
                valVMAIndexEl.textContent = metrics.meanVMA.toFixed(1) + "% VMA (" + metrics.vmaRegime + ")";
                valVMAIndexEl.style.color = metrics.vmaColor;
            }
            if (valVMAStatusEl) {
                valVMAStatusEl.textContent = "VECTORING: " + metrics.vectoringCount + " | BRAKING: " + metrics.reverseBrakingCount + " | DODGE: " + metrics.orthogonalEscapeCount + " | DEFLECT: " + metrics.meanDeflectionDeg.toFixed(1) + " deg | CRAMP: " + metrics.exhaustionFreezeCount;
                valVMAStatusEl.style.color = metrics.reverseBrakingCount > 0 ? "#fca5a5" : (metrics.vectoringCount > 0 ? "#d8b4fe" : "#94a3b8");
            }
        }

        /**
         * Push new data points to Channel 49 and Channel 50 history curves in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.jetPropulsion) {
                const chartJPI = Number.isFinite(metrics.meanJPI) ? Math.max(0, Math.min(100, metrics.meanJPI)) : 0;
                historyData.jetPropulsion.shift();
                historyData.jetPropulsion.push(chartJPI);
            }

            if (historyData.vectorManeuver) {
                const chartVMA = Number.isFinite(metrics.meanVMA) ? Math.max(0, Math.min(100, metrics.meanVMA)) : 0;
                historyData.vectorManeuver.shift();
                historyData.vectorManeuver.push(chartVMA);
            }
        }

        /**
         * Execute full telemetry cycle step for jet propulsion and maneuver agility.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Calculated metrics.
         */
        static step(organisms, historyData, tick) {
            const metrics = JetPropulsionTelemetryManager.calculateMetrics(organisms, tick);
            JetPropulsionTelemetryManager.updateHUD(metrics);
            JetPropulsionTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Sanitized badge HTML string.
         */
        static getBadgeHTML(metrics) {
            const jpiColor = metrics ? metrics.jpiColor : "#f43f5e";
            const vmaColor = metrics ? metrics.vmaColor : "#a855f7";
            const jpiVal = metrics ? metrics.meanJPI.toFixed(1) : "0.0";
            const vmaVal = metrics ? metrics.meanVMA.toFixed(1) : "0.0";
            return '<span class="jpi-badge" style="color:' + jpiColor + '; border-color:' + jpiColor + ';">' + jpiVal + '% JPI</span> ' +
                   '<span class="vma-badge" style="color:' + vmaColor + '; border-color:' + vmaColor + ';">' + vmaVal + '% VMA</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Single-line diagnostic string.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "JPI: 0.0% | VMA: 0.0% (NO DATA)";
            return `JPI: ${metrics.meanJPI}% [${metrics.jpiRegime}] | VMA: ${metrics.meanVMA}% [${metrics.vmaRegime}] | Vect: ${metrics.vectoringCount}/${metrics.liveCount} | Brake: ${metrics.reverseBrakingCount} | Deflect: ${metrics.meanDeflectionDeg} deg`;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = JetPropulsionTelemetryManager;
    } else {
        global.JetPropulsionTelemetryManager = JetPropulsionTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
