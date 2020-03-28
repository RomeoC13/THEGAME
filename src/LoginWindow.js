import React from "react";
import {InputField} from "./InputField";

class LoginWindow extends React.Component {
    render() {
        return <div>
            <h1>Welcome to <strong>THE GAME</strong></h1>
            <strong>{this.props.warning}</strong>
            <InputField label="Please enter your alias" onChange={this.props.onNameChange}
                        onSubmit={this.props.onLogin} autoFocus required/>
            <label>Choose your room </label> <br/> <discret>(default room 0)</discret> <br/>
            <input type="number" onChange={this.props.onRoomChange}
            />
            <br/>
            <button onClick={this.props.onLogin}>Enter</button>
        </div>
    }
}


export {LoginWindow}