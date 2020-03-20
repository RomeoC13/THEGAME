import React from 'react';
import "./App.css";
import * as ReactDOM from "react-dom";


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: null,
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    render() {
        return (
            <form>
                <p>Enter your pseudo:</p>
                <input
                    type='text'
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <h1>You pseudo is {this.state.username} </h1>

                <p>Enter your password:</p>
                <input
                    type='text'
                    name='password'
                    onChange={this.myChangeHandler}
                />
                <h1>You password is {this.state.password}</h1>
            </form>
        );

    }
}

class Canvas extends React.Component {
    /* constructor(props) {
         super();
     }

     componentDidMount() {
         const canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
         const ctx = canvas.getContext("2d")
     }

     clearCanvas(x1, y1, x2, y2) {
         const canvas = document.getElementById('myCanvas');
         //const g = canvas.getContext('2d');
         //g.clearRect(x1,y1,x2,y2);

     }

     render() {
         return (
             <div>
                 <canvas ref={canvas => this.canvas = canvas} id="myCanvas" width="500" height="500" />
                 <button onClick="init()">Dessiner</button>
                 <button onClick={this.clearCanvas(0, 0, 300, 300)}>Effacer</button>
             </div>
         )
     }*/
    constructor(props) {
        super(props);
        this._resizeHandler = () => {
            /* Allows CSS to determine size of canvas */
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.clearAndDraw();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this._resizeHandler);
        /* Allows CSS to determine size of canvas */
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

    }

    /*componentWillUnmount() {
        window.removeEventListener('resize', this._resizeHandler);
    }*/


    componentDidUpdate(prevProps, prevState) {
        /*if (this.props.secondRect !== prevProps.secondRect) {
            this.clearAndDraw();
            this.clearCanvas();
        }*/
    }

    clearAndDraw() {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw(ctx);
        }
    }


    draw(ctx) {
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        if (this.props.secondRect) {
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(30, 30, 50, 50);
        }
    }

    render() {
        return (
            <div>
                <canvas ref={canvas => this.canvas = canvas} id="myCanvas" width="500" height="500"/>
                <button ref = {this.desinRef} onClick="init()">Dessiner</button>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (<div><Canvas/></div>);
    }
}

export default App