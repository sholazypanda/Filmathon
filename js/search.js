$(document).ready(function(){
	$("button#submitID").click(function(){
		//alert("Yes");
		var queryString = $("input#searchID").val().toLowerCase();
		console.log(queryString);
		 $.ajax({
     		type: "GET",
     		url: "php/searchMovie.php",
     		dataType: "json",    
     		data: {
     			query : queryString
     		},
     		success: function (data) {
     			console.log(data);
    			
     			var length = Object.keys(data).length;
     			console.log(length);
     			var numberOfRows = Math.ceil(length/3.0);
     			console.log(numberOfRows);// each row has 3 elements , if total 9 elements, there are 3 rows.
     			$('.dynamic').remove();
     			for(var i=0;i<numberOfRows;i++){
     				
     				var toAppendDivRows = "<div id='row"+i+"' class='row dynamic'></div>";
     				console.log(toAppendDivRows);
     				$('#moviesList').append(toAppendDivRows);
     			}
     			
     			
     			
     			$.each(data, function(index, element) {
     				if(element.qty=='0'){
    					var movieId = element.movie_id;
    			    	var toAppendDivElements = "<div class='col-sm-4'>" +
    	    			"<div class='panel panel-success'>" +
    	    			"<div class='panel-heading' id= '"+element.title+"' style='text-align:center;'>" +
    	    			element.title +"("+element.yr+")"+
    	    			"</div>" +
    	    			"<div class='panel-body'>" +
    	    			"<img src='img/"+element.img_id+"' style='width:100%' alt='Image'>" +
    	    			"</div>" +
    	    			"<div class='panel-footer'>" +
    	    			"Price: $"+element.price +
    	    			" "+
    	    			"\tType: "+element.type +
    	    			"\tGenre: "+element.genre +
    	    			"</div>" +
    	    			"<a href='#' class='btn btn-danger' style='margin:10px 100px 10px 100px;text-transform: uppercase;' role='button' id='"+element.movie_id+"'>Out Of Stock</a>" +
    	    			"</div>" +
    	    			"</div>"; 
    			    	//console.log(toAppendDivElements);
    			    	$("#row"+Math.floor(index/3)).append(toAppendDivElements);
    			    	//console.log("append successful");
    			    	
    				}
     				else{
     			    	console.log(index);
     			    	//console.log(element.img_id);
     			    	var toAppendDivElements = "<div class='col-sm-4'>" +
     	    			"<div class='panel panel-success'>" +
     	    			"<div class='panel-heading' style='text-align:center;'>" +
     	    			element.title +"("+element.yr+")"+
     	    			"</div>" +
     	    			"<div class='panel-body'>" +
     	    			"<img src='img/"+element.img_id+"' style='width:100%' alt='Image'>" +
     	    			"</div>" +
     	    			"<div class='panel-footer'>" +
     	    			"Price: $"+element.price +
     	    			" "+
     	    			"\tType: "+element.type +
     	    			"\tGenre: "+element.genre +
     	    			"</div>" +
     	    			"<a href='php/cart_AddToCart.php?movie_id="+element.movie_id+"' class='btn btn-info' style='margin:10px 100px 10px 100px;text-transform: uppercase;' role='button' id='"+element.movie_id+"'>Add to cart</a>" +
     	    			"</div>" +
     	    			"</div>"; 
     			    	console.log(toAppendDivElements);
     			    	console.log($("#row"+Math.floor(index/3)));
     			    	$("#row"+Math.floor(index/3)).append(toAppendDivElements);
     			    	//console.log("append successful");
     				}
     			    
     			});
     			
     		},
     		error: function(exception) {
     			  //var err =  xhr.responseText;
     			  //alert(err.Message);
     			  console.log(exception);
     			}
     	});
	});
});	