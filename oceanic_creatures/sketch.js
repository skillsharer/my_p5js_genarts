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
}

class JellyFish extends OceanicCreature {
  constructor() {
    super();
    this.t = 0;
    this.speed = Math.floor($fx.rand() * 30) + 10; // Random speed between 10 and 30
    this.startX = Math.floor($fx.rand() * width / 2);
    this.startY = Math.floor($fx.rand() * height / 2);
    this.color = color(
      $fx.rand() * 255, 
      $fx.rand() * 255, 
      $fx.rand() * 255
    );
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1; // Randomly choose rotation direction
  }
  
  draw() {
    this.buffer.clear();
    this.buffer.stroke(this.color);
    this.buffer.strokeWeight(1); 
    this.buffer.noFill();

    for (let j = 0; j < 10000; j++){
      const baseX = j % 400;
      const baseY = j / 43;
      const k = 5 * cos(baseX / 14) * cos(baseY / 30); // This creates the jellyfish's body
      const e = baseY / 8 - 13; // This creates the jellyfish's tentacles
      const d = mag(k, e) ** 2 / 59 + 4; // This controls the size of the jellyfish and its tentacles
      const c = d / 2 + e / 99 - this.t / 18; // This value is used in the sine and cosine calculations later to create the circular movement pattern. The smaller the divisor (18 in this case), the faster the rotation will be.
      const q = 60 - 3 * sin(atan2(k, e) * e) + k * (3 + 4 / d * sin(d * d - this.t * 2));
      this.buffer.point(this.rotation_direction * q * sin(c) + this.startX, (q + d * 9) * cos(c) + this.startY); // This draws the jellyfish
    }
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / this.speed; // This tells the jellyfish to move (higher value = slower movement)
    this.startX = (this.startX + width) % width;
    this.startY = (this.startY + height) % height;
  }
}

class SeaSpirit extends OceanicCreature {
  constructor() {
    super();
    this.t = 0;
    this.speed = Math.floor($fx.rand() * 30) + 10;
    this.startX = Math.floor($fx.rand() * width);
    this.startY = Math.floor($fx.rand() * height);
    this.color = color(
      $fx.rand() * 255,
      $fx.rand() * 255,
      $fx.rand() * 255
    );
    this.rotation_direction = Math.floor($fx.rand() * 2) === 0 ? 1 : -1;
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
      
      this.buffer.point(
        q * sin(c) + this.startX,
        (q + 19 * d) * cos(c) + this.startY
      );
    }
    image(this.buffer, 0, 0);
  }

  update() {
    this.t += PI / 45;
    // Wrap around screen edges
    this.startX = (this.startX + width) % width;
    this.startY = (this.startY + height) % height;
  }
}

// End of oceanic creatures classes

let oceanic_creatures = [];


function setup() {
  createCanvas(800, 600);
  noStroke();
  for(let i = 0; i < Math.floor($fx.rand() * 10) + 1; i++) {
    oceanic_creatures.push(new JellyFish());
  }
  for(let i = 0; i < Math.floor($fx.rand() * 10) + 1; i++) {
    oceanic_creatures.push(new SeaSpirit());
  }
}

function draw() {
  background(0);
  for (let i = 0; i < oceanic_creatures.length; i++){
    oceanic_creatures[i].draw();
    oceanic_creatures[i].update();
  }
}