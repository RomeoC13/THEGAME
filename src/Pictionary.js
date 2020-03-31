import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";
import {PictionaryClient} from "./PictionaryClient";
import {GameClient} from "./GameClient";
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

        this.pc = new PictionaryClient();
        this.game = new GameClient();

    }

    sendMsg(message) {
        if (this.state.currentWord === message.text && this.state.currentDrawer !== message.name) {
            this.setState({info: "Good job, " + message.name + " ! The word was " + this.state.currentWord})
            if (this.props.statename === this.state.currentDrawer) {
                setTimeout(() => this.game.asWin(message.name, this.state.currentDrawer, this.props.room), 2000);
            }
        }
    }

    setNames = (name) => {
        this.setState({names: name})
    };

    componentDidMount() {
        this.pc.updateUsers(this.setNames, this.props.room);
        this.pc.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pc);
        this.game.listenFirstRound(this.firstround, this.props.room);
        this.game.listenRound(this.nextRound, this.props.room);
        this.game.listenEndGame(this.endGame, this.props.room);
    }

    componentWillUnmount() {
        this.pc.userLeave(this.props.statename);
    }

    setupBeforeUnloadListener = (pc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pc.userLeave(this.props.statename, this.props.room);
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
        this.setState({gameRunning: false})
        this.setState({info: player + " as left ! The party is over"})
    }

    firstround(data) {
        var score = [];
        this.state.names.forEach((name) => {
            score[name] = 0;
        });
        this.setState({scores: score});
        this.setState({gameRunning: true})
        this.nextRound(data);
    }

    nextRound(data) {
        if (data.hasOwnProperty("scoreToUpdate")) {
            var score = this.state.scores;
            score[data.scoreToUpdate]++;
            this.setState({scores: score})
        }
        this.setState({currentDrawer: data.player});
        this.setState({currentWord: data.word});
        if (this.props.statename === data.player) {
            this.setState({info: "Your turn ! you have to draw : " + data.word})
        } else {
            this.setState({info: "turn of " + data.player})
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
        this.props.closeChat();
        this.pc.userLeave(this.props.statename, this.props.room);
        if (this.state.gameRunning) {
            this.game.stopGame(this.props.statename, this.props.room);
        }
    }

    render() {
        var names;
        if (!this.state.gameRunning) {
            names = this.state.names.map((m) => <player key={m}> {m} </player>);
            this.button = <button onClick={this.startGame}>Start Game !</button>;
            this.timer = "";
        } else {
            this.timer = <Timer seconds={'100'} room={this.props.room} timeIsUp={this.timeIsUp}/>;
            this.button = "";
            names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);
        }
        return (
            <>
                <ChatWindow name={this.props.statename} onQuit={this.leave} msg={this.sendMsg}
                            room={this.props.room}/>
                <div id="nochat">
                    {this.timer}
                    <info>{this.state.info}</info>
                    <Canvas room={this.props.room}/>
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