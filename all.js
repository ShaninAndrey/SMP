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
				clear_nodes();
				start();
			}
		});
	});
	$('#sign_form').submit(function (e){
		e.preventDefault();
		var pass = document.getElementById("sign_pass");
		var password = document.getElementById("sign_password");
		if (pass.value == password.value) {
		  var msg2 = document.getElementById("sign_pass_form");
		  msg2.classList.remove("has-error");
		  var formitems = $("#sign_form").serialize();
		  $.ajax({
			type: "POST",
			url: "php/sign.php",
			data: formitems,
			dataType: "text",
			success: function(data){
				if(data != 1) validregistration(); else{
					var a = document.getElementById("sign_mail_form");
					a.classList.add("has-error");
				}
			}
		  });
		} else {
		  var a = document.getElementById("sign_pass_form");
		  a.classList.add("has-error");
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
				if(data.length > 0 && data != "email_is_invalid"){
					var a = document.getElementById("log_mail_form");
					a.classList.remove("has-error");
					a = document.getElementById("log_pass_form");
					a.classList.remove("has-error");
					/*var a = document.getElementById("emailEx");
					var b = document.getElementById("passEx");
					a.style.visibility = "hidden";
					b.style.visibility = "hidden";*/
					$("#name").html("Hello "+data);
					form_change_visible("name");
					form_change_visible("log_out_but");
					form_change_visible("log_in_but");
					form_change_visible("sign_up_but");
					form_change_visible("add_note");
					view_nodes();
					form_change_visible("notice");
					form_change_visible("log_form");
					
				} else if(data == "email_is_invalid"){
					var a = document.getElementById("log_mail_form");
					a.classList.add("has-error");
					a = document.getElementById("log_pass_form");
					a.classList.remove("has-error");
				} else {
					var a = document.getElementById("log_pass_form");
					a.classList.add("has-error");
					a = document.getElementById("log_mail_form");
					a.classList.remove("has-error");
				}
			}
		});
	});
	
}

function clear_nodes(){
	var allnote = document.getElementById("notice");
	var notice = allnote.getElementsByClassName('note');
	while(notice.length > 0) $("#"+notice[notice.length-1].id).remove();
}
function view_nodes(){
	$.ajax({
		url : "php/get_nodes.php",
		success : function(data){
			var res = data.split("razdelitel");
			for(var i=0; i<res.length-1; i+=8) open_note(res[i], res[i+1], res[i+2], res[i+3], res[i+4], res[i+5], res[i+6], res[i+7]);
		}
	});
}
function create_note(Id){
	//var color = {rgb(246, 243, 243);}
	//background-color: rgb(255, 248, 199);
	var color1 = ["#FFF8C7", "#EAF5BF", "#E6EDF2", "#FFE8DF", "#EEE7F3"];
	var color2 = ["#EEE8BD", "#DBE5B6", "#D5E5F2", "#EECCBD", "#E6D6F3"];
	
	var note = document.createElement("div");
	note.className = "note";
	note.id = "note" + Id;
	note.style.zIndex = 100;
	note.style.backgroundColor = color1[Id%5];
	note.setAttribute("onmousedown", "click_note("+Id+")");
	note.setAttribute("onmouseover", "vis_true("+Id+")");
	note.setAttribute("onmouseout", "vis_false("+Id+")");
	
	var head = document.createElement("div");
	head.className = "header";
	head.style.backgroundColor = color2[Id%5];
	note.appendChild(head);
	
	var del = document.createElement("img");
	del.setAttribute("src", "img\\delete.png");
	del.setAttribute("onmouseup", "delete_note("+Id+")");
	del.id = "del" + Id;
	del.style.visibility = "hidden";
	del.style.position = "absolute";
	del.style.right = "4px";
	del.style.top = "4px";
	del.style.cursor = "pointer";
	head.appendChild(del);
	var save = document.createElement("img");
	save.setAttribute("src", "img\\save.png");
	save.setAttribute("onmouseup", "save_note("+Id+", 0)");
	save.id = "save" + Id;
	save.style.visibility = "hidden";
	save.style.position = "absolute";
	save.style.left = "4px";
	save.style.top = "4px";
	save.style.cursor = "pointer";
	head.appendChild(save);
	
	var content = document.createElement("div");
	content.className = 'content';
	content.id = "edit" + Id;
	note.appendChild(content);
	
	var edit = document.createElement("div");
	edit.className = "editable";
	edit.id = "content" + Id;
	edit.setAttribute("contenteditable", true);
	content.appendChild(edit);
	
	var time = document.createElement("div");
	time.className = "time";
	time.id = "time" + Id;
	time.style.backgroundColor = color2[Id%5];
	note.appendChild(time);
	
	return note;
}
function add_note(){
	var mx = Math.max(get_max_zIndex(), 99)+1;
	var items = "zIndex="+mx;
	$.ajax({
		type : "POST",
		data : items,
		dataType : "text",
		url : "php/add_note.php",
		success : function(data){
			var res = data.split("razdelitel");
			for(var i=0; i<res.length-1; i+=2){
				var id = +res[i];
				var date = res[i+1];
				var note = create_note(id);
				var allnote = document.getElementById("notice");
				allnote.appendChild(note);
				note.style.zIndex = mx;
				$("#"+note.id).draggable({
					handle: ".header",
					containment : "parent",
					stack : ".note",
					stop : function(event, ui){
						save_note(this.id.substr(4), 1);
					}
				});
				$("#"+note.id).resizable({
					minHeight: 100,
					minWidth: 150,
					maxHeight: 400,
					maxWidth: 300,
					alsoResize: "#edit"+id,
					stop: function(event, ui){
						save_note(this.id.substr(4), 1);
					}
				});
				note.style.position = "absolute";
				$("#time"+id).html(date);
			}
		}
	});
}
function open_note(id, text, time, x, y, height, width, zIndex){
	var note = create_note(id);
	var allnote = document.getElementById("notice");
	allnote.appendChild(note);
	var content = document.getElementById("content"+id);
	var edit = document.getElementById("edit"+id);
	$("#"+note.id).draggable({
		handle: ".header",
		containment : "parent",
		stack : ".note",
		stop : function(event, ui){
			save_note(this.id.substr(4));
		}
	});
	$("#"+note.id).resizable({
		minHeight: 100,
		minWidth: 150,
		maxHeight: 400,
		maxWidth: 300,
		alsoResize: "#edit"+id+",#content"+id,
		stop: function(event, ui){
			save_note(this.id.substr(4));
		}
	});
	note.style.position = "absolute";
	note.style.left = x+"px";
	note.style.top = y+"px";
	note.style.height = height+"px";
	note.style.width = width+"px";
	note.style.zIndex = zIndex+"px";
	//content.style.height = (height-46)+"px";
	edit.style.height = (height-46)+"px";
	$("#content"+id).html(text);
	$("#time"+id).html(time);
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
function save_note(e ,d){
	var note = document.getElementById("note"+e);
	var text = $("#content"+e).html();
	var style = GetCssStyle(note);
	var x = style.left.toString();
	x = x.substr(0, x.length-2);
	var y = style.top.toString();
	y = y.substr(0, y.length-2);
	var height = style.height.toString();
	height = height.substr(0, height.length-2);
	var width = style.width.toString();
	width = width.substr(0, width.length-2);
	var zIndex = style.zIndex.toString();
	var str = "text="+text+"&&x="+x+"&&y="+y+"&&height="+height+"&&width="+width+"&&zIndex="+zIndex+"&&id="+e+"&&k="+d;
	$.ajax({
		type : "POST",
		data : str,
		dataType : "text",
		url : "php/save_node.php",
		success: function(data){
			if(d == 0) $("#time"+e).html(data);
		}
	});
}
function click_note(e){
	var x = document.getElementById("note"+e);
	x.style.zIndex = 1+get_max_zIndex();
	save_note(e, 1);
}
function get_max_zIndex(){
	var allnote = document.getElementById("notice");
	var notice = allnote.getElementsByClassName('note');
	var mx = 0;
	for(var i=0; i<notice.length; i++) mx = Math.max(mx, notice[i].style.zIndex);
	return mx;
}

var validregistration = function(){
	var a = document.getElementById("sign_mail_form");
	a.classList.remove("has-error");
	log_but_click();
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
function vis_true(e){
	var a = document.getElementById("del"+e);
	a.style.visibility = "visible";
	a = document.getElementById("save"+e);
	a.style.visibility = "visible";
}
function vis_false(e){
	var a = document.getElementById("del"+e);
	a.style.visibility = "hidden";
	a = document.getElementById("save"+e);
	a.style.visibility = "hidden";
}
