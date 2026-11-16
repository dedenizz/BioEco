// BioEcosystem - Oligocene-Early Miocene Apex Omnivore Radiation Telemetry Dashboard
// Module: src/ui/telemetry_entelodont.js
// Version: 9.37.0 (Hour 657 - Looks & UI Agent: 141st Channel % EBI, 142nd Channel % OFI, Bone White & Rust Red Badges, HUD & History Buffers)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * EntelodontTelemetryManager
     * Telemetry computation, laboratory HUD rendering, and historical circular buffer tracking for:
     * - 141st Telemetry Channel: Entelodont Bite & Bone-Crushing Index (% EBI) - Bone White / Dark Graphite (#475569, #e2e8f0)
     * - 142nd Telemetry Channel: Omnivorous Flange & Foraging Index (% OFI) - Rust Red / Dark Crimson (#dc2626, #991b1b)
     * - 4 Biological Regimes for % EBI (BASAL_SUID_FORAGING, INCIPIENT_BONE_NIPPER, CRANIOMANDIBULAR_CRUSHER, APEX_HELL_PIG_TITAN)
     * - 4 Biological Regimes for % OFI (OPPORTUNISTIC_ROOT_DIGGER, FACIAL_FLANGE_PROWLER, AGGRESSIVE_CARCASS_PIRATE, TERRESTRIAL_TERMINATOR_FORAGER)
     * - Real-time tracking of craniomandibular crush force, premolar bone crushing, marrow extraction yield,
     *   zygomatic flange expansion, mandibular tubercle defense, wither spine support, and cervical whip torque.
     */
    class EntelodontTelemetryManager {
        /**
         * Initialize Entelodont telemetry manager.
         */
        constructor() {
            this.metrics = {
                totalEntelodonts: 0,
                totalDaeodons: 0,
                activeBoneCrushers: 0,
                activeFlangeDefenders: 0,
                meanCrushForce: 3500.0,
                meanPremolarCrush: 0.84,
                meanMarrowYield: 0.82,
                meanZygomaticFlange: 0.86,
                meanMandibularTubercle: 0.83,
                meanWitherSupport: 0.82,
                meanCervicalWhip: 0.86,
                meanRunningVelocity: 3.40,
                meanScavengingDrive: 0.86,
                meanEBI: 0.0,
                meanOFI: 0.0,
                ebiRegime: "BASAL_SUID_FORAGING",
                ofiRegime: "OPPORTUNISTIC_ROOT_DIGGER"
            };
        }

        /**
         * Classify biological regime for 141st Channel (% EBI).
         * @param {number} val - Entelodont Bite Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyEBIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "BASAL_SUID_FORAGING",
                    label: "BASAL SUID FORAGING & SOFT ROOTS",
                    badgeClass: "ebi-badge ebi-basal",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "INCIPIENT_BONE_NIPPER",
                    label: "INCIPIENT BONE NIPPER & TISSUE TEAR",
                    badgeClass: "ebi-badge ebi-incipient",
                    color: "#cbd5e1"
                };
            } else if (v < 75.0) {
                return {
                    code: "CRANIOMANDIBULAR_CRUSHER",
                    label: "CRANIOMANDIBULAR CRUSHER & MARROW HARVEST",
                    badgeClass: "ebi-badge ebi-crusher",
                    color: "#e2e8f0"
                };
            } else {
                return {
                    code: "APEX_HELL_PIG_TITAN",
                    label: "APEX HELL PIG TITAN & 4500N BONE OBLITERATION",
                    badgeClass: "ebi-badge ebi-titan",
                    color: "#f8fafc"
                };
            }
        }

        /**
         * Classify biological regime for 142nd Channel (% OFI).
         * @param {number} val - Omnivorous Flange Index percentage [0, 100].
         * @returns {Object} Regime code, label, badge class, and color.
         */
        static classifyOFIRegime(val) {
            const v = Math.max(0, Math.min(100, val || 0));
            if (v < 25.0) {
                return {
                    code: "OPPORTUNISTIC_ROOT_DIGGER",
                    label: "OPPORTUNISTIC ROOT DIGGER & BULB FORAGER",
                    badgeClass: "ofi-badge ofi-root",
                    color: "#94a3b8"
                };
            } else if (v < 50.0) {
                return {
                    code: "FACIAL_FLANGE_PROWLER",
                    label: "FACIAL FLANGE PROWLER & INCIPIENT COMBAT",
                    badgeClass: "ofi-badge ofi-flange",
                    color: "#f87171"
                };
            } else if (v < 75.0) {
                return {
                    code: "AGGRESSIVE_CARCASS_PIRATE",
                    label: "AGGRESSIVE CARCASS PIRATE & CLASH PARRIER",
                    badgeClass: "ofi-badge ofi-pirate",
                    color: "#ef4444"
                };
            } else {
                return {
                    code: "TERRESTRIAL_TERMINATOR_FORAGER",
                    label: "TERRESTRIAL TERMINATOR FORAGER & UNRIVALED SCAVENGER",
                    badgeClass: "ofi-badge ofi-terminator",
                    color: "#dc2626"
                };
            }
        }

        /**
         * Compute telemetry metrics across active organisms and organ manager.
         * @param {Array<Object>} organisms - Simulation organisms array.
         * @param {Object} manager - EntelodontBiomechanicsManager instance.
         * @returns {Object} Updated metrics object.
         */
        computeMetrics(organisms, manager) {
            let count = 0;
            let daeodonCount = 0;
            let sumCrush = 0;
            let sumPremolar = 0;
            let sumMarrow = 0;
            let sumFlange = 0;
            let sumTubercle = 0;
            let sumWither = 0;
            let sumWhip = 0;
            let sumRunningVel = 0;
            let sumScavenging = 0;
            let sumEBI = 0;
            let sumOFI = 0;
            let activeCrushers = 0;
            let activeDefenders = 0;

            if (Array.isArray(organisms)) {
                for (let i = 0; i < organisms.length; i++) {
                    const org = organisms[i];
                    if (org && org.isEntelodont) {
                        count++;
                        if (org.isDaeodon) daeodonCount++;
                        sumCrush += (org.craniomandibularCrushForce || 3500);
                        sumPremolar += (org.premolarBoneCrushingRate || 0.84);
                        sumMarrow += (org.boneMarrowExtractionYield || 0.82);
                        sumFlange += (org.zygomaticFlangeExpansion || 0.86);
                        sumTubercle += (org.mandibularTubercleDefense || 0.83);
                        sumWither += (org.dorsalWitherSpineSupport || 0.82);
                        sumWhip += (org.cervicalWhipTorque || 0.86);
                        sumRunningVel += (org.subunguligradeRunningVelocity || 3.40);
                        sumScavenging += (org.omnivorousScavengingDrive || 0.86);
                        sumEBI += (org.entelodontBiteIndex || 0);
                        sumOFI += (org.omnivorousFlangeIndex || 0);

                        if (org.isBoneCrushing) activeCrushers++;
                        if (org.isFlangeDefending) activeDefenders++;
                    }
                }
            }

            // Sync with manager metrics if available
            if (manager && typeof manager.getMetrics === "function") {
                const mm = manager.getMetrics();
                if (mm && mm.totalEntelodonts > 0) {
                    this.metrics.totalEntelodonts = mm.totalEntelodonts;
                    this.metrics.totalDaeodons = mm.totalDaeodons || daeodonCount;
                    this.metrics.activeBoneCrushers = mm.activeBoneCrushers || activeCrushers;
                    this.metrics.activeFlangeDefenders = mm.activeFlangeDefenders || activeDefenders;
                    this.metrics.meanCrushForce = mm.meanCrushForce || 3500.0;
                    this.metrics.meanPremolarCrush = mm.meanPremolarCrush || 0.84;
                    this.metrics.meanMarrowYield = mm.meanMarrowYield || 0.82;
                    this.metrics.meanZygomaticFlange = mm.meanZygomaticFlange || 0.86;
                    this.metrics.meanMandibularTubercle = mm.meanMandibularTubercle || 0.83;
                    this.metrics.meanWitherSupport = mm.meanWitherSupport || 0.82;
                    this.metrics.meanCervicalWhip = mm.meanCervicalWhip || 0.86;
                    this.metrics.meanRunningVelocity = mm.meanRunningVelocity || 3.40;
                    this.metrics.meanScavengingDrive = mm.meanScavengingDrive || 0.86;
                    this.metrics.meanEBI = mm.meanEntelodontBiteIndex || 0;
                    this.metrics.meanOFI = mm.meanOmnivorousFlangeIndex || 0;
                } else if (count > 0) {
                    this.metrics.totalEntelodonts = count;
                    this.metrics.totalDaeodons = daeodonCount;
                    this.metrics.activeBoneCrushers = activeCrushers;
                    this.metrics.activeFlangeDefenders = activeDefenders;
                    this.metrics.meanCrushForce = sumCrush / count;
                    this.metrics.meanPremolarCrush = sumPremolar / count;
                    this.metrics.meanMarrowYield = sumMarrow / count;
                    this.metrics.meanZygomaticFlange = sumFlange / count;
                    this.metrics.meanMandibularTubercle = sumTubercle / count;
                    this.metrics.meanWitherSupport = sumWither / count;
                    this.metrics.meanCervicalWhip = sumWhip / count;
                    this.metrics.meanRunningVelocity = sumRunningVel / count;
                    this.metrics.meanScavengingDrive = sumScavenging / count;
                    this.metrics.meanEBI = sumEBI / count;
                    this.metrics.meanOFI = sumOFI / count;
                } else {
                    this.metrics.totalEntelodonts = 0;
                    this.metrics.meanEBI = 0.0;
                    this.metrics.meanOFI = 0.0;
                }
            } else if (count > 0) {
                this.metrics.totalEntelodonts = count;
                this.metrics.totalDaeodons = daeodonCount;
                this.metrics.activeBoneCrushers = activeCrushers;
                this.metrics.activeFlangeDefenders = activeDefenders;
                this.metrics.meanCrushForce = sumCrush / count;
                this.metrics.meanPremolarCrush = sumPremolar / count;
                this.metrics.meanMarrowYield = sumMarrow / count;
                this.metrics.meanZygomaticFlange = sumFlange / count;
                this.metrics.meanMandibularTubercle = sumTubercle / count;
                this.metrics.meanWitherSupport = sumWither / count;
                this.metrics.meanCervicalWhip = sumWhip / count;
                this.metrics.meanRunningVelocity = sumRunningVel / count;
                this.metrics.meanScavengingDrive = sumScavenging / count;
                this.metrics.meanEBI = sumEBI / count;
                this.metrics.meanOFI = sumOFI / count;
            } else {
                this.metrics.totalEntelodonts = 0;
                this.metrics.meanEBI = 0.0;
                this.metrics.meanOFI = 0.0;
            }

            this.metrics.ebiRegime = EntelodontTelemetryManager.classifyEBIRegime(this.metrics.meanEBI).code;
            this.metrics.ofiRegime = EntelodontTelemetryManager.classifyOFIRegime(this.metrics.meanOFI).code;

            return Object.assign({}, this.metrics);
        }

        /**
         * Update laboratory DOM telemetry elements.
         * @param {Object} metrics - Telemetry metrics object.
         */
        updateDOM(metrics) {
            if (typeof document === "undefined") return;

            const m = metrics || this.metrics;
            const ebiRegime = EntelodontTelemetryManager.classifyEBIRegime(m.meanEBI);
            const ofiRegime = EntelodontTelemetryManager.classifyOFIRegime(m.meanOFI);

            // 141st Channel: % EBI
            const elEBIVal = document.getElementById("valEBIIndex");
            if (elEBIVal) {
                elEBIVal.innerHTML = `<span class="${ebiRegime.badgeClass}">${m.meanEBI.toFixed(1)}% EBI</span> (${ebiRegime.label})`;
                elEBIVal.style.color = ebiRegime.color;
            }

            const elEBIStatus = document.getElementById("valEBIStatus");
            if (elEBIStatus) {
                elEBIStatus.textContent = `ENTELODONTS: ${m.totalEntelodonts} (DAEODONS: ${m.totalDaeodons}) | CRUSH FORCE: ${m.meanCrushForce.toFixed(0)}N | PREMOLAR CRUSH: ${(m.meanPremolarCrush * 100).toFixed(1)}% | MARROW YIELD: ${(m.meanMarrowYield * 100).toFixed(1)}% | CRUSHERS: ${m.activeBoneCrushers}`;
                elEBIStatus.style.color = "#e2e8f0";
            }

            // 142nd Channel: % OFI
            const elOFIVal = document.getElementById("valOFIIndex");
            if (elOFIVal) {
                elOFIVal.innerHTML = `<span class="${ofiRegime.badgeClass}">${m.meanOFI.toFixed(1)}% OFI</span> (${ofiRegime.label})`;
                elOFIVal.style.color = ofiRegime.color;
            }

            const elOFIStatus = document.getElementById("valOFIStatus");
            if (elOFIStatus) {
                elOFIStatus.textContent = `ZYGOMATIC FLANGE: ${(m.meanZygomaticFlange * 100).toFixed(1)}% | TUBERCLE DEF: ${(m.meanMandibularTubercle * 100).toFixed(1)}% | WITHER SUPPORT: ${(m.meanWitherSupport * 100).toFixed(1)}% | CERVICAL WHIP: ${(m.meanCervicalWhip * 100).toFixed(1)}% | DEFENDERS: ${m.activeFlangeDefenders}`;
                elOFIStatus.style.color = "#f87171";
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

            if (Array.isArray(historyData.entelodontBiteIndex)) {
                historyData.entelodontBiteIndex.shift();
                historyData.entelodontBiteIndex.push(Math.max(0, Math.min(100, m.meanEBI || 0)));
            }

            if (Array.isArray(historyData.omnivorousFlangeIndex)) {
                historyData.omnivorousFlangeIndex.shift();
                historyData.omnivorousFlangeIndex.push(Math.max(0, Math.min(100, m.meanOFI || 0)));
            }
        }

        /**
         * Full step invocation: compute metrics, update DOM, and push to history buffers.
         * @param {Array<Object>} organisms - Active simulation organisms.
         * @param {Object} historyData - Global history buffers.
         * @param {Object} manager - EntelodontBiomechanicsManager instance.
         */
        static step(organisms, historyData, manager) {
            if (!global.entelodontTelemetryManager) {
                global.entelodontTelemetryManager = new EntelodontTelemetryManager();
            }
            const tm = global.entelodontTelemetryManager;
            const metrics = tm.computeMetrics(organisms, manager);
            tm.updateHistoryBuffers(historyData, metrics);
            tm.updateDOM(metrics);
            return metrics;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = EntelodontTelemetryManager;
    }
    if (typeof global !== "undefined") {
        global.EntelodontTelemetryManager = EntelodontTelemetryManager;
        global.entelodontTelemetryManager = new EntelodontTelemetryManager();
    }
})(typeof window !== "undefined" ? window : global);
