// BioEcosystem - Diel Vertical Migration & Bathymetric Hydrostatic Telemetry (Channel 47)
// Module: src/ui/telemetry_diel_migration.js
// Version: 5.34.0 (Hour 254 - UI Agent: 47th Channel Diel Vertical Migration Index % VMI)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * DielMigrationTelemetryManager
     * Tracks dish-wide vertical water column distribution, circadian diel photoperiod adherence,
     * gas vacuole inflation volume, lipid ballast storage, and mesopelagic refuge utilization.
     */
    class DielMigrationTelemetryManager {
        /**
         * Calculate vertical migration metrics, bathymetric demographics, and VMI index.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} dielPhase - Normalized circadian phase [0.0 - 1.0].
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, dielPhase) {
            let liveCount = 0;
            let epipelagicCount = 0;   // y <= 200px (surface photic zone)
            let mesopelagicCount = 0;  // 200px < y <= 440px (twilight refuge zone)
            let bathypelagicCount = 0; // y > 440px (aphotic benthic zone)

            let ascendingCount = 0;
            let descendingCount = 0;
            let refugeCount = 0;
            let surfaceGrazingCount = 0;

            let totalGasVolume = 0.0;
            let totalLipidReserves = 0.0;
            let totalBuoyancyForce = 0.0;

            const phase = typeof dielPhase === "number" ? dielPhase : 0.0;
            const isDaytime = (phase >= 0.22 && phase <= 0.78);
            let concordantCount = 0; // Organisms in the biologically optimal depth for current circadian phase

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const o = organisms[i];
                    if (!o.alive) continue;
                    liveCount++;

                    const y = typeof o.y === "number" ? o.y : 300.0;
                    const gas = typeof o.gasVolume === "number" ? o.gasVolume : 0.0;
                    const lipid = typeof o.lipidReserves === "number" ? o.lipidReserves : 0.0;
                    const bForce = typeof o.currentBuoyancyForce === "number" ? o.currentBuoyancyForce : 0.0;
                    const isUp = Boolean(o.isMigratingUp);
                    const isDown = Boolean(o.isMigratingDown);
                    const isRefuge = Boolean(o.dvmRefugeActive);
                    const isGrazing = Boolean(o.dvmFeedingBonus > 0.05);

                    totalGasVolume += gas;
                    totalLipidReserves += lipid;
                    totalBuoyancyForce += bForce;

                    if (y <= 200.0) {
                        epipelagicCount++;
                        if (!isDaytime) concordantCount++; // Optimal surface night feeding
                    } else if (y <= 440.0) {
                        mesopelagicCount++;
                        if (isDaytime) concordantCount++; // Optimal daytime mesopelagic refuge
                    } else {
                        bathypelagicCount++;
                    }

                    if (isUp) ascendingCount++;
                    if (isDown) descendingCount++;
                    if (isRefuge) refugeCount++;
                    if (isGrazing) surfaceGrazingCount++;
                }
            }

            // Population arithmetic means
            const meanGas = liveCount > 0 ? (totalGasVolume / liveCount) : 0.0;
            const meanLipid = liveCount > 0 ? (totalLipidReserves / liveCount) : 0.0;
            const meanBuoyancy = liveCount > 0 ? (totalBuoyancyForce / liveCount) : 0.0;
            const targetTotal = Math.max(1, liveCount);

            // 47th Channel: Diel Vertical Migration Index (% VMI)
            // Composite metric: weighted combination of circadian depth concordance, active vertical momentum, and vacuole regulation
            const concordanceRatio = (concordantCount / targetTotal) * 50.0;
            const momentumRatio = Math.min(30.0, ((ascendingCount + descendingCount) / targetTotal) * 45.0);
            const regulationRatio = Math.min(20.0, ((totalGasVolume + totalLipidReserves) / (targetTotal * 12.0)) * 20.0);
            const rawVMI = liveCount > 0 ? (concordanceRatio + momentumRatio + regulationRatio) : 0.0;
            const meanVMI = Number.isFinite(rawVMI) ? Math.max(0.0, Math.min(100.0, rawVMI)) : 0.0;

            // Qualitative vertical migration regime categorization
            let vmiRegime = "DECOUPLED PELAGIC DRIFT";
            let vmiColor = "#475569";

            if (meanVMI >= 70.0) {
                vmiRegime = "SYNCHRONIZED DIEL CASCADE";
                vmiColor = "#38bdf8";
            } else if (meanVMI >= 45.0) {
                vmiRegime = "ACTIVE VERTICAL SHIFT";
                vmiColor = "#0284c7";
            } else if (meanVMI >= 20.0) {
                vmiRegime = "PARTIAL BATHYMETRIC DRIFT";
                vmiColor = "#0369a1";
            } else if (meanVMI > 0.0 || (ascendingCount + descendingCount) > 0) {
                vmiRegime = "STATIC RESIDENCE";
                vmiColor = "#64748b";
            }

            return {
                liveCount: liveCount,
                epipelagicCount: epipelagicCount,
                mesopelagicCount: mesopelagicCount,
                bathypelagicCount: bathypelagicCount,
                ascendingCount: ascendingCount,
                descendingCount: descendingCount,
                refugeCount: refugeCount,
                surfaceGrazingCount: surfaceGrazingCount,
                meanVMI: Number(meanVMI.toFixed(1)),
                meanGas: Number(meanGas.toFixed(2)),
                meanLipid: Number(meanLipid.toFixed(2)),
                meanBuoyancy: Number(meanBuoyancy.toFixed(3)),
                isDaytime: isDaytime,
                vmiRegime: vmiRegime,
                vmiColor: vmiColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators in real-time.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valDVMEl = document.getElementById("valDVMIndex");
            const valStatusEl = document.getElementById("valDVMStatus");

            if (valDVMEl) {
                valDVMEl.textContent = metrics.meanVMI.toFixed(1) + "% VMI (" + metrics.vmiRegime + ")";
                valDVMEl.style.color = metrics.vmiColor;
            }

            if (valStatusEl) {
                valStatusEl.textContent = "UP:" + metrics.ascendingCount + " | DOWN:" + metrics.descendingCount + " | GAS:" + metrics.meanGas.toFixed(1) + " | LIPID:" + metrics.meanLipid.toFixed(1) + " | REFUGE:" + metrics.refugeCount + " | EPI:" + metrics.epipelagicCount + " MESO:" + metrics.mesopelagicCount;
                valStatusEl.style.color = (metrics.ascendingCount + metrics.descendingCount) > 0 ? "#7dd3fc" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 47 history curve in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData || !historyData.dielVerticalMigration) return;

            const chartVal = Number.isFinite(metrics.meanVMI) ? Math.max(0, Math.min(100, metrics.meanVMI)) : 0;
            historyData.dielVerticalMigration.shift();
            historyData.dielVerticalMigration.push(chartVal);
        }

        /**
         * Composite step executed per simulation frame.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {number} dielPhase - Normalized circadian phase [0.0 - 1.0].
         * @returns {Object} Calculated metrics.
         */
        static step(organisms, historyData, dielPhase) {
            const metrics = DielMigrationTelemetryManager.calculateMetrics(organisms, dielPhase);
            DielMigrationTelemetryManager.updateHUD(metrics);
            DielMigrationTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         * @param {Object} metrics - Calculated telemetry metrics.
         * @returns {string} Sanitized badge HTML string.
         */
        static getBadgeHTML(metrics) {
            const color = metrics ? metrics.vmiColor : "#38bdf8";
            const val = metrics ? metrics.meanVMI.toFixed(1) : "0.0";
            return '<span class="vmi-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% VMI</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = DielMigrationTelemetryManager;
    } else {
        global.DielMigrationTelemetryManager = DielMigrationTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
