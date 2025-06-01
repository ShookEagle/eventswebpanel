<?php

class WebSocketNotifier {
    private string $host;
    private int $port;

    public function __construct(string $host = 'localhost', int $port = 8888) {
        $this->host = $host;
        $this->port = $port;
    }

    public function send(array $message): bool {
        $sock = stream_socket_client("tcp://{$this->host}:{$this->port}", $errno, $errstr, 2);
        if (!$sock) return false;

        $payload = json_encode($message);
        fwrite($sock, $payload);
        fclose($sock);
        return true;
    }
}