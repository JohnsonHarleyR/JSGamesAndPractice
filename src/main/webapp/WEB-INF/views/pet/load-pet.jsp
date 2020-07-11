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
<link href="/style.css" rel="stylesheet" />

<meta charset="ISO-8859-1">
<title>Load Pet</title>
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

<h1>Load Pet</h1>
${message}
<form action="/load-pet/submit">
<label>Pet ID #:</label>
<input type="text" id="id" name="id" required />
<br>
<button type="submit" id="load-pet">Submit</button>
</form>

</main>

</body>
</html>