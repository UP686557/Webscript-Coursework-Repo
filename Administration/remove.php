<?php
require '../dbCredentials.php';


	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$ID = $_GET['productID'];
		$sql = "DELETE FROM Product WHERE ID = '$ID'";

		$conn->exec($sql);
		echo '<p>ID: ' . $ID . '</p>';

	}
	catch(PDOException $e)
	{
		echo $sql . "<br>" . $e->getMessage();
	}

	$conn = null;
?>
