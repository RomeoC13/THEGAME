import React from "react";

class Pictionary extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>Le jeu ici <button onClick={this.props.back}>Back</button></div>;
    }
}

export {Pictionary}