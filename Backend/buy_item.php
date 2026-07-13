<?php
session_start();
require 'dbc.php'; // gives us $connection (mysqli)

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];

$data = json_decode(file_get_contents('php://input'), true);
$item_name = isset($data['item_name']) ? trim($data['item_name']) : null;

if (!$item_name) {
    echo json_encode(['success' => false, 'message' => 'No item specified']);
    exit();
}

// Everything happens inside one transaction so we never deduct shells
// without also granting the item (or vice versa).
mysqli_begin_transaction($connection);

try {
    // 1. Look up the item AND its real price from the database.
    //    We never trust a price sent from the browser.
    $stmt = $connection->prepare("SELECT id, price FROM shop_items WHERE item_name = ?");
    $stmt->bind_param("s", $item_name);
    $stmt->execute();
    $item = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$item) {
        throw new Exception("Item not found");
    }

    $item_id = $item['id'];
    $price = (int) $item['price'];

    // 2. Make sure the user doesn't already own it.
    $stmt = $connection->prepare("SELECT id FROM user_inventory WHERE user_id = ? AND item_id = ?");
    $stmt->bind_param("ii", $user_id, $item_id);
    $stmt->execute();
    $already_owned = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($already_owned) {
        throw new Exception("You already own this item");
    }

    // 3. Lock the user's row and check their real balance.
    $stmt = $connection->prepare("SELECT star_shells FROM users WHERE id = ? FOR UPDATE");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$user) {
        throw new Exception("User not found");
    }

    if ((int) $user['star_shells'] < $price) {
        throw new Exception("Insufficient star shells");
    }

    // 4. Deduct shells.
    $stmt = $connection->prepare("UPDATE users SET star_shells = star_shells - ? WHERE id = ?");
    $stmt->bind_param("ii", $price, $user_id);
    $stmt->execute();
    $stmt->close();

    // 5. Grant the item.
    $stmt = $connection->prepare("INSERT INTO user_inventory (user_id, item_id, is_equipped) VALUES (?, ?, 0)");
    $stmt->bind_param("ii", $user_id, $item_id);
    $stmt->execute();
    $stmt->close();

    mysqli_commit($connection);

    // Return the fresh balance so the frontend never has to guess/subtract itself.
    $stmt = $connection->prepare("SELECT star_shells FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $newBalance = $stmt->get_result()->fetch_assoc()['star_shells'];
    $stmt->close();

    echo json_encode([
        'success' => true,
        'item_name' => $item_name,
        'star_shells' => (int) $newBalance
    ]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>