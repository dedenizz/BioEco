// BioEcosystem - Semiconductor Transistors, Microprocessors & Global Packet-Switched Internet
// Module: src/organs/silicon_internet.js
// Version: 14.8.0 (Hour 768 - System Agent: CMOS Logic Gates, Microprocessor Compute, Fiber-Optic Routing & 183rd/184th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * SiliconInternetManager
     * Core evolutionary, computational, and packet-switched networking dynamics for Digital Homo sapiens:
     * 1. Semiconductor Transistor Gate Density:
     *    - High-density CMOS switching and low-loss logic gates (semiconductorGateDensity: 0.80 - 0.98).
     * 2. Microprocessor Parallel Compute Flux:
     *    - Real-time resource optimization and instruction execution bursts (microprocessorComputeFlux: 0.80 - 0.98).
     * 3. Global Packet-Switched Internet Backbone:
     *    - Addressable fiber-optic packet routing and shared digital knowledge (packetSwitchedBandwidth: 0.80 - 0.98, digitalCoordinationMultiplier: 1.8 - 3.6).
     * 4. 183rd & 184th Telemetry Channel Indices:
     *    - 183rd Channel: % SMC (Semiconductor & Microprocessor Compute Index, Silicon Cyan #06b6d4)
     *    - 184th Channel: % GIN (Global Internet & Fiber Network Index, Fiber Indigo #6366f1)
     */
    class SiliconInternetManager {
        /**
         * Initialize Semiconductor, Microprocessor, and Global Internet Manager.
         */
        constructor() {
            this.metrics = {
                totalDigitalCitizens: 0,
                activeSemiconductorNodes: 0,
                activeMicroprocessors: 0,
                activeInternetRouters: 0,
                meanGateDensity: 0.89,
                meanComputeFlux: 0.89,
                meanPacketBandwidth: 0.89,
                meanDigitalMultiplier: 2.70,
                meanSMCIndex: 0.0,
                meanGINIndex: 0.0,
                transistorSwitchCycles: 0,
                cpuInstructionBursts: 0,
                internetPacketsRouted: 0,
                digitalKnowledgeStored: 0.0,
                harvestedSiliconBiomass: 0.0,
                cumulativeSiliconBiomass: 0.0
            };
        }

        /**
         * Process a single simulation step for organism population.
         * @param {Array} organisms - Population array.
         * @param {Object} spatialGrid - Spatial collision grid.
         * @param {number} dt - Delta time multiplier.
         */
        step(organisms, spatialGrid, dt) {
            if (!Array.isArray(organisms) || organisms.length === 0) return;

            let citizens = 0;
            let semis = 0;
            let cpus = 0;
            let routers = 0;

            let sumGate = 0;
            let sumCompute = 0;
            let sumBand = 0;
            let sumMult = 0;
            let sumSMC = 0;
            let sumGIN = 0;
            let totalBio = 0;

            const stepDt = dt || 1.0;

            for (let i = 0; i < organisms.length; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                const isEligibleHuman = org.hasAviationRadio || org.hasElectricNitrogen || org.hasIndustrialSteam || org.hasRenaissancePrinting || org.hasMedievalNavigation || org.hasClassicalHydraulics || org.hasIronMaritime || org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 50);

                if (isEligibleHuman && org.hasSiliconInternet === undefined) {
                    const adoptsSilicon = (org.generation >= 3) || (org.hasAviationRadio) || (Math.random() < 0.72);
                    org.hasSiliconInternet = adoptsSilicon;

                    if (adoptsSilicon) {
                        org.semiconductorGateDensity = 0.80 + Math.random() * 0.18;
                        org.hasSemiconductor = Math.random() < 0.80;
                        org.gateSwitchTimer = Math.floor(Math.random() * 12);
                        org.isSwitchingLogic = false;

                        org.microprocessorComputeFlux = 0.80 + Math.random() * 0.18;
                        org.hasMicroprocessor = Math.random() < 0.78;
                        org.cpuBurstTimer = Math.floor(Math.random() * 14);
                        org.isComputingCPU = false;

                        org.packetSwitchedBandwidth = 0.80 + Math.random() * 0.18;
                        org.digitalCoordinationMultiplier = 1.80 + Math.random() * 1.80;
                        org.hasGlobalInternet = Math.random() < 0.78;
                        org.packetRouteTimer = Math.floor(Math.random() * 10);
                        org.isRoutingPackets = false;

                        org.storedDigitalKnowledge = 32.0 + Math.random() * 34.0;
                        org.semiconductorComputeIndex = 0;
                        org.globalInternetIndex = 0;
                    }
                }

                if (org.hasSiliconInternet) {
                    citizens++;
                    totalBio += (org.mass || 50.0);

                    // A. Semiconductor Transistor Gate Density
                    if (org.hasSemiconductor) {
                        semis++;
                        sumGate += (org.semiconductorGateDensity || 0.89);
                        org.gateSwitchTimer = (org.gateSwitchTimer || 0) + stepDt;
                        if (org.gateSwitchTimer >= 10) {
                            org.gateSwitchTimer = 0;
                            org.isSwitchingLogic = true;
                            this.metrics.transistorSwitchCycles++;
                        } else if (org.gateSwitchTimer >= 4) {
                            org.isSwitchingLogic = false;
                        }
                    }

                    // B. Microprocessor Parallel Compute Flux
                    if (org.hasMicroprocessor) {
                        cpus++;
                        sumCompute += (org.microprocessorComputeFlux || 0.89);
                        org.cpuBurstTimer = (org.cpuBurstTimer || 0) + stepDt;
                        if (org.cpuBurstTimer >= 12) {
                            org.cpuBurstTimer = 0;
                            org.isComputingCPU = true;
                            this.metrics.cpuInstructionBursts++;
                            org.energy = Math.min(org.maxEnergy || 225, (org.energy || 100) + 1.95 * (org.microprocessorComputeFlux || 0.89));
                        } else if (org.cpuBurstTimer >= 5) {
                            org.isComputingCPU = false;
                        }
                    }

                    // C. Global Packet-Switched Internet Backbone
                    if (org.hasGlobalInternet) {
                        routers++;
                        sumBand += (org.packetSwitchedBandwidth || 0.89);
                        sumMult += (org.digitalCoordinationMultiplier || 2.70);
                        org.packetRouteTimer = (org.packetRouteTimer || 0) + stepDt;
                        if (org.packetRouteTimer >= 8) {
                            org.packetRouteTimer = 0;
                            org.isRoutingPackets = true;
                            this.metrics.internetPacketsRouted++;
                            const dataGain = 1.75 * (org.packetSwitchedBandwidth || 0.89) * ((org.digitalCoordinationMultiplier || 2.70) / 2.3);
                            org.storedDigitalKnowledge = Math.min(240.0, (org.storedDigitalKnowledge || 32.0) + dataGain);
                            this.metrics.digitalKnowledgeStored += dataGain * 0.08;
                            this.metrics.harvestedSiliconBiomass += dataGain * 0.18;
                        } else if (org.packetRouteTimer >= 4) {
                            org.isRoutingPackets = false;
                        }
                    }

                    // D. Compute 183rd Channel (% SMC - Semiconductor & Microprocessor Compute Index)
                    const gateNorm = org.hasSemiconductor ? (org.semiconductorGateDensity || 0.89) : 0.25;
                    const cpuNorm = org.hasMicroprocessor ? (org.microprocessorComputeFlux || 0.89) : 0.25;
                    const syncNorm = (org.hasSemiconductor && org.hasMicroprocessor) ? 0.92 : (org.hasSemiconductor ? 0.72 : 0.20);
                    const smc = Math.max(0, Math.min(100, (
                        gateNorm * 0.40 +
                        cpuNorm * 0.35 +
                        syncNorm * 0.25
                    ) * 100.0));
                    org.semiconductorComputeIndex = smc;
                    sumSMC += smc;

                    // E. Compute 184th Channel (% GIN - Global Internet & Fiber Network Index)
                    const bandNorm = org.hasGlobalInternet ? (org.packetSwitchedBandwidth || 0.89) : 0.25;
                    const multNorm = org.hasGlobalInternet ? Math.min(1.0, 0.55 + (((org.digitalCoordinationMultiplier || 2.70) - 1.8) / 1.8) * 0.45) : 0.30;
                    const knowNorm = org.hasGlobalInternet ? Math.min(1.0, 0.60 + ((org.storedDigitalKnowledge || 32.0) / 240.0) * 0.40) : 0.25;
                    const gin = Math.max(0, Math.min(100, (
                        bandNorm * 0.40 +
                        multNorm * 0.30 +
                        knowNorm * 0.30
                    ) * 100.0));
                    org.globalInternetIndex = gin;
                    sumGIN += gin;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalDigitalCitizens = citizens;
            this.metrics.activeSemiconductorNodes = semis;
            this.metrics.activeMicroprocessors = cpus;
            this.metrics.activeInternetRouters = routers;

            this.metrics.meanGateDensity = semis > 0 ? (sumGate / semis) : 0.89;
            this.metrics.meanComputeFlux = cpus > 0 ? (sumCompute / cpus) : 0.89;
            this.metrics.meanPacketBandwidth = routers > 0 ? (sumBand / routers) : 0.89;
            this.metrics.meanDigitalMultiplier = routers > 0 ? (sumMult / routers) : 2.70;

            this.metrics.meanSMCIndex = citizens > 0 ? (sumSMC / citizens) : 0.0;
            this.metrics.meanGINIndex = citizens > 0 ? (sumGIN / citizens) : 0.0;
            this.metrics.cumulativeSiliconBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.SiliconInternetManager = SiliconInternetManager;
    if (typeof window !== "undefined") {
        window.siliconInternetManager = new SiliconInternetManager();
    }
})(typeof window !== "undefined" ? window : global);
