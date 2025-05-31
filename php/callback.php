<?php
declare(strict_types=1);
require_once('SteamOpenID.php');

use xPaw\Steam\SteamOpenID;

session_start();

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
