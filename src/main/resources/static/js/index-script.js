//Functions
function readUpdates() {
	console.log("updates");
	alert("\n7/28/20: Added 'owner' field to pets. Made it so a button pops up so you can choose if/when the pet grows up." +
			"\n7/23/20: Fixed pet page bug that existed when no pet was loaded." +
			'\n7/22/20: Added link to pets for user to copy. Also, bug fixes with pet project.' +
			'\n7/22/20: Added new "Feedable Pet" colors. Fixed a couple graphics.' +
			'\n7/20/20: Fixed Sudoku bug.' +
			'\n7/20/20: Added dialogue to the pets, depending on their mood and needs. Added a new pet color. Added ' +
		'the ability to change the color of the pet environment.' +
		'\n7/18/20: Made these pages a little more readable on a mobile phone.' +
		 '\n7/18/20: Started recording updates.'
		);
}


//Variables
var updatesBtn = document.getElementById('updates');

//Event handlers
updatesBtn.onclick = readUpdates;