let snowflakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 300; i++) {
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background(40, 115, 200);

  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }
}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.direction = random(-1, 1);
    this.size = random(5, 15);
    this.speed = random(1, 3);
    this.mainColor = (240, 245, 255, random(200, 255));
  }

  update() {
    this.y += this.speed;
    this.x += this.direction;

    if (this.y > height) {
      this.y = random(-height, 0);
      this.x = random(width);
    }

    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < 75) {
      let runDirection = createVector(this.x - mouseX, this.y - mouseY);
      runDirection.setMag(2);
      this.x += runDirection.x;
      this.y += runDirection.y;
    }
  }

  display() {
    noStroke();

    fill(this.mainColor);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI * i) / 6;
      let radius = this.size / 2;
      let x = this.x + radius * cos(angle);
      let y = this.y + radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
