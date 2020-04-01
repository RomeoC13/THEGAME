import openSocket from 'socket.io-client';

const socket = openSocket();

class AppClient {
    updatePlayerCount(state) {
        socket.on('update-playercount', (data) => {
            state.setState({userCount: data})
        });
    }

    askUpdateCount() {
        socket.emit('ask-update-playercount');
    }

    askUpdateRooms() {
        socket.emit('ask-update-roomlist');
    }

    updateRooms(state) {
        socket.on('update-roomlist', (data) => {
            state.setState({roomList: data});
            state.forceUpdate();
        })
    }
}
export {AppClient}