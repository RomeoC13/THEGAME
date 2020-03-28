import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class TimerClient {

    constructor(seconds,room) {
        this.callReset(seconds,room)
    }

    listenTimer(cb,room) {
        socket.on('timer', function (data) {
            if(data.room === room){
                cb(data)
            }
        })
    }

    callReset(seconds,room){
        /*console.log('reset',{value :seconds,room : room});*/
        socket.emit('reset',{value :seconds,room : room})
    }

}

export {TimerClient}