var scl = 10;
var rows, cols;
var lattice = [];
var fr;

function setup() {
  frameRate(200);
  let cnv = createCanvas(500, 500);
  cnv.parent('canvas');
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');
  fr.parent('links');

  for (let x = 0; x < cols; x++) {
    lattice[x] = []; // create nested array
    for (let y = 0; y < rows; y++) {
      lattice[x][y] = 0;
    }
  }
}

function addgrain() {
  genX = floor(random(0, cols));
  genY = floor(random(0, rows));
  lattice[genX][genY] += 1;
}

function colorLattice() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (lattice[x][y]==1){
        push();
        fill('#33899e');
        noStroke();
        rect(x*scl, y*scl, scl, scl);
        pop();
      } else if (lattice[x][y]==2){
        push();
        fill('#599ac9');
        noStroke();
        rect(x*scl, y*scl, scl, scl);
        pop();
      } else if (lattice[x][y]==3){
        push();
        fill('#83a8eb');
        noStroke();
        rect(x*scl, y*scl, scl, scl);
        pop();
      } else if (lattice[x][y]==4){
        push();
        fill('#b3baff');
        noStroke();
        rect(x*scl, y*scl, scl, scl);
        pop();
      } else if (lattice[x][y]==0){
        push();
        fill('#208077');
        noStroke();
        rect(x*scl, y*scl, scl, scl);
        pop();
      }
    }
  }
}

function draw() {
  lattice[0]= new Array(rows).fill(0);
  lattice[cols-1] = new Array(rows).fill(0);

  for(i=0;i<cols; i++){
    lattice[i][0] = 0;
    lattice[i][rows-1] = 0;
  }
  var merged = [].concat.apply([], lattice);
  if (merged.includes(4)){
    for (let x = 1; x < cols-1; x++) {
      for (let y = 1; y < rows-1; y++) {
        if (3<lattice[x][y]){
          lattice[x][y]=0;
          lattice[x-1][y]+=1;
          lattice[x][y-1]+=1;
          lattice[x+1][y]+=1;
          lattice[x][y+1]+=1;
        }
      }
    }
  } else {
    addgrain();
  }

  colorLattice();
  fr.html("frames/second: "+floor(frameRate()));
}
