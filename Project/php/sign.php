<?php
    include 'db_connect.php';
	$query_valid = "SELECT `e-mail` FROM `users` WHERE `e-mail` = '".$_POST['sign_mail']."'";
	$query_insert = "INSERT INTO `notice`.`users` (`name`, `password`, `e-mail`, `id`) VALUES ('".$_POST['sign_nick']."','".$_POST['sign_pass']."','".$_POST['sign_mail']."','0');";
	$result = mysql_query($query_valid);
	$res = mysql_fetch_array($result);
	if(strlen($res[0]) == 0) {mysql_query($query_insert); echo 0; } else echo 1;