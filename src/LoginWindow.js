import React from "react";
import {InputField} from "./InputField";

class LoginWindow extends React.Component {
    render() {
        return <div>
            <h1>Welcome to <strong id ="name">THE GAME</strong></h1> <br/>
            <strong>{this.props.warning}</strong> <br/>
            <label>Please enter your alias </label> <br/>
            <InputField onChange={this.props.onNameChange} onSubmit={this.props.onLogin} autoFocus required/> <br/>
            <label>Choose your room </label> <br/>
            <discret>(default room 0)</discret> <br/>
            <input type="number" onChange={this.props.onRoomChange}/> <br/> <br/>
            <label>Choose your game </label> <br/>
            <select id="game-select" onChange={this.props.onGameChange}>
                <option value="0">Pictionnary</option>
                <option value="1">Petit Bac</option>
            </select> <br/>
            <button onClick={this.props.onLogin}>Enter</button>
        </div>
    }
}


export {LoginWindow}