import openSocket from 'socket.io-client';

const socket = openSocket();

class ChatClient {

    constructor(username) {
        socket.emit('set-name', username)
    }

    onMessages(cb, room) {
        socket.on('add-messages', function (data) {
            data.forEach((message)=> {
                if (message.room === room) {
                    cb(message)
                }
            })
        })
    }

    sendMessage(message, room) {
        socket.emit('post-message', {text: message, room: room})
    }
}

export {ChatClient}
