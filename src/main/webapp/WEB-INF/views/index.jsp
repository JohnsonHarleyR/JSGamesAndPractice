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
<!-- 
<link href="/style.css" rel="stylesheet" />
 -->

<meta charset="ISO-8859-1">
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
<i><sup>All projects are created by Harley Johnson. 
(<a href="https://www.linkedin.com/in/johnsonharleyr">LinkedIn</a> / 
<a href="https://github.com/JohnsonHarleyR">GitHub</a>)</sup></i>
</p>


Click these links to see different practice projects:
<ul>
	<li><a href="/TicTacToe">Tic Tac Toe</a></li>
	<li><a href="/minesweeper">Minesweeper</a><!--  <i>(not finished)</i>--> </li>
	<li><a href="/roadside-bingo">Roadside Bingo</a></li>
	<li><a href="/sudoku">Sudoku</a> <i>(not finished)</i></li>
	<li><a href="/snake-game">Snake Game</a> <i>(not finished)</i></li>
	<li><a href="/feedable-pet">Feedable Pet</a> <i>(not finished)</i></li>
	<!-- <li><a href=""></a></li> -->
</ul>

<b>More to come!</b>

<br><br>
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

</body>
</html>