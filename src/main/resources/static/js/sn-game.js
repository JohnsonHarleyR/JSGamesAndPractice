function loadPage() {
	//set up
	board.width = CANVAS_WIDTH;
	board.height = CANVAS_HEIGHT;
	
	
	
	//set up main sprite
	drawMainSprite(10, 150);
	
	//TEST
	//move = setInterval(moveSprite, 3000);
	
	startGame();
}

function startGame() {
	gameOver = false;
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
		ctx = board.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

function updateBoard() {
	board.clear();
	board.newPos();
	board.update();
}

function moveUp() {
	board.speedY -= SPEED;
}

function moveDown() {
	board.speedY += SPEED;
}

function moveLeft() {
	board.speedX -= SPEED;
}

function moveRight() {
	board.speedX += SPEED;
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

//change the direction according to mouse or button pressed
function changeDirection(direction) {
	switch (direction) {
	case "up":
		moveX = 0;
		moveY = -SPEED; //double check, if they go in wrong direction then change to opposite
		break;
	case "down":
		moveX = 0;
		moveY = SPEED;
		break;
	case "left":
		moveX = -SPEED;
		moveY = 0;
		break;
	case "right":
		moveX = SPEED;
		moveY = 0;
		break;
	}
	
	//move sprite
	moveSprite();
	
}

//Variables
var SPEED = 5;
var GRAB_POINTS = 5;
var CANVAS_WIDTH = 550;
var CANVAS_HEIGHT = 400;
var WIDTH = 15;
var HEIGHT = 15;
var IMAGE = "/sn/sprite.png";

var body = document.getElementById('body');
var board = document.getElementById('board');

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
upBtn.onclick = moveUp;
leftBtn.onclick = moveLeft;
rightBtn.onclick = moveRight;
downBtn.onclick = moveDown;