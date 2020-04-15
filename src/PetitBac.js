import React from "react";
import {PetitBacClient, PictionaryClient} from "./Clients";
import {FormPB} from "./FormPB";

class PetitBac extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: [],
            info: "",
            scores: [],
            currentState : "",
            Names: [], City: [], Country: [],
            Animal: [], Food: [], Objects: [],
            Job: [], Movie: [], Song: [],
            name :'', city :'', country:'',
            animal:'', food :'', object: '',
            job : '', movie :' ', song :'',
        };

        this.client = new PetitBacClient();
        this.game = new PictionaryClient();
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

    start(data) {
        console.log("test");
        this.checkIfNameIsValid(data);
        this.checkIfCityIsValid(data);
        this.checkIfCountryIsValid(data);
        this.checkIfAnimalIsValid(data);
        this.checkIfFoodIsValid(data);
        this.checkIfObjectIsValid(data);
        this.checkIfMovieIsValid(data);
        this.checkIfSongIsValid(data);
        this.checkIfJobIsValid(data);

    }

    checkIfInputStartsWithTheCorrectLetter(input){
        return input.startsWith(this.props.letter);
    }

    checkIfNameIsValid(){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.name)){
            if(this.NamesAlreadyToken() === false){
                this.state.Names.push(this.state.name)
                    var score = this.state.scores[this.props.name];
                    score[this.props.name]++;
                    this.setState({scores: score})
                }
            }
        }



    checkIfCityIsValid(){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.city)){
            if(this.CityAlreadyToken() === false){
                this.state.City.push(this.state.city)
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfCountryIsValid(){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.country)){
            if(this.CountryAlreadyToken() === false){
                this.state.Country.push(this.state.country)
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfAnimalIsValid(){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.animal)){
            if(this.AnimalAlreadyToken() === false){
                this.state.Animal.push(this.state.animal)
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfFoodIsValid(){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.food)){
            if(this.FoodAlreadyToken() === false){
                this.state.Food.push(this.state.food)
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfObjectIsValid(data){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.object)){
            if(this.ObjectAlreadyToken() === false){
                this.state.Objects.push(this.state.object)
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfMovieIsValid(data){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.movie)){
            if(this.MovieAlreadyToken() === false){
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfSongIsValid(data){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.song)){
            if(this.SongAlreadyToken() === false){
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    checkIfJobIsValid(data){
        if(this.checkIfInputStartsWithTheCorrectLetter(this.state.job)){
            if(this.JobAlreadyToken() === false){
                var score = this.state.scores[this.props.name];
                score[this.props.name]++;
                this.setState({scores: score})
            }
        }
    }

    NamesAlreadyToken() {
        let Names = this.state.Names.values();
        for (const value of Names) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.name)
                    return true;
            }
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