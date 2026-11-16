// BioEcosystem - Early Tertiary Megaherbivore Radiation Telemetry Dashboard
// Module: src/ui/telemetry_pantodont.js
// Version: 9.13.0 (Hour 633 - Looks & UI Agent: 133rd Channel % OVI, 134th Channel % GCI, Burnished Amber & Forest Emerald Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PantodontTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 133rd Telemetry Channel: Ossicone & Weaponization Index (% OVI) - Burnished Amber (#b45309)
     * - 134th Telemetry Channel: Graviportal Columnar Index (% GCI) - Forest Emerald (#15803d)
     * - 4 Biological Regimes for % OVI (UNARMED_HORNLESS_BASAL, INCIPIENT_NASAL_BOSSES, TRIPLE_HORNED_UINTATHERID, APEX_ARMORED_TITAN)
     * - 4 Biological Regimes for % GCI (FLEXED_LIMB_AGILE, SEMI_COLUMNAR_SUBGRAVIPORTAL, FULL_GRAVIPORTAL_PILLAR, MEGAHERBIVORE_FOREST_TITAN)
     * - Real-time tracking of columnar stance efficiency, cecal fiber fermentation,
     *   cranial ossicone armor, saber canine shearing, and mandibular flange protection.
     */
    class PantodontTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} megaManager - Global PantodontMegaherbivoreManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Megaherbivore metrics.
         */
        static calculateMetrics(organisms, megaManager, tick) {
            let liveCount = 0;
            let megaCount = 0;
            let dinoCount = 0;
            let pillarCount = 0;
            let clashCount = 0;

            let sumOVI = 0.0;
            let sumGCI = 0.0;
            let sumStance = 0.0;
            let sumCecal = 0.0;
            let sumArmor = 0.0;
            let sumSaber = 0.0;
            let sumFlange = 0.0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isMegaherbivore) {
                        megaCount++;
                        sumStance += (org.columnarStanceEfficiency || 0.85);
                        sumCecal += (org.cecalFermentationTransit || 0.84);
                        if (org.isPillarStanceFeeding) pillarCount++;
                    }
                    if (org.isDinoceratan) {
                        dinoCount++;
                        sumArmor += (org.cranialOssiconeArmor || 0.86);
                        sumSaber += (org.saberCanineShearing || 0.84);
                        sumFlange += (org.mandibularFlangeProtection || 0.87);
                        if (org.isOssiconeClashing) clashCount++;
                    }

                    sumOVI += (org.ossiconeWeaponizationIndex || 0.0);
                    sumGCI += (org.graviportalColumnarIndex || 0.0);
                }
            }

            const meanOVI = liveCount > 0 ? (sumOVI / liveCount) : 0.0;
            const meanGCI = liveCount > 0 ? (sumGCI / liveCount) : 0.0;
            const meanStance = megaCount > 0 ? (sumStance / megaCount) : 0.85;
            const meanCecal = megaCount > 0 ? (sumCecal / megaCount) : 0.84;
            const meanArmor = dinoCount > 0 ? (sumArmor / dinoCount) : 0.86;
            const meanSaber = dinoCount > 0 ? (sumSaber / dinoCount) : 0.84;
            const meanFlange = dinoCount > 0 ? (sumFlange / dinoCount) : 0.87;

            const mgrMetrics = megaManager && typeof megaManager.getMetrics === "function" ? megaManager.getMetrics() : {};

            return {
                liveCount,
                megaCount,
                dinoCount,
                pillarCount,
                clashCount,
                meanOVI,
                meanGCI,
                meanStance,
                meanCecal,
                meanArmor,
                meanSaber,
                meanFlange,
                columnarEvents: mgrMetrics.columnarStanceEvents || 0,
                fermentationPulses: mgrMetrics.fiberFermentationPulses || 0,
                ossiconeClashes: mgrMetrics.ossiconeClashEvents || 0,
                saberStrikes: mgrMetrics.saberExcavationStrikes || 0
            };
        }

        /**
         * Get regime tag and UI class for % OVI.
         * @param {number} ovi - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getOVIRegimeDetails(ovi) {
            if (ovi < 25.0) {
                return { tag: "UNARMED HORNLESS BASAL", cssClass: "ovi-unarmed" };
            } else if (ovi < 50.0) {
                return { tag: "INCIPIENT NASAL BOSSES", cssClass: "ovi-bosses" };
            } else if (ovi < 75.0) {
                return { tag: "TRIPLE HORNED UINTATHERID", cssClass: "ovi-uintatherid" };
            } else {
                return { tag: "APEX ARMORED TITAN", cssClass: "ovi-titan" };
            }
        }

        /**
         * Get regime tag and UI class for % GCI.
         * @param {number} gci - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getGCIRegimeDetails(gci) {
            if (gci < 25.0) {
                return { tag: "FLEXED LIMB AGILE", cssClass: "gci-flexed" };
            } else if (gci < 50.0) {
                return { tag: "SEMI COLUMNAR SUBGRAVIPORTAL", cssClass: "gci-subgraviportal" };
            } else if (gci < 75.0) {
                return { tag: "FULL GRAVIPORTAL PILLAR", cssClass: "gci-pillar" };
            } else {
                return { tag: "MEGAHERBIVORE FOREST TITAN", cssClass: "gci-titan" };
            }
        }

        /**
         * Step telemetry updates: calculate metrics, update HUD and push circular buffers.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Simulation circular buffer repository.
         * @param {Object} megaManager - PantodontMegaherbivoreManager global instance.
         * @param {number} tick - Simulation frame counter.
         */
        static step(organisms, historyData, megaManager, tick) {
            const data = this.calculateMetrics(organisms, megaManager, tick);

            // Update Laboratory DOM HUD Elements if available
            if (typeof document !== "undefined") {
                const elOVI = document.getElementById("valOVIIndex");
                const elOVIStatus = document.getElementById("valOVIStatus");
                if (elOVI) {
                    const regime = this.getOVIRegimeDetails(data.meanOVI);
                    elOVI.textContent = data.meanOVI.toFixed(1) + "% OVI (" + regime.tag + ")";
                    elOVI.className = "ovi-badge " + regime.cssClass;
                }
                if (elOVIStatus) {
                    elOVIStatus.textContent = "DINOCERATANS: " + data.dinoCount + "/" + data.liveCount + " | OSSICONE ARMOR: " +
                        (data.meanArmor * 100.0).toFixed(1) + "% | SABER SHEARING: " + (data.meanSaber * 100.0).toFixed(1) +
                        "% | FLANGE PROTECTION: " + (data.meanFlange * 100.0).toFixed(1) + "% | CLASHES: " + data.ossiconeClashes +
                        " | ROOT STRIKES: " + data.saberStrikes;
                }

                const elGCI = document.getElementById("valGCIIndex");
                const elGCIStatus = document.getElementById("valGCIStatus");
                if (elGCI) {
                    const regime = this.getGCIRegimeDetails(data.meanGCI);
                    elGCI.textContent = data.meanGCI.toFixed(1) + "% GCI (" + regime.tag + ")";
                    elGCI.className = "gci-badge " + regime.cssClass;
                }
                if (elGCIStatus) {
                    elGCIStatus.textContent = "MEGAHERBIVORES: " + data.megaCount + "/" + data.liveCount + " | COLUMNAR STANCE: " +
                        (data.meanStance * 100.0).toFixed(1) + "% | CECAL FERMENT: " + (data.meanCecal * 100.0).toFixed(1) +
                        "% | PILLAR FEEDERS: " + data.pillarCount + " | STANCE EVENTS: " + data.columnarEvents +
                        " | FERMENT PULSES: " + data.fermentationPulses;
                }
            }

            // Update Circular History Buffers if present
            if (historyData) {
                if (historyData.ossiconeWeaponizationIndex) {
                    historyData.ossiconeWeaponizationIndex.shift();
                    historyData.ossiconeWeaponizationIndex.push(data.meanOVI);
                }
                if (historyData.graviportalColumnarIndex) {
                    historyData.graviportalColumnarIndex.shift();
                    historyData.graviportalColumnarIndex.push(data.meanGCI);
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PantodontTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.PantodontTelemetryManager = PantodontTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
