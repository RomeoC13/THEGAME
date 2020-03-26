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



const messages = [{name: 'bot', text: 'Bienvenue '}];
var countdown = 10;
// All names of currently playing client are pushed in clientsNames
var clients = [];
// Socket of a client named "Romeo" is stocked at sockets["Romeo"]
var sockets = [];


let onlineCount = 0;

let users = [];

io.on('connection', (client) => {
    console.log("New connection")

    let addedToList = false;
    let color;
    let room;
    let currentUsersInRoom;

    client.on("join", (join) => {
        if (addedToList) return;
        onlineCount++;
        join.id = onlineCount;
        addedToList = true;
        color = "red";
        room = join.room;
        join.color = color;
        users.push(join);
        client.join(join.room);
        client.userId = join.id;
        client.emit("joined", join);
        currentUsersInRoom = users.filter((user) => {
            if (user.room === room) {
                return user;
            }
        });

        io.in(room).emit("users", currentUsersInRoom);
    });



    client.on("drawing", (data) => {
        client.in(data.room).emit("drawing", data);
    });

    client.on("color-change", (data) => {
        currentUsersInRoom = users.filter((user) => {
            if (user.room === data.room) {
                if (user.id === data.id) {
                    color = data.color;
                    user.color = data.color;
                }
                return user;
            }
        });
        io.in(data.room).emit("users", currentUsersInRoom);
    });

    client.on("leaveroom", (data) => {
        addedToList = false;
        users = users.filter((user) => {
            if (user.id !== client.userId) {
                return user;
            }
        });
        let currentUsersInThisRoom = users.filter((user) => {
            if (user.room === data.room) {
                if (user.id !== client.userId) {
                    return user;
                }
            }
        });
        currentUsersInRoom = [];
        io.in(data.room).emit("users", currentUsersInThisRoom);
    });

    client.on("clear", (clear) => {
        io.in(clear).emit("cleared", clear);
    });

    client.on("disconnect", () => {
        addedToList = false;

        users = users.filter((user) => {
            if (user.id !== client.userId) {
                return user;
            }
        });

        currentUsersInRoom = users.filter((user) => {
            if (user.room === room) {
                return user;
            }
        });

        io.in(room).emit("users", currentUsersInRoom);
    });



    client.on('set-name', (name) => {
        console.log('Nouvel utilisateur  :' + name);
        clients.push(name);
        client.username = name;
        sockets[name] = client;
        io.emit('update-names', clients);
        client.emit('add-messages', messages)
    });

    client.on('post-message', (text) => {
        const message = {name: client.username, text: text};
        console.log(message.name, message.text);
        messages.push(message);
        io.emit('add-messages', [message])
    });

    client.on('mousemouve', function (data) {
        client.broadcast.emit('moving', data);
    });


    client.on('reset', function (data) {
        countdown = data;
        io.sockets.emit('timer', {countdown: countdown});
    });

    client.on('disconnect', function () {
        //var name = getKeyByValue(sockets, client.username);
        //delete sockets[client.username];
        //var i = clientsNames.indexOf(name);
        //console.log(totalUsers);
        //console.log(clientsNames.splice(i).join("|"));

        //clientsNames.splice(i, 1);
        //console.log('update-names', clientsNames);
        //io.emit('update-names', clientsNames);
        /*var connected = clients.splice(clients.indexOf(client), 1);
        console.log(connected);
        io.emit('update-names', clients);*/
    });


});

setInterval(function () {
    if (countdown > 0) {
        countdown--;
        //console.log('timer', {countdown: countdown});
        io.sockets.emit('timer', {countdown: countdown});
    }
}, 1000);

let now = 0;
let timer = null;

function resetTimer() {
    if (timer !== null) clearInterval(timer);
    function broadcast() {
        io.sockets.emit('update-timer', now);
        now++;
    }
    broadcast();
    timer = setInterval(broadcast, 1000)
}


function getKeyByValue(object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value)
                return prop;
        }
    }
}

const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});
