// BioEcosystem - Synthetic Biology, CRISPR-Cas9 Genome Engineering & Artificial Cell Telemetry
// Module: src/ui/telemetry_synthetic.js
// Version: 15.9.0 (Hour 779 - Looks & UI Agent: 187th Channel % SGE, 188th Channel % ACR, Genome Green & Bio-Teal Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SyntheticTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 187th Telemetry Channel: Synthetic Genomics & CRISPR Editing Index (% SGE) - Genome Green (#22c55e, #86efac)
     * - 188th Telemetry Channel: Artificial Cell & Metabolic Chassis Index (% ACR) - Bio-Teal (#14b8a6, #5eead4)
     */
    class SyntheticTelemetryManager {
        /**
         * Classify 187th Channel (% SGE) into 4 regimes.
         * @param {number} val - % SGE value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifySGERegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_PROGRAMMABLE_GENOME",
                    label: "APEX PROGRAMMABLE GENOME & PRECISION CRISPR-CAS9",
                    badgeClass: "sge-badge sge-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "PRECISION_CRISPR_EDITING",
                    label: "PRECISION CRISPR BASE EDITING & ALLELE REPAIR",
                    badgeClass: "sge-badge sge-crispr"
                };
            } else if (val >= 25) {
                return {
                    regime: "EARLY_RECOMBINANT_PLASMIDS",
                    label: "RECOMBINANT PLASMID VECTORS & ENZYME CLONING",
                    badgeClass: "sge-badge sge-plasmid"
                };
            } else {
                return {
                    regime: "RANDOM_MUTATION_DRIFT",
                    label: "STOCHASTIC NATURAL MUTATION & GENETIC DRIFT",
                    badgeClass: "sge-badge sge-pre"
                };
            }
        }

        /**
         * Classify 188th Channel (% ACR) into 4 regimes.
         * @param {number} val - % ACR value (0 - 100).
         * @returns {Object} Regime descriptor.
         */
        static classifyACRRegime(val) {
            if (val >= 75) {
                return {
                    regime: "APEX_PROGRAMMED_BIOREACTOR",
                    label: "APEX PROGRAMMED ARTIFICIAL CELL & BIOREACTOR",
                    badgeClass: "acr-badge acr-apex"
                };
            } else if (val >= 50) {
                return {
                    regime: "MINIMAL_SYNTHETIC_CHASSIS",
                    label: "MINIMAL SYNTHETIC GENOME CHASSIS & METABOLIC FLOW",
                    badgeClass: "acr-badge acr-chassis"
                };
            } else if (val >= 25) {
                return {
                    regime: "ENGINEERED_METABOLIC_PATHWAY",
                    label: "ENGINEERED ENZYME CASCADE & PROTOCELL MEMBRANE",
                    badgeClass: "acr-badge acr-pathway"
                };
            } else {
                return {
                    regime: "NATURAL_ORGANELLE_LIMIT",
                    label: "NATURAL ORGANELLE & UNEDITED METABOLIC CEILING",
                    badgeClass: "acr-badge acr-pre"
                };
            }
        }

        /**
         * Update HUD elements and historical circular buffers for 187th (% SGE) & 188th (% ACR) channels.
         * @param {Array} organisms - Active organisms list.
         * @param {Object} historyData - Telemetry circular history buffers.
         * @param {Object} manager - SyntheticCrisprManager instance.
         */
        static step(organisms, historyData, manager) {
            let sgeVal = 0;
            let acrVal = 0;

            if (manager && manager.metrics) {
                sgeVal = manager.metrics.meanSGEIndex || 0;
                acrVal = manager.metrics.meanACRIndex || 0;
            } else if (Array.isArray(organisms) && organisms.length > 0) {
                let sumSGE = 0;
                let sumACR = 0;
                let count = 0;
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.alive && org.hasSyntheticCrispr) {
                        sumSGE += org.syntheticGenomicsIndex || 0;
                        sumACR += org.artificialChassisIndex || 0;
                        count++;
                    }
                }
                if (count > 0) {
                    sgeVal = sumSGE / count;
                    acrVal = sumACR / count;
                }
            }

            sgeVal = Math.max(0, Math.min(100, sgeVal));
            acrVal = Math.max(0, Math.min(100, acrVal));

            if (historyData) {
                if (Array.isArray(historyData.syntheticGenomicsIndex)) {
                    historyData.syntheticGenomicsIndex.push(sgeVal);
                    if (historyData.syntheticGenomicsIndex.length > 240) {
                        historyData.syntheticGenomicsIndex.shift();
                    }
                }
                if (Array.isArray(historyData.artificialChassisIndex)) {
                    historyData.artificialChassisIndex.push(acrVal);
                    if (historyData.artificialChassisIndex.length > 240) {
                        historyData.artificialChassisIndex.shift();
                    }
                }
            }

            if (typeof document !== "undefined") {
                const elSGE = document.getElementById("valSGEIndex");
                if (elSGE) {
                    const reg = this.classifySGERegime(sgeVal);
                    elSGE.className = reg.badgeClass;
                    elSGE.textContent = sgeVal.toFixed(1) + "% SGE (" + reg.label + ")";
                }

                const elACR = document.getElementById("valACRIndex");
                if (elACR) {
                    const reg = this.classifyACRRegime(acrVal);
                    elACR.className = reg.badgeClass;
                    elACR.textContent = acrVal.toFixed(1) + "% ACR (" + reg.label + ")";
                }
            }

            return { sgeVal: sgeVal, acrVal: acrVal };
        }
    }

    global.SyntheticTelemetryManager = SyntheticTelemetryManager;
})(typeof window !== "undefined" ? window : globalThis);
