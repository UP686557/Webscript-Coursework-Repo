<?php
  // Used to insert data into the product table
  // Include variables from the given file
  require '../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get values from the web page
    $Name = $_GET['productName'];
    $Description = $_GET['productDescription'];
    $Quantity = $_GET['productQuantity'];
    $Price = $_GET['productPrice'];
    $Photo = $_GET['productPhoto'];
    $Category = $_GET['productCategory'];
    // SQL Query
    $sql = "INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('$Name','$Description','$Quantity', '$Photo','$Price', '$Category')";
    // Execute the query
    $conn->exec($sql);

    // Returns details of the inserted product. Used to display to the user
    echo '<p>Name: ' . $Name . '</p>';
    echo '<p>Description: ' . $Description . '</p>';
    echo '<p>Quantity: ' . $Quantity . '</p>';
    echo '<p>Category: ' . $Category . '</p>';
    echo '<p>Price: ' . $Price . '</p>';
    echo '<img src=../"' . $Photo . '">';

  }

  // Error Detection
  catch(PDOException $e)
  {
    echo $sql . "<br>" . $e->getMessage();
  }

  // Close the connection
  $conn = null;
?>
