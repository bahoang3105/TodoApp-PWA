<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");
setcookie("userID", "", time()- 60*60);

http_response_code(200);
$message = json_encode(
    array("success" => true)
);
echo $message;
?>