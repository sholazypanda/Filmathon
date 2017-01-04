<?php
include 'dbconnect.php';
#include '../homepage.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$title = $_POST["title"];
$price = $_POST["price"];
$genre = $_POST["genre"];
$rating = $_POST["rating"];
$year = $_POST["year"];
$quantity = $_POST["quantity"];
$description = $_POST["description"];
$type = $_POST["type"];

$target_dir = "../img/";

$filename = basename($_FILES['image']['name']);
$target_file = $target_dir . basename($_FILES['image']['name']);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
move_uploaded_file($_FILES['image']['tmp_name'], $target_file);

$sql = "INSERT INTO `movies` (`movie_id`, `title`, `price`, `genre`, `rating`, `yr`, `qty`, `description`, `type`, `img_id`) VALUES (NULL, '$title', '$price', '$genre', '$rating', '$year', '$quantity', '$description', '$type', '$filename');";
//echo $sql;
$result = $conn->query($sql);
$conn->close();
header("Location: ../adminpage.php");
?>