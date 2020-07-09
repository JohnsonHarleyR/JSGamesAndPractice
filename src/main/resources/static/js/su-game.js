function loadPage() {
	//set up an empty sudoku board	
	board = document.createElement("table");
	board.id = "board";
	board.class = "table";
	board.innerHTML = "";
	main.appendChild(board);
	
	//create all cells on the board
	for (var r = 0; r < 9; r++) {
		
		var row = board.insertRow(r);
		for (var c = 0; c < 9; c++) {
			
			var a = r + 1;
			var b = c + 1;
			
			var cell = row.insertCell(c);
			cell.id = "c" + a + "" + b;
			cell.class = "cell";
			
			var val = document.createAttribute("value", 0); //default is 0
		    cell.setAttributeNode(val);
		    val.value = 0;
		    
		    var src = document.createAttribute("src", "su/blank.png"); //default is 0
		    cell.setAttributeNode(src);
		    src.value = "su/blank.png";
		    
		    cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
		}
	}
	
	//function to set everything to 0 again
	
	
	
	//set test buttons
	testing = document.createElement("div");
	testing.id = "testing";
	testing.class = "testing";
	testing.innerHTML = "";
	main.appendChild(testing);
	
	
	resetBoardBtn = document.createElement("button");
	resetBoardBtn.id = "reset-board-btn";
	resetBoardBtn.innerText = "Reset Board";
	resetBoardBtn.addEventListener("click", resetCells);
	testing.appendChild(resetBoardBtn);
	
	
	easyPuzzleBtn1 = document.createElement("button");
	easyPuzzleBtn1.id = "easy-puzzle-btn-1";
	easyPuzzleBtn1.innerText = "Test: Easy 1";
	easyPuzzleBtn1.addEventListener("click", easyPuzzle1);
	testing.appendChild(easyPuzzleBtn1);
	
	
}

//Set the number and also change the image
function setValue(value, row, col) {
	var cell = board.rows[row].cells[col];
	
	var a = row + 1;
	var b = col + 1;
	//set visible attribute to visible
	cell.setAttribute('value', value);
	var url = getImage(row, col);
	console.log("Image retrieved: " + url);
	cell.setAttribute('src', url);
	cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
}


//get the right image url for a cell
function getImage(row, col) {
	var cell = board.rows[row].cells[col];
	var value = cell.getAttribute('value');
	console.log("Value retrieved: " + value);
		
	switch (value) {
	case '-1':
		return "su/black-1.png";
	case '1':
		return "su/black1.png";
	case '2':
		return "su/black2.png";
	case '3':
		return "su/black3.png";
	case '4':
		return "su/black4.png";
	case '5':
		return "su/black5.png";
	case '6':
		return "su/black6.png";
	case '7':
		return "su/black7.png";
	case '8':
		return "su/black8.png";
	case '9':
		return "su/black9.png";
	default:
		return "su/blank.png";
	}
	
	
}

//reset the value of all cells to 0
function resetCells() {
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			setValue(0, r, c);
		}
	}
}


//Test methods
function easyPuzzle1() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(8, 0, 1); setValue(2, 0, 6);
	setValue(8, 1, 4); setValue(4, 1, 5); setValue(9, 1, 7);
	setValue(6, 2, 2); setValue(3, 2, 3); setValue(2, 2, 4); setValue(1, 2, 6);
	setValue(9, 3, 1); setValue(7, 3, 2); setValue(8, 3, 7);
	setValue(8, 4, 0); setValue(9, 4, 3); setValue(3, 4, 5); setValue(2, 4, 8);
	setValue(1, 5, 1); setValue(9, 5, 6); setValue(5, 5, 7);
	setValue(7, 6, 1); setValue(4, 6, 4); setValue(5, 6, 5); setValue(8, 6, 6);
	setValue(3, 7, 1); setValue(7, 7, 3); setValue(1, 7, 4);
	setValue(8, 8, 2); setValue(4, 8, 7);
	
}



//Variables
var body = document.getElementById('body');
var main = document.getElementById('main');

var board;
var solved; //solved board
var unsolved; //unsolved board

//test buttons
var easyPuzzleBtn1;


var resetBoardBtn;



//Event Handlers
body.onload = loadPage;

//test buttons
//easyPuzzleBtn1.onclick = easyPuzzle1;
