class Particle {
  constructor(){
  this.a = random(-3.0, 3.0);
  this.b = random(-3.0, 3.0);
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0, 0);
  this.color = color(floor(random(90, 120)), floor(random(108, 138)), floor(random(176, 206)));
  this.maxspeed = 1.3*random(1.5, 2.5);

  this.desire = function(){
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    for(var j=-10; j<10; j++){
      for(var i=-10; i<10; i++){
        var index = (x+i) + (y+j) * cols;
        // var didj= (this.a*i)+(this.b*j);
        var didj = 0.1*i - 0.1*j;
        var angle = atan(didj);
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        var vec = v.add(flowfield[index]);
        // flowfield[index] = vec.limit(this.maxspeed);
        flowfield[index] = vec;
      }
    }
  }

  // this.equation = function(x, y) {
  //   var eq = this.equation;
  //   var dxdy = eval(eq);
  //   return dxdy;
  //   // 0.25*x + 0.3*y*(1-(y/(15)));
  // }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.show = function() {
    stroke(this.color);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }

  this.edges = function() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}
}
