window.onload = function(e){
	e.preventDefault();
	$.ajax({
		url: "php/is_session.php",
		success: function(data){
			if(data.length > 0){
				$("#name").html("Hello " + data);
				form_visible("name");
				form_visible("log_out_but");
				form_hidden("sign_up_but");
				form_hidden("log_in_but");
			} else {
				$("#name").html("Log in please");
				start();
			}
		}
	});
	//$('#sign_form').trigger('reset');
	$("#navigation #log_out_but").click(function (e){
		e.preventDefault();
		$.ajax({
			url: "php/log_out.php",
			success: function(){
				$("#name").html("Log in please");
				start();
			}
		});
	});
	$('#sign_form').submit(function (e){
		e.preventDefault();
		var pass = document.getElementById("sign_pass");
		var password = document.getElementById("sign_password");
		if (pass.value == password.value) {
		  var msg2 = document.getElementById("pass_inv");
		  msg2.style.visibility = "hidden";
		  var formitems = $("#sign_form").serialize();
		  $.ajax({
			type: "POST",
			url: "php/sign.php",
			data: formitems,
			dataType: "text",
			success: function(data){
				if(data != 1) validregistration(); else{
					var a = document.getElementById("email_inv");
					a.style.visibility = "visible";
				}
			}
		  });
		} else {
		  var a = document.getElementById("pass_inv");
		  a.style.visibility = "visible";
		}
	});
	$('#log_form').submit(function (e){
		e.preventDefault();
		var mail = document.getElementById("log_mail");
		var password = document.getElementById("log_pass");
		//var formitems = "log_mail=" + mail.value + "&&log_pass=" + password.value;
		var formitems = $("#log_form").serialize();
		$.ajax({
			type: "POST",
			url: "php/log.php",
			data: formitems,
			dataType: "text",
			success: function(data){
				if(data.length > 0){
					var a = a = document.getElementById("log_error");
					a.style.visibility = "hidden";
					$("#name").html("Hello "+data);
					form_change_visible("name");
					form_change_visible("log_out_but");
					form_change_visible("log_in_but");
					form_change_visible("sign_up_but");
					
				} else {
					$("#navigation").html("asdfasdf");
					var a = document.getElementById("log_error");
					a.style.visibility = "visible";
				}
			}
		});
	});
}

var validregistration = function(){
	var a = document.getElementById("email_inv");
	a.style.visibility = "hidden";
}

var form_change_visible = function(e){
	var a = document.getElementById(e);
	if(GetCssStyle(a).visibility == a.style.visibility){
		if(a.style.visibility != "hidden") a.style.visibility = "hidden"; else a.style.visibility = "visible";
	} else {
		if(GetCssStyle(a).visibility != "hidden") a.style.visibility = "hidden"; else a.style.visibility = "visible";
	}
}
var form_hidden = function(e){
	var a = document.getElementById(e);
	a.style.visibility = "hidden";
}
var form_visible = function(e){
	var a = document.getElementById(e);
	a.style.visibility = "visible";
}

var log_but_click = function(){
	if(real_vis("sign_form") != real_vis("log_form") && real_vis("log_form") == "hidden"){
		form_change_visible("sign_form");
		form_change_visible("log_form");
	} else form_change_visible("log_form");
}
var sign_but_click = function(){
	if(real_vis("sign_form") == "hidden" && real_vis("sign_form") != real_vis("log_form")){
		form_change_visible("log_form");
		form_change_visible("sign_form");
	} else form_change_visible("sign_form");
}

var start = function(){
	form_hidden("log_form");
	form_hidden("sign_form");
	form_hidden("notice");
	form_hidden("log_out_but");
	form_hidden("name");
	form_visible("sign_up_but");
	form_visible("log_in_but");
}

function real_vis(e){
	if(document.getElementById(e).visibility == "visible" || document.getElementById(e).visibility == "hidden")
		return document.getElementById(e).visibility;
	return GetCssStyle(document.getElementById(e)).visibility;
}
function GetCssStyle(e){
	if (e.currentStyle) return e.currentStyle;
	else if (window.getComputedStyle) return window.getComputedStyle(e,null)
}