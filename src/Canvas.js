import React from "react";

class Canvas  extends React.Component {

    constructor(props) {
        super(props);
        this._resizeHandler = () => {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.clearAndDraw();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this._resizeHandler);
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

    //Todo : Faire la fonction de dessin + la fonction de clear du canvas
    render() {
        return (
            <div>
                <h1>Canvas</h1>
                <canvas ref={canvas => this.canvas = canvas} id="myCanvas" width="500" height="200" />
                <button ref = {this.dessinRef} onClick="TODO Fonction">Dessiner</button>
                <button onClick="TODO Fonction">Clear</button>
            </div>
        )
    }
}

export {Canvas}