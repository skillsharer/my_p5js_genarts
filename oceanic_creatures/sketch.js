// This generative art is inspired by the work of https://x.com/yuruyurau.
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
    this.speed = Math.floor($fx.rand() * 30) + 10; // Random speed between 10 and 30
    this.startX = $fx.rand() * width;
    this.startY = $fx.rand() * height;
    this.color = color(
      $fx.rand() * 255,
      $fx.rand() * 255,
      $fx.rand() * 255
    );
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1; // Randomly choose rotation direction
    // Add noise offsets for smooth movement
    this.xOff = $fx.rand() * 100;
    this.yOff = $fx.rand() * 1000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.stroke(this.color);
    this.buffer.strokeWeight(1);
    this.buffer.noFill();

    for (let j = 0; j < 10000; j++){
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
      this.buffer.point(pointX, pointY);
    }
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
    this.color = color(
      $fx.rand() * 255,
      $fx.rand() * 255,
      $fx.rand() * 255
    );
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
    this.xOff = $fx.rand() * 200;
    this.yOff = $fx.rand() * 2000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.stroke(this.color);
    this.buffer.strokeWeight(1);
    this.buffer.noFill();

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
      this.buffer.point(pointX, pointY);
    }
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / 45;
    // Update startX and startY using Perlin noise for smooth drift
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
    this.color = color(
      $fx.rand() * 255,
      $fx.rand() * 255,
      $fx.rand() * 255
    );
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
    this.xOff = $fx.rand() * 300;
    this.yOff = $fx.rand() * 3000;
  }

  draw() {
    this.buffer.clear();
    this.buffer.stroke(this.color);
    this.buffer.strokeWeight(1);
    this.buffer.noFill();

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
      this.buffer.point(pointX, pointY);
    }
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

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  noStroke();
  noiseSeed($fx.rand() * 99999);

  oceanic_creatures.push(new JellyFish());
  oceanic_creatures.push(new SeaSpirit());
  oceanic_creatures.push(new SeaWanderer());
}

function draw() {
  background(0);
  for (let i = 0; i < oceanic_creatures.length; i++){
    oceanic_creatures[i].update();
    oceanic_creatures[i].draw();
  }
}