const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
app.use(express.static('build'));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;
//io.listen(port);

http.listen(port, () => console.log("Listening on port :", port))

const messages = [{name: 'bot', text: 'Bienvenue ', room : "all"}];
//Rooms Array is a 2D Array, a room with few players named "Romeo" ,"Pauline" and "Yash" in room "3" will be stored like this : rooms["3"]=["Romeo","Pauline","Yash"]
let rooms = [];
//Every rooms as his own countdown, for example room "3" if created as his countdown in countdowns["3"]
var countdowns = [];

let score= [];
//Not used now, can be useful
let onlineCount = 0;
let users = [];


io.on('connection', (client) => {


    console.log("New connection");

    client.on("join", (data) => {
        onlineCount++;
        var name = data.user;
        var room = data.room;

        if (!rooms.hasOwnProperty(room)) {
            rooms[room] = [];
        }

        console.log('Nouveau joueur  : ' + name + " dans " + room);
        if (typeof name != "string") {
            console.log(name + "has been disconnected");
            client.disconnect();
            return;
        }
        rooms[room].push(name);
        users.push(name);
        updateNames();
    });

    client.on("drawing", (data) => {
        client.in(data.room).emit("drawing", data);
    });

    function updateNames() {
        console.log('update-names', rooms);
        io.emit('update-names', rooms);
    }


    client.on('print', (msg) => {
        console.log("printing : " + msg);
    });


    client.on('set-name', (name) => {
        console.log('set-name', name);
        client.username = name;
        client.emit('add-messages', messages)
    });

    client.on('post-message', (data) => {
        let text = data.text;
        let room = data.room;
        const message = {name: client.username, text: text,room :room};
        messages.push(message);
        console.log(message);
        io.emit('add-messages', [message])
    });


    client.on('reset', function (data) {
        var room = data.room;
        var value = data.value;
        resetTimer(value,room);
    });

    function resetTimer(value,room){
        countdowns[room] = value;
        console.log('Reset : timer', {countdown: value,room : room});
        io.emit('timer', {countdown: value,room : room});
    }

    client.on('leave', function (data) {
        onlineCount--;
        var name = data.user;
        var room = data.room;
        console.log("Joueur " + data.user + " a quitter " + data.room)
        if (rooms.hasOwnProperty(room)) {
            var indexName = rooms[room].indexOf(name);
            rooms[room].splice(indexName, 1);
            if (rooms[room].length === 0) {
                var i = rooms.indexOf(room);
                rooms.splice(i, 1);
            }
            updateNames()
        }
    });

    client.on('start-game',function (room) {
        let players= rooms[room];
        players.forEach((player) => {
            score[player]=0;
        });
        let firstplayer = Math.floor(Math.random()*players.length);
        console.log('first-round',{player:players[firstplayer], word : "bateau", room:room});
        io.emit('first-round',{player:players[firstplayer], word : "bateau", room:room})
        resetTimer(10,room);
    });

    client.on('win',function (data) {
        let winner = data.player;
        score[winner]++;
        let drawer = data.drawer;
        let room = data.room;
        let players = rooms[room];
        let indexOfNextDrawer= (players.indexOf(drawer)+1)%(players.length);
        console.log('round-game',{players:players[indexOfNextDrawer],word :"soleil",room:room,scoreToUpdate : winner})
        io.emit('round-game',{player:players[indexOfNextDrawer],word :"soleil",room:room,scoreToUpdate : winner});
        resetTimer(10,room);
    });

    client.on('loose',function(data){
        let drawer = data.drawer;
        let room = data.room;
        let players = rooms[room];
        let indexOfNextDrawer= (players.indexOf(drawer)+1)%(players.length);
        let word = "soleil";
        console.log('round-game',{players:players[indexOfNextDrawer],word :word,room:room});
        io.emit('round-game',{player:players[indexOfNextDrawer],word :"soleil",room:room});
        resetTimer(10,room);
    });

    client.on('end-game',function (data) {
        let room = data.room;
        let playerWhoLeft= data.player;
        let players = rooms[room];
        players.forEach((player)=>{
            delete score[player];
        });
        console.log("game-stopped",{player: playerWhoLeft,room :room});
        io.emit("game-stopped",{player: playerWhoLeft,room :room});
    })

});

setInterval(function () {
    for(let [room, roomCountdown] of Object.entries(countdowns)) {
        if (roomCountdown > 0) {
            countdowns[room]--;
            let value = countdowns[room];
            console.log('timer', {countdown: value,room : room});
            io.emit('timer', {countdown: value,room : room});
        }
    }
}, 1000);


const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});
