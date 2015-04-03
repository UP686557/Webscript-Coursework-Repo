
    <?php
    require 'dbCredentials.php';


    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $searchValue = $_GET['search'];

      if(isset($searchValue) && $searchValue != ''){
        $search = addslashes($searchValue);
        $statement = $conn->prepare("SELECT * FROM Product WHERE Name LIKE('%" . $search . "%') ORDER BY
        CASE WHEN Name like '" . $search . " %' THEN 0
        WHEN Name like '" . $search . "%' THEN 1
        WHEN Name like '% " . $search . "%' THEN 2
        ELSE 3
        END, Name");
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($result);
        echo $json;

      }
    }
    catch(PDOException $e)
    {
      echo "Error: " . $e->getMessage();
    }

    $conn = null;
    ?>
