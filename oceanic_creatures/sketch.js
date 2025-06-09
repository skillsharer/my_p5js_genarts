// This generative art is inspired by the work of https://x.com/yuruyurau.
function getCreatureColor() {
  const palettes = [
    { // Electric jellyfish
      base: color(20, 150, 255, 40),    // Soft blue base
      core: color(0, 255, 255, 180)     // Cyan core with high alpha
    },
    { // Deep sea spirit
      base: color(147, 0, 255, 40),     // Deep purple base
      core: color(255, 0, 255, 180)     // Magenta core
    },
    { // Abyssal wanderer
      base: color(255, 100, 0, 40),     // Orange base
      core: color(255, 255, 0, 180)     // Yellow core
    },
    { // Bio-luminescent phantom
      base: color(0, 255, 100, 40),     // Green base
      core: color(150, 255, 0, 180)     // Lime core
    },
    { // Crystal creature
      base: color(100, 200, 255, 40),   // Light blue base
      core: color(255, 255, 255, 180)   // White core
    },
    { // Deep sea phoenix
      base: color(255, 0, 100, 40),     // Pink base
      core: color(255, 150, 0, 180)     // Golden core
    }
  ];
  return palettes[Math.floor($fx.rand() * palettes.length)];
}

class OceanicCreature {
  constructor() {
    this.t = 0;
    this.buffer = createGraphics(width, height);
  }

  draw(x, y) {
  }

  update() {
  }

  wrapAround(pointX, pointY) {
    if (pointX < 0) {
      pointX += width;
    } else if (pointX > width) {
      pointX -= width;
    }
    if (pointY < 0) {
      pointY += height;
    } else if (pointY > height) {
      pointY -= height;
    }
    return [pointX, pointY];
  }
}

class JellyFish extends OceanicCreature {
  constructor() {
    super();
    this.t = 0;
    this.speed = Math.floor($fx.rand() * 30) + 10;
    this.startX = $fx.rand() * width;
    this.startY = $fx.rand() * height;
    this.colors = getCreatureColor();
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
    this.xOff = $fx.rand() * 100;
    this.yOff = $fx.rand() * 1000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.loadPixels(); // Load pixels for direct manipulation

    for (let j = 0; j < 10000; j++) {
      const baseX = j % 400;
      const baseY = j / 43;
      const k = 5 * cos(baseX / 14) * cos(baseY / 30);
      const e = baseY / 8 - 13;
      const d = mag(k, e) ** 2 / 59 + 4;
      const c = d / 2 + e / 99 - this.t / 18;
      const q = 60 - 3 * sin(atan2(k, e) * e) + k * (3 + 4 / d * sin(d * d - this.t * 2));

      let pointX = this.rotation_direction * q * sin(c);
      let pointY = (q + d * 9) * cos(c);

      pointX += this.startX;
      pointY += this.startY;
      [pointX, pointY] = this.wrapAround(pointX, pointY);

      // Dynamic color based on distance from center
      let distFromCenter = dist(pointX, pointY, this.startX, this.startY);
      let colorMix = constrain(
              map(sin(distFromCenter * 0.05 + this.t), -1, 1, 0, 0.7), // Reduced max mix
              0,
              0.7
            );      
      let pointColor = lerpColor(this.colors.base, this.colors.core, colorMix);      
      
      // Directly manipulate pixels for additive blending effect
      let ix = floor(pointX);
      let iy = floor(pointY);

      if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
        let pixIndex = (iy * width + ix) * 4;

        let r = red(pointColor);
        let g = green(pointColor);
        let b = blue(pointColor);
        // let a = alpha(pointColor); // Alpha of the point color is not directly used in this pixel add method

        this.buffer.pixels[pixIndex] = min(255, this.buffer.pixels[pixIndex] + r);
        this.buffer.pixels[pixIndex + 1] = min(255, this.buffer.pixels[pixIndex + 1] + g);
        this.buffer.pixels[pixIndex + 2] = min(255, this.buffer.pixels[pixIndex + 2] + b);
        this.buffer.pixels[pixIndex + 3] = 255; // Set alpha to opaque
      }
    }

    this.buffer.updatePixels(); // Update the buffer
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / this.speed;
    this.startX = map(noise(this.xOff), 0, 1, 0, width);
    this.startY = map(noise(this.yOff), 0, 1, 0, height);
    this.xOff += 0.001; // Speed of horizontal drift
    this.yOff += 0.001; // Speed of vertical drift
  }
}

class SeaSpirit extends OceanicCreature {
  constructor() {
    super();
    this.t = 0;
    this.speed = Math.floor($fx.rand() * 30) + 10;
    this.startX = $fx.rand() * width;
    this.startY = $fx.rand() * height;
    this.colors = getCreatureColor();
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
    this.xOff = $fx.rand() * 200;
    this.yOff = $fx.rand() * 2000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.loadPixels(); // Load pixels for direct manipulation

    for (let i = 0; i < 10000; i++) {
      const x = i % 200;
      const y = i / 55;

      const k = 9 * cos(x / 8);
      const e = y / 8 - 12.5;
      const d = mag(k, e) ** 2 / 99 + sin(this.t) / 6 + 0.5;
      const c = d / 2 + e / 69 - this.t / 16;
      const q = this.rotation_direction * (99 - e * sin(atan2(k, e) * 7) / d + k * (3 + cos(d * d - this.t) * 2));
      let pointX = q * sin(c);
      let pointY = (q + 19 * d) * cos(c);
      pointX += this.startX;
      pointY += this.startY;
      [pointX, pointY] = this.wrapAround(pointX, pointY);
      let distFromCenter = dist(pointX, pointY, this.startX, this.startY);
      let colorMix = constrain(
        map(cos(distFromCenter * 0.03 + this.t), -1, 1, 0, 0.6),
        0,
        0.6
      );
      let pointColor = lerpColor(this.colors.base, this.colors.core, colorMix);
      
      // Directly manipulate pixels for additive blending effect
      let ix = floor(pointX);
      let iy = floor(pointY);

      if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
        let pixIndex = (iy * width + ix) * 4;

        let r = red(pointColor);
        let g = green(pointColor);
        let b = blue(pointColor);

        this.buffer.pixels[pixIndex] = min(255, this.buffer.pixels[pixIndex] + r);
        this.buffer.pixels[pixIndex + 1] = min(255, this.buffer.pixels[pixIndex + 1] + g);
        this.buffer.pixels[pixIndex + 2] = min(255, this.buffer.pixels[pixIndex + 2] + b);
        this.buffer.pixels[pixIndex + 3] = 255; // Set alpha to opaque
      }
    }
    this.buffer.updatePixels(); // Update the buffer
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / 45;
    this.startX = map(noise(this.xOff), 0, 1, 0, width);
    this.startY = map(noise(this.yOff), 0, 1, 0, height);
    this.xOff += 0.0008; // Speed of horizontal drift
    this.yOff += 0.0008; // Speed of vertical drift
  }
}

class SeaWanderer extends OceanicCreature {
  constructor() {
    super();
    this.t = 0;
    this.speed = Math.floor($fx.rand() * 30) + 10;
    this.startX = $fx.rand() * width;
    this.startY = $fx.rand() * height;
    this.colors = getCreatureColor();
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
    this.xOff = $fx.rand() * 300;
    this.yOff = $fx.rand() * 3000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.loadPixels(); // Load pixels for direct manipulation

    for (let i = 0; i < 20000; i++) {
      const x = i % 100;
      const y = i / 100;
      let k = x/4 - 12.5;
      // Avoid division by zero for tan(1/k)
      if (abs(k) < 0.01) {
        k = 0.01;
      }
      const e = y/9 + 5;
      const o = mag(k, e) / 9;
      const c = o * e/30 - this.t/8;
      const q = this.rotation_direction * (x + 99 + tan(1/k) + o * k * (cos(e * 9)/4 + cos(y/2)) * sin(o * 4 - this.t));
      let pointX = 0.7 * q * sin(c) + 9 * cos(y/19 + this.t);
      let pointY = 200 + q/2 * cos(c);
      pointX += this.startX;
      pointY += this.startY;
      [pointX, pointY] = this.wrapAround(pointX, pointY);
      let distFromCenter = dist(pointX, pointY, this.startX, this.startY);
      let colorMix = constrain(
        map(sin(distFromCenter * 0.02 + this.t * 2), -1, 1, 0, 0.5),
        0,
        0.5
      );
      let pointColor = lerpColor(this.colors.base, this.colors.core, colorMix);
      
      // Directly manipulate pixels for additive blending effect
      let ix = floor(pointX);
      let iy = floor(pointY);

      if (ix >= 0 && ix < width && iy >= 0 && iy < height) {
        let pixIndex = (iy * width + ix) * 4;

        let r = red(pointColor);
        let g = green(pointColor);
        let b = blue(pointColor);

        this.buffer.pixels[pixIndex] = min(255, this.buffer.pixels[pixIndex] + r);
        this.buffer.pixels[pixIndex + 1] = min(255, this.buffer.pixels[pixIndex + 1] + g);
        this.buffer.pixels[pixIndex + 2] = min(255, this.buffer.pixels[pixIndex + 2] + b);
        this.buffer.pixels[pixIndex + 3] = 230; // Set alpha to opaque
      }
    }
    this.buffer.updatePixels(); // Update the buffer
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / 90;
    this.startX = map(noise(this.xOff), 0, 1, 0, width);
    this.startY = map(noise(this.yOff), 0, 1, 0, height);
    this.xOff += 0.0006; // Speed of horizontal drift
    this.yOff += 0.0006; // Speed of vertical drift
  }
}

// End of oceanic creatures classes

let oceanic_creatures = [];
let bgBuffer;

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  noStroke();
  noiseSeed($fx.rand() * 99999);
  bgBuffer = createGraphics(width, height);
  oceanic_creatures.push(new JellyFish());
  oceanic_creatures.push(new SeaSpirit());
  oceanic_creatures.push(new SeaWanderer());
}

function drawBackground() {
  // Clear only if needed
  bgBuffer.clear();
  
  // Enhanced multi-layer ocean gradient with deeper complexity
  let surfaceColor = color(0, 180, 255, 200);
  let midColor = color(0, 100, 180, 255);
  let deepColor = color(0, 20, 60, 255);
  let abyssColor = color(0, 0, 20, 255);
  
  // Create more sophisticated gradient zones
  for(let y = 0; y < height; y += 2) {
    let inter = map(y, 0, height, 0, 1);
    let c;
    
    if (inter < 0.3) {
      // Surface to mid-water
      let localInter = map(inter, 0, 0.3, 0, 1);
      c = lerpColor(surfaceColor, midColor, localInter);
    } else if (inter < 0.7) {
      // Mid-water to deep
      let localInter = map(inter, 0.3, 0.7, 0, 1);
      c = lerpColor(midColor, deepColor, localInter);
    } else {
      // Deep to abyss
      let localInter = map(inter, 0.7, 1, 0, 1);
      c = lerpColor(deepColor, abyssColor, localInter);
    }
    
    // Add subtle wave distortion
    let waveOffset1 = sin(y * 0.008 + frameCount * 0.015) * 4;
    let waveOffset2 = sin(y * 0.02 + frameCount * 0.03) * 2;
    let waveOffset3 = cos(y * 0.05 + frameCount * 0.01) * 1;
    let totalWave = waveOffset1 + waveOffset2 + waveOffset3;
    
    bgBuffer.stroke(c);
    bgBuffer.strokeWeight(8);
    bgBuffer.line(-totalWave, y, width + totalWave, y);
  }
  
  // Enhanced particle system with multiple layers
  let particleTime = frameCount * 0.0008;
  
  // Large floating debris/plankton
  for(let i = 0; i < 150; i++) {
    let px = (noise(i * 0.1, particleTime) * width * 2 + frameCount * 0.5) % width;
    let py = noise(i * 0.2, particleTime * 0.7) * height;
    let size = noise(i * 0.3) * 8 + 2;
    let alpha = map(py, 0, height, 80, 20); // Fade with depth
    
    bgBuffer.fill(200, 230, 255, alpha);
    bgBuffer.noStroke();
    bgBuffer.circle(px, py, size);
  }
  
  // Medium suspended particles
  for(let i = 150; i < 800; i++) {
    let px = (noise(i * 0.05, particleTime * 1.2) * width * 1.5 + frameCount * 0.3) % width;
    let py = noise(i * 0.1, particleTime * 0.5) * height;
    let size = noise(i * 0.2) * 4 + 1;
    let alpha = map(py, 0, height, 60, 10);
    
    bgBuffer.stroke(180, 210, 255, alpha);
    bgBuffer.strokeWeight(size);
    bgBuffer.point(px, py);
  }
  
  // Fine sediment particles
  for(let i = 800; i < 1500; i++) {
    let px = (noise(i * 0.02, particleTime * 2) * width + frameCount * 0.1) % width;
    let py = noise(i * 0.05, particleTime * 0.3) * height;
    let size = noise(i * 0.1) * 2 + 0.5;
    let alpha = map(py, 0, height, 40, 5);
    
    bgBuffer.stroke(160, 190, 220, alpha);
    bgBuffer.strokeWeight(size);
    bgBuffer.point(px, py);
  }
  
  // Add volumetric fog/murk in deeper areas
  for(let i = 0; i < 5; i++) {
    let fogY = height * (0.6 + i * 0.08);
    let fogAlpha = map(i, 0, 4, 15, 5);
    let fogWidth = width + noise(frameCount * 0.001 + i) * 200;
    let fogHeight = 80 + noise(frameCount * 0.002 + i) * 40;
    
    bgBuffer.fill(0, 30, 60, fogAlpha);
    bgBuffer.noStroke();
    bgBuffer.ellipse(width/2, fogY, fogWidth, fogHeight);
  }
  
  // Subtle bioluminescent sparkles
  if (frameCount % 3 === 0) { // Only update every 3 frames for performance
    for(let i = 0; i < 20; i++) {
      if (noise(i, frameCount * 0.01) > 0.98) { // Rare sparkles
        let sparkleX = noise(i * 2, frameCount * 0.005) * width;
        let sparkleY = noise(i * 3, frameCount * 0.007) * height;
        let sparkleSize = noise(i * 4) * 6 + 2;
        
        bgBuffer.stroke(100, 255, 200, 150);
        bgBuffer.strokeWeight(sparkleSize);
        bgBuffer.point(sparkleX, sparkleY);
        
        // Glow around sparkle
        bgBuffer.stroke(100, 255, 200, 50);
        bgBuffer.strokeWeight(sparkleSize * 2);
        bgBuffer.point(sparkleX, sparkleY);
      }
    }
  }

  // Render to main canvas
  image(bgBuffer, 0, 0);
}

function draw() {
  drawBackground();
  for (let i = 0; i < oceanic_creatures.length; i++){
    oceanic_creatures[i].update();
    oceanic_creatures[i].draw();
  }
}