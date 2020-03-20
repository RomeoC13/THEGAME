import React from 'react';
import './App.css';
import {ChatClient} from './ChatClient.js';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        if (this.props.onChange) this.props.onChange(event.target.value);
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        if (this.props.onSubmit) this.props.onSubmit(this.state.value);
        this.setState({value: ""});
        event.preventDefault()
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <label>{this.props.label} </label>
            <input type="text" onChange={this.handleChange} value={this.state.value} autoFocus={this.props.autoFocus}/>
        </form>)
    }
}



class Canvas  extends React.Component {

    constructor(props) {
        super(props);
        this._resizeHandler = () => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.clearAndDraw();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this._resizeHandler);
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

    }

    /*componentWillUnmount() {
        window.removeEventListener('resize', this._resizeHandler);
    }*/


    componentDidUpdate(prevProps, prevState) {
        /*if (this.props.secondRect !== prevProps.secondRect) {
            this.clearAndDraw();
            this.clearCanvas();
        }*/
    }

    clearAndDraw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw(ctx);
        }
    }


    draw(ctx) {
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        if (this.props.secondRect) {
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(30, 30, 50, 50);
        }
    }

    //Todo : Faire la fonction de dessin + la fonction de clear du canvas
    render() {
        return (
            <div>
                <h1>Canvas</h1>
                <canvas ref={canvas => this.canvas = canvas} id="myCanvas" width="500" height="200" />
                <button ref = {this.dessinRef} onClick="TODO Fonction">Dessiner</button>
                <button onClick="TODO Fonction">Clear</button>
            </div>
        )
    }
}

class LoginWindow extends React.Component {
    render() {
        return <div>
            <h1>Chat</h1>
            <InputField label="Veuillez renter votre pseudo" onChange={this.props.onNameChange}
                        onSubmit={this.props.onLogin} autoFocus/>
            <button onClick={this.props.onLogin}>Valider</button>
        </div>
    }
}

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
        this.submitMessage = this.submitMessage.bind(this);
        this.addMessages = this.addMessages.bind(this);

        this.chat = new ChatClient(this.props.name);
        this.chat.onMessages(this.addMessages)
    }

    addMessages(messages) {
        this.setState((state, props) => ({
            messages: state.messages.concat(messages)
        }))
    }

    submitMessage(text) {
        this.chat.sendMessage(text)
    }

    render() {
        const messages = this.state.messages.map((m) => <li key={m.name + m.text}> {m.name}: {m.text} </li>);
        return (
            <div>
                <h1>Messages</h1>
                Pseudo : {this.props.name}
                <InputField label="Message" onSubmit={this.submitMessage} autoFocus/>
                <ul>
                    {messages}
                </ul>
                <button onClick={this.props.onQuit}>Quitter</button>
            </div>
        );
    }
}

class App extends React.Component {
    /*constructor() {
        super();
        this.state = {name:"",current: "login"};

        this.login= this.login.bind(this);
        this.back= this.back.bind(this)
    }

    login(){
        console.log("TEEEEEST");
        this.setState({current: "logged"} )
    }

    back(){
        this.setState({current:"login"})
    }
    render() {
        if(this.state.current === "login")
            return <MyForm login={this.login} />;
        else
            return <Pictionary back={this.back}/>
    }
}*/

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
            return <div>
                <ChatWindow name={this.state.name} onQuit={this.closeChat}/>
                <Canvas/>
            </div>
        }
    }
}

export default App;
