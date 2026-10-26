// BioEcosystem - 10,000-Tick Headless QA & 81-Channel Stalked Crinoid Benchmark (v7.05.0)
// Automated Quality Assurance, 60 FPS Framerate Audit & 81st Channel (% CEA) Verification
// Zero emoji policy strictly enforced.

const fs = require("fs");
const vm = require("vm");

console.log("=== BIOECOSYSTEM v7.05.0 HEADLESS PERFORMANCE & 81-CHANNEL QA BENCHMARK ===");
console.log("Target: 10,000 continuous simulation ticks, 0 NaN/divergence, 81st Channel (% CEA) audit.");

const mockCtx = {
    fillStyle: "", strokeStyle: "", lineWidth: 1, lineCap: "",
    beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {},
    moveTo: () => {}, lineTo: () => {}, closePath: () => {}, rect: () => {},
    fillRect: () => {}, strokeRect: () => {}, clearRect: () => {}, clip: () => {},
    setLineDash: () => {}, quadraticCurveTo: () => {}, ellipse: () => {},
    save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {}, scale: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    fillText: () => {}, strokeText: () => {}
};

const sandbox = {
    console, Math, Date, Array, Object, Set, Map, parseInt, parseFloat, isNaN, isFinite,
    requestAnimationFrame: () => {},
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
    "global.getCrinoid = () => (typeof crinoidStalkManager !== 'undefined' ? crinoidStalkManager : null); " +
    "global.getCrinoidTel = () => (typeof CrinoidTelemetryManager !== 'undefined' ? CrinoidTelemetryManager : null);\n";
vm.runInContext(inlineCode, context);

console.log("Initial population census:", sandbox.getOrgs().length, "organisms.");

const initialMemory = process.memoryUsage().heapUsed;
const startTime = Date.now();
const TARGET_TICKS = 10000;
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

        if (tick % 100 === 0) {
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
    console.log("\n[VERDICT: PASS] 10,000-tick headless 81-channel stalked crinoid stress test passed with zero anomalies.");
} else {
    console.error("\n[VERDICT: FAIL] Benchmark completed with " + anomalyCount + " numerical anomalies.");
    process.exit(1);
}
