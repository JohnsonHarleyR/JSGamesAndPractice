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
<link href="/css/ttt-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
<title>Tic Tac Toe</title>
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


<div id="game">
	<h1 id="title">Tic Tac Toe</h1>
	
	<h2 id="message" class="def">Let's play!</h2>
	
	<table id="board">
		<tr id="row1">
			<td id="tdA1">
				<img id="a1" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdA2">
				<img id="a2" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdA3">
				<img id="a3" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
		</tr>
		<tr id="row2">
			<td id="tdB1">
				<img id="b1" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdB2">
				<img id="b2" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdB3">
				<img id="b3" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
		</tr>
		<tr id="row3">
			<td id="tdC1">
				<img id="c1" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdC2">
				<img id="c2" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
			<td id="tdC3">
				<img id="c3" class="ttt-square" src="ttt/blankSquare.png"/>
			</td>
		</tr>
	</table>
</div>

<div id="side">
	<p id="select">
		<label id="selector-label">Turn:</label>
		<img id="selector" class="ttt-select" src="ttt/xSquare.png"/>
	</p>
	<button id="new-game">New Game</button><br>

</div>

</main>

<script src="js/ttt-game.js"></script>

</body>
</html>