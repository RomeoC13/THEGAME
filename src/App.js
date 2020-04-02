import React from 'react';
import './App.css';
import {Pictionary} from "./Pictionary.js";
import {LoginWindow} from "./LoginWindow.js";
import {Room} from "./Room";
import {AppClient} from "./Clients";
import {PetitBac} from "./PetitBac";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current: "login", room: '0', game : '0',userCount: 0, roomList: [], };
        this.closeChat = this.closeChat.bind(this);
        this.startChat = this.startChat.bind(this);
        this.setName = this.setName.bind(this);
        this.setGame = this.setGame.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.joinRoom = this.joinRoom.bind(this);

        this.ac= new AppClient();
    }



    componentDidMount() {
        this.ac.updatePlayerCount(this);
        this.ac.updateRooms(this);
        this.ac.askUpdateCount();
        this.ac.askUpdateRooms();
    }

    closeChat() {
        this.setState({current: "login"})
    }

    startChat() {
        if (this.state.name !== undefined) {
            this.setState({current: "game"})
        } else {
            this.setState({current: "error"})
        }

    }

    setName(name) {
        this.setState({name: name})
    }

    setRoom(room) {
        this.setState({room: room.target.value})
    }

    setGame(game) {
        this.setState({game : game.target.value})
    }

    joinRoom(room) {
        this.setState({room: room});
        this.startChat();
    }

    render() {
        let rooms = this.state.roomList.map((room) => <Room joinRoom={this.joinRoom}
                                                            roomName={this.state.roomList.indexOf(room)}
                                                            userList={room}/>);
        let orJoinaRoom ="";
        if(this.state.roomList.length!==0){
            orJoinaRoom= <h4>or join a room</h4>;
        }
        if (this.state.current === "login")
            return <div>
                <h4>Currently playing : {this.state.userCount} players</h4>
                <LoginWindow warning={""} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} onGameChange={this.setGame} />
                {orJoinaRoom}
                {rooms}
            </div>;
        else if (this.state.current === "error") {
            return <div>
                <LoginWindow warning={"Please enter a valid name"} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} />
                {orJoinaRoom}
                {rooms}
            </div>;
        }

        else if(this.state.game === "0")
            return <Pictionary statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
        else
            return <PetitBac statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
        }

}

export default App;
