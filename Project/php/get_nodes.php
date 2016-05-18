<?php
    include 'db_connect.php';
	session_start();
	
	$query = "SELECT * FROM `".$_SESSION['user_mail']."` WHERE 1";
	$g = mysql_query($query);
	while($row = mysql_fetch_array($g)){
		echo $row['text']."razdelitel";
		echo $row['time']."razdelitel";
		echo $row['x']."razdelitel";
		echo $row['y']."razdelitel";
	}