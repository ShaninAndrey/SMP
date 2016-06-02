<?php
    include 'db_connect.php';
	session_start();
	$query_insert = "INSERT INTO `notice`.`note` (`id`, `autor`, `text`, `time`, `x`, `y`, `height`, `width`, `zIndex`) VALUES (
			'0','".$_SESSION['user_mail']."','',NOW(),'0','0','136','190','".$_POST['zIndex']."');";
	mysql_query($query_insert);
	$res_query = "SELECT `id`, `time` FROM `note` WHERE `autor` = '".$_SESSION['user_mail']."' AND `zIndex` = '".$_POST['zIndex']."'";
	$g = mysql_query($res_query);
	while($row = mysql_fetch_array($g)){
		echo $row['id']."razdelitel";
		echo $row['time']."razdelitel";
	}