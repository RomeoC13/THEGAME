import React from "react";
import {Cube} from "./Cube"
import {DemineurClient} from "./Clients";

class Demineur extends React.Component {
    constructor(props) {
        super(props);
        this.grid = []
        //this.gennerateGrid();
        this.bombcount = this.props.bombs;
        this.show = this.show.bind(this);
        this.dc = new DemineurClient();
        this.state = {names: [], isRunning: true}
    }

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
            //console.log("NEW BOMB", bomb)
            let i = Math.floor(bomb / this.props.height);
            //console.log(i)
            let j = bomb - (i * this.props.height);
            //console.log(j)
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

    revealAll = () => {
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                this.grid[i][j].isShowed = true;
            }
        }
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.dc.userLeave(this.props.statename, this.props.room);
    }

    setGrid = (grid) => {
        this.grid = grid;
        this.updateBombCount();
        this.forceUpdate();
    }


    reset = () => {
        this.gennerateGrid();
        this.bombcount = this.props.bombs;
        this.setState({isRunning: true})
        this.dc.emitGrid(this.grid, this.props.room);
    }


    componentDidMount = () => {
        this.dc.emitUser(this.props.statename, this.props.room);
        this.dc.updateUsers(this.setNames, this.props.room);
        this.setupBeforeUnloadListener(this.dc)
        this.dc.syncGrid(this.setGrid, this.props.room);
        this.gennerateGrid();
        this.dc.createGrid(this.grid, this.props.room);
    }

    setupBeforeUnloadListener = (dc) => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            dc.userLeave(this.props.statename, this.props.room);
            return ev.returnValue = "test";
        });
    };

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
        }
        this.testWin();
        if (emit) {
            this.dc.emitGrid(this.grid, this.props.room);
        }
        this.forceUpdate();
    }

    flag = (i, j) => {
        if (!this.grid[i][j].isShowed) {
            this.grid[i][j].isFlagged = !this.grid[i][j].isFlagged;
            this.dc.emitGrid(this.grid, this.props.room);
            this.forceUpdate();
            this.updateBombCount();
        }
    }

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

    testWin = () => {
        if (!this.state.isRunning)
            return;
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                if (!this.grid[i][j].isShowed && this.grid[i][j].value !== "*") {
                    console.log(i, j)
                    return;

                }
            }
        }
        this.win();
    }
    win = () => {
        alert("Win");
        this.revealAll();
        this.setState({isRunning: false});
    }

    loose = () => {
        alert("Loose");
        this.revealAll();
        this.setState({isRunning: false})
    }
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
        return <>
            Bomb remaning : {this.bombcount}
            <table class="demineurGrid">
                <tbody>
                {toReturn}
                </tbody>
            </table>
            <button onClick={this.reset}>Reset</button>
            <div id="players-list">
                <h4>Players online in room {this.props.room} </h4>
                <p> {names} </p>
            </div>
        </>;
    }

}

export {Demineur}