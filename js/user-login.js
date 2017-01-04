$(document).ready(function(){
	
	$('#registerform').submit(function(e) {
		e.preventDefault();
	});
	$('#loginform').submit(function(e) {
		e.preventDefault();
	});
	
	var isValid = 0;
	
	$("#dialog").dialog({
			autoOpen: false,
			modal: true,
			title: "Message",
			buttons: {
			Close: function () {
                $(this).dialog('close');
            }
		}
	});	
	

	$("<span id=unameSpan></span>").insertAfter("#uname");
	$("<span id=passSpan></span>").insertAfter("#pass");
	$("<span id=rePassSpan></span>").insertAfter("#rePass");
	$("<span id=mynameSpan></span>").insertAfter("#myname");
	$("<span id=mailSpan></span>").insertAfter("#email");
	$("<span id=cardNoSpan></span>").insertAfter("#cardNo");
	$("<span id=cardNameSpan></span>").insertAfter("#cardName");
	$("<span id=expiryMonthSpan></span>").insertAfter("#expiryMonth");
	$("<span id=expiryYearSpan></span>").insertAfter("#expiryYear");
	$("<span id=cvvSpan></span>").insertAfter("#cvv");
	//$("#unameSpan").hide();
	//alert("3");

	$('#uname').focus(function() {
		$("#unameSpan").text("No special characters allowed").show();
		$("#unameSpan").removeClass();
		$("#unameSpan").addClass("info");
	});

	$('#uname').blur(function() {
		var uname = $("#uname").val();
		var res = /^[a-zA-Z0-9]+$/.test(uname);  
		
		if (!uname) {
			isValid = 0;
			$("#unameSpan").hide();
		} else {
			if (res) {
				//AJAX Call to check presence of username in system
				//////////////////////////////////////
				
				$.ajax({
			
				type: 'POST',
				url: "php/usernameCheck.php",
				dataType: "json",    
				data: {
				username: uname
			},
			success: function (data) {	
				
				if(data == 'exist')
				{
					isValid = 0;
					$("#unameSpan").text("Error: Username already exist").show();
					$("#unameSpan").removeClass();
					$("#unameSpan").addClass("error");
					
				}
				else if(data == 'does not exist')
				{
					isValid = 1;
					$("#unameSpan").text("OK").show();
					$("#unameSpan").removeClass();
					$("#unameSpan").addClass("ok");
				}
			},
			error: function(data) {
					
			}
			 			
		});	
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				///////////////////////////////////
				
				
			} 
			else {
				isValid = 0;
				$("#unameSpan").text("Error").show();
				$("#unameSpan").removeClass();
				$("#unameSpan").addClass("error");
			}
		}
	});
	
	
	

	$('#pass').focus(function() {
		$("#passSpan").text("Numbers & Special characters required").show();
		$("#passSpan").removeClass();
		$("#passSpan").addClass("info");
	});

	$('#pass').blur(function() {
		var pass = $("#pass").val();
		var res = /^[0-9a-zA-Z.!@#$]{8,}$/.test(pass);
		console.log("res pass " + res);
		if (!pass) {
			isValid = 0;
			$("#passSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#passSpan").text("OK").show();
				$("#passSpan").removeClass();
				$("#passSpan").addClass("ok");
			} else {
				isValid = 0;
				$("#passSpan").text("Error").show();
				$("#passSpan").removeClass();
				$("#passSpan").addClass("error");
			}
		}
	});

	
	
	
	
	$('#rePass').focus(function() {
		$("#rePassSpan").text("Should be same as password entered above").show();
		$("#rePassSpan").removeClass();
		$("#rePassSpan").addClass("info");
	});

	$('#rePass').blur(function() {
		var pass = $("#rePass").val();
		var res = $("#rePass").val() == $("#pass").val();
		console.log("res pass " + res);
		if (!pass) {
			isValid = 0;
			$("#rePassSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#rePassSpan").text("OK").show();
				$("#rePassSpan").removeClass();
				$("#rePassSpan").addClass("ok");
			} else {
				isValid = 0;
				$("#rePassSpan").text("Error").show();
				$("#rePassSpan").removeClass();
				$("#rePassSpan").addClass("error");
			}
		}
	});
	
	
	
	
	
	$('#myname').focus(function() {
		$("#mynameSpan").text("Should contain only alphabets").show();
		$("#mynameSpan").removeClass();
		$("#mynameSpan").addClass("info");
	});

	$('#myname').blur(function() {
		var name = $("#myname").val();
		var res = /^[a-zA-Z][a-zA-Z ]+$/.test(name);;
		if (!name) {
			isValid = 0;
			$("#mynameSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#mynameSpan").text("OK").show();
				$("#mynameSpan").removeClass();
				$("#mynameSpan").addClass("ok");
			} else {
				isValid = 0;
				$("#mynameSpan").text("Error").show();
				$("#mynameSpan").removeClass();
				$("#mynameSpan").addClass("error");
			}
		}
	});
	
	
	
	
	
	$('#email').focus(function() {
		$("#mailSpan").text("E-mail will be verified").show();
		$("#mailSpan").removeClass();
		$("#mailSpan").addClass("info");
	});

	$('#email').blur(function() {
		var mail = $("#email").val();
		var res = /^.+@.+\..+$/.test(mail);
		console.log("res email " + res);
		if (!mail) {
			isValid = 0;
			$("#mailSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#mailSpan").text("OK").show();
				$("#mailSpan").removeClass();
				$("#mailSpan").addClass("ok");
			} else {
				isValid = 0;
				$("#mailSpan").text("Error").show();
				$("#mailSpan").removeClass();
				$("#mailSpan").addClass("error");
			}
		}
	});


	
	
	
	
	
	$('#cardNo').focus(function() {
		$("#cardNoSpan").text("A valid card number").show();
		$("#cardNoSpan").removeClass();
		$("#cardNoSpan").addClass("info");
	});

	$('#cardNo').blur(function() {
		var uname = $("#cardNo").val();
		var res = /^[0-9]{16}$/.test(uname);  
		console.log("res uname " + res);
		if (!uname) {
			isValid = 0;
			$("#cardNoSpan").hide();
		} else {
			if (res) {
				//AJAX Call to check presence of username in system
				isValid = 1;
				$("#cardNoSpan").text("OK").show();
				$("#cardNoSpan").removeClass();
				$("#cardNoSpan").addClass("ok");
			} 
			else {
				isValid = 0;
				$("#cardNoSpan").text("Error").show();
				$("#cardNoSpan").removeClass();
				$("#cardNoSpan").addClass("error");
			}
		}
	});
	
	
	
	
	$('#cardName').focus(function() {
		$("#cardNameSpan").text("Should contain only alphabets").show();
		$("#cardNameSpan").removeClass();
		$("#cardNameSpan").addClass("info");
	});

	$('#cardName').blur(function() {
		var name = $("#cardName").val();
		var res = /^[a-zA-Z][a-zA-Z ]+$/.test(name);;
		if (!name) {
			isValid = 0;
			$("#cardNameSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#cardNameSpan").text("OK").show();
				$("#cardNameSpan").removeClass();
				$("#cardNameSpan").addClass("ok");
			} else {
				isValid = 0;
				$("#cardNameSpan").text("Error").show();
				$("#cardNameSpan").removeClass();
				$("#cardNameSpan").addClass("error");
			}
		}
	});
	
	
	
	
	
	$('#expiryMonth').focus(function() {
		$("#expiryMonthSpan").text("enter number between 1 to 12").show();
		$("#expiryMonthSpan").removeClass();
		$("#expiryMonthSpan").addClass("info");
	});

	$('#expiryMonth').blur(function() {
		var uname = $("#expiryMonth").val();
		var res = /^([0-9])|([0-9]{2})$/.test(uname);  
		if (!uname) {
			isValid = 0;
			$("#expiryMonthSpan").hide();
		} else {
			if (res && uname>=1 && uname<=12) {
				//AJAX Call to check presence of username in system
				isValid = 1;
				$("#expiryMonthSpan").text("OK").show();
				$("#expiryMonthSpan").removeClass();
				$("#expiryMonthSpan").addClass("ok");
			} 
			else {
				isValid = 0;
				$("#expiryMonthSpan").text("Error").show();
				$("#expiryMonthSpan").removeClass();
				$("#expiryMonthSpan").addClass("error");
			}
		}
	});
	
	
	
	
	
	$('#expiryYear').focus(function() {
		$("#expiryYearSpan").text("enter a valid year").show();
		$("#expiryYearSpan").removeClass();
		$("#expiryYearSpan").addClass("info");
	});

	$('#expiryYear').blur(function() {
		var uname = $("#expiryYear").val();
		var res = /^(20[0-9]{2})$/.test(uname);  
		if (!uname) {
			isValid = 0;
			$("#expiryYearSpan").hide();
		} else {
			if (res && uname>=2016) {
				//AJAX Call to check presence of username in system
				isValid = 1;
				$("#expiryYearSpan").text("OK").show();
				$("#expiryYearSpan").removeClass();
				$("#expiryYearSpan").addClass("ok");
			} 
			else {
				isValid = 0;
				$("#expiryYearSpan").text("Error").show();
				$("#expiryYearSpan").removeClass();
				$("#expiryYearSpan").addClass("error");
			}
		}
	});
	
	
	
	
	$('#cvv').focus(function() {
		$("#cvvSpan").text("enter 3 digits").show();
		$("#cvvSpan").removeClass();
		$("#cvvSpan").addClass("info");
	});

	$('#cvv').blur(function() {
		var uname = $("#cvv").val();
		var res = /^([0-9]{3})$/.test(uname);  
		if (!uname) {
			isValid = 0;
			$("#cvvSpan").hide();
		} else {
			if (res) {
				isValid = 1;
				$("#cvvSpan").text("OK").show();
				$("#cvvSpan").removeClass();
				$("#cvvSpan").addClass("ok");
			} 
			else {
				isValid = 0;
				$("#cvvSpan").text("Error").show();
				$("#cvvSpan").removeClass();
				$("#cvvSpan").addClass("error");
			}
		}
	});
	
	

	
	
	 
	$('#submit-sign').click(function(){	
		//alert("isValid :" + isValid);
		
		var uname = $('#uname').val();
		var pass = $('#pass').val();
		var myname = $('#myname').val();
		var email = $('#email').val();
		var cardNo = $('#cardNo').val();
		var cardName = $('#cardName').val();
		var expiryMonth = $('#expiryMonth').val();
		var expiryYear = $('#expiryYear').val();
		var cvv = $('#cvv').val();
		
	
		if(isValid == 1){
			$.ajax({
				type:'POST',
				url: "php/signup.php",
				//dataType: "json",    
				data: {
					uname : uname,
					pass : pass,
					myname : myname,
					email : email,
					cardNo : cardNo,
					cardName : cardName,
					expiryMonth : expiryMonth,
					expiryYear : expiryYear,
					cvv: cvv
					
				},
				success: function (data) {	
					//alert(data);
					isValid=0;
					$("#unameSpan").hide();
					$("#passSpan").hide();
					$("#rePassSpan").hide();
					$("#mynameSpan").hide();
					$("#mailSpan").hide();
					$("#cardNoSpan").hide();
					$("#cardNameSpan").hide();
					$("#expiryMonthSpan").hide();
					$("#expiryYearSpan").hide();
					$("#cvvSpan").hide();
						
					$('#registerform')[0].reset();
					$("#dialog").html("Thanks for signing up!");
					$("#dialog").dialog("open");
						
					
					console.log(data);
					
				},
				error: function(data) {
					 //alert("error");
					console.log(data);
				}
							
			});	
			}
			//when isValid = 0
			else{
			$('#registerform')[0].reset();
			$("#dialog").html("Please try again with valid information!");
			$("#dialog").dialog("open");
		}
	});

	
	
	
	
	
	
	
	
	$('#submit').click(function(){	
		
		var username = $.trim($('#username').val());
		var passwd = $.trim($('#password').val());
		
		$.ajax({
			
			type: 'POST',
			url: "php/login.php",
			dataType: "json",    
			data: {
				username: username,
				passwd: passwd
			},
			success: function (data) {	
				
				if(data == 'a')
				{//alert("admin block");
					window.location.replace("/Filmathon/adminpage.php");
					
				}
				else if(data == 'u')
				{//alert("user block");
					window.location.replace("/Filmathon/homepage.php");
				}
				else if(data == 'x'){
					//alert("invalid credential block");
					$('#loginform')[0].reset();
					$("#dialog").html("Invalid Credentials");
					$("#dialog").dialog("open");
				}
				else{
					$('#loginform')[0].reset();
					$("#dialog").html("Invalid Credentials");
					$("#dialog").dialog("open");
				}
				
			},
			error: function(data) {
				$('#loginform')[0].reset();
				$("#dialog").html("Error in login. Please try again.");
				$("#dialog").dialog("open");
				window.location.replace("/filmathon/login.html");	
			}
			 			
		});		
	});

	
});