<?php
    include 'db_connect.php';
	session_start();
	$query_delete = "DELETE FROM `notice`.`".$_SESSION['user_mail']."` WHERE `id` = ".$_POST['id'];
	mysql_query($query_delete);
	echo $_POST['id'];