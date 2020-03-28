import React from "react";
import {TimerClient} from "./TimerClient";


class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {countdown: 0};
        this.updateTime = this.updateTime.bind(this);
        this.callReset= this.callReset.bind(this);

        this.timer = new TimerClient(this.props.seconds);
        this.timer.listenTimer(this.updateTime)
    }

    updateTime(data) {
        this.setState(data)
    }

    render() {
        let countdown = this.state.countdown;
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown - (minutes * 60);
        if (countdown > 0) {
            return (
                <div id="counter">
                    <h1>{minutes} : {seconds}  </h1>
                    <button id="reset" onClick={this.callReset}>Reset!</button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1><strong>TEMPS ÉCOULÉ !</strong></h1>
                    <button id="reset" onClick={this.callReset}>Reset!</button>
                </div>
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


    callReset(){
        this.timer.callReset(this.props.seconds);
    }

}

export {Timer}