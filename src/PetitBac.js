import React from "react";
import {PetitBacClient, PlayerListClient} from "./Clients";
import {FormPB} from "./FormPB";

class PetitBac extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [],
            scores: [],
            currentState: "",

            name: '', city: '', country: '',
            animal: '', food: '', object: '',
            job: '', movie: ' ', song: '',
        };

        this.Names = [];
        this.City = [];
        this.Country = [];
        this.Animal = [];
        this.Food = [];
        this.Objects = [];
        this.Job = [];
        this.Movie = [];
        this.Song = [];
        this.pbc = new PetitBacClient();
        this.playerList = new PlayerListClient(this.props.room);
        this.warningMessage = "";

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


        this.updateNamesForm = this.updateNamesForm.bind(this);
        this.updateCityForm = this.updateCityForm.bind(this);
        this.updateCountryForm = this.updateCountryForm.bind(this);
        this.updateAnimalForm = this.updateAnimalForm.bind(this);
        this.updateFoodForm = this.updateFoodForm.bind(this);
        this.updateJobForm = this.updateJobForm.bind(this);
        this.updateMoviesForm = this.updateMoviesForm.bind(this);
        this.updateObjectsForm = this.updateObjectsForm.bind(this);
        this.updateSongForm = this.updateSongForm.bind(this);

        this.endGame = this.endGame.bind(this);
    }

    start() {

        this.checkIfNameIsValid();
        this.checkIfCityIsValid();
        this.checkIfCountryIsValid();
        this.checkIfAnimalIsValid();
        this.checkIfFoodIsValid();
        this.checkIfObjectIsValid();
        this.checkIfMovieIsValid();
        this.checkIfSongIsValid();
        this.checkIfJobIsValid();
        //TODO : Verifier l'émission du formulaire pour la synchro
        this.pbc.emitForm(this.Names, this.Job, this.City, this.Country,
            this.Animal, this.Objects, this.Movie, this.Food, this.Song, this.props.room);

        this.pbc.endForOnePlayer(this.props.statename, this.props.room);
        this.setState({currentState: "playerHasFinished"});
    }

    componentDidMount = () => {
        this.pbc.emitUser(this.props.statename, this.props.room);
        this.playerList.updateUsers(this.setNames);
        this.setupBeforeUnloadListener(this.pbc);

        this.pbc.updateNames(this.updateNamesForm, this.props.room);
        this.pbc.updateCity(this.updateCityForm, this.props.room);
        this.pbc.updateCountry(this.updateCountryForm, this.props.room);
        this.pbc.updateAnimal(this.updateAnimalForm, this.props.room);
        this.pbc.updateFood(this.updateFoodForm, this.props.room);
        this.pbc.updateJob(this.updateJobForm, this.props.room);
        this.pbc.updateMovie(this.updateMoviesForm, this.props.room);
        this.pbc.updateObjects(this.updateObjectsForm, this.props.room);
        this.pbc.updateSong(this.updateSongForm, this.props.room);

        this.pbc.listenEndGame(this.endGame, this.props.room);
    }

    //TODO : Verifier la synchro avec les autres membres pour comparer les mots sur une même liste...


    updateNamesForm = (name) => {
        this.Names = name;
    }
    updateCityForm = (city) => {
        this.City = city;
    }
    updateCountryForm = (country) => {
        this.Country = country;
    }
    updateAnimalForm = (animal) => {
        this.Animal = animal;
    }
    updateFoodForm = (food) => {
        this.Food = food;
    }
    updateJobForm = (job) => {
        this.Job = job;
    }
    updateMoviesForm = (movie) => {
        this.Movie = movie;
    }
    updateObjectsForm = (object) => {
        this.Objects = object;
    }
    updateSongForm = (song) => {
        this.Song = song;
    }


    endGame() {
        this.setState({currentState: "everyOneHasFinished"});
    }

    setupBeforeUnloadListener = (client) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            client.userLeave(this.props.statename, this.props.room);
            return ev.returnValue = "test";
        });
    };

    checkIfInputStartsWithTheCorrectLetter(input) {
        let min = this.props.letter.toLowerCase();
        let maj = this.props.letter.toUpperCase();
        if (input.startsWith(min)) {
            return true;
        }
        return input.startsWith(maj);
    }

    checkIfNameIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.name)) {
            if (this.NamesAlreadyToken() === false) {
                this.Names.push(this.state.name);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfCityIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.city)) {
            if (this.CityAlreadyToken() === false) {
                this.City.push(this.state.city);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfCountryIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.country)) {
            if (this.CountryAlreadyToken() === false) {
                this.Country.push(this.state.country);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfAnimalIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.animal)) {
            if (this.AnimalAlreadyToken() === false) {
                this.Animal.push(this.state.animal);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfFoodIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.food)) {
            if (this.FoodAlreadyToken() === false) {
                this.Food.push(this.state.food);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfObjectIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.object)) {
            if (this.ObjectAlreadyToken() === false) {
                this.Objects.push(this.state.object);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfMovieIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.movie)) {
            if (this.MovieAlreadyToken() === false) {
                this.Movie.push(this.state.movie);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfSongIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.song)) {
            if (this.SongAlreadyToken() === false) {
                this.Song.push(this.state.song);
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    checkIfJobIsValid() {
        if (this.checkIfInputStartsWithTheCorrectLetter(this.state.job)) {
            if (this.JobAlreadyToken() === false) {
                this.Job.push(this.state.job)
                let score = this.state.scores[this.props.name];
                this.setState({scores: score + 2})
            }
        }
    }

    NamesAlreadyToken() {
        for (let i = 0; i < this.Names.length; i++) {
            if (this.Names[i] === this.state.name)
                return true;
        }
        return false;
    }

    CityAlreadyToken() {
        for (let i = 0; i < this.City.length; i++) {
            if (this.City[i] === this.state.city)
                return true;
        }
        return false;
    }

    CountryAlreadyToken() {
        for (let i = 0; i < this.Country.length; i++) {
            if (this.Country[i] === this.state.country)
                return true;
        }
        return false;
    }

    AnimalAlreadyToken() {
        for (let i = 0; i < this.Animal.length; i++) {
            if (this.Animal[i] === this.state.animal)
                return true;
        }
        return false;
    }

    FoodAlreadyToken() {
        for (let i = 0; i < this.Food.length; i++) {
            if (this.Food[i] === this.state.food)
                return true;
        }
        return false;
    }

    ObjectAlreadyToken() {
        for (let i = 0; i < this.Objects.length; i++) {
            if (this.Objects[i] === this.state.object)
                return true;
        }
        return false;
    }

    JobAlreadyToken() {
        for (let i = 0; i < this.Job.length; i++) {
            if (this.Job[i] === this.state.job)
                return true;
        }
        return false;
    }

    MovieAlreadyToken() {
        for (let i = 0; i < this.Movie.length; i++) {
            if (this.Movie[i] === this.state.movie)
                return true;
        }
        return false;
    }

    SongAlreadyToken() {
        for (let i = 0; i < this.Song.length; i++) {
            if (this.Song[i] === this.state.song)
                return true;
        }
        return false;
    }


    setName(name) {
        this.setState({name: name})
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
        if (this.state.currentState === "playerHasFinished") {
            return <div>En attente des autres joueurs !</div>
        }

        if (this.state.currentState === "everyOneHasFinished") {
            let names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);
            return <div>{names}</div>
        } else {
            this.button = <button onClick={this.endGame}> Finish !</button>;
            let names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);

            return <div>
                <FormPB warning={this.warningMessage}
                        letter={this.props.letter}
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
                {names}
            </div>
        }
    }
}

export {PetitBac}