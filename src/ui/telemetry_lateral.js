// BioEcosystem - Mechanoreceptive Hydrodynamic Sensitivity (% MHS) & Acoustic Dispersion Ratio (% ADR)
// Module: src/ui/telemetry_lateral.js
// Version: 6.58.0 (Hour 378 - UI Agent: 72nd Channel % ADR & Lateral HUD Dual-Telemetry)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * LateralTelemetryManager
     * High-precision telemetry tracking for fluid mechanoreception and surface hydrodynamics:
     * - Audits lateral line cupula neuromasts, dermal riblet scales, and drag damping
     * - Channel 71: Mechanoreceptive Hydrodynamic Sensitivity (% MHS)
     * - Channel 72: Acoustic Dispersion & Drag Reduction Ratio (% ADR)
     * - Categorizes fluid and acoustic dynamics into 4 physiological regime tiers
     * - Tracks schooling slipstream vortex drafting and positive rheotactic station-holding
     * - Manages live laboratory HUD telemetry indicators, badges, and diagnostic history recording
     */
    class LateralTelemetryManager {
        static calculateMetrics(organisms, lateralMechanoreceptionManager, tick) {
            let liveCount = 0, mechCount = 0, denticleCount = 0, draftingCount = 0;
            let sumNeuromasts = 0.0, sumDenticles = 0.0, sumDragDamping = 0.0, sumRheotaxis = 0.0;
            let sumWakeDisp = 0.0, sumAcousticDamp = 0.0, sumWakeFilter = 0.0, sumHinges = 0.0;
            let sumInertia = 0.0, totalWakes = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead) continue;
                    liveCount++;

                    const neuromasts = org.lateralNeuromasts || 0.0;
                    const denticles = org.dermalDenticles || 0.0;
                    const damping = org.laminarDragDamping || 0.0;
                    const rheotaxis = org.positiveRheotaxis || 0.0;
                    const drafting = org.vortexDraftingBonus || 0.0;
                    const wake = org.wakeDisplacementVector;

                    if (neuromasts > 1.5) {
                        mechCount++;
                        sumNeuromasts += neuromasts;
                    }
                    if (denticles > 0.8) {
                        denticleCount++;
                        sumDenticles += denticles;
                    }
                    if (drafting > 0.04) draftingCount++;

                    sumDragDamping += damping;
                    sumRheotaxis += rheotaxis;
                    sumAcousticDamp += org.acousticWaveDamping || 0.0;
                    sumWakeFilter += org.wakeFrequencyFilter || 0.0;
                    sumHinges += org.flexibleDenticleHinges || 0.0;
                    sumInertia += org.netTurningInertia || 0.0;
                    if (wake && typeof wake.magnitude === "number") sumWakeDisp += wake.magnitude;
                    totalWakes += org.detectedWakesCount || 0;
                }
            }

            const meanNeuromasts = mechCount > 0 ? (sumNeuromasts / mechCount) : 0.0;
            const meanDenticles = liveCount > 0 ? (sumDenticles / liveCount) : 0.0;
            const meanDragDamping = liveCount > 0 ? (sumDragDamping / liveCount) : 0.0;
            const meanRheotaxis = liveCount > 0 ? (sumRheotaxis / liveCount) : 0.0;
            const meanWakeDisp = liveCount > 0 ? (sumWakeDisp / liveCount) : 0.0;
            const meanAcousticDamp = liveCount > 0 ? (sumAcousticDamp / liveCount) : 0.0;
            const meanWakeFilter = liveCount > 0 ? (sumWakeFilter / liveCount) : 0.0;
            const meanFlexibleHinges = liveCount > 0 ? (sumHinges / liveCount) : 0.0;
            const meanNetInertia = liveCount > 0 ? (sumInertia / liveCount) : 0.0;
            const mechPrevalence = liveCount > 0 ? (mechCount / liveCount) : 0.0;
            const draftingPrevalence = liveCount > 0 ? (draftingCount / liveCount) : 0.0;

            // Channel 71: % MHS Formulation
            const wakeFactor = Math.min(1.0, meanWakeDisp * 1.8 + (totalWakes / Math.max(1, liveCount)) * 0.45);
            const neuromastFactor = Math.min(1.0, (meanNeuromasts / 10.0) * 0.7 + mechPrevalence * 0.3);
            const denticleFactor = Math.min(1.0, (meanDragDamping / 0.35) * 1.25);
            const rheoFactor = Math.min(1.0, meanRheotaxis * 1.35);
            const meanMHS = Math.max(0.0, Math.min(100.0, (wakeFactor * 35.0) + (neuromastFactor * 30.0) + (denticleFactor * 20.0) + (rheoFactor * 15.0)));

            let regimeMHS = "ISOTROPIC FLUID DRIFT / DORMANT CUPULA", colorMHS = "#94a3b8";
            if (meanMHS >= 70.0) { regimeMHS = "SUPER-RECEPTIVE HYDRODYNAMIC SLIPSTREAM LOCK"; colorMHS = "#10b981"; }
            else if (meanMHS >= 40.0) { regimeMHS = "COHERENT LAMINAR RHEOTACTIC SENSING"; colorMHS = "#14b8a6"; }
            else if (meanMHS >= 18.0) { regimeMHS = "INCIPIENT ACOUSTIC PRESSURE SENSATION"; colorMHS = "#06b6d4"; }

            // Channel 72: % ADR (Acoustic Dispersion & Drag Reduction) Formulation
            const acousticFactor = Math.min(1.0, (meanAcousticDamp / 0.55) * 1.15);
            const laminarDragFactor = Math.min(1.0, (meanDragDamping / 0.35) * 1.25);
            const wakeFilterFactor = Math.min(1.0, (meanWakeFilter / 0.70) * 1.1);
            const hingeFactor = Math.min(1.0, (meanFlexibleHinges / 0.55) * 1.2);
            const meanADR = Math.max(0.0, Math.min(100.0, (acousticFactor * 35.0) + (laminarDragFactor * 25.0) + (wakeFilterFactor * 20.0) + (hingeFactor * 20.0)));

            let regimeADR = "UNMITIGATED TURBULENT DRAG & ACOUSTIC EXPOSURE", colorADR = "#94a3b8";
            if (meanADR >= 70.0) { regimeADR = "HYPERSONIC STEALTH & FRICTIONLESS SUPPRESSION"; colorADR = "#4f46e5"; }
            else if (meanADR >= 45.0) { regimeADR = "COHERENT ACOUSTIC DISPERSION & LAMINAR FLOW"; colorADR = "#6366f1"; }
            else if (meanADR >= 20.0) { regimeADR = "INCIPIENT ELASTIC DAMPING & BOUNDARY SMOOTHING"; colorADR = "#818cf8"; }

            return {
                liveCount, mechCount, denticleCount, draftingCount, mechPrevalence, draftingPrevalence,
                meanNeuromasts, meanDenticles, meanDragDamping, meanRheotaxis, meanWakeDisp,
                meanAcousticDamp, meanWakeFilter, meanFlexibleHinges, meanNetInertia, totalWakes,
                meanMHS, regimeMHS, colorMHS, meanADR, regimeADR, colorADR, tick
            };
        }

        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 71: % MHS
            const valMHSIndexEl = document.getElementById("valMHSIndex");
            if (valMHSIndexEl) {
                valMHSIndexEl.textContent = metrics.meanMHS.toFixed(1) + "% MHS (" + metrics.regimeMHS + ")";
                valMHSIndexEl.style.color = metrics.colorMHS;
            }
            const valMHSStatusEl = document.getElementById("valMHSStatus");
            if (valMHSStatusEl) {
                valMHSStatusEl.textContent =
                    "NEUROMASTS: " + metrics.meanNeuromasts.toFixed(1) + "/cell" +
                    " | DENTICLES: " + metrics.meanDenticles.toFixed(1) +
                    " | DRAG DAMP: " + (metrics.meanDragDamping * 100.0).toFixed(1) + "%" +
                    " | RHEOTAXIS: " + (metrics.meanRheotaxis * 100.0).toFixed(1) + "%" +
                    " | DRAFTING: " + (metrics.draftingPrevalence * 100.0).toFixed(1) + "%" +
                    " | WAKES: " + metrics.totalWakes;
                valMHSStatusEl.style.color = metrics.meanMHS >= 40.0 ? "#14b8a6" : "#22d3ee";
            }

            // Channel 72: % ADR
            const valADRIndexEl = document.getElementById("valADRIndex");
            if (valADRIndexEl) {
                valADRIndexEl.textContent = metrics.meanADR.toFixed(1) + "% ADR (" + metrics.regimeADR + ")";
                valADRIndexEl.style.color = metrics.colorADR;
            }
            const valADRStatusEl = document.getElementById("valADRStatus");
            if (valADRStatusEl) {
                valADRStatusEl.textContent =
                    "ACOUSTIC DAMP: " + (metrics.meanAcousticDamp * 100.0).toFixed(1) + "%" +
                    " | WAKE FILTER: " + (metrics.meanWakeFilter * 100.0).toFixed(1) + "%" +
                    " | HINGE FLEX: " + (metrics.meanFlexibleHinges * 100.0).toFixed(1) + "%" +
                    " | NET INERTIA: " + metrics.meanNetInertia.toFixed(2);
                valADRStatusEl.style.color = metrics.meanADR >= 45.0 ? "#6366f1" : "#818cf8";
            }
        }

        static recordHistory(historyData, metrics) {
            if (!historyData) return;
            // Channel 71: % MHS
            if (historyData.hydrodynamicSensitivityIndex) {
                const chartMHS = Number.isFinite(metrics.meanMHS) ? Math.max(0, Math.min(100, metrics.meanMHS)) : 0;
                historyData.hydrodynamicSensitivityIndex.shift();
                historyData.hydrodynamicSensitivityIndex.push(chartMHS);
            }
            // Channel 72: % ADR
            if (historyData.acousticDispersionRatioIndex) {
                const chartADR = Number.isFinite(metrics.meanADR) ? Math.max(0, Math.min(100, metrics.meanADR)) : 0;
                historyData.acousticDispersionRatioIndex.shift();
                historyData.acousticDispersionRatioIndex.push(chartADR);
            }
        }

        static step(organisms, historyData, lateralMechanoreceptionManager, tick) {
            const metrics = LateralTelemetryManager.calculateMetrics(organisms, lateralMechanoreceptionManager, tick);
            LateralTelemetryManager.updateHUD(metrics);
            LateralTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getMHSBadgeHTML(metrics) {
            const color = metrics ? metrics.colorMHS : "#14b8a6";
            const val = metrics ? metrics.meanMHS.toFixed(1) : "0.0";
            return '<span class="mhs-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% MHS</span>';
        }

        static getADRBadgeHTML(metrics) {
            const color = metrics ? metrics.colorADR : "#6366f1";
            const val = metrics ? metrics.meanADR.toFixed(1) : "0.0";
            return '<span class="adr-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% ADR</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = LateralTelemetryManager;
    } else {
        global.LateralTelemetryManager = LateralTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
