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
	myGameArea.start();
	myGamePiece = new component(WIDTH, HEIGHT, "#FF39A2", 10, 150);
	gameOver = false;
}

function updateGameArea() {
	myGameArea.clear();
	//check collision
	myGamePiece.x += xDir; //this way it changes if the direction changes
	myGamePiece.y += yDir;
	myGamePiece.update();
	myGamePiece.checkCollision();
	
	coord.innerText = "X: " + myGamePiece.x + " Y: " + myGamePiece.y;
	
}

function drawMainSprite(x, y) { //test
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	mainSprite = document.getElementById("sprite");

	ctx.drawImage(mainSprite, x, y, WIDTH, HEIGHT);
	}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	
	this.checkCollision = function() {
		console.log("Checking collision");
		//first make the piece stop
		if (this.x === 0) {
			
			xDir = 0;
		}
	}
}


function changeUp() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== SPEED) {
		xDir = 0;
		yDir = -SPEED;
	}
	//myGameArea.speedY -= SPEED;
}

function changeDown() {
	//only do it if you're not going the opposite direction when it's hit
	if (yDir !== -SPEED) {
		xDir = 0;
		yDir = SPEED;
	}
	//myGameArea.speedY += SPEED;
}

function changeLeft() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== SPEED) {
		xDir = -SPEED;
		yDir = 0;
	}
	//myGameArea.speedX -= SPEED;
}

function changeRight() {
	//only do it if you're not going the opposite direction when it's hit
	if (xDir !== -SPEED) {
		xDir = SPEED;
		yDir = 0;
	}
	//myGameArea.speedX += SPEED;
}



//Create
function createSprite() {
	var sprite = document.createElement('img');
	sprite.className = "sprite";
	sprite.width = WIDTH;
	sprite.height = HEIGHT;
	sprite.src = IMAGE;
	
	
	return sprite;
}

//Variables
var myGameArea = {
	canvas: document.getElementById('board'),
	start: function() {
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.context = this.canvas.getContext('2d');
		//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, INTERVAL);
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
upBtn.onclick = changeUp;
leftBtn.onclick = changeLeft;
rightBtn.onclick = changeRight;
downBtn.onclick = changeDown;