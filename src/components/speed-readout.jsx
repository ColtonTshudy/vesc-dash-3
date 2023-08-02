import { useEffect, useState, useRef } from 'react'
import './css/speed-readout.css'


const SpeedReadout = ({ className, velocity, topSpeed, avgSpeed }) => {
    const [height, setHeight] = useState()
    const ref = useRef()
    const speed = Math.abs(velocity)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="speedro-main" ref={ref} style={{
            fontSize: `${height}px`,
        }}>
            <label id="speedro-speed-box">
                {padZeros(0, speed)}
            </label>
            <label id='speedro-subtitle'>
                mph
            </label>
            <div id="speedro-seperator" />
            <div className="speedro-info">
                <label>top:</label>
                <h1>{topSpeed}</h1>
            </div>
            <div className="speedro-info">
                <label>avg:</label>
                <h1>{avgSpeed}</h1>
            </div>
        </div >
    );
}

//create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    if (isNaN(value))
        return '0';

    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)

    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}

export default SpeedReadout