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
            Animal: [], Food: [], Object: [],
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
        alert(this.state.city)
    }



    NamesAlreadyToken(name) {
        let Names = this.state.Names.values();
        for (const value of Names) {
            if (value.toString() === name)
                return true;
        }
        return false;
    }

    CityAlreadyToken(city) {
        let City = this.state.City.values();
        for (const value of City) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === city)
                    return true;
            }
        }
        return false;
    }

    CountryAlreadyToken(country) {
        let Country = this.state.Country.values();
        for (const value of Country) {
            if (value.toString() === country)
                return true;
        }
        return false;
    }

    AnimalAlreadyToken(animal) {
        let Animal = this.state.Animal.values();
        for (const value of Animal) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === animal)
                    return true;
            }
        }
        return false;
    }

    FoodAlreadyToken(food) {
        let Food = this.state.Food.values();
        for (const value of Food) {
            if (value.toString() === food)
                return true;
        }
        return false;
    }

    ObjectAlreadyToken(object) {
        let Object = this.state.Object.values();
        for (const value of Object) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === object)
                    return true;
            }
        }
        return false;
    }

    JobAlreadyToken(job) {
        let Job = this.state.Job.values();
        for (const value of Job) {
            if (value.toString() === job)
                return true;
        }
        return false;
    }

    MovieAlreadyToken(movie) {
        let Movie = this.state.Movie.values();
        for (const value of Movie) {
            if (value.toString() === movie)
                return true;
        }
        return false;
    }

    SongAlreadyToken(song) {
        let Song = this.state.Song.values();
        for (const value of Song) {
            if (value.toString() === song)
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