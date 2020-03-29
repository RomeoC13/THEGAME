import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

class PictionaryClient {

    updateUsers(op,room) {
        socket.on('update-names', function (data) {
            op(data[room])
        });
    }

    emitUser(user,room) {
        socket.emit('join', {user : user, room : room})
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room})
    }

    print(msg) {
        socket.emit('print', msg);
    }

}


export {PictionaryClient}