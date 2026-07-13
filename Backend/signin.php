<?php
session_start();
header('Content-Type: application/json');

require 'dbc.php';

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

$email = mysqli_real_escape_string($connection, trim($data['email']));
$password = $data['password'];

$query = "SELECT id, first_name, password_hash, star_shells FROM users WHERE email = '$email'";
$result = mysqli_query($connection, $query);

if ($result && mysqli_num_rows($result) > 0) {
    // User found! Check if the password matches the hash
    $user = mysqli_fetch_assoc($result);
    
    if (password_verify($password, $user['password_hash'])) {
        // Password is correct. Log them in!
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['first_name'] = $user['first_name'];
        
        echo json_encode([
            'success' => true, 
            'user' => [
                'first_name' => $user['first_name'],
                'star_shells' => $user['star_shells']
            ]
        ]);
    } else {
        // Wrong password
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    // Email not found in the database
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}
?>