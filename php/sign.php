<?php
    include 'db_connect.php';
	$query_valid = "SELECT `e-mail` FROM `users` WHERE `e-mail` = '".$_POST['sign_mail']."'";
	$query_insert = "INSERT INTO `notice`.`users` (`name`, `password`, `e-mail`, `id`) VALUES ('".$_POST['sign_nick']."','".$_POST['sign_pass']."','".$_POST['sign_mail']."','0');";
	$query_notice = "create table `".$_POST['sign_mail']."` (id INT AUTO_INCREMENT, text TEXT NOT NULL, time DATE NOT NULL, x INT NOT NULL, y INT NOT NULL, PRIMARY KEY(id));";
	$result = mysql_query($query_valid);
	$res = mysql_fetch_array($result);
	if(strlen($res[0]) == 0) {mysql_query($query_insert); mysql_query($query_notice); echo 0; } else echo 1;