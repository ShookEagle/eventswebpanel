<?php
declare(strict_types=1);
require_once('SteamOpenID.php');

use xPaw\Steam\SteamOpenID;

session_start();
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow React dev server
header('Access-Control-Allow-Credentials: true'); // Allow cookies (PHPSESSID)
header('Content-Type: application/json');

$scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$path = '/callback.php';

$returnTo = "$scheme://$host$path";
$openid = new SteamOpenID($returnTo);

try {
    $steamId = $openid->Validate();

    $_SESSION['steamid'] = $steamId;
    $_SESSION['username'] = 'Fetching...'; // Optional: fetch from Web API later
    $_SESSION['avatar'] = '';
    $_SESSION['roles'] = [];

    header("Location: http://localhost:5173"); // back to React
    exit;
} catch (Exception $e) {
    echo "Login failed: " . $e->getMessage();
}
