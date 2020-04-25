import openSocket from 'socket.io-client';

const socket = openSocket();
//var socket = io('ws://localhost:3001', {transports: ['websocket']});

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

    //Add message for all players in a room
    onMessages(cb, room) {
        socket.on('add-messages', function (data) {
            data.forEach((message)=> {
                if (message.room === room || message.room ==="all") {
                    cb(message)
                }
            })
        })
    }

    //Send message to a room
    sendMessage(message, room) {
        socket.emit('post-message', {text: message, room: room})
    }
}

class TimerClient {

    //Listen to timer updates
    listenTimer(cb,room) {
        socket.on('timer', function (data) {
            if(data.room === room){
                cb(data)
            }
        })
    }

    //Ask reset
    callReset(seconds,room){
        socket.emit('reset',{value :seconds,room : room})
    }

}

class PictionaryClient {

    //Join a room
    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Pictionary"})
    }

    //Leave a room
    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Pictionary"})
    }

    //Start the game
    startGame(room){
        socket.emit("start-game",room)
    }

    //Listen first round
    listenFirstRound(op,room){
        socket.on('first-round',function (data) {
            if(data.room === room){
                op(data);
            }
        })
    }

    //Listen round
    listenRound(op,room){
        socket.on('round-game',function (data) {
            if(data.room=== room)
                op(data);
        })
    }

    //Send win for a player
    asWin(player,drawer,room){
        socket.emit("win",{player : player,drawer: drawer,room: room})
    }

    //Send loose for a room
    loose(drawer,room){
        socket.emit("loose",{drawer : drawer,room: room})
    }

    //Listen endgame
    listenEndGame(op,room){
        socket.on("game-stopped",function (data) {
            if(data.room===room){
                op(data.player);
            }
        })
    }
    //Send endgame
    stopGame(playerWhoLeft,room){
        socket.emit("end-game",{player : playerWhoLeft, room: room});
    }
}

class PetitBacClient{

    //Join a room
    emitUser(user,room) {
        socket.emit('join', {user : user, room : room,type : "Petit Bac"})
    }
    //Start the game
    startPetitBac(room){
        socket.emit("start-game-pb",room)
    }

    //Todo : Vérifier la synchro des formulaires entre les joueurs d'une salle
    //Listen the letter
    listenPetitBacLetter(op,room){
        socket.on('start-PetitBac',function (data) {
            if(data.room === room){
                op(data);
            }
        })
    }

    //Update lists with response from a player
    emitForm(Names, Job, City, Country, Animal, Objects, Movie, Food, Song ,room){
        socket.emit('update-form',{Names : Names,Job: Job, Country: Country, City : City,
            Animal: Animal, Objects: Objects, Movie: Movie, Food: Food, Song: Song, room :room})
    }

    //Update forms list
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

    //End game for one player
    endForOnePlayer(player, room){
        socket.emit("end-pb-player", {player : player, room : room});
    }

    //Listen endgame for all players
    listenEndGame(op,room){
        socket.on("end-GamePb",function (data) {
            if(data.room===room){
                op();
            }
        })
    }

    //Stop game
    stopGame(playerWhoLeft,room){
        socket.emit("end-game",{player : playerWhoLeft, room: room});
    }

    //Leave a room
    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type : "Petit Bac"})
    }
}


class DemineurClient {
    //Join a room
    emitUser(user,room){
        socket.emit('join',{user:user,room:room,type:"Demineur"})
    }

    //Leave a room
    userLeave(user,room) {
        socket.emit('leave', {user: user,room: room,type:"Demineur"})
    }

    //Sync the grid for all players
    syncGrid(op,room){
        socket.on('sync-grid',function(data){
            console.log("SYNC-GRID")
            console.log(data);
            op(data[room])
        })
    }

    //Update the grid
    emitGrid(grid,room){
        socket.emit('update-grid',{grid : grid,room :room})
    }

    //Create the grid
    createGrid(grid,room){
        socket.emit('create-grid',{grid: grid,room: room});
    }
}

class PlayerListClient{
    constructor(room) {
        this.room=room;
    }

    //Update names for users list
    updateUsers(op) {
        socket.on('update-names',(data)=>{
            op(data[this.room])
        });
    }

    //Print
    print(msg) {
        socket.emit('print', msg);
    }

}

export {AppClient,PictionaryClient,ChatClient,TimerClient,PetitBacClient,DemineurClient,PlayerListClient}