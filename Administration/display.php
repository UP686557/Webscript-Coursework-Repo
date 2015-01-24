<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "products";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "SELECT * FROM product";

  $query = $conn->prepare($sql);
  $query->execute();
  $result = $query->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($result);
  echo $json;
  }

  catch(PDOException $e)
  {
    echo $sql . "<br>" . $e->getMessage();
  }
  ?>
