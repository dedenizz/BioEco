// BioEcosystem - Phototactic Iridophore Layers & Guanine Crystal Interference System
// Module: src/organs/iridophores.js
// Version: 5.17.0 (Hour 237 - System Agent: Phototactic Iridophore Layers & Guanine Crystal Platelets)
// Zero emoji policy strictly enforced.

(function(global) {
    "use strict";

    class IridophoreSystem {
        constructor(organism) {
            this.organism = organism;

            const dna = (organism && organism.dna) ? organism.dna : {};
            this.plateletDensity = typeof dna.iridophorePlateletDensity === "number" ? dna.iridophorePlateletDensity : 0.25;
            this.guanineReflectance = typeof dna.guanineReflectance === "number" ? dna.guanineReflectance : 0.30;
            this.countershadingBias = typeof dna.countershadingBias === "number" ? dna.countershadingBias : 0.35;
            this.baseReflectance = typeof dna.iridophoreReflectance === "number" ? dna.iridophoreReflectance : 0.20;

            // Multilayer structural platelet parameters
            this.plateletStackCount = Math.max(3, Math.min(12, Math.round(4 + this.plateletDensity * 4.0)));
            this.plateletSpacing = 105.0; // Nanometer baseline inter-platelet lattice spacing [70 - 140 nm]
            this.refractiveIndexGuanine = 1.83; // High refractive index of anhydrous guanine crystals
            this.refractiveIndexCytoplasm = 1.33; // Cytoplasmic spacer refractive index

            // Dynamic optical state
            this.interferenceWavelength = 490.0; // Peak constructive interference wavelength (nm, cyan-blue)
            this.specularReflectance = 0.20;     // Dynamic reflectance coefficient R_irid [0.0 - 0.95]
            this.countershadingDorsal = 0.30;    // Upper surface light-absorbing countershading factor
            this.countershadingVentral = 0.60;   // Silvery ventral light-matching reflectance
            this.countershadingScore = 0.45;     // Normalized countershading balance [0.0 - 1.0]

            // Predatory strike deflection bonus (Ocular disruption of attacking predator)
            this.ocularDisruption = 0.0;         // Strike deflection buffer [0.0 - 0.40]

            // Specular dazzle flash enhancement
            this.dazzleActive = false;
            this.dazzleTimer = 0;
            this.dazzleDuration = 18; // Synchronized with chromatophore startle flash
        }

        // Trigger specular dazzle burst when predator strikes
        triggerDazzleBurst() {
            this.dazzleActive = true;
            this.dazzleTimer = this.dazzleDuration;
            this.specularReflectance = 0.95;
            this.ocularDisruption = 0.40;
        }

        // Calculate thin-film constructive interference wavelength and reflectance
        updateOpticalInterference(tick) {
            const org = this.organism;
            if (!org || !org.alive) return;

            // Check if chromatophore startle flash is active
            if (org.chromatophoreSystem && org.chromatophoreSystem.flashTicksRemaining > 0) {
                this.dazzleActive = true;
                this.dazzleTimer = org.chromatophoreSystem.flashTicksRemaining;
            } else if (this.dazzleTimer > 0) {
                this.dazzleTimer--;
                if (this.dazzleTimer === 0) {
                    this.dazzleActive = false;
                }
            }

            if (this.dazzleActive) {
                // High-intensity specular glare flash (constructive wide-spectrum flare)
                this.specularReflectance = 0.92;
                this.ocularDisruption = 0.40;
                this.interferenceWavelength = 580.0; // Golden-rose glare peak
                this.countershadingScore = 0.85;
                return;
            }

            // 1. Calculate relative incident angle relative to downwelling illumination
            // Downwelling light vector: (0, 1) in 2D dish plane
            const vx = org.vx || 0.001;
            const vy = org.vy || 0.001;
            const headingAngle = Math.atan2(vy, vx);

            // Angle of incident light relative to organism dorsal-ventral axis
            const lightAngle = Math.PI * 0.5; // Downward illumination
            const relativeAngle = Math.abs(headingAngle - lightAngle);
            const cosTheta = Math.max(0.15, Math.min(1.0, Math.cos(relativeAngle)));

            // 2. Thin-Film Bragg Interference Equation: lambda = 2 * n_eff * d * cos(theta)
            // Effective refractive index of stratified guanine-cytoplasm lattice
            const nEff = (this.refractiveIndexGuanine + this.refractiveIndexCytoplasm) * 0.5; // ~1.58
            const dynamicSpacing = this.plateletSpacing + Math.sin(tick * 0.03 + (org.id ? org.id.charCodeAt(0) : 0)) * 6.0;
            const lambda = 2.0 * nEff * dynamicSpacing * cosTheta * 0.5; // Scaled to visible range ~420 - 680 nm

            this.interferenceWavelength = Math.max(380.0, Math.min(720.0, lambda));

            // 3. Multi-platelet Fresnel Stack Reflectance
            // More stacks and higher guanine density sharpen specular reflectance peaks
            const stackFactor = Math.min(1.0, this.plateletStackCount / 10.0);
            const rawReflectance = (this.guanineReflectance * 0.45 + this.baseReflectance * 0.35 + stackFactor * 0.20) * cosTheta;
            this.specularReflectance = Number(Math.max(0.05, Math.min(0.85, rawReflectance)).toFixed(3));

            // 4. Dorsal-Ventral Countershading Balance
            // Organisms swimming horizontally present a dark dorsal profile and reflective ventral profile
            const horizontalAlignment = Math.abs(Math.cos(headingAngle));
            this.countershadingDorsal = Math.max(0.1, 1.0 - (this.countershadingBias * 0.70));
            this.countershadingVentral = Math.min(1.0, this.guanineReflectance * 0.80 + this.countershadingBias * 0.40);
            this.countershadingScore = Number((horizontalAlignment * 0.60 + this.countershadingBias * 0.40).toFixed(2));

            // 5. Ocular Disruption: Deflects apex predator targeting by blinding strike aim
            // High reflectance and countershading produce visual disorientation in predators
            const rawDisruption = (this.specularReflectance * 0.60 + this.countershadingScore * 0.40) * 0.35;
            this.ocularDisruption = Number(Math.max(0.0, Math.min(0.40, rawDisruption)).toFixed(3));
        }

        // Helper to convert dominant interference wavelength into spectral RGB components
        getSpectralRGB() {
            const wl = this.interferenceWavelength;
            let r = 0.0, g = 0.0, b = 0.0;

            if (wl >= 380 && wl < 440) {
                r = -(wl - 440) / (440 - 380);
                b = 1.0;
            } else if (wl >= 440 && wl < 490) {
                g = (wl - 440) / (490 - 440);
                b = 1.0;
            } else if (wl >= 490 && wl < 510) {
                g = 1.0;
                b = -(wl - 510) / (510 - 490);
            } else if (wl >= 510 && wl < 580) {
                r = (wl - 510) / (580 - 510);
                g = 1.0;
            } else if (wl >= 580 && wl < 645) {
                r = 1.0;
                g = -(wl - 645) / (645 - 580);
            } else if (wl >= 645 && wl <= 780) {
                r = 1.0;
            }

            return {
                r: Math.round(r * 255 * this.specularReflectance),
                g: Math.round(g * 255 * this.specularReflectance),
                b: Math.round(b * 255 * this.specularReflectance)
            };
        }

        // Step cycle executed per simulation tick
        step(tick) {
            const org = this.organism;
            if (!org || !org.alive) return;

            this.updateOpticalInterference(tick);

            // Expose properties on host organism for rendering, telemetry, and combat evasion
            org.plateletDensity = this.plateletDensity;
            org.specularReflectance = this.specularReflectance;
            org.ocularDisruption = this.ocularDisruption;
            org.interferenceWavelength = Math.round(this.interferenceWavelength);
            org.countershadingScore = this.countershadingScore;
            org.dazzleActive = this.dazzleActive;
        }

        // Cleanup references on organism mortality
        cleanup() {
            this.organism = null;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = IridophoreSystem;
    } else {
        global.IridophoreSystem = IridophoreSystem;
    }
})(typeof window !== "undefined" ? window : global);
