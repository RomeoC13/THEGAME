import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:3001"); //development;

//const socket = socketIOClient(); //production

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            whiteboard: null,
            drawing: false,
            currentColor: "black",
            windowHeight: 600,
            windowWidth: 600,
            cleared: false,
            room: null,
            userList: [],
            currentX: 0,
            currentY: 0
        };
        this.whiteboard = React.createRef();

        socket.on("cleared", (room) => {
            if (room === this.props.room) {
                this.state.whiteboard
                    .getContext("2d")
                    .clearRect(0, 0, window.innerWidth, window.innerHeight);
            }
        });

        socket.on("add-drawing", data => {
            let w = window.innerWidth;
            let h = window.innerHeight;
            if (data.room === this.props.room) {
                this.drawLine(
                    data.x0 * w,
                    data.y0 * h,
                    data.x1 * w,
                    data.y1 * h,
                    data.color,
                    false
                );
            }
        });

    }

    receive(data) {
        data.forEach((line) => {
            //console.log("received data", data);
            let w = window.innerWidth;
            let h = window.innerHeight;
            this.drawLine(
                line.x0 * w,
                line.y0 * h,
                line.x1 * w,
                line.y1 * h,
                line.color,
                false
            );
        })

    }

    componentDidMount() {
        socket.on("update-lines", (data) => this.receive(data));
        this.setState({
            whiteboard: this.whiteboard.current
        });
        this.whiteboard.current.style.height = 600;
        this.whiteboard.current.style.width = 600;

        this.whiteboard.current.addEventListener("mousedown", this.onMouseDown, false);
        this.whiteboard.current.addEventListener("mouseup", this.onMouseUp, false);
        this.whiteboard.current.addEventListener("mouseout", this.onMouseUp, false);
        this.whiteboard.current.addEventListener("mousemove", this.throttle(this.onMouseMove, 5), false);

    }

    drawLine = (x0, y0, x1, y1, color, emit) => {
        let context = this.state.whiteboard.getContext("2d");
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;

        context.stroke();
        context.closePath();

        if (!emit) {
            return;
        }
        var w = window.innerWidth;
        var h = window.innerHeight;
        socket.emit("user-drawing", {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color,
            room: this.props.room,
        });
        this.setState({cleared: false});
    };

    onMouseDown = e => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        this.setState(() => {
            return {
                currentX: x,
                currentY: y,
                drawing: true
            };
        });
    };

    onMouseUp = e => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        this.setState(() => {
            return {
                drawing: false,
                currentX: x,
                currentY: y
            };
        });
    };

    onMouseMove = e => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        if (!this.state.drawing) {
            return;
        }

        this.drawLine(x, y, this.state.currentX, this.state.currentY, this.state.currentColor, true)
        this.setState({currentX: x, currentY: y});
    };


    clean = () => {
        socket.emit("ask-clear", this.props.room)
    };

    throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return function () {
            let time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };

    setColor = (color) => {
        this.setState({currentColor: color})
    }

    render() {
        return (
            <div>
                <canvas
                    height={`${this.state.windowHeight}px`}
                    width={`${this.state.windowWidth}px`}
                    ref={this.whiteboard}
                    className="whiteboard"
                />
                <br/>
                <button onClick={this.clean}>Clean</button>
                <button onClick={() => this.setColor("black")}>Black</button>
                <button onClick={() => this.setColor("red")}>Red</button>
                <button onClick={() => this.setColor("blue")}>Blue</button>
                <button onClick={() => this.setColor("green")}>Green</button>


            </div>
        );
    }
}

export {Canvas}