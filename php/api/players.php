<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$path = __DIR__ . '/../data/players.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($path)) {
        file_put_contents($path, json_encode(new stdClass(), JSON_PRETTY_PRINT));
    }
    header('Content-Type: application/json');
    echo file_get_contents($path);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(405);
header('Allow: GET, POST');
echo json_encode(['error' => 'Method Not Allowed']);
