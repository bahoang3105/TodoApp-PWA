<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project_User.php';
include_once '../models/Notification.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$proj_user = new Project_User($db);
$proj_user->userID = $_COOKIE['userID'];
$proj_user->projectID = $input['projectID'];

$stmt = $proj_user->leaveProject();
$stmt = $proj_user->getUserInProject();

$num = $stmt->rowCount();
$array = $stmt->fetchAll();

$time = time();

$noti = new Notification($db);
$noti->projectName = $proj_user->projectID;
$noti->sendName = $_COOKIE['userID'];
$noti->action = 3;
for($i = 0; $i < $num; $i++) {
    $noti->recvName = $array[$i][0];
    $noti->notificationID = (int)(strval($time) + strval($i));
    $noti->createNoti1();
}

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error orcured while leaving project", "success" => false)
    );
}
echo $message;
?>

