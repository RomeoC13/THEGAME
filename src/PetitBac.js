import React from "react";
import {GameClient, PetitBacClient,} from "./Clients";

class PetitBac extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: [], info: "", scores: [],
            Names: [], City: [], Country: [], Animal: [], Food: [], Object: [], Job: [], Movie: [], Song: []
        };

        this.client = new PetitBacClient();
        this.game = new GameClient();
        /*this.setNames = this.setNames().bind(this);
        this.setCity = this.setCity().bind(this);
        this.setCountry = this.setCountry().bind(this);
        this.setAnimal = this.setAnimal().bind(this);
        this.setFood = this.setFood().bind(this);
        this.setObject = this.setObject().bind(this);
        this.setJob = this.setJob().bind(this);
        this.setMovie = this.setMovie().bind(this);
        this.setSong = this.setSong().bind(this);*/
    }



    /*setNames(names) {
        this.setState({Names: names.target.value})
    }
    setCity(city) {
        this.setState({City: city.target.value})
    }
    setCountry(country) {
        this.setState({Country: country.target.value})
    }
    setAnimal(animal) {
        this.setState({Animal: animal.target.value})
    }
    setFood(food) {
        this.setState({Food: food.target.value})
    }
    setObject(object) {
        this.setState({Object: object.target.value})
    }
    setJob(job) {
        this.setState({Job: job.target.value})
    }
    setMovie(movie) {
        this.setState({Movie: movie.target.value})
    }
    setSong(song) {
        this.setState({Song: song.target.value})
    }*/


    render() {
        return <div>
            Letter : {this.props.letter} <br/>
            Room : {this.props.room} <br/>
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
            <button onClick={this.endGame}> Finish !</button>

        </div>
    }
}

export {PetitBac}