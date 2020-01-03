var inc = 0.01;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(500, 500);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');
  //initialize field
  flowfield = new Array(cols * rows);
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      flowfield[index]=createVector(0, 0);
    }
  }
  //create particles
  for (var i=0; i<10; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background('#7bc7af');
  //particle functions
  for (var i=0; i < particles.length; i++){
    particles[i].desire();
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
  // draw vectors
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      stroke(0, 50);
      push();
      translate(i * scl, j * scl);
      rotate(flowfield[index].heading());
      strokeWeight(1);
      line(0, 0, scl*flowfield[index].mag(), 0);
      pop();
    }
  }
  fr.html(floor(frameRate()));
}
