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
<link href="/css/style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1" /> 

<title>Comments</title>
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

<div id="leave-comment" style="text-align:left;content:left;">
<h1>Leave Comment</h1>
<hr>
	
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
	<hr>
</div>



<div id="comments">
	
	<h1>Comments</h1>
	<hr>
	<c:if test="${!arecomments}">
		There are no comments yet.
		<br>
		<br>
	</c:if>
	
	<c:forEach var="comment" items="${comments}">
		
		<p style="font-size: larger">
			
			<sub><b>Title: </b> ${comment.title}<br></sub>
			<sup><b>About: </b> <i>${comment.topic}</i></sup><br>
			
			${comment.comment} <br> <sup><i>${comment.name}</i>
			on <i>${comment.datetime}</i> <!-- Only show delete button if it's the session user's profile or their own comment -->
			</sup>
			<br>
		</p>
		<hr>
	</c:forEach>
</div>

</main>

</body>
</html>