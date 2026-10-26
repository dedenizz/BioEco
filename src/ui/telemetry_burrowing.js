// BioEcosystem - Benthic Burrowing (% BDI) & Substrate Oxygenation (% SOX) Telemetry
// Module: src/ui/telemetry_burrowing.js
// Version: 6.38.0 (Hour 358 - UI Agent: 68th Telemetry Channel % SOX & Benthic HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BurrowingTelemetryManager
     * High-precision telemetry tracking for benthic infaunal excavation and substrate oxygenation:
     * - Audits sclerotized fossorial paddle maturity, penetration torque, and burrow depth
     * - Drives Channel 67: Benthic Burrowing Index (% BDI) on Lotka-Volterra chart
     * - Drives Channel 68: Substrate Oxygenation Index (% SOX) on Lotka-Volterra chart
     * - Tracks peristaltic hydraulic thrust, anoxic stress avoidance, and sediment gas venting
     * - Manages live laboratory HUD indicators, dual-channel chart recording, and diagnostic logging
     */
    class BurrowingTelemetryManager {
        /**
         * Calculate burrowing (% BDI) and oxygenation (% SOX) telemetry metrics.
         * @param {Array<Object>} organisms - Live simulation population array.
         * @param {Object} fossorialAppendagesManager - Active fossorial manager instance.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive burrowing and oxygenation telemetry snapshot.
         */
        static calculateMetrics(organisms, fossorialAppendagesManager, tick) {
            let liveCount = 0;
            let paddleCount = 0;
            let burrowCount = 0;
            let activeBurrowers = 0;
            let totalPaddles = 0.0;
            let totalDepth = 0.0;
            let totalTorque = 0.0;
            let totalConcealment = 0.0;
            let totalPeristaltic = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const paddles = org.fossorialPaddles || 0.0;
                    const depth = org.burrowDepth || 0.0;

                    if (paddles >= 0.2) {
                        paddleCount++;
                        totalPaddles += paddles;
                    }
                    if (depth >= 2.0) {
                        burrowCount++;
                        totalDepth += depth;
                        totalConcealment += (org.infaunalConcealment || 0.0);
                        totalPeristaltic += (org.peristalticImpulse || 0.0);
                    }
                    if (org.isBurrowing) {
                        activeBurrowers++;
                        totalTorque += (org.penetrationTorque || 0.0);
                    }
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanPaddles = paddleCount > 0 ? (totalPaddles / paddleCount) : 0.0;
            const meanDepth = burrowCount > 0 ? (totalDepth / burrowCount) : 0.0;
            const meanTorque = activeBurrowers > 0 ? (totalTorque / activeBurrowers) : 0.0;
            const meanPeristaltic = burrowCount > 0 ? (totalPeristaltic / burrowCount) : 0.0;
            const meanConcealment = burrowCount > 0 ? (totalConcealment / burrowCount) : 0.0;
            const burrowPrevalence = liveCount > 0 ? (burrowCount / liveCount) * 100.0 : 0.0;
            const paddlePrevalence = liveCount > 0 ? (paddleCount / liveCount) * 100.0 : 0.0;

            const managerMetrics = (fossorialAppendagesManager && typeof fossorialAppendagesManager.getMetrics === "function")
                ? fossorialAppendagesManager.getMetrics()
                : null;

            const cumulativeDigested = managerMetrics ? (managerMetrics.cumulativeSedimentDigested || 0.0) : 0.0;
            const cumulativeVented = managerMetrics ? (managerMetrics.cumulativeGasVented || 0.0) : 0.0;
            const anoxicPrevalence = managerMetrics ? (managerMetrics.anoxicStressPrevalence || 0.0) : 0.0;
            const activeBurrowPlumes = managerMetrics ? (managerMetrics.activeBurrowPlumes || 0) : 0;

            // 67th Channel: Benthic Burrowing Index (% BDI)
            const depthScore = Math.min(20.0, (meanDepth / 40.0) * 20.0) + Math.min(15.0, (burrowPrevalence / 35.0) * 15.0);
            const paddleScore = Math.min(18.0, (meanPaddles / 4.5) * 18.0) + Math.min(12.0, (meanTorque / 0.65) * 12.0);
            const concealmentScore = Math.min(20.0, (meanConcealment / 0.60) * 20.0);
            const miningScore = Math.min(15.0, (cumulativeDigested / 12.0) * 15.0);

            const rawBDI = liveCount > 0 ? (depthScore + paddleScore + concealmentScore + miningScore) : 0.0;
            const meanBDI = Number.isFinite(rawBDI) ? Math.max(0.0, Math.min(100.0, rawBDI)) : 0.0;

            let bdiRegime = "EPIPELAGIC SUSPENSION / INCIPIENT SCRATCHING";
            let bdiColor = "#64748b";
            if (meanBDI >= 75.0) {
                bdiRegime = "PERVASIVE ENDOBENTHIC EXCAVATION";
                bdiColor = "#fb923c";
            } else if (meanBDI >= 50.0) {
                bdiRegime = "CONSOLIDATED SUBSTRATE TUNNELING";
                bdiColor = "#ea580c";
            } else if (meanBDI >= 20.0) {
                bdiRegime = "SHALLOW EPIBENTHIC DEPRESSION";
                bdiColor = "#c2410c";
            }

            // 68th Channel: Substrate Oxygenation Index (% SOX)
            const ventScore = Math.min(35.0, (cumulativeVented / 6.0) * 35.0);
            const peristalticScore = Math.min(30.0, (meanPeristaltic / 0.16) * 30.0);
            const anoxicRelief = Math.min(20.0, (Math.max(0.0, 100.0 - anoxicPrevalence) / 100.0) * 20.0 * Math.min(1.0, burrowPrevalence / 18.0));
            const infaunalScore = Math.min(15.0, (burrowPrevalence / 25.0) * 15.0);

            const rawSOX = liveCount > 0 ? (ventScore + peristalticScore + anoxicRelief + infaunalScore) : 0.0;
            const meanSOX = Number.isFinite(rawSOX) ? Math.max(0.0, Math.min(100.0, rawSOX)) : 0.0;

            let soxRegime = "ANOXIC COMPACTED HARDGROUND";
            let soxColor = "#64748b";
            if (meanSOX >= 75.0) {
                soxRegime = "SUBLITTORAL OXYGEN SUPER-VENTILATION";
                soxColor = "#22d3ee";
            } else if (meanSOX >= 50.0) {
                soxRegime = "PERMEABLE OXYGENATED BIO-TURF";
                soxColor = "#06b6d4";
            } else if (meanSOX >= 20.0) {
                soxRegime = "INCIPIENT BIOGENIC IRRIGATED CRUST";
                soxColor = "#0284c7";
            }

            return {
                liveCount,
                burrowCount,
                paddleCount,
                activeBurrowers,
                burrowPrevalence: Number(burrowPrevalence.toFixed(1)),
                paddlePrevalence: Number(paddlePrevalence.toFixed(1)),
                meanPaddles: Number(meanPaddles.toFixed(2)),
                meanDepth: Number(meanDepth.toFixed(1)),
                meanTorque: Number(meanTorque.toFixed(2)),
                meanPeristaltic: Number(meanPeristaltic.toFixed(2)),
                meanConcealment: Number(meanConcealment.toFixed(2)),
                cumulativeDigested: Number(cumulativeDigested.toFixed(2)),
                cumulativeVented: Number(cumulativeVented.toFixed(2)),
                anoxicPrevalence: Number(anoxicPrevalence.toFixed(1)),
                activeBurrowPlumes,
                meanBDI: Number(meanBDI.toFixed(1)),
                bdiRegime,
                bdiColor,
                meanSOX: Number(meanSOX.toFixed(1)),
                soxRegime,
                soxColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for Channels 67 (% BDI) and 68 (% SOX).
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // 67th Channel (% BDI)
            const valBDIIndexEl = document.getElementById("valBDIIndex");
            const valBDIStatusEl = document.getElementById("valBDIStatus");
            if (valBDIIndexEl) {
                valBDIIndexEl.textContent = metrics.meanBDI.toFixed(1) + "% BDI (" + metrics.bdiRegime + ")";
                valBDIIndexEl.style.color = metrics.bdiColor;
            }
            if (valBDIStatusEl) {
                valBDIStatusEl.textContent = "BURROWERS: " + metrics.burrowCount + "/" + metrics.liveCount +
                    " | DEPTH: " + metrics.meanDepth.toFixed(1) + " px" +
                    " | PADDLES: " + metrics.meanPaddles.toFixed(1) + "/cell" +
                    " | TORQUE: " + metrics.meanTorque.toFixed(2) +
                    " | DIGESTED: " + metrics.cumulativeDigested.toFixed(1);
                valBDIStatusEl.style.color = metrics.meanBDI >= 50.0 ? "#fb923c" : "#ea580c";
            }

            // 68th Channel (% SOX)
            const valSOXIndexEl = document.getElementById("valSOXIndex");
            const valSOXStatusEl = document.getElementById("valSOXStatus");
            if (valSOXIndexEl) {
                valSOXIndexEl.textContent = metrics.meanSOX.toFixed(1) + "% SOX (" + metrics.soxRegime + ")";
                valSOXIndexEl.style.color = metrics.soxColor;
            }
            if (valSOXStatusEl) {
                valSOXStatusEl.textContent = "VENTED: " + metrics.cumulativeVented.toFixed(1) +
                    " | PERISTALSIS: " + metrics.meanPeristaltic.toFixed(2) +
                    " | ANOXIC: " + metrics.anoxicPrevalence.toFixed(1) + "%" +
                    " | PLUMES: " + metrics.activeBurrowPlumes;
                valSOXStatusEl.style.color = metrics.meanSOX >= 50.0 ? "#22d3ee" : "#06b6d4";
            }
        }

        /**
         * Push new data points to Channels 67 and 68 history curves on Lotka-Volterra chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.benthicBurrowingIndex) {
                const chartBDI = Number.isFinite(metrics.meanBDI) ? Math.max(0, Math.min(100, metrics.meanBDI)) : 0;
                historyData.benthicBurrowingIndex.shift();
                historyData.benthicBurrowingIndex.push(chartBDI);
            }

            if (historyData.substrateOxygenationIndex) {
                const chartSOX = Number.isFinite(metrics.meanSOX) ? Math.max(0, Math.min(100, metrics.meanSOX)) : 0;
                historyData.substrateOxygenationIndex.shift();
                historyData.substrateOxygenationIndex.push(chartSOX);
            }
        }

        /**
         * Execute full telemetry cycle step for Channels 67 (% BDI) and 68 (% SOX).
         * @param {Array<Object>} organisms - Living simulation organisms.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} fossorialAppendagesManager - Active fossorial manager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, fossorialAppendagesManager, tick) {
            const metrics = BurrowingTelemetryManager.calculateMetrics(organisms, fossorialAppendagesManager, tick);
            BurrowingTelemetryManager.updateHUD(metrics);
            BurrowingTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getBDIBadgeHTML(metrics) {
            const bdiColor = metrics ? metrics.bdiColor : "#ea580c";
            const bdiVal = metrics ? metrics.meanBDI.toFixed(1) : "0.0";
            return '<span class="bdi-badge" style="color:' + bdiColor + '; border-color:' + bdiColor + ';">' + bdiVal + '% BDI</span>';
        }

        static getSOXBadgeHTML(metrics) {
            const soxColor = metrics ? metrics.soxColor : "#06b6d4";
            const soxVal = metrics ? metrics.meanSOX.toFixed(1) : "0.0";
            return '<span class="sox-badge" style="color:' + soxColor + '; border-color:' + soxColor + ';">' + soxVal + '% SOX</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BurrowingTelemetryManager;
    } else {
        global.BurrowingTelemetryManager = BurrowingTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
