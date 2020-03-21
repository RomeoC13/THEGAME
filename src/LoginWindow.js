import React from "react";
import {InputField} from "./InputField";

class LoginWindow extends React.Component {
    render() {
        return <div>
            <h1>Welcome to <strong>THE GAME</strong></h1>
            <InputField label="Veuillez renter votre pseudo" onChange={this.props.onNameChange}
                        onSubmit={this.props.onLogin} autoFocus/>
            <button onClick={this.props.onLogin}>Enter</button>
        </div>
    }
}


export {LoginWindow}