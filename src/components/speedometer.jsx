import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';
import './css/gauges.css'

const Speedometer = ({ className, value = 0, min = 0, max = 0, ticks = 0 }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const divRef = useRef();

    useEffect(() => {
        const size = divRef.current.clientHeight;

        const options = {
            barStartPosition: 'left',
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: Math.abs(value),
            highlights: [],
            majorTicks: __linspace(min, max, ticks),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 3,
            colorNeedleEnd: "rgb(255,0,0,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            colorNeedle: "rgb(255,200,200,1)",
            needleStart: 0,
            needleEnd: 100,
            colorPlate: 'transparent',
            fontValueSize: 60,
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
            exactTicks: false,
            needleCircleSize: 0,
            needleCircleInner: 0,
            colorNeedleCircleOuter: 'black',
            colorNeedleCircleOuterEnd: 'black',
            colorMajorTicks: 'white',
            colorMinorTicks: 'lightgrey',
            colorNumbers: 'white',
            colorBorderInner: 'transparent',
            colorBorderOuter: 'transparent',
            colorBorderMiddle: 'transparent',
            dataAnimatedValue: false,
        }

        gaugeRef.current = new RadialGauge(options).draw();

        return () => {
            gaugeRef.current.destroy();
        };
    }, [value]);

    return (
        <div className={className} ref={divRef}>
            <canvas ref={canvasRef} />
        </div>
    )
};

function __linspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

export default Speedometer;