import { useEffect, useState, useRef } from 'react'
import './css/readout.css'
import padZeros from './pad-zeros-func'

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
            <div className="seperator" />
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

export default SpeedReadout