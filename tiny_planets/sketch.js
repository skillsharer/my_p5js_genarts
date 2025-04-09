// --- Planet Variables ---
let planet;
let planetTexture;
let cloudTexture; 
let ringTexture; 

// --- Data Structures ---
let suns = [];
let moons = [];
let stars = [];
let backgroundObjects = [];
let gl; // ++ Add WebGL context reference ++

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
    VOLCANIC_MOON: 'Volcanic Moon'
};
const MOON_TYPES = Object.values(MoonType);

// --- Constants ---
// Texture Generation
const PLANET_TEXTURE_WIDTH = 1024;
const PLANET_TEXTURE_HEIGHT = 512;
const MOON_TEXTURE_WIDTH = 512;
const MOON_TEXTURE_HEIGHT = 256;
const BG_OBJECT_TEXTURE_WIDTH = 512;
const BG_OBJECT_TEXTURE_HEIGHT = 512;
const CLOUD_TEXTURE_WIDTH = 1024; 
const CLOUD_TEXTURE_HEIGHT = 512; 
const RING_TEXTURE_SIZE = 1024; 
const SUN_TEXTURE_SIZE = 512; 

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
const AURORA_INTENSITY_FACTOR = 2.0;
const AURORA_PULSE_MIN_INTENSITY = 0.6;
const AURORA_PULSE_MAX_INTENSITY = 1.5;
const AURORA_CURTAIN_FREQUENCY = 15.0;
const AURORA_POLAR_FALLOFF_POWER = 4.0;
const AURORA_ANIMATION_SPEED = 0.001;

// Sun Generation
const MIN_SUN_DISTANCE = 5800;
const MAX_SUN_DISTANCE = 6500;
const MIN_SUN_RADIUS_FACTOR = 1.5;
const MAX_SUN_RADIUS_FACTOR = 3.0;
const NUMBER_OF_SUNS = 2;
const SUN_AXIAL_ROTATION_SPEED_MIN = 0.001;
const SUN_AXIAL_ROTATION_SPEED_MAX = 0.005;
const SUN_ORBIT_SPEED_BASE = 10.0;
const SUN_MAX_ORBIT_TILT = 0.15;
const SUN_CORONA_NOISE_SCALE = 0.08; 
const SUN_CORE_BRIGHTNESS = 255; 
const SUN_CORONA_BRIGHTNESS = 180; 

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
const PLANET_ATMOSPHERE_FACTOR = 1.03;
const PLANET_ATMOSPHERE_ALPHA = 100;
const PLANET_CLOUD_FACTOR = 1.015;
const PLANET_CLOUD_ALPHA = 180;
const PLANET_CLOUD_ROTATION_FACTOR = 0.5;
const GAS_GIANT_RING_INNER_RADIUS_FACTOR = 1.4; 
const GAS_GIANT_RING_OUTER_RADIUS_FACTOR = 2.5; 
const GAS_GIANT_RING_ALPHA = 200; 

// Star Field & Background Object Constants
const STAR_COUNT = 3500;
const STAR_FIELD_MIN_RADIUS = 8000;
const STAR_FIELD_MAX_RADIUS = 150000;
const STAR_MIN_BASE_BRIGHTNESS = 30;
const STAR_MAX_BASE_BRIGHTNESS = 220;
const STAR_VIBRATION_AMOUNT = 0.35;
const STAR_VIBRATION_SPEED = 0.015;
const STAR_MIN_POINT_SIZE = 1.0; 
const STAR_MAX_POINT_SIZE = 2.5; 
const STAR_COLOR_PROB_WHITE = 0.65;
const STAR_COLOR_PROB_YELLOW = 0.15;
const STAR_COLOR_PROB_BLUE = 0.15;

const BG_OBJECT_COUNT = 15;
const BG_OBJECT_MIN_DISTANCE = 160000;
const BG_OBJECT_MAX_DISTANCE = 280000;
const BG_OBJECT_MIN_SIZE = 5000;
const BG_OBJECT_MAX_SIZE = 35000;
const BG_OBJECT_MAX_ROTATION_SPEED = 0.001;

// Background Object Types Enum
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
const BG_EDGE_FADE_START = 0.7; // ++ Start fading alpha earlier ++
const BG_EDGE_FADE_END = 0.99;  // ++ Fully faded alpha slightly later ++

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
    gl = drawingContext; // ++ Get WebGL context ++
    colorMode(RGB, 255); // Ensure color mode is RGB 0-255

    // Adjust Camera Far Plane
    let maxDist = BG_OBJECT_MAX_DISTANCE * 1.2;
    let camFOV = PI / 3.0;
    let camAspect = width / height;
    let camNear = 0.1;
    let camFar = maxDist;
    perspective(camFOV, camAspect, camNear, camFar);

    noiseDetail(8, 0.5);

    // Define Background Object Palettes
    defineBGObjectPalettes(); // ++ Palettes slightly tweaked later ++

    // --- Planet Setup ---
    planet = {};
    planet.type = random(PLANET_TYPES);
    planet.craters = [];
    planet.hasAurora = false;
    planet.atmosphereColor = color(100, 150, 255, PLANET_ATMOSPHERE_ALPHA); // Default atmosphere
    planet.hasClouds = false; 
    planet.hasRings = false; 

    // Determine radius first
    if (planet.type === PlanetType.GAS_GIANT) {
        planet.radius = random(GAS_GIANT_RADIUS_MIN, GAS_GIANT_RADIUS_MAX);
        planet.hasClouds = true; // Gas giants always have clouds/bands
        planet.hasRings = true; // Assume gas giants get rings
        planet.atmosphereColor = color(180, 160, 140, PLANET_ATMOSPHERE_ALPHA * 0.7); // Gas giant atmosphere color
    } else {
        planet.radius = random(PLANET_RADIUS_MIN, PLANET_RADIUS_MAX);
        if (planet.type === PlanetType.ROCKY || planet.type === PlanetType.OCEANIC) {
            planet.hasClouds = true; // Rocky/Oceanic can have clouds
             // Rocky/Oceanic atmosphere color depends on type (set during texture gen maybe?)
             if (planet.type === PlanetType.OCEANIC) {
                 planet.atmosphereColor = color(80, 180, 240, PLANET_ATMOSPHERE_ALPHA);
             } else { // Rocky
                 planet.atmosphereColor = color(150, 170, 190, PLANET_ATMOSPHERE_ALPHA);
             }
        } else if (planet.type === PlanetType.VOLCANIC) {
             planet.atmosphereColor = color(200, 150, 100, PLANET_ATMOSPHERE_ALPHA * 0.8); // Hazy volcanic atmosphere
        } else if (planet.type === PlanetType.ICE) {
             planet.atmosphereColor = color(180, 200, 220, PLANET_ATMOSPHERE_ALPHA * 0.5); // Thin icy atmosphere
        }
    }

    // Aurora Check
    let canHaveAurora = (planet.type !== PlanetType.VOLCANIC);
    if (canHaveAurora && random() < AURORA_PROBABILITY) {
        planet.hasAurora = true;
    }

    planet.rotationY = 0;
    planet.rotationSpeed = random(PLANET_ROTATION_SPEED_MIN, PLANET_ROTATION_SPEED_MAX);
    planet.tiltX = random(-PLANET_MAX_TILT, PLANET_MAX_TILT);
    planet.tiltZ = random(-PLANET_MAX_TILT, PLANET_MAX_TILT);
    planet.cloudRotationY = 0; 
    planet.cloudRotationSpeed = planet.rotationSpeed * PLANET_CLOUD_ROTATION_FACTOR; 

    // --- Generate Planet Craters ---
    if (planet.type === PlanetType.ROCKY || planet.type === PlanetType.VOLCANIC || planet.type === PlanetType.ICE) {
        let numCraters = floor(PLANET_TEXTURE_WIDTH * PLANET_TEXTURE_HEIGHT * PLANET_CRATER_DENSITY * random(0.5, 1.5));
        for (let i = 0; i < numCraters; i++) {
            let r = random(PLANET_MIN_CRATER_RADIUS, PLANET_MAX_CRATER_RADIUS);
            let peak = (r > MIN_CRATER_RADIUS_FOR_PEAK && random() < CENTRAL_PEAK_PROBABILITY);
            planet.craters.push({ x: random(PLANET_TEXTURE_WIDTH), y: random(PLANET_TEXTURE_HEIGHT), radius: r, hasPeak: peak, id: random(10000) });
        }
        planet.craters.sort((a, b) => a.radius - b.radius); // Draw smaller craters last (on top)
    }

    // --- Generate Planet Textures ---
    planetTexture = createPlanetTexture(planet.type, planet.radius, planet.craters, planet.hasAurora);
    if (planet.hasClouds) {
        cloudTexture = createCloudTexture(planet.type); // ++ Generate cloud texture ++
    }
    if (planet.hasRings) {
        ringTexture = createRingTexture(planet.type); // ++ Generate ring texture ++
    }

    console.log(`Planet Type: ${planet.type}, Radius: ${planet.radius.toFixed(2)}, Aurora: ${planet.hasAurora}, Clouds: ${planet.hasClouds}, Rings: ${planet.hasRings}`);

    // --- Define Sun(s) ---
    for (let i = 0; i < NUMBER_OF_SUNS; i++) {
        let sunOrbitRadius = random(MIN_SUN_DISTANCE, MAX_SUN_DISTANCE);
        let sunRadius = random(planet.radius * MIN_SUN_RADIUS_FACTOR, planet.radius * MAX_SUN_RADIUS_FACTOR);
        let sunBaseColor = color(random(245, 255), random(200, 245), random(150, 220)); // Base color used for light & core
        let sunOrbitAngle = random(TWO_PI);
        let sunOrbitSpeed = SUN_ORBIT_SPEED_BASE / sunOrbitRadius;
        let sunOrbitTiltX = random(-SUN_MAX_ORBIT_TILT, SUN_MAX_ORBIT_TILT);
        let sunOrbitTiltZ = random(-SUN_MAX_ORBIT_TILT, SUN_MAX_ORBIT_TILT);
        let sunAxialRotationY = 0;
        let sunAxialRotationSpeed = random(SUN_AXIAL_ROTATION_SPEED_MIN, SUN_AXIAL_ROTATION_SPEED_MAX);
        let sunTexture = createSunTexture(sunBaseColor); // ++ Generate sun texture ++
        suns.push({
            orbitRadius: sunOrbitRadius, orbitAngle: sunOrbitAngle, orbitSpeed: sunOrbitSpeed,
            orbitTiltX: sunOrbitTiltX, orbitTiltZ: sunOrbitTiltZ,
            axialRotationY: sunAxialRotationY, axialRotationSpeed: sunAxialRotationSpeed,
            size: sunRadius, color: sunBaseColor, texture: sunTexture // ++ Added texture ++
        });
    }

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
            for (let j = 0; j < numMoonCraters; j++) {
                moonCraters.push({ x: random(MOON_TEXTURE_WIDTH), y: random(MOON_TEXTURE_HEIGHT), radius: random(MOON_MIN_CRATER_RADIUS, MOON_MAX_CRATER_RADIUS), id: random(10000) });
            }
             moonCraters.sort((a, b) => a.radius - b.radius); // Draw smaller craters last (on top)
        }
        moonTexture = createMoonTexture(moonType, moonRadius, moonCraters);
        moons.push({
            orbitRadius: moonOrbitRadius, orbitSpeed: moonOrbitSpeed, orbitAngle: moonOrbitAngle,
            orbitTiltX: moonOrbitTiltX, orbitTiltZ: moonOrbitTiltZ,
            radius: moonRadius, type: moonType, texture: moonTexture,
            rotationY: moonRotationY, rotationSpeed: moonRotationSpeed,
            axialTiltX: moonAxialTiltX, axialTiltZ: moonAxialTiltZ
        });
        console.log(`Generated Moon ${i+1}: Type=${moonType}, Radius=${moonRadius.toFixed(2)}`);
    }

    // Setup Stars
    setupStars();

    // Setup Background Objects
    setupBackgroundObjects();

} // === END SETUP ===

// =====================================================================
// == PLANET TEXTURE GENERATION FUNCTION ==
// =====================================================================
function createPlanetTexture(type, radius, craters, hasAurora) {
    let pg = createGraphics(PLANET_TEXTURE_WIDTH, PLANET_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.loadPixels();
    let baseSeed = random(10000);
    let mountainSeed = random(10000, 20000);
    let craterSeed = random(20000, 30000);
    let auroraSeed = random(30000, 40000);
    let lightAngle = -PI / 4; // For crater shading

    // Aurora colors
    let auroraC1 = color(AURORA_COLOR_1[0], AURORA_COLOR_1[1], AURORA_COLOR_1[2]);
    let auroraC2 = color(AURORA_COLOR_2[0], AURORA_COLOR_2[1], AURORA_COLOR_2[2]);
    let auroraC3 = color(AURORA_COLOR_3[0], AURORA_COLOR_3[1], AURORA_COLOR_3[2]);

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let nx = x / pg.width; let ny = y / pg.height; // Normalized texture coords (0-1)
            let r, g, b;
            let baseTerrainColor;

            // Map texture coords to sphere coords for seamless noise
            let angle = map(nx, 0, 1, -PI, PI);
            let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI);
            // Use consistent noise space scaling based on a reference radius, not the actual planet radius
            let refRadius = 100;
            let baseNX = (1 + cos(vAngle) * cos(angle)) * refRadius;
            let baseNY = (1 + cos(vAngle) * sin(angle)) * refRadius;
            let baseNZ = (1 + sin(vAngle)) * refRadius;

            // Noise values at different scales
            let noiseVal = noise(baseNX * NOISE_SCALE_LOW + baseSeed, baseNY * NOISE_SCALE_LOW + baseSeed, baseNZ * NOISE_SCALE_LOW + baseSeed);
            let noiseMed = noise(baseNX * NOISE_SCALE_MED + baseSeed + 10, baseNY * NOISE_SCALE_MED + baseSeed + 10, baseNZ * NOISE_SCALE_MED + baseSeed + 10);
            let noiseHigh = noise(baseNX * NOISE_SCALE_HIGH + baseSeed + 20, baseNY * NOISE_SCALE_HIGH + baseSeed + 20, baseNZ * NOISE_SCALE_HIGH + baseSeed + 20);

            // Fractal mountain calculation (only if applicable)
            let mountainHeight = 0;
            let mountainIntensity = 0;
            if (type === PlanetType.ROCKY || type === PlanetType.VOLCANIC || type === PlanetType.ICE) {
                let freq = MOUNTAIN_NOISE_SCALE_BASE;
                let amp = 1.0;
                for (let i = 0; i < FRACTAL_OCTAVES; i++) {
                    mountainHeight += noise(baseNX * freq + mountainSeed + i * 10, baseNY * freq + mountainSeed + i * 10, baseNZ * freq + mountainSeed + i * 10) * amp;
                    freq *= FRACTAL_LACUNARITY;
                    amp *= FRACTAL_PERSISTENCE;
                }
                // Normalize mountain height
                mountainHeight = mountainHeight * (1.0 - FRACTAL_PERSISTENCE) / (1.0 - pow(FRACTAL_PERSISTENCE, FRACTAL_OCTAVES));
                mountainHeight = constrain(mountainHeight, 0, 1);

                if(type === PlanetType.ROCKY) mountainIntensity = MOUNTAIN_INTENSITY_ROCKY;
                else if (type === PlanetType.VOLCANIC) mountainIntensity = MOUNTAIN_INTENSITY_VOLCANIC;
                else if (type === PlanetType.ICE) mountainIntensity = MOUNTAIN_INTENSITY_ICE;
            }

            let c; // Variable to hold the calculated color

            // --- Base Color Logic per Planet Type ---
            switch (type) {
                 case PlanetType.GAS_GIANT: {
                    let baseCol1 = color(210, 180, 140); // Light band
                    let baseCol2 = color(139, 69, 19);   // Dark band
                    let swirlCol = color(255, 228, 196); // Swirl highlight
                    let stormCol = color(180, 80, 60); // Great Red Spot-like color
                    let band = sin(ny * PI * 10 + noiseMed * 2 + noise(baseSeed+ny*0.1)*5 ); // More complex bands
                    let mixFactor = (noiseVal + band * 0.3) / 1.3;
                    c = lerpColor(baseCol1, baseCol2, constrain(mixFactor, 0, 1));
                    // Add swirls based on high frequency noise
                    c = lerpColor(c, swirlCol, constrain(noiseHigh * 1.5 - 0.5, 0, 0.4));
                     // Add a chance for a large storm feature
                    let stormNoise = noise(baseNX * NOISE_SCALE_LOW * 0.5 + baseSeed + 50, baseNY * NOISE_SCALE_LOW * 0.5 + baseSeed + 50);
                    if (stormNoise > 0.7) {
                        let stormFactor = constrain((stormNoise - 0.7) / 0.3, 0, 1);
                         c = lerpColor(c, stormCol, stormFactor * constrain(noiseHigh * 2.0 - 0.8, 0, 1) * 0.8);
                    }
                    break;
                }
                 case PlanetType.ROCKY: {
                    let snowColor = color(235, 240, 245);
                    let landHigh = color(160, 150, 140); // Mountain peaks
                    let landMid = color(110, 100, 90);  // Mid elevation
                    let landLow = color(70, 65, 60);    // Low elevation / base rock
                    let waterDeep = color(40, 60, 80);
                    let waterShallow = color(60, 90, 110);
                    let waterThreshold = 0.45 - mountainHeight * 0.1; // Water level influenced by terrain

                    if (noiseVal < waterThreshold) { // Water area
                        let waterMix = constrain(noiseVal / waterThreshold, 0, 1);
                        c = lerpColor(waterDeep, waterShallow, waterMix);
                        // Add subtle color variation based on noise
                        c = lerpColor(c, color(red(c) * 0.9, green(c) * 0.95, blue(c) * 1.1), constrain(noiseHigh - 0.5, 0, 0.2));
                    } else { // Land area
                        let elevationFactor = constrain((noiseVal - waterThreshold) / (1.0 - waterThreshold), 0, 1);
                        c = lerpColor(landLow, landMid, elevationFactor);

                        // Apply mountain shading/highlighting
                        let mountainFactor = constrain(mountainHeight * 2.0 - 0.5, 0, 1);
                        let peakMix = constrain(mountainFactor * mountainIntensity, 0, 1);
                        let shadowMix = constrain((1.0 - mountainHeight) * 1.5 - 0.5, 0, 1) * mountainIntensity * 0.5;
                        c = lerpColor(c, landHigh, peakMix);
                        c = lerpColor(c, landLow, shadowMix);

                        // Add snow caps if high enough
                        if (mountainHeight > SNOW_LINE_THRESHOLD) {
                            let snowMix = constrain((mountainHeight - SNOW_LINE_THRESHOLD) / (1.0 - SNOW_LINE_THRESHOLD), 0, 1);
                            c = lerpColor(c, snowColor, snowMix * 0.8);
                        }
                        // Add subtle color variation based on noise
                        c = lerpColor(c, color(red(c) * 1.1, green(c) * 1.05, blue(c) * 0.95), constrain(noiseHigh - 0.6, 0, 0.2));
                    }
                    break;
                }
                case PlanetType.OCEANIC: {
                    let oceanDeep = color(20, 40, 100);
                    let oceanShallow = color(50, 100, 180);
                    let islandHigh = color(100, 140, 80); // Greener high islands
                    let islandLow = color(180, 160, 120); // Sandy low islands/shores
                    let islandThreshold = 0.65; // Noise value above which islands appear

                    if (noiseVal > islandThreshold) { // Island area
                        let islandMix = constrain((noiseVal - islandThreshold) / (1.0 - islandThreshold), 0, 1);
                        c = lerpColor(islandLow, islandHigh, islandMix);
                        // Add subtle texture/variation
                        c = lerpColor(c, color(red(c) * 1.1, green(c) * 0.9, blue(c)), constrain(noiseHigh * 1.2 - 0.7, 0, 0.2));
                    } else { // Ocean area
                        let waterMix = constrain(noiseVal / islandThreshold, 0, 1);
                        c = lerpColor(oceanDeep, oceanShallow, waterMix);
                        // Add currents/texture using medium noise
                        c = lerpColor(c, oceanShallow, constrain(noiseMed * 0.3, 0, 1));
                        // Add subtle color variation
                        c = lerpColor(c, color(red(c) * 1.1, green(c) * 1.1, blue(c) * 1.2), constrain(noiseHigh * 1.5 - 0.9, 0, 0.15));
                    }
                    break;
                }
                case PlanetType.VOLCANIC: {
                    let rockDark = color(30, 20, 20);
                    let rockMid = color(70, 60, 60);
                    let rockHigh = color(100, 90, 90); // Higher, potentially ash-covered rock
                    let lavaBright = color(255, 100, 0);
                    let lavaMid = color(200, 40, 0);
                    let lavaCooling = color(100, 20, 5); // Darker, cooling lava
                    let lavaThreshold = 0.6 - mountainHeight * 0.2; // Lava flows pool lower

                    // Base rock color based on general noise/elevation
                    let rockMix = constrain(noiseVal * 1.2, 0, 1);
                    c = lerpColor(rockDark, rockMid, rockMix);

                    // Mountain shading/highlighting
                    let mountainFactor = constrain(mountainHeight * 1.8 - 0.4, 0, 1);
                    let peakMix = constrain(mountainFactor * mountainIntensity, 0, 1);
                    let shadowMix = constrain((1.0 - mountainHeight) * 1.5 - 0.5, 0, 1) * mountainIntensity * 0.5;
                    c = lerpColor(c, rockHigh, peakMix);
                    c = lerpColor(c, rockDark, shadowMix);

                    // Lava flows based on medium noise
                    if (noiseMed > lavaThreshold) {
                        let lavaFlowMix = constrain((noiseMed - lavaThreshold) / (1.0 - lavaThreshold), 0, 1);
                        let lavaBase = lerpColor(lavaMid, lavaBright, lavaFlowMix);
                        // Add brighter hot spots with high freq noise
                        lavaBase = lerpColor(lavaBase, color(255, 200, 50), constrain(noiseHigh * 2.0 - 1.0, 0, 1));
                         // Add cooling effect
                         lavaBase = lerpColor(lavaCooling, lavaBase, constrain(noiseVal * 1.5 - 0.3, 0, 1));
                        // Mix lava with rock
                        c = lerpColor(c, lavaBase, constrain(lavaFlowMix * 0.8 + 0.2, 0, 1));
                    }
                    // General subtle color variation
                    c = lerpColor(c, color(red(c) * 1.05, green(c) * 0.95, blue(c) * 0.9), constrain(noiseHigh - 0.6, 0, 0.1));
                    break;
                }
                case PlanetType.ICE: {
                    let iceBase = color(200, 220, 255);
                    let iceShadow = color(150, 180, 230); // Blueish shadows
                    let iceHighlight = color(240, 245, 255);
                    let crackColor = color(100, 120, 160); // Darker cracks
                    let crackThreshold = 0.6;

                    // Base ice color
                    let iceMix = constrain(noiseVal * 1.1, 0, 1);
                    c = lerpColor(iceShadow, iceBase, iceMix);

                    // Ice ridges/mountains shading/highlighting
                    let ridgeFactor = constrain(mountainHeight * 1.5 - 0.3, 0, 1);
                    let ridgePeakMix = constrain(ridgeFactor * mountainIntensity, 0, 1);
                    let ridgeShadowMix = constrain((1.0 - mountainHeight) * 1.0 - 0.3, 0, 1) * mountainIntensity * 0.3;
                    c = lerpColor(c, iceHighlight, ridgePeakMix);
                    c = lerpColor(c, iceShadow, ridgeShadowMix);

                    // Cracks based on medium noise
                    if (noiseMed > crackThreshold) {
                        let crackMix = constrain((noiseMed - crackThreshold) / (1 - crackThreshold), 0, 1);
                        c = lerpColor(c, crackColor, constrain(crackMix * 0.7, 0, 1));
                    }
                    // Surface texture/sparkle
                    c = lerpColor(c, iceHighlight, constrain(noiseHigh * 1.5 - 0.5, 0, 0.3));
                    break;
                }
                default: c = color(noiseVal * 255); break;
            } // End Switch

            baseTerrainColor = c ? c : color(128); // Fallback color
            let finalPixelColor = baseTerrainColor;

            // --- Apply Craters (on top of base terrain) ---
            if (craters && craters.length > 0 && (type === PlanetType.ROCKY || type === PlanetType.VOLCANIC || type === PlanetType.ICE)) {
                for (let i = craters.length - 1; i >= 0; i--) { // Iterate backwards to draw smaller craters on top
                    let crater = craters[i];
                    let dx = x - crater.x;
                    let dy = y - crater.y;
                    // Texture wrapping check (horizontal only needed for basic sphere map)
                    if (abs(dx) > pg.width / 2) { dx = (dx > 0 ? dx - pg.width : dx + pg.width); }

                    let distSq = dx * dx + dy * dy; // Use squared distance for initial checks

                    // Irregular crater shape using noise based on angle
                    let angleToPixel = atan2(dy, dx);
                    let shapeNoiseVal = noise(cos(angleToPixel) * CRATER_SHAPE_NOISE_SCALE + crater.id, sin(angleToPixel) * CRATER_SHAPE_NOISE_SCALE + crater.id);
                    let effectiveRadius = crater.radius * (1 + (shapeNoiseVal - 0.5) * CRATER_SHAPE_IRREGULARITY);
                    let effectiveRadiusSq = effectiveRadius * effectiveRadius;

                    // Ejecta calculation
                    let ejectaMaxRadius = effectiveRadius * EJECTA_RADIUS_FACTOR;
                    let ejectaMaxRadiusSq = ejectaMaxRadius * ejectaMaxRadius;

                    const AA_HALF_WIDTH = ANTI_ALIAS_FACTOR / 2.0; // For smooth edges

                    // Check if pixel is potentially within ejecta range first
                    if (distSq < (ejectaMaxRadius + AA_HALF_WIDTH) * (ejectaMaxRadius + AA_HALF_WIDTH)) {
                        let dist = sqrt(distSq); // Calculate exact distance only if needed
                        let modifiedColor = finalPixelColor; // Start with the color underneath
                        let isInsideCraterBoundary = (dist < effectiveRadius);
                        let isInsideEjectaBoundary = (dist < ejectaMaxRadius); // Already checked roughly

                        // Calculate crater/ejecta color modification
                        if (isInsideEjectaBoundary) {
                            if (isInsideCraterBoundary) { // Inside the main crater depression
                                let currentCraterColor = finalPixelColor; // Sample color before modification
                                // Lighting within crater (rim highlight, floor shadow)
                                let angleDiff = atan2(sin(angleToPixel - lightAngle), cos(angleToPixel - lightAngle)); // Angle relative to light
                                let rimWidth = effectiveRadius * 0.2;
                                let isRim = (dist > effectiveRadius - rimWidth);
                                let floorFactor = constrain(dist / (effectiveRadius - rimWidth), 0, 1); // 0 at center, 1 at rim edge

                                // Central Peak Calculation
                                let peakEffect = 0;
                                if (crater.hasPeak) {
                                    let peakRadius = effectiveRadius * CENTRAL_PEAK_RADIUS_FACTOR;
                                    if (dist < peakRadius) {
                                        let peakFactor = 1.0 - dist / peakRadius; // Strongest at center
                                        let peakNoise = noise(dx * 0.1 + crater.id + 20, dy * 0.1 + crater.id + 20);
                                        // Peaks affect brightness/darkness based on light angle
                                        peakEffect = peakFactor * (peakNoise - 0.5) * CENTRAL_PEAK_HEIGHT_FACTOR * 2 * cos(angleDiff);
                                    }
                                }

                                let brightnessFactor = 1.0;
                                let darknessFactor = 1.0;

                                if (isRim) { // Rim brightness/shadow
                                    brightnessFactor *= lerp(1.0, CRATER_RIM_BRIGHTNESS, constrain(cos(angleDiff) * 0.6 + 0.4, 0.1, 1.0));
                                    darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * 0.8, constrain(cos(angleDiff + PI) * 0.6 + 0.4, 0.1, 1.0));
                                } else { // Floor shadow
                                    darknessFactor *= lerp(CRATER_FLOOR_DARKNESS, 1.0, floorFactor); // Darker towards center
                                    darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS, constrain(cos(angleDiff + PI) * 0.5 + 0.5, 0.1, 1.0)); // General shadow
                                }

                                // Apply peak lighting effect
                                if (peakEffect > 0) brightnessFactor *= (1.0 + peakEffect);
                                else darknessFactor *= (1.0 - peakEffect); // Negative peak effect increases darkness

                                modifiedColor = color(red(currentCraterColor) * brightnessFactor * darknessFactor, green(currentCraterColor) * brightnessFactor * darknessFactor, blue(currentCraterColor) * brightnessFactor * darknessFactor);

                                // Blend slightly with original terrain for texture
                                let blendNoise = noise(x * 0.1 + crater.id + 30, y * 0.1 + crater.id + 30);
                                modifiedColor = lerpColor(modifiedColor, currentCraterColor, constrain(blendNoise * 0.3 - 0.1, 0, 0.2));

                            } else { // Inside ejecta blanket, outside crater rim
                                let ejectaFactor = 1.0 - constrain((dist - effectiveRadius) / (ejectaMaxRadius - effectiveRadius), 0, 1); // 1 at rim, 0 at max ejecta radius
                                let ejectaNoise = noise(dx * EJECTA_NOISE_SCALE + crater.id + 10, dy * EJECTA_NOISE_SCALE + crater.id + 10);
                                // Ejecta slightly brightens underlying terrain, modulated by noise
                                let ejectaColorMod = lerp(1.0, 1.1, ejectaNoise * ejectaFactor * EJECTA_INTENSITY); // Subtle brightening
                                // Ejecta also adds subtle texture/shadowing
                                let ejectaShadowMod = lerp(1.0, 0.95, (1.0-ejectaNoise) * ejectaFactor * EJECTA_INTENSITY * 0.5);
                                let ejectaBaseColor = finalPixelColor;

                                modifiedColor = color(red(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod, green(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod, blue(ejectaBaseColor) * ejectaColorMod * ejectaShadowMod);
                                // Blend ejecta effect based on distance and intensity
                                modifiedColor = lerpColor(ejectaBaseColor, modifiedColor, constrain(ejectaFactor * EJECTA_INTENSITY * 2.0, 0, 0.8));
                            }
                        } // End isInsideEjectaBoundary check

                        // --- Anti-aliasing ---
                        // Calculate AA factors for smooth transitions at edges
                        let craterEdgeOuter = effectiveRadius + AA_HALF_WIDTH;
                        let craterEdgeInner = effectiveRadius - AA_HALF_WIDTH;
                        let ejectaEdgeOuter = ejectaMaxRadius + AA_HALF_WIDTH;
                        let ejectaEdgeInner = ejectaMaxRadius - AA_HALF_WIDTH;

                        let finalBlendFactor = 0.0; // How much of the modifiedColor to use

                        if (dist < craterEdgeInner) { // Definitely inside crater
                            finalBlendFactor = 1.0;
                        } else if (dist < craterEdgeOuter) { // Within crater AA region
                             // Blend between ejecta color (if applicable) and crater color
                            let craterAA = smoothstep(craterEdgeOuter, craterEdgeInner, dist); // 1 inside inner, 0 outside outer
                            // Need the color just outside the crater rim (ejecta color)
                            let ejectaFactorOuter = 1.0 - constrain((dist - effectiveRadius) / (ejectaMaxRadius - effectiveRadius), 0, 1);
                            let ejectaNoiseOuter = noise(dx * EJECTA_NOISE_SCALE + crater.id + 10, dy * EJECTA_NOISE_SCALE + crater.id + 10);
                            let ejectaColorModOuter = lerp(1.0, 1.1, ejectaNoiseOuter * ejectaFactorOuter * EJECTA_INTENSITY);
                            let ejectaShadowModOuter = lerp(1.0, 0.95, (1.0-ejectaNoiseOuter) * ejectaFactorOuter * EJECTA_INTENSITY * 0.5);
                            let outerColor = color(red(baseTerrainColor) * ejectaColorModOuter * ejectaShadowModOuter, green(baseTerrainColor) * ejectaColorModOuter * ejectaShadowModOuter, blue(baseTerrainColor) * ejectaColorModOuter * ejectaShadowModOuter);
                            outerColor = lerpColor(baseTerrainColor, outerColor, constrain(ejectaFactorOuter * EJECTA_INTENSITY * 2.0, 0, 0.8));

                            modifiedColor = lerpColor(outerColor, modifiedColor, craterAA);
                            finalBlendFactor = 1.0; // Use the fully calculated modified color

                        } else if (dist < ejectaEdgeInner) { // Definitely inside ejecta zone
                            finalBlendFactor = 1.0;
                        } else if (dist < ejectaEdgeOuter) { // Within ejecta AA region
                            let ejectaAA = smoothstep(ejectaEdgeOuter, ejectaEdgeInner, dist); // 1 inside inner, 0 outside outer
                            finalBlendFactor = ejectaAA;
                        }

                         // Apply the blending
                        finalPixelColor = lerpColor(finalPixelColor, modifiedColor, finalBlendFactor);

                    } // End ejecta range check
                } // End crater loop
            } // End crater check

            // --- Apply Aurora (on top of terrain and craters) ---
            if (hasAurora) {
                let polarDist = abs(ny - 0.5) * 2.0; // 0 at equator, 1 at poles
                let polarFactor = pow(polarDist, AURORA_POLAR_FALLOFF_POWER); // Stronger near poles

                if (polarFactor > 0.01) { // Only calculate if reasonably close to pole
                    // Animate aurora over time
                    let timeSlice = auroraSeed / 1000.0 + frameCount * AURORA_ANIMATION_SPEED; // Use frameCount for animation

                    // Base aurora structure/shape noise
                    let auroraNX1 = nx * AURORA_NOISE_SCALE_BASE * 5;
                    let auroraNY1 = ny * AURORA_NOISE_SCALE_BASE * 2;
                    let auroraBaseNoise = noise(auroraNX1, auroraNY1, timeSlice);

                    // Curtain effect noise (vertical wavy patterns)
                    let curtainNoiseVal = noise(nx * AURORA_NOISE_SCALE_CURTAIN, ny * AURORA_NOISE_SCALE_CURTAIN * 3, timeSlice + 10.0);
                    let curtainEffect = sin(ny * PI * AURORA_CURTAIN_FREQUENCY + curtainNoiseVal * PI * 2.0);
                    curtainEffect = (curtainEffect * 0.5 + 0.5); // Map sin output to 0-1

                    // Detail/swirl noise
                    let auroraNX3 = nx * AURORA_NOISE_SCALE_DETAIL * 5;
                    let auroraNY3 = ny * AURORA_NOISE_SCALE_DETAIL * 2;
                    let auroraDetailNoise = noise(auroraNX3, auroraNY3, timeSlice + 20.0);

                    // Pulsing brightness noise
                    let pulseNoiseScale = AURORA_NOISE_SCALE_PULSE;
                    let pulseNoise = noise(nx * pulseNoiseScale * 3, ny * pulseNoiseScale, timeSlice * 0.5 + 30.0); // Slower pulse
                    let pulseFactor = map(pulseNoise, 0, 1, AURORA_PULSE_MIN_INTENSITY, AURORA_PULSE_MAX_INTENSITY);

                    // Combine factors to get final aurora visibility/intensity
                    let auroraVisibility = constrain(auroraBaseNoise * 1.2 - 0.2, 0, 1) // Base shape
                                          * constrain(curtainEffect * 1.5 - 0.3, 0, 1) // Curtain effect
                                          * polarFactor // Polar falloff
                                          * pulseFactor // Pulsing brightness
                                          * AURORA_INTENSITY_FACTOR; // Overall brightness
                    auroraVisibility = constrain(auroraVisibility, 0, 1);

                    if (auroraVisibility > 0.05) { // Threshold to avoid rendering tiny amounts
                        // Determine aurora color based on detail noise
                        let colorNoise = auroraDetailNoise;
                        let auroraColor;
                        if (colorNoise < 0.4) {
                            auroraColor = lerpColor(auroraC1, auroraC3, constrain(colorNoise / 0.4, 0, 1));
                        } else if (colorNoise < 0.7) {
                            auroraColor = lerpColor(auroraC3, auroraC2, constrain((colorNoise - 0.4) / 0.3, 0, 1));
                        } else {
                            auroraColor = lerpColor(auroraC2, auroraC1, constrain((colorNoise - 0.7) / 0.3, 0, 1));
                        }

                        // Blend aurora color with the underlying pixel color
                        // Use additive blending logic (lerp towards white based on aurora brightness, but use aurora color)
                         let finalAuroraColor = color(
                             red(auroraColor),
                             green(auroraColor),
                             blue(auroraColor),
                             auroraVisibility * 255 // Use visibility for alpha
                         );
                         // Layer the aurora over the existing pixel using alpha blending
                         let baseR = red(finalPixelColor);
                         let baseG = green(finalPixelColor);
                         let baseB = blue(finalPixelColor);
                         let auroraR = red(finalAuroraColor);
                         let auroraG = green(finalAuroraColor);
                         let auroraB = blue(finalAuroraColor);
                         let auroraA = alpha(finalAuroraColor) / 255.0;

                         finalPixelColor = color(
                             lerp(baseR, auroraR, auroraA),
                             lerp(baseG, auroraG, auroraA),
                             lerp(baseB, auroraB, auroraA)
                         );
                        // Alternative: simple lerp might look flatter
                        // finalPixelColor = lerpColor(finalPixelColor, auroraColor, auroraVisibility);
                    }
                }
            } // End Aurora Check

            // --- Final Pixel Assignment ---
            if (finalPixelColor) {
                r = red(finalPixelColor);
                g = green(finalPixelColor);
                b = blue(finalPixelColor);
            } else { // Error fallback
                r = 255; g = 0; b = 255;
            }
            pg.pixels[index + 0] = constrain(r, 0, 255);
            pg.pixels[index + 1] = constrain(g, 0, 255);
            pg.pixels[index + 2] = constrain(b, 0, 255);
            pg.pixels[index + 3] = 255; // Texture is opaque
        }
    }
    pg.updatePixels();
    return pg;
}


// =====================================================================
// == ++ CLOUD TEXTURE GENERATION FUNCTION ++ ==
// =====================================================================
function createCloudTexture(planetType) {
    let pg = createGraphics(CLOUD_TEXTURE_WIDTH, CLOUD_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.loadPixels();
    let seed = random(70000, 80000);
    let cloudNoiseScaleBase = NOISE_SCALE_MED * 0.8; // Base structure
    let cloudNoiseScaleDetail = NOISE_SCALE_HIGH * 1.2; // Wispy details
    let cloudColor = color(255, PLANET_CLOUD_ALPHA); // White clouds, alpha set by constant

    // Adjust density/coverage based on planet type
    let coverageFactor = 1.0; // Default for Rocky/Oceanic
    let noiseThreshold = 0.45; // Base threshold
    if (planetType === PlanetType.GAS_GIANT) {
        coverageFactor = 1.5; // More coverage for Gas Giants (bands)
        noiseThreshold = 0.3;
    }

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let nx = x / pg.width;
            let ny = y / pg.height;

            // Sphere mapping for seamless noise
            let angle = map(nx, 0, 1, -PI, PI);
            let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI);
            let refRadius = 100;
            let nCoordX = (1 + cos(vAngle) * cos(angle)) * refRadius;
            let nCoordY = (1 + cos(vAngle) * sin(angle)) * refRadius;
            let nCoordZ = (1 + sin(vAngle)) * refRadius;

            // Combine noise scales for cloud density
             let baseNoise = noise(nCoordX * cloudNoiseScaleBase + seed, nCoordY * cloudNoiseScaleBase + seed, nCoordZ * cloudNoiseScaleBase + seed);
             let detailNoise = noise(nCoordX * cloudNoiseScaleDetail + seed + 10, nCoordY * cloudNoiseScaleDetail + seed + 10, nCoordZ * cloudNoiseScaleDetail + seed + 10);

            let cloudValue = (baseNoise * 0.6 + detailNoise * 0.4) * coverageFactor;

            let alpha = 0;
            if (cloudValue > noiseThreshold) {
                 // Smooth transition near the threshold
                 let density = smoothstep(noiseThreshold, noiseThreshold + 0.2, cloudValue);
                 // Modulate density with detail noise for wispiness
                 density *= constrain(detailNoise * 1.5, 0.5, 1.0);
                 alpha = constrain(density * PLANET_CLOUD_ALPHA, 0, PLANET_CLOUD_ALPHA);
             }

             // Optionally add banding for Gas Giants
             if (planetType === PlanetType.GAS_GIANT) {
                 let bandNoise = noise(ny * 5.0 + seed + 20); // Noise influences band thickness/position
                 let bandEffect = sin(ny * PI * 8.0 + bandNoise * 3.0); // 8 bands base
                 bandEffect = (bandEffect * 0.5 + 0.5); // 0-1
                 alpha *= lerp(0.7, 1.3, bandEffect); // Modulate alpha by bands
                 alpha = constrain(alpha, 0, PLANET_CLOUD_ALPHA * 1.1); // Allow slightly denser bands
             }

            pg.pixels[index + 0] = 255; // Cloud color R
            pg.pixels[index + 1] = 255; // Cloud color G
            pg.pixels[index + 2] = 255; // Cloud color B
            pg.pixels[index + 3] = constrain(alpha, 0, 255); // Final alpha
        }
    }
    pg.updatePixels();
    return pg;
}

// =====================================================================
// == ++ RING TEXTURE GENERATION FUNCTION ++ ==
// =====================================================================
function createRingTexture(planetType) {
    // Only gas giants should have rings based on current setup logic
    if (planetType !== PlanetType.GAS_GIANT) return null;

    let pg = createGraphics(RING_TEXTURE_SIZE, RING_TEXTURE_SIZE / 8); // Wide, short texture
    pg.pixelDensity(1);
    pg.colorMode(RGB, 255);
    pg.loadPixels();
    let seed = random(80000, 90000);

    let baseColor1 = color(180, 170, 160); // Grayish
    let baseColor2 = color(140, 130, 115); // Brownish/Darker

    const numMainRings = 5;
    const ringVariance = 0.3; // How much ring edges wobble
    const detailNoiseScale = 0.1;
    const gapProbability = 0.2; // Chance of a major gap (like Cassini)

    for (let x = 0; x < pg.width; x++) {
        let radialPos = x / pg.width; // 0 = inner edge, 1 = outer edge

        let noiseVal = noise(radialPos * 5.0 + seed, seed + 10); // Noise for color mixing
        let detailNoiseVal = noise(radialPos * 30.0 + seed + 20, seed + 30); // Noise for density/gaps
        let structureNoise = noise(radialPos * 2.0 + seed + 40); // Noise for major gaps

        let ringColor = lerpColor(baseColor1, baseColor2, noiseVal);
        let density = 1.0;

        // Simulate major ring structures and gaps
        let ringCycle = (radialPos * numMainRings * 2.0) % 2.0; // Creates bands (0-1 is ring, 1-2 is gap)
        let ringEdgeFactor = abs(ringCycle - 1.0); // 0 at center of ring/gap, 1 at edge
        let ringEdgeNoise = noise(radialPos * 10.0 + seed + 50);
        let fuzzyEdge = smoothstep(0.8 - ringVariance * ringEdgeNoise, 1.0, ringEdgeFactor); // Soft edge transition

         // Base density on being inside a ring band
         density = 1.0 - fuzzyEdge; // Higher density away from edges

         // Add smaller gaps/density variations using detail noise
         density *= constrain(detailNoiseVal * 1.5, 0.3, 1.0);

         // Introduce major gaps based on structure noise
         if (structureNoise < gapProbability * map(radialPos, 0, 1, 1.5, 0.5)) { // Higher chance near planet
              density *= smoothstep(0.0, gapProbability * 0.5, structureNoise); // Fade out density in gap region
         }

        let finalAlpha = constrain(density * GAS_GIANT_RING_ALPHA, 0, 255);

        for (let y = 0; y < pg.height; y++) { // Apply same color/alpha down the column
            let index = (x + y * pg.width) * 4;
            pg.pixels[index + 0] = red(ringColor);
            pg.pixels[index + 1] = green(ringColor);
            pg.pixels[index + 2] = blue(ringColor);
            pg.pixels[index + 3] = finalAlpha;
        }
    }
    pg.updatePixels();
    return pg;
}

// =====================================================================
// == ++ SUN TEXTURE GENERATION FUNCTION ++ ==
// =====================================================================
function createSunTexture(baseColor) {
    let pg = createGraphics(SUN_TEXTURE_SIZE, SUN_TEXTURE_SIZE / 2); // Rectangular texture
    pg.pixelDensity(1);
    pg.colorMode(RGB, 255);
    pg.loadPixels();
    let seed1 = random(90000, 93000);
    let seed2 = random(93000, 96000);
    let seed3 = random(96000, 100000);

    // More vibrant and contrasty color palette for plasma/lava look
    let colorHot1 = color(255, 255, 230); // Very bright yellow-white
    let colorHot2 = color(255, 200, 80);  // Bright orange-yellow
    let colorMid = color(red(baseColor), green(baseColor)*0.9, blue(baseColor)*0.7); // Base, slightly redder
    let colorCool1 = color(200, 80, 20);   // Deep orange-red
    let colorCool2 = color(100, 30, 10);   // Darkest red/brown (sunspots base)
    let sunspotDetailColor = color(50, 15, 5); // Very dark core for spots

    // Noise settings for different features
    let plasmaNoiseScaleLow = 0.02; // Large scale flows/cells
    let plasmaNoiseScaleMid = 0.08; // Medium scale texture/boiling
    let plasmaNoiseScaleHigh = 0.3;  // Fine granulation/details
    let warpNoiseScale = 0.15;      // Noise scale for coordinate distortion (swirls)
    let spotNoiseScale = 0.05;      // Noise scale for placing sunspot regions
    let spotDetailNoiseScale = 0.4; // Noise for details within sunspots

    noiseDetail(7, 0.55); // Slightly higher detail for sun

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let nx = x / pg.width;
            let ny = y / pg.height;

            // Sphere mapping
            let angle = map(nx, 0, 1, -PI, PI);
            let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI);
            let refRadius = 100;
            let nCoordX = (1 + cos(vAngle) * cos(angle)) * refRadius;
            let nCoordY = (1 + cos(vAngle) * sin(angle)) * refRadius;
            let nCoordZ = (1 + sin(vAngle)) * refRadius;

            // --- Domain Warping (Swirl Effect) ---
            // Use one noise layer to offset the coordinates for the next layers
            let warpXNoise = noise(nCoordX * warpNoiseScale + seed1, nCoordY * warpNoiseScale + seed1 + 5);
            let warpYNoise = noise(nCoordX * warpNoiseScale + seed1 + 10, nCoordY * warpNoiseScale + seed1 + 15);
            let warpAmount = 15.0; // How much to distort coordinates
            let warpedX = nCoordX + (warpXNoise - 0.5) * warpAmount;
            let warpedY = nCoordY + (warpYNoise - 0.5) * warpAmount;
            let warpedZ = nCoordZ; // Keep Z for now

            // --- Plasma/Lava Flow Noise Layers (using warped coordinates) ---
            let plasmaLow = noise(warpedX * plasmaNoiseScaleLow + seed2, warpedY * plasmaNoiseScaleLow + seed2, warpedZ * plasmaNoiseScaleLow + seed2);
            let plasmaMid = noise(warpedX * plasmaNoiseScaleMid + seed2 + 10, warpedY * plasmaNoiseScaleMid + seed2 + 10, warpedZ * plasmaNoiseScaleMid + seed2 + 10);
            let plasmaHigh = noise(warpedX * plasmaNoiseScaleHigh + seed3, warpedY * plasmaNoiseScaleHigh + seed3, warpedZ * plasmaNoiseScaleHigh + seed3);

            // --- Sunspot Noise (using original coordinates for placement) ---
            let spotPlacement = noise(nCoordX * spotNoiseScale + seed3 + 20, nCoordY * spotNoiseScale + seed3 + 20, nCoordZ * spotNoiseScale + seed3 + 20);
            let spotDetail = noise(nCoordX * spotDetailNoiseScale + seed3 + 30, nCoordY * spotDetailNoiseScale + seed3 + 30, nCoordZ * spotDetailNoiseScale + seed3 + 30);

            // --- Color Blending ---
            // Base mix: blend between mid and cooler colors using large scale noise
            let baseMix = smoothstep(0.3, 0.7, plasmaLow);
            let finalColor = lerpColor(colorCool1, colorMid, baseMix);

            // Add hotter areas using medium scale noise, influenced by low scale
            let hotMix = constrain(plasmaMid * 1.5 - 0.5, 0, 1) * baseMix; // Hotter areas appear within brighter large flows
            finalColor = lerpColor(finalColor, colorHot2, hotMix);
            finalColor = lerpColor(finalColor, colorHot1, constrain(hotMix * plasmaHigh * 2.0 - 0.5, 0, 1)); // Brightest highlights

            // Add granulation/fine texture using high frequency noise
            let granuleMix = map(plasmaHigh, 0, 1, -0.2, 0.2); // Subtle brighten/darken
             finalColor = color(
                 red(finalColor) * (1.0 + granuleMix),
                 green(finalColor) * (1.0 + granuleMix),
                 blue(finalColor) * (1.0 + granuleMix)
             );

            // --- Apply Sunspots ---
            let spotThreshold = 0.68; // Higher threshold for less frequent spots
            let spotIntensity = 0.0;
             if (spotPlacement > spotThreshold) {
                 // Calculate intensity based on how far above threshold, creates shape
                 spotIntensity = smoothstep(spotThreshold, spotThreshold + 0.08, spotPlacement);
                 // Modulate with warped mid-freq noise to make edges less regular
                 spotIntensity *= constrain(1.0 - plasmaMid * 1.5, 0.2, 1.0);
                 spotIntensity = constrain(spotIntensity, 0, 1);
             }

            if (spotIntensity > 0.1) {
                // Blend towards the base sunspot color
                finalColor = lerpColor(finalColor, colorCool2, spotIntensity * 0.9);
                // Add very dark core using detail noise within the spot
                let spotCoreMix = constrain(spotDetail * 2.0 - 1.0, 0, 1) * spotIntensity;
                finalColor = lerpColor(finalColor, sunspotDetailColor, spotCoreMix * 0.7);
            }

            // --- Subtle Limb Darkening (Fake) ---
            // Darken pixels near the top/bottom edges of the texture map
            let limbFactor = 1.0 - pow(abs(ny - 0.5) * 2.0, 2.0) * 0.15; // 1 at equator, ~0.85 at poles
            finalColor = color(
                red(finalColor) * limbFactor,
                green(finalColor) * limbFactor,
                blue(finalColor) * limbFactor
            );
            // --- Final Pixel Assignment ---
            pg.pixels[index + 0] = constrain(red(finalColor), 0, 255);
            pg.pixels[index + 1] = constrain(green(finalColor), 0, 255);
            pg.pixels[index + 2] = constrain(blue(finalColor), 0, 255);
            pg.pixels[index + 3] = 255; // Sun texture is opaque
        }
    }
    noiseDetail(8, 0.5); // Reset noise detail
    pg.updatePixels();
    return pg;
}

// =====================================================================
// == MOON TEXTURE GENERATION FUNCTION ==
// =====================================================================
function createMoonTexture(moonType, moonRadius, craters) {
    let pg = createGraphics(MOON_TEXTURE_WIDTH, MOON_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.loadPixels();
    let baseSeed = random(50000, 60000);
    let craterSeed = random(60000, 70000);
    let lightAngle = -PI / 4; // For crater shading
    const MOON_NOISE_SCALE_LOW = NOISE_SCALE_LOW * 1.5;
    const MOON_NOISE_SCALE_MED = NOISE_SCALE_MED * 1.5;
    const MOON_NOISE_SCALE_HIGH = NOISE_SCALE_HIGH * 1.5;

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let nx = x / pg.width; let ny = y / pg.height;
            let r, g, b; let c;

            // Sphere mapping
            let angle = map(nx, 0, 1, -PI, PI); let vAngle = map(ny, 0, 1, -HALF_PI, HALF_PI);
            let refRadius = 50; // Reference radius for noise consistency
            let nCoordX = (1 + cos(vAngle) * cos(angle)) * refRadius;
            let nCoordY = (1 + cos(vAngle) * sin(angle)) * refRadius;
            let nCoordZ = (1 + sin(vAngle)) * refRadius;
            let noiseVal = noise(nCoordX * MOON_NOISE_SCALE_LOW + baseSeed, nCoordY * MOON_NOISE_SCALE_LOW + baseSeed, nCoordZ * MOON_NOISE_SCALE_LOW + baseSeed);
            let noiseMed = noise(nCoordX * MOON_NOISE_SCALE_MED + baseSeed + 10, nCoordY * MOON_NOISE_SCALE_MED + baseSeed + 10, nCoordZ * MOON_NOISE_SCALE_MED + baseSeed + 10);
            let noiseHigh = noise(nCoordX * MOON_NOISE_SCALE_HIGH + baseSeed + 20, nCoordY * MOON_NOISE_SCALE_HIGH + baseSeed + 20, nCoordZ * MOON_NOISE_SCALE_HIGH + baseSeed + 20);

            switch (moonType) {
                case MoonType.ROCKY_CRATERED:
                    let rockCol1 = color(160, 155, 150); let rockCol2 = color(80, 80, 80); let rockDetailCol = color(110, 105, 100);
                    c = lerpColor(rockCol2, rockCol1, noiseVal);
                    c = lerpColor(c, rockDetailCol, constrain(noiseMed * 1.5 - 0.5, 0, 0.4));
                    let grainAmt = constrain(noiseHigh * 0.5 - 0.1, 0, 0.1);
                    c = lerpColor(c, color(red(c)*0.9, green(c)*0.9, blue(c)*0.9), grainAmt); // Dark grain
                    c = lerpColor(c, color(red(c)*1.1, green(c)*1.1, blue(c)*1.1), grainAmt * 0.5); // Light grain highlights
                    break;
                case MoonType.ICY:
                    let iceCol1 = color(235, 240, 245); let iceCol2 = color(170, 185, 205); let crackCol = color(130, 145, 165); let streakCol = color(210, 215, 225);
                    c = lerpColor(iceCol2, iceCol1, noiseVal);
                    // Streaks across surface
                    let streakNoise = noise(nCoordX * MOON_NOISE_SCALE_MED * 3 + baseSeed + 30, nCoordY * MOON_NOISE_SCALE_MED * 0.5 + baseSeed + 30); // Elongated noise
                    c = lerpColor(c, streakCol, constrain(streakNoise * 1.5 - 0.6, 0, 0.3));
                    // Cracks based on high frequency noise
                    if (noiseHigh > 0.6) {
                        let crackMix = constrain((noiseHigh - 0.6) / 0.4, 0, 1);
                        // Modulate crack visibility with medium noise for irregularity
                        c = lerpColor(c, crackCol, crackMix * 0.4 * (noiseMed*0.5+0.5));
                    }
                    // Subtle highlights
                    c = lerpColor(c, iceCol1, constrain(noiseMed - 0.6, 0, 0.1));
                    break;
                case MoonType.VOLCANIC_MOON:
                    let volcCol1 = color(50, 40, 40); // Dark base rock
                    let volcCol2 = color(90, 80, 75); // Lighter rock/ash
                    let lavaColBright = color(255, 90, 10);
                    let lavaColDim = color(180, 40, 5);
                    let sulfurCol = color(240, 220, 80); // Yellow sulfur deposits

                    c = lerpColor(volcCol1, volcCol2, noiseVal * 1.2); // Base rock mix

                    // Sulfur deposits based on medium noise
                    let sulfurAmt = constrain(noiseMed * 2.0 - 1.0, 0, 0.3);
                    c = lerpColor(c, sulfurCol, sulfurAmt * constrain(noiseVal * 1.5 - 0.5, 0, 1)); // More sulfur on lighter rock

                    // Lava flows/pools based on high frequency noise
                    if (noiseHigh > 0.65) {
                        let lavaMix = constrain((noiseHigh - 0.65) / 0.35, 0, 1);
                        let currentLavaCol = lerpColor(lavaColDim, lavaColBright, noiseVal); // Brighter lava in brighter areas (more recent flow?)
                        c = lerpColor(c, currentLavaCol, lavaMix * 0.7);
                    }
                    break;
                default: c = color(128);
            }
            let baseMoonColor = c ? c : color(128); // Fallback
            let finalPixelColor = baseMoonColor;

            // --- Apply Craters (on top of base moon terrain) ---
            if (craters && craters.length > 0 && (moonType === MoonType.ROCKY_CRATERED || moonType === MoonType.VOLCANIC_MOON)) {
                 for (let i = craters.length - 1; i >= 0; i--) { // Iterate backwards for smaller craters on top
                    let crater = craters[i];
                    let dx = x - crater.x;
                    let dy = y - crater.y;
                    // Texture wrapping checks
                    if (abs(dx) > pg.width / 2) { dx = (dx > 0 ? dx - pg.width : dx + pg.width); }
                    // No vertical wrap needed for standard sphere map

                    let distSq = dx * dx + dy * dy; // Use squared distance

                    // Irregular shape
                    let angleToPixel = atan2(dy, dx);
                    let shapeNoiseVal = noise(cos(angleToPixel) * MOON_CRATER_SHAPE_NOISE_SCALE, sin(angleToPixel) * MOON_CRATER_SHAPE_NOISE_SCALE, crater.id);
                    let effectiveRadius = crater.radius * (1 + (shapeNoiseVal - 0.5) * MOON_CRATER_SHAPE_IRREGULARITY);
                    let effectiveRadiusSq = effectiveRadius * effectiveRadius;

                    const AA_HALF_WIDTH = ANTI_ALIAS_FACTOR / 2.0;

                    // Check if within potential crater range (including AA buffer)
                    if (distSq < (effectiveRadius + AA_HALF_WIDTH) * (effectiveRadius + AA_HALF_WIDTH)) {
                        let dist = sqrt(distSq); // Calculate exact distance
                        let modifiedColor = finalPixelColor; // Start with underlying color

                        if (dist < effectiveRadius) { // Inside the main depression
                             let currentCraterColor = finalPixelColor; // Sample color before modification
                             let angleDiff = atan2(sin(angleToPixel - lightAngle), cos(angleToPixel - lightAngle)); // Angle relative to light
                             let rimWidth = effectiveRadius * 0.15;
                             let isRim = (dist > effectiveRadius - rimWidth);

                             let brightnessFactor = 1.0;
                             let darknessFactor = 1.0;

                             if(isRim) { // Rim lighting
                                 brightnessFactor *= lerp(1.0, CRATER_RIM_BRIGHTNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff) * 0.6 + 0.4, 0.1, 1.0));
                                 darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff+PI) * 0.6 + 0.4, 0.1, 1.0));
                             } else { // Floor lighting
                                 let floorFactor = constrain(dist / (effectiveRadius - rimWidth), 0, 1); // 0 at center, 1 at rim edge
                                 darknessFactor *= lerp(CRATER_FLOOR_DARKNESS, 1.0, floorFactor) * MOON_CRATER_INTENSITY; // Darker towards center
                                 darknessFactor *= lerp(1.0, CRATER_SHADOW_DARKNESS * MOON_CRATER_INTENSITY, constrain(cos(angleDiff + PI) * 0.5 + 0.5, 0.1, 1.0)); // General shadow
                             }
                             modifiedColor = color(red(currentCraterColor)*brightnessFactor*darknessFactor, green(currentCraterColor)*brightnessFactor*darknessFactor, blue(currentCraterColor)*brightnessFactor*darknessFactor);

                             // Blend slightly with original terrain for texture
                             let blendNoise = noise(x * 0.2 + crater.id + 50, y * 0.2 + crater.id + 50);
                             modifiedColor = lerpColor(modifiedColor, currentCraterColor, constrain(blendNoise * 0.2 - 0.05, 0, 0.1));
                        } // end if inside effective radius

                        // Anti-aliasing
                        let craterEdgeOuter = effectiveRadius + AA_HALF_WIDTH;
                        let craterEdgeInner = effectiveRadius - AA_HALF_WIDTH;

                        if (dist > craterEdgeInner) { // In AA zone
                            let aaFactor = smoothstep(craterEdgeOuter, craterEdgeInner, dist); // 1 inside inner, 0 outside outer
                            finalPixelColor = lerpColor(finalPixelColor, modifiedColor, aaFactor);
                        } else { // Fully inside crater (or inner edge)
                            finalPixelColor = modifiedColor;
                        }
                    } // End crater range check
                 } // End crater loop
            } // End crater application check

            // Final pixel assignment
            if (finalPixelColor) {
                r = red(finalPixelColor); g = green(finalPixelColor); b = blue(finalPixelColor);
            } else { // Error fallback
                console.error("Moon Color undefined", x, y);
                r = 255; g = 0; b = 255;
            }
            pg.pixels[index + 0] = constrain(r, 0, 255);
            pg.pixels[index + 1] = constrain(g, 0, 255);
            pg.pixels[index + 2] = constrain(b, 0, 255);
            pg.pixels[index + 3] = 255; // Moon texture is opaque
        }
    }
    pg.updatePixels();
    return pg;
}

// ==============================================================
// == DEFINE BACKGROUND OBJECT PALETTES FUNCTION ==
// ==============================================================
// ++ Tweaked palettes for more vibrancy/contrast ++
function defineBGObjectPalettes() {
    // --- Spiral Palettes ---
    bgObjectPalettes[BGObjectType.SPIRAL] = [
        { core: color(230, 230, 255), arm1: color(120, 140, 220, 210), arm2: color(190, 170, 230, 160), dust: color(45, 45, 65, 120) }, // Vibrant Blue/Purple
        { core: color(255, 235, 190), arm1: color(160, 160, 190, 190), arm2: color(210, 190, 170, 150), dust: color(60, 50, 45, 130) }, // Brighter Golden Core
        { core: color(250, 250, 250), arm1: color(190, 190, 200, 180), arm2: color(220, 220, 230, 150), dust: color(80, 80, 80, 100) }  // Whiter/Higher Contrast
    ];

    // --- Elliptical Palettes ---
    bgObjectPalettes[BGObjectType.ELLIPTICAL] = [
        { core: color(255, 225, 170), mid: color(210, 190, 150, 160), outer: color(160, 140, 110, 90) }, // Yellow/Orange dominant
        { core: color(245, 245, 230), mid: color(220, 220, 190, 170), outer: color(180, 180, 160, 100) }, // Creamy White dominant
        { core: color(255, 200, 180), mid: color(220, 160, 150, 150), outer: color(170, 120, 110, 80) }  // Reddish dominant
    ];

    // --- Nebula Palettes ---
    bgObjectPalettes[BGObjectType.NEBULA] = [
        { primary: color(240, 70, 100, 190), secondary: color(190, 50, 70, 130), highlight: color(255, 160, 180, 60), dust: color(35, 25, 30, 160) }, // Brighter Emission Nebula (H-alpha)
        { primary: color(90, 160, 250, 180), secondary: color(60, 110, 200, 140), highlight: color(190, 220, 255, 70), dust: color(45, 45, 55, 150) }, // Brighter Reflection Nebula (Blue)
        { primary: color(110, 210, 190, 170), secondary: color(70, 160, 140, 120), highlight: color(190, 250, 230, 50), dust: color(40, 50, 45, 140) }, // Greenish Nebula (Oxygen?)
        { primary: color(190, 100, 230, 185), secondary: color(150, 70, 190, 135), highlight: color(230, 170, 255, 65), dust: color(45, 35, 50, 155) }  // Vibrant Purple/Mixed Nebula
    ];

    console.log("Defined background object palettes.");
}


// ==============================================================
// == BACKGROUND OBJECT TEXTURE GENERATION FUNCTION ==
// ==============================================================
// ++ Improved Alpha Handling & Edge Fade ++
function createBGObjectTexture(type, palette, params = {}) {
    let pg = createGraphics(BG_OBJECT_TEXTURE_WIDTH, BG_OBJECT_TEXTURE_HEIGHT);
    pg.pixelDensity(1);
    pg.colorMode(RGB, 255); // Ensure RGB mode
    pg.background(0, 0); // Start transparent black
    pg.loadPixels();
    let seed = random(80000, 100000);
    let centerX = pg.width / 2;
    let centerY = pg.height / 2;
    let maxDistRadius = min(centerX, centerY); // Use radius for circular fade

    // Noise settings
    noiseDetail(params.noiseOctaves || 6, params.noisePersistence || 0.55);

    for (let y = 0; y < pg.height; y++) {
        for (let x = 0; x < pg.width; x++) {
            let index = (x + y * pg.width) * 4;
            let dx = x - centerX; let dy = y - centerY;
            let distFromCenter = sqrt(dx * dx + dy * dy);
            let angle = atan2(dy, dx);
            let normDist = distFromCenter / maxDistRadius; // 0 at center, 1 at edge radius

            let finalColorAccum = color(0, 0, 0, 0); // Accumulator for color, starts transparent black
            let accumulatedAlpha = 0; // Track total alpha contribution

            // === TYPE-SPECIFIC LOGIC ===
            if (type === BGObjectType.SPIRAL) {
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

                let coreRadialBrightness = pow(max(0, 1.0 - normDist), coreFadePower);
                let coreMix = constrain(coreNoiseVal * 1.6 * coreFocusFactor - 0.4, 0, 1) * coreRadialBrightness;
                finalColorAccum = lerpColor(finalColorAccum, palette.core, coreMix); // Blend core color
                accumulatedAlpha = max(accumulatedAlpha, alpha(palette.core) * coreMix); // Update max alpha

                let armRadialBrightness = pow(max(0, 1.0 - normDist), armFadePower);
                let armMixBase = pow(armNoiseVal, armDefinition) * 1.5;
                let armMix = constrain(armMixBase - 0.1, 0, 1) * armRadialBrightness * (1.0 - coreMix * 0.6); // Reduce arm brightness in core
                let armLerp = constrain(detailNoiseVal, 0.1, 0.9);
                let currentArmColor = lerpColor(palette.arm1, palette.arm2, armLerp);
                finalColorAccum = lerpColor(finalColorAccum, currentArmColor, armMix * 0.8); // Blend arm color
                accumulatedAlpha = max(accumulatedAlpha, alpha(currentArmColor) * armMix * 0.8);

                let dustMix = constrain((1.0 - armNoiseVal) * detailNoiseVal * 1.8 - 0.6, 0, 1);
                dustMix *= armRadialBrightness * (1.0 - coreMix); // Dust mainly outside core
                finalColorAccum = lerpColor(finalColorAccum, palette.dust, dustMix * 0.6); // Blend dust color
                accumulatedAlpha = max(accumulatedAlpha, alpha(palette.dust) * dustMix * 0.6);

            } else if (type === BGObjectType.ELLIPTICAL) {
                let coreFocusFactor = params.coreFocusFactor || random(1.5, 3.5);
                let coreFadePower = BG_BASE_FADE_POWER / coreFocusFactor;

                let coreNoiseVal = noise((dx * BG_NOISE_SCALE_CORE * 0.8) + seed, (dy * BG_NOISE_SCALE_CORE * 0.8) + seed + 5);
                let detailNoiseVal = noise((dx * BG_NOISE_SCALE_SPIRAL_DETAIL * 0.5) + seed + 30, (dy * BG_NOISE_SCALE_SPIRAL_DETAIL * 0.5) + seed + 30);

                let radialBrightness = pow(max(0, 1.0 - normDist), coreFadePower);
                let coreMix = constrain(coreNoiseVal * 1.2 * coreFocusFactor - 0.1, 0, 1) * radialBrightness;
                let midMix = constrain(detailNoiseVal * 1.5 - 0.5, 0, 1) * pow(max(0, 1.0 - normDist), coreFadePower * 0.6) * (1.0 - coreMix * 0.8);
                let outerMix = pow(max(0, 1.0 - normDist), coreFadePower * 0.4) * (1.0 - coreMix * 0.9 - midMix * 0.5);

                finalColorAccum = lerpColor(finalColorAccum, palette.core, coreMix);
                accumulatedAlpha = max(accumulatedAlpha, alpha(palette.core) * coreMix);
                finalColorAccum = lerpColor(finalColorAccum, palette.mid, midMix);
                accumulatedAlpha = max(accumulatedAlpha, alpha(palette.mid) * midMix);
                finalColorAccum = lerpColor(finalColorAccum, palette.outer, constrain(outerMix, 0, 1));
                accumulatedAlpha = max(accumulatedAlpha, alpha(palette.outer) * constrain(outerMix, 0, 1));

            } else if (type === BGObjectType.NEBULA) {
                let density = params.density || random(0.6, 1.3);
                let clumpiness = params.clumpiness || random(1.0, 3.0);
                // filamentFactor is implicit in noise scale choices

                let baseNoise = noise(dx * BG_NOISE_SCALE_NEBULA_BASE + seed, dy * BG_NOISE_SCALE_NEBULA_BASE + seed + 5);
                let midNoise = noise(dx * BG_NOISE_SCALE_NEBULA_MID + seed + 10, dy * BG_NOISE_SCALE_NEBULA_MID + seed + 15);
                let detailNoise = noise(dx * BG_NOISE_SCALE_NEBULA_DETAIL + seed + 20, dy * BG_NOISE_SCALE_NEBULA_DETAIL + seed + 25);

                let structure = (baseNoise * 0.6 + midNoise * 0.4) * density;
                structure = pow(structure, clumpiness); // Enhance contrast/clumpiness

                let colorMixNoise = midNoise * 0.7 + detailNoise * 0.3;
                let primaryMix = constrain(structure * 1.5 - 0.2, 0, 1);
                let secondaryMix = constrain(structure * (1.0 - midNoise) * 1.2 - 0.4, 0, 1) * (1.0 - primaryMix * 0.5);
                let highlightMix = constrain(detailNoise * midNoise * 2.0 - 1.0, 0, 1) * structure * 0.5;
                let dustMix = constrain((1.0 - structure) * detailNoise * 1.5 - 0.6, 0, 1) * 0.7;

                // Use additive blending concept: layer colors based on their mix factors
                let rAccum = 0, gAccum = 0, bAccum = 0, aAccum = 0;
                let totalMix = 0;

                function addColor(c, mix) {
                    if (mix <= 0) return;
                    let a = alpha(c) / 255.0 * mix;
                    rAccum += red(c) * a;
                    gAccum += green(c) * a;
                    bAccum += blue(c) * a;
                    aAccum = max(aAccum, alpha(c)/255.0 * mix); // Track max individual alpha contribution
                    totalMix += mix; // Track total mix factor (can exceed 1)
                }

                addColor(palette.dust, dustMix); // Add dust first (usually darker)
                addColor(palette.secondary, secondaryMix);
                addColor(palette.primary, primaryMix);
                addColor(palette.highlight, highlightMix); // Add highlights last

                 // Normalize color if totalMix > 0, otherwise keep black transparent
                 if (totalMix > 0) {
                      // Simple average based on contribution (might wash out, but prevents oversaturation)
                     // finalColorAccum = color(rAccum / totalMix, gAccum / totalMix, bAccum / totalMix);

                      // Alternative: Cap brightness but preserve hue (complex)
                      // Let's stick to a simpler capped accumulation for now
                      finalColorAccum = color(constrain(rAccum, 0, 255), constrain(gAccum, 0, 255), constrain(bAccum, 0, 255));


                     // Nebula alpha is more complex - base it on structure and detail
                     accumulatedAlpha = constrain(structure * 200 + detailNoise * 100, 0, 255); // Base alpha on structure/detail
                     accumulatedAlpha *= constrain(aAccum * 1.2 , 0.8, 1.5); // Modulate by mixed color alpha contribution
                     accumulatedAlpha = constrain(accumulatedAlpha, 0, 255);
                 } else {
                      finalColorAccum = color(0, 0, 0, 0);
                      accumulatedAlpha = 0;
                 }

            } // End Type Check

            // +++ Apply Global Edge Fade Alpha Multiplier +++
            let edgeFadeMultiplier = smoothstep(BG_EDGE_FADE_END, BG_EDGE_FADE_START, normDist); // 1 inside start, 0 outside end
            let finalAlpha = accumulatedAlpha * edgeFadeMultiplier; // Apply fade to the calculated alpha

            // Assign pixel colors
            pg.pixels[index + 0] = red(finalColorAccum);
            pg.pixels[index + 1] = green(finalColorAccum);
            pg.pixels[index + 2] = blue(finalColorAccum);
            pg.pixels[index + 3] = constrain(finalAlpha, 0, 255); // Apply final calculated alpha
        }
    }
    noiseDetail(8, 0.5); // Reset noise detail
    pg.updatePixels();
    return pg;
}

// ==============================================================
// == SETUP STARS FUNCTION ==
// ==============================================================
// ++ Added Color and Size Variation ++
function setupStars() {
    console.log(`Generating ${STAR_COUNT} stars...`);
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        let starRadius = random(STAR_FIELD_MIN_RADIUS, STAR_FIELD_MAX_RADIUS);
        let theta = random(TWO_PI);
        let phi = acos(random(-1, 1)); // Correct spherical distribution
        let x = starRadius * sin(phi) * cos(theta);
        let y = starRadius * sin(phi) * sin(theta);
        let z = starRadius * cos(phi);
        let baseBrightness = random(STAR_MIN_BASE_BRIGHTNESS, STAR_MAX_BASE_BRIGHTNESS);
        let noiseOffset = random(10000);

        // Determine star color
        let starColor;
        let rColor = random();
        if (rColor < STAR_COLOR_PROB_WHITE) {
            starColor = color(255, 255, 255); // White
        } else if (rColor < STAR_COLOR_PROB_WHITE + STAR_COLOR_PROB_YELLOW) {
            starColor = color(255, 255, 200); // Yellowish
        } else if (rColor < STAR_COLOR_PROB_WHITE + STAR_COLOR_PROB_YELLOW + STAR_COLOR_PROB_BLUE) {
            starColor = color(200, 220, 255); // Bluish
        } else {
            starColor = color(255, 200, 180); // Reddish/Orangish
        }

        // Determine star size based on brightness
        let starSize = map(baseBrightness, STAR_MIN_BASE_BRIGHTNESS, STAR_MAX_BASE_BRIGHTNESS, STAR_MIN_POINT_SIZE, STAR_MAX_POINT_SIZE);
        // Add slight random variation to size
        starSize *= random(0.8, 1.2);
        starSize = constrain(starSize, STAR_MIN_POINT_SIZE * 0.8, STAR_MAX_POINT_SIZE * 1.2);


        stars.push({ x, y, z, baseBrightness, noiseOffset, color: starColor, size: starSize });
    }
}

// ==============================================================
// == SETUP BACKGROUND OBJECTS FUNCTION ==
// ==============================================================
// [ No changes needed here, relies on updated createBGObjectTexture and palettes ]
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

        // Set type-specific generation parameters
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
            params.noiseOctaves = 7; // Nebulae benefit from more detail
            params.noisePersistence = 0.6;
        }

        let texture = createBGObjectTexture(objectType, selectedPalette, params);

        // Position and size
        let distance = random(BG_OBJECT_MIN_DISTANCE, BG_OBJECT_MAX_DISTANCE);
        let size = random(BG_OBJECT_MIN_SIZE, BG_OBJECT_MAX_SIZE);
        if (objectType === BGObjectType.NEBULA) {
            // Nebulae tend to be larger and less defined
            size *= random(1.2, 1.8);
            size = constrain(size, BG_OBJECT_MIN_SIZE, BG_OBJECT_MAX_SIZE * 1.5);
        }
        let theta = random(TWO_PI);
        let phi = acos(random(-1, 1)); // Correct spherical distribution
        let x = distance * sin(phi) * cos(theta);
        let y = distance * sin(phi) * sin(theta);
        let z = distance * cos(phi);

        // Random orientation and slow rotation
        let rotX = random(TWO_PI);
        let rotY = random(TWO_PI);
        let rotZ = random(TWO_PI);
        let rotationSpeed = random(-BG_OBJECT_MAX_ROTATION_SPEED, BG_OBJECT_MAX_ROTATION_SPEED) * (objectType === BGObjectType.NEBULA ? 0.5 : 1.0); // Nebulae rotate slower maybe?

        backgroundObjects.push({
            type: objectType,
            texture: texture,
            position: createVector(x, y, z),
            size: size,
            rotationX: rotX,
            rotationY: rotY, // This axis will be animated
            rotationZ: rotZ,
            rotationSpeed: rotationSpeed
        });
    }
     console.log("Finished generating background objects.");
}

// ==============================================================
// == DRAW STARS FUNCTION ==
// ==============================================================
// ++ Uses star color and size ++
function drawStars() {
    push();
    // Disable depth testing for stars so they don't get hidden by closer transparent objects easily
    // gl.disable(gl.DEPTH_TEST); // Optional, can cause issues if not managed carefully

    // Use stroke for POINTS size control
    strokeWeight(1); // Default, will be overridden per star

    let timeFactor = frameCount * STAR_VIBRATION_SPEED;

    beginShape(POINTS);
    for (const star of stars) {
        let brightnessNoise = noise(star.noiseOffset + timeFactor);
        // Make vibration slightly more pronounced
        let brightnessMultiplier = map(brightnessNoise, 0, 1, 1.0 - STAR_VIBRATION_AMOUNT * 1.2, 1.0 + STAR_VIBRATION_AMOUNT * 1.2);
        let currentBrightness = star.baseBrightness * brightnessMultiplier;

        // Combine base color with brightness
        let finalColor = color(
            red(star.color) * (currentBrightness / 200), // Normalize brightness effect roughly
            green(star.color) * (currentBrightness / 200),
            blue(star.color) * (currentBrightness / 200),
            map(currentBrightness, STAR_MIN_BASE_BRIGHTNESS*0.5, STAR_MAX_BASE_BRIGHTNESS*1.2, 150, 255) // Alpha based on brightness
        );

        // --- FIX ---
        // Use strokeWeight to control point size and stroke() to set color
        strokeWeight(star.size);
        stroke(finalColor);
        // --- END FIX ---

        vertex(star.x, star.y, star.z);
    }
    endShape();

    // Re-enable depth testing if disabled
    // gl.enable(gl.DEPTH_TEST);
    pop();
}

// ==============================================================
// == DRAW BACKGROUND OBJECTS FUNCTION ==
// ==============================================================
// ++ Uses blendMode ADD for brighter appearance ++
function drawBackgroundObjects() {
    push();
    noStroke();
    textureMode(NORMAL); // Ensure texture coords are 0-1

    // Use ADD blend mode to make overlapping transparent areas brighter (more nebula/galaxy like)
    blendMode(ADD);
    // Disable depth writing so closer transparent objects don't fully occlude farther ones
    gl.depthMask(false);

    for (let obj of backgroundObjects) {
        push();
        translate(obj.position.x, obj.position.y, obj.position.z);
        // Apply orientation
        rotateX(obj.rotationX);
        rotateZ(obj.rotationZ);
        rotateY(obj.rotationY); // Animate this axis

        texture(obj.texture);
        plane(obj.size, obj.size); // Draw as a textured plane facing the camera (usually)

        pop();

        // Update rotation for next frame
        obj.rotationY += obj.rotationSpeed;
    }

    // Reset blend mode and depth mask
    gl.depthMask(true);
    blendMode(BLEND);
    pop();
}


// ==============================================================
// == DRAW FUNCTION ==
// ==============================================================
function draw() {
    background(0, 0, 5); // Very dark blue instead of pure black
    orbitControl(); // Allows mouse control for camera

    // ++ Draw background elements first (farther away) ++
    drawBackgroundObjects();
    drawStars();


    // --- Lighting Setup ---
    let sunWorldPositions = [];
    // Reduce base ambient light slightly to make suns pop more
    let calculatedAmbient = color(8, 8, 10);

    for (let sun of suns) {
        // Calculate sun's world position based on orbit
        let orbX = sun.orbitRadius * cos(sun.orbitAngle);
        let orbZ = sun.orbitRadius * sin(sun.orbitAngle);
        // Apply orbital tilt (simplified rotation)
        let pos = createVector(orbX, 0, orbZ);
        let cZ = cos(sun.orbitTiltZ); let sZ = sin(sun.orbitTiltZ);
        let cX = cos(sun.orbitTiltX); let sX = sin(sun.orbitTiltX);
        // Rotate around Z first, then X
        let x1 = pos.x * cZ - pos.y * sZ;
        let y1 = pos.x * sZ + pos.y * cZ;
        let z1 = pos.z;
        let y2 = y1 * cX - z1 * sX;
        let z2 = y1 * sX + z1 * cX;
        let finalPos = createVector(x1, y2, z2);

        sunWorldPositions.push(finalPos);

        // Update sun's orbit and rotation for next frame
        sun.orbitAngle += sun.orbitSpeed;
        sun.axialRotationY += sun.axialRotationSpeed;
    }

    ambientLight(calculatedAmbient);
    // Add point lights for each sun
    for (let i = 0; i < suns.length; i++) {
        pointLight(suns[i].color, sunWorldPositions[i].x, sunWorldPositions[i].y, sunWorldPositions[i].z);
    }

    // --- Draw Suns ---
    noStroke();
    for (let i = 0; i < suns.length; i++) {
        let sun = suns[i];
        push();
        // Go to sun's world position
        translate(sunWorldPositions[i].x, sunWorldPositions[i].y, sunWorldPositions[i].z);
        // Apply axial rotation
        rotateY(sun.axialRotationY);

        texture(sun.texture);
        let emissiveR = lerp(red(sun.color), 255, 0.3);
        let emissiveG = lerp(green(sun.color), 255, 0.3);
        let emissiveB = lerp(blue(sun.color), 255, 0.1);
        emissiveMaterial(emissiveR, emissiveG, emissiveB);
        sphere(sun.size, 48, 48); // Increased detail sphere for sun
        pop();
    }

    // --- Draw Planet and Moons ---
    push(); // Isolate planet system transforms

    // -- Planet --
    push();
    // Apply planet's axial tilt and rotation
    rotateZ(planet.tiltZ);
    rotateX(planet.tiltX);
    rotateY(planet.rotationY);

    noStroke();

    // Planet main body
    texture(planetTexture);
    if (planet.type === PlanetType.VOLCANIC) {
        // Volcanic planets might have glowing lava parts - use a mix of ambient and emissive maybe?
        // Simple approach: make it slightly less dark in shadows
        ambientMaterial(220, 220, 220); // More responsive to ambient
        // Could potentially add a very faint emissive lava color if desired
        // emissiveMaterial(50, 10, 0); // Faint red glow
    } else if (planet.type === PlanetType.GAS_GIANT) {
        ambientMaterial(250, 250, 250); // Gas giants reflect ambient light well
    }
    else {
        specularMaterial(80, 80, 80); // Add some specular highlights for water/ice/rock
        shininess(20); // Adjust shininess
    }
    sphere(planet.radius, 48, 48); // High detail sphere

    // -- Planet Atmosphere (if not gas giant) --
    // Rendered after the main sphere, slightly larger, semi-transparent
     if (planet.type !== PlanetType.GAS_GIANT) {
        push();
        // Use additive blend for a glow effect
        blendMode(ADD);
        gl.depthMask(false); // Don't write to depth buffer

        fill(planet.atmosphereColor); // Use the predefined atmosphere color
        sphere(planet.radius * PLANET_ATMOSPHERE_FACTOR, 48, 48);

        gl.depthMask(true); // Restore depth writing
        blendMode(BLEND); // Restore blend mode
        pop();
    }

     // -- Planet Clouds (if applicable) --
     if (planet.hasClouds && cloudTexture) {
         push();
         // Rotate clouds slightly differently from the planet surface
         rotateY(planet.cloudRotationY - planet.rotationY); // Apply relative rotation
         texture(cloudTexture);
         // Use transparency - disable depth writing to see clouds on both sides
         gl.depthMask(false);
         // Maybe use normal material for clouds? Or ambient?
         ambientMaterial(255); // Make clouds bright
         sphere(planet.radius * PLANET_CLOUD_FACTOR, 48, 48);
         gl.depthMask(true); // Restore depth writing
         pop();
     }


    pop(); // End planet transforms (main body, atmos, clouds)


    // -- Planet Rings (if applicable) --
    if (planet.hasRings && ringTexture) {
        push();
         // Rings align with planet's tilt, but not its rotationY
         rotateZ(planet.tiltZ);
         rotateX(planet.tiltX);
         // Rings are usually in the equatorial plane (rotate 90 deg on X)
         rotateX(HALF_PI);

        texture(ringTexture);
        ambientMaterial(255); // Rings should be bright
        // Disable culling to see rings from below
        // gl.disable(gl.CULL_FACE); // Requires WebGL context
         noStroke();
         // Use a torus or build geometry. Easiest is a plane mapped with ring texture.
         let innerR = planet.radius * GAS_GIANT_RING_INNER_RADIUS_FACTOR;
         let outerR = planet.radius * GAS_GIANT_RING_OUTER_RADIUS_FACTOR;
         // Draw a flat ring using a textured plane (simplest)
         // Or better: use beginShape/endShape to draw an annulus
         let ringDetail = 64; // Number of segments in the ring
         beginShape(TRIANGLE_STRIP);
         for (let i = 0; i <= ringDetail; i++) {
             let angle = map(i, 0, ringDetail, 0, TWO_PI);
             let cosA = cos(angle);
             let sinA = sin(angle);
             // Map texture coordinate (radial)
             let u = 0; // Inner edge texture coord
             vertex(innerR * cosA, innerR * sinA, 0, u, 0); // Inner vertex (u=0, v=0)
             u = 1; // Outer edge texture coord
             vertex(outerR * cosA, outerR * sinA, 0, u, 1); // Outer vertex (u=1, v=1 - or adjust v as needed)
         }
         endShape();

        // Re-enable culling if disabled
        // gl.enable(gl.CULL_FACE);
        pop(); // End ring transforms
    }


    // Update planet rotation for next frame
    planet.rotationY += planet.rotationSpeed;
    planet.cloudRotationY += planet.cloudRotationSpeed; // Update cloud rotation


    // -- Moons --
    for (let moon of moons) {
        push();
        // Apply moon's orbital tilt AND position
        // Simplified: Tilt the whole orbit plane first
        rotateZ(moon.orbitTiltZ);
        rotateX(moon.orbitTiltX);
        // Position the moon along its orbit within the tilted plane
        let moonX = moon.orbitRadius * cos(moon.orbitAngle);
        let moonZ = moon.orbitRadius * sin(moon.orbitAngle);
        translate(moonX, 0, moonZ); // Position adjusted for orbit tilt later if needed

        // Apply moon's axial tilt and rotation (relative to its orbital position)
        rotateZ(moon.axialTiltZ);
        rotateX(moon.axialTiltX);
        rotateY(moon.rotationY);

        noStroke();
        texture(moon.texture);
         if (moon.type === MoonType.VOLCANIC_MOON) {
             ambientMaterial(200); // Similar to volcanic planet
             // emissiveMaterial(40, 5, 0); // Faint glow
        } else if (moon.type === MoonType.ICY){
             specularMaterial(150, 150, 180); // Icy moons are reflective
             shininess(30);
        }
        else { // Rocky
            specularMaterial(100); // Standard rocky moon
            shininess(15);
        }
        sphere(moon.radius, 24, 24); // Lower detail for moons is fine

        pop(); // End moon transforms

        // Update moon orbit and rotation for next frame
        moon.orbitAngle += moon.orbitSpeed;
        moon.rotationY += moon.rotationSpeed;
    }

    pop(); // End Planet System Isolation

} // === END DRAW ===

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Recalculate perspective on resize
    let maxDist = BG_OBJECT_MAX_DISTANCE * 1.2;
    let camFOV = PI / 3.0;
    let camAspect = width / height;
    let camNear = 0.1;
    let camFar = maxDist * 2; // Ensure far plane includes background objects
    perspective(camFOV, camAspect, camNear, camFar);
}