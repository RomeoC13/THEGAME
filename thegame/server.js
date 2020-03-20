const io = require('socket.io')();

const messages = [{name: 'bot', text: 'Bienvenue.'}];

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
});

const port = 3001;
io.listen(port);
console.log('socket.io listening on port ', port);

