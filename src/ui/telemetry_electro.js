// BioEcosystem - Bioelectric Energy (% BEI) & Magnetic Polarization Order (% MPO) Telemetry
// Module: src/ui/telemetry_electro.js
// Version: 6.48.0 (Hour 368 - Looks / UI Agent: 70th Channel % MPO & Polarized HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ElectroTelemetryManager
     * Telemetry tracking for bioelectric energy and geomagnetic polarization:
     * - Audits membrane action potential fluctuations, dipole field strength, and electroreceptors
     * - Drives Channel 69: Bioelectric Energy Index (% BEI) on Lotka-Volterra chart
     * - Drives Channel 70: Magnetic Polarization Order (% MPO) on Lotka-Volterra chart
     * - Categorizes bioelectric and magnetotactic dynamics into 4 physiological regime tiers
     * - Manages live laboratory HUD telemetry indicators, badges, and diagnostic history recording
     */
    class ElectroTelemetryManager {
        /**
         * Calculate bioelectric energy (% BEI) and magnetic polarization (% MPO) metrics.
         */
        static calculateMetrics(organisms, electroreceptionManager, tick) {
            let liveCount = 0;
            let electroSensorsCount = 0;
            let magnetCarriersCount = 0;
            let totalElectroPores = 0.0;
            let totalMembranePotential = 0.0;
            let totalDipoleField = 0.0;
            let totalMagnetAlignment = 0.0;
            let totalCrypsis = 0.0;
            let totalSpikes = 0;
            let totalBypasses = 0;
            let detectedInfaunalCount = 0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead) continue;
                    liveCount++;

                    const pores = org.electroreceptors || 0.0;
                    const potential = (typeof org.membranePotential === "number") ? org.membranePotential : -70.0;
                    const dipole = org.dipoleFieldStrength || 0.0;
                    const magnetAlign = org.biomagneticHeading || 0.0;
                    const magnetChain = org.magnetosomeChain || 0.0;
                    const crypsis = org.electrostaticCrypsis || 0.0;

                    if (pores > 0.5) {
                        electroSensorsCount++;
                        totalElectroPores += pores;
                    }
                    if (magnetChain > 0.10) {
                        magnetCarriersCount++;
                    }
                    if (org.magneticLockBypassTicks && org.magneticLockBypassTicks > 0) {
                        totalBypasses++;
                    }

                    totalMembranePotential += potential;
                    totalDipoleField += dipole;
                    totalMagnetAlignment += magnetAlign;
                    totalCrypsis += crypsis;

                    if (potential > -10.0 || (org.actionPotentialCooldown && org.actionPotentialCooldown > 35)) {
                        totalSpikes++;
                    }
                }
            }

            const managerMetrics = (electroreceptionManager && typeof electroreceptionManager.getMetrics === "function")
                ? electroreceptionManager.getMetrics()
                : null;

            if (managerMetrics) {
                detectedInfaunalCount = managerMetrics.infaunalPreyDetectedCount || 0;
            }

            const meanPores = electroSensorsCount > 0 ? (totalElectroPores / electroSensorsCount) : 0.0;
            const meanPotential = liveCount > 0 ? (totalMembranePotential / liveCount) : -70.0;
            const meanDipole = liveCount > 0 ? (totalDipoleField / liveCount) : 0.0;
            const meanMagnetAlign = liveCount > 0 ? (totalMagnetAlignment / liveCount) : 0.0;
            const meanCrypsis = liveCount > 0 ? (totalCrypsis / liveCount) : 0.0;
            const sensorPrevalence = liveCount > 0 ? (electroSensorsCount / liveCount) : 0.0;
            const magnetPrevalence = liveCount > 0 ? (magnetCarriersCount / liveCount) : 0.0;

            // % BEI 4-Factor Weighted Formulation:
            const dipoleFactor = Math.min(1.0, meanDipole * 2.2);
            const normalizedPotential = Math.min(1.0, Math.max(0.0, (meanPotential + 70.0) / 75.0));
            const spikeFactor = Math.min(1.0, (totalSpikes / Math.max(1, liveCount)) * 3.5 + normalizedPotential * 0.7);
            const sensorFactor = Math.min(1.0, sensorPrevalence * 1.5);
            const magnetFactor = Math.min(1.0, meanMagnetAlign * 1.4);

            const rawBEI = (dipoleFactor * 35.0) + (spikeFactor * 30.0) + (sensorFactor * 20.0) + (magnetFactor * 15.0);
            const meanBEI = Math.max(0.0, Math.min(100.0, rawBEI));

            // Determine 4-Tier BEI State Regime
            let beiRegime = "QUIESCENT RESTING POTENTIAL";
            let beiColor = "#94a3b8";
            if (meanBEI >= 65.0) {
                beiRegime = "HIGH-VOLTAGE IONIC DISCHARGE RESONANCE";
                beiColor = "#f59e0b";
            } else if (meanBEI >= 35.0) {
                beiRegime = "SYNCHRONIZED BIOELECTRIC DIPOLE OSCILLATION";
                beiColor = "#fbbf24";
            } else if (meanBEI >= 15.0) {
                beiRegime = "INCIPIENT MEMBRANE DEPOLARIZATION";
                beiColor = "#38bdf8";
            }

            // Channel 70: % MPO (Magnetic Polarization Order) Formulation:
            // 1. Mean Heading Alignment Order (50% max)
            const alignFactor = Math.min(1.0, meanMagnetAlign * 1.25);
            // 2. Magnetosome Equipped Population Prevalence (35% max)
            const carrierFactor = Math.min(1.0, magnetPrevalence * 1.35);
            // 3. Evasion Order Coherence (15% max, reduced when chaotic bypasses active)
            const bypassRate = magnetCarriersCount > 0 ? Math.min(1.0, totalBypasses / magnetCarriersCount) : 0.0;
            const coherenceFactor = 1.0 - bypassRate * 0.65;

            const rawMPO = (alignFactor * 50.0) + (carrierFactor * 35.0) + (coherenceFactor * 15.0);
            const meanMPO = Math.max(0.0, Math.min(100.0, rawMPO));

            // Determine 4-Tier MPO State Regime
            let mpoRegime = "ISOTROPIC DISORDERED DISPERSION";
            let mpoColor = "#94a3b8";
            if (meanMPO >= 75.0) {
                mpoRegime = "SYNCHRONIZED UNIAXIAL DIPOLE FLUX RESONANCE";
                mpoColor = "#9333ea";
            } else if (meanMPO >= 45.0) {
                mpoRegime = "COHERENT MAGNETOTACTIC SWARM POLARIZATION";
                mpoColor = "#a855f7";
            } else if (meanMPO >= 20.0) {
                mpoRegime = "INCIPIENT GEOMAGNETIC ALIGNMENT";
                mpoColor = "#c084fc";
            }

            return {
                liveCount: liveCount,
                electroSensorsCount: electroSensorsCount,
                magnetCarriersCount: magnetCarriersCount,
                sensorPrevalence: sensorPrevalence,
                magnetPrevalence: magnetPrevalence,
                meanPores: meanPores,
                meanPotential: meanPotential,
                meanDipole: meanDipole,
                meanMagnetAlign: meanMagnetAlign,
                meanCrypsis: meanCrypsis,
                totalSpikes: totalSpikes,
                totalBypasses: totalBypasses,
                detectedInfaunalCount: detectedInfaunalCount,
                meanBEI: meanBEI,
                beiRegime: beiRegime,
                beiColor: beiColor,
                meanMPO: meanMPO,
                mpoRegime: mpoRegime,
                mpoColor: mpoColor,
                tick: tick
            };
        }

        /**
         * Update laboratory HUD indicators for Channels 69 (% BEI) and 70 (% MPO).
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined" || !metrics) return;

            // Channel 69: % BEI
            const valBEIIndexEl = document.getElementById("valBEIIndex");
            if (valBEIIndexEl) {
                valBEIIndexEl.textContent = metrics.meanBEI.toFixed(1) + "% BEI (" + metrics.beiRegime + ")";
                valBEIIndexEl.style.color = metrics.beiColor;
            }

            const valBEIStatusEl = document.getElementById("valBEIStatus");
            if (valBEIStatusEl) {
                valBEIStatusEl.textContent =
                    "SENSORS: " + metrics.electroSensorsCount + "/" + metrics.liveCount +
                    " | POTENTIAL: " + metrics.meanPotential.toFixed(1) + " mV" +
                    " | DIPOLE: " + metrics.meanDipole.toFixed(2) +
                    " | SPIKES: " + metrics.totalSpikes +
                    " | CRYPSIS: " + (metrics.meanCrypsis * 100.0).toFixed(0) + "%" +
                    " | PREY HIT: " + metrics.detectedInfaunalCount;
                valBEIStatusEl.style.color = metrics.meanBEI >= 35.0 ? "#fbbf24" : "#bae6fd";
            }

            // Channel 70: % MPO
            const valMPOIndexEl = document.getElementById("valMPOIndex");
            if (valMPOIndexEl) {
                valMPOIndexEl.textContent = metrics.meanMPO.toFixed(1) + "% MPO (" + metrics.mpoRegime + ")";
                valMPOIndexEl.style.color = metrics.mpoColor;
            }

            const valMPOStatusEl = document.getElementById("valMPOStatus");
            if (valMPOStatusEl) {
                valMPOStatusEl.textContent =
                    "MAGNET CARRIERS: " + metrics.magnetCarriersCount + "/" + metrics.liveCount +
                    " | HEADING ORDER: " + (metrics.meanMagnetAlign * 100.0).toFixed(1) + "%" +
                    " | BYPASS EVASIONS: " + metrics.totalBypasses +
                    " | AXIS: 90 DEG N-S";
                valMPOStatusEl.style.color = metrics.meanMPO >= 45.0 ? "#c084fc" : "#e9d5ff";
            }
        }

        /**
         * Push new data points to Channel 69 and 70 curves in Lotka-Volterra history buffer.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.bioelectricEnergyIndex) {
                const chartBEI = Number.isFinite(metrics.meanBEI) ? Math.max(0, Math.min(100, metrics.meanBEI)) : 0;
                historyData.bioelectricEnergyIndex.shift();
                historyData.bioelectricEnergyIndex.push(chartBEI);
            }

            if (historyData.magneticPolarizationOrder) {
                const chartMPO = Number.isFinite(metrics.meanMPO) ? Math.max(0, Math.min(100, metrics.meanMPO)) : 0;
                historyData.magneticPolarizationOrder.shift();
                historyData.magneticPolarizationOrder.push(chartMPO);
            }
        }

        /**
         * Execute full per-tick telemetry cycle step for Channels 69 and 70.
         */
        static step(organisms, historyData, electroreceptionManager, tick) {
            const metrics = ElectroTelemetryManager.calculateMetrics(organisms, electroreceptionManager, tick);
            ElectroTelemetryManager.updateHUD(metrics);
            ElectroTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getBEIBadgeHTML(metrics) {
            const color = metrics ? metrics.beiColor : "#f59e0b";
            const val = metrics ? metrics.meanBEI.toFixed(1) : "0.0";
            return '<span class="bei-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BEI</span>';
        }

        static getMPOBadgeHTML(metrics) {
            const color = metrics ? metrics.mpoColor : "#a855f7";
            const val = metrics ? metrics.meanMPO.toFixed(1) : "0.0";
            return '<span class="mpo-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% MPO</span>';
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ElectroTelemetryManager;
    } else {
        global.ElectroTelemetryManager = ElectroTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
