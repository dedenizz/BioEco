// BioEcosystem - Early Tertiary Megaherbivore Radiation II Telemetry Dashboard
// Module: src/ui/telemetry_paraceratherium.js
// Version: 9.31.0 (Hour 651 - Looks & UI Agent: 139th Channel % PEI, 140th Channel % BFI, Emerald & Amber Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * ParaceratheriumTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 139th Telemetry Channel: Paraceratheriid Elevation Index (% PEI) - Forest Emerald Green (#059669)
     * - 140th Telemetry Channel: Browsing Foliage Index (% BFI) - Burnished Amber (#d97706)
     * - 4 Biological Regimes for % PEI (LOW_CANOPY_GRAZER, SUBCOLUMNAR_BROWSER, GRAVIPORTAL_PILLAR_STANCE, APEX_CANOPY_TITAN)
     * - 4 Biological Regimes for % BFI (BASAL_HERBACEOUS_FORAGING, INCIPIENT_PREHENSILE_STRIPPING, HIGH_CANOPY_DEFOLIATOR, GIGANTOTHERMIC_MEGA_BROWSER)
     * - Real-time tracking of hyper-columnar stance lock, synovial hydraulic buffering, cervical extension span,
     *   8-meter canopy browsing reach, prehensile lip dexterity, conical incisor stripping, and gigantothermic thermal efficiency.
     */
    class ParaceratheriumTelemetryManager {
        /**
         * Initialize Paraceratherium telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalParaceratheriids: 0,
                activeColumnarLocks: 0,
                activeCanopyBrowsers: 0,
                meanColumnarLock: 0.88,
                meanHydraulicBuffer: 0.89,
                meanCervicalSpan: 2.30,
                meanCanopyReach: 7.50,
                meanLipDexterity: 0.83,
                meanIncisorStripping: 0.84,
                meanFoliageExtraction: 0.86,
                meanGigantothermy: 0.78,
                meanPEI: 0.0,
                meanBFI: 0.0,
                peiRegime: "LOW_CANOPY_GRAZER",
                bfiRegime: "BASAL_HERBACEOUS_FORAGING"
            };
        }

        /**
         * Classify biological regime for 139th Channel (% PEI).
         * @param {number} val - Paraceratheriid Elevation Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyPEIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "LOW_CANOPY_GRAZER",
                    label: "LOW CANOPY GRAZER & RESTRICTED ACCESS",
                    badgeClass: "pei-badge pei-low",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "SUBCOLUMNAR_BROWSER",
                    label: "SUBCOLUMNAR BROWSER & SHRUB FORAGING",
                    badgeClass: "pei-badge pei-subcolumnar",
                    color: "#10b981"
                };
            } else if (v < 75.0) {
                return {
                    code: "GRAVIPORTAL_PILLAR_STANCE",
                    label: "GRAVIPORTAL PILLAR STANCE & SKELETAL LOCK",
                    badgeClass: "pei-badge pei-pillar",
                    color: "#059669"
                };
            } else {
                return {
                    code: "APEX_CANOPY_TITAN",
                    label: "APEX CANOPY TITAN & 8-METER MONOPOLY",
                    badgeClass: "pei-badge pei-titan",
                    color: "#34d399"
                };
            }
        }

        /**
         * Classify biological regime for 140th Channel (% BFI).
         * @param {number} val - Browsing Foliage Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyBFIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "BASAL_HERBACEOUS_FORAGING",
                    label: "BASAL HERBACEOUS FORAGING & LEAF LITTER",
                    badgeClass: "bfi-badge bfi-basal",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_PREHENSILE_STRIPPING",
                    label: "INCIPIENT PREHENSILE STRIPPING & STEM CLAMPING",
                    badgeClass: "bfi-badge bfi-incipient",
                    color: "#f59e0b"
                };
            } else if (v < 75.0) {
                return {
                    code: "HIGH_CANOPY_DEFOLIATOR",
                    label: "HIGH CANOPY DEFOLIATOR & TANNIN ASYMMETRY",
                    badgeClass: "bfi-badge bfi-defoliator",
                    color: "#d97706"
                };
            } else {
                return {
                    code: "GIGANTOTHERMIC_MEGA_BROWSER",
                    label: "GIGANTOTHERMIC MEGA BROWSER & 20-TON METABOLISM",
                    badgeClass: "bfi-badge bfi-titan-browser",
                    color: "#fbbf24"
                };
            }
        }

        /**
         * Compute telemetry metrics across active organisms and organ manager.
         * @param {Array<Object>} organisms - Simulation organisms array.
         * @param {Object} manager - ParaceratheriumTitanManager instance.
         * @returns {Object} Updated metrics object.
         */
        computeMetrics(organisms, manager) {
            let count = 0;
            let sumColLock = 0;
            let sumHydBuffer = 0;
            let sumCervSpan = 0;
            let sumCanopyReach = 0;
            let sumLipDex = 0;
            let sumIncisor = 0;
            let sumExtraction = 0;
            let sumGiganto = 0;
            let sumPEI = 0;
            let sumBFI = 0;
            let activeLocks = 0;
            let activeBrowsers = 0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.isParaceratheriid) {
                        count++;
                        sumColLock += (org.hyperColumnarStanceLock || 0.88);
                        sumHydBuffer += (org.synovialHydraulicBuffering || 0.89);
                        sumCervSpan += (org.cervicalExtensionSpan || 2.30);
                        sumCanopyReach += (org.canopyBrowsingReach || 7.50);
                        sumLipDex += (org.prehensileLipDexterity || 0.83);
                        sumIncisor += (org.conicalIncisorStripping || 0.84);
                        sumExtraction += (org.foliageCaloricExtraction || 0.86);
                        sumGiganto += (org.gigantothermicMetabolicEfficiency || 0.78);
                        sumPEI += (org.paraceratheriidElevationIndex || 0);
                        sumBFI += (org.browsingFoliageIndex || 0);

                        if (org.isStanceLocked) activeLocks++;
                        if (org.isCanopyBrowsing) activeBrowsers++;
                    }
                }
            }

            // Sync with manager metrics if available
            if (manager && typeof manager.getMetrics === "function") {
                const mm = manager.getMetrics();
                if (mm && mm.totalParaceratheriids > 0) {
                    this.metrics.totalParaceratheriids = mm.totalParaceratheriids;
                    this.metrics.activeColumnarLocks = mm.activeColumnarStanceLocks || activeLocks;
                    this.metrics.activeCanopyBrowsers = mm.activeCanopyBrowsers || activeBrowsers;
                    this.metrics.meanColumnarLock = mm.meanColumnarLock || 0.88;
                    this.metrics.meanHydraulicBuffer = mm.meanHydraulicBuffer || 0.89;
                    this.metrics.meanCervicalSpan = mm.meanCervicalSpan || 2.30;
                    this.metrics.meanCanopyReach = mm.meanCanopyReach || 7.50;
                    this.metrics.meanLipDexterity = mm.meanLipDexterity || 0.83;
                    this.metrics.meanIncisorStripping = mm.meanIncisorStripping || 0.84;
                    this.metrics.meanFoliageExtraction = mm.meanFoliageExtraction || 0.86;
                    this.metrics.meanGigantothermy = mm.meanGigantothermy || 0.78;
                    this.metrics.meanPEI = mm.meanParaceratheriidElevationIndex || 0;
                    this.metrics.meanBFI = mm.meanBrowsingFoliageIndex || 0;
                } else if (count > 0) {
                    this.metrics.totalParaceratheriids = count;
                    this.metrics.activeColumnarLocks = activeLocks;
                    this.metrics.activeCanopyBrowsers = activeBrowsers;
                    this.metrics.meanColumnarLock = sumColLock / count;
                    this.metrics.meanHydraulicBuffer = sumHydBuffer / count;
                    this.metrics.meanCervicalSpan = sumCervSpan / count;
                    this.metrics.meanCanopyReach = sumCanopyReach / count;
                    this.metrics.meanLipDexterity = sumLipDex / count;
                    this.metrics.meanIncisorStripping = sumIncisor / count;
                    this.metrics.meanFoliageExtraction = sumExtraction / count;
                    this.metrics.meanGigantothermy = sumGiganto / count;
                    this.metrics.meanPEI = sumPEI / count;
                    this.metrics.meanBFI = sumBFI / count;
                } else {
                    this.metrics.totalParaceratheriids = 0;
                    this.metrics.meanPEI = 0.0;
                    this.metrics.meanBFI = 0.0;
                }
            } else if (count > 0) {
                this.metrics.totalParaceratheriids = count;
                this.metrics.activeColumnarLocks = activeLocks;
                this.metrics.activeCanopyBrowsers = activeBrowsers;
                this.metrics.meanColumnarLock = sumColLock / count;
                this.metrics.meanHydraulicBuffer = sumHydBuffer / count;
                this.metrics.meanCervicalSpan = sumCervSpan / count;
                this.metrics.meanCanopyReach = sumCanopyReach / count;
                this.metrics.meanLipDexterity = sumLipDex / count;
                this.metrics.meanIncisorStripping = sumIncisor / count;
                this.metrics.meanFoliageExtraction = sumExtraction / count;
                this.metrics.meanGigantothermy = sumGiganto / count;
                this.metrics.meanPEI = sumPEI / count;
                this.metrics.meanBFI = sumBFI / count;
            } else {
                this.metrics.totalParaceratheriids = 0;
                this.metrics.meanPEI = 0.0;
                this.metrics.meanBFI = 0.0;
            }

            this.metrics.peiRegime = ParaceratheriumTelemetryManager.classifyPEIRegime(this.metrics.meanPEI).code;
            this.metrics.bfiRegime = ParaceratheriumTelemetryManager.classifyBFIRegime(this.metrics.meanBFI).code;

            return Object.assign({}, this.metrics);
        }

        /**
         * Update laboratory DOM telemetry elements.
         * @param {Object} metrics - Telemetry metrics object.
         */
        updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const m = metrics || this.metrics;
            const peiRegime = ParaceratheriumTelemetryManager.classifyPEIRegime(m.meanPEI);
            const bfiRegime = ParaceratheriumTelemetryManager.classifyBFIRegime(m.meanBFI);

            // 139th Channel: % PEI
            const elPEIVal = document.getElementById("valPEIIndex");
            if (elPEIVal) {
                elPEIVal.innerHTML = `<span class="${peiRegime.badgeClass}">${m.meanPEI.toFixed(1)}% PEI</span> (${peiRegime.label})`;
                elPEIVal.style.color = peiRegime.color;
            }

            const elPEIStatus = document.getElementById("valPEIStatus");
            if (elPEIStatus) {
                elPEIStatus.textContent = `TITANS: ${m.totalParaceratheriids} | COLUMNAR LOCK: ${(m.meanColumnarLock * 100).toFixed(1)}% | CERVICAL: ${m.meanCervicalSpan.toFixed(2)}m | CANOPY REACH: ${m.meanCanopyReach.toFixed(1)}m | STANCE LOCKED: ${m.activeColumnarLocks}`;
                elPEIStatus.style.color = "#34d399";
            }

            // 140th Channel: % BFI
            const elBFIVal = document.getElementById("valBFIIndex");
            if (elBFIVal) {
                elBFIVal.innerHTML = `<span class="${bfiRegime.badgeClass}">${m.meanBFI.toFixed(1)}% BFI</span> (${bfiRegime.label})`;
                elBFIVal.style.color = bfiRegime.color;
            }

            const elBFIStatus = document.getElementById("valBFIStatus");
            if (elBFIStatus) {
                elBFIStatus.textContent = `CANOPY BROWSERS: ${m.activeCanopyBrowsers} | PREHENSILE LIP: ${(m.meanLipDexterity * 100).toFixed(1)}% | INCISOR STRIP: ${(m.meanIncisorStripping * 100).toFixed(1)}% | EXTRACTION: ${(m.meanFoliageExtraction * 100).toFixed(1)}% | GIGANTOTHERMY: ${(m.meanGigantothermy * 100).toFixed(1)}%`;
                elBFIStatus.style.color = "#fbbf24";
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

            if (Array.isArray(historyData.paraceratheriidElevationIndex)) {
                historyData.paraceratheriidElevationIndex.shift();
                historyData.paraceratheriidElevationIndex.push(Math.max(0, Math.min(100, m.meanPEI || 0)));
            }

            if (Array.isArray(historyData.browsingFoliageIndex)) {
                historyData.browsingFoliageIndex.shift();
                historyData.browsingFoliageIndex.push(Math.max(0, Math.min(100, m.meanBFI || 0)));
            }
        }

        /**
         * Full step invocation: compute metrics, update DOM, and push to history buffers.
         * @param {Array<Object>} organisms - Active simulation organisms.
         * @param {Object} historyData - Global history buffers.
         * @param {Object} manager - ParaceratheriumTitanManager instance.
         */
        static step(organisms, historyData, manager) {
            if (!global.paraceratheriumTelemetryManager) {
                global.paraceratheriumTelemetryManager = new ParaceratheriumTelemetryManager();
            }
            const tm = global.paraceratheriumTelemetryManager;
            const metrics = tm.computeMetrics(organisms, manager);
            tm.updateHistoryBuffers(historyData, metrics);
            tm.updateDOM(metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ParaceratheriumTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.ParaceratheriumTelemetryManager = ParaceratheriumTelemetryManager;
        global.paraceratheriumTelemetryManager = new ParaceratheriumTelemetryManager();
    }
})(typeof window !== "undefined" ? window : global);
