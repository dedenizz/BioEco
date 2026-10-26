// BioEcosystem - Chromatophore Pigment Cells & Dynamic Camouflage System
// Module: src/organs/chromatophores.js
// Version: 5.12.0 (Hour 232 - System Agent: Chromatophore Cells, Substrate Sensing & Dynamic Color Adaptation)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class ChromatophoreSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.expansionRate = typeof dna.chromatophoreExpansionRate === "number" ? dna.chromatophoreExpansionRate : 0.15;
            this.sensitivity = typeof dna.crypticMatchingSensitivity === "number" ? dna.crypticMatchingSensitivity : 0.25;
            this.iridophoreReflectance = typeof dna.iridophoreReflectance === "number" ? dna.iridophoreReflectance : 0.20;

            // Pigment layer expansion states [0.0 - 1.0]
            this.melanophoreDispersion = 0.20; // Dark/Brown eumelanin (absorptive)
            this.xanthophoreDispersion = 0.20; // Yellow pteridine (filtering)
            this.erythrophoreDispersion = 0.15; // Red carotenoid (startle/warning)
            this.cyanophoreDispersion = 0.15;  // Blue structural/chemical (iridescence)

            // Current active synthesized RGB
            this.currentR = 120.0;
            this.currentG = 120.0;
            this.currentB = 120.0;

            // Target assimilation RGB
            this.targetR = 120.0;
            this.targetG = 120.0;
            this.targetB = 120.0;

            // Cryptic matching telemetry and performance metrics
            this.crypticMatchingScore = 0.0; // Cryptic Camouflage Index (CCI) [0.0 - 1.0]
            this.predationDeterrence = 0.0;  // Apparent distance multiplier buffer [0.0 - 0.70]
            this.substrateAssimilation = 0.0; // Color convergence precision [0.0 - 1.0]
            
            // Substrate classification
            this.detectedSubstrate = "pelagic"; // pelagic, biofilm, reef, sediment, nest, refuge

            // Startle flash response state
            this.flashTicksRemaining = 0;
            this.flashDuration = 18; // 18 ticks of vivid warning pulse

            this.lastSampleTick = 0;
            this.sampleCadence = 12; // Sample substrate every 12 ticks
        }

        // Trigger startle flash defense when struck by a predator
        triggerStartleFlash() {
            this.flashTicksRemaining = this.flashDuration;
            // Carotenoid and cyanophore emergency burst (#f43f5e)
            this.erythrophoreDispersion = 0.95;
            this.cyanophoreDispersion = 0.85;
            this.melanophoreDispersion = 0.05;
        }

        // Sample substrate color, proximity, and geological/biological texture
        sampleSubstrate(benthicContext, biofilms, reefs, detritus, nestNodes) {
            const org = this.organism;
            if (!org || !org.alive) return;

            const ox = org.x;
            const oy = org.y;

            let r = 15.0, g = 23.0, b = 42.0; // Default: Aphotic pelagic water (#0f172a)
            let substrateType = "pelagic";
            let minDistanceSq = 3600.0; // 60px sensing radius squared

            // 1. Proximity check to Benthic Nest Nodes (Hive Violet #c084fc)
            if (nestNodes && Array.isArray(nestNodes)) {
                for (let i = 0; i < nestNodes.length; i++) {
                    const node = nestNodes[i];
                    if (!node || node.depleted) continue;
                    const dx = ox - node.x;
                    const dy = oy - node.y;
                    const dsq = dx * dx + dy * dy;
                    if (dsq < 3600.0 && dsq < minDistanceSq) {
                        minDistanceSq = dsq;
                        r = 192.0; g = 132.0; b = 252.0;
                        substrateType = "nest";
                    }
                }
            }

            // 2. Proximity check to Microbial Biofilm Mats (Emerald #10b981)
            if (biofilms && Array.isArray(biofilms)) {
                for (let i = 0; i < biofilms.length; i++) {
                    const bf = biofilms[i];
                    if (!bf || bf.depleted) continue;
                    const dx = ox - bf.x;
                    const dy = oy - bf.y;
                    const dsq = dx * dx + dy * dy;
                    if (dsq < 2500.0 && dsq < minDistanceSq) {
                        minDistanceSq = dsq;
                        r = 16.0; g = 185.0; b = 129.0;
                        substrateType = "biofilm";
                    }
                }
            }

            // 3. Proximity check to Mineral Reefs (Azure #0284c7)
            if (reefs && Array.isArray(reefs)) {
                for (let i = 0; i < reefs.length; i++) {
                    const rf = reefs[i];
                    if (!rf) continue;
                    const dx = ox - rf.x;
                    const dy = oy - rf.y;
                    const dsq = dx * dx + dy * dy;
                    if (dsq < 3600.0 && dsq < minDistanceSq) {
                        minDistanceSq = dsq;
                        r = 2.0; g = 132.0; b = 199.0;
                        substrateType = "reef";
                    }
                }
            }

            // 4. Benthic sediment and detrital floor checking (Amber brown #78350f)
            if (substrateType === "pelagic" && oy > 450.0) {
                const sedimentFactor = Math.min(1.0, (oy - 450.0) / 150.0);
                r = 15.0 + (120.0 - 15.0) * sedimentFactor;
                g = 23.0 + (53.0 - 23.0) * sedimentFactor;
                b = 42.0 + (15.0 - 42.0) * sedimentFactor;
                substrateType = "sediment";
            }

            this.targetR = r;
            this.targetG = g;
            this.targetB = b;
            this.detectedSubstrate = substrateType;
        }

        // Execute radial pigment dispersion and chromatic assimilation
        adaptPigments(dt) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Handle startle flash state if triggered
            if (this.flashTicksRemaining > 0) {
                this.flashTicksRemaining--;
                // Startle pulse: bright crimson-rose flash (#f43f5e)
                this.currentR += (244.0 - this.currentR) * 0.40;
                this.currentG += (63.0 - this.currentG) * 0.40;
                this.currentB += (94.0 - this.currentB) * 0.40;
                this.predationDeterrence = 0.70; // Maximum visual confusion
                this.substrateAssimilation = 0.05;
                this.crypticMatchingScore = 0.10;
                return;
            }

            const rate = Math.max(0.015, this.expansionRate * 0.16);

            // Smooth chromatic convergence towards sampled target
            this.currentR += (this.targetR - this.currentR) * rate;
            this.currentG += (this.targetG - this.currentG) * rate;
            this.currentB += (this.targetB - this.currentB) * rate;

            // Compute normalized Euclidean color disparity Delta E
            const dR = this.currentR - this.targetR;
            const dG = this.currentG - this.targetG;
            const dB = this.currentB - this.targetB;
            const colorDist = Math.sqrt(dR * dR + dG * dG + dB * dB);
            const maxDist = 441.67; // sqrt(255^2 + 255^2 + 255^2)

            const chromaticProximity = Math.max(0.0, 1.0 - (colorDist / maxDist));
            this.substrateAssimilation = Number(chromaticProximity.toFixed(3));

            // Adjust pigment dispersion layers to match target luminance and tone
            const lum = (this.currentR * 0.299 + this.currentG * 0.587 + this.currentB * 0.114) / 255.0;
            this.melanophoreDispersion = Math.max(0.05, Math.min(1.0, 1.0 - lum));
            this.xanthophoreDispersion = Math.max(0.05, Math.min(1.0, (this.currentR + this.currentG) / 510.0));
            this.cyanophoreDispersion = Math.max(0.05, Math.min(1.0, this.currentB / 255.0));
            this.erythrophoreDispersion = Math.max(0.05, Math.min(0.6, (this.currentR - this.currentG) / 255.0));

            // Cryptic Camouflage Index (CCI): weighted composite of assimilation and DNA sensitivity
            this.crypticMatchingScore = Number((chromaticProximity * 0.70 + this.sensitivity * 0.30).toFixed(2));
            this.predationDeterrence = Number((this.crypticMatchingScore * 0.70).toFixed(2));
        }

        // Step cycle executed per tick
        step(tick, benthicContext, biofilms, reefs, detritus, nestNodes) {
            const org = this.organism;
            if (!org || !org.alive) return;

            if (tick - this.lastSampleTick >= this.sampleCadence) {
                this.sampleSubstrate(benthicContext, biofilms, reefs, detritus, nestNodes);
                this.lastSampleTick = tick;
            }

            this.adaptPigments(0.016);

            // Expose properties on host organism for rendering and predation mechanics
            org.crypticMatchingScore = this.crypticMatchingScore;
            org.predationDeterrence = this.predationDeterrence;
            org.substrateAssimilation = this.substrateAssimilation;
            org.detectedSubstrate = this.detectedSubstrate;
            org.chromaR = Math.round(this.currentR);
            org.chromaG = Math.round(this.currentG);
            org.chromaB = Math.round(this.currentB);
        }

        // Cleanup references on death
        cleanup() {
            this.organism = null;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = ChromatophoreSystem;
    } else {
        global.ChromatophoreSystem = ChromatophoreSystem;
    }
})(typeof window !== "undefined" ? window : global);
