<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$user = new User($db);
$user->username = $input['subName'];
$user->other = $input['projectID'];

$stmt = $user->searchUser();

$data = json_encode(
    array("array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
);
echo $data;
?>
