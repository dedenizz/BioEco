// BioEcosystem - Ventral Counter-Illumination & Twilight Telemetry Manager (Channel 48)
// Module: src/ui/telemetry_counter_illumination.js
// Version: 5.39.0 (Hour 259 - UI Agent: 48th Channel Ventral Counter-Illumination Index % CII)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CounterIlluminationTelemetryManager
     * High-precision telemetry tracking for mesopelagic counter-illumination camouflage:
     * - Audits dish-wide downwelling solar irradiance vs ventral photophore flux matching
     * - Quantifies population silhouette concealment scores and upward ambush deterrence
     * - Drives the 48th Telemetry Channel: Ventral Counter-Illumination Index (% CII)
     * - Manages live HUD indicators, twilight crypsis regimes, and demographic metrics
     */
    class CounterIlluminationTelemetryManager {
        /**
         * Calculate population counter-illumination metrics, error distributions, and CII index.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} dielPhase - Normalized circadian phase [0.0 - 1.0].
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, dielPhase) {
            let liveCount = 0;
            let mesopelagicCount = 0;   // 240px <= y <= 440px (twilight silhouette danger zone)
            let epipelagicCount = 0;    // y < 240px (surface photic zone)
            let abyssalCount = 0;       // y > 440px (aphotic benthic zone)

            let activeEmitterCount = 0; // Organisms actively emitting ventral photons
            let concealedCount = 0;     // Organisms with concealment score >= 0.50
            let perfectCloakCount = 0;  // Organisms with concealment score >= 0.75

            let totalConcealment = 0.0;
            let totalMismatch = 0.0;
            let totalVentralLum = 0.0;
            let totalDorsalIrr = 0.0;

            const mesopelagicMin = 240.0;
            const mesopelagicMax = 440.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const y = typeof o.y === "number" ? o.y : 300.0;
                    const concealment = typeof o.silhouetteConcealmentScore === "number" ? o.silhouetteConcealmentScore : 0.0;
                    const mismatch = typeof o.mismatchError === "number" ? o.mismatchError : 0.0;
                    const ventralLum = typeof o.ventralLuminosity === "number" ? o.ventralLuminosity : 0.0;
                    const dorsalIrr = typeof o.dorsalIrradiance === "number" ? o.dorsalIrradiance : 0.0;
                    const isActive = Boolean(o.counterIlluminationActive || ventralLum > 0.02);

                    totalConcealment += concealment;
                    totalMismatch += mismatch;
                    totalVentralLum += ventralLum;
                    totalDorsalIrr += dorsalIrr;

                    if (y >= mesopelagicMin && y <= mesopelagicMax) {
                        mesopelagicCount++;
                    } else if (y < mesopelagicMin) {
                        epipelagicCount++;
                    } else {
                        abyssalCount++;
                    }

                    if (isActive) activeEmitterCount++;
                    if (concealment >= 0.50) concealedCount++;
                    if (concealment >= 0.75) perfectCloakCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanConcealment = totalConcealment / targetTotal;
            const meanMismatch = totalMismatch / targetTotal;
            const meanVentralLum = totalVentralLum / targetTotal;
            const meanDorsalIrr = totalDorsalIrr / targetTotal;

            // 48th Channel: Ventral Counter-Illumination Index (% CII)
            // Weighted synthesis:
            // 1. Mean population concealment score (50% max)
            // 2. Mesopelagic twilight refuge concealment ratio (30% max)
            // 3. Photometric accuracy calibration (20% max)
            const concealmentWeight = meanConcealment * 50.0;
            const mesoTarget = Math.max(1, mesopelagicCount);
            const twilightProtectionWeight = Math.min(30.0, (concealedCount / mesoTarget) * 30.0);
            const accuracyWeight = Math.max(0.0, 1.0 - (meanMismatch * 2.8)) * 20.0;

            const rawCII = liveCount > 0 ? (concealmentWeight + twilightProtectionWeight + accuracyWeight) : 0.0;
            const meanCII = Number.isFinite(rawCII) ? Math.max(0.0, Math.min(100.0, rawCII)) : 0.0;

            // Qualitative counter-illumination crypsis regime classification
            let ciiRegime = "EXPOSED DARK SILHOUETTES";
            let ciiColor = "#64748b";

            if (meanCII >= 70.0) {
                ciiRegime = "OPTICAL INVISIBILITY CLOAK";
                ciiColor = "#22d3ee";
            } else if (meanCII >= 45.0) {
                ciiRegime = "COUNTER-ILLUMINATED CRYPSIS";
                ciiColor = "#38bdf8";
            } else if (meanCII >= 20.0) {
                ciiRegime = "PARTIAL SILHOUETTE MATCH";
                ciiColor = "#0284c7";
            }

            return {
                liveCount: liveCount,
                mesopelagicCount: mesopelagicCount,
                epipelagicCount: epipelagicCount,
                abyssalCount: abyssalCount,
                activeEmitterCount: activeEmitterCount,
                concealedCount: concealedCount,
                perfectCloakCount: perfectCloakCount,
                meanCII: Number(meanCII.toFixed(1)),
                meanConcealment: Number(meanConcealment.toFixed(3)),
                meanMismatch: Number(meanMismatch.toFixed(3)),
                meanVentralLum: Number(meanVentralLum.toFixed(3)),
                meanDorsalIrr: Number(meanDorsalIrr.toFixed(3)),
                ciiRegime: ciiRegime,
                ciiColor: ciiColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators in real-time.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valIndexEl = document.getElementById("valCounterIllumIndex");
            const valStatusEl = document.getElementById("valCounterIllumStatus");

            if (valIndexEl) {
                valIndexEl.textContent = metrics.meanCII.toFixed(1) + "% CII (" + metrics.ciiRegime + ")";
                valIndexEl.style.color = metrics.ciiColor;
            }

            if (valStatusEl) {
                valStatusEl.textContent = "CONCEALED: " + metrics.concealedCount + " | ACTIVE: " + metrics.activeEmitterCount + " | MESO: " + metrics.mesopelagicCount + " | LUM: " + metrics.meanVentralLum.toFixed(2) + " | ERR: " + metrics.meanMismatch.toFixed(2);
                valStatusEl.style.color = metrics.concealedCount > 0 ? "#7dd3fc" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 48 history curve in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.counterIllumination) return;

            const chartVal = Number.isFinite(metrics.meanCII) ? Math.max(0, Math.min(100, metrics.meanCII)) : 0;
            historyData.counterIllumination.shift();
            historyData.counterIllumination.push(chartVal);
        }

        /**
         * Composite step executed per simulation frame.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {number} dielPhase - Normalized circadian phase [0.0 - 1.0].
         * @returns {Object} Calculated metrics.
         */
        static step(organisms, historyData, dielPhase) {
            const metrics = CounterIlluminationTelemetryManager.calculateMetrics(organisms, dielPhase);
            CounterIlluminationTelemetryManager.updateHUD(metrics);
            CounterIlluminationTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Sanitized badge HTML string.
         */
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.ciiColor : "#22d3ee";
            const val = metrics ? metrics.meanCII.toFixed(1) : "0.0";
            return '<span class="cii-counter-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% CII</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Single-line diagnostic string.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "CII: 0.0% (NO DATA)";
            return `CII: ${metrics.meanCII}% [${metrics.ciiRegime}] | Concealed: ${metrics.concealedCount}/${metrics.mesopelagicCount} | MeanLum: ${metrics.meanVentralLum}`;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CounterIlluminationTelemetryManager;
    } else {
        global.CounterIlluminationTelemetryManager = CounterIlluminationTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
