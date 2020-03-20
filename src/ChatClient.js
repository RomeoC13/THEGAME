import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:3000');

class ChatClient {

  constructor(username) {
    socket.emit('set-name', username)
  }

  onMessages(cb) {
    socket.on('add-messages', (messages) => cb(messages))
  }

  sendMessage(message) {
    socket.emit('post-message', message)
  }
}

export { ChatClient }
