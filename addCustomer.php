<?php
  require 'dbCredentials.php';
  ini_set('display_errors', 1);
  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $fName = $_GET['firstName'];
    $surname = $_GET['surname'];
    $email = $_GET['email'];
    $phoneNumber = $_GET['phoneNumber'];
    $address = $_GET['address'];
    $town = $_GET['town'];
    $county = $_GET['county'];
    $postCode = $_GET['postCode'];

    $sql = "INSERT INTO Customer (FirstName, LastName, Email, PhoneNumber, Address, Town, County, PostCode)
            VALUES ('$fName','$surname','$email', '$phoneNumber','$address','$town','$county','$postCode')";
    $query = $conn->prepare($sql);
    $query->execute();
    $customerID = $conn->lastInsertId();



    $sql2 = "SELECT * FROM Customer WHERE ID = '$customerID'";
    $query2 = $conn->prepare($sql2);
    $query2->execute();

    $result = $query2->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($result);
    echo $json;
  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;

?>
