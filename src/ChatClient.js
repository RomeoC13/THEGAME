import openSocket from 'socket.io-client';

const socket = openSocket();

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

export {ChatClient}
