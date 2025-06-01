<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../includes/WebSocketNotifier.php';

$mapgroupPath = __DIR__ . '/../data/mapgroups.json';

// GET – fetch current map groups
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($mapgroupPath)) {
        file_put_contents($mapgroupPath, json_encode(new stdClass(), JSON_PRETTY_PRINT));
    }

    header('Content-Type: application/json');
    echo file_get_contents($mapgroupPath);
    exit;
}

// POST – save updated map groups (with name + workshopId)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    // Validate structure
    foreach ($data as $group => $maps) {
        if (!is_array($maps)) {
            http_response_code(400);
            echo json_encode(['error' => "Invalid map array for group '$group'"]);
            exit;
        }

        foreach ($maps as $map) {
            if (!isset($map['name']) || !isset($map['workshopId'])) {
                http_response_code(400);
                echo json_encode(['error' => "Each map must have 'name' and 'workshopId'"]);
                exit;
            }
        }
    }

    file_put_contents($mapgroupPath, json_encode($data, JSON_PRETTY_PRINT));

    // 🟢 Notify plugin
    $notifier = new WebSocketNotifier();
    $notifier->send([
        'event' => 'mapgroups_updated',
        'timestamp' => time()
    ]);

    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(405);
header('Allow: GET, POST');
echo json_encode(['error' => 'Method Not Allowed']);
