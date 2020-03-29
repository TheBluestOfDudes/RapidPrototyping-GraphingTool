import React, { Component } from "react";
import gsap from "gsap";

class Piechart extends Component {

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

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

        makePie(objPie.values, ctx, canvas);
        gsap.to(objPie.values[2], {
            duration: 5,
            value: 20,
            onUpdate: function(){
                console.log(objPie.values[2].value);
                makePie(objPie.values, ctx, canvas)
            }
        })
      }
    
    render() {
        return (
            <canvas ref="canvas" width="150" height="150"></canvas>
        );
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
export default Piechart;