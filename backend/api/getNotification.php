<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Notification.php';

$database = new Database();
$db = $database->getConnection();

// get Notification of this user
$noti = new Notification($db);
$noti->recvName = $_COOKIE['userID'];

$stmt = $noti->getNotification();

$data = json_encode(
    array("array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
);
echo $data;
?>

