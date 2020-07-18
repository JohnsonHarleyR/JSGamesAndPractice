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



</section>

<!-- MainBody -->
<main class="container">


<div id="navigation">
	<a href="/">Go Back</a>
</div>

<h1>Feedable Pet</h1>
To be honest, this will probably end up as a Java application more than JavaScript, but we'll see.<br>
It will include JavaScript, anyway.
<br><br>
The egg stage only needs "love". Once it hatches, you can feed and play with it.
<br>(There are pet IDs you can enter from the "Load Pet" page to see a pet that isn't an egg.)
<br>
<br>
Also, an egg takes at least a day to level up and a baby takes 5 days. This is true no matter the progress.
<br>
<hr>
<br>

<input type="hidden" id="exists" value="${exists}"/>

<section id="pet">
	
	<c:choose>
		<c:when test="${exists}">
		
		
			<table id="pet-home" class="home-${pet.environment}">
				<tr>
				<td id="td">
				<img id="pet-image" src="${pet.image}"/>
				</td>
				</tr>
			</table>
			
			<p id="information">
			
				<b>Pet Name:</b> ${pet.name}<br>
				<b>Gender:</b> ${pet.gender}<br>
				<b>Type:</b> ${pet.type}<br>
				<b>Color:</b> ${pet.color}<br>
				<b>Pet ID:</b> ${pet.id}<br>
				<br>
				
				<!-- Put buttons here too -->
				<c:choose>
				<c:when test="${pet.stage == 1}">
					<a href="/love?id=${pet.id}"><button id="feed">Warm the Egg</button></a>
					<br>
				</c:when>
				<c:otherwise>
					<a href="/feed?id=${pet.id}&min=15&max=40"><button id="feed">Feed</button></a>
					<a href="/play?id=${pet.id}"><button id="play">Play</button></a>
					<a href="/love?id=${pet.id}"><button id="love">Cuddle</button></a>
					<br>
				</c:otherwise>
				</c:choose>
				

			</p>
		
			
			
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
				
				<c:if test="${pet.stage != 3}"> <!-- If it's the last stage, it doesn't need a progress bar -->
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
		</c:when>
		<c:otherwise>
			<a href="/load-pet"><button>Load Pet</button></a><br>
			<a href="/create-pet"><button>Create Pet</button></a>
		</c:otherwise>
	</c:choose>

</section>

<br>
<br>

<i>(Things to do: <br><s>1. Make the meters go up more when you feed/play/love.</s>
<br>2. Add the real pet images.
<br><s>3. Make the progress bar go up more slowly.</s>
<br><s>4. Fix the images so that the correct one always displays depending on mood.</s>
<br>5. Create alerts when the pet levels up
<br>6. Allow user to change the pet's environment.
<br>7. Create copy and paste code so people can display their pets elsewhere.)<br><br></i>

</main>

<script src="js/fp-game.js"></script>

</body>
</html>