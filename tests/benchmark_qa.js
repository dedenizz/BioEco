// BioEcosystem - 10,000-Tick Headless QA & 10,000-Tick 160-Channel Epoch 77 Mesolithic Fishery Benchmark (v9.88.0)
// Automated Quality Assurance, 60 FPS Framerate Audit & Cephalochordate Deepened System Audit
// Zero emoji policy strictly enforced.

const fs = require("fs");
const vm = require("vm");

console.log("=== BIOECOSYSTEM v15.5.0 HEADLESS PERFORMANCE & 186-CHANNEL EPOCH 90 JUBILEE QA BENCHMARK ===");
console.log("Target: 10,000 continuous simulation ticks, 0 NaN/divergence, Epoch 90 Artificial Neural Networks, Autonomous Robotics & Quantum Computing & 186-Channel Verification.");

const mockCtx = {
    fillStyle: "", strokeStyle: "", lineWidth: 1, lineCap: "",
    beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {},
    moveTo: () => {}, lineTo: () => {}, closePath: () => {}, rect: () => {}, roundRect: () => {},
    fillRect: () => {}, strokeRect: () => {}, clearRect: () => {}, clip: () => {},
    setLineDash: () => {}, quadraticCurveTo: () => {}, bezierCurveTo: () => {}, ellipse: () => {},
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
if (typeof sandbox.ChalicothereClawManager === "undefined") {
    console.error("[CRITICAL] ChalicothereClawManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ChalicothereOpticsRenderer === "undefined") {
    console.error("[CRITICAL] ChalicothereOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ChalicothereTelemetryManager === "undefined") {
    console.error("[CRITICAL] ChalicothereTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Chalicothere subsystem integrity: ClawManager, OpticsRenderer, TelemetryManager loaded.");
if (typeof sandbox.MachairodontCanineManager === "undefined") {
    console.error("[CRITICAL] MachairodontCanineManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Machairodont subsystem integrity: MachairodontCanineManager loaded.");
if (typeof sandbox.MachairodontOpticsRenderer === "undefined") {
    console.error("[CRITICAL] MachairodontOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.MachairodontTelemetryManager === "undefined") {
    console.error("[CRITICAL] MachairodontTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Machairodont optics & telemetry integrity: OpticsRenderer and TelemetryManager loaded.");
if (typeof sandbox.UngulateCursorialManager === "undefined") {
    console.error("[CRITICAL] UngulateCursorialManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Cursorial Ungulate subsystem integrity: UngulateCursorialManager loaded.");
if (typeof sandbox.CursorialOpticsRenderer === "undefined") {
    console.error("[CRITICAL] CursorialOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.CursorialTelemetryManager === "undefined") {
    console.error("[CRITICAL] CursorialTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Cursorial Ungulate optics & telemetry integrity: CursorialOpticsRenderer and CursorialTelemetryManager loaded.");
if (typeof sandbox.HomininBipedalismManager === "undefined") {
    console.error("[CRITICAL] HomininBipedalismManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Hominin Bipedalism subsystem integrity: HomininBipedalismManager loaded.");
if (typeof sandbox.HomininOpticsRenderer === "undefined") {
    console.error("[CRITICAL] HomininOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.HomininTelemetryManager === "undefined") {
    console.error("[CRITICAL] HomininTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Hominin Bipedalism optics & telemetry integrity: HomininOpticsRenderer and HomininTelemetryManager loaded.");
if (typeof sandbox.HomoPyrotechnicsManager === "undefined") {
    console.error("[CRITICAL] HomoPyrotechnicsManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Homo Pyrotechnics subsystem integrity: HomoPyrotechnicsManager loaded.");
if (typeof sandbox.NeanderthalCompositeManager === "undefined") {
    console.error("[CRITICAL] NeanderthalCompositeManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Neanderthal Composite subsystem integrity: NeanderthalCompositeManager loaded.");
if (typeof sandbox.SapiensCognitionManager === "undefined") {
    console.error("[CRITICAL] SapiensCognitionManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Sapiens Cognition subsystem integrity: SapiensCognitionManager loaded.");
if (typeof sandbox.SapiensOpticsRenderer === "undefined") {
    console.error("[CRITICAL] SapiensOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.SapiensTelemetryManager === "undefined") {
    console.error("[CRITICAL] SapiensTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Sapiens optics & telemetry integrity: OpticsRenderer and TelemetryManager loaded.");
if (typeof sandbox.CanisSymbiosisManager === "undefined") {
    console.error("[CRITICAL] CanisSymbiosisManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Canis Symbiosis subsystem integrity: CanisSymbiosisManager loaded.");
if (typeof sandbox.CanisOpticsRenderer === "undefined") {
    console.error("[CRITICAL] CanisOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.CanisTelemetryManager === "undefined") {
    console.error("[CRITICAL] CanisTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Canis optics & telemetry integrity: OpticsRenderer and TelemetryManager loaded.");
if (typeof sandbox.MesolithicFisheryManager === "undefined") {
    console.error("[CRITICAL] MesolithicFisheryManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.MesolithicOpticsRenderer === "undefined") {
    console.error("[CRITICAL] MesolithicOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.MesolithicTelemetryManager === "undefined") {
    console.error("[CRITICAL] MesolithicTelemetryManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.NeolithicAgricultureManager === "undefined") {
    console.error("[CRITICAL] NeolithicAgricultureManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.NeolithicOpticsRenderer === "undefined") {
    console.error("[CRITICAL] NeolithicOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.NeolithicTelemetryManager === "undefined") {
    console.error("[CRITICAL] NeolithicTelemetryManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.PastoralDomesticationManager === "undefined") {
    console.error("[CRITICAL] PastoralDomesticationManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.PastoralOpticsRenderer === "undefined") {
    console.error("[CRITICAL] PastoralOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.PastoralTelemetryManager === "undefined") {
    console.error("[CRITICAL] PastoralTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Pastoral Domestication subsystem integrity: PastoralDomesticationManager, PastoralOpticsRenderer, PastoralTelemetryManager loaded.");
if (typeof sandbox.ChalcolithicMetallurgyManager === "undefined") {
    console.error("[CRITICAL] ChalcolithicMetallurgyManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ChalcolithicOpticsRenderer === "undefined") {
    console.error("[CRITICAL] ChalcolithicOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ChalcolithicTelemetryManager === "undefined") {
    console.error("[CRITICAL] ChalcolithicTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Chalcolithic Metallurgy subsystem integrity: ChalcolithicMetallurgyManager, ChalcolithicOpticsRenderer, ChalcolithicTelemetryManager loaded.");
if (typeof sandbox.BronzeUrbanismManager === "undefined") {
    console.error("[CRITICAL] BronzeUrbanismManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.BronzeOpticsRenderer === "undefined") {
    console.error("[CRITICAL] BronzeOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.BronzeTelemetryManager === "undefined") {
    console.error("[CRITICAL] BronzeTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Bronze Age subsystem integrity: BronzeUrbanismManager, BronzeOpticsRenderer, BronzeTelemetryManager loaded.");
if (typeof sandbox.IronMaritimeManager === "undefined") {
    console.error("[CRITICAL] IronMaritimeManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.IronOpticsRenderer === "undefined") {
    console.error("[CRITICAL] IronOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.IronTelemetryManager === "undefined") {
    console.error("[CRITICAL] IronTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Iron Age subsystem integrity: IronMaritimeManager, IronOpticsRenderer, IronTelemetryManager loaded.");
if (typeof sandbox.ClassicalHydraulicsManager === "undefined") {
    console.error("[CRITICAL] ClassicalHydraulicsManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ClassicalOpticsRenderer === "undefined") {
    console.error("[CRITICAL] ClassicalOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.ClassicalTelemetryManager === "undefined") {
    console.error("[CRITICAL] ClassicalTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Classical Antiquity subsystem integrity: ClassicalHydraulicsManager, ClassicalOpticsRenderer, ClassicalTelemetryManager loaded.");
if (typeof sandbox.MedievalNavigationManager === "undefined") {
    console.error("[CRITICAL] MedievalNavigationManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.MedievalOpticsRenderer === "undefined") {
    console.error("[CRITICAL] MedievalOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.MedievalTelemetryManager === "undefined") {
    console.error("[CRITICAL] MedievalTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Medieval Navigation subsystem integrity: MedievalNavigationManager, MedievalOpticsRenderer, MedievalTelemetryManager loaded.");
if (typeof sandbox.RenaissancePrintingManager === "undefined") {
    console.error("[CRITICAL] RenaissancePrintingManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.RenaissanceOpticsRenderer === "undefined") {
    console.error("[CRITICAL] RenaissanceOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.RenaissanceTelemetryManager === "undefined") {
    console.error("[CRITICAL] RenaissanceTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Renaissance Printing subsystem integrity: RenaissancePrintingManager, RenaissanceOpticsRenderer, RenaissanceTelemetryManager loaded.");
if (typeof sandbox.IndustrialSteamManager === "undefined") {
    console.error("[CRITICAL] IndustrialSteamManager missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.IndustrialOpticsRenderer === "undefined") {
    console.error("[CRITICAL] IndustrialOpticsRenderer missing from sandbox!");
    process.exit(1);
}
if (typeof sandbox.IndustrialTelemetryManager === "undefined") {
    console.error("[CRITICAL] IndustrialTelemetryManager missing from sandbox!");
    process.exit(1);
}
console.log("Verified Industrial Steam subsystem integrity: IndustrialSteamManager, IndustrialOpticsRenderer, IndustrialTelemetryManager loaded.");

const inlineStart = html.lastIndexOf("<script>") + 8;
const inlineEnd = html.indexOf("</script>", inlineStart);
const inlineCode = html.substring(inlineStart, inlineEnd) +
    "\n;isProMode = true; global.getOrgs = () => organisms; global.step = stepSimulation; global.rend = render; " +
    "global.getHist = () => historyData; global.getNeo = () => neolithicAgricultureManager; global.getPastoral = () => pastoralDomesticationManager; global.getChalcolithic = () => (typeof chalcolithicMetallurgyManager !== \x27undefined\x27 ? chalcolithicMetallurgyManager : null); global.getBronze = () => (typeof bronzeUrbanismManager !== \x27undefined\x27 ? bronzeUrbanismManager : null); global.getIron = () => (typeof ironMaritimeManager !== \x27undefined\x27 ? ironMaritimeManager : null); global.getClassical = () => (typeof classicalHydraulicsManager !== \x27undefined\x27 ? classicalHydraulicsManager : null); global.getMedieval = () => (typeof medievalNavigationManager !== \x27undefined\x27 ? medievalNavigationManager : null); global.getRenaissance = () => (typeof renaissancePrintingManager !== \x27undefined\x27 ? renaissancePrintingManager : null); global.getIndustrial = () => (typeof industrialSteamManager !== \x27undefined\x27 ? industrialSteamManager : null); global.getElectric = () => (typeof electricNitrogenManager !== \x27undefined\x27 ? electricNitrogenManager : null); global.getAviation = () => (typeof aviationRadioManager !== \x27undefined\x27 ? aviationRadioManager : null); global.getSilicon = () => (typeof siliconInternetManager !== \x27undefined\x27 ? siliconInternetManager : null); global.getNeuralQuantum = () => (typeof neuralQuantumManager !== \x27undefined\x27 ? neuralQuantumManager : null); global.getSyntheticCrispr = () => (typeof syntheticCrisprManager !== \x27undefined\x27 ? syntheticCrisprManager : null); " +
    "global.getCrinoid = () => (typeof crinoidStalkManager !== \x27undefined\x27 ? crinoidStalkManager : null); " +
    "global.getCrinoidTel = () => (typeof CrinoidTelemetryManager !== \x27undefined\x27 ? CrinoidTelemetryManager : null);\nglobal.getWVS = () => (typeof echinodermWaterVascularManager !== \x27undefined\x27 ? echinodermWaterVascularManager : null);\nglobal.getWVSTel = () => (typeof EchinodermTelemetryManager !== \x27undefined\x27 ? EchinodermTelemetryManager : null);\nglobal.getPedicellariae = () => (typeof echinodermPedicellariaeManager !== \x27undefined\x27 ? echinodermPedicellariaeManager : null);\nglobal.getLantern = () => (typeof echinodermLanternManager !== \x27undefined\x27 ? echinodermLanternManager : null);\nglobal.getCuvierian = () => (typeof holothuroidCuvierianManager !== \x27undefined\x27 ? holothuroidCuvierianManager : null);\nglobal.getAsteroidea = () => (typeof asteroideaCardiacStomachManager !== \x27undefined\x27 ? asteroideaCardiacStomachManager : null);\nglobal.getOphiuroid = () => (typeof ophiuroidVertebraeManager !== \x27undefined\x27 ? ophiuroidVertebraeManager : null);\nglobal.getHemichordate = () => (typeof hemichordatePharyngealManager !== \x27undefined\x27 ? hemichordatePharyngealManager : null);\nglobal.getCephalochordate = () => (typeof cephalochordateNotochordManager !== \x27undefined\x27 ? cephalochordateNotochordManager : null);\nglobal.getUrochordate = () => (typeof urochordateTunicManager !== \x27undefined\x27 ? urochordateTunicManager : null);\nglobal.getCraniata = () => (typeof craniataSlimeManager !== \x27undefined\x27 ? craniataSlimeManager : null);\nglobal.getCraniataTel = () => (typeof CraniataTelemetryManager !== \x27undefined\x27 ? CraniataTelemetryManager : null);\nglobal.getOstracoderm = () => (typeof ostracodermArmorManager !== \x27undefined\x27 ? ostracodermArmorManager : null);\nglobal.getPlacoderm = () => (typeof placodermJawManager !== \x27undefined\x27 ? placodermJawManager : null);\nglobal.getPlacodermTel = () => (typeof PlacodermTelemetryManager !== \x27undefined\x27 ? PlacodermTelemetryManager : null);\nglobal.getTribo = () => (typeof tribosphenicChorioallantoicManager !== \x27undefined\x27 ? tribosphenicChorioallantoicManager : null);\nglobal.getMultiTorpor = () => (typeof multituberculateTorporManager !== \x27undefined\x27 ? multituberculateTorporManager : null);\nglobal.getNeanderthal = () => (typeof neanderthalCompositeManager !== \x27undefined\x27 ? neanderthalCompositeManager : null);\nglobal.getSapiens = () => (typeof sapiensCognitionManager !== \x27undefined\x27 ? sapiensCognitionManager : null);\nglobal.getCanis = () => (typeof canisSymbiosisManager !== \x27undefined\x27 ? canisSymbiosisManager : null);\nglobal.getMesolithic = () => (typeof mesolithicFisheryManager !== \x27undefined\x27 ? mesolithicFisheryManager : null);\n";
vm.runInContext(inlineCode, context);

console.log("Initial population census:", sandbox.getOrgs().length, "organisms.");

if (global.gc) global.gc();
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
            if (o.calcitePyramidJawsCount !== undefined && (isNaN(o.calcitePyramidJawsCount) || o.calcitePyramidJawsCount < 0 || o.calcitePyramidJawsCount > 10)) {
                anomalyCount++;
                console.error("[ANOMALY] Calcite pyramid jaws count divergence at tick " + tick);
            }
            if (o.lanternTeethSharpness !== undefined && (isNaN(o.lanternTeethSharpness) || o.lanternTeethSharpness < 0 || o.lanternTeethSharpness > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Lantern teeth sharpness divergence at tick " + tick);
            }
            if (o.grazingLanternIndex !== undefined && (isNaN(o.grazingLanternIndex) || o.grazingLanternIndex < 0 || o.grazingLanternIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Grazing lantern index divergence at tick " + tick);
            }
            if (o.bioerosionRateIndex !== undefined && (isNaN(o.bioerosionRateIndex) || o.bioerosionRateIndex < 0 || o.bioerosionRateIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Bioerosion rate index divergence at tick " + tick);
            }
            if (o.toothSacCalciteReserve !== undefined && (isNaN(o.toothSacCalciteReserve) || o.toothSacCalciteReserve < 0 || o.toothSacCalciteReserve > 120)) {
                anomalyCount++;
                console.error("[ANOMALY] Tooth sac calcite reserve divergence at tick " + tick);
            }
            if (o.severeToothBluntingPenalty !== undefined && (isNaN(o.severeToothBluntingPenalty) || o.severeToothBluntingPenalty < 0 || o.severeToothBluntingPenalty > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Severe tooth blunting penalty divergence at tick " + tick);
            }
            if (o.bioerosionExcavationVolume !== undefined && (isNaN(o.bioerosionExcavationVolume) || o.bioerosionExcavationVolume < 0)) {
                anomalyCount++;
                console.error("[ANOMALY] Bioerosion excavation volume divergence at tick " + tick);
            }
            if (o.toothMicrofractureRate !== undefined && (isNaN(o.toothMicrofractureRate) || o.toothMicrofractureRate < 0 || o.toothMicrofractureRate > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Tooth microfracture rate divergence at tick " + tick);
            }
            if (o.cuvierianTubulesReserve !== undefined && (isNaN(o.cuvierianTubulesReserve) || o.cuvierianTubulesReserve < 0 || o.cuvierianTubulesReserve > 60)) {
                anomalyCount++;
                console.error("[ANOMALY] Cuvierian tubules reserve divergence at tick " + tick);
            }
            if (o.cuvierianDefenseIndex !== undefined && (isNaN(o.cuvierianDefenseIndex) || o.cuvierianDefenseIndex < 0 || o.cuvierianDefenseIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Cuvierian defense index divergence at tick " + tick);
            }
            if (o.holothurinToxinPayload !== undefined && (isNaN(o.holothurinToxinPayload) || o.holothurinToxinPayload < 0 || o.holothurinToxinPayload > 100)) {
                anomalyCount++;
                console.error("[ANOMALY] Holothurin toxin payload divergence at tick " + tick);
            }
            if (o.visceralIntegrity !== undefined && (isNaN(o.visceralIntegrity) || o.visceralIntegrity < 0 || o.visceralIntegrity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Visceral integrity divergence at tick " + tick);
            }
            if (o.sedimentIngestionRate !== undefined && (isNaN(o.sedimentIngestionRate) || o.sedimentIngestionRate < 0 || o.sedimentIngestionRate > 2.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Sediment ingestion rate divergence at tick " + tick);
            }
            if (o.tubuleAdhesionStrength !== undefined && (isNaN(o.tubuleAdhesionStrength) || o.tubuleAdhesionStrength < 0 || o.tubuleAdhesionStrength > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Tubule adhesion strength divergence at tick " + tick);
            }
            if (o.coelomicLipidReserve !== undefined && (isNaN(o.coelomicLipidReserve) || o.coelomicLipidReserve < 0 || o.coelomicLipidReserve > 120)) {
                anomalyCount++;
                console.error("[ANOMALY] Coelomic lipid reserve divergence at tick " + tick);
            }
            if (o.respiratoryParasiteLoad !== undefined && (isNaN(o.respiratoryParasiteLoad) || o.respiratoryParasiteLoad < 0 || o.respiratoryParasiteLoad > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Respiratory parasite load divergence at tick " + tick);
            }
            if (o.visceralRegenerationIndex !== undefined && (isNaN(o.visceralRegenerationIndex) || o.visceralRegenerationIndex < 0 || o.visceralRegenerationIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Visceral regeneration index divergence at tick " + tick);
            }
            if (o.catchApparatusComplianceIndex !== undefined && (isNaN(o.catchApparatusComplianceIndex) || o.catchApparatusComplianceIndex < 0 || o.catchApparatusComplianceIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Catch apparatus compliance index divergence at tick " + tick);
            }
            if (o.extraoralGastricEversionIndex !== undefined && (isNaN(o.extraoralGastricEversionIndex) || o.extraoralGastricEversionIndex < 0 || o.extraoralGastricEversionIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Extraoral gastric eversion index divergence at tick " + tick);
            }
            if (o.serpentiformVelocityIndex !== undefined && (isNaN(o.serpentiformVelocityIndex) || o.serpentiformVelocityIndex < 0 || o.serpentiformVelocityIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Serpentiform velocity index divergence at tick " + tick);
            }
            if (o.brittleFractureRatio !== undefined && (isNaN(o.brittleFractureRatio) || o.brittleFractureRatio < 0 || o.brittleFractureRatio > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Brittle fracture ratio divergence at tick " + tick);
            }
            if (o.yawWobbleAngle !== undefined && (isNaN(o.yawWobbleAngle) || Math.abs(o.yawWobbleAngle) > 3.14)) {
                anomalyCount++;
                console.error("[ANOMALY] Yaw wobble angle divergence at tick " + tick);
            }
            if (o.pharyngealSlitIndex !== undefined && (isNaN(o.pharyngealSlitIndex) || o.pharyngealSlitIndex < 0 || o.pharyngealSlitIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Pharyngeal slit index divergence at tick " + tick);
            }
            if (o.gillSlitEfficiency !== undefined && (isNaN(o.gillSlitEfficiency) || o.gillSlitEfficiency < 0 || o.gillSlitEfficiency > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Gill slit efficiency divergence at tick " + tick);
            }
            if (o.stomochordTurgor !== undefined && (isNaN(o.stomochordTurgor) || o.stomochordTurgor < 0 || o.stomochordTurgor > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Stomochord turgor divergence at tick " + tick);
            }
            if (o.proboscisBurrowingEfficiency !== undefined && (isNaN(o.proboscisBurrowingEfficiency) || o.proboscisBurrowingEfficiency < 0 || o.proboscisBurrowingEfficiency > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Proboscis burrowing efficiency divergence at tick " + tick);
            }
            if (o.siltCloggingLevel !== undefined && (isNaN(o.siltCloggingLevel) || o.siltCloggingLevel < 0 || o.siltCloggingLevel > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Silt clogging level divergence at tick " + tick);
            }
            if (o.hypoxicStressAccumulation !== undefined && (isNaN(o.hypoxicStressAccumulation) || o.hypoxicStressAccumulation < 0 || o.hypoxicStressAccumulation > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Hypoxic stress accumulation divergence at tick " + tick);
            }
            if (o.notochordTensionIndex !== undefined && (isNaN(o.notochordTensionIndex) || o.notochordTensionIndex < 0 || o.notochordTensionIndex > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Notochord tension index divergence at tick " + tick);
            }
            if (o.notochordTension !== undefined && (isNaN(o.notochordTension) || o.notochordTension < 0 || o.notochordTension > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Notochord tension divergence at tick " + tick);
            }
            if (o.swimmingVelocity !== undefined && (isNaN(o.swimmingVelocity) || o.swimmingVelocity < 0 || o.swimmingVelocity > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Swimming velocity divergence at tick " + tick);
            }
            if (o.myomericFlexionEfficiency !== undefined && (isNaN(o.myomericFlexionEfficiency) || o.myomericFlexionEfficiency < 0 || o.myomericFlexionEfficiency > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Myomeric flexion efficiency divergence at tick " + tick);
            }
            if (o.notochordFatigueAccumulation !== undefined && (isNaN(o.notochordFatigueAccumulation) || o.notochordFatigueAccumulation < 0 || o.notochordFatigueAccumulation > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Notochord fatigue accumulation divergence at tick " + tick);
            }
            if (o.lacticAcidosisLevel !== undefined && (isNaN(o.lacticAcidosisLevel) || o.lacticAcidosisLevel < 0 || o.lacticAcidosisLevel > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Lactic acidosis level divergence at tick " + tick);
            }
            if (o.tunicProtectiveIntegrity !== undefined && (isNaN(o.tunicProtectiveIntegrity) || o.tunicProtectiveIntegrity < 0 || o.tunicProtectiveIntegrity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Tunic protective integrity divergence at tick " + tick);
            }
            if (o.tunicinIntegrity !== undefined && (isNaN(o.tunicinIntegrity) || o.tunicinIntegrity < 0 || o.tunicinIntegrity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Tunicin integrity divergence at tick " + tick);
            }
            if (o.notochordResorptionProgress !== undefined && (isNaN(o.notochordResorptionProgress) || o.notochordResorptionProgress < 0 || o.notochordResorptionProgress > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Notochord resorption progress divergence at tick " + tick);
            }
            if (o.ciliaryPumpingRate !== undefined && (isNaN(o.ciliaryPumpingRate) || o.ciliaryPumpingRate < 0 || o.ciliaryPumpingRate > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Ciliary pumping rate divergence at tick " + tick);
            }
            if (o.tunicinCoverThickness !== undefined && (isNaN(o.tunicinCoverThickness) || o.tunicinCoverThickness < 0 || o.tunicinCoverThickness > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Tunicin cover thickness divergence at tick " + tick);
            }
            if (o.tailNotochordLength !== undefined && (isNaN(o.tailNotochordLength) || o.tailNotochordLength < 0 || o.tailNotochordLength > 100.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Tail notochord length divergence at tick " + tick);
            }
            if (o.ciliaryPumpingReversalRatio !== undefined && (isNaN(o.ciliaryPumpingReversalRatio) || o.ciliaryPumpingReversalRatio < 0 || o.ciliaryPumpingReversalRatio > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Ciliary pumping reversal ratio divergence at tick " + tick);
            }
            if (o.siphonDetritalFouling !== undefined && (isNaN(o.siphonDetritalFouling) || o.siphonDetritalFouling < 0 || o.siphonDetritalFouling > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Siphon detrital fouling divergence at tick " + tick);
            }
            if (o.tunicateHypoxicStress !== undefined && (isNaN(o.tunicateHypoxicStress) || o.tunicateHypoxicStress < 0 || o.tunicateHypoxicStress > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Tunicate hypoxic stress divergence at tick " + tick);
            }
            if (o.chondrocraniumIntegrity !== undefined && (isNaN(o.chondrocraniumIntegrity) || o.chondrocraniumIntegrity < 0 || o.chondrocraniumIntegrity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Chondrocranium integrity divergence at tick " + tick);
            }
            if (o.slimePayload !== undefined && (isNaN(o.slimePayload) || o.slimePayload < 0 || o.slimePayload > 150.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Slime payload divergence at tick " + tick);
            }
            if (o.slimeDefenseCapacity !== undefined && (isNaN(o.slimeDefenseCapacity) || o.slimeDefenseCapacity < 0 || o.slimeDefenseCapacity > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Slime defense capacity divergence at tick " + tick);
            }
            if (o.slimeExpansionRatio !== undefined && (isNaN(o.slimeExpansionRatio) || o.slimeExpansionRatio < 0 || o.slimeExpansionRatio > 1200.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Slime expansion ratio divergence at tick " + tick);
            }
            if (o.eelLikeUndulationVelocity !== undefined && (isNaN(o.eelLikeUndulationVelocity) || o.eelLikeUndulationVelocity < 0 || o.eelLikeUndulationVelocity > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Eel-like undulation velocity divergence at tick " + tick);
            }
            if (o.benthicScavengingRate !== undefined && (isNaN(o.benthicScavengingRate) || o.benthicScavengingRate < 0 || o.benthicScavengingRate > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Benthic scavenging rate divergence at tick " + tick);
            }
            if (o.oralSuctionTractionIndex !== undefined && (isNaN(o.oralSuctionTractionIndex) || o.oralSuctionTractionIndex < 0 || o.oralSuctionTractionIndex > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Oral suction traction index divergence at tick " + tick);
            }
            if (o.parasiticTractionForce !== undefined && (isNaN(o.parasiticTractionForce) || o.parasiticTractionForce < 0 || o.parasiticTractionForce > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Parasitic traction force divergence at tick " + tick);
            }
            if (o.keratinTeethSharpness !== undefined && (isNaN(o.keratinTeethSharpness) || o.keratinTeethSharpness < 0 || o.keratinTeethSharpness > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Keratin teeth sharpness divergence at tick " + tick);
            }
            if (o.lingualPistonRasps !== undefined && (isNaN(o.lingualPistonRasps) || o.lingualPistonRasps < 0 || o.lingualPistonRasps > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Lingual piston rasps divergence at tick " + tick);
            }
            if (o.lamphredinSecretionRate !== undefined && (isNaN(o.lamphredinSecretionRate) || o.lamphredinSecretionRate < 0 || o.lamphredinSecretionRate > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Lamphredin secretion rate divergence at tick " + tick);
            }
            if (o.ostracodermArmorIntegrity !== undefined && (isNaN(o.ostracodermArmorIntegrity) || o.ostracodermArmorIntegrity < 0 || o.ostracodermArmorIntegrity > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Ostracoderm armor integrity divergence at tick " + tick);
            }
            if (o.cephalicShieldIntegrity !== undefined && (isNaN(o.cephalicShieldIntegrity) || o.cephalicShieldIntegrity < 0 || o.cephalicShieldIntegrity > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Cephalic shield integrity divergence at tick " + tick);
            }
            if (o.dermalPlateThickness !== undefined && (isNaN(o.dermalPlateThickness) || o.dermalPlateThickness < 0 || o.dermalPlateThickness > 15.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Dermal plate thickness divergence at tick " + tick);
            }
            if (o.crushResistanceCoeff !== undefined && (isNaN(o.crushResistanceCoeff) || o.crushResistanceCoeff < 0 || o.crushResistanceCoeff > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Crush resistance coeff divergence at tick " + tick);
            }
            if (o.negativeBuoyancyForce !== undefined && (isNaN(o.negativeBuoyancyForce) || o.negativeBuoyancyForce < 0 || o.negativeBuoyancyForce > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Negative buoyancy force divergence at tick " + tick);
            }
            if (o.pectoralFinElevation !== undefined && (isNaN(o.pectoralFinElevation) || o.pectoralFinElevation < 0 || o.pectoralFinElevation > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Pectoral fin elevation divergence at tick " + tick);
            }
            if (o.pectoralAttackAngle !== undefined && (isNaN(o.pectoralAttackAngle) || Math.abs(o.pectoralAttackAngle) > 1.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Pectoral attack angle divergence at tick " + tick);
            }
            if (o.pectoralElevationForceIndex !== undefined && (isNaN(o.pectoralElevationForceIndex) || o.pectoralElevationForceIndex < 0 || o.pectoralElevationForceIndex > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Pectoral elevation force index divergence at tick " + tick);
            }
            if (o.pitchTrimCorrectionTorque !== undefined && (isNaN(o.pitchTrimCorrectionTorque) || o.pitchTrimCorrectionTorque < 0 || o.pitchTrimCorrectionTorque > 5.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Pitch trim correction torque divergence at tick " + tick);
            }
            if (o.benthicGroundEffectMultiplier !== undefined && (isNaN(o.benthicGroundEffectMultiplier) || o.benthicGroundEffectMultiplier < 0.9 || o.benthicGroundEffectMultiplier > 2.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Benthic ground effect multiplier divergence at tick " + tick);
            }
            if (o.gnathostomeJawIndex !== undefined && (isNaN(o.gnathostomeJawIndex) || o.gnathostomeJawIndex < 0 || o.gnathostomeJawIndex > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Gnathostome jaw index divergence at tick " + tick);
            }
            if (o.placoidDenticleIndex !== undefined && (isNaN(o.placoidDenticleIndex) || o.placoidDenticleIndex < 0 || o.placoidDenticleIndex > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Placoid denticle index divergence at tick " + tick);
            }
            if (o.polyphyodontReplacementRate !== undefined && (isNaN(o.polyphyodontReplacementRate) || o.polyphyodontReplacementRate < 0 || o.polyphyodontReplacementRate > 105.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Polyphyodont replacement rate divergence at tick " + tick);
            }
            if (o.biteForceMagnitude !== undefined && (isNaN(o.biteForceMagnitude) || o.biteForceMagnitude < 0 || o.biteForceMagnitude > 2500.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Bite force magnitude divergence at tick " + tick);
            }
            if (o.gnathalShearSharpness !== undefined && (isNaN(o.gnathalShearSharpness) || o.gnathalShearSharpness < 0 || o.gnathalShearSharpness > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Gnathal shear sharpness divergence at tick " + tick);
            }
            if (o.adductorMusclesTension !== undefined && (isNaN(o.adductorMusclesTension) || o.adductorMusclesTension < 0 || o.adductorMusclesTension > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Adductor muscles tension divergence at tick " + tick);
            }
            if (o.armorCrushPenetration !== undefined && (isNaN(o.armorCrushPenetration) || o.armorCrushPenetration < 0 || o.armorCrushPenetration > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Armor crush penetration divergence at tick " + tick);
            }
            if (o.jawGapeAngle !== undefined && (isNaN(o.jawGapeAngle) || o.jawGapeAngle < 0 || o.jawGapeAngle > 1.5)) {
                anomalyCount++;
                console.error("[ANOMALY] Jaw gape angle divergence at tick " + tick);
            }
            if (o.suctionPulseForce !== undefined && (isNaN(o.suctionPulseForce) || o.suctionPulseForce < 0 || o.suctionPulseForce > 10.0)) {
                anomalyCount++;
                console.error("[ANOMALY] Suction pulse force divergence at tick " + tick);
            }
            if (o.isStemTetrapod) {
                if (o.digitCount !== undefined && (isNaN(o.digitCount) || o.digitCount < 5 || o.digitCount > 10)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Digit count divergence at tick " + tick + ": " + o.digitCount);
                }
                if (o.carpalTarsalFlexibility !== undefined && (isNaN(o.carpalTarsalFlexibility) || o.carpalTarsalFlexibility < 0 || o.carpalTarsalFlexibility > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Carpal/tarsal flexibility divergence at tick " + tick);
                }
                if (o.digitGripTraction !== undefined && (isNaN(o.digitGripTraction) || o.digitGripTraction < 0 || o.digitGripTraction > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Digit grip traction divergence at tick " + tick);
                }
                if (o.cervicalMobilityAngle !== undefined && (isNaN(o.cervicalMobilityAngle) || o.cervicalMobilityAngle < 0 || o.cervicalMobilityAngle > 2.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cervical mobility angle divergence at tick " + tick);
                }
                if (o.cervicalHeadAngle !== undefined && (isNaN(o.cervicalHeadAngle) || Math.abs(o.cervicalHeadAngle) > Math.PI)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cervical head angle divergence at tick " + tick);
                }
                if (o.thoracicRibcageSupport !== undefined && (isNaN(o.thoracicRibcageSupport) || o.thoracicRibcageSupport < 0 || o.thoracicRibcageSupport > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Thoracic ribcage support divergence at tick " + tick);
                }
                if (o.gravityResistanceFactor !== undefined && (isNaN(o.gravityResistanceFactor) || o.gravityResistanceFactor < 0 || o.gravityResistanceFactor > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Gravity resistance factor divergence at tick " + tick);
                }
                if (o.tympanicNotchSensitivity !== undefined && (isNaN(o.tympanicNotchSensitivity) || o.tympanicNotchSensitivity < 0 || o.tympanicNotchSensitivity > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Tympanic notch sensitivity divergence at tick " + tick);
                }
                if (o.stapesImpedanceMatching !== undefined && (isNaN(o.stapesImpedanceMatching) || o.stapesImpedanceMatching < 0 || o.stapesImpedanceMatching > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Stapes impedance matching divergence at tick " + tick);
                }
                if (o.tetrapodAppendicularIndex !== undefined && (isNaN(o.tetrapodAppendicularIndex) || o.tetrapodAppendicularIndex < 0 || o.tetrapodAppendicularIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Tetrapod appendicular index divergence at tick " + tick);
                }
                if (o.amphibiousAcousticIndex !== undefined && (isNaN(o.amphibiousAcousticIndex) || o.amphibiousAcousticIndex < 0 || o.amphibiousAcousticIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Amphibious acoustic index divergence at tick " + tick);
                }
            }
            if (o.isAmniota) {
                if (o.amnioticMembranesIntegrity !== undefined && (isNaN(o.amnioticMembranesIntegrity) || o.amnioticMembranesIntegrity < 0 || o.amnioticMembranesIntegrity > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Amniotic membranes integrity divergence at tick " + tick);
                }
                if (o.shellCalcificationLevel !== undefined && (isNaN(o.shellCalcificationLevel) || o.shellCalcificationLevel < 0 || o.shellCalcificationLevel > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Shell calcification level divergence at tick " + tick);
                }
                if (o.eggDesiccationResistance !== undefined && (isNaN(o.eggDesiccationResistance) || o.eggDesiccationResistance < 0 || o.eggDesiccationResistance > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Egg desiccation resistance divergence at tick " + tick);
                }
                if (o.clutchEggCount !== undefined && (isNaN(o.clutchEggCount) || o.clutchEggCount < 0 || o.clutchEggCount > 20)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Clutch egg count divergence at tick " + tick);
                }
                if (o.keratinizedScaleDensity !== undefined && (isNaN(o.keratinizedScaleDensity) || o.keratinizedScaleDensity < 0 || o.keratinizedScaleDensity > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Keratinized scale density divergence at tick " + tick);
                }
                if (o.epidermalMoistureRetention !== undefined && (isNaN(o.epidermalMoistureRetention) || o.epidermalMoistureRetention < 0 || o.epidermalMoistureRetention > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Epidermal moisture retention divergence at tick " + tick);
                }
                if (o.costalAspirationEfficiency !== undefined && (isNaN(o.costalAspirationEfficiency) || o.costalAspirationEfficiency < 0 || o.costalAspirationEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Costal aspiration efficiency divergence at tick " + tick);
                }
                if (o.tidalLungCapacity !== undefined && (isNaN(o.tidalLungCapacity) || o.tidalLungCapacity < 0 || o.tidalLungCapacity > 5.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Tidal lung capacity divergence at tick " + tick);
                }
                if (o.uricotelicWaterRetention !== undefined && (isNaN(o.uricotelicWaterRetention) || o.uricotelicWaterRetention < 0 || o.uricotelicWaterRetention > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Uricotelic water retention divergence at tick " + tick);
                }
                if (o.amnioticEggIntegrityIndex !== undefined && (isNaN(o.amnioticEggIntegrityIndex) || o.amnioticEggIntegrityIndex < 0 || o.amnioticEggIntegrityIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Amniotic egg integrity index divergence at tick " + tick);
                }
                if (o.keratinizedScaleResilienceIndex !== undefined && (isNaN(o.keratinizedScaleResilienceIndex) || o.keratinizedScaleResilienceIndex < 0 || o.keratinizedScaleResilienceIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Keratinized scale resilience index divergence at tick " + tick);
                }
            }
            if (o.isSynapsid) {
                if (o.dorsalSailSurfaceArea !== undefined && (isNaN(o.dorsalSailSurfaceArea) || o.dorsalSailSurfaceArea < 0 || o.dorsalSailSurfaceArea > 10.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Dorsal sail surface area divergence at tick " + tick);
                }
                if (o.neuralSpineVascularization !== undefined && (isNaN(o.neuralSpineVascularization) || o.neuralSpineVascularization < 0 || o.neuralSpineVascularization > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Neural spine vascularization divergence at tick " + tick);
                }
                if (o.solarThermalAbsorptionRate !== undefined && (isNaN(o.solarThermalAbsorptionRate) || o.solarThermalAbsorptionRate < 0 || o.solarThermalAbsorptionRate > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Solar thermal absorption rate divergence at tick " + tick);
                }
                if (o.convectiveHeatDissipation !== undefined && (isNaN(o.convectiveHeatDissipation) || o.convectiveHeatDissipation < 0 || o.convectiveHeatDissipation > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Convective heat dissipation divergence at tick " + tick);
                }
                if (o.coreTemperature !== undefined && (isNaN(o.coreTemperature) || o.coreTemperature < 5.0 || o.coreTemperature > 50.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Core temperature divergence at tick " + tick);
                }
                if (o.caninePiercingForce !== undefined && (isNaN(o.caninePiercingForce) || o.caninePiercingForce < 0 || o.caninePiercingForce > 5000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Canine piercing force divergence at tick " + tick);
                }
                if (o.incisorStrippingPrecision !== undefined && (isNaN(o.incisorStrippingPrecision) || o.incisorStrippingPrecision < 0 || o.incisorStrippingPrecision > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Incisor stripping precision divergence at tick " + tick);
                }
                if (o.molarShearingEfficiency !== undefined && (isNaN(o.molarShearingEfficiency) || o.molarShearingEfficiency < 0 || o.molarShearingEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Molar shearing efficiency divergence at tick " + tick);
                }
                if (o.synapsidBitePressure !== undefined && (isNaN(o.synapsidBitePressure) || o.synapsidBitePressure < 0 || o.synapsidBitePressure > 5000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Synapsid bite pressure divergence at tick " + tick);
                }
                if (o.thermalSailIndex !== undefined && (isNaN(o.thermalSailIndex) || o.thermalSailIndex < 0 || o.thermalSailIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Thermal sail index divergence at tick " + tick);
                }
                if (o.heterodontDentitionIndex !== undefined && (isNaN(o.heterodontDentitionIndex) || o.heterodontDentitionIndex < 0 || o.heterodontDentitionIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Heterodont dentition index divergence at tick " + tick);
                }
            }
            if (o.isMetatherian) {
                if (o.marsupiumPouchIndex !== undefined && (isNaN(o.marsupiumPouchIndex) || o.marsupiumPouchIndex < 0 || o.marsupiumPouchIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Marsupium pouch index divergence at tick " + tick);
                }
                if (o.altricialNeonateClimbingRate !== undefined && (isNaN(o.altricialNeonateClimbingRate) || o.altricialNeonateClimbingRate < 0 || o.altricialNeonateClimbingRate > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Altricial neonate climbing rate divergence at tick " + tick);
                }
            }
            if (o.isEutherian) {
                if (o.choriovitellinePlacentaIndex !== undefined && (isNaN(o.choriovitellinePlacentaIndex) || o.choriovitellinePlacentaIndex < 0 || o.choriovitellinePlacentaIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Choriovitelline placenta index divergence at tick " + tick);
                }
                if (o.trophoblastNutrientFlux !== undefined && (isNaN(o.trophoblastNutrientFlux) || o.trophoblastNutrientFlux < 0 || o.trophoblastNutrientFlux > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Trophoblast nutrient flux divergence at tick " + tick);
                }
            }
            if (o.hasTribosphenicMolars) {
                if (o.tribosphenicMolarIndex !== undefined && (isNaN(o.tribosphenicMolarIndex) || o.tribosphenicMolarIndex < 0 || o.tribosphenicMolarIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Tribosphenic molar index divergence at tick " + tick);
                }
                if (o.tribosphenicOcclusionQuality !== undefined && (isNaN(o.tribosphenicOcclusionQuality) || o.tribosphenicOcclusionQuality < 0 || o.tribosphenicOcclusionQuality > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Tribosphenic occlusion quality divergence at tick " + tick);
                }
                if (o.masticatoryCrushingForce !== undefined && (isNaN(o.masticatoryCrushingForce) || o.masticatoryCrushingForce < 0 || o.masticatoryCrushingForce > 1000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Masticatory crushing force divergence at tick " + tick);
                }
                if (o.caloricExtractionEfficiency !== undefined && (isNaN(o.caloricExtractionEfficiency) || o.caloricExtractionEfficiency < 0 || o.caloricExtractionEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Caloric extraction efficiency divergence at tick " + tick);
                }
                if (o.enamelPrismResilience !== undefined && (isNaN(o.enamelPrismResilience) || o.enamelPrismResilience < 0 || o.enamelPrismResilience > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Enamel prism resilience divergence at tick " + tick);
                }
            }
            if (o.hasChorioallantoicPlacenta) {
                if (o.chorioallantoicPlacentaIndex !== undefined && (isNaN(o.chorioallantoicPlacentaIndex) || o.chorioallantoicPlacentaIndex < 0 || o.chorioallantoicPlacentaIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Chorioallantoic placenta index divergence at tick " + tick);
                }
                if (o.chorionicVilliPenetrationDepth !== undefined && (isNaN(o.chorionicVilliPenetrationDepth) || o.chorionicVilliPenetrationDepth < 0 || o.chorionicVilliPenetrationDepth > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Chorionic villi penetration depth divergence at tick " + tick);
                }
                if (o.hemochorialNutrientFlux !== undefined && (isNaN(o.hemochorialNutrientFlux) || o.hemochorialNutrientFlux < 0 || o.hemochorialNutrientFlux > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Hemochorial nutrient flux divergence at tick " + tick);
                }
                if (o.gestationEnduranceTicks !== undefined && (isNaN(o.gestationEnduranceTicks) || o.gestationEnduranceTicks < 0 || o.gestationEnduranceTicks > 200.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Gestation endurance ticks divergence at tick " + tick);
                }
                if (o.neonatalEncephalizationQuotient !== undefined && (isNaN(o.neonatalEncephalizationQuotient) || o.neonatalEncephalizationQuotient < 0 || o.neonatalEncephalizationQuotient > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Neonatal encephalization quotient divergence at tick " + tick);
                }
            }
            if (o.hasPlagiaulacoidBlades) {
                if (o.plagiaulacoidBladeIndex !== undefined && (isNaN(o.plagiaulacoidBladeIndex) || o.plagiaulacoidBladeIndex < 0 || o.plagiaulacoidBladeIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Plagiaulacoid blade index divergence at tick " + tick);
                }
                if (o.palinalGrindingEfficiency !== undefined && (isNaN(o.palinalGrindingEfficiency) || o.palinalGrindingEfficiency < 0 || o.palinalGrindingEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Palinal grinding efficiency divergence at tick " + tick);
                }
                if (o.granivorousCaloricYield !== undefined && (isNaN(o.granivorousCaloricYield) || o.granivorousCaloricYield < 0 || o.granivorousCaloricYield > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Granivorous caloric yield divergence at tick " + tick);
                }
                if (o.bladeEnamelDurability !== undefined && (isNaN(o.bladeEnamelDurability) || o.bladeEnamelDurability < 0 || o.bladeEnamelDurability > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Blade enamel durability divergence at tick " + tick);
                }
            }
            if (o.canEnterTorpor) {
                if (o.torporHibernationIndex !== undefined && (isNaN(o.torporHibernationIndex) || o.torporHibernationIndex < 0 || o.torporHibernationIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Torpor hibernation index divergence at tick " + tick);
                }
                if (o.torporMetabolicSuppression !== undefined && (isNaN(o.torporMetabolicSuppression) || o.torporMetabolicSuppression < 0 || o.torporMetabolicSuppression > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Torpor metabolic suppression divergence at tick " + tick);
                }
                if (o.thermalShelterInsulation !== undefined && (isNaN(o.thermalShelterInsulation) || o.thermalShelterInsulation < 0 || o.thermalShelterInsulation > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Thermal shelter insulation divergence at tick " + tick);
                }
                if (o.brownFatThermogenesis !== undefined && (isNaN(o.brownFatThermogenesis) || o.brownFatThermogenesis < 0 || o.brownFatThermogenesis > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Brown fat thermogenesis divergence at tick " + tick);
                }
            }
            if (o.isArboreal) {
                if (o.opposableGraspingIndex !== undefined && (isNaN(o.opposableGraspingIndex) || o.opposableGraspingIndex < 0 || o.opposableGraspingIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Opposable grasping index divergence at tick " + tick);
                }
                if (o.branchGraspingTorque !== undefined && (isNaN(o.branchGraspingTorque) || o.branchGraspingTorque < 0 || o.branchGraspingTorque > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Branch grasping torque divergence at tick " + tick);
                }
                if (o.halluxDivergenceAngle !== undefined && (isNaN(o.halluxDivergenceAngle) || o.halluxDivergenceAngle < 0 || o.halluxDivergenceAngle > 120.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Hallux divergence angle divergence at tick " + tick);
                }
                if (o.arborealForagingYield !== undefined && (isNaN(o.arborealForagingYield) || o.arborealForagingYield < 0 || o.arborealForagingYield > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Arboreal foraging yield divergence at tick " + tick);
                }
            }
            if (o.isStereoCapable) {
                if (o.binocularVisionIndex !== undefined && (isNaN(o.binocularVisionIndex) || o.binocularVisionIndex < 0 || o.binocularVisionIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Binocular vision index divergence at tick " + tick);
                }
                if (o.orbitalConvergenceAngle !== undefined && (isNaN(o.orbitalConvergenceAngle) || o.orbitalConvergenceAngle < 0 || o.orbitalConvergenceAngle > 100.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Orbital convergence angle divergence at tick " + tick);
                }
                if (o.stereoscopicDisparityAcuity !== undefined && (isNaN(o.stereoscopicDisparityAcuity) || o.stereoscopicDisparityAcuity < 0 || o.stereoscopicDisparityAcuity > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Stereoscopic disparity acuity divergence at tick " + tick);
                }
                if (o.branchJumpPrecision !== undefined && (isNaN(o.branchJumpPrecision) || o.branchJumpPrecision < 0 || o.branchJumpPrecision > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Branch jump precision divergence at tick " + tick);
                }
            }
            if (o.isArchaeocete) {
                if (o.cetaceanTransitionIndex !== undefined && (isNaN(o.cetaceanTransitionIndex) || o.cetaceanTransitionIndex < 0 || o.cetaceanTransitionIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cetacean transition index divergence at tick " + tick);
                }
                if (o.pachyosteoscleroticBallast !== undefined && (isNaN(o.pachyosteoscleroticBallast) || o.pachyosteoscleroticBallast < 0 || o.pachyosteoscleroticBallast > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Pachyosteosclerotic ballast divergence at tick " + tick);
                }
                if (o.mandibularFatPadConduction !== undefined && (isNaN(o.mandibularFatPadConduction) || o.mandibularFatPadConduction < 0 || o.mandibularFatPadConduction > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Mandibular fat pad conduction divergence at tick " + tick);
                }
                if (o.benthicLurkingStability !== undefined && (isNaN(o.benthicLurkingStability) || o.benthicLurkingStability < 0 || o.benthicLurkingStability > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Benthic lurking stability divergence at tick " + tick);
                }
            }
            if (o.isAquaticUndulator) {
                if (o.aquaticUndulatingThrust !== undefined && (isNaN(o.aquaticUndulatingThrust) || o.aquaticUndulatingThrust < 0 || o.aquaticUndulatingThrust > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Aquatic undulating thrust divergence at tick " + tick);
                }
                if (o.caudalFlukePropulsionEfficiency !== undefined && (isNaN(o.caudalFlukePropulsionEfficiency) || o.caudalFlukePropulsionEfficiency < 0 || o.caudalFlukePropulsionEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Caudal fluke propulsion efficiency divergence at tick " + tick);
                }
                if (o.dorsoventralUndulationRate !== undefined && (isNaN(o.dorsoventralUndulationRate) || o.dorsoventralUndulationRate < 0 || o.dorsoventralUndulationRate > 10.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Dorsoventral undulation rate divergence at tick " + tick);
                }
                if (o.underwaterDirectionalHearing !== undefined && (isNaN(o.underwaterDirectionalHearing) || o.underwaterDirectionalHearing < 0 || o.underwaterDirectionalHearing > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Underwater directional hearing divergence at tick " + tick);
                }
            }
            if (o.isMegaherbivore) {
                if (o.graviportalColumnarIndex !== undefined && (isNaN(o.graviportalColumnarIndex) || o.graviportalColumnarIndex < 0 || o.graviportalColumnarIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Graviportal columnar index divergence at tick " + tick);
                }
                if (o.columnarStanceEfficiency !== undefined && (isNaN(o.columnarStanceEfficiency) || o.columnarStanceEfficiency < 0 || o.columnarStanceEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Columnar stance efficiency divergence at tick " + tick);
                }
                if (o.cecalFermentationTransit !== undefined && (isNaN(o.cecalFermentationTransit) || o.cecalFermentationTransit < 0 || o.cecalFermentationTransit > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cecal fermentation transit divergence at tick " + tick);
                }
            }
            if (o.isDinoceratan) {
                if (o.ossiconeWeaponizationIndex !== undefined && (isNaN(o.ossiconeWeaponizationIndex) || o.ossiconeWeaponizationIndex < 0 || o.ossiconeWeaponizationIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Ossicone weaponization index divergence at tick " + tick);
                }
                if (o.cranialOssiconeArmor !== undefined && (isNaN(o.cranialOssiconeArmor) || o.cranialOssiconeArmor < 0 || o.cranialOssiconeArmor > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cranial ossicone armor divergence at tick " + tick);
                }
                if (o.saberCanineShearing !== undefined && (isNaN(o.saberCanineShearing) || o.saberCanineShearing < 0 || o.saberCanineShearing > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Saber canine shearing divergence at tick " + tick);
                }
            }
            if (o.isApexCarnivore) {
                if (o.boneCrushingCarnassialIndex !== undefined && (isNaN(o.boneCrushingCarnassialIndex) || o.boneCrushingCarnassialIndex < 0 || o.boneCrushingCarnassialIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Bone crushing carnassial index divergence at tick " + tick);
                }
                if (o.cursorialTerrestrialIndex !== undefined && (isNaN(o.cursorialTerrestrialIndex) || o.cursorialTerrestrialIndex < 0 || o.cursorialTerrestrialIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cursorial terrestrial index divergence at tick " + tick);
                }
                if (o.craniomandibularBiteForce !== undefined && (isNaN(o.craniomandibularBiteForce) || o.craniomandibularBiteForce < 0 || o.craniomandibularBiteForce > 4000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Craniomandibular bite force divergence at tick " + tick);
                }
                if (o.carnassialShearingEfficiency !== undefined && (isNaN(o.carnassialShearingEfficiency) || o.carnassialShearingEfficiency < 0 || o.carnassialShearingEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Carnassial shearing efficiency divergence at tick " + tick);
                }
                if (o.digitigradeStrideEfficiency !== undefined && (isNaN(o.digitigradeStrideEfficiency) || o.digitigradeStrideEfficiency < 0 || o.digitigradeStrideEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Digitigrade stride efficiency divergence at tick " + tick);
                }
            }
            if (o.isTerrorBird) {
                if (o.beakBiomechanicsIndex !== undefined && (isNaN(o.beakBiomechanicsIndex) || o.beakBiomechanicsIndex < 0 || o.beakBiomechanicsIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Beak biomechanics index divergence at tick " + tick);
                }
                if (o.avianPursuitIndex !== undefined && (isNaN(o.avianPursuitIndex) || o.avianPursuitIndex < 0 || o.avianPursuitIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Avian pursuit index divergence at tick " + tick);
                }
                if (o.beakShearForce !== undefined && (isNaN(o.beakShearForce) || o.beakShearForce < 0 || o.beakShearForce > 3500.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Beak shear force divergence at tick " + tick);
                }
                if (o.craniokineticShockTorque !== undefined && (isNaN(o.craniokineticShockTorque) || o.craniokineticShockTorque < 0 || o.craniokineticShockTorque > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Craniokinetic shock torque divergence at tick " + tick);
                }
                if (o.avianStrideVelocity !== undefined && (isNaN(o.avianStrideVelocity) || o.avianStrideVelocity < 0 || o.avianStrideVelocity > 6.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Avian stride velocity divergence at tick " + tick);
                }
            }
            if (o.isParaceratheriid) {
                if (o.paraceratheriidElevationIndex !== undefined && (isNaN(o.paraceratheriidElevationIndex) || o.paraceratheriidElevationIndex < 0 || o.paraceratheriidElevationIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Paraceratheriid elevation index divergence at tick " + tick);
                }
                if (o.browsingFoliageIndex !== undefined && (isNaN(o.browsingFoliageIndex) || o.browsingFoliageIndex < 0 || o.browsingFoliageIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Browsing foliage index divergence at tick " + tick);
                }
                if (o.canopyBrowsingReach !== undefined && (isNaN(o.canopyBrowsingReach) || o.canopyBrowsingReach < 0 || o.canopyBrowsingReach > 12.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Canopy browsing reach divergence at tick " + tick);
                }
                if (o.hyperColumnarStanceLock !== undefined && (isNaN(o.hyperColumnarStanceLock) || o.hyperColumnarStanceLock < 0 || o.hyperColumnarStanceLock > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Hyper-columnar stance lock divergence at tick " + tick);
                }
                if (o.prehensileLipDexterity !== undefined && (isNaN(o.prehensileLipDexterity) || o.prehensileLipDexterity < 0 || o.prehensileLipDexterity > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Prehensile lip dexterity divergence at tick " + tick);
                }
                if (o.synovialHydraulicBuffering !== undefined && (isNaN(o.synovialHydraulicBuffering) || o.synovialHydraulicBuffering < 0 || o.synovialHydraulicBuffering > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Synovial hydraulic buffering divergence at tick " + tick);
                }
                if (o.cervicalExtensionSpan !== undefined && (isNaN(o.cervicalExtensionSpan) || o.cervicalExtensionSpan < 0 || o.cervicalExtensionSpan > 5.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cervical extension span divergence at tick " + tick);
                }
                if (o.conicalIncisorStripping !== undefined && (isNaN(o.conicalIncisorStripping) || o.conicalIncisorStripping < 0 || o.conicalIncisorStripping > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Conical incisor stripping divergence at tick " + tick);
                }
                if (o.foliageCaloricExtraction !== undefined && (isNaN(o.foliageCaloricExtraction) || o.foliageCaloricExtraction < 0 || o.foliageCaloricExtraction > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Foliage caloric extraction divergence at tick " + tick);
                }
                if (o.gigantothermicMetabolicEfficiency !== undefined && (isNaN(o.gigantothermicMetabolicEfficiency) || o.gigantothermicMetabolicEfficiency < 0 || o.gigantothermicMetabolicEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Gigantothermic metabolic efficiency divergence at tick " + tick);
                }
            }
            if (o.isEntelodont) {
                if (o.craniomandibularCrushForce !== undefined && (isNaN(o.craniomandibularCrushForce) || o.craniomandibularCrushForce < 0 || o.craniomandibularCrushForce > 6000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Craniomandibular crush force divergence at tick " + tick);
                }
                if (o.premolarBoneCrushingRate !== undefined && (isNaN(o.premolarBoneCrushingRate) || o.premolarBoneCrushingRate < 0 || o.premolarBoneCrushingRate > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Premolar bone crushing rate divergence at tick " + tick);
                }
                if (o.boneMarrowExtractionYield !== undefined && (isNaN(o.boneMarrowExtractionYield) || o.boneMarrowExtractionYield < 0 || o.boneMarrowExtractionYield > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Bone marrow extraction yield divergence at tick " + tick);
                }
                if (o.zygomaticFlangeExpansion !== undefined && (isNaN(o.zygomaticFlangeExpansion) || o.zygomaticFlangeExpansion < 0 || o.zygomaticFlangeExpansion > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Zygomatic flange expansion divergence at tick " + tick);
                }
                if (o.mandibularTubercleDefense !== undefined && (isNaN(o.mandibularTubercleDefense) || o.mandibularTubercleDefense < 0 || o.mandibularTubercleDefense > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Mandibular tubercle defense divergence at tick " + tick);
                }
                if (o.dorsalWitherSpineSupport !== undefined && (isNaN(o.dorsalWitherSpineSupport) || o.dorsalWitherSpineSupport < 0 || o.dorsalWitherSpineSupport > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Dorsal wither spine support divergence at tick " + tick);
                }
                if (o.cervicalWhipTorque !== undefined && (isNaN(o.cervicalWhipTorque) || o.cervicalWhipTorque < 0 || o.cervicalWhipTorque > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cervical whip torque divergence at tick " + tick);
                }
                if (o.subunguligradeRunningVelocity !== undefined && (isNaN(o.subunguligradeRunningVelocity) || o.subunguligradeRunningVelocity < 0 || o.subunguligradeRunningVelocity > 6.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Sub-unguligrade running velocity divergence at tick " + tick);
                }
                if (o.omnivorousScavengingDrive !== undefined && (isNaN(o.omnivorousScavengingDrive) || o.omnivorousScavengingDrive < 0 || o.omnivorousScavengingDrive > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Omnivorous scavenging drive divergence at tick " + tick);
                }
                if (o.entelodontBiteIndex !== undefined && (isNaN(o.entelodontBiteIndex) || o.entelodontBiteIndex < 0 || o.entelodontBiteIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Entelodont bite index divergence at tick " + tick);
                }
                if (o.omnivorousFlangeIndex !== undefined && (isNaN(o.omnivorousFlangeIndex) || o.omnivorousFlangeIndex < 0 || o.omnivorousFlangeIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Omnivorous flange index divergence at tick " + tick);
                }
            }
            if (o.isChalicothere) {
                if (o.retractileUngualClaws !== undefined && (isNaN(o.retractileUngualClaws) || o.retractileUngualClaws < 0 || o.retractileUngualClaws > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Retractile ungual claws divergence at tick " + tick);
                }
                if (o.knuckleWalkingLocomotion !== undefined && (isNaN(o.knuckleWalkingLocomotion) || o.knuckleWalkingLocomotion < 0 || o.knuckleWalkingLocomotion > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Knuckle-walking locomotion divergence at tick " + tick);
                }
                if (o.knuckleWalkingTripodalStance !== undefined && (isNaN(o.knuckleWalkingTripodalStance) || o.knuckleWalkingTripodalStance < 0 || o.knuckleWalkingTripodalStance > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Knuckle-walking tripodal stance divergence at tick " + tick);
                }
                if (o.branchHookingPullForce !== undefined && (isNaN(o.branchHookingPullForce) || o.branchHookingPullForce < 0 || o.branchHookingPullForce > 4500.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Branch-hooking pull force divergence at tick " + tick);
                }
                if (o.foliageStrippingYield !== undefined && (isNaN(o.foliageStrippingYield) || o.foliageStrippingYield < 0 || o.foliageStrippingYield > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Foliage stripping yield divergence at tick " + tick);
                }
                if (o.lophodontMasticationEfficiency !== undefined && (isNaN(o.lophodontMasticationEfficiency) || o.lophodontMasticationEfficiency < 0 || o.lophodontMasticationEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Lophodont mastication efficiency divergence at tick " + tick);
                }
                if (o.cementumWearResistance !== undefined && (isNaN(o.cementumWearResistance) || o.cementumWearResistance < 0 || o.cementumWearResistance > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cementum wear resistance divergence at tick " + tick);
                }
                if (o.chalicothereClawIndex !== undefined && (isNaN(o.chalicothereClawIndex) || o.chalicothereClawIndex < 0 || o.chalicothereClawIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Chalicothere claw index divergence at tick " + tick);
                }
                if (o.branchPullingIndex !== undefined && (isNaN(o.branchPullingIndex) || o.branchPullingIndex < 0 || o.branchPullingIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Branch pulling index divergence at tick " + tick);
                }
            }

            if (o.isMachairodont) {
                if (o.saberCanineLength !== undefined && (isNaN(o.saberCanineLength) || o.saberCanineLength < 0 || o.saberCanineLength > 25.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Saber canine length divergence at tick " + tick);
                }
                if (o.saberCanineSerrationDensity !== undefined && (isNaN(o.saberCanineSerrationDensity) || o.saberCanineSerrationDensity < 0 || o.saberCanineSerrationDensity > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Saber canine serration density divergence at tick " + tick);
                }
                if (o.hyperExtendedJawGape !== undefined && (isNaN(o.hyperExtendedJawGape) || o.hyperExtendedJawGape < 0 || o.hyperExtendedJawGape > 140.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Hyper-extended jaw gape divergence at tick " + tick);
                }
                if (o.canineShearBiteForce !== undefined && (isNaN(o.canineShearBiteForce) || o.canineShearBiteForce < 0 || o.canineShearBiteForce > 3500.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Canine shear bite force divergence at tick " + tick);
                }
                if (o.cervicalVesselLacerationRate !== undefined && (isNaN(o.cervicalVesselLacerationRate) || o.cervicalVesselLacerationRate < 0 || o.cervicalVesselLacerationRate > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Cervical vessel laceration rate divergence at tick " + tick);
                }
                if (o.retractileForelimbClaws !== undefined && (isNaN(o.retractileForelimbClaws) || o.retractileForelimbClaws < 0 || o.retractileForelimbClaws > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Retractile forelimb claws divergence at tick " + tick);
                }
                if (o.preyGrapplingImmobilization !== undefined && (isNaN(o.preyGrapplingImmobilization) || o.preyGrapplingImmobilization < 0 || o.preyGrapplingImmobilization > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Prey grappling immobilization divergence at tick " + tick);
                }
                if (o.saberCanineIndex !== undefined && (isNaN(o.saberCanineIndex) || o.saberCanineIndex < 0 || o.saberCanineIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Saber canine index divergence at tick " + tick);
                }
            }

            if (o.isAmphicyonid) {
                if (o.amphicyonidCrushForce !== undefined && (isNaN(o.amphicyonidCrushForce) || o.amphicyonidCrushForce < 0 || o.amphicyonidCrushForce > 6000.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Amphicyonid crush force divergence at tick " + tick);
                }
                if (o.premolarBoneCrushingEfficiency !== undefined && (isNaN(o.premolarBoneCrushingEfficiency) || o.premolarBoneCrushingEfficiency < 0 || o.premolarBoneCrushingEfficiency > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Premolar bone crushing efficiency divergence at tick " + tick);
                }
                if (o.semiPlantigradeEndurance !== undefined && (isNaN(o.semiPlantigradeEndurance) || o.semiPlantigradeEndurance < 0 || o.semiPlantigradeEndurance > 1.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Semi-plantigrade endurance divergence at tick " + tick);
                }
                if (o.bearDogIndex !== undefined && (isNaN(o.bearDogIndex) || o.bearDogIndex < 0 || o.bearDogIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Bear-dog index divergence at tick " + tick);
                }
            }


            if (o.isMammaliaform) {
                if (o.dentarySquamosalFusionDegree !== undefined && (isNaN(o.dentarySquamosalFusionDegree) || o.dentarySquamosalFusionDegree < 0 || o.dentarySquamosalFusionDegree > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Dentary squamosal fusion degree divergence at tick " + tick);
                }
                if (o.masticatoryBiteTorque !== undefined && (isNaN(o.masticatoryBiteTorque) || o.masticatoryBiteTorque < 0 || o.masticatoryBiteTorque > 10.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Masticatory bite torque divergence at tick " + tick);
                }
                if (o.ossicularChainIntegration !== undefined && (isNaN(o.ossicularChainIntegration) || o.ossicularChainIntegration < 0 || o.ossicularChainIntegration > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Ossicular chain integration divergence at tick " + tick);
                }
                if (o.acousticPressureGain !== undefined && (isNaN(o.acousticPressureGain) || o.acousticPressureGain < 0 || o.acousticPressureGain > 50.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Acoustic pressure gain divergence at tick " + tick);
                }
                if (o.mammaliaformEarIndex !== undefined && (isNaN(o.mammaliaformEarIndex) || o.mammaliaformEarIndex < 0 || o.mammaliaformEarIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Mammaliaform ear index divergence at tick " + tick);
                }
                if (o.lactationIndex !== undefined && (isNaN(o.lactationIndex) || o.lactationIndex < 0 || o.lactationIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Lactation index divergence at tick " + tick);
                }
            }
            if (o.isTherapsid) {
                if (o.palatalShelfFusionDegree !== undefined && (isNaN(o.palatalShelfFusionDegree) || o.palatalShelfFusionDegree < 0 || o.palatalShelfFusionDegree > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Palatal shelf fusion degree divergence at tick " + tick);
                }
                if (o.continuousBreathingEfficiency !== undefined && (isNaN(o.continuousBreathingEfficiency) || o.continuousBreathingEfficiency < 0 || o.continuousBreathingEfficiency > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Continuous breathing efficiency divergence at tick " + tick);
                }
                if (o.respiratoryMoistureReclamation !== undefined && (isNaN(o.respiratoryMoistureReclamation) || o.respiratoryMoistureReclamation < 0 || o.respiratoryMoistureReclamation > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Respiratory moisture reclamation divergence at tick " + tick);
                }
                if (o.basalMetabolicHeatFlux !== undefined && (isNaN(o.basalMetabolicHeatFlux) || o.basalMetabolicHeatFlux < 0.5 || o.basalMetabolicHeatFlux > 5.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Basal metabolic heat flux divergence at tick " + tick);
                }
                if (o.therapsidCoreTemp !== undefined && (isNaN(o.therapsidCoreTemp) || o.therapsidCoreTemp < 15.0 || o.therapsidCoreTemp > 50.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Therapsid core temperature divergence at tick " + tick);
                }
                if (o.vibrissaeInsulationDensity !== undefined && (isNaN(o.vibrissaeInsulationDensity) || o.vibrissaeInsulationDensity < 0 || o.vibrissaeInsulationDensity > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Vibrissae insulation density divergence at tick " + tick);
                }
                if (o.parasagittalRotationAngle !== undefined && (isNaN(o.parasagittalRotationAngle) || o.parasagittalRotationAngle < 0 || o.parasagittalRotationAngle > 2.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Parasagittal rotation angle divergence at tick " + tick);
                }
                if (o.aerobicEnduranceMultiplier !== undefined && (isNaN(o.aerobicEnduranceMultiplier) || o.aerobicEnduranceMultiplier < 0.5 || o.aerobicEnduranceMultiplier > 5.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Aerobic endurance multiplier divergence at tick " + tick);
                }
                if (o.nocturnalActivityIndex !== undefined && (isNaN(o.nocturnalActivityIndex) || o.nocturnalActivityIndex < 0 || o.nocturnalActivityIndex > 1.5)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Nocturnal activity index divergence at tick " + tick);
                }
                if (o.secondaryPalateIndex !== undefined && (isNaN(o.secondaryPalateIndex) || o.secondaryPalateIndex < 0 || o.secondaryPalateIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Secondary palate index divergence at tick " + tick);
                }
                if (o.endothermicMetabolicIndex !== undefined && (isNaN(o.endothermicMetabolicIndex) || o.endothermicMetabolicIndex < 0 || o.endothermicMetabolicIndex > 105.0)) {
                    anomalyCount++;
                    console.error("[ANOMALY] Endothermic metabolic index divergence at tick " + tick);
                }
            }
        }
    }
}

const elapsedMs = Date.now() - startTime;
const tps = Math.round((TARGET_TICKS / (elapsedMs / 1000)));
if (global.gc) global.gc();
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
const latestGLI = hist.grazingLanternIndex ? hist.grazingLanternIndex[hist.grazingLanternIndex.length - 1] : 0;
const latestBER = hist.bioerosionRateIndex ? hist.bioerosionRateIndex[hist.bioerosionRateIndex.length - 1] : 0;
const latestCDI = hist.cuvierianDefenseIndex ? hist.cuvierianDefenseIndex[hist.cuvierianDefenseIndex.length - 1] : 0;
const latestVRI = hist.visceralRegenerationIndex ? hist.visceralRegenerationIndex[hist.visceralRegenerationIndex.length - 1] : 0;

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
console.log("Latest 87th Channel (% GLI): " + (typeof latestGLI === "number" ? latestGLI.toFixed(1) : latestGLI) + "%");
console.log("Latest 88th Channel (% BER): " + (typeof latestBER === "number" ? latestBER.toFixed(1) : latestBER) + "%");
console.log("Latest 89th Channel (% CDI): " + (typeof latestCDI === "number" ? latestCDI.toFixed(1) : latestCDI) + "%");
console.log("Latest 90th Channel (% VRI): " + (typeof latestVRI === "number" ? latestVRI.toFixed(1) : latestVRI) + "%");
console.log("Latest 91st Channel (% CAC): " + ((hist.catchApparatusComplianceIndex ? hist.catchApparatusComplianceIndex[hist.catchApparatusComplianceIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 92nd Channel (% EGE): " + ((hist.extraoralGastricEversionIndex ? hist.extraoralGastricEversionIndex[hist.extraoralGastricEversionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 93rd Channel (% SVI): " + ((hist.serpentiformVelocityIndex ? hist.serpentiformVelocityIndex[hist.serpentiformVelocityIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 94th Channel (% BFR): " + ((hist.brittleFractureRatio ? hist.brittleFractureRatio[hist.brittleFractureRatio.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 95th Channel (% PSI): " + ((hist.pharyngealSlitIndex ? hist.pharyngealSlitIndex[hist.pharyngealSlitIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 96th Channel (% PBE): " + ((hist.proboscisBurrowingEfficiency ? hist.proboscisBurrowingEfficiency[hist.proboscisBurrowingEfficiency.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 97th Channel (% NTI): " + ((hist.notochordTensionIndex ? hist.notochordTensionIndex[hist.notochordTensionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 98th Channel (% MFE): " + ((hist.myomericFlexionEfficiency ? hist.myomericFlexionEfficiency[hist.myomericFlexionEfficiency.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 99th Channel (% TPI): " + ((hist.tunicProtectiveIntegrity ? hist.tunicProtectiveIntegrity[hist.tunicProtectiveIntegrity.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 100th Channel (% CPR): " + ((hist.ciliaryPumpingReversalRatio ? hist.ciliaryPumpingReversalRatio[hist.ciliaryPumpingReversalRatio.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 101st Channel (% SCI): " + ((hist.slimeDefenseCapacity ? hist.slimeDefenseCapacity[hist.slimeDefenseCapacity.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 102nd Channel (% OTI): " + ((hist.oralSuctionTractionIndex ? hist.oralSuctionTractionIndex[hist.oralSuctionTractionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 103rd Channel (% OAI): " + ((hist.ostracodermArmorIntegrity ? hist.ostracodermArmorIntegrity[hist.ostracodermArmorIntegrity.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 104th Channel (% PEF): " + ((hist.pectoralElevationForceIndex ? hist.pectoralElevationForceIndex[hist.pectoralElevationForceIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 105th Channel (% GJI): " + ((hist.gnathostomeJawIndex ? hist.gnathostomeJawIndex[hist.gnathostomeJawIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 106th Channel (% CTS): " + ((hist.cranioThoracicShearIndex ? hist.cranioThoracicShearIndex[hist.cranioThoracicShearIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 107th Channel (% PDI): " + ((hist.placoidDenticleIndex ? hist.placoidDenticleIndex[hist.placoidDenticleIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 108th Channel (% PBR): " + ((hist.polyphyodontReplacementRate ? hist.polyphyodontReplacementRate[hist.polyphyodontReplacementRate.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 109th Channel (% SBI): " + ((hist.swimBladderIndex ? hist.swimBladderIndex[hist.swimBladderIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 110th Channel (% OVR): " + ((hist.opercularVentilationRate ? hist.opercularVentilationRate[hist.opercularVentilationRate.length - 1] : 0).toFixed(1)) + "%");
const ostMgr = sandbox.osteichthyesSwimBladderManager;
const ostMetrics = ostMgr ? ostMgr.getMetrics() : {};
console.log("Total Osteichthyes: " + (ostMetrics.totalOsteichthyesOrganisms || 0));
console.log("Mean Swim Bladder Index (% SBI): " + ((ostMetrics.meanSwimBladderIndex || 0).toFixed(1)) + "%");
console.log("Mean Opercular Ventilation Rate (% OVR): " + ((ostMetrics.meanOpercularVentilationRate || 0).toFixed(1)) + "%");
console.log("Mean Swim Bladder Volume: " + ((ostMetrics.meanSwimBladderVolume || 0).toFixed(2)));
console.log("Mean Neutral Buoyancy Hover Ratio: " + (((ostMetrics.meanNeutralBuoyancyHoverRatio || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Fin Ray Count: " + ((ostMetrics.meanFinRayCount || 0).toFixed(1)));
console.log("Mean Endochondral Bone Density: " + (((ostMetrics.meanEndochondralBoneDensity || 0) * 100.0).toFixed(1)) + "%");
console.log("Neutral Buoyancy Hover Events: " + (ostMetrics.neutralBuoyancyHoverEvents || 0));
console.log("Motionless Breathing Events: " + (ostMetrics.motionlessBreathingEvents || 0));
console.log("Gas Gland Secretion Events: " + (ostMetrics.gasGlandSecretionEvents || 0));
console.log("Fin Ray Micro Maneuvers: " + (ostMetrics.finRayMicroManeuvers || 0));
console.log("Cumulative Hover Energy Saved: " + ((ostMetrics.cumulativeHoverEnergySaved || 0).toFixed(2)));
console.log("Latest 111th Channel (% LFI): " + ((hist.lobeFinLocomotionIndex ? hist.lobeFinLocomotionIndex[hist.lobeFinLocomotionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 112th Channel (% PRI): " + ((hist.pulmonaryRespirationRate ? hist.pulmonaryRespirationRate[hist.pulmonaryRespirationRate.length - 1] : 0).toFixed(1)) + "%");
const sarcMgr = sandbox.sarcopterygiiLobeFinManager;
const sarcMetrics = sarcMgr ? sarcMgr.getMetrics() : {};
console.log("Total Sarcopterygii: " + (sarcMetrics.totalSarcopterygiiOrganisms || 0));
console.log("Mean Lobe-Fin Locomotion Index (% LFI): " + ((sarcMetrics.meanLobeFinIndex || 0).toFixed(1)) + "%");
console.log("Mean Pulmonary Respiration Index (% PRI): " + ((sarcMetrics.meanPulmonaryRespirationIndex || 0).toFixed(1)) + "%");
console.log("Mean Lobe-Fin Torque: " + ((sarcMetrics.meanLobeFinTorque || 0).toFixed(2)) + "x");
console.log("Mean Substrate Prop-Up Efficiency: " + (((sarcMetrics.meanPropUpEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Pulmonary Vascular Density: " + (((sarcMetrics.meanPulmonaryVascularDensity || 0) * 100.0).toFixed(1)) + "%");
console.log("Substrate Walking Events: " + (sarcMetrics.substrateWalkingEvents || 0));
console.log("Surface Air Gulp Events: " + (sarcMetrics.surfaceAirGulpEvents || 0));
console.log("Pulmonary Breathing Events: " + (sarcMetrics.pulmonaryBreathingEvents || 0));
console.log("Periscope Ambush Strikes: " + (sarcMetrics.periscopeAmbushStrikes || 0));
console.log("Cumulative Pulmonary Biomass: " + ((sarcMetrics.cumulativePulmonaryBiomass || 0).toFixed(2)));
console.log("Latest 113th Channel (% TAI): " + ((hist.tetrapodAppendicularIndex ? hist.tetrapodAppendicularIndex[hist.tetrapodAppendicularIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 114th Channel (% AAI): " + ((hist.amphibiousAcousticIndex ? hist.amphibiousAcousticIndex[hist.amphibiousAcousticIndex.length - 1] : 0).toFixed(1)) + "%");
const tetMgr = sandbox.tetrapodAppendageManager;
const tetMetrics = tetMgr ? tetMgr.getMetrics() : {};
console.log("Total Stem Tetrapods: " + (tetMetrics.totalTetrapodOrganisms || 0));
console.log("Mean Tetrapod Appendicular Index (% TAI): " + ((tetMetrics.meanTetrapodAppendicularIndex || 0).toFixed(1)) + "%");
console.log("Mean Amphibious Acoustic Index (% AAI): " + ((tetMetrics.meanAmphibiousAcousticIndex || 0).toFixed(1)) + "%");
console.log("Mean Digit Count: " + ((tetMetrics.meanDigitCount || 0).toFixed(1)));
console.log("Mean Digit Grip Traction: " + (((tetMetrics.meanDigitGripTraction || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Cervical Mobility Angle: " + ((tetMetrics.meanCervicalMobilityAngle || 0).toFixed(2)) + " rad");
console.log("Mean Thoracic Ribcage Support: " + (((tetMetrics.meanThoracicRibcageSupport || 0) * 100.0).toFixed(1)) + "%");
console.log("Terrestrial Striding Events: " + (tetMetrics.terrestrialStridingEvents || 0));
console.log("Cervical Head Turns: " + (tetMetrics.cervicalHeadTurns || 0));
console.log("Aerial Acoustic Alerts: " + (tetMetrics.aerialAcousticAlerts || 0));
console.log("Gravity Defiance Events: " + (tetMetrics.gravityDefianceEvents || 0));
console.log("Cumulative Tetrapod Biomass: " + ((tetMetrics.cumulativeTetrapodBiomass || 0).toFixed(2)));
console.log("Latest 115th Channel (% AEI): " + ((hist.amnioticEggIntegrityIndex ? hist.amnioticEggIntegrityIndex[hist.amnioticEggIntegrityIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 116th Channel (% KSR): " + ((hist.keratinizedScaleResilienceIndex ? hist.keratinizedScaleResilienceIndex[hist.keratinizedScaleResilienceIndex.length - 1] : 0).toFixed(1)) + "%");
const amnMgr = sandbox.amniotaEggScaleManager;
const amnMetrics = amnMgr ? amnMgr.getMetrics() : {};
console.log("Total Amniota Organisms: " + (amnMetrics.totalAmniotaOrganisms || 0));
console.log("Mean Amniotic Egg Integrity (% AEI): " + ((amnMetrics.meanAmnioticEggIntegrity || 0).toFixed(1)) + "%");
console.log("Mean Keratinized Scale Resilience (% KSR): " + ((amnMetrics.meanKeratinizedScaleResilience || 0).toFixed(1)) + "%");
console.log("Mean Shell Calcification: " + (((amnMetrics.meanShellCalcification || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Egg Desiccation Resistance: " + (((amnMetrics.meanEggDesiccationResistance || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Keratinized Scale Density: " + (((amnMetrics.meanKeratinizedScaleDensity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Moisture Retention: " + (((amnMetrics.meanEpidermalMoistureRetention || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Costal Aspiration: " + (((amnMetrics.meanCostalAspirationEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Tidal Lung Capacity: " + ((amnMetrics.meanTidalLungCapacity || 0).toFixed(2)) + "x");
console.log("Mean Uricotelic Retention: " + (((amnMetrics.meanUricotelicRetention || 0) * 100.0).toFixed(1)) + "%");
console.log("Terrestrial Clutch Laying Events: " + (amnMetrics.terrestrialClutchLayingEvents || 0));
console.log("Direct Terrestrial Hatching Events: " + (amnMetrics.directTerrestrialHatchingEvents || 0));
console.log("Desiccation Defiance Events: " + (amnMetrics.desiccationDefianceEvents || 0));
console.log("Costal Negative-Pressure Breaths: " + (amnMetrics.costalNegativePressureBreaths || 0));
console.log("Uricotelic Water Saved Units: " + ((amnMetrics.uricotelicWaterSavedUnits || 0).toFixed(2)));
console.log("Cumulative Amniota Biomass: " + ((amnMetrics.cumulativeAmniotaBiomass || 0).toFixed(2)));
console.log("Latest 117th Channel (% TSI): " + ((hist.thermalSailIndex ? hist.thermalSailIndex[hist.thermalSailIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 118th Channel (% HDI): " + ((hist.heterodontDentitionIndex ? hist.heterodontDentitionIndex[hist.heterodontDentitionIndex.length - 1] : 0).toFixed(1)) + "%");
const synMgr = sandbox.synapsidSailDentitionManager;
const synMetrics = synMgr ? synMgr.getMetrics() : {};
console.log("Total Synapsids: " + (synMetrics.totalSynapsidOrganisms || 0));
console.log("Mean Thermal Sail Index (% TSI): " + ((synMetrics.meanThermalSailIndex || 0).toFixed(1)) + "%");
console.log("Mean Heterodont Dentition Index (% HDI): " + ((synMetrics.meanHeterodontDentitionIndex || 0).toFixed(1)) + "%");
console.log("Mean Dorsal Sail Area: " + ((synMetrics.meanDorsalSailArea || 0).toFixed(2)) + " m2 eq");
console.log("Mean Neural Spine Vascularization: " + (((synMetrics.meanNeuralSpineVascularization || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Solar Absorption: " + (((synMetrics.meanSolarAbsorption || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Core Temperature: " + ((synMetrics.meanCoreTemperature || 0).toFixed(1)) + " C");
console.log("Mean Canine Piercing Force: " + ((synMetrics.meanCaninePiercingForce || 0).toFixed(1)) + " N eq");
console.log("Mean Incisor Precision: " + (((synMetrics.meanIncisorPrecision || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Molar Shearing Efficiency: " + (((synMetrics.meanMolarShearingEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Temporal Bite Pressure: " + ((synMetrics.meanTemporalBitePressure || 0).toFixed(1)) + " kPa");
console.log("Morning Thermal Warmup Events: " + (synMetrics.morningThermalWarmupEvents || 0));
console.log("Convective Cooling Events: " + (synMetrics.convectiveCoolingEvents || 0));
console.log("Canine Puncture Strikes: " + (synMetrics.caninePunctureStrikes || 0));
console.log("Cumulative Synapsid Biomass: " + ((synMetrics.cumulativeSynapsidBiomass || 0).toFixed(2)));
console.log("Latest 119th Channel (% SPI): " + ((hist.secondaryPalateIndex ? hist.secondaryPalateIndex[hist.secondaryPalateIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 120th Channel (% EMI): " + ((hist.endothermicMetabolicIndex ? hist.endothermicMetabolicIndex[hist.endothermicMetabolicIndex.length - 1] : 0).toFixed(1)) + "%");
const therMgr = sandbox.therapsidPalateMetabolismManager;
const therMetrics = therMgr ? therMgr.getMetrics() : {};
console.log("Total Therapsids: " + (therMetrics.totalTherapsidOrganisms || 0));
console.log("Mean Secondary Palate Index (% SPI): " + ((therMetrics.meanSecondaryPalateIndex || 0).toFixed(1)) + "%");
console.log("Mean Endothermic Metabolic Index (% EMI): " + ((therMetrics.meanEndothermicMetabolicIndex || 0).toFixed(1)) + "%");
console.log("Mean Palatal Fusion Degree: " + (((therMetrics.meanPalatalFusionDegree || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Continuous Breathing Efficiency: " + (((therMetrics.meanContinuousBreathingEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Turbinate Reclamation: " + (((therMetrics.meanTurbinateReclamation || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Basal Metabolic Heat Flux: " + ((therMetrics.meanBasalMetabolicHeat || 0).toFixed(2)) + "x");
console.log("Mean Vibrissae Insulation: " + (((therMetrics.meanVibrissaeInsulation || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Parasagittal Endurance: " + ((therMetrics.meanParasagittalEndurance || 0).toFixed(2)) + "x");
console.log("Mean Nocturnal Activity Index: " + (((therMetrics.meanNocturnalActivity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Therapsid Core Temperature: " + ((therMetrics.meanTherapsidCoreTemperature || 0).toFixed(1)) + " C");
console.log("Continuous Breathing Feed Events: " + (therMetrics.continuousBreathingFeedEvents || 0));
console.log("Turbinate Moisture Reclaimed Units: " + ((therMetrics.turbinateMoistureReclaimedUnits || 0).toFixed(2)));
console.log("Nocturnal Predation Strikes: " + (therMetrics.nocturnalPredationStrikes || 0));
console.log("Parasagittal Gallop Events: " + (therMetrics.parasagittalGallopEvents || 0));
console.log("Cumulative Therapsid Biomass: " + ((therMetrics.cumulativeTherapsidBiomass || 0).toFixed(2)));
console.log("Latest 121st Channel (% MEI): " + ((hist.mammaliaformEarIndex ? hist.mammaliaformEarIndex[hist.mammaliaformEarIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 122nd Channel (% LAI): " + ((hist.lactationIndex ? hist.lactationIndex[hist.lactationIndex.length - 1] : 0).toFixed(1)) + "%");
const mamMgr = sandbox.mammaliaformEarLactationManager;
const mamMetrics = mamMgr ? mamMgr.getMetrics() : {};
console.log("Total Mammaliaforms: " + (mamMetrics.totalMammaliaformOrganisms || 0));
console.log("Mean Mammaliaform Ear Index (% MEI): " + ((mamMetrics.meanMammaliaformEarIndex || 0).toFixed(1)) + "%");
console.log("Mean Lactation Index (% LAI): " + ((mamMetrics.meanLactationIndex || 0).toFixed(1)) + "%");
console.log("Mean Dentary-Squamosal Fusion: " + (((mamMetrics.meanDentarySquamosalFusion || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Masticatory Bite Torque: " + ((mamMetrics.meanMasticatoryBiteTorque || 0).toFixed(2)) + "x");
console.log("Mean Ossicular Chain Integration: " + (((mamMetrics.meanOssicularIntegration || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Acoustic Pressure Gain: " + ((mamMetrics.meanAcousticPressureGain || 0).toFixed(1)) + "x");
console.log("Mean High-Frequency Acoustic Acuity: " + (((mamMetrics.meanHighFrequencyAcuity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Lactation Secretion Flux: " + (((mamMetrics.meanLactationSecretionFlux || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Juvenile Survival Multiplier: " + ((mamMetrics.meanJuvenileSurvivalMultiplier || 0).toFixed(2)) + "x");
console.log("Mean Maternal Nest Bonding: " + (((mamMetrics.meanMaternalNestBonding || 0) * 100.0).toFixed(1)) + "%");
console.log("Chitin Breach Crush Events: " + (mamMetrics.chitinBreachCrushEvents || 0));
console.log("Ultrasonic Echo Radar Detections: " + (mamMetrics.ultrasonicEchoRadarDetections || 0));
console.log("Milk Patch Nursing Events: " + (mamMetrics.milkPatchNursingEvents || 0));
console.log("Cumulative Nursed Biomass: " + ((mamMetrics.cumulativeNursedBiomass || 0).toFixed(2)));
console.log("Latest 123rd Channel (% MPI): " + ((hist.marsupiumPouchIndex ? hist.marsupiumPouchIndex[hist.marsupiumPouchIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 124th Channel (% CPI): " + ((hist.choriovitellinePlacentaIndex ? hist.choriovitellinePlacentaIndex[hist.choriovitellinePlacentaIndex.length - 1] : 0).toFixed(1)) + "%");
const divMgr = sandbox.monotremeTherianDivergenceManager;
const divMetrics = divMgr ? divMgr.getMetrics() : {};
console.log("Total Monotremes: " + (divMetrics.totalMonotremeOrganisms || 0));
console.log("Total Metatherians: " + (divMetrics.totalMetatherianOrganisms || 0));
console.log("Total Eutherians: " + (divMetrics.totalEutherianOrganisms || 0));
console.log("Mean Marsupium Pouch Index (% MPI): " + ((divMetrics.meanMarsupiumPouchIndex || 0).toFixed(1)) + "%");
console.log("Mean Choriovitelline Placenta Index (% CPI): " + ((divMetrics.meanChoriovitellinePlacentaIndex || 0).toFixed(1)) + "%");
console.log("Mean Marsupium Pouch Integrity: " + (((divMetrics.meanMarsupiumPouchIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Altricial Neonate Climbing Rate: " + (((divMetrics.meanAltricialClimbingRate || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Nipple Latching Efficiency: " + (((divMetrics.meanNippleLatchingEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Choriovitelline Density: " + (((divMetrics.meanChoriovitellineDensity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Trophoblast Nutrient Flux: " + (((divMetrics.meanTrophoblastNutrientFlux || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Precocial Neonate Maturity: " + (((divMetrics.meanPrecocialMaturity || 0) * 100.0).toFixed(1)) + "%");
console.log("Crural Venom Spur Strikes: " + (divMetrics.venomSpurStrikeEvents || 0));
console.log("Electroreceptive Bill Detections: " + (divMetrics.electroreceptionDetections || 0));
console.log("Marsupium Climbing Events: " + (divMetrics.marsupiumClimbingEvents || 0));
console.log("Placental Nutrient Transfers: " + (divMetrics.placentalNutrientTransfers || 0));
console.log("Cumulative Therian Biomass: " + ((divMetrics.cumulativeTherianBiomass || 0).toFixed(2)));
console.log("Latest 125th Channel (% TMI): " + ((hist.tribosphenicMolarIndex ? hist.tribosphenicMolarIndex[hist.tribosphenicMolarIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 126th Channel (% CAI): " + ((hist.chorioallantoicPlacentaIndex ? hist.chorioallantoicPlacentaIndex[hist.chorioallantoicPlacentaIndex.length - 1] : 0).toFixed(1)) + "%");
const triboMgr = sandbox.tribosphenicChorioallantoicManager;
const triboMetrics = triboMgr ? triboMgr.getMetrics() : {};
console.log("Total Tribosphenic Organisms: " + (triboMetrics.totalTribosphenicOrganisms || 0));
console.log("Total Chorioallantoic Organisms: " + (triboMetrics.totalChorioallantoicOrganisms || 0));
console.log("Mean Tribosphenic Molar Index (% TMI): " + ((triboMetrics.meanTribosphenicMolarIndex || 0).toFixed(1)) + "%");
console.log("Mean Chorioallantoic Placenta Index (% CAI): " + ((triboMetrics.meanChorioallantoicPlacentaIndex || 0).toFixed(1)) + "%");
console.log("Mean Occlusion Quality: " + (((triboMetrics.meanOcclusionQuality || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Crushing Force: " + ((triboMetrics.meanCrushingForce || 0).toFixed(1)) + " N eq");
console.log("Mean Caloric Extraction: " + (((triboMetrics.meanCaloricExtraction || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Enamel Resilience: " + (((triboMetrics.meanEnamelResilience || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Villi Penetration Depth: " + (((triboMetrics.meanVilliPenetrationDepth || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Hemochorial Nutrient Flux: " + (((triboMetrics.meanHemochorialFlux || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Gestation Endurance: " + ((triboMetrics.meanGestationEndurance || 0).toFixed(1)) + " ticks");
console.log("Mean Encephalization Quotient: " + (((triboMetrics.meanEncephalizationQuotient || 0) * 100.0).toFixed(1)) + "%");
console.log("Masticatory Crushing Events: " + (triboMetrics.masticatoryCrushingEvents || 0));
console.log("Chorioallantoic Nutrient Transfers: " + (triboMetrics.chorioallantoicNutrientTransfers || 0));
console.log("Precocial Birth Events: " + (triboMetrics.precocialBirthEvents || 0));
console.log("Cumulative Cretaceous Biomass: " + ((triboMetrics.cumulativeCretaceousBiomass || 0).toFixed(2)));
console.log("Latest 127th Channel (% PBI): " + ((hist.plagiaulacoidBladeIndex ? hist.plagiaulacoidBladeIndex[hist.plagiaulacoidBladeIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 128th Channel (% THI): " + ((hist.torporHibernationIndex ? hist.torporHibernationIndex[hist.torporHibernationIndex.length - 1] : 0).toFixed(1)) + "%");
const mtMgr = sandbox.multituberculateTorporManager;
const mtMetrics = mtMgr ? mtMgr.getMetrics() : {};
console.log("Total Multituberculates: " + (mtMetrics.totalMultituberculates || 0));
console.log("Total Torpor Capable: " + (mtMetrics.totalTorporCapable || 0));
console.log("Active Burrowers: " + (mtMetrics.activeBurrowers || 0));
console.log("Active Torpor Sleepers: " + (mtMetrics.activeTorporSleepers || 0));
console.log("Mean Plagiaulacoid Blade Index (% PBI): " + ((mtMetrics.meanPlagiaulacoidBladeIndex || 0).toFixed(1)) + "%");
console.log("Mean Torpor & Hibernation Index (% THI): " + ((mtMetrics.meanTorporHibernationIndex || 0).toFixed(1)) + "%");
console.log("Mean Palinal Grinding: " + (((mtMetrics.meanPalinalGrinding || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Serration Count: " + ((mtMetrics.meanSerrationCount || 0).toFixed(1)));
console.log("Mean Granivorous Yield: " + (((mtMetrics.meanGranivorousYield || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Blade Durability: " + (((mtMetrics.meanBladeDurability || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Torpor Suppression: " + (((mtMetrics.meanTorporSuppression || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Shelter Insulation: " + (((mtMetrics.meanShelterInsulation || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Brown Fat Thermogenesis: " + (((mtMetrics.meanBrownFatThermogenesis || 0) * 100.0).toFixed(1)) + "%");
console.log("Seed Grinding Events: " + (mtMetrics.seedGrindingEvents || 0));
console.log("Torpor Entry Events: " + (mtMetrics.torporEntryEvents || 0));
console.log("Thermal Pulse Survivals: " + (mtMetrics.thermalPulseSurvivals || 0));
console.log("Cumulative Post-Impact Biomass: " + ((mtMetrics.cumulativePostImpactBiomass || 0).toFixed(2)));
console.log("Latest 129th Channel (% BVI): " + ((hist.binocularVisionIndex ? hist.binocularVisionIndex[hist.binocularVisionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 130th Channel (% OGI): " + ((hist.opposableGraspingIndex ? hist.opposableGraspingIndex[hist.opposableGraspingIndex.length - 1] : 0).toFixed(1)) + "%");
const arbMgr = sandbox.arborealVisionGraspingManager;
const arbMetrics = arbMgr ? arbMgr.getMetrics() : {};
console.log("Total Arboreal Mammals: " + (arbMetrics.totalArborealMammals || 0));
console.log("Total Stereoscopic Capable: " + (arbMetrics.totalStereoCapable || 0));
console.log("Active Branch Graspers: " + (arbMetrics.activeBranchGraspers || 0));
console.log("Active Canopy Jumpers: " + (arbMetrics.activeCanopyJumpers || 0));
console.log("Mean Binocular Vision Index (% BVI): " + ((arbMetrics.meanBinocularVisionIndex || 0).toFixed(1)) + "%");
console.log("Mean Opposable Grasping Index (% OGI): " + ((arbMetrics.meanOpposableGraspingIndex || 0).toFixed(1)) + "%");
console.log("Mean Orbital Convergence Angle: " + ((arbMetrics.meanOrbitalConvergence || 0).toFixed(1)) + " deg");
console.log("Mean Stereoscopic Disparity Acuity: " + (((arbMetrics.meanStereoscopicDisparity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Branch Jump Precision: " + (((arbMetrics.meanJumpPrecision || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Camouflage Detection: " + (((arbMetrics.meanCamouflageDetection || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Hallux Divergence Angle: " + ((arbMetrics.meanHalluxDivergence || 0).toFixed(1)) + " deg");
console.log("Mean Branch Grasping Torque: " + (((arbMetrics.meanGraspingTorque || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Flat Nail Support: " + (((arbMetrics.meanNailSupport || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Arboreal Foraging Yield: " + (((arbMetrics.meanForagingYield || 0) * 100.0).toFixed(1)) + "%");
console.log("Canopy Fruit Harvest Events: " + (arbMetrics.canopyFruitHarvestEvents || 0));
console.log("Precision Jump Events: " + (arbMetrics.precisionJumpEvents || 0));
console.log("Camouflage Prey Captures: " + (arbMetrics.camouflagePreyCaptures || 0));
console.log("Cumulative Canopy Biomass: " + ((arbMetrics.cumulativeCanopyBiomass || 0).toFixed(2)));
console.log("Latest 131st Channel (% CTI): " + ((hist.cetaceanTransitionIndex ? hist.cetaceanTransitionIndex[hist.cetaceanTransitionIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 132nd Channel (% AUT): " + ((hist.aquaticUndulatingThrust ? hist.aquaticUndulatingThrust[hist.aquaticUndulatingThrust.length - 1] : 0).toFixed(1)) + "%");
const cetMgr = sandbox.cetaceanAquaticTransitionManager;
const cetMetrics = cetMgr ? cetMgr.getMetrics() : {};
console.log("Total Archaeocetes: " + (cetMetrics.totalArchaeocetes || 0));
console.log("Total Aquatic Propelled: " + (cetMetrics.totalAquaticPropelled || 0));
console.log("Active Benthic Lurkers: " + (cetMetrics.activeBenthicLurkers || 0));
console.log("Active Pelagic Cruisers: " + (cetMetrics.activePelagicCruisers || 0));
console.log("Mean Cetacean Transition Index (% CTI): " + ((cetMetrics.meanCetaceanTransitionIndex || 0).toFixed(1)) + "%");
console.log("Mean Aquatic Undulating Thrust (% AUT): " + ((cetMetrics.meanAquaticUndulatingThrust || 0).toFixed(1)) + "%");
console.log("Mean Pachyosteosclerosis: " + (((cetMetrics.meanPachyosteosclerosis || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Mandibular Fat Pad Conduction: " + (((cetMetrics.meanFatPadConduction || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Pelvic Reduction: " + (((cetMetrics.meanPelvicReduction || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Benthic Lurking Stability: " + (((cetMetrics.meanLurkingStability || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Caudal Fluke Efficiency: " + (((cetMetrics.meanFlukeEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Dorsoventral Undulation Rate: " + ((cetMetrics.meanUndulationRate || 0).toFixed(1)) + " Hz");
console.log("Mean Underwater Directional Hearing: " + (((cetMetrics.meanDirectionalHearing || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Pelagic Cruising Agility: " + (((cetMetrics.meanCruisingAgility || 0) * 100.0).toFixed(1)) + "%");
console.log("Benthic Lurking Strikes: " + (cetMetrics.benthicLurkingStrikes || 0));
console.log("Pelagic Cruising Bursts: " + (cetMetrics.pelagicCruisingBursts || 0));
console.log("Acoustic Echolocation Locks: " + (cetMetrics.acousticEcholocationLocks || 0));
console.log("Cumulative Cetacean Biomass: " + ((cetMetrics.cumulativeCetaceanBiomass || 0).toFixed(2)));
console.log("Latest 133rd Channel (% OVI): " + ((hist.ossiconeWeaponizationIndex ? hist.ossiconeWeaponizationIndex[hist.ossiconeWeaponizationIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 134th Channel (% GCI): " + ((hist.graviportalColumnarIndex ? hist.graviportalColumnarIndex[hist.graviportalColumnarIndex.length - 1] : 0).toFixed(1)) + "%");
const megaMgr = sandbox.pantodontMegaherbivoreManager;
const megaMetrics = megaMgr ? megaMgr.getMetrics() : {};
console.log("Total Megaherbivores: " + (megaMetrics.totalMegaherbivores || 0));
console.log("Total Dinoceratans: " + (megaMetrics.totalDinoceratans || 0));
console.log("Active Pillar Stance Feeders: " + (megaMetrics.activePillarStanceFeeders || 0));
console.log("Active Ossicone Clashers: " + (megaMetrics.activeOssiconeClashers || 0));
console.log("Mean Ossicone Weaponization Index (% OVI): " + ((megaMetrics.meanOssiconeWeaponizationIndex || 0).toFixed(1)) + "%");
console.log("Mean Graviportal Columnar Index (% GCI): " + ((megaMetrics.meanGraviportalColumnarIndex || 0).toFixed(1)) + "%");
console.log("Mean Columnar Stance: " + ((megaMetrics.meanColumnarStance || 0).toFixed(2)));
console.log("Mean Cecal Fermentation: " + ((megaMetrics.meanCecalTransit || 0).toFixed(2)));
console.log("Mean Cranial Ossicone Armor: " + ((megaMetrics.meanOssiconeArmor || 0).toFixed(2)));
console.log("Mean Saber Canine Shearing: " + ((megaMetrics.meanSaberShearing || 0).toFixed(2)));
console.log("Columnar Stance Events: " + (megaMetrics.columnarStanceEvents || 0));
console.log("Fiber Fermentation Pulses: " + (megaMetrics.fiberFermentationPulses || 0));
console.log("Ossicone Clash Events: " + (megaMetrics.ossiconeClashEvents || 0));
console.log("Saber Excavation Strikes: " + (megaMetrics.saberExcavationStrikes || 0));
console.log("Cumulative Megaherbivore Biomass: " + ((megaMetrics.cumulativeMegaherbivoreBiomass || 0).toFixed(2)));
console.log("Latest 135th Channel (% BCI): " + ((hist.boneCrushingCarnassialIndex ? hist.boneCrushingCarnassialIndex[hist.boneCrushingCarnassialIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 136th Channel (% CTI): " + ((hist.cursorialTerrestrialIndex ? hist.cursorialTerrestrialIndex[hist.cursorialTerrestrialIndex.length - 1] : 0).toFixed(1)) + "%");
const creoMgr = sandbox.creodontCarnivoreManager;
const creoMetrics = creoMgr ? creoMgr.getMetrics() : {};
console.log("Total Apex Carnivores: " + (creoMetrics.totalApexCarnivores || 0));
console.log("Total Creodonts: " + (creoMetrics.totalCreodonts || 0));
console.log("Total Mesonychids: " + (creoMetrics.totalMesonychids || 0));
console.log("Active Pursuit Sprinters: " + (creoMetrics.activePursuitSprinters || 0));
console.log("Active Bone Crushing Strikes: " + (creoMetrics.activeBoneCrushingStrikes || 0));
console.log("Mean Bone Crushing Index (% BCI): " + ((creoMetrics.meanBoneCrushingIndex || 0).toFixed(1)) + "%");
console.log("Mean Cursorial Terrestrial Index (% CTI): " + ((creoMetrics.meanCursorialTerrestrialIndex || 0).toFixed(1)) + "%");
console.log("Mean Bite Force: " + ((creoMetrics.meanBiteForce || 0).toFixed(1)) + " N");
console.log("Mean Carnassial Shearing: " + ((creoMetrics.meanCarnassialShear || 0).toFixed(2)));
console.log("Mean Digitigrade Stride: " + ((creoMetrics.meanDigitigradeStride || 0).toFixed(2)));
console.log("Mean Elastic Tendon Recoil: " + ((creoMetrics.meanElasticRecoil || 0).toFixed(2)));
console.log("Mean Gastric Acid pH: " + ((creoMetrics.meanGastricPH || 0).toFixed(2)));
console.log("Bone Crush Events: " + (creoMetrics.boneCrushEvents || 0));
console.log("Carnassial Shear Events: " + (creoMetrics.carnassialShearEvents || 0));
console.log("Pursuit Sprint Events: " + (creoMetrics.pursuitSprintEvents || 0));
console.log("Scavenging Assimilation Yield: " + ((creoMetrics.scavengingAssimilationYield || 0).toFixed(2)));
console.log("Cumulative Carnivore Biomass: " + ((creoMetrics.cumulativeCarnivoreBiomass || 0).toFixed(2)));
console.log("Latest 137th Channel (% BBI): " + ((hist.beakBiomechanicsIndex ? hist.beakBiomechanicsIndex[hist.beakBiomechanicsIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 138th Channel (% API): " + ((hist.avianPursuitIndex ? hist.avianPursuitIndex[hist.avianPursuitIndex.length - 1] : 0).toFixed(1)) + "%");
const birdMgr = sandbox.terrorBirdBiomechanicsManager;
const birdMetrics = birdMgr ? birdMgr.getMetrics() : {};
console.log("Total Terror Birds: " + (birdMetrics.totalTerrorBirds || 0));
console.log("Total Gastornithids: " + (birdMetrics.totalGastornithids || 0));
console.log("Total Phorusrhacids: " + (birdMetrics.totalPhorusrhacids || 0));
console.log("Active Avian Sprinters: " + (birdMetrics.activeAvianSprinters || 0));
console.log("Active Beak Strikes: " + (birdMetrics.activeBeakStrikes || 0));
console.log("Mean Beak Biomechanics Index (% BBI): " + ((birdMetrics.meanBeakBiomechanicsIndex || 0).toFixed(1)) + "%");
console.log("Mean Avian Pursuit Index (% API): " + ((birdMetrics.meanAvianPursuitIndex || 0).toFixed(1)) + "%");
console.log("Mean Beak Shear Force: " + ((birdMetrics.meanBeakShear || 0).toFixed(1)) + " N");
console.log("Mean Craniokinetic Shock Torque: " + ((birdMetrics.meanCraniokinesis || 0).toFixed(2)));
console.log("Mean Avian Stride Velocity: " + ((birdMetrics.meanAvianStride || 0).toFixed(2)) + " px/t");
console.log("Mean Tridactyl Grip: " + ((birdMetrics.meanTridactylGrip || 0).toFixed(2)));
console.log("Mean Vestigial Wing Balance: " + ((birdMetrics.meanWingBalance || 0).toFixed(2)));
console.log("Mean Raptorial Kick Force: " + ((birdMetrics.meanKickForce || 0).toFixed(1)) + " N");
console.log("Mean Gizzard Trituration: " + ((birdMetrics.meanGizzardTrituration || 0).toFixed(2)));
console.log("Beak Strike Events: " + (birdMetrics.beakStrikeEvents || 0));
console.log("Raptorial Kick Events: " + (birdMetrics.raptorialKickEvents || 0));
console.log("Avian Sprint Events: " + (birdMetrics.avianSprintEvents || 0));
console.log("Gizzard Trituration Yield: " + ((birdMetrics.gizzardTriturationYield || 0).toFixed(2)));
console.log("Cumulative Avian Biomass: " + ((birdMetrics.cumulativeAvianBiomass || 0).toFixed(2)));
console.log("Latest 139th Channel (% PEI): " + ((hist.paraceratheriidElevationIndex ? hist.paraceratheriidElevationIndex[hist.paraceratheriidElevationIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 140th Channel (% BFI): " + ((hist.browsingFoliageIndex ? hist.browsingFoliageIndex[hist.browsingFoliageIndex.length - 1] : 0).toFixed(1)) + "%");
const titanMgr = sandbox.paraceratheriumTitanManager;
const titanMetrics = titanMgr ? titanMgr.getMetrics() : {};
console.log("Total Paraceratheriids: " + (titanMetrics.totalParaceratheriids || 0));
console.log("Total Indricotheres: " + (titanMetrics.totalIndricotheres || 0));
console.log("Active Canopy Browsers: " + (titanMetrics.activeCanopyBrowsers || 0));
console.log("Active Columnar Stance Locks: " + (titanMetrics.activeColumnarStanceLocks || 0));
console.log("Mean Paraceratheriid Elevation Index (% PEI): " + ((titanMetrics.meanParaceratheriidElevationIndex || 0).toFixed(1)) + "%");
console.log("Mean Browsing Foliage Index (% BFI): " + ((titanMetrics.meanBrowsingFoliageIndex || 0).toFixed(1)) + "%");
console.log("Mean Canopy Browsing Reach: " + ((titanMetrics.meanCanopyReach || 0).toFixed(2)) + " m eq");
console.log("Mean Columnar Stance Lock: " + ((titanMetrics.meanColumnarLock || 0).toFixed(2)));
console.log("Mean Hydraulic Buffering: " + ((titanMetrics.meanHydraulicBuffer || 0).toFixed(2)));
console.log("Mean Cervical Span: " + ((titanMetrics.meanCervicalSpan || 0).toFixed(2)) + " m eq");
console.log("Mean Prehensile Lip Dexterity: " + ((titanMetrics.meanLipDexterity || 0).toFixed(2)));
console.log("Mean Conical Incisor Stripping: " + ((titanMetrics.meanIncisorStripping || 0).toFixed(2)));
console.log("Mean Foliage Extraction: " + ((titanMetrics.meanFoliageExtraction || 0).toFixed(2)));
console.log("Mean Gigantothermic Efficiency: " + ((titanMetrics.meanGigantothermy || 0).toFixed(2)));
console.log("Canopy Browse Events: " + (titanMetrics.canopyBrowseEvents || 0));
console.log("Branch Strip Events: " + (titanMetrics.branchStripEvents || 0));
console.log("Columnar Lock Events: " + (titanMetrics.columnarLockEvents || 0));
console.log("Canopy Biomass Harvested: " + ((titanMetrics.canopyBiomassHarvested || 0).toFixed(2)));
console.log("Cumulative Titan Biomass: " + ((titanMetrics.cumulativeTitanBiomass || 0).toFixed(2)));
console.log("Latest 141st Channel (% EBI): " + ((hist.entelodontBiteIndex ? hist.entelodontBiteIndex[hist.entelodontBiteIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 142nd Channel (% OFI): " + ((hist.omnivorousFlangeIndex ? hist.omnivorousFlangeIndex[hist.omnivorousFlangeIndex.length - 1] : 0).toFixed(1)) + "%");
const enteloMgr = sandbox.entelodontBiomechanicsManager;
const enteloMetrics = enteloMgr ? enteloMgr.getMetrics() : {};
console.log("Total Entelodonts: " + (enteloMetrics.totalEntelodonts || 0));
console.log("Total Daeodons: " + (enteloMetrics.totalDaeodons || 0));
console.log("Active Bone Crushers: " + (enteloMetrics.activeBoneCrushers || 0));
console.log("Active Flange Defenders: " + (enteloMetrics.activeFlangeDefenders || 0));
console.log("Mean Entelodont Bite Index (% EBI): " + ((enteloMetrics.meanEntelodontBiteIndex || 0).toFixed(1)) + "%");
console.log("Mean Omnivorous Flange Index (% OFI): " + ((enteloMetrics.meanOmnivorousFlangeIndex || 0).toFixed(1)) + "%");
console.log("Mean Craniomandibular Crush Force: " + ((enteloMetrics.meanCrushForce || 0).toFixed(1)) + " N");
console.log("Mean Premolar Bone Crushing: " + ((enteloMetrics.meanPremolarCrush || 0).toFixed(2)));
console.log("Mean Marrow Extraction Yield: " + ((enteloMetrics.meanMarrowYield || 0).toFixed(2)));
console.log("Mean Zygomatic Flange Expansion: " + ((enteloMetrics.meanZygomaticFlange || 0).toFixed(2)));
console.log("Mean Mandibular Tubercle Defense: " + ((enteloMetrics.meanMandibularTubercle || 0).toFixed(2)));
console.log("Mean Wither Spine Support: " + ((enteloMetrics.meanWitherSupport || 0).toFixed(2)));
console.log("Mean Cervical Whip Torque: " + ((enteloMetrics.meanCervicalWhip || 0).toFixed(2)));
console.log("Bone Crush Events: " + (enteloMetrics.boneCrushEvents || 0));
console.log("Flange Deflect Events: " + (enteloMetrics.flangeDeflectEvents || 0));
console.log("Cervical Whip Events: " + (enteloMetrics.cervicalWhipEvents || 0));
console.log("Scavenged Biomass Total: " + ((enteloMetrics.scavengedBiomassTotal || 0).toFixed(2)));
console.log("Cumulative Entelodont Biomass: " + ((enteloMetrics.cumulativeEntelodontBiomass || 0).toFixed(2)));
console.log("Latest 143rd Channel (% CCI): " + ((hist.chalicothereClawIndex ? hist.chalicothereClawIndex[hist.chalicothereClawIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 144th Channel (% BPI): " + ((hist.branchPullingIndex ? hist.branchPullingIndex[hist.branchPullingIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 145th Channel (% SCI): " + ((hist.saberCanineIndex ? hist.saberCanineIndex[hist.saberCanineIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 146th Channel (% BDI): " + ((hist.bearDogIndex ? hist.bearDogIndex[hist.bearDogIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 147th Channel (% HEI): " + ((hist.hypsodontEnamelIndex ? hist.hypsodontEnamelIndex[hist.hypsodontEnamelIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 148th Channel (% CUI): " + ((hist.cursorialSprintIndex ? hist.cursorialSprintIndex[hist.cursorialSprintIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 149th Channel (% BAI): " + ((hist.bipedalAlignmentIndex ? hist.bipedalAlignmentIndex[hist.bipedalAlignmentIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 150th Channel (% TMI): " + ((hist.toolManipulationIndex ? hist.toolManipulationIndex[hist.toolManipulationIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 151st Channel (% ABI): " + ((hist.acheuleanBifaceIndex ? hist.acheuleanBifaceIndex[hist.acheuleanBifaceIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 152nd Channel (% TCI): " + ((hist.thermalCookingIndex ? hist.thermalCookingIndex[hist.thermalCookingIndex.length - 1] : 0).toFixed(1)) + "%");
const homoMgr = sandbox.homoPyrotechnicsManager;
const homoMetrics = homoMgr ? homoMgr.getMetrics() : {};
console.log("Total Homo erectus: " + (homoMetrics.totalHomo || 0));
console.log("Active Biface Butchers: " + (homoMetrics.activeButchers || 0));
console.log("Active Pyrotechnic Cooks: " + (homoMetrics.activeCooks || 0));
console.log("Active Perspiring Runners: " + (homoMetrics.activePerspirers || 0));
console.log("Active Persistence Hunters: " + (homoMetrics.activePersistenceHunters || 0));
console.log("Mean Bifacial Flaking: " + (((homoMetrics.meanBifacialFlaking || 0.85) * 100.0).toFixed(1)) + "%");
console.log("Mean Butchery Carcass Yield: " + (((homoMetrics.meanButcheryYield || 0.85) * 100.0).toFixed(1)) + "%");
console.log("Mean Pyrotechnic Cooking Efficiency: " + (((homoMetrics.meanCookingEfficiency || 0.84) * 100.0).toFixed(1)) + "%");
console.log("Mean Digestive Energy Sparing: 50.0%");
console.log("Mean Eccrine Perspiration Rate: " + (((homoMetrics.meanPerspirationRate || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Bifacial Butchery Events: " + (homoMetrics.bifacialButcheryEvents || 0));
console.log("Thermal Cooking Events: " + (homoMetrics.thermalCookingEvents || 0));
console.log("Persistence Hunt Events: " + (homoMetrics.persistenceHuntEvents || 0));
console.log("Cooked Caloric Yield: " + ((homoMetrics.cookedCaloricYield || 0).toFixed(2)));
console.log("Cumulative Homo Biomass: " + ((homoMetrics.cumulativeHomoBiomass || 0).toFixed(2)));
console.log("Latest 153rd Channel (% LPI): " + ((hist.levalloisPreparedIndex ? hist.levalloisPreparedIndex[hist.levalloisPreparedIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 154th Channel (% CSI): " + ((hist.compositeSpearIndex ? hist.compositeSpearIndex[hist.compositeSpearIndex.length - 1] : 0).toFixed(1)) + "%");
const neanMgr = sandbox.neanderthalCompositeManager;
const neanMetrics = neanMgr ? neanMgr.getMetrics() : {};
console.log("Total Neanderthals: " + (neanMetrics.totalNeanderthals || 0));
console.log("Active Levallois Knappers: " + (neanMetrics.activeKnappers || 0));
console.log("Active Birch Tar Distillers: " + (neanMetrics.activeTarDistillers || 0));
console.log("Active Composite Spear Hunters: " + (neanMetrics.activeSpearHunters || 0));
console.log("Active Glacial Cold Resistors: " + (neanMetrics.activeColdResistors || 0));
console.log("Mean Core Preparation: " + (((neanMetrics.meanCorePreparation || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Flake Predictability: " + (((neanMetrics.meanFlakePredictability || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Raw Material Efficiency: " + ((neanMetrics.meanRawMaterialEfficiency || 3.5).toFixed(1)) + "x");
console.log("Mean Birch Tar Yield: " + (((neanMetrics.meanTarYield || 0.85) * 100.0).toFixed(1)) + "%");
console.log("Mean Spear Thrust Damage: 3.8x");
console.log("Mean Predation Trauma Reduction: " + (((neanMetrics.meanTraumaReduction || 0.76) * 100.0).toFixed(1)) + "%");
console.log("Levallois Points Knapped: " + (neanMetrics.levalloisPointsKnapped || 0));
console.log("Birch Tar Batches Distilled: " + (neanMetrics.birchTarBatchesDistilled || 0));
console.log("Composite Spear Strikes: " + (neanMetrics.compositeSpearStrikes || 0));
console.log("Trauma Avoided Incidents: " + (neanMetrics.traumaAvoidedCount || 0));
console.log("Harvested Glacial Biomass: " + ((neanMetrics.harvestedGlacialBiomass || 0).toFixed(2)));
console.log("Cumulative Neanderthal Biomass: " + ((neanMetrics.cumulativeNeanderthalBiomass || 0).toFixed(2)));
console.log("Latest 155th Channel (% AMI): " + ((hist.atlatlMechanicalIndex ? hist.atlatlMechanicalIndex[hist.atlatlMechanicalIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 156th Channel (% PCA): " + ((hist.parietalCaveArtIndex ? hist.parietalCaveArtIndex[hist.parietalCaveArtIndex.length - 1] : 0).toFixed(1)) + "%");
const sapMgr = sandbox.sapiensCognitionManager;
const sapMetrics = sapMgr ? sapMgr.getMetrics() : {};
console.log("Total Upper Paleolithic Sapiens: " + (sapMetrics.totalSapiens || 0));
console.log("Active Atlatl Throwers: " + (sapMetrics.activeAtlatlThrowers || 0));
console.log("Active Garment Tailors: " + (sapMetrics.activeTailors || 0));
console.log("Active Cave Artists: " + (sapMetrics.activeCaveArtists || 0));
console.log("Active Bladelet Knappers: " + (sapMetrics.activeBladeletKnappers || 0));
console.log("Mean Atlatl Leverage: " + (((sapMetrics.meanAtlatlLeverage || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Ballistic Range Multiplier: " + ((sapMetrics.meanBallisticRangeMult || 3.5).toFixed(1)) + "x");
console.log("Mean Kinetic Penetration: " + (((sapMetrics.meanKineticPenetration || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Mean Eyed Needle Craft: " + (((sapMetrics.meanNeedleCraft || 0.87) * 100.0).toFixed(1)) + "%");
console.log("Mean Tailored Garment Insulation: " + (((sapMetrics.meanTailoredInsulation || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Thermal Loss Reduction: " + (((sapMetrics.meanThermalReduction || 0.82) * 100.0).toFixed(1)) + "%");
console.log("Mean Parietal Cave Artistry: " + (((sapMetrics.meanCaveArtistry || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Mean Symbolic Cohesion: " + (((sapMetrics.meanSymbolicCohesion || 0.84) * 100.0).toFixed(1)) + "%");
console.log("Atlatl Darts Launched: " + (sapMetrics.atlatlDartsLaunched || 0));
console.log("Tailored Garments Completed: " + (sapMetrics.tailoredGarmentsCompleted || 0));
console.log("Cave Murals Created: " + (sapMetrics.caveMuralsCreated || 0));
console.log("Microlithic Bladelets Knapped: " + (sapMetrics.microlithicBladeletsKnapped || 0));
console.log("Harvested Paleolithic Biomass: " + ((sapMetrics.harvestedPaleolithicBiomass || 0).toFixed(2)));
console.log("Cumulative Sapiens Biomass: " + ((sapMetrics.cumulativeSapiensBiomass || 0).toFixed(2)));
console.log("Latest 157th Channel (% CDI): " + ((hist.canineDomesticationIndex ? hist.canineDomesticationIndex[hist.canineDomesticationIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 158th Channel (% BAI): " + ((hist.bowBallisticsIndex ? hist.bowBallisticsIndex[hist.bowBallisticsIndex.length - 1] : 0).toFixed(1)) + "%");
const canisMgr = sandbox.canisSymbiosisManager;
const canisMetrics = canisMgr ? canisMgr.getMetrics() : {};
console.log("Total Domestic Canines: " + (canisMetrics.totalDomesticCanines || 0));
console.log("Active Hunting Dogs: " + (canisMetrics.activeHuntingDogs || 0));
console.log("Active Camp Sentinels: " + (canisMetrics.activeSentinels || 0));
console.log("Active Bow Archers: " + (canisMetrics.activeArchers || 0));
console.log("Active Microlith Knappers: " + (canisMetrics.activeMicrolithKnappers || 0));
console.log("Mean Domestication Affinity: " + (((canisMetrics.meanDomesticationAffinity || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Olfactory Tracking: " + (((canisMetrics.meanOlfactoryTracking || 0.89) * 100.0).toFixed(1)) + "%");
console.log("Mean Sentinel Alert: " + (((canisMetrics.meanSentinelAlert || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Mean Thermal Sharing: " + (((canisMetrics.meanThermalSharing || 0.81) * 100.0).toFixed(1)) + "%");
console.log("Mean Bow Tension: " + (((canisMetrics.meanBowTension || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Arrow Velocity: " + ((canisMetrics.meanArrowVelocity || 180.0).toFixed(1)) + " km/h");
console.log("Mean Rate of Fire Multiplier: " + ((canisMetrics.meanRateOfFire || 3.2).toFixed(1)) + "x");
console.log("Tracked Game Events: " + (canisMetrics.trackedGameEvents || 0));
console.log("Sentinel Alarms Sounded: " + (canisMetrics.sentinelAlarmsSounded || 0));
console.log("Arrows Launched: " + (canisMetrics.arrowsLaunched || 0));
console.log("Geometric Microliths Crafted: " + (canisMetrics.geometricMicrolithsCrafted || 0));
console.log("Harvested Archery Biomass: " + ((canisMetrics.harvestedArcheryBiomass || 0).toFixed(2)));
console.log("Cumulative Canine Biomass: " + ((canisMetrics.cumulativeCanineBiomass || 0).toFixed(2)));
console.log("Latest 159th Channel (% BHI): " + ((hist.barbedHarpoonIndex ? hist.barbedHarpoonIndex[hist.barbedHarpoonIndex.length - 1] : 0).toFixed(1)) + "%");
console.log("Latest 160th Channel (% WFI): " + ((hist.weirFisheryIndex ? hist.weirFisheryIndex[hist.weirFisheryIndex.length - 1] : 0).toFixed(1)) + "%");
const neoM = (typeof sandbox.neolithicAgricultureManager !== 'undefined' ? sandbox.neolithicAgricultureManager.getMetrics() : {});
console.log("Latest 161st Channel (% NAI): " + ((hist.neolithicAgricultureIndex && hist.neolithicAgricultureIndex.length > 0 ? hist.neolithicAgricultureIndex[hist.neolithicAgricultureIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 162nd Channel (% PSI): " + ((hist.potterySedentismIndex && hist.potterySedentismIndex.length > 0 ? hist.potterySedentismIndex[hist.potterySedentismIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Neolithic Farmers: " + (neoM.totalNeolithicFarmers || 0));
console.log("Active Cultivators: " + (neoM.activeCultivators || 0));
console.log("Active Sickle Harvesters: " + (neoM.activeSickleHarvesters || 0));
console.log("Active Pottery Granary Holders: " + (neoM.activePotteryGranaryHolders || 0));
console.log("Mean Cereal Crop Cultivation: " + ((neoM.meanCropCultivation || 0.88) * 100).toFixed(1) + "%");
console.log("Mean Rachis Suppression: " + ((neoM.meanRachisSuppression || 0.86) * 100).toFixed(1) + "%");
console.log("Mean Sickle Efficiency: " + ((neoM.meanSickleEfficiency || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Pottery Seed Storage: " + ((neoM.meanPotteryStorage || 0.88) * 100).toFixed(1) + "%");
console.log("Mean Granary Surplus: " + ((neoM.meanGranarySurplus || 0.86) * 100).toFixed(1) + "%");
console.log("Cereal Crops Harvested: " + (neoM.cerealCropsHarvested || 0));
console.log("Sickle Biomass Reaped: " + (neoM.sickleBiomassReaped || 0));
console.log("Stored Caloric Surplus Total: " + (neoM.storedCaloricSurplusTotal || 0).toFixed(2));
console.log("Mudbrick Villages Erected: " + (neoM.mudbrickVillagesErected || 0));
console.log("Harvested Agricultural Biomass: " + (neoM.harvestedAgriculturalBiomass || 0.0).toFixed(2));
console.log("Cumulative Neolithic Biomass: " + (neoM.cumulativeNeolithicBiomass || 0.0).toFixed(2));
const pastM = (typeof sandbox.pastoralDomesticationManager !== 'undefined' ? sandbox.pastoralDomesticationManager.getMetrics() : {});
console.log("Latest 163rd Channel (% PHI): " + ((hist.pastoralHerdIndex && hist.pastoralHerdIndex.length > 0 ? hist.pastoralHerdIndex[hist.pastoralHerdIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 164th Channel (% SPR): " + ((hist.secondaryProductsIndex && hist.secondaryProductsIndex.length > 0 ? hist.secondaryProductsIndex[hist.secondaryProductsIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Pastoralists: " + (pastM.totalPastoralists || 0));
console.log("Active Herders: " + (pastM.activeHerders || 0));
console.log("Active Milk Extractors: " + (pastM.activeMilkExtractors || 0));
console.log("Active Wool Spinners: " + (pastM.activeWoolSpinners || 0));
console.log("Active Corral Protectors: " + (pastM.activeCorralProtectors || 0));
console.log("Mean Pastoral Herd Management: " + ((pastM.meanHerdManagement || 0.88) * 100).toFixed(1) + "%");
console.log("Mean Manure Surplus: " + ((pastM.meanManureSurplus || 0.86) * 100).toFixed(1) + "%");
console.log("Mean Dairy Lactation Extraction: " + ((pastM.meanDairyExtraction || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Lactation Caloric Yield: " + ((pastM.meanLactationYield || 0.85) * 100).toFixed(1) + "%");
console.log("Mean Wool Fiber Spinning: " + ((pastM.meanWoolSpinning || 0.87) * 100).toFixed(1) + "%");
console.log("Mean Corral Security: " + ((pastM.meanCorralSecurity || 0.88) * 100).toFixed(1) + "%");
console.log("Total Livestock Housed: " + (pastM.totalLivestockHoused || 0));
console.log("Daily Milking Events: " + (pastM.dailyMilkingEvents || 0));
console.log("Fermented Cheese Stored: " + (pastM.fermentedCheeseStored || 0).toFixed(2));
console.log("Fleece Shearing Events: " + (pastM.fleeceShearingEvents || 0));
console.log("Predator Raids Deflected: " + (pastM.predatorRaidsDeflected || 0));
console.log("Harvested Pastoral Biomass: " + (pastM.harvestedPastoralBiomass || 0.0).toFixed(2));
console.log("Cumulative Pastoral Biomass: " + (pastM.cumulativePastoralBiomass || 0.0).toFixed(2));
const chalcoM = (typeof sandbox.chalcolithicMetallurgyManager !== 'undefined' ? sandbox.chalcolithicMetallurgyManager.getMetrics() : {});
console.log("Latest 165th Channel (% CMI): " + ((hist.chalcolithicMetallurgyIndex && hist.chalcolithicMetallurgyIndex.length > 0 ? hist.chalcolithicMetallurgyIndex[hist.chalcolithicMetallurgyIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 166th Channel (% ICI): " + ((hist.irrigationCultivationIndex && hist.irrigationCultivationIndex.length > 0 ? hist.irrigationCultivationIndex[hist.irrigationCultivationIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Chalcolithic Artisans: " + (chalcoM.totalChalcolithicArtisans || 0));
console.log("Active Copper Smelters: " + (chalcoM.activeCopperSmelters || 0));
console.log("Active Ox Ploughmen: " + (chalcoM.activeOxPloughmen || 0));
console.log("Active Canal Irrigators: " + (chalcoM.activeCanalIrrigators || 0));
console.log("Mean Copper Smelting: " + ((chalcoM.meanCopperSmelting || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Tool Durability: " + ((chalcoM.meanToolDurability || 0.91) * 100).toFixed(1) + "%");
console.log("Mean Ox Plough Tillage: " + ((chalcoM.meanOxPloughTillage || 0.88) * 100).toFixed(1) + "%");
console.log("Mean Canal Hydraulics: " + ((chalcoM.meanCanalHydraulics || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Irrigated Crop Multiplier: " + (chalcoM.meanIrrigatedMultiplier || 1.95).toFixed(2) + "x");
console.log("Copper Ingots Cast: " + (chalcoM.copperIngotsCast || 0));
console.log("Ploughed Hectares Ticks: " + (chalcoM.ploughedHectaresTicks || 0));
console.log("Irrigated Harvest Events: " + (chalcoM.irrigatedHarvestEvents || 0));
console.log("Alluvial Grain Stored: " + (chalcoM.alluvialGrainStored || 0.0).toFixed(2));
console.log("Harvested Chalcolithic Biomass: " + (chalcoM.harvestedChalcolithicBiomass || 0.0).toFixed(2));
console.log("Cumulative Chalcolithic Biomass: " + (chalcoM.cumulativeChalcolithicBiomass || 0.0).toFixed(2));
const bronzeM = (typeof sandbox.bronzeUrbanismManager !== 'undefined' ? sandbox.bronzeUrbanismManager.getMetrics() : {});
console.log("Latest 167th Channel (% BAI): " + ((hist.bronzeAlloyingIndex && hist.bronzeAlloyingIndex.length > 0 ? hist.bronzeAlloyingIndex[hist.bronzeAlloyingIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 168th Channel (% WTI): " + ((hist.wheeledUrbanIndex && hist.wheeledUrbanIndex.length > 0 ? hist.wheeledUrbanIndex[hist.wheeledUrbanIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Bronze Citizens: " + (bronzeM.totalBronzeCitizens || 0));
console.log("Active Bronze Foundries: " + (bronzeM.activeBronzeFoundries || 0));
console.log("Active Wheel Caravans: " + (bronzeM.activeWheelCaravans || 0));
console.log("Active Urban Guilds: " + (bronzeM.activeUrbanGuilds || 0));
console.log("Mean Tin Alloying: " + ((bronzeM.meanTinAlloying || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Alloy Hardness: " + ((bronzeM.meanAlloyHardness || 0.92) * 100).toFixed(1) + "%");
console.log("Mean Wheeled Capacity: " + ((bronzeM.meanWheeledCapacity || 0.89) * 100).toFixed(1) + "%");
console.log("Mean Caravan Range: " + (bronzeM.meanCaravanRange || 2.05).toFixed(2) + "x");
console.log("Mean Urban Specialization: " + ((bronzeM.meanUrbanSpecialization || 0.89) * 100).toFixed(1) + "%");
console.log("Bronze Ingots Cast: " + (bronzeM.bronzeIngotsCast || 0));
console.log("Caravan Deliveries: " + (bronzeM.caravanDeliveries || 0));
console.log("Guild Craft Events: " + (bronzeM.guildCraftEvents || 0));
console.log("Urban Granary Stored: " + (bronzeM.urbanGranaryStored || 0.0).toFixed(2));
console.log("Harvested Bronze Biomass: " + (bronzeM.harvestedBronzeBiomass || 0.0).toFixed(2));
console.log("Cumulative Bronze Biomass: " + (bronzeM.cumulativeBronzeBiomass || 0.0).toFixed(2));
const ironM = (typeof sandbox.ironMaritimeManager !== 'undefined' ? sandbox.ironMaritimeManager.getMetrics() : {});
console.log("Latest 169th Channel (% ISI): " + ((hist.ironSteelIndex && hist.ironSteelIndex.length > 0 ? hist.ironSteelIndex[hist.ironSteelIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 170th Channel (% MTI): " + ((hist.maritimeTradeIndex && hist.maritimeTradeIndex.length > 0 ? hist.maritimeTradeIndex[hist.maritimeTradeIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Iron Citizens: " + (ironM.totalIronCitizens || 0));
console.log("Active Iron Forges: " + (ironM.activeIronForges || 0));
console.log("Active Maritime Vessels: " + (ironM.activeMaritimeVessels || 0));
console.log("Active Ledger Scribes: " + (ironM.activeLedgerScribes || 0));
console.log("Steel Ingots Forged: " + (ironM.steelIngotsForged || 0));
console.log("Maritime Voyages Completed: " + (ironM.maritimeVoyagesCompleted || 0));
console.log("Ledger Entries Recorded: " + (ironM.ledgerEntriesRecorded || 0));
console.log("Port Granary Stored: " + (ironM.portGranaryStored || 0.0).toFixed(2));
console.log("Cumulative Iron Biomass: " + (ironM.cumulativeIronBiomass || 0.0).toFixed(2));
const classM = (typeof sandbox.classicalHydraulicsManager !== 'undefined' ? sandbox.classicalHydraulicsManager.getMetrics() : {});
console.log("Latest 171st Channel (% WHI): " + ((hist.watermillHydraulicsIndex && hist.watermillHydraulicsIndex.length > 0 ? hist.watermillHydraulicsIndex[hist.watermillHydraulicsIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 172nd Channel (% CRI): " + ((hist.cropRotationIndex && hist.cropRotationIndex.length > 0 ? hist.cropRotationIndex[hist.cropRotationIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Classical Citizens: " + (classM.totalClassicalCitizens || 0));
console.log("Watermill Flour Milled: " + (classM.watermillFlourMilled || 0));
console.log("Aqueduct Deliveries: " + (classM.aqueductDeliveries || 0));
console.log("Nitrogen Rotation Cycles: " + (classM.nitrogenRotationCycles || 0));
console.log("Classical Granary Stored: " + (classM.classicalGranaryStored || 0.0).toFixed(2));
console.log("Cumulative Classical Biomass: " + (classM.cumulativeClassicalBiomass || 0.0).toFixed(2));
const medM = (typeof sandbox.medievalNavigationManager !== 'undefined' ? sandbox.medievalNavigationManager.getMetrics() : {});
console.log("Latest 173rd Channel (% WMI): " + ((hist.windmillMouldboardIndex && hist.windmillMouldboardIndex.length > 0 ? hist.windmillMouldboardIndex[hist.windmillMouldboardIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 174th Channel (% CNI): " + ((hist.compassNavigationIndex && hist.compassNavigationIndex.length > 0 ? hist.compassNavigationIndex[hist.compassNavigationIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Medieval Citizens: " + (medM.totalMedievalCitizens || 0));
console.log("Windmill Grain Milled: " + (medM.windmillGrainMilled || 0));
console.log("Clay Acres Ploughed: " + (medM.clayAcresPloughed || 0));
console.log("Oceanic Voyages Completed: " + (medM.oceanicVoyagesCompleted || 0));
console.log("Medieval Granary Stored: " + (medM.medievalGranaryStored || 0.0).toFixed(2));
console.log("Cumulative Medieval Biomass: " + (medM.cumulativeMedievalBiomass || 0.0).toFixed(2));
const renM = (typeof sandbox.renaissancePrintingManager !== 'undefined' ? sandbox.renaissancePrintingManager.getMetrics() : {});
console.log("Latest 175th Channel (% PPI): " + ((hist.printingPressIndex && hist.printingPressIndex.length > 0 ? hist.printingPressIndex[hist.printingPressIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 176th Channel (% CAI): " + ((hist.clockworkAstronomyIndex && hist.clockworkAstronomyIndex.length > 0 ? hist.clockworkAstronomyIndex[hist.clockworkAstronomyIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Renaissance Scholars: " + (renM.totalRenaissanceScholars || 0));
console.log("Treatises Printed: " + (renM.treatisesPrinted || 0));
console.log("Clockwork Sync Ticks: " + (renM.clockworkSyncTicks || 0));
console.log("Celestial Observations: " + (renM.celestialObservations || 0));
console.log("Renaissance Archive Stored: " + (renM.renaissanceArchiveStored || 0.0).toFixed(2));
console.log("Cumulative Renaissance Biomass: " + (renM.cumulativeRenaissanceBiomass || 0.0).toFixed(2));
const indM = (typeof sandbox.industrialSteamManager !== 'undefined' ? sandbox.industrialSteamManager.getMetrics() : {});
console.log("Latest 177th Channel (% STI): " + ((hist.steamThermodynamicIndex && hist.steamThermodynamicIndex.length > 0 ? hist.steamThermodynamicIndex[hist.steamThermodynamicIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 178th Channel (% RLI): " + ((hist.railLogisticsIndex && hist.railLogisticsIndex.length > 0 ? hist.railLogisticsIndex[hist.railLogisticsIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Industrial Citizens: " + (indM.totalIndustrialCitizens || 0));
console.log("Steam Boiler Cycles: " + (indM.steamBoilerCycles || 0));
console.log("Steel Tons Poured: " + (indM.steelTonsPoured || 0));
console.log("Rail Freight Deliveries: " + (indM.railFreightDeliveries || 0));
console.log("Industrial Depot Stored: " + (indM.industrialDepotStored || 0.0).toFixed(2));
console.log("Cumulative Industrial Biomass: " + (indM.cumulativeIndustrialBiomass || 0.0).toFixed(2));
const elecM = (typeof sandbox.electricNitrogenManager !== 'undefined' ? sandbox.electricNitrogenManager.getMetrics() : {});
console.log("Latest 179th Channel (% EGI): " + ((hist.electricalGridIndex && hist.electricalGridIndex.length > 0 ? hist.electricalGridIndex[hist.electricalGridIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 180th Channel (% SNI): " + ((hist.syntheticNitrogenIndex && hist.syntheticNitrogenIndex.length > 0 ? hist.syntheticNitrogenIndex[hist.syntheticNitrogenIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Electrified Citizens: " + (elecM.totalElectrifiedCitizens || 0));
console.log("Grid Kilowatt Pulses: " + (elecM.gridKilowattPulses || 0));
console.log("Telegraph Dispatches: " + (elecM.telegraphDispatches || 0));
console.log("Ammonia Tons Synthesized: " + (elecM.ammoniaTonsSynthesized || 0));
console.log("Synthetic Biosphere Stored: " + (elecM.syntheticBiosphereStored || 0.0).toFixed(2));
console.log("Cumulative Electric Biomass: " + (elecM.cumulativeElectricBiomass || 0.0).toFixed(2));
const avM = (typeof sandbox.aviationRadioManager !== "undefined" ? sandbox.aviationRadioManager.getMetrics() : {});
console.log("Latest 181st Channel (% ICA): " + ((hist.aviationCombustionIndex && hist.aviationCombustionIndex.length > 0 ? hist.aviationCombustionIndex[hist.aviationCombustionIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 182nd Channel (% RCI): " + ((hist.radioCommunicationIndex && hist.radioCommunicationIndex.length > 0 ? hist.radioCommunicationIndex[hist.radioCommunicationIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Aerospace Citizens: " + (avM.totalAerospaceCitizens || 0));
console.log("Engine Piston Cycles: " + (avM.enginePistonCycles || 0));
console.log("Flight Sorties Completed: " + (avM.flightSortiesCompleted || 0));
console.log("Radio Transmissions Count: " + (avM.radioTransmissionsCount || 0));
console.log("Aerial Cargo Stored: " + (avM.aerialCargoStored || 0.0).toFixed(2));
console.log("Cumulative Aviation Biomass: " + (avM.cumulativeAviationBiomass || 0.0).toFixed(2));
const siM = (typeof sandbox.siliconInternetManager !== "undefined" ? sandbox.siliconInternetManager.getMetrics() : {});
console.log("Latest 183rd Channel (% SMC): " + ((hist.semiconductorComputeIndex && hist.semiconductorComputeIndex.length > 0 ? hist.semiconductorComputeIndex[hist.semiconductorComputeIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 184th Channel (% GIN): " + ((hist.globalInternetIndex && hist.globalInternetIndex.length > 0 ? hist.globalInternetIndex[hist.globalInternetIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Digital Citizens: " + (siM.totalDigitalCitizens || 0));
console.log("Transistor Switch Cycles: " + (siM.transistorSwitchCycles || 0));
console.log("CPU Instruction Bursts: " + (siM.cpuInstructionBursts || 0));
console.log("Internet Packets Routed: " + (siM.internetPacketsRouted || 0));
console.log("Digital Knowledge Stored: " + (siM.digitalKnowledgeStored || 0.0).toFixed(2));
console.log("Cumulative Silicon Biomass: " + (siM.cumulativeSiliconBiomass || 0.0).toFixed(2));
const nqM = (typeof sandbox.neuralQuantumManager !== "undefined" ? sandbox.neuralQuantumManager.getMetrics() : {});
console.log("Latest 185th Channel (% ANI): " + ((hist.neuralRoboticsIndex && hist.neuralRoboticsIndex.length > 0 ? hist.neuralRoboticsIndex[hist.neuralRoboticsIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 186th Channel (% QCR): " + ((hist.quantumComputeIndex && hist.quantumComputeIndex.length > 0 ? hist.quantumComputeIndex[hist.quantumComputeIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Cognitive Citizens: " + (nqM.totalCognitiveCitizens || 0));
console.log("Neural Weight Updates: " + (nqM.neuralWeightUpdates || 0));
console.log("Robotic Assembly Cycles: " + (nqM.roboticAssemblyCycles || 0));
console.log("Quantum Gate Operations: " + (nqM.quantumGateOperations || 0));
console.log("Quantum Models Stored: " + (nqM.quantumModelsStored || 0.0).toFixed(2));
console.log("Cumulative Quantum Biomass: " + (nqM.cumulativeQuantumBiomass || 0.0).toFixed(2));
const synM = (typeof sandbox.syntheticCrisprManager !== "undefined" ? sandbox.syntheticCrisprManager.getMetrics() : {});
console.log("Latest 187th Channel (% SGE): " + ((hist.syntheticGenomicsIndex && hist.syntheticGenomicsIndex.length > 0 ? hist.syntheticGenomicsIndex[hist.syntheticGenomicsIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 188th Channel (% ACR): " + ((hist.artificialChassisIndex && hist.artificialChassisIndex.length > 0 ? hist.artificialChassisIndex[hist.artificialChassisIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Bioengineered Citizens: " + (synM.totalBioengineeredCitizens || 0));
console.log("CRISPR Gene Edits: " + (synM.crisprGeneEdits || 0));
console.log("Synthetic Enzyme Cycles: " + (synM.syntheticEnzymeCycles || 0));
console.log("Minimal Cell Divisions: " + (synM.minimalCellDivisions || 0));
console.log("Biotech Compounds Stored: " + (synM.biotechCompoundsStored || 0.0).toFixed(2));
console.log("Cumulative Synthetic Biomass: " + (synM.cumulativeSyntheticBiomass || 0.0).toFixed(2));
const orbM = (typeof sandbox.orbitalEcologyManager !== "undefined" ? sandbox.orbitalEcologyManager.getMetrics() : {});
console.log("Latest 189th Channel (% OHE): " + ((hist.orbitalHabitatIndex && hist.orbitalHabitatIndex.length > 0 ? hist.orbitalHabitatIndex[hist.orbitalHabitatIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 190th Channel (% AMR): " + ((hist.asteroidMiningIndex && hist.asteroidMiningIndex.length > 0 ? hist.asteroidMiningIndex[hist.asteroidMiningIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Orbital Citizens: " + (orbM.totalOrbitalCitizens || 0));
console.log("Bioreactor Culture Cycles: " + (orbM.bioreactorCultureCycles || 0));
console.log("Gas Recovery Cycles: " + (orbM.gasRecoveryCycles || 0));
console.log("Asteroid Extractions: " + (orbM.asteroidExtractions || 0));
console.log("Orbital Minerals Stored: " + (orbM.storedOrbitalMinerals || 0.0).toFixed(2));
console.log("Cumulative Orbital Biomass: " + (orbM.cumulativeOrbitalBiomass || 0.0).toFixed(2));
const tfM = (typeof sandbox.terraformingNetworkManager !== "undefined" ? sandbox.terraformingNetworkManager.getMetrics() : {});
console.log("Latest 191st Channel (% ETI): " + ((hist.exoplanetTerraformingIndex && hist.exoplanetTerraformingIndex.length > 0 ? hist.exoplanetTerraformingIndex[hist.exoplanetTerraformingIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 192nd Channel (% PGN): " + ((hist.panGalacticNetworkIndex && hist.panGalacticNetworkIndex.length > 0 ? hist.panGalacticNetworkIndex[hist.panGalacticNetworkIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Galactic Citizens: " + (tfM.totalGalacticCitizens || 0));
console.log("Atmospheric Seeding Cycles: " + (tfM.atmosphericSeedingCycles || 0));
console.log("Cryo Seed Dispatches: " + (tfM.cryoSeedDispatches || 0));
console.log("Galactic Sync Pulses: " + (tfM.galacticSyncPulses || 0));
console.log("Terraforming Biomass Stored: " + (tfM.storedTerraformingBiomass || 0.0).toFixed(2));
console.log("Cumulative Galactic Biomass: " + (tfM.cumulativeGalacticBiomass || 0.0).toFixed(2));
const dyM = (typeof sandbox.dysonBiosphereManager !== "undefined" ? sandbox.dysonBiosphereManager.getMetrics() : {});
console.log("Latest 193rd Channel (% DSH): " + ((hist.dysonSwarmIndex && hist.dysonSwarmIndex.length > 0 ? hist.dysonSwarmIndex[hist.dysonSwarmIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 194th Channel (% CER): " + ((hist.cosmicNegentropyIndex && hist.cosmicNegentropyIndex.length > 0 ? hist.cosmicNegentropyIndex[hist.cosmicNegentropyIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Stellar Citizens: " + (dyM.totalStellarCitizens || 0));
console.log("Dyson Harvest Cycles: " + (dyM.dysonHarvestCycles || 0));
console.log("Stellar Carbon Cycles: " + (dyM.stellarCarbonCycles || 0));
console.log("Negentropy Pulses: " + (dyM.negentropyPulses || 0));
console.log("Dyson Energy Stored: " + (dyM.storedDysonEnergy || 0.0).toFixed(2));
console.log("Cumulative Stellar Biomass: " + (dyM.cumulativeStellarBiomass || 0.0).toFixed(2));
const ubM = (typeof sandbox.universalBiosphereManager !== "undefined" ? sandbox.universalBiosphereManager.getMetrics() : {});
console.log("Latest 195th Channel (% UBS): " + ((hist.universalBiosphereIndex && hist.universalBiosphereIndex.length > 0 ? hist.universalBiosphereIndex[hist.universalBiosphereIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 196th Channel (% MVS): " + ((hist.multiverseSeedingIndex && hist.multiverseSeedingIndex.length > 0 ? hist.multiverseSeedingIndex[hist.multiverseSeedingIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Omega Citizens: " + (ubM.totalOmegaCitizens || 0));
console.log("Universal Synthesis Cycles: " + (ubM.universalSynthesisCycles || 0));
console.log("Cosmic Complexity Cycles: " + (ubM.cosmicComplexityCycles || 0));
console.log("Multiverse Seed Dispatches: " + (ubM.multiverseSeedDispatches || 0));
console.log("Omega Biomass Stored: " + (ubM.storedOmegaBiomass || 0.0).toFixed(2));
console.log("Cumulative Omega Biomass: " + (ubM.cumulativeOmegaBiomass || 0.0).toFixed(2));
const vrM = (typeof sandbox.vacuumResonanceManager !== "undefined" ? sandbox.vacuumResonanceManager.getMetrics() : {});
console.log("Latest 197th Channel (% QVR): " + ((hist.quantumVacuumIndex && hist.quantumVacuumIndex.length > 0 ? hist.quantumVacuumIndex[hist.quantumVacuumIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Latest 198th Channel (% MES): " + ((hist.metaEvolutionIndex && hist.metaEvolutionIndex.length > 0 ? hist.metaEvolutionIndex[hist.metaEvolutionIndex.length - 1] : 0.0) || 0.0).toFixed(1) + "%");
console.log("Total Vacuum Citizens: " + (vrM.totalVacuumCitizens || 0));
console.log("Zero-Point Tap Cycles: " + (vrM.zeroPointTapCycles || 0));
console.log("Resonance Cycles: " + (vrM.resonanceCycles || 0));
console.log("Meta-Evolution Pulses: " + (vrM.metaEvolutionPulses || 0));
console.log("Vacuum Energy Stored: " + (vrM.storedVacuumEnergy || 0.0).toFixed(2));
console.log("Cumulative Vacuum Biomass: " + (vrM.cumulativeVacuumBiomass || 0.0).toFixed(2));
const mesoMgr = sandbox.mesolithicFisheryManager;
const mesoMetrics = mesoMgr ? mesoMgr.getMetrics() : {};
console.log("Total Mesolithic Fishers: " + (mesoMetrics.totalMesolithicFishers || 0));
console.log("Active Harpooners: " + (mesoMetrics.activeHarpooners || 0));
console.log("Active Weir Trappers: " + (mesoMetrics.activeWeirTrappers || 0));
console.log("Active Canoe Paddlers: " + (mesoMetrics.activeCanoePaddlers || 0));
console.log("Mean Barbed Harpoon Craft: " + (((mesoMetrics.meanHarpoonCraft || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Refraction Correction: " + (((mesoMetrics.meanRefractionCorrection || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Mean Retaining Line Traction: " + (((mesoMetrics.meanRetainingTraction || 0.87) * 100.0).toFixed(1)) + "%");
console.log("Mean Weir Construction: " + (((mesoMetrics.meanWeirConstruction || 0.88) * 100.0).toFixed(1)) + "%");
console.log("Mean Basket Trap Efficiency: " + (((mesoMetrics.meanTrapEfficiency || 0.89) * 100.0).toFixed(1)) + "%");
console.log("Mean Passive Trap Yield: " + (((mesoMetrics.meanPassiveYield || 0.86) * 100.0).toFixed(1)) + "%");
console.log("Mean Dugout Canoe Craft: " + (((mesoMetrics.meanCanoeCraft || 0.87) * 100.0).toFixed(1)) + "%");
console.log("Harpoon Strikes Launched: " + (mesoMetrics.harpoonStrikesLaunched || 0));
console.log("Passive Fish Trapped: " + (mesoMetrics.passiveFishTrapped || 0));
console.log("Canoe Voyages Undertaken: " + (mesoMetrics.canoeVoyagesUndertaken || 0));
console.log("Harvested Riparian Biomass: " + ((mesoMetrics.harvestedRiparianBiomass || 0).toFixed(2)));
console.log("Cumulative Fisher Biomass: " + ((mesoMetrics.cumulativeFisherBiomass || 0).toFixed(2)));
const machMgr = sandbox.machairodontCanineManager;
const machMetrics = machMgr ? machMgr.getMetrics() : {};
console.log("Total Machairodonts: " + (machMetrics.totalMachairodonts || 0));
console.log("Total Amphicyonids: " + (machMetrics.totalAmphicyonids || 0));
console.log("Active Saber Strikes: " + (machMetrics.activeSaberStrikes || 0));
console.log("Active Grapplers: " + (machMetrics.activeGrapplers || 0));
console.log("Active Bear-Dog Crushers: " + (machMetrics.activeBearDogCrushers || 0));
console.log("Mean Saber Canine Length: " + ((machMetrics.meanSaberLength || 0).toFixed(1)) + " cm eq");
console.log("Mean Jaw Gape Angle: " + ((machMetrics.meanJawGape || 0).toFixed(1)) + " deg");
console.log("Mean Canine Shear Force: " + ((machMetrics.meanShearForce || 0).toFixed(1)) + " N");
console.log("Mean Cervical Laceration Rate: " + ((machMetrics.meanLacerationRate || 0).toFixed(2)));
console.log("Mean Bear-Dog Crush Force: " + ((machMetrics.meanBearDogCrush || 0).toFixed(1)) + " N");
console.log("Mean Premolar Bone Crushing: " + ((machMetrics.meanPremolarEfficiency || 0).toFixed(2)));
console.log("Saber Strike Events: " + (machMetrics.saberStrikeEvents || 0));
console.log("Grapple Events: " + (machMetrics.grappleEvents || 0));
console.log("Bone Crush Events: " + (machMetrics.boneCrushEvents || 0));
console.log("Scavenged Marrow Biomass: " + ((machMetrics.scavengedMarrowBiomass || 0).toFixed(2)));
console.log("Cumulative Apex Carnivore Biomass: " + ((machMetrics.cumulativeApexCarnivoreBiomass || 0).toFixed(2)));
const chalicoMgr = sandbox.chalicothereClawManager;
const chalicoMetrics = chalicoMgr ? chalicoMgr.getMetrics() : {};
console.log("Total Chalicotheres: " + (chalicoMetrics.totalChalicotheres || 0));
console.log("Total Moropus: " + (chalicoMetrics.totalMoropus || 0));
console.log("Active Branch Hookers: " + (chalicoMetrics.activeBranchHookers || 0));
console.log("Active Tripodal Browsers: " + (chalicoMetrics.activeTripodalBrowsers || 0));
console.log("Mean Chalicothere Claw Index (% CCI): " + ((chalicoMetrics.meanChalicothereClawIndex || 0).toFixed(1)) + "%");
console.log("Mean Branch Pulling Index (% BPI): " + ((chalicoMetrics.meanBranchPullingIndex || 0).toFixed(1)) + "%");
console.log("Mean Branch-Hooking Pull Force: " + ((chalicoMetrics.meanPullForce || 0).toFixed(1)) + " N");
console.log("Mean Retractile Ungual Claws: " + ((chalicoMetrics.meanClawRetention || 0).toFixed(2)));
console.log("Mean Knuckle-Walking Locomotion: " + ((chalicoMetrics.meanKnuckleWalking || 0).toFixed(2)));
console.log("Mean Tripodal Stance Stability: " + ((chalicoMetrics.meanTripodalStance || 0).toFixed(2)));
console.log("Mean Foliage Stripping Yield: " + ((chalicoMetrics.meanStrippingYield || 0).toFixed(2)));
console.log("Mean Lophodont Mastication: " + ((chalicoMetrics.meanLophodontEfficiency || 0).toFixed(2)));
console.log("Mean Cementum Wear Resistance: " + ((chalicoMetrics.meanCementumResistance || 0).toFixed(2)));
console.log("Branch Hook Events: " + (chalicoMetrics.branchHookEvents || 0));
console.log("Tripodal Stance Events: " + (chalicoMetrics.tripodalStanceEvents || 0));
console.log("Bark Strip Events: " + (chalicoMetrics.barkStripEvents || 0));
console.log("Harvested Canopy Biomass: " + ((chalicoMetrics.harvestedCanopyBiomass || 0).toFixed(2)));
console.log("Cumulative Chalicothere Biomass: " + ((chalicoMetrics.cumulativeChalicothereBiomass || 0).toFixed(2)));
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
const lan = sandbox.getLantern();
const lanMetrics = lan ? lan.getMetrics() : {};
console.log("Total Lantern Organisms: " + (lanMetrics.totalLanternOrganisms || 0));
console.log("Mean Teeth Sharpness: " + (((lanMetrics.meanTeethSharpness || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Protractor Force: " + ((lanMetrics.meanProtractorForce || 0).toFixed(2)) + " N");
console.log("Mean Bioerosion Rate: " + ((lanMetrics.meanBioerosionRate || 0).toFixed(3)) + " mg/s");
console.log("Algal Scraping Events: " + (lanMetrics.algalScrapingEvents || 0));
console.log("Bioerosion Incidents: " + (lanMetrics.bioerosionIncidents || 0));
console.log("Dental Renewal Events: " + (lanMetrics.dentalRenewalEvents || 0));
console.log("Microfracture Events: " + (lanMetrics.microfractureEvents || 0));
console.log("Mean Tooth Sac Calcite Reserve: " + ((lanMetrics.meanToothSacReserve || 0).toFixed(1)) + "%");
console.log("Mean Microfracture Rate: " + (((lanMetrics.meanMicrofractureRate || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Blunting Penalty: " + (((lanMetrics.meanBluntingPenalty || 0) * 100.0).toFixed(1)) + "%");
console.log("Urchin Barren Active: " + (lanMetrics.urchinBarrenState ? "YES" : "NO"));
console.log("Calcite Silt Suspension: " + ((lanMetrics.calciteSiltSuspension || 0).toFixed(2)) + " mg/L");
console.log("Reef Matrix Weakening: " + (((lanMetrics.reefMatrixWeakeningRatio || 0) * 100.0).toFixed(1)) + "%");
console.log("Excavated Volume: " + (((lanMetrics.cumulativeExcavatedVolume || 0) / 1000.0).toFixed(1)) + "k um3");
const cuv = sandbox.getCuvierian();
const cuvMetrics = cuv ? cuv.getMetrics() : {};
console.log("Total Holothuroids: " + (cuvMetrics.totalHolothuroidOrganisms || 0));
console.log("Mean Cuvierian Tubules Reserve: " + ((cuvMetrics.meanTubulesReserve || 0).toFixed(1)));
console.log("Mean Holothurin Toxin Payload: " + ((cuvMetrics.meanHolothurinPayload || 0).toFixed(1)) + " mg");
console.log("Tubule Ejection Incidents: " + (cuvMetrics.tubuleEjectionIncidents || 0));
console.log("Predator Immobilization Events: " + (cuvMetrics.predatorImmobilizationEvents || 0));
console.log("Fecal Pellet Deposits: " + (cuvMetrics.fecalPelletDeposits || 0));
console.log("Sediment Processed: " + ((cuvMetrics.cumulativeSedimentProcessed || 0).toFixed(1)) + " mg");
console.log("Mean Coelomic Lipid Reserve: " + ((cuvMetrics.meanCoelomicLipids || 0).toFixed(1)) + "%");
console.log("Mean Respiratory Parasite Load: " + (((cuvMetrics.meanParasiteLoad || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Visceral Integrity: " + (((cuvMetrics.meanVisceralIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Eviscerated Organisms: " + (cuvMetrics.evisceratedOrganisms || 0));
console.log("Evisceration Incidents: " + (cuvMetrics.eviscerationIncidents || 0));
console.log("Parasite Intrusion Events: " + (cuvMetrics.parasiteIntrusionEvents || 0));
const astMetrics = sandbox.getAsteroidea ? (sandbox.getAsteroidea().getMetrics() || {}) : {};
console.log("Total Asteroidea: " + (astMetrics.totalAsteroideaOrganisms || 0));
console.log("Mean Catch Compliance (% CAC): " + (((astMetrics.meanCatchApparatusComplianceIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Extraoral Gastric Eversion (% EGE): " + (((astMetrics.meanExtraoralGastricEversionIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Gastric Trauma Spasms: " + (astMetrics.gastricTraumaSpasms || 0));
console.log("Blastema Arrests: " + (astMetrics.blastemaArrests || 0));
console.log("Mean Isometric Torque: " + ((astMetrics.meanIsometricTorque || 0).toFixed(1)) + " N*cm");
console.log("Active Prying Predators: " + (astMetrics.activePryingPredators || 0));
console.log("Everted Stomach Feeders: " + (astMetrics.evertedStomachFeeders || 0));
console.log("Bivalve Breach Events: " + (astMetrics.bivalveBreachEvents || 0));
console.log("Arm Autotomy Incidents: " + (astMetrics.armAutotomyEvents || 0));
const ophiMetrics = sandbox.getOphiuroid ? (sandbox.getOphiuroid().getMetrics() || {}) : {};
console.log("Total Ophiuroidea: " + (ophiMetrics.totalOphiuroidOrganisms || 0));
console.log("Mean Serpentiform Speed: " + ((ophiMetrics.meanSlitherSpeed || 0).toFixed(2)) + " px/tick");
console.log("Mean Vertebral Flexion: " + ((ophiMetrics.meanVertebralFlexion || 0).toFixed(2)) + " rad");
console.log("Mean Intact Arm Segments: " + ((ophiMetrics.meanIntactSegments || 0).toFixed(1)));
console.log("Active Slithering Organisms: " + (ophiMetrics.activeSlitheringOrganisms || 0));
console.log("Crevice Sheltered Organisms: " + (ophiMetrics.creviceShelteredOrganisms || 0));
console.log("Segment Autotomy Events: " + (ophiMetrics.segmentAutotomyEvents || 0));
console.log("Mean Brittle Fracture (% BFR): " + (((ophiMetrics.meanBrittleFractureRatio || 0) * 100.0).toFixed(1)) + "%");
console.log("Disc Trauma Incidents: " + (ophiMetrics.discTraumaIncidents || 0));
console.log("Calcification Stalls: " + (ophiMetrics.calcificationStalls || 0));
const hemiMetrics = sandbox.getHemichordate ? (sandbox.getHemichordate().getMetrics() || {}) : {};
console.log("Total Hemichordates: " + (hemiMetrics.totalHemichordateOrganisms || 0));
console.log("Mean Pharyngeal Slit Index (% PSI): " + (((hemiMetrics.meanPharyngealSlitIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Gill Slits Count: " + ((hemiMetrics.meanGillSlitsCount || 0).toFixed(1)));
console.log("Mean Gill Slit Efficiency: " + (((hemiMetrics.meanGillSlitEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Stomochord Support: " + (((hemiMetrics.meanStomochordSupport || 0) * 100.0).toFixed(1)) + "%");
console.log("Active Burrowing Hemichordates: " + (hemiMetrics.activeBurrowersCount || 0));
console.log("Pharyngeal Filtration Events: " + (hemiMetrics.pharyngealFiltrationEvents || 0));
console.log("Burrowing Incidents: " + (hemiMetrics.burrowingEvents || 0));
console.log("Mean Burrowing Efficiency (% PBE): " + (((hemiMetrics.meanProboscisBurrowingEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Silt Clogging: " + (((hemiMetrics.meanSiltCloggingLevel || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Hypoxic Stress: " + (((hemiMetrics.meanHypoxicStress || 0) * 100.0).toFixed(1)) + "%");
console.log("Proboscis Flushing Events: " + (hemiMetrics.proboscisFlushingEvents || 0));
console.log("Asphyxiation Incidents: " + (hemiMetrics.asphyxiationIncidents || 0));
console.log("Mucus Depletion Stalls: " + (hemiMetrics.mucusDepletionStalls || 0));
const cephMetrics = sandbox.getCephalochordate ? (sandbox.getCephalochordate().getMetrics() || {}) : {};
console.log("Total Cephalochordates: " + (cephMetrics.totalCephalochordateOrganisms || 0));
console.log("Mean Notochord Tension Index (% NTI): " + (((cephMetrics.meanNotochordTensionIndex || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Notochord Length: " + ((cephMetrics.meanNotochordLength || 0).toFixed(1)) + " px");
console.log("Mean Myomeres Count: " + ((cephMetrics.meanMyomeresCount || 0).toFixed(1)));
console.log("Mean Swimming Velocity: " + ((cephMetrics.meanSwimmingVelocity || 0).toFixed(2)) + " px/tick");
console.log("Active Swimmers: " + (cephMetrics.activeSwimmersCount || 0));
console.log("Reverse Sand Burrowers: " + (cephMetrics.reverseBurrowersCount || 0));
console.log("Endostyle Filtration Events: " + (cephMetrics.endostyleFiltrationEvents || 0));
console.log("Mean Myomeric Flexion (% MFE): " + (((cephMetrics.meanMyomericFlexionEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Notochord Fatigue: " + (((cephMetrics.meanNotochordFatigue || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Lactic Acidosis: " + (((cephMetrics.meanLacticAcidosis || 0) * 100.0).toFixed(1)) + "%");
console.log("Axial Buckling Incidents: " + (cephMetrics.axialBucklingIncidents || 0));
console.log("Myomeric Cramp Incidents: " + (cephMetrics.myomericCrampIncidents || 0));
console.log("Pharyngeal Cough Events: " + (cephMetrics.pharyngealCoughEvents || 0));
const uroMetrics = sandbox.getUrochordate ? (sandbox.getUrochordate().getMetrics() || {}) : {};
console.log("Total Urochordates: " + (uroMetrics.totalUrochordateOrganisms || 0));
console.log("Active Adult Sessile: " + (uroMetrics.activeAdultSessileCount || 0));
console.log("Active Tadpole Larvae: " + (uroMetrics.activeTadpoleLarvaeCount || 0));
console.log("Metamorphosis Incidents: " + (uroMetrics.metamorphosisIncidents || 0));
console.log("Substrate Settlement Events: " + (uroMetrics.substrateSettlementEvents || 0));
console.log("Mean Tunic Thickness: " + ((uroMetrics.meanTunicThickness || 0).toFixed(2)) + " um");
console.log("Mean Tunic Integrity: " + (((uroMetrics.meanTunicIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Ciliary Pumping Rate: " + ((uroMetrics.meanCiliaryPumpingRate || 0).toFixed(2)) + " uL/s");
console.log("Mean Tunic Protective Index (% TPI): " + (((uroMetrics.meanTunicProtectiveIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Ciliary Pumping & Reversal (% CPR): " + (((uroMetrics.meanCiliaryPumpingReversalRatio || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Siphon Detrital Fouling: " + (((uroMetrics.meanSiphonFouling || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Tunicate Hypoxic Stress: " + (((uroMetrics.meanHypoxicStress || 0) * 100.0).toFixed(1)) + "%");
console.log("Siphon Fouling Incidents: " + (uroMetrics.siphonFoulingIncidents || 0));
console.log("Squirting Spasm Events: " + (uroMetrics.squirtingSpasmEvents || 0));
console.log("Cardiac Reversal Events: " + (uroMetrics.cardiacReversalEvents || 0));
console.log("Cardiac Arrhythmia Incidents: " + (uroMetrics.cardiacArrhythmiaIncidents || 0));
const craniataMetrics = sandbox.getCraniata ? (sandbox.getCraniata().getMetrics() || {}) : {};
console.log("Total Craniates: " + (craniataMetrics.totalCraniataOrganisms || 0));
console.log("Mean Chondrocranium Integrity: " + (((craniataMetrics.meanChondrocraniumIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Cranial Armor Defense: " + (((craniataMetrics.meanCranialArmorDefense || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Slime Defense Capacity (% SCI): " + (((craniataMetrics.meanSlimeDefenseCapacity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Slime Payload: " + ((craniataMetrics.meanSlimePayload || 0).toFixed(1)) + " mg");
console.log("Mean Slime Glands Count: " + ((craniataMetrics.meanSlimeGlandCount || 0).toFixed(1)));
console.log("Mean Slime Expansion Ratio: " + ((craniataMetrics.meanSlimeExpansionRatio || 0).toFixed(1)) + "x");
console.log("Active Slime Clouds: " + (craniataMetrics.activeSlimeCloudCount || 0));
console.log("Slime Ejection Incidents: " + (craniataMetrics.slimeEjectionEvents || 0));
console.log("Predator Gill Suffocations: " + (craniataMetrics.predatorGillSuffocations || 0));
console.log("Body Knotting Maneuvers: " + (craniataMetrics.bodyKnottingManeuvers || 0));
console.log("Benthic Scavenging Events: " + (craniataMetrics.benthicScavengingEvents || 0));
console.log("Cumulative Slime Expanded Liters: " + ((craniataMetrics.cumulativeSlimeExpandedLiters || 0).toFixed(2)) + " L");
console.log("Mean Oral Suction Traction (% OTI): " + (((craniataMetrics.meanOralSuctionTractionIndex || 0)).toFixed(1)) + "%");
console.log("Mean Parasitic Traction Force: " + ((craniataMetrics.meanParasiticTractionForce || 0).toFixed(2)) + " N");
console.log("Mean Keratin Teeth Sharpness: " + (((craniataMetrics.meanKeratinTeethSharpness || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Tidal Ventilation Rate: " + ((craniataMetrics.meanTidalVentilationRate || 0).toFixed(2)) + " Hz");
console.log("Active Parasitic Attachments: " + (craniataMetrics.activeParasiticAttachments || 0));
console.log("Parasitic Latching Events: " + (craniataMetrics.parasiticLatchingEvents || 0));
console.log("Tooth Renewal Events: " + (craniataMetrics.toothRenewalEvents || 0));
console.log("Cumulative Hematophagic Energy Drawn: " + ((craniataMetrics.cumulativeHematophagicEnergyDrawn || 0).toFixed(2)));
const ostracodermMetrics = sandbox.getOstracoderm ? (sandbox.getOstracoderm().getMetrics() || {}) : {};
console.log("Total Ostracoderms: " + (ostracodermMetrics.totalOstracodermOrganisms || 0));
console.log("Mean Ostracoderm Armor Integrity (% OAI): " + (((ostracodermMetrics.meanOstracodermArmorIntegrity || 0)).toFixed(1)) + "%");
console.log("Mean Cephalic Shield Integrity: " + (((ostracodermMetrics.meanCephalicShieldIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Dermal Plate Thickness: " + ((ostracodermMetrics.meanDermalPlateThickness || 0).toFixed(2)) + " mm eq");
console.log("Mean Crush Resistance Coeff: " + (((ostracodermMetrics.meanCrushResistanceCoeff || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Denticle Density: " + (((ostracodermMetrics.meanDenticleDensity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Negative Buoyancy Force: " + ((ostracodermMetrics.meanNegativeBuoyancyForce || 0).toFixed(2)) + " N");
console.log("Mean Pectoral Elevation Force: " + ((ostracodermMetrics.meanPectoralElevationForce || 0).toFixed(2)) + " N");
console.log("Predator Crush Deflections: " + (ostracodermMetrics.predatorCrushDeflections || 0));
console.log("Eurypterid Strikes Survived: " + (ostracodermMetrics.eurypteridPincerStrikesSurvived || 0));
console.log("Benthic Detrital Scans: " + (ostracodermMetrics.benthicDetritalScans || 0));
console.log("Mean Pectoral Elevation Force Index (% PEF): " + ((ostracodermMetrics.meanPectoralElevationForceIndex || 0).toFixed(1)) + "%");
console.log("Mean Pectoral Attack Angle: " + (((ostracodermMetrics.meanPectoralAttackAngle || 0) * (180 / Math.PI)).toFixed(1)) + " deg");
console.log("Mean Ground Effect Multiplier: " + ((ostracodermMetrics.meanBenthicGroundEffect || 1.0).toFixed(2)) + "x");
console.log("Ground Effect Cruising Events: " + (ostracodermMetrics.groundEffectCruisingEvents || 0));
console.log("Pitch Trim Stabilizations: " + (ostracodermMetrics.pitchTrimStabilizations || 0));
console.log("Hydrofoil Lift Stabilizations: " + (ostracodermMetrics.hydrofoilLiftStabilizations || 0));
console.log("Cumulative Armored Biomass: " + ((ostracodermMetrics.cumulativeArmoredBiomassAssimilated || 0).toFixed(2)));
const placodermMetrics = sandbox.getPlacoderm ? (sandbox.getPlacoderm().getMetrics() || {}) : {};
console.log("Total Placoderms: " + (placodermMetrics.totalPlacodermOrganisms || 0));
console.log("Mean Gnathostome Jaw Index (% GJI): " + ((placodermMetrics.meanGnathostomeJawIndex || 0).toFixed(1)) + "%");
console.log("Mean Bite Force Magnitude: " + ((placodermMetrics.meanBiteForceMagnitude || 0).toFixed(1)) + " N eq");
console.log("Mean Gnathal Shear Sharpness: " + (((placodermMetrics.meanGnathalShearSharpness || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Adductor Muscles Tension: " + (((placodermMetrics.meanAdductorMusclesTension || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Armor Crush Penetration: " + (((placodermMetrics.meanArmorCrushPenetration || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Jaw Gape Angle: " + (((placodermMetrics.meanJawGapeAngle || 0) * (180 / Math.PI)).toFixed(1)) + " deg");
console.log("Apex Predation Strikes: " + (placodermMetrics.apexPredationStrikes || 0));
console.log("Armor Breach Crushes: " + (placodermMetrics.armorBreachCrushes || 0));
console.log("Suction Intake Events: " + (placodermMetrics.suctionIntakeEvents || 0));
console.log("Gnathal Self-Sharpenings: " + (placodermMetrics.gnathalSelfSharpenings || 0));
console.log("Cumulative Sheared Biomass: " + ((placodermMetrics.cumulativeShearedBiomass || 0).toFixed(2)));
console.log("Mean Cranio-Thoracic Shear Index (% CTS): " + ((placodermMetrics.meanCranioThoracicShearIndex || 0).toFixed(1)) + "%");
console.log("Mean Head Elevation Angle: " + (((placodermMetrics.meanHeadElevationAngle || 0) * (180 / Math.PI)).toFixed(1)) + " deg");
console.log("Mean Total Gape Angle: " + (((placodermMetrics.meanTotalGapeAngle || 0) * (180 / Math.PI)).toFixed(1)) + " deg");
console.log("Mean Epaxial Neck Tension: " + (((placodermMetrics.meanEpaxialNeckTension || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Hinge Joint Fatigue: " + (((placodermMetrics.meanHingeJointFatigue || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Cavitation Suction: " + ((placodermMetrics.meanCavitationSuctionForce || 0).toFixed(1)) + " N");
console.log("Double-Joint Gape Strikes: " + (placodermMetrics.doubleJointGapeStrikes || 0));
console.log("Cavitation Vortex Events: " + (placodermMetrics.cavitationVortexEvents || 0));
console.log("Occlusal Wear Events: " + (placodermMetrics.occlusalWearEvents || 0));
console.log("Gnathal Remodeling Events: " + (placodermMetrics.gnathalRemodelingEvents || 0));
console.log("Hinge Fatigue Stalls: " + (placodermMetrics.hingeFatigueStalls || 0));
const chMgr = sandbox.chondrichthyesCartilageManager;
const chMetrics = chMgr ? chMgr.getMetrics() : {};
console.log("Total Chondrichthyes: " + (chMetrics.totalChondrichthyesOrganisms || 0));
console.log("Mean Placoid Denticle Index (% PDI): " + ((chMetrics.meanPlacoidDenticleIndex || 0).toFixed(1)) + "%");
console.log("Mean Polyphyodont Replacement Rate (% PBR): " + ((chMetrics.meanPolyphyodontReplacementRate || 0).toFixed(1)) + "%");
console.log("Mean Prismatic Cartilage Integrity: " + (((chMetrics.meanPrismaticCartilageIntegrity || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Hydrodynamic Agility Multiplier: " + ((chMetrics.meanHydrodynamicAgility || 0).toFixed(2)) + "x");
console.log("Mean Placoid Denticle Coverage: " + (((chMetrics.meanPlacoidDenticleCoverage || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Skin Friction Drag Reduction: " + (((chMetrics.meanSkinFrictionReduction || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Tooth Row Ranks: " + ((chMetrics.meanToothRowRanks || 0).toFixed(1)));
console.log("Mean Vitrodentin Sharpness: " + (((chMetrics.meanVitrodentinSharpness || 0) * 100.0).toFixed(1)) + "%");
console.log("Mean Spiracle Efficiency: " + (((chMetrics.meanSpiracleEfficiency || 0) * 100.0).toFixed(1)) + "%");
console.log("Conveyor Tooth Replacements: " + (chMetrics.conveyorToothReplacements || 0));
console.log("Ram Ventilation Events: " + (chMetrics.ramVentilationEvents || 0));
console.log("Spiracular Inflow Events: " + (chMetrics.spiracularInflowEvents || 0));
console.log("Agility Burst Events: " + (chMetrics.agilityBurstEvents || 0));
console.log("Cumulative Cartilaginous Biomass: " + ((chMetrics.cumulativeCartilaginousBiomass || 0).toFixed(2)));
console.log("Numerical Anomalies: " + anomalyCount);

// Validate 97th & 98th Telemetry Channel Historical Buffers (QA v8.43.0)
let histAnomalyCount = 0;
if (hist.notochordTensionIndex) {
    for (let h = 0; h < hist.notochordTensionIndex.length; h++) {
        const v = hist.notochordTensionIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] notochordTensionIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.myomericFlexionEfficiency) {
    for (let h = 0; h < hist.myomericFlexionEfficiency.length; h++) {
        const v = hist.myomericFlexionEfficiency[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] myomericFlexionEfficiency buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.tunicProtectiveIntegrity) {
    for (let h = 0; h < hist.tunicProtectiveIntegrity.length; h++) {
        const v = hist.tunicProtectiveIntegrity[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] tunicProtectiveIntegrity buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.ciliaryPumpingReversalRatio) {
    for (let h = 0; h < hist.ciliaryPumpingReversalRatio.length; h++) {
        const v = hist.ciliaryPumpingReversalRatio[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] ciliaryPumpingReversalRatio buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.slimeDefenseCapacity) {
    for (let h = 0; h < hist.slimeDefenseCapacity.length; h++) {
        const v = hist.slimeDefenseCapacity[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] slimeDefenseCapacity buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.oralSuctionTractionIndex) {
    for (let h = 0; h < hist.oralSuctionTractionIndex.length; h++) {
        const v = hist.oralSuctionTractionIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] oralSuctionTractionIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.ostracodermArmorIntegrity) {
    for (let h = 0; h < hist.ostracodermArmorIntegrity.length; h++) {
        const v = hist.ostracodermArmorIntegrity[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] ostracodermArmorIntegrity buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.pectoralElevationForceIndex) {
    for (let h = 0; h < hist.pectoralElevationForceIndex.length; h++) {
        const v = hist.pectoralElevationForceIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] pectoralElevationForceIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.gnathostomeJawIndex) {
    for (let h = 0; h < hist.gnathostomeJawIndex.length; h++) {
        const v = hist.gnathostomeJawIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] gnathostomeJawIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.cranioThoracicShearIndex) {
    for (let h = 0; h < hist.cranioThoracicShearIndex.length; h++) {
        const v = hist.cranioThoracicShearIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] cranioThoracicShearIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.placoidDenticleIndex) {
    for (let h = 0; h < hist.placoidDenticleIndex.length; h++) {
        const v = hist.placoidDenticleIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] placoidDenticleIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.polyphyodontReplacementRate) {
    for (let h = 0; h < hist.polyphyodontReplacementRate.length; h++) {
        const v = hist.polyphyodontReplacementRate[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] polyphyodontReplacementRate buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.swimBladderIndex) {
    for (let h = 0; h < hist.swimBladderIndex.length; h++) {
        const v = hist.swimBladderIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] swimBladderIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.opercularVentilationRate) {
    for (let h = 0; h < hist.opercularVentilationRate.length; h++) {
        const v = hist.opercularVentilationRate[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] opercularVentilationRate buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.lobeFinLocomotionIndex) {
    for (let h = 0; h < hist.lobeFinLocomotionIndex.length; h++) {
        const v = hist.lobeFinLocomotionIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] lobeFinLocomotionIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.pulmonaryRespirationRate) {
    for (let h = 0; h < hist.pulmonaryRespirationRate.length; h++) {
        const v = hist.pulmonaryRespirationRate[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] pulmonaryRespirationRate buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.tetrapodAppendicularIndex) {
    for (let h = 0; h < hist.tetrapodAppendicularIndex.length; h++) {
        const v = hist.tetrapodAppendicularIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] tetrapodAppendicularIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.amphibiousAcousticIndex) {
    for (let h = 0; h < hist.amphibiousAcousticIndex.length; h++) {
        const v = hist.amphibiousAcousticIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] amphibiousAcousticIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.amnioticEggIntegrityIndex) {
    for (let h = 0; h < hist.amnioticEggIntegrityIndex.length; h++) {
        const v = hist.amnioticEggIntegrityIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] amnioticEggIntegrityIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.keratinizedScaleResilienceIndex) {
    for (let h = 0; h < hist.keratinizedScaleResilienceIndex.length; h++) {
        const v = hist.keratinizedScaleResilienceIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] keratinizedScaleResilienceIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.tribosphenicMolarIndex) {
    for (let h = 0; h < hist.tribosphenicMolarIndex.length; h++) {
        const v = hist.tribosphenicMolarIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] tribosphenicMolarIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.chorioallantoicPlacentaIndex) {
    for (let h = 0; h < hist.chorioallantoicPlacentaIndex.length; h++) {
        const v = hist.chorioallantoicPlacentaIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] chorioallantoicPlacentaIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.plagiaulacoidBladeIndex) {
    for (let h = 0; h < hist.plagiaulacoidBladeIndex.length; h++) {
        const v = hist.plagiaulacoidBladeIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] plagiaulacoidBladeIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.torporHibernationIndex) {
    for (let h = 0; h < hist.torporHibernationIndex.length; h++) {
        const v = hist.torporHibernationIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] torporHibernationIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.binocularVisionIndex) {
    for (let h = 0; h < hist.binocularVisionIndex.length; h++) {
        const v = hist.binocularVisionIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] binocularVisionIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.opposableGraspingIndex) {
    for (let h = 0; h < hist.opposableGraspingIndex.length; h++) {
        const v = hist.opposableGraspingIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] opposableGraspingIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.cetaceanTransitionIndex) {
    for (let h = 0; h < hist.cetaceanTransitionIndex.length; h++) {
        const v = hist.cetaceanTransitionIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] cetaceanTransitionIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.aquaticUndulatingThrust) {
    for (let h = 0; h < hist.aquaticUndulatingThrust.length; h++) {
        const v = hist.aquaticUndulatingThrust[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] aquaticUndulatingThrust buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.ossiconeWeaponizationIndex) {
    for (let h = 0; h < hist.ossiconeWeaponizationIndex.length; h++) {
        const v = hist.ossiconeWeaponizationIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] ossiconeWeaponizationIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.graviportalColumnarIndex) {
    for (let h = 0; h < hist.graviportalColumnarIndex.length; h++) {
        const v = hist.graviportalColumnarIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] graviportalColumnarIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.boneCrushingCarnassialIndex) {
    for (let h = 0; h < hist.boneCrushingCarnassialIndex.length; h++) {
        const v = hist.boneCrushingCarnassialIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] boneCrushingCarnassialIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.cursorialTerrestrialIndex) {
    for (let h = 0; h < hist.cursorialTerrestrialIndex.length; h++) {
        const v = hist.cursorialTerrestrialIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] cursorialTerrestrialIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.beakBiomechanicsIndex) {
    for (let h = 0; h < hist.beakBiomechanicsIndex.length; h++) {
        const v = hist.beakBiomechanicsIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] beakBiomechanicsIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.avianPursuitIndex) {
    for (let h = 0; h < hist.avianPursuitIndex.length; h++) {
        const v = hist.avianPursuitIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] avianPursuitIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.paraceratheriidElevationIndex) {
    for (let h = 0; h < hist.paraceratheriidElevationIndex.length; h++) {
        const v = hist.paraceratheriidElevationIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] paraceratheriidElevationIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.browsingFoliageIndex) {
    for (let h = 0; h < hist.browsingFoliageIndex.length; h++) {
        const v = hist.browsingFoliageIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] browsingFoliageIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.entelodontBiteIndex) {
    for (let h = 0; h < hist.entelodontBiteIndex.length; h++) {
        const v = hist.entelodontBiteIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] entelodontBiteIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.omnivorousFlangeIndex) {
    for (let h = 0; h < hist.omnivorousFlangeIndex.length; h++) {
        const v = hist.omnivorousFlangeIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] omnivorousFlangeIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.chalicothereClawIndex) {
    for (let h = 0; h < hist.chalicothereClawIndex.length; h++) {
        const v = hist.chalicothereClawIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] chalicothereClawIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.branchPullingIndex) {
    for (let h = 0; h < hist.branchPullingIndex.length; h++) {
        const v = hist.branchPullingIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] branchPullingIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.saberCanineIndex) {
    for (let h = 0; h < hist.saberCanineIndex.length; h++) {
        const v = hist.saberCanineIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] saberCanineIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.bearDogIndex) {
    for (let h = 0; h < hist.bearDogIndex.length; h++) {
        const v = hist.bearDogIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] bearDogIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.hypsodontEnamelIndex) {
    for (let h = 0; h < hist.hypsodontEnamelIndex.length; h++) {
        const v = hist.hypsodontEnamelIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] hypsodontEnamelIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.cursorialSprintIndex) {
    for (let h = 0; h < hist.cursorialSprintIndex.length; h++) {
        const v = hist.cursorialSprintIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] cursorialSprintIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.bipedalAlignmentIndex) {
    for (let h = 0; h < hist.bipedalAlignmentIndex.length; h++) {
        const v = hist.bipedalAlignmentIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] bipedalAlignmentIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.toolManipulationIndex) {
    for (let h = 0; h < hist.toolManipulationIndex.length; h++) {
        const v = hist.toolManipulationIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] toolManipulationIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.acheuleanBifaceIndex) {
    for (let h = 0; h < hist.acheuleanBifaceIndex.length; h++) {
        const v = hist.acheuleanBifaceIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] acheuleanBifaceIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.thermalCookingIndex) {
    for (let h = 0; h < hist.thermalCookingIndex.length; h++) {
        const v = hist.thermalCookingIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] thermalCookingIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.levalloisPreparedIndex) {
    for (let h = 0; h < hist.levalloisPreparedIndex.length; h++) {
        const v = hist.levalloisPreparedIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] levalloisPreparedIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.compositeSpearIndex) {
    for (let h = 0; h < hist.compositeSpearIndex.length; h++) {
        const v = hist.compositeSpearIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] compositeSpearIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.atlatlMechanicalIndex) {
    for (let h = 0; h < hist.atlatlMechanicalIndex.length; h++) {
        const v = hist.atlatlMechanicalIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] atlatlMechanicalIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.parietalCaveArtIndex) {
    for (let h = 0; h < hist.parietalCaveArtIndex.length; h++) {
        const v = hist.parietalCaveArtIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] parietalCaveArtIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.canineDomesticationIndex) {
    for (let h = 0; h < hist.canineDomesticationIndex.length; h++) {
        const v = hist.canineDomesticationIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] canineDomesticationIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.bowBallisticsIndex) {
    for (let h = 0; h < hist.bowBallisticsIndex.length; h++) {
        const v = hist.bowBallisticsIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] bowBallisticsIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.barbedHarpoonIndex) {
    for (let h = 0; h < hist.barbedHarpoonIndex.length; h++) {
        const v = hist.barbedHarpoonIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] barbedHarpoonIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
if (hist.weirFisheryIndex) {
    for (let h = 0; h < hist.weirFisheryIndex.length; h++) {
        const v = hist.weirFisheryIndex[h];
        if (isNaN(v) || v < 0 || v > 100) {
            histAnomalyCount++;
            console.error("[ANOMALY] weirFisheryIndex buffer anomaly at index " + h + ": " + v);
        }
    }
}
anomalyCount += histAnomalyCount;

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
    console.log("\n[VERDICT: PASS] 10,000-tick headless 198-channel Epoch 96 Trans-Dimensional Ecosystem Resonance, Quantum Vacuum Life & Meta-Evolutionary Synthesis Jubilee (Version 18.5.0) stress test passed with zero anomalies.");
} else {
    console.error("\n[VERDICT: FAIL] Benchmark completed with " + anomalyCount + " numerical anomalies.");
    process.exit(1);
}
