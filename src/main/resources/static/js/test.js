function startGame() {
	gameOver = false;
	
	gameArea.id = "game-area";
	gameArea.start();
	
	gamePiece = new component(200,200, "main");
	gamePiece.update();
	drawSprite();
	
	myCanvas(); //test
	
}

function myCanvas() { //test
	  var c = document.getElementById("myCanvas");
	  var ctx = c.getContext("2d");
	  var img = document.getElementById("scream");
	  ctx.drawImage(img,10,10);
	}

function createSprite() {
	var sprite = document.createElement('img');
	sprite.className = "sprite";
	sprite.width = WIDTH;
	sprite.height = HEIGHT;
	sprite.src = "/sn/sprite.png";
	return sprite;
}

function drawSprite() {
	var ctx = gameArea.canvas.getContext("2d");
	var img = createSprite();
	img.src = "/sn/sprite.png";
	ctx.drawImage(img, 100, 100);
}


function component (x, y, type) {
	this.type = type;
	this.score = 0;
	this.width = WIDTH; //all objects are almost the same for this game
	this.height = HEIGHT;
	this.x = x;
	this.y = y;
	this.moveX = 0; //may need to adjust
	this.moveY = 0; //change negative or positive based on direction
	this.url = "/sn/sprite.png";
	this.points = GRAB_POINTS; //how many points for grabbing object
	this.update = function() {
		console.log("updating component");
		var ctx = gameArea.context;
		var img = createSprite();
		console.log("img src:" + img.src);
		ctx.drawImage(img, this.x, this.y);
	}
	
	//set a few things according to type
	if (type === "main") {
		this.moveY = SPEED; //main object starts moving right
	} else if (type === "main" || type === "snake") {
		this.points = 0; //you don't get any points for running into yourself
	}
	
	/* this.update = function() { //may not need, we'll see
		ctx = myGameArea.context;
	} */
	
	this.newPos = function() {
			this.x += this.moveX;
			this.y += this.moveX;
	}
	
	this.hitEdge = function() {
		var leftEdge = 0;
		var rightEdge = CANVAS_WIDTH - this.WIDTH;
		var topEdge = 0;
		var bottomEDGE = CANVAS_HEIGHT - this.HEIGHT;
		
		if (this.x <= leftEdge || this.x >= rightEdge ||
				this.y <= topEDGE || this.y >= bottomEdge) {
			gameOver = true;
			//checkGameOver(); //add function
		}
		
	}
	
	//function for crashing with snake objects
	
}

//change position of preceeding objects in snake
function updateSnake() {
	
}

function updateGameArea() {
	
}

//change the direction according to mouse pressed
function changeDirection(direction) {
	switch (direction) {
	case "up":
		mainPiece.moveX = 0;
		mainPiece.moveY = -SPEED; //double check, if they go in wrong direction then change to opposite
		break;
	case "down":
		mainPiece.moveX = 0;
		mainPiece.moveY = SPEED;
		break;
	case "left":
		mainPiece.moveX = -SPEED;
		mainPiece.moveY = 0;
		break;
	case "right":
		mainPiece.moveX = SPEED;
		mainPiece.moveY = 0;
		break;
	}
	
}


//Variables
var SPEED = 5;
var GRAB_POINTS = 5;
var CANVAS_WIDTH = 550;
var CANVAS_HEIGHT = 400;
var WIDTH = 20;
var HEIGHT = 20;

var body = document.getElementById('body');
var main = document.getElementById('main');

var mainPiece;
var gameSnake = [];
var gameOver;
var score;

//types are: mainSprite, snakeSprite, gameSprite

var gameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.id = "board";
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.context = this.canvas.getContext("2d");
		//body.insertBefore(this.canvas, document.getElementById('script'));
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		
		
		//test
		var img = createSprite();
		body.appendChild(img);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

body.onload = startGame; //change this eventually so it doesn't start as soon as it loads