var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { wsEngine: 'ws' });

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('msg', (msg) => {
        io.emit('msg', msg);
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
})