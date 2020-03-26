const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('build'));

const messages = [{name: 'bot', text: 'Bienvenue '}];
var countdown = 10;
// All names of currently playing client are pushed in clientsNames
var clientsNames = [];
// Socket of a client named "Romeo" is stocked at sockets["Romeo"]
var sockets = [];
io.on('connection', (client) => {
    console.log("New connection")

    client.on('set-name', (name) => {
        console.log('set-name aaa', name);
        client.username = name;
        clientsNames.push(name);
        sockets[name] = client;
        console.log('update-names', clientsNames);
        io.emit('update-names', clientsNames);
        client.emit('add-messages', messages)
    });

    client.on('post-message', (text) => {
        const message = {name: client.username, text: text};
        console.log('post-message ', message);
        messages.push(message);
        io.emit('add-messages', [message])
    });

    client.on('drawing', function (data) {
        console.log('drawing', data);
    });


    client.on('reset', function (data) {
        countdown = data;
        io.sockets.emit('timer', {countdown: countdown});
    })

    client.on('disconnect', function () {
        var name = getKeyByValue(sockets, client);
        delete sockets[name];
        var i = clientsNames.indexOf(name);
        clientsNames.splice(i, 1);
        console.log('update-names', clientsNames);
        io.emit('update-names', clientsNames)
    })

});

setInterval(function () {
    if (countdown > 0) {
        countdown--;
        console.log('timer', {countdown: countdown});
        io.sockets.emit('timer', {countdown: countdown});
    }
}, 1000);
function getKeyByValue(object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value)
                return prop;
        }
    }
}

const port = process.env.PORT || 3000;
//io.listen(port);

http.listen(port, () => console.log("listening on port", port))