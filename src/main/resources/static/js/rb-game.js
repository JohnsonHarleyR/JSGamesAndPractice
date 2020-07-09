//functions

//Load page
function loadPage() {
	console.log("Loading page...");
	//set up board
	
	board = document.createElement("table");
	board.id = "board";
	board.class = "table";
	board.innerHTML = "";
	main.appendChild(board);
	
	
	console.log("Setting up board");
	//fill the cell texts
	var cellTexts = [25];
	for (var i = 0; i < 25; i++) {
		var tempString = "";
		var used;
		do {
			used = false;
			//if it's the center cell, add "free space"
			if (i !== 12) {
				var num = Math.floor(Math.random() * texts.length);
				tempString = texts[num];
			} else {
				tempString = "Free space.";
			}
			
			//loop through cellTexts to see if any of them equal temp String
			for (var n = 0; n < cellTexts.length; n++) {
				if (cellTexts[n] == tempString) {
					used = true;
				}
			}
			
			if (!used) {
				cellTexts[i] = tempString;
			}
			
		} while (used); //loop if string is already in array
	}
	
	//Set the cells up
	var count = 0; //count
	for (var r = 0; r < rows; r++) {
		
		var row = board.insertRow(r);
		for (var c = 0; c < cols; c++) {
			
			//Insert cell
			var cell = row.insertCell(c);
			cell.className = "cell";
			cell.innerHTML = "" + cellTexts[count];
			cell.addEventListener("click", markSpace); //add marker if you click a cell
			
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
			
			count++;
		}
	}
	
	
}

//Add or remove marker
function markSpace() {
	
	//if it's not marked
	if (this.getAttribute('marked') === 'false') {
		
		this.setAttribute('marked', true);
		this.innerHTML = "<img class='marker' src='" + marker + "'/>";
		
	//or if it is
	} else {
		
		this.setAttribute('marked', false);
		this.innerHTML = this.getAttribute('text');
		
	}
}

//check for repeats - returns true or false
function isNotUsed(strings, newString) {
	var notUsed = true;
	
	//loop through strings to make sure new one isn't already used
	for (var i = 0; i < strings.length; i++) {
		if (newString === strings[i]) {
			notUsed = false;
		}
	}
	
	return notUsed;
}



//variables
var rows = 5;
var cols = 5;
var marker = "/rb/marker3.png";

var texts = ['A bridge.', 'A state border sign.', 'California license plate.', 'Marathon gas station sign.',
	'Taco Bell sign.', 'Someone fixing their tire.', 'A museum billboard.', 'A casino billboard.',
	'A dog in a car.', 'A motorcycle.', 'Florida license plate.', 'A car with custom paint.', 'Georgia license plate.',
	'Texas license plate.', 'A plane flying.', 'Motel 6 sign.', 'Holiday Inn Sign.', 'Amusement park sign.',
	'Children waving.', 'A car with the stereo cranked up.', 'A police car.', 'An ambulance.', 'A car older than 1975.',
	'A honking semi.', 'A car accident.', 'Roadkill.', 'An Amish person.', 'A tiny car.', 'A live wild animal.',
	'A horse.', 'A cow.', 'A motorhome.', 'Teenagers having fun.', 'A limo.', 'A helicopter.', 'A lake.',
	'A skyscraper.', 'A school bus.', 'A brewery sign.', 'New York license plate.', 'Someone watching tv.',
	'A sign for a zoo.'];

var game;
var board;

var body = document.getElementById('body');
var main = document.getElementById('main');



//Event handlers
body.onload = loadPage;