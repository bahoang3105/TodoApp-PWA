<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");
if(!isset($_COOKIE['userID'])) {
    $message = json_encode(
        array("check" => false)
    );
}
else {
    $message = json_encode(
        array("check" => true)
    );
}
echo $message;
?>