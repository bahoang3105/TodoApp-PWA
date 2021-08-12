<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

header("Content-Type: application/json; charset=UTF-8");

http_response_code(200);
$message = json_encode(
    array("userName" => $_COOKIE['username'])
);
echo $message;
?>