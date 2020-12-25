
// FIXED - FOUND A BUG WHERE IF YOU CLICK CARDS TOO FAST, IT CAN MESS WITH THE GAME

/* NOTES:
 * 
 * -First ask if on laptop or phone (this game will take it into account from the beginning.)
 * -Start by using colors to match, change to images after the game is set up properly
 * 
 * Board sizes:
 * (If it's on the phone, have the larger number be spread vertically, if it's on a
 * computer, have it spread out horizontally.)
 * 
 * super easy - 4x5 = 10 matches
 * easy - 5x6 = 15 matches
 * medium - 5x8 = 20 matches
 * hard - 5x10 = 25 matches
 * extra hard - 5x10 = 30 matches
 * 
  * super easy - 2x3 = 3 matches
 * easy - 3x4 = 6 matches
 * medium - 4x5 = 10 matches
 * hard - 5x6 = 15 matches
 * extra hard - 5x8 = 20 matches
 * 
 * 
 * BASIC STEPS:
 * 1. Set variables for height and width - according to chosen size (fit in different sizes later)
 * 2. Create board according to size specifications
 * 3. Specify variable for number of matches according to board size ( (wXh)/2 )
 * 4. Set array of images for each size board/level, 2 of each image... Randomize order of images in this array
 * 5. Set up the board, each "tile" will have a front and back... when a tile is clicked, reveal the image beneath
 * 6. Set up an animation so that if the images match each other, they stay flipped. If they do not, hold the 
 *    images in place for a few seconds before flipping back over.
 * 7. Display text that says whether it's a match or not.
 * 8. Have a count of matches left and if there's a match, subtract from this number.
 * 9. Create a boolean that says whether everything is matched or not. After each match, check the matches left.
 *    if there are none left, then the game is finished.
 * 
 */


//functions

function loadPage() {
	
}

//New Game - eventually this will be the onload before the set game
// it is where the number of rows and cols will be decided
function newGame() {
	
}

//Set Game
function setGame() {
	//console.log("Loading page...");
	
	//clear main to reload it
	main.innerHTML = start;
	
	//add a div
	game = document.createElement("div");
	game.id = "game";
	game.className = "game";
	game.innerHTML = "";
	main.appendChild(game);
	
	//set the number of moves the player has taken
	moves = 0;
	
	//add moves message for the board
	movesMsg = document.createElement("section");
	movesMsg.id = "moves";
	movesMsg.innerHTML = "Moves: " + moves;
	game.appendChild(movesMsg);
	
	//add regular message for the board
	message = document.createElement("section");
	message.id = "message";
	message.innerHTML = "Let's begin!";
	game.appendChild(message);
	
	//set up board
	board = document.createElement("table");
	board.id = "board";
	//board.className = "table";
	board.innerHTML = "";
	game.appendChild(board);
	
	//set the number of rows and cols
	rows = 3; //for now, keep them at the default
	cols = 4;
	
	
	//find number of cards
	numCards = rows * cols;
	//find num of matches - which is half the cards
	numMatches = (rows * cols) / 2;
	
	cardsFlipped = 0;
	flipping = false;
	
	//Create variables for front and back images of cards
	var cardFronts = [numCards];
	var cardBacks = [numCards];
	
	//create array of booleans so that once the number of matches of a card equals is at the limit,
	//it sets the boolean to true so that it will not create too many of the same card
	
	
	//add the front urls
	for (var i = 0; i < numCards; i++) {
		cardFronts[i] = "/mt/front.png";
	}
	
	//add a temporary placeholder for back urls
	for (var i = 0; i < numCards; i++) {
		cardBacks[i] = "/mt/blank.png";
	}
	
	//add the back urls
	//console.log("Setting up images to match.") //test
	for (var i = 0; i < numCards; i++) {
		var tempImg; //for testing if an image can be a random image or not
		var timesUsed; //to count how many times an image has already been used
		
		//console.log("Setting image " + i + "."); //test
		
		do {
			timesUsed = 0; //before counting how many times an image is used
			//select a random match image based on how many different matches were calculated
			var num = Math.floor(Math.random() * numMatches + 1);
			//console.log("Num: " + num);
			tempImg = "/mt/card" + num + ".png"; //randomized image
			//console.log("Temp image: " + tempImg); //test
			
			//now determine if this random image is ok to use or not
			//if it's not then repeat until an appropriate image is found
			
			//loop through cardBacks to see how many times this card has been used already
			for (var n = 0; n < cardBacks.length; n++) {
				//add to timesUsed each time it's found
				//console.log("CardBacks[n]: " + cardBacks[n]); //test
				if (cardBacks[n] === tempImg) {
					timesUsed++;
				}
			}
			//if it's been used less than two times, make that cardBack img equal the tempImg
			if (timesUsed < 2) {
				cardBacks[i] = tempImg;
				//console.log("Card set successfully!"); //test
			} else { //for test
				//console.log("Unsuccessful, finding different card..."); //test
			}
		//if the random image has already been used twice, repeat this step all over for this card
		//in order to select a different image
		} while (timesUsed > 1);
		
		
		//var tempNum = i + 1;
		//cardBacks[i] = "/mt/card" + 1 + ".png"; //temporarily make them all the same
	}
	
	
	//put images on board
	//Set the images up
	var count = 0; //count
	for (var r = 0; r < rows; r++) {
		
		var row = board.insertRow(r);
		for (var c = 0; c < cols; c++) {
			
			//Insert cell/card
			var card = row.insertCell(0);
			//Note: for some reason, the alignment gets messed up if I add a class name.
			//This does not happen with the roadside bingo game though. It's weird.
			//card.className = "card"; 
			card.id = "card" + r + "" + c;
			card.innerHTML = '<img class="card" src="'+ frontImg + '">'; //for now set the image this way
			//set an attribute to it to give the name of the image underneath
			card.setAttribute("match", cardBacks[count]);
			card.addEventListener("click", flipCard); //flip over card
			
			//console.log(card.id + " has a back image of " + card.getAttribute("match") + ".");
			
			//Set an attribute about whether a card has been flipped. This only becomes true after there's
			//a match.
			card.setAttribute("flipped", false);
			//card.setAttributeNode(flipped);
			//flipped.value = false;
			
			/*
			var text = document.createAttribute("text", cellTexts[count]);
		    cell.setAttributeNode(text);
		    text.value = cellTexts[count];
		    
		    var marked = document.createAttribute("marked", false);
		    cell.setAttributeNode(marked);
		    marked.value = false;
		    */
			
			count++;
		}
		//console.log("Row " + r + " done.");
	}
	
}

function flipCard() {
	
	//Set it so that it keeps the image flipped for a few seconds before flipping back if it's the
	//second card.
	//Also add a "flip" sound if possible, after the rest is finished
	
	
	//ONLY DO ANY OF THIS IF THE "flipped" ATTRIBUTE IS FALSE
	if (this.getAttribute("flipped") === "false" && flipping === false) {
		//console.log("Flipped found false."); //test
		
		//set the "flipNum" - this determines how many cards are currently flipped for a match
		flipNum += 1;
		
		//make it so the image changes to the one on the other side (the "match" image)
		console.log(this.getAttribute("match")); //test
		this.innerHTML = '<img class="card" src="'+ this.getAttribute("match") + '">';
		
		//check for cards flipped and set the match cards aka "flip1" and "flip2"
		if (flipNum === 1) {
			//set flip1 to the card's back image
			flip1 = this;
		}
		
		//now check if it's the second card flipped to find a match
		if (flipNum === 2) {
			//console.log("Second card flipped.")
			
			//set flip2 to the card's back image
			flip2 = this;
			
			//add to number of moves taken
			moves += 1;
			movesMsg.innerHTML = "Moves: " + moves;
			
			//check for a match
			if (flip1.getAttribute("match") === flip2.getAttribute("match")) {
				//console.log("There's a match!"); //test
				
				//if it's a match, set the "flipped" attributes to true
				flip1.setAttribute("flipped", true);
				flip2.setAttribute("flipped", true);
				//give a message
				message.innerHTML = "It's a match!";
				
				//add to the number of cards flipped
				cardsFlipped += 2;
				
			} else { //if it's not a match
				//console.log("Not a match."); //test
				flipping = true;
				
				//perhaps display a message?
				message.innerHTML = "Not a match.";
				
				//delay for a few seconds before flipping cards back over
				setTimeout(function(){
					console.log("Pausing..."); //test
					//flip both cards back to front card
					flip1.innerHTML = '<img class="card" src="'+ frontImg + '">';
					flip2.innerHTML = '<img class="card" src="'+ frontImg + '">';
					flipping = false;
				}, 1000);
				
				
				
			}
			
			
			
			// set the flipNum number back to 0
			flipNum = 0;
		}
	} else { //temp test
		//console.log("Card already flipped.");
	}
	
	//Check if all the cards are flipped. If they are all flipped, give a message saying the game
	//is done.
	if (cardsFlipped === numCards) {
		message.innerHTML = "Congrats, you did it!";
	}
	
	
}


//variables
var rows = 2;
var cols = 3;

var game;
var board;
var message;
var movesMsg;

var newGameBtn;

var body = document.getElementById('body');
var main = document.getElementById('main');

var start = "<div id='navigation'><a href='/'>Go Back</a></div>" +
		"<h1>Matching Game</h1>" + 
		"Click on a difficulty to start a new game.<br>" +
		"Also, you can change the board to fit either a computer or phone!<br><br>";
//Add buttons about layout to select difficulty
//Add ability to change layout based on whether it's on a phone or computer

//images
var frontImg = "/mt/front.png";

//game variables
var numCards;
var numMatches;
var cardsFlipped; //count how many cards have been flipped

var flipNum = 0;
var flip1; //to see if there's a match
var flip2; //see if there's a match

var moves = 0; //how many moves the player has taken

var flipping = false; //to prevent bugs, won't let you flip another card if in the middle of matching



//Event handlers
body.onload = setGame; //this will change to only happen when a new game level is clicked.
