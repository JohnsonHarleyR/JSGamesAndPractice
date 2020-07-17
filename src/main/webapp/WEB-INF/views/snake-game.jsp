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
<link href="/css/sn-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
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

<label id="map">X: Y:</label>
<br>
<canvas id="board">
</canvas>

<div id="buttons">
<button id="up" class="direction">Up</button>
<em id="center-btns"><button id="left" class="direction">Left</button><button id="right" class="direction">Right</button></em>
<button id="down" class="direction">Down</button>
</div>


<script src="js/sn-game.js"></script>

</body>
</html>