import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';
import './css/speedometer.css'

const startAngle = -45
const spanAngle = 135

const refreshRate = 100 //ms

const Speedometer = ({ className, value = 0, min = 0, max = 5 }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();
    const divRef = useRef();
    const angle = Math.abs(value)/max * (spanAngle) + startAngle;

    useEffect(() => {
        const size = divRef.current.clientHeight;

        const options = {
            renderTo: canvasRef.current,
            width: size,
            height: size,
            highlights: [],
            majorTicks: __linspace(min, max, 6),
            minorTicks: 4,
            needle: false,
            fontNumbers: "Nasalization",
            colorPlate: "transparent",
            fontNumbersSize: 25,
            ticksAngle: 135,
            startAngle: 45,
            valueBox: false,
            borderShadowWidth: 0,
            colorNeedleCircleOuter: "transparent",
            colorNeedleCircleInner: "transparent",
            colorNeedleCircleOuterEnd: "transparent",
            colorNeedleCircleInnerEnd: "transparent",
            colorMajorTicks: 'white',
            colorMinorTicks: 'grey',
            colorNumbers: 'white',
            borders: true,
            colorBorderInner: "transparent",
            colorBorderMiddle: "transparent",
            colorBorderOuter: "transparent",
            colorBorderInnerEnd: "transparent",
            colorBorderMiddleEnd: "transparent",
            colorBorderOuterEnd: "transparent",
        }
        gaugeRef.current = new RadialGauge(options).draw();

        return () => {
            gaugeRef.current.destroy();
        };
    }, [min, max]);

    return (
        <div className={className} ref={divRef}>
            <canvas ref={canvasRef} />
            <div id="sm-needle-container" style={{
                rotate: `${angle}deg`,
            }}>
            <div id="sm-center">
                    <div id="sm-center-emboss" />
                </div>
                <div id="sm-needle">
                    <div id="sm-needle-tip" />
                </div>
            </div>
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