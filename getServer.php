<?php
	if($_POST){
		if($_POST['req'] == md5('SERVEUR')){
			echo json_encode(array('server' => $_SERVER['HTTP_HOST']));
		} 
	} 
?>