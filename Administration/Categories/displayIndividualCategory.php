<?php
ini_set('display_errors', 1);
  // Displays the categories for the products
  // Include variables from the given file
  require '../../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $category = $_GET['category'];

    // SQL Query
    $sql = "SELECT * FROM Product WHERE Category = '$category'";

    // Prepare and Execute the Query
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
