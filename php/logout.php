<?php
session_start();
header('Content-Type: application/json');

// Destroy all session data
$_SESSION = [];
session_unset();
session_destroy();

// Expire the PHPSESSID cookie
setcookie('PHPSESSID', '', time() - 3600, '/', '', false, true);

// Allow CORS for React dev server
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

echo json_encode(['loggedOut' => true]);
exit;