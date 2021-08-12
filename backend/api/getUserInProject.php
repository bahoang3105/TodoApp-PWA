<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Project_User.php';

$database = new Database();
$db = $database->getConnection();

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// check if this user is in the project or not
$proj_user = new Project_User($db);
$proj_user->userID = $_COOKIE['userID'];
$proj_user->projectID = $input['projectID'];

$stmt = $proj_user->getProjectName();

$check = false;
$lst = $stmt->fetchAll();

for($x = 0; $x < $stmt->rowCount(); $x++) {
    if($proj_user->projectID == $lst[$x][0]) {
        $check = true;
        break;
    }
}

if(!$check) {
    $data = json_encode(
        array("success" => false)
    );
    echo $data;
}
else {
    $stmt = $proj_user->getUserInProject();

    $data = json_encode(
        array("success" => true, "array" => $stmt->fetchAll(), "length" => $stmt->rowCount())
    );
    echo $data;
}

?>

