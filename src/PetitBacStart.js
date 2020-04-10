import React from "react";
import {Timer} from "./Timer";
import {PetitBac} from "./PetitBac";
import {GameClient, PetitBacClient} from "./Clients";

class PetitBacStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [],
            info: "",
            scores: [],
            gameRunning: false,
        };


        this.setNames = this.setNames.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        this.leave = this.leave.bind(this);
        this.letterSet = this.letterSet.bind(this);

        this.pbc = new PetitBacClient();
        this.game = new GameClient();


    }

    setNames = (name) => {
        this.setState({names: name})
    };

    letterSet (){
        alert('test');
    }


    componentDidMount() {
        this.pbc.updateUsers(this.setNames, this.props.room);
        this.pbc.emitUser(this.props.statename, this.props.room);
        this.setupBeforeUnloadListener(this.pbc);
        this.game.listenEndGame(this.endGame, this.props.room);
        this.game.listenPetitBacLetter(this.letterSet, this.props.room);
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
            console.log("STARTGAME")
            this.setState({gameRunning: true})
            this.game.startPetitBac(this.props.room)

        }
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
            this.timer = "";
        } else {
            this.timer = <Timer seconds={'100'} room={this.props.room} timeIsUp={this.timeIsUp}/>;
            this.button = <button onClick={this.endGame}> Finish !</button>;
            names = this.state.names.map((m) => <player key={m}> {m} score {this.state.scores[m]} </player>);
        }

        if (this.state.gameRunning === true) {
            return <PetitBac/>
        }
        return <div>


            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>

            <button onClick={this.startGame}>Start Playing !</button>
        </div>
    }
}

export {PetitBacStart}