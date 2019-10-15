let rainCircles = [];
let flowers = [];
let flowercircles = [];
let waterDrop;

function preload() {
  waterDrop = loadSound("assets/water drop.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 40);
    let o = random(150, 200);
    rainCircles[i] = new rainCircle(x, y, r, o);
  }
  for (var i = 0; i < 12; i++) {
    let fx = random(width);
    let fy = random(height);
    let fr = random(60, 140);
    let f = new flower(fx, fy, fr);
    flowers.push(f);
  }
}

function draw() {
  background(43, 47, 62);
  for (var i = 0; i < rainCircles.length; i++) {
    rainCircles[i].move();
    rainCircles[i].show();
    rainCircles[i].color();
  }
  for (var i = 0; i < flowers.length; i++) {
    flowers[i].clicked();
    flowers[i].show();
    // flowers[i].move();
  }

}

function mousePressed() {
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].clicked(mouseX, mouseY);
  }
  let r = random(3, 10);
  let o = random(150, 200);
  let b = new rainCircle(mouseX, mouseY, r, o);
  rainCircles.push(b);
  waterDrop.play();

}


//rain circles continues
function mouseDragged() {

  let r = random(10, 50);
  let o = random(50, 100);
  let b = new rainCircle(mouseX, mouseY, r, o);
  rainCircles.push(b);
}
class flower {
  constructor(fx, fy, fr, fc) {
    this.fx = fx;
    this.fy = fy;
    this.fr = fr;
    this.fc3 = 111 + random(-30, 30);
    this.fc2 = 191 + random(-30, 30);
    this.fc1 = 137 + random(-30, 30);
  }
  clicked(px, py) {
    let d = dist(px, py, this.fx, this.fy);
    if (d < this.fr) {
      // console.log("boom");
      this.fc3 = this.fc3 + random(-50, 50);
      this.fc2 = this.fc2 + random(-50, 50);
      this.fc1 = this.fc1 + random(-50, 50);
    }
  }

  show() {
    noStroke();
    fill(this.fc1, this.fc2, this.fc3);
    ellipse(this.fx, this.fy, this.fr);
  }

}
class rainCircle {
  constructor(x, y, r, o, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.o = o;
    this.c = c;
  }

  move() {
    this.r = this.r + random(1, 4);
  }
  color() {
    this.o = this.o - random(2, 5);
  }
  show() {


    stroke(240, 228, 213, this.o);

    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }



}
