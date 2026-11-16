// BioEcosystem - Asteroidea Catch Apparatus Compliance (% CAC) & Extraoral Gastric Eversion (% EGE) Telemetry
// Module: src/ui/telemetry_asteroidea.js
// Version: 7.58.0 (Hour 478 - Looks & UI Agent: 92nd Channel % EGE & Dual Asteroidea HUD Dashboard)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * AsteroideaTelemetryManager
     * High-precision laboratory telemetry tracking for asteroidea predation, mutable collagen compliance, and extraoral feeding:
     * - Channel 91: Catch Apparatus Compliance Index (% CAC) - MCT collagen stiffness, prying torque, podia suction, and intact arms
     * - Channel 92: Extraoral Gastric Eversion Index (% EGE) - Stomach eversion depth, proteolytic enzymes, histolysis assimilation, and blastema growth
     * - Synthesizes catch collagen stiffness [0.10 - 0.98]
     * - Tracks sustained isometric prying torque [5.0 - 25.0 N*cm] and shell micro-gap dilation [0.0 - 1.2 mm]
     * - Audits podial suction disc vacuum anchorage and hydraulic grip force
     * - Evaluates extraoral cardiac stomach eversion depth [0.0 - 0.85] and proteolytic enzyme secretion [0.15 - 0.60 mg/s]
     * - Monitors arm autotomy breakages, emergency gastric trauma spasms, blastema arrest states, and epimorphic regeneration
     * - Implements 4 distinct biological regimes across the 91st and 92nd telemetry channels
     * - Renders laboratory HUD indicators, telemetry status badges, and circular history buffers
     */
    class AsteroideaTelemetryManager {
        /**
         * Calculate dish-wide Asteroidea predation, catch collagen compliance, and stomach metrics.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} asteroideaManager - Global AsteroideaCardiacStomachManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Comprehensive Asteroidea telemetry metrics.
         */
        static calculateMetrics(organisms, asteroideaManager, tick) {
            let liveCount = 0;
            let asteroideaCount = 0;
            let activePryingCount = 0;
            let evertedFeedersCount = 0;
            let autotomizedCount = 0;
            let arrestCount = 0;

            let sumCAC = 0.0;
            let sumEGE = 0.0;
            let sumStiffness = 0.0;
            let sumTorque = 0.0;
            let sumPryingForce = 0.0;
            let sumMicroGap = 0.0;
            let sumEversion = 0.0;
            let sumEnzymes = 0.0;
            let sumIntactArms = 0;
            let sumRegen = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isAsteroidea) {
                        asteroideaCount++;

                        const cac = org.catchApparatusComplianceIndex || 0.15;
                        const ege = org.extraoralGastricEversionIndex || 0.0;
                        const stiffness = org.catchStiffnessRatio || 0.15;
                        const torque = org.effectiveIsometricTorque !== undefined ? org.effectiveIsometricTorque : (org.isometricCatchTorque || 12.5);
                        const pryingForce = org.bivalvePryingForce || 16.0;
                        const microGap = org.targetShellMicroGap || 0.0;
                        const eversion = org.cardiacStomachEversionDepth || 0.0;
                        const enzymes = org.proteolyticEnzymesRate || 0.28;
                        const intactArms = org.intactArmsCount !== undefined ? org.intactArmsCount : 5;
                        const regen = org.armRegenerationProgress !== undefined ? org.armRegenerationProgress : 1.0;

                        sumCAC += cac;
                        sumEGE += ege;
                        sumStiffness += stiffness;
                        sumTorque += torque;
                        sumPryingForce += pryingForce;
                        sumMicroGap += microGap;
                        sumEversion += eversion;
                        sumEnzymes += enzymes;
                        sumIntactArms += intactArms;
                        sumRegen += regen;

                        if (org.isPryingTarget) activePryingCount++;
                        if (org.isStomachEverted) evertedFeedersCount++;
                        if (org.isArmAutotomized || intactArms < 5) autotomizedCount++;
                        if (org.blastemaArrestState) arrestCount++;
                    }
                }
            }

            const managerMetrics = (asteroideaManager && typeof asteroideaManager.getMetrics === "function") ?
                asteroideaManager.getMetrics() : {};

            const breachEvents = managerMetrics.bivalveBreachEvents || 0;
            const autotomyEvents = managerMetrics.armAutotomyEvents || 0;
            const gastricIncidents = managerMetrics.gastricEversionIncidents || 0;
            const gastricSpasms = managerMetrics.gastricTraumaSpasms || 0;
            const blastemaEvents = managerMetrics.blastemaRegenerationEvents || 0;
            const enzymeSecretion = managerMetrics.cumulativeEnzymeSecretion || 0.0;
            const nutrientsHarvested = managerMetrics.cumulativePredatoryNutrients || 0.0;
            const pryingTicks = managerMetrics.cumulativePryingTicks || 0;
            const traumaDamage = managerMetrics.cumulativeTraumaDamage || 0.0;

            const asteroideaPrevalence = liveCount > 0 ? (asteroideaCount / liveCount) * 100.0 : 0.0;
            const meanCAC = asteroideaCount > 0 ? (sumCAC / asteroideaCount) * 100.0 : 0.0;
            const meanEGE = asteroideaCount > 0 ? (sumEGE / asteroideaCount) * 100.0 : 0.0;
            const meanStiffness = asteroideaCount > 0 ? (sumStiffness / asteroideaCount) * 100.0 : 0.0;
            const meanTorque = asteroideaCount > 0 ? (sumTorque / asteroideaCount) : 0.0;
            const meanPryingForce = asteroideaCount > 0 ? (sumPryingForce / asteroideaCount) : 0.0;
            const meanMicroGap = asteroideaCount > 0 ? (sumMicroGap / asteroideaCount) : 0.0;
            const meanEversion = asteroideaCount > 0 ? (sumEversion / asteroideaCount) : 0.0;
            const meanEnzymes = asteroideaCount > 0 ? (sumEnzymes / asteroideaCount) : 0.0;
            const meanIntactArms = asteroideaCount > 0 ? (sumIntactArms / asteroideaCount) : 5.0;
            const meanRegen = asteroideaCount > 0 ? (sumRegen / asteroideaCount) * 100.0 : 100.0;

            // 4 Biological Regimes for 91st Channel (% CAC)
            let regimeCodeCAC = "COMPLIANT";
            let regimeTitleCAC = "FLACCID COMPLIANT & DISENGAGED";
            let regimeBadgeCAC = "cac-compliant";

            if (meanCAC >= 85.0) {
                regimeCodeCAC = "MAXIMAL";
                regimeTitleCAC = "PEAK RIGID LOCK & BIVALVE BREACH";
                regimeBadgeCAC = "cac-maximal";
            } else if (meanCAC >= 60.0) {
                regimeCodeCAC = "STIFFENING";
                regimeTitleCAC = "ACTIVE ISOMETRIC CATCH STIFFENING";
                regimeBadgeCAC = "cac-stiffening";
            } else if (meanCAC >= 30.0) {
                regimeCodeCAC = "ANCHORING";
                regimeTitleCAC = "PODIAL ANCHORAGE & INITIAL GRIP";
                regimeBadgeCAC = "cac-anchoring";
            }

            // 4 Biological Regimes for 92nd Channel (% EGE)
            let regimeCodeEGE = "RETRACTED";
            let regimeTitleEGE = "RETRACTED & BLOCKED";
            let regimeBadgeEGE = "ege-retracted";

            if (meanEGE >= 85.0) {
                regimeCodeEGE = "MAXIMAL";
                regimeTitleEGE = "PEAK DIGESTIVE ASSIMILATION & REGEN";
                regimeBadgeEGE = "ege-maximal";
            } else if (meanEGE >= 60.0) {
                regimeCodeEGE = "LIQUEFACTION";
                regimeTitleEGE = "ACTIVE IN SITU LIQUEFACTION";
                regimeBadgeEGE = "ege-liquefaction";
            } else if (meanEGE >= 30.0) {
                regimeCodeEGE = "HISTOLYSIS";
                regimeTitleEGE = "INITIAL EVERSION & HISTOLYSIS";
                regimeBadgeEGE = "ege-histolysis";
            }

            return {
                liveCount,
                asteroideaCount,
                asteroideaPrevalence,
                activePryingCount,
                evertedFeedersCount,
                autotomizedCount,
                arrestCount,
                meanCAC,
                meanEGE,
                meanStiffness,
                meanTorque,
                meanPryingForce,
                meanMicroGap,
                meanEversion,
                meanEnzymes,
                meanIntactArms,
                meanRegen,
                breachEvents,
                autotomyEvents,
                gastricIncidents,
                gastricSpasms,
                blastemaEvents,
                enzymeSecretion,
                nutrientsHarvested,
                pryingTicks,
                traumaDamage,
                regimeCodeCAC,
                regimeTitleCAC,
                regimeBadgeCAC,
                regimeCodeEGE,
                regimeTitleEGE,
                regimeBadgeEGE,
                tick
            };
        }

        /**
         * Update laboratory HUD telemetry readouts and status indicators for 91st (% CAC) & 92nd (% EGE) Channels.
         * @param {Object} metrics - Calculated Asteroidea telemetry metrics.
         */
        static updateHUD(metrics) {
            if (!metrics) return;

            // 1. Primary Channel 91 Readout (% CAC)
            const valCACIndexEl = document.getElementById("valCACIndex");
            if (valCACIndexEl) {
                valCACIndexEl.textContent = metrics.meanCAC.toFixed(1) + "% CAC (" + metrics.regimeTitleCAC + ")";
                if (metrics.meanCAC >= 85.0) {
                    valCACIndexEl.style.color = "#fef3c7";
                } else if (metrics.meanCAC >= 60.0) {
                    valCACIndexEl.style.color = "#fde68a";
                } else if (metrics.meanCAC >= 30.0) {
                    valCACIndexEl.style.color = "#fbbf24";
                } else {
                    valCACIndexEl.style.color = "#f59e0b";
                }
            }

            // 2. Secondary Channel 91 Status
            const valCACStatusEl = document.getElementById("valCACStatus");
            if (valCACStatusEl) {
                valCACStatusEl.textContent =
                    "ASTEROIDEA: " + metrics.asteroideaCount + "/" + metrics.liveCount +
                    " (" + metrics.asteroideaPrevalence.toFixed(0) + "%) | TORQUE: " + metrics.meanTorque.toFixed(1) + " N*cm" +
                    " | PRYING: " + metrics.activePryingCount +
                    " | EVERTED: " + metrics.evertedFeedersCount +
                    " | GAP: " + metrics.meanMicroGap.toFixed(2) + " mm" +
                    " | BREACHES: " + metrics.breachEvents +
                    " | AUTOTOMIES: " + metrics.autotomyEvents;
                valCACStatusEl.style.color = metrics.meanCAC >= 50.0 ? "#fbbf24" : "#f59e0b";
            }

            // 3. Primary Channel 92 Readout (% EGE)
            const valEGEIndexEl = document.getElementById("valEGEIndex");
            if (valEGEIndexEl) {
                valEGEIndexEl.textContent = metrics.meanEGE.toFixed(1) + "% EGE (" + metrics.regimeTitleEGE + ")";
                if (metrics.meanEGE >= 85.0) {
                    valEGEIndexEl.style.color = "#ffe4e6";
                } else if (metrics.meanEGE >= 60.0) {
                    valEGEIndexEl.style.color = "#fda4af";
                } else if (metrics.meanEGE >= 30.0) {
                    valEGEIndexEl.style.color = "#fb7185";
                } else {
                    valEGEIndexEl.style.color = "#f43f5e";
                }
            }

            // 4. Secondary Channel 92 Status
            const valEGEStatusEl = document.getElementById("valEGEStatus");
            if (valEGEStatusEl) {
                valEGEStatusEl.textContent =
                    "EGE: " + metrics.meanEGE.toFixed(1) + "%" +
                    " | EVERSION: " + (metrics.meanEversion * 100.0).toFixed(0) + "%" +
                    " | ENZYMES: " + metrics.meanEnzymes.toFixed(2) + " mg/s" +
                    " | SPASMS: " + metrics.gastricSpasms +
                    " | ARRESTS: " + metrics.arrestCount +
                    " | REGEN: " + metrics.meanRegen.toFixed(1) + "%";
                valEGEStatusEl.style.color = metrics.meanEGE >= 50.0 ? "#fb7185" : "#f43f5e";
            }
        }

        /**
         * Record telemetry metrics to historical circular buffers for graphing.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} metrics - Calculated telemetry metrics.
         */
        static recordHistory(historyData, metrics) {
            if (!historyData) return;

            // 91st Channel: % CAC
            if (!historyData.catchApparatusComplianceIndex) {
                historyData.catchApparatusComplianceIndex = new Array(74).fill(0);
            }
            const chartValCAC = Number.isFinite(metrics.meanCAC) ?
                Math.max(0, Math.min(100, metrics.meanCAC)) : 0;
            historyData.catchApparatusComplianceIndex.shift();
            historyData.catchApparatusComplianceIndex.push(chartValCAC);

            // 92nd Channel: % EGE
            if (!historyData.extraoralGastricEversionIndex) {
                historyData.extraoralGastricEversionIndex = new Array(74).fill(0);
            }
            const chartValEGE = Number.isFinite(metrics.meanEGE) ?
                Math.max(0, Math.min(100, metrics.meanEGE)) : 0;
            historyData.extraoralGastricEversionIndex.shift();
            historyData.extraoralGastricEversionIndex.push(chartValEGE);
        }

        /**
         * Execute a complete telemetry cycle: calculation, HUD update, and history recording.
         * @param {Array<Object>} organisms - Live simulation organisms.
         * @param {Object} historyData - Simulation history recording buffers.
         * @param {Object} asteroideaManager - Global AsteroideaCardiacStomachManager instance.
         * @param {number} tick - Current simulation tick.
         * @returns {Object} Calculated telemetry metrics.
         */
        static step(organisms, historyData, asteroideaManager, tick) {
            const metrics = AsteroideaTelemetryManager.calculateMetrics(organisms, asteroideaManager, tick);
            AsteroideaTelemetryManager.updateHUD(metrics);
            AsteroideaTelemetryManager.recordHistory(historyData, metrics);
            return metrics;
        }
    }

    global.AsteroideaTelemetryManager = AsteroideaTelemetryManager;

})(typeof window !== "undefined" ? window : global);
