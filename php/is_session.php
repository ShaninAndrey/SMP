<?php
    include 'db_connect.php';
	session_start();
	
	if($_SESSION["checked"]){
		$query = "SELECT `name` FROM `users` WHERE `e-mail` = '".$_SESSION['user_mail']."'";
		$res = mysql_fetch_array( mysql_query($query));
		echo $res[0];
	}