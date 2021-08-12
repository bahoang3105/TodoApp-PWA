<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project.php';

$database = new Database();
$db = $database->getConnection();

$proj = new Project($db);

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$proj->projectID = $input['projectID'];

$stmt = $proj->completeProj();

if ($stmt) {
    http_response_code(200);
    $message = json_encode(
        array("success" => true)
    );
} else {
    http_response_code(404);
    $message = json_encode(
        array("message" => "An error occurred while marking the project as completing", "success" => false)
    );
}
echo $message;
?>
