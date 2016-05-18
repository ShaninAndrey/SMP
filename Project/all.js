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
				form_visible("add_note");
				view_nodes();
				form_visible("notice");
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
					form_change_visible("add_note");
					view_nodes();
					form_change_visible("notice");
					form_change_visible("log_form");
					
				} else {
					var a = document.getElementById("log_error");
					a.style.visibility = "visible";
				}
			}
		});
	});
	
}

function view_nodes(){
	$.ajax({
		url : "php/get_nodes.php",
		success : function(data){
			var res = data.split("razdelitel");
			for(var i=0; i<res.length-1; i+=4) add_note(res[i], res[i+1], res[i+2], res[i+3]);
		}
	});
}
function create_note(zIndex){
	var note = document.createElement("div");
	note.className = "note";
	note.id = "note" + zIndex;
	note.style.zIndex = zIndex;
	
	var head = document.createElement("div");
	head.className = "header";
	note.appendChild(head);
	
	var del = document.createElement("img");
	del.setAttribute("src", "img\\delete.png");
	del.setAttribute("onmouseup", "delete_note("+zIndex+")");
	del.id = "del" + zIndex;
	head.appendChild(del);
	var save = document.createElement("img");
	save.setAttribute("src", "img\\log_in.png");
	save.setAttribute("onmouseup", "save_note("+zIndex+")");
	save.id = "save" + zIndex;
	head.appendChild(save);
	
	var content = document.createElement("div");
	content.className = "editable content";
	content.id = "content" + zIndex;
	content.setAttribute("contenteditable", true);
	note.appendChild(content);
	
	var time = document.createElement("div");
	time.className = "time";
	time.id = "time" + zIndex;
	note.appendChild(time);
	
	return note;
}
function add_note(text, time, x, y){
	var allnote = document.getElementById("notice");
	var notice = allnote.getElementsByTagName('*');
	var zIndex;
	var last = notice[0];
	if(notice.length < 1){
		zIndex = 1;
	} else zIndex = +(last.id.substring(4)) + 1;
	var note = create_note(zIndex);
	if(notice.length < 1) allnote.appendChild(note); else allnote.insertBefore(note, last);
	
	if(!(text.length<1 && x == 0 && y == 0 && time == 0)){
		$("#content"+zIndex).html(text);
		$("#time"+zIndex).html(time);
		note.style.top = y;
		note.style.left = x;
	}
	
	var items = "id="+zIndex.toString()+"&&x=0&&y=0";
	if(text.length<1 && x == 0 && y == 0 && time == 0) $.ajax({
		type : "POST",
		data : items,
		dataType : "text",
		url : "php/add_note.php",
		success : function(date){
			$("#time"+zIndex).html(date);
		}
	});
	
}
function delete_note(e){
	var str = "id="+e;
	$.ajax({
		type : "POST",
		url : "php/delete_note.php",
		data : str,
		dataType : "text",
		success : function(data){
			$("#note"+e).remove();
		}
	});
	
}
function save_note(e){
	var note = document.getElementById("note"+e);
	var text = $("#content"+e).html();
	var x = GetCssStyle(note).left.toString();
	x = x.substr(0, x.length-2);
	var y = GetCssStyle(note).top.toString();
	y = y.substr(0, y.length-2);
	var str = "text="+text+"&&x="+x+"&&y="+y+"&&id="+e;
	$.ajax({
		type : "POST",
		data : str,
		dataType : "text",
		url : "php/save_node.php"
	});
}

var validregistration = function(){
	var a = document.getElementById("email_inv");
	a.style.visibility = "hidden";
	form_change_visible("sign_form");
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
		form_hidden("pass_inv");
		form_hidden("email_inv");
	} else form_change_visible("log_form");
}
var sign_but_click = function(){
	if(real_vis("sign_form") == "hidden" && real_vis("sign_form") != real_vis("log_form")){
		form_change_visible("log_form");
		form_change_visible("sign_form");
		form_hidden("log_error");
	} else form_change_visible("sign_form");
}

var start = function(){
	form_hidden("log_form");
	form_hidden("sign_form");
	form_hidden("notice");
	form_hidden("log_out_but");
	form_hidden("name");
	form_hidden("add_note");
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

