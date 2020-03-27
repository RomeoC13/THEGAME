import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

class PictionaryClient {

    updateUsers(op) {
        socket.on('update-names', function (data) {
            op(data)
        });
    }

    emitUser(user) {
        socket.emit('join', user)
    }

    userLeave(user) {
        socket.emit('leave', user)
    }

    print(msg) {
        socket.emit('print', msg);
    }

}


export {PictionaryClient}