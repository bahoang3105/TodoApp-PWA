<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Task.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$task = new Task($db);
$task->content = $input['subName'];
$task->userID = $_COOKIE['userID'];

$stmt = $task->searchTask();

$data = json_encode(
    array("array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
);
echo $data;
?>
