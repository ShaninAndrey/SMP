<?php
    include 'db_connect.php';
	session_start();
	$query_insert = "UPDATE `".$_SESSION['user_mail']."` SET `text`='".$_POST['text']."', `time`=NOW(), `x`=".$_POST['x'].", `y`=".$_POST['y']." WHERE `id`=".$_POST['id'];
	mysql_query($query_insert);
	echo $_POST['x'];
	