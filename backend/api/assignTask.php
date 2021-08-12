<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/User.php';
include_once '../models/Notification.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$user->username = $input['assignee'];
$user->other = $input['taskID'];

$stmt = $user->assignUser();

$noti = new Notification($db);

$noti->taskID = $input['taskID'];
$noti->sendName = $_COOKIE['userID'];
$noti->recvName = $input['assignee'];
$noti->projectName = $input['projectName'];
$noti->action = 4;

$stmt = $noti->createAssignNoti();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error occurred while assigning tasks", "success" => false)
    );
}
echo $message;
?>
