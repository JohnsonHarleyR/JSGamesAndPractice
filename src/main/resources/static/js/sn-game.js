function loadPage() {
	//set up
	board.width = CANVAS_WIDTH;
	board.height = CANVAS_HEIGHT;
	
	
	
	//set up main sprite
	drawMainSprite(10, 150);
	
	startGame();
}

function startGame() {
	gameOver = false;
}

function drawMainSprite(x, y) { //test
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	mainSprite = document.getElementById("sprite");

	

	//mainSprite.width = "50px";
	//mainSprite.height = HEIGHT;
	ctx.drawImage(mainSprite, x, y, WIDTH, HEIGHT);
	}


//Move main sprite
function moveSprite() {
	var newX = parseInt(mainSprite.getAttribute('x')) + moveX;
	var newY = parseInt(mainSprite.getAttribute('y')) + moveY;
	
	drawMainSprite(newX, newY);
}


//Create
function createSprite(xPos, yPos) {
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

var moveX = 0;
var moveY = 0;


//Event Listeners
body.onload = loadPage; //change this eventually so it doesn't start as soon as it loads
upBtn.onclick = changeDirection("up");
leftBtn.onclick = changeDirection("left");
rightBtn.onclick = changeDirection("right");
downBtn.onclick = changeDirection("down");