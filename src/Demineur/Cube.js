import React from "react";

class Cube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {i: this.props.i, j: this.props.j}

    }

    //Visual render for Demineur
    render() {
        let content;
        let buttonClass;
        if (this.props.show) {
            buttonClass = "DemineurButton showed"
            if (this.props.value === 0) {
                content = " "
            } else if (this.props.value === "*") {
                content = <img src={require('../Utils/Bomb.png')} alt="*"/>
            } else {
                content = this.props.value;

            }
        } else {
            buttonClass = "DemineurButton notShowed"
            if (this.props.flag) {
                content = <img src={require('../Utils/Flag.png')} alt="F"/>
            } else {
                content = " ";
            }
        }
        return <button className={buttonClass} onClick={() => this.props.click(this.state.i, this.state.j, true)}
                       onContextMenu={() => this.props.leftClick(this.state.i, this.state.j)}>{content}</button>
    }
}

export {Cube}