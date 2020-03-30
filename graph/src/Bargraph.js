import React, { Component } from "react";
import Chart from "chart.js";
import gsap from "gsap";

class Bargraph extends Component {

    constructor(props) {
        super(props);

        this.myCanvas = null;
        this.controllers = null;
        this.container = null;
        this.updateChart = this.updateChart.bind(this);
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
        gsap.from(this.container, {
            duration: 2,
            scale: 0.000000001,
            opacity: 1,
            rotation: 180
        })
        addControls(this.props.data, this.controllers, this);
    }

    render() {
        return (
            <div ref={container => this.container = container}>
                <canvas width={this.props.width} height={this.props.height} ref={canvas => this.myCanvas = canvas}></canvas>
                <div style={{display: "grid"}} ref={controllers => this.controllers = controllers}></div>
            </div>
        );
    }

    updateChart(evt){
        let newVal = parseInt(evt.target.value);
        let target = parseInt(evt.target.name);
        this.props.data[0][target] = newVal;
        let ctx = this.myCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
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
}

function addControls(data, controls, thi){
    let input = null;
    let control = null;
    let text = null;
    gsap.from(controls, {
        duration: 2,
        opacity: 0,
        delay: 0.2,
        ease: "elastic"
    });
    for(let i = 0; i < data[0].length; i++){
        controls.style.gridTemplateColumns = "repeat(" + data[0].length + ", 75px)";
        input = document.createElement("input");
        control = document.createElement("div");
        text = document.createElement("p");
        text.innerHTML = data[1][i];
        control.style.textAlign = "center";
        input.type = "number";
        input.value = data[0][i];
        input.name = i;
        input.onchange = thi.updateChart;
        control.appendChild(text);
        control.appendChild(input);
        controls.appendChild(control);
    }
}
export default Bargraph;