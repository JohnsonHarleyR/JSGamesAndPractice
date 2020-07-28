//This is my first attempt at a moving game so I ended up taking a lot from tutorials here:
//https://www.w3schools.com/graphics/game_components.asp

function loadPage() {
	
	color1 = "#FF39A2";
	color2 = "#39FF3E";

	startGame();
}

function startGame() {
	
	score = 0;
	gameOver = false;
	snakePiece = undefined;
	snakePieces = [];
	direct = "right";
	
	myGameArea.start();
	myGamePiece = new component(WIDTH, HEIGHT, color1, 10, 150, "right");
	snakePieces.push(myGamePiece); //make this the head of the snake
	secondGame = true;
	
	genGrabPiece();
	
	
}

//COLOR METHODS

//change the color scheme
function changeColor () {
	//get the scheme to figure out what colors to set things to
	var scheme = colorScheme.value;
	
	console.log("Changing color to " + scheme);
	
	//figure out which one it is
	switch (scheme) {
		case "b-default":
			color1 = "#FF39A2";
			color2 = "#39FF3E";
			break;
		case "b-aqua":
			color1 = "#1A5BFF";
			color2 = "#A451FF";
			break;
		case "b-jungle":
			color1 = "#00E206";
			color2 = "#BA5A00";
			break;
		case "b-ice":
			color1 = "#4BF2FF";
			color2 = "#1392FF";
			break;
		case "b-fire":
			color1 = "#FF451C";
			color2 = "#FFFE18";
			break;
	}
	myGameArea.canvas.className = scheme;
	startGame();
}

//change the speed/difficulty
function changeSpeed () {
	//get the scheme to figure out what colors to set things to
	var sSpeed = document.getElementById("speed").value;
	
	
	
	//figure out which one it is
	switch (sSpeed) {
		case "slow":
			speed = 10;
			int = 55;
			break;
		case "normal":
			speed = 15;
			int = 55;
			break;
		case "fast":
			speed = 20;
			int = 50;
			break;
	}
	
	console.log("Changing speed to " + speed);
	startGame();
}

//GAME METHODS
function addPoints () { //for when you score
	score += GRAB_POINTS;
}

//create random sprites on screen to hit
function genGrabPiece() {
	var posX = Math.floor(Math.random() * (CANVAS_WIDTH - WIDTH));
	var posY = Math.floor(Math.random() * (CANVAS_HEIGHT - HEIGHT));
	
	grabPiece = new component(WIDTH, HEIGHT, color2, posX, posY, "none");
	grabPiece.className = "grab";
}

//Add the piece to the end of the snake trail
function addToTrail() {
	
	console.log("Adding to trail.");
	
	//TODO Go back to make sure the trailing piece doesn't collide with the wall as it's generated
	
	//snakePieces
	var lastPiece;
	var lastX;
	var lastY;
	var posX;
	var posY;
	
	//get position of last item in train
	lastPiece = snakePieces[snakePieces.length - 1];
		
	lastX = lastPiece.x;
	lastY = lastPiece.y;
	
	//figure out position
	switch (lastPiece.direction) {
	case("up"):
		posX = lastX;
		posY = lastY + HEIGHT;
		break;
	case("down"):
		posX = lastX;
		posY = lastY - HEIGHT;
		break;
	case("left"):
		posX = lastX + WIDTH;
		posY = lastY;
		break;
	case("right"):
		posX = lastX - WIDTH;
		posY = lastY;
		break;
	}
	
	//now add the piece to the train
	var tail = new component(WIDTH, HEIGHT, color1, posX, posY, lastPiece.direction);
	tail.className = "tail";
	snakePieces.push(tail);
}


function updateGameArea() {
	
	//myGameArea.clear(); //to clear the board after game over
	
	if (!gameOver) {
		myGameArea.clear();
		
		var lastX = myGamePiece.x;
		var lastY = myGamePiece.y;
		
		myGamePiece.x += xDir; //this way it changes if the direction changes
		myGamePiece.y += yDir;
		myGamePiece.update();
		grabPiece.update();
		
		for (var i = 0; i < snakePieces.length; i++) { //will probably have to alter this
			if (i != 0) { //if it's not the first piece
				var lastX2 = snakePieces[i].x;
				var lastY2 = snakePieces[i].y;
				
				snakePieces[i].x = lastX;
				snakePieces[i].y = lastY;
				
				lastX = lastX2;
				lastY = lastY2;
				
				snakePieces[i].update();
				
			}
	}
		
	}
	
	checkCollision();
	
	//Key codes
	if (myGameArea.key && myGameArea.key == 38) {changeUp();}
	if (myGameArea.key && myGameArea.key == 40) {changeDown();}
	if (myGameArea.key && myGameArea.key == 37) {changeLeft();}
	if (myGameArea.key && myGameArea.key == 39) {changeRight();}
	if (myGameArea.key && myGameArea.key == 83) {startGame();}
	
	if (!gameOver) {
		coord.innerHTML = "Score: " + score;
	} else {
		coord.innerHTML = "Score: " + score + " | Game Over";
	}
	
}

function component(width, height, color, x, y, direction) {
	console.log("");
	console.log("Creating component.");
	this.width = width;
	console.log("Width: " + width);
	this.height = height;
	console.log("Height: " + height);
	this.color = color;
	console.log("Color: " + color);
	this.x = x;
	console.log("X: " + x);
	this.y = y;
	console.log("Y: " + y);
	this.speedX = 0;
	console.log("Speed X: " + this.speedX);
	this.speedY = 0;
	console.log("Speed Y: " + this.speedY);
	console.log("X Direction: " + xDir);
	console.log("Y Direction: " + yDir);
	
	this.direction = direction;
	this.lastDirection = direction;
	
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		console.log(speedX);
	}
}

function checkCollision() {
	//Check collisions at border
	
	//console.log("Checking collision");
	//first make the piece stop
	if (myGamePiece.x <= 0) {
		//console.log("Detected collision.")
		stopMove();
		myGamePiece.x = 0;
		gameOver = true;
	} else if (myGamePiece.x >= CANVAS_WIDTH - WIDTH) {
		//console.log("Detected collision.")
		stopMove();
		myGamePiece.x = CANVAS_WIDTH - WIDTH;
		gameOver = true;
	} else if (myGamePiece.y <= 0) {
		stopMove();
		myGamePiece.y = 0;
		gameOver = true;
	} else if (myGamePiece.y >= CANVAS_HEIGHT - HEIGHT) {
		stopMove();
		myGamePiece.y = CANVAS_HEIGHT - HEIGHT;
		gameOver = true;
	}
	
	//Check whether there is collision with any trailing pieces
	for (var i = 0; i < snakePieces.length; i++) {
		if (snakePieces[i].className !== "grab" && i !== 0) {
			if (i > 3 && 
					(myGamePiece.x > snakePieces[i].x && myGamePiece.x < snakePieces[i].x + WIDTH ||
					myGamePiece.x + WIDTH > snakePieces[i].x && myGamePiece.x < snakePieces[i].x + WIDTH) &&
					(myGamePiece.y > snakePieces[i].y && myGamePiece.y < snakePieces[i].y + HEIGHT ||
					myGamePiece.y + HEIGHT > snakePieces[i].y && myGamePiece.y < snakePieces[i].y + HEIGHT)) {
				
				//also make sure that piece is not in the same position as the grabpiece
				if (grabPiece.x === snakePieces[i].x && grabPiece.y === snakePieces[i].y) {
					//nothing
				} else {
					console.log("Collision. First: " + myGamePiece.x + "-" + myGamePiece.y + " Second: " +
							 snakePieces[i].x + "-" + snakePieces[i].y);
					console.log("Grab Piece coord: " + grabPiece.x + "-" + grabPiece.y);
					console.log("Trail number: " + i);
					console.log("Piece class: " + snakePieces[i].className);
					stopMove();
					gameOver = true;
					//now add it to trail behind piece
				}
				
			}
		}
	}
	
	//check for collision with grabPiece
	if ((myGamePiece.x >= grabPiece.x && myGamePiece.x <= grabPiece.x + WIDTH ||
			myGamePiece.x + WIDTH >= grabPiece.x && myGamePiece.x + WIDTH <= grabPiece.x + WIDTH) &&
			(myGamePiece.y >= grabPiece.y && myGamePiece.y <= grabPiece.y + HEIGHT ||
			myGamePiece.y + HEIGHT >= grabPiece.y && myGamePiece.y + HEIGHT <= grabPiece.y + HEIGHT)) {
		
		console.log("X: " + myGamePiece.x + " Y: " + myGamePiece.y);
		genGrabPiece();
		addPoints();
		addToTrail();
		//now add it to trail behind piece
	}
	
	
}

//stop moving
function stopMove() {
	xDir = 0;
	yDir = 0;
}

function changeUp() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== speed && !gameOver) {
		xDir = 0;
		yDir = -speed;
		
		this.lastDirectection = this.directection;
		this.direction = "up";
	}
	//myGameArea.speedY -= SPEED;
}

function changeDown() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== -speed && !gameOver) {
		xDir = 0;
		yDir = speed;
		
		this.lastDirectection = this.directection;
		this.direction = "down";
	}
	//myGameArea.speedY += SPEED;
}

function changeLeft() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== speed && !gameOver) {
		xDir = -speed;
		yDir = 0;
		
		this.lastDirectection = this.directection;
		this.direction = "left";
	}
	//myGameArea.speedX -= SPEED;
}

function changeRight() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== -speed && !gameOver) {
		xDir = speed;
		yDir = 0;
		
		this.lastDirectection = this.directection;
		this.direction = "right";
	}
	//myGameArea.speedX += SPEED;
}


//Variables
var myGameArea = {
	canvas: document.getElementById('board'),
	start: function() {
		console.log("");
		xDir = speed;
		yDir = 0;
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.context = this.canvas.getContext('2d');
		this.clear();
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		clearInterval(this.interval);
		this.interval = setInterval(updateGameArea, int);
		console.log("Interval: " + this.interval);
		window.addEventListener('keydown', function (e) {
			myGameArea.key = e.keyCode;
			console.log("Key code: " + e.keyCode);
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.key = false;
		})
		
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}


var speed = 10;
var int = 55;
const GRAB_POINTS = 10;
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 400;
const WIDTH = 15;
const HEIGHT = 15;
var IMAGE = "/sn/sprite.png";

var color1;
var color2;
var colorScheme = document.getElementById("color-scheme");

var score = 0; //game score
var direct = "right"; //direction facing
var lastDirect;

var coord = document.getElementById("map");

var xDir = speed; //direction and speed of x - 0 means still
var yDir = 0; //direction and speed of y - 0 means still

var myGamePiece;
var snakePieces = [];
var grabPiece;
var body = document.getElementById('body');
//var board = document.getElementById('board');

var startGameBtn = document.getElementById('start');
var upBtn = document.getElementById('up');
var leftBtn = document.getElementById('left');
var rightBtn = document.getElementById('right');
var downBtn = document.getElementById('down');
var changeSchemeBtn = document.getElementById('change-scheme');
var speedBtn = document.getElementById('change-speed');

var mainSprite;
var gameSnake = [];
var gameOver;
var score;

var move;

var moveX = 0;
var moveY = 0;


//Event Listeners
body.onload = loadPage; //change this eventually so it doesn't start as soon as it loads
startGameBtn.onclick = startGame;
upBtn.onclick = changeUp;
leftBtn.onclick = changeLeft;
rightBtn.onclick = changeRight;
downBtn.onclick = changeDown;

changeSchemeBtn.onclick = changeColor;
speedBtn.onclick = changeSpeed;


window.addEventListener('keydown', function (e) {
	myGameArea.key = e.keyCode;
	console.log("Key code: " + e.keyCode);
})
window.addEventListener('keyup', function (e) {
	myGameArea.key = false;
})