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
<link id="style" href="/css/sn-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1" /> 

<title>Snake Game</title>
</head>
<body id="body">

<!-- Header -->
<section id="header" class="header">

</section>

<!-- MainBody - not using a main container this time because the javascript doesn't seem to like it-->

<div id="navigation">
	<a href="/">Go Back</a>
</div>

<h1 id="title">Snake Game</h1>
Hit 'S' to start a new game, or click the button. You can move with the direction buttons on the keyboard or the buttons to the right.
<br><i>(<b>There is one glitch left to fix.</b> Changing direction via touch screen might come too.)</i>
<hr>

<label id="map">X: Y:</label>
<br>
<canvas id="board" class="b-default">
</canvas>

<div id="buttons">
<button id="start" class="normal">Start Game</button>
<br>

<button id="up" class="direction">Up</button>
<em id="center-btns"><button id="left" class="direction">Left</button><button id="right" class="direction">Right</button></em>
<button id="down" class="direction">Down</button>
<br>

<label>Color Scheme:</label>
<Select id="color-scheme">
<option id="default" value="b-default">Hot Pink</option>
<option id="jungle" value="b-jungle">Jungle</option>
<option id="ice" value="b-ice">Ice</option>
<option id="fire" value="b-fire">Fire</option>
<option id="aqua" value="b-aqua">Aqua</option>
</Select>
<button id="change-scheme">Change</button>
<sub class="sub">(Starts new game.)</sub>
<br>

<label>Speed:</label>
<Select id="speed">
<option id="slow" value="slow">Slow</option>
<option id="normal" value="normal" selected>Normal</option>
<option id="fast" value="fast">Fast</option>
</Select>
<button id="change-speed">Change</button>
<sub class="sub">(Starts new game.)</sub>
<br>

</div>


<script src="js/sn-game.js"></script>

</body>
</html>