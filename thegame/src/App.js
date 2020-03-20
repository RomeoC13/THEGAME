import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MyForm} from './Myform.js'
import {Pictionary} from './Pictionary.js'

class App extends React.Component {
    constructor() {
        super()
        this.state = {name:"",current: "login"}

        this.login= this.login.bind(this)
        this.back= this.back.bind(this)
    }

    login(){
        console.log("TEEEEEST");
        this.setState({current: "logged"} )
    }

    back(){
        this.setState({current:"login"})
    }
    render() {
        if(this.state.current === "login")
            return <MyForm login={this.login} />
        else
            return <Pictionary back={this.back}/>
    }
}

export default App;
