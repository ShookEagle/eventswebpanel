<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../includes/WebSocketNotifier.php';

$packsPath = __DIR__ . '/../data/commandpacks.json';

// GET – fetch current command packs
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($packsPath)) {
        file_put_contents($packsPath, json_encode(new stdClass(), JSON_PRETTY_PRINT));
    }

    header('Content-Type: application/json');
    echo file_get_contents($packsPath);
    exit;
}

// POST – save or update one command pack
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $packs = [];

    foreach ($data as $name => $pack) {
        if (!is_array($pack)) continue;

        $description = $pack['description'] ?? '';
        $onCmds = is_array($pack['onExecCmds']) ? $pack['onExecCmds'] : [];
        $offCmds = is_array($pack['offExecCmds']) ? $pack['offExecCmds'] : [];

        $packs[$name] = [
            'description' => $description,
            'onExecCmds' => $onCmds,
            'offExecCmds' => $offCmds
        ];
    }

    file_put_contents($packsPath, json_encode($packs, JSON_PRETTY_PRINT));

    if (!is_string($name) || !$pack || !is_array($pack)) {
        http_response_code(400);
        echo json_encode(['error' => 'Malformed command pack format']);
        exit;
    }

    // Required fields: description + at least one of onExecCmds/offExecCmds
    if (!isset($pack['description']) || (!isset($pack['onExecCmds']) && !isset($pack['offExecCmds']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: description and at least one exec array']);
        exit;
    }

    // Normalize command arrays
    $onCmds = isset($pack['onExecCmds']) && is_array($pack['onExecCmds']) ? $pack['onExecCmds'] : [];
    $offCmds = isset($pack['offExecCmds']) && is_array($pack['offExecCmds']) ? $pack['offExecCmds'] : [];

    $packs = file_exists($packsPath)
        ? json_decode(file_get_contents($packsPath), true)
        : [];

    $packs[$name] = [
        'description' => $pack['description'],
        'onExecCmds' => $onCmds,
        'offExecCmds' => $offCmds
    ];

    file_put_contents($packsPath, json_encode($packs, JSON_PRETTY_PRINT));

    // 🟢 Notify plugin
    $notifier = new WebSocketNotifier();
    $notifier->send([
        'event' => 'commandpacks_updated',
        'timestamp' => time()
    ]);

    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(405);
header('Allow: GET, POST');
echo json_encode(['error' => 'Method Not Allowed']);
