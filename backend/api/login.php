<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$user = new User($db);

$user->username = $input['username'];
$user->password = $input['password'];

$stmt = $user->login();
$array = $stmt->fetchAll();
$userCount = $stmt->rowCount();

if ($userCount > 0) {
    setcookie("userID", $array[0][0], time()+ 60*60*24*30, "http://localhost/todo");
    setcookie("username", $array[0][1], time()+ 60*60*24*30, "http://localhost/todo");
    http_response_code(200);
    $message = json_encode(
        array("success" => true, "array" => $array)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "Incorrect username or password", "success" => false)
    );
}
echo $message;
?>
