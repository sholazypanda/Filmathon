function deleteFromCart(username,movieId){
		//console.log("Here");
		//alert("button pressed");
		//alert(movieId);
		//alert(username);
		$.ajax({
			type: "POST",
			url: "cart_DeleteMovie.php",
			dataType: "json",    
			data: {
				movieId: movieId,
				username: username
			},
			success: function (data) {
				//console.log(data);
			   
			},
			error: function(data) {
				//console.log(data);
			}
		});
	   window.location= "Cart.php";

	}
function checkOut(username){
	var movie_ids = [];
	
	$(".checkout-row").each(function(i) {		
			 var movie_id = this.id;
			 movie_ids.push(movie_id);
	});
    
	var jsonMovieIDs = JSON.stringify(movie_ids);
	
	$.ajax({
		type: "POST",
		url: "cart_AddCheckOut.php",
		dataType: "json",    
		data: {
			username: username,
			movie_ids: jsonMovieIDs
		},
		success: function (data) {
			console.log(data);
		   
		},
		error: function(data) {
			console.log(data);
		}
	});
   window.location= "order_History.php";
}