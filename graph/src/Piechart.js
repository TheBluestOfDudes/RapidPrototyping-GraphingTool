import React, { Component } from "react";
import gsap from "gsap";
import styles from "./piechart.module.css";

let objPie = {
    values: [
        {name: "Value 1", value: 10, color: "green"},
        {name: "Value 2", value: 7, color: "red"},
        {name: "Value 3", value: 5, color: "blue"},
        {name: "Value 4", value: 25, color: "grey"},
        {name: "Value 5", value: 10, color: "orange"},
        {name: "Value 6", value: 15, color: "brown"}
    ]
}

class Piechart extends Component {

    constructor(props){
        super(props)
        this.graph = null;
        this.containerBox = null;
        this.canvas = null;
        this.labels = null;
        this.controllers = null;
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d")
        makePie(objPie.values, ctx, canvas);
        addLabels(this.labels);
        addControllers(this);
        gsap.from(this.graph, {
            duration: 1,
            rotation: 360,
            opacity: 0
        });
      }
    
    render() {
        return (
            <div ref={graph => this.graph = graph}>
                <div className={styles.containerBox} ref={containerBox => this.containerBox = containerBox}>
                    <canvas className={styles.canvas} ref={canvas => this.canvas = canvas} width="250" height="250"></canvas>
                    <div className={styles.labels} ref={labels => this.labels = labels}></div>
                </div>
                <div className={styles.controllers} ref={controllers => this.controllers = controllers}></div>
            </div>
        );
    }

    updateChart(evt){
        let target = null;
        let newVal = parseInt(evt.target.value);
        let can = this.canvas;
        let ctx = can.getContext("2d");
        for(let i = 0; i < objPie.values.length; i++){
            if(objPie.values[i].name == evt.target.name){
            target = i;
            }
        }
        gsap.to(objPie.values[target], {
            duration: 3,
            value: newVal,
            onUpdate: function(){
                makePie(objPie.values, ctx, can);
            }
        })
    }
}

function makePie(array, ctx, can){
    let total = 0;
    let startAngle = 0;
    let endAngle = 0;
    let fraction = 0.0;
    //Count up the total
    for(let i = 0; i < array.length; i++){
        total += array[i].value;
    }
    ctx.clearRect(0, 0, can.width, can.height);
    for(let i = 0; i < array.length; i++){
        fraction = array[i].value/total;
        endAngle = (fraction*(2*Math.PI)) + startAngle;
        ctx.beginPath();
        ctx.arc(can.width/2, can.height/2, can.width/2, startAngle, endAngle);
        ctx.fillStyle = array[i].color;
        ctx.lineTo(can.width/2, can.height/2);
        ctx.fill();
        startAngle = endAngle;
    }
}

//Method adds label boxes to the various colors in the pie chart
function addLabels(labels){
    let box = null;
    let colorBox = null;
    let boxLabel = null;
    for(let i = 0; i < objPie.values.length; i++){
        box = document.createElement("div");
        colorBox = document.createElement("div");
        boxLabel = document.createElement("span");

        labels.style.gridTemplateRows = "repeat(" + objPie.values.length + ", auto)";
        box.className = styles.labelContainer;
        colorBox.style.backgroundColor = objPie.values[i].color;
        colorBox.className = styles.colorBox;
        boxLabel.innerHTML = objPie.values[i].name;
        boxLabel.style.grid = "2/3";
        box.appendChild(colorBox);
        box.appendChild(boxLabel);
        labels.appendChild(box);
    }
}

function addControllers(th){
    let control = null;
    let input = null;
    gsap.from(th.controllers, {
        duration: 2,
        opacity: 0,
        delay: 0.2,
        ease: "elastic"
    });
    for(let i = 0; i < objPie.values.length; i++){
        th.controllers.style.gridTemplateColumns = "repeat(" + objPie.values.length + ", 75px)";
        input = document.createElement("input");
        control = document.createElement("div");
        control.style.textAlign = "center";
        input.style.color = objPie.values[i].color;
        input.type = "number";
        input.value = objPie.values[i].value;
        input.name = objPie.values[i].name;
        input.id = objPie.values[i].name;
        input.onchange = th.updateChart;
        control.appendChild(input);
        th.controllers.appendChild(control);
    }
}
export default Piechart;