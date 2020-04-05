import React from "react";
import {InputField} from "./InputField";

class PetitBac extends React.Component {
    render() {
        return <div>

            <label>Please enter a letter to play </label> <br/>
            <InputField onChange={this.props.onLetterChange} onSubmit={this.props.onStart} autoFocus required/>
            <button onClick={this.props.onStart}>Enter</button>
        </div>
    }
}

export {PetitBac}