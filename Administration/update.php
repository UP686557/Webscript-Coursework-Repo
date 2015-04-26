<?php
  // Used to update data in the product table
  // Include variables from the given file
  require '../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the values from the web page
    $ID = $_GET['productID'];
    $Name = $_GET['productName'];
    $Description = $_GET['productDescription'];
    $Category = $_GET["productCategory"];
    $Quantity = $_GET['productQuantity'];
    $Price = $_GET['productPrice'];

    // Returns the product ID of the updated product. Used to display to the user
    echo "<p>Product ID: " . $ID . "</p>";

    // Condition statements to decide what to update
    if ($Name != ""){
      // SQL Query
      $sqlName = "UPDATE Product SET Name = '$Name' WHERE ID = '$ID'";
      // Prepare and execute query
      $statement = $conn->prepare($sqlName);
      $statement->execute();
      // Return the updated attribute, displayed to the user
      echo "<p>Name: " . $Name . "</p>";
    }
    if($Description != ""){
      $sqlDes = "UPDATE Product SET Description = '$Description' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlDes);
      $statement->execute();
      echo "<p>Description: " . $Description . "</p>";
    }
    if($Category != ""){
      $sqlCategory = "UPDATE Product SET Category = '$Category' WHERE ID = '$ID'";
      $statement = $conn->prepare($sqlCategory);
      $statement->execute();
      echo "<p>Category: " . $Category . "</p>";
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

  // Error Detection
  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  // Close the connection
  $conn = null;

?>
