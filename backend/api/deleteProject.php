<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project_User.php';

$database = new Database();
$db = $database->getConnection();

$proj_user = new Project_User($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$proj_user->projectID = $input['projectID'];

$stmt = $proj_user->deleteProject();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error occurred while deleting the project", "success" => false)
    );
}
echo $message;
?>
