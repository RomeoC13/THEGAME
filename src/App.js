import React from 'react';
import './App.css';
import {Pictionary} from "./Pictionary.js";
import {LoginWindow} from "./LoginWindow.js";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", current: "login"};

        this.closeChat = this.closeChat.bind(this);
        this.startChat = this.startChat.bind(this);
        this.setName = this.setName.bind(this)
    }

    closeChat() {
        this.setState({current: "login"})
    }

    startChat() {
        this.setState({current: "chat"})
    }

    setName(name) {
        this.setState({name: name})
    }

    render() {
        if (this.state.current === "login")
            return <div>
                <LoginWindow onNameChange={this.setName} onLogin={this.startChat}/>
                </div>;
        else{
            return <Pictionary statename={this.state.name} closeChat={this.closeChat}  />
        }
    }
}

export default App;
