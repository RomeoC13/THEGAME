import React from "react";
import {Timer} from "./Timer";
import {PetitBac} from "./PetitBac";

class PetitBacStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            letter: this.randomLetter(),
            names: [],
            info: "",
            currentLetter: "",
            scores: [],
            gameRunning: false,
            Names: [], City: [], Country: [], Animal: [], Food: [], Object: [], Job: [], Movie: [], Song: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    randomLetter() {
        var letters = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        ];
        var wordcount = Math.floor(Math.random() * (letters.length));
        return letters[wordcount];
    }

    handleClick(){
        //alert('Appeler PETITBAC');
        this.setState({gameRunning : true})
    }

    render() {
        var names;
        if (!this.state.endGame) {
            names = this.state.names.map((m) => <player key={m}> {m} </player>);
            this.button = <button onClick={this.endGame}> Finish !</button>;
            this.timer = "";
        } else {
            this.timer = <Timer seconds={'100'} room={this.props.room} timeIsUp={this.timeIsUp}/>;
            this.button = <button onClick={this.endGame}> Finish !</button>;
            names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);
        }

        if(this.state.gameRunning === true){
            return <PetitBac/>
        }
        return <div>
            THE LETTER IS : {this.state.letter}
            <button onClick={this.handleClick}>Start Playing !</button>

            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>
        </div>
    }
}

export {PetitBacStart}