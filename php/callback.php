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

    // MAUL check
    /*$maulApiKey = getenv("APP_MAUL_APIKEY");
    $steamEncoded = strtr(base64_encode($steamId), '+/', '-_');
    $url = "https://maul.edgegamers.com/api/info/{$steamEncoded}";

    $context = stream_context_create([
        "http" => [
            "header" => [
                "AUTHORIZATION: $maulApiKey",
                "REQUEST_IP: " . ($_SERVER['SERVER_ADDR'] ?? '127.0.0.1'),
                "REQUEST_PORT: " . ($_SERVER['SERVER_PORT'] ?? '80')
            ]
        ]
    ]);

    $response = file_get_contents($url, false, $context);
    $maulData = json_decode($response, true);*/

    // Basic defaults
    $_SESSION['username'] = $maulData['Name'] ?? 'Unknown';
    $_SESSION['avatar'] = ''; // optional
    $_SESSION['roles'] = [];

    /*$rank = $maulData['PrimaryRank'] ?? 0;
    $groups = $maulData['Groups'] ?? [];

    $hasEventGroup = false;
    foreach ($groups as $group) {
        if (isset($group['GroupName']) && stripos($group['GroupName'], 'event coordinator') !== false) {
            $hasEventGroup = true;
            break;
        }
    }

    $isManagerPlus = $rank >= 5;

    $_SESSION['roles'] = [
        'manager' => $isManagerPlus,
        'event_coordinator' => $hasEventGroup
    ];*/

    header("Location: http://localhost:5173"); // send user back to UI
    exit;

} catch (Exception $e) {
    echo "Login failed: " . $e->getMessage();
}
