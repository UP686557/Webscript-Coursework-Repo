<?php
  // Displays the database table names Customer
  // Include variables from the given file
  require '../../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL Query
    $sql = "SELECT t3.ID AS Order_ID, t4.ID AS Customer_ID, t2.Product_ID, t1.Name, t1.Price, t2.Quantity, t2.TotalPrice, t3.Date FROM Product t1
inner join OrderItem t2 on t2.Product_ID=t1.ID
inner join OrderTable t3 on t2.Order_ID = t3.ID
inner join Customer t4 on t3.Customer_ID = t4.ID
";

    // Prepare and execure the query
    $query = $conn->prepare($sql);
    $query->execute();
    // Fetch the result as an associative array
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    // Encode the result as a JSON object
    $json = json_encode($result);
    // Return the json object
    echo $json;
    }

  // Error Detection
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  // Close the connection
  $conn = null;
?>
