let socket;

export function connectSocket(onMessage) {
    socket = new WebSocket('ws://localhost:8889'); // plugin must serve here

    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log('🔄 WS Message:', msg);
        onMessage(msg);
    };
}

export function sendSocketMessage(msg) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msg));
    }
}