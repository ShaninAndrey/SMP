<?php
    include 'db_connect.php';
	session_start();
	$query_insert = "INSERT INTO `notice`.`".$_SESSION['user_mail']."` (`id`, `text`, `time`, `x`, `y`) VALUES ('".$_POST['id']."','',NOW(),'".$_POST['x']."','".$_POST['y']."');";
	mysql_query($query_insert);
	$res = mysql_fetch_array(mysql_query("SELECT time FROM `".$_SESSION['user_mail']."` WHERE `id` = ".$_POST['id']));
	echo $res[0];
	