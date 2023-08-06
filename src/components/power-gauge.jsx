import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';
import './css/gauges.css'

const PowerGauge = ({ className, value = 0, min = 0, max = 5}) => {
    const canvasRef = useRef();
    const divRef = useRef();
    const gaugeRef = useRef();

    useEffect(() => {
        const options = {
            renderTo: canvasRef.current,
            width: divRef.current.clientHeight,
            height: divRef.current.clientHeight,
            minValue: min,
            maxValue: max,
            value: Math.abs(value),
            highlights: [],
            majorTicks: __linspace(max, min, 6),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 3,
            colorNeedleEnd: "rgb(100,100,255,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            colorNeedle: "rgb(200,200,255,1)",
            needleStart: 0,
            needleEnd: 100,
            fontNumbers: "Nasalization",
            barStartPosition: "right",
            colorPlate: 'transparent',
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            ticksAngle: 135,
            startAngle: 180,
            valueBox: false,
            borderShadowWidth: 0,
            colorNeedleCircleOuter: 'transparent',
            colorNeedleCircleInner: 'transparent',
            colorNeedleCircleOuterEnd: 'transparent',
            colorNeedleCircleInnerEnd: 'transparent',
            colorMajorTicks: 'white',
            colorMinorTicks: 'lightgrey',
            colorNumbers: 'white',
            borders: true,
            colorBorderInner: "transparent",
            colorBorderMiddle: "transparent",
            colorBorderOuter: "transparent",
            colorBorderInnerEnd: "transparent",
            colorBorderMiddleEnd: "transparent",
            colorBorderOuterEnd: "transparent",
            animation: true,
            animationRule: 'linear',
            animationDuration: 100,
        }

        gaugeRef.current = new RadialGauge(options).draw();
        gaugeRef.current.update()

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

export default PowerGauge;