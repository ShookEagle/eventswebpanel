<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
class MAUL {

    private string $apiBaseUrl = "https://maul.edgegamers.com/api/info/";
    private string $apiKey;
    private string $apiRequestIP;
    private string $apiRequestPort;
    private array $apiRequestOptions;

    public function __construct() {
        $this->apiKey = getenv("APP_MAUL_APIKEY");
        $this->apiRequestIP = $_SERVER['SERVER_ADDR'] ?? '127.0.0.1';
        $this->apiRequestPort = $_SERVER['SERVER_PORT'] ?? '80';
        $this->apiRequestOptions = [
            "http" => [
                "header" => [
                    "AUTHORIZATION: " . $this->apiKey,
                    "REQUEST_IP: " . $this->apiRequestIP,
                    "REQUEST_PORT: " . $this->apiRequestPort
                ]
            ]
        ];
    }

    public function getUserInfo(string $steamId): ?array {
        $context = stream_context_create($this->apiRequestOptions);
        $encoded = strtr(base64_encode($steamId), '+/', '-_'); // match C# format

        $url = $this->apiBaseUrl . $encoded;
        $response = file_get_contents($url, false, $context);

        if ($response === false) return null;

        $data = json_decode($response, true);
        return $data ?? null;
    }

    public function hasEventsAccess(string $steamId): bool {
        $data = $this->getUserInfo($steamId);
        if (!$data) return false;

        // Check PrimaryRank ≥ Manager (assume enum matches C# int value)
        $rank = $data['PrimaryRank'] ?? 0;
        $isHighRank = $rank >= 5; // Adjust if Manager is a different value

        // Check if user has a group with name "Event Coordinator"
        $hasEventGroup = false;
        if (!empty($data['Groups'])) {
            foreach ($data['Groups'] as $group) {
                if (
                    isset($group['GroupName']) &&
                    stripos($group['GroupName'], 'event coordinator') !== false
                ) {
                    $hasEventGroup = true;
                    break;
                }
            }
        }

        return $isHighRank || $hasEventGroup;
    }
}