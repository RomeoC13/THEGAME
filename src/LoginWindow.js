import React from "react";
import {InputField} from "./InputField";

class LoginWindow extends React.Component {
    render() {
        return <div>
            <h1>Welcome to <strong id ="name">THE GAME</strong></h1>
            <strong>{this.props.warning}</strong>
            <label>Please enter your alias </label> <br/>
            <InputField onChange={this.props.onNameChange} onSubmit={this.props.onLogin} autoFocus required/>
            <label>Choose your room </label> <br/>
            <discret>(default room 0)</discret> <br/>
            <input type="number" onChange={this.props.onRoomChange}/> <br/>
            <label>Choose your game </label> <br/>
            <strong>(0 for Pictionnary)</strong> <br/>
            <strong>(1 for Petit Bac)</strong> <br/>
            <discret>(default Pictionnary)</discret> <br/>
            <input type="number" onChange={this.props.onGameChange}/> <br/>
            <button onClick={this.props.onLogin}>Enter</button>
        </div>
    }
}

export {LoginWindow}