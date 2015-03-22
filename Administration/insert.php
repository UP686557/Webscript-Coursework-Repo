<?php
require '../dbCredentials.php';


  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $Name = $_GET['productName'];
    $Description = $_GET['productDescription'];
    $Quantity = $_GET['productQuantity'];
    $Price = $_GET['productPrice'];
    $Photo = $_GET['productPhoto'];
    $sql = "INSERT INTO Product (Name, Description, Quantity, Photo, Price) VALUES ('$Name','$Description','$Quantity', '$Photo','$Price')";
    $conn->exec($sql);
    echo '<p>Name: ' . $Name . '</p>';
    echo '<p>Description: ' . $Description . '</p>';
    echo '<p>Quantity: ' . $Quantity . '</p>';
    echo '<p>Price: ' . $Price . '</p>';
    echo '<img src="' . $Photo . '">';

  }
  catch(PDOException $e)
  {
    echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;
?>
