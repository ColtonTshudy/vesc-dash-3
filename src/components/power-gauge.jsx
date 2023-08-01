import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';

const PowerGauge = ({ className, value = 0, min = 0, max = 0, ticks = 0, size }) => {
    const canvasRef = useRef();
    const gaugeRef = useRef();

    useEffect(() => {
        gaugeRef.current = new RadialGauge({
            barStartPosition: 'right',
            renderTo: canvasRef.current,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            value: value,
            highlights: [],
            majorTicks: __linspace(max, min, ticks),
            minorTicks: 5,
            needleType: "line",
            needleWidth: 3,
            colorNeedleEnd: "rgb(100,100,255,1)",
            colorNeedleShadowDown: "rgb(0,0,0,1)",
            colorNeedle: "rgb(200,200,255,1)",
            needleStart: 0,
            needleEnd: 100,
            colorPlate: 'black',
            fontValueSize: 60,
            fontNumbersSize: 25,
            valueInt: 2,
            valueDec: 0,
            colorValueText: 'black',
            fontUnitsSize: 25,
            ticksAngle: 135,
            startAngle: 180,
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
        });
        gaugeRef.current.draw();

        return () => {
            gaugeRef.current.destroy();
        };
    });

    return (
        <div className={className} style={{ margin: `${-size / 2}px 0 0 ${-size / 2}px` }}>
            <canvas ref={canvasRef} />
            <div id="speedometer-ro">
                
            </div>
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

export default PowerGauge;