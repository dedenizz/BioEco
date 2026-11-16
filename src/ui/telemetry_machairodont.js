// BioEcosystem - Miocene Apex Predator Radiation Telemetry Dashboard
// Module: src/ui/telemetry_machairodont.js
// Version: 9.49.0 (Hour 669 - Looks & UI Agent: 145th Channel % SCI, 146th Channel % BDI, Crimson & Amber Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * MachairodontTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 145th Telemetry Channel: Saber Canine & Shear Index (% SCI) - Crimson Red / Dark Rose (#b91c1c, #fb7185)
     * - 146th Telemetry Channel: Bear-Dog Bone-Crush & Agility Index (% BDI) - Amber Ochre / Burnished Gold (#d97706, #fbbf24)
     * - 4 Biological Regimes for % SCI (BASAL_FELID_NIPPER, INCIPIENT_DIRK_TOOTH, MACHAIRODONT_AMBUSH_SLICER, APEX_SABER_HEMORRHAGE_TITAN)
     * - 4 Biological Regimes for % BDI (CANIFORM_RUNNER, SEMI_PLANTIGRADE_FORAGER, AMPHICYONID_BONE_BREAKER, TITAN_BEAR_DOG_CARCASS_REAPER)
     * - Real-time tracking of saber canine length, hyper-extended jaw gape (90-110 deg), canine shear bite force,
     *   cervical vessel laceration rate, retractile forelimb claws, bear-dog crush force (2800-4600 N), and bone marrow extraction.
     */
    class MachairodontTelemetryManager {
        /**
         * Initialize Machairodont & Bear-Dog telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalMachairodonts: 0,
                totalAmphicyonids: 0,
                activeSaberStrikes: 0,
                activeGrapplers: 0,
                activeBearDogCrushers: 0,
                meanSaberLength: 13.0,
                meanJawGape: 100.0,
                meanShearForce: 1800.0,
                meanLacerationRate: 0.85,
                meanForelimbClaws: 0.86,
                meanBearDogCrush: 3600.0,
                meanPremolarEfficiency: 0.84,
                meanPlantigradeEndurance: 0.84,
                meanSCI: 0.0,
                meanBDI: 0.0,
                sciRegime: "BASAL_FELID_NIPPER",
                bdiRegime: "CANIFORM_RUNNER"
            };
        }

        /**
         * Classify biological regime for 145th Channel (% SCI).
         * @param {number} val - Saber Canine Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifySCIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "BASAL_FELID_NIPPER",
                    label: "BASAL FELID NIPPER & SMALL PREY HUNTER",
                    badgeClass: "sci-badge sci-basal",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_DIRK_TOOTH",
                    label: "INCIPIENT DIRK-TOOTH & THROAT CLAMP",
                    badgeClass: "sci-badge sci-dirk",
                    color: "#fb7185"
                };
            } else if (v < 75.0) {
                return {
                    code: "MACHAIRODONT_AMBUSH_SLICER",
                    label: "MACHAIRODONT AMBUSH SLICER & PREY GRAPPLER",
                    badgeClass: "sci-badge sci-ambush",
                    color: "#f43f5e"
                };
            } else {
                return {
                    code: "APEX_SABER_HEMORRHAGE_TITAN",
                    label: "APEX SABER HEMORRHAGE TITAN & MEGAHERBIVORE REAPER",
                    badgeClass: "sci-badge sci-titan",
                    color: "#fecdd3"
                };
            }
        }

        /**
         * Classify biological regime for 146th Channel (% BDI).
         * @param {number} val - Bear-Dog Agility Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyBDIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "CANIFORM_RUNNER",
                    label: "CANIFORM RUNNER & OPPORTUNIST",
                    badgeClass: "bdi-badge bdi-caniform",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "SEMI_PLANTIGRADE_FORAGER",
                    label: "SEMI-PLANTIGRADE FORAGER & SCAVENGER",
                    badgeClass: "bdi-badge bdi-forager",
                    color: "#fbbf24"
                };
            } else if (v < 75.0) {
                return {
                    code: "AMPHICYONID_BONE_BREAKER",
                    label: "AMPHICYONID BONE-BREAKER & HEAVY HUNTER",
                    badgeClass: "bdi-badge bdi-breaker",
                    color: "#f59e0b"
                };
            } else {
                return {
                    code: "TITAN_BEAR_DOG_CARCASS_REAPER",
                    label: "TITAN BEAR-DOG CARCASS REAPER & UNRIVALED BONE CRUSHER",
                    badgeClass: "bdi-badge bdi-titan",
                    color: "#fef3c7"
                };
            }
        }

        /**
         * Compute telemetry metrics across active organisms and manager.
         * @param {Array<Object>} organisms - Simulation organisms array.
         * @param {Object} manager - MachairodontCanineManager instance.
         * @returns {Object} Updated metrics object.
         */
        computeMetrics(organisms, manager) {
            let machCount = 0;
            let amphCount = 0;
            let sumSaber = 0;
            let sumGape = 0;
            let sumShear = 0;
            let sumLaceration = 0;
            let sumClaws = 0;
            let sumCrush = 0;
            let sumPremolar = 0;
            let sumEndurance = 0;
            let sumSCI = 0;
            let sumBDI = 0;
            let activeStrikes = 0;
            let activeGrapplers = 0;
            let activeCrushers = 0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org) continue;

                    if (org.isMachairodont) {
                        machCount++;
                        sumSaber += (org.saberCanineLength || 13.0);
                        sumGape += (org.hyperExtendedJawGape || 100.0);
                        sumShear += (org.canineShearBiteForce || 1800.0);
                        sumLaceration += (org.cervicalVesselLacerationRate || 0.85);
                        sumClaws += (org.retractileForelimbClaws || 0.86);
                        sumSCI += (org.saberCanineIndex || 0);

                        if (org.isSaberStriking) activeStrikes++;
                        if (org.isPreyGrappled) activeGrapplers++;
                    } else if (org.isAmphicyonid) {
                        amphCount++;
                        sumCrush += (org.amphicyonidCrushForce || 3600.0);
                        sumPremolar += (org.premolarBoneCrushingEfficiency || 0.84);
                        sumEndurance += (org.semiPlantigradeEndurance || 0.84);
                        sumBDI += (org.bearDogIndex || 0);

                        if (org.isBearDogCrushing) activeCrushers++;
                    }
                }
            }

            // Sync with manager metrics if available
            if (manager && typeof manager.getMetrics === "function") {
                const mm = manager.getMetrics();
                if (mm && (mm.totalMachairodonts > 0 || mm.totalAmphicyonids > 0)) {
                    this.metrics.totalMachairodonts = mm.totalMachairodonts;
                    this.metrics.totalAmphicyonids = mm.totalAmphicyonids;
                    this.metrics.activeSaberStrikes = mm.activeSaberStrikes || activeStrikes;
                    this.metrics.activeGrapplers = mm.activeGrapplers || activeGrapplers;
                    this.metrics.activeBearDogCrushers = mm.activeBearDogCrushers || activeCrushers;
                    this.metrics.meanSaberLength = mm.meanSaberLength || 13.0;
                    this.metrics.meanJawGape = mm.meanJawGape || 100.0;
                    this.metrics.meanShearForce = mm.meanShearForce || 1800.0;
                    this.metrics.meanLacerationRate = mm.meanLacerationRate || 0.85;
                    this.metrics.meanForelimbClaws = mm.meanForelimbClaws || 0.86;
                    this.metrics.meanBearDogCrush = mm.meanBearDogCrush || 3600.0;
                    this.metrics.meanPremolarEfficiency = mm.meanPremolarEfficiency || 0.84;
                    this.metrics.meanPlantigradeEndurance = mm.meanPlantigradeEndurance || 0.84;
                    this.metrics.meanSCI = mm.meanSaberCanineIndex || 0;
                    this.metrics.meanBDI = mm.meanBearDogIndex || 0;
                } else {
                    this.metrics.totalMachairodonts = machCount;
                    this.metrics.totalAmphicyonids = amphCount;
                    this.metrics.activeSaberStrikes = activeStrikes;
                    this.metrics.activeGrapplers = activeGrapplers;
                    this.metrics.activeBearDogCrushers = activeCrushers;
                    this.metrics.meanSaberLength = machCount > 0 ? (sumSaber / machCount) : 13.0;
                    this.metrics.meanJawGape = machCount > 0 ? (sumGape / machCount) : 100.0;
                    this.metrics.meanShearForce = machCount > 0 ? (sumShear / machCount) : 1800.0;
                    this.metrics.meanLacerationRate = machCount > 0 ? (sumLaceration / machCount) : 0.85;
                    this.metrics.meanForelimbClaws = machCount > 0 ? (sumClaws / machCount) : 0.86;
                    this.metrics.meanBearDogCrush = amphCount > 0 ? (sumCrush / amphCount) : 3600.0;
                    this.metrics.meanPremolarEfficiency = amphCount > 0 ? (sumPremolar / amphCount) : 0.84;
                    this.metrics.meanPlantigradeEndurance = amphCount > 0 ? (sumEndurance / amphCount) : 0.84;
                    this.metrics.meanSCI = machCount > 0 ? (sumSCI / machCount) : 0.0;
                    this.metrics.meanBDI = amphCount > 0 ? (sumBDI / amphCount) : 0.0;
                }
            } else {
                this.metrics.totalMachairodonts = machCount;
                this.metrics.totalAmphicyonids = amphCount;
                this.metrics.activeSaberStrikes = activeStrikes;
                this.metrics.activeGrapplers = activeGrapplers;
                this.metrics.activeBearDogCrushers = activeCrushers;
                this.metrics.meanSaberLength = machCount > 0 ? (sumSaber / machCount) : 13.0;
                this.metrics.meanJawGape = machCount > 0 ? (sumGape / machCount) : 100.0;
                this.metrics.meanShearForce = machCount > 0 ? (sumShear / machCount) : 1800.0;
                this.metrics.meanLacerationRate = machCount > 0 ? (sumLaceration / machCount) : 0.85;
                this.metrics.meanForelimbClaws = machCount > 0 ? (sumClaws / machCount) : 0.86;
                this.metrics.meanBearDogCrush = amphCount > 0 ? (sumCrush / amphCount) : 3600.0;
                this.metrics.meanPremolarEfficiency = amphCount > 0 ? (sumPremolar / amphCount) : 0.84;
                this.metrics.meanPlantigradeEndurance = amphCount > 0 ? (sumEndurance / amphCount) : 0.84;
                this.metrics.meanSCI = machCount > 0 ? (sumSCI / machCount) : 0.0;
                this.metrics.meanBDI = amphCount > 0 ? (sumBDI / amphCount) : 0.0;
            }

            this.metrics.sciRegime = MachairodontTelemetryManager.classifySCIRegime(this.metrics.meanSCI).code;
            this.metrics.bdiRegime = MachairodontTelemetryManager.classifyBDIRegime(this.metrics.meanBDI).code;

            return Object.assign({}, this.metrics);
        }

        /**
         * Update laboratory DOM telemetry elements.
         * @param {Object} metrics - Telemetry metrics object.
         */
        updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const m = metrics || this.metrics;
            const sciRegime = MachairodontTelemetryManager.classifySCIRegime(m.meanSCI);
            const bdiRegime = MachairodontTelemetryManager.classifyBDIRegime(m.meanBDI);

            // 145th Channel: % SCI
            const elSCIVal = document.getElementById("valSCIIndex");
            if (elSCIVal) {
                elSCIVal.innerHTML = `<span class="${sciRegime.badgeClass}">${m.meanSCI.toFixed(1)}% SCI</span> (${sciRegime.label})`;
                elSCIVal.style.color = sciRegime.color;
            }

            const elSCIStatus = document.getElementById("valSCIStatus");
            if (elSCIStatus) {
                elSCIStatus.textContent = `MACHAIRODONTS: ${m.totalMachairodonts} | SABER CANINES: ${m.meanSaberLength.toFixed(1)} cm | JAW GAPE: ${m.meanJawGape.toFixed(0)} deg | SHEAR FORCE: ${m.meanShearForce.toFixed(0)}N | LACERATION: ${(m.meanLacerationRate * 100).toFixed(1)}% | STRIKES: ${m.activeSaberStrikes}`;
                elSCIStatus.style.color = "#fb7185";
            }

            // 146th Channel: % BDI
            const elBDIVal = document.getElementById("valBDIIndex");
            if (elBDIVal) {
                elBDIVal.innerHTML = `<span class="${bdiRegime.badgeClass}">${m.meanBDI.toFixed(1)}% BDI</span> (${bdiRegime.label})`;
                elBDIVal.style.color = bdiRegime.color;
            }

            const elBDIStatus = document.getElementById("valBDIStatus");
            if (elBDIStatus) {
                elBDIStatus.textContent = `AMPHICYONIDS: ${m.totalAmphicyonids} | CRUSH FORCE: ${m.meanBearDogCrush.toFixed(0)}N | BONE CRUSH: ${(m.meanPremolarEfficiency * 100).toFixed(1)}% | ENDURANCE: ${(m.meanPlantigradeEndurance * 100).toFixed(1)}% | CRUSHERS: ${m.activeBearDogCrushers}`;
                elBDIStatus.style.color = "#fbbf24";
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

            if (Array.isArray(historyData.saberCanineIndex)) {
                historyData.saberCanineIndex.shift();
                historyData.saberCanineIndex.push(Math.max(0, Math.min(100, m.meanSCI || 0)));
            }

            if (Array.isArray(historyData.bearDogIndex)) {
                historyData.bearDogIndex.shift();
                historyData.bearDogIndex.push(Math.max(0, Math.min(100, m.meanBDI || 0)));
            }
        }

        /**
         * Full step invocation: compute metrics, update DOM, and push to history buffers.
         * @param {Array<Object>} organisms - Active simulation organisms.
         * @param {Object} historyData - Global history buffers.
         * @param {Object} manager - MachairodontCanineManager instance.
         */
        static step(organisms, historyData, manager) {
            if (!global.machairodontTelemetryManager) {
                global.machairodontTelemetryManager = new MachairodontTelemetryManager();
            }
            const tm = global.machairodontTelemetryManager;
            const metrics = tm.computeMetrics(organisms, manager);
            tm.updateHistoryBuffers(historyData, metrics);
            tm.updateDOM(metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = MachairodontTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.MachairodontTelemetryManager = MachairodontTelemetryManager;
        global.machairodontTelemetryManager = new MachairodontTelemetryManager();
    }
})(typeof window !== "undefined" ? window : global);
