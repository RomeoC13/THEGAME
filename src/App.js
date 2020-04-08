import React from 'react';
import './App.css';
import {Pictionary} from "./Pictionary.js";
import {LoginWindow} from "./LoginWindow.js";
import {PetitBac} from "./PetitBac";
import {Room} from "./Room";
import {AppClient} from "./Clients";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current: "login", room: '0', game: '0', userCount: 0, roomList: [], roomTypes: []};
        this.closeChat = this.closeChat.bind(this);
        this.startChat = this.startChat.bind(this);
        this.setName = this.setName.bind(this);
        this.setGame = this.setGame.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.nameAlreadyToken = this.nameAlreadyToken.bind(this);
        this.ac = new AppClient();
        this.warningMessage = "";
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        this.ac.updatePlayerCount(this.updatePlayerCount);
        this.ac.updateRooms(this.updateRooms);
        this.ac.askUpdateCount();
        this.ac.askUpdateRooms();
    }

    updatePlayerCount = (count) => {
        this.setState({userCount: count});
        /*this.forceUpdate();*/
    };

    updateRooms = (data) => {
        var roomListWithNoNull=data.rooms.filter(function (el){
            return el!=null;
        });
        this.setState({roomList: roomListWithNoNull, roomType: data.roomsType});
        this.forceUpdate();
    };


    closeChat() {
        this.setState({current: "login"});
        setTimeout(() => {
            this.ac.askUpdateCount();
            this.ac.askUpdateRooms();
            this.forceUpdate();
        }, 50)

    }

    startChat() {
        console.log("NAMEALREADYTOKEN", this.nameAlreadyToken(this.state.name));
        if (this.state.name === undefined || this.state.name === "") {
            this.warningMessage = "Please enter a valid name";
            this.forceUpdate();
        } else if (this.nameAlreadyToken(this.state.name)) {
            console.log("THIS NAME IS REALDZQDQZ");
            this.warningMessage = "This name is already token choose another";
            this.forceUpdate();
        } else {
            this.setState({current: "game"})
        }

    }

    setName(name) {
        this.setState({name: name})
    }

    setRoom(room) {
        this.setState({room: room.target.value})
    }

    nameAlreadyToken(name) {
        for(let index=0;index<this.state.roomList.length;index++){
            let room = this.state.roomList[index];
            if (room.indexOf(name) !== -1) {
                return true;
            }
        }
        return false;
    }

    setGame(game) {
        this.setState({game: game.target.value})
    }

    joinRoom(room) {
        this.setState({room: room});
        this.startChat();
    }

    render() {
        let rooms = this.state.roomList.map((room) => <Room key={this.state.roomList.indexOf(room)}
                                                            joinRoom={this.joinRoom}
                                                            roomName={this.state.roomList.indexOf(room)}
                                                            type={this.state.roomType[this.state.roomList.indexOf(room)]}
                                                            userList={room}/>);
        let orJoinaRoom = "";
        if (this.state.roomList.length !== 0) {
            orJoinaRoom = <h4>or join a room</h4>;
        }

        if (this.state.current === "login") {
            return <div>
                <h4>Currently playing : {this.state.userCount} players</h4>
                <LoginWindow warning={this.warningMessage} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} onGameChange={this.setGame}/>
                {orJoinaRoom}
                {rooms}
            </div>;
        } else if (this.state.game === "0")
            return <Pictionary statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
        else
            return <PetitBac statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
    }

}

export default App;
