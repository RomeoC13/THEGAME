import React from 'react';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roomName: "", userList: [], roomType: ""}
    }

    componentDidMount = () => {
        this.setState({roomName: this.props.roomName, userList: this.props.userList, roomType: this.props.type})
    };

    render() {
        var players = this.state.userList.map((player) => <i key={this.state.roomName + player}>{player} </i>);
        return <div id="Room">
            <u>Room {this.state.roomName} Game of {this.state.roomType} </u> <br/>
            {players} <br/>
            <button onClick={() => this.props.joinRoom(this.state.roomName)}>Join them</button>
        </div>;
    }
}

export {Room}