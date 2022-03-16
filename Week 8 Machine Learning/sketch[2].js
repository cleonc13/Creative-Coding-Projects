// Your code will go here
// Snake Code taken from Daniel Shiffman
// Open up your console - if everything loaded properly you should see the version number 
// corresponding to the latest version of ml5 printed to the console and in the p5.js canvas.
console.log('ml5 version:', ml5.version);

let snake;
let food;
let rez = 30;


let soundClassifier;
let resultP;
function preload() {
  let options = { probabilityThreshold: 0.95};
 soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
}


function setup(){
	createCanvas(600, 600);
	// textSize(width / 3);
	// textAlign(CENTER, CENTER);
    resultP = createP('waiting...');
    resultP.style('font-size', '32pt');
    soundClassifier.classify(gotResults);
  
  w = floor(width/rez);
  h = floor(height/rez);
  frameRate(2);
  snake = new Snake();
  foodLocation();
  
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x,y);
}

function gotResults(error, results) {
  if (error) {
    console.log("something went wrong");
    console.error(error);
  }
  resultP.html(`${results[0].label} : ${results[0].confidence}`);
  if (results[0].label == 'up') {
    snake.setDir(0, -1);
  }
  if (results[0].label == 'down') {
    snake.setDir(0, 1);
  }
   if (results[0].label == 'left') {
    snake.setDir(-1, 0);
  }
   if (results[0].label == 'right') {
    snake.setDir(1, 0);
  }
  
  
}

 function draw(){
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  //text(ml5.version, width/2, height/2);
 }
