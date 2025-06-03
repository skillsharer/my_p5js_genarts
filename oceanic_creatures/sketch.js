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
  }
  
  draw(x, y) {
    const k = 5 * cos(x / 14) * cos(y / 30);
    const e = y / 8 - 13;
    const d = mag(k, e) ** 2 / 59 + 4;
    const c = d / 2 + e / 99 - this.t / 18;
    const q = 60 - 3 * sin(atan2(k, e) * e) + k * (3 + 4 / d * sin(d * d - this.t * 2));
    
    point(q * sin(c) + 200, (q + d * 9) * cos(c) + 200);
  }

  update() {
    this.t += PI / 20;
  }
}

// End of oceanic creatures classes

let jellyfish = [];


function setup() {
  createCanvas(800, 600);
  noStroke();
  jellyfish.push(new JellyFish());
}

function draw() {
  background(0);
  stroke(400, 66);
  for (let i = 0; i < jellyfish.length; i++){
    for (let j = 0; j < 10000; j++){
      jellyfish[i].draw(j % 200, j / 43);
    }
    jellyfish[i].update();
  }
}