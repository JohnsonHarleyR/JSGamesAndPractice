<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
	integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
	crossorigin="anonymous">
<link href="/css/fp-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1" /> 

<title>Feedable Pet</title>
</head>
<body id="body">

<!-- Header -->
<section class="header">

<c:choose>
<c:when test="${!exists}">
	<script>
		var exists = false;
	</script>
</c:when>

<c:otherwise>
	<script>
		var exists = true;
		var pet = {
				id: ${pet.id},
				name: "${pet.name}",
				owner: "${pet.owner}",
				age: ${pet.age},
				stage: ${pet.stage},
				mood: "${pet.mood}",
				hunger: ${pet.hunger},
				play: ${pet.play},
				love: ${pet.love},
				environment: "${pet.environment}"
				
		};
	</script>
</c:otherwise>
</c:choose>


</section>

<!-- MainBody -->
<main class="container">


<div id="navigation">
	<a href="/">Go Back</a>
</div>

<h1>Feedable Pet</h1>

<sup><i>A lot of this is actually written in Java. Some of it is in JavaScript though so I wanted to include it anyway.</i></sup>

 <br>

The egg stage only needs "love". Once it hatches, you can feed and play with it.
<br><i>(There are pet IDs you can enter from the "Load Pet" page to see a pet that isn't an egg.)</i>
<br>
<br>
Also, an egg takes at least a day to level up and a baby takes 5 days. This is true no matter the progress.


<br><br>

<button id="inspiration">What inspired it?</button>




<br>
<hr>
<br>

<input type="hidden" id="exists" value="${exists}"/>

<section id="pet">
	
	<c:choose>
		<c:when test="${exists}">
		
			<div id="left">
			<table id="pet-home" class="home-${pet.environment}">
				<tr>
				<td id="td">
				<img id="pet-image" src="${pet.image}"/>
				</td>
				</tr>
			</table>
			
			<div id="interact">
			<!-- Put buttons here too -->
				<c:choose>
				<c:when test="${pet.stage == 1}">
					<c:if test="${pet.growStage > pet.stage}">
						<a href="/pet/grow?id=${pet.id}">
							<button id="grow" type="submit">Help ${pet.name} Hatch!</button>
						</a>
						<br>
					</c:if>
					<a href="/love?id=${pet.id}"><button id="feed">Warm the Egg</button></a>
					<br>
				</c:when>
				<c:otherwise>
					<c:if test="${pet.growStage > pet.stage}">
						<a href="/pet/grow?id=${pet.id}">
							<button id="grow" type="submit">Help ${pet.name} Grow!</button>
						</a>
						<br>
					</c:if>
					<!-- Hunger is handled slightly differently for the sake of an idea later on. -->
					<a href="/feed?id=${pet.id}&min=15&max=40"><button id="feed">Feed</button></a>
					<a href="/play?id=${pet.id}"><button id="play">Play</button></a>
					<c:choose>
						<c:when test="${pet.stage != 4}">
							<a href="/love?id=${pet.id}"><button id="love">Cuddle</button></a>
						</c:when>
						<c:otherwise>
							<a href="/love?id=${pet.id}"><button id="love">Hug</button></a>
						</c:otherwise>
					</c:choose>
					<br>
				</c:otherwise>
				</c:choose>
			</div>
			
			<div id="stats">
				
				<!-- Only show the first two if it's not an egg. You can't feed an egg and you shouldn't play with it lol. -->
				<div id="bars">
				<c:if test="${pet.stage != 1}">
					<br>
					<label id="hunger-label">Hunger</label>
					<br>
					<div class="progress">
					  <div id="hunger" class="progress-bar bg-warning" role="progressbar" style="width: ${pet.hunger}%" aria-valuenow="${pet.hunger}" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
					
					<br>
					<label id="play-label">Play</label>
					<br>
					<div class="progress">
					  <div id="play" class="progress-bar bg-warning" role="progressbar" style="width: ${pet.play}%" aria-valuenow="${pet.play}" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</c:if>
				
				<br>
				<label id="play-label">Love</label>
				<br>
				<div class="progress">
				  <div id="love" class="progress-bar bg-warning" role="progressbar" style="width: ${pet.love}%" aria-valuenow="${pet.love}" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
				
				<c:if test="${pet.stage != 4}"> <!-- If it's the last stage, it doesn't need a progress bar -->
				<br>
				<label id="progress-label">Progress</label>
				<br>
				<div class="progress">
				  <div id="progress" class="progress-bar bg-success" role="progressbar" style="width: ${pet.percent}%" aria-valuenow="${pet.progress}"
				   aria-valuemin="${pet.minProgress}" aria-valuemax="${pet.maxProgress}"></div>
				</div>
				</c:if>
				
				<br>
				<a href="/load-pet"><button id="load-pet">Load a Pet</button></a><br>
				<a href="/create-pet"><button id="create-pet">Create Pet</button></a>
				</div>
			</div>
			
			</div>
			
			<div id="floatContainer" class="float-container">
			  <label id="dialogue">"Feed me. I like tacos. Blah blah let's see what happens with longer dialogue."</label>
			</div>
			
			<p id="information">
			
				<b>Pet Name:</b> ${pet.name}<br>
				<b>Owner:</b> ${pet.owner}<br>
				<b>Gender:</b> ${pet.gender}<br>
				<!-- Display "day" or "days" accordingly -->
				<c:choose>
					<c:when test="${pet.age == 1}">
						<b>Age:</b> ${pet.age} day<br>
					</c:when>
					<c:otherwise>
						<b>Age:</b> ${pet.age} days<br>
					</c:otherwise>
				</c:choose>
				<b>Type:</b> ${pet.type}<br>
				<b>Color:</b> ${pet.color}<br>
				<b>Pet ID:</b> ${pet.id}<br>
				
				
				<!-- modal content mostly taken from example on w3schools.com -->
				
				<!-- URL Modal Popup -->
				<div id="url-modal" class="modal">
				
				  <!-- Modal content -->
				  <div class="modal-content">
				    <span class="close">&times;</span>
				    <p>Copy and paste this link so others can see this pet:<br>
				    <input type="text" id="pet-url"/></p>
				  </div>
				</div>
				  
				  <!-- Trigger/Open The Modal -->
				  <br>
				<button id="pet-url-btn">Pet Link</button>
				<br>
				<br>
				
				
				<form action="/environment">
					<input type="hidden" name="id" value="${pet.id}"/>
					Background:<br>
					<Select id="environment" name="environment">
						<option value="default">Default</option>
						<option value="pink">Pink</option>
						<option value="red">Red</option>
						<option value="yellow">Yellow</option>
						<option value="blue">Blue</option>
						<option value="green">Green</option>
						<option value="black">Black</option>
						<option value="white">White</option>
					</Select><br>
					<button id="change-environment">Keep Change</button>
				</form>
			
			
		
			
			
			
		</c:when>
		<c:otherwise>
			<a href="/load-pet"><button>Load Pet</button></a><br>
			<a href="/create-pet"><button>Create Pet</button></a>
		</c:otherwise>
	</c:choose>

</section>

<br>
<br>

</main>

<script src="js/fp-game.js"></script>

</body>
</html>