<?php
session_start();
if(!isset($_SESSION['username'])){
	header('Location: /Filmathon/login.html');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Shopping Cart</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 
  <script src="../js/cartFunctions.js"></script>
  <style>
    /* Remove the navbar's default margin-bottom and rounded borders */
    .navbar {
      margin-bottom: 0;
      border-radius: 0;
    }
    
    /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
    .row.content {height: 450px}
    .cartEmpty {
   		 color: black;
   		 font-size: 50px;
   		-webkit-text-fill-color: white; /* Will override color (regardless of order) */
   		-webkit-text-stroke-width: 1px;
   		-webkit-text-stroke-color: black;
	}
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
        <li class="active"><a href="../homepage.php">Home</a></li>
       
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
  
<div class="container-fluid text-center">
  <div class="row content">
    <div class="col-sm-2 sidenav">
      <p><a href="#"></a></p>
      <p><a href="../homepage.php">HomePage</a></p>
     
    </div>
    <div class="col-sm-8 text-left">
      	<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Remove from Cart</th>
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
         //echo $_SESSION['username'];
         $sql = "select m.title,m.price,c.qty,m.type,m.movie_id from movies m, cart c where c.movie_id=m.movie_id and c.username='".$_SESSION['username']."'";
         $un = '"'.$_SESSION['username'].'"';
         $result = $conn->query($sql);
         $finalRows = array();
         if ($result->num_rows > 0) {
         	// output data of each row
         	while($row = $result->fetch_assoc()) {
                 
				//$editButttonString="<td><button  class='btn btn-default' id='edit' onclick='editMovie(".$row["movie_id"].")'>Edit</button></td>";
				
				$mid = $row["movie_id"];
				$qty = $row["qty"];
				$price = $row["price"];
				$deleteButtonString="<td><button  class='btn btn-default' onclick='deleteFromCart(".$un.",".$mid.")'>X</button></td>";
				echo "<tr id='$mid:$qty:$price' class='checkout-row'><td>".$row["title"]."</td><td>".$row["price"]."</td><td>".$row["qty"]."</td><td>".$row["type"]."</td>".$deleteButtonString."</tr>";
         		//echo "<tr><td>".$row["movie_id"]."</td><td>".$row["title"]."</td><td>".$row["price"]."</td><td>".$row["genre"]."</td><td>".$row["rating"]."</td><td>".$row["yr"]."</td><td>".$row["qty"]."</td><td>".$row["type"]."</td><td>".$row["img_id"]."</td>".$editButttonString.$deleteButtonString."</tr>";
         	}
         } else {
         	echo "<div class='cartEmpty'>Cart is empty</div>";
         }
         //$jsonObj = json_encode($finalRows,JSON_FORCE_OBJECT);
         //echo $jsonObj;
        
         echo "<tr>
         <td><button type='button' class='btn btn-primary'  onclick='checkOut(".$un.")'>Checkout</button></td>
        </tr>";
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
  <p>Cart</p>
</footer>

</body>
</html>