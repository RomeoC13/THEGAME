import React from "react";
import openSocket from 'socket.io-client';

const socket = openSocket();

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
            currentY: 0,
            size: 2,
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
        context.lineJoin = context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = this.state.size;

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
        if (this.props.name === this.props.drawer || this.props.drawer === "") {
            this.drawLine(x, y, this.state.currentX, this.state.currentY, this.state.currentColor, true);
            this.setState({currentX: x, currentY: y});
        }
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
    };

    setSizeBrush = (brushSize) => {
        this.setState({size: brushSize})
    }


    render() {
        let colors = "";
        if (this.props.name === this.props.drawer || this.props.drawer === "") {
            colors =
                <>
                    <button onClick={this.clean}>Clean</button>
                    <button id="blackButton" onClick={() => this.setColor("#000000")}/>

                    <button id="greyButton" onClick={() => this.setColor("#908484")}/>
                    <button id="darkGreyButton" onClick={() => this.setColor("#504f4f")}/>

                    <button id="redButton" onClick={() => this.setColor("#ff0e0e")}/>
                    <button id="darkRedButton" onClick={() => this.setColor("#8b0000")}/>

                    <button id="orangeButton" onClick={() => this.setColor("#cd7f13")}/>
                    <button id="darkOrangeButton" onClick={() => this.setColor("#ec6f03")}/>

                    <button id="yellowButton" onClick={() => this.setColor("#ecec04")}/>
                    <button id="darkYellowButton" onClick={() => this.setColor("#797510")}/>


                    <button id="greenButton" onClick={() => this.setColor("#34ad34")}/>
                    <button id="darkGreenButton" onClick={() => this.setColor("#134c13")}/>

                    <button id="blueButton" onClick={() => this.setColor("#4185c9")}/>
                    <button id="darkBlueButton" onClick={() => this.setColor("#202090")}/>


                    <button id="pinkButton" onClick={() => this.setColor("#f837bf")}/>
                    <button id="darkPinkButton" onClick={() => this.setColor("#fa0383")}/>

                    <button id="purpleButton" onClick={() => this.setColor("#866779")}/>
                    <button id="darkPurpleButton" onClick={() => this.setColor("#5c3f4e")}/>

                    <button id="brownButton" onClick={() => this.setColor("#7f5230")}/>
                    <button id="darkBrownButton" onClick={() => this.setColor("#52210a")}/>

                    <div>
                        <img id="eraser" src={require('./Eraser.png')} onClick={() => this.setColor("#ffffff")} alt='Eraser'/>
                        <img src={require('./Small.png')} onClick={() => this.setSizeBrush("4")} alt=''/>
                        <img src={require('./Medium.png')} onClick={() => this.setSizeBrush("8")} alt=''/>
                        <img src={require('./Large.png')} onClick={() => this.setSizeBrush("12")} alt=''/>
                    </div>
                </>
        }
        return (
            <div>
                <canvas
                    height={`${this.state.windowHeight}px`}
                    width={`${this.state.windowWidth}px`}
                    ref={this.whiteboard}
                    className="whiteboard"
                />
                <br/>
                {colors}
            </div>
        );
    }
}

export {Canvas}