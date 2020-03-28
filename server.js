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

const messages = [{name: 'bot', text: 'Bienvenue ', room : "0"}];
var countdowns = [];
let onlineCount = 0;
let users = [];
let rooms = [];

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
        console.log(messages);
        console.log(message);
        io.emit('add-messages', [message])
    });


    client.on('reset', function (data) {
        var room = data.room;
        var value = data.value;
        countdowns[room] = value;
        console.log('Reset : timer', {countdown: value,room : room});
        io.emit('timer', {countdown: value,room : room});
    });

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
