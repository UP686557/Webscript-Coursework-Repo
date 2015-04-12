<?php
  require 'dbCredentials.php';

  try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



    date_default_timezone_set("Europe/London");
    $date = date("d/m/Y H:i:s");

    $customerID =

    $sql = "INSERT INTO OrderTable (Customer_ID, Date) VALUES ('$customerID','$date')";
    $query = $conn->prepare($sql);
    $query->execute();

  }
  catch(PDOException $e){
    echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;

?>


INSERT INTO TAB_STUDENT(name_student, id_teacher_fk) SELECT 'Joe The Student', id_teacher FROM TAB_TEACHER WHERE name_teacher = 'Professor Jack'
 LIMIT 1
