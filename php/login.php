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
$path = '/callback.php'; // Adjust if needed

$returnTo = "$scheme://$host$path";
$openid = new SteamOpenID($returnTo);

// Redirect user to Steam login
$authUrl = $openid->GetAuthUrl();
header("Location: $authUrl");
exit;
