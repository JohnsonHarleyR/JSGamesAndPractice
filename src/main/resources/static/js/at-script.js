//Luminosity method for converting to greyscale
//(red × 0.3 + green × 0.59 + blue × 0.11) = grey


//functions

//convert a color to black and white
function convert() {
	console.log("converting " + convertColor.value);
	convertColorShow.style.background = convertColor.value;
	
	//convert rgb to a gray color
	
	
	
}




//variables
var convertColor = document.getElementById("convertselect");
var convertColorShow = document.getElementById("c1");

//event handlers
convertColor.onchange = convert;