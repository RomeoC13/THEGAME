import React from "react";
import {InputField} from "./InputField";
import {ChatClient} from "./ChatClient";

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



export {LoginWindow}