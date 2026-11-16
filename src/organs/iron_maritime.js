// BioEcosystem - Iron Age Bloomery Smelting, Carburized Steel, Maritime Trade & Cuneiform Ledgers
// Module: src/organs/iron_maritime.js
// Version: 11.3.0 (Hour 733 - System Agent: 1250C Bloomery Iron Smelting, Carburized Steel Hardening, Keeled Maritime Galleys, Cuneiform Ledgers & 169th/170th Channels)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    /**
     * IronMaritimeManager
     * Core evolutionary, metallurgical, and maritime dynamics for Iron Age Homo sapiens:
     * 1. 1250 C Bloomery Iron Smelting & Carburized Steel Hardening:
     *    - Smelting abundant hematite/magnetite iron ores in bloomery furnaces (ironBloomerySmelting: 0.80 - 0.98).
     *    - Charcoal carburization and quenching into high-tensile steel blades and deep-plough shares (carburizedSteelHardening: 0.85 - 0.99).
     * 2. Keeled Maritime Merchant Galleys & Open-Sea Navigation:
     *    - Square-rigged, keeled merchant vessels carrying bulk grain and ore across coastal & pelagic routes (maritimeShipNavigation: 0.80 - 0.98, maritimeTradeRange: 2.0 - 3.5).
     * 3. Cuneiform Ledger Accounting & Port Archives:
     *    - Written clay/parchment ledger accounting tracking ship manifests and port granary reserves (cuneiformLedgerAccounting: 0.80 - 0.98).
     * 4. 169th & 170th Telemetry Channel Indices:
     *    - 169th Channel: % ISI (Iron Smelting & Steel Index, Steel Slate #64748b)
     *    - 170th Channel: % MTI (Maritime Trade & Navigation Index, Maritime Teal #0d9488)
     */
    class IronMaritimeManager {
        /**
         * Initialize Iron Age Smelting, Maritime Trade, and Ledger Manager.
         */
        constructor() {
            this.metrics = {
                totalIronCitizens: 0,
                activeIronForges: 0,
                activeMaritimeVessels: 0,
                activeLedgerScribes: 0,
                meanBloomerySmelting: 0.89,
                meanSteelHardening: 0.92,
                meanMaritimeNavigation: 0.89,
                meanMaritimeRange: 2.75,
                meanLedgerAccounting: 0.89,
                meanISIIndex: 0.0,
                meanMTIIndex: 0.0,
                steelIngotsForged: 0,
                maritimeVoyagesCompleted: 0,
                ledgerEntriesRecorded: 0,
                portGranaryStored: 0.0,
                harvestedIronBiomass: 0.0,
                cumulativeIronBiomass: 0.0
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
            let forges = 0;
            let vessels = 0;
            let scribes = 0;

            let sumSmelt = 0;
            let sumSteel = 0;
            let sumNav = 0;
            let sumRange = 0;
            let sumLedger = 0;

            let sumISI = 0;
            let sumMTI = 0;
            let totalBio = 0;

            const popLen = organisms.length;
            for (let i = 0; i < popLen; i++) {
                const org = organisms[i];
                if (!org || !org.alive) continue;

                // Eligibility: Bronze citizens, Chalcolithic artisans, pastoralists, Neolithic farmers, advanced hominins
                const isEligibleHuman = org.hasBronzeUrbanism || org.hasChalcolithicMetallurgy || org.hasPastoralDomestication || org.hasNeolithicAgriculture || org.isUpperPaleolithicSapiens || org.isHomo || (org.isHominin && org.generation >= 38);

                if (isEligibleHuman && org.hasIronMaritime === undefined) {
                    const adoptsIron = Math.random() < 0.65;
                    org.hasIronMaritime = adoptsIron;

                    if (adoptsIron) {
                        // 1. Bloomery Iron Smelting & Carburized Steel
                        org.hasIronForge = Math.random() < 0.78;
                        org.ironBloomerySmelting = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.carburizedSteelHardening = 0.85 + Math.random() * 0.14; // 0.85 - 0.99
                        org.steelStockpile = 2 + Math.floor(Math.random() * 5);
                        org.isForgingSteel = false;

                        // 2. Keeled Maritime Merchant Galleys
                        org.hasMaritimeShip = Math.random() < 0.76;
                        org.maritimeShipNavigation = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.maritimeTradeRange = 2.0 + Math.random() * 1.5; // 2.0 - 3.5
                        org.isSailingTrade = false;

                        // 3. Cuneiform Ledger Accounting & Port Archives
                        org.hasLedgerArchive = Math.random() < 0.75;
                        org.cuneiformLedgerAccounting = 0.80 + Math.random() * 0.18; // 0.80 - 0.98
                        org.storedMaritimeSurplus = 16.0 + Math.random() * 32.0;
                        org.isRecordingLedger = false;

                        // Telemetry Channel Indices
                        org.ironSteelIndex = 0.0;
                        org.maritimeTradeIndex = 0.0;
                    }
                }

                if (org.hasIronMaritime) {
                    citizens++;
                    totalBio += (org.mass || 1.0) * 36.0;

                    // A. Bloomery Smelting & Carburized Steel Forging
                    if (org.hasIronForge) {
                        forges++;
                        sumSmelt += org.ironBloomerySmelting || 0.89;
                        sumSteel += org.carburizedSteelHardening || 0.92;

                        if (Math.random() < 0.018) {
                            org.isForgingSteel = true;
                            org.steelStockpile = Math.min(35, (org.steelStockpile || 2) + 1);
                            this.metrics.steelIngotsForged++;
                            const steelBonus = (org.carburizedSteelHardening || 0.92) * 1.85;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + steelBonus);
                            this.metrics.harvestedIronBiomass += steelBonus;
                        } else {
                            org.isForgingSteel = false;
                        }
                    }

                    // B. Keeled Maritime Galleys & Open-Sea Trade
                    if (org.hasMaritimeShip) {
                        vessels++;
                        sumNav += org.maritimeShipNavigation || 0.89;
                        sumRange += org.maritimeTradeRange || 2.75;

                        if (Math.random() < 0.020) {
                            org.isSailingTrade = true;
                            this.metrics.maritimeVoyagesCompleted++;
                            const seaYield = (org.maritimeShipNavigation || 0.89) * (org.maritimeTradeRange || 2.75) * 1.05;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + seaYield);
                            org.storedMaritimeSurplus = Math.min(110.0, (org.storedMaritimeSurplus || 16.0) + seaYield * 0.45);
                            this.metrics.harvestedIronBiomass += seaYield;
                        } else {
                            org.isSailingTrade = false;
                        }
                    }

                    // C. Cuneiform Ledger Accounting & Port Granary Management
                    if (org.hasLedgerArchive) {
                        scribes++;
                        sumLedger += org.cuneiformLedgerAccounting || 0.89;

                        if (Math.random() < 0.022) {
                            org.isRecordingLedger = true;
                            this.metrics.ledgerEntriesRecorded++;
                            const archiveYield = (org.cuneiformLedgerAccounting || 0.89) * 2.65;
                            org.energy = Math.min((org.maxEnergy || 100.0), (org.energy || 50.0) + archiveYield);
                            org.storedMaritimeSurplus = Math.min(110.0, (org.storedMaritimeSurplus || 16.0) + archiveYield * 0.50);
                            this.metrics.portGranaryStored += archiveYield * 0.50;
                            this.metrics.harvestedIronBiomass += archiveYield;
                        } else {
                            org.isRecordingLedger = false;
                        }

                        // Emergency draw from port granary during low energy
                        if ((org.energy || 50.0) < 35.0 && (org.storedMaritimeSurplus || 0) > 2.5) {
                            const draw = Math.min(org.storedMaritimeSurplus, 6.5);
                            org.storedMaritimeSurplus -= draw;
                            org.energy += draw * 0.98;
                        }
                    }

                    // D. Compute 169th Channel (% ISI - Iron Smelting & Steel Index)
                    const smeltNorm = org.hasIronForge ? (org.ironBloomerySmelting || 0.89) : 0.25;
                    const steelNorm = org.hasIronForge ? (org.carburizedSteelHardening || 0.92) : 0.30;
                    const forgeNorm = org.hasIronForge ? Math.min(1.0, 0.72 + (org.steelStockpile || 2) * 0.025) : 0.20;
                    const isi = Math.max(0, Math.min(100, (
                        smeltNorm * 0.40 +
                        steelNorm * 0.35 +
                        forgeNorm * 0.25
                    ) * 100.0));
                    org.ironSteelIndex = isi;
                    sumISI += isi;

                    // E. Compute 170th Channel (% MTI - Maritime Trade & Navigation Index)
                    const navNorm = org.hasMaritimeShip ? (org.maritimeShipNavigation || 0.89) : 0.25;
                    const ledgerNorm = org.hasLedgerArchive ? (org.cuneiformLedgerAccounting || 0.89) : 0.25;
                    const rangeNorm = org.hasMaritimeShip ? Math.min(1.0, 0.55 + (((org.maritimeTradeRange || 2.75) - 2.0) / 1.5) * 0.45) : 0.30;
                    const mti = Math.max(0, Math.min(100, (
                        navNorm * 0.35 +
                        ledgerNorm * 0.35 +
                        rangeNorm * 0.30
                    ) * 100.0));
                    org.maritimeTradeIndex = mti;
                    sumMTI += mti;
                }
            }

            // Aggregation of Metrics
            this.metrics.totalIronCitizens = citizens;
            this.metrics.activeIronForges = forges;
            this.metrics.activeMaritimeVessels = vessels;
            this.metrics.activeLedgerScribes = scribes;

            this.metrics.meanBloomerySmelting = forges > 0 ? (sumSmelt / forges) : 0.89;
            this.metrics.meanSteelHardening = forges > 0 ? (sumSteel / forges) : 0.92;
            this.metrics.meanMaritimeNavigation = vessels > 0 ? (sumNav / vessels) : 0.89;
            this.metrics.meanMaritimeRange = vessels > 0 ? (sumRange / vessels) : 2.75;
            this.metrics.meanLedgerAccounting = scribes > 0 ? (sumLedger / scribes) : 0.89;

            this.metrics.meanISIIndex = citizens > 0 ? (sumISI / citizens) : 0.0;
            this.metrics.meanMTIIndex = citizens > 0 ? (sumMTI / citizens) : 0.0;
            this.metrics.cumulativeIronBiomass = totalBio;
        }

        /**
         * Get aggregated metrics snapshot.
         * @returns {Object} Metrics.
         */
        getMetrics() {
            return Object.assign({}, this.metrics);
        }
    }

    global.IronMaritimeManager = IronMaritimeManager;
    if (typeof window !== "undefined") {
        window.ironMaritimeManager = new IronMaritimeManager();
    }
})(typeof window !== "undefined" ? window : global);
