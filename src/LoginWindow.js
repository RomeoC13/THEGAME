import React from "react";
import {InputField} from "./InputField";

class LoginWindow extends React.Component {
    render() {
        return <div>
            <strong>{this.props.warning}</strong> <br/>
            <label>Please enter your alias </label> <br/>
            <InputField onChange={this.props.onNameChange} onSubmit={this.props.onLogin} autoFocus required/> <br/>
            <label>Choose your room </label> <br/>
            <label class="discret">(default room 0)</label>
            <br/>
            <input type="number" onChange={this.props.onRoomChange}/> <br/> <br/>
            <label>Choose your game </label> <br/>
            <div onChange={event => this.props.onGameChange(event)}>
                <table id="gameTable">
                    <tr>
                        <td><input type="radio" id="gameChoice1" name="game" value="Pictionary" defaultChecked/></td>
                        <td><input type="radio" id="gameChoice1" name="game" value="PetitBac"/></td>
                        <td><input type="radio" id="gameChoice1" name="game" value="Demineur"/></td>
                    </tr>
                    <tr>
                        <td><b>Pictionary </b> <br/>
                            <i> at least 2 players </i> <br/>
                            <i class="discret">it's a very funny game to play with friend, one of you will have a name
                                to draw a word, all others tries to guess what is it !</i>
                        </td>
                        <td><b>PetitBac</b> <br/>
                            <i> at least 2 players</i> <br/>
                            <i class="discret">quite hard game, a letter is randomly chosen and everyone have to find
                                words that starts with it</i>
                        </td>
                        <td><b>Demineur</b> <br/>
                            <i> at least 1 player</i> <br/>
                            <i class="discret">a very old and known game, you start with a grid of bloc and some are
                                trapped with bomb, your mission avoid them </i>
                        </td>
                    </tr>
                </table>


            </div>
            <button onClick={this.props.onLogin}>Enter</button>
        </div>
    }
}


export {LoginWindow}