<?php
  // Include variables from the given file
  ini_set('display_errors', 1);

  require '../../dbCredentials.php';

  // Connect to server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $productID = $_GET['productID'];
    $totalPrice = $_GET['totalPrice'];
    $quantity = $_GET['quantity'];
    $orderID = $_GET['orderID'];


    $sql = "INSERT INTO OrderItem (Product_ID, Quantity, TotalPrice, Order_ID) VALUES ('$productID','$quantity', '$totalPrice', '$orderID')";
    $query = $conn->prepare($sql);
    $query->execute();
    $orderItemID = $conn->lastInsertId();

    $sql2 = "SELECT * FROM OrderItem WHERE ID = '$orderItemID'";
    $query2 = $conn->prepare($sql2);
    $query2->execute();

    $result = $query2->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);
    echo $json;


  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  // Close the connection
  $conn = null;

?>
