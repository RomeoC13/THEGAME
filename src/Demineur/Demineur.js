import React from "react";
import {Cube} from "./Cube"
import {DemineurClient, PlayerListClient} from "../Clients";

class Demineur extends React.Component {
    constructor(props) {
        super(props);
        this.grid = []
        this.bombcount = this.props.bombs;
        this.show = this.show.bind(this);
        this.dc = new DemineurClient();
        this.uc = new PlayerListClient(this.props.room);
        this.state = {names: [], isRunning: true,info:""}
    }

    componentDidMount = () => {
        this.dc.emitUser(this.props.statename, this.props.room);
        this.uc.updateUsers(this.setNames);
        this.setupBeforeUnloadListener(this.dc)
        this.dc.syncGrid(this.setGrid, this.props.room);
        this.gennerateGrid();
        this.dc.createGrid(this.grid, this.props.room);
    }

    //Generate grid with bombs and value of the nearest bombs
    gennerateGrid = () => {
        for (let i = 0; i < this.props.height; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.props.width; j++) {
                this.grid[i][j] = {value: "0", isShowed: false, isFlagged: false}
            }
        }
        let length = this.props.height * this.props.width;
        let bombs = [];
        while (bombs.length < this.props.bombs) {
            let newBomb = Math.floor(Math.random() * length);
            if (bombs.indexOf(newBomb) === -1) {
                bombs.push(newBomb);
            }
        }
        bombs.forEach((bomb) => {
            let i = Math.floor(bomb / this.props.height);
            let j = bomb - (i * this.props.height);
            this.grid[i][j].value = "*";
        })
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                this.grid[i][j].value = this.countBombNear(i, j);
            }
        }
    }

    setNames = (name) => {
        this.setState({names: name})
    };

    //Reveal all boxes
    revealAll = () => {
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                this.grid[i][j].isShowed = true;
            }
        }
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.dc.userLeave(this.props.statename,this.props.room);
    }


    setGrid = (grid) => {
        this.grid = grid;
        this.updateBombCount();
        this.forceUpdate();
    }

    //Reset Demineur
    reset = () => {
        this.setState({info : ""})
        this.gennerateGrid();
        this.bombcount = this.props.bombs;
        this.setState({isRunning: true})
        this.dc.emitGrid(this.grid, this.props.room);
    }

    setupBeforeUnloadListener = (dc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            dc.userLeave(this.props.statename, this.props.room);
            return ev.returnValue = "test";
        });
    };

    //Count bombs near the box
    countBombNear = (i, j) => {
        if (this.grid[i][j].value === "*")
            return "*";
        let count = 0;
        for (let i1 = -1; i1 <= 1; i1++) {
            for (let i2 = -1; i2 <= 1; i2++) {
                if (this.grid.hasOwnProperty(i + i1)) {
                    if (this.grid[i + i1].hasOwnProperty(j + i2)) {
                        //console.log(i1, i2)
                        if (this.grid[i + i1][j + i2].value === "*")
                            count++;
                    }
                }
            }
        }
        return count;
    }

    //Show boxes when clicked
    show = (i, j, emit) => {
        if (!this.state.isRunning)
            return;
        if (this.grid[i][j].isFlagged)
            return;
        if (this.grid[i][j].isShowed)
            return;
        this.grid[i][j].isShowed = true;
        if (this.grid[i][j].value === 0) {
            for (let i1 = -1; i1 <= 1; i1++) {
                for (let i2 = -1; i2 <= 1; i2++) {
                    if (this.grid.hasOwnProperty(i + i1)) {
                        if (this.grid[i + i1].hasOwnProperty(j + i2)) {
                            this.show(i + i1, j + i2, false);
                        }
                    }
                }
            }

        }
        if (this.grid[i][j].value === "*") {
            this.bombcount--;
            this.loose();

        }else{
            this.testWin();
        }
        if (emit) {
            this.dc.emitGrid(this.grid, this.props.room);
        }
        this.forceUpdate();
    }

    //Set a flag in the box
    flag = (i, j) => {
        if (!this.grid[i][j].isShowed) {
            this.grid[i][j].isFlagged = !this.grid[i][j].isFlagged;
            this.dc.emitGrid(this.grid, this.props.room);
            this.forceUpdate();
            this.updateBombCount();
        }
    }

    //Update bomb count
    updateBombCount = () => {
        let count=this.props.bombs;
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                if(this.grid[i][j].isFlagged)
                    count--;
            }
        }
        this.bombcount=count;
    }

    //Check if the box is a bomb and call win if it is not
    testWin = () => {
        if (!this.state.isRunning)
            return;
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                if (!this.grid[i][j].isShowed && this.grid[i][j].value !== "*") {
                    //console.log(i, j)
                    return;
                }
            }
        }
        this.win();
    }

    //Set state and reveal all boxes
    win = () => {
        this.setState({info :"You won ! congrats !"})
        this.setState({isRunning: false});
        this.revealAll();
    }

    //Set state and reveal all boxes
    loose = () => {
        this.setState({info :"You loose !"})
        this.setState({isRunning: false})
        this.revealAll();
    }

    leave = ()=>{
        document.getElementById("demineur").classList.add("out");
        setTimeout(()=> {
            this.dc.userLeave(this.props.statename,this.props.room);
            this.props.close();
        },400);
    }

    //Visual render
    render = () => {
        let names = this.state.names.map((m) => <player key={m}> {m} </player>);
        let toReturn = this.grid.map((item, i) => {
            let entry = this.grid[this.grid.indexOf(item)].map((data, j) => {
                return (
                    <td><Cube value={data.value} show={this.grid[i][j].isShowed} flag={this.grid[i][j].isFlagged} i={i}
                              j={j} click={this.show} leftClick={this.flag}/></td>);
            })
            return <tr>{entry}</tr>;
        });
        return <div id="demineur" className="game in">
            <p>{this.state.info} </p>
            Bomb remaning : {this.bombcount}
            <table className="demineurGrid">
                <tbody>
                {toReturn}
                </tbody>
            </table>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.leave}>Quit</button>
            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>
        </div>;
    }

}

export {Demineur}