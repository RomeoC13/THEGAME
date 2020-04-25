import React from "react";
import {PetitBac} from "./PetitBac";
import {PetitBacClient, PictionaryClient, PlayerListClient} from "../Clients";

class PetitBacStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [],
            info: "",
            gameRunning: false,
        };

        this.setNames = this.setNames.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.startGame = this.startGame.bind(this);
        this.listenForm = this.listenForm.bind(this);

        this.endGame = this.endGame.bind(this);
        this.leave = this.leave.bind(this);

        this.pbc = new PetitBacClient();
        this.game = new PictionaryClient();
        this.playerList = new PlayerListClient(this.props.room);
    }

    setNames = (name) => {
        this.setState({names: name})
    };


    componentDidMount() {
        this.playerList.updateUsers(this.setNames);
        this.pbc.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pbc);
        this.pbc.listenPetitBacLetter(this.listenForm, this.props.room);
    }


    componentWillUnmount() {
        this.pbc.userLeave(this.props.statename, this.props.room);
    }

    setupBeforeUnloadListener = (pbc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pbc.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                this.pbc.stopGame(this.props.statename, this.props.room);
            }
            return ev.returnValue = "test";
        });
    };


    startGame() {
        if (this.state.names.length < 2) {
            // eslint-disable-next-line no-useless-escape
            alert("You can't play Petit Bac game alone ¯\\_(ツ)_/¯, you must at least be 2 !");
        } else {
            this.pbc.startPetitBac(this.props.room)
        }
    }


    listenForm(data) {
        var score = [];
        this.state.names.forEach((name) => {
            score[name] = 0;
        });
        this.setState({scores: score});
        this.setState({gameRunning: true});
        this.nextRound(data);
    }


    nextRound(data) {
        if (data.hasOwnProperty("scoreToUpdate")) {
            var score = this.state.scores;
            score[data.scoreToUpdate]++;
            this.setState({scores: score})
        }
        this.setState({currentLetter: data.letter});
        console.log('testNeXTROUND')
    }


    endGame(player) {
        this.setState({gameRunning: false});
        this.setState({info: player + " as left ! The party is over"})
    }


    leave() {
        document.getElementById("petitbac").classList.add("out");
        setTimeout(()=> {
            this.props.closeChat();
            this.pbc.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                this.pbc.stopGame(this.props.statename, this.props.room);
            }
        },400);
    }

    render() {

        var  names = this.state.names.map((m) => <player key={m}> {m} </player>);
        if (this.state.gameRunning === true) {
            return <div><PetitBac room ={this.props.room} letter = {this.state.currentLetter}/>
                <div id="players-list">
                    <h4>Players online in room {this.props.room} </h4>
                    <p> {names} </p>
                </div>
            </div>

        }
        else return <div className="game in" id="petitbac">
            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>
            <button onClick={this.leave}>Quit</button>
            <button onClick={this.startGame}>Start Playing !</button>
        </div>
    }
}

export {PetitBacStart}