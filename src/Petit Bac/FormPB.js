import React from "react";
import {InputField} from "../WelcomePage/InputField";

class FormPB extends React.Component {
    render() {

        return <div>
            {this.warningMessage}
            Letter : {this.props.letter} <br/>
            <label>Name </label> <br/>
            <InputField onChange={this.props.onNameChange}/><br/>
            <label>City </label> <br/>
            <InputField onChange={this.props.onCityChange}/><br/>
            <label>Country</label> <br/>
            <InputField onChange={this.props.onCountryChange}/><br/>
            <label>Animal </label> <br/>
            <InputField onChange={this.props.onAnimalChange}/><br/>
            <label>Food </label> <br/>
            <InputField onChange={this.props.onFoodChange}/><br/>
            <label>Object</label> <br/>
            <InputField onChange={this.props.onObjectChange}/><br/>
            <label>Job</label> <br/>
            <InputField onChange={this.props.onJobChange}/><br/>
            <label>Movie </label> <br/>
            <InputField onChange={this.props.onMovieChange}/><br/>
            <label>Song </label> <br/>
            <InputField onChange={this.props.onSongChange}/><br/>
            <button onClick={this.props.onSubmit}> Finish !</button>
        </div>
    }
}


export {FormPB}