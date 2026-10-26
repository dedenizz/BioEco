// BioEcosystem - Bioluminescent Signals & Swarm Synchronization Telemetry (Channel 46)
// Module: src/ui/telemetry_bioluminescent_signals.js
// Version: 5.29.0 (Hour 249 - UI Agent: 46th Channel Bioluminescent Synchronization Index % BSI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * BioluminescentTelemetryManager
     * Tracks dish-wide luciferin substrate reserves, photophore enzymatic emission,
     * Kuramoto phase-locked swarm synchrony, and 470nm cold-light communication bandwidth.
     */
    class BioluminescentTelemetryManager {
        /**
         * Calculate bioluminescent metrics, synchronization coherence, and photic demographics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms) {
            let liveCount = 0;
            let aphoticCount = 0;
            let flashingCount = 0;
            let alarmBurstCount = 0;

            let totalLuciferin = 0.0;
            let totalLuminosity = 0.0;
            let totalSyncPeers = 0;

            // Optical coherence demographic tiers
            let phaseLockedCount = 0;   // >= 2 synchronized peers (tight Kuramoto coupling)
            let sporadicFlashCount = 0; // Flashing but decoupled (< 2 peers)
            let darkQuiescentCount = 0; // Zero or near-zero photic emission

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const luciferin = typeof o.storedLuciferin === "number" ? o.storedLuciferin : 0.0;
                    const lum = typeof o.currentLuminosity === "number" ? o.currentLuminosity : 0.0;
                    const peers = typeof o.synchronizedPeerCount === "number" ? o.synchronizedPeerCount : 0;
                    const isFlashing = Boolean(o.isFlashing);
                    const isAlarm = Boolean(o.alarmBurstActive);

                    totalLuciferin += luciferin;
                    totalLuminosity += lum;
                    totalSyncPeers += peers;

                    if (o.y > 440.0) {
                        aphoticCount++;
                    }

                    if (isAlarm) {
                        alarmBurstCount++;
                    }

                    if (isFlashing) {
                        flashingCount++;
                        if (peers >= 2) {
                            phaseLockedCount++;
                        } else {
                            sporadicFlashCount++;
                        }
                    } else if (lum <= 0.05) {
                        darkQuiescentCount++;
                    }
                }
            }

            // Population arithmetic means
            const meanLuciferin = liveCount > 0 ? (totalLuciferin / liveCount) : 0.0;
            const meanLuminosity = liveCount > 0 ? (totalLuminosity / liveCount) : 0.0;
            const aphoticTarget = Math.max(1, aphoticCount);
            const meanSyncPeers = aphoticCount > 0 ? (totalSyncPeers / aphoticTarget) : 0.0;

            // 46th Channel: Bioluminescent Synchronization Index (% BSI)
            // Composite metric: weighted combination of phase-locked coupling, mean photophore output, and flasher density
            const phaseRatio = (phaseLockedCount / aphoticTarget) * 55.0;
            const lumRatio = Math.min(30.0, (totalLuminosity / aphoticTarget) * 60.0);
            const flashRatio = Math.min(15.0, (flashingCount / aphoticTarget) * 35.0);
            const rawBSI = aphoticCount > 0 ? (phaseRatio + lumRatio + flashRatio) : 0.0;
            const meanBSI = Number.isFinite(rawBSI) ? Math.max(0.0, Math.min(100.0, rawBSI)) : 0.0;

            // Qualitative synchronization regime categorization
            let bsiRegime = "DARK QUIESCENCE";
            let bsiColor = "#64748b";

            if (meanBSI >= 70.0) {
                bsiRegime = "SYNCHRONIZED SWARM FLASH";
                bsiColor = "#06b6d4";
            } else if (meanBSI >= 45.0) {
                bsiRegime = "PHASE-COUPLED PULSING";
                bsiColor = "#22d3ee";
            } else if (meanBSI >= 20.0) {
                bsiRegime = "SPORADIC COLD LIGHT";
                bsiColor = "#0ea5e9";
            } else if (meanBSI > 0.0 || aphoticCount > 0) {
                bsiRegime = "APHOTIC INCANDESCENCE";
                bsiColor = "#94a3b8";
            }

            return {
                liveCount: liveCount,
                aphoticCount: aphoticCount,
                flashingCount: flashingCount,
                alarmBurstCount: alarmBurstCount,
                phaseLockedCount: phaseLockedCount,
                sporadicFlashCount: sporadicFlashCount,
                darkQuiescentCount: darkQuiescentCount,
                meanBSI: Number(meanBSI.toFixed(1)),
                meanLuciferin: Number(meanLuciferin.toFixed(2)),
                meanLuminosity: Number(meanLuminosity.toFixed(3)),
                meanSyncPeers: Number(meanSyncPeers.toFixed(1)),
                bsiRegime: bsiRegime,
                bsiColor: bsiColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators in real-time.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valBiolumEl = document.getElementById("valBiolumIndex");
            const valStatusEl = document.getElementById("valBiolumStatus");

            if (valBiolumEl) {
                valBiolumEl.textContent = metrics.meanBSI.toFixed(1) + "% BSI (" + metrics.bsiRegime + ")";
                valBiolumEl.style.color = metrics.bsiColor;
            }

            if (valStatusEl) {
                valStatusEl.textContent = metrics.flashingCount + " FLASHING (" + metrics.phaseLockedCount + " PHASE-LOCKED | ALARMS: " + metrics.alarmBurstCount + ") | LUM: " + metrics.meanLuminosity.toFixed(2) + " | LUCIFERIN: " + metrics.meanLuciferin.toFixed(1);
                valStatusEl.style.color = metrics.flashingCount > 0 ? "#22d3ee" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 46 history curve in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.bioluminescentSynchronization) return;

            const chartVal = Number.isFinite(metrics.meanBSI) ? Math.max(0, Math.min(100, metrics.meanBSI)) : 0;
            historyData.bioluminescentSynchronization.shift();
            historyData.bioluminescentSynchronization.push(chartVal);
        }

        /**
         * Composite step executed per simulation frame.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @returns {Object} Calculated metrics.
         */
        static step(organisms, historyData) {
            const metrics = BioluminescentTelemetryManager.calculateMetrics(organisms);
            BioluminescentTelemetryManager.updateHUD(metrics);
            BioluminescentTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Sanitized badge HTML string.
         */
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.bsiColor : "#06b6d4";
            const val = metrics ? metrics.meanBSI.toFixed(1) : "0.0";
            return '<span class="bsi-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BSI</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = BioluminescentTelemetryManager;
    } else {
        global.BioluminescentTelemetryManager = BioluminescentTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
