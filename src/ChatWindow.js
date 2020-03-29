import React from "react";
import {ChatClient} from "./ChatClient";
import {InputField} from "./InputField";

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};

        this.submitMessage = this.submitMessage.bind(this);
        this.addMessages = this.addMessages.bind(this);

        this.chat = new ChatClient(this.props.name);
        this.chat.onMessages(this.addMessages, this.props.room)
    }

    addMessages(messages) {
        this.setState((state, props) => ({
            messages: state.messages.concat(messages)
        }))
        this.props.msg(messages)
    }

    submitMessage(text) {
        this.chat.sendMessage(text,this.props.room)

    }

    render() {
        const messages = this.state.messages.map((m) => <p key={m.name+m.text}> {m.name}: {m.text} </p>);
        return (
            <div id="chat">
                <div id="topchat">
                    <p>Welcome to THECHAT, {this.props.name}</p>
                </div>
                <ul>
                    {messages}
                </ul>

                <InputField label="Message" onSubmit={this.submitMessage} autoFocus/>
                <button onClick={this.props.onQuit}>Quit this room</button>
            </div>
        );
    }
}

export {ChatWindow}