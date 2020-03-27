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




let onlineCount = 0;

let users = [];

io.on('connection', (client) => {

    console.log("New connection")
    var nameUser;

    client.on("join", (name) => {
        console.log('Nouveau joueur  :' + name);
        nameUser = name;
        onlineCount++;
        if (typeof name != "string") {
            console.log(name + "has been disconnected");
            client.disconnect();
            return;
        }
        users.push(name);
        updateNames();
    });

    function updateNames() {
        console.log('update-names', users);
        io.emit('update-names', users);
    }

    client.on('leave', (user) => {
        console.log(user + " has left !")
        var i = users.indexOf(user);
        users.splice(i,1);
        updateNames();
    });

    client.on('print', (msg) => {
        console.log("printing : " + msg);
    });



    client.on('set-name', (name) => {
        console.log('set-name', name);
        client.username = name;
        client.emit('add-messages', messages)
    });

    client.on('post-message', (text) => {
        const message = {name: client.username, text: text};
        console.log(message.name, message.text);
        messages.push(message);
        io.emit('add-messages', [message])
    });





});

setInterval(function () {
    if (countdown > 0) {
        countdown--;
        console.log('timer', {countdown: countdown});
        io.sockets.emit('timer', {countdown: countdown});
    }
}, 1000);

let now = 0;

let timer = null;
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});