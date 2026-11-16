// BioEcosystem - Miocene Clawed Herbivore Radiation Telemetry Dashboard
// Module: src/ui/telemetry_chalicothere.js
// Version: 9.43.0 (Hour 663 - Looks & UI Agent: 143rd Channel % CCI, 144th Channel % BPI, Stone Grey & Acacia Gold Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ChalicothereTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 143rd Telemetry Channel: Chalicothere Claw & Climbing Index (% CCI) - Stone Grey / Slate (#64748b, #94a3b8)
     * - 144th Telemetry Channel: Branch Pulling & Incurvation Index (% BPI) - Acacia Gold / Yellow (#eab308, #ca8a04)
     * - 4 Biological Regimes for % CCI (BASAL_UNGULATE_HOOF_DRIFT, INCIPIENT_UNGUAL_FLEXURE, KNUCKLE_WALKING_HOOK_CLAW, APEX_CHALICOTHERE_CANOPY_REAPER)
     * - 4 Biological Regimes for % BPI (GROUND_SHRUB_NIPPER, MODERATE_BRANCH_DEFLECTOR, TRIPODAL_CANOPY_STRIPPER, TITAN_BRANCH_INCURVATOR)
     * - Real-time tracking of retractile ungual hook-claws, knuckle-walking locomotion, tripodal stance,
     *   branch-hooking pull force (1800 - 3200 N), foliage stripping yield, lophodont mastication, and cementum wear resistance.
     */
    class ChalicothereTelemetryManager {
        /**
         * Initialize Chalicothere telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalChalicotheres: 0,
                totalMoropus: 0,
                activeBranchHookers: 0,
                activeTripodalBrowsers: 0,
                meanClawRetention: 0.86,
                meanKnuckleWalking: 0.84,
                meanTripodalStance: 0.84,
                meanPullForce: 2500.0,
                meanStrippingYield: 0.82,
                meanLophodontEfficiency: 0.84,
                meanCementumResistance: 0.82,
                meanCCI: 0.0,
                meanBPI: 0.0,
                cciRegime: "BASAL_UNGULATE_HOOF_DRIFT",
                bpiRegime: "GROUND_SHRUB_NIPPER"
            };
        }

        /**
         * Classify biological regime for 143rd Channel (% CCI).
         * @param {number} val - Chalicothere Claw Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyCCIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "BASAL_UNGULATE_HOOF_DRIFT",
                    label: "BASAL UNGULATE HOOF DRIFT & FLAT FOOT",
                    badgeClass: "cci-badge cci-basal",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_UNGUAL_FLEXURE",
                    label: "INCIPIENT UNGUAL CLAW FLEXURE",
                    badgeClass: "cci-badge cci-incipient",
                    color: "#cbd5e1"
                };
            } else if (v < 75.0) {
                return {
                    code: "KNUCKLE_WALKING_HOOK_CLAW",
                    label: "KNUCKLE-WALKING HOOK-CLAW QUADRUPED",
                    badgeClass: "cci-badge cci-knuckle",
                    color: "#64748b"
                };
            } else {
                return {
                    code: "APEX_CHALICOTHERE_CANOPY_REAPER",
                    label: "APEX CHALICOTHERE CANOPY REAPER & TITAN HOOKER",
                    badgeClass: "cci-badge cci-apex",
                    color: "#f8fafc"
                };
            }
        }

        /**
         * Classify biological regime for 144th Channel (% BPI).
         * @param {number} val - Branch Pulling Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyBPIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "GROUND_SHRUB_NIPPER",
                    label: "GROUND SHRUB & LOW HERB NIPPER",
                    badgeClass: "bpi-badge bpi-shrub",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "MODERATE_BRANCH_DEFLECTOR",
                    label: "MODERATE BRANCH DEFLECTOR",
                    badgeClass: "bpi-badge bpi-deflector",
                    color: "#facc15"
                };
            } else if (v < 75.0) {
                return {
                    code: "TRIPODAL_CANOPY_STRIPPER",
                    label: "TRIPODAL CANOPY STRIPPER & BARK HARVESTER",
                    badgeClass: "bpi-badge bpi-stripper",
                    color: "#eab308"
                };
            } else {
                return {
                    code: "TITAN_BRANCH_INCURVATOR",
                    label: "TITAN BRANCH INCURVATOR & HIGH BROWSING TITAN",
                    badgeClass: "bpi-badge bpi-titan",
                    color: "#ca8a04"
                };
            }
        }

        /**
         * Compute telemetry metrics across active organisms and organ manager.
         * @param {Array<Object>} organisms - Simulation organisms array.
         * @param {Object} manager - ChalicothereClawManager instance.
         * @returns {Object} Updated metrics object.
         */
        computeMetrics(organisms, manager) {
            let count = 0;
            let moropusCount = 0;
            let sumClaw = 0;
            let sumKnuckle = 0;
            let sumTripodal = 0;
            let sumPull = 0;
            let sumYield = 0;
            let sumLophodont = 0;
            let sumCementum = 0;
            let sumCCI = 0;
            let sumBPI = 0;
            let activeHookers = 0;
            let activeTripodals = 0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.isChalicothere) {
                        count++;
                        if (org.isMoropus) moropusCount++;
                        sumClaw += (org.retractileUngualClaws || 0.86);
                        sumKnuckle += (org.knuckleWalkingLocomotion || 0.84);
                        sumTripodal += (org.knuckleWalkingTripodalStance || 0.84);
                        sumPull += (org.branchHookingPullForce || 2500);
                        sumYield += (org.foliageStrippingYield || 0.82);
                        sumLophodont += (org.lophodontMasticationEfficiency || 0.84);
                        sumCementum += (org.cementumWearResistance || 0.82);
                        sumCCI += (org.chalicothereClawIndex || 0);
                        sumBPI += (org.branchPullingIndex || 0);

                        if (org.isBranchHooking) activeHookers++;
                        if (org.isTripodalBrowsing) activeTripodals++;
                    }
                }
            }

            // Sync with manager metrics if available
            if (manager && typeof manager.getMetrics === "function") {
                const mm = manager.getMetrics();
                if (mm && mm.totalChalicotheres > 0) {
                    this.metrics.totalChalicotheres = mm.totalChalicotheres;
                    this.metrics.totalMoropus = mm.totalMoropus || moropusCount;
                    this.metrics.activeBranchHookers = mm.activeBranchHookers || activeHookers;
                    this.metrics.activeTripodalBrowsers = mm.activeTripodalBrowsers || activeTripodals;
                    this.metrics.meanClawRetention = mm.meanClawRetention || 0.86;
                    this.metrics.meanKnuckleWalking = mm.meanKnuckleWalking || 0.84;
                    this.metrics.meanTripodalStance = mm.meanTripodalStance || 0.84;
                    this.metrics.meanPullForce = mm.meanPullForce || 2500.0;
                    this.metrics.meanStrippingYield = mm.meanStrippingYield || 0.82;
                    this.metrics.meanLophodontEfficiency = mm.meanLophodontEfficiency || 0.84;
                    this.metrics.meanCementumResistance = mm.meanCementumResistance || 0.82;
                    this.metrics.meanCCI = mm.meanChalicothereClawIndex || 0;
                    this.metrics.meanBPI = mm.meanBranchPullingIndex || 0;
                } else if (count > 0) {
                    this.metrics.totalChalicotheres = count;
                    this.metrics.totalMoropus = moropusCount;
                    this.metrics.activeBranchHookers = activeHookers;
                    this.metrics.activeTripodalBrowsers = activeTripodals;
                    this.metrics.meanClawRetention = sumClaw / count;
                    this.metrics.meanKnuckleWalking = sumKnuckle / count;
                    this.metrics.meanTripodalStance = sumTripodal / count;
                    this.metrics.meanPullForce = sumPull / count;
                    this.metrics.meanStrippingYield = sumYield / count;
                    this.metrics.meanLophodontEfficiency = sumLophodont / count;
                    this.metrics.meanCementumResistance = sumCementum / count;
                    this.metrics.meanCCI = sumCCI / count;
                    this.metrics.meanBPI = sumBPI / count;
                } else {
                    this.metrics.totalChalicotheres = 0;
                    this.metrics.meanCCI = 0.0;
                    this.metrics.meanBPI = 0.0;
                }
            } else if (count > 0) {
                this.metrics.totalChalicotheres = count;
                this.metrics.totalMoropus = moropusCount;
                this.metrics.activeBranchHookers = activeHookers;
                this.metrics.activeTripodalBrowsers = activeTripodals;
                this.metrics.meanClawRetention = sumClaw / count;
                this.metrics.meanKnuckleWalking = sumKnuckle / count;
                this.metrics.meanTripodalStance = sumTripodal / count;
                this.metrics.meanPullForce = sumPull / count;
                this.metrics.meanStrippingYield = sumYield / count;
                this.metrics.meanLophodontEfficiency = sumLophodont / count;
                this.metrics.meanCementumResistance = sumCementum / count;
                this.metrics.meanCCI = sumCCI / count;
                this.metrics.meanBPI = sumBPI / count;
            } else {
                this.metrics.totalChalicotheres = 0;
                this.metrics.meanCCI = 0.0;
                this.metrics.meanBPI = 0.0;
            }

            this.metrics.cciRegime = ChalicothereTelemetryManager.classifyCCIRegime(this.metrics.meanCCI).code;
            this.metrics.bpiRegime = ChalicothereTelemetryManager.classifyBPIRegime(this.metrics.meanBPI).code;

            return Object.assign({}, this.metrics);
        }

        /**
         * Update laboratory DOM telemetry elements.
         * @param {Object} metrics - Telemetry metrics object.
         */
        updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const m = metrics || this.metrics;
            const cciRegime = ChalicothereTelemetryManager.classifyCCIRegime(m.meanCCI);
            const bpiRegime = ChalicothereTelemetryManager.classifyBPIRegime(m.meanBPI);

            // 143rd Channel: % CCI
            const elCCIVal = document.getElementById("valCCIIndex");
            if (elCCIVal) {
                elCCIVal.innerHTML = `<span class="${cciRegime.badgeClass}">${m.meanCCI.toFixed(1)}% CCI</span> (${cciRegime.label})`;
                elCCIVal.style.color = cciRegime.color;
            }

            const elCCIStatus = document.getElementById("valCCIStatus");
            if (elCCIStatus) {
                elCCIStatus.textContent = `CHALICOTHERES: ${m.totalChalicotheres} (MOROPUS: ${m.totalMoropus}) | PULL FORCE: ${m.meanPullForce.toFixed(0)}N | CLAW RETENTION: ${(m.meanClawRetention * 100).toFixed(1)}% | KNUCKLE WALK: ${(m.meanKnuckleWalking * 100).toFixed(1)}% | HOOKERS: ${m.activeBranchHookers}`;
                elCCIStatus.style.color = "#94a3b8";
            }

            // 144th Channel: % BPI
            const elBPIVal = document.getElementById("valBPIIndex");
            if (elBPIVal) {
                elBPIVal.innerHTML = `<span class="${bpiRegime.badgeClass}">${m.meanBPI.toFixed(1)}% BPI</span> (${bpiRegime.label})`;
                elBPIVal.style.color = bpiRegime.color;
            }

            const elBPIStatus = document.getElementById("valBPIStatus");
            if (elBPIStatus) {
                elBPIStatus.textContent = `BRANCH PULL: ${(m.meanStrippingYield * 100).toFixed(1)}% | STRIP YIELD: ${(m.meanStrippingYield * 100).toFixed(1)}% | TRIPODAL STANCE: ${(m.meanTripodalStance * 100).toFixed(1)}% | LOPHODONT: ${(m.meanLophodontEfficiency * 100).toFixed(1)}% | TRIPODALS: ${m.activeTripodalBrowsers}`;
                elBPIStatus.style.color = "#facc15";
            }
        }

        /**
         * Update circular history buffers for Lotka-Volterra dual line plots.
         * @param {Object} historyData - Global simulation history buffer object.
         * @param {Object} metrics - Computed telemetry metrics.
         */
        updateHistoryBuffers(historyData, metrics) {
            if (!historyData) return;
            const m = metrics || this.metrics;

            if (Array.isArray(historyData.chalicothereClawIndex)) {
                historyData.chalicothereClawIndex.shift();
                historyData.chalicothereClawIndex.push(Math.max(0, Math.min(100, m.meanCCI || 0)));
            }

            if (Array.isArray(historyData.branchPullingIndex)) {
                historyData.branchPullingIndex.shift();
                historyData.branchPullingIndex.push(Math.max(0, Math.min(100, m.meanBPI || 0)));
            }
        }

        /**
         * Full step invocation: compute metrics, update DOM, and push to history buffers.
         * @param {Array<Object>} organisms - Active simulation organisms.
         * @param {Object} historyData - Global history buffers.
         * @param {Object} manager - ChalicothereClawManager instance.
         */
        static step(organisms, historyData, manager) {
            if (!global.chalicothereTelemetryManager) {
                global.chalicothereTelemetryManager = new ChalicothereTelemetryManager();
            }
            const tm = global.chalicothereTelemetryManager;
            const metrics = tm.computeMetrics(organisms, manager);
            tm.updateHistoryBuffers(historyData, metrics);
            tm.updateDOM(metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChalicothereTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.ChalicothereTelemetryManager = ChalicothereTelemetryManager;
        global.chalicothereTelemetryManager = new ChalicothereTelemetryManager();
    }
})(typeof window !== "undefined" ? window : global);
