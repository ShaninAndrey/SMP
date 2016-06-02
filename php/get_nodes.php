<?php
    include 'db_connect.php';
	session_start();
	
	$query = "SELECT * FROM `note` WHERE `autor`='".$_SESSION['user_mail']."'";
	$g = mysql_query($query);
	while($row = mysql_fetch_array($g)){
		echo $row['id']."razdelitel";
		echo $row['text']."razdelitel";
		echo $row['time']."razdelitel";
		echo $row['x']."razdelitel";
		echo $row['y']."razdelitel";
		echo $row['height']."razdelitel";
		echo $row['width']."razdelitel";
		echo $row['zIndex']."razdelitel";
	}