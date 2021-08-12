<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Notification.php';

$database = new Database();
$db = $database->getConnection();

$noti = new Notification($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$noti->sendName = $_COOKIE['userID'];
$noti->recvName = $input['recv'];
$noti->projectName = $input['projectID'];
$noti->action = $input['action'];
$noti->notificationID = time();

$stmt = $noti->createNoti();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error occurred while inviting", "success" => false)
    );
}
echo $message;
?>
