<?php
session_start();
if(!isset($_SESSION["username"])){
	header('Location: /Filmathon/login.html');
}
else{
	if($_SESSION["userlevel"]!="a"){
		header('Location: /Filmathon/login.html');
	}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Admin Homepage</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 
  <script src="js/adminFunctions.js"></script>
  <style>
    /* Remove the navbar's default margin-bottom and rounded borders */
    .navbar {
      margin-bottom: 0;
      border-radius: 0;
    }
    
    /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
    .row.content {height: 450px}
    
    /* Set gray background color and 100% height */
    .sidenav {
      padding-top: 20px;
      background-color: #f1f1f1;
      height: 100%;
    }
    
    /* Set black background color, white text and some padding */
    footer {
      background-color: #555;
      color: white;
      padding: 15px;
    }
    
    /* On small screens, set height to 'auto' for sidenav and grid */
    @media screen and (max-width: 767px) {
      .sidenav {
        height: auto;
        padding: 15px;
      }
      .row.content {height:auto;}
    }
  </style>
</head>
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="adminpage.php">Home</a></li>
       
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="php/logout.php"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
  
<div class="container-fluid text-center">
  <div class="row content">
    <div class="col-sm-2 sidenav">
      <p><a href="#"></a></p>
      <p><a href="php/admin_AddMovie.php">Add Movie</a></p>
     
    </div>
    <div class="col-sm-8 text-left">
      	<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Movie_id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Year</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "filmathon";
        $conn = new mysqli($servername, $username, $password, $dbname);
         if ($conn->connect_error) {
         	die("Connection failed: " . $conn->connect_error);
         }
        
         $sql = "SELECT * FROM movies";
         $result = $conn->query($sql);
         $finalRows = array();
         if ($result->num_rows > 0) {
         	// output data of each row
         	while($row = $result->fetch_assoc()) {

				$editButttonString="<td><button  class='btn btn-default' id='edit' onclick='editMovie(".$row["movie_id"].")'>Edit</button></td>";
				$deleteButtonString="<td><button  class='btn btn-default' id='delete' onclick='deleteMovie(".$row["movie_id"].")'>Delete</button></td>";
         		echo "<tr><td>".$row["movie_id"]."</td><td>".$row["title"]."</td><td>".$row["price"]."</td><td>".$row["genre"]."</td><td>".$row["rating"]."</td><td>".$row["yr"]."</td><td>".$row["qty"]."</td><td>".$row["type"]."</td><td>".$row["img_id"]."</td>".$editButttonString.$deleteButtonString."</tr>";
         	}
         } else {
         	echo "0 results";
         }
         //$jsonObj = json_encode($finalRows,JSON_FORCE_OBJECT);
         //echo $jsonObj;
         $conn->close();
         ?>
        
    </table>
    </div>
    <div class="col-sm-2 sidenav">
      
      </div>
    </div>
  </div>
</div>

<footer class="container-fluid text-center">
  <p>Admin Page</p>
</footer>

</body>
</html>

