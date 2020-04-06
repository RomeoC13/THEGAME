const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
app.use(express.static('build'));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;
//io.listen(port);

http.listen(port, () => console.log("Listening on port :", port));


//PICTIONNARY USAGE :
const messages = [{name: 'bot', text: 'Bienvenue ', room : "all"}];
//Rooms Array is a 2D Array, a room of Pictionnary with few players named "Romeo" ,"Pauline" and "Yash" in room "3" will be stored like this :
// pcRooms["3"]=["Romeo","Pauline","Yash"}]
let pcRooms = [];
//Every pcRooms as his own countdown, for example room "3" if created as his countdown in countdowns["3"]
var countdowns = [];
//Every pcRooms as his own lines storage, for example room "3" line's if created are stored in lines["3"]
let lines =[];
let score= [];
var words = [
    "storage",     "virus",       "restaurant",  "college",    "debt",
    "passenger",   "leader",      "energy",      "tongue",     "lady",
    "boyfriend",   "sister",      "recipe",      "speech",     "protection",
    "newspaper",   "language",    "inspector",   "professor",  "advice",
    "physics",     "collection",  "army",        "honey",      "letter",
    "pen",         "police",      "people",      "sound",      "water",
    "breakfast",   "place",       "man",         "woman",      "boy",
    "girl",        "week",        "month",       "name",       "line",
    "air",         "home",        "hand",        "house",      "picture",
    "animal",      "mother",      "father",      "sister",     "world",
    "head",        "page",        "country",     "question",   "school",
    "plant",       "food",        "sun",         "state",      "eye",
    "city",        "tree",        "farm",        "story",      "sea",
    "night",       "day",         "life",        "child",      "paper",
    "music",       "river",       "book",        "science",    "room",
    "friend",      "idea",        "fish",        "mountain",   "horse",
    "watch",       "color",       "face",        "wood",       "list",
    "bird",        "song",        "door",        "forest",     "wind",
    "ship",        "area",        "fire",        "airplane",   "top",
    "bottom",      "king",        "space",       "whale",      "unicorn",
    "furniture",   "sunset",      "sunburn",
];

//GENERAL APP USAGE :
let onlineCount = 0;
let users = [];

//DEMINEUR USAGE :



//PETIT BAC USAGE :



function resetTimer(value,room){
    countdowns[room] = value;
    console.log('Reset : timer', {countdown: value,room : room});
    io.emit('timer', {countdown: value,room : room});
}

function updateNames() {
    console.log('update-names', pcRooms);
    io.emit('update-names', pcRooms);
}

let wordcount;

function newWord() {
    wordcount = Math.floor(Math.random() * (words.length));
    return words[wordcount];
}

io.on('connection', (client) => {

    //console.log("New connection");

    client.on("join", (data) => {
        var name = data.user;
        var room = data.room;
        if (typeof name != "string" || room === undefined) {
            client.disconnect();
            return;
        }
        onlineCount++;
        console.log('update-playercount',onlineCount);
        io.emit('update-playercount',onlineCount);
        if (!pcRooms.hasOwnProperty(room)) {
            pcRooms[room] = [];
        }
        if(!lines.hasOwnProperty(room)){
            lines[room]= [];
        }
        console.log('Nouveau joueur  : ' + name + " dans " + room);
        pcRooms[room].push(name);
        users.push(name);
        io.emit("cleared",room);
        io.emit("update-lines",lines[room]);
        updateNames();
    });

    client.on("ask-update-playercount",()=>{
        console.log('update-playercount',onlineCount);
        io.emit('update-playercount',onlineCount);});

    client.on('ask-update-roomlist',()=>{
        console.log('update-roomlist');
        io.emit('update-roomlist',pcRooms)});

    client.on('user-drawing', (data) => {
        var x0 = data.x0;
        var x1 = data.x1;
        var y0 = data.y0;
        var y1 = data.y1;
        var color = data.color;
        var room =data.room;
        var line = {x0:x0,x1:x1,y0:y0,y1:y1,color:color,room:room}
        lines[room].push(line);
        console.log('add-drawing', line);
        io.emit('add-drawing', line);
        console.log('drawing on emit server on room :', room);
    });

    client.on('ask-clear',function (room) {
        console.log("cleared",room);
        lines[room]=[];
        io.emit("cleared",room);
    });

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

    client.on('leave', function (data) {
        var name = data.user;
        var room = data.room;
        console.log("Joueur " + data.user + " a quitter " + data.room);

        if (pcRooms.hasOwnProperty(room)) {
            var indexName = pcRooms[room].indexOf(name);
            pcRooms[room].splice(indexName, 1);
            if (pcRooms[room].length === 0) {
                var i = pcRooms.indexOf(room);
                pcRooms.splice(i, 1);
            }
            updateNames();
            onlineCount--;
        }
    });


    client.on('start-game',function (room) {
        lines[room]=[];
        io.emit("cleared",room);
        let players= pcRooms[room];
        players.forEach((player) => {
            score[player]=0;
        });
        let firstplayer = Math.floor(Math.random()*players.length);
        let word = newWord();
        console.log('first-round',{player:players[firstplayer], word : word, room:room});
        io.emit('first-round',{player:players[firstplayer], word : word, room:room});
        resetTimer(10,room);
    });

    client.on('win',function (data) {
        let winner = data.player;
        score[winner]++;
        let drawer = data.drawer;
        let room = data.room;
        let players = pcRooms[room];
        let word = newWord();
        lines[room]=[];
        io.emit("cleared",room);
        let indexOfNextDrawer= (players.indexOf(drawer)+1)%(players.length);
        console.log('round-game',{players:players[indexOfNextDrawer],word :word,room:room,scoreToUpdate : winner})
        io.emit('round-game',{player:players[indexOfNextDrawer],word :word,room:room,scoreToUpdate : winner});
        resetTimer(10,room);
    });

    client.on('loose',function(data){
        let drawer = data.drawer;
        let room = data.room;
        let players = pcRooms[room];
        lines[room]=[];
        io.emit("cleared",room);
        let indexOfNextDrawer= (players.indexOf(drawer)+1)%(players.length);
        let word = newWord();
        console.log('round-game',{players:players[indexOfNextDrawer],word :word,room:room});
        io.emit('round-game',{player:players[indexOfNextDrawer],word :word,room:room});
        resetTimer(10,room);
    });

    client.on('end-game',function (data) {
        let room = data.room;
        let playerWhoLeft= data.player;
        let players = pcRooms[room];
        if(players !== undefined) {
            players.forEach((player) => {
                delete score[player];
            });
        }
        console.log("game-stopped",{player: playerWhoLeft,room :room});
        io.emit("game-stopped",{player: playerWhoLeft,room :room});
    });
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
