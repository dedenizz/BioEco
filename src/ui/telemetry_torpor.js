// BioEcosystem - Late Cretaceous Multituberculate & Torpor Telemetry Dashboard
// Module: src/ui/telemetry_torpor.js
// Version: 8.95.0 (Hour 615 - Looks & UI Agent: 127th Channel % PBI, 128th Channel % THI, Pistachio & Crystal Cyan Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * TorporTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 127th Telemetry Channel: Plagiaulacoid Blade Index & Multituberculate Seed Grinding (% PBI) - Pistachio Lime (#65a30d)
     * - 128th Telemetry Channel: Torpor & Hibernation Index / Metabolic Resilience (% THI) - Crystal Cyan (#0284c7)
     * - 4 Biological Regimes for % PBI (SIMPLE_PREMOLAR_SHEAR, INCIPIENT_SERRATED_BLADE, TRUE_PLAGIAULACOID_SAW, ADVANCED_GRANIVOROUS_GRINDING)
     * - 4 Biological Regimes for % THI (RIGID_HOMEOTHERMY_VULNERABLE, SHALLOW_NOCTURNAL_TORPOR, DEEP_HYPOMETABOLIC_TORPOR, FULL_SEASONAL_HIBERNATION)
     * - Real-time tracking of palinal grinding efficiency, blade serrations, granivorous yield,
     *   torpor metabolic suppression, fossorial shelter insulation, and brown fat thermogenesis.
     */
    class TorporTelemetryManager {
        /**
         * Calculate real-time aggregate metrics across live organisms.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} multituberculateManager - Global MultituberculateTorporManager instance.
         * @param {number} tick - Simulation frame count.
         * @returns {Object} Comprehensive Multituberculate and Torpor metrics.
         */
        static calculateMetrics(organisms, multituberculateManager, tick) {
            let liveCount = 0;
            let multiCount = 0;
            let torporCount = 0;
            let burrowerCount = 0;
            let sleeperCount = 0;

            let sumPBI = 0.0;
            let sumTHI = 0.0;
            let sumPalinal = 0.0;
            let sumSerr = 0.0;
            let sumYield = 0.0;
            let sumDur = 0.0;
            let sumSupp = 0.0;
            let sumInsul = 0.0;
            let sumBat = 0.0;
            let totalBiomass = 0.0;

            if (Array.isArray(organisms) && organisms.length > 0) {
                const len = organisms.length;
                for (let i = 0; i < len; i++) {
                    const org = organisms[i];
                    if (!org || org.isDead || org.alive === false) continue;
                    liveCount++;

                    if (org.hasPlagiaulacoidBlades) {
                        multiCount++;
                        const pbi = org.plagiaulacoidBladeIndex !== undefined ? org.plagiaulacoidBladeIndex : 50.0;
                        const palinal = org.palinalGrindingEfficiency !== undefined ? org.palinalGrindingEfficiency : 0.84;
                        const serr = org.plagiaulacoidSerrationCount !== undefined ? org.plagiaulacoidSerrationCount : 12.0;
                        const yld = org.granivorousCaloricYield !== undefined ? org.granivorousCaloricYield : 0.85;
                        const dur = org.bladeEnamelDurability !== undefined ? org.bladeEnamelDurability : 0.82;

                        sumPBI += pbi;
                        sumPalinal += palinal;
                        sumSerr += serr;
                        sumYield += yld;
                        sumDur += dur;
                        totalBiomass += (org.mass || 1.0) * 1.50;
                    }

                    if (org.canEnterTorpor) {
                        torporCount++;
                        const thi = org.torporHibernationIndex !== undefined ? org.torporHibernationIndex : 50.0;
                        const supp = org.torporMetabolicSuppression !== undefined ? org.torporMetabolicSuppression : 0.90;
                        const insul = org.thermalShelterInsulation !== undefined ? org.thermalShelterInsulation : 0.88;
                        const bat = org.brownFatThermogenesis !== undefined ? org.brownFatThermogenesis : 0.85;

                        sumTHI += thi;
                        sumSupp += supp;
                        sumInsul += insul;
                        sumBat += bat;
                    }

                    if (org.isShelteredUnderground) burrowerCount++;
                    if (org.isInTorpor) sleeperCount++;
                }
            }

            const managerMetrics = (multituberculateManager && typeof multituberculateManager.getMetrics === "function") ?
                multituberculateManager.getMetrics() : {};

            const meanPBI = multiCount > 0 ? (sumPBI / multiCount) : (managerMetrics.meanPlagiaulacoidBladeIndex || 0.0);
            const meanTHI = torporCount > 0 ? (sumTHI / torporCount) : (managerMetrics.meanTorporHibernationIndex || 0.0);

            let pbiRegime = "SIMPLE_PREMOLAR_SHEAR";
            if (meanPBI >= 75.0) pbiRegime = "ADVANCED_GRANIVOROUS_GRINDING";
            else if (meanPBI >= 50.0) pbiRegime = "TRUE_PLAGIAULACOID_SAW";
            else if (meanPBI >= 25.0) pbiRegime = "INCIPIENT_SERRATED_BLADE";

            let thiRegime = "RIGID_HOMEOTHERMY_VULNERABLE";
            if (meanTHI >= 75.0) thiRegime = "FULL_SEASONAL_HIBERNATION";
            else if (meanTHI >= 50.0) thiRegime = "DEEP_HYPOMETABOLIC_TORPOR";
            else if (meanTHI >= 25.0) thiRegime = "SHALLOW_NOCTURNAL_TORPOR";

            return {
                liveCount: liveCount,
                multiCount: multiCount,
                torporCount: torporCount,
                burrowerCount: burrowerCount,
                sleeperCount: sleeperCount,
                multiPrevalence: liveCount > 0 ? (multiCount / liveCount) * 100.0 : 0.0,
                torporPrevalence: liveCount > 0 ? (torporCount / liveCount) * 100.0 : 0.0,
                meanPlagiaulacoidBladeIndex: meanPBI,
                meanTorporHibernationIndex: meanTHI,
                pbiRegime: pbiRegime,
                thiRegime: thiRegime,
                meanPalinalGrinding: multiCount > 0 ? (sumPalinal / multiCount) : 0.84,
                meanSerrationCount: multiCount > 0 ? (sumSerr / multiCount) : 12.0,
                meanGranivorousYield: multiCount > 0 ? (sumYield / multiCount) : 0.85,
                meanBladeDurability: multiCount > 0 ? (sumDur / multiCount) : 0.82,
                meanTorporSuppression: torporCount > 0 ? (sumSupp / torporCount) : 0.90,
                meanShelterInsulation: torporCount > 0 ? (sumInsul / torporCount) : 0.88,
                meanBrownFatThermogenesis: torporCount > 0 ? (sumBat / torporCount) : 0.85,
                seedGrindingEvents: managerMetrics.seedGrindingEvents || 0,
                torporEntryEvents: managerMetrics.torporEntryEvents || 0,
                thermalPulseSurvivals: managerMetrics.thermalPulseSurvivals || 0,
                cumulativePostImpactBiomass: managerMetrics.cumulativePostImpactBiomass || totalBiomass
            };
        }

        /**
         * Update laboratory HUD elements in real time.
         * @param {Object} metrics - Computed aggregate metrics.
         */
        static updateDOM(metrics) {
            if (typeof document === "undefined") return;

            // 1. 127th Channel (% PBI) Display
            const elPBIIndex = document.getElementById("valPBIIndex");
            const elPBIStatus = document.getElementById("valPBIStatus");

            if (elPBIIndex) {
                let regimeDesc = "SIMPLE PREMOLAR SHEAR & NO SERRATED SAW";
                let badgeClass = "pbi-badge pbi-simple";
                if (metrics.pbiRegime === "ADVANCED_GRANIVOROUS_GRINDING") {
                    regimeDesc = "ADVANCED GRANIVOROUS GRINDING & TOTAL SEED EXTRACTION";
                    badgeClass = "pbi-badge pbi-granivorous";
                } else if (metrics.pbiRegime === "TRUE_PLAGIAULACOID_SAW") {
                    regimeDesc = "TRUE PLAGIAULACOID SAW & PROPILANAL PALINAL SLICE";
                    badgeClass = "pbi-badge pbi-saw";
                } else if (metrics.pbiRegime === "INCIPIENT_SERRATED_BLADE") {
                    regimeDesc = "INCIPIENT SERRATED BLADE & PARTIAL RIDGE FORMATION";
                    badgeClass = "pbi-badge pbi-incipient";
                }
                elPBIIndex.textContent = metrics.meanPlagiaulacoidBladeIndex.toFixed(1) + "% PBI (" + regimeDesc + ")";
                elPBIIndex.className = badgeClass;
            }

            if (elPBIStatus) {
                elPBIStatus.textContent = "MULTITUBERCULATES: " + metrics.multiCount + "/" + metrics.liveCount + " (" +
                    metrics.multiPrevalence.toFixed(0) + "%) | PALINAL GRIND: " + (metrics.meanPalinalGrinding * 100.0).toFixed(0) +
                    "% | SERRATIONS: " + metrics.meanSerrationCount.toFixed(1) + " | YIELD: " + (metrics.meanGranivorousYield * 100.0).toFixed(0) +
                    "% | ENAMEL: " + (metrics.meanBladeDurability * 100.0).toFixed(0) + "% | GRINDS: " + metrics.seedGrindingEvents;
            }

            // 2. 128th Channel (% THI) Display
            const elTHIIndex = document.getElementById("valTHIIndex");
            const elTHIStatus = document.getElementById("valTHIStatus");

            if (elTHIIndex) {
                let regimeDesc = "RIGID HOMEOTHERMY VULNERABLE & ZERO HYPOMETABOLISM";
                let badgeClass = "thi-badge thi-vulnerable";
                if (metrics.thiRegime === "FULL_SEASONAL_HIBERNATION") {
                    regimeDesc = "FULL SEASONAL HIBERNATION & IMPACT WINTER SURVIVAL";
                    badgeClass = "thi-badge thi-hibernation";
                } else if (metrics.thiRegime === "DEEP_HYPOMETABOLIC_TORPOR") {
                    regimeDesc = "DEEP HYPOMETABOLIC TORPOR & CONTROLLED HYPOTHERMIA";
                    badgeClass = "thi-badge thi-torpor";
                } else if (metrics.thiRegime === "SHALLOW_NOCTURNAL_TORPOR") {
                    regimeDesc = "SHALLOW NOCTURNAL TORPOR & TRANSIENT SPARING";
                    badgeClass = "thi-badge thi-nocturnal";
                }
                elTHIIndex.textContent = metrics.meanTorporHibernationIndex.toFixed(1) + "% THI (" + regimeDesc + ")";
                elTHIIndex.className = badgeClass;
            }

            if (elTHIStatus) {
                elTHIStatus.textContent = "TORPOR CAPABLE: " + metrics.torporCount + "/" + metrics.liveCount + " (" +
                    metrics.torporPrevalence.toFixed(0) + "%) | SUPPRESSION: " + (metrics.meanTorporSuppression * 100.0).toFixed(0) +
                    "% | SHELTER INSULATION: " + (metrics.meanShelterInsulation * 100.0).toFixed(0) + "% | BAT HEAT: " +
                    (metrics.meanBrownFatThermogenesis * 100.0).toFixed(0) + "% | SLEEPERS: " + metrics.sleeperCount +
                    " | BURROWERS: " + metrics.burrowerCount + " | SURVIVORS: " + metrics.thermalPulseSurvivals;
            }
        }

        /**
         * Main execution step updating telemetry buffer and DOM.
         * @param {Array<Object>} organisms - Simulation entities array.
         * @param {Object} historyData - Historical circular line plot buffers.
         * @param {Object} multituberculateManager - Global MultituberculateTorporManager instance.
         * @param {number} tick - Simulation frame count.
         */
        static step(organisms, historyData, multituberculateManager, tick) {
            const metrics = TorporTelemetryManager.calculateMetrics(organisms, multituberculateManager, tick);

            if (historyData) {
                if (historyData.plagiaulacoidBladeIndex && Array.isArray(historyData.plagiaulacoidBladeIndex)) {
                    historyData.plagiaulacoidBladeIndex[historyData.plagiaulacoidBladeIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanPlagiaulacoidBladeIndex));
                }
                if (historyData.torporHibernationIndex && Array.isArray(historyData.torporHibernationIndex)) {
                    historyData.torporHibernationIndex[historyData.torporHibernationIndex.length - 1] = Math.max(0, Math.min(100, metrics.meanTorporHibernationIndex));
                }
            }

            if (tick % 4 === 0) {
                TorporTelemetryManager.updateDOM(metrics);
            }

            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TorporTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.TorporTelemetryManager = TorporTelemetryManager;
    }
})(typeof window !== "undefined" ? window : global);
