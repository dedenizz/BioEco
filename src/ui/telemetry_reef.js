// BioEcosystem - Biogenic Coral Reef Ecosystem & Bleaching Telemetry (Channels 53 & 54)
// Module: src/ui/telemetry_reef.js
// Version: 5.69.0 (Hour 289 - Looks / UI Agent: 54th Channel % BVI & Bleaching HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ReefTelemetryManager
     * High-precision dual-channel telemetry tracking for biogenic coral reefs:
     * - Audits population-wide CaCO3 mineralization, aragonite matrix accumulation, and polyp budding
     * - Drives Channel 53: Reef Calcification Index (% RCI) on Lotka-Volterra multi-channel chart
     * - Drives Channel 54: Bleaching Vulnerability Index (% BVI) tracking thermal bleaching crises
     * - Tracks protective organic mucus barrier deployment, zooxanthellae expulsion, and skeleton dissolution
     * - Manages live HUD indicators, sessile polyp anchoring demographics, and bleaching recovery kinetics
     */
    class ReefTelemetryManager {
        /**
         * Calculate population calcification and bleaching vulnerability metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {Array<Object>} reefNodes - Active benthic bioherm reef structures.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive telemetry metrics.
         */
        static calculateMetrics(organisms, reefNodes, tick) {
            let liveCount = 0;
            let anchoredPolypCount = 0;
            let shelteredOrganismCount = 0;
            let calcifyingOrganismCount = 0;
            let symbiontActiveCount = 0;
            let bleachedOrganismCount = 0;
            let thermalStressedCount = 0;
            let dissolvingCount = 0;
            let recoveringCount = 0;

            let totalCalcifiedMass = 0.0;
            let totalAragoniteScore = 0.0;
            let totalSymbiontYield = 0.0;
            let totalShelterFactor = 0.0;
            let totalBleachingScore = 0.0;
            let totalMucusSheath = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const cMass = typeof org.calcifiedMass === "number" ? org.calcifiedMass : 0.0;
                    const aScore = typeof org.aragoniteMatrixScore === "number" ? org.aragoniteMatrixScore : 0.0;
                    const sYield = typeof org.symbiontEnergyYield === "number" ? org.symbiontEnergyYield : 0.0;
                    const sFactor = typeof org.reefShelterFactor === "number" ? org.reefShelterFactor : 0.0;
                    const bScore = typeof org.bleachingScore === "number" ? org.bleachingScore : 0.0;
                    const mSheath = typeof org.mucusSheathFactor === "number" ? org.mucusSheathFactor : 0.0;
                    const temp = typeof org.thermalExposure === "number" ? org.thermalExposure : 2.0;
                    const strain = typeof org.thermalStrain === "number" ? org.thermalStrain : 0.0;
                    const isAnchored = Boolean(org.isReefAnchored);

                    totalCalcifiedMass += cMass;
                    totalAragoniteScore += aScore;
                    totalSymbiontYield += sYield;
                    totalShelterFactor += sFactor;
                    totalBleachingScore += bScore;
                    totalMucusSheath += mSheath;

                    if (isAnchored) anchoredPolypCount++;
                    if (sFactor > 0.05) shelteredOrganismCount++;
                    if (cMass > 2.0 || aScore > 0.10) calcifyingOrganismCount++;
                    if (sYield > 0.01) symbiontActiveCount++;
                    if (bScore > 0.15) bleachedOrganismCount++;
                    if (temp > 28.5 || strain > 0.05) thermalStressedCount++;
                    if (bScore > 0.40) dissolvingCount++;
                    if (bScore > 0.05 && temp <= 27.5 && strain <= 0.02) recoveringCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const meanCalcifiedMass = totalCalcifiedMass / targetTotal;
            const meanAragoniteScore = totalAragoniteScore / targetTotal;
            const meanSymbiontYield = totalSymbiontYield / targetTotal;
            const meanShelterFactor = totalShelterFactor / targetTotal;
            const meanBleachingScore = totalBleachingScore / targetTotal;
            const meanMucusSheath = totalMucusSheath / targetTotal;

            // Benthic Bioherm Substrate Accretion Metrics
            let totalBiohermMass = 0.0;
            let totalPolypAttached = 0.0;
            let activeReefCount = 0;

            if (reefNodes && Array.isArray(reefNodes)) {
                for (let r = 0; r < reefNodes.length; r++) {
                    const node = reefNodes[r];
                    if (node) {
                        totalBiohermMass += (node.aragoniteMass || 0.0);
                        totalPolypAttached += (node.polypCount || 0);
                        activeReefCount++;
                    }
                }
            }

            // 53rd Channel: Reef Calcification Index (% RCI)
            const accretionWeight = Math.min(35.0, (meanCalcifiedMass / 25.0) * 20.0 + meanAragoniteScore * 15.0);
            const polypRatio = ((anchoredPolypCount * 2.0 + calcifyingOrganismCount) / targetTotal);
            const polypWeight = Math.min(35.0, polypRatio * 35.0);
            const symRatio = (meanSymbiontYield / 0.15) * 15.0;
            const shelterRatio = (shelteredOrganismCount / targetTotal) * 15.0;
            const symbiosisWeight = Math.min(30.0, symRatio + shelterRatio);

            const rawRCI = liveCount > 0 ? (accretionWeight + polypWeight + symbiosisWeight) : 0.0;
            const meanRCI = Number.isFinite(rawRCI) ? Math.max(0.0, Math.min(100.0, rawRCI)) : 0.0;

            let rciRegime = "DORMANT PELAGIC SUSPENSION", rciColor = "#64748b";
            if (meanRCI >= 75.0) { rciRegime = "MONUMENTAL BIOGENIC REEF CREST"; rciColor = "#10b981"; }
            else if (meanRCI >= 50.0) { rciRegime = "ACCRETING CORALLINE BIOHERM"; rciColor = "#34d399"; }
            else if (meanRCI >= 25.0) { rciRegime = "INCIPIENT ARAGONITE CRUST"; rciColor = "#2dd4bf"; }

            // 54th Channel: Bleaching Vulnerability Index (% BVI)
            // 1. Mean Population Bleaching Severity (40% max)
            const bleachWeight = Math.min(40.0, meanBleachingScore * 40.0);
            // 2. Thermal Stress Surge vs Mucus Barrier Shield Deficit (35% max)
            const stressDeficit = Math.max(0.0, (thermalStressedCount / targetTotal) - meanMucusSheath * 0.50);
            const stressDeficitWeight = Math.min(35.0, stressDeficit * 35.0);
            // 3. Aragonite Dissolution & Calcification Depression Risk (25% max)
            const dissolutionWeight = Math.min(25.0, ((dissolvingCount * 2.0 + bleachedOrganismCount) / targetTotal) * 25.0);

            const rawBVI = liveCount > 0 ? (bleachWeight + stressDeficitWeight + dissolutionWeight) : 0.0;
            const meanBVI = Number.isFinite(rawBVI) ? Math.max(0.0, Math.min(100.0, rawBVI)) : 0.0;

            let bviRegime = "HOMEOSTATIC REEF EQUILIBRIUM", bviColor = "#10b981";
            if (meanBVI >= 70.0) { bviRegime = "ACUTE THERMAL BLEACHING CRISIS"; bviColor = "#ef4444"; }
            else if (meanBVI >= 45.0) { bviRegime = "ELEVATED SYMBIOTIC STRESS"; bviColor = "#f59e0b"; }
            else if (meanBVI >= 20.0) { bviRegime = "THERMAL SURGE VULNERABILITY"; bviColor = "#38bdf8"; }

            return {
                liveCount, anchoredPolypCount, shelteredOrganismCount, calcifyingOrganismCount,
                symbiontActiveCount, bleachedOrganismCount, thermalStressedCount, dissolvingCount, recoveringCount,
                meanRCI: Number(meanRCI.toFixed(1)), meanBVI: Number(meanBVI.toFixed(1)),
                meanCalcifiedMass: Number(meanCalcifiedMass.toFixed(2)),
                meanAragoniteScore: Number(meanAragoniteScore.toFixed(3)),
                meanSymbiontYield: Number(meanSymbiontYield.toFixed(3)),
                meanShelterFactor: Number(meanShelterFactor.toFixed(3)),
                meanBleachingScore: Number(meanBleachingScore.toFixed(3)),
                meanMucusSheath: Number(meanMucusSheath.toFixed(3)),
                totalBiohermMass: Number(totalBiohermMass.toFixed(1)),
                totalPolypAttached, activeReefCount, rciRegime, rciColor, bviRegime, bviColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for Channels 53 and 54.
         * @param {Object} metrics - Calculated telemetry metrics for current frame.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            // Channel 53 HUD
            const valRCIIndexEl = document.getElementById("valRCIIndex");
            const valRCIStatusEl = document.getElementById("valRCIStatus");
            if (valRCIIndexEl) {
                valRCIIndexEl.textContent = metrics.meanRCI.toFixed(1) + "% RCI (" + metrics.rciRegime + ")";
                valRCIIndexEl.style.color = metrics.rciColor;
            }
            if (valRCIStatusEl) {
                valRCIStatusEl.textContent = "POLYPS: " + metrics.anchoredPolypCount +
                    " | SHELTERED: " + metrics.shelteredOrganismCount +
                    " | MASS: " + metrics.meanCalcifiedMass.toFixed(1) + " CaCO3" +
                    " | REEF BIOHERM: " + Math.round(metrics.totalBiohermMass) + " kg" +
                    " | SYM: +" + metrics.meanSymbiontYield.toFixed(2) + " ATP";
                valRCIStatusEl.style.color = metrics.anchoredPolypCount > 0 ? "#6ee7b7" : "#94a3b8";
            }

            // Channel 54 HUD (54th Channel Bleaching Vulnerability Index % BVI)
            const valBVIIndexEl = document.getElementById("valBVIIndex");
            const valBVIStatusEl = document.getElementById("valBVIStatus");
            if (valBVIIndexEl) {
                valBVIIndexEl.textContent = metrics.meanBVI.toFixed(1) + "% BVI (" + metrics.bviRegime + ")";
                valBVIIndexEl.style.color = metrics.bviColor;
            }
            if (valBVIStatusEl) {
                valBVIStatusEl.textContent = "BLEACHED: " + metrics.bleachedOrganismCount +
                    " | MUCUS SHIELD: " + Math.round(metrics.meanMucusSheath * 100) + "%" +
                    " | DISSOLVING: " + metrics.dissolvingCount +
                    " | RECOVERY: " + metrics.recoveringCount +
                    " | SURGE: " + metrics.thermalStressedCount;
                valBVIStatusEl.style.color = metrics.meanBVI > 30.0 ? "#fda4af" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 53 and Channel 54 history curves in population chart.
         * @param {Object} historyData - Multi-channel simulation history buffer.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.reefCalcification) {
                const chartRCI = Number.isFinite(metrics.meanRCI) ? Math.max(0, Math.min(100, metrics.meanRCI)) : 0;
                historyData.reefCalcification.shift();
                historyData.reefCalcification.push(chartRCI);
            }

            if (historyData.bleachingVulnerability) {
                const chartBVI = Number.isFinite(metrics.meanBVI) ? Math.max(0, Math.min(100, metrics.meanBVI)) : 0;
                historyData.bleachingVulnerability.shift();
                historyData.bleachingVulnerability.push(chartBVI);
            }
        }

        /**
         * Execute full telemetry cycle step for biogenic coral reef ecosystem.
         */
        static step(organisms, historyData, reefNodes, tick) {
            const metrics = ReefTelemetryManager.calculateMetrics(organisms, reefNodes, tick);
            ReefTelemetryManager.updateHUD(metrics);
            ReefTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        /**
         * Retrieve current telemetry badge HTML for dynamic inspector rendering.
         */
        static getBadgeHTML(metrics) {
            const rciColor = metrics ? metrics.rciColor : "#10b981";
            const bviColor = metrics ? metrics.bviColor : "#f43f5e";
            const rciVal = metrics ? metrics.meanRCI.toFixed(1) : "0.0";
            const bviVal = metrics ? metrics.meanBVI.toFixed(1) : "0.0";
            return '<span class="rci-badge" style="color:' + rciColor + '; border-color:' + rciColor + ';">' + rciVal + '% RCI</span> ' +
                   '<span class="bvi-badge" style="color:' + bviColor + '; border-color:' + bviColor + ';">' + bviVal + '% BVI</span>';
        }

        /**
         * Format diagnostic log string for automated QA test suites and headless benchmarks.
         */
        static formatDiagnostics(metrics) {
            if (!metrics) return "RCI: 0.0% | BVI: 0.0% (NO DATA)";
            return "RCI: " + metrics.meanRCI + "% [" + metrics.rciRegime + "] | BVI: " + metrics.meanBVI + "% [" + metrics.bviRegime + "] | Bleached: " + metrics.bleachedOrganismCount + "/" + metrics.liveCount + " | Mucus: " + Math.round(metrics.meanMucusSheath * 100) + "%";
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ReefTelemetryManager;
    } else {
        global.ReefTelemetryManager = ReefTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
