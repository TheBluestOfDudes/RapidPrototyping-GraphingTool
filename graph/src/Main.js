import React, { Component } from "react";
import GraphInterface from "./GraptoolInterface";

class Main extends Component {
    render() {
        return (
            <GraphInterface type="linegraph" width="400" height="400" ></GraphInterface>       
              );
    }
}
export default Main;