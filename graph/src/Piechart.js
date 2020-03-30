import React, { Component } from "react";
import gsap from "gsap";

class Piechart extends Component {

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        let values = [];
        let name = [];
        let color =["green", "red", "blue", "grey", "orange", "brown", "lightblue", "aqua", "beige", "blueviolet", "burleywood", "cyan"];

        for(let i = 0; i < this.props.data[0].length; i++) {
            values[i] = this.props.data[0][i];
        }

        for(let i = 0; i < this.props.data[1].length; i++) {
            name[i] = this.props.data[1][i];
        }

        let array = [];
        for(let i = 0; i < name.length; i++) {
            let cakecolor = Math.floor(Math.random() * color.length);
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


        makePie(array, ctx, canvas);
        gsap.to(array[2], {
            duration: 5,
            value: 20,
            onUpdate: function(){
                console.log(array[2].value);
                makePie(array, ctx, canvas)
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