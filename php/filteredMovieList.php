<?php
include 'dbconnect.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$genre = $_GET["genre"];
//$genreChanged = mysqli_realimplode(",",$genre);
//echo $genre;
//$where=implode($genre,' OR ');
//$bits = explode(' ', $genre);
//echo $where;


//$sql = "SELECT * FROM movies WHERE INSTR(genre,'".$where."')>'0'";
//$sql = "SELECT * FROM movies WHERE genre LIKE "%".'$where'."%"";
$sql = "SELECT * FROM movies WHERE genre LIKE '%" . implode("%' OR genre LIKE '%", $genre) . "%'";
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
$jsonObj = json_encode($finalRows);
echo $jsonObj;
$conn->close();
?>
