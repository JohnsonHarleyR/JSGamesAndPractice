
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

//New Game - eventually this will be the onload before the set game
// it is where the number of rows and cols will be decided

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
	
	
	//set up board
	board = document.createElement("table");
	board.id = "board";
	//board.className = "table";
	board.innerHTML = "";
	game.appendChild(board);
	
	
	//set the number of rows and cols
	rows = 4; //for now, keep them at the default
	cols = 5;
	
	
	//find number of cards
	var numCards = rows * cols;
	//find num of matches - which is half the cards
	var numMatches = (rows * cols) / 2;
	
	//Create variables for front and back images of cards
	var cardFronts = [numCards];
	var cardBacks = [numCards];
	
	//create array of booleans so that once the number of matches of a card equals is at the limit,
	//it sets the boolean to true so that it will not create too many of the same card
	
	
	//add the front urls
	for (var i = 0; i < numCards; i++) {
		var tempNum = i + 1;
		cardFronts[i] = "/mt/front.png";
	}
	
	//add the back urls
	for (var i = 0; i < numCards; i++) {
		var tempNum = i + 1;
		cardBacks[i] = "/mt/card" + 1 + ".png"; //temporarily make them all the same
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
			//determine background color
			var temp = count + 1;
			if (temp % 2 === 0) {
				cell.className = "cell-green";
			} else {
				cell.className = "cell-blue";
			}
			
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
	if (this.getAttribute("flipped") === "false") {
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
			console.log("Second card flipped.")
			
			//set flip2 to the card's back image
			flip2 = this;
			
			//check for a match
			if (flip1.getAttribute("match") === flip2.getAttribute("match")) {
				console.log("There's a match!"); //test
				
				//if it's a match, set the "flipped" attributes to true
				flip1.setAttribute("flipped", true);
				flip2.setAttribute("flipped", true);
				
			} else { //if it's not a match
				console.log("Not a match."); //test
				
				//delay for a few seconds before flipping cards back over
				
				//perhaps display a message?
			}
			
			
			
			// set the flipNum number back to 0
			flipNum = 0;
		}
	} else { //temp test
		console.log("Card already flipped.");
	}
	
	
	
	
}

//Check if a match has been found.
function checkMatch() {
	
}


//variables
var rows = 4;
var cols = 5;

var game;
var board;

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
var flipNum = 0;
var flip1; //to see if there's a match
var flip2; //see if there's a match



//Event handlers
body.onload = setGame; //this will change to only happen when a new game level is clicked.
