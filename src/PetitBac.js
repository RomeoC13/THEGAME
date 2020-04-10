import React from "react";
import {Timer} from "./Timer";
import {GameClient, PetitBacClient,} from "./Clients";

class PetitBac extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: [], info: "", currentLetter : "" ,scores: [], gameRunning: false,
            Names: [], City: [], Country: [], Animal: [], Food: [], Object: [], Job: [], Movie: [], Song: []
        };

        this.setNames = this.setNames.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

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


    componentDidMount() {
        //this.client.updateUsers(this.setNames, this.props.room);
       // this.client.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pc);
        this.game.listenRound(this.nextRound, this.props.room);
        this.game.listenEndGame(this.endGame, this.props.room);
    }

    componentWillUnmount() {
        this.client.userLeave(this.props.statename);
    }

    setNames = (name) => {
        this.setState({names: name})
    };

    setupBeforeUnloadListener = (pc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pc.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                this.game.stopGame(this.props.statename, this.props.room);
            }
            return ev.returnValue = "test";
        });
    };


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