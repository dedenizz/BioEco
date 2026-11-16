// BioEcosystem - Middle-Late Eocene Cetacean Aquatic Transition Telemetry Dashboard
// Module: src/ui/telemetry_cetacean.js
// Version: 9.07.0 (Hour 627 - Looks & UI Agent: 131st Channel % CTI, 132nd Channel % AUT, Ocean Steel & Marine Cyan Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * CetaceanTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 131st Telemetry Channel: Cetacean Transition Index & Pachyosteosclerosis (% CTI) - Ocean Steel Blue (#0284c7)
     * - 132nd Telemetry Channel: Aquatic Undulating Thrust & Fluke Kinematics (% AUT) - Marine Cyan (#06b6d4)
     * - 4 Biological Regimes for % CTI (TERRESTRIAL_TERRESTRIAL_GAIT, SEMI_AQUATIC_AMBULOCETID, PELAGIC_UNDULATING_PROTOCETID, FULLY_HYDRODYNAMIC_BASILOSAURID)
     * - 4 Biological Regimes for % AUT (QUADRUPEDAL_SURFACE_PADDLE, PELVIC_PROPELLED_SWIM, INCIPIENT_CAUDAL_FLUKING, PELAGIC_WHALE_HYDROFOIL)
     * - Real-time tracking of pachyosteosclerotic ballast, mandibular fat pad conduction,
     *   pelvic reduction ratio, benthic lurking stability, caudal fluke efficiency, and undulation rate.
     */
    class CetaceanTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} cetaceanManager - Global CetaceanAquaticTransitionManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Cetacean transition metrics.
         */
        static calculateMetrics(organisms, cetaceanManager, tick) {
            let liveCount = 0;
            let archaeoCount = 0;
            let aquaticCount = 0;
            let lurkerCount = 0;
            let cruiserCount = 0;

            let sumCTI = 0.0;
            let sumAUT = 0.0;
            let sumBallast = 0.0;
            let sumFatPad = 0.0;
            let sumPelvic = 0.0;
            let sumLurking = 0.0;
            let sumFluke = 0.0;
            let sumUndul = 0.0;
            let sumHearing = 0.0;
            let sumAgility = 0.0;
            let totalCetaceanBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.isArchaeocete) {
                        archaeoCount++;
                        const cti = org.cetaceanTransitionIndex !== undefined ? org.cetaceanTransitionIndex : 50.0;
                        const ballast = org.pachyosteoscleroticBallast !== undefined ? org.pachyosteoscleroticBallast : 0.84;
                        const fatPad = org.mandibularFatPadConduction !== undefined ? org.mandibularFatPadConduction : 0.85;
                        const pelvic = org.pelvicReductionRatio !== undefined ? org.pelvicReductionRatio : 0.82;
                        const lurking = org.benthicLurkingStability !== undefined ? org.benthicLurkingStability : 0.86;

                        sumCTI += cti;
                        sumBallast += ballast;
                        sumFatPad += fatPad;
                        sumPelvic += pelvic;
                        sumLurking += lurking;
                        totalCetaceanBiomass += (org.energy || 25.0);

                        if (org.isBenthicLurking) lurkerCount++;
                    }

                    if (org.isAquaticUndulator) {
                        aquaticCount++;
                        const aut = org.aquaticUndulatingThrust !== undefined ? org.aquaticUndulatingThrust : 50.0;
                        const fluke = org.caudalFlukePropulsionEfficiency !== undefined ? org.caudalFlukePropulsionEfficiency : 0.86;
                        const undul = org.dorsoventralUndulationRate !== undefined ? org.dorsoventralUndulationRate : 2.4;
                        const hearing = org.underwaterDirectionalHearing !== undefined ? org.underwaterDirectionalHearing : 0.85;
                        const agility = org.pelagicCruisingAgility !== undefined ? org.pelagicCruisingAgility : 0.84;

                        sumAUT += aut;
                        sumFluke += fluke;
                        sumUndul += undul;
                        sumHearing += hearing;
                        sumAgility += agility;

                        if (org.pelagicBurstCooldown !== undefined && org.pelagicBurstCooldown > 1.5) cruiserCount++;
                    }
                }
            }

            const meanCTI = archaeoCount > 0 ? (sumCTI / archaeoCount) : 0.0;
            const meanAUT = aquaticCount > 0 ? (sumAUT / aquaticCount) : 0.0;

            let lurkingStrikes = 0;
            let cruisingBursts = 0;
            let acousticLocks = 0;
            if (cetaceanManager && cetaceanManager.metrics) {
                lurkingStrikes = cetaceanManager.metrics.benthicLurkingStrikes || 0;
                cruisingBursts = cetaceanManager.metrics.pelagicCruisingBursts || 0;
                acousticLocks = cetaceanManager.metrics.acousticEcholocationLocks || 0;
            }

            return {
                liveCount,
                archaeoCount,
                aquaticCount,
                lurkerCount,
                cruiserCount,
                meanCTI,
                meanAUT,
                meanBallast: archaeoCount > 0 ? (sumBallast / archaeoCount) : 0.84,
                meanFatPad: archaeoCount > 0 ? (sumFatPad / archaeoCount) : 0.85,
                meanPelvic: archaeoCount > 0 ? (sumPelvic / archaeoCount) : 0.82,
                meanLurking: archaeoCount > 0 ? (sumLurking / archaeoCount) : 0.86,
                meanFluke: aquaticCount > 0 ? (sumFluke / aquaticCount) : 0.86,
                meanUndul: aquaticCount > 0 ? (sumUndul / aquaticCount) : 2.4,
                meanHearing: aquaticCount > 0 ? (sumHearing / aquaticCount) : 0.85,
                meanAgility: aquaticCount > 0 ? (sumAgility / aquaticCount) : 0.84,
                lurkingStrikes,
                cruisingBursts,
                acousticLocks,
                totalCetaceanBiomass
            };
        }

        /**
         * Determine biological regime for Cetacean Transition (% CTI).
         * @param {number} cti - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getCTIRegimeDetails(cti) {
            if (cti < 25.0) {
                return { tag: "TERRESTRIAL GAIT (POSITIVE BUOYANCY SINK LIMIT)", cssClass: "cti-terrestrial" };
            }
            if (cti < 50.0) {
                return { tag: "SEMI-AQUATIC AMBULOCETID (PACHYOSTOSIS LURKER)", cssClass: "cti-ambulocetid" };
            }
            if (cti < 75.0) {
                return { tag: "PELAGIC UNDULATING PROTOCETID (REDUCED LIMBS)", cssClass: "cti-protocetid" };
            }
            return { tag: "FULLY HYDRODYNAMIC BASILOSAURID (PELAGIC FLUKING)", cssClass: "cti-basilosaurid" };
        }

        /**
         * Determine biological regime for Aquatic Undulating Thrust (% AUT).
         * @param {number} aut - Percent index.
         * @returns {Object} Tag and CSS class.
         */
        static getAUTRegimeDetails(aut) {
            if (aut < 25.0) {
                return { tag: "QUADRUPEDAL SURFACE PADDLE (HIGH VISCOUS DRAG)", cssClass: "aut-paddle" };
            }
            if (aut < 50.0) {
                return { tag: "PELVIC PROPELLED SWIM (WEBBED RETRACTILE PUSH)", cssClass: "aut-pelvic" };
            }
            if (aut < 75.0) {
                return { tag: "INCIPIENT CAUDAL FLUKING (DORSOVENTRAL FLEXION)", cssClass: "aut-fluking" };
            }
            return { tag: "PELAGIC WHALE HYDROFOIL (OCEANIC CRUISE MASTERY)", cssClass: "aut-hydrofoil" };
        }

        /**
         * Step telemetry loop: update DOM labels, status text, and circular buffers.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Circular historical plot buffer container.
         * @param {Object} cetaceanManager - Global CetaceanAquaticTransitionManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, cetaceanManager, tick) {
            const data = this.calculateMetrics(organisms, cetaceanManager, tick);

            // Update DOM telemetry panels if present
            if (typeof document !== "undefined") {
                const elCTI = document.getElementById("valCTIIndex");
                const elCTIStatus = document.getElementById("valCTIStatus");
                if (elCTI) {
                    const regime = this.getCTIRegimeDetails(data.meanCTI);
                    elCTI.textContent = data.meanCTI.toFixed(1) + "% CTI (" + regime.tag + ")";
                    elCTI.className = "cti-badge " + regime.cssClass;
                }
                if (elCTIStatus) {
                    elCTIStatus.textContent = "ARCHAEOCETES: " + data.archaeoCount + "/" + data.liveCount + " | BALLAST: " +
                        (data.meanBallast * 100.0).toFixed(1) + "% | FAT PAD: " + (data.meanFatPad * 100.0).toFixed(1) +
                        "% | PELVIC REDUCTION: " + (data.meanPelvic * 100.0).toFixed(1) + "% | LURKING STRIKES: " + data.lurkingStrikes;
                }

                const elAUT = document.getElementById("valAUTIndex");
                const elAUTStatus = document.getElementById("valAUTStatus");
                if (elAUT) {
                    const regime = this.getAUTRegimeDetails(data.meanAUT);
                    elAUT.textContent = data.meanAUT.toFixed(1) + "% AUT (" + regime.tag + ")";
                    elAUT.className = "aut-badge " + regime.cssClass;
                }
                if (elAUTStatus) {
                    elAUTStatus.textContent = "UNDULATORS: " + data.aquaticCount + "/" + data.liveCount + " | FLUKE EFF: " +
                        (data.meanFluke * 100.0).toFixed(1) + "% | RATE: " + data.meanUndul.toFixed(1) +
                        " Hz | HEARING: " + (data.meanHearing * 100.0).toFixed(1) + "% | BURSTS: " + data.cruisingBursts +
                        " | SOUND LOCKS: " + data.acousticLocks;
                }
            }

            // Update Circular History Buffers if present
            if (historyData) {
                if (historyData.cetaceanTransitionIndex) {
                    historyData.cetaceanTransitionIndex.shift();
                    historyData.cetaceanTransitionIndex.push(data.meanCTI);
                }
                if (historyData.aquaticUndulatingThrust) {
                    historyData.aquaticUndulatingThrust.shift();
                    historyData.aquaticUndulatingThrust.push(data.meanAUT);
                }
            }
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = CetaceanTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.CetaceanTelemetryManager = CetaceanTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
