

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>

<!-- TO DO:
-Fix bug on "Feedable Pet" page by checking for null before proceeding in order to prevent it.
-In snake game, put "speed" above "color scheme" because it's more important technically.
-Maybe change the default speed to "slow" in snake game, as normal may be hard for most people.
-Make adjustments to "Roadside Bingo" layout the grid doesn't have to re-adjust.
-Fix shadow on baby alien pet graphics so it shows up better on a dark background.
-FIX THE OBVIOUS GLITCH ON THE SNAKE GAME.
-Draw/create a new egg graphic for pets.
-Adjust alignment of elements on pet page.
-Make the url text box wider on pet page.
-Move the 'create pet' and 'load pet' buttons toward top of pet page.
-Add owner name to pets (will be owner id later on when it is used on a website.)
 -->

<head>

<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
	integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
	crossorigin="anonymous">
<!-- 
<link href="/style.css" rel="stylesheet" />
 -->

<meta charset="ISO-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1" /> 

<title>Playing with JavaScript</title>

</head>
<body>

<!-- Header -->
<section class="header">

</section>

<!-- MainBody -->
<main class="container">

<h1>Practicing with JavaScript</h1>
<p>
<i><sup>All projects and artwork are created by Harley Johnson. 
(<a href="https://www.linkedin.com/in/johnsonharleyr">LinkedIn</a> / 
<a href="https://github.com/JohnsonHarleyR">GitHub</a>)</sup></i>
</p>

Click these links to see different practice projects:
<br>
<sup><i>(<b>Note:</b> For now, these are best viewed on a laptop.)</i></sup>
<ul>
	<li><a href="/TicTacToe">Tic Tac Toe</a></li>
	<li><a href="/minesweeper">Minesweeper</a><!--  <i>(not finished)</i>--> </li>
	<li><a href="/roadside-bingo">Roadside Bingo</a></li>
	<li><a href="/sudoku">Sudoku</a></li>
	<li><a href="/snake-game">Snake Game</a> <i></i></li>
	<li><a href="/feedable-pet">Feedable Pet</a> <!-- <i>(getting close)</i> --></li>
	<!-- <li><a href=""></a></li> -->
</ul>

<b>More to come!</b>
<br><br>
<button id="updates">Latest Updates</button>

<br>
<div id="comments" style="text-align:left;content:left;">
	<hr>
	<h2>Leave Comment</h2>
	<a href="/comments">See all comments</a>
	<br><br>
	<form action="comment/submit" method="post">
	
	
		<label>Subject: </label>
		<select id="topic" name="topic" required>
			<option value="general">General</option>
			<option value="bugs">Code Bugs</option>
			<option value="ttt">Tic Tac Toe</option>
			<option value="ms">Minesweeper</option>
			<option value="rb">Roadside Bingo</option>
			<option value="su">Sudoku</option>
			<option value="sg">Snake Game</option>
			<option value="fp">Feedable Pet</option>
		</select>
		<br>
		<label>Your Name: </label>
		<input type="text" name="name" value="Anonymous" maxlength="50" required/>
		<br>
		<label>Comment Title:</label>
		<input type="text" placeholder="Title" name="title" maxlength="50" required/>
		<br>
		<textarea name="comment" rows="5" cols="50" maxlength="1000"
			placeholder="what would you like to say?" required></textarea>
		<br>
		<button type="submit">Add Comment</button>
	</form>
	<br>
</div>

</main>

<script src="js/index-script.js"></script>

</body>
</html>