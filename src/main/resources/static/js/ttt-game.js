//Function for when an item on grid is clicked
function clickSquare() {
	
	//check state of square, only do it if it's blank
	if (this.state === 0 && msgState === 0) {
		if (turn === 1) {
			this.src = "ttt/xSquare.png";
			this.state = 1;
			turn = 2;
		} else if (turn === 2) {
			this.src = "ttt/oSquare.png";
			this.state = 2;
			turn = 1;
		}
		gridCount++;
		
		//check for a winner
		checkWinner();
		
		changeStates();
		
	}
	
}

//update message
function updateMessage() {
	if (msgState === 0) {
		message.innerText = "Let's play!";
		message.className = "def";
	} else if (msgState === 1) {
		message.innerText = "X wins!"
		message.className = "xwins";
		if (goesFirst === 1) {
			goesFirst = 2;
		} else {
			goesFirst = 1;
		}
		
	} else if (msgState === 2) {
		message.innerText = "O wins!"
		message.className = "owins";
		if (goesFirst === 1) {
			goesFirst = 2;
		} else {
			goesFirst = 1;
		}
	} else {
		message.innerText = "No winner."
		message.className = "nowins";
		if (goesFirst === 1) {
			goesFirst = 2;
		} else {
			goesFirst = 1;
		}
	}
}


//Check for a winner
function checkWinner() {
	
	//figure out the winner
	for (var i = 1; i <= 2; i++) {
		//if any of these states are true, then set msgState to i
		if (a1.state === i && b1.state === i && c1.state === i ||
			a2.state === i && b2.state === i && c2.state === i ||
			a3.state === i && b3.state === i && c3.state === i ||
			a1.state === i && a2.state === i && a3.state === i ||
			b1.state === i && b2.state === i && b3.state === i ||
			c1.state === i && c2.state === i && c3.state === i ||
			a1.state === i && b2.state === i && c3.state === i ||
			a3.state === i && b2.state === i && c1.state === i) {
			msgState = i;
		}
	}
	//if msgState is still 0, change it to 3 because it's a cat
	if (gridCount === 9 && msgState === 0) {
		msgState = 3;
	}
}


//function that resets the game
function resetGame() {
	
	
	//reset selector turn - 1 is x, 2 is o
	if (goesFirst === 1) {
		turn = 1;
	} else {
		turn = 2;
	}
	
	
	//reset message state - 0 is no message. 1 is x wins. 2 is o wins.
	msgState = 0;
	
	//reset grid squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].state = 0;
	}
	
	//reset finished
	finished = false;
	
	//reset grid count
	gridCount = 0;
	
	//change states of everything
	changeStates();
	
	//Set message text and class to default
	message.innerText = "Let's play!";
	message.className = "def";
}

//function that changes image based on state
function changeStates() {
	
	//update square images
	for (var i = 0; i < squares.length; i++) {
		if (squares[i].state === 1) {
			squares[i].src = 'ttt/xSquare.png';
			//console.log(selector);
		} else if (squares[i].state === 2) {
			squares[i].src = 'ttt/oSquare.png';
			//console.log(selector);
		} else {
			squares[i].src = 'ttt/blankSquare.png';
		}
	}
	
	//update selector image
	if (turn === 1) {
		selector.src = 'ttt/xSquare.png';
	} else {
		selector.src = 'ttt/oSquare.png';
	}
	
	
	//update message
	updateMessage();
	
	
}


//Store all variables on the grid and next to it

//Body for onload
var body = document.getElementById('body');

//Winner message
var message = document.getElementById('message');


//Selector - shows who's turn it is
var selector = document.getElementById('selector');

//New Game button
var newGame = document.getElementById('new-game');

//x's and o's on grid
//State of grid square - 0 is blank, 1 is x, 2 is o
var squares =  [document.getElementById('a1'), document.getElementById('a2'), document.getElementById('a3'),
			document.getElementById('b1'), document.getElementById('b2'), document.getElementById('b3'),
			document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')];




//Now variables for the script
var turn = 0; //1 x, 2 is o
var msgState = 0; //0 is default, 1 is x, 2 is o, 3 is cat
var gridCount = 0; //this keeps track of how many squares are clicked
var finished = false;
var goesFirst = 1;


//Event handlers
body.onload = resetGame;
newGame.onclick = resetGame;

for (var i = 0; i < squares.length; i++) {
	squares[i].onclick = clickSquare;
}


