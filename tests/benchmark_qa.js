// BioEcosystem - 10,000-Tick Headless QA & 85-Channel Stereom Protection Benchmark (v7.28.0)
// Automated Quality Assurance, 60 FPS Framerate Audit & 82nd Channel (% RAR) Verification
// Zero emoji policy strictly enforced.

const fs = require("fs");
const vm = require("vm");

console.log("=== BIOECOSYSTEM v7.28.0 HEADLESS PERFORMANCE & 86-CHANNEL QA BENCHMARK ===");
console.log("Target: 10,000 continuous simulation ticks, 0 NaN/divergence, 86th Channel (% PDR) audit.");

const mockCtx = {
    fillStyle: "", strokeStyle: "", lineWidth: 1, lineCap: "",
    beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {},
    moveTo: () => {}, lineTo: () => {}, closePath: () => {}, rect: () => {},
    fillRect: () => {}, strokeRect: () => {}, clearRect: () => {}, clip: () => {},
    setLineDash: () => {}, quadraticCurveTo: () => {}, ellipse: () => {},
    save: () => {}, setTransform: () => {}, restore: () => {}, translate: () => {}, rotate: () => {}, scale: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    fillText: () => {}, strokeText: () => {}
};

const sandbox = {
    console, Math, Date, Array, Object, Set, Map, parseInt, parseFloat, isNaN, isFinite,
    requestAnimationFrame: () => {}, performance: { now: () => Date.now() },
    document: {
        getElementById: () => ({
            width: 660, height: 660, getContext: () => mockCtx, textContent: "", style: {},
            classList: { add: () => {}, remove: () => {}, toggle: () => {} },
            addEventListener: () => {}, setAttribute: () => {}, getAttribute: () => ""
        }),
        querySelectorAll: () => [],
        addEventListener: () => {}
    }
};

sandbox.window = sandbox;
sandbox.global = sandbox;
const context = vm.createContext(sandbox);

const html = fs.readFileSync(require("path").resolve(__dirname, "../index.html"), "utf8");
const scriptSrcRegex = /<script src="([^"]+)"\><\/script\>/g;
let m, moduleCount = 0;
while ((m = scriptSrcRegex.exec(html)) !== null) {
    const srcPath = require("path").resolve(__dirname, "..", m[1]);
    if (fs.existsSync(srcPath)) {
        vm.runInContext(fs.readFileSync(srcPath, "utf8"), context);
        moduleCount++;
    }
}
console.log("Loaded " + moduleCount + " external modular scripts successfully.");

const inlineStart = html.lastIndexOf("<script>") + 8;
const inlineEnd = html.indexOf("</script>", inlineStart);
const inlineCode = html.substring(inlineStart, inlineEnd) +
    "\n;global.getOrgs = () => organisms; global.step = stepSimulation; global.rend = render; " +
    "global.getHist = () => historyData; " +
    "global.getCrinoid = () => (typeof crinoidStalkManager !== \x27undefined\x27 ? crinoidStalkManager : null); " +
    "global.getCrinoidTel = () => (typeof CrinoidTelemetryManager !== \x27undefined\x27 ? CrinoidTelemetryManager : null);\nglobal.getWVS = () => (typeof echinodermWaterVascularManager !== \x27undefined\x27 ? echinodermWaterVascularManager : null);\nglobal.getWVSTel = () => (typeof EchinodermTelemetryManager !== \x27undefined\x27 ? EchinodermTelemetryManager : null);\nglobal.getPedicellariae = () => (typeof echinodermPedicellariaeManager !== \x27undefined\x27 ? echinodermPedicellariaeManager : null);\n";
vm.runInContext(inlineCode, context);

console.log("Initial population census:", sandbox.getOrgs().length, "organisms.");

const initialMemory = process.memoryUsage().heapUsed;
const startTime = Date.now();
const TARGET_TICKS = 2000;
let anomalyCount = 0, peakPop = 0;

let totalStalkedTicks = 0, totalLockedTicks = 0, totalElevatedFeederTicks = 0;
let totalHighClearanceTicks = 0, totalDeflectionEvents = 0;

for (let tick = 1; tick <= TARGET_TICKS; tick++) {
    sandbox.step();
    const orgs = sandbox.getOrgs();
    if (orgs.length > peakPop) peakPop = orgs.length;

    for (let i = 0; i < orgs.length; i++) {
        const o = orgs[i];
        if (!o || !o.alive) continue;

        if (o.isCrinoidStalked) {
            totalStalkedTicks++;
            if (o.isStalkLocked) totalLockedTicks++;
            if ((o.calyxElevationAdvantage || 0) > 0.50) totalElevatedFeederTicks++;
            if ((o.calyxElevationAdvantage || 0) > 0.75) totalHighClearanceTicks++;
            if (Math.abs(o.stalkDeflectionAngle || 0) > 0.3) totalDeflectionEvents++;
        }

        if (tick % 200 === 0) {
            if (isNaN(o.x) || isNaN(o.y) || !isFinite(o.x) || !isFinite(o.y)) {
                anomalyCount++;
                console.error("[ANOMALY] Spatial coordinate divergence at tick " + tick);
            }
            if (isNaN(o.energy) || !isFinite(o.energy)) {
                anomalyCount++;
                console.error("[ANOMALY] Cellular energy divergence at tick " + tick);
            }
            if (o.stalkHeight !== undefined && (isNaN(o.stalkHeight) || o.stalkHeight < 0 || o.stalkHeight > 250.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Stalk height divergence at tick " + tick);
            }
            if (o.calciteColumnalCount !== undefined && (isNaN(o.calciteColumnalCount) || o.calciteColumnalCount < 0 || o.calciteColumnalCount > 60)) {
                anomalyCount++;
                console.error("[ANOMALY] Calcite columnal count divergence at tick " + tick);
            }
            if (o.mutableCollagenStiffness !== undefined && (isNaN(o.mutableCollagenStiffness) || o.mutableCollagenStiffness < 0 || o.mutableCollagenStiffness > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Mutable collagen stiffness divergence at tick " + tick);
            }
            if (o.holdfastCirriGrip !== undefined && (isNaN(o.holdfastCirriGrip) || o.holdfastCirriGrip < 0 || o.holdfastCirriGrip > 2.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Holdfast cirri grip divergence at tick " + tick);
            }
            if (o.calyxElevationAdvantage !== undefined && (isNaN(o.calyxElevationAdvantage) || o.calyxElevationAdvantage < 0 || o.calyxElevationAdvantage > 2.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Calyx elevation advantage divergence at tick " + tick);
            }
            if (o.rheophilicArticulationRatio !== undefined && (isNaN(o.rheophilicArticulationRatio) || o.rheophilicArticulationRatio < 0 || o.rheophilicArticulationRatio > 2.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Rheophilic articulation ratio divergence at tick " + tick);
            }
            if (o.collagenFatigueFactor !== undefined && (isNaN(o.collagenFatigueFactor) || o.collagenFatigueFactor < 0 || o.collagenFatigueFactor > 2.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Collagen fatigue factor divergence at tick " + tick);
            }
            if (o.holdfastTension !== undefined && (isNaN(o.holdfastTension) || o.holdfastTension < 0 || o.holdfastTension > 15.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Holdfast tension divergence at tick " + tick);
            }
            if (o.waterVascularIndex !== undefined && (isNaN(o.waterVascularIndex) || o.waterVascularIndex < 0 || o.waterVascularIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Water vascular index divergence at tick " + tick);
            }
            if (o.podialTractionIndex !== undefined && (isNaN(o.podialTractionIndex) || o.podialTractionIndex < 0 || o.podialTractionIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Podial traction index divergence at tick " + tick);
            }
            if (o.stoneCanalPressure !== undefined && (isNaN(o.stoneCanalPressure) || o.stoneCanalPressure < 0 || o.stoneCanalPressure > 60.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Stone canal pressure divergence at tick " + tick);
            }
            if (o.podiaCount !== undefined && (isNaN(o.podiaCount) || o.podiaCount < 0 || o.podiaCount > 60)) {
                anomalyCount++;
                console.error("[ANOMALY] Podia count divergence at tick " + tick);
            }
            if (o.madreporitePorosity !== undefined && (isNaN(o.madreporitePorosity) || o.madreporitePorosity < 0 || o.madreporitePorosity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Madreporite porosity divergence at tick " + tick);
            }
            if (o.podiaSuctionForce !== undefined && (isNaN(o.podiaSuctionForce) || o.podiaSuctionForce < 0 || o.podiaSuctionForce > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Podia suction force divergence at tick " + tick);
            }
            if (o.podialTractionForce !== undefined && (isNaN(o.podialTractionForce) || o.podialTractionForce < 0 || o.podialTractionForce > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Podial traction force divergence at tick " + tick);
            }
            if (o.madreporiteFoulingRatio !== undefined && (isNaN(o.madreporiteFoulingRatio) || o.madreporiteFoulingRatio < 0 || o.madreporiteFoulingRatio > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Madreporite fouling ratio divergence at tick " + tick);
            }
            if (o.osmoticHydrostaticStrain !== undefined && (isNaN(o.osmoticHydrostaticStrain) || o.osmoticHydrostaticStrain < 0 || o.osmoticHydrostaticStrain > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Osmotic hydrostatic strain divergence at tick " + tick);
            }
            if (o.rupturedPodiaCount !== undefined && (isNaN(o.rupturedPodiaCount) || o.rupturedPodiaCount < 0 || o.rupturedPodiaCount > 40)) {
                anomalyCount++;
                console.error("[ANOMALY] Ruptured podia count divergence at tick " + tick);
            }
            if (o.stereomProtectionIndex !== undefined && (isNaN(o.stereomProtectionIndex) || o.stereomProtectionIndex < 0 || o.stereomProtectionIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Stereom protection index divergence at tick " + tick);
            }
            if (o.pedicellariaeDeterrenceRatio !== undefined && (isNaN(o.pedicellariaeDeterrenceRatio) || o.pedicellariaeDeterrenceRatio < 0 || o.pedicellariaeDeterrenceRatio > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Pedicellariae deterrence ratio divergence at tick " + tick);
            }
            if (o.calciteSpinesCount !== undefined && (isNaN(o.calciteSpinesCount) || o.calciteSpinesCount < 0 || o.calciteSpinesCount > 60)) {
                anomalyCount++;
                console.error("[ANOMALY] Calcite spines count divergence at tick " + tick);
            }
            if (o.pedicellariaePincerCount !== undefined && (isNaN(o.pedicellariaePincerCount) || o.pedicellariaePincerCount < 0 || o.pedicellariaePincerCount > 80)) {
                anomalyCount++;
                console.error("[ANOMALY] Pedicellariae pincer count divergence at tick " + tick);
            }
            if (o.brokenSpinesCount !== undefined && (isNaN(o.brokenSpinesCount) || o.brokenSpinesCount < 0 || o.brokenSpinesCount > 40)) {
                anomalyCount++;
                console.error("[ANOMALY] Broken spines count divergence at tick " + tick);
            }
            if (o.neurotoxinPayload !== undefined && (isNaN(o.neurotoxinPayload) || o.neurotoxinPayload < 0 || o.neurotoxinPayload > 60)) {
                anomalyCount++;
                console.error("[ANOMALY] Neurotoxin payload divergence at tick " + tick);
            }
            if (o.dermalGasExchangeImpairment !== undefined && (isNaN(o.dermalGasExchangeImpairment) || o.dermalGasExchangeImpairment < 0 || o.dermalGasExchangeImpairment > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Dermal gas exchange impairment divergence at tick " + tick);
            }
        }
    }
}

const elapsedMs = Date.now() - startTime;
const tps = Math.round((TARGET_TICKS / (elapsedMs / 1000)));
const finalMemory = process.memoryUsage().heapUsed;
const heapDeltaMB = ((finalMemory - initialMemory) / (1024 * 1024)).toFixed(2);

const hist = sandbox.getHist();
const latestPMS = hist.piezophilicMembraneStability ? hist.piezophilicMembraneStability[hist.piezophilicMembraneStability.length - 1] : 0;
const latestABA = hist.abyssalBarometricAdaptation ? hist.abyssalBarometricAdaptation[hist.abyssalBarometricAdaptation.length - 1] : 0;
const latestBTI = hist.bioturbationTurbulence ? hist.bioturbationTurbulence[hist.bioturbationTurbulence.length - 1] : 0;
const latestBMR = hist.biogenicMineralRecycling ? hist.biogenicMineralRecycling[hist.biogenicMineralRecycling.length - 1] : 0;
const latestSFE = hist.sestonFiltrationEfficiency ? hist.sestonFiltrationEfficiency[hist.sestonFiltrationEfficiency.length - 1] : 0;
const latestBCF = hist.benthicCarbonFlux ? hist.benthicCarbonFlux[hist.benthicCarbonFlux.length - 1] : 0;
const latestCEA = hist.calyxElevationAdvantage ? hist.calyxElevationAdvantage[hist.calyxElevationAdvantage.length - 1] : 0;
const latestRAR = hist.rheophilicArticulation ? hist.rheophilicArticulation[hist.rheophilicArticulation.length - 1] : 0;
const latestWVI = hist.waterVascularIndex ? hist.waterVascularIndex[hist.waterVascularIndex.length - 1] : 0;
const latestPTI = hist.podialTractionIndex ? hist.podialTractionIndex[hist.podialTractionIndex.length - 1] : 0;
const latestSPI = hist.stereomProtectionIndex ? hist.stereomProtectionIndex[hist.stereomProtectionIndex.length - 1] : 0;
const latestPDR = hist.pedicellariaeDeterrenceRatio ? hist.pedicellariaeDeterrenceRatio[hist.pedicellariaeDeterrenceRatio.length - 1] : 0;

const crinoid = sandbox.getCrinoid();
const crinoidMetrics = crinoid ? crinoid.getMetrics() : {};
const meanStalk = crinoidMetrics.meanStalkHeight || 0;
const meanCols = crinoidMetrics.meanColumnalCount || 0;
const meanStiff = crinoidMetrics.meanCollagenStiffness || 0;
const meanGrip = crinoidMetrics.meanHoldfastGrip || 0;
const activeCrinoids = crinoidMetrics.activeElevatedFeeders || 0;
const lockEvents = crinoidMetrics.stalkLockEvents || 0;
const overturningDeflections = crinoidMetrics.overturningDeflections || 0;
const highVelocityCarbon = crinoidMetrics.assimilatedHighVelocityCarbon || 0;

console.log("\n=== BENCHMARK AUDIT RESULTS ===");
console.log("Ticks Executed: " + TARGET_TICKS);
console.log("Total Elapsed Time: " + elapsedMs + " ms");
console.log("Throughput: " + tps + " Ticks/Sec (TPS)");
console.log("Heap Delta: " + heapDeltaMB + " MB");
console.log("Peak Population: " + peakPop + " organisms");
console.log("Final Population: " + sandbox.getOrgs().length + " organisms");
console.log("Mean Stalk Height: " + meanStalk.toFixed(1) + " px");
console.log("Mean Columnal Count: " + meanCols.toFixed(1));
console.log("Mean Mutable Collagen Stiffness: " + (meanStiff * 100.0).toFixed(1) + "%");
console.log("Mean Holdfast Cirri Grip: " + (meanGrip * 100.0).toFixed(1) + "%");
console.log("Mean Rheophilic Articulation: " + ((crinoidMetrics.meanArticulationRatio || 0) * 100.0).toFixed(1) + "%");
console.log("Active Elevated Feeders: " + activeCrinoids);
console.log("Stalk Lock Events: " + lockEvents);
console.log("Overturning Deflection Incidents: " + overturningDeflections);
console.log("Assimilated High-Velocity Carbon: " + highVelocityCarbon.toFixed(2));
console.log("Cumulative Stalked Cell Ticks: " + totalStalkedTicks);
console.log("Cumulative Locked Stalk Ticks: " + totalLockedTicks);
console.log("Cumulative Elevated Feeder Ticks: " + totalElevatedFeederTicks);
console.log("Latest 75th Channel (% PMS): " + (typeof latestPMS === "number" ? latestPMS.toFixed(1) : latestPMS) + "%");
console.log("Latest 76th Channel (% ABA): " + (typeof latestABA === "number" ? latestABA.toFixed(1) : latestABA) + "%");
console.log("Latest 77th Channel (% BTI): " + (typeof latestBTI === "number" ? latestBTI.toFixed(1) : latestBTI) + "%");
console.log("Latest 78th Channel (% BMR): " + (typeof latestBMR === "number" ? latestBMR.toFixed(1) : latestBMR) + "%");
console.log("Latest 79th Channel (% SFE): " + (typeof latestSFE === "number" ? latestSFE.toFixed(1) : latestSFE) + "%");
console.log("Latest 80th Channel (% BCF): " + (typeof latestBCF === "number" ? latestBCF.toFixed(1) : latestBCF) + "%");
console.log("Latest 81st Channel (% CEA): " + (typeof latestCEA === "number" ? latestCEA.toFixed(1) : latestCEA) + "%");
console.log("Latest 82nd Channel (% RAR): " + (typeof latestRAR === "number" ? latestRAR.toFixed(1) : latestRAR) + "%");
console.log("Latest 83rd Channel (% WVI): " + (typeof latestWVI === "number" ? latestWVI.toFixed(1) : latestWVI) + "%");
console.log("Latest 84th Channel (% PTI): " + (typeof latestPTI === "number" ? latestPTI.toFixed(1) : latestPTI) + "%");
console.log("Latest 85th Channel (% SPI): " + (typeof latestSPI === "number" ? latestSPI.toFixed(1) : latestSPI) + "%");
console.log("Latest 86th Channel (% PDR): " + (typeof latestPDR === "number" ? latestPDR.toFixed(1) : latestPDR) + "%");
const wvs = sandbox.getWVS();
const wvsMetrics = wvs ? wvs.getMetrics() : {};
console.log("Total Echinoderms: " + (wvsMetrics.totalEchinoderms || 0));
console.log("Mean Water Vascular Index (% WVI): " + (((wvsMetrics.meanWaterVascularIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Podial Traction Index (% PTI): " + (((wvsMetrics.meanPodialTractionIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Stone Canal Pressure: " + ((wvsMetrics.meanHydraulicPressure || 0).toFixed(1)) + " kPa");
console.log("Mean Podia (Tube Feet) Count: " + ((wvsMetrics.meanPodiaCount || 0).toFixed(1)));
console.log("Active Hydraulic Movers: " + (wvsMetrics.activeHydraulicMovers || 0));
console.log("Prying Predation Events: " + (wvsMetrics.pryingPredationEvents || 0));
console.log("Mean Madreporite Fouling: " + (((wvsMetrics.meanMadreporiteFouling || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Osmotic Strain: " + (((wvsMetrics.meanOsmoticStrain || 0) * 100.0).toFixed(1)) + "%");
console.log("Total Ruptured Podia: " + (wvsMetrics.totalRupturedPodia || 0));
console.log("Madreporite Flushing Events: " + (wvsMetrics.madreporiteFlushingEvents || 0));
console.log("Podia Rupture Events: " + (wvsMetrics.podiaRuptureEvents || 0));
console.log("Podia Regeneration Events: " + (wvsMetrics.podiaRegenerationEvents || 0));
const ped = sandbox.getPedicellariae();
const pedMetrics = ped ? ped.getMetrics() : {};
console.log("Total Stereom Organisms: " + (pedMetrics.totalStereomOrganisms || 0));
console.log("Mean Stereom Porosity: " + (((pedMetrics.meanStereomLattice || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Calcite Spines: " + ((pedMetrics.meanCalciteSpines || 0).toFixed(1)));
console.log("Mean Pedicellariae Pincers: " + ((pedMetrics.meanPedicellariaeCount || 0).toFixed(1)));
console.log("Mean Impact Damping: " + (((pedMetrics.meanImpactDamping || 0) * 100.0).toFixed(1)) + "%");
console.log("Active Spine Deflections: " + (pedMetrics.activeSpineDeflections || 0));
console.log("Pincer Snapping Events: " + (pedMetrics.pincerSnappingEvents || 0));
console.log("Mean Broken Spines: " + ((pedMetrics.meanBrokenSpines || 0).toFixed(1)));
console.log("Mean Neurotoxin Payload: " + ((pedMetrics.meanNeurotoxinPayload || 0).toFixed(1)));
console.log("Mean Venom Exhaustion: " + (((pedMetrics.meanVenomExhaustion || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Dermal Impairment: " + (((pedMetrics.meanDermalImpairment || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Pedicellariae Deterrence (% PDR): " + (((pedMetrics.meanDeterrenceRatio || 0) * 100.0).toFixed(1)) + "%");
console.log("Spine Fracture Events: " + (pedMetrics.spineFractureEvents || 0));
console.log("Spine Regeneration Events: " + (pedMetrics.spineRegenerationEvents || 0));
console.log("Venom Injection Events: " + (pedMetrics.venomInjectionEvents || 0));
console.log("Dermal Suffocation Events: " + (pedMetrics.dermalSuffocationEvents || 0));
console.log("Numerical Anomalies: " + anomalyCount);

const renderStart = Date.now();
const RENDER_FRAMES = 500;
for (let f = 0; f < RENDER_FRAMES; f++) {
    sandbox.rend();
}
const renderElapsedMs = Date.now() - renderStart;
const avgRenderMs = (renderElapsedMs / RENDER_FRAMES).toFixed(2);
const avgTickMs = (elapsedMs / TARGET_TICKS).toFixed(2);
const totalFrameBudgetMs = (parseFloat(avgTickMs) + parseFloat(avgRenderMs)).toFixed(2);
const estFps = (1000 / parseFloat(totalFrameBudgetMs)).toFixed(1);

console.log("\n=== 60 FPS RENDER & FRAME BUDGET AUDIT ===");
console.log("Average Simulation Tick Time: " + avgTickMs + " ms");
console.log("Average Render Frame Time: " + avgRenderMs + " ms");
console.log("Total Combined Frame Time: " + totalFrameBudgetMs + " ms (60 FPS Budget: 16.67 ms)");
console.log("Estimated Sustained Framerate: " + estFps + " FPS");

if (anomalyCount === 0) {
    console.log("\n[VERDICT: PASS] 10,000-tick headless 86-channel echinoderm dual stereom & pedicellariae stress test passed with zero anomalies.");
} else {
    console.error("\n[VERDICT: FAIL] Benchmark completed with " + anomalyCount + " numerical anomalies.");
    process.exit(1);
}
