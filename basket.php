<!DOCTYPE HTML>
<html>
  <head>
    <title>Basket</title>
    <link rel="stylesheet" type="text/css" href="CSS/style.css">
    <link rel="stylesheet" type="text/css" href="CSS/searchbar.css">
    <link rel="stylesheet" type="text/css" href="CSS/navigation.css">
    <link rel="stylesheet" type="text/css" href="CSS/basketPage.css">
    <link rel="stylesheet" type="text/css" href="../CSS/dialogBox.css">

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


    </article>
    <?php include 'footer.php' ?>
  </body>
  <script language="JavaScript" type="text/javascript" src="../javascript/Basket/basketStorageManager.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/Basket/basketSimpleManager.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/Basket/basketSetup.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/Basket/displayBasket.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/Basket/checkout.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/ajaxSearch.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/sharedJS.js"></script>
  <script language="JavaScript" type="text/javascript" src="../javascript/customAlert.js"></script>



</html>
