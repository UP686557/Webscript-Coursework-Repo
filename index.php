<!DOCTYPE HTML>
<html>
	<head>
		<title>Home</title>
		<link rel="stylesheet" type="text/css" href="CSS/style.css">
		<link rel="stylesheet" type="text/css" href="CSS/searchbar.css">
		<link rel="stylesheet" type="text/css" href="CSS/navigation.css">
		<link rel="stylesheet" type="text/css" href="CSS/searchPage.css">
		<link rel="stylesheet" type="text/css" href="CSS/homePage.css">
		<link rel="stylesheet" type="text/css" href="CSS/singleProduct.css">
		<link rel="stylesheet" type="text/css" href="CSS/dialogBox.css">

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

		<article id="homeSection">
			<h1>Why not try these products?</h1>
		</article>



		<?php include 'footer.php' ?>

		<script language="JavaScript" type="text/javascript" src="../javascript/homeDisplay.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/ajaxSearch.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/basketStorageManager.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/basketSimpleManager.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/basketSetup.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/customAlert.js"></script>
		<script language="JavaScript" type="text/javascript" src="../javascript/sharedJS.js"></script>


	</body>

</html>
