import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js";
import {Timer} from "./Timer.js";

import React from "react";

class Pictionary extends React.Component{
    constructor(props) {
        super(props);
        this.state={message: "",names :{}};

        this.sendMsg = this.sendMsg.bind(this);
    }


    sendMsg(text) {
        this.setState({message: text})
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <ChatWindow name={this.props.statename} onQuit={this.props.closeChat} msg={this.sendMsg}/>
                <Canvas/>
            </div>
        )
    }
}
export { Pictionary }