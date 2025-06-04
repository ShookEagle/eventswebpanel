<?php
$path = __DIR__ . '/../data/logs.jsonl';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $lines = array_slice(file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES), -100);
    $logs = array_map('json_decode', $lines);
    echo json_encode(array_reverse($logs)); // newest first
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $entry = json_decode($raw, true);
    $entry['timestamp'] = time();
    file_put_contents($path, json_encode($entry) . "\n", FILE_APPEND);
    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method Not Allowed']);
