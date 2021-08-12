<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Task.php';

//ket noi den database
$database = new Database();
$db = $database->getConnection();

// tao doi tuong
$task = new Task($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

//gan thuoc tinh tu du lieu json duoc gui den
$task->user_id = $_COOKIE['userID'];
$task->deadline = $input['deadline'];
$task->content = $input['content'];
$task->task_id = $input['taskID'];

//su dung phuong thuc
$stmt = $task->insertTask();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true, "userID" => $task->user_id)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error orcured while adding task", "success" => false)
    );
}
echo $message;
?>
