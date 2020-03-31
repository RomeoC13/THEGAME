import React from 'react';
import './App.css';
import {Pictionary} from "./Pictionary.js";
import {LoginWindow} from "./LoginWindow.js";
import {PetitBac} from "./PetitBac";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current: "login", room: '0', game : '0'};
        this.closeChat = this.closeChat.bind(this);
        this.startChat = this.startChat.bind(this);
        this.setName = this.setName.bind(this);
        this.setGame = this.setGame.bind(this);
        this.setRoom = this.setRoom.bind(this);
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

    render() {
        if (this.state.current === "login")
            return <div>
                <LoginWindow warning={""} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} onGameChange={this.setGame} />
            </div>;
        else if (this.state.current === "error") {
            return <div>
                <LoginWindow warning={"Please enter a valid name"} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} onGameChange={this.setGame}/>
            </div>;
        }
        else if(this.state.game === "0")
            return <Pictionary statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
        else
            return <PetitBac statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
        }

}

export default App;
