import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";
import {PictionaryClient, PlayerListClient} from "./Clients";
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

    sendMsg(message) {
        //console.log(this.state.currentWord === message.text);
        //console.log(this.state.currentDrawer !== message.name);
        //console.log(this.state.gameRunning);
        if (this.state.currentWord === message.text && this.state.currentDrawer !== message.name && this.state.gameRunning) {
            this.setState({info: "Good job, " + message.name + " ! The word was " + this.state.currentWord});
            if (this.props.statename === this.state.currentDrawer) {
                setTimeout(() => this.game.asWin(message.name, this.state.currentDrawer, this.props.room), 2000);
            }
        }
    }

    setNames = (name) => {
        this.setState({names: name})
    };

    componentDidMount() {
        this._loaded =true;
        this.uc.updateUsers(this.setNames);
        //document.getElementById("pictionary").classList.remove("in");
        this.uc.emitUser(this.props.statename);
        this.setupBeforeUnloadListener(this.uc);
        this.game.listenFirstRound(this.firstround, this.props.room);
        this.game.listenRound(this.nextRound, this.props.room);
        this.game.listenEndGame(this.endGame, this.props.room);
    }

    componentWillUnmount() {
        document.getElementById("pictionary").classList.add("out");
        this._loaded =false;
        this.uc.userLeave(this.props.statename);
    }

    setupBeforeUnloadListener = (uc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            uc.userLeave(this.props.statename);
            if (this.state.gameRunning) {
                this.game.stopGame(this.props.statename, this.props.room);
            }
            return ev.returnValue = "test";
        });
    };

    startGame() {
        if (this.state.names.length < 2) {
            // eslint-disable-next-line no-useless-escape
            alert("You can't play Pictionnary game alone ¯\\_(ツ)_/¯, you must at least be 2 !");
        } else {
            this.game.startGame(this.props.room)
        }
    }

    endGame(player) {
        if(this._loaded){
            this.setState({gameRunning: false});
            this.setState({info: player + " as left ! The party is over"})
        }
    }

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

    leave() {
        document.getElementById("pictionary").classList.add("out");
        setTimeout(()=> {
            this.props.closeChat();
            this.uc.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                //console.log("LEAVING");
                this.game.stopGame(this.props.statename, this.props.room);
            }
        },400)
    }

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
                <div id="pictionary" class="game in">
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