import { useEffect, useState, useRef } from 'react'
import './css/readout.css'
import padZeros from './pad-zeros-func'

const SpeedReadout = ({ className, velocity, topSpeed, avgSpeed }) => {
    const [height, setHeight] = useState()
    const ref = useRef()
    const speed = Math.abs(velocity)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="ro-main" ref={ref} style={{
            fontSize: `${height}px`,
        }}>
            <label id="ro-speed-box">
                {padZeros(0, speed)}
            </label>
            <label id='ro-subtitle'>
                mph
            </label>
            <div className="seperator" />
            <div className="ro-info">
                <label>top</label>
                <h1>{topSpeed}</h1>
            </div>
            <div className="ro-info">
                <label>avg</label>
                <h1>{avgSpeed}</h1>
            </div>
        </div >
    );
}

export default SpeedReadout