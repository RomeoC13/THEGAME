import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

class TimerClient {

    constructor(seconds) {
        console.log('reset', seconds);
        socket.emit('reset', seconds)
    }

    listenTimer(cb) {
        socket.on('timer', function (data) {
            cb(data);
        })
    }

}

export {TimerClient}