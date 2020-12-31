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
<link href="/css/at-style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1" /> 
<title>Artist Tools & Training</title>
</head>
<body>

<!-- Header -->
<section class="header">

</section>

<!-- Notes
End goals:
-Value Scale
-Chroma Scale
-Find value of a color
-Compare colors to each other
-List oil painting colors

-Create value map of an image!
-Create chroma map of an image?
-Color mixer using oil painting colors
-Determine which colors to use when painting an image -->


<!-- MainBody -->
<main class="container">

<div id="navigation">
	<a href="/">Go Back</a>
</div>

<div id="intro">
	<h1>Artist Tools & Training</h1>
	This is where I will develop tools to help train a realist artist, especially who paints in oil. <br>
	Much of this is experimental on my own part, so some of this may not make sense 
	to a casual viewer before this is further along.
	<br><br>
</div>

<div id="value-scale">
	<h2>Value Scale</h2>
	<table id="value-table">
		<tr id="v-top">
			<td class="value" id="v1"></td>
			<td class="value" id="v2"></td>
			<td class="value" id="v3"></td>
			<td class="value" id="v4"></td>
			<td class="value" id="v5"></td>
			<td class="value" id="v6"></td>
			<td class="value" id="v7"></td>
			<td class="value" id="v8"></td>
			<td class="value" id="v9"></td>
		</tr>
		<tr id="v-bottom">
			<td class="vtext">1</td>
			<td class="vtext">2</td>
			<td class="vtext">3</td>
			<td class="vtext">4</td>
			<td class="vtext">5</td>
			<td class="vtext">6</td>
			<td class="vtext">7</td>
			<td class="vtext">8</td>
			<td class="vtext">9</td>
		</tr>
	</table>
	
	<br>
</div>

<div id="convert-bw">
	<h2>Convert a Color to Grayscale</h2>
	
	<!-- This table will take a color and convert it to a greyscale color, they
	will be side by side in order to compare them. -->
	<table>
		<tr>
			<td>
				Pick a color: <input type="color" id="convertselect" name="pick a color"
           		value="#7050EE">
			</td>
			<td class="value" id="c1">
			</td>
		</tr>
		<tr>
			<td>
			</td>
			<td class="value" id="c2">
			</td>
		</tr>
	
	</table>
	(This is still in progress.)
	
</div>

<div id="oil-colors">

</div>



</main>

<script src="js/at-script.js"></script>

</body>
</html>