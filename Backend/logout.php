<?php
session_start();
header('Content-Type: application/json');

// Wipe session data
$_SESSION = [];

// Remove the session cookie itself, if one is being used
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

session_destroy();

echo json_encode(['success' => true]);
?>