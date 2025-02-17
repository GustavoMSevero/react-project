<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Access-Control-Allow-Headers: *");

ini_set('display_errors', true);
error_reporting(E_ALL);

include_once("con.php");

$pdo = conectar();

$data = file_get_contents("php://input");
$data = json_decode($data);

@$option = $data->option;

if($data) {
    $option = $data->option;
} else {
    $option = $_GET['option'];
}

switch ($option) {
    case 'Salvar dados':

        $name = $data->name;
        $email = $data->email;
 
        $insertData=$pdo->prepare("INSERT INTO users (id, name, email) VALUES(?, ?, ?)");
        $insertData->bindValue(1, NULL);
        $insertData->bindValue(2, $name);
        $insertData->bindValue(3, $email);
        $insertData->execute();

        $status = 1;
        $msg = "Dado cadastrado com sucesso!";

        $return = array(
            'status'	=> $status,
            'msg'	=> $msg
        );

        echo json_encode($return);

        break;

    case 'get users':
    
        $getUsers=$pdo->prepare("SELECT * FROM users");
        $getUsers->execute();

        while ($linha=$getUsers->fetch(PDO::FETCH_ASSOC)) {

            $id = $linha['id'];
            $name = $linha['name'];
            $email = $linha['email'];

            $return[] = array(
                'id'	=> $id,
                'name'	=> $name,
                'email'	=>  $email
            );

        }

        echo json_encode($return);

        break;

    case 'delete user':

        $id = $_GET['id'];
 
        $deleteUser=$pdo->prepare("DELETE FROM users WHERE id=:id");
        $deleteUser->bindValue(":id", $id);
        $deleteUser->execute();

        break;

    case 'get user':

        $id = $_GET['id'];
  
        $getUser=$pdo->prepare("SELECT * FROM users WHERE id=:id");
        $getUser->bindValue(":id", $id);
        $getUser->execute();

        while ($linha=$getUser->fetch(PDO::FETCH_ASSOC)) {

            $id = $linha['id'];
            $name = $linha['name'];
            $email = $linha['email'];

            $return = array(
                'id'	=> $id,
                'name'	=> $name,
                'email'	=>  $email
            );

        }

        echo json_encode($return);

        break;

    case 'update user':

        $id = $data->id;
        $name = $data->name;
        $email = $data->email;

        $updateUser=$pdo->prepare("UPDATE users SET name=:name, email=:email WHERE id=:id");
        $updateUser->bindValue(":name", $name);
        $updateUser->bindValue(":email", $email);
        $updateUser->bindValue(":id", $id);
        $updateUser->execute();

        break;
    
    default:
        # code...
        break;
}
?>