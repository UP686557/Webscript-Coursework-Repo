<?php
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "products";

  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $ID = $_GET['productID'];
    $Name = $_GET['productName'];
    $Description = $_GET['productDescription'];
    $Quantity = $_GET['productQuantity'];
    $Price = $_GET['productPrice'];

    echo "<p>Product ID: " . $ID . "</p>";

    if ($Name != ""){
      $sqlName = "UPDATE Product SET Name = '$Name' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlName);
      $statement->execute();
      echo "<p>Name: " . $Name . "</p>";
    }
    if($Description != ""){
      $sqlDes = "UPDATE Product SET Description = '$Description' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlDes);
      $statement->execute();
      echo "<p>Description: " . $Description . "</p>";
    }
    if($Quantity != ""){
      $sqlQuant = "UPDATE Product SET Quantity = '$Quantity' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlQuant);
      $statement->execute();
      echo "<p>Quantity: " . $Quantity . "</p>";
    }
    if($Price != ""){
      $sqlPrice = "UPDATE Product SET Price = '$Price' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlPrice);
      $statement->execute();
      echo "<p>Price: " . $Price . "</p>";
    }

  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;

?>
