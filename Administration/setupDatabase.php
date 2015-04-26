
<?php
  // Used to create the database
  // Include variables from the given file
  require '../dbCredentials.php';

  // Connect to the server
  try {
    $conn = new PDO('mysql:host=localhost;dbname=coursework_db', $username, $password);
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

    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('iPhone 6', '- iPhone 6 32GB<br>- Gold', 10, 'Images/Products/iPhone6.png', 599.00, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('iMac', '- 2011 model<br>- 1TB Hard Drive storage memory<br>- 8GB RAM Memory<br>- Quad core intel i7 processor', 15, 'Images/Products/iMac.png', 1200.00, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('iPad 2', '- iPad 2 16GB wifi only<br>- White', 50, 'Images/Products/iPad2.png', 499.00, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('iPhone 5', '- iPhone 5 64GB<br>- White', 10, 'Images/Products/iPhone5.png', 399.00, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('iWatch', 'Coming soon', 0, 'Images/Products/iWatch.png', 399.99, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('Samsung TV', '55 inch Samsung Smart TV', 2, 'Images/Products/55SamsungTV.png', 1000, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('MacBook Pro Retina', '- 2015 MacBook Pro Retina display<br>- 8GB RAM<br>- 128GB flash storage<br>- Backlit Keyboard', 30, 'Images/Products/macbookProRetina.png', 999, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('MacBook Air', '- 2015 MacBook Air 13 Inch<br>- 8Gb RAM<br>- 128Gb flash storage<br>- OSX Yosemite', 20, 'Images/Products/macbookAir.png', 899, 'Technology');
    INSERT INTO Product (Name, Description, Quantity, Photo, Price, Category) VALUES ('Trampoline', '- 10ft<br>- Blue<br>- Springs', 3, 'Images/Products/trampoline.png', 40, 'Outdoor');
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
