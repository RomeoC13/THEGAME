import React from "react";
import {ChatClient} from "../Clients";
import {InputField} from "../WelcomePage/InputField";

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};

        this.submitMessage = this.submitMessage.bind(this);
        this.addMessages = this.addMessages.bind(this);

        this.chat = new ChatClient(this.props.name);
        this.chat.onMessages(this.addMessages, this.props.room)
        this.scroll = '';
    }

    //Add message in the state
    addMessages(messages) {
        this.setState((state) => ({
            messages: state.messages.concat(messages)
        }))
        this.props.msg(messages)
    }

    //Send message in the room
    submitMessage(text) {
        this.chat.sendMessage(text, this.props.room)
    }

    //Scroll system for tchat
    componentDidMount = () => {
        document.querySelector("#messages").scrollTop=document.querySelector("#messages").scrollHeight;
    };

    componentDidUpdate = () => {
        document.querySelector("#messages").scrollTop=document.querySelector("#messages").scrollHeight;
    }

    //Visual render
    render() {
        const messages = this.state.messages.map((m) => <p key={this.state.messages.indexOf(m)}> <b> {m.name} </b>: {m.text} </p>);
        return (
            <div id="chat">
                <div id="topchat">
                    <p>Welcome to THECHAT, {this.props.name}</p>
                </div>
                <div id="messages" ref={(ref) => (this.scroll = ref)}>
                    {messages}
                </div>

                <InputField label="Message" onSubmit={this.submitMessage} autoFocus/>
                <button onClick={this.props.onQuit}>Quit this room</button>
            </div>
        );
    }
}

export {ChatWindow}