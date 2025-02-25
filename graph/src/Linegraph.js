import React, { Component } from "react";
import Chart from "chart.js";
import gsap from "gsap";

class Linegraph extends Component {

    constructor(props) {
        super(props);

        this.myCanvas = null;

        this.tl = gsap.timeline({repeat: 0, repeatDelay: 1});

    }

    componentDidMount() {
        const ctx = this.myCanvas.getContext("2d");

        this.tl.from(this.myCanvas, {x: -400, duration: 2});

        let chart = new Chart(ctx, {
            type: "line",
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

function onStart() {

}
export default Linegraph;