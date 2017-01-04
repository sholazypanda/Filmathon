<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "filmathon";
	
	$uname = $_POST["uname"];
	$pass = $_POST["pass"];
	$myname = $_POST["myname"];
	$email = $_POST["email"];
	$cardNo = $_POST["cardNo"];
	$cardName = $_POST["cardName"];
	$expiryMonth = $_POST["expiryMonth"];
	$expiryYear = $_POST["expiryYear"];
	$cvv = $_POST["cvv"];
	$userlevel = 'u';
	
	$pass = hash('sha256', $pass );
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

$sql = "INSERT INTO `users` (`username`, `password`, `name`, `userlevel`, `email`, `cardNo`, `cardHolderName`, `expiryYear`, `cvv`, `expiryMonth`) VALUES ('$uname', '$pass', '$myname', '$userlevel', '$email', '$cardNo', '$cardName', $expiryYear, $cvv, $expiryMonth)";

if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
	print json_encode('exists');
} 
else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>