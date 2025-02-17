<?php

function conectar(){
	
	try {
		$opcoes = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		// $pdo = new PDO("mysql:host=localhost;dbname=react-crud;", "root", "root", $opcoes);
		$pdo = new PDO("mysql:host=localhost;dbname=custojoin_react-crud;", "custojoi_admin", "Admin@2022", $opcoes);
	} catch (Exception $e) {
		echo $e->getMessage();
	}

	return $pdo;

}

?>