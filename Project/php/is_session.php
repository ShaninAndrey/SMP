<?php
    include 'db_connect.php';
	session_start();
	
	if($_SESSION["checked"]){
		echo $_SESSION["user_mail"];
	}