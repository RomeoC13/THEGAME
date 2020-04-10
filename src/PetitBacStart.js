import React from "react";
import {PetitBac} from "./PetitBac";
import {GameClient, PetitBacClient} from "./Clients";

class PetitBacStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [],
            info: "",
            gameRunning: false,
        };
        this.sendMsg = this.sendMsg.bind(this);
        this.setNames = this.setNames.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.startGame = this.startGame.bind(this);
        this.listenForm = this.listenForm.bind(this);

        this.endGame = this.endGame.bind(this);
        this.leave = this.leave.bind(this);

        this.pbc = new PetitBacClient();
        this.game = new GameClient();
    }

    setNames = (name) => {
        this.setState({names: name})
    };


    sendMsg(message) {
        //console.log(this.state.currentWord === message.text);
        //console.log(this.state.currentDrawer !== message.name);
        //console.log(this.state.gameRunning);
        if (this.state.currentWord === message.text && this.state.currentDrawer !== message.name && this.state.gameRunning) {
            console.log("good  job");
            this.setState({info: "Good job, " + message.name + " ! The word was " + this.state.currentWord});
            if (this.props.statename === this.state.currentDrawer) {
                setTimeout(() => this.game.asWin(message.name, this.state.currentDrawer, this.props.room), 2000);
            }
        }
    }

    componentDidMount() {
        this.pbc.updateUsers(this.setNames, this.props.room);
        this.pbc.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pbc);
        this.game.listenEndGame(this.endGame, this.props.room);
        this.game.listenPetitBacLetter(this.listenForm, this.props.room);
    }


    componentWillUnmount() {
        this.pbc.userLeave(this.props.statename);
    }


    setupBeforeUnloadListener = (pbc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            pbc.userLeave(this.props.statename, this.props.room);
            if (this.state.gameRunning) {
                this.game.stopGame(this.props.statename, this.props.room);
            }
            return ev.returnValue = "test";
        });
    };


    startGame() {
        if (this.state.names.length < 2) {
            // eslint-disable-next-line no-useless-escape
            alert("You can't play Petit Bac game alone ¯\\_(ツ)_/¯, you must at least be 2 !");
        } else {
            this.game.startPetitBac(this.props.room)
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
        this.props.closeChat();
        this.pbc.userLeave(this.props.statename, this.props.room);
        if (this.state.gameRunning) {
            this.game.stopGame(this.props.statename, this.props.room);
        }
    }

    render() {
        var names;
        if (!this.state.endGame) {
            names = this.state.names.map((m) => <player key={m}> {m} </player>);
            this.button = <button onClick={this.endGame}> Finish !</button>;
        } else {
            this.button = <button onClick={this.endGame}> Finish !</button>;
            names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);
        }

        if (this.state.gameRunning === true) {
            return <div><PetitBac room ={this.props.room} letter = {this.state.currentLetter}/>
                <div id="players-list">
                    <h4>Players online in room {this.props.room} </h4>
                    <p> {names} </p>
                </div>
            </div>

        }
        else return <div>
            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>

            <button onClick={this.startGame}>Start Playing !</button>
        </div>
    }
}

export {PetitBacStart}