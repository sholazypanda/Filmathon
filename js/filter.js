$(function () {
	
    $('.list-group.checked-list-box .list-group-item').each(function () {
        
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);
        
        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
            
        });
        //console.log(checkedItemsInLi);
        $checkbox.on('change', function () {
            updateDisplay();
            //listAllChecked();
            refreshPage();
        });
          

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);
            
            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
                
                
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }
        function listAllChecked(){
        	  //console.log("am hr");
                //event.preventDefault(); 
                var checkedItems = new Array(), counter = 0;
                $("#check-list-box li.active").each(function(idx, li) {
                	checkedItems[counter] = $(li).text();
                    counter++;
                });
                for(var i=0;i<counter;i++)
                console.log(checkedItems[i]);
                return checkedItems;
        }
        function refreshPage(){
        	var options = listAllChecked();
        	var isChecked = $checkbox.is(':checked');
        	if(isChecked){
        	var genreText = options	;
            //console.log("genreText"+genreText);
            $.ajax({
        		type: "GET",
        		url: "php/filteredMovieList.php",
        		dataType: "json",    
        		data: {
        			genre : genreText
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
        				//console.log(toAppendDivRows);
        				$('#moviesList').append(toAppendDivRows);
        			}
        			
        			
        			
        			$.each(data, function(index, element) {
        					
        			    	//console.log(index);
        			    	//console.log(element.img_id);
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
        				else
        				{
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
        			    	//console.log(toAppendDivElements);
        			    	$("div#row"+Math.floor(index/3)).append(toAppendDivElements);
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
        	}
        }
        
        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();
            
            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
    
    
    
    
});