import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

class PictionaryClient {

    listenNames(op) {
        socket.on('update-names', function (data) {
            op(data)
        });
    }
}

export {PictionaryClient}
