<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project_User.php';
include_once '../models/Project.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// add new Project in project table
$proj = new Project($db);
$proj->projectID = $input['projectID'];;
$proj->projectName = $input['projectName'];

$stmt = $proj->addNewProject();

if($stmt) {
    // add this user to this project
    $proj_user = new Project_User($db);
    $proj_user->projectID = $proj->projectID;
    $proj_user->userID = $_COOKIE['userID'];
    $stmt = $proj_user->addUser();
    if($stmt) {
        $message = json_encode(
            array("success" => true)
        );
    }
    else {
        $message = json_encode(
            array("success" => false)
        );
    }
}
else {
    $message = json_encode(
        array("success" => false)
    );
}
echo $message;
?>

