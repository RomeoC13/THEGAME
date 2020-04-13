import React from "react";
import {TimerClient} from "./Clients";


class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {countdown: 10, asFinished: true};
        this.updateTime = this.updateTime.bind(this);
        this.callReset = this.callReset.bind(this);

        this.timer = new TimerClient();
        this.timer.listenTimer(this.updateTime, this.props.room)
    }

    updateTime = (data) => {
        console.log("TEEEST");
        this.setState({countdown: data.countdown});
        if(this.state.countdown === +this.props.seconds){
            let timeleft=document.getElementById("time-left");
            timeleft.classList.add("animated");
            //console.log(timeleft.classList);
        }
        else if (this.state.countdown === 0) {
            let timeleft=document.getElementById("time-left");
            timeleft.classList.remove("animated");
            console.log("timeleft");
            this.setState({asFinished: true});
            this.props.timeIsUp();
        } else {
            this.setState({asFinished: false});
        }
    };

    callReset() {
        this.timer.callReset(this.props.seconds, this.props.room);
    }

    componentWillUnmount = () => {
        /*document.documentElement.style.setProperty("--timeleft",603+"px");*/
    }

    componentDidMount = () => {
        document.documentElement.style.setProperty("--seconds",+this.props.seconds);
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