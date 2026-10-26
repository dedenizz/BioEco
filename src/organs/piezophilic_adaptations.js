// BioEcosystem - Piezophilic Lipid Membranes, PUFA Fluidity & Piezolyte Kinetics
// Module: src/organs/piezophilic_adaptations.js
// Version: 6.77.0 (Hour 397 - System Agent: Decompression Buffer, Osmolyte Recycling & Benthic Detachment)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * PiezophilicAdaptationsManager
     * High-fidelity biological simulation of abyssal and hadal benthic adaptations:
     * - Polyunsaturated fatty acid (PUFA) membrane fluidity under high hydrostatic pressure
     * - Decompression buffer zone and decompressional lysis trauma prevention
     * - Intracellular piezolyte osmolyte (TMAO/betaine) protection and dynamic recycling
     * - Baroresistant conformational geometry for ATP synthases and ion channels
     * - Benthic anchoring resistance and vertical detachment surge for trophic flux
     * - Aphotic chemosynthesis and marine snow assimilation independent of photon influx
     */
    class PiezophilicAdaptationsManager {
        constructor() {
            this.maxPiezolyteConcentration = 1.0;
            this.hadalDepthThreshold = 380.0;
            this.decompressionBufferZone = 260.0;
            this.baseBaricGradient = 0.0022;
            this.baseAtpCost = 0.012;

            this.metrics = {
                totalLiveCells: 0,
                totalBarophilicCells: 0,
                barophilicPrevalence: 0.0,
                meanMembraneFluidity: 0.0,
                meanPiezolyteProtection: 0.0,
                meanBaroresistantEfficiency: 0.0,
                meanBenthicAnchoring: 0.0,
                meanChemosynthesisRate: 0.0,
                meanCompressionStress: 0.0,
                meanDecompressionStress: 0.0,
                meanBarometricAdaptation: 0.0,
                activeAnchoredCount: 0,
                preventedCompressions: 0,
                decompressionTraumaEvents: 0,
                detachmentSurgeCount: 0,
                osmolyteRecycledAtp: 0.0,
                cumulativeChemoAtp: 0.0,
                cumulativeAtpCost: 0.0
            };
        }

        static initOrganism(org) {
            if (!org) return;

            const isDeep = (org.y && org.y > 360) || org.niche === "scavenger" || org.niche === "carnivore";

            if (typeof org.pufaRatio === "undefined") {
                const hasTrait = (org.genes && org.genes.piezophile) || isDeep || Math.random() < 0.28;
                org.pufaRatio = hasTrait ? 0.40 + Math.random() * 0.50 : 0.05 + Math.random() * 0.20;
            }
            if (typeof org.piezolyteConcentration === "undefined") {
                org.piezolyteConcentration = org.pufaRatio > 0.35 ? 0.30 + Math.random() * 0.60 : 0.02 + Math.random() * 0.15;
            }
            if (typeof org.baroresistantTransporters === "undefined") {
                org.baroresistantTransporters = org.pufaRatio > 0.35 ? 0.35 + Math.random() * 0.55 : 0.05 + Math.random() * 0.20;
            }
            if (typeof org.benthicAnchoring === "undefined") {
                org.benthicAnchoring = (isDeep && Math.random() < 0.45) ? 0.30 + Math.random() * 0.60 : 0.0;
            }
            if (typeof org.chemosynthesisRate === "undefined") {
                org.chemosynthesisRate = (isDeep || org.niche === "herbivore" || org.niche === "scavenger") ? 0.25 + Math.random() * 0.55 : 0.05 + Math.random() * 0.15;
            }
            if (typeof org.compressionStress === "undefined") {
                org.compressionStress = 0.0;
            }
            if (typeof org.decompressionStress === "undefined") {
                org.decompressionStress = 0.0;
            }
            if (typeof org.piezolyteExhaustionDeficit === "undefined") {
                org.piezolyteExhaustionDeficit = 0.0;
            }
            if (typeof org.effectiveFluidity === "undefined") {
                org.effectiveFluidity = 0.5;
            }
            if (typeof org.isBenthicAnchored === "undefined") {
                org.isBenthicAnchored = false;
            }
            if (typeof org.barophilicAdapted === "undefined") {
                org.barophilicAdapted = org.pufaRatio >= 0.35;
            }
            if (typeof org.barometricAdaptationIndex === "undefined") {
                org.barometricAdaptationIndex = 0.5;
            }
        }

        updateOrganism(org, allOrganisms, tick) {
            if (!org || org.isDead || org.alive === false) return;
            PiezophilicAdaptationsManager.initOrganism(org);

            const depth = Math.max(0, org.y || 0);
            const hydrostaticPressure = Math.min(1.5, depth * this.baseBaricGradient);

            // 1. Piezophilic Membrane Fluidity & Baric Compression Mechanics
            const membraneResistance = (org.pufaRatio || 0.1) * (1.0 + (org.piezolyteConcentration || 0.0) * 0.45);
            const pressureDelta = hydrostaticPressure - membraneResistance;

            if (pressureDelta > 0.20) {
                // High pressure rigidifies membrane lacking PUFA / hydration shell
                org.compressionStress = Math.min(1.0, (org.compressionStress || 0.0) + 0.035);
                if (typeof org.vx !== "undefined" && typeof org.vy !== "undefined") {
                    org.vx *= 0.88;
                    org.vy *= 0.88;
                }
                if (typeof org.energy === "number") {
                    org.energy = Math.max(0.0, org.energy - 0.016 * pressureDelta);
                }
            } else {
                org.compressionStress = Math.max(0.0, (org.compressionStress || 0.0) - 0.030);
                this.metrics.preventedCompressions++;
            }

            // 2. Decompression Buffer & Decompressional Lysis Prevention
            if (depth < this.decompressionBufferZone && (org.pufaRatio || 0) > 0.35) {
                const decompressionGradient = (this.decompressionBufferZone - depth) / this.decompressionBufferZone;
                const turgorImbalance = decompressionGradient * (org.pufaRatio * 0.8 - hydrostaticPressure);

                if (turgorImbalance > 0.10) {
                    org.decompressionStress = Math.min(1.0, (org.decompressionStress || 0.0) + 0.045);
                    this.metrics.decompressionTraumaEvents++;
                    if (typeof org.vx !== "undefined" && typeof org.vy !== "undefined") {
                        org.vx *= 0.86;
                        org.vy *= 0.86;
                    }
                    if (typeof org.energy === "number") {
                        const traumaLoss = 0.024 * turgorImbalance;
                        org.energy = Math.max(0.0, org.energy - traumaLoss);
                    }
                    // Baric reflex: steer back downward into safer hydrostatic density
                    if (typeof org.vy !== "undefined") {
                        org.vy += 0.35;
                    }
                } else {
                    org.decompressionStress = Math.max(0.0, (org.decompressionStress || 0.0) - 0.020);
                }
            } else {
                org.decompressionStress = Math.max(0.0, (org.decompressionStress || 0.0) - 0.030);
            }

            // 3. Dynamic Osmolyte Recycling vs Piezolyte Exhaustion Deficit
            if (depth > 340.0) {
                if (typeof org.energy === "number" && org.energy > 14.0) {
                    // Active recycling of TMAO and betaine osmolytes
                    const recycleCost = 0.005;
                    org.energy -= recycleCost;
                    org.piezolyteConcentration = Math.min(this.maxPiezolyteConcentration, (org.piezolyteConcentration || 0.0) + 0.010);
                    org.piezolyteExhaustionDeficit = Math.max(0.0, (org.piezolyteExhaustionDeficit || 0.0) - 0.025);
                    this.metrics.osmolyteRecycledAtp += recycleCost;
                } else if (typeof org.energy === "number" && org.energy < 7.0) {
                    // Osmolyte starvation: piezolyte shield degrades, leaving enzymes vulnerable
                    org.piezolyteConcentration = Math.max(0.04, (org.piezolyteConcentration || 0.0) - 0.007);
                    org.piezolyteExhaustionDeficit = Math.min(1.0, (org.piezolyteExhaustionDeficit || 0.0) + 0.035);
                    if (org.piezolyteExhaustionDeficit > 0.45 && typeof org.vx !== "undefined") {
                        // Enzyme denaturation stall
                        org.vx *= 0.92;
                        org.vy *= 0.92;
                    }
                }
            }

            org.effectiveFluidity = Math.max(0.05, Math.min(1.0, membraneResistance - Math.max(0.0, hydrostaticPressure - 0.5) * 0.4));
            org.barophilicAdapted = (org.pufaRatio >= 0.35 && org.piezolyteConcentration >= 0.22);

            // 4. Baroresistant Transporters & Ion Homeostasis
            const transportEfficiency = Math.max(0.1, (org.baroresistantTransporters || 0.15) * (1.0 - Math.max(0.0, hydrostaticPressure - 0.4) * 0.25));
            if (typeof org.energy === "number" && transportEfficiency > 0.40) {
                const atpPreservation = 0.008 * transportEfficiency;
                org.energy += atpPreservation;
            }

            // 5. Benthic Anchoring & Vertical Detachment Surge
            org.isBenthicAnchored = false;
            if (depth > this.hadalDepthThreshold) {
                const canAnchor = (org.benthicAnchoring || 0.0) > 0.30;
                const shouldDetached = (typeof org.energy === "number" && org.energy < 10.0) || ((tick + (org.id || 0)) % 120 < 25);

                if (canAnchor && !shouldDetached) {
                    org.isBenthicAnchored = true;
                    if (typeof org.vx !== "undefined") {
                        org.vx *= (1.0 - org.benthicAnchoring * 0.65);
                    }
                    if (typeof org.vy !== "undefined" && org.vy > 0) {
                        org.vy *= 0.50;
                    }
                } else if (canAnchor && shouldDetached) {
                    // Detachment surge: swim upward to forage across vertical marine snow column
                    if (typeof org.vy !== "undefined") {
                        org.vy -= 0.48;
                    }
                    this.metrics.detachmentSurgeCount++;
                }

                // Aphotic Chemosynthesis & Detrital Snow Assimilation
                if ((org.chemosynthesisRate || 0.0) > 0.10 && typeof org.energy === "number") {
                    const depthFactor = Math.min(1.4, depth / 400.0);
                    const stallDamping = 1.0 - (org.piezolyteExhaustionDeficit || 0.0) * 0.40;
                    const chemoGain = org.chemosynthesisRate * (0.022 + (org.piezolyteConcentration || 0.0) * 0.014) * depthFactor * stallDamping;
                    org.energy += chemoGain;
                    this.metrics.cumulativeChemoAtp += chemoGain;
                }
            }

            // 6. Metabolic Maintenance Cost
            if (typeof org.energy === "number") {
                const maintenanceCost = (org.pufaRatio || 0.0) * 0.006 + (org.piezolyteConcentration || 0.0) * 0.004;
                org.energy = Math.max(0.0, org.energy - maintenanceCost);
                this.metrics.cumulativeAtpCost += maintenanceCost;
            }

            // 7. Calculate Abyssal Barometric Adaptation (ABA) Index
            const cMembrane = 1.0 - Math.min(1.0, org.compressionStress || 0.0);
            const cDecompression = 1.0 - Math.min(1.0, org.decompressionStress || 0.0);
            const cPiezolyte = Math.min(1.0, (org.piezolyteConcentration || 0.0) * (1.0 - (org.piezolyteExhaustionDeficit || 0.0) * 0.5));
            const cFunctional = Math.min(1.0, (org.baroresistantTransporters || 0.0) * 0.6 + (org.chemosynthesisRate || 0.0) * 0.4);
            org.barometricAdaptationIndex = Math.max(0.0, Math.min(1.0, cMembrane * 0.30 + cDecompression * 0.30 + cPiezolyte * 0.25 + cFunctional * 0.15));
        }

        step(organisms, tick) {
            if (!organisms || !Array.isArray(organisms)) return;

            let liveCount = 0;
            let barophilicCount = 0;
            let sumFluidity = 0.0;
            let sumPiezolyte = 0.0;
            let sumBaroresistant = 0.0;
            let sumAnchoring = 0.0;
            let sumChemo = 0.0;
            let sumStress = 0.0;
            let sumDecompressStress = 0.0;
            let sumABA = 0.0;
            let anchoredCount = 0;

            const n = organisms.length;
            for (let i = 0; i < n; i++) {
                const org = organisms[i];
                if (!org || org.isDead || org.alive === false) continue;
                liveCount++;

                this.updateOrganism(org, organisms, tick);

                sumFluidity += (org.effectiveFluidity || 0.0);
                sumPiezolyte += (org.piezolyteConcentration || 0.0);
                sumBaroresistant += (org.baroresistantTransporters || 0.0);
                sumAnchoring += (org.benthicAnchoring || 0.0);
                sumChemo += (org.chemosynthesisRate || 0.0);
                sumStress += (org.compressionStress || 0.0);
                sumDecompressStress += (org.decompressionStress || 0.0);
                sumABA += (org.barometricAdaptationIndex || 0.0);

                if (org.barophilicAdapted) {
                    barophilicCount++;
                }
                if (org.isBenthicAnchored) {
                    anchoredCount++;
                }
            }

            this.metrics.totalLiveCells = liveCount;
            this.metrics.totalBarophilicCells = barophilicCount;
            this.metrics.barophilicPrevalence = liveCount > 0 ? (barophilicCount / liveCount) : 0.0;
            this.metrics.meanMembraneFluidity = liveCount > 0 ? (sumFluidity / liveCount) : 0.0;
            this.metrics.meanPiezolyteProtection = liveCount > 0 ? (sumPiezolyte / liveCount) : 0.0;
            this.metrics.meanBaroresistantEfficiency = liveCount > 0 ? (sumBaroresistant / liveCount) : 0.0;
            this.metrics.meanBenthicAnchoring = liveCount > 0 ? (sumAnchoring / liveCount) : 0.0;
            this.metrics.meanChemosynthesisRate = liveCount > 0 ? (sumChemo / liveCount) : 0.0;
            this.metrics.meanCompressionStress = liveCount > 0 ? (sumStress / liveCount) : 0.0;
            this.metrics.meanDecompressionStress = liveCount > 0 ? (sumDecompressStress / liveCount) : 0.0;
            this.metrics.meanBarometricAdaptation = liveCount > 0 ? (sumABA / liveCount) : 0.0;
            this.metrics.activeAnchoredCount = anchoredCount;
        }

        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = PiezophilicAdaptationsManager;
    }
    if (typeof global !== "undefined") {
        global.PiezophilicAdaptationsManager = PiezophilicAdaptationsManager;
        global.piezophilicAdaptationsManager = new PiezophilicAdaptationsManager();
    }
})(typeof window !== "undefined" ? window : global);
