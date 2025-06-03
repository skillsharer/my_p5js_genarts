class OceanicCreature {
  constructor() {
    this.t = 0;
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
    stroke(this.color);
    strokeWeight(1); 
    noFill();
    for (let j = 0; j < 10000; j++){
      const baseX = j % 400;
      const baseY = j / 43;
      const k = 5 * cos(baseX / 14) * cos(baseY / 30); // This creates the jellyfish's body
      const e = baseY / 8 - 13; // This creates the jellyfish's tentacles
      const d = mag(k, e) ** 2 / 59 + 4; // This controls the size of the jellyfish and its tentacles
      const c = d / 2 + e / 99 - this.t / 18; // This value is used in the sine and cosine calculations later to create the circular movement pattern. The smaller the divisor (18 in this case), the faster the rotation will be.
      const q = 60 - 3 * sin(atan2(k, e) * e) + k * (3 + 4 / d * sin(d * d - this.t * 2));
      point(this.rotation_direction * q * sin(c) + this.startX, (q + d * 9) * cos(c) + this.startY); // This draws the jellyfish
    }
  }

  update() {
    this.t += PI / this.speed; // This tells the jellyfish to move (higher value = slower movement)
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
}

function draw() {
  background(0);
  for (let i = 0; i < oceanic_creatures.length; i++){
    oceanic_creatures[i].draw();
    oceanic_creatures[i].update();
  }
}