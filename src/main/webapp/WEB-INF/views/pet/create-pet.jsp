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

<title>Create a Pet</title>
</head>
<body>

<!-- Header -->
<section class="header">

</section>

<!-- MainBody -->
<main class="container">

<div id="navigation">
	<a href="/feedable-pet">Go Back</a>
</div>

<h1>Create a Pet</h1>

<form action="/create-pet/submit">
<label>Pet Name:</label>
<input id="name" type="text" name="name" required />

<br>
<label>Owner:</label>
<input id="owner" type="text" name="owner" required/>

<br>
<label>Pet Type:</label>
<select id="type" name="type">
<option value="alien">Alien</option>
</select>

<br>
<label>Gender:</label>
<select id="gender" name="gender">
<option value="male">Male</option>
<option value="female">Female</option>
</select>

<br>
<label>Color:</label>
<select id="color" name="color">
<option value="pink">Pink</option>
<option value="red">Red</option>
<option value="blue">Blue</option>
<option value="green">Green</option>
<option value="black">Black</option>
<option value="white">White</option>
</select>

<br>
<label>Environment Style:</label>
<select id="environment" name="environment">
<option value="default">Default</option>
<option value="pink">Pink</option>
<option value="red">Red</option>
<option value="blue">Blue</option>
<option value="green">Green</option>
<option value="black">Black</option>
<option value="white">White</option>

</select>

<br>
<button type="submit" id="create">Create Pet</button>

</form>

</main>

</body>
</html>