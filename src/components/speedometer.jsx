import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';
import './css/gauges.css'
import '../css/fonts.css'

const Speedometer = ({ className, value = 0, min = 0, max = 5}) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const divRef = useRef();

    useEffect(() => {
        const size = divRef.current.clientHeight;

        const options = {
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: min,
            highlights: [],
            majorTicks: __linspace(min, max, 6),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 3,
            colorNeedleEnd: "rgb(255,0,0,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            colorNeedle: "rgb(255,200,200,1)",
            needleStart: 0,
            needleEnd: 100,
            fontNumbers: "Nasalization",
            barStartPosition: "left",
            colorPlate: "transparent",
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            ticksAngle: 135,
            startAngle: 45,
            valueBox: false,
            borders: true,
            borderShadowWidth: 0,
            colorNeedleCircleOuter: "transparent",
            colorNeedleCircleInner: "transparent",
            colorNeedleCircleOuterEnd: "transparent",
            colorNeedleCircleInnerEnd: "transparent",
            colorMajorTicks: 'white',
            colorMinorTicks: 'lightgrey',
            colorNumbers: 'white',
            colorBorderInner: "transparent",
            colorBorderMiddle: "transparent",
            colorBorderOuter: "transparent",
            colorBorderInnerEnd: "transparent",
            colorBorderMiddleEnd: "transparent",
            colorBorderOuterEnd: "transparent",
            animation: true,
            animationRule: 'linear',
            animationDuration: 100,
            // barProgress: true,
            // barStrokeWidth: 0,
            // barWidth: 5,
            // colorBar: "transparent",
            // colorBarProgress: "red",
            // needle: false,
        }
        gaugeRef.current = new RadialGauge(options).draw();
        
        return () => {
            gaugeRef.current.destroy();
        };
    }, [min, max]);

    useEffect(() => {
        gaugeRef.current.value = Math.abs(value)
    }, [value])

    return (
        <div className={className} ref={divRef}>
            <canvas ref={canvasRef} />
        </div>
    )
};

function __linspace(startValue, stopValue, count) {
    var arr = [];
    var step = (stopValue - startValue) / (count - 1);
    for (var i = 0; i < count; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

export default Speedometer;