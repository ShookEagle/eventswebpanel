<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow React dev server
header('Access-Control-Allow-Credentials: true'); // Allow cookies (PHPSESSID)
header('Content-Type: application/json');

if (isset($_SESSION['steamid'])) {
    echo json_encode([
        'loggedIn' => true,
        'steamId' => $_SESSION['steamid'],
        'name' => $_SESSION['username'],
        'avatar' => $_SESSION['avatar'],
        'roles' => $_SESSION['roles']
    ]);
} else {
    http_response_code(401);
    echo json_encode(['loggedIn' => false]);
}
