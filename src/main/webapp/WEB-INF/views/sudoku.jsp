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
<link href="/css/su-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
<title>Sudoku</title>
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

<h1 id="title">Sudoku</h1>
I worked on a solver to solve puzzles by regular means without a brute force algorithm. In the end though, I
 created one anyway in order to solve the more difficult puzzles and then I combined the two algorithms.
 <br>
 <a href="http://www.sudokuessentials.com/how_to_play_sudoku.html">How to Play Sudoku</a>
 <br><br>
 <button id="instructions">More Instructions</button>
  <hr>

<p id="score">Score: 0</p>

<div id="game">
	<table id="board">
	</table>
	
</div>



<div id="user">
	
	<img id="b1" class="selected-btn" src="/su/blue1.png"/>
	<img id="b2" class="user-btn" src="/su/blue2.png"/>
	<img id="b3" class="user-btn" src="/su/blue3.png"/>
	<img id="b4" class="user-btn" src="/su/blue4.png"/>
	<img id="b5" class="user-btn" src="/su/blue5.png"/>
	<img id="b6" class="user-btn" src="/su/blue6.png"/>
	<img id="b7" class="user-btn" src="/su/blue7.png"/>
	<img id="b8" class="user-btn" src="/su/blue8.png"/>
	<img id="b9" class="user-btn" src="/su/blue9.png"/>
	<img id="blank" class="user-btn" src="/su/blank.png"/>
	
	<!-- 
	<br>
	<img id="active" src="/su/blank.png"/>
	<label>Active Button</label>
	 -->

</div>




</main>

<script src="js/su-game.js"></script>

</body>
</html>