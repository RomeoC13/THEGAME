import {ChatWindow} from "../Chat/ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";
import {PictionaryClient, PlayerListClient} from "../Clients";
import React from "react";

class Pictionary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {names: [], info: "", currentDrawer: "", currentWord: "", scores: [], gameRunning: false};

        this.setNames = this.setNames.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.startGame = this.startGame.bind(this);
        this.firstround = this.firstround.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.timeIsUp = this.timeIsUp.bind(this);
        this.endGame = this.endGame.bind(this);
        this.leave = this.leave.bind(this);
        this._loaded = false;
        this.uc = new PlayerListClient(this.props.room)
        this.game = new PictionaryClient();

    }

    //Check tchat to verify the response and compare with the currentWord to guess
    sendMsg(message) {
        if (this.state.currentWord === message.text && this.state.currentDrawer !== message.name && this.state.gameRunning) {
            this.setState({info: "Good job, " + message.name + " ! The word was " + this.state.currentWord});
            if (this.props.statename === this.state.currentDrawer) {
                setTimeout(() => this.game.asWin(message.name, this.state.currentDrawer, this.props.room), 2000);
            }
        }
    }

    //Set names in the room
    setNames = (name) => {
        this.setState({names: name})
    };

    //Listen round and event from other players
    componentDidMount() {
        this._loaded =true;
        this.uc.updateUsers(this.setNames);
        this.game.emitUser(this.props.statename,this.props.room);
        this.setupBeforeUnloadListener(this.uc);
        this.game.listenFirstRound(this.firstround, this.props.room);
        this.game.listenRound(this.nextRound, this.props.room);
        this.game.listenEndGame(this.endGame, this.props.room);
    }


    componentWillUnmount() {
        document.getElementById("pictionary").classList.add("out");
        this._loaded =false;
        this.game.userLeave(this.props.statename, this.props.room);
    }

    setupBeforeUnloadListener = (uc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            uc.userLeave(this.props.statename,this.props.room);
            if (this.state.gameRunning) {
                this.game.stopGame(this.props.statename, this.props.room);
            }
            return ev.returnValue = "test";
        });
    };

    //Start the game if there are 2 players
    startGame() {
        if (this.state.names.length < 2) {
            // eslint-disable-next-line no-useless-escape
            alert("You can't play Pictionary game alone ¯\\_(ツ)_/¯, you must at least be 2 !");
        } else {
            this.game.startGame(this.props.room)
        }
    }

    //End the game
    endGame(player) {
        if(this._loaded){
            this.setState({gameRunning: false});
            this.setState({info: player + " as left ! The party is over"})
        }
    }

    //Start the first round, set score to 0 and the gameRunning to true
    firstround(data) {
        //console.log("firstround");
        let score = [];
        this.state.names.forEach((name) => {
            score[name] = 0;
        });
        if(this._loaded){
            this.setState({scores: score});
            this.setState({gameRunning: true});
            this.nextRound(data);
        }
    }

    //Update score and round
    nextRound(data) {
        if (data.hasOwnProperty("scoreToUpdate")) {
            var score = this.state.scores;
            score[data.scoreToUpdate]++;
            this.setState({scores: score})
        }
        if(this._loaded){
            this.setState({currentDrawer: data.player});
            this.setState({currentWord: data.word});
            if (this.props.statename === data.player) {
                this.setState({info: "Your turn ! you have to draw : " + data.word})
            } else {
                this.setState({info: "Drawer is " + data.player})
            }
        }
    }

    //Check the time if it is up or not
    timeIsUp() {
        if (this.state.gameRunning) {
            this.setState({info: "No one has guess the correct word ! It was " + this.state.currentWord});
            if (this.props.statename === this.state.currentDrawer) {
                setTimeout(() => {
                    this.game.loose(this.state.currentDrawer, this.props.room)
                }, 2000);
            }
        }
    }

    //Leave the game
    leave() {
        document.getElementById("pictionary").classList.add("out");
        setTimeout(()=> {
            this.props.closeChat();
            this.game.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                this.game.stopGame(this.props.statename, this.props.room);
            }
        },400)
    }

    //Visual render with score if the game is running
    render() {
        var names;
        if (!this.state.gameRunning) {
            names = this.state.names.map((m) => <player key={m}> {m} </player>);
            this.button = <button onClick={this.startGame}>Start Game !</button>;
            this.timer = "";
            this.timerleft="";
        } else {
            this.timer = <Timer seconds={'10'} room={this.props.room} timeIsUp={this.timeIsUp}/>;
            this.button = "";
            names = this.state.names.map((m) => <player key={m}> <li>{m} score {this.state.scores[m]} </li></player>);
            this.timerleft=<div id="time-left" />;
        }
        return (
            <>
                <div id="pictionary" className="game in">
                    <ChatWindow name={this.props.statename} onQuit={this.leave} msg={this.sendMsg}
                                room={this.props.room}/>
                    {this.timer}
                    <info>{this.state.info}</info>
                    {this.timerleft}
                    <Canvas room={this.props.room} drawer={this.state.currentDrawer} name={this.props.statename}/>
                    {this.button}
                    <div id="players-list">
                        <h4>Players online in room {this.props.room} </h4>
                        <p> {names} </p>
                    </div>
                </div>
            </>
        )
    }
}

export {Pictionary}