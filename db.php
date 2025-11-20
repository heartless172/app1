<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$message = $data['message'] ?? '';

if ($message) {
    $conn = new mysqli("localhost", "root", "", "chatdb");
    if ($conn->connect_error) {
        die(json_encode(["status" => "error"]));
    }
    $stmt = $conn->prepare("INSERT INTO messages (msg) VALUES (?)");
    $stmt->bind_param("s", $message);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "no message"]);
}
?>
