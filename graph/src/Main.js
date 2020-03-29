import React, { Component } from "react";
import GraphInterface from "./GraptoolInterface";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "bargraph"
        }

        this.bargraph.bind(this);
        this.linegraph.bind(this);
        this.piechart.bind(this);
    }
    render() {
        return ([
            <GraphInterface type={this.state.type} width="400" height="400" data={[[0, 10, 5, 2, 20, 30, 45], ['January', 'February', 'March', 'April', 'May', 'June', 'July']]} ></GraphInterface>,
            <button onClick={this.bargraph}>Bargraph</button>,
            <button onClick={this.linegraph}>Linegraph</button>,
            <button onClick={this.piechart}>Piechart</button>,       
        ]);
    }

    bargraph = () => {
        this.setState({type: "bargraph"});
    }

    linegraph = () => {
        this.setState({type: "linegraph"});
    }

    piechart = () => {
        this.setState({type: "piechart"});
    }
}
export default Main;