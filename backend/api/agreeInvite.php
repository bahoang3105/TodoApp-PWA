<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Notification.php';
include_once '../models/Project_User.php';

$database = new Database();
$db = $database->getConnection();

$noti = new Notification($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$noti->recvName = $_COOKIE['userID'];
$noti->notificationID = $input['notificationID'];
$stmt = $noti->agreeInvite();

$proj_user = new Project_User($db);

$proj_user->projectID = $stmt;

$stmt = $proj_user->getUserInProject();

$num = $stmt->rowCount();
$array = $stmt->fetchAll();

$time = time();

$noti->projectName = $proj_user->projectID;
$noti->sendName = $_COOKIE['userID'];
$noti->action = 1;
for($i = 0; $i < $num-1; $i++) {
    if($array[$i][0] == $noti->sendName) continue;
    $noti->recvName = $array[$i][0];
    $noti->notificationID = (int)(strval($time) + strval($i));
    $noti->createNoti1();
}

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true, "projectID" => $noti->projectName)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error orcured while agreeing to join project", "success" => false)
    );
}
echo $message;
?>
