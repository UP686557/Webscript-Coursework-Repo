
<?php
  // Used to create the database
  // Include variables from the given file
  require '../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO("mysql:host=localhost;dbname=coursework_db", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL Query
    $sql = "
    CREATE TABLE IF NOT EXISTS Product(
        ID int NOT NULL AUTO_INCREMENT,
        Name varchar(255) NOT NULL,
        Description text(65535) NOT NULL,
        Quantity int NOT NULL,
        Photo varchar(255),
        Price float NOT NULL,
        Category varchar(50),
        PRIMARY KEY (ID)
    ) ENGINE=innoDB;

    CREATE TABLE IF NOT EXISTS Customer(
        ID int NOT NULL AUTO_INCREMENT,
        FirstName varchar(255) NOT NULL,
        LastName varchar(255) NOT NULL,
        Email varchar(255) NOT NULL,
        PhoneNumber varchar(11) NOT NULL,
        Address varchar(50),
        Town varchar(50),
        County varchar(50),
        PostCode varchar(50),
        PRIMARY KEY (ID)
    ) ENGINE=innoDB;

    CREATE TABLE IF NOT EXISTS OrderTable(
      ID int NOT NULL AUTO_INCREMENT,
      Date date NOT NULL,
      PRIMARY KEY (ID),
      Customer_ID int NOT NULL,
      CONSTRAINT fk_Order_1
        FOREIGN KEY (Customer_ID)
        REFERENCES coursework_db.Customer (ID)
    ) ENGINE=innoDB;

    CREATE TABLE IF NOT EXISTS OrderItem(
      ID int NOT NULL AUTO_INCREMENT,
      PRIMARY KEY (ID),
      Product_ID int NOT NULL,
      Order_ID int NOT NULL,
      Quantity int NOT NULL,
      CONSTRAINT fk_OrderItem_1
        FOREIGN KEY (Product_ID)
        REFERENCES coursework_db.Product(ID),
      CONSTRAINT fk_OrderItem_2
        FOREIGN KEY (Order_ID)
        REFERENCES coursework_db.OrderTable(ID)
    ) ENGINE=innoDB;


    ";
    // Execute the query
    $conn->exec($sql);
    // Return a completion message and a link to the index page
    echo 'Database Created' . '<p><a href="../">Start using the website</a></p>';

  // Error Detection
  }
  catch(PDOException $e)
  {
    echo $sql . '<br>' . $e->getMessage();
  }

  // Close the connection
  $conn = null;
?>
