let drops = [];
let sliderRain;
let thunder;
let button;

//load sound of the thunder
function preload() {
  thunder = loadSound("./assets/thunder.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the thunder button
  //when you hit the button the sound appear
  button = createButton('Thunder');
  button.position(width / 2 - 30, 650);
  button.mousePressed(ThunderSound);


  // create slider to control number of raindrops
  sliderRain = createSlider(0, 2000, 0);
  sliderRain.position(10, 10);
  sliderRain.size(width - 20);

  // create a new raindrop for each loop
  // push the raindrop to the empty array defined above
  // max # of raindrops defined as 2000
  for (let i = 0; i < 2000; i++) {
    drops[i] = new rainDrop();
  }
}

//when hit the button
function ThunderSound() {
  thunder.play();
  thunder.setVolume(0.15);
}

function draw() {
  background(0);

  //draw window with crossbars
  push();
  rectMode(CENTER);
  fill(169, 169, 169);
  noStroke();
  rect(width / 2, height / 2, 600, 400);
  pop();

  push();
  strokeWeight(10);
  stroke(0);
  line(width / 2 - 350, height / 2, width / 2 + 350, height / 2)
  line(width / 2, height / 2 - 450 / 2, width / 2, height / 2 + 450 / 2);
  pop();

  //make slider human controled somehow
  for (i = 0; i < sliderRain.value(); i++) {
    drops[i].show();
    drops[i].move();

  }

}

class rainDrop {

  //Declare the local variables that define the raindrops' starting points
  constructor() {
    this.x = random(width);
    this.y = random(-500, -10);
    this.z = random(0, 20);
    this.size = map(this.z, 0, 20, 5, 20);
    this.speed = map(this.z, 0, 20, 3, 10);

    //Declare a gravity variable that obeys the z-axis rules above
    this.grav = map(this.z, 0, 20, 0.025, 0.2);

  }

  show() {
    //Draw the raindrop
    stroke(255);
    strokeWeight(map(this.z, 0.1, 20, 1, 2));
    line(this.x, this.y, this.x, this.y + this.size);
  }

  //Create the motion of the raindrop
  move() {
    this.y = this.y + this.speed;
    this.speed = this.speed + this.grav //speed increases slightly as it falls to mimick gravity

    // After the raindrop hits the bottom, it resets to its starting point and with its starting speed
    if (this.y > height) {
      this.y = random(-200, -10);
      this.speed = map(this.z, 0, 20, 4, 10);
    }
  }
  applyForce(f) {
    this.blow.add(f);
  }
}
