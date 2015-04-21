<?php
	// Used to delete data from product table
	// Include variables from the given file
	require '../dbCredentials.php';

	// Connect to the server
	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// Get values from the web page
		$ID = $_GET['productID'];
		// SQL Query
		$sql = "DELETE FROM Product WHERE ID = '$ID'";
		// Execute the query
		$conn->exec($sql);
		// Return the ID of the deleted product
		echo '<p>ID: ' . $ID . '</p>';

	}

	// Error Detection
	catch(PDOException $e)
	{
		echo $sql . "<br>" . $e->getMessage();
	}

	// Close the connection
	$conn = null;
?>
