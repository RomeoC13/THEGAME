import {ChatWindow} from "./ChatWindow.js";
import {Canvas} from "./Canvas.js"
import React from "react";

class Pictionary extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ChatWindow name={this.props.statename} onQuit={this.props.closeChat}/>
                <Canvas/>
            </div>
        )
    }
}
export { Pictionary }