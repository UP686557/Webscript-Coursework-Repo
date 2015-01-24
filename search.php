<!DOCTYPE HTML>
<html>
  <head>
      <title>Search</title>
      <link rel="stylesheet" type="text/css" href="CSS/style.css">
      <link rel="stylesheet" type="text/css" href="CSS/searchbar.css">
      <link rel="stylesheet" type="text/css" href="CSS/navigation.css">
      <link rel="stylesheet" type="text/css" href="CSS/searchPage.css">
      <meta charset="UTF-8">
  </head>
  <body>
    <header>
      <?php include 'navigationBar.php' ?>
    </header>
    <article>
        <section>
          <h1>Search Results</h1>
          <?php
            $servername = "localhost";
            $username = "root";
            $password = "root";
            $dbname = "products";

            try {
              $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
              $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

              $Name = $_GET['search'];
              $search = addslashes($Name);
              $sql = "SELECT * FROM Product WHERE Name LIKE('%" . $search . "%') ORDER BY
              CASE WHEN Name like '" . $search . " %' THEN 0
              WHEN Name like '" . $search . "%' THEN 1
              WHEN Name like '% " . $search . "%' THEN 2
              ELSE 3
              END, Name";
              $query = $conn->prepare($sql);
              $query->execute();
              $result = $query;

              echo '<h1 class="bottomBorder">You searched for: "' . $Name . '"</h1>';

              foreach($result as $row){
                $name = $row['Name'];
                $description = $row['Description'];
                $quantity = $row['Quantity'];
                $ID = $row['ID'];
                $price = $row['Price'];
                $photo = $row['Photo'];
                $imageUrl = "src='Images/Products/";

                echo '
                <section class="searchResult">
                  <h1>' . $name . '</h1>
                  <p class="photo"></p>
                  <p class="price">£' . $price . '</p>
                  <p class="productID">ID: ' . $ID . '</p>
                  <p class="description">' . $description . '</p>
                  <p class="quantity">Quantity: ' . $quantity . '</p>
                </section>
                ';
              }
            }

            catch(PDOException $e)
            {
              echo $sql . "<br>" . $e->getMessage();
            }

            $conn = null;
          ?>
        </section>
      </article>
      <?php include 'footer.php' ?>
  </body>
</html>
