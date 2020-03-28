import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";
import {PictionaryClient} from "./PictionaryClient";
import React from "react";

class Pictionary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {message: "", names: []};
        this.setNames = this.setNames.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.pc = new PictionaryClient();
    }

    sendMsg(text) {
        this.setState({message: text})
    }

    setNames = (name) => {
        this.setState({names: name})
    };

    componentDidMount() {
        this.pc.updateUsers(this.setNames, this.props.room);
        this.pc.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pc);
    }

    componentWillUnmount() {
        this.pc.userLeave(this.props.statename);
    }

    setupBeforeUnloadListener = (pc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pc.userLeave(this.props.statename, this.props.room);
            return ev.returnValue = "test";
        });
    };

    startgame() {

    }


    render() {
        //<h1>{this.state.message}</h1>
        const names = this.state.names.map((m) => <u key={m}> {m} </u>);
        return (
            <div>
                <Timer seconds={'20'} room={this.props.room}/>
                <ChatWindow name={this.props.statename} onQuit={this.props.closeChat} msg={this.sendMsg} room={this.props.room}/>
                <Canvas/>
                <button onClick={this.startgame}>Start Game !</button>
                <div id="players-list">
                    <h4>Joueurs en ligne in room {this.props.room} </h4>
                    <p> {names} </p>
                </div>
            </div>
        )
    }
}

export {Pictionary}