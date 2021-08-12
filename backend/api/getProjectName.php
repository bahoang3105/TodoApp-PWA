<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project_User.php';

$database = new Database();
$db = $database->getConnection();

// get Project Name in project table
$proj_user = new Project_User($db);
$proj_user->userID = $_COOKIE['userID'];

$stmt = $proj_user->getProjectName();

$data = json_encode(
    array("array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
);
echo $data;
?>

