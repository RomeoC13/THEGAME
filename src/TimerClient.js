import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class TimerClient {

    constructor(seconds) {
        this.callReset(seconds)
    }

    listenTimer(cb) {
        socket.on('timer', function (data) {
            cb(data);
        })
    }

    callReset(seconds){
        console.log('reset',seconds);
        socket.emit('reset',seconds)
    }

}

export {TimerClient}