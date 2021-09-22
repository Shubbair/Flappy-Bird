
var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var midSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;
var font;
let point_sound,wing_sound,hit_sound;
let hint_img;
let comment = 'Press Space to play and fly';
let state = false;
let floor;
let base;

function preload() {
  pipeBodySprite = loadImage('images/pipe-green.png');
  pipePeakSprite = loadImage('images/pipe-green.png');
  midSprite = loadImage('images/yellowbird-midflap.png');
  downSprite = loadImage('images/yellowbird-downflap.png');
  upSprite = loadImage('images/yellowbird-upflap.png');
  hint_img = loadImage('images/message.png');
  base = loadImage('images/base.png');

  bgImg = loadImage('images/background-day.png');

  font = loadFont('pixel-font.ttf');
}

function setup() {
  createCanvas(400, 600);
  point_sound = loadSound('audio/point.wav');
  wing_sound = loadSound('audio/wing.wav');
  hit_sound = loadSound('audio/hit.wav');

  floor = new Floor(0,550,width,100,base);

  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, 0, 0, width, height);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
  }
  bird.show();

  floor.show();
  if(floor.collide(bird)){
    hit_sound.play();
    gameover();
  }

  if(state){



  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();

    if (pipes[i].pass(bird)) {
      point_sound.play();
      score++;
    }

    if (pipes[i].hits(bird)) {
      hit_sound.play();
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();

}
  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  textSize(32);
  text(comment, 60, 260);

  textFont(font);
  fill(255,255,0);
  noStroke();
  
  showScores();

  // touches is an list that contains the positions of all
  // current touch points positions and IDs
  // here we check if touches' length is bigger than one
  // and set it to the touched var
  touched = (touches.length > 0);

  // if user has touched then make bird jump
  // also checks if not touched before
  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;
}

function showScores() {
  textSize(32);
  text('Score: ' + score, 10, 32);
  text('Record: ' + maxScore, 10, 64);
}

function gameover() {
  stroke(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    state = true;
    comment = '';
    wing_sound.play();
    bird.up();
    if(bird.icon == upSprite){
      bird.icon = midSprite;
    }else if(bird.icon == midSprite){
      bird.icon = downSprite;
    }else  if(bird.icon == downSprite){
      bird.icon = upSprite;
    }
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}

function touchStarted() {
  if (isOver) reset();
}