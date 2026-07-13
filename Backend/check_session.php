<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => true, 'logged_in' => false]);
    exit();
}

require 'dbc.php';
$user_id = (int) $_SESSION['user_id'];

$stmt = $connection->prepare("SELECT id, first_name, last_name, email FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user) {
    // Session points at a user_id that no longer exists (deleted account, etc).
    // Clean up the dangling session instead of leaving it around.
    $_SESSION = [];
    session_destroy();
    echo json_encode(['success' => true, 'logged_in' => false]);
    exit();
}

echo json_encode(['success' => true, 'logged_in' => true, 'user' => $user]);
?>