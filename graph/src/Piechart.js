import React, { Component } from "react";
import gsap from "gsap";
import styles from "./piechart.module.css";

let array = [];
let tl = gsap.timeline({repeat: 0, repeatDelay: 1});
let tl2 = gsap.timeline({repeat: 0, repeatDelay: 1});

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
        const ctx = canvas.getContext("2d");
        let values = [];
        let name = [];
        array = [];
        let color =["green", "red", "blue", "grey", "orange", "brown", "black", "beige", "blueviolet", "#636027", "cyan", "#801468", "#140F45"];

        for(let i = 0; i < this.props.data[0].length; i++) {
            values[i] = this.props.data[0][i];
        }

        for(let i = 0; i < this.props.data[1].length; i++) {
            name[i] = this.props.data[1][i];
        }
        let cakecolor = Math.floor(Math.random() * color.length);
        for(let i = 0; i < name.length; i++) {
            let ok = false;
            while (!ok) {
                if(array.filter(e => e.color === color[cakecolor]).length > 0 && color.length >= array.length) {
                    cakecolor = Math.floor(Math.random() * color.length);
                } else {
                    ok = true;
                }
            } 

            array.push({name: name[i], value: values[i], color: color[cakecolor]});
        }
        console.log(array);

        makePie(array, ctx, canvas);
        gsap.to(array[2], {
            duration: 5,
            value: 20,
            onUpdate: function(){
                makePie(array, ctx, canvas)
            }
        })
        makePie(array, ctx, canvas);
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
        for(let i = 0; i < array.length; i++){
            if(array[i].name == evt.target.name){
            target = i;
            }
        }
        gsap.to(array[target], {
            duration: 3,
            value: newVal,
            onUpdate: function(){
                makePie(array, ctx, can);
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
    for(let i = 0; i < array.length; i++){
        box = document.createElement("div");
        colorBox = document.createElement("div");
        boxLabel = document.createElement("span");

        labels.style.gridTemplateRows = "repeat(" + array.length + ", auto)";
        box.className = styles.labelContainer;
        colorBox.style.backgroundColor = array[i].color;
        colorBox.className = styles.colorBox;
        boxLabel.innerHTML = array[i].name;
        boxLabel.style.grid = "2/3";
        box.appendChild(colorBox);
        box.appendChild(boxLabel);
        labels.appendChild(box);

        tl2.from(box, {
            duration: 1,
            scale: 0.1,
            y: -800,
            ease: "power1.inOut",
            stagger: {
              grid: "auto",
              from: "center",
              amount: 1,
            }
          });
    }
}

function addControllers(th){
    let control = null;
    let input = null;
    tl.from(th.controllers, {
        duration: 2,
        opacity: 0,
        delay: 0.2,
        ease: "elastic"
    });
    for(let i = 0; i < array.length; i++){
        th.controllers.style.gridTemplateColumns = "repeat(" + array.length + ", 75px)";
        input = document.createElement("input");
        control = document.createElement("div");
        control.style.textAlign = "center";
        input.style.color = array[i].color;
        input.type = "number";
        input.value = array[i].value;
        input.name = array[i].name;
        input.id = array[i].name;
        input.onchange = th.updateChart;
        control.appendChild(input);
        th.controllers.appendChild(control);
    }

    th.controllers.childNodes.forEach(function(value, index){

        tl.from(value, {
            duration: 1,
            scale: 0.1,
            y: -800,
            ease: "power1.inOut",
            stagger: {
              grid: "auto",
              from: "center",
              amount: 0.5
            }
          });
    })
}
export default Piechart;