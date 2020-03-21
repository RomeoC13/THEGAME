import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 3
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        const { minutes, seconds } = this.state;
        return (
            <div>
                <h1>{ minutes }:{ seconds } </h1>
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state;
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval);
                    alert('Temps écoulé');
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

}

export {Timer}