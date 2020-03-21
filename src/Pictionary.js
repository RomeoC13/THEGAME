import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";

import React from "react";

class Pictionary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: "", names: []};
        this.addName(this.props.statename);
        this.addName = this.addName.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }

    sendMsg(text) {
        this.setState({message: text})
    }

    addName(name) {
        this.setState((state, props) => ({
            names: state.names.concat(name)
        }))
    }


    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <Timer/>
                <ChatWindow name={this.props.statename} onQuit={this.props.closeChat} msg={this.sendMsg}/>
                <Canvas/>
            </div>
        )
    }
}
export { Pictionary }