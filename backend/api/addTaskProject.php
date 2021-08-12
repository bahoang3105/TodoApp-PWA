<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$task->user_id = $_COOKIE['userID'];
$task->deadline = $input['deadline'];
$task->content = $input['content'];
$task->project_id = $input['projectID'];

$stmt = $task->insertTaskProject();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error orcured while adding task in this project", "success" => false)
    );
}
echo $message;
?>
