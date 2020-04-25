import io from 'socket.io-client';

/*const socket = openSocket();*/
var socket = io('ws://localhost:3001', {transports: ['websocket']});

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

class PictionaryClient {

    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Pictionary"})
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Pictionary"})
    }


    startGame(room){
        socket.emit("start-game",room)
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

    listenEndGame(op,room){
        socket.on("game-stopped",function (data) {
            if(data.room===room){
                op(data.player);
            }
        })
    }
    stopGame(playerWhoLeft,room){
        socket.emit("end-game",{player : playerWhoLeft, room: room});
    }
}

class PetitBacClient{

    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Petit Bac"})
    }

    startPetitBac(room){
        socket.emit("start-game-pb",room)
    }

    //Todo : Vérifier la synchro des formulaires entre les joueurs d'une salle
    listenPetitBacLetter(op,room){
        socket.on('start-PetitBac',function (data) {
            if(data.room === room){
                op(data);
            }
        })
    }

    emitForm(Names, Job, City, Country, Animal, Objects, Movie, Food, Song ,room){
        socket.emit('update-form',{Names : Names,Job: Job, Country: Country, City : City,
            Animal: Animal, Objects: Objects, Movie: Movie, Food: Food, Song: Song, room :room})
    }

    updateNames(op,room) {
        socket.on('update-pbNames',(data)=>{
            op(data[room])
        });
    }
    updateCity(op,room) {
        socket.on('update-pbCity',(data)=>{
            op(data[room])
        });
    }
    updateCountry(op,room) {
        socket.on('update-pbCountry',(data)=>{
            op(data[room])
        });
    }
    updateAnimal(op,room) {
        socket.on('update-pbAnimal',(data)=>{
            op(data[room])
        });
    }
    updateFood(op,room) {
        socket.on('update-pbFood',(data)=>{
            op(data[room])
        });
    }
    updateObjects(op,room) {
        socket.on('update-pbObjects',(data)=>{
            op(data[room])
        });
    }
    updateJob(op,room) {
        socket.on('update-pbJob',(data)=>{
            op(data[room])
        });
    }
    updateMovie(op,room) {
        socket.on('update-pbMovie',(data)=>{
            op(data[room])
        });
    }
    updateSong(op,room) {
        socket.on('update-pbSong',(data)=>{
            op(data[room])
        });
    }

    endForOnePlayer(player, room){
        socket.emit("end-pb-player", {player : player, room : room});
    }

    listenEndGame(op,room){
        socket.on("end-GamePb",function (data) {
            if(data.room===room){
                op();
            }
        })
    }


    stopGame(playerWhoLeft,room){
        socket.emit("end-game",{player : playerWhoLeft, room: room});
    }

    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Petit Bac"})
    }
}


class DemineurClient {

    emitUser(user,room){
        socket.emit('join',{user:user,room:room,type:"Demineur"})
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

class PlayerListClient{
    constructor(room) {
        this.room=room;
    }

    updateUsers(op) {
        socket.on('update-names',(data)=>{
            op(data[this.room])
        });
    }

    print(msg) {
        socket.emit('print', msg);
    }

}

export {AppClient,PictionaryClient,ChatClient,TimerClient,PetitBacClient,DemineurClient,PlayerListClient}