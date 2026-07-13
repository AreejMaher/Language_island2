<?php
session_start();

header('Content-Type: application/json');

require 'dbc.php'; 

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

$firstName = mysqli_real_escape_string($connection, trim($data['first_name']));
$lastName = mysqli_real_escape_string($connection, trim($data['last_name']));
$email = mysqli_real_escape_string($connection, trim($data['email']));
$dob = mysqli_real_escape_string($connection, $data['dob']);
$gender = mysqli_real_escape_string($connection, $data['gender']);

$passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

// Check if the email already exists
$checkQuery = "SELECT id FROM users WHERE email = '$email'";
$checkResult = mysqli_query($connection, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    // Email exists, send an error back
    echo json_encode(['success' => false, 'message' => 'A User with this email already exists!']);
    exit;
}

$insertQuery = "INSERT INTO users (first_name, last_name, email, password_hash, dob, gender) 
                VALUES ('$firstName', '$lastName', '$email', '$passwordHash', '$dob', '$gender')";

if (mysqli_query($connection, $insertQuery)) {
    $_SESSION['user_id'] = mysqli_insert_id($connection); //retrieve the id of the last row that was inserted
    $_SESSION['first_name'] = $firstName;
    
    echo json_encode(['success' => true, 'message' => 'Account created!']);
} else {
    // Database failed to insert
    echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($connection)]);
}
?>