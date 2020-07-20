//Functions
function readUpdates() {
	console.log("updates");
	alert('7/20/2020: Fixed Sudoku bug.' +
			'\n7/20/20: Added dialogue to the pets, depending on their mood and needs. Added a new pet color. Added ' +
		'the ability to change the color of the pet environment.' +
		'\n7/18/20: Added a line of code to make these pages more readable on a mobile phone.' +
		 '\n7/18/20: Started recording updates.'
		);
}


//Variables
var updatesBtn = document.getElementById('updates');

//Event handlers
updatesBtn.onclick = readUpdates;