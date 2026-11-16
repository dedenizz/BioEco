// BioEcosystem - Early Tertiary Apex Terrestrial Carnivores Telemetry Dashboard
// Module: src/ui/telemetry_creodont.js
// Version: 9.19.0 (Hour 639 - Looks & UI Agent: 135th Channel % BCI, 136th Channel % CTI, Carnassial Crimson & Amber Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CreodontTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 135th Telemetry Channel: Bone-Crushing & Carnassial Index (% BCI) - Carnassial Crimson (#dc2626)
     * - 136th Telemetry Channel: Cursorial Terrestrial Index (% CTI) - Solar Runner Amber (#eab308)
     * - 4 Biological Regimes for % BCI (BLUNT_DENTITION_BASAL, INCIPIENT_SECTORIAL_SHEAR, ADVANCED_CREODONT_BONEBREAKER, APEX_MESONYCHID_CRUSHER)
     * - 4 Biological Regimes for % CTI (PLANTIGRADE_AMBLING, SEMI_DIGITIGRADE_PROWLER, DIGITIGRADE_SPRINTER, APEX_CURSORIAL_CHASER)
     * - Real-time tracking of craniomandibular bite force, carnassial shearing blades,
     *   bone marrow extraction, digitigrade cursorial strides, and elastic tendon recoil.
     */
    class CreodontTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} creoManager - Global CreodontCarnivoreManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Apex Carnivore metrics.
         */
        static calculateMetrics(organisms, creoManager, tick) {
            let liveCount = 0;
            let apexCount = 0;
            let creoCount = 0;
            let mesoCount = 0;
            let sprintCount = 0;
            let strikeCount = 0;

            let sumBCI = 0.0;
            let sumCTI = 0.0;
            let sumBite = 0.0;
            let sumShear = 0.0;
            let sumMarrow = 0.0;
            let sumStride = 0.0;
            let sumRecoil = 0.0;
            let sumSpeed = 0.0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isApexCarnivore) {
                        apexCount++;
                        if (org.isCreodont) creoCount++;
                        if (org.isMesonychid) mesoCount++;

                        sumBite += (org.craniomandibularBiteForce || 2650.0);
                        sumShear += (org.carnassialShearingEfficiency || 0.84);
                        sumMarrow += (org.boneMarrowExtractionRate || 0.80);
                        sumStride += (org.digitigradeStrideEfficiency || 0.84);
                        sumRecoil += (org.elasticTendonRecoil || 0.78);
                        sumSpeed += (org.cursorialPursuitVelocity || 2.85);

                        if (org.isPursuitSprinting) sprintCount++;
                        if (org.isCraniomandibularStriking) strikeCount++;
                    }

                    if (org.boneCrushingCarnassialIndex !== undefined) {
                        sumBCI += org.boneCrushingCarnassialIndex;
                    }
                    if (org.cursorialTerrestrialIndex !== undefined) {
                        sumCTI += org.cursorialTerrestrialIndex;
                    }
                }
            }

            const meanBCI = liveCount > 0 ? (sumBCI / liveCount) : 0.0;
            const meanCTI = liveCount > 0 ? (sumCTI / liveCount) : 0.0;

            const managerMetrics = creoManager ? creoManager.getMetrics() : {};

            return {
                liveCount: liveCount,
                apexCount: apexCount,
                creoCount: creoCount,
                mesoCount: mesoCount,
                sprintCount: sprintCount,
                strikeCount: strikeCount,
                meanBCI: meanBCI,
                meanCTI: meanCTI,
                meanBite: apexCount > 0 ? (sumBite / apexCount) : (managerMetrics.meanBiteForce || 2650.0),
                meanShear: apexCount > 0 ? (sumShear / apexCount) : (managerMetrics.meanCarnassialShear || 0.84),
                meanMarrow: apexCount > 0 ? (sumMarrow / apexCount) : (managerMetrics.meanMarrowExtraction || 0.80),
                meanStride: apexCount > 0 ? (sumStride / apexCount) : (managerMetrics.meanDigitigradeStride || 0.84),
                meanRecoil: apexCount > 0 ? (sumRecoil / apexCount) : (managerMetrics.meanElasticRecoil || 0.78),
                meanSpeed: apexCount > 0 ? (sumSpeed / apexCount) : (managerMetrics.meanPursuitVelocity || 2.85),
                boneCrushEvents: managerMetrics.boneCrushEvents || 0,
                carnassialShearEvents: managerMetrics.carnassialShearEvents || 0,
                pursuitSprintEvents: managerMetrics.pursuitSprintEvents || 0,
                scavengingAssimilationYield: managerMetrics.scavengingAssimilationYield || 0.0
            };
        }

        /**
         * Determine biological regime for % BCI (135th Channel).
         * @param {number} bci - Percent index.
         * @returns {Object} Tag and description.
         */
        static getBCIRegime(bci) {
            if (bci < 25.0) {
                return { tag: "BLUNT_DENTITION_BASAL", badgeClass: "bci-basal", desc: "BLUNT DENTITION BASAL & ZERO BONE-CRUSHING SHEAR" };
            } else if (bci < 50.0) {
                return { tag: "INCIPIENT_SECTORIAL_SHEAR", badgeClass: "bci-shear", desc: "INCIPIENT SECTORIAL SHEAR & PARTIAL HIDE TEARING" };
            } else if (bci < 75.0) {
                return { tag: "ADVANCED_CREODONT_BONEBREAKER", badgeClass: "bci-bonebreaker", desc: "ADVANCED CREODONT BONEBREAKER & MARROW EXTRACTION" };
            } else {
                return { tag: "APEX_MESONYCHID_CRUSHER", badgeClass: "bci-crusher", desc: "APEX MESONYCHID CRUSHER & DECUSSATING ENAMEL SUPREMACY" };
            }
        }

        /**
         * Determine biological regime for % CTI (136th Channel).
         * @param {number} cti - Percent index.
         * @returns {Object} Tag and description.
         */
        static getCTIRegime(cti) {
            if (cti < 25.0) {
                return { tag: "PLANTIGRADE_AMBLING", badgeClass: "cti-ambling", desc: "PLANTIGRADE AMBLING & HIGH LOCOMOTIVE FATIGUE" };
            } else if (cti < 50.0) {
                return { tag: "SEMI_DIGITIGRADE_PROWLER", badgeClass: "cti-prowler", desc: "SEMI DIGITIGRADE PROWLER & TENDON ENERGY STORAGE" };
            } else if (cti < 75.0) {
                return { tag: "DIGITIGRADE_SPRINTER", badgeClass: "cti-sprinter", desc: "DIGITIGRADE SPRINTER & HIGH RECOIL ACCELERATION" };
            } else {
                return { tag: "APEX_CURSORIAL_CHASER", badgeClass: "cti-chaser", desc: "APEX CURSORIAL CHASER & ELASTIC PURSUIT MASTERY" };
            }
        }

        /**
         * Update laboratory DOM telemetry HUD elements.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const bciEl = document.getElementById("valBCIIndex");
            const bciStatEl = document.getElementById("valBCIStatus");
            const ctiEl = document.getElementById("valCTIPredIndex");
            const ctiStatEl = document.getElementById("valCTIPredStatus");

            if (bciEl) {
                const regime = this.getBCIRegime(metrics.meanBCI);
                bciEl.textContent = metrics.meanBCI.toFixed(1) + "% BCI (" + regime.desc + ")";
                bciEl.className = "bci-badge " + regime.badgeClass;
            }

            if (bciStatEl) {
                bciStatEl.textContent = "APEX: " + metrics.apexCount + "/" + metrics.liveCount +
                    " | BITE: " + metrics.meanBite.toFixed(0) + " N" +
                    " | SHEAR: " + (metrics.meanShear * 100.0).toFixed(0) + "%" +
                    " | MARROW: " + (metrics.meanMarrow * 100.0).toFixed(0) + "%" +
                    " | STRIKES: " + metrics.boneCrushEvents;
            }

            if (ctiEl) {
                const regime = this.getCTIRegime(metrics.meanCTI);
                ctiEl.textContent = metrics.meanCTI.toFixed(1) + "% CTI (" + regime.desc + ")";
                ctiEl.className = "cti-pred-badge " + regime.badgeClass;
            }

            if (ctiStatEl) {
                ctiStatEl.textContent = "SPRINTERS: " + metrics.sprintCount + "/" + metrics.liveCount +
                    " | STRIDE: " + (metrics.meanStride * 100.0).toFixed(0) + "%" +
                    " | RECOIL: " + (metrics.meanRecoil * 100.0).toFixed(0) + "%" +
                    " | SPEED: " + metrics.meanSpeed.toFixed(2) + " px/t" +
                    " | SPRINTS: " + metrics.pursuitSprintEvents;
            }
        }

        /**
         * Execute telemetry step: update historical circular buffers and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line buffers.
         * @param {Object} creoManager - Global CreodontCarnivoreManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, creoManager, tick) {
            const metrics = this.calculateMetrics(organisms, creoManager, tick);

            if (historyData) {
                if (historyData.boneCrushingCarnassialIndex && historyData.boneCrushingCarnassialIndex.length > 0) {
                    historyData.boneCrushingCarnassialIndex.shift();
                    historyData.boneCrushingCarnassialIndex.push(metrics.meanBCI);
                }
                if (historyData.cursorialTerrestrialIndex && historyData.cursorialTerrestrialIndex.length > 0) {
                    historyData.cursorialTerrestrialIndex.shift();
                    historyData.cursorialTerrestrialIndex.push(metrics.meanCTI);
                }
            }

            this.updateDOM(metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CreodontTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.CreodontTelemetryManager = CreodontTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
