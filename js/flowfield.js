var inc = 0.01;
var scl = 10;
var cols, rows;

var zoff=0;
var fr;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(1000, 1000);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i=0; i<100; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);

  push();
  let jump = 100;

    // two for loops are needed to make a grid of squares
    // the outer loop controls how many rows are made
    // the inner loop controls how many columns are made
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {

        rect(x * jump, y * jump, 100, 100);

      }
    }

  pop();

  var yoff = 0;
  for (var y = 0; y < rows; y++){
    var xoff = 0;
    for (var x = 0; x < cols; x++){
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      // stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
  }
  zoff += 0.001;

  for (var i=0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }

  fr.html(floor(frameRate()));
}
