
	function deleteMovie(movieId){
		
		$.ajax({
			type: "POST",
			url: "php/admin_DeleteMovie.php",
			dataType: "json",    
			data: {
				movieId: movieId
			},
			success: function (data) {
			    window.location= "/php/adminpage.php";
			},
			error: function(data) {
			}
		});
	    window.location= "adminpage.php";

	}
	function editMovie(movieId){
/*		$.ajax({
			type: "POST",
			url: "php/admin_EditMovie.php",
			dataType: "json",    
			data: {
				movieId: movieId
			},
			success: function (data) {
				console.log("success");
			   console.log(data);
			},
			error: function(data) {
				console.log(data);
			}
		});*/
		//window.location= "/php/admin_EditMovie.php?movieId='+movieId";
		window.location= "php/admin_EditMovie.php?movieId="+movieId;
	}
