import React, { Component } from "react";
import Bargraph from "./Bargraph";
import Linegraph from "./Linegraph";
import Piechart from "./Piechart";

// this class will be the interface class for all our diagrams
// class will get in 2 properties
// type : which of the diagram to use
// data : which have a list with data wanted to tranform in to the diagrams
// 
// data list got this structure:
// {
//  data: list of the different data to get compared.
//        names:String and their value:int.
//  name: name of the diagram
//  
// }
class GraptoolInterface extends Component {
    constructor(props) {
        super(props);
        // types of diagrams are:
        // - bargraph
        // - linegraph
        // - piechart
    }

    render() {
        return <Choosemodel type={this.props.type} data={this.props.data} height={this.props.height} width={this.props.width} />
    }

}

function Choosemodel(props) {
    switch(props.type) {
        case "bargraph":
            return <Bargraph data={props.data}  height={props.height} width={props.width}></Bargraph>;
            break;
        
        case "linegraph":
            return <Linegraph data={props.data} height={props.height} width={props.width}></Linegraph>;
            break;

        case "piechart":
            return <Piechart data={props.data} ></Piechart>;
            break;
    }
}

export default GraptoolInterface;