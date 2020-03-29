import React from "react";
import {TimerClient} from "./TimerClient";


class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {countdown: 10,asFinished : true};
        this.updateTime = this.updateTime.bind(this);
        this.callReset = this.callReset.bind(this);

        this.timer = new TimerClient();
        this.timer.listenTimer(this.updateTime, this.props.room)
    }

    updateTime = (data) => {
        this.setState({countdown: data.countdown});
        if(this.state.countdown === 0){
            this.setState({asFinished : true})
            this.props.timeIsUp();
        }else{
            this.setState({asFinished : false})
        }
    };

    callReset() {
        this.timer.callReset(this.props.seconds, this.props.room);
    }

    render() {
        let countdown = this.state.countdown;
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown - (minutes * 60);
        if (!this.state.asFinished) {
            return (
                <div id="counter">
                    <h1>{minutes} : {seconds}  </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1><strong>TIME IS UP !</strong></h1>
                </div>
            )
        }
    }
}

export {Timer}