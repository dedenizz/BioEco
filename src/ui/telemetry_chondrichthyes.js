// BioEcosystem - Early Chondrichthyes Prismatic Cartilage, Placoid Riblet & Polyphyodont Telemetry Dashboard
// Module: src/ui/telemetry_chondrichthyes.js
// Version: 8.35.0 (Hour 555 - Looks & UI Agent: 107th Channel % PDI, 108th Channel % PBR, Turquoise & Ivory Badges and HUD Panel)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChondrichthyesTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 107th Telemetry Channel: Placoid Denticle & Hydrodynamic Index (% PDI) - Turquoise ocean blue (#0ea5e9)
     * - 108th Telemetry Channel: Polyphyodont Tooth Replacement Rate (% PBR) - Platinum ivory white (#f8fafc)
     * - 4 Biological Regimes for % PDI (NAKED_DERMIS, INCIPIENT_DENTICLE, STREAMLINED_RIBLET, APEX_HYDROFOIL)
     * - 4 Biological Regimes for % PBR (FIXED_OCCLUSION, TARDY_REPLACEMENT, POLYPHYODONT_WHORL, ENDLESS_CONVEYOR)
     * - Real-time prismatic cartilage integrity, riblet drag reduction, agility multiplier, tooth ranks, and spiracular efficiency metrics
     */
    class ChondrichthyesTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across all live Chondrichthyes organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} cartilageManager - Global ChondrichthyesCartilageManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Chondrichthyes metrics.
         */
        static calculateMetrics(organisms, cartilageManager, tick) {
            let liveCount = 0;
            let chondCount = 0;
            let ramCount = 0;

            let sumPDI = 0.0;
            let sumPBR = 0.0;
            let sumCartilage = 0.0;
            let sumAgility = 0.0;
            let sumDenticles = 0.0;
            let sumDrag = 0.0;
            let sumRanks = 0.0;
            let sumSharpness = 0.0;
            let sumSpiracle = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isChondrichthyes) {
                        chondCount++;

                        const pdi = org.placoidDenticleIndex !== undefined ? org.placoidDenticleIndex : 50.0;
                        const pbr = org.polyphyodontReplacementRate !== undefined ? org.polyphyodontReplacementRate : 50.0;
                        const cart = org.prismaticCartilageIntegrity !== undefined ? org.prismaticCartilageIntegrity : 0.82;
                        const agility = org.hydrodynamicAgilityMultiplier !== undefined ? org.hydrodynamicAgilityMultiplier : 1.55;
                        const dent = org.placoidDenticleCoverage !== undefined ? org.placoidDenticleCoverage : 0.80;
                        const drag = org.skinFrictionDragReduction !== undefined ? org.skinFrictionDragReduction : 0.18;
                        const ranks = org.toothRowRanks !== undefined ? org.toothRowRanks : 5;
                        const sharp = org.vitrodentinSharpness !== undefined ? org.vitrodentinSharpness : 0.88;
                        const spiracle = org.spiracleVentilationEfficiency !== undefined ? org.spiracleVentilationEfficiency : 0.78;

                        sumPDI += pdi;
                        sumPBR += pbr;
                        sumCartilage += cart;
                        sumAgility += agility;
                        sumDenticles += dent;
                        sumDrag += drag;
                        sumRanks += ranks;
                        sumSharpness += sharp;
                        sumSpiracle += spiracle;

                        if (org.ramVentilationActive) ramCount++;
                    }
                }
            }

            const chondrichthyesPrevalence = liveCount > 0 ? (chondCount / liveCount) * 100.0 : 0.0;
            const meanPDI = chondCount > 0 ? (sumPDI / chondCount) : 0.0;
            const meanPBR = chondCount > 0 ? (sumPBR / chondCount) : 0.0;
            const meanCartilage = chondCount > 0 ? (sumCartilage / chondCount) : 0.82;
            const meanAgility = chondCount > 0 ? (sumAgility / chondCount) : 1.55;
            const meanDenticles = chondCount > 0 ? (sumDenticles / chondCount) : 0.80;
            const meanDragReduction = chondCount > 0 ? (sumDrag / chondCount) : 0.18;
            const meanToothRanks = chondCount > 0 ? (sumRanks / chondCount) : 5.0;
            const meanSharpness = chondCount > 0 ? (sumSharpness / chondCount) : 0.88;
            const meanSpiracle = chondCount > 0 ? (sumSpiracle / chondCount) : 0.78;

            let toothReplacements = 0;
            let ramVentEvents = 0;
            let spiracleEvents = 0;
            let agilityBursts = 0;
            let cartilaginousBiomass = 0.0;

            if (cartilageManager && cartilageManager.getMetrics) {
                const mgr = cartilageManager.getMetrics();
                toothReplacements = mgr.conveyorToothReplacements || 0;
                ramVentEvents = mgr.ramVentilationEvents || 0;
                spiracleEvents = mgr.spiracularInflowEvents || 0;
                agilityBursts = mgr.agilityBurstEvents || 0;
                cartilaginousBiomass = mgr.cumulativeCartilaginousBiomass || 0.0;
            }

            // 4 Distinct Biological Regimes for 107th Channel (% PDI)
            let pdiRegimeCode = "NAKED_DERMIS";
            let pdiRegimeTitle = "NAKED DERMIS & UNREGULATED BOUNDARY TURBULENCE";
            let pdiRegimeBadge = "pdi-naked";

            if (meanPDI >= 85.0) {
                pdiRegimeCode = "APEX_HYDROFOIL";
                pdiRegimeTitle = "APEX ELASMOBRANCH HYDROFOIL & SILENT CRUISE";
                pdiRegimeBadge = "pdi-apex";
            } else if (meanPDI >= 60.0) {
                pdiRegimeCode = "STREAMLINED_RIBLET";
                pdiRegimeTitle = "STREAMLINED RIBLETS & 15% SKIN FRICTION MITIGATION";
                pdiRegimeBadge = "pdi-streamlined";
            } else if (meanPDI >= 30.0) {
                pdiRegimeCode = "INCIPIENT_DENTICLE";
                pdiRegimeTitle = "INCIPIENT PLACOID SCALES & PARTIAL VORTEX SHEDDING";
                pdiRegimeBadge = "pdi-incipient";
            }

            // 4 Distinct Biological Regimes for 108th Channel (% PBR)
            let pbrRegimeCode = "FIXED_OCCLUSION";
            let pbrRegimeTitle = "FIXED DENTAL BINDING & RAPID WEAR SENSITIVITY";
            let pbrRegimeBadge = "pbr-fixed";

            if (meanPBR >= 85.0) {
                pbrRegimeCode = "ENDLESS_CONVEYOR";
                pbrRegimeTitle = "ENDLESS REPLACEMENT CONVEYOR & ZERO PENALTY OCCLUSION";
                pbrRegimeBadge = "pbr-conveyor";
            } else if (meanPBR >= 60.0) {
                pbrRegimeCode = "POLYPHYODONT_WHORL";
                pbrRegimeTitle = "CONTINUOUS POLYPHYODONT WHORL & CONSTANT RAZOR EDGES";
                pbrRegimeBadge = "pbr-whorl";
            } else if (meanPBR >= 30.0) {
                pbrRegimeCode = "TARDY_REPLACEMENT";
                pbrRegimeTitle = "TARDY REPLACEMENT CONVEYOR & INTERMITTENT GAPS";
                pbrRegimeBadge = "pbr-tardy";
            }

            return {
                liveCount,
                chondCount,
                ramCount,
                chondrichthyesPrevalence,
                meanPDI,
                meanPBR,
                meanCartilage,
                meanAgility,
                meanDenticles,
                meanDragReduction,
                meanToothRanks,
                meanSharpness,
                meanSpiracle,
                toothReplacements,
                ramVentEvents,
                spiracleEvents,
                agilityBursts,
                cartilaginousBiomass,
                pdiRegimeCode,
                pdiRegimeTitle,
                pdiRegimeBadge,
                pbrRegimeCode,
                pbrRegimeTitle,
                pbrRegimeBadge,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 107th (% PDI) and 108th (% PBR) Channels.
         * @param {Object} metrics - Calculated Chondrichthyes telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 107 Readout (% PDI - Placoid Denticle & Hydrodynamic Index)
            const valPDIIndexEl = document.getElementById("valPDIIndex");
            if (valPDIIndexEl) {
                valPDIIndexEl.textContent = metrics.meanPDI.toFixed(1) + "% PDI (" + metrics.pdiRegimeTitle + ")";
                if (metrics.meanPDI >= 85.0) {
                    valPDIIndexEl.style.color = "#38bdf8";
                } else if (metrics.meanPDI >= 60.0) {
                    valPDIIndexEl.style.color = "#0ea5e9";
                } else if (metrics.meanPDI >= 30.0) {
                    valPDIIndexEl.style.color = "#0284c7";
                } else {
                    valPDIIndexEl.style.color = "#94a3b8";
                }
            }

            // 2. Secondary Channel 107 Status
            const valPDIStatusEl = document.getElementById("valPDIStatus");
            if (valPDIStatusEl) {
                valPDIStatusEl.textContent =
                    "CHONDRICHTHYES: " + metrics.chondCount + "/" + metrics.liveCount +
                    " (" + metrics.chondrichthyesPrevalence.toFixed(0) + "%) | DENTICLES: " + (metrics.meanDenticles * 100.0).toFixed(0) + "%" +
                    " | DRAG REDUCTION: " + (metrics.meanDragReduction * 100.0).toFixed(1) + "%" +
                    " | AGILITY: " + metrics.meanAgility.toFixed(2) + "x" +
                    " | CARTILAGE: " + (metrics.meanCartilage * 100.0).toFixed(0) + "%" +
                    " | RAM VENT: " + metrics.ramCount +
                    " | BURSTS: " + metrics.agilityBursts;
                valPDIStatusEl.style.color = metrics.meanPDI >= 50.0 ? "#38bdf8" : "#0ea5e9";
            }

            // 3. Primary Channel 108 Readout (% PBR - Polyphyodont Tooth Replacement Rate)
            const valPBRIndexEl = document.getElementById("valPBRIndex");
            if (valPBRIndexEl) {
                valPBRIndexEl.textContent = metrics.meanPBR.toFixed(1) + "% PBR (" + metrics.pbrRegimeTitle + ")";
                if (metrics.meanPBR >= 85.0) {
                    valPBRIndexEl.style.color = "#ffffff";
                } else if (metrics.meanPBR >= 60.0) {
                    valPBRIndexEl.style.color = "#f8fafc";
                } else if (metrics.meanPBR >= 30.0) {
                    valPBRIndexEl.style.color = "#cbd5e1";
                } else {
                    valPBRIndexEl.style.color = "#94a3b8";
                }
            }

            // 4. Secondary Channel 108 Status
            const valPBRStatusEl = document.getElementById("valPBRStatus");
            if (valPBRStatusEl) {
                valPBRStatusEl.textContent =
                    "RANKS: " + metrics.meanToothRanks.toFixed(1) + " rows | " +
                    "SHARPNESS: " + (metrics.meanSharpness * 100.0).toFixed(0) + "% | " +
                    "SPIRACLE: " + (metrics.meanSpiracle * 100.0).toFixed(0) + "% | " +
                    "REPLACED: " + metrics.toothReplacements + " teeth | " +
                    "BIOMASS: " + metrics.cartilaginousBiomass.toFixed(1) + " mg";
                valPBRStatusEl.style.color = metrics.meanPBR >= 50.0 ? "#f8fafc" : "#e2e8f0";
            }

            // 5. Dedicated Chondrichthyes Laboratory HUD Badges & Meters (if DOM present)
            const valPDIBadgeEl = document.getElementById("valPDIBadge");
            if (valPDIBadgeEl) {
                valPDIBadgeEl.className = "pdi-badge " + metrics.pdiRegimeBadge;
                valPDIBadgeEl.textContent = metrics.pdiRegimeCode;
            }

            const valPDIMeterFillEl = document.getElementById("valPDIMeterFill");
            if (valPDIMeterFillEl) {
                valPDIMeterFillEl.style.width = Math.max(0, Math.min(100, metrics.meanPDI)).toFixed(1) + "%";
                valPDIMeterFillEl.style.backgroundColor = metrics.meanPDI >= 60.0 ? "#0ea5e9" : "#0284c7";
            }

            const valPBRBadgeEl = document.getElementById("valPBRBadge");
            if (valPBRBadgeEl) {
                valPBRBadgeEl.className = "pbr-badge " + metrics.pbrRegimeBadge;
                valPBRBadgeEl.textContent = metrics.pbrRegimeCode;
            }

            const valPBRMeterFillEl = document.getElementById("valPBRMeterFill");
            if (valPBRMeterFillEl) {
                valPBRMeterFillEl.style.width = Math.max(0, Math.min(100, metrics.meanPBR)).toFixed(1) + "%";
                valPBRMeterFillEl.style.backgroundColor = metrics.meanPBR >= 60.0 ? "#f8fafc" : "#cbd5e1";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 107th Channel: % PDI
            if (!historyData.placoidDenticleIndex) {
                historyData.placoidDenticleIndex = new Array(74).fill(0);
            }
            const chartValPDI = Number.isFinite(metrics.meanPDI) ?
                Math.max(0, Math.min(100, metrics.meanPDI)) : 0;
            historyData.placoidDenticleIndex.shift();
            historyData.placoidDenticleIndex.push(chartValPDI);

            // 108th Channel: % PBR
            if (!historyData.polyphyodontReplacementRate) {
                historyData.polyphyodontReplacementRate = new Array(74).fill(0);
            }
            const chartValPBR = Number.isFinite(metrics.meanPBR) ?
                Math.max(0, Math.min(100, metrics.meanPBR)) : 0;
            historyData.polyphyodontReplacementRate.shift();
            historyData.polyphyodontReplacementRate.push(chartValPBR);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} cartilageManager - Global ChondrichthyesCartilageManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, cartilageManager, tick) {
            const metrics = ChondrichthyesTelemetryManager.calculateMetrics(organisms, cartilageManager, tick);
            ChondrichthyesTelemetryManager.updateHUD(metrics);
            ChondrichthyesTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChondrichthyesTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.ChondrichthyesTelemetryManager = ChondrichthyesTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
