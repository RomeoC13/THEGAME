import React from "react";
import {InputField} from "./InputField";

class PetitBac extends React.Component {
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
        return <div>
            <div>
                LETTER : {this.props.letter}
            </div>

            <label>Name </label> <br/>
            <input onChange={this.props.onPBNameChange}/><br/>
            <label>City </label> <br/>
            <input onChange={this.props.onPBCityChange}/><br/>
            <label>Country</label> <br/>
            <input onChange={this.props.onPBCountryChange}/><br/>
            <label>Animal </label> <br/>
            <input onChange={this.props.onPBAnimalChange}/><br/>
            <label>Food </label> <br/>
            <input onChange={this.props.onPBFoodChange}/><br/>
            <label>Object</label> <br/>
            <input onChange={this.props.onPBObjectChange}/><br/>
            <label>Job</label> <br/>
            <input onChange={this.props.onPBJobChange}/><br/>
            <label>Movie </label> <br/>
            <input onChange={this.props.onPBMovieChange}/><br/>
            <label>Song </label> <br/>
            <input onChange={this.props.onPBSongChange}/><br/>
            {this.button}
            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>
        </div>
    }
}
export {PetitBac}