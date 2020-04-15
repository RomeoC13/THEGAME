import openSocket from 'socket.io-client';

const socket = openSocket();

class AppClient {
    updatePlayerCount(op) {
        socket.on('update-playercount', (data) => op(data))
    }

    askUpdateCount() {
        socket.emit('ask-update-playercount');
    }

    askUpdateRooms() {
        socket.emit('ask-update-roomlist');
    }

    updateRooms(op) {
        socket.on('update-roomlist', (data) => op(data))
    }

}

class PictionaryClient {

    updateUsers(op,room) {
        socket.on('update-names', function (data) {
            op(data[room])
        });
    }

    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Pictionary"})
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Pictionary"})
    }

    print(msg) {
        socket.emit('print', msg);
    }

}

class ChatClient {

    constructor(username) {
        socket.emit('set-name', username)
    }

    onMessages(cb, room) {
        socket.on('add-messages', function (data) {
            data.forEach((message)=> {
                if (message.room === room || message.room ==="all") {
                    cb(message)
                }
            })
        })
    }

    sendMessage(message, room) {
        socket.emit('post-message', {text: message, room: room})
    }
}

class TimerClient {

    listenTimer(cb,room) {
        socket.on('timer', function (data) {
            if(data.room === room){
                cb(data)
            }
        })
    }

    callReset(seconds,room){
        socket.emit('reset',{value :seconds,room : room})
    }

}

class GameClient {

    startGame(room){
        socket.emit("start-game",room)
    }

    startPetitBac(room){
        socket.emit("start-game-pb",room)
    }

    listenPetitBacLetter(op,room){
        socket.on('start-PetitBac',function (data) {
            if(data.room === room){
                op(data);
            }
        })
    }

    listenFirstRound(op,room){
        socket.on('first-round',function (data) {
            if(data.room === room){
                op(data);
            }
        })
    }

    listenRound(op,room){
        socket.on('round-game',function (data) {
            if(data.room=== room)
                op(data);
        })
    }

    asWin(player,drawer,room){
        socket.emit("win",{player : player,drawer: drawer,room: room})
    }

    loose(drawer,room){
        socket.emit("loose",{drawer : drawer,room: room})
    }

    stopGame(playerWhoLeft,room){
        socket.emit("end-game",{player : playerWhoLeft, room: room});
    }

    listenEndGame(op,room){
        socket.on("game-stopped",function (data) {
            if(data.room===room){
                op(data.player);
            }
        })
    }
}

class PetitBacClient{
    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Petit Bac"})
    }

    updateUsers(op,room) {
        socket.on('update-names', function (data) {
            op(data[room])
        });
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Petit Bac"})
    }

    syncForm(op,room){
        socket.on('sync-form',function(data){
            console.log("SYNC-FORM")
            console.log(data);
            op(data[room])
        })
    }

    emitForm(Names, Job, City, Country, Animal, Objects, Movie, Food, Song ,room){
        socket.emit('update-form',{Names : Names,Job: Job, Country: Country,
            Animal: Animal, Objects: Objects, Movie: Movie, Food: Food, Song: Song, room :room})
    }


}

class DemineurClient {
    emitUser(user,room){
        socket.emit('join',{user:user,room:room,type:"Demineur"})
    }


    updateUsers(op,room) {
        socket.on('update-names', function (data) {
            op(data[room])
        });
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type:"Demineur"})
    }

    syncGrid(op,room){
        socket.on('sync-grid',function(data){
            console.log("SYNC-GRID")
            console.log(data);
            op(data[room])
        })
    }

    emitGrid(grid,room){
        socket.emit('update-grid',{grid : grid,room :room})
    }

    createGrid(grid,room){
        socket.emit('create-grid',{grid: grid,room: room});
    }
}

export {AppClient,PictionaryClient,ChatClient,TimerClient,GameClient,PetitBacClient,DemineurClient}