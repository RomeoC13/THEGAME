import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("localhost:3001"); //development;

//const socket = socketIOClient(); //production

class Canvas extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: null,
            drawing: false,
            currentColor: "black",
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            cleared: false,
            username: null,
            room: null,
            userList: []
        };

        this.whiteboard = React.createRef();


        socket.on("cleared", () => {
            this.state.whiteboard
                .getContext("2d")
                .clearRect(0, 0, window.innerWidth, window.innerHeight);
        });

        socket.on("drawing", data => {
            let w = window.innerWidth;
            let h = window.innerHeight;

                this.drawLine(
                    data.x0 * w,
                    data.y0 * h,
                    data.x1 * w,
                    data.y1 * h,
                    data.color
                );

        });
    }

    componentDidMount() {
        this.setState({
            whiteboard: this.whiteboard.current
        });
        this.whiteboard.current.style.height = window.innerHeight;
        this.whiteboard.current.style.width = window.innerWidth;

        this.whiteboard.current.addEventListener(
            "mousedown",
            this.onMouseDown,
            false
        );
        this.whiteboard.current.addEventListener("mouseup", this.onMouseUp, false);
        this.whiteboard.current.addEventListener("mouseout", this.onMouseUp, false);
        this.whiteboard.current.addEventListener(
            "mousemove",
            this.throttle(this.onMouseMove, 5),
            false
        );

        this.whiteboard.current.addEventListener(
            "touchstart",
            this.onMouseDown,
            false
        );

        this.whiteboard.current.addEventListener(
            "touchmove",
            this.throttle(this.onTouchMove, 5),
            false
        );

        this.whiteboard.current.addEventListener("touchend", this.onMouseUp, false);

    }

    drawLine = (x0, y0, x1, y1, color, emit, room) => {
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
        this.setState(() => {

                console.log('drawing on emit socket canva on room :', this.props.room);
                socket.emit("drawing", {
                    x0: x0 / w,
                    y0: y0 / h,
                    x1: x1 / w,
                    y1: y1 / h,
                    color: color,
                    room: room,
                });

                return {
                    cleared: false
                };

        });
    };

    onMouseDown = e => {
        this.setState(() => {
            return {
                currentX: e.clientX,
                currentY: e.clientY,
                drawing: true
            };
        });
    };

    onMouseUp = e => {
        this.setState(() => {
            return {
                drawing: false,
                currentX: e.clientX,
                currentY: e.clientY
            };
        });
    };

    onMouseMove = e => {
        if (!this.state.drawing) {
            return;
        }

        this.setState(() => {
            return {
                currentX: e.clientX,
                currentY: e.clientY
            };
        }, this.drawLine(this.state.currentX, this.state.currentY, e.clientX, e.clientY, this.state.currentColor, true, this.room));
    };

    onTouchMove = e => {
        if (!this.state.drawing) {
            return;
        }
        console.log();
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
    };


    throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return function() {
            let time = new Date().getTime();

            if (time - previousCall >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };


    render() {
        return (
            <div>
                <h1 className="room-name">{this.props.room}</h1>
                <canvas
                    height={`${this.state.windowHeight}px`}
                    width={`${this.state.windowWidth}px`}
                    ref={this.whiteboard}
                    className="whiteboard"
                />

            </div>
        );
    }
}
export {Canvas}