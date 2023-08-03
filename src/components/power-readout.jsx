import { useEffect, useState, useRef } from 'react'
import './css/readout.css'

const SpeedReadout = ({ className, power, topPower, avgPower }) => {
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="ro-main" ref={ref} style={{
            fontSize: `${height}px`,
        }}>
            <label id="ro-speed-box">
                {padZeros(1, Math.abs(power))}
            </label>
            <label id='ro-subtitle'>
                kW
            </label>
            <div id="ro-seperator" />
            <div className="ro-info">
                <label>top</label>
                <h1>{topPower}</h1>
            </div>
            <div className="ro-info">
                <label>avg</label>
                <h1>{avgPower}</h1>
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