import React from 'react';
import * as ReactDOM from "react-dom";


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: null,
        };
    }

    getName(){
        return this.state.name
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    render() {
        return (
            <form>
                <p>Enter your pseudo:</p>
                <input
                    type='text'
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <button onClick={this.props.login}>Click</button>
            </form>
        );

    }
}

export{MyForm};