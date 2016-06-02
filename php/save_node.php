<?php
    include 'db_connect.php';
	session_start();
	if($_POST['k']==0)$query_insert = "UPDATE `note` SET `text`='".$_POST['text']."', `time`=NOW(), `x`=".$_POST['x'].", `y`=".$_POST['y'].", `height`=".$_POST['height'].", `width`=".$_POST['width'].", `zIndex`=".$_POST['zIndex']." WHERE `id`=".$_POST['id']; else
		$query_insert = "UPDATE `note` SET `x`=".$_POST['x'].", `y`=".$_POST['y'].", `height`=".$_POST['height'].", `width`=".$_POST['width'].", `zIndex`=".$_POST['zIndex']." WHERE `id`=".$_POST['id'];
	mysql_query($query_insert);
	$res = mysql_fetch_array(mysql_query("SELECT `time` FROM `note` WHERE `id` = ".$_POST['id']));
	echo $res[0];