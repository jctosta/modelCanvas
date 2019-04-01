import openSocket from 'socket.io-client';

let socket: SocketIOClient.Socket;

function joinRoom(roomName: string) {
    socket = openSocket('http://localhost:8000');
    socket.on('connect', function() {
        console.log('connected to server');
        socket.emit('room', roomName);
    })
}

function subscribeToDocumentUpdate(cb: Function) {
    socket.on('document updated', (doc: any) => cb(null, doc));
}

function sendDocumentUpdate(doc: any) {
    socket.emit('document update', doc);
}

export { joinRoom, subscribeToDocumentUpdate, sendDocumentUpdate };