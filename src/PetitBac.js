import React from "react";
import {GameClient, PetitBacClient,} from "./Clients";
import {FormPB} from "./FormPB";

class PetitBac extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: [], info: "", scores: [],
            currentState : "",
            Names: [], City: [], Country: [],
            Animal: [], Food: [], Objects: [],
            Job: [], Movie: [], Song: [],
            name :'', city :'', country:'',
            animal:'', food :'', object: '',
            job : '', movie :' ', song :'',
        };

        this.client = new PetitBacClient();
        this.game = new GameClient();
        this.warningMessage ="";

        this.start = this.start.bind(this);
        this.setName = this.setName.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setAnimal = this.setAnimal.bind(this);
        this.setFood = this.setFood.bind(this);
        this.setObject = this.setObject.bind(this);
        this.setJob = this.setJob.bind(this);
        this.setMovie = this.setMovie.bind(this);
        this.setSong = this.setSong.bind(this);

        this.NamesAlreadyToken = this.NamesAlreadyToken.bind(this);
        this.CityAlreadyToken = this.CityAlreadyToken.bind(this);
        this.CountryAlreadyToken = this.CountryAlreadyToken.bind(this);
        this.AnimalAlreadyToken = this.AnimalAlreadyToken.bind(this);
        this.FoodAlreadyToken = this.FoodAlreadyToken.bind(this);
        this.ObjectAlreadyToken = this.ObjectAlreadyToken.bind(this);
        this.JobAlreadyToken = this.JobAlreadyToken.bind(this);
        this.MovieAlreadyToken = this.MovieAlreadyToken.bind(this);
        this.SongAlreadyToken = this.SongAlreadyToken.bind(this);
    }

    start() {
        //TODO : AJOUTER LES BONS MOTS DANS LES TABLEAUX AVANT DE CHECK POUR LES AUTRES CLIENTS
        this.checkIfNameIsValid();
        this.checkIfCityIsValid();
        this.checkIfCountryIsValid();
        this.checkIfAnimalIsValid();
        this.checkIfFoodIsValid();
        this.checkIfObjectIsValid();
        this.checkIfMovieIsValid();
        this.checkIfSongIsValid();
        this.checkIfJobIsValid();
    }

    checkIfInputStartsWithTheCorrectLetter(input){
        return input.startsWith(this.props.letter);
    }


    checkIfNameIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.name)){
            if(this.NamesAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }


    checkIfCityIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.city)){
            if(this.CityAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfCountryIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.country)){
            if(this.CountryAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfAnimalIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.animal)){
            if(this.AnimalAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfFoodIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.food)){
            if(this.FoodAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfObjectIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.object)){
            if(this.ObjectAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfMovieIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.movie)){
            if(this.MovieAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfSongIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.song)){
            if(this.SongAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    checkIfJobIsValid(){
        let score =0;
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.job)){
            if(this.JobAlreadyToken() === false){
                score++;
            }
        }
        return score;
    }

    NamesAlreadyToken() {
        let Names = this.state.Names.values();
        for (const value of Names) {
            if (value.toString() === this.state.name)
                return true;
        }
        return false;
    }

    CityAlreadyToken() {
        let City = this.state.City.values();
        for (const value of City) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.city)
                    return true;
            }
        }
        return false;
    }

    CountryAlreadyToken() {
        let Country = this.state.Country.values();
        for (const value of Country) {
            if (value.toString() === this.state.country)
                return true;
        }
        return false;
    }

    AnimalAlreadyToken() {
        let Animal = this.state.Animal.values();
        for (const value of Animal) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.animal)
                    return true;
            }
        }
        return false;
    }

    FoodAlreadyToken() {
        let Food = this.state.Food.values();
        for (const value of Food) {
            if (value.toString() === this.state.food)
                return true;
        }
        return false;
    }

    ObjectAlreadyToken() {
        let Object = this.state.Objects.values();
        for (const value of Object) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.object)
                    return true;
            }
        }
        return false;
    }

    JobAlreadyToken() {
        let Job = this.state.Job.values();
        for (const value of Job) {
            if (value.toString() === this.state.job)
                return true;
        }
        return false;
    }

    MovieAlreadyToken() {
        let Movie = this.state.Movie.values();
        for (const value of Movie) {
            if (value.toString() === this.state.movie)
                return true;
        }
        return false;
    }

    SongAlreadyToken() {
        let Song = this.state.Song.values();
        for (const value of Song) {
            if (value.toString() === this.state.song)
                return true;
        }
        return false;
    }


    setName(name) {
        this.setState({name : name})
    }

    setCity(city) {
        this.setState({city: city})
    }
    setCountry(country) {
        this.setState({country: country})
    }
    setAnimal(animal) {
        this.setState({animal: animal})
    }
    setFood(food) {
        this.setState({food: food})
    }
    setObject(object) {
        this.setState({object: object})
    }
    setJob(job) {
        this.setState({job: job})
    }
    setMovie(movie) {
        this.setState({movie: movie})
    }
    setSong(song) {
        this.setState({song: song})
    }

    render() {
        return <div>
           <FormPB warning = {this.warningMessage}
                   letter = {this.props.letter}
                   room = {this.props.room}
                   onNameChange={this.setName}
                   onCityChange={this.setCity}
                   onCountryChange={this.setCountry}
                   onAnimalChange={this.setAnimal}
                   onFoodChange={this.setFood}
                   onObjectChange={this.setObject}
                   onJobChange={this.setJob}
                   onMovieChange={this.setMovie}
                   onSongChange={this.setSong}
                   onSubmit={this.start}
           />

        </div>
    }
}

export {PetitBac}