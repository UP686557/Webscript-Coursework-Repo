<?php
  require 'dbCredentials.php';

  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $Name = $_GET['search'];
    $sort = $_GET['sort'];
    $search = addslashes($Name);

    if($sort == 'Name'){
      $sortName = "SELECT * FROM Product WHERE Name LIKE('%" . $search . "%') ORDER BY Name";
      $query = $conn->prepare($sortName);
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($result);
      echo $json;
    }

    if($sort == 'Price'){
      $sortPrice = "SELECT * FROM Product WHERE Name LIKE('%" . $search . "%') ORDER BY Price";
      $query = $conn->prepare($sortPrice);
      $query->execute();
      $result = $query->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($result);
      echo $json;
    }

    if($sort == "Default"){
      $closestResult = "SELECT * FROM Product WHERE Name LIKE('%" . $search . "%') ORDER BY
        CASE WHEN Name like '" . $search . "%' THEN 0
        WHEN Name like '" . $search . "%' THEN 1
        WHEN Name like '% " . $search . "%' THEN 2
        ELSE 3
        END, Name";
        $query = $conn->prepare($closestResult);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($result);
        echo $json;
    }

    }
    catch(PDOException $e)
    {
      echo $sql . "<br>" . $e->getMessage();
    }
  $conn = null;
?>
