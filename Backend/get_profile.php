<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'not_logged_in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];

// 1. Basic user data
$query = "SELECT first_name, last_name, email, star_shells, daily_streak, equipped_skin FROM users WHERE id = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user_result = $stmt->get_result()->fetch_assoc();
$stmt->close();

// 2. Inventory, including item_type so the frontend never has to guess
//    which owned items are skins vs themes vs prints.
$inv_query = "SELECT s.item_name, s.item_type FROM user_inventory ui
              JOIN shop_items s ON ui.item_id = s.id
              WHERE ui.user_id = ?";
$inv_stmt = $connection->prepare($inv_query);
$inv_stmt->bind_param("i", $user_id);
$inv_stmt->execute();
$inv_result = $inv_stmt->get_result();

$inventory = [];      // flat list of item_names, kept for backward compatibility
$inventory_details = []; // [{item_name, item_type}, ...]
while ($row = $inv_result->fetch_assoc()) {
    $inventory[] = $row['item_name'];
    $inventory_details[] = $row;
}
$inv_stmt->close();

$user_result['inventory'] = $inventory;
$user_result['inventory_details'] = $inventory_details;

// 3. Total XP and Level
$xp_query = "SELECT SUM(score) as total_xp FROM user_progress WHERE user_id = ?";
$xp_stmt = $connection->prepare($xp_query);
$xp_stmt->bind_param("i", $user_id);
$xp_stmt->execute();
$xp_result = $xp_stmt->get_result()->fetch_assoc();
$xp_stmt->close();

$total_xp = $xp_result['total_xp'] ? $xp_result['total_xp'] : 0;
$level = floor($total_xp / 100) + 1;

$user_result['total_xp'] = $total_xp;
$user_result['level'] = $level;

echo json_encode(['success' => true, 'data' => $user_result]);
?>