<?php
    include 'db_connect.php';
	$query = "SELECT `name` FROM `users` WHERE `e-mail` = '".$_POST['log_mail']."' AND `password` = '".$_POST['log_pass']."'";
	$query1 = "SELECT `name` FROM `users` WHERE `e-mail` = '".$_POST['log_mail']."'";
	$res = mysql_fetch_array(mysql_query($query));
	$res1 = mysql_fetch_array(mysql_query($query1));
	if(strlen($res[0]) > 0){
		session_start();
		$_SESSION['checked'] = true;
		$_SESSION['user_mail'] = $_POST['log_mail'];
		echo $res[0];
	} elseif(strlen($res1[0]) > 0) echo ""; else echo "email_is_invalid";