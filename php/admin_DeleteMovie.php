<?php
include 'dbconnect.php';
#include '../homepage.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$key = $_POST["movieId"];
$sql = "DELETE FROM movies where movie_id= '$key'";
//echo $sql;
$result = $conn->query($sql);
$conn->close();
?>