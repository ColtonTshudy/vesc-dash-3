import React, { useRef, useEffect } from 'react';
import { RadialGauge } from 'canvas-gauges';
import './css/power-gauge.css'

const startAngle = -135
const spanAngle = -135

const PowerGauge = ({ className, value = 0, min = 0, max = 5}) => {
    const canvasRef = useRef();
    const divRef = useRef();
    const gaugeRef = useRef();
    const angle = Math.abs(value)/max * (spanAngle) + startAngle;

    useEffect(() => {
        const size = divRef.current.clientHeight;

        const options = {
            renderTo: canvasRef.current,
            width: size,
            height: size,
            highlights: [],
            majorTicks: __linspace(max, min, 6),
            minorTicks: 4,
            needle: false,
            fontNumbers: "Nasalization",
            colorPlate: 'transparent',
            fontNumbersSize: 25,
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
            animation: false,
            // animationRule: 'linear',
            // animationDuration: 100,
        }

        gaugeRef.current = new RadialGauge(options).draw();
        gaugeRef.current.update()

        return () => {
            gaugeRef.current.destroy();
        };
    }, [min, max]);

    return (
        <div className={className} ref={divRef}>
            <canvas ref={canvasRef} />
            <div id="pm-needle-container" style={{
                rotate: `${angle}deg`,
            }}>
            <div id="pm-center">
                    <div id="pm-center-emboss" />
                </div>
                <div id="pm-needle">
                    <div id="pm-needle-tip" />
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

export default PowerGauge;