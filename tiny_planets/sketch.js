// --- Planet Variables ---
let planet; // Object holding planet properties
let planetTexture; // p5.Graphics object for the texture

// --- Data Structures ---
let suns = [];
let moons = [];
// ++ Background Elements ++
let stars = []; // Array to hold star data {x, y, z, baseBrightness, noiseOffset}
let backgroundObjects = []; // ++ Renamed from galaxies ++ Array to hold {type, texture, position, size, rotationY, rotationSpeed}

// --- Planet Types Enum ---
const PlanetType = {
    GAS_GIANT: 'Gas Giant',
    ROCKY: 'Rocky',
    OCEANIC: 'Oceanic',
    VOLCANIC: 'Volcanic',
    ICE: 'Ice'
};
const PLANET_TYPES = Object.values(PlanetType);

// --- Moon Types Enum ---
const MoonType = {
    ROCKY_CRATERED: 'Rocky Cratered',
    ICY: 'Icy',
    VOLCANIC_MOON: 'Volcanic Moon' // Rare type
};
const MOON_TYPES = Object.values(MoonType);

// --- Constants ---
// Texture Generation
const PLANET_TEXTURE_WIDTH = 1024;
const PLANET_TEXTURE_HEIGHT = 512;
const MOON_TEXTURE_WIDTH = 512;
const MOON_TEXTURE_HEIGHT = 256;
const BG_OBJECT_TEXTURE_WIDTH = 512; // ++ Renamed ++
const BG_OBJECT_TEXTURE_HEIGHT = 512; // ++ Renamed ++
// Noise Scales
const NOISE_SCALE_LOW = 0.008;
const NOISE_SCALE_MED = 0.03;
const NOISE_SCALE_HIGH = 0.1;
const ANTI_ALIAS_FACTOR = 1.5;

// Fractal Mountain Settings
const FRACTAL_OCTAVES = 5;
const FRACTAL_PERSISTENCE = 0.5;
const FRACTAL_LACUNARITY = 2.0;
const MOUNTAIN_NOISE_SCALE_BASE = 0.04;
const MOUNTAIN_INTENSITY_ROCKY = 0.8;
const MOUNTAIN_INTENSITY_VOLCANIC = 0.6;
const MOUNTAIN_INTENSITY_ICE = 0.4;
const SNOW_LINE_THRESHOLD = 0.6;

// Crater Settings (Planet)
const PLANET_CRATER_DENSITY = 0.000004;
const PLANET_MIN_CRATER_RADIUS = 8;
const PLANET_MAX_CRATER_RADIUS = 45;
const CRATER_RIM_BRIGHTNESS = 1.3;
const CRATER_SHADOW_DARKNESS = 0.6;
const CRATER_FLOOR_DARKNESS = 0.8;
const CRATER_SHAPE_IRREGULARITY = 0.4;
const CRATER_SHAPE_NOISE_SCALE = 0.5;
const CENTRAL_PEAK_PROBABILITY = 0.3;
const CENTRAL_PEAK_RADIUS_FACTOR = 0.15;
const CENTRAL_PEAK_HEIGHT_FACTOR = 1.2;
const MIN_CRATER_RADIUS_FOR_PEAK = 20;
const EJECTA_RADIUS_FACTOR = 1.8;
const EJECTA_INTENSITY = 0.15;
const EJECTA_NOISE_SCALE = 0.2;

// Crater Settings (Moon)
const MOON_CRATER_DENSITY = 0.00015;
const MOON_MIN_CRATER_RADIUS = 3;
const MOON_MAX_CRATER_RADIUS = 20;
const MOON_CRATER_INTENSITY = 0.9;
const MOON_CRATER_SHAPE_IRREGULARITY = 0.3;
const MOON_CRATER_SHAPE_NOISE_SCALE = 0.6;

// Aurora Settings
const AURORA_PROBABILITY = 0.5;
const AURORA_COLOR_1 = [50, 255, 100];
const AURORA_COLOR_2 = [200, 50, 255];
const AURORA_COLOR_3 = [80, 150, 255];
const AURORA_NOISE_SCALE_BASE = 0.02;
const AURORA_NOISE_SCALE_CURTAIN = 0.08;
const AURORA_NOISE_SCALE_DETAIL = 0.15;
const AURORA_NOISE_SCALE_PULSE = 0.015;
const AURORA_INTENSITY_FACTOR = 1.8;
const AURORA_PULSE_MIN_INTENSITY = 0.6;
const AURORA_PULSE_MAX_INTENSITY = 1.4;
const AURORA_CURTAIN_FREQUENCY = 15.0;
const AURORA_POLAR_FALLOFF_POWER = 4.0;

// Sun Generation
const MIN_SUN_DISTANCE = 5800;
const MAX_SUN_DISTANCE = 6500;
const MIN_SUN_RADIUS_FACTOR = 1.5;
const MAX_SUN_RADIUS_FACTOR = 3.0;
const NUMBER_OF_SUNS = 1;
const SUN_AXIAL_ROTATION_SPEED_MIN = 0.001;
const SUN_AXIAL_ROTATION_SPEED_MAX = 0.005;
const SUN_ORBIT_SPEED_BASE = 10.0;
const SUN_MAX_ORBIT_TILT = 0.15;

// Moon Generation
const NUMBER_OF_MOONS = 3;
const MIN_MOON_ORBIT_FACTOR = 1.8;
const MAX_MOON_ORBIT_FACTOR = 4.5;
const MIN_MOON_RADIUS_FACTOR = 0.08;
const MAX_MOON_RADIUS_FACTOR = 0.25;
const MOON_SPEED_BASE = 0.5;
const MAX_MOON_ORBIT_TILT = 0.4;
const MOON_ROTATION_SPEED_MIN = 0.005;
const MOON_ROTATION_SPEED_MAX = 0.02;
const MOON_MAX_TILT = 0.6;

// Planet Rotation/Size/Type
const PLANET_ROTATION_SPEED_MIN = 0.003;
const PLANET_ROTATION_SPEED_MAX = 0.008;
const PLANET_MAX_TILT = 0.4;
const PLANET_RADIUS_MIN = 80;
const PLANET_RADIUS_MAX = 150;
const GAS_GIANT_RADIUS_MIN = 180;
const GAS_GIANT_RADIUS_MAX = 250;

// ++ Star Field & Background Object Constants ++
const STAR_COUNT = 3000;
const STAR_FIELD_MIN_RADIUS = 8000;
const STAR_FIELD_MAX_RADIUS = 150000;
const STAR_MIN_BASE_BRIGHTNESS = 50;
const STAR_MAX_BASE_BRIGHTNESS = 200;
const STAR_VIBRATION_AMOUNT = 0.3;
const STAR_VIBRATION_SPEED = 0.01;
const STAR_POINT_SIZE = 1.5;

const BG_OBJECT_COUNT = 15;
const BG_OBJECT_MIN_DISTANCE = 160000;
const BG_OBJECT_MAX_DISTANCE = 280000;
const BG_OBJECT_MIN_SIZE = 5000;
const BG_OBJECT_MAX_SIZE = 30000;
const BG_OBJECT_MAX_ROTATION_SPEED = 0.001;

// ++ Background Object Types Enum ++
const BGObjectType = {
    SPIRAL: 'Spiral',
    ELLIPTICAL: 'Elliptical',
    NEBULA: 'Nebula'
};
const BG_OBJECT_TYPES = Object.values(BGObjectType);

// Noise scales specific to background objects
const BG_NOISE_SCALE_CORE = 0.01;
const BG_NOISE_SCALE_ARMS = 0.05;
const BG_NOISE_SCALE_SPIRAL_DETAIL = 0.2;
const BG_NOISE_SCALE_NEBULA_BASE = 0.015;
const BG_NOISE_SCALE_NEBULA_MID = 0.08;
const BG_NOISE_SCALE_NEBULA_DETAIL = 0.3;

const BG_BASE_FADE_POWER = 1.5;
const BG_EDGE_FADE_START = 0.75; // ++ Start fading alpha from 75% of the distance to the edge ++
const BG_EDGE_FADE_END = 0.98;   // ++ Fully faded alpha by 98% of the distance to the edge ++

// Palettes (will be defined in setup)
let bgObjectPalettes = {
    [BGObjectType.SPIRAL]: [],
    [BGObjectType.ELLIPTICAL]: [],
    [BGObjectType.NEBULA]: []
};


// Helper function for smooth interpolation
function smoothstep(edge0, edge1, x) {
    const t = constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

// =====================================================================
// == SETUP FUNCTION ==
// =====================================================================
function setup() {
    setAttributes('antialias', true);
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(RGB); // Ensure color mode is RGB

    // ++ Adjust Camera Far Plane ++
    let maxDist = BG_OBJECT_MAX_DISTANCE * 1.2;
    let camFOV = PI / 3.0;
    let camAspect = width / height;
    let camNear = 0.1;
    let camFar = maxDist * 2;
    perspective(camFOV, camAspect, camNear, camFar);

    noiseDetail(8, 0.5);

    // ++ Define Background Object Palettes ++
    defineBGObjectPalettes();

    // --- Planet Setup ---
    planet = {}; planet.type = random(PLANET_TYPES); planet.craters = []; planet.hasAurora = false;
    let canHaveAurora = (planet.type !== PlanetType.VOLCANIC); if (canHaveAurora && random() < AURORA_PROBABILITY) { planet.hasAurora = true; }
    if (planet.type === PlanetType.GAS_GIANT) { planet.radius = random(GAS_GIANT_RADIUS_MIN, GAS_GIANT_RADIUS_MAX); } else { planet.radius = random(PLANET_RADIUS_MIN, PLANET_RADIUS_MAX); }
    planet.rotationY = 0; planet.rotationSpeed = random(PLANET_ROTATION_SPEED_MIN, PLANET_ROTATION_SPEED_MAX); planet.tiltX = random(-PLANET_MAX_TILT, PLANET_MAX_TILT); planet.tiltZ = random(-PLANET_MAX_TILT, PLANET_MAX_TILT);

    // --- Generate Planet Craters ---
    if (planet.type === PlanetType.ROCKY || planet.type === PlanetType.VOLCANIC || planet.type === PlanetType.ICE) {
        let numCraters = floor(PLANET_TEXTURE_WIDTH * PLANET_TEXTURE_HEIGHT * PLANET_CRATER_DENSITY * random(0.5, 1.5));
        for (let i = 0; i < numCraters; i++) { let r = random(PLANET_MIN_CRATER_RADIUS, PLANET_MAX_CRATER_RADIUS); let peak = (r > MIN_CRATER_RADIUS_FOR_PEAK && random() < CENTRAL_PEAK_PROBABILITY); planet.craters.push({ x: random(PLANET_TEXTURE_WIDTH), y: random(PLANET_TEXTURE_HEIGHT), radius: r, hasPeak: peak, id: random(10000) }); }
        planet.craters.sort((a, b) => a.radius - b.radius);
    }

    // --- Generate Planet Texture ---
    planetTexture = createPlanetTexture(planet.type, planet.radius, planet.craters, planet.hasAurora);
    planet.color = color(128);
    console.log(`Planet Type: ${planet.type}, Radius: ${planet.radius.toFixed(2)}, Aurora: ${planet.hasAurora}, Rotation Speed: ${planet.rotationSpeed.toFixed(4)}`);

    // --- Define Sun(s) ---
    for (let i = 0; i < NUMBER_OF_SUNS; i++) { let sunOrbitRadius = random(MIN_SUN_DISTANCE, MAX_SUN_DISTANCE); let sunRadius = random(planet.radius * MIN_SUN_RADIUS_FACTOR, planet.radius * MAX_SUN_RADIUS_FACTOR); let sunColor = color(random(230, 255), random(180, 240), random(100, 200)); let sunOrbitAngle = random(TWO_PI); let sunOrbitSpeed = SUN_ORBIT_SPEED_BASE / sunOrbitRadius; let sunOrbitTiltX = random(-SUN_MAX_ORBIT_TILT, SUN_MAX_ORBIT_TILT); let sunOrbitTiltZ = random(-SUN_MAX_ORBIT_TILT, SUN_MAX_ORBIT_TILT); let sunAxialRotationY = 0; let sunAxialRotationSpeed = random(SUN_AXIAL_ROTATION_SPEED_MIN, SUN_AXIAL_ROTATION_SPEED_MAX); suns.push({ orbitRadius: sunOrbitRadius, orbitAngle: sunOrbitAngle, orbitSpeed: sunOrbitSpeed, orbitTiltX: sunOrbitTiltX, orbitTiltZ: sunOrbitTiltZ, axialRotationY: sunAxialRotationY, axialRotationSpeed: sunAxialRotationSpeed, size: sunRadius, color: sunColor }); }

    // --- Define Moon(s) ---
    for (let i = 0; i < NUMBER_OF_MOONS; i++) {
        let moonOrbitRadius = random(planet.radius * MIN_MOON_ORBIT_FACTOR, planet.radius * MAX_MOON_ORBIT_FACTOR);
        let moonOrbitSpeed = MOON_SPEED_BASE / moonOrbitRadius;
        let moonRadius = random(planet.radius * MIN_MOON_RADIUS_FACTOR, planet.radius * MAX_MOON_RADIUS_FACTOR);
        let moonOrbitAngle = random(TWO_PI);
        let moonOrbitTiltX = random(-MAX_MOON_ORBIT_TILT, MAX_MOON_ORBIT_TILT);
        let moonOrbitTiltZ = random(-MAX_MOON_ORBIT_TILT, MAX_MOON_ORBIT_TILT);
        let moonType = random(MOON_TYPES);
        let moonCraters = [];
        let moonTexture;
        let moonRotationY = 0;
        let moonRotationSpeed = random(MOON_ROTATION_SPEED_MIN, MOON_ROTATION_SPEED_MAX);
        let moonAxialTiltX = random(-MOON_MAX_TILT, MOON_MAX_TILT);
        let moonAxialTiltZ = random(-MOON_MAX_TILT, MOON_MAX_TILT);
        if (moonType === MoonType.ROCKY_CRATERED || moonType === MoonType.VOLCANIC_MOON) {
            let numMoonCraters = floor(MOON_TEXTURE_WIDTH * MOON_TEXTURE_HEIGHT * MOON_CRATER_DENSITY * random(0.3, 1.2));
            for (let j = 0; j < numMoonCraters; j++) { moonCraters.push({ x: random(MOON_TEXTURE_WIDTH), y: random(MOON_TEXTURE_HEIGHT), radius: random(MOON_MIN_CRATER_RADIUS, MOON_MAX_CRATER_RADIUS), id: random(10000) }); }
             moonCraters.sort((a, b) => a.radius - b.radius);
        }
        moonTexture = createMoonTexture(moonType, moonRadius, moonCraters);
        moons.push({ orbitRadius: moonOrbitRadius, orbitSpeed: moonOrbitSpeed, orbitAngle: moonOrbitAngle, orbitTiltX: moonOrbitTiltX, orbitTiltZ: moonOrbitTiltZ, radius: moonRadius, type: moonType, texture: moonTexture, rotationY: moonRotationY, rotationSpeed: moonRotationSpeed, axialTiltX: moonAxialTiltX, axialTiltZ: moonAxialTiltZ, color: color(150) });
        console.log(`Generated Moon ${i+1}: Type=${moonType}, Radius=${moonRadius.toFixed(2)}`);
    }

    // ++ Setup Stars ++
    setupStars();

    // ++ Setup Background Objects ++
    setupBackgroundObjects();

} // === END SETUP ===

// =====================================================================
// == PLANET TEXTURE GENERATION FUNCTION ==
// =====================================================================
// [ No changes needed here ]
function createPlanetTexture(type, radius, craters, hasAurora) {
    let pg = createGraphics(PLANET_TEXTURE_WIDTH, PLANET_TEXTURE_HEIGHT); pg.pixelDensity(1); pg.loadPixels();
    let baseSeed = random(10000); let mountainSeed = random(10000, 20000); let craterSeed = random(20000, 30000); let auroraSeed = random(30000, 40000); let lightAngle = -PI / 4;
    let auroraC1 = color(AURORA_COLOR_1[0], AURORA_COLOR_1[1], AURORA_COLOR_1[2]); let auroraC2 = color(AURORA_COLOR_2[0], AURORA_COLOR_2[1], AURORA_COLOR_2[2]); let auroraC3 = color(AURORA_COLOR_3[0], AURORA_COLOR_3[1], AURORA_COLOR_3[2]);
    for (let y = 0; y < pg.height; y++) { for (let x = 0; x < pg.width; x++) {
        let index = (x + y * pg.width) * 4; let nx = x / pg.width; let ny = y / pg.height; let r, g, b; let baseTerrainColor;
        let angle = map(nx, 0, 1, -PI, PI); let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI); let baseNX = (1 + cos(vAngle) * cos(angle)) * radius; let baseNY = (1 + cos(vAngle) * sin(angle)) * radius; let baseNZ = (1 + sin(vAngle)) * radius;
        let noiseVal = noise(baseNX * NOISE_SCALE_LOW + baseSeed, baseNY * NOISE_SCALE_LOW + baseSeed, baseNZ * NOISE_SCALE_LOW + baseSeed); let noiseMed = noise(baseNX * NOISE_SCALE_MED + baseSeed + 10, baseNY * NOISE_SCALE_MED + baseSeed + 10, baseNZ * NOISE_SCALE_MED + baseSeed + 10); let noiseHigh = noise(baseNX * NOISE_SCALE_HIGH + baseSeed + 20, baseNY * NOISE_SCALE_HIGH + baseSeed + 20, baseNZ * NOISE_SCALE_HIGH + baseSeed + 20);
        let mountainHeight = 0; let mountainIntensity = 0;
        if (type === PlanetType.ROCKY || type === PlanetType.VOLCANIC || type === PlanetType.ICE) { let freq = MOUNTAIN_NOISE_SCALE_BASE; let amp = 1.0; for (let i = 0; i < FRACTAL_OCTAVES; i++) { mountainHeight += noise(baseNX * freq + mountainSeed + i * 10, baseNY * freq + mountainSeed + i * 10, baseNZ * freq + mountainSeed + i * 10) * amp; freq *= FRACTAL_LACUNARITY; amp *= FRACTAL_PERSISTENCE; } mountainHeight = mountainHeight * (1.0 - FRACTAL_PERSISTENCE) / (1.0 - pow(FRACTAL_PERSISTENCE, FRACTAL_OCTAVES)); mountainHeight = constrain(mountainHeight, 0, 1); if(type === PlanetType.ROCKY) mountainIntensity = MOUNTAIN_INTENSITY_ROCKY; else if (type === PlanetType.VOLCANIC) mountainIntensity = MOUNTAIN_INTENSITY_VOLCANIC; else if (type === PlanetType.ICE) mountainIntensity = MOUNTAIN_INTENSITY_ICE; }
        let c; /* Base color switch */ switch (type) { case PlanetType.GAS_GIANT: { let baseCol1 = color(210, 180, 140); let baseCol2 = color(139, 69, 19); let swirlCol = color(255, 228, 196); let band = sin(ny * PI * 10 + noiseMed * 2); let mixFactor = (noiseVal + band * 0.3) / 1.3; c = lerpColor(baseCol1, baseCol2, constrain(mixFactor, 0, 1)); c = lerpColor(c, swirlCol, constrain(noiseHigh * 1.5 - 0.5, 0, 0.4)); break; } case PlanetType.ROCKY: { let snowColor = color(235, 240, 245); let landHigh = color(160, 150, 140); let landMid = color(110, 100, 90); let landLow = color(70, 65, 60); let waterDeep = color(40, 60, 80); let waterShallow = color(60, 90, 110); let waterThreshold = 0.45 - mountainHeight * 0.1; if (noiseVal < waterThreshold) { let waterMix = constrain(noiseVal / waterThreshold, 0, 1); c = lerpColor(waterDeep, waterShallow, waterMix); c = lerpColor(c, color(red(c) * 0.9, green(c) * 0.95, blue(c) * 1.1), constrain(noiseHigh - 0.5, 0, 0.2)); } else { let elevationFactor = constrain((noiseVal - waterThreshold) / (1.0 - waterThreshold), 0, 1); c = lerpColor(landLow, landMid, elevationFactor); let mountainFactor = constrain(mountainHeight * 2.0 - 0.5, 0, 1); let peakMix = constrain(mountainFactor * mountainIntensity, 0, 1); let shadowMix = constrain((1.0 - mountainHeight) * 1.5 - 0.5, 0, 1) * mountainIntensity * 0.5; c = lerpColor(c, landHigh, peakMix); c = lerpColor(c, landLow, shadowMix); if (mountainHeight > SNOW_LINE_THRESHOLD) { let snowMix = constrain((mountainHeight - SNOW_LINE_THRESHOLD) / (1.0 - SNOW_LINE_THRESHOLD), 0, 1); c = lerpColor(c, snowColor, snowMix * 0.8); } c = lerpColor(c, color(red(c) * 1.1, green(c) * 1.05, blue(c) * 0.95), constrain(noiseHigh - 0.6, 0, 0.2)); } break; } case PlanetType.OCEANIC: { let oceanDeep = color(20, 40, 100); let oceanShallow = color(50, 100, 180); let islandHigh = color(100, 140, 80); let islandLow = color(180, 160, 120); let islandThreshold = 0.65; if (noiseVal > islandThreshold) { let islandMix = constrain((noiseVal - islandThreshold) / (1.0 - islandThreshold), 0, 1); c = lerpColor(islandLow, islandHigh, islandMix); c = lerpColor(c, color(red(c) * 1.1, green(c) * 0.9, blue(c)), constrain(noiseHigh * 1.2 - 0.7, 0, 0.2)); } else { let waterMix = constrain(noiseVal / islandThreshold, 0, 1); c = lerpColor(oceanDeep, oceanShallow, waterMix); c = lerpColor(c, oceanShallow, constrain(noiseMed * 0.3, 0, 1)); c = lerpColor(c, color(red(c) * 1.1, green(c) * 1.1, blue(c) * 1.2), constrain(noiseHigh * 1.5 - 0.9, 0, 0.15)); } break; } case PlanetType.VOLCANIC: { let rockDark = color(30, 20, 20); let rockMid = color(70, 60, 60); let rockHigh = color(100, 90, 90); let lavaBright = color(255, 100, 0); let lavaMid = color(200, 40, 0); let lavaThreshold = 0.6 - mountainHeight * 0.2; let rockMix = constrain(noiseVal * 1.2, 0, 1); c = lerpColor(rockDark, rockMid, rockMix); let mountainFactor = constrain(mountainHeight * 1.8 - 0.4, 0, 1); let peakMix = constrain(mountainFactor * mountainIntensity, 0, 1); let shadowMix = constrain((1.0 - mountainHeight) * 1.5 - 0.5, 0, 1) * mountainIntensity * 0.5; c = lerpColor(c, rockHigh, peakMix); c = lerpColor(c, rockDark, shadowMix); if (noiseMed > lavaThreshold) { let lavaFlowMix = constrain((noiseMed - lavaThreshold) / (1.0 - lavaThreshold), 0, 1); let lavaBase = lerpColor(lavaMid, lavaBright, lavaFlowMix); lavaBase = lerpColor(lavaBase, color(255, 200, 50), constrain(noiseHigh * 2.0 - 1.0, 0, 1)); c = lerpColor(c, lavaBase, constrain(lavaFlowMix * 0.8 + 0.2, 0, 1)); } c = lerpColor(c, color(red(c) * 1.05, green(c) * 0.95, blue(c) * 0.9), constrain(noiseHigh - 0.6, 0, 0.1)); break; } case PlanetType.ICE: { let iceBase = color(200, 220, 255); let iceShadow = color(150, 180, 230); let iceHighlight = color(240, 245, 255); let crackColor = color(100, 120, 160); let crackThreshold = 0.6; let iceMix = constrain(noiseVal * 1.1, 0, 1); c = lerpColor(iceShadow, iceBase, iceMix); let ridgeFactor = constrain(mountainHeight * 1.5 - 0.3, 0, 1); let ridgePeakMix = constrain(ridgeFactor * mountainIntensity, 0, 1); let ridgeShadowMix = constrain((1.0 - mountainHeight) * 1.0 - 0.3, 0, 1) * mountainIntensity * 0.3; c = lerpColor(c, iceHighlight, ridgePeakMix); c = lerpColor(c, iceShadow, ridgeShadowMix); if (noiseMed > crackThreshold) { let crackMix = constrain((noiseMed - crackThreshold) / (1 - crackThreshold), 0, 1); c = lerpColor(c, crackColor, constrain(crackMix * 0.7, 0, 1)); } c = lerpColor(c, iceHighlight, constrain(noiseHigh * 1.5 - 0.5, 0, 0.3)); break; } default: c = color(noiseVal * 255); break; }
        baseTerrainColor = c ? c : color(128); let finalPixelColor = baseTerrainColor;
        if (craters && craters.length > 0 && (type === PlanetType.ROCKY || type === PlanetType.VOLCANIC || type === PlanetType.ICE)) { /* Planet Craters */ for (let i = craters.length - 1; i >= 0; i--) { let crater = craters[i]; let dx = x - crater.x; let dy = y - crater.y; if (abs(dx) > pg.width / 2) { dx = (dx > 0 ? dx - pg.width : dx + pg.width); } let dist = sqrt(dx * dx + dy * dy); let angleToPixel = atan2(dy, dx); let shapeNoiseVal = noise(cos(angleToPixel) * CRATER_SHAPE_NOISE_SCALE + crater.id, sin(angleToPixel) * CRATER_SHAPE_NOISE_SCALE + crater.id); let effectiveRadius = crater.radius * (1 + (shapeNoiseVal - 0.5) * CRATER_SHAPE_IRREGULARITY); const AA_HALF_WIDTH = ANTI_ALIAS_FACTOR / 2.0; let craterEdgeOuter = effectiveRadius + AA_HALF_WIDTH; let craterEdgeInner = effectiveRadius - AA_HALF_WIDTH; let ejectaMaxRadius = effectiveRadius * EJECTA_RADIUS_FACTOR; let ejectaEdgeOuter = ejectaMaxRadius + AA_HALF_WIDTH; let ejectaEdgeInner = ejectaMaxRadius - AA_HALF_WIDTH; let modifiedColor = finalPixelColor; let isInsideCraterBoundary = (dist < effectiveRadius); let isInsideEjectaBoundary = (dist < ejectaMaxRadius); if (isInsideEjectaBoundary) { if (isInsideCraterBoundary) { let currentCraterColor = finalPixelColor; let angleDiff = atan2(sin(angleToPixel - lightAngle), cos(angleToPixel - lightAngle)); let rimWidth = effectiveRadius * 0.2; let isRim = (dist > effectiveRadius - rimWidth); let floorFactor = constrain(dist / (effectiveRadius - rimWidth), 0, 1); let peakEffect = 0; if (crater.hasPeak) { let peakRadius = effectiveRadius * CENTRAL_PEAK_RADIUS_FACTOR; if (dist < peakRadius) { let peakFactor = 1.0 - dist / peakRadius; let peakNoise = noise(dx * 0.1 + crater.id + 20, dy * 0.1 + crater.id + 20); peakEffect = peakFactor * (peakNoise - 0.5) * CENTRAL_PEAK_HEIGHT_FACTOR * 2; } } let brightnessFactor = 1.0; let darknessFactor = 1.0; if (isRim) { brightnessFactor *= lerp(1.0, CRATER_RIM_BRIGHTNESS, constrain(cos(angleDiff) * 0.6 + 0.4, 0.1, 1.0)); darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * 0.8, constrain(cos(angleDiff + PI) * 0.6 + 0.4, 0.1, 1.0)); } else { darknessFactor *= lerp(CRATER_FLOOR_DARKNESS, 1.0, floorFactor); darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS, constrain(cos(angleDiff + PI) * 0.5 + 0.5, 0.1, 1.0)); } if (peakEffect > 0) brightnessFactor *= (1.0 + peakEffect); else darknessFactor *= (1.0 - peakEffect); modifiedColor = color(red(currentCraterColor) * brightnessFactor * darknessFactor, green(currentCraterColor) * brightnessFactor * darknessFactor, blue(currentCraterColor) * brightnessFactor * darknessFactor); let blendNoise = noise(x * 0.1 + crater.id + 30, y * 0.1 + crater.id + 30); modifiedColor = lerpColor(modifiedColor, currentCraterColor, constrain(blendNoise * 0.3 - 0.1, 0, 0.2)); } else { let ejectaFactor = 1.0 - constrain((dist - effectiveRadius) / (ejectaMaxRadius - effectiveRadius), 0, 1); let ejectaNoise = noise(dx * EJECTA_NOISE_SCALE + crater.id + 10, dy * EJECTA_NOISE_SCALE + crater.id + 10); let ejectaColorMod = lerp(1.0, 1.2, ejectaNoise * ejectaFactor * EJECTA_INTENSITY); let ejectaShadowMod = lerp(1.0, 0.9, (1.0-ejectaNoise) * ejectaFactor * EJECTA_INTENSITY); let ejectaBaseColor = finalPixelColor; modifiedColor = color(red(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod, green(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod, blue(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod); modifiedColor = lerpColor(ejectaBaseColor, modifiedColor, constrain(ejectaFactor * EJECTA_INTENSITY * 2.0, 0, 0.8)); } } let craterAAFactor = 1.0; let ejectaAAFactor = 1.0; if (dist > ejectaEdgeInner && dist < ejectaEdgeOuter) { ejectaAAFactor = smoothstep(ejectaEdgeOuter, ejectaEdgeInner, dist); } else if (dist >= ejectaEdgeOuter) { ejectaAAFactor = 0.0; } if (dist > craterEdgeInner && dist < craterEdgeOuter) { craterAAFactor = smoothstep(craterEdgeOuter, craterEdgeInner, dist); finalPixelColor = lerpColor(finalPixelColor, modifiedColor, craterAAFactor * ejectaAAFactor); } else if (dist < craterEdgeInner) { finalPixelColor = modifiedColor; } else { finalPixelColor = lerpColor(finalPixelColor, modifiedColor, ejectaAAFactor); } } }
        if (hasAurora) { /* Aurora logic */ let polarDist = abs(ny - 0.5) * 2.0; let polarFactor = pow(polarDist, AURORA_POLAR_FALLOFF_POWER); if (polarFactor > 0.01) { let timeSlice = auroraSeed / 1000.0 + frameCount * 0.0005; /* Added time */ let auroraNX1 = nx * AURORA_NOISE_SCALE_BASE * 5; let auroraNY1 = ny * AURORA_NOISE_SCALE_BASE * 2; let auroraBaseNoise = noise(auroraNX1, auroraNY1, timeSlice); let curtainNoiseVal = noise(nx * AURORA_NOISE_SCALE_CURTAIN, ny * AURORA_NOISE_SCALE_CURTAIN * 3, timeSlice + 10.0); let curtainEffect = sin(ny * PI * AURORA_CURTAIN_FREQUENCY + curtainNoiseVal * PI * 2.0); curtainEffect = (curtainEffect * 0.5 + 0.5); let auroraNX3 = nx * AURORA_NOISE_SCALE_DETAIL * 5; let auroraNY3 = ny * AURORA_NOISE_SCALE_DETAIL * 2; let auroraDetailNoise = noise(auroraNX3, auroraNY3, timeSlice + 20.0); let pulseNoiseScale = AURORA_NOISE_SCALE_PULSE; let pulseNoise = noise(nx * pulseNoiseScale * 3, ny * pulseNoiseScale, timeSlice + 30.0); let pulseFactor = map(pulseNoise, 0, 1, AURORA_PULSE_MIN_INTENSITY, AURORA_PULSE_MAX_INTENSITY); let auroraVisibility = constrain(auroraBaseNoise * 1.2 - 0.2, 0, 1) * constrain(curtainEffect * 1.5 - 0.3, 0, 1) * polarFactor * pulseFactor * AURORA_INTENSITY_FACTOR; auroraVisibility = constrain(auroraVisibility, 0, 1); if (auroraVisibility > 0.05) { let colorNoise = auroraDetailNoise; let auroraColor; if (colorNoise < 0.4) { auroraColor = lerpColor(auroraC1, auroraC3, constrain(colorNoise / 0.4, 0, 1)); } else if (colorNoise < 0.7) { auroraColor = lerpColor(auroraC3, auroraC2, constrain((colorNoise - 0.4) / 0.3, 0, 1)); } else { auroraColor = lerpColor(auroraC2, auroraC1, constrain((colorNoise - 0.7) / 0.3, 0, 1)); } finalPixelColor = lerpColor(finalPixelColor, auroraColor, auroraVisibility); } } }
        if (finalPixelColor) { r = red(finalPixelColor); g = green(finalPixelColor); b = blue(finalPixelColor); } else { r = 255; g = 0; b = 255; } pg.pixels[index + 0] = constrain(r, 0, 255); pg.pixels[index + 1] = constrain(g, 0, 255); pg.pixels[index + 2] = constrain(b, 0, 255); pg.pixels[index + 3] = 255;
    } }
    pg.updatePixels(); return pg;
}

// =====================================================================
// == MOON TEXTURE GENERATION FUNCTION ==
// =====================================================================
// [ No changes needed here ]
function createMoonTexture(moonType, moonRadius, craters) {
    let pg = createGraphics(MOON_TEXTURE_WIDTH, MOON_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.loadPixels();
    let baseSeed = random(50000, 60000);
    let craterSeed = random(60000, 70000);
    let lightAngle = -PI / 4;
    const MOON_NOISE_SCALE_LOW = NOISE_SCALE_LOW * 1.5;
    const MOON_NOISE_SCALE_MED = NOISE_SCALE_MED * 1.5;
    const MOON_NOISE_SCALE_HIGH = NOISE_SCALE_HIGH * 1.5;

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let nx = x / pg.width; let ny = y / pg.height;
            let r, g, b; let c;
            let angle = map(nx, 0, 1, -PI, PI); let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI);
            let nCoordX = (1 + cos(vAngle) * cos(angle)) * moonRadius;
            let nCoordY = (1 + cos(vAngle) * sin(angle)) * moonRadius;
            let nCoordZ = (1 + sin(vAngle)) * moonRadius;
            let noiseVal = noise(nCoordX * MOON_NOISE_SCALE_LOW + baseSeed, nCoordY * MOON_NOISE_SCALE_LOW + baseSeed, nCoordZ * MOON_NOISE_SCALE_LOW + baseSeed);
            let noiseMed = noise(nCoordX * MOON_NOISE_SCALE_MED + baseSeed + 10, nCoordY * MOON_NOISE_SCALE_MED + baseSeed + 10, nCoordZ * MOON_NOISE_SCALE_MED + baseSeed + 10);
            let noiseHigh = noise(nCoordX * MOON_NOISE_SCALE_HIGH + baseSeed + 20, nCoordY * MOON_NOISE_SCALE_HIGH + baseSeed + 20, nCoordZ * MOON_NOISE_SCALE_HIGH + baseSeed + 20);

            switch (moonType) {
                case MoonType.ROCKY_CRATERED:
                    let rockCol1 = color(160, 155, 150); let rockCol2 = color(80, 80, 80); let rockDetailCol = color(110, 105, 100);
                    c = lerpColor(rockCol2, rockCol1, noiseVal);
                    c = lerpColor(c, rockDetailCol, constrain(noiseMed * 1.5 - 0.5, 0, 0.4));
                    let grainAmt = constrain(noiseHigh * 0.5 - 0.1, 0, 0.1);
                    c = lerpColor(c, color(red(c)*0.9, green(c)*0.9, blue(c)*0.9), grainAmt);
                    c = lerpColor(c, color(red(c)*1.1, green(c)*1.1, blue(c)*1.1), grainAmt * 0.5);
                    break;
                case MoonType.ICY:
                    let iceCol1 = color(235, 240, 245); let iceCol2 = color(170, 185, 205); let crackCol = color(130, 145, 165); let streakCol = color(210, 215, 225);
                    c = lerpColor(iceCol2, iceCol1, noiseVal);
                    let streakNoise = noise(nCoordX * MOON_NOISE_SCALE_MED * 3 + baseSeed + 30, nCoordY * MOON_NOISE_SCALE_MED * 0.5 + baseSeed + 30);
                    c = lerpColor(c, streakCol, constrain(streakNoise * 1.5 - 0.6, 0, 0.3));
                    if (noiseHigh > 0.6) { let crackMix = constrain((noiseHigh - 0.6) / 0.4, 0, 1); c = lerpColor(c, crackCol, crackMix * 0.4 * (noiseMed*0.5+0.5)); }
                     c = lerpColor(c, iceCol1, constrain(noiseMed - 0.6, 0, 0.1));
                    break;
                case MoonType.VOLCANIC_MOON:
                    let volcCol1 = color(50, 40, 40); let volcCol2 = color(90, 80, 75); let lavaColBright = color(255, 90, 10); let lavaColDim = color(180, 40, 5); let sulfurCol = color(240, 220, 80);
                    c = lerpColor(volcCol1, volcCol2, noiseVal * 1.2);
                     let sulfurAmt = constrain(noiseMed * 2.0 - 1.0, 0, 0.3);
                     c = lerpColor(c, sulfurCol, sulfurAmt);
                    if (noiseHigh > 0.65) { let lavaMix = constrain((noiseHigh - 0.65) / 0.35, 0, 1); let currentLavaCol = lerpColor(lavaColDim, lavaColBright, noiseVal); c = lerpColor(c, currentLavaCol, lavaMix * 0.7); }
                    break;
                default: c = color(128);
            }
            let baseMoonColor = c ? c : color(128); let finalPixelColor = baseMoonColor;

            if (craters && craters.length > 0 && (moonType === MoonType.ROCKY_CRATERED || moonType === MoonType.VOLCANIC_MOON)) {
                 for (let i = craters.length - 1; i >= 0; i--) {
                    let crater = craters[i]; let dx = x - crater.x; let dy = y - crater.y;
                    if (abs(dx) > pg.width / 2) { dx = (dx > 0 ? dx - pg.width : dx + pg.width); } if (abs(dy) > pg.height / 2) { dy = (dy > 0 ? dy - pg.height : dy + pg.height); }
                    let dist = sqrt(dx * dx + dy * dy);
                    let shapeNoiseVal = noise(dx * MOON_CRATER_SHAPE_NOISE_SCALE, dy * MOON_CRATER_SHAPE_NOISE_SCALE, crater.id);
                    let effectiveRadius = crater.radius * (1 + (shapeNoiseVal - 0.5) * MOON_CRATER_SHAPE_IRREGULARITY);
                    const AA_HALF_WIDTH = ANTI_ALIAS_FACTOR / 2.0;
                    let craterEdgeOuter = effectiveRadius + AA_HALF_WIDTH; let craterEdgeInner = effectiveRadius - AA_HALF_WIDTH;
                    if (dist < craterEdgeOuter) {
                        let modifiedColor = finalPixelColor;
                        if (dist < effectiveRadius) {
                             let currentCraterColor = finalPixelColor; let angleToPixel = atan2(dy, dx); let angleDiff = atan2(sin(angleToPixel - lightAngle), cos(angleToPixel - lightAngle)); let rimWidth = effectiveRadius * 0.15; let isRim = (dist > effectiveRadius - rimWidth); let brightnessFactor = 1.0; let darknessFactor = 1.0;
                             if(isRim) { brightnessFactor *= lerp(1.0, CRATER_RIM_BRIGHTNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff) * 0.6 + 0.4, 0.1, 1.0)); darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff+PI) * 0.6 + 0.4, 0.1, 1.0)); }
                             else { let floorFactor = constrain(dist / (effectiveRadius - rimWidth), 0, 1); darknessFactor *= lerp(CRATER_FLOOR_DARKNESS, 1.0, floorFactor) * MOON_CRATER_INTENSITY; darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff + PI) * 0.5 + 0.5, 0.1, 1.0)); }
                             modifiedColor = color(red(currentCraterColor)*brightnessFactor*darknessFactor, green(currentCraterColor)*brightnessFactor*darknessFactor, blue(currentCraterColor)*brightnessFactor*darknessFactor);
                             let blendNoise = noise(x * 0.2 + crater.id + 50, y * 0.2 + crater.id + 50);
                             modifiedColor = lerpColor(modifiedColor, currentCraterColor, constrain(blendNoise * 0.2 - 0.05, 0, 0.1));
                        }
                        if (dist > craterEdgeInner) { let aaFactor = smoothstep(craterEdgeOuter, craterEdgeInner, dist); finalPixelColor = lerpColor(finalPixelColor, modifiedColor, aaFactor); }
                        else { finalPixelColor = modifiedColor; }
                    }
                 }
            }
            if (finalPixelColor) { r = red(finalPixelColor); g = green(finalPixelColor); b = blue(finalPixelColor); }
            else { console.error("Moon Color undefined", x, y); r = 255; g = 0; b = 255; }
            pg.pixels[index + 0] = constrain(r, 0, 255); pg.pixels[index + 1] = constrain(g, 0, 255); pg.pixels[index + 2] = constrain(b, 0, 255); pg.pixels[index + 3] = 255;
        }
    }
    pg.updatePixels(); return pg;
}

// ==============================================================
// == ++ DEFINE BACKGROUND OBJECT PALETTES FUNCTION ++ ==
// ==============================================================
function defineBGObjectPalettes() {
    // --- Spiral Palettes ---
    bgObjectPalettes[BGObjectType.SPIRAL] = [
        { core: color(220, 220, 255), arm1: color(100, 120, 200, 200), arm2: color(180, 160, 220, 150), dust: color(40, 40, 60, 100) }, // Classic Blue/Purple
        { core: color(255, 230, 180), arm1: color(150, 150, 180, 180), arm2: color(200, 180, 160, 140), dust: color(50, 45, 40, 110) }, // Golden Core
        { core: color(245, 245, 245), arm1: color(180, 180, 190, 170), arm2: color(210, 210, 220, 140), dust: color(70, 70, 70, 90) }  // Whiter/Subtle
    ];

    // --- Elliptical Palettes --- (Tend towards older, yellower/redder stars)
    bgObjectPalettes[BGObjectType.ELLIPTICAL] = [
        { core: color(255, 220, 160), mid: color(200, 180, 140, 150), outer: color(150, 130, 100, 80) }, // Yellow/Orange dominant
        { core: color(240, 240, 220), mid: color(210, 210, 180, 160), outer: color(170, 170, 150, 90) }, // Creamy White dominant
        { core: color(255, 190, 170), mid: color(210, 150, 140, 140), outer: color(160, 110, 100, 70) }  // Reddish dominant
    ];

    // --- Nebula Palettes --- (Emission = Red/Pink, Reflection = Blue, Mixed)
    bgObjectPalettes[BGObjectType.NEBULA] = [
        { primary: color(230, 60, 90, 180), secondary: color(180, 40, 60, 120), highlight: color(255, 150, 170, 50), dust: color(30, 20, 25, 150) }, // Emission Nebula (H-alpha)
        { primary: color(80, 150, 240, 170), secondary: color(50, 100, 190, 130), highlight: color(180, 210, 255, 60), dust: color(40, 40, 50, 140) }, // Reflection Nebula (Blue)
        { primary: color(100, 200, 180, 160), secondary: color(60, 150, 130, 110), highlight: color(180, 240, 220, 40), dust: color(35, 45, 40, 130) }, // Greenish Nebula (Oxygen?)
        { primary: color(180, 90, 220, 175), secondary: color(140, 60, 180, 125), highlight: color(220, 160, 255, 55), dust: color(40, 30, 45, 145) }  // Purple/Mixed Nebula
    ];

    console.log("Defined background object palettes.");
}


// ==============================================================
// == BACKGROUND OBJECT TEXTURE GENERATION FUNCTION ==
// ==============================================================
// ++ Modified heavily for different types ++
function createBGObjectTexture(type, palette, params = {}) {
    let pg = createGraphics(BG_OBJECT_TEXTURE_WIDTH, BG_OBJECT_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.background(0, 0); // Start transparent black
    pg.loadPixels();
    let seed = random(80000, 100000); // Increased range
    let centerX = pg.width / 2;
    let centerY = pg.height / 2;
    let maxDistRadius = min(centerX, centerY); // Use radius for circular fade

    // --- Shared Noise Calculation ---
    noiseDetail(params.noiseOctaves || 6, params.noisePersistence || 0.55);

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let dx = x - centerX; let dy = y - centerY;
            let distFromCenter = sqrt(dx * dx + dy * dy);
            let angle = atan2(dy, dx);
            // ++ Normalize distance based on radius for circular fade ++
            let normDist = distFromCenter / maxDistRadius; // 0 at center, 1 at edge radius

            let finalColor = color(0, 0);
            let contentAlpha = 0; // Alpha based on object content

            // === TYPE-SPECIFIC LOGIC ===
            if (type === BGObjectType.SPIRAL) {
                // --- Spiral Galaxy Logic (mostly same as before) ---
                let coreFocusFactor = params.coreFocusFactor || random(0.8, 2.0);
                let coreFadePower = (BG_BASE_FADE_POWER / coreFocusFactor) * 1.1;
                let armFadePower = BG_BASE_FADE_POWER * 1.2;
                let armTightness = params.armTightness || random(1.5, 4.0);
                let armDefinition = params.armDefinition || random(1.8, 3.5);

                let coreNoiseVal = noise((dx * BG_NOISE_SCALE_CORE) + seed, (dy * BG_NOISE_SCALE_CORE) + seed + 5);
                let armNoiseCoordX = cos(angle + normDist * armTightness) * normDist * 5 + normDist * 2;
                let armNoiseCoordY = sin(angle + normDist * armTightness) * normDist * 5 + normDist * 2;
                let armNoiseVal = noise((armNoiseCoordX * BG_NOISE_SCALE_ARMS) + seed + 10, (armNoiseCoordY * BG_NOISE_SCALE_ARMS) + seed + 10);
                let detailNoiseVal = noise((dx * BG_NOISE_SCALE_SPIRAL_DETAIL) + seed + 30, (dy * BG_NOISE_SCALE_SPIRAL_DETAIL) + seed + 30);

                let coreRadialBrightness = pow(max(0, 1.0 - normDist), coreFadePower); // Use max(0,...)
                let coreMix = constrain(coreNoiseVal * 1.6 * coreFocusFactor - 0.4, 0, 1) * coreRadialBrightness;
                finalColor = lerpColor(finalColor, palette.core, coreMix);

                let armRadialBrightness = pow(max(0, 1.0 - normDist), armFadePower);
                let armMixBase = pow(armNoiseVal, armDefinition) * 1.5;
                let armMix = constrain(armMixBase - 0.1, 0, 1) * armRadialBrightness * (1.0 - coreMix * 0.6);
                let armLerp = constrain(detailNoiseVal, 0.1, 0.9);
                let currentArmColor = lerpColor(palette.arm1, palette.arm2, armLerp);
                finalColor = lerpColor(finalColor, currentArmColor, armMix * 0.8);

                let dustMix = constrain((1.0 - armNoiseVal) * detailNoiseVal * 1.8 - 0.6, 0, 1);
                dustMix *= armRadialBrightness * (1.0 - coreMix);
                finalColor = lerpColor(finalColor, palette.dust, dustMix * 0.6);

                contentAlpha = alpha(finalColor); // Get alpha from color mixing

            } else if (type === BGObjectType.ELLIPTICAL) {
                 // --- Elliptical Galaxy Logic (mostly same as before) ---
                let coreFocusFactor = params.coreFocusFactor || random(1.5, 3.5);
                let coreFadePower = BG_BASE_FADE_POWER / coreFocusFactor;

                let coreNoiseVal = noise((dx * BG_NOISE_SCALE_CORE * 0.8) + seed, (dy * BG_NOISE_SCALE_CORE * 0.8) + seed + 5);
                let detailNoiseVal = noise((dx * BG_NOISE_SCALE_SPIRAL_DETAIL * 0.5) + seed + 30, (dy * BG_NOISE_SCALE_SPIRAL_DETAIL * 0.5) + seed + 30);

                let radialBrightness = pow(max(0, 1.0 - normDist), coreFadePower);
                let coreMix = constrain(coreNoiseVal * 1.2 * coreFocusFactor - 0.1, 0, 1) * radialBrightness;
                let midMix = constrain(detailNoiseVal * 1.5 - 0.5, 0, 1) * pow(max(0, 1.0 - normDist), coreFadePower * 0.6) * (1.0 - coreMix * 0.8);
                let outerMix = pow(max(0, 1.0 - normDist), coreFadePower * 0.4) * (1.0 - coreMix * 0.9 - midMix * 0.5);

                finalColor = lerpColor(finalColor, palette.core, coreMix);
                finalColor = lerpColor(finalColor, palette.mid, midMix);
                finalColor = lerpColor(finalColor, palette.outer, constrain(outerMix, 0, 1));

                contentAlpha = alpha(finalColor) || 150; // Get alpha from color mixing, default if dark

            } else if (type === BGObjectType.NEBULA) {
                // --- Nebula Logic (mostly same as before) ---
                let density = params.density || random(0.6, 1.3);
                let clumpiness = params.clumpiness || random(1.0, 3.0);
                let filamentFactor = params.filamentFactor || random(0.1, 0.6); // Currently not explicitly used, but affects noise scales implicitly

                let baseNoise = noise(dx * BG_NOISE_SCALE_NEBULA_BASE + seed, dy * BG_NOISE_SCALE_NEBULA_BASE + seed + 5);
                let midNoise = noise(dx * BG_NOISE_SCALE_NEBULA_MID + seed + 10, dy * BG_NOISE_SCALE_NEBULA_MID + seed + 15);
                let detailNoise = noise(dx * BG_NOISE_SCALE_NEBULA_DETAIL + seed + 20, dy * BG_NOISE_SCALE_NEBULA_DETAIL + seed + 25);

                let structure = (baseNoise * 0.6 + midNoise * 0.4) * density;
                structure = pow(structure, clumpiness);

                let colorMixNoise = midNoise * 0.7 + detailNoise * 0.3;
                let primaryMix = constrain(structure * 1.5 - 0.2, 0, 1);
                let secondaryMix = constrain(structure * (1.0 - midNoise) * 1.2 - 0.4, 0, 1) * (1.0 - primaryMix * 0.5);
                let highlightMix = constrain(detailNoise * midNoise * 2.0 - 1.0, 0, 1) * structure * 0.5;

                finalColor = lerpColor(finalColor, palette.primary, primaryMix);
                finalColor = lerpColor(finalColor, palette.secondary, secondaryMix);
                finalColor = lerpColor(finalColor, palette.highlight, highlightMix);
                finalColor = lerpColor(finalColor, palette.dust, constrain((1.0 - structure) * detailNoise * 1.5 - 0.6, 0, 1) * 0.7);

                contentAlpha = alpha(finalColor); // Get alpha from color mixing
                contentAlpha = constrain(contentAlpha * structure * 1.2 + detailNoise * 30, 0, 255); // Modulate by structure/detail

            } // End Type Check

            // +++ Apply Global Edge Fade Alpha Multiplier +++
            let edgeFadeMultiplier = smoothstep(BG_EDGE_FADE_END, BG_EDGE_FADE_START, normDist); // 1 inside start edge, 0 outside end edge
            let finalAlpha = contentAlpha * edgeFadeMultiplier;

            // Assign pixel colors
            pg.pixels[index + 0] = red(finalColor);
            pg.pixels[index + 1] = green(finalColor);
            pg.pixels[index + 2] = blue(finalColor);
            pg.pixels[index + 3] = constrain(finalAlpha, 0, 255); // Apply final calculated alpha
        }
    }
    noiseDetail(8, 0.5); // Reset noise detail to default for other parts
    pg.updatePixels();
    return pg;
}

// ==============================================================
// == SETUP STARS FUNCTION ==
// ==============================================================
// [ No changes needed here ]
function setupStars() {
    console.log(`Generating ${STAR_COUNT} stars...`);
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        let starRadius = random(STAR_FIELD_MIN_RADIUS, STAR_FIELD_MAX_RADIUS);
        let theta = random(TWO_PI);
        let phi = acos(random(-1, 1));
        let x = starRadius * sin(phi) * cos(theta);
        let y = starRadius * sin(phi) * sin(theta);
        let z = starRadius * cos(phi);
        let baseBrightness = random(STAR_MIN_BASE_BRIGHTNESS, STAR_MAX_BASE_BRIGHTNESS);
        let noiseOffset = random(10000);
        stars.push({ x, y, z, baseBrightness, noiseOffset });
    }
}

// ==============================================================
// == SETUP BACKGROUND OBJECTS FUNCTION ==
// ==============================================================
// [ No changes needed here ]
function setupBackgroundObjects() {
    console.log(`Generating ${BG_OBJECT_COUNT} background objects...`);
    backgroundObjects = [];
    let palettesAvailable = Object.keys(bgObjectPalettes).length > 0 &&
                            bgObjectPalettes[BGObjectType.SPIRAL]?.length > 0 &&
                            bgObjectPalettes[BGObjectType.ELLIPTICAL]?.length > 0 &&
                            bgObjectPalettes[BGObjectType.NEBULA]?.length > 0;

    if (!palettesAvailable) {
        console.error("Background object palettes not defined or incomplete!");
        defineBGObjectPalettes(); // Attempt to define them if missing
        palettesAvailable = Object.keys(bgObjectPalettes).length > 0 &&
                            bgObjectPalettes[BGObjectType.SPIRAL]?.length > 0 &&
                            bgObjectPalettes[BGObjectType.ELLIPTICAL]?.length > 0 &&
                            bgObjectPalettes[BGObjectType.NEBULA]?.length > 0;
        if (!palettesAvailable) return; // Exit if still no palettes
    }

    for(let i=0; i < BG_OBJECT_COUNT; i++) {
        let objectType = random(BG_OBJECT_TYPES);
        let selectedPalette;
        if (objectType === BGObjectType.SPIRAL) {
            selectedPalette = random(bgObjectPalettes[BGObjectType.SPIRAL]);
        } else if (objectType === BGObjectType.ELLIPTICAL) {
            selectedPalette = random(bgObjectPalettes[BGObjectType.ELLIPTICAL]);
        } else { // Nebula
            selectedPalette = random(bgObjectPalettes[BGObjectType.NEBULA]);
        }

        let params = {};
        if (objectType === BGObjectType.SPIRAL) {
            params.coreFocusFactor = random(0.7, 2.2);
            params.armTightness = random(1.5, 4.0);
            params.armDefinition = random(1.8, 3.5);
            params.noiseOctaves = 6;
            params.noisePersistence = 0.55;
        } else if (objectType === BGObjectType.ELLIPTICAL) {
            params.coreFocusFactor = random(1.5, 4.0);
             params.noiseOctaves = 5;
            params.noisePersistence = 0.45;
        } else { // Nebula
            params.density = random(0.7, 1.4);
            params.clumpiness = random(1.0, 3.5);
            params.filamentFactor = random(0.1, 0.6);
             params.noiseOctaves = 7;
            params.noisePersistence = 0.6;
        }

        let texture = createBGObjectTexture(objectType, selectedPalette, params);

        let distance = random(BG_OBJECT_MIN_DISTANCE, BG_OBJECT_MAX_DISTANCE);
        let size = random(BG_OBJECT_MIN_SIZE, BG_OBJECT_MAX_SIZE);
        if (objectType === BGObjectType.NEBULA) {
            size *= random(1.2, 1.8);
            size = constrain(size, BG_OBJECT_MIN_SIZE, BG_OBJECT_MAX_SIZE * 1.5);
        }
        let theta = random(TWO_PI);
        let phi = acos(random(-1, 1));
        let x = distance * sin(phi) * cos(theta);
        let y = distance * sin(phi) * sin(theta);
        let z = distance * cos(phi);

        let rotX = random(TWO_PI);
        let rotY = random(TWO_PI);
        let rotZ = random(TWO_PI);
        let rotationSpeed = random(-BG_OBJECT_MAX_ROTATION_SPEED, BG_OBJECT_MAX_ROTATION_SPEED) * (objectType === BGObjectType.NEBULA ? 0.5 : 1.0);

        backgroundObjects.push({
            type: objectType,
            texture: texture,
            position: createVector(x, y, z),
            size: size,
            rotationX: rotX,
            rotationY: rotY,
            rotationZ: rotZ,
            rotationSpeed: rotationSpeed
        });
    }
     console.log("Finished generating background objects.");
}

// ==============================================================
// == DRAW STARS FUNCTION ==
// ==============================================================
// [ No changes needed here ]
function drawStars() {
    push();
    strokeWeight(STAR_POINT_SIZE);
    beginShape(POINTS);
    let timeFactor = frameCount * STAR_VIBRATION_SPEED;
    for (const star of stars) {
        let brightnessNoise = noise(star.noiseOffset + timeFactor);
        let brightnessMultiplier = map(brightnessNoise, 0, 1, 1.0 - STAR_VIBRATION_AMOUNT, 1.0 + STAR_VIBRATION_AMOUNT);
        let currentBrightness = star.baseBrightness * brightnessMultiplier;
        stroke(currentBrightness);
        vertex(star.x, star.y, star.z);
    }
    endShape();
    pop();
}

// ==============================================================
// == DRAW BACKGROUND OBJECTS FUNCTION ==
// ==============================================================
// [ No changes needed here ]
function drawBackgroundObjects() {
    push();
    noStroke();
    textureMode(NORMAL); // Ensure texture coords are 0-1

    // Blend mode for additive light effect (optional, makes things brighter)
    // blendMode(ADD);

    for (let obj of backgroundObjects) {
        push();
        translate(obj.position.x, obj.position.y, obj.position.z);
        rotateX(obj.rotationX);
        rotateZ(obj.rotationZ);
        rotateY(obj.rotationY); // Animate this axis

        texture(obj.texture);
        plane(obj.size, obj.size);

        pop();

        obj.rotationY += obj.rotationSpeed; // Update rotation
    }

    // blendMode(BLEND); // Reset blend mode to default if changed
    pop();
}


// ==============================================================
// == DRAW FUNCTION ==
// ==============================================================
function draw() {
    background(0);
    orbitControl();

    // ++ Draw background elements first ++
    drawBackgroundObjects(); // ++ Renamed function call ++
    drawStars();


    // --- Lighting Setup ---
    let sunWorldPositions = [];
    let calculatedAmbient = color(10, 10, 12);

    for (let sun of suns) {
        let orbX = sun.orbitRadius * cos(sun.orbitAngle);
        let orbZ = sun.orbitRadius * sin(sun.orbitAngle);
        let pos = createVector(orbX, 0, orbZ);
        let cZ = cos(sun.orbitTiltZ); let sZ = sin(sun.orbitTiltZ);
        let cX = cos(sun.orbitTiltX); let sX = sin(sun.orbitTiltX);
        let x1 = pos.x * cZ - pos.y * sZ;
        let y1 = pos.x * sZ + pos.y * cZ;
        let y2 = y1 * cX - pos.z * sX;
        let z2 = y1 * sX + pos.z * cX;
        let finalPos = createVector(x1, y2, z2);
        sunWorldPositions.push(finalPos);
        sun.orbitAngle += sun.orbitSpeed;
        sun.axialRotationY += sun.axialRotationSpeed;
    }

    ambientLight(calculatedAmbient);
    for (let i = 0; i < suns.length; i++) {
        pointLight(suns[i].color, sunWorldPositions[i].x, sunWorldPositions[i].y, sunWorldPositions[i].z);
    }

    // --- Draw Suns ---
    noStroke();
    for (let i = 0; i < suns.length; i++) {
        let sun = suns[i];
        push();
        rotateZ(sun.orbitTiltZ);
        rotateX(sun.orbitTiltX);
        translate(sun.orbitRadius * cos(sun.orbitAngle), 0, sun.orbitRadius * sin(sun.orbitAngle));
        rotateY(sun.axialRotationY);
        emissiveMaterial(sun.color);
        sphere(sun.size, 32, 32);
        pop();
    }

    // --- Draw Planet and Moons ---
    push(); // Planet+Moon Isolation Start

    // Planet
    push();
    rotateZ(planet.tiltZ);
    rotateX(planet.tiltX);
    rotateY(planet.rotationY);
    noStroke();
    texture(planetTexture);
    if (planet.type === PlanetType.GAS_GIANT || planet.type === PlanetType.VOLCANIC) {
         ambientMaterial(200);
    } else {
        specularMaterial(50);
        shininess(10);
    }
    sphere(planet.radius, 48, 48);
    pop(); // Planet End
    planet.rotationY += planet.rotationSpeed;

    // Moons
    for (let moon of moons) {
        push();
        rotateZ(moon.orbitTiltZ);
        rotateX(moon.orbitTiltX);
        let moonX = moon.orbitRadius * cos(moon.orbitAngle);
        let moonZ = moon.orbitRadius * sin(moon.orbitAngle);
        translate(moonX, 0, moonZ);
        rotateZ(moon.axialTiltZ);
        rotateX(moon.axialTiltX);
        rotateY(moon.rotationY);
        noStroke();
        texture(moon.texture);
         if (moon.type === MoonType.VOLCANIC_MOON) {
             ambientMaterial(200);
        } else {
            specularMaterial(80);
            shininess(15);
        }
        sphere(moon.radius, 24, 24);
        pop(); // Moon End

        moon.orbitAngle += moon.orbitSpeed;
        moon.rotationY += moon.rotationSpeed;
    }

    pop(); // Planet+Moon Isolation End

} // === END DRAW ===

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Recalculate perspective on resize
    let maxDist = BG_OBJECT_MAX_DISTANCE * 1.2;
    let camFOV = PI / 3.0;
    let camAspect = width / height;
    let camNear = 0.1;
    let camFar = maxDist * 2;
    perspective(camFOV, camAspect, camNear, camFar);
}