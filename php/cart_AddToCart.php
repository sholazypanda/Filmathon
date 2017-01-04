<?php
include 'dbconnect.php';
session_start();
#include '../homepage.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$movieId = $_GET["movie_id"];

$sql = "SELECT qty from cart where movie_id='".$movieId."' and username='".$_SESSION["username"]."'";
$sql2 = "";
$un = $_SESSION["username"];
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	// output data of each row
	$sql2 = "UPDATE cart set qty=qty+1 where username='".$_SESSION["username"]."' and movie_id='".$movieId."'";
} else {
	$sql2 = "INSERT INTO `cart` (`username`, `movie_id`, `qty`) VALUES ('".$un."','".$movieId."','1')";
}
$result2 = $conn->query($sql2);



//echo $sql;	

$conn->close();
header("Location: Cart.php");
?>