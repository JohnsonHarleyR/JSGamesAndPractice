//FUNCTIONS TO CHOOSE FROM

//solveByLogic - loops through all the following methods as long as anything is solved

//solveBySets - method that uses the following two methods on all rows, 
//columns and groups. Repeats until nothing was solved.

//SolveForSingleZeros - look through the set to see if only one cell equals zero. If only one does, 
//figure out the missing number and set that missing  cell to it. Repeat until no single zeros is found.
//(this one may actually be redundant and solvable with the single solutions method)

//solveSetSingles - will take cells in a row, column or group. It loops through 1-9, checking whether 
//(if a cell equals 0) it can have that number. If only one cell in the group has it as a solution, 
//set that cell to that number. Look through the numbers again every time a solution is solved.

//solveSingleSolutions(row, col) - will loop through grid, finding solutions for each cell. Anytime a cell has only
//one solution, that cell is set to that solution. It will loop through the grid again as long as a cell
//is changed.

//getCellSolutions(row, col) - returns array - gets all solutions for a cell
//getCellGroup(row, col) - returns array - get all the cells in a cell's group
//checkValidInSet(row, col, set) - return bookean - check if a cell solution is valid in a particular set



//setAllSets() - set all cols, rows, groups - do this upon loading

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
		    
		    cell.innerHTML = "<img id='" + "i" + a + b + "' class='square' src='" + cell.getAttribute('src') + "'/>";
		}
	}
	
	//set all sets to the correct cells
	setAllSets();
	
	
	
	//function to set everything to 0 again
	
	
	
	//set test buttons
	testing = document.createElement("div");
	testing.id = "testing";
	//testing.className = "testing";
	testing.innerHTML = "Testing buttons:<br>";
	main.appendChild(testing);
	
	
	solveBtn = document.createElement("button");
	solveBtn.id = "solve-btn";
	solveBtn.innerText = "Solve";
	solveBtn.addEventListener("click", solveByLogic);
	testing.appendChild(solveBtn);
	
	
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
	
	
	hardPuzzleBtn1 = document.createElement("button");
	hardPuzzleBtn1.id = "hard-puzzle-btn-1";
	hardPuzzleBtn1.innerText = "Test: Hard 1";
	hardPuzzleBtn1.addEventListener("click", hardPuzzle1);
	testing.appendChild(hardPuzzleBtn1);
	
	
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
	for (var r = 0; r < 9; r++) {
		for (var c = 0; c < 9; c++) {
			setValue(0, r, c, "black");
		}
	}
	isBlank = true;
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



//SOLVING METHODS

//solveByLogic - loops through all the following methods as long as anything is solved
function solveByLogic() {
	
	var anythingFound = false;
	
	//don't attempt if board is blank
	if (!isBlank) {
		console.log("");
		console.log("Solving by logic.");
		
		//returns true if anything is solved at all.
		
		
		//set variable to know whether to continue
		var solutionsFound;
		
		do {
			solutionsFound = false;
			console.log("");
			console.log("looping through...")
			
			//use these other methods to keep solving as long as anything is found
			
			console.log("Solving single solutions...");
			//found helps determine when to keep going
			var found = solveSingleSolutions();
			console.log("Solutions found?: " + found);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			//now solveBySet
			console.log("Solving by sets...");
			found = solveBySets();
			console.log("Solutions found?: " + found);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//if solutionsFound is true, set anythingFound to true;
			if (solutionsFound === true) {
				anythingFound = true;
			}
		} while (solutionsFound);
		
		return anythingFound;
	}
	
	
}

//solveBySets - method that uses the following two methods on all rows, 
//columns and groups. Repeats until nothing was solved.
function solveBySets() {
	
	console.log("");
	console.log("Solving by sets.");
	
	//returns true if anything is solved at all.
	var anythingFound = false;
	
	//set variable to know whether to continue
	var solutionsFound;
	
	do {
		solutionsFound = false;
		console.log("");
		
		//solve all rows
		for (var r = 0; r < allRows.length; r++) {
			console.log("Solving rows.");
			var set = allRows[r];
			//first solveSetSingles
			var found = solveSetSingles(set);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set);
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
		}
		
		//solve all columns
		for (var c = 0; c < allCols.length; c++) {
			console.log("Solving columns.");
			var set = allCols[c];
			//first solveSetSingles
			var found = solveSetSingles(set);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set);
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
		}
		
		//solve all groups
		for (var g = 0; g < allGroups.length; g++) {
			console.log("Solving groups.");
			var set = allGroups[g];
			//first solveSetSingles
			var found = solveSetSingles(set);
			
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
			//then solveForSingleZeros
			found = solveForSingleZeros(set);
			//if found is true, set solutionsFound to true
			if (found === true) {
				solutionsFound = true;
			}
			
			
		}
		
		console.log("Anything found?: " + solutionsFound);
		
		
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
function solveSetSingles(set) {
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
			
			console.log("");
			console.log("Checking set for value " + value);
			
			//loop through cells in the set, counting up how many times a cell in that set contains that solution
			for (var i = 0; i < set.length; i++) {
				if (set[i].getAttribute("value") === "0") {
					var row = parseInt(set[i].getAttribute("row"));
					var col = parseInt(set[i].getAttribute("col"));
					var solutions = getCellSolutions(row, col);
					
					console.log("Cell " + (row + 1) + "-" + (col + 1));
					
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
				setValue(value, cellRow, cellCol, "black");
				found = true;
				console.log("Value only found once. Setting cell " + (cellRow + 1) + "-" + (cellCol + 1) + 
						" to " + value + ".");
			} else {
				console.log("Value found " + timesFound + " times.");
			}
		}
		
	}
	console.log("Solutions found?: " + found);
	return found;
}




//SolveForSingleZeros - look through the set to see if only one cell equals zero. If only one does, 
//figure out the missing number and set that missing  cell to it. Repeat until no single zeros is found.
//(this one may actually be redundant and solvable with the single solutions method)
function solveForSingleZeros(set) {
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
		console.log("Only one zero found in set.")
		var row = parseInt(cell.getAttribute("row"));
		var col = parseInt(cell.getAttribute("col"));
		var solutions = getCellSolutions(row, col);
		console.log("Number of solutions found: " + solutions.length);
		console.log("Cell " + (row + 1) + "-" + (col + 1));
		if (solutions.length === 1) {
			setValue(solutions[0], row, col, "black");
		}
		//cell.setAttribute("value", solutions[0]);
		found = true;
	} else {
		console.log("No single zeros found in set.")
	}
	return found;
	
}


//Find solutions for all cells. Anytime it finds only one, set that cell to that solution. Keep looping
//until no single solutions are found for any of the cells
function solveSingleSolutions() {
	
	//returns whether or noth anything was found
	var anythingFound = false;
	
	//set variable to know whether to continue
	var solutionsFound;
	
	do {
		solutionsFound = false; //reset
		console.log("");
		console.log("Going through board to solve single solutions.");
		
		//start looping through all cells
		for (var r = 0; r < 9; r++) {
			for (var c = 0; c < 9; c++) {
				
				
				var cell = board.rows[r].cells[c];
				//only get solutions if the cells equals 0
				if (cell.getAttribute("value") === "0") {
					var solutions = getCellSolutions(r, c);
					var row = parseInt(cell.getAttribute("row"));
					var col = parseInt(cell.getAttribute("col"));
					console.log("Cell " + (row + 1) + "-" + (col + 1) + " solutions found: " + solutions.length);
					for (var a = 0; a < solutions.length; a++) {
						console.log(solutions[a]);
					}
					
					//if the length of solutions is 1, then set that cell to it and solutionsFound to true
					if (solutions.length === 1) {
						setValue(solutions[0], r, c, "black");
						solutionsFound = true;
						anythingFound = true;
						console.log("Only one solution found for cell " + (r + 1) + "-" + (c + 1));
					} else {
						//console.log(solutions.length + " solutions found for cell " + (r + 1) + "-" + (c + 1));
					}
					if (solutions[0] === -1){
						console.log("Something went wrong.");
					}
				}
				
			}
		}
		
		console.log("Single solutions found on board?: " + solutionsFound);
		
	} while (solutionsFound);
	return anythingFound;
}


//get all possible solutions for a single cell - returns -1 if there are none
function getCellSolutions(row, col) {
	//list of all solutions for cell
	var solutions = [];
	
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
				//console.log("All is valid for solution " + VALUES[v] + " in cell " + (row + 1) + "-" + (col + 1));
				solutions.push(VALUES[v]);
			} else {
				//console.log("Not valid for solution " + VALUES[v] + " in cell " + (row + 1) + "-" + (col + 1));
			}
		}
	} else {
		solutions.push(board.rows[row].cells[col].getAttribute("value"));
	}
	
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
}



//Variables
var body = document.getElementById('body');
var main = document.getElementById('main');

var board;
var solved; //solved board
var unsolved; //unsolved board

var isBlank = true;

//test buttons
var solveBtn;
var resetBoardBtn;
var easyPuzzleBtn1;

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



//Event Handlers
body.onload = loadPage;
//solveBtn.onclick = solveByLogic;

//test buttons
//easyPuzzleBtn1.onclick = easyPuzzle1;
