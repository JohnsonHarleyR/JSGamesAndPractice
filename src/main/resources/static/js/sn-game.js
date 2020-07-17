//This is my first attempt at a moving game so I ended up taking a lot from tutorials here:
//https://www.w3schools.com/graphics/game_components.asp

function loadPage() {

	//set up main sprite
	//drawMainSprite(10, 150);
	
	//TEST
	//move = setInterval(moveSprite, 3000);
	
	startGame();
}

function startGame() {
	console.log("");
	console.log("Starting game.");
	
	gameOver = false;
	myGameArea.start();
	myGamePiece = new component(WIDTH, HEIGHT, "#FF39A2", 10, 150);
	secondGame = true;
	
	
}

function updateGameArea() {
	myGameArea.clear();
	//check collision
	myGamePiece.x += xDir; //this way it changes if the direction changes
	myGamePiece.y += yDir;
	myGamePiece.update();
	checkCollision();
	
	//Key codes
	if (myGameArea.key && myGameArea.key == 38) {changeUp();}
	if (myGameArea.key && myGameArea.key == 40) {changeDown();}
	if (myGameArea.key && myGameArea.key == 37) {changeLeft();}
	if (myGameArea.key && myGameArea.key == 39) {changeRight();}
	
	if (!gameOver) {
		coord.innerText = "X: " + myGamePiece.x + " Y: " + myGamePiece.y;
	} else {
		coord.innerText = "Game Over";
	}
	
}

function component(width, height, color, x, y) {
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
}

//stop moving
function stopMove() {
	xDir = 0;
	yDir = 0;
}

function changeUp() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== SPEED && !gameOver) {
		xDir = 0;
		yDir = -SPEED;
	}
	//myGameArea.speedY -= SPEED;
}

function changeDown() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== -SPEED && !gameOver) {
		xDir = 0;
		yDir = SPEED;
	}
	//myGameArea.speedY += SPEED;
}

function changeLeft() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== SPEED && !gameOver) {
		xDir = -SPEED;
		yDir = 0;
	}
	//myGameArea.speedX -= SPEED;
}

function changeRight() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== -SPEED && !gameOver) {
		xDir = SPEED;
		yDir = 0;
	}
	//myGameArea.speedX += SPEED;
}


//Variables
var myGameArea = {
	canvas: document.getElementById('board'),
	start: function() {
		console.log("");
		xDir = SPEED;
		yDir = 0;
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.context = this.canvas.getContext('2d');
		this.clear();
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		clearInterval(this.interval);
		this.interval = setInterval(updateGameArea, INTERVAL);
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


const SPEED = 4;
const INTERVAL = 15;
const GRAB_POINTS = 5;
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 400;
const WIDTH = 15;
const HEIGHT = 15;
var IMAGE = "/sn/sprite.png";

var coord = document.getElementById("map");

var xDir = SPEED; //direction and speed of x - 0 means still
var yDir = 0; //direction and speed of y - 0 means still

var myGamePiece;
var body = document.getElementById('body');
//var board = document.getElementById('board');

var startGameBtn = document.getElementById('start');
var upBtn = document.getElementById('up');
var leftBtn = document.getElementById('left');
var rightBtn = document.getElementById('right');
var downBtn = document.getElementById('down');

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