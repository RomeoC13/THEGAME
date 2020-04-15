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
        this.client = new PetitBacClient();
        this.game = new PictionaryClient();
        this.warningMessage ="";
        this.game = new GameClient();
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
    }

    start() {
        console.log("test");
        this.checkIfNameIsValid();
        this.checkIfCityIsValid();
        this.checkIfCountryIsValid();
        this.checkIfAnimalIsValid();
        this.checkIfFoodIsValid();
        this.checkIfObjectIsValid();
        this.checkIfMovieIsValid();
        this.checkIfSongIsValid();
        this.checkIfJobIsValid();
        //alert(this.state.scores);
    }


    componentDidMount = () => {
        this.client.emitUser(this.props.statename, this.props.room);
        this.client.updateUsers(this.setNames, this.props.room);
        this.setupBeforeUnloadListener(this.client);
        this.client.emitForm(this.Names, this.Job, this.City, this.Country,
            this.Animal, this.Objects, this.Movie, this.Food, this.Song, this.props.room);

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
        let Names = this.Names.values();
        for (const value of Names) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.name)
                    return true;
            }
        }
        return false;
    }

    CityAlreadyToken() {
        let City = this.City.values();
        for (const value of City) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.city)
                    return true;
            }
        }
        return false;
    }

    CountryAlreadyToken() {
        let Country = this.Country.values();
        for (const value of Country) {
            if (value.toString() === this.state.country)
                return true;
        }
        return false;
    }

    AnimalAlreadyToken() {
        let Animal = this.Animal.values();
        for (const value of Animal) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.animal)
                    return true;
            }
        }
        return false;
    }

    FoodAlreadyToken() {
        let Food = this.Food.values();
        for (const value of Food) {
            if (value.toString() === this.state.food)
                return true;
        }
        return false;
    }

    ObjectAlreadyToken() {
        let Object = this.Objects.values();
        for (const value of Object) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === this.state.object)
                    return true;
            }
        }
        return false;
    }

    JobAlreadyToken() {
        let Job = this.Job.values();
        for (const value of Job) {
            if (value.toString() === this.state.job)
                return true;
        }
        return false;
    }

    MovieAlreadyToken() {
        let Movie = this.Movie.values();
        for (const value of Movie) {
            if (value.toString() === this.state.movie)
                return true;
        }
        return false;
    }

    SongAlreadyToken() {
        let Song = this.Song.values();
        for (const value of Song) {
            if (value.toString() === this.state.song)
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

export {PetitBac}