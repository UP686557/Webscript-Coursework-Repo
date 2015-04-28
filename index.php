<!DOCTYPE HTML>
<html>
	<head>
		<title id="title">Company Name | Home</title>
		<link rel="stylesheet" type="text/css" href="CSS/style.css">
		<link rel="stylesheet" type="text/css" href="CSS/searchbar.css">
		<link rel="stylesheet" type="text/css" href="CSS/navigation.css">
		<link rel="stylesheet" type="text/css" href="CSS/searchPage.css">
		<link rel="stylesheet" type="text/css" href="CSS/homePage.css">
		<link rel="stylesheet" type="text/css" href="CSS/singleProduct.css">
		<link rel="stylesheet" type="text/css" href="CSS/dialogBox.css">
    <link rel="stylesheet" type="text/css" href="CSS/basketPage.css">
		<link rel="stylesheet" type="text/css" href="CSS/categories.css">

		<meta name="description" content="">
		<meta charset="UTF-8">
	</head>

	<body>
		<header>
			<?php include 'navigationBar.php' ?>
		</header>
		<div id="dialogOverlay"></div>
	  <div id="dialogBox">
	    <div id="dialogHead"></div>
	    <div id="dialogBody"></div>
	    <div id="dialogFoot"></div>
	  </div>

		<article id="dynamicArticle">
		</article>

		<?php include 'footer.php' ?>

		<script type="text/javascript" src="../javascript/homeDisplay.js"></script>
		<script type="text/javascript" src="../javascript/ajaxSearch.js"></script>
		<script type="text/javascript" src="../javascript/Basket/basketStorageManager.js"></script>
		<script type="text/javascript" src="../javascript/Basket/basketSimpleManager.js"></script>
		<script type="text/javascript" src="../javascript/Basket/basketSetup.js"></script>
		<script type="text/javascript" src="../javascript/customAlert.js"></script>
		<script type="text/javascript" src="../javascript/sharedJS.js"></script>
	  <script type="text/javascript" src="../javascript/Basket/basket.js"></script>
	  <script type="text/javascript" src="../javascript/Basket/checkout.js"></script>
		<script type="text/javascript" src="../javascript/categories.js"></script>
		<script type="text/javascript" src="../javascript/Administration/customersAdmin.js"></script>
		<script type="text/javascript" src="../javascript/Administration/order.js"></script>




	</body>

</html>
