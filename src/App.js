import React from 'react';
import './App.css';
import {Pictionary} from "./Pictionary.js";
import {LoginWindow} from "./LoginWindow.js";
import {PetitBacStart} from "./PetitBacStart";
import {Room} from "./Room";
import {AppClient} from "./Clients";
import {Helmet} from 'react-helmet';
import {Demineur} from "./Demineur";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "login",
            room: '0',
            game: 'Pictionary',
            userCount: 0,
            roomList: [],
            roomTypes: [],
            darkMode: false,
            logoSize: "big"
        };
        this.closeChat = this.closeChat.bind(this);
        this.startChat = this.startChat.bind(this);
        this.setName = this.setName.bind(this);
        this.setGame = this.setGame.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.nameAlreadyToken = this.nameAlreadyToken.bind(this);
        this.roomAlreadyToken = this.roomAlreadyToken.bind(this);
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
        this.clean(data.rooms);
        this.setState({roomList: data.rooms, roomType: data.roomsType});
        this.forceUpdate();
    };

    clean = (obj) => {
        let propNames = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < propNames.length; i++) {
            let propName = propNames[i];
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    };

    closeChat() {
        this.setState({current: "login"});
        document.getElementById("welcomepage").classList.add("in");
        setTimeout(() => {
            this.ac.askUpdateCount();
            this.ac.askUpdateRooms();
            this.forceUpdate();
        }, 50)

    }

    startChat() {
        console.log(this.state.game);
        console.log(this.state.room);
        if (this.state.name === undefined || this.state.name === "") {
            this.warningMessage = "Please enter a valid name";
            this.forceUpdate();
        } else if (this.nameAlreadyToken(this.state.name)) {
            this.warningMessage = "This name is already token choose another";
            this.forceUpdate();
        } else if (this.roomAlreadyToken(this.state.room) && this.state.roomType[this.state.room] !== this.state.game) {
            this.warningMessage = "This room is busy with an other game please choose another ";
            this.forceUpdate();
        } else {
            document.getElementById("welcomepage").classList.add("out");
            setTimeout(() => {
                this.setState({logoSize: "little"})
                this.setState({current: "game"})
            }, 400)
        }

    }

    setName(name) {
        this.setState({name: name})
    }

    setRoom(room) {
        this.setState({room: room.target.value})
    }

    roomAlreadyToken(room) {
        let roomNames = this.state.roomList.keys();
        for (const value of roomNames) {
            if (value.toString() === room)
                return true;
        }
        return false;
    }

    nameAlreadyToken(name) {
        let names = this.state.roomList.values();
        for (const value of names) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === name)
                    return true;
            }
        }
        return false;
    }

    setGame(game) {
        //console.log(game.target.value);
        if (game.target !== undefined) {
            this.setState({game: game.target.value})
        }
    }

    joinRoom(room) {
        this.setState({room: room});
        this.setState({game: this.state.roomType[room]});
        setTimeout(() => this.startChat());
    }

    darkWhite = () => {
        this.setState({darkMode: !this.state.darkMode})
    }

    render() {
        let content;
        let title;
        let body;
        let size;
        if (this.state.current === "login") {
            size = "big";
            title = 'Welcome G@MES';
            let rooms = this.state.roomList.map((room) => <td> <Room key={this.state.roomList.indexOf(room)}
                                                                joinRoom={this.joinRoom}
                                                                roomName={this.state.roomList.indexOf(room)}
                                                                type={this.state.roomType[this.state.roomList.indexOf(room)]}
                                                                userList={room}/> </td> );
            let orJoinaRoom = "";
            if (this.state.roomList.length !== 0) {
                orJoinaRoom = <h4>or join a room</h4>;
            }
            content = <div id="welcomepage" class="main">
                <h4>Currently playing : {this.state.userCount} players</h4>
                <LoginWindow warning={this.warningMessage} onNameChange={this.setName} onLogin={this.startChat}
                             onRoomChange={this.setRoom} onGameChange={this.setGame}/>
                {orJoinaRoom}
                <table id="roomTable">
                    {rooms}
                </table>
            </div>;
        } else {
            size = "little";
            this.setGame({logoSize: "big"})
            title = "Room " + this.state.room + ": " + this.state.game;
            if (this.state.game === "Pictionary") {
                content = <Pictionary statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
            } else if (this.state.game === "Demineur") {
                content = <Demineur height="5" width="5" bombs="4" close={this.closeChat} room={this.state.room}
                                    statename={this.state.name}/>
            } else {
                content =
                    <PetitBacStart statename={this.state.name} closeChat={this.closeChat} room={this.state.room}/>;
            }
        }
        if (!this.state.darkMode) {
            body = <body class="white"/>;
        } else {
            body = <body class="dark"/>
        }
        return <>
            <Helmet>
                <title>{title}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli"/>
                {body}
            </Helmet>
            <button onClick={this.darkWhite}/>
            <h1 class={size}>G@mes</h1>
            {content}
        </>
    }

}

export default App;
