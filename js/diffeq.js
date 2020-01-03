var inc = 0.01;
var scl = 10;
var cols, rows;
var zoff = 0;

var fr;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);
  for (var i=0; i<1000; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background('#7bc7af');
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var x = i - floor(cols/2);
      var y = j - floor(rows/2);
      var dydx = 0.25*x*sin(zoff) + 0.3*y*(1-(y/(sin(0.3*zoff)*15)));
      var angle = atan(dydx);
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      // stroke(0, 50);
      // push();
      // translate(i * scl, j * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
  }
  zoff += inc;

  for (var i=0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }

  fr.html("dy/dx = 0.25(x)*"+nf(sin(zoff), 1, 2)+" + 0.3(y)*( 1-(y/("+nf(15*sin(0.3*zoff), 2, 2)+") ) )");
}
