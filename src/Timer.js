import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    render() {
        const {count} = this.state
        if (count > 0) {
            return (
                <div>
                    <h2>Current Count: {count}</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2><strong>Current Count: {count}</strong></h2>
                </div>
            );
        }
    }


    componentDidMount() {
        const time = this.props.startCount
        this.setState({count: time})
        this.myInterval = setInterval(() => {
            if (this.state.count === 0) {
                this.props.timeEnd()
            }
            this.setState(prevState => ({
                count: prevState.count - 1
            }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

}

export {Timer}