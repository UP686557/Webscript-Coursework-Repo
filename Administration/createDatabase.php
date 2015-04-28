<?php

  require '../dbCredentials.php';

  try{
    $pdo = new PDO("mysql:host=localhost", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $databasename = "`".str_replace("`","``",$dbname)."`";
    $pdo->query("CREATE DATABASE IF NOT EXISTS $databasename");
    $pdo->query("use $databasename");

    include "setupDatabase.php";

  }

  catch(PDOException $e)
  {
    echo $pdo . '<br>' . $e->getMessage();
  }
?>
