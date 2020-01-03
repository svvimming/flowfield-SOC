var inc = 0.01;
var scl = 10;
var cols, rows;
var zoff = 0;

var fr;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);
  for(i=0;i<flowfield.length; i++){
    flowfield[i] = createVector(0, 0);
  }
  // for (var i=0; i<1000; i++){
  //   particles[i] = new Particle();
  // }
}

function diffeq(x, y){
  var dydx = 0.1*(x-y);
  return dydx;
}

function mouseVec(){
  let v1 = createVector(mouseX -floor(cols/2), mouseY-floor(rows/2));
  return v1.heading();
}
// *exp(-(pow(x, 2)))**exp(-(pow(y, 2)))
function draw() {
  background('#7bc7af');
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var theta = mouseVec();
      var x = i - floor(cols/2);
      var y = j - floor(rows/2);
      // var dydx = 0.25*x*sin(zoff) + 0.3*y*(1-(y/(sin(0.3*zoff)*15)));
      var dydx = diffeq(x, y);
      var angle = atan(dydx);
      var v = p5.Vector.fromAngle(angle+theta);
      v.setMag(exp(-(pow(x, 2)/50))*exp(-(pow(y, 2)/50)));
      var current = flowfield[index].add(v);
      flowfield[index] = current.limit(10);
    }
  }

  //draw slopefield
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
  // for (var i=0; i < particles.length; i++){
  //   particles[i].follow(flowfield);
  //   particles[i].update();
  //   particles[i].show();
  //   particles[i].edges();
  // }

  fr.html("dydx = 0.1*(x-y) frames/second: "+floor(frameRate()));

}
