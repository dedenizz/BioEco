// BioEcosystem - Early Tertiary Mammalian Arboreal & Stereoscopic Telemetry Dashboard
// Module: src/ui/telemetry_arboreal.js
// Version: 9.01.0 (Hour 621 - Looks & UI Agent: 129th Channel % BVI, 130th Channel % OGI, Deep Lapis & Tropical Emerald Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ArborealTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 129th Telemetry Channel: Binocular Vision Index & Depth Perception (% BVI) - Deep Lapis Indigo (#4f46e5)
     * - 130th Telemetry Channel: Opposable Grasping Index & Arboreal Locomotion (% OGI) - Tropical Emerald Green (#059669)
     * - 4 Biological Regimes for % BVI (LATERAL_MONOCULAR_FLAT, INCIPIENT_ORBITAL_CONVERGENCE, STEREO_BINOCULAR_OVERLAP, HIGH_PRECISION_CANOPY_ACUITY)
     * - 4 Biological Regimes for % OGI (NON_OPPOSABLE_CLAW_GRIP, INCIPIENT_HALLUX_DIVERGENCE, FUNCTIONAL_OPPOSABLE_GRASP, ARBOREAL_CANOPY_ACROBATICS)
     * - Real-time tracking of orbital convergence angle, stereoscopic disparity acuity,
     *   branch jump precision, hallux divergence angle, branch grasping torque, and flat nail support.
     */
    class ArborealTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} arborealManager - Global ArborealVisionGraspingManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Arboreal and Stereoscopic metrics.
         */
        static calculateMetrics(organisms, arborealManager, tick) {
            let liveCount = 0;
            let arborealCount = 0;
            let stereoCount = 0;
            let grasperCount = 0;
            let jumperCount = 0;

            let sumBVI = 0.0;
            let sumOGI = 0.0;
            let sumConv = 0.0;
            let sumDisp = 0.0;
            let sumJump = 0.0;
            let sumCamo = 0.0;
            let sumHallux = 0.0;
            let sumTorque = 0.0;
            let sumNail = 0.0;
            let sumYield = 0.0;
            let totalCanopyBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isArboreal) {
                        arborealCount++;
                        const ogi = org.opposableGraspingIndex !== undefined ? org.opposableGraspingIndex : 50.0;
                        const hallux = org.halluxDivergenceAngle !== undefined ? org.halluxDivergenceAngle : 78.0;
                        const torque = org.branchGraspingTorque !== undefined ? org.branchGraspingTorque : 0.85;
                        const nail = org.flatNailSupport !== undefined ? org.flatNailSupport : 0.86;
                        const yld = org.arborealForagingYield !== undefined ? org.arborealForagingYield : 0.88;

                        sumOGI += ogi;
                        sumHallux += hallux;
                        sumTorque += torque;
                        sumNail += nail;
                        sumYield += yld;
                        totalCanopyBiomass += (org.energy || 20.0);

                        if (org.isGraspingBranch) grasperCount++;
                        if (org.branchJumpCooldown !== undefined && org.branchJumpCooldown > 1.8) jumperCount++;
                    }

                    if (org.isStereoCapable) {
                        stereoCount++;
                        const bvi = org.binocularVisionIndex !== undefined ? org.binocularVisionIndex : 50.0;
                        const conv = org.orbitalConvergenceAngle !== undefined ? org.orbitalConvergenceAngle : 70.0;
                        const disp = org.stereoscopicDisparityAcuity !== undefined ? org.stereoscopicDisparityAcuity : 0.84;
                        const jump = org.branchJumpPrecision !== undefined ? org.branchJumpPrecision : 0.86;
                        const camo = org.visualCamouflageDetection !== undefined ? org.visualCamouflageDetection : 0.82;

                        sumBVI += bvi;
                        sumConv += conv;
                        sumDisp += disp;
                        sumJump += jump;
                        sumCamo += camo;
                    }
                }
            }

            const meanBVI = stereoCount > 0 ? (sumBVI / stereoCount) : 0.0;
            const meanOGI = arborealCount > 0 ? (sumOGI / arborealCount) : 0.0;

            let harvestEvents = 0;
            let precisionJumps = 0;
            let camoCaptures = 0;
            if (arborealManager && arborealManager.metrics) {
                harvestEvents = arborealManager.metrics.canopyFruitHarvestEvents || 0;
                precisionJumps = arborealManager.metrics.precisionJumpEvents || 0;
                camoCaptures = arborealManager.metrics.camouflagePreyCaptures || 0;
            }

            return {
                liveCount,
                arborealCount,
                stereoCount,
                grasperCount,
                jumperCount,
                meanBVI,
                meanOGI,
                meanConv: stereoCount > 0 ? (sumConv / stereoCount) : 70.0,
                meanDisp: stereoCount > 0 ? (sumDisp / stereoCount) : 0.84,
                meanJump: stereoCount > 0 ? (sumJump / stereoCount) : 0.86,
                meanCamo: stereoCount > 0 ? (sumCamo / stereoCount) : 0.82,
                meanHallux: arborealCount > 0 ? (sumHallux / arborealCount) : 78.0,
                meanTorque: arborealCount > 0 ? (sumTorque / arborealCount) : 0.85,
                meanNail: arborealCount > 0 ? (sumNail / arborealCount) : 0.86,
                meanYield: arborealCount > 0 ? (sumYield / arborealCount) : 0.88,
                harvestEvents,
                precisionJumps,
                camoCaptures,
                totalCanopyBiomass
            };
        }

        /**
         * Determine biological regime for Binocular Vision (% BVI).
         * @param {number} bvi - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getBVIRegimeDetails(bvi) {
            if (bvi < 25.0) {
                return { tag: "LATERAL MONOCULAR FLAT (NO DEPTH DISPARITY)", cssClass: "bvi-flat" };
            }
            if (bvi < 50.0) {
                return { tag: "INCIPIENT ORBITAL CONVERGENCE (MODERATE FIELD OVERLAP)", cssClass: "bvi-incipient" };
            }
            if (bvi < 75.0) {
                return { tag: "STEREO BINOCULAR OVERLAP (3D STEREOPSIS ACTIVE)", cssClass: "bvi-stereo" };
            }
            return { tag: "HIGH PRECISION CANOPY ACUITY (METRIC SUB-MM LEAPS)", cssClass: "bvi-precision" };
        }

        /**
         * Determine biological regime for Opposable Grasping (% OGI).
         * @param {number} ogi - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getOGIRegimeDetails(ogi) {
            if (ogi < 25.0) {
                return { tag: "NON-OPPOSABLE CLAW GRIP (SLIP & PUNCTURE RISK)", cssClass: "ogi-claw" };
            }
            if (ogi < 50.0) {
                return { tag: "INCIPIENT HALLUX DIVERGENCE (SEMI-ROTATIONAL HOLD)", cssClass: "ogi-incipient" };
            }
            if (ogi < 75.0) {
                return { tag: "FUNCTIONAL OPPOSABLE GRASP (CIRCULAR BRANCH LOCK)", cssClass: "ogi-grasp" };
            }
            return { tag: "ARBOREAL CANOPY ACROBATICS (PREHENSILE FINE TWIG MASTERY)", cssClass: "ogi-acrobatics" };
        }

        /**
         * Step telemetry loop: update DOM labels, status text, and circular buffers.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Circular historical plot buffer container.
         * @param {Object} arborealManager - Global ArborealVisionGraspingManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, arborealManager, tick) {
            const data = this.calculateMetrics(organisms, arborealManager, tick);

            // Update DOM telemetry panels if present
            if (typeof document !== "undefined") {
                const elBVI = document.getElementById("valBVIIndex");
                const elBVIStatus = document.getElementById("valBVIStatus");
                if (elBVI) {
                    const regime = this.getBVIRegimeDetails(data.meanBVI);
                    elBVI.textContent = data.meanBVI.toFixed(1) + "% BVI (" + regime.tag + ")";
                    elBVI.className = "bvi-badge " + regime.cssClass;
                }
                if (elBVIStatus) {
                    elBVIStatus.textContent = "STEREO: " + data.stereoCount + "/" + data.liveCount + " | CONVERGENCE: " +
                        data.meanConv.toFixed(1) + " deg | DISPARITY: " + (data.meanDisp * 100.0).toFixed(1) +
                        "% | JUMP ACCURACY: " + (data.meanJump * 100.0).toFixed(1) + "% | CAMO CAPTURES: " + data.camoCaptures;
                }

                const elOGI = document.getElementById("valOGIIndex");
                const elOGIStatus = document.getElementById("valOGIStatus");
                if (elOGI) {
                    const regime = this.getOGIRegimeDetails(data.meanOGI);
                    elOGI.textContent = data.meanOGI.toFixed(1) + "% OGI (" + regime.tag + ")";
                    elOGI.className = "ogi-badge " + regime.cssClass;
                }
                if (elOGIStatus) {
                    elOGIStatus.textContent = "ARBOREAL: " + data.arborealCount + "/" + data.liveCount + " | HALLUX: " +
                        data.meanHallux.toFixed(1) + " deg | TORQUE: " + (data.meanTorque * 100.0).toFixed(1) +
                        "% | NAIL SUPPORT: " + (data.meanNail * 100.0).toFixed(1) + "% | HARVESTS: " + data.harvestEvents +
                        " | JUMPS: " + data.precisionJumps;
                }
            }

            // Update Circular History Buffers if present
            if (historyData) {
                if (historyData.binocularVisionIndex) {
                    historyData.binocularVisionIndex.shift();
                    historyData.binocularVisionIndex.push(data.meanBVI);
                }
                if (historyData.opposableGraspingIndex) {
                    historyData.opposableGraspingIndex.shift();
                    historyData.opposableGraspingIndex.push(data.meanOGI);
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ArborealTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.ArborealTelemetryManager = ArborealTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
