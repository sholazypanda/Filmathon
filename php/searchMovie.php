<?php
include 'dbconnect.php';
#include '../homepage.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$key = $_GET["query"];

$sql = "SELECT * FROM movies where (LOWER(title) LIKE '%".$key."%') OR (LOWER(description) LIKE '%".$key."%') OR (`yr` LIKE '%".$key."%') OR (LOWER(`type`) LIKE '%".$key."%')";

$result = $conn->query($sql);
$finalRows = array();
if ($result->num_rows > 0) {
	// output data of each row
	while($row = $result->fetch_assoc()) {
		array_push($finalRows,$row);
	}
} else {
	echo "0 results";
}
$jsonObj = json_encode($finalRows,JSON_FORCE_OBJECT);
echo $jsonObj;
$conn->close();
?>