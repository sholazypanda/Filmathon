 <?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "filmathon";

$uname = $_POST["username"];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT userlevel FROM `users` where username = '$uname'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) 
	{
		
		print json_encode('exist');
		
	}
	
} 
else {
    print json_encode('does not exist');
}


$conn->close();
?>