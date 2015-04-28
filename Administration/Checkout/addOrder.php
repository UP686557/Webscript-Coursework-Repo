<?php
  // Include variables from the given file
  ini_set('display_errors', 1);

  require '../../dbCredentials.php';



  // Connect to server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $customerID = $_GET['customerID'];
    $totalPrice = $_GET['totalPrice'];

    date_default_timezone_set("Europe/London");
    $date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO OrderTable (Customer_ID, Date, TotalPrice) VALUES ('$customerID','$date', '$totalPrice')";
    $query = $conn->prepare($sql);
    $query->execute();
    $orderID = $conn->lastInsertId();

    $sql2 = "SELECT * FROM OrderTable WHERE ID = '$orderID'";
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
