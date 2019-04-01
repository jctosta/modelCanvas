import { Socket, Server } from "socket.io";

import * as express from 'express';
// import * as socketio from 'socket.io';
// import * as path from 'path';

const app = express();
// app.set('port', process.env.PORT || 3000);

const http = require('http').Server(app);

const io: Server = require('socket.io')(http);

function disconnectHandler() {
    console.log('User disconnected');
}

function documentUpdateHandler(doc: any) {
    io.emit('documente updated', doc);
}

function connectionHandler(socket: Socket) {
    console.log('User connected');
    let room = undefined;
    socket.on('room', function(roomName: string) {
        room = roomName;
        socket.join(room);
        console.log(`New user connected to room ${room}`);
        // io.sockets.in(room).emit(`New user connected to room ${room}`);
    });
    io.sockets.in(room).on('disconnect', () => { console.log(`User disconnected of ${room}`); } );
    io.sockets.in(room).on('document update', documentUpdateHandler);
    socket.broadcast.emit('hi');
    socket.on('disconnect', disconnectHandler);
    // socket.on('document update', documentUpdateHandler);
}

io.on('connection', connectionHandler);

const server = http.listen(8000, function() {
    console.log('Server running at *:8000');
});

// const server: Server = io.listen(8000);

// const io = require('socket.io')(http);

// app.get('/', function(req, res) {
//     // res.send('<h1>Hello World</h1>');
//     res.sendFile(__dirname + '/index.html');
// });

// app.get('/new', function(req, res) {
//     let namespace = io.of(`/${req.params.name}`);
//     let document = req.params.document;
//     namespace.on('connection', (socket: socketio.Socket) => {
//         socket.broadcast.emit('hi');
//         socket.on('disconnect', () => { console.log('User disconnected'); });
//         socket.on('document update', (doc) => {
//             let newDoc = Object.assign({}, document, doc);
//             namespace.emit('document updated', newDoc);
//         });
//     });
// });

// const nsp = io.of('/doc01');

// nsp.on('connection', function(socket: any) {
//     console.log('A user connected');
//     socket.broadcast.emit('hi');
//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });
//     socket.on('chat message', function(msg) {
//         console.log('message: ' + msg);
//         nsp.emit('chat message', msg);
//     });
// });
