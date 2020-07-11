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
<title>Feedable Pet</title>
</head>
<body>

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
<br>(Feel free to look up Pet ID #1 to see a pet that isn't an egg.)
<br>
<hr>
<br>

<section id="pet">
	
	<c:choose>
		<c:when test="${exists}">
		
		
		<canvas id="pet-home">
			</canvas>
			
			<p id="information">
				<b>Pet Name:</b> ${pet.name}<br>
				<b>Gender:</b> ${pet.gender}<br>
				<b>Type:</b> ${pet.type}<br>
				<b>Color:</b> ${pet.color}<br>
				<b>Pet ID:</b> ${pet.id}<br>
			</p>
		
			
			
			<div id="stats">
				
				<!-- Only show the first two if it's not an egg. You can't feed an egg and you shouldn't play with it lol. -->
				<div id="bars">
				<c:if test="${pet.stage != 1}">
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
				  <div id="progress" class="progress-bar bg-success" role="progressbar" style="width: ${pet.progress}%" aria-valuenow="${pet.progress}"
				   aria-valuemin="${pet.minProgress}" aria-valuemax="${pet.maxProgress}"></div>
				</div>
				</c:if>
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

</main>

<script src="js/fp-game.js"></script>

</body>
</html>