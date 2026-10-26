// BioEcosystem - Coevolution & Biotic Red-Queen Telemetry (57th % CAI & 58th % BRI)
// Module: src/ui/telemetry_coevolution.js
// Version: 5.88.0 (Hour 308 - Looks/UI Agent: 58th Telemetry Channel % BRI & Community HUD)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CoevolutionTelemetryManager
     * High-precision telemetry tracking for inter-species coevolution & Red Queen dynamics:
     * - Audits dish-wide mutualism partnerships, cleaning stations, and ectoparasite load
     * - Drives Channel 57: Coevolutionary Adaptation Index (% CAI)
     * - Drives Channel 58: Biotic Red-Queen Index (% BRI) on Lotka-Volterra chart
     * - Manages live HUD indicators, dual-channel chart recording, and diagnostic logging
     */
    class CoevolutionTelemetryManager {
        /**
         * Calculate population coevolution, mutualism, and Red Queen metrics.
         * @param {Array<Object>} organisms - Live simulation population.
         * @param {number} tick - Current simulation frame count.
         * @returns {Object} Comprehensive coevolution and Red Queen telemetry metrics.
         */
        static calculateMetrics(organisms, tick) {
            let liveCount = 0;
            let coevolutionActiveCount = 0;
            let mutualistCount = 0;
            let cleaningCount = 0;
            let highSynergyCount = 0;
            let cleaningStationCount = 0;
            let solicitingHostCount = 0;
            let shieldedPreyCount = 0;
            let predatorCount = 0;

            let totalSynergy = 0.0;
            let totalCleanerGain = 0.0;
            let totalRedQueenPressure = 0.0;
            let totalHeterozygosity = 0.0;
            let totalChitinase = 0.0;
            let totalParasiteLoad = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || !org.alive) continue;
                    liveCount++;

                    const isCoev = Boolean(org.coevolutionActive || org.coevolutionSystem);
                    const syn = typeof org.mutualismSynergy === "number" ? org.mutualismSynergy : 0.0;
                    const isCleaning = Boolean(org.cleaningSymbiosisActive);
                    const cGain = typeof org.cleanerMutualismGain === "number" ? org.cleanerMutualismGain : 0.0;
                    const rqp = typeof org.redQueenPressure === "number" ? org.redQueenPressure : 0.15;
                    const het = typeof org.heterozygosityScore === "number" ? org.heterozygosityScore : 0.50;
                    const chit = typeof org.chitinaseBiteModifier === "number" ? org.chitinaseBiteModifier : 1.0;
                    const para = typeof org.ectoparasiteLoad === "number" ? org.ectoparasiteLoad : 0.0;

                    totalSynergy += syn;
                    totalCleanerGain += cGain;
                    totalRedQueenPressure += rqp;
                    totalHeterozygosity += het;
                    totalParasiteLoad += para;

                    if (org.dna && org.dna.diet === 2) {
                        predatorCount++;
                        totalChitinase += chit;
                    }
                    if (org.toolUseEquipped && (org.shieldDurability || 0) > 0) {
                        shieldedPreyCount++;
                    }
                    if (org.isCleaningStation) cleaningStationCount++;
                    if (org.solicitationPoseActive) solicitingHostCount++;
                    if (isCoev) coevolutionActiveCount++;
                    if (org.mutualismPartnerId && syn > 0.15) mutualistCount++;
                    if (isCleaning) cleaningCount++;
                    if (syn > 0.38) highSynergyCount++;
                }
            }

            const targetTotal = Math.max(1, liveCount);
            const predTotal = Math.max(1, predatorCount);
            const meanSynergy = totalSynergy / targetTotal;
            const meanCleanerGain = totalCleanerGain / targetTotal;
            const meanArmsRace = totalRedQueenPressure / targetTotal;
            const meanHeterozygosity = totalHeterozygosity / targetTotal;
            const meanParasiteLoad = totalParasiteLoad / targetTotal;
            const meanChitinase = totalChitinase / predTotal;

            // 57th Channel: Coevolutionary Adaptation Index (% CAI)
            const mutualismWeight = Math.min(40.0, (((mutualistCount * 1.5 + cleaningCount * 2.5) / targetTotal) * 35.0) + (meanSynergy * 25.0));
            const resistanceWeight = Math.min(35.0, ((highSynergyCount / targetTotal) * 45.0) + (meanCleanerGain * 45.0));
            const diversityWeight = Math.min(25.0, meanHeterozygosity * 25.0);
            const rawCAI = liveCount > 0 ? (mutualismWeight + resistanceWeight + diversityWeight) : 0.0;
            const meanCAI = Number.isFinite(rawCAI) ? Math.max(0.0, Math.min(100.0, rawCAI)) : 0.0;

            let caiRegime = "SOLITARY ASYNCHRONOUS DRIFT";
            let caiColor = "#64748b";
            if (meanCAI >= 75.0) {
                caiRegime = "PAN-BIOSPHERE COEVOLUTIONARY EQUILIBRIUM";
                caiColor = "#10b981";
            } else if (meanCAI >= 50.0) {
                caiRegime = "ACTIVE INTERSPECIFIC MUTUALISM NETWORK";
                caiColor = "#34d399";
            } else if (meanCAI >= 25.0) {
                caiRegime = "INCIPIENT SYMBIOTIC CLEANING CLUSTERS";
                caiColor = "#38bdf8";
            }

            // 58th Channel: Biotic Red-Queen Index (% BRI)
            // 1. Counter-Adaptation Pressure: Predator Chitinase vs Shielded Prey (40% max)
            const armsRaceRatio = Math.min(40.0, ((meanChitinase - 1.0) * 20.0) + ((shieldedPreyCount / targetTotal) * 30.0) + (meanArmsRace * 20.0));
            // 2. Parasitoid Strain & Cleaning Station Coverage (35% max)
            const stationTurnover = Math.min(35.0, (meanParasiteLoad * 45.0) + ((cleaningStationCount * 4.0 + solicitingHostCount * 2.5) / targetTotal * 40.0));
            // 3. Genomic Polymorphism & Red Queen Escapement (25% max)
            const redQueenHetero = Math.min(25.0, meanHeterozygosity * 25.0);

            const rawBRI = liveCount > 0 ? (armsRaceRatio + stationTurnover + redQueenHetero) : 0.0;
            const meanBRI = Number.isFinite(rawBRI) ? Math.max(0.0, Math.min(100.0, rawBRI)) : 0.0;

            let briRegime = "HOMOGENEOUS LOW SELECTION DRIFT";
            let briColor = "#64748b";
            if (meanBRI >= 75.0) {
                briRegime = "RED-QUEEN COEVOLUTIONARY EQUILIBRIUM";
                briColor = "#e11d48";
            } else if (meanBRI >= 50.0) {
                briRegime = "ACTIVE BIOTIC ARMS RACE";
                briColor = "#f59e0b";
            } else if (meanBRI >= 25.0) {
                briRegime = "INCIPIENT COUNTER-ADAPTATION FRICTION";
                briColor = "#38bdf8";
            }

            return {
                liveCount,
                coevolutionActiveCount,
                mutualistCount,
                cleaningCount,
                highSynergyCount,
                cleaningStationCount,
                solicitingHostCount,
                shieldedPreyCount,
                predatorCount,
                meanCAI: Number(meanCAI.toFixed(1)),
                meanBRI: Number(meanBRI.toFixed(1)),
                meanSynergy: Number(meanSynergy.toFixed(3)),
                meanCleanerGain: Number(meanCleanerGain.toFixed(2)),
                meanArmsRace: Number(meanArmsRace.toFixed(3)),
                meanHeterozygosity: Number(meanHeterozygosity.toFixed(3)),
                meanParasiteLoad: Number(meanParasiteLoad.toFixed(3)),
                meanChitinase: Number(meanChitinase.toFixed(2)),
                caiRegime,
                caiColor,
                briRegime,
                briColor
            };
        }

        /**
         * Update laboratory HUD telemetry indicators for 57th (% CAI) and 58th (% BRI) Channels.
         */
        static updateHUD(metrics) {
            if (typeof document === "undefined") return;

            const valCAIIndexEl = document.getElementById("valCAIIndex");
            const valCAIStatusEl = document.getElementById("valCAIStatus");
            const valBRIIndexEl = document.getElementById("valBRIIndex");
            const valBRIStatusEl = document.getElementById("valBRIStatus");

            if (valCAIIndexEl) {
                valCAIIndexEl.textContent = metrics.meanCAI.toFixed(1) + "% CAI (" + metrics.caiRegime + ")";
                valCAIIndexEl.style.color = metrics.caiColor;
            }
            if (valCAIStatusEl) {
                valCAIStatusEl.textContent = "MUTUALISTS: " + metrics.mutualistCount +
                    " | CLEANING: " + metrics.cleaningCount +
                    " | SYN: " + Math.round(metrics.meanSynergy * 100) + "%" +
                    " | HETERO: " + Math.round(metrics.meanHeterozygosity * 100) + "%";
                valCAIStatusEl.style.color = metrics.mutualistCount > 0 ? "#34d399" : "#94a3b8";
            }
            if (valBRIIndexEl) {
                valBRIIndexEl.textContent = metrics.meanBRI.toFixed(1) + "% BRI (" + metrics.briRegime + ")";
                valBRIIndexEl.style.color = metrics.briColor;
            }
            if (valBRIStatusEl) {
                valBRIStatusEl.textContent = "CHITINASE: " + metrics.meanChitinase.toFixed(2) + "x" +
                    " | PARASITES: " + Math.round(metrics.meanParasiteLoad * 100) + "%" +
                    " | STATIONS: " + metrics.cleaningStationCount +
                    " | HOSTS: " + metrics.solicitingHostCount +
                    " | SHIELDS: " + metrics.shieldedPreyCount;
                valBRIStatusEl.style.color = metrics.meanBRI >= 50.0 ? "#fbbf24" : "#94a3b8";
            }
        }

        /**
         * Push new data points to Channel 57 (% CAI) and Channel 58 (% BRI) history curves.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            if (historyData.coevolutionaryAdaptation) {
                const chartCAI = Number.isFinite(metrics.meanCAI) ? Math.max(0, Math.min(100, metrics.meanCAI)) : 0;
                historyData.coevolutionaryAdaptation.shift();
                historyData.coevolutionaryAdaptation.push(chartCAI);
            }

            if (historyData.bioticRedQueen) {
                const chartBRI = Number.isFinite(metrics.meanBRI) ? Math.max(0, Math.min(100, metrics.meanBRI)) : 0;
                historyData.bioticRedQueen.shift();
                historyData.bioticRedQueen.push(chartBRI);
            }
        }

        /**
         * Execute full telemetry cycle step for coevolutionary mutualism and Red Queen arms race.
         */
        static step(organisms, historyData, tick) {
            const metrics = CoevolutionTelemetryManager.calculateMetrics(organisms, tick);
            CoevolutionTelemetryManager.updateHUD(metrics);
            CoevolutionTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }

        static getCAIBadgeHTML(metrics) {
            const color = metrics ? metrics.caiColor : "#10b981";
            const val = metrics ? metrics.meanCAI.toFixed(1) : "0.0";
            return '<span class="cai-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% CAI</span>';
        }

        static getBRIBadgeHTML(metrics) {
            const color = metrics ? metrics.briColor : "#f59e0b";
            const val = metrics ? metrics.meanBRI.toFixed(1) : "0.0";
            return '<span class="bri-badge" style="color:' + color + '; border-color:' + color + ';">' + val + '% BRI</span>';
        }

        static formatDiagnostics(metrics) {
            if (!metrics) return "CAI: 0.0% | BRI: 0.0% (NO DATA)";
            return "CAI: " + metrics.meanCAI + "% [" + metrics.caiRegime + "] | BRI: " + metrics.meanBRI + "% [" + metrics.briRegime + "] | Chitinase: " + metrics.meanChitinase.toFixed(2) + "x | Parasites: " + Math.round(metrics.meanParasiteLoad * 100) + "% | Stations: " + metrics.cleaningStationCount;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CoevolutionTelemetryManager;
    } else {
        global.CoevolutionTelemetryManager = CoevolutionTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
