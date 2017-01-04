<?php
include 'dbconnect.php';
session_start();
#include '../homepage.php';
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$username = $_POST["username"];

$movie_ids = json_decode(stripslashes($_POST['movie_ids']));
$count = 0;

foreach($movie_ids as $movie_id){
	
	list($mid, $qty,$price) = explode(':', $movie_id);
	
	$total_price = $price * $qty;
	$sql =  "insert into transactions(username, movie_id, start_date, transaction_status,transaction_price) values('".$username. "',". $mid . ", current_timestamp ," ."'checkout'".",".$total_price.")";
	#echo $sql;
	$result = $conn->query($sql);
	$sql2 = "UPDATE movies SET qty = qty-$qty where movie_id =$mid ";
	//echo $sql2;
	$result2 = $conn->query($sql2);	
	$sql3 = "DELETE from cart where movie_id =$mid and username='".$_SESSION["username"]."'";
	$result3 = $conn->query($sql3);	
	//echo $sql3;
}


//echo $sql;

$conn->close();
//header("Location: order_History.php");

?>