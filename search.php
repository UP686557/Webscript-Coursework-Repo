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
              CASE WHEN Name like '" . $search . "%' THEN 0
              WHEN Name like '" . $search . "%' THEN 1
              WHEN Name like '% " . $search . "%' THEN 2
              ELSE 3
              END, Name";
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

            $conn = null;
          ?>
