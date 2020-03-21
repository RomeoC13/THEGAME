import React from "react";
import {TimerClient} from "./TimerClient";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {countdown: 0};
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateTime = this.updateTime.bind(this);
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
                <div>
                    <h1>{minutes} : {seconds}  </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1><strong>TEMPS ÉCOULÉ !</strong></h1>
                </div>
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidMount() {
        this.timer = new TimerClient(this.props.seconds);
        this.timer.listenTimer(this.updateTime)
    }

}

export {Timer}