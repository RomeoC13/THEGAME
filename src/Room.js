import React from 'react';
class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state={roomName:"",userList:[]}
    }

    componentDidMount = ()=> {
        this.setState({roomName : this.props.roomName,userList:this.props.userList})
    };

    render() {
        var players = this.state.userList.map((player)=><>{player}</>);
        return <div id="Room">
            <u>Room {this.state.roomName} </u> <br/>
            {players} <br/>
            <button onClick={()=>this.props.joinRoom(this.state.roomName)}>Join them</button>
        </div>;
    }
}

export {Room}