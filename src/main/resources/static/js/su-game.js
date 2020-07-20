//The only thing this game still needs is a little work on the algorithm to set puzzles... To make sure the difficulty
//does not only depend on how many cells are blank.


//FUNCTIONS TO CHOOSE FROM

//DONT FORGET ISBLANK

//difficultyIndex - this increases as the computer searches for solutions. (To try to match the brute 
//force algorithm - which is likely to rack up a lot of points, the logic solver will do it after every type of 
//guess.)

//TODO Add to function that changes the cell's icon... upon calling it, check if the user changed it...
//if they did, compare the user's answer to what it should be... if it's wrong, make the image red

//TODO A function that compares the user's incomplete board to the correct answers, tells the user if an answer
//is wrong by turning it red. If it's right, set that board cell to the user's answer, stop allowing it to change

//loadNewBoard(board, grid)

//setValue(value, row, col, color)

//***checkPuzzle() - check the solutions the user has inputted
//updateScore() - update the score label

//generatePuzzle(min, max) - generate a new puzzle with a difficulty range (for how many to remove)
	//generateEasy();
	//generateMedium();
	//generateHard()
//removeCells(min, max) - Remove cells from grid according to range

//generateFull() - the method that gets called to - first - generate the full grid

//generateNew(grid) - the method that creates a generated grid

//fullSolve(color) - solves the board fully - first uses the solveByLogic. If that fails, it uses brute force.
//set the solved grid to this to use it later

//buttonSolver() - for the solve button to call

//checkForZeros() - returns true if any zeros are left on the board

//setBoardToNewGrid(grid, color)

//solveBruteForce(grid) - used if solveByLogic fails, and perhaps also in generating a new board

//solveByLogic - loops through all the following methods as long as anything is solved

//findNakedPair - returns true or false, depending if it finds anything - searches a set for naked pairs

//solveBySets - method that uses the following two methods on all rows, 
//columns and groups. Repeats until nothing was solved.

//SolveForSingleZeros - look through the set to see if only one cell equals zero. If only one does, 
//figure out the missing number and set that missing  cell to it. Repeat until no single zeros is found.
//(this one may actually be redundant and solvable with the single solutions method)

//solveSetSingles(color) - will take cells in a row, column or group. It loops through 1-9, checking whether 
//(if a cell equals 0) it can have that number. If only one cell in the group has it as a solution, 
//set that cell to that number. Look through the numbers again every time a solution is solved.

//solveSingleSolutions(color) - will loop through grid, finding solutions for each cell. Anytime a cell has only
//one solution, that cell is set to that solution. It will loop through the grid again as long as a cell
//is changed.

//getCellSolutions(row, col) - returns array - gets all solutions for a cell
//getCellGroup(row, col) - returns array - get all the cells in a cell's group
//checkValidInSet(row, col, set) - return bookean - check if a cell solution is valid in a particular set

// turnIntoArray() - get an array version of the board
//printGrid(newGrid) - show the grid in the console
//turnIntoBoard() - turn a grid back into a board

//setAllSets(color) - set all cols, rows, groups - do this upon loading

//shuffle(array) - borrowed from someone on GitHub (this is the only thing I borrowed.)  
//https://github.com/coolaj86/knuth-shuffle


//getImpossibles(cell)
//saveImpossibles(cell, set)
//excludeImpossibles(cell, set) //returns solution set without impossibles
//excludeInSameGroup(cell)

//TEST METHODS
//easyPuzzle1();
//mediumPuzzle1();
//hardPuzzle1();

//clickTestMode();
//clickLogicSolveTest() 
//clearBlue() - clears all blue numbers while in test mode

//logicSolveTest() - to test if a grid can be solved with just the logic solver


//USER METHODS

function seeInstructions() {
	alert(instructions);
}


//BUTTON METHODS

//Change a blank button on the board
function changeCell() {
	
	//if test mode is on, do it this way
	if (testMode) {
		//(value, row, col, color)
		let r = parseInt(this.getAttribute("row"));
		let c = parseInt(this.getAttribute("col"));
		setValue(selectVal, r, c, "red");
		
		isBlank = false;
		
		//otherwise do it the normal way
	} else {
		if (this.getAttribute("value") === "0") { //only do it if the value is blank
			madeChange = true;
			//first check if it's the blank one
			if (selectVal === 0) {
				this.innerHTML = "<img class='square' src='/su/blank.png'/>";
			} else {
				//we will only be changing the IMAGE until later when we compare the answers to the solved version
				this.innerHTML = "<img class='square' src='/su/blue" + selectVal + ".png'/>";
			}
			
		}
		
	}
	
}

//Select a button on the side
function selectBtn() {
	//place its value as the active value
	selectVal = parseInt(this.getAttribute("value"));
	//reset the class of all other similar buttons
	btn1.className = "user-btn"; btn2.className = "user-btn"; btn3.className = "user-btn";
	btn4.className = "user-btn"; btn5.className = "user-btn"; btn6.className = "user-btn";
	btn7.className = "user-btn"; btn8.className = "user-btn"; btn9.className = "user-btn";
	btnBlank.className = "user-btn";
	//change the class of the active button so the user can see it
	this.className = "selected-btn";
}

/*
 *  VERY_EASY(28,30,Iteration.RANDOM),
    EASY(31,44,Iteration.RANDOM),
    MODERATE(45,49,Iteration.S_LIKE),
    HARD(49,54,Iteration.S_LIKE),
    VERY_HARD(55,61,Iteration.LINEAR);
    */

//Generate an easy puzzle
function generateEasy() {
	let min = 31;
	let max = 44;
	generatePuzzle(min, max);
}

//Generate a medium puzzle
function generateMedium() {
	let min = 45;
	let max = 49;
	generatePuzzle(min, max);
}

//Generate a hard puzzle
function generateHard() {
	let min = 49;
	let max = 54;
	generatePuzzle(min, max);
}

//test mode
function clickTestMode() {
	if (testMode) {
		testMode = false;
		this.id = "test-mode-off";
	} else {
		testMode = true;
		this.id = "test-mode-on";
	}
}

//A test method for now.
function buttonSolver() { //JUST FOR BUTTON
		
	if (!isBlank) {
		fullSolve("blue"); //the solve button solves in blue
	}
	
}

//bruteBtnSolve() - this uses only the brute force solver - potentially useful for figuring out the difficulty index of a puzzle
function bruteBtnSolve() {
	let grid = turnIntoArray();
	difficultyIndex = 0;
	
	console.log("");
	solveBruteForce(grid);
	console.log("Difficulty Index: " + difficultyIndex);
	setBoardToNewGrid(grid, "blue");
	
}

function clickLogicSolveTest() {
	logicSolveTest();
}

//A testMode method - this should only happen in test mode
function clearBlue() {
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			//if the board innerhtml contains "blue", then reset it to 0
			let string = board.rows[r].cells[c].innerHTML;
			if (string.includes("blue")) {
				//setValue(value, row, col, color)
				setValue(0, r, c, "black");
			}
		}
	}
}


//On page load
function loadPage() {
	//set up an empty sudoku board	
	board = document.getElementById("board");
	board.id = "board";
	board.class = "table";
	board.innerHTML = "";
	//main.appendChild(board);
	
	difficultyIndex = 0;
	testMode = false;
	madeChange = false;
	score = 0;
	
	//selection buttons
	btn1 = document.getElementById("b1");
	btn1.addEventListener("click", selectBtn);
	var b1Val = document.createAttribute("value", 1);
	btn1.setAttributeNode(b1Val);
	b1Val.value = 1;
	
	btn2 = document.getElementById("b2");
	btn2.addEventListener("click", selectBtn);
	var b2Val = document.createAttribute("value", 2);
	btn2.setAttributeNode(b2Val);
	b2Val.value = 2;
	
	btn3 = document.getElementById("b3");
	btn3.addEventListener("click", selectBtn);
	var b3Val = document.createAttribute("value", 3);
	btn3.setAttributeNode(b3Val);
	b3Val.value = 3;
	
	btn4 = document.getElementById("b4");
	btn4.addEventListener("click", selectBtn);
	var b4Val = document.createAttribute("value", 4);
	btn4.setAttributeNode(b4Val);
	b4Val.value = 4;
	
	btn5 = document.getElementById("b5");
	btn5.addEventListener("click", selectBtn);
	var b5Val = document.createAttribute("value", 5);
	btn5.setAttributeNode(b5Val);
	b5Val.value = 5;

	btn6 = document.getElementById("b6");
	btn6.addEventListener("click", selectBtn);
	var b6Val = document.createAttribute("value", 6);
	btn6.setAttributeNode(b6Val);
	b6Val.value = 6;

	btn7 = document.getElementById("b7");
	btn7.addEventListener("click", selectBtn);
	var b7Val = document.createAttribute("value", 7);
	btn7.setAttributeNode(b7Val);
	b7Val.value = 7;
	
	btn8 = document.getElementById("b8");
	btn8.addEventListener("click", selectBtn);
	var b8Val = document.createAttribute("value", 8);
	btn8.setAttributeNode(b8Val);
	b8Val.value = 8;
	
	btn9 = document.getElementById("b9");
	btn9.addEventListener("click", selectBtn);
	var b9Val = document.createAttribute("value", 9);
	btn9.setAttributeNode(b9Val);
	b9Val.value = 9;
	
	btnBlank = document.getElementById("blank");
	btnBlank.addEventListener("click", selectBtn);
	var bBlankVal = document.createAttribute("value", 0);
	btnBlank.setAttributeNode(bBlankVal);
	bBlankVal.value = 0;
	
	
	
	//create all cells on the board
	for (var r = 0; r < 9; r++) {
		
		var row = board.insertRow(r);
		for (var c = 0; c < 9; c++) {
			
			var a = r + 1;
			var b = c + 1;
			
			var cell = row.insertCell(c);
			cell.addEventListener("click", changeCell);
			cell.id = "c" + a + "" + b;
			//cell.class = "cell";
			
			var val = document.createAttribute("value", 0); //default is 0
		    cell.setAttributeNode(val);
		    val.value = 0;
		    
		    var src = document.createAttribute("src", "su/blank.png"); //default is 0
		    cell.setAttributeNode(src);
		    src.value = "su/blank.png";
		    
		    var cellRow = document.createAttribute("row", r);
		    cell.setAttributeNode(cellRow);
		    cellRow.value = r;
		    
		    var cellCol = document.createAttribute("col", c);
		    cell.setAttributeNode(cellCol);
		    cellCol.value = c;
		    
		    var imps = document.createAttribute("impossibles", ""); //default is 0
		    cell.setAttributeNode(imps);
		    imps.value = "";
		    
		    cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
		}
	}
	
	//set all sets to the correct cells
	setAllSets();
	
	
	
	
	
	//set test buttons
	
	
	
	testing = document.createElement("div");
	testing.id = "testing";
	testing.className = "testing";
	testing.innerHTML = "Level:<br>";
	main.appendChild(testing);
	
	
	
	generateEasyBtn = document.createElement("button");
	generateEasyBtn.id = "generate-easy-btn";
	generateEasyBtn.innerText = "Easy";
	generateEasyBtn.addEventListener("click", generateEasy);
	testing.appendChild(generateEasyBtn);
	
	generateMediumBtn = document.createElement("button");
	generateMediumBtn.id = "generate-medium-btn";
	generateMediumBtn.innerText = "Medium";
	generateMediumBtn.addEventListener("click", generateMedium);
	testing.appendChild(generateMediumBtn);
	
	generateHardBtn = document.createElement("button");
	generateHardBtn.id = "generate-hard-btn";
	generateHardBtn.innerText = "Hard";
	generateHardBtn.addEventListener("click", generateHard);
	testing.appendChild(generateHardBtn);
	
	//for line spacing
	var breakLine0 = document.createElement("br");
	testing.appendChild(breakLine0);
	
	checkBtn = document.createElement("button");
	checkBtn.id = "check-btn";
	checkBtn.innerText = "Check Answers";
	checkBtn.addEventListener("click", checkPuzzle);
	testing.appendChild(checkBtn);
	
	//for line spacing
	var breakLine = document.createElement("br");
	testing.appendChild(breakLine);
	var breakLine1 = document.createElement("br");
	testing.appendChild(breakLine1);
	
	var testText = document.createElement("text");
	testText.innerHTML = "Testing:<br>";
	testing.appendChild(testText);
	
	solveBtn = document.createElement("button");
	solveBtn.id = "solve-btn";
	solveBtn.innerText = "Solve";
	solveBtn.addEventListener("click", buttonSolver);
	testing.appendChild(solveBtn);
	
	resetBoardBtn = document.createElement("button");
	resetBoardBtn.id = "reset-board-btn";
	resetBoardBtn.innerText = "Reset Board";
	resetBoardBtn.addEventListener("click", resetCells);
	testing.appendChild(resetBoardBtn);
	
	generateBtn = document.createElement("button");
	generateBtn.id = "generate-btn";
	generateBtn.innerText = "Generate";
	generateBtn.addEventListener("click", generateFull);
	testing.appendChild(generateBtn);
	
	
	
	//for line spacing
	var breakLine3 = document.createElement("br");
	testing.appendChild(breakLine3);
	
	
	testModeBtn = document.createElement("button");
	testModeBtn.id = "test-mode-btn";
	testModeBtn.innerText = "(test mode)";
	testModeBtn.addEventListener("click", clickTestMode);
	testing.appendChild(testModeBtn);
	
	bruteForceBtn = document.createElement("button");
	bruteForceBtn.id = "brute-force-solve-btn";
	bruteForceBtn.innerText = "(brute solve)";
	bruteForceBtn.addEventListener("click", bruteBtnSolve);
	testing.appendChild(bruteForceBtn);
	
	/*
	logicSolveTestBtn = document.createElement("button");
	logicSolveTestBtn.id = "logic-solve-test-btn";
	logicSolveTestBtn.innerText = "(logic solve test)";
	logicSolveTestBtn.addEventListener("click", clickLogicSolveTest);
	testing.appendChild(logicSolveTestBtn);
	*/
	
	/*
	//for line spacing
	var breakLine4 = document.createElement("br");
	testing.appendChild(breakLine4);
	var breakLine5 = document.createElement("br");
	testing.appendChild(breakLine5);
	
	var testPuzzles = document.createElement("text");
	testPuzzles.innerHTML = "Test Puzzles:<br>";
	testing.appendChild(testPuzzles);
	
	easyPuzzleBtn1 = document.createElement("button");
	easyPuzzleBtn1.id = "easy-puzzle-btn-1";
	easyPuzzleBtn1.innerText = "Test: Easy 1";
	easyPuzzleBtn1.addEventListener("click", easyPuzzle1);
	testing.appendChild(easyPuzzleBtn1);
	
	mediumPuzzleBtn1 = document.createElement("button");
	mediumPuzzleBtn1.id = "medium-puzzle-btn-1";
	mediumPuzzleBtn1.innerText = "Test: Med 1";
	mediumPuzzleBtn1.addEventListener("click", mediumPuzzle1);
	testing.appendChild(mediumPuzzleBtn1);
	
	hardPuzzleBtn1 = document.createElement("button");
	hardPuzzleBtn1.id = "hard-puzzle-btn-1";
	hardPuzzleBtn1.innerText = "Test: Hard 1";
	hardPuzzleBtn1.addEventListener("click", hardPuzzle1);
	testing.appendChild(hardPuzzleBtn1);
	
	//for line spacing
	var breakLine = document.createElement("br");
	testing.appendChild(breakLine);
	
	easyPuzzleBtn2 = document.createElement("button");
	easyPuzzleBtn2.id = "easy-puzzle-btn-2";
	easyPuzzleBtn2.innerText = "Test: Easy 2";
	easyPuzzleBtn2.addEventListener("click", easyPuzzle2);
	testing.appendChild(easyPuzzleBtn2);
	
	mediumPuzzleBtn2 = document.createElement("button");
	mediumPuzzleBtn2.id = "medium-puzzle-btn-2";
	mediumPuzzleBtn2.innerText = "Test: Med 2";
	mediumPuzzleBtn2.addEventListener("click", mediumPuzzle2);
	testing.appendChild(mediumPuzzleBtn2);
	
	hardPuzzleBtn2 = document.createElement("button");
	hardPuzzleBtn2.id = "hard-puzzle-btn-2";
	hardPuzzleBtn2.innerText = "Test: Hard 2";
	hardPuzzleBtn2.addEventListener("click", hardPuzzle2);
	testing.appendChild(hardPuzzleBtn2);
	*/
	
	//for line spacing
	var breakLineLast1 = document.createElement("br");
	testing.appendChild(breakLineLast1);
	var breakLineLast2 = document.createElement("br");
	testing.appendChild(breakLineLast2);
	
}

function loadNewBoard(board, grid) {
	
	board.innerHTML = "";
	//main.appendChild(board);
	
	difficultyIndex = 0;
	testMode = false;
	
	//create all cells on the board
	for (var r = 0; r < 9; r++) {
		
		var row = board.insertRow(r);
		for (var c = 0; c < 9; c++) {
			
			var a = r + 1;
			var b = c + 1;
			
			var cell = row.insertCell(c);
			cell.addEventListener("click", changeCell);
			cell.id = "c" + a + "" + b;
			//cell.class = "cell";
			
			var val = document.createAttribute("value", grid[r][c]); //default is 0
		    cell.setAttributeNode(val);
		    val.value = grid[r][c];
		    
		    var src = document.createAttribute("src", "su/blank.png"); //default is 0
		    cell.setAttributeNode(src);
		    src.value = "su/blank.png";
		    
		    var cellRow = document.createAttribute("row", r);
		    cell.setAttributeNode(cellRow);
		    cellRow.value = r;
		    
		    var cellCol = document.createAttribute("col", c);
		    cell.setAttributeNode(cellCol);
		    cellCol.value = c;
		    
		    var imps = document.createAttribute("impossibles", ""); //default is 0
		    cell.setAttributeNode(imps);
		    imps.value = "";
		    
		    cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
		}
	}
	
	//set all sets to the correct cells
	setAllSets();
}

//Set the number and also change the image
function setValue(value, row, col, color) {
	var cell = board.rows[row].cells[col];
	
	var a = row + 1;
	var b = col + 1;
	//set visible attribute to visible
	cell.setAttribute('value', value);
	var url = getImage(row, col, color);
	//console.log("Image retrieved: " + url);
	cell.setAttribute('src', url);
	cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
}




//get the right image url for a cell
function getImage(row, col, color) {
	var cell = board.rows[row].cells[col];
	var value = cell.getAttribute('value');
	//console.log("Value retrieved: " + value);
		
	switch (value) {
	case '-1':
		return "su/" + color + "-1.png";
	case '1':
		return "su/" + color + "1.png";
	case '2':
		return "su/" + color + "2.png";
	case '3':
		return "su/" + color + "3.png";
	case '4':
		return "su/" + color + "4.png";
	case '5':
		return "su/" + color + "5.png";
	case '6':
		return "su/" + color + "6.png";
	case '7':
		return "su/" + color + "7.png";
	case '8':
		return "su/" + color + "8.png";
	case '9':
		return "su/" + color + "9.png";
	default:
		return "su/blank.png";
	}
}

//fix any cells where the attribute is not zero but the image has not been set

//reset the value of all cells to 0
function resetCells() {
	madeChange = false;
	score = 0;
	if (testMode) { //if in test mode, leave all red and black numbers
		clearBlue();
	} else {
		difficultyIndex = 0;
		for (var r = 0; r < 9; r++) {
			for (var c = 0; c < 9; c++) {
				setValue(0, r, c, "black");
				board.rows[r].cells[c].setAttribute("value", 0);
				var imps = [];
				saveImpossibles(board.rows[r].cells[c], imps);
			}
		}
		isBlank = true;
		solved = turnIntoArray();
	}
}



//set row and column variables - do upon load
function setAllSets() {
	//set all rows and columns
	for (var r = 0; r < 9; r++) {
		switch(r) {
			case 0:
				r1 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 1:
				r2 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 2:
				r3 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 3:
				r4 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 4:
				r5 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 5:
				r6 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 6:
				r7 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			case 7:
				r8 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
			default:
				r9 = [board.rows[r].cells[0], board.rows[r].cells[1], board.rows[r].cells[2],
				 	  board.rows[r].cells[3], board.rows[r].cells[4], board.rows[r].cells[5],
				 	  board.rows[r].cells[6], board.rows[r].cells[7], board.rows[r].cells[8]];
				break;
		}
	}
	allRows  = [r1, r2, r3, r4, r5, r6, r7, r8, r9];
	
	for (var c = 0; c < 9; c++) {
		switch(c) {
			case 0:
				c1 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 1:
				c2 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 2:
				c3 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 3:
				c4 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 4:
				c5 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 5:
				c6 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 6:
				c7 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			case 7:
				c8 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
			default:
				c9 = [board.rows[0].cells[c], board.rows[1].cells[c], board.rows[2].cells[c],
				 	  board.rows[3].cells[c], board.rows[4].cells[c], board.rows[5].cells[c],
				 	  board.rows[6].cells[c], board.rows[7].cells[c], board.rows[8].cells[c]];
				break;
		}
	}
	allCols  = [c1, c2, c3, c4, c5, c6, c7, c8, c9];
	
	//Set all groups
	g11 = [board.rows[0].cells[0], board.rows[0].cells[1], board.rows[0].cells[2],
		   board.rows[1].cells[0], board.rows[1].cells[1], board.rows[1].cells[2],
		   board.rows[2].cells[0], board.rows[2].cells[1], board.rows[2].cells[2]];
	
	g12 = [board.rows[0].cells[3], board.rows[0].cells[4], board.rows[0].cells[5],
		   board.rows[1].cells[3], board.rows[1].cells[4], board.rows[1].cells[5],
		   board.rows[2].cells[3], board.rows[2].cells[4], board.rows[2].cells[5]];
	
	g13 = [board.rows[0].cells[6], board.rows[0].cells[7], board.rows[0].cells[8],
		   board.rows[1].cells[6], board.rows[1].cells[7], board.rows[1].cells[8],
		   board.rows[2].cells[6], board.rows[2].cells[7], board.rows[2].cells[8]];
	
	
	g21 = [board.rows[3].cells[0], board.rows[3].cells[1], board.rows[3].cells[2],
		   board.rows[4].cells[0], board.rows[4].cells[1], board.rows[4].cells[2],
		   board.rows[5].cells[0], board.rows[5].cells[1], board.rows[5].cells[2]];
	
	g22 = [board.rows[3].cells[3], board.rows[3].cells[4], board.rows[3].cells[5],
		   board.rows[4].cells[3], board.rows[4].cells[4], board.rows[4].cells[5],
		   board.rows[5].cells[3], board.rows[5].cells[4], board.rows[5].cells[5]];
	
	g23 = [board.rows[3].cells[6], board.rows[3].cells[7], board.rows[3].cells[8],
		   board.rows[4].cells[6], board.rows[4].cells[7], board.rows[4].cells[8],
		   board.rows[5].cells[6], board.rows[5].cells[7], board.rows[5].cells[8]];
	
	g31 = [board.rows[6].cells[0], board.rows[6].cells[1], board.rows[6].cells[2],
		   board.rows[7].cells[0], board.rows[7].cells[1], board.rows[7].cells[2],
		   board.rows[8].cells[0], board.rows[8].cells[1], board.rows[8].cells[2]];
	
	g32 = [board.rows[6].cells[3], board.rows[6].cells[4], board.rows[6].cells[5],
		   board.rows[7].cells[3], board.rows[7].cells[4], board.rows[7].cells[5],
		   board.rows[8].cells[3], board.rows[8].cells[4], board.rows[8].cells[5]];
	
	g33 = [board.rows[6].cells[6], board.rows[6].cells[7], board.rows[6].cells[8],
		   board.rows[7].cells[6], board.rows[7].cells[7], board.rows[7].cells[8],
		   board.rows[8].cells[6], board.rows[8].cells[7], board.rows[8].cells[8]];
	
	allGroups = [g11, g12, g13, g21, g22, g23, g31, g32, g33];
	
	g11.id = "g11"; g12.id = "g12"; g13.id = "g13"; 
	g21.id = "g21"; g22.id = "g22"; g23.id = "g23"; 
	g31.id = "g31"; g32.id = "g32"; g33.id = "g33"; 
	
	//test
	//console.log("Test set setting: group 1, cell 2-2: " + allGroups[0][1].getAttribute("value"));
}

//get group set for a cell - returns an array
function getCellGroup(row, col) {
	if (row <= 2 && col <= 2) { //using two equals since it might compare a string with a digit
		//console.log("Cell's group: g11");
		return g11;
	} else if (row <= 2 && col > 2 && col <= 5) {
		//console.log("Cell's group: g12");
		return g12;
	} else if (row <= 2 && col > 5) {
		//console.log("Cell's group: g13");
		return g13;
	} else if (row > 2 && row <= 5 && col <= 2) {
		//console.log("Cell's group: g21");
		return g21;
	} else if (row > 2 && row <= 5 && col > 2 && col <= 5) {
		//console.log("Cell's group: g22");
		return g22;
	} else if (row > 2 && row <= 5 && col > 5) {
		//console.log("Cell's group: g23");
		return g23;
	}  else if (row > 5 && col <= 2) {
		//console.log("Cell's group: g31");
		return g31;
	} else if (row > 5 && col > 2 && col <= 5) {
		//console.log("Cell's group: g32");
		return g32;
	} else if (row > 5 && col > 2 && col > 5) {
		//console.log("Cell's group: g11");
		return g33;
	}
}

//CHECK PUZZLE SOLUTIONS
function checkPuzzle() { //- use the solved grid to check
	if (!isBlank) {
		//console.log("");
		//console.log("Solved:");
		//printGrid(solved);
		//console.log("");
		//console.log("Checking answers...");
		//loop through all the cells
		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				//console.log("Cell " + (r + 1) + "-" + (c + 1));
				let cell = board.rows[r].cells[c];
				let val = parseInt(board.rows[r].cells[c].getAttribute("value"));
				//console.log("Value: " + val);
				//get string of the innerHTML to check
				let imageText = board.rows[r].cells[c].innerHTML;
				//console.log("Image text: " + imageText);
				
				//make sure it's not equal to zero first and it's in blue
				if (val === 0 && imageText.includes("blue")) {
					let num = 0;
					//find out what number it represents
					if (imageText.includes("1.png")) {
						num = 1;
					} else if (imageText.includes("2.png")) {
						num = 2;
					} else if (imageText.includes("3.png")) {
						num = 3;
					}else if (imageText.includes("4.png")) {
						num = 4;
					}else if (imageText.includes("5.png")) {
						num = 5;
					}else if (imageText.includes("6.png")) {
						num = 6;
					}else if (imageText.includes("7.png")) {
						num = 7;
					}else if (imageText.includes("8.png")) {
						num = 8;
					}else if (imageText.includes("9.png")) {
						num = 9;
					}
					//console.log("Num: " + num);
					//console.log("Solved value: " + solved[r][c]);
					
					//if it's equal to the solved value,
					if (solved[r][c] == num) {
						//change it to black and set the board
						//console.log("The same as solved.");
						setValue(num, r, c, "green");
						score += SCORE_ADD;
					} else { //change the color to red but don't set the value
						//console.log("Not the same as solved.");
						let s = "<img class='square' src='/su/red" + num + ".png'/>";
						board.rows[r].cells[c].innerHTML = s;
						score -= 2;
						
					}
					
				}
				
			}
		}
		//make sure the score doesn't go below 0
		/*if (score <= 0) {
			score = 0;
		}*/
		if (madeChange) {
			//check if there are any zeros left
			let notFinished = checkForZeros();
			if (notFinished) {
				alert("Updating the grid!\n(Correct answers are green, wrong answers are red.");
				
			} else {
				score += 30;
				if (score >= 0) {
					alert("Congratulations, puzzle is solved!\nFinal Score: " + score);
				} else {
					alert("Congratulations, puzzle is solved!\nFinal Score: " + 0);
				}
				
			}
		}
		updateScore();
		madeChange = false;
	}
	
}

//update the score
function updateScore() {
	if (score >= 0 ) {
		scoreLabel.innerText = "Score: " + score;
	} else {
		scoreLabel.innerText = "Score: " + 0;
	}
	
}




//GENERATE PUZZLE

//this will be a lot like the brute force solver with a few things changed... Like randomizing the number
//generation
function generatePuzzle(min, max) { // you must turn it into a grid before passing
	let grid;
	resetCells();
	score = 0;
	updateScore();
	
	console.log("");
	//only do it if the board is blank;
	if(isBlank) {
		console.log("Generating puzzle.");
		grid = [];
		for (let i = 0; i < 9; i++) {
			let cells = [];
			grid.push(cells);
			for (let n = 0; n < 9; n++) {
				cells.push(0);
			}
		}
		grid = generateNew(grid);
		solved = [];
		
		//After generating, set the solved puzzle to grid
		for (let r = 0; r < 9; r++) {
			let ro = [];
			solved.push(ro);
			for (let c = 0; c < 9; c++) {
				let co = [];
				ro[c] = co;
				let va = JSON.parse(JSON.stringify(endGrid[r][c]));
				co.push(parseInt(va));
			}
		}
		
		//solved = endGrid;
		//remove cells according to level range
		grid = removeCells(min, max, endGrid);
		
		//now set new puzzle to board
		setBoardToNewGrid(endGrid, "black");
		//set isBlank to false
		isBlank = false;
		
		
	}
}

//Remove cells from grid according to range - return grid
function removeCells(min, max, grid) {
	//get random range number
	let range = max - min;
	let numCells = Math.floor(Math.random() * range) + min;
	
	console.log("Removing " + numCells + " cells from grid.");
	
	//randomly remove cells
	for (let n = 0; n < numCells; n++) {
		let zero = true;
		while (zero) { //make sure the cell isn't empty already
			let row = Math.floor(Math.random() * 9);
			let col = Math.floor(Math.random() * 9);
			
			//console.log("Grid value for " + (row + 1) + "-" + (col + 1) + ": " + grid[row][col]);
			
			if (grid[row][col] !== 0) {
				//console.log("Scratch that, it equals 0.");
				zero = false;
				grid[row][col] = 0;
			}
		}
		
	}
	return grid;
}


//this will be a lot like the brute force solver with a few things changed... Like randomizing the number
//generation
function generateFull() { // you must turn it into a grid before passing
	let grid;
	resetCells();
	
	//console.log("");
	//only do it if the board is blank;
	if(isBlank) {
		console.log("Generating puzzle.");
		grid = [];
		for (let i = 0; i < 9; i++) {
			let cells = [];
			grid.push(cells);
			for (let n = 0; n < 9; n++) {
				cells.push(0);
			}
		}
		grid = generateNew(grid);
		
		//After generating, set the solved puzzle to grid
		solved = endGrid;
		//eliminate some of the cells
		//now set new puzzle to board
		setBoardToNewGrid(endGrid, "black");
		//set isBlank to false
		isBlank = false;
	}
	console.log("Difficulty index: " + difficultyIndex);
}

//GENERATE A FULL SUDOKU GRID - RANDOMIZED
//this is the real method doing the work
function generateNew(grid) {
	score = 0;
	
	//console.log("Generating...");
	let empties = findGridZeros(grid);
	shuffle(empties);
	
	//loop through all cells
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			
			if (grid[r][c] == 0) {
		
			//	console.log("Looking at cell " + (r + 1) + "-" + (c + 1));
				
				//now put values 1-9 in a random order
				let nums = genGridSolutions(r, c, grid);
				shuffle(nums);
				
				if (nums[0] === undefined) {
					return false;
				}
				
				//loop through values
				for (let n = 0; n <= nums.length; n++) {
					//console.log("Trying number " + nums[n]);
					difficultyIndex++;
					grid[r][c] = nums[n];
					if (validateCellFull(r, c, grid) && generateNew(grid)) {
					//	console.log("Cell is valid, returning true");
						return true;
					}
				//console.log("Not valid, setting it back to 0.");
					grid[r][c] = 0;
				}
				return false;
			}
		}
	}
	endGrid = grid;
	//printGrid(grid);
	return grid;
}



//SOLVING METHODS

//FULL SOLVE - using solveByLogic until it can't find solutions. Then use the brute force solver as backup.
//(Logic Solver should be able to solve easy and medium puzzles, at least.)
function fullSolve(color) {
	console.log("");
	console.log("Solving puzzle.");
	//first solve by logic
	solveByLogic(color);
	
	//check if there are any zeros left
	if (checkForZeros()) {
		console.log("Now solving by brute force.");
		//if any zeros are left, use brute force
		let grid = turnIntoArray(); //turn the board into a grid to solve with
		let solved = solveBruteForce(grid);
		
		if (solved) {
			setBoardToNewGrid(grid, color);
			solved = grid;
			console.log("Solve was successful.");
		} else {
			console.log("Error in solving.");
		}
	}
	console.log("Difficulty index: " + difficultyIndex);
}

//this one creates a copy board first so that after solving, it changes it back to the original
//returns true if it's possible to solve by logic
function logicSolveTest() {
	let color = "blue";
	let solvable = true;
	difficultyIndex = 0;
	isBlank = false;
	testMode = true;
	
	//copy board to temporary board
	let tempArray = turnIntoArray();
	let tempBoard = turnIntoBoard(tempArray);
	
	console.log("");
	console.log("Testing logic solve.");
	//first solve by logic
	solveByLogic(color);
	
	//check if there are any zeros left
	if (checkForZeros()) {
		solvable = false;
	}
	console.log("Able to solve by logic?: " + solvable);
	console.log("Difficulty index: " + difficultyIndex);
	//turn the board back to the original
	board = tempBoard;
	
	return solvable;
}


//Brute Force Solver

//Important methods:

//checkValidFromGrid(row, col, set, grid)
//getArrayGroupCells(group, grid) - get all the cells in a cell's group
//getCellGroupName(row, col) - get the name of a cell's group
//validateCellFull(row, col, grid) - returns true if a cell is valid, checks all contraints

//turnIntoArray() - get an array version of the board
//printGrid(newGrid) - show the grid in the console
//turnIntoBoard() - turn a grid back into a board


//WORKS
//solveBruteForce() - returns true if successful, THEN STORES THE GRID INTO endGrid AT END OF CODE IF SO;
function solveBruteForce(grid) { // you must turn it into a grid before passing
	//console.log("");
	//console.log("Solving brute force...");
	
	//loop through cells
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			//make sure the value is 0
			if (grid[r][c] == 0) { //not sure if it will come as string or not, it should be an integer though
				
				//console.log("Cell " + (r + 1) + "-" + (c + 1) + " is empty.");
				//now loop through values
				for (let n = 1; n <= 9; n++) {
					//console.log("Testing it with value " + n);
					difficultyIndex++;
					grid[r][c] = n;
					if (validateCellFull(r, c, grid) && solveBruteForce(grid)) {
						//console.log("Cell is valid, returning true");
						return true;
					}
					//console.log("Not valid, setting it back to 0.");
					grid[r][c] = 0;
				}
				//console.log("Not valid.");
				return false;
			}
		}
	}
	//this is probably where I should set the bottom grid and print it to the console
	endGrid = grid;
	printGrid(grid);
	return true;
	
}

//Set board to new grid found with solveBruteForce
function setBoardToNewGrid(grid, color) {
	//only change the board's cell to the grid if it's 0
	//that way it can be decided what color to solve the remaining cells with
	
	//setValue(value, cellRow, cellCol, "black");
	
	//loop through board and grid
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			//if the board number is 0, set it to the grid value
			if (board.rows[r].cells[c].getAttribute("value") === "0") {
				setValue(grid[r][c], r, c, color);
			}
			
		}
	}
	
}

//genGridSolutions(row, col, grid) 
function genGridSolutions(row, col, grid) {
	//loop through all values
	let values = [1,2,3,4,5,6,7,8,9];
	let solutions = [];
	for (let n = 0; n < values.length; n++) {
		grid[row][col] = values[n];
		if (validateCellFull(row, col, grid)) {
			solutions.push(values[n]);
		}
		grid[row][col] = 0;
	}

	return solutions;
}

//findGridZeros(grid) - returns array with all empties
function findGridZeros(grid) {
	let empties = [];
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (grid[r][c] === 0) {
				empties.push(grid[r][c]);
			}
		}
	}
	return empties;
}


//validateCellFull(row, col, grid)
function validateCellFull(row, col, grid) {
	
	if (grid[row][col] === undefined) {
		return false;
	}
	//console.log("");
	//console.log("Validating cell...");
	//get the cell group
	var groupName = getCellGroupName(row, col);
	var groupSet = getArrayGroupCells(groupName, grid);
	//store the cell's row
	var rowSet = grid[row];
	//store the cell's col
	var colSet = [grid[0][col], grid[1][col], grid[2][col], grid[3][col], grid[4][col],
					grid[5][col], grid[6][col], grid[7][col], grid[8][col]];
	
	//storing variables first for the sake of testing
	var groupValid = checkValidFromGrid(row, col, groupSet, grid);
	//console.log("Group " + groupName + " valid?: " + groupValid);
	var rowValid = checkValidFromGrid(row, col, rowSet, grid);
	//console.log("Row " + (row + 1) + " valid?: " + rowValid);
	var colValid = checkValidFromGrid(row, col, colSet, grid);
	//console.log("Col " + (col + 1) + " valid?: " + colValid);
	
	//validate each of these, return true if it works
	if (groupValid && rowValid && colValid) {
		//return true if it works
		//console.log("All valid?: true");
		return true;
	} else {
		//console.log("All valid?: false");
		return false;
	}
	
}


//getArrayGroupCells(group, grid) - get the group of cells while solving for an array with brute force
function getArrayGroupCells(group, grid) {
	var groupCells = [9];
	
	//add according to grid name
	switch (group) {
		case "g11":
			groupCells = [grid[0][0], grid[0][1], grid[0][2],
						  grid[1][0], grid[1][1], grid[1][2],
						  grid[2][0], grid[2][1], grid[2][2]];
			break;
		case "g12":
			groupCells = [grid[0][3], grid[0][4], grid[0][5],
						  grid[1][3], grid[1][4], grid[1][5],
						  grid[2][3], grid[2][4], grid[2][5]];
			break;
		case "g13":
			groupCells = [grid[0][6], grid[0][7], grid[0][8],
						  grid[1][6], grid[1][7], grid[1][8],
						  grid[2][6], grid[2][7], grid[2][8]];
			break;
		case "g21":
			groupCells = [grid[3][0], grid[3][1], grid[3][2],
						  grid[4][0], grid[4][1], grid[4][2],
						  grid[5][0], grid[5][1], grid[5][2]];
			break;
		case "g22":
			groupCells = [grid[3][3], grid[3][4], grid[3][5],
						  grid[4][3], grid[4][4], grid[4][5],
						  grid[5][3], grid[5][4], grid[5][5]];
			break;
		case "g23":
			groupCells = [grid[3][6], grid[3][7], grid[3][8],
						  grid[4][6], grid[4][7], grid[4][8],
						  grid[5][6], grid[5][7], grid[5][8]];
			break;
		case "g31":
			groupCells = [grid[6][0], grid[6][1], grid[6][2],
						  grid[7][0], grid[7][1], grid[7][2],
						  grid[8][0], grid[8][1], grid[8][2]];
			break;
		case "g32":
			groupCells = [grid[6][3], grid[6][4], grid[6][5],
						  grid[7][3], grid[7][4], grid[7][5],
						  grid[8][3], grid[8][4], grid[8][5]];
			break;
		case "g33":
			groupCells = [grid[6][6], grid[6][7], grid[6][8],
						  grid[7][6], grid[7][7], grid[7][8],
						  grid[8][6], grid[8][7], grid[8][8]];
			break;
	}
	
	return groupCells;
}



function printGrid(newGrid) {
	for (var r = 0; r < 9; r++) {
		var row = newGrid[r];
		console.log(row[0] + " " + row[1] + " " + row[2] + " " + row[3] + " " + row[4]
		 + " " + row[5] + " " + row[6] + " " + row[7] + " " + row[8]);
	}
}

//get a grid with all the values
function turnIntoArray() {
	
	var newGrid = [9];
	
	for (var r = 0; r < 9; r++) {
		var cells = [9];
		newGrid[r] = cells;
		var row = allRows[r];
		for (var c = 0; c < 9; c++) {
			cells[c] = parseInt(row[c].getAttribute("value"));
		}
		
	}
	
	return newGrid;
}

//Check if a solution is valid for a particular set of cells
function checkValidFromGrid(row, col, set, grid) {
	
	//console.log("");
	//console.log("Validating cell " + (row + 1) + "-" + (col + 1) + " from grid.");
	
	//console.log("Set values: " + set[0] + ", " + set[1] + ", " + set[2] + ", " + set[3] + ", " +
		//	set[4] + ", " + set[5] + ", " + set[6] + ", " + set[7] + ", " + set[8]);
	
	//get value
	var value = grid[row][col];
	//console.log("Value: " + value);
	
	//set variable for true or false
	var valid = true;
	//console.log("Valid?: " + valid);
	
	//loop through other cells in the set to see if any of them have that value
	let numTimes = 0;
	for (var i = 0; i < set.length; i++) {
		if (set[i] === value) {
			//if it has been found more than once (because one cell WILL have that value (same cell))
			if (numTimes >= 1) {
				//console.log("Cell had some value...");
				valid = false;
			} else {
				//console.log("Same cell...");
			}
			numTimes++;
		} else {
			//console.log("Cell did not have same value...");
		}
	}
	//console.log("End result: Valid = " + valid);
	//return result
	//console.log("Returning valid...");
	return valid;
	
}

//turn an array back into a board
function turnIntoBoard(grid) {
	//set up an empty sudoku board	
	var newB = document.createElement("table");
	newB.id = "board";
	newB.class = "table";
	newB.innerHTML = "";
	
	//create all cells on the board
	for (var r = 0; r < 9; r++) {
		
		var row = newB.insertRow(r);
		for (var c = 0; c < 9; c++) {
			
			var a = r + 1;
			var b = c + 1;
			
			var value = parseInt(board.rows[r].cells[c].getAttribute("value"));
			
			var cell = row.insertCell(c);
			cell.id = "nc" + a + "" + b;
			//cell.class = "cell";
			
			var val = document.createAttribute("value", value); //default is 0
		    cell.setAttributeNode(val);
		    val.value = 0;
		    
		    var src = document.createAttribute("src", "su/blank.png"); //default is 0
		    cell.setAttributeNode(src);
		    src.value = "su/blank.png";
		    
		    var cellRow = document.createAttribute("row", r);
		    cell.setAttributeNode(cellRow);
		    cellRow.value = r;
		    
		    var cellCol = document.createAttribute("col", c);
		    cell.setAttributeNode(cellCol);
		    cellCol.value = c;
		    
		    var imps = document.createAttribute("impossibles", ""); //default is 0
		    cell.setAttributeNode(imps);
		    imps.value = "";
		    
		    cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
		}
	}
	return newB;
}

//get group set for a cell - returns an array
function getCellGroupName(row, col) {
	if (row <= 2 && col <= 2) { //using two equals since it might compare a string with a digit
		//console.log("Cell's group: g11");
		return "g11";
	} else if (row <= 2 && col > 2 && col <= 5) {
		//console.log("Cell's group: g12");
		return "g12";
	} else if (row <= 2 && col > 5) {
		//console.log("Cell's group: g13");
		return "g13";
	} else if (row > 2 && row <= 5 && col <= 2) {
		//console.log("Cell's group: g21");
		return "g21";
	} else if (row > 2 && row <= 5 && col > 2 && col <= 5) {
		//console.log("Cell's group: g22");
		return "g22";
	} else if (row > 2 && row <= 5 && col > 5) {
		//console.log("Cell's group: g23");
		return "g23";
	}  else if (row > 5 && col <= 2) {
		//console.log("Cell's group: g31");
		return "g31";
	} else if (row > 5 && col > 2 && col <= 5) {
		//console.log("Cell's group: g32");
		return "g32";
	} else if (row > 5 && col > 2 && col > 5) {
		//console.log("Cell's group: g11");
		return "g33";
	}
}





//solveByLogic - loops through all the following methods as long as anything is solved
function solveByLogic(color) {
	
	var anythingFound = false;
	
	//don't attempt if board is blank
	if (!isBlank) {
		//console.log("");
		//console.log("Solving by logic.");
		
		//returns true if anything is solved at all.
		
		
		//set variable to know whether to continue
		var solutionsFound;
		
		do {
			solutionsFound = false;
			//console.log("");
			//console.log("looping through...")
			
			//use these other methods to keep solving as long as anything is found
			
			//console.log("Solving single solutions...");
			//found helps determine when to keep going
			var found = solveSingleSolutions(color);
			difficultyIndex++;
			//console.log("Solutions found?: " + found);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			//now solveBySet
			//console.log("Solving by sets...");
			found = solveBySets(color);
			difficultyIndex++;
			//console.log("Solutions found?: " + found);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//if solutionsFound is true, set anythingFound to true;
			if (solutionsFound === true) {
				anythingFound = true;
			}
		} while (solutionsFound);
		
		console.log("Finished solving by logic.")
		
		
		//Test
	/*
	console.log("Test - solutions for 9-6: ");
	var sols = getCellSolutions(8,5);
	for (var i = 0; i < sols.length; i++) {
		console.log(sols[i]);
	}
	
	console.log("Test - impossibles for 9-6: ");
	var imps = getImpossibles(board.rows[8].cells[5]);
	for (var i = 0; i < imps.length; i++) {
		console.log(imps[i]);
	}*/
		
	}
	
	
	
	
}

//solveBySets - method that uses the following two methods on all rows, 
//columns and groups. Repeats until nothing was solved.
function solveBySets(color) {
	
	//console.log("");
	//console.log("Solving by sets.");
	
	//returns true if anything is solved at all.
	var anythingFound = false;
	
	//set variable to know whether to continue
	var solutionsFound;
	
	do {
		solutionsFound = false;
		//console.log("");
		
		//solve all rows
		for (var r = 0; r < allRows.length; r++) {
			//console.log("Solving rows.");
			var set = allRows[r];
			
			
			//then findNakedPair
			findNakedPair(set);
			difficultyIndex++;
			
			//first solveSetSingles
			var found = solveSetSingles(set, color);
			difficultyIndex++;
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set, color);
			difficultyIndex++;
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
		}
		
		//solve all columns
		for (var c = 0; c < allCols.length; c++) {
			//console.log("Solving columns.");
			var set = allCols[c];
			
			
			//then findNakedPair
			findNakedPair(set);
			difficultyIndex++;
			
			//first solveSetSingles
			var found = solveSetSingles(set, color);
			difficultyIndex++;
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set, color);
			difficultyIndex++;
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}

			
		}
		
		//solve all groups
		for (var g = 0; g < allGroups.length; g++) {
			//console.log("Solving groups.");
			var set = allGroups[g];
			
			
			//then findNakedPair
			findNakedPair(set);
			difficultyIndex++;
			
			//first solveSetSingles
			var found = solveSetSingles(set, color);
			difficultyIndex++;
			
		
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set, color);
			difficultyIndex++;
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
		}
		
		//console.log("Anything found?: " + solutionsFound);
		
		
		//if solutionsFound is true, set anythingFound to true;
		if (solutionsFound === true) {
			anythingFound = true;
		}
	} while (solutionsFound);
	
	return anythingFound;
}


//solveSetSingles - will take cells in a row, column or group. It loops through 1-9, checking whether 
//(if a cell equals 0) it can have that number. If only one cell in the group has it as a solution, 
//set that cell to that number. Look through the numbers again every time a solution is solved.
function solveSetSingles(set, color) {
	//returns true or false to say if anything was found
	var found = false;
	
	//loop through all values
	for (var v = 0; v < VALUES.length; v++) {
		
		//check if any of the set cells have that value as an attribute
		var alreadyFound = false;
		for (var i = 0; i < set.length; i++) {
			if (set[i].getAttribute("value") === (VALUES[v] + "")) {
				alreadyFound = true;
				break;
			}
		}
		
		if (!alreadyFound) {
			var value = VALUES[v];
			var timesFound = 0;
			var cellRow;
			var cellCol;
			
			//console.log("");
			//console.log("Checking set for value " + value);
			
			//loop through cells in the set, counting up how many times a cell in that set contains that solution
			for (var i = 0; i < set.length; i++) {
				if (set[i].getAttribute("value") === "0") {
					var row = parseInt(set[i].getAttribute("row"));
					var col = parseInt(set[i].getAttribute("col"));
					var solutions = getCellSolutions(row, col);
					
					//console.log("Cell " + (row + 1) + "-" + (col + 1));
					
					//check if solutions contains the value
					
					if (solutions.includes(value)) {
						timesFound++;
						cellRow = parseInt(set[i].getAttribute("row"));
						cellCol = parseInt(set[i].getAttribute("col"));
					}
				}
				
			}
			//check if it was found only once. If so, set that cell to that value.
			if (timesFound === 1) {
				setValue(value, cellRow, cellCol, color);
				found = true;
				//console.log("Value only found once. Setting cell " + (cellRow + 1) + "-" + (cellCol + 1) + 
					//	" to " + value + ".");
			} else {
		//		console.log("Value found " + timesFound + " times.");
			}
		}
		
	}
	difficultyIndex++;
//	console.log("Solutions found?: " + found);
	return found;
}




//SolveForSingleZeros - look through the set to see if only one cell equals zero. If only one does, 
//figure out the missing number and set that missing  cell to it. Repeat until no single zeros is found.
//(this one may actually be redundant and solvable with the single solutions method)
function solveForSingleZeros(set, color) {
	//returns true if any solutions were found
	var found = false;
	
	//variable to count how many cells equal 0 in the set
	//console.log("solveForSingleZeros")
	var numZeros = 0;
	var cell;
	//loop through set, see if any of them equal 0
	for (var i = 0; i < set.length; i++) {
		if (set[i].getAttribute("value") === "0") {
			numZeros++;
			cell = set[i];
		}
	}
	//console.log("Zeros in set: " + numZeros);
	//if there's only one number equal to 0, figure out the solution to that cell
	if (numZeros === 1) {
		difficultyIndex++;
		//console.log("Only one zero found in set.")
		var row = parseInt(cell.getAttribute("row"));
		var col = parseInt(cell.getAttribute("col"));
		var solutions = getCellSolutions(row, col);
		//console.log("Number of solutions found: " + solutions.length);
		//console.log("Cell " + (row + 1) + "-" + (col + 1));
		if (solutions.length === 1) {
			setValue(solutions[0], row, col, color);
		}
		//cell.setAttribute("value", solutions[0]);
		found = true;
	} else {
	//	console.log("No single zeros found in set.")
	}
	return found;
	
}


//Find solutions for all cells. Anytime it finds only one, set that cell to that solution. Keep looping
//until no single solutions are found for any of the cells
function solveSingleSolutions(color) {
	
	//returns whether or noth anything was found
	var anythingFound = false;
	
	//set variable to know whether to continue
	var solutionsFound;
	
	do {
		solutionsFound = false; //reset
	//	console.log("");
	//	console.log("Going through board to solve single solutions.");
		
		//start looping through all cells
		for (var r = 0; r < 9; r++) {
			for (var c = 0; c < 9; c++) {
				
				
				var cell = board.rows[r].cells[c];
				//only get solutions if the cells equals 0
				if (cell.getAttribute("value") === "0") {
					var solutions = getCellSolutions(r, c);
					var row = parseInt(cell.getAttribute("row"));
					var col = parseInt(cell.getAttribute("col"));
			//		console.log("Cell " + (row + 1) + "-" + (col + 1) + " solutions found: " + solutions.length);
					for (var a = 0; a < solutions.length; a++) {
					//	console.log(solutions[a]);
					}
					
					//if the length of solutions is 1, then set that cell to it and solutionsFound to true
					if (solutions.length === 1) {
						setValue(solutions[0], r, c, color);
						solutionsFound = true;
						anythingFound = true;
				//		console.log("Only one solution found for cell " + (r + 1) + "-" + (c + 1));
					} else {
						//console.log(solutions.length + " solutions found for cell " + (r + 1) + "-" + (c + 1));
					}
					if (solutions[0] === -1){
			//			console.log("Something went wrong.");
					}
				}
				
			}
		}
		difficultyIndex++;
//		console.log("Single solutions found on board?: " + solutionsFound);
		
	} while (solutionsFound);
	return anythingFound;
}


//get all possible solutions for a single cell - returns -1 if there are none
function getCellSolutions(row, col) {
	//list of all solutions for cell
	var solutions = [];
	//impossible solutions stored in the cell
	var impossibles = getImpossibles(board.rows[row].cells[col]);
	
	/*console.log ("Cell " + (row + 1) + "-" + (col + 1));
	console.log("Impossibles:");
	for (var i = 0; i < impossibles.length; i++) {
		console.log(impossibles[i]);
	}*/
	
	//get the row cells, col cells, and group cells
	var rowCells = allRows[row];
	var colCells = allCols[col];
	var groupCells = getCellGroup(row, col);
	
	//now loop through all values for that cell
	//(first check to make sure that cells value is 0
	if (board.rows[row].cells[col].getAttribute("value") === "0") {
		for (var v = 0; v < VALUES.length; v++) {
			if (checkValidInSet(row, col, VALUES[v], rowCells) && //if it's valid for corresponding row, col, and group, add to array
				checkValidInSet(row, col, VALUES[v], colCells) &&
				checkValidInSet(row, col, VALUES[v], groupCells)) {
				
				//also check the impossibles
				if(!impossibles.includes(VALUES[v])){
					//console.log("All is valid for solution " + VALUES[v] + " in cell " + (row + 1) + "-" + (col + 1));
					solutions.push(VALUES[v]);
			    } 
				
			} else {
				//console.log("Not valid for solution " + VALUES[v] + " in cell " + (row + 1) + "-" + (col + 1));
			}
		}
	} else {
		solutions.push(board.rows[row].cells[col].getAttribute("value"));
	}
	
	//now exclude the impossible solutions
	
	
	//test
	/*
	console.log("");
	console.log("Solutions before excluding: ");
	for (var k = 0; k < solutions.length; k++) {
		console.log(solutions[k]);
	}*/
	
	
	//test
	/*console.log("Impossibles:");
	var tempImp = getImpossibles(board.rows[row].cells[col]);
	for (var k = 0; k < tempImp.length; k++) {
		console.log(tempImp[k]);
	}*/
	
	/*
	
	var solutions1 = excludeImpossibles(board.rows[row].cells[col], solutions);
	
	//test
	console.log("");
	console.log("Solutions after excluding: ");
	for (var k = 0; k < solutions1.length; k++) {
		console.log(solutions1[k]);
	}
	
	*/
	
	//if there are no solutions in the list, add -1 meaning no solutions
	if (solutions.length < 1) {
		solutions.push(-1);
		console.log("Something went wrong.");
		console.log("No solutions found for cell " + (row + 1) + "-" + (col + 1));
	}
	
	//return the list of solutions
	return solutions;
}


//Check if a solution is valid for a particular set of cells
function checkValidInSet(row, col, value, set) {
	
	//set variable for true or false
	var valid = true;
	
	//Get the cell
	var cell = board.rows[row].cells[col];
	
	//loop through other cells in the set to see if any of them have that value
	for (var i = 0; i < set.length; i++) {
		if (cell !== set[i] && set[i].getAttribute("value") == value) {
			valid = false;
		}
	}
	
	//console.log("Validity for cell " + (row + 1) + "-" + (col + 1) + " with value " + value + ": " + valid);
	
	//return result
	return valid;
	
}

//Setting impossibles and naked pairs


//findNakedPair -  searches a set for naked pairs
function findNakedPair(set) {
	//array to hold cells with only two solutions
	var cellsWithTwo = [];
	
	//var success = false; //if successful, break out of loop.
	
	//loop through set
	for (var i = 0; i < set.length; i++) {
		var row = parseInt(set[i].getAttribute("row"));
		var col = parseInt(set[i].getAttribute("col"));
		
		var sols = getCellSolutions(row, col);
		
		//if it has two solutions, add it to the array
		if (sols.length === 2) {
			cellsWithTwo.push(set[i]);
		}
	}
	
	//now if the list of cells has at least two, proceed
	if (cellsWithTwo.length === 2) {
		var match = false;
		var found = false;
		var other;
		var otherRow;
		var otherCol;
		
	//	console.log("Found a possible match... They have 2 solutions...");
		for (var i = 0; i < cellsWithTwo.length; i++) {
	//		console.log(cellsWithTwo[i].id);
		}
		
		var row1 = parseInt(cellsWithTwo[0].getAttribute("row"));
		var col1 = parseInt(cellsWithTwo[0].getAttribute("col"));
		var sols1 = getCellSolutions(row1, col1);
		
		var row2 = parseInt(cellsWithTwo[1].getAttribute("row"));
		var col2 = parseInt(cellsWithTwo[1].getAttribute("col"));
		var sols2 = getCellSolutions(row2, col2);
		
//		console.log("First: " + sols1[0] + " and " + sols1[1]);
	//	console.log("Second: " + sols2[0] + " and " + sols2[1]);
		
		var solutions = sols1;
		
		if (sols2.includes(sols1[0]) && sols2.includes(sols1[1])) { //if the solutions are the same
			
//			console.log("Found to be the same");
			
			//make sure it's not the same cell
			if ((row2 === row1 && col2 === col1)) {
				
			} else {
				match = true;
				other = cellsWithTwo[n];
				otherRow = row2;
				otherCol = col2;
				
				
				
				success = true;
		//		console.log("A naked pair was found.");
		//		console.log(solutions[0] + " and " + solutions[1] + " for cells " + (row1 + 1) + "-" +
			//			(col1 + 1) + " and cell " + (row2 + 1) + "-" + (col2 + 1) + ".");

			}
			
			
		}
		
		
		//if there's a match, set impossibles to everything else in set for those two numbers
		if (match) {
			for (var n = 0; n < set.length; n++) {
				var setRow = parseInt(set[n].getAttribute("row"));
				var setCol = parseInt(set[n].getAttribute("col"));
				
				//only worry about it if the value is 0
				if (board.rows[setRow].cells[setCol].getAttribute("value") === "0") {
					
					//make sure it's not equal to the two other cells
					if ((setRow !== row1 || setCol !== col1) &&
							(setRow !== otherRow || setCol !== otherCol)) {
						//add those solutions to impossibles
						var imps = getImpossibles(board.rows[setRow].cells[setCol]);
				//		console.log("Adding imps for " + (setRow + 1) + "-" + (setCol + 1) + ": ");
						for (var v = 0; v < solutions.length; v++) {
							if (!imps.includes(solutions[v])) {
								imps.push(solutions[v]); //add solutions to list as long as it's not already there
			//					console.log(solutions[v]);
							}
						
							saveImpossibles(board.rows[setRow].cells[setCol], imps);
							
							
						}
						
					}
				}
			}
				
			//now do the same thing for the cells group! - if they're the same one
			var group1 = getCellGroup(row1, col1);
			var group2 = getCellGroup(row2, col2);
			
//			console.log("Looking at their groups...");
			
		//	console.log(group1.id);
		//	console.log(group2.id);
			
			//if the ids are the same, repeat in that group
			if (group1.id === group2.id) {
	//			console.log("They are in the same groups.");
				
				for (var n = 0; n < group1.length; n++) {
					var setRow = parseInt(group1[n].getAttribute("row"));
					var setCol = parseInt(group1[n].getAttribute("col"));
					
					//only worry about it if the value is 0
					if (board.rows[setRow].cells[setCol].getAttribute("value") === "0") {
						
						//make sure it's not equal to the two other cells
						if ((setRow !== row1 || setCol !== col1) &&
								(setRow !== otherRow || setCol !== otherCol)) {
							//add those solutions to impossibles
							var imps = getImpossibles(board.rows[setRow].cells[setCol]);
			//				console.log("Adding imps for " + (setRow + 1) + "-" + (setCol + 1) + ": ");
							for (var v = 0; v < solutions.length; v++) {
								if (!imps.includes(solutions[v])) {
									imps.push(solutions[v]); //add solutions to list as long as it's not already there
	//								console.log(solutions[v]);
								}
							
								saveImpossibles(board.rows[setRow].cells[setCol], imps);
								
								
							}
							
						}
					}
				}
			}
			
		}
		
			
		}
	
		
	}
	




//Get impossible solutions stored in a cell -WORKS
function getImpossibles(cell) {
	//console.log("Getting impossibles for cell.");
	
	//get string from cell
	var string = cell.getAttribute("impossibles");
	var sImps = string.split("~"); //not sure that I can parse as integers right this sec
	
	//check if first array string is empty, meaning there were no impossibles
	//if it is, just set that one to 0
	if (sImps[0] === "" || sImps[0] === null) {
		sImps[0] = "0";
	}
	
	//parse strings to ints
	var imps = [];
	for (var i = 0; i < sImps.length; i++) {
		//imps.push(parseInt(sImps[i])); //try a different way
		imps.push(sImps[i] + ""); //THIS ONE WORKED FINALLY!!!!
	}
	
	//return the array with impossibles
	return imps;
}

//save impossible solutions to a cell - WORKS
function saveImpossibles(cell, set) {
	var impString = "";
	
	for (var i = 0; i < set.length; i++) {
		impString += set[i]
		
		//if it's not the last cell, add a '~'
		if (i !== set.length - 1) {
			impString += "~";
		}
	}
	//console.log("Imp string: " + impString);
	
	//set string to cell
	cell.setAttribute("impossibles", impString);
}

//Check if there are still zeros on the board. Returns true or false.
function checkForZeros() {
	let exist = false;
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			if (board.rows[r].cells[c].getAttribute("value") === "0") {
				exist = true;
			}
		}
	}
	
	return exist;
}

//Thank you to https://github.com/coolaj86/knuth-shuffle
//for this method
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//Test methods
function easyPuzzle1() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(2, 0, 0, "black"); setValue(5, 0, 2, "black"); setValue(7, 0, 5, "black"); setValue(6, 0, 8, "black");
	setValue(4, 1, 0, "black"); setValue(9, 1, 3, "black"); setValue(6, 1, 4, "black"); setValue(2, 1, 7, "black");
	setValue(8, 2, 4, "black"); setValue(4, 2, 7, "black"); setValue(5, 2, 8, "black");
	setValue(9, 3, 0, "black"); setValue(8, 3, 1, "black"); setValue(7, 3, 4, "black"); setValue(4, 3, 5, "black");
	setValue(5, 4, 0, "black"); setValue(7, 4, 1, "black"); setValue(8, 4, 3, "black"); setValue(2, 4, 5, "black"); setValue(6, 4, 7, "black"); setValue(9, 4, 8, "black");
	setValue(6, 5, 3, "black"); setValue(3, 5, 4, "black"); setValue(5, 5, 7, "black"); setValue(7, 5, 8, "black");
	setValue(7, 6, 0, "black"); setValue(5, 6, 1, "black"); setValue(2, 6, 4, "black");
	setValue(6, 7, 1, "black"); setValue(5, 7, 4, "black"); setValue(1, 7, 5, "black"); setValue(2, 7, 8, "black");
	setValue(3, 8, 0, "black"); setValue(4, 8, 3, "black"); setValue(5, 8, 6, "black"); setValue(8, 8, 8, "black");
	
	isBlank = false;
	
	/*
	
	//now store it into solved and then redo all this
	fullSolve("black");
	
	//now do again
	resetCells();
	
	
	//now set up a puzzle for the board
	setValue(2, 0, 0, "black"); setValue(5, 0, 2, "black"); setValue(7, 0, 5, "black"); setValue(6, 0, 8, "black");
	setValue(4, 1, 0, "black"); setValue(9, 1, 3, "black"); setValue(6, 1, 4, "black"); setValue(2, 1, 7, "black");
	setValue(8, 2, 4, "black"); setValue(4, 2, 7, "black"); setValue(5, 2, 8, "black");
	setValue(9, 3, 0, "black"); setValue(8, 3, 1, "black"); setValue(7, 3, 4, "black"); setValue(4, 3, 5, "black");
	setValue(5, 4, 0, "black"); setValue(7, 4, 1, "black"); setValue(8, 4, 3, "black"); setValue(2, 4, 5, "black"); setValue(6, 4, 7, "black"); setValue(9, 4, 8, "black");
	setValue(6, 5, 3, "black"); setValue(3, 5, 4, "black"); setValue(5, 5, 7, "black"); setValue(7, 5, 8, "black");
	setValue(7, 6, 0, "black"); setValue(5, 6, 1, "black"); setValue(2, 6, 4, "black");
	setValue(6, 7, 1, "black"); setValue(5, 7, 4, "black"); setValue(1, 7, 5, "black"); setValue(2, 7, 8, "black");
	setValue(3, 8, 0, "black"); setValue(4, 8, 3, "black"); setValue(5, 8, 6, "black"); setValue(8, 8, 8, "black");
	
	isBlank = false;
	
	//testing grid
	var grid = turnIntoArray();
	printGrid(grid);
	
	//var copy = turnIntoBoard(grid);
	//change something then see if it changes the board
	//copy.rows[0].cells[1].setAttribute("value", 3);
	//var grid2 = turnIntoArray();
	//console.log("");
	//printGrid(grid2);
	//IT is successfully copied, the copy did not change the original
	
	*/
	
}

function easyPuzzle2() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(2, 0, 3, "black"); setValue(6, 0, 4, "black"); setValue(7, 0, 6, "black"); setValue(1, 0, 8, "black");
	setValue(6, 1, 0, "black"); setValue(8, 1, 1, "black"); setValue(7, 1, 4, "black"); setValue(9, 1, 7, "black");
	setValue(1, 2, 0, "black"); setValue(9, 2, 1, "black"); setValue(4, 2, 5, "black"); setValue(5, 2, 6, "black");
	setValue(8, 3, 0, "black"); setValue(2, 3, 1, "black"); setValue(1, 3, 3, "black"); setValue(4, 3, 7, "black");
	setValue(4, 4, 2, "black"); setValue(6, 4, 3, "black"); setValue(2, 4, 5, "black"); setValue(9, 4, 6, "black");
	setValue(5, 5, 1, "black"); setValue(3, 5, 5, "black"); setValue(2, 5, 7, "black"); setValue(8, 5, 8, "black");
	setValue(9, 6, 2, "black"); setValue(3, 6, 3, "black"); setValue(7, 6, 7, "black"); setValue(4, 6, 8, "black");
	setValue(4, 7, 1, "black"); setValue(5, 7, 4, "black"); setValue(3, 7, 7, "black"); setValue(6, 7, 8, "black");
	setValue(7, 8, 0, "black"); setValue(3, 8, 2, "black"); setValue(1, 8, 4, "black"); setValue(8, 8, 5, "black");
	
	isBlank = false;
}

function mediumPuzzle1() {

	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(6, 0, 3, "black"); setValue(9, 0, 5, "black");
	setValue(7, 1, 1, "black"); setValue(3, 1, 2, "black");
	setValue(1, 2, 1, "black"); setValue(4, 2, 2, "black"); setValue(5, 2, 5, "black"); setValue(8, 2, 8, "black");
	setValue(8, 3, 5, "black"); setValue(1, 3, 7, "black");
	setValue(7, 4, 0, "black"); setValue(5, 4, 2, "black"); setValue(2, 4, 7, "black");
	
	setValue(9, 6, 2, "black"); setValue(7, 6, 3, "black"); setValue(5, 6, 7, "black");
	setValue(5, 7, 1, "black"); setValue(6, 7, 2, "black"); setValue(1, 7, 5, "black");
	setValue(3, 8, 0, "black"); setValue(4, 8, 4, "black"); setValue(9, 8, 8, "black");
	
	isBlank = false;
	
	/*
	//now store it into solved and then redo all this
	fullSolve("black");
	
	//now do again
	resetCells();
	
	
	//now set up a puzzle for the board
	setValue(6, 0, 3, "black"); setValue(9, 0, 5, "black");
	setValue(7, 1, 1, "black"); setValue(3, 1, 2, "black");
	setValue(1, 2, 1, "black"); setValue(4, 2, 2, "black"); setValue(5, 2, 5, "black"); setValue(8, 2, 8, "black");
	setValue(8, 3, 5, "black"); setValue(1, 3, 7, "black");
	setValue(7, 4, 0, "black"); setValue(5, 4, 2, "black"); setValue(2, 4, 7, "black");
	
	setValue(9, 6, 2, "black"); setValue(7, 6, 3, "black"); setValue(5, 6, 7, "black");
	setValue(5, 7, 1, "black"); setValue(6, 7, 2, "black"); setValue(1, 7, 5, "black");
	setValue(3, 8, 0, "black"); setValue(4, 8, 4, "black"); setValue(9, 8, 8, "black");
	
	isBlank = false;
	
	//testing grid
	var grid = turnIntoArray();
	printGrid(grid);
	*/
}

function mediumPuzzle2() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(8, 0, 1, "black"); setValue(3, 0, 7, "black"); setValue(2, 0, 8, "black");
	setValue(4, 1, 0, "black"); setValue(6, 1, 5, "black"); setValue(5, 1, 6, "black");
	setValue(3, 2, 4, "black"); setValue(1, 2, 6, "black");
	setValue(3, 3, 2, "black"); setValue(6, 3, 3, "black"); setValue(5, 3, 5, "black"); setValue(4, 3, 6, "black");
	setValue(1, 4, 0, "black"); setValue(6, 4, 8, "black");
	setValue(4, 5, 2, "black"); setValue(8, 5, 3, "black"); setValue(7, 5, 5, "black"); setValue(9, 5, 6, "black");
	setValue(9, 6, 2, "black"); setValue(5, 6, 4, "black");
	setValue(8, 7, 2, "black"); setValue(7, 7, 3, "black"); setValue(9, 7, 8, "black");
	setValue(6, 8, 0, "black"); setValue(2, 8, 1, "black"); setValue(8, 8, 7, "black");
	
	isBlank = false;
}

function hardPuzzle1() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(4, 0, 0, "black");
	setValue(9, 1, 5, "black");
	setValue(7, 2, 6, "black"); setValue(8, 2, 7, "black"); setValue(5, 2, 8, "black");
	setValue(7, 3, 2, "black"); setValue(4, 3, 4, "black"); setValue(8, 3, 5, "black"); setValue(5, 3, 7, "black");
	setValue(1, 4, 2, "black"); setValue(3, 4, 3, "black");
	setValue(6, 5, 2, "black"); setValue(7, 5, 4, "black");
	setValue(8, 6, 0, "black"); setValue(6, 6, 1, "black"); setValue(9, 6, 6, "black"); setValue(3, 6, 8, "black");
	setValue(7, 7, 0, "black"); setValue(5, 7, 5, "black"); setValue(6, 7, 7, "black"); setValue(2, 7, 8, "black");
	setValue(3, 8, 2, "black"); setValue(7, 8, 3, "black");
	
	isBlank = false;
	
	/*
	
	//now store it into solved and then redo all this
	fullSolve("black");
	
	//now do again
	resetCells();
	
	//now set up a puzzle for the board
	setValue(4, 0, 0, "black");
	setValue(9, 1, 5, "black");
	setValue(7, 2, 6, "black"); setValue(8, 2, 7, "black"); setValue(5, 2, 8, "black");
	setValue(7, 3, 2, "black"); setValue(4, 3, 4, "black"); setValue(8, 3, 5, "black"); setValue(5, 3, 7, "black");
	setValue(1, 4, 2, "black"); setValue(3, 4, 3, "black");
	setValue(6, 5, 2, "black"); setValue(7, 5, 4, "black");
	setValue(8, 6, 0, "black"); setValue(6, 6, 1, "black"); setValue(9, 6, 6, "black"); setValue(3, 6, 8, "black");
	setValue(7, 7, 0, "black"); setValue(5, 7, 5, "black"); setValue(6, 7, 7, "black"); setValue(2, 7, 8, "black");
	setValue(3, 8, 2, "black"); setValue(7, 8, 3, "black");
	
	isBlank = false;
	
	*/
	
	//TESTS
	
	/*
	//testing impossibles
	var imps = [1,2];
	saveImpossibles(board.rows[8].cells[5], imps);
	*/
	/*
	//testing grid
	//var grid = turnIntoArray();
	//printGrid(grid);
	
	*/
}

function hardPuzzle2() {
	//reset board just in case
	resetCells();
	
	console.log('testing');
	
	//now set up a puzzle for the board
	setValue(2, 0, 1, "black"); setValue(6, 0, 2, "black"); setValue(3, 0, 8, "black");
	
	setValue(7, 2, 0, "black"); setValue(4, 2, 4, "black"); setValue(8, 2, 5, "black"); setValue(6, 2, 7, "black");
	setValue(7, 3, 1, "black"); setValue(1, 3, 5, "black");
	setValue(4, 4, 1, "black"); setValue(2, 4, 3, "black"); setValue(5, 4, 5, "black"); setValue(9, 4, 8, "black");
	setValue(2, 5, 0, "black"); setValue(8, 5, 4, "black"); setValue(5, 5, 7, "black"); setValue(7, 5, 8, "black");
	setValue(5, 6, 0, "black"); setValue(8, 6, 2, "black");
	setValue(2, 7, 7, "black");
	setValue(1, 8, 4, "black"); setValue(5, 8, 6, "black"); setValue(4, 8, 7, "black");
	
	isBlank = false;
}


//Variables
const SCORE_ADD = 5;

var body = document.getElementById('body');
var main = document.getElementById('main');

var instructBtn = document.getElementById('instructions');

var score = 0;
var scoreLabel = document.getElementById("score");

var testMode; //when this is on, it allows test solving

var user;
var selectVal = 1;
var btn1; var btn2; var btn3; var btn3; var btn4; var btn5; var btn6; var btn7; var btn8; var btnBlank;

var board;
var solved; //solved board
var unsolved; //unsolved board

var difficultyIndex = 0; //this is to help measure difficulty of solving a puzzle

var isBlank = true;
var madeChange = false;

//test buttons
var solveBtn;
var generateBtn;
var resetBoardBtn;

var generateEasyBtn;
var generateMediumBtn;
var generateHardBtn;

var bruteForceBtn;
var logicSolveTestBtn;

var easyPuzzleBtn1;
var easyPuzzleBtn2;
var mediumPuzzleBtn1;
var mediumPuzzleBtn2;
var hardPuzzleBtn1;
var hardPuzzleBtn2;

//constants
var VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//rows
var r1; var r2; var r3; var r4; var r5; var r6; var r7; var r8; var r9; 
var allRows = [r1, r2, r3, r4, r5, r6, r7, r8, r9];
//cols
var c1; var c2; var c3; var c4; var c5; var c6; var c7; var c8; var c9; 
var allCols = [c1, c2, c3, c4, c5, c6, c7, c8, c9];
//groups
var g11; var g12; var g13; var g21; var g22; var g23; var g31; var g32; var g33;
var allGroups;

var instructions = "Generate a new puzzle by clicking a " +
"level below the grid. Select one of the blue squares right of the grid, then click a blank square on the grid to change it " +
"to that number.\n\nClick on 'Check Answers' to see how you're doing. The correct answers will " +
"turn green while incorrect ones will turn red.\n\nYou gain 5 points for a correct answer and lose two points " +
"for a wrong one. (It will not show anything below zero, but wrong answers will still count against you.) " +
"You gain 30 points for solving the puzzle.\n\n(The test buttons are not part of the game, but feel free to " +
"play with them anyway. I am not responsible if it messes with your puzzle in weird ways lol.)";



//Event Handlers
body.onload = loadPage;
instructBtn.onclick = seeInstructions;
//solveBtn.onclick = solveByLogic;

//test buttons
//easyPuzzleBtn1.onclick = easyPuzzle1;