<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

$first_name = isset($data['first_name']) ? trim($data['first_name']) : '';
$last_name  = isset($data['last_name'])  ? trim($data['last_name'])  : '';
$email      = isset($data['email'])      ? trim($data['email'])      : '';

// --- Validation ---
if ($first_name === '' || $last_name === '' || $email === '') {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

if (mb_strlen($first_name) > 50 || mb_strlen($last_name) > 50) {
    echo json_encode(['success' => false, 'message' => 'Name is too long']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 100) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit();
}

try {
    // Make sure no OTHER account is already using this email
    $stmt = $connection->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt->bind_param("si", $email, $user_id);
    $stmt->execute();
    $taken = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($taken) {
        echo json_encode(['success' => false, 'message' => 'That email is already in use by another account']);
        exit();
    }

    $stmt = $connection->prepare(
        "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?"
    );
    $stmt->bind_param("sssi", $first_name, $last_name, $email, $user_id);
    $stmt->execute();
    $stmt->close();

    // Keep the session in sync too
    $_SESSION['first_name'] = $first_name;

    echo json_encode([
        'success' => true,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>