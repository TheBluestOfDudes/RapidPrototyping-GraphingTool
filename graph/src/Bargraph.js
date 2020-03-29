import React, { Component } from "react";
import Chart from "chart.js";

class Bargraph extends Component {

    constructor(props) {
        super(props);

        this.myCanvas = null;
    }

    componentDidMount() {
        let ctx = this.myCanvas.getContext("2d");
        let chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.props.data[1],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: this.props.data[0]
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
            }
        });
    }

    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} ref={canvas => this.myCanvas = canvas}></canvas>
        );
    }
}
export default Bargraph;