<?php
  require 'dbCredentials.php';

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


    $sql = "INSERT INTO Customer (FirstName, LastName, Email, PhoneNumber, Address, Town, County, PostCode) VALUES ('$fName','$surname','$email', '$phoneNumber','$address','$town','$county','$postCode')";
    $query = $conn->prepare($sql);
    $query->execute();
    echo '<p>Name: ' . $fName . $surname . '</p>';
    echo '<p>Email: ' . $email . '</p>';
    echo '<p>Phone Number: ' . $phoneNumber . '</p>';
    echo '<p>Address: ' . $address . '</p>';
    echo '<p>Town: ' . $town . '</p>';
    echo '<p>County: ' . $county . '</p>';
    echo '<p>Post Code: ' . $postCode . '</p>';


  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;

?>
