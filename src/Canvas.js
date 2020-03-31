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
            //console.log("received data", data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h);
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

        /*        this.whiteboard.current.addEventListener(
                    "touchstart",
                    this.onMouseDown,
                    false
                );

                this.whiteboard.current.addEventListener(
                    "touchmove",
                    this.throttle(this.onTouchMove, 5),
                    false
                );

                this.whiteboard.current.addEventListener("touchend", this.onMouseUp, false);*/

    }

    drawLine = (x0, y0, x1, y1, color, emit) => {
        console.log("DRAW" + x0, y0, x1, y0);
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
        //console.log('drawing on emit socket canva on room :', this.props.room);
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
        //console.log("REAL " + e.clientX, e.clientY);
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        console.log("DOWN " + x, y);
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
        console.log("MOVE " + x, y);
        //console.log(e.clientX, e.clientY, this.whiteboard.current.offsetLeft, this.whiteboard.current.offsetTop);
        if (!this.state.drawing) {
            return;
        }

        this.drawLine(x, y, this.state.currentX, this.state.currentY, this.state.currentColor, true)
        this.setState({currentX: x, currentY: y});
    };

    /*    onTouchMove = e => {
            if (!this.state.drawing) {
                return;
            }
            //console.log();
            this.setState(() => {
                this.drawLine(
                    this.state.currentX,
                    this.state.currentY,
                    e.touches[0].clientX,
                    e.touches[0].clientY,
                    this.state.currentColor,
                    true,
                    this.props.room
                );
                return {
                    currentX: e.touches[0].clientX,
                    currentY: e.touches[0].clientY
                };
            });
        };*/

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
                <button onClick={()=>this.setColor("black")}>Black</button>
                <button onClick={()=>this.setColor("red")}>Red</button>
                <button onClick={()=>this.setColor("blue")}>Blue</button>
                <button onClick={()=>this.setColor("green")}>Green</button>


            </div>
        );
    }
}

export {Canvas}