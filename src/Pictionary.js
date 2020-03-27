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


    }

    sendMsg(text) {
        this.setState({message: text})
    }

    setNames = (name) => {
        this.setState({names: name})
    }

    componentDidMount() {
        const pc = new PictionaryClient();
        pc.updateUsers(this.setNames);
        pc.emitUser(this.props.statename);
        pc.print("print");
        this.setupBeforeUnloadListener(pc);

    }

    setupBeforeUnloadListener = (pc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pc.userLeave(this.props.statename);
            return ev.returnValue = "test";
        });
    }

    render() {
        //<h1>{this.state.message}</h1>
        const names = this.state.names.map((m) => <font> {m} </font>);
        return (
            <div>
                <Timer seconds={'20'}/>
                <ChatWindow name={this.props.statename} onQuit={this.props.closeChat} msg={this.sendMsg}/>
                <Canvas/>
                <div id="players-list">
                    <h4>Joueurs en ligne </h4>
                    <p> {names} </p>
                </div>
            </div>
        )
    }
}


export {Pictionary}