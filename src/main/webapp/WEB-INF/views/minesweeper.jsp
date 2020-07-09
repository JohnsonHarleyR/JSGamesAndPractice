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
<link href="/css/ms-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
<title>Minesweeper</title>
</head>
<body id="body">

<!-- Header -->
<section class="header">

</section>

<!-- MainBody -->
<main id="main" class="container">

<div id="navigation">
	<a href="/">Go Back</a>
</div>

<h1 id="title">Minesweeper</h1>

<br>
<table id="game">
		
		<tr>
		<td>
		<h2>Which level?</h2>
		<button id="easy">Easy</button>
		<button id="medium">Medium</button>
		<button id="hard">Hard</button>
		</td>
		</tr>
		
	 
	 
</table>




</main>
<script src="js/ms-game.js"></script>
</body>
</html>