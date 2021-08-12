<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);
$task->user_id = $_COOKIE['userID'];

$stmt = $task->getTodayTask();
$data = json_encode(
    array("array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
);
echo $data;
?>
