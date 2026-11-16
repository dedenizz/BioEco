// BioEcosystem - Early Tertiary Avian Radiation Telemetry Dashboard
// Module: src/ui/telemetry_terror_bird.js
// Version: 9.25.0 (Hour 645 - Looks & UI Agent: 137th Channel % BBI, 138th Channel % API, Cobalt & Flame Orange Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TerrorBirdTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 137th Telemetry Channel: Beak Biomechanics Index (% BBI) - Cobalt Beak Blue (#2563eb)
     * - 138th Telemetry Channel: Avian Pursuit Index (% API) - Flame Orange (#ea580c)
     * - 4 Biological Regimes for % BBI (BASAL_ANATID_BILL, INCIPIENT_HOOKED_BEAK, TERROR_RAPTORIAL_RAMPHOTHECA, APEX_CRANIOKINETIC_CRUSHER)
     * - 4 Biological Regimes for % API (GROUND_STRUTTING_AMBLE, TRIDACTYL_TROT_PROWLER, CURSORIAL_SPRINT_RUNNER, APEX_TERROR_CHASER)
     * - Real-time tracking of rhamphotheca beak shear force, craniokinetic shock torque,
     *   bipedal stride velocity, tridactyl claw grip, vestigial wing balance, and muscular gizzard trituration.
     */
    class TerrorBirdTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} birdManager - Global TerrorBirdBiomechanicsManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Terror Bird metrics.
         */
        static calculateMetrics(organisms, birdManager, tick) {
            let liveCount = 0;
            let birdCount = 0;
            let gastroCount = 0;
            let phorusCount = 0;
            let sprintCount = 0;
            let strikeCount = 0;

            let sumBBI = 0.0;
            let sumAPI = 0.0;
            let sumBeak = 0.0;
            let sumCranio = 0.0;
            let sumStride = 0.0;
            let sumGrip = 0.0;
            let sumWing = 0.0;
            let sumKick = 0.0;
            let sumGizzard = 0.0;
            let sumGastro = 0.0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isTerrorBird) {
                        birdCount++;
                        if (org.isGastornithid) gastroCount++;
                        if (org.isPhorusrhacid) phorusCount++;

                        sumBeak += (org.beakShearForce || 2050.0);
                        sumCranio += (org.craniokineticShockTorque || 0.84);
                        sumStride += (org.avianStrideVelocity || 3.20);
                        sumGrip += (org.digitigradeTridactylGrip || 0.86);
                        sumWing += (org.vestigialWingBalance || 0.78);
                        sumKick += (org.raptorialKickForce || 2350.0);
                        sumGizzard += (org.gizzardTriturationRate || 0.86);
                        sumGastro += (org.gastrolithGrindingEfficiency || 0.83);

                        if (org.isAvianPursuitSprinting) sprintCount++;
                        if (org.isBeakStriking) strikeCount++;
                    }

                    if (org.beakBiomechanicsIndex !== undefined) {
                        sumBBI += org.beakBiomechanicsIndex;
                    }
                    if (org.avianPursuitIndex !== undefined) {
                        sumAPI += org.avianPursuitIndex;
                    }
                }
            }

            const meanBBI = liveCount > 0 ? (sumBBI / liveCount) : 0.0;
            const meanAPI = liveCount > 0 ? (sumAPI / liveCount) : 0.0;

            const managerMetrics = birdManager ? birdManager.getMetrics() : {};

            return {
                liveCount: liveCount,
                birdCount: birdCount,
                gastroCount: gastroCount,
                phorusCount: phorusCount,
                sprintCount: sprintCount,
                strikeCount: strikeCount,
                meanBBI: meanBBI,
                meanAPI: meanAPI,
                meanBeak: birdCount > 0 ? (sumBeak / birdCount) : (managerMetrics.meanBeakShear || 2050.0),
                meanCranio: birdCount > 0 ? (sumCranio / birdCount) : (managerMetrics.meanCraniokinesis || 0.84),
                meanStride: birdCount > 0 ? (sumStride / birdCount) : (managerMetrics.meanAvianStride || 3.20),
                meanGrip: birdCount > 0 ? (sumGrip / birdCount) : (managerMetrics.meanTridactylGrip || 0.86),
                meanWing: birdCount > 0 ? (sumWing / birdCount) : (managerMetrics.meanWingBalance || 0.78),
                meanKick: birdCount > 0 ? (sumKick / birdCount) : (managerMetrics.meanKickForce || 2350.0),
                meanGizzard: birdCount > 0 ? (sumGizzard / birdCount) : (managerMetrics.meanGizzardTrituration || 0.86),
                meanGastrolith: birdCount > 0 ? (sumGastro / birdCount) : (managerMetrics.meanGastrolithEfficiency || 0.83),
                beakStrikeEvents: managerMetrics.beakStrikeEvents || 0,
                raptorialKickEvents: managerMetrics.raptorialKickEvents || 0,
                avianSprintEvents: managerMetrics.avianSprintEvents || 0,
                gizzardTriturationYield: managerMetrics.gizzardTriturationYield || 0.0
            };
        }

        /**
         * Determine biological regime for % BBI (137th Channel).
         * @param {number} bbi - Percent index.
         * @returns {Object} Tag and description.
         */
        static getBBIRegime(bbi) {
            if (bbi < 25.0) {
                return { tag: "BASAL_ANATID_BILL", badgeClass: "bbi-anatid", desc: "BASAL ANATID BILL & WEAK FILTER SIEVING" };
            } else if (bbi < 50.0) {
                return { tag: "INCIPIENT_HOOKED_BEAK", badgeClass: "bbi-hooked", desc: "INCIPIENT HOOKED BEAK & INCIPIENT TEARING" };
            } else if (bbi < 75.0) {
                return { tag: "TERROR_RAPTORIAL_RAMPHOTHECA", badgeClass: "bbi-raptorial", desc: "TERROR RAPTORIAL RAMPHOTHECA & SHEAR TORK" };
            } else {
                return { tag: "APEX_CRANIOKINETIC_CRUSHER", badgeClass: "bbi-crusher", desc: "APEX CRANIOKINETIC CRUSHER & AX-STRIKE MASTERY" };
            }
        }

        /**
         * Determine biological regime for % API (138th Channel).
         * @param {number} api - Percent index.
         * @returns {Object} Tag and description.
         */
        static getAPIRegime(api) {
            if (api < 25.0) {
                return { tag: "GROUND_STRUTTING_AMBLE", badgeClass: "api-amble", desc: "GROUND STRUTTING AMBLE & LOW BIPEDAL MOBILITY" };
            } else if (api < 50.0) {
                return { tag: "TRIDACTYL_TROT_PROWLER", badgeClass: "api-prowler", desc: "TRIDACTYL TROT PROWLER & TALON TRACTION" };
            } else if (api < 75.0) {
                return { tag: "CURSORIAL_SPRINT_RUNNER", badgeClass: "api-runner", desc: "CURSORIAL SPRINT RUNNER & HIGH-SPEED PURSUIT" };
            } else {
                return { tag: "APEX_TERROR_CHASER", badgeClass: "api-chaser", desc: "APEX TERROR CHASER & WING-STABILIZED STRIKES" };
            }
        }

        /**
         * Update laboratory DOM telemetry HUD elements.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const bbiEl = document.getElementById("valBBIIndex");
            const bbiStatEl = document.getElementById("valBBIStatus");
            const apiEl = document.getElementById("valAPIPredIndex");
            const apiStatEl = document.getElementById("valAPIPredStatus");

            if (bbiEl) {
                const regime = this.getBBIRegime(metrics.meanBBI);
                bbiEl.textContent = metrics.meanBBI.toFixed(1) + "% BBI (" + regime.desc + ")";
                bbiEl.className = "bbi-badge " + regime.badgeClass;
            }

            if (bbiStatEl) {
                bbiStatEl.textContent = "TERROR BIRDS: " + metrics.birdCount + "/" + metrics.liveCount +
                    " | BEAK FORCE: " + metrics.meanBeak.toFixed(0) + " N" +
                    " | CRANIOKINESIS: " + (metrics.meanCranio * 100.0).toFixed(0) + "%" +
                    " | GIZZARD: " + (metrics.meanGizzard * 100.0).toFixed(0) + "%" +
                    " | CHOP STRIKES: " + metrics.beakStrikeEvents;
            }

            if (apiEl) {
                const regime = this.getAPIRegime(metrics.meanAPI);
                apiEl.textContent = metrics.meanAPI.toFixed(1) + "% API (" + regime.desc + ")";
                apiEl.className = "api-pred-badge " + regime.badgeClass;
            }

            if (apiStatEl) {
                apiStatEl.textContent = "SPRINTERS: " + metrics.sprintCount + "/" + metrics.liveCount +
                    " | STRIDE: " + metrics.meanStride.toFixed(2) + " px/t" +
                    " | TALON GRIP: " + (metrics.meanGrip * 100.0).toFixed(0) + "%" +
                    " | WING BALANCE: " + (metrics.meanWing * 100.0).toFixed(0) + "%" +
                    " | SPRINTS: " + metrics.avianSprintEvents;
            }
        }

        /**
         * Execute telemetry step: update historical circular buffers and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line buffers.
         * @param {Object} birdManager - Global TerrorBirdBiomechanicsManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, birdManager, tick) {
            const metrics = this.calculateMetrics(organisms, birdManager, tick);

            if (historyData) {
                if (historyData.beakBiomechanicsIndex && historyData.beakBiomechanicsIndex.length > 0) {
                    historyData.beakBiomechanicsIndex.shift();
                    historyData.beakBiomechanicsIndex.push(metrics.meanBBI);
                }
                if (historyData.avianPursuitIndex && historyData.avianPursuitIndex.length > 0) {
                    historyData.avianPursuitIndex.shift();
                    historyData.avianPursuitIndex.push(metrics.meanAPI);
                }
            }

            this.updateDOM(metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TerrorBirdTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TerrorBirdTelemetryManager = TerrorBirdTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
