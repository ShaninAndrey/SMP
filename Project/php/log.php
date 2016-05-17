<?php
    include 'db_connect.php';
	$query = "SELECT `name` FROM `users` WHERE `e-mail` = '".$_POST['log_mail']."' AND `password` = '".$_POST['log_pass']."'";
	$res = mysql_fetch_array(mysql_query($query));
	if(strlen($res[0]) > 0){
		session_start();
		$_SESSION['checked'] = true;
		$_SESSION['user_mail'] = $_POST['log_mail'];
		echo $res[0];
	} else echo "";