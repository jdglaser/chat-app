import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:4000');
  console.log(`Connecting socket...`);
  if (socket) socket.emit('join');
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const sendMessage = (message) => {
  if (socket) socket.emit('msg', message);
}

export const subscribeToChat = (cb) => {
    if (!socket) return(true);
    socket.on('msg', msg => {
      console.log('Websocket event received!');
      return cb(null, msg);
    });
  }