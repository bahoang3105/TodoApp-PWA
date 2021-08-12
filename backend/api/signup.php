<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$username =  $input['username'];
$password =  $input['password'];

$user->username = $username;
$user->password = $password;

$stmt = $user->signup();
$userCount = $stmt->rowCount();

if ($userCount == 0) {
    $userArray = array();
    $user->addAcc();
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "Account already exists", "success" => false)
    );
}
echo $message;
?>
