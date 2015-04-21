<?php
  // Displays the database table names Customer
  // Include variables from the given file
  require '../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL Query
    $sql = "SELECT * FROM Customer";

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
