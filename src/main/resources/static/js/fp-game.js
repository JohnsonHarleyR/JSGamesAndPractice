function loadPage() {
	console.log("Exists?: " + exists);
	if (exists) {
		changeDialogue();
		if (home != null) { //if this is not null, none of the other ones are null either
			environ.onchange = changeEnvironment;
			setEnvironment();
			petUrlBtn.onclick = getPetUrl;
			span.onclick = spanClick;
		}
		
	}
}

//shows an alert dialogue about where the idea came from
function showInspiration() {
	//console.log("Showing message...");
	alert("During middle and high school, I would find similar pets like these on sites like Neopets.com and on GaiaOnline.com forums. " +
	"My favorite ones are from KingdomOfKnuffel.com, which before expanding to their own site started as simple pets on a GaiaOnline forum similar to the ones I've made. (They didn't" +
	 " have as many features back then, but have always had very detailed, elegant artwork.) The artist who made them inspired me (along with her programmer boyfriend) to want to create my own pets," +
	 " but I wasn't skilled enough as a teenager. That's why I'm " +
	 "doing it now that I'm capable of both art and coding. :) (I may add more to the artwork too, who knows?)");
}

function getPetUrl() {
	petUrl.value = window.location.hostname + "/pet?id=" + pet.id;
	urlModal.style.display = "block";
}

function spanClick() {
	urlModal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
function windowClick(event) {
	  if (event.target == urlModal) {
	    urlModal.style.display = "none";
	  }
	}

function setEnvironment() {
	//var environ = document.getElementById('')
	console.log("Environment: " + pet.environment);
	home.className = "home-" + pet.environment;
}

function changeEnvironment() {
	//var environ = document.getElementById('')
	pet.environment = environ.value;
	console.log("Environment: " + pet.environment);
	home.className = "home-" + pet.environment;
}

function changeDialogue() {
	//if a pet exists on the page/in the session
	if (exists) {
		var need = ""; //default... It doesn't really matter when their mood is up anyway
		
		console.log("Hunger:");
		console.log(pet.hunger);
		console.log("Love:");
		console.log(pet.love);
		console.log("Play:");
		console.log(pet.play);
		
		//figure out which need is highest
		if (pet.hunger <= pet.play && pet.hunger <= pet.love) {
			need = "hunger";
		} else if (pet.love <= pet.hunger && pet.love <= pet.play) {
			need = "love";
		} else if (pet.play <= pet.hunger && pet.play <= pet.love) {
			need = "play";
		}
		console.log("Needs: " + need);
		if (pet.stage !== 1) {
			console.log("Mood: " + pet.mood);
		}
		
		
		//find out what stage it's in
		
		//stage one only has a couple dialogues because it's an egg.
		if (pet.stage == 1) { //only using two equals just in case it converts weird
			//wiggle differently according level of love - this is the only meter it has
			if (pet.love <= 25) { 
				dialogue.innerHTML = "*does not move*";
			} else if (pet.love <= 50) {
				dialogue.innerHTML = "*wiggle*";
			} else if (pet.love <= 75) {
				dialogue.innerHTML = "*wiggle* *wiggle*";
			} else {
				dialogue.innerHTML = "*wiggle* *wiggle* <3";
			}
			
		// else if it's a baby
		} else if (pet.stage == 2) {
			//first go according to mood
			if (pet.mood === "bad") {
				//find out greatest need
				switch (need) {
					case "hunger":
						dialogue.innerHTML = "\"Hungwy.\"";
						break;
					case "play":
						dialogue.innerHTML = "\"Play with me!\"";
						break;
					case "love":
						dialogue.innerHTML = "*crying* \"Pick up!\"";
						break;
					default:
						dialogue.innerHTML = "\"MOMMY!! DADDY!! HELP!\"";
				}
				
			} else if (pet.mood === "okay") {
				//find out greatest need
				switch (need) {
					case "hunger":
						dialogue.innerHTML = "\"Tummy rumbling...\"";
						break;
					case "play":
						dialogue.innerHTML = "\"Play please!\"";
						break;
					case "love":
						dialogue.innerHTML = "\"Hold...\"";
						break;
					default:
						dialogue.innerHTML = "\"Help!\"";
				}
				
			} else if ( pet.mood === "good") {
				//find out greatest need
				switch (need) {
					case "hunger":
						dialogue.innerHTML = "\"Snack?\"";
						break;
					case "play":
						dialogue.innerHTML = "\"I like toys!\"";
						break;
					case "love":
						dialogue.innerHTML = "\"Pick up?\"";
						break;
					default:
						dialogue.innerHTML = "\"Cheeese!\"";
				}
				
			} else {
				//start an array with random things to say
				var array = ["\"Warm.\" <3", "\"So much fun!\"", "\"Hee hee hee\"", "\"Freeze pops.\" <3",
					"\"Made poopy.\"", "\"Candy\" <3", "\"You my favowite.\"", "\"Happy.\" :)",
					"\"Yummy tacos.\""];
				//get random array item
				var num = Math.floor(Math.random() * array.length);
				dialogue.innerHTML = array[num];
				
				
			}
			
		//Else if it's a child
		} else if (pet.stage == 3){
			
			//first go according to mood
			if (pet.mood === "bad") {
				//find out greatest need
				switch (need) {
					case "hunger":
						dialogue.innerHTML = "\"I'm grumpy when I'm hungry.\"";
						break;
					case "play":
						dialogue.innerHTML = "\"Today is so boring!\"";
						break;
					case "love":
						dialogue.innerHTML = "Do you still love me?\"";
						break;
					default:
						dialogue.innerHTML = "\"I feel terrible.\"";
				}
				
			} else if (pet.mood === "okay") {
				//find out greatest need
				switch (need) {
					case "hunger":
						var array = ["\"When's supper?\"", "\"I'm still hungry...\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "play":
						var array = ["\"Play with me?\"", "\"I'm still bored...\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "love":
						var array = ["\"I'm lonely\"", "\"Hug me?\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					default:
						dialogue.innerHTML = "\"Let's do something.\"";
				}
				
			} else if ( pet.mood === "good") {
				//find out greatest need
				switch (need) {
					case "hunger":
						var array = ["\"Can we go get ice cream?\"", "\"Mmm how about some candy?\"", "\"My tummy says I'm still hungry\"",
							"\"Can I have something else to eat too?\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "play":
						var array = ["\"Let's go to the park!\"", "\"Tag, you're it!\"", "\"Let's play Hide and Seek.\"",
							"\"I love my new toys.\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "love":
						var array = ["\I love you.\" :)", "\"I wanna give you a hug.\"", "\"You are the best!\"",
							"\"You're my favorite.\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					default:
						dialogue.innerHTML = "\I love you.\" :)";
				}
				
			} else if (pet.mood === "great") {
				
				//I'm not a Pokemon. / Am I a human too? / Why do the stars blink, are they alive? / 
				
				//start an array with random things to say
				var array = ["\Lol I'm not a Pokemon.\"", "\"Am I a human too?\"", "\"Why do the stars blink, are they alive?\"",
					"\"Wanna know what I learned in school?\"", "\"Rubber bands last longer when they're refrigerated.\"",
					"\"Should I be an astronaut?\"", "*tries to lick elbow* \"I guess it is impossible.\"", "\"I'm glad I've got you.\" <3",
					"\"I heard you gotta look out for cooties.\"", "\"Hey, when can I see my friends at school again?\""];
				
				
				//get random array item
				var num = Math.floor(Math.random() * array.length);
				dialogue.innerHTML = array[num];
			}
		// else if it's an adult
		} else {
			//first go according to mood
			if (pet.mood === "bad") {
				//find out greatest need
				switch (need) {
					case "hunger":
						dialogue.innerHTML = "\"I'm starving right now.\"", "\"When are you going to feed me?\"";
						break;
					case "play":
						dialogue.innerHTML = "\"I'm starving right now.\"", "\"I thought being an adult would be fun..\"";
						break;
					case "love":
						dialogue.innerHTML = "Grown ups need hugs too.\"", "Attention is a normal human need.\"";
						break;
					default:
						dialogue.innerHTML = "\"I am not in good condition right now.\"";
				}
				
			} else if (pet.mood === "okay") {
				//find out greatest need
				switch (need) {
					case "hunger":
						var array = ["\"Can you hear my belly rumble?\"", "\"Hey, what's for dinner?\"",
							"\"It's hard to think straight on an empty stomach.\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "play":
						var array = ["\"I'm kinda bored.\"", "\"What is there to do?\"",
							"\"Wanna do something together?\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "love":
						var array = ["\"We should spend some time together.\"", "\"Can I hug you?\"",
							"\"Please don't go anywhere.\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					default:
						dialogue.innerHTML = "\"Let's do something.\"";
				}
				
			} else if ( pet.mood === "good") {
				//find out greatest need
				switch (need) {
					case "hunger":
						var array = ["\"Should we have a snack?\"", "\"Let's get Chinese.\"",
							"\"What's your favorite restaurant?\"", "\"A full belly is a happy belly.\"",
							"\"Tacos or pizza?\""];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "play":
						var array = ["\"Checkers or chess?\"", "\"Let's play a video game together.\"",
							"\"We should watch a new movie or something.\"", "\"What's your favorite activity?\"",
							"\"You're so much fun.\"",];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					case "love":
						var array = ["\Aw come here!\"", "\"At least we have each other.\"", "\You'e the best human.\"",
							"Thanks for always being here."];
						//get random array item
						var num = Math.floor(Math.random() * array.length);
						dialogue.innerHTML = array[num];
						break;
					default:
						dialogue.innerHTML = "You're awesome.";
				}
				
			} else if (pet.mood === "great") {
				
				//I'm not a Pokemon. / Am I a human too? / Why do the stars blink, are they alive? / 
				
				//start an array with random things to say
				var array = ["\I am on a seafood diet. I see food and I eat it.\"", "\"I'm not arguing, I'm just explaining why I am right.\"",
					"\"Celery is 95% water and 100% not pizza.\"", "\"A good mood like is like a balloon, one prick is all it takes to ruin it.\"",
					"\"Any of us has the capacity to light up a room. Some when they enter, others when they leave it.\"", "\"Doing nothing is hard, you never know when you are done.\"",
					"\"People say nothing is impossible, but I do nothing every day.\"– A. A. Milne", "\"Friends don't let friends do stupid things... alone.\"",
					"\"When nothing goes right, go left.\"", "\"I'm not short, I'm fun-sized.\"", "\"Life is a one time offer, use it well.\"",
					"\"Laugh at your problems, everybody else does.\"", "\"It's okay if you don't like me. Not everyone has good taste.\"",
					"\"I used to think I was indecisive, but now I'm not sure.\"", "\"Never go to a doctor whose office plants have died.\""];
				
				
				//get random array item
				var num = Math.floor(Math.random() * array.length);
				dialogue.innerHTML = array[num];
			
			}
		}
		
	}
}


//Variables
var body = document.getElementById('body');
var td = document.getElementById('td');
var exists =  document.getElementById('exists');
var home = document.getElementById('pet-home');
var image = document.getElementById('pet-image');
var dialogue = document.getElementById('dialogue');

var environ = document.getElementById('environment');
var petUrl = document.getElementById('pet-url');
var petUrlBtn = document.getElementById('pet-url-btn');
var urlModal = document.getElementById('url-modal');
var span = document.getElementsByClassName("close")[0];

var inspirBtn = document.getElementById('inspiration');

//var changeEnviron = document.getElementById('change-environment');




//Event Handlers
body.onload = loadPage();


window.onclick = windowClick;
inspirBtn.onclick = showInspiration;