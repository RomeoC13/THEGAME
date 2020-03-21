const io = require('socket.io')();

const messages = [{name: 'bot', text: 'Bienvenue.'}];
var timerState = [{minutes: 0, seconds: 300}];

io.on('connection', (client) => {
    client.on('set-name', (name) => {
        console.log('set-name ', name);
        client.username = name;
        client.emit('add-messages', messages)
    });

    client.on('post-message', (text) => {
        const message = {name: client.username, text: text};
        console.log('post-message ', message);
        messages.push(message);
        io.emit('add-messages', [message])
    });

    client.on("drawing", (data) => {
        client.emit("drawing", data);
    });


    client.on('reset', function (data) {
        countdown = data;
        io.sockets.emit('timer', {countdown: countdown});
    })

});


var countdown = 1000;
setInterval(function () {
    if (countdown > 0) {
        countdown--;
        console.log('timer', {countdown: countdown});
        io.sockets.emit('timer', {countdown: countdown});
    }
}, 1000);


const port = 3001;
io.listen(port);
console.log('socket.io listening on port ', port);

