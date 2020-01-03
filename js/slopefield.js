var inc = 0.01;
var scl = 10;
var cols, rows;
var zoff = 0;

var fr;

var particles = [];
var flowfield = [];

function setup() {
  createCanvas(600, 600);
  background('#7bc7af');
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);
  for(i=0;i<flowfield.length; i++){
    flowfield[i] = createVector(0, 0);
  }
  //create x-y
  xMinusY();
  logistic();
  xOverY();
  sinXY();
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
  //create Particles
  for (var i=0; i<2000; i++){
    particles[i] = new Particle();
  }
}

function xMinusY(){
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var x = i - floor(cols/2);
      var y = j - floor(rows/2);
      var dydx = 0.1*(x-y);
      addToField(x, y, dydx, index, 50, PI/4);
    }
  }
}

function logistic(){
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var x = i - floor(cols/4);
      var y = j - floor(rows/4);
      var dydx = 0.25*y + 0.3*x*(1-(x/15));
      addToField(x, y, dydx, index, 300, PI/2);
    }
  }
}

function xOverY(){
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var x = i - floor(cols*5/6);
      var y = j - floor(rows*5/8);
      var dydx = (-1)*x/y;
      addToField(x, y, dydx, index, 375, 0);
    }
  }
}

function sinXY(){
  for (var j = 0; j < rows; j++){
    for (var i = 0; i < cols; i++){
      var index = i + j * cols;
      var x = i - floor(cols/5);
      var y = j - floor(rows*4/5);
      var dydx = exp(0.1*x, 2)*y*sin(0.1*x);
      addToField(x, y, dydx, index, 400, PI/6);
    }
  }
}

function addToField(x, y, dydx, cell, spread, theta){
  var index = cell;
  var angle = atan(dydx);
  var v = p5.Vector.fromAngle(angle+theta);
  v.setMag(exp(-(pow(x, 2)/spread))*exp(-(pow(y, 2)/spread)));
  var current = flowfield[index];
  flowfield[index] = current.add(v);
}

function draw() {

  for (var i=0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }

  fr.html("dy/dx = 0.25(x)*"+nf(sin(zoff), 1, 2)+" + 0.3(y)*( 1-(y/("+nf(15*sin(0.3*zoff), 2, 2)+") ) )<br>frames/second: "+floor(frameRate()));
}
